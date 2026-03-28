import { describe, expect, it } from 'vitest';

import lvglObjPlugin from '../../features/lvgl_obj/plugin.js';
import { registry } from '../../js/core/plugin_registry';
import { serializeWidget, serializeYamlObject } from '../../js/io/yaml_export_lvgl_serialization.js';

describe('yaml_export_lvgl_serialization details', () => {
    it('serializes nested YAML objects, quoting special strings and preserving lambdas', () => {
        const lines = [];

        serializeYamlObject({
            type: 'label',
            id: 'widget_1',
            text: 'hello: world',
            options: ['AUTO', '!secret token_name'],
            action: '!lambda |-\n  return id(sensor_value).state;',
            nested: {
                mode: 'OFF',
                items: [{ text: 'A' }, { text: 'B' }]
            }
        }, lines, 2);

        const output = lines.join('\n');
        expect(output).toContain('  id: widget_1');
        expect(output).toContain('  type: label');
        expect(output).toContain('  text: "hello: world"');
        expect(output).toContain('    - "AUTO"');
        expect(output).toContain('    - !secret token_name');
        expect(output).toContain('  action: !lambda |-');
        expect(output).toContain('    return id(sensor_value).state;');
        expect(output).toContain('    mode: "OFF"');
    });

    it('serializes widgets without re-emitting unchanged defaults', () => {
        registry.register(lvglObjPlugin);

        const serialized = serializeWidget({
            id: 'obj_serialized',
            type: 'lvgl_obj',
            x: 10,
            y: 20,
            width: 30,
            height: 40,
            entity_id: 'sensor.demo',
            props: {
                ...lvglObjPlugin.defaults,
                radius: 6,
                border_width: 2,
                style_meta: { shadow: true },
                hidden: false,
                opa: 255
            }
        });

        expect(serialized).toContain('// widget:lvgl_obj');
        expect(serialized).toContain('id:obj_serialized');
        expect(serialized).toContain('entity:sensor.demo');
        expect(serialized).toContain('radius:6');
        expect(serialized).toContain('border_width:2');
        expect(serialized).toContain('style_meta:{"shadow":true}');
        expect(serialized).not.toContain('hidden:false');
        expect(serialized).not.toContain('opa:255');
    });
});
