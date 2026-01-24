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

    let selectedIdx = p.selected_index;
    if (w.entity_id) {
        const safeId = w.entity_id.replace(/[^a-zA-Z0-9_]/g, "_");
        selectedIdx = `!lambda "return (int)id(${safeId}).state;"`;
    }

    const dirMap = {
        "DOWN": "BOTTOM",
        "UP": "TOP",
        "LEFT": "LEFT",
        "RIGHT": "RIGHT"
    };

    return {
        dropdown: {
            ...common,
            options: dropdownOptions,
            selected_index: selectedIdx,
            text_color: convertColor(p.color),
            dir: dirMap[p.direction] || p.direction || "BOTTOM",
            dropdown_list: {
                max_height: p.max_height
            },
            opa: formatOpacity(p.opa)
        }
    };
};

const onExportNumericSensors = (context) => {
    const { widgets, isLvgl, pendingTriggers } = context;
    if (!widgets) return;

    for (const w of widgets) {
        if (w.type !== "lvgl_dropdown") continue;

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
    exportLVGL,
    onExportNumericSensors
};
