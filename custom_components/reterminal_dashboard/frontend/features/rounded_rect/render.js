(() => {
    const render = (el, widget, { getColorStyle }) => {
        const props = widget.props || {};
        const radius = parseInt(props.radius || 10, 10);
        const borderWidth = parseInt(props.border_width || 4, 10);
        const color = props.color || "black";

        el.style.backgroundColor = props.fill ? getColorStyle(color) : "transparent";
        const bCol = props.border_color || (props.fill ? "black" : color);
        const borderColor = (props.fill && !(props.show_border || props.show_border === "true" || props.show_border === true)) ? getColorStyle(color) : getColorStyle(props.border_color || (props.fill ? "black" : color));
        el.style.border = `${borderWidth}px solid ${borderColor}`;
        el.style.borderRadius = `${radius}px`;
        el.style.boxSizing = "border-box";

        // Handle opacity if supported
        if (props.opacity && props.opacity < 100) {
            el.style.opacity = props.opacity / 100;
        } else {
            el.style.opacity = 1;
        }
    };

    if (window.FeatureRegistry) {
        window.FeatureRegistry.register("rounded_rect", { render });
    }
})();
