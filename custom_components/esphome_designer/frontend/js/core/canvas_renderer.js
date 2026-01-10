import { AppState } from './state.js';
import { registry as FeatureRegistry } from './plugin_registry.js';
import { Logger } from '../utils/logger.js';
import { getColorStyle } from '../utils/device.js';

export function render(canvasInstance) {
    if (!canvasInstance.canvas) return;

    const page = AppState.getCurrentPage();
    const existingGrid = canvasInstance.canvas.querySelector(".canvas-grid");
    const existingGuides = canvasInstance.canvas.querySelectorAll(".snap-guide");
    const existingLasso = canvasInstance.canvas.querySelector(".lasso-selection");

    canvasInstance.canvas.innerHTML = "";

    // Ensure grid exists if enabled
    if (AppState.showGrid) {
        let grid = existingGrid;
        if (!grid) {
            grid = document.createElement("div");
            grid.className = "canvas-grid";
        }
        canvasInstance.canvas.appendChild(grid);
    }

    existingGuides.forEach((g) => canvasInstance.canvas.appendChild(g));
    if (existingLasso) canvasInstance.canvas.appendChild(existingLasso);

    // Apply orientation/size
    const dims = AppState.getCanvasDimensions();
    canvasInstance.canvas.style.width = `${dims.width}px`;
    canvasInstance.canvas.style.height = `${dims.height}px`;

    // Apply device shape (e.g. round)
    const shape = AppState.getCanvasShape();

    if (shape === "round") {
        canvasInstance.canvas.style.borderRadius = "50%";
        canvasInstance.canvas.style.overflow = "hidden";
        canvasInstance.canvas.style.boxShadow = "0 0 0 10px rgba(0,0,0,0.1)"; // Optional: hint at the bezel
    } else {
        canvasInstance.canvas.style.borderRadius = "0";
        canvasInstance.canvas.style.overflow = "visible";
        canvasInstance.canvas.style.boxShadow = "none";
    }

    // Apply dark mode/theme
    if (AppState.settings.editor_light_mode) {
        canvasInstance.canvas.classList.add("light-mode");
    } else {
        canvasInstance.canvas.classList.remove("light-mode");
    }

    // Apply black background mode for canvas preview (per-page overrides global)
    const effectiveDarkMode = getEffectiveDarkMode();
    if (effectiveDarkMode) {
        canvasInstance.canvas.classList.add("dark");
        if (canvasInstance.viewport) canvasInstance.viewport.classList.add("device-dark-mode");
    } else {
        canvasInstance.canvas.classList.remove("dark");
        if (canvasInstance.viewport) canvasInstance.viewport.classList.remove("device-dark-mode");
    }

    // Render LVGL grid overlay if page has grid layout
    if (page && page.layout && /^\d+x\d+$/.test(page.layout)) {
        renderLvglGridOverlay(canvasInstance, page.layout, dims, effectiveDarkMode);
    }

    if (!page) return;

    for (const widget of page.widgets) {
        const el = document.createElement("div");
        el.className = "widget";
        el.style.left = widget.x + "px";
        el.style.top = widget.y + "px";
        el.style.width = widget.width + "px";
        el.style.height = widget.height + "px";
        el.dataset.id = widget.id;

        // Accessibility
        el.role = "region";
        const widgetLabel = widget.title || widget.id;
        el.setAttribute("aria-label", `${widget.type} widget: ${widgetLabel}`);
        el.title = `${widget.type} (${widgetLabel})`;

        if (AppState.selectedWidgetIds.includes(widget.id)) {
            el.classList.add("active");
        }

        if (widget.locked) {
            el.classList.add("locked");
        }

        if (widget.hidden) {
            el.classList.add("hidden-widget");
        }

        const type = (widget.type || "").toLowerCase();

        // Feature Registry Integration
        const feature = FeatureRegistry ? FeatureRegistry.get(type) : null;
        if (feature && feature.render) {
            try {
                // Wrap getColorStyle to be theme-aware
                const wrappedGetColorStyle = (color) => {
                    const pageTheme = getEffectiveDarkMode() ? 'dark' : 'light';
                    if (!color) {
                        return pageTheme === 'dark' ? '#ffffff' : '#000000';
                    }
                    return getColorStyle(color);
                };
                feature.render(el, widget, { getColorStyle: wrappedGetColorStyle });
            } catch (err) {
                Logger.error(`[Canvas] Error rendering widget '${widget.id}' (${type}):`, err);
                el.textContent = `Error: ${type}`;
                el.style.border = "2px solid red";
                el.style.backgroundColor = "rgba(255,0,0,0.1)";
                el.style.display = "flex";
                el.style.alignItems = "center";
                el.style.justifyContent = "center";
            }
            addResizeHandle(el);
            canvasInstance.canvas.appendChild(el);
            continue;
        } else if (FeatureRegistry) {
            // If not found, try to load it asynchronously
            FeatureRegistry.load(type).then(loadedFeature => {
                if (loadedFeature) {
                    Logger.log(`[Canvas] Feature '${type}' loaded, triggering re-render.`);
                    // Ideally we call render again, but we need access to the instance method or pass the instance
                    // Since we have canvasInstance passed in, we can call the main render method on it 
                    // IF canvasInstance has a render method delegating to this, OR we recurse.
                    // To avoid infinite loops or complexity, we'll try to call a method on the instance if it exists, 
                    // or just re-run this export.
                    if (typeof canvasInstance.render === 'function') {
                        canvasInstance.render();
                    } else {
                        render(canvasInstance);
                    }
                }
            });

            // Debug: log when falling back to legacy
            Logger.warn(`[Canvas] No FeatureRegistry render for type '${type}', using legacy while loading...`);
        } else {
            Logger.error(`[Canvas] FeatureRegistry not defined!`);
        }

        // Fallback for missing or failing features
        if (!feature || (feature && !feature.render)) {
            // Display Missing Plugin Error
            el.innerText = `Missing Plugin: ${type}`;
            el.style.display = "flex";
            el.style.alignItems = "center";
            el.style.justifyContent = "center";
            el.style.fontSize = "10px";
            el.style.color = "red";
            el.style.border = "1px dashed red";
            el.style.backgroundColor = "rgba(255, 0, 0, 0.05)";
            el.style.overflow = "hidden";
            el.style.textAlign = "center";

            addResizeHandle(el);
            canvasInstance.canvas.appendChild(el);
        }
    }
}

