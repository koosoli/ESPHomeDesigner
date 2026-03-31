// @ts-check

import { AppState } from '../state';
import { radialMenu } from '../../ui/radial_menu.js';
import { clearSnapGuides } from '../canvas_snap.js';
import { render } from '../canvas_renderer.js';
import { createDragGhost, updateDragGhost, updateDragGhostPosition, removeDragGhost, createPageDragGhost, updatePageDragGhost, removePageDragGhost } from './drag_ghost.js';
import { startInlineEdit } from './inline_edit.js';
import { onMouseMove } from './selection_move.js';
import { onMouseUp } from './selection_up.js';
import { addBrowserEventListener } from '../../utils/browser_runtime.js';
import { appendToDesignerOverlayRoot } from '../../utils/runtime_root.js';

export { createDragGhost, updateDragGhost, updateDragGhostPosition, removeDragGhost, createPageDragGhost, updatePageDragGhost, removePageDragGhost, startInlineEdit };
export { onMouseMove, onMouseUp };

// Helper for manual double-click detection
let lastClickTime = 0;
/** @type {string | null} */
let lastClickWidgetId = null;

// Tracking for background double-clicks (empty canvas)
let lastBackgroundClickTime = 0;
/** @type {number | null} */
let lastBackgroundClickIndex = null;

/**
 * Return keyboard focus to the canvas workflow when a non-editable canvas surface is clicked.
 * This keeps shortcuts like Delete working after editing YAML, properties, or inline text fields.
 * @param {HTMLElement | null} target
 */
export function blurActiveCanvasInput(target) {
    if (!(target instanceof HTMLElement)) {
        return;
    }

    if (target.closest("input, textarea, select, option, button, [contenteditable='true']")) {
        return;
    }

    const activeElement = document.activeElement;
    if (!(activeElement instanceof HTMLElement) || activeElement === document.body) {
        return;
    }

    activeElement.blur();
}

/**
 * Move keyboard ownership back to the canvas after a canvas interaction.
 * This keeps app-level shortcuts reliable without letting the YAML textarea reclaim focus.
 * @param {HTMLElement | null} target
 */
export function focusCanvasKeyboardTarget(target) {
    if (!(target instanceof HTMLElement)) {
        return;
    }

    if (target.closest("input, textarea, select, option, button, [contenteditable='true']")) {
        return;
    }

    const canvas = target.closest('#canvas') || document.getElementById('canvas');
    if (!(canvas instanceof HTMLElement)) {
        return;
    }

    if (!canvas.hasAttribute('tabindex')) {
        canvas.tabIndex = -1;
    }

    try {
        canvas.focus({ preventScroll: true });
    } catch {
        canvas.focus();
    }
}

/**
 * @param {any} canvasInstance
 * @returns {boolean}
 */
export function shouldSuppressCanvasContextMenu(canvasInstance) {
    return !!(
        canvasInstance.pinchState ||
        canvasInstance.touchState?.hasMoved ||
        canvasInstance.dragState?.mode === "resize" ||
        canvasInstance.lassoState?.rect
    );
}

/**
 * @param {EventTarget | null} target
 * @returns {{ shouldShow: boolean, widgetId: string | null }}
 */
export function resolveCanvasContextMenuTarget(target) {
    const currentTarget = target instanceof HTMLElement ? target : null;
    if (!currentTarget) {
        return { shouldShow: false, widgetId: null };
    }

    // Allow native context menus for editable controls and buttons.
    if (currentTarget.closest("input, textarea, select, option, button, [contenteditable='true']")) {
        return { shouldShow: false, widgetId: null };
    }

    const canvasSurface = currentTarget.closest(".artboard, .widget");
    if (!canvasSurface) {
        return { shouldShow: false, widgetId: null };
    }

    const widgetEl = currentTarget.closest(".widget");
    return {
        shouldShow: true,
        widgetId: widgetEl instanceof HTMLElement ? widgetEl.dataset.id || null : null
    };
}


/**
 * @param {any} canvasInstance
 */
export function setupInteractions(canvasInstance) {
    canvasInstance.canvas.addEventListener("mousedown", (/** @type {MouseEvent} */ ev) => {
        if (ev.button !== 0) return; // Only handle left-click for widgets

        clearSnapGuides(); // Clean up any stale guides immediately

        const target = /** @type {HTMLElement} */ (ev.target);
        blurActiveCanvasInput(target);
        focusCanvasKeyboardTarget(target);
        const wrapperEl = target.closest(".artboard-wrapper");
        if (!wrapperEl || target.closest(".artboard-btn") || target.closest("button")) {
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

            addBrowserEventListener("mousemove", canvasInstance._boundMouseMove);
            addBrowserEventListener("mouseup", canvasInstance._boundMouseUp);
            ev.preventDefault();
            return;
        }

        if (!currentArtboardEl) return;
        const rect = currentArtboardEl.getBoundingClientRect();
        const zoom = AppState.zoomLevel;

        if (widgetEl instanceof HTMLElement) {
            const widgetId = widgetEl.dataset.id;
            if (!widgetId) return;
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

            /** @type {any[]} */
            const selectedWidgets = AppState.getSelectedWidgets();
            const widgetOffsets = selectedWidgets.map((w) => {
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

            addBrowserEventListener("mousemove", canvasInstance._boundMouseMove);
            addBrowserEventListener("mouseup", canvasInstance._boundMouseUp);
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
            if (artboardEl) {
                artboardEl.appendChild(canvasInstance.lassoEl);
            }

            addBrowserEventListener("mousemove", canvasInstance._boundMouseMove);
            addBrowserEventListener("mouseup", canvasInstance._boundMouseUp);
            ev.preventDefault();
        }
    });

    canvasInstance.canvas.addEventListener("contextmenu", (/** @type {MouseEvent} */ ev) => {
        if (shouldSuppressCanvasContextMenu(canvasInstance)) {
            ev.preventDefault();
            if (radialMenu?.active) radialMenu.hide();
            return;
        }

        const { shouldShow, widgetId } = resolveCanvasContextMenuTarget(ev.target);
        if (!shouldShow) {
            if (radialMenu?.active) radialMenu.hide();
            return;
        }

        if (radialMenu) {
            ev.preventDefault();
            ev.stopPropagation();
            radialMenu.show(ev.clientX, ev.clientY, widgetId || undefined);
        }
    });

    // --- DEBUG CURSOR TRACKER ---
    /** @type {HTMLElement | null} */
    let debugTooltip = document.querySelector(".debug-cursor-tooltip");
    if (!debugTooltip) {
        debugTooltip = document.createElement("div");
        debugTooltip.className = "debug-cursor-tooltip";
        appendToDesignerOverlayRoot(debugTooltip);
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


