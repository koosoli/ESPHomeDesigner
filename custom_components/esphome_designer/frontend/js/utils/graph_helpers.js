// --- Graph Preview Helpers ---

/**
 * Parses a duration string (e.g. "1h", "30m", "60s") into seconds.
 * @param {string|number} durationStr
 * @returns {number} Seconds
 */
export function parseDuration(durationStr) {
    if (!durationStr) return 3600; // Default 1h

    // Handle numeric values (already in seconds)
    if (typeof durationStr === 'number') {
        return durationStr;
    }

    // Convert to string if needed
    const str = String(durationStr);

    // If it's a pure number string, treat as seconds
    if (/^\d+$/.test(str)) {
        return parseInt(str, 10);
    }

    const match = str.match(/^(\d+)([a-z]+)$/i);
    if (!match) return 3600;
    const val = parseInt(match[1], 10);
    const unit = match[2].toLowerCase();
    if (unit.startsWith("s")) return val;
    if (unit.startsWith("m")) return val * 60;
    if (unit.startsWith("h")) return val * 3600;
    if (unit.startsWith("d")) return val * 86400;
    return val;
}

/**
 * Generates mock data points for a graph.
 * @param {number} width
 * @param {number} height
 * @param {number} [_min]
 * @param {number} [_max]
 * @returns {{x: number, y: number}[]}
 */
export function generateMockData(width, height, _min, _max) {
    /** @type {{x: number, y: number}[]} */
    const points = [];
    const numPoints = 50;

    // Generate a nice wavy line
    for (let i = 0; i < numPoints; i++) {
        const x = (i / (numPoints - 1)) * width;

        // Sine wave + noise
        const normalizedX = i / numPoints;
        const base = Math.sin(normalizedX * Math.PI * 2); // One full wave
        const noise = (Math.random() - 0.5) * 0.2; // +/- 10% noise

        let normalizedY = 0.5 + (base * 0.3) + noise;
        normalizedY = Math.max(0.1, Math.min(0.9, normalizedY)); // Clamp to keep inside

        // Map to pixel coordinates (Y is inverted in SVG/Canvas)
        const y = height - (normalizedY * height);
        points.push({ x, y });
    }
    return points;
}

/**
 * Maps Home Assistant history data to SVG coordinates for the graph.
 * @param {number} width
 * @param {number} height
 * @param {number} min
 * @param {number} max
 * @param {any[]} historyData
 * @param {string|number} durationStr
 * @returns {{x: number, y: number}[]}
 */
export function generateHistoricalDataPoints(width, height, min, max, historyData, durationStr) {
    if (!historyData || historyData.length === 0) return generateMockData(width, height, min, max);

    /** @type {{x: number, y: number}[]} */
    const points = [];
    const durationSec = parseDuration(durationStr);
    const now = Date.now();
    const startTime = now - (durationSec * 1000);

    // HA history data filter and map
    const mappedData = historyData
        .map(item => ({
            time: new Date(item.last_changed || item.when || Date.now()).getTime(),
            value: parseFloat(item.state)
        }))
        .filter(item => !isNaN(item.value));

    if (mappedData.length === 0) return generateMockData(width, height, min, max);

    // Sort by time
    mappedData.sort((a, b) => a.time - b.time);

    // Auto-scaling logic
    let effectiveMin = min;
    let effectiveMax = max;

    const values = mappedData.map(d => d.value);
    const dataMin = Math.min(...values);
    const dataMax = Math.max(...values);

    // If min/max are explicitly same or unset (auto), use data range
    if (min === max || (isNaN(min) && isNaN(max)) || (min === 0 && max === 100 && (dataMin > 100 || dataMax < 0))) {
        effectiveMin = dataMin;
        effectiveMax = dataMax;

        // Add 10% padding
        const padding = (effectiveMax - effectiveMin) * 0.1 || 1.0;
        effectiveMin -= padding;
        effectiveMax += padding;
    }

    const range = (effectiveMax - effectiveMin) || 1;

    mappedData.forEach(item => {
        // Map time to X (0 to width)
        const x = ((item.time - startTime) / (durationSec * 1000)) * width;

        // Map value to Y (height to 0)
        let normalizedY = (item.value - effectiveMin) / range;
        normalizedY = Math.max(-0.1, Math.min(1.1, normalizedY)); // Allow a bit over/under for smooth lines
        const y = height - (normalizedY * height);

        // Only include points within the duration window (roughly)
        if (x >= -10 && x <= width + 10) {
            points.push({ x, y });
        }
    });

    // If we have very few points, it might look empty, maybe add a point at "Now"
    if (points.length > 0 && points[points.length - 1].x < width - 1) {
        points.push({ x: width, y: points[points.length - 1].y });
    }

    return points;
}

/**
 * @param {SVGElement} svg
 * @param {number} width
 * @param {number} height
 * @param {string} _xGridStr
 * @param {string} _yGridStr
 * @param {string} [color="rgba(0,0,0,0.1)"]
 */
