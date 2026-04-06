import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockSidebarInit = vi.fn();
const mockPropertiesInit = vi.fn();
const mockHierarchyInit = vi.fn();
const mockDeviceSettingsInit = vi.fn();
const mockDeviceSettingsOpen = vi.fn();
const mockEditorSettingsInit = vi.fn();
const mockEditorSettingsOpen = vi.fn();
const mockEditorSettingsApplyTheme = vi.fn();
const mockPageSettingsInit = vi.fn();
const mockSnippetUpdate = vi.fn();
const mockSnippetCtor = vi.fn();
const mockQuickSearchDiscover = vi.fn();
const mockLLMInit = vi.fn();
const mockLLMOpen = vi.fn();
const mockLayoutInit = vi.fn();
const mockLayoutOpen = vi.fn();
const mockPageSettingsOpen = vi.fn();
const mockCanvasFocusPage = vi.fn();
let sidebarCtorError = null;

const mockLoadLayoutFromBackend = vi.fn();
const mockSaveLayoutToBackend = vi.fn().mockResolvedValue(true);
const mockFetchEntityStates = vi.fn();
const mockLoadExternalProfiles = vi.fn();
const mockRenderWidgetPalette = vi.fn().mockResolvedValue(undefined);
const mockSaveLayoutToFile = vi.fn();
const mockHandleFileSelect = vi.fn();
const mockLoadLayoutIntoState = vi.fn();
const mockShowToast = vi.fn();

let backendEnabled = true;

const mockAppState = {
    settings: {
        renderingMode: 'direct',
        editor_light_mode: false
    },
    currentPageIndex: 0,
    loadFromLocalStorage: vi.fn(),
    saveToLocalStorage: vi.fn(),
    updateSettings: vi.fn(),
    updateLayoutIndicator: vi.fn()
};

vi.mock('../../js/core/sidebar.js', () => ({
    Sidebar: class {
        constructor() {
            if (sidebarCtorError) {
                throw sidebarCtorError;
            }
        }
        init() {
            mockSidebarInit();
        }
    }
}));

vi.mock('../../js/core/canvas.js', () => ({
    Canvas: class {
        focusPage(index, smooth) {
            mockCanvasFocusPage(index, smooth);
        }
    }
}));

vi.mock('../../js/core/properties.js', () => ({
    PropertiesPanel: class {
        init() {
            mockPropertiesInit();
        }
    }
}));

vi.mock('../../js/ui/device_settings.js', () => ({
    DeviceSettings: class {
        init() {
            mockDeviceSettingsInit();
        }
        open() {
            mockDeviceSettingsOpen();
        }
        populateDeviceSelect() { }
    }
}));

vi.mock('../../js/ui/editor_settings.js', () => ({
    EditorSettings: class {
        init() {
            mockEditorSettingsInit();
        }
        open(section) {
            mockEditorSettingsOpen(section);
        }
        applyEditorTheme(v) {
            mockEditorSettingsApplyTheme(v);
        }
    }
}));

vi.mock('../../js/ui/page_settings.js', () => ({
    PageSettings: class {
        init() {
            mockPageSettingsInit();
        }
        open(index) {
            mockPageSettingsOpen(index);
        }
    }
}));

vi.mock('../../js/ui/snippet_manager.js', () => ({
    SnippetManager: class {
        constructor(adapter) {
            this.adapter = adapter;
            mockSnippetCtor(adapter?.mode || 'unknown');
        }
        updateSnippetBox() {
            mockSnippetUpdate();
        }
    }
}));

vi.mock('../../js/core/keyboard.js', () => ({
    KeyboardHandler: class { }
}));

vi.mock('../../js/io/adapters/esphome_adapter', () => ({
    ESPHomeAdapter: class {
        constructor() {
            this.mode = 'direct';
        }
    }
}));

vi.mock('../../js/io/adapters/oepl_adapter.js', () => ({
    OEPLAdapter: class {
        constructor() {
            this.mode = 'oepl';
        }
    }
}));

vi.mock('../../js/io/adapters/opendisplay_adapter.js', () => ({
    OpenDisplayAdapter: class {
        constructor() {
            this.mode = 'opendisplay';
        }
    }
}));

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

