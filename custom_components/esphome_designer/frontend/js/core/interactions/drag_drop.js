// @ts-check
import { AppState } from '../state';
import { Logger } from '../../utils/logger.js';
import { WidgetFactory } from '../widget_factory';
import { registry } from '../plugin_registry.js';

/**
 * @param {any} canvasInstance
 */
export function setupDragAndDrop(canvasInstance) {
    // Attach listeners to the viewport container instead of the canvas element
    if (!canvasInstance.viewport) return;

    canvasInstance.viewport.addEventListener("dragenter", (/** @type {DragEvent} */ _e) => {
        // Guard against internal widget drags triggering this
        if (!canvasInstance.dragState) {
            canvasInstance.isExternalDragging = true;
        }
    });

    canvasInstance.viewport.addEventListener("dragover", (/** @type {DragEvent} */ e) => {
        e.preventDefault();
        if (e.dataTransfer) {
            e.dataTransfer.dropEffect = "copy";
        }

        if (!canvasInstance.dragState) {
            canvasInstance.isExternalDragging = true;
        }

        const target = /** @type {HTMLElement} */ (e.target);
        const wrapper = target.closest(".artboard-wrapper");
        document.querySelectorAll(".artboard-wrapper.drag-over").forEach(el => {
            if (el !== wrapper) el.classList.remove("drag-over");
        });
        if (wrapper) wrapper.classList.add("drag-over");

        const placeholder = /** @type {HTMLElement} */ (e.target).closest(".add-page-placeholder");
        if (placeholder) placeholder.classList.add("drag-over");
        else {
            const el = document.querySelector(".add-page-placeholder.drag-over");
            if (el) el.classList.remove("drag-over");
        }
    });

    canvasInstance.viewport.addEventListener("dragleave", (/** @type {DragEvent} */ e) => {
        if (e.relatedTarget === null || !canvasInstance.viewport.contains(/** @type {Node} */(e.relatedTarget))) {
            canvasInstance.isExternalDragging = false;
            document.querySelectorAll(".artboard-wrapper.drag-over, .add-page-placeholder.drag-over").forEach(el => {
                el.classList.remove("drag-over");
            });
        }
    });

    canvasInstance.viewport.addEventListener("drop", async (/** @type {DragEvent} */ e) => {
        e.preventDefault();
        e.stopPropagation();

        canvasInstance.isExternalDragging = false;

        document.querySelectorAll(".artboard-wrapper.drag-over, .add-page-placeholder.drag-over").forEach(el => {
            el.classList.remove("drag-over");
        });

        const dataTransfer = e.dataTransfer;
        if (!dataTransfer) return;

        const type = dataTransfer.getData("application/widget-type") || dataTransfer.getData("text/plain");
        if (!type) return;

        const clientX = e.clientX;
        const clientY = e.clientY;

        let targetEl = e.target;
        if (targetEl === canvasInstance.viewport) {
            targetEl = document.elementFromPoint(clientX, clientY);
        }

        const artboardWrapper = targetEl instanceof HTMLElement ? targetEl.closest(".artboard-wrapper") : null;
        const placeholder = targetEl instanceof HTMLElement ? targetEl.closest(".add-page-placeholder") : null;

        let targetPageIndex = -1;
        let targetRect = null;

        if (artboardWrapper instanceof HTMLElement) {
            targetPageIndex = parseInt(artboardWrapper.dataset.index || "-1", 10);
            const artboardEl = artboardWrapper.querySelector(".artboard");
            if (artboardEl) targetRect = artboardEl.getBoundingClientRect();
        } else if (placeholder instanceof HTMLElement) {
            targetPageIndex = AppState.pages.length;
        } else {
            targetPageIndex = AppState.currentPageIndex;
            const artboardEl = canvasInstance.canvas.querySelector(`.artboard[data-index="${targetPageIndex}"]`);
            if (artboardEl) targetRect = artboardEl.getBoundingClientRect();
        }

        Logger.log("[Canvas] Atomic drop capture - type:", type, "page:", targetPageIndex);

        try {
            const loadPromise = registry.load(type);

            if (placeholder) {
                const newPage = AppState.addPage();
                if (!newPage) return;
                targetPageIndex = AppState.pages.length - 1;
                await new Promise(resolve => setTimeout(resolve, 50));
                const newArtboard = canvasInstance.canvas.querySelector(`.artboard[data-index="${targetPageIndex}"]`);
                if (newArtboard) targetRect = newArtboard.getBoundingClientRect();
            }

            await loadPromise;

            const widget = WidgetFactory.createWidget(type);
            if (!widget) {
                Logger.error("[Canvas] WidgetFactory.createWidget returned null for type:", type);
                return;
            }

            const zoom = AppState.zoomLevel;
            const dims = AppState.getCanvasDimensions();

            if (targetRect) {
                const x = (clientX - targetRect.left) / zoom;
                const y = (clientY - targetRect.top) / zoom;

                widget.x = Math.round(x - widget.width / 2);
                widget.y = Math.round(y - widget.height / 2);
            } else {
                Logger.warn("[Canvas] No targetRect, using fallback position");
                widget.x = 40;
                widget.y = 40;
            }

            widget.x = Math.max(0, Math.min(dims.width - widget.width, widget.x));
            widget.y = Math.max(0, Math.min(dims.height - widget.height, widget.y));

            canvasInstance.suppressNextFocus = true;

            AppState.addWidget(widget, targetPageIndex);

            if (AppState.currentPageIndex !== targetPageIndex) {
                AppState.setCurrentPageIndex(targetPageIndex);
            }
            AppState.selectWidget(widget.id, false);

            Logger.log(`[Canvas] Successfully added ${type} at (${widget.x}, ${widget.y})`);
        } catch (err) {
            Logger.error("[Canvas] error creating widget from drop:", err);
        }
    });
}
