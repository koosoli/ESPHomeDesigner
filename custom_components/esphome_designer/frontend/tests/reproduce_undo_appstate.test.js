
import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { EditorStore } from '../js/core/stores/editor_store.js';

// Minimal mock of AppStateFacade logic regarding history
// We can't import AppStateFacade directly because it relies on global state/DOM often.
// So we replicate the logic we want to test: undo() -> restore -> recordHistory(guard).

class MockAppState {
    constructor() {
        this.editor = new EditorStore();
        this.project = {
            pages: [],
            deviceName: 'TestDevice',
            rebuildWidgetsIndex: vi.fn(),
            state: { pages: [], deviceName: '' }
        };
        this._isRestoringHistory = false;

        // Mock event emitter
        this.listeners = {};
    }

    on(event, callback) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(callback);
    }

    emit(event) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(cb => cb());
        }
    }

    // METHOD UNDER TEST
    recordHistory() {
        // Skip recording if we're in the middle of restoring history (undo/redo)
        if (this._isRestoringHistory) {
            console.log("Skipping recordHistory because _isRestoringHistory is TRUE");
            return;
        }
        console.log("Recording history...");
        this.editor.recordHistory({
            pages: JSON.parse(JSON.stringify(this.project.pages)), // Deep copy simulation
            deviceName: this.project.deviceName
        });
    }

    // METHOD UNDER TEST
    undo() {
        const s = this.editor.undo();
        if (s) {
            console.log("Undo successful, restoring snapshot...");
            this._isRestoringHistory = true;
            this.restoreSnapshot(s);
            // Use setTimeout to ensure flag is cleared after all sync listeners run
            setTimeout(() => {
                console.log("Clearing _isRestoringHistory flag");
                this._isRestoringHistory = false;
            }, 0);
        } else {
            console.log("Undo failed (nothing to undo)");
        }
    }

    restoreSnapshot(s) {
        this.project.state.pages = s.pages;
        this.project.state.deviceName = s.deviceName;
        this.project.rebuildWidgetsIndex();

        // Emulating the side effect: unexpected recordHistory call triggered by state change
        this.emit('STATE_CHANGED');
    }
}

describe('AppState Undo Regression Reproduction', () => {
    let app;

    beforeEach(() => {
        vi.useFakeTimers();
        app = new MockAppState();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('should allow multiple consecutive undos without corruption', () => {
        // 1. Initial State
        app.project.pages = [{ id: 'init' }];
        app.recordHistory();
        // Stack: [Init]

        // 2. Add State A
        app.project.pages = [{ id: 'A' }];
        app.recordHistory();
        // Stack: [Init, A], Index: 1

        // 3. Add State B
        app.project.pages = [{ id: 'B' }];
        app.recordHistory();
        // Stack: [Init, A, B], Index: 2

        expect(app.editor.canUndo()).toBe(true);

        // 4. Register a listener that NAUGHTILY calls recordHistory on change
        // This simulates the regression where some component reacts to undo by trying to save
        app.on('STATE_CHANGED', () => {
            console.log("Listener triggered: calling recordHistory (should be blocked)");
            // Simulate a slightly different state or same state
            app.recordHistory();
        });

        // 5. First Undo (Should go to A)
        console.log("--- First Undo ---");
        app.undo();

        // Execute sync logic (restoreSnapshot -> emit -> recordHistory call)
        // Guard should block recordHistory here.

        // Run timers to clear the flag
        vi.runAllTimers();

        // Check if history is still intact
        // Stack should be: [Init, A, B], Index: 1 (pointing to A)
        // If truncated, it might be [Init, A, NewState] or [Init, A]

        expect(app.editor.historyStack.length).toBe(3);
        expect(app.editor.historyIndex).toBe(1);

        // 6. Second Undo (Should go to Init)
        console.log("--- Second Undo ---");
        const canUndoAgain = app.editor.canUndo();
        expect(canUndoAgain).toBe(true); // Fails here if history was corrupted/truncated

        app.undo();
        vi.runAllTimers();

        expect(app.editor.historyIndex).toBe(0);
    });
});