vi.mock('../../js/utils/env.js', () => ({
    hasHaBackend: () => backendEnabled
}));

vi.mock('../../js/utils/logger.js', () => ({
    Logger: {
        log: vi.fn(),
        warn: vi.fn(),
        error: vi.fn()
    }
}));

vi.mock('../../js/io/ha_api.js', () => ({
    loadLayoutFromBackend: mockLoadLayoutFromBackend,
    saveLayoutToBackend: mockSaveLayoutToBackend,
    fetchEntityStates: mockFetchEntityStates
}));

vi.mock('../../js/io/devices.js', () => ({
    loadExternalProfiles: mockLoadExternalProfiles
}));

vi.mock('../../js/io/file_ops.js', () => ({
    saveLayoutToFile: mockSaveLayoutToFile,
    handleFileSelect: mockHandleFileSelect
}));

vi.mock('../../js/io/yaml_import', () => ({
    loadLayoutIntoState: mockLoadLayoutIntoState
}));

vi.mock('../../js/utils/dom.js', () => ({
    showToast: mockShowToast
}));

vi.mock('../../js/ui/widget_palette.js', async () => {
    const actual = await vi.importActual('../../js/ui/widget_palette.js');
    return {
        ...actual,
        renderWidgetPalette: mockRenderWidgetPalette
    };
});

vi.mock('../../js/ui/quick_search.js', () => ({
    QuickSearch: class {
        discoverWidgets() {
            mockQuickSearchDiscover();
        }
    }
}));

vi.mock('../../js/ui/hierarchy_view.js', () => ({
    HierarchyView: class {
        init() {
            mockHierarchyInit();
        }
    }
}));

vi.mock('../../js/ui/llm_prompt.js', () => ({
    LLMPrompt: class {
        init() {
            mockLLMInit();
        }
        open() {
            mockLLMOpen();
        }
    }
}));

vi.mock('../../js/ui/layout_manager.js', () => ({
    LayoutManager: class {
        init() {
            mockLayoutInit();
        }
        async open() {
            mockLayoutOpen();
        }
    }
}));

vi.mock('../../js/core/events.js', () => ({
    EVENTS: {
        STATE_CHANGED: 'STATE_CHANGED'
    },
    on: vi.fn((_evt, _cb) => { })
}));

vi.mock('../../js/utils/helpers.js', () => ({}));
vi.mock('../../js/utils/device.js', () => ({}));
vi.mock('../../js/utils/graph_helpers.js', () => ({}));
vi.mock('../../js/core/constants', () => ({}));
vi.mock('../../js/core/utils', () => ({}));
vi.mock('../../js/core/constants_icons.js', () => ({}));
vi.mock('../../js/core/plugin_registry', () => ({}));
vi.mock('../../js/core/widget_factory', () => ({}));
vi.mock('../../js/core/layout_constants.js', () => ({}));
vi.mock('../../js/core/legacy_runtime_modules.js', () => ({}));
vi.mock('../../js/ui/splitters.js', () => ({}));
vi.mock('../../js/ui/icon_picker.js', () => ({}));
vi.mock('../../js/ui/radial_menu.js', () => ({}));
vi.mock('../../js/ui/entity_picker.js', () => ({}));
vi.mock('../../js/io/hardware_import.js', () => ({}));

