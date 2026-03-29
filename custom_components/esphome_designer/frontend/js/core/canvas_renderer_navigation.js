// @ts-check
import { DEVICE_PROFILES } from '../io/devices.js';
import { AppState } from './state';
import { getColorStyle } from '../utils/device.js';
import { registry } from './plugin_registry.js';

/**
 * @param {any} canvasInstance
 * @param {string} key
 * @param {() => void} measureFn
 * @returns {void}
 */
function scheduleLayoutMeasurement(canvasInstance, key, measureFn) {
    if (!canvasInstance || typeof measureFn !== 'function') return;

    const existingHandle = canvasInstance[key];
    if (existingHandle) {
        cancelAnimationFrame(existingHandle);
    }

    canvasInstance[key] = requestAnimationFrame(() => {
        canvasInstance[key] = 0;
        measureFn();
    });
}

/** @param {any} page */
export function getPageEffectiveDarkMode(page) {
    const pageDarkMode = page?.dark_mode;
    if (pageDarkMode === "dark") return true;
    if (pageDarkMode === "light") return false;
    return !!AppState.settings.darkMode;
}

/**
 * Determines the effective dark mode status for the current context.
 * This considers the current page's dark_mode setting, falling back to global settings.
 * @returns {boolean} True if dark mode is effective, false otherwise.
 */
export function getEffectiveDarkMode() {
    const activePage = AppState.getCurrentPage();
    if (activePage) return getPageEffectiveDarkMode(activePage);
    return false;
}

/** @param {any} canvasInstance */
export function applyZoom(canvasInstance) {
    const zoom = AppState.zoomLevel;
    const settings = AppState.settings;

    if (canvasInstance.canvasContainer) {
        // Use a single transform for both pan and zoom for predictable focal point math
        canvasInstance.canvasContainer.style.transform =
            `translate(${canvasInstance.panX}px, ${canvasInstance.panY}px) scale(${zoom})`;
        canvasInstance.canvasContainer.style.transformOrigin = "0 0";
    }

    // Apply grid opacity
    const opacity = (settings.grid_opacity !== undefined ? Number(settings.grid_opacity) : 8) / 100;
    document.documentElement.style.setProperty('--grid-opacity', opacity.toString());

    // Update zoom level display
    const zoomLevelEl = document.getElementById("zoomLevel");
    if (zoomLevelEl) {
        zoomLevelEl.textContent = Math.round(zoom * 100) + "%";
    }
}

/**
 * Centrally focuses an artboard in the viewport by adjusting panX/panY.
 * @param {import('./canvas').Canvas} canvasInstance
 * @param {number} index
 * @param {boolean} [smooth=true]
 * @param {boolean} [fitZoom=false]
 */
export function focusPage(canvasInstance, index, smooth = true, fitZoom = false) {
    scheduleLayoutMeasurement(canvasInstance, '_focusPageRaf', () => {
        const wrappers = canvasInstance.canvas.querySelectorAll('.artboard-wrapper');
        const target = wrappers[index];
        if (!target) return;

        const viewportRect = canvasInstance.viewport.getBoundingClientRect();
        const vw = viewportRect.width;
        const vh = viewportRect.height;

        // If viewport has no size yet, defer again to avoid off-screen jumps.
        if (vw === 0 || vh === 0) {
            focusPage(canvasInstance, index, smooth, fitZoom);
            return;
        }

        if (fitZoom) {
            const fitScale = calculateZoomToFit(canvasInstance, index);
            AppState.setZoomLevel(fitScale);
        }

        const zoom = AppState.zoomLevel;
        const hTarget = /** @type {HTMLElement} */(target);
        const targetX = hTarget.offsetLeft + (hTarget.offsetWidth / 2);
        const targetY = hTarget.offsetTop + (hTarget.offsetHeight / 2);

        canvasInstance.panX = (vw / 2) - (targetX * zoom);
        canvasInstance.panY = (vh / 2) - (targetY * zoom);

        applyZoom(canvasInstance);
    });
}

/**
 * Zooms and pans to show all artboards in the viewport.
 * @param {import('./canvas').Canvas} canvasInstance
 * @param {boolean} [_smooth=true]
 */
