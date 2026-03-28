import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockAppState } = vi.hoisted(() => ({
    mockAppState: {
        getCurrentPage: vi.fn()
    }
}));

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

import {
    createDragGhost,
    createPageDragGhost,
    removeDragGhost,
    removePageDragGhost,
    updateDragGhost,
    updateDragGhostPosition,
    updatePageDragGhost
} from '../../js/core/interactions/drag_ghost.js';

describe('drag_ghost', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        document.body.innerHTML = `
            <div id="canvas">
                <div class="artboard-wrapper" data-index="0">
                    <div class="artboard dark">
                        <div class="artboard-header">Page A</div>
                        <div class="widget active" data-id="group_1" style="left: 10px; top: 10px; width: 40px; height: 30px;">Group</div>
                        <div class="widget" data-id="child_1" style="left: 20px; top: 20px; width: 15px; height: 10px;">Child</div>
                    </div>
                </div>
            </div>
        `;
        window.getComputedStyle = vi.fn((el) => ({
            background: el.style.background || 'rgb(0, 0, 0)',
            backgroundColor: el.style.backgroundColor || 'rgb(255, 255, 255)',
            border: el.style.border || '1px solid black',
            borderRadius: el.style.borderRadius || '4px'
        }));
        document.querySelector('.artboard-header').getBoundingClientRect = () => ({
            left: 100,
            top: 200,
            width: 160,
            height: 32,
            right: 260,
            bottom: 232,
            x: 100,
            y: 200,
            toJSON() {}
        });
        mockAppState.getCurrentPage.mockReturnValue({
            widgets: [
                { id: 'group_1', type: 'group', x: 10, y: 10, width: 40, height: 30 },
                { id: 'child_1', type: 'text', x: 20, y: 20, width: 15, height: 10, parentId: 'group_1' }
            ]
        });
    });

    it('creates floating widget ghosts, updates them, and removes them cleanly', () => {
        const canvas = document.getElementById('canvas');
        const canvasInstance = {
            canvas,
            dragState: { id: 'group_1' },
            dragGhostEl: null,
            dragGhostOffset: null
        };
        const widgets = [{ id: 'group_1', type: 'group', x: 10, y: 10, width: 40, height: 30 }];
        const offsets = [{ id: 'group_1', startX: 10, startY: 10, clickOffsetX: 5, clickOffsetY: 6 }];

        createDragGhost(canvasInstance, widgets, 120, 140, 2, offsets);

        expect(canvasInstance.dragGhostEl).toBeTruthy();
        expect(canvasInstance.dragGhostOffset).toEqual({ x: 10, y: 12 });
        expect(canvasInstance.dragGhostEl.querySelectorAll('.drag-ghost-widget')).toHaveLength(2);
        expect(document.querySelector('.widget[data-id="group_1"]').classList.contains('dragging-source')).toBe(true);

        updateDragGhost(canvasInstance, 150, 170);
        expect(canvasInstance.dragGhostEl.style.left).toBe('140px');
        expect(canvasInstance.dragGhostEl.style.top).toBe('158px');

        updateDragGhostPosition(canvasInstance, 40, 50);
        expect(canvasInstance.dragGhostEl.style.left).toBe('40px');
        expect(canvasInstance.dragGhostEl.style.top).toBe('50px');

        removeDragGhost(canvasInstance);
        expect(canvasInstance.dragGhostEl).toBeNull();
        expect(canvasInstance.dragGhostOffset).toBeNull();
        expect(document.querySelector('.widget[data-id="group_1"]').classList.contains('dragging-source')).toBe(false);
    });

    it('creates page drag ghosts, updates them, and restores the source wrapper', () => {
        const canvas = document.getElementById('canvas');
        const canvasInstance = { canvas };

        createPageDragGhost(canvasInstance, 0, 130, 210);

        expect(canvasInstance.pageDragGhost).toBeTruthy();
        expect(canvasInstance.pageDragOffset).toEqual({ x: 30, y: 10 });
        expect(document.querySelector('.artboard-wrapper').classList.contains('reordering')).toBe(true);

        updatePageDragGhost(canvasInstance, 170, 260);
        expect(canvasInstance.pageDragGhost.style.left).toBe('170px');
        expect(canvasInstance.pageDragGhost.style.top).toBe('260px');

        removePageDragGhost(canvasInstance, 0);
        expect(canvasInstance.pageDragGhost).toBeNull();
        expect(document.querySelector('.artboard-wrapper').classList.contains('reordering')).toBe(false);
    });
});
