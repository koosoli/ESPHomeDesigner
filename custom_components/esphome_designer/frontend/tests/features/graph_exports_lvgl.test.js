import { describe, expect, it } from 'vitest';

import {
    buildLvglBoundsLines,
    buildLvglLineUpdateAction,
    buildLvglLiveUpdateAction,
    exportLVGL,
    getLvglGraphIds,
    getLvglGraphPointCount
} from '../../features/graph/exports_lvgl.js';

describe('graph exports_lvgl', () => {
    it('sanitizes ids and clamps requested point counts', () => {
        const ids = getLvglGraphIds({ id: 'graph-1' });
        const clampedByHistory = getLvglGraphPointCount({
            width: 240,
            props: { history_points: 99 }
        });
        const clampedByWidth = getLvglGraphPointCount({
            width: 10,
            props: {}
        });

        expect(ids).toEqual({
            base: 'lvgl_graph_graph_1',
            lineId: 'lvgl_graph_graph_1_line',
            samplesId: 'lvgl_graph_graph_1_samples',
            countId: 'lvgl_graph_graph_1_count',
            minId: 'lvgl_graph_graph_1_min',
            maxId: 'lvgl_graph_graph_1_max'
        });
        expect(clampedByHistory).toBe(48);
        expect(clampedByWidth).toBe(8);
    });

    it('builds fixed and auto-scaled bound calculations', () => {
        const fixed = buildLvglBoundsLines({
            id: 'graph-fixed',
            props: {
                auto_scale: false,
                min_value: '10',
                max_value: '90'
            }
        }, 'count', (index) => `samples[${index}]`);

        const autoscaled = buildLvglBoundsLines({
            id: 'graph-auto',
            props: {
                min_range: '20',
                max_range: '50'
            }
        }, 'count_expr', (index) => `samples[${index}]`);

        expect(fixed).toEqual([
            'id(lvgl_graph_graph_fixed_min) = 10;',
            'id(lvgl_graph_graph_fixed_max) = 90;'
        ]);
        expect(autoscaled).toContain('float min_v = samples[0];');
        expect(autoscaled).toContain('for (int i = 1; i < count_expr; i++) {');
        expect(autoscaled).toContain('float range_min = max_v - min_v;');
        expect(autoscaled).toContain('float range_max = max_v - min_v;');
        expect(autoscaled.at(-2)).toBe('id(lvgl_graph_graph_auto_min) = min_v;');
        expect(autoscaled.at(-1)).toBe('id(lvgl_graph_graph_auto_max) = max_v;');
    });

    it('formats live LVGL point updates with multiline lambdas', () => {
        const widget = {
            id: 'graph-live',
            width: 80,
            entity_id: 'sensor.power',
            props: {
                history_points: 8
            }
        };

        const lineUpdate = buildLvglLineUpdateAction(widget);
        const liveUpdate = buildLvglLiveUpdateAction(widget);

        expect(lineUpdate).toContain('- lvgl.line.update:');
        expect(lineUpdate).toContain('id: lvgl_graph_graph_live_line');
        expect(lineUpdate).toContain('y: !lambda |-');
        expect(lineUpdate).toContain('const int total = 8;');
        expect(liveUpdate).toContain('const int max_samples = 8;');
        expect(liveUpdate).toContain('id(lvgl_graph_graph_live_count) += 1;');
        expect(liveUpdate).toContain('id(lvgl_graph_graph_live_min) = min_v;');
        expect(liveUpdate).toContain('- lvgl.line.update:');
    });

    it('exports preview graphs with dotted lines, labels, and optional grids', () => {
        const transparent = exportLVGL({
            id: 'graph-preview',
            width: 96,
            height: 60,
            title: 'Preview',
            props: {
                color: 'teal',
                line_type: 'dotted',
                line_thickness: '5',
                font_family: 'Inter',
                font_size: 16,
                font_weight: 700,
                background_color: 'transparent'
            }
        }, {
            common: { id: 'graph-root' },
            convertColor: (value) => `0x${value}`,
            getLVGLFont: (family, size, weight) => `${family}-${size}-${weight}`
        });

        expect(transparent.obj.bg_opa).toBe('transp');
        expect(transparent.obj.widgets[0].line.line_color).toBe('0xgray');
        expect(transparent.obj.widgets[6].line.line_dash_width).toBe(2);
        expect(transparent.obj.widgets[6].line.line_dash_gap).toBe(3);
        expect(transparent.obj.widgets[7].label.text).toBe('"Preview"');
        expect(transparent.obj.widgets[7].label.text_font).toBe('Inter-16-700');

        const noGrid = exportLVGL({
            id: 'graph-minimal',
            width: 96,
            height: 60,
            props: {
                grid: false,
                color: 'orange',
                bg_color: 'black'
            }
        }, {
            common: { id: 'graph-root' },
            convertColor: (value) => `0x${value}`,
            getLVGLFont: (family, size, weight) => `${family}-${size}-${weight}`
        });

        expect(noGrid.obj.bg_color).toBe('0xblack');
        expect(noGrid.obj.widgets).toHaveLength(2);
        expect(noGrid.obj.widgets[0].line.line_color).toBe('0xorange');
    });
});
