import { AppState } from './state.js';
import { Logger } from '../utils/logger.js';
import { emit, EVENTS } from './events.js';

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
        if ((ev.ctrlKey || ev.metaKey) && ev.key && ev.key.toLowerCase() === "c") {
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
            return;
        }

        // Paste: Ctrl+V
        if ((ev.ctrlKey || ev.metaKey) && ev.key && ev.key.toLowerCase() === "v") {
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
            return;
        }

        // Undo: Ctrl+Z
        if ((ev.ctrlKey || ev.metaKey) && ev.key && ev.key.toLowerCase() === "z" && !ev.shiftKey) {
            if (ev.target.tagName === "INPUT" || ev.target.tagName === "TEXTAREA") {
                // Allow global undo when snippetBox has auto-highlighted text
                if (ev.target.id === "snippetBox" && isAutoHighlight) {
                    ev.preventDefault();
                    // Prevent focus stealing during undo state restoration
                    window._undoRedoInProgress = true;
                    state.undo();
                    setTimeout(() => { window._undoRedoInProgress = false; }, 100);
                    return;
                }
                return;
            }
            ev.preventDefault();
            // Prevent focus stealing during undo state restoration
            window._undoRedoInProgress = true;
            state.undo();
            setTimeout(() => { window._undoRedoInProgress = false; }, 100);
            return;
        }

        // Redo: Ctrl+Y or Ctrl+Shift+Z
        if ((ev.ctrlKey || ev.metaKey) && ev.key && (ev.key.toLowerCase() === "y" || (ev.key.toLowerCase() === "z" && ev.shiftKey))) {
            if (ev.target.tagName === "INPUT" || ev.target.tagName === "TEXTAREA") {
                // Allow global redo when snippetBox has auto-highlighted text
                if (ev.target.id === "snippetBox" && isAutoHighlight) {
                    ev.preventDefault();
                    // Prevent focus stealing during redo state restoration
                    window._undoRedoInProgress = true;
                    state.redo();
                    setTimeout(() => { window._undoRedoInProgress = false; }, 100);
                    return;
                }
                return;
            }
            ev.preventDefault();
            // Prevent focus stealing during redo state restoration
            window._undoRedoInProgress = true;
            state.redo();
            setTimeout(() => { window._undoRedoInProgress = false; }, 100);
            return;
        }

        // Lock/Unlock: Ctrl+L
        if ((ev.ctrlKey || ev.metaKey) && ev.key && ev.key.toLowerCase() === "l" && hasSelection) {
            ev.preventDefault();
            const selectedWidgets = state.getSelectedWidgets();
            const allLocked = selectedWidgets.every(w => w.locked);
            // Toggle: if all are locked, unlock them. Otherwise, lock all.
            state.updateWidgets(state.selectedWidgetIds, { locked: !allLocked });
        }

        // Select All: Ctrl+A
        if ((ev.ctrlKey || ev.metaKey) && ev.key && ev.key.toLowerCase() === "a") {
            const isSnippetAuto = ev.target.id === "snippetBox" && isAutoHighlight;
            if ((ev.target.tagName !== "INPUT" && ev.target.tagName !== "TEXTAREA") || isSnippetAuto) {
                ev.preventDefault();
                state.selectAllWidgets();
                return;
            }
        }

        // Toggle Grid: G (if not typing)
        if (ev.key && ev.key.toLowerCase() === "g" && !ev.ctrlKey && !ev.metaKey && !ev.shiftKey && !ev.altKey) {
            if (ev.target.tagName !== "INPUT" && ev.target.tagName !== "TEXTAREA") {
                ev.preventDefault();
                const newState = !state.showGrid;
                state.setShowGrid(newState);

                // Exclusive logic
                if (newState) {
                    state.setShowDebugGrid(false);
                    const debugBtn = document.getElementById("debugGridToggleBtn");
                    if (debugBtn) debugBtn.classList.remove("active");
                }

                // Sync UI button state if exists
                const btn = document.getElementById("gridToggleBtn");
                if (btn) btn.classList.toggle("active", newState);

                emit(EVENTS.STATE_CHANGED);
                Logger.log(`[Keyboard] Grid toggled: ${newState}`);
                return;
            }
        }

        // Toggle Debug: D (if not typing)
        if (ev.key && ev.key.toLowerCase() === "d" && !ev.ctrlKey && !ev.metaKey && !ev.shiftKey && !ev.altKey) {
            if (ev.target.tagName !== "INPUT" && ev.target.tagName !== "TEXTAREA") {
                ev.preventDefault();
                const newState = !state.showDebugGrid;
                state.setShowDebugGrid(newState);

                // Exclusive logic
                if (newState) {
                    state.setShowGrid(false);
                    const gridBtn = document.getElementById("gridToggleBtn");
                    if (gridBtn) gridBtn.classList.remove("active");
                }

                // Sync UI button state if exists
                const btn = document.getElementById("debugGridToggleBtn");
                if (btn) btn.classList.toggle("active", newState);

                emit(EVENTS.STATE_CHANGED);
                Logger.log(`[Keyboard] Debug mode toggled: ${newState}`);
                return;
            }
        }

        // Toggle Rulers: R (if not typing)
        if (ev.key && ev.key.toLowerCase() === "r" && !ev.ctrlKey && !ev.metaKey && !ev.shiftKey && !ev.altKey) {
            if (ev.target.tagName !== "INPUT" && ev.target.tagName !== "TEXTAREA") {
                ev.preventDefault();
                const newState = !state.showRulers;
                state.setShowRulers(newState);
                // Sync UI button state if exists
                const btn = document.getElementById("rulersToggleBtn");
                if (btn) btn.classList.toggle("active", newState);
                Logger.log(`[Keyboard] Rulers toggled: ${newState}`);
                return;
            }
        }

        // Deselect / Escape: Escape key
        if (ev.key === "Escape") {
            if (document.activeElement && (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA")) {
                document.activeElement.blur();
            }
            if (state.selectedWidgetIds.length > 0) {
                state.selectWidgets([]);
                emit(EVENTS.STATE_CHANGED);
            }
        }
    }

    // Add interaction detection for inputs
    static isInput(el) {
        return el.tagName === "INPUT" || el.tagName === "TEXTAREA";
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
