import { beforeEach, describe, expect, it } from 'vitest';

import plugin from '../../features/lvgl_dropdown/plugin.js';

describe('lvgl_dropdown plugin', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    it('renders the selected option from string and array inputs', () => {
        const host = document.createElement('div');
        plugin.render(host, {
            id: 'dropdown_render',
            width: 120,
            height: 30,
            props: {
                options: 'First\nSecond',
                selected_index: 1
            }
        }, {
            _getColorStyle: () => '#000'
        });

        expect(host.textContent).toContain('Second');

        const clampedHost = document.createElement('div');
        plugin.render(clampedHost, {
            id: 'dropdown_clamped',
            width: 120,
            height: 30,
            props: {
                options: ['A', 'B'],
                selected_index: 8
            }
        }, {
            _getColorStyle: () => '#000'
        });

        expect(clampedHost.textContent).toContain('B');
    });

    it('exports dropdown options, direction aliases, and numeric refresh hooks', () => {
        const exported = plugin.exportLVGL({
            id: 'dropdown_export',
            entity_id: 'sensor.menu',
            props: {
                options: 'A\n\nB',
                direction: 'UP',
                max_height: 150,
                color: 'navy',
                opa: 200
            }
        }, {
            common: { id: 'base' },
            convertColor: (value) => `Color(${value})`,
            formatOpacity: (value) => `opa(${value})`
        });

        expect(exported.dropdown).toMatchObject({
            id: 'base',
            options: ['A', 'B'],
            dir: 'TOP',
            text_color: 'Color(navy)',
            dropdown_list: { max_height: 150 },
            opa: 'opa(200)'
        });
        expect(exported.dropdown.selected_index).toContain('id(sensor_menu).state');

        const pendingTriggers = new Map();
        plugin.onExportNumericSensors({
            widgets: [
                { id: 'dropdown_export', type: 'lvgl_dropdown', entity_id: 'sensor.menu', props: {} }
            ],
            isLvgl: true,
            pendingTriggers
        });

        expect([...pendingTriggers.get('sensor.menu')]).toEqual(['- lvgl.widget.refresh: dropdown_export']);
    });
});
