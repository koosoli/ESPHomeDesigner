/**
 * ODP Ellipse Plugin
 * Draws an ellipse shape
 * Only available for OpenEPaperLink and OpenDisplay rendering modes
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    el.style.backgroundColor = props.fill ? getColorStyle(props.fill) : "transparent";
    el.style.border = `${props.border_width || 1}px solid ${getColorStyle(props.outline || "black")}`;
    el.style.borderRadius = "50%";
    el.style.boxSizing = "border-box";
};

export default {
    id: "odp_ellipse",
    name: "Ellipse",
    category: "OpenDisplay",
    supportedModes: ['oepl', 'opendisplay'],
    defaults: {
        width: 150,
        height: 80,
        fill: null,
        outline: "black",
        border_width: 1
    },
    render,
    exportOpenDisplay: (w, { layout, page }) => {
        const p = w.props || {};
        return {
            type: "ellipse",
            visible: true,
            x_start: Math.round(w.x),
            y_start: Math.round(w.y),
            x_end: Math.round(w.x + w.width),
            y_end: Math.round(w.y + w.height),
            fill: p.fill || null,
            outline: p.outline || "black",
            width: p.border_width || 1
        };
    },
    exportOEPL: (w, { layout, page }) => {
        const p = w.props || {};
        return {
            type: "ellipse",
            x_start: Math.round(w.x),
            y_start: Math.round(w.y),
            x_end: Math.round(w.x + w.width),
            y_end: Math.round(w.y + w.height),
            fill: p.fill || null,
            outline: p.outline || "black",
            width: p.border_width || 1
        };
    }
};
