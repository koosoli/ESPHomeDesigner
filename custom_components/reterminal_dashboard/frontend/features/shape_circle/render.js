(() => {
    const render = (el, widget, { getColorStyle }) => {
        const props = widget.props || {};

        el.style.backgroundColor = props.fill ? getColorStyle(props.color) : "transparent";
        el.style.border = `${props.border_width || 1}px solid ${getColorStyle(props.border_color || props.color || "black")}`;
        el.style.borderRadius = "50%";
        el.style.boxSizing = "border-box";
    };

    if (window.FeatureRegistry) {
        window.FeatureRegistry.register("shape_circle", { render });
    }
})();
