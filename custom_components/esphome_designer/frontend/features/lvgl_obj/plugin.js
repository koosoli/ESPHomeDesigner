/**
 * LVGL Object Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const bgColor = getColorStyle(props.bg_color || props.color || "white");
    const borderColor = getColorStyle(props.border_color || "gray");
    const borderWidth = props.border_width || 1;
    const radius = props.radius || 0;

    el.innerHTML = "";
    el.style.boxSizing = "border-box";
    el.style.backgroundColor = bgColor;
    el.style.border = `${borderWidth}px solid ${borderColor}`;
    el.style.borderRadius = `${radius}px`;
};

const exportLVGL = (w, { common, convertColor, formatOpacity }) => {
    const p = w.props || {};
    return {
        obj: {
            ...common,
            bg_color: convertColor(p.bg_color || p.color || "white"),
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
        bg_color: "white",
        border_color: "gray",
        border_width: 1,
        radius: 0,
        opa: 255,
        fill: true,
        entity_id: "",
        opacity: 255
    },
    schema: [
        {
            section: "Content",
            fields: [
                { key: "entity_id", target: "root", label: "Object Target ID", type: "entity_picker", default: "" }
            ]
        },
        {
            section: "Appearance",
            fields: [
                { key: "bg_color", label: "Background color", type: "color", default: "white" },
                { key: "border_color", label: "Border Color", type: "color", default: "gray" },
                { key: "border_width", label: "Border width", type: "number", default: 1 },
                { key: "radius", label: "Corner Radius", type: "number", default: 0 },
                { key: "opa", label: "Opacity (0 - 255)", type: "number", default: 255 },
                { key: "opacity", label: "Opacity (0 - 255)", type: "number", default: 255 },
                { key: "fill", label: "Fill Background", type: "checkbox", default: true }
            ]
        }
    ],
    render,
    exportLVGL
};
