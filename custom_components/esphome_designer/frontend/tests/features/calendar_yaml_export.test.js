import { describe, expect, it } from 'vitest';

import { generateSnippet } from '../../features/calendar/yaml_export.js';

describe('calendar yaml export', () => {
    it('uses widget entity settings and visibility toggles in the generated snippet', () => {
        const result = generateSnippet({
            id: 'calendar_a',
            x: 10,
            y: 20,
            w: 320,
            h: 220,
            properties: {
                entity_id: 'sensor.family_calendar',
                show_header: false,
                show_grid: false,
                show_events: true,
                max_events: 6
            }
        });

        expect(result.instructions).toContain('python_script.esp_calendar_data_conversion');
        expect(result.instructions).toContain('nr_entries: 6');
        expect(result.sensors).toContain('entity_id: sensor.family_calendar');
        expect(result.sensors).toContain('id: calendar_json_calendar_a');
        expect(result.lambda).toContain('calendar_y_pos = 20; // Move up if header hidden');
        expect(result.lambda).toContain('cell_height = 0; // Collapse if hidden');
        expect(result.lambda).toContain('id(calendar_json_calendar_a).state');
    });

    it('falls back to the default calendar entity when none is configured', () => {
        const result = generateSnippet({
            id: 'calendar_b',
            x: 0,
            y: 0,
            w: 300,
            h: 160,
            properties: {}
        });

        expect(result.sensors).toContain('entity_id: sensor.esp_calendar_data');
        expect(result.lambda).toContain('// --- Calendar Widget (calendar_b) ---');
    });
});
