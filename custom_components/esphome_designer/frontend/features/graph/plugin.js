/**
 * Graph Plugin
 */
import { drawInternalGrid, generateMockData, drawSmartAxisLabels, generateHistoricalDataPoints } from '../../js/utils/graph_helpers.js';
import { fetchEntityHistory, getEntityAttributes } from '../../js/io/ha_api.js';
import { emit, EVENTS } from '../../js/core/events.js';

const historyCache = new Map(); // cacheKey -> { data, timestamp }
const fetchInProgress = new Set(); // cacheKey

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const entityId = widget.entity_id || "";
    const borderEnabled = props.border !== false;
    const isDark = getColorStyle() === "#ffffff";

    // Determine background color
    let bgColor = props.background_color;
    if (!bgColor || bgColor === "transparent" || bgColor === "inherit") {
        bgColor = isDark ? "black" : "white";
    }

    // Determine line color
    let color = props.color || "theme_auto";

    // Safety check: Avoid same color for background and line
    if (color === bgColor) {
        color = bgColor === "white" || bgColor === "#ffffff" ? "black" : "white";
    }

    const colorStyle = getColorStyle(color);
    const bgStyle = getColorStyle(bgColor);

    el.style.boxSizing = "border-box";
    el.style.backgroundColor = bgStyle;
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

    drawInternalGrid(svg, widget.width, widget.height, props.x_grid, props.y_grid, isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)");

    let minVal = props.auto_scale !== false ? NaN : (parseFloat(props.min_value) || 0);
    let maxVal = props.auto_scale !== false ? NaN : (parseFloat(props.max_value) || 100);

    // Check for historical data
    let historyData = null;
    if (entityId) {
        if (props.use_ha_history) {
            // Live Preview for HA Attribute mode
            const attrs = getEntityAttributes(entityId);
            const attrName = props.history_attribute || 'history';
            if (attrs && attrs[attrName]) {
                const rawData = attrs[attrName];
                // Parse similarly to C++ logic
                const values = [];
                if (Array.isArray(rawData)) {
                    rawData.forEach(item => {
                        // Handle simple numbers
                        if (typeof item === 'number') values.push(item);
                        // Handle string numbers
                        else if (typeof item === 'string') {
                            const f = parseFloat(item);
                            if (!isNaN(f)) values.push(f);
                        }
                        // Handle structured objects (value: X)
                        else if (typeof item === 'object' && item !== null) {
                            if (item.value !== undefined) {
                                const f = parseFloat(item.value);
                                if (!isNaN(f)) values.push(f);
                            }
                        }
                    });
                } else if (typeof rawData === 'string') {
                    // Handle stringified JSON or CSV
                    try {
                        const parsed = JSON.parse(rawData);
                        if (Array.isArray(parsed)) {
                            parsed.forEach(p => {
                                if (typeof p === 'number') values.push(p);
                                else if (p.value !== undefined) values.push(parseFloat(p.value));
                            });
                        }
                    } catch (e) {
                        // Fallback: regex for value:
                        const regex = /value\s*:\s*([\d\.-]+)/g;
                        let match;
                        while ((match = regex.exec(rawData)) !== null) {
                            values.push(parseFloat(match[1]));
                        }
                    }
                }

                // Map to format expected by generateHistoricalDataPoints
                if (values.length > 0) {
                    historyData = values.map(v => ({ state: v, last_changed: Date.now() }));
                }
            }
        } else {
            // Standard History API mode
            const duration = props.duration || "1h";
            const cacheKey = `${entityId}_${duration}`;
            const cached = historyCache.get(cacheKey);

            if (cached && (Date.now() - cached.timestamp < 60000)) {
                historyData = cached.data;
            } else if (!fetchInProgress.has(cacheKey)) {
                fetchInProgress.add(cacheKey);
                fetchEntityHistory(entityId, duration).then(data => {
                    historyCache.set(cacheKey, { data, timestamp: Date.now() });
                    fetchInProgress.delete(cacheKey);
                    // Trigger re-render
                    emit(EVENTS.WIDGET_UPDATED, widget.id);
                }).catch(() => {
                    fetchInProgress.delete(cacheKey);
                });
            }
        }
    }

    // Calculate effective min/max for axis labels if auto-scaling
    let effectiveMin = minVal;
    let effectiveMax = maxVal;
    if (historyData && historyData.length > 0 && (isNaN(minVal) || isNaN(maxVal))) {
        const vals = historyData.map(d => parseFloat(d.state)).filter(v => !isNaN(v));
        if (vals.length > 0) {
            effectiveMin = Math.min(...vals);
            effectiveMax = Math.max(...vals);
            const pad = (effectiveMax - effectiveMin) * 0.1 || 1.0;
            effectiveMin -= pad;
            effectiveMax += pad;
        }
    }
    if (isNaN(effectiveMin)) effectiveMin = 0;
    if (isNaN(effectiveMax)) effectiveMax = 100;

    const points = generateHistoricalDataPoints(widget.width, widget.height, effectiveMin, effectiveMax, historyData, props.duration);

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
        // Important: We need the artboard, not the global canvas.
        // This ensures labels zoom/pan with the graph.
        const widgetEl = el;
        const artboard = widgetEl.closest('.artboard');
        if (artboard) {
            drawSmartAxisLabels(artboard, widget.x, widget.y, widget.width, widget.height, effectiveMin, effectiveMax, props.duration, widgetId, isDark ? "#ffffff" : "#666666");
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
        label.style.backgroundColor = bgColor === "black" ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.7)";
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
        label.style.color = isDark ? "#ccc" : "#999";
        label.style.backgroundColor = bgColor === "black" ? "rgba(0,0,0,0.8)" : "rgba(255,255,255,0.8)";
        label.style.padding = "2px 6px";
        label.textContent = "graph (No Entity)";
        el.appendChild(label);
    }
};

