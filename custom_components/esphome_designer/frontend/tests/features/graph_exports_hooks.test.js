import { beforeEach, describe, expect, it, vi } from 'vitest';

const {
    mockGetSensorPlatformLines,
    mockBuildLvglBoundsLines,
    mockBuildLvglLineUpdateAction,
    mockBuildLvglLiveUpdateAction,
    mockGetLvglGraphIds,
    mockGetLvglGraphPointCount
} = vi.hoisted(() => ({
    mockGetSensorPlatformLines: vi.fn(),
    mockBuildLvglBoundsLines: vi.fn(),
    mockBuildLvglLineUpdateAction: vi.fn(),
    mockBuildLvglLiveUpdateAction: vi.fn(),
    mockGetLvglGraphIds: vi.fn(),
    mockGetLvglGraphPointCount: vi.fn()
}));

vi.mock('../../js/io/adapters/mqtt_helpers.js', () => ({
    getSensorPlatformLines: mockGetSensorPlatformLines
}));

vi.mock('../../features/graph/exports_lvgl.js', () => ({
    buildLvglBoundsLines: mockBuildLvglBoundsLines,
    buildLvglLineUpdateAction: mockBuildLvglLineUpdateAction,
    buildLvglLiveUpdateAction: mockBuildLvglLiveUpdateAction,
    getLvglGraphIds: mockGetLvglGraphIds,
    getLvglGraphPointCount: mockGetLvglGraphPointCount
}));

import {
    onExportComponents,
    onExportEsphome,
    onExportGlobals,
    onExportNumericSensors,
    onExportTextSensors
} from '../../features/graph/exports_hooks.js';

