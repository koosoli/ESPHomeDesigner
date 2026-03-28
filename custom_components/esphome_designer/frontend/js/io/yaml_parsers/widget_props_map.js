import { Logger } from '../../utils/logger.js';
import { applyCommonLvglProps, normalizeMappedColor } from './widget_props_map_helpers.js';
import { buildBasicWidgetProps } from './widget_props_map_basic.js';
import { buildLvglWidgetProps } from './widget_props_map_lvgl.js';

/**
 * @typedef {Record<string, any>} WidgetPropSource
 */

/**
 * @param {string} widgetType
 * @param {WidgetPropSource} p
 * @param {WidgetPropSource} widget
 * @returns {WidgetPropSource}
 */
export function buildWidgetProps(widgetType, p, widget) {
    /** @type {WidgetPropSource} */
    const props = {};
    applyCommonLvglProps(widgetType, p, props);

    const basic = buildBasicWidgetProps(widgetType, p, widget);
    if (basic) return basic;

    const lvglSpecific = buildLvglWidgetProps(widgetType, p, widget, props);
    if (lvglSpecific) return lvglSpecific;

    if (widgetType.startsWith("lvgl_")) {
        Logger.log("[YAML_IMPORT] Parsing generic LVGL", widgetType, p.id, p);
        const commonKeys = [
            "hidden", "clickable", "checkable", "scrollable", "floating",
            "ignore_layout", "scrollbar_mode", "opa",
            "grid_cell_row_pos", "grid_cell_column_pos",
            "grid_cell_row_span", "grid_cell_column_span",
            "grid_cell_x_align", "grid_cell_y_align"
        ];

        Object.entries(p).forEach(([key, val]) => {
            if (key === "id" || key === "type" || key === "x" || key === "y" || key === "w" || key === "h") return;
            if (commonKeys.includes(key)) return;

            if (key === "title") {
                widget.title = val;
                return;
            }

            let normalizedVal = String(val);
            if (Array.isArray(val)) {
                if (key === "options") normalizedVal = val.join("\n");
                else if (key === "points") normalizedVal = val.map((pt) => Array.isArray(pt) ? pt.join(",") : String(pt)).join(" ");
            } else if (typeof val === 'string') {
                if (/^-?\d+(\.\d+)?(ms|deg|px|%)$/.test(val)) normalizedVal = val.replace(/(ms|deg|px|%)$/, "");
                if (normalizedVal.includes("\\u")) {
                    try { normalizedVal = JSON.parse(`"${normalizedVal}"`); } catch { /* ignore */ }
                }
            }

            if (normalizedVal === "true") props[key] = true;
            else if (normalizedVal === "false") props[key] = false;
            else if (key.includes("color") || key.includes("bg_") || key.startsWith("line_color")) {
                props[key] = normalizeMappedColor(normalizedVal, normalizedVal);
            }
            else if (typeof normalizedVal === 'string' && normalizedVal !== "" && !Number.isNaN(Number(normalizedVal)) && !normalizedVal.startsWith("0x") && key !== "text" && key !== "id") {
                props[key] = parseFloat(normalizedVal);
            } else {
                props[key] = normalizedVal;
            }
        });
        return props;
    }

    return props;
}
