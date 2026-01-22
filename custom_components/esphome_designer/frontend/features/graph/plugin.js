/**
 * Graph Plugin
 */
import { drawInternalGrid, generateMockData, drawSmartAxisLabels } from '../../js/utils/graph_helpers.js';

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const entityId = widget.entity_id || "";
    const borderEnabled = props.border !== false;
    const color = props.color || "black";
    const colorStyle = getColorStyle(color);

    el.style.boxSizing = "border-box";
    el.style.backgroundColor = "#ffffff";
    el.style.overflow = "hidden";

    if (borderEnabled) {
        el.style.border = "2px solid " + colorStyle;
    }

    const svgNS = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(svgNS, "svg");
    svg.setAttribute("width", "100%");
    svg.setAttribute("height", "100%");
    svg.setAttribute("viewBox", `0 0 ${widget.width} ${widget.height}`);
    svg.style.display = "block";

    drawInternalGrid(svg, widget.width, widget.height, props.x_grid, props.y_grid);

    const minVal = parseFloat(props.min_value) || 0;
    const maxVal = parseFloat(props.max_value) || 100;
    const points = generateMockData(widget.width, widget.height, minVal, maxVal);

    const polyline = document.createElementNS(svgNS, "polyline");
    const pointsStr = points.map(p => `${p.x},${p.y}`).join(" ");
    polyline.setAttribute("points", pointsStr);
    polyline.setAttribute("fill", "none");
    polyline.setAttribute("stroke", colorStyle);
    const thickness = parseInt(props.line_thickness || 3, 10);
    polyline.setAttribute("stroke-width", thickness);
    polyline.setAttribute("stroke-linejoin", "round");

    const lineType = props.line_type || "SOLID";
    if (lineType === "DASHED") {
        polyline.setAttribute("stroke-dasharray", "5,5");
    } else if (lineType === "DOTTED") {
        polyline.setAttribute("stroke-dasharray", "2,2");
    }

    svg.appendChild(polyline);
    el.appendChild(svg);

    const widgetId = widget.id;
    setTimeout(() => {
        const canvas = document.getElementById("canvas");
        const widgetStillExists = canvas && canvas.querySelector(`[data-id="${widgetId}"]`);
        if (canvas && widgetStillExists) {
            drawSmartAxisLabels(canvas, widget.x, widget.y, widget.width, widget.height, minVal, maxVal, props.duration);
        }
    }, 0);

    if (widget.title) {
        const label = document.createElement("div");
        label.style.position = "absolute";
        label.style.top = "2px";
        label.style.left = "50%";
        label.style.transform = "translateX(-50%)";
        label.style.fontSize = "10px";
        label.style.color = colorStyle;
        label.style.backgroundColor = "rgba(255,255,255,0.7)";
        label.style.padding = "0 4px";
        label.style.borderRadius = "2px";
        label.style.whiteSpace = "nowrap";
        label.textContent = widget.title;
        el.appendChild(label);
    } else if (!entityId) {
        const label = document.createElement("div");
        label.style.position = "absolute";
        label.style.top = "50%";
        label.style.left = "50%";
        label.style.transform = "translate(-50%, -50%)";
        label.style.fontSize = "10px";
        label.style.color = "#999";
        label.style.backgroundColor = "rgba(255,255,255,0.8)";
        label.style.padding = "2px 6px";
        label.textContent = "graph (No Entity)";
        el.appendChild(label);
    }
};

const exportLVGL = (w, { common, convertColor }) => {
    const p = w.props || {};
    const entityId = (w.entity_id || "").replace(/[^a-zA-Z0-9_]/g, "_");
    return {
        chart: {
            ...common,
            type: "LINE",
            duration: p.duration || "1h",
            bg_color: convertColor(p.bg_color || "white"),
            traces: [
                {
                    sensor: entityId,
                    color: convertColor(p.color || "black"),
                    thickness: p.line_thickness || 2,
                    line_type: p.line_type || "SOLID"
                }
            ],
            y_min: p.min_value || 0,
            y_max: p.max_value || 100
        }
    };
};

