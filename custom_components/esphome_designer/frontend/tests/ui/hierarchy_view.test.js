import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
    getHierarchyWidgetIcon,
    getHierarchyWidgetLabel
} from '../../js/ui/hierarchy_view_items.js';

const { mockAppState, mockRegistry } = vi.hoisted(() => {
    const state = {
        pages: [],
        currentPageIndex: 0,
        selectedWidgetIds: [],
        getCurrentPage: vi.fn(() => state.pages[state.currentPageIndex] || null),
        getWidgetById: vi.fn((id) => state.pages.flatMap((page) => page.widgets || []).find((widget) => widget.id === id)),
        getSelectedWidgets: vi.fn(() => state.selectedWidgetIds.map((id) => state.getWidgetById(id)).filter(Boolean)),
        selectWidget: vi.fn((id, multi) => {
            if (multi) {
                state.selectedWidgetIds = state.selectedWidgetIds.includes(id)
                    ? state.selectedWidgetIds
                    : [...state.selectedWidgetIds, id];
                return;
            }
            state.selectedWidgetIds = [id];
        }),
        updateWidget: vi.fn((id, updates) => {
            const widget = state.getWidgetById(id);
            if (widget) Object.assign(widget, updates);
        }),
        deleteWidget: vi.fn((id) => {
            state.pages.forEach((page) => {
                page.widgets = page.widgets.filter((widget) => widget.id !== id);
            });
            state.selectedWidgetIds = state.selectedWidgetIds.filter((widgetId) => widgetId !== id);
        }),
        reorderWidget: vi.fn((pageIndex, fromIndex, toIndex) => {
            const widgets = state.pages[pageIndex]?.widgets;
            if (!widgets || fromIndex < 0 || toIndex < 0 || fromIndex >= widgets.length || toIndex >= widgets.length) return;
            const [widget] = widgets.splice(fromIndex, 1);
            widgets.splice(toIndex, 0, widget);
        }),
        groupSelection: vi.fn(),
        ungroupSelection: vi.fn(),
        setPages: vi.fn((pages) => {
            state.pages = pages;
        })
    };

    const registry = {
        get: vi.fn((type) => ({
            group: { name: 'Group' },
            text: { name: 'Text' },
            image: { name: 'Image' },
            custom_card: { name: 'Custom Card' }
        }[type] || null))
    };

    return { mockAppState: state, mockRegistry: registry };
});

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

vi.mock('../../js/core/events.js', () => ({
    on: vi.fn(),
    EVENTS: {}
}));

vi.mock('../../js/utils/logger.js', () => ({
    Logger: { log: vi.fn(), error: vi.fn() }
}));

vi.mock('../../js/core/plugin_registry', () => ({
    registry: mockRegistry
}));

import { HierarchyView, buildWidgetHierarchy, moveWidgetInLayerOrder } from '../../js/ui/hierarchy_view.js';

