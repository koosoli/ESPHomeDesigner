import { describe, expect, it } from 'vitest';

import checkboxPlugin from '../../features/lvgl_checkbox/plugin.js';
import switchPlugin from '../../features/lvgl_switch/plugin.js';
import { registry } from '../../js/core/plugin_registry';
import { generateLVGLSnippet } from '../../js/io/yaml_export_lvgl.js';

const lvglContext = {
    common: { id: 'w_test', x: 0, y: 0, width: 100, height: 40 },
    convertColor: (value) => `Color(${value})`,
    formatOpacity: (value) => value
};

describe('LVGL binary state sync export', () => {
    it('exports Home Assistant switch state as a refreshable lambda', () => {
        const output = switchPlugin.exportLVGL({
            id: 'sw_1',
            type: 'lvgl_switch',
            entity_id: 'switch.kitchen_light',
            props: { ...switchPlugin.defaults }
        }, lvglContext);

        expect(output.switch.state.checked).toBe('!lambda return id(switch_kitchen_light).state;');
    });

    it('exports Home Assistant checkbox state as a refreshable lambda', () => {
        const output = checkboxPlugin.exportLVGL({
            id: 'cb_1',
            type: 'lvgl_checkbox',
            entity_id: 'input_boolean.night_mode',
            props: { ...checkboxPlugin.defaults }
        }, lvglContext);

        expect(output.checkbox.state.checked).toBe('!lambda return id(input_boolean_night_mode).state;');
    });

    it('serializes the lambda without quoting it in generated YAML', () => {
        registry.register(switchPlugin);

        const lines = generateLVGLSnippet(
            [{
                id: 'page_0',
                widgets: [{
                    id: 'sw_1',
                    type: 'lvgl_switch',
                    entity_id: 'switch.kitchen_light',
                    x: 10,
                    y: 20,
                    width: 60,
                    height: 30,
                    props: { ...switchPlugin.defaults }
                }]
            }],
            'test_device',
            { features: { lcd: true } },
            {}
        );

        expect(lines.join('\n')).toContain('checked: !lambda return id(switch_kitchen_light).state;');
    });

    it('adds refresh triggers for HA-backed LVGL binary widgets', () => {
        const pendingTriggers = new Map();
        switchPlugin.onExportBinarySensors({
            widgets: [{ id: 'sw_1', type: 'lvgl_switch', entity_id: 'switch.kitchen_light', props: {} }],
            isLvgl: true,
            pendingTriggers
        });
        checkboxPlugin.onExportBinarySensors({
            widgets: [{ id: 'cb_1', type: 'lvgl_checkbox', entity_id: 'input_boolean.night_mode', props: {} }],
            isLvgl: true,
            pendingTriggers
        });

        expect(Array.from(pendingTriggers.get('switch.kitchen_light') || [])).toContain('- lvgl.widget.refresh: sw_1');
        expect(Array.from(pendingTriggers.get('input_boolean.night_mode') || [])).toContain('- lvgl.widget.refresh: cb_1');
    });
});
