/**
 * LVGL Keyboard Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};

    el.innerHTML = "";
    el.style.display = "grid";
    el.style.gridTemplateColumns = "repeat(10, 1fr)";
    el.style.gridTemplateRows = "repeat(4, 1fr)";
    el.style.gap = "2px";
    el.style.padding = "4px";
    el.style.boxSizing = "border-box";
    el.style.backgroundColor = "#333";
    el.style.borderRadius = "5px";

    const keys = "QWERTYUIOPASDFGHJKLZXCVBNM  ↵←".split("");
    keys.forEach(key => {
        const keyEl = document.createElement("div");
        keyEl.style.backgroundColor = "#555";
        keyEl.style.display = "flex";
        keyEl.style.alignItems = "center";
        keyEl.style.justifyContent = "center";
        keyEl.style.color = "#fff";
        keyEl.style.fontSize = "9px";
        keyEl.style.fontFamily = "Roboto Mono, monospace";
        keyEl.style.borderRadius = "2px";
        keyEl.textContent = key === " " ? "" : key;
        el.appendChild(keyEl);
    });
};

const exportLVGL = (w, { common, formatOpacity }) => {
    const p = w.props || {};
    return {
        keyboard: {
            ...common,
            mode: p.mode || "TEXT_LOWER",
            opa: formatOpacity(p.opa)
        }
    };
};

export default {
    id: "lvgl_keyboard",
    name: "Keyboard",
    category: "LVGL",
    defaults: {
        mode: "TEXT_LOWER",
        opa: 255
    },
    render,
    exportLVGL
};
