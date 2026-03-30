import { describe, expect, it, vi } from 'vitest';

import {
    collectRequirements,
    exportDoc,
    exportLVGL,
    onExportNumericSensors
} from '../../features/template_sensor_bar/exports.js';

function createDocContext(overrides = {}) {
    return {
        lines: [],
        addFont: vi.fn((family, weight, size) => `${family.replace(/\s+/g, '_')}_${weight}_${size}`),
        getColorConst: (value) => `Color(${value})`,
        addDitherMask: vi.fn((lines, color) => lines.push(`          // dither:${color}`)),
        getConditionCheck: () => '',
        profile: {
            features: {},
            pins: {},
            ...overrides.profile
        },
        isEpaper: false,
        seenSensorIds: new Set(),
        ...overrides
    };
}

describe('template_sensor_bar exports', () => {
    it('exports direct bars with rounded backgrounds, local sensors, and grayscale epaper fallback', () => {
        const context = createDocContext({
            getConditionCheck: () => 'if (id(show_bar)) {',
            profile: {
                features: { sht4x: true },
                pins: { batteryAdc: true }
            },
            isEpaper: true
        });

        exportDoc({
            id: 'bar_1',
            x: 10,
            y: 12,
            width: 180,
            height: 40,
            props: {
                color: 'gray',
                background_color: 'black',
                border_color: 'white',
                border_thickness: 2,
                border_radius: 10,
                show_background: true,
                show_wifi: true,
                show_temperature: true,
                temp_is_local: true,
                temp_unit: '\u00b0F',
                show_humidity: true,
                hum_is_local: true,
                show_battery: true,
                bat_is_local: true
            }
        }, context);

        const output = context.lines.join('\n');
        expect(output).toContain('if (id(show_bar)) {');
        expect(output).toContain('draw_filled_rrect(10, 12, 180, 40, 10, color_off);');
        expect(output).toContain('draw_filled_rrect(12, 14, 176, 36, 8, color_on);');
        expect(output).toContain('color_on');
        expect(output).toContain('id(sht4x_temperature).state * 9.0 / 5.0 + 32.0');
        expect(output).toContain('id(sht4x_humidity).state');
        expect(output).toContain('float lvl = id(battery_level).state;');
        expect(context.addDitherMask).toHaveBeenCalled();
    });

    it('avoids invalid LVGL sensor lambdas when external sources are not configured', () => {
        const result = exportLVGL({
            id: 'bar_missing',
            props: {
                show_wifi: false,
                show_temperature: true,
                show_humidity: true,
                show_battery: true
            }
        }, {
            common: { id: 'bar_missing' },
            convertColor: (value) => `COLOR_${value}`,
            getLVGLFont: () => 'font_ref',
            profile: { features: {} }
        });

        expect(result.obj.widgets[0].obj.widgets[1].label.text).toBe('"--\u00b0C"');
        expect(result.obj.widgets[1].obj.widgets[1].label.text).toBe('"--%%"');
        expect(result.obj.widgets[2].obj.widgets[0].label.text).toBe('"\\U000F0082"');
        expect(result.obj.widgets[2].obj.widgets[1].label.text).toBe('"--%%"');

        const yaml = JSON.stringify(result);
        expect(yaml).not.toContain('id().has_state()');
        expect(yaml).not.toContain('id(battery_level).has_state()');
    });

    it('emits LVGL sensor lambdas with escaped double quotes and string returns', () => {
        const result = exportLVGL({
            id: 'bar_live',
            props: {
                show_wifi: true,
                show_temperature: true,
                temp_entity: 'sensor.room_temp',
                show_humidity: true,
                hum_entity: 'sensor.room_humidity',
                show_battery: true,
                bat_entity: 'sensor.room_battery'
            }
        }, {
            common: { id: 'bar_live' },
            convertColor: (value) => `COLOR_${value}`,
            getLVGLFont: () => 'font_ref',
            profile: { features: {} }
        });

        const wifiText = result.obj.widgets[0].obj.widgets[1].label.text;
        const tempText = result.obj.widgets[1].obj.widgets[1].label.text;
        const humText = result.obj.widgets[2].obj.widgets[1].label.text;
        const batText = result.obj.widgets[3].obj.widgets[1].label.text;

        expect(wifiText).toContain('str_sprintf(\\"%.0fdB\\", id(wifi_signal_dbm).state)');
        expect(tempText).toContain('str_sprintf(\\"%.1f°C\\", id(sensor_room_temp).state)');
        expect(humText).toContain('str_sprintf(\\"%.0f%%\\", id(sensor_room_humidity).state)');
        expect(batText).toContain('str_sprintf(\\"%.0f%%\\", id(sensor_room_battery).state)');

        [wifiText, tempText, humText, batText].forEach((text) => {
            expect(text).not.toContain(".c_str()");
            expect(text).not.toContain("str_sprintf('");
        });
    });

    it('exports numeric sensors and LVGL refresh triggers for mixed local and HA-backed values', () => {
        const lines = [];
        const pendingTriggers = new Map();
        const seenSensorIds = new Set();

        onExportNumericSensors({
            lines,
            widgets: [
                {
                    id: 'bar_trigger',
                    type: 'template_sensor_bar',
                    props: {
                        show_wifi: true,
                        show_temperature: true,
                        temp_is_local: true,
                        temp_entity: 'board_temp',
                        show_humidity: true,
                        hum_entity: 'remote_humidity',
                        show_battery: true,
                        bat_entity: 'sensor.house_battery'
                    }
                }
            ],
            isLvgl: true,
            pendingTriggers,
            seenSensorIds,
            profile: { features: {} },
            mainLines: []
        });

        const output = lines.join('\n');
        expect(output).toContain('- platform: wifi_signal');
        expect(output).toContain('id: wifi_signal_dbm');
        expect(output).toContain('- platform: internal_temperature');
        expect(output).toContain('id: board_temp');
        expect(output).toContain('entity_id: sensor.remote_humidity');
        expect(output).toContain('entity_id: sensor.house_battery');
        expect(pendingTriggers.get('sensor.remote_humidity')).toEqual(new Set(['- lvgl.widget.refresh: bar_trigger']));
        expect(pendingTriggers.get('sensor.house_battery')).toEqual(new Set(['- lvgl.widget.refresh: bar_trigger']));
    });

    it('collects fonts and all required sensor icons', () => {
        const trackIcon = vi.fn();
        const addFont = vi.fn();

        collectRequirements({
            props: {
                icon_size: 22,
                font_size: 16
            }
        }, { trackIcon, addFont });

        expect(addFont).toHaveBeenCalledWith('Material Design Icons', 400, 22);
        expect(addFont).toHaveBeenCalledWith('Roboto', 400, 16);
        expect(trackIcon).toHaveBeenCalledWith('F092B', 22);
        expect(trackIcon).toHaveBeenCalledWith('F050F', 22);
        expect(trackIcon).toHaveBeenCalledWith('F058E', 22);
        expect(trackIcon).toHaveBeenCalledWith('F0083', 22);
    });
});
