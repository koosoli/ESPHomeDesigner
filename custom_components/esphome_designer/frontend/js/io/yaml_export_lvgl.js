/**
 * LVGL Configuration Generator
 * Handles generating ESPHome YAML for LVGL component, including hybrid mapping of native widgets.
 */

import { DEVICE_PROFILES } from './devices.js';
import { Logger } from '../utils/logger.js';

// --- Helpers (Exported for plugins and other adapters) ---

export function convertColor(hex) {
    if (!hex || hex === "transparent") return '"0x000000"';
    // Handle theme_auto (dynamic theming value from WidgetFactory) - fallback to black
    if (hex === "theme_auto") return '"0x000000"';
    if (hex.startsWith("#")) {
        return '"0x' + hex.substring(1).toUpperCase() + '"';
    }
    return `"${hex}"`;
}

export function convertAlign(align) {
    if (!align) return "top_left";
    const mapping = {
        "left": "top_left",
        "center": "center",
        "right": "top_right"
    };
    return mapping[align.toLowerCase()] || align.toLowerCase();
}

export function getLVGLFont(family, size, weight, italic) {
    const f = (family || "Roboto").toLowerCase().replace(/\s+/g, "_");
    const w = weight || 400;
    const s = size || 20;
    const i = italic ? "_italic" : "";
    return `font_${f}_${w}_${s}${i}`;
}

export function formatOpacity(opa) {
    if (opa === undefined || opa === null) return "cover";
    if (typeof opa === "number") {
        if (opa >= 255) return "cover";
        if (opa <= 0) return "transp";
        return Math.round((opa / 255) * 100) + "%";
    }
    return opa;
}

/**
 * Generates the LVGL snippet for the ESPHome configuration.
 * @param {Array} pages - The list of pages.
 * @param {string} deviceModel - The device model.
 * @returns {Array} The generated lines of YAML.
 */
export function generateLVGLSnippet(pages, deviceModel, profileOverride = null, layout = {}) {
    const lines = [];
    const profile = profileOverride || (DEVICE_PROFILES ? (DEVICE_PROFILES[deviceModel] || {}) : {});

    // 1. Generate Global Config (Display settings for LVGL)
    lines.push("# ============================================================================");
    lines.push("# LVGL Configuration");
    lines.push("# ============================================================================");
    lines.push("");

    lines.push("lvgl:");
    lines.push("  id: my_lvgl");
    lines.push("  log_level: WARN");
    lines.push('  bg_color: "0xFFFFFF"');
    lines.push("  displays:");

    // Dynamic display ID based on device type
    const displayId = profile.features?.lcd ? "my_display" : "epaper_display";
    lines.push(`    - ${displayId}`);

    // Configure touchscreen if device supports it
    if (profile.touch) {
        lines.push("  touchscreens:");
        lines.push("    - my_touchscreen");
    }

    if (layout.lcdEcoStrategy === 'dim_after_timeout') {
        const timeout = (layout.dimTimeout || 10) + "s";
        lines.push("  on_idle:");
        lines.push(`    timeout: ${timeout}`);
        lines.push("    then:");
        lines.push("      - light.turn_off: display_backlight");
        lines.push("      - lvgl.pause:");
    }
    lines.push("");

    // 2. Widget Processing & Transpilation
    lines.push("  pages:");

    pages.forEach((page, pageIndex) => {
        lines.push(`    - id: page_${pageIndex}`);

        // Add grid layout if page has one
        if (page.layout && /^\d+x\d+$/.test(page.layout)) {
            lines.push(`      layout: ${page.layout}`);
        }

        lines.push(`      widgets:`);

        const widgets = page.widgets || [];
        if (widgets.length === 0) {
            lines.push("        []");
            return;
        }

        widgets.filter(w => !w.hidden && w.type !== 'group').forEach(w => {
            // Generate widget marker comment for import/parsing
            lines.push(`        ${serializeWidget(w)}`);

            const lvglWidget = transpileToLVGL(w, profile);
            if (lvglWidget) {
                // Determine widget type key (e.g., 'label:', 'obj:', 'button:')
                const typeKey = Object.keys(lvglWidget)[0];
                const props = lvglWidget[typeKey];

                lines.push(`        - ${typeKey}:`);
                // Recursive YAML serialization
                serializeYamlObject(props, lines, 12);
            }
        });
    });

    return lines;
}

