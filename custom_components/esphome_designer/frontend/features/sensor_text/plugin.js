import { TemplateConverter } from '../../js/utils/template_converter.js';
import { wordWrap, parseColorMarkup, evaluateTemplatePreview } from '../../js/utils/text_utils.js';

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const entityStates = window.AppState?.entityStates || {};
    const entityId = widget.entity_id || "";
    const title = widget.title || "";
    const format = props.value_format || "label_value";
    let precision = parseInt(props.precision, 10);
    if (isNaN(precision)) precision = 2;
    const unitProp = props.unit || "";
    const labelFontSize = props.label_font_size || 14;
    const valueFontSize = props.value_font_size || 20;
    const fontFamily = (props.font_family || "Roboto") + ", sans-serif";
    const fontWeight = String(props.font_weight || 400);
    const fontStyle = props.italic ? "italic" : "normal";
    const color = props.color || "theme_auto";
    const colorStyle = getColorStyle(color);

    const entityId2 = widget.entity_id_2 || "";
    const separator = props.separator || " ~ ";

    let displayValue = "--";
    const isNoUnit = format && format.endsWith("_no_unit");
    let displayUnit = (props.hide_unit || isNoUnit) ? "" : unitProp;

    // Helper to format a single value
    const formatValue = (eId) => {
        if (window.AppState && window.AppState.entityStates && eId) {
            const entityObj = window.AppState.entityStates[eId];
            if (entityObj && entityObj.state !== undefined) {
                const strState = entityObj.formatted || String(entityObj.state);
                const rawState = entityObj.state;

                const match = strState.match(/^([-+]?\d*[.,]?\d+)(.*)$/);
                if (match) {
                    const val = parseFloat(match[1].replace(',', '.'));
                    const extractedUnit = match[2] ? match[2].trim() : "";

                    if (eId === entityId && (unitProp === undefined || unitProp === "") && !props.hide_unit && !isNoUnit) {
                        displayUnit = extractedUnit;
                    }
                    if (!isNaN(val)) {
                        if (!isNaN(precision) && precision >= 0) {
                            return val.toFixed(precision);
                        }
                        return val.toString();
                    }
                }
                if (eId === entityId && (unitProp === undefined || unitProp === "") && entityObj.attributes && entityObj.attributes.unit_of_measurement && !props.hide_unit && !isNoUnit) {
                    displayUnit = entityObj.attributes.unit_of_measurement;
                }

                if (isNoUnit || props.hide_unit) {
                    const numMatch = strState.match(/^([-+]?\d*[.,]?\d+)/);
                    if (numMatch) {
                        const numVal = parseFloat(numMatch[1].replace(',', '.'));
                        if (!isNaN(numVal)) {
                            if (!isNaN(precision) && precision >= 0) {
                                return numVal.toFixed(precision);
                            }
                            return numVal.toString();
                        }
                    }
                    return strState.replace(/\s*[°%]?[A-Za-z/²³]+\s*$/, '').trim() || strState;
                }
                return strState;
            }
        }
        return "--";
    };

    const val1 = formatValue(entityId);
    let val2 = null;
    if (entityId2) {
        val2 = formatValue(entityId2);
    }

    displayValue = val1;
    if (val2 !== null) {
        displayValue = `${val1}${separator}${val2}`;
    }

    if (displayUnit && displayValue.endsWith(displayUnit)) {
        displayUnit = "";
    }

    const prefixRaw = props.prefix || "";
    const postfixRaw = props.postfix || "";
    const prefix = evaluateTemplatePreview(prefixRaw, entityStates);
    const postfix = evaluateTemplatePreview(postfixRaw, entityStates);
    const fullValue = `${prefix}${displayValue}${displayUnit ? " " + displayUnit : ""}${postfix}`.trim();

    // Evaluate title template
    let effectiveTitleRaw = title;
    if (!effectiveTitleRaw && (format.startsWith("label_") || format === "value_label")) {
        if (window.AppState && window.AppState.entityStates && entityId) {
            const eObj = window.AppState.entityStates[entityId];
            if (eObj && eObj.attributes && eObj.attributes.friendly_name) {
                effectiveTitleRaw = eObj.attributes.friendly_name;
            } else if (entityId) {
                effectiveTitleRaw = entityId.split('.').pop().replace(/_/g, ' ');
            }
        }
    }
    const effectiveTitle = evaluateTemplatePreview(effectiveTitleRaw, entityStates);

    el.innerHTML = "";
    el.style.display = "flex";

    const applyAlign = (align, element) => {
        if (!align) return;
        // Fix #268: Robust alignment
        if (align.includes("LEFT")) element.style.textAlign = "left";
        else if (align.includes("RIGHT")) element.style.textAlign = "right";
        else element.style.textAlign = "center";
    };

    const applyFlexAlign = (align, element) => {
        if (!align) return;

        // Horizontal (Main Axis for Row, Cross Axis for Column - handled by specific flex-direction later)
        // But here we assume row or column? 
        // sensor_text uses:
        // - label_value: row (alignItems=baseline, justifyContent=start)
        // - label_newline_value: column (alignItems needs to match text align)

        // Let's standardise based on "justifyContent" as primary axis alignment
        // and "alignItems" as cross axis.

        // However, the caller sets flex-direction.
        // This helper is used for the main container `el` which is Flex.
        // `el` style is display:flex. Direction is not set here (defaults to row, but often set to column by plugin? No, sensor_text defaults `el` to just flex).
        // Wait, line 110: el.style.display = "flex";
        // It doesn't set direction. Default is ROW.

        // If ROW:
        // justifyContent = Horizontal (Left/Right/Center)
        // alignItems = Vertical (Top/Bottom/Center)

        // Horizontal
        if (align.includes("LEFT")) element.style.justifyContent = "flex-start";
        else if (align.includes("RIGHT")) element.style.justifyContent = "flex-end";
        else element.style.justifyContent = "center";

        // Vertical
        if (align.includes("TOP")) element.style.alignItems = "flex-start";
        else if (align.includes("BOTTOM")) element.style.alignItems = "flex-end";
        else element.style.alignItems = "center";
    };

    applyFlexAlign(props.text_align || "TOP_LEFT", el);

    const body = document.createElement("div");
    body.style.color = colorStyle;
    body.style.fontFamily = fontFamily;
    body.style.fontWeight = fontWeight;
    body.style.fontStyle = fontStyle;
    body.style.wordWrap = "break-word";
    body.style.overflowWrap = "break-word";
    body.style.maxWidth = "100%";

    if ((format === "label_value" || format === "label_value_no_unit") && effectiveTitle) {
        body.style.display = "flex";
        body.style.alignItems = "baseline";
        body.style.justifyContent = "flex-start";
        body.style.gap = "4px";

        const labelSpan = document.createElement("span");
        labelSpan.style.fontSize = `${labelFontSize}px`;
        if (props.parse_colors) {
            labelSpan.appendChild(parseColorMarkup(effectiveTitle + ":", colorStyle, getColorStyle));
        } else {
            labelSpan.textContent = effectiveTitle + ":";
        }

        const valueSpan = document.createElement("span");
        valueSpan.style.fontSize = `${valueFontSize}px`;
        if (props.parse_colors) {
            valueSpan.appendChild(parseColorMarkup(fullValue, colorStyle, getColorStyle));
        } else {
            valueSpan.textContent = fullValue;
        }

        const align = props.label_align || props.text_align || "TOP_LEFT";
        if (align.includes("CENTER")) body.style.justifyContent = "center";
        else if (align.includes("RIGHT")) body.style.justifyContent = "flex-end";
        else body.style.justifyContent = "flex-start";

        body.appendChild(labelSpan);
        body.appendChild(valueSpan);
    } else if ((format === "label_newline_value" || format === "label_newline_value_no_unit") && effectiveTitle) {
        body.style.display = "flex";
        body.style.flexDirection = "column";
        body.style.gap = "2px";
        body.style.width = "100%";

        const labelDiv = document.createElement("div");
        labelDiv.style.fontSize = `${labelFontSize}px`;
        if (props.parse_colors) {
            labelDiv.appendChild(parseColorMarkup(effectiveTitle, colorStyle, getColorStyle));
        } else {
            labelDiv.textContent = effectiveTitle;
        }
        applyAlign(props.label_align || props.text_align || "TOP_LEFT", labelDiv);

        const valueDiv = document.createElement("div");
        valueDiv.style.fontSize = `${valueFontSize}px`;
        if (props.parse_colors) {
            valueDiv.appendChild(parseColorMarkup(fullValue, colorStyle, getColorStyle));
        } else {
            valueDiv.textContent = fullValue;
        }
        applyAlign(props.value_align || props.text_align || "TOP_LEFT", valueDiv);

        body.appendChild(labelDiv);
        body.appendChild(valueDiv);
    } else if (format === "value_label" && effectiveTitle) {
        body.style.display = "flex";
        body.style.alignItems = "baseline";
        body.style.gap = "4px";

        const valueSpan = document.createElement("span");
        valueSpan.style.fontSize = `${valueFontSize}px`;
        if (props.parse_colors) {
            valueSpan.appendChild(parseColorMarkup(fullValue, colorStyle, getColorStyle));
        } else {
            valueSpan.textContent = fullValue;
        }

        const labelSpan = document.createElement("span");
        labelSpan.style.fontSize = `${labelFontSize}px`;
        if (props.parse_colors) {
            labelSpan.appendChild(parseColorMarkup(effectiveTitle, colorStyle, getColorStyle));
        } else {
            labelSpan.textContent = effectiveTitle;
        }

        body.appendChild(valueSpan);
        body.appendChild(labelSpan);
    } else if (format === "label_only") {
        body.style.fontSize = `${labelFontSize}px`;
        if (props.parse_colors) {
            body.appendChild(parseColorMarkup(effectiveTitle, colorStyle, getColorStyle));
        } else {
            body.textContent = effectiveTitle;
        }
        applyAlign(props.text_align || "TOP_LEFT", body);
    } else {
        body.style.fontSize = `${valueFontSize}px`;
        if (props.parse_colors) {
            const wrappedLines = wordWrap(fullValue, widget.width || 200, valueFontSize, fontFamily);
            wrappedLines.forEach((line, i) => {
                if (i > 0) body.appendChild(document.createElement("br"));
                body.appendChild(parseColorMarkup(line, colorStyle, getColorStyle));
            });
        } else {
            body.textContent = fullValue;
        }
        applyAlign(props.value_align || props.text_align || "TOP_LEFT", body);
    }

    // Apply Border & Background
    const borderWidth = props.border_width !== undefined ? props.border_width : 0;
    const hasBackground = props.fill || (props.bg_color && props.bg_color !== "transparent") || (props.background_color && props.background_color !== "transparent");

    if (borderWidth > 0 || hasBackground) {
        let resolvedBorderColor = props.border_color || "theme_auto";
        if (resolvedBorderColor === "theme_auto") {
            resolvedBorderColor = (window.AppState?.settings?.darkMode) ? "white" : "black";
        }

        if (borderWidth > 0) {
            body.style.border = `${borderWidth}px solid ${getColorStyle(resolvedBorderColor)}`;
        }

        if (hasBackground) {
            const bgCol = props.background_color || props.bg_color || (props.fill ? "white" : "transparent");
            body.style.backgroundColor = getColorStyle(bgCol);
        }

        body.style.borderRadius = `${props.border_radius || 0}px`;
        body.style.boxSizing = "border-box";
    }

    el.appendChild(body);
};

