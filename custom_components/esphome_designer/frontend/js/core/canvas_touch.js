// @ts-check
import { AppState } from './state';
import { emit, EVENTS } from './events.js';
import { snapToGridCell, applySnapToPosition, clearSnapGuides } from './canvas_snap.js';
import { render, applyZoom, focusPage } from './canvas_renderer.js';
import { Logger } from '../utils/logger.js';
import { radialMenu } from '../ui/radial_menu.js';

/**
 * @param {import('./canvas').Canvas} canvasInstance
 */
export function setupTouchInteractions(canvasInstance) {
    if (!canvasInstance.canvas || !canvasInstance.canvasContainer) return;

    // Bound functions for clean listener removal
    canvasInstance._boundTouchMove = (ev) => onTouchMove(ev, canvasInstance);
    canvasInstance._boundTouchEnd = (ev) => onTouchEnd(ev, canvasInstance);

    canvasInstance.canvas.addEventListener("touchstart", (ev) => {
        const touches = ev.touches;
        const rect = canvasInstance.viewport.getBoundingClientRect();

        // Lock page scrolling during active interaction
        document.body.classList.add("interaction-active");
        ev.stopImmediatePropagation();

        if (touches.length === 2) {
            ev.preventDefault();

            const clientCX = (touches[0].clientX + touches[1].clientX) / 2;
            const clientCY = (touches[0].clientY + touches[1].clientY) / 2;

            canvasInstance.pinchState = {
                startDistance: getTouchDistance(touches[0], touches[1]),
                startZoom: AppState.zoomLevel,
                startPanX: canvasInstance.panX,
                startPanY: canvasInstance.panY,
                startCenterX: clientCX - rect.left,
                startCenterY: clientCY - rect.top
            };
            canvasInstance.touchState = null;

            window.addEventListener("touchmove", canvasInstance._boundTouchMove, { passive: false });
            window.addEventListener("touchend", canvasInstance._boundTouchEnd);
            window.addEventListener("touchcancel", canvasInstance._boundTouchEnd);
            return;
        }

        if (touches.length === 1) {
            const touch = touches[0];
            const hTarget = /** @type {HTMLElement} */(touch.target);
            const widgetEl = hTarget.closest(".widget");
            const widgetId = (widgetEl instanceof HTMLElement) ? widgetEl.dataset.id : null;
            
            if (canvasInstance.longPressTimer) clearTimeout(canvasInstance.longPressTimer);
            canvasInstance.longPressTimer = setTimeout(() => {
                if (radialMenu) {
                    radialMenu.show(touch.clientX, touch.clientY, widgetId);
                }
                canvasInstance.touchState = null;
            }, 500);

            if (ev.target instanceof HTMLElement && ev.target.classList.contains("canvas-viewport")) {
                // Touch started directly on the canvas viewport, not a widget.
                // This might be for panning or general canvas interaction.
                // The existing 'else' block below handles this, so we can just let it fall through.
            } else if (ev.target instanceof HTMLElement) {
                const item = ev.target.closest(".item[data-widget-type]");
                if (item) {
                    const type = item.getAttribute("data-widget-type");
                    Logger.log("[CanvasTouch] Touch start on palette item:", type);
                    return; // Do not handle palette item touches as canvas interactions
                }
            }

            if (widgetEl) {
                ev.preventDefault();
                const widget = AppState.getWidgetById(widgetId);
                if (!widget) return;

                const hTarget = /** @type {HTMLElement} */(touch.target);
                const isResizeHandle = hTarget.classList.contains("widget-resize-handle");

                if (isResizeHandle) {
                    canvasInstance.touchState = {
                        mode: "resize",
                        id: widgetId,
                        startX: touch.clientX,
                        startY: touch.clientY,
                        startW: widget.width,
                        startH: widget.height,
                        el: widgetEl
                    };
                } else {
                    canvasInstance.touchState = {
                        mode: "move",
                        id: widgetId,
                        startTouchX: touch.clientX,
                        startTouchY: touch.clientY,
                        startWidgetX: widget.x,
                        startWidgetY: widget.y,
                        hasMoved: false,
                        el: widgetEl
                    };
                }
            } else {
                ev.preventDefault();
                canvasInstance.touchState = {
                    mode: "pan",
                    startTouchX: touch.clientX,
                    startTouchY: touch.clientY,
                    startX: touch.clientX,
                    startY: touch.clientY,
                    startPanX: canvasInstance.panX,
                    startPanY: canvasInstance.panY
                };
            }

            window.addEventListener("touchmove", canvasInstance._boundTouchMove, { passive: false });
            window.addEventListener("touchend", canvasInstance._boundTouchEnd);
            window.addEventListener("touchcancel", canvasInstance._boundTouchEnd);
        }
    }, { passive: false });
}

