
// --- Graph Preview Helpers ---

function parseDuration(durationStr) {
    if (!durationStr) return 3600; // Default 1h
    const match = durationStr.match(/^(\d+)([a-z]+)$/i);
    if (!match) return 3600;
    const val = parseInt(match[1], 10);
    const unit = match[2].toLowerCase();
    if (unit.startsWith("s")) return val;
    if (unit.startsWith("m")) return val * 60;
    if (unit.startsWith("h")) return val * 3600;
    if (unit.startsWith("d")) return val * 86400;
    return val;
}

function generateMockData(width, height, min, max) {
    const points = [];
    const numPoints = 50;
    const range = max - min;

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

function drawInternalGrid(svg, width, height, xGridStr, yGridStr) {
    const gridGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    gridGroup.setAttribute("stroke", "rgba(0,0,0,0.1)");
    gridGroup.setAttribute("stroke-dasharray", "2,2");
    gridGroup.setAttribute("stroke-width", "1");

    // Simple heuristic for grid lines if no specific interval is parsed
    // In a real scenario we'd parse "10min" or "1.5"
    const xLines = 4;
    const yLines = 4;

    for (let i = 1; i < xLines; i++) {
        const x = (i / xLines) * width;
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", x);
        line.setAttribute("y1", 0);
        line.setAttribute("x2", x);
        line.setAttribute("y2", height);
        gridGroup.appendChild(line);
    }

    for (let i = 1; i < yLines; i++) {
        const y = (i / yLines) * height;
        const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
        line.setAttribute("x1", 0);
        line.setAttribute("y1", y);
        line.setAttribute("x2", width);
        line.setAttribute("y2", y);
        gridGroup.appendChild(line);
    }

    svg.appendChild(gridGroup);
}

function drawSmartAxisLabels(container, x, y, width, height, min, max, durationStr) {
    // Y-Axis Labels (Left of graph)
    const range = max - min;
    const steps = 4; // Min, 25%, 50%, 75%, Max

    for (let i = 0; i <= steps; i++) {
        const val = min + (range * (i / steps));
        const labelY = y + height - ((i / steps) * height);

        const div = document.createElement("div");
        div.style.position = "absolute";
        div.style.right = `${(CANVAS_WIDTH - x) + 4}px`; // Position to left of graph
        div.style.top = `${labelY - 6}px`; // Center vertically
        div.style.fontSize = "10px";
        div.style.color = "#666";
        div.style.textAlign = "right";
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
        div.style.position = "absolute";
        div.style.left = `${labelX}px`;
        div.style.top = `${y + height + 4}px`; // Below graph
        div.style.fontSize = "10px";
        div.style.color = "#666";
        div.style.transform = "translateX(-50%)";
        div.textContent = labelText;
        container.appendChild(div);
    }
}