export function drawInternalGrid(svg, width, height, _xGridStr, _yGridStr, color = "rgba(0,0,0,0.1)") {
    const gridGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    gridGroup.setAttribute("stroke", color);
    gridGroup.setAttribute("stroke-dasharray", "2,2");
    gridGroup.setAttribute("stroke-width", "1");

    // Simple heuristic for grid lines if no specific interval is parsed
    const xLines = 4;
    const yLines = 4;

    for (let i = 1; i < xLines; i++) {
        const x = (i / xLines) * width;
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", String(x));
        line.setAttribute("y1", "0");
        line.setAttribute("x2", String(x));
        line.setAttribute("y2", String(height));
        gridGroup.appendChild(line);
    }

    for (let i = 1; i < yLines; i++) {
        const y = (i / yLines) * height;
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", "0");
        line.setAttribute("y1", String(y));
        line.setAttribute("x2", String(width));
        line.setAttribute("y2", String(y));
        gridGroup.appendChild(line);
    }

    svg.appendChild(gridGroup);
}

/**
 * @param {HTMLElement|null} container
 * @param {number} x
 * @param {number} y
 * @param {number} width
 * @param {number} height
 * @param {number} min
 * @param {number} max
 * @param {string|number} durationStr
 * @param {string} widgetId
 * @param {string} [color="#666"]
 */
export function drawSmartAxisLabels(container, x, y, width, height, min, max, durationStr, widgetId, color = "#666") {
    // container should be the ARTBOARD (div.artboard)
    if (!container) return;

    // Remove existing axis labels for THIS widget only
    const existing = container.querySelectorAll(`.graph-axis-label[data-widget-id="${widgetId}"]`);
    existing.forEach(el => el.remove());

    // Y-Axis Labels (Left of graph)
    const range = max - min;
    const steps = 4; // Min, 25%, 50%, 75%, Max

    // Use artboard dimensions for logical clamping
    // @ts-ignore
    const canvasWidth = parseInt(container.style.width) || 800;
    // @ts-ignore
    const canvasHeight = parseInt(container.style.height) || 480;

    // Determine if labels should be inside or outside
    const yLabelsInside = x < 40;
    const xLabelsInside = (y + height + 20) > canvasHeight;

    for (let i = 0; i <= steps; i++) {
        const val = min + (range * (i / steps));
        const labelY = y + height - ((i / steps) * height);

        const div = document.createElement("div");
        div.className = "graph-axis-label";
        div.dataset.widgetId = widgetId;
        // @ts-ignore
        div.style.position = "absolute";

        if (yLabelsInside) {
            // @ts-ignore
            div.style.left = `${x + 4}px`;
            // @ts-ignore
            div.style.textAlign = "left";
        } else {
            // Positon to left of graph.
            // We use left-based positioning to be relative to artboard origin.
            // @ts-ignore
            div.style.left = `${x - 4}px`;
            // @ts-ignore
            div.style.transform = "translateX(-100%)";
            // @ts-ignore
            div.style.textAlign = "right";
        }

        // @ts-ignore
        div.style.top = `${labelY - 6}px`; // Center vertically
        // @ts-ignore
        div.style.fontSize = "10px";
        // @ts-ignore
        div.style.color = color;
        // @ts-ignore
        div.style.opacity = yLabelsInside ? "0.7" : "1.0";
        // @ts-ignore
        div.style.pointerEvents = "none";
        // @ts-ignore
        div.style.zIndex = "10";
        div.textContent = val.toFixed(1);
        container.appendChild(div);
    }

    // X-Axis Labels (Below graph)
    const durationSec = parseDuration(durationStr);
    const xSteps = 2; // Start, Middle, End

    for (let i = 0; i <= xSteps; i++) {
        const ratio = i / xSteps;
        const labelX = x + (width * ratio);

        let labelText = "";
        if (i === xSteps) labelText = "Now";
        else {
            const timeAgo = durationSec * (1 - ratio);
            if (timeAgo >= 3600) labelText = `-${(timeAgo / 3600).toFixed(1)}h`;
            else if (timeAgo >= 60) labelText = `-${(timeAgo / 60).toFixed(0)}m`;
            else labelText = `-${timeAgo.toFixed(0)}s`;
        }

        const div = document.createElement("div");
        div.className = "graph-axis-label";
        div.dataset.widgetId = widgetId;
        // @ts-ignore
        div.style.position = "absolute";
        // @ts-ignore
        div.style.left = `${labelX}px`;

        if (xLabelsInside) {
            // @ts-ignore
            div.style.top = `${y + height - 14}px`; // Inside, above bottom
        } else {
            // @ts-ignore
            div.style.top = `${y + height + 4}px`; // Below graph
        }

        // @ts-ignore
        div.style.fontSize = "10px";
        // @ts-ignore
        div.style.color = color;
        // @ts-ignore
        div.style.opacity = xLabelsInside ? "0.7" : "1.0";
        // @ts-ignore
        div.style.pointerEvents = "none";
        // @ts-ignore
        div.style.zIndex = "10";

        // Horizontal clamping for X labels relative to artboard
        if (labelX < 20) {
            // @ts-ignore
            div.style.transform = "none";
            // @ts-ignore
            div.style.textAlign = "left";
        } else if (labelX > canvasWidth - 20) {
            // @ts-ignore
            div.style.transform = "translateX(-100%)";
            // @ts-ignore
            div.style.textAlign = "right";
        } else {
            // @ts-ignore
            div.style.transform = "translateX(-50%)";
            // @ts-ignore
            div.style.textAlign = "center";
        }

        div.textContent = labelText;
        container.appendChild(div);
    }
}
