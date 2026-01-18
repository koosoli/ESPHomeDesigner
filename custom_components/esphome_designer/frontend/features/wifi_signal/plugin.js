/**
 * WiFi Signal Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    let iconCode = "F0928"; // Default: wifi-strength-4 (excellent)
    let size = props.size || 24;
    const color = props.color || "black";
    const showDbm = props.show_dbm !== false;

    let signalLevel = -45; // Default preview (excellent signal)

    if (!props.is_local_sensor && widget.entity_id) {
        if (window.AppState && window.AppState.entityStates) {
            const stateObj = window.AppState.entityStates[widget.entity_id];
            if (stateObj && stateObj.state !== undefined) {
                const val = parseFloat(stateObj.state);
                if (!isNaN(val)) {
                    signalLevel = val;
                }
            }
        }
    }

    if (props.fit_icon_to_frame) {
        const padding = 4;
        const maxDim = Math.max(8, Math.min((widget.width || 0) - padding * 2, (widget.height || 0) - padding * 2));
        size = Math.round(maxDim);
    }

    if (signalLevel >= -50) iconCode = "F0928";      // wifi-strength-4
    else if (signalLevel >= -60) iconCode = "F0925"; // wifi-strength-3
    else if (signalLevel >= -75) iconCode = "F0922"; // wifi-strength-2
    else if (signalLevel >= -100) iconCode = "F091F"; // wifi-strength-1
    else iconCode = "F092B";                          // wifi-strength-alert-outline

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

    if (showDbm) {
        const dbmLabel = document.createElement("div");
        dbmLabel.style.fontSize = (props.font_size || 12) + "px";
        dbmLabel.style.marginTop = "2px";
        dbmLabel.textContent = Math.round(signalLevel) + "dB";
        el.appendChild(dbmLabel);
    }
};

const exportDoc = (w, context) => {
    const {
        lines, addFont, getColorConst, addDitherMask, getCondProps, getConditionCheck, isEpaper
    } = context;

    const p = w.props || {};
    const entityId = (w.entity_id || "").trim();
    const size = parseInt(p.size || 24, 10);
    const fontSize = parseInt(p.font_size || 12, 10);
    const colorProp = p.color || "black";

    const showDbm = p.show_dbm !== false;
    const isLocal = p.is_local_sensor !== false;

    const color = getColorConst(colorProp);

    const fontRef = addFont("Material Design Icons", 400, size);
    const dbmFontRef = addFont("Roboto", 400, fontSize);

    let sensorId;
    if (isLocal) {
        sensorId = "wifi_signal_dbm";
    } else {
        sensorId = entityId ? entityId.replace(/[^a-zA-Z0-9_]/g, "_") : "wifi_signal_dbm";
    }

    lines.push(`        // widget:wifi_signal id:${w.id} type:wifi_signal x:${w.x} y:${w.y} w:${w.width} h:${w.height} entity:${entityId || "wifi_signal_dbm"} size:${size} font_size:${fontSize} color:${colorProp} show_dbm:${showDbm} local:${isLocal} ${getCondProps(w)}`);

    const cond = getConditionCheck(w);
    if (cond) lines.push(`        ${cond}`);

    // Robust Centering:
    // We calculate the center X relative to the widget's X and Width.
    // Ideally: x + w / 2
    // We use TextAlign::TOP_CENTER to align the text horizontally to that center point.

    // Vertical centering logic:
    // Content height is icon size (+ spacing + text size if DBM shown).
    // We calculate 'paddingY' to push the content down to the middle.

    const contentHeight = showDbm ? (size + 2 + fontSize) : size;
    const paddingY = `(${w.height} - ${contentHeight}) / 2`;
    const centerX = `${w.x} + ${w.width} / 2`;

    // Icon Y position
    const iconY = `${w.y} + ${paddingY}`;

    // Text Y position (below icon)
    const textY = `${w.y} + ${paddingY} + ${size} + 2`;

    lines.push(`          const char* wifi_icon = "\\U000F092B"; // Default: wifi-strength-alert-outline`);
    lines.push(`          if (id(${sensorId}).has_state()) {`);
    lines.push(`            float signal = id(${sensorId}).state;`);
    lines.push(`            if (std::isnan(signal)) signal = -100;`);
    lines.push(`            if (signal >= -50) wifi_icon = "\\U000F0928";      // wifi-strength-4 (Excellent)`);
    lines.push(`            else if (signal >= -60) wifi_icon = "\\U000F0925"; // wifi-strength-3 (Good)`);
    lines.push(`            else if (signal >= -75) wifi_icon = "\\U000F0922"; // wifi-strength-2 (Fair)`);
    lines.push(`            else if (signal >= -100) wifi_icon = "\\U000F091F"; // wifi-strength-1 (Weak)`);
    lines.push(`            else wifi_icon = "\\U000F092B";                    // wifi-strength-alert-outline`);
    lines.push(`          }`);

    // Explicitly use TOP_CENTER alignment
    lines.push(`          it.printf(${centerX}, ${iconY}, id(${fontRef}), ${color}, TextAlign::TOP_CENTER, "%s", wifi_icon);`);

    if (showDbm) {
        lines.push(`          if (id(${sensorId}).has_state()) {`);
        lines.push(`            it.printf(${centerX}, ${textY}, id(${dbmFontRef}), ${color}, TextAlign::TOP_CENTER, "%.0fdB", id(${sensorId}).state);`);
        lines.push(`          }`);
    }

    addDitherMask(lines, colorProp, isEpaper, w.x, w.y, w.width, w.height);
    lines.push(`        }`);
    if (cond) lines.push(`        }`);
};

const onExportNumericSensors = (context) => {
    const { lines, widgets } = context;
    if (!widgets || widgets.length === 0) return;
    const needsWifi = widgets.some(w => w.type === "wifi_signal");
    if (needsWifi) {
        lines.push("- platform: wifi_signal");
        lines.push("  name: \"WiFi Signal\"");
        lines.push("  id: wifi_signal_dbm");
        lines.push("  update_interval: 60s");
    }
};

export default {
    id: "wifi_signal",
    name: "WiFi Signal",
    category: "Sensors",
    defaults: {
        size: 24,
        font_size: 12,
        color: "black",
        show_dbm: true,
        fit_icon_to_frame: false,
        is_local_sensor: true
    },
    render,
    exportLVGL: (w, { common, convertColor, getLVGLFont, formatOpacity }) => {
        const p = w.props || {};
        const entityId = (w.entity_id || "").trim();
        const isLocal = p.is_local_sensor !== false;
        const sensorId = isLocal ? "wifi_signal_dbm" : (entityId ? entityId.replace(/[^a-zA-Z0-9_]/g, "_") : "wifi_signal_dbm");
        const color = convertColor(p.color || "black");
        const iconSize = parseInt(p.size || 24, 10);
        const fontSize = parseInt(p.font_size || 12, 10);
        const showDbm = p.show_dbm !== false;

        let iconLambda = '!lambda |-\n';
        iconLambda += `          if (id(${sensorId}).has_state()) {\n`;
        iconLambda += `            float sig = id(${sensorId}).state;\n`;
        iconLambda += `            if (sig >= -50) return "\\U000F0928";\n`;
        iconLambda += `            if (sig >= -60) return "\\U000F0925";\n`;
        iconLambda += `            if (sig >= -75) return "\\U000F0922";\n`;
        iconLambda += `            if (sig >= -100) return "\\U000F091F";\n`;
        iconLambda += `            return "\\U000F092B";\n`;
        iconLambda += '          }\n';
        iconLambda += '          return "\\U000F092B";';

        const widgets = [
            {
                label: {
                    width: iconSize + 10,
                    height: iconSize + 4,
                    align: "TOP_MID",
                    text: iconLambda,
                    text_font: getLVGLFont("Material Design Icons", iconSize, 400),
                    text_color: color
                }
            }
        ];

        if (showDbm) {
            let textLambda = '!lambda |-\n';
            textLambda += `          if (id(${sensorId}).has_state()) {\n`;
            textLambda += `            return str_sprintf("%.0fdB", id(${sensorId}).state).c_str();\n`;
            textLambda += '          }\n';
            textLambda += '          return "---dB";';

            widgets.push({
                label: {
                    width: "100%",
                    height: fontSize + 4,
                    align: "BOTTOM_MID",
                    y: 2,
                    text: textLambda,
                    text_font: getLVGLFont("Roboto", fontSize, 400),
                    text_color: color,
                    text_align: "CENTER"
                }
            });
        }

        return {
            obj: {
                ...common,
                bg_opa: "TRANSP",
                border_width: 0,
                widgets: widgets
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

        ["F0928", "F0925", "F0922", "F091F", "F092B"].forEach(c => trackIcon(c, size));
    },
    export: exportDoc,
    onExportNumericSensors: (context) => {
        const { lines, widgets } = context;
        if (!widgets) return;

        const processed = new Set();
        let needsLocalWifi = false;

        for (const w of widgets) {
            if (w.type !== "wifi_signal") continue;

            const p = w.props || {};
            const isLocal = p.is_local_sensor !== false;

            if (isLocal) {
                needsLocalWifi = true;
                continue;
            }

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

        if (needsLocalWifi && !lines.some(l => l.includes("id: wifi_signal_dbm"))) {
            lines.push("- platform: wifi_signal", "  name: \"WiFi Signal\"", "  id: wifi_signal_dbm", "  update_interval: 60s");
        }
    }
};

