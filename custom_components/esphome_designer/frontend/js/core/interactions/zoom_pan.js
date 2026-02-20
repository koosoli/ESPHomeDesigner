import { AppState } from '../state.js';
import { Logger } from '../../utils/logger.js';
import { emit, EVENTS } from '../events.js';
import { applyZoom } from '../canvas_renderer.js';

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
    const gridToggleBtn = document.getElementById("gridToggleBtn");
    const debugGridToggleBtn = document.getElementById("debugGridToggleBtn");
    const rulersToggleBtn = document.getElementById("rulersToggleBtn");
    const gridOpacityInput = document.getElementById("editorGridOpacity");

    if (zoomInBtn) {
        zoomInBtn.addEventListener("click", () => zoomIn(canvasInstance));
    }
    if (zoomOutBtn) {
        zoomOutBtn.addEventListener("click", () => zoomOut(canvasInstance));
    }
    if (zoomResetBtn) {
        zoomResetBtn.addEventListener("click", () => zoomReset(canvasInstance));
    }
    if (gridToggleBtn) {
        gridToggleBtn.classList.toggle("active", !!AppState.showGrid);
        gridToggleBtn.addEventListener("click", () => {
            const newState = !AppState.showGrid;
            AppState.setShowGrid(newState);

            // Exclusive: If Grid ON, Debug OFF
            if (newState) {
                AppState.setShowDebugGrid(false);
                if (debugGridToggleBtn) debugGridToggleBtn.classList.remove("active");
            }

            gridToggleBtn.classList.toggle("active", newState);
            emit(EVENTS.STATE_CHANGED);
        });
    }

    if (debugGridToggleBtn) {
        debugGridToggleBtn.classList.toggle("active", !!AppState.showDebugGrid);
        debugGridToggleBtn.addEventListener("click", () => {
            const newState = !AppState.showDebugGrid;
            AppState.setShowDebugGrid(newState);

            // Exclusive: If Debug ON, Grid OFF
            if (newState) {
                AppState.setShowGrid(false);
                if (gridToggleBtn) gridToggleBtn.classList.remove("active");
            }

            debugGridToggleBtn.classList.toggle("active", newState);
            emit(EVENTS.STATE_CHANGED);
        });
    }

    if (rulersToggleBtn) {
        // Sync initial UI
        rulersToggleBtn.classList.toggle("active", !!AppState.showRulers);

        rulersToggleBtn.addEventListener("click", () => {
            const newState = !AppState.showRulers;
            AppState.setShowRulers(newState);
            rulersToggleBtn.classList.toggle("active", newState);
            Logger.log(`[Canvas] Rulers toggled: ${newState}`);
        });
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
            zoomIn(canvasInstance);
        } else if (ev.ctrlKey && ev.key === "-") {
            ev.preventDefault();
            zoomOut(canvasInstance);
        } else if (ev.ctrlKey && ev.key === "0") {
            ev.preventDefault();
            zoomReset(canvasInstance);
        } else if (ev.ctrlKey && ev.key.toLowerCase() === "r") {
            ev.preventDefault();
            zoomReset(canvasInstance);
        } else if (ev.ctrlKey && ev.key.toLowerCase() === "g") {
            ev.preventDefault();
            if (ev.shiftKey) {
                AppState.ungroupSelection();
            } else {
                AppState.groupSelection();
            }
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

export function zoomIn(canvasInstance) {
    performZoom(0.05, canvasInstance);
}

export function zoomOut(canvasInstance) {
    performZoom(-0.05, canvasInstance);
}

function performZoom(delta, canvasInstance) {
    const oldZoom = AppState.zoomLevel;
    const newZoom = Math.min(Math.max(oldZoom + delta, 0.1), 5.0);
    if (newZoom === oldZoom) return;

    if (canvasInstance && canvasInstance.viewport) {
        const viewportRect = canvasInstance.viewport.getBoundingClientRect();
        const centerX = viewportRect.width / 2;
        const centerY = viewportRect.height / 2;

        // Convert viewport center to canvas-space (before transformation)
        const canvasX = (centerX - canvasInstance.panX) / oldZoom;
        const canvasY = (centerY - canvasInstance.panY) / oldZoom;

        // Calculate new pan so that the same canvas position stays under the center
        canvasInstance.panX = centerX - canvasX * newZoom;
        canvasInstance.panY = centerY - canvasY * newZoom;
    }

    AppState.setZoomLevel(newZoom);
    if (canvasInstance) {
        applyZoom(canvasInstance);
    }
}

export function zoomReset(canvasInstance) {
    AppState.setZoomLevel(1.0);
    // Focus the current page to reset the view on what the user is working on
    canvasInstance.focusPage(AppState.currentPageIndex, true);
}
