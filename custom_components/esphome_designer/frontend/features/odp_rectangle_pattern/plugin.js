/**
 * ODP Rectangle Pattern Plugin
 * Creates a pattern of repeated rectangles
 * Only available for OpenEPaperLink and OpenDisplay rendering modes
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    el.innerHTML = "";
    el.style.overflow = "hidden";

    const xSize = props.x_size || 30;
    const ySize = props.y_size || 15;
    const xOffset = props.x_offset || 5;
    const yOffset = props.y_offset || 5;
    const xRepeat = props.x_repeat || 3;
    const yRepeat = props.y_repeat || 2;
    const fill = props.fill || "white";
    const outline = props.outline || "black";
    const borderWidth = props.border_width || 1;

    for (let row = 0; row < yRepeat; row++) {
        for (let col = 0; col < xRepeat; col++) {
            const rect = document.createElement("div");
            rect.style.position = "absolute";
            rect.style.left = `${col * (xSize + xOffset)}px`;
            rect.style.top = `${row * (ySize + yOffset)}px`;
            rect.style.width = `${xSize}px`;
            rect.style.height = `${ySize}px`;
            rect.style.backgroundColor = getColorStyle(fill);
            rect.style.border = `${borderWidth}px solid ${getColorStyle(outline)}`;
            rect.style.boxSizing = "border-box";
            el.appendChild(rect);
        }
    }
};

export default {
    id: "odp_rectangle_pattern",
    name: "Rectangle Pattern",
    category: "OpenDisplay",
    supportedModes: ['oepl', 'opendisplay'],
    defaults: {
        width: 120,
        height: 80,
        x_size: 30,
        y_size: 15,
        x_offset: 5,
        y_offset: 5,
        x_repeat: 3,
        y_repeat: 2,
        fill: "white",
        outline: "black",
        border_width: 1
    },
    schema: [
        {
            section: "Pattern",
            fields: [
                { key: "x_size", label: "Rect Width", type: "number", default: 30 },
                { key: "y_size", label: "Rect Height", type: "number", default: 15 },
                { key: "x_offset", label: "X Gap", type: "number", default: 5 },
                { key: "y_offset", label: "Y Gap", type: "number", default: 5 },
                { key: "x_repeat", label: "X Count", type: "number", default: 3 },
                { key: "y_repeat", label: "Y Count", type: "number", default: 2 }
            ]
        },
        {
            section: "Appearance",
            fields: [
                { key: "fill", label: "Fill Color", type: "color", default: "white" },
                { key: "outline", label: "Outline Color", type: "color", default: "black" },
                { key: "border_width", label: "Line Width", type: "number", default: 1 }
            ]
        }
    ],
    render,
    exportOpenDisplay: (w, { layout, page }) => {
        const p = w.props || {};
        let fill = (p.fill === "theme_auto" || !p.fill) ? (layout?.darkMode ? "white" : "black") : p.fill;
        if (fill === "transparent") fill = null;

        let outline = (p.outline === "theme_auto" || !p.outline) ? (layout?.darkMode ? "white" : "black") : p.outline;
        if (outline === "transparent") outline = "black";

        return {
            type: "rectangle_pattern",
            x_start: Math.round(w.x),
            y_start: Math.round(w.y),
            x_size: p.x_size || 30,
            y_size: p.y_size || 15,
            x_offset: p.x_offset || 5,
            y_offset: p.y_offset || 5,
            x_repeat: p.x_repeat || 3,
            y_repeat: p.y_repeat || 2,
            fill: fill,
            outline: outline,
            width: p.border_width || 1,
            x_end: Math.round(w.x + w.width),
            y_end: Math.round(w.y + w.height)
        };
    },
    exportOEPL: (w, { layout, page }) => {
        const p = w.props || {};
        let fill = p.fill || "white";
        if (fill === "transparent") fill = null;

        return {
            type: "rectangle_pattern",
            x_start: Math.round(w.x),
            y_start: Math.round(w.y),
            x_size: p.x_size || 30,
            y_size: p.y_size || 15,
            x_offset: p.x_offset || 5,
            y_offset: p.y_offset || 5,
            x_repeat: p.x_repeat || 3,
            y_repeat: p.y_repeat || 2,
            fill: fill,
            outline: p.outline || "black",
            width: p.border_width || 1,
            x_end: Math.round(w.x + w.width),
            y_end: Math.round(w.y + w.height)
        };
    }
};
