/**
 * LVGL Dropdown Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};

    el.innerHTML = "";
    el.style.display = "flex";
    el.style.alignItems = "center";
    el.style.boxSizing = "border-box";
    el.style.backgroundColor = "#fff";
    el.style.border = "1px solid #999";
    el.style.borderRadius = "3px";
    el.style.padding = "0 10px";

    let options = props.options || "Option 1\nOption 2\nOption 3";
    if (typeof options === 'string') {
        options = options.split("\n");
    } else if (!Array.isArray(options)) {
        options = ["Option 1", "Option 2", "Option 3"];
    }
    const idx = props.selected_index || 0;
    const selectedText = options[Math.min(idx, options.length - 1)] || "Select...";

    const text = document.createElement("span");
    text.textContent = selectedText;
    text.style.flex = "1";
    text.style.color = "#000";
    text.style.fontSize = "14px";
    text.style.fontFamily = "Roboto, sans-serif";
    text.style.overflow = "hidden";
    text.style.textOverflow = "ellipsis";
    text.style.whiteSpace = "nowrap";
    el.appendChild(text);

    const arrow = document.createElement("span");
    arrow.textContent = "▼";
    arrow.style.color = "#000";
    arrow.style.fontSize = "10px";
    arrow.style.marginLeft = "10px";
    el.appendChild(arrow);
};

const exportLVGL = (w, { common, convertColor, formatOpacity }) => {
    const p = w.props || {};
    let dropdownOptions = p.options || "";
    if (Array.isArray(dropdownOptions)) dropdownOptions = dropdownOptions.map(String);
    else dropdownOptions = String(dropdownOptions).split("\n").filter(o => o.trim() !== "");
    return {
        dropdown: {
            ...common,
            options: dropdownOptions,
            selected_index: p.selected_index,
            style: { text_color: convertColor(p.color) },
            direction: p.direction || "DOWN",
            max_height: p.max_height,
            opa: formatOpacity(p.opa)
        }
    };
};

export default {
    id: "lvgl_dropdown",
    name: "Dropdown",
    category: "LVGL",
    defaults: {
        options: "Option 1\nOption 2\nOption 3",
        selected_index: 0,
        color: "black",
        direction: "DOWN",
        max_height: 200,
        opa: 255
    },
    render,
    exportLVGL
};
