import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockAppState } = vi.hoisted(() => ({
    mockAppState: {
        snapEnabled: true,
        getCurrentPage: vi.fn(),
        getWidgetById: vi.fn(),
        getCanvasDimensions: vi.fn(() => ({ width: 200, height: 100 })),
        updateWidget: vi.fn(),
        recordHistory: vi.fn(),
        setSnapEnabled: vi.fn()
    }
}));

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

import {
    addSnapGuideHorizontal,
    addSnapGuideVertical,
    applySnapToPosition,
    clearSnapGuides,
    forceSnapWidget,
    getSnapLines,
    snapResizeValue,
    snapToGridCell,
    updateWidgetGridCell
} from '../../js/core/canvas_snap.js';

describe('canvas_snap', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        document.body.innerHTML = '';
        mockAppState.snapEnabled = true;
    });

    it('adds and clears snap guides and exposes page/widget snap lines', () => {
        const host = document.createElement('div');
        document.body.appendChild(host);

        addSnapGuideVertical({ canvas: host }, 15);
        addSnapGuideHorizontal({ canvas: host }, 25);

        expect(host.querySelectorAll('.snap-guide')).toHaveLength(2);

        mockAppState.getCurrentPage.mockReturnValue({
            widgets: [{ id: 'w1', x: 20, y: 10, width: 40, height: 30 }]
        });

        const lines = getSnapLines('skip-me', { width: 200, height: 100 });
        expect(lines.vertical).toEqual(expect.arrayContaining([0, 100, 200, 20, 40, 60]));
        expect(lines.horizontal).toEqual(expect.arrayContaining([0, 50, 100, 10, 25, 40]));

        clearSnapGuides();
        expect(host.querySelectorAll('.snap-guide')).toHaveLength(0);
    });

    it('snaps widget positions to nearby lines and renders distance markers when requested', () => {
        const artboard = document.createElement('div');
        document.body.appendChild(artboard);

        mockAppState.getCurrentPage.mockReturnValue({
            widgets: [{ id: 'other', x: 50, y: 15, width: 20, height: 20 }]
        });

        const snapped = applySnapToPosition(
            { canvas: artboard },
            { id: 'moving', width: 20, height: 20 },
            32,
            15,
            false,
            { width: 200, height: 100 },
            artboard
        );

        expect(snapped).toEqual({ x: 30, y: 15 });
        expect(artboard.querySelector('.snap-guide-vertical')).toBeTruthy();

        clearSnapGuides();

        const measured = applySnapToPosition(
            { canvas: artboard },
            { id: 'moving', width: 20, height: 20 },
            11,
            15,
            false,
            { width: 200, height: 100 },
            artboard,
            true
        );

        expect(measured).toEqual({ x: 11, y: 15 });
        expect(artboard.querySelectorAll('.distance-marker')).not.toHaveLength(0);
    });

    it('snaps grid cells and updates widget grid metadata', () => {
        expect(snapToGridCell(74, 24, 40, 20, '2x4', { width: 200, height: 100 })).toEqual({
            x: 50,
            y: 0
        });

        const widget = { id: 'grid_widget', x: 60, y: 55, width: 80, height: 40, props: { color: 'blue' } };
        mockAppState.getCurrentPage.mockReturnValue({ layout: '2x2' });
        mockAppState.getWidgetById.mockReturnValue(widget);

        updateWidgetGridCell('grid_widget');

        expect(mockAppState.updateWidget).toHaveBeenCalledWith('grid_widget', {
            props: expect.objectContaining({
                color: 'blue',
                grid_cell_row_pos: 1,
                grid_cell_column_pos: 1,
                grid_cell_row_span: 1,
                grid_cell_column_span: 1
            })
        });
    });

    it('force-snaps widgets with and without layout metadata and records history', () => {
        const gridWidget = { id: 'grid_widget', x: 74, y: 24, width: 40, height: 20, props: {} };
        mockAppState.getWidgetById.mockReturnValueOnce(gridWidget);
        mockAppState.getCurrentPage.mockReturnValueOnce({ layout: '2x4', widgets: [] });

        forceSnapWidget('grid_widget');

        expect(mockAppState.updateWidget).toHaveBeenCalledWith('grid_widget', { x: 50, y: 0 });
        expect(mockAppState.recordHistory).toHaveBeenCalledTimes(1);

        vi.clearAllMocks();

        const freeWidget = { id: 'free_widget', x: 32, y: 15, width: 20, height: 20, props: {} };
        mockAppState.getWidgetById.mockReturnValue(freeWidget);
        mockAppState.getCurrentPage.mockReturnValue({
            widgets: [{ id: 'neighbor', x: 50, y: 15, width: 20, height: 20 }]
        });

        forceSnapWidget('free_widget');

        expect(mockAppState.setSnapEnabled).toHaveBeenCalledWith(true);
        expect(mockAppState.setSnapEnabled).toHaveBeenLastCalledWith(true);
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('free_widget', { x: 30, y: 15 });
        expect(mockAppState.recordHistory).toHaveBeenCalledTimes(1);
    });

    it('snaps resize values against existing lines and renders a resize guide', () => {
        const artboard = document.createElement('div');
        document.body.appendChild(artboard);

        mockAppState.getCurrentPage.mockReturnValue({
            widgets: [{ id: 'other', x: 100, y: 10, width: 40, height: 20 }]
        });

        const snapped = snapResizeValue(103, 'v', 'moving', false, { width: 200, height: 100 }, artboard);
        expect(snapped).toBe(100);
        expect(artboard.querySelector('.snap-guide-vertical')).toBeTruthy();
    });
});
