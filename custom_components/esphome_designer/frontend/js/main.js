import { Sidebar } from './core/sidebar.js';
import { Canvas } from './core/canvas.js';
import { PropertiesPanel } from './core/properties.js';
import { EditorSettings } from './ui/editor_settings.js';
import { SnippetManager } from './ui/snippet_manager.js';
import { KeyboardHandler } from './core/keyboard.js';
import { AppState } from './core/state';
import { on, EVENTS } from './core/events.js';
import { hasHaBackend } from './utils/env.js';
import { Logger } from './utils/logger.js';
import { installIgnorableRejectionHandler } from './utils/ignorable_rejections.js';
import { initUI } from './ui/components/init_ui.js';
import {
    attachAppNamespace,
    attachStateNamespace,
    clearBootPromise,
    getBootPromise,
    hasBootstrapSurface,
    hasUiPlaceholders,
    setBootPromise
} from './core/app_bootstrap_runtime.js';
import { createLazyInstanceLoader } from './core/lazy_instance_loader.js';
import { createAdapterForMode } from './io/adapter_factory.js';
import {
    bindGlobalButtons,
    loadInitialProjectState,
    restoreEditorThemePreference,
    scheduleInitialCanvasFocus
} from './ui/app_runtime_helpers.js';

import './core/legacy_runtime_modules.js';

import { saveLayoutToBackend } from './io/ha_api.js';
import { loadExternalProfiles } from './io/devices.js';
import { loadLayoutIntoState } from './io/yaml_import';
import { renderWidgetPalette } from './ui/widget_palette.js';
import { QuickSearch } from './ui/quick_search.js';
import { HierarchyView } from './ui/hierarchy_view.js';

installIgnorableRejectionHandler();

/** @typedef {ReturnType<typeof setTimeout>} TimerHandle */

export class App {
    constructor() {
        /** @type {import('./core/sidebar.js').Sidebar | null} */
        this.sidebar = null;
        /** @type {import('./core/canvas.js').Canvas | null} */
        this.canvas = null;
        /** @type {import('./core/properties.js').PropertiesPanel | null} */
        this.propertiesPanel = null;
        /** @type {import('./ui/hierarchy_view.js').HierarchyView | null} */
        this.hierarchyView = null;
        /** @type {import('./ui/editor_settings.js').EditorSettings | null} */
        this.editorSettings = null;
        /** @type {import('./core/keyboard.js').KeyboardHandler | null} */
        this.keyboardHandler = null;
        /** @type {import('./ui/quick_search.js').QuickSearch | null} */
        this.quickSearch = null;
        /** @type {ReturnType<typeof createAdapterForMode> | null} */
        this.adapter = null;
        /** @type {import('./ui/snippet_manager.js').SnippetManager | null} */
        this.snippetManager = null;
        /** @type {{ open: () => void } | null} */
        this.deviceSettings = null;
        /** @type {{ open: (index: number) => void } | null} */
        this.pageSettings = null;
        /** @type {{ open: () => void } | null} */
        this.llmPrompt = null;
        /** @type {boolean} */
        this.isInitializing = false;
        /** @type {() => Promise<import('./ui/device_settings.js').DeviceSettings>} */
        this._ensureDeviceSettings = createLazyInstanceLoader({
            label: 'DeviceSettings',
            load: () => import('./ui/device_settings.js'),
            create: ({ DeviceSettings }) => {
                const instance = new DeviceSettings();
                instance.init();
                return instance;
            }
        });
        /** @type {() => Promise<import('./ui/page_settings.js').PageSettings>} */
        this._ensurePageSettings = createLazyInstanceLoader({
            label: 'PageSettings',
            load: () => import('./ui/page_settings.js'),
            create: ({ PageSettings }) => {
                const instance = new PageSettings();
                instance.init();
                return instance;
            }
        });
        /** @type {() => Promise<import('./ui/llm_prompt.js').LLMPrompt>} */
        this._ensureLLMPrompt = createLazyInstanceLoader({
            label: 'LLMPrompt',
            load: () => import('./ui/llm_prompt.js'),
            create: ({ LLMPrompt }) => {
                const instance = new LLMPrompt();
                instance.onOpenEditorSettings = () => this.editorSettings?.open();
                instance.init();
                return instance;
            }
        });
        /** @type {() => Promise<import('./ui/layout_manager.js').LayoutManager>} */
        this._ensureLayoutManager = createLazyInstanceLoader({
            label: 'LayoutManager',
            load: () => import('./ui/layout_manager.js'),
            create: ({ LayoutManager }) => new LayoutManager()
        });

        try {
            Logger.log('[App] Constructor started');
            this.sidebar = new Sidebar(this);
            Logger.log('[App] Sidebar created');
            this.canvas = new Canvas(this);
            Logger.log('[App] Canvas created');
            this.propertiesPanel = new PropertiesPanel(this);
            Logger.log('[App] PropertiesPanel created');
            this.hierarchyView = new HierarchyView();
            Logger.log('[App] HierarchyView created');
            this.editorSettings = new EditorSettings();
            Logger.log('[App] EditorSettings created');
            this.keyboardHandler = new KeyboardHandler();
            Logger.log('[App] KeyboardHandler created');
            this.quickSearch = new QuickSearch();
            Logger.log('[App] QuickSearch initialized');

            this.deviceSettings = {
                open: () => void this.openDeviceSettings(),
            };
            this.pageSettings = {
                open: (/** @type {number} */ index) => void this.openPageSettings(index),
            };
            this.llmPrompt = {
                open: () => void this.openAiPrompt(),
            };

            this.adapter = createAdapterForMode(AppState.settings.renderingMode);
            Logger.log('[App] Adapter initialized:', this.adapter.constructor.name);

            this.snippetManager = new SnippetManager(this.adapter);
            Logger.log('[App] SnippetManager initialized');
        } catch (error) {
            Logger.error('[App] Critical Error in Constructor:', error);
        }
    }

