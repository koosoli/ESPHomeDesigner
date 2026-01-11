import { AppState } from './state.js';
import { Logger } from '../utils/logger.js';
import { emit, EVENTS } from './events.js';
import { WidgetFactory } from './widget_factory.js';
import { registry as PluginRegistry } from './plugin_registry.js';
import { snapToGridCell, applySnapToPosition, clearSnapGuides, updateWidgetGridCell } from './canvas_snap.js';
import { render, applyZoom, updateWidgetDOM } from './canvas_renderer.js';

// Helper for manual double-click detection
let lastClickTime = 0;
let lastClickWidgetId = null;

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

        const artboardEl = ev.target.closest(".artboard");
        if (!artboardEl) {
            // Clicked on stage background - release focus from inputs (e.g. YAML box)
            if (document.activeElement) document.activeElement.blur();
            return;
        }

        const pageIndex = parseInt(artboardEl.dataset.index, 10);
        if (AppState.currentPageIndex !== pageIndex) {
            AppState.setCurrentPageIndex(pageIndex);
        }

        const widgetEl = ev.target.closest(".widget");
        const rect = artboardEl.getBoundingClientRect();
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

            const isResizeHandle = ev.target.classList.contains("widget-resize-handle");

            if (isResizeHandle) {
                if (widget.locked) return;
                canvasInstance.dragState = {
                    mode: "resize",
                    id: widgetId,
                    startX: ev.clientX,
                    startY: ev.clientY,
                    startW: widget.width,
                    startH: widget.height,
                    artboardEl // Store for coordinate calc
                };
            } else {
                if (widget.locked) return;

                const selectedWidgets = AppState.getSelectedWidgets();
                const widgetOffsets = selectedWidgets.map(w => ({
                    id: w.id,
                    startX: w.x,
                    startY: w.y,
                    clickOffsetX: (ev.clientX - rect.left) / zoom - w.x,
                    clickOffsetY: (ev.clientY - rect.top) / zoom - w.y
                }));

                canvasInstance.dragState = {
                    mode: "move",
                    id: widgetId,
                    widgets: widgetOffsets,
                    artboardEl
                };
            }

            window.addEventListener("mousemove", canvasInstance._boundMouseMove);
            window.addEventListener("mouseup", canvasInstance._boundMouseUp);
            ev.preventDefault();
        } else {
            // Clicked on artboard background - start lasso
            const startX = (ev.clientX - rect.left) / zoom;
            const startY = (ev.clientY - rect.top) / zoom;

            canvasInstance.lassoState = {
                startX,
                startY,
                rect: null,
                isAdditive: ev.shiftKey || ev.ctrlKey,
                artboardEl
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
        ev.preventDefault();
        const widgetEl = ev.target.closest(".widget");
        const widgetId = widgetEl ? widgetEl.dataset.id : null;

        if (window.RadialMenu) {
            window.RadialMenu.show(ev.clientX, ev.clientY, widgetId);
        }
    });
}

