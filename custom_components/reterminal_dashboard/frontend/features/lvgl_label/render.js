(() => {
    const render = (el, widget, { getColorStyle }) => {
        const props = widget.props || {};

        el.innerText = props.text || "Label";
        el.style.fontSize = (props.font_size || 20) + "px";
        el.style.color = getColorStyle(props.color || "black");
        el.style.backgroundColor = props.bg_color || "transparent";
        el.style.display = "flex";

        const align = props.text_align || "CENTER";
        // Map LVGL align to flex
        if (align.includes("LEFT")) el.style.justifyContent = "flex-start";
        else if (align.includes("RIGHT")) el.style.justifyContent = "flex-end";
        else el.style.justifyContent = "center";

        if (align.includes("TOP")) el.style.alignItems = "flex-start";
        else if (align.includes("BOTTOM")) el.style.alignItems = "flex-end";
        else el.style.alignItems = "center";

        el.style.fontFamily = props.font_family === "Custom..." ? (props.custom_font_family || "sans-serif") : (props.font_family || "sans-serif");
        if (props.italic) el.style.fontStyle = "italic";
        el.style.fontWeight = props.font_weight || 400;

        el.style.whiteSpace = "pre-wrap";
        el.style.overflow = "hidden";
        el.style.opacity = (props.opa !== undefined ? props.opa : 255) / 255;
    };

    const registerFeature = () => {
        if (window.FeatureRegistry) {
            window.FeatureRegistry.register("lvgl_label", { render });
            return true;
        }
        return false;
    };

    if (!registerFeature()) {
        setTimeout(() => {
            if (!registerFeature()) {
                console.error("[lvgl_label] FeatureRegistry not found!");
            }
        }, 100);
    }
})();
