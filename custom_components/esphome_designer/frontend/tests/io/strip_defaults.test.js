// @vitest-environment jsdom
import { beforeAll, describe, expect, it } from 'vitest';

import lvglButtonPlugin from '../../features/lvgl_button/plugin.js';
import lvglLabelPlugin from '../../features/lvgl_label/plugin.js';
import lvglObjPlugin from '../../features/lvgl_obj/plugin.js';
import { registry } from '../../js/core/plugin_registry';
import { stripDefaults } from '../../js/io/yaml_export_lvgl.js';

describe('stripDefaults', () => {
    beforeAll(() => {
        registry.register(lvglButtonPlugin);
        registry.register(lvglLabelPlugin);
        registry.register(lvglObjPlugin);
    });

    it('strips all defaults from a generic button', () => {
        // Mocked output from exportLVGL for a default button
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
                    label: {
                        align: 'center',
                        text: '"Button"',
                        text_font: 'font_roboto_400_14',
                        text_color: '"0x000000"'
                    }
                }
            ]
        };

        const result = stripDefaults(rawOutput, 'lvgl_button');

        // NEVER_STRIP fields must remain
        expect(result.id).toBe('btn_1');
        expect(result.widgets).toBeDefined();

        // Default fields should be gone
        expect(result.bg_color).toBeUndefined();
        expect(result.border_width).toBeUndefined();
        expect(result.border_color).toBeUndefined();
        expect(result.radius).toBeUndefined();
        expect(result.opa).toBeUndefined();
        expect(result.bg_opa).toBeUndefined();
    });

    it('retains customizations on a button', () => {
        const rawOutput = {
            id: 'btn_1',
            bg_color: '"0xFF0000"', // Custom red
            border_width: 5, // Custom width
            radius: 5, // Default radius
            opa: 'cover', // Default opa
        };

        const result = stripDefaults(rawOutput, 'lvgl_button');

        // Overrides kept
        expect(result.bg_color).toBe('"0xFF0000"');
        expect(result.border_width).toBe(5);

        // Defaults gone
        expect(result.radius).toBeUndefined();
        expect(result.opa).toBeUndefined();
    });

    it('retains NEVER_STRIP fields even if they match defaults', () => {
        const rawOutput = {
            id: 'lbl_1',
            text: '"Label"', // Matches default, but is in NEVER_STRIP
            text_font: 'font_roboto_400_20', // NEVER_STRIP
            text_color: '"0xFFFFFF"', // Theme default
        };

        const result = stripDefaults(rawOutput, 'lvgl_label');

        expect(result.text).toBe('"Label"');
        expect(result.text_font).toBe('font_roboto_400_20');
        expect(result.text_color).toBeUndefined();
    });

    it('returns object untouched if plugin not found', () => {
        const result = stripDefaults({ foo: 'bar' }, 'unknown_widget');
        expect(result.foo).toBe('bar');
    });

    it('translates 0/255 opacity to transp/cover correctly', () => {
        const result = stripDefaults({
            id: 'obj_1',
            bg_opa: 'transp',
            opa: 'cover'
        }, 'lvgl_obj');

        expect(result.bg_opa).toBe('transp'); // default is cover (fill:true)
        expect(result.opa).toBeUndefined();  // default is 255 -> cover
    });

    it('recursively strips defaults from nested widgets', () => {
        const rawOutput = {
            id: 'btn_1',
            widgets: [
                {
                    lvgl_label: {
                        id: 'lbl_1',
                        text: '"Default"',
                        text_font: 'font_roboto_400_14', // NEVER_STRIP
                        text_color: '"0x000000"', // Matches theme_auto default for light mode
                        align: 'center', // Default align for some reason? Wait, label has no align default, so it's kept.
                        hidden: false // LVGL generic default
                    }
                }
            ]
        };

        const result = stripDefaults(rawOutput, 'lvgl_button');

        // Check child label
        const childLabel = result.widgets[0].lvgl_label;
        expect(childLabel.id).toBe('lbl_1');
        expect(childLabel.text).toBe('"Default"');
        expect(childLabel.text_font).toBe('font_roboto_400_14');
        expect(childLabel.align).toBe('center');

        // Defaults stripped from child!
        expect(childLabel.text_color).toBeUndefined();
        expect(childLabel.hidden).toBeUndefined();
    });

    it('falls back to generic opacity correctly when fill is undefined', () => {
        // Mock a hypothetical plugin without fill default
        registry.register({ id: 'dummy_plugin', defaults: { color: "white" } });

        const result = stripDefaults({
            id: 'dummy_1',
            bg_opa: 255, // Should strip because generic fallback is 255
            border_color: '"0xFFFFFF"' // Theme converted from "white" -> color alias fallback
        }, 'dummy_plugin');

        expect(result.bg_opa).toBeUndefined();
        expect(result.border_color).toBeUndefined();
    });
});
