import { Sidebar } from './core/sidebar.js';
import { Canvas } from './core/canvas.js';
import { PropertiesPanel } from './core/properties.js';
import { DeviceSettings } from './ui/device_settings.js';
import { EditorSettings } from './ui/editor_settings.js';
import { PageSettings } from './ui/page_settings.js';
import { SnippetManager } from './ui/snippet_manager.js';
import { KeyboardHandler } from './core/keyboard.js';
import { ESPHomeAdapter } from './io/adapters/esphome_adapter.js';
import { OEPLAdapter } from './io/adapters/oepl_adapter.js';
import { OpenDisplayAdapter } from './io/adapters/opendisplay_adapter.js';
import { AppState } from './core/state.js';
import { hasHaBackend } from './utils/env.js';
import { Logger } from './utils/logger.js';

// Newly modularized imports
import { showToast } from './utils/dom.js';
import { loadLayoutFromBackend, saveLayoutToBackend, fetchEntityStates } from './io/ha_api.js';
import { loadExternalProfiles } from './io/devices.js';
import { saveLayoutToFile, handleFileSelect } from './io/file_ops.js';

import { loadLayoutIntoState } from './io/yaml_import.js';
import './io/hardware_import.js'; // Register global hardware fetchers
import { AIService } from './io/ai_service.js';
window.aiService = new AIService();

import { renderWidgetPalette } from './ui/widget_palette.js';
import { QuickSearch } from './ui/quick_search.js';
import { HierarchyView } from './ui/hierarchy_view.js';

export class App {
    constructor() {
        try {
            Logger.log("[App] Constructor started");
            this.sidebar = new Sidebar();
            Logger.log("[App] Sidebar created");
            this.canvas = new Canvas();
            Logger.log("[App] Canvas created");
            this.propertiesPanel = new PropertiesPanel();
            Logger.log("[App] PropertiesPanel created");
            this.hierarchyView = new HierarchyView();
            Logger.log("[App] HierarchyView created");
            this.deviceSettings = new DeviceSettings();
            Logger.log("[App] DeviceSettings created");
            this.editorSettings = new EditorSettings();
            Logger.log("[App] EditorSettings created");
            this.pageSettings = new PageSettings();
            Logger.log("[App] PageSettings created");
            this.keyboardHandler = new KeyboardHandler();
            Logger.log("[App] KeyboardHandler created");
            this.llmPrompt = window.llmPrompt;
            Logger.log("[App] LLMPrompt linked");
            this.quickSearch = new QuickSearch();
            window.QuickSearch = this.quickSearch; // Global for back-compat if needed
            Logger.log("[App] QuickSearch initialized");

            // Initialize Output Adapter
            this.adapter = this.createAdapter();
            Logger.log("[App] Adapter initialized:", this.adapter.constructor.name);

            // Initialize Snippet Manager (Handles YAML IO mostly)
            this.snippetManager = new SnippetManager(this.adapter);
            Logger.log("[App] SnippetManager initialized");

            // Initialize Layout Manager
            if (window.layoutManager) {
                this.layoutManager = window.layoutManager;
                Logger.log("[App] LayoutManager linked");
            }

            this.init();
        } catch (e) {
            Logger.error("[App] Critical Error in Constructor:", e);
        }
    }

