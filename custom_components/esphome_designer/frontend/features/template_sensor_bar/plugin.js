/**
 * Template Sensor Bar Plugin
 */

const render = (el, widget, { getColorStyle, isDark }) => {
    const props = widget.props || {};
    const color = props.color || "black";
    const iconSize = props.icon_size || 20;
    const fontSize = props.font_size || 14;
    const borderWidth = props.border_thickness || 0;

    el.style.display = "flex";
    el.style.alignItems = "center";
    el.style.justifyContent = "space-around";
    el.style.padding = "0 10px";
    el.style.boxSizing = "border-box";

    const getDynamicColorRender = (c) => {
        if (c === "theme_auto") return isDark ? "#ffffff" : "#000000";
        if (c === "white" || c === "#ffffff") return isDark ? "#000000" : "#ffffff"; // White becomes Black in Dark Mode (Background)
        if (c === "black" || c === "#000000") return isDark ? "#ffffff" : "#000000"; // Black becomes White in Dark Mode (Text)
        return getColorStyle(c);
    };

    // Helper: We need to distinguish between Background usage (White->Black) and Text usage (Black->White)
    // BUT, the YAML logic was:
    // White -> color_off (Bg)
    // Black -> color_on (Text)

    // So for Background Propertys:
    const getBgColorRender = (c) => {
        if (c === "white" || c === "#ffffff") return isDark ? "#000000" : "#ffffff";
        if (c === "black" || c === "#000000") return isDark ? "#ffffff" : "#000000"; // Rare but possible
        return getColorStyle(c);
    };

    // For Text/Icon Propertys:
    const getTextColorRender = (c) => {
        if (c === "black" || c === "#000000") return isDark ? "#ffffff" : "#000000";
        if (c === "white" || c === "#ffffff") return isDark ? "#000000" : "#ffffff";
        return getColorStyle(c);
    };

    el.style.display = "flex";
    el.style.alignItems = "center";
    el.style.justifyContent = "space-around";
    el.style.padding = "0 10px";
    el.style.boxSizing = "border-box";

    // Main Text Color
    let cssColor = getTextColorRender(color);
    el.style.overflow = "hidden";

    if (props.show_background) {
        let cssBgColor = getBgColorRender(props.background_color || "white");

        // Special Case: widget defaults say bg="black", color="white". 
        // If user left defaults:
        // Bg "black" -> Dark Mode -> White? No, that would be a flashbang.
        // Wait, the default "black" background on the sensor bar is meant to be a "Dark Pill".
        // In Dark Mode (Black Page), a Dark Pill is invisible.
        // So usually in Dark Mode, we want a White/Light Pill? Or an Outlined Pill?
        // E-Paper usually inverts.
        // Let's stick to the literal inversion:
        // Bg Black -> Bg White.
        // Text White -> Text Black.
        // This maintains contrast.

        el.style.backgroundColor = cssBgColor;
        el.style.borderRadius = (props.border_radius || 8) + "px";

        if (borderWidth > 0) {
            el.style.border = `${borderWidth}px solid ${getBgColorRender(props.border_color || "white")}`;
        } else {
            el.style.border = "none";
        }

        if (!props.background_color || props.background_color === "transparent") {
            el.style.border = "1px dashed #444"; // Visual aid for transparent
        }
    } else {
        el.style.backgroundColor = "transparent";
        el.style.borderRadius = "0";
        el.style.border = "none";
    }

    el.style.color = cssColor;

    const getEntityState = (possibleIds) => {
        if (!window.AppState || !window.AppState.entityStates) return null;
        for (const id of possibleIds) {
            if (id && window.AppState.entityStates[id]) return window.AppState.entityStates[id].state;
        }
        return null;
    };

    const sensors = [];

    if (props.show_wifi) {
        const state = getEntityState([props.wifi_entity, 'wifi_signal_dbm', 'sensor.wifi_signal']);
        sensors.push({
            type: 'wifi',
            icon: 'F0928',
            val: state !== null ? Math.round(state) + 'dB' : '-65dB'
        });
    }

    if (props.show_temperature) {
        const state = getEntityState([props.temp_entity, 'sht4x_temperature', 'sht3x_temperature', 'shtc3_temperature', 'sensor.temperature']);
        const unit = props.temp_unit || "°C";
        let tempVal = state !== null ? parseFloat(state) : 23.5;
        if (unit === "°F") {
            tempVal = (tempVal * 9 / 5) + 32;
        }
        sensors.push({
            type: 'temp',
            icon: 'F050F',
            val: tempVal.toFixed(1) + unit
        });
    }

    if (props.show_humidity) {
        const state = getEntityState([props.hum_entity, 'sht4x_humidity', 'shtc3_humidity', 'sensor.humidity']);
        sensors.push({
            type: 'hum',
            icon: 'F058E',
            val: state !== null ? Math.round(state) + '%' : '45%'
        });
    }

    if (props.show_battery) {
        const isLocal = !!props.bat_is_local;
        const state = getEntityState(isLocal ? ['battery_level'] : [props.bat_entity, 'battery_level', 'sensor.battery_level']);
        const batteryLevel = state !== null ? parseFloat(state) : 85;

        // Dynamic Battery Icon Logic
        let batIcon = 'F0079'; // battery (full)
        if (batteryLevel >= 95) batIcon = "F0079";
        else if (batteryLevel >= 85) batIcon = "F0082"; // battery-90
        else if (batteryLevel >= 75) batIcon = "F0081"; // battery-80
        else if (batteryLevel >= 65) batIcon = "F0080"; // battery-70
        else if (batteryLevel >= 55) batIcon = "F007F"; // battery-60
        else if (batteryLevel >= 45) batIcon = "F007E"; // battery-50
        else if (batteryLevel >= 35) batIcon = "F007D"; // battery-40
        else if (batteryLevel >= 25) batIcon = "F007C"; // battery-30
        else if (batteryLevel >= 15) batIcon = "F007B"; // battery-20
        else if (batteryLevel >= 5) batIcon = "F007A";  // battery-10
        else batIcon = "F0083";                      // battery-alert

        sensors.push({
            type: 'bat',
            icon: batIcon,
            val: Math.round(batteryLevel) + '%'
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

    const ensureHex = (c) => {
        if (c === "gray" || c === "grey") return "#808080";
        return c;
    };

    const iconSize = parseInt(p.icon_size || 20, 10);
    const fontSize = parseInt(p.font_size || 14, 10);
    const colorProp = ensureHex(p.color || "white");

    // DYNAMIC COLOR LOGIC:
    // If color is "white" (default text), use color_on (White in Light, Black in Dark? No, wait.)
    // Standard ESPHome Dark Mode:
    //  - Background: Black (color_off)
    //  - Text/Foreground: White (color_on)
    // Light Mode:
    //  - Background: White (color_off)
    //  - Text/Foreground: Black (color_on)

    // So:
    //  - "black" -> usually text -> color_on
    //  - "white" -> usually background -> color_off
    // But defaults are inverted for e-paper compared to LCD usually.
    // Let's stick to the user's explicit choice unless it's the DEFAULT.

    // For Sensor Bar:
    // Default background is "black". In Dark Mode (inverted), black background becomes white? 
    // No, Dark Mode usually means White Text on Black Background.
    // Light Mode means Black Text on White Background.

    // The previous code was:
    // const COLOR_WHITE = Color(255, 255, 255);
    // const COLOR_BLACK = Color(0, 0, 0);
    // auto color_off = COLOR_WHITE; // Background
    // auto color_on = COLOR_BLACK;  // Text

    // In Dark Mode:
    // color_off = COLOR_BLACK;
    // color_on = COLOR_WHITE;

    // Current Widget Defaults:
    // background_color: "black"
    // color: "white"

    // This implies the widget is ALREADY designed for Dark Mode (White on Black).
    // If the global theme is Light (Black on White), this widget looks like a dark pill.
    // If the global theme is Dark (White on Black), this widget looks like a dark pill (same).

    // ISSUE: The user says "white icons on white background".
    // This implies that while the background became White (maybe?), the icons stayed White.

    // Let's look at the generated YAML in the user request:
    // it.fill(COLOR_BLACK);  <-- Page Background is Black
    // color_off = COLOR_BLACK;
    // color_on = COLOR_WHITE;

    // Widget YAML:
    // draw_filled_rrect(..., COLOR_WHITE); <-- Background is forced WHITE!

    // Why? 
    // Because p.background_color defaults to "black". 
    // And getColorConst("black") -> COLOR_BLACK?
    // Wait, let's check the code:
    // const bgColor = getColorConst(ensureHex(p.background_color || "black"));

    // If p.background_color is "white" (user selected white?), it returns COLOR_WHITE.
    // If p.background_color is "black", it returns COLOR_BLACK.

    // The user's widget has: bg_color:white
    // So they explicitly set it to white.
    // But they want it to invert in Dark Mode?

    // If they set it to "Theme Auto" (if that exists?), it should be `color_off`.
    // The widget defaults say: background_color: "black".

    // If the user wants dynamic adaptation, they should probably map:
    // "white" -> color_off (Background)

    const getDynamicColor = (c) => {
        if (c === "white" || c === "#ffffff") return "color_off"; // Background (White/Black)
        if (c === "black" || c === "#000000") return "color_on";  // Text (Black/White)
        if (c === "transparent") return "color_off"; // Fallback to bg?
        return getColorConst(c);
    };

    const color = getDynamicColor(colorProp);
    const showWifi = p.show_wifi !== false;
    const showTemp = p.show_temperature !== false;
    const showHum = p.show_humidity !== false;
    const showBat = p.show_battery !== false;
    const showBg = p.show_background !== false;
    const bgColor = getDynamicColor(ensureHex(p.background_color || "black"));
    const radius = parseInt(p.border_radius || 8, 10);
    const thickness = parseInt(p.border_thickness || 0, 10);
    const borderColor = getDynamicColor(ensureHex(p.border_color || "white"));

    // Entity IDs
    const wifiId = ((p.wifi_is_local ? "wifi_signal_dbm" : p.wifi_entity) || "wifi_signal_dbm").replace(/[^a-zA-Z0-9_]/g, "_");
    const batId = ((p.bat_is_local ? "battery_level" : p.bat_entity) || (profile.pins?.batteryAdc ? "battery_level" : "")).replace(/[^a-zA-Z0-9_]/g, "_");
    const humId = ((p.hum_is_local ? (profile.features?.sht4x ? "sht4x_humidity" : ((profile.features?.sht3x || profile.features?.sht3xd) ? "sht3x_humidity" : (profile.features?.shtc3 ? "shtc3_humidity" : ""))) : p.hum_entity) || (profile.features?.sht4x ? "sht4x_humidity" : ((profile.features?.sht3x || profile.features?.sht3xd) ? "sht3x_humidity" : (profile.features?.shtc3 ? "shtc3_humidity" : "")))).replace(/[^a-zA-Z0-9_]/g, "_");
    const tempId = ((p.temp_is_local ? (profile.features?.sht4x ? "sht4x_temperature" : ((profile.features?.sht3x || profile.features?.sht3xd) ? "sht3x_temperature" : (profile.features?.shtc3 ? "shtc3_temperature" : ""))) : p.temp_entity) || (profile.features?.sht4x ? "sht4x_temperature" : ((profile.features?.sht3x || profile.features?.sht3xd) ? "sht3x_temperature" : (profile.features?.shtc3 ? "shtc3_temperature" : "")))).replace(/[^a-zA-Z0-9_]/g, "_");

    const iconFontRef = addFont("Material Design Icons", 400, iconSize);
    const textFontRef = addFont("Roboto", 400, fontSize);

    lines.push(`        // widget:template_sensor_bar id:${w.id} type:template_sensor_bar x:${w.x} y:${w.y} w:${w.width} h:${w.height} wifi:${showWifi} temp:${showTemp} hum:${showHum} bat:${showBat} bg:${showBg} bg_color:${p.background_color || "black"} radius:${radius} border:${thickness} icon_size:${iconSize} font_size:${fontSize} color:${colorProp} wifi_ent:"${p.wifi_entity || ""}" temp_ent:"${p.temp_entity || ""}" temp_unit:${p.temp_unit || "°C"} hum_ent:"${p.hum_entity || ""}" bat_ent:"${p.bat_entity || ""}" ${getCondProps(w)}`);

    const cond = getConditionCheck(w);
    if (cond) lines.push(`        ${cond}`);

    lines.push(`        {`);
    if (showBg) {
        // Layering Strategy for E-ink:
        // 1. Dither the entire footprint if border color is gray (Layer 1)
        // 2. Draw inner solid box (Layer 2)
        // 3. Draw icons in white for contrast (Layer 3)

        if (radius > 0) {
            lines.push(`          auto draw_filled_rrect = [&](int x, int y, int w, int h, int r, auto c) {`);
            lines.push(`            it.filled_rectangle(x + r, y, w - 2 * r, h, c);`);
            lines.push(`            it.filled_rectangle(x, y + r, r, h - 2 * r, c);`);
            lines.push(`            it.filled_rectangle(x + w - r, y + r, r, h - 2 * r, c);`);
            lines.push(`            it.filled_circle(x + r, y + r, r, c);`);
            lines.push(`            it.filled_circle(x + w - r - 1, y + r, r, c);`);
            lines.push(`            it.filled_circle(x + r, y + h - r - 1, r, c);`);
            lines.push(`            it.filled_circle(x + w - r - 1, y + h - r - 1, r, c);`);
            lines.push(`          };`);

            if (thickness > 0) {
                // Layer 1: Border footprint
                lines.push(`          draw_filled_rrect(${w.x}, ${w.y}, ${w.width}, ${w.height}, ${radius}, ${borderColor});`);
                addDitherMask(lines, p.border_color || "white", isEpaper, w.x, w.y, w.width, w.height, radius);

                // Layer 2: Inner Dark Box
                lines.push(`          draw_filled_rrect(${w.x + thickness}, ${w.y + thickness}, ${w.width - 2 * thickness}, ${w.height - 2 * thickness}, ${Math.max(0, radius - thickness)}, ${bgColor});`);
                // Note: No dither mask for inner box yet if it's solid black
                if (ensureHex(p.background_color) !== "black" && ensureHex(p.background_color) !== "#000000") {
                    addDitherMask(lines, p.background_color || "black", isEpaper, w.x + thickness, w.y + thickness, w.width - 2 * thickness, w.height - 2 * thickness, Math.max(0, radius - thickness));
                }
            } else {
                lines.push(`          draw_filled_rrect(${w.x}, ${w.y}, ${w.width}, ${w.height}, ${radius}, ${bgColor});`);
                addDitherMask(lines, p.background_color || "black", isEpaper, w.x, w.y, w.width, w.height, radius);
            }
        } else {
            if (thickness > 0) {
                lines.push(`          it.filled_rectangle(${w.x}, ${w.y}, ${w.width}, ${w.height}, ${borderColor});`);
                addDitherMask(lines, p.border_color || "white", isEpaper, w.x, w.y, w.width, w.height, 0);
                lines.push(`          it.filled_rectangle(${w.x + thickness}, ${w.y + thickness}, ${w.width - 2 * thickness}, ${w.height - 2 * thickness}, ${bgColor});`);
                if (ensureHex(p.background_color) !== "black" && ensureHex(p.background_color) !== "#000000") {
                    addDitherMask(lines, p.background_color || "black", isEpaper, w.x + thickness, w.y + thickness, w.width - 2 * thickness, w.height - 2 * thickness, 0);
                }
            } else {
                lines.push(`          it.filled_rectangle(${w.x}, ${w.y}, ${w.width}, ${w.height}, ${bgColor});`);
                addDitherMask(lines, p.background_color || "black", isEpaper, w.x, w.y, w.width, w.height, 0);
            }
        }
    } else if (thickness > 0) {
        addDitherMask(lines, p.border_color || "white", isEpaper, w.x, w.y, w.width, w.height, radius);
    }

    // E-ink Smart Contrast:
    let effectiveColor = color;
    if (isEpaper && (p.color === "gray" || p.color === "grey" || p.color === "#808080" || p.color === "#a0a0a0")) {
        // If background is dark, forcing white text is the standard way to fix unreadable dithered text.
        if (p.background_color === "black" || p.background_color === "#000000") {
            effectiveColor = "color_on"; // Use dynamic foreground, usually White in Dark mode
        }
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

        const idExists = (id) => (context.seenSensorIds && context.seenSensorIds.has(id)) ||
            (id === "battery_level" && context.profile?.pins?.batteryAdc);

        if (showWifi) {
            lines.push(`          {`);
            lines.push(`            const char* wifi_icon = "\\U000F092B";`);
            if (wifiId && idExists(wifiId)) {
                lines.push(`            if (id(${wifiId}).has_state()) {`);
                lines.push(`              float sig = id(${wifiId}).state;`);
                lines.push(`              if (sig >= -50) wifi_icon = "\\U000F0928";`);
                lines.push(`              else if (sig >= -70) wifi_icon = "\\U000F0925";`);
                lines.push(`              else if (sig >= -85) wifi_icon = "\\U000F0922";`);
                lines.push(`              else wifi_icon = "\\U000F091F";`);
                lines.push(`            }`);
            }
            lines.push(`            it.printf(${Math.round(currentX)} - 4, ${Math.round(centerY)}, id(${iconFontRef}), ${effectiveColor}, TextAlign::CENTER_RIGHT, "%s", wifi_icon);`);
            if (wifiId && idExists(wifiId)) {
                lines.push(`            if (id(${wifiId}).has_state()) it.printf(${Math.round(currentX)} + 4, ${Math.round(centerY)}, id(${textFontRef}), ${effectiveColor}, TextAlign::CENTER_LEFT, "%.0fdB", id(${wifiId}).state);`);
                lines.push(`            else it.printf(${Math.round(currentX)} + 4, ${Math.round(centerY)}, id(${textFontRef}), ${effectiveColor}, TextAlign::CENTER_LEFT, "--dB");`);
            } else {
                lines.push(`            it.printf(${Math.round(currentX)} + 4, ${Math.round(centerY)}, id(${textFontRef}), ${effectiveColor}, TextAlign::CENTER_LEFT, "--dB");`);
            }
            lines.push(`          }`);
            currentX += spacing;
        }

        if (showTemp) {
            const unit = p.temp_unit || "°C";
            lines.push(`          {`);
            lines.push(`            it.printf(${Math.round(currentX)} - 4, ${Math.round(centerY)}, id(${iconFontRef}), ${effectiveColor}, TextAlign::CENTER_RIGHT, "%s", "\\U000F050F");`);
            if (tempId && idExists(tempId)) {
                lines.push(`            if (id(${tempId}).has_state() && !std::isnan(id(${tempId}).state)) {`);
                if (unit === "°F" || unit === "F") {
                    lines.push(`              it.printf(${Math.round(currentX)} + 4, ${Math.round(centerY)}, id(${textFontRef}), ${effectiveColor}, TextAlign::CENTER_LEFT, "%.1f°F", id(${tempId}).state * 9.0 / 5.0 + 32.0);`);
                } else {
                    lines.push(`              it.printf(${Math.round(currentX)} + 4, ${Math.round(centerY)}, id(${textFontRef}), ${effectiveColor}, TextAlign::CENTER_LEFT, "%.1f°C", id(${tempId}).state);`);
                }
                lines.push(`            } else {`);
                lines.push(`              it.printf(${Math.round(currentX)} + 4, ${Math.round(centerY)}, id(${textFontRef}), ${effectiveColor}, TextAlign::CENTER_LEFT, "--${unit}");`);
                lines.push(`            }`);
            } else {
                lines.push(`            it.printf(${Math.round(currentX)} + 4, ${Math.round(centerY)}, id(${textFontRef}), ${effectiveColor}, TextAlign::CENTER_LEFT, "--${unit}");`);
            }
            lines.push(`          }`);
            currentX += spacing;
        }

        if (showHum) {
            lines.push(`          {`);
            lines.push(`            it.printf(${Math.round(currentX)} - 4, ${Math.round(centerY)}, id(${iconFontRef}), ${effectiveColor}, TextAlign::CENTER_RIGHT, "%s", "\\U000F058E");`);
            if (humId && idExists(humId)) {
                lines.push(`            if (id(${humId}).has_state()) it.printf(${Math.round(currentX)} + 4, ${Math.round(centerY)}, id(${textFontRef}), ${effectiveColor}, TextAlign::CENTER_LEFT, "%.0f%%", id(${humId}).state);`);
                lines.push(`            else it.printf(${Math.round(currentX)} + 4, ${Math.round(centerY)}, id(${textFontRef}), ${effectiveColor}, TextAlign::CENTER_LEFT, "--%%");`);
            } else {
                lines.push(`            it.printf(${Math.round(currentX)} + 4, ${Math.round(centerY)}, id(${textFontRef}), ${effectiveColor}, TextAlign::CENTER_LEFT, "--%%");`);
            }
            lines.push(`          }`);
            currentX += spacing;
        }

        if (showBat) {
            lines.push(`          {`);
            lines.push(`            const char* bat_icon = "\\U000F0082";`);
            let hasRealBat = batId && idExists(batId);
            if (hasRealBat) {
                lines.push(`            float lvl = id(${batId}).state;`);
                lines.push(`            if (lvl >= 95) bat_icon = "\\U000F0079";`);
                lines.push(`            else if (lvl >= 85) bat_icon = "\\U000F0082";`);
                lines.push(`            else if (lvl >= 75) bat_icon = "\\U000F0081";`);
                lines.push(`            else if (lvl >= 65) bat_icon = "\\U000F0080";`);
                lines.push(`            else if (lvl >= 55) bat_icon = "\\U000F007F";`);
                lines.push(`            else if (lvl >= 45) bat_icon = "\\U000F007E";`);
                lines.push(`            else if (lvl >= 35) bat_icon = "\\U000F007D";`);
                lines.push(`            else if (lvl >= 25) bat_icon = "\\U000F007C";`);
                lines.push(`            else if (lvl >= 15) bat_icon = "\\U000F007B";`);
                lines.push(`            else if (lvl >= 5) bat_icon = "\\U000F007A";`);
                lines.push(`            else bat_icon = "\\U000F0083";`);
                lines.push(`            it.printf(${Math.round(currentX)} - 4, ${Math.round(centerY)}, id(${iconFontRef}), ${effectiveColor}, TextAlign::CENTER_RIGHT, "%s", bat_icon);`);
                lines.push(`            if (id(${batId}).has_state()) it.printf(${Math.round(currentX)} + 4, ${Math.round(centerY)}, id(${textFontRef}), ${effectiveColor}, TextAlign::CENTER_LEFT, "%.0f%%", id(${batId}).state);`);
                lines.push(`            else it.printf(${Math.round(currentX)} + 4, ${Math.round(centerY)}, id(${textFontRef}), ${effectiveColor}, TextAlign::CENTER_LEFT, "--%%");`);
            } else {
                lines.push(`            it.printf(${Math.round(currentX)} - 4, ${Math.round(centerY)}, id(${iconFontRef}), ${effectiveColor}, TextAlign::CENTER_RIGHT, "%s", bat_icon);`);
                lines.push(`            it.printf(${Math.round(currentX)} + 4, ${Math.round(centerY)}, id(${textFontRef}), ${effectiveColor}, TextAlign::CENTER_LEFT, "--%%");`);
            }
            lines.push(`          }`);
        }
    }


    lines.push(`        }`);
    if (cond) lines.push(`        }`);
};

const onExportNumericSensors = (context) => {
    const { lines, widgets, isLvgl, pendingTriggers, profile } = context;
    const barWidgets = widgets.filter(w => w.type === "template_sensor_bar");
    if (barWidgets.length === 0) return;


    barWidgets.forEach(w => {
        const p = w.props || {};
        const checkLines = context.mainLines || lines;

        const addTrigger = (eid) => {
            if (!eid || !isLvgl || !pendingTriggers) return;
            if (!pendingTriggers.has(eid)) pendingTriggers.set(eid, new Set());
            pendingTriggers.get(eid).add(`- lvgl.widget.refresh: ${w.id}`);
        };

        if (p.show_wifi !== false) {
            let eid = p.wifi_entity || "wifi_signal_dbm";
            if (eid.includes(".") && !eid.startsWith("text_sensor.")) {
                if (!eid.includes(".")) eid = `sensor.${eid}`;
            }
            addTrigger(eid);

            if (!p.wifi_entity) {
                const alreadyDefined = (context.seenSensorIds && context.seenSensorIds.has("wifi_signal_dbm"));
                if (!alreadyDefined && !checkLines.some(l => l.includes("id: wifi_signal_dbm")) && !lines.some(l => l.includes("id: wifi_signal_dbm"))) {
                    if (context.seenSensorIds) context.seenSensorIds.add("wifi_signal_dbm");
                    lines.push("- platform: wifi_signal", "  id: wifi_signal_dbm", "  internal: true");
                }
            } else if (p.wifi_entity.includes(".")) {
                // Register HA WiFi sensor
                const safeId = p.wifi_entity.replace(/[^a-zA-Z0-9_]/g, "_");
                if (context.seenSensorIds && !context.seenSensorIds.has(safeId)) {
                    context.seenSensorIds.add(safeId);
                    lines.push("- platform: homeassistant", `  id: ${safeId}`, `  entity_id: ${p.wifi_entity}`, "  internal: true");
                }
            }
        }

        const registerHaSensor = (eid) => {
            if (!eid || !eid.includes(".") || eid.startsWith("text_sensor.") || eid.startsWith("binary_sensor.")) return;
            const safeId = eid.replace(/[^a-zA-Z0-9_]/g, "_");
            if (context.seenSensorIds && !context.seenSensorIds.has(safeId)) {
                context.seenSensorIds.add(safeId);
                lines.push("- platform: homeassistant", `  id: ${safeId}`, `  entity_id: ${eid}`, "  internal: true");
            }
        };

        if (p.show_temperature !== false && p.temp_entity && !p.temp_is_local) {
            let eid = p.temp_entity;
            if (!eid.includes(".")) eid = `sensor.${eid}`;
            registerHaSensor(eid);
            addTrigger(eid);
        }

        if (p.show_humidity !== false && p.hum_entity && !p.hum_is_local) {
            let eid = p.hum_entity;
            if (!eid.includes(".")) eid = `sensor.${eid}`;
            registerHaSensor(eid);
            addTrigger(eid);
        }

        if (p.show_battery !== false && p.bat_entity && !p.bat_is_local) {
            let eid = p.bat_entity;
            if (!eid.includes(".")) eid = `sensor.${eid}`;
            registerHaSensor(eid);
            addTrigger(eid);
        }
    });

    // NOTE: SHT and Battery sensors are now handled primarily by the hardware_generators.js
    // shared core, so we only need to ensure the wifi_signal_dbm (which is misc) is present.
};

const collectRequirements = (widget, context) => {
    const { trackIcon, addFont } = context;
    const p = widget.props || {};
    const iconSize = parseInt(p.icon_size || 20, 10);
    const fontSize = parseInt(p.font_size || 14, 10);

    addFont("Material Design Icons", 400, iconSize);
    addFont("Material Design Icons", 400, iconSize);
    addFont("Roboto", 400, fontSize);

    if (p.show_wifi !== false) ["F092B", "F091F", "F0922", "F0925", "F0928"].forEach(c => trackIcon(c, iconSize));
    if (p.show_temperature !== false) ["F050F"].forEach(c => trackIcon(c, iconSize));
    if (p.show_humidity !== false) ["F058E"].forEach(c => trackIcon(c, iconSize));
    if (p.show_battery !== false) ["F0079", "F0082", "F0081", "F0080", "F007F", "F007E", "F007D", "F007C", "F007B", "F007A", "F0083"].forEach(c => trackIcon(c, iconSize));
};

export default {
    id: "template_sensor_bar",
    name: "Sensor Bar",
    category: "Templates",
    // CRITICAL ARCHITECTURAL NOTE: OEPL and OpenDisplay are excluded because this 
    // template aggregates multiple sensors and handles complex layouting not 
    // supported in protocol-based rendering.
    supportedModes: ['lvgl', 'direct'],
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
        icon_size: 20,
        temp_unit: "°C"
    },
    render,
    exportLVGL: (w, { common, convertColor, getLVGLFont, profile }) => {
        const p = w.props || {};

        // Helper to ensure colors are valid Hex
        const ensureHex = (c) => {
            if (c === "gray" || c === "grey") return "#808080";
            // Add other named color mappings if needed, or rely on convertColor for hex
            return c;
        };

        const color = convertColor(ensureHex(p.color || "white"));
        const iconSize = parseInt(p.icon_size || 20, 10);
        const fontSize = parseInt(p.font_size || 14, 10);
        const showWifi = p.show_wifi !== false;
        const showTemp = p.show_temperature !== false;
        const showHum = p.show_humidity !== false;
        const showBat = p.show_battery !== false;

        const iconFont = getLVGLFont("Material Design Icons", iconSize, 400);
        const textFont = getLVGLFont("Roboto", fontSize, 400);

        const widgets = [];

        if (showWifi) {
            let iconL = '!lambda |-\n';
            iconL += '              if (id(wifi_signal_dbm).has_state()) {\n';
            iconL += '                float sig = id(wifi_signal_dbm).state;\n';
            iconL += '                if (sig >= -50) return "\\U000F0928";\n';
            iconL += '                else if (sig >= -70) return "\\U000F0925";\n';
            iconL += '                else if (sig >= -85) return "\\U000F0922";\n';
            iconL += '                else return "\\U000F091F";\n';
            iconL += '              }\n';
            iconL += '              return "\\U000F092B";';

            widgets.push({
                obj: {
                    width: "SIZE_CONTENT", height: "SIZE_CONTENT", bg_opa: "transp", border_width: 0,
                    layout: { type: "flex", flex_flow: "row", flex_align_main: "center", flex_align_cross: "center" },
                    pad_all: 0, widgets: [
                        { label: { text: iconL, text_font: iconFont, text_color: color } },
                        { label: { text: '!lambda "return id(wifi_signal_dbm).has_state() ? str_sprintf(\'%.0fdB\', id(wifi_signal_dbm).state).c_str() : \'--dB\';"', text_font: textFont, text_color: color, x: 4 } }
                    ]
                }
            });
        }

        if (showTemp) {
            const tempId = (p.temp_entity || (profile.features?.sht4x ? "sht4x_temperature" : ((profile.features?.sht3x || profile.features?.sht3xd) ? "sht3x_temperature" : "shtc3_temperature"))).replace(/[^a-zA-Z0-9_]/g, "_");
            const unit = p.temp_unit || "°C";
            let tempExpr = `id(${tempId}).state`;
            if (unit === "°F") tempExpr = `(id(${tempId}).state * 9.0 / 5.0 + 32.0)`;

            widgets.push({
                obj: {
                    width: "SIZE_CONTENT", height: "SIZE_CONTENT", bg_opa: "transp", border_width: 0,
                    layout: { type: "flex", flex_flow: "row", flex_align_main: "center", flex_align_cross: "center" },
                    pad_all: 0, widgets: [
                        { label: { text: '"\\U000F050F"', text_font: iconFont, text_color: color } },
                        { label: { text: `!lambda "if (id(${tempId}).has_state()) { return str_sprintf(\'%.1f${unit}\', ${tempExpr}).c_str(); } return \'--${unit}\';"`, text_font: textFont, text_color: color, x: 4 } }
                    ]
                }
            });
        }

        if (showHum) {
            const humId = (p.hum_entity || (profile.features?.sht4x ? "sht4x_humidity" : ((profile.features?.sht3x || profile.features?.sht3xd) ? "sht3x_humidity" : "shtc3_humidity"))).replace(/[^a-zA-Z0-9_]/g, "_");
            widgets.push({
                obj: {
                    width: "SIZE_CONTENT", height: "SIZE_CONTENT", bg_opa: "transp", border_width: 0,
                    layout: { type: "flex", flex_flow: "row", flex_align_main: "center", flex_align_cross: "center" },
                    pad_all: 0, widgets: [
                        { label: { text: '"\\U000F058E"', text_font: iconFont, text_color: color } },
                        { label: { text: `!lambda "if (id(${humId}).has_state()) { return str_sprintf(\'%.0f%%\', id(${humId}).state).c_str(); } return \'--%\';"`, text_font: textFont, text_color: color, x: 4 } }
                    ]
                }
            });
        }

        if (showBat) {
            const batId = ((p.bat_is_local ? "battery_level" : p.bat_entity) || "battery_level").replace(/[^a-zA-Z0-9_]/g, "_");
            let batIconL = '!lambda |-\n';
            batIconL += `              if (id(${batId}).has_state()) {\n`;
            batIconL += `                float lvl = id(${batId}).state;\n`;
            batIconL += '                if (lvl >= 95) return "\\U000F0079";\n';
            batIconL += '                else if (lvl >= 85) return "\\U000F0082";\n';
            batIconL += '                else if (lvl >= 75) return "\\U000F0081";\n';
            batIconL += '                else if (lvl >= 65) return "\\U000F0080";\n';
            batIconL += '                else if (lvl >= 55) return "\\U000F007F";\n';
            batIconL += '                else if (lvl >= 45) return "\\U000F007E";\n';
            batIconL += '                else if (lvl >= 35) return "\\U000F007D";\n';
            batIconL += '                else if (lvl >= 25) return "\\U000F007C";\n';
            batIconL += '                else if (lvl >= 15) return "\\U000F007B";\n';
            batIconL += '                else if (lvl >= 5) return "\\U000F007A";\n';
            batIconL += '                else return "\\U000F0083";\n';
            batIconL += '              }\n';
            batIconL += '              return "\\U000F0082";';

            widgets.push({
                obj: {
                    width: "SIZE_CONTENT", height: "SIZE_CONTENT", bg_opa: "transp", border_width: 0,
                    layout: { type: "flex", flex_flow: "row", flex_align_main: "center", flex_align_cross: "center" },
                    pad_all: 0, widgets: [
                        { label: { text: batIconL, text_font: iconFont, text_color: color } },
                        { label: { text: `!lambda "return id(${batId}).has_state() ? str_sprintf(\'%.0f%%\', id(${batId}).state).c_str() : \'--%\';"`, text_font: textFont, text_color: color, x: 4 } }
                    ]
                }
            });
        }

        return {
            obj: {
                ...common,
                bg_color: p.show_background !== false ? convertColor(ensureHex(p.background_color || "black")) : "transp",
                bg_opa: p.show_background !== false ? "cover" : "transp",
                radius: p.border_radius || 8,
                clip_corner: true,
                border_width: p.border_thickness || 0,
                border_color: convertColor(ensureHex(p.border_color || "white")),
                layout: { type: "flex", flex_flow: "row", flex_align_main: "space_around", flex_align_cross: "center" },
                widgets: widgets
            }
        };
    },
    export: exportDoc,
    onExportNumericSensors,
    collectRequirements
};
