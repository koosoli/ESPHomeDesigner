import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockLogger = {
    log: vi.fn(),
    warn: vi.fn(),
    error: vi.fn()
};

const mockShowToast = vi.fn();
const mockLoadLayoutIntoState = vi.fn();
const mockParseSnippetYamlOffline = vi.fn();
const mockImportSnippetBackend = vi.fn();
const mockHasHaBackend = vi.fn(() => false);
const mockGetLastSnippetHighlightRange = vi.fn(() => ({ start: 4, end: 12 }));
const mockIsSnippetAutoHighlightActive = vi.fn(() => true);

const mockAppState = {
    currentLayoutId: 'layout_1',
    deviceName: 'Layout 1',
    deviceModel: 'reterminal_e1001',
    settings: {
        device_model: 'reterminal_e1001',
        dark_mode: true
    }
};

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

vi.mock('../../js/core/snippet_selection_bridge.js', () => ({
    getLastSnippetHighlightRange: mockGetLastSnippetHighlightRange,
    isSnippetAutoHighlightActive: mockIsSnippetAutoHighlightActive
}));

vi.mock('../../js/utils/logger.js', () => ({
    Logger: mockLogger
}));

vi.mock('../../js/utils/dom.js', () => ({
    showToast: mockShowToast
}));

vi.mock('../../js/io/yaml_import', () => ({
    loadLayoutIntoState: mockLoadLayoutIntoState,
    parseSnippetYamlOffline: mockParseSnippetYamlOffline
}));

vi.mock('../../js/io/ha_api.js', () => ({
    importSnippetBackend: mockImportSnippetBackend
}));

vi.mock('../../js/utils/env.js', () => ({
    hasHaBackend: mockHasHaBackend
}));

