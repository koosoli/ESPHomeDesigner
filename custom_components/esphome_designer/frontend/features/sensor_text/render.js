import { AppState } from '@core/state';
import { DEVICE_PROFILES } from '../../js/io/devices.js';
import { wordWrap, parseColorMarkup, evaluateTemplatePreview } from '../../js/utils/text_utils.js';
import { getNestedValue } from '../../js/utils/helpers.js';
import { emit } from '../../js/core/events.js';
import { isColorDisplay, lerpColor } from './shared.js';

/** @typedef {Widget & { props?: Record<string, any>, entity_id?: string, entity_id_2?: string, title?: string }} SensorTextWidget */

/**
 * @param {HTMLElement} el
 * @param {SensorTextWidget} widget
 * @param {{ getColorStyle: (value?: string) => string }} helpers
 */
export const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const entityStates = AppState?.entityStates || {};
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

    let colorStyle = getColorStyle(props.color || "theme_auto");
    const deviceProfiles = /** @type {Record<string, any>} */ (DEVICE_PROFILES);
    const canvasProfile = deviceProfiles[String(AppState?.deviceModel || "")];
    if (props.dynamic_color_enabled && !props.is_text_sensor && isColorDisplay(canvasProfile)) {
        colorStyle = props.dynamic_color_low || "#3498db";
        if (AppState?.entityStates && entityId) {
            const entity = AppState.entityStates[entityId];
            if (entity?.state !== undefined) {
                let rawVal = entity.state;
                if (props.attribute && entity.attributes) {
                    const attrVal = getNestedValue(entity.attributes, props.attribute);
                    if (attrVal !== undefined) rawVal = attrVal;
                }
                const numVal = parseFloat(rawVal);
                if (!isNaN(numVal)) {
                    const lowVal = props.dynamic_value_low !== undefined ? props.dynamic_value_low : 0;
                    const highVal = props.dynamic_value_high !== undefined ? props.dynamic_value_high : 100;
                    const diff = highVal - lowVal;
                    if (diff !== 0) {
                        colorStyle = lerpColor(
                            props.dynamic_color_low || "#3498db",
                            props.dynamic_color_high || "#e74c3c",
                            (numVal - lowVal) / diff
                        );
                    }
                }
            }
        }
    }

    const entityId2 = widget.entity_id_2 || "";
    const separator = props.separator || " ~ ";

    let displayValue = "--";
    const isNoUnit = format.endsWith("_no_unit");
    let displayUnit = (props.hide_unit || isNoUnit) ? "" : unitProp;

    /** @param {string} targetEntityId @param {string | null} [attrPathOverride=null] */
    const formatValue = (targetEntityId, attrPathOverride = null) => {
        if (!AppState?.entityStates || !targetEntityId) return "--";
        const entityObj = AppState.entityStates[targetEntityId];
        if (!entityObj || entityObj.state === undefined) return "--";

        const attributePath = (attrPathOverride !== null ? attrPathOverride : (props.attribute || "")).trim();
        if (attributePath && entityObj.attributes) {
            const attrVal = getNestedValue(entityObj.attributes, attributePath);
            if (attrVal !== undefined) {
                if (typeof attrVal === 'object' && attrVal !== null) {
                    return JSON.stringify(attrVal);
                }
                const attrStr = String(attrVal).trim();
                const numVal = Number(attrStr);
                if (attrStr !== "" && !isNaN(numVal)) {
                    if (
                        targetEntityId === entityId &&
                        (unitProp === undefined || unitProp === "") &&
                        entityObj.attributes?.unit_of_measurement &&
                        !props.hide_unit &&
                        !isNoUnit
                    ) {
                        displayUnit = entityObj.attributes.unit_of_measurement;
                    }
                    return (!isNaN(precision) && precision >= 0) ? numVal.toFixed(precision) : numVal.toString();
                }
                return String(attrVal);
            }
        }

        const strState = entityObj.formatted || String(entityObj.state);
        const match = strState.match(/^([-+]?\d*[.,]?\d+)(.*)$/);
        if (match) {
            const value = parseFloat(match[1].replace(',', '.'));
            const extractedUnit = match[2] ? match[2].trim() : "";
            if (targetEntityId === entityId && (unitProp === undefined || unitProp === "") && !props.hide_unit && !isNoUnit) {
                displayUnit = extractedUnit;
            }
            if (!isNaN(value)) {
                if (!isNaN(precision) && precision >= 0) {
                    return value.toFixed(precision);
                }
                return value.toString();
            }
        }

        if (targetEntityId === entityId && (unitProp === undefined || unitProp === "") && entityObj.attributes?.unit_of_measurement && !props.hide_unit && !isNoUnit) {
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
            return strState.replace(/\s*[\u00B0%]?[A-Za-z/\u00B2\u00B3]+\s*$/, '').trim() || strState;
        }

        return strState;
    };

    const val1 = formatValue(entityId);
    let val2 = null;
    if (entityId2) {
        val2 = formatValue(entityId2, props.attribute2);
    }

    displayValue = val1;
    if (val2 !== null) {
        displayValue = `${val1}${separator}${val2}`;
    }

    if (displayUnit && displayValue.endsWith(displayUnit)) {
        displayUnit = "";
    }

    const prefix = evaluateTemplatePreview(props.prefix || "", entityStates);
    const postfix = evaluateTemplatePreview(props.postfix || "", entityStates);
    const fullValue = `${prefix}${displayValue}${displayUnit ? ` ${displayUnit}` : ""}${postfix}`.trim();

    let effectiveTitleRaw = title;
    if (!effectiveTitleRaw && (format.startsWith("label_") || format === "value_label")) {
        if (AppState?.entityStates && entityId) {
            const entity = AppState.entityStates[entityId];
            if (entity?.attributes?.friendly_name) {
                effectiveTitleRaw = entity.attributes.friendly_name;
            } else if (entityId) {
                effectiveTitleRaw = (entityId.split('.').pop() || entityId).replace(/_/g, ' ');
            }
        }
    }
    const effectiveTitle = evaluateTemplatePreview(effectiveTitleRaw, entityStates);

    el.innerHTML = "";
    el.style.display = "flex";
    el.style.overflow = "hidden";

    /** @param {string} align @param {HTMLElement} element */
    const applyAlign = (align, element) => {
        if (!align) return;
        if (align.includes("LEFT")) element.style.textAlign = "left";
        else if (align.includes("RIGHT")) element.style.textAlign = "right";
        else element.style.textAlign = "center";
    };

    /** @param {string} align @param {HTMLElement} element */
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
            labelSpan.appendChild(parseColorMarkup(`${effectiveTitle}:`, colorStyle, getColorStyle));
        } else {
            labelSpan.textContent = `${effectiveTitle}:`;
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
            wrappedLines.forEach((/** @type {string} */ line, /** @type {number} */ index) => {
                if (index > 0) body.appendChild(document.createElement("br"));
                body.appendChild(parseColorMarkup(line, colorStyle, getColorStyle));
            });
        } else {
            body.textContent = fullValue;
        }
        applyAlign(props.value_align || props.text_align || "TOP_LEFT", body);
    }

    const borderWidth = props.border_width !== undefined ? props.border_width : 0;
    const hasBackground = props.fill || (props.bg_color && props.bg_color !== "transparent") || (props.background_color && props.background_color !== "transparent");
    if (borderWidth > 0 || hasBackground) {
        let resolvedBorderColor = props.border_color || "theme_auto";
        if (resolvedBorderColor === "theme_auto") {
            resolvedBorderColor = AppState?.settings?.darkMode ? "white" : "black";
        }

        if (borderWidth > 0) {
            body.style.border = `${borderWidth}px solid ${getColorStyle(resolvedBorderColor)}`;
        }

        if (hasBackground) {
            const backgroundColor = props.background_color || props.bg_color || (props.fill ? "white" : "transparent");
            body.style.backgroundColor = getColorStyle(backgroundColor);
        }

        body.style.borderRadius = `${props.border_radius || 0}px`;
        body.style.boxSizing = "border-box";
    }

    el.appendChild(body);

    if ((format === "label_value" || format === "label_value_no_unit" || format === "value_label") && effectiveTitle) {
        requestAnimationFrame(() => {
            const contentWidth = body.scrollWidth;
            const currentWidth = widget.width || 0;
            if (contentWidth > currentWidth && contentWidth > 0 && displayValue !== "--") {
                const newWidth = Math.ceil(contentWidth) + 8;
                widget.width = newWidth;
                el.style.width = `${newWidth}px`;
                emit('widget:resized', { id: widget.id, width: newWidth, height: widget.height });
            }
        });
    }
};
