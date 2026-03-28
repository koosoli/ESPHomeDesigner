/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from 'vitest';
import shapeRectPlugin from '../../features/shape_rect/plugin.js';

describe('shape_rect plugin render', () => {
    it('applies border radius to canvas element style', () => {
        const el = document.createElement('div');
        const widget = {
            id: 'rect_1',
            type: 'shape_rect',
            x: 0,
            y: 0,
            width: 100,
            height: 60,
            props: {
                radius: 14,
                fill: true,
                color: 'black',
                border_width: 2,
                border_color: 'black'
            }
        };

        shapeRectPlugin.render(el, widget, {
            getColorStyle: (color) => color
        });

        expect(el.style.borderRadius).toBe('14px');
    });

    it('falls back to legacy border_radius when radius is not set', () => {
        const el = document.createElement('div');
        const widget = {
            id: 'rect_legacy',
            type: 'shape_rect',
            x: 0,
            y: 0,
            width: 100,
            height: 60,
            props: {
                border_radius: 9,
                fill: false,
                color: 'black',
                border_width: 1,
                border_color: 'black'
            }
        };

        shapeRectPlugin.render(el, widget, {
            getColorStyle: (color) => color
        });

        expect(el.style.borderRadius).toBe('9px');
    });

    it('exports LVGL, OpenDisplay, OEPL, and direct rectangles with consistent radius handling', () => {
        const widget = {
            id: 'rect_export',
            type: 'shape_rect',
            x: 4,
            y: 6,
            width: 80,
            height: 40,
            props: {
                fill: true,
                color: 'theme_auto',
                bg_color: 'red',
                border_color: 'blue',
                border_width: 2,
                radius: 6,
                opa: 200
            }
        };

        const lvgl = shapeRectPlugin.exportLVGL(widget, {
            common: { id: 'rect_export' },
            convertColor: (value) => `COLOR_${value}`,
            formatOpacity: (value) => `opa(${value})`
        });
        expect(lvgl.obj.radius).toBe(6);
        expect(lvgl.obj.bg_color).toBe('COLOR_red');
        expect(lvgl.obj.border_color).toBe('COLOR_blue');

        const openDisplay = shapeRectPlugin.exportOpenDisplay(widget, {
            layout: { darkMode: false },
            _page: {}
        });
        expect(openDisplay.fill).toBe('red');
        expect(openDisplay.outline).toBe('blue');
        expect(openDisplay.radius).toBe(6);

        const oepl = shapeRectPlugin.exportOEPL(widget, {
            _layout: {},
            _page: {}
        });
        expect(oepl.fill).toBe('red');
        expect(oepl.outline).toBe('blue');
        expect(oepl.radius).toBe(6);

        const lines = [];
        shapeRectPlugin.export(widget, {
            lines,
            getColorConst: (value) => `Color(${value})`,
            addDitherMask: (target, color) => target.push(`        // dither:${color}`),
            getConditionCheck: () => '',
            isEpaper: true,
            RECT_Y_OFFSET: 2
        });
        const output = lines.join('\n');
        expect(output).toContain('it.filled_rectangle(4, 8, 80, 40, Color(red));');
        expect(output).toContain('it.rectangle(4 + i, 8 + i, 80 - 2 * i, 40 - 2 * i, Color(blue));');
        expect(output).toContain('// dither:red');
    });
});
