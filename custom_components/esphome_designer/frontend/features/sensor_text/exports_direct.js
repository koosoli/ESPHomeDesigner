import { AppState } from '@core/state';
import { getNestedValue } from '../../js/utils/helpers.js';
import { HA_TEXT_DOMAINS, hexToRgb, isColorDisplay, isStrictlyNumeric } from './shared.js';

/** @typedef {Widget & { props?: Record<string, any>, entity_id?: string, entity_id_2?: string, title?: string }} SensorTextWidget */

/**
 * @param {SensorTextWidget} w
 * @param {Record<string, any>} context
 */
export const exportDirect = (w, context) => {
        const {
            lines, getColorConst, addFont, getCondProps, getConditionCheck, Utils // eslint-disable-line no-unused-vars
        } = context;

        const p = w.props || {};
        let entityId = (w.entity_id || "").trim();
        let entityId2 = (w.entity_id_2 || "").trim();

        // Ensure sensor. prefix if missing and it's not a local sensor or mqtt entity
        if (entityId && !p.is_local_sensor && !entityId.includes(".") && !entityId.startsWith("text_sensor.") && !entityId.toLowerCase().startsWith("mqtt:")) {
            entityId = `sensor.${entityId}`;
        }
        if (entityId2 && !p.is_local_sensor && !entityId2.includes(".") && !entityId2.startsWith("text_sensor.") && !entityId2.toLowerCase().startsWith("mqtt:")) {
            entityId2 = `sensor.${entityId2}`;
        }

        const format = p.value_format || "label_value";
        let unit = (p.unit || "").trim();

        // Auto-detect unit if missing and not suppressed
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
            else if (eid.includes("_humidity")) unit = "%";
            else if (eid.includes("_voltage") || eid.includes("_volt")) unit = "V";
            else if (eid.includes("_current") || eid.includes("_amp")) unit = "A";
            else if (eid.includes("_battery")) unit = "%";
            else if (eid.includes("_pressure") || eid.includes("_hpa")) unit = "hPa";
            else if (eid.includes("_speed") || eid.includes("_kmh")) unit = "km/h";
            else if (eid.includes("_percent") || eid.includes("_pct")) unit = "%";
        }

        const labelFS = p.label_font_size || 14;
        const valueFS = p.value_font_size || 20;
        const family = p.font_family || "Roboto";
        const weight = p.font_weight || 400;
        const italic = !!p.italic;
        const colorProp = p.color || "theme_auto";
        const color = getColorConst(colorProp);
        const textAlign = p.text_align || "TOP_LEFT";
        const separator = p.separator || " ~ ";
        const prefix = p.prefix || "";
        const postfix = p.postfix || "";
        let precision = parseInt(p.precision, 10);
        if (isNaN(precision) || precision < 0) precision = 2;

        // Escaping helper for printf
        /** @param {string | undefined | null} str */
        const escapeFmt = (str) => (str || "").replace(/%/g, "%%");


        // Background fill
        const bgColorProp = p.bg_color || p.background_color || "transparent";
        if (bgColorProp && bgColorProp !== "transparent") {
            const bgColorConst = getColorConst(bgColorProp);
            lines.push(`        it.filled_rectangle(${w.x}, ${w.y}, ${w.width}, ${w.height}, ${bgColorConst});`);
        }

        // Draw Border if defined
        const borderWidth = p.border_width || 0;
        if (borderWidth > 0) {
            const borderColor = getColorConst(p.border_color || "theme_auto");
            for (let i = 0; i < borderWidth; i++) {
                lines.push(`        it.rectangle(${w.x} + ${i}, ${w.y} + ${i}, ${w.width} - 2 * ${i}, ${w.height} - 2 * ${i}, ${borderColor});`);
            }
        }

        if (!entityId && !p.is_local_sensor) {
            lines.push(`        // Sensor ID missing for this widget`);
            return;
        }

        const labelFontId = addFont(family, weight, labelFS, italic);
        const valueFontId = addFont(family, weight, valueFS, italic);

        const cond = getConditionCheck(w);
        if (cond) lines.push(`        ${cond}`);


        // Helper to create safe ESPHome ID (max 59 chars before suffix for 63 char limit)
        const attributePath1 = (p.attribute || "").trim();
        const rootAttr1 = (attributePath1.includes(".") || attributePath1.includes("[")) ? attributePath1.split(/[.[]/)[0] : attributePath1;
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


        // Auto-detect: Check domain and if entity state is non-numeric (like "pm25") or using a string attribute
        let isText1 = p.is_text_sensor || (entityId && HA_TEXT_DOMAINS.some(d => entityId.startsWith(d)));
        if (!isText1 && entityId && AppState?.entityStates?.[entityId]) {
            const attribute = (p.attribute || "").trim();
            if (attribute) {
                const attrVal = getNestedValue(AppState.entityStates[entityId].attributes, attribute);
                isText1 = !isStrictlyNumeric(attrVal);
            } else {
                isText1 = !isStrictlyNumeric(AppState.entityStates[entityId].state);
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

        // Helper to get ESPHome variable name for an entity
        /** @param {string} eid @param {string} attr @param {boolean} isText */
        const getVarName = (eid, attr, isText) => {
            if (p.is_local_sensor) return `id(${eid || "battery_level"})`;
            if (isText) return `id(${makeSafeId(eid, attr, "_txt")})`;
            return `id(${makeSafeId(eid, attr)})`;
        };

        const v1 = getVarName(entityId, rootAttr1, isText1);
        const v2 = entityId2 ? getVarName(entityId2, rootAttr2, isText2) : null;

        const valFmt1 = isText1 ? "%s" : `%.${precision}f`;
        const valFmt2 = isText2 ? "%s" : `%.${precision}f`;
        // Format parts
        let title = (w.title || p.title || "").trim();
        if (!title && (format.startsWith("label_"))) {
            // Strip mqtt: prefix for display label
            let labelSource = entityId;
            if (labelSource.toLowerCase().startsWith("mqtt:")) labelSource = labelSource.substring(5);
            title = (labelSource.split('.').pop() || labelSource).replace(/_/g, ' ').replace(/\//g, ' '); // Minimal fallback
        }

        const displayUnitStr = (p.hide_unit || format.endsWith("_no_unit")) ? "" : escapeFmt(unit);
        const prefixEsc = escapeFmt(prefix);
        const postfixEsc = escapeFmt(postfix);
        const separatorEsc = escapeFmt(separator);

        // Alignment Mapping
        /** @param {string} a */
        const getAlign = (a) => {
            if (!a) return "TextAlign::TOP_LEFT";
            if (a === "CENTER") return "TextAlign::CENTER";
            return `TextAlign::${a}`;
        };

        const labelAlign = getAlign(p.label_align || textAlign);
        const valueAlign = getAlign(p.value_align || textAlign);

        // Positioning Helpers
        let xVal = w.x;
        let yVal = w.y;

        // Fix #259: Check RIGHT/LEFT first since "CENTER_RIGHT" contains both "CENTER" and "RIGHT"
        const isRight = textAlign.includes("RIGHT");
        const isLeft = textAlign.includes("LEFT");

        if (isRight) xVal = Math.round(w.x + w.width);
        else if (!isLeft) xVal = Math.round(w.x + w.width / 2); // CENTER (horizontal)

        if (textAlign.includes("BOTTOM")) yVal = Math.round(w.y + w.height);
        else if (!textAlign.includes("TOP")) yVal = Math.round(w.y + w.height / 2); // Middle

        // Determine format string for values
        const finalValFmt = `${prefixEsc}${valFmt1}${v2 ? separatorEsc + valFmt2 : ""}${displayUnitStr ? " " + displayUnitStr : ""}${postfixEsc}`;

        const arg1 = isText1 ? `${v1}.state.c_str()` : `${v1}.state`;
        const arg2 = v2 ? (isText2 ? `${v2}.state.c_str()` : `${v2}.state`) : null;
        const args = v2 ? `${arg1}, ${arg2}` : arg1;
        // Determine color variable logic
        let colorVar = color;
        let useDynamicColor = p.dynamic_color_enabled && !isText1 && v1 && isColorDisplay(context.profile);

        if (useDynamicColor) {
            colorVar = "dyn_color";
            const hexL = hexToRgb(p.dynamic_color_low || "#3498db");
            const hexH = hexToRgb(p.dynamic_color_high || "#e74c3c");
            const low = p.dynamic_value_low !== undefined ? p.dynamic_value_low : 0;
            const high = p.dynamic_value_high !== undefined ? p.dynamic_value_high : 100;

            lines.push(`        {`);
            lines.push(`          float val = ${arg1};`);
            lines.push(`          float t = (val - (${low})) / (float)(${high} - (${low}));`);
            lines.push(`          if (t < 0.0f) t = 0.0f;`);
            lines.push(`          if (t > 1.0f) t = 1.0f;`);
            lines.push(`          uint8_t r = ${hexL.r} + (uint8_t)(t * (${hexH.r} - ${hexL.r}));`);
            lines.push(`          uint8_t g = ${hexL.g} + (uint8_t)(t * (${hexH.g} - ${hexL.g}));`);
            lines.push(`          uint8_t b = ${hexL.b} + (uint8_t)(t * (${hexH.b} - ${hexL.b}));`);
            lines.push(`          Color dyn_color(r, g, b);`);
        }

        if (format === "label_only") {
            lines.push(`        it.printf(${xVal}, ${yVal}, id(${labelFontId}), ${colorVar}, ${labelAlign}, "${title}");`);
        } else if (format === "value_only" || format === "value_only_no_unit" || !title) {
            // Use runtime word-wrap if widget has meaningful width
            const useWrapping = w.width && w.width > 50;
            if (useWrapping) {
                const lineHeight = valueFS + 4;
                if (!useDynamicColor) lines.push(`        {`);
                lines.push(`          char wrap_buf[512];`);
                lines.push(`          sprintf(wrap_buf, "${finalValFmt}", ${args});`);
                lines.push(`          print_wrapped_text(${xVal}, ${yVal}, ${w.width}, ${lineHeight}, id(${valueFontId}), ${colorVar}, ${valueAlign}, wrap_buf);`);
                if (!useDynamicColor) lines.push(`        }`);
            } else {
                lines.push(`        it.printf(${xVal}, ${yVal}, id(${valueFontId}), ${colorVar}, ${valueAlign}, "${finalValFmt}", ${args});`);
            }
        } else if (format === "label_value" || format === "label_value_no_unit") {
            // Horizontal layout: "Label: Value"
            const labelStr = `${title}${title.endsWith(":") ? "" : ":"} `;

            // If fonts differ and we are left-aligned, OR if we need to wrap the value, we must split the print
            // We use get_width() to position the value immediately after the label
            const useWrapping = w.width && w.width > 50;
            if ((labelFS !== valueFS && textAlign.includes("LEFT")) || useWrapping) {
                const align = getAlign(textAlign);
                if (!useDynamicColor) lines.push(`        {`);
                lines.push(`          int w1, h1, xoff1, bl1;`);
                lines.push(`          int w2, h2, xoff2, bl2;`);
                lines.push(`          char value_buf[512];`);
                lines.push(`          sprintf(value_buf, "${finalValFmt}", ${args});`);
                lines.push(`          id(${labelFontId})->measure("${labelStr}", &w1, &xoff1, &bl1, &h1);`);
                if (useWrapping) {
                    const lineHeight = valueFS + 4;
                    lines.push(`          // Align baselines for first line: yVal + bl1 = yVal2 + bl2`);
                    lines.push(`          // Note: we can't easily align baselines perfectly without measuring the value's first line first,`);
                    lines.push(`          // but we can approximate or just use top-aligned reference.`);
                    lines.push(`          // For wrapped text, we print the label, then wrap the rest.`);
                    lines.push(`          it.printf(${xVal}, ${yVal}, id(${labelFontId}), ${colorVar}, ${align}, "${labelStr}");`);
                    lines.push(`          int val_max_w = ${w.width} - w1;`);
                    lines.push(`          // Heuristic: if label is taller than value font, adjust y? mostly fine to align tops or just let baselines float.`);
                    lines.push(`          // Let's assume top alignment is safer for multi-line flow.`);
                    lines.push(`          print_wrapped_text(${xVal} + w1, ${yVal} + (bl1 - ${Math.round(valueFS * 0.8)}), val_max_w, ${lineHeight}, id(${valueFontId}), ${colorVar}, ${align}, value_buf);`);
                } else {
                    lines.push(`          id(${valueFontId})->measure(value_buf, &w2, &xoff2, &bl2, &h2);`);
                    lines.push(`          // Align baselines: yVal + bl1 = yVal2 + bl2 => yVal2 = yVal + bl1 - bl2`);
                    lines.push(`          it.printf(${xVal}, ${yVal}, id(${labelFontId}), ${colorVar}, ${align}, "${labelStr}");`);
                    lines.push(`          it.printf(${xVal} + w1, ${yVal} + (bl1 - bl2), id(${valueFontId}), ${colorVar}, ${align}, "%s", value_buf);`);
                }
                if (!useDynamicColor) lines.push(`        }`);
            } else {
                // Single printf for perfect alignment (same font or non-left align)
                lines.push(`        it.printf(${xVal}, ${yVal}, id(${valueFontId}), ${colorVar}, ${valueAlign}, "${labelStr}${finalValFmt}", ${args});`);
            }
        } else if (format === "label_newline_value" || format === "label_newline_value_no_unit") {
            // Vertical layout: calculate offsets for centering
            // lineDist is the distance between the center/baseline of line 1 and line 2
            const lineDist = labelFS + 4;
            let yOff = 0;
            if (textAlign.includes("BOTTOM")) yOff = -lineDist;
            else if (!textAlign.includes("TOP")) yOff = -lineDist / 2;

            lines.push(`        it.printf(${xVal}, ${yVal} + ${yOff}, id(${labelFontId}), ${colorVar}, ${labelAlign}, "${title}");`);
            lines.push(`        it.printf(${xVal}, ${yVal} + ${yOff} + ${lineDist}, id(${valueFontId}), ${colorVar}, ${valueAlign}, "${finalValFmt}", ${args});`);
        } else if (format === "value_label") {
            lines.push(`        it.printf(${xVal}, ${yVal}, id(${valueFontId}), ${colorVar}, ${valueAlign}, "${finalValFmt}", ${args});`);

            const offset = Math.round(valueFS * 0.6 * 6) + 10; // Guessed value width
            lines.push(`        it.printf(${xVal} + ${offset}, ${yVal}, id(${labelFontId}), ${colorVar}, ${labelAlign}, "${title}");`);
        }

        if (useDynamicColor) {
            lines.push(`        }`);
        }

        if (cond) lines.push(`        }`);
    };
