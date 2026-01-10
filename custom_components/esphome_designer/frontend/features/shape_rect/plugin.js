/**
 * Rectangle Shape Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};

    el.style.backgroundColor = props.fill ? getColorStyle(props.color) : "transparent";
    el.style.border = `${props.border_width || 1}px solid ${getColorStyle(props.border_color || props.color || "black")}`;
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
            radius: p.radius || 0,
            opa: formatOpacity(p.opa)
        }
    };
};

export default {
    id: "shape_rect",
    name: "Rectangle",
    category: "Shapes",
    defaults: {
        width: 100,
        height: 100,
        fill: false,
        border_width: 1,
        color: "black",
        bg_color: "black",
        border_color: "black",
        radius: 0,
        opa: 255
    },
    render,
    exportLVGL,
    export: (w, context) => {
        const {
            lines, getColorConst, addDitherMask, getCondProps, getConditionCheck, RECT_Y_OFFSET, isEpaper
        } = context;

        const p = w.props || {};
        const fill = !!p.fill;
        const borderWidth = parseInt(p.border_width || 1, 10);
        const colorProp = p.color || "black";
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
            addDitherMask(lines, colorProp, isEpaper, rectX, rectY, rectW, rectH);
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
                addDitherMask(lines, borderColorProp, isEpaper, rectX, rectY, rectW, rectH);
            }
        }

        if (cond) lines.push(`        }`);
    }
};
