import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const {
    mockAppState,
    mockEmit,
    mockSnapToGridCell,
    mockApplySnapToPosition,
    mockClearSnapGuides,
    mockRender,
    mockApplyZoom,
    mockFocusPage,
    mockLogger,
    mockRadialMenu
} = vi.hoisted(() => ({
    mockAppState: {
        currentPageIndex: 0,
        zoomLevel: 1,
        setZoomLevel: vi.fn(),
        getWidgetById: vi.fn(),
        getCanvasDimensions: vi.fn(() => ({ width: 200, height: 100 })),
        getCurrentPage: vi.fn(),
        selectWidget: vi.fn(),
        selectWidgets: vi.fn(),
        updateWidget: vi.fn(),
        recordHistory: vi.fn()
    },
    mockEmit: vi.fn(),
    mockSnapToGridCell: vi.fn(),
    mockApplySnapToPosition: vi.fn(),
    mockClearSnapGuides: vi.fn(),
    mockRender: vi.fn(),
    mockApplyZoom: vi.fn(),
    mockFocusPage: vi.fn(),
    mockLogger: {
        log: vi.fn()
    },
    mockRadialMenu: {
        show: vi.fn()
    }
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
    snapToGridCell: mockSnapToGridCell,
    applySnapToPosition: mockApplySnapToPosition,
    clearSnapGuides: mockClearSnapGuides
}));

vi.mock('../../js/core/canvas_renderer.js', () => ({
    render: mockRender,
    applyZoom: mockApplyZoom,
    focusPage: mockFocusPage
}));

vi.mock('../../js/utils/logger.js', () => ({
    Logger: mockLogger
}));

vi.mock('../../js/ui/radial_menu.js', () => ({
    radialMenu: mockRadialMenu
}));

import { setupTouchInteractions } from '../../js/core/canvas_touch.js';

function createTouch(target, clientX, clientY) {
    return { target, clientX, clientY };
}

function dispatchTouch(target, type, { touches = [], changedTouches = touches } = {}) {
    const event = new Event(type, { bubbles: true, cancelable: true });
    Object.defineProperty(event, 'touches', { configurable: true, value: touches });
    Object.defineProperty(event, 'changedTouches', { configurable: true, value: changedTouches });
    target.dispatchEvent(event);
    return event;
}

