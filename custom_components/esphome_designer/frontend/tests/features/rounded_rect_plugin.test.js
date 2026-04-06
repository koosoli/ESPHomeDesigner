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

import roundedRectPlugin from '../../features/rounded_rect/plugin.js';

describe('rounded_rect plugin', () => {
    beforeEach(() => {
        mockAppState.updateWidget.mockReset();
    });

    it('defaults the border color to the fill color until the user overrides it', () => {
        const host = document.createElement('div');
        const widget = {
            id: 'rounded_rect_1',
            type: 'rounded_rect',
            x: 12,
            y: 18,
            width: 80,
            height: 40,
            props: {
                fill: true,
                color: 'red',
                bg_color: 'yellow',
                border_width: 3,
                radius: 8,
                opa: 200
            }
        };

        roundedRectPlugin.render(host, widget, {
            getColorStyle: (value) => value
        });

        expect(host.style.backgroundColor).toBe('yellow');
        expect(host.style.border).toBe('3px solid yellow');
        expect(host.style.borderRadius).toBe('8px');

        const lvgl = roundedRectPlugin.exportLVGL(widget, {
            common: { id: 'rounded_rect_1' },
            convertColor: (value) => `Color(${value})`,
            formatOpacity: (value) => `opa(${value})`
        });
        expect(lvgl.obj.bg_color).toBe('Color(yellow)');
        expect(lvgl.obj.border_color).toBe('Color(yellow)');

        const openDisplay = roundedRectPlugin.exportOpenDisplay(widget, {
            layout: { darkMode: false },
            _page: {}
        });
        expect(openDisplay.fill).toBe('yellow');
        expect(openDisplay.outline).toBe('yellow');

        const oepl = roundedRectPlugin.exportOEPL(widget, {
            _layout: {},
            _page: {}
        });
        expect(oepl.fill).toBe('yellow');
        expect(oepl.outline).toBe('yellow');

        const lines = [];
        roundedRectPlugin.export(widget, {
            lines,
            getColorConst: (value) => `Color(${value})`,
            addDitherMask: () => {},
            getConditionCheck: () => '',
            RECT_Y_OFFSET: 0,
            isEpaper: false
        });

        const output = lines.join('\n');
        expect(output).toContain('draw_filled_rrect(12, 18, 80, 40, 8, Color(yellow));');
        expect(output).toContain('draw_filled_rrect(15, 21, 74, 34, 5, Color(yellow));');
    });

    it('renders the shared fill and border controls and uses thickness to re-enable hidden borders', () => {
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

        roundedRectPlugin.renderProperties(panel, {
            id: 'rounded_rect_props',
            props: {
                ...roundedRectPlugin.defaults,
                color: 'orange',
                show_border: false
            }
        });

        expect(panel.addLabeledInput).toHaveBeenCalledWith('Border Thickness', 'number', 0, expect.any(Function));

        callbacks['Fill Color']('yellow');
        callbacks['Border Thickness']('4');
        callbacks['Border Color']('purple');
        callbacks['Corner Radius']('12');
        callbacks['Opacity (%)'](75);

        expect(mockAppState.updateWidget.mock.calls.some(([id, payload]) =>
            id === 'rounded_rect_props'
            && payload.props?.bg_color === 'yellow'
            && !Object.prototype.hasOwnProperty.call(payload.props ?? {}, 'color')
        )).toBe(true);
        expect(mockAppState.updateWidget.mock.calls.some(([id, payload]) =>
            id === 'rounded_rect_props'
            && payload.props?.border_width === 4
            && payload.props?.show_border === true
        )).toBe(true);
        expect(mockAppState.updateWidget.mock.calls.some(([id, payload]) =>
            id === 'rounded_rect_props'
            && payload.props?.border_color === 'purple'
            && payload.props?.bg_color === 'yellow'
            && !Object.prototype.hasOwnProperty.call(payload.props ?? {}, 'color')
        )).toBe(true);
        expect(mockAppState.updateWidget.mock.calls.some(([id, payload]) =>
            id === 'rounded_rect_props' && payload.props?.radius === 12
        )).toBe(true);
        expect(mockAppState.updateWidget.mock.calls.some(([id, payload]) =>
            id === 'rounded_rect_props'
            && payload.props?.opacity === 75
            && payload.props?.opa === 191
        )).toBe(true);
        expect(panel.addDropShadowButton).toHaveBeenCalledWith(document.body, 'rounded_rect_props');
    });
});
