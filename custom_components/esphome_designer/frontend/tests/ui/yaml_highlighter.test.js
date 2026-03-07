import { describe, expect, it } from 'vitest';
import { YamlHighlighter } from '../../js/ui/yaml_highlighter.js';

describe('YamlHighlighter', () => {
    it('returns an empty string for empty input', () => {
        const highlighter = new YamlHighlighter();
        expect(highlighter.highlight('')).toBe('');
    });

    it('highlights keys, comments, strings, tags, keywords, values, and block markers', () => {
        const highlighter = new YamlHighlighter();
        const yaml = [
            'display:',
            '  - platform: ili9xxx',
            '    lambda: |-',
            '      if: true',
            '      script: !include "part.yaml"',
            '      delay: 1.5',
            '      # comment'
        ].join('\n');

        const result = highlighter.highlight(yaml);

        expect(result).toContain('<span class="hl-key">display</span><span class="hl-punc">:</span>');
        expect(result).toContain('<span class="hl-key">platform</span><span class="hl-punc">:</span>');
        expect(result).toContain('<span class="hl-key">lambda</span><span class="hl-punc">:</span>');
        expect(result).toContain('<span class="hl-punc">|-</span>');
        expect(result).toContain('<span class="hl-key">if</span><span class="hl-punc">:</span>');
        expect(result).toContain('<span class="hl-value">true</span>');
        expect(result).toContain('<span class="hl-key">script</span><span class="hl-punc">:</span>');
        expect(result).toContain('<span class="hl-tag">!include</span>');
        expect(result).toContain('<span class="hl-string">"part.yaml"</span>');
        expect(result).toContain('<span class="hl-key">delay</span><span class="hl-punc">:</span>');
        expect(result).toContain('<span class="hl-value">1.5</span>');
        expect(result).toContain('<span class="hl-comment"># comment</span>');
    });

    it('escapes HTML-sensitive characters before highlighting', () => {
        const highlighter = new YamlHighlighter();
        const result = highlighter.highlight('text: "<tag>&value"');

        expect(result).toContain('&lt;tag&gt;&amp;value');
        expect(result).not.toContain('<tag>');
    });

    it('renders auto-selected ranges inside the syntax highlight layer', () => {
        const highlighter = new YamlHighlighter();
        const yaml = [
            'display:',
            '  - platform: ili9xxx'
        ].join('\n');
        const start = yaml.indexOf('platform');
        const end = start + 'platform: ili9xxx'.length;

        const result = highlighter.highlight(yaml, { start, end });

        expect(result).toContain('<span class="hl-selected"><span class="hl-key">platform</span></span>');
        expect(result).toContain('<span class="hl-selected"><span class="hl-punc">:</span></span>');
        expect(result).toContain('<span class="hl-selected"> ili9xxx</span>');
    });
});
