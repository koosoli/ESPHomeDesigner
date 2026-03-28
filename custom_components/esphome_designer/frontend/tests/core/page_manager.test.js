import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockEmit = vi.hoisted(() => vi.fn());

vi.mock('../../js/core/events.js', () => ({
    emit: mockEmit,
    EVENTS: {
        STATE_CHANGED: 'STATE_CHANGED'
    }
}));

import { PageManager } from '../../js/core/stores/app_state/page_manager.js';

function createApp(clearResult = { deleted: 0 }) {
    return {
        project: {
            reorderWidget: vi.fn(),
            setCurrentPageIndex: vi.fn(),
            reorderPage: vi.fn(),
            addPage: vi.fn((index) => ({ name: `Page ${index ?? 0}` })),
            deletePage: vi.fn(),
            duplicatePage: vi.fn(() => ({ name: 'Copy' })),
            renamePage: vi.fn(),
            clearCurrentPage: vi.fn(() => clearResult)
        },
        editor: {
            setSelectedWidgetIds: vi.fn()
        },
        widgetManager: {
            syncWidgetOrderWithHierarchy: vi.fn()
        },
        recordHistory: vi.fn()
    };
}

describe('PageManager', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('reorders widgets and changes the current page while clearing selection', () => {
        const app = createApp();
        const manager = new PageManager(app);

        manager.reorderWidget(1, 2, 4);
        expect(app.project.reorderWidget).toHaveBeenCalledWith(1, 2, 4);
        expect(app.widgetManager.syncWidgetOrderWithHierarchy).toHaveBeenCalledTimes(1);
        expect(app.recordHistory).toHaveBeenCalledTimes(1);
        expect(mockEmit).toHaveBeenCalledWith('STATE_CHANGED');

        mockEmit.mockClear();
        app.recordHistory.mockClear();

        manager.setCurrentPageIndex(3, { suppressFocus: true });
        expect(app.project.setCurrentPageIndex).toHaveBeenCalledWith(3, { suppressFocus: true });
        expect(app.editor.setSelectedWidgetIds).toHaveBeenCalledWith([]);
        expect(app.recordHistory).not.toHaveBeenCalled();
        expect(mockEmit).toHaveBeenCalledWith('STATE_CHANGED');
    });

    it('delegates page CRUD actions and records history for each mutation', () => {
        const app = createApp();
        const manager = new PageManager(app);

        expect(manager.addPage(2)).toEqual({ name: 'Page 2' });
        manager.reorderPage(0, 1);
        manager.deletePage(1);
        expect(manager.duplicatePage(0)).toEqual({ name: 'Copy' });
        manager.renamePage(0, 'Dashboard');

        expect(app.project.addPage).toHaveBeenCalledWith(2);
        expect(app.project.reorderPage).toHaveBeenCalledWith(0, 1);
        expect(app.project.deletePage).toHaveBeenCalledWith(1);
        expect(app.project.duplicatePage).toHaveBeenCalledWith(0);
        expect(app.project.renamePage).toHaveBeenCalledWith(0, 'Dashboard');
        expect(app.recordHistory).toHaveBeenCalledTimes(5);
        expect(mockEmit).not.toHaveBeenCalled();
    });

    it('clears the current page only records and emits when widgets were actually deleted', () => {
        const deletedApp = createApp({ deleted: 2 });
        const deletedManager = new PageManager(deletedApp);

        expect(deletedManager.clearCurrentPage(true)).toEqual({ deleted: 2 });
        expect(deletedApp.project.clearCurrentPage).toHaveBeenCalledWith(true);
        expect(deletedApp.editor.setSelectedWidgetIds).toHaveBeenCalledWith([]);
        expect(deletedApp.recordHistory).toHaveBeenCalledTimes(1);
        expect(mockEmit).toHaveBeenCalledWith('STATE_CHANGED');

        vi.clearAllMocks();

        const emptyApp = createApp({ deleted: 0 });
        const emptyManager = new PageManager(emptyApp);
        expect(emptyManager.clearCurrentPage(false)).toEqual({ deleted: 0 });
        expect(emptyApp.editor.setSelectedWidgetIds).not.toHaveBeenCalled();
        expect(emptyApp.recordHistory).not.toHaveBeenCalled();
        expect(mockEmit).not.toHaveBeenCalled();
    });
});
