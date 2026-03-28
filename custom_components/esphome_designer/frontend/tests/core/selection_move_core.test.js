import { beforeEach, describe, expect, it, vi } from 'vitest';

const {
    mockAppState,
    mockSnapToGridCell,
    mockApplySnapToPosition,
    mockClearSnapGuides,
    mockSnapResizeValue,
    mockUpdateWidgetDOM,
    mockUpdateDragGhostPosition,
    mockUpdatePageDragGhost
} = vi.hoisted(() => ({
    mockAppState: {
        currentPageIndex: 0,
        zoomLevel: 1,
        snapEnabled: true,
        getCanvasDimensions: vi.fn(() => ({ width: 200, height: 100 })),
        getWidgetById: vi.fn(),
        getCurrentPage: vi.fn(),
        selectWidgets: vi.fn()
    },
    mockSnapToGridCell: vi.fn(),
    mockApplySnapToPosition: vi.fn(),
    mockClearSnapGuides: vi.fn(),
    mockSnapResizeValue: vi.fn((value) => value),
    mockUpdateWidgetDOM: vi.fn(),
    mockUpdateDragGhostPosition: vi.fn(),
    mockUpdatePageDragGhost: vi.fn()
}));

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

vi.mock('../../js/core/canvas_snap.js', () => ({
    snapToGridCell: mockSnapToGridCell,
    applySnapToPosition: mockApplySnapToPosition,
    clearSnapGuides: mockClearSnapGuides,
    snapResizeValue: mockSnapResizeValue
}));

vi.mock('../../js/core/canvas_renderer.js', () => ({
    updateWidgetDOM: mockUpdateWidgetDOM
}));

vi.mock('../../js/core/interactions/drag_ghost.js', () => ({
    updateDragGhostPosition: mockUpdateDragGhostPosition,
    updatePageDragGhost: mockUpdatePageDragGhost
}));

import { onMouseMove } from '../../js/core/interactions/selection_move.js';