describe('canvas_touch', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2026-03-25T12:00:00Z'));
        document.body.innerHTML = `
            <div id="viewport" class="canvas-viewport">
                <div id="canvasContainer">
                    <div id="canvas"></div>
                </div>
            </div>
        `;

        mockAppState.zoomLevel = 1;
        mockAppState.setZoomLevel.mockImplementation((value) => {
            mockAppState.zoomLevel = value;
        });
        mockAppState.getCurrentPage.mockReturnValue({ widgets: [] });
        mockSnapToGridCell.mockReturnValue({ x: 0, y: 0 });
        mockApplySnapToPosition.mockImplementation((_canvas, _widget, x, y) => ({ x, y }));
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('handles pinch zoom interactions and resets transient touch state on end', () => {
        const viewport = document.getElementById('viewport');
        const canvas = document.getElementById('canvas');
        viewport.getBoundingClientRect = () => ({
            left: 0,
            top: 0,
            right: 200,
            bottom: 100,
            width: 200,
            height: 100,
            x: 0,
            y: 0,
            toJSON() {}
        });

        const canvasInstance = {
            canvas,
            canvasContainer: document.getElementById('canvasContainer'),
            viewport,
            panX: 0,
            panY: 0
        };

        setupTouchInteractions(canvasInstance);

        dispatchTouch(canvas, 'touchstart', {
            touches: [createTouch(canvas, 0, 0), createTouch(canvas, 100, 0)]
        });

        dispatchTouch(window, 'touchmove', {
            touches: [createTouch(canvas, 0, 0), createTouch(canvas, 200, 0)]
        });

        expect(mockAppState.setZoomLevel).toHaveBeenCalledWith(2);
        expect(mockApplyZoom).toHaveBeenCalledWith(canvasInstance);
        expect(document.body.classList.contains('interaction-active')).toBe(true);

        dispatchTouch(window, 'touchend', {
            touches: [],
            changedTouches: [createTouch(canvas, 0, 0)]
        });

        expect(canvasInstance.touchState).toBeNull();
        expect(canvasInstance.pinchState).toBeNull();
        expect(mockRender).toHaveBeenCalledWith(canvasInstance);
        expect(mockClearSnapGuides).toHaveBeenCalled();
        expect(document.body.classList.contains('interaction-active')).toBe(false);
    });

    it('moves widgets, cancels long-press menus after travel, and snaps on touch end', () => {
        const viewport = document.getElementById('viewport');
        const canvas = document.getElementById('canvas');
        const widgetEl = document.createElement('div');
        widgetEl.className = 'widget';
        widgetEl.dataset.id = 'widget_1';
        canvas.appendChild(widgetEl);
        viewport.getBoundingClientRect = () => ({
            left: 0,
            top: 0,
            right: 200,
            bottom: 100,
            width: 200,
            height: 100,
            x: 0,
            y: 0,
            toJSON() {}
        });

        const widget = { id: 'widget_1', type: 'text', x: 5, y: 10, width: 20, height: 10, props: {} };
        mockAppState.getWidgetById.mockImplementation((id) => id === 'widget_1' ? widget : null);
        mockAppState.getCurrentPage.mockReturnValue({ widgets: [widget] });
        mockApplySnapToPosition.mockReturnValue({ x: 22, y: 44 });

        const canvasInstance = {
            canvas,
            canvasContainer: document.getElementById('canvasContainer'),
            viewport,
            panX: 0,
            panY: 0,
            lastCanvasTapTime: 0
        };

        setupTouchInteractions(canvasInstance);

        dispatchTouch(widgetEl, 'touchstart', {
            touches: [createTouch(widgetEl, 10, 10)]
        });

        dispatchTouch(widgetEl, 'touchmove', {
            touches: [createTouch(widgetEl, 30, 40)]
        });

        expect(canvasInstance.longPressTimer).toBeNull();
        expect(widget.x).toBe(25);
        expect(widget.y).toBe(40);
        expect(widgetEl.style.left).toBe('25px');
        expect(widgetEl.style.top).toBe('40px');

        dispatchTouch(widgetEl, 'touchend', {
            touches: [],
            changedTouches: [createTouch(widgetEl, 30, 40)]
        });

        expect(mockApplySnapToPosition).toHaveBeenCalledWith(
            canvasInstance,
            widget,
            25,
            40,
            false,
            { width: 200, height: 100 }
        );
        expect(widget.x).toBe(22);
        expect(widget.y).toBe(44);
        expect(mockAppState.selectWidgets).toHaveBeenCalledWith([]);
        expect(mockAppState.recordHistory).toHaveBeenCalled();
        expect(mockEmit).toHaveBeenCalledWith('STATE_CHANGED');
    });

    it('resizes widgets and updates grid metadata for layout-driven pages', () => {
        const viewport = document.getElementById('viewport');
        const canvas = document.getElementById('canvas');
        const widgetEl = document.createElement('div');
        widgetEl.className = 'widget';
        widgetEl.dataset.id = 'widget_2';
        const handle = document.createElement('div');
        handle.className = 'widget-resize-handle';
        widgetEl.appendChild(handle);
        canvas.appendChild(widgetEl);
        viewport.getBoundingClientRect = () => ({
            left: 0,
            top: 0,
            right: 200,
            bottom: 100,
            width: 200,
            height: 100,
            x: 0,
            y: 0,
            toJSON() {}
        });

        const widget = { id: 'widget_2', type: 'shape_rect', x: 10, y: 10, width: 40, height: 30, props: { accent: 'blue' } };
        mockAppState.getWidgetById.mockImplementation((id) => id === 'widget_2' ? widget : null);
        mockAppState.getCurrentPage.mockReturnValue({ layout: '2x2', widgets: [widget] });

        const canvasInstance = {
            canvas,
            canvasContainer: document.getElementById('canvasContainer'),
            viewport,
            panX: 0,
            panY: 0,
            lastCanvasTapTime: 0
        };

        setupTouchInteractions(canvasInstance);

        dispatchTouch(handle, 'touchstart', {
            touches: [createTouch(handle, 20, 20)]
        });

        dispatchTouch(handle, 'touchmove', {
            touches: [createTouch(handle, 70, 80)]
        });

        expect(widget.width).toBe(90);
        expect(widget.height).toBe(90);
        expect(widgetEl.style.width).toBe('90px');
        expect(widgetEl.style.height).toBe('90px');

        dispatchTouch(handle, 'touchend', {
            touches: [],
            changedTouches: [createTouch(handle, 70, 80)]
        });

        expect(mockAppState.updateWidget).toHaveBeenCalledWith('widget_2', {
            props: expect.objectContaining({
                accent: 'blue',
                grid_cell_row_pos: 1,
                grid_cell_column_pos: 0,
                grid_cell_row_span: 2,
                grid_cell_column_span: 1
            })
        });
        expect(mockAppState.recordHistory).toHaveBeenCalled();
        expect(mockEmit).toHaveBeenCalledWith('STATE_CHANGED');
    });

    it('selects widgets on tap and opens the radial menu on a quick second tap', () => {
        const viewport = document.getElementById('viewport');
        const canvas = document.getElementById('canvas');
        const widgetEl = document.createElement('div');
        widgetEl.className = 'widget';
        widgetEl.dataset.id = 'widget_3';
        canvas.appendChild(widgetEl);
        viewport.getBoundingClientRect = () => ({
            left: 0,
            top: 0,
            right: 200,
            bottom: 100,
            width: 200,
            height: 100,
            x: 0,
            y: 0,
            toJSON() {}
        });

        const widget = { id: 'widget_3', type: 'text', x: 0, y: 0, width: 20, height: 10, props: {} };
        mockAppState.getWidgetById.mockImplementation((id) => id === 'widget_3' ? widget : null);

        const canvasInstance = {
            canvas,
            canvasContainer: document.getElementById('canvasContainer'),
            viewport,
            panX: 0,
            panY: 0,
            lastWidgetTapId: null,
            lastWidgetTapTime: 0
        };

        setupTouchInteractions(canvasInstance);

        dispatchTouch(widgetEl, 'touchstart', {
            touches: [createTouch(widgetEl, 12, 18)]
        });
        dispatchTouch(widgetEl, 'touchend', {
            touches: [],
            changedTouches: [createTouch(widgetEl, 12, 18)]
        });

        expect(mockAppState.selectWidget).toHaveBeenCalledWith('widget_3');

        vi.advanceTimersByTime(100);
        vi.setSystemTime(new Date('2026-03-25T12:00:00.100Z'));

        dispatchTouch(widgetEl, 'touchstart', {
            touches: [createTouch(widgetEl, 12, 18)]
        });
        dispatchTouch(widgetEl, 'touchend', {
            touches: [],
            changedTouches: [createTouch(widgetEl, 12, 18)]
        });

        expect(mockRadialMenu.show).toHaveBeenCalledWith(12, 18, 'widget_3');
        expect(canvasInstance.lastWidgetTapTime).toBe(0);
    });
});
