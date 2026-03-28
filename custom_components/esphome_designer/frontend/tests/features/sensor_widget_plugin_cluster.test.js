/**
 * @vitest-environment jsdom
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockAppState, mockWidgetFactory } = vi.hoisted(() => ({
    mockAppState: {
        entityStates: {},
        updateWidget: vi.fn(),
        settings: { darkMode: false }
    },
    mockWidgetFactory: {
        getEffectiveDarkMode: vi.fn(() => false)
    }
}));

vi.mock('@core/state', () => ({
    AppState: mockAppState
}));

vi.mock('@core/widget_factory', () => ({
    WidgetFactory: mockWidgetFactory
}));

import batteryIconPlugin from '../../features/battery_icon/plugin.js';
import humidityPlugin from '../../features/ondevice_humidity/plugin.js';
import temperaturePlugin from '../../features/ondevice_temperature/plugin.js';

describe('sensor widget plugin cluster', () => {
    beforeEach(() => {
        mockAppState.entityStates = {};
        mockAppState.updateWidget.mockReset();
        mockWidgetFactory.getEffectiveDarkMode.mockReset();
        mockWidgetFactory.getEffectiveDarkMode.mockReturnValue(false);
    });

    it('renders battery previews and exports numeric sensor hooks', () => {
        mockAppState.entityStates = {
            'sensor.battery': { state: '12' }
        };

        const host = document.createElement('div');
        batteryIconPlugin.render(host, {
            id: 'battery_1',
            entity_id: 'sensor.battery',
            width: 32,
            height: 40,
            props: {
                fit_icon_to_frame: true,
                color: 'theme_auto',
                font_size: 10,
                border_width: 1,
                border_color: 'blue',
                bg_color: 'white'
            }
        }, {
            getColorStyle: (value) => value === 'theme_auto' ? 'black' : value
        });

        expect(host.textContent).toContain('12%');
        expect(host.style.fontSize).toBe('24px');
        expect(host.style.backgroundColor).toBe('white');

        const exportContext = {
            lines: [],
            addFont: vi.fn((family, _weight, size) => `${family}_${size}`),
            getColorConst: vi.fn((value) => `COLOR_${value}`),
            addDitherMask: vi.fn(),
            getConditionCheck: vi.fn(() => null),
            seenSensorIds: new Set(['sensor_kitchen_battery']),
            profile: { pins: {} }
        };

        batteryIconPlugin.export({
            id: 'bat-1',
            entity_id: 'sensor.kitchen_battery',
            x: 5,
            y: 6,
            width: 40,
            height: 50,
            props: {
                is_local_sensor: false,
                color: 'red',
                size: 20,
                font_size: 12
            }
        }, exportContext);

        const exported = exportContext.lines.join('\n');
        expect(exported).toContain('if (id(sensor_kitchen_battery).has_state())');
        expect(exported).toContain('TextAlign::TOP_CENTER');

        const lvgl = batteryIconPlugin.exportLVGL({
            id: 'bat-1',
            entity_id: 'sensor.kitchen_battery',
            props: {
                is_local_sensor: false,
                color: 'red',
                size: 20,
                font_size: 12
            }
        }, {
            common: { id: 'battery_base' },
            convertColor: (value) => `Color(${value})`,
            getLVGLFont: (family, size, weight) => `${family}_${size}_${weight}`,
            _formatOpacity: () => 'opaque'
        });

        expect(lvgl.obj.widgets[0].label.text).toContain('sensor_kitchen_battery');
        expect(batteryIconPlugin.exportOpenDisplay({
            x: 0,
            y: 0,
            width: 40,
            height: 40,
            entity_id: 'sensor.kitchen_battery',
            props: {
                color: 'theme_auto',
                size: 18,
                font_size: 10
            }
        }, {
            layout: { darkMode: true },
            _page: {}
        })[0].fill).toBe('white');

        const sensorContext = {
            lines: [],
            widgets: [{
                id: 'bat-1',
                type: 'battery_icon',
                entity_id: 'sensor.kitchen_battery',
                props: {
                    is_local_sensor: false
                }
            }],
            isLvgl: true,
            pendingTriggers: new Map(),
            seenSensorIds: new Set(),
            profile: { pins: {} },
            mainLines: []
        };

        batteryIconPlugin.onExportNumericSensors(sensorContext);
        expect(sensorContext.lines.join('\n')).toContain('# External Battery Sensors');
        expect(Array.from(sensorContext.pendingTriggers.get('sensor.kitchen_battery') || [])).toEqual([
            '- lvgl.widget.refresh: bat_1_icon',
            '- lvgl.widget.refresh: bat_1_text'
        ]);
    });

    it('exports temperature and humidity widgets for fallback and real sensor paths', () => {
        const fallbackTemp = temperaturePlugin.exportLVGL({
            props: {
                show_label: true,
                unit: 'F',
                size: 28,
                font_size: 14,
                label_font_size: 9
            }
        }, {
            common: { id: 'temp_base' },
            convertColor: (value) => `Color(${value})`,
            getLVGLFont: (family, size, weight) => `${family}_${size}_${weight}`,
            profile: { features: {} }
        });

        expect(fallbackTemp.obj.widgets[1].label.text).toBe('--F');
        expect(fallbackTemp.obj.widgets[2].label.text).toBe('"Temperature"');

        const tempExportContext = {
            lines: [],
            getColorConst: vi.fn((value) => `COLOR_${value}`),
            getConditionCheck: vi.fn(() => null),
            addFont: vi.fn((family, _weight, size) => `${family}_${size}`),
            profile: {
                features: {
                    sht4x: true
                }
            }
        };

        temperaturePlugin.export({
            id: 'temp_sensor',
            entity_id: '',
            x: 0,
            y: 0,
            width: 80,
            height: 60,
            props: {
                is_local_sensor: true,
                size: 20,
                font_size: 12,
                label_font_size: 9,
                unit: 'F',
                show_label: true
            }
        }, tempExportContext);

        expect(tempExportContext.lines.join('\n')).toContain('id(sht4x_temperature).has_state()');
        expect(tempExportContext.lines.join('\n')).toContain('"Temperature"');

        const tempSensorContext = {
            lines: [],
            widgets: [{
                id: 'temp_sensor',
                type: 'ondevice_temperature',
                entity_id: 'outdoor_temp',
                props: {
                    is_local_sensor: false
                }
            }],
            isLvgl: true,
            pendingTriggers: new Map(),
            seenSensorIds: new Set(),
            profile: { features: {} },
            mainLines: []
        };

        temperaturePlugin.onExportNumericSensors(tempSensorContext);
        expect(tempSensorContext.lines.join('\n')).toContain('# External Temperature Sensors');
        expect(tempSensorContext.lines.join('\n')).toContain('entity_id: sensor.outdoor_temp');
        expect(Array.from(tempSensorContext.pendingTriggers.get('sensor.outdoor_temp') || [])).toEqual([
            '- lvgl.widget.refresh: temp_sensor'
        ]);

        const humidityLvgl = humidityPlugin.exportLVGL({
            id: 'hum_sensor',
            entity_id: 'sensor.living_humidity',
            props: {
                is_local_sensor: false,
                unit: '%',
                color: 'blue'
            }
        }, {
            common: { id: 'hum_base' },
            convertColor: (value) => `Color(${value})`,
            getLVGLFont: (family, size, weight) => `${family}_${size}_${weight}`,
            profile: { features: { sht4x: true } }
        });

        expect(humidityLvgl.obj.widgets[0].label.text).toContain('sensor_living_humidity');

        const humidityExportContext = {
            lines: [],
            getColorConst: vi.fn((value) => `COLOR_${value}`),
            getConditionCheck: vi.fn(() => null),
            addFont: vi.fn((family, _weight, size) => `${family}_${size}`),
            profile: {
                features: {}
            }
        };

        humidityPlugin.export({
            id: 'hum_sensor',
            x: 0,
            y: 0,
            width: 70,
            height: 50,
            props: {
                is_local_sensor: true,
                show_label: false,
                unit: '%'
            }
        }, humidityExportContext);

        expect(humidityExportContext.lines.join('\n')).toContain('--%');

        const humiditySensorContext = {
            lines: [],
            widgets: [{
                id: 'hum_sensor',
                type: 'ondevice_humidity',
                props: {
                    is_local_sensor: true
                }
            }],
            isLvgl: false,
            pendingTriggers: new Map(),
            seenSensorIds: new Set(),
            profile: { features: { shtc3: true } },
            mainLines: []
        };

        humidityPlugin.onExportNumericSensors(humiditySensorContext);
        expect(humiditySensorContext.lines.join('\n')).toContain('- platform: shtcx');
        expect(humiditySensorContext.lines.join('\n')).toContain('id: shtc3_humidity');
    });
});
