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
    const fontFamily = (props.font_family || "Roboto") + ", sans-serif";
    const precision = (typeof props.precision === 'number' && !isNaN(props.precision)) ? props.precision : 1;

    // Theme awareness
    const color = props.color || "theme_auto";
    const colorStyle = getColorStyle(color);
    el.style.color = colorStyle;

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
    el.style.alignItems = "center";
    el.style.justifyContent = "center";
    el.style.gap = layout === "vertical" ? "4px" : "0px";
    el.style.overflow = "hidden";
    el.style.padding = "4px";
    el.style.boxSizing = "border-box";

    // Border and Background
    const borderRadius = props.border_radius || 0;
    el.style.backgroundColor = getColorStyle(props.background_color || "transparent");
    el.style.borderRadius = `${borderRadius}px`;

    // Apply Border
    if (props.border_width) {
        const borderW = props.border_width;
        const borderColor = getColorStyle(props.border_color || color);
        el.style.border = `${borderW}px solid ${borderColor}`;
    } else {
        el.style.border = "none";
    }

    const availableWidth = widget.width - (el.style.border !== "none" ? (parseInt(props.border_width || 0) * 2) : 0) - 8; // -8 for 4px padding on both sides
    const availableHeight = widget.height - (el.style.border !== "none" ? (parseInt(props.border_width || 0) * 2) : 0) - 8;

    const itemWidth = layout === "horizontal" ? Math.floor(availableWidth / days) : availableWidth;
    const itemHeight = layout === "vertical" ? Math.floor(availableHeight / days) : availableHeight;

    const weatherEntity = widget.entity_id || props.weather_entity || "weather.forecast_home";

    for (let i = 0; i < days; i++) {
        const dayDiv = document.createElement("div");
        dayDiv.style.display = "flex";
        dayDiv.style.flexDirection = "column";
        dayDiv.style.alignItems = "center";
        dayDiv.style.justifyContent = "center";
        dayDiv.style.width = `${itemWidth}px`;
        dayDiv.style.minHeight = layout === "vertical" ? `${itemHeight}px` : "100%";
        dayDiv.style.color = colorStyle;
        dayDiv.style.fontFamily = fontFamily;

        // Try to get live data
        let liveCond = null;
        let liveHigh = null;
        let liveLow = null;

        if (window.AppState && window.AppState.entityStates) {
            const condState = window.AppState.entityStates[`sensor.weather_forecast_day_${i}_condition`];
            const highState = window.AppState.entityStates[`sensor.weather_forecast_day_${i}_high`];
            const lowState = window.AppState.entityStates[`sensor.weather_forecast_day_${i}_low`];

            if (condState && condState.state && condState.state !== "unknown") liveCond = condState.state.toLowerCase();
            if (highState && highState.state && highState.state !== "unknown") liveHigh = parseFloat(highState.state);
            if (lowState && lowState.state && lowState.state !== "unknown") liveLow = parseFloat(lowState.state);
        }

        const dayLabel = document.createElement("div");
        dayLabel.style.fontSize = `${dayFontSize}px`;
        dayLabel.style.fontWeight = "400";
        dayLabel.style.marginBottom = "2px";

        if (i === 0) {
            dayLabel.textContent = "Today";
        } else {
            const future = new Date();
            future.setDate(future.getDate() + i);
            dayLabel.textContent = future.toLocaleDateString(undefined, { weekday: 'short' });
        }
        dayDiv.appendChild(dayLabel);

        const iconDiv = document.createElement("div");
        let iconCode = "F0590"; // Default cloudy
        const condition = liveCond || (weatherIcons[i % weatherIcons.length].condition);

        const iconMatch = [
            { code: "F0594", condition: "clear-night" },
            { code: "F0590", condition: "cloudy" },
            { code: "F0026", condition: "exceptional" },
            { code: "F0591", condition: "fog" },
            { code: "F0592", condition: "hail" },
            { code: "F0593", condition: "lightning" },
            { code: "F067E", condition: "lightning-rainy" },
            { code: "F0595", condition: "partlycloudy" },
            { code: "F0596", condition: "pouring" },
            { code: "F0597", condition: "rainy" },
            { code: "F0598", condition: "snowy" },
            { code: "F067F", condition: "snowy-rainy" },
            { code: "F0599", condition: "sunny" },
            { code: "F059D", condition: "windy" },
            { code: "F059E", condition: "windy-variant" }
        ].find(ic => ic.condition === condition);

        if (iconMatch) iconCode = iconMatch.code;

        const cp = 0xf0000 + parseInt(iconCode.slice(1), 16);
        iconDiv.innerText = String.fromCodePoint(cp);
        iconDiv.style.fontSize = `${iconSize}px`;
        iconDiv.style.fontFamily = "MDI, system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
        iconDiv.style.lineHeight = "1.1";
        dayDiv.appendChild(iconDiv);

        const tempDiv = document.createElement("div");
        tempDiv.style.fontSize = `${tempFontSize}px`;
        tempDiv.style.fontWeight = "400";

        const high = !isNaN(liveHigh) ? liveHigh : mockTemps[i % mockTemps.length].high;
        const low = !isNaN(liveLow) ? liveLow : mockTemps[i % mockTemps.length].low;

        const formatTemp = (val) => {
            if (typeof val !== 'number' || isNaN(val)) return "--";
            return val.toFixed(precision);
        };

        const tempUnit = props.temp_unit || "C";
        const unitSymbol = tempUnit === "F" ? "°F" : "°C";
        if (showHighLow) {
            tempDiv.textContent = `${formatTemp(high)}${unitSymbol}/${formatTemp(low)}${unitSymbol}`;
        } else {
            tempDiv.textContent = `${formatTemp(high)}${unitSymbol}`;
        }
        dayDiv.appendChild(tempDiv);

        el.appendChild(dayDiv);
    }
    // weatherEntity already declared above

    if (!weatherEntity) {
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
    const colorProp = p.color || "theme_auto";
    const color = getColorConst(colorProp);
    const tempUnit = p.temp_unit || "C";
    const unitSymbol = tempUnit === "F" ? "°F" : "°C";
    const precision = (typeof p.precision === 'number' && !isNaN(p.precision)) ? p.precision : 1;

    const dayFontId = addFont(fontFamily, 700, dayFontSize);
    const tempFontId = addFont(fontFamily, 400, tempFontSize);
    const iconFontId = addFont("Material Design Icons", 400, iconSize);

    lines.push(`        // widget:weather_forecast id:${w.id} type:weather_forecast x:${w.x} y:${w.y} w:${w.width} h:${w.height} weather_entity:"${weatherEntity}" layout:${layout} show_high_low:${showHighLow} day_font_size:${dayFontSize} temp_font_size:${tempFontSize} icon_size:${iconSize} font_family:"${fontFamily}" color:${colorProp} precision:${precision} ${getCondProps(w)}`);

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

    // Background fill
    const bgColorProp = p.bg_color || p.background_color || "transparent";
    const radius = p.border_radius || 0;

    if (bgColorProp && bgColorProp !== "transparent") {
        const bgColorConst = getColorConst(bgColorProp);
        if (radius > 0) {
            lines.push(`          it.filled_rounded_rectangle(${w.x}, ${w.y}, ${w.width}, ${w.height}, ${radius}, ${bgColorConst});`);
        } else {
            lines.push(`          it.filled_rectangle(${w.x}, ${w.y}, ${w.width}, ${w.height}, ${bgColorConst});`);
        }
        addDitherMask(lines, bgColorProp, isEpaper, w.x, w.y, w.width, w.height);
    }

    // Border
    const borderWidth = parseInt(p.border_width || 0, 10);
    if (borderWidth > 0) {
        const borderColorProp = p.border_color || colorProp;
        const borderColorConst = getColorConst(borderColorProp);
        if (radius > 0) {
            // For rounded borders, we can't easily draw generic thick borders without primitives.
            // But we can draw a few concentric wires.
            for (let i = 0; i < borderWidth; i++) {
                // it.rounded_rectangle not universally available? rounded_rectangle IS available in DisplayBuffer?
                // Usually it is 'rectangle', 'filled_rectangle', 'line', 'pixel'. 
                // 'rounded_rectangle' might exist? Let's assume No for safety or check docs (not available).
                // Actually commonly: it.rectangle(...).
                // For now, let's fallback to sharp rectangle loop for borders to be safe/consistent, 
                // OR use rounded_rectangle if I'm confident.
                // Given I used rectangle in others, I'll stick to rectangle for now to avoid compilation errors,
                // UNLESS I just want to support background radius (which I added above).
                // I'll stick to sharp borders for safety, or just ignore radius for the border itself in export
                // until I have a verified rounded_rectangle primitive.
                // Actually, filled_rounded_rectangle exists. rounded_rectangle usually implies outline.
                // Let's us rectangle loop for now.
                lines.push(`          it.rectangle(${w.x} + ${i}, ${w.y} + ${i}, ${w.width} - 2 * ${i}, ${w.height} - 2 * ${i}, ${borderColorConst});`);
            }
        } else {
            for (let i = 0; i < borderWidth; i++) {
                lines.push(`          it.rectangle(${w.x} + ${i}, ${w.y} + ${i}, ${w.width} - 2 * ${i}, ${w.height} - 2 * ${i}, ${borderColorConst});`);
            }
        }
    }

    const days = Math.min(7, Math.max(1, parseInt(p.days, 10) || 5));
    const isHorizontal = layout === "horizontal";
    const xInc = isHorizontal ? Math.floor(w.width / days) : 0;
    const yInc = isHorizontal ? 0 : Math.floor(w.height / days);
    const centerOffset = isHorizontal ? Math.floor(xInc / 2) : Math.floor(w.width / 2);

    const totalContentHeight = dayFontSize + 4 + iconSize + 4 + tempFontSize;
    const slotHeight = isHorizontal ? w.height : yInc;
    const verticalStartOffset = Math.max(0, Math.floor((slotHeight - totalContentHeight) / 2));

    for (let day = 0; day < days; day++) {
        const condSensorId = `weather_cond_day${day}`;
        const highSensorId = `weather_high_day${day}`;
        const lowSensorId = `weather_low_day${day}`;
        const dayX = w.x + day * xInc;
        const dayY = w.y + day * yInc;

        lines.push(`          {`);
        lines.push(`            int dx = ${dayX}; int dy = ${dayY} + ${verticalStartOffset};`);
        lines.push(`            it.printf(dx + ${centerOffset}, dy, id(${dayFontId}), ${color}, TextAlign::TOP_CENTER, "%s", get_day_name(${day}).c_str());`);
        lines.push(`            std::string cond_day = id(${condSensorId}).state.c_str();`);
        lines.push(`            it.printf(dx + ${centerOffset}, dy + ${dayFontSize + 4}, id(${iconFontId}), ${color}, TextAlign::TOP_CENTER, "%s", get_icon(cond_day));`);
        if (showHighLow) {
            lines.push(`            float high = id(${highSensorId}).state; float low = id(${lowSensorId}).state;`);
            lines.push(`            char temp_buf[32];`);
            lines.push(`            if (std::isnan(high) && std::isnan(low)) {`);
            lines.push(`                sprintf(temp_buf, "--/--");`);
            lines.push(`            } else if (std::isnan(high)) {`);
            lines.push(`                sprintf(temp_buf, "--/%.*f${unitSymbol}", ${precision}, low);`);
            lines.push(`            } else if (std::isnan(low)) {`);
            lines.push(`                sprintf(temp_buf, "%.*f${unitSymbol}/--", ${precision}, high);`);
            lines.push(`            } else {`);
            lines.push(`                sprintf(temp_buf, "%.*f/%.*f${unitSymbol}", ${precision}, high, ${precision}, low);`);
            lines.push(`            }`);
            lines.push(`            it.printf(dx + ${centerOffset}, dy + ${dayFontSize + iconSize + 8}, id(${tempFontId}), ${color}, TextAlign::TOP_CENTER, "%s", temp_buf);`);
        }
        lines.push(`          }`);
    }

    addDitherMask(lines, colorProp, isEpaper, w.x, w.y, w.width, w.height);
    lines.push(`        }`);
    if (condFore) lines.push(`        }`);
};

