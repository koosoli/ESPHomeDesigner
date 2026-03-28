import { describe, expect, it } from 'vitest';

import plugin from '../../features/odp_ellipse/plugin.js';

describe('odp_ellipse plugin', () => {
    it('renders an ellipse preview with fill and outline styles', () => {
        const el = document.createElement('div');

        plugin.render(el, {
            props: {
                fill: '#112233',
                outline: '#445566',
                border_width: 3
            }
        }, {
            getColorStyle: (value) => value
        });

        expect(el.style.backgroundColor).toBe('rgb(17, 34, 51)');
        expect(el.style.border).toContain('3px solid');
        expect(el.style.borderRadius).toBe('50%');
        expect(el.style.boxSizing).toBe('border-box');
    });

    it('exports OpenDisplay ellipses with theme-aware fill and non-transparent outlines', () => {
        const result = plugin.exportOpenDisplay({
            x: 12,
            y: 18,
            width: 45,
            height: 20,
            props: {
                fill: 'theme_auto',
                outline: 'transparent',
                border_width: 2
            }
        }, {
            layout: { darkMode: true },
            _page: {}
        });

        expect(result).toEqual({
            type: 'ellipse',
            visible: true,
            x_start: 12,
            y_start: 18,
            x_end: 57,
            y_end: 38,
            fill: 'white',
            outline: 'black',
            width: 2
        });
    });

    it('exports OEPL ellipses with null fill for transparent shapes', () => {
        const result = plugin.exportOEPL({
            x: 4,
            y: 6,
            width: 10,
            height: 12,
            props: {
                fill: 'transparent'
            }
        }, {
            _layout: {},
            _page: {}
        });

        expect(result).toMatchObject({
            type: 'ellipse',
            fill: null,
            outline: 'black',
            width: 1
        });
    });
});
