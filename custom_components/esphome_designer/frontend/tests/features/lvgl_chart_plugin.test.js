import { beforeEach, describe, expect, it } from 'vitest';

import plugin from '../../features/lvgl_chart/plugin.js';

describe('lvgl_chart plugin', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    it('renders chart previews with title, guide lines, and a polyline', () => {
        const host = document.createElement('div');
        plugin.render(host, {
            id: 'chart_render',
            width: 120,
            height: 80,
            props: {
                title: 'Usage',
                color: 'blue'
            }
        }, {
            getColorStyle: (value) => `css-${value}`
        });

        const svg = host.querySelector('svg');
        expect(host.textContent).toContain('Usage');
        expect(svg?.querySelectorAll('line')).toHaveLength(3);
        expect(svg?.querySelectorAll('polyline')).toHaveLength(1);
    });

    it('exports chart configuration with transparent backgrounds and entity sensors', () => {
        const exported = plugin.exportLVGL({
            id: 'chart_export',
            entity_id: 'sensor.power',
            props: {
                title: 'Power',
                color: 'blue',
                bg_color: 'transparent',
                point_count: 20,
                x_div_lines: 2,
                y_div_lines: 4,
                min: 10,
                max: 200
            }
        }, {
            common: { id: 'base' },
            convertColor: (value) => `Color(${value})`,
            formatOpacity: (value) => `opa(${value})`
        });

        expect(exported.chart).toMatchObject({
            id: 'base',
            point_count: 20,
            bg_opa: 'transp',
            div_line_count: {
                x: 2,
                y: 4
            },
            y_min: 10,
            y_max: 200
        });
        expect(exported.chart.series[0].sensor).toBe('sensor_power');
        expect(exported.chart.widgets[0].label.text).toBe('"Power"');
    });
});
