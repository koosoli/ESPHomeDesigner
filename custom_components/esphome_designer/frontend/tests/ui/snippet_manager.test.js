import { describe, it, expect, beforeEach, vi } from 'vitest';

const mockOn = vi.fn();
const mockLogger = { log: vi.fn(), error: vi.fn(), warn: vi.fn() };
const mockShowToast = vi.fn();
const mockHighlightWidgetInSnippet = vi.fn();
const mockLoadLayoutIntoState = vi.fn();
const mockParseSnippetYamlOffline = vi.fn();
const mockImportSnippetBackend = vi.fn();
const mockHasHaBackend = vi.fn(() => false);

const mockAppState = {
    selectedWidgetIds: ['widget_1'],
    settings: { renderingMode: 'direct', dark_mode: false, oeplEntityId: 'open_epaper_link.1', oeplDither: 2 },
    getPagesPayload: vi.fn(() => ({ pages: [{ id: 'p1', widgets: [] }] })),
    currentLayoutId: 'layout_1',
    deviceName: 'Layout 1',
    deviceModel: 'reterminal_e1001',
    isUndoRedoInProgress: false
};

vi.mock('../../js/core/events.js', () => ({
    on: mockOn,
    EVENTS: {
        STATE_CHANGED: 'STATE_CHANGED',
        SELECTION_CHANGED: 'SELECTION_CHANGED'
    }
}));

vi.mock('../../js/core/state', () => ({ AppState: mockAppState }));
vi.mock('../../js/utils/logger.js', () => ({ Logger: mockLogger }));
vi.mock('../../js/utils/dom.js', () => ({ showToast: mockShowToast }));
vi.mock('../../js/io/yaml_export.js', () => ({ highlightWidgetInSnippet: mockHighlightWidgetInSnippet }));
vi.mock('../../js/io/yaml_import', () => ({
    loadLayoutIntoState: mockLoadLayoutIntoState,
    parseSnippetYamlOffline: mockParseSnippetYamlOffline
}));
vi.mock('../../js/io/ha_api.js', () => ({ importSnippetBackend: mockImportSnippetBackend }));
vi.mock('../../js/utils/env.js', () => ({ hasHaBackend: mockHasHaBackend }));
vi.mock('../../js/ui/yaml_highlighter.js', () => ({
    YamlHighlighter: class {
        highlight(text) {
            return `<span>${text}</span>`;
        }
    }
}));

