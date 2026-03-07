import { describe, expect, it, vi } from 'vitest';

import {
    evaluateTemplatePreview,
    parseColorMarkup,
    wordWrap
} from '../../js/utils/text_utils.js';

describe('text utils', () => {
    it('wraps text, preserves active color tags, respects newlines, and falls back when width is too small', () => {
        expect(wordWrap('[red]Hello world[/red]', 26, 10)).toEqual([
            '[red]Hello[/red]',
            '[red]world[/red]'
        ]);

        expect(wordWrap('One\nTwo', 200, 10)).toEqual(['One', 'Two']);
        expect(wordWrap('No room', 0, 10)).toEqual(['No room']);
    });

    it('treats monospace fonts as wider than proportional fonts', () => {
        expect(wordWrap('ABCD EF', 29, 10, 'Roboto')).toEqual([
            'ABCD ',
            'EF'
        ]);

        expect(wordWrap('ABCD EF', 29, 10, 'Courier New')).toEqual([
            'ABCD',
            'EF'
        ]);
    });

    it('parses nested color markup, remaps accent, and falls back for template colors', () => {
        const getColorStyle = vi.fn((name) => {
            const colors = {
                gray: '#888888',
                red: '#ff0000',
                black: '#000000'
            };
            return colors[name] || colors.black;
        });

        const fragment = parseColorMarkup(
            'A [red]B [accent]C[/accent] D[/red] [{{ sensor.color }}]E[/{{ sensor.color }}]',
            'gray',
            getColorStyle
        );

        const spans = Array.from(fragment.childNodes);
        expect(spans).toHaveLength(6);
        expect(spans.map((span) => span.textContent)).toEqual(['A ', 'B ', 'C', ' D', ' ', 'E']);
        expect(getColorStyle).toHaveBeenNthCalledWith(1, 'gray');
        expect(getColorStyle).toHaveBeenNthCalledWith(2, 'red');
        expect(getColorStyle).toHaveBeenNthCalledWith(3, 'red');
        expect(getColorStyle).toHaveBeenNthCalledWith(4, 'red');
        expect(getColorStyle).toHaveBeenNthCalledWith(5, 'gray');
        expect(getColorStyle).toHaveBeenNthCalledWith(6, 'black');
    });

    it('returns an empty fragment for empty color markup input', () => {
        const getColorStyle = vi.fn((name) => `css:${name}`);
        const fragment = parseColorMarkup('', 'black', getColorStyle);

        expect(fragment.childNodes).toHaveLength(0);
        expect(getColorStyle).not.toHaveBeenCalled();
    });

    it('evaluates states and is_state templates for preview text', () => {
        const entityStates = {
            'sensor.temp': { state: 72, formatted: '72 F' },
            'light.office': { state: 'on' }
        };

        expect(evaluateTemplatePreview('Temp: {{ states("sensor.temp") }}', entityStates)).toBe('Temp: 72 F');
        expect(evaluateTemplatePreview('Office on? {{ is_state("light.office", "on") }}', entityStates)).toBe('Office on? True');
        expect(evaluateTemplatePreview('Office off? {{ is_state("light.office", "off") }}', entityStates)).toBe('Office off? False');
        expect(evaluateTemplatePreview('Missing: {{ states("sensor.unknown") }}', entityStates)).toBe('Missing: --');
        expect(evaluateTemplatePreview('Plain text', entityStates)).toBe('Plain text');
        expect(evaluateTemplatePreview('', entityStates)).toBe('');
    });
});
