import { describe, it, expect, beforeEach, vi } from 'vitest';

const mockEmit = vi.fn();
const mockShowToast = vi.fn();
const mockFetchEntityStates = vi.fn();
const mockSetHaManualUrl = vi.fn();
const mockRefreshHaBaseUrl = vi.fn();
const mockSetHaToken = vi.fn();
const mockGetHaManualUrl = vi.fn(() => 'http://ha.local:8123');
const mockGetHaToken = vi.fn(() => 'token123');
const mockIsDeployedInHa = vi.fn(() => false);

const mockAppState = {
    settings: {
        editor_light_mode: false,
        grid_opacity: 30,
        glyphsets: ['GF_Latin_Kernel'],
        ai_provider: 'gemini',
        ai_model_filter: ''
    },
    snapEnabled: true,
    showGrid: true,
    setSnapEnabled: vi.fn(),
    setShowGrid: vi.fn(),
    updateSettings: vi.fn()
};

function flushAsync() {
    return new Promise((resolve) => setTimeout(resolve, 0));
}

vi.mock('../../js/core/state', () => ({ AppState: mockAppState }));
vi.mock('../../js/core/events.js', () => ({
    emit: mockEmit,
    EVENTS: { STATE_CHANGED: 'STATE_CHANGED' }
}));
vi.mock('../../js/utils/env.js', () => ({
    setHaManualUrl: mockSetHaManualUrl,
    refreshHaBaseUrl: mockRefreshHaBaseUrl,
    setHaToken: mockSetHaToken,
    getHaManualUrl: mockGetHaManualUrl,
    getHaToken: mockGetHaToken,
    isDeployedInHa: mockIsDeployedInHa
}));
vi.mock('../../js/utils/dom.js', () => ({ showToast: mockShowToast }));
vi.mock('../../js/io/ha_api.js', () => ({
    fetchEntityStates: mockFetchEntityStates,
    entityStatesCache: { 'sensor.temp': { state: '22' }, 'sensor.hum': { state: '55' } }
}));
vi.mock('../../js/io/ai_service.js', () => ({ aiService: {} }));
vi.mock('../../js/utils/logger.js', () => ({ Logger: { error: vi.fn(), log: vi.fn() } }));

describe('EditorSettings', () => {
    let EditorSettings;
    let editorSettings;

    function seedDom() {
        document.body.innerHTML = `
            <div id="editorSettingsModal" class="hidden"></div>
            <button id="editorSettingsClose"></button>
            <button id="editorSettingsDone"></button>

            <input id="editorSnapToGrid" type="checkbox" />
            <input id="editorShowGrid" type="checkbox" />
            <input id="editorLightMode" type="checkbox" />
            <button id="editorRefreshEntities">Refresh</button>
            <div id="editorEntityCount"></div>
            <input id="editorGridOpacity" type="range" value="20" />
            <input id="editorExtendedLatinGlyphs" type="checkbox" />

            <input id="haManualUrl" />
            <input id="haLlatToken" />
            <button id="editorTestHaBtn">Test</button>
            <div id="haTestResult"></div>
            <div id="haDeployedWarning" class="hidden"></div>
            <div id="haCorsTip" class="hidden"></div>
            <span id="haOriginPlaceholder"></span>

            <select id="aiProvider"><option value="gemini">Gemini</option></select>
            <input id="aiApiKeyGemini" />
            <input id="aiApiKeyOpenai" />
            <input id="aiApiKeyOpenrouter" />
            <input id="aiModelFilter" />
            <select id="aiModelSelect"></select>
            <button id="aiRefreshModelsBtn">Refresh Models</button>
            <div id="aiTestResult"></div>

            <div id="aiKeyGeminiRow"></div>
            <div id="aiKeyOpenaiRow"></div>
            <div id="aiKeyOpenrouterRow"></div>

            <input class="glyphset-checkbox" type="checkbox" value="GF_Latin_Kernel" />
            <div class="canvas-grid"></div>
        `;
    }

    beforeEach(async () => {
        vi.clearAllMocks();
        seedDom();

        ({ EditorSettings } = await import('../../js/ui/editor_settings.js'));
        editorSettings = new EditorSettings();

        editorSettings.updateAIKeyVisibility = vi.fn();
        editorSettings.refreshModelSelect = vi.fn();
        editorSettings.applyEditorTheme = vi.fn();
    });

    it('initializes listeners and opens modal with populated values', () => {
        editorSettings.init();
        editorSettings.open();

        expect(editorSettings.modal.classList.contains('hidden')).toBe(false);
        expect(document.getElementById('haManualUrl').value).toBe('http://ha.local:8123');
        expect(document.getElementById('haLlatToken').value).toBe('token123');
        expect(document.getElementById('editorEntityCount').textContent).toContain('entities cached');
    });

    it('handles close actions', () => {
        editorSettings.open();
        editorSettings.close();
        expect(editorSettings.modal.classList.contains('hidden')).toBe(true);
        expect(editorSettings.modal.style.display).toBe('none');
    });

    it('updates snap/grid/light settings through listeners', () => {
        editorSettings.init();

        const snap = document.getElementById('editorSnapToGrid');
        snap.checked = false;
        snap.dispatchEvent(new Event('change'));
        expect(mockAppState.setSnapEnabled).toHaveBeenCalledWith(false);

        const showGrid = document.getElementById('editorShowGrid');
        showGrid.checked = false;
        showGrid.dispatchEvent(new Event('change'));
        expect(mockAppState.setShowGrid).toHaveBeenCalledWith(false);

        const light = document.getElementById('editorLightMode');
        light.checked = true;
        light.dispatchEvent(new Event('change'));
        expect(mockAppState.updateSettings).toHaveBeenCalledWith({ editor_light_mode: true });
        expect(mockEmit).toHaveBeenCalled();
    });

    it('handles grid opacity and HA settings changes', () => {
        editorSettings.init();

        const opacity = document.getElementById('editorGridOpacity');
        opacity.value = '44';
        opacity.dispatchEvent(new Event('input'));
        expect(mockAppState.updateSettings).toHaveBeenCalledWith({ grid_opacity: 44 });

        const haUrl = document.getElementById('haManualUrl');
        haUrl.value = 'http://new';
        haUrl.dispatchEvent(new Event('change'));
        expect(mockSetHaManualUrl).toHaveBeenCalledWith('http://new');
        expect(mockRefreshHaBaseUrl).toHaveBeenCalled();

        const token = document.getElementById('haLlatToken');
        token.value = 'abc';
        token.dispatchEvent(new Event('change'));
        expect(mockSetHaToken).toHaveBeenCalledWith('abc');
    });

    it('refreshes entities and tests HA connection success', async () => {
        mockFetchEntityStates.mockResolvedValue([{ entity_id: 'sensor.temp' }]);
        editorSettings.init();

        const refreshBtn = document.getElementById('editorRefreshEntities');
        refreshBtn.click();
        await Promise.resolve();
        expect(mockFetchEntityStates).toHaveBeenCalled();

        const testBtn = document.getElementById('editorTestHaBtn');
        testBtn.click();
        await flushAsync();
        await flushAsync();
        expect(document.getElementById('haTestResult').textContent).toContain('Success');
    });

    it('shows failure message for empty entity fetch on HA test', async () => {
        mockFetchEntityStates.mockResolvedValue([]);
        editorSettings.init();

        const testBtn = document.getElementById('editorTestHaBtn');
        testBtn.click();
        await flushAsync();
        await flushAsync();
        expect(document.getElementById('haTestResult').innerHTML).toContain('Failed');
    });
});
