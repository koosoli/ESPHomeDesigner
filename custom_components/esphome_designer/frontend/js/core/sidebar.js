import { AppState } from './state.js';
import { on, emit, EVENTS } from './events.js';
import { WidgetFactory } from './widget_factory.js';
import { showToast } from '../utils/dom.js';
import { Logger } from '../utils/logger.js';

export class Sidebar {
    constructor() {
        Logger.log("Sidebar: Constructor called");
        this.pageListEl = document.getElementById("pageList");
        this.pagesHeader = document.getElementById("pagesHeader");
        this.pagesContent = document.getElementById("pagesContent");
        this.widgetPaletteEl = document.getElementById("widgetPalette");
        Logger.log("Sidebar: widgetPaletteEl found?", !!this.widgetPaletteEl);
        if (!this.widgetPaletteEl) Logger.error("Sidebar: widgetPalette element not found!");
        this.addPageBtn = document.getElementById("addPageBtn");
        this.currentPageNameEl = document.getElementById("currentPageName");
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
        if (this.pagesHeader && this.pagesContent) {
            this.pagesHeader.addEventListener("click", () => {
                const isHidden = this.pagesContent.classList.toggle("hidden");
                const chevron = this.pagesHeader.querySelector(".chevron");
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
                const item = e.target.closest(".item[data-widget-type]");
                if (item) {
                    const type = item.getAttribute("data-widget-type");
                    Logger.log("[Sidebar] Drag start:", type);
                    e.dataTransfer.setData("application/widget-type", type);
                    e.dataTransfer.effectAllowed = "copy";
                }
            });
        }

        // Global click debug
        document.addEventListener('click', (e) => {
            const debugDiv = document.getElementById('debug-overlay');
            if (debugDiv) debugDiv.innerHTML += 'Global click: ' + e.target.tagName + '<br>';
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
                if (window.QuickSearch) {
                    window.QuickSearch.open();
                } else {
                    Logger.warn("Sidebar: QuickSearch instance not found on window");
                }
            });
        }

