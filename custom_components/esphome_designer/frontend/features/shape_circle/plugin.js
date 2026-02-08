/**
 * Circle Shape Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};

    const bgCol = props.bg_color || props.background_color || props.color || "theme_auto";
    el.style.backgroundColor = props.fill ? getColorStyle(bgCol) : "transparent";
    el.style.border = `${props.border_width || 1}px solid ${getColorStyle(props.border_color || props.color || "theme_auto")}`;
    el.style.borderRadius = "50%";
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
            radius: Math.min(w.w || w.width || 100, w.h || w.height || 100), // Circle = large radius
            opa: formatOpacity(p.opa)
        }
    };
};

export default {
    id: "shape_circle",
    name: "Circle",
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
        opa: 255
    },
    render,
    exportOpenDisplay: (w, { layout, page }) => {
        const p = w.props || {};
        const r = Math.floor(Math.min(w.width, w.height) / 2);
        const cx = Math.floor(w.x + w.width / 2);
        const cy = Math.floor(w.y + w.height / 2);

        return {
            type: "circle",
            x: cx,
            y: cy,
            radius: r,
            fill: p.fill ? (p.bg_color === "theme_auto" || !p.bg_color ? (layout?.darkMode ? "white" : "black") : p.bg_color) : null,
            outline: (p.border_color === "theme_auto" || !p.border_color) ? (layout?.darkMode ? "white" : "black") : (p.border_color || "black"),
            width: p.border_width || 1
        };
    },
    exportOEPL: (w, { layout, page }) => {
        const p = w.props || {};
        const r = Math.floor(Math.min(w.width, w.height) / 2);
        const cx = Math.floor(w.x + w.width / 2);
        const cy = Math.floor(w.y + w.height / 2);

        return {
            type: "circle",
            x: cx,
            y: cy,
            radius: r,
            fill: p.fill ? (p.bg_color || p.color || "black") : null,
            outline: p.border_color || p.color || "black",
            width: p.border_width || 1
        };
    },
    exportLVGL,
    export: (w, context) => {
        const {
            lines, getColorConst, addDitherMask, getCondProps, getConditionCheck, RECT_Y_OFFSET, isEpaper
        } = context;

        const p = w.props || {};
        const r = Math.floor(Math.min(w.width, w.height) / 2);
        const cx = Math.floor(w.x + w.width / 2);
        const cy = Math.floor(w.y + w.height / 2 + (typeof RECT_Y_OFFSET !== 'undefined' ? RECT_Y_OFFSET : 0));
        const fill = !!p.fill;
        const borderWidth = parseInt(p.border_width || 1, 10);
        const colorProp = p.color || "theme_auto";
        const borderColorProp = p.border_color || colorProp;
        const color = getColorConst(colorProp);
        const borderColor = getColorConst(borderColorProp);

        lines.push(`        // widget:shape_circle id:${w.id} type:shape_circle x:${w.x} y:${w.y} w:${w.width} h:${w.height} fill:${fill} border:${borderWidth} color:${colorProp} border_color:${borderColorProp} ${getCondProps(w)}`);

        const cond = getConditionCheck(w);
        if (cond) lines.push(`        ${cond}`);

        if (fill) {
            addDitherMask(lines, colorProp, isEpaper, Math.floor(w.x), Math.floor(w.y + (RECT_Y_OFFSET || 0)), Math.floor(w.width), Math.floor(w.height), r);
            if (!(colorProp.toLowerCase() === "gray" && isEpaper)) {
                lines.push(`        it.filled_circle(${cx}, ${cy}, ${r}, ${color});`);
            }
        }

        if (borderWidth > 0) {
            lines.push(`        for (int i = 0; i < ${borderWidth}; i++) {`);
            lines.push(`          it.circle(${cx}, ${cy}, ${r} - i, ${borderColor});`);
            lines.push(`        }`);
            if (!fill) {
                addDitherMask(lines, borderColorProp, isEpaper, Math.floor(w.x), Math.floor(w.y + (RECT_Y_OFFSET || 0)), Math.floor(w.width), Math.floor(w.height), r);
            }
        }

        if (cond) lines.push(`        }`);
    }
};
