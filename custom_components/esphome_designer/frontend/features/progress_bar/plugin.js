import { TemplateConverter } from '../../js/utils/template_converter.js';
import { renderProgressBar } from './render.js';
import { renderProgressBarProperties } from './properties.js';

const render = renderProgressBar;

const exportLVGL = (w, { common, convertColor }) => {
    const p = w.props || {};
    let barValue = p.value || 0;
    if (w.entity_id) {
        const safeId = w.entity_id.replace(/[^a-zA-Z0-9_]/g, "_");
        barValue = `!lambda "return id(${safeId}).state;"`;
    }
    return {
        bar: {
            ...common,
            min_value: p.min !== undefined ? p.min : 0,
            max_value: p.max !== undefined ? p.max : 100,
            value: barValue,
            bg_color: convertColor(p.bg_color || "white"),
            indicator: { bg_color: convertColor(p.color) },
            mode: p.mode || "normal"
        }
    };
};

const exportDoc = (w, context) => {
    const {
        lines, addFont, getColorConst, addDitherMask, getCondProps, getConditionCheck, isEpaper, sanitize // eslint-disable-line no-unused-vars
    } = context;

    const p = w.props || {};
    let entityId = (w.entity_id || "").trim();
    const title = sanitize(w.title || "");
    const showLabel = p.show_label !== false;
    const showPercentage = p.show_percentage !== false;
    const barHeight = parseInt(p.bar_height || 15, 10);
    const colorProp = p.color || "theme_auto";
    const orientation = p.orientation || "horizontal";
    const isVertical = orientation === "vertical";
    const fontSize = p.font_size || 12;
    const textAlign = p.text_align || "CENTER";
    const min = parseFloat(p.min !== undefined ? p.min : 0);
    const max = parseFloat(p.max !== undefined ? p.max : 100);

    const getDynamicColor = (c) => {
        if (c === "theme_auto") return "color_on";
        if (c === "white" || c === "#ffffff") return "color_off";
        if (c === "black" || c === "#000000") return "color_on";
        return getColorConst(c);
    };

    const color = getDynamicColor(colorProp);
    const fontId = addFont("Roboto", 400, fontSize);

    // Ensure sensor. prefix if missing and it's not a local sensor or mqtt entity
    if (entityId && !p.is_local_sensor && !entityId.includes(".") && !entityId.toLowerCase().startsWith("mqtt:")) {
        entityId = `sensor.${entityId}`;
    }


    // Background fill
    const bgColorProp = p.bg_color || p.background_color || "transparent";
    if (bgColorProp && bgColorProp !== "transparent") {
        const bgColorConst = getDynamicColor(bgColorProp);
        lines.push(`        it.filled_rectangle(${w.x}, ${w.y}, ${w.width}, ${w.height}, ${bgColorConst});`);
    }

    const cond = getConditionCheck(w);
    if (cond) lines.push(`        ${cond}`);

    const sensorId = p.is_local_sensor ? (entityId || "battery_level") : (entityId ? entityId.replace(/[^a-zA-Z0-9_]/g, "_") : "");

    if (sensorId) {
        const idSuffix = w.id.replace(/-/g, '_');
        lines.push(`        float val_${idSuffix} = id(${sensorId}).state;`);
        lines.push(`        if (std::isnan(val_${idSuffix})) val_${idSuffix} = ${min};`);
        lines.push(`        float range_${idSuffix} = ${max} - ${min};`);
        lines.push(`        int pct_${idSuffix} = (range_${idSuffix} == 0) ? 0 : (int)((val_${idSuffix} - ${min}) / range_${idSuffix} * 100);`);
        lines.push(`        if (pct_${idSuffix} < 0) pct_${idSuffix} = 0;`);
        lines.push(`        if (pct_${idSuffix} > 100) pct_${idSuffix} = 100;`);

        if (isVertical) {
            if (showLabel && title) {
                lines.push(`        it.printf(${w.x} + ${w.width}/2, ${w.y}, id(${fontId}), ${color}, TextAlign::TOP_CENTER, "${title}");`);
            }
            if (showPercentage) {
                lines.push(`        it.printf(${w.x} + ${w.width}/2, ${w.y} + ${w.height} - ${fontSize}, id(${fontId}), ${color}, TextAlign::TOP_CENTER, "%d%%", pct_${idSuffix});`);
            }
            // Vertical bar
            const barX = Math.round(w.x + (w.width - barHeight) / 2);
            const hasLabel = showLabel && title;
            const barStartY = w.y + (hasLabel ? fontSize + 2 : 0);
            const barEndY = w.y + w.height - (showPercentage ? fontSize + 2 : 0);
            const totalBarH = barEndY - barStartY;

            lines.push(`        it.rectangle(${barX}, ${barStartY}, ${barHeight}, ${totalBarH}, ${color});`);
            lines.push(`        if (pct_${idSuffix} > 0) {`);
            lines.push(`          int bar_h = (${totalBarH} - 4) * pct_${idSuffix} / 100;`);
            lines.push(`          it.filled_rectangle(${barX + 2}, ${barStartY} + ${totalBarH} - 2 - bar_h, ${barHeight - 4}, bar_h, ${color});`);
            lines.push(`        }`);
        } else {
            // When both label AND percentage are shown, they must be spatially separated:
            // label on left side, percentage on right side (like the canvas preview's space-between).
            // When only one is shown, textAlign controls its position.
            const bothShown = (showLabel && title) && showPercentage;

            if (showLabel && title) {
                let labelAlign, labelX;
                if (bothShown) {
                    labelAlign = "TextAlign::TOP_LEFT";
                    labelX = `${w.x}`;
                } else if (textAlign === "CENTER") {
                    labelAlign = "TextAlign::TOP_CENTER";
                    labelX = `${w.x} + ${w.width} / 2`;
                } else if (textAlign === "RIGHT") {
                    labelAlign = "TextAlign::TOP_RIGHT";
                    labelX = `${w.x} + ${w.width}`;
                } else {
                    labelAlign = "TextAlign::TOP_LEFT";
                    labelX = `${w.x}`;
                }
                lines.push(`        it.printf(${labelX}, ${w.y}, id(${fontId}), ${color}, ${labelAlign}, "${title}");`);
            }
            if (showPercentage) {
                let pctAlign, pctX;
                if (bothShown) {
                    pctAlign = "TextAlign::TOP_RIGHT";
                    pctX = `${w.x} + ${w.width}`;
                } else if (textAlign === "CENTER") {
                    pctAlign = "TextAlign::TOP_CENTER";
                    pctX = `${w.x} + ${w.width} / 2`;
                } else if (textAlign === "LEFT") {
                    pctAlign = "TextAlign::TOP_LEFT";
                    pctX = `${w.x}`;
                } else {
                    pctAlign = "TextAlign::TOP_RIGHT";
                    pctX = `${w.x} + ${w.width}`;
                }
                lines.push(`        it.printf(${pctX}, ${w.y}, id(${fontId}), ${color}, ${pctAlign}, "%d%%", pct_${idSuffix});`);
            }
            const barY = w.y + (w.height - barHeight);
            lines.push(`        it.rectangle(${w.x}, ${barY}, ${w.width}, ${barHeight}, ${color});`);
            lines.push(`        if (pct_${idSuffix} > 0) {`);
            lines.push(`          int bar_w = (${w.width} - 4) * pct_${idSuffix} / 100;`);
            lines.push(`          it.filled_rectangle(${w.x} + 2, ${barY} + 2, bar_w, ${barHeight} - 4, ${color});`);
            lines.push(`        }`);
        }
        addDitherMask(lines, colorProp, isEpaper, w.x, w.y, w.width, w.height, 2);
    } else {
        lines.push(`        it.rectangle(${w.x}, ${w.y} + ${w.height} - ${barHeight}, ${w.width}, ${barHeight}, ${color});`);
        lines.push(`        it.filled_rectangle(${w.x} + 2, ${w.y} + ${w.height} - ${barHeight} + 2, ${w.width} / 2, ${barHeight} - 4, ${color});`);
        if (showLabel && title) {
            lines.push(`        it.printf(${w.x}, ${w.y}, id(${fontId}), ${color}, TextAlign::TOP_LEFT, "${title}");`);
        }
    }

    if (cond) lines.push(`        }`);
};

