(() => {
    const render = (el, widget, { getColorStyle }) => {
        const props = widget.props || {};
        const entityId = widget.entity_id || "";
        const title = widget.title || "";
        const format = props.value_format || "label_value";
        let precision = parseInt(props.precision, 10);
        if (isNaN(precision)) precision = 2; // Default to 2 to match export logic
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

                    const match = strState.match(/^([-+]?\d*\.?\d+)(.*)$/);
                    if (match) {
                        const val = parseFloat(match[1]);
                        const extractedUnit = match[2] || "";
                        // Capture unit from first entity if not set manually, AND not hidden
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
                    // Fallback: update unit from attributes if needed
                    if (eId === entityId && (unitProp === undefined || unitProp === "") && entityObj.attributes && entityObj.attributes.unit_of_measurement && !props.hide_unit && !isNoUnit) {
                        displayUnit = entityObj.attributes.unit_of_measurement;
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

        const prefix = props.prefix || "";
        const postfix = props.postfix || "";

        // Full display value with unit, prefix and postfix
        const fullValue = `${prefix}${displayValue}${displayUnit}${postfix}`.trim();

        // Clear element
        el.innerHTML = "";

        // Default Alignment for container
        el.style.display = "flex";
        el.style.alignItems = "center";
        el.style.justifyContent = "center";

        // Alignment Helper
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

        // Create body element
        const body = document.createElement("div");
        body.style.color = colorStyle;
        body.style.fontFamily = fontFamily;
        body.style.fontWeight = fontWeight;
        body.style.fontStyle = fontStyle;

        if (format === "label_value" && title) {
            // Label and value on same line
            body.style.display = "flex";
            body.style.alignItems = "baseline";
            body.style.gap = "4px";

            const labelSpan = document.createElement("span");
            labelSpan.style.fontSize = `${labelFontSize}px`;
            labelSpan.textContent = title + ":";

            const valueSpan = document.createElement("span");
            valueSpan.style.fontSize = `${valueFontSize}px`;
            valueSpan.textContent = fullValue;

            const align = props.label_align || props.text_align || "TOP_LEFT";
            if (align.includes("CENTER")) {
                body.style.justifyContent = "center";
            } else if (align.includes("RIGHT")) {
                body.style.justifyContent = "flex-end";
            } else {
                body.style.justifyContent = "flex-start";
            }

            body.appendChild(labelSpan);
            body.appendChild(valueSpan);
        } else if (format === "label_newline_value" && title) {
            // Label on one line, value on next line (column layout)
            body.style.display = "flex";
            body.style.flexDirection = "column";
            body.style.gap = "2px";
            body.style.width = "100%";

            const labelDiv = document.createElement("div");
            labelDiv.style.fontSize = `${labelFontSize}px`;
            labelDiv.textContent = title;
            applyAlign(props.label_align || props.text_align || "TOP_LEFT", labelDiv);

            const valueDiv = document.createElement("div");
            valueDiv.style.fontSize = `${valueFontSize}px`;
            valueDiv.textContent = fullValue;
            applyAlign(props.value_align || props.text_align || "TOP_LEFT", valueDiv);

            body.appendChild(labelDiv);
            body.appendChild(valueDiv);
        } else if (format === "value_label" && title) {
            // Value first, then label
            body.style.display = "flex";
            body.style.alignItems = "baseline";
            body.style.gap = "4px";

            const valueSpan = document.createElement("span");
            valueSpan.style.fontSize = `${valueFontSize}px`;
            valueSpan.textContent = fullValue;

            const labelSpan = document.createElement("span");
            labelSpan.style.fontSize = `${labelFontSize}px`;
            labelSpan.textContent = title;

            body.appendChild(valueSpan);
            body.appendChild(labelSpan);
        } else if (format === "label_only") {
            body.style.fontSize = `${labelFontSize}px`;
            body.textContent = title;
            applyAlign(props.text_align || "TOP_LEFT", body);
        } else {
            // value_only, value_only_no_unit or default
            body.style.fontSize = `${valueFontSize}px`;
            body.textContent = fullValue;
            applyAlign(props.value_align || props.text_align || "TOP_LEFT", body);
        }

        el.appendChild(body);
    };

    // Register with FeatureRegistry - try immediately and with delay for HA loading
    const registerFeature = () => {
        if (window.FeatureRegistry) {
            window.FeatureRegistry.register("sensor_text", { render });
            return true;
        }
        return false;
    };

    if (!registerFeature()) {
        setTimeout(() => {
            if (!registerFeature()) {
                console.error("[sensor_text/render.js] FeatureRegistry not found!");
            }
        }, 100);
    }
})();
