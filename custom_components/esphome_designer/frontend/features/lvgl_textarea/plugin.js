/**
 * LVGL Textarea Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const text = props.text || "";
    const placeholder = props.placeholder || "Enter text...";

    el.innerHTML = "";
    el.style.display = "flex";
    el.style.flexDirection = "column";
    el.style.boxSizing = "border-box";
    el.style.backgroundColor = "#fff";
    el.style.border = "1px solid #999";
    el.style.borderRadius = "3px";
    el.style.padding = "5px";
    el.style.overflow = "hidden";

    const content = document.createElement("div");
    content.style.flex = "1";
    content.style.fontFamily = "Roboto, sans-serif";
    content.style.fontSize = "14px";
    content.style.overflow = "hidden";
    content.style.textOverflow = "ellipsis";

    if (text) {
        content.textContent = text;
        content.style.color = "#000";
    } else {
        content.textContent = placeholder;
        content.style.color = "#ccc";
    }

    el.appendChild(content);

    const cursor = document.createElement("div");
    cursor.style.width = "1px";
    cursor.style.height = "14px";
    cursor.style.backgroundColor = "#000";
    cursor.style.position = "absolute";
    cursor.style.left = "6px";
    cursor.style.top = "6px";
    el.appendChild(cursor);
};

const exportLVGL = (w, context) => {
    const { getStyleProps, getObjectDescriptor } = context;
    const props = w.props || {};

    const obj = getObjectDescriptor(w);
    obj.type = "textarea";
    obj.attrs = {
        ...obj.attrs,
        placeholder_text: props.placeholder,
        text: props.text,
        max_length: props.max_length,
        one_line: props.one_line ?? false,
        password_mode: props.password_mode ?? false
    };

    return obj;
};

export default {
    id: "lvgl_textarea",
    name: "Textarea",
    category: "LVGL",
    defaults: {
        text: "",
        placeholder: "Enter text...",
        max_length: 128
    },
    render,
    exportLVGL
};
