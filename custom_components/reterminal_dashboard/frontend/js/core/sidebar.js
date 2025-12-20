// Imports removed - using global scope
// AppState from state.js
// on, EVENTS from events.js
// WidgetFactory from widget_factory.js

class Sidebar {
    constructor() {
        console.log("Sidebar: Constructor called");
        this.pageListEl = document.getElementById("pageList");
        this.widgetPaletteEl = document.getElementById("widgetPalette");
        console.log("Sidebar: widgetPaletteEl found?", !!this.widgetPaletteEl);
        if (!this.widgetPaletteEl) console.error("Sidebar: widgetPalette element not found!");
        this.addPageBtn = document.getElementById("addPageBtn");
        this.currentPageNameEl = document.getElementById("currentPageName");
    }

    init() {
        console.log("Sidebar: init called");
        const debugDiv = document.getElementById('debug-overlay');
        if (debugDiv) debugDiv.innerHTML += 'Sidebar.init called<br>';
        // Subscribe to state changes
        on(EVENTS.STATE_CHANGED, () => this.render());
        on(EVENTS.PAGE_CHANGED, () => this.render());

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
                    console.log("[Sidebar] Drag start:", type);
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
                e.dataTransfer.dropEffect = "move";
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

            item.ondragleave = () => {
                item.style.borderTop = "";
                item.style.borderBottom = "";
            };

            item.ondrop = (e) => {
                e.preventDefault();
                item.style.borderTop = "";
                item.style.borderBottom = "";
                const fromIndex = parseInt(e.dataTransfer.getData("text/plain"), 10);
                const toIndex = index;
                this.handlePageReorder(fromIndex, toIndex, e.clientY, item);
            };

            item.onclick = () => {
                AppState.setCurrentPageIndex(index);
            };

            // Content
            const label = document.createElement("span");
            label.className = "label";
            label.textContent = page.name;

            const tag = document.createElement("span");
            tag.className = "tag";
            tag.textContent = page.id;

            item.appendChild(label);
            item.appendChild(tag);

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
                delBtn.textContent = "🗑";
                delBtn.className = "btn btn-secondary";
                delBtn.style.padding = "1px 4px";
                delBtn.style.fontSize = "8px";
                delBtn.style.color = "var(--danger)";
                delBtn.onclick = (e) => {
                    e.stopPropagation();
                    if (confirm(`Delete page "${page.name}"?`)) {
                        AppState.state.pages.splice(index, 1);
                        if (AppState.currentPageIndex >= AppState.pages.length) {
                            AppState.setCurrentPageIndex(AppState.pages.length - 1);
                        } else {
                            // Force update if index didn't change but content did
                            AppState.setPages(AppState.pages);
                        }
                    }
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
        const newId = AppState.pages.length;
        const newPage = {
            id: `page_${newId}`,
            name: `Page ${newId + 1}`,
            widgets: []
        };
        const newPages = [...AppState.pages, newPage];
        AppState.setPages(newPages);
        AppState.setCurrentPageIndex(newPages.length - 1);
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

        const pages = [...AppState.pages];
        const [movedPage] = pages.splice(fromIndex, 1);
        pages.splice(insertIndex, 0, movedPage);

        // Renumber IDs? The original code did this.
        // It might be better to keep stable IDs, but for now let's stick to the original behavior
        // to avoid breaking backend expectations if any.
        pages.forEach((p, i) => {
            p.id = `page_${i}`;
        });

        AppState.setPages(pages);

        // Update selection
        if (AppState.currentPageIndex === fromIndex) {
            AppState.setCurrentPageIndex(insertIndex);
        } else if (AppState.currentPageIndex > fromIndex && AppState.currentPageIndex <= insertIndex) {
            AppState.setCurrentPageIndex(AppState.currentPageIndex - 1);
        } else if (AppState.currentPageIndex < fromIndex && AppState.currentPageIndex >= insertIndex) {
            AppState.setCurrentPageIndex(AppState.currentPageIndex + 1);
        }
    }

    handlePaletteClick(e) {
        const debugDiv = document.getElementById('debug-overlay');
        if (debugDiv) debugDiv.innerHTML += 'handlePaletteClick triggered<br>';

        console.log("Sidebar: handlePaletteClick", e.target);
        const item = e.target.closest(".item[data-widget-type]");
        if (!item) {
            console.log("Sidebar: No item found");
            if (debugDiv) debugDiv.innerHTML += 'No item found<br>';
            return;
        }
        const type = item.getAttribute("data-widget-type");
        console.log("Sidebar: Creating widget of type", type);
        if (debugDiv) debugDiv.innerHTML += 'Creating widget: ' + type + '<br>';

        try {
            const widget = WidgetFactory.createWidget(type);
            console.log("Sidebar: Widget created", widget);
            if (debugDiv) debugDiv.innerHTML += 'Widget created<br>';

            AppState.addWidget(widget);
            console.log("Sidebar: Widget added to state");
            if (debugDiv) debugDiv.innerHTML += 'Widget added to state<br>';
        } catch (err) {
            console.error("Sidebar: Error creating/adding widget", err);
            if (debugDiv) debugDiv.innerHTML += 'Error: ' + err.message + '<br>';
        }
    }

    openPageSettings(index) {
        if (window.app && window.app.pageSettings) {
            window.app.pageSettings.open(index);
        } else {
            console.error("Sidebar: PageSettings instance not found on window.app");
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

    handleClearPage() {
        if (!confirm('Clear all widgets from the current page?')) {
            return;
        }
        const currentPage = AppState.pages[AppState.currentPageIndex];
        if (currentPage) {
            currentPage.widgets = [];
            emit(EVENTS.STATE_CHANGED);
            console.log('Cleared all widgets from current page');
        }
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
