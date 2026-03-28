import { beforeEach, describe, expect, it } from 'vitest';

import plugin from '../../features/lvgl_keyboard/plugin.js';

describe('lvgl_keyboard plugin', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    it('renders a dense keyboard preview grid', () => {
        const host = document.createElement('div');

        plugin.render(host, {
            id: 'keyboard_render',
            width: 200,
            height: 80,
            props: {}
        }, {
            _getColorStyle: () => '#fff'
        });

        expect(host.style.gridTemplateColumns).toBe('repeat(10, 1fr)');
        expect(host.children.length).toBeGreaterThan(20);
        expect(Array.from(host.children).some((child) => child.textContent === '')).toBe(true);
    });

    it('exports keyboard bindings with textarea precedence and opacity formatting', () => {
        const exported = plugin.exportLVGL({
            id: 'keyboard_export',
            textarea_id: 'root_textarea',
            props: {
                textarea_id: 'props_textarea',
                mode: 'NUMBER',
                opa: 150
            }
        }, {
            common: { id: 'base' },
            formatOpacity: (value) => `opa(${value})`
        });

        expect(exported.keyboard).toEqual({
            id: 'base',
            mode: 'NUMBER',
            textarea: 'root_textarea',
            opa: 'opa(150)'
        });
    });
});
