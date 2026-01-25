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
    el.appendChild(cursor);
};

const exportLVGL = (w, { common }) => {
    const p = w.props || {};
    let spinValue = p.value || 0;

    if (w.entity_id) {
        const safeId = w.entity_id.replace(/[^a-zA-Z0-9_]/g, "_");
        spinValue = `!lambda "return (int)id(${safeId}).state;"`;
    }

    return {
        spinbox: {
            ...common,
            value: spinValue,
            digits: p.digit_count || 4
        }
    };
};

const onExportNumericSensors = (context) => {
    const { widgets, isLvgl, pendingTriggers } = context;
    if (!widgets) return;

    for (const w of widgets) {
        if (w.type !== "lvgl_spinbox") continue;

        const eid = (w.entity_id || w.props?.entity_id || "").trim();
        if (!eid) continue;

        if (isLvgl && pendingTriggers) {
            if (!pendingTriggers.has(eid)) {
                pendingTriggers.set(eid, new Set());
            }
            pendingTriggers.get(eid).add(`- lvgl.widget.refresh: ${w.id}`);
        }
    }
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
    render,
    exportLVGL,
    onExportNumericSensors
};
