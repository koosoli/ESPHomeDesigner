/**
 * LVGL Slider Plugin
 */

const isLightEntity = (entityId) => String(entityId || "").trim().toLowerCase().startsWith("light.");

const getSliderSensorId = (entityId) => String(entityId || "").trim().replace(/[^a-zA-Z0-9_]/g, "_");

const getBrightnessSensorId = (entityId) => `${getSliderSensorId(entityId)}_brightness_pct`;

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
    const hasTouch = profile?.touch; // eslint-disable-line no-unused-vars
    let sliderValue = p.value || 30;
    const entityId = (w.entity_id || p.entity_id || p.entity || "").trim();
    const normalizedEntityId = entityId.toLowerCase();

    if (entityId) {
        if (isLightEntity(entityId)) {
            const brightnessSensorId = getBrightnessSensorId(entityId);
            sliderValue = `!lambda "return id(${brightnessSensorId}).has_state() ? id(${brightnessSensorId}).state : 0;"`;
        } else {
            sliderValue = `!lambda "return id(${getSliderSensorId(entityId)}).state;"`;
        }
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

    if (entityId) {
        let serviceCall;
        if (isLightEntity(entityId)) {
            serviceCall = {
                "if": {
                    condition: { lambda: "return x <= 0;" },
                    then: [
                        { "homeassistant.service": { service: "light.turn_off", data: { entity_id: entityId } } }
                    ],
                    else: [
                        { "homeassistant.service": { service: "light.turn_on", data: { entity_id: entityId, brightness_pct: "!lambda 'return x;'" } } }
                    ]
                }
            };
        } else if (normalizedEntityId.startsWith("fan.")) {
            serviceCall = { "homeassistant.service": { service: "fan.set_percentage", data: { entity_id: entityId, percentage: "!lambda 'return x;'" } } };
        } else if (normalizedEntityId.startsWith("cover.")) {
            serviceCall = { "homeassistant.service": { service: "cover.set_cover_position", data: { entity_id: entityId, position: "!lambda 'return x;'" } } };
        } else if (normalizedEntityId.startsWith("media_player.")) {
            serviceCall = { "homeassistant.service": { service: "media_player.volume_set", data: { entity_id: entityId, volume_level: "!lambda 'return x / 100.0;'" } } };
        } else if (normalizedEntityId.startsWith("climate.")) {
            serviceCall = { "homeassistant.service": { service: "climate.set_temperature", data: { entity_id: entityId, temperature: "!lambda 'return x;'" } } };
        } else {
            serviceCall = { "homeassistant.service": { service: "number.set_value", data: { entity_id: entityId, value: "!lambda 'return x;'" } } };
        }
        sliderObj.slider.on_value = [serviceCall];
    }
    return sliderObj;
};

const onExportNumericSensors = (context) => {
    const { widgets, isLvgl, pendingTriggers, lines, seenEntityIds, seenSensorIds } = context;
    if (!widgets) return;

    for (const w of widgets) {
        if (w.type !== "lvgl_slider") continue;

        const eid = (w.entity_id || w.props?.entity_id || w.props?.entity || "").trim();
        if (!eid) continue;

        if (isLightEntity(eid)) {
            const sensorId = getBrightnessSensorId(eid);
            const entityKey = `${eid}__attr__brightness_pct`;
            if (seenEntityIds && !seenEntityIds.has(entityKey)) {
                seenEntityIds.add(entityKey);
                if (seenSensorIds && !seenSensorIds.has(sensorId)) {
                    seenSensorIds.add(sensorId);
                    lines.push(
                        "- platform: homeassistant",
                        `  id: ${sensorId}`,
                        `  entity_id: ${eid}`,
                        "  attribute: brightness_pct",
                        "  internal: true"
                    );
                }
            }
        }

        if (isLvgl && pendingTriggers) {
            const triggerKey = isLightEntity(eid) ? getBrightnessSensorId(eid) : eid;
            if (!pendingTriggers.has(triggerKey)) {
                pendingTriggers.set(triggerKey, new Set());
            }
            pendingTriggers.get(triggerKey).add(`- lvgl.widget.refresh: ${w.id}`);
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
        vertical: false,
        opa: 255,
        entity_id: "",
        opacity: 255
    },
    schema: [
        {
            section: "Content",
            fields: [
                { key: "entity_id", target: "root", label: "Control Entity ID", type: "entity_picker", default: "" }
            ]
        },
        {
            section: "Range",
            fields: [
                { key: "value", label: "Value", type: "number", default: 30 },
                { key: "min", label: "Min Value", type: "number", default: 0 },
                { key: "max", label: "Max Value", type: "number", default: 100 },
                { key: "mode", label: "Mode", type: "select", options: ["normal", "symmetrical", "range"], default: "normal" }
            ]
        },
        {
            section: "Appearance",
            fields: [
                { key: "color", label: "Main Color", type: "color", default: "blue" },
                { key: "bg_color", label: "Track Color", type: "color", default: "gray" },
                { key: "border_width", label: "Knob Border", type: "number", default: 2 },
                { key: "vertical", label: "Vertical Orientation", type: "checkbox", default: false },
                { key: "opa", label: "Opacity (0 - 255)", type: "number", default: 255 },
                { key: "opacity", label: "Opacity (0 - 255)", type: "number", default: 255 }
            ]
        }
    ],
    render,
    exportLVGL,
    onExportNumericSensors
};
