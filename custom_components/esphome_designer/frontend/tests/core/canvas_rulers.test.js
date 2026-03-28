import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockAppState } = vi.hoisted(() => ({
    mockAppState: {
        showRulers: false,
        zoomLevel: 1
    }
}));

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

import { CanvasRulers } from '../../js/core/canvas_rulers.js';

describe('canvas_rulers', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        document.body.innerHTML = `
            <div class="canvas-rulers">
                <div id="rulerTop"></div>
                <div id="rulerLeft"></div>
            </div>
            <div id="viewport"></div>
            <div class="artboard-wrapper active-page">
                <div class="artboard"></div>
            </div>
        `;

        const getContextSpy = vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockImplementation(function () {
            return {
                canvas: this,
                scale: vi.fn(),
                clearRect: vi.fn(),
                fillRect: vi.fn(),
                beginPath: vi.fn(),
                moveTo: vi.fn(),
                lineTo: vi.fn(),
                stroke: vi.fn(),
                fillText: vi.fn(),
                save: vi.fn(),
                translate: vi.fn(),
                rotate: vi.fn(),
                restore: vi.fn(),
                set strokeStyle(_value) {},
                set fillStyle(_value) {},
                set font(_value) {},
                set lineWidth(_value) {}
            };
        });
        this.getContextSpy = getContextSpy;

        document.getElementById('rulerTop').getBoundingClientRect = () => ({
            left: 0,
            top: 0,
            width: 200,
            height: 20,
            right: 200,
            bottom: 20,
            x: 0,
            y: 0,
            toJSON() {}
        });
        document.getElementById('rulerLeft').getBoundingClientRect = () => ({
            left: 0,
            top: 0,
            width: 20,
            height: 160,
            right: 20,
            bottom: 160,
            x: 0,
            y: 0,
            toJSON() {}
        });
        document.querySelector('.artboard').getBoundingClientRect = () => ({
            left: 40,
            top: 30,
            width: 100,
            height: 60,
            right: 140,
            bottom: 90,
            x: 40,
            y: 30,
            toJSON() {}
        });
        Object.defineProperty(window, 'devicePixelRatio', { configurable: true, value: 1 });
    });

    it('hides the ruler container when rulers are disabled', () => {
        mockAppState.showRulers = false;

        const viewport = document.getElementById('viewport');
        const rulers = new CanvasRulers({ viewport });

        expect(document.querySelector('.canvas-rulers').style.display).toBe('none');
        expect(viewport.classList.contains('with-rulers')).toBe(false);
        expect(rulers.topCtx).toBeTruthy();
        expect(rulers.leftCtx).toBeTruthy();
    });

    it('draws horizontal and vertical ruler ticks plus selection indicators when enabled', () => {
        mockAppState.showRulers = true;
        mockAppState.zoomLevel = 2;

        const viewport = document.getElementById('viewport');
        const rulers = new CanvasRulers({ viewport });
        const topCtx = rulers.topCtx;
        const leftCtx = rulers.leftCtx;

        rulers.setIndicators({ x: 5, y: 10, w: 20, h: 15 });

        expect(document.querySelector('.canvas-rulers').style.display).toBe('block');
        expect(viewport.classList.contains('with-rulers')).toBe(true);
        expect(topCtx.fillRect).toHaveBeenCalled();
        expect(topCtx.beginPath).toHaveBeenCalled();
        expect(topCtx.fillText).toHaveBeenCalled();
        expect(leftCtx.fillRect).toHaveBeenCalled();
        expect(leftCtx.save).toHaveBeenCalled();
        expect(leftCtx.rotate).toHaveBeenCalled();
    });

    it('no-ops cleanly when ruler anchors are missing or no active artboard exists', () => {
        document.body.innerHTML = '<div id="viewport"></div>';
        mockAppState.showRulers = true;
        const viewport = document.getElementById('viewport');

        const rulers = new CanvasRulers({ viewport });
        expect(() => rulers.update()).not.toThrow();
    });
});
