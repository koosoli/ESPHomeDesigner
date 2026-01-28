/**
 * Rounded Rectangle Shape Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const radius = parseInt(props.radius || 10, 10);
    const borderWidth = parseInt(props.border_width || 4, 10);
    const color = props.color || "theme_auto";

    el.style.backgroundColor = props.fill ? getColorStyle(color) : "transparent";
    const borderColor = (props.fill && (props.show_border === false || props.show_border === "false"))
        ? getColorStyle(color)
        : getColorStyle(props.border_color || (props.fill ? "black" : color));

    el.style.border = `${borderWidth}px solid ${borderColor}`;
    el.style.borderRadius = `${radius}px`;
    el.style.boxSizing = "border-box";

    if (props.opacity !== undefined && props.opacity < 100) {
        el.style.opacity = props.opacity / 100;
    }
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
            radius: p.radius || 10,
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
        fill: false,
        border_width: 4,
        color: "theme_auto",
        bg_color: "theme_auto",
        border_color: "theme_auto",
        show_border: true,
        opa: 255
    },
    render,
    exportOpenDisplay: (w, { layout, page }) => {
        const p = w.props || {};
        return {
            type: "draw_rect",
            x: Math.round(w.x),
            y: Math.round(w.y),
            w: Math.round(w.width),
            h: Math.round(w.height),
            fill: p.fill ? (p.bg_color || p.color || "black") : null,
            outline: p.border_color || p.color || "black",
            width: p.border_width || 1,
            radius: p.radius || 0
        };
    },
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
    exportLVGL,
    export: (w, context) => {
        const {
            lines, getColorConst, addDitherMask, getCondProps, getConditionCheck, RECT_Y_OFFSET, isEpaper
        } = context;

        const p = w.props || {};
        const fill = !!p.fill;
        const showBorder = p.show_border !== false;
        const r = parseInt(p.radius || 10, 10);
        const thickness = parseInt(p.border_width || 4, 10);
        const colorProp = p.color || "theme_auto";
        const borderColorProp = p.border_color || (fill ? "black" : colorProp);
        const color = getColorConst(colorProp);
        const borderColor = getColorConst(borderColorProp);
        const rrectX = Math.floor(w.x);
        const rrectY = Math.floor(w.y + (typeof RECT_Y_OFFSET !== 'undefined' ? RECT_Y_OFFSET : 0));
        const rrectW = Math.floor(w.width);
        const rrectH = Math.floor(w.height);

        lines.push(`        // widget:rounded_rect id:${w.id} type:rounded_rect x:${rrectX} y:${rrectY} w:${rrectW} h:${rrectH} fill:${fill} show_border:${showBorder} border:${thickness} radius:${r} color:${colorProp} border_color:${borderColorProp} ${getCondProps(w)}`);

        const cond = getConditionCheck(w);
        if (cond) lines.push(`        ${cond}`);
        lines.push(`        {`);

        if (fill) {
            lines.push(`          auto draw_filled_rrect = [&](int x, int y, int w, int h, int r, auto c) {`);
            lines.push(`            it.filled_rectangle(x + r, y, w - 2 * r, h, c);`);
            lines.push(`            it.filled_rectangle(x, y + r, r, h - 2 * r, c);`);
            lines.push(`            it.filled_rectangle(x + w - r, y + r, r, h - 2 * r, c);`);
            lines.push(`            it.filled_circle(x + r, y + r, r, c);`);
            lines.push(`            it.filled_circle(x + w - r - 1, y + r, r, c);`);
            lines.push(`            it.filled_circle(x + r, y + h - r - 1, r, c);`);
            lines.push(`            it.filled_circle(x + w - r - 1, y + h - r - 1, r, c);`);
            lines.push(`          };`);

            let fx = rrectX, fy = rrectY, fw = rrectW, fh = rrectH, fr = r;
            if (showBorder) {
                lines.push(`          draw_filled_rrect(${rrectX}, ${rrectY}, ${rrectW}, ${rrectH}, ${r}, ${borderColor});`);
                // Adjust inner rect
                fx += thickness; fy += thickness; fw -= 2 * thickness; fh -= 2 * thickness; fr -= thickness;
                if (fr < 0) fr = 0;
            }
            if (colorProp.toLowerCase() === "gray" && isEpaper) {
                addDitherMask(lines, colorProp, isEpaper, fx, fy, fw, fh, fr);
            } else {
                if (fw > 0 && fh > 0) lines.push(`          draw_filled_rrect(${fx}, ${fy}, ${fw}, ${fh}, ${fr}, ${color});`);
            }
        } else {
            // Transparent Border logic
            lines.push(`          auto draw_rrect_border = [&](int x, int y, int w, int h, int r, int t, auto c) {`);
            lines.push(`            it.filled_rectangle(x + r, y, w - 2 * r, t, c);`);
            lines.push(`            it.filled_rectangle(x + r, y + h - t, w - 2 * r, t, c);`);
            lines.push(`            it.filled_rectangle(x, y + r, t, h - 2 * r, c);`);
            lines.push(`            it.filled_rectangle(x + w - t, y + r, t, h - 2 * r, c);`);
            lines.push(`            for (int dx = 0; dx <= r; dx++) {`);
            lines.push(`              for (int dy = 0; dy <= r; dy++) {`);
            lines.push(`                int ds = dx*dx + dy*dy;`);
            lines.push(`                if (ds <= r*r && ds > (r-t)*(r-t)) {`);
            lines.push(`                  it.draw_pixel_at(x + r - dx, y + r - dy, c);`);
            lines.push(`                  it.draw_pixel_at(x + w - r + dx - 1, y + r - dy, c);`);
            lines.push(`                  it.draw_pixel_at(x + r - dx, y + h - r + dy - 1, c);`);
            lines.push(`                  it.draw_pixel_at(x + w - r + dx - 1, y + h - r + dy - 1, c);`);
            lines.push(`                }`);
            lines.push(`              }`);
            lines.push(`            }`);
            lines.push(`          };`);
            lines.push(`          draw_rrect_border(${rrectX}, ${rrectY}, ${rrectW}, ${rrectH}, ${r}, ${thickness}, ${borderColor});`);
        }

        addDitherMask(lines, borderColorProp, isEpaper, rrectX, rrectY, rrectW, rrectH, r);
        lines.push(`        }`);
        if (cond) lines.push(`        }`);
    }
};
