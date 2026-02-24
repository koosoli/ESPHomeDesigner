import { ProjectStore } from './project_store.js';
import { EditorStore } from './editor_store.js';
import { PreferencesStore } from './preferences_store.js';
import { SecretsStore } from './secrets_store.js';

import { SelectionManager } from './app_state/selection_manager.js';
import { HistoryManager } from './app_state/history_manager.js';
import { WidgetManager } from './app_state/widget_manager.js';
import { PageManager } from './app_state/page_manager.js';

import { emit, EVENTS, on } from '../events.js';
import { Logger } from '../../utils/logger.js';
import { hasHaBackend } from '../../utils/env.js';
import { DEVICE_PROFILES } from '../../io/devices.js';

export class AppStateFacade {
    constructor() {
        this.project = new ProjectStore();
        this.editor = new EditorStore();
        this.preferences = new PreferencesStore();
        this.secrets = new SecretsStore();

        // Sub-managers (Composition)
        this.selectionManager = new SelectionManager(this);
        this.historyManager = new HistoryManager(this);
        this.widgetManager = new WidgetManager(this);
        this.pageManager = new PageManager(this);

        // Guard flag to prevent history recording during undo/redo
        this._isRestoringHistory = false;

        this.recordHistory();

        // Mode Compatibility Sync
        on(EVENTS.SETTINGS_CHANGED, (settings) => {
            if (settings && settings.renderingMode !== undefined) {
                this.syncWidgetVisibilityWithMode();
            }
        });
    }

    reset() {
        this.project.reset();
        this.editor.state.selectedWidgetIds = [];
        this.recordHistory();
    }

    // --- Getters ---
    /** @returns {import('../../types.js').PageConfig[]} */
    get pages() { return this.project.pages; }
    /** @returns {number} */
    get currentPageIndex() { return this.project.currentPageIndex; }
    /** @returns {string|null} */
    get selectedWidgetId() { return this.editor.selectedWidgetIds[0] || null; }
    /** @returns {string[]} */
    get selectedWidgetIds() { return this.editor.selectedWidgetIds; }
    /** @returns {Object} */
    get settings() {
        return {
            ...this.preferences.state,
            device_name: this.project.deviceName,
            deviceName: this.project.deviceName,
            device_model: this.project.deviceModel,
            deviceModel: this.project.deviceModel,
            customHardware: this.project.customHardware,
            custom_hardware: this.project.customHardware,
            protocolHardware: this.project.protocolHardware,
            protocol_hardware: this.project.protocolHardware,
            ...this.secrets.keys
        };
    }
    /** @returns {string|null} */
    get deviceName() { return this.project.deviceName; }
    /** @returns {string|null} */
    get deviceModel() { return this.project.deviceModel; }
    /** @returns {string|null} */
    get currentLayoutId() { return this.project.currentLayoutId; }
    /** @returns {boolean} */
    get snapEnabled() { return this.preferences.snapEnabled; }
    /** @returns {boolean} */
    get showGrid() { return this.preferences.showGrid; }
    /** @returns {boolean} */
    get showDebugGrid() { return this.preferences.showDebugGrid; }
    /** @returns {boolean} */
    get showRulers() { return this.preferences.showRulers; }
    /** @returns {number} */
    get zoomLevel() { return this.editor.zoomLevel; }

    /** @returns {import('../../types.js').PageConfig | null} */
    getCurrentPage() { return this.project.getCurrentPage(); }

    /** 
     * @param {string} id 
     * @returns {import('../../types.js').WidgetConfig | undefined} 
     */
    getWidgetById(id) { return this.project.getWidgetById(id); }

    /** @returns {import('../../types.js').WidgetConfig | undefined} */
    getSelectedWidget() { return this.project.getWidgetById(this.editor.selectedWidgetIds[0]); }

    /** @returns {import('../../types.js').WidgetConfig[]} */
    getSelectedWidgets() { return this.editor.selectedWidgetIds.map(id => this.getWidgetById(id)).filter(w => !!w); }

    /** @returns {import('../../types.js').DeviceProfile | null} */
    getSelectedProfile() {
        return DEVICE_PROFILES[this.project.deviceModel] || null;
    }

