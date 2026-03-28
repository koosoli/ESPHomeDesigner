import { AppState } from '@core/state';

/**
 * @typedef {{
 *   entity_id?: string,
 *   title?: string,
 *   props?: Record<string, any>
 * }} ProgressBarWidget
 *
 * @typedef {{
 *   getColorStyle: (value: string) => string,
 *   isDark?: boolean
 * }} ProgressBarRenderTools
 */

/**
 * @param {HTMLElement} el
 * @param {ProgressBarWidget} widget
 * @param {ProgressBarRenderTools} tools
 */
export const renderProgressBar = (el, widget, tools) => {
    const props = widget.props || {};
    const { getColorStyle } = tools;
    const entityId = widget.entity_id || "";
    const label = widget.title || "";
    const showLabel = props.show_label !== false && props.show_label !== "false";
    const showPercentage = props.show_percentage !== false && props.show_percentage !== "false";
    const barHeight = props.bar_height || 15;
    const borderWidth = props.border_width || 1;
    const color = props.color || "theme_auto";

    const orientation = props.orientation || "horizontal";
    const isVertical = orientation === "vertical";
    const fontSize = props.font_size || 12;
    const textAlign = props.text_align || "CENTER";
    const min = parseFloat(props.min !== undefined ? props.min : 0);
    const max = parseFloat(props.max !== undefined ? props.max : 100);
    const range = max - min;

    let percentValue = 50;

    if (AppState && AppState.entityStates && entityId) {
        const stateSet = AppState.entityStates[entityId];
        const state = (stateSet && stateSet.state !== undefined) ? stateSet.state : null;
        if (state !== undefined && state !== null) {
            const numVal = parseFloat(String(state).replace(/[^0-9.-]/g, ''));
            if (!isNaN(numVal)) {
                percentValue = range === 0 ? 0 : Math.max(0, Math.min(100, (numVal - min) / range * 100));
            }
        }
    }

    const isDark = tools.isDark;

    /** @param {string} c */
    const getRenderColor = (c) => {
        if (c === "theme_auto") return isDark ? "#ffffff" : "#000000";
        if (c === "white" || c === "#ffffff") return isDark ? "#000000" : "#ffffff";
        if (c === "black" || c === "#000000") return isDark ? "#ffffff" : "#000000";
        return getColorStyle(c);
    };

    let renderColor = getRenderColor(color);

    el.innerHTML = "";
    el.style.display = "flex";
    el.style.flexDirection = isVertical ? "row" : "column";
    el.style.justifyContent = "center";
    el.style.alignItems = "center";
    el.style.gap = "4px";
    el.style.color = renderColor;

    const labelRow = document.createElement("div");
    labelRow.style.display = "flex";
    labelRow.style.flexDirection = isVertical ? "column" : "row";
    const bothLabelsShown = (showLabel && label) && showPercentage;
    labelRow.style.justifyContent = isVertical ? "space-between" : (bothLabelsShown ? "space-between" : (textAlign === "CENTER" ? "center" : (textAlign === "LEFT" ? "flex-start" : "flex-end")));
    labelRow.style.alignItems = "center";
    labelRow.style.fontSize = `${fontSize}px`;
    labelRow.style.paddingBottom = isVertical ? "0" : "2px";
    labelRow.style.paddingRight = isVertical ? "2px" : "0";
    if (isVertical) {
        labelRow.style.height = "100%";
    } else {
        labelRow.style.width = "100%";
    }

    if (showLabel && label) {
        const labelSpan = document.createElement("span");
        labelSpan.textContent = label;
        labelRow.appendChild(labelSpan);
    }

    if (showPercentage) {
        const pctSpan = document.createElement("span");
        pctSpan.textContent = Math.round(percentValue) + "%";
        labelRow.appendChild(pctSpan);
    }

    if (labelRow.childNodes.length > 0) {
        el.appendChild(labelRow);
    }

    const barContainer = document.createElement("div");
    if (isVertical) {
        barContainer.style.width = `${barHeight}px`;
        barContainer.style.height = "100%";
    } else {
        barContainer.style.width = "100%";
        barContainer.style.height = `${barHeight}px`;
    }
    barContainer.style.border = `${borderWidth}px solid ${renderColor}`;
    barContainer.style.borderRadius = "2px";
    barContainer.style.position = "relative";
    barContainer.style.overflow = "hidden";

    /** @param {string} c */
    const isRenderColorLight = (c) => c === "#ffffff" || c === "white" || c === "#fff";
    barContainer.style.backgroundColor = isRenderColorLight(renderColor) ? "#000000" : "#ffffff";

    const barFill = document.createElement("div");
    if (isVertical) {
        barFill.style.width = "100%";
        barFill.style.height = `${percentValue}%`;
        barFill.style.position = "absolute";
        barFill.style.bottom = "0";
        barFill.style.transition = "height 0.3s ease";
    } else {
        barFill.style.width = `${percentValue}%`;
        barFill.style.height = "100%";
        barFill.style.transition = "width 0.3s ease";
    }
    barFill.style.backgroundColor = renderColor;

    barContainer.appendChild(barFill);
    el.appendChild(barContainer);
};


