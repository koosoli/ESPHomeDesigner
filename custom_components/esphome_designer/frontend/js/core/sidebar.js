// @ts-check
import { AppState } from './state';
import { on, EVENTS } from './events.js';
import { WidgetFactory } from './widget_factory';
import { Logger } from '../utils/logger.js';
import { quickSearchInstance } from '../ui/quick_search.js';
import { showDeletePageModal, showClearPageModal, setupSidebarMobileToggles } from './sidebar_helpers.js';

export class Sidebar {
    /** @param {any} appInstance */
    constructor(appInstance = null) {
        Logger.log("Sidebar: Constructor called");
        /** @type {any} */
        this.app = appInstance;
        /** @type {HTMLElement|null} */
        this.pageListEl = document.getElementById("pageList");
        /** @type {HTMLElement|null} */
        this.pagesHeader = document.getElementById("pagesHeader");
        /** @type {HTMLElement|null} */
        this.pagesContent = document.getElementById("pagesContent");
        /** @type {HTMLElement|null} */
        this.widgetPaletteEl = document.getElementById("widgetPalette");
        Logger.log("Sidebar: widgetPaletteEl found?", !!this.widgetPaletteEl);
        if (!this.widgetPaletteEl) Logger.error("Sidebar: widgetPalette element not found!");
        /** @type {HTMLElement|null} */
        this.addPageBtn = document.getElementById("addPageBtn");
        /** @type {HTMLElement|null} */
        this.currentPageNameEl = document.getElementById("currentPageName");
        /** @type {any} */
        this.hoverTimeout = null;
        this.hoveredPageIndex = -1;
    }

