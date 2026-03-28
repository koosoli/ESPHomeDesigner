import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockAppState } = vi.hoisted(() => ({
    mockAppState: {
        currentPageIndex: 0,
        selectedWidgetIds: [],
        getSelectedWidgets: vi.fn(),
        alignSelectedWidgets: vi.fn(),
        distributeSelectedWidgets: vi.fn(),
        groupSelection: vi.fn(),
        ungroupSelection: vi.fn()
    }
}));

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

import {
    addResizeHandles,
    confirmAction,
    createMdiIconButton,
    renderContextToolbar,
    renderDebugGridOverlay,
    renderLvglGridOverlayToElement
} from '../../js/core/canvas_renderer_ui.js';

describe('canvas_renderer_ui', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        document.body.innerHTML = '';
        mockAppState.currentPageIndex = 0;
        mockAppState.selectedWidgetIds = [];
        mockAppState.getSelectedWidgets.mockReturnValue([]);
    });

    it('renders LVGL grid overlays and resize handles', () => {
        const artboard = document.createElement('div');

        renderLvglGridOverlayToElement(artboard, '2x3', { width: 100, height: 60 }, true);
        expect(artboard.querySelectorAll('.lvgl-grid-overlay > div')).toHaveLength(6);
        expect(artboard.querySelector('.lvgl-grid-overlay span')?.textContent).toBe('0,0');

        renderLvglGridOverlayToElement(artboard, 'invalid', { width: 100, height: 60 }, false);
        expect(artboard.querySelectorAll('.lvgl-grid-overlay')).toHaveLength(1);

        const widget = document.createElement('div');
        addResizeHandles(widget);
        expect(widget.querySelectorAll('.widget-resize-handle')).toHaveLength(8);
        expect(widget.querySelector('.handle-br')?.dataset.handle).toBe('br');
    });

    it('builds context toolbars for align, distribute, group, and ungroup actions', () => {
        document.body.innerHTML = `
            <div id="canvas">
                <div class="artboard-wrapper" data-index="0">
                    <div class="artboard"></div>
                </div>
            </div>
        `;
        const canvas = document.getElementById('canvas');
        const artboard = canvas.querySelector('.artboard');
        Object.defineProperty(artboard, 'offsetTop', { configurable: true, value: 20 });

        mockAppState.selectedWidgetIds = ['w1', 'w2', 'w3'];
        mockAppState.getSelectedWidgets.mockReturnValue([
            { id: 'w1', x: 10, y: 15, width: 20, height: 10, type: 'text' },
            { id: 'w2', x: 50, y: 15, width: 20, height: 10, type: 'text' },
            { id: 'w3', x: 90, y: 15, width: 20, height: 10, type: 'text' }
        ]);

        renderContextToolbar({ canvas, dragState: null, lassoState: null });

        const toolbar = canvas.querySelector('.context-toolbar');
        expect(toolbar).toBeTruthy();
        expect(toolbar.style.left).toBe('10px');
        expect(toolbar.style.top).toBe('-10px');

        toolbar.querySelector('button[title="Align Left"]')?.click();
        toolbar.querySelector('button[title="Distribute Horizontally"]')?.click();
        toolbar.querySelector('button[title="Group Selection (Ctrl+G)"]')?.click();

        expect(mockAppState.alignSelectedWidgets).toHaveBeenCalledWith('left');
        expect(mockAppState.distributeSelectedWidgets).toHaveBeenCalledWith('horizontal');
        expect(mockAppState.groupSelection).toHaveBeenCalled();

        mockAppState.getSelectedWidgets.mockReturnValue([
            { id: 'group_1', x: 0, y: 0, width: 20, height: 20, type: 'group' },
            { id: 'child_1', x: 5, y: 5, width: 10, height: 10, type: 'text', parentId: 'group_1' }
        ]);
        mockAppState.selectedWidgetIds = ['group_1', 'child_1'];

        renderContextToolbar({ canvas, dragState: null, lassoState: null });
        canvas.querySelector('.context-toolbar button[title="Ungroup (Ctrl+Shift+G)"]')?.click();
        expect(mockAppState.ungroupSelection).toHaveBeenCalled();
    });

    it('removes the context toolbar when selection is empty or interactions are active', () => {
        document.body.innerHTML = `
            <div id="canvas">
                <div class="artboard-wrapper" data-index="0">
                    <div class="artboard"></div>
                </div>
            </div>
        `;
        const canvas = document.getElementById('canvas');
        const staleToolbar = document.createElement('div');
        staleToolbar.className = 'context-toolbar';
        canvas.appendChild(staleToolbar);

        renderContextToolbar({ canvas, dragState: null, lassoState: null });
        expect(canvas.querySelector('.context-toolbar')).toBeNull();

        mockAppState.selectedWidgetIds = ['w1'];
        mockAppState.getSelectedWidgets.mockReturnValue([{ id: 'w1', x: 1, y: 1, width: 10, height: 10, type: 'text' }]);
        renderContextToolbar({ canvas, dragState: { mode: 'move' }, lassoState: null });
        expect(canvas.querySelector('.context-toolbar')).toBeNull();
    });

    it('creates icon buttons, confirmation dialogs, and debug overlays', () => {
        const clickSpy = vi.fn();
        const button = createMdiIconButton('mdi-plus', 'Add', clickSpy);
        const stopPropagation = vi.fn();
        button.onclick({ stopPropagation });
        expect(button.className).toContain('artboard-btn');
        expect(stopPropagation).toHaveBeenCalled();
        expect(clickSpy).toHaveBeenCalled();

        const confirmSpy = vi.fn();
        confirmAction({
            title: 'Delete',
            message: 'Remove it?',
            confirmLabel: 'Delete',
            confirmClass: 'btn-danger',
            onConfirm: confirmSpy
        });

        document.querySelector('.confirm-btn')?.click();
        expect(confirmSpy).toHaveBeenCalled();
        expect(document.querySelector('.modal-backdrop')).toBeNull();

        const modalHost = document.createElement('div');
        confirmAction({
            title: 'Cancel',
            message: 'Keep it?',
            onConfirm: vi.fn()
        });
        document.querySelector('.close-btn')?.click();
        expect(document.querySelector('.modal-backdrop')).toBeNull();

        renderDebugGridOverlay(modalHost, { width: 10, height: 10 }, false);
        expect(modalHost.querySelector('.debug-grid-overlay')).toBeTruthy();
    });
});