describe('graph exports_hooks', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockGetSensorPlatformLines.mockReturnValue(['- platform: homeassistant']);
        mockBuildLvglBoundsLines.mockReturnValue(['bounds_line();']);
        mockBuildLvglLineUpdateAction.mockReturnValue('- lvgl.line.update:\n    id: lvgl_graph_line');
        mockBuildLvglLiveUpdateAction.mockReturnValue('- lambda: |- \n    refresh_graph();');
        mockGetLvglGraphIds.mockReturnValue({
            samplesId: 'samples_1',
            countId: 'count_1',
            minId: 'min_1',
            maxId: 'max_1'
        });
        mockGetLvglGraphPointCount.mockReturnValue(12);
    });

    it('exports direct-mode graph color and graph sections with inferred grid defaults', () => {
        const lines = [];

        onExportComponents({
            lines,
            isLvgl: false,
            profile: { features: {} },
            layout: {
                darkMode: false,
                pages: [{ dark_mode: 'light' }, { dark_mode: 'dark' }]
            },
            widgets: [
                {
                    id: 'graph-1',
                    type: 'graph',
                    width: 120,
                    height: 60,
                    entity_id: 'temperature',
                    props: {
                        color: '#112233',
                        duration: '2h',
                        line_type: 'dashed',
                        line_thickness: '4',
                        border: false,
                        continuous: true
                    }
                },
                {
                    id: 'graph-2',
                    type: 'graph',
                    width: 100,
                    height: 40,
                    entity_id: 'sensor.light',
                    _pageIndex: 1,
                    props: {
                        color: 'theme_auto'
                    }
                }
            ]
        });

        const joined = lines.join('\n');
        expect(joined).toContain('color:');
        expect(joined).toContain('graph_color_graph_1');
        expect(joined).toContain('red_int: 17');
        expect(joined).toContain('green_int: 34');
        expect(joined).toContain('blue_int: 51');
        expect(joined).toContain('graph_color_graph_2');
        expect(joined).toContain('red_int: 0');
        expect(joined).toContain('duration: 2h');
        expect(joined).toContain('x_grid: 30min');
        expect(joined).toContain('y_grid: 50');
        expect(joined).toContain('sensor: sensor_temperature');
        expect(joined).toContain('line_type: DASHED');
        expect(joined).toContain('continuous: true');
        expect(joined).toContain('min_range: 10');
    });

    it('handles 0x and named graph colors and falls back to a default x-grid for invalid durations', () => {
        const lines = [];

        onExportComponents({
            lines,
            isLvgl: false,
            profile: { features: {} },
            layout: {
                darkMode: false,
                pages: [{ dark_mode: 'light' }]
            },
            widgets: [
                {
                    id: 'graph-hex',
                    type: 'graph',
                    width: 100,
                    height: 40,
                    entity_id: 'sensor.power',
                    props: {
                        color: '0x112233',
                        duration: 'invalid'
                    }
                },
                {
                    id: 'graph-named',
                    type: 'graph',
                    width: 100,
                    height: 40,
                    entity_id: 'sensor.energy',
                    props: {
                        color: 'orange',
                        duration: '90min'
                    }
                }
            ]
        });

        const joined = lines.join('\n');
        expect(joined).toContain('graph_color_graph_hex');
        expect(joined).toContain('red_int: 17');
        expect(joined).toContain('green_int: 34');
        expect(joined).toContain('blue_int: 51');
        expect(joined).toContain('graph_color_graph_named');
        expect(joined).toContain('red_int: 255');
        expect(joined).toContain('green_int: 165');
        expect(joined).toContain('blue_int: 0');
        expect(joined).toContain('x_grid: 1h');
        expect(joined).toContain('x_grid: 23min');
    });

    it('exports LVGL and HA-history globals for graph widgets', () => {
        const lines = [];

        onExportGlobals({
            lines,
            isLvgl: true,
            widgets: [
                {
                    id: 'graph-1',
                    type: 'graph',
                    width: 120,
                    entity_id: 'sensor.power',
                    props: {
                        use_ha_history: true,
                        history_points: 24,
                        auto_scale: true
                    }
                }
            ]
        });

        const joined = lines.join('\n');
        expect(joined).toContain('id: samples_1');
        expect(joined).toContain('type: float[12]');
        expect(joined).toContain('id: hist_graph_1');
        expect(joined).toContain('type: float[24]');
        expect(joined).toContain('id: hist_graph_1_min');
        expect(joined).toContain('id: hist_graph_1_max');
    });

    it('adds required ESPHome headers for HA-history graphs without duplication', () => {
        const lines = ['<algorithm>'];

        onExportEsphome({
            lines,
            widgets: [
                {
                    id: 'graph-1',
                    type: 'graph',
                    props: { use_ha_history: true }
                }
            ]
        });

        expect(lines.filter((line) => line === '<algorithm>')).toHaveLength(1);
        expect(lines).toContain('<cstdlib>');
        expect(lines).toContain('<vector>');
    });

    it('exports HA-history text sensors and LVGL refresh lambdas for graphs', () => {
        const lines = [];

        onExportTextSensors({
            lines,
            isLvgl: true,
            widgets: [
                {
                    id: 'graph-1',
                    type: 'graph',
                    entity_id: 'sensor.energy',
                    props: {
                        use_ha_history: true,
                        history_points: 3,
                        history_attribute: 'history',
                        history_smoothing: true,
                        auto_scale: false,
                        mqtt_topic: 'energy/history'
                    }
                }
            ]
        });

        const joined = lines.join('\n');
        expect(mockGetSensorPlatformLines).toHaveBeenCalledWith(
            { props: { mqtt_topic: 'energy/history' } },
            'sensor.energy',
            'hist_graph_1_fetcher',
            'history'
        );
        expect(joined).toContain('std::vector<float> values;');
        expect(joined).toContain('id(hist_graph_1_count) = idx;');
        expect(joined).toContain('Simple moving average smoothing');
        expect(joined).toContain('bounds_line();');
        expect(joined).toContain('id(samples_1)[i] = id(hist_graph_1)[start + i];');
        expect(joined).toContain('lvgl.line.update:');
    });

    it('exports auto-scale history tracking for text sensor graphs', () => {
        const lines = [];

        onExportTextSensors({
            lines,
            isLvgl: false,
            widgets: [
                {
                    id: 'graph-2',
                    type: 'graph',
                    entity_id: 'sensor.temperature',
                    props: {
                        use_ha_history: true,
                        history_points: 4,
                        auto_scale: true
                    }
                }
            ]
        });

        const joined = lines.join('\n');
        expect(joined).toContain('float min_v = 1e30, max_v = -1e30;');
        expect(joined).toContain('if (val < min_v) min_v = val;');
        expect(joined).toContain('if (val > max_v) max_v = val;');
        expect(joined).toContain('id(hist_graph_2_min) = min_v;');
        expect(joined).toContain('id(hist_graph_2_max) = max_v;');
        expect(joined).not.toContain('lvgl.line.update:');
    });

    it('queues pending LVGL numeric sensor triggers for direct graph entities', () => {
        const pendingTriggers = new Map();

        onExportNumericSensors({
            isLvgl: true,
            pendingTriggers,
            widgets: [
                {
                    id: 'graph-1',
                    type: 'graph',
                    entity_id: 'power',
                    props: {}
                },
                {
                    id: 'graph-2',
                    type: 'graph',
                    entity_id: 'sensor.local_only',
                    props: { is_local_sensor: true }
                }
            ]
        });

        expect(pendingTriggers.has('sensor.power')).toBe(true);
        expect(pendingTriggers.get('sensor.power')).toEqual(new Set(['- lambda: |- \n    refresh_graph();']));
        expect(pendingTriggers.has('sensor.local_only')).toBe(false);
    });
});