        this.setupMobileToggles();
        this.render();
    }

    render() {
        if (!this.pageListEl) return;

        this.pageListEl.innerHTML = "";
        const pages = AppState.pages;
        const currentIndex = AppState.currentPageIndex;

        pages.forEach((page, index) => {
            const item = document.createElement("div");
            item.className = "item" + (index === currentIndex ? " active" : "");
            item.draggable = true;

            // Drag Handlers
            item.ondragstart = (e) => {
                e.dataTransfer.setData("text/plain", index);
                e.dataTransfer.effectAllowed = "move";
                item.style.opacity = "0.5";
            };

            item.ondragend = () => {
                item.style.opacity = "1";
                Array.from(this.pageListEl.children).forEach(el => {
                    el.style.borderTop = "";
                    el.style.borderBottom = "";
                });
            };

            item.ondragover = (e) => {
                e.preventDefault();
                const isWidgetId = e.dataTransfer.types.includes("application/widget-id");
                const isWidgetType = e.dataTransfer.types.includes("application/widget-type");

                if (isWidgetId || isWidgetType) {
                    e.dataTransfer.dropEffect = isWidgetId ? "move" : "copy";
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

            item.ondragleave = (e) => {
                // Only clear if we're leaving the hovered page, not just re-entering child elements
                const relatedTarget = e.relatedTarget;
                if (!item.contains(relatedTarget)) {
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
                AppState.setCurrentPageIndex(index);
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
            this.pageListEl.appendChild(item);
        });

        // Update current page name header
        if (this.currentPageNameEl) {
            const page = AppState.getCurrentPage();
            this.currentPageNameEl.textContent = page ? page.name : "None";
        }
    }

    handleAddPage() {
        AppState.addPage();
    }

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
            if (debugDiv) debugDiv.innerHTML += 'Widget added to state<br>';
        } catch (err) {
            Logger.error("Sidebar: Error creating/adding widget", err);
            if (debugDiv) debugDiv.innerHTML += 'Error: ' + err.message + '<br>';
        }
    }

    openPageSettings(index) {
        if (window.app && window.app.pageSettings) {
            window.app.pageSettings.open(index);
        } else {
            Logger.error("Sidebar: PageSettings instance not found on window.app");
            // Fallback (should not be needed if main.js initializes correctly)
            const page = AppState.pages[index];
            window.currentPageSettingsTarget = page;
            const modal = document.getElementById("pageSettingsModal");
            if (modal) {
                modal.classList.remove("hidden");
                modal.style.display = "flex";
            }
        }
    }

    handlePageDelete(index, page) {
        // Use custom modal instead of native confirm
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

        const confirmAction = () => {
            closeModal();
            try {
                if (typeof AppState.deletePage === 'function') {
                    AppState.deletePage(index);
                } else {
                    console.error('AppState.deletePage is missing');
                    if (typeof showToast === 'function') showToast('Error: AppState.deletePage not found', 'error');
                }
            } catch (e) {
                console.error('[Sidebar] Error deleting page:', e);
                if (typeof showToast === 'function') showToast('Error deleting page: ' + e.message, 'error');
            }
        };

        modal.querySelectorAll('.close-btn').forEach(btn => btn.onclick = closeModal);
        modal.querySelector('.confirm-btn').onclick = confirmAction;
        modal.onclick = (e) => { if (e.target === modal) closeModal(); };
    }

    handleClearPage() {
        // Defensive check for AppState as fallback
        const State = AppState || window.AppState;
        if (!State) {
            console.error('[Sidebar] AppState is not defined!');
            if (typeof showToast === 'function') showToast('Error: Application State is not ready.', 'error');
            return;
        }

        // Use custom modal instead of native confirm to avoid brower/environment issues
        const modal = document.createElement('div');
        modal.className = 'modal-backdrop';
        modal.style.display = 'flex'; // Force display
        modal.innerHTML = `
            <div class="modal" style="width: 320px; height: auto; min-height: 180px; padding: var(--space-4);">
                <div class="modal-header" style="font-size: var(--fs-md); padding-bottom: var(--space-2);">
                    <div>Clear Page</div>
                </div>
                <div class="modal-body" style="padding: var(--space-2) 0;">
                    <p style="margin-bottom: var(--space-3); font-size: var(--fs-sm);">Are you sure you want to clear all widgets? <b>Locked</b> widgets will stay.</p>
                </div>
                <div class="modal-actions" style="padding-top: var(--space-3); border-top: 1px solid var(--border-subtle);">
                    <button class="btn btn-secondary close-btn btn-xs">Cancel</button>
                    <button class="btn btn-primary confirm-btn btn-xs" style="background: var(--danger); color: white; border: none;">Clear All</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        const closeModal = () => {
            modal.remove();
        };

        const confirmAction = () => {
            closeModal();
            try {
                console.log('[Sidebar] Executing clearCurrentPage...');
                const result = State.clearCurrentPage(true); // true = preserve locked

                if (result.preserved > 0 && typeof showToast === 'function') {
                    showToast(`Cleared ${result.deleted} widgets. ${result.preserved} locked widget(s) were preserved.`, "info");
                } else if (result.deleted > 0) {
                    showToast(`Cleared all ${result.deleted} widgets.`, "success");
                } else {
                    if (result.preserved > 0) {
                        showToast(`No widgets cleared. ${result.preserved} locked widget(s) preserved.`, "info");
                    } else {
                        showToast("Page is already empty.", "info");
                    }
                }
                Logger.log('Cleared widgets from current page via AppState');
            } catch (e) {
                console.error('[Sidebar] Error clearing page:', e);
                if (typeof showToast === 'function') showToast('Error clearing page: ' + e.message, 'error');
            }
        };

        // Bind events
        const closeBtns = modal.querySelectorAll('.close-btn');
        closeBtns.forEach(btn => btn.onclick = closeModal);

        const confirmBtn = modal.querySelector('.confirm-btn');
        confirmBtn.onclick = confirmAction;

        // Click outside to close
        modal.onclick = (e) => {
            if (e.target === modal) closeModal();
        };
    }

    setupMobileToggles() {
        const mobileWidgetsBtn = document.getElementById('mobileWidgetsBtn');
        const mobilePropsBtn = document.getElementById('mobilePropsBtn');
        const mobileDeviceBtn = document.getElementById('mobileDeviceBtn');
        const backdrop = document.getElementById('mobileBackdrop');

        const sidebar = document.querySelector('.sidebar');
        const rightPanel = document.querySelector('.right-panel');

        const closeAll = () => {
            sidebar?.classList.remove('mobile-active');
            rightPanel?.classList.remove('mobile-active');
            backdrop?.classList.remove('active');
        };

        mobileWidgetsBtn?.addEventListener('click', () => {
            const isActive = sidebar?.classList.contains('mobile-active');
            closeAll();
            if (!isActive) {
                sidebar?.classList.add('mobile-active');
                backdrop?.classList.add('active');
            }
        });

        mobilePropsBtn?.addEventListener('click', () => {
            const isActive = rightPanel?.classList.contains('mobile-active');
            closeAll();
            if (!isActive) {
                rightPanel?.classList.add('mobile-active');
                backdrop?.classList.add('active');
            }
        });

        mobileDeviceBtn?.addEventListener('click', () => {
            closeAll();
            window.app?.deviceSettings?.open();
        });

        backdrop?.addEventListener('click', closeAll);

        // Auto-close on widget selection (mobile only)
        on(EVENTS.SELECTION_CHANGED, () => {
            if (window.innerWidth <= 768) {
                // Keep properties open if we just selected something, but close widget drawer
                sidebar?.classList.remove('mobile-active');
                if (!rightPanel?.classList.contains('mobile-active') && !sidebar?.classList.contains('mobile-active')) {
                    backdrop?.classList.remove('active');
                }
            }
        });

        // Close sidebar when adding a widget from palette
        const originalHandlePaletteClick = this.handlePaletteClick.bind(this);
        this.handlePaletteClick = (e) => {
            originalHandlePaletteClick(e);
            if (window.innerWidth <= 768) {
                closeAll();
            }
        };
    }
}
