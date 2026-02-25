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
    schema: [
        {
            section: "Appearance",
            fields: [
                { key: "fill", label: "Fill Color", type: "color", default: null },
                { key: "outline", label: "Outline Color", type: "color", default: "black" },
                { key: "border_width", label: "Border Width", type: "number", default: 1 }
            ]
        }
    ],
    render,
    exportOpenDisplay: (w, { layout, page }) => {
        const p = w.props || {};
        let fill = (p.fill === "theme_auto") ? (layout?.darkMode ? "white" : "black") : (p.fill || null);
        if (fill === "transparent") fill = null;

        let outline = (p.outline === "theme_auto" || !p.outline) ? (layout?.darkMode ? "white" : "black") : (p.outline || "black");
        if (outline === "transparent") outline = "black"; // Outline shouldn't be transparent in ODP or it vanishes

        return {
            type: "ellipse",
            visible: true,
            x_start: Math.round(w.x),
            y_start: Math.round(w.y),
            x_end: Math.round(w.x + w.width),
            y_end: Math.round(w.y + w.height),
            fill: fill,
            outline: outline,
            width: p.border_width || 1
        };
    },
    exportOEPL: (w, { layout, page }) => {
        const p = w.props || {};
        let fill = p.fill || null;
        if (fill === "transparent") fill = null;

        return {
            type: "ellipse",
            x_start: Math.round(w.x),
            y_start: Math.round(w.y),
            x_end: Math.round(w.x + w.width),
            y_end: Math.round(w.y + w.height),
            fill: fill,
            outline: p.outline || "black",
            width: p.border_width || 1
        };
    }
};
