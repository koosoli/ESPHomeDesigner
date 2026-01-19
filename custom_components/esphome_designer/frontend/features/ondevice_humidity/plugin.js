/**
 * On-Device Humidity Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const color = props.color || "black";
    let iconSize = props.size || 32;
    let fontSize = props.font_size || 16;
    let labelFontSize = props.label_font_size || 12;
    const unit = props.unit || "%";
    const showLabel = props.show_label !== false;
    const precision = props.precision ?? 0;

    let humidity = 45; // Default preview value

    if (props.fit_icon_to_frame) {
        const padding = 2;
        const h = (widget.height || 60) - padding * 2;

        iconSize = Math.round(h * 0.45);
        fontSize = Math.round(h * 0.25);
        labelFontSize = Math.round(h * 0.15);

        // Bound checks
        iconSize = Math.max(8, iconSize);
        fontSize = Math.max(8, fontSize);
        labelFontSize = Math.max(6, labelFontSize);
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
        width: 60,
        height: 60,
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
    exportLVGL: (w, { common, convertColor, getLVGLFont, profile }) => {
        const p = w.props || {};
        const isLocal = p.is_local_sensor === true || (p.is_local_sensor !== false && !w.entity_id);
        let sensorId = "onboard_humidity";
        if (isLocal) {
            if (profile.features) {
                sensorId = profile.features.sht4x ? "sht4x_humidity" : (profile.features.sht3x ? "sht3x_humidity" : (profile.features.shtc3 ? "shtc3_humidity" : "onboard_humidity"));
            }
        } else {
            sensorId = (w.entity_id || "").replace(/[^a-zA-Z0-9_]/g, "_");
            if (!sensorId) sensorId = "onboard_humidity";
        }

        const color = convertColor(p.color || "black");
        const iconSize = parseInt(p.size || 32, 10);
        const fontSize = parseInt(p.font_size || 16, 10);
        const labelSize = parseInt(p.label_font_size || 10, 10);
        const unit = p.unit || "%";

        let iconLambda = '!lambda |-\n';
        iconLambda += `          if (id(${sensorId}).has_state()) {\n`;
        iconLambda += `            float h = id(${sensorId}).state;\n`;
        iconLambda += `            if (h <= 30) return "\\U000F0E7A";\n`;
        iconLambda += `            if (h <= 60) return "\\U000F058E";\n`;
        iconLambda += `            return "\\U000F058C";\n`;
        iconLambda += '          }\n';
        iconLambda += '          return "\\U000F058E";';

        let textLambda = '!lambda |-\n';
        textLambda += `          if (id(${sensorId}).has_state()) {\n`;
        textLambda += `            return str_sprintf("%.0f${unit}", id(${sensorId}).state).c_str();\n`;
        textLambda += '          }\n';
        textLambda += `          return "--${unit}";`;

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
            },
            {
                label: {
                    width: "100%",
                    height: fontSize + 6,
                    align: "TOP_MID",
                    y: iconSize + 2,
                    text: textLambda,
                    text_font: getLVGLFont("Roboto", fontSize, 400),
                    text_color: color,
                    text_align: "CENTER"
                }
            }
        ];

        if (p.show_label) {
            widgets.push({
                label: {
                    width: "100%",
                    height: labelSize + 4,
                    align: "BOTTOM_MID",
                    text: `"Humidity"`,
                    text_font: getLVGLFont("Roboto", labelSize, 400),
                    text_color: color,
                    text_align: "CENTER",
                    opa: 180
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
        const iconSize = parseInt(p.size || 32, 10);
        const fontSize = parseInt(p.font_size || 16, 10);
        const labelSize = parseInt(p.label_font_size || 10, 10);

        addFont("Material Design Icons", 400, iconSize);
        addFont("Roboto", 400, fontSize);
        if (p.show_label) addFont("Roboto", 400, labelSize);

        ["F0E7A", "F058E", "F058C"].forEach(c => trackIcon(c, iconSize));
    },
    export: (w, context) => {
        const {
            lines, getColorConst, getCondProps, getConditionCheck, addFont, profile
        } = context;

        const p = w.props || {};
        const color = getColorConst(p.color || "black");
        const unit = p.unit || "%";
        const iconSize = p.size || 32;
        const fontSize = p.font_size || 16;
        const iconFontId = addFont("Material Design Icons", 400, iconSize);
        const valueFontId = addFont("Roboto", 400, fontSize);

        const isLocal = p.is_local_sensor === true || (p.is_local_sensor !== false && !w.entity_id);
        let sensorId = "onboard_humidity";

        if (isLocal) {
            if (profile.features) {
                sensorId = profile.features.sht4x ? "sht4x_humidity" : (profile.features.sht3x ? "sht3x_humidity" : (profile.features.shtc3 ? "shtc3_humidity" : "onboard_humidity"));
            }
        } else {
            sensorId = (w.entity_id || "").replace(/[^a-zA-Z0-9_]/g, "_");
            if (!sensorId) sensorId = "onboard_humidity";
        }

        lines.push(`        // widget:ondevice_humidity id:${w.id} type:ondevice_humidity x:${w.x} y:${w.y} w:${w.width} h:${w.height} unit:${unit} local:${isLocal} ent:${w.entity_id || ""} ${getCondProps(w)}`);

        const cond = getConditionCheck(w);
        if (cond) lines.push(`        ${cond}`);

        // Standardized Centering Logic
        const centerX = `${w.x} + ${w.width} / 2`;
        const centerYIcon = `${w.y} + ${Math.round(iconSize / 2)}`;

        // Icon based on humidity
        // Strict validation: Local sensor is only valid if hardware actually supports it
        const supportsOnboard = profile.features && (profile.features.sht4x || profile.features.sht3x || profile.features.shtc3);
        const hasValidSensor = (isLocal && supportsOnboard) || !!w.entity_id;

        // If no valid sensor, return static strings to avoid "ID not declared" errors
        if (!hasValidSensor) {
            // --- ICON ---
            lines.push(`          it.printf(${centerX}, ${centerYIcon}, id(${iconFontId}), ${color}, TextAlign::CENTER, "\\U000F058E");`);
            // --- VALUE ---
            lines.push(`          it.printf(${centerX}, ${w.y} + ${iconSize + 5}, id(${valueFontId}), ${color}, TextAlign::TOP_CENTER, "--${unit}");`);
        } else {
            // --- ICON ---
            lines.push(`        if (id(${sensorId}).has_state()) {`);
            lines.push(`          if (id(${sensorId}).state <= 30) {`);
            lines.push(`            it.printf(${centerX}, ${centerYIcon}, id(${iconFontId}), ${color}, TextAlign::CENTER, "\\U000F0E7A");`);
            lines.push(`          } else if (id(${sensorId}).state <= 60) {`);
            lines.push(`            it.printf(${centerX}, ${centerYIcon}, id(${iconFontId}), ${color}, TextAlign::CENTER, "\\U000F058E");`);
            lines.push(`          } else {`);
            lines.push(`            it.printf(${centerX}, ${centerYIcon}, id(${iconFontId}), ${color}, TextAlign::CENTER, "\\U000F058C");`);
            lines.push(`          }`);
            lines.push(`        } else {`);
            lines.push(`          it.printf(${centerX}, ${centerYIcon}, id(${iconFontId}), ${color}, TextAlign::CENTER, "\\U000F058E");`);
            lines.push(`        }`);
        }

        // --- VALUE ---
        if (hasValidSensor) {
            lines.push(`        if (id(${sensorId}).has_state()) {`);
            lines.push(`          it.printf(${centerX}, ${w.y} + ${iconSize + 5}, id(${valueFontId}), ${color}, TextAlign::TOP_CENTER, "%.0f${unit}", id(${sensorId}).state);`);
            lines.push(`        } else {`);
            lines.push(`          it.printf(${centerX}, ${w.y} + ${iconSize + 5}, id(${valueFontId}), ${color}, TextAlign::TOP_CENTER, "--${unit}");`);
            lines.push(`        }`);
        } else {
            lines.push(`          it.printf(${centerX}, ${w.y} + ${iconSize + 5}, id(${valueFontId}), ${color}, TextAlign::TOP_CENTER, "--${unit}");`);
        }

        if (p.show_label) {
            const labelFontId = addFont("Roboto", 400, p.label_font_size || 10);
            lines.push(`        it.printf(${centerX}, ${w.y} + ${iconSize + fontSize + 8}, id(${labelFontId}), ${color}, TextAlign::TOP_CENTER, "Humidity");`);
        }

        if (cond) lines.push(`        }`);
    },
    onExportNumericSensors: (context) => {
        const { lines, widgets, profile } = context;
        if (!widgets) return;

        const processed = new Set();
        let needsLocalSHT = false;

        for (const w of widgets) {
            if (w.type !== "ondevice_humidity") continue;
            const p = w.props || {};
            if (p.is_local_sensor === true || (p.is_local_sensor !== false && !w.entity_id)) {
                needsLocalSHT = true;
                continue;
            }

            let eid = (w.entity_id || "").trim();
            if (!eid) continue;
            if (!eid.includes(".")) eid = `sensor.${eid}`;

            if (!processed.has(eid)) {
                processed.add(eid);
                const safeId = eid.replace(/[^a-zA-Z0-9_]/g, "_");
                lines.push("- platform: homeassistant", `  id: ${safeId}`, `  entity_id: ${eid}`, "  internal: true");
            }
        }

        if (needsLocalSHT && profile.features) {
            const hasSht4x = !!profile.features.sht4x;
            const hasSht3x = !!profile.features.sht3x;
            const hasShtc3 = !!profile.features.shtc3;

            if (hasSht4x || hasSht3x || hasShtc3) {
                const shtId = hasSht4x ? "sht4x_sensor" : (hasSht3x ? "sht3x_sensor" : "shtc3_sensor");
                const shtPlatform = hasSht4x ? "sht4x" : (hasSht3x ? "sht3xd" : "shtcx");
                const humId = hasSht4x ? "sht4x_humidity" : (hasSht3x ? "sht3x_humidity" : "shtc3_humidity");

                if (!lines.some(l => l.includes(`id: ${shtId}`))) {
                    lines.push(`- platform: ${shtPlatform}`, `  id: ${shtId}`);
                    lines.push(`  humidity:`, `    id: ${humId}`, `    internal: true`);
                    lines.push(`  update_interval: 60s`);

                    if (shtPlatform === "shtcx" && !lines.some(l => l.includes("address: 0x70"))) {
                        lines.push("    address: 0x70");
                        lines.push("    i2c_id: bus_a");
                    }
                    if (shtPlatform === "sht3xd" && !lines.some(l => l.includes("address: 0x44"))) {
                        lines.push("    address: 0x44");
                    }
                } else {
                    // exists
                }
            }
        }
    }
};