export default {
    id: "sensor_text",
    name: "Sensor Text",
    category: "Sensors",
    supportedModes: ['lvgl', 'direct', 'oepl', 'opendisplay'],
    defaults: {
        entity_id: "",
        title: "",
        value_format: "label_value",
        label_font_size: 14,
        value_font_size: 20,
        unit: "",
        precision: 2,
        text_align: "TOP_LEFT",
        color: "theme_auto",
        font_family: "Roboto",
        parse_colors: false,
        bg_color: "transparent",
        opa: 255,
        border_width: 0,
        border_color: "theme_auto",
        border_radius: 0,
    },

    render,
    exportLVGL: (w, { common, convertColor, convertAlign, getLVGLFont, formatOpacity }) => {
        const p = w.props || {};
        const format = p.value_format || "label_value";
        let entityId = (w.entity_id || "").trim();
        let entityId2 = (w.entity_id_2 || "").trim();

        // Ensure sensor. prefix if missing (reuse logic from export)
        if (entityId && !p.is_local_sensor && !entityId.includes(".") && !entityId.startsWith("text_sensor.")) {
            entityId = `sensor.${entityId}`;
        }
        if (entityId2 && !p.is_local_sensor && !entityId2.includes(".") && !entityId2.startsWith("text_sensor.")) {
            entityId2 = `sensor.${entityId2}`;
        }

        let unit = (p.unit || "").trim();

        // Auto-detect unit if missing and not suppressed (same logic as direct export)
        if (!unit && !p.hide_unit && !format.endsWith("_no_unit") && window.AppState && window.AppState.entityStates) {
            const eObj = window.AppState.entityStates[entityId];
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
        const escapeFmt = (str) => (str || "").replace(/"/g, '\\"').replace(/%/g, "%%");

        let precision = parseInt(p.precision, 10);
        if (isNaN(precision) || precision < 0) precision = 2;

        const isText1 = p.is_text_sensor || (entityId && (entityId.startsWith("text_sensor.") || entityId.startsWith("weather.")));
        const isText2 = p.is_text_sensor || (entityId2 && (entityId2.startsWith("text_sensor.") || entityId2.startsWith("weather.")));

        // Helper to get safe ID
        const makeSafeId = (eid, suffix = "") => {
            let safe = eid.replace(/[^a-zA-Z0-9_]/g, "_");
            const maxBase = 63 - suffix.length;
            if (safe.length > maxBase) safe = safe.substring(0, maxBase);
            return safe + suffix;
        };

        const v1 = p.is_local_sensor ? `id(${entityId || "battery_level"}).state` :
            (isText1 ? `id(${makeSafeId(entityId, "_txt")}).state.c_str()` : `id(${makeSafeId(entityId)}).state`);

        const v2 = entityId2 ? (isText2 ? `id(${makeSafeId(entityId2, "_txt")}).state.c_str()` : `id(${makeSafeId(entityId2)}).state`) : null;

        const valFmt1 = isText1 ? "%s" : `%.${precision}f`;
        const valFmt2 = isText2 ? "%s" : `%.${precision}f`;

        const displayUnitStr = (p.hide_unit || format.endsWith("_no_unit")) ? "" : escapeFmt(unit);
        const prefixEsc = escapeFmt(p.prefix || "");
        const postfixEsc = escapeFmt(p.postfix || "");
        const separatorEsc = escapeFmt(p.separator || " ~ ");

        let title = (w.title || p.title || "").trim();
        if (!title && format.startsWith("label_")) {
            title = entityId.split('.').pop().replace(/_/g, ' ');
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

        return {
            label: {
                ...common,
                text: textLambda,
                text_font: getLVGLFont(p.font_family, format === "label_only" ? p.label_font_size : p.value_font_size, p.font_weight, p.italic),
                text_color: convertColor(p.color),
                text_align: textAlign,
                bg_color: p.bg_color === "transparent" ? undefined : convertColor(p.bg_color),
                opa: formatOpacity(p.opa)
            }
        };
    },
    exportOpenDisplay: (w, { layout, page }) => {
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

        // Mapping for alignment to ODP anchor
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
            title = entityId.split('.').pop().replace(/_/g, ' ');
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
    },
    exportOEPL: (w, { layout, page }) => {
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

        const val1 = TemplateConverter.toHATemplate(entityId, { precision, isNumeric: !p.is_text_sensor });
        const val2 = entityId2 ? TemplateConverter.toHATemplate(entityId2, { precision, isNumeric: !p.is_text_sensor }) : null;

        const displayValue = val2 ? `${val1}${separator}${val2}` : val1;
        const fullValue = `${prefix}${displayValue}${unit ? " " + unit : ""}${postfix}`.trim();

        let title = (w.title || p.title || "").trim();
        if (!title && format.startsWith("label_")) {
            title = entityId.split('.').pop().replace(/_/g, ' ');
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
    },
    collectRequirements: (w, { addFont }) => {
        const p = w.props || {};
        const family = p.font_family || "Roboto";
        const weight = p.font_weight || 400;
        const italic = !!p.italic;
        addFont(family, weight, p.label_font_size || 14, italic);
        addFont(family, weight, p.value_font_size || 20, italic);
    },

    export: (w, context) => {
        const {
            lines, getColorConst, addFont, getCondProps, getConditionCheck, Utils
        } = context;

        const p = w.props || {};
        let entityId = (w.entity_id || "").trim();
        let entityId2 = (w.entity_id_2 || "").trim();

        // Ensure sensor. prefix if missing and it's not a local sensor
        if (entityId && !p.is_local_sensor && !entityId.includes(".") && !entityId.startsWith("text_sensor.")) {
            entityId = `sensor.${entityId}`;
        }
        if (entityId2 && !p.is_local_sensor && !entityId2.includes(".") && !entityId2.startsWith("text_sensor.")) {
            entityId2 = `sensor.${entityId2}`;
        }

        const format = p.value_format || "label_value";
        let unit = (p.unit || "").trim();

        // Auto-detect unit if missing and not suppressed
        if (!unit && !p.hide_unit && !format.endsWith("_no_unit") && window.AppState && window.AppState.entityStates) {
            const eObj = window.AppState.entityStates[entityId];
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
        const escapeFmt = (str) => (str || "").replace(/%/g, "%%");

        lines.push(`        // widget:sensor_text id:${w.id} type:sensor_text x:${w.x} y:${w.y} w:${w.width} h:${w.height} align:${textAlign} entity:"${entityId}" format:"${format}" ${getCondProps(w)}`);

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

        // Helper to check if an entity's current state is non-numeric (auto-detect text sensor)
        const isEntityStateNonNumeric = (eid) => {
            if (!eid || !window.AppState?.entityStates) return false;
            const entityObj = window.AppState.entityStates[eid];
            if (!entityObj || entityObj.state === undefined) return false;
            const stateStr = String(entityObj.state);
            // Check if it's a number (including negative and decimals)
            return isNaN(parseFloat(stateStr)) || !isFinite(parseFloat(stateStr));
        };

        // Helper to create safe ESPHome ID (max 59 chars before suffix for 63 char limit)
        const makeSafeId = (eid, suffix = "") => {
            let safe = eid.replace(/[^a-zA-Z0-9_]/g, "_");
            const maxBase = 63 - suffix.length;
            if (safe.length > maxBase) safe = safe.substring(0, maxBase);
            return safe + suffix;
        };

        // Auto-detect: Check if entity state is non-numeric (like "pm25")
        const autoDetectText1 = !p.is_local_sensor && isEntityStateNonNumeric(entityId);
        const autoDetectText2 = !p.is_local_sensor && entityId2 && isEntityStateNonNumeric(entityId2);

        const isText1 = p.is_text_sensor || autoDetectText1 || (entityId && (entityId.startsWith("text_sensor.") || entityId.startsWith("weather.")));
        const isText2 = (entityId2 && (p.is_text_sensor || autoDetectText2 || entityId2.startsWith("text_sensor.") || entityId2.startsWith("weather.")));

        // Helper to get ESPHome variable name for an entity
        const getVarName = (eid, isText) => {
            if (p.is_local_sensor) return `id(${eid || "battery_level"})`;
            if (isText) return `id(${makeSafeId(eid, "_txt")})`;
            return `id(${makeSafeId(eid)})`;
        };

        const v1 = getVarName(entityId, isText1);
        const v2 = entityId2 ? getVarName(entityId2, isText2) : null;

        const valFmt1 = isText1 ? "%s" : `%.${precision}f`;
        const valFmt2 = isText2 ? "%s" : `%.${precision}f`;
        // Format parts
        let title = (w.title || p.title || "").trim();
        if (!title && (format.startsWith("label_"))) {
            title = entityId.split('.').pop().replace(/_/g, ' '); // Minimal fallback
        }

        const displayUnitStr = (p.hide_unit || format.endsWith("_no_unit")) ? "" : escapeFmt(unit);
        const prefixEsc = escapeFmt(prefix);
        const postfixEsc = escapeFmt(postfix);
        const separatorEsc = escapeFmt(separator);

        // Alignment Mapping
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

        if (format === "label_only") {
            lines.push(`        it.printf(${xVal}, ${yVal}, id(${labelFontId}), ${color}, ${labelAlign}, "${title}");`);
        } else if (format === "value_only" || format === "value_only_no_unit" || !title) {
            // Use runtime word-wrap if widget has meaningful width
            const useWrapping = w.width && w.width > 50;
            if (useWrapping) {
                const lineHeight = valueFS + 4;
                lines.push(`        {`);
                lines.push(`          char wrap_buf[512];`);
                lines.push(`          sprintf(wrap_buf, "${finalValFmt}", ${args});`);
                lines.push(`          print_wrapped_text(${xVal}, ${yVal}, ${w.width}, ${lineHeight}, id(${valueFontId}), ${color}, ${valueAlign}, wrap_buf);`);
                lines.push(`        }`);
            } else {
                lines.push(`        it.printf(${xVal}, ${yVal}, id(${valueFontId}), ${color}, ${valueAlign}, "${finalValFmt}", ${args});`);
            }
        } else if (format === "label_value" || format === "label_value_no_unit") {
            // Horizontal layout: "Label: Value"
            const labelStr = `${title}${title.endsWith(":") ? "" : ":"} `;

            // If fonts differ and we are left-aligned, OR if we need to wrap the value, we must split the print
            // We use get_width() to position the value immediately after the label
            const useWrapping = w.width && w.width > 50;
            if ((labelFS !== valueFS && textAlign.includes("LEFT")) || useWrapping) {
                const align = getAlign(textAlign);
                lines.push(`        {`);
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
                    lines.push(`          it.printf(${xVal}, ${yVal}, id(${labelFontId}), ${color}, ${align}, "${labelStr}");`);
                    lines.push(`          int val_max_w = ${w.width} - w1;`);
                    lines.push(`          // Heuristic: if label is taller than value font, adjust y? mostly fine to align tops or just let baselines float.`);
                    lines.push(`          // Let's assume top alignment is safer for multi-line flow.`);
                    lines.push(`          print_wrapped_text(${xVal} + w1, ${yVal} + (bl1 - ${Math.round(valueFS * 0.8)}), val_max_w, ${lineHeight}, id(${valueFontId}), ${color}, ${align}, value_buf);`);
                } else {
                    lines.push(`          id(${valueFontId})->measure(value_buf, &w2, &xoff2, &bl2, &h2);`);
                    lines.push(`          // Align baselines: yVal + bl1 = yVal2 + bl2 => yVal2 = yVal + bl1 - bl2`);
                    lines.push(`          it.printf(${xVal}, ${yVal}, id(${labelFontId}), ${color}, ${align}, "${labelStr}");`);
                    lines.push(`          it.printf(${xVal} + w1, ${yVal} + (bl1 - bl2), id(${valueFontId}), ${color}, ${align}, "%s", value_buf);`);
                }
                lines.push(`        }`);
            } else {
                // Single printf for perfect alignment (same font or non-left align)
                lines.push(`        it.printf(${xVal}, ${yVal}, id(${valueFontId}), ${color}, ${valueAlign}, "${labelStr}${finalValFmt}", ${args});`);
            }
        } else if (format === "label_newline_value" || format === "label_newline_value_no_unit") {
            // Vertical layout: calculate offsets for centering
            // lineDist is the distance between the center/baseline of line 1 and line 2
            const lineDist = labelFS + 4;
            let yOff = 0;
            if (textAlign.includes("BOTTOM")) yOff = -lineDist;
            else if (!textAlign.includes("TOP")) yOff = -lineDist / 2;

            lines.push(`        it.printf(${xVal}, ${yVal} + ${yOff}, id(${labelFontId}), ${color}, ${labelAlign}, "${title}");`);
            lines.push(`        it.printf(${xVal}, ${yVal} + ${yOff} + ${lineDist}, id(${valueFontId}), ${color}, ${valueAlign}, "${finalValFmt}", ${args});`);
        } else if (format === "value_label") {
            lines.push(`        it.printf(${xVal}, ${yVal}, id(${valueFontId}), ${color}, ${valueAlign}, "${finalValFmt}", ${args});`);

            const offset = Math.round(valueFS * 0.6 * 6) + 10; // Guessed value width
            lines.push(`        it.printf(${xVal} + ${offset}, ${yVal}, id(${labelFontId}), ${color}, ${labelAlign}, "${title}");`);
        }

        if (cond) lines.push(`        }`);
    },

    onExportTextSensors: (context) => {
        const { lines, widgets } = context;
        if (!widgets) return;

        // Helper to check if an entity's current state is non-numeric
        const isEntityStateNonNumeric = (eid) => {
            if (!eid || !window.AppState?.entityStates) return false;
            const entityObj = window.AppState.entityStates[eid];
            if (!entityObj || entityObj.state === undefined) return false;
            const stateStr = String(entityObj.state);
            return isNaN(parseFloat(stateStr)) || !isFinite(parseFloat(stateStr));
        };

        // Helper to create safe ESPHome ID (max 59 chars before suffix)
        const makeSafeId = (eid, suffix = "") => {
            let safe = eid.replace(/[^a-zA-Z0-9_]/g, "_");
            const maxBase = 63 - suffix.length;
            if (safe.length > maxBase) safe = safe.substring(0, maxBase);
            return safe + suffix;
        };

        const weatherEntities = new Set();
        const textEntities = new Set();

        for (const w of widgets) {
            if (w.type !== "sensor_text") continue;

            const p = w.props || {};
            const entityId = (w.entity_id || "").trim();

            // Auto-detect: check if entity has non-numeric state (like "pm25")
            const isAutoText = !p.is_local_sensor && isEntityStateNonNumeric(entityId);

            if (entityId.startsWith("weather.")) {
                weatherEntities.add(entityId);
            } else if (p.is_text_sensor || isAutoText || entityId.startsWith("text_sensor.")) {
                textEntities.add(entityId);
            }

            const entityId2 = (w.entity_id_2 || p.entity_id_2 || "").trim();
            if (entityId2) {
                const isAutoText2 = !p.is_local_sensor && isEntityStateNonNumeric(entityId2);
                if (entityId2.startsWith("weather.")) {
                    weatherEntities.add(entityId2);
                } else if (p.is_text_sensor || isAutoText2 || entityId2.startsWith("text_sensor.")) {
                    textEntities.add(entityId2);
                }
            }
        }

        if (weatherEntities.size > 0) {
            let headerAdded = false;
            for (let entityId of weatherEntities) {
                if (entityId && !entityId.includes(".")) entityId = `weather.${entityId}`;
                const safeId = makeSafeId(entityId, "_txt");
                if (context.seenSensorIds && context.seenSensorIds.has(safeId)) continue;
                if (context.seenTextEntityIds && context.seenTextEntityIds.has(entityId)) continue;

                if (!headerAdded) {
                    lines.push("# Weather Entity Sensors (Detected from Sensor Text)");
                    headerAdded = true;
                }

                if (context.seenSensorIds) context.seenSensorIds.add(safeId);
                if (context.seenTextEntityIds) context.seenTextEntityIds.add(entityId);

                lines.push("- platform: homeassistant");
                lines.push(`  id: ${safeId}`);
                lines.push(`  entity_id: ${entityId}`);
                lines.push(`  internal: true`);
            }
        }

        if (textEntities.size > 0) {
            let headerAdded = false;
            for (let entityId of textEntities) {
                // Don't add text_sensor prefix to sensor.* entities - just register them as text sensors
                const safeId = makeSafeId(entityId, "_txt");
                if (context.seenSensorIds && context.seenSensorIds.has(safeId)) continue;
                if (context.seenTextEntityIds && context.seenTextEntityIds.has(entityId)) continue;

                if (!headerAdded) {
                    lines.push("# Text Sensors (Detected from Sensor Text)");
                    headerAdded = true;
                }

                if (context.seenSensorIds) context.seenSensorIds.add(safeId);
                if (context.seenTextEntityIds) context.seenTextEntityIds.add(entityId);

                lines.push("- platform: homeassistant");
                lines.push(`  id: ${safeId}`);
                lines.push(`  entity_id: ${entityId}`);
                lines.push(`  internal: true`);
            }
        }
    },

    onExportNumericSensors: (context) => {
        const { widgets, isLvgl, pendingTriggers } = context;
        if (!widgets) return;

        // Helper to check if an entity's current state is non-numeric
        const isEntityStateNonNumeric = (eid) => {
            if (!eid || !window.AppState?.entityStates) return false;
            const entityObj = window.AppState.entityStates[eid];
            if (!entityObj || entityObj.state === undefined) return false;
            const stateStr = String(entityObj.state);
            return isNaN(parseFloat(stateStr)) || !isFinite(parseFloat(stateStr));
        };

        for (const w of widgets) {
            if (w.type !== "sensor_text") continue;

            const p = w.props || {};
            if (p.is_local_sensor) continue;

            const entities = [w.entity_id, w.entity_id_2].filter(id => id && id.trim());

            for (let eid of entities) {
                eid = eid.trim();

                // Skip if explicitly a text sensor, weather entity, or auto-detected as text
                if (p.is_text_sensor || eid.startsWith("weather.") || eid.startsWith("text_sensor.")) continue;
                if (isEntityStateNonNumeric(eid)) continue; // Skip auto-detected text sensors

                // Ensure sensor. prefix if missing
                if (!eid.includes(".")) {
                    eid = `sensor.${eid}`;
                }

                if (isLvgl && pendingTriggers) {
                    if (!pendingTriggers.has(eid)) {
                        pendingTriggers.set(eid, new Set());
                    }
                    pendingTriggers.get(eid).add(`- lvgl.widget.refresh: ${w.id}`);
                }
            }
        }
    }
};
