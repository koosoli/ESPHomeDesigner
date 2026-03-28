import { beforeEach, describe, expect, it } from 'vitest';

import plugin from '../../features/lvgl_roller/plugin.js';

describe('lvgl_roller plugin', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    it('renders the visible rows and highlights the selected middle option', () => {
        const host = document.createElement('div');
        plugin.render(host, {
            id: 'roller_render',
            width: 90,
            height: 90,
            props: {
                options: 'A\nB\nC',
                visible_row_count: 3,
                bg_color: 'white',
                selected_bg_color: 'blue',
                color: 'black',
                selected_text_color: 'white'
            }
        }, {
            getColorStyle: (value) => value
        });

        expect(host.children).toHaveLength(3);
        expect(host.children[1].textContent).toBe('B');
        expect(host.children[1].style.fontWeight).toBe('bold');
        expect(host.children[1].style.backgroundColor).toBe('blue');
    });

    it('exports roller metadata and numeric refresh hooks', () => {
        const exported = plugin.exportLVGL({
            id: 'roller_export',
            entity_id: 'sensor.index',
            props: {
                options: ['A', 'B'],
                visible_row_count: 5,
                bg_color: 'white',
                color: 'black',
                selected_bg_color: 'blue',
                selected_text_color: 'yellow',
                mode: 'infinite',
                opa: 180
            }
        }, {
            common: { id: 'base' },
            convertColor: (value) => `Color(${value})`,
            formatOpacity: (value) => `opa(${value})`
        });

        expect(exported.roller).toMatchObject({
            id: 'base',
            options: ['A', 'B'],
            visible_row_count: 5,
            bg_color: 'Color(white)',
            text_color: 'Color(black)',
            selected: {
                bg_color: 'Color(blue)',
                text_color: 'Color(yellow)'
            },
            mode: 'infinite',
            opa: 'opa(180)'
        });
        expect(exported.roller.selected_index).toContain('id(sensor_index).state');

        const pendingTriggers = new Map();
        plugin.onExportNumericSensors({
            widgets: [
                { id: 'roller_export', type: 'lvgl_roller', entity_id: 'sensor.index', props: {} }
            ],
            isLvgl: true,
            pendingTriggers
        });

        expect([...pendingTriggers.get('sensor.index')]).toEqual(['- lvgl.widget.refresh: roller_export']);
    });
});
