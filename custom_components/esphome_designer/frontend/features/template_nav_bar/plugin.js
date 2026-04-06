import { getTouchDebounceMs } from '../../js/io/navigation_debounce.js';

/**
 * Template Navigation Bar Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const color = props.color || "black";
    const iconSize = props.icon_size || 24;
    const borderWidth = props.border_thickness || 0;

    el.style.display = "flex";
    el.style.alignItems = "center";
    el.style.justifyContent = "space-around";
    el.style.padding = "0 10px";
    el.style.boxSizing = "border-box";
    let cssColor = getColorStyle(color);
    el.style.overflow = "hidden";

    if (props.show_background) {
        const cssBgColor = getColorStyle(props.background_color || "white");
        el.style.backgroundColor = cssBgColor;
        el.style.borderRadius = (props.border_radius || 8) + "px";

        if (borderWidth > 0) {
            el.style.border = `${borderWidth}px solid ${getColorStyle(props.border_color || "white")}`;
        } else {
            el.style.border = "none";
        }

        // Smart Preview: If Black on Black (common for inverted e-paper profiles), 
        // invert text color for preview visibility.
        if (cssColor === "#000000" && cssBgColor === "#000000") {
            cssColor = "#ffffff";
        }

        if (!props.background_color || props.background_color === "transparent") {
            el.style.border = "1px dashed #444"; // Visual aid for transparent
        }
    } else {
        el.style.backgroundColor = "transparent";
        el.style.borderRadius = "0";
        el.style.border = "none";
    }

    el.style.color = cssColor;

    const buttons = [];

    if (props.show_prev !== false) {
        buttons.push({ type: 'prev', icon: 'F0141' });
    }
    if (props.show_home !== false) {
        buttons.push({ type: 'home', icon: 'F02DC' });
    }
    if (props.show_next !== false) {
        buttons.push({ type: 'next', icon: 'F0142' });
    }

    el.innerHTML = "";

    buttons.forEach(btn => {
        const icon = document.createElement("span");
        const cp = parseInt(btn.icon, 16);
        icon.innerText = String.fromCodePoint(cp);
        icon.style.fontFamily = "'Material Design Icons', 'MDI', system-ui, -sans-serif";
        icon.style.fontSize = iconSize + "px";
        icon.style.lineHeight = "1";
        icon.style.cursor = "pointer";
        icon.style.padding = "5px";
        icon.style.transition = "transform 0.1s";

        icon.onmousedown = () => icon.style.transform = "scale(0.9)";
        icon.onmouseup = () => icon.style.transform = "scale(1)";
        icon.onmouseleave = () => icon.style.transform = "scale(1)";

        el.appendChild(icon);
    });
};

const exportDoc = (w, context) => {
    const {
        lines, addFont, getColorConst, addDitherMask, getCondProps, getConditionCheck, isEpaper // eslint-disable-line no-unused-vars
    } = context;

    const p = w.props || {};
    const iconSize = parseInt(p.icon_size || 24, 10);
    const colorProp = p.color || "white";
    const color = getColorConst(colorProp);
    const showPrev = p.show_prev !== false;
    const showHome = p.show_home !== false;
    const showNext = p.show_next !== false;
    const showBg = p.show_background !== false;
    const bgColor = getColorConst(p.background_color || "black");
    const radius = parseInt(p.border_radius || 8, 10);
    const thickness = parseInt(p.border_thickness || 0, 10);
    const borderColor = getColorConst(p.border_color || "white");

    const iconFontRef = addFont("Material Design Icons", 400, iconSize);


    const cond = getConditionCheck(w);
    if (cond) lines.push(`        ${cond}`);

    lines.push(`        {`);
    if (showBg) {
        if (radius > 0) {
            lines.push(`          auto draw_filled_rrect = [&](int x, int y, int w, int h, int r, auto c) {`);
            lines.push(`            it.filled_rectangle(x + r, y, w - 2 * r, h, c);`);
            lines.push(`            it.filled_rectangle(x, y + r, r, h - 2 * r, c);`);
            lines.push(`            it.filled_rectangle(x + w - r, y + r, r, h - 2 * r, c);`);
            lines.push(`            it.filled_circle(x + r, y + r, r, c);`);
            lines.push(`            it.filled_circle(x + w - r - 1, y + r, r, c);`);
            lines.push(`            it.filled_circle(x + r, y + h - r - 1, r, c);`);
            lines.push(`            it.filled_circle(x + w - r - 1, y + h - r - 1, r, c);`);
            lines.push(`          };`);

            if (thickness > 0) {
                lines.push(`          draw_filled_rrect(${w.x}, ${w.y}, ${w.width}, ${w.height}, ${radius}, ${borderColor});`);
                lines.push(`          draw_filled_rrect(${w.x + thickness}, ${w.y + thickness}, ${w.width - 2 * thickness}, ${w.height - 2 * thickness}, ${Math.max(0, radius - thickness)}, ${bgColor});`);
            } else {
                lines.push(`          draw_filled_rrect(${w.x}, ${w.y}, ${w.width}, ${w.height}, ${radius}, ${bgColor});`);
            }
        } else {
            if (thickness > 0) {
                lines.push(`          it.filled_rectangle(${w.x}, ${w.y}, ${w.width}, ${w.height}, ${borderColor});`);
                lines.push(`          it.filled_rectangle(${w.x + thickness}, ${w.y + thickness}, ${w.width - 2 * thickness}, ${w.height - 2 * thickness}, ${bgColor});`);
            } else {
                lines.push(`          it.filled_rectangle(${w.x}, ${w.y}, ${w.width}, ${w.height}, ${bgColor});`);
            }
        }
        addDitherMask(lines, p.background_color || "black", isEpaper, w.x, w.y, w.width, w.height, radius);
    }

    let activeCount = 0;
    if (showPrev) activeCount++;
    if (showHome) activeCount++;
    if (showNext) activeCount++;

    if (activeCount > 0) {
        const spacing = w.width / activeCount;
        let currentX = w.x + spacing / 2;
        const centerY = w.y + w.height / 2;

        if (showPrev) {
            lines.push(`          it.printf(${Math.round(currentX)}, ${centerY}, id(${iconFontRef}), ${color}, TextAlign::CENTER, "\\U000F0141");`);
            currentX += spacing;
        }
        if (showHome) {
            lines.push(`          it.printf(${Math.round(currentX)}, ${centerY}, id(${iconFontRef}), ${color}, TextAlign::CENTER, "\\U000F02DC");`);
            currentX += spacing;
        }
        if (showNext) {
            lines.push(`          it.printf(${Math.round(currentX)}, ${centerY}, id(${iconFontRef}), ${color}, TextAlign::CENTER, "\\U000F0142");`);
        }
    }

    addDitherMask(lines, colorProp, isEpaper, w.x, w.y, w.width, w.height);
    lines.push(`        }`);
    if (cond) lines.push(`        }`);
};

const onExportBinarySensors = (context) => {
    const { lines, widgets, profile } = context;
    if (!profile || !profile.touch) return;

    const navBarWidgets = widgets.filter(w => w.type === 'template_nav_bar');
    if (navBarWidgets.length === 0) return;

    const totalPages = widgets.reduce((max, widget) => Math.max(max, (widget._pageIndex ?? 0) + 1), 0) || 1;
    const touchDebounceMs = getTouchDebounceMs(profile);

    navBarWidgets.forEach(w => {
        const p = w.props || {};
        const allowPaging = totalPages > 1;
        const showPrev = allowPaging && p.show_prev !== false;
        const showHome = p.show_home !== false;
        const showNext = allowPaging && p.show_next !== false;

        let activeCount = 0;
        if (showPrev) activeCount++;
        if (showHome) activeCount++;
        if (showNext) activeCount++;

        if (activeCount > 0) {
            const widthPerButton = Math.floor(w.width / activeCount);
            let currentIdx = 0;

            const addNavTouch = (action) => {
                const xMin = w.x + (currentIdx * widthPerButton);
                const xMax = xMin + widthPerButton;
                const yMin = w.y;
                const yMax = w.y + w.height;

                lines.push(`- platform: touchscreen`);
                lines.push(`  id: nav_${action}_${w.id.replace(/-/g, '_')}`);
                lines.push(`  touchscreen_id: my_touchscreen`);
                lines.push(`  x_min: ${xMin}`);
                lines.push(`  x_max: ${xMax}`);
                lines.push(`  y_min: ${yMin}`);
                lines.push(`  y_max: ${yMax}`);
                lines.push(`  on_press:`);

                const pageIdx = w._pageIndex !== undefined ? w._pageIndex : 0;
                lines.push(`    - if:`);
                lines.push(`        condition:`);
                lines.push(`          lambda: 'return id(display_page) == ${pageIdx} && (millis() - id(last_touch_time) > ${touchDebounceMs});'`);
                lines.push(`        then:`);
                lines.push(`          - lambda: 'id(last_touch_time) = millis();'`);

                let target = "";
                if (action === "prev") target = p.prev_target || "relative_prev";
                else if (action === "home") target = p.home_target || "home";
                else if (action === "next") target = p.next_target || "relative_next";

                if (target === "home") {
                    lines.push(`          - script.execute: manage_run_and_sleep`);
                } else {
                    let targetVal = "";
                    if (target === "relative_prev") targetVal = "!lambda 'return id(display_page) - 1;'";
                    else if (target === "relative_next") targetVal = "!lambda 'return id(display_page) + 1;'";
                    else targetVal = target; // Specific index

                    lines.push(`          - script.execute:`);
                    lines.push(`              id: change_page_to`);
                    lines.push(`              target_page: ${targetVal}`);
                }
                currentIdx++;
            };

            if (showPrev) addNavTouch("prev");
            if (showHome) addNavTouch("home");
            if (showNext) addNavTouch("next");
        }
    });
};

export default {
    id: "template_nav_bar",
    name: "Nav Bar",
    category: "Templates",
    // CRITICAL ARCHITECTURAL NOTE: OEPL and OpenDisplay are excluded because this 
    // template relies on local script execution and precise touch coordinates 
    // handled via display.lambda.
    supportedModes: ["lvgl", "direct"],
    defaults: {
        width: 180,
        height: 40,
        show_prev: true,
        show_home: true,
        show_next: true,
        show_background: true,
        background_color: "black",
        border_radius: 8,
        border_thickness: 0,
        border_color: "white",
        color: "white",
        icon_size: 24,
        prev_target: "relative_prev",
        home_target: "home",
        next_target: "relative_next",
        opa: 255,
        opacity: 255
    },
    schema: [
        {
            section: "Navigation Buttons",
            fields: [
                { key: "show_prev", label: "Show Back/Prev", type: "checkbox", default: true },
                { key: "prev_target", label: "Prev Target", type: "text", default: "relative_prev" },
                { key: "show_home", label: "Show Home", type: "checkbox", default: true },
                { key: "home_target", label: "Home Target", type: "text", default: "home" },
                { key: "show_next", label: "Show Next", type: "checkbox", default: true },
                { key: "next_target", label: "Next Target", type: "text", default: "relative_next" }
            ]
        },
        {
            section: "Appearance",
            fields: [
                { key: "icon_size", label: "Icon Size", type: "number", default: 24 },
                { key: "color", label: "Icon Color", type: "color", default: "white" },
                { key: "show_background", label: "Show Bar Background", type: "checkbox", default: true },
                { key: "background_color", label: "Background", type: "color", default: "black" },
                { key: "border_radius", label: "Corners", type: "number", default: 8 },
                { key: "border_thickness", label: "Border Width", type: "number", default: 0 },
                { key: "border_color", label: "Border Color", type: "color", default: "white" },
                { key: "opa", label: "Opacity (0 - 255)", type: "number", default: 255 },
                { key: "opacity", label: "Opacity (0 - 255)", type: "number", default: 255 }
            ]
        }
    ],
    render,
    exportLVGL: (w, { common, convertColor, getLVGLFont }) => {
        const p = w.props || {};
        const iconSize = parseInt(p.icon_size || 24, 10);
        const color = convertColor(p.color || "white");
        const showBackground = p.show_background !== false;
        const totalPages = parseInt(String(w._pageCount ?? ""), 10);
        const allowPaging = Number.isFinite(totalPages) ? totalPages > 1 : true;
        const showPrev = allowPaging && p.show_prev !== false;
        const showHome = p.show_home !== false;
        const showNext = allowPaging && p.show_next !== false;

        const widgets = [];
        const btnProps = {
            width: iconSize + 16,
            height: "100%",
            bg_opa: "transp",
            border_width: 0,
            radius: 0,
            pad_all: 0,
            layout: { type: "flex", flex_align_main: "center", flex_align_cross: "center" }
        };

        const iconFont = getLVGLFont("Material Design Icons", iconSize, 400);

        const getTargetScript = (target) => {
            if (target === "home") {
                return [{ "script.execute": "manage_run_and_sleep" }];
            }
            let targetVal = "";
            if (target === "relative_prev") targetVal = "!lambda 'return id(display_page) - 1;'";
            else if (target === "relative_next") targetVal = "!lambda 'return id(display_page) + 1;'";
            else targetVal = target;

            return [{ "script.execute": { id: "change_page_to", target_page: targetVal } }];
        };

        if (showPrev) {
            widgets.push({
                button: {
                    ...btnProps,
                    on_click: getTargetScript(p.prev_target || "relative_prev"),
                    widgets: [{ label: { align: "center", text: '"\\U000F0141"', text_font: iconFont, text_color: color } }]
                }
            });
        }
        if (showHome) {
            widgets.push({
                button: {
                    ...btnProps,
                    on_click: getTargetScript(p.home_target || "home"),
                    widgets: [{ label: { align: "center", text: '"\\U000F02DC"', text_font: iconFont, text_color: color } }]
                }
            });
        }
        if (showNext) {
            widgets.push({
                button: {
                    ...btnProps,
                    on_click: getTargetScript(p.next_target || "relative_next"),
                    widgets: [{ label: { align: "center", text: '"\\U000F0142"', text_font: iconFont, text_color: color } }]
                }
            });
        }

        return {
            obj: {
                ...common,
                ...(showBackground ? {
                    bg_color: convertColor(p.background_color || "black"),
                    radius: p.border_radius || 8,
                    border_width: p.border_thickness || 0,
                    border_color: convertColor(p.border_color || "white")
                } : {
                    radius: 0,
                    border_width: 0
                }),
                bg_opa: showBackground ? "cover" : "transp",
                layout: { type: "flex", flex_flow: "row", flex_align_main: "space_around", flex_align_cross: "center" },
                widgets: widgets
            }
        };
    },
    export: exportDoc,
    onExportBinarySensors,
    collectRequirements: (widget, context) => {
        const { trackIcon, addFont } = context;
        const p = widget.props || {};
        const iconSize = parseInt(p.icon_size || 24, 10);

        addFont("Material Design Icons", 400, iconSize);

        if (p.show_prev !== false) trackIcon("F0141", iconSize);
        if (p.show_home !== false) trackIcon("F02DC", iconSize);
        if (p.show_next !== false) trackIcon("F0142", iconSize);
    }
};

