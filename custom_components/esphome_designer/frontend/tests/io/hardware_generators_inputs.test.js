import { describe, expect, it } from 'vitest';

import {
    generateBinarySensorSection,
    generateButtonSection
} from '../../js/io/hardware_generators_inputs.js';

describe('hardware_generators_inputs', () => {
    it('generates gpio buttons plus touchscreen handlers for nav bars and touch areas', () => {
        const lines = generateBinarySensorSection({
            name: 'CoreInk',
            features: { buttons: true, lcd: true },
            pins: {
                buttons: {
                    left: 'GPIO1',
                    right: { number: 'GPIO2', inverted: false },
                    refresh: 'GPIO3',
                    home: 'GPIO4'
                }
            },
            touch: { platform: 'gt911' }
        }, 3, 'my_display', [
            {
                id: 'nav_main',
                type: 'template_nav_bar',
                x: 10,
                y: 20,
                width: 90,
                height: 24,
                _pageIndex: 1,
                props: {}
            },
            {
                id: 'reload_touch',
                type: 'touch_area',
                x: 110,
                y: 20,
                width: 24,
                height: 24,
                _pageIndex: 1,
                props: {
                    nav_action: 'reload_page'
                }
            },
            {
                id: 'toggle_touch',
                type: 'touch_area',
                entity_id: 'light.kitchen',
                x: 150,
                y: 20,
                width: 20,
                height: 20,
                _pageIndex: 1,
                props: {
                    icon_size: 40
                }
            }
        ]);

        const joined = lines.join('\n');

        expect(joined).toContain('id: button_left');
        expect(joined).toContain('id: button_right');
        expect(joined).toContain('id: button_enter');
        expect(joined).toContain('id: button_home');
        expect(joined).toContain('id: nav_prev_nav_main');
        expect(joined).toContain('id: nav_home_nav_main');
        expect(joined).toContain('id: nav_next_nav_main');
        expect(joined).toContain("lambda: 'return id(display_page) == 1 && (millis() - id(last_touch_time) > 2000);'");
        expect(joined).toContain('script.execute: manage_run_and_sleep');
        expect(joined).toContain('service: homeassistant.toggle');
        expect(joined).toContain('entity_id: light.kitchen');
    });

    it('adds template page buttons and buzzer helpers when multiple pages exist', () => {
        const lines = generateButtonSection({
            features: { buzzer: true }
        }, 2);

        const joined = lines.join('\n');

        expect(joined).toContain('name: "Next Page"');
        expect(joined).toContain('name: "Previous Page"');
        expect(joined).toContain('name: "Go to Page 2"');
        expect(joined).toContain('name: "Refresh Display"');
        expect(joined).toContain('name: "Play Beep Short"');
        expect(joined).toContain('name: "Play Star Wars"');
        expect(joined).toContain("target_page: !lambda 'return id(display_page) + 1;'");
    });
});
