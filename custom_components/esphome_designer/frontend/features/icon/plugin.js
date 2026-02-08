import { iconPickerData } from '../../js/core/constants_icons.js';
import { evaluateTemplatePreview } from '../../js/utils/text_utils.js';

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};

    let iconCode = "F0595"; // Default
    let size = props.size || 24;
    const color = props.color || "theme_auto";

    // Handle template colors in preview: use a fallback if it looks like a template
    let effectiveColor = color;
    if (typeof color === 'string' && color.includes('{{')) {
        // If it's a template, use a default visible color for the designer
        effectiveColor = 'black';
    }

    const colorStyle = getColorStyle(effectiveColor);

    const codeRaw = props.code || "";
    // Handle template in icon code
    const code = evaluateTemplatePreview(codeRaw, window.AppState?.entityStates).trim().toUpperCase();

    if (code.includes('{{')) {
        // Still has template - show placeholder
        el.innerText = "?";
        el.style.fontSize = `${size}px`;
        el.style.color = colorStyle;
        el.style.fontFamily = "inherit";
        return;
    }

    if (code && code.match(/^F[0-9A-F]{4}$/i)) {
        iconCode = code;
    }

    if (props.fit_icon_to_frame) {
        const padding = 4;
        const maxDim = Math.max(8, Math.min((widget.width || 0) - padding * 2, (widget.height || 0) - padding * 2));
        size = Math.round(maxDim);
    }

    const cp = 0xf0000 + parseInt(iconCode.slice(1), 16);
    const ch = String.fromCodePoint(cp);

    el.innerText = ch;
    el.style.fontSize = `${size}px`;
    el.style.color = colorStyle;
    el.style.fontFamily = "MDI, system-ui, -apple-system, BlinkMacSystemFont, -sans-serif";
    el.style.lineHeight = "1";
    el.style.display = "flex";
    el.style.alignItems = "center";
    el.style.justifyContent = "center";
};

export default {
    id: "icon",
    name: "MDI Icon",
    category: "Core",
    supportedModes: ['lvgl', 'direct', 'oepl', 'opendisplay'],
    defaults: {
        code: "F07D0",
        width: 60,
        height: 60,
        size: 48,
        color: "theme_auto",
        font_ref: "font_mdi_medium",
        fit_icon_to_frame: true
    },
    collectRequirements: (w, context) => {
        const p = w.props || {};
        const size = parseInt(p.size || 48, 10);
        if (p.code) {
            context.trackIcon(p.code, size);
        }
        // Register Font for LVGL and Direct
        context.addFont("Material Design Icons", 400, size);
    },
    render,
    exportOpenDisplay: (w, { layout, page }) => {
        const p = w.props || {};
        const code = (p.code || "F0595").toUpperCase().replace(/^0X/, "");
        const entry = iconPickerData.find(d => d.code.toUpperCase() === code);
        const name = entry ? entry.name : "information";

        return {
            type: "icon",
            value: name,
            x: Math.round(w.x),
            y: Math.round(w.y),
            size: p.size || 48,
            size: p.size || 48,
            fill: (p.color === "theme_auto") ? (layout?.darkMode ? "white" : "black") : (p.color || "black")
        };
    },
    exportOEPL: (w, { layout, page }) => {
        const p = w.props || {};
        const code = (p.code || "F0595").toUpperCase().replace(/^0X/, "");
        const entry = iconPickerData.find(d => d.code.toUpperCase() === code);
        const name = entry ? entry.name : "information"; // Default fallback

        return {
            type: "icon",
            value: name,
            x: Math.round(w.x),
            y: Math.round(w.y),
            size: p.size || 48,
            color: p.color || "theme_auto",
            anchor: "lt"
        };
    },
    exportLVGL: (w, { common, convertColor, getLVGLFont }) => {
        const p = w.props || {};
        const code = (p.code || "F0595").replace(/^0x/i, "");
        const size = parseInt(p.size || 48, 10);
        const color = convertColor(p.color || "theme_auto");

        return {
            label: {
                ...common,
                text: `"\\U000${code}"`,
                text_font: getLVGLFont("Material Design Icons", size, 400),
                text_color: color,
                text_align: "center"
            }
        };
    },
    export: (w, context) => {
        const {
            lines, addFont, getColorConst, addDitherMask, getCondProps, getConditionCheck, isEpaper
        } = context;

        const p = w.props || {};
        const code = (p.code || "F0595").replace(/^0x/i, "");
        const size = parseInt(p.size || 48, 10);
        const colorProp = p.color || "theme_auto";
        const color = getColorConst(colorProp);

        // Register Icon Font
        const fontRef = addFont("Material Design Icons", 400, size);

        lines.push(`        // widget:icon id:${w.id} type:icon x:${w.x} y:${w.y} w:${w.width} h:${w.height} code:${code} size:${size} color:${colorProp} ${getCondProps(w)}`);

        // Background fill
        const bgColorProp = p.bg_color || p.background_color || "transparent";
        if (bgColorProp && bgColorProp !== "transparent") {
            const bgColorConst = getColorConst(bgColorProp);
            lines.push(`        it.filled_rectangle(${w.x}, ${w.y}, ${w.width}, ${w.height}, ${bgColorConst});`);
        }

        const cond = getConditionCheck(w);
        if (cond) lines.push(`        ${cond}`);

        const centerX = Math.round(w.x + w.width / 2);
        const centerY = Math.round(w.y + w.height / 2);

        // Use printf for icons to handle unicode safely
        lines.push(`        it.printf(${centerX}, ${centerY}, id(${fontRef}), ${color}, TextAlign::CENTER, "%s", "\\U000${code}");`);

        // Apply grey dithering if color is gray (e-paper specific)
        addDitherMask(lines, colorProp, isEpaper, w.x, w.y, size, size);

        if (cond) lines.push(`        }`);
    }
};
