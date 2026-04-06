import {
    renderFillableShapeProperties,
    resolveFillableShapeBorderWidth,
    resolveFillableShapeColors,
    resolveFillableShapeFillEnabled
} from '../_shared/fillable_shape.js';

/**
 * Rounded Rectangle Shape Plugin
 */

const resolveRoundedRectAppearance = (props = {}) => {
    const { fillColor, borderColor } = resolveFillableShapeColors(props);
    const borderWidth = resolveFillableShapeBorderWidth(props, 1, { respectShowBorder: true });
    return { fillColor, borderColor, borderWidth };
};

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const radius = parseInt(props.radius ?? props.corner_radius ?? props.border_radius ?? 10, 10) || 10;
    const { fillColor, borderColor, borderWidth } = resolveRoundedRectAppearance(props);
    const fillEnabled = resolveFillableShapeFillEnabled(props);

    el.style.backgroundColor = fillEnabled ? getColorStyle(fillColor) : "transparent";
    el.style.border = `${borderWidth}px solid ${getColorStyle(borderColor)}`;
    el.style.borderRadius = `${radius}px`;
    el.style.boxSizing = "border-box";

    if (props.opacity !== undefined && props.opacity < 100) {
        el.style.opacity = props.opacity / 100;
    }
};

const exportLVGL = (w, { common, convertColor, formatOpacity }) => {
    const p = w.props || {};
    const radius = parseInt(p.radius ?? p.corner_radius ?? p.border_radius ?? 10, 10) || 10;
    const { fillColor, borderColor, borderWidth } = resolveRoundedRectAppearance(p);
    const fillEnabled = resolveFillableShapeFillEnabled(p);
    return {
        obj: {
            ...common,
            bg_color: convertColor(fillColor),
            bg_opa: fillEnabled ? "cover" : "transp",
            border_width: borderWidth,
            border_color: convertColor(borderColor),
            radius,
            opa: formatOpacity(p.opa)
        }
    };
};