const exportLVGL = (w, { common, convertColor }) => {
    const p = w.props || {};
    const entityId = (w.entity_id || "").replace(/[^a-zA-Z0-9_]/g, "_");
    const chartId = `chart_${w.id}`.replace(/-/g, "_");

    const chart = {
        ...common,
        id: chartId,
        type: "LINE",
        duration: p.duration || "1h",
        bg_color: convertColor(p.background_color || (p.bg_color || "white")),
        series: [
            {
                sensor: entityId,
                color: convertColor(p.color || "black"),
                width: p.line_thickness || 2
            }
        ],
        y_min: p.min_value || 0,
        y_max: p.max_value || 100
    };

    // If using history, we indicate it so the LVGL generator can potentially handle it
    // or we can add a custom attribute for later processing.
    if (p.use_ha_history) {
        chart.use_ha_history = true;
    }

    return {
        lv_chart: chart
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
    const backgroundProp = p.background_color || "transparent";
    const bgColor = backgroundProp !== "transparent" ? getColorConst(backgroundProp) : null;
    const colorProp = p.color || "theme_auto";
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

    lines.push(`        // widget:graph id:${w.id} type:graph x:${w.x} y:${w.y} w:${w.width} h:${w.height} title:"${title}" entity:${entityId} local:${!!p.is_local_sensor} duration:${duration} border:${borderEnabled} color:${colorProp} background:${backgroundProp} x_grid:${xGrid} y_grid:${yGrid} line_type:${lineType} line_thickness:${lineThickness} continuous:${continuous} min_value:${minValue} max_value:${maxValue} min_range:${minRange} max_range:${maxRange} ${getCondProps(w)}`);

    const cond = getConditionCheck(w);
    if (cond) lines.push(`        ${cond}`);

    if (bgColor) {
        lines.push(`        it.fill_rectangle(${w.x}, ${w.y}, ${w.width}, ${w.height}, ${bgColor});`);
    }

    if (entityId) {
        if (p.use_ha_history) {
            const histId = `hist_${w.id}`.replace(/-/g, "_");
            const points = p.history_points || 100;
            const useAutoScale = p.auto_scale !== false;

            lines.push(`        // Draw historical graph from global array ${histId}`);
            lines.push(`        {`);
            if (useAutoScale) {
                lines.push(`          float g_min = id(${histId}_min);`);
                lines.push(`          float g_max = id(${histId}_max);`);
                lines.push(`          // Add slight padding to scale`);
                lines.push(`          float g_pad = (g_max - g_min) * 0.05;`);
                lines.push(`          if (g_pad == 0) g_pad = 1.0;`);
                lines.push(`          g_min -= g_pad; g_max += g_pad;`);
                lines.push(`          float g_range = g_max - g_min;`);
            } else {
                lines.push(`          float g_min = ${minValue || "0"};`);
                lines.push(`          float g_max = ${maxValue || "100"};`);
                lines.push(`          float g_range = g_max - g_min;`);
            }
            lines.push(`          if (g_range == 0) g_range = 1.0;`);
            lines.push(`          for (int i = 0; i < ${points} - 1; i++) {`);
            lines.push(`            float val1 = id(${histId})[i];`);
            lines.push(`            float val2 = id(${histId})[i+1];`);
            lines.push(`            if (isnan(val1) || isnan(val2)) continue;`);
            lines.push(`            int x1 = ${w.x} + (i * ${w.width}) / (${points}-1);`);
            lines.push(`            int x2 = ${w.x} + ((i+1) * ${w.width}) / (${points}-1);`);
            lines.push(`            int y1 = ${w.y} + ${w.height} - (int)((val1 - g_min) / g_range * ${w.height});`);
            lines.push(`            int y2 = ${w.y} + ${w.height} - (int)((val2 - g_min) / g_range * ${w.height});`);
            lines.push(`            it.line(x1, y1, x2, y2, ${color});`);
            if (lineThickness > 1) {
                lines.push(`            it.line(x1, y1+1, x2, y2+1, ${color});`);
            }
            lines.push(`          }`);
            lines.push(`        }`);
        } else {
            lines.push(`        it.graph(${w.x}, ${w.y}, id(${safeId}));`);
        }

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

const onExportGlobals = (context) => {
    const { lines, widgets } = context;
    widgets.filter(w => w.type === 'graph' && w.props?.use_ha_history).forEach(w => {
        const histId = `hist_${w.id}`.replace(/-/g, "_");
        const points = w.props.history_points || 100;
        lines.push(`- id: ${histId}`);
        lines.push(`  type: float[${points}]`);
        if (w.props.auto_scale !== false) {
            lines.push(`- id: ${histId}_min`);
            lines.push(`  type: float`);
            lines.push(`  initial_value: '0'`);
            lines.push(`- id: ${histId}_max`);
            lines.push(`  type: float`);
            lines.push(`  initial_value: '100'`);
        }
    });
};

const onExportEsphome = (context) => {
    const { lines, widgets } = context;
    const hasHistoryGraph = widgets.some(w => w.type === 'graph' && w.props?.use_ha_history);
    if (hasHistoryGraph) {
        if (!lines.includes("<algorithm>")) lines.push("<algorithm>");
        if (!lines.includes("<cstdlib>")) lines.push("<cstdlib>");
        if (!lines.includes("<vector>")) lines.push("<vector>");
    }
};

const onExportTextSensors = (context) => {
    const { lines, widgets } = context;
    widgets.filter(w => w.type === 'graph' && w.props?.use_ha_history).forEach(w => {
        const p = w.props || {};
        const entityId = (w.entity_id || "").trim();
        if (!entityId) return;

        const histId = `hist_${w.id}`.replace(/-/g, "_");
        const points = p.history_points || 100;
        const attr = p.history_attribute || "history";

        lines.push(`- platform: homeassistant`);
        lines.push(`  entity_id: ${entityId}`);
        lines.push(`  id: ${histId}_fetcher`);
        lines.push(`  attribute: ${attr}`);
        lines.push(`  internal: true`);
        lines.push(`  on_value:`);
        lines.push(`    then:`);
        lines.push(`      - lambda: |-`);
        lines.push(`          std::string input = x;`);
        lines.push(`          if (input.empty()) return;`);
        lines.push(`          `);
        lines.push(`          std::vector<float> values;`);
        lines.push(`          `);
        lines.push(`          // Check if structured format (contains "value:")`);
        lines.push(`          if (input.find("value:") != std::string::npos || input.find("value :") != std::string::npos) {`);
        lines.push(`            // Lightweight parsing without regex to avoid compiler errors`);
        lines.push(`            size_t pos = 0;`);
        lines.push(`            while ((pos = input.find("value", pos)) != std::string::npos) {`);
        lines.push(`                size_t colon = input.find(':', pos);`);
        lines.push(`                if (colon == std::string::npos) break;`);
        lines.push(`                `);
        lines.push(`                // Parse number after colon`);
        lines.push(`                size_t val_start = colon + 1; `);
        lines.push(`                while (val_start < input.length() && (input[val_start] == ' ' || input[val_start] == '"' || input[val_start] == '\\'')) val_start++;`);
        lines.push(`                `);
        lines.push(`                if (val_start < input.length()) {`);
        lines.push(`                    char *end_ptr;`);
        lines.push(`                    float val = std::strtof(input.c_str() + val_start, &end_ptr);`);
        lines.push(`                    if (end_ptr != input.c_str() + val_start) {`);
        lines.push(`                        values.push_back(val);`);
        lines.push(`                    }`);
        lines.push(`                }`);
        lines.push(`                pos = colon + 1;`);
        lines.push(`            }`);
        lines.push(`          } else {`);
        lines.push(`            // Simple array format: [10, 11, 12] or ["10", "11"]`);
        lines.push(`            input.erase(std::remove(input.begin(), input.end(), '['), input.end());`);
        lines.push(`            input.erase(std::remove(input.begin(), input.end(), ']'), input.end());`);
        lines.push(`            input.erase(std::remove(input.begin(), input.end(), '"'), input.end());`);
        lines.push(`            input.erase(std::remove(input.begin(), input.end(), '\\''), input.end());`);
        lines.push(`            std::replace(input.begin(), input.end(), ',', ' ');`);
        lines.push(`            const char* ptr = input.c_str();`);
        lines.push(`            char* end;`);
        lines.push(`            while (*ptr) {`);
        lines.push(`                float val = std::strtof(ptr, &end);`);
        lines.push(`                if (ptr == end) {`);
        lines.push(`                    ptr++;`);
        lines.push(`                } else {`);
        lines.push(`                    values.push_back(val);`);
        lines.push(`                    ptr = end;`);
        lines.push(`                }`);
        lines.push(`            }`);
        lines.push(`          }`);
        lines.push(`          `);
        lines.push(`          // Populate global array`);
        lines.push(`          int idx = 0;`);
        if (p.auto_scale !== false) {
            lines.push(`          float min_v = 1e30, max_v = -1e30;`);
        }
        lines.push(`          for (float val : values) {`);
        lines.push(`            if (idx >= ${points}) break;`);
        lines.push(`            id(${histId})[idx++] = val;`);
        if (p.auto_scale !== false) {
            lines.push(`            if (val < min_v) min_v = val;`);
            lines.push(`            if (val > max_v) max_v = val;`);
        }
        lines.push(`          }`);
        if (p.auto_scale !== false) {
            lines.push(`          id(${histId}_min) = min_v;`);
            lines.push(`          id(${histId}_max) = max_v;`);
        }
        if (p.history_smoothing) {
            lines.push(`          // Simple moving average smoothing (window=3)`);
            lines.push(`          for (int i = 1; i < idx - 1; i++) {`);
            lines.push(`             id(${histId})[i] = (id(${histId})[i-1] + id(${histId})[i] + id(${histId})[i+1]) / 3.0;`);
            lines.push(`          }`);
        }
    });
};

const onExportNumericSensors = (context) => {
    const { widgets, isLvgl, pendingTriggers } = context;
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

        if (isLvgl && pendingTriggers) {
            if (!pendingTriggers.has(entityId)) {
                pendingTriggers.set(entityId, new Set());
            }
            pendingTriggers.get(entityId).add(`- lvgl.widget.refresh: ${w.id}`);
        }

        // We let the safety fix handle the sensor generation for HA entities.
        // It will deduplicate and merge triggers automatically.
    }
};

export default {
    id: "graph",
    name: "Graph / Chart",
    category: "Advanced",
    // CRITICAL ARCHITECTURAL NOTE: OEPL and OpenDisplay are excluded because this widget 
    // requires significant C++ logic/global arrays which are not yet supported 
    // in those modes.
    supportedModes: ['lvgl', 'direct'],
    defaults: {
        width: 205,
        height: 100,
        duration: "1h",
        border: true,
        grid: true,
        color: "theme_auto",
        background_color: "transparent",
        title: "",
        x_grid: "",
        y_grid: "",
        line_thickness: 3,
        line_type: "SOLID",
        continuous: true,
        min_value: "",
        max_value: "",
        min_range: "",
        max_range: "",
        use_ha_history: false,
        history_points: 100,
        history_attribute: "history",
        history_smoothing: false,
        auto_scale: true
    },
    render,
    exportLVGL,
    export: exportDoc,
    onExportComponents,
    onExportNumericSensors,
    onExportGlobals,
    onExportEsphome,
    onExportTextSensors
};