/**
 * Recursively serializes a JS object/array to YAML lines
 * @param {Object|Array} obj - The object or array to serialize.
 * @param {Array} lines - The lines array to append to.
 * @param {number} indentLevel - The current indentation level.
 */
function serializeYamlObject(obj, lines, indentLevel) {
    const spaces = " ".repeat(indentLevel);

    Object.entries(obj).forEach(([key, val]) => {
        if (val === undefined || val === null || val === "") return;

        if (Array.isArray(val)) {
            if (val.length === 0) {
                lines.push(`${spaces}${key}: []`);
            } else {
                lines.push(`${spaces}${key}:`);
                val.forEach(item => {
                    if (typeof item === 'object') {
                        lines.push(`${spaces}  -`);
                        // Increase indent for array item properties
                        serializeYamlObject(item, lines, indentLevel + 4);
                    } else {
                        lines.push(`${spaces}  - ${safeYamlValue(item)}`);
                    }
                });
            }
        } else if (typeof val === 'object') {
            lines.push(`${spaces}${key}:`);
            serializeYamlObject(val, lines, indentLevel + 2);
        } else {
            if (typeof val === 'string' && val.includes('\n')) {
                const parts = val.split('\n');
                if (val.trim().startsWith('!lambda')) {
                    // Optimized tagged lambda handling
                    lines.push(`${spaces}${key}: ${parts[0].trim()}`);

                    // Detect minimum shared indentation in the body (excluding first line)
                    const bodyParts = parts.slice(1);
                    const minIndent = bodyParts.reduce((min, line) => {
                        if (!line.trim()) return min;
                        const match = line.match(/^ */);
                        return Math.min(min, match ? match[0].length : 0);
                    }, Infinity);
                    const safeMin = minIndent === Infinity ? 0 : minIndent;

                    for (let i = 1; i < parts.length; i++) {
                        const content = parts[i].trim() === "" ? "" : parts[i].substring(safeMin);
                        lines.push(`${spaces}  ${content}`);
                    }
                } else {
                    lines.push(`${spaces}${key}: |-`);
                    parts.forEach(part => {
                        lines.push(`${spaces}  ${part}`);
                    });
                }
            } else {
                lines.push(`${spaces}${key}: ${safeYamlValue(val)}`);
            }
        }
    });
}

/**
 * Escapes and quotes YAML values if they contain special characters 
 * that would otherwise trigger YAML features like aliases (*), anchors (&), 
 * or be mis-parsed as booleans/numbers.
 * @param {any} val - The value to check and quote.
 * @returns {string} The safe YAML string.
 */
