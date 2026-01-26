/**
 * Template Sensor Bar Plugin
 */

const render = (el, widget, { getColorStyle }) => {
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
    let cssColor = getColorStyle(color);
    el.style.overflow = "hidden";

    if (props.show_background) {
        const cssBgColor = getColorStyle(props.background_color || "white");
        el.style.backgroundColor = cssBgColor;
        el.style.borderRadius = (props.border_radius || 8) + "px";

        if (borderWidth > 0) {
            el.style.border = `${borderWidth}px solid ${getColorStyle(props.border_color || "white")}`;
        } else {
            el.style.border = "none";
        }

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
        const state = getEntityState([props.bat_entity, 'battery_level', 'sensor.battery_level']);
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

    const ensureHex = (c) => {
        if (c === "gray" || c === "grey") return "#808080";
        return c;
    };

    const iconSize = parseInt(p.icon_size || 20, 10);
    const fontSize = parseInt(p.font_size || 14, 10);
    const colorProp = ensureHex(p.color || "white");
    const color = getColorConst(colorProp);
    const showWifi = p.show_wifi !== false;
    const showTemp = p.show_temperature !== false;
    const showHum = p.show_humidity !== false;
    const showBat = p.show_battery !== false;
    const showBg = p.show_background !== false;
    const bgColor = getColorConst(ensureHex(p.background_color || "black"));
    const radius = parseInt(p.border_radius || 8, 10);
    const thickness = parseInt(p.border_thickness || 0, 10);
    const borderColor = getColorConst(ensureHex(p.border_color || "white"));

    // Entity IDs
    const wifiId = (p.wifi_entity || "wifi_signal_dbm").replace(/[^a-zA-Z0-9_]/g, "_");
    const batId = (p.bat_entity || (profile.pins?.batteryAdc ? "battery_level" : "")).replace(/[^a-zA-Z0-9_]/g, "_");
    const humId = (p.hum_entity || (profile.features?.sht4x ? "sht4x_humidity" : ((profile.features?.sht3x || profile.features?.sht3xd) ? "sht3x_humidity" : (profile.features?.shtc3 ? "shtc3_humidity" : "")))).replace(/[^a-zA-Z0-9_]/g, "_");
    const tempId = (p.temp_entity || (profile.features?.sht4x ? "sht4x_temperature" : ((profile.features?.sht3x || profile.features?.sht3xd) ? "sht3x_temperature" : (profile.features?.shtc3 ? "shtc3_temperature" : "")))).replace(/[^a-zA-Z0-9_]/g, "_");

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

    // E-ink Smart Contrast: If icons are "gray" and background is "black", use White text for crispness.
    let effectiveColor = color;
    if (isEpaper && (p.color === "gray" || p.color === "grey" || p.color === "#808080" || p.color === "#a0a0a0")) {
        // If background is dark, forcing white text is the standard way to fix unreadable dithered text.
        if (p.background_color === "black" || p.background_color === "#000000") {
            effectiveColor = "COLOR_WHITE";
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
                lines.push(`            if (lvl >= 90) bat_icon = "\\U000F0079";`);
                lines.push(`            else if (lvl >= 50) bat_icon = "\\U000F007E";`);
                lines.push(`            else if (lvl >= 20) bat_icon = "\\U000F007B";`);
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

    const autoRegister = (entityId) => {
        if (!entityId || !entityId.includes(".") || entityId.startsWith("text_sensor.") || entityId.startsWith("binary_sensor.")) return;

        // We let the safety fix handle the sensor generation for HA entities.
        // It will deduplicate and merge triggers automatically.
    };

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
            }
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
    if (p.show_battery !== false) ["F0082", "F0079", "F007E", "F007B", "F0083"].forEach(c => trackIcon(c, iconSize));
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
            const batId = (p.bat_entity || "battery_level").replace(/[^a-zA-Z0-9_]/g, "_");
            let batIconL = '!lambda |-\n';
            batIconL += `              float lvl = id(${batId}).state;\n`;
            batIconL += '              if (lvl >= 90) return "\\U000F0079";\n';
            batIconL += '              else if (lvl >= 50) return "\\U000F007E";\n';
            batIconL += '              else if (lvl >= 20) return "\\U000F007B";\n';
            batIconL += '              else return "\\U000F0083";';

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
