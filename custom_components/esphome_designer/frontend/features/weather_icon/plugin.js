import { getNestedValue } from '../../js/utils/helpers.js';

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};

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

    if (entityId && window.AppState && window.AppState.entityStates) {
        const stateSet = window.AppState.entityStates[entityId];
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
    const colorProp = p.color || "theme_auto";

    // Dynamic Color Logic
    let color = getColorConst(colorProp);
    if (colorProp === "theme_auto") color = "color_on";
    if (colorProp === "white") color = "color_off";
    if (colorProp === "black") color = "color_on";
    const fontRef = addFont("Material Design Icons", 400, size);

    lines.push(`        // widget:weather_icon id:${w.id} type:weather_icon x:${w.x} y:${w.y} w:${w.width} h:${w.height} entity:${entityId} size:${size} color:${colorProp} ${getCondProps(w)}`);

    // Background fill
    const bgColorProp = p.bg_color || p.background_color || "transparent";
    if (bgColorProp && bgColorProp !== "transparent") {
        const bgColorConst = getColorConst(bgColorProp);
        lines.push(`        it.filled_rectangle(${w.x}, ${w.y}, ${w.width}, ${w.height}, ${bgColorConst});`);
    }

    // Draw Border if defined
    const borderWidth = p.border_width || 0;
    if (borderWidth > 0) {
        const borderColor = getColorConst(p.border_color || "theme_auto");
        for (let i = 0; i < borderWidth; i++) {
            lines.push(`        it.rectangle(${w.x} + ${i}, ${w.y} + ${i}, ${w.width} - 2 * ${i}, ${w.height} - 2 * ${i}, ${borderColor});`);
        }
    }

    const cond = getConditionCheck(w);
    if (cond) lines.push(`        ${cond}`);

    if (entityId) {
        const attributePath = (p.attribute || "").trim();
        const rootAttr = (attributePath.includes(".") || attributePath.includes("[")) ? attributePath.split(/[.\[]/)[0] : attributePath;
        const makeSafeId = (eid, suffix = "") => {
            const base = rootAttr ? (eid + "_" + rootAttr) : eid;
            let safe = base.replace(/[^a-zA-Z0-9_]/g, "_");
            const maxBase = 63 - suffix.length;
            if (safe.length > maxBase) safe = safe.substring(0, maxBase);
            return safe + suffix;
        };

        const safeId = makeSafeId(entityId, "_txt");

        // Centering logic
        const centerX = Math.round(w.x + w.width / 2);
        const centerY = Math.round(w.y + w.height / 2);

        // Generate dynamic weather icon mapping based on entity state
        lines.push(`        {`);
        lines.push(`          std::string raw_state = id(${safeId}).state;`);
        lines.push(`          std::string weather_state = "";`);
        lines.push(`          for(auto &c : raw_state) weather_state += tolower(c);`);
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
        lines.push(`          else if (weather_state != "" && weather_state != "unknown") ESP_LOGW("weather", "Unhandled weather state: %s", raw_state.c_str());`);
        lines.push(`          it.printf(${centerX}, ${centerY}, id(${fontRef}), ${color}, TextAlign::CENTER, "%s", icon);`);
        lines.push(`        }`);
    } else {
        // Fallback preview
        const centerX = Math.round(w.x + w.width / 2);
        const centerY = Math.round(w.y + w.height / 2);
        lines.push(`        it.printf(${centerX}, ${centerY}, id(${fontRef}), ${color}, TextAlign::CENTER, "\\U000F0595");`);
    }

    if (cond) lines.push(`        }`);
};

const onExportTextSensors = (context) => {
    // REGRESSION PROOF: Always destructure 'lines' from context to allow sensor generation
    const { lines, widgets, isLvgl, pendingTriggers } = context;
    if (!widgets || widgets.length === 0) return;

    const weatherEntities = new Set();
    for (const w of widgets) {
        if (w.type !== "weather_icon") continue;
        const entityId = (w.entity_id || w.props?.weather_entity || "weather.forecast_home").trim();
        const attribute = (w.props?.attribute || "").trim();
        if (entityId) {
            weatherEntities.add({ id: w.id, entity_id: entityId, attribute });
        }
    }

    weatherEntities.forEach(({ id, entity_id, attribute }) => {
        const attributePath = (attribute || "").trim();
        const rootAttr = (attributePath.includes(".") || attributePath.includes("[")) ? attributePath.split(/[.\[]/)[0] : attributePath;
        const makeSafeId = (eid, suffix = "") => {
            const base = rootAttr ? (eid + "_" + rootAttr) : eid;
            let safe = base.replace(/[^a-zA-Z0-9_]/g, "_");
            const maxBase = 63 - suffix.length;
            if (safe.length > maxBase) safe = safe.substring(0, maxBase);
            return safe + suffix;
        };
        const safeId = makeSafeId(entity_id, "_txt");

        if (isLvgl && pendingTriggers) {
            if (!pendingTriggers.has(safeId)) pendingTriggers.set(safeId, new Set());
            pendingTriggers.get(safeId).add(`- lvgl.widget.refresh: ${id}`);
        }

        // Explicitly export the Home Assistant sensor block
        const addedAny = !!lines.length;
        if (context.seenSensorIds && !context.seenSensorIds.has(safeId)) {
            if (!addedAny) {
                lines.push("");
                lines.push("# Weather Condition Sensors (Detected from Weather Icon)");
            }
            context.seenSensorIds.add(safeId);
            lines.push("- platform: homeassistant");
            lines.push(`  id: ${safeId}`);
            lines.push(`  entity_id: ${entity_id}`);
            if (rootAttr) {
                lines.push(`  attribute: ${rootAttr}`);
            }
            lines.push(`  internal: true`);
        }
    });
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
    supportedModes: ['lvgl', 'direct', 'oepl', 'opendisplay'],
    defaults: {
        width: 60,
        height: 60,
        size: 48,
        color: "theme_auto",
        background_color: "transparent",
        background_color: "transparent",
        weather_entity: "weather.forecast_home",
        fit_icon_to_frame: true,
        border_width: 0,
        border_color: "theme_auto",
        border_radius: 0
    },
    render,
    exportOpenDisplay: (w, { layout, page }) => {
        const p = w.props || {};
        const entityId = (w.entity_id || p.weather_entity || "weather.forecast_home").trim();

        // Convert theme_auto to actual color
        let color = p.color || "black";
        if (color === "theme_auto") {
            color = layout?.darkMode ? "white" : "black";
        }

        // Mapping for ODP weather icons based on HA state
        const template = `{{ {
            'clear-night': 'moon',
            'cloudy': 'cloud',
            'fog': 'fog',
            'hail': 'hail',
            'lightning': 'lightning',
            'lightning-rainy': 'lightning-rainy',
            'partlycloudy': 'partly-cloudy',
            'pouring': 'pouring',
            'rainy': 'rainy',
            'snowy': 'snowy',
            'snowy-rainy': 'snowy-rainy',
            'sunny': 'sun',
            'windy': 'wind'
        }[states('${entityId}')] | default('sun') }}`;

        return {
            type: "icon",
            value: template,
            x: Math.round(w.x + w.width / 2),
            y: Math.round(w.y + w.height / 2),
            size: p.size || 48,
            color: color,
            anchor: "mm"
        };
    },
    exportOEPL: (w, { layout, page }) => {
        const p = w.props || {};
        const entityId = (w.entity_id || p.weather_entity || "weather.forecast_home").trim();
        const size = p.size || 48;
        const color = p.color || "theme_auto";

        // OEPL has built-in weather icon support if we use their icon names
        // We can create a template that returns the icon name based on state
        const template = `{{ {
            'clear-night': 'moon',
            'cloudy': 'cloud',
            'fog': 'fog',
            'hail': 'hail',
            'lightning': 'lightning',
            'lightning-rainy': 'lightning-rainy',
            'partlycloudy': 'partly-cloudy',
            'pouring': 'pouring',
            'rainy': 'rainy',
            'snowy': 'snowy',
            'snowy-rainy': 'snowy-rainy',
            'sunny': 'sun',
            'windy': 'wind'
        }[states('${entityId}')] | default('sun') }}`;

        return {
            type: "icon",
            value: template,
            x: Math.round(w.x),
            y: Math.round(w.y),
            size: size,
            color: color,
            anchor: "lt"
        };
    },
    exportLVGL: (w, { common, convertColor, getLVGLFont }) => {
        const p = w.props || {};
        const entityId = (w.entity_id || p.weather_entity || "weather.forecast_home").trim();
        const size = parseInt(p.size || 48, 10);
        const color = convertColor(p.color || "theme_auto");

        let lambdaStr = '"\\U000F0599"'; // Default: sunny
        if (entityId) {
            // Helper to create safe ESPHome ID (max 59 chars)
            const attributePath = (p.attribute || "").trim();
            const rootAttr = (attributePath.includes(".") || attributePath.includes("[")) ? attributePath.split(/[.\[]/)[0] : attributePath;
            const makeSafeId = (eid, suffix = "") => {
                const base = rootAttr ? (eid + "_" + rootAttr) : eid;
                let safe = base.replace(/[^a-zA-Z0-9_]/g, "_");
                const maxBase = 63 - suffix.length;
                if (safe.length > maxBase) safe = safe.substring(0, maxBase);
                return safe + suffix;
            };
            const safeId = makeSafeId(entityId, "_txt");
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
                text_align: "center"
            }
        };
    },
    collectRequirements,
    onExportTextSensors,
    export: exportDoc
};
