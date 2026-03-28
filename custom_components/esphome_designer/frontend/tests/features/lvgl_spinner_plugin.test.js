import { describe, expect, it } from 'vitest';

import plugin from '../../features/lvgl_spinner/plugin.js';

describe('lvgl spinner plugin', () => {
    it('renders SVG spinner previews and falls back when arc length is invalid', () => {
        const host = document.createElement('div');

        plugin.render(host, {
            id: 'spinner_1',
            type: 'lvgl_spinner',
            width: 50,
            height: 40,
            props: {
                arc_length: 'not-a-number',
                arc_color: 'red',
                track_color: 'gray'
            }
        }, {
            getColorStyle: (value) => `css-${value}`
        });

        const svg = host.querySelector('svg');
        const track = host.querySelector('circle');
        const arc = host.querySelector('path');

        expect(svg?.getAttribute('width')).toBe('40');
        expect(track?.getAttribute('stroke')).toBe('css-gray');
        expect(arc?.getAttribute('stroke')).toBe('css-red');
        expect(arc?.getAttribute('d')).toContain('A 14 14');
    });

    it('exports spinner timing aliases and converted track colors', () => {
        const exported = plugin.exportLVGL({
            id: 'spinner_1',
            type: 'lvgl_spinner',
            props: {
                time: 2500,
                arc_length: 90,
                arc_color: 'yellow',
                track_color: 'black'
            }
        }, {
            common: { id: 'spinner_1', width: 40, height: 40 },
            convertColor: (value) => `0x${String(value).toUpperCase()}`
        });

        expect(exported.spinner.arc_length).toBe(90);
        expect(exported.spinner.spin_time).toBe('2500ms');
        expect(exported.spinner.indicator.arc_color).toBe('0xYELLOW');
        expect(exported.spinner.main.arc_color).toBe('0xBLACK');
    });
});