const onExportNumericSensors = (context) => {
    const { lines, widgets, isLvgl, pendingTriggers } = context; // eslint-disable-line no-unused-vars
    if (!widgets || widgets.length === 0) return;

    for (const w of widgets) {
        if (w.type !== "progress_bar") continue;

        let entityId = (w.entity_id || "").trim();
        const p = w.props || {};
        if (!entityId || p.is_local_sensor) continue;

        // Ensure sensor. prefix if missing
        if (!entityId.includes(".") && !entityId.toLowerCase().startsWith("mqtt:")) {
            entityId = `sensor.${entityId}`;
        }

        if (isLvgl && pendingTriggers) {
            if (!pendingTriggers.has(entityId)) {
                pendingTriggers.set(entityId, new Set());
            }
            pendingTriggers.get(entityId).add(`- lvgl.widget.refresh: ${w.id}`);
        }
    }
};

export default {
    id: "progress_bar",
    name: "Progress Bar",
    category: "Advanced",
    supportedModes: ['lvgl', 'direct', 'oepl', 'opendisplay'],
    defaults: {
        show_label: true,
        show_percentage: true,
        bar_height: 15,
        entity_id: "",
        border_width: 1,
        color: "theme_auto",
        bg_color: "white",
        min: 0,
        max: 100,
        orientation: "horizontal",
        font_size: 12,
        text_align: "CENTER",
        mode: "normal",
        is_local_sensor: false,
        opa: 255,
        opacity: 255
    },
    renderProperties: renderProgressBarProperties,
    render,
    exportOpenDisplay: (w, { _layout, _page }) => {
        const p = w.props || {};
        const entityId = (w.entity_id || "").trim();
        const min = parseFloat(p.min !== undefined ? p.min : 0);
        const max = parseFloat(p.max !== undefined ? p.max : 100);
        const template = TemplateConverter.toHATemplate(entityId, { precision: 0, isNumeric: true });
        const color = p.color || "black";

        // Convert to percentage for OpenDisplay if it expects 0-100
        const pctTemplate = template ? `{{ ((${template} - ${min}) / (${max} - ${min}) * 100) | round(0) }}` : 50;

        return {
            type: "progress_bar",
            x_start: Math.round(w.x),
            y_start: Math.round(w.y),
            x_end: Math.round(w.x + w.width),
            y_end: Math.round(w.y + w.height),
            progress: pctTemplate,
            background: p.bg_color || "white",
            fill: color,
            outline: p.border_color || color,
            width: p.border_width || 1,
            direction: p.orientation === "vertical" ? "up" : "right",
            show_percentage: p.show_percentage !== false
        };
    },
    exportOEPL: (w, { _layout, _page }) => {
        const p = w.props || {};
        const entityId = (w.entity_id || "").trim();
        const title = w.title || "";
        const showLabel = p.show_label !== false;
        const showPercentage = p.show_percentage !== false;
        const barHeight = parseInt(p.bar_height || 15, 10);
        const color = p.color || "black";
        const min = parseFloat(p.min !== undefined ? p.min : 0);
        const max = parseFloat(p.max !== undefined ? p.max : 100);
        const orientation = p.orientation || "horizontal";
        const isVertical = orientation === "vertical";
        const fontSize = p.font_size || 12;

        const elements = [];
        const template = TemplateConverter.toHATemplate(entityId, { precision: 0, isNumeric: true });
        const pctTemplate = template ? `{{ ((${template} - ${min}) / (${max} - ${min}) * 100) | round(0) }}` : 50;

        if (isVertical) {
            if (showLabel && title) {
                elements.push({
                    type: "text",
                    value: title,
                    x: Math.round(w.x + w.width / 2),
                    y: Math.round(w.y),
                    size: fontSize,
                    color: color,
                    anchor: "mt"
                });
            }
            if (showPercentage) {
                elements.push({
                    type: "text",
                    value: `${pctTemplate}%`,
                    x: Math.round(w.x + w.width / 2),
                    y: Math.round(w.y + w.height),
                    size: fontSize,
                    color: color,
                    anchor: "mb"
                });
            }
            const barStartY = Math.round(w.y + (showLabel ? fontSize + 2 : 0));
            const barEndY = Math.round(w.y + w.height - (showPercentage ? fontSize + 2 : 0));
            elements.push({
                type: "progress",
                x_start: Math.round(w.x + (w.width - barHeight) / 2),
                y_start: barStartY,
                x_end: Math.round(w.x + (w.width + barHeight) / 2),
                y_end: barEndY,
                value: pctTemplate,
                color: color,
                outline: color,
                fill: color,
                width: 1,
                direction: "up"
            });
        } else {
            // Horizontal
            if (showLabel && title) {
                elements.push({
                    type: "text",
                    value: title,
                    x: Math.round(w.x),
                    y: Math.round(w.y),
                    size: fontSize,
                    color: color,
                    anchor: "lt"
                });
            }
            if (showPercentage) {
                elements.push({
                    type: "text",
                    value: `${pctTemplate}%`,
                    x: Math.round(w.x + w.width),
                    y: Math.round(w.y),
                    size: fontSize,
                    color: color,
                    align: "right",
                    anchor: "rt"
                });
            }
            const barY = Math.round(w.y + (w.height - barHeight));
            elements.push({
                type: "progress",
                x_start: Math.round(w.x),
                y_start: barY,
                x_end: Math.round(w.x + w.width),
                y_end: Math.round(barY + barHeight),
                value: pctTemplate,
                color: color,
                outline: color,
                fill: color,
                width: 1
            });
        }

        return elements;
    },
    exportLVGL,
    export: exportDoc,
    onExportNumericSensors
};