export function onMouseMove(ev, canvasInstance) {
    const zoom = AppState.zoomLevel;
    const dims = AppState.getCanvasDimensions();

    if (canvasInstance.dragState) {
        if (canvasInstance.dragState.mode === "move") {
            const artboardEl = canvasInstance.dragState.artboardEl;
            if (!artboardEl) return;
            const rect = artboardEl.getBoundingClientRect();

            // Primary widget delta for snapping
            const primaryWidget = AppState.getWidgetById(canvasInstance.dragState.id);
            if (!primaryWidget) return;

            const primaryOffset = canvasInstance.dragState.widgets.find(w => w.id === canvasInstance.dragState.id);

            let targetX = (ev.clientX - rect.left) / zoom - primaryOffset.clickOffsetX;
            let targetY = (ev.clientY - rect.top) / zoom - primaryOffset.clickOffsetY;

            // Snap logic using the primary widget
            const page = AppState.getCurrentPage();
            if (page?.layout && !ev.altKey) {
                const snappedToGrid = snapToGridCell(targetX, targetY, primaryWidget.width, primaryWidget.height, page.layout, dims);
                targetX = snappedToGrid.x;
                targetY = snappedToGrid.y;
            } else {
                const snapped = applySnapToPosition(canvasInstance, primaryWidget, targetX, targetY, ev.altKey, dims);
                targetX = snapped.x;
                targetY = snapped.y;
            }

            // Calculate displacement based on snapped target
            const dx = targetX - primaryOffset.startX;
            const dy = targetY - primaryOffset.startY;

            // Move all selected widgets by the same displacement
            for (const wInfo of canvasInstance.dragState.widgets) {
                const widget = AppState.getWidgetById(wInfo.id);
                if (widget && !widget.locked) {
                    widget.x = wInfo.startX + dx;
                    widget.y = wInfo.startY + dy;
                    updateWidgetDOM(canvasInstance, widget);
                }
            }
        } else if (canvasInstance.dragState.mode === "resize") {
            const widget = AppState.getWidgetById(canvasInstance.dragState.id);
            if (!widget) return;

            let w = canvasInstance.dragState.startW + (ev.clientX - canvasInstance.dragState.startX) / zoom;
            let h = canvasInstance.dragState.startH + (ev.clientY - canvasInstance.dragState.startY) / zoom;

            const wtype = (widget.type || "").toLowerCase();

            if (wtype === "line" || wtype === "lvgl_line") {
                const props = widget.props || {};
                const orientation = props.orientation || "horizontal";
                const strokeWidth = parseInt(props.stroke_width || props.line_width || 3, 10);

                if (orientation === "vertical") {
                    w = strokeWidth;
                    h = Math.max(10, h);
                } else {
                    h = strokeWidth;
                    w = Math.max(10, w);
                }
            }

            const minSize = 1;
            w = Math.max(minSize, Math.min(dims.width - widget.x, w));
            h = Math.max(minSize, Math.min(dims.height - widget.y, h));
            widget.width = Math.round(w);
            widget.height = Math.round(h);

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
    }
}

export function onMouseUp(ev, canvasInstance) {
    if (canvasInstance.dragState) {
        const widgetId = canvasInstance.dragState.id;
        canvasInstance.dragState = null;
        clearSnapGuides(canvasInstance);
        window.removeEventListener("mousemove", canvasInstance._boundMouseMove);
        window.removeEventListener("mouseup", canvasInstance._boundMouseUp);

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

        if (canvasInstance.lassoState.rect) {
            const { x, y, w, h } = canvasInstance.lassoState.rect;
            const page = AppState.getCurrentPage();
            const selectedIds = [];

            if (page) {
                for (const widget of page.widgets) {
                    // Check if widget bounds intersect with lasso rect
                    const widgetRect = {
                        x1: widget.x,
                        y1: widget.y,
                        x2: widget.x + widget.width,
                        y2: widget.y + widget.height
                    };

                    const lassoRect = {
                        x1: x,
                        y1: y,
                        x2: x + w,
                        y2: y + h
                    };

                    const intersects = !(widgetRect.x2 < lassoRect.x1 ||
                        widgetRect.x1 > lassoRect.x2 ||
                        widgetRect.y2 < lassoRect.y1 ||
                        widgetRect.y1 > lassoRect.y2);

                    if (intersects) {
                        selectedIds.push(widget.id);
                    }
                }
            }

            if (canvasInstance.lassoState.isAdditive) {
                // Add new selections to existing ones, making sure we don't have duplicates
                const currentSelection = AppState.selectedWidgetIds || [];
                const combined = [...new Set([...currentSelection, ...selectedIds])];
                AppState.selectWidgets(combined);
            } else {
                AppState.selectWidgets(selectedIds);
            }
        } else {
            // Clicked without dragging - clear selection
            if (!canvasInstance.lassoState.isAdditive) {
                AppState.selectWidgets([]);
            }
        }

        canvasInstance.lassoState = null;
        render(canvasInstance);
    }
}

export function setupPanning(canvasInstance) {
    if (!canvasInstance.viewport) return;

    canvasInstance.viewport.addEventListener("mousedown", (ev) => {
        if (ev.button === 1) { // Middle button
            ev.preventDefault();
            ev.stopPropagation();

            canvasInstance.panState = {
                startX: ev.clientX,
                startY: ev.clientY,
                startPanX: canvasInstance.panX,
                startPanY: canvasInstance.panY
            };

            canvasInstance.viewport.style.cursor = "grabbing";
            document.body.classList.add("panning-active");

            const onPanningMove = (moveEv) => {
                if (canvasInstance.panState) {
                    const dx = moveEv.clientX - canvasInstance.panState.startX;
                    const dy = moveEv.clientY - canvasInstance.panState.startY;
                    canvasInstance.panX = canvasInstance.panState.startPanX + dx;
                    canvasInstance.panY = canvasInstance.panState.startPanY + dy;
                    applyZoom(canvasInstance);
                }
            };

            const onPanningUp = () => {
                canvasInstance.panState = null;
                canvasInstance.viewport.style.cursor = "auto";
                document.body.classList.remove("panning-active");
                window.removeEventListener("mousemove", onPanningMove);
                window.removeEventListener("mouseup", onPanningUp);
            };

            window.addEventListener("mousemove", onPanningMove);
            window.addEventListener("mouseup", onPanningUp);
        }
    });
}

export function setupZoomControls(canvasInstance) {
    // Zoom buttons
    const zoomInBtn = document.getElementById("zoomInBtn");
    const zoomOutBtn = document.getElementById("zoomOutBtn");
    const zoomResetBtn = document.getElementById("zoomResetBtn");
    const gridOpacityInput = document.getElementById("editorGridOpacity");

    if (zoomInBtn) {
        zoomInBtn.addEventListener("click", () => zoomIn());
    }
    if (zoomOutBtn) {
        zoomOutBtn.addEventListener("click", () => zoomOut());
    }
    if (zoomResetBtn) {
        zoomResetBtn.addEventListener("click", () => zoomReset(canvasInstance));
    }
    if (gridOpacityInput) {
        gridOpacityInput.addEventListener("input", (e) => {
            AppState.updateSettings({ grid_opacity: parseInt(e.target.value, 10) });
        });
    }

    // Mouse wheel zoom on canvas container
    if (canvasInstance.canvasContainer) {
        canvasInstance.canvasContainer.addEventListener("wheel", (ev) => {
            ev.preventDefault();
            handleWheelZoom(ev, canvasInstance);
        }, { passive: false });
    }

    // Capture wheel events on viewport (dark area)
    if (canvasInstance.viewport) {
        canvasInstance.viewport.addEventListener("wheel", (ev) => {
            ev.preventDefault();
            handleWheelZoom(ev, canvasInstance);
        }, { passive: false });
    }

    // Keyboard shortcuts for zoom
    document.addEventListener("keydown", (ev) => {
        if (ev.ctrlKey && (ev.key === "+" || ev.key === "=")) {
            ev.preventDefault();
            zoomIn();
        } else if (ev.ctrlKey && ev.key === "-") {
            ev.preventDefault();
            zoomOut();
        } else if (ev.ctrlKey && ev.key === "0") {
            ev.preventDefault();
            zoomReset(canvasInstance);
        } else if (ev.ctrlKey && ev.key.toLowerCase() === "r") {
            ev.preventDefault();
            zoomReset(canvasInstance);
        }
    });
}

function handleWheelZoom(ev, canvasInstance) {
    const oldZoom = AppState.zoomLevel;
    let delta = 0;

    // Detect pinch-to-zoom (Ctrl+wheel on trackpads or Ctrl+scroll on mouse)
    if (ev.ctrlKey) {
        delta = ev.deltaY > 0 ? -0.02 : 0.02;
    } else {
        // Detect if this is a mouse wheel vs touchpad scroll
        const isMouse = ev.deltaMode === 0 && ev.deltaX === 0 && Math.abs(ev.deltaY) >= 50;

        if (isMouse) {
            delta = ev.deltaY > 0 ? -0.05 : 0.05;
        } else {
            // Touchpad two-finger scroll: pan the canvas
            canvasInstance.panX -= ev.deltaX;
            canvasInstance.panY -= ev.deltaY;
            applyZoom(canvasInstance);
            return;
        }
    }

    if (delta === 0) return;

    const newZoom = Math.min(Math.max(oldZoom + delta, 0.1), 5.0);
    if (newZoom === oldZoom) return;

    // Get the mouse position relative to the viewport
    const viewportRect = canvasInstance.viewport.getBoundingClientRect();
    const mouseX = ev.clientX - viewportRect.left;
    const mouseY = ev.clientY - viewportRect.top;

    // Convert mouse position to canvas-space (before transformation)
    // CanvasPos = (MousePos - Pan) / Zoom
    const canvasX = (mouseX - canvasInstance.panX) / oldZoom;
    const canvasY = (mouseY - canvasInstance.panY) / oldZoom;

    // Calculate new pan so that the same canvas position stays under the mouse
    // MousePos = NewPan + CanvasPos * NewZoom
    // NewPan = MousePos - CanvasPos * NewZoom
    canvasInstance.panX = mouseX - canvasX * newZoom;
    canvasInstance.panY = mouseY - canvasY * newZoom;

    AppState.setZoomLevel(newZoom);
    applyZoom(canvasInstance);
}

export function zoomIn() {
    AppState.setZoomLevel(AppState.zoomLevel + 0.05);
}

export function zoomOut() {
    AppState.setZoomLevel(AppState.zoomLevel - 0.05);
}

export function zoomReset(canvasInstance) {
    AppState.setZoomLevel(1.0);
    // Focus the first page (Overview) to reset the view completely
    canvasInstance.focusPage(0, true);
}

export function setupDragAndDrop(canvasInstance) {
    if (!canvasInstance.canvas) return;

    canvasInstance.canvas.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "copy";
    });

    canvasInstance.canvas.addEventListener("drop", async (e) => {
        e.preventDefault();
        const type = e.dataTransfer.getData("application/widget-type");
        Logger.log("[Canvas] Drop detected type:", type);

        const artboardEl = e.target.closest(".artboard");
        if (!artboardEl) {
            Logger.warn("[Canvas] Drop outside of any artboard");
            return;
        }

        const pageIndex = parseInt(artboardEl.dataset.index, 10);
        if (AppState.currentPageIndex !== pageIndex) {
            AppState.setCurrentPageIndex(pageIndex);
        }

        if (type) {
            const rect = artboardEl.getBoundingClientRect();
            const zoom = AppState.zoomLevel;

            // Calculate position relative to the target artboard
            const x = (e.clientX - rect.left) / zoom;
            const y = (e.clientY - rect.top) / zoom;

            try {
                await PluginRegistry.load(type);
                const widget = WidgetFactory.createWidget(type);
                widget.x = Math.round(x - widget.width / 2);
                widget.y = Math.round(y - widget.height / 2);

                AppState.addWidget(widget);
            } catch (err) {
                Logger.error("[Canvas] error creating widget from drop:", err);
            }
        }
    });
}
