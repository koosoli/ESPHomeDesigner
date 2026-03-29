import { Logger } from '../utils/logger.js';
import { registry } from '../core/plugin_registry.js';
import { convertAlign, convertColor, formatOpacity, getLVGLFont } from './yaml_export_lvgl_core.js';

const NEVER_STRIP = new Set([
    'id', 'x', 'y', 'width', 'height', 'w', 'h',
    'grid_cell_row_pos', 'grid_cell_column_pos',
    'grid_cell_row_span', 'grid_cell_column_span',
    'grid_cell_x_align', 'grid_cell_y_align',
    'widgets', 'text', 'on_click', 'on_value_change',
    'textarea', 'items', 'options', 'series',
    'text_font'
]);

/**
 * @typedef {Record<string, any>} YamlMap
 */

/**
 * @param {any} val
 * @param {Record<string, any>} defaults
 * @param {string} key
 * @returns {boolean}
 */
function isDefaultMatch(val, defaults, key) {
    let defaultVal = defaults[key];

    if (defaultVal === undefined) {
        if (key.endsWith('_color')) defaultVal = defaults.color;
        if (key === 'color') defaultVal = defaults.bg_color || defaults.text_color;
        if (key === 'bg_opa') {
            if (defaults.fill !== undefined) defaultVal = defaults.fill === false ? 0 : 255;
            else defaultVal = 255;
        }
    }

    if (defaultVal === undefined) return false;
    if (val === defaultVal) return true;

    if (typeof val === 'string' && typeof defaultVal === 'string') {
        const valClean = val.replace(/["']/g, '');
        if (defaultVal === 'theme_auto' || defaultVal === 'theme_auto_inverse' || defaultVal === 'transparent') {
            const defaultConverted = convertColor(defaultVal, false).replace(/["']/g, '');
            const defaultConvertedDark = convertColor(defaultVal, true).replace(/["']/g, '');
            if (valClean === defaultConverted || valClean === defaultConvertedDark) return true;
        }

        const directConverted = convertColor(defaultVal, false).replace(/["']/g, '');
        if (valClean === directConverted) return true;
    }

    if (key === 'opa' || key === 'bg_opa') {
        if (val === 'cover' && defaultVal === 255) return true;
        if (val === 'transp' && defaultVal === 0) return true;
        if (val === formatOpacity(defaultVal)) return true;
    }

    return false;
}

/**
 * @param {any} obj
 * @param {string | null | undefined} widgetType
 * @returns {any}
 */
export function stripDefaults(obj, widgetType) {
    if (!obj || typeof obj !== 'object') return obj;

    if (Array.isArray(obj)) {
        return obj.map((item) => {
            if (item && typeof item === 'object') {
                const keys = Object.keys(item);
                if (keys.length === 1 && registry && registry.get(keys[0])) {
                    return { [keys[0]]: stripDefaults(item[keys[0]], keys[0]) };
                }
                return stripDefaults(item, widgetType);
            }
            return item;
        });
    }

    const plugin = (registry && widgetType) ? registry.get(widgetType) : null;
    const defaults = plugin?.defaults ? { ...plugin.defaults } : {};

    if (widgetType && widgetType.startsWith('lvgl_')) {
        Object.assign(defaults, {
            hidden: false,
            clickable: true,
            checkable: false,
            scrollable: true,
            floating: false,
            ignore_layout: false,
            scrollbar_mode: 'AUTO',
            opa: 255
        });
    }

    /** @type {YamlMap} */
    const result = {};
    const hasDefaults = Object.keys(defaults).length > 0;

    for (const [key, value] of Object.entries(obj)) {
        let strippedValue = value;
        if (Array.isArray(value)) strippedValue = stripDefaults(value, widgetType);
        else if (value && typeof value === 'object') {
            const childKeys = Object.keys(value);
            if (childKeys.length === 1 && registry && registry.get(childKeys[0])) {
                strippedValue = { [childKeys[0]]: stripDefaults(value[childKeys[0]], childKeys[0]) };
            } else {
                strippedValue = stripDefaults(value, null);
            }
        }

        if (NEVER_STRIP.has(key)) {
            result[key] = strippedValue;
            continue;
        }

        if (hasDefaults && isDefaultMatch(strippedValue, defaults, key)) continue;
        result[key] = strippedValue;
    }
    return result;
}

/**
 * @param {Record<string, any>} w
 * @param {Record<string, any>} profile
 * @param {boolean} [darkMode=false]
 * @param {string | null} [pageLayout=null]
 * @returns {any}
 */
function transpileToLVGL(w, profile, darkMode = false, pageLayout = null) {
    const p = w.props || {};
    const isGrid = pageLayout && /^\d+x\d+$/.test(pageLayout);
    const hasGridPos = isGrid && p.grid_cell_row_pos != null && p.grid_cell_column_pos != null;
    /** @type {YamlMap} */
    const common = { id: w.id };

    if (hasGridPos) {
        common.grid_cell_row_pos = p.grid_cell_row_pos;
        common.grid_cell_column_pos = p.grid_cell_column_pos;
        common.grid_cell_row_span = p.grid_cell_row_span || 1;
        common.grid_cell_column_span = p.grid_cell_column_span || 1;
        common.grid_cell_x_align = (p.grid_cell_x_align || "STRETCH").toLowerCase();
        common.grid_cell_y_align = (p.grid_cell_y_align || "STRETCH").toLowerCase();
    } else {
        common.x = Math.round(w.x || 0);
        common.y = Math.round(w.y || 0);
        common.width = Math.round(w.w || w.width || 100);
        common.height = Math.round(w.h || w.height || 100);
    }

    common.hidden = p.hidden || undefined;
    common.clickable = p.clickable === false ? false : undefined;
    common.checkable = p.checkable || undefined;
    common.scrollable = p.scrollable === false ? false : undefined;
    common.floating = p.floating || undefined;
    common.ignore_layout = p.ignore_layout || undefined;
    common.scrollbar_mode = p.scrollbar_mode !== "AUTO" ? p.scrollbar_mode : undefined;

    if (registry) {
        const plugin = registry.get(w.type);
        if (plugin && typeof plugin.exportLVGL === 'function') {
            const getObjectDescriptor = () => ({
                type: "obj",
                attrs: { ...common }
            });

            const result = plugin.exportLVGL(w, {
                profile,
                common,
                pageLayout,
                convertColor: (/** @type {string} */ c) => convertColor(c, darkMode),
                convertAlign,
                getLVGLFont,
                formatOpacity,
                getObjectDescriptor
            });

            if (result && result.type && result.attrs) {
                return { [result.type]: stripDefaults(result.attrs, w.type) };
            }

            if (result) {
                const typeKey = Object.keys(result)[0];
                /** @type {YamlMap} */ (result)[typeKey] = stripDefaults(/** @type {YamlMap} */ (result)[typeKey], w.type);
            }

            return result;
        }
    }

    if (w.type && (w.type.startsWith("lvgl_") || w.type.startsWith("shape_") || w.type === "rounded_rect" || w.type === "line" || w.type === "text" || w.type === "progress_bar" || w.type === "qr_code")) {
        Logger.warn(`[transpileToLVGL] Widget type ${w.type} has no exportLVGL function. Falling back to generic obj.`);
        const genericAttrs = { ...common, bg_color: convertColor(p.bg_color || p.color || "white", darkMode) };
        return { obj: stripDefaults(genericAttrs, w.type) };
    }

    return null;
}

/**
 * @param {Array<{ widgets?: Array<{ type?: string }> }>} pages
 * @returns {boolean}
 */
export function hasLVGLWidgets(pages) {
    for (const page of pages) {
        if (!page.widgets) continue;
        for (const widget of page.widgets) {
            if (widget.type && widget.type.startsWith("lvgl_")) return true;
        }
    }
    return false;
}

/**
 * @param {Record<string, any>} w
 * @param {Record<string, any>} profile
 * @param {boolean} [darkMode=false]
 * @param {string | null} [pageLayout=null]
 * @returns {any}
 */
export function transpilePageWidget(w, profile, darkMode = false, pageLayout = null) {
    return transpileToLVGL(w, profile, darkMode, pageLayout);
}
