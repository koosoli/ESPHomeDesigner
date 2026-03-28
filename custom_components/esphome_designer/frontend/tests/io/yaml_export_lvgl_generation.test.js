// @vitest-environment jsdom
import { describe, expect, it } from 'vitest';

import lvglObjPlugin from '../../features/lvgl_obj/plugin.js';
import { registry } from '../../js/core/plugin_registry';
import { generateLVGLSnippet } from '../../js/io/yaml_export_lvgl.js';

describe('yaml_export_lvgl generation details', () => {
    it('emits touchscreens, dim-on-idle hooks, and comment markers for visible widgets', () => {
        registry.register(lvglObjPlugin);

        const lines = generateLVGLSnippet(
            [{
                id: 'page_0',
                widgets: [
                    {
                        id: 'obj_visible',
                        type: 'lvgl_obj',
                        x: 10,
                        y: 20,
                        width: 30,
                        height: 40,
                        props: {
                            ...lvglObjPlugin.defaults,
                            border_width: 2
                        }
                    },
                    {
                        id: 'obj_hidden',
                        type: 'lvgl_obj',
                        hidden: true,
                        x: 0,
                        y: 0,
                        width: 10,
                        height: 10,
                        props: {
                            ...lvglObjPlugin.defaults
                        }
                    },
                    {
                        id: 'group_1',
                        type: 'group',
                        x: 0,
                        y: 0,
                        width: 10,
                        height: 10,
                        props: {}
                    }
                ]
            }],
            'test_device',
            { features: { lcd: true }, touch: true },
            { darkMode: true, lcdEcoStrategy: 'dim_after_timeout', dimTimeout: 12 }
        );

        const output = lines.join('\n');
        expect(output).toContain('bg_color: "0x000000"');
        expect(output).toContain('touchscreens:');
        expect(output).toContain('timeout: 12s');
        expect(output).toContain('# widget:lvgl_obj id:obj_visible');
        expect(output).toContain('border_width: 2');
        expect(output).not.toContain('obj_hidden');
        expect(output).not.toContain('group_1');
    });

    it('falls back to epaper display ids and emits empty page arrays', () => {
        const lines = generateLVGLSnippet(
            [
                { id: 'page_0', widgets: [] },
                {
                    id: 'page_1',
                    widgets: [
                        {
                            id: 'obj_1',
                            type: 'group',
                            props: {}
                        }
                    ]
                }
            ],
            'test_device',
            { features: { lcd: false } },
            {}
        );

        const output = lines.join('\n');
        expect(output).toContain('- epaper_display');
        expect(output.match(/ {8}\[\]/g) || []).toHaveLength(2);
    });
});
