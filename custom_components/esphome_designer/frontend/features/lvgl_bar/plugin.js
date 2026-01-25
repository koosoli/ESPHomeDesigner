/**
 * LVGL Bar Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const fgColor = getColorStyle(props.color || "black");
    const bgColor = getColorStyle(props.bg_color || "gray");

    el.innerHTML = "";
    el.style.backgroundColor = bgColor;
    el.style.borderRadius = "4px";
    el.style.overflow = "hidden";

    const min = props.min || 0;
    const max = props.max || 100;
    const val = props.value !== undefined ? props.value : 50;
    const range = max - min;
    const pct = Math.max(0, Math.min(100, ((val - min) / (range || 1)) * 100));

    const bar = document.createElement("div");
    bar.style.position = "absolute";
    bar.style.left = "0";
    bar.style.top = "0";
    bar.style.height = "100%";
    bar.style.width = `${pct}%`;
    bar.style.backgroundColor = fgColor;

    el.appendChild(bar);
};

const exportLVGL = (w, { common, convertColor }) => {
    const p = w.props || {};
    let barValue = p.value || 0;
    if (w.entity_id) {
        const safeId = w.entity_id.replace(/[^a-zA-Z0-9_]/g, "_");
        barValue = `!lambda "return id(${safeId}).state;"`;
    }
    return {
        bar: {
            ...common,
            min_value: p.min || 0,
            max_value: p.max || 100,
            value: barValue,
            bg_color: convertColor(p.bg_color || "gray"),
            indicator: { bg_color: convertColor(p.color) },
            start_value: p.mode === "range" ? p.start_value : undefined,
            mode: p.mode
        }
    };
};

const onExportNumericSensors = (context) => {
    const { widgets, isLvgl, pendingTriggers } = context;
    if (!widgets) return;

    for (const w of widgets) {
        if (w.type !== "lvgl_bar") continue;

        const entityId = (w.entity_id || w.props?.entity_id || "").trim();
        if (!entityId) continue;

        if (isLvgl && pendingTriggers) {
            if (!pendingTriggers.has(entityId)) {
                pendingTriggers.set(entityId, new Set());
            }
            pendingTriggers.get(entityId).add(`- lvgl.widget.refresh: ${w.id}`);
        }
    }
};

export default {
    id: "lvgl_bar",
    name: "Bar",
    category: "LVGL",
    defaults: {
        value: 50,
        min: 0,
        max: 100,
        color: "blue",
        bg_color: "gray",
        start_value: 0,
        mode: "normal"
    },
    render,
    exportLVGL,
    onExportNumericSensors
};
