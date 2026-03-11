// @ts-check

import { AppState } from '../state';
import { radialMenu } from '../../ui/radial_menu.js';
import { emit, EVENTS } from '../events.js';
import { snapToGridCell, applySnapToPosition, clearSnapGuides, updateWidgetGridCell, snapResizeValue } from '../canvas_snap.js';
import { render, updateWidgetDOM, focusPage, } from '../canvas_renderer.js';
import { createDragGhost, updateDragGhost, updateDragGhostPosition, removeDragGhost, createPageDragGhost, updatePageDragGhost, removePageDragGhost } from './drag_ghost.js';
import { startInlineEdit } from './inline_edit.js';

export { createDragGhost, updateDragGhost, updateDragGhostPosition, removeDragGhost, createPageDragGhost, updatePageDragGhost, removePageDragGhost, startInlineEdit };

// Helper for manual double-click detection
let lastClickTime = 0;
let lastClickWidgetId = null;

// Tracking for background double-clicks (empty canvas)
let lastBackgroundClickTime = 0;
let lastBackgroundClickIndex = null;


/**
 * @param {any} canvasInstance
 */
export function setupInteractions(canvasInstance) {
    canvasInstance.canvas.addEventListener("mousedown", (/** @type {MouseEvent} */ ev) => {
        if (ev.button !== 0) return; // Only handle left-click for widgets

        clearSnapGuides(); // Clean up any stale guides immediately

        const target = /** @type {HTMLElement} */ (ev.target);
        const wrapperEl = target.closest(".artboard-wrapper");
        if (!wrapperEl || target.closest(".artboard-btn") || target.closest("button")) {
            // Clicked on stage background OR a button - release focus from inputs
            if (document.activeElement && !target.closest("button")) {
                /** @type {any} */ (document.activeElement).blur();
            }

            // If clicking strictly on the stage background (not a button), deselect everything
            if (!target.closest("button") && !target.closest(".artboard-btn")) {
                AppState.selectWidgets([]);
                render(canvasInstance);
            }
            return;
        }

        const pageIndex = parseInt(/** @type {HTMLElement} */(wrapperEl).dataset.index || "0", 10);
        const artboardEl = wrapperEl.querySelector(".artboard");
        let currentArtboardEl = artboardEl;
        const widgetEl = target.closest(".widget");
        let activeWidgetId = widgetEl instanceof HTMLElement ? widgetEl.dataset.id : undefined;

        // If switching pages OR clicking an empty area/header of the current page, focus it
        const isSwitching = AppState.currentPageIndex !== pageIndex;
        const isHeaderClick = !!target.closest(".artboard-header");
        const _isBackgroundClick = !!target.closest(".artboard") && !widgetEl;

        if (isSwitching) {
            // Store selection before switching
            const prevSelection = [...AppState.selectedWidgetIds];
            AppState.setCurrentPageIndex(pageIndex, { suppressFocus: true });

            // Re-apply selection if we were clicking a widget, otherwise it's cleared
            if (activeWidgetId) {
                AppState.selectWidgets(prevSelection.includes(activeWidgetId) ? prevSelection : [activeWidgetId]);
            }

            // Re-query artboard after potential re-render
            const newArtboard = canvasInstance.canvas.querySelector(`.artboard[data-index="${pageIndex}"]`);
            if (newArtboard) currentArtboardEl = newArtboard;
        } else if (isHeaderClick) {
            // INITIATE PAGE REORDERING
            canvasInstance.dragState = {
                mode: "reorder-page",
                pageIndex: pageIndex,
                startX: ev.clientX,
                startY: ev.clientY
            };
            createPageDragGhost(canvasInstance, pageIndex, ev.clientX, ev.clientY);

            window.addEventListener("mousemove", canvasInstance._boundMouseMove);
            window.addEventListener("mouseup", canvasInstance._boundMouseUp);
            ev.preventDefault();
            return;
        }

        const rect = currentArtboardEl.getBoundingClientRect();
        const zoom = AppState.zoomLevel;

        if (widgetEl instanceof HTMLElement) {
            const widgetId = widgetEl.dataset.id;
            const isMulti = ev.shiftKey || ev.ctrlKey;

            // Manual Double Click Detection
            const now = Date.now();
            if (widgetId === lastClickWidgetId && (now - lastClickTime < 300)) {
                startInlineEdit(canvasInstance, widgetId);
                lastClickTime = 0;
                lastClickWidgetId = null;
                ev.preventDefault();
                ev.stopPropagation();
                return;
            }
            lastClickTime = now;
            lastClickWidgetId = widgetId;

            if (isMulti) {
                AppState.selectWidget(widgetId, true);
            } else if (!AppState.selectedWidgetIds.includes(widgetId)) {
                AppState.selectWidget(widgetId, false);
            }

            const widget = AppState.getWidgetById(widgetId);
            if (!widget) return;

            // If this widget is part of a group, redirect interaction to the group parent
            // This ensures clicking/dragging any child moves the entire group
            let effectiveWidget = widget;
            let effectiveWidgetId = widgetId;
            if (widget.parentId) {
                const parentWidget = AppState.getWidgetById(widget.parentId);
                if (parentWidget) {
                    effectiveWidget = parentWidget;
                    effectiveWidgetId = parentWidget.id;
                    // Select the group instead of the child
                    AppState.selectWidget(effectiveWidgetId, isMulti);
                }
            }

            const isResizeHandle = target.classList.contains("widget-resize-handle");

            if (isResizeHandle) {
                // Block resizing for widgets that are part of a group
                if (widget.parentId) {
                    return;
                }
                if (effectiveWidget.locked) return;
                canvasInstance.dragState = {
                    mode: "resize",
                    handle: /** @type {HTMLElement} */(target).dataset.handle || 'br',
                    id: effectiveWidgetId,
                    startX: ev.clientX,
                    startY: ev.clientY,
                    startW: effectiveWidget.width,
                    startH: effectiveWidget.height,
                    startWidgetX: effectiveWidget.x,
                    startWidgetY: effectiveWidget.y,
                    artboardEl: currentArtboardEl,
                    dragStartPanX: canvasInstance.panX,
                    dragStartPanY: canvasInstance.panY
                };
            } else {
                if (effectiveWidget.locked) return;

                const selectedWidgets = AppState.getSelectedWidgets();
                const widgetOffsets = selectedWidgets.map(w => {
                    return {
                        id: w.id,
                        startX: w.x,
                        startY: w.y,
                        clickOffsetX: (ev.clientX - rect.left) / zoom - w.x,
                        clickOffsetY: (ev.clientY - rect.top) / zoom - w.y
                    };
                });

                canvasInstance.dragState = {
                    mode: "move",
                    id: effectiveWidgetId,
                    widgets: widgetOffsets,
                    artboardEl: currentArtboardEl,
                    dragStartX: ev.clientX,
                    dragStartY: ev.clientY,
                    dragStartPanX: canvasInstance.panX,
                    dragStartPanY: canvasInstance.panY
                };

                // Create floating drag ghost for smooth cross-page dragging
                createDragGhost(canvasInstance, selectedWidgets, ev.clientX, ev.clientY, zoom, widgetOffsets);

                if (canvasInstance.rulers) canvasInstance.rulers.setIndicators({
                    x: effectiveWidget.x, y: effectiveWidget.y, w: effectiveWidget.width, h: effectiveWidget.height
                });
            }

            window.addEventListener("mousemove", canvasInstance._boundMouseMove);
            window.addEventListener("mouseup", canvasInstance._boundMouseUp);
            ev.preventDefault();
        } else {
            // Clicked on artboard background - start lasso
            const startX = (ev.clientX - rect.left) / zoom;
            const startY = (ev.clientY - rect.top) / zoom;

            const now = Date.now();
            const isDoubleClick = (pageIndex === lastBackgroundClickIndex && (now - lastBackgroundClickTime < 300));
            lastBackgroundClickTime = now;
            lastBackgroundClickIndex = pageIndex;

            canvasInstance.lassoState = {
                startTime: now,
                isDoubleClick,
                // Only consider focal zoom if we switch pages OR it's a double click
                focusParams: (isDoubleClick || (isSwitching && !activeWidgetId)) ? { index: pageIndex, fitZoom: isDoubleClick } : null,
                startX,
                startY,
                rect: null,
                isAdditive: ev.shiftKey || ev.ctrlKey,
                initialSelection: [...AppState.selectedWidgetIds],
                artboardEl: currentArtboardEl
            };

            canvasInstance.lassoEl = document.createElement("div");
            canvasInstance.lassoEl.className = "lasso-selection";
            artboardEl.appendChild(canvasInstance.lassoEl);

            window.addEventListener("mousemove", canvasInstance._boundMouseMove);
            window.addEventListener("mouseup", canvasInstance._boundMouseUp);
            ev.preventDefault();
        }
    });

    canvasInstance.canvas.addEventListener("contextmenu", (/** @type {MouseEvent} */ ev) => {
        // Prevent context menu ONLY if we have actually moved or are in a multi-finger state
        if (canvasInstance.pinchState ||
            (canvasInstance.touchState?.hasMoved) ||
            (canvasInstance.dragState?.mode === "resize") ||
            (canvasInstance.lassoState?.rect)) {
            ev.preventDefault();
            return;
        }

        const currentTarget = /** @type {HTMLElement} */ (ev.target);
        const ctxWidgetEl = currentTarget.closest(".widget");
        const widgetId = ctxWidgetEl instanceof HTMLElement ? ctxWidgetEl.dataset.id : null;

        if (radialMenu) {
            radialMenu.show(ev.clientX, ev.clientY, widgetId || undefined);
        }
    });

    // --- DEBUG CURSOR TRACKER ---
    /** @type {HTMLElement | null} */
    let debugTooltip = document.querySelector(".debug-cursor-tooltip");
    if (!debugTooltip) {
        debugTooltip = document.createElement("div");
        debugTooltip.className = "debug-cursor-tooltip";
        document.body.appendChild(debugTooltip);
    }

    canvasInstance.canvas.addEventListener("mousemove", (/** @type {MouseEvent} */ ev) => {
        if (!AppState.showDebugGrid) {
            if (debugTooltip) debugTooltip.style.display = "none";
            return;
        }

        const artboard = /** @type {HTMLElement} */ (ev.target).closest(".artboard");
        if (!artboard) {
            if (debugTooltip) debugTooltip.style.display = "none";
            return;
        }

        const rect = artboard.getBoundingClientRect();
        const zoom = AppState.zoomLevel;
        const x = Math.round((ev.clientX - rect.left) / zoom);
        const y = Math.round((ev.clientY - rect.top) / zoom);

        if (debugTooltip) {
            debugTooltip.style.display = "block";
            debugTooltip.style.left = ev.clientX + "px";
            debugTooltip.style.top = ev.clientY + "px";
            debugTooltip.innerHTML = `<span>X:</span>${x} <span>Y:</span>${y}`;
        }
    });

    canvasInstance.canvas.addEventListener("mouseleave", () => {
        if (debugTooltip) debugTooltip.style.display = "none";
    });
}