const exportDoc = (w, context) => {
    const {
        lines, addFont, getColorConst, addDitherMask, getCondProps, getConditionCheck, isEpaper, sanitize
    } = context;

    const p = w.props || {};
    const entityId = (w.entity_id || "").trim();
    const title = sanitize(w.title || "");
    const duration = p.duration || "1h";
    const borderEnabled = p.border !== false;
    const colorProp = p.color || "black";
    const color = getColorConst(colorProp);
    const lineType = p.line_type || "SOLID";
    const lineThickness = parseInt(p.line_thickness || 3, 10);
    const continuous = !!p.continuous;
    const minValue = p.min_value || "";
    const maxValue = p.max_value || "";
    const minRange = p.min_range || "";
    const maxRange = p.max_range || "";

    const safeId = `graph_${w.id}`.replace(/-/g, "_");
    const fontId = addFont("Roboto", 400, 12);

    const gridEnabled = p.grid !== false;
    let xGrid = p.x_grid || "";
    let yGrid = p.y_grid || "";

    if (gridEnabled) {
        if (!xGrid) {
            const durationMatch = duration.match(/^(\d+(?:\.\d+)?)(min|h|d)$/);
            if (durationMatch) {
                const val = parseFloat(durationMatch[1]);
                const unit = durationMatch[2];
                let gridVal = val / 4;
                if (unit === "h") xGrid = gridVal >= 1 ? `${Math.round(gridVal)}h` : `${Math.round(gridVal * 60)}min`;
                else if (unit === "min") xGrid = `${Math.round(gridVal)}min`;
                else if (unit === "d") xGrid = `${Math.round(gridVal * 24)}h`;
            } else {
                xGrid = "1h";
            }
        }
        if (!yGrid) {
            const minVal = parseFloat(minValue) || 0;
            const maxVal = parseFloat(maxValue) || 100;
            const range = maxVal - minVal;
            const step = range / 4;
            const niceStep = Math.pow(10, Math.floor(Math.log10(step)));
            const normalized = step / niceStep;
            let yGridVal = normalized <= 1 ? niceStep : normalized <= 2 ? 2 * niceStep : normalized <= 5 ? 5 * niceStep : 10 * niceStep;
            yGrid = String(yGridVal);
        }
    }

    lines.push(`        // widget:graph id:${w.id} type:graph x:${w.x} y:${w.y} w:${w.width} h:${w.height} title:"${title}" entity:${entityId} local:${!!p.is_local_sensor} duration:${duration} border:${borderEnabled} color:${colorProp} x_grid:${xGrid} y_grid:${yGrid} line_type:${lineType} line_thickness:${lineThickness} continuous:${continuous} min_value:${minValue} max_value:${maxValue} min_range:${minRange} max_range:${maxRange} ${getCondProps(w)}`);

    const cond = getConditionCheck(w);
    if (cond) lines.push(`        ${cond}`);

    if (entityId) {
        lines.push(`        it.graph(${w.x}, ${w.y}, id(${safeId}));`);

        if (borderEnabled) {
            lines.push(`        for (int i = 0; i < ${lineThickness}; i++) {`);
            lines.push(`          it.rectangle(${w.x} + i, ${w.y} + i, ${w.width} - 2 * i, ${w.height} - 2 * i, ${color});`);
            lines.push(`        }`);
            addDitherMask(lines, colorProp, isEpaper, w.x, w.y, w.width, w.height);
        }

        if (yGrid) {
            const ySteps = 4;
            for (let i = 1; i < ySteps; i++) {
                const yOffset = Math.round(w.height * (i / ySteps));
                lines.push(`        for (int i = 0; i < ${w.width}; i += 4) {`);
                lines.push(`          it.draw_pixel_at(${w.x} + i, ${w.y + yOffset}, ${color});`);
                lines.push(`        }`);
            }
        }

        if (xGrid) {
            const xSteps = 4;
            for (let i = 1; i < xSteps; i++) {
                const xOffset = Math.round(w.width * (i / xSteps));
                lines.push(`        for (int i = 0; i < ${w.height}; i += 4) {`);
                lines.push(`          it.draw_pixel_at(${w.x + xOffset}, ${w.y} + i, ${color});`);
                lines.push(`        }`);
            }
        }

        if (title) {
            lines.push(`        it.printf(${w.x}+4, ${w.y}+2, id(${fontId}), ${color}, TextAlign::TOP_LEFT, "${title}");`);
        }

        const minY = parseFloat(minValue) || 0;
        const maxY = parseFloat(maxValue) || 100;
        const yRange = maxY - minY;
        const ySteps = 4;
        for (let i = 0; i <= ySteps; i++) {
            const ratio = i / ySteps;
            const val = minY + (yRange * ratio);
            const yOffset = Math.round(w.height * (1 - ratio));
            const fmt = yRange >= 10 ? "%.0f" : "%.1f";
            lines.push(`        it.printf(${w.x} - 4, ${w.y} + ${yOffset} - 6, id(${fontId}), ${color}, TextAlign::TOP_RIGHT, "${fmt}", (float)${val});`);
        }

        let durationSec = 3600;
        const durMatch = duration.match(/^(\d+)([a-z]+)$/i);
        if (durMatch) {
            const v = parseInt(durMatch[1], 10);
            const u = durMatch[2].toLowerCase();
            if (u.startsWith("s")) durationSec = v;
            else if (u.startsWith("m")) durationSec = v * 60;
            else if (u.startsWith("h")) durationSec = v * 3600;
            else if (u.startsWith("d")) durationSec = v * 86400;
        }

        const xLabelSteps = 2;
        for (let i = 0; i <= xLabelSteps; i++) {
            const ratio = i / xLabelSteps;
            const xOffset = Math.round(w.width * ratio);
            let align = "TextAlign::TOP_CENTER";
            if (i === 0) align = "TextAlign::TOP_LEFT";
            if (i === xLabelSteps) align = "TextAlign::TOP_RIGHT";

            let labelText = i === xLabelSteps ? "Now" : "";
            if (i !== xLabelSteps) {
                const timeAgo = durationSec * (1 - ratio);
                if (timeAgo >= 3600) labelText = `-${(timeAgo / 3600).toFixed(1)}h`;
                else if (timeAgo >= 60) labelText = `-${(timeAgo / 60).toFixed(0)}m`;
                else labelText = `-${timeAgo.toFixed(0)}s`;
            }
            lines.push(`        it.printf(${w.x} + ${xOffset}, ${w.y} + ${w.height} + 2, id(${fontId}), ${color}, ${align}, "${labelText}");`);
        }
    } else {
        lines.push(`        it.printf(${w.x}+5, ${w.y}+5, id(${fontId}), ${color}, TextAlign::TOP_LEFT, "Graph (no entity)");`);
    }

    if (cond) lines.push(`        }`);
};

