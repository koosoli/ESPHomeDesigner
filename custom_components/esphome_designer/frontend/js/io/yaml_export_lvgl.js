/**
 * LVGL Configuration Generator
 * Handles generating ESPHome YAML for LVGL component, including hybrid mapping of native widgets.
 */

import { DEVICE_PROFILES } from './devices.js';
import { Logger } from '../utils/logger.js';
import { registry } from '../core/plugin_registry';

const NEVER_STRIP = new Set([
    'id', 'x', 'y', 'width', 'height', 'w', 'h',
    'grid_cell_row_pos', 'grid_cell_column_pos',
    'grid_cell_row_span', 'grid_cell_column_span',
    'grid_cell_x_align', 'grid_cell_y_align',
    'widgets', 'text', 'on_click', 'on_value_change',
    'textarea', 'items', 'options', 'series',
    'text_font' // Always emit font, critical for rendering
]);

// --- Helpers (Exported for plugins and other adapters) ---

const COLOR_NAME_MAP = {
    'white': '#FFFFFF',
    'black': '#000000',
    'red': '#FF0000',
    'green': '#00FF00',
    'blue': '#0000FF',
    'gray': '#808080',
    'yellow': '#FFFF00',
    'cyan': '#00FFFF',
    'magenta': '#FF00FF'
};

