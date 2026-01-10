/**
 * On-Device Humidity Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const color = props.color || "black";
    let iconSize = props.size || 32;
    const fontSize = props.font_size || 16;
    const labelFontSize = props.label_font_size || 12;
    const unit = props.unit || "%";
    const showLabel = props.show_label !== false;
    const precision = props.precision ?? 0;

    let humidity = 45; // Default preview value

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
                    humidity = val;
                }
            }
        }
    }

    let iconCode;
    if (humidity <= 30) {
        iconCode = "F0E7A"; // water-outline (low)
    } else if (humidity <= 60) {
        iconCode = "F058E"; // water-percent (normal)
    } else {
        iconCode = "F058C"; // water (high)
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
    valueEl.textContent = humidity.toFixed(precision) + unit;
    el.appendChild(valueEl);

    if (showLabel) {
        const labelEl = document.createElement("div");
        labelEl.style.fontSize = `${labelFontSize}px`;
        labelEl.style.opacity = "0.7";
        labelEl.style.marginTop = "1px";
        labelEl.textContent = "Humidity";
        el.appendChild(labelEl);
    }
};

export default {
    id: "ondevice_humidity",
    name: "Humidity",
    category: "SHT4x",
    defaults: {
        size: 32,
        font_size: 16,
        label_font_size: 10,
        color: "black",
        unit: "%",
        show_label: true,
        precision: 0,
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
        const unit = p.unit || "%";
        const iconSize = p.size || 32;
        const fontSize = p.font_size || 16;
        const iconFontId = addFont("Material Design Icons", 400, iconSize);
        const valueFontId = addFont("Roboto", 400, fontSize);

        lines.push(`        // widget:ondevice_humidity id:${w.id} type:ondevice_humidity x:${w.x} y:${w.y} w:${w.width} h:${w.height} unit:${unit} ${getCondProps(w)}`);

        const cond = getConditionCheck(w);
        if (cond) lines.push(`        ${cond}`);

        // Icon based on humidity
        lines.push(`        if (id(onboard_humidity).state <= 30) {`);
        lines.push(`          it.printf(${w.x} + ${Math.round(w.width / 2)}, ${w.y} + ${Math.round(iconSize / 2)}, id(${iconFontId}), ${color}, TextAlign::CENTER, "\\U000F0E7A");`);
        lines.push(`        } else if (id(onboard_humidity).state <= 60) {`);
        lines.push(`          it.printf(${w.x} + ${Math.round(w.width / 2)}, ${w.y} + ${Math.round(iconSize / 2)}, id(${iconFontId}), ${color}, TextAlign::CENTER, "\\U000F058E");`);
        lines.push(`        } else {`);
        lines.push(`          it.printf(${w.x} + ${Math.round(w.width / 2)}, ${w.y} + ${Math.round(iconSize / 2)}, id(${iconFontId}), ${color}, TextAlign::CENTER, "\\U000F058C");`);
        lines.push(`        }`);

        // Value
        lines.push(`        it.printf(${w.x} + ${Math.round(w.width / 2)}, ${w.y} + ${iconSize + 5}, id(${valueFontId}), ${color}, TextAlign::TOP_CENTER, "%.0f${unit}", id(onboard_humidity).state);`);

        if (p.show_label) {
            const labelFontId = addFont("Roboto", 400, p.label_font_size || 10);
            lines.push(`        it.printf(${w.x} + ${Math.round(w.width / 2)}, ${w.y} + ${iconSize + fontSize + 8}, id(${labelFontId}), ${color}, TextAlign::TOP_CENTER, "Humidity");`);
        }

        if (cond) lines.push(`        }`);
    }
};
