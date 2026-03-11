// @ts-nocheck
import { AppState } from '@core/state';
/**
 * Circle Shape Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};

    // bg_color/border_color only override 'color' when explicitly set to a real color
    const effectiveBg = (props.bg_color && props.bg_color !== "theme_auto") ? props.bg_color : null;
    const effectiveBorder = (props.border_color && props.border_color !== "theme_auto") ? props.border_color : null;

    const bgCol = effectiveBg || props.color || "theme_auto";
    const borderCol = effectiveBorder || props.color || "theme_auto";

    el.style.backgroundColor = props.fill ? getColorStyle(bgCol) : "transparent";
    el.style.border = `${props.border_width || 1}px solid ${getColorStyle(borderCol)}`;
    el.style.borderRadius = "50%";
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
        fill: false,
        border_width: 1,
        color: "theme_auto",
        border_color: "theme_auto",
        opacity: 100,
        opa: 255
    },
    renderProperties: (panel, widget) => {
        const props = widget.props || {};
        const updateProp = (key, val) => {
            const newProps = { ...widget.props, [key]: val };
            AppState.updateWidget(widget.id, { props: newProps });
        };

        panel.createSection("Shape Settings", true);
        panel.addCheckbox("Fill Circle", !!props.fill, (v) => updateProp("fill", v));
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
    exportOpenDisplay: (w, { layout, _page }) => {
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
            type: "circle",
            x: Math.round(w.x + w.width / 2),
            y: Math.round(w.y + w.height / 2),
            radius: Math.round(Math.min(w.width, w.height) / 2),
            fill: fill,
            outline: outline,
            width: p.border_width || 1
        };
    },
    exportOEPL: (w, { _layout, _page }) => {
        const p = w.props || {};
        return {
            type: "circle",
            x: Math.round(w.x + w.width / 2),
            y: Math.round(w.y + w.height / 2),
            radius: Math.round(Math.min(w.width, w.height) / 2),
            fill: p.fill ? ((p.bg_color && p.bg_color !== "theme_auto" ? p.bg_color : null) || p.color || "black") : null,
            outline: (p.border_color && p.border_color !== "theme_auto" ? p.border_color : null) || p.color || "black",
            width: p.border_width || 1
        };
    },
    exportLVGL,
    export: (w, context) => {
        const {
            lines, getColorConst, addDitherMask, getCondProps, getConditionCheck, RECT_Y_OFFSET, isEpaper // eslint-disable-line no-unused-vars
        } = context;

        const p = w.props || {};
        const fill = !!p.fill;
        const borderWidth = parseInt(p.border_width || 1, 10);
        const colorProp = p.color || "theme_auto";
        const fillColorProp = (p.bg_color && p.bg_color !== "theme_auto") ? p.bg_color : colorProp;
        const borderColorProp = (p.border_color && p.border_color !== "theme_auto") ? p.border_color : colorProp;

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

        // Draw border if borderWidth > 0
        if (borderWidth > 0) {
            lines.push(`        for (int i = 0; i < ${borderWidth}; i++) {`);
            lines.push(`          it.circle(${circleX}, ${circleY}, ${radius} - i, ${borderColor});`);
            lines.push(`        }`);
            if (!fill) {
                addDitherMask(lines, borderColorProp, isEpaper, w.x, w.y, w.width, w.height, radius);
            }
        }

        if (cond) lines.push(`        }`);
    }
};
