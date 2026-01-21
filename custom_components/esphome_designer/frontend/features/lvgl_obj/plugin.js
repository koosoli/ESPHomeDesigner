/**
 * LVGL Object Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const color = getColorStyle(props.color || "white");
    const borderColor = getColorStyle(props.border_color || "gray");
    const borderWidth = props.border_width || 1;
    const radius = props.radius || 0;

    el.innerHTML = "";
    el.style.boxSizing = "border-box";
    el.style.backgroundColor = color;
    el.style.border = `${borderWidth}px solid ${borderColor}`;
    el.style.borderRadius = `${radius}px`;
};

const exportLVGL = (w, { common, convertColor, formatOpacity }) => {
    const p = w.props || {};
    return {
        obj: {
            ...common,
            bg_color: convertColor(p.bg_color || p.color),
            bg_opa: p.fill !== false ? "cover" : "transp",
            border_width: p.border_width,
            border_color: convertColor(p.border_color || p.color),
            radius: p.radius || 0,
            opa: formatOpacity(p.opa)
        }
    };
};

export default {
    id: "lvgl_obj",
    name: "Object",
    category: "LVGL",
    defaults: {
        color: "white",
        bg_color: "white",
        border_color: "gray",
        border_width: 1,
        radius: 0,
        opa: 255,
        fill: true
    },
    render,
    exportLVGL
};
