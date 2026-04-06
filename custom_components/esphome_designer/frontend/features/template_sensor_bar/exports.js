import { clampFontWeight } from '../../js/core/font_weights.js';

const ensureHex = (color) => (color === "gray" || color === "grey" ? "#808080" : color);

const normalizeEntityId = (entity, isLocal = false) => {
    if (!entity || typeof entity !== 'string') return "";
    let next = entity;
    if (!isLocal && !next.includes(".")) next = `sensor.${next}`;
    return next.replace(/[^a-zA-Z0-9_]/g, "_");
};

const getDynamicColor = (getColorConst, color) => {
    if (color === "white" || color === "#ffffff") return "color_off";
    if (color === "black" || color === "#000000") return "color_on";
    if (color === "transparent") return "color_off";
    return getColorConst(color);
};

const escapeLvglString = (value) => String(value).replace(/\\/g, "\\\\").replace(/"/g, '\\"');

const buildLvglSensorTextLambda = (guardExpr, formatString, valueExpr, fallbackText) =>
    `!lambda "if (${guardExpr}) { return str_sprintf(\\"${escapeLvglString(formatString)}\\", ${valueExpr}); } return \\"${escapeLvglString(fallbackText)}\\";"`;

const pushSensorValue = (lines, iconFontRef, textFontRef, color, x, y, iconCode, bodyLines) => {
    lines.push(`          {`);
    lines.push(`            it.printf(${Math.round(x)} - 4, ${Math.round(y)}, id(${iconFontRef}), ${color}, TextAlign::CENTER_RIGHT, "%s", "${iconCode}");`);
    bodyLines.forEach((line) => lines.push(line));
    lines.push(`          }`);
};

export function exportDoc(w, context) {
    const { lines, addFont, getColorConst, addDitherMask, getConditionCheck, profile, isEpaper } = context;
    const p = w.props || {};
    const iconSize = parseInt(p.icon_size || 20, 10);
    const fontSize = parseInt(p.font_size || 14, 10);
    const fontFamily = p.font_family || "Roboto";
    const fontWeight = clampFontWeight(fontFamily, parseInt(p.font_weight || 400, 10) || 400);
    const color = getDynamicColor(getColorConst, ensureHex(p.color || "white"));
    const showWifi = p.show_wifi !== false;
    const showTemp = p.show_temperature !== false;
    const showHum = p.show_humidity !== false;
    const showBat = p.show_battery !== false;
    const showBg = p.show_background !== false;
    const bgColor = getDynamicColor(getColorConst, ensureHex(p.background_color || "black"));
    const radius = parseInt(p.border_radius || 8, 10);
    const thickness = parseInt(p.border_thickness || 0, 10);
    const borderColor = getDynamicColor(getColorConst, ensureHex(p.border_color || "white"));

    const wifiEntity = (p.wifi_is_local ? "wifi_signal_dbm" : p.wifi_entity) || "wifi_signal_dbm";
    const wifiId = wifiEntity.replace(/[^a-zA-Z0-9_]/g, "_");

    const rawBatEntity = p.bat_is_local ? (profile.pins?.batteryAdc ? "battery_level" : "") : p.bat_entity;
    const batId = rawBatEntity ? normalizeEntityId(rawBatEntity, p.bat_is_local) : "";

    const rawHumEntity = p.hum_is_local
        ? (profile.features?.sht4x ? "sht4x_humidity" : profile.features?.sht3x || profile.features?.sht3xd ? "sht3x_humidity" : profile.features?.shtc3 ? "shtc3_humidity" : "")
        : p.hum_entity;
    const humId = rawHumEntity ? normalizeEntityId(rawHumEntity, p.hum_is_local) : "";

    const rawTempEntity = p.temp_is_local
        ? (profile.features?.sht4x ? "sht4x_temperature" : profile.features?.sht3x || profile.features?.sht3xd ? "sht3x_temperature" : profile.features?.shtc3 ? "shtc3_temperature" : (p.temp_entity || "internal_temp"))
        : p.temp_entity;
    const tempId = rawTempEntity ? normalizeEntityId(rawTempEntity, p.temp_is_local) : "";

    const iconFontRef = addFont("Material Design Icons", 400, iconSize);
    const textFontRef = addFont(fontFamily, fontWeight, fontSize);

    const cond = getConditionCheck(w);
    if (cond) lines.push(`        ${cond}`);
    lines.push(`        {`);

    if (showBg) {
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
                lines.push(`          draw_filled_rrect(${w.x}, ${w.y}, ${w.width}, ${w.height}, ${radius}, ${borderColor});`);
                addDitherMask(lines, p.border_color || "white", isEpaper, w.x, w.y, w.width, w.height, radius);
                lines.push(`          draw_filled_rrect(${w.x + thickness}, ${w.y + thickness}, ${w.width - 2 * thickness}, ${w.height - 2 * thickness}, ${Math.max(0, radius - thickness)}, ${bgColor});`);
                if (ensureHex(p.background_color) !== "black" && ensureHex(p.background_color) !== "#000000") {
                    addDitherMask(lines, p.background_color || "black", isEpaper, w.x + thickness, w.y + thickness, w.width - 2 * thickness, w.height - 2 * thickness, Math.max(0, radius - thickness));
                }
            } else {
                lines.push(`          draw_filled_rrect(${w.x}, ${w.y}, ${w.width}, ${w.height}, ${radius}, ${bgColor});`);
                addDitherMask(lines, p.background_color || "black", isEpaper, w.x, w.y, w.width, w.height, radius);
            }
        } else if (thickness > 0) {
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
    } else if (thickness > 0) {
        addDitherMask(lines, p.border_color || "white", isEpaper, w.x, w.y, w.width, w.height, radius);
    }

    let effectiveColor = color;
    if (isEpaper && (p.color === "gray" || p.color === "grey" || p.color === "#808080" || p.color === "#a0a0a0") &&
        (p.background_color === "black" || p.background_color === "#000000")) {
        effectiveColor = "color_on";
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
        const idExists = (id) => {
            if (id === "battery_level" && context.profile?.pins?.batteryAdc) return true;
            if (p.wifi_is_local && id === wifiId) return true;
            if (p.temp_is_local && id === tempId) return true;
            if (p.hum_is_local && id === humId) return true;
            if (p.bat_is_local && id === batId) return true;
            return context.seenSensorIds && context.seenSensorIds.has(id);
        };

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
            const unit = p.temp_unit || "\u00B0C";
            const body = [];
            if (tempId && idExists(tempId)) {
                body.push(`            if (id(${tempId}).has_state() && !std::isnan(id(${tempId}).state)) {`);
                if (unit === "\u00B0F" || unit === "F") {
                    body.push(`              it.printf(${Math.round(currentX)} + 4, ${Math.round(centerY)}, id(${textFontRef}), ${effectiveColor}, TextAlign::CENTER_LEFT, "%.1f\u00B0F", id(${tempId}).state * 9.0 / 5.0 + 32.0);`);
                } else {
                    body.push(`              it.printf(${Math.round(currentX)} + 4, ${Math.round(centerY)}, id(${textFontRef}), ${effectiveColor}, TextAlign::CENTER_LEFT, "%.1f\u00B0C", id(${tempId}).state);`);
                }
                body.push(`            } else {`);
                body.push(`              it.printf(${Math.round(currentX)} + 4, ${Math.round(centerY)}, id(${textFontRef}), ${effectiveColor}, TextAlign::CENTER_LEFT, "--${unit}");`);
                body.push(`            }`);
            } else {
                body.push(`            it.printf(${Math.round(currentX)} + 4, ${Math.round(centerY)}, id(${textFontRef}), ${effectiveColor}, TextAlign::CENTER_LEFT, "--${unit}");`);
            }
            pushSensorValue(lines, iconFontRef, textFontRef, effectiveColor, currentX, centerY, "\\U000F050F", body);
            currentX += spacing;
        }

        if (showHum) {
            const body = humId && idExists(humId)
                ? [
                    `            if (id(${humId}).has_state()) it.printf(${Math.round(currentX)} + 4, ${Math.round(centerY)}, id(${textFontRef}), ${effectiveColor}, TextAlign::CENTER_LEFT, "%.0f%%", id(${humId}).state);`,
                    `            else it.printf(${Math.round(currentX)} + 4, ${Math.round(centerY)}, id(${textFontRef}), ${effectiveColor}, TextAlign::CENTER_LEFT, "--%%");`
                ]
                : [`            it.printf(${Math.round(currentX)} + 4, ${Math.round(centerY)}, id(${textFontRef}), ${effectiveColor}, TextAlign::CENTER_LEFT, "--%%");`];
            pushSensorValue(lines, iconFontRef, textFontRef, effectiveColor, currentX, centerY, "\\U000F058E", body);
            currentX += spacing;
        }

        if (showBat) {
            lines.push(`          {`);
            lines.push(`            const char* bat_icon = "\\U000F0082";`);
            if (batId && idExists(batId)) {
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
}

export function exportLVGL(w, { common, convertColor, getLVGLFont, profile }) {
    const p = w.props || {};
    const color = convertColor(ensureHex(p.color || "white"));
    const showBackground = p.show_background !== false;
    const iconSize = parseInt(p.icon_size || 20, 10);
    const fontSize = parseInt(p.font_size || 14, 10);
    const fontFamily = p.font_family || "Roboto";
    const fontWeight = clampFontWeight(fontFamily, parseInt(p.font_weight || 400, 10) || 400);
    const iconFont = getLVGLFont("Material Design Icons", iconSize, 400);
    const textFont = getLVGLFont(fontFamily, fontSize, fontWeight);
    const widgets = [];

    if (p.show_wifi !== false) {
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
                width: "SIZE_CONTENT",
                height: "SIZE_CONTENT",
                bg_opa: "transp",
                border_width: 0,
                layout: { type: "flex", flex_flow: "row", flex_align_main: "center", flex_align_cross: "center" },
                pad_all: 0,
                widgets: [
                    { label: { text: iconL, text_font: iconFont, text_color: color } },
                    {
                        label: {
                            text: buildLvglSensorTextLambda("id(wifi_signal_dbm).has_state()", "%.0fdB", "id(wifi_signal_dbm).state", "--dB"),
                            text_font: textFont,
                            text_color: color,
                            x: 4
                        }
                    }
                ]
            }
        });
    }

    if (p.show_temperature !== false) {
        let baseTempId = p.temp_entity || "";
        if (p.temp_is_local) baseTempId = profile.features?.sht4x ? "sht4x_temperature" : profile.features?.sht3x || profile.features?.sht3xd ? "sht3x_temperature" : profile.features?.shtc3 ? "shtc3_temperature" : (p.temp_entity || "internal_temp");
        const tempId = baseTempId ? baseTempId.replace(/[^a-zA-Z0-9_]/g, "_") : "";
        const unit = p.temp_unit || "\u00B0C";
        const tempExpr = unit === "\u00B0F" ? `(id(${tempId}).state * 9.0 / 5.0 + 32.0)` : `id(${tempId}).state`;
        const tempText = tempId
            ? buildLvglSensorTextLambda(`id(${tempId}).has_state()`, `%.1f${unit}`, tempExpr, `--${unit}`)
            : `"--${unit}"`;
        widgets.push({ obj: { width: "SIZE_CONTENT", height: "SIZE_CONTENT", bg_opa: "transp", border_width: 0, layout: { type: "flex", flex_flow: "row", flex_align_main: "center", flex_align_cross: "center" }, pad_all: 0, widgets: [{ label: { text: '"\\U000F050F"', text_font: iconFont, text_color: color } }, { label: { text: tempText, text_font: textFont, text_color: color, x: 4 } }] } });
    }

    if (p.show_humidity !== false) {
        let baseHumId = p.hum_entity || "";
        if (p.hum_is_local) baseHumId = profile.features?.sht4x ? "sht4x_humidity" : profile.features?.sht3x || profile.features?.sht3xd ? "sht3x_humidity" : profile.features?.shtc3 ? "shtc3_humidity" : (p.hum_entity || "");
        const humId = baseHumId ? baseHumId.replace(/[^a-zA-Z0-9_]/g, "_") : "";
        const humText = humId
            ? buildLvglSensorTextLambda(`id(${humId}).has_state()`, "%.0f%%", `id(${humId}).state`, "--%%")
            : `"--%%"`;
        widgets.push({ obj: { width: "SIZE_CONTENT", height: "SIZE_CONTENT", bg_opa: "transp", border_width: 0, layout: { type: "flex", flex_flow: "row", flex_align_main: "center", flex_align_cross: "center" }, pad_all: 0, widgets: [{ label: { text: '"\\U000F058E"', text_font: iconFont, text_color: color } }, { label: { text: humText, text_font: textFont, text_color: color, x: 4 } }] } });
    }

    if (p.show_battery !== false) {
        const baseBatId = p.bat_is_local ? "battery_level" : (p.bat_entity || "");
        const batId = baseBatId ? baseBatId.replace(/[^a-zA-Z0-9_]/g, "_") : "";
        let batIconL = '"\\U000F0082"';
        let batText = '"--%%"';
        if (batId) {
            batIconL = '!lambda |-\n';
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
            batText = buildLvglSensorTextLambda(`id(${batId}).has_state()`, "%.0f%%", `id(${batId}).state`, "--%%");
        }
        widgets.push({ obj: { width: "SIZE_CONTENT", height: "SIZE_CONTENT", bg_opa: "transp", border_width: 0, layout: { type: "flex", flex_flow: "row", flex_align_main: "center", flex_align_cross: "center" }, pad_all: 0, widgets: [{ label: { text: batIconL, text_font: iconFont, text_color: color } }, { label: { text: batText, text_font: textFont, text_color: color, x: 4 } }] } });
    }

    return {
        obj: {
            ...common,
            ...(showBackground ? {
                bg_color: convertColor(ensureHex(p.background_color || "black")),
                radius: p.border_radius || 8,
                clip_corner: true,
                border_width: p.border_thickness || 0,
                border_color: convertColor(ensureHex(p.border_color || "white"))
            } : {
                radius: 0,
                clip_corner: false,
                border_width: 0
            }),
            bg_opa: showBackground ? "cover" : "transp",
            layout: { type: "flex", flex_flow: "row", flex_align_main: "space_around", flex_align_cross: "center" },
            widgets
        }
    };
}

