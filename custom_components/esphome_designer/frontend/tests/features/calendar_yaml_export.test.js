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
                max_events: 6,
                prefix_length: 4,
                prefix_separator: ' - ',
                group_events_by_day: true
            }
        });

        expect(result.instructions).toContain('python_script.esp_calendar_data_conversion');
        expect(result.instructions).toContain('nr_entries: 6');
        expect(result.instructions).toContain('prefix_length: 4');
        expect(result.instructions).toContain('prefix_separator: " - "');
        expect(result.sensors).toContain('entity_id: sensor.family_calendar');
        expect(result.sensors).toContain('id: calendar_json_calendar_a');
        expect(result.lambda).toContain('calendar_y_pos = 20; // Move up if header hidden');
        expect(result.lambda).toContain('cell_height = 0; // Collapse if hidden');
        expect(result.lambda).toContain('bool group_events_by_day = true;');
        expect(result.lambda).toContain('int last_drawn_day = -1;');
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

    it('keeps the default entry count and disables the event block when events are hidden', () => {
        const result = generateSnippet({
            id: 'calendar_c',
            x: 0,
            y: 0,
            w: 240,
            h: 180,
            properties: {
                show_events: false
            }
        });

        expect(result.instructions).toContain('nr_entries: 8');
        expect(result.lambda).toContain('if (false) {');
    });

    it('scales the snippet event summary width when the calendar widget is widened', () => {
        const result = generateSnippet({
            id: 'calendar_d',
            x: 0,
            y: 0,
            w: 520,
            h: 220,
            properties: {
                show_header: false,
                show_grid: false,
                show_events: true,
                font_size_event: 18
            }
        });

        const match = result.lambda.match(/"%\.(\d+)s", summary/);
        expect(match).not.toBeNull();
        expect(Number(match?.[1])).toBeGreaterThan(25);
    });
});
