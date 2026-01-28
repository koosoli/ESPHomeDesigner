import { DEVICE_PROFILES } from '../io/devices.js';
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

        // Settings button (Far Left)
        header.appendChild(createMdiIconButton("mdi-cog-outline", "Page Settings", () => {
            if (window.pageSettings) window.pageSettings.open(index);
        }));

        const nameLabel = document.createElement("span");
        nameLabel.className = "artboard-name";
        nameLabel.textContent = page.name || `Page ${index + 1}`;
        header.appendChild(nameLabel);

        const actions = document.createElement("div");
        actions.className = "artboard-actions";

        // Reorder buttons
        if (index > 0) {
            actions.appendChild(createMdiIconButton("mdi-chevron-left", "Move Left", () => {
                AppState.reorderPage(index, index - 1);
            }));
        }
        if (index < pages.length - 1) {
            actions.appendChild(createMdiIconButton("mdi-chevron-right", "Move Right", () => {
                AppState.reorderPage(index, index + 1);
            }));
        }

        // Add Page button (Plus)
        actions.appendChild(createMdiIconButton("mdi-plus", "Add Page After", () => {
            AppState.addPage(index + 1);
        }));

        // Clear Page button (Eraser) - Distinguished from deletion
        actions.appendChild(createMdiIconButton("mdi-eraser", "Clear Current Page", () => {
            confirmAction({
                title: "Clear Page",
                message: `Are you sure you want to clear all widgets from <b>"${page.name || `Page ${index + 1}`}"</b>?<br><br>This cannot be undone.`,
                confirmLabel: "Clear Page",
                confirmClass: "btn-danger",
                onConfirm: () => {
                    AppState.setCurrentPageIndex(index);
                    AppState.clearCurrentPage();
                }
            });
        }));

        // Delete Page button (Trash)
        actions.appendChild(createMdiIconButton("mdi-delete-outline", "Delete Page", () => {
            confirmAction({
                title: "Delete Page",
                message: `Are you sure you want to delete the page <b>"${page.name || `Page ${index + 1}`}"</b>?<br><br>All widgets on this page will be lost.`,
                confirmLabel: "Delete Page",
                confirmClass: "btn-danger",
                onConfirm: () => {
                    AppState.deletePage(index);
                }
            });
        }));

        header.appendChild(actions);
        artboardWrapper.appendChild(header);

        // 2. Render Artboard Content
        const shape = AppState.getCanvasShape();
        const isRound = shape === "round" || shape === "circle";

        const artboard = document.createElement("div");
        artboard.className = "artboard";
        artboard.dataset.index = index;

        // For round displays, use actual resolution - this allows ellipses for non-square resolutions
        // The device settings auto-set square resolution when 'round' is selected, but users can override
        const displayWidth = dims.width;
        const displayHeight = dims.height;

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

        // Render Debug Grid if enabled
        if (AppState.showDebugGrid) {
            renderDebugGridOverlay(artboard, dims, isDark);
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
                    const wrappedGetColorStyle = (colorName) => {
                        const effectiveColor = (colorName === 'theme_auto') ? (isDark ? 'white' : 'black') : colorName;
                        if (!effectiveColor) return isDark ? '#ffffff' : '#000000';
                        return getColorStyle(effectiveColor);
                    };

                    const isSelected = AppState.selectedWidgetIds.includes(widget.id);
                    const deviceModel = AppState.settings.device_model || 'reterminal_e1001';
                    const profile = DEVICE_PROFILES ? DEVICE_PROFILES[deviceModel] : null;

                    feature.render(el, widget, {
                        getColorStyle: wrappedGetColorStyle,
                        selected: isSelected,
                        profile: profile
                    });
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

    // 3. Render Add Page Placeholder (nice faded plus icon)
    const addPlaceholder = document.createElement("div");
    addPlaceholder.className = "add-page-placeholder";
    addPlaceholder.title = "Click to add a new page";

    // Match dimensions of artboards if possible
    addPlaceholder.style.width = `${dims.width}px`;
    addPlaceholder.style.height = `${dims.height}px`;
    addPlaceholder.style.marginTop = "32px"; // Offset to align with artboard content, not header
    addPlaceholder.style.position = "relative";
    addPlaceholder.style.zIndex = "2000"; // Higher than overlays
    addPlaceholder.style.pointerEvents = "auto"; // Explicitly enable clicks

    addPlaceholder.innerHTML = `
        <div class="plus-icon">+</div>
        <div class="label">Add Page</div>
    `;

    // Click handler
    const handleClick = (e) => {
        Logger.log("[Canvas] Add Page placeholder clicked");
        e.stopPropagation();
        e.preventDefault(); // Prevent accidental selection logic
        const newPage = AppState.addPage();
        if (newPage) {
            const newIndex = AppState.pages.length - 1;
            AppState.setCurrentPageIndex(newIndex);
            emit(EVENTS.STATE_CHANGED);
        }
    };

    // Dual binding was causing double execution. Sticking to addEventListener only.
    addPlaceholder.addEventListener('mousedown', (e) => e.stopPropagation()); // Prevent canvas drag start
    addPlaceholder.addEventListener('click', handleClick);

    // Append to the end of the canvas (after the last page)
    canvasInstance.canvas.appendChild(addPlaceholder);


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

                const isSelected = AppState.selectedWidgetIds.includes(widget.id);
                const deviceModel = AppState.settings.device_model || 'reterminal_e1001';
                const profile = DEVICE_PROFILES ? DEVICE_PROFILES[deviceModel] : null;

                feature.render(el, widget, {
                    getColorStyle: wrappedGetColorStyle,
                    selected: isSelected,
                    profile: profile
                });
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

export function renderContextToolbar(canvasInstance) {
    const selectedIds = AppState.selectedWidgetIds;
    const artboard = canvasInstance.canvas.querySelector(`.artboard[data-index="${AppState.currentPageIndex}"]`);
    let toolbar = canvasInstance.canvas.querySelector(".context-toolbar");

    // Hide if nothing selected or during active drag/lasso
    if (selectedIds.length === 0 || canvasInstance.dragState || canvasInstance.lassoState || !artboard) {
        if (toolbar) toolbar.remove();
        return;
    }

    const widgets = AppState.getSelectedWidgets();
    if (widgets.length === 0) {
        if (toolbar) toolbar.remove();
        return;
    }

    // Calculate bounding box in canvas space
    let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
    widgets.forEach(w => {
        minX = Math.min(minX, w.x);
        minY = Math.min(minY, w.y);
        maxX = Math.max(maxX, w.x + (w.width || 0));
        maxY = Math.max(maxY, w.y + (w.height || 0));
    });

    const targetLeft = minX;
    const targetTop = minY - 45;

    // Create or move toolbar
    if (!toolbar) {
        toolbar = document.createElement("div");
        toolbar.className = "context-toolbar";
        artboard.appendChild(toolbar);
    } else if (toolbar.parentElement !== artboard) {
        artboard.appendChild(toolbar);
    }

    // Update position
    toolbar.style.left = targetLeft + "px";
    toolbar.style.top = targetTop + "px";

    // Always rebuild content to ensure correctness
    toolbar.innerHTML = "";

    // 1. Alignment Tools (Multi-select only)
    if (selectedIds.length > 1) {
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
                addSeparator(toolbar);
                return;
            }
            addButton(toolbar, tool.icon, tool.title, () => AppState.alignSelectedWidgets(tool.action));
        });

        // 2. Distribution Tools (3+ widgets)
        if (selectedIds.length >= 3) {
            addSeparator(toolbar);
            addButton(toolbar, 'mdi-distribute-horizontal-center', 'Distribute Horizontally', () => AppState.distributeSelectedWidgets('horizontal'));
            addButton(toolbar, 'mdi-distribute-vertical-center', 'Distribute Vertically', () => AppState.distributeSelectedWidgets('vertical'));
        }
    }

    // 3. Grouping Logic
    // We can only group if NONE of the selected items are already groups or inside groups
    // We can ungroup if ANY of the selected items are groups or inside groups
    const hasUngroupable = widgets.some(w => w.type === 'group' || w.parentId);

    if (hasUngroupable) {
        // Show Ungroup
        if (toolbar.children.length > 0) addSeparator(toolbar);
        addButton(toolbar, 'mdi-ungroup', 'Ungroup (Ctrl+Shift+G)', () => AppState.ungroupSelection());
    } else if (selectedIds.length > 1) {
        // Show Group (only if multiple items and clean hierarchy)
        if (toolbar.children.length > 0) addSeparator(toolbar);
        addButton(toolbar, 'mdi-group', 'Group Selection (Ctrl+G)', () => AppState.groupSelection());
    }

    if (toolbar.children.length === 0) {
        toolbar.remove();
        return;
    }
}

