// @ts-nocheck
/**
 * Lightweight YAML syntax highlighter for ESPHome Designer.
 * Uses regex patterns to tokenize YAML and returns HTML with span classes.
 * Focuses on a subtle, light color palette.
 */
export class YamlHighlighter {
    constructor() {
        this.patterns = [
            // Comments: # something
            { name: 'comment', regex: /(#.*)/g },

            // Keys: something:
            { name: 'key', regex: /^(\s*)([^:\n]+)(:)/gm },

            // Strings: "something" or 'something'
            { name: 'string', regex: /("[^"]*"|'[^']*')/g },

            // Numbers and Booleans: 123, true, false
            { name: 'value', regex: /\b(true|false|null|[0-9]+(\.[0-9]+)?)\b/g },

            // ESPHome specific: lambda:, script:
            { name: 'keyword', regex: /\b(lambda|script|on_.*|if|then|else|wait_until|delay)\b/g },

            // Tags: !relative, !include
            { name: 'tag', regex: /(![a-z_]+)/g }
        ];
    }

    /**
     * Highlights the given YAML string.
     * @param {string} yaml 
     * @param {{ start: number, end: number } | null} [selectionRange]
     * @returns {string} HTML string
     */
    highlight(yaml, selectionRange = null) {
        if (!yaml) return "";

        /**
         * The Big Regex: Single-pass tokenization.
         * Group indices:
         * 1: Key Indent & list marker
         * 2: Key Name
         * 3: Key Colon
         * 4: Comment
         * 5: Quoted String
         * 6: Tag (!lambda, etc)
         * 7: Keyword
         * 8: Value (bool, null, number)
         * 9: Block markers (|-, >, etc)
         */
        const tokenRegex = /^(\s*(?:-\s+)?)([^:\n]+)(:)|(#.*)|("[^"]*"|'[^']*')|(![a-z_]+)|\b(lambda|script|on_[a-z_]+|if|then|else|wait_until|delay)\b|\b(true|false|null|[0-9]+(?:\.[0-9]+)?)\b|(\|[-+]?|>[-+]?)/gm;
        const segments = [];
        let lastIndex = 0;

        for (const match of yaml.matchAll(tokenRegex)) {
            const index = match.index ?? 0;

            if (index > lastIndex) {
                segments.push({ text: yaml.slice(lastIndex, index), className: null });
            }

            const [, p1, p2, p3, p4, p5, p6, p7, p8, p9] = match;
            if (p1 !== undefined) {
                segments.push({ text: p1, className: null });
                segments.push({ text: p2, className: 'hl-key' });
                segments.push({ text: p3, className: 'hl-punc' });
            } else if (p4 !== undefined) {
                segments.push({ text: p4, className: 'hl-comment' });
            } else if (p5 !== undefined) {
                segments.push({ text: p5, className: 'hl-string' });
            } else if (p6 !== undefined) {
                segments.push({ text: p6, className: 'hl-tag' });
            } else if (p9 !== undefined) {
                segments.push({ text: p9, className: 'hl-punc' });
            } else if (p7 !== undefined) {
                segments.push({ text: p7, className: 'hl-keyword' });
            } else if (p8 !== undefined) {
                segments.push({ text: p8, className: 'hl-value' });
            }

            lastIndex = index + match[0].length;
        }

        if (lastIndex < yaml.length) {
            segments.push({ text: yaml.slice(lastIndex), className: null });
        }

        let cursor = 0;
        const normalizedSelection = selectionRange && selectionRange.end > selectionRange.start
            ? selectionRange
            : null;

        return segments.map((segment) => {
            const segmentStart = cursor;
            const segmentEnd = cursor + segment.text.length;
            cursor = segmentEnd;

            return this.renderSegment(segment, segmentStart, segmentEnd, normalizedSelection);
        }).join('');
    }

    /**
     * @param {{ text: string, className: string | null }} segment
     * @param {number} segmentStart
     * @param {number} segmentEnd
     * @param {{ start: number, end: number } | null} selectionRange
     * @returns {string}
     */
    renderSegment(segment, segmentStart, segmentEnd, selectionRange) {
        if (!segment.text) return '';

        if (!selectionRange || selectionRange.end <= segmentStart || selectionRange.start >= segmentEnd) {
            return this.wrapSegmentText(segment.text, segment.className, false);
        }

        const selectedStart = Math.max(selectionRange.start, segmentStart) - segmentStart;
        const selectedEnd = Math.min(selectionRange.end, segmentEnd) - segmentStart;
        const parts = [
            { text: segment.text.slice(0, selectedStart), selected: false },
            { text: segment.text.slice(selectedStart, selectedEnd), selected: true },
            { text: segment.text.slice(selectedEnd), selected: false }
        ];

        return parts.map((part) => this.wrapSegmentText(part.text, segment.className, part.selected)).join('');
    }

    /**
     * @param {string} text
     * @param {string | null} className
     * @param {boolean} selected
     * @returns {string}
     */
    wrapSegmentText(text, className, selected) {
        if (!text) return '';

        const escapedText = this.escapeHtml(text);
        const styledText = className ? `<span class="${className}">${escapedText}</span>` : escapedText;
        return selected ? `<span class="hl-selected">${styledText}</span>` : styledText;
    }

    /**
     * @param {string} text
     * @returns {string}
     */
    escapeHtml(text) {
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");
    }
}
