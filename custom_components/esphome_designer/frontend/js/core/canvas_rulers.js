import { AppState } from './state.js';

/**
 * Handles rendering of pixel rulers on the canvas viewport.
 */
export class CanvasRulers {
    constructor(canvasInstance) {
        this.canvasInstance = canvasInstance;
        this.topRuler = document.getElementById('rulerTop');
        this.leftRuler = document.getElementById('rulerLeft');
        this.container = document.querySelector('.canvas-rulers');
        this.viewport = canvasInstance.viewport;
        this.indicators = null; // { x, y, w, h }

        this.init();
    }

    init() {
        if (!this.topRuler || !this.leftRuler) return;
        this.topCtx = this.createRulerCanvas(this.topRuler);
        this.leftCtx = this.createRulerCanvas(this.leftRuler);
        this.update();
    }

    createRulerCanvas(container) {
        const canvas = document.createElement('canvas');
        container.appendChild(canvas);
        return canvas.getContext('2d');
    }

    setIndicators(rect) {
        this.indicators = rect;
        this.update();
    }

    update() {
        if (!AppState.showRulers) {
            if (this.container) this.container.style.display = 'none';
            if (this.viewport) this.viewport.classList.remove('with-rulers');
            return;
        }

        if (this.container) this.container.style.display = 'block';
        if (this.viewport) this.viewport.classList.add('with-rulers');

        const activeArtboard = document.querySelector('.artboard-wrapper.active-page .artboard');
        if (!activeArtboard) return;

        // Use bounding boxes for robust relative positioning
        const topRect = this.topRuler.getBoundingClientRect();
        const leftRect = this.leftRuler.getBoundingClientRect();
        const artboardRect = activeArtboard.getBoundingClientRect();
        const zoom = AppState.zoomLevel;

        this.drawHorizontal(topRect, artboardRect, zoom);
        this.drawVertical(leftRect, artboardRect, zoom);
    }

    drawHorizontal(rulerRect, artboardRect, zoom) {
        const ctx = this.topCtx;
        const canvas = ctx.canvas;
        const dpr = window.devicePixelRatio || 1;

        if (canvas.width !== rulerRect.width * dpr || canvas.height !== rulerRect.height * dpr) {
            canvas.width = rulerRect.width * dpr;
            canvas.height = rulerRect.height * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = rulerRect.width + 'px';
            canvas.style.height = rulerRect.height + 'px';
        }

        ctx.clearRect(0, 0, rulerRect.width, rulerRect.height);

        // Artboard (0,0) position relative to ruler start
        const startOffset = artboardRect.left - rulerRect.left;

        // Draw selection highlight
        if (this.indicators) {
            const sx = startOffset + this.indicators.x * zoom;
            const sw = (this.indicators.w || 0) * zoom;
            ctx.fillStyle = 'hsla(var(--accent-h), 85%, 65%, 0.15)';
            ctx.fillRect(sx, 0, sw, rulerRect.height);
            ctx.fillStyle = 'var(--accent)';
            ctx.fillRect(sx, rulerRect.height - 2, sw, 2);
        }

        ctx.strokeStyle = '#4b5563';
        ctx.fillStyle = '#9ca3af';
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.lineWidth = 1;

        const startCanvasX = Math.floor(-startOffset / zoom / 10) * 10;
        const endCanvasX = Math.ceil((rulerRect.width - startOffset) / zoom / 10) * 10;

        for (let cx = startCanvasX; cx <= endCanvasX; cx += 10) {
            const sx = startOffset + cx * zoom;
            if (sx < 0 || sx > rulerRect.width) continue;

            const isLarge = cx % 100 === 0;
            const isMedium = cx % 50 === 0;
            const h = isLarge ? 12 : (isMedium ? 8 : 4);

            ctx.beginPath();
            ctx.moveTo(sx, rulerRect.height);
            ctx.lineTo(sx, rulerRect.height - h);
            ctx.stroke();

            if (isLarge) {
                ctx.fillText(cx.toString(), sx + 2, 10);
            }
        }
    }

    drawVertical(rulerRect, artboardRect, zoom) {
        const ctx = this.leftCtx;
        const canvas = ctx.canvas;
        const dpr = window.devicePixelRatio || 1;

        if (canvas.width !== rulerRect.width * dpr || canvas.height !== rulerRect.height * dpr) {
            canvas.width = rulerRect.width * dpr;
            canvas.height = rulerRect.height * dpr;
            ctx.scale(dpr, dpr);
            canvas.style.width = rulerRect.width + 'px';
            canvas.style.height = rulerRect.height + 'px';
        }

        ctx.clearRect(0, 0, rulerRect.width, rulerRect.height);

        // Artboard (0,0) position relative to ruler start
        const startOffset = artboardRect.top - rulerRect.top;

        // Draw selection highlight
        if (this.indicators) {
            const sy = startOffset + this.indicators.y * zoom;
            const sh = (this.indicators.h || 0) * zoom;
            ctx.fillStyle = 'hsla(var(--accent-h), 85%, 65%, 0.15)';
            ctx.fillRect(0, sy, rulerRect.width, sh);
            ctx.fillStyle = 'var(--accent)';
            ctx.fillRect(rulerRect.width - 2, sy, 2, sh);
        }

        ctx.strokeStyle = '#4b5563';
        ctx.fillStyle = '#9ca3af';
        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.lineWidth = 1;

        const startCanvasY = Math.floor(-startOffset / zoom / 10) * 10;
        const endCanvasY = Math.ceil((rulerRect.height - startOffset) / zoom / 10) * 10;

        for (let cy = startCanvasY; cy <= endCanvasY; cy += 10) {
            const sy = startOffset + cy * zoom;
            if (sy < 0 || sy > rulerRect.height) continue;

            const isLarge = cy % 100 === 0;
            const isMedium = cy % 50 === 0;
            const w = isLarge ? 12 : (isMedium ? 8 : 4);

            ctx.beginPath();
            ctx.moveTo(rulerRect.width, sy);
            ctx.lineTo(rulerRect.width - w, sy);
            ctx.stroke();

            if (isLarge) {
                ctx.save();
                ctx.translate(10, sy + 2);
                ctx.rotate(-Math.PI / 2);
                ctx.fillText(cy.toString(), 0, 0);
                ctx.restore();
            }
        }
    }
}
