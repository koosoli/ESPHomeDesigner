/**
 * Weather Forecast Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const layout = props.layout || "horizontal";
    const days = Math.min(7, Math.max(1, parseInt(props.days, 10) || 5));
    const iconSize = parseInt(props.icon_size, 10) || 32;
    const tempFontSize = parseInt(props.temp_font_size, 10) || 14;
    const dayFontSize = parseInt(props.day_font_size, 10) || 12;
    const showHighLow = props.show_high_low !== false;
    const colorStyle = getColorStyle(props.color || "black");
    const fontFamily = (props.font_family || "Roboto") + ", sans-serif";

    const weatherIcons = [
        { code: "F0599", condition: "sunny" },
        { code: "F0595", condition: "partlycloudy" },
        { code: "F0597", condition: "rainy" },
        { code: "F0590", condition: "cloudy" },
        { code: "F0595", condition: "partlycloudy" }
    ];

    const dayNames = ["Today", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const mockTemps = [
        { high: 24, low: 18 },
        { high: 20, low: 14 },
        { high: 22, low: 15 },
        { high: 19, low: 13 },
        { high: 18, low: 12 },
        { high: 21, low: 15 },
        { high: 23, low: 16 }
    ];

    el.innerHTML = "";
    el.style.display = "flex";
    el.style.flexDirection = layout === "vertical" ? "column" : "row";
    el.style.alignItems = "flex-start";
    el.style.justifyContent = "flex-start";
    el.style.gap = layout === "vertical" ? "4px" : "0px";
    el.style.overflow = "hidden";
    el.style.padding = "4px";
    el.style.boxSizing = "border-box";

    // Border and Background
    el.style.backgroundColor = getColorStyle(props.background_color || "transparent");
    if (props.show_border !== false) {
        const borderW = props.border_width !== undefined ? props.border_width : 1;
        const borderColor = getColorStyle(props.border_color || props.color || "black");
        el.style.border = `${borderW}px solid ${borderColor}`;
    } else {
        el.style.border = "none";
    }

    const availableWidth = widget.width - (el.style.border !== "none" ? (parseInt(props.border_width || 1) * 2) : 0) - 8; // -8 for 4px padding on both sides
    const availableHeight = widget.height - (el.style.border !== "none" ? (parseInt(props.border_width || 1) * 2) : 0) - 8;

    const itemWidth = layout === "horizontal" ? Math.floor(availableWidth / days) : availableWidth;
    const itemHeight = layout === "vertical" ? Math.floor(availableHeight / days) : availableHeight;

    for (let i = 0; i < days; i++) {
        const dayDiv = document.createElement("div");
        dayDiv.style.display = "flex";
        dayDiv.style.flexDirection = "column";
        dayDiv.style.alignItems = "center";
        dayDiv.style.justifyContent = "flex-start";
        dayDiv.style.width = `${itemWidth}px`;
        dayDiv.style.minHeight = layout === "vertical" ? `${itemHeight}px` : "auto";
        dayDiv.style.color = colorStyle;
        dayDiv.style.fontFamily = fontFamily;

        const dayLabel = document.createElement("div");
        dayLabel.style.fontSize = `${dayFontSize}px`;
        dayLabel.style.fontWeight = "400";
        dayLabel.style.marginBottom = "2px";
        dayLabel.textContent = dayNames[i] || `D${i}`;
        dayDiv.appendChild(dayLabel);

        const iconDiv = document.createElement("div");
        const iconData = weatherIcons[i % weatherIcons.length];
        const cp = 0xf0000 + parseInt(iconData.code.slice(1), 16);
        iconDiv.innerText = String.fromCodePoint(cp);
        iconDiv.style.fontSize = `${iconSize}px`;
        iconDiv.style.fontFamily = "MDI, system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
        iconDiv.style.lineHeight = "1.1";
        dayDiv.appendChild(iconDiv);

        const tempDiv = document.createElement("div");
        tempDiv.style.fontSize = `${tempFontSize}px`;
        tempDiv.style.fontWeight = "400";
        const temp = mockTemps[i % mockTemps.length];
        if (showHighLow) {
            tempDiv.textContent = `${temp.high}°/${temp.low}°`;
        } else {
            tempDiv.textContent = `${temp.high}°`;
        }
        dayDiv.appendChild(tempDiv);

        el.appendChild(dayDiv);
    }

    if (!widget.entity_id) {
        const warning = document.createElement("div");
        warning.style.position = "absolute";
        warning.style.bottom = "2px";
        warning.style.right = "4px";
        warning.style.fontSize = "9px";
        warning.style.color = "#888";
        warning.textContent = "⚠ No weather entity";
        el.appendChild(warning);
    }
};

const exportDoc = (w, context) => {
    const {
        lines, addFont, getColorConst, addDitherMask, sanitize, getCondProps, getConditionCheck, isEpaper
    } = context;

    const p = w.props || {};
    const weatherEntity = w.entity_id || p.weather_entity || "weather.forecast_home";
    const layout = p.layout || "horizontal";
    const showHighLow = p.show_high_low !== false;
    const dayFontSize = parseInt(String(p.day_font_size || 12), 10);
    const tempFontSize = parseInt(String(p.temp_font_size || 14), 10);
    const iconSize = parseInt(String(p.icon_size || 32), 10);
    const fontFamily = p.font_family || "Roboto";
    const colorProp = p.color || "black";
    const color = getColorConst(colorProp);

    const dayFontId = addFont(fontFamily, 700, dayFontSize);
    const tempFontId = addFont(fontFamily, 400, tempFontSize);
    const iconFontId = addFont("Material Design Icons", 400, iconSize);

    lines.push(`        // widget:weather_forecast id:${w.id} type:weather_forecast x:${w.x} y:${w.y} w:${w.width} h:${w.height} weather_entity:"${weatherEntity}" layout:${layout} show_high_low:${showHighLow} day_font_size:${dayFontSize} temp_font_size:${tempFontSize} icon_size:${iconSize} font_family:"${fontFamily}" color:${colorProp} ${getCondProps(w)}`);

    const condFore = getConditionCheck(w);
    if (condFore) lines.push(`        ${condFore}`);

    lines.push(`        {`);
    lines.push(`          static std::map<std::string, const char*> weather_icons = {`);
    lines.push(`            {"clear-night", "\\U000F0594"}, {"cloudy", "\\U000F0590"},`);
    lines.push(`            {"exceptional", "\\U000F0026"}, {"fog", "\\U000F0591"},`);
    lines.push(`            {"hail", "\\U000F0592"}, {"lightning", "\\U000F0593"},`);
    lines.push(`            {"lightning-rainy", "\\U000F067E"}, {"partlycloudy", "\\U000F0595"},`);
    lines.push(`            {"pouring", "\\U000F0596"}, {"rainy", "\\U000F0597"},`);
    lines.push(`            {"snowy", "\\U000F0598"}, {"snowy-rainy", "\\U000F067F"},`);
    lines.push(`            {"sunny", "\\U000F0599"}, {"windy", "\\U000F059D"},`);
    lines.push(`            {"windy-variant", "\\U000F059E"}`);
    lines.push(`          };`);
    lines.push(`          auto get_icon = [&](const std::string& cond_val) -> const char* {`);
    lines.push(`            return weather_icons.count(cond_val) ? weather_icons[cond_val] : "\\U000F0590";`);
    lines.push(`          };`);
    lines.push(`          auto get_day_name = [](int offset) -> std::string {`);
    lines.push(`            if (offset == 0) return "Today";`);
    lines.push(`            auto t = id(ha_time).now();`);
    lines.push(`            if (!t.is_valid()) return "---";`);
    lines.push(`            ESPTime future = ESPTime::from_epoch_local(t.timestamp + (offset * 86400));`);
    lines.push(`            char buf[8]; future.strftime(buf, sizeof(buf), "%a");`);
    lines.push(`            return std::string(buf);`);
    lines.push(`          };`);

    const isHorizontal = layout === "horizontal";
    const xInc = isHorizontal ? Math.floor(w.width / 5) : 0;
    const yInc = isHorizontal ? 0 : Math.floor(w.height / 5);
    const centerOffset = isHorizontal ? Math.floor(xInc / 2) : Math.floor(w.width / 2);

    for (let day = 0; day < 5; day++) {
        const condSensorId = `weather_cond_day${day}`;
        const highSensorId = `weather_high_day${day}`;
        const lowSensorId = `weather_low_day${day}`;
        const dayX = w.x + day * xInc;
        const dayY = w.y + day * yInc;

        lines.push(`          {`);
        lines.push(`            int dx = ${dayX}; int dy = ${dayY};`);
        lines.push(`            it.printf(dx + ${centerOffset}, dy, id(${dayFontId}), ${color}, TextAlign::TOP_CENTER, "%s", get_day_name(${day}).c_str());`);
        lines.push(`            std::string cond_day = id(${condSensorId}).state;`);
        lines.push(`            it.printf(dx + ${centerOffset}, dy + ${dayFontSize + 4}, id(${iconFontId}), ${color}, TextAlign::TOP_CENTER, "%s", get_icon(cond_day));`);
        if (showHighLow) {
            lines.push(`            float high = id(${highSensorId}).state; float low = id(${lowSensorId}).state;`);
            lines.push(`            if (!std::isnan(high) && !std::isnan(low)) {`);
            lines.push(`              it.printf(dx + ${centerOffset}, dy + ${dayFontSize + iconSize + 8}, id(${tempFontId}), ${color}, TextAlign::TOP_CENTER, "%.0f/%.0f", high, low);`);
            lines.push(`            }`);
        }
        lines.push(`          }`);
    }

    addDitherMask(lines, colorProp, isEpaper, w.x, w.y, w.width, w.height);
    lines.push(`        }`);
    if (condFore) lines.push(`        }`);
};

const onExportNumericSensors = (context) => {
    const { lines, widgets } = context;
    const hasWeather = widgets.some(w => w.type === "weather_forecast");

    if (hasWeather) {
        lines.push("");
        lines.push("  # Weather Forecast High/Low Sensors");
        for (let day = 0; day < 5; day++) {
            lines.push(`  - platform: homeassistant`);
            lines.push(`    id: weather_high_day${day}`);
            lines.push(`    entity_id: sensor.weather_forecast_day_${day}_high`);
            lines.push(`    internal: true`);
            lines.push(`  - platform: homeassistant`);
            lines.push(`    id: weather_low_day${day}`);
            lines.push(`    entity_id: sensor.weather_forecast_day_${day}_low`);
            lines.push(`    internal: true`);
        }
    }
};

const onExportTextSensors = (context) => {
    const { lines, widgets } = context;
    const targets = widgets.filter(w => w.type === "weather_forecast");
    if (targets.length === 0) return;

    const weatherEntity = targets[0].entity_id || targets[0].props?.weather_entity || "weather.forecast_home";

    lines.push("");
    lines.push("  # Weather Forecast Condition Sensors");
    for (let day = 0; day < 5; day++) {
        lines.push(`  - platform: homeassistant`);
        lines.push(`    id: weather_cond_day${day}`);
        lines.push(`    entity_id: sensor.weather_forecast_day_${day}_condition`);
        lines.push(`    internal: true`);
    }

    lines.push("");
    lines.push("# ============================================================================");
    lines.push("# HOME ASSISTANT TEMPLATE SENSORS");
    lines.push("# Add these template sensors to your Home Assistant configuration.yaml:");
    lines.push("# ============================================================================");
    lines.push("#");
    lines.push("# template:");
    lines.push("#   - trigger:");
    lines.push("#       - trigger: state");
    lines.push(`#         entity_id: ${weatherEntity}`);
    lines.push("#       - trigger: time_pattern");
    lines.push("#         hours: \"/1\"");
    lines.push("#     action:");
    lines.push("#       - action: weather.get_forecasts");
    lines.push("#         target:");
    lines.push(`#           entity_id: ${weatherEntity}`);
    lines.push("#         data:");
    lines.push("#           type: daily");
    lines.push("#         response_variable: forecast_data");
    lines.push("#     sensor:");
    for (let day = 0; day < 5; day++) {
        lines.push(`#       - name: 'Weather Forecast Day ${day} High'`);
        lines.push(`#         unique_id: weather_forecast_day_${day}_high`);
        lines.push(`#         unit_of_measurement: '°C'`);
        lines.push(`#         state: '{{ forecast_data["${weatherEntity}"].forecast[${day}].temperature | default("N/A") }}'`);
        lines.push(`#       - name: 'Weather Forecast Day ${day} Low'`);
        lines.push(`#         unique_id: weather_forecast_day_${day}_low`);
        lines.push(`#         unit_of_measurement: '°C'`);
        lines.push(`#         state: '{{ forecast_data["${weatherEntity}"].forecast[${day}].templow | default("N/A") }}'`);
        lines.push(`#       - name: 'Weather Forecast Day ${day} Condition'`);
        lines.push(`#         unique_id: weather_forecast_day_${day}_condition`);
        lines.push(`#         state: '{{ forecast_data["${weatherEntity}"].forecast[${day}].condition | default("cloudy") }}'`);
    }
    lines.push("#");
    lines.push("# ============================================================================");
};

export default {
    id: "weather_forecast",
    name: "Weather Forecast",
    category: "Sensors",
    defaults: {
        days: 5,
        layout: "horizontal",
        icon_size: 32,
        temp_font_size: 14,
        day_font_size: 12,
        color: "black",
        font_family: "Roboto",
        show_high_low: true,
        show_border: false,
        border_width: 1,
        border_color: "black",
        background_color: "white",
        width: 370,
        height: 90
    },
    render,
    export: exportDoc,
    onExportNumericSensors,
    onExportTextSensors
};

