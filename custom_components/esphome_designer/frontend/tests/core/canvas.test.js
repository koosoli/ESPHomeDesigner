import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mockRender = vi.fn();
const mockApplyZoom = vi.fn();
const mockRenderToolbar = vi.fn();
const mockRulersUpdate = vi.fn();
const mockRulersIndicators = vi.fn();
const mockSetupInteractions = vi.fn();
const mockSetupPanning = vi.fn();
const mockSetupZoomControls = vi.fn();
const mockSetupDragAndDrop = vi.fn();
const mockSetupTouch = vi.fn();
const mockOn = vi.fn();

const mockAppState = {
    selectedWidgetIds: [],
    showDebugGrid: false,
    currentPageIndex: 0,
    zoomLevel: 1,
    settings: {},
    getCurrentPage: vi.fn(() => ({ widgets: [] }))
};

const setDocumentVisibility = (state) => {
    Object.defineProperty(document, 'visibilityState', {
        configurable: true,
        value: state
    });
};

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

vi.mock('../../js/core/events.js', () => ({
    on: mockOn,
    EVENTS: {
        STATE_CHANGED: 'STATE_CHANGED',
        PAGE_CHANGED: 'PAGE_CHANGED',
        SELECTION_CHANGED: 'SELECTION_CHANGED',
        SETTINGS_CHANGED: 'SETTINGS_CHANGED',
        ZOOM_CHANGED: 'ZOOM_CHANGED'
    }
}));

vi.mock('../../js/core/canvas_renderer.js', () => ({
    render: mockRender,
    applyZoom: mockApplyZoom,
    renderContextToolbar: mockRenderToolbar,
    focusPage: vi.fn(),
    zoomToFitAll: vi.fn()
}));

vi.mock('../../js/core/canvas_rulers.js', () => ({
    CanvasRulers: class {
        update() {
            mockRulersUpdate();
        }
        setIndicators(v) {
            mockRulersIndicators(v);
        }
    }
}));

vi.mock('../../js/core/canvas_interactions.js', () => ({
    setupInteractions: mockSetupInteractions,
    setupPanning: mockSetupPanning,
    setupZoomControls: mockSetupZoomControls,
    setupDragAndDrop: mockSetupDragAndDrop,
    zoomIn: vi.fn(),
    zoomOut: vi.fn(),
    zoomReset: vi.fn(),
    onMouseMove: vi.fn(),
    onMouseUp: vi.fn()
}));

vi.mock('../../js/core/canvas_touch.js', () => ({
    setupTouchInteractions: mockSetupTouch
}));

describe('Canvas core', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        setDocumentVisibility('visible');
        document.body.innerHTML = `
            <div class="canvas-viewport">
                <div id="canvasContainer">
                    <div id="canvas"></div>
                </div>
            </div>
            <button id="zoomToFitAllBtn"></button>
            <div id="pagesHeader"><span class="title">Pages</span></div>
            <div id="zoomLevel"></div>
        `;
        vi.useFakeTimers();
    });

    afterEach(() => {
        vi.clearAllTimers();
        vi.useRealTimers();
    });

    it('initializes, subscribes events, and sets up interactions', async () => {
        const { Canvas } = await import('../../js/core/canvas.js');
        const canvas = new Canvas();

        expect(canvas.canvas).toBeTruthy();
        expect(canvas.canvasContainer).toBeTruthy();
        expect(canvas.viewport).toBeTruthy();
        expect(canvas.canvas.tabIndex).toBe(-1);

        expect(mockOn).toHaveBeenCalled();
        expect(mockSetupPanning).toHaveBeenCalledWith(canvas);
        expect(mockSetupInteractions).toHaveBeenCalledWith(canvas);
        expect(mockSetupZoomControls).toHaveBeenCalledWith(canvas);
        expect(mockSetupDragAndDrop).toHaveBeenCalledWith(canvas);
        expect(mockSetupTouch).toHaveBeenCalledWith(canvas);

        expect(mockRender).toHaveBeenCalledWith(canvas);
        expect(mockApplyZoom).toHaveBeenCalledWith(canvas);
    });

    it('updates selection visuals and triggers toolbar render', async () => {
        const { Canvas } = await import('../../js/core/canvas.js');
        const canvas = new Canvas();

        canvas.canvas.innerHTML = `
            <div class="widget" data-id="w1"></div>
            <div class="widget active" data-id="w2"></div>
        `;

        mockAppState.selectedWidgetIds = ['w1'];
        canvas.updateSelectionVisuals();

        const w1 = canvas.canvas.querySelector('[data-id="w1"]');
        const w2 = canvas.canvas.querySelector('[data-id="w2"]');
        expect(w1?.classList.contains('active')).toBe(true);
        expect(w2?.classList.contains('active')).toBe(false);
        expect(mockRenderToolbar).toHaveBeenCalledWith(canvas);
    });

    it('renders datetime pages on interval and skips during interactions', async () => {
        const { Canvas } = await import('../../js/core/canvas.js');
        const canvas = new Canvas();

        mockAppState.getCurrentPage.mockReturnValue({
            widgets: [{ type: 'datetime' }]
        });

        const initialRenderCalls = mockRender.mock.calls.length;
        vi.advanceTimersByTime(1100);
        expect(mockRender.mock.calls.length).toBeGreaterThan(initialRenderCalls);

        canvas.dragState = { mode: 'move' };
        const beforeBlockedTick = mockRender.mock.calls.length;
        vi.advanceTimersByTime(1100);
        expect(mockRender.mock.calls.length).toBe(beforeBlockedTick);

        canvas.dragState = null;
        setDocumentVisibility('hidden');
        const beforeHiddenTick = mockRender.mock.calls.length;
        vi.advanceTimersByTime(1100);
        expect(mockRender.mock.calls.length).toBe(beforeHiddenTick);
    });

    it('cleans up interval and resize listener on destroy', async () => {
        const removeListenerSpy = vi.spyOn(window, 'removeEventListener');
        const { Canvas } = await import('../../js/core/canvas.js');
        const canvas = new Canvas();

        canvas.destroy();

        expect(canvas.updateInterval).toBeNull();
        expect(removeListenerSpy).toHaveBeenCalledWith('resize', expect.any(Function));
    });
});
