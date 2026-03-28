import { describe, expect, it } from 'vitest';

import plugin from '../../features/lvgl_obj/plugin.js';

describe('lvgl_obj plugin', () => {
    it('renders object previews with fill, border, and radius styling', () => {
        const el = document.createElement('div');
        plugin.render(el, {
            id: 'obj_1',
            props: {
                bg_color: 'white',
                border_color: 'black',
                border_width: 3,
                radius: 7
            }
        }, {
            getColorStyle: (value) => value
        });

        expect(el.style.backgroundColor).toBe('white');
        expect(el.style.border).toBe('3px solid black');
        expect(el.style.borderRadius).toBe('7px');
    });

    it('exports LVGL objects with transparent backgrounds when fill is disabled', () => {
        const result = plugin.exportLVGL({
            id: 'obj_2',
            props: {
                bg_color: 'blue',
                color: 'gray',
                border_color: 'black',
                border_width: 2,
                radius: 4,
                fill: false,
                opa: 128
            }
        }, {
            common: { id: 'obj_2' },
            convertColor: (value) => `COLOR_${value}`,
            formatOpacity: (value) => `opa(${value})`
        });

        expect(result.obj.bg_color).toBe('COLOR_blue');
        expect(result.obj.bg_opa).toBe('transp');
        expect(result.obj.border_color).toBe('COLOR_black');
        expect(result.obj.opa).toBe('opa(128)');
    });
});
