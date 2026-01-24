/**
 * LVGL Checkbox Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const color = getColorStyle(props.color || "blue");
    const checked = props.checked || false;
    const text = props.text || "Checkbox";

    el.innerHTML = "";
    el.style.display = "flex";
    el.style.alignItems = "center";
    el.style.gap = "10px";
    el.style.boxSizing = "border-box";
    el.style.padding = "5px";

    const box = document.createElement("div");
    box.style.width = "20px";
    box.style.height = "20px";
    box.style.border = `2px solid ${color}`;
    box.style.borderRadius = "3px";
    box.style.backgroundColor = checked ? color : "#fff";
    box.style.display = "flex";
    box.style.alignItems = "center";
    box.style.justifyContent = "center";
    box.style.flexShrink = "0";

    if (checked) {
        const check = document.createElement("span");
        check.textContent = "✓";
        check.style.color = "#fff";
        check.style.fontSize = "14px";
        check.style.fontWeight = "bold";
        box.appendChild(check);
    }
    el.appendChild(box);

    const label = document.createElement("span");
    label.textContent = text;
    label.style.color = "#000";
    label.style.fontSize = "14px";
    label.style.fontFamily = "Roboto, sans-serif";
    el.appendChild(label);
};

const exportLVGL = (w, { common, convertColor, formatOpacity, profile }) => {
    const p = w.props || {};

    // Robust entity ID detection
    const entityId = (w.entity_id || p.entity_id || p.entity || "").trim();

    const checkboxObj = {
        checkbox: {
            ...common,
            text: `"${p.text || 'Checkbox'}"`,
            state: {
                checked: p.checked
            },
            indicator: {
                bg_color: convertColor(p.color || "blue"),
            },
            opa: formatOpacity(p.opa),
            on_value: undefined
        }
    };
    if (entityId) {
        checkboxObj.checkbox.on_value = [{ "homeassistant.service": { service: "homeassistant.toggle", data: { entity_id: entityId } } }];
    }
    return checkboxObj;
};

const onExportBinarySensors = (context) => {
    const { widgets, isLvgl, pendingTriggers } = context;
    if (!widgets) return;

    for (const w of widgets) {
        if (w.type !== "lvgl_checkbox") continue;

        let eid = (w.entity_id || w.props?.entity_id || w.props?.entity || "").trim();
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
    id: "lvgl_checkbox",
    name: "Checkbox",
    category: "LVGL",
    supportedModes: ['lvgl'],
    defaults: {
        text: "Checkbox",
        checked: false,
        color: "blue",
        opa: 255
    },
    render,
    exportLVGL,
    onExportBinarySensors
};
