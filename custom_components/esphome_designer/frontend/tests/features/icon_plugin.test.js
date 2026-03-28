import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockAppState } = vi.hoisted(() => ({
    mockAppState: {
        entityStates: {},
        updateWidget: vi.fn()
    }
}));

vi.mock('@core/state', () => ({
    AppState: mockAppState
}));

import iconPlugin from '../../features/icon/plugin.js';

describe('Icon Plugin', () => {
    let mockContext;
    let mockWidget;

    beforeEach(() => {
        mockAppState.entityStates = {};
        mockAppState.updateWidget.mockReset();
        mockContext = {
            lines: [],
            getColorConst: vi.fn((c) => `COLOR_${c.toUpperCase()}`),
            addFont: vi.fn(() => 'font_mdi_ref'),
            getCondProps: vi.fn(() => ''),
            getConditionCheck: vi.fn(() => null),
            addDitherMask: vi.fn(),
            isEpaper: false
        };

        mockWidget = {
            id: 'w2',
            type: 'icon',
            x: 50,
            y: 50,
            width: 48,
            height: 48,
            props: {
                code: 'F07D0',
                size: 32,
                color: 'red'
            }
        };
    });

    it('renders fitted icons, unresolved templates, and border styles through the shared preview renderer', () => {
        const host = document.createElement('div');
        iconPlugin.render(host, {
            id: 'icon_render',
            width: 40,
            height: 32,
            props: {
                code: 'F07D0',
                fit_icon_to_frame: true,
                color: 'theme_auto',
                bg_color: 'white',
                border_width: 2,
                border_color: 'black',
                border_radius: 5
            }
        }, {
            getColorStyle: (value) => value === 'theme_auto' ? '#111111' : value
        });

        expect(host.innerText).not.toBe('?');
        expect(host.style.fontSize).toBe('24px');
        expect(host.style.backgroundColor).toBe('white');
        expect(host.style.border).toBe('2px solid black');
        expect(host.style.borderRadius).toBe('5px');

        const unresolvedHost = document.createElement('div');
        iconPlugin.render(unresolvedHost, {
            id: 'icon_template',
            width: 30,
            height: 30,
            props: {
                code: '{{ custom_icon_code }}',
                size: 18,
                color: 'red'
            }
        }, {
            getColorStyle: (value) => value
        });

        expect(unresolvedHost.innerText).toBe('?');
    });

    it('falls back to a visible preview color for templated icon colors and updates props through the property panel', () => {
        const host = document.createElement('div');
        iconPlugin.render(host, {
            id: 'icon_color_template',
            width: 30,
            height: 30,
            props: {
                code: 'F07D0',
                fit_icon_to_frame: false,
                size: 18,
                color: '{{ states("sensor.icon_color") }}',
                bg_color: 'white'
            }
        }, {
            getColorStyle: (value) => value === 'black' ? 'rgb(0, 0, 0)' : value
        });

        expect(host.style.color).toBe('rgb(0, 0, 0)');

        const callbacks = {};
        const panel = {
            createSection: vi.fn(),
            addIconPicker: vi.fn((label, _value, cb) => { callbacks[label] = cb; }),
            addCheckbox: vi.fn((label, _value, cb) => { callbacks[label] = cb; }),
            addLabeledInput: vi.fn((label, _type, _value, cb) => { callbacks[label] = cb; }),
            addColorSelector: vi.fn((label, _value, _preset, cb) => { callbacks[label] = cb; }),
            addNumberWithSlider: vi.fn((label, _value, _min, _max, cb) => { callbacks[label] = cb; }),
            addDropShadowButton: vi.fn(),
            getContainer: vi.fn(() => document.body),
            endSection: vi.fn()
        };

        iconPlugin.renderProperties(panel, {
            id: 'icon_props',
            props: {
                ...iconPlugin.defaults,
                fit_icon_to_frame: false
            }
        });

        callbacks['Select Icon']('F0123');
        callbacks['Fit icon to frame'](false);
        callbacks['Fixed Icon Size']('36');
        callbacks['Icon Color']('red');
        callbacks['Background']('white');
        callbacks['Opacity (%)'](80);
        callbacks['Border Width']('3');
        callbacks['Border Color']('blue');
        callbacks['Corner Radius']('4');

        expect(mockAppState.updateWidget.mock.calls.some(([id, payload]) =>
            id === 'icon_props' && payload.props?.code === 'F0123'
        )).toBe(true);
        expect(mockAppState.updateWidget.mock.calls.some(([id, payload]) =>
            id === 'icon_props' && payload.props?.size === 36
        )).toBe(true);
        expect(mockAppState.updateWidget.mock.calls.some(([id, payload]) =>
            id === 'icon_props' && payload.props?.opacity === 80
        )).toBe(true);
        expect(mockAppState.updateWidget.mock.calls.some(([id, payload]) =>
            id === 'icon_props' && payload.props?.opa === 204
        )).toBe(true);
        expect(mockAppState.updateWidget.mock.calls.some(([id, payload]) =>
            id === 'icon_props' && payload.props?.border_radius === 4
        )).toBe(true);
    });

    it('should generate correct C++ for icon', () => {
        iconPlugin.export(mockWidget, mockContext);

        expect(mockContext.addFont).toHaveBeenCalledWith('Material Design Icons', 400, 32);
        expect(mockContext.getColorConst).toHaveBeenCalledWith('red');

        const output = mockContext.lines.join('\n');
        expect(output).toContain('it.printf(74, 74, id(font_mdi_ref), COLOR_RED, TextAlign::CENTER, "%s", "\\U000F07D0");');
    });

    it('should handle icon codes with 0x prefix', () => {
        mockWidget.props.code = '0xF07D0';
        iconPlugin.export(mockWidget, mockContext);

        const output = mockContext.lines.join('\n');
        expect(output).toContain('"\\U000F07D0"');
    });

    it('should call addDitherMask', () => {
        iconPlugin.export(mockWidget, mockContext);
        expect(mockContext.addDitherMask).toHaveBeenCalled();
    });

    it('draws icon backgrounds and borders in direct export mode', () => {
        iconPlugin.export({
            ...mockWidget,
            width: 60,
            height: 60,
            props: {
                code: 'F07D0',
                size: 24,
                color: 'gray',
                bg_color: 'white',
                border_width: 2,
                border_color: 'blue'
            }
        }, mockContext);

        const output = mockContext.lines.join('\n');
        expect(output).toContain('it.filled_rectangle(50, 50, 60, 60, color_off);');
        expect(output).toContain('it.rectangle(50 + 0, 50 + 0, 60 - 2 * 0, 60 - 2 * 0, COLOR_BLUE);');
        expect(output).toContain('it.rectangle(50 + 1, 50 + 1, 60 - 2 * 1, 60 - 2 * 1, COLOR_BLUE);');
    });

    it('keeps icon glyphs visible when theme-aware backgrounds are exported', () => {
        iconPlugin.export({
            ...mockWidget,
            width: 35,
            height: 42,
            props: {
                code: 'F156D',
                size: 27,
                color: 'black',
                bg_color: 'theme_auto',
                border_width: 1,
                border_color: 'theme_auto_inverse'
            }
        }, mockContext);

        const output = mockContext.lines.join('\n');
        expect(output).toContain('it.filled_rectangle(50, 50, 35, 42, color_off);');
        expect(output).toContain('it.rectangle(50 + 0, 50 + 0, 35 - 2 * 0, 42 - 2 * 0, color_off);');
        expect(output).toContain('it.printf(68, 71, id(font_mdi_ref), color_on, TextAlign::CENTER, "%s", "\\U000F156D");');
    });

    it('uses the dark foreground helper when black backgrounds are exported', () => {
        iconPlugin.export({
            ...mockWidget,
            props: {
                code: 'F07D0',
                size: 24,
                color: 'white',
                bg_color: 'black'
            }
        }, mockContext);

        const output = mockContext.lines.join('\n');
        expect(output).toContain('it.filled_rectangle(50, 50, 48, 48, color_on);');
    });

    it('resolves custom background colors through the export color helper', () => {
        iconPlugin.export({
            ...mockWidget,
            props: {
                code: 'F07D0',
                size: 24,
                color: 'theme_auto_inverse',
                bg_color: 'green'
            }
        }, mockContext);

        const output = mockContext.lines.join('\n');
        expect(mockContext.getColorConst).toHaveBeenCalledWith('green');
        expect(output).toContain('it.filled_rectangle(50, 50, 48, 48, COLOR_GREEN);');
    });

    it('collects icon requirements and exports OpenDisplay, OEPL, and LVGL payloads', () => {
        const requirements = {
            trackIcon: vi.fn(),
            addFont: vi.fn()
        };
        iconPlugin.collectRequirements({
            props: {
                code: 'F0595',
                size: 36
            }
        }, requirements);

        expect(requirements.trackIcon).toHaveBeenCalledWith('F0595', 36);
        expect(requirements.addFont).toHaveBeenCalledWith('Material Design Icons', 400, 36);

        expect(iconPlugin.exportOpenDisplay({
            x: 5,
            y: 6,
            props: {
                code: 'UNKNOWN',
                size: 20,
                color: 'theme_auto'
            }
        }, {
            layout: { darkMode: true },
            _page: {}
        })).toEqual({
            type: 'icon',
            value: 'information',
            x: 5,
            y: 6,
            size: 20,
            fill: 'white'
        });

        expect(iconPlugin.exportOEPL({
            x: 7,
            y: 8,
            props: {
                code: 'UNKNOWN',
                size: 24,
                color: 'red'
            }
        }, {
            _layout: {},
            _page: {}
        })).toEqual({
            type: 'icon',
            value: 'information',
            x: 7,
            y: 8,
            size: 24,
            color: 'red',
            anchor: 'lt'
        });

        expect(iconPlugin.exportLVGL({
            x: 0,
            y: 0,
            props: {
                code: 'F0595',
                size: 32,
                color: 'blue'
            }
        }, {
            common: { id: 'base' },
            convertColor: (value) => `0x${value}`,
            getLVGLFont: (_family, size, weight) => `mdi_${size}_${weight}`
        })).toEqual({
            label: {
                id: 'base',
                text: '"\\U000F0595"',
                text_font: 'mdi_32_400',
                text_color: '0xblue',
                text_align: 'center'
            }
        });
    });
});
