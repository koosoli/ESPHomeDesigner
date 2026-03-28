import { beforeEach, describe, expect, it, vi } from 'vitest';

const {
    mockAppState,
    mockEmit,
    mockClearSnapGuides,
    mockUpdateWidgetGridCell,
    mockRender,
    mockFocusPage,
    mockRemoveDragGhost,
    mockRemovePageDragGhost
} = vi.hoisted(() => ({
    mockAppState: {
        currentPageIndex: 0,
        pages: [{ widgets: [] }, { widgets: [] }],
        addPage: vi.fn(),
        setCurrentPageIndex: vi.fn(),
        moveWidgetToPage: vi.fn(),
        reorderPage: vi.fn(),
        getWidgetById: vi.fn(),
        getCanvasDimensions: vi.fn(() => ({ width: 100, height: 80 })),
        recordHistory: vi.fn(),
        selectWidgets: vi.fn()
    },
    mockEmit: vi.fn(),
    mockClearSnapGuides: vi.fn(),
    mockUpdateWidgetGridCell: vi.fn(),
    mockRender: vi.fn(),
    mockFocusPage: vi.fn(),
    mockRemoveDragGhost: vi.fn(),
    mockRemovePageDragGhost: vi.fn()
}));

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

vi.mock('../../js/core/events.js', () => ({
    emit: mockEmit,
    EVENTS: {
        STATE_CHANGED: 'STATE_CHANGED'
    }
}));

vi.mock('../../js/core/canvas_snap.js', () => ({
    clearSnapGuides: mockClearSnapGuides,
    updateWidgetGridCell: mockUpdateWidgetGridCell
}));

vi.mock('../../js/core/canvas_renderer.js', () => ({
    render: mockRender,
    focusPage: mockFocusPage
}));

vi.mock('../../js/core/interactions/drag_ghost.js', () => ({
    removeDragGhost: mockRemoveDragGhost,
    removePageDragGhost: mockRemovePageDragGhost
}));

import { onMouseUp } from '../../js/core/interactions/selection_up.js';

