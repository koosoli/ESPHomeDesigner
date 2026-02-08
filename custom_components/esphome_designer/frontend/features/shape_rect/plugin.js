/**
 * Rectangle Shape Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};

    const bgCol = props.bg_color || props.background_color || props.color || "theme_auto";
    el.style.backgroundColor = props.fill ? getColorStyle(bgCol) : "transparent";
    el.style.border = `${props.border_width || 1}px solid ${getColorStyle(props.border_color || props.color || "theme_auto")}`;
    el.style.boxSizing = "border-box";
};

const exportLVGL = (w, { common, convertColor, formatOpacity }) => {
    const p = w.props || {};
    return {
        obj: {
            ...common,
            bg_color: convertColor(p.bg_color || p.color),
            bg_opa: p.fill !== false ? "cover" : "transp",
            border_width: p.border_width,
            border_color: convertColor(p.border_color || p.color),
            radius: p.radius || 0,
            opa: formatOpacity(p.opa)
        }
    };
};

export default {
    id: "shape_rect",
    name: "Rectangle",
    category: "Shapes",
    supportedModes: ['lvgl', 'direct', 'oepl', 'opendisplay'],
    defaults: {
        width: 100,
        height: 100,
        fill: false,
        border_width: 1,
        color: "theme_auto",
        bg_color: "theme_auto",
        border_color: "theme_auto",
        radius: 0,
        opa: 255
    },
    render,
    exportOpenDisplay: (w, { layout, page }) => {
        const p = w.props || {};

        // Resolve colors (handle theme_auto)
        // Fallback to p.color if border/bg not set (matching render logic)
        let fill = p.fill ? (p.bg_color || p.color) : null;
        let outline = p.border_color || p.color || "black";

        // Force mapping for theme_auto
        if (fill === "theme_auto" || (p.fill && !fill)) fill = layout?.darkMode ? "white" : "black";
        if (outline === "theme_auto") outline = layout?.darkMode ? "white" : "black";

        return {
            type: "rectangle",
            x_start: Math.round(w.x),
            y_start: Math.round(w.y),
            x_end: Math.round(w.x + w.width),
            y_end: Math.round(w.y + w.height),
            fill: fill,
            outline: outline,
            width: p.border_width || 1,
            radius: p.radius || 0
        };
    },
    exportLVGL,
    exportOEPL: (w, { layout, page }) => {
        const p = w.props || {};
        return {
            type: "rectangle",
            x_start: Math.round(w.x),
            y_start: Math.round(w.y),
            x_end: Math.round(w.x + w.width),
            y_end: Math.round(w.y + w.height),
            fill: p.fill ? (p.bg_color || p.color || "black") : null,
            outline: p.border_color || p.color || "black",
            width: p.border_width || 1,
            radius: p.radius || 0
        };
    },
    export: (w, context) => {
        const {
            lines, getColorConst, addDitherMask, getCondProps, getConditionCheck, RECT_Y_OFFSET, isEpaper
        } = context;

        const p = w.props || {};
        const fill = !!p.fill;
        const borderWidth = parseInt(p.border_width || 1, 10);
        const colorProp = p.color || "theme_auto";
        const borderColorProp = p.border_color || colorProp;
        const color = getColorConst(colorProp);
        const borderColor = getColorConst(borderColorProp);

        const rectX = Math.floor(w.x);
        const rectY = Math.floor(w.y + (typeof RECT_Y_OFFSET !== 'undefined' ? RECT_Y_OFFSET : 0));
        const rectW = Math.floor(w.width);
        const rectH = Math.floor(w.height);

        lines.push(`        // widget:shape_rect id:${w.id} type:shape_rect x:${rectX} y:${rectY} w:${rectW} h:${rectH} fill:${fill} border:${borderWidth} color:${colorProp} border_color:${borderColorProp} ${getCondProps(w)}`);

        const cond = getConditionCheck(w);
        if (cond) lines.push(`        ${cond}`);

        if (fill) {
            addDitherMask(lines, colorProp, isEpaper, rectX, rectY, rectW, rectH, p.radius || 0);
            if (!(colorProp.toLowerCase() === "gray" && isEpaper)) {
                lines.push(`        it.filled_rectangle(${rectX}, ${rectY}, ${rectW}, ${rectH}, ${color});`);
            }
        }

        // Draw border if borderWidth > 0 (even if filled, per #123)
        if (borderWidth > 0) {
            lines.push(`        for (int i = 0; i < ${borderWidth}; i++) {`);
            lines.push(`          it.rectangle(${rectX} + i, ${rectY} + i, ${rectW} - 2 * i, ${rectH} - 2 * i, ${borderColor});`);
            lines.push(`        }`);
            if (!fill) {
                addDitherMask(lines, borderColorProp, isEpaper, rectX, rectY, rectW, rectH, p.radius || 0);
            }
        }

        if (cond) lines.push(`        }`);
    }
};
