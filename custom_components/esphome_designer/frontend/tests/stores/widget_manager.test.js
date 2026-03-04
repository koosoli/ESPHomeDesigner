import { describe, it, expect, vi, beforeEach } from 'vitest';
import { WidgetManager } from '../../js/core/stores/app_state/widget_manager.js';
import { emit } from '../../js/core/events.js';

// Deep-Mocking infrastructure for ULTRATHINK compliance
vi.mock('../../js/core/events.js', () => ({
    emit: vi.fn(),
    EVENTS: {
        STATE_CHANGED: 'state-changed',
        PAGE_CHANGED: 'page-changed'
    }
}));

vi.mock('../../../utils/logger.js', () => ({
    Logger: {
        log: vi.fn(),
        warn: vi.fn(),
        error: vi.fn()
    }
}));

vi.mock('../../../utils/dom.js', () => ({
    showToast: vi.fn()
}));

vi.mock('../../js/core/plugin_registry', () => ({
    registry: {
        get: vi.fn()
    }
}));

describe('WidgetManager', () => {
    let wm;
    let mockApp;

    beforeEach(() => {
        mockApp = {
            project: {
                state: { customHardware: {} },
                addWidget: vi.fn(),
                updateWidget: vi.fn(),
                deleteWidget: vi.fn(),
                deleteWidgets: vi.fn(),
                pages: [{ widgets: [] }],
                rebuildWidgetsIndex: vi.fn()
            },
            recordHistory: vi.fn(),
            selectWidget: vi.fn(),
            updateSettings: vi.fn(),
            getWidgetById: vi.fn(),
            currentPageIndex: 0,
            pages: [{ widgets: [] }],
            preferences: {
                state: { renderingMode: 'direct' }
            },
            setInternalFlag: vi.fn(),
            editor: {
                selectedWidgetIds: new Set(),
                setSelectedWidgetIds: vi.fn()
            }
        };
        wm = new WidgetManager(mockApp);
        vi.clearAllMocks();
    });

    it('should set custom hardware', () => {
        const config = { name: 'esp32' };
        wm.setCustomHardware(config);
        expect(mockApp.project.state.customHardware).toBe(config);
        expect(emit).toHaveBeenCalledWith('state-changed');
    });

    it('should add a widget and check rendering mode', () => {
        const widget = { id: 'w1', type: 'lvgl_button' };
        wm.addWidget(widget);

        // Verify auto-mode switch (Technical logic: LVGL widget added in direct mode)
        expect(mockApp.updateSettings).toHaveBeenCalledWith({ renderingMode: 'lvgl' });
        expect(mockApp.project.addWidget).toHaveBeenCalledWith(widget, null);
        expect(mockApp.recordHistory).toHaveBeenCalled();
        expect(mockApp.selectWidget).toHaveBeenCalledWith('w1');
        expect(emit).toHaveBeenCalledWith('state-changed');
    });

    it('should update a widget and sync hierarchy if parentId changes', () => {
        const id = 'w1';
        const updates = { parentId: 'new-parent' };
        mockApp.getWidgetById.mockReturnValue({ id, type: 'text' });

        // Mock internal sync method
        const syncSpy = vi.spyOn(wm, 'syncWidgetOrderWithHierarchy').mockImplementation(() => { });

        wm.updateWidget(id, updates);

        expect(mockApp.project.updateWidget).toHaveBeenCalledWith(id, updates);
        expect(syncSpy).toHaveBeenCalled();
        expect(emit).toHaveBeenCalledWith('state-changed');
    });

    it('should propagate updates to children if widget is a group', () => {
        const groupId = 'g1';
        const childId = 'c1';
        const updates = { locked: true };

        mockApp.getWidgetById.mockImplementation((id) => {
            if (id === groupId) return { id: groupId, type: 'group' };
            if (id === childId) return { id: childId, type: 'text', parentId: groupId };
            return null;
        });

        mockApp.pages[0].widgets = [
            { id: groupId, type: 'group' },
            { id: childId, type: 'text', parentId: groupId }
        ];

        wm.updateWidget(groupId, updates);

        expect(mockApp.project.updateWidget).toHaveBeenCalledWith(groupId, updates);
        expect(mockApp.project.updateWidget).toHaveBeenCalledWith(childId, updates);
    });

    it('should delete a widget and its children recursively', () => {
        const groupId = 'g1';
        const childId = 'c1';

        mockApp.editor.selectedWidgetIds = new Set([groupId]);
        mockApp.getWidgetById.mockImplementation((id) => {
            if (id === groupId) return { id: groupId, type: 'group' };
            if (id === childId) return { id: childId, type: 'text', parentId: groupId };
            return null;
        });

        mockApp.pages[0].widgets = [
            { id: groupId, type: 'group' },
            { id: childId, type: 'text', parentId: groupId }
        ];

        wm.deleteWidget(); // Delete selection

        // Verification: match plural deleteWidgets call
        expect(mockApp.project.deleteWidgets).toHaveBeenCalledWith(expect.arrayContaining([groupId, childId]));
        expect(emit).toHaveBeenCalledWith('state-changed');
    });

    it('should update multiple widgets properties correctly', () => {
        const ids = ['w1'];
        const propUpdates = { color: 'red' };
        mockApp.getWidgetById.mockReturnValue({ id: 'w1', props: { size: 10 } });

        wm.updateWidgetsProps(ids, propUpdates);

        expect(mockApp.project.updateWidget).toHaveBeenCalledWith('w1', {
            props: { size: 10, color: 'red' }
        });
        expect(emit).toHaveBeenCalledWith('state-changed');
    });

    it('should paste widget from editor state properly', () => {
        mockApp.editor.clipboardWidgets = [{ type: 'text', x: 10, y: 10, props: {} }];

        wm.pasteWidget();

        expect(mockApp.project.addWidget).toHaveBeenCalledWith(expect.objectContaining({
            type: 'text',
            x: 20, // Offset applied: 10 + 10
            y: 20
        }));
    });

    it('should normalize theme_auto border_color to a concrete color when creating drop shadow', () => {
        const widget = {
            id: 'rect_1',
            type: 'shape_rect',
            x: 10,
            y: 20,
            width: 100,
            height: 50,
            props: {
                color: 'theme_auto',
                border_color: 'theme_auto',
                border_width: 2
            }
        };

        const page = {
            dark_mode: 'light',
            widgets: [widget]
        };
        const widgetsById = new Map([[widget.id, widget]]);

        const app = {
            settings: { dark_mode: false },
            getCurrentPage: vi.fn(() => page),
            project: {
                currentPageIndex: 0,
                getCurrentPage: vi.fn(() => page),
                addWidget: vi.fn((w) => {
                    page.widgets.push(w);
                    widgetsById.set(w.id, w);
                }),
                updateWidget: vi.fn((id, updates) => {
                    const current = widgetsById.get(id);
                    if (current) Object.assign(current, updates);
                }),
                reorderWidget: vi.fn(),
                rebuildWidgetsIndex: vi.fn()
            },
            getWidgetById: vi.fn((id) => widgetsById.get(id)),
            selectWidgets: vi.fn(),
            recordHistory: vi.fn()
        };

        const localManager = new WidgetManager(app);
        localManager.createDropShadow(widget.id);

        expect(widget.props.border_color).toBe('black');
        expect(widget.props.border_color).not.toBe('theme_auto');
    });

    it('should move group and direct child to target page with preserved relative offset', () => {
        const group = { id: 'group_1', type: 'group', x: 100, y: 100, width: 80, height: 80, props: {} };
        const child = { id: 'child_1', type: 'shape_rect', parentId: 'group_1', x: 130, y: 125, width: 20, height: 20, props: {} };

        const sourcePage = { widgets: [group, child] };
        const targetPage = { widgets: [] };

        mockApp.pages = [sourcePage, targetPage];
        mockApp.getCurrentPage = vi.fn(() => sourcePage);
        mockApp.getWidgetById = vi.fn((id) => {
            return sourcePage.widgets.find(w => w.id === id) || targetPage.widgets.find(w => w.id === id);
        });

        const moved = wm.moveWidgetToPage('group_1', 1, 200, 220);

        expect(moved).toBe(true);
        expect(sourcePage.widgets).toHaveLength(0);
        expect(targetPage.widgets).toHaveLength(2);

        const movedGroup = targetPage.widgets.find(w => w.id === 'group_1');
        const movedChild = targetPage.widgets.find(w => w.id === 'child_1');

        expect(movedGroup.x).toBe(200);
        expect(movedGroup.y).toBe(220);
        expect(movedChild.x).toBe(230);
        expect(movedChild.y).toBe(245);
    });
});
