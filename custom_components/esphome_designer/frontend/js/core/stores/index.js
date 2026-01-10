import { ProjectStore } from './project_store.js';
import { EditorStore } from './editor_store.js';
import { PreferencesStore } from './preferences_store.js';
import { SecretsStore } from './secrets_store.js';
import { emit, EVENTS } from '../events.js';
import { Logger } from '../../utils/logger.js';
import { hasHaBackend } from '../../utils/env.js';
import { generateId } from '../../utils/helpers.js';

class AppStateFacade {
    constructor() {
        this.project = new ProjectStore();
        this.editor = new EditorStore();
        this.preferences = new PreferencesStore();
        this.secrets = new SecretsStore();

        this.recordHistory();
    }

    reset() {
        this.project.reset();
        this.editor.state.selectedWidgetIds = [];
        this.recordHistory();
    }

    // --- Geters ---
    get pages() { return this.project.pages; }
    get currentPageIndex() { return this.project.currentPageIndex; }
    get selectedWidgetId() { return this.editor.selectedWidgetIds[0] || null; }
    get selectedWidgetIds() { return this.editor.selectedWidgetIds; }
    get settings() {
        return {
            ...this.preferences.state,
            device_name: this.project.deviceName,
            device_model: this.project.deviceModel,
            ...this.secrets.keys
        };
    }
    get deviceName() { return this.project.deviceName; }
    get deviceModel() { return this.project.deviceModel; }
    get currentLayoutId() { return this.project.currentLayoutId; }
    get snapEnabled() { return this.preferences.snapEnabled; }
    get showGrid() { return this.preferences.showGrid; }
    get zoomLevel() { return this.editor.zoomLevel; }

    getCurrentPage() { return this.project.getCurrentPage(); }
    getWidgetById(id) { return this.project.getWidgetById(id); }
    getSelectedWidget() { return this.project.getWidgetById(this.editor.selectedWidgetIds[0]); }
    getSelectedWidgets() { return this.editor.selectedWidgetIds.map(id => this.getWidgetById(id)).filter(w => !!w); }

    getCanvasDimensions() {
        return this.project.getCanvasDimensions(this.preferences.state.orientation);
    }

    getCanvasShape() {
        return "rect"; // Fallback or implement profile lookup
    }

    getPagesPayload() {
        return this.project.getPagesPayload ? this.project.getPagesPayload() : {
            pages: this.project.pages,
            ...this.settings
        };
    }

    getSettings() { return this.settings; }
    setSettings(s) { this.updateSettings(s); }

    // --- Persistence ---
    saveToLocalStorage() {
        if (!hasHaBackend()) {
            localStorage.setItem('esphome-designer-layout', JSON.stringify(this.getPagesPayload()));
        }
    }

    loadFromLocalStorage() {
        try {
            const data = localStorage.getItem('esphome-designer-layout');
            return data ? JSON.parse(data) : null;
        } catch (e) {
            return null;
        }
    }

    // --- Actions ---
    setPages(pages) {
        this.project.setPages(pages);
        this.recordHistory();
        emit(EVENTS.STATE_CHANGED);
    }

    reorderWidget(pageIndex, fromIndex, toIndex) {
        this.project.reorderWidget(pageIndex, fromIndex, toIndex);
        this.recordHistory();
        emit(EVENTS.STATE_CHANGED);
    }

    setCurrentPageIndex(index) {
        this.project.setCurrentPageIndex(index);
        this.editor.setSelectedWidgetIds([]);
        emit(EVENTS.STATE_CHANGED);
    }

    selectWidget(id, multi) { this.editor.selectWidget(id, multi); }
    selectWidgets(ids) { this.editor.setSelectedWidgetIds(ids); }

    updateSettings(newSettings) {
        const secretUpdates = {};
        const prefUpdates = {};

        Object.keys(newSettings).forEach(key => {
            if (key.startsWith('ai_api_key_')) secretUpdates[key] = newSettings[key];
            else prefUpdates[key] = newSettings[key];
        });

        if (Object.keys(secretUpdates).length) {
            Object.entries(secretUpdates).forEach(([k, v]) => this.secrets.set(k, v));
        }

        this.preferences.update(prefUpdates);

        if (newSettings.device_name) this.project.state.deviceName = newSettings.device_name;
        if (newSettings.device_model) this.project.state.deviceModel = newSettings.device_model;

        emit(EVENTS.STATE_CHANGED);
    }

    setDeviceName(name) { this.project.state.deviceName = name; this.updateLayoutIndicator(); }
    setDeviceModel(model) { this.project.state.deviceModel = model; this.updateLayoutIndicator(); }
    setCurrentLayoutId(id) { this.project.state.currentLayoutId = id; this.updateLayoutIndicator(); }

    updateLayoutIndicator() {
        const nameEl = document.getElementById('currentLayoutName');
        if (nameEl) nameEl.textContent = this.project.deviceName || this.project.currentLayoutId || "Unknown";
    }

    setSnapEnabled(e) { this.preferences.setSnapEnabled(e); }
    setShowGrid(e) { this.preferences.setShowGrid(e); }
    setZoomLevel(l) { this.editor.setZoomLevel(l); }

    // --- Widget Ops ---
    setCustomHardware(config) {
        this.project.state.customHardware = config;
        emit(EVENTS.STATE_CHANGED);
    }

