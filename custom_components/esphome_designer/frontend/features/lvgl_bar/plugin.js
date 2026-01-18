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
    el.style.position = "relative";

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
            start_value: p.start_value,
            mode: p.mode
        }
    };
};

const onExportNumericSensors = (context) => {
    const { lines, widgets } = context;
    if (!widgets) return;

    const processedEntities = new Map();

    for (const w of widgets) {
        if (w.type !== "lvgl_bar") continue;

        const entityId = (w.entity_id || w.props?.entity_id || "").trim();
        if (!entityId) continue;

        if (!processedEntities.has(entityId)) {
            processedEntities.set(entityId, []);
        }
        processedEntities.get(entityId).push(w.id);
    }

    for (const [entityId, widgetIds] of processedEntities) {
        const safeId = entityId.replace(/[^a-zA-Z0-9_]/g, "_");

        lines.push(`- platform: homeassistant`);
        lines.push(`  id: ${safeId}`);
        lines.push(`  entity_id: ${entityId}`);
        lines.push(`  internal: true`);
        if (context.isLvgl) {
            lines.push(`  on_value:`);
            lines.push(`    then:`);

            for (const wid of widgetIds) {
                lines.push(`      - lvgl.widget.update:`);
                lines.push(`          id: ${wid}`);
                lines.push(`          value: !lambda return x;`);
            }
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
        mode: "NORMAL"
    },
    render,
    exportLVGL,
    onExportNumericSensors
};