function safeYamlValue(val) {
    if (val === undefined || val === null) return "";
    if (typeof val !== 'string') return String(val);

    const trimmed = val.trim();

    // 1. If it's already explicitly quoted or is a tag/lambda, leave it alone
    if ((val.startsWith('"') && val.endsWith('"')) ||
        (val.startsWith("'") && val.endsWith("'")) ||
        trimmed.startsWith('!lambda') ||
        trimmed.startsWith('!secret')) {
        return val;
    }

    // 2. Check for characters that require quoting at the start of a YAML scalar
    // or if the string represents a reserved YAML literal (true/false/null/yes/no)
    // Also quote if it contains sequences like ": " or " #" which are sensitive in YAML.
    const needsQuoting = /^[*&!|>%@,\-{}[\]?#:]/.test(trimmed) ||
        /^(true|false|null|yes|no)$/i.test(trimmed) ||
        trimmed.includes(': ') ||
        trimmed.includes(' #');

    if (needsQuoting) {
        // Use JSON.stringify to handle the quoting and escaping reliably
        return JSON.stringify(val);
    }

    return val;
}

/**
 * Serializes a widget to the // widget:type ... format used by yaml_import.js
 * @param {Object} w - The widget object.
 * @returns {string} The serialized widget comment.
 */
export function serializeWidget(w) {
    const parts = [`# widget:${w.type}`];

    // Core properties
    parts.push(`id:${w.id}`);
    parts.push(`type:${w.type}`);
    parts.push(`x:${Math.round(w.x)}`);
    parts.push(`y:${Math.round(w.y)}`);
    const width = w.w !== undefined ? w.w : (w.width !== undefined ? w.width : 0);
    const height = w.h !== undefined ? w.h : (w.height !== undefined ? w.height : 0);

    parts.push(`w:${Math.round(width)}`);
    parts.push(`h:${Math.round(height)}`);

    // Entity mapping
    if (w.entity_id) parts.push(`entity:${w.entity_id}`);

    // Locked state (only serialize if true to keep YAML clean)
    if (w.locked) parts.push(`locked:true`);

    // Extended properties
    if (w.props) {
        Object.entries(w.props).forEach(([k, v]) => {
            if (v === undefined || v === null || v === "") return;
            // Prevent property duplication or weird nesting
            if (k === 'id' || k === 'type' || k === 'x' || k === 'y' || k === 'w' || k === 'h' || k === 'entity_id') return;

            if (typeof v === 'object') {
                try {
                    parts.push(`${k}:${JSON.stringify(v)}`);
                } catch (e) {
                    Logger.warn(`[serializeWidget] Failed to serialize prop ${k}`, e);
                }
            } else {
                // Use JSON.stringify for primitives too to ensure strings are quoted/escaped
                // and numbers/booleans are formatted correctly.
                parts.push(`${k}:${JSON.stringify(v)}`);
            }
        });
    }

    return parts.join(" ").replace(/[\r\n]+/g, " ");
}

/**
 * Transpiles a designer widget JSON to an LVGL YAML object
 * @param {Object} w - The widget object.
 * @param {Object} profile - The device profile.
 * @returns {Object|null} The LVGL YAML object or null.
 */
function transpileToLVGL(w, profile) {
    const p = w.props || {};
    const hasTouch = profile?.touch || (profile?.features && profile.features.touch);

    // Convert coordinates to integers
    const x = Math.round(w.x || 0);
    const y = Math.round(w.y || 0);
    const w_w = Math.round(w.w || w.width || 100); // Fallbacks
    const w_h = Math.round(w.h || w.height || 100);

    // Common properties shared by many LVGL widgets
    const common = {
        id: w.id,
        x: x,
        y: y,
        width: w_w,
        height: w_h,
        hidden: p.hidden || undefined,
        clickable: p.clickable === false ? false : undefined,
        checkable: p.checkable || undefined,
        scrollable: p.scrollable === false ? false : undefined,
        floating: p.floating || undefined,
        ignore_layout: p.ignore_layout || undefined,
        scrollbar_mode: p.scrollbar_mode !== "AUTO" ? p.scrollbar_mode : undefined
    };

    // Plugin Hook: Check if the plugin supplies its own LVGL export logic
    const registry = window.PluginRegistry;
    if (registry) {
        const plugin = registry.get(w.type);
        if (plugin && typeof plugin.exportLVGL === 'function') {
            // Helper for plugins using the descriptor pattern
            const getObjectDescriptor = () => ({
                type: "obj",
                attrs: { ...common }
            });

            const result = plugin.exportLVGL(w, {
                profile,
                common: common,
                convertColor,
                convertAlign,
                getLVGLFont,
                formatOpacity,
                getObjectDescriptor
            });

            // Normalize result if it uses the descriptor pattern (e.g. { type: 'textarea', attrs: {...} })
            if (result && result.type && result.attrs) {
                return { [result.type]: result.attrs };
            }

            return result;
        }
    }

    // Fallback for generic LVGL widgets or warning
    if (w.type && (w.type.startsWith("lvgl_") || w.type.startsWith("shape_") || w.type === "rounded_rect" || w.type === "line" || w.type === "text" || w.type === "progress_bar" || w.type === "qr_code")) {
        Logger.warn(`[transpileToLVGL] Widget type ${w.type} has no exportLVGL function. Falling back to generic obj.`);
        return { obj: { ...common, bg_color: convertColor(p.bg_color || p.color || "white") } };
    }

    return null;
}

/**
 * Checks if the pages contain any LVGL widgets.
 * @param {Array} pages - The list of pages.
 * @returns {boolean} True if LVGL widgets are found.
 */
export function hasLVGLWidgets(pages) {
    for (const p of pages) {
        if (p.widgets) {
            for (const w of p.widgets) {
                if (w.type.startsWith("lvgl_")) return true;
            }
        }
    }
    return false;
}