describe('selection_up', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        document.body.innerHTML = `
            <div id="canvas">
                <div class="artboard-wrapper" data-index="0">
                    <div class="artboard" data-index="0">
                        <div class="widget" data-id="widget_1"></div>
                    </div>
                </div>
                <div class="artboard-wrapper" data-index="1">
                    <div class="artboard" data-index="1"></div>
                </div>
                <div class="add-page-placeholder"></div>
                <div id="pageList">
                    <div class="item">Page 1</div>
                    <div class="item">Page 2</div>
                </div>
            </div>
        `;
        mockAppState.currentPageIndex = 0;
        mockAppState.zoomLevel = 1;
        mockAppState.pages = [{ widgets: [] }, { widgets: [] }];
        mockAppState.moveWidgetToPage.mockReturnValue(true);
        mockAppState.getWidgetById.mockImplementation((id) => id ? ({
            widget_1: { id: 'widget_1', x: 10, y: 15, width: 20, height: 10, locked: false }
        }[id] ?? null) : null);
        document.querySelector('.artboard[data-index="1"]').getBoundingClientRect = () => ({
            left: 10,
            top: 20,
            width: 100,
            height: 80,
            right: 110,
            bottom: 100,
            x: 10,
            y: 20,
            toJSON() {}
        });
    });

    it('moves widgets across pages and focuses the drop target page', () => {
        Object.defineProperty(document, 'elementFromPoint', {
            configurable: true,
            value: vi.fn(() => document.querySelector('.artboard[data-index="1"]'))
        });

        const canvas = document.getElementById('canvas');
        const canvasInstance = {
            canvas,
            suppressNextFocus: false,
            _boundMouseMove: vi.fn(),
            _boundMouseUp: vi.fn(),
            dragState: {
                id: 'widget_1',
                mode: 'move',
                widgets: [{ id: 'widget_1', startX: 10, startY: 15, clickOffsetX: 5, clickOffsetY: 6 }]
            }
        };

        onMouseUp(new MouseEvent('mouseup', { clientX: 60, clientY: 70 }), canvasInstance);

        expect(mockRemoveDragGhost).toHaveBeenCalledWith(canvasInstance);
        expect(mockAppState.moveWidgetToPage).toHaveBeenCalledWith('widget_1', 1, 45, 44);
        expect(mockAppState.setCurrentPageIndex).toHaveBeenCalledWith(1, { suppressFocus: true });
        expect(mockRender).toHaveBeenCalledWith(canvasInstance);
    });

    it('moves widgets to the page selected from the page list without suppressing focus', () => {
        Object.defineProperty(document, 'elementFromPoint', {
            configurable: true,
            value: vi.fn(() => document.querySelector('#pageList .item:nth-child(2)'))
        });

        const canvas = document.getElementById('canvas');
        const canvasInstance = {
            canvas,
            suppressNextFocus: false,
            _boundMouseMove: vi.fn(),
            _boundMouseUp: vi.fn(),
            dragState: {
                id: 'widget_1',
                mode: 'move',
                widgets: [{ id: 'widget_1', startX: 10, startY: 15, clickOffsetX: 5, clickOffsetY: 6 }]
            }
        };

        onMouseUp(new MouseEvent('mouseup', { clientX: 60, clientY: 70 }), canvasInstance);

        expect(mockAppState.moveWidgetToPage).toHaveBeenCalledWith('widget_1', 1, 45, 44);
        expect(mockAppState.setCurrentPageIndex).toHaveBeenCalledWith(1, { suppressFocus: false });
        expect(mockRender).toHaveBeenCalledWith(canvasInstance);
    });

    it('reorders pages and performs drag cleanup when dropping a page header', () => {
        Object.defineProperty(document, 'elementFromPoint', {
            configurable: true,
            value: vi.fn(() => document.querySelector('.artboard-wrapper[data-index="1"]'))
        });

        const canvas = document.getElementById('canvas');
        const canvasInstance = {
            canvas,
            _boundMouseMove: vi.fn(),
            _boundMouseUp: vi.fn(),
            dragState: {
                id: 'widget_1',
                mode: 'reorder-page',
                pageIndex: 0,
                widgets: []
            },
            rulers: { setIndicators: vi.fn() }
        };

        onMouseUp(new MouseEvent('mouseup', { clientX: 80, clientY: 90 }), canvasInstance);

        expect(mockRemovePageDragGhost).toHaveBeenCalledWith(canvasInstance, 0);
        expect(mockAppState.reorderPage).toHaveBeenCalledWith(0, 1);
        expect(canvasInstance.dragState).toBeNull();
        expect(canvasInstance.rulers.setIndicators).toHaveBeenCalledWith(null);
        expect(mockUpdateWidgetGridCell).toHaveBeenCalledWith('widget_1');
        expect(mockAppState.recordHistory).toHaveBeenCalled();
        expect(mockEmit).toHaveBeenCalledWith('STATE_CHANGED');
        expect(mockRender).toHaveBeenCalledWith(canvasInstance);
    });

    it('clears lasso selections and refocuses the active page on empty double-click lassos', () => {
        const preventDefault = vi.fn();
        const stopPropagation = vi.fn();
        const canvasInstance = {
            _boundMouseMove: vi.fn(),
            _boundMouseUp: vi.fn(),
            lassoEl: document.createElement('div'),
            lassoState: {
                rect: null,
                isAdditive: false,
                focusParams: { fitZoom: true },
                currentSelection: []
            }
        };

        onMouseUp({ preventDefault, stopPropagation }, canvasInstance);

        expect(mockAppState.selectWidgets).toHaveBeenCalledWith([]);
        expect(mockFocusPage).toHaveBeenCalledWith(canvasInstance, 0, true, true);
        expect(canvasInstance.lassoState).toBeNull();
        expect(canvasInstance.lassoEl).toBeNull();
        expect(mockRender).toHaveBeenCalledWith(canvasInstance);
        expect(preventDefault).toHaveBeenCalled();
        expect(stopPropagation).toHaveBeenCalled();
    });
});
