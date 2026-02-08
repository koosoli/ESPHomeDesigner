/**
 * LVGL Label Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    let text = props.text || "Label";

    if (widget.entity_id || props.entity_id) {
        const eid = widget.entity_id || props.entity_id;
        if (window.AppState && window.AppState.entityStates && window.AppState.entityStates[eid]) {
            text = String(window.AppState.entityStates[eid].state);
        } else {
            text = "{" + eid.split('.').pop() + "}";
        }
    }

    el.innerText = text;
    el.style.fontSize = (props.font_size || 20) + "px";
    el.style.color = getColorStyle(props.color || "black");
    el.style.backgroundColor = (props.bg_color && props.bg_color !== "transparent") ? getColorStyle(props.bg_color) : "transparent";
    el.style.display = "flex";

    const align = props.text_align || "CENTER";

    // Horizontal (Justify Content in Flex Row default)
    if (align.includes("LEFT")) el.style.justifyContent = "flex-start";
    else if (align.includes("RIGHT")) el.style.justifyContent = "flex-end";
    else el.style.justifyContent = "center"; // CENTER, TOP_CENTER, BOTTOM_CENTER

    // Vertical (Align Items in Flex Row default)
    if (align.includes("TOP")) el.style.alignItems = "flex-start";
    else if (align.includes("BOTTOM")) el.style.alignItems = "flex-end";
    else el.style.alignItems = "center"; // CENTER, CENTER_LEFT, CENTER_RIGHT

    el.style.fontFamily = props.font_family === "Custom..." ? (props.custom_font_family || "sans-serif") : (props.font_family || "sans-serif");
    if (props.italic) el.style.fontStyle = "italic";
    el.style.fontWeight = props.font_weight || 400;

    el.style.whiteSpace = "pre-wrap";
    el.style.overflow = "hidden";
    el.style.opacity = (props.opa !== undefined ? props.opa : 255) / 255;

    // Border
    const borderWidth = props.border_width || 0;
    if (borderWidth > 0) {
        el.style.border = `${borderWidth}px solid ${getColorStyle(props.border_color || "black")}`;
        el.style.borderRadius = `${props.border_radius || 0}px`;
        el.style.boxSizing = "border-box";
    }
};

const exportLVGL = (w, { common, convertColor, convertAlign, getLVGLFont, formatOpacity }) => {
    const p = w.props || {};
    let labelText = `"${p.text || 'Label'}"`;

    const eid = (w.entity_id || p.entity_id || "").trim();
    if (eid) {
        if (eid.startsWith("text_sensor.") || eid.startsWith("weather.")) {
            labelText = `!lambda "return id(${eid.replace(/[^a-zA-Z0-9_]/g, "_")}).state.c_str();"`;
        } else {
            labelText = `!lambda "return str_sprintf(\\"%.1f\\", id(${eid.replace(/[^a-zA-Z0-9_]/g, "_")}).state).c_str();"`;
        }
    }

    // Fix #268: Robust alignment mapping for LVGL
    let textAlign = "CENTER";
    const rawAlign = p.text_align || "CENTER";

    if (rawAlign.includes("LEFT")) {
        textAlign = "LEFT";
    } else if (rawAlign.includes("RIGHT")) {
        textAlign = "RIGHT";
    } else {
        textAlign = "CENTER";
    }

    return {
        label: {
            ...common,
            text: labelText,
            text_font: getLVGLFont(p.font_family, p.font_size, p.font_weight, p.italic),
            text_color: convertColor(p.color || p.text_color),
            text_align: textAlign,
            bg_color: p.bg_color === "transparent" ? undefined : convertColor(p.bg_color),
            opa: formatOpacity(p.opa),
            border_width: p.border_width || 0,
            border_color: convertColor(p.border_color || "black"),
            border_side: (p.border_width > 0) ? "full" : "none",
            radius: p.border_radius || 0
        }
    };
};

export default {
    id: "lvgl_label",
    name: "Label",
    category: "LVGL",
    defaults: {
        text: "Label",
        font_size: 20,
        font_family: "Roboto",
        color: "black",
        font_weight: 400,
        italic: false,
        text_align: "CENTER",
        bg_color: "transparent",
        opa: 255,
        border_width: 0,
        border_color: "black",
        border_radius: 0,
        entity_id: ""
    },
    render,
    exportLVGL,
    export: (w, context) => {
        const {
            lines, getColorConst, addFont, getCondProps, getConditionCheck, Utils
        } = context;

        const p = w.props || {};
        const colorProp = p.color || "black";
        const fontSize = p.font_size || 20;
        const fontFamily = p.font_family || "Roboto";
        const fontId = addFont(fontFamily, p.font_weight || 400, fontSize, p.italic);
        const text = p.text || "Label";
        const textAlign = p.text_align || "CENTER";

        lines.push(`        // widget:lvgl_label id:${w.id} type:lvgl_label x:${w.x} y:${w.y} w:${w.width} h:${w.height} align:${textAlign} text:"${text.substring(0, 50)}" ${getCondProps(w)}`);

        // Background fill
        const bgColorProp = p.bg_color || p.background_color || "transparent";
        if (bgColorProp && bgColorProp !== "transparent") {
            const bgColorConst = getColorConst(bgColorProp);
            lines.push(`        it.filled_rectangle(${w.x}, ${w.y}, ${w.width}, ${w.height}, ${bgColorConst});`);
        }

        const cond = getConditionCheck(w);
        if (cond) lines.push(`        ${cond}`);

        // Horizontal Component
        let x = w.x;
        let alignH = "LEFT";
        if (textAlign.includes("RIGHT")) {
            x = Math.round(w.x + w.width);
            alignH = "RIGHT";
        } else if (textAlign.includes("CENTER")) {
            x = Math.round(w.x + w.width / 2);
            alignH = "CENTER";
        }

        // Vertical Component
        let y = w.y;
        let alignV = "TOP";
        if (textAlign.includes("BOTTOM")) {
            y = Math.round(w.y + w.height);
            alignV = "BOTTOM";
        } else if (textAlign === "CENTER" || (!textAlign.includes("TOP") && !textAlign.includes("BOTTOM"))) {
            y = Math.round(w.y + w.height / 2);
            alignV = "CENTER";
        }

        // Construct ESPHome Enum
        let esphomeAlign = `TextAlign::${alignV}_${alignH}`;
        if (esphomeAlign === "TextAlign::CENTER_CENTER") esphomeAlign = "TextAlign::CENTER";

        const color = getColorConst(colorProp);
        const escapedLine = text.replace(/"/g, '\\"').replace(/%/g, '%%');
        lines.push(`        it.printf(${x}, ${y}, id(${fontId}), ${color}, ${esphomeAlign}, "${escapedLine}");`);

        // Draw Border if defined
        const borderWidth = p.border_width || 0;
        if (borderWidth > 0) {
            const borderColor = getColorConst(p.border_color || "black");
            for (let i = 0; i < borderWidth; i++) {
                lines.push(`        it.rectangle(${w.x} + ${i}, ${w.y} + ${i}, ${w.width} - 2 * ${i}, ${w.height} - 2 * ${i}, ${borderColor});`);
            }
        }

        if (cond) lines.push(`        }`);
    },
    onExportNumericSensors: (context) => {
        const { widgets, isLvgl, pendingTriggers } = context;
        if (!widgets) return;

        for (const w of widgets) {
            if (w.type !== "lvgl_label") continue;

            let eid = (w.entity_id || w.props?.entity_id || "").trim();
            if (!eid) continue;

            const isText = eid.startsWith("text_sensor.") || eid.startsWith("weather.");
            if (isText) continue; // Handled by onExportTextSensors

            if (!eid.includes(".")) eid = `sensor.${eid}`;

            if (isLvgl && pendingTriggers) {
                if (!pendingTriggers.has(eid)) {
                    pendingTriggers.set(eid, new Set());
                }
                pendingTriggers.get(eid).add(`- lvgl.widget.refresh: ${w.id}`);
            }
        }
    },
    onExportTextSensors: (context) => {
        const { widgets, isLvgl, pendingTriggers } = context;
        if (!widgets) return;

        for (const w of widgets) {
            if (w.type !== "lvgl_label") continue;

            let eid = (w.entity_id || w.props?.entity_id || "").trim();
            if (!eid || !(eid.startsWith("text_sensor.") || eid.startsWith("weather."))) continue;

            if (isLvgl && pendingTriggers) {
                if (!pendingTriggers.has(eid)) {
                    pendingTriggers.set(eid, new Set());
                }
                pendingTriggers.get(eid).add(`- lvgl.widget.refresh: ${w.id}`);
            }
        }
    },
    collectRequirements: (w, { addFont }) => {
        const p = w.props || {};
        addFont(p.font_family, p.font_weight, p.font_size, p.italic);
    }
};