    getCanvasDimensions() {
        const mode = this.preferences.state.renderingMode || 'direct';
        if (mode === 'oepl' || mode === 'opendisplay') {
            const ph = this.project.protocolHardware;
            const orientation = this.preferences.state.orientation;
            if (orientation === 'portrait') {
                return { width: Math.min(ph.width, ph.height), height: Math.max(ph.width, ph.height) };
            }
            return { width: Math.max(ph.width, ph.height), height: Math.min(ph.width, ph.height) };
        }
        return this.project.getCanvasDimensions(this.preferences.state.orientation);
    }

    getCanvasShape() {
        return this.project.getCanvasShape();
    }

    getPagesPayload() {
        const payload = {
            ...this.project.getPagesPayload(),
            currentPageIndex: this.currentPageIndex,
            ...this.settings
        };

        // Settings should not override core project state
        // Re-apply canonical project values to override any stale/null settings
        payload.deviceModel = this.project.deviceModel;
        payload.customHardware = this.project.customHardware;
        payload.protocolHardware = this.project.protocolHardware;

        // Ensure snake_case for HA compatibility
        payload.device_model = this.project.deviceModel;
        payload.custom_hardware = this.project.customHardware;
        payload.protocol_hardware = this.project.protocolHardware;
        return payload;
    }

    getSettings() { return this.settings; }
    setSettings(s) { this.updateSettings(s); }

    updateProtocolHardware(updates) {
        Object.assign(this.project.state.protocolHardware, updates);
        emit(EVENTS.SETTINGS_CHANGED);
        // Force canvas refocus when protocol dimensions change
        emit(EVENTS.PAGE_CHANGED, { index: this.currentPageIndex, forceFocus: true });
    }

    // --- Persistence ---
    saveToLocalStorage() {
        if (!hasHaBackend()) {
            const payload = this.getPagesPayload();
            localStorage.setItem('esphome-designer-layout', JSON.stringify(payload));
        }
    }

    loadFromLocalStorage() {
        try {
            const data = localStorage.getItem('esphome-designer-layout');
            const parsed = data ? JSON.parse(data) : null;
            return parsed;
        } catch (e) {
            console.error('[loadFromLocalStorage] Parse error:', e);
            return null;
        }
    }

    // --- Actions ---
    setPages(pages) {
        this.project.setPages(pages);
        emit(EVENTS.STATE_CHANGED);
    }

    reorderWidget(pageIndex, fromIndex, toIndex) {
        this.pageManager.reorderWidget(pageIndex, fromIndex, toIndex);
    }

    setCurrentPageIndex(index, options = {}) {
        this.pageManager.setCurrentPageIndex(index, options);
    }

    reorderPage(fromIndex, toIndex) {
        this.pageManager.reorderPage(fromIndex, toIndex);
    }

    addPage(atIndex = null) {
        return this.pageManager.addPage(atIndex);
    }

    deletePage(index) {
        this.pageManager.deletePage(index);
    }

    duplicatePage(index) {
        return this.pageManager.duplicatePage(index);
    }

    renamePage(index, newName) {
        this.pageManager.renamePage(index, newName);
    }

    selectWidget(id, multi = false) {
        this.selectionManager.selectWidget(id, multi);
    }

    selectWidgets(ids) {
        this.selectionManager.selectWidgets(ids);
    }

    selectAllWidgets() {
        this.selectionManager.selectAllWidgets();
    }

    deselectAll() {
        this.selectionManager.deselectAll();
    }

    toggleSelection(id) {
        this.selectionManager.toggleSelection(id);
    }

    isWidgetSelected(id) {
        return this.selectionManager.isWidgetSelected(id);
    }

    groupSelection() {
        this.selectionManager.groupSelection();
    }

    ungroupSelection(idOrIds = null) {
        this.selectionManager.ungroupSelection(idOrIds);
    }

    alignSelectedWidgets(direction) {
        this.selectionManager.alignSelectedWidgets(direction);
    }

    distributeSelectedWidgets(axis) {
        this.selectionManager.distributeSelectedWidgets(axis);
    }

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

