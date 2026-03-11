import { describe, expect, it } from 'vitest';

import lvglObjPlugin from '../../features/lvgl_obj/plugin.js';
import { registry } from '../../js/core/plugin_registry';
import { generateLVGLSnippet } from '../../js/io/yaml_export_lvgl.js';

describe('yaml_export_lvgl', () => {
    it('quotes uppercase LVGL enum values like scrollbar_mode', () => {
        registry.register(lvglObjPlugin);

        const lines = generateLVGLSnippet(
            [{
                id: 'page_0',
                widgets: [{
                    id: 'obj_1',
                    type: 'lvgl_obj',
                    x: 10,
                    y: 20,
                    width: 120,
                    height: 60,
                    props: {
                        ...lvglObjPlugin.defaults,
                        scrollbar_mode: 'OFF'
                    }
                }]
            }],
            'test_device',
            { features: { lcd: true } },
            {}
        );

        expect(lines.join('\n')).toContain('scrollbar_mode: "OFF"');
    });
});
