import { beforeEach, describe, expect, it } from 'vitest';

import { highlightWidgetInSnippet } from '../../js/io/yaml_export.js';
import {
    getLastSnippetHighlightRange,
    isSnippetAutoHighlightActive,
    resetSnippetSelectionState
} from '../../js/core/snippet_selection_bridge.js';

describe('yaml_export edge cases', () => {
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

    it('highlights OpenDisplay comment blocks by id marker', () => {
        const box = /** @type {HTMLTextAreaElement} */ (document.getElementById('snippetBox'));
        box.value = [
            '    # id: first_widget',
            '    - type: text',
            '      value: first',
            '    # id: second_widget',
            '    - type: text',
            '      value: second'
        ].join('\n');

        highlightWidgetInSnippet('second_widget');

        const selected = box.value.slice(box.selectionStart, box.selectionEnd);
        expect(selected).toContain('# id: second_widget');
        expect(selected).toContain('value: second');
        expect(selected).not.toContain('first_widget');
    });

    it('records the highlight range without stealing selection while another input is active', () => {
        const box = /** @type {HTMLTextAreaElement} */ (document.getElementById('snippetBox'));
        box.value = [
            '// widget:text id:widget_live x:10 y:20',
            'it.print(10, 20, id(font), "live");'
        ].join('\n');

        const otherInput = document.createElement('input');
        document.body.appendChild(otherInput);
        otherInput.focus();
        box.setSelectionRange(0, 0);

        highlightWidgetInSnippet('widget_live');

        expect(box.selectionStart).toBe(0);
        expect(box.selectionEnd).toBe(0);
        expect(getLastSnippetHighlightRange()).toEqual({
            start: 0,
            end: box.value.length
        });
        expect(isSnippetAutoHighlightActive()).toBe(false);
    });
});
