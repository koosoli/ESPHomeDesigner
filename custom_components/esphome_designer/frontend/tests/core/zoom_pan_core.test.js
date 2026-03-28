import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const {
    mockAppState,
    mockLogger,
    mockEmit,
    mockApplyZoom
} = vi.hoisted(() => ({
    mockAppState: {
        zoomLevel: 1,
        showGrid: false,
        showDebugGrid: false,
        showRulers: false,
        setShowGrid: vi.fn(),
        setShowDebugGrid: vi.fn(),
        setShowRulers: vi.fn(),
        updateSettings: vi.fn(),
        setZoomLevel: vi.fn(),
        groupSelection: vi.fn(),
        ungroupSelection: vi.fn()
    },
    mockLogger: {
        log: vi.fn()
    },
    mockEmit: vi.fn(),
    mockApplyZoom: vi.fn()
}));

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

vi.mock('../../js/utils/logger.js', () => ({
    Logger: mockLogger
}));

vi.mock('../../js/core/events.js', () => ({
    emit: mockEmit,
    EVENTS: {
        STATE_CHANGED: 'STATE_CHANGED'
    }
}));

vi.mock('../../js/core/canvas_renderer.js', () => ({
    applyZoom: mockApplyZoom
}));

import { setupPanning, setupZoomControls, zoomIn, zoomOut, zoomReset } from '../../js/core/interactions/zoom_pan.js';

describe('zoom_pan core', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        document.body.innerHTML = `
            <button id="zoomInBtn"></button>
            <button id="zoomOutBtn"></button>
            <button id="zoomResetBtn"></button>
            <button id="gridToggleBtn"></button>
            <button id="debugGridToggleBtn"></button>
            <button id="rulersToggleBtn"></button>
            <input id="editorGridOpacity" value="30" />
            <div id="canvasContainer"></div>
            <div id="viewport"></div>
        `;
        mockAppState.zoomLevel = 1;
        mockAppState.showGrid = false;
        mockAppState.showDebugGrid = false;
        mockAppState.showRulers = false;
        mockAppState.setZoomLevel.mockImplementation((value) => {
            mockAppState.zoomLevel = value;
        });
        mockAppState.setShowGrid.mockImplementation((value) => {
            mockAppState.showGrid = value;
        });
        mockAppState.setShowDebugGrid.mockImplementation((value) => {
            mockAppState.showDebugGrid = value;
        });
        mockAppState.setShowRulers.mockImplementation((value) => {
            mockAppState.showRulers = value;
        });
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it('pans with the middle mouse button and cleans up listeners on mouseup', () => {
        const viewport = document.getElementById('viewport');
        const canvasInstance = {
            viewport,
            panX: 10,
            panY: 20,
            panState: null
        };

        setupPanning(canvasInstance);

        viewport.dispatchEvent(new MouseEvent('mousedown', {
            button: 1,
            bubbles: true,
            cancelable: true,
            clientX: 50,
            clientY: 80
        }));

        window.dispatchEvent(new MouseEvent('mousemove', { clientX: 70, clientY: 95 }));

        expect(canvasInstance.panX).toBe(30);
        expect(canvasInstance.panY).toBe(35);
        expect(mockApplyZoom).toHaveBeenCalledWith(canvasInstance);
        expect(document.body.classList.contains('panning-active')).toBe(true);

        window.dispatchEvent(new MouseEvent('mouseup'));
        expect(canvasInstance.panState).toBeNull();
        expect(document.body.classList.contains('panning-active')).toBe(false);
        expect(viewport.style.cursor).toBe('auto');
    });

    it('wires zoom controls, toggles editor flags, and handles wheel interactions', () => {
        const canvasContainer = document.getElementById('canvasContainer');
        const viewport = document.getElementById('viewport');
        viewport.getBoundingClientRect = () => ({ left: 0, top: 0, width: 200, height: 100, right: 200, bottom: 100, x: 0, y: 0, toJSON() {} });

        const canvasInstance = {
            canvasContainer,
            viewport,
            panX: 0,
            panY: 0,
            focusPage: vi.fn()
        };

        setupZoomControls(canvasInstance);

        document.getElementById('gridToggleBtn').click();
        expect(mockAppState.setShowGrid).toHaveBeenCalledWith(true);
        expect(mockAppState.setShowDebugGrid).toHaveBeenCalledWith(false);
        expect(mockEmit).toHaveBeenCalledWith('STATE_CHANGED');

        document.getElementById('debugGridToggleBtn').click();
        expect(mockAppState.setShowDebugGrid).toHaveBeenCalledWith(true);
        expect(mockAppState.setShowGrid).toHaveBeenLastCalledWith(false);

        document.getElementById('rulersToggleBtn').click();
        expect(mockAppState.setShowRulers).toHaveBeenCalledWith(true);

        const input = /** @type {HTMLInputElement} */ (document.getElementById('editorGridOpacity'));
        input.value = '42';
        input.dispatchEvent(new Event('input', { bubbles: true }));
        expect(mockAppState.updateSettings).toHaveBeenCalledWith({ grid_opacity: 42 });

        const zoomWheel = new WheelEvent('wheel', {
            deltaY: -100,
            deltaX: 0,
            deltaMode: 0,
            clientX: 100,
            clientY: 50,
            bubbles: true,
            cancelable: true
        });
        canvasContainer.dispatchEvent(zoomWheel);
        expect(mockAppState.setZoomLevel).toHaveBeenCalledWith(1.05);
        expect(mockApplyZoom).toHaveBeenCalledWith(canvasInstance);

        canvasInstance.panX = 0;
        canvasInstance.panY = 0;

        const panWheel = new WheelEvent('wheel', {
            deltaY: 12,
            deltaX: 5,
            deltaMode: 0,
            clientX: 50,
            clientY: 30,
            bubbles: true,
            cancelable: true
        });
        viewport.dispatchEvent(panWheel);
        expect(canvasInstance.panX).toBe(-5);
        expect(canvasInstance.panY).toBe(-12);
    });

    it('supports exported zoom helpers and keyboard shortcuts', () => {
        const viewport = document.getElementById('viewport');
        viewport.getBoundingClientRect = () => ({ left: 0, top: 0, width: 200, height: 100, right: 200, bottom: 100, x: 0, y: 0, toJSON() {} });

        const canvasInstance = {
            canvasContainer: document.getElementById('canvasContainer'),
            viewport,
            panX: 0,
            panY: 0,
            focusPage: vi.fn()
        };

        setupZoomControls(canvasInstance);

        zoomIn(canvasInstance);
        expect(mockAppState.zoomLevel).toBe(1.05);

        zoomOut(canvasInstance);
        expect(mockAppState.zoomLevel).toBe(1);

        zoomReset(canvasInstance);
        expect(mockAppState.setZoomLevel).toHaveBeenLastCalledWith(1);
        expect(canvasInstance.focusPage).toHaveBeenCalled();

        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'g', ctrlKey: true, bubbles: true }));
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'G', ctrlKey: true, shiftKey: true, bubbles: true }));

        expect(mockAppState.groupSelection).toHaveBeenCalled();
        expect(mockAppState.ungroupSelection).toHaveBeenCalled();
    });
});
