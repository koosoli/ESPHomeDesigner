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
    // CRITICAL ARCHITECTURAL NOTE: Protocol-based modes (OEPL/OpenDisplay) do not support 
    // on-device hardware sensors.
    supportedModes: ['lvgl', 'direct'],
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
    exportOpenDisplay: (w, { layout, page }) => {
        const p = w.props || {};
        const entityId = (w.entity_id || p.weather_entity || "sensor.temperature").trim();
        const size = p.size || 32;
        const fontSize = p.font_size || 16;
        const color = p.color || "black";
        const unit = p.unit || "°C";

        let temperature = 22.5;
        if (window.AppState && window.AppState.entityStates && entityId) {
            const stateSet = window.AppState.entityStates[entityId];
            if (stateSet && stateSet.state) temperature = parseFloat(stateSet.state);
        }

        let iconName = "thermometer";
        if (temperature <= 10) iconName = "thermometer-low";
        else if (temperature >= 30) iconName = "thermometer-high";

        let displayTemp = temperature;
        if (unit === "°F") displayTemp = (temperature * 9 / 5) + 32;

        return [
            {
                type: "draw_icon",
                value: iconName,
                x: Math.round(w.x + w.width / 2),
                y: Math.round(w.y),
                size: size,
                color: color
            },
            {
                type: "draw_text",
                text: `${displayTemp.toFixed(1)}${unit}`,
                x: Math.round(w.x + w.width / 2),
                y: Math.round(w.y + size + 2),
                size: fontSize,
                color: color
            }
        ];
    },
    exportOEPL: (w, { layout, page }) => {
        const p = w.props || {};
        const entityId = (w.entity_id || "sensor.temperature").trim();
        const size = p.size || 32;
        const fontSize = p.font_size || 16;
        const color = p.color || "black";
        const unit = p.unit || "°C";

        const iconTemplate = `{% set t = states('${entityId}') | float %}` +
            `{% if t <= 10 %}thermometer-low{% elif t >= 30 %}thermometer-high{% else %}thermometer{% endif %}`;

        return [
            {
                type: "icon",
                value: iconTemplate,
                x: Math.round(w.x + w.width / 2),
                y: Math.round(w.y),
                size: size,
                color: color,
                anchor: "mt"
            },
            {
                type: "text",
                value: `{{ states('${entityId}') }}${unit}`,
                x: Math.round(w.x + w.width / 2),
                y: Math.round(w.y + size + 2),
                size: fontSize,
                color: color,
                align: "center",
                anchor: "mt"
            }
        ];
    },
    exportLVGL: (w, { common, convertColor, getLVGLFont, profile }) => {
        const p = w.props || {};
        const isLocal = p.is_local_sensor === true || (p.is_local_sensor !== false && !w.entity_id);
        let sensorId = (w.entity_id || "").replace(/[^a-zA-Z0-9_]/g, "_");
        if (isLocal && profile.features) {
            sensorId = profile.features.sht4x ? "sht4x_temperature" : (profile.features.sht3x ? "sht3x_temperature" : (profile.features.shtc3 ? "shtc3_temperature" : "onboard_temperature"));
        }
        if (!sensorId) sensorId = "onboard_temperature";

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
                                opa: "70%"
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
                    opa: "70%"
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
        let sensorId = (w.entity_id || "").replace(/[^a-zA-Z0-9_]/g, "_");

        if (isLocal) {
            if (profile.features) {
                sensorId = profile.features.sht4x ? "sht4x_temperature" : (profile.features.sht3x ? "sht3x_temperature" : (profile.features.shtc3 ? "shtc3_temperature" : "onboard_temperature"));
            }
        }
        if (!sensorId) sensorId = "onboard_temperature";

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
        // REGRESSION PROOF: Always destructure 'lines' from context to allow sensor generation
        const { lines, widgets, isLvgl, pendingTriggers, profile } = context;
        if (!widgets) return;

        let needsLocalSHT = false;
        for (const w of widgets) {
            if (w.type !== "ondevice_temperature") continue;
            const p = w.props || {};
            const isLocal = p.is_local_sensor === true || (p.is_local_sensor !== false && !w.entity_id);

            let eid = (w.entity_id || "").trim();
            if (isLocal) {
                needsLocalSHT = true;
                if (profile.features) {
                    eid = profile.features.sht4x ? "sht4x_temperature" : (profile.features.sht3x ? "sht3x_temperature" : (profile.features.shtc3 ? "shtc3_temperature" : "onboard_temperature"));
                } else {
                    eid = "onboard_temperature";
                }
            } else if (eid) {
                if (!eid.includes(".")) eid = `sensor.${eid}`;
            }

            if (!eid) continue;

            if (isLvgl && pendingTriggers) {
                if (!pendingTriggers.has(eid)) {
                    pendingTriggers.set(eid, new Set());
                }
                pendingTriggers.get(eid).add(`- lvgl.widget.refresh: ${w.id}`);
            }

            // Explicitly export the Home Assistant sensor block if it's not a local sensor
            if (!isLocal && eid.startsWith("sensor.")) {
                const safeId = eid.replace(/[^a-zA-Z0-9_]/g, "_");
                if (context.seenSensorIds && !context.seenSensorIds.has(safeId)) {
                    if (context.seenSensorIds.size === 0) {
                        lines.push("");
                        lines.push("# External Temperature Sensors");
                    }
                    context.seenSensorIds.add(safeId);
                    lines.push("- platform: homeassistant");
                    lines.push(`  id: ${safeId}`);
                    lines.push(`  entity_id: ${eid}`);
                    lines.push(`  internal: true`);
                }
            }
        }

        if (needsLocalSHT && profile.features) {
            // ... (rest of local sensor generation logic remains the same)
            const hasSht4x = !!profile.features.sht4x;
            const hasSht3x = !!profile.features.sht3x;
            const hasShtc3 = !!profile.features.shtc3;

            if (hasSht4x || hasSht3x || hasShtc3) {
                const shtId = hasSht4x ? "sht4x_sensor" : (hasSht3x ? "sht3x_sensor" : "shtc3_sensor");
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
                    lines.push(`  temperature:`, `    id: ${tempId}`, `    internal: true`);
                    lines.push(`  update_interval: 60s`);

                    if (shtPlatform === "shtcx" && !lines.some(l => l.includes("address: 0x70"))) {
                        lines.push("    address: 0x70");
                        lines.push("    i2c_id: bus_a");
                    }
                    if (shtPlatform === "sht3xd" && !lines.some(l => l.includes("address: 0x44"))) {
                        lines.push("    address: 0x44");
                    }
                }
            }
        }
    }
};
