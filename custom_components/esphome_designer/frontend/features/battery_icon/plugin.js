/**
 * Battery Icon Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    let iconCode = "F0079"; // Default full battery
    let size = props.size || 24;
    const color = props.color || "black";

    let batteryLevel = 75; // Default preview

    if (props.fit_icon_to_frame) {
        const padding = 4;
        const maxDim = Math.max(8, Math.min((widget.width || 0) - padding * 2, (widget.height || 0) - padding * 2));
        size = Math.round(maxDim);
    }

    if (window.AppState && window.AppState.entityStates && widget.entity_id) {
        const stateObj = window.AppState.entityStates[widget.entity_id];
        if (stateObj && stateObj.state !== undefined) {
            const val = parseFloat(stateObj.state);
            if (!isNaN(val)) {
                batteryLevel = val;
            }
        }
    }

    // Icon Logic
    if (batteryLevel >= 95) iconCode = "F0079";      // battery (full)
    else if (batteryLevel >= 85) iconCode = "F0082"; // battery-90
    else if (batteryLevel >= 75) iconCode = "F0081"; // battery-80
    else if (batteryLevel >= 65) iconCode = "F0080"; // battery-70
    else if (batteryLevel >= 55) iconCode = "F007F"; // battery-60
    else if (batteryLevel >= 45) iconCode = "F007E"; // battery-50
    else if (batteryLevel >= 35) iconCode = "F007D"; // battery-40
    else if (batteryLevel >= 25) iconCode = "F007C"; // battery-30
    else if (batteryLevel >= 15) iconCode = "F007B"; // battery-20
    else if (batteryLevel >= 5) iconCode = "F007A";  // battery-10
    else iconCode = "F0083";                      // battery-alert (critical)

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
    el.style.flexDirection = "column";

    // Battery Percentage Label
    const pctLabel = document.createElement("div");
    pctLabel.style.fontSize = (props.font_size || 12) + "px";
    pctLabel.style.marginTop = "2px";
    pctLabel.textContent = Math.round(batteryLevel) + "%";
    el.appendChild(pctLabel);
};

const exportDoc = (w, context) => {
    const {
        lines, addFont, getColorConst, addDitherMask, getCondProps, getConditionCheck, isEpaper, RECT_Y_OFFSET
    } = context;

    const p = w.props || {};
    const entityId = (w.entity_id || "").trim();
    const size = parseInt(p.size || 24, 10);
    const fontSize = parseInt(p.font_size || 12, 10);
    const colorProp = p.color || "black";
    const color = getColorConst(colorProp);

    const fontRef = addFont("Material Design Icons", 400, size);
    const pctFontRef = addFont("Roboto", 400, fontSize);

    let sensorId;
    if (p.is_local_sensor) {
        sensorId = "battery_level";
    } else {
        // Ensure sensor. prefix if missing (matching onExportNumericSensors logic)
        let normalizedEntityId = entityId;
        if (normalizedEntityId && !normalizedEntityId.includes(".")) {
            normalizedEntityId = `sensor.${normalizedEntityId}`;
        }
        sensorId = normalizedEntityId ? normalizedEntityId.replace(/[^a-zA-Z0-9_]/g, "_") : "battery_level";
    }

    lines.push(`        // widget:battery_icon id:${w.id} type:battery_icon x:${w.x} y:${w.y} w:${w.width} h:${w.height} entity:${entityId || "battery_level"} size:${size} font_size:${fontSize} color:${colorProp} local:${!!p.is_local_sensor} ${getCondProps(w)}`);

    const cond = getConditionCheck(w);
    if (cond) lines.push(`        ${cond}`);

    // Robust Centering:
    // Determine total height of content (Icon + Spacing + Text)
    const spacing = 2;
    const contentHeight = size + spacing + fontSize;
    const paddingY = `(${w.height} - ${contentHeight}) / 2`;

    // X Center: x + w / 2
    const centerX = `${w.x} + ${w.width} / 2`;

    // Y Positions
    const iconY = `${w.y} + ${paddingY}`;
    const textY = `${w.y} + ${paddingY} + ${size} + ${spacing}`;

    lines.push(`        {`);
    lines.push(`          const char* bat_icon = "\\U000F0082"; // Default: battery-90`);
    lines.push(`          float bat_level = 0;`);
    lines.push(`          if (id(${sensorId}).has_state()) {`);
    lines.push(`            bat_level = id(${sensorId}).state;`);
    lines.push(`            if (std::isnan(bat_level)) bat_level = 0;`);
    lines.push(`            if (bat_level >= 95) bat_icon = "\\U000F0079";      // battery (full)`);
    lines.push(`            else if (bat_level >= 85) bat_icon = "\\U000F0082"; // battery-90`);
    lines.push(`            else if (bat_level >= 75) bat_icon = "\\U000F0081"; // battery-80`);
    lines.push(`            else if (bat_level >= 65) bat_icon = "\\U000F0080"; // battery-70`);
    lines.push(`            else if (bat_level >= 55) bat_icon = "\\U000F007F"; // battery-60`);
    lines.push(`            else if (bat_level >= 45) bat_icon = "\\U000F007E"; // battery-50`);
    lines.push(`            else if (bat_level >= 35) bat_icon = "\\U000F007D"; // battery-40`);
    lines.push(`            else if (bat_level >= 25) bat_icon = "\\U000F007C"; // battery-30`);
    lines.push(`            else if (bat_level >= 15) bat_icon = "\\U000F007B"; // battery-20`);
    lines.push(`            else if (bat_level >= 5) bat_icon = "\\U000F007A";  // battery-10`);
    lines.push(`            else bat_icon = "\\U000F0083";                      // battery-alert (critical)`);
    lines.push(`          }`);

    // Icon Centered
    lines.push(`          it.printf(${centerX}, ${iconY}, id(${fontRef}), ${color}, TextAlign::TOP_CENTER, "%s", bat_icon);`);

    // Text Centered
    lines.push(`          it.printf(${centerX}, ${textY}, id(${pctFontRef}), ${color}, TextAlign::TOP_CENTER, "%.0f%%", bat_level);`);

    const ditherY = w.y + (typeof RECT_Y_OFFSET !== 'undefined' ? RECT_Y_OFFSET : 0);
    addDitherMask(lines, colorProp, isEpaper, w.x, ditherY, w.width, w.height);
    lines.push(`        }`);
    if (cond) lines.push(`        }`);
};

export default {
    id: "battery_icon",
    name: "Battery",
    category: "Sensors",
    defaults: {
        width: 60,
        height: 60,
        size: 36,
        font_size: 14,
        color: "black"
    },
    render,
    exportLVGL: (w, { common, convertColor, getLVGLFont, formatOpacity }) => {
        const p = w.props || {};
        let entityId = (w.entity_id || "").trim();
        // Ensure sensor. prefix if missing (matching onExportNumericSensors logic)
        if (entityId && !entityId.includes(".")) {
            entityId = `sensor.${entityId}`;
        }

        const sensorId = p.is_local_sensor ? "battery_level" : (entityId ? entityId.replace(/[^a-zA-Z0-9_]/g, "_") : "battery_level");
        const color = convertColor(p.color || "black");
        const iconSize = parseInt(p.size || 24, 10);
        const fontSize = parseInt(p.font_size || 12, 10);

        let iconLambda = '!lambda |-\n';
        iconLambda += `          if (id(${sensorId}).has_state()) {\n`;
        iconLambda += `            float lvl = id(${sensorId}).state;\n`;
        iconLambda += `            if (lvl >= 95) return "\\U000F0079";\n`;
        iconLambda += `            if (lvl >= 85) return "\\U000F0082";\n`;
        iconLambda += `            if (lvl >= 75) return "\\U000F0081";\n`;
        iconLambda += `            if (lvl >= 65) return "\\U000F0080";\n`;
        iconLambda += `            if (lvl >= 55) return "\\U000F007F";\n`;
        iconLambda += `            if (lvl >= 45) return "\\U000F007E";\n`;
        iconLambda += `            if (lvl >= 35) return "\\U000F007D";\n`;
        iconLambda += `            if (lvl >= 25) return "\\U000F007C";\n`;
        iconLambda += `            if (lvl >= 15) return "\\U000F007B";\n`;
        iconLambda += `            if (lvl >= 5) return "\\U000F007A";\n`;
        iconLambda += `            return "\\U000F0083";\n`;
        iconLambda += '          }\n';
        iconLambda += '          return "\\U000F0083";';

        let textLambda = '!lambda |-\n';
        textLambda += `          if (id(${sensorId}).has_state()) {\n`;
        textLambda += `            return str_sprintf("%.0f%%", id(${sensorId}).state).c_str();\n`;
        textLambda += '          }\n';
        textLambda += '          return "---%";';

        return {
            obj: {
                ...common,
                bg_opa: "transp",
                border_width: 0,
                widgets: [
                    {
                        label: {
                            width: iconSize + 10,
                            height: iconSize + 4,
                            align: "top_mid",
                            text: iconLambda,
                            text_font: getLVGLFont("Material Design Icons", iconSize, 400),
                            text_color: color
                        }
                    },
                    {
                        label: {
                            width: "100%",
                            height: fontSize + 4,
                            align: "bottom_mid",
                            y: 2,
                            text: textLambda,
                            text_font: getLVGLFont("Roboto", fontSize, 400),
                            text_color: color,
                            text_align: "center"
                        }
                    }
                ]
            }
        };
    },
    collectRequirements: (w, context) => {
        const { trackIcon, addFont } = context;
        const p = w.props || {};
        const size = parseInt(p.size || 24, 10);
        const fontSize = parseInt(p.font_size || 12, 10);

        addFont("Material Design Icons", 400, size);
        addFont("Roboto", 400, fontSize);

        ["F0079", "F0082", "F0081", "F0080", "F007F", "F007E", "F007D", "F007C", "F007B", "F007A", "F0083"].forEach(c => trackIcon(c, size));
    },
    export: exportDoc,
    onExportNumericSensors: (context) => {
        const { lines, widgets } = context;
        if (!widgets) return;

        const processed = new Set();
        for (const w of widgets) {
            if (w.type !== "battery_icon") continue;

            const p = w.props || {};
            if (p.is_local_sensor) continue;

            let eid = (w.entity_id || "").trim();
            if (!eid) continue;

            // Ensure sensor. prefix if missing
            if (!eid.includes(".")) {
                eid = `sensor.${eid}`;
            }

            if (!processed.has(eid)) {
                processed.add(eid);
                const safeId = eid.replace(/[^a-zA-Z0-9_]/g, "_");
                lines.push("- platform: homeassistant", `  id: ${safeId}`, `  entity_id: ${eid}`, "  internal: true");
            }
        }
    }
};

