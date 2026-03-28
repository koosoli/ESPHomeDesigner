import { Sidebar } from './core/sidebar.js';
import { Canvas } from './core/canvas.js';
import { PropertiesPanel } from './core/properties.js';
import { EditorSettings } from './ui/editor_settings.js';
import { SnippetManager } from './ui/snippet_manager.js';
import { KeyboardHandler } from './core/keyboard.js';
import { ESPHomeAdapter } from './io/adapters/esphome_adapter';
import { OEPLAdapter } from './io/adapters/oepl_adapter.js';
import { OpenDisplayAdapter } from './io/adapters/opendisplay_adapter.js';
import { AppState } from './core/state';
import { on, EVENTS } from './core/events.js';
import { hasHaBackend } from './utils/env.js';
import { Logger } from './utils/logger.js';
import { installIgnorableRejectionHandler } from './utils/ignorable_rejections.js';
import { initUI } from './ui/components/init_ui.js';
import {
    attachAppNamespace,
    clearBootPromise,
    getBootPromise,
    hasBootstrapSurface,
    hasUiPlaceholders,
    setBootPromise
} from './core/app_bootstrap_runtime.js';

// Legacy Global Scripts (Now ES Modules)
import './utils/helpers.js';
import './utils/env.js';
import './utils/dom.js';
import './utils/device.js';
import './utils/graph_helpers.js';
import './core/constants';
import './core/utils';
import './core/constants_icons.js';
import './core/plugin_registry';
import './core/widget_factory';
import './core/layout_constants.js';
import './ui/splitters.js';
import './ui/icon_picker.js';
import './ui/radial_menu.js';
import './ui/entity_picker.js';

// Newly modularized imports
import { showToast } from './utils/dom.js';
import { loadLayoutFromBackend, saveLayoutToBackend, fetchEntityStates } from './io/ha_api.js';
import { loadExternalProfiles } from './io/devices.js';
import { saveLayoutToFile, handleFileSelect } from './io/file_ops.js';

