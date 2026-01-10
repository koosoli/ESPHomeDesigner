/**
 * Quick Widget Search - Command Palette Style Widget Selector
 * Opens with Shift+Space, allows quick searching and adding widgets
 */
import { Logger } from '../utils/logger.js';
export class QuickSearch {
    constructor() {
        this.isOpen = false;
        this.selectedIndex = 0;
        this.filteredWidgets = [];
        this.allWidgets = [];
        this.modal = null;
        this.input = null;
        this.resultsContainer = null;

        this.init();
    }

    init() {
        this.createModal();
        this.bindEvents();
    }

    /**
     * Dynamically discover all widgets from the editor palette
     * This ensures new widgets are automatically included
     */
    discoverWidgets() {
        this.allWidgets = [];

        // Find all widget items across all category containers
        const items = document.querySelectorAll(".widget-category .item[data-widget-type]");
        if (items.length === 0) {
            Logger.warn("[QuickSearch] No widgets found in palette");
            return;
        }

        items.forEach(item => {
            const type = item.getAttribute("data-widget-type");
            const labelEl = item.querySelector(".label");
            const label = labelEl ? labelEl.textContent.trim() : type;

            // Find the parent category
            const categoryContainer = item.closest(".widget-category");
            const categoryNameEl = categoryContainer ? categoryContainer.querySelector(".category-name") : null;
            const category = categoryNameEl ? categoryNameEl.textContent.trim() : "Widgets";

            this.allWidgets.push({
                type: type,
                label: label,
                category: category,
                searchText: `${label} ${type} ${category}`.toLowerCase()
            });
        });

        Logger.log(`[QuickSearch] Discovered ${this.allWidgets.length} widgets`);
    }

    createModal() {
        // Create modal container
        this.modal = document.createElement("div");
        this.modal.id = "quick-search-modal";
        this.modal.className = "quick-search-modal hidden";
        this.modal.innerHTML = `
            <div class="quick-search-backdrop"></div>
            <div class="quick-search-container">
                <div class="quick-search-header">
                    <span class="quick-search-icon">🔍</span>
                    <input type="text" class="quick-search-input" placeholder="Search widgets..." autocomplete="off" />
                </div>
                <div class="quick-search-results"></div>
                <div class="quick-search-hint">
                    <span>↑↓ Navigate</span>
                    <span>↵ Add Widget</span>
                    <span>Esc Close</span>
                </div>
            </div>
        `;
        document.body.appendChild(this.modal);

        this.input = this.modal.querySelector(".quick-search-input");
        this.resultsContainer = this.modal.querySelector(".quick-search-results");
    }

    bindEvents() {
        // Close on backdrop click
        this.modal.querySelector(".quick-search-backdrop").addEventListener("click", () => this.close());

        // Input handling
        this.input.addEventListener("input", () => this.handleSearch());
        this.input.addEventListener("keydown", (e) => this.handleKeyDown(e));
    }

    open() {
        // Re-discover widgets in case new ones were added dynamically
        this.discoverWidgets();

        this.isOpen = true;
        this.modal.classList.remove("hidden");
        this.input.value = "";
        this.selectedIndex = 0;
        this.handleSearch(); // Show all widgets

        // Focus input after a small delay for animation
        setTimeout(() => this.input.focus(), 50);
    }

    close() {
        this.isOpen = false;
        this.modal.classList.add("hidden");
        this.input.blur();
    }

    handleSearch() {
        const query = this.input.value.toLowerCase().trim();

        if (query === "") {
            this.filteredWidgets = [...this.allWidgets];
        } else {
            this.filteredWidgets = this.allWidgets.filter(w =>
                w.searchText.includes(query)
            );
        }

        this.selectedIndex = 0;
        this.renderResults();
    }

    renderResults() {
        if (this.filteredWidgets.length === 0) {
            this.resultsContainer.innerHTML = `
                <div class="quick-search-empty">No widgets found</div>
            `;
            return;
        }

        this.resultsContainer.innerHTML = this.filteredWidgets.map((widget, index) => `
            <div class="quick-search-item ${index === this.selectedIndex ? 'selected' : ''}" 
                 data-index="${index}" data-type="${widget.type}">
                <span class="quick-search-item-label">${widget.label}</span>
                <span class="quick-search-item-category">${widget.category}</span>
            </div>
        `).join("");

        // Add click handlers
        this.resultsContainer.querySelectorAll(".quick-search-item").forEach(item => {
            item.addEventListener("click", () => {
                const index = parseInt(item.getAttribute("data-index"), 10);
                this.selectedIndex = index;
                this.addSelectedWidget();
            });
        });

        // Scroll selected into view
        const selectedEl = this.resultsContainer.querySelector(".quick-search-item.selected");
        if (selectedEl) {
            selectedEl.scrollIntoView({ block: "nearest" });
        }
    }

    handleKeyDown(e) {
        switch (e.key) {
            case "ArrowDown":
                e.preventDefault();
                this.selectedIndex = Math.min(this.selectedIndex + 1, this.filteredWidgets.length - 1);
                this.renderResults();
                break;
            case "ArrowUp":
                e.preventDefault();
                this.selectedIndex = Math.max(this.selectedIndex - 1, 0);
                this.renderResults();
                break;
            case "Enter":
                e.preventDefault();
                this.addSelectedWidget();
                break;
            case "Escape":
                e.preventDefault();
                this.close();
                break;
        }
    }

    addSelectedWidget() {
        if (this.filteredWidgets.length === 0) return;

        const widget = this.filteredWidgets[this.selectedIndex];
        if (!widget) return;

        try {
            const newWidget = WidgetFactory.createWidget(widget.type);
            AppState.addWidget(newWidget);
            Logger.log(`[QuickSearch] Added widget: ${widget.label}`);
            this.close();
        } catch (err) {
            Logger.error("[QuickSearch] Error adding widget:", err);
            AppState.notify("Failed to add widget: " + err.message, "error");
        }
    }
}

