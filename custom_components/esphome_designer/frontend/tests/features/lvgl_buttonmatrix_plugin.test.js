import { beforeEach, describe, expect, it } from 'vitest';

import plugin from '../../features/lvgl_buttonmatrix/plugin.js';

describe('lvgl_buttonmatrix plugin', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    it('renders mixed row definitions into grid rows', () => {
        const host = document.createElement('div');

        plugin.render(host, {
            id: 'matrix_render',
            width: 120,
            height: 80,
            props: {
                rows: [
                    'OK',
                    { buttons: ['A', 1] }
                ],
                text_color: 'white'
            }
        }, {
            getColorStyle: (value) => `css-${value}`
        });

        expect(host.children).toHaveLength(2);
        expect(host.children[0].textContent).toContain('OK');
        expect(host.children[1].textContent).toContain('A');
        expect(host.children[1].textContent).toContain('1');
    });

    it('exports primitive rows as button dictionaries for LVGL', () => {
        const exported = plugin.exportLVGL({
            id: 'matrix_export',
            props: {
                rows: [
                    'OK',
                    { buttons: ['A', 2, { text: 'C' }] }
                ],
                bg_color: '#111',
                text_color: 'white',
                opa: 120
            }
        }, {
            common: { id: 'base' },
            convertColor: (value) => `Color(${value})`,
            formatOpacity: (value) => `opa(${value})`
        });

        expect(exported.buttonmatrix).toMatchObject({
            id: 'base',
            bg_color: 'Color(#111)',
            text_color: 'Color(white)',
            opa: 'opa(120)'
        });
        expect(exported.buttonmatrix.rows[0].buttons).toEqual([{ text: 'OK' }]);
        expect(exported.buttonmatrix.rows[1].buttons).toEqual([
            { text: 'A' },
            { text: '2' },
            { text: 'C' }
        ]);
    });
});
