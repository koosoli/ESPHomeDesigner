import { AppState } from './state.js';
import { Logger } from '../utils/logger.js';

export class KeyboardHandler {
    constructor() {
        this.init();
    }

    init() {
        window.addEventListener("keydown", (ev) => this.handleKeyDown(ev));
    }

    handleKeyDown(ev) {
        // Debug
        // Key event handling

        const state = AppState || window.AppState;
        if (!state) {
            Logger.error("KeyboardHandler: AppState not found!");
            return;
        }

        const hasSelection = state.selectedWidgetIds.length > 0;
        const selectedWidgetId = state.selectedWidgetId; // Reference for single-widget ops
        const isAutoHighlight = window.isAutoHighlight || false; // Global flag from snippet editor

        // Quick Search: Shift+Space
        // Quick Search: Shift+Space
        if (ev.shiftKey && ev.code === "Space") {
            // Always trigger, even in input fields
            // Blur the current input if it's focused (e.g. YAML snippet box)
            if (ev.target.tagName === "INPUT" || ev.target.tagName === "TEXTAREA") {
                ev.target.blur();
            }

            ev.preventDefault();
            if (window.QuickSearch) {
                window.QuickSearch.open();
            }
            return;
        }

        if ((ev.key === "Delete" || ev.key === "Backspace") && hasSelection) {
            // Special case: If snippet box is focused but selection matches the auto-highlight,
            // treat it as a widget delete.
            const lastHighlightRange = window.lastHighlightRange;
            if (ev.target.id === "snippetBox" && lastHighlightRange) {
                if (ev.target.selectionStart === lastHighlightRange.start &&
                    ev.target.selectionEnd === lastHighlightRange.end) {
                    ev.preventDefault();
                    this.deleteWidget(null); // Fix: Delete current selection (multi), not just the single ID
                    return;
                }
            }

            if (ev.target.tagName === "INPUT" || ev.target.tagName === "TEXTAREA") {
                return;
            }
            ev.preventDefault();
            this.deleteWidget(null); // Passing null to delete current selection
            return;
        }

        // Copy: Ctrl+C
        if ((ev.ctrlKey || ev.metaKey) && ev.key === "c") {
            if (ev.target.tagName === "INPUT" || ev.target.tagName === "TEXTAREA") {
                if (ev.target.id === "snippetBox" && isAutoHighlight) {
                    ev.preventDefault();
                    this.copyWidget();
                    return;
                }
                return;
            }
            ev.preventDefault();
            this.copyWidget();
        }

        // Paste: Ctrl+V
        if ((ev.ctrlKey || ev.metaKey) && ev.key === "v") {
            if (ev.target.tagName === "INPUT" || ev.target.tagName === "TEXTAREA") {
                if (ev.target.id === "snippetBox" && isAutoHighlight) {
                    ev.preventDefault();
                    this.pasteWidget();
                    return;
                }
                return;
            }
            ev.preventDefault();
            this.pasteWidget();
        }

        // Undo: Ctrl+Z
        if ((ev.ctrlKey || ev.metaKey) && ev.key === "z" && !ev.shiftKey) {
            ev.preventDefault();
            state.undo();
        }

        // Redo: Ctrl+Y or Ctrl+Shift+Z
        if ((ev.ctrlKey || ev.metaKey) && (ev.key === "y" || (ev.key === "z" && ev.shiftKey))) {
            ev.preventDefault();
            state.redo();
        }

        // Lock/Unlock: Ctrl+L
        if ((ev.ctrlKey || ev.metaKey) && ev.key.toLowerCase() === "l" && hasSelection) {
            ev.preventDefault();
            const selectedWidgets = state.getSelectedWidgets();
            const allLocked = selectedWidgets.every(w => w.locked);
            // Toggle: if all are locked, unlock them. Otherwise, lock all.
            state.updateWidgets(state.selectedWidgetIds, { locked: !allLocked });
        }
    }

    deleteWidget(widgetId) {
        const state = AppState || window.AppState;
        if (state) state.deleteWidget(widgetId);
    }

    copyWidget() {
        const state = AppState || window.AppState;
        if (state) state.copyWidget();
    }

    pasteWidget() {
        const state = AppState || window.AppState;
        if (state) state.pasteWidget();
    }
}

// Initialize globally
window.KeyboardHandler = KeyboardHandler;
