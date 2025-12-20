(() => {
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
            // Helper to get char from code
            const getChar = (code) => {
                const c = (code || "").trim().replace("mdi:", "").toUpperCase();
                if (/^F[0-9A-F]{4}$/i.test(c)) {
                    const cp = 0xf0000 + parseInt(c.slice(1), 16);
                    return String.fromCodePoint(cp);
                }
                // Try finding by name in iconPickerData
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

                // Force the icon color to match icon_color if set, otherwise fallback to border color
                iconEl.style.color = props.icon_color ? getColorStyle(props.icon_color) : (props.border_color || "#0000ff");
                el.appendChild(iconEl);

                // Add dynamic hover preview for Pressed Icon
                if (pressedChar) {
                    el.style.cursor = "pointer";
                    el.addEventListener("mouseenter", () => {
                        iconEl.innerText = pressedChar;
                        // Indicator of pressed state simulation
                        if (props.color && props.color.startsWith("rgba")) {
                            el.style.backgroundColor = props.color.replace(/[\d\.]+\)$/, "0.4)");
                        } else {
                            el.style.backgroundColor = "rgba(0, 0, 255, 0.4)";
                        }
                    });
                    el.addEventListener("mouseleave", () => {
                        iconEl.innerText = normalChar;
                        el.style.backgroundColor = props.color || "rgba(0, 0, 255, 0.2)";
                    });
                }

                // If there's a title and space, show it small below
                if (props.title && widget.height > (props.icon_size || 40) + 20) {
                    const lbl = document.createElement("div");
                    lbl.innerText = props.title;
                    lbl.style.fontSize = "10px";
                    lbl.style.marginTop = "2px";
                    el.appendChild(lbl);
                }
            } else {
                el.innerText = props.title || "Touch Area";
            }
        } else {
            el.innerText = props.title || widget.entity_id || "Touch Area";
        }
    };

    if (window.FeatureRegistry) {
        window.FeatureRegistry.register("touch_area", { render });
    }
})();
