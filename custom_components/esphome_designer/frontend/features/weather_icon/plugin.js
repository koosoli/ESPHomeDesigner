import { getSensorPlatformLines } from '../../js/io/adapters/mqtt_helpers.js';
import { renderWeatherIcon } from './render.js';
import { renderWeatherIconProperties } from './properties.js';

const render = renderWeatherIcon;

const exportDoc = (w, context) => {
    const {
        lines, addFont, getColorConst, getCondProps, getConditionCheck // eslint-disable-line no-unused-vars
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
        const rootAttr = (attributePath.includes(".") || attributePath.includes("[")) ? attributePath.split(/[.[]/)[0] : attributePath;
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
        const mqttTopic = (w.props?.mqtt_topic || "").trim();
        if (entityId || mqttTopic) {
            weatherEntities.add({ id: w.id, entity_id: entityId, attribute, mqtt_topic: mqttTopic });
        }
    }

    weatherEntities.forEach(({ id, entity_id, attribute, mqtt_topic }) => {
        const attributePath = (attribute || "").trim();
        const rootAttr = (attributePath.includes(".") || attributePath.includes("[")) ? attributePath.split(/[.[]/)[0] : attributePath;
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
            const fakeWidget = { props: { mqtt_topic } };
            lines.push(...getSensorPlatformLines(fakeWidget, entity_id, safeId, rootAttr));
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
        bg_color: "transparent",
        weather_entity: "weather.forecast_home",
        entity_id: "weather.forecast_home",
        attribute: "",
        fit_icon_to_frame: true,
        border_width: 0,
        border_color: "theme_auto",
        border_radius: 0,
        opa: 255,
        opacity: 100
    },
    renderProperties: renderWeatherIconProperties,
    render,
    exportOpenDisplay: (w, { layout, _page }) => {
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
    exportOEPL: (w, { _layout, _page }) => {
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
            const rootAttr = (attributePath.includes(".") || attributePath.includes("[")) ? attributePath.split(/[.[]/)[0] : attributePath;
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



