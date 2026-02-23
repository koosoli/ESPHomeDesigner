/**
 * Rectangle Shape Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};

    // bg_color/border_color only override 'color' when explicitly set to a real color
    // (theme_auto is treated as "not explicitly set" so 'color' takes precedence)
    const effectiveBg = (props.bg_color && props.bg_color !== "theme_auto") ? props.bg_color : null;
    const effectiveBorder = (props.border_color && props.border_color !== "theme_auto") ? props.border_color : null;

    const bgCol = effectiveBg || props.color || "theme_auto";
    const borderCol = effectiveBorder || props.color || "theme_auto";

    el.style.backgroundColor = props.fill ? getColorStyle(bgCol) : "transparent";
    el.style.border = `${props.border_width || 1}px solid ${getColorStyle(borderCol)}`;
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
        radius: 0,
        opa: 255
    },
    renderProperties: (panel, widget) => {
        const props = widget.props || {};
        const updateProp = (key, val) => {
            const newProps = { ...widget.props, [key]: val };
            AppState.updateWidget(widget.id, { props: newProps });
        };

        panel.createSection("Shape Settings", true);
        panel.addLabeledInput("Corner Radius", "number", props.radius || 0, (v) => updateProp("radius", parseInt(v, 10)));
        panel.addCheckbox("Fill Rectangle", !!props.fill, (v) => updateProp("fill", v));
        panel.addColorSelector("Main Color", props.color || "theme_auto", null, (v) => updateProp("color", v));
        panel.addColorSelector("Fill Color Override", props.bg_color || "theme_auto", null, (v) => updateProp("bg_color", v));
        panel.endSection();

        panel.createSection("Border Settings", true);
        panel.addLabeledInput("Border Thickness", "number", props.border_width || 1, (v) => updateProp("border_width", parseInt(v, 10)));
        panel.addColorSelector("Border Color", props.border_color || "theme_auto", null, (v) => updateProp("border_color", v));
        panel.endSection();

        panel.createSection("Appearance", true);
        panel.addNumberWithSlider("Opacity (%)", props.opacity !== undefined ? props.opacity : (props.opa !== undefined ? Math.round(props.opa / 2.55) : 100), 0, 100, (v) => {
            updateProp("opacity", v);
            updateProp("opa", Math.round(v * 2.55));
        });
        panel.addDropShadowButton(panel.getContainer(), widget.id);
        panel.endSection();
    },
    render,
    exportOpenDisplay: (w, { layout, page }) => {
        const p = w.props || {};

        // Resolve colors (handle theme_auto)
        // bg_color/border_color only override 'color' when explicitly set to a real color
        const effectiveBg = (p.bg_color && p.bg_color !== "theme_auto") ? p.bg_color : null;
        const effectiveBorder = (p.border_color && p.border_color !== "theme_auto") ? p.border_color : null;

        let fill = p.fill ? (effectiveBg || p.color) : null;
        let outline = effectiveBorder || p.color || "black";

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
            fill: p.fill ? ((p.bg_color && p.bg_color !== "theme_auto" ? p.bg_color : null) || p.color || "black") : null,
            outline: (p.border_color && p.border_color !== "theme_auto" ? p.border_color : null) || p.color || "black",
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
        const fillColorProp = (p.bg_color && p.bg_color !== "theme_auto") ? p.bg_color : colorProp;
        const borderColorProp = (p.border_color && p.border_color !== "theme_auto") ? p.border_color : colorProp;

        const fillColor = getColorConst(fillColorProp);
        const borderColor = getColorConst(borderColorProp);

        const rectX = Math.floor(w.x);
        const rectY = Math.floor(w.y + (typeof RECT_Y_OFFSET !== 'undefined' ? RECT_Y_OFFSET : 0));
        const rectW = Math.floor(w.width);
        const rectH = Math.floor(w.height);

        lines.push(`        // widget:shape_rect id:${w.id} type:shape_rect x:${rectX} y:${rectY} w:${rectW} h:${rectH} fill:${fill} border:${borderWidth} color:${fillColorProp} border_color:${borderColorProp} ${getCondProps(w)}`);

        const cond = getConditionCheck(w);
        if (cond) lines.push(`        ${cond}`);

        if (fill) {
            addDitherMask(lines, fillColorProp, isEpaper, rectX, rectY, rectW, rectH, p.radius || 0);
            if (!(fillColorProp.toLowerCase() === "gray" && isEpaper)) {
                lines.push(`        it.filled_rectangle(${rectX}, ${rectY}, ${rectW}, ${rectH}, ${fillColor});`);
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
