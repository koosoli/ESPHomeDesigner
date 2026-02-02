/**
 * ODP Plot Plugin
 * Displays a sensor data graph/plot
 * Only available for OpenEPaperLink and OpenDisplay rendering modes
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    el.innerHTML = "";
    el.style.backgroundColor = getColorStyle(props.background || "white");
    el.style.border = `1px solid ${getColorStyle(props.outline || "#ccc")}`;
    el.style.borderRadius = "2px";
    el.style.overflow = "hidden";

    // Create placeholder visualization
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.style.width = "100%";
    svg.style.height = "100%";
    svg.setAttribute("viewBox", `0 0 ${widget.width} ${widget.height}`);

    // Draw grid lines
    const gridColor = "#e0e0e0";
    for (let y = 0; y <= widget.height; y += widget.height / 4) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", 0);
        line.setAttribute("y1", y);
        line.setAttribute("x2", widget.width);
        line.setAttribute("y2", y);
        line.setAttribute("stroke", gridColor);
        line.setAttribute("stroke-width", 0.5);
        svg.appendChild(line);
    }

    // Draw sample data line (sine wave for preview)
    const data = props.data || [{ entity: "sensor.temperature", color: "black", width: 1 }];
    const dataItems = Array.isArray(data) ? data : [data];

    dataItems.forEach((item, index) => {
        const color = getColorStyle(item.color || "black");
        const strokeWidth = item.width || 1;

        const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
        let d = "";
        const points = 50;
        for (let i = 0; i <= points; i++) {
            const x = (i / points) * widget.width;
            const y = widget.height / 2 + Math.sin((i / points) * 4 * Math.PI + index) * (widget.height / 3);
            d += (i === 0 ? "M" : "L") + ` ${x} ${y}`;
        }
        path.setAttribute("d", d);
        path.setAttribute("fill", "none");
        path.setAttribute("stroke", color);
        path.setAttribute("stroke-width", strokeWidth);
        svg.appendChild(path);
    });

    // Add label
    const label = document.createElement("div");
    label.style.position = "absolute";
    label.style.bottom = "2px";
    label.style.right = "4px";
    label.style.fontSize = "8px";
    label.style.color = "#666";
    label.textContent = `Plot: ${props.duration ? (props.duration / 3600) + "h" : "10h"}`;

    el.appendChild(svg);
    el.appendChild(label);
};

export default {
    id: "odp_plot",
    name: "Sensor Plot",
    category: "OpenDisplay",
    supportedModes: ['oepl', 'opendisplay'],
    defaults: {
        width: 200,
        height: 100,
        duration: 36400,
        data: [{ entity: "sensor.temperature", color: "black", width: 1, smooth: true, show_points: true }],
        background: "white",
        outline: "#ccc",
        ylegend: null
    },
    render,
    exportOpenDisplay: (w, { layout, page }) => {
        const p = w.props || {};
        const exportData = (Array.isArray(p.data) ? p.data : [p.data]).map(item => ({
            entity: item.entity || "",
            color: item.color || "black",
            width: item.width || 1,
            smooth: item.smooth !== false,
            show_points: !!item.show_points,
            point_size: item.point_size || 3,
            point_color: item.point_color || "black",
            value_scale: item.value_scale || 1.0
        }));

        const result = {
            type: "plot",
            x_start: Math.round(w.x),
            y_start: Math.round(w.y),
            x_end: Math.round(w.x + w.width),
            y_end: Math.round(w.y + w.height),
            duration: p.duration || 36400,
            data: exportData
        };

        if (p.ylegend) result.ylegend = p.ylegend;
        return result;
    },
    exportOEPL: (w, { layout, page }) => {
        const p = w.props || {};
        const exportData = (Array.isArray(p.data) ? p.data : [p.data]).map(item => ({
            entity: item.entity || "",
            color: item.color || "black",
            width: item.width || 1,
            smooth: item.smooth !== false,
            show_points: !!item.show_points,
            point_size: item.point_size || 3,
            point_color: item.point_color || "black",
            value_scale: item.value_scale || 1.0
        }));

        const result = {
            type: "plot",
            x_start: Math.round(w.x),
            y_start: Math.round(w.y),
            x_end: Math.round(w.x + w.width),
            y_end: Math.round(w.y + w.height),
            duration: p.duration || 36400,
            data: exportData
        };

        if (p.ylegend) result.ylegend = p.ylegend;
        return result;
    }
};