function addButton(container, icon, title, onClick) {
    const btn = document.createElement("button");
    btn.className = "btn-icon";
    btn.title = title;
    btn.innerHTML = `<i class="mdi ${icon}"></i>`;
    btn.onclick = (e) => {
        e.stopPropagation();
        onClick();
    };
    container.appendChild(btn);
}

function addSeparator(container) {
    // Avoid double separators or leading separators
    if (!container.lastElementChild || container.lastElementChild.classList.contains('separator')) return;

    const sep = document.createElement("div");
    sep.className = "separator";
    container.appendChild(sep);
}

function createMdiIconButton(iconClass, title, onClick) {
    const btn = document.createElement("button");
    btn.className = "artboard-btn";
    btn.title = title;
    btn.innerHTML = `<i class="mdi ${iconClass}"></i>`;
    btn.onclick = (e) => {
        e.stopPropagation();
        onClick();
    };
    return btn;
}

function confirmAction({ title, message, confirmLabel, confirmClass, onConfirm }) {
    const modal = document.createElement('div');
    modal.className = 'modal-backdrop';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal" style="width: 340px; height: auto; padding: var(--space-4); border-radius: 12px; border: 1px solid var(--glass-border);">
            <div class="modal-header" style="font-size: var(--fs-md); font-weight: 600; padding-bottom: var(--space-3); border-bottom: 1px solid var(--border-subtle);">
                <div>${title}</div>
            </div>
            <div class="modal-body" style="padding: var(--space-4) 0;">
                <p style="font-size: var(--fs-sm); line-height: 1.5; color: var(--text-dim);">
                    ${message}
                </p>
            </div>
            <div class="modal-actions" style="display: flex; gap: 8px; justify-content: flex-end; padding-top: var(--space-3);">
                <button class="btn btn-secondary close-btn btn-xs" style="border-radius: 6px;">Cancel</button>
                <button class="btn ${confirmClass || 'btn-primary'} confirm-btn btn-xs" style="border-radius: 6px;">${confirmLabel || 'Confirm'}</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    const closeBtn = modal.querySelector('.close-btn');
    const confirmBtn = modal.querySelector('.confirm-btn');

    closeBtn.onclick = () => modal.remove();
    confirmBtn.onclick = () => {
        onConfirm();
        modal.remove();
    };
}

function renderDebugGridOverlay(element, dims, isDark) {
    const overlay = document.createElement("div");
    overlay.className = "debug-grid-overlay";
    element.appendChild(overlay);
}

