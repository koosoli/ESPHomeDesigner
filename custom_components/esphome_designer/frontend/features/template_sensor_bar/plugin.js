/**
 * Template Sensor Bar Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const color = props.color || "black";
    const iconSize = props.icon_size || 20;
    const fontSize = props.font_size || 14;

    el.style.display = "flex";
    el.style.alignItems = "center";
    el.style.justifyContent = "space-around";
    el.style.padding = "0 10px";
    el.style.boxSizing = "border-box";
    let cssColor = getColorStyle(color);
    el.style.overflow = "hidden";

    if (props.show_background) {
        const cssBgColor = getColorStyle(props.background_color || "white");
        el.style.backgroundColor = cssBgColor;
        el.style.borderRadius = (props.border_radius || 8) + "px";

        // Smart Preview: If Black on Black (common for inverted e-paper profiles), 
        // invert text color for preview visibility.
        if (cssColor === "#000000" && cssBgColor === "#000000") {
            cssColor = "#ffffff";
        }

        if (!props.background_color || props.background_color === "transparent") {
            el.style.border = "1px dashed #444"; // Visual aid for transparent
        }
    } else {
        el.style.backgroundColor = "transparent";
        el.style.borderRadius = "0";
    }

    el.style.color = cssColor;

    const getEntityState = (possibleIds) => {
        if (!window.AppState || !window.AppState.entityStates) return null;
        for (const id of possibleIds) {
            if (window.AppState.entityStates[id]) return window.AppState.entityStates[id].state;
        }
        return null;
    };

    const sensors = [];

    if (props.show_wifi) {
        const state = getEntityState(['wifi_signal_dbm', 'sensor.wifi_signal']);
        sensors.push({
            type: 'wifi',
            icon: 'F0928',
            val: state !== null ? Math.round(state) + 'dB' : '-65dB'
        });
    }

    if (props.show_temperature) {
        const state = getEntityState(['sht4x_temperature', 'sht3x_temperature', 'shtc3_temperature', 'sensor.temperature']);
        sensors.push({
            type: 'temp',
            icon: 'F050F',
            val: state !== null ? parseFloat(state).toFixed(1) + '°C' : '23.5°C'
        });
    }

    if (props.show_humidity) {
        const state = getEntityState(['sht4x_humidity', 'sht3x_humidity', 'shtc3_humidity', 'sensor.humidity']);
        sensors.push({
            type: 'hum',
            icon: 'F058E',
            val: state !== null ? Math.round(state) + '%' : '45%'
        });
    }

    if (props.show_battery) {
        const state = getEntityState(['battery_level', 'sensor.battery_level']);
        sensors.push({
            type: 'bat',
            icon: 'F0079',
            val: state !== null ? Math.round(state) + '%' : '85%'
        });
    }

    el.innerHTML = "";

    sensors.forEach(s => {
        const group = document.createElement("div");
        group.style.display = "flex";
        group.style.alignItems = "center";
        group.style.gap = "6px";

        const icon = document.createElement("span");
        const cp = parseInt(s.icon, 16);
        icon.innerText = String.fromCodePoint(cp);
        icon.style.fontFamily = "'Material Design Icons', 'MDI', system-ui, -sans-serif";
        icon.style.fontSize = iconSize + "px";
        icon.style.lineHeight = "1";

        const text = document.createElement("span");
        text.innerText = s.val;
        text.style.fontSize = fontSize + "px";
        text.style.fontFamily = "Roboto, system-ui, -sans-serif";
        text.style.fontWeight = "500";
        text.style.whiteSpace = "nowrap";

        group.appendChild(icon);
        group.appendChild(text);
        el.appendChild(group);
    });
};

const exportDoc = (w, context) => {
    const {
        lines, addFont, getColorConst, addDitherMask, getCondProps, getConditionCheck, profile, isEpaper
    } = context;

    const p = w.props || {};

    const iconSize = parseInt(p.icon_size || 20, 10);
    const fontSize = parseInt(p.font_size || 14, 10);
    const colorProp = p.color || "white";
    const color = getColorConst(colorProp);
    const showWifi = p.show_wifi !== false;
    const showTemp = p.show_temperature !== false;
    const showHum = p.show_humidity !== false;
    const showBat = p.show_battery !== false;
    const showBg = p.show_background !== false;
    const bgColor = getColorConst(p.background_color || "black");
    const radius = parseInt(p.border_radius || 8, 10);

    const iconFontRef = addFont("Material Design Icons", 400, iconSize);
    const textFontRef = addFont("Roboto", 500, fontSize);

    lines.push(`        // widget:template_sensor_bar id:${w.id} type:template_sensor_bar x:${w.x} y:${w.y} w:${w.width} h:${w.height} wifi:${showWifi} temp:${showTemp} hum:${showHum} bat:${showBat} bg:${showBg} bg_color:${p.background_color || "black"} radius:${radius} icon_size:${iconSize} font_size:${fontSize} color:${colorProp} ${getCondProps(w)}`);

    const cond = getConditionCheck(w);
    if (cond) lines.push(`        ${cond}`);

    lines.push(`        {`);
    if (showBg) {
        lines.push(`          it.filled_rectangle(${w.x}, ${w.y}, ${w.width}, ${w.height}, ${bgColor});`);
        addDitherMask(lines, p.background_color || "black", isEpaper, w.x, w.y, w.width, w.height);
        lines.push(`          it.rectangle(${w.x}, ${w.y}, ${w.width}, ${w.height}, ${bgColor});`);
    }

    let activeCount = 0;
    if (showWifi) activeCount++;
    if (showTemp) activeCount++;
    if (showHum) activeCount++;
    if (showBat) activeCount++;

    if (activeCount > 0) {
        const spacing = w.width / activeCount;
        let currentX = w.x + spacing / 2;
        const centerY = w.y + w.height / 2;

        if (showWifi) {
            lines.push(`          {`);
            lines.push(`            const char* wifi_icon = "\\U000F092B";`);
            lines.push(`            if (id(wifi_signal_dbm).has_state()) {`);
            lines.push(`              float sig = id(wifi_signal_dbm).state;`);
            lines.push(`              if (sig >= -50) wifi_icon = "\\U000F0928";`);
            lines.push(`              else if (sig >= -70) wifi_icon = "\\U000F0925";`);
            lines.push(`              else if (sig >= -85) wifi_icon = "\\U000F0922";`);
            lines.push(`              else wifi_icon = "\\U000F091F";`);
            lines.push(`            }`);
            lines.push(`            it.printf(${Math.round(currentX)} - 12, ${centerY}, id(${iconFontRef}), ${color}, TextAlign::CENTER_LEFT, "%s", wifi_icon);`);
            lines.push(`            if (id(wifi_signal_dbm).has_state()) it.printf(${Math.round(currentX)} + 8, ${centerY}, id(${textFontRef}), ${color}, TextAlign::CENTER_LEFT, "%.0fdB", id(wifi_signal_dbm).state);`);
            lines.push(`            else it.printf(${Math.round(currentX)} + 8, ${centerY}, id(${textFontRef}), ${color}, TextAlign::CENTER_LEFT, "--dB");`);
            lines.push(`          }`);
            currentX += spacing;
        }

        if (showTemp) {
            const tempId = profile.features?.sht4x ? "sht4x_temperature" : (profile.features?.sht3x ? "sht3x_temperature" : "shtc3_temperature");
            const unit = p.unit || "°C";
            lines.push(`          {`);
            lines.push(`            it.printf(${Math.round(currentX)} - 12, ${centerY}, id(${iconFontRef}), ${color}, TextAlign::CENTER_LEFT, "\\U000F050F");`);
            lines.push(`            if (id(${tempId}).has_state() && !std::isnan(id(${tempId}).state)) {`);
            if (unit === "°F" || unit === "F") {
                lines.push(`              it.printf(${Math.round(currentX)} + 8, ${centerY}, id(${textFontRef}), ${color}, TextAlign::CENTER_LEFT, "%.1f°F", id(${tempId}).state * 9.0 / 5.0 + 32.0);`);
            } else {
                lines.push(`              it.printf(${Math.round(currentX)} + 8, ${centerY}, id(${textFontRef}), ${color}, TextAlign::CENTER_LEFT, "%.1f°C", id(${tempId}).state);`);
            }
            lines.push(`            } else {`);
            lines.push(`              it.printf(${Math.round(currentX)} + 8, ${centerY}, id(${textFontRef}), ${color}, TextAlign::CENTER_LEFT, "--${unit}");`);
            lines.push(`            }`);
            lines.push(`          }`);
            currentX += spacing;
        }

        if (showHum) {
            const humId = profile.features?.sht4x ? "sht4x_humidity" : (profile.features?.sht3x ? "sht3x_humidity" : "shtc3_humidity");
            lines.push(`          {`);
            lines.push(`            it.printf(${Math.round(currentX)} - 12, ${centerY}, id(${iconFontRef}), ${color}, TextAlign::CENTER_LEFT, "\\U000F058E");`);
            lines.push(`            if (id(${humId}).has_state()) it.printf(${Math.round(currentX)} + 8, ${centerY}, id(${textFontRef}), ${color}, TextAlign::CENTER_LEFT, "%.0f%%", id(${humId}).state);`);
            lines.push(`            else it.printf(${Math.round(currentX)} + 8, ${centerY}, id(${textFontRef}), ${color}, TextAlign::CENTER_LEFT, "--%%");`);
            lines.push(`          }`);
            currentX += spacing;
        }

        if (showBat) {
            lines.push(`          {`);
            lines.push(`            const char* bat_icon = "\\U000F0082";`);
            lines.push(`            float lvl = id(battery_level).state;`);
            lines.push(`            if (lvl >= 90) bat_icon = "\\U000F0079";`);
            lines.push(`            else if (lvl >= 50) bat_icon = "\\U000F007E";`);
            lines.push(`            else if (lvl >= 20) bat_icon = "\\U000F007B";`);
            lines.push(`            else bat_icon = "\\U000F0083";`);
            lines.push(`            it.printf(${Math.round(currentX)} - 12, ${centerY}, id(${iconFontRef}), ${color}, TextAlign::CENTER_LEFT, "%s", bat_icon);`);
            lines.push(`            if (id(battery_level).has_state()) it.printf(${Math.round(currentX)} + 8, ${centerY}, id(${textFontRef}), ${color}, TextAlign::CENTER_LEFT, "%.0f%%", id(battery_level).state);`);
            lines.push(`            else it.printf(${Math.round(currentX)} + 8, ${centerY}, id(${textFontRef}), ${color}, TextAlign::CENTER_LEFT, "--%%");`);
            lines.push(`          }`);
        }
    }

    addDitherMask(lines, colorProp, isEpaper, w.x, w.y, w.width, w.height);
    lines.push(`        }`);
    if (cond) lines.push(`        }`);
};

export default {
    id: "template_sensor_bar",
    name: "Sensor Bar",
    category: "Templates",
    defaults: {
        w: 355,
        h: 43,
        show_wifi: true,
        show_temperature: true,
        show_humidity: true,
        show_battery: true,
        show_background: true,
        background_color: "black",
        border_radius: 8,
        color: "white",
        font_size: 14,
        icon_size: 20
    },
    render,
    export: exportDoc
};

