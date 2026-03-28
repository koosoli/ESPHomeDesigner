import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockEmit, mockGenerateId } = vi.hoisted(() => ({
    mockEmit: vi.fn(),
    mockGenerateId: vi.fn(() => 'generated-id')
}));

vi.mock('../../js/core/events.js', () => ({
    emit: mockEmit,
    EVENTS: {
        STATE_CHANGED: 'STATE_CHANGED'
    }
}));

vi.mock('../../js/utils/helpers.js', () => ({
    generateId: mockGenerateId
}));

import { SelectionManager } from '../../js/core/stores/app_state/selection_manager.js';

function createApp(initialWidgets) {
    const page = {
        widgets: initialWidgets.map((widget) => ({
            props: {},
            ...widget
        }))
    };

    const indexWidgets = () => new Map(page.widgets.map((widget) => [widget.id, widget]));
    let widgetIndex = indexWidgets();

    const app = {
        editor: {
            selectedWidgetIds: [],
            selectWidget: vi.fn((id, multi = false) => {
                if (!id) {
                    app.editor.selectedWidgetIds = [];
                    return;
                }

                if (multi) {
                    if (app.editor.selectedWidgetIds.includes(id)) {
                        app.editor.selectedWidgetIds = app.editor.selectedWidgetIds.filter((widgetId) => widgetId !== id);
                    } else {
                        app.editor.selectedWidgetIds = [...app.editor.selectedWidgetIds, id];
                    }
                    return;
                }

                app.editor.selectedWidgetIds = [id];
            }),
            setSelectedWidgetIds: vi.fn((ids) => {
                app.editor.selectedWidgetIds = ids;
            })
        },
        getWidgetById: vi.fn((id) => widgetIndex.get(id)),
        getCurrentPage: vi.fn(() => page),
        getSelectedWidgets: vi.fn(() => app.editor.selectedWidgetIds.map((id) => widgetIndex.get(id)).filter(Boolean)),
        project: {
            addWidget: vi.fn((widget) => {
                page.widgets.push({ props: {}, ...widget });
                widgetIndex = indexWidgets();
            }),
            updateWidget: vi.fn((id, updates) => {
                const widget = widgetIndex.get(id);
                Object.assign(widget, updates);
            }),
            deleteWidgets: vi.fn((ids) => {
                page.widgets = page.widgets.filter((widget) => !ids.includes(widget.id));
                widgetIndex = indexWidgets();
            })
        },
        syncWidgetOrderWithHierarchy: vi.fn(),
        recordHistory: vi.fn()
    };

    return { app, page };
}

