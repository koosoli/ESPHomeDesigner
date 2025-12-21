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
        const tickCount = parseInt(props.tick_count || 11, 10);
        const tickLength = parseInt(props.tick_length || 10, 10);

        // Standard LVGL arc: 270 degrees, starting at 135
        // (0 degrees is 3 o'clock, 90 is 6 o'clock, 180 is 9 o'clock)
        const startAngle = 135;
        const range = 270;
        const endAngle = startAngle + range;

        const toRad = (deg) => deg * (Math.PI / 180);

        // Calculate arc radius (inset by half scale width)
        const arcR = r - Math.max(scaleWidth, tickLength) / 2;

        // Helper for polar to cartesian (standard math: 0 is 3 o'clock)
        const polarToX = (centerX, radius, angleDeg) => centerX + radius * Math.cos(toRad(angleDeg));
        const polarToY = (centerY, radius, angleDeg) => centerY + radius * Math.sin(toRad(angleDeg));

        // 1. Draw Background Arc
        const x1 = polarToX(cx, arcR, startAngle);
        const y1 = polarToY(cy, arcR, startAngle);
        const x2 = polarToX(cx, arcR, endAngle);
        const y2 = polarToY(cy, arcR, endAngle);

        const d = `M ${x1} ${y1} A ${arcR} ${arcR} 0 1 1 ${x2} ${y2}`;

        const bgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        bgPath.setAttribute("d", d);
        bgPath.setAttribute("fill", "none");
        bgPath.setAttribute("stroke", getColorStyle(props.bg_color || "lightgray"));
        bgPath.setAttribute("stroke-width", scaleWidth);
        bgPath.setAttribute("stroke-linecap", "round");
        svg.appendChild(bgPath);

        // 2. Draw Ticks
        if (tickCount > 1) {
            const tickGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
            tickGroup.setAttribute("stroke", getColorStyle(props.color || "black"));
            tickGroup.setAttribute("stroke-width", "2px");

            for (let i = 0; i < tickCount; i++) {
                const pct = i / (tickCount - 1);
                const angle = startAngle + (range * pct);

                const tx1 = polarToX(cx, arcR - scaleWidth / 2, angle);
                const ty1 = polarToY(cy, arcR - scaleWidth / 2, angle);
                const tx2 = polarToX(cx, arcR - scaleWidth / 2 - tickLength, angle);
                const ty2 = polarToY(cy, arcR - scaleWidth / 2 - tickLength, angle);

                const tick = document.createElementNS("http://www.w3.org/2000/svg", "line");
                tick.setAttribute("x1", tx1);
                tick.setAttribute("y1", ty1);
                tick.setAttribute("x2", tx2);
                tick.setAttribute("y2", ty2);
                tickGroup.appendChild(tick);
            }
            svg.appendChild(tickGroup);
        }

        // 3. Draw Needle
        let percentage = 0;
        if (max > min) {
            percentage = (val - min) / (max - min);
        }
        const needleAngle = startAngle + (range * percentage);

        const nx = polarToX(cx, arcR - 10, needleAngle);
        const ny = polarToY(cy, arcR - 10, needleAngle);

        const needle = document.createElementNS("http://www.w3.org/2000/svg", "line");
        needle.setAttribute("x1", cx);
        needle.setAttribute("y1", cy);
        needle.setAttribute("x2", nx);
        needle.setAttribute("y2", ny);
        needle.setAttribute("stroke", getColorStyle(props.indicator_color || "red"));
        needle.setAttribute("stroke-width", indicatorWidth);
        needle.setAttribute("stroke-linecap", "round");
        svg.appendChild(needle);

        // Center pivot
        const pivot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        pivot.setAttribute("cx", cx);
        pivot.setAttribute("cy", cy);
        pivot.setAttribute("r", indicatorWidth);
        pivot.setAttribute("fill", getColorStyle(props.indicator_color || "red"));
        svg.appendChild(pivot);

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