export function convertColor(hex, darkMode = false) {
    if (!hex) return '"0x000000"';
    const mapped = typeof hex === 'string' ? (COLOR_NAME_MAP[hex.toLowerCase()] || hex) : hex;

    if (mapped === "transparent") return '"0x000000"';
    // Handle theme_auto (dynamic theming value from WidgetFactory) - fallback to black (or white in Dark Mode)
    if (mapped === "theme_auto") return darkMode ? '"0xFFFFFF"' : '"0x000000"';
    // Handle theme_auto_inverse - fallback to white (or black in Dark Mode)
    if (mapped === "theme_auto_inverse") return darkMode ? '"0x000000"' : '"0xFFFFFF"';
    if (mapped.startsWith("#")) {
        return '"0x' + mapped.substring(1).toUpperCase() + '"';
    }
    return `"${mapped}"`;
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

    // Propagate Dark Mode to LVGL background
    const isDarkMode = !!layout.darkMode;
    const bgColor = isDarkMode ? '"0x000000"' : '"0xFFFFFF"';
    lines.push(`  bg_color: ${bgColor}`);
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
            lines.push(`        ${serializeWidget(w).replace(/^\/\//, '#')}`);

            const lvglWidget = transpileToLVGL(w, profile, isDarkMode, page.layout);
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

    const keys = Object.keys(obj).sort((a, b) => {
        // Boost 'id' and 'type' to the top
        if (a === "id") return -1;
        if (b === "id") return 1;
        if (a === "type") return -1;
        if (b === "type") return 1;
        return a.localeCompare(b);
    });

    keys.forEach(key => {
        const val = obj[key];
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
        /^[A-Z][A-Z0-9_]*$/.test(trimmed) ||
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
    const parts = [`// widget:${w.type}`];

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

    // Get defaults for this plugin to avoid redundant serialization
    const plugin = registry ? registry.get(w.type) : null;
    const defaults = plugin ? { ...plugin.defaults } : {};

    // Common LVGL defaults that are automatically applied in buildWidgetProps
    if (w.type.startsWith("lvgl_")) {
        const commonDefaults = {
            hidden: false,
            clickable: true,
            checkable: false,
            scrollable: true,
            floating: false,
            ignore_layout: false,
            scrollbar_mode: "AUTO",
            opa: 255,
            grid_cell_row_pos: null,
            grid_cell_column_pos: null,
            grid_cell_row_span: 1,
            grid_cell_column_span: 1,
            grid_cell_x_align: "STRETCH",
            grid_cell_y_align: "STRETCH"
        };
        Object.assign(defaults, commonDefaults);
    }

    // Extended properties
    if (w.props) {
        Object.entries(w.props).forEach(([k, v]) => {
            if (v === undefined || v === null || v === "") return;
            // Prevent property duplication or weird nesting
            // Prevent property duplication or weird nesting
            if (k === 'id' && v === w.id) return;
            if (k === 'type' && v === w.type) return;
            if (k === 'x' && Math.round(v) === Math.round(w.x)) return;
            if (k === 'y' && Math.round(v) === Math.round(w.y)) return;
            if (k === 'w' && Math.round(v) === Math.round(w.width || w.w)) return;
            if (k === 'h' && Math.round(v) === Math.round(w.height || w.h)) return;
            if (k === 'entity_id' && v === w.entity_id) return;

            // Skip if it matches the default value (to keep YAML clean and ensure round-trip symmetry)
            if (k in defaults) {
                if (defaults[k] === v) return;
                // Handle deep equality for objects/arrays in defaults vs props
                if (typeof v === 'object' && JSON.stringify(defaults[k]) === JSON.stringify(v)) return;
            }

            if (typeof v === 'object') {
                try {
                    parts.push(`${k}:${JSON.stringify(v)}`);
                } catch (e) {
                    Logger.warn(`[serializeWidget] Failed to serialize prop ${k}`, e);
                }
            } else {
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
 * @param {boolean} darkMode - Whether Dark Mode is enabled.
 * @returns {Object|null} The LVGL YAML object or null.
 */
function transpileToLVGL(w, profile, darkMode = false, pageLayout = null) {
    const p = w.props || {};
    const _hasTouch = profile?.touch || (profile?.features && profile.features.touch);

    // Detect grid mode from page layout (e.g. "4x4")
    const isGrid = pageLayout && /^\d+x\d+$/.test(pageLayout);
    const hasGridPos = isGrid && p.grid_cell_row_pos != null && p.grid_cell_column_pos != null;

    // Common properties shared by many LVGL widgets
    const common = { id: w.id };

    if (hasGridPos) {
        // Grid mode: emit grid cell placement instead of absolute position/size
        common.grid_cell_row_pos = p.grid_cell_row_pos;
        common.grid_cell_column_pos = p.grid_cell_column_pos;
        common.grid_cell_row_span = p.grid_cell_row_span || 1;
        common.grid_cell_column_span = p.grid_cell_column_span || 1;
        common.grid_cell_x_align = (p.grid_cell_x_align || "STRETCH").toLowerCase();
        common.grid_cell_y_align = (p.grid_cell_y_align || "STRETCH").toLowerCase();
    } else {
        // Absolute positioning mode
        common.x = Math.round(w.x || 0);
        common.y = Math.round(w.y || 0);
        common.width = Math.round(w.w || w.width || 100);
        common.height = Math.round(w.h || w.height || 100);
    }

    // Shared behavioral flags
    common.hidden = p.hidden || undefined;
    common.clickable = p.clickable === false ? false : undefined;
    common.checkable = p.checkable || undefined;
    common.scrollable = p.scrollable === false ? false : undefined;
    common.floating = p.floating || undefined;
    common.ignore_layout = p.ignore_layout || undefined;
    common.scrollbar_mode = p.scrollbar_mode !== "AUTO" ? p.scrollbar_mode : undefined;

    // Plugin Hook: Check if the plugin supplies its own LVGL export logic
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
                pageLayout,
                convertColor: (c) => convertColor(c, darkMode),
                convertAlign,
                getLVGLFont,
                formatOpacity,
                getObjectDescriptor
            });

            // Normalize result if it uses the descriptor pattern (e.g. { type: 'textarea', attrs: {...} })
            if (result && result.type && result.attrs) {
                return { [result.type]: stripDefaults(result.attrs, w.type) };
            }

            // Strip defaults from standard { widgetType: { ...props } } shape
            if (result) {
                const typeKey = Object.keys(result)[0];
                result[typeKey] = stripDefaults(result[typeKey], w.type);
            }

            return result;
        }
    }

    // Fallback for generic LVGL widgets or warning
    if (w.type && (w.type.startsWith("lvgl_") || w.type.startsWith("shape_") || w.type === "rounded_rect" || w.type === "line" || w.type === "text" || w.type === "progress_bar" || w.type === "qr_code")) {
        Logger.warn(`[transpileToLVGL] Widget type ${w.type} has no exportLVGL function. Falling back to generic obj.`);
        const genericAttrs = { ...common, bg_color: convertColor(p.bg_color || p.color || "white", darkMode) };
        return { obj: stripDefaults(genericAttrs, w.type) };
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

/**
 * Checks if a value matches a default, handling type and color conversion.
 */
function isDefaultMatch(val, defaults, key) {
    // Check main key or known aliases used during export mapping
    let defaultVal = defaults[key];

    // Fallbacks for properties that are mapped to different names in exportLVGL
    if (defaultVal === undefined) {
        if (key.endsWith('_color')) defaultVal = defaults['color'];
        if (key === 'color') defaultVal = defaults['bg_color'] || defaults['text_color'];

        // Handle opacity fallback robustly
        if (key === 'bg_opa') {
            if (defaults['fill'] !== undefined) {
                defaultVal = defaults['fill'] === false ? 0 : 255;
            } else {
                defaultVal = 255; // Typically LVGL objects default to cover if missing fill logic
            }
        }
    }

    if (defaultVal === undefined) return false;

    if (val === defaultVal) return true;

    // Handle color string conversions
    if (typeof val === 'string' && typeof defaultVal === 'string') {
        const valClean = val.replace(/["']/g, ''); // Strip quotes from output values like '"0xFFFFFF"'

        // If the plugin default is a theme alias, convert it to see what it would output
        if (defaultVal === 'theme_auto' || defaultVal === 'theme_auto_inverse' || defaultVal === 'transparent') {
            const defaultConverted = convertColor(defaultVal, false).replace(/["']/g, '');
            const defaultConvertedDark = convertColor(defaultVal, true).replace(/["']/g, '');
            if (valClean === defaultConverted || valClean === defaultConvertedDark) return true;
        }

        // Direct color comparison (e.g. "red" -> "0xFF0000")
        const directConverted = convertColor(defaultVal, false).replace(/["']/g, '');
        if (valClean === directConverted) return true;
    }

    // Handle opacity formatting
    if (key === 'opa' || key === 'bg_opa') {
        if (val === 'cover' && defaultVal === 255) return true;
        if (val === 'transp' && defaultVal === 0) return true;
        if (val === formatOpacity(defaultVal)) return true;
    }

    return false;
}

/**
 * Strips LVGL attributes that match the defined plugin defaults to shorten YAML output.
 */
export function stripDefaults(obj, widgetType) {
    if (!obj || typeof obj !== 'object') return obj;

    // Handle Deep Array Stripping (e.g., 'widgets' arrays)
    if (Array.isArray(obj)) {
        return obj.map(item => {
            if (item && typeof item === 'object') {
                const keys = Object.keys(item);
                // Detect standard ESPHome widget shape: { lvgl_label: { ...props } }
                if (keys.length === 1 && registry && !!registry.get(keys[0])) {
                    return { [keys[0]]: stripDefaults(item[keys[0]], keys[0]) };
                }
                return stripDefaults(item, widgetType);
            }
            return item;
        });
    }

    const plugin = registry ? registry.get(widgetType) : null;
    const defaults = plugin?.defaults ? { ...plugin.defaults } : {};

    // Merge common LVGL behavioral defaults
    if (widgetType && widgetType.startsWith('lvgl_')) {
        Object.assign(defaults, {
            hidden: false,
            clickable: true,
            checkable: false,
            scrollable: true,
            floating: false,
            ignore_layout: false,
            scrollbar_mode: 'AUTO',
            opa: 255,
        });
    }

    const result = {};
    const hasDefaults = Object.keys(defaults).length > 0;

    for (const [key, value] of Object.entries(obj)) {
        // Recursively strip values first
        let strippedValue = value;
        if (Array.isArray(value)) {
            strippedValue = stripDefaults(value, widgetType);
        } else if (value && typeof value === 'object') {
            const childKeys = Object.keys(value);
            if (childKeys.length === 1 && registry && !!registry.get(childKeys[0])) {
                strippedValue = { [childKeys[0]]: stripDefaults(value[childKeys[0]], childKeys[0]) };
            } else {
                strippedValue = stripDefaults(value, null);
            }
        }

        if (NEVER_STRIP.has(key)) {
            result[key] = strippedValue;
            continue;
        }

        if (hasDefaults && isDefaultMatch(strippedValue, defaults, key)) {
            continue; // Strip it
        }

        result[key] = strippedValue;
    }
    return result;
}
