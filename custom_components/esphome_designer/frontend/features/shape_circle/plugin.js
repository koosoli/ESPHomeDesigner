import {
    renderFillableShapeProperties,
    resolveFillableShapeBorderWidth,
    resolveFillableShapeColors,
    resolveFillableShapeFillEnabled
} from '../_shared/fillable_shape.js';

/**
 * Circle Shape Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const borderWidth = resolveFillableShapeBorderWidth(props, 1);
    const { fillColor, borderColor } = resolveFillableShapeColors(props);
    const fillEnabled = resolveFillableShapeFillEnabled(props);

    el.style.backgroundColor = fillEnabled ? getColorStyle(fillColor) : "transparent";
    el.style.border = `${borderWidth}px solid ${getColorStyle(borderColor)}`;
    el.style.borderRadius = "50%";
    el.style.boxSizing = "border-box";

    if (props.opacity !== undefined && props.opacity < 100) {
        el.style.opacity = props.opacity / 100;
    }
};

const exportLVGL = (w, { common, convertColor, formatOpacity }) => {
    const p = w.props || {};
    const borderWidth = resolveFillableShapeBorderWidth(p, 1);
    const { fillColor, borderColor } = resolveFillableShapeColors(p);
    const fillEnabled = resolveFillableShapeFillEnabled(p);
    return {
        obj: {
            ...common,
            bg_color: convertColor(fillColor),
            bg_opa: fillEnabled ? "cover" : "transp",
            border_width: borderWidth,
            border_color: convertColor(borderColor),
            radius: "CIRCLE",
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
        width: 80,
        height: 80,
        border_width: 1,
        bg_color: "transparent",
        border_color: "theme_auto",
        opacity: 100,
        opa: 255
    },
    renderProperties: (panel, widget) => renderFillableShapeProperties(panel, widget, {
        defaultBorderWidth: 1
    }),
    render,
    exportOpenDisplay: (w, { layout, _page }) => {
        const p = w.props || {};
        const borderWidth = resolveFillableShapeBorderWidth(p, 1);
        const { fillColor, borderColor } = resolveFillableShapeColors(p);
        const fillEnabled = resolveFillableShapeFillEnabled(p);

        let fill = fillEnabled ? fillColor : null;
        let outline = borderColor || "black";

        if (fill === "theme_auto" || (fillEnabled && !fill)) fill = layout?.darkMode ? "white" : "black";
        if (outline === "theme_auto") outline = layout?.darkMode ? "white" : "black";

        return {
            type: "circle",
            x: Math.round(w.x + w.width / 2),
            y: Math.round(w.y + w.height / 2),
            radius: Math.round(Math.min(w.width, w.height) / 2),
            fill,
            outline,
            width: borderWidth
        };
    },
    exportOEPL: (w, { _layout, _page }) => {
        const p = w.props || {};
        const borderWidth = resolveFillableShapeBorderWidth(p, 1);
        const { fillColor, borderColor } = resolveFillableShapeColors(p);
        const fillEnabled = resolveFillableShapeFillEnabled(p);
        return {
            type: "circle",
            x: Math.round(w.x + w.width / 2),
            y: Math.round(w.y + w.height / 2),
            radius: Math.round(Math.min(w.width, w.height) / 2),
            fill: fillEnabled ? (fillColor || "black") : null,
            outline: borderColor || "black",
            width: borderWidth
        };
    },
    exportLVGL,
    export: (w, context) => {
        const {
            lines, getColorConst, addDitherMask, getCondProps, getConditionCheck, RECT_Y_OFFSET, isEpaper // eslint-disable-line no-unused-vars
        } = context;

        const p = w.props || {};
        const fill = resolveFillableShapeFillEnabled(p);
        const borderWidth = resolveFillableShapeBorderWidth(p, 1);
        const { fillColor: fillColorProp, borderColor: borderColorProp } = resolveFillableShapeColors(p);

        const fillColor = getColorConst(fillColorProp);
        const borderColor = getColorConst(borderColorProp);

        const circleX = Math.floor(w.x + w.width / 2);
        const circleY = Math.floor(w.y + w.height / 2 + (typeof RECT_Y_OFFSET !== 'undefined' ? RECT_Y_OFFSET : 0));
        const radius = Math.floor(Math.min(w.width, w.height) / 2);

        const cond = getConditionCheck(w);
        if (cond) lines.push(`        ${cond}`);

        if (fill) {
            addDitherMask(lines, fillColorProp, isEpaper, w.x, w.y, w.width, w.height, radius);
            if (!(fillColorProp.toLowerCase() === "gray" && isEpaper)) {
                lines.push(`        it.filled_circle(${circleX}, ${circleY}, ${radius}, ${fillColor});`);
            }
        }

        if (borderWidth > 0) {
            lines.push(`        for (int i = 0; i < ${borderWidth}; i++) {`);
            lines.push(`          it.circle(${circleX}, ${circleY}, ${radius} - i, ${borderColor});`);
            lines.push("        }");
            if (!fill) {
                addDitherMask(lines, borderColorProp, isEpaper, w.x, w.y, w.width, w.height, radius);
            }
        }

        if (cond) lines.push("        }");
    }
};