    addWidget(w) {
        this.project.addWidget(w);
        this.recordHistory();
        this.selectWidget(w.id);
        emit(EVENTS.STATE_CHANGED);
    }
    updateWidget(id, u) {
        this.project.updateWidget(id, u);
        emit(EVENTS.STATE_CHANGED);
    }
    updateWidgets(ids, u) {
        ids.forEach(id => this.project.updateWidget(id, u));
        emit(EVENTS.STATE_CHANGED);
    }
    deleteWidget(id) {
        const ids = id ? [id] : [...this.editor.selectedWidgetIds];
        this.project.deleteWidgets(ids);
        this.editor.setSelectedWidgetIds([]);
        this.recordHistory();
        emit(EVENTS.STATE_CHANGED);
    }

    clearCurrentPage(preserveLocked = false) {
        const result = this.project.clearCurrentPage(preserveLocked);
        if (result.deleted > 0) {
            this.editor.setSelectedWidgetIds([]);
            this.recordHistory();
            emit(EVENTS.STATE_CHANGED);
        }
        return result;
    }

    copyWidget(id) {
        const targetIds = id ? [id] : this.editor.selectedWidgetIds;
        const widgets = targetIds.map(id => this.getWidgetById(id)).filter(w => !!w);
        if (widgets.length > 0) {
            this.editor.copyWidgets(widgets);
        }
    }

    pasteWidget() {
        const clipboard = this.editor.clipboardWidgets;
        if (!clipboard || clipboard.length === 0) return;

        const newWidgets = clipboard.map(w => {
            const pasted = JSON.parse(JSON.stringify(w)); // Deep clone
            pasted.id = generateId();
            pasted.x += 10;
            pasted.y += 10;
            return pasted;
        });

        newWidgets.forEach(w => this.project.addWidget(w));
        this.editor.setSelectedWidgetIds(newWidgets.map(w => w.id));
        this.recordHistory();
        emit(EVENTS.STATE_CHANGED);
    }

    createDropShadow(widgetId) {
        const widget = this.getWidgetById(widgetId);
        if (!widget) return;

        // 1. Create Shadow
        const shadow = JSON.parse(JSON.stringify(widget));
        shadow.id = generateId();
        shadow.x = (shadow.x || 0) + 5;
        shadow.y = (shadow.y || 0) + 5;

        if (!shadow.props) shadow.props = {};

        // Determine effective dark mode first (needed for both shadow and original)
        const page = this.project.getCurrentPage();
        const pageDarkMode = page ? page.dark_mode : undefined;
        let isDark = false;
        if (pageDarkMode === "dark") isDark = true;
        else if (pageDarkMode === "light") isDark = false;
        else isDark = !!this.settings.dark_mode;

        // Shadow color: Black in light mode, White in dark mode
        const shadowColor = isDark ? "white" : "black";

        // Configure Shadow: Solid color based on theme
        shadow.props.color = shadowColor;
        shadow.props.border_color = shadowColor;
        shadow.props.background_color = shadowColor;
        shadow.props.bg_color = shadowColor;
        shadow.props.fill = true;

        if (shadow.props.name) shadow.props.name = shadow.props.name + " Shadow";

        this.project.addWidget(shadow);

        // 2. Modify Original Widget (Only for Shapes)
        const shapeTypes = ["shape_rect", "rounded_rect", "shape_circle", "rectangle", "rrect", "circle"];
        if (shapeTypes.includes(widget.type)) {
            // Fill color matches background (opposite of shadow)
            const fillColor = isDark ? "black" : "white";

            if (!widget.props) widget.props = {};

            // Preserve original border color (if it was using 'color' property)
            // In dark mode, undefined color means WHITE (foreground)
            // In light mode, undefined color means BLACK (foreground)
            const defaultForeground = isDark ? "white" : "black";
            const originalColor = widget.props.color || defaultForeground;
            if (!widget.props.border_color) {
                widget.props.border_color = originalColor;
            }

            // Apply Fill
            widget.props.fill = true;
            widget.props.color = fillColor;
            // Also set other common background props to be sure
            widget.props.background_color = fillColor;
            widget.props.bg_color = fillColor;
        }

        // 3. Reorder Logic (Shadow behind)
        // Note: 'page' is already defined above
        const originalIndex = page.widgets.findIndex(w => w.id === widgetId);
        const shadowIndex = page.widgets.findIndex(w => w.id === shadow.id); // Should be last

        if (originalIndex !== -1 && shadowIndex !== -1) {
            // move shadow to originalIndex (which pushes original and subsequent up by 1)
            this.project.reorderWidget(this.project.currentPageIndex, shadowIndex, originalIndex);
        }

        this.recordHistory();
        emit(EVENTS.STATE_CHANGED);
    }

    // --- History ---
    recordHistory() {
        this.editor.recordHistory({
            pages: this.project.pages,
            deviceName: this.project.deviceName
        });
    }

    undo() {
        const s = this.editor.undo();
        if (s) this.restoreSnapshot(s);
    }

    redo() {
        const s = this.editor.redo();
        if (s) this.restoreSnapshot(s);
    }

    restoreSnapshot(s) {
        this.project.state.pages = s.pages;
        this.project.state.deviceName = s.deviceName;
        this.project.rebuildWidgetsIndex();
        emit(EVENTS.STATE_CHANGED);
    }

    canUndo() { return this.editor.canUndo(); }
    canRedo() { return this.editor.canRedo(); }
}

export const AppState = new AppStateFacade();
window.AppState = AppState;
