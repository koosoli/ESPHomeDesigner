import { AppState } from './state.js';
import { registry as FeatureRegistry } from './plugin_registry.js';
import { Logger } from '../utils/logger.js';
import { getColorStyle } from '../utils/device.js';

export function render(canvasInstance) {
    if (!canvasInstance.canvas) return;

    const pages = AppState.pages;
    const dims = AppState.getCanvasDimensions();

    // Maintain lasso and snap guides if they existed (though they might need artboard-specific logic)
    const existingGuides = canvasInstance.canvas.querySelectorAll(".snap-guide");
    const existingLasso = canvasInstance.canvas.querySelector(".lasso-selection");

    canvasInstance.canvas.innerHTML = "";

    // Apply global editor theme to the stage
    if (AppState.settings.editor_light_mode) {
        canvasInstance.canvas.classList.add("light-mode");
    } else {
        canvasInstance.canvas.classList.remove("light-mode");
    }

    // Apply viewport contrast based on the active page
    const activePage = AppState.getCurrentPage();
    if (activePage && getPageEffectiveDarkMode(activePage)) {
        if (canvasInstance.viewport) canvasInstance.viewport.classList.add("device-dark-mode");
    } else {
        if (canvasInstance.viewport) canvasInstance.viewport.classList.remove("device-dark-mode");
    }

    // Render each page as an artboard
    pages.forEach((page, index) => {
        const artboardWrapper = document.createElement("div");
        artboardWrapper.className = "artboard-wrapper";
        if (index === AppState.currentPageIndex) {
            artboardWrapper.classList.add("active-page");
        }

        // 1. Render Artboard Header
        const header = document.createElement("div");
        header.className = "artboard-header";

        const nameLabel = document.createElement("span");
        nameLabel.className = "artboard-name";
        nameLabel.textContent = page.name || `Page ${index + 1}`;
        header.appendChild(nameLabel);

        const actions = document.createElement("div");
        actions.className = "artboard-actions";

        // Reorder buttons
        if (index > 0) {
            const moveLeft = createIconButton("‹", "Move Left", () => {
                AppState.reorderPage(index, index - 1);
            });
            actions.appendChild(moveLeft);
        }
        if (index < pages.length - 1) {
            const moveRight = createIconButton("›", "Move Right", () => {
                AppState.reorderPage(index, index + 1);
            });
            actions.appendChild(moveRight);
        }

        // Settings button
        const settingsBtn = createIconButton("⚙", "Page Settings", () => {
            if (window.pageSettings) window.pageSettings.open(index);
        });
        actions.appendChild(settingsBtn);

        header.appendChild(actions);
        artboardWrapper.appendChild(header);

        // 2. Render Artboard Content
        const artboard = document.createElement("div");
        artboard.className = "artboard";
        artboard.dataset.index = index;
        artboard.style.width = `${dims.width}px`;
        artboard.style.height = `${dims.height}px`;

        // Apply page-specific theme
        const isDark = getPageEffectiveDarkMode(page);
        if (isDark) {
            artboard.classList.add("dark");
        } else {
            artboard.classList.remove("dark");
        }

        // Apply grid if enabled
        if (AppState.showGrid) {
            const grid = document.createElement("div");
            grid.className = "canvas-grid";
            artboard.appendChild(grid);
        }

        // Render LVGL grid overlay if page has grid layout
        if (page.layout && /^\d+x\d+$/.test(page.layout)) {
            renderLvglGridOverlayToElement(artboard, page.layout, dims, isDark);
        }

        // Render widgets
        for (const widget of page.widgets) {
            const el = document.createElement("div");
            el.className = "widget";
            el.style.left = widget.x + "px";
            el.style.top = widget.y + "px";
            el.style.width = widget.width + "px";
            el.style.height = widget.height + "px";
            el.dataset.id = widget.id;
            el.dataset.pageIndex = index;

            if (AppState.selectedWidgetIds.includes(widget.id)) {
                el.classList.add("active");
            }
            if (widget.locked) el.classList.add("locked");
            if (widget.hidden) el.classList.add("hidden-widget");

            const type = (widget.type || "").toLowerCase();
            const feature = FeatureRegistry ? FeatureRegistry.get(type) : null;

            if (feature && feature.render) {
                try {
                    const wrappedGetColorStyle = (color) => {
                        if (!color) return isDark ? '#ffffff' : '#000000';
                        return getColorStyle(color);
                    };
                    feature.render(el, widget, { getColorStyle: wrappedGetColorStyle });
                } catch (err) {
                    el.textContent = `Error: ${type}`;
                    el.style.border = "2px solid red";
                }
            } else {
                el.innerText = `Missing: ${type}`;
                el.style.color = "red";
                el.style.border = "1px dashed red";
            }

            addResizeHandle(el);
            artboard.appendChild(el);
        }

        artboardWrapper.appendChild(artboard);
        canvasInstance.canvas.appendChild(artboardWrapper);
    });

    // Re-add selection helpers if they existed
    existingGuides.forEach((g) => canvasInstance.canvas.appendChild(g));
    if (existingLasso) canvasInstance.canvas.appendChild(existingLasso);
}

