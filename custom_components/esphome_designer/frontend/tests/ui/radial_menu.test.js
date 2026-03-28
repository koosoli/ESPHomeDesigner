import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { mockAppState, mockForceSnapWidget } = vi.hoisted(() => ({
    mockAppState: {
        currentPageIndex: 0,
        selectedWidgetIds: [],
        getWidgetById: vi.fn(() => null),
        getCurrentPage: vi.fn(() => ({ widgets: [] })),
        selectWidget: vi.fn(),
        copyWidget: vi.fn(),
        groupSelection: vi.fn(),
        ungroupSelection: vi.fn(),
        pasteWidget: vi.fn(),
        updateWidget: vi.fn(),
        deleteWidget: vi.fn(),
        reorderWidget: vi.fn()
    },
    mockForceSnapWidget: vi.fn()
}));

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

vi.mock('../../js/core/canvas_snap.js', () => ({
    forceSnapWidget: mockForceSnapWidget
}));

async function loadMenu() {
    vi.resetModules();
    const module = await import('../../js/ui/radial_menu.js');
    return module.radialMenu;
}

describe('RadialMenu', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockAppState.currentPageIndex = 0;
        mockAppState.selectedWidgetIds = [];
        mockAppState.getWidgetById.mockImplementation(() => null);
        mockAppState.getCurrentPage.mockReturnValue({ widgets: [] });
        document.body.innerHTML = `
            <div id="canvas">
                <div class="artboard"></div>
            </div>
            <div id="outside"></div>
        `;
        vi.stubGlobal('requestAnimationFrame', (callback) => {
            callback();
            return 1;
        });
    });

    afterEach(() => {
        vi.unstubAllGlobals();
        document.body.innerHTML = '';
    });

    it('shows canvas actions and hides on context menus outside the canvas', async () => {
        const menu = await loadMenu();

        menu.show(24, 48);
        expect(menu.active).toBe(true);
        expect(menu.element.style.left).toBe('24px');
        expect(menu.element.style.top).toBe('48px');
        expect(menu.element.classList.contains('active')).toBe(true);

        const actions = menu.getAvailableActions();
        expect(actions.map((action) => action.label)).toEqual(['Paste']);

        actions[0].callback();
        expect(mockAppState.pasteWidget).toHaveBeenCalledTimes(1);

        document.getElementById('canvas')?.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, cancelable: true }));
        expect(menu.active).toBe(true);

        document.getElementById('outside')?.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, cancelable: true }));
        expect(menu.active).toBe(false);
        expect(menu.targetWidgetId).toBeNull();
    });

    it('offers widget actions and invokes their callbacks for regular widgets', async () => {
        const widget = { id: 'widget_1', type: 'text', locked: false };
        const sibling = { id: 'widget_2', type: 'text', locked: false };

        mockAppState.selectedWidgetIds = ['widget_1', 'widget_2'];
        mockAppState.getWidgetById.mockImplementation((id) => {
            if (id === 'widget_1') return widget;
            if (id === 'widget_2') return sibling;
            return null;
        });
        mockAppState.getCurrentPage.mockReturnValue({ widgets: [widget, sibling] });

        const menu = await loadMenu();
        menu.show(64, 96, 'widget_1');

        const actions = Object.fromEntries(menu.getAvailableActions().map((action) => [action.label, action]));
        expect(Object.keys(actions)).toEqual(expect.arrayContaining([
            'Copy',
            'Group',
            'Duplicate',
            'Lock',
            'Snap',
            'Delete',
            'Bring to Front',
            'Send to Back'
        ]));
        expect(actions.Ungroup).toBeUndefined();

        actions.Copy.callback();
        actions.Group.callback();
        actions.Duplicate.callback();
        actions.Lock.callback();
        actions.Snap.callback();
        actions.Delete.callback();
        actions['Bring to Front'].callback();
        actions['Send to Back'].callback();

        expect(mockAppState.selectWidget).toHaveBeenCalledWith('widget_1', false);
        expect(mockAppState.copyWidget).toHaveBeenCalledTimes(2);
        expect(mockAppState.groupSelection).toHaveBeenCalledTimes(1);
        expect(mockAppState.pasteWidget).toHaveBeenCalledTimes(1);
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('widget_1', { locked: true });
        expect(mockForceSnapWidget).toHaveBeenCalledWith('widget_1');
        expect(mockAppState.deleteWidget).toHaveBeenCalledWith('widget_1');
        expect(mockAppState.reorderWidget).toHaveBeenNthCalledWith(1, 0, 0, 1);
        expect(mockAppState.reorderWidget).toHaveBeenNthCalledWith(2, 0, 0, 0);
    });

    it('adds ungroup and unlock actions for grouped widgets and omits grouping when selection already contains a group', async () => {
        const widget = { id: 'group_1', type: 'group', locked: true };

        mockAppState.selectedWidgetIds = ['group_1', 'child_1'];
        mockAppState.getWidgetById.mockImplementation((id) => {
            if (id === 'group_1') return widget;
            if (id === 'child_1') return { id, type: 'text', parentId: 'group_1' };
            return null;
        });
        mockAppState.getCurrentPage.mockReturnValue({ widgets: [widget] });

        const menu = await loadMenu();
        menu.show(12, 18, 'group_1');

        const actions = Object.fromEntries(menu.getAvailableActions().map((action) => [action.label, action]));
        expect(actions.Group).toBeUndefined();
        expect(actions.Ungroup).toBeDefined();
        expect(actions.Unlock).toBeDefined();

        actions.Ungroup.callback();
        actions.Unlock.callback();

        expect(mockAppState.ungroupSelection).toHaveBeenCalledWith('group_1');
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('group_1', { locked: false });
    });

    it('stays open for inside clicks and hides on outside touch or Escape', async () => {
        const menu = await loadMenu();
        menu.show(20, 30);

        menu.element.querySelector('.radial-menu-center')?.dispatchEvent(new MouseEvent('mousedown', {
            bubbles: true,
            cancelable: true
        }));
        expect(menu.active).toBe(true);

        document.getElementById('outside')?.dispatchEvent(new Event('touchstart', { bubbles: true, cancelable: true }));
        expect(menu.active).toBe(false);

        menu.show(20, 30);
        window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
        expect(menu.active).toBe(false);
    });
});
