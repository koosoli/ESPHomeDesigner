(() => {
    const render = (el, widget, { getColorStyle }) => {
        const props = widget.props || {};

        // Draw a meter preview using SVG
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.style.width = "100%";
        svg.style.height = "100%";

        const cx = widget.width / 2;
        const cy = widget.height / 2;
        const padding = 10;
        const r = Math.min(cx, cy) - padding;

        const min = props.min || 0;
        const max = props.max || 100;
        const val = props.value !== undefined ? props.value : min;
        const scaleWidth = parseInt(props.scale_width || 10, 10);
        const indicatorWidth = parseInt(props.indicator_width || 4, 10);

        // Background arc (270 degrees)
        const startAngle = 135;
        const endAngle = 405;

        const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
            const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
            return {
                x: centerX + (radius * Math.cos(angleInRadians)),
                y: centerY + (radius * Math.sin(angleInRadians))
            };
        };

        const describeArc = (x, y, radius, startAngle, endAngle) => {
            const start = polarToCartesian(x, y, radius, endAngle);
            const end = polarToCartesian(x, y, radius, startAngle);
            const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
            return [
                "M", start.x, start.y,
                "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
            ].join(" ");
        };

        const bgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        bgPath.setAttribute("d", describeArc(cx, cy, r - scaleWidth / 2, startAngle, endAngle));
        bgPath.setAttribute("fill", "none");
        bgPath.setAttribute("stroke", getColorStyle(props.bg_color || "lightgray"));
        bgPath.setAttribute("stroke-width", scaleWidth);
        svg.appendChild(bgPath);

        // Value indicator
        let percentage = 0;
        if (max > min) {
            percentage = (val - min) / (max - min);
        }
        const valAngle = startAngle + percentage * (endAngle - startAngle);
        const indicator = document.createElementNS("http://www.w3.org/2000/svg", "line");
        const p1 = polarToCartesian(cx, cy, r - scaleWidth, valAngle);
        const p2 = polarToCartesian(cx, cy, 5, valAngle);
        indicator.setAttribute("x1", p1.x);
        indicator.setAttribute("y1", p1.y);
        indicator.setAttribute("x2", p2.x);
        indicator.setAttribute("y2", p2.y);
        indicator.setAttribute("stroke", getColorStyle(props.indicator_color || "red"));
        indicator.setAttribute("stroke-width", indicatorWidth);
        svg.appendChild(indicator);

        el.innerHTML = "";
        el.appendChild(svg);
        el.style.opacity = (props.opa !== undefined ? props.opa : 255) / 255;
    };

    const registerFeature = () => {
        if (window.FeatureRegistry) {
            window.FeatureRegistry.register("lvgl_meter", { render });
            return true;
        }
        return false;
    };

    if (!registerFeature()) {
        setTimeout(() => {
            if (!registerFeature()) {
                console.error("[lvgl_meter] FeatureRegistry not found!");
            }
        }, 100);
    }
})();
