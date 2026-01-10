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
        sensorId = entityId ? entityId.replace(/^sensor\./, "").replace(/\./g, "_").replace(/-/g, "_") : "wifi_signal_dbm";
    }

    lines.push(`        // widget:wifi_signal id:${w.id} type:wifi_signal x:${w.x} y:${w.y} w:${w.width} h:${w.height} entity:${entityId || "wifi_signal_dbm"} size:${size} font_size:${fontSize} color:${colorProp} show_dbm:${showDbm} local:${isLocal} ${getCondProps(w)}`);

    const cond = getConditionCheck(w);
    if (cond) lines.push(`        ${cond}`);

    lines.push(`        {`);
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
    lines.push(`          it.printf(${w.x}, ${w.y}, id(${fontRef}), ${color}, "%s", wifi_icon);`);

    if (showDbm) {
        lines.push(`          if (id(${sensorId}).has_state()) {`);
        lines.push(`            it.printf(${w.x} + ${size}/2, ${w.y} + ${size} + 2, id(${dbmFontRef}), ${color}, TextAlign::TOP_CENTER, "%.0fdB", id(${sensorId}).state);`);
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
    export: exportDoc,
    onExportNumericSensors
};