const onExportComponents = (context) => {
    const { lines, widgets } = context;
    const graphWidgets = widgets.filter(w => w.type === 'graph');

    if (graphWidgets.length > 0) {
        lines.push("graph:");
        graphWidgets.forEach(w => {
            const p = w.props || {};
            const safeId = `graph_${w.id}`.replace(/-/g, "_");
            const duration = p.duration || "1h";
            const width = parseInt(w.width, 10);
            const height = parseInt(w.height, 10);
            const maxRange = p.max_range ? parseFloat(p.max_range) : null;
            const minRange = p.min_range ? parseFloat(p.min_range) : null;

            const gridEnabled = p.grid !== false;
            let xGrid = p.x_grid || "";
            let yGrid = p.y_grid || "";

            if (gridEnabled) {
                if (!xGrid) {
                    const durationMatch = duration.match(/^(\d+(?:\.\d+)?)(min|h|d)$/);
                    if (durationMatch) {
                        const val = parseFloat(durationMatch[1]);
                        const unit = durationMatch[2];
                        let gridVal = val / 4;
                        if (unit === "h") xGrid = gridVal >= 1 ? `${Math.round(gridVal)}h` : `${Math.round(gridVal * 60)}min`;
                        else if (unit === "min") xGrid = `${Math.round(gridVal)}min`;
                        else if (unit === "d") xGrid = `${Math.round(gridVal * 24)}h`;
                    } else xGrid = "1h";
                }
                if (!yGrid) {
                    const minVal = parseFloat(p.min_value) || 0;
                    const maxVal = parseFloat(p.max_value) || 100;
                    const range = maxVal - minVal;
                    const step = range / 4;
                    const niceStep = Math.pow(10, Math.floor(Math.log10(step)));
                    const normalized = step / niceStep;
                    let yGridVal = normalized <= 1 ? niceStep : normalized <= 2 ? 2 * niceStep : normalized <= 5 ? 5 * niceStep : 10 * niceStep;
                    yGrid = String(yGridVal);
                }
            }

            let entityId = (w.entity_id || "").trim();
            if (entityId && !entityId.includes(".") && !p.is_local_sensor) {
                entityId = `sensor.${entityId}`;
            }
            const localSensorId = entityId.replace(/[^a-zA-Z0-9_]/g, "_") || "none";
            const lineType = (p.line_type || "SOLID").toUpperCase();
            const lineThickness = parseInt(p.line_thickness || 3, 10);
            const border = p.border !== false;
            const continuous = !!p.continuous;

            lines.push(`  - id: ${safeId}`);
            lines.push(`    duration: ${duration}`);
            lines.push(`    width: ${width}`);
            lines.push(`    height: ${height}`);
            lines.push(`    border: ${border}`);
            if (gridEnabled && xGrid) lines.push(`    x_grid: ${xGrid}`);
            if (gridEnabled && yGrid) lines.push(`    y_grid: ${yGrid}`);
            lines.push(`    traces:`);
            lines.push(`      - sensor: ${localSensorId}`);
            lines.push(`        line_thickness: ${lineThickness}`);
            if (lineType !== "SOLID") lines.push(`        line_type: ${lineType}`);
            if (continuous) lines.push(`        continuous: true`);

            if (p.min_value !== undefined && p.min_value !== null && String(p.min_value).trim() !== "") lines.push(`    min_value: ${p.min_value}`);
            if (p.max_value !== undefined && p.max_value !== null && String(p.max_value).trim() !== "") lines.push(`    max_value: ${p.max_value}`);
            if (maxRange !== null) lines.push(`    max_range: ${maxRange}`);
            if (minRange !== null) lines.push(`    min_range: ${minRange}`);
        });
        lines.push("");
    }
};

