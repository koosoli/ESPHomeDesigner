import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockEmit = vi.hoisted(() => vi.fn());

vi.mock('../../js/core/events.js', () => ({
    emit: mockEmit,
    EVENTS: {
        HISTORY_CHANGED: 'HISTORY_CHANGED',
        STATE_CHANGED: 'STATE_CHANGED'
    }
}));

import { EditorStore } from '../../js/core/stores/editor_store';
import { HistoryManager } from '../../js/core/stores/app_state/history_manager.js';

function createApp(pages, deviceName = 'Layout 1') {
    const editor = new EditorStore();
    const project = {
        state: {
            pages,
            deviceName,
            widgetsById: new Map()
        },
        get pages() {
            return this.state.pages;
        },
        get deviceName() {
            return this.state.deviceName;
        },
        rebuildWidgetsIndex: vi.fn()
    };
    const app = {
        project,
        editor,
        _isRestoringHistory: false,
        setInternalFlag: vi.fn((key, value) => {
            app[key] = value;
        })
    };
    return app;
}

describe('HistoryManager', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('replaces the startup blank-page history baseline after loading a saved layout', () => {
        const startupPages = [{ id: 'page_0', name: 'Page 1', widgets: [] }];
        const app = createApp(startupPages);
        const manager = new HistoryManager(app);

        manager.recordHistory();

        const loadedPages = [
            {
                id: 'page_0',
                name: 'Status',
                widgets: [{ id: 'title', type: 'text', x: 10, y: 20, props: { text: 'Status' } }]
            },
            {
                id: 'page_1',
                name: 'Details',
                widgets: [{ id: 'detail', type: 'text', x: 5, y: 6, props: { text: 'Details' } }]
            }
        ];
        app.project.state.pages = loadedPages;
        app.project.state.deviceName = 'Loaded Layout';

        manager.replaceHistoryBaseline();
        expect(manager.canUndo()).toBe(false);

        loadedPages[0].widgets[0].x = 40;
        manager.recordHistory();
        expect(manager.canUndo()).toBe(true);

        manager.undo();

        expect(app.project.state.pages).toHaveLength(2);
        expect(app.project.state.pages[0].name).toBe('Status');
        expect(app.project.state.pages[0].widgets[0].x).toBe(10);
        expect(app.project.state.pages[1].widgets[0].id).toBe('detail');
        expect(app.project.rebuildWidgetsIndex).toHaveBeenCalledTimes(1);
    });
});
