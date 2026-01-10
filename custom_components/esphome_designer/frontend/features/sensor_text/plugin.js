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
                    return strState.replace(/\s*[°%]?[A-Za-z\/²³]+\s*$/, '').trim() || strState;
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
        title: "Sensor",
        value_format: "label_value",
        label_font_size: 14,
        value_font_size: 20,
        unit: "",
        precision: 2,
        text_align: "TOP_LEFT",
        font_family: "Roboto"
    },

    render,

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
        const entityId = (w.entity_id || "").trim();
        const entityId2 = (w.entity_id_2 || "").trim();

        const format = p.value_format || "label_value";
        const unit = p.unit || "";
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

        if (!entityId) {
            lines.push(`        // Sensor ID missing for this widget`);
            return;
        }

        const labelFontId = addFont(family, weight, labelFS, italic);
        const valueFontId = addFont(family, weight, valueFS, italic);

        const cond = getConditionCheck(w);
        if (cond) lines.push(`        ${cond}`);

        // Helper to get ESPHome variable name for an entity
        const getVarName = (eid, isText) => {
            const safe = eid.replace(/[^a-zA-Z0-9_]/g, "_");
            if (isText || p.is_text_sensor || eid.startsWith("text_sensor.")) return `id(${safe}_txt)`;
            return `id(${safe})`;
        };

        const v1 = getVarName(entityId);
        const v2 = entityId2 ? getVarName(entityId2) : null;

        // Determine format string for values
        const isText = p.is_text_sensor || entityId.startsWith("text_sensor.");
        const valFmt = isText ? "%s" : `%.${precision}f`;

        // Format parts
        let title = p.title || w.title || "";
        if (!title && (format.startsWith("label_"))) {
            title = entityId.split('.').pop().replace(/_/g, ' '); // Minimal fallback
        }

        const displayUnit = (p.hide_unit || format.endsWith("_no_unit")) ? "" : unit;

        // Alignment Mapping
        const getAlign = (a) => {
            if (!a) return "TextAlign::TOP_LEFT";
            if (a === "CENTER") return "TextAlign::CENTER";
            return `TextAlign::${a}`;
        };

        const baseAlign = getAlign(textAlign);
        const labelAlign = getAlign(p.label_align || textAlign);
        const valueAlign = getAlign(p.value_align || textAlign);

        // Positioning Helpers
        let x = w.x;
        let y = w.y;

        const isCentered = textAlign.includes("CENTER");
        const isRight = textAlign.includes("RIGHT");

        if (isCentered) x = Math.round(w.x + w.width / 2);
        else if (isRight) x = Math.round(w.x + w.width);

        if (textAlign.includes("BOTTOM")) y = Math.round(w.y + w.height);
        else if (!textAlign.includes("TOP")) y = Math.round(w.y + w.height / 2); // Middle

        if (format === "label_only") {
            lines.push(`        it.printf(${x}, ${y}, id(${labelFontId}), ${color}, ${labelAlign}, "${title}");`);
        } else if (format === "value_only" || format === "value_only_no_unit" || !title) {
            const finalFmt = `${prefix}${valFmt}${v2 ? separator + valFmt : ""}${displayUnit ? " " + displayUnit : ""}${postfix}`;
            const args = v2 ? `${v1}.state, ${v2}.state` : `${v1}.state`;
            lines.push(`        it.printf(${x}, ${y}, id(${valueFontId}), ${color}, ${valueAlign}, "${finalFmt}", ${args});`);
        } else if (format === "label_value" || format === "label_value_no_unit") {
            // Horizontal layout: [Label:] [Value]
            // We'll use a small offset for the value if left aligned, or just print together if possible.
            // Simplified: print as one string if same font, but they use different fonts often.
            // For now, we print them separately with a heuristic offset.
            const labelStr = `${title}${title.endsWith(":") ? "" : ":"}`;
            lines.push(`        it.printf(${x}, ${y}, id(${labelFontId}), ${color}, ${labelAlign}, "${labelStr}");`);

            // Heuristic for value position (label size + some gap)
            // Ideally we'd measure text, but we can't in lambda easily.
            const offset = Math.round(labelFS * 0.6 * labelStr.length) + 10;
            const valFmtFull = `${prefix}${valFmt}${v2 ? separator + valFmt : ""}${displayUnit ? " " + displayUnit : ""}${postfix}`;
            const args = v2 ? `${v1}.state, ${v2}.state` : `${v1}.state`;

            let valX = x + offset;
            if (isCentered) valX = x + offset / 2; // Rough adjustment
            else if (isRight) valX = x; // Overlap? Better to just use label_newline_value for cleanliness

            lines.push(`        it.printf(${valX}, ${y}, id(${valueFontId}), ${color}, ${valueAlign}, "${valFmtFull}", ${args});`);
        } else if (format === "label_newline_value" || format === "label_newline_value_no_unit") {
            // Vertical layout
            lines.push(`        it.printf(${x}, ${y}, id(${labelFontId}), ${color}, ${labelAlign}, "${title}");`);
            const valFmtFull = `${prefix}${valFmt}${v2 ? separator + valFmt : ""}${displayUnit ? " " + displayUnit : ""}${postfix}`;
            const args = v2 ? `${v1}.state, ${v2}.state` : `${v1}.state`;
            lines.push(`        it.printf(${x}, ${y} + ${labelFS + 4}, id(${valueFontId}), ${color}, ${valueAlign}, "${valFmtFull}", ${args});`);
        } else if (format === "value_label") {
            const valFmtFull = `${prefix}${valFmt}${v2 ? separator + valFmt : ""}${displayUnit ? " " + displayUnit : ""}${postfix}`;
            const args = v2 ? `${v1}.state, ${v2}.state` : `${v1}.state`;
            lines.push(`        it.printf(${x}, ${y}, id(${valueFontId}), ${color}, ${valueAlign}, "${valFmtFull}", ${args});`);

            const offset = Math.round(valueFS * 0.6 * 6) + 10; // Guessed value width
            lines.push(`        it.printf(${x} + ${offset}, ${y}, id(${labelFontId}), ${color}, ${labelAlign}, "${title}");`);
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

            const entityId = (w.entity_id || "").trim();
            const p = w.props || {};
            if (!entityId || p.is_local_sensor || p.is_text_sensor || entityId.startsWith("weather.") || entityId.startsWith("text_sensor.")) continue;

            if (!processed.has(entityId)) {
                processed.add(entityId);
                const safeId = entityId.replace(/[^a-zA-Z0-9_]/g, "_");
                lines.push("- platform: homeassistant", `  id: ${safeId}`, `  entity_id: ${entityId}`, "  internal: true");
            }
        }
    }
};
