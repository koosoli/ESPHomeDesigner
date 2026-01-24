/**
 * LVGL Switch Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const checked = props.checked || false;
    const bgColor = getColorStyle(props.bg_color || "gray");
    const indicatorColor = getColorStyle(props.color || "blue");
    const knobColor = getColorStyle(props.knob_color || "white");
    const width = widget.width || 60;
    const height = widget.height || 30;

    el.innerHTML = "";
    el.style.display = "flex";
    el.style.alignItems = "center";
    el.style.justifyContent = "center";
    el.style.boxSizing = "border-box";

    const track = document.createElement("div");
    track.style.width = `${width}px`;
    track.style.height = `${height}px`;
    track.style.borderRadius = `${height / 2}px`;
    track.style.backgroundColor = checked ? indicatorColor : bgColor;
    track.style.position = "relative";
    track.style.transition = "background-color 0.2s";

    const knob = document.createElement("div");
    const knobSize = height - 4;
    knob.style.width = `${knobSize}px`;
    knob.style.height = `${knobSize}px`;
    knob.style.borderRadius = "50%";
    knob.style.backgroundColor = knobColor;
    knob.style.position = "absolute";
    knob.style.top = "2px";
    knob.style.left = checked ? `${width - knobSize - 2}px` : "2px";
    knob.style.boxShadow = "0 1px 3px rgba(0,0,0,0.3)";
    knob.style.transition = "left 0.2s";

    track.appendChild(knob);
    el.appendChild(track);
};

const exportLVGL = (w, { common, convertColor, formatOpacity, profile }) => {
    const p = w.props || {};

    // Robust entity ID detection
    const entityId = (w.entity_id || p.entity_id || p.entity || "").trim();

    const switchObj = {
        switch: {
            ...common,
            state: {
                checked: p.checked
            },
            bg_color: convertColor(p.bg_color),
            indicator: { bg_color: convertColor(p.color) },
            knob: { bg_color: convertColor(p.knob_color) },
            opa: formatOpacity(p.opa),
            on_value: undefined
        }
    };
    if (entityId) {
        switchObj.switch.on_value = [{ "homeassistant.service": { service: "homeassistant.toggle", data: { entity_id: entityId } } }];
    }
    return switchObj;
};


const onExportBinarySensors = (context) => {
    const { widgets, isLvgl, pendingTriggers } = context;
    if (!widgets) return;

    for (const w of widgets) {
        if (w.type !== "lvgl_switch") continue;

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
    id: "lvgl_switch",
    name: "Switch",
    category: "LVGL",
    supportedModes: ['lvgl'],
    defaults: {
        checked: false,
        bg_color: "gray",
        color: "blue",
        knob_color: "white",
        opa: 255
    },
    render,
    exportLVGL,
    onExportBinarySensors
};
