// @ts-check
import { AppState } from './state';
import { Logger } from '../utils/logger.js';
import { quickSearchInstance } from '../ui/quick_search.js';
import { emit, EVENTS } from './events.js';

export class KeyboardHandler {
    constructor() {
        this.init();
    }

    init() {
        if (typeof globalThis.addEventListener === 'function') {
            globalThis.addEventListener("keydown", (/** @type {KeyboardEvent} */ ev) => this.handleKeyDown(ev));
        }
    }

    /**
     * @param {KeyboardEvent} ev
     */
    handleKeyDown(ev) {
        // Debug
        // Key event handling

        const state = AppState;
        if (!state) {
            Logger.error("KeyboardHandler: AppState not found!");
            return;
        }

        const hasSelection = state.selectedWidgetIds.length > 0;
        const htmlTarget = ev.target instanceof HTMLElement ? ev.target : null;
        const isEditableTarget = KeyboardHandler.isInput(htmlTarget);
        const hasNativeSelection = KeyboardHandler.hasNativeTextSelection(htmlTarget);

        // Quick Search: Shift+Space
        // Quick Search: Shift+Space
        if (ev.shiftKey && ev.code === "Space") {
            // Always trigger, even in input fields
            // Blur the current input if it's focused (e.g. YAML snippet box)
            if (htmlTarget && KeyboardHandler.isInput(htmlTarget)) {
                htmlTarget.blur();
            }

            ev.preventDefault();
            if (quickSearchInstance) {
                quickSearchInstance.open();
            }
            return;
        }

        if ((ev.key === "Delete" || ev.key === "Backspace") && hasSelection) {
            if (isEditableTarget) {
                return;
            }
            ev.preventDefault();
            this.deleteWidget(null);
            return;
        }

        // Copy: Ctrl+C
        if ((ev.ctrlKey || ev.metaKey) && ev.key && ev.key.toLowerCase() === "c") {
            if (isEditableTarget || hasNativeSelection) {
                return;
            }
            ev.preventDefault();
            this.copyWidget();
            return;
        }

        // Paste: Ctrl+V
        if ((ev.ctrlKey || ev.metaKey) && ev.key && ev.key.toLowerCase() === "v") {
            if (isEditableTarget) {
                return;
            }
            ev.preventDefault();
            this.pasteWidget();
            return;
        }

        // Undo: Ctrl+Z
        if ((ev.ctrlKey || ev.metaKey) && ev.key && ev.key.toLowerCase() === "z" && !ev.shiftKey) {
            if (isEditableTarget) {
                return;
            }
            ev.preventDefault();
            // Prevent focus stealing during undo state restoration
            state.isUndoRedoInProgress = true;
            state.undo();
            setTimeout(() => { state.isUndoRedoInProgress = false; }, 100);
            return;
        }

        // Redo: Ctrl+Y or Ctrl+Shift+Z
        if ((ev.ctrlKey || ev.metaKey) && ev.key && (ev.key.toLowerCase() === "y" || (ev.key.toLowerCase() === "z" && ev.shiftKey))) {
            if (isEditableTarget) {
                return;
            }
            ev.preventDefault();
            // Prevent focus stealing during redo state restoration
            state.isUndoRedoInProgress = true;
            state.redo();
            setTimeout(() => { state.isUndoRedoInProgress = false; }, 100);
            return;
        }

        // Lock/Unlock: Ctrl+L
        if ((ev.ctrlKey || ev.metaKey) && ev.key && ev.key.toLowerCase() === "l" && hasSelection) {
            ev.preventDefault();
            const selectedWidgets = state.getSelectedWidgets();
            const allLocked = selectedWidgets.every((/** @type {{ locked?: boolean }} */ w) => w.locked);
            // Toggle: if all are locked, unlock them. Otherwise, lock all.
            state.updateWidgets(state.selectedWidgetIds, { locked: !allLocked });
        }

        // Select All: Ctrl+A
        if ((ev.ctrlKey || ev.metaKey) && ev.key && ev.key.toLowerCase() === "a") {
            if (ev.target instanceof HTMLElement && !KeyboardHandler.isInput(ev.target) && !hasNativeSelection) {
                ev.preventDefault();
                state.selectAllWidgets();
                return;
            }
        }

        // Toggle Grid: G (if not typing)
        if (ev.key && ev.key.toLowerCase() === "g" && !ev.ctrlKey && !ev.metaKey && !ev.shiftKey && !ev.altKey) {
            if (ev.target instanceof HTMLElement && (ev.target.tagName !== "INPUT" && ev.target.tagName !== "TEXTAREA")) {
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
            if (ev.target instanceof HTMLElement && ev.target.tagName !== "INPUT" && ev.target.tagName !== "TEXTAREA") {
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
            if (ev.target instanceof HTMLElement && ev.target.tagName !== "INPUT" && ev.target.tagName !== "TEXTAREA") {
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
            if (document.activeElement instanceof HTMLElement && (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA")) {
                document.activeElement.blur();
            }
            if (state.selectedWidgetIds.length > 0) {
                state.selectWidgets([]);
                emit(EVENTS.STATE_CHANGED);
            }
        }
    }

    // Add interaction detection for inputs
    /** @param {unknown} el */
    static isInput(el) {
        return !!(el instanceof HTMLElement && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable));
    }

    /**
     * @param {HTMLElement | null} target
     * @returns {boolean}
     */
    static hasNativeTextSelection(target) {
        if (target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement) {
            const start = target.selectionStart ?? 0;
            const end = target.selectionEnd ?? 0;
            return end > start;
        }

        try {
            const selection = globalThis.getSelection?.();
            return !!selection && !selection.isCollapsed && selection.toString().trim().length > 0;
        } catch {
            return false;
        }
    }

    /** @param {any} widgetId */
    deleteWidget(widgetId) {
        const state = AppState;
        if (state) state.deleteWidget(widgetId);
    }

    copyWidget() {
        const state = AppState;
        if (state) state.copyWidget();
    }

    pasteWidget() {
        const state = AppState;
        if (state) state.pasteWidget();
    }
}