/**
 * @param {MouseEvent} ev
 * @param {any} canvasInstance
 */
export function onMouseMove(ev, canvasInstance) {
    const zoom = AppState.zoomLevel;
    const dims = AppState.getCanvasDimensions();

    if (canvasInstance.dragState) {
        if (canvasInstance.dragState.mode === "move") {
            // Re-query artboard to ensure it's still valid/attached
            const currentArtboardEl = /** @type {HTMLElement|null} */ (document.querySelector(`.artboard[data-index="${AppState.currentPageIndex}"]`));
            if (!currentArtboardEl) return;

            // Delta-based calculation with Pan Compensation
            // This ensures the widget stays glued to the cursor even if the camera pans (focusPage)
            const mouseDx = (ev.clientX - canvasInstance.dragState.dragStartX) / zoom + (canvasInstance.dragState.dragStartPanX - canvasInstance.panX) / zoom;
            const mouseDy = (ev.clientY - canvasInstance.dragState.dragStartY) / zoom + (canvasInstance.dragState.dragStartPanY - canvasInstance.panY) / zoom;

            const primaryWidget = AppState.getWidgetById(canvasInstance.dragState.id);
            if (!primaryWidget) return;

            const primaryOffset = canvasInstance.dragState.widgets.find(w => w.id === canvasInstance.dragState.id);
            if (!primaryOffset) return;

            let targetX = primaryOffset.startX + mouseDx;
            let targetY = primaryOffset.startY + mouseDy;

            // Snap logic using the primary widget
            const page = AppState.getCurrentPage();
            if (page?.layout && !ev.altKey) {
                clearSnapGuides();
                const snappedToGrid = snapToGridCell(targetX, targetY, primaryWidget.width, primaryWidget.height, page.layout, dims);
                targetX = snappedToGrid.x;
                targetY = snappedToGrid.y;
            } else {
                // Determine if we should snap
                if (AppState.snapEnabled && !ev.altKey) {
                    const snapped = applySnapToPosition(canvasInstance, primaryWidget, targetX, targetY, ev.altKey, dims, currentArtboardEl, ev.ctrlKey);
                    targetX = snapped.x;
                    targetY = snapped.y;
                } else {
                    clearSnapGuides();
                }
            }

            // Update ghost position using SNAPPED position (not raw cursor)
            const artboardRect = currentArtboardEl.getBoundingClientRect();
            const ghostScreenX = artboardRect.left + (targetX * zoom);
            const ghostScreenY = artboardRect.top + (targetY * zoom);
            updateDragGhostPosition(canvasInstance, ghostScreenX, ghostScreenY);

            // Calculate exact displacement applied
            const dx = targetX - primaryOffset.startX;
            const dy = targetY - primaryOffset.startY;

            for (const wInfo of canvasInstance.dragState.widgets) {
                const widget = AppState.getWidgetById(wInfo.id);
                if (widget && !widget.locked) {
                    widget.x = wInfo.startX + dx;
                    widget.y = wInfo.startY + dy;

                    // Group child movement
                    if (widget.type === 'group') {
                        /** @type {any[]} */
                        const pageWidgets = page.widgets || [];
                        const children = pageWidgets.filter(w => w.parentId === widget.id);
                        children.forEach(child => {
                            if (!canvasInstance.dragState.widgets.find(sw => sw.id === child.id)) {
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

            // Horizontal resize
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

            // Vertical resize
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
                    const items = Array.from(pageListEl.querySelectorAll(".item"));
                    targetPageIndex = items.indexOf(pageListItem);
                }
            }

            if (targetPageIndex !== -1 && targetPageIndex !== sourcePageIndex) {
                /** @type {any[]} */
                const widgetsToMove = canvasInstance.dragState.widgets;
                if (targetPlaceholder) render(canvasInstance);

                let targetArtboardEl = canvasInstance.canvas.querySelector(`.artboard[data-index="${targetPageIndex}"]`);
                let moveCount = 0;

                window.removeEventListener("mousemove", canvasInstance._boundMouseMove);
                window.removeEventListener("mouseup", canvasInstance._boundMouseUp);
                removeDragGhost(canvasInstance);
                canvasInstance.dragState = null;
                clearSnapGuides();

                let targetRect = targetArtboardEl ? targetArtboardEl.getBoundingClientRect() : null;
                const zoom = AppState.zoomLevel;
                const dims = AppState.getCanvasDimensions();

                const allMovedIds = new Set(widgetsToMove.map(w => w.id));
                const rootMovers = widgetsToMove.filter(wInfo => {
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
                        dropX = 40; dropY = 40;
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

        removeEventListener("mousemove", canvasInstance._boundMouseMove);
        removeEventListener("mouseup", canvasInstance._boundMouseUp);
        removeDragGhost(canvasInstance);

        // Clamping and final state updates
        const dims = AppState.getCanvasDimensions();
        const widgetsToClamp = canvasInstance.dragState?.widgets || [];
        widgetsToClamp.forEach(wInfo => {
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
        removeEventListener("mousemove", canvasInstance._boundMouseMove);
        removeEventListener("mouseup", canvasInstance._boundMouseUp);

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
