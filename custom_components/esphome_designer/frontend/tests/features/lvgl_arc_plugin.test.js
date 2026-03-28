import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockAppState } = vi.hoisted(() => ({
    mockAppState: {
        entityStates: {}
    }
}));

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

import plugin from '../../features/lvgl_arc/plugin.js';

describe('lvgl arc plugin', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockAppState.entityStates = {};
    });

    it('renders bound entity values as SVG arcs and centers the title label', () => {
        mockAppState.entityStates = {
            'sensor.progress': { state: '75' }
        };

        const host = document.createElement('div');
        plugin.render(host, {
            id: 'arc_1',
            type: 'lvgl_arc',
            width: 120,
            height: 80,
            entity_id: 'sensor.progress',
            props: {
                min: 0,
                max: 100,
                value: 10,
                thickness: '12',
                color: 'green',
                title: 'Load',
                start_angle: 135,
                end_angle: 45
            }
        }, {
            getColorStyle: (value) => value
        });

        const svg = host.querySelector('svg');
        const paths = host.querySelectorAll('path');
        const title = host.querySelector('div');

        expect(svg?.getAttribute('viewBox')).toBe('0 0 120 80');
        expect(paths).toHaveLength(2);
        expect(paths[0].getAttribute('stroke')).toBe('#eee');
        expect(paths[1].getAttribute('stroke')).toBe('green');
        expect(title?.textContent).toBe('Load');
        expect(title?.style.color).toBe('green');
    });

    it('exports LVGL arc bindings and queues numeric refresh triggers', () => {
        const exported = plugin.exportLVGL({
            id: 'arc_1',
            type: 'lvgl_arc',
            entity_id: 'sensor.room_temp',
            props: {
                value: 42,
                min: 5,
                max: 95,
                thickness: 14,
                color: 'blue',
                title: 'Temp',
                start_angle: 120,
                end_angle: 30,
                mode: 'reverse'
            }
        }, {
            common: { id: 'arc_1', width: 80, height: 80 },
            convertColor: (value) => `0x${String(value).toUpperCase()}`
        });

        expect(exported.arc.value).toContain('id(sensor_room_temp).state');
        expect(exported.arc.min_value).toBe(5);
        expect(exported.arc.max_value).toBe(95);
        expect(exported.arc.arc_width).toBe(14);
        expect(exported.arc.arc_color).toBe('0xBLUE');
        expect(exported.arc.indicator.arc_color).toBe('0xBLUE');
        expect(exported.arc.widgets[0].label.text).toBe('"Temp"');

        const pendingTriggers = new Map();
        plugin.onExportNumericSensors({
            widgets: [
                { id: 'arc_1', type: 'lvgl_arc', entity_id: ' sensor.room_temp ' },
                { id: 'ignore', type: 'text', entity_id: 'sensor.ignored' }
            ],
            isLvgl: true,
            pendingTriggers
        });

        expect([...pendingTriggers.get('sensor.room_temp')]).toEqual(['- lvgl.widget.refresh: arc_1']);
    });
});
