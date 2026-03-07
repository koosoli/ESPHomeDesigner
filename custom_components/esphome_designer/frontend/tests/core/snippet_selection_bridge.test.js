import { beforeEach, describe, expect, it } from 'vitest';
import {
    clearSnippetAutoHighlight,
    getLastSnippetHighlightRange,
    isSnippetAutoHighlightActive,
    resetSnippetSelectionState,
    setLastSnippetHighlightRange,
    setSnippetAutoHighlight
} from '../../js/core/snippet_selection_bridge.js';

describe('snippet_selection_bridge', () => {
    beforeEach(() => {
        resetSnippetSelectionState();
    });

    it('tracks snippet highlight state without using window globals', () => {
        expect(isSnippetAutoHighlightActive()).toBe(false);
        expect(getLastSnippetHighlightRange()).toBeNull();

        setSnippetAutoHighlight(true);
        setLastSnippetHighlightRange({ start: 4, end: 12 });

        expect(isSnippetAutoHighlightActive()).toBe(true);
        expect(getLastSnippetHighlightRange()).toEqual({ start: 4, end: 12 });
    });

    it('clears only the auto-highlight flag when requested', () => {
        setSnippetAutoHighlight(true);
        setLastSnippetHighlightRange({ start: 1, end: 3 });

        clearSnippetAutoHighlight();

        expect(isSnippetAutoHighlightActive()).toBe(false);
        expect(getLastSnippetHighlightRange()).toEqual({ start: 1, end: 3 });
    });
});
