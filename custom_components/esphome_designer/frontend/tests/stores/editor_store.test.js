import { describe, it, expect, beforeEach, vi } from 'vitest';
import { EditorStore } from '../../js/core/stores/editor_store.js';

describe('EditorStore', () => {
    let store;

    beforeEach(() => {
        store = new EditorStore();
    });

    describe('Selection', () => {
        it('should select a single widget', () => {
            store.selectWidget('w1');
            expect(store.selectedWidgetIds).toEqual(['w1']);
        });

        it('should toggle selection in multi-mode', () => {
            store.selectWidget('w1', true);
            expect(store.selectedWidgetIds).toEqual(['w1']);
            store.selectWidget('w1', true);
            expect(store.selectedWidgetIds).toEqual([]);
        });
    });

    describe('Zoom', () => {
        it('should clamp zoom level between 0.05 and 5.0', () => {
            store.setZoomLevel(0.01);
            expect(store.zoomLevel).toBe(0.05);
            store.setZoomLevel(10.0);
            expect(store.zoomLevel).toBe(5.0);
            store.setZoomLevel(1.5);
            expect(store.zoomLevel).toBe(1.5);
        });
    });

    describe('History (Undo/Redo)', () => {
        it('should record history snapshots', () => {
            const state1 = { pages: [], deviceName: 'D1' };
            store.recordHistory(state1);
            expect(store.canUndo()).toBe(false); // First recording is base state

            const state2 = { pages: [{ id: 1 }], deviceName: 'D2' };
            store.recordHistory(state2);
            expect(store.canUndo()).toBe(true);
            expect(store.canRedo()).toBe(false);
        });

        it('should not record duplicate consecutive states', () => {
            const state = { pages: [], deviceName: 'D1' };
            store.recordHistory(state);
            store.recordHistory(state);
            expect(store.historyStack.length).toBe(1);
        });

        it('should undo and redo correctly', () => {
            const s1 = { pages: [], deviceName: 'S1' };
            const s2 = { pages: [], deviceName: 'S2' };

            store.recordHistory(s1);
            store.recordHistory(s2);

            expect(store.undo()).toEqual(s1);
            expect(store.canRedo()).toBe(true);
            expect(store.redo()).toEqual(s2);
        });

        it('should truncate future on new change after undo', () => {
            store.recordHistory({ n: 1 });
            store.recordHistory({ n: 2 });
            store.undo();
            store.recordHistory({ n: 3 });

            expect(store.canRedo()).toBe(false);
            expect(store.historyStack.length).toBe(2);
            expect(store.historyStack[1]).toEqual({ n: 3 });
        });
    });
});