export function onExportNumericSensors(context) {
    const { lines, widgets, isLvgl, pendingTriggers, profile } = context;
    const barWidgets = widgets.filter((w) => w.type === "template_sensor_bar");
    if (barWidgets.length === 0) return;

    const registerHaSensor = (seenSensorIds, entityId) => {
        if (!entityId || !entityId.includes(".") || entityId.startsWith("text_sensor.") || entityId.startsWith("binary_sensor.")) return;
        const safeId = entityId.replace(/[^a-zA-Z0-9_]/g, "_");
        if (seenSensorIds && !seenSensorIds.has(safeId)) {
            seenSensorIds.add(safeId);
            lines.push("- platform: homeassistant", `  id: ${safeId}`, `  entity_id: ${entityId}`, "  internal: true");
        }
    };

    barWidgets.forEach((w) => {
        const p = w.props || {};
        const checkLines = context.mainLines || lines;
        const addTrigger = (entityId) => {
            if (!entityId || !isLvgl || !pendingTriggers) return;
            if (!pendingTriggers.has(entityId)) pendingTriggers.set(entityId, new Set());
            pendingTriggers.get(entityId).add(`- lvgl.widget.refresh: ${w.id}`);
        };

        if (p.show_wifi !== false) {
            let entityId = p.wifi_entity || "wifi_signal_dbm";
            if (entityId.includes(".") && !entityId.startsWith("text_sensor.")) {
                if (!entityId.includes(".")) entityId = `sensor.${entityId}`;
            }
            addTrigger(entityId);
            if (!p.wifi_entity) {
                const alreadyDefined = context.seenSensorIds && context.seenSensorIds.has("wifi_signal_dbm");
                if (!alreadyDefined && !checkLines.some((line) => line.includes("id: wifi_signal_dbm")) && !lines.some((line) => line.includes("id: wifi_signal_dbm"))) {
                    if (context.seenSensorIds) context.seenSensorIds.add("wifi_signal_dbm");
                    lines.push("- platform: wifi_signal", "  id: wifi_signal_dbm", "  internal: true");
                }
            } else if (p.wifi_entity.includes(".")) {
                registerHaSensor(context.seenSensorIds, p.wifi_entity);
            }
        }

        if (p.show_temperature !== false && p.temp_is_local) {
            const hasSHT = profile.features?.sht4x || profile.features?.sht3x || profile.features?.sht3xd || profile.features?.shtc3;
            if (!hasSHT) {
                const customId = (p.temp_entity || "internal_temp").replace(/[^a-zA-Z0-9_]/g, "_");
                if (context.seenSensorIds && !context.seenSensorIds.has(customId)) {
                    context.seenSensorIds.add(customId);
                    lines.push("- platform: internal_temperature", '  name: "Internal Temperature"', `  id: ${customId}`, '  entity_category: "diagnostic"');
                }
            }
        }

        if (p.show_temperature !== false && p.temp_entity && !p.temp_is_local) {
            let entityId = p.temp_entity;
            if (!entityId.includes(".")) entityId = `sensor.${entityId}`;
            registerHaSensor(context.seenSensorIds, entityId);
            addTrigger(entityId);
        }

        if (p.show_humidity !== false && p.hum_entity && !p.hum_is_local) {
            let entityId = p.hum_entity;
            if (!entityId.includes(".")) entityId = `sensor.${entityId}`;
            registerHaSensor(context.seenSensorIds, entityId);
            addTrigger(entityId);
        }

        if (p.show_battery !== false && p.bat_entity && !p.bat_is_local) {
            let entityId = p.bat_entity;
            if (!entityId.includes(".")) entityId = `sensor.${entityId}`;
            registerHaSensor(context.seenSensorIds, entityId);
            addTrigger(entityId);
        }
    });
}

export function collectRequirements(widget, context) {
    const { trackIcon, addFont } = context;
    const p = widget.props || {};
    const iconSize = parseInt(p.icon_size || 20, 10);
    const fontSize = parseInt(p.font_size || 14, 10);
    const fontFamily = p.font_family || "Roboto";
    const fontWeight = clampFontWeight(fontFamily, parseInt(p.font_weight || 400, 10) || 400);
    addFont("Material Design Icons", 400, iconSize);
    addFont(fontFamily, fontWeight, fontSize);
    if (p.show_wifi !== false) ["F092B", "F091F", "F0922", "F0925", "F0928"].forEach((code) => trackIcon(code, iconSize));
    if (p.show_temperature !== false) ["F050F"].forEach((code) => trackIcon(code, iconSize));
    if (p.show_humidity !== false) ["F058E"].forEach((code) => trackIcon(code, iconSize));
    if (p.show_battery !== false) ["F0079", "F0082", "F0081", "F0080", "F007F", "F007E", "F007D", "F007C", "F007B", "F007A", "F0083"].forEach((code) => trackIcon(code, iconSize));
}
