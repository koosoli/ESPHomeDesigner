import { ProjectStore } from './project_store.js';
import { EditorStore } from './editor_store';
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
    project: any;
    editor: any;
    preferences: any;
    secrets: any;

    selectionManager: any;
    historyManager: any;
    widgetManager: any;
    pageManager: any;

    _isRestoringHistory: boolean;
    $raw?: AppStateFacade; // For proxy bypass

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
        on(EVENTS.SETTINGS_CHANGED, (settings: any) => {
            if (settings && settings.renderingMode !== undefined) {
                this.syncWidgetVisibilityWithMode();
            }
        });
    }

    reset(): void {
        this.project.reset();
        this.editor.state.selectedWidgetIds = [];
        this.recordHistory();
    }

    // --- Getters ---
    get pages(): any[] { return this.project.pages; }
    get currentPageIndex(): number { return this.project.currentPageIndex; }
    get selectedWidgetId(): string | null { return this.editor.selectedWidgetIds[0] || null; }
    get selectedWidgetIds(): string[] { return this.editor.selectedWidgetIds; }
    get settings(): Record<string, any> {
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
    get deviceName(): string | null { return this.project.deviceName; }
    get deviceModel(): string | null { return this.project.deviceModel; }
    get currentLayoutId(): string | null { return this.project.currentLayoutId; }
    get snapEnabled(): boolean { return this.preferences.snapEnabled; }
    get showGrid(): boolean { return this.preferences.showGrid; }
    get showDebugGrid(): boolean { return this.preferences.showDebugGrid; }
    get showRulers(): boolean { return this.preferences.showRulers; }
    get zoomLevel(): number { return this.editor.zoomLevel; }

    getCurrentPage(): any | null { return this.project.getCurrentPage(); }

    getWidgetById(id: string): any | undefined { return this.project.getWidgetById(id); }

    getSelectedWidget(): any | undefined { return this.project.getWidgetById(this.editor.selectedWidgetIds[0]); }

    getSelectedWidgets(): any[] {
        return this.editor.selectedWidgetIds.map((id: string) => this.getWidgetById(id)).filter((w: any) => !!w);
    }

    getSelectedProfile(): any | null {
        return (DEVICE_PROFILES as Record<string, any>)[this.project.deviceModel] || null;
    }

    getCanvasDimensions(): { width: number; height: number } {
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

    getCanvasShape(): string {
        return this.project.getCanvasShape();
    }

    getPagesPayload(): any {
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

    getSettings(): Record<string, any> { return this.settings; }
    setSettings(s: any): void { this.updateSettings(s); }

    updateProtocolHardware(updates: any): void {
        Object.assign(this.project.state.protocolHardware, updates);
        emit(EVENTS.SETTINGS_CHANGED);
        // Force canvas refocus when protocol dimensions change
        emit(EVENTS.PAGE_CHANGED, { index: this.currentPageIndex, forceFocus: true });
    }

    // --- Persistence ---
    saveToLocalStorage(): void {
        if (!hasHaBackend()) {
            const payload = this.getPagesPayload();
            localStorage.setItem('esphome-designer-layout', JSON.stringify(payload));
        }
    }

    loadFromLocalStorage(): any | null {
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
    setPages(pages: any[]): void {
        this.project.setPages(pages);
        emit(EVENTS.STATE_CHANGED);
    }

    reorderWidget(pageIndex: number, fromIndex: number, toIndex: number): void {
        this.pageManager.reorderWidget(pageIndex, fromIndex, toIndex);
    }

    setCurrentPageIndex(index: number, options: any = {}): void {
        this.pageManager.setCurrentPageIndex(index, options);
    }

    reorderPage(fromIndex: number, toIndex: number): void {
        this.pageManager.reorderPage(fromIndex, toIndex);
    }

    addPage(atIndex: number | null = null): any {
        return this.pageManager.addPage(atIndex);
    }

    deletePage(index: number): void {
        this.pageManager.deletePage(index);
    }

    duplicatePage(index: number): any {
        return this.pageManager.duplicatePage(index);
    }

    renamePage(index: number, newName: string): void {
        this.pageManager.renamePage(index, newName);
    }

    selectWidget(id: string, multi: boolean = false): void {
        this.selectionManager.selectWidget(id, multi);
    }

    selectWidgets(ids: string[]): void {
        this.selectionManager.selectWidgets(ids);
    }

    selectAllWidgets(): void {
        this.selectionManager.selectAllWidgets();
    }

    deselectAll(): void {
        this.selectionManager.deselectAll();
    }

    toggleSelection(id: string): void {
        this.selectionManager.toggleSelection(id);
    }

    isWidgetSelected(id: string): boolean {
        return this.selectionManager.isWidgetSelected(id);
    }

    groupSelection(): void {
        this.selectionManager.groupSelection();
    }

    ungroupSelection(idOrIds: string | string[] | null = null): void {
        this.selectionManager.ungroupSelection(idOrIds);
    }

    alignSelectedWidgets(direction: string): void {
        this.selectionManager.alignSelectedWidgets(direction);
    }

    distributeSelectedWidgets(axis: string): void {
        this.selectionManager.distributeSelectedWidgets(axis);
    }

    updateSettings(newSettings: any): void {
        const secretUpdates: Record<string, any> = {};
        const prefUpdates: Record<string, any> = {};

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

    setDeviceName(name: string): void {
        this.project.state.deviceName = name;
        this.updateLayoutIndicator();
        emit(EVENTS.STATE_CHANGED);
    }
    setDeviceModel(model: string): void {
        this.project.state.deviceModel = model;
        this.updateLayoutIndicator();
        emit(EVENTS.STATE_CHANGED);
        // Also trigger canvas refocus on model change
        emit(EVENTS.PAGE_CHANGED, { index: this.currentPageIndex, forceFocus: true });
    }
    setCurrentLayoutId(id: string): void {
        this.project.state.currentLayoutId = id;
        this.updateLayoutIndicator();
        emit(EVENTS.STATE_CHANGED);
    }

    updateLayoutIndicator(): void {
        const nameEl = document.getElementById('currentLayoutName');
        if (nameEl) nameEl.textContent = this.project.deviceName || this.project.currentLayoutId || "Unknown";
    }

    setSnapEnabled(e: boolean): void { this.preferences.setSnapEnabled(e); }
    setShowGrid(e: boolean): void { this.preferences.setShowGrid(e); }
    setShowDebugGrid(e: boolean): void { this.preferences.setShowDebugGrid(e); }
    setShowRulers(e: boolean): void { this.preferences.setShowRulers(e); }
    setZoomLevel(l: number): void { this.editor.setZoomLevel(l); }

    // --- Widget Ops ---
    setCustomHardware(config: any): void {
        this.widgetManager.setCustomHardware(config);
    }

    addWidget(w: any, pageIndex: number | null = null): void {
        this.widgetManager.addWidget(w, pageIndex);
    }

    updateWidget(id: string, u: any): void {
        this.widgetManager.updateWidget(id, u);
    }

    updateWidgets(ids: string[], u: any): void {
        this.widgetManager.updateWidgets(ids, u);
    }

    updateWidgetsProps(ids: string[], propUpdates: any): void {
        this.widgetManager.updateWidgetsProps(ids, propUpdates);
    }

    deleteWidget(id: string): void {
        this.widgetManager.deleteWidget(id);
    }

    moveWidgetToPage(widgetId: string, targetPageIndex: number, x: number | null = null, y: number | null = null): boolean {
        return this.widgetManager.moveWidgetToPage(widgetId, targetPageIndex, x, y);
    }

    copyWidget(id: string): void {
        this.widgetManager.copyWidget(id);
    }

    pasteWidget(): void {
        this.widgetManager.pasteWidget();
    }

    createDropShadow(widgetIdOrIds: string | string[]): void {
        this.widgetManager.createDropShadow(widgetIdOrIds);
    }

    clearCurrentPage(preserveLocked: boolean = false): void {
        return this.pageManager.clearCurrentPage(preserveLocked);
    }

    // --- History ---
    recordHistory(): void {
        this.historyManager.recordHistory();
    }

    undo(): void {
        this.historyManager.undo();
    }

    redo(): void {
        this.historyManager.redo();
    }

    setInternalFlag(key: string, value: any): void {
        // Direct assignment bypassing standard route, useful when 'this' might be a Proxy
        const target = this.$raw || this;
        (target as any)[key] = value;
    }

    restoreSnapshot(s: any): void {
        this.historyManager.restoreSnapshot(s);
    }

    canUndo(): boolean { return this.historyManager.canUndo(); }
    canRedo(): boolean { return this.historyManager.canRedo(); }

    syncWidgetOrderWithHierarchy(): void {
        this.widgetManager.syncWidgetOrderWithHierarchy();
    }

    syncWidgetVisibilityWithMode(): void {
        this.widgetManager.syncWidgetVisibilityWithMode();
    }

    _isWidgetCompatibleWithMode(w: any, mode: string): boolean {
        return this.widgetManager.isWidgetCompatibleWithMode(w, mode);
    }

    _checkRenderingModeForWidget(w: any): void {
        this.widgetManager.checkRenderingModeForWidget(w);
    }
}

const AppStateInstance = new AppStateFacade();

const handler = {
    set(target: any, prop: string | symbol, value: any, receiver: any) {
        if (prop === 'snapEnabled') {
            Logger.warn(`[StateProxy] Intercepted illegal write to '${String(prop)}'. Automatically rerouting to setSnapEnabled().`);
            if (typeof target.setSnapEnabled === 'function') {
                target.setSnapEnabled(value);
            }
            return true;
        }

        const allowedInternalProps = ['entityStates', '_isRestoringHistory'];

        // Log illegal direct mutations (exceptions: functions and whitelisted internal trackers)
        if (typeof prop === 'string' && !allowedInternalProps.includes(prop) && typeof target[prop] !== 'function') {
            Logger.warn(`[StateProxy] 🚨 ILLEGAL STATE MUTATION DETECTED: AppState.${prop} = ${value}`);
            console.trace(`[StateProxy] Trace for illegal mutation of AppState.${prop}`);
        }

        return Reflect.set(target, prop, value, receiver);
    }
};

export const AppState = new Proxy(AppStateInstance, handler);
(window as any).AppState = AppState; // Global export for legacy DOM access

// Support Legacy Unified Object Reference
(window as any).ESPHomeDesigner = (window as any).ESPHomeDesigner || {};
(window as any).ESPHomeDesigner.state = AppState;
