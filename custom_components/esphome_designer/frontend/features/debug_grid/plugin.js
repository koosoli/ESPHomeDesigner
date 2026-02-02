/**
 * ODP Debug Grid Plugin
 * Overlays a grid on the image canvas to help with layout debugging
 * Only available for OpenDisplay rendering mode
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    el.innerHTML = "";
    el.style.backgroundColor = "transparent";
    // el.style.pointerEvents = "all"; // Allow selection
    el.style.overflow = "visible"; // Prevent clipping of grid lines

    const spacing = props.spacing || 20;
    const color = getColorStyle(props.line_color || "black");
    const dashed = props.dashed !== false;

    // Create SVG for grid rendering
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.style.width = "100%";
    svg.style.height = "100%";
    svg.setAttribute("viewBox", `0 0 ${widget.width} ${widget.height}`);

    // Vertical lines
    for (let x = 0; x <= widget.width; x += spacing) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x);
        line.setAttribute("y1", 0);
        line.setAttribute("x2", x);
        line.setAttribute("y2", widget.height);
        line.setAttribute("stroke", color);
        line.setAttribute("stroke-width", 0.5);
        line.setAttribute("opacity", 0.3);
        if (dashed) {
            line.setAttribute("stroke-dasharray", `${props.dash_length || 2}, ${props.space_length || 4}`);
        }
        svg.appendChild(line);
    }

    // Horizontal lines
    for (let y = 0; y <= widget.height; y += spacing) {
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", 0);
        line.setAttribute("y1", y);
        line.setAttribute("x2", widget.width);
        line.setAttribute("y2", y);
        line.setAttribute("stroke", color);
        line.setAttribute("stroke-width", 0.5);
        line.setAttribute("opacity", 0.3);
        if (dashed) {
            line.setAttribute("stroke-dasharray", `${props.dash_length || 2}, ${props.space_length || 4}`);
        }
        svg.appendChild(line);
    }

    el.appendChild(svg);
};

export default {
    id: "debug_grid",
    name: "Debug Grid",
    category: "OpenDisplay",
    supportedModes: ['opendisplay', 'oepl'],
    defaults: {
        width: 400,
        height: 300,
        spacing: 20,
        line_color: "black",
        dashed: true,
        dash_length: 2,
        space_length: 4,
        show_labels: true,
        label_step: 40,
        label_color: "black",
        label_font_size: 10
    },
    render,
    exportOpenDisplay: (w, { layout, page }) => {
        const p = w.props || {};
        return {
            type: "debug_grid",
            spacing: p.spacing || 20,
            line_color: p.line_color || "black",
            dashed: p.dashed !== false,
            dash_length: p.dash_length || 2,
            space_length: p.space_length || 4,
            show_labels: p.show_labels !== false,
            label_step: p.label_step || 40,
            label_color: p.label_color || "black",
            label_font_size: p.label_font_size || 12,
            font: "ppb.ttf"
        };
    },
    exportOEPL: (w, { layout, page }) => {
        const p = w.props || {};
        return {
            type: "debug_grid",
            spacing: p.spacing || 20,
            line_color: p.line_color || "black",
            dashed: p.dashed !== false,
            dash_length: p.dash_length || 2,
            space_length: p.space_length || 4,
            show_labels: p.show_labels !== false,
            label_step: p.label_step || 40,
            label_color: p.label_color || "black",
            label_font_size: p.label_font_size || 12,
            font: "ppb.ttf"
        };
    }
};
