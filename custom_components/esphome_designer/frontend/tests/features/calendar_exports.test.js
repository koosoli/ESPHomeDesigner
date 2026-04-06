import { describe, expect, it, vi } from 'vitest';

import {
    collectRequirements,
    exportDirect,
    exportLVGL,
    onExportTextSensors
} from '../../features/calendar/exports.js';

describe('calendar exports', () => {
    it('exports calendar sensors once per entity and emits helper instructions', () => {
        const lines = [];

        onExportTextSensors({
            lines,
            seenEntityIds: new Set(),
            seenSensorIds: new Set(),
            widgets: [
                {
                    type: 'calendar',
                    entity_id: 'sensor.family_calendar',
                    props: {
                        source_calendars: 'calendar.work, calendar.home',
                        max_events: 12
                    }
                },
                {
                    type: 'calendar',
                    entity_id: 'sensor.family_calendar',
                    props: {
                        source_calendars: 'calendar.work, calendar.home'
                    }
                },
                {
                    type: 'calendar',
                    entity_id: 'calendar.native_calendar',
                    props: {}
                }
            ]
        });

        const output = lines.join('\n');
        expect(output.match(/- platform: homeassistant/g)).toHaveLength(2);
        expect(output).toContain('id: calendar_data_sensor_family_calendar');
        expect(output).toContain('attribute: entries');
        expect(output).toContain('#           - calendar.work');
        expect(output).toContain('#           - calendar.home');
        expect(output).toContain('#           nr_entries: 12');
    });

    it('exports LVGL calendars without header/grid widgets when disabled', () => {
        const result = exportLVGL({
            props: {
                show_header: false,
                show_grid: false,
                background_color: 'black',
                border_width: 2,
                border_color: 'white'
            }
        }, {
            common: { id: 'calendar_lvgl' },
            convertColor: (value) => `Color(${value})`,
            getLVGLFont: (family, size, weight) => `${family}_${size}_${weight}`
        });

        expect(result.obj).toMatchObject({
            id: 'calendar_lvgl',
            bg_color: 'Color(black)',
            border_width: 2,
            border_color: 'Color(white)',
            widgets: []
        });
    });

    it('exports direct calendars with entity-specific sensor ids and collects fonts', () => {
        const lines = [];

        exportDirect({
            x: 1,
            y: 2,
            width: 100,
            height: 80,
            entity_id: 'sensor.family_calendar',
            props: {
                show_header: false,
                show_grid: false,
                show_events: true,
                border_width: 1,
                border_color: 'red',
                text_color: 'black',
                background_color: 'white',
                font_family: 'Roboto'
            }
        }, {
            lines,
            addFont: vi.fn(() => 'font_ref'),
            getColorConst: (value) => `Color(${value})`,
            addDitherMask: vi.fn(),
            getCondProps: () => ({}),
            getConditionCheck: () => '',
            isEpaper: false
        });

        const output = lines.join('\n');
        expect(output).toContain('id(calendar_data_sensor_family_calendar).state');
        expect(output).toContain('it.filled_rectangle(x, y, w, h, Color(white));');
        expect(output).toContain('it.rectangle(1 + 0, 2 + 0, 100 - 0, 80 - 0, Color(red));');

        const addFont = vi.fn();
        collectRequirements({
            props: {
                font_family: 'Roboto',
                font_size_date: 80,
                font_size_day: 18,
                font_size_grid: 12,
                font_size_event: 16,
                bold_dates: true
            }
        }, { addFont });

        expect(addFont).toHaveBeenCalledWith('Roboto', 100, 56);
        expect(addFont).toHaveBeenCalledWith('Roboto', 700, 12);
        expect(addFont).toHaveBeenCalledWith('Material Design Icons', 400, 24);
    });

    it('scales direct calendar event summary width for wider widgets', () => {
        const lines = [];

        exportDirect({
            x: 0,
            y: 0,
            width: 520,
            height: 220,
            entity_id: 'sensor.family_calendar',
            props: {
                show_header: false,
                show_grid: false,
                show_events: true,
                text_color: 'black',
                background_color: 'white',
                font_family: 'Roboto',
                font_size_event: 18
            }
        }, {
            lines,
            addFont: vi.fn(() => 'font_ref'),
            getColorConst: (value) => `Color(${value})`,
            addDitherMask: vi.fn(),
            getCondProps: () => ({}),
            getConditionCheck: () => '',
            isEpaper: false
        });

        const output = lines.join('\n');
        const match = output.match(/"%\.(\d+)s", summary/);
        expect(match).not.toBeNull();
        expect(Number(match?.[1])).toBeGreaterThan(25);
    });

    it('exports rounded direct calendar borders when border_radius is set', () => {
        const lines = [];

        exportDirect({
            x: 1,
            y: 2,
            width: 100,
            height: 80,
            props: {
                show_header: false,
                show_grid: false,
                show_events: false,
                border_width: 2,
                border_radius: 8,
                border_color: 'red',
                text_color: 'black',
                background_color: 'white'
            }
        }, {
            lines,
            addFont: vi.fn(() => 'font_ref'),
            getColorConst: (value) => `Color(${value})`,
            addDitherMask: vi.fn(),
            getCondProps: () => ({}),
            getConditionCheck: () => '',
            isEpaper: false
        });

        const output = lines.join('\n');
        expect(output).toContain('it.filled_rounded_rectangle(x, y, w, h, 8, Color(white));');
        expect(output).toContain('draw_rrect_border(1, 2, 100, 80, 8, 2, Color(red));');
        expect(output).not.toContain('it.rectangle(1 + 0, 2 + 0, 100 - 0, 80 - 0, Color(red));');
    });
});
