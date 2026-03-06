import { describe, expect, it } from 'vitest';

import lvglButtonPlugin from '../../features/lvgl_button/plugin.js';
import lvglChartPlugin from '../../features/lvgl_chart/plugin.js';
import lvglKeyboardPlugin from '../../features/lvgl_keyboard/plugin.js';
import lvglQrcodePlugin from '../../features/lvgl_qrcode/plugin.js';
import lvglSpinnerPlugin from '../../features/lvgl_spinner/plugin.js';
import lvglTextareaPlugin from '../../features/lvgl_textarea/plugin.js';

function getSchemaKeys(plugin) {
    const root = new Set();
    const props = new Set();

    for (const section of plugin.schema || []) {
        for (const field of section.fields || []) {
            if (field.target === 'root') root.add(field.key);
            else props.add(field.key);
        }
    }

    return { root, props };
}

describe('LVGL schema parity', () => {
    it('restores lvgl_button legacy parity fields', () => {
        const keys = getSchemaKeys(lvglButtonPlugin);
        expect(keys.props.has('color')).toBe(true);
        expect(keys.props.has('checkable')).toBe(true);

        const out = lvglButtonPlugin.exportLVGL({
            id: 'btn_1',
            type: 'lvgl_button',
            props: { text: 'Push', color: 'red', bg_color: 'white', checkable: true }
        }, {
            common: { id: 'btn_1', width: 100, height: 40, checkable: true },
            convertColor: (v) => v,
            formatOpacity: (v) => v,
            getLVGLFont: () => 'font_default'
        });

        expect(out.button.border_color).toBe('red');
        expect(out.button.widgets[0].label.text_color).toBe('red');
    });

    it('restores lvgl_chart entity binding field', () => {
        const keys = getSchemaKeys(lvglChartPlugin);
        expect(keys.root.has('entity_id')).toBe(true);
    });

    it('restores lvgl_qrcode size field and uses it in export', () => {
        const keys = getSchemaKeys(lvglQrcodePlugin);
        expect(keys.props.has('size')).toBe(true);

        const out = lvglQrcodePlugin.exportLVGL({
            id: 'qr_1',
            type: 'lvgl_qrcode',
            props: { text: 'abc', size: 144, color: 'black', bg_color: 'white' }
        }, {
            common: { id: 'qr_1', width: 100, height: 100 },
            convertColor: (v) => v
        });

        expect(out.qrcode.size).toBe(144);
    });

    it('restores lvgl_spinner spin_time field and exports it', () => {
        const keys = getSchemaKeys(lvglSpinnerPlugin);
        expect(keys.props.has('spin_time')).toBe(true);

        const out = lvglSpinnerPlugin.exportLVGL({
            id: 'spinner_1',
            type: 'lvgl_spinner',
            props: { spin_time: 1500, arc_length: 45, arc_color: 'blue', track_color: 'gray' }
        }, {
            common: { id: 'spinner_1', width: 40, height: 40 },
            convertColor: (v) => v
        });

        expect(out.spinner.spin_time).toBe('1500ms');
    });

    it('restores lvgl_keyboard textarea link parity and exports textarea', () => {
        const keys = getSchemaKeys(lvglKeyboardPlugin);
        expect(keys.root.has('textarea_id')).toBe(true);

        const out = lvglKeyboardPlugin.exportLVGL({
            id: 'kbd_1',
            type: 'lvgl_keyboard',
            textarea_id: 'textarea_1',
            props: { mode: 'TEXT_UPPER' }
        }, {
            common: { id: 'kbd_1', width: 200, height: 80 },
            formatOpacity: (v) => v
        });

        expect(out.keyboard.textarea).toBe('textarea_1');
    });

    it('supports both textarea placeholder aliases during export', () => {
        const out = lvglTextareaPlugin.exportLVGL({
            id: 'ta_1',
            type: 'lvgl_textarea',
            props: { placeholder_text: 'Type here', text: '' }
        }, {
            getObjectDescriptor: () => ({ type: 'obj', attrs: { id: 'ta_1' } })
        });

        expect(out.attrs.placeholder_text).toBe('Type here');
    });
});