export function zoomToFitAll(canvasInstance, _smooth = true) {
    scheduleLayoutMeasurement(canvasInstance, '_zoomToFitAllRaf', () => {
        const wrappers = canvasInstance.canvas.querySelectorAll('.artboard-wrapper');
        if (wrappers.length === 0) return;

        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;

        wrappers.forEach(wrapper => {
            const hWrapper = /** @type {HTMLElement} */(wrapper);
            const x = hWrapper.offsetLeft;
            const y = hWrapper.offsetTop;
            const w = hWrapper.offsetWidth;
            const h = hWrapper.offsetHeight;

            minX = Math.min(minX, x);
            minY = Math.min(minY, y);
            maxX = Math.max(maxX, x + w);
            maxY = Math.max(maxY, y + h);
        });

        const viewportRect = canvasInstance.viewport.getBoundingClientRect();
        const vw = viewportRect.width;
        const vh = viewportRect.height;
        if (vw === 0 || vh === 0) return;

        const padding = 80;
        const boxW = (maxX - minX) + padding;
        const boxH = (maxY - minY) + padding;
        const scaleX = vw / boxW;
        const scaleY = vh / boxH;
        let fitScale = Math.min(scaleX, scaleY);

        fitScale = Math.max(0.05, Math.min(2.0, fitScale));
        AppState.setZoomLevel(fitScale);

        const centerX = minX + (maxX - minX) / 2;
        const centerY = minY + (maxY - minY) / 2;

        canvasInstance.panX = (vw / 2) - (centerX * fitScale);
        canvasInstance.panY = (vh / 2) - (centerY * fitScale);

        applyZoom(canvasInstance);
    });
}

/**
 * Calculates the zoom level required to fit the current artboard fully within the viewport.
 * Uses a device-aware minimum floor to prevent excessive zoom-out on small screens.
 * @param {import('./canvas').Canvas} canvasInstance
 * @param {number} [index=AppState.currentPageIndex]
 * @returns {number}
 */
export function calculateZoomToFit(canvasInstance, index = AppState.currentPageIndex) {
    const wrappers = canvasInstance.canvas.querySelectorAll('.artboard-wrapper');
    const target = wrappers[index];
    if (!target) return 1.0;

    const viewportRect = canvasInstance.viewport.getBoundingClientRect();
    const padding = 64; // Visual safety padding around the artboard

    const hTarget = /** @type {HTMLElement} */(target);
    const targetW = hTarget.offsetWidth + padding;
    const targetH = hTarget.offsetHeight + padding;

    const scaleX = viewportRect.width / targetW;
    const scaleY = viewportRect.height / targetH;

    // We want to fit both dimensions, so take the minimum scale
    const fitScale = Math.min(scaleX, scaleY);

    // Calculate a device-aware minimum zoom floor
    // For small viewports, we allow zooming out much further to ensure full visibility
    const viewportSmallestDim = Math.min(viewportRect.width, viewportRect.height);
    const minZoomFloor = Math.max(0.15, Math.min(1.0, viewportSmallestDim / 800));

    // Smart Magnification: for very small devices (e.g. 100x100), allow zooming in up to 4x
    // to ensure the artboard is actually usable in the preview.
    const maxZoomCeiling = 4.0;

    // Clamp between the device-aware floor and the magnification ceiling
    return Math.max(minZoomFloor, Math.min(maxZoomCeiling, fitScale));
}

/**
 * @param {import('./canvas').Canvas} canvasInstance
 * @param {Widget} widget
 * @param {boolean} [skipPluginRender=false]
 */
export function updateWidgetDOM(canvasInstance, widget, skipPluginRender = false) {
    if (!widget || !widget.id) return;
    const el = /** @type {HTMLElement} */ (canvasInstance.canvas.querySelector(`.widget[data-id="${widget.id}"]`));
    if (el) {
        const hEl = /** @type {HTMLElement} */(el);
        hEl.style.left = widget.x + "px";
        hEl.style.top = widget.y + "px";
        hEl.style.width = widget.width + "px";
        hEl.style.height = widget.height + "px";

        // Re-render plugin logic for real-time updates (e.g. font-size in icons)
        const type = (widget.type || "").toLowerCase();
        const feature = registry ? registry.get(type) : null;

        if (type === 'group') {
            el.classList.add('widget-group');
        } else if (!skipPluginRender && feature && feature.render) {
            try {
                /** @param {string | undefined} colorName */
                const wrappedGetColorStyle = (colorName) => {
                    if (colorName === 'theme_auto') return getEffectiveDarkMode() ? '#ffffff' : '#000000';
                    if (colorName === 'theme_auto_inverse') return getEffectiveDarkMode() ? '#000000' : '#ffffff';

                    if (!colorName) return getEffectiveDarkMode() ? '#ffffff' : '#000000';
                    return getColorStyle(colorName);
                };

                const isSelected = AppState.selectedWidgetIds.includes(widget.id);
                const deviceModel = AppState.settings.device_model || 'reterminal_e1001';
                const profiles = /** @type {Record<string, any>} */ (DEVICE_PROFILES);
                const profile = profiles ? profiles[deviceModel] : null;

                feature.render(el, widget, {
                    getColorStyle: wrappedGetColorStyle,
                    selected: isSelected,
                    profile: profile,
                    isDark: getEffectiveDarkMode()
                });

                // Central opacity application — drives the canvas preview for all plugins
                const opa = widget.props?.opacity;
                if (opa !== undefined && opa < 100) {
                    el.style.opacity = String(opa / 100);
                } else {
                    el.style.opacity = '';
                }
            } catch {
                // Silent fail for minor real-time updates to keep performance high
            }
        }
    }
}



