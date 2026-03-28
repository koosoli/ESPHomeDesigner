/** @typedef {Widget & { props?: Record<string, any>, entity_id?: string, title?: string }} GraphWidget */

/**
 * @param {GraphWidget} w
 * @param {Record<string, any>} context
 */
export const exportDoc = (w, context) => {
    const {
        lines, addFont, getColorConst, addDitherMask, getConditionCheck, isEpaper, sanitize
    } = context;

    const p = w.props || {};
    const entityId = (w.entity_id || "").trim();
    const title = sanitize(w.title || "");
    const duration = p.duration || "1h";
    const borderEnabled = p.border !== false;
    const backgroundProp = p.bg_color || p.background_color || "transparent";
    const bgColor = backgroundProp !== "transparent" ? getColorConst(backgroundProp) : null;
    const colorProp = p.color || "theme_auto";
    const color = getColorConst(colorProp);
    const lineThickness = parseInt(p.line_thickness || 3, 10);
    const minValue = p.min_value || "";
    const maxValue = p.max_value || "";

    const safeId = `graph_${w.id}`.replace(/-/g, "_");
    const fontId = addFont("Roboto", 400, 12);

    const gridEnabled = p.grid !== false;
    let xGrid = p.x_grid || "";
    let yGrid = p.y_grid || "";

    if (gridEnabled) {
        if (!xGrid) {
            const durationMatch = duration.match(/^(\d+(?:\.\d+)?)(min|h|d)$/);
            if (durationMatch) {
                const value = parseFloat(durationMatch[1]);
                const unit = durationMatch[2];
                const gridValue = value / 4;
                if (unit === "h") xGrid = gridValue >= 1 ? `${Math.round(gridValue)}h` : `${Math.round(gridValue * 60)}min`;
                else if (unit === "min") xGrid = `${Math.round(gridValue)}min`;
                else if (unit === "d") xGrid = `${Math.round(gridValue * 24)}h`;
            } else {
                xGrid = "1h";
            }
        }
        if (!yGrid) {
            const minY = parseFloat(minValue) || 0;
            const maxY = parseFloat(maxValue) || 100;
            const range = maxY - minY;
            const step = range / 4;
            const niceStep = Math.pow(10, Math.floor(Math.log10(step)));
            const normalized = step / niceStep;
            const yGridValue = normalized <= 1 ? niceStep : normalized <= 2 ? 2 * niceStep : normalized <= 5 ? 5 * niceStep : 10 * niceStep;
            yGrid = String(yGridValue);
        }
    }

    const cond = getConditionCheck(w);
    if (cond) lines.push(`        ${cond}`);

    if (bgColor) {
        lines.push(`        it.fill_rectangle(${w.x}, ${w.y}, ${w.width}, ${w.height}, ${bgColor});`);
    }

    if (entityId) {
        if (p.use_ha_history) {
            const histId = `hist_${w.id}`.replace(/-/g, "_");
            const useAutoScale = p.auto_scale !== false;

            lines.push(`        // Draw historical graph from global array ${histId}`);
            lines.push('        {');
            if (useAutoScale) {
                lines.push(`          float g_min = id(${histId}_min);`);
                lines.push(`          float g_max = id(${histId}_max);`);
                lines.push('          // Add slight padding to scale');
                lines.push('          float g_pad = (g_max - g_min) * 0.05;');
                lines.push('          if (g_pad == 0) g_pad = 1.0;');
                lines.push('          g_min -= g_pad; g_max += g_pad;');
                lines.push('          float g_range = g_max - g_min;');
            } else {
                lines.push(`          float g_min = ${minValue || "0"};`);
                lines.push(`          float g_max = ${maxValue || "100"};`);
                lines.push('          float g_range = g_max - g_min;');
            }
            lines.push('          if (g_range == 0) g_range = 1.0;');
            lines.push(`          int hist_count = id(${histId}_count);`);
            lines.push('          if (hist_count < 2) hist_count = 2;');
            lines.push('          for (int i = 0; i < hist_count - 1; i++) {');
            lines.push(`            float val1 = id(${histId})[i];`);
            lines.push(`            float val2 = id(${histId})[i+1];`);
            lines.push('            if (isnan(val1) || isnan(val2)) continue;');
            lines.push(`            int x1 = ${w.x} + (i * ${w.width}) / (hist_count - 1);`);
            lines.push(`            int x2 = ${w.x} + ((i + 1) * ${w.width}) / (hist_count - 1);`);
            lines.push(`            int y1 = ${w.y} + ${w.height} - (int)((val1 - g_min) / g_range * ${w.height});`);
            lines.push(`            int y2 = ${w.y} + ${w.height} - (int)((val2 - g_min) / g_range * ${w.height});`);
            lines.push(`            it.line(x1, y1, x2, y2, ${color});`);
            if (lineThickness > 1) {
                lines.push(`            it.line(x1, y1+1, x2, y2+1, ${color});`);
            }
            lines.push('          }');
            lines.push("");
            lines.push('          // Y-axis labels (Dynamic)');
            lines.push('          for (int i = 0; i <= 4; i++) {');
            lines.push('            float val = g_min + (g_range * i / 4.0);');
            lines.push(`            int yOffset = ${w.height} * (4 - i) / 4;`);
            lines.push('            const char* fmt = g_range >= 10 ? "%.0f" : "%.1f";');
            lines.push(`            it.printf(${w.x} - 4, ${w.y} + yOffset - 6, id(${fontId}), ${color}, TextAlign::TOP_RIGHT, fmt, val);`);
            lines.push('          }');
            lines.push('        }');
        } else {
            lines.push(`        it.graph(${w.x}, ${w.y}, id(${safeId}));`);
            lines.push("");

            if (p.auto_scale !== false && (!minValue && !maxValue)) {
                lines.push('        // [Designer] Graph is auto-scaled without HA History or static Min/Max bounds.');
                lines.push('        // Y-axis labels are omitted because the scale is unknown at compile time.');
            } else {
                lines.push('        // Y-axis labels (Static Reference)');
                const minY = parseFloat(minValue) || 0;
                const maxY = parseFloat(maxValue) || 100;
                const yRange = maxY - minY;
                const ySteps = 4;
                for (let index = 0; index <= ySteps; index += 1) {
                    const ratio = index / ySteps;
                    const value = minY + (yRange * ratio);
                    const yOffset = Math.round(w.height * (1 - ratio));
                    const valueFormat = yRange >= 10 ? "%.0f" : "%.1f";
                    lines.push(`        it.printf(${w.x} - 4, ${w.y} + ${yOffset} - 6, id(${fontId}), ${color}, TextAlign::TOP_RIGHT, "${valueFormat}", (float)${value});`);
                }
            }
        }

        const borderWidth = parseInt(p.border_width !== undefined ? p.border_width : (borderEnabled ? 2 : 0), 10);
        if (borderWidth > 0) {
            const borderColorProp = p.border_color || colorProp;
            const borderColorConst = getColorConst(borderColorProp);
            for (let index = 0; index < borderWidth; index += 1) {
                lines.push(`        it.rectangle(${w.x} + ${index}, ${w.y} + ${index}, ${w.width} - 2 * ${index}, ${w.height} - 2 * ${index}, ${borderColorConst});`);
            }
            addDitherMask(lines, colorProp, isEpaper, w.x, w.y, w.width, w.height);
        }

        if (yGrid) {
            const ySteps = 4;
            for (let index = 1; index < ySteps; index += 1) {
                const yOffset = Math.round(w.height * (index / ySteps));
                lines.push(`        for (int i = 0; i < ${w.width}; i += 4) {`);
                lines.push(`          it.draw_pixel_at(${w.x} + i, ${w.y + yOffset}, ${color});`);
                lines.push('        }');
            }
        }

        if (xGrid) {
            const xSteps = 4;
            for (let index = 1; index < xSteps; index += 1) {
                const xOffset = Math.round(w.width * (index / xSteps));
                lines.push(`        for (int i = 0; i < ${w.height}; i += 4) {`);
                lines.push(`          it.draw_pixel_at(${w.x + xOffset}, ${w.y} + i, ${color});`);
                lines.push('        }');
            }
        }

        if (title) {
            lines.push(`        it.printf(${w.x}+4, ${w.y}+2, id(${fontId}), ${color}, TextAlign::TOP_LEFT, "${title}");`);
        }

        let durationSec = 3600;
        const durationMatch = duration.match(/^(\d+)([a-z]+)$/i);
        if (durationMatch) {
            const value = parseInt(durationMatch[1], 10);
            const unit = durationMatch[2].toLowerCase();
            if (unit.startsWith("s")) durationSec = value;
            else if (unit.startsWith("m")) durationSec = value * 60;
            else if (unit.startsWith("h")) durationSec = value * 3600;
            else if (unit.startsWith("d")) durationSec = value * 86400;
        }

        const xLabelSteps = 2;
        for (let index = 0; index <= xLabelSteps; index += 1) {
            const ratio = index / xLabelSteps;
            const xOffset = Math.round(w.width * ratio);
            let align = "TextAlign::TOP_CENTER";
            if (index === 0) align = "TextAlign::TOP_LEFT";
            if (index === xLabelSteps) align = "TextAlign::TOP_RIGHT";

            let labelText = index === xLabelSteps ? "Now" : "";
            if (index !== xLabelSteps) {
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

    if (cond) lines.push('        }');
};
