import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const {
    mockAppState,
    mockLogger,
    mockWidgetFactory,
    mockRegistry
} = vi.hoisted(() => ({
    mockAppState: {
        pages: [{ widgets: [] }],
        currentPageIndex: 0,
        zoomLevel: 1,
        getCanvasDimensions: vi.fn(() => ({ width: 100, height: 80 })),
        addPage: vi.fn(),
        addWidget: vi.fn(),
        setCurrentPageIndex: vi.fn(),
        selectWidget: vi.fn()
    },
    mockLogger: {
        log: vi.fn(),
        warn: vi.fn(),
        error: vi.fn()
    },
    mockWidgetFactory: {
        createWidget: vi.fn()
    },
    mockRegistry: {
        load: vi.fn()
    }
}));

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

vi.mock('../../js/utils/logger.js', () => ({
    Logger: mockLogger
}));

vi.mock('../../js/core/widget_factory', () => ({
    WidgetFactory: mockWidgetFactory
}));

vi.mock('../../js/core/plugin_registry', () => ({
    registry: mockRegistry
}));

import { setupDragAndDrop } from '../../js/core/interactions/drag_drop.js';

function createDndEvent(type, dataTransfer, extra = {}) {
    const event = new Event(type, { bubbles: true, cancelable: true });
    Object.defineProperty(event, 'dataTransfer', { value: dataTransfer });
    Object.entries(extra).forEach(([key, value]) => {
        Object.defineProperty(event, key, { value });
    });
    return event;
}

describe('drag_drop core', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.useFakeTimers();
        document.body.innerHTML = `
            <div id="viewport">
                <div class="artboard-wrapper" data-index="0">
                    <div class="artboard" data-index="0"></div>
                </div>
                <div class="artboard-wrapper" data-index="1">
                    <div class="artboard" data-index="1"></div>
                </div>
                <div class="add-page-placeholder"></div>
            </div>
        `;

        mockAppState.pages = [{ widgets: [] }];
        mockAppState.currentPageIndex = 0;
        mockAppState.addPage.mockImplementation(() => {
            mockAppState.pages.push({ widgets: [] });
            return mockAppState.pages[mockAppState.pages.length - 1];
        });
        mockAppState.setCurrentPageIndex.mockImplementation((index) => {
            mockAppState.currentPageIndex = index;
        });
        mockRegistry.load.mockResolvedValue(undefined);
        mockWidgetFactory.createWidget.mockReturnValue({
            id: 'widget_new',
            width: 20,
            height: 10
        });
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
    });

    it('tracks external drag hover state and clears it when leaving the viewport', () => {
        const viewport = document.getElementById('viewport');
        const canvasInstance = { viewport, canvas: viewport, dragState: null, isExternalDragging: false };

        setupDragAndDrop(canvasInstance);

        viewport.dispatchEvent(createDndEvent('dragenter', { getData: () => '' }));
        expect(canvasInstance.isExternalDragging).toBe(true);

        const wrapper = document.querySelector('.artboard-wrapper[data-index="0"]');
        wrapper.dispatchEvent(createDndEvent('dragover', { getData: () => '' }, { target: wrapper }));
        expect(wrapper.classList.contains('drag-over')).toBe(true);

        const leaveEvent = createDndEvent('dragleave', { getData: () => '' }, { relatedTarget: null });
        viewport.dispatchEvent(leaveEvent);
        expect(canvasInstance.isExternalDragging).toBe(false);
        expect(document.querySelectorAll('.drag-over')).toHaveLength(0);
    });

    it('drops widgets onto existing artboards and selects the new widget on the target page', async () => {
        const viewport = document.getElementById('viewport');
        const artboard = document.querySelector('.artboard[data-index="0"]');
        artboard.getBoundingClientRect = () => ({ left: 10, top: 20, right: 0, bottom: 0, width: 100, height: 80, x: 0, y: 0, toJSON() {} });

        const canvasInstance = { viewport, canvas: viewport, dragState: null, isExternalDragging: false, suppressNextFocus: false };
        setupDragAndDrop(canvasInstance);

        const dataTransfer = {
            getData: vi.fn((kind) => kind === 'application/widget-type' ? 'sensor_text' : '')
        };

        artboard.dispatchEvent(createDndEvent('drop', dataTransfer, {
            clientX: 50,
            clientY: 40,
            target: artboard
        }));

        await vi.runAllTimersAsync();

        expect(mockRegistry.load).toHaveBeenCalledWith('sensor_text');
        expect(mockLogger.error).not.toHaveBeenCalled();
        expect(mockAppState.addWidget).toHaveBeenCalledWith(expect.objectContaining({
            id: 'widget_new',
            x: 30,
            y: 15
        }), 0);
        expect(mockAppState.selectWidget).toHaveBeenCalledWith('widget_new', false);
        expect(canvasInstance.suppressNextFocus).toBe(true);
    });

    it('creates a page when dropping on the add-page placeholder and re-targets the drop', async () => {
        const viewport = document.getElementById('viewport');
        const placeholder = document.querySelector('.add-page-placeholder');
        const newArtboard = document.querySelector('.artboard[data-index="1"]');
        newArtboard.getBoundingClientRect = () => ({ left: 0, top: 0, right: 0, bottom: 0, width: 100, height: 80, x: 0, y: 0, toJSON() {} });

        const canvasInstance = { viewport, canvas: viewport, dragState: null, isExternalDragging: false, suppressNextFocus: false };
        setupDragAndDrop(canvasInstance);

        const dataTransfer = {
            getData: vi.fn((kind) => kind === 'application/widget-type' ? 'graph' : '')
        };

        placeholder.dispatchEvent(createDndEvent('drop', dataTransfer, {
            clientX: 15,
            clientY: 20,
            target: placeholder
        }));

        await vi.advanceTimersByTimeAsync(60);
        await Promise.resolve();

        expect(mockAppState.addPage).toHaveBeenCalled();
        expect(mockAppState.addWidget).toHaveBeenCalledWith(expect.objectContaining({
            id: 'widget_new'
        }), 1);
        expect(mockAppState.setCurrentPageIndex).toHaveBeenCalledWith(1);
        expect(mockAppState.selectWidget).toHaveBeenCalledWith('widget_new', false);
    });
});