const onExportNumericSensors = (context) => {
    // REGRESSION PROOF: Always destructure 'lines' from context to allow sensor generation
    const { lines, widgets, isLvgl, pendingTriggers } = context;
    const weatherWidgets = widgets.filter(w => w.type === "weather_forecast");
    if (weatherWidgets.length === 0) return;

    weatherWidgets.forEach(w => {
        // Register triggers for configured number of days
        const days = Math.min(7, Math.max(1, parseInt(w.props?.days, 10) || 5));
        for (let day = 0; day < days; day++) {
            const sensors = [
                `sensor.weather_forecast_day_${day}_high`,
                `sensor.weather_forecast_day_${day}_low`,
                `sensor.weather_forecast_day_${day}_condition`
            ];

            sensors.forEach(sid => {
                if (isLvgl && pendingTriggers) {
                    const safeWidgetId = w.id.replace(/-/g, "_");
                    if (!pendingTriggers.has(sid)) pendingTriggers.set(sid, new Set());
                    pendingTriggers.get(sid).add(`- lvgl.widget.refresh: ${safeWidgetId}_day${day}`);
                    pendingTriggers.get(sid).add(`- lvgl.widget.refresh: ${safeWidgetId}_icon${day}`);
                    pendingTriggers.get(sid).add(`- lvgl.widget.refresh: ${safeWidgetId}_temp${day}`);
                }
            });
        }

        // Explicitly export the Home Assistant sensor blocks for temperature highs and lows
        const tempUnit = w.props?.temp_unit || "C";
        const unitSymbol = tempUnit === "F" ? "°F" : "°C";

        for (let day = 0; day < days; day++) {
            const highSid = `sensor.weather_forecast_day_${day}_high`;
            const lowSid = `sensor.weather_forecast_day_${day}_low`;
            const highId = `weather_high_day${day}`;
            const lowId = `weather_low_day${day}`;

            [
                { eid: highSid, id: highId, name: `Weather High Day ${day}` },
                { eid: lowSid, id: lowId, name: `Weather Low Day ${day}` }
            ].forEach(s => {
                if (context.seenSensorIds && !context.seenSensorIds.has(s.id)) {
                    if (context.seenSensorIds.size === 0) {
                        lines.push("");
                        lines.push("# Weather Forecast Numeric Sensors");
                    }
                    context.seenSensorIds.add(s.id);
                    lines.push("- platform: homeassistant");
                    lines.push(`  id: ${s.id}`);
                    lines.push(`  entity_id: ${s.eid}`);
                    lines.push(`  unit_of_measurement: '${unitSymbol}'`);
                    lines.push(`  internal: true`);
                }
            });
        }
    });
};

