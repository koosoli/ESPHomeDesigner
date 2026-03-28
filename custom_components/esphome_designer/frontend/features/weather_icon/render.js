import { AppState } from '@core/state';
import { getNestedValue } from '../../js/utils/helpers.js';

export const renderWeatherIcon = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const hasEntitySource = Boolean(widget.entity_id || props.weather_entity);

    // Apply Border & Background
    if (props.border_width) {
        const borderColor = getColorStyle(props.border_color || "black");
        el.style.border = `${props.border_width}px solid ${borderColor}`;
        el.style.borderRadius = `${props.border_radius || 0}px`;
        el.style.boxSizing = "border-box";
    }
    if (props.bg_color) {
        el.style.backgroundColor = getColorStyle(props.bg_color);
    }
    let iconCode = "F0595"; // Default
    let size = props.size || 24;
    const color = props.color || "theme_auto";

    let weatherState = "sunny"; // Default preview
    const entityId = widget.entity_id || props.weather_entity || "weather.forecast_home";

    if (entityId && AppState && AppState.entityStates) {
        const stateSet = AppState.entityStates[entityId];
        const attribute = (props.attribute || "").trim();

        if (stateSet) {
            let state = stateSet.state;
            // If attribute is specified, try to read it. Supports nested paths.
            if (attribute && stateSet.attributes) {
                const attrVal = getNestedValue(stateSet.attributes, attribute);
                if (attrVal !== undefined) {
                    state = attrVal;
                }
            }

            if (state !== null && state !== undefined) {
                weatherState = String(state).toLowerCase();
            }
        }
    }

    if (props.fit_icon_to_frame) {
        const padding = 4;
        const maxDim = Math.max(8, Math.min((widget.width || 0) - padding * 2, (widget.height || 0) - padding * 2));
        size = Math.round(maxDim);
    }

    switch (weatherState) {
        case "clear-night": iconCode = "F0594"; break;
        case "cloudy": iconCode = "F0590"; break;
        case "exceptional": iconCode = "F0026"; break;
        case "fog": iconCode = "F0591"; break;
        case "hail": iconCode = "F0592"; break;
        case "lightning": iconCode = "F0593"; break;
        case "lightning-rainy": iconCode = "F067E"; break;
        case "partlycloudy": iconCode = "F0595"; break;
        case "pouring": iconCode = "F0596"; break;
        case "rainy": iconCode = "F0597"; break;
        case "snowy": iconCode = "F0598"; break;
        case "snowy-rainy": iconCode = "F067F"; break;
        case "sunny": iconCode = "F0599"; break;
        case "windy": iconCode = "F059D"; break;
        case "windy-variant": iconCode = "F059E"; break;
        default: iconCode = "F0599";
    }

    const cp = 0xf0000 + parseInt(iconCode.slice(1), 16);
    const ch = String.fromCodePoint(cp);

    el.innerText = ch;
    el.style.fontSize = `${size}px`;
    el.style.color = getColorStyle(color);
    el.style.fontFamily = "MDI, system-ui, -apple-system, BlinkMacSystemFont, -sans-serif";
    el.style.lineHeight = "1";
    el.style.display = "flex";
    el.style.alignItems = "center";
    el.style.justifyContent = "center";

    if (!hasEntitySource) {
        el.style.flexDirection = "column";
        el.style.alignItems = "flex-start";
        el.style.justifyContent = "flex-start";

        const label = document.createElement("div");
        label.style.fontSize = "10px";
        label.style.marginTop = "2px";
        label.textContent = "No Entity";
        el.appendChild(label);
    }
};

