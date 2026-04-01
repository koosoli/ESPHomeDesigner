import { describe, expect, it } from 'vitest';

import {
    buildGraphHistoryTemplateEntityId,
    buildGraphHistoryTemplateFilename,
    buildGraphHistoryTemplateYaml,
    getGraphHistoryPollMinutes
} from '../../features/graph/history_template.js';

describe('graph history template helper', () => {
    it('builds a predictable helper entity id and filename', () => {
        const widget = {
            entity_id: 'sensor.room_temperature'
        };

        expect(buildGraphHistoryTemplateEntityId(widget)).toBe('sensor.graph_history_sensor_room_temperature');
        expect(buildGraphHistoryTemplateFilename(widget)).toBe('graph_history_sensor_room_temperature.yaml');
    });

    it('derives a bounded polling interval from duration and point count', () => {
        expect(getGraphHistoryPollMinutes({
            props: {
                duration: '1h',
                history_points: 120
            }
        })).toBe(1);

        expect(getGraphHistoryPollMinutes({
            props: {
                duration: '24h',
                history_points: 96
            }
        })).toBe(15);

        expect(getGraphHistoryPollMinutes({
            props: {
                duration: '1w',
                history_points: 168
            }
        })).toBe(30);
    });

    it('generates a HA helper package with SQL query, helper entity guidance, and matching attribute name', () => {
        const widget = {
            entity_id: 'sensor.energy_usage',
            props: {
                duration: '2h',
                history_points: 48,
                history_attribute: 'history_points'
            }
        };

        const yaml = buildGraphHistoryTemplateYaml(widget);

        expect(yaml).toContain('Make sure the SQL integration is available');
        expect(yaml).toContain('Point the graph widget to sensor.graph_history_sensor_energy_usage.');
        expect(yaml).toContain("WHERE states_meta.entity_id = 'sensor.energy_usage'");
        expect(yaml).toContain("AND states.last_updated_ts >= {{ (now().timestamp() - 7200) | round(0, 'floor') }}");
        expect(yaml).toContain('LIMIT 48;');
        expect(yaml).toContain('response_variable: graph_history_sensor_energy_usage');
        expect(yaml).toContain('name: "Graph History Sensor Energy Usage"');
        expect(yaml).toContain('unique_id: graph_history_sensor_energy_usage');
        expect(yaml).toContain('state: "{{ states(\\"sensor.energy_usage\\") }}"');
        expect(yaml).toContain('history_points: >');
        expect(yaml).toContain("{{ graph_history_sensor_energy_usage.result | default([]) | map(attribute='value') | list | tojson }}");
        expect(yaml).toContain('window_seconds: 7200');
    });
});
