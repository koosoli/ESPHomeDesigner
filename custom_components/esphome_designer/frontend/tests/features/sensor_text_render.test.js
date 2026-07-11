import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { mockAppState, mockEmit } = vi.hoisted(() => ({
    mockAppState: {
        entityStates: {},
        deviceModel: 'reterminal_e1002',
        settings: {
            darkMode: false
        }
    },
    mockEmit: vi.fn()
}));

vi.mock('@core/state', () => ({
    AppState: mockAppState
}));

vi.mock('../../js/core/events.js', () => ({
    emit: mockEmit
}));

import { render } from '../../features/sensor_text/render.js';

describe('sensor_text render', () => {
    let originalScrollWidth;

    beforeEach(() => {
        mockAppState.entityStates = {
            'sensor.temperature': {
                state: '50 °C',
                attributes: {
                    friendly_name: 'Outdoor Temp'
                }
            }
        };
        mockEmit.mockReset();
        originalScrollWidth = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'scrollWidth');
        vi.stubGlobal('requestAnimationFrame', (callback) => callback());
    });

    afterEach(() => {
        if (originalScrollWidth) {
            Object.defineProperty(HTMLElement.prototype, 'scrollWidth', originalScrollWidth);
        } else {
            delete HTMLElement.prototype.scrollWidth;
        }
        vi.unstubAllGlobals();
    });

    it('renders friendly-name label/value layouts and applies dynamic color interpolation', () => {
        const el = document.createElement('div');

        render(el, {
            id: 'sensor_1',
            width: 180,
            height: 60,
            entity_id: 'sensor.temperature',
            title: '',
            props: {
                format: 'label_newline_value',
                label_font_size: 12,
                value_font_size: 18,
                precision: 1,
                dynamic_color_enabled: true,
                dynamic_color_low: '#0000FF',
                dynamic_color_high: '#FF0000',
                dynamic_value_low: 0,
                dynamic_value_high: 100,
                background_color: 'white',
                border_width: 1,
                border_color: 'black'
            }
        }, {
            getColorStyle: (value) => value === 'theme_auto' ? '#000000' : value
        });

        const body = /** @type {HTMLElement} */ (el.firstElementChild);
        expect(el.textContent).toContain('Outdoor Temp');
        expect(el.textContent).toContain('50.0 °C');
        expect(body.style.color).toBe('rgb(128, 0, 128)');
        expect(body.style.border).toContain('1px solid');
    });

    it('resizes label-value layouts when content exceeds the configured width', () => {
        Object.defineProperty(HTMLElement.prototype, 'scrollWidth', {
            configurable: true,
            get() {
                return 160;
            }
        });

        const widget = {
            id: 'sensor_resize',
            width: 60,
            height: 40,
            entity_id: 'sensor.temperature',
            title: 'Temp',
            props: {
                format: 'label_value',
                label_font_size: 12,
                value_font_size: 18,
                precision: 0
            }
        };
        const el = document.createElement('div');

        render(el, widget, {
            getColorStyle: (value) => value === 'theme_auto' ? '#000000' : value
        });

        expect(widget.width).toBeGreaterThan(60);
        expect(mockEmit).toHaveBeenCalledWith('widget:resized', expect.objectContaining({
            id: 'sensor_resize',
            width: widget.width
        }));
    });

    it('renders attribute-driven dual values with parsed color markup and prefixes', () => {
        mockAppState.entityStates = {
            'sensor.primary': {
                state: '23.4 C',
                attributes: {
                    friendly_name: 'Room Temp',
                    nested: {
                        value: 21.5
                    },
                    unit_of_measurement: 'C'
                }
            },
            'sensor.secondary': {
                state: '40 %',
                attributes: {}
            }
        };

        const el = document.createElement('div');
        render(el, {
            id: 'sensor_markup',
            width: 220,
            height: 60,
            entity_id: 'sensor.primary',
            entity_id_2: 'sensor.secondary',
            title: '[red]Inside[/red]',
            props: {
                format: 'label_value',
                attribute: 'nested.value',
                precision: 1,
                separator: ' / ',
                prefix: '(',
                postfix: ')',
                parse_colors: true
            }
        }, {
            getColorStyle: (value) => value === 'theme_auto' ? '#111111' : value
        });

        expect(el.textContent).toContain('Inside');
        expect(el.textContent).toContain('(21.5 / 40.0 C)');
        const spans = Array.from(el.querySelectorAll('span'));
        expect(spans.length).toBeGreaterThan(3);
        expect(spans.some((span) => /** @type {HTMLSpanElement} */ (span).style.color === 'red')).toBe(true);
    });

    it('renders label-only and value-label layouts with fallback titles and dark-mode borders', () => {
        mockAppState.entityStates = {
            'sensor.line_pressure': {
                state: '15.75 hPa',
                attributes: {}
            }
        };
        mockAppState.settings.darkMode = true;

        const labelOnly = document.createElement('div');
        render(labelOnly, {
            id: 'sensor_label_only',
            width: 120,
            height: 40,
            entity_id: 'sensor.line_pressure',
            title: '',
            props: {
                value_format: 'label_only',
                text_align: 'BOTTOM_RIGHT',
                border_width: 1,
                border_color: 'theme_auto',
                bg_color: 'white'
            }
        }, {
            getColorStyle: (value) => value === 'theme_auto' ? '#000000' : value
        });

        const labelBody = /** @type {HTMLElement} */ (labelOnly.firstElementChild);
        expect(labelBody.textContent).toBe('line pressure');
        expect(labelBody.style.textAlign).toBe('right');
        expect(labelBody.style.border).toContain('1px solid');
        expect(labelBody.style.border).toMatch(/white|rgb\(255,\s*255,\s*255\)/);

        const valueLabel = document.createElement('div');
        render(valueLabel, {
            id: 'sensor_value_label',
            width: 140,
            height: 50,
            entity_id: 'sensor.line_pressure',
            title: '',
            props: {
                value_format: 'value_label',
                value_align: 'CENTER_RIGHT',
                label_font_size: 12,
                value_font_size: 18
            }
        }, {
            getColorStyle: (value) => value === 'theme_auto' ? '#111111' : value
        });

        expect(valueLabel.textContent).toContain('15.75 hPa');
        expect(valueLabel.textContent).toContain('line pressure');
    });

    it('renders object attributes and strips units when hide-unit formats are used', () => {
        mockAppState.entityStates = {
            'sensor.payload': {
                state: '12.340 kWh',
                formatted: '12.340 kWh',
                attributes: {
                    payload: {
                        mode: 'eco',
                        active: true
                    }
                }
            }
        };

        const objectEl = document.createElement('div');
        render(objectEl, {
            id: 'sensor_json',
            width: 180,
            height: 40,
            entity_id: 'sensor.payload',
            props: {
                value_format: 'value_only',
                attribute: 'payload'
            }
        }, {
            getColorStyle: (value) => value === 'theme_auto' ? '#111111' : value
        });

        expect(objectEl.textContent).toContain('"mode":"eco"');
        expect(objectEl.textContent).toContain('"active":true');

        const numericEl = document.createElement('div');
        render(numericEl, {
            id: 'sensor_hide_unit',
            width: 90,
            height: 40,
            entity_id: 'sensor.payload',
            props: {
                value_format: 'value_only_no_unit',
                precision: 1,
                value_align: 'CENTER_RIGHT'
            }
        }, {
            getColorStyle: (value) => value === 'theme_auto' ? '#111111' : value
        });

        const numericBody = /** @type {HTMLElement} */ (numericEl.firstElementChild);
        expect(numericBody.textContent).toBe('12.3');
        expect(numericBody.style.textAlign).toBe('right');
    });

    it('renders value and unit as separate spans when unit_font_size differs from value_font_size', () => {
        mockAppState.entityStates = {
            'sensor.power': {
                state: '42.5',
                attributes: { unit_of_measurement: 'W' }
            }
        };

        const el = document.createElement('div');
        render(el, {
            id: 'sensor_unit_size',
            width: 180,
            height: 60,
            entity_id: 'sensor.power',
            props: {
                value_format: 'value_only',
                value_font_size: 40,
                unit_font_size: 14,
                unit_align: 'BOTTOM',
                precision: 1
            }
        }, {
            getColorStyle: (value) => value === 'theme_auto' ? '#000000' : value
        });

        const body = /** @type {HTMLElement} */ (el.firstElementChild);
        // Should be inline-flex with two separate child spans
        expect(body.style.display).toBe('inline-flex');
        const spans = body.querySelectorAll('span');
        expect(spans.length).toBeGreaterThanOrEqual(2);
        // First span is the value, second is the unit
        const valueSpan = /** @type {HTMLElement} */ (spans[0]);
        const unitSpan = /** @type {HTMLElement} */ (spans[1]);
        expect(valueSpan.style.fontSize).toBe('40px');
        expect(unitSpan.style.fontSize).toBe('14px');
        expect(unitSpan.textContent).toBe('W');
    });

    it('applies TOP unit alignment (flex-start self) when unit_align is TOP', () => {
        mockAppState.entityStates = {
            'sensor.power': { state: '100', attributes: { unit_of_measurement: 'W' } }
        };

        const el = document.createElement('div');
        render(el, {
            id: 'sensor_unit_top',
            width: 150,
            height: 60,
            entity_id: 'sensor.power',
            props: {
                value_format: 'value_only',
                value_font_size: 36,
                unit_font_size: 12,
                unit_align: 'TOP',
                precision: 0
            }
        }, {
            getColorStyle: () => '#000000'
        });

        const body = el.firstElementChild;
        const spans = body.querySelectorAll('span');
        const unitSpan = /** @type {HTMLElement} */ (spans[spans.length - 1]);
        expect(unitSpan.style.alignSelf).toBe('flex-start');
    });

    it('applies CENTER unit alignment when unit_align is CENTER', () => {
        mockAppState.entityStates = {
            'sensor.power': { state: '100', attributes: { unit_of_measurement: 'kW' } }
        };

        const el = document.createElement('div');
        render(el, {
            id: 'sensor_unit_center',
            width: 150,
            height: 60,
            entity_id: 'sensor.power',
            props: {
                value_format: 'value_only',
                value_font_size: 36,
                unit_font_size: 12,
                unit_align: 'CENTER',
                precision: 0
            }
        }, {
            getColorStyle: () => '#000000'
        });

        const body = el.firstElementChild;
        const spans = body.querySelectorAll('span');
        const unitSpan = /** @type {HTMLElement} */ (spans[spans.length - 1]);
        expect(unitSpan.style.alignSelf).toBe('center');
    });

    it('falls back to standard rendering when unit_font_size matches value_font_size and no explicit prop', () => {
        mockAppState.entityStates = {
            'sensor.humidity': { state: '65', attributes: { unit_of_measurement: '%' } }
        };

        const el = document.createElement('div');
        render(el, {
            id: 'sensor_no_split',
            width: 120,
            height: 40,
            entity_id: 'sensor.humidity',
            props: {
                value_format: 'value_only',
                value_font_size: 20,
                // unit_font_size not set -> should not split
                precision: 0
            }
        }, {
            getColorStyle: () => '#000000'
        });

        const body = /** @type {HTMLElement} */ (el.firstElementChild);
        // Without split, display should NOT be inline-flex
        expect(body.style.display).not.toBe('inline-flex');
        expect(body.textContent).toContain('%');
    });

    it('renders unit as a separate span in label_value format when unit_font_size differs (issue: unit size not updating in preview)', () => {
        mockAppState.entityStates = {
            'sensor.power': { state: '88', attributes: { unit_of_measurement: 'W' } }
        };

        const el = document.createElement('div');
        render(el, {
            id: 'sensor_label_value_split',
            width: 200,
            height: 60,
            entity_id: 'sensor.power',
            title: 'Power',
            props: {
                value_format: 'label_value',
                value_font_size: 36,
                unit_font_size: 14,
                unit_align: 'TOP',
                precision: 0
            }
        }, {
            getColorStyle: () => '#000000'
        });

        expect(el.textContent).toContain('Power');
        expect(el.textContent).toContain('88');
        // Unit 'W' must be in its own span at unitFontSize, not concatenated into the value span
        const spans = Array.from(el.querySelectorAll('span'));
        const unitSpan = spans.find((s) => s.textContent === 'W');
        expect(unitSpan).toBeTruthy();
        expect(/** @type {HTMLElement} */ (unitSpan).style.fontSize).toBe('14px');
        const valueSpan = spans.find((s) => s.textContent === '88');
        expect(valueSpan).toBeTruthy();
    });

    it('renders unit as a separate span in label_newline_value format when unit_font_size differs', () => {
        mockAppState.entityStates = {
            'sensor.temp': { state: '21', attributes: { unit_of_measurement: '°C' } }
        };

        const el = document.createElement('div');
        render(el, {
            id: 'sensor_label_newline_split',
            width: 180,
            height: 70,
            entity_id: 'sensor.temp',
            title: 'Temp',
            props: {
                value_format: 'label_newline_value',
                value_font_size: 40,
                unit_font_size: 16,
                unit_align: 'BOTTOM',
                precision: 0
            }
        }, {
            getColorStyle: () => '#000000'
        });

        expect(el.textContent).toContain('Temp');
        expect(el.textContent).toContain('21');
        const spans = Array.from(el.querySelectorAll('span'));
        const unitSpan = spans.find((s) => s.textContent === '°C');
        expect(unitSpan).toBeTruthy();
        expect(/** @type {HTMLElement} */ (unitSpan).style.fontSize).toBe('16px');
    });

    it('renders unit as a separate span in value_label format when unit_font_size differs', () => {
        mockAppState.entityStates = {
            'sensor.humidity': { state: '65', attributes: { unit_of_measurement: '%' } }
        };

        const el = document.createElement('div');
        render(el, {
            id: 'sensor_value_label_split',
            width: 180,
            height: 60,
            entity_id: 'sensor.humidity',
            title: 'Humidity',
            props: {
                value_format: 'value_label',
                value_font_size: 36,
                unit_font_size: 14,
                unit_align: 'CENTER',
                precision: 0
            }
        }, {
            getColorStyle: () => '#000000'
        });

        expect(el.textContent).toContain('Humidity');
        expect(el.textContent).toContain('65');
        const spans = Array.from(el.querySelectorAll('span'));
        const unitSpan = spans.find((s) => s.textContent === '%');
        expect(unitSpan).toBeTruthy();
        expect(/** @type {HTMLElement} */ (unitSpan).style.fontSize).toBe('14px');
        const valueSpan = spans.find((s) => s.textContent === '65');
        expect(valueSpan).toBeTruthy();
    });
});