/**
 * @param {TouchEvent} ev
 * @param {import('./canvas').Canvas} canvasInstance
 */
function onTouchMove(ev, canvasInstance) {
    const touches = ev.touches;
    const rect = canvasInstance.viewport.getBoundingClientRect();
    if (canvasInstance.pinchState && touches.length === 2) {
        ev.preventDefault();
        const currentDistance = getTouchDistance(touches[0], touches[1]);
        const scale = currentDistance / canvasInstance.pinchState.startDistance;
        const newZoom = Math.max(0.1, Math.min(10, canvasInstance.pinchState.startZoom * scale));

        const currentCX = ((touches[0].clientX + touches[1].clientX) / 2) - rect.left;
        const currentCY = ((touches[0].clientY + touches[1].clientY) / 2) - rect.top;

        const pivotX = (canvasInstance.pinchState.startCenterX - canvasInstance.pinchState.startPanX) / canvasInstance.pinchState.startZoom;
        const pivotY = (canvasInstance.pinchState.startCenterY - canvasInstance.pinchState.startPanY) / canvasInstance.pinchState.startZoom;

        canvasInstance.panX = currentCX - (pivotX * newZoom);
        canvasInstance.panY = currentCY - (pivotY * newZoom);

        AppState.setZoomLevel(newZoom);
        applyZoom(canvasInstance);
        return;
    }

    if (touches.length === 1 && canvasInstance.longPressTimer) {
        const touch = touches[0];
        const state = canvasInstance.touchState;
        const startX = state?.startTouchX ?? state?.startX ?? touch.clientX;
        const startY = state?.startTouchY ?? state?.startY ?? touch.clientY;

        if (Math.hypot(touch.clientX - startX, touch.clientY - startY) > 10) {
            clearTimeout(canvasInstance.longPressTimer);
            canvasInstance.longPressTimer = null;
        }
    }

    if (canvasInstance.touchState && touches.length === 1) {
        ev.preventDefault();
        const touch = touches[0];

        if (canvasInstance.touchState.mode === "pan") {
            const dx = touch.clientX - canvasInstance.touchState.startTouchX;
            const dy = touch.clientY - canvasInstance.touchState.startTouchY;
            canvasInstance.panX = canvasInstance.touchState.startPanX + dx;
            canvasInstance.panY = canvasInstance.touchState.startPanY + dy;
            applyZoom(canvasInstance);
        } else if (canvasInstance.touchState.mode === "move") {
            const dx = touch.clientX - canvasInstance.touchState.startTouchX;
            const dy = touch.clientY - canvasInstance.touchState.startTouchY;

            if (!canvasInstance.touchState.hasMoved && Math.hypot(dx, dy) < 5) return;
            canvasInstance.touchState.hasMoved = true;

            const widget = AppState.getWidgetById(canvasInstance.touchState.id);
            if (!widget) return;

            const dims = AppState.getCanvasDimensions();
            const zoom = AppState.zoomLevel;

            let x = canvasInstance.touchState.startWidgetX + dx / zoom;
            let y = canvasInstance.touchState.startWidgetY + dy / zoom;

            x = Math.max(0, Math.min(dims.width - widget.width, x));
            y = Math.max(0, Math.min(dims.height - widget.height, y));

            widget.x = x;
            widget.y = y;

            if (canvasInstance.touchState.el) {
                canvasInstance.touchState.el.style.left = x + "px";
                canvasInstance.touchState.el.style.top = y + "px";
            }
        } else if (canvasInstance.touchState.mode === "resize") {
            canvasInstance.touchState.hasMoved = true;
            const widget = AppState.getWidgetById(canvasInstance.touchState.id);
            if (!widget) return;

            const dims = AppState.getCanvasDimensions();
            const zoom = AppState.zoomLevel;

            let w = canvasInstance.touchState.startW + (touch.clientX - canvasInstance.touchState.startX) / zoom;
            let h = canvasInstance.touchState.startH + (touch.clientY - canvasInstance.touchState.startY) / zoom;

            const minSize = 20;
            w = Math.max(minSize, Math.min(dims.width - widget.x, w));
            h = Math.max(minSize, Math.min(dims.height - widget.y, h));

            widget.width = w;
            widget.height = h;

            if (canvasInstance.touchState.el) {
                canvasInstance.touchState.el.style.width = w + "px";
                canvasInstance.touchState.el.style.height = h + "px";
            }
        }
    }
}

