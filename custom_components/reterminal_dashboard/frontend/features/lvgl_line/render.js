(() => {
    const render = (el, widget, { getColorStyle }) => {
        const props = widget.props || {};
        const color = getColorStyle(props.line_color || props.color || "black");
        const strokeWidth = props.line_width || 3;
        const opacity = (props.opa !== undefined ? props.opa : 255) / 255;
        const orientation = props.orientation || "horizontal";

        el.innerHTML = "";

        // Legacy: If we have manually specified points (old style), use SVG
        if (props.points && typeof props.points === 'string' && props.points.includes(',')) {
            let pointsArr = [];
            if (typeof props.points === 'string') {
                pointsArr = props.points.split(" ").map(pt => pt.split(",").map(Number));
            } else if (Array.isArray(props.points)) {
                pointsArr = props.points.map(pt => Array.isArray(pt) ? pt : String(pt).split(",").map(Number));
            }

            if (pointsArr.length > 0) {
                const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
                svg.setAttribute("width", "100%");
                svg.setAttribute("height", "100%");
                svg.style.overflow = "visible";

                const polyline = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
                const pointsStr = pointsArr
                    .filter(p => p.length >= 1 && !isNaN(p[0]))
                    .map(p => `${p[0]},${p[1] !== undefined && !isNaN(p[1]) ? p[1] : 0}`)
                    .join(" ");
                polyline.setAttribute("points", pointsStr);
                polyline.setAttribute("stroke", color);
                polyline.setAttribute("stroke-width", strokeWidth);
                polyline.setAttribute("fill", "none");
                if (props.line_rounded !== false) {
                    polyline.setAttribute("stroke-linecap", "round");
                    polyline.setAttribute("stroke-linejoin", "round");
                }

                svg.appendChild(polyline);
                el.appendChild(svg);
                el.style.opacity = opacity;
                return;
            }
        }

        // Simple line (horizontal/vertical) - like non-LVGL line widget
        if (orientation === "vertical") {
            el.style.width = `${strokeWidth}px`;
            el.style.height = `${widget.height}px`;
        } else {
            el.style.width = `${widget.width}px`;
            el.style.height = `${strokeWidth}px`;
        }
        el.style.backgroundColor = color;
        el.style.opacity = opacity;
        if (props.line_rounded !== false) {
            el.style.borderRadius = `${strokeWidth}px`;
        }
    };

    const registerFeature = () => {
        if (window.FeatureRegistry) {
            window.FeatureRegistry.register("lvgl_line", { render });
            return true;
        }
        return false;
    };

    if (!registerFeature()) {
        setTimeout(() => {
            if (!registerFeature()) {
                console.error("[lvgl_line] FeatureRegistry not found!");
            }
        }, 100);
    }
})();
