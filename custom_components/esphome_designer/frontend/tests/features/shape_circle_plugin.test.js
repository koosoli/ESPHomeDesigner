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

import shapeCirclePlugin from '../../features/shape_circle/plugin.js';

describe('shape_circle plugin', () => {
    beforeEach(() => {
        mockAppState.updateWidget.mockReset();
    });

    it('renders opacity and export variants with theme-aware fallback colors', () => {
        const host = document.createElement('div');
        shapeCirclePlugin.render(host, {
            id: 'circle_render',
            width: 50,
            height: 50,
            props: {
                fill: true,
                color: 'theme_auto',
                bg_color: 'red',
                border_color: 'blue',
                border_width: 2,
                opacity: 50
            }
        }, {
            getColorStyle: (value) => value
        });

        expect(host.style.backgroundColor).toBe('red');
        expect(host.style.border).toBe('2px solid blue');
        expect(host.style.opacity).toBe('0.5');

        expect(shapeCirclePlugin.exportOpenDisplay({
            x: 10,
            y: 20,
            width: 40,
            height: 60,
            props: {
                fill: true,
                color: 'theme_auto',
                border_color: 'theme_auto',
                border_width: 3
            }
        }, {
            layout: { darkMode: true },
            _page: {}
        })).toEqual({
            type: 'circle',
            x: 30,
            y: 50,
            radius: 20,
            fill: 'white',
            outline: 'white',
            width: 3
        });

        expect(shapeCirclePlugin.exportOEPL({
            x: 0,
            y: 0,
            width: 30,
            height: 30,
            props: {
                fill: false,
                color: 'green',
                border_color: 'theme_auto',
                border_width: 1
            }
        }, {
            _layout: {},
            _page: {}
        })).toEqual({
            type: 'circle',
            x: 15,
            y: 15,
            radius: 15,
            fill: null,
            outline: 'green',
            width: 1
        });

        const lvgl = shapeCirclePlugin.exportLVGL({
            props: {
                fill: false,
                color: 'theme_auto',
                border_color: 'blue',
                border_width: 1,
                opa: 128
            }
        }, {
            common: { id: 'circle' },
            convertColor: (value) => `Color(${value})`,
            formatOpacity: (value) => `opa(${value})`
        });

        expect(lvgl.obj.bg_opa).toBe('transp');
        expect(lvgl.obj.border_color).toBe('Color(blue)');
        expect(lvgl.obj.radius).toBe('CIRCLE');
    });

    it('renders property controls and exports gray fill/border dither branches', () => {
        const callbacks = {};
        const panel = {
            createSection: vi.fn(),
            addCheckbox: vi.fn((label, _value, cb) => { callbacks[label] = cb; }),
            addColorSelector: vi.fn((label, _value, _preset, cb) => { callbacks[label] = cb; }),
            addLabeledInput: vi.fn((label, _type, _value, cb) => { callbacks[label] = cb; }),
            addNumberWithSlider: vi.fn((label, _value, _min, _max, cb) => { callbacks[label] = cb; }),
            addDropShadowButton: vi.fn(),
            getContainer: vi.fn(() => document.body),
            endSection: vi.fn()
        };

        shapeCirclePlugin.renderProperties(panel, {
            id: 'circle_props',
            props: {
                ...shapeCirclePlugin.defaults
            }
        });

        callbacks['Fill Color']('yellow');
        callbacks['Border Thickness']('4');
        callbacks['Border Color']('purple');
        callbacks['Opacity (%)'](80);

        expect(mockAppState.updateWidget.mock.calls.some(([id, payload]) =>
            id === 'circle_props' && payload.props?.bg_color === 'yellow'
        )).toBe(true);
        expect(mockAppState.updateWidget.mock.calls.some(([id, payload]) =>
            id === 'circle_props' && payload.props?.border_width === 4
        )).toBe(true);
        expect(mockAppState.updateWidget.mock.calls.some(([id, payload]) =>
            id === 'circle_props' && payload.props?.border_color === 'purple'
        )).toBe(true);
        expect(mockAppState.updateWidget.mock.calls.some(([id, payload]) =>
            id === 'circle_props' && payload.props?.opacity === 80
        )).toBe(true);
        expect(mockAppState.updateWidget.mock.calls.some(([id, payload]) =>
            id === 'circle_props' && payload.props?.opa === 204
        )).toBe(true);

        const grayLines = [];
        shapeCirclePlugin.export({
            x: 5,
            y: 6,
            width: 40,
            height: 40,
            props: {
                fill: true,
                color: 'gray',
                border_width: 2
            }
        }, {
            lines: grayLines,
            getColorConst: (value) => `Color(${value})`,
            addDitherMask: (target, color) => target.push(`        // dither:${color}`),
            getConditionCheck: () => '',
            RECT_Y_OFFSET: 2,
            isEpaper: true
        });

        const grayOutput = grayLines.join('\n');
        expect(grayOutput).toContain('// dither:gray');
        expect(grayOutput).not.toContain('filled_circle');
        expect(grayOutput).toContain('it.circle(');

        const borderOnlyLines = [];
        shapeCirclePlugin.export({
            x: 1,
            y: 2,
            width: 20,
            height: 20,
            props: {
                fill: false,
                color: 'red',
                border_color: 'blue',
                border_width: 1
            }
        }, {
            lines: borderOnlyLines,
            getColorConst: (value) => `Color(${value})`,
            addDitherMask: (target, color) => target.push(`        // dither:${color}`),
            getConditionCheck: () => 'if (id(show_circle)) {',
            RECT_Y_OFFSET: 0,
            isEpaper: false
        });

        const borderOutput = borderOnlyLines.join('\n');
        expect(borderOutput).toContain('if (id(show_circle)) {');
        expect(borderOutput).toContain('// dither:blue');
        expect(borderOutput.trim().endsWith('}')).toBe(true);
    });

    it('exports a filled non-gray circle with a concrete filled_circle draw call', () => {
        const lines = [];
        shapeCirclePlugin.export({
            x: 2,
            y: 3,
            width: 30,
            height: 30,
            props: {
                fill: true,
                color: 'red',
                border_color: 'black',
                border_width: 0
            }
        }, {
            lines,
            getColorConst: (value) => `Color(${value})`,
            addDitherMask: () => {},
            getConditionCheck: () => '',
            RECT_Y_OFFSET: 0,
            isEpaper: true
        });

        expect(lines.join('\n')).toContain('it.filled_circle');
    });
});
