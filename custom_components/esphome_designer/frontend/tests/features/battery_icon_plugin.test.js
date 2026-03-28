import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockAppState, mockWidgetFactory } = vi.hoisted(() => ({
    mockAppState: {
        entityStates: {},
        updateWidget: vi.fn()
    },
    mockWidgetFactory: {
        getEffectiveDarkMode: vi.fn(() => false)
    }
}));

vi.mock('@core/state', () => ({
    AppState: mockAppState
}));

vi.mock('@core/widget_factory', () => ({
    WidgetFactory: mockWidgetFactory
}));

import plugin from '../../features/battery_icon/plugin.js';

describe('battery_icon plugin', () => {
    beforeEach(() => {
        mockAppState.entityStates = {};
        mockAppState.updateWidget.mockReset();
    });

    it('renders fitted battery previews with borders and live entity values', () => {
        mockAppState.entityStates = {
            'sensor.battery_level': {
                state: '18'
            }
        };

        const el = document.createElement('div');
        plugin.render(el, {
            id: 'battery_1',
            width: 40,
            height: 44,
            entity_id: 'sensor.battery_level',
            props: {
                fit_icon_to_frame: true,
                color: 'green',
                font_size: 12,
                border_width: 2,
                border_color: 'black',
                bg_color: 'white'
            }
        }, {
            getColorStyle: (value) => value || '#000'
        });

        expect(el.style.fontSize).toBe('32px');
        expect(el.style.border).toContain('2px solid');
        expect(el.style.backgroundColor).toBe('white');
        expect(el.textContent).toContain('18%');
        expect(el.innerText.codePointAt(0)).toBe(0xf007b);
    });

    it('exports LVGL widgets and numeric-sensor triggers for external battery entities', () => {
        const lvgl = plugin.exportLVGL({
            id: 'battery-widget',
            entity_id: 'sensor.house_battery',
            props: {
                is_local_sensor: false,
                size: 28,
                font_size: 10,
                color: 'red'
            }
        }, {
            common: { id: 'battery-widget' },
            convertColor: (value) => `COLOR_${value}`,
            getLVGLFont: (family, size) => `${family}_${size}`
        });

        expect(lvgl.obj.widgets[0].label.id).toBe('battery_widget_icon');
        expect(lvgl.obj.widgets[1].label.text).toContain('id(sensor_house_battery).has_state()');

        const lines = [];
        const pendingTriggers = new Map();
        const seenSensorIds = new Set();
        plugin.onExportNumericSensors({
            lines,
            widgets: [
                {
                    id: 'battery-widget',
                    type: 'battery_icon',
                    entity_id: 'sensor.house_battery',
                    props: {
                        is_local_sensor: false
                    }
                }
            ],
            isLvgl: true,
            pendingTriggers,
            seenSensorIds
        });

        const output = lines.join('\n');
        expect(output).toContain('# External Battery Sensors');
        expect(output).toContain('id: sensor_house_battery');
        expect(output).toContain('entity_id: sensor.house_battery');
        expect(pendingTriggers.get('sensor.house_battery')).toEqual(new Set([
            '- lvgl.widget.refresh: battery_widget_icon',
            '- lvgl.widget.refresh: battery_widget_text'
        ]));
    });
});
