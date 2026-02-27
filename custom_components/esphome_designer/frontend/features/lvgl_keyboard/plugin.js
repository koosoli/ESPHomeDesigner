/**
 * LVGL Keyboard Plugin
 */

const render = (el, widget, { _getColorStyle }) => {
    const props = widget.props || {}; // eslint-disable-line no-unused-vars

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
        opa: 255,
        textarea: "",
        opacity: 255
    },
    schema: [
        {
            section: "Keyboard Settings",
            fields: [
                { key: "mode", label: "Initial Mode", type: "select", options: ["TEXT_LOWER", "TEXT_UPPER", "SPECIAL", "NUMBER", "USER_1", "USER_2", "USER_3", "USER_4"], default: "TEXT_LOWER" },
                { key: "textarea", target: "root", label: "Target Textarea ID", type: "text", default: "" }
            ]
        },
        {
            section: "Appearance",
            fields: [
                { key: "opa", label: "Opacity (0 - 255)", type: "number", default: 255 },
                { key: "opacity", label: "Opacity (0 - 255)", type: "number", default: 255 }
            ]
        }
    ],
    render,
    exportLVGL
};