/**
 * @param {TouchEvent} ev
 * @param {import('./canvas').Canvas} canvasInstance
 */
function onTouchEnd(ev, canvasInstance) {
    const state = canvasInstance.touchState;
    const now = Date.now();

    if (state && ev.changedTouches.length > 0) {
        const touchX = ev.changedTouches[0].clientX;
        const touchY = ev.changedTouches[0].clientY;
        const moved = Math.hypot(touchX - (state.startTouchX || state.startX), touchY - (state.startTouchY || state.startY)) > 10;

        if (!moved) {
            if (!(ev.target instanceof HTMLElement)) return;
            const hTarget = /** @type {HTMLElement} */(ev.target);
            const item = hTarget.closest(".item[data-widget-type]");
            if (item) {
                const type = item.getAttribute("data-widget-type");
                Logger.log("[CanvasTouch] Touch end on palette item:", type);
                return; // Do not handle palette item touches as canvas interactions
            }

            const widgetEl = hTarget.closest(".widget");
            const widgetId = widgetEl instanceof HTMLElement ? widgetEl.dataset.id : null;

            if (widgetId === canvasInstance.lastWidgetTapId && (now - canvasInstance.lastWidgetTapTime < 350)) {
                if (radialMenu) {
                    radialMenu.show(touchX, touchY, widgetId);
                }
                canvasInstance.lastWidgetTapTime = 0;
            } else {
                canvasInstance.lastWidgetTapId = widgetId;
                canvasInstance.lastWidgetTapTime = now;
                AppState.selectWidget(widgetId);
            }
        } else {
            if (now - canvasInstance.lastCanvasTapTime < 350) {
                AppState.setZoomLevel(1.0);
                focusPage(canvasInstance, AppState.currentPageIndex, true);
                canvasInstance.lastCanvasTapTime = 0;
            } else {
                canvasInstance.lastCanvasTapTime = now;
                AppState.selectWidgets([]);
            }
        }
    }

    if (state.id && state.hasMoved) {
        const widget = AppState.getWidgetById(state.id);
        if (widget) {
            if (state.mode === "move") {
                const dims = AppState.getCanvasDimensions();
                const page = AppState.getCurrentPage();
                if (page?.layout) {
                    const snapped = snapToGridCell(widget.x, widget.y, widget.width, widget.height, page.layout, dims);
                    widget.x = snapped.x;
                    widget.y = snapped.y;
                } else {
                    const snapped = applySnapToPosition(canvasInstance, widget, widget.x, widget.y, false, dims);
                    widget.x = snapped.x;
                    widget.y = snapped.y;
                }
            }
            updateWidgetGridCell(state.id);
            AppState.recordHistory();
            emit(EVENTS.STATE_CHANGED);
        }
    }

    canvasInstance.touchState = null;
    canvasInstance.pinchState = null;
    if (canvasInstance.longPressTimer) {
        clearTimeout(canvasInstance.longPressTimer);
        canvasInstance.longPressTimer = null;
    }

    window.removeEventListener("touchmove", canvasInstance._boundTouchMove);
    window.removeEventListener("touchend", canvasInstance._boundTouchEnd);
    window.removeEventListener("touchcancel", canvasInstance._boundTouchEnd);

    document.body.classList.remove("interaction-active");

    render(canvasInstance);
    clearSnapGuides();
}

/**
 * @param {Touch} t1
 * @param {Touch} t2
 */
function getTouchDistance(t1, t2) {
    return Math.hypot(t2.clientX - t1.clientX, t2.clientY - t1.clientY);
}

/**
 * @param {string} widgetId
 */
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

    const centerX = widget.x + widget.width / 2;
    const centerY = widget.y + widget.height / 2;

    const col = Math.floor(centerX / cellWidth);
    const row = Math.floor(centerY / cellHeight);

    const clampedRow = Math.max(0, Math.min(rows - 1, row));
    const clampedCol = Math.max(0, Math.min(cols - 1, col));

    const newProps = {
        ...widget.props,
        grid_cell_row_pos: clampedRow,
        grid_cell_column_pos: clampedCol,
        grid_cell_row_span: Math.max(1, Math.round(widget.height / cellHeight)),
        grid_cell_column_span: Math.max(1, Math.round(widget.width / cellWidth))
    };

    AppState.updateWidget(widgetId, { props: newProps });
}
