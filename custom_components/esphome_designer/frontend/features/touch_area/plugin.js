/**
 * Touch Area Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};

    el.style.backgroundColor = props.color || "rgba(0, 0, 255, 0.2)";
    el.style.border = `1px dashed ${props.border_color || "#0000ff"}`;
    el.style.display = "flex";
    el.style.flexDirection = "column";
    el.style.alignItems = "center";
    el.style.justifyContent = "center";
    el.style.color = props.icon_color ? getColorStyle(props.icon_color) : (props.border_color || "#0000ff");
    el.style.fontSize = "12px";
    el.style.fontWeight = "bold";
    el.style.overflow = "hidden";

    if (props.icon) {
        const getChar = (code) => {
            const c = (code || "").trim().replace("mdi:", "").toUpperCase();
            if (/^F[0-9A-F]{4}$/i.test(c)) {
                const cp = 0xf0000 + parseInt(c.slice(1), 16);
                return String.fromCodePoint(cp);
            }
            if (window.iconPickerData) {
                const iconName = (code || "").trim().replace("mdi:", "").toLowerCase();
                const iconData = window.iconPickerData.find(idx => idx.name === iconName);
                if (iconData) {
                    const cp = 0xf0000 + parseInt(iconData.code.slice(1), 16);
                    return String.fromCodePoint(cp);
                }
            }
            return null;
        };

        const normalChar = getChar(props.icon);
        const pressedChar = props.icon_pressed ? getChar(props.icon_pressed) : null;

        if (normalChar) {
            const iconEl = document.createElement("span");
            iconEl.innerText = normalChar;
            iconEl.style.fontFamily = "MDI, system-ui, sans-serif";
            iconEl.style.fontSize = (props.icon_size || 40) + "px";
            iconEl.style.lineHeight = "1";
            iconEl.style.color = props.icon_color ? getColorStyle(props.icon_color) : (props.border_color || "#0000ff");
            el.appendChild(iconEl);

            if (pressedChar) {
                el.style.cursor = "pointer";
                el.addEventListener("mouseenter", () => {
                    iconEl.innerText = pressedChar;
                    if (props.color && props.color.startsWith("rgba")) {
                        el.style.backgroundColor = props.color.replace(/[\d.]+\)$/, "0.4)");
                    } else {
                        el.style.backgroundColor = "rgba(0, 0, 255, 0.4)";
                    }
                });
                el.addEventListener("mouseleave", () => {
                    iconEl.innerText = normalChar;
                    el.style.backgroundColor = props.color || "rgba(0, 0, 255, 0.2)";
                });
            }

            if (props.title && widget.height > (props.icon_size || 40) + 20) {
                const lbl = document.createElement("div");
                lbl.innerText = props.title;
                lbl.style.fontSize = "10px";
                lbl.style.marginTop = "2px";
                el.appendChild(lbl);
            }
        } else {
            el.innerText = props.title || widget.entity_id || "Touch Area";
        }
    } else {
        el.innerText = props.title || widget.entity_id || "Touch Area";
    }
};

const exportDoc = (w, context) => {
    const {
        lines, addFont, getColorConst, getCondProps, getConditionCheck
    } = context;

    const p = w.props || {};
    const icon = (p.icon || "").replace("mdi:", "").toUpperCase();
    const iconPressed = (p.icon_pressed || "").replace("mdi:", "").toUpperCase();
    const iconSize = parseInt(p.icon_size || 40, 10);
    const iconColorProp = p.icon_color || "theme_auto";
    const iconColor = getColorConst(iconColorProp);

    lines.push(`        // widget:touch_area id:${w.id} type:touch_area x:${w.x} y:${w.y} w:${w.width} h:${w.height} icon:"${p.icon || ""}" icon_pressed:"${p.icon_pressed || ""}" icon_size:${iconSize} icon_color:${iconColorProp} ${getCondProps(w)}`);

    const cond = getConditionCheck(w);
    if (cond) lines.push(`        ${cond}`);

    if (icon) {
        const fontRef = addFont("Material Design Icons", 400, iconSize);
        const safeId = (w.entity_id || `touch_area_${w.id.replace(/-/g, "_")}`).replace(/[^a-zA-Z0-9_]/g, "_");

        if (iconPressed) {
            lines.push(`        if (id(${safeId}).state) {`);
            lines.push(`          it.printf(${w.x} + ${w.width}/2, ${w.y} + ${w.height}/2, id(${fontRef}), ${iconColor}, TextAlign::CENTER, "\\U000${iconPressed}");`);
            lines.push(`        } else {`);
            lines.push(`          it.printf(${w.x} + ${w.width}/2, ${w.y} + ${w.height}/2, id(${fontRef}), ${iconColor}, TextAlign::CENTER, "\\U000${icon}");`);
            lines.push(`        }`);
        } else {
            lines.push(`        it.printf(${w.x} + ${w.width}/2, ${w.y} + ${w.height}/2, id(${fontRef}), ${iconColor}, TextAlign::CENTER, "\\U000${icon}");`);
        }
    }

    if (cond) lines.push(`        }`);
};

const onExportBinarySensors = (context) => {
    const { lines, widgets, profile } = context;
    // Fix #180: Don't restrict by profile flags. If user added touch widgets, we should try to generate.
    // if (!profile || (!profile.touch && !profile.features?.touch)) return;

    const targets = widgets.filter(w => w.type === 'touch_area' || w.type === 'nav_next_page' || w.type === 'nav_previous_page' || w.type === 'nav_reload_page');
    if (targets.length === 0) return;

    lines.push("# Touch Area Binary Sensors");
    targets.forEach(w => {
        const p = w.props || {};
        const safeId = (w.entity_id || `touch_area_${w.id.replace(/-/g, "_")}`).replace(/[^a-zA-Z0-9_]/g, "_");

        lines.push(`- platform: touchscreen`);
        lines.push(`  id: ${safeId}`);
        lines.push(`  touchscreen_id: my_touchscreen`);
        lines.push(`  x_min: ${w.x}`);
        lines.push(`  x_max: ${w.x + w.width}`);
        lines.push(`  y_min: ${w.y}`);
        lines.push(`  y_max: ${w.y + w.height}`);

        const navAction = p.nav_action || "none";
        const pageIdx = w._pageIndex !== undefined ? w._pageIndex : 0;

        if (navAction !== "none" || w.entity_id) {
            lines.push(`  on_press:`);
            lines.push(`    - if:`);
            lines.push(`        condition:`);
            lines.push(`          lambda: 'return id(display_page) == ${pageIdx};'`);
            lines.push(`        then:`);

            if (navAction === "next_page") {
                lines.push(`          - script.execute:`);
                lines.push(`              id: change_page_to`);
                lines.push(`              target_page: !lambda 'return id(display_page) + 1;'`);
            } else if (navAction === "previous_page") {
                lines.push(`          - script.execute:`);
                lines.push(`              id: change_page_to`);
                lines.push(`              target_page: !lambda 'return id(display_page) - 1;'`);
            } else if (navAction === "reload_page") {
                lines.push(`          - script.execute: manage_run_and_sleep`);
            } else if (w.entity_id) {
                lines.push(`          - homeassistant.service:`);
                lines.push(`              service: homeassistant.toggle`);
                lines.push(`              data:`);
                lines.push(`                entity_id: ${w.entity_id}`);
            }
        }
    });
};

const collectRequirements = (widget, { trackIcon }) => {
    const props = widget.props || {};
    if (props.icon) trackIcon(props.icon, props.icon_size || 40);
    if (props.icon_pressed) trackIcon(props.icon_pressed, props.icon_size || 40);
};

export default {
    id: "touch_area",
    name: "Touch Area",
    category: "Controls",
    // CRITICAL ARCHITECTURAL NOTE: OEPL and OpenDisplay are excluded because this 
    // widget is strictly for display.lambda touchscreens. LVGL has its own 
    // internal touch handling via objects.
    supportedModes: ['direct'],
    defaults: {
        title: "",
        icon: "",
        icon_pressed: "",
        icon_size: 40,
        icon_color: "theme_auto",
        color: "rgba(0, 0, 255, 0.15)",
        border_color: "#0000ff",
        on_click: ""
    },
    render,
    collectRequirements,
    onExportBinarySensors,
    export: exportDoc
};
