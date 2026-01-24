/**
 * Text / Label Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    el.innerHTML = "";
    el.style.display = "flex";

    const applyAlign = (align, element = el) => {
        if (!align) return;
        if (align.includes("LEFT")) element.style.justifyContent = "flex-start";
        else if (align.includes("RIGHT")) element.style.justifyContent = "flex-end";
        else element.style.justifyContent = "center";

        if (align.includes("TOP")) element.style.alignItems = "flex-start";
        else if (align.includes("BOTTOM")) element.style.alignItems = "flex-end";
        else element.style.alignItems = "center";
    };

    applyAlign(props.text_align || "TOP_LEFT");

    const body = document.createElement("div");
    body.style.color = getColorStyle(props.color);
    body.style.fontSize = `${props.font_size || props.value_font_size || 20}px`;
    body.style.fontFamily = (props.font_family || "Roboto") + ", sans-serif";
    body.style.fontWeight = String(props.font_weight || 400);
    body.style.fontStyle = props.italic ? "italic" : "normal";
    body.textContent = props.text || widget.title || "Text";

    el.appendChild(body);
};

const exportLVGL = (w, { common, convertColor, convertAlign, getLVGLFont, formatOpacity }) => {
    const p = w.props || {};
    return {
        label: {
            ...common,
            text: `"${p.text || 'Text'}"`,
            text_font: getLVGLFont(p.font_family, p.font_size, p.font_weight, p.italic),
            text_color: convertColor(p.color || p.text_color),
            text_align: (convertAlign(p.text_align) || "left").replace("top_", "").replace("bottom_", ""),
            bg_color: p.bg_color === "transparent" ? undefined : convertColor(p.bg_color),
            opa: formatOpacity(p.opa)
        }
    };
};

export default {
    id: "text", // also used for 'label'
    name: "Text",
    category: "Core",
    supportedModes: ['lvgl', 'direct', 'oepl', 'opendisplay'],
    defaults: {
        text: "Text",
        font_size: 20,
        font_family: "Roboto",
        color: "black",
        font_weight: 400,
        italic: false,
        bpp: 1,
        text_align: "TOP_LEFT",
        bg_color: "transparent",
        opa: 255
    },
    render,
    exportOpenDisplay: (w, { layout, page }) => {
        const p = w.props || {};
        return {
            type: "draw_text",
            x: Math.round(w.x),
            y: Math.round(w.y),
            text: p.text || w.title || "Text",
            size: p.font_size || 20,
            color: p.color || "black",
            font: p.font_family?.toLowerCase() || "roboto"
        };
    },
    exportLVGL,
    exportOEPL: (w, { layout, page }) => {
        const p = w.props || {};
        return {
            type: "text",
            value: p.text || w.title || "Text",
            x: Math.round(w.x),
            y: Math.round(w.y),
            size: p.font_size || 20,
            font: p.font_family?.includes("Mono") ? "mononoki.ttf" : "ppb.ttf",
            color: p.color || "black",
            align: (p.text_align || "TOP_LEFT").toLowerCase().replace("top_", "").replace("bottom_", "").replace("_", ""),
            anchor: "lt" // Start with left-top for simplicity
        };
    },
    export: (w, context) => {
        const {
            lines, getColorConst, addFont, getAlignX, getAlignY, getCondProps, getConditionCheck, Utils, isEpaper
        } = context;

        const p = w.props || {};
        const colorProp = p.color || "black";
        const fontSize = p.font_size || p.value_font_size || 20;
        const fontId = addFont(p.font_family || "Roboto", p.font_weight || 400, fontSize, p.italic);
        const text = p.text || w.title || "Text";
        const textAlign = p.text_align || "TOP_LEFT";

        // Check if gray text on e-paper - use dithering
        const isGrayOnEpaper = isEpaper && Utils && Utils.isGrayColor && Utils.isGrayColor(colorProp);
        const color = isGrayOnEpaper ? "COLOR_BLACK" : getColorConst(colorProp);

        lines.push(`        // widget:text id:${w.id} type:text x:${w.x} y:${w.y} w:${w.width} h:${w.height} text:"${text}" ${getCondProps(w)}`);

        const cond = getConditionCheck(w);
        if (cond) lines.push(`        ${cond}`);

        // Handle simple alignment for printf
        let x = w.x;
        let y = w.y;
        let align = "TextAlign::TOP_LEFT";

        if (textAlign.includes("CENTER")) {
            x = Math.round(w.x + w.width / 2);
            align = "TextAlign::TOP_CENTER";
        } else if (textAlign.includes("RIGHT")) {
            x = Math.round(w.x + w.width);
            align = "TextAlign::TOP_RIGHT";
        }

        if (textAlign.includes("BOTTOM")) {
            y = Math.round(w.y + w.height);
            align = align.replace("TOP_", "BOTTOM_");
        } else if (!textAlign.includes("TOP")) {
            // V-Center
            y = Math.round(w.y + w.height / 2);
            align = align.replace("TOP_", "CENTER_");
        }

        if (align === "TextAlign::CENTER_CENTER") align = "TextAlign::CENTER";

        lines.push(`        it.printf(${x}, ${y}, id(${fontId}), ${color}, ${align}, "${text.replace(/"/g, '\\"')}");`);

        // Apply dithering for gray text on e-paper
        if (isGrayOnEpaper) {
            lines.push(`        apply_grey_dither_to_text(${w.x}, ${w.y}, ${w.width}, ${w.height});`);
        }

        if (cond) lines.push(`        }`);
    }
};
