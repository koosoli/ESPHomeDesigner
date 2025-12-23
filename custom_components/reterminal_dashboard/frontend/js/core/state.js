// Imports removed - using global scope
// deepClone from helpers.js
// emit, EVENTS from events.js
// DEFAULT_CANVAS_WIDTH, DEFAULT_CANVAS_HEIGHT, ORIENTATIONS from constants.js

class StateStore {
    constructor() {
        this.state = {
            pages: [],
            currentPageIndex: 0,
            selectedWidgetId: null,
            clipboardWidget: null,

            // Current layout ID (for multi-layout support)
            currentLayoutId: "reterminal_e1001",

            // Device Settings
            deviceName: "Layout 1",
            deviceModel: "reterminal_e1001",
            settings: {
                orientation: ORIENTATIONS.LANDSCAPE,
                dark_mode: false,
                sleep_enabled: false,
                sleep_start_hour: 0,
                sleep_end_hour: 5,
                manual_refresh_only: false,
                deep_sleep_enabled: false,
                deep_sleep_interval: 600,
                daily_refresh_enabled: false,
                daily_refresh_time: "08:00",
                no_refresh_start_hour: null,
                no_refresh_end_hour: null,
                editor_light_mode: false,
                grid_opacity: 8,
                device_model: "reterminal_e1001" // Ensure it's in settings too for consistency
            },

            // Editor State
            snapEnabled: true,
            showGrid: true,
            zoomLevel: 1.0,

            // Cache
            widgetsById: new Map()
        };

        this.historyStack = [];
        this.historyIndex = -1;

        // Initialize with default page
        this.reset();

        // Sync global
        if (this.state.settings.device_model) {
            window.currentDeviceModel = this.state.settings.device_model;
        }

        // Listen for internal state changes to trigger local storage save
        on(EVENTS.STATE_CHANGED, () => {
            if (!hasHaBackend()) {
                this.saveToLocalStorage();
            }
        });
    }

    reset() {
        this.state.pages = [{
            id: "page_0",
            name: "Overview",
            layout: null,  // null = absolute positioning, "4x4" = grid shorthand
            widgets: []
        }];
        this.state.currentPageIndex = 0;
        this.rebuildWidgetsIndex();
        this.recordHistory();
    }

    // --- Getters ---

    get pages() { return this.state.pages; }
    get currentPageIndex() { return this.state.currentPageIndex; }
    get selectedWidgetId() { return this.state.selectedWidgetId; }
    get settings() { return this.state.settings; }
    get deviceName() { return this.state.deviceName; }
    get deviceModel() { return this.state.deviceModel; }
    get currentLayoutId() { return this.state.currentLayoutId; }
    get snapEnabled() { return this.state.snapEnabled; }
    get showGrid() { return this.state.showGrid; }
    get zoomLevel() { return this.state.zoomLevel; }

    getCurrentPage() {
        return this.state.pages[this.state.currentPageIndex] || this.state.pages[0];
    }

    getWidgetById(id) {
        return this.state.widgetsById.get(id);
    }

    getSelectedWidget() {
        return this.state.selectedWidgetId ? this.getWidgetById(this.state.selectedWidgetId) : null;
    }

    getCanvasDimensions() {
        const model = this.state.deviceModel || this.state.settings.device_model || "reterminal_e1001";
        // Safe access to device profile
        const profile = (window.DEVICE_PROFILES && window.DEVICE_PROFILES[model]) ? window.DEVICE_PROFILES[model] : null;

        let width = 800; // Default width
        let height = 480; // Default height

        if (profile) {
            if (profile.resolution) {
                // Use explicit resolution if available
                width = profile.resolution.width;
                height = profile.resolution.height;
            } else if (profile.display_config) {
                // Fallback: Try to find dimensions in the display_config
                let foundWidth = null;
                let foundHeight = null;

                const parseDim = (line) => {
                    const parts = line.split(":");
                    if (parts.length === 2) {
                        return parseInt(parts[1].trim(), 10);
                    }
                    return null;
                };

                for (const line of profile.display_config) {
                    if (line.includes("width:")) foundWidth = parseDim(line);
                    if (line.includes("height:")) foundHeight = parseDim(line);
                }

                if (foundWidth && foundHeight) {
                    width = foundWidth;
                    height = foundHeight;
                }
            }

            // Specific fallbacks if parsing failed
            if (width === 800 && height === 480) { // If still default
                if (model.includes("2432s028")) { width = 320; height = 240; }
                else if (model.includes("4827s032r")) { width = 480; height = 272; }
            }
        }

        // Apply orientation switch
        if (this.state.settings.orientation === ORIENTATIONS.PORTRAIT) {
            return { width: Math.min(width, height), height: Math.max(width, height) };
        } else {
            // Landscape: ensure width > height usually, BUT some devices are natively portrait.
            // However, the editor "Landscape" usually implies Width > Height.
            // If the device is NATURALLY portrait (like phones), Landscape means rotated.
            // So we should return the larger dim as width.
            return { width: Math.max(width, height), height: Math.min(width, height) };
        }
    }

