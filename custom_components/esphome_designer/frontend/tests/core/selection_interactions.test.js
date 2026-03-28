import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockRender = vi.fn();
const mockFocusPage = vi.fn();
const mockRadialMenu = {
    active: false,
    show: vi.fn(),
    hide: vi.fn()
};

const mockAppState = {
    currentPageIndex: 0,
    zoomLevel: 1,
    showDebugGrid: false,
    selectWidgets: vi.fn()
};

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

vi.mock('../../js/ui/radial_menu.js', () => ({
    radialMenu: mockRadialMenu
}));

vi.mock('../../js/core/events.js', () => ({
    emit: vi.fn(),
    EVENTS: {
        STATE_CHANGED: 'STATE_CHANGED'
    }
}));

vi.mock('../../js/core/canvas_snap.js', () => ({
    snapToGridCell: vi.fn(),
    applySnapToPosition: vi.fn(),
    clearSnapGuides: vi.fn(),
    updateWidgetGridCell: vi.fn(),
    snapResizeValue: vi.fn()
}));

vi.mock('../../js/core/canvas_renderer.js', () => ({
    render: mockRender,
    updateWidgetDOM: vi.fn(),
    focusPage: mockFocusPage
}));

vi.mock('../../js/core/interactions/drag_ghost.js', () => ({
    createDragGhost: vi.fn(),
    updateDragGhost: vi.fn(),
    updateDragGhostPosition: vi.fn(),
    removeDragGhost: vi.fn(),
    createPageDragGhost: vi.fn(),
    updatePageDragGhost: vi.fn(),
    removePageDragGhost: vi.fn()
}));

vi.mock('../../js/core/interactions/inline_edit.js', () => ({
    startInlineEdit: vi.fn()
}));

describe('selection interactions', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        document.body.innerHTML = '';
        mockRadialMenu.active = false;
    });

    it('clears lasso interaction state before applying the final selection', async () => {
        let lassoStateAtSelection = 'unobserved';
        mockAppState.selectWidgets.mockImplementation(() => {
            lassoStateAtSelection = canvasInstance.lassoState;
        });

        const { onMouseUp } = await import('../../js/core/interactions/selection.js');

        const lassoEl = document.createElement('div');
        document.body.appendChild(lassoEl);

        const canvasInstance = {
            dragState: null,
            lassoState: {
                rect: { x: 0, y: 0, w: 10, h: 10 },
                currentSelection: ['w1', 'w2'],
                isAdditive: false,
                focusParams: null
            },
            lassoEl,
            _boundMouseMove: vi.fn(),
            _boundMouseUp: vi.fn()
        };

        const event = new MouseEvent('mouseup', { bubbles: true });
        onMouseUp(event, canvasInstance);

        expect(lassoStateAtSelection).toBeNull();
        expect(mockAppState.selectWidgets).toHaveBeenCalledWith(['w1', 'w2']);
        expect(canvasInstance.lassoState).toBeNull();
        expect(canvasInstance.lassoEl).toBeNull();
        expect(mockRender).toHaveBeenCalledWith(canvasInstance);
    });

    it('shows the custom context menu only for canvas surfaces and widgets', async () => {
        const { setupInteractions } = await import('../../js/core/interactions/selection.js');

        document.body.innerHTML = `
            <div id="canvas">
                <div class="artboard-wrapper" data-index="0">
                    <div class="artboard">
                        <div class="widget" data-id="widget_1"></div>
                    </div>
                </div>
                <button id="overlayButton">Overlay</button>
            </div>
        `;

        const canvasEl = document.getElementById('canvas');
        const canvasInstance = {
            canvas: canvasEl,
            rulers: null,
            pinchState: null,
            touchState: null,
            dragState: null,
            lassoState: null
        };

        setupInteractions(canvasInstance);

        const artboardEvent = new MouseEvent('contextmenu', { bubbles: true, cancelable: true, clientX: 12, clientY: 34 });
        document.querySelector('.artboard')?.dispatchEvent(artboardEvent);

        expect(artboardEvent.defaultPrevented).toBe(true);
        expect(mockRadialMenu.show).toHaveBeenCalledWith(12, 34, undefined);

        const widgetEvent = new MouseEvent('contextmenu', { bubbles: true, cancelable: true, clientX: 56, clientY: 78 });
        document.querySelector('.widget')?.dispatchEvent(widgetEvent);

        expect(widgetEvent.defaultPrevented).toBe(true);
        expect(mockRadialMenu.show).toHaveBeenLastCalledWith(56, 78, 'widget_1');

        const overlayEvent = new MouseEvent('contextmenu', { bubbles: true, cancelable: true, clientX: 90, clientY: 91 });
        document.getElementById('overlayButton')?.dispatchEvent(overlayEvent);

        expect(overlayEvent.defaultPrevented).toBe(false);
        expect(mockRadialMenu.show).toHaveBeenCalledTimes(2);
    });

    it('suppresses the canvas context menu during active gesture states', async () => {
        const { setupInteractions } = await import('../../js/core/interactions/selection.js');

        document.body.innerHTML = `
            <div id="canvas">
                <div class="artboard-wrapper" data-index="0">
                    <div class="artboard"></div>
                </div>
            </div>
        `;

        const canvasEl = document.getElementById('canvas');
        const canvasInstance = {
            canvas: canvasEl,
            rulers: null,
            pinchState: { active: true },
            touchState: null,
            dragState: null,
            lassoState: null
        };

        setupInteractions(canvasInstance);

        mockRadialMenu.active = true;
        const event = new MouseEvent('contextmenu', { bubbles: true, cancelable: true, clientX: 10, clientY: 10 });
        document.querySelector('.artboard')?.dispatchEvent(event);

        expect(event.defaultPrevented).toBe(true);
        expect(mockRadialMenu.show).not.toHaveBeenCalled();
        expect(mockRadialMenu.hide).toHaveBeenCalled();
    });
});
