/**
 * LVGL Configuration Generator
 * Handles generating ESPHome YAML for LVGL component, including hybrid mapping of native widgets.
 */

import { DEVICE_PROFILES } from './devices.js';
import { Logger } from '../utils/logger.js';

/**
 * Generates the LVGL snippet for the ESPHome configuration.
 * @param {Array} pages - The list of pages.
 * @param {string} deviceModel - The device model.
 * @returns {Array} The generated lines of YAML.
 */
export function generateLVGLSnippet(pages, deviceModel) {
    const lines = [];
    const profile = DEVICE_PROFILES ? (DEVICE_PROFILES[deviceModel] || {}) : {};

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

        widgets.filter(w => w.type !== 'group').forEach(w => {
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
                        lines.push(`${spaces}  - ${item}`);
                    }
                });
            }
        } else if (typeof val === 'object') {
            lines.push(`${spaces}${key}:`);
            serializeYamlObject(val, lines, indentLevel + 2);
        } else {
            lines.push(`${spaces}${key}: ${val}`);
        }
    });
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
                parts.push(`${k}:${v}`);
            }
        });
    }

    return parts.join(" ");
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
            return plugin.exportLVGL(w, {
                profile,
                common: common,
                convertColor,
                convertAlign,
                getLVGLFont,
                formatOpacity
            });
        }
    }

    // Fallback for generic LVGL widgets or warning
    if (w.type && (w.type.startsWith("lvgl_") || w.type.startsWith("shape_") || w.type === "rounded_rect" || w.type === "line" || w.type === "text" || w.type === "progress_bar" || w.type === "qr_code")) {
        Logger.warn(`[transpileToLVGL] Widget type ${w.type} has no exportLVGL function. Falling back to generic obj.`);
        return { obj: { ...common, bg_color: convertColor(p.bg_color || p.color || "white") } };
    }

    return null;

    // Helpers
    function convertColor(hex) {
        if (!hex || hex === "transparent") return '"0x000000"';
        if (hex.startsWith("#")) {
            return '"0x' + hex.substring(1).toUpperCase() + '"';
        }
        return `"${hex}"`;
    }

    function convertAlign(align) {
        if (!align) return "TOP_LEFT";
        const mapping = {
            "left": "TOP_LEFT",
            "center": "CENTER",
            "right": "TOP_RIGHT"
        };
        return mapping[align.toLowerCase()] || align;
    }

    function getLVGLFont(family, size, weight, italic) {
        const f = (family || "Roboto").toLowerCase().replace(/\s+/g, "_");
        const w = weight || 400;
        const s = size || 20;
        const i = italic ? "_italic" : "";
        return `font_${f}_${w}_${s}${i}`;
    }

    function formatOpacity(opa) {
        if (opa === undefined || opa === null) return "COVER";
        if (typeof opa === "number") {
            if (opa >= 255) return "COVER";
            if (opa <= 0) return "TRANSP";
            return Math.round((opa / 255) * 100) + "%";
        }
        return opa;
    }
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