    getPagesPayload() {
        return {
            pages: this.state.pages,
            ...this.state.settings
        };
    }

    getSettings() {
        return this.state.settings;
    }

    setSettings(newSettings) {
        this.updateSettings(newSettings);
    }

    /**
     * Saves the current layout state to browser localStorage.
     */
    saveToLocalStorage() {
        try {
            const payload = this.getPagesPayload();
            localStorage.setItem('esphome-designer-layout', JSON.stringify(payload));
            // console.log("[StateStore] State saved to localStorage");
        } catch (e) {
            console.warn("[StateStore] Failed to save to localStorage:", e);
        }
    }

    /**
     * Loads the layout state from browser localStorage.
     * @returns {Object|null} The loaded layout or null if not found.
     */
    loadFromLocalStorage() {
        try {
            const data = localStorage.getItem('esphome-designer-layout');
            if (data) {
                const layout = JSON.parse(data);
                console.log("[StateStore] State loaded from localStorage");
                return layout;
            }
        } catch (e) {
            console.warn("[StateStore] Failed to load from localStorage:", e);
        }
        return null;
    }

    // --- Actions ---

    setPages(pages) {
        this.state.pages = pages;
        this.rebuildWidgetsIndex();
        emit(EVENTS.STATE_CHANGED);
    }

    setCurrentPageIndex(index) {
        if (index >= 0 && index < this.state.pages.length) {
            this.state.currentPageIndex = index;
            this.state.selectedWidgetId = null; // Deselect on page change
            emit(EVENTS.PAGE_CHANGED, { index });
            emit(EVENTS.SELECTION_CHANGED, { widgetId: null });
        }
    }

    selectWidget(widgetId) {
        this.state.selectedWidgetId = widgetId;
        emit(EVENTS.SELECTION_CHANGED, { widgetId });
    }

    updateSettings(newSettings) {
        this.state.settings = { ...this.state.settings, ...newSettings };
        emit(EVENTS.SETTINGS_CHANGED, this.state.settings);
        emit(EVENTS.STATE_CHANGED);
    }

    setDeviceName(name) {
        this.state.deviceName = name;
        this.state.settings.device_name = name;
        emit(EVENTS.SETTINGS_CHANGED, { deviceName: name });
        this.updateLayoutIndicator();
    }

    setDeviceModel(model) {
        this.state.deviceModel = model;
        // Sync global for canvas rounding logic
        window.currentDeviceModel = model;
        emit(EVENTS.SETTINGS_CHANGED, { deviceModel: model });
        this.updateLayoutIndicator();
    }

    setCurrentLayoutId(layoutId) {
        this.state.currentLayoutId = layoutId;
        console.log("[AppState] Current layout ID set to:", layoutId);
        // Update the UI indicator
        this.updateLayoutIndicator();
    }

    updateLayoutIndicator() {
        const nameEl = document.getElementById('currentLayoutName');
        const deviceEl = document.getElementById('currentLayoutDevice');
        if (nameEl) {
            nameEl.textContent = this.state.deviceName || this.state.currentLayoutId || "Unknown";
        }
        if (deviceEl) {
            const model = this.state.deviceModel || this.state.settings?.device_model || "";
            if (model.includes("e1002")) {
                deviceEl.textContent = "(E1002)";
            } else if (model.includes("e1001")) {
                deviceEl.textContent = "(E1001)";
            } else {
                deviceEl.textContent = "";
            }
        }
    }

    setSnapEnabled(enabled) {
        this.state.snapEnabled = enabled;
        emit(EVENTS.SETTINGS_CHANGED, { snapEnabled: enabled });
    }

    setShowGrid(enabled) {
        this.state.showGrid = enabled;
        emit(EVENTS.SETTINGS_CHANGED, { showGrid: enabled });
    }

    setZoomLevel(level) {
        // Clamp zoom level between 10% and 300%
        this.state.zoomLevel = Math.max(0.1, Math.min(3.0, level));
        emit(EVENTS.ZOOM_CHANGED, { zoomLevel: this.state.zoomLevel });
    }

    // --- Widget Operations ---

    addWidget(widget) {
        const page = this.getCurrentPage();
        page.widgets.push(widget);
        this.state.widgetsById.set(widget.id, widget);
        this.recordHistory();
        emit(EVENTS.STATE_CHANGED);  // Update YAML first
        this.selectWidget(widget.id);  // Then highlight it
    }

