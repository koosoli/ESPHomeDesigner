(() => {
    const render = (el, widget, { getColorStyle }) => {
        const props = widget.props || {};

        el.innerHTML = "";
        el.style.display = "flex";
        el.style.alignItems = "center";
        el.style.boxSizing = "border-box";
        el.style.backgroundColor = "#fff";
        el.style.border = "1px solid #999";
        el.style.borderRadius = "3px";
        el.style.padding = "0 10px";

        // Get selected option
        let options = props.options || "Option 1\nOption 2\nOption 3";
        if (typeof options === 'string') {
            options = options.split("\n");
        } else if (!Array.isArray(options)) {
            options = ["Option 1", "Option 2", "Option 3"];
        }
        const idx = props.selected_index || 0;
        const selectedText = options[Math.min(idx, options.length - 1)] || "Select...";

        // Text
        const text = document.createElement("span");
        text.textContent = selectedText;
        text.style.flex = "1";
        text.style.color = "#000";
        text.style.fontSize = "14px";
        text.style.fontFamily = "Roboto, sans-serif";
        text.style.overflow = "hidden";
        text.style.textOverflow = "ellipsis";
        text.style.whiteSpace = "nowrap";
        el.appendChild(text);

        // Arrow
        const arrow = document.createElement("span");
        arrow.textContent = "▼";
        arrow.style.color = "#000";
        arrow.style.fontSize = "10px";
        arrow.style.marginLeft = "10px";
        el.appendChild(arrow);
    };

    const registerFeature = () => {
        if (window.FeatureRegistry) {
            window.FeatureRegistry.register("lvgl_dropdown", { render });
            return true;
        }
        return false;
    };

    if (!registerFeature()) {
        setTimeout(() => {
            if (!registerFeature()) {
                console.error("[lvgl_dropdown] FeatureRegistry not found!");
            }
        }, 100);
    }
})();
