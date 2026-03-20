// @vitest-environment jsdom
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

    it('emits grid_cell_* properties instead of x/y/width/height in grid mode', () => {
        registry.register(lvglObjPlugin);

        const lines = generateLVGLSnippet(
            [{
                id: 'page_0',
                layout: '4x4',
                widgets: [{
                    id: 'obj_grid',
                    type: 'lvgl_obj',
                    x: 360,
                    y: 0,
                    width: 120,
                    height: 120,
                    props: {
                        ...lvglObjPlugin.defaults,
                        grid_cell_row_pos: 0,
                        grid_cell_column_pos: 3,
                        grid_cell_row_span: 1,
                        grid_cell_column_span: 1,
                        grid_cell_x_align: 'STRETCH',
                        grid_cell_y_align: 'STRETCH'
                    }
                }]
            }],
            'test_device',
            { features: { lcd: true } },
            {}
        );

        const output = lines.join('\n');
        // Grid properties must be present
        expect(output).toContain('grid_cell_row_pos: 0');
        expect(output).toContain('grid_cell_column_pos: 3');
        expect(output).toContain('grid_cell_row_span: 1');
        expect(output).toContain('grid_cell_x_align: stretch');
        // Absolute positioning must NOT be present
        expect(output).not.toMatch(/\n\s+x: 360/);
        expect(output).not.toMatch(/\n\s+width: 120/);
    });

    it('emits x/y/width/height when page has no grid layout', () => {
        registry.register(lvglObjPlugin);

        const lines = generateLVGLSnippet(
            [{
                id: 'page_0',
                widgets: [{
                    id: 'obj_abs',
                    type: 'lvgl_obj',
                    x: 50,
                    y: 100,
                    width: 200,
                    height: 80,
                    props: {
                        ...lvglObjPlugin.defaults
                    }
                }]
            }],
            'test_device',
            { features: { lcd: true } },
            {}
        );

        const output = lines.join('\n');
        expect(output).toContain('x: 50');
        expect(output).toContain('y: 100');
        expect(output).toContain('width: 200');
        expect(output).toContain('height: 80');
        expect(output).not.toContain('grid_cell_row_pos');
    });
});
