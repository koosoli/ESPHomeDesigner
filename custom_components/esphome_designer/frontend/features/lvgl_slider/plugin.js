/**
 * LVGL Slider Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const fgColor = getColorStyle(props.color || "black");
    const bgColor = getColorStyle(props.bg_color || "gray");
    const borderWidth = props.border_width || 2;
    const isVertical = props.vertical || false;

    el.innerHTML = "";
    el.style.display = "flex";
    el.style.alignItems = "center";
    el.style.justifyContent = "center";

    const min = props.min || 0;
    const max = props.max || 100;
    const val = props.value !== undefined ? props.value : 30;
    const range = max - min;
    const pct = Math.max(0, Math.min(100, ((val - min) / (range || 1)) * 100));

    const trackC = document.createElement("div");
    trackC.style.position = "relative";
    trackC.style.backgroundColor = bgColor;
    trackC.style.borderRadius = "10px";

    if (isVertical) {
        trackC.style.width = "30%";
        trackC.style.height = "100%";
        el.style.flexDirection = "column";
    } else {
        trackC.style.width = "100%";
        trackC.style.height = "30%";
    }

    el.appendChild(trackC);

    const indicator = document.createElement("div");
    indicator.style.position = "absolute";
    indicator.style.backgroundColor = fgColor;
    indicator.style.borderRadius = "10px";

    if (isVertical) {
        indicator.style.left = "0";
        indicator.style.bottom = "0";
        indicator.style.width = "100%";
        indicator.style.height = `${pct}%`;
    } else {
        indicator.style.left = "0";
        indicator.style.top = "0";
        indicator.style.height = "100%";
        indicator.style.width = `${pct}%`;
    }
    trackC.appendChild(indicator);

    const knob = document.createElement("div");
    const knobSize = isVertical ? widget.width * 0.8 : widget.height * 0.8;
    knob.style.width = `${knobSize}px`;
    knob.style.height = `${knobSize}px`;
    knob.style.backgroundColor = fgColor;
    knob.style.border = `${borderWidth}px solid white`;
    knob.style.borderRadius = "50%";
    knob.style.position = "absolute";

    if (isVertical) {
        knob.style.left = `calc(50% - ${knobSize / 2}px)`;
        knob.style.bottom = `calc(${pct}% - ${knobSize / 2}px)`;
    } else {
        knob.style.left = `calc(${pct}% - ${knobSize / 2}px)`;
        knob.style.top = `calc(50% - ${knobSize / 2}px)`;
    }

    trackC.appendChild(knob);
};

const exportLVGL = (w, { common, convertColor, profile }) => {
    const p = w.props || {};
    const hasTouch = profile?.touch;
    let sliderValue = p.value || 30;

    if (w.entity_id) {
        const safeId = w.entity_id.replace(/[^a-zA-Z0-9_]/g, "_");
        sliderValue = `!lambda "return id(${safeId}).state;"`;
    }

    const sliderObj = {
        slider: {
            ...common,
            min_value: p.min || 0,
            max_value: p.max || 100,
            value: sliderValue,
            border_width: p.border_width || 2,
            bg_color: convertColor(p.bg_color || "gray"),
            indicator: { bg_color: convertColor(p.color) },
            knob: { bg_color: convertColor(p.color), border_width: 2, border_color: "0xFFFFFF" },
            mode: p.mode || "normal",
            on_value: undefined
        }
    };

    if (w.entity_id) {
        const safeEntity = w.entity_id.trim();
        let serviceCall;
        if (safeEntity.startsWith("light.")) {
            serviceCall = { "homeassistant.service": { service: "light.turn_on", data: { entity_id: safeEntity, brightness_pct: "!lambda 'return x;'" } } };
        } else if (safeEntity.startsWith("fan.")) {
            serviceCall = { "homeassistant.service": { service: "fan.set_percentage", data: { entity_id: safeEntity, percentage: "!lambda 'return x;'" } } };
        } else if (safeEntity.startsWith("cover.")) {
            serviceCall = { "homeassistant.service": { service: "cover.set_cover_position", data: { entity_id: safeEntity, position: "!lambda 'return x;'" } } };
        } else if (safeEntity.startsWith("media_player.")) {
            serviceCall = { "homeassistant.service": { service: "media_player.volume_set", data: { entity_id: safeEntity, volume_level: "!lambda 'return x / 100.0;'" } } };
        } else if (safeEntity.startsWith("climate.")) {
            serviceCall = { "homeassistant.service": { service: "climate.set_temperature", data: { entity_id: safeEntity, temperature: "!lambda 'return x;'" } } };
        } else {
            serviceCall = { "homeassistant.service": { service: "number.set_value", data: { entity_id: safeEntity, value: "!lambda 'return x;'" } } };
        }
        sliderObj.slider.on_value = [serviceCall];
    }
    return sliderObj;
};

const onExportNumericSensors = (context) => {
    const { widgets, isLvgl, pendingTriggers } = context;
    if (!widgets) return;

    for (const w of widgets) {
        if (w.type !== "lvgl_slider") continue;

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
    id: "lvgl_slider",
    name: "Slider",
    category: "LVGL",
    supportedModes: ['lvgl'],
    defaults: {
        value: 30,
        min: 0,
        max: 100,
        color: "blue",
        bg_color: "gray",
        border_width: 2,
        mode: "normal",
        vertical: false
    },
    render,
    exportLVGL,
    onExportNumericSensors
};
