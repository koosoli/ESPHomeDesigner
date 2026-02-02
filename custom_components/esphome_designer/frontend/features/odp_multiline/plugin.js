/**
 * ODP Multiline Text Plugin
 * Displays multiple lines of text separated by a delimiter
 * Only available for OpenEPaperLink and OpenDisplay rendering modes
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    el.innerHTML = "";
    el.style.display = "flex";
    el.style.flexDirection = "column";
    el.style.alignItems = "flex-start";
    el.style.justifyContent = "flex-start";
    el.style.overflow = "visible";

    const text = props.text || "Line 1|Line 2";
    const delimiter = props.delimiter || "|";
    const lines = text.split(delimiter);
    const fontSize = props.font_size || 16;
    const lineSpacing = props.line_spacing || 4;

    lines.forEach((line, index) => {
        const lineEl = document.createElement("div");
        lineEl.style.color = getColorStyle(props.color || "black");
        lineEl.style.fontSize = `${fontSize}px`;
        lineEl.style.fontFamily = (props.font_family || "Roboto") + ", sans-serif";
        lineEl.style.marginBottom = index < lines.length - 1 ? `${lineSpacing}px` : "0";
        lineEl.textContent = line.trim();
        el.appendChild(lineEl);
    });
};

export default {
    id: "odp_multiline",
    name: "Multiline Text",
    category: "OpenDisplay",
    supportedModes: ['oepl', 'opendisplay'],
    defaults: {
        width: 150,
        height: 60,
        text: "Line 1|Line 2|Line 3",
        delimiter: "|",
        font_size: 16,
        font_family: "Roboto",
        color: "black",
        line_spacing: 4
    },
    render,
    exportOpenDisplay: (w, { layout, page }) => {
        const p = w.props || {};

        // Convert theme_auto to actual color
        let color = p.color || "black";
        if (color === "theme_auto") {
            color = layout?.darkMode ? "white" : "black";
        }

        return {
            type: "multiline",
            value: p.text || "Line 1|Line 2",
            delimiter: p.delimiter || "|",
            x: Math.round(w.x),
            y: Math.round(w.y),
            offset_y: (p.font_size || 16) + (p.line_spacing || 4),
            size: p.font_size || 16,
            color: color,
            font: p.font_family?.includes("Mono") ? "mononoki.ttf" : "ppb.ttf"
        };
    },
    exportOEPL: (w, { layout, page }) => {
        const p = w.props || {};

        // Convert theme_auto to actual color
        let color = p.color || "black";
        if (color === "theme_auto") {
            color = layout?.darkMode ? "white" : "black";
        }

        const size = p.font_size || 16;
        const lineSpacing = p.line_spacing || 4;

        return {
            type: "multiline",
            value: p.text || "Line 1|Line 2",
            delimiter: p.delimiter || "|",
            x: Math.round(w.x),
            y: Math.round(w.y),
            offset_y: size + lineSpacing,
            size: size,
            color: color,
            font: p.font_family?.includes("Mono") ? "mononoki.ttf" : "ppb.ttf"
        };
    }
};