describe('SelectionManager', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('selects groups, toggles grouped membership, and supports select-all helpers', () => {
        const { app } = createApp([
            { id: 'group_1', type: 'group', x: 0, y: 0, width: 80, height: 60 },
            { id: 'child_1', type: 'text', parentId: 'group_1', x: 5, y: 10, width: 20, height: 10 },
            { id: 'child_2', type: 'text', parentId: 'group_1', x: 35, y: 25, width: 20, height: 10 },
            { id: 'text_1', type: 'text', x: 90, y: 0, width: 30, height: 10 }
        ]);
        const manager = new SelectionManager(app);

        manager.selectAllWidgets();
        expect(app.editor.selectedWidgetIds).toEqual(['group_1', 'child_1', 'child_2', 'text_1']);

        manager.deselectAll();
        expect(app.editor.selectedWidgetIds).toEqual([]);

        manager.selectWidget('group_1');
        expect(app.editor.selectedWidgetIds).toEqual(['group_1', 'child_1', 'child_2']);

        app.editor.selectedWidgetIds = ['text_1'];
        manager.toggleSelection('group_1');
        expect(app.editor.selectedWidgetIds).toEqual(['text_1', 'group_1', 'child_1', 'child_2']);
        expect(manager.isWidgetSelected('child_1')).toBe(true);

        manager.toggleSelection('group_1');
        expect(app.editor.selectedWidgetIds).toEqual(['text_1']);

        manager.selectWidget(null);
        manager.selectWidget('text_1');

        expect(app.editor.selectWidget).toHaveBeenCalledWith(null, false);
        expect(app.editor.selectWidget).toHaveBeenCalledWith('text_1', false);
    });

    it('groups and ungroups widgets while syncing hierarchy, history, and emitted state', () => {
        const { app, page } = createApp([
            { id: 'alpha', type: 'text', x: 5, y: 10, width: 20, height: 10 },
            { id: 'beta', type: 'text', x: 40, y: 20, width: 25, height: 25 }
        ]);
        const manager = new SelectionManager(app);

        app.editor.selectedWidgetIds = ['alpha', 'beta'];
        manager.groupSelection();

        expect(app.project.addWidget).toHaveBeenCalledWith(expect.objectContaining({
            id: 'group_generated-id',
            type: 'group',
            x: 5,
            y: 10,
            width: 60,
            height: 35
        }));
        expect(app.project.updateWidget).toHaveBeenCalledWith('alpha', { parentId: 'group_generated-id' });
        expect(app.project.updateWidget).toHaveBeenCalledWith('beta', { parentId: 'group_generated-id' });
        expect(app.editor.selectedWidgetIds).toEqual(['group_generated-id', 'alpha', 'beta']);
        expect(app.syncWidgetOrderWithHierarchy).toHaveBeenCalledTimes(1);
        expect(app.recordHistory).toHaveBeenCalledTimes(1);
        expect(mockEmit).toHaveBeenCalledWith('STATE_CHANGED');
        expect(page.widgets.find((widget) => widget.id === 'group_generated-id')).toBeTruthy();

        mockEmit.mockClear();
        app.project.updateWidget.mockClear();
        app.project.deleteWidgets.mockClear();
        app.recordHistory.mockClear();
        app.syncWidgetOrderWithHierarchy.mockClear();

        manager.ungroupSelection();

        expect(app.project.updateWidget).toHaveBeenCalledWith('alpha', { parentId: null });
        expect(app.project.updateWidget).toHaveBeenCalledWith('beta', { parentId: null });
        expect(app.project.deleteWidgets).toHaveBeenCalledWith(['group_generated-id']);
        expect(app.editor.selectedWidgetIds).toEqual(['alpha', 'beta']);
        expect(page.widgets.find((widget) => widget.id === 'group_generated-id')).toBeUndefined();
        expect(app.syncWidgetOrderWithHierarchy).toHaveBeenCalledTimes(1);
        expect(app.recordHistory).toHaveBeenCalledTimes(1);
        expect(mockEmit).toHaveBeenCalledWith('STATE_CHANGED');
    });

    it('skips grouping and layout operations when the selection is not actionable', () => {
        const { app } = createApp([
            { id: 'group_1', type: 'group', x: 0, y: 0, width: 20, height: 20 },
            { id: 'child_1', type: 'text', parentId: 'group_1', x: 5, y: 5, width: 10, height: 10 },
            { id: 'solo', type: 'text', x: 40, y: 40, width: 20, height: 10 }
        ]);
        const manager = new SelectionManager(app);

        app.editor.selectedWidgetIds = ['solo'];
        manager.groupSelection();
        manager.alignSelectedWidgets('left');
        manager.distributeSelectedWidgets('horizontal');

        app.editor.selectedWidgetIds = ['group_1', 'child_1'];
        manager.groupSelection();

        expect(app.project.addWidget).not.toHaveBeenCalled();
        expect(app.project.updateWidget).not.toHaveBeenCalled();
        expect(app.recordHistory).not.toHaveBeenCalled();
        expect(mockEmit).not.toHaveBeenCalled();
    });

    it('aligns selections in every supported direction', () => {
        const baseWidgets = [
            { id: 'a', type: 'text', x: 10, y: 10, width: 20, height: 10 },
            { id: 'b', type: 'text', x: 30, y: 25, width: 25, height: 20 },
            { id: 'c', type: 'text', x: 50, y: 45, width: 15, height: 30 }
        ];
        const expectations = {
            left: [
                ['a', { x: 10 }],
                ['b', { x: 10 }],
                ['c', { x: 10 }]
            ],
            center: [
                ['a', { x: 27.5 }],
                ['b', { x: 25 }],
                ['c', { x: 30 }]
            ],
            right: [
                ['a', { x: 45 }],
                ['b', { x: 40 }],
                ['c', { x: 50 }]
            ],
            top: [
                ['a', { y: 10 }],
                ['b', { y: 10 }],
                ['c', { y: 10 }]
            ],
            middle: [
                ['a', { y: 37.5 }],
                ['b', { y: 32.5 }],
                ['c', { y: 27.5 }]
            ],
            bottom: [
                ['a', { y: 65 }],
                ['b', { y: 55 }],
                ['c', { y: 45 }]
            ]
        };

        for (const [direction, expectedCalls] of Object.entries(expectations)) {
            const { app } = createApp(baseWidgets);
            const manager = new SelectionManager(app);

            app.editor.selectedWidgetIds = ['a', 'b', 'c'];
            mockEmit.mockClear();
            manager.alignSelectedWidgets(direction);

            expect(app.project.updateWidget.mock.calls).toEqual(expectedCalls);
            expect(app.recordHistory).toHaveBeenCalledTimes(1);
            expect(mockEmit).toHaveBeenCalledWith('STATE_CHANGED');
        }
    });

    it('distributes selected widgets horizontally and vertically', () => {
        const { app } = createApp([
            { id: 'a', type: 'text', x: 10, y: 10, width: 10, height: 10 },
            { id: 'b', type: 'text', x: 35, y: 35, width: 20, height: 15 },
            { id: 'c', type: 'text', x: 80, y: 90, width: 15, height: 10 }
        ]);
        const manager = new SelectionManager(app);

        app.editor.selectedWidgetIds = ['a', 'b', 'c'];
        manager.distributeSelectedWidgets('horizontal');
        expect(app.project.updateWidget).toHaveBeenCalledWith('b', { x: 40 });
        expect(app.recordHistory).toHaveBeenCalledTimes(1);
        expect(mockEmit).toHaveBeenCalledWith('STATE_CHANGED');

        app.project.updateWidget.mockClear();
        app.recordHistory.mockClear();
        mockEmit.mockClear();

        manager.distributeSelectedWidgets('vertical');
        expect(app.project.updateWidget).toHaveBeenCalledWith('b', { y: 47.5 });
        expect(app.recordHistory).toHaveBeenCalledTimes(1);
        expect(mockEmit).toHaveBeenCalledWith('STATE_CHANGED');
    });
});
