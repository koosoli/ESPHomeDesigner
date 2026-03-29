import { beforeEach, describe, expect, it, vi } from 'vitest';

const {
    mockAppState,
    mockGetSensorPlatformLines
} = vi.hoisted(() => ({
    mockAppState: {
        entityStates: {}
    },
    mockGetSensorPlatformLines: vi.fn()
}));

vi.mock('@core/state', () => ({
    AppState: mockAppState
}));

vi.mock('../../js/io/adapters/mqtt_helpers.js', () => ({
    getSensorPlatformLines: mockGetSensorPlatformLines
}));

import {
    onExportNumericSensors,
    onExportTextSensors
} from '../../features/sensor_text/exports_sensors.js';

describe('sensor_text exports_sensors', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockGetSensorPlatformLines.mockImplementation((_widget, entityId, safeId, attribute) => [
            `entity:${entityId}`,
            `id:${safeId}`,
            `attr:${attribute || ''}`
        ]);
    });

    it('exports weather and text sensors with nested-attribute dedupe and MQTT overrides', () => {
        mockAppState.entityStates = {
            'sensor.status': { state: 'online' },
            'sensor.secondary_text': { state: 'Home' }
        };

        const lines = [];
        const seenSensorIds = new Set();
        const seenTextEntityIds = new Set();

        onExportTextSensors({
            lines,
            seenSensorIds,
            seenTextEntityIds,
            widgets: [
                {
                    type: 'sensor_text',
                    entity_id: 'weather.home',
                    props: {
                        attribute: 'forecast.daily[0]'
                    }
                },
                {
                    type: 'sensor_text',
                    entity_id: 'sensor.status',
                    props: {}
                },
                {
                    type: 'sensor_text',
                    entity_id: 'sensor.remote',
                    props: {
                        mqtt_topic: 'house/status'
                    }
                },
                {
                    type: 'sensor_text',
                    entity_id: 'sensor.status',
                    entity_id_2: 'sensor.secondary_text',
                    props: {
                        attribute2: 'friendly_name'
                    }
                }
            ]
        });

        expect(lines).toContain('# Weather Entity Sensors (Detected from Sensor Text)');
        expect(lines).toContain('# Text Sensors (Detected from Sensor Text)');
        expect(mockGetSensorPlatformLines).toHaveBeenCalledTimes(4);
        expect(mockGetSensorPlatformLines).toHaveBeenCalledWith(
            { props: { mqtt_topic: '' } },
            'weather.home',
            'weather_home_forecast_txt',
            'forecast'
        );
        expect(mockGetSensorPlatformLines).toHaveBeenCalledWith(
            { props: { mqtt_topic: '' } },
            'sensor.status',
            'sensor_status_txt',
            ''
        );
        expect(mockGetSensorPlatformLines).toHaveBeenCalledWith(
            { props: { mqtt_topic: 'house/status' } },
            'sensor.remote',
            'sensor_remote_txt',
            ''
        );
        expect(mockGetSensorPlatformLines).toHaveBeenCalledWith(
            { props: { mqtt_topic: undefined } },
            'sensor.secondary_text',
            'sensor_secondary_text_friendly_name_txt',
            'friendly_name'
        );
        expect(seenTextEntityIds.has('weather.home__attr__forecast')).toBe(true);
        expect(seenTextEntityIds.has('sensor.status')).toBe(true);
        expect(seenTextEntityIds.has('sensor.remote')).toBe(true);
        expect(seenTextEntityIds.has('sensor.secondary_text__attr__friendly_name')).toBe(true);
    });

    it('queues LVGL refresh triggers only for numeric sensor_text entities', () => {
        mockAppState.entityStates = {
            'sensor.power': { state: '123.4' },
            'sensor.label': { state: 'online' }
        };

        const pendingTriggers = new Map();

        onExportNumericSensors({
            isLvgl: true,
            pendingTriggers,
            widgets: [
                {
                    id: 'sensor_text_1',
                    type: 'sensor_text',
                    entity_id: 'sensor.power',
                    entity_id_2: 'temperature',
                    props: {}
                },
                {
                    id: 'sensor_text_2',
                    type: 'sensor_text',
                    entity_id: 'weather.home',
                    props: {}
                },
                {
                    id: 'sensor_text_3',
                    type: 'sensor_text',
                    entity_id: 'sensor.label',
                    props: {}
                },
                {
                    id: 'sensor_text_4',
                    type: 'sensor_text',
                    entity_id: 'sensor.explicit_text',
                    props: { is_text_sensor: true }
                },
                {
                    id: 'sensor_text_5',
                    type: 'sensor_text',
                    entity_id: 'sensor.local',
                    props: { is_local_sensor: true }
                }
            ]
        });

        expect(pendingTriggers.get('sensor.power')).toEqual(new Set(['- lvgl.widget.refresh: sensor_text_1']));
        expect(pendingTriggers.get('sensor.temperature')).toEqual(new Set(['- lvgl.widget.refresh: sensor_text_1']));
        expect(pendingTriggers.has('weather.home')).toBe(false);
        expect(pendingTriggers.has('sensor.label')).toBe(false);
        expect(pendingTriggers.has('sensor.explicit_text')).toBe(false);
        expect(pendingTriggers.has('sensor.local')).toBe(false);
    });

    it('deduplicates repeated nested text attributes across widgets', () => {
        mockAppState.entityStates = {
            'sensor.status': { state: 'online' }
        };

        const lines = [];
        const seenSensorIds = new Set();
        const seenTextEntityIds = new Set();

        onExportTextSensors({
            lines,
            seenSensorIds,
            seenTextEntityIds,
            widgets: [
                {
                    type: 'sensor_text',
                    entity_id: 'sensor.status',
                    props: { attribute: 'friendly_name' }
                },
                {
                    type: 'sensor_text',
                    entity_id: 'sensor.status',
                    props: { attribute: 'friendly_name' }
                }
            ]
        });

        expect(mockGetSensorPlatformLines).toHaveBeenCalledTimes(1);
        expect(seenTextEntityIds).toEqual(new Set(['sensor.status__attr__friendly_name']));
        expect(lines.filter((line) => line === '# Text Sensors (Detected from Sensor Text)')).toHaveLength(1);
    });
});
