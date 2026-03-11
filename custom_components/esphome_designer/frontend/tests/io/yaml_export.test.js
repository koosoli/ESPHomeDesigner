import { describe, it, expect, beforeEach } from 'vitest';
import { highlightWidgetInSnippet } from '../../js/io/yaml_export.js';
import {
    getLastSnippetHighlightRange,
    isSnippetAutoHighlightActive,
    resetSnippetSelectionState
} from '../../js/core/snippet_selection_bridge.js';

describe('yaml_export highlightWidgetInSnippet', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
        const box = document.createElement('textarea');
        box.id = 'snippetBox';
        document.body.appendChild(box);

        const title = document.createElement('div');
        title.className = 'code-panel-title';
        title.textContent = 'ESPHome YAML';
        document.body.appendChild(title);

        resetSnippetSelectionState();
    });

    it('clears selection when no ids are provided', () => {
        const box = document.getElementById('snippetBox');
        box.value = 'display:\n  - type: label\n';

        highlightWidgetInSnippet([]);

        expect(box.selectionStart).toBe(0);
        expect(box.selectionEnd).toBe(0);
        expect(getLastSnippetHighlightRange()).toBeNull();
    });

    it('selects entire snippet in selection-snippet mode', () => {
        const box = document.getElementById('snippetBox');
        box.value = 'line1\nline2\nline3';

        const title = document.querySelector('.code-panel-title');
        title.textContent = 'Selection Snippet';

        highlightWidgetInSnippet('widget_1');

        expect(box.selectionStart).toBe(0);
        expect(box.selectionEnd).toBe(box.value.length);
        expect(getLastSnippetHighlightRange()).toEqual({ start: 0, end: box.value.length });
    });

    it('highlights standard widget marker blocks', () => {
        const box = document.getElementById('snippetBox');
        box.value = [
            '// widget:label id:widget_a x:10 y:10',
            'it.print(10, 10, id(font), "Hello");',
            '// ────────────────',
            '// widget:icon id:widget_b x:20 y:20',
            'it.print(20, 20, id(font), "World");'
        ].join('\n');

        highlightWidgetInSnippet('widget_b');

        expect(box.selectionStart).toBeGreaterThan(0);
        expect(box.selectionEnd).toBeGreaterThan(box.selectionStart);
        expect(isSnippetAutoHighlightActive()).toBe(true);
        expect(getLastSnippetHighlightRange()?.start).toBe(box.selectionStart);
        expect(getLastSnippetHighlightRange()?.end).toBe(box.selectionEnd);
    });

    it('highlights json widget objects by id fallback', () => {
        const box = document.getElementById('snippetBox');
        box.value = [
            '{"id":"alpha","type":"label","x":1}',
            '{"id":"beta","type":"icon","x":2}',
            'esphome:'
        ].join('\n');

        highlightWidgetInSnippet('beta');

        expect(box.selectionEnd).toBeGreaterThan(box.selectionStart);
        expect(getLastSnippetHighlightRange()).not.toBeNull();
    });
});
