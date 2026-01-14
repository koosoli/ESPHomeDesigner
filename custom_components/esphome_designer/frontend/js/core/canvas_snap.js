import { SNAP_DISTANCE } from './constants.js';
import { AppState } from './state.js';

export function clearSnapGuides() {
    // Search the entire document to ensure all guides are removed
    const guides = document.querySelectorAll(".snap-guide");
    guides.forEach((g) => g.remove());
}

export function addSnapGuideVertical(canvasInstance, x, artboardEl) {
    const parent = artboardEl || canvasInstance.canvas;
    if (!parent || typeof parent.appendChild !== 'function') return;
    const guide = document.createElement("div");
    guide.className = "snap-guide snap-guide-vertical";
    guide.style.left = `${Math.round(x)}px`;
    parent.appendChild(guide);
}

export function addSnapGuideHorizontal(canvasInstance, y, artboardEl) {
    const parent = artboardEl || canvasInstance.canvas;
    if (!parent || typeof parent.appendChild !== 'function') return;
    const guide = document.createElement("div");
    guide.className = "snap-guide snap-guide-horizontal";
    guide.style.top = `${Math.round(y)}px`;
    parent.appendChild(guide);
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

export function addDistanceMarker(canvasInstance, rectA, rectB, axis, artboardEl) {
    const parent = artboardEl || canvasInstance.canvas;
    if (!parent) return;

    const marker = document.createElement("div");
    marker.className = `snap-guide distance-marker distance-marker-${axis}`;

    let x, y, w, h, val;
    if (axis === 'h') {
        const left = Math.min(rectA.x + rectA.w, rectB.x + rectB.w);
        const right = Math.max(rectA.x, rectB.x);
        // Correct gap calculation: distance between the closer edges
        const x1 = rectA.x < rectB.x ? rectA.x + rectA.w : rectB.x + rectB.w;
        const x2 = rectA.x < rectB.x ? rectB.x : rectA.x;
        x = x1;
        y = Math.min(rectA.y + rectA.h / 2, rectB.y + rectB.h / 2);
        w = x2 - x1;
        if (w <= 0) return; // No gap
        val = Math.round(w);
        marker.style.left = `${x}px`;
        marker.style.top = `${y}px`;
        marker.style.width = `${w}px`;
        marker.style.height = `1px`;

        const tStart = document.createElement("div");
        tStart.className = "distance-marker-h-tick-start";
        const tEnd = document.createElement("div");
        tEnd.className = "distance-marker-h-tick-end";
        marker.appendChild(tStart);
        marker.appendChild(tEnd);
    } else {
        const y1 = rectA.y < rectB.y ? rectA.y + rectA.h : rectB.y + rectB.h;
        const y2 = rectA.y < rectB.y ? rectB.y : rectA.y;
        y = y1;
        x = Math.min(rectA.x + rectA.w / 2, rectB.x + rectB.w / 2);
        h = y2 - y1;
        if (h <= 0) return; // No gap
        val = Math.round(h);
        marker.style.left = `${x}px`;
        marker.style.top = `${y}px`;
        marker.style.width = `1px`;
        marker.style.height = `${h}px`;

        const tStart = document.createElement("div");
        tStart.className = "distance-marker-v-tick-start";
        const tEnd = document.createElement("div");
        tEnd.className = "distance-marker-v-tick-end";
        marker.appendChild(tStart);
        marker.appendChild(tEnd);
    }

    const label = document.createElement("div");
    label.className = "distance-marker-label";
    label.textContent = val;
    marker.appendChild(label);
    parent.appendChild(marker);
}

export function applySnapToPosition(canvasInstance, widget, x, y, altKey, dims, artboardEl, ctrlKey = false) {
    if (!AppState.snapEnabled || altKey) {
        clearSnapGuides();
        return { x: Math.round(x), y: Math.round(y) };
    }

    const page = AppState.getCurrentPage();
    const otherWidgets = (page?.widgets || []).filter(w => w.id !== widget.id && !w.hidden);
    const snapLines = getSnapLines(widget.id, dims);
    const w = widget.width || 0;
    const h = widget.height || 0;

    let snappedX = x;
    let snappedY = y;
    let snappedV = null;
    let snappedH = null;

    // 1. Standard Edge/Center Snapping
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

    // 2. Smart Spacing Detection (Gap Snapping)
    // Find closest horizontal neighbor to the left and right
    const myRect = { x: snappedX, y: snappedY, w, h };

    clearSnapGuides();
    if (snappedV != null) addSnapGuideVertical(canvasInstance, snappedV, artboardEl);
    if (snappedH != null) addSnapGuideHorizontal(canvasInstance, snappedH, artboardEl);

    // Show distances to neighbors if they are roughly aligned - ONLY IF CTRL IS PRESSED
    if (ctrlKey) {
        otherWidgets.forEach(other => {
            const otherRect = { x: other.x, y: other.y, w: other.width, h: other.height };

            // Horizontal distance
            const dominatesH = (myRect.y < otherRect.y + otherRect.h && myRect.y + myRect.h > otherRect.y);
            if (dominatesH) {
                const gap = myRect.x < otherRect.x ? otherRect.x - (myRect.x + myRect.w) : myRect.x - (otherRect.x + otherRect.w);
                if (gap > 0 && gap < 150) { // Only show if close enough
                    addDistanceMarker(canvasInstance, myRect, otherRect, 'h', artboardEl);
                }
            }

            // Vertical distance
            const dominatesV = (myRect.x < otherRect.x + otherRect.w && myRect.x + myRect.w > otherRect.x);
            if (dominatesV) {
                const gap = myRect.y < otherRect.y ? otherRect.y - (myRect.y + myRect.h) : myRect.y - (otherRect.y + otherRect.h);
                if (gap > 0 && gap < 150) {
                    addDistanceMarker(canvasInstance, myRect, otherRect, 'v', artboardEl);
                }
            }
        });
    }

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
