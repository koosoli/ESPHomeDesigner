import { SNAP_DISTANCE } from './constants.js';
import { AppState } from './state.js';

export function clearSnapGuides(canvasInstance) {
    const guides = canvasInstance.canvas.querySelectorAll(".snap-guide");
    guides.forEach((g) => g.remove());
}

export function addSnapGuideVertical(canvasInstance, x) {
    const guide = document.createElement("div");
    guide.className = "snap-guide snap-guide-vertical";
    guide.style.left = `${x}px`;
    canvasInstance.canvas.appendChild(guide);
}

export function addSnapGuideHorizontal(canvasInstance, y) {
    const guide = document.createElement("div");
    guide.className = "snap-guide snap-guide-horizontal";
    guide.style.top = `${y}px`;
    canvasInstance.canvas.appendChild(guide);
}

export function getSnapLines(excludeWidgetId, dims) {
    const page = AppState.getCurrentPage();
    const vertical = [];
    const horizontal = [];

    vertical.push(0, dims.width / 2, dims.width);
    horizontal.push(0, dims.height / 2, dims.height);

    if (page && Array.isArray(page.widgets)) {
        for (const w of page.widgets) {
            if (!w || w.id === excludeWidgetId) continue;
            const left = w.x;
            const right = w.x + (w.width || 0);
            const top = w.y;
            const bottom = w.y + (w.height || 0);
            const cx = left + (w.width || 0) / 2;
            const cy = top + (w.height || 0) / 2;
            vertical.push(left, cx, right);
            horizontal.push(top, cy, bottom);
        }
    }

    return { vertical, horizontal };
}

export function applySnapToPosition(canvasInstance, widget, x, y, altKey, dims) {
    if (!AppState.snapEnabled || altKey) {
        clearSnapGuides(canvasInstance);
        return { x: Math.round(x), y: Math.round(y) };
    }

    const snapLines = getSnapLines(widget.id, dims);
    const w = widget.width || 0;
    const h = widget.height || 0;

    let snappedX = x;
    let snappedY = y;
    let snappedV = null;
    let snappedH = null;

    // Vertical Snap
    const vCandidates = [
        { val: x, apply: (line) => (snappedX = line) },
        { val: x + w / 2, apply: (line) => (snappedX = line - w / 2) },
        { val: x + w, apply: (line) => (snappedX = line - w) }
    ];

    let bestDeltaV = SNAP_DISTANCE + 1;
    for (const cand of vCandidates) {
        for (const line of snapLines.vertical) {
            const delta = Math.abs(cand.val - line);
            if (delta <= SNAP_DISTANCE && delta < bestDeltaV) {
                bestDeltaV = delta;
                snappedV = line;
                cand.apply(line);
            }
        }
    }

    // Horizontal Snap
    const hCandidates = [
        { val: y, apply: (line) => (snappedY = line) },
        { val: y + h / 2, apply: (line) => (snappedY = line - h / 2) },
        { val: y + h, apply: (line) => (snappedY = line - h) }
    ];

    let bestDeltaH = SNAP_DISTANCE + 1;
    for (const cand of hCandidates) {
        for (const line of snapLines.horizontal) {
            const delta = Math.abs(cand.val - line);
            if (delta <= SNAP_DISTANCE && delta < bestDeltaH) {
                bestDeltaH = delta;
                snappedH = line;
                cand.apply(line);
            }
        }
    }

    // Clamp to canvas
    snappedX = Math.max(0, Math.min(dims.width - w, snappedX));
    snappedY = Math.max(0, Math.min(dims.height - h, snappedY));

    clearSnapGuides(canvasInstance);
    if (snappedV != null) addSnapGuideVertical(canvasInstance, snappedV);
    if (snappedH != null) addSnapGuideHorizontal(canvasInstance, snappedH);

    return {
        x: Math.round(snappedX),
        y: Math.round(snappedY)
    };
}

export function snapToGridCell(x, y, widgetWidth, widgetHeight, layout, dims) {
    const match = layout.match(/^(\d+)x(\d+)$/);
    if (!match) return { x, y };

    const rows = parseInt(match[1], 10);
    const cols = parseInt(match[2], 10);
    const cellWidth = dims.width / cols;
    const cellHeight = dims.height / rows;

    // Snap to nearest cell boundary based on widget center
    const centerX = x + widgetWidth / 2;
    const centerY = y + widgetHeight / 2;

    const col = Math.round(centerX / cellWidth - 0.5);
    const row = Math.round(centerY / cellHeight - 0.5);

    // Clamp to valid range
    const clampedCol = Math.max(0, Math.min(cols - 1, col));
    const clampedRow = Math.max(0, Math.min(rows - 1, row));

    return {
        x: Math.round(clampedCol * cellWidth),
        y: Math.round(clampedRow * cellHeight)
    };
}

export function updateWidgetGridCell(widgetId) {
    const page = AppState.getCurrentPage();
    if (!page || !page.layout) return;

    const match = page.layout.match(/^(\d+)x(\d+)$/);
    if (!match) return;

    const widget = AppState.getWidgetById(widgetId);
    if (!widget) return;

    const rows = parseInt(match[1], 10);
    const cols = parseInt(match[2], 10);
    const dims = AppState.getCanvasDimensions();
    const cellWidth = dims.width / cols;
    const cellHeight = dims.height / rows;

    // Calculate cell based on widget center
    const centerX = widget.x + widget.width / 2;
    const centerY = widget.y + widget.height / 2;

    const col = Math.floor(centerX / cellWidth);
    const row = Math.floor(centerY / cellHeight);

    // Clamp to valid range
    const clampedRow = Math.max(0, Math.min(rows - 1, row));
    const clampedCol = Math.max(0, Math.min(cols - 1, col));

    // Update widget props with detected grid position
    const newProps = {
        ...widget.props,
        grid_cell_row_pos: clampedRow,
        grid_cell_column_pos: clampedCol
    };

    // Also detect span based on widget size
    const rowSpan = Math.max(1, Math.round(widget.height / cellHeight));
    const colSpan = Math.max(1, Math.round(widget.width / cellWidth));
    newProps.grid_cell_row_span = rowSpan;
    newProps.grid_cell_column_span = colSpan;

    AppState.updateWidget(widgetId, { props: newProps });
}

export function forceSnapWidget(widgetId) {
    const widget = AppState.getWidgetById(widgetId);
    if (!widget) return;

    const dims = AppState.getCanvasDimensions();
    const page = AppState.getCurrentPage();
    let snapped;

    if (page?.layout) {
        snapped = snapToGridCell(widget.x, widget.y, widget.width, widget.height, page.layout, dims);
    } else {
        // Use applySnapToPosition but force it even if snap is disabled globally
        // We temporarily set snapEnabled to true to get the snapped position
        const oldSnap = AppState.snapEnabled;
        AppState.snapEnabled = true;
        snapped = applySnapToPosition({ canvas: { querySelectorAll: () => [] }, canvasContainer: {} }, widget, widget.x, widget.y, false, dims);
        AppState.snapEnabled = oldSnap;
    }

    if (snapped) {
        AppState.updateWidget(widgetId, { x: snapped.x, y: snapped.y });
        updateWidgetGridCell(widgetId);
        AppState.recordHistory();
    }
}
