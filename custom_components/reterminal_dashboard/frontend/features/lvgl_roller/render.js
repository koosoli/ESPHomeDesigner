(() => {
    const render = (el, widget, { getColorStyle }) => {
        const props = widget.props || {};
        const bgColor = getColorStyle(props.bg_color || "white");
        const selectedBgColor = getColorStyle(props.selected_bg_color || "blue");
        const textColor = getColorStyle(props.color || "black");
        const selectedTextColor = getColorStyle(props.selected_text_color || "white");
        const visibleRows = props.visible_row_count || 3;

        el.innerHTML = "";
        el.style.display = "flex";
        el.style.flexDirection = "column";
        el.style.boxSizing = "border-box";
        el.style.backgroundColor = bgColor;
        el.style.border = "1px solid #999";
        el.style.overflow = "hidden";

        let options = props.options || "Option A\nOption B\nOption C";
        if (typeof options === 'string') {
            options = options.split("\n");
        } else if (!Array.isArray(options)) {
            options = ["Option A", "Option B", "Option C"];
        }
        const rowHeight = widget.height / visibleRows;

        // Show middle row as selected, others as normal
        const middleIdx = Math.floor(visibleRows / 2);

        for (let i = 0; i < visibleRows && i < options.length; i++) {
            const row = document.createElement("div");
            row.style.height = `${rowHeight}px`;
            row.style.display = "flex";
            row.style.alignItems = "center";
            row.style.justifyContent = "center";
            row.style.fontSize = "14px";
            row.style.fontFamily = "Roboto, sans-serif";

            if (i === middleIdx) {
                row.style.backgroundColor = selectedBgColor;
                row.style.color = selectedTextColor;
                row.style.fontWeight = "bold";
            } else {
                row.style.backgroundColor = bgColor;
                row.style.color = textColor;
                row.style.opacity = "0.6";
            }

            row.textContent = options[i] || `Option ${i + 1}`;
            el.appendChild(row);
        }
    };

    const registerFeature = () => {
        if (window.FeatureRegistry) {
            window.FeatureRegistry.register("lvgl_roller", { render });
            return true;
        }
        return false;
    };

    if (!registerFeature()) {
        setTimeout(() => {
            if (!registerFeature()) {
                console.error("[lvgl_roller] FeatureRegistry not found!");
            }
        }, 100);
    }
})();
