import { AppState } from '@core/state';
import { TemplateConverter } from '../../js/utils/template_converter.js';
import { getNestedValue } from '../../js/utils/helpers.js';
import { HA_TEXT_DOMAINS, hexToRgb, isColorDisplay, isStrictlyNumeric } from './shared.js';

/** @typedef {Widget & { props?: Record<string, any>, entity_id?: string, entity_id_2?: string, title?: string }} SensorTextWidget */

/**
 * @param {SensorTextWidget} w
 * @param {Record<string, any>} helpers
 */
export const exportLVGL = (w, { common, convertColor, _convertAlign, getLVGLFont, formatOpacity, profile }) => {
        const p = w.props || {};
        const format = p.value_format || "label_value";
        let entityId = (w.entity_id || "").trim();
        let entityId2 = (w.entity_id_2 || "").trim();

        // Ensure sensor. prefix if missing (reuse logic from export)
        if (entityId && !p.is_local_sensor && !entityId.includes(".") && !entityId.startsWith("text_sensor.") && !entityId.toLowerCase().startsWith("mqtt:")) {
            entityId = `sensor.${entityId}`;
        }
        if (entityId2 && !p.is_local_sensor && !entityId2.includes(".") && !entityId2.startsWith("text_sensor.") && !entityId2.toLowerCase().startsWith("mqtt:")) {
            entityId2 = `sensor.${entityId2}`;
        }

        let unit = (p.unit || "").trim();

        // Auto-detect unit if missing and not suppressed (same logic as direct export)
        if (!unit && !p.hide_unit && !format.endsWith("_no_unit") && AppState && AppState.entityStates) {
            const eObj = AppState.entityStates[entityId];
            if (eObj) {
                if (eObj.attributes && eObj.attributes.unit_of_measurement) {
                    unit = eObj.attributes.unit_of_measurement;
                } else if (eObj.formatted) {
                    const match = eObj.formatted.match(/^([-+]?\d*[.,]?\d+)\s*(.*)$/);
                    if (match && match[2]) unit = match[2].trim();
                }
            }
        }

        // Fallback: Heuristic unit detection from entity ID if still no unit
        if (!unit && !p.hide_unit && !format.endsWith("_no_unit") && entityId) {
            const eid = entityId.toLowerCase();
            if (eid.includes("_power") || eid.includes("_watt")) unit = "W";
            else if (eid.includes("_energy") || eid.includes("_kwh")) unit = "kWh";
            else if (eid.includes("_temperature") || eid.includes("_temp")) unit = "°C";
            else if (eid.includes("_humidity") || eid.includes("humid")) unit = "%";
            else if (eid.includes("_voltage") || eid.includes("_volt") || eid.includes("volt")) unit = "V";
            else if (eid.includes("_current") || eid.includes("_amp")) unit = "A";
            else if (eid.includes("_battery") || eid.includes("batt")) unit = "%";
            else if (eid.includes("_pressure") || eid.includes("_hpa")) unit = "hPa";
            else if (eid.includes("_speed") || eid.includes("_kmh")) unit = "km/h";
            else if (eid.includes("_percent") || eid.includes("_pct")) unit = "%";
        }


        // Helper to formatting strings
        /** @param {string | undefined | null} str */
        const escapeFmt = (str) => (str || "").replace(/"/g, '\\"').replace(/%/g, "%%");

        let precision = parseInt(p.precision, 10);
        if (isNaN(precision) || precision < 0) precision = 2;

        // Check if the value we are actually going to display is numeric or text
        let isText1 = p.is_text_sensor;
        if (!isText1 && entityId) {
            const isTextDomain = HA_TEXT_DOMAINS.some(d => entityId.startsWith(d));
            const attribute = (p.attribute || "").trim();

            if (isTextDomain) {
                isText1 = true;
            } else if (attribute && AppState?.entityStates?.[entityId]) {
                // If using an attribute, check the ACTUAL current value to decide type
                const attrVal = getNestedValue(AppState.entityStates[entityId].attributes, attribute);
                isText1 = !isStrictlyNumeric(attrVal);
            } else if (AppState?.entityStates?.[entityId]) {
                // Check state if no attribute
                const stateVal = AppState.entityStates[entityId].state;
                isText1 = !isStrictlyNumeric(stateVal);
            }
        }

        let isText2 = p.is_text_sensor;
        if (!isText2 && entityId2) {
            const isTextDomain2 = HA_TEXT_DOMAINS.some(d => entityId2.startsWith(d));
            const attribute2 = (p.attribute2 || "").trim();

            if (isTextDomain2) {
                isText2 = true;
            } else if (attribute2 && AppState?.entityStates?.[entityId2]) {
                const attrVal2 = getNestedValue(AppState.entityStates[entityId2].attributes, attribute2);
                isText2 = !isStrictlyNumeric(attrVal2);
            } else if (AppState?.entityStates?.[entityId2]) {
                const stateVal2 = AppState.entityStates[entityId2].state;
                isText2 = !isStrictlyNumeric(stateVal2);
            }
        }

        const attributePath = (p.attribute || "").trim();
        const rootAttr = (attributePath.includes(".") || attributePath.includes("[")) ? attributePath.split(/[.[]/)[0] : attributePath;
        const attributePath2 = (p.attribute2 || "").trim();
        const rootAttr2 = (attributePath2.includes(".") || attributePath2.includes("[")) ? attributePath2.split(/[.[]/)[0] : attributePath2;

        /** @param {string} eid @param {string} attr @param {string} [suffix=""] */
        const makeSafeId = (eid, attr, suffix = "") => {
            const base = attr ? (eid + "_" + attr) : eid;
            let safe = base.replace(/[^a-zA-Z0-9_]/g, "_");
            const maxBase = 63 - suffix.length;
            if (safe.length > maxBase) safe = safe.substring(0, maxBase);
            return safe + suffix;
        };

        const v1 = p.is_local_sensor ? `id(${entityId || "battery_level"}).state` :
            (isText1 ? `id(${makeSafeId(entityId, rootAttr, "_txt")}).state.c_str()` : `id(${makeSafeId(entityId, rootAttr)}).state`);

        const v2 = entityId2 ? (isText2 ? `id(${makeSafeId(entityId2, rootAttr2, "_txt")}).state.c_str()` : `id(${makeSafeId(entityId2, rootAttr2)}).state`) : null;

        const valFmt1 = isText1 ? "%s" : `%.${precision}f`;
        const valFmt2 = isText2 ? "%s" : `%.${precision}f`;

        const displayUnitStr = (p.hide_unit || format.endsWith("_no_unit")) ? "" : escapeFmt(unit);
        const prefixEsc = escapeFmt(p.prefix || "");
        const postfixEsc = escapeFmt(p.postfix || "");
        const separatorEsc = escapeFmt(p.separator || " ~ ");

        let title = (w.title || p.title || "").trim();
        if (!title && format.startsWith("label_")) {
            title = (entityId.split('.').pop() || entityId).replace(/_/g, ' ');
        }
        const titleEsc = escapeFmt(title);

        // Construct Format String
        let fmt = "";
        let args = "";

        // Combine value parts
        const fullValueFmt = `${prefixEsc}${valFmt1}${v2 ? separatorEsc + valFmt2 : ""}${displayUnitStr ? " " + displayUnitStr : ""}${postfixEsc}`;

        const arg1 = v1;
        const arg2 = v2;
        const valueArgs = v2 ? `${arg1}, ${arg2}` : arg1;

        if (format === "label_only") {
            fmt = titleEsc;
            args = ""; // No dynamic args
        } else if (format === "value_only" || format === "value_only_no_unit") {
            fmt = fullValueFmt;
            args = valueArgs;
        } else if (format === "label_value" || format === "label_value_no_unit") {
            fmt = `${titleEsc}: ${fullValueFmt}`;
            args = valueArgs;
        } else if (format === "value_label") {
            fmt = `${fullValueFmt} ${titleEsc}`;
            args = valueArgs;
        } else if (format === "label_newline_value" || format === "label_newline_value_no_unit") {
            fmt = `${titleEsc}\\n${fullValueFmt}`;
            args = valueArgs;
        } else {
            fmt = fullValueFmt;
            args = valueArgs;
        }

        // Generate Lambda
        let textLambda;
        if (!entityId && !p.is_local_sensor) {
            textLambda = `"${titleEsc}"`;
        } else if (args) {
            // Use floating point buffer size safety if needed, but return string directly via str_sprintf provided by ESPHome
            textLambda = `!lambda |-
          return str_sprintf("${fmt}", ${args}).c_str();`;
        } else {
            textLambda = `"${fmt}"`;
        }

        // Fix #268: Robust alignment mapping for LVGL
        let textAlign = "CENTER";
        const rawAlign = p.text_align || p.value_align || "TOP_LEFT";

        if (rawAlign.includes("LEFT")) {
            textAlign = "LEFT";
        } else if (rawAlign.includes("RIGHT")) {
            textAlign = "RIGHT";
        } else {
            // CENTER, TOP_CENTER, BOTTOM_CENTER -> CENTER
            textAlign = "CENTER";
        }

        let textColorVal = convertColor(p.color);
        if (p.dynamic_color_enabled && !isText1 && v1 && isColorDisplay(profile)) {
            const hexL = hexToRgb(p.dynamic_color_low || "#3498db");
            const hexH = hexToRgb(p.dynamic_color_high || "#e74c3c");
            const low = p.dynamic_value_low !== undefined ? p.dynamic_value_low : 0;
            const high = p.dynamic_value_high !== undefined ? p.dynamic_value_high : 100;
            const arg = v1.replace(".state", ".state"); // Just checking/using v1

            textColorVal = `!lambda |-
              float val = ${arg};
              float t = (val - (${low})) / (float)(${high} - (${low}));
              if (t < 0.0f) t = 0.0f;
              if (t > 1.0f) t = 1.0f;
              return lv_color_make(${hexL.r} + (uint8_t)(t * (${hexH.r} - ${hexL.r})), ${hexL.g} + (uint8_t)(t * (${hexH.g} - ${hexL.g})), ${hexL.b} + (uint8_t)(t * (${hexH.b} - ${hexL.b})));`;
        }

        return {
            label: {
                ...common,
                text: textLambda,
                text_font: getLVGLFont(p.font_family, format === "label_only" ? p.label_font_size : p.value_font_size, p.font_weight, p.italic),
                text_color: textColorVal,
                text_align: textAlign,
                bg_color: p.bg_color === "transparent" ? undefined : convertColor(p.bg_color),
                opa: formatOpacity(p.opa)
            }
        };
    };

/**
 * @param {SensorTextWidget} w
 * @param {Record<string, any>} helpers
 */
export const exportOpenDisplay = (w, { layout, _page }) => {
        const p = w.props || {};
        const entityId = (w.entity_id || "").trim();
        const entityId2 = (w.entity_id_2 || "").trim();
        const format = p.value_format || "label_value";
        const precision = parseInt(p.precision, 10) || 0;
        const separator = p.separator || " ~ ";
        const prefix = p.prefix || "";
        const postfix = p.postfix || "";
        const unit = (p.unit || "").trim();
        const fontSize = p.value_font_size || p.font_size || 20;

        // Convert theme_auto to actual color
        let color = p.color || "black";
        if (color === "theme_auto") {
            color = layout?.darkMode ? "white" : "black";
        }

        if (p.dynamic_color_enabled && !p.is_text_sensor) {
            // ODP: static fallback to dynamic_color_low (runtime interpolation not supported)
            color = p.dynamic_color_low || color;
        }

        // Mapping for alignment to ODP anchor
        /** @type {Record<string, string>} */
        const alignMap = {
            "TOP_LEFT": "lt", "TOP_CENTER": "ct", "TOP_RIGHT": "rt",
            "CENTER_LEFT": "lm", "CENTER_CENTER": "cm", "CENTER_RIGHT": "rm",
            "BOTTOM_LEFT": "lb", "BOTTOM_CENTER": "cb", "BOTTOM_RIGHT": "rb"
        };
        const anchor = alignMap[p.text_align] || "lt";

        const val1 = TemplateConverter.toHATemplate(entityId, { precision, isNumeric: !p.is_text_sensor });
        const val2 = entityId2 ? TemplateConverter.toHATemplate(entityId2, { precision, isNumeric: !p.is_text_sensor }) : null;

        const displayValue = val2 ? `${val1}${separator}${val2}` : val1;
        const fullValue = `${prefix}${displayValue}${unit ? " " + unit : ""}${postfix}`.trim();

        let title = (w.title || p.title || "").trim();
        if (!title && format.startsWith("label_")) {
            title = (entityId.split('.').pop() || entityId).replace(/_/g, ' ');
        }

        let text = "";
        if (format === "label_only") {
            text = title;
        } else if (format === "label_value" || format === "label_value_no_unit") {
            text = `${title}: ${fullValue}`;
        } else if (format === "label_newline_value" || format === "label_newline_value_no_unit") {
            // Use multiline type for newline formats
            return {
                type: "multiline",
                value: `${title}\n${fullValue}`,
                delimiter: "\n",
                x: Math.round(w.x),
                y: Math.round(w.y),
                offset_y: fontSize + 5,
                size: fontSize,
                color: color,
                font: p.font_family?.includes("Mono") ? "mononoki.ttf" : "ppb.ttf",
                parse_colors: !!p.parse_colors
            };
        } else if (format === "value_label") {
            text = `${fullValue} ${title}`;
        } else {
            text = fullValue;
        }

        /** @type {Record<string, any>} */
        const result = {
            type: "text",
            x: Math.round(w.x),
            y: Math.round(w.y),
            value: text,
            size: fontSize,
            color: color,
            anchor: anchor,
            font: p.font_family?.includes("Mono") ? "mononoki.ttf" : "ppb.ttf",
            parse_colors: !!p.parse_colors
        };

        if (w.width > 0) {
            result.max_width = Math.round(w.width);
            result.spacing = 5;
        }

        return result;
    };

/**
 * @param {SensorTextWidget} w
 * @param {Record<string, any>} helpers
 */
export const exportOEPL = (w, { layout, _page }) => {
        const p = w.props || {};
        const entityId = (w.entity_id || "").trim();
        const entityId2 = (w.entity_id_2 || "").trim();
        const format = p.value_format || "label_value";
        const precision = parseInt(p.precision, 10) || 0;
        const separator = p.separator || " ~ ";
        const prefix = p.prefix || "";
        const postfix = p.postfix || "";
        const unit = (p.unit || "").trim();

        // Convert theme_auto to actual color
        let color = p.color || "black";
        if (color === "theme_auto") {
            color = layout?.darkMode ? "white" : "black";
        }

        if (p.dynamic_color_enabled && !p.is_text_sensor) {
            // OEPL: static fallback to dynamic_color_low (runtime interpolation not supported)
            color = p.dynamic_color_low || color;
        }

        const val1 = TemplateConverter.toHATemplate(entityId, { precision, isNumeric: !p.is_text_sensor });
        const val2 = entityId2 ? TemplateConverter.toHATemplate(entityId2, { precision, isNumeric: !p.is_text_sensor }) : null;

        const displayValue = val2 ? `${val1}${separator}${val2}` : val1;
        const fullValue = `${prefix}${displayValue}${unit ? " " + unit : ""}${postfix}`.trim();

        let title = (w.title || p.title || "").trim();
        if (!title && format.startsWith("label_")) {
            title = (entityId.split('.').pop() || entityId).replace(/_/g, ' ');
        }

        let text = "";
        if (format === "label_only") {
            text = title;
        } else if (format === "label_value" || format === "label_value_no_unit") {
            text = `${title}: ${fullValue}`;
        } else if (format === "label_newline_value" || format === "label_newline_value_no_unit") {
            text = `${title}\n${fullValue}`;
        } else if (format === "value_label") {
            text = `${fullValue} ${title}`;
        } else {
            text = fullValue;
        }

        const fontSize = p.value_font_size || 20;
        const lineSpacing = 5;

        /** @type {Record<string, any>} */
        const result = {
            type: "text",
            value: text,
            x: Math.round(w.x),
            y: Math.round(w.y),
            size: fontSize,
            font: p.font_family?.includes("Mono") ? "mononoki.ttf" : "ppb.ttf",
            color: color,
            align: (p.text_align || "TOP_LEFT").toLowerCase().replace("top_", "").replace("bottom_", "").replace("_", ""),
            anchor: "lt",
            parse_colors: !!p.parse_colors,
            bg_color: p.bg_color || "transparent",
            opa: p.opa || 255,
            border_width: p.border_width || 0,
            border_color: p.border_color || "theme_auto",
            border_side: (p.border_width > 0) ? "full" : "none",
            radius: p.border_radius || 0
        };

        // Add max_width for automatic text wrapping when widget has width
        if (w.width && w.width > 0) {
            result.max_width = Math.round(w.width);
            result.spacing = lineSpacing;
        }

        return result;
    };

/**
 * @param {SensorTextWidget} w
 * @param {Record<string, any>} helpers
 */
export const collectRequirements = (w, { addFont }) => {
        const p = w.props || {};
        const family = p.font_family || "Roboto";
        const weight = p.font_weight || 400;
        const italic = !!p.italic;
        addFont(family, weight, p.label_font_size || 14, italic);
        addFont(family, weight, p.value_font_size || 20, italic);
    };
