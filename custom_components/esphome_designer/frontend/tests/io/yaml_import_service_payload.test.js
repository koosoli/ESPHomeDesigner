import { describe, expect, it, vi } from 'vitest';

vi.mock('../../js/utils/logger.js', () => ({
    Logger: {
        log: vi.fn(),
        warn: vi.fn(),
        error: vi.fn()
    }
}));

import { parseSnippetYamlOffline, recoverDesignerStateTriggers } from '../../js/io/yaml_import.ts';

describe('yaml_import service payload parsing', () => {
    it('recovers ODP payload blocks from malformed outer YAML', () => {
        const yamlText = `service: opendisplay.drawcustom
bad: [oops
payload: |-
    - type: text
      value: "Temp: {{ states('sensor.office_temp') }} F"
      x: 10
      y: 20
      size: 18
    - type: debug_grid
      spacing: 32`;

        const layout = parseSnippetYamlOffline(yamlText);

        expect(layout?.pages[0].widgets[0]).toMatchObject({
            type: 'sensor_text',
            entity_id: 'sensor.office_temp',
            props: {
                prefix: 'Temp: ',
                postfix: ' F',
                hide_unit: true
            }
        });
        expect(layout?.pages[0].widgets[1]).toMatchObject({
            type: 'odp_debug_grid',
            props: {
                spacing: 32
            }
        });
    });

    it('re-parses full service payload strings into widget layouts', () => {
        const yamlText = `service: open_epaper_link.drawcustom
data:
  payload: |-
    - type: circle
      x: 60
      y: 70
      radius: 15
      fill: black`;

        const layout = parseSnippetYamlOffline(yamlText);

        expect(layout?.pages[0].widgets[0]).toMatchObject({
            type: 'shape_circle',
            x: 45,
            y: 55,
            width: 30,
            height: 30
        });
    });

    it('recovers marked state-trigger imports and flags unsupported custom automations', () => {
        const layout = {
            pages: [{
                id: 'page_0',
                name: 'Main',
                widgets: [
                    { id: 'status_label', type: 'lvgl_label', props: {} },
                    { id: 'switch_1', type: 'lvgl_switch', props: {} }
                ]
            }]
        };

        const rawLines = [
            'binary_sensor:',
            '  - platform: homeassistant',
            '    id: binary_sensor_front_door',
            '    entity_id: binary_sensor.front_door',
            '    on_state:',
            '      then:',
            '        # esphome-designer-state-trigger: status_label',
            '        - lvgl.label.update:',
            '            id: status_label',
            '            text: "Door changed"',
            'sensor:',
            '  - platform: homeassistant',
            '    id: sensor_power_usage',
            '    entity_id: sensor.power_usage',
            '    on_value:',
            '      then:',
            '        - script.execute: refresh_power'
        ];

        const recovered = recoverDesignerStateTriggers(layout, rawLines);

        expect(recovered?.pages?.[0]?.widgets?.[0]?.props).toMatchObject({
            state_trigger_entity: 'binary_sensor.front_door',
            state_trigger_mode: 'on_state',
            state_trigger_actions: '- lvgl.label.update:\n    id: status_label\n    text: "Door changed"'
        });
        expect(recovered?.importWarnings).toEqual([
            'Imported visual layout; unsupported custom automations remain raw YAML only.'
        ]);
    });
});
