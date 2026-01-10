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
    const hasTouch = profile?.touch;

    const btnObj = {
        button: {
            ...common,
            bg_color: convertColor(p.bg_color),
            bg_opa: "COVER",
            border_width: p.border_width,
            border_color: convertColor(p.color),
            radius: p.radius,
            opa: formatOpacity(p.opa),
            on_click: undefined,
            widgets: [
                {
                    label: {
                        align: "CENTER",
                        text: `"${p.text || 'BTN'}"`,
                        text_color: convertColor(p.color)
                    }
                }
            ]
        }
    };

    if (w.entity_id && hasTouch) {
        const safeEntity = w.entity_id.trim();
        let action = [];
        if (safeEntity.startsWith("switch.") || safeEntity.startsWith("light.") || safeEntity.startsWith("fan.") || safeEntity.startsWith("input_boolean.")) {
            action = [{ "homeassistant.service": { service: "homeassistant.toggle", data: { entity_id: safeEntity } } }];
        } else if (safeEntity.startsWith("script.")) {
            action = [{ "script.execute": safeEntity }];
        } else if (safeEntity.startsWith("button.") || safeEntity.startsWith("input_button.")) {
            action = [{ "button.press": safeEntity }];
        } else if (safeEntity.startsWith("scene.")) {
            action = [{ "scene.turn_on": safeEntity }];
        } else {
            action = [{ "homeassistant.service": { service: "homeassistant.toggle", data: { entity_id: safeEntity } } }];
        }
        btnObj.button.on_click = action;
    }
    return btnObj;
};

export default {
    id: "lvgl_button",
    name: "Button",
    category: "LVGL",
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
