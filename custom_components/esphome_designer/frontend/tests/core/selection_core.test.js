import { beforeEach, describe, expect, it, vi } from 'vitest';

const {
    mockAppState,
    mockRadialMenu,
    mockRender,
    mockFocusPage,
    mockCreateDragGhost,
    mockCreatePageDragGhost,
    mockStartInlineEdit
} = vi.hoisted(() => ({
    mockAppState: {
        currentPageIndex: 0,
        zoomLevel: 1,
        showDebugGrid: false,
        selectedWidgetIds: [],
        pages: [{ widgets: [] }],
        getWidgetById: vi.fn(),
        getSelectedWidgets: vi.fn(),
        selectWidgets: vi.fn(),
        selectWidget: vi.fn(),
        setCurrentPageIndex: vi.fn()
    },
    mockRadialMenu: {
        active: false,
        show: vi.fn(),
        hide: vi.fn()
    },
    mockRender: vi.fn(),
    mockFocusPage: vi.fn(),
    mockCreateDragGhost: vi.fn(),
    mockCreatePageDragGhost: vi.fn(),
    mockStartInlineEdit: vi.fn()
}));

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

vi.mock('../../js/ui/radial_menu.js', () => ({
    radialMenu: mockRadialMenu
}));

vi.mock('../../js/core/canvas_snap.js', () => ({
    clearSnapGuides: vi.fn()
}));

vi.mock('../../js/core/canvas_renderer.js', () => ({
    render: mockRender,
    focusPage: mockFocusPage
}));

vi.mock('../../js/core/interactions/drag_ghost.js', () => ({
    createDragGhost: mockCreateDragGhost,
    updateDragGhost: vi.fn(),
    updateDragGhostPosition: vi.fn(),
    removeDragGhost: vi.fn(),
    createPageDragGhost: mockCreatePageDragGhost,
    updatePageDragGhost: vi.fn(),
    removePageDragGhost: vi.fn()
}));

vi.mock('../../js/core/interactions/inline_edit.js', () => ({
    startInlineEdit: mockStartInlineEdit
}));

vi.mock('../../js/core/events.js', () => ({
    emit: vi.fn(),
    EVENTS: {
        STATE_CHANGED: 'STATE_CHANGED'
    }
}));

