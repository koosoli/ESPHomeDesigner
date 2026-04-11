import { AppState } from '@core/state';
import { getNestedValue } from '../../js/utils/helpers.js';
import {
    getWeatherIconMeta,
    toWeatherMdiCharacter
} from './shared.js';

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
    let iconCode = getWeatherIconMeta('').code;
    let size = props.size || 24;
    const color = props.color || "theme_auto";

    let weatherState = "";
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

    iconCode = getWeatherIconMeta(weatherState).code;
    const ch = toWeatherMdiCharacter(iconCode);

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