describe('hierarchy_view helpers', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockAppState.pages = [{
            id: 'page_0',
            widgets: [
                { id: 'group_1', type: 'group', expanded: true, locked: false, hidden: false, title: 'Top Group' },
                { id: 'text_1', type: 'text', parentId: 'group_1', locked: false, hidden: false, props: { text: 'Headline' } },
                { id: 'image_1', type: 'image', locked: false, hidden: false, props: { path: '/config/image.png' } },
                { id: 'custom_card_9', type: 'custom_card', locked: false, hidden: false, props: {} }
            ]
        }];
        mockAppState.selectedWidgetIds = [];
        vi.stubGlobal('prompt', vi.fn(() => null));
        vi.stubGlobal('confirm', vi.fn(() => true));
        document.body.innerHTML = `
            <div id="hierarchyHeader"><span class="chevron"></span></div>
            <div id="hierarchyPanel">
                <div id="hierarchyList"></div>
            </div>
        `;
    });

    it('builds top-level and child traversal structures', () => {
        const widgets = [
            { id: 'parent_a', type: 'group' },
            { id: 'child_a1', type: 'text', parentId: 'parent_a' },
            { id: 'nested_group', type: 'group', parentId: 'parent_a' },
            { id: 'nested_child', type: 'text', parentId: 'nested_group' },
            { id: 'parent_b', type: 'text' },
            { id: 'child_a2', type: 'icon', parentId: 'parent_a' }
        ];

        const { topLevel, childrenMap } = buildWidgetHierarchy(widgets);

        expect(topLevel.map((widget) => widget.id)).toEqual(['parent_b', 'nested_group', 'parent_a']);
        expect(childrenMap.get('parent_a')?.map((widget) => widget.id)).toEqual(['child_a1', 'child_a2']);
        expect(childrenMap.get('nested_group')?.map((widget) => widget.id)).toEqual(['nested_child']);
    });

    it('moves widgets through each layer-order direction', () => {
        const widgets = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];

        expect(moveWidgetInLayerOrder(widgets, 'b', 'front')).toBe(true);
        expect(widgets.map((widget) => widget.id)).toEqual(['a', 'c', 'b']);

        expect(moveWidgetInLayerOrder(widgets, 'b', 'back')).toBe(true);
        expect(widgets.map((widget) => widget.id)).toEqual(['b', 'a', 'c']);

        expect(moveWidgetInLayerOrder(widgets, 'a', 'up')).toBe(true);
        expect(widgets.map((widget) => widget.id)).toEqual(['b', 'c', 'a']);

        expect(moveWidgetInLayerOrder(widgets, 'c', 'down')).toBe(true);
        expect(widgets.map((widget) => widget.id)).toEqual(['c', 'b', 'a']);
    });

    it('does not mutate order when a move is not possible', () => {
        const widgets = [{ id: 'a' }, { id: 'b' }];

        expect(moveWidgetInLayerOrder(widgets, 'a', 'back')).toBe(false);
        expect(moveWidgetInLayerOrder(widgets, 'b', 'front')).toBe(false);
        expect(moveWidgetInLayerOrder(widgets, 'missing', 'up')).toBe(false);
        expect(moveWidgetInLayerOrder(widgets, 'a', /** @type {any} */ ('sideways'))).toBe(false);
        expect(widgets.map((widget) => widget.id)).toEqual(['a', 'b']);
    });

    it('exposes label and icon helpers through the item module', () => {
        expect(getHierarchyWidgetLabel({ id: 'custom_card_9', type: 'custom_card', props: {} })).toContain('Custom Card');
        expect(getHierarchyWidgetIcon('text')).toContain('mdi-format-text');
    });

    it('fails gracefully when required DOM nodes are missing', () => {
        document.body.innerHTML = '';
        const view = new HierarchyView();

        view.init();

        expect(view.listContainer).toBeNull();
    });

    it('renders the hierarchy, supports rename/lock/visibility/delete actions, and toggles collapse', () => {
        mockAppState.selectedWidgetIds = ['text_1'];
        const view = new HierarchyView();
        view.init();

        const items = Array.from(document.querySelectorAll('.hierarchy-item'));
        expect(items.map((item) => item.getAttribute('data-id'))).toEqual(['custom_card_9', 'image_1', 'group_1', 'text_1']);
        expect(document.querySelector('#hierarchyControls')).toBeTruthy();

        const fallbackLabel = /** @type {HTMLElement} */ (document.querySelector('.hierarchy-item[data-id="custom_card_9"] .hierarchy-item-label'));
        expect(fallbackLabel.textContent).toContain('Custom Card');
        expect(fallbackLabel.textContent).toContain('(9)');

        const textItem = /** @type {HTMLElement} */ (document.querySelector('.hierarchy-item[data-id="text_1"]'));
        const textLabel = /** @type {HTMLElement} */ (textItem.querySelector('.hierarchy-item-label'));
        window.prompt = vi.fn(() => 'Updated Headline');
        textLabel.click();
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('text_1', { title: 'Updated Headline' });

        const imageItem = /** @type {HTMLElement} */ (document.querySelector('.hierarchy-item[data-id="image_1"]'));
        imageItem.dispatchEvent(new MouseEvent('click', { bubbles: true, ctrlKey: true }));
        expect(mockAppState.selectWidget).toHaveBeenCalledWith('image_1', true);

        const imageLock = /** @type {HTMLElement} */ (imageItem.querySelector('.toggle-lock'));
        imageLock.click();
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('image_1', { locked: true });

        const imageVisibility = /** @type {HTMLElement} */ (imageItem.querySelector('.toggle-visibility'));
        imageVisibility.click();
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('image_1', { hidden: true });

        const deleteButton = /** @type {HTMLElement} */ (imageItem.querySelector('.delete-widget'));
        deleteButton.click();
        expect(mockAppState.deleteWidget).toHaveBeenCalledWith('image_1');

        const groupToggle = /** @type {HTMLElement} */ (document.querySelector('.hierarchy-item[data-id="group_1"] .hierarchy-group-toggle'));
        groupToggle.click();
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('group_1', { expanded: false });

        const header = /** @type {HTMLElement} */ (document.getElementById('hierarchyHeader'));
        header.click();
        expect(document.getElementById('hierarchyPanel')?.classList.contains('hidden')).toBe(true);
        expect((/** @type {HTMLElement} */ (header.querySelector('.chevron'))).style.transform).toBe('rotate(-90deg)');
    });

    it('renders empty-state and batch controls for grouping and layer order', () => {
        mockAppState.pages = [{ id: 'page_0', widgets: [] }];
        const emptyView = new HierarchyView();
        emptyView.init();
        expect(document.getElementById('hierarchyList')?.textContent).toContain('No widgets on this page');
        expect((/** @type {HTMLElement} */ (document.getElementById('hierarchyControls'))).style.display).toBe('none');

        mockAppState.pages = [{
            id: 'page_0',
            widgets: [
                { id: 'a', type: 'text', locked: false, hidden: false, props: { text: 'A' } },
                { id: 'b', type: 'image', locked: false, hidden: false, props: { path: '/config/b.png' } },
                { id: 'c', type: 'text', parentId: 'group_a', locked: false, hidden: false, props: { text: 'Grouped' } }
            ]
        }];
        mockAppState.selectedWidgetIds = ['a', 'b'];
        document.body.innerHTML = `
            <div id="hierarchyHeader"><span class="chevron"></span></div>
            <div id="hierarchyPanel">
                <div id="hierarchyList"></div>
            </div>
        `;

        const view = new HierarchyView();
        view.init();

        const headerToggles = document.querySelectorAll('.h-toggle');
        expect(headerToggles).toHaveLength(2);
        /** @type {HTMLElement} */ (headerToggles[0]).click();
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('a', { locked: true });
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('b', { locked: true });

        /** @type {HTMLElement} */ (headerToggles[1]).click();
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('a', { hidden: true });
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('b', { hidden: true });

        const controls = /** @type {HTMLElement} */ (document.getElementById('hierarchyControls'));
        const buttons = Array.from(controls.querySelectorAll('button'));
        expect(buttons[0].disabled).toBe(false);
        expect(buttons[1].disabled).toBe(true);
        expect(controls.textContent).toContain('Shift/Ctrl-click');
        buttons[0].click();
        expect(mockAppState.groupSelection).toHaveBeenCalled();

        mockAppState.selectedWidgetIds = ['c'];
        view.renderControls();
        const ungroupButton = /** @type {HTMLButtonElement} */ (controls.querySelectorAll('button')[1]);
        expect(ungroupButton.disabled).toBe(false);
        ungroupButton.click();
        expect(mockAppState.ungroupSelection).toHaveBeenCalled();

        mockAppState.selectedWidgetIds = ['a'];
        view.renderControls();
        const layerButtons = Array.from(controls.querySelectorAll('button')).slice(-4);
        layerButtons.forEach((button) => button.click());
        expect(mockAppState.setPages).toHaveBeenCalled();
    });

    it('supports drag and drop reparenting into groups and sibling reordering', () => {
        const view = new HierarchyView();
        view.init();

        const source = /** @type {HTMLElement} */ (document.querySelector('.hierarchy-item[data-id="image_1"]'));
        const groupTarget = /** @type {HTMLElement} */ (document.querySelector('.hierarchy-item[data-id="group_1"]'));
        const siblingTarget = /** @type {HTMLElement} */ (document.querySelector('.hierarchy-item[data-id="custom_card_9"]'));

        const dataTransfer = {
            store: /** @type {Record<string, string>} */ ({}),
            setData(type, value) {
                this.store[type] = value;
            },
            getData(type) {
                return this.store[type] || '';
            },
            effectAllowed: '',
            dropEffect: ''
        };

        const dragStart = new Event('dragstart', { bubbles: true });
        Object.defineProperty(dragStart, 'dataTransfer', { value: dataTransfer });
        source.dispatchEvent(dragStart);
        expect(source.classList.contains('dragging')).toBe(true);

        const dragOver = new Event('dragover', { bubbles: true, cancelable: true });
        Object.defineProperty(dragOver, 'dataTransfer', { value: dataTransfer });
        groupTarget.dispatchEvent(dragOver);
        expect(groupTarget.classList.contains('drag-over')).toBe(true);

        const dropOnGroup = new Event('drop', { bubbles: true, cancelable: true });
        Object.defineProperty(dropOnGroup, 'dataTransfer', { value: dataTransfer });
        groupTarget.dispatchEvent(dropOnGroup);
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('image_1', { parentId: 'group_1', expanded: true });
        expect(mockAppState.reorderWidget).toHaveBeenCalledWith(0, 2, 0);

        const dragEnd = new Event('dragend', { bubbles: true });
        source.dispatchEvent(dragEnd);
        expect(source.classList.contains('dragging')).toBe(false);

        mockAppState.updateWidget.mockClear();
        mockAppState.reorderWidget.mockClear();

        const secondDragStart = new Event('dragstart', { bubbles: true });
        Object.defineProperty(secondDragStart, 'dataTransfer', { value: dataTransfer });
        source.dispatchEvent(secondDragStart);

        const dropOnSibling = new Event('drop', { bubbles: true, cancelable: true });
        Object.defineProperty(dropOnSibling, 'dataTransfer', { value: dataTransfer });
        siblingTarget.dispatchEvent(dropOnSibling);
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('image_1', { parentId: null });
        expect(mockAppState.reorderWidget).toHaveBeenCalledWith(0, 2, 3);
    });

    it('keeps groups top-level and lets stale nested groups recover through drag and drop', () => {
        mockAppState.pages = [{
            id: 'page_0',
            widgets: [
                { id: 'group_1', type: 'group', expanded: true, locked: false, hidden: false, title: 'Outer Group' },
                { id: 'group_2', type: 'group', parentId: 'group_1', expanded: true, locked: false, hidden: false, title: 'Nested Group' },
                { id: 'text_2', type: 'text', parentId: 'group_2', locked: false, hidden: false, props: { text: 'Child' } },
                { id: 'custom_card_9', type: 'custom_card', locked: false, hidden: false, props: {} }
            ]
        }];

        const view = new HierarchyView();
        view.init();

        const items = Array.from(document.querySelectorAll('.hierarchy-item'));
        expect(items.map((item) => item.getAttribute('data-id'))).toEqual(['custom_card_9', 'group_2', 'text_2', 'group_1']);

        const source = /** @type {HTMLElement} */ (document.querySelector('.hierarchy-item[data-id="group_2"]'));
        const target = /** @type {HTMLElement} */ (document.querySelector('.hierarchy-item[data-id="custom_card_9"]'));
        const dataTransfer = {
            store: /** @type {Record<string, string>} */ ({}),
            setData(type, value) {
                this.store[type] = value;
            },
            getData(type) {
                return this.store[type] || '';
            },
            effectAllowed: '',
            dropEffect: ''
        };

        const dragStart = new Event('dragstart', { bubbles: true });
        Object.defineProperty(dragStart, 'dataTransfer', { value: dataTransfer });
        source.dispatchEvent(dragStart);

        const drop = new Event('drop', { bubbles: true, cancelable: true });
        Object.defineProperty(drop, 'dataTransfer', { value: dataTransfer });
        target.dispatchEvent(drop);

        expect(mockAppState.updateWidget).toHaveBeenCalledWith('group_2', { parentId: null });
        expect(mockAppState.reorderWidget).toHaveBeenCalledWith(0, 1, 3);
    });
});
