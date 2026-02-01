/**
 * LVGL Meter Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.style.width = "100%";
    svg.style.height = "100%";

    const cx = widget.width / 2;
    const cy = widget.height / 2;
    const padding = 10;
    const r = Math.min(cx, cy) - padding;

    const min = props.min || 0;
    const max = props.max || 100;
    const val = props.value !== undefined ? props.value : min;
    const scaleWidth = parseInt(props.scale_width || 10, 10);
    const indicatorWidth = parseInt(props.indicator_width || 4, 10);
    const tickCount = parseInt(props.tick_count || 11, 10);
    const tickLength = parseInt(props.tick_length || 10, 10);

    const startAngle = 135;
    const range = 270;
    const endAngle = startAngle + range;

    const toRad = (deg) => deg * (Math.PI / 180);
    const arcR = r - Math.max(scaleWidth, tickLength) / 2;

    const polarToX = (centerX, radius, angleDeg) => centerX + radius * Math.cos(toRad(angleDeg));
    const polarToY = (centerY, radius, angleDeg) => centerY + radius * Math.sin(toRad(angleDeg));

    const x1 = polarToX(cx, arcR, startAngle);
    const y1 = polarToY(cy, arcR, startAngle);
    const x2 = polarToX(cx, arcR, endAngle);
    const y2 = polarToY(cy, arcR, endAngle);

    const d = `M ${x1} ${y1} A ${arcR} ${arcR} 0 1 1 ${x2} ${y2}`;

    const bgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    bgPath.setAttribute("d", d);
    bgPath.setAttribute("fill", "none");
    bgPath.setAttribute("stroke", getColorStyle(props.bg_color || "lightgray"));
    bgPath.setAttribute("stroke-width", scaleWidth);
    bgPath.setAttribute("stroke-linecap", "round");
    svg.appendChild(bgPath);

    if (tickCount > 1) {
        const tickGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        tickGroup.setAttribute("stroke", getColorStyle(props.color || "black"));
        tickGroup.setAttribute("stroke-width", "2px");

        for (let i = 0; i < tickCount; i++) {
            const pct = i / (tickCount - 1);
            const angle = startAngle + (range * pct);
            const tx1 = polarToX(cx, arcR - scaleWidth / 2, angle);
            const ty1 = polarToY(cy, arcR - scaleWidth / 2, angle);
            const tx2 = polarToX(cx, arcR - scaleWidth / 2 - tickLength, angle);
            const ty2 = polarToY(cy, arcR - scaleWidth / 2 - tickLength, angle);

            const tick = document.createElementNS("http://www.w3.org/2000/svg", "line");
            tick.setAttribute("x1", tx1);
            tick.setAttribute("y1", ty1);
            tick.setAttribute("x2", tx2);
            tick.setAttribute("y2", ty2);
            tickGroup.appendChild(tick);
        }
        svg.appendChild(tickGroup);
    }

    let percentage = 0;
    if (max > min) {
        percentage = (val - min) / (max - min);
    }
    const needleAngle = startAngle + (range * percentage);

    const nx = polarToX(cx, arcR - 10, needleAngle);
    const ny = polarToY(cy, arcR - 10, needleAngle);

    const needle = document.createElementNS("http://www.w3.org/2000/svg", "line");
    needle.setAttribute("x1", cx);
    needle.setAttribute("y1", cy);
    needle.setAttribute("x2", nx);
    needle.setAttribute("y2", ny);
    needle.setAttribute("stroke", getColorStyle(props.indicator_color || "red"));
    needle.setAttribute("stroke-width", indicatorWidth);
    needle.setAttribute("stroke-linecap", "round");
    svg.appendChild(needle);

    const pivot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    pivot.setAttribute("cx", cx);
    pivot.setAttribute("cy", cy);
    pivot.setAttribute("r", indicatorWidth);
    pivot.setAttribute("fill", getColorStyle(props.indicator_color || "red"));
    svg.appendChild(pivot);

    el.innerHTML = "";
    el.appendChild(svg);
    el.style.opacity = (props.opa !== undefined ? props.opa : 255) / 255;
};

const exportLVGL = (w, { common, convertColor, formatOpacity }) => {
    const p = w.props || {};
    let meterValue = p.value || 0;
    if (w.entity_id) {
        const safeId = w.entity_id.replace(/[^a-zA-Z0-9_]/g, "_");
        meterValue = `!lambda "return id(${safeId}).state;"`;
    }

    const tickCount = parseInt(p.tick_count || 11, 10);
    const tickLength = parseInt(p.tick_length || 10, 10);
    const scaleWidth = parseInt(p.scale_width || 10, 10);
    const labelGap = parseInt(p.label_gap || 10, 10);

    return {
        meter: {
            ...common,
            bg_color: convertColor(p.bg_color || "lightgray"),
            opa: formatOpacity(p.opa),
            scales: [{
                range_from: p.min || 0,
                range_to: p.max || 100,
                angle_range: 270,
                rotation: 135,
                ticks: {
                    count: tickCount,
                    length: tickLength,
                    width: 2,
                    color: convertColor(p.color || "black"),
                    major: {
                        stride: Math.max(1, Math.floor(tickCount / 5)),
                        length: tickLength + 5,
                        width: 3,
                        color: convertColor(p.color || "black"),
                        label_gap: labelGap
                    }
                },
                indicators: [{
                    line: {
                        id: `${w.id}_ind`,
                        value: meterValue,
                        color: convertColor(p.indicator_color || "red"),
                        width: parseInt(p.indicator_width || 4, 10),
                        r_mod: -scaleWidth
                    }
                }]
            }]
        }
    };
};

const onExportNumericSensors = (context) => {
    const { widgets, isLvgl, pendingTriggers } = context;
    if (!widgets) return;

    for (const w of widgets) {
        if (w.type !== "lvgl_meter") continue;

        let entityId = (w.entity_id || w.props?.entity_id || "").trim();
        if (!entityId) continue;

        // Ensure sensor. prefix if missing
        if (!entityId.includes(".")) {
            entityId = `sensor.${entityId}`;
        }

        if (isLvgl && pendingTriggers) {
            if (!pendingTriggers.has(entityId)) {
                pendingTriggers.set(entityId, new Set());
            }
            pendingTriggers.get(entityId).add(`- lvgl.indicator.update:\n          id: ${w.id}_ind\n          value: !lambda "return x;"`);
        }

        // We let the safety fix handle the sensor generation for HA entities.
        // It will deduplicate and merge triggers automatically.
    }
};

export default {
    id: "lvgl_meter",
    name: "Meter",
    category: "LVGL",
    defaults: {
        width: 140,
        height: 140,
        value: 0,
        min: 0,
        max: 100,
        bg_color: "lightgray",
        color: "black",
        indicator_color: "red",
        opa: 255
    },
    render,
    exportLVGL,
    onExportNumericSensors
};
