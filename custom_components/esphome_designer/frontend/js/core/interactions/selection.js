import { AppState } from '../state.js';
import { Logger } from '../../utils/logger.js';
import { emit, EVENTS } from '../events.js';
import { WidgetFactory } from '../widget_factory.js';
import { registry as PluginRegistry } from '../plugin_registry.js';
import { snapToGridCell, applySnapToPosition, clearSnapGuides, updateWidgetGridCell, snapResizeValue } from '../canvas_snap.js';
import { render, updateWidgetDOM, focusPage, applyZoom } from '../canvas_renderer.js';

// Helper for manual double-click detection
let lastClickTime = 0;
let lastClickWidgetId = null;

// Tracking for background double-clicks (empty canvas)
let lastBackgroundClickTime = 0;
let lastBackgroundClickIndex = null;

/**
 * Creates a floating drag ghost that follows the cursor during widget drags.
 * This enables smooth cross-page dragging without the widget being clamped to artboard bounds.
 */
function createDragGhost(canvasInstance, widgets, clientX, clientY, zoom, widgetOffsets) {
    // Remove any existing ghost
    removeDragGhost(canvasInstance);

    const ghostContainer = document.createElement('div');
    ghostContainer.className = 'drag-ghost-container';
    ghostContainer.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: 99999;
        opacity: 1.0; 
        transform-origin: top left;
        transform: scale(${zoom});
        transition: none;
    `;

    // Find the primary widget for relative coordinate calculation
    // FIX: Use the specifically grabbed widget as anchor (primaryOffset.id)
    // instead of defaulting to the first one in the list.
    const grabbedId = canvasInstance.dragState?.id;
    const primaryOffset = widgetOffsets.find(o => o.id === grabbedId) || widgetOffsets[0];
    const primaryWidget = widgets.find(w => w.id === primaryOffset?.id) || widgets[0];
    const primaryEl = document.querySelector(`.widget[data-id="${primaryWidget.id}"]`);

    if (!primaryWidget || !primaryEl) return;

    // 1. Flatten selection: ensure children of groups are also ghosted
    const allWidgetsToGhost = [];
    const currentPage = AppState.getCurrentPage();

    widgets.forEach(w => {
        allWidgetsToGhost.push(w);
        if (w.type === 'group') {
            const children = currentPage.widgets.filter(child => child.parentId === w.id);
            allWidgetsToGhost.push(...children);
        }
    });

    // 2. Clone each widget with full visual context
    allWidgetsToGhost.forEach(widget => {
        const widgetEl = document.querySelector(`.widget[data-id="${widget.id}"]`);
        if (widgetEl) {
            // Simulated Artboard Context (Ensures CSS variables like --accent, --white resolve)
            const sourceArtboard = widgetEl.closest('.artboard');
            const contextWrapper = document.createElement('div');
            contextWrapper.className = (sourceArtboard ? sourceArtboard.className : 'artboard') + ' ghost-context-sim';

            // Position wrapper relative to primary widget
            contextWrapper.style.cssText = `
                position: absolute;
                left: ${(widget.x - primaryWidget.x)}px;
                top: ${(widget.y - primaryWidget.y)}px;
                width: ${widget.width}px;
                height: ${widget.height}px;
                pointer-events: none;
                background: transparent !important;
                box-shadow: none !important;
                border: none !important;
                transform: none !important;
                overflow: visible;
                display: block;
            `;

            // The Clone itself
            const clone = document.createElement('div');

            // Copy all attributes and most importantly the style attribute
            for (const attr of widgetEl.attributes) {
                clone.setAttribute(attr.name, attr.value);
            }

            // Clean state/interactive classes
            clone.classList.remove('active', 'dragging-source', 'locked');
            clone.classList.add('drag-ghost-widget');

            // Copy raw computed styles for absolute safety on backgrounds/borders
            const computed = window.getComputedStyle(widgetEl);
            clone.style.cssText = widgetEl.style.cssText; // Base styles
            clone.style.position = 'absolute';
            clone.style.top = '0';
            clone.style.left = '0';
            clone.style.margin = '0';
            clone.style.transform = 'none';
            clone.style.setProperty('background', computed.background, 'important');
            clone.style.setProperty('background-color', computed.backgroundColor, 'important');
            clone.style.setProperty('border', computed.border, 'important');
            clone.style.setProperty('border-radius', computed.borderRadius, 'important');

            // Carry inner content (icons, labels, etc.)
            clone.innerHTML = widgetEl.innerHTML;

            contextWrapper.appendChild(clone);
            ghostContainer.appendChild(contextWrapper);
        }
    });

    // Store click offset in screen pixels
    if (primaryOffset) {
        canvasInstance.dragGhostOffset = {
            x: primaryOffset.clickOffsetX * zoom,
            y: primaryOffset.clickOffsetY * zoom
        };
    }

    document.body.appendChild(ghostContainer);
    canvasInstance.dragGhostEl = ghostContainer;

    // Initial position
    updateDragGhost(canvasInstance, clientX, clientY);

    // Fade out original widgets during drag
    widgets.forEach(widget => {
        const widgetEl = document.querySelector(`.widget[data-id="${widget.id}"]`);
        if (widgetEl) widgetEl.classList.add('dragging-source');
    });
}

/**
 * Updates the drag ghost position to follow the cursor.
 */
function updateDragGhost(canvasInstance, clientX, clientY) {
    if (!canvasInstance.dragGhostEl || !canvasInstance.dragGhostOffset) return;

    const offset = canvasInstance.dragGhostOffset;
    const x = clientX - offset.x;
    const y = clientY - offset.y;

    canvasInstance.dragGhostEl.style.left = x + 'px';
    canvasInstance.dragGhostEl.style.top = y + 'px';
}

/**
 * Updates the drag ghost position to an absolute screen position (for snapped positions).
 * The screenX/screenY should be the top-left corner of where the primary widget should appear.
 */
function updateDragGhostPosition(canvasInstance, screenX, screenY) {
    if (!canvasInstance.dragGhostEl) return;

    canvasInstance.dragGhostEl.style.left = screenX + 'px';
    canvasInstance.dragGhostEl.style.top = screenY + 'px';
}

/**
 * Removes the drag ghost and restores original widget visibility.
 */
function removeDragGhost(canvasInstance) {
    if (canvasInstance.dragGhostEl) {
        canvasInstance.dragGhostEl.remove();
        canvasInstance.dragGhostEl = null;
        canvasInstance.dragGhostOffset = null;
    }

    // Restore original widgets
    document.querySelectorAll('.widget.dragging-source').forEach(el => {
        el.classList.remove('dragging-source');
    });
}


/**
 * Creates a floating ghost of the artboard header for page reordering.
 */
function createPageDragGhost(canvasInstance, pageIndex, clientX, clientY) {
    const wrapper = canvasInstance.canvas.querySelector(`.artboard-wrapper[data-index="${pageIndex}"]`);
    if (!wrapper) return;

    const header = wrapper.querySelector('.artboard-header');
    if (!header) return;

    const ghost = header.cloneNode(true);
    ghost.classList.add('page-drag-ghost');

    const rect = header.getBoundingClientRect();
    const clickOffsetX = clientX - rect.left;
    const clickOffsetY = clientY - rect.top;

    ghost.style.cssText = `
        position: fixed;
        left: ${clientX}px;
        top: ${clientY}px;
        width: ${rect.width}px;
        pointer-events: none;
        z-index: 100000;
        opacity: 0.9;
        box-shadow: 0 12px 40px rgba(0,0,0,0.5);
        border: 2px solid var(--accent);
        border-radius: 10px;
        background: var(--bg-surface);
        transform: translate(-${clickOffsetX}px, -${clickOffsetY}px) scale(1.05);
        transition: none;
    `;

    document.body.appendChild(ghost);
    canvasInstance.pageDragGhost = ghost;
    canvasInstance.pageDragOffset = { x: clickOffsetX, y: clickOffsetY };

    // Dim the original artboard wrapper
    wrapper.classList.add('reordering');
}

function updatePageDragGhost(canvasInstance, clientX, clientY) {
    if (!canvasInstance.pageDragGhost) return;
    canvasInstance.pageDragGhost.style.left = clientX + 'px';
    canvasInstance.pageDragGhost.style.top = clientY + 'px';
}

function removePageDragGhost(canvasInstance, pageIndex) {
    if (canvasInstance.pageDragGhost) {
        canvasInstance.pageDragGhost.remove();
        canvasInstance.pageDragGhost = null;
    }
    const wrapper = canvasInstance.canvas.querySelector(`.artboard-wrapper[data-index="${pageIndex}"]`);
    if (wrapper) {
        wrapper.classList.remove('reordering');
    }
}


function startInlineEdit(canvasInstance, widgetId) {
    const widget = AppState.getWidgetById(widgetId);
    if (!widget) return;

    // Only allow inline editing for text-based widgets
    const type = (widget.type || "").toLowerCase();
    if (type !== "text" && type !== "label") return;

    // Find widget element again for fresh rect
    const widgetEl = canvasInstance.canvas.querySelector(`.widget[data-id="${widgetId}"]`);
    if (!widgetEl) return;

    const zoom = AppState.zoomLevel;
    const rect = widgetEl.getBoundingClientRect();

    // Create overlay textarea
    const textarea = document.createElement("textarea");
    textarea.value = widget.props.text || widget.title || "";

    // Style it to match the widget
    textarea.style.position = "absolute";
    // Append to body to ensure it's on top of everything
    textarea.style.left = (rect.left + window.scrollX) + "px";
    textarea.style.top = (rect.top + window.scrollY) + "px";
    textarea.style.width = Math.max(50, rect.width) + "px";
    textarea.style.height = Math.max(30, rect.height) + "px";
    textarea.style.zIndex = "99999";

    // Font styles
    const props = widget.props || {};
    const fontSize = (props.font_size || 20) * zoom;
    textarea.style.fontSize = fontSize + "px";
    textarea.style.fontFamily = (props.font_family || "Roboto") + ", sans-serif";
    textarea.style.fontWeight = props.font_weight || 400;
    textarea.style.fontStyle = props.italic ? "italic" : "normal";
    textarea.style.textAlign = (props.text_align || "LEFT").split("_").pop().toLowerCase();
    textarea.style.color = props.color || "black";

    // Reset styles
    textarea.style.background = "rgba(255, 255, 255, 0.9)";
    textarea.style.border = "1px solid #1a73e8";
    textarea.style.padding = "0px";
    textarea.style.resize = "both";
    textarea.style.outline = "none";
    textarea.style.overflow = "hidden";
    textarea.style.lineHeight = "1.2"; // Approximate default

    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    const finishEdit = () => {
        if (!textarea.isConnected && !textarea.parentElement) return;

        // Cleanup listeners to prevent re-entry (e.g. remove() triggering blur)
        textarea.removeEventListener("blur", onBlur);
        textarea.removeEventListener("keydown", onKeyDown);

        const newText = textarea.value;
        if (newText !== (widget.props.text || widget.title)) {
            AppState.updateWidget(widgetId, {
                props: { ...widget.props, text: newText }
            });
        }

        textarea.remove();
    };

    const onBlur = () => finishEdit();
    const onKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            finishEdit();
        }
        if (e.key === "Escape") {
            textarea.remove(); // Cancel
        }
        // Auto-resize height
        textarea.style.height = textarea.scrollHeight + "px";
    };

    textarea.addEventListener("blur", onBlur);
    textarea.addEventListener("keydown", onKeyDown);
}

export function setupInteractions(canvasInstance) {
    canvasInstance.canvas.addEventListener("mousedown", (ev) => {
        if (ev.button !== 0) return; // Only handle left-click for widgets

        clearSnapGuides(); // Clean up any stale guides immediately

        const wrapperEl = ev.target.closest(".artboard-wrapper");
        if (!wrapperEl || ev.target.closest(".artboard-btn") || ev.target.closest("button")) {
            // Clicked on stage background OR a button - release focus from inputs
            if (document.activeElement && !ev.target.closest("button")) document.activeElement.blur();

            // If clicking strictly on the stage background (not a button), deselect everything
            if (!ev.target.closest("button") && !ev.target.closest(".artboard-btn")) {
                AppState.selectWidgets([]);
                render(canvasInstance);
            }
            return;
        }

        const pageIndex = parseInt(wrapperEl.dataset.index, 10);
        const artboardEl = wrapperEl.querySelector(".artboard");
        let currentArtboardEl = artboardEl;
        const widgetEl = ev.target.closest(".widget");
        let activeWidgetId = widgetEl?.dataset.id;

        // If switching pages OR clicking an empty area/header of the current page, focus it
        const isSwitching = AppState.currentPageIndex !== pageIndex;
        const isHeaderClick = !!ev.target.closest(".artboard-header");
        const isBackgroundClick = !!ev.target.closest(".artboard") && !widgetEl;

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

        if (widgetEl) {
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

            const isResizeHandle = ev.target.classList.contains("widget-resize-handle");

            if (isResizeHandle) {
                // Block resizing for widgets that are part of a group
                if (widget.parentId) {
                    return;
                }
                if (effectiveWidget.locked) return;
                canvasInstance.dragState = {
                    mode: "resize",
                    handle: ev.target.dataset.handle || 'br',
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
                    // DEBUG: Calculate widget element bounding rect vs widget data
                    const widgetEl = canvasInstance.canvas.querySelector(`.widget[data-id="${w.id}"]`);
                    const widgetRect = widgetEl ? widgetEl.getBoundingClientRect() : null;
                    const expectedLeft = rect.left + w.x * zoom;
                    const expectedTop = rect.top + w.y * zoom;

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

    canvasInstance.canvas.addEventListener("contextmenu", (ev) => {
        // Prevent context menu ONLY if we have actually moved or are in a multi-finger state
        if (canvasInstance.pinchState ||
            (canvasInstance.touchState?.hasMoved) ||
            (canvasInstance.dragState?.mode === "resize") ||
            (canvasInstance.lassoState?.rect)) {
            ev.preventDefault();
            return;
        }

        ev.preventDefault();
        const widgetEl = ev.target.closest(".widget");
        const widgetId = widgetEl ? widgetEl.dataset.id : null;

        if (window.RadialMenu) {
            window.RadialMenu.show(ev.clientX, ev.clientY, widgetId);
        }
    });

    // --- DEBUG CURSOR TRACKER ---
    let debugTooltip = document.querySelector(".debug-cursor-tooltip");
    if (!debugTooltip) {
        debugTooltip = document.createElement("div");
        debugTooltip.className = "debug-cursor-tooltip";
        document.body.appendChild(debugTooltip);
    }

    canvasInstance.canvas.addEventListener("mousemove", (ev) => {
        if (!AppState.showDebugGrid) {
            debugTooltip.style.display = "none";
            return;
        }

        const artboard = ev.target.closest(".artboard");
        if (!artboard) {
            debugTooltip.style.display = "none";
            return;
        }

        const rect = artboard.getBoundingClientRect();
        const zoom = AppState.zoomLevel;
        const x = Math.round((ev.clientX - rect.left) / zoom);
        const y = Math.round((ev.clientY - rect.top) / zoom);

        debugTooltip.style.display = "block";
        debugTooltip.style.left = ev.clientX + "px";
        debugTooltip.style.top = ev.clientY + "px";
        debugTooltip.innerHTML = `<span>X:</span>${x} <span>Y:</span>${y}`;
    });

    canvasInstance.canvas.addEventListener("mouseleave", () => {
        debugTooltip.style.display = "none";
    });
}

export function onMouseMove(ev, canvasInstance) {
    const zoom = AppState.zoomLevel;
    const dims = AppState.getCanvasDimensions();

    if (canvasInstance.dragState) {
        if (canvasInstance.dragState.mode === "move") {
            // Re-query artboard to ensure it's still valid/attached
            const currentArtboardEl = document.querySelector(`.artboard[data-index="${AppState.currentPageIndex}"]`);
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
            // Convert snapped canvas coords to screen position for ghost
            const artboardRect = currentArtboardEl.getBoundingClientRect();
            const ghostScreenX = artboardRect.left + (targetX * zoom);
            const ghostScreenY = artboardRect.top + (targetY * zoom);
            updateDragGhostPosition(canvasInstance, ghostScreenX, ghostScreenY);

            // NO BOUNDS CLAMPING during drag - ghost follows cursor freely
            // Clamping is applied on drop to the target artboard

            // Calculate exact displacement applied (including snap)
            const dx = targetX - primaryOffset.startX;
            const dy = targetY - primaryOffset.startY;

            // Move all selected widgets by the same displacement
            const primaryDx = dx;
            const primaryDy = dy;

            for (const wInfo of canvasInstance.dragState.widgets) {
                const widget = AppState.getWidgetById(wInfo.id);
                if (widget && !widget.locked) {
                    widget.x = wInfo.startX + primaryDx;
                    widget.y = wInfo.startY + primaryDy;
                    // Don't update DOM during cross-page drag - ghost handles visualization
                    // updateWidgetDOM(canvasInstance, widget, true);

                    // If this is a group, move its children too
                    if (widget.type === 'group') {
                        const children = page.widgets.filter(w => w.parentId === widget.id);
                        children.forEach(child => {
                            // We need to keep track of child start positions separately if they aren't in dragState.widgets
                            // For now, if they aren't in selection, we move them by delta
                            if (!canvasInstance.dragState.widgets.find(sw => sw.id === child.id)) {
                                // Direct delta move for non-selected children
                                child.x += primaryDx - (canvasInstance.dragState.lastDx || 0);
                                child.y += primaryDy - (canvasInstance.dragState.lastDy || 0);
                            }
                        });
                    }
                }
            }
            canvasInstance.dragState.lastDx = primaryDx;
            canvasInstance.dragState.lastDy = primaryDy;

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

            // NaN Safety and Minimum Clamping
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

            // Bound clamping can interfere with smooth resizing if not careful, 
            // but let's keep it consistent with the target artboard
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
            // Update ghost
            updatePageDragGhost(canvasInstance, ev.clientX, ev.clientY);

            // Visual feedback for drop targets
            document.querySelectorAll('.artboard-wrapper').forEach(el => el.classList.remove('drag-over'));

            const targetEl = document.elementFromPoint(ev.clientX, ev.clientY);
            const targetWrapper = targetEl?.closest('.artboard-wrapper');
            if (targetWrapper && parseInt(targetWrapper.dataset.index, 10) !== canvasInstance.dragState.pageIndex) {
                targetWrapper.classList.add('drag-over');
            }
        }
        // render calls skipped for perf
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

        // Real-time selection feedback
        // Real-time selection feedback
        const page = AppState.getCurrentPage();
        if (page) {
            // Use initialSelection as base for additive logic
            const currentSelection = new Set(canvasInstance.lassoState.isAdditive ? canvasInstance.lassoState.initialSelection : []);
            canvasInstance.lassoState.currentSelection = [];

            const lassoRect = {
                x1: x,
                y1: y,
                x2: x + w,
                y2: y + h
            };

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
                        // Keep it active if it was initially selected
                        el.classList.add("active");
                    } else {
                        el.classList.remove("active");
                    }
                }
            }
            canvasInstance.lassoState.currentSelection = Array.from(currentSelection);

            // SYNC GLOBAL STATE LIVE
            // This triggers Hierarchy and Snippet updates via event listeners
            AppState.selectWidgets(canvasInstance.lassoState.currentSelection);
        }

        ev.preventDefault();
        ev.stopPropagation();
    }
}

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

            // 1. Check if dropped onto another artboard (canvas page)
            const targetArtboard = targetEl?.closest(".artboard");
            const targetPlaceholder = targetEl?.closest(".add-page-placeholder");
            const sourcePageIndex = AppState.currentPageIndex;
            let targetPageIndex = -1;

            if (targetArtboard) {
                targetPageIndex = parseInt(targetArtboard.dataset.index, 10);
            } else if (targetPlaceholder) {
                // DROP ONTO "+ ADD PAGE" PLACEHOLDER
                // Create the page at the end of the list, but DON'T switch to it yet
                // IMPORTANT: Suppress focus to prevent view recentering during widget drag
                canvasInstance.suppressNextFocus = true;
                const pageCount = AppState.pages.length;
                const newPage = AppState.addPage(pageCount);
                if (newPage) {
                    targetPageIndex = pageCount;
                    Logger.log(`[Canvas] Created new page ${targetPageIndex} at index ${targetPageIndex}. Source was ${sourcePageIndex}`);
                }

            } else {
                // 2. Check if dropped onto a page list item in the sidebar
                const pageListItem = targetEl?.closest("#pageList .item");
                if (pageListItem) {
                    const pageListEl = document.getElementById("pageList");
                    const items = Array.from(pageListEl.querySelectorAll(".item"));
                    targetPageIndex = items.indexOf(pageListItem);
                }
            }

            if (targetPageIndex !== -1 && targetPageIndex !== sourcePageIndex) {
                const widgetsToMove = canvasInstance.dragState.widgets;

                // FORCE RENDER to ensure the new artboard exists in DOM if we just added it
                if (targetPlaceholder) render(canvasInstance);

                let targetArtboardEl = canvasInstance.canvas.querySelector(`.artboard[data-index="${targetPageIndex}"]`);
                let moveCount = 0;

                // Clean up interactions first
                window.removeEventListener("mousemove", canvasInstance._boundMouseMove);
                window.removeEventListener("mouseup", canvasInstance._boundMouseUp);
                removeDragGhost(canvasInstance);
                canvasInstance.dragState = null;
                clearSnapGuides();

                // Cache target rect and zoom BEFORE the loop
                let targetRect = null;
                const zoom = AppState.zoomLevel;
                if (targetArtboardEl) {
                    targetRect = targetArtboardEl.getBoundingClientRect();
                }

                // Filter to identify "root movers"
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
                        const dims = AppState.getCanvasDimensions();

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
                    Logger.log(`[Canvas] Successfully moved ${moveCount} widgets to page ${targetPageIndex}`);
                    AppState.setCurrentPageIndex(targetPageIndex, { suppressFocus: true });
                    // Do NOT recenter the view when moving widgets to another page.
                    // The user explicitly wants to keep their current viewport position.
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
                const targetIndex = parseInt(targetWrapper.dataset.index, 10);
                if (targetIndex !== sourceIndex) {
                    AppState.reorderPage(sourceIndex, targetIndex);
                    // focusPage will be called via EVENTS.PAGE_CHANGED listener in canvas.js if index changes
                    // or we might need a manual call if it stays same but contents moved.
                    // reorderPage emits STATE_CHANGED which triggers render.
                }
            }
        }

        window.removeEventListener("mousemove", canvasInstance._boundMouseMove);
        window.removeEventListener("mouseup", canvasInstance._boundMouseUp);
        removeDragGhost(canvasInstance);

        // Clamp all dragged widgets to canvas bounds (prevents "neverland" placement)
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
        window.removeEventListener("mousemove", canvasInstance._boundMouseMove);
        window.removeEventListener("mouseup", canvasInstance._boundMouseUp);

        if (canvasInstance.lassoEl) {
            canvasInstance.lassoEl.remove();
            canvasInstance.lassoEl = null;
        }

        const duration = Date.now() - canvasInstance.lassoState.startTime;
        const hasMoved = !!canvasInstance.lassoState.rect;

        if (hasMoved) {
            const finalSelection = canvasInstance.lassoState.currentSelection || [];
            AppState.selectWidgets(finalSelection);
        } else {
            // Clicked without dragging - clear selection
            if (!canvasInstance.lassoState.isAdditive) {
                AppState.selectWidgets([]);
            }

            // ONLY zoom/fit if no movement occurred and zoom was requested (double click or page switch)
            if (canvasInstance.lassoState.focusParams) {
                const { index, fitZoom } = canvasInstance.lassoState.focusParams;
                // If fitZoom is true (double click), we always focus. 
                // If fitZoom is false (page switch via single click), we might just want to switch context without moving camera,
                // BUT the user specifically asked that ONLY double click zoom and recenter.
                if (fitZoom) {
                    // Strictly recenter ONLY the currently selected page as per state
                    focusPage(canvasInstance, AppState.currentPageIndex, true, true);
                } else if (duration < 300) {
                    // This was a single click page switch - we ALREADY switched context in mousedown
                    // so we do nothing here to satisfy "selecting a widget from another page should no recenter"
                    // and "only double click zooms and recenters".
                }
            }
        }

        canvasInstance.lassoState = null;
        render(canvasInstance);
        ev.preventDefault();
        ev.stopPropagation();
    }
}