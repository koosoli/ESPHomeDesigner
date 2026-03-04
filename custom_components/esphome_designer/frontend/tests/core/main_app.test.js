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
const mockCanvasFocusPage = vi.fn();

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
        open() { }
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

vi.mock('../../js/ui/widget_palette.js', () => ({
    renderWidgetPalette: mockRenderWidgetPalette
}));

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
vi.mock('../../js/ui/splitters.js', () => ({}));
vi.mock('../../js/ui/icon_picker.js', () => ({}));
vi.mock('../../js/ui/radial_menu.js', () => ({}));
vi.mock('../../js/ui/entity_picker.js', () => ({}));
vi.mock('../../js/io/hardware_import.js', () => ({}));

describe('App bootstrap', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        backendEnabled = true;
        mockAppState.settings.renderingMode = 'direct';
        document.body.innerHTML = `
            <div id="widgetPalette"></div>
            <button id="saveLayoutBtn"></button>
            <input id="loadLayoutBtn" />
            <button id="importLayoutBtn"></button>
            <button id="deviceSettingsBtn"></button>
            <button id="editorSettingsBtn"></button>
            <button id="aiPromptBtn"></button>
        `;
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
        expect(mockDeviceSettingsOpen).toHaveBeenCalled();

        document.getElementById('editorSettingsBtn')?.click();
        expect(mockEditorSettingsOpen).toHaveBeenCalled();

        document.getElementById('aiPromptBtn')?.click();
        expect(mockLLMOpen).toHaveBeenCalled();

        document.getElementById('saveLayoutBtn')?.click();
        await Promise.resolve();
        expect(mockSaveLayoutToBackend).toHaveBeenCalled();
    });
});
