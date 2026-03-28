import { describe, expect, it } from 'vitest';

import plugin from '../../features/line/plugin.js';

describe('line plugin', () => {
    it('renders horizontal previews with the configured stroke width', () => {
        const host = document.createElement('div');

        plugin.render(host, {
            id: 'line-1',
            width: 120,
            height: 40,
            props: {
                stroke_width: 5,
                color: 'red'
            }
        }, {
            getColorStyle: (value) => value === 'red' ? 'rgb(255, 0, 0)' : value
        });

        expect(host.style.width).toBe('120px');
        expect(host.style.height).toBe('5px');
        expect(host.style.backgroundColor).toBe('rgb(255, 0, 0)');
    });

    it('exports theme-aware OpenDisplay and explicit OEPL lines', () => {
        const widget = {
            id: 'line-2',
            x: 12.2,
            y: 5.6,
            width: 80.4,
            height: 33.9,
            props: {
                orientation: 'vertical',
                stroke_width: '4',
                color: 'theme_auto'
            }
        };

        const opendisplay = plugin.exportOpenDisplay(widget, {
            layout: { darkMode: true },
            _page: {}
        });
        const oepl = plugin.exportOEPL({
            ...widget,
            props: { ...widget.props, color: 'black' }
        }, {
            _layout: {},
            _page: {}
        });

        expect(opendisplay).toEqual({
            type: 'line',
            x_start: 12,
            y_start: 6,
            x_end: 12,
            y_end: 40,
            fill: 'white',
            width: 4
        });
        expect(oepl.color).toBe('black');
        expect(oepl.y_end).toBe(40);
    });

    it('exports LVGL points and direct rectangles with optional conditions', () => {
        const lvgl = plugin.exportLVGL({
            id: 'line-3',
            width: 90,
            height: 20,
            props: {
                orientation: 'horizontal',
                stroke_width: 6,
                color: 'blue',
                opa: 128
            }
        }, {
            common: { id: 'base' },
            convertColor: (value) => `0x${value}`,
            formatOpacity: (value) => `opa(${value})`
        });

        expect(lvgl.line.points).toEqual([{ x: 0, y: 0 }, { x: 90, y: 0 }]);
        expect(lvgl.line.line_color).toBe('0xblue');
        expect(lvgl.line.opa).toBe('opa(128)');

        const lines = [];
        plugin.export({
            id: 'line-4',
            x: 3.9,
            y: 4.2,
            width: 11.7,
            height: 25.1,
            props: {
                orientation: 'vertical',
                stroke_width: '2',
                color: 'accent'
            }
        }, {
            lines,
            getColorConst: (value) => `COLOR_${value.toUpperCase()}`,
            getCondProps: () => ({}),
            getConditionCheck: () => 'if (is_visible()) {'
        });

        expect(lines).toEqual([
            '        if (is_visible()) {',
            '        it.filled_rectangle(3, 4, 2, 25, COLOR_ACCENT);',
            '        }'
        ]);
    });
});
