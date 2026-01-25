/**
 * ODP Icon Sequence Plugin
 * Displays multiple icons in a row or column
 * Only available for OpenEPaperLink and OpenDisplay rendering modes
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    el.innerHTML = "";
    el.style.display = "flex";
    el.style.flexDirection = props.direction === "down" ? "column" : "row";
    el.style.gap = `${props.spacing || 6}px`;
    el.style.alignItems = "center";
    el.style.justifyContent = "flex-start";
    el.style.overflow = "hidden";

    // Parse icons - can be array or comma-separated string
    let icons = props.icons || ["mdi:home", "mdi:arrow-right", "mdi:office-building"];
    if (typeof icons === "string") {
        icons = icons.split(",").map(s => s.trim()).filter(s => s);
    }

    const size = props.size || 24;
    const color = getColorStyle(props.fill || "black");

    icons.forEach((iconName) => {
        const iconEl = document.createElement("span");
        iconEl.className = "mdi";
        iconEl.style.fontSize = `${size}px`;
        iconEl.style.color = color;
        iconEl.style.width = `${size}px`;
        iconEl.style.height = `${size}px`;
        iconEl.style.display = "flex";
        iconEl.style.alignItems = "center";
        iconEl.style.justifyContent = "center";

        // Extract icon name and set as text placeholder
        const shortName = iconName.replace("mdi:", "");
        iconEl.textContent = `[${shortName}]`;
        iconEl.style.fontSize = `${Math.max(8, size / 3)}px`;
        iconEl.style.border = `1px dashed ${color}`;
        iconEl.style.borderRadius = "2px";

        el.appendChild(iconEl);
    });
};

export default {
    id: "odp_icon_sequence",
    name: "Icon Sequence",
    category: "OpenDisplay",
    supportedModes: ['oepl', 'opendisplay'],
    defaults: {
        width: 120,
        height: 30,
        icons: ["mdi:home", "mdi:arrow-right", "mdi:office-building"],
        size: 24,
        direction: "right",
        spacing: 6,
        fill: "black"
    },
    render,
    exportOpenDisplay: (w, { layout, page }) => {
        const p = w.props || {};
        let icons = p.icons || ["mdi:home", "mdi:arrow-right", "mdi:office-building"];
        if (typeof icons === "string") {
            icons = icons.split(",").map(s => s.trim()).filter(s => s);
        }
        return {
            type: "icon_sequence",
            visible: true,
            x: Math.round(w.x),
            y: Math.round(w.y),
            icons: icons,
            size: p.size || 24,
            direction: p.direction || "right",
            spacing: p.spacing || 6,
            fill: p.fill || "black"
        };
    },
    exportOEPL: (w, { layout, page }) => {
        const p = w.props || {};
        let icons = p.icons || ["mdi:home", "mdi:arrow-right", "mdi:office-building"];
        if (typeof icons === "string") {
            icons = icons.split(",").map(s => s.trim()).filter(s => s);
        }
        return {
            type: "icon_sequence",
            x: Math.round(w.x),
            y: Math.round(w.y),
            icons: icons,
            size: p.size || 24,
            direction: p.direction || "right",
            spacing: p.spacing || 6,
            fill: p.fill || "black"
        };
    }
};
