import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HistoryManager } from '../../js/core/stores/app_state/history_manager.js';
import { emit } from '../../js/core/events.js';

vi.mock('../../js/core/events.js', () => ({
    emit: vi.fn(),
    EVENTS: {
        STATE_CHANGED: 'state-changed'
    }
}));

describe('HistoryManager', () => {
    let hm;
    let mockApp;

    beforeEach(() => {
        mockApp = {
            _isRestoringHistory: false,
            project: {
                state: {
                    pages: [],
                    deviceName: 'initial'
                },
                get pages() { return this.state.pages; },
                get deviceName() { return this.state.deviceName; },
                rebuildWidgetsIndex: vi.fn()
            },
            editor: {
                recordHistory: vi.fn(),
                undo: vi.fn(),
                redo: vi.fn(),
                canUndo: vi.fn(),
                canRedo: vi.fn()
            },
            setInternalFlag: vi.fn((key, val) => { mockApp[key] = val; })
        };
        hm = new HistoryManager(mockApp);
        vi.clearAllMocks();
    });

    it('should record history when not restoring', () => {
        mockApp.project.state.pages = [{ id: 'p1' }];
        mockApp.project.state.deviceName = 'esp-device';

        hm.recordHistory();

        expect(mockApp.editor.recordHistory).toHaveBeenCalledWith({
            pages: [{ id: 'p1' }],
            deviceName: 'esp-device'
        });
    });

    it('should skip recording history when _isRestoringHistory is true', () => {
        mockApp._isRestoringHistory = true;
        hm.recordHistory();
        expect(mockApp.editor.recordHistory).not.toHaveBeenCalled();
    });

    it('should restore snapshot with deep clone', () => {
        const snapshot = {
            pages: [{ id: 'p1', widgets: [{ id: 'w1' }] }],
            deviceName: 'restored'
        };

        hm.restoreSnapshot(snapshot);

        expect(mockApp.project.state.deviceName).toBe('restored');
        expect(mockApp.project.state.pages).toEqual(snapshot.pages);

        // Ensure deep clone (Technical Reasoning: verify reference break)
        expect(mockApp.project.state.pages).not.toBe(snapshot.pages);
        expect(mockApp.project.state.pages[0]).not.toBe(snapshot.pages[0]);

        expect(mockApp.project.rebuildWidgetsIndex).toHaveBeenCalled();
        expect(emit).toHaveBeenCalledWith('state-changed');
    });

    it('should handle undo cycle with async flag reset', async () => {
        vi.useFakeTimers();
        const snapshot = { pages: [], deviceName: 'prev' };
        mockApp.editor.undo.mockReturnValue(snapshot);

        hm.undo();

        expect(mockApp.setInternalFlag).toHaveBeenCalledWith('_isRestoringHistory', true);
        expect(mockApp.project.state.deviceName).toBe('prev');

        // Fast forward to check async reset
        vi.runAllTimers();
        expect(mockApp.setInternalFlag).toHaveBeenCalledWith('_isRestoringHistory', false);

        vi.useRealTimers();
    });

    it('should handle redo cycle with async flag reset', () => {
        vi.useFakeTimers();
        const snapshot = { pages: [], deviceName: 'next' };
        mockApp.editor.redo.mockReturnValue(snapshot);

        hm.redo();

        expect(mockApp.setInternalFlag).toHaveBeenCalledWith('_isRestoringHistory', true);
        expect(mockApp.project.state.deviceName).toBe('next');

        vi.runAllTimers();
        expect(mockApp.setInternalFlag).toHaveBeenCalledWith('_isRestoringHistory', false);

        vi.useRealTimers();
    });

    it('should proxy canUndo and canRedo', () => {
        mockApp.editor.canUndo.mockReturnValue(true);
        mockApp.editor.canRedo.mockReturnValue(false);

        expect(hm.canUndo()).toBe(true);
        expect(hm.canRedo()).toBe(false);
    });
});
