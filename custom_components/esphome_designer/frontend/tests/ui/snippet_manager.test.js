import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
    resetSnippetSelectionState,
    setLastSnippetHighlightRange,
    setSnippetAutoHighlight
} from '../../js/core/snippet_selection_bridge.js';

const {
    mockOn,
    mockLogger,
    mockShowToast,
    mockHighlightWidgetInSnippet,
    mockLoadLayoutIntoState,
    mockParseSnippetYamlOffline,
    mockImportSnippetBackend,
    mockHasHaBackend,
    mockCopyText,
    mockExtractDisplayLambda,
    mockFormatOEPLServiceYaml,
    mockSetTemporaryButtonLabel,
    mockSyncSnippetModeUi,
    mockOpenSnippetModalEditor,
    mockHandleImportSnippetEditor,
    mockHandleUpdateLayoutFromSnippetBoxEditor,
    mockAddBrowserEventListener,
    mockDispatchBrowserEvent,
    mockHighlighterHighlight
} = vi.hoisted(() => ({
    mockOn: vi.fn(),
    mockLogger: { log: vi.fn(), error: vi.fn(), warn: vi.fn() },
    mockShowToast: vi.fn(),
    mockHighlightWidgetInSnippet: vi.fn(),
    mockLoadLayoutIntoState: vi.fn(),
    mockParseSnippetYamlOffline: vi.fn(),
    mockImportSnippetBackend: vi.fn(),
    mockHasHaBackend: vi.fn(() => false),
    mockCopyText: vi.fn(),
    mockExtractDisplayLambda: vi.fn((yaml) => yaml),
    mockFormatOEPLServiceYaml: vi.fn((payload) => JSON.stringify(payload)),
    mockSetTemporaryButtonLabel: vi.fn(),
    mockSyncSnippetModeUi: vi.fn(),
    mockOpenSnippetModalEditor: vi.fn(),
    mockHandleImportSnippetEditor: vi.fn(),
    mockHandleUpdateLayoutFromSnippetBoxEditor: vi.fn(),
    mockAddBrowserEventListener: vi.fn(),
    mockDispatchBrowserEvent: vi.fn(),
    mockHighlighterHighlight: vi.fn((text, range) => {
        if (range) {
            return `<span data-range="${range.start}:${range.end}">${text}</span>`;
        }
        return `<span>${text}</span>`;
    })
}));

