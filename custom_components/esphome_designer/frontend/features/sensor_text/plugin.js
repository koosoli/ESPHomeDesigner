/**
 * Sensor Text Plugin
 * @description Displays a single or double sensor value with optional label and unit.
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
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
    const colorStyle = getColorStyle(props.color);

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

    let effectiveTitle = title;
    if (!effectiveTitle && (format.startsWith("label_") || format === "value_label")) {
        if (window.AppState && window.AppState.entityStates && entityId) {
            const eObj = window.AppState.entityStates[entityId];
            if (eObj && eObj.attributes && eObj.attributes.friendly_name) {
                effectiveTitle = eObj.attributes.friendly_name;
            } else if (entityId) {
                effectiveTitle = entityId.split('.').pop().replace(/_/g, ' ');
            }
        }
    }

    const prefix = props.prefix || "";
    const postfix = props.postfix || "";
    const fullValue = `${prefix}${displayValue}${displayUnit ? " " + displayUnit : ""}${postfix}`.trim();

    el.innerHTML = "";
    el.style.display = "flex";

    const applyAlign = (align, element) => {
        if (!align) return;
        if (align.includes("LEFT")) element.style.textAlign = "left";
        else if (align.includes("RIGHT")) element.style.textAlign = "right";
        else element.style.textAlign = "center";
    };

    const applyFlexAlign = (align, element) => {
        if (!align) return;
        if (align.includes("LEFT")) element.style.justifyContent = "flex-start";
        else if (align.includes("RIGHT")) element.style.justifyContent = "flex-end";
        else element.style.justifyContent = "center";

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

    if ((format === "label_value" || format === "label_value_no_unit") && effectiveTitle) {
        body.style.display = "flex";
        body.style.alignItems = "baseline";
        body.style.gap = "4px";

        const labelSpan = document.createElement("span");
        labelSpan.style.fontSize = `${labelFontSize}px`;
        labelSpan.textContent = effectiveTitle + ":";

        const valueSpan = document.createElement("span");
        valueSpan.style.fontSize = `${valueFontSize}px`;
        valueSpan.textContent = fullValue;

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
        labelDiv.textContent = effectiveTitle;
        applyAlign(props.label_align || props.text_align || "TOP_LEFT", labelDiv);

        const valueDiv = document.createElement("div");
        valueDiv.style.fontSize = `${valueFontSize}px`;
        valueDiv.textContent = fullValue;
        applyAlign(props.value_align || props.text_align || "TOP_LEFT", valueDiv);

        body.appendChild(labelDiv);
        body.appendChild(valueDiv);
    } else if (format === "value_label" && effectiveTitle) {
        body.style.display = "flex";
        body.style.alignItems = "baseline";
        body.style.gap = "4px";

        const valueSpan = document.createElement("span");
        valueSpan.style.fontSize = `${valueFontSize}px`;
        valueSpan.textContent = fullValue;

        const labelSpan = document.createElement("span");
        labelSpan.style.fontSize = `${labelFontSize}px`;
        labelSpan.textContent = effectiveTitle;

        body.appendChild(valueSpan);
        body.appendChild(labelSpan);
    } else if (format === "label_only") {
        body.style.fontSize = `${labelFontSize}px`;
        body.textContent = effectiveTitle;
        applyAlign(props.text_align || "TOP_LEFT", body);
    } else {
        body.style.fontSize = `${valueFontSize}px`;
        body.textContent = fullValue;
        applyAlign(props.value_align || props.text_align || "TOP_LEFT", body);
    }

    el.appendChild(body);
};

export default {
    id: "sensor_text",
    name: "Sensor Text",
    category: "Sensors",
    defaults: {
        entity_id: "",
        title: "",
        value_format: "label_value",
        label_font_size: 14,
        value_font_size: 20,
        unit: "",
        precision: 2,
        text_align: "TOP_LEFT",
        font_family: "Roboto"
    },

    render,
    exportLVGL: (w, { common, convertColor, convertAlign, getLVGLFont, formatOpacity }) => {
        const p = w.props || {};
        let entityId = (w.entity_id || "").trim();
        const entityId2 = (w.entity_id_2 || "").trim();
        const format = p.value_format || "label_value";
        let precision = parseInt(p.precision, 10);
        if (isNaN(precision) || precision < 0) precision = 1;

        const getVarName = (eid) => {
            if (p.is_local_sensor) return `id(${eid || "battery_level"})`;
            const safe = eid.replace(/[^a-zA-Z0-9_]/g, "_");
            if (eid.startsWith("text_sensor.")) return `id(${safe}_txt)`;
            return `id(${safe})`;
        };

        if (!entityId && !p.is_local_sensor) return null;

        const v1 = getVarName(entityId);
        const v2 = entityId2 ? getVarName(entityId2) : null;
        const isText1 = p.is_text_sensor || (entityId && (entityId.startsWith("text_sensor.") || entityId.startsWith("weather.")));
        const isText2 = entityId2 && (p.is_text_sensor || entityId2.startsWith("text_sensor.") || entityId2.startsWith("weather."));

        let lambdaStr = '!lambda |-\n';
        lambdaStr += `              if (${v1}.has_state()${v2 ? ` && ${v2}.has_state()` : ""}) {\n`;

        const unit = p.unit || "";
        const prefix = p.prefix || "";
        const postfix = p.postfix || "";
        const valFmt1 = isText1 ? "%s" : `%.${precision}f`;
        const valFmt2 = v2 ? (isText2 ? "%s" : `%.${precision}f`) : "";
        const sep = p.separator || " ~ ";

        let title = (w.title || p.title || "").trim();
        if (!title && format.startsWith("label_")) {
            title = entityId.split('.').pop().replace(/_/g, ' ');
        }

        const arg1 = isText1 ? `${v1}.state.c_str()` : `${v1}.state`;
        const arg2 = v2 ? (isText2 ? `${v2}.state.c_str()` : `${v2}.state`) : null;

        let finalFmt = "";
        if (format === "label_only") {
            finalFmt = title;
        } else if (format === "label_value" || format === "label_value_no_unit") {
            finalFmt = `${title}: ${prefix}${valFmt1}${v2 ? sep + valFmt2 : ""}${unit ? " " + unit : ""}${postfix}`;
        } else if (format === "label_newline_value" || format === "label_newline_value_no_unit") {
            finalFmt = `${title}\\n${prefix}${valFmt1}${v2 ? sep + valFmt2 : ""}${unit ? " " + unit : ""}${postfix}`;
        } else if (format === "value_label") {
            finalFmt = `${prefix}${valFmt1}${v2 ? sep + valFmt2 : ""}${unit ? " " + unit : ""}${postfix} ${title}`;
        } else {
            finalFmt = `${prefix}${valFmt1}${v2 ? sep + valFmt2 : ""}${unit ? " " + unit : ""}${postfix}`;
        }

        lambdaStr += `                return str_sprintf("${finalFmt}", ${arg1}${arg2 ? `, ${arg2}` : ""}).c_str();\n`;
        lambdaStr += '              }\n';
        lambdaStr += '              return "---";';

        return {
            label: {
                ...common,
                text: lambdaStr,
                text_font: getLVGLFont(p.font_family, p.value_font_size || 20, p.font_weight, p.italic),
                text_color: convertColor(p.color),
                text_align: (convertAlign(p.text_align) || "LEFT").replace("TOP_", "").replace("BOTTOM_", ""),
                bg_color: (p.bg_color && p.bg_color !== "transparent") ? convertColor(p.bg_color) : undefined,
                opa: formatOpacity(p.opa)
            }
        };
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
        const color = getColorConst(p.color || (context.isDark ? "white" : "black"));
        const textAlign = p.text_align || "TOP_LEFT";
        const separator = p.separator || " ~ ";
        const prefix = p.prefix || "";
        const postfix = p.postfix || "";
        let precision = parseInt(p.precision, 10);
        if (isNaN(precision) || precision < 0) precision = 2;

        lines.push(`        // widget:sensor_text id:${w.id} type:sensor_text x:${w.x} y:${w.y} w:${w.width} h:${w.height} ent:${entityId} fmt:${format} ${getCondProps(w)}`);

        if (!entityId && !p.is_local_sensor) {
            lines.push(`        // Sensor ID missing for this widget`);
            return;
        }

        const labelFontId = addFont(family, weight, labelFS, italic);
        const valueFontId = addFont(family, weight, valueFS, italic);

        const cond = getConditionCheck(w);
        if (cond) lines.push(`        ${cond}`);

        // Helper to get ESPHome variable name for an entity
        const getVarName = (eid, isText) => {
            if (p.is_local_sensor) return `id(${eid || "battery_level"})`;
            const safe = eid.replace(/[^a-zA-Z0-9_]/g, "_");
            if (isText || p.is_text_sensor || eid.startsWith("text_sensor.")) return `id(${safe}_txt)`;
            return `id(${safe})`;
        };

        const v1 = getVarName(entityId);
        const v2 = entityId2 ? getVarName(entityId2) : null;

        const isText1 = p.is_text_sensor || (entityId && (entityId.startsWith("text_sensor.") || entityId.startsWith("weather.")));
        const isText2 = entityId2 && (p.is_text_sensor || entityId2.startsWith("text_sensor.") || entityId2.startsWith("weather."));
        const valFmt1 = isText1 ? "%s" : `%.${precision}f`;
        const valFmt2 = isText2 ? "%s" : `%.${precision}f`;
        // Format parts
        let title = (w.title || p.title || "").trim();
        if (!title && (format.startsWith("label_"))) {
            title = entityId.split('.').pop().replace(/_/g, ' '); // Minimal fallback
        }

        const displayUnitStr = (p.hide_unit || format.endsWith("_no_unit")) ? "" : unit;

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

        const isCentered = textAlign.includes("CENTER");
        const isRight = textAlign.includes("RIGHT");

        if (isCentered) xVal = Math.round(w.x + w.width / 2);
        else if (isRight) xVal = Math.round(w.x + w.width);

        if (textAlign.includes("BOTTOM")) yVal = Math.round(w.y + w.height);
        else if (!textAlign.includes("TOP")) yVal = Math.round(w.y + w.height / 2); // Middle

        // Determine format string for values
        const finalValFmt = `${prefix}${valFmt1}${v2 ? separator + valFmt2 : ""}${displayUnitStr ? " " + displayUnitStr : ""}${postfix}`;

        const arg1 = isText1 ? `${v1}.state.c_str()` : `${v1}.state`;
        const arg2 = v2 ? (isText2 ? `${v2}.state.c_str()` : `${v2}.state`) : null;
        const args = v2 ? `${arg1}, ${arg2}` : arg1;

        if (format === "label_only") {
            lines.push(`        it.printf(${xVal}, ${yVal}, id(${labelFontId}), ${color}, ${labelAlign}, "${title}");`);
        } else if (format === "value_only" || format === "value_only_no_unit" || !title) {
            lines.push(`        it.printf(${xVal}, ${yVal}, id(${valueFontId}), ${color}, ${valueAlign}, "${finalValFmt}", ${args});`);
        } else if (format === "label_value" || format === "label_value_no_unit") {
            // Horizontal layout: "Label: Value" using single printf for perfect alignment
            const labelStr = `${title}${title.endsWith(":") ? "" : ":"} `;
            lines.push(`        it.printf(${xVal}, ${yVal}, id(${valueFontId}), ${color}, ${valueAlign}, "${labelStr}${finalValFmt}", ${args});`);
        } else if (format === "label_newline_value" || format === "label_newline_value_no_unit") {
            // Vertical layout
            lines.push(`        it.printf(${xVal}, ${yVal}, id(${labelFontId}), ${color}, ${labelAlign}, "${title}");`);
            lines.push(`        it.printf(${xVal}, ${yVal} + ${labelFS + 4}, id(${valueFontId}), ${color}, ${valueAlign}, "${finalValFmt}", ${args});`);
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

        const weatherEntities = new Set();
        const textEntities = new Set();

        for (const w of widgets) {
            if (w.type !== "sensor_text") continue;

            const p = w.props || {};
            const entityId = (w.entity_id || "").trim();
            if (entityId.startsWith("weather.")) weatherEntities.add(entityId);
            else if (p.is_text_sensor || entityId.startsWith("text_sensor.")) textEntities.add(entityId);

            const entityId2 = (w.entity_id_2 || p.entity_id_2 || "").trim();
            if (entityId2) {
                if (entityId2.startsWith("weather.")) weatherEntities.add(entityId2);
                else if (p.is_text_sensor || entityId2.startsWith("text_sensor.")) textEntities.add(entityId2);
            }
        }

        if (weatherEntities.size > 0) {
            lines.push("# Weather Entity Sensors (Detected from Sensor Text)");
            for (const entityId of weatherEntities) {
                const safeId = entityId.replace(/^weather\./, "").replace(/\./g, "_").replace(/-/g, "_");
                lines.push("- platform: homeassistant", `  id: ${safeId}`, `  entity_id: ${entityId}`, "  internal: true");
            }
        }

        if (textEntities.size > 0) {
            lines.push("# Text Sensors (Detected from Sensor Text)");
            for (const entityId of textEntities) {
                const safeId = entityId.replace(/[^a-zA-Z0-9_]/g, "_") + "_txt";
                lines.push("- platform: homeassistant", `  id: ${safeId}`, `  entity_id: ${entityId}`, "  internal: true");
            }
        }
    },

    onExportNumericSensors: (context) => {
        const { lines, widgets } = context;
        if (!widgets) return;

        const processed = new Set();
        for (const w of widgets) {
            if (w.type !== "sensor_text") continue;

            const p = w.props || {};
            if (p.is_local_sensor) continue;

            const entities = [w.entity_id, w.entity_id_2].filter(id => id && id.trim());

            for (let eid of entities) {
                eid = eid.trim();
                if (p.is_text_sensor || eid.startsWith("weather.") || eid.startsWith("text_sensor.")) continue;

                // Ensure sensor. prefix if missing
                if (!eid.includes(".")) {
                    eid = `sensor.${eid}`;
                }

                if (!processed.has(eid)) {
                    processed.add(eid);
                    const safeId = eid.replace(/[^a-zA-Z0-9_]/g, "_");
                    lines.push("- platform: homeassistant", `  id: ${safeId}`, `  entity_id: ${eid}`, "  internal: true");
                }
            }
        }
    }
};
