/**
 * Weather Icon Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    let iconCode = "F0595"; // Default
    let size = props.size || 24;
    const color = props.color || "black";

    let weatherState = "sunny"; // Default preview
    const entityId = widget.entity_id || props.weather_entity || "weather.forecast_home";

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

    if (!entityId) {
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

const exportDoc = (w, context) => {
    const {
        lines, addFont, getColorConst, getCondProps, getConditionCheck
    } = context;

    const p = w.props || {};
    const entityId = (w.entity_id || p.weather_entity || "weather.forecast_home").trim();
    const size = parseInt(p.size || 48, 10);
    const colorProp = p.color || "black";

    const color = getColorConst(colorProp);
    const fontRef = addFont("Material Design Icons", 400, size);

    lines.push(`        // widget:weather_icon id:${w.id} type:weather_icon x:${w.x} y:${w.y} w:${w.width} h:${w.height} entity:${entityId} size:${size} color:${colorProp} ${getCondProps(w)}`);

    const cond = getConditionCheck(w);
    if (cond) lines.push(`        ${cond}`);

    if (entityId) {
        const safeId = entityId.replace(/[^a-zA-Z0-9_]/g, "_") + "_text_sensor";
        // Generate dynamic weather icon mapping based on entity state
        lines.push(`        {`);
        lines.push(`          std::string weather_state = id(${safeId}).state;`);
        lines.push(`          const char* icon = "\\U000F0599"; // Default: sunny`);
        lines.push(`          if (weather_state == "clear-night") icon = "\\U000F0594";`);
        lines.push(`          else if (weather_state == "cloudy") icon = "\\U000F0590";`);
        lines.push(`          else if (weather_state == "exceptional") icon = "\\U000F0026";`);
        lines.push(`          else if (weather_state == "fog") icon = "\\U000F0591";`);
        lines.push(`          else if (weather_state == "hail") icon = "\\U000F0592";`);
        lines.push(`          else if (weather_state == "lightning") icon = "\\U000F0593";`);
        lines.push(`          else if (weather_state == "lightning-rainy") icon = "\\U000F067E";`);
        lines.push(`          else if (weather_state == "partlycloudy") icon = "\\U000F0595";`);
        lines.push(`          else if (weather_state == "pouring") icon = "\\U000F0596";`);
        lines.push(`          else if (weather_state == "rainy") icon = "\\U000F0597";`);
        lines.push(`          else if (weather_state == "snowy") icon = "\\U000F0598";`);
        lines.push(`          else if (weather_state == "snowy-rainy") icon = "\\U000F067F";`);
        lines.push(`          else if (weather_state == "sunny") icon = "\\U000F0599";`);
        lines.push(`          else if (weather_state == "windy") icon = "\\U000F059D";`);
        lines.push(`          else if (weather_state == "windy-variant") icon = "\\U000F059E";`);

        lines.push(`          it.printf(${w.x}, ${w.y}, id(${fontRef}), ${color}, "%s", icon);`);
        lines.push(`        }`);
    } else {
        // Fallback preview
        lines.push(`        it.printf(${w.x}, ${w.y}, id(${fontRef}), ${color}, "\\U000F0595");`);
    }

    if (cond) lines.push(`        }`);
};

const onExportTextSensors = (context) => {
    const { lines, widgets } = context;
    if (!widgets || widgets.length === 0) return;

    const weatherEntities = new Set();
    for (const w of widgets) {
        if (w.type !== "weather_icon") continue;
        const entityId = (w.entity_id || w.props?.weather_entity || "weather.forecast_home").trim();
        if (entityId) {
            weatherEntities.add(entityId);
        }
    }

    if (weatherEntities.size > 0) {
        lines.push("# Weather Entity Sensors (Detected from Weather Icon)");
        for (const entityId of weatherEntities) {
            const safeId = entityId.replace(/[^a-zA-Z0-9_]/g, "_") + "_text_sensor";
            lines.push(`- platform: homeassistant`);
            lines.push(`  id: ${safeId}`);
            lines.push(`  entity_id: ${entityId}`);
            lines.push(`  internal: true`);
        }
        lines.push("");
    }
};

const collectRequirements = (widget, { trackIcon }) => {
    const props = widget.props || {};
    const size = props.size || 48;
    // Track all possible weather icons
    ["F0594", "F0590", "F0026", "F0591", "F0592", "F0593", "F067E", "F0595", "F0596", "F0597", "F0598", "F067F", "F0599", "F059D", "F059E"].forEach(c => trackIcon(c, size));
};

export default {
    id: "weather_icon",
    name: "Weather Icon",
    category: "Sensors",
    defaults: {
        width: 60,
        height: 60,
        size: 48,
        color: "black",
        background_color: "transparent",
        weather_entity: "weather.forecast_home",
        fit_icon_to_frame: true
    },
    render,
    exportLVGL: (w, { common, convertColor, getLVGLFont }) => {
        const p = w.props || {};
        const entityId = (w.entity_id || p.weather_entity || "weather.forecast_home").trim();
        const size = parseInt(p.size || 48, 10);
        const color = convertColor(p.color || "black");

        let lambdaStr = '"\\U000F0599"'; // Default: sunny
        if (entityId) {
            const safeId = entityId.replace(/[^a-zA-Z0-9_]/g, "_") + "_text_sensor";
            lambdaStr = '!lambda |-\n';
            lambdaStr += `              std::string ws = id(${safeId}).state;\n`;
            lambdaStr += `              if (ws == "clear-night") return "\\U000F0594";\n`;
            lambdaStr += `              if (ws == "cloudy") return "\\U000F0590";\n`;
            lambdaStr += `              if (ws == "exceptional") return "\\U000F0026";\n`;
            lambdaStr += `              if (ws == "fog") return "\\U000F0591";\n`;
            lambdaStr += `              if (ws == "hail") return "\\U000F0592";\n`;
            lambdaStr += `              if (ws == "lightning") return "\\U000F0593";\n`;
            lambdaStr += `              if (ws == "lightning-rainy") return "\\U000F067E";\n`;
            lambdaStr += `              if (ws == "partlycloudy") return "\\U000F0595";\n`;
            lambdaStr += `              if (ws == "pouring") return "\\U000F0596";\n`;
            lambdaStr += `              if (ws == "rainy") return "\\U000F0597";\n`;
            lambdaStr += `              if (ws == "snowy") return "\\U000F0598";\n`;
            lambdaStr += `              if (ws == "snowy-rainy") return "\\U000F067F";\n`;
            lambdaStr += `              if (ws == "sunny") return "\\U000F0599";\n`;
            lambdaStr += `              if (ws == "windy") return "\\U000F059D";\n`;
            lambdaStr += `              if (ws == "windy-variant") return "\\U000F059E";\n`;
            lambdaStr += `              return "\\U000F0599";`;
        }

        return {
            label: {
                ...common,
                text: lambdaStr,
                text_font: getLVGLFont("Material Design Icons", size, 400),
                text_color: color,
                text_align: "CENTER"
            }
        };
    },
    collectRequirements,
    onExportTextSensors,
    export: exportDoc
};
