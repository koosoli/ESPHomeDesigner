// @ts-check

import { AppState } from '../state';
import { snapToGridCell, applySnapToPosition, clearSnapGuides, snapResizeValue } from '../canvas_snap.js';
import { updateWidgetDOM } from '../canvas_renderer.js';
import { updateDragGhostPosition, updatePageDragGhost } from './drag_ghost.js';

/**
 * @param {MouseEvent} ev
 * @param {any} canvasInstance
 */
export function onMouseMove(ev, canvasInstance) {
    const zoom = AppState.zoomLevel;
    const dims = AppState.getCanvasDimensions();

    if (canvasInstance.dragState) {
        if (canvasInstance.dragState.mode === "move") {
            const currentArtboardEl = /** @type {HTMLElement|null} */ (document.querySelector(`.artboard[data-index="${AppState.currentPageIndex}"]`));
            if (!currentArtboardEl) return;

            const mouseDx = (ev.clientX - canvasInstance.dragState.dragStartX) / zoom + (canvasInstance.dragState.dragStartPanX - canvasInstance.panX) / zoom;
            const mouseDy = (ev.clientY - canvasInstance.dragState.dragStartY) / zoom + (canvasInstance.dragState.dragStartPanY - canvasInstance.panY) / zoom;

            const primaryWidget = AppState.getWidgetById(canvasInstance.dragState.id);
            if (!primaryWidget) return;

            /** @type {any[]} */
            const dragWidgets = canvasInstance.dragState.widgets;
            const primaryOffset = dragWidgets.find((w) => w.id === canvasInstance.dragState.id);
            if (!primaryOffset) return;

            let targetX = primaryOffset.startX + mouseDx;
            let targetY = primaryOffset.startY + mouseDy;

            const page = AppState.getCurrentPage();
            if (page?.layout && !ev.altKey) {
                clearSnapGuides();
                const snappedToGrid = snapToGridCell(targetX, targetY, primaryWidget.width, primaryWidget.height, page.layout, dims);
                targetX = snappedToGrid.x;
                targetY = snappedToGrid.y;
            } else if (AppState.snapEnabled && !ev.altKey) {
                const snapped = applySnapToPosition(canvasInstance, primaryWidget, targetX, targetY, ev.altKey, dims, currentArtboardEl, ev.ctrlKey);
                targetX = snapped.x;
                targetY = snapped.y;
            } else {
                clearSnapGuides();
            }

            const artboardRect = currentArtboardEl.getBoundingClientRect();
            const ghostScreenX = artboardRect.left + (targetX * zoom);
            const ghostScreenY = artboardRect.top + (targetY * zoom);
            updateDragGhostPosition(canvasInstance, ghostScreenX, ghostScreenY);

            const dx = targetX - primaryOffset.startX;
            const dy = targetY - primaryOffset.startY;

            for (const wInfo of dragWidgets) {
                const widget = AppState.getWidgetById(wInfo.id);
                if (widget && !widget.locked) {
                    widget.x = wInfo.startX + dx;
                    widget.y = wInfo.startY + dy;

                    if (widget.type === 'group') {
                        /** @type {any[]} */
                        const pageWidgets = page.widgets || [];
                        const children = pageWidgets.filter((w) => w.parentId === widget.id);
                        children.forEach((child) => {
                            if (!dragWidgets.find((sw) => sw.id === child.id)) {
                                child.x += dx - (canvasInstance.dragState.lastDx || 0);
                                child.y += dy - (canvasInstance.dragState.lastDy || 0);
                            }
                        });
                    }
                }
            }
            canvasInstance.dragState.lastDx = dx;
            canvasInstance.dragState.lastDy = dy;

            if (canvasInstance.rulers) {
                canvasInstance.rulers.setIndicators({
                    x: targetX, y: targetY, w: primaryWidget.width, h: primaryWidget.height
                });
            }
        } else if (canvasInstance.dragState.mode === "resize") {
            const widget = AppState.getWidgetById(canvasInstance.dragState.id);
            if (!widget) return;
            clearSnapGuides();

            const ds = canvasInstance.dragState;
            const handle = ds.handle;
            const panDx = (ds.dragStartPanX - canvasInstance.panX) / zoom;
            const panDy = (ds.dragStartPanY - canvasInstance.panY) / zoom;
            const dx = (ev.clientX - ds.startX) / zoom + panDx;
            const dy = (ev.clientY - ds.startY) / zoom + panDy;

            let newX = ds.startWidgetX;
            let newY = ds.startWidgetY;
            let newW = ds.startW;
            let newH = ds.startH;

            if (handle.includes('l')) {
                const rawLeft = ds.startWidgetX + dx;
                const snappedLeft = snapResizeValue(rawLeft, 'v', widget.id, ev.altKey, dims, ds.artboardEl);
                newX = snappedLeft;
                newW = (ds.startWidgetX + ds.startW) - newX;
            } else if (handle.includes('r')) {
                const rawRight = ds.startWidgetX + ds.startW + dx;
                const snappedRight = snapResizeValue(rawRight, 'v', widget.id, ev.altKey, dims, ds.artboardEl);
                newW = snappedRight - ds.startWidgetX;
            }

            if (handle.includes('t')) {
                const rawTop = ds.startWidgetY + dy;
                const snappedTop = snapResizeValue(rawTop, 'h', widget.id, ev.altKey, dims, ds.artboardEl);
                newY = snappedTop;
                newH = (ds.startWidgetY + ds.startH) - newY;
            } else if (handle.includes('b')) {
                const rawBottom = ds.startWidgetY + ds.startH + dy;
                const snappedBottom = snapResizeValue(rawBottom, 'h', widget.id, ev.altKey, dims, ds.artboardEl);
                newH = snappedBottom - ds.startWidgetY;
            }

            const minSize = 4;
            if (isNaN(newW)) newW = ds.startW;
            if (isNaN(newH)) newH = ds.startH;

            if (newW < minSize) {
                if (handle.includes('l')) newX = ds.startWidgetX + ds.startW - minSize;
                newW = minSize;
            }
            if (newH < minSize) {
                if (handle.includes('t')) newY = ds.startWidgetY + ds.startH - minSize;
                newH = minSize;
            }

            const wtype = (widget.type || "").toLowerCase();

            if (wtype === "line" || wtype === "lvgl_line") {
                const props = widget.props || {};
                const orientation = props.orientation || "horizontal";
                const strokeWidth = parseInt(props.stroke_width || props.line_width || 3, 10);

                if (orientation === "vertical") {
                    newW = strokeWidth;
                    newH = Math.max(10, newH);
                } else {
                    newH = strokeWidth;
                    newW = Math.max(10, newW);
                }
            }

            newX = Math.max(0, Math.min(dims.width - newW, newX));
            newY = Math.max(0, Math.min(dims.height - newH, newY));

            widget.x = Math.round(newX);
            widget.y = Math.round(newY);
            widget.width = Math.round(newW);
            widget.height = Math.round(newH);

            if (wtype === "icon" || wtype === "weather_icon" || wtype === "battery_icon" || wtype === "wifi_signal" || wtype === "ondevice_temperature" || wtype === "ondevice_humidity") {
                const props = widget.props || {};
                if (props.fit_icon_to_frame) {
                    const padding = 4;
                    const maxDim = Math.max(8, Math.min(widget.width - padding * 2, widget.height - padding * 2));
                    props.size = Math.round(maxDim);
                } else {
                    const newSize = Math.max(8, Math.min(widget.width, widget.height));
                    props.size = Math.round(newSize);
                }
            } else if (wtype === "shape_circle") {
                const size = Math.max(widget.width, widget.height);
                widget.width = size;
                widget.height = size;
            }

            updateWidgetDOM(canvasInstance, widget);
            if (canvasInstance.rulers) {
                canvasInstance.rulers.setIndicators({
                    x: widget.x, y: widget.y, w: widget.width, h: widget.height
                });
            }
        } else if (canvasInstance.dragState.mode === "reorder-page") {
            updatePageDragGhost(canvasInstance, ev.clientX, ev.clientY);
            document.querySelectorAll('.artboard-wrapper').forEach(el => el.classList.remove('drag-over'));
            const targetEl = document.elementFromPoint(ev.clientX, ev.clientY);
            const targetWrapper = targetEl instanceof HTMLElement ? targetEl.closest('.artboard-wrapper') : null;
            if (targetWrapper instanceof HTMLElement && parseInt(targetWrapper.dataset.index || "-1", 10) !== canvasInstance.dragState.pageIndex) {
                targetWrapper.classList.add('drag-over');
            }
        }
    } else if (canvasInstance.lassoState) {
        const artboardEl = canvasInstance.lassoState.artboardEl;
        if (!artboardEl) return;
        const rect = artboardEl.getBoundingClientRect();
        const currentX = (ev.clientX - rect.left) / zoom;
        const currentY = (ev.clientY - rect.top) / zoom;

        const x = Math.min(canvasInstance.lassoState.startX, currentX);
        const y = Math.min(canvasInstance.lassoState.startY, currentY);
        const w = Math.abs(currentX - canvasInstance.lassoState.startX);
        const h = Math.abs(currentY - canvasInstance.lassoState.startY);

        canvasInstance.lassoState.rect = { x, y, w, h };

        if (canvasInstance.lassoEl) {
            canvasInstance.lassoEl.style.left = x + "px";
            canvasInstance.lassoEl.style.top = y + "px";
            canvasInstance.lassoEl.style.width = w + "px";
            canvasInstance.lassoEl.style.height = h + "px";
        }

        const page = AppState.getCurrentPage();
        if (page) {
            const currentSelection = new Set(canvasInstance.lassoState.isAdditive ? canvasInstance.lassoState.initialSelection : []);
            canvasInstance.lassoState.currentSelection = [];

            const lassoRect = { x1: x, y1: y, x2: x + w, y2: y + h };

            for (const widget of page.widgets) {
                const widgetRect = {
                    x1: widget.x,
                    y1: widget.y,
                    x2: widget.x + widget.width,
                    y2: widget.y + widget.height
                };

                const intersects = !(widgetRect.x2 < lassoRect.x1 ||
                    widgetRect.x1 > lassoRect.x2 ||
                    widgetRect.y2 < lassoRect.y1 ||
                    widgetRect.y1 > lassoRect.y2);

                const el = canvasInstance.canvas.querySelector(`.widget[data-id="${widget.id}"]`);
                if (el) {
                    if (intersects) {
                        el.classList.add("active");
                        currentSelection.add(widget.id);
                    } else if (canvasInstance.lassoState.isAdditive && canvasInstance.lassoState.initialSelection.includes(widget.id)) {
                        el.classList.add("active");
                    } else {
                        el.classList.remove("active");
                    }
                }
            }
            canvasInstance.lassoState.currentSelection = Array.from(currentSelection);
            AppState.selectWidgets(canvasInstance.lassoState.currentSelection);
        }

        ev.preventDefault();
        ev.stopPropagation();
    }
}