describe('SnippetManager', () => {
    let SnippetManager;
    let manager;
    let adapter;

    function seedDom() {
        document.body.innerHTML = `
            <div class="code-panel-title"><button id="title-btn">X</button> ESPHome YAML</div>
            <div class="code-panel"></div>
            <div class="snippet-container highlighted"></div>
            <textarea id="snippetBox"></textarea>
            <div id="highlightLayer"></div>
            <button id="toggleHighlightBtn"></button>
            <button id="toggleYamlBtn"></button>
            <button id="fullscreenSnippetBtn"></button>
            <button id="snippetFullscreenClose"></button>
            <button id="copySnippetBtn">Copy</button>
            <button id="copyLambdaBtn">Lambda</button>
            <button id="copyOEPLServiceBtn">OEPL</button>
            <button id="copyODPServiceBtn">ODP</button>
            <button id="updateLayoutBtn"><span class="mdi mdi-refresh"></span></button>
            <button id="importSnippetConfirm">Import</button>
            <div id="oeplNotice" class="hidden"></div>
            <div id="odpNotice" class="hidden"><div></div></div>
            <div id="snippetFullscreenModal" class="hidden">
              <div id="snippetFullscreenContainer" class="snippet-container"></div>
              <div id="snippetFullscreenContent"></div>
              <div id="snippetFullscreenHighlight"></div>
              <div class="modal-actions"></div>
            </div>
            <button id="toggleFullscreenHighlightBtn"></button>
            <textarea id="importSnippetTextarea"></textarea>
            <div id="importSnippetError"></div>
            <div id="importSnippetModal" class="hidden"></div>
        `;
    }

    beforeEach(async () => {
        vi.clearAllMocks();
        vi.useFakeTimers();
        seedDom();

        Object.defineProperty(window, 'isSecureContext', { value: true, configurable: true });
        Object.defineProperty(navigator, 'clipboard', {
            value: { writeText: vi.fn().mockResolvedValue(undefined) },
            configurable: true
        });

        adapter = {
            constructor: { name: 'ESPHomeAdapter' },
            generate: vi.fn().mockResolvedValue([
                'display:',
                '  - platform: ili9xxx',
                '    lambda: |-',
                '      it.print(0,0,id(font),"ok");'
            ].join('\n'))
        };

        ({ SnippetManager } = await import('../../js/ui/snippet_manager.js'));
        manager = new SnippetManager(adapter);

        await vi.runAllTimersAsync();
    });

    it('initializes and updates snippet box through adapter', async () => {
        const snippetBox = document.getElementById('snippetBox');

        expect(adapter.generate).toHaveBeenCalled();
        expect(snippetBox.value).toContain('lambda: |-');
        expect(mockHighlightWidgetInSnippet).toHaveBeenCalled();
    });

    it('refreshes highlight layer and scroll sync', () => {
        const snippetBox = document.getElementById('snippetBox');
        const highlightLayer = document.getElementById('highlightLayer');

        snippetBox.value = 'line 1';
        manager.updateHighlightLayer();
        expect(highlightLayer.innerHTML).toContain('line 1');

        snippetBox.scrollTop = 12;
        snippetBox.scrollLeft = 6;
        snippetBox.dispatchEvent(new Event('scroll'));
        expect(highlightLayer.scrollTop).toBe(12);
        expect(highlightLayer.scrollLeft).toBe(6);
    });

    it('opens fullscreen modal and syncs content', () => {
        const snippetBox = document.getElementById('snippetBox');
        snippetBox.value = 'display:\n  - lambda: |-\n      x';

        manager.openSnippetModal();

        const modal = document.getElementById('snippetFullscreenModal');
        const fullTextarea = modal.querySelector('textarea');
        expect(modal.classList.contains('hidden')).toBe(false);
        expect(fullTextarea.value).toContain('lambda');
    });

    it('updates layout from snippet while preserving context', async () => {
        mockParseSnippetYamlOffline.mockReturnValue({ settings: {}, pages: [] });
        const snippetBox = document.getElementById('snippetBox');
        snippetBox.value = 'new yaml content';
        manager.lastGeneratedYaml = 'old yaml content';

        await manager.handleUpdateLayoutFromSnippetBox();

        expect(mockParseSnippetYamlOffline).toHaveBeenCalled();
        expect(mockLoadLayoutIntoState).toHaveBeenCalled();
        expect(mockShowToast).toHaveBeenCalledWith('Layout updated from YAML', 'success');
    });

    it('imports snippet via offline parser and closes modal', async () => {
        mockParseSnippetYamlOffline.mockReturnValue({ pages: [], settings: {} });
        const input = document.getElementById('importSnippetTextarea');
        input.value = 'snippet body';

        await manager.handleImportSnippet();

        expect(mockLoadLayoutIntoState).toHaveBeenCalled();
        expect(mockShowToast).toHaveBeenCalledWith('Layout imported successfully', 'success');
    });

    it('copies snippet and lambda to clipboard', async () => {
        const snippetBox = document.getElementById('snippetBox');
        snippetBox.value = [
            'display:',
            '  - platform: ili9xxx',
            '    lambda: |-',
            '      it.print(0,0,id(font),"x");',
            'logger:'
        ].join('\n');

        await manager.copySnippetToClipboard(document.getElementById('copySnippetBtn'));
        await manager.copyLambdaToClipboard(document.getElementById('copyLambdaBtn'));

        expect(navigator.clipboard.writeText).toHaveBeenCalled();
    });
});
