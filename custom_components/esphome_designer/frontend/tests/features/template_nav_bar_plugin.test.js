import { describe, expect, it } from 'vitest';

import navBarPlugin from '../../features/template_nav_bar/plugin.js';
import { registry } from '../../js/core/plugin_registry.js';
import { stripDefaults } from '../../js/io/yaml_export_lvgl.js';

describe('template navigation bar', () => {
    it('keeps white icon text explicit and sends home to the first page', () => {
        registry.register(navBarPlugin);

        const result = navBarPlugin.exportLVGL({
            id: 'nav_bar',
            _pageCount: 2,
            props: { ...navBarPlugin.defaults }
        }, {
            common: { id: 'nav_bar', x: 0, y: 440, width: 800, height: 40 },
            convertColor: (value) => value === 'white' ? '"0xFFFFFF"' : '"0x000000"',
            getLVGLFont: () => 'font_material_design_icons_400_24'
        });

        const output = stripDefaults(result.obj, navBarPlugin.id);
        const buttons = output.widgets.map((entry) => entry.button);

        buttons.forEach((button) => {
            expect(button.widgets[0].label.text_color).toBe('"0xFFFFFF"');
        });
        expect(buttons[1].on_click).toEqual([
            { 'script.execute': { id: 'change_page_to', target_page: 0 } }
        ]);
    });

    it('keeps the direct-render home action as run-and-sleep for a single page', () => {
        const lines = [];

        navBarPlugin.onExportBinarySensors({
            lines,
            widgets: [{
                id: 'nav_bar',
                type: 'template_nav_bar',
                x: 0,
                y: 0,
                width: 180,
                height: 40,
                props: { ...navBarPlugin.defaults }
            }],
            profile: { touch: { platform: 'xpt2046' } }
        });

        const output = lines.join('\n');
        expect(output).toContain('id: nav_home_nav_bar');
        expect(output).toContain('- script.execute: manage_run_and_sleep');
        expect(output).not.toContain('id: change_page_to');
    });
});
