import { describe, expect, it } from 'vitest';

import { generateSensorSection } from '../../js/io/hardware_generators_sensors.js';

describe('hardware_generators_sensors', () => {
    it('emits battery, environmental, and widget-driven sensor blocks together', () => {
        const lines = generateSensorSection({
            pins: {
                batteryAdc: 'GPIO1'
            },
            battery: {
                attenuation: '12db',
                multiplier: 2,
                curve: [
                    { from: 3.3, to: 0 },
                    { from: 4.2, to: 100 }
                ]
            },
            features: {
                sht4x: true,
                sht3xd: true,
                shtc3: true
            }
        }, [
            '  - platform: homeassistant',
            '    id: injected_sensor'
        ]).join('\n');

        expect(lines).toContain('sensor:');
        expect(lines).toContain('platform: adc');
        expect(lines).toContain('attenuation: 12db');
        expect(lines).toContain('multiply: 2');
        expect(lines).toContain('platform: sht4x');
        expect(lines).toContain('platform: sht3xd');
        expect(lines).toContain('platform: shtcx');
        expect(lines).toContain('calibrate_linear:');
        expect(lines).toContain('3.3 -> 0');
        expect(lines).toContain('4.2 -> 100');
        expect(lines).toContain('id: injected_sensor');
    });

    it('uses calibration bounds when no battery curve is provided and auto-detects M5Paper sht3xd support', () => {
        const lines = generateSensorSection({
            name: 'M5Paper Controller',
            pins: {
                batteryAdc: 'GPIO2'
            },
            battery: {
                attenuation: '11db',
                multiplier: 1,
                calibration: {
                    min: 3.1,
                    max: 4.18
                }
            },
            features: {}
        }).join('\n');

        expect(lines).toContain('platform: sht3xd');
        expect(lines).toContain('if (id(battery_voltage).state > 4.18) return 100;');
        expect(lines).toContain('if (id(battery_voltage).state < 3.1) return 0;');
    });

    it('returns no sensor block when the profile has no built-in or widget sensors', () => {
        expect(generateSensorSection({
            features: {},
            pins: {}
        })).toEqual([]);
    });

    it('sets update_interval: never for battery sensors when deep sleep is active and emits on_value sync', () => {
        const profile = {
            pins: { batteryAdc: 'GPIO1' },
            battery: {
                attenuation: '12db',
                multiplier: 2.0,
                curve: [{ from: 3.3, to: 0 }, { from: 4.2, to: 100 }]
            },
            features: { epaper: true }
        };

        const deepSleepLines = generateSensorSection(profile, [], 'my_display', [], {
            layout: { deepSleepEnabled: true }
        }).join('\n');

        expect(deepSleepLines).toContain('id: battery_voltage\n    update_interval: never');
        expect(deepSleepLines).toContain('id: battery_level');
        expect(deepSleepLines).toContain('update_interval: never');
        expect(deepSleepLines).toContain('on_value:\n      then:\n        - component.update: battery_level');

        const normalLines = generateSensorSection(profile, [], 'my_display', [], {
            layout: { deepSleepEnabled: false }
        }).join('\n');

        expect(normalLines).toContain('id: battery_voltage\n    update_interval: 60s');
        expect(normalLines).toContain('id: battery_level');
        expect(normalLines).toContain('update_interval: 60s');
    });

    it('respects profile-level battery.update_interval override', () => {
        const profile = {
            pins: { batteryAdc: 'GPIO1' },
            battery: {
                attenuation: '12db',
                multiplier: 2.0,
                update_interval: '120s',
                calibration: { min: 3.3, max: 4.2 }
            },
            features: { epaper: true }
        };

        const lines = generateSensorSection(profile, [], 'my_display', [], {
            layout: { deepSleepEnabled: true }
        }).join('\n');

        expect(lines).toContain('update_interval: 120s');
    });
});