    getCoreUi() {
        const { sidebar, canvas, propertiesPanel, hierarchyView, editorSettings, quickSearch } = this;
        if (!sidebar || !canvas || !propertiesPanel || !hierarchyView || !editorSettings || !quickSearch) {
            throw new Error('[App] Core UI failed to initialize');
        }
        return { sidebar, canvas, propertiesPanel, hierarchyView, editorSettings, quickSearch };
    }

    async init() {
        Logger.log('[App] Initializing ESPHome Designer Designer...');
        Logger.log('[App] AppState:', AppState);
        const { sidebar, canvas, propertiesPanel, hierarchyView, editorSettings, quickSearch } = this.getCoreUi();

        this.isInitializing = true;

        await renderWidgetPalette('widgetPalette');
        sidebar.init();
        propertiesPanel.init();
        hierarchyView.init();
        editorSettings.init();
        quickSearch.discoverWidgets();

        await loadExternalProfiles();
        await loadInitialProjectState({
            loadFromLocalStorage: () => this.loadFromLocalStorage(),
            refreshAdapter: () => this.refreshAdapter()
        });

        restoreEditorThemePreference(AppState, editorSettings);
        this.setupAutoSave();
        this.bindGlobalButtons();

        if (AppState && typeof AppState.updateLayoutIndicator === 'function') {
            AppState.updateLayoutIndicator();
        }

        scheduleInitialCanvasFocus(canvas, AppState.currentPageIndex);

        Logger.log('Initialization complete.');
        this.isInitializing = false;
    }

    bindGlobalButtons() {
        bindGlobalButtons({
            editorSettings: this.editorSettings,
            openDeviceSettings: () => this.openDeviceSettings(),
            openAiPrompt: () => this.openAiPrompt(),
            openLayoutManager: () => this.openLayoutManager()
        });
    }

    async ensureDeviceSettings() {
        return this._ensureDeviceSettings();
    }

    async ensurePageSettings() {
        return this._ensurePageSettings();
    }

    async ensureLLMPrompt() {
        return this._ensureLLMPrompt();
    }

    async ensureLayoutManager() {
        return this._ensureLayoutManager();
    }

    async openDeviceSettings() {
        const deviceSettings = await this.ensureDeviceSettings();
        deviceSettings.open();
    }

    async openPageSettings(/** @type {number} */ index) {
        const pageSettings = await this.ensurePageSettings();
        pageSettings.open(index);
    }

    async openAiPrompt() {
        const llmPrompt = await this.ensureLLMPrompt();
        llmPrompt.open();
    }

    async openLayoutManager() {
        const layoutManager = await this.ensureLayoutManager();
        await layoutManager.open();
    }

    loadFromLocalStorage() {
        try {
            const savedLayout = AppState.loadFromLocalStorage();
            if (savedLayout) {
                Logger.log('[App] Found saved layout in localStorage, loading...');
                loadLayoutIntoState(savedLayout);
            } else {
                Logger.log('[App] No saved layout in localStorage, starting fresh.');
            }
        } catch (error) {
            Logger.error('[App] Error loading from local storage:', error);
        }
    }

    setupAutoSave() {
        /** @type {TimerHandle | null} */
        let autoSaveTimer = null;
        const SAVE_DEBOUNCE_MS = 2000;

        on(EVENTS.STATE_CHANGED, () => {
            if (this.isInitializing) {
                return;
            }

            this.refreshAdapter();

            if (autoSaveTimer) {
                clearTimeout(autoSaveTimer);
            }

            autoSaveTimer = setTimeout(() => {
                if (hasHaBackend()) {
                    Logger.log('[AutoSave] Triggering background save to HA...');
                    saveLayoutToBackend().catch(() => undefined);
                } else {
                    Logger.log('[AutoSave] Saving to local storage...');
                    AppState.saveToLocalStorage();
                }
            }, SAVE_DEBOUNCE_MS);
        });
    }

    refreshAdapter() {
        const mode = AppState.settings.renderingMode || 'direct';
        const currentMode = this.adapter?.mode;
        if (this.adapter && currentMode === mode) {
            return;
        }

        Logger.log(`[App] Refreshing adapter: ${currentMode} -> ${mode}`);
        this.adapter = createAdapterForMode(mode);
        if (this.snippetManager) {
            this.snippetManager.adapter = this.adapter;
            this.snippetManager.updateSnippetBox();
        }
    }
}

export async function bootstrapApp() {
    const existingBootPromise = getBootPromise();
    if (existingBootPromise) {
        const existingApp = await existingBootPromise;
        if (existingApp) {
            attachStateNamespace(AppState);
            attachAppNamespace(existingApp);
        }
        return existingApp;
    }

    if (!hasBootstrapSurface()) {
        return null;
    }

    const bootPromise = (async () => {
        if (hasUiPlaceholders()) {
            initUI();
        }

        const app = new App();
        attachStateNamespace(AppState);
        attachAppNamespace(app);

        try {
            await app.init();
            return app;
        } catch (error) {
            clearBootPromise();
            Logger.error('[App] Failed to initialize:', error);
            throw error;
        }
    })();

    return setBootPromise(bootPromise);
}

function autoBootstrapApp() {
    if (!hasBootstrapSurface()) {
        return;
    }

    void bootstrapApp();
}

document.addEventListener('DOMContentLoaded', autoBootstrapApp, { once: true });

if (document.readyState !== 'loading') {
    queueMicrotask(autoBootstrapApp);
}
