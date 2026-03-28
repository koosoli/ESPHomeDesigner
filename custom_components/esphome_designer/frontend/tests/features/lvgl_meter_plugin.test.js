import { beforeEach, describe, expect, it } from 'vitest';

import plugin from '../../features/lvgl_meter/plugin.js';

describe('lvgl meter plugin', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    it('renders meter arcs, ticks, and needles with opacity', () => {
        const host = document.createElement('div');

        plugin.render(host, {
            id: 'meter_1',
            width: 120,
            height: 120,
            props: {
                min: 0,
                max: 100,
                value: 50,
                tick_count: 5,
                tick_length: 8,
                indicator_width: 3,
                indicator_color: 'red',
                bg_color: 'gray',
                color: 'black',
                opa: 128
            }
        }, {
            getColorStyle: (value) => `css-${value}`
        });

        const svg = host.querySelector('svg');
        expect(svg?.querySelectorAll('path')).toHaveLength(1);
        expect(svg?.querySelectorAll('g line')).toHaveLength(5);
        expect(svg?.querySelectorAll('circle')).toHaveLength(1);
        expect(parseFloat(host.style.opacity)).toBeCloseTo(128 / 255, 4);
    });

    it('exports meter values and LVGL sensor lambdas', () => {
        const staticExport = plugin.exportLVGL({
            id: 'meter_static',
            props: {
                value: 42,
                min: 5,
                max: 90,
                bg_color: 'gray',
                color: 'black',
                indicator_color: 'red',
                indicator_width: 6,
                opa: 200
            }
        }, {
            common: { id: 'base' },
            convertColor: (value) => `0x${value}`,
            formatOpacity: (value) => `opa(${value})`
        });

        expect(staticExport.meter.bg_color).toBe('0xgray');
        expect(staticExport.meter.opa).toBe('opa(200)');
        expect(staticExport.meter.scales[0].indicators[0].line.value).toBe(42);

        const entityExport = plugin.exportLVGL({
            id: 'meter_entity',
            entity_id: 'sensor.room_temperature',
            props: {
                value: 12
            }
        }, {
            common: { id: 'base' },
            convertColor: (value) => value,
            formatOpacity: (value) => value
        });

        expect(entityExport.meter.scales[0].indicators[0].line.value).toContain('id(sensor_room_temperature).state');
    });

    it('normalizes numeric sensor entity ids and reuses pending trigger buckets', () => {
        const pendingTriggers = new Map();

        plugin.onExportNumericSensors({
            widgets: [
                { id: 'meter_a', type: 'lvgl_meter', entity_id: 'temperature' },
                { id: 'meter_a', type: 'lvgl_meter', entity_id: 'temperature' },
                { id: 'meter_b', type: 'lvgl_meter', entity_id: 'sensor.temperature' },
                { id: 'ignore', type: 'label', entity_id: 'sensor.other' }
            ],
            isLvgl: true,
            pendingTriggers
        });

        expect([...pendingTriggers.keys()]).toEqual(['sensor.temperature']);
        expect([...pendingTriggers.get('sensor.temperature')]).toEqual([
            '- lvgl.indicator.update:\n          id: meter_a_ind\n          value: !lambda "return x;"',
            '- lvgl.indicator.update:\n          id: meter_b_ind\n          value: !lambda "return x;"'
        ]);
    });
});