    init() {
        Logger.log("Sidebar: init called");
        const debugDiv = document.getElementById('debug-overlay');
        if (debugDiv) debugDiv.innerHTML += 'Sidebar.init called<br>';
        // Subscribe to state changes
        on(EVENTS.STATE_CHANGED, () => this.render());
        on(EVENTS.PAGE_CHANGED, () => this.render());

        // Pages section toggle
        const pagesHeader = this.pagesHeader;
        const pagesContent = this.pagesContent;
        if (pagesHeader && pagesContent) {
            pagesHeader.addEventListener("click", () => {
                const isHidden = pagesContent.classList.toggle("hidden");
                const chevron = /** @type {HTMLElement|null} */(pagesHeader.querySelector(".chevron"));
                if (chevron) {
                    chevron.style.transform = isHidden ? "rotate(-90deg)" : "rotate(0deg)";
                }

            });
        }

        // Bind UI events
        if (this.addPageBtn) {
            this.addPageBtn.addEventListener("click", () => this.handleAddPage());
        }

        // Widget Palette Delegation
        if (this.widgetPaletteEl) {
            this.widgetPaletteEl.addEventListener("click", (e) => this.handlePaletteClick(e));

            this.widgetPaletteEl.addEventListener("dragstart", (e) => {
                const item = /** @type {HTMLElement} */(e.target).closest(".item[data-widget-type]");
                if (item) {
                    const type = item.getAttribute("data-widget-type");
                    Logger.log("[Sidebar] Drag start:", type);
                    if (e.dataTransfer) {
                        e.dataTransfer.setData("application/widget-type", type || "");
                        e.dataTransfer.effectAllowed = "copy";
                    }
                }
            });
        }

        // Global click debug
        document.addEventListener('click', (e) => {
            const debugDiv = document.getElementById('debug-overlay');
            if (debugDiv && e.target instanceof HTMLElement) debugDiv.innerHTML += 'Global click: ' + e.target.tagName + '<br>';
        });

        // Clear Page Button
        const clearAllBtn = document.getElementById('clearAllBtn');
        if (clearAllBtn) {
            clearAllBtn.addEventListener('click', () => this.handleClearPage());
        }

        // Quick Search Button
        const quickSearchBtn = document.getElementById('quickSearchBtn');
        if (quickSearchBtn) {
            quickSearchBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (quickSearchInstance) {
                    quickSearchInstance.open();
                } else {
                    Logger.warn("Sidebar: QuickSearch instance not found on window");
                }
            });
        }

        this.setupMobileToggles();
        this.render();
    }

    render() {
        const pageListEl = this.pageListEl;
        if (!pageListEl) return;

        const fragment = document.createDocumentFragment();
        pageListEl.innerHTML = "";
        const pages = /** @type {Page[]} */ (AppState.pages);
        const currentIndex = AppState.currentPageIndex;

        pages.forEach((/** @type {Page} */ page, /** @type {number} */ index) => {
            const item = document.createElement("div");
            item.className = "item" + (index === currentIndex ? " active" : "");
            item.draggable = true;

            // Drag Handlers
            /** @param {DragEvent} e */
            item.ondragstart = (e) => {
                if (e.dataTransfer) {
                    e.dataTransfer.setData("text/plain", String(index));
                    e.dataTransfer.effectAllowed = "move";
                }
                item.style.opacity = "0.5";
            };

            item.ondragend = () => {
                item.style.opacity = "1";
                Array.from(pageListEl.children).forEach((/** @type {any} */ el) => {
                    el.style.borderTop = "";
                    el.style.borderBottom = "";
                });
            };

            /** @param {DragEvent} e */
            item.ondragover = (e) => {
                e.preventDefault();
                if (!e.dataTransfer) return;
                const isWidgetId = e.dataTransfer.types.includes("application/widget-id");
                const isWidgetType = e.dataTransfer.types.includes("application/widget-type");

                if (isWidgetId || isWidgetType) {
                    if (e.dataTransfer) e.dataTransfer.dropEffect = isWidgetId ? "move" : "copy";
                    item.style.backgroundColor = "var(--primary-subtle)";

                    // Switch page immediately (like clicking) when dragging a widget over it
                    if (AppState.currentPageIndex !== index) {
                        AppState.setCurrentPageIndex(index);
                    }
                    return;
                }
                const rect = item.getBoundingClientRect();
                const midpoint = rect.top + rect.height / 2;
                if (e.clientY < midpoint) {
                    item.style.borderTop = "2px solid var(--primary)";
                    item.style.borderBottom = "";
                } else {
                    item.style.borderTop = "";
                    item.style.borderBottom = "2px solid var(--primary)";
                }
            };

            /** @param {DragEvent} e */
            item.ondragleave = (e) => {
                // Only clear if we're leaving the hovered page, not just re-entering child elements
                const relatedTarget = e.relatedTarget;
                if (!(relatedTarget instanceof Node) || !item.contains(relatedTarget)) {
                    if (this.hoveredPageIndex === index) {
                        if (this.hoverTimeout) {
                            clearTimeout(this.hoverTimeout);
                            this.hoverTimeout = null;
                        }
                        this.hoveredPageIndex = -1;
                    }
                }
                item.style.borderTop = "";
                item.style.borderBottom = "";
                item.style.backgroundColor = "";
            };

            /** @param {DragEvent} e */
            item.ondrop = (e) => {
                e.preventDefault();
                if (this.hoverTimeout) {
                    clearTimeout(this.hoverTimeout);
                    this.hoverTimeout = null;
                }
                this.hoveredPageIndex = -1;
                item.style.borderTop = "";
                item.style.borderBottom = "";
                item.style.backgroundColor = "";

                if (!e.dataTransfer) return;
                const widgetId = e.dataTransfer.getData("application/widget-id");
                const widgetType = e.dataTransfer.getData("application/widget-type");

                if (widgetId) {
                    Logger.log(`[Sidebar] Drop detected on page ${index}. Widget ID:`, widgetId);
                    const targetPageIndex = index;
                    if (targetPageIndex !== AppState.currentPageIndex) {
                        AppState.moveWidgetToPage(widgetId, targetPageIndex);
                        Logger.log(`[Sidebar] Moved widget ${widgetId} to page ${targetPageIndex}`);
                    }
                    return;
                }

                if (widgetType) {
                    Logger.log(`[Sidebar] Drop detected on page ${index}. Widget Type:`, widgetType);
                    const targetPageIndex = index;
                    try {
                        const widget = WidgetFactory.createWidget(widgetType);
                        widget.x = 40;
                        widget.y = 40;
                        AppState.addWidget(widget, targetPageIndex);
                        AppState.setCurrentPageIndex(targetPageIndex);
                        AppState.selectWidget(widget.id, false);
                        Logger.log(`[Sidebar] Added new ${widgetType} to page ${targetPageIndex}`);
                    } catch (err) {
                        Logger.error("[Sidebar] Error creating widget from drop:", err);
                    }
                    return;
                }

                const fromIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
                const toIndex = index;
                this.handlePageReorder(fromIndex, toIndex, e.clientY, item);
            };

            item.onclick = () => {
                AppState.setCurrentPageIndex(index, { forceFocus: true });
            };

            item.ondblclick = (e) => {
                e.stopPropagation();
                const oldName = page.name || "";
                const newName = prompt("Rename Page:", oldName);
                if (newName !== null && newName.trim() !== "" && newName !== oldName) {
                    AppState.renamePage(index, newName);
                }
            };

            // Content
            const icon = document.createElement("span");
            icon.className = "item-icon";
            icon.innerHTML = `<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="3" y1="9" x2="21" y2="9"></line>
                <line x1="9" y1="21" x2="9" y2="9"></line>
            </svg>`;
            item.appendChild(icon);

            const label = document.createElement("span");
            label.className = "label";
            label.textContent = page.name;
            item.appendChild(label);

            // Actions
            const actions = document.createElement("div");
            actions.style.marginLeft = "auto";
            actions.style.display = "flex";
            actions.style.gap = "2px";

            const editBtn = document.createElement("button");
            editBtn.textContent = "⚙";
            editBtn.className = "btn btn-secondary";
            editBtn.style.padding = "1px 4px";
            editBtn.style.fontSize = "8px";
            editBtn.onclick = (e) => {
                e.stopPropagation();
                this.openPageSettings(index);
            };
            actions.appendChild(editBtn);

            const dupeBtn = document.createElement("button");
            dupeBtn.textContent = "⧉";
            dupeBtn.className = "btn btn-secondary";
            dupeBtn.style.padding = "1px 4px";
            dupeBtn.style.fontSize = "8px";
            dupeBtn.title = "Duplicate Page";
            dupeBtn.onclick = (e) => {
                e.stopPropagation();
                AppState.duplicatePage(index);
            };
            actions.appendChild(dupeBtn);

            if (pages.length > 1) {
                const delBtn = document.createElement("button");
                delBtn.textContent = "✕";
                delBtn.className = "btn btn-secondary";
                delBtn.style.padding = "1px 4px";
                delBtn.style.fontSize = "8px";
                delBtn.style.color = "var(--danger)";
                delBtn.onclick = (e) => {
                    e.stopPropagation();
                    this.handlePageDelete(index, page);
                };
                actions.appendChild(delBtn);
            }

            item.appendChild(actions);
            fragment.appendChild(item);
        });

        pageListEl.appendChild(fragment);

        if (this.currentPageNameEl) {
            const page = AppState.getCurrentPage();
            this.currentPageNameEl.textContent = page ? page.name : "None";
        }
    }

    handleAddPage() {
        AppState.addPage();
    }

    /**
     * @param {number} fromIndex 
     * @param {number} toIndex 
     * @param {number} clientY 
     * @param {HTMLElement} targetItem 
     */
    handlePageReorder(fromIndex, toIndex, clientY, targetItem) {
        if (fromIndex === toIndex) return;

        const rect = targetItem.getBoundingClientRect();
        const midpoint = rect.top + rect.height / 2;
        let insertIndex = toIndex;
        if (clientY >= midpoint) {
            insertIndex++;
        }

        if (fromIndex < insertIndex) {
            insertIndex--;
        }

        if (fromIndex !== insertIndex) {
            AppState.reorderPage(fromIndex, insertIndex);
        }
    }

    /** @param {any} e */
    handlePaletteClick(e) {
        const debugDiv = document.getElementById('debug-overlay');
        if (debugDiv) debugDiv.innerHTML += 'handlePaletteClick triggered<br>';

        Logger.log("Sidebar: handlePaletteClick", e.target);
        const item = e.target.closest(".item[data-widget-type]");
        if (!item) {
            Logger.log("Sidebar: No item found");
            if (debugDiv) debugDiv.innerHTML += 'No item found<br>';
            return;
        }
        const type = item.getAttribute("data-widget-type");
        Logger.log("Sidebar: Creating widget of type", type);
        if (debugDiv) debugDiv.innerHTML += 'Creating widget: ' + type + '<br>';

        try {
            const widget = WidgetFactory.createWidget(type);
            Logger.log("Sidebar: Widget created", widget);
            if (debugDiv) debugDiv.innerHTML += 'Widget created<br>';

            AppState.addWidget(widget);
            Logger.log("Sidebar: Widget added to state");

            // Suppress focus skip when adding via click too
            if (this.app && this.app.canvas) {
                this.app.canvas.suppressNextFocus = true;
            }

            if (debugDiv) debugDiv.innerHTML += 'Widget added to state<br>';
        } catch (err) {
            Logger.error("Sidebar: Error creating/adding widget", err);
            if (debugDiv) debugDiv.innerHTML += 'Error: ' + (/** @type {Error} */(err)).message + '<br>';
        }
    }

    /** @param {number} index */
    openPageSettings(index) {
        if (this.app && this.app.pageSettings) {
            this.app.pageSettings.open(index);
        } else {
            Logger.error("Sidebar: PageSettings instance not found on injected app reference");
            // Fallback (should not be needed if main.js initializes correctly)
            const modal = document.getElementById("pageSettingsModal");
            if (modal) {
                modal.classList.remove("hidden");
                modal.style.display = "flex";
            }
        }
    }

    /**
     * @param {number} index 
     * @param {any} page 
     */
    handlePageDelete(index, page) {
        showDeletePageModal(index, page);
    }

    handleClearPage() {
        showClearPageModal();
    }

    setupMobileToggles() {
        setupSidebarMobileToggles(this);
    }
}
