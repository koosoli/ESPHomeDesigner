/**
 * Progress Bar Plugin
 */

const render = (el, widget, tools) => {
    const props = widget.props || {};
    const { getColorStyle } = tools;
    const entityId = widget.entity_id || "";
    const label = widget.title || "";
    const showLabel = props.show_label !== false && props.show_label !== "false";
    const showPercentage = props.show_percentage !== false && props.show_percentage !== "false";
    const barHeight = props.bar_height || 15;
    const borderWidth = props.border_width || 1;
    const color = props.color || "black";
    const colorStyle = getColorStyle(color);

    let percentValue = 50;

    if (window.AppState && window.AppState.entityStates && entityId) {
        const stateSet = window.AppState.entityStates[entityId];
        const state = (stateSet && stateSet.state !== undefined) ? stateSet.state : null;
        if (state !== undefined && state !== null) {
            const numVal = parseFloat(String(state).replace(/[^0-9.-]/g, ''));
            if (!isNaN(numVal)) {
                percentValue = Math.max(0, Math.min(100, numVal));
            }
        }
    }

    el.innerHTML = "";
    el.style.display = "flex";
    el.style.flexDirection = "column";
    el.style.justifyContent = "center";
    el.style.gap = "4px";
    el.style.color = colorStyle;

    if (showLabel && (label || showPercentage)) {
        const labelRow = document.createElement("div");
        labelRow.style.display = "flex";
        labelRow.style.justifyContent = "space-between";
        labelRow.style.alignItems = "center";
        labelRow.style.fontSize = "12px";
        labelRow.style.paddingBottom = "2px";
        labelRow.style.width = "100%";

        if (label) {
            const labelSpan = document.createElement("span");
            labelSpan.textContent = label;
            labelRow.appendChild(labelSpan);
        }

        if (showPercentage) {
            const pctSpan = document.createElement("span");
            pctSpan.textContent = Math.round(percentValue) + "%";
            labelRow.appendChild(pctSpan);
        }

        el.appendChild(labelRow);
    }

    const barContainer = document.createElement("div");
    barContainer.style.width = "100%";
    barContainer.style.height = `${barHeight}px`;
    barContainer.style.border = `${borderWidth}px solid ${colorStyle}`;
    barContainer.style.borderRadius = "2px";
    barContainer.style.position = "relative";
    barContainer.style.overflow = "hidden";
    barContainer.style.backgroundColor = color === "white" ? "#000" : "#fff";

    const barFill = document.createElement("div");
    barFill.style.width = `${percentValue}%`;
    barFill.style.height = "100%";
    barFill.style.backgroundColor = colorStyle;
    barFill.style.transition = "width 0.3s ease";

    barContainer.appendChild(barFill);
    el.appendChild(barContainer);
};

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
            min_value: p.min || 0,
            max_value: p.max || 100,
            value: barValue,
            bg_color: convertColor(p.bg_color || "white"),
            indicator: { bg_color: convertColor(p.color) },
            mode: p.mode || "NORMAL"
        }
    };
};

const exportDoc = (w, context) => {
    const {
        lines, addFont, getColorConst, addDitherMask, getCondProps, getConditionCheck, isEpaper, sanitize
    } = context;

    const p = w.props || {};
    const entityId = (w.entity_id || "").trim();
    const title = sanitize(w.title || "");
    const showLabel = p.show_label !== false;
    const showPercentage = p.show_percentage !== false;
    const barHeight = parseInt(p.bar_height || 15, 10);
    const colorProp = p.color || "black";
    const color = getColorConst(colorProp);

    const fontId = addFont("Roboto", 400, 12);

    lines.push(`        // widget:progress_bar id:${w.id} type:progress_bar x:${w.x} y:${w.y} w:${w.width} h:${w.height} entity:${entityId} title:"${title}" show_label:${showLabel} show_pct:${showPercentage} bar_height:${barHeight} color:${colorProp} local:${!!p.is_local_sensor} ${getCondProps(w)}`);

    const cond = getConditionCheck(w);
    if (cond) lines.push(`        ${cond}`);

    if (entityId) {
        const safeId = entityId.replace(/[^a-zA-Z0-9_]/g, "_");
        lines.push(`        float val_${w.id.replace(/-/g, '_')} = id(${safeId}).state;`);
        lines.push(`        if (std::isnan(val_${w.id.replace(/-/g, '_')})) val_${w.id.replace(/-/g, '_')} = 0;`);
        lines.push(`        int pct_${w.id.replace(/-/g, '_')} = (int)val_${w.id.replace(/-/g, '_')};`);
        lines.push(`        if (pct_${w.id.replace(/-/g, '_')} < 0) pct_${w.id.replace(/-/g, '_')} = 0;`);
        lines.push(`        if (pct_${w.id.replace(/-/g, '_')} > 100) pct_${w.id.replace(/-/g, '_')} = 100;`);

        if (showLabel && title) {
            lines.push(`        it.printf(${w.x}, ${w.y}, id(${fontId}), ${color}, TextAlign::TOP_LEFT, "${title}");`);
        }
        if (showPercentage) {
            lines.push(`        it.printf(${w.x} + ${w.width}, ${w.y}, id(${fontId}), ${color}, TextAlign::TOP_RIGHT, "%d%%", pct_${w.id.replace(/-/g, '_')});`);
        }

        const barY = w.y + (w.height - barHeight);
        lines.push(`        it.rectangle(${w.x}, ${barY}, ${w.width}, ${barHeight}, ${color});`);

        lines.push(`        if (pct_${w.id.replace(/-/g, '_')} > 0) {`);
        lines.push(`          int bar_w = (${w.width} - 4) * pct_${w.id.replace(/-/g, '_')} / 100;`);
        lines.push(`          it.filled_rectangle(${w.x} + 2, ${barY} + 2, bar_w, ${barHeight} - 4, ${color});`);
        lines.push(`        }`);
        addDitherMask(lines, colorProp, isEpaper, w.x, barY, w.width, barHeight);
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
    const { lines, widgets } = context;
    if (!widgets || widgets.length === 0) return;

    const processed = new Set();
    for (const w of widgets) {
        if (w.type !== "progress_bar") continue;

        const entityId = (w.entity_id || "").trim();
        const p = w.props || {};
        if (!entityId || p.is_local_sensor) continue;

        if (!processed.has(entityId)) {
            processed.add(entityId);
            const safeId = entityId.replace(/[^a-zA-Z0-9_]/g, "_");
            lines.push("- platform: homeassistant");
            lines.push(`  id: ${safeId}`);
            lines.push(`  entity_id: ${entityId}`);
            lines.push(`  internal: true`);
        }
    }
};

export default {
    id: "progress_bar",
    name: "Progress Bar",
    category: "Advanced",
    defaults: {
        show_label: true,
        show_percentage: true,
        bar_height: 15,
        border_width: 1,
        color: "black",
        bg_color: "white",
        min: 0,
        max: 100,
        mode: "NORMAL"
    },
    render,
    exportLVGL,
    export: exportDoc,
    onExportNumericSensors
};

