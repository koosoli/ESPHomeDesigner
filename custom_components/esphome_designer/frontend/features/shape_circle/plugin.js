/**
 * Circle Shape Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};

    el.style.backgroundColor = props.fill ? getColorStyle(props.color) : "transparent";
    el.style.border = `${props.border_width || 1}px solid ${getColorStyle(props.border_color || props.color || "black")}`;
    el.style.borderRadius = "50%";
    el.style.boxSizing = "border-box";
};

const exportLVGL = (w, { common, convertColor, formatOpacity }) => {
    const p = w.props || {};
    return {
        obj: {
            ...common,
            bg_color: convertColor(p.bg_color || p.color),
            bg_opa: p.fill !== false ? "COVER" : "TRANSP",
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
    defaults: {
        width: 100,
        height: 100,
        fill: false,
        border_width: 1,
        color: "black",
        bg_color: "black",
        border_color: "black",
        opa: 255
    },
    render,
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
        const colorProp = p.color || "black";
        const borderColorProp = p.border_color || colorProp;
        const color = getColorConst(colorProp);
        const borderColor = getColorConst(borderColorProp);

        lines.push(`        // widget:shape_circle id:${w.id} type:shape_circle x:${w.x} y:${w.y} w:${w.width} h:${w.height} fill:${fill} border:${borderWidth} color:${colorProp} border_color:${borderColorProp} ${getCondProps(w)}`);

        const cond = getConditionCheck(w);
        if (cond) lines.push(`        ${cond}`);

        if (fill) {
            addDitherMask(lines, colorProp, isEpaper, Math.floor(w.x), Math.floor(w.y + (RECT_Y_OFFSET || 0)), Math.floor(w.width), Math.floor(w.height));
            if (!(colorProp.toLowerCase() === "gray" && isEpaper)) {
                lines.push(`        it.filled_circle(${cx}, ${cy}, ${r}, ${color});`);
            }
        }

        if (borderWidth > 0) {
            lines.push(`        for (int i = 0; i < ${borderWidth}; i++) {`);
            lines.push(`          it.circle(${cx}, ${cy}, ${r} - i, ${borderColor});`);
            lines.push(`        }`);
            if (!fill) {
                addDitherMask(lines, borderColorProp, isEpaper, Math.floor(w.x), Math.floor(w.y + (RECT_Y_OFFSET || 0)), Math.floor(w.width), Math.floor(w.height));
            }
        }

        if (cond) lines.push(`        }`);
    }
};
