/**
 * LVGL Spinbox Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const value = props.value || 0;
    const digits = props.digit_count || 4;

    el.innerHTML = "";
    el.style.display = "flex";
    el.style.alignItems = "center";
    el.style.justifyContent = "center";
    el.style.boxSizing = "border-box";
    el.style.backgroundColor = "#fff";
    el.style.border = "1px solid #999";
    el.style.borderRadius = "3px";

    const valueText = String(value).padStart(digits, "0");
    const display = document.createElement("span");
    display.textContent = valueText;
    display.style.fontFamily = "Roboto Mono, monospace";
    display.style.fontSize = "20px";
    display.style.color = "#000";
    display.style.letterSpacing = "2px";
    el.appendChild(display);

    const cursor = document.createElement("div");
    cursor.style.position = "absolute";
    cursor.style.bottom = "8px";
    cursor.style.right = "25%";
    cursor.style.width = "10px";
    cursor.style.height = "2px";
    cursor.style.backgroundColor = "blue";
    el.style.position = "relative";
    el.appendChild(cursor);
};

export default {
    id: "lvgl_spinbox",
    name: "Spinbox",
    category: "LVGL",
    defaults: {
        value: 0,
        digit_count: 4,
        step: 1
    },
    render
};
