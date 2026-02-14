/**
 * LVGL Arc Plugin
 */

const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
    var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
    return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
    };
};

const startToPath = (x, y, r, startAngle, endAngle) => {
    const start = polarToCartesian(x, y, r, endAngle);
    const end = polarToCartesian(x, y, r, startAngle);

    let diff = endAngle - startAngle;
    while (diff < 0) diff += 360;
    while (diff >= 360) diff -= 360;

    const largeArcFlag = diff <= 180 ? "0" : "1";
    return [
        "M", start.x, start.y,
        "A", r, r, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
};

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const width = widget.width || 100;
    const height = widget.height || 100;
    const color = getColorStyle(props.color || "black");
    const thickness = parseInt(props.thickness || 10, 10);

    el.innerHTML = "";
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.style.overflow = "visible";

    const cx = width / 2;
    const cy = height / 2;
    const radius = Math.min(width, height) / 2 - thickness / 2;

    // Default to LVGL defaults (135 -> 45) if not set
    const pStart = props.start_angle !== undefined ? parseInt(props.start_angle) : 135;
    const pEnd = props.end_angle !== undefined ? parseInt(props.end_angle) : 45;

    // Convert LVGL angles (0=Right) to Plugin/SVG angles (0=Top implicitly in polarToCartesian with -90)
    // Actually, polarToCartesian(..., deg) does (deg-90).
    // If we want 0 -> Right.
    // Right is x+, y0.
    // cos(0) = 1.
    // If input is 0. (0-90) = -90. cos(-90)=0. X=0. Incorrect.
    // So we need to add 90 to LVGL angle before passing to polarToCartesian?
    // 0 + 90 = 90. (90-90)=0. cos(0)=1. Correct.
    const startAngle = pStart + 90;
    const endAngle = pEnd + 90;

    const bgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    // We draw from startAngle to endAngle (Counter-Clockwise visual in SVG path command? No, A command is usually wrapper dependent).
    // startToPath draws from endAngle param to startAngle param.
    // If we want arc from Start -> End (Clockwise),
    // and startToPath draws (End -> Start) which is usually CCW in SVG 'A'?
    // Wait. A command with sweep-flag 0 (default in startToPath?)
    // Let's stick to the logic:
    // startToPath(..., start, end) calculates flag based on (end - start).
    // It draws M (end point) -> A (start point). 
    // This is CCW?
    // If LVGL arc is CW (Start -> End).
    // We want to draw path matching that.

    bgPath.setAttribute("d", startToPath(cx, cy, radius, startAngle, endAngle));
    bgPath.setAttribute("fill", "none");
    bgPath.setAttribute("stroke", "#eee");
    bgPath.setAttribute("stroke-width", thickness);
    bgPath.setAttribute("stroke-linecap", "round");
    svg.appendChild(bgPath);

    const min = props.min || 0;
    const max = props.max || 100;
    let val = props.value !== undefined ? props.value : 50;

    const entityId = widget.entity_id;
    if (entityId && window.AppState && window.AppState.entityStates) {
        const stateObj = window.AppState.entityStates[entityId];
        if (stateObj && stateObj.state !== undefined) {
            const parsed = parseFloat(stateObj.state);
            if (!isNaN(parsed)) {
                val = parsed;
            }
        }
    }

    val = Math.max(min, Math.min(max, val));

    // Calculate span
    let angleSpan = pEnd - pStart;
    while (angleSpan < 0) angleSpan += 360;
    while (angleSpan >= 360) angleSpan -= 360; // Should be < 360 for full circle check?
    // LVGL full circle is unlikely implicitly, usually 0-360.

    let percentage = 0;
    if (max > min) {
        percentage = (val - min) / (max - min);
    }

    if (percentage > 0.001) {
        const currentSpan = angleSpan * percentage;
        const valEndRaw = pStart + currentSpan; // LVGL angle
        const valEndAngle = valEndRaw + 90; // Converted

        const valPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        valPath.setAttribute("d", startToPath(cx, cy, radius, startAngle, valEndAngle));
        valPath.setAttribute("fill", "none");
        valPath.setAttribute("stroke", color);
        valPath.setAttribute("stroke-width", thickness);
        valPath.setAttribute("stroke-linecap", "round");
        svg.appendChild(valPath);
    }

    el.appendChild(svg);

    if (props.title) {
        const label = document.createElement("div");
        label.textContent = props.title;
        label.style.position = "absolute";
        label.style.top = "50%";
        label.style.left = "50%";
        label.style.transform = "translate(-50%, -50%)";
        label.style.fontFamily = "Roboto, sans-serif";
        label.style.fontSize = "14px";
        label.style.color = color;
        label.style.pointerEvents = "none";
        el.appendChild(label);
    }
};

const exportLVGL = (w, { common, convertColor }) => {
    const p = w.props || {};
    let arcValue = p.value || 0;
    if (w.entity_id) {
        const safeId = w.entity_id.replace(/[^a-zA-Z0-9_]/g, "_");
        arcValue = `!lambda "return id(${safeId}).state;"`;
    }
    return {
        arc: {
            ...common,
            value: arcValue,
            min_value: p.min || 0,
            max_value: p.max || 100,
            arc_width: p.thickness,
            arc_color: convertColor(p.color),
            indicator: { arc_color: convertColor(p.color) },
            start_angle: p.start_angle,
            end_angle: p.end_angle,
            mode: p.mode,
            widgets: [
                {
                    label: {
                        align: "center",
                        text: `"${p.title || ''}"`,
                        text_color: convertColor(p.color)
                    }
                }
            ]
        }
    };
};

const onExportNumericSensors = (context) => {
    const { widgets, isLvgl, pendingTriggers } = context;
    if (!widgets) return;

    for (const w of widgets) {
        if (w.type !== "lvgl_arc") continue;

        const eid = (w.entity_id || w.props?.entity_id || "").trim();
        if (!eid) continue;

        if (isLvgl && pendingTriggers) {
            if (!pendingTriggers.has(eid)) {
                pendingTriggers.set(eid, new Set());
            }
            pendingTriggers.get(eid).add(`- lvgl.widget.refresh: ${w.id}`);
        }
    }
};

export default {
    id: "lvgl_arc",
    name: "Arc",
    category: "LVGL",
    supportedModes: ['lvgl'],
    defaults: {
        value: 50,
        min: 0,
        max: 100,
        thickness: 10,
        color: "blue",
        title: "",
        start_angle: 135,
        end_angle: 45,
        mode: "normal"
    },
    render,
    exportLVGL,
    onExportNumericSensors
};
