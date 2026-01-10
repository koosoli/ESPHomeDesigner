/**
 * On-Device Temperature Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const color = props.color || "black";
    let iconSize = props.size || 32;
    const fontSize = props.font_size || 16;
    const labelFontSize = props.label_font_size || 12;
    const unit = props.unit || "°C";
    const showLabel = props.show_label !== false;
    const precision = props.precision ?? 1;

    let temperature = 22.5; // Default preview value

    if (props.fit_icon_to_frame) {
        const padding = 4;
        const maxDim = Math.max(8, Math.min((widget.width || 0) - padding * 2, (widget.height || 0) - padding * 2));
        iconSize = Math.round(maxDim);
    }

    if (!props.is_local_sensor && widget.entity_id) {
        if (window.AppState && window.AppState.entityStates) {
            const stateObj = window.AppState.entityStates[widget.entity_id];
            if (stateObj && stateObj.state !== undefined) {
                const val = parseFloat(stateObj.state);
                if (!isNaN(val)) {
                    temperature = val;
                }
            }
        }
    }

    let iconCode;
    if (temperature <= 10) {
        iconCode = "F0E4C"; // thermometer-low (cold)
    } else if (temperature <= 25) {
        iconCode = "F050F"; // thermometer (normal)
    } else {
        iconCode = "F10C2"; // thermometer-high (hot)
    }

    const cp = 0xf0000 + parseInt(iconCode.slice(1), 16);
    const ch = String.fromCodePoint(cp);

    el.style.display = "flex";
    el.style.flexDirection = "column";
    el.style.alignItems = "center";
    el.style.justifyContent = "center";
    el.style.color = getColorStyle(color);

    const iconEl = document.createElement("div");
    iconEl.textContent = ch;
    iconEl.style.fontSize = `${iconSize}px`;
    iconEl.style.fontFamily = "MDI, system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
    iconEl.style.lineHeight = "1";
    el.appendChild(iconEl);

    const valueEl = document.createElement("div");
    valueEl.style.fontSize = `${fontSize}px`;
    valueEl.style.fontWeight = "500";
    valueEl.style.marginTop = "2px";

    let displayTemp = temperature;
    if (unit === "°F") {
        displayTemp = (temperature * 9 / 5) + 32;
    }

    valueEl.textContent = displayTemp.toFixed(precision) + unit;
    el.appendChild(valueEl);

    if (showLabel) {
        const labelEl = document.createElement("div");
        labelEl.style.fontSize = `${labelFontSize}px`;
        labelEl.style.opacity = "0.7";
        labelEl.style.marginTop = "1px";
        labelEl.textContent = "Temperature";
        el.appendChild(labelEl);
    }
};

export default {
    id: "ondevice_temperature",
    name: "Temperature",
    category: "SHT4x",
    defaults: {
        size: 32,
        font_size: 16,
        label_font_size: 10,
        color: "black",
        unit: "°C",
        show_label: true,
        precision: 1,
        fit_icon_to_frame: true,
        is_local_sensor: true
    },
    render,
    export: (w, context) => {
        const {
            lines, getColorConst, getCondProps, getConditionCheck, addFont
        } = context;

        const p = w.props || {};
        const color = getColorConst(p.color || "black");
        const unit = p.unit || "°C";
        const iconSize = p.size || 32;
        const fontSize = p.font_size || 16;
        const iconFontId = addFont("Material Design Icons", 400, iconSize);
        const valueFontId = addFont("Roboto", 400, fontSize);

        lines.push(`        // widget:ondevice_temperature id:${w.id} type:ondevice_temperature x:${w.x} y:${w.y} w:${w.width} h:${w.height} unit:${unit} ${getCondProps(w)}`);

        const cond = getConditionCheck(w);
        if (cond) lines.push(`        ${cond}`);

        // Icon based on temperature
        lines.push(`        if (id(onboard_temperature).state <= 10) {`);
        lines.push(`          it.printf(${w.x} + ${Math.round(w.width / 2)}, ${w.y} + ${Math.round(iconSize / 2)}, id(${iconFontId}), ${color}, TextAlign::CENTER, "\\U000F0E4C");`);
        lines.push(`        } else if (id(onboard_temperature).state <= 25) {`);
        lines.push(`          it.printf(${w.x} + ${Math.round(w.width / 2)}, ${w.y} + ${Math.round(iconSize / 2)}, id(${iconFontId}), ${color}, TextAlign::CENTER, "\\U000F050F");`);
        lines.push(`        } else {`);
        lines.push(`          it.printf(${w.x} + ${Math.round(w.width / 2)}, ${w.y} + ${Math.round(iconSize / 2)}, id(${iconFontId}), ${color}, TextAlign::CENTER, "\\U000F10C2");`);
        lines.push(`        }`);

        // Value
        let tempExpr = "id(onboard_temperature).state";
        if (unit === "°F") {
            tempExpr = "(id(onboard_temperature).state * 9.0 / 5.0) + 32.0";
        }
        lines.push(`        it.printf(${w.x} + ${Math.round(w.width / 2)}, ${w.y} + ${iconSize + 5}, id(${valueFontId}), ${color}, TextAlign::TOP_CENTER, "%.1f${unit}", ${tempExpr});`);

        if (p.show_label) {
            const labelFontId = addFont("Roboto", 400, p.label_font_size || 10);
            lines.push(`        it.printf(${w.x} + ${Math.round(w.width / 2)}, ${w.y} + ${iconSize + fontSize + 8}, id(${labelFontId}), ${color}, TextAlign::TOP_CENTER, "Temperature");`);
        }

        if (cond) lines.push(`        }`);
    }
};
