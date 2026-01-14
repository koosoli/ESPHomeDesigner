import { AppState } from './state.js';
import { registry as FeatureRegistry } from './plugin_registry.js';
import { Logger } from '../utils/logger.js';
import { getColorStyle } from '../utils/device.js';
import { emit, EVENTS } from './events.js';

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
        artboardWrapper.dataset.index = index;
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

        // Add Page button (Plus)
        const addPageBtn = createIconButton("+", "Add Page After", () => {
            AppState.addPage(index + 1);
        });
        actions.appendChild(addPageBtn);

        // Delete Page button (X)
        const deletePageBtn = createIconButton("✕", "Delete Page", () => {
            // Confirmation Modal for Deletion
            const modal = document.createElement('div');
            modal.className = 'modal-backdrop';
            modal.style.display = 'flex';
            modal.innerHTML = `
                <div class="modal" style="width: 320px; height: auto; min-height: 150px; padding: var(--space-4);">
                    <div class="modal-header" style="font-size: var(--fs-md); padding-bottom: var(--space-2);">
                        <div>Delete Page</div>
                    </div>
                    <div class="modal-body" style="padding: var(--space-2) 0;">
                        <p style="margin-bottom: var(--space-3); font-size: var(--fs-sm);">
                            Are you sure you want to delete the page <b>"${page.name}"</b>?
                            <br><br>
                            This action cannot be undone.
                        </p>
                    </div>
                    <div class="modal-actions" style="padding-top: var(--space-3); border-top: 1px solid var(--border-subtle);">
                        <button class="btn btn-secondary close-btn btn-xs">Cancel</button>
                        <button class="btn btn-primary confirm-btn btn-xs" style="background: var(--danger); color: white; border: none;">Delete</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);
            const closeModal = () => modal.remove();
            modal.querySelector('.close-btn').addEventListener('click', closeModal);
            modal.querySelector('.confirm-btn').addEventListener('click', () => {
                closeModal();
                AppState.deletePage(index);
            });
            modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
        });
        actions.appendChild(deletePageBtn);

        header.appendChild(actions);
        artboardWrapper.appendChild(header);

        // 2. Render Artboard Content
        const shape = AppState.getCanvasShape();
        const isRound = shape === "round" || shape === "circle";

        const artboard = document.createElement("div");
        artboard.className = "artboard";
        artboard.dataset.index = index;

        // Use shorter dimension for both width and height if it's a round display to ensure a perfect circle
        const displayWidth = isRound ? Math.min(dims.width, dims.height) : dims.width;
        const displayHeight = isRound ? Math.min(dims.width, dims.height) : dims.height;

        artboard.style.width = `${displayWidth}px`;
        artboard.style.height = `${displayHeight}px`;

        // Apply page-specific theme
        const isDark = getPageEffectiveDarkMode(page);
        artboard.classList.toggle("dark", isDark);

        // Apply display shape
        artboard.classList.toggle("round-display", isRound);

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

            if (type === 'group') {
                // Internal group rendering: simple container logic
                el.classList.add('widget-group');
                el.innerHTML = ''; // Groups are mostly invisible containers
            } else if (feature && feature.render) {
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

            if (type !== 'group') {
                addResizeHandles(el);
            }
            artboard.appendChild(el);
        }

        artboardWrapper.appendChild(artboard);
        canvasInstance.canvas.appendChild(artboardWrapper);
    });

    if (existingLasso) canvasInstance.canvas.appendChild(existingLasso);

    // Render contextual toolbar for selection
    renderContextToolbar(canvasInstance);
}

function createIconButton(text, title, onClick) {
    const btn = document.createElement("button");
    btn.className = "artboard-btn";
    btn.innerHTML = text;
    btn.title = title;
    btn.onmousedown = (e) => e.stopPropagation();
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

        // If viewport has no size yet, defer to next frame to avoid off-screen jump
        if (vw === 0 || vh === 0) {
            requestAnimationFrame(() => focusPage(canvasInstance, index, smooth));
            return;
        }

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

export function updateWidgetDOM(canvasInstance, widget, skipPluginRender = false) {
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

        if (type === 'group') {
            el.classList.add('widget-group');
        } else if (!skipPluginRender && feature && feature.render) {
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

function addResizeHandles(el) {
    const handles = ['tl', 'tc', 'tr', 'rc', 'br', 'bc', 'bl', 'lc'];
    handles.forEach(type => {
        const handle = document.createElement("div");
        handle.className = `widget-resize-handle handle-${type}`;
        handle.dataset.handle = type;
        el.appendChild(handle);
    });
}

function renderContextToolbar(canvasInstance) {
    // Remove any existing toolbar
    const existing = canvasInstance.canvas.querySelector(".context-toolbar");
    if (existing) existing.remove();

    const selectedIds = AppState.selectedWidgetIds;
    if (selectedIds.length === 0) return;

    // Don't show toolbar during active drag/resize to avoid jumping
    if (canvasInstance.dragState || canvasInstance.lassoState) return;

    const widgets = AppState.getSelectedWidgets();
    if (widgets.length === 0) return;

    // Calculate bounding box of selection in canvas space
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    widgets.forEach(w => {
        minX = Math.min(minX, w.x);
        minY = Math.min(minY, w.y);
        maxX = Math.max(maxX, w.x + (w.width || 0));
        maxY = Math.max(maxY, w.y + (w.height || 0));
    });

    // Create toolbar
    const toolbar = document.createElement("div");
    toolbar.className = "context-toolbar";

    // Multi-selection tools
    if (selectedIds.length > 1) {
        // Alignment
        const alignTools = [
            { icon: 'mdi-align-horizontal-left', title: 'Align Left', action: 'left' },
            { icon: 'mdi-align-horizontal-center', title: 'Align Center', action: 'center' },
            { icon: 'mdi-align-horizontal-right', title: 'Align Right', action: 'right' },
            { separator: true },
            { icon: 'mdi-align-vertical-top', title: 'Align Top', action: 'top' },
            { icon: 'mdi-align-vertical-center', title: 'Align Middle', action: 'middle' },
            { icon: 'mdi-align-vertical-bottom', title: 'Align Bottom', action: 'bottom' }
        ];

        alignTools.forEach(tool => {
            if (tool.separator) {
                const sep = document.createElement("div");
                sep.className = "separator";
                toolbar.appendChild(sep);
                return;
            }
            const btn = document.createElement("button");
            btn.className = "btn-icon";
            btn.title = tool.title;
            btn.innerHTML = `<i class="mdi ${tool.icon}"></i>`;
            btn.onclick = (e) => {
                e.stopPropagation();
                AppState.alignSelectedWidgets(tool.action);
            };
            toolbar.appendChild(btn);
        });

        // Distribution (min 3 widgets)
        if (selectedIds.length >= 3) {
            const distSep = document.createElement("div");
            distSep.className = "separator";
            toolbar.appendChild(distSep);

            const distTools = [
                { icon: 'mdi-distribute-horizontal-spacing', title: 'Distribute Horizontally', action: 'horizontal' },
                { icon: 'mdi-distribute-vertical-spacing', title: 'Distribute Vertically', action: 'vertical' }
            ];

            distTools.forEach(tool => {
                const btn = document.createElement("button");
                btn.className = "btn-icon";
                btn.title = tool.title;
                btn.innerHTML = `<i class="mdi ${tool.icon}"></i>`;
                btn.onclick = (e) => {
                    e.stopPropagation();
                    AppState.distributeSelectedWidgets(tool.action);
                };
                toolbar.appendChild(btn);
            });
        }

        // Grouping
        const groupSep = document.createElement("div");
        groupSep.className = "separator";
        toolbar.appendChild(groupSep);

        const groupBtn = document.createElement("button");
        groupBtn.className = "btn-icon";
        groupBtn.title = "Group Selection (Ctrl+G)";
        groupBtn.innerHTML = `<i class="mdi mdi-object-group"></i>`;
        groupBtn.onclick = (e) => {
            e.stopPropagation();
            AppState.groupSelection();
        };
        toolbar.appendChild(groupBtn);
    }

    // Ungrouping check (Single or Multi)
    const hasUngroupable = widgets.some(w => w.type === 'group' || w.parentId);
    if (hasUngroupable) {
        const ungroupBtn = document.createElement("button");
        ungroupBtn.className = "btn-icon";
        ungroupBtn.title = "Ungroup (Ctrl+Shift+G)";
        ungroupBtn.innerHTML = `<i class="mdi mdi-object-ungroup"></i>`;
        ungroupBtn.onclick = (e) => {
            e.stopPropagation();
            AppState.ungroupSelection();
        };

        // Add separator if there's already content (alignment tools)
        if (toolbar.children.length > 0) {
            const sep = document.createElement("div");
            sep.className = "separator";
            toolbar.appendChild(sep);
        }
        toolbar.appendChild(ungroupBtn);
    }

    // Hide toolbar if it's empty (e.g. single widget that is not a group/child)
    if (toolbar.children.length === 0) return;

    // Position toolbar above bounding box
    // Find absolute position within the active artboard
    const artboard = canvasInstance.canvas.querySelector(`.artboard[data-index="${AppState.currentPageIndex}"]`);
    if (!artboard) return;

    toolbar.style.left = minX + "px";
    toolbar.style.top = (minY - 45) + "px"; // 45px offset above bounding box

    artboard.appendChild(toolbar);
}

