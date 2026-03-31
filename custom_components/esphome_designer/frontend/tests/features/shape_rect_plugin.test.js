/**
 * @vitest-environment jsdom
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockAppState } = vi.hoisted(() => ({
    mockAppState: {
        updateWidget: vi.fn()
    }
}));

vi.mock('@core/state', () => ({
    AppState: mockAppState
}));

import shapeRectPlugin from '../../features/shape_rect/plugin.js';

describe('shape_rect plugin', () => {
    beforeEach(() => {
        mockAppState.updateWidget.mockReset();
    });

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

    it('prefers explicit colors and applies opacity when rendering', () => {
        const el = document.createElement('div');
        const widget = {
            id: 'rect_theme',
            type: 'shape_rect',
            x: 0,
            y: 0,
            width: 80,
            height: 30,
            props: {
                fill: true,
                color: 'theme_auto',
                bg_color: 'red',
                border_color: 'blue',
                border_width: 3,
                opacity: 60,
                corner_radius: 11
            }
        };

        shapeRectPlugin.render(el, widget, {
            getColorStyle: (color) => color
        });

        expect(el.style.backgroundColor).toBe('red');
        expect(el.style.border).toBe('3px solid blue');
        expect(el.style.borderRadius).toBe('11px');
        expect(el.style.opacity).toBe('0.6');
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
        expect(output).toContain('draw_filled_rrect(4, 8, 80, 40, 6, Color(blue));');
        expect(output).toContain('draw_filled_rrect(6, 10, 76, 36, 4, Color(red));');
        expect(output).toContain('// dither:red');
    });

    it('renders property controls and updates rectangle props through AppState', () => {
        const callbacks = {};
        const panel = {
            createSection: vi.fn(),
            addCheckbox: vi.fn((label, _value, callback) => { callbacks[label] = callback; }),
            addColorSelector: vi.fn((label, _value, _preset, callback) => { callbacks[label] = callback; }),
            addLabeledInput: vi.fn((label, _type, _value, callback) => { callbacks[label] = callback; }),
            addNumberWithSlider: vi.fn((label, _value, _min, _max, callback) => { callbacks[label] = callback; }),
            addDropShadowButton: vi.fn(),
            getContainer: vi.fn(() => document.body),
            endSection: vi.fn()
        };

        shapeRectPlugin.renderProperties(panel, {
            id: 'rect_props',
            props: {
                ...shapeRectPlugin.defaults
            }
        });

        callbacks['Fill Rectangle'](true);
        callbacks['Main Color']('orange');
        callbacks['Fill Color Override']('yellow');
        callbacks['Border Thickness']('4');
        callbacks['Border Color']('purple');
        callbacks['Corner Radius']('9');
        callbacks['Opacity (%)'](80);

        expect(mockAppState.updateWidget.mock.calls.some(([id, payload]) =>
            id === 'rect_props' && payload.props?.fill === true
        )).toBe(true);
        expect(mockAppState.updateWidget.mock.calls.some(([id, payload]) =>
            id === 'rect_props' && payload.props?.color === 'orange'
        )).toBe(true);
        expect(mockAppState.updateWidget.mock.calls.some(([id, payload]) =>
            id === 'rect_props' && payload.props?.bg_color === 'yellow'
        )).toBe(true);
        expect(mockAppState.updateWidget.mock.calls.some(([id, payload]) =>
            id === 'rect_props' && payload.props?.border_width === 4
        )).toBe(true);
        expect(mockAppState.updateWidget.mock.calls.some(([id, payload]) =>
            id === 'rect_props' && payload.props?.border_color === 'purple'
        )).toBe(true);
        expect(mockAppState.updateWidget.mock.calls.some(([id, payload]) =>
            id === 'rect_props' && payload.props?.radius === 9
        )).toBe(true);
        expect(mockAppState.updateWidget.mock.calls.some(([id, payload]) =>
            id === 'rect_props' && payload.props?.opacity === 80
        )).toBe(true);
        expect(mockAppState.updateWidget.mock.calls.some(([id, payload]) =>
            id === 'rect_props' && payload.props?.opa === 204
        )).toBe(true);
        expect(panel.addDropShadowButton).toHaveBeenCalledWith(document.body, 'rect_props');
    });

    it('exports rounded border-only and borderless fill branches', () => {
        const borderLines = [];
        shapeRectPlugin.export({
            x: 2,
            y: 3,
            width: 30,
            height: 20,
            props: {
                fill: false,
                color: 'red',
                border_color: 'blue',
                border_width: 2,
                radius: 5
            }
        }, {
            lines: borderLines,
            getColorConst: (value) => `Color(${value})`,
            addDitherMask: (target, color) => target.push(`        // dither:${color}`),
            getConditionCheck: () => 'if (id(show_rect)) {',
            RECT_Y_OFFSET: 1,
            isEpaper: false
        });

        const borderOutput = borderLines.join('\n');
        expect(borderOutput).toContain('if (id(show_rect)) {');
        expect(borderOutput).toContain('draw_rrect_border(2, 4, 30, 20, 5, 2, Color(blue));');
        expect(borderOutput).toContain('// dither:blue');
        expect(borderOutput.trim().endsWith('}')).toBe(true);

        const fillLines = [];
        shapeRectPlugin.export({
            x: 10,
            y: 11,
            width: 24,
            height: 18,
            props: {
                fill: true,
                color: 'gray',
                border_width: '0',
                border_radius: 4
            }
        }, {
            lines: fillLines,
            getColorConst: (value) => `Color(${value})`,
            addDitherMask: (target, color) => target.push(`        // dither:${color}`),
            getConditionCheck: () => '',
            RECT_Y_OFFSET: 0,
            isEpaper: true
        });

        const fillOutput = fillLines.join('\n');
        expect(fillOutput).toContain('// dither:gray');
        expect(fillOutput).not.toContain('draw_filled_rrect(10, 11, 24, 18, 4, Color(gray));');
    });

    it('wraps each rounded direct-export rectangle in its own scope to avoid helper name collisions', () => {
        const lines = [];
        const context = {
            lines,
            getColorConst: (value) => `Color(${value})`,
            addDitherMask: () => {},
            getConditionCheck: () => '',
            RECT_Y_OFFSET: 0,
            isEpaper: false
        };

        shapeRectPlugin.export({
            x: 0,
            y: 0,
            width: 20,
            height: 20,
            props: {
                fill: false,
                color: 'red',
                border_width: 2,
                radius: 5
            }
        }, context);

        shapeRectPlugin.export({
            x: 30,
            y: 0,
            width: 20,
            height: 20,
            props: {
                fill: false,
                color: 'blue',
                border_width: 2,
                radius: 5
            }
        }, context);

        expect(lines.filter((line) => line.trim() === '{')).toHaveLength(2);
        expect(lines.filter((line) => line.includes('auto draw_rrect_border'))).toHaveLength(2);
    });
});
