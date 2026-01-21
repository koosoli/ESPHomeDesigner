/**
 * On-Device Temperature Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const color = props.color || "black";
    let iconSize = props.size || 32;
    let fontSize = props.font_size || 16;
    let labelFontSize = props.label_font_size || 12;
    const unit = props.unit || "°C";
    const showLabel = props.show_label !== false;
    const precision = props.precision ?? 1;

    let temperature = 22.5; // Default preview value

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
        width: 60,
        height: 60,
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
    exportLVGL: (w, { common, convertColor, getLVGLFont, profile }) => {
        const p = w.props || {};
        const isLocal = p.is_local_sensor === true || (p.is_local_sensor !== false && !w.entity_id);
        let sensorId = "onboard_temperature";
        if (isLocal) {
            if (profile.features) {
                sensorId = profile.features.sht4x ? "sht4x_temperature" : (profile.features.sht3x ? "sht3x_temperature" : (profile.features.shtc3 ? "shtc3_temperature" : "onboard_temperature"));
            }
        } else {
            sensorId = (w.entity_id || "").replace(/[^a-zA-Z0-9_]/g, "_");
            if (!sensorId) sensorId = "onboard_temperature";
        }

        const color = convertColor(p.color || "black");
        const iconSize = parseInt(p.size || 32, 10);
        const fontSize = parseInt(p.font_size || 16, 10);
        const labelSize = parseInt(p.label_font_size || 10, 10);
        const unit = p.unit || "°C";

        // Strict validation: Local sensor is only valid if hardware actually supports it
        const supportsOnboard = profile.features && (profile.features.sht4x || profile.features.sht3x || profile.features.shtc3);
        const hasValidSensor = (isLocal && supportsOnboard && sensorId !== "onboard_temperature") || !!w.entity_id;

        // If no valid sensor, return static strings to avoid "ID not declared" errors
        if (!hasValidSensor) {
            return {
                obj: {
                    ...common,
                    bg_opa: "transp",
                    border_width: 0,
                    widgets: [
                        {
                            label: {
                                width: parseInt(p.size || 32, 10) + 10,
                                height: parseInt(p.size || 32, 10) + 4,
                                align: "top_mid",
                                text: "\\U000F050F", // Static icon
                                text_font: getLVGLFont("Material Design Icons", parseInt(p.size || 32, 10), 400),
                                text_color: convertColor(p.color || "black")
                            }
                        },
                        {
                            label: {
                                width: "100%",
                                height: parseInt(p.font_size || 16, 10) + 6,
                                align: "top_mid",
                                y: parseInt(p.size || 32, 10) + 2,
                                text: `--${p.unit || "°C"}`, // Static text
                                text_font: getLVGLFont("Roboto", parseInt(p.font_size || 16, 10), 400),
                                text_color: convertColor(p.color || "black"),
                                text_align: "center"
                            }
                        },
                        ...(p.show_label ? [{
                            label: {
                                width: "100%",
                                height: parseInt(p.label_font_size || 10, 10) + 4,
                                align: "bottom_mid",
                                text: `"Temperature"`,
                                text_font: getLVGLFont("Roboto", parseInt(p.label_font_size || 10, 10), 400),
                                text_color: convertColor(p.color || "black"),
                                text_align: "center",
                                opa: 180
                            }
                        }] : [])
                    ]
                }
            };
        }

        let iconLambda = '!lambda |-\n';
        if (hasValidSensor) {
            iconLambda += `          if (id(${sensorId}).has_state()) {\n`;
            iconLambda += `            float t = id(${sensorId}).state;\n`;
            iconLambda += `            if (t <= 10) return "\\U000F0E4C";\n`;
            iconLambda += `            if (t <= 25) return "\\U000F050F";\n`;
            iconLambda += `            return "\\U000F10C2";\n`;
            iconLambda += '          }\n';
            iconLambda += '          return "\\U000F050F";';
        }

        let textLambda = '!lambda |-\n';
        if (hasValidSensor) {
            textLambda += `          if (id(${sensorId}).has_state()) {\n`;
            let tempExpr = `id(${sensorId}).state`;
            if (unit === "°F") tempExpr = `(id(${sensorId}).state * 9.0 / 5.0) + 32.0`;
            textLambda += `            return str_sprintf("%.1f${unit}", ${tempExpr}).c_str();\n`;
            textLambda += '          }\n';
            textLambda += `          return "--${unit}";`;
        }

        const widgets = [
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
                    height: fontSize + 6,
                    align: "top_mid",
                    y: iconSize + 2,
                    text: textLambda,
                    text_font: getLVGLFont("Roboto", fontSize, 400),
                    text_color: color,
                    text_align: "center"
                }
            }
        ];

        if (p.show_label) {
            widgets.push({
                label: {
                    width: "100%",
                    height: labelSize + 4,
                    align: "bottom_mid",
                    text: `"Temperature"`,
                    text_font: getLVGLFont("Roboto", labelSize, 400),
                    text_color: color,
                    text_align: "center",
                    opa: 180
                }
            });
        }

        return {
            obj: {
                ...common,
                bg_opa: "transp",
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

        ["F0E4C", "F050F", "F10C2"].forEach(c => trackIcon(c, iconSize));
    },
    export: (w, context) => {
        const {
            lines, getColorConst, getCondProps, getConditionCheck, addFont, profile
        } = context;

        const p = w.props || {};
        const color = getColorConst(p.color || "black");
        const unit = p.unit || "°C";
        const iconSize = p.size || 32;
        const fontSize = p.font_size || 16;
        const iconFontId = addFont("Material Design Icons", 400, iconSize);
        const valueFontId = addFont("Roboto", 400, fontSize);

        const isLocal = p.is_local_sensor === true || (p.is_local_sensor !== false && !w.entity_id);
        let sensorId = "onboard_temperature";

        if (isLocal) {
            // Use consistent ID with template_sensor_bar if possible
            if (profile.features) {
                sensorId = profile.features.sht4x ? "sht4x_temperature" : (profile.features.sht3x ? "sht3x_temperature" : (profile.features.shtc3 ? "shtc3_temperature" : "onboard_temperature"));
            }
        } else {
            sensorId = (w.entity_id || "").replace(/[^a-zA-Z0-9_]/g, "_");
            if (!sensorId) sensorId = "onboard_temperature";
        }

        lines.push(`        // widget:ondevice_temperature id:${w.id} type:ondevice_temperature x:${w.x} y:${w.y} w:${w.width} h:${w.height} unit:${unit} local:${isLocal} ent:${w.entity_id || ""} ${getCondProps(w)}`);

        const cond = getConditionCheck(w);
        if (cond) lines.push(`        ${cond}`);

        // Standardized Centering Logic
        const centerX = `${w.x} + ${w.width} / 2`;

        // Icon based on temperature
        // Icon Y: (height - content_height) / 2
        // Content Stack: Icon + Spacing + Value + (Label)
        // This widget is a bit more complex vertical stack.
        // We will stick to the existing "offset from Y" logic but clean up the X alignment.

        const centerYIcon = `${w.y} + ${Math.round(iconSize / 2)}`;

        const supportsOnboard = profile.features && (profile.features.sht4x || profile.features.sht3x || profile.features.shtc3);
        const hasValidSensor = (isLocal && supportsOnboard && sensorId !== "onboard_temperature") || !!w.entity_id;

        // --- ICON ---
        if (hasValidSensor) {
            lines.push(`        if (id(${sensorId}).has_state()) {`);
            lines.push(`          if (id(${sensorId}).state <= 10) {`);
            lines.push(`            it.printf(${centerX}, ${centerYIcon}, id(${iconFontId}), ${color}, TextAlign::CENTER, "\\U000F0E4C");`);
            lines.push(`          } else if (id(${sensorId}).state <= 25) {`);
            lines.push(`            it.printf(${centerX}, ${centerYIcon}, id(${iconFontId}), ${color}, TextAlign::CENTER, "\\U000F050F");`);
            lines.push(`          } else {`);
            lines.push(`            it.printf(${centerX}, ${centerYIcon}, id(${iconFontId}), ${color}, TextAlign::CENTER, "\\U000F10C2");`);
            lines.push(`          }`);
            lines.push(`        } else {`);
            lines.push(`          it.printf(${centerX}, ${centerYIcon}, id(${iconFontId}), ${color}, TextAlign::CENTER, "\\U000F050F");`);
            lines.push(`        }`);
        } else {
            lines.push(`          it.printf(${centerX}, ${centerYIcon}, id(${iconFontId}), ${color}, TextAlign::CENTER, "\\U000F050F");`);
        }

        // --- VALUE ---
        if (hasValidSensor) {
            let tempExpr = `id(${sensorId}).state`;
            if (unit === "°F") {
                tempExpr = `(id(${sensorId}).state * 9.0 / 5.0) + 32.0`;
            }
            lines.push(`        if (id(${sensorId}).has_state()) {`);
            lines.push(`          it.printf(${centerX}, ${w.y} + ${iconSize + 5}, id(${valueFontId}), ${color}, TextAlign::TOP_CENTER, "%.1f${unit}", ${tempExpr});`);
            lines.push(`        } else {`);
            lines.push(`          it.printf(${centerX}, ${w.y} + ${iconSize + 5}, id(${valueFontId}), ${color}, TextAlign::TOP_CENTER, "--${unit}");`);
            lines.push(`        }`);
        } else {
            lines.push(`          it.printf(${centerX}, ${w.y} + ${iconSize + 5}, id(${valueFontId}), ${color}, TextAlign::TOP_CENTER, "--${unit}");`);
        }

        if (p.show_label) {
            const labelFontId = addFont("Roboto", 400, p.label_font_size || 10);
            lines.push(`        it.printf(${centerX}, ${w.y} + ${iconSize + fontSize + 8}, id(${labelFontId}), ${color}, TextAlign::TOP_CENTER, "Temperature");`);
        }

        if (cond) lines.push(`        }`);
    },
    onExportNumericSensors: (context) => {
        const { lines, widgets, profile } = context;
        if (!widgets) return;

        let needsLocalSHT = false;
        for (const w of widgets) {
            if (w.type !== "ondevice_temperature") continue;
            const p = w.props || {};
            if (p.is_local_sensor === true || (p.is_local_sensor !== false && !w.entity_id)) {
                needsLocalSHT = true;
                continue;
            }

            let eid = (w.entity_id || "").trim();
            if (!eid) continue;
            if (!eid.includes(".")) eid = `sensor.${eid}`;

            const safeId = eid.replace(/[^a-zA-Z0-9_]/g, "_");
            const alreadyDefined = (context.seenEntityIds && context.seenEntityIds.has(eid)) ||
                (context.seenSensorIds && context.seenSensorIds.has(safeId));

            if (!alreadyDefined) {
                if (context.seenEntityIds) context.seenEntityIds.add(eid);
                if (context.seenSensorIds) context.seenSensorIds.add(safeId);
                lines.push("- platform: homeassistant", `  id: ${safeId}`, `  entity_id: ${eid}`, "  internal: true");
            }
        }

        if (needsLocalSHT && profile.features) {
            // Strict check: Only generate if hardware actually supports it
            const hasSht4x = !!profile.features.sht4x;
            const hasSht3x = !!profile.features.sht3x;
            const hasShtc3 = !!profile.features.shtc3;

            if (hasSht4x || hasSht3x || hasShtc3) {
                const shtId = hasSht4x ? "sht4x_sensor" : (hasSht3x ? "sht3x_sensor" : "shtc3_sensor");
                // Fix: Hardware generator uses 'sht3xd' and 'shtcx' (for SHTC3)
                const shtPlatform = hasSht4x ? "sht4x" : (hasSht3x ? "sht3xd" : "shtcx");
                const tempId = hasSht4x ? "sht4x_temperature" : (hasSht3x ? "sht3x_temperature" : "shtc3_temperature");

                const checkLines = context.mainLines || lines;
                const alreadyDefined = (context.seenSensorIds && context.seenSensorIds.has(shtId)) ||
                    (context.seenSensorIds && context.seenSensorIds.has(tempId)) ||
                    checkLines.some(l => l.includes(`id: ${shtId}`));

                if (!alreadyDefined) {
                    if (context.seenSensorIds) {
                        context.seenSensorIds.add(shtId);
                        context.seenSensorIds.add(tempId);
                    }
                    lines.push(`- platform: ${shtPlatform}`, `  id: ${shtId}`);
                    // For shtcx/sht3xd we need address/i2c but hardware_generators.js usually handles the main block.
                    // However, plugins add *extra* sensors.
                    // If hardware_generators.js ALREADY generated the sensor block (checked by id), we skip.
                    // But here we are checking if it's NOT present.
                    // Note: hardware_generators.js generates these sensors if profile.features.sht* is present.
                    // So we mostly need to ensure we don't duplicate or add if missing.
                    // Actually, hardware_generators.js logic: if (hasSht4x) generate...
                    // So if we are here, likely hardware_generators.js didn't run or we are adding it dynamically?
                    // No, hardware_generators usually runs first.
                    // But let's be safe and minimal.
                    lines.push(`  temperature:`, `    id: ${tempId}`, `    internal: true`);
                    lines.push(`  update_interval: 60s`);

                    // Add required address/i2c if missing (simple fallback)
                    if (shtPlatform === "shtcx" && !lines.some(l => l.includes("address: 0x70"))) {
                        lines.push("    address: 0x70");
                        lines.push("    i2c_id: bus_a");
                    }
                    if (shtPlatform === "sht3xd" && !lines.some(l => l.includes("address: 0x44"))) {
                        lines.push("    address: 0x44");
                    }
                } else {
                    // SHT platform exists, check if temperature sub-component exists
                    // This is hard to inject into existing block without parsing.
                    // But typically if the platform exists, the sensors are defined.
                }
            }
        }
    }
};
