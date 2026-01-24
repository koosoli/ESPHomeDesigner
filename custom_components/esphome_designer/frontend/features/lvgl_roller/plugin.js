/**
 * LVGL Roller Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const bgColor = getColorStyle(props.bg_color || "white");
    const selectedBgColor = getColorStyle(props.selected_bg_color || "blue");
    const textColor = getColorStyle(props.color || "black");
    const selectedTextColor = getColorStyle(props.selected_text_color || "white");
    const visibleRows = props.visible_row_count || 3;

    el.innerHTML = "";
    el.style.display = "flex";
    el.style.flexDirection = "column";
    el.style.boxSizing = "border-box";
    el.style.backgroundColor = bgColor;
    el.style.border = "1px solid #999";
    el.style.overflow = "hidden";

    let options = props.options || "Option A\nOption B\nOption C";
    if (typeof options === 'string') {
        options = options.split("\n");
    } else if (!Array.isArray(options)) {
        options = ["Option A", "Option B", "Option C"];
    }
    const rowHeight = widget.height / visibleRows;

    const middleIdx = Math.floor(visibleRows / 2);

    for (let i = 0; i < visibleRows && i < options.length; i++) {
        const row = document.createElement("div");
        row.style.height = `${rowHeight}px`;
        row.style.display = "flex";
        row.style.alignItems = "center";
        row.style.justifyContent = "center";
        row.style.fontSize = "14px";
        row.style.fontFamily = "Roboto, sans-serif";

        if (i === middleIdx) {
            row.style.backgroundColor = selectedBgColor;
            row.style.color = selectedTextColor;
            row.style.fontWeight = "bold";
        } else {
            row.style.backgroundColor = bgColor;
            row.style.color = textColor;
            row.style.opacity = "0.6";
        }

        row.textContent = options[i] || `Option ${i + 1}`;
        el.appendChild(row);
    }
};

const exportLVGL = (w, { common, convertColor, formatOpacity }) => {
    const p = w.props || {};
    let rollerOptions = p.options || "";
    if (Array.isArray(rollerOptions)) rollerOptions = rollerOptions.map(String);
    else rollerOptions = String(rollerOptions).split("\n").filter(o => o.trim() !== "");

    let selectedIdx = p.selected_index;
    if (w.entity_id) {
        const safeId = w.entity_id.replace(/[^a-zA-Z0-9_]/g, "_");
        selectedIdx = `!lambda "return (int)id(${safeId}).state;"`;
    }

    return {
        roller: {
            ...common,
            options: rollerOptions,
            selected_index: selectedIdx,
            visible_row_count: p.visible_row_count,
            bg_color: convertColor(p.bg_color),
            text_color: convertColor(p.color),
            selected: { bg_color: convertColor(p.selected_bg_color), text_color: convertColor(p.selected_text_color) },
            mode: p.mode || "normal",
            opa: formatOpacity(p.opa)
        }
    };
};

const onExportNumericSensors = (context) => {
    const { widgets, isLvgl, pendingTriggers } = context;
    if (!widgets) return;

    for (const w of widgets) {
        if (w.type !== "lvgl_roller") continue;

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
    id: "lvgl_roller",
    name: "Roller",
    category: "LVGL",
    defaults: {
        options: "Option A\nOption B\nOption C",
        visible_row_count: 3,
        bg_color: "white",
        color: "black",
        selected_bg_color: "blue",
        selected_text_color: "white",
        mode: "normal",
        opa: 255
    },
    render,
    exportLVGL,
    onExportNumericSensors
};
