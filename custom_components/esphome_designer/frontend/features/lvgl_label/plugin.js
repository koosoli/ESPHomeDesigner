/**
 * LVGL Label Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};

    el.innerText = props.text || "Label";
    el.style.fontSize = (props.font_size || 20) + "px";
    el.style.color = getColorStyle(props.color || "black");
    el.style.backgroundColor = props.bg_color || "transparent";
    el.style.display = "flex";

    const align = props.text_align || "CENTER";
    if (align.includes("LEFT")) el.style.justifyContent = "flex-start";
    else if (align.includes("RIGHT")) el.style.justifyContent = "flex-end";
    else el.style.justifyContent = "center";

    if (align.includes("TOP")) el.style.alignItems = "flex-start";
    else if (align.includes("BOTTOM")) el.style.alignItems = "flex-end";
    else el.style.alignItems = "center";

    el.style.fontFamily = props.font_family === "Custom..." ? (props.custom_font_family || "sans-serif") : (props.font_family || "sans-serif");
    if (props.italic) el.style.fontStyle = "italic";
    el.style.fontWeight = props.font_weight || 400;

    el.style.whiteSpace = "pre-wrap";
    el.style.overflow = "hidden";
    el.style.opacity = (props.opa !== undefined ? props.opa : 255) / 255;
};

const exportLVGL = (w, { common, convertColor, convertAlign, getLVGLFont, formatOpacity }) => {
    const p = w.props || {};
    return {
        label: {
            ...common,
            text: `"${p.text || 'Label'}"`,
            text_font: getLVGLFont(p.font_family, p.font_size, p.font_weight, p.italic),
            text_color: convertColor(p.color || p.text_color),
            text_align: convertAlign(p.text_align),
            bg_color: p.bg_color === "transparent" ? undefined : convertColor(p.bg_color),
            opa: formatOpacity(p.opa)
        }
    };
};

export default {
    id: "lvgl_label",
    name: "Label",
    category: "LVGL",
    defaults: {
        text: "Label",
        font_size: 20,
        font_family: "Roboto",
        color: "black",
        font_weight: 400,
        italic: false,
        text_align: "CENTER",
        bg_color: "transparent",
        opa: 255
    },
    render,
    exportLVGL
};
