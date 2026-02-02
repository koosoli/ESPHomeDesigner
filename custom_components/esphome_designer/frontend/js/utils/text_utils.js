/**
 * Text Utilities for ESPHome Designer
 * Common functions for word wrapping and color tag parsing.
 */

/**
 * Word-wrap text to fit within a given width
 * @param {string} text - The text to wrap
 * @param {number} maxWidth - Maximum width in pixels
 * @param {number} fontSize - Font size in pixels
 * @param {string} fontFamily - Font family name
 * @returns {string[]} Array of wrapped lines
 */
export const wordWrap = (text, maxWidth, fontSize, fontFamily = "Roboto") => {
    // Estimate average character width based on font
    const isMonospace = fontFamily.toLowerCase().includes("mono") ||
        fontFamily.toLowerCase().includes("courier") ||
        fontFamily.toLowerCase().includes("consolas");
    const avgCharWidth = fontSize * (isMonospace ? 0.6 : 0.52);
    const maxCharsPerLine = Math.floor(maxWidth / avgCharWidth);

    if (maxCharsPerLine <= 0) return [text];

    // Tokenize string into tags, spaces, and words
    const tokens = text.match(/(\[\/?(?:{{.*?}}|[^\]])+\]|\s+|[^\s[\]]+|\[|\])/g) || [];

    const lines = [];
    let currentLine = "";
    let currentVisibleLength = 0;
    let activeTags = [];

    const getClosingTags = (tags) => [...tags].reverse().map(t => {
        return t.replace("[", "[/");
    }).join("");

    const getOpeningTags = (tags) => tags.join("");

    tokens.forEach(token => {
        if (token.includes("\n")) {
            lines.push(currentLine + getClosingTags(activeTags));
            currentLine = getOpeningTags(activeTags);
            currentVisibleLength = 0;
            return;
        }

        if (token.startsWith("[") && token.endsWith("]")) {
            if (token.startsWith("[/")) {
                activeTags.pop();
            } else {
                activeTags.push(token);
            }
            currentLine += token;
            return;
        }

        const visibleLength = token.length;

        if (currentVisibleLength + visibleLength > maxCharsPerLine && currentVisibleLength > 0) {
            lines.push(currentLine + getClosingTags(activeTags));
            currentLine = getOpeningTags(activeTags) + (token.trim() ? token : "");
            currentVisibleLength = token.trim() ? visibleLength : 0;
        } else {
            currentLine += token;
            currentVisibleLength += visibleLength;
        }
    });

    if (currentLine.replace(/\[\/?(?:{{.*?}}|[^\]])+\]/g, "").trim() || activeTags.length > 0) {
        lines.push(currentLine + getClosingTags(activeTags));
    }

    return lines.length > 0 ? lines : [""];
};

/**
 * Parses color tags: "Text [red]Color[/red]" -> HTML
 * @param {string} text 
 * @param {string} defaultColor 
 * @param {Function} getColorStyle 
 * @returns {DocumentFragment}
 */
export const parseColorMarkup = (text, defaultColor, getColorStyle) => {
    const root = document.createDocumentFragment();
    if (!text) return root;

    const parts = text.split(/(\[\/?(?:{{.*?}}|[^\]])+\])/g);
    const colorStack = [defaultColor];

    parts.forEach(part => {
        if (!part) return;

        if (part.startsWith("[/") && part.endsWith("]")) {
            if (colorStack.length > 1) {
                colorStack.pop();
            }
            return;
        }

        if (part.startsWith("[") && part.endsWith("]")) {
            const colorName = part.substring(1, part.length - 1).trim();
            colorStack.push(colorName);
            return;
        }

        const span = document.createElement("span");
        let currentColor = colorStack[colorStack.length - 1];

        if (currentColor === 'accent') currentColor = 'red';

        let cssColor;
        if (typeof currentColor === 'string' && currentColor.startsWith("{{")) {
            cssColor = getColorStyle('black');
        } else {
            cssColor = getColorStyle(currentColor || defaultColor);
        }

        span.style.color = cssColor;
        span.textContent = part;
        root.appendChild(span);
    });

    return root;
};

/**
 * Simple HA template evaluation for designer preview.
 * @param {string} text 
 * @param {Object} entityStates 
 * @returns {string} Evaluated text
 */
export const evaluateTemplatePreview = (text, entityStates) => {
    if (!text || typeof text !== 'string' || !entityStates) return text;
    if (!text.includes('{{')) return text;

    return text.replace(/{{\s*states\(['"]([^'"]+)['"]\)\s*}}/g, (match, entityId) => {
        const eObj = entityStates[entityId.trim()];
        return eObj ? (eObj.formatted || String(eObj.state)) : "--";
    }).replace(/{{\s*is_state\(['"]([^'"]+)['"]\s*,\s*['"]([^'"]+)['"]\)\s*}}/g, (match, entityId, state) => {
        const eObj = entityStates[entityId.trim()];
        return (eObj && String(eObj.state) === state) ? "True" : "False";
    });
};