describe('selection_move core', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        document.body.innerHTML = '';
    });

    it('moves widgets with snap helpers and carries unlocked group children with the drag delta', () => {
        const artboard = document.createElement('div');
        artboard.className = 'artboard';
        artboard.dataset.index = '0';
        artboard.getBoundingClientRect = () => ({ left: 100, top: 200, right: 0, bottom: 0, width: 0, height: 0, x: 0, y: 0, toJSON() {} });
        document.body.appendChild(artboard);

        const group = { id: 'group_1', type: 'group', x: 10, y: 15, width: 30, height: 20 };
        const child = { id: 'child_1', type: 'text', x: 5, y: 5, width: 10, height: 10, parentId: 'group_1' };
        mockAppState.getWidgetById.mockImplementation((id) => ({ group_1: group, child_1: child }[id]));
        mockAppState.getCurrentPage.mockReturnValue({ widgets: [group, child] });
        mockApplySnapToPosition.mockReturnValue({ x: 40, y: 30 });

        const rulers = { setIndicators: vi.fn() };
        const canvasInstance = {
            panX: 0,
            panY: 0,
            rulers,
            dragState: {
                mode: 'move',
                id: 'group_1',
                dragStartX: 0,
                dragStartY: 0,
                dragStartPanX: 0,
                dragStartPanY: 0,
                widgets: [{ id: 'group_1', startX: 10, startY: 15 }]
            }
        };

        onMouseMove(new MouseEvent('mousemove', { clientX: 12, clientY: 8, ctrlKey: true }), canvasInstance);

        expect(mockApplySnapToPosition).toHaveBeenCalled();
        expect(group.x).toBe(40);
        expect(group.y).toBe(30);
        expect(child.x).toBe(35);
        expect(child.y).toBe(20);
        expect(canvasInstance.dragState.lastDx).toBe(30);
        expect(canvasInstance.dragState.lastDy).toBe(15);
        expect(mockUpdateDragGhostPosition).toHaveBeenCalledWith(canvasInstance, 140, 230);
        expect(rulers.setIndicators).toHaveBeenCalledWith({ x: 40, y: 30, w: 30, h: 20 });
    });

    it('uses grid snapping when page layout metadata is present', () => {
        const artboard = document.createElement('div');
        artboard.className = 'artboard';
        artboard.dataset.index = '0';
        artboard.getBoundingClientRect = () => ({ left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0, x: 0, y: 0, toJSON() {} });
        document.body.appendChild(artboard);

        const widget = { id: 'grid_widget', type: 'shape_rect', x: 0, y: 0, width: 40, height: 20 };
        mockAppState.getWidgetById.mockReturnValue(widget);
        mockAppState.getCurrentPage.mockReturnValue({ layout: '2x2', widgets: [widget] });
        mockSnapToGridCell.mockReturnValue({ x: 60, y: 20 });

        const canvasInstance = {
            panX: 0,
            panY: 0,
            dragState: {
                mode: 'move',
                id: 'grid_widget',
                dragStartX: 0,
                dragStartY: 0,
                dragStartPanX: 0,
                dragStartPanY: 0,
                widgets: [{ id: 'grid_widget', startX: 0, startY: 0 }]
            }
        };

        onMouseMove(new MouseEvent('mousemove', { clientX: 5, clientY: 5 }), canvasInstance);

        expect(mockClearSnapGuides).toHaveBeenCalled();
        expect(mockSnapToGridCell).toHaveBeenCalledWith(5, 5, 40, 20, '2x2', { width: 200, height: 100 });
        expect(widget.x).toBe(60);
        expect(widget.y).toBe(20);
    });

    it('resizes special widget types while enforcing line orientation, icon sizing, and circular bounds', () => {
        const lineWidget = {
            id: 'line_widget',
            type: 'lvgl_line',
            x: 10,
            y: 20,
            width: 100,
            height: 10,
            props: { orientation: 'vertical', line_width: 5 }
        };
        mockAppState.getWidgetById.mockReturnValueOnce(lineWidget);

        const canvasInstance = {
            panX: 0,
            panY: 0,
            rulers: { setIndicators: vi.fn() },
            dragState: {
                mode: 'resize',
                id: 'line_widget',
                handle: 'br',
                startX: 0,
                startY: 0,
                dragStartPanX: 0,
                dragStartPanY: 0,
                startWidgetX: 10,
                startWidgetY: 20,
                startW: 100,
                startH: 10,
                artboardEl: document.body
            }
        };

        onMouseMove(new MouseEvent('mousemove', { clientX: 40, clientY: 50 }), canvasInstance);

        expect(mockClearSnapGuides).toHaveBeenCalled();
        expect(lineWidget.width).toBe(5);
        expect(lineWidget.height).toBe(60);
        expect(mockUpdateWidgetDOM).toHaveBeenCalledWith(canvasInstance, lineWidget);

        const iconWidget = {
            id: 'icon_widget',
            type: 'icon',
            x: 0,
            y: 0,
            width: 30,
            height: 30,
            props: { fit_icon_to_frame: true }
        };
        mockAppState.getWidgetById.mockReturnValueOnce(iconWidget);
        canvasInstance.dragState = {
            mode: 'resize',
            id: 'icon_widget',
            handle: 'br',
            startX: 0,
            startY: 0,
            dragStartPanX: 0,
            dragStartPanY: 0,
            startWidgetX: 0,
            startWidgetY: 0,
            startW: 30,
            startH: 30,
            artboardEl: document.body
        };

        onMouseMove(new MouseEvent('mousemove', { clientX: 50, clientY: 40 }), canvasInstance);
        expect(iconWidget.props.size).toBe(62);

        const circleWidget = {
            id: 'circle_widget',
            type: 'shape_circle',
            x: 0,
            y: 0,
            width: 20,
            height: 40,
            props: {}
        };
        mockAppState.getWidgetById.mockReturnValueOnce(circleWidget);
        canvasInstance.dragState = {
            mode: 'resize',
            id: 'circle_widget',
            handle: 'br',
            startX: 0,
            startY: 0,
            dragStartPanX: 0,
            dragStartPanY: 0,
            startWidgetX: 0,
            startWidgetY: 0,
            startW: 20,
            startH: 40,
            artboardEl: document.body
        };

        onMouseMove(new MouseEvent('mousemove', { clientX: 10, clientY: 20 }), canvasInstance);
        expect(circleWidget.width).toBe(circleWidget.height);
    });

    it('updates page reorder highlighting and lasso selections', () => {
        document.body.innerHTML = `
            <div class="artboard-wrapper" data-index="0"><div class="hit"></div></div>
            <div class="artboard-wrapper" data-index="1"><div class="hit"></div></div>
            <div class="widget" data-id="w1"></div>
            <div class="widget" data-id="w2"></div>
        `;

        const wrappers = document.querySelectorAll('.artboard-wrapper');
        Object.defineProperty(document, 'elementFromPoint', {
            configurable: true,
            value: vi.fn(() => wrappers[1].querySelector('.hit'))
        });

        const reorderCanvas = {
            dragState: {
                mode: 'reorder-page',
                pageIndex: 0
            }
        };

        onMouseMove(new MouseEvent('mousemove', { clientX: 10, clientY: 10 }), reorderCanvas);

        expect(mockUpdatePageDragGhost).toHaveBeenCalled();
        expect(wrappers[1].classList.contains('drag-over')).toBe(true);

        const pageWidgets = [
            { id: 'w1', x: 5, y: 5, width: 20, height: 20 },
            { id: 'w2', x: 60, y: 60, width: 20, height: 20 }
        ];
        mockAppState.getCurrentPage.mockReturnValue({ widgets: pageWidgets });

        const lassoEl = document.createElement('div');
        document.body.appendChild(lassoEl);
        const lassoCanvas = {
            canvas: document.body,
            lassoEl,
            lassoState: {
                artboardEl: {
                    getBoundingClientRect: () => ({ left: 0, top: 0, right: 0, bottom: 0, width: 0, height: 0, x: 0, y: 0, toJSON() {} })
                },
                startX: 0,
                startY: 0,
                rect: null,
                isAdditive: false,
                initialSelection: [],
                currentSelection: []
            }
        };

        const event = new MouseEvent('mousemove', { clientX: 30, clientY: 30, bubbles: true, cancelable: true });
        onMouseMove(event, lassoCanvas);

        expect(lassoCanvas.lassoState.currentSelection).toEqual(['w1']);
        expect(mockAppState.selectWidgets).toHaveBeenCalledWith(['w1']);
        expect(document.querySelector('.widget[data-id="w1"]')?.classList.contains('active')).toBe(true);
        expect(document.querySelector('.widget[data-id="w2"]')?.classList.contains('active')).toBe(false);
        expect(lassoEl.style.width).toBe('30px');
        expect(event.defaultPrevented).toBe(true);
    });
});