        // If settings that affect canvas layout changed, trigger a refocus
        if (newSettings.device_model || newSettings.orientation || newSettings.custom_hardware) {
            emit(EVENTS.PAGE_CHANGED, { index: this.currentPageIndex, forceFocus: true });
        }
    }

    setDeviceName(name) {
        this.project.state.deviceName = name;
        this.updateLayoutIndicator();
        emit(EVENTS.STATE_CHANGED);
    }
    setDeviceModel(model) {
        this.project.state.deviceModel = model;
        this.updateLayoutIndicator();
        emit(EVENTS.STATE_CHANGED);
        // Also trigger canvas refocus on model change
        emit(EVENTS.PAGE_CHANGED, { index: this.currentPageIndex, forceFocus: true });
    }
    setCurrentLayoutId(id) {
        this.project.state.currentLayoutId = id;
        this.updateLayoutIndicator();
        emit(EVENTS.STATE_CHANGED);
    }

    updateLayoutIndicator() {
        const nameEl = document.getElementById('currentLayoutName');
        if (nameEl) nameEl.textContent = this.project.deviceName || this.project.currentLayoutId || "Unknown";
    }

    setSnapEnabled(e) { this.preferences.setSnapEnabled(e); }
    setShowGrid(e) { this.preferences.setShowGrid(e); }
    setShowDebugGrid(e) { this.preferences.setShowDebugGrid(e); }
    setShowRulers(e) { this.preferences.setShowRulers(e); }
    setZoomLevel(l) { this.editor.setZoomLevel(l); }

    // --- Widget Ops ---
    setCustomHardware(config) {
        this.widgetManager.setCustomHardware(config);
    }

    addWidget(w, pageIndex = null) {
        this.widgetManager.addWidget(w, pageIndex);
    }

    updateWidget(id, u) {
        this.widgetManager.updateWidget(id, u);
    }

    updateWidgets(ids, u) {
        this.widgetManager.updateWidgets(ids, u);
    }

    updateWidgetsProps(ids, propUpdates) {
        this.widgetManager.updateWidgetsProps(ids, propUpdates);
    }

    deleteWidget(id) {
        this.widgetManager.deleteWidget(id);
    }

    moveWidgetToPage(widgetId, targetPageIndex, x = null, y = null) {
        return this.widgetManager.moveWidgetToPage(widgetId, targetPageIndex, x, y);
    }

    copyWidget(id) {
        this.widgetManager.copyWidget(id);
    }

    pasteWidget() {
        this.widgetManager.pasteWidget();
    }

    createDropShadow(widgetIdOrIds) {
        this.widgetManager.createDropShadow(widgetIdOrIds);
    }

    clearCurrentPage(preserveLocked = false) {
        return this.pageManager.clearCurrentPage(preserveLocked);
    }

    // --- History ---
    recordHistory() {
        this.historyManager.recordHistory();
    }

    undo() {
        this.historyManager.undo();
    }

    redo() {
        this.historyManager.redo();
    }

    setInternalFlag(key, value) {
        // Direct assignment bypassing standard route, useful when 'this' might be a Proxy
        const target = this.$raw || this;
        target[key] = value;
    }

    restoreSnapshot(s) {
        this.historyManager.restoreSnapshot(s);
    }

    canUndo() { return this.historyManager.canUndo(); }
    canRedo() { return this.historyManager.canRedo(); }

    syncWidgetOrderWithHierarchy() {
        this.widgetManager.syncWidgetOrderWithHierarchy();
    }

    syncWidgetVisibilityWithMode() {
        this.widgetManager.syncWidgetVisibilityWithMode();
    }

    _isWidgetCompatibleWithMode(w, mode) {
        return this.widgetManager.isWidgetCompatibleWithMode(w, mode);
    }

    _checkRenderingModeForWidget(w) {
        this.widgetManager.checkRenderingModeForWidget(w);
    }
}

const AppStateInstance = new AppStateFacade();

const handler = {
    set(target, prop, value, receiver) {
        if (prop === 'snapEnabled') {
            Logger.warn(`[StateProxy] Intercepted illegal write to '${prop}'. Automatically rerouting to setSnapEnabled().`);
            if (typeof target.setSnapEnabled === 'function') {
                target.setSnapEnabled(value);
            }
            return true;
        }

        const allowedInternalProps = ['entityStates', '_isRestoringHistory'];

        // Log illegal direct mutations (exceptions: functions and whitelisted internal trackers)
        if (!allowedInternalProps.includes(prop) && typeof target[prop] !== 'function') {
            Logger.warn(`[StateProxy] 🚨 ILLEGAL STATE MUTATION DETECTED: AppState.${prop} = ${value}`);
            console.trace(`[StateProxy] Trace for illegal mutation of AppState.${prop}`);
        }

        return Reflect.set(target, prop, value, receiver);
    }
};

export const AppState = new Proxy(AppStateInstance, handler);
window.AppState = AppState; // Global export for legacy DOM access

// Support Legacy Unified Object Reference
window.ESPHomeDesigner = window.ESPHomeDesigner || {};
window.ESPHomeDesigner.state = AppState;
