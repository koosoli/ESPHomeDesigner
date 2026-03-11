// @ts-check

/**
 * Shared snippet-selection state used by YAML highlighting and keyboard shortcuts.
 * Keeping this state in one explicit module removes the need for `window.*` handoffs.
 */

/**
 * @typedef {{ start: number, end: number }} SnippetHighlightRange
 */

export const SNIPPET_SELECTION_STATE_EVENT = 'snippet-selection-state-changed';

/** @type {SnippetHighlightRange | null} */
let lastHighlightRange = null;
let isAutoHighlight = false;

function notifySnippetSelectionStateChanged() {
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent(SNIPPET_SELECTION_STATE_EVENT));
    }
}

/**
 * @returns {SnippetHighlightRange | null}
 */
export function getLastSnippetHighlightRange() {
    return lastHighlightRange;
}

/**
 * @param {SnippetHighlightRange | null} range
 */
export function setLastSnippetHighlightRange(range) {
    lastHighlightRange = range;
    notifySnippetSelectionStateChanged();
}

/**
 * @returns {boolean}
 */
export function isSnippetAutoHighlightActive() {
    return isAutoHighlight;
}

/**
 * @param {boolean} value
 */
export function setSnippetAutoHighlight(value) {
    isAutoHighlight = value;
    notifySnippetSelectionStateChanged();
}

export function clearSnippetAutoHighlight() {
    isAutoHighlight = false;
    notifySnippetSelectionStateChanged();
}

export function resetSnippetSelectionState() {
    lastHighlightRange = null;
    isAutoHighlight = false;
    notifySnippetSelectionStateChanged();
}