    async init() {
        Logger.log("[App] Initializing ESPHome Designer Designer...");
        Logger.log("[App] AppState:", window.AppState);

        // Guard to prevent auto-save during initial load
        this.isInitializing = true;

        // Initialize UI components
        await renderWidgetPalette('widgetPalette');
        this.sidebar.init();
        this.propertiesPanel.init();
        this.hierarchyView.init();
        this.deviceSettings.init();
        this.editorSettings.init();
        this.quickSearch.discoverWidgets();

        // Load external hardware profiles (Hardware folder)
        await loadExternalProfiles();

        // Load saved theme preference from localStorage
        try {
            const savedTheme = localStorage.getItem('reterminal-editor-theme');
            if (savedTheme === 'light') {
                AppState.updateSettings({ editor_light_mode: true });
                this.editorSettings.applyEditorTheme(true);
            } else {
                this.editorSettings.applyEditorTheme(false);
            }
        } catch (e) {
            Logger.log('Could not load theme preference:', e);
        }

        this.pageSettings.init();
        if (this.llmPrompt) this.llmPrompt.init();

        if (this.layoutManager) {
            this.layoutManager.init();
        }

        // Setup auto-save
        this.setupAutoSave();

        // Bind global buttons
        this.bindGlobalButtons();

        // Load initial data
        try {
            if (hasHaBackend()) {
                Logger.log("HA Backend detected attempt. Loading hardware then layout...");
                await loadExternalProfiles(); // Load dynamic hardware templates FIRST
                await loadLayoutFromBackend(); // Then load layout that might use them
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
        if (window.AppState && typeof window.AppState.updateLayoutIndicator === 'function') {
            window.AppState.updateLayoutIndicator();
        }

        // Setup auto-save or auto-update snippet
        // Delegate to SnippetManager? SnippetManager.init() already called setupAutoUpdate() in its constructor.
        // We called init() in constructor of SnippetManager, so it's already running.


        // Explicitly center the view on the current page after everything is loaded
        // We use a small timeout to ensure the DOM has fully updated from the state changes above
        setTimeout(() => {
            if (this.canvas) {
                Logger.log("[App] Forcing initial canvas centering...");
                this.canvas.focusPage(AppState.currentPageIndex, false);
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

        const importProjectBtn = document.getElementById('importProjectBtn');
        if (importProjectBtn && loadLayoutBtn) {
            importProjectBtn.addEventListener('click', () => {
                loadLayoutBtn.click();
            });
        }

        // Device Settings
        const deviceSettingsBtn = document.getElementById('deviceSettingsBtn');
        if (deviceSettingsBtn) {
            Logger.log("Device Settings button found, binding click listener.");
            deviceSettingsBtn.addEventListener('click', () => {
                Logger.log("Device Settings button clicked.");
                if (this.deviceSettings) {
                    this.deviceSettings.open();
                } else {
                    Logger.error("DeviceSettings instance not found on App.");
                }
            });
        } else {
            Logger.error("Device Settings button NOT found in DOM.");
        }

        // Editor Settings
        const editorSettingsBtn = document.getElementById('editorSettingsBtn');
        if (editorSettingsBtn) {
            editorSettingsBtn.addEventListener('click', () => {
                this.editorSettings.open();
            });
        }

        // AI Prompt
        const aiPromptBtn = document.getElementById('aiPromptBtn');
        if (aiPromptBtn) {
            aiPromptBtn.addEventListener('click', () => {
                if (this.llmPrompt) {
                    this.llmPrompt.open();
                } else {
                    Logger.error("LLMPrompt instance not found.");
                }
            });
        }
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
        let autoSaveTimer = null;
        const SAVE_DEBOUNCE_MS = 2000;

        import('./core/events.js').then(({ on, EVENTS }) => {
            on(EVENTS.STATE_CHANGED, () => {
                // If rendering mode changed, we might need to swap the adapter
                this.refreshAdapter();

                // Background save to appropriate storage
                if (autoSaveTimer) clearTimeout(autoSaveTimer);

                autoSaveTimer = setTimeout(() => {
                    if (hasHaBackend()) {
                        Logger.log("[AutoSave] Triggering background save to HA...");
                        saveLayoutToBackend()
                            .catch(() => {
                                // Silently ignore - network errors are expected when backend is unreachable
                                // The ha_api.js already handles logging for unexpected errors
                            });
                    } else {
                        Logger.log("[AutoSave] Saving to local storage...");
                        AppState.saveToLocalStorage();
                    }
                }, SAVE_DEBOUNCE_MS);
            });

            // Re-render palette when mode might have changed
            on(EVENTS.STATE_CHANGED, () => {
                renderWidgetPalette('widgetPalette');
            });
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
        adapter.mode = mode; // Tag it for change detection
        return adapter;
    }

    refreshAdapter() {
        const mode = AppState.settings.renderingMode || 'direct';
        if (this.adapter && this.adapter.mode === mode) return;

        Logger.log(`[App] Refreshing adapter: ${this.adapter?.mode} -> ${mode}`);
        this.adapter = this.createAdapter();
        if (this.snippetManager) {
            this.snippetManager.adapter = this.adapter;
            this.snippetManager.updateSnippetBox(); // Force immediate update
        }
    }
}

// Start the app
document.addEventListener('DOMContentLoaded', () => {
    const app = new App();
    window.app = app;

    // Expose modal functions globally for button event listeners (matches old monolithic pattern)
    // Exposed globals for legacy/external compatibility
    window.openDeviceSettings = () => app.deviceSettings?.open();
    window.openEditorSettingsModal = (section) => app.editorSettings?.open(section);
    window.pageSettings = app.pageSettings;

    // Attach to unified namespace
    window.ESPHomeDesigner = window.ESPHomeDesigner || {};
    window.ESPHomeDesigner.app = app;
    window.ESPHomeDesigner.ui = {
        sidebar: app.sidebar,
        canvas: app.canvas,
        properties: app.propertiesPanel
    };
});