function createIconButton(text, title, onClick) {
    const btn = document.createElement("button");
    btn.className = "artboard-btn";
    btn.innerHTML = text;
    btn.title = title;
    btn.onclick = (e) => {
        e.stopPropagation();
        onClick();
    };
    return btn;
}

function getPageEffectiveDarkMode(page) {
    const pageDarkMode = page?.dark_mode;
    if (pageDarkMode === "dark") return true;
    if (pageDarkMode === "light") return false;
    return !!AppState.settings.dark_mode;
}

function renderLvglGridOverlayToElement(element, layout, dims, isDark) {
    const match = layout.match(/^(\d+)x(\d+)$/);
    if (!match) return;

    const rows = parseInt(match[1], 10);
    const cols = parseInt(match[2], 10);

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

    const lineColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)";
    const labelColor = isDark ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.25)";

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement("div");
            cell.style.cssText = `border: 1px dashed ${lineColor}; position: relative; box-sizing: border-box;`;
            const label = document.createElement("span");
            label.textContent = `${r},${c}`;
            label.style.cssText = `position: absolute; top: 2px; left: 4px; font-size: 8px; color: ${labelColor}; pointer-events: none;`;
            cell.appendChild(label);
            gridOverlay.appendChild(cell);
        }
    }
    element.appendChild(gridOverlay);
}

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
    const opacity = (settings.grid_opacity !== undefined ? settings.grid_opacity : 8) / 100;
    document.documentElement.style.setProperty('--grid-opacity', opacity.toString());

    // Update zoom level display
    const zoomLevelEl = document.getElementById("zoomLevel");
    if (zoomLevelEl) {
        zoomLevelEl.textContent = Math.round(zoom * 100) + "%";
    }
}

/**
 * Centrally focuses an artboard in the viewport by adjusting panX/panY.
 */
export function focusPage(canvasInstance, index, smooth = true) {
    const wrappers = canvasInstance.canvas.querySelectorAll('.artboard-wrapper');
    const target = wrappers[index];
    if (target) {
        const viewportRect = canvasInstance.viewport.getBoundingClientRect();
        const vw = viewportRect.width;
        const vh = viewportRect.height;

        const zoom = AppState.zoomLevel;

        // Offset relative to the canvas-stage (which has 1000px padding)
        const targetX = target.offsetLeft + (target.offsetWidth / 2);
        const targetY = target.offsetTop + (target.offsetHeight / 2);

        // Calculate the pan required to center this target point in the viewport
        canvasInstance.panX = (vw / 2) - (targetX * zoom);
        canvasInstance.panY = (vh / 2) - (targetY * zoom);

        applyZoom(canvasInstance);
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
