import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockAppState } = vi.hoisted(() => ({
    mockAppState: {
        entityStates: {}
    }
}));

vi.mock('@core/state', () => ({
    AppState: mockAppState
}));

vi.mock('../../js/utils/template_converter.js', () => ({
    TemplateConverter: {
        toHATemplate: (entityId, { precision, isNumeric }) => `TPL(${entityId}|${precision}|${isNumeric})`
    }
}));

import { exportDirect } from '../../features/sensor_text/exports_direct.js';
import {
    collectRequirements,
    exportLVGL,
    exportOEPL,
    exportOpenDisplay
} from '../../features/sensor_text/exports_presentation.js';
import {
    HA_TEXT_DOMAINS,
    hexToRgb,
    isColorDisplay,
    isStrictlyNumeric,
    lerpColor
} from '../../features/sensor_text/shared.js';

describe('sensor_text export variants', () => {
    beforeEach(() => {
        mockAppState.entityStates = {};
    });

    it('exports direct-mode wrapped numeric labels with heuristic units and dynamic colors', () => {
        mockAppState.entityStates = {
            'sensor.room_power': {
                state: '23.45',
                attributes: {
                    friendly_name: 'Room Power'
                }
            }
        };

        const lines = [];
        exportDirect({
            id: 'sensor_direct',
            x: 10,
            y: 20,
            width: 140,
            height: 60,
            entity_id: 'room_power',
            title: 'Power',
            props: {
                value_format: 'label_value',
                label_font_size: 12,
                value_font_size: 18,
                precision: 1,
                dynamic_color_enabled: true,
                dynamic_color_low: '#0000ff',
                dynamic_color_high: '#ff0000',
                dynamic_value_low: 0,
                dynamic_value_high: 100,
                border_width: 1,
                border_color: 'blue',
                bg_color: 'white',
                text_align: 'TOP_LEFT'
            }
        }, {
            lines,
            addFont: vi.fn(() => 'sensor_font'),
            getColorConst: (value) => `Color(${value})`,
            getConditionCheck: () => '',
            profile: { name: 'Color Display' }
        });

        const output = lines.join('\n');
        expect(output).toContain('it.filled_rectangle(10, 20, 140, 60, Color(white));');
        expect(output).toContain('it.rectangle(10 + 0, 20 + 0, 140 - 2 * 0, 60 - 2 * 0, Color(blue));');
        expect(output).toContain('Color dyn_color(r, g, b);');
        expect(output).toContain('print_wrapped_text(');
        expect(output).toContain('id(sensor_room_power).state');
        expect(output).toContain('%.1f W');
    });

    it('exports direct-mode horizontal layout with same font sizes', () => {
        const lines = [];
        exportDirect({
            id: 'sensor_same_font',
            x: 10,
            y: 20,
            width: 40,
            height: 60,
            entity_id: 'room_power',
            title: 'Power',
            props: {
                value_format: 'label_value',
                label_font_size: 12,
                value_font_size: 12,
                precision: 1,
                text_align: 'TOP_LEFT'
            }
        }, {
            lines,
            addFont: vi.fn(() => 'sensor_font'),
            getColorConst: (value) => `Color(${value})`,
            getConditionCheck: () => '',
            profile: { name: 'Color Display' }
        });

        const output = lines.join('\n');
        expect(output).toContain('it.printf(10, 20, id(sensor_font),');
    });

    it('keeps the value visible when an automatic label is wider than the widget', () => {
        const lines = [];
        exportDirect({
            id: 'sensor_narrow', x: 10, y: 20, width: 147, height: 40,
            entity_id: 'sensor.openweathermap_temperature',
            props: { value_format: 'label_value', text_align: 'TOP_LEFT' }
        }, {
            lines,
            addFont: vi.fn(() => 'sensor_font'),
            getColorConst: (value) => `Color(${value})`,
            getConditionCheck: () => '',
            profile: { name: 'Color Display' }
        });

        const output = lines.join('\n');
        expect(output).toContain('if (w1 >= 147) {');
        expect(output).toContain('it.printf(10, 20, id(sensor_font),');
        expect(output).toContain('print_wrapped_text(10 + w1, 20 +');
    });

    it('exports direct-mode vertical layout with center/middle alignment', () => {
        const lines = [];
        exportDirect({
            id: 'sensor_vertical_center',
            x: 10,
            y: 20,
            width: 100,
            height: 60,
            entity_id: 'room_power',
            title: 'Power',
            props: {
                value_format: 'label_newline_value',
                label_font_size: 12,
                value_font_size: 14,
                text_align: 'MIDDLE_CENTER'
            }
        }, {
            lines,
            addFont: vi.fn(() => 'sensor_font'),
            getColorConst: (value) => `Color(${value})`,
            getConditionCheck: () => '',
            profile: { name: 'Color Display' }
        });

        const output = lines.join('\n');
        expect(output).toContain(' + -8,'); // yOff = -16 / 2 = -8
    });

    it('exports direct-mode text attributes and secondary text sensors via safe ids', () => {
        mockAppState.entityStates = {
            'weather.home': {
                state: 'sunny',
                attributes: {
                    forecast: {
                        headline: 'Warm'
                    }
                }
            },
            'sensor.detail': {
                state: 'clear',
                attributes: {
                    friendly_name: 'Detailed'
                }
            }
        };

        const lines = [];
        exportDirect({
            id: 'sensor_textual',
            x: 0,
            y: 0,
            width: 70,
            height: 20,
            entity_id: 'weather.home',
            entity_id_2: 'sensor.detail',
            title: 'Forecast',
            props: {
                value_format: 'value_only',
                attribute: 'forecast.headline',
                attribute2: 'friendly_name',
                separator: ' / '
            }
        }, {
            lines,
            addFont: vi.fn(() => 'sensor_font'),
            getColorConst: (value) => `Color(${value})`,
            getConditionCheck: () => ''
        });

        const output = lines.join('\n');
        expect(output).toContain('id(weather_home_forecast_txt).state.c_str()');
        expect(output).toContain('id(sensor_detail_friendly_name_txt).state.c_str()');
        expect(output).toContain('%s / %s');
    });

    it('exports LVGL, OpenDisplay, and OEPL variants with stable text formatting', () => {
        mockAppState.entityStates = {
            'sensor.power': {
                state: '12.4',
                attributes: {
                    unit_of_measurement: 'W'
                }
            }
        };

        const lvgl = exportLVGL({
            id: 'sensor_lvgl',
            entity_id: '',
            title: 'Static',
            props: {
                value_format: 'label_only',
                color: 'red',
                bg_color: 'white',
                value_font_size: 18,
                text_align: 'BOTTOM_CENTER'
            }
        }, {
            common: { id: 'sensor_lvgl' },
            convertColor: (value) => `COLOR_${String(value).toUpperCase()}`,
            getLVGLFont: () => 'font_lvgl',
            formatOpacity: (value) => `opa(${value})`,
            profile: { name: 'Color Display' }
        });
        expect(lvgl.label.text).toBe('"Static"');
        expect(lvgl.label.text_align).toBe('CENTER');

        const openDisplay = exportOpenDisplay({
            id: 'sensor_open',
            entity_id: 'sensor.power',
            entity_id_2: 'sensor.energy',
            title: 'Power',
            x: 5,
            y: 6,
            width: 80,
            props: {
                value_format: 'label_newline_value',
                precision: 1,
                separator: ' / ',
                unit: 'W',
                font_size: 14,
                color: 'theme_auto',
                text_align: 'BOTTOM_RIGHT',
                parse_colors: true
            }
        }, {
            layout: { darkMode: true },
            _page: {}
        });
        expect(openDisplay.type).toBe('multiline');
        expect(openDisplay.value).toContain('Power');
        expect(openDisplay.value).toContain('TPL(sensor.power|1|true) / TPL(sensor.energy|1|true) W');

        const truncatedOpenDisplay = exportOpenDisplay({
            id: 'sensor_truncate',
            entity_id: 'sensor.long_name',
            title: 'Long',
            x: 5,
            y: 6,
            width: 80,
            props: {
                value_format: 'label_value',
                precision: 1,
                value_font_size: 14,
                color: 'black',
                text_align: 'TOP_LEFT',
                truncate: true
            }
        }, {
            layout: { darkMode: false },
            _page: {}
        });
        expect(truncatedOpenDisplay).toMatchObject({
            type: 'text',
            max_width: 80,
            truncate: true
        });

        const oepl = exportOEPL({
            id: 'sensor_oepl',
            entity_id: 'sensor.power',
            title: 'Power',
            x: 10,
            y: 12,
            width: 100,
            props: {
                value_format: 'value_label',
                precision: 0,
                color: 'theme_auto',
                text_align: 'CENTER_RIGHT',
                parse_colors: true
            }
        }, {
            layout: { darkMode: false },
            _page: {}
        });
        expect(oepl.value).toContain('TPL(sensor.power|0|true) Power');
        expect(oepl.align).toBe('centerright');
    });

    it('exports direct variants for missing sensors, local sensors, and multiline labels', () => {
        mockAppState.entityStates = {
            'sensor.voltage': {
                formatted: '230 V',
                state: '230',
                attributes: {}
            },
            'sensor.ambient': {
                state: '18.5'
            }
        };

        const missingLines = [];
        exportDirect({
            id: 'sensor_missing',
            x: 1,
            y: 2,
            width: 20,
            height: 10,
            title: 'Missing',
            props: {}
        }, {
            lines: missingLines,
            addFont: vi.fn(() => 'sensor_font'),
            getColorConst: (value) => `Color(${value})`,
            getConditionCheck: () => ''
        });
        expect(missingLines.join('\n')).toContain('// Sensor ID missing for this widget');

        const localLines = [];
        exportDirect({
            id: 'sensor_local',
            x: 3,
            y: 4,
            width: 40,
            height: 18,
            entity_id: '',
            entity_id_2: 'ambient',
            title: 'Voltage',
            props: {
                is_local_sensor: true,
                value_format: 'label_newline_value',
                precision: -1,
                unit: '',
                text_align: 'BOTTOM_CENTER'
            }
        }, {
            lines: localLines,
            addFont: vi.fn(() => 'sensor_font'),
            getColorConst: (value) => `Color(${value})`,
            getConditionCheck: () => ''
        });

        const localOutput = localLines.join('\n');
        expect(localOutput).toContain('TextAlign::BOTTOM_CENTER');
        expect(localOutput).toContain('Voltage');
        expect(localOutput).toContain('id(ambient).state');
        expect(localOutput).toContain('V');

        const valueLabelLines = [];
        exportDirect({
            id: 'sensor_value_label',
            x: 0,
            y: 0,
            width: 40,
            height: 20,
            entity_id: 'voltage',
            title: 'Line',
            props: {
                value_format: 'value_label',
                precision: 0,
                text_align: 'CENTER_RIGHT'
            }
        }, {
            lines: valueLabelLines,
            addFont: vi.fn(() => 'sensor_font'),
            getColorConst: (value) => `Color(${value})`,
            getConditionCheck: () => ''
        });

        expect(valueLabelLines.join('\n')).toContain('it.printf(40, 10, id(sensor_font), Color(theme_auto), TextAlign::CENTER_RIGHT');
        expect(valueLabelLines.join('\n')).toContain('"Line"');
    });

    it('exports presentation variants with text attributes, dynamic color fallbacks, and font collection', () => {
        mockAppState.entityStates = {
            'sensor.power': {
                state: '12.4',
                formatted: '12.4 W',
                attributes: {
                    unit_of_measurement: 'W'
                }
            },
            'weather.home': {
                state: 'sunny',
                attributes: {
                    forecast: {
                        headline: 'Clear'
                    }
                }
            }
        };

        const lvgl = exportLVGL({
            id: 'sensor_lvgl_text',
            entity_id: 'power',
            entity_id_2: 'weather.home',
            title: '',
            props: {
                attribute2: 'forecast.headline',
                value_format: 'label_value',
                precision: 1,
                dynamic_color_enabled: true,
                dynamic_color_low: '#010203',
                dynamic_color_high: '#a0b0c0',
                text_align: 'CENTER_LEFT',
                bg_color: 'white',
                font_family: 'Roboto',
                value_font_size: 18,
                label_font_size: 12,
                color: 'red'
            }
        }, {
            common: { id: 'sensor_lvgl' },
            convertColor: (value) => `COLOR_${String(value).toUpperCase()}`,
            getLVGLFont: (...args) => args.join('_'),
            formatOpacity: (value) => `opa(${value})`,
            profile: { features: { lcd: true } }
        });

        expect(lvgl.label.text).toContain('sensor_power');
        expect(lvgl.label.text).toContain('weather_home_forecast_txt');
        expect(lvgl.label.text_color).toContain('lv_color_make');
        expect(lvgl.label.text_align).toBe('LEFT');
        expect(lvgl.label.bg_color).toBe('COLOR_WHITE');

        const openDisplay = exportOpenDisplay({
            id: 'sensor_odp',
            entity_id: 'sensor.power',
            title: 'Power',
            x: 1,
            y: 2,
            width: 90,
            props: {
                value_format: 'label_only',
                color: 'theme_auto',
                dynamic_color_enabled: true,
                dynamic_color_low: '#abcdef',
                font_family: 'Roboto Mono'
            }
        }, {
            layout: { darkMode: false },
            _page: {}
        });
        expect(openDisplay.value).toBe('Power');
        expect(openDisplay.color).toBe('#abcdef');
        expect(openDisplay.font).toBe('mononoki.ttf');
        expect(openDisplay.max_width).toBe(90);

        const centeredOpenDisplay = exportOpenDisplay({
            id: 'sensor_centered_odp',
            entity_id: 'sensor.power',
            x: 10,
            y: 12,
            width: 96,
            props: {
                value_format: 'value_only',
                color: 'black',
                text_align: 'CENTER'
            }
        }, {
            layout: { darkMode: false },
            _page: {}
        });
        expect(centeredOpenDisplay).toMatchObject({
            type: 'text',
            anchor: 'mm',
            x: 58,
            max_width: 96
        });

        const oepl = exportOEPL({
            id: 'sensor_oepl_multiline',
            entity_id: 'sensor.power',
            title: 'Power',
            x: 1,
            y: 2,
            width: 80,
            props: {
                value_format: 'label_newline_value',
                color: 'theme_auto',
                dynamic_color_enabled: true,
                dynamic_color_low: '#123456',
                border_width: 2,
                border_radius: 6
            }
        }, {
            layout: { darkMode: true },
            _page: {}
        });
        expect(oepl.value).toContain('Power\nTPL(sensor.power|0|true)');
        expect(oepl.color).toBe('#123456');
        expect(oepl.max_width).toBe(80);
        expect(oepl.border_side).toBe('full');

        const addFont = vi.fn();
        collectRequirements({
            props: {
                font_family: 'Roboto',
                font_weight: 600,
                italic: true,
                label_font_size: 11,
                value_font_size: 19
            }
        }, { addFont });

        expect(addFont).toHaveBeenCalledWith('Roboto', 600, 11, true);
        expect(addFont).toHaveBeenCalledWith('Roboto', 600, 19, true);
    });

    it('covers shared helper behavior for numeric detection and color interpolation', () => {
        expect(isStrictlyNumeric(' 12.5 ')).toBe(true);
        expect(isStrictlyNumeric('12abc')).toBe(false);
        expect(hexToRgb('#123456')).toEqual({ r: 18, g: 52, b: 86 });
        expect(lerpColor('#000000', '#ffffff', 0.5)).toBe('rgb(128, 128, 128)');
        expect(HA_TEXT_DOMAINS).toContain('weather.');
        expect(isColorDisplay({ features: { lcd: true } })).toBe(true);
        expect(isColorDisplay({ name: '6-Color Panel' })).toBe(true);
        expect(isColorDisplay({ name: 'Mono Panel' })).toBe(false);
    });

    it('covers presentation export edge formatting for sensor text', () => {
        mockAppState.entityStates = {
            'sensor.voltage': {
                state: '230',
                formatted: '230 V',
                attributes: {}
            },
            'sensor.room_mode': {
                state: 'night',
                attributes: {
                    display: 'Night mode'
                }
            }
        };

        const lvgl = exportLVGL({
            id: 'sensor_lvgl_edge',
            entity_id: 'voltage',
            entity_id_2: 'room_mode',
            title: 'Voltage',
            props: {
                value_format: 'value_label',
                attribute2: 'display',
                separator: ' / ',
                value_align: 'CENTER_RIGHT',
                bg_color: 'transparent',
                value_font_size: 16
            }
        }, {
            common: { id: 'sensor_lvgl_edge' },
            convertColor: (value) => `COLOR_${String(value).toUpperCase()}`,
            getLVGLFont: () => 'font_lvgl',
            formatOpacity: (value) => `opa(${value})`,
            profile: { name: 'Mono Panel' }
        });

        expect(lvgl.label.text).toContain('sensor_voltage');
        expect(lvgl.label.text).toContain('sensor_room_mode_display_txt');
        expect(lvgl.label.text).toContain('%s');
        expect(lvgl.label.text_align).toBe('RIGHT');
        expect(lvgl.label.bg_color).toBeUndefined();

        const openDisplay = exportOpenDisplay({
            id: 'sensor_odp_edge',
            entity_id: 'sensor.voltage',
            title: 'Voltage',
            x: 4,
            y: 8,
            width: 120,
            props: {
                value_format: 'value_label',
                precision: 0,
                unit: 'V',
                postfix: '!',
                text_align: 'BOTTOM_RIGHT',
                color: 'black'
            }
        }, {
            layout: { darkMode: false },
            _page: {}
        });

        expect(openDisplay).toMatchObject({
            type: 'text',
            anchor: 'rb',
            x: 124,
            value: 'TPL(sensor.voltage|0|true) V! Voltage',
            max_width: 120
        });

        const topCenterOpenDisplay = exportOpenDisplay({
            id: 'sensor_odp_top_center',
            entity_id: 'sensor.power',
            x: 10,
            y: 20,
            width: 100,
            height: 30,
            props: {
                value_format: 'value_only',
                text_align: 'TOP_CENTER',
                color: 'black'
            }
        }, {
            layout: { darkMode: false },
            _page: {}
        });
        expect(topCenterOpenDisplay).toMatchObject({
            type: 'text',
            x: 60,
            y: 20,
            anchor: 'ma',
            max_width: 100
        });
    });
    it('exports value and unit as separate printf calls when unit_font_size differs (BOTTOM align)', () => {
        mockAppState.entityStates = {
            'sensor.power': { state: '42.5', attributes: { unit_of_measurement: 'W' } }
        };

        const lines = [];
        const addFontMock = vi.fn((family, weight, size) => `font_${size}`);
        exportDirect({
            id: 'sensor_unit_split_bottom',
            x: 10,
            y: 20,
            width: 150,
            height: 60,
            entity_id: 'sensor.power',
            props: {
                value_format: 'value_only',
                value_font_size: 40,
                unit_font_size: 14,
                unit_align: 'BOTTOM',
                precision: 1,
                text_align: 'TOP_LEFT'
            }
        }, {
            lines,
            addFont: addFontMock,
            getColorConst: (v) => `Color(${v})`,
            getConditionCheck: () => '',
            profile: {}
        });

        const joined = lines.join('\n');
        // Should use measure + two printf calls
        expect(joined).toContain('measure(val_buf');
        expect(joined).toContain('id(font_40)');
        expect(joined).toContain('id(font_14)');
        // Unit should be placed with TOP_LEFT alignment
        expect(joined).toContain('TextAlign::TOP_LEFT');
        expect(joined).toContain('"W"');
    });

    it('exports unit with TOP y-offset when unit_align is TOP', () => {
        mockAppState.entityStates = {
            'sensor.temp': { state: '23', attributes: { unit_of_measurement: '°C' } }
        };

        const lines = [];
        exportDirect({
            id: 'sensor_unit_top',
            x: 0,
            y: 10,
            width: 150,
            height: 60,
            entity_id: 'sensor.temp',
            props: {
                value_format: 'value_only',
                value_font_size: 36,
                unit_font_size: 12,
                unit_align: 'TOP',
                precision: 0,
                text_align: 'TOP_LEFT'
            }
        }, {
            lines,
            addFont: (family, weight, size) => `f${size}`,
            getColorConst: (v) => `Color(${v})`,
            getConditionCheck: () => '',
            profile: {}
        });

        const joined = lines.join('\n');
        // For TOP align, unit_y resolves to the raw yVal (10).
        expect(joined).toContain('int value_y = 10;');
        expect(joined).toContain('int unit_y = value_y;');
        expect(joined).toMatch(/printf\(0\s*\+\s*wv\s*\+\s*2,\s*unit_y,/);
    });

    it('does not split value and unit when unit_font_size equals value_font_size', () => {
        mockAppState.entityStates = {
            'sensor.humidity': { state: '65', attributes: { unit_of_measurement: '%' } }
        };

        const lines = [];
        exportDirect({
            id: 'sensor_no_split',
            x: 5,
            y: 5,
            width: 100,
            height: 40,
            entity_id: 'sensor.humidity',
            props: {
                value_format: 'value_only',
                value_font_size: 20,
                // unit_font_size not set - no split expected
                precision: 0,
                text_align: 'TOP_LEFT'
            }
        }, {
            lines,
            addFont: (family, weight, size) => `f${size}`,
            getColorConst: (v) => `Color(${v})`,
            getConditionCheck: () => '',
            profile: {}
        });

        const joined = lines.join('\n');
        // No split: no measure() call, unit is inline in the format string
        expect(joined).not.toContain('measure(val_buf');
        expect(joined).toContain('%');
    });
    it('positions value+unit block correctly when text_align is CENTER (issue #445)', () => {
        mockAppState.entityStates = {
            'sensor.temp': { state: '21.5', attributes: { unit_of_measurement: '°C' } }
        };

        const lines = [];
        exportDirect({
            id: 'sensor_unit_split_center',
            x: 50,
            y: 10,
            width: 140,
            height: 60,
            entity_id: 'sensor.temp',
            props: {
                value_format: 'value_only',
                value_font_size: 36,
                unit_font_size: 14,
                unit_align: 'TOP',
                precision: 1,
                text_align: 'CENTER'
            }
        }, {
            lines,
            addFont: (family, weight, size) => `f${size}`,
            getColorConst: (v) => `Color(${v})`,
            getConditionCheck: () => '',
            profile: {}
        });

        const joined = lines.join('\n');
        // Must measure both value and unit widths
        expect(joined).toContain('measure(val_buf');
        expect(joined).toContain('measure("°C"');
        // Must compute a centred x_block
        expect(joined).toContain('x_block');
        // Both printf calls use the computed x_block variable, not a raw integer offset
        expect(joined).toContain('printf(x_block,');
        expect(joined).toContain('printf(x_block + wv + 2,');
        // CENTER is a vertical anchor too. TOP_LEFT split calls must shift to
        // the value's actual top edge instead of drawing from the centre down.
        expect(joined).toContain('int value_y = 40 - hv / 2;');
        expect(joined).toContain('int unit_y = value_y;');
        // No raw `xVal + wv + 2` expression — that would only be correct for LEFT align
        // xVal for CENTER with x=50, width=140 => 50 + 70 = 120
        expect(joined).not.toContain('printf(120 + wv + 2,');
    });

    it('positions value+unit block correctly when text_align is TOP_RIGHT (issue #445)', () => {
        mockAppState.entityStates = {
            'sensor.power': { state: '99', attributes: { unit_of_measurement: 'W' } }
        };

        const lines = [];
        exportDirect({
            id: 'sensor_unit_split_right',
            x: 0,
            y: 10,
            width: 200,
            height: 60,
            entity_id: 'sensor.power',
            props: {
                value_format: 'value_only',
                value_font_size: 40,
                unit_font_size: 14,
                unit_align: 'BOTTOM',
                precision: 0,
                text_align: 'TOP_RIGHT'
            }
        }, {
            lines,
            addFont: (family, weight, size) => `f${size}`,
            getColorConst: (v) => `Color(${v})`,
            getConditionCheck: () => '',
            profile: {}
        });

        const joined = lines.join('\n');
        // Must measure both value and unit widths
        expect(joined).toContain('measure(val_buf');
        expect(joined).toContain('measure("W"');
        // xVal for TOP_RIGHT: x=0 + width=200 => 200
        // Unit flush at xVal: printf(200 - wu, ...)
        expect(joined).toContain('printf(200 - wu,');
        // Value to the left of the unit: printf(200 - wu - 2 - wv, ...)
        expect(joined).toContain('printf(200 - wu - 2 - wv,');
        // No raw `xVal + wv + 2` — that would be wrong for RIGHT align
        expect(joined).not.toContain('printf(200 + wv + 2,');
    });

    it('keeps primary and secondary units with their respective values', () => {
        mockAppState.entityStates = {
            'sensor.temperature': { state: '21', attributes: { unit_of_measurement: '°C' } },
            'sensor.humidity': { state: '55', attributes: { unit_of_measurement: '%' } }
        };
        const lines = [];
        exportDirect({
            id: 'two_sensor_values',
            x: 0,
            y: 0,
            width: 200,
            height: 60,
            entity_id: 'sensor.temperature',
            entity_id_2: 'sensor.humidity',
            props: { value_format: 'value_only', precision: 0 }
        }, {
            lines,
            addFont: (_family, _weight, size) => `f${size}`,
            getColorConst: (value) => `Color(${value})`,
            getConditionCheck: () => '',
            profile: {}
        });

        expect(lines.join('\n')).toContain('%.0f °C ~ %.0f %%');
    });
});