const mockAppState = {
    selectedWidgetIds: ['widget_1'],
    settings: { renderingMode: 'direct', dark_mode: false, oeplEntityId: 'open_epaper_link.1', oeplDither: 2 },
    getPagesPayload: vi.fn(() => ({ pages: [{ id: 'p1', widgets: [] }] })),
    currentLayoutId: 'layout_1',
    deviceName: 'Layout 1',
    deviceModel: 'reterminal_e1001',
    isUndoRedoInProgress: false,
    _manualYamlOverride: '',
    getManualYamlOverride: vi.fn(() => mockAppState._manualYamlOverride),
    setManualYamlOverride: vi.fn((value) => {
        mockAppState._manualYamlOverride = value;
    }),
    clearManualYamlOverride: vi.fn(() => {
        mockAppState._manualYamlOverride = '';
    })
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
vi.mock('../../js/ui/snippet_manager_clipboard.js', () => ({
    copyText: mockCopyText,
    extractDisplayLambda: mockExtractDisplayLambda,
    formatOEPLServiceYaml: mockFormatOEPLServiceYaml,
    setTemporaryButtonLabel: mockSetTemporaryButtonLabel
}));
vi.mock('../../js/ui/snippet_manager_ui.js', () => ({
    syncSnippetModeUi: mockSyncSnippetModeUi
}));
vi.mock('../../js/ui/snippet_manager_editing.js', () => ({
    openSnippetModalEditor: mockOpenSnippetModalEditor,
    handleImportSnippetEditor: mockHandleImportSnippetEditor,
    handleUpdateLayoutFromSnippetBoxEditor: mockHandleUpdateLayoutFromSnippetBoxEditor
}));
vi.mock('../../js/utils/browser_runtime.js', () => ({
    addBrowserEventListener: mockAddBrowserEventListener,
    dispatchBrowserEvent: mockDispatchBrowserEvent
}));
vi.mock('../../js/ui/yaml_highlighter.js', () => ({
    YamlHighlighter: class {
        highlight(text, range) {
            return mockHighlighterHighlight(text, range);
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
            <button id="clearYamlOverrideBtn" style="display:none;">Auto</button>
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
        resetSnippetSelectionState();
        localStorage.clear();
        mockAppState._manualYamlOverride = '';

        Object.defineProperty(window, 'isSecureContext', { value: true, configurable: true });
        Object.defineProperty(navigator, 'clipboard', {
            value: { writeText: vi.fn().mockResolvedValue(undefined) },
            configurable: true
        });

        mockCopyText.mockResolvedValue(undefined);
        mockOpenSnippetModalEditor.mockReturnValue(undefined);
        mockHandleImportSnippetEditor.mockResolvedValue(undefined);
        mockHandleUpdateLayoutFromSnippetBoxEditor.mockResolvedValue(undefined);

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
        expect(mockSyncSnippetModeUi).toHaveBeenCalledWith('ESPHomeAdapter');
        expect(mockAddBrowserEventListener).toHaveBeenCalled();
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

    it('renders snippet auto-highlight ranges into the visible highlight layer', () => {
        const snippetBox = document.getElementById('snippetBox');
        const highlightLayer = document.getElementById('highlightLayer');
        snippetBox.value = 'display:\n  - platform: ili9xxx';

        setSnippetAutoHighlight(true);
        setLastSnippetHighlightRange({ start: 11, end: 29 });
        manager.updateHighlightLayer();

        expect(highlightLayer.innerHTML).toContain('data-range="11:29"');
        expect(mockHighlighterHighlight).toHaveBeenLastCalledWith(snippetBox.value, { start: 11, end: 29 });
    });

    it('delegates fullscreen, import, and update actions through the bound buttons', async () => {
        manager.openSnippetModal = vi.fn();
        manager.handleImportSnippet = vi.fn().mockResolvedValue(undefined);
        manager.handleUpdateLayoutFromSnippetBox = vi.fn().mockResolvedValue(undefined);

        document.getElementById('fullscreenSnippetBtn')?.click();
        document.getElementById('importSnippetConfirm')?.click();
        document.getElementById('updateLayoutBtn')?.click();
        await vi.runAllTimersAsync();

        expect(manager.openSnippetModal).toHaveBeenCalled();
        expect(manager.handleImportSnippet).toHaveBeenCalled();
        expect(manager.handleUpdateLayoutFromSnippetBox).toHaveBeenCalled();
        expect(document.getElementById('updateLayoutBtn')?.hasAttribute('disabled')).toBe(false);
    });

    it('shows success and error icon states when updating layout from the snippet box', async () => {
        manager.handleUpdateLayoutFromSnippetBox = vi.fn()
            .mockResolvedValueOnce(undefined)
            .mockRejectedValueOnce(new Error('broken'));
        const button = /** @type {HTMLButtonElement} */ (document.getElementById('updateLayoutBtn'));
        const icon = button.querySelector('.mdi');

        button.click();
        await vi.runAllTimersAsync();
        expect(icon?.className).toBe('mdi mdi-refresh');

        button.click();
        await vi.runAllTimersAsync();
        expect(icon?.className).toBe('mdi mdi-refresh');
    });

    it('closes the fullscreen modal and toggles YAML panel and highlighting state', async () => {
        localStorage.setItem('esphome_designer_yaml_collapsed', 'true');
        seedDom();
        manager = new SnippetManager(adapter);
        await vi.runAllTimersAsync();
        const codePanel = /** @type {HTMLElement} */ (document.querySelector('.code-panel'));

        expect(codePanel.classList.contains('collapsed')).toBe(true);

        const modal = document.getElementById('snippetFullscreenModal');
        modal?.classList.remove('hidden');
        document.getElementById('snippetFullscreenClose')?.click();
        expect(modal?.classList.contains('hidden')).toBe(true);

        manager.updateHighlightLayer = vi.fn();
        document.getElementById('toggleYamlBtn')?.click();
        expect(codePanel.classList.contains('collapsed')).toBe(false);
        expect(mockDispatchBrowserEvent).toHaveBeenCalled();

        document.getElementById('toggleHighlightBtn')?.click();
        expect(localStorage.getItem('esphome_designer_yaml_highlight')).toBe('false');
        document.getElementById('toggleHighlightBtn')?.click();
        expect(manager.updateHighlightLayer).toHaveBeenCalled();
    });

    it('delegates modal helper methods through the wrapper methods', async () => {
        await manager.openSnippetModal();
        await manager.handleUpdateLayoutFromSnippetBox();
        await manager.handleImportSnippet();

        expect(mockOpenSnippetModalEditor).toHaveBeenCalledWith(manager);
        expect(mockHandleUpdateLayoutFromSnippetBoxEditor).toHaveBeenCalledWith(manager);
        expect(mockHandleImportSnippetEditor).toHaveBeenCalledWith(manager);
    });

    it('can rebuild the generated YAML baseline from current AppState after YAML imports', async () => {
        adapter.generate.mockResolvedValueOnce([
            'display:',
            '  - platform: ili9xxx',
            '    lambda: |-',
            '      it.print(40,40,id(font),"rebased");'
        ].join('\n'));

        await manager.syncGeneratedSnippetBaseline();

        expect(mockAppState.getPagesPayload).toHaveBeenCalled();
        expect(manager.lastGeneratedYaml).toContain('it.print(40,40,id(font),"rebased");');
    });

    it('logs baseline rebuild failures without throwing', async () => {
        adapter.generate.mockRejectedValueOnce(new Error('baseline failed'));

        await manager.syncGeneratedSnippetBaseline();

        expect(mockLogger.warn).toHaveBeenCalledWith(
            '[SnippetManager] Failed to rebuild generated YAML baseline after import.',
            expect.any(Error)
        );
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

        expect(mockCopyText).toHaveBeenCalledTimes(2);
        expect(mockSetTemporaryButtonLabel).toHaveBeenCalled();
    });

    it('handles clipboard and OEPL copy failures', async () => {
        const snippetBox = /** @type {HTMLTextAreaElement} */ (document.getElementById('snippetBox'));
        snippetBox.value = '{invalid json';
        mockCopyText.mockRejectedValueOnce(new Error('clipboard down'));
        mockExtractDisplayLambda.mockImplementationOnce(() => {
            throw new Error('no lambda');
        });

        await manager.copySnippetToClipboard(document.getElementById('copySnippetBtn'));
        await manager.copyLambdaToClipboard(document.getElementById('copyLambdaBtn'));
        await manager.copyOEPLServiceToClipboard(document.getElementById('copyOEPLServiceBtn'));

        expect(mockShowToast).toHaveBeenCalledWith('Unable to copy snippet', 'error');
        expect(mockShowToast).toHaveBeenCalledWith('no lambda', 'error');
        expect(mockShowToast).toHaveBeenCalledWith('Failed to format service call', 'error');
    });

    it('formats OEPL service calls and routes ODP copy through snippet copy', async () => {
        const snippetBox = /** @type {HTMLTextAreaElement} */ (document.getElementById('snippetBox'));
        snippetBox.value = JSON.stringify({ service: 'ok' });

        await manager.copyOEPLServiceToClipboard(document.getElementById('copyOEPLServiceBtn'));
        document.getElementById('copyODPServiceBtn')?.click();

        expect(mockFormatOEPLServiceYaml).toHaveBeenCalledWith({ service: 'ok' }, mockAppState.settings);
        expect(mockCopyText).toHaveBeenCalledWith('{"service":"ok"}');
    });

    it('updates fullscreen highlighting and reacts to input, state, and selection callbacks', async () => {
        const snippetBox = /** @type {HTMLTextAreaElement} */ (document.getElementById('snippetBox'));
        const fullscreenContent = /** @type {HTMLElement} */ (document.getElementById('snippetFullscreenContent'));
        const fullscreenHighlight = document.getElementById('snippetFullscreenHighlight');
        const fullscreenTextarea = document.createElement('textarea');
        fullscreenTextarea.value = 'fullscreen yaml';
        fullscreenContent.appendChild(fullscreenTextarea);

        manager.updateHighlightLayer();
        expect(fullscreenHighlight?.innerHTML).toContain('fullscreen yaml');

        const updateSpy = vi.spyOn(manager, 'updateHighlightLayer');
        snippetBox.dispatchEvent(new Event('input'));
        expect(updateSpy).toHaveBeenCalled();

        const stateChanged = mockOn.mock.calls.find(([event]) => event === 'STATE_CHANGED')?.[1];
        manager.suppressSnippetUpdate = true;
        const snippetUpdateSpy = vi.spyOn(manager, 'updateSnippetBox');
        stateChanged?.();
        expect(snippetUpdateSpy).not.toHaveBeenCalled();

        const selectionChanged = mockOn.mock.calls.find(([event]) => event === 'SELECTION_CHANGED')?.[1];
        selectionChanged?.({ widgetIds: ['widget_7'] });
        expect(mockHighlightWidgetInSnippet).toHaveBeenCalledWith(['widget_7']);

        const browserListener = mockAddBrowserEventListener.mock.calls[0]?.[1];
        browserListener?.();
        expect(updateSpy).toHaveBeenCalledTimes(2);
    });

    it('merges regenerated YAML back into a manually edited snippet on state changes', async () => {
        const snippetBox = /** @type {HTMLTextAreaElement} */ (document.getElementById('snippetBox'));
        const originalGeneratedYaml = snippetBox.value;
        snippetBox.value = [
            originalGeneratedYaml,
            '',
            'script:',
            '  - id: custom_script',
            '    then:',
            '      - logger.log: "custom"'
        ].join('\n');
        snippetBox.dispatchEvent(new Event('input'));

        adapter.generate.mockResolvedValueOnce([
            'display:',
            '  - platform: ili9xxx',
            '    lambda: |-',
            '      it.print(12,12,id(font),"updated");'
        ].join('\n'));

        const stateChanged = mockOn.mock.calls.find(([event]) => event === 'STATE_CHANGED')?.[1];
        stateChanged?.();
        await vi.runAllTimersAsync();

        expect(adapter.generate).toHaveBeenCalledTimes(2);
        expect(snippetBox.value).toContain('it.print(12,12,id(font),"updated");');
        expect(snippetBox.value).toContain('id: custom_script');
        expect(snippetBox.value).not.toContain('it.print(0,0,id(font),"ok");');
        expect(mockAppState.getManualYamlOverride()).toContain('id: custom_script');
        expect(mockHighlightWidgetInSnippet).toHaveBeenLastCalledWith(['widget_1']);
    });

    it('falls back to a section-based merge when inline comments break exact generated-block replacement', async () => {
        const snippetBox = /** @type {HTMLTextAreaElement} */ (document.getElementById('snippetBox'));
        snippetBox.value = [
            'display:',
            '  - platform: ili9xxx',
            '    # custom note',
            '    lambda: |-',
            '      it.print(0,0,id(font),"ok");',
            '',
            'script:',
            '  - id: custom_script',
            '    then:',
            '      - logger.log: "custom"'
        ].join('\n');
        snippetBox.dispatchEvent(new Event('input'));

        adapter.generate.mockResolvedValueOnce([
            'display:',
            '  - platform: ili9xxx',
            '    lambda: |-',
            '      it.print(24,24,id(font),"updated");'
        ].join('\n'));

        const stateChanged = mockOn.mock.calls.find(([event]) => event === 'STATE_CHANGED')?.[1];
        stateChanged?.();
        await vi.runAllTimersAsync();

        expect(snippetBox.value).toContain('it.print(24,24,id(font),"updated");');
        expect(snippetBox.value).toContain('id: custom_script');
        expect(snippetBox.value).not.toContain('# custom note');
        expect(mockAppState.getManualYamlOverride()).toContain('id: custom_script');
        expect(
            mockLogger.warn.mock.calls.some(([message]) => String(message).includes('Unable to merge manual YAML override'))
        ).toBe(false);
    });

    it('covers direct merge helpers for empty, prefix, and equality edge cases', () => {
        expect(manager.parseTopLevelSnippetBlocks('')).toEqual([]);
        expect(manager.reconcileManualSnippetOverrideBySections('', '', '')).toBeNull();

        manager.lastGeneratedYaml = '';
        expect(manager.reconcileManualSnippetOverride('display:\n  - platform: ili9xxx', 'manual override')).toEqual({
            text: 'manual override',
            usesManualOverride: true
        });

        manager.lastGeneratedYaml = 'display:\n  - platform: ili9xxx';
        expect(manager.reconcileManualSnippetOverride('display:\n  - platform: ili9xxx', 'display:\n  - platform: ili9xxx')).toEqual({
            text: 'display:\n  - platform: ili9xxx',
            usesManualOverride: false
        });

        const prefixedMerge = manager.reconcileManualSnippetOverrideBySections(
            'display:\n  - platform: updated',
            [
                '# custom header',
                '',
                'display:',
                '  - platform: ili9xxx',
                '',
                'script:',
                '  - id: custom_script'
            ].join('\n'),
            'display:\n  - platform: ili9xxx'
        );
        expect(prefixedMerge).toEqual({
            text: [
                '# custom header',
                '',
                'display:',
                '  - platform: updated',
                '',
                'script:',
                '  - id: custom_script'
            ].join('\n'),
            usesManualOverride: true
        });

        expect(
            manager.reconcileManualSnippetOverrideBySections(
                '',
                'display:\n  - platform: ili9xxx',
                'display:\n  - platform: ili9xxx'
            )
        ).toBeNull();
    });

    it('replaces the previous generated preamble instead of duplicating YAML headers during section merges', () => {
        const oldGenerated = [
            '# ESPHome YAML - Generated by ESPHome Designer',
            '# Layout Signature: oldsig00',
            '# Layout Summary: mode=lvgl pages=1 widgets=1',
            '',
            'display:',
            '  - platform: ili9xxx'
        ].join('\n');
        const manualOverride = [
            '# user file note',
            '# ESPHome YAML - Generated by ESPHome Designer',
            '# Layout Signature: oldsig00',
            '# Layout Summary: mode=lvgl pages=1 widgets=1',
            '',
            'display:',
            '  - platform: ili9xxx',
            '    # custom note',
            '',
            'script:',
            '  - id: custom_script'
        ].join('\n');
        const newGenerated = [
            '# ESPHome YAML - Generated by ESPHome Designer',
            '# Layout Signature: newsig11',
            '# Layout Summary: mode=lvgl pages=1 widgets=1',
            '',
            'display:',
            '  - platform: st7701s'
        ].join('\n');

        const merged = manager.reconcileManualSnippetOverrideBySections(
            newGenerated,
            manualOverride,
            oldGenerated
        );

        expect(merged).toEqual({
            text: [
                '# user file note',
                '',
                '# ESPHome YAML - Generated by ESPHome Designer',
                '# Layout Signature: newsig11',
                '# Layout Summary: mode=lvgl pages=1 widgets=1',
                '',
                'display:',
                '  - platform: st7701s',
                '',
                'script:',
                '  - id: custom_script'
            ].join('\n'),
            usesManualOverride: true
        });
        expect((merged?.text.match(/# ESPHome YAML - Generated by ESPHome Designer/g) || [])).toHaveLength(1);
    });

    it('strips repeated generated preambles so corrupted overrides can self-heal', () => {
        const generatedPreamble = [
            '# ESPHome YAML - Generated by ESPHome Designer',
            '# Layout Signature: oldsig00',
            '# Layout Summary: mode=lvgl pages=1 widgets=1'
        ].join('\n');

        const repeated = [
            '# user note',
            generatedPreamble,
            '',
            generatedPreamble,
            ''
        ].join('\n');

        expect(manager.stripGeneratedPreamble(repeated, generatedPreamble)).toBe('# user note');
    });

    it('ignores stale async generations so older YAML cannot overwrite newer output', async () => {
        const snippetBox = /** @type {HTMLTextAreaElement} */ (document.getElementById('snippetBox'));
        /** @type {(value: string) => void} */
        let resolveFirst;
        /** @type {(value: string) => void} */
        let resolveSecond;

        adapter.generate.mockReset();
        adapter.generate
            .mockImplementationOnce(() => new Promise((resolve) => {
                resolveFirst = resolve;
            }))
            .mockImplementationOnce(() => new Promise((resolve) => {
                resolveSecond = resolve;
            }));

        manager.updateSnippetBox();
        await vi.advanceTimersByTimeAsync(60);

        manager.updateSnippetBox();
        await vi.advanceTimersByTimeAsync(60);

        resolveSecond([
            'display:',
            '  - platform: ili9xxx',
            '    lambda: |-',
            '      it.print(22,22,id(font),"newer");'
        ].join('\n'));
        await vi.advanceTimersByTimeAsync(0);

        expect(snippetBox.value).toContain('it.print(22,22,id(font),"newer");');
        expect(manager.lastGeneratedYaml).toContain('it.print(22,22,id(font),"newer");');

        resolveFirst([
            'display:',
            '  - platform: ili9xxx',
            '    lambda: |-',
            '      it.print(11,11,id(font),"stale");'
        ].join('\n'));
        await vi.advanceTimersByTimeAsync(0);

        expect(snippetBox.value).toContain('it.print(22,22,id(font),"newer");');
        expect(snippetBox.value).not.toContain('it.print(11,11,id(font),"stale");');
        expect(manager.lastGeneratedYaml).toContain('it.print(22,22,id(font),"newer");');
    });

    it('restores persisted manual YAML overrides and allows clearing back to generated output', async () => {
        mockAppState._manualYamlOverride = 'persisted override';
        manager.updateSnippetBox();
        await vi.runAllTimersAsync();

        const snippetBox = /** @type {HTMLTextAreaElement} */ (document.getElementById('snippetBox'));
        const clearOverrideBtn = /** @type {HTMLButtonElement} */ (document.getElementById('clearYamlOverrideBtn'));

        expect(snippetBox.value).toBe('persisted override');
        expect(clearOverrideBtn.style.display).toBe('inline-block');

        clearOverrideBtn.click();
        await vi.runAllTimersAsync();

        expect(mockAppState.clearManualYamlOverride).toHaveBeenCalled();
        expect(snippetBox.value).toContain('lambda: |-');
        expect(clearOverrideBtn.style.display).toBe('none');
    });

    it('clears the persisted override when the snippet matches generated YAML again', async () => {
        const snippetBox = /** @type {HTMLTextAreaElement} */ (document.getElementById('snippetBox'));
        const generatedYaml = snippetBox.value;

        snippetBox.value = 'manual override';
        snippetBox.dispatchEvent(new Event('input'));
        expect(mockAppState.setManualYamlOverride).toHaveBeenLastCalledWith('manual override', { emitStateChange: false });

        snippetBox.value = generatedYaml;
        snippetBox.dispatchEvent(new Event('input'));

        expect(mockAppState.clearManualYamlOverride).toHaveBeenCalled();
    });

    it('falls back to project state when manual YAML override helpers are unavailable', async () => {
        mockAppState.project = { state: { manualYamlOverride: 'project override' } };
        const originalGet = mockAppState.getManualYamlOverride;
        const originalSet = mockAppState.setManualYamlOverride;
        const originalClear = mockAppState.clearManualYamlOverride;
        mockAppState.getManualYamlOverride = undefined;
        mockAppState.setManualYamlOverride = undefined;
        mockAppState.clearManualYamlOverride = undefined;

        expect(manager.getPersistedManualYamlOverride()).toBe('project override');

        manager.persistManualYamlOverride('manual fallback');
        expect(mockAppState.project.state.manualYamlOverride).toBe('manual fallback');

        manager.clearManualYamlOverride();
        await vi.runAllTimersAsync();
        expect(mockAppState.project.state.manualYamlOverride).toBe('');

        mockAppState.getManualYamlOverride = originalGet;
        mockAppState.setManualYamlOverride = originalSet;
        mockAppState.clearManualYamlOverride = originalClear;
    });

    it('wires the copy buttons through their click handlers and toggles mirrored highlight buttons', async () => {
        document.body.insertAdjacentHTML('beforeend', '<button id="secondaryToggleHighlightBtn"></button>');
        manager = new SnippetManager(adapter);
        await vi.runAllTimersAsync();

        const copySnippetSpy = vi.spyOn(manager, 'copySnippetToClipboard').mockResolvedValue(undefined);
        const copyLambdaSpy = vi.spyOn(manager, 'copyLambdaToClipboard').mockResolvedValue(undefined);
        const copyOEPLSpy = vi.spyOn(manager, 'copyOEPLServiceToClipboard').mockResolvedValue(undefined);

        document.getElementById('copySnippetBtn')?.click();
        document.getElementById('copyLambdaBtn')?.click();
        document.getElementById('copyOEPLServiceBtn')?.click();

        expect(copySnippetSpy).toHaveBeenCalled();
        expect(copyLambdaSpy).toHaveBeenCalled();
        expect(copyOEPLSpy).toHaveBeenCalled();

        document.getElementById('toggleHighlightBtn')?.click();
        expect(document.getElementById('secondaryToggleHighlightBtn')?.classList.contains('active')).toBe(false);
        document.getElementById('toggleHighlightBtn')?.click();
        expect(document.getElementById('secondaryToggleHighlightBtn')?.classList.contains('active')).toBe(true);
    });

    it('logs and skips regeneration when pending manual edits exist without a persisted override', async () => {
        manager.getPersistedManualYamlOverride = vi.fn(() => '');
        manager.hasPendingManualSnippetChanges = true;

        manager.updateSnippetBox();
        await vi.runAllTimersAsync();

        expect(mockLogger.log).toHaveBeenCalledWith('[SnippetManager] Preserving pending YAML edits; skipping auto-regeneration.');
        expect(adapter.generate).toHaveBeenCalledTimes(1);
    });

    it('handles adapter rejection and synchronous snippet generation failures', async () => {
        const snippetBox = /** @type {HTMLTextAreaElement} */ (document.getElementById('snippetBox'));
        manager.adapter.generate = vi.fn().mockRejectedValue(new Error('bad adapter'));

        manager.updateSnippetBox();
        await vi.runAllTimersAsync();
        expect(snippetBox.value).toContain('Error generating YAML (adapter): bad adapter');

        mockAppState.getPagesPayload.mockImplementationOnce(() => {
            throw new Error('bad payload');
        });
        manager.updateSnippetBox();
        await vi.runAllTimersAsync();
        expect(snippetBox.value).toContain('bad payload');
    });

    it('handles synchronous updateSnippetBox failures before async generation starts', async () => {
        const snippetBox = /** @type {HTMLTextAreaElement} */ (document.getElementById('snippetBox'));
        const originalSelectedIds = mockAppState.selectedWidgetIds;
        Object.defineProperty(mockAppState, 'selectedWidgetIds', {
            get() {
                throw new Error('selection exploded');
            },
            configurable: true
        });

        manager.updateSnippetBox();
        await vi.runAllTimersAsync();

        expect(snippetBox.value).toContain('Error generating YAML: selection exploded');
        expect(mockLogger.error).toHaveBeenCalledWith('Error generating snippet:', expect.any(Error));

        Object.defineProperty(mockAppState, 'selectedWidgetIds', {
            value: originalSelectedIds,
            writable: true,
            configurable: true
        });
    });
});