const onExportTextSensors = (context) => {
    const { lines, widgets } = context;
    const targets = widgets.filter(w => w.type === "weather_forecast");
    if (targets.length === 0) return;

    const p = targets[0].props || {};
    const weatherEntity = targets[0].entity_id || p.weather_entity || "weather.forecast_home";

    let addedAny = false;
    const days = Math.min(7, Math.max(1, parseInt(p.days, 10) || 5));
    for (let day = 0; day < days; day++) {
        const condId = `weather_cond_day${day}`;
        if (context.seenSensorIds && context.seenSensorIds.has(condId)) continue;

        if (!addedAny) {
            lines.push("");
            lines.push("# Weather Forecast Condition Sensors");
            addedAny = true;
        }

        if (context.seenSensorIds) context.seenSensorIds.add(condId);

        lines.push("- platform: homeassistant");
        lines.push(`  id: ${condId}`);
        lines.push(`  entity_id: sensor.weather_forecast_day_${day}_condition`);
        lines.push(`  internal: true`);
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
    lines.push("#         hours: '/1'");
    lines.push("#     action:");
    lines.push("#       - action: weather.get_forecasts");
    lines.push("#         target:");
    lines.push(`#           entity_id: ${weatherEntity}`);
    lines.push("#         data:");
    lines.push("#           type: daily");
    lines.push("#         response_variable: forecast_data");
    lines.push("#     sensor:");
    const tempUnit = p.temp_unit || "C";
    const unitSymbol = tempUnit === "F" ? "°F" : "°C";
    for (let day = 0; day < days; day++) {
        lines.push(`#       - name: 'Weather Forecast Day ${day} High'`);
        lines.push(`#         unique_id: weather_forecast_day_${day}_high`);
        lines.push(`#         unit_of_measurement: '${unitSymbol}'`);
        lines.push(`#         state: '{{ forecast_data["${weatherEntity}"].forecast[${day}].temperature | default("N/A") }}'`);
        lines.push(`#       - name: 'Weather Forecast Day ${day} Low'`);
        lines.push(`#         unique_id: weather_forecast_day_${day}_low`);
        lines.push(`#         unit_of_measurement: '${unitSymbol}'`);
        lines.push(`#         state: '{{ forecast_data["${weatherEntity}"].forecast[${day}].templow | default("N/A") }}'`);
        lines.push(`#       - name: 'Weather Forecast Day ${day} Condition'`);
        lines.push(`#         unique_id: weather_forecast_day_${day}_condition`);
        lines.push(`#         state: '{{ forecast_data["${weatherEntity}"].forecast[${day}].condition | default("cloudy") }}'`);
    }
    lines.push("#");
    lines.push("# ============================================================================");
};

const collectRequirements = (w, context) => {
    const { trackIcon, addFont } = context;
    const p = w.props || {};
    const iconSize = parseInt(p.icon_size || 32, 10);
    const dayFS = parseInt(p.day_font_size || 12, 10);
    const tempFS = parseInt(p.temp_font_size || 14, 10);
    const family = p.font_family || "Roboto";

    // Register fonts for both LVGL and Direct modes
    addFont(family, 700, dayFS);
    addFont(family, 400, tempFS);
    addFont("Material Design Icons", 400, iconSize);

    ["F0594", "F0590", "F0026", "F0591", "F0592", "F0593", "F067E", "F0595", "F0596", "F0597", "F0598", "F067F", "F0599", "F059D", "F059E"].forEach(c => trackIcon(c, iconSize));
};

export default {
    id: "weather_forecast",
    name: "Weather Forecast",
    category: "Sensors",
    // CRITICAL ARCHITECTURAL NOTE: OEPL and OpenDisplay are excluded because this widget 
    // requires complex HA template sensors which are not currently optimized for 
    // those protocols.
    supportedModes: ['lvgl', 'direct'],
    defaults: {
        weather_entity: "weather.forecast_home",
        days: 5,
        layout: "horizontal",
        icon_size: 32,
        temp_font_size: 14,
        day_font_size: 12,
        color: "theme_auto",
        font_family: "Roboto",
        show_high_low: true,
        show_high_low: true,
        border_width: 0,
        border_color: "theme_auto",
        border_radius: 0,
        background_color: "transparent",
        temp_unit: "C",
        precision: 1,
        width: 370,
        height: 90
    },
    render,
    exportLVGL: (w, { common, convertColor, getLVGLFont }) => {
        const p = w.props || {};
        const days = Math.min(7, Math.max(1, parseInt(p.days, 10) || 5));
        const isHorizontal = (p.layout || "horizontal") === "horizontal";
        const color = convertColor(p.color || "theme_auto");
        const dayFS = parseInt(p.day_font_size || 12, 10);
        const iconS = parseInt(p.icon_size || 32, 10);
        const tempFS = parseInt(p.temp_font_size || 14, 10);
        const showHighLow = p.show_high_low !== false;
        const precision = (typeof p.precision === 'number' && !isNaN(p.precision)) ? p.precision : 1;

        const widgets = [];

        for (let i = 0; i < days; i++) {
            // Unrolling helper logic directly into lambdas to avoid scope issues
            const dayNameLambda = `!lambda |-
              if (${i} == 0) return "Today";
              auto t = id(ha_time).now();
              if (!t.is_valid()) return "---";
              ESPTime future = ESPTime::from_epoch_local(t.timestamp + (${i} * 86400));
              static char buf[16];
              future.strftime(buf, sizeof(buf), "%a");
              return buf;
            `;

            const iconLambda = `!lambda |-
              std::string c = id(weather_cond_day${i}).state;
              if (c == "clear-night") return "\\U000F0594";
              if (c == "cloudy") return "\\U000F0590";
              if (c == "exceptional") return "\\U000F0026";
              if (c == "fog") return "\\U000F0591";
              if (c == "hail") return "\\U000F0592";
              if (c == "lightning") return "\\U000F0593";
              if (c == "lightning-rainy") return "\\U000F067E";
              if (c == "partlycloudy") return "\\U000F0595";
              if (c == "pouring") return "\\U000F0596";
              if (c == "rainy") return "\\U000F0597";
              if (c == "snowy") return "\\U000F0598";
              if (c == "snowy-rainy") return "\\U000F067F";
              if (c == "sunny") return "\\U000F0599";
              if (c == "windy") return "\\U000F059D";
              if (c == "windy-variant") return "\\U000F059E";
              return "\\U000F0590";
            `;

            const dayWidgets = [
                {
                    label: {
                        id: `${w.id}_day${i}`.replace(/-/g, '_'),
                        align: "top_mid",
                        text: dayNameLambda,
                        text_font: getLVGLFont(p.font_family || "Roboto", dayFS, 700),
                        text_color: color
                    }
                },
                {
                    label: {
                        id: `${w.id}_icon${i}`.replace(/-/g, '_'),
                        align: "center",
                        y: 0,
                        text: iconLambda,
                        text_font: getLVGLFont("Material Design Icons", iconS, 400),
                        text_color: color
                    }
                },
                {
                    label: {
                        id: `${w.id}_temp${i}`.replace(/-/g, '_'),
                        align: "bottom_mid",
                        text: showHighLow ? `!lambda "return str_sprintf(\'%.${precision}f/%.${precision}f\', id(weather_high_day${i}).state, id(weather_low_day${i}).state).c_str();"` : `!lambda "return str_sprintf(\'%.${precision}f\', id(weather_high_day${i}).state).c_str();"`,
                        text_font: getLVGLFont(p.font_family || "Roboto", tempFS, 400),
                        text_color: color
                    }
                }
            ];

            widgets.push({
                obj: {
                    width: isHorizontal ? (100 / days) + "%" : "100%",
                    height: isHorizontal ? "100%" : (100 / days) + "%",
                    bg_opa: "transp",
                    border_width: 0,
                    widgets: dayWidgets
                }
            });
        }

        return {
            obj: {
                ...common,
                bg_color: convertColor(p.background_color || "white"),
                bg_opa: "COVER",
                radius: 8,
                border_width: p.show_border !== false ? (p.border_width || 1) : 0,
                border_color: convertColor(p.border_color || p.color || "theme_auto"),
                layout: { type: "flex", flex_flow: isHorizontal ? "row" : "column", flex_align_main: "space_around", flex_align_cross: "center" },
                widgets: widgets
            }
        };
    },
    exportOpenDisplay: (w, { layout, page }) => {
        const p = w.props || {};
        const entityId = (w.entity_id || p.weather_entity || "weather.forecast_home").trim();
        const iconSize = p.icon_size || 32;
        const tempSize = p.temp_font_size || 14;

        // Convert theme_auto to actual color
        let color = p.color || "black";
        if (color === "theme_auto") {
            color = layout?.darkMode ? "white" : "black";
        }

        const iconTemplate = `{{ {
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

        const tempTemplate = `{{ states('${entityId}') }} | {{ state_attr('${entityId}', 'temperature') }}°`;

        return [
            {
                type: "icon",
                value: iconTemplate,
                x: Math.round(w.x + w.width / 2),
                y: Math.round(w.y),
                size: iconSize,
                color: color,
                anchor: "mt"
            },
            {
                type: "text",
                value: tempTemplate,
                x: Math.round(w.x + w.width / 2),
                y: Math.round(w.y + iconSize + 2),
                size: tempSize,
                color: color,
                anchor: "mt"
            }
        ];
    },
    exportOEPL: (w, { layout, page }) => {
        const p = w.props || {};
        const entityId = (w.entity_id || p.weather_entity || "weather.forecast_home").trim();
        return {
            type: "text",
            value: `{{ states('${entityId}') }}`,
            x: Math.round(w.x),
            y: Math.round(w.y),
            size: p.temp_font_size || 14,
            color: p.color || "theme_auto",
            anchor: "lt"
        };
    },
    export: exportDoc,
    onExportNumericSensors,
    onExportTextSensors,
    collectRequirements
};

