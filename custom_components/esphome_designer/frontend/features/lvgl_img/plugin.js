/**
 * LVGL Image Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const pColor = getColorStyle(props.color || "black");

    el.innerHTML = "";
    el.style.border = "1px dashed #ccc";
    el.style.display = "flex";
    el.style.alignItems = "center";
    el.style.justifyContent = "center";
    el.style.overflow = "hidden";
    el.style.color = pColor;
    el.style.backgroundColor = "#f0f0f0";

    const src = props.src || "symbol_image";

    const label = document.createElement("div");
    label.style.textAlign = "center";

    if (props.rotation) {
        label.style.transform = `rotate(${props.rotation * 0.1}deg)`;
    }

    if (src.includes("/") || src.includes(".")) {
        label.textContent = "IMG: " + src;
    } else {
        label.textContent = "Symbol: " + src;
    }

    label.style.fontSize = "12px";
    el.appendChild(label);
};

const exportLVGL = (w, { common, convertColor }) => {
    const p = w.props || {};
    let src = (p.src || p.path || p.url || "symbol_image");
    return {
        image: {
            ...common,
            src: src,
            angle: (p.rotation || 0),
            pivot_x: (p.pivot_x || 0),
            pivot_y: (p.pivot_y || 0),
            image_recolor: convertColor(p.color),
            image_recolor_opa: "cover"
        }
    };
};

export default {
    id: "lvgl_img",
    name: "Image (lv)",
    category: "LVGL",
    defaults: {
        src: "symbol_image",
        rotation: 0,
        color: "black",
        pivot_x: 0,
        pivot_y: 0,
        scale: 256
    },
    render,
    exportLVGL
};
