import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { mockLogger } = vi.hoisted(() => ({
    mockLogger: {
        log: vi.fn(),
        warn: vi.fn(),
        error: vi.fn()
    }
}));

function createSnippetDom(title = 'ESPHome YAML') {
    document.body.innerHTML = '';
    const box = document.createElement('textarea');
    box.id = 'snippetBox';
    document.body.appendChild(box);

    const titleEl = document.createElement('div');
    titleEl.className = 'code-panel-title';
    titleEl.textContent = title;
    document.body.appendChild(titleEl);

    return box;
}

async function importYamlExportWithMocks({ readyState = 'complete', canvasInstance = { dragState: null, lassoState: null } } = {}) {
    vi.resetModules();
    vi.doMock('../../js/utils/logger.js', () => ({ Logger: mockLogger }));
    vi.doMock('../../js/core/state', () => ({ AppState: { isUndoRedoInProgress: false } }));
    vi.doMock('../../js/core/canvas.js', () => ({ canvasInstance }));

    Object.defineProperty(document, 'readyState', {
        configurable: true,
        value: readyState
    });

    return await import('../../js/io/yaml_export.js');
}

describe('yaml_export interactions', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.useRealTimers();
    });

    afterEach(() => {
        vi.resetModules();
        vi.unmock('../../js/utils/logger.js');
        vi.unmock('../../js/core/state');
        vi.unmock('../../js/core/canvas.js');
        document.body.innerHTML = '';
    });

    it('attaches listeners on DOMContentLoaded and clears auto highlight on direct user interaction', async () => {
        createSnippetDom();
        const yamlModule = await importYamlExportWithMocks({ readyState: 'loading' });
        const bridge = await import('../../js/core/snippet_selection_bridge.js');
        const box = /** @type {HTMLTextAreaElement} */ (document.getElementById('snippetBox'));

        document.dispatchEvent(new Event('DOMContentLoaded'));

        box.value = [
            '// widget:text id:widget_alpha x:10 y:20',
            'it.print(10, 20, id(font), "alpha");'
        ].join('\n');

        yamlModule.highlightWidgetInSnippet('widget_alpha');
        expect(bridge.isSnippetAutoHighlightActive()).toBe(true);

        box.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
        expect(bridge.isSnippetAutoHighlightActive()).toBe(false);
        expect(mockLogger.log).toHaveBeenCalledWith('[YAML Export] Interaction listeners attached to Snippet Box.');
    });

    it('highlights spaced JSON objects and keeps the trailing comma with the selected payload', async () => {
        const box = createSnippetDom();
        const { highlightWidgetInSnippet } = await importYamlExportWithMocks();
        box.value = [
            '{"id": "alpha", "type":"label", "value":"one"},',
            '{"id": "beta", "type":"label", "value":"two"},',
            'globals:'
        ].join('\n');

        highlightWidgetInSnippet('beta');

        const selected = box.value.slice(box.selectionStart, box.selectionEnd);
        expect(selected).toContain('"id": "beta"');
        expect(selected.trimEnd().endsWith('},')).toBe(true);
        expect(selected).not.toContain('"id": "alpha"');
    });

    it('walks back to the ODP type header and stops at the next top-level section', async () => {
        const box = createSnippetDom();
        const { highlightWidgetInSnippet } = await importYamlExportWithMocks();
        box.value = [
            '    - type: text',
            '      value: first',
            '      id: alpha',
            '    - type: plot',
            '      value: second',
            '      id: beta',
            'display:',
            '  - platform: ili9xxx'
        ].join('\n');

        highlightWidgetInSnippet('beta');

        const selected = box.value.slice(box.selectionStart, box.selectionEnd);
        expect(selected.startsWith('    - type: plot')).toBe(true);
        expect(selected).toContain('id: beta');
        expect(selected).not.toContain('display:');
    });

    it('logs selection failures in snippet mode and tolerates runtime selection errors during auto highlight', async () => {
        const box = createSnippetDom('Selection Snippet');
        const yamlModule = await importYamlExportWithMocks();

        box.value = '{"id":"widget_error","type":"text"}';
        box.setSelectionRange = vi.fn(() => {
            throw new Error('selection unavailable');
        });

        expect(() => yamlModule.highlightWidgetInSnippet('widget_error')).not.toThrow();
        expect(mockLogger.error).toHaveBeenCalledWith('[highlightWidgetInSnippet] Selection error (SnippetMode):', expect.any(Error));

        const normalBox = createSnippetDom();
        const normalModule = await importYamlExportWithMocks({
            canvasInstance: { dragState: null, lassoState: null }
        });
        normalBox.value = [
            '// widget:text id:widget_live x:10 y:20',
            'it.print(10, 20, id(font), "live");'
        ].join('\n');
        normalBox.setSelectionRange = vi.fn(() => {
            throw new Error('selection unavailable');
        });

        expect(() => normalModule.highlightWidgetInSnippet('widget_live')).not.toThrow();
    });
});
