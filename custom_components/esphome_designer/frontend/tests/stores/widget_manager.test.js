import { describe, it, expect, vi, beforeEach } from 'vitest';
import { WidgetManager } from '../../js/core/stores/app_state/widget_manager.js';
import { emit } from '../../js/core/events.js';

const { mockShowToast, mockRegistryGet } = vi.hoisted(() => ({
    mockShowToast: vi.fn(),
    mockRegistryGet: vi.fn()
}));

// Deep-Mocking infrastructure for ULTRATHINK compliance
vi.mock('../../js/core/events.js', () => ({
    emit: vi.fn(),
    EVENTS: {
        STATE_CHANGED: 'state-changed',
        PAGE_CHANGED: 'page-changed'
    }
}));

vi.mock('../../js/utils/logger.js', () => ({
    Logger: {
        log: vi.fn(),
        warn: vi.fn(),
        error: vi.fn()
    }
}));

vi.mock('../../js/utils/dom.js', () => ({
    showToast: mockShowToast
}));

vi.mock('../../js/core/plugin_registry', () => ({
    registry: {
        get: mockRegistryGet
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
            selectWidgets: vi.fn(),
            updateSettings: vi.fn(),
            getWidgetById: vi.fn(),
            getCurrentPage: vi.fn(() => mockApp.pages[mockApp.currentPageIndex]),
            currentPageIndex: 0,
            pages: [{ widgets: [] }],
            preferences: {
                state: { renderingMode: 'direct' }
            },
            setInternalFlag: vi.fn(),
            editor: {
                selectedWidgetIds: new Set(),
                copyWidgets: vi.fn(),
                setSelectedWidgetIds: vi.fn()
            }
        };
        mockApp.project.getCurrentPage = vi.fn(() => mockApp.pages[mockApp.currentPageIndex]);
        mockApp.project.currentPageIndex = 0;
        mockApp.project.reorderWidget = vi.fn();
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
        mockApp.getWidgetById.mockImplementation((targetId) => {
            if (targetId === id) return { id, type: 'text' };
            if (targetId === 'new-parent') return { id: 'new-parent', type: 'group' };
            return null;
        });

        // Mock internal sync method
        const syncSpy = vi.spyOn(wm, 'syncWidgetOrderWithHierarchy').mockImplementation(() => { });

        wm.updateWidget(id, updates);

        expect(mockApp.project.updateWidget).toHaveBeenCalledWith(id, updates);
        expect(syncSpy).toHaveBeenCalled();
        expect(emit).toHaveBeenCalledWith('state-changed');
    });

    it('should prevent nested groups and reject non-group parents', () => {
        mockApp.getWidgetById.mockImplementation((id) => {
            if (id === 'group_1') return { id: 'group_1', type: 'group', parentId: null };
            if (id === 'group_2') return { id: 'group_2', type: 'group', parentId: null };
            if (id === 'text_1') return { id: 'text_1', type: 'text', parentId: null };
            if (id === 'text_parent') return { id: 'text_parent', type: 'text', parentId: null };
            return null;
        });

        wm.updateWidget('group_1', { parentId: 'group_2' });
        expect(mockApp.project.updateWidget).toHaveBeenNthCalledWith(1, 'group_1', { parentId: null });

        wm.updateWidget('text_1', { parentId: 'text_parent' });
        expect(mockApp.project.updateWidget).toHaveBeenNthCalledWith(2, 'text_1', { parentId: null });
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

    it('should update multiple widgets and sync radius to sibling shadow widgets', () => {
        const ids = ['w1'];
        const widgets = [
            { id: 'w1', parentId: 'group_1', props: { radius: 2 } },
            { id: 'shadow_1', parentId: 'group_1', props: { name: 'Card Shadow', radius: 2 } }
        ];
        mockApp.pages[0].widgets = widgets;
        mockApp.getCurrentPage.mockReturnValue(mockApp.pages[0]);
        mockApp.getWidgetById.mockImplementation((id) => {
            if (id === 'w1') return widgets[0];
            if (id === 'group_1') return { id: 'group_1', type: 'group', title: 'Card Group' };
            return null;
        });

        wm.updateWidgets(['w1', 'w2'], { hidden: true });
        expect(mockApp.project.updateWidget).toHaveBeenNthCalledWith(1, 'w1', { hidden: true });
        expect(mockApp.project.updateWidget).toHaveBeenNthCalledWith(2, 'w2', { hidden: true });

        mockApp.project.updateWidget.mockClear();
        wm.updateWidgetsProps(ids, { radius: 8 });

        expect(mockApp.project.updateWidget).toHaveBeenCalledWith('w1', {
            props: { radius: 8 }
        });
        expect(mockApp.project.updateWidget).toHaveBeenCalledWith('shadow_1', {
            props: { name: 'Card Shadow', radius: 8 }
        });
    });

    it('should sync border_radius updates to sibling shadow widgets', () => {
        const ids = ['calendar_1'];
        const widgets = [
            { id: 'calendar_1', parentId: 'group_1', props: { border_radius: 4 } },
            { id: 'shadow_1', parentId: 'group_1', props: { name: 'Calendar Shadow', radius: 4 } }
        ];
        mockApp.pages[0].widgets = widgets;
        mockApp.getCurrentPage.mockReturnValue(mockApp.pages[0]);
        mockApp.getWidgetById.mockImplementation((id) => {
            if (id === 'calendar_1') return widgets[0];
            if (id === 'group_1') return { id: 'group_1', type: 'group', title: 'Calendar Group' };
            return null;
        });

        wm.updateWidgetsProps(ids, { border_radius: 12 });

        expect(mockApp.project.updateWidget).toHaveBeenCalledWith('calendar_1', {
            props: { border_radius: 12 }
        });
        expect(mockApp.project.updateWidget).toHaveBeenCalledWith('shadow_1', {
            props: { name: 'Calendar Shadow', radius: 12 }
        });
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

    it('should copy widgets from both selected sets and explicit ids', () => {
        mockApp.editor.selectedWidgetIds = new Set(['w1', 'w2']);
        mockApp.getWidgetById.mockImplementation((id) => ({ id, type: 'text' }));

        wm.copyWidget();
        expect(mockApp.editor.copyWidgets).toHaveBeenCalledWith([
            { id: 'w1', type: 'text' },
            { id: 'w2', type: 'text' }
        ]);

        mockApp.editor.copyWidgets.mockClear();
        wm.copyWidget('w3');
        expect(mockApp.editor.copyWidgets).toHaveBeenCalledWith([
            { id: 'w3', type: 'text' }
        ]);
    });

    it('should ignore paste when the clipboard is empty', () => {
        mockApp.editor.clipboardWidgets = [];

        wm.pasteWidget();

        expect(mockApp.project.addWidget).not.toHaveBeenCalled();
        expect(mockApp.recordHistory).not.toHaveBeenCalled();
    });

    it('preserves an existing shape fill when creating drop shadow', () => {
        const widget = {
            id: 'rect_1',
            type: 'shape_rect',
            x: 10,
            y: 20,
            width: 100,
            height: 50,
            props: {
                fill: true,
                color: 'navy',
                bg_color: 'tomato',
                background_color: 'tomato',
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

        const shadow = page.widgets.find((entry) => entry.id !== widget.id && entry.props?.name === 'shape_rect Shadow');
        expect(widget.props.fill).toBeUndefined();
        expect(widget.props.color).toBe('navy');
        expect(widget.props.bg_color).toBe('tomato');
        expect(widget.props.background_color).toBeUndefined();
        expect(shadow?.props.bg_color).toBe('black');
        expect(shadow?.props.background_color).toBeUndefined();
    });

    it('should build circle shadows in dark mode and preserve radius for rounded rect shadows', () => {
        const circle = {
            id: 'circle_1',
            type: 'shape_circle',
            x: 0,
            y: 0,
            width: 30,
            height: 30,
            props: {}
        };
        const rounded = {
            id: 'rounded_1',
            type: 'shape_rect',
            x: 50,
            y: 50,
            width: 60,
            height: 40,
            props: { radius: 12 }
        };
        const page = { dark_mode: 'auto', widgets: [circle, rounded] };
        const added = [];
        const app = {
            settings: { dark_mode: true },
            getCurrentPage: vi.fn(() => page),
            getWidgetById: vi.fn((id) => page.widgets.find((w) => w.id === id) || added.find((w) => w.id === id)),
            selectWidgets: vi.fn(),
            recordHistory: vi.fn(),
            project: {
                currentPageIndex: 0,
                getCurrentPage: vi.fn(() => page),
                addWidget: vi.fn((widget) => added.push(widget)),
                updateWidget: vi.fn(),
                reorderWidget: vi.fn(),
                rebuildWidgetsIndex: vi.fn()
            }
        };

        const localManager = new WidgetManager(app);
        localManager.createDropShadow([circle.id, rounded.id]);

        expect(added.find((widget) => widget.type === 'shape_circle')).toBeTruthy();
        const roundedShadow = added.find((widget) => widget.props?.name === 'shape_rect Shadow');
        expect(roundedShadow?.type).toBe('rounded_rect');
        expect(roundedShadow?.props.radius).toBe(12);
        expect(app.selectWidgets).toHaveBeenCalled();
    });

    it('forces transparent content widget backgrounds to white when creating drop shadows', () => {
        const widget = {
            id: 'calendar_1',
            type: 'calendar',
            x: 20,
            y: 30,
            width: 180,
            height: 120,
            props: {
                background_color: 'transparent',
                border_color: 'black'
            }
        };

        const page = {
            dark_mode: 'dark',
            widgets: [widget]
        };
        const widgetsById = new Map([[widget.id, widget]]);

        const app = {
            settings: { dark_mode: true },
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

        expect(widget.props.fill).toBe(true);
        expect(widget.props.background_color).toBe('white');
        expect(widget.props.bg_color).toBeUndefined();
    });

    it('forces transparent bg_color content widgets to white when creating drop shadows', () => {
        const widget = {
            id: 'content_bg_color',
            type: 'calendar',
            x: 20,
            y: 30,
            width: 180,
            height: 120,
            props: {
                bg_color: 'transparent',
                border_color: 'black'
            }
        };

        const page = {
            dark_mode: 'dark',
            widgets: [widget]
        };
        const widgetsById = new Map([[widget.id, widget]]);

        const app = {
            settings: { dark_mode: true },
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

        expect(widget.props.fill).toBe(true);
        expect(widget.props.bg_color).toBe('white');
        expect(widget.props.background_color).toBeUndefined();
    });

    it('forces transparent shape fills to white when creating drop shadows', () => {
        const widget = {
            id: 'rounded_transparent',
            type: 'shape_rect',
            x: 40,
            y: 50,
            width: 90,
            height: 45,
            props: {
                bg_color: 'transparent',
                fill: true,
                radius: 10
            }
        };

        const page = {
            dark_mode: 'dark',
            widgets: [widget]
        };
        const widgetsById = new Map([[widget.id, widget]]);

        const app = {
            settings: { dark_mode: true },
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

        expect(widget.props.fill).toBeUndefined();
        expect(widget.props.bg_color).toBe('white');
        expect(widget.props.background_color).toBeUndefined();
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

    it('should synchronize hierarchy order and widget visibility for protocol modes', () => {
        const page = {
            widgets: [
                { id: 'parent', type: 'text' },
                { id: 'child', type: 'text', parentId: 'parent' },
                { id: 'lvgl', type: 'lvgl_button', hidden: false },
                { id: 'direct', type: 'text', hidden: true },
                { id: 'oepl', type: 'oepl_qr', hidden: false }
            ]
        };
        mockApp.pages = [page];
        mockApp.project.pages = [page];
        mockApp.getCurrentPage.mockReturnValue(page);
        mockApp.preferences.state.renderingMode = 'direct';

        wm.syncWidgetOrderWithHierarchy();
        expect(page.widgets.map((widget) => widget.id).slice(0, 2)).toEqual(['parent', 'child']);
        expect(mockApp.project.rebuildWidgetsIndex).toHaveBeenCalled();

        mockRegistryGet.mockImplementation((type) => {
            if (type === 'lvgl_button') return { exportLVGL: vi.fn() };
            if (type === 'oepl_qr') return { exportOEPL: vi.fn() };
            return { export: vi.fn() };
        });

        mockApp.project.rebuildWidgetsIndex.mockClear();
        wm.syncWidgetVisibilityWithMode();
        expect(page.widgets.find((widget) => widget.id === 'lvgl')?.hidden).toBe(true);
        expect(page.widgets.find((widget) => widget.id === 'direct')?.hidden).toBe(false);
        expect(mockApp.project.rebuildWidgetsIndex).toHaveBeenCalled();
        expect(emit).toHaveBeenCalledWith('state-changed');

        expect(wm.isWidgetCompatibleWithMode({ type: 'oepl_qr' }, 'oepl')).toBe(true);
        expect(wm.isWidgetCompatibleWithMode({ type: 'odp_card' }, 'opendisplay')).toBe(false);
        expect(wm.isWidgetCompatibleWithMode({ type: 'lvgl_label' }, 'lvgl')).toBe(true);
        expect(wm.isWidgetCompatibleWithMode({ type: 'lvgl_label' }, 'direct')).toBe(false);
        expect(wm.isWidgetCompatibleWithMode({ type: 'text' }, 'custom-mode')).toBe(true);
    });

    it('should keep groups top-level while syncing hierarchy order', () => {
        const page = {
            widgets: [
                { id: 'group_outer', type: 'group', parentId: null },
                { id: 'group_inner', type: 'group', parentId: 'group_outer' },
                { id: 'child_inner', type: 'text', parentId: 'group_inner' },
                { id: 'lonely', type: 'text' }
            ]
        };
        mockApp.pages = [page];
        mockApp.project.pages = [page];
        mockApp.getCurrentPage.mockReturnValue(page);

        wm.syncWidgetOrderWithHierarchy();

        expect(page.widgets.map((widget) => widget.id)).toEqual(['group_outer', 'group_inner', 'child_inner', 'lonely']);
        expect(mockApp.project.rebuildWidgetsIndex).toHaveBeenCalled();
    });

    it('should auto-switch rendering modes for oepl and odp widgets but ignore empty types', () => {
        wm.checkRenderingModeForWidget(null);
        wm.checkRenderingModeForWidget({ type: '' });

        wm.checkRenderingModeForWidget({ type: 'oepl_badge' });
        expect(mockApp.updateSettings).toHaveBeenCalledWith({ renderingMode: 'oepl' });
        expect(mockShowToast).toHaveBeenCalledWith('Auto-switched to OEPL mode', 'info');

        mockApp.preferences.state.renderingMode = 'direct';
        wm.checkRenderingModeForWidget({ type: 'odp_canvas' });
        expect(mockApp.updateSettings).toHaveBeenCalledWith({ renderingMode: 'opendisplay' });
        expect(mockShowToast).toHaveBeenCalledWith('Auto-switched to ODP mode', 'info');
    });
});