describe('selection core', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.resetModules();
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2026-03-25T12:00:00Z'));
        document.body.innerHTML = '';
        mockAppState.currentPageIndex = 0;
        mockAppState.zoomLevel = 1;
        mockAppState.showDebugGrid = false;
        mockAppState.selectedWidgetIds = [];
        mockAppState.getSelectedWidgets.mockReturnValue([]);
    });

    it('evaluates context-menu suppression and target resolution correctly', async () => {
        const {
            shouldSuppressCanvasContextMenu,
            resolveCanvasContextMenuTarget,
            blurActiveCanvasInput,
            focusCanvasKeyboardTarget
        } = await import('../../js/core/interactions/selection.js');

        expect(shouldSuppressCanvasContextMenu({
            pinchState: true,
            touchState: null,
            dragState: null,
            lassoState: null
        })).toBe(true);
        expect(shouldSuppressCanvasContextMenu({
            pinchState: null,
            touchState: { hasMoved: true },
            dragState: null,
            lassoState: null
        })).toBe(true);
        expect(shouldSuppressCanvasContextMenu({
            pinchState: null,
            touchState: null,
            dragState: { mode: 'resize' },
            lassoState: null
        })).toBe(true);
        expect(shouldSuppressCanvasContextMenu({
            pinchState: null,
            touchState: null,
            dragState: null,
            lassoState: { rect: { x: 0 } }
        })).toBe(true);
        expect(shouldSuppressCanvasContextMenu({
            pinchState: null,
            touchState: null,
            dragState: null,
            lassoState: null
        })).toBe(false);

        document.body.innerHTML = `
            <div class="artboard"><div class="widget" data-id="w1"></div></div>
            <button id="btn"></button>
        `;
        expect(resolveCanvasContextMenuTarget(document.querySelector('.widget'))).toEqual({ shouldShow: true, widgetId: 'w1' });
        expect(resolveCanvasContextMenuTarget(document.querySelector('.artboard'))).toEqual({ shouldShow: true, widgetId: null });
        expect(resolveCanvasContextMenuTarget(document.getElementById('btn'))).toEqual({ shouldShow: false, widgetId: null });
        expect(resolveCanvasContextMenuTarget(null)).toEqual({ shouldShow: false, widgetId: null });
        const stray = document.createElement('div');
        document.body.appendChild(stray);
        expect(resolveCanvasContextMenuTarget(stray)).toEqual({ shouldShow: false, widgetId: null });

        blurActiveCanvasInput(null);

        const input = document.createElement('input');
        document.body.appendChild(input);
        const inputBlurSpy = vi.spyOn(input, 'blur');
        input.focus();
        blurActiveCanvasInput(input);
        expect(inputBlurSpy).not.toHaveBeenCalled();

        document.body.innerHTML += '<div id="canvas"><div id="canvasChild"></div></div><button id="canvasButton"></button>';
        const canvas = /** @type {HTMLElement} */ (document.getElementById('canvas'));
        const canvasChild = /** @type {HTMLElement} */ (document.getElementById('canvasChild'));
        const canvasButton = /** @type {HTMLElement} */ (document.getElementById('canvasButton'));

        focusCanvasKeyboardTarget(null);
        focusCanvasKeyboardTarget(canvasButton);
        expect(document.activeElement).not.toBe(canvas);

        focusCanvasKeyboardTarget(canvasChild);
        expect(canvas.tabIndex).toBe(-1);
        expect(document.activeElement).toBe(canvas);

        canvas.remove();
        expect(() => focusCanvasKeyboardTarget(canvasChild)).not.toThrow();

        document.body.appendChild(canvas);
        canvas.focus = vi.fn((options) => {
            if (options && typeof options === 'object') {
                throw new Error('focus options unsupported');
            }
        });
        focusCanvasKeyboardTarget(canvasChild);
        expect(canvas.focus).toHaveBeenCalledTimes(2);
    });

    it('deselects on stage clicks and starts page reordering from artboard headers', async () => {
        const { setupInteractions } = await import('../../js/core/interactions/selection.js');

        document.body.innerHTML = `
            <input id="editorInput" />
            <div id="canvas">
                <div class="stage"></div>
                <div class="artboard-wrapper" data-index="0">
                    <div class="artboard-header">Header</div>
                    <div class="artboard"></div>
                </div>
            </div>
        `;
        const canvas = document.getElementById('canvas');
        const input = document.getElementById('editorInput');
        input.focus();

        const canvasInstance = {
            canvas,
            rulers: null,
            pinchState: null,
            touchState: null,
            dragState: null,
            lassoState: null,
            _boundMouseMove: vi.fn(),
            _boundMouseUp: vi.fn(),
            panX: 0,
            panY: 0
        };

        setupInteractions(canvasInstance);

        document.querySelector('.stage')?.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, button: 0 }));
        expect(mockAppState.selectWidgets).toHaveBeenCalledWith([]);
        expect(mockRender).toHaveBeenCalledWith(canvasInstance);

        document.querySelector('.artboard-header')?.dispatchEvent(new MouseEvent('mousedown', {
            bubbles: true,
            button: 0,
            clientX: 25,
            clientY: 30
        }));

        expect(canvasInstance.dragState).toEqual(expect.objectContaining({
            mode: 'reorder-page',
            pageIndex: 0,
            startX: 25,
            startY: 30
        }));
        expect(mockCreatePageDragGhost).toHaveBeenCalledWith(canvasInstance, 0, 25, 30);
    });

    it('starts inline editing on widget double-clicks and creates resize drags from handles', async () => {
        const { setupInteractions } = await import('../../js/core/interactions/selection.js');

        document.body.innerHTML = `
            <div id="canvas">
                <div class="artboard-wrapper" data-index="0">
                    <div class="artboard">
                        <div class="widget" data-id="text_1">
                            <div class="widget-resize-handle" data-handle="br"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const artboard = document.querySelector('.artboard');
        artboard.getBoundingClientRect = () => ({
            left: 10,
            top: 20,
            width: 200,
            height: 100,
            right: 210,
            bottom: 120,
            x: 10,
            y: 20,
            toJSON() {}
        });
        mockAppState.getWidgetById.mockReturnValue({
            id: 'text_1',
            type: 'text',
            x: 30,
            y: 40,
            width: 60,
            height: 20,
            props: {}
        });

        const canvas = document.getElementById('canvas');
        const canvasInstance = {
            canvas,
            rulers: null,
            pinchState: null,
            touchState: null,
            dragState: null,
            lassoState: null,
            _boundMouseMove: vi.fn(),
            _boundMouseUp: vi.fn(),
            panX: 0,
            panY: 0
        };

        setupInteractions(canvasInstance);

        const widget = document.querySelector('.widget');
        widget.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, button: 0, clientX: 40, clientY: 50 }));
        vi.setSystemTime(new Date('2026-03-25T12:00:00.150Z'));
        widget.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, button: 0, clientX: 40, clientY: 50 }));

        expect(mockStartInlineEdit).toHaveBeenCalledWith(canvasInstance, 'text_1');

        document.querySelector('.widget-resize-handle')?.dispatchEvent(new MouseEvent('mousedown', {
            bubbles: true,
            button: 0,
            clientX: 45,
            clientY: 55
        }));

        expect(canvasInstance.dragState).toEqual(expect.objectContaining({
            mode: 'resize',
            id: 'text_1',
            handle: 'br',
            startWidgetX: 30,
            startWidgetY: 40
        }));
    });

    it('blurs the previously focused input before handling widget selection on the canvas', async () => {
        const { setupInteractions } = await import('../../js/core/interactions/selection.js');

        document.body.innerHTML = `
            <input id="editorInput" />
            <div id="canvas">
                <div class="artboard-wrapper" data-index="0">
                    <div class="artboard">
                        <div class="widget" data-id="text_1"></div>
                    </div>
                </div>
            </div>
        `;

        const input = /** @type {HTMLInputElement} */ (document.getElementById('editorInput'));
        const blurSpy = vi.spyOn(input, 'blur');
        input.focus();

        const artboard = /** @type {HTMLElement} */ (document.querySelector('.artboard'));
        artboard.getBoundingClientRect = () => ({
            left: 10,
            top: 20,
            width: 200,
            height: 100,
            right: 210,
            bottom: 120,
            x: 10,
            y: 20,
            toJSON() {}
        });

        mockAppState.getWidgetById.mockReturnValue({
            id: 'text_1',
            type: 'text',
            x: 30,
            y: 40,
            width: 60,
            height: 20,
            props: {}
        });
        mockAppState.getSelectedWidgets.mockReturnValue([
            { id: 'text_1', type: 'text', x: 30, y: 40, width: 60, height: 20, props: {} }
        ]);

        const canvas = document.getElementById('canvas');
        const canvasInstance = {
            canvas,
            rulers: null,
            pinchState: null,
            touchState: null,
            dragState: null,
            lassoState: null,
            _boundMouseMove: vi.fn(),
            _boundMouseUp: vi.fn(),
            panX: 0,
            panY: 0
        };

        setupInteractions(canvasInstance);

        document.querySelector('.widget')?.dispatchEvent(new MouseEvent('mousedown', {
            bubbles: true,
            button: 0,
            clientX: 40,
            clientY: 50
        }));

        expect(blurSpy).toHaveBeenCalled();
        expect(mockAppState.selectWidget).toHaveBeenCalledWith('text_1', false);
        expect(document.activeElement).toBe(canvas);
    });

    it('redirects child-widget drags to the parent group and prepares lasso/debug flows', async () => {
        const { setupInteractions } = await import('../../js/core/interactions/selection.js');

        document.body.innerHTML = `
            <div id="canvas">
                <div class="artboard-wrapper" data-index="0">
                    <div class="artboard">
                        <div class="widget" data-id="child_1"></div>
                    </div>
                </div>
            </div>
        `;

        const artboard = document.querySelector('.artboard');
        artboard.getBoundingClientRect = () => ({
            left: 5,
            top: 10,
            width: 200,
            height: 120,
            right: 205,
            bottom: 130,
            x: 5,
            y: 10,
            toJSON() {}
        });

        mockAppState.selectedWidgetIds = ['group_1'];
        mockAppState.getWidgetById.mockImplementation((id) => ({
            child_1: { id: 'child_1', type: 'text', x: 20, y: 30, width: 20, height: 10, parentId: 'group_1' },
            group_1: { id: 'group_1', type: 'group', x: 10, y: 15, width: 80, height: 40 }
        }[id]));
        mockAppState.getSelectedWidgets.mockReturnValue([
            { id: 'group_1', type: 'group', x: 10, y: 15, width: 80, height: 40 }
        ]);

        const rulers = { setIndicators: vi.fn() };
        const canvas = document.getElementById('canvas');
        const canvasInstance = {
            canvas,
            rulers,
            pinchState: null,
            touchState: null,
            dragState: null,
            lassoState: null,
            _boundMouseMove: vi.fn(),
            _boundMouseUp: vi.fn(),
            panX: 0,
            panY: 0
        };

        setupInteractions(canvasInstance);

        document.querySelector('.widget')?.dispatchEvent(new MouseEvent('mousedown', {
            bubbles: true,
            button: 0,
            clientX: 40,
            clientY: 50
        }));

        expect(mockAppState.selectWidget).toHaveBeenCalledWith('group_1', false);
        expect(mockCreateDragGhost).toHaveBeenCalled();
        expect(canvasInstance.dragState).toEqual(expect.objectContaining({
            mode: 'move',
            id: 'group_1'
        }));
        expect(rulers.setIndicators).toHaveBeenCalledWith({ x: 10, y: 15, w: 80, h: 40 });

        mockAppState.showDebugGrid = true;
        canvasInstance.dragState = null;
        canvasInstance.lassoState = null;
        vi.setSystemTime(new Date('2026-03-25T12:00:01.000Z'));

        artboard.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, button: 0, clientX: 25, clientY: 35 }));
        canvasInstance.lassoState = null;
        vi.setSystemTime(new Date('2026-03-25T12:00:01.150Z'));
        artboard.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, button: 0, clientX: 28, clientY: 38 }));

        expect(canvasInstance.lassoState).toEqual(expect.objectContaining({
            isDoubleClick: true,
            focusParams: { index: 0, fitZoom: true }
        }));

        artboard.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: 40, clientY: 60 }));
        expect(document.querySelector('.debug-cursor-tooltip')?.style.display).toBe('block');
        artboard.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true }));
        expect(document.querySelector('.debug-cursor-tooltip')?.style.display).toBe('none');
    });

    it('keeps a group directly selectable even if stale nested data still carries a parentId', async () => {
        const { setupInteractions } = await import('../../js/core/interactions/selection.js');

        document.body.innerHTML = `
            <div id="canvas">
                <div class="artboard-wrapper" data-index="0">
                    <div class="artboard">
                        <div class="widget" data-id="group_2"></div>
                    </div>
                </div>
            </div>
        `;

        const artboard = document.querySelector('.artboard');
        artboard.getBoundingClientRect = () => ({
            left: 0,
            top: 0,
            width: 200,
            height: 120,
            right: 200,
            bottom: 120,
            x: 0,
            y: 0,
            toJSON() {}
        });

        mockAppState.getWidgetById.mockImplementation((id) => ({
            group_1: { id: 'group_1', type: 'group', x: 10, y: 15, width: 80, height: 40 },
            group_2: { id: 'group_2', type: 'group', parentId: 'group_1', x: 20, y: 25, width: 60, height: 30 }
        }[id]));
        mockAppState.getSelectedWidgets.mockReturnValue([
            { id: 'group_2', type: 'group', parentId: 'group_1', x: 20, y: 25, width: 60, height: 30 }
        ]);

        const canvas = document.getElementById('canvas');
        const canvasInstance = {
            canvas,
            rulers: { setIndicators: vi.fn() },
            pinchState: null,
            touchState: null,
            dragState: null,
            lassoState: null,
            _boundMouseMove: vi.fn(),
            _boundMouseUp: vi.fn(),
            panX: 0,
            panY: 0
        };

        setupInteractions(canvasInstance);

        document.querySelector('.widget')?.dispatchEvent(new MouseEvent('mousedown', {
            bubbles: true,
            button: 0,
            clientX: 35,
            clientY: 40
        }));

        expect(mockAppState.selectWidget).toHaveBeenCalledWith('group_2', false);
        expect(mockAppState.selectWidget).not.toHaveBeenCalledWith('group_1', false);
        expect(canvasInstance.dragState).toEqual(expect.objectContaining({
            mode: 'move',
            id: 'group_2'
        }));
    });

    it('switches pages before dragging widgets, supports additive selection, and blocks child resize handles', async () => {
        const { setupInteractions } = await import('../../js/core/interactions/selection.js');

        document.body.innerHTML = `
            <div id="canvas">
                <div class="artboard-wrapper" data-index="0">
                    <div class="artboard"></div>
                </div>
                <div class="artboard-wrapper" data-index="1">
                    <div class="artboard">
                        <div class="widget" data-id="child_2">
                            <div class="widget-resize-handle" data-handle="br"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const secondArtboard = /** @type {HTMLElement} */ (document.querySelectorAll('.artboard')[1]);
        secondArtboard.getBoundingClientRect = () => ({
            left: 0,
            top: 0,
            width: 200,
            height: 120,
            right: 200,
            bottom: 120,
            x: 0,
            y: 0,
            toJSON() {}
        });

        mockAppState.currentPageIndex = 0;
        mockAppState.selectedWidgetIds = ['child_2'];
        mockAppState.getWidgetById.mockImplementation((id) => ({
            child_2: { id: 'child_2', type: 'text', x: 20, y: 30, width: 30, height: 15, parentId: 'group_2' },
            group_2: { id: 'group_2', type: 'group', x: 10, y: 20, width: 100, height: 50 }
        }[id]));
        mockAppState.getSelectedWidgets.mockReturnValue([
            { id: 'child_2', type: 'text', x: 20, y: 30, width: 30, height: 15 }
        ]);

        const canvas = document.getElementById('canvas');
        const canvasInstance = {
            canvas,
            rulers: null,
            pinchState: null,
            touchState: null,
            dragState: null,
            lassoState: null,
            _boundMouseMove: vi.fn(),
            _boundMouseUp: vi.fn(),
            panX: 0,
            panY: 0
        };

        setupInteractions(canvasInstance);

        document.querySelector('.widget')?.dispatchEvent(new MouseEvent('mousedown', {
            bubbles: true,
            button: 0,
            clientX: 30,
            clientY: 40,
            shiftKey: true
        }));

        expect(mockAppState.setCurrentPageIndex).toHaveBeenCalledWith(1, { suppressFocus: true });
        expect(mockAppState.selectWidgets).toHaveBeenCalledWith(['child_2']);

        canvasInstance.dragState = null;
        document.querySelector('.widget-resize-handle')?.dispatchEvent(new MouseEvent('mousedown', {
            bubbles: true,
            button: 0,
            clientX: 30,
            clientY: 40
        }));

        expect(canvasInstance.dragState).toBeNull();

        mockAppState.showDebugGrid = false;
        canvas.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: 10, clientY: 10 }));
        expect(document.querySelector('.debug-cursor-tooltip')?.style.display).toBe('none');

        mockAppState.showDebugGrid = true;
        canvas.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, clientX: 10, clientY: 10 }));
        expect(document.querySelector('.debug-cursor-tooltip')?.style.display).toBe('none');
    });
});
