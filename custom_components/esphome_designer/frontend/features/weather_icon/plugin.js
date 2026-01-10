/**
 * Weather Icon Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    let iconCode = "F0595"; // Default
    let size = props.size || 24;
    const color = props.color || "black";

    let weatherState = "sunny"; // Default preview
    const entityId = widget.entity_id || "";

    if (entityId && window.AppState && window.AppState.entityStates) {
        const stateSet = window.AppState.entityStates[entityId];
        const state = (stateSet && stateSet.state !== undefined) ? stateSet.state : null;
        if (state !== null && state !== undefined) {
            weatherState = String(state).toLowerCase();
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

    if (!widget.entity_id) {
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

export default {
    id: "weather_icon",
    name: "Weather Icon",
    category: "Sensors",
    defaults: {
        size: 40,
        color: "black",
        fit_icon_to_frame: true
    },
    render
};
