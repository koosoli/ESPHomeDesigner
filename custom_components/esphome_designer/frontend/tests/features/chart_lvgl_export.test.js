import { describe, expect, it } from 'vitest';

import graphPlugin from '../../features/graph/plugin.js';
import lvglChartPlugin from '../../features/lvgl_chart/plugin.js';

describe('chart LVGL export', () => {
    const ctx = {
        common: { id: 'chart_1', x: 5, y: 10, width: 120, height: 80 },
        convertColor: (value) => `Color(${value})`,
        formatOpacity: (value) => value
    };

    it('exports graph widgets as documented LVGL line content', () => {
        const output = graphPlugin.exportLVGL({
            id: 'graph_1',
            type: 'graph',
            title: 'Power',
            entity_id: 'sensor.power',
            props: { ...graphPlugin.defaults }
        }, ctx);

        expect(output).toHaveProperty('obj');
        expect(output).not.toHaveProperty('lv_chart');
        expect(output.obj.widgets.some((entry) => entry.line?.id === 'lvgl_graph_graph_1_line')).toBe(true);
        expect(output.obj.widgets.some((entry) => entry.label?.text === '"Power"')).toBe(true);
    });

    it('exports lvgl_chart widgets as documented LVGL line content', () => {
        const output = lvglChartPlugin.exportLVGL({
            id: 'chart_1',
            type: 'lvgl_chart',
            entity_id: 'sensor.trend',
            props: { ...lvglChartPlugin.defaults, title: 'Trend' }
        }, ctx);

        expect(output).toHaveProperty('lv_chart');
        expect(output).not.toHaveProperty('obj');
        expect(output.lv_chart.type).toBe('line');
        expect(output.lv_chart.series[0]).toMatchObject({
            sensor: 'sensor_trend',
            color: 'Color(blue)'
        });
        expect(output.lv_chart.widgets.some((entry) => entry.label?.text === '"Trend"')).toBe(true);
    });

    it('injects lvgl.line.update actions for live graph sensors', () => {
        const pendingTriggers = new Map();
        graphPlugin.onExportNumericSensors({
            widgets: [{
                id: 'graph_1',
                type: 'graph',
                entity_id: 'sensor.power',
                width: 120,
                height: 80,
                props: { ...graphPlugin.defaults }
            }],
            isLvgl: true,
            pendingTriggers
        });

        const actions = Array.from(pendingTriggers.get('sensor.power') || []);
        expect(actions.some((action) => action.includes('- lvgl.line.update:'))).toBe(true);
        expect(actions.some((action) => action.includes('id: lvgl_graph_graph_1_line'))).toBe(true);
    });
});
