// @ts-nocheck
/**
 * LVGL Button Plugin
 */

import { getWeightsForFont, clampFontWeight } from '../../js/core/font_weights.js'; // eslint-disable-line no-unused-vars

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const textColor = props.color || props.text_color || "theme_auto";
    el.innerHTML = "";
    el.style.display = "flex";
    el.style.alignItems = "center";
    el.style.justifyContent = "center";
    el.style.boxSizing = "border-box";
    el.style.backgroundColor = getColorStyle(props.bg_color || "white");
    el.style.border = `${props.border_width || 2}px solid ${getColorStyle(textColor)}`;
    el.style.borderRadius = `${props.radius || 5}px`;

    const text = document.createElement("span");
    text.textContent = props.text || "BTN";
    text.style.color = getColorStyle(textColor);
    text.style.fontFamily = props.font_family || "Roboto, sans-serif";
    text.style.fontSize = (props.font_size || 14) + "px";
    text.style.fontWeight = props.font_weight || 400;
    if (props.italic) text.style.fontStyle = "italic";
    text.style.pointerEvents = "none";
    el.appendChild(text);
};

const exportLVGL = (w, { common, convertColor, formatOpacity, _profile, getLVGLFont }) => {
    const p = w.props || {};
    const textColor = p.color || p.text_color;

    // Robust entity ID detection: check top-level, props.entity_id, and props.entity
    const entityId = (w.entity_id || p.entity_id || p.entity || "").trim();

    const btnObj = {
        button: {
            ...common,
            bg_color: convertColor(p.bg_color),
            bg_opa: "cover",
            border_width: p.border_width,
            border_color: convertColor(textColor),
            radius: p.radius,
            opa: formatOpacity(p.opa),
            on_click: undefined,
            widgets: [
                {
                    label: {
                        align: "center",
                        text: `"${p.text || 'BTN'}"`,
                        text_font: getLVGLFont ? getLVGLFont(p.font_family, p.font_size, p.font_weight, p.italic) : undefined,
                        text_color: convertColor(textColor)
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
            action = [{ "homeassistant.service": { service: "button.press", data: { entity_id: entityId } } }];
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
        bg_color: "theme_auto_inverse",
        color: "theme_auto",
        border_width: 2,
        radius: 5,
        checkable: false,
        opa: 255,
        font_size: 14,
        font_family: "Roboto",
        font_weight: 400,
        italic: false,
        entity_id: "",
        opacity: 255
    },
    schema: [
        {
            section: "Content",
            fields: [
                { key: "text", label: "Button Text", type: "text", default: "Button" },
                { key: "entity_id", target: "root", label: "Action Entity ID", type: "entity_picker", default: "" }
            ]
        },
        {
            section: "Appearance",
            fields: [
                { key: "color", label: "Text/Border Color", type: "color", default: "theme_auto" },
                { key: "bg_color", label: "Background color", type: "color", default: "theme_auto_inverse" },
                { key: "border_width", label: "Border width", type: "number", default: 2 },
                { key: "radius", label: "Corner Radius", type: "number", default: 5 },
                { key: "checkable", label: "Checkable (Toggle)", type: "checkbox", default: false },
                { key: "opa", label: "Opacity (0 - 255)", type: "number", default: 255 },
                { key: "opacity", label: "Opacity (0 - 255)", type: "number", default: 255 }
            ]
        },
        {
            section: "Typography",
            fields: [
                { key: "font_size", label: "Font Size", type: "number", default: 14 },
                { key: "font_family", label: "Font Family", type: "select", options: ["Roboto", "Inter", "Open Sans", "Lato", "Montserrat", "Poppins", "Raleway", "Roboto Mono", "Ubuntu", "Nunito", "Playfair Display", "Merriweather", "Work Sans", "Source Sans Pro", "Quicksand"], default: "Roboto" },
                { key: "font_weight", label: "Font Weight", type: "select", options: [100, 200, 300, 400, 500, 600, 700, 800, 900], default: 400 },
                { key: "italic", label: "Italic", type: "checkbox", default: false }
            ]
        }
    ],
    render,
    exportLVGL,
    collectRequirements: (w, { addFont }) => {
        const p = w.props || {};
        addFont(p.font_family || "Roboto", p.font_weight || 400, p.font_size || 14, !!p.italic);
    }
};
