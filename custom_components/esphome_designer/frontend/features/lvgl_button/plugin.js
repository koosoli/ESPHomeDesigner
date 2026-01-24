/**
 * LVGL Button Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    el.innerHTML = "";
    el.style.display = "flex";
    el.style.alignItems = "center";
    el.style.justifyContent = "center";
    el.style.boxSizing = "border-box";
    el.style.backgroundColor = getColorStyle(props.bg_color || "white");
    el.style.border = `${props.border_width || 2}px solid ${getColorStyle(props.color || "black")}`;
    el.style.borderRadius = `${props.radius || 5}px`;

    const text = document.createElement("span");
    text.textContent = props.text || "BTN";
    text.style.color = getColorStyle(props.color || "black");
    text.style.fontFamily = "Roboto, sans-serif";
    text.style.fontSize = "14px";
    text.style.pointerEvents = "none";
    el.appendChild(text);
};

const exportLVGL = (w, { common, convertColor, formatOpacity, profile }) => {
    const p = w.props || {};

    // Robust entity ID detection: check top-level, props.entity_id, and props.entity
    const entityId = (w.entity_id || p.entity_id || p.entity || "").trim();

    const btnObj = {
        button: {
            ...common,
            bg_color: convertColor(p.bg_color),
            bg_opa: "cover",
            border_width: p.border_width,
            border_color: convertColor(p.color),
            radius: p.radius,
            opa: formatOpacity(p.opa),
            on_click: undefined,
            widgets: [
                {
                    label: {
                        align: "center",
                        text: `"${p.text || 'BTN'}"`,
                        text_color: convertColor(p.color)
                    }
                }
            ]
        }
    };

    if (entityId) {
        let action = [];
        if (entityId.startsWith("switch.") || entityId.startsWith("light.") || entityId.startsWith("fan.") || entityId.startsWith("input_boolean.")) {
            action = [{ "homeassistant.service": { service: "homeassistant.toggle", data: { entity_id: entityId } } }];
        } else if (entityId.startsWith("script.")) {
            action = [{ "script.execute": entityId }];
        } else if (entityId.startsWith("button.") || entityId.startsWith("input_button.")) {
            action = [{ "button.press": entityId }];
        } else if (entityId.startsWith("scene.")) {
            action = [{ "scene.turn_on": entityId }];
        } else {
            // Default to toggle for unknown domains if it looks like an entity ID
            action = [{ "homeassistant.service": { service: "homeassistant.toggle", data: { entity_id: entityId } } }];
        }
        btnObj.button.on_click = action;
    }
    return btnObj;
};

export default {
    id: "lvgl_button",
    name: "Button",
    category: "LVGL",
    supportedModes: ['lvgl'],
    defaults: {
        text: "Button",
        bg_color: "white",
        color: "black",
        border_width: 2,
        radius: 5
    },
    render,
    exportLVGL
};
