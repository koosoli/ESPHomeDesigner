/**
 * LVGL LED Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const width = widget.width || 50;
    const height = widget.height || 50;
    const color = getColorStyle(props.color || "red");
    const brightness = props.brightness !== undefined ? props.brightness : 255;

    el.innerHTML = "";
    el.style.display = "flex";
    el.style.alignItems = "center";
    el.style.justifyContent = "center";
    el.style.boxSizing = "border-box";

    const led = document.createElement("div");
    const size = Math.min(width, height) - 4;
    led.style.width = `${size}px`;
    led.style.height = `${size}px`;
    led.style.borderRadius = "50%";
    led.style.backgroundColor = color;
    led.style.opacity = brightness / 255;
    led.style.border = "2px solid #333";
    led.style.boxShadow = `0 0 ${size / 4}px ${color}`;

    const shine = document.createElement("div");
    shine.style.position = "absolute";
    shine.style.top = "15%";
    shine.style.left = "15%";
    shine.style.width = "30%";
    shine.style.height = "30%";
    shine.style.borderRadius = "50%";
    shine.style.backgroundColor = "rgba(255,255,255,0.4)";
    shine.style.pointerEvents = "none";

    led.style.position = "relative";
    led.appendChild(shine);
    el.appendChild(led);
};

const exportLVGL = (w, { common, convertColor, formatOpacity }) => {
    const p = w.props || {};
    let brightnessValue = (p.brightness !== undefined ? p.brightness : 255) / 255.0;

    if (w.entity_id) {
        const safeId = w.entity_id.replace(/[^a-zA-Z0-9_]/g, "_");
        brightnessValue = `!lambda "return id(${safeId}).state / 255.0;"`;
    }

    return {
        led: {
            ...common,
            color: convertColor(p.color || "red"),
            brightness: brightnessValue,
            opa: formatOpacity(p.opa)
        }
    };
};

const onExportNumericSensors = (context) => {
    const { widgets, isLvgl, pendingTriggers } = context;
    if (!widgets) return;

    for (const w of widgets) {
        if (w.type !== "lvgl_led") continue;

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
    id: "lvgl_led",
    name: "LED",
    category: "LVGL",
    defaults: {
        color: "red",
        brightness: 255,
        opa: 255
    },
    render,
    exportLVGL,
    onExportNumericSensors
};
