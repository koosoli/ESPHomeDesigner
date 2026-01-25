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
    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
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

    const bgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    bgPath.setAttribute("d", startToPath(cx, cy, radius, -135, 135));
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
    const angleSpan = 270;
    let percentage = 0;
    if (max > min) {
        percentage = (val - min) / (max - min);
    }

    const endAngle = -135 + (percentage * angleSpan);

    if (percentage > 0.01) {
        const valPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        valPath.setAttribute("d", startToPath(cx, cy, radius, -135, endAngle));
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