    updateWidget(widgetId, updates) {
        const widget = this.getWidgetById(widgetId);
        if (widget) {
            Object.assign(widget, updates);
            emit(EVENTS.STATE_CHANGED);
        }
    }

    deleteWidget(widgetId) {
        const page = this.getCurrentPage();
        const idx = page.widgets.findIndex(w => w.id === widgetId);
        if (idx !== -1) {
            page.widgets.splice(idx, 1);
            this.state.widgetsById.delete(widgetId);
            if (this.state.selectedWidgetId === widgetId) {
                this.selectWidget(null);
            }
            this.recordHistory();
            emit(EVENTS.STATE_CHANGED);
        }
    }

    copyWidget() {
        if (this.state.selectedWidgetId) {
            const widget = this.getWidgetById(this.state.selectedWidgetId);
            if (widget) {
                this.state.clipboardWidget = deepClone(widget);
                console.log("Copied widget:", this.state.clipboardWidget);
            }
        }
    }

    pasteWidget() {
        if (this.state.clipboardWidget) {
            const newWidget = deepClone(this.state.clipboardWidget);
            newWidget.id = "w_" + Date.now() + "_" + Math.floor(Math.random() * 1000);

            // Initial offset
            newWidget.x += 20;
            newWidget.y += 20;

            // Smart Cascade: Prevent exact overlap with existing widgets
            const page = this.getCurrentPage();
            let attempts = 0;
            const maxAttempts = 50;

            while (attempts < maxAttempts) {
                // Check for intersection with any existing widget (using a small threshold for "same spot")
                // We use a small tolerance (e.g. 5px) to detect "basically on top of each other"
                const collision = page.widgets.some(w =>
                    Math.abs(w.x - newWidget.x) < 10 && Math.abs(w.y - newWidget.y) < 10
                );

                if (!collision) break;

                // Shift down-right if occupied
                newWidget.x += 20;
                newWidget.y += 20;
                attempts++;
            }

            // Ensure it fits on canvas
            const dims = this.getCanvasDimensions();
            if (newWidget.x + newWidget.width > dims.width) newWidget.x = Math.max(0, dims.width - newWidget.width);
            if (newWidget.y + newWidget.height > dims.height) newWidget.y = Math.max(0, dims.height - newWidget.height);

            this.addWidget(newWidget);
        }
    }

    // --- History (Undo/Redo) ---

    recordHistory() {
        // Deep copy state for history
        const snapshot = {
            pages: deepClone(this.state.pages),
            settings: deepClone(this.state.settings),
            deviceName: this.state.deviceName
        };

        // Deduplicate
        if (this.historyIndex >= 0) {
            const lastSnapshot = this.historyStack[this.historyIndex];
            if (JSON.stringify(lastSnapshot) === JSON.stringify(snapshot)) {
                return;
            }
        }

        // Truncate future
        if (this.historyIndex < this.historyStack.length - 1) {
            this.historyStack = this.historyStack.slice(0, this.historyIndex + 1);
        }

        this.historyStack.push(snapshot);
        this.historyIndex++;

        // Limit stack
        if (this.historyStack.length > 50) {
            this.historyStack.shift();
            this.historyIndex--;
        }

        emit(EVENTS.HISTORY_CHANGED, { canUndo: this.canUndo(), canRedo: this.canRedo() });
    }

    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.restoreSnapshot(this.historyStack[this.historyIndex]);
        }
    }

    redo() {
        if (this.historyIndex < this.historyStack.length - 1) {
            this.historyIndex++;
            this.restoreSnapshot(this.historyStack[this.historyIndex]);
        }
    }

    canUndo() { return this.historyIndex > 0; }
    canRedo() { return this.historyIndex < this.historyStack.length - 1; }

    restoreSnapshot(snapshot) {
        this.state.pages = deepClone(snapshot.pages);
        this.state.settings = deepClone(snapshot.settings);
        this.state.deviceName = snapshot.deviceName;

        this.rebuildWidgetsIndex();

        // Validate current page index
        if (this.state.currentPageIndex >= this.state.pages.length) {
            this.state.currentPageIndex = 0;
        }

        this.selectWidget(null);
        emit(EVENTS.STATE_CHANGED);
        emit(EVENTS.HISTORY_CHANGED, { canUndo: this.canUndo(), canRedo: this.canRedo() });
    }

    // --- Internal ---

    rebuildWidgetsIndex() {
        this.state.widgetsById.clear();
        for (const page of this.state.pages) {
            for (const w of page.widgets) {
                this.state.widgetsById.set(w.id, w);
            }
        }
    }
}

const AppState = new StateStore();
window.AppState = AppState;
