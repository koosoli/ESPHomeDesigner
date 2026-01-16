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
     * @returns {string} HTML string
     */
    highlight(yaml) {
        if (!yaml) return "";

        // Escape essential HTML characters first
        let escaped = yaml
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

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

        return escaped.replace(tokenRegex, (match, p1, p2, p3, p4, p5, p6, p7, p8, p9) => {
            // Priority 1: Key (must be start of line)
            if (p1 !== undefined) {
                return `${p1}<span class="hl-key">${p2}</span><span class="hl-punc">${p3}</span>`;
            }
            // Priority 2: Comments
            if (p4 !== undefined) return `<span class="hl-comment">${p4}</span>`;
            // Priority 3: Strings
            if (p5 !== undefined) return `<span class="hl-string">${p5}</span>`;
            // Priority 4: Tags
            if (p6 !== undefined) return `<span class="hl-tag">${p6}</span>`;
            // Priority 5: Block markers
            if (p9 !== undefined) return `<span class="hl-punc">${p9}</span>`;
            // Priority 6: Keywords
            if (p7 !== undefined) return `<span class="hl-keyword">${p7}</span>`;
            // Priority 7: Values
            if (p8 !== undefined) return `<span class="hl-value">${p8}</span>`;

            return match;
        });
    }
}