const onExportNumericSensors = (context) => {
    const { lines, widgets } = context;
    if (!widgets) return;

    for (const w of widgets) {
        if (w.type !== "graph") continue;

        let entityId = (w.entity_id || "").trim();
        const p = w.props || {};
        if (!entityId || p.is_local_sensor) continue;

        // Ensure sensor. prefix if missing
        if (!entityId.includes(".")) {
            entityId = `sensor.${entityId}`;
        }

        const safeId = entityId.replace(/[^a-zA-Z0-9_]/g, "_");
        const alreadyDefined = (context.seenEntityIds && context.seenEntityIds.has(entityId)) ||
            (context.seenSensorIds && context.seenSensorIds.has(safeId));

        if (!alreadyDefined) {
            if (context.seenEntityIds) context.seenEntityIds.add(entityId);
            if (context.seenSensorIds) context.seenSensorIds.add(safeId);

            lines.push("- platform: homeassistant");
            lines.push(`  id: ${safeId}`);
            lines.push(`  entity_id: ${entityId}`);
            lines.push(`  internal: true`);
        }
    }
};

export default {
    id: "graph",
    name: "Graph / Chart",
    category: "Advanced",
    defaults: {
        duration: "1h",
        border: true,
        grid: true,
        color: "black",
        title: "",
        x_grid: "",
        y_grid: "",
        line_thickness: 3,
        line_type: "SOLID",
        continuous: true,
        min_value: "",
        max_value: "",
        min_range: "",
        max_range: ""
    },
    render,
    export: exportDoc,
    onExportComponents,
    onExportNumericSensors
};

