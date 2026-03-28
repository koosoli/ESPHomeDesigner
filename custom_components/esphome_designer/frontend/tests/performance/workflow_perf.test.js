import { beforeEach, describe, expect, it, vi } from 'vitest';

const {
    mockRegistry,
    mockAppState,
    mockRender,
    mockApplyZoom,
    mockRenderToolbar,
    mockOn
} = vi.hoisted(() => ({
    mockRegistry: {
        load: vi.fn(() => Promise.resolve()),
        get: vi.fn(),
        getAll: vi.fn(() => []),
        onExportEsphome: vi.fn(),
        onExportGlobals: vi.fn(),
        onExportNumericSensors: vi.fn(),
        onExportTextSensors: vi.fn(),
        onExportBinarySensors: vi.fn(),
        onExportHelpers: vi.fn(),
        onExportComponents: vi.fn(),
        onCollectRequirements: vi.fn()
    },
    mockAppState: {
        selectedWidgetIds: [],
        showDebugGrid: false,
        currentPageIndex: 0,
        zoomLevel: 1,
        settings: { renderingMode: 'direct' },
        getCurrentPage: vi.fn(() => ({ widgets: [] }))
    },
    mockRender: vi.fn(),
    mockApplyZoom: vi.fn(),
    mockRenderToolbar: vi.fn(),
    mockOn: vi.fn()
}));

vi.mock('../../js/core/plugin_registry', () => ({
    registry: mockRegistry
}));

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

vi.mock('../../js/utils/logger.js', () => ({
    Logger: { log: vi.fn(), warn: vi.fn(), error: vi.fn(), info: vi.fn() }
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
        update() {}
        setIndicators() {}
    }
}));

vi.mock('../../js/core/canvas_interactions.js', () => ({
    setupInteractions: vi.fn(),
    setupPanning: vi.fn(),
    setupZoomControls: vi.fn(),
    setupDragAndDrop: vi.fn(),
    zoomIn: vi.fn(),
    zoomOut: vi.fn(),
    zoomReset: vi.fn(),
    onMouseMove: vi.fn(),
    onMouseUp: vi.fn()
}));

vi.mock('../../js/core/canvas_touch.js', () => ({
    setupTouchInteractions: vi.fn()
}));

import { renderWidgetPalette } from '../../js/ui/widget_palette.js';
import { Canvas } from '../../js/core/canvas.js';
import { ESPHomeAdapter } from '../../js/io/adapters/esphome_adapter';
import { parseSnippetYamlOffline } from '../../js/io/yaml_import';

function now() {
    return typeof performance !== 'undefined' && typeof performance.now === 'function'
        ? performance.now()
        : Date.now();
}

function createTextPlugin() {
    return {
        name: 'Text',
        export: (widget) => [
            `        // text:${widget.id}`,
            `        // id:${widget.id}`,
            `        it.print(${widget.x}, ${widget.y}, id(font_roboto_20), "${widget.props?.text || ''}");`
        ],
        exportOEPL: (widget) => ({
            type: 'text',
            x: widget.x,
            y: widget.y,
            value: widget.props?.text || ''
        }),
        exportOpenDisplay: (widget) => ({
            type: 'text',
            x: widget.x,
            y: widget.y,
            value: widget.props?.text || ''
        }),
        exportLVGL: vi.fn()
    };
}

function createLargeLayout(widgetCount) {
    return {
        name: 'Perf Device',
        deviceName: 'Perf Device',
        deviceModel: 'reterminal_e1001',
        currentLayoutId: 'perf-layout',
        settings: { renderingMode: 'direct' },
        pages: [{
            id: 'page_0',
            name: 'Overview',
            widgets: Array.from({ length: widgetCount }, (_, index) => ({
                id: `w_${index}`,
                type: 'text',
                x: (index % 12) * 24,
                y: Math.floor(index / 12) * 18,
                props: { text: `Value ${index}` }
            }))
        }],
        assets: { fonts: [], images: [] }
    };
}

describe('workflow performance smoke', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockRegistry.get.mockImplementation(() => createTextPlugin());
        mockAppState.selectedWidgetIds = [];
        mockAppState.getCurrentPage.mockReturnValue({ widgets: [] });

        document.body.innerHTML = `
            <div id="widgetPalette"></div>
            <div class="canvas-viewport">
                <div id="canvasContainer">
                    <div id="canvas"></div>
                </div>
            </div>
            <button id="zoomToFitAllBtn"></button>
            <div id="pagesHeader"><span class="title">Pages</span></div>
            <div id="zoomLevel"></div>
        `;
    });

    it('renders the widget palette within the smoke budget', async () => {
        const start = now();
        await renderWidgetPalette('widgetPalette');
        const durationMs = now() - start;

        expect(document.querySelectorAll('.widget-category').length).toBeGreaterThan(0);
        expect(mockRegistry.load).toHaveBeenCalled();
        expect(durationMs).toBeLessThan(1500);
    });

    it('updates canvas selection visuals within the smoke budget', () => {
        const canvas = new Canvas();
        canvas.canvas.innerHTML = Array.from({ length: 400 }, (_, index) => (
            `<div class="widget${index % 5 === 0 ? ' active' : ''}" data-id="w_${index}"></div>`
        )).join('');
        mockAppState.selectedWidgetIds = Array.from({ length: 80 }, (_, index) => `w_${index * 3}`);

        const start = now();
        canvas.updateSelectionVisuals();
        const durationMs = now() - start;

        expect(mockRenderToolbar).toHaveBeenCalledWith(canvas);
        expect(durationMs).toBeLessThan(500);
        canvas.destroy();
    });

    it('regenerates large snippets within the smoke budget', async () => {
        const adapter = new ESPHomeAdapter();
        const layout = createLargeLayout(140);

        const start = now();
        const yaml = await adapter.generate(layout);
        const durationMs = now() - start;

        expect(yaml).toContain('widget:text');
        expect(durationMs).toBeLessThan(5000);
    });

    it('round-trips large imports within the smoke budget', async () => {
        const adapter = new ESPHomeAdapter();
        const layout = createLargeLayout(140);
        const yaml = await adapter.generate(layout);

        const start = now();
        const parsed = parseSnippetYamlOffline(yaml);
        const durationMs = now() - start;

        expect(parsed?.pages?.[0]?.widgets?.length).toBeGreaterThan(50);
        expect(durationMs).toBeLessThan(5000);
    });
});
