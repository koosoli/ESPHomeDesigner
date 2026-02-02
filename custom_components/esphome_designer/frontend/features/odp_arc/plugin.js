/**
 * ODP Arc Plugin
 * Draws an arc segment (different from LVGL arc)
 * Only available for OpenEPaperLink and OpenDisplay rendering modes
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    el.innerHTML = "";

    const radius = props.radius || Math.min(widget.width, widget.height) / 2;
    const startAngle = (props.start_angle || 0) * Math.PI / 180;
    const endAngle = (props.end_angle || 90) * Math.PI / 180;
    const strokeWidth = props.border_width || 2;
    const strokeColor = getColorStyle(props.outline || "black");

    // Create SVG for arc rendering
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.style.width = "100%";
    svg.style.height = "100%";
    svg.style.position = "absolute";
    svg.style.top = "0";
    svg.style.left = "0";
    svg.setAttribute("viewBox", `0 0 ${widget.width} ${widget.height}`);

    const cx = widget.width / 2;
    const cy = widget.height / 2;
    const r = Math.min(cx, cy) - strokeWidth;

    // Calculate arc path
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy + r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy + r * Math.sin(endAngle);

    const largeArc = (endAngle - startAngle) > Math.PI ? 1 : 0;

    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", strokeColor);
    path.setAttribute("stroke-width", strokeWidth);
    path.setAttribute("stroke-linecap", "round");

    svg.appendChild(path);
    el.appendChild(svg);
};

export default {
    id: "odp_arc",
    name: "Arc",
    category: "OpenDisplay",
    supportedModes: ['oepl', 'opendisplay'],
    defaults: {
        width: 100,
        height: 100,
        radius: 50,
        start_angle: 0,
        end_angle: 90,
        outline: "black",
        border_width: 2
    },
    render,
    exportOpenDisplay: (w, { layout, page }) => {
        const p = w.props || {};
        const cx = Math.round(w.x + w.width / 2);
        const cy = Math.round(w.y + w.height / 2);
        return {
            type: "arc",
            x: cx,
            y: cy,
            radius: p.radius || Math.round(Math.min(w.width, w.height) / 2),
            start_angle: p.start_angle || 0,
            end_angle: p.end_angle || 90,
            outline: p.outline || "black",
            width: p.border_width || 2
        };
    },
    exportOEPL: (w, { layout, page }) => {
        const p = w.props || {};
        const cx = Math.round(w.x + w.width / 2);
        const cy = Math.round(w.y + w.height / 2);
        return {
            type: "arc",
            x: cx,
            y: cy,
            radius: p.radius || Math.round(Math.min(w.width, w.height) / 2),
            start_angle: p.start_angle || 0,
            end_angle: p.end_angle || 90,
            outline: p.outline || "black",
            width: p.border_width || 2
        };
    }
};
