/**
 * ODP Polygon Plugin
 * Draws a polygon with arbitrary points
 * Only available for OpenEPaperLink and OpenDisplay rendering modes
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    el.innerHTML = "";

    // Parse points - can be array of [x,y] or string
    let points = props.points || [[0, 0], [50, 0], [50, 50], [0, 50]];
    if (typeof points === "string") {
        try {
            points = JSON.parse(points);
        } catch (e) {
            points = [[0, 0], [50, 0], [50, 50], [0, 50]];
        }
    }

    // Create SVG for polygon rendering
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.style.width = "100%";
    svg.style.height = "100%";
    svg.style.position = "absolute";
    svg.style.top = "0";
    svg.style.left = "0";

    // Normalize points to fit within widget bounds
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    points.forEach(([x, y]) => {
        minX = Math.min(minX, x);
        minY = Math.min(minY, y);
        maxX = Math.max(maxX, x);
        maxY = Math.max(maxY, y);
    });

    const scaleX = widget.width / (maxX - minX || 1);
    const scaleY = widget.height / (maxY - minY || 1);
    const scale = Math.min(scaleX, scaleY);

    const normalizedPoints = points.map(([x, y]) => [
        (x - minX) * scale,
        (y - minY) * scale
    ]);

    const polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
    polygon.setAttribute("points", normalizedPoints.map(p => p.join(",")).join(" "));
    polygon.setAttribute("fill", props.fill ? getColorStyle(props.fill) : "transparent");
    polygon.setAttribute("stroke", getColorStyle(props.outline || "black"));
    polygon.setAttribute("stroke-width", props.border_width || 1);

    svg.appendChild(polygon);
    el.appendChild(svg);
};

export default {
    id: "odp_polygon",
    name: "Polygon",
    category: "OpenDisplay",
    supportedModes: ['oepl', 'opendisplay'],
    defaults: {
        width: 100,
        height: 100,
        points: [[0, 0], [100, 0], [100, 100], [0, 100]],
        fill: "red",
        outline: "black",
        border_width: 1
    },
    render,
    exportOpenDisplay: (w, { layout, page }) => {
        const p = w.props || {};
        let points = p.points || [[0, 0], [50, 0], [50, 50], [0, 50]];
        if (typeof points === "string") {
            try { points = JSON.parse(points); } catch (e) { points = [[0, 0], [50, 0], [50, 50], [0, 50]]; }
        }
        // Offset points by widget position
        const offsetPoints = points.map(([x, y]) => [Math.round(w.x + x), Math.round(w.y + y)]);
        return {
            type: "polygon",
            points: offsetPoints,
            fill: p.fill || "red",
            outline: p.outline || "black",
            width: p.border_width || 1
        };
    },
    exportOEPL: (w, { layout, page }) => {
        const p = w.props || {};
        let points = p.points || [[0, 0], [50, 0], [50, 50], [0, 50]];
        if (typeof points === "string") {
            try { points = JSON.parse(points); } catch (e) { points = [[0, 0], [50, 0], [50, 50], [0, 50]]; }
        }
        const offsetPoints = points.map(([x, y]) => [Math.round(w.x + x), Math.round(w.y + y)]);
        return {
            type: "polygon",
            points: offsetPoints,
            fill: p.fill || "red",
            outline: p.outline || "black",
            width: p.border_width || 1
        };
    }
};
