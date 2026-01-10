/**
 * Template Navigation Bar Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const color = props.color || "black";
    const iconSize = props.icon_size || 24;

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

        // Smart Preview: If Black on Black (common for inverted e-paper profiles), 
        // invert text color for preview visibility.
        if (cssColor === "#000000" && cssBgColor === "#000000") {
            cssColor = "#ffffff";
        }
    } else {
        el.style.backgroundColor = "transparent";
        el.style.borderRadius = "0";
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
        lines, addFont, getColorConst, addDitherMask, getCondProps, getConditionCheck, isEpaper
    } = context;

    const p = w.props || {};
    const iconSize = parseInt(p.icon_size || 24, 10);
    const colorProp = p.color || "white";
    const color = getColorConst(colorProp);
    const showPrev = p.show_prev !== false;
    const showHome = p.show_home !== false;
    const showNext = p.show_next !== false;
    const showBg = p.show_background !== false;
    const radius = parseInt(p.border_radius || 8, 10);
    const bgColor = getColorConst(p.background_color || "black");

    const iconFontRef = addFont("Material Design Icons", 400, iconSize);

    lines.push(`        // widget:template_nav_bar id:${w.id} type:template_nav_bar x:${w.x} y:${w.y} w:${w.width} h:${w.height} prev:${showPrev} home:${showHome} next:${showNext} bg:${showBg} bg_color:${p.background_color || "black"} radius:${radius} icon_size:${iconSize} color:${colorProp} ${getCondProps(w)}`);

    const cond = getConditionCheck(w);
    if (cond) lines.push(`        ${cond}`);

    lines.push(`        {`);
    if (showBg) {
        lines.push(`          it.filled_rectangle(${w.x}, ${w.y}, ${w.width}, ${w.height}, ${bgColor});`);
        addDitherMask(lines, p.background_color || "black", isEpaper, w.x, w.y, w.width, w.height);
        lines.push(`          it.rectangle(${w.x}, ${w.y}, ${w.width}, ${w.height}, ${bgColor});`);
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

    navBarWidgets.forEach(w => {
        const p = w.props || {};
        const showPrev = p.show_prev !== false;
        const showHome = p.show_home !== false;
        const showNext = p.show_next !== false;

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

                lines.push(`  - platform: touchscreen`);
                lines.push(`    id: nav_${action}_${w.id.replace(/-/g, '_')}`);
                lines.push(`    touchscreen_id: my_touchscreen`);
                lines.push(`    x_min: ${xMin}`);
                lines.push(`    x_max: ${xMax}`);
                lines.push(`    y_min: ${yMin}`);
                lines.push(`    y_max: ${yMax}`);
                lines.push(`    on_press:`);

                if (action === "prev") {
                    lines.push(`      - script.execute:`);
                    lines.push(`          id: change_page_to`);
                    lines.push(`          target_page: !lambda 'return id(display_page) - 1;'`);
                } else if (action === "home") {
                    lines.push(`      - script.execute: manage_run_and_sleep`);
                } else if (action === "next") {
                    lines.push(`      - script.execute:`);
                    lines.push(`          id: change_page_to`);
                    lines.push(`          target_page: !lambda 'return id(display_page) + 1;'`);
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
    defaults: {
        w: 180,
        h: 40,
        show_prev: true,
        show_home: true,
        show_next: true,
        show_background: true,
        background_color: "black",
        border_radius: 8,
        color: "white",
        icon_size: 24
    },
    render,
    export: exportDoc,
    onExportBinarySensors
};

