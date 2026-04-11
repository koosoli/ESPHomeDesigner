import { describe, expect, it, vi } from 'vitest';

import {
    collectRequirements,
    onExportNumericSensors,
    onExportTextSensors
} from '../../features/weather_forecast/export_sensors.js';

describe('weather_forecast export_sensors', () => {
    it('exports daily numeric sensors once and wires LVGL refresh triggers', () => {
        const lines = [];
        const seenSensorIds = new Set();
        const pendingTriggers = new Map();
        const widgets = [
            {
                id: 'weather-card',
                type: 'weather_forecast',
                props: {
                    days: 2,
                    start_offset: 1,
                    temp_unit: 'F'
                }
            }
        ];

        onExportNumericSensors({ lines, widgets, seenSensorIds, isLvgl: true, pendingTriggers });
        const firstPass = lines.join('\n');

        expect(firstPass).toContain('# Weather Forecast Numeric Sensors');
        expect(firstPass).toContain('id: weather_high_day1');
        expect(firstPass).toContain('id: weather_low_day2');
        expect(firstPass).toContain("unit_of_measurement: '°F'");
        expect([...pendingTriggers.get('sensor.weather_forecast_day_1_high')]).toContain('- lvgl.widget.refresh: weather_card_day0');
        expect([...pendingTriggers.get('sensor.weather_forecast_day_2_low')]).toContain('- lvgl.widget.refresh: weather_card_temp1');

        onExportNumericSensors({ lines, widgets, seenSensorIds, isLvgl: true, pendingTriggers });
        expect(lines.join('\n')).toBe(firstPass);
    });

    it('exports fixed hourly condition sensors and helper yaml without skipped slots', () => {
        const lines = [];
        const seenSensorIds = new Set(['weather_cond_h0900']);

        onExportTextSensors({
            lines,
            seenSensorIds,
            widgets: [
                {
                    type: 'weather_forecast',
                    entity_id: 'weather.garden',
                    props: {
                        forecast_mode: 'hourly',
                        hourly_mode: 'fixed',
                        hourly_slots: '06,09,12',
                        start_offset: 1,
                        temp_unit: 'C'
                    }
                }
            ]
        });

        const output = lines.join('\n');
        expect(output).not.toContain('id: weather_cond_h0900');
        expect(output).toContain('id: weather_cond_h1200');
        expect(output).toContain('# HOME ASSISTANT TEMPLATE SENSORS (HOURLY)');
        expect(output).toContain('entity_id: weather.garden');
        expect(output).toContain("name: 'Weather Forecast Hour 0900 High'");
        expect(output).toContain("name: 'Weather Forecast Hour 1200 High'");
        expect(output).toContain("{{ hit.condition if hit else 'unknown' }}");
    });

    it('exports relative hourly template sensors and tracks required fonts/icons', () => {
        const lines = [];
        onExportTextSensors({
            lines,
            seenSensorIds: new Set(),
            widgets: [
                {
                    type: 'weather_forecast',
                    props: {
                        forecast_mode: 'hourly',
                        hourly_mode: 'relative',
                        relative_count: 2,
                        weather_entity: 'weather.patio',
                        temp_unit: 'F'
                    }
                }
            ]
        });

        const output = lines.join('\n');
        expect(output).toContain("name: 'Weather Forecast Plus 2h'");
        expect(output).toContain("timedelta(hours=2)");
        expect(output).toContain("weather_forecast_plus_2h_condition");
        expect(output).toContain("{{ hit.condition if hit else 'unknown' }}");

        const addFont = vi.fn();
        const trackIcon = vi.fn();
        collectRequirements({
            props: {
                icon_size: '48',
                day_font_size: '13',
                temp_font_size: '16',
                font_family: 'Montserrat'
            }
        }, { addFont, trackIcon });

        expect(addFont).toHaveBeenCalledWith('Montserrat', 700, 13);
        expect(addFont).toHaveBeenCalledWith('Montserrat', 400, 16);
        expect(addFont).toHaveBeenCalledWith('Material Design Icons', 400, 48);
        expect(trackIcon).toHaveBeenCalledTimes(16);
    });

    it('deduplicates repeated daily condition sensors across matching widgets', () => {
        const lines = [];
        const seenSensorIds = new Set();

        onExportTextSensors({
            lines,
            seenSensorIds,
            widgets: [
                {
                    id: 'weather-primary',
                    type: 'weather_forecast',
                    props: {
                        days: 2,
                        start_offset: 0
                    }
                },
                {
                    id: 'weather-secondary',
                    type: 'weather_forecast',
                    props: {
                        days: 2,
                        start_offset: 0
                    }
                }
            ]
        });

        expect(lines.filter((line) => line === '  id: weather_cond_day0')).toHaveLength(1);
        expect(lines.filter((line) => line === '  id: weather_cond_day1')).toHaveLength(1);
        expect(lines.filter((line) => line === '# Weather Forecast Condition Sensors')).toHaveLength(1);
    });
});