export function applyZoom(canvasInstance) {
    const zoom = AppState.zoomLevel;
    const dims = AppState.getCanvasDimensions();
    const settings = AppState.settings;

    if (canvasInstance.canvas) {
        canvasInstance.canvas.style.transform = `scale(${zoom})`;
        // Change transform origin to 0 0 for predictable scrolling container
        canvasInstance.canvas.style.transformOrigin = "0 0";
    }

    if (canvasInstance.canvasContainer) {
        // Apply panning via transform on the container
        canvasInstance.canvasContainer.style.transform = `translate(${canvasInstance.panX}px, ${canvasInstance.panY}px)`;

        // Force the container to match the scaled size so parents overflow correctly
        canvasInstance.canvasContainer.style.width = (dims.width * zoom) + "px";
        canvasInstance.canvasContainer.style.height = (dims.height * zoom) + "px";
    }

    // Apply grid opacity
    const opacity = (settings.grid_opacity !== undefined ? settings.grid_opacity : 8) / 100;
    document.documentElement.style.setProperty('--grid-opacity', opacity.toString());

    // Update zoom level display
    const zoomLevelEl = document.getElementById("zoomLevel");
    if (zoomLevelEl) {
        zoomLevelEl.textContent = Math.round(zoom * 100) + "%";
    }
}

export function updateWidgetDOM(canvasInstance, widget) {
    if (!widget || !widget.id) return;
    const el = canvasInstance.canvas.querySelector(`.widget[data-id="${widget.id}"]`);
    if (el) {
        el.style.left = widget.x + "px";
        el.style.top = widget.y + "px";
        el.style.width = widget.width + "px";
        el.style.height = widget.height + "px";

        // Re-render plugin logic for real-time updates (e.g. font-size in icons)
        const type = (widget.type || "").toLowerCase();
        const feature = FeatureRegistry ? FeatureRegistry.get(type) : null;
        if (feature && feature.render) {
            try {
                const wrappedGetColorStyle = (color) => {
                    const pageTheme = getEffectiveDarkMode() ? 'dark' : 'light';
                    if (!color) {
                        return pageTheme === 'dark' ? '#ffffff' : '#000000';
                    }
                    return getColorStyle(color);
                };
                feature.render(el, widget, { getColorStyle: wrappedGetColorStyle });
            } catch (err) {
                // Silent fail for minor real-time updates to keep performance high
            }
        }
    }
}

export function getEffectiveDarkMode() {
    const page = AppState.getCurrentPage();
    const pageDarkMode = page?.dark_mode;

    // "inherit" or undefined = use global setting
    // "dark" = force dark mode
    // "light" = force light mode
    if (pageDarkMode === "dark") return true;
    if (pageDarkMode === "light") return false;
    return !!AppState.settings.dark_mode;
}

function renderLvglGridOverlay(canvasInstance, layout, dims, isDark) {
    const match = layout.match(/^(\d+)x(\d+)$/);
    if (!match) return;

    const rows = parseInt(match[1], 10);
    const cols = parseInt(match[2], 10);

    // Create grid container
    const gridOverlay = document.createElement("div");
    gridOverlay.className = "lvgl-grid-overlay";
    gridOverlay.style.cssText = `
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        display: grid;
        grid-template-rows: repeat(${rows}, 1fr);
        grid-template-columns: repeat(${cols}, 1fr);
        pointer-events: none;
        z-index: 1;
    `;

    const lineColor = isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)";
    const labelColor = isDark ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)";

    // Create grid cells with labels
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement("div");
            cell.style.cssText = `
                border: 1px dashed ${lineColor};
                position: relative;
                box-sizing: border-box;
            `;

            // Add label in top-left corner
            const label = document.createElement("span");
            label.textContent = `${r},${c}`;
            label.style.cssText = `
                position: absolute;
                top: 2px; left: 4px;
                font-size: 10px;
                color: ${labelColor};
                font-family: monospace;
                pointer-events: none;
            `;
            cell.appendChild(label);
            gridOverlay.appendChild(cell);
        }
    }

    canvasInstance.canvas.appendChild(gridOverlay);
}

function addResizeHandle(el) {
    const handle = document.createElement("div");
    handle.className = "widget-resize-handle";
    el.appendChild(handle);
}
