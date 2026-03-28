import { beforeEach, describe, expect, it } from 'vitest';

import plugin from '../../features/lvgl_led/plugin.js';

describe('lvgl_led plugin', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    it('renders circular LED previews with brightness-based opacity', () => {
        const host = document.createElement('div');
        plugin.render(host, {
            id: 'led_render',
            width: 60,
            height: 40,
            props: {
                color: 'green',
                brightness: 128
            }
        }, {
            getColorStyle: (value) => value
        });

        const led = /** @type {HTMLDivElement} */ (host.firstElementChild);
        expect(parseFloat(led.style.opacity)).toBeCloseTo(128 / 255, 4);
        expect(led.style.backgroundColor).toBe('green');
        expect(led.firstElementChild).not.toBeNull();
    });

    it('exports LED brightness values and numeric refresh hooks', () => {
        const staticExport = plugin.exportLVGL({
            id: 'led_static',
            props: {
                color: 'red',
                brightness: 128,
                opa: 220
            }
        }, {
            common: { id: 'base' },
            convertColor: (value) => `Color(${value})`,
            formatOpacity: (value) => `opa(${value})`
        });

        expect(staticExport.led.color).toBe('Color(red)');
        expect(staticExport.led.opa).toBe('opa(220)');
        expect(staticExport.led.brightness).toBeCloseTo(128 / 255, 5);

        const entityExport = plugin.exportLVGL({
            id: 'led_entity',
            entity_id: 'sensor.brightness',
            props: {}
        }, {
            common: { id: 'base' },
            convertColor: (value) => value,
            formatOpacity: (value) => value
        });

        expect(entityExport.led.brightness).toContain('id(sensor_brightness).state / 255.0');

        const pendingTriggers = new Map();
        plugin.onExportNumericSensors({
            widgets: [
                { id: 'led_entity', type: 'lvgl_led', entity_id: 'sensor.brightness', props: {} }
            ],
            isLvgl: true,
            pendingTriggers
        });

        expect([...pendingTriggers.get('sensor.brightness')]).toEqual(['- lvgl.widget.refresh: led_entity']);
    });
});