describe('snippet_manager_editing', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.useFakeTimers();
        document.body.innerHTML = `
            <textarea id="snippetBox">display:\n  - platform: ili9xxx</textarea>
            <div id="snippetFullscreenModal" class="hidden">
              <div id="snippetFullscreenContainer" class="snippet-container"></div>
              <div id="snippetFullscreenContent"></div>
              <div id="snippetFullscreenHighlight"></div>
              <div class="modal-actions"></div>
            </div>
            <button id="toggleFullscreenHighlightBtn"></button>
            <button id="toggleHighlightBtn"></button>
            <div class="snippet-container"></div>
            <textarea id="importSnippetTextarea"></textarea>
            <div id="importSnippetError"></div>
            <div id="importSnippetModal"></div>
        `;
    });

    it('opens the fullscreen editor and renders snippet highlighting from the helper', async () => {
        const { openSnippetModalEditor } = await import('../../js/ui/snippet_manager_editing.js');

        const manager = {
            isHighlighted: true,
            highlighter: {
                highlight: vi.fn(() => '<span>highlighted</span>')
            },
            updateHighlightLayer: vi.fn(),
            handleUpdateLayoutFromSnippetBox: vi.fn()
        };

        openSnippetModalEditor(manager);

        const modal = document.getElementById('snippetFullscreenModal');
        const textarea = modal?.querySelector('textarea');
        expect(modal?.classList.contains('hidden')).toBe(false);
        expect(textarea?.value).toContain('display:');
        expect(manager.highlighter.highlight).toHaveBeenCalledWith(
            'display:\n  - platform: ili9xxx',
            { start: 4, end: 12 }
        );
    });

    it('syncs fullscreen toggle, editor input, and update button behavior', async () => {
        const { openSnippetModalEditor } = await import('../../js/ui/snippet_manager_editing.js');

        const manager = {
            isHighlighted: false,
            highlighter: {
                highlight: vi.fn((value) => `<mark>${value}</mark>`)
            },
            updateHighlightLayer: vi.fn(),
            handleUpdateLayoutFromSnippetBox: vi.fn()
        };

        openSnippetModalEditor(manager);

        const modal = /** @type {HTMLElement} */ (document.getElementById('snippetFullscreenModal'));
        const content = /** @type {HTMLElement} */ (document.getElementById('snippetFullscreenContent'));
        const highlight = /** @type {HTMLElement} */ (document.getElementById('snippetFullscreenHighlight'));
        const toggle = /** @type {HTMLButtonElement} */ (document.getElementById('toggleFullscreenHighlightBtn'));
        const mainToggle = document.getElementById('toggleHighlightBtn');
        const mainContainer = document.querySelector('.snippet-container');
        const textarea = /** @type {HTMLTextAreaElement} */ (content.querySelector('textarea'));
        const updateBtn = /** @type {HTMLButtonElement} */ (modal.querySelector('#fullscreenUpdateBtn'));

        toggle.click();
        expect(manager.isHighlighted).toBe(true);
        expect(toggle.classList.contains('active')).toBe(true);
        expect(mainToggle?.classList.contains('active')).toBe(true);
        expect(mainContainer?.classList.contains('highlighted')).toBe(true);
        expect(manager.updateHighlightLayer).toHaveBeenCalled();

        textarea.value = 'sensor:\n  - name: edited';
        textarea.scrollTop = 11;
        textarea.scrollLeft = 7;
        textarea.dispatchEvent(new Event('scroll'));
        expect(highlight.scrollTop).toBe(11);
        expect(highlight.scrollLeft).toBe(7);

        textarea.dispatchEvent(new Event('input'));
        expect(highlight.innerHTML).toContain('sensor:');

        updateBtn.click();
        expect(document.getElementById('snippetBox')?.value).toContain('edited');
        expect(manager.handleUpdateLayoutFromSnippetBox).toHaveBeenCalled();
        expect(modal.classList.contains('hidden')).toBe(true);
    });

    it('falls back to backend snippet import when the offline parser fails', async () => {
        const { handleImportSnippetEditor } = await import('../../js/ui/snippet_manager_editing.js');

        mockParseSnippetYamlOffline.mockImplementation(() => {
            throw new Error('offline parser failed');
        });
        mockHasHaBackend.mockReturnValue(true);
        mockImportSnippetBackend.mockResolvedValue({ pages: [], settings: {} });
        /** @type {HTMLTextAreaElement} */ (document.getElementById('importSnippetTextarea')).value = 'snippet body';

        await handleImportSnippetEditor({});

        expect(mockImportSnippetBackend).toHaveBeenCalledWith('snippet body');
        expect(mockLoadLayoutIntoState).toHaveBeenCalledWith({ pages: [], settings: {} });
        expect(mockShowToast).toHaveBeenCalledWith('Layout imported successfully', 'success');
        expect(document.getElementById('importSnippetModal')?.style.display).toBe('none');
    });

    it('surfaces import errors when no backend fallback is available', async () => {
        const { handleImportSnippetEditor } = await import('../../js/ui/snippet_manager_editing.js');

        mockParseSnippetYamlOffline.mockImplementation(() => {
            throw new Error('offline parser failed');
        });
        mockHasHaBackend.mockReturnValue(false);
        /** @type {HTMLTextAreaElement} */ (document.getElementById('importSnippetTextarea')).value = 'snippet body';

        await handleImportSnippetEditor({});

        expect(mockLoadLayoutIntoState).not.toHaveBeenCalled();
        expect(document.getElementById('importSnippetError')?.textContent).toContain('offline parser failed');
    });

    it('updates layout from YAML while preserving layout context', async () => {
        const { handleUpdateLayoutFromSnippetBoxEditor } = await import('../../js/ui/snippet_manager_editing.js');

        mockParseSnippetYamlOffline.mockReturnValue({ pages: [], settings: {} });
        /** @type {HTMLTextAreaElement} */ (document.getElementById('snippetBox')).value = 'lambda:\n  return 1;';

        const manager = {
            lastGeneratedYaml: 'old',
            suppressSnippetUpdate: false,
            snippetDebounceTimer: null,
            hasPendingManualSnippetChanges: true
        };

        await handleUpdateLayoutFromSnippetBoxEditor(manager);
        await vi.runAllTimersAsync();

        expect(mockParseSnippetYamlOffline).toHaveBeenCalledWith('lambda:\n  return 1;');
        expect(mockLoadLayoutIntoState).toHaveBeenCalledWith(expect.objectContaining({
            device_id: 'layout_1',
            device_model: 'reterminal_e1001',
            name: 'Layout 1',
            settings: expect.objectContaining({
                device_model: 'reterminal_e1001',
                device_name: 'Layout 1',
                dark_mode: true
            })
        }));
        expect(mockShowToast).toHaveBeenCalledWith('Layout updated from YAML', 'success');
        expect(mockShowToast).toHaveBeenCalledWith('Note: Custom C++ (lambda/script) may not fully preview.', 'warning', 4000);
        expect(manager.hasPendingManualSnippetChanges).toBe(false);
        expect(manager.suppressSnippetUpdate).toBe(false);
    });

    it('surfaces a parse error when the offline parser returns no layout', async () => {
        const { handleUpdateLayoutFromSnippetBoxEditor } = await import('../../js/ui/snippet_manager_editing.js');

        mockParseSnippetYamlOffline.mockReturnValue(null);
        /** @type {HTMLTextAreaElement} */ (document.getElementById('snippetBox')).value = 'display:\n  - platform: ili9xxx';

        const manager = {
            lastGeneratedYaml: 'something else',
            suppressSnippetUpdate: false,
            snippetDebounceTimer: null
        };

        await handleUpdateLayoutFromSnippetBoxEditor(manager);

        expect(mockLoadLayoutIntoState).not.toHaveBeenCalled();
        expect(mockShowToast).toHaveBeenCalledWith('Update failed: Could not parse layout from YAML', 'error');
        expect(manager.suppressSnippetUpdate).toBe(false);
    });

    it('skips updates when the YAML matches the last generated state', async () => {
        const { handleUpdateLayoutFromSnippetBoxEditor } = await import('../../js/ui/snippet_manager_editing.js');

        /** @type {HTMLTextAreaElement} */ (document.getElementById('snippetBox')).value = 'same yaml';

        const manager = {
            lastGeneratedYaml: 'same yaml',
            suppressSnippetUpdate: false,
            snippetDebounceTimer: null
        };

        await handleUpdateLayoutFromSnippetBoxEditor(manager);

        expect(mockParseSnippetYamlOffline).not.toHaveBeenCalled();
        expect(mockLoadLayoutIntoState).not.toHaveBeenCalled();
    });

    it('creates missing layout settings before loading state and resets suppression after the timer', async () => {
        const { handleUpdateLayoutFromSnippetBoxEditor } = await import('../../js/ui/snippet_manager_editing.js');

        mockParseSnippetYamlOffline.mockReturnValue({ pages: [] });
        /** @type {HTMLTextAreaElement} */ (document.getElementById('snippetBox')).value = 'display:\n  - platform: ili9xxx';

        const manager = {
            lastGeneratedYaml: 'old yaml',
            suppressSnippetUpdate: false,
            snippetDebounceTimer: setTimeout(() => {}, 1000)
        };

        await handleUpdateLayoutFromSnippetBoxEditor(manager);

        expect(mockLoadLayoutIntoState).toHaveBeenCalledWith(expect.objectContaining({
            settings: expect.objectContaining({
                device_model: 'reterminal_e1001',
                device_name: 'Layout 1',
                dark_mode: true
            })
        }));
        expect(manager.suppressSnippetUpdate).toBe(true);

        await vi.advanceTimersByTimeAsync(1500);
        expect(manager.suppressSnippetUpdate).toBe(false);
    });
});
