(() => {
    const render = (el, widget, { getColorStyle }) => {
        const props = widget.props || {};
        const width = widget.width || 60;
        const height = widget.height || 60;
        const trackColor = getColorStyle(props.track_color || "white");
        const arcColor = getColorStyle(props.arc_color || "blue");
        const thickness = 6;

        el.innerHTML = "";
        el.style.display = "flex";
        el.style.alignItems = "center";
        el.style.justifyContent = "center";
        el.style.boxSizing = "border-box";

        // Create SVG spinner
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        const size = Math.min(width, height);
        svg.setAttribute("width", size);
        svg.setAttribute("height", size);
        svg.setAttribute("viewBox", `0 0 ${size} ${size}`);

        const cx = size / 2;
        const cy = size / 2;
        const radius = (size / 2) - thickness;

        // Track circle
        const track = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        track.setAttribute("cx", cx);
        track.setAttribute("cy", cy);
        track.setAttribute("r", radius);
        track.setAttribute("fill", "none");
        track.setAttribute("stroke", trackColor);
        track.setAttribute("stroke-width", thickness);
        svg.appendChild(track);

        // Spinning arc
        const rawArcLen = props.arc_length !== undefined ? parseFloat(props.arc_length) : 60;
        const arcLen = (isNaN(rawArcLen) ? 60 : rawArcLen) * (Math.PI / 180);
        const startAngle = -Math.PI / 2;
        const endAngle = startAngle + arcLen;

        const x1 = cx + radius * Math.cos(startAngle);
        const y1 = cy + radius * Math.sin(startAngle);
        const x2 = cx + radius * Math.cos(endAngle);
        const y2 = cy + radius * Math.sin(endAngle);
        const largeArc = arcLen > Math.PI ? 1 : 0;

        const arc = document.createElementNS("http://www.w3.org/2000/svg", "path");
        arc.setAttribute("d", `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`);
        arc.setAttribute("fill", "none");
        arc.setAttribute("stroke", arcColor);
        arc.setAttribute("stroke-width", thickness);
        arc.setAttribute("stroke-linecap", "round");
        svg.appendChild(arc);

        el.appendChild(svg);
    };

    const registerFeature = () => {
        if (window.FeatureRegistry) {
            window.FeatureRegistry.register("lvgl_spinner", { render });
            return true;
        }
        return false;
    };

    if (!registerFeature()) {
        setTimeout(() => {
            if (!registerFeature()) {
                console.error("[lvgl_spinner] FeatureRegistry not found!");
            }
        }, 100);
    }
})();
