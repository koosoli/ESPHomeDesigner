/**
 * @vitest-environment jsdom
 */
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { mockAppState } = vi.hoisted(() => ({
    mockAppState: {
        entityStates: {}
    }
}));

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

import { renderOnDeviceTemperature } from '../../features/ondevice_temperature/render.js';
import { renderOnDeviceHumidity } from '../../features/ondevice_humidity/render.js';
import temperaturePlugin from '../../features/ondevice_temperature/plugin.js';
import humidityPlugin from '../../features/ondevice_humidity/plugin.js';

describe('ondevice sensor plugins', () => {
    const fahrenheitUnit = temperaturePlugin.schema
        .flatMap((section) => section.fields || [])
        .find((field) => field.key === 'unit')
        ?.options?.[1] || '°F';

    beforeEach(() => {
        mockAppState.entityStates = {};
        document.body.innerHTML = '';
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('renders external temperature and humidity previews across hot and humid thresholds', () => {
        mockAppState.entityStates = {
            'sensor.temp_hot': { state: '31' },
            'sensor.humid_room': { state: '72' }
        };

        const tempEl = document.createElement('div');
        renderOnDeviceTemperature(tempEl, {
            height: 70,
            entity_id: 'sensor.temp_hot',
            props: {
                is_local_sensor: false,
                fit_icon_to_frame: true,
                show_label: false,
                unit: fahrenheitUnit,
                precision: 1
            }
        }, {
            getColorStyle: (value) => value
        });

        const humidityEl = document.createElement('div');
        renderOnDeviceHumidity(humidityEl, {
            height: 70,
            entity_id: 'sensor.humid_room',
            props: {
                is_local_sensor: false,
                fit_icon_to_frame: true,
                show_label: false,
                precision: 0
            }
        }, {
            getColorStyle: (value) => value
        });

        expect(tempEl.textContent).toMatch(/87\.8.*F/);
        expect(tempEl.children).toHaveLength(2);
        expect(humidityEl.textContent).toContain('72%');
        expect(humidityEl.children).toHaveLength(2);
    });

    it('exports OpenDisplay, OEPL, and LVGL payloads for supported ondevice sensors', () => {
        const tempOpenDisplay = temperaturePlugin.exportOpenDisplay({
            x: 4,
            y: 6,
            width: 40,
            height: 40,
            entity_id: 'sensor.temp_hot',
            props: {
                color: 'theme_auto',
                size: 18,
                font_size: 10,
                unit: fahrenheitUnit
            }
        }, {
            layout: { darkMode: true },
            _page: {}
        });
        expect(tempOpenDisplay[0]).toMatchObject({
            type: 'icon',
            fill: 'white'
        });
        expect(tempOpenDisplay[1].value).toContain("states('sensor.temp_hot')");

        const humidityOepl = humidityPlugin.exportOEPL({
            x: 4,
            y: 6,
            width: 40,
            height: 40,
            entity_id: 'sensor.humid_room',
            props: {
                color: 'blue',
                size: 18,
                font_size: 10,
                unit: '%'
            }
        }, {
            _layout: {},
            _page: {}
        });
        expect(humidityOepl[0].value).toContain("states('sensor.humid_room')");
        expect(humidityOepl[1]).toMatchObject({
            type: 'text',
            color: 'blue',
            align: 'center'
        });

        const tempLvgl = temperaturePlugin.exportLVGL({
            id: 'temp_widget',
            entity_id: 'sensor.temp_hot',
            props: {
                is_local_sensor: false,
                unit: fahrenheitUnit,
                show_label: false
            }
        }, {
            common: { id: 'temp_base' },
            convertColor: (value) => `Color(${value})`,
            getLVGLFont: (family, size, weight) => `${family}_${size}_${weight}`,
            profile: { features: { sht4x: true } }
        });

        expect(JSON.stringify(tempLvgl)).toContain('(id(sensor_temp_hot).state * 9.0 / 5.0) + 32.0');
        expect(tempLvgl.obj.widgets).toHaveLength(2);

        const humidityLvgl = humidityPlugin.exportLVGL({
            id: 'hum_widget',
            entity_id: '',
            props: {
                is_local_sensor: false,
                show_label: true
            }
        }, {
            common: { id: 'hum_base' },
            convertColor: (value) => `Color(${value})`,
            getLVGLFont: (family, size, weight) => `${family}_${size}_${weight}`,
            profile: { features: {} }
        });
        expect(humidityLvgl.obj.widgets[1].label.text).toContain('--%');
        expect(humidityLvgl.obj.widgets[2].label.text).toBe('"Humidity"');
    });

    it('collects fonts/icons and exports direct sensor code for fallback and external paths', () => {
        const addFont = vi.fn((family, _weight, size) => `${family}_${size}`);
        const trackIcon = vi.fn();

        temperaturePlugin.collectRequirements({
            props: {
                size: 24,
                font_size: 14,
                label_font_size: 9,
                show_label: true
            }
        }, { addFont, trackIcon });
        humidityPlugin.collectRequirements({
            props: {
                size: 26,
                font_size: 13,
                label_font_size: 8,
                show_label: false
            }
        }, { addFont, trackIcon });

        expect(addFont).toHaveBeenCalledWith('Material Design Icons', 400, 24);
        expect(addFont).toHaveBeenCalledWith('Roboto', 400, 14);
        expect(trackIcon).toHaveBeenCalledTimes(6);

        const tempLines = [];
        temperaturePlugin.export({
            id: 'temp_direct',
            x: 0,
            y: 0,
            width: 80,
            height: 60,
            entity_id: '',
            props: {
                is_local_sensor: true,
                size: 20,
                font_size: 12,
                label_font_size: 8,
                unit: fahrenheitUnit,
                show_label: true
            }
        }, {
            lines: tempLines,
            getColorConst: (value) => `Color(${value})`,
            getConditionCheck: () => null,
            addFont: vi.fn((family, _weight, size) => `${family}_${size}`),
            profile: { features: { sht3x: true } }
        });
        expect(tempLines.join('\n')).toContain('(id(sht3x_temperature).state * 9.0 / 5.0) + 32.0');
        expect(tempLines.join('\n')).toContain('"Temperature"');

        const humidityLines = [];
        humidityPlugin.export({
            id: 'humidity_direct',
            x: 0,
            y: 0,
            width: 70,
            height: 50,
            entity_id: '',
            props: {
                is_local_sensor: true,
                show_label: false,
                unit: '%'
            }
        }, {
            lines: humidityLines,
            getColorConst: (value) => `Color(${value})`,
            getConditionCheck: () => null,
            addFont: vi.fn((family, _weight, size) => `${family}_${size}`),
            profile: { features: {} }
        });
        expect(humidityLines.join('\n')).toContain('"--%"');
        expect(humidityLines.join('\n')).toContain('\\U000F058E');
    });

    it('exports external and local numeric sensor blocks with platform-specific addresses', () => {
        const tempContext = {
            lines: [],
            widgets: [
                {
                    id: 'temp_ext',
                    type: 'ondevice_temperature',
                    entity_id: 'garage_temp',
                    props: {
                        is_local_sensor: false
                    }
                },
                {
                    id: 'temp_local',
                    type: 'ondevice_temperature',
                    props: {
                        is_local_sensor: true
                    }
                }
            ],
            isLvgl: true,
            pendingTriggers: new Map(),
            seenSensorIds: new Set(),
            profile: { features: { sht3x: true } },
            mainLines: []
        };
        temperaturePlugin.onExportNumericSensors(tempContext);
        const tempOutput = tempContext.lines.join('\n');
        expect(tempOutput).toContain('# External Temperature Sensors');
        expect(tempOutput).toContain('entity_id: sensor.garage_temp');
        expect(tempOutput).toContain('- platform: sht3xd');
        expect(tempOutput).toContain('id: sht3x_temperature');
        expect(tempOutput).toContain('address: 0x44');
        expect(Array.from(tempContext.pendingTriggers.get('sensor.garage_temp') || [])).toEqual([
            '- lvgl.widget.refresh: temp_ext'
        ]);

        const humidityContext = {
            lines: [],
            widgets: [
                {
                    id: 'hum_ext',
                    type: 'ondevice_humidity',
                    entity_id: 'basement_humidity',
                    props: {
                        is_local_sensor: false
                    }
                },
                {
                    id: 'hum_local',
                    type: 'ondevice_humidity',
                    props: {
                        is_local_sensor: true
                    }
                }
            ],
            isLvgl: true,
            pendingTriggers: new Map(),
            seenSensorIds: new Set(),
            profile: { features: { sht3x: true } },
            mainLines: []
        };
        humidityPlugin.onExportNumericSensors(humidityContext);
        const humidityOutput = humidityContext.lines.join('\n');
        expect(humidityOutput).toContain('# External Humidity Sensors');
        expect(humidityOutput).toContain('entity_id: sensor.basement_humidity');
        expect(humidityOutput).toContain('- platform: sht3xd');
        expect(humidityOutput).toContain('id: sht3x_humidity');
        expect(humidityOutput).toContain('address: 0x44');
        expect(Array.from(humidityContext.pendingTriggers.get('sensor.basement_humidity') || [])).toEqual([
            '- lvgl.widget.refresh: hum_ext'
        ]);
    });
});
