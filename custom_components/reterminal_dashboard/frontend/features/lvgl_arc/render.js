(() => {
    const render = (el, widget, { getColorStyle }) => {
        const props = widget.props || {};
        const width = widget.width || 100;
        const height = widget.height || 100;
        const color = getColorStyle(props.color || "black");
        const thickness = parseInt(props.thickness || 10, 10);

        // Clear element
        el.innerHTML = "";

        // Create SVG container
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
        svg.style.overflow = "visible";

        // Draw background arc (grey)
        const cx = width / 2;
        const cy = height / 2;
        const radius = Math.min(width, height) / 2 - thickness / 2;

        // Simple arc (270 degrees)
        // Start from angle 135 to 405 (bottom left to bottom right)
        const startToPath = (x, y, r, startAngle, endAngle) => {
            const start = polarToCartesian(x, y, r, endAngle);
            const end = polarToCartesian(x, y, r, startAngle);
            const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";
            return [
                "M", start.x, start.y,
                "A", r, r, 0, largeArcFlag, 0, end.x, end.y
            ].join(" ");
        };

        const polarToCartesian = (centerX, centerY, radius, angleInDegrees) => {
            var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
            return {
                x: centerX + (radius * Math.cos(angleInRadians)),
                y: centerY + (radius * Math.sin(angleInRadians))
            };
        };

        const bgPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        bgPath.setAttribute("d", startToPath(cx, cy, radius, -135, 135));
        bgPath.setAttribute("fill", "none");
        bgPath.setAttribute("stroke", "#eee");
        bgPath.setAttribute("stroke-width", thickness);
        bgPath.setAttribute("stroke-linecap", "round");
        svg.appendChild(bgPath);

        // Draw value arc
        const min = props.min || 0;
        const max = props.max || 100;
        let val = props.value !== undefined ? props.value : 50;

        // Try to fetch real entity state if configured
        const entityId = widget.entity_id;
        if (entityId && window.AppState && window.AppState.entityStates) {
            const stateObj = window.AppState.entityStates[entityId];
            if (stateObj && stateObj.state !== undefined) {
                const parsed = parseFloat(stateObj.state);
                if (!isNaN(parsed)) {
                    val = parsed;
                }
            }
        }

        val = Math.max(min, Math.min(max, val)); // Clamp

        // Total angle range is 270 degrees (-135 to 135)
        const angleSpan = 270;
        let percentage = 0;
        if (max > min) {
            percentage = (val - min) / (max - min);
        }

        const endAngle = -135 + (percentage * angleSpan);

        if (percentage > 0.01) {
            const valPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
            valPath.setAttribute("d", startToPath(cx, cy, radius, -135, endAngle));
            valPath.setAttribute("fill", "none");
            valPath.setAttribute("stroke", color);
            valPath.setAttribute("stroke-width", thickness);
            valPath.setAttribute("stroke-linecap", "round");
            svg.appendChild(valPath);
        }

        el.appendChild(svg);

        // Render Title/Label if present
        if (props.title) {
            const label = document.createElement("div");
            label.textContent = props.title;
            label.style.position = "absolute";
            label.style.top = "50%";
            label.style.left = "50%";
            label.style.transform = "translate(-50%, -50%)";
            label.style.fontFamily = "Roboto, sans-serif";
            label.style.fontSize = "14px";
            label.style.color = color;
            label.style.pointerEvents = "none";
            // Ensure container relative positioning
            el.style.position = "relative";
            el.appendChild(label);
        }
    };

    // Register with FeatureRegistry
    const registerFeature = () => {
        if (window.FeatureRegistry) {
            window.FeatureRegistry.register("lvgl_arc", { render });
            return true;
        }
        return false;
    };

    if (!registerFeature()) {
        setTimeout(() => {
            if (!registerFeature()) {
                console.error("[lvgl_arc] FeatureRegistry not found!");
            }
        }, 100);
    }
})();