import { loadLayoutIntoState } from './io/yaml_import';
import './io/hardware_import.js'; // Register global hardware fetchers

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
        /** @type {any} */
        this.adapter = null;
        /** @type {import('./ui/snippet_manager.js').SnippetManager | null} */
        this.snippetManager = null;
        /** @type {{ open: () => void } | null} */
        this.deviceSettings = null;
        /** @type {{ open: (index: number) => void } | null} */
        this.pageSettings = null;
        /** @type {{ open: () => void } | null} */
        this.llmPrompt = null;
        /** @type {import('./ui/device_settings.js').DeviceSettings | null} */
        this._deviceSettingsInstance = null;
        /** @type {Promise<import('./ui/device_settings.js').DeviceSettings> | null} */
        this._deviceSettingsPromise = null;
        /** @type {import('./ui/page_settings.js').PageSettings | null} */
        this._pageSettingsInstance = null;
        /** @type {Promise<import('./ui/page_settings.js').PageSettings> | null} */
        this._pageSettingsPromise = null;
        /** @type {any | null} */
        this._llmPromptInstance = null;
        /** @type {Promise<any> | null} */
        this._llmPromptPromise = null;
        /** @type {import('./ui/layout_manager.js').LayoutManager | null} */
        this._layoutManagerInstance = null;
        /** @type {Promise<import('./ui/layout_manager.js').LayoutManager> | null} */
        this._layoutManagerPromise = null;
        /** @type {boolean} */
        this.isInitializing = false;

        try {
            Logger.log("[App] Constructor started");
            this.sidebar = new Sidebar(this);
            Logger.log("[App] Sidebar created");
            this.canvas = new Canvas(this);
            Logger.log("[App] Canvas created");
            this.propertiesPanel = new PropertiesPanel(this);
            Logger.log("[App] PropertiesPanel created");
            this.hierarchyView = new HierarchyView();
            Logger.log("[App] HierarchyView created");
            this.editorSettings = new EditorSettings();
            Logger.log("[App] EditorSettings created");
            this.keyboardHandler = new KeyboardHandler();
            Logger.log("[App] KeyboardHandler created");
            this.quickSearch = new QuickSearch();
            Logger.log("[App] QuickSearch initialized");

            // Keep legacy open() call sites intact while deferring optional modal code.
            this.deviceSettings = {
                open: () => void this.openDeviceSettings(),
            };
            this.pageSettings = {
                open: (/** @type {number} */ index) => void this.openPageSettings(index),
            };
            this.llmPrompt = {
                open: () => void this.openAiPrompt(),
            };

            // Initialize Output Adapter
            this.adapter = this.createAdapter();
            Logger.log("[App] Adapter initialized:", this.adapter.constructor.name);

            // Initialize Snippet Manager (Handles YAML IO mostly)
            this.snippetManager = new SnippetManager(this.adapter);
            Logger.log("[App] SnippetManager initialized");

        } catch (e) {
            Logger.error("[App] Critical Error in Constructor:", e);
        }
    }

    getCoreUi() {
        const { sidebar, canvas, propertiesPanel, hierarchyView, editorSettings, quickSearch } = this;
        if (!sidebar || !canvas || !propertiesPanel || !hierarchyView || !editorSettings || !quickSearch) {
            throw new Error("[App] Core UI failed to initialize");
        }
        return { sidebar, canvas, propertiesPanel, hierarchyView, editorSettings, quickSearch };
    }

    async init() {
        Logger.log("[App] Initializing ESPHome Designer Designer...");
        Logger.log("[App] AppState:", AppState);
        const { sidebar, canvas, propertiesPanel, hierarchyView, editorSettings, quickSearch } = this.getCoreUi();

        // Guard to prevent auto-save during initial load
        this.isInitializing = true;

        // Initialize UI components
        await renderWidgetPalette('widgetPalette');
        sidebar.init();
        propertiesPanel.init();
        hierarchyView.init();
        editorSettings.init();
        quickSearch.discoverWidgets();

        // Load external hardware profiles (Hardware folder)
        await loadExternalProfiles();

        // Load saved theme preference from localStorage
        try {
            const savedTheme = localStorage.getItem('reterminal-editor-theme');
            if (savedTheme === 'light') {
                AppState.updateSettings({ editor_light_mode: true });
                editorSettings.applyEditorTheme(true);
            } else {
                editorSettings.applyEditorTheme(false);
            }
        } catch (e) {
            Logger.log('Could not load theme preference:', e);
        }

        // Setup auto-save
        this.setupAutoSave();

        // Bind global buttons
        this.bindGlobalButtons();

        // Load initial data
        try {
            if (hasHaBackend()) {
                Logger.log("HA Backend detected attempt. Loading layout...");
                await loadLayoutFromBackend(); // External profiles are already loaded above
                await fetchEntityStates();
            } else {
                Logger.log("Running in standalone/offline mode.");
                this.loadFromLocalStorage();
            }

            // Sync rendering mode after loading
            this.refreshAdapter();
        } catch (err) {
            Logger.error("[App] Failed to load from backend, falling back to local storage:", err);
            this.loadFromLocalStorage();
            this.refreshAdapter();
        }

        // Update the layout indicator after loading
        if (AppState && typeof AppState.updateLayoutIndicator === 'function') {
            AppState.updateLayoutIndicator();
        }

        // Setup auto-save or auto-update snippet
        // Delegate to SnippetManager? SnippetManager.init() already called setupAutoUpdate() in its constructor.
        // We called init() in constructor of SnippetManager, so it's already running.


        // Explicitly center the view on the current page after everything is loaded
        // We use a small timeout to ensure the DOM has fully updated from the state changes above
        setTimeout(() => {
            if (canvas) {
                Logger.log("[App] Forcing initial canvas centering...");
                canvas.focusPage(AppState.currentPageIndex, false);
            }
        }, 100);

        Logger.log("Initialization complete.");

        // Clear initialization guard - auto-save can now fire
        this.isInitializing = false;
    }

    bindGlobalButtons() {
        // Top Toolbar Buttons
        const saveLayoutBtn = document.getElementById('saveLayoutBtn');
        if (saveLayoutBtn) {
            saveLayoutBtn.addEventListener('click', () => {
                if (hasHaBackend()) {
                    saveLayoutToBackend()
                        .then(() => showToast("Layout saved to Home Assistant", "success"))
                        .catch(err => showToast(`Save failed: ${err.message}`, "error"));
                } else {
                    saveLayoutToFile();
                }
            });
        }

        const loadLayoutBtn = document.getElementById('loadLayoutBtn'); // Hidden file input
        if (loadLayoutBtn) {
            loadLayoutBtn.addEventListener('change', handleFileSelect);
        }

        const importLayoutBtn = document.getElementById('importLayoutBtn');
        if (importLayoutBtn && loadLayoutBtn) {
            importLayoutBtn.addEventListener('click', () => {
                loadLayoutBtn.click();
            });
        }

        // Device Settings
        const deviceSettingsBtn = document.getElementById('deviceSettingsBtn');
        if (deviceSettingsBtn) {
            Logger.log("Device Settings button found, binding click listener.");
            deviceSettingsBtn.addEventListener('click', async () => {
                Logger.log("Device Settings button clicked.");
                await this.openDeviceSettings();
            });
        } else {
            Logger.error("Device Settings button NOT found in DOM.");
        }

        // Editor Settings
        const editorSettingsBtn = document.getElementById('editorSettingsBtn');
        const editorSettings = this.editorSettings;
        if (editorSettingsBtn && editorSettings) {
            editorSettingsBtn.addEventListener('click', () => {
                editorSettings.open();
            });
        }

        // AI Prompt
        const aiPromptBtn = document.getElementById('aiPromptBtn');
        if (aiPromptBtn) {
            aiPromptBtn.addEventListener('click', async () => {
                await this.openAiPrompt();
            });
        }

        const manageLayoutsBtn = document.getElementById('manageLayoutsBtn');
        if (manageLayoutsBtn) {
            manageLayoutsBtn.addEventListener('click', async () => {
                await this.openLayoutManager();
            });
        }
    }

    async ensureDeviceSettings() {
        if (this._deviceSettingsInstance) return this._deviceSettingsInstance;
        if (!this._deviceSettingsPromise) {
            this._deviceSettingsPromise = import('./ui/device_settings.js').then(({ DeviceSettings }) => {
                const instance = new DeviceSettings();
                instance.init();
                this._deviceSettingsInstance = instance;
                Logger.log('[App] DeviceSettings lazy-loaded');
                return instance;
            });
        }

        return this._deviceSettingsPromise;
    }

    async ensurePageSettings() {
        if (this._pageSettingsInstance) return this._pageSettingsInstance;
        if (!this._pageSettingsPromise) {
            this._pageSettingsPromise = import('./ui/page_settings.js').then(({ PageSettings }) => {
                const instance = new PageSettings();
                instance.init();
                this._pageSettingsInstance = instance;
                Logger.log('[App] PageSettings lazy-loaded');
                return instance;
            });
        }

        return this._pageSettingsPromise;
    }

    async ensureLLMPrompt() {
        if (this._llmPromptInstance) return this._llmPromptInstance;
        if (!this._llmPromptPromise) {
            this._llmPromptPromise = import('./ui/llm_prompt.js').then(({ LLMPrompt }) => {
                const instance = new LLMPrompt();
                instance.onOpenEditorSettings = () => this.editorSettings?.open();
                instance.init();
                this._llmPromptInstance = instance;
                Logger.log('[App] LLMPrompt lazy-loaded');
                return instance;
            });
        }

        return this._llmPromptPromise;
    }

    async ensureLayoutManager() {
        if (this._layoutManagerInstance) return this._layoutManagerInstance;
        if (!this._layoutManagerPromise) {
            this._layoutManagerPromise = import('./ui/layout_manager.js').then(({ LayoutManager }) => {
                const instance = new LayoutManager();
                this._layoutManagerInstance = instance;
                Logger.log('[App] LayoutManager lazy-loaded');
                return instance;
            });
        }

        return this._layoutManagerPromise;
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
                Logger.log("[App] Found saved layout in localStorage, loading...");
                loadLayoutIntoState(savedLayout);
            } else {
                Logger.log("[App] No saved layout in localStorage, starting fresh.");
            }
        } catch (e) {
            Logger.error("[App] Error loading from local storage:", e);
        }
    }

    setupAutoSave() {
        /** @type {TimerHandle | null} */
        let autoSaveTimer = null;
        const SAVE_DEBOUNCE_MS = 2000;
        on(EVENTS.STATE_CHANGED, () => {
            // If rendering mode changed, we might need to swap the adapter
            this.refreshAdapter();

            // Background save to appropriate storage
            if (autoSaveTimer) clearTimeout(autoSaveTimer);

            autoSaveTimer = setTimeout(() => {
                if (hasHaBackend()) {
                    Logger.log("[AutoSave] Triggering background save to HA...");
                    saveLayoutToBackend()
                        .catch(() => undefined);
                } else {
                    Logger.log("[AutoSave] Saving to local storage...");
                    AppState.saveToLocalStorage();
                }
            }, SAVE_DEBOUNCE_MS);
        });
    }

    createAdapter() {
        const mode = AppState.settings.renderingMode || 'direct';
        let adapter;
        if (mode === 'oepl') {
            adapter = new OEPLAdapter();
        } else if (mode === 'opendisplay') {
            adapter = new OpenDisplayAdapter();
        } else {
            adapter = new ESPHomeAdapter();
        }
        /** @type {any} */ (adapter).mode = mode; // Tag it for change detection
        return adapter;
    }

    refreshAdapter() {
        const mode = AppState.settings.renderingMode || 'direct';
        const currentMode = /** @type {any} */ (this.adapter)?.mode;
        if (this.adapter && currentMode === mode) return;

        Logger.log(`[App] Refreshing adapter: ${currentMode} -> ${mode}`);
        this.adapter = this.createAdapter();
        if (this.snippetManager) {
            this.snippetManager.adapter = this.adapter;
            this.snippetManager.updateSnippetBox(); // Force immediate update
        }
    }
}

export async function bootstrapApp() {
    const existingBootPromise = getBootPromise();
    if (existingBootPromise) {
        const existingApp = await existingBootPromise;
        if (existingApp) {
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
        attachAppNamespace(app);

        try {
            await app.init();
            return app;
        } catch (err) {
            clearBootPromise();
            Logger.error("[App] Failed to initialize:", err);
            throw err;
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
