import { beforeEach, describe, expect, it } from 'vitest';

import plugin from '../../features/lvgl_tabview/plugin.js';

describe('lvgl tabview plugin', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    it('renders CSV and fallback tab labels in the preview header', () => {
        const host = document.createElement('div');
        plugin.render(host, {
            id: 'tab_csv',
            width: 180,
            height: 80,
            props: {
                tabs: 'Home, Status, Settings',
                bg_color: 'white'
            }
        }, {
            getColorStyle: (value) => value
        });

        const header = /** @type {HTMLDivElement} */ (host.firstElementChild);
        expect(header.children).toHaveLength(3);
        expect(header.children[1].textContent).toBe('Status');
        expect(host.style.backgroundColor).toBe('white');

        const fallbackHost = document.createElement('div');
        plugin.render(fallbackHost, {
            id: 'tab_default',
            width: 160,
            height: 70,
            props: {
                tabs: { invalid: true }
            }
        }, {
            getColorStyle: (value) => value
        });
        expect((/** @type {HTMLDivElement} */ (fallbackHost.firstElementChild)).children).toHaveLength(2);
    });

    it('exports LVGL tab metadata with normalized tab sizes', () => {
        const numeric = plugin.exportLVGL({
            id: 'tab_export',
            props: {
                tabs: 'Overview\nStats',
                tab_pos: 'BOTTOM',
                tab_size: 25
            }
        }, {
            common: { id: 'base' }
        });

        expect(numeric.tabview).toEqual({
            id: 'base',
            position: 'BOTTOM',
            size: '25%',
            tabs: [
                { name: 'Overview', widgets: [] },
                { name: 'Stats', widgets: [] }
            ]
        });

        expect(plugin.exportLVGL({
            id: 'tab_px',
            props: {
                tabs: ['A'],
                tab_size: '18px'
            }
        }, {
            common: { id: 'base' }
        }).tabview.size).toBe('18px');
    });
});
