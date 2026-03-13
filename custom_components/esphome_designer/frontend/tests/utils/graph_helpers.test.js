import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import {
    parseDuration,
    generateMockData,
    generateHistoricalDataPoints,
    drawInternalGrid,
    drawSmartAxisLabels
} from '../../js/utils/graph_helpers.js';

describe('graph_helpers', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
        vi.spyOn(Math, 'random').mockReturnValue(0.5);
    });

    it('parses duration variants', () => {
        expect(parseDuration()).toBe(3600);
        expect(parseDuration(42)).toBe(42);
        expect(parseDuration('120')).toBe(120);
        expect(parseDuration('10m')).toBe(600);
        expect(parseDuration('2h')).toBe(7200);
        expect(parseDuration('1d')).toBe(86400);
        expect(parseDuration('bad')).toBe(3600);
    });

    it('generates deterministic mock points shape', () => {
        const points = generateMockData(200, 100);
        expect(points).toHaveLength(50);
        expect(points[0].x).toBe(0);
        expect(points[49].x).toBe(200);
        expect(points.every(p => p.y >= 0 && p.y <= 100)).toBe(true);
    });

    it('maps historical points and appends tail point when needed', () => {
        const now = Date.now();
        vi.spyOn(Date, 'now').mockReturnValue(now);
        const historyData = [
            { last_changed: new Date(now - 3600_000).toISOString(), state: '10' },
            { last_changed: new Date(now - 1800_000).toISOString(), state: '20' },
            { last_changed: new Date(now - 600_000).toISOString(), state: '30' }
        ];

        const points = generateHistoricalDataPoints(200, 100, 0, 100, historyData, '1h');
        expect(points.length).toBeGreaterThan(2);
        expect(points[0].x).toBeGreaterThanOrEqual(-10);
        expect(points.at(-1).x).toBeLessThanOrEqual(200);
    });

    it('falls back to mock points for empty/invalid history', () => {
        const empty = generateHistoricalDataPoints(100, 50, 0, 10, [], '1h');
        const invalid = generateHistoricalDataPoints(100, 50, 0, 10, [{ state: 'nan' }], '1h');
        expect(empty).toHaveLength(50);
        expect(invalid).toHaveLength(50);
    });

    it('draws grid and axis labels onto dom', () => {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        drawInternalGrid(svg, 200, 100, '', '');
        expect(svg.querySelectorAll('line').length).toBeGreaterThan(0);

        const container = document.createElement('div');
        container.style.width = '240px';
        container.style.height = '140px';
        document.body.appendChild(container);

        drawSmartAxisLabels(container, 20, 20, 180, 80, 0, 100, '1h', 'w1');
        const labels = container.querySelectorAll('.graph-axis-label[data-widget-id="w1"]');
        expect(labels.length).toBeGreaterThan(0);

        drawSmartAxisLabels(container, 20, 20, 180, 80, 0, 100, '1h', 'w1');
        expect(container.querySelectorAll('.graph-axis-label[data-widget-id="w1"]').length).toBe(labels.length);
    });
});
