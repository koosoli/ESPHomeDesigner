import { describe, expect, it, vi } from 'vitest';

import plugin from '../../features/progress_bar/plugin.js';

function createContext(lines = []) {
    return {
        lines,
        addFont: vi.fn(() => 'font_body'),
        getColorConst: (value) => `Color(${value})`,
        addDitherMask: vi.fn(),
        getCondProps: () => ({}),
        getConditionCheck: () => '',
        isEpaper: false,
        sanitize: (value) => value
    };
}

describe('progress_bar exports', () => {
    it('exports horizontal direct-mode bars with separated label and percentage positions', () => {
        const context = createContext();

        plugin.export({
            id: 'bar-1',
            x: 5,
            y: 10,
            width: 120,
            height: 40,
            entity_id: 'battery',
            title: 'Battery',
            props: {
                show_label: true,
                show_percentage: true,
                bar_height: 12,
                text_align: 'CENTER',
                min: 0,
                max: 100,
                color: 'blue',
                bg_color: 'white'
            }
        }, context);

        const output = context.lines.join('\n');
        expect(output).toContain('float val_bar_1 = id(sensor_battery).state;');
        expect(output).toContain('it.printf(5, 10, id(font_body), Color(blue), TextAlign::TOP_LEFT, "Battery");');
        expect(output).toContain('it.printf(5 + 120, 10, id(font_body), Color(blue), TextAlign::TOP_RIGHT, "%d%%", pct_bar_1);');
        expect(output).toContain('it.rectangle(5, 38, 120, 12, Color(blue));');
        expect(context.addDitherMask).toHaveBeenCalledOnce();
    });

    it('exports vertical direct-mode bars and LVGL sensor refresh hooks', () => {
        const context = createContext();

        plugin.export({
            id: 'bar-2',
            x: 0,
            y: 0,
            width: 40,
            height: 100,
            entity_id: 'battery_level',
            title: 'Power',
            props: {
                orientation: 'vertical',
                is_local_sensor: true,
                min: 0,
                max: 255,
                show_label: true,
                show_percentage: true,
                bar_height: 14,
                color: 'black'
            }
        }, context);

        const output = context.lines.join('\n');
        expect(output).toContain('float val_bar_2 = id(battery_level).state;');
        expect(output).toContain('it.printf(0 + 40/2, 0, id(font_body), color_on, TextAlign::TOP_CENTER, "Power");');
        expect(output).toContain('int bar_h = (72 - 4) * pct_bar_2 / 100;');

        const lvgl = plugin.exportLVGL({
            id: 'bar_lvgl',
            entity_id: 'sensor.power',
            props: {
                min: 10,
                max: 90,
                color: 'red',
                bg_color: 'gray',
                mode: 'symmetrical'
            }
        }, {
            common: { id: 'base' },
            convertColor: (value) => `Color(${value})`
        });

        expect(lvgl.bar).toMatchObject({
            id: 'base',
            min_value: 10,
            max_value: 90,
            bg_color: 'Color(gray)',
            mode: 'symmetrical'
        });
        expect(lvgl.bar.value).toContain('id(sensor_power).state');

        const pendingTriggers = new Map();
        plugin.onExportNumericSensors({
            widgets: [
                { id: 'bar_lvgl', type: 'progress_bar', entity_id: 'power', props: {} },
                { id: 'bar_local', type: 'progress_bar', entity_id: 'sensor.skip', props: { is_local_sensor: true } }
            ],
            isLvgl: true,
            pendingTriggers
        });

        expect([...pendingTriggers.keys()]).toEqual(['sensor.power']);
        expect([...pendingTriggers.get('sensor.power')]).toEqual(['- lvgl.widget.refresh: bar_lvgl']);
    });

    it('exports OpenDisplay and OEPL progress payloads with percentage templates', () => {
        const widget = {
            id: 'bar_widget',
            x: 10,
            y: 20,
            width: 80,
            height: 24,
            entity_id: 'sensor.battery',
            title: 'Charge',
            props: {
                min: 0,
                max: 100,
                color: 'green',
                bg_color: 'white',
                show_percentage: true,
                show_label: true,
                border_width: 2
            }
        };

        const openDisplay = plugin.exportOpenDisplay(widget, { _layout: {}, _page: {} });
        expect(openDisplay.direction).toBe('right');
        expect(openDisplay.show_percentage).toBe(true);
        expect(String(openDisplay.progress)).toContain('sensor.battery');

        const oepl = plugin.exportOEPL({
            ...widget,
            props: {
                ...widget.props,
                orientation: 'vertical'
            }
        }, { _layout: {}, _page: {} });

        expect(oepl[0]).toMatchObject({
            type: 'text',
            value: 'Charge'
        });
        expect(oepl.at(-1)).toMatchObject({
            type: 'progress',
            direction: 'up'
        });
        expect(String(oepl.at(-1).value)).toContain('sensor.battery');
    });
});