export default {
    id: "rounded_rect",
    name: "Rounded Rectangle",
    category: "Shapes",
    supportedModes: ['lvgl', 'direct', 'oepl', 'opendisplay'],
    defaults: {
        width: 100,
        height: 100,
        radius: 10,
        border_width: 1,
        bg_color: "transparent",
        show_border: true,
        border_color: "theme_auto",
        opacity: 100,
        opa: 255
    },
    renderProperties: (panel, widget) => renderFillableShapeProperties(panel, widget, {
        defaultBorderWidth: 1,
        defaultRadius: 10,
        includeRadius: true,
        respectShowBorder: true
    }),
    render,
    exportOpenDisplay: (w, { layout, _page }) => {
        const p = w.props || {};
        const radius = parseInt(p.radius ?? p.corner_radius ?? p.border_radius ?? 0, 10) || 0;
        const { fillColor, borderColor, borderWidth } = resolveRoundedRectAppearance(p);
        const fillEnabled = resolveFillableShapeFillEnabled(p);
        let fill = fillEnabled ? fillColor : null;
        let outline = borderColor || "black";

        if (fill === "theme_auto" || (fillEnabled && !fill)) fill = layout?.darkMode ? "white" : "black";
        if (outline === "theme_auto") outline = layout?.darkMode ? "white" : "black";

        return {
            type: "rectangle",
            x_start: Math.round(w.x),
            y_start: Math.round(w.y),
            x_end: Math.round(w.x + w.width),
            y_end: Math.round(w.y + w.height),
            fill,
            outline,
            width: borderWidth,
            radius
        };
    },
    exportOEPL: (w, { _layout, _page }) => {
        const p = w.props || {};
        const radius = parseInt(p.radius ?? p.corner_radius ?? p.border_radius ?? 0, 10) || 0;
        const { fillColor, borderColor, borderWidth } = resolveRoundedRectAppearance(p);
        const fillEnabled = resolveFillableShapeFillEnabled(p);
        return {
            type: "rectangle",
            x_start: Math.round(w.x),
            y_start: Math.round(w.y),
            x_end: Math.round(w.x + w.width),
            y_end: Math.round(w.y + w.height),
            fill: fillEnabled ? (fillColor || "black") : null,
            outline: borderColor || "black",
            width: borderWidth,
            radius
        };
    },
    exportLVGL,
    export: (w, context) => {
        const {
            lines, getColorConst, addDitherMask, getCondProps, getConditionCheck, RECT_Y_OFFSET, isEpaper // eslint-disable-line no-unused-vars
        } = context;

        const p = w.props || {};
        const fill = resolveFillableShapeFillEnabled(p);
        const { fillColor: fillColorProp, borderColor: borderColorProp, borderWidth } = resolveRoundedRectAppearance(p);
        const radius = parseInt(p.radius ?? p.corner_radius ?? p.border_radius ?? 10, 10) || 10;

        const fillColor = getColorConst(fillColorProp);
        const borderColor = getColorConst(borderColorProp);

        const rrectX = Math.floor(w.x);
        const rrectY = Math.floor(w.y + (typeof RECT_Y_OFFSET !== 'undefined' ? RECT_Y_OFFSET : 0));
        const rrectW = Math.floor(w.width);
        const rrectH = Math.floor(w.height);

        const cond = getConditionCheck(w);
        if (cond) lines.push(`        ${cond}`);
        lines.push("        {");

        if (fill) {
            lines.push("          auto draw_filled_rrect = [&](int x, int y, int w, int h, int r, auto c) {");
            lines.push("            it.filled_rectangle(x + r, y, w - 2 * r, h, c);");
            lines.push("            it.filled_rectangle(x, y + r, r, h - 2 * r, c);");
            lines.push("            it.filled_rectangle(x + w - r, y + r, r, h - 2 * r, c);");
            lines.push("            it.filled_circle(x + r, y + r, r, c);");
            lines.push("            it.filled_circle(x + w - r - 1, y + r, r, c);");
            lines.push("            it.filled_circle(x + r, y + h - r - 1, r, c);");
            lines.push("            it.filled_circle(x + w - r - 1, y + h - r - 1, r, c);");
            lines.push("          };");

            let innerX = rrectX;
            let innerY = rrectY;
            let innerW = rrectW;
            let innerH = rrectH;
            let innerRadius = radius;

            if (borderWidth > 0) {
                lines.push(`          draw_filled_rrect(${rrectX}, ${rrectY}, ${rrectW}, ${rrectH}, ${radius}, ${borderColor});`);
                innerX += borderWidth;
                innerY += borderWidth;
                innerW -= 2 * borderWidth;
                innerH -= 2 * borderWidth;
                innerRadius = Math.max(0, radius - borderWidth);
            }

            if (fillColorProp.toLowerCase() === "gray" && isEpaper) {
                addDitherMask(lines, fillColorProp, isEpaper, innerX, innerY, innerW, innerH, innerRadius);
            } else if (innerW > 0 && innerH > 0) {
                lines.push(`          draw_filled_rrect(${innerX}, ${innerY}, ${innerW}, ${innerH}, ${innerRadius}, ${fillColor});`);
            }
        } else if (borderWidth > 0) {
            lines.push("          auto draw_rrect_border = [&](int x, int y, int w, int h, int r, int t, auto c) {");
            lines.push("            it.filled_rectangle(x + r, y, w - 2 * r, t, c);");
            lines.push("            it.filled_rectangle(x + r, y + h - t, w - 2 * r, t, c);");
            lines.push("            it.filled_rectangle(x, y + r, t, h - 2 * r, c);");
            lines.push("            it.filled_rectangle(x + w - t, y + r, t, h - 2 * r, c);");
            lines.push("            for (int dx = 0; dx <= r; dx++) {");
            lines.push("              for (int dy = 0; dy <= r; dy++) {");
            lines.push("                int ds = dx*dx + dy*dy;");
            lines.push("                if (ds <= r*r && ds > (r-t)*(r-t)) {");
            lines.push("                  it.draw_pixel_at(x + r - dx, y + r - dy, c);");
            lines.push("                  it.draw_pixel_at(x + w - r + dx - 1, y + r - dy, c);");
            lines.push("                  it.draw_pixel_at(x + r - dx, y + h - r + dy - 1, c);");
            lines.push("                  it.draw_pixel_at(x + w - r + dx - 1, y + h - r + dy - 1, c);");
            lines.push("                }");
            lines.push("              }");
            lines.push("            }");
            lines.push("          };");
            lines.push(`          draw_rrect_border(${rrectX}, ${rrectY}, ${rrectW}, ${rrectH}, ${radius}, ${borderWidth}, ${borderColor});`);
            addDitherMask(lines, borderColorProp, isEpaper, rrectX, rrectY, rrectW, rrectH, radius);
        }

        lines.push("        }");
        if (cond) lines.push("        }");
    }
};
