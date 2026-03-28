// @ts-check

import { AppState } from '../state';
import { emit, EVENTS } from '../events.js';
import { clearSnapGuides, updateWidgetGridCell } from '../canvas_snap.js';
import { render, focusPage } from '../canvas_renderer.js';
import { removeDragGhost, removePageDragGhost } from './drag_ghost.js';
import { removeBrowserEventListener } from '../../utils/browser_runtime.js';

/**
 * @param {MouseEvent} ev
 * @param {any} canvasInstance
 */
export function onMouseUp(ev, canvasInstance) {
    if (canvasInstance.dragState) {
        const widgetId = canvasInstance.dragState.id;
        const dragMode = canvasInstance.dragState.mode;

        if (dragMode === "move") {
            const widgetEl = canvasInstance.canvas.querySelector(`.widget[data-id="${widgetId}"]`);
            const prevPointerEvents = widgetEl ? widgetEl.style.pointerEvents : "";
            if (widgetEl) widgetEl.style.pointerEvents = "none";

            const targetEl = document.elementFromPoint(ev.clientX, ev.clientY);
            if (widgetEl) widgetEl.style.pointerEvents = prevPointerEvents;

            const targetArtboard = targetEl?.closest(".artboard");
            const targetPlaceholder = targetEl?.closest(".add-page-placeholder");
            const sourcePageIndex = AppState.currentPageIndex;
            let targetPageIndex = -1;

            if (targetArtboard) {
                targetPageIndex = parseInt(/** @type {HTMLElement} */(targetArtboard).dataset.index || "0", 10);
            } else if (targetPlaceholder) {
                canvasInstance.suppressNextFocus = true;
                const pageCount = AppState.pages.length;
                const newPage = AppState.addPage(pageCount);
                if (newPage) targetPageIndex = pageCount;
            } else {
                const pageListItem = targetEl?.closest("#pageList .item");
                if (pageListItem) {
                    const pageListEl = document.getElementById("pageList");
                    if (!pageListEl) return;
                    const items = Array.from(pageListEl.querySelectorAll(".item"));
                    targetPageIndex = items.indexOf(pageListItem);
                }
            }

            if (targetPageIndex !== -1 && targetPageIndex !== sourcePageIndex) {
                /** @type {any[]} */
                const widgetsToMove = canvasInstance.dragState.widgets;
                if (targetPlaceholder) render(canvasInstance);

                const targetArtboardEl = canvasInstance.canvas.querySelector(`.artboard[data-index="${targetPageIndex}"]`);
                let moveCount = 0;

                removeBrowserEventListener("mousemove", canvasInstance._boundMouseMove);
                removeBrowserEventListener("mouseup", canvasInstance._boundMouseUp);
                removeDragGhost(canvasInstance);
                canvasInstance.dragState = null;
                clearSnapGuides();

                const targetRect = targetArtboardEl ? targetArtboardEl.getBoundingClientRect() : null;
                const zoom = AppState.zoomLevel;
                const dims = AppState.getCanvasDimensions();

                const allMovedIds = new Set(widgetsToMove.map((w) => w.id));
                const rootMovers = widgetsToMove.filter((wInfo) => {
                    const widget = AppState.getWidgetById(wInfo.id);
                    return !widget.parentId || !allMovedIds.has(widget.parentId);
                });

                rootMovers.forEach(widgetInfo => {
                    let dropX = widgetInfo.startX;
                    let dropY = widgetInfo.startY;

                    if (targetRect) {
                        const widget = AppState.getWidgetById(widgetInfo.id);
                        dropX = Math.round((ev.clientX - targetRect.left) / zoom - widgetInfo.clickOffsetX);
                        dropY = Math.round((ev.clientY - targetRect.top) / zoom - widgetInfo.clickOffsetY);
                        const widgetW = widget?.width || 50;
                        const widgetH = widget?.height || 50;
                        dropX = Math.max(0, Math.min(dims.width - widgetW, dropX));
                        dropY = Math.max(0, Math.min(dims.height - widgetH, dropY));
                    } else if (targetPlaceholder) {
                        dropX = 40;
                        dropY = 40;
                    }

                    if (AppState.moveWidgetToPage(widgetInfo.id, targetPageIndex, dropX, dropY)) {
                        moveCount++;
                    }
                });

                if (moveCount > 0) {
                    const droppedOntoPageList = !targetArtboard && !targetPlaceholder;
                    AppState.setCurrentPageIndex(targetPageIndex, { suppressFocus: !droppedOntoPageList });
                    render(canvasInstance);
                    return;
                }
            }
        } else if (dragMode === "reorder-page") {
            const sourceIndex = canvasInstance.dragState.pageIndex;
            const targetEl = document.elementFromPoint(ev.clientX, ev.clientY);
            const targetWrapper = targetEl?.closest('.artboard-wrapper');

            removePageDragGhost(canvasInstance, sourceIndex);
            document.querySelectorAll('.artboard-wrapper').forEach(el => el.classList.remove('drag-over'));

            if (targetWrapper) {
                const targetIndex = parseInt(/** @type {HTMLElement} */(targetWrapper).dataset.index || "0", 10);
                if (targetIndex !== sourceIndex) {
                    AppState.reorderPage(sourceIndex, targetIndex);
                }
            }
        }

        removeBrowserEventListener("mousemove", canvasInstance._boundMouseMove);
        removeBrowserEventListener("mouseup", canvasInstance._boundMouseUp);
        removeDragGhost(canvasInstance);

        const dims = AppState.getCanvasDimensions();
        /** @type {any[]} */
        const widgetsToClamp = canvasInstance.dragState?.widgets || [];
        widgetsToClamp.forEach((wInfo) => {
            const widget = AppState.getWidgetById(wInfo.id);
            if (widget && !widget.locked) {
                widget.x = Math.max(0, Math.min(dims.width - widget.width, widget.x));
                widget.y = Math.max(0, Math.min(dims.height - widget.height, widget.y));
            }
        });

        canvasInstance.dragState = null;
        if (canvasInstance.rulers) canvasInstance.rulers.setIndicators(null);
        clearSnapGuides();
        updateWidgetGridCell(widgetId);

        AppState.recordHistory();
        emit(EVENTS.STATE_CHANGED);
        render(canvasInstance);
    } else if (canvasInstance.lassoState) {
        removeBrowserEventListener("mousemove", canvasInstance._boundMouseMove);
        removeBrowserEventListener("mouseup", canvasInstance._boundMouseUp);

        const finalLassoState = canvasInstance.lassoState;

        if (canvasInstance.lassoEl) {
            canvasInstance.lassoEl.remove();
            canvasInstance.lassoEl = null;
        }

        canvasInstance.lassoState = null;

        if (finalLassoState.rect) {
            const finalSelection = finalLassoState.currentSelection || [];
            AppState.selectWidgets(finalSelection);
        } else {
            if (!finalLassoState.isAdditive) {
                AppState.selectWidgets([]);
            }
            if (finalLassoState.focusParams?.fitZoom) {
                focusPage(canvasInstance, AppState.currentPageIndex, true, true);
            }
        }

        render(canvasInstance);
        ev.preventDefault();
        ev.stopPropagation();
    }
}
