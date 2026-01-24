import { iconPickerData } from '../../js/core/constants_icons.js';

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};

    let iconCode = "F0595"; // Default
    let size = props.size || 24;
    const color = props.color || "black";

    const code = (props.code || "").trim().toUpperCase();
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
    el.style.color = getColorStyle(color);
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
        color: "black",
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
            type: "draw_icon",
            value: name,
            x: Math.round(w.x),
            y: Math.round(w.y),
            size: p.size || 48,
            color: p.color || "black"
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
            color: p.color || "black",
            anchor: "lt"
        };
    },
    exportLVGL: (w, { common, convertColor, getLVGLFont }) => {
        const p = w.props || {};
        const code = (p.code || "F0595").replace(/^0x/i, "");
        const size = parseInt(p.size || 48, 10);
        const color = convertColor(p.color || "black");

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
        const colorProp = p.color || "black";
        const color = getColorConst(colorProp);

        // Register Icon Font
        const fontRef = addFont("Material Design Icons", 400, size);

        lines.push(`        // widget:icon id:${w.id} type:icon x:${w.x} y:${w.y} w:${w.width} h:${w.height} code:${code} size:${size} color:${colorProp} ${getCondProps(w)}`);

        const cond = getConditionCheck(w);
        if (cond) lines.push(`        ${cond}`);

        // Use printf for icons to handle unicode safely
        lines.push(`        it.printf(${w.x}, ${w.y}, id(${fontRef}), ${color}, "%s", "\\U000${code}");`);

        // Apply grey dithering if color is gray (e-paper specific)
        addDitherMask(lines, colorProp, isEpaper, w.x, w.y, size, size);

        if (cond) lines.push(`        }`);
    }
};
