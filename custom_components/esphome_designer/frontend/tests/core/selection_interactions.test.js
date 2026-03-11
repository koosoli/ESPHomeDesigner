import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockRender = vi.fn();
const mockFocusPage = vi.fn();

const mockAppState = {
    currentPageIndex: 0,
    zoomLevel: 1,
    selectWidgets: vi.fn()
};

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

vi.mock('../../js/ui/radial_menu.js', () => ({
    radialMenu: null
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
});
