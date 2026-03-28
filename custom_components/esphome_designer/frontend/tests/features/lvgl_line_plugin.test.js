import { beforeEach, describe, expect, it } from 'vitest';

import plugin from '../../features/lvgl_line/plugin.js';

describe('lvgl line plugin', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    it('renders SVG previews from custom point arrays', () => {
        const host = document.createElement('div');

        plugin.render(host, {
            id: 'line_points',
            width: 80,
            height: 40,
            props: {
                points: [[0, 0], [20, 10], '40,5'],
                line_color: 'red',
                line_width: 4,
                opa: 128
            }
        }, {
            getColorStyle: (value) => `css-${value}`
        });

        const polyline = host.querySelector('polyline');
        expect(polyline?.getAttribute('points')).toBe('0,0 20,10 40,5');
        expect(polyline?.getAttribute('stroke')).toBe('css-red');
        expect(polyline?.getAttribute('stroke-linecap')).toBe('round');
        expect(parseFloat(host.style.opacity)).toBeCloseTo(128 / 255, 4);
    });

    it('renders vertical fallback lines when no custom points are supplied', () => {
        const host = document.createElement('div');

        plugin.render(host, {
            id: 'line_vertical',
            width: 30,
            height: 60,
            props: {
                orientation: 'vertical',
                line_width: 5,
                color: 'blue'
            }
        }, {
            getColorStyle: (value) => value
        });

        expect(host.style.width).toBe('5px');
        expect(host.style.height).toBe('60px');
        expect(host.style.backgroundColor).toBe('blue');
        expect(host.style.borderRadius).toBe('5px');
    });

    it('exports custom points and orientation defaults for LVGL', () => {
        const custom = plugin.exportLVGL({
            id: 'line_export',
            width: 80,
            height: 40,
            props: {
                points: [[1, 2], [15, 18]],
                line_color: 'green',
                line_width: 6,
                opa: 200
            }
        }, {
            common: { id: 'base' },
            convertColor: (value) => `0x${String(value).toUpperCase()}`,
            formatOpacity: (value) => `opa(${value})`
        });

        expect(custom.line.points).toEqual([{ x: 1, y: 2 }, { x: 15, y: 18 }]);
        expect(custom.line.line_width).toBe(6);
        expect(custom.line.line_color).toBe('0xGREEN');
        expect(custom.line.opa).toBe('opa(200)');

        const vertical = plugin.exportLVGL({
            id: 'line_vertical',
            width: 20,
            height: 55,
            props: {
                orientation: 'vertical'
            }
        }, {
            common: { id: 'base' },
            convertColor: (value) => value,
            formatOpacity: (value) => value
        });

        expect(vertical.line.points).toEqual([{ x: 0, y: 0 }, { x: 0, y: 55 }]);
    });
});
