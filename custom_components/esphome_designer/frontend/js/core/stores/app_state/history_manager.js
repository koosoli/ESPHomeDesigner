import { emit, EVENTS } from '../../events.js';

export class HistoryManager {
    /**
     * @param {any} app
     */
    constructor(app) {
        this.app = app;
    }

    recordHistory() {
        // Skip recording if we're in the middle of restoring history (undo/redo)
        const appAny = /** @type {any} */ (this.app);
        if (appAny._isRestoringHistory) {
            return;
        }
        this.app.editor.recordHistory({
            pages: this.app.project.pages,
            deviceName: this.app.project.deviceName
        });
    }

    undo() {
        const s = this.app.editor.undo();
        if (s) {
            this.app.setInternalFlag('_isRestoringHistory', true);
            this.restoreSnapshot(s);
            setTimeout(() => { this.app.setInternalFlag('_isRestoringHistory', false); }, 0);
        }
    }

    redo() {
        const s = this.app.editor.redo();
        if (s) {
            this.app.setInternalFlag('_isRestoringHistory', true);
            this.restoreSnapshot(s);
            setTimeout(() => { this.app.setInternalFlag('_isRestoringHistory', false); }, 0);
        }
    }

    /** @param {any} s */
    restoreSnapshot(s) {
        // CRITICAL: Deep clone to prevent mutating the history stack object
        this.app.project.state.pages = JSON.parse(JSON.stringify(s.pages));
        this.app.project.state.deviceName = s.deviceName;
        this.app.project.rebuildWidgetsIndex();
        emit(EVENTS.STATE_CHANGED);
    }

    canUndo() { return this.app.editor.canUndo(); }
    canRedo() { return this.app.editor.canRedo(); }
}