describe('App bootstrap', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        sidebarCtorError = null;
        backendEnabled = true;
        mockAppState.settings.renderingMode = 'direct';
        delete window.ESPHomeDesigner;
        delete globalThis.__ESPHOME_DESIGNER_BOOT_PROMISE__;
        document.body.innerHTML = `
            <div id="header-placeholder"></div>
            <div id="sidebar-placeholder"></div>
            <div id="code-panel-placeholder"></div>
            <div id="properties-panel-placeholder"></div>
            <div id="modals-placeholder"></div>
            <div id="widgetPalette"></div>
            <button id="saveLayoutBtn"></button>
            <input id="loadLayoutBtn" />
            <button id="importLayoutBtn"></button>
            <button id="deviceSettingsBtn"></button>
            <button id="editorSettingsBtn"></button>
            <button id="aiPromptBtn"></button>
            <button id="manageLayoutsBtn"></button>
        `;
        localStorage.clear();
    });

    it('constructs app with direct adapter and initializes backend flow', async () => {
        const { App } = await import('../../js/main.js');
        const app = new App();

        await app.init();

        expect(mockSnippetCtor).toHaveBeenCalledWith('direct');
        expect(mockRenderWidgetPalette).toHaveBeenCalled();
        expect(mockSidebarInit).toHaveBeenCalled();
        expect(mockPropertiesInit).toHaveBeenCalled();
        expect(mockHierarchyInit).toHaveBeenCalled();
        expect(mockLoadExternalProfiles).toHaveBeenCalled();
        expect(mockLoadLayoutFromBackend).toHaveBeenCalled();
        expect(mockFetchEntityStates).toHaveBeenCalled();
    });

    it('logs constructor failures and getCoreUi throws when required pieces are missing', async () => {
        const { Logger } = await import('../../js/utils/logger.js');
        const { App } = await import('../../js/main.js');

        sidebarCtorError = new Error('sidebar failed');
        const _brokenApp = new App();
        expect(Logger.error).toHaveBeenCalledWith('[App] Critical Error in Constructor:', sidebarCtorError);

        sidebarCtorError = null;
        const app = new App();
        app.quickSearch = null;
        expect(() => app.getCoreUi()).toThrow('[App] Core UI failed to initialize');
    });

    it('falls back to local storage mode when backend is disabled', async () => {
        backendEnabled = false;
        const { App } = await import('../../js/main.js');
        const app = new App();

        await app.init();

        expect(mockAppState.loadFromLocalStorage).toHaveBeenCalled();
        expect(mockLoadLayoutFromBackend).not.toHaveBeenCalled();
    });

    it('switches adapters when rendering mode changes', async () => {
        const { App } = await import('../../js/main.js');
        const app = new App();

        expect(app.adapter.mode).toBe('direct');

        mockAppState.settings.renderingMode = 'oepl';
        app.refreshAdapter();
        expect(app.adapter.mode).toBe('oepl');

        mockAppState.settings.renderingMode = 'opendisplay';
        app.refreshAdapter();
        expect(app.adapter.mode).toBe('opendisplay');
    });

    it('binds global buttons and triggers expected actions', async () => {
        const { App } = await import('../../js/main.js');
        const app = new App();
        app.bindGlobalButtons();

        document.getElementById('deviceSettingsBtn')?.click();
        await vi.waitFor(() => expect(mockDeviceSettingsOpen).toHaveBeenCalled());

        document.getElementById('editorSettingsBtn')?.click();
        expect(mockEditorSettingsOpen).toHaveBeenCalled();

        document.getElementById('aiPromptBtn')?.click();
        await vi.waitFor(() => expect(mockLLMOpen).toHaveBeenCalled());

        document.getElementById('saveLayoutBtn')?.click();
        await Promise.resolve();
        expect(mockSaveLayoutToBackend).toHaveBeenCalled();
    });

    it('loads the saved light theme and falls back to local storage when backend bootstrap fails', async () => {
        localStorage.setItem('reterminal-editor-theme', 'light');
        mockLoadLayoutFromBackend.mockRejectedValueOnce(new Error('offline'));

        const { App } = await import('../../js/main.js');
        const app = new App();

        await app.init();

        expect(mockAppState.updateSettings).toHaveBeenCalledWith({ editor_light_mode: true });
        expect(mockEditorSettingsApplyTheme).toHaveBeenCalledWith(true);
        expect(mockAppState.loadFromLocalStorage).toHaveBeenCalled();
    });

    it('handles empty and failing local-storage restores safely', async () => {
        const { App } = await import('../../js/main.js');
        const app = new App();

        mockAppState.loadFromLocalStorage.mockReturnValueOnce(null);
        app.loadFromLocalStorage();
        expect(mockLoadLayoutIntoState).not.toHaveBeenCalled();

        mockAppState.loadFromLocalStorage.mockImplementationOnce(() => {
            throw new Error('storage failed');
        });
        expect(() => app.loadFromLocalStorage()).not.toThrow();
    });

    it('restores a saved layout from local storage when one exists', async () => {
        const { App } = await import('../../js/main.js');
        const app = new App();
        const savedLayout = {
            pages: [{ id: 'page-1', widgets: [] }],
            settings: { device_model: 'reterminal_e1001' }
        };

        mockAppState.loadFromLocalStorage.mockReturnValueOnce(savedLayout);
        app.loadFromLocalStorage();

        expect(mockLoadLayoutIntoState).toHaveBeenCalledWith(savedLayout);
    });

    it('handles offline save, import, layout manager, and lazy page settings flows', async () => {
        backendEnabled = false;
        const { App } = await import('../../js/main.js');
        const app = new App();
        app.bindGlobalButtons();

        const loadInput = /** @type {HTMLInputElement} */ (document.getElementById('loadLayoutBtn'));
        const inputClickSpy = vi.spyOn(loadInput, 'click');

        document.getElementById('saveLayoutBtn')?.click();
        expect(mockSaveLayoutToFile).toHaveBeenCalled();

        document.getElementById('importLayoutBtn')?.click();
        expect(inputClickSpy).toHaveBeenCalled();

        loadInput.dispatchEvent(new Event('change'));
        expect(mockHandleFileSelect).toHaveBeenCalled();

        document.getElementById('manageLayoutsBtn')?.click();
        await vi.waitFor(() => expect(mockLayoutOpen).toHaveBeenCalled());

        await app.openPageSettings(3);
        expect(mockPageSettingsInit).toHaveBeenCalled();
        expect(mockPageSettingsOpen).toHaveBeenCalledWith(3);
    });

    it('debounces autosave and saves to the active backend target', async () => {
        vi.useFakeTimers();
        const { App } = await import('../../js/main.js');
        const { on, EVENTS } = await import('../../js/core/events.js');
        const app = new App();

        app.setupAutoSave();

        const stateChangedRegistration = /** @type {any} */ (on).mock.calls.find((call) => call[0] === EVENTS.STATE_CHANGED);
        expect(stateChangedRegistration).toBeTruthy();
        const stateChanged = stateChangedRegistration[1];

        backendEnabled = false;
        stateChanged();
        vi.advanceTimersByTime(1999);
        expect(mockAppState.saveToLocalStorage).not.toHaveBeenCalled();
        vi.advanceTimersByTime(1);
        expect(mockAppState.saveToLocalStorage).toHaveBeenCalledTimes(1);

        backendEnabled = true;
        mockSaveLayoutToBackend.mockResolvedValueOnce(true);
        stateChanged();
        vi.advanceTimersByTime(2000);
        await Promise.resolve();
        expect(mockSaveLayoutToBackend).toHaveBeenCalled();
        vi.useRealTimers();
    });

    it('skips autosave work while initialization is still in progress', async () => {
        vi.useFakeTimers();
        const { App } = await import('../../js/main.js');
        const { on, EVENTS } = await import('../../js/core/events.js');
        const app = new App();
        app.isInitializing = true;

        app.setupAutoSave();

        const stateChangedRegistration = /** @type {any} */ (on).mock.calls.find((call) => call[0] === EVENTS.STATE_CHANGED);
        const stateChanged = stateChangedRegistration[1];
        stateChanged();
        vi.advanceTimersByTime(3000);

        expect(mockSaveLayoutToBackend).not.toHaveBeenCalled();
        expect(mockAppState.saveToLocalStorage).not.toHaveBeenCalled();
        vi.useRealTimers();
    });

    it('logs when device settings controls are unavailable', async () => {
        document.body.innerHTML = `
            <button id="saveLayoutBtn"></button>
            <input id="loadLayoutBtn" />
            <button id="importLayoutBtn"></button>
            <button id="editorSettingsBtn"></button>
            <button id="aiPromptBtn"></button>
            <button id="manageLayoutsBtn"></button>
        `;

        const { App } = await import('../../js/main.js');
        const app = new App();

        expect(() => app.bindGlobalButtons()).not.toThrow();
    });

    it('bootstraps on DOMContentLoaded and exposes the app on the window namespace', async () => {
        const { App } = await import('../../js/main.js');
        expect(App).toBeTypeOf('function');

        // Allow the module-level bootstrap listener to run against the current DOM.
        window.ESPHomeDesigner = undefined;
        document.dispatchEvent(new Event('DOMContentLoaded'));
        await Promise.resolve();

        expect(window.ESPHomeDesigner?.app).toBeTruthy();
        expect(window.ESPHomeDesigner?.state).toBeTruthy();
        expect(window.ESPHomeDesigner?.ui?.sidebar).toBeTruthy();
        expect(window.ESPHomeDesigner?.ui?.canvas).toBeTruthy();
        expect(window.ESPHomeDesigner?.ui?.properties).toBeTruthy();
    });

    it('boots when the shell is already injected and placeholders are gone', async () => {
        document.body.innerHTML = `
            <header class="main-header"></header>
            <div class="app-content">
                <aside class="sidebar"><div id="widgetPalette"></div></aside>
                <div id="canvas"></div>
                <aside class="right-panel"></aside>
            </div>
            <button id="saveLayoutBtn"></button>
            <input id="loadLayoutBtn" />
            <button id="importLayoutBtn"></button>
            <button id="deviceSettingsBtn"></button>
            <button id="editorSettingsBtn"></button>
            <button id="aiPromptBtn"></button>
            <button id="manageLayoutsBtn"></button>
        `;

        window.ESPHomeDesigner = undefined;
        const { bootstrapApp } = await import('../../js/main.js');
        await bootstrapApp();

        expect(window.ESPHomeDesigner?.app).toBeTruthy();
        expect(window.ESPHomeDesigner?.state).toBeTruthy();
        expect(window.ESPHomeDesigner?.ui?.sidebar).toBeTruthy();
        expect(window.ESPHomeDesigner?.ui?.canvas).toBeTruthy();
    });

    it('reuses the cached bootstrap promise when bootstrapApp is called repeatedly', async () => {
        const { bootstrapApp } = await import('../../js/main.js');

        const firstApp = await bootstrapApp();
        const secondApp = await bootstrapApp();

        expect(secondApp).toBe(firstApp);
        expect(window.ESPHomeDesigner?.app).toBe(firstApp);
    });

    it('returns null when there is no bootstrap surface and clears cached boot state after init failures', async () => {
        document.body.innerHTML = '';
        const { bootstrapApp } = await import('../../js/main.js');

        await expect(bootstrapApp()).resolves.toBeNull();

        document.body.innerHTML = `
            <div id="header-placeholder"></div>
            <div id="sidebar-placeholder"></div>
            <div id="code-panel-placeholder"></div>
            <div id="properties-panel-placeholder"></div>
            <div id="modals-placeholder"></div>
            <div id="widgetPalette"></div>
        `;
        mockRenderWidgetPalette.mockRejectedValueOnce(new Error('bootstrap failed'));

        await expect(bootstrapApp()).rejects.toThrow('bootstrap failed');

        mockRenderWidgetPalette.mockResolvedValueOnce(undefined);
        await expect(bootstrapApp()).resolves.toBeTruthy();
    });

    it('does nothing on module auto-bootstrap when no editor surface exists', async () => {
        vi.resetModules();
        document.body.innerHTML = '';
        delete window.ESPHomeDesigner;
        delete globalThis.__ESPHOME_DESIGNER_BOOT_PROMISE__;

        await import('../../js/main.js');
        await Promise.resolve();

        expect(window.ESPHomeDesigner).toBeUndefined();
    });

    it('reloads the editor document when the surface has gone blank after idle', async () => {
        const { recoverEditorRuntimeIfNeeded } = await import('../../js/main.js');
        const reload = vi.fn();
        const bootstrap = vi.fn();

        document.body.innerHTML = '';
        delete window.ESPHomeDesigner;
        delete globalThis.__ESPHOME_DESIGNER_BOOT_PROMISE__;

        await expect(recoverEditorRuntimeIfNeeded({
            root: document,
            runtimeGlobal: window,
            reload,
            bootstrap
        })).resolves.toBe(true);

        expect(reload).toHaveBeenCalledTimes(1);
        expect(bootstrap).not.toHaveBeenCalled();
    });

    it('rebootstraps when the editor shell exists but the runtime namespace is missing', async () => {
        const { recoverEditorRuntimeIfNeeded } = await import('../../js/main.js');
        const reload = vi.fn();
        const bootstrap = vi.fn().mockResolvedValue({ restored: true });

        delete window.ESPHomeDesigner;
        delete globalThis.__ESPHOME_DESIGNER_BOOT_PROMISE__;

        await expect(recoverEditorRuntimeIfNeeded({
            root: document,
            runtimeGlobal: window,
            reload,
            bootstrap
        })).resolves.toBe(true);

        expect(bootstrap).toHaveBeenCalledTimes(1);
        expect(reload).not.toHaveBeenCalled();
    });

    it('returns false for recovery when the document is hidden or the runtime is already healthy', async () => {
        const { recoverEditorRuntimeIfNeeded, isEditorDocumentContext } = await import('../../js/main.js');
        const reload = vi.fn();
        const bootstrap = vi.fn();

        expect(isEditorDocumentContext({})).toBe(false);

        await expect(recoverEditorRuntimeIfNeeded({
            root: { readyState: 'complete', visibilityState: 'hidden' },
            runtimeGlobal: window,
            reload,
            bootstrap
        })).resolves.toBe(false);

        window.ESPHomeDesigner = { app: { healthy: true } };
        await expect(recoverEditorRuntimeIfNeeded({
            root: document,
            runtimeGlobal: window,
            reload,
            bootstrap
        })).resolves.toBe(false);

        expect(bootstrap).not.toHaveBeenCalled();
        expect(reload).not.toHaveBeenCalled();
    });

    it('installs editor runtime recovery only inside the editor iframe context', async () => {
        const {
            installEditorRuntimeRecovery,
            EDITOR_RECOVERY_KEY,
            EDITOR_SELF_HEAL_INTERVAL_MS
        } = await import('../../js/main.js');

        const root = {
            addEventListener: vi.fn()
        };
        const targetWindow = {
            addEventListener: vi.fn(),
            setInterval: vi.fn(() => 123),
            location: {
                pathname: '/esphome-designer/editor/index.html',
                reload: vi.fn()
            }
        };
        const runtimeGlobal = {};

        expect(installEditorRuntimeRecovery({
            root,
            targetWindow,
            runtimeGlobal
        })).toBe(true);
        expect(targetWindow.setInterval).toHaveBeenCalledWith(expect.any(Function), EDITOR_SELF_HEAL_INTERVAL_MS);
        expect(root.addEventListener).toHaveBeenCalledWith('visibilitychange', expect.any(Function));
        expect(runtimeGlobal[EDITOR_RECOVERY_KEY]).toEqual(expect.objectContaining({
            intervalId: 123
        }));

        expect(installEditorRuntimeRecovery({
            root,
            targetWindow,
            runtimeGlobal
        })).toBe(false);

        expect(installEditorRuntimeRecovery({
            root,
            targetWindow: {
                ...targetWindow,
                location: { pathname: '/lovelace/default_view' }
            },
            runtimeGlobal: {}
        })).toBe(false);
    });

    it('handles missing interval support and invalid recovery targets safely', async () => {
        const {
            installEditorRuntimeRecovery,
            EDITOR_RECOVERY_KEY
        } = await import('../../js/main.js');

        expect(installEditorRuntimeRecovery({
            root: null,
            targetWindow: {
                addEventListener: vi.fn(),
                location: { pathname: '/esphome-designer/editor/index.html' }
            },
            runtimeGlobal: {}
        })).toBe(false);

        const runtimeGlobal = {};
        const root = { addEventListener: vi.fn() };
        const targetWindow = {
            addEventListener: vi.fn(),
            location: {
                pathname: '/esphome-designer/editor/index.html',
                reload: vi.fn()
            }
        };

        expect(installEditorRuntimeRecovery({
            root,
            targetWindow,
            runtimeGlobal
        })).toBe(true);
        expect(runtimeGlobal[EDITOR_RECOVERY_KEY]).toEqual(expect.objectContaining({
            intervalId: null
        }));
    });

    it('refreshes adapters with the direct-mode fallback when rendering mode is empty', async () => {
        const { App } = await import('../../js/main.js');
        const app = new App();

        mockAppState.settings.renderingMode = '';
        app.adapter = null;
        app.refreshAdapter();

        expect(app.adapter.mode).toBe('direct');
    });
});
