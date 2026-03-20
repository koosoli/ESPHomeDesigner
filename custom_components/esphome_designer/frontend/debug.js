import { registry } from './js/core/plugin_registry.js';
import lvglButtonPlugin from './features/lvgl_button/plugin.js';
import { stripDefaults } from './js/io/yaml_export_lvgl.js';

registry.register(lvglButtonPlugin);

const rawOutput = {
    id: 'btn_1',
    bg_color: '"0xFFFFFF"', // Theme auto inverse light mode -> white
    bg_opa: 'cover',
    border_width: 2,
    border_color: '"0x000000"', // Theme auto light mode -> black mapped from 'color' default
    radius: 5,
    opa: 'cover',
    widgets: [
        {
            lvgl_label: {
                align: 'center',
                text: '"Button"',
                text_font: 'font_roboto_400_14',
                text_color: '"0x000000"'
            }
        }
    ]
};

const result = stripDefaults(rawOutput, 'lvgl_button');
console.log("RESULT:", JSON.stringify(result, null, 2));
