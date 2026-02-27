import { AppState } from './state';
import { on, EVENTS } from './events.js';
import { render, applyZoom, renderContextToolbar } from './canvas_renderer.js';
import { CanvasRulers } from './canvas_rulers.js';
import { setupInteractions, setupPanning, setupZoomControls, setupDragAndDrop, zoomIn, zoomOut, zoomReset, onMouseMove, onMouseUp } from './canvas_interactions.js';
import { setupTouchInteractions } from './canvas_touch.js';
import { clearSnapGuides, addSnapGuideVertical, addSnapGuideHorizontal, getSnapLines, applySnapToPosition } from './canvas_snap.js'; // eslint-disable-line no-unused-vars

export class Canvas {
    constructor() {
        this.canvas = document.getElementById("canvas");
        this.canvasContainer = document.getElementById("canvasContainer");
        this.viewport = document.querySelector(".canvas-viewport");
        this.dragState = null;
        this.panX = 0;
        this.panY = 0;

        // Touch state for mobile devices
        this.touchState = null;    // Single-touch widget drag state
        this.pinchState = null;    // Two-finger pinch/pan state
        this.lastTapTime = 0;      // Double-tap detection

        // External drag state (from palette)
        // Fixes race condition where auto-refresh destroys drop target
        this.isExternalDragging = false;

        // Focus suppression flag - set by Add Page to prevent jarring zoom
        this.suppressNextFocus = false;

        // Helper bindings for listeners that need removal reference
        // (Though interactions module manages them via direct reference or stored props)
        this._boundMouseMove = (ev) => onMouseMove(ev, this);
        this._boundMouseUp = (ev) => onMouseUp(ev, this);

        this.rulers = new CanvasRulers(this);

        this.init();
    }

    init() {
        // Subscribe to events
        on(EVENTS.STATE_CHANGED, () => this.render());
        on(EVENTS.PAGE_CHANGED, (e) => {
            this.render();

            // Check canvas-level suppression flag (set by Add Page placeholder)
            if (this.suppressNextFocus) {
                this.suppressNextFocus = false;
                this._lastFocusedIndex = e.index; // Sync index to avoid future triggers
                return;
            }

            // Focus the new page if explicitly requested (e.g. from sidebar or reset view)
            if (e.forceFocus) {
                this.focusPage(e.index, true, true);
            }

            // Sync the last focused index.
            this._lastFocusedIndex = e.index;
        });
        on(EVENTS.SELECTION_CHANGED, () => this.updateSelectionVisuals());
        on(EVENTS.SETTINGS_CHANGED, () => {
            this.render();
            this.applyZoom();
            this.rulers.update();
        });
        on(EVENTS.ZOOM_CHANGED, () => {
            this.applyZoom();
            this.rulers.update();
        });

        // Pages Header (clickable to fit all)
        const pagesHeader = document.getElementById('pagesHeader');
        if (pagesHeader) {
            pagesHeader.addEventListener('click', (e) => {
                // Only trigger if we aren't clicking the chevron (which is for collapsing)
                if (e.target.closest('.chevron')) return;
                this.zoomToFitAll();
            });
        }

        // Handle window resizing to keep canvas centered
        this._boundResize = () => {
            if (AppState.currentPageIndex !== -1) {
                // On resize, we want to maintain the fit if the user hasn't zoomed manually 
                // but for now let's just refocus with fit as a default smart behavior.
                this.focusPage(AppState.currentPageIndex, false, true);
            }
        };
        window.addEventListener("resize", this._boundResize);

        this.setupInteractions();
        this.render();
        this.applyZoom();

        // Start a 1-second interval to update time-dependent widgets (like datetime)
        if (this.updateInterval) clearInterval(this.updateInterval);
        this.updateInterval = setInterval(() => {
            // SKIP auto-render during active interaction to prevent DOM detachment
            if (this.touchState || this.pinchState || this.dragState || this.panState || this.lassoState || this.isExternalDragging) return;

            // Only re-render if there is a datetime widget on the current page to avoid unnecessary overhead
            const page = AppState.getCurrentPage();
            if (page && page.widgets.some(w => w.type === 'datetime')) {
                this.render();
            }
        }, 1000);
    }

    // --- Delegation Methods ---

    render() {
        render(this);
    }

    applyZoom() {
        applyZoom(this);
        if (this.rulers) this.rulers.update();
    }

    /**
     * Lightweight update for selection changes.
     * Updates widget `.active` classes without full DOM rebuild.
     */
    updateSelectionVisuals() {
        const selectedIds = AppState.selectedWidgetIds;
        const widgetEls = this.canvas.querySelectorAll('.widget');
        widgetEls.forEach(el => {
            const id = el.dataset.id;
            if (selectedIds.includes(id)) {
                el.classList.add('active');
            } else {
                el.classList.remove('active');
            }
        });

        // Re-render toolbar synchronously
        renderContextToolbar(this);
    }

    setupInteractions() {
        setupPanning(this);
        setupInteractions(this);
        setupZoomControls(this);
        setupDragAndDrop(this);
        setupTouchInteractions(this);

        // Grid View / Fit All button
        const fitAllBtn = document.getElementById('zoomToFitAllBtn');
        if (fitAllBtn) {
            fitAllBtn.onclick = () => this.zoomToFitAll();
        }
    }

    // Exposed methods for external callers (if any) or internal use
    zoomIn() { zoomIn(this); }
    zoomOut() { zoomOut(this); }
    zoomReset() { zoomReset(this); }
    zoomToFit() {
        if (AppState.currentPageIndex !== -1) {
            this.focusPage(AppState.currentPageIndex, true, true);
        }
    }
    zoomToFitAll(smooth = true) {
        import('./canvas_renderer.js').then(m => m.zoomToFitAll(this, smooth));
    }
    focusPage(index, smooth = true, fitZoom = false) {
        import('./canvas_renderer.js').then(m => m.focusPage(this, index, smooth, fitZoom));
    }

    /**
     * Clean up resources when destroying the canvas.
     */
    destroy() {
        // Stop the update interval
        if (this.updateInterval) {
            clearInterval(this.updateInterval);
            this.updateInterval = null;
        }

        // Remove window listeners
        if (this._boundResize) {
            window.removeEventListener("resize", this._boundResize);
        }

        // Assuming we rely on page refresh for now, but good practice to clear timers.
    }
}
