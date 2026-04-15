import { beforeEach, describe, expect, it } from 'vitest';

import plugin from '../../features/lvgl_slider/plugin.js';

describe('lvgl slider plugin', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    it('renders horizontal and vertical slider previews with indicator and knob placement', () => {
        const horizontalHost = document.createElement('div');
        plugin.render(horizontalHost, {
            id: 'slider_h',
            type: 'lvgl_slider',
            width: 100,
            height: 40,
            props: {
                min: 0,
                max: 100,
                value: 25,
                color: 'blue',
                bg_color: 'gray',
                border_width: 3,
                vertical: false
            }
        }, {
            getColorStyle: (value) => `css-${value}`
        });

        const horizontalTrack = horizontalHost.firstElementChild;
        const horizontalIndicator = horizontalTrack?.children[0];
        const horizontalKnob = horizontalTrack?.children[1];

        expect(horizontalTrack?.style.width).toBe('100%');
        expect(horizontalIndicator?.style.width).toBe('25%');
        expect(horizontalKnob?.style.left).toContain('25%');
        expect(horizontalKnob?.style.border).toBe('3px solid white');

        const verticalHost = document.createElement('div');
        plugin.render(verticalHost, {
            id: 'slider_v',
            type: 'lvgl_slider',
            width: 40,
            height: 120,
            props: {
                min: 0,
                max: 200,
                value: 100,
                color: 'red',
                bg_color: 'black',
                vertical: true
            }
        }, {
            getColorStyle: (value) => `css-${value}`
        });

        const verticalTrack = verticalHost.firstElementChild;
        const verticalIndicator = verticalTrack?.children[0];
        const verticalKnob = verticalTrack?.children[1];

        expect(verticalHost.style.flexDirection).toBe('column');
        expect(verticalTrack?.style.height).toBe('100%');
        expect(verticalIndicator?.style.height).toBe('50%');
        expect(verticalKnob?.style.bottom).toContain('50%');
    });

    it('exports domain-specific Home Assistant service hooks and numeric refresh triggers', () => {
        const domains = {
            'fan.ceiling': 'fan.set_percentage',
            'cover.shade': 'cover.set_cover_position',
            'media_player.speaker': 'media_player.volume_set',
            'climate.room': 'climate.set_temperature',
            'number.manual': 'number.set_value'
        };

        for (const [entityId, service] of Object.entries(domains)) {
            const exported = plugin.exportLVGL({
                id: `slider_${entityId.replace('.', '_')}`,
                type: 'lvgl_slider',
                entity_id: entityId,
                props: {
                    min: 10,
                    max: 90,
                    value: 15,
                    color: 'green',
                    bg_color: 'gray',
                    border_width: 4,
                    mode: 'symmetrical'
                }
            }, {
                common: { id: 'base' },
                convertColor: (value) => `0x${String(value).toUpperCase()}`,
                profile: { touch: true }
            });

            expect(exported.slider.value).toContain(`id(${entityId.replace(/[^a-zA-Z0-9_]/g, '_')}).state`);
            expect(exported.slider.min_value).toBe(10);
            expect(exported.slider.max_value).toBe(90);
            expect(exported.slider.indicator.bg_color).toBe('0xGREEN');
            expect(exported.slider.knob.bg_color).toBe('0xGREEN');
            expect(exported.slider.on_value[0]['homeassistant.service'].service).toBe(service);
        }

        const defaultLight = plugin.exportLVGL({
            id: 'slider_light_default',
            type: 'lvgl_slider',
            entity_id: 'light.kitchen',
            props: {
                min: 0,
                max: 100,
                value: 15,
                color: 'green',
                bg_color: 'gray',
                border_width: 4,
                mode: 'symmetrical'
            }
        }, {
            common: { id: 'base' },
            convertColor: (value) => `0x${String(value).toUpperCase()}`,
            profile: { touch: true }
        });

        expect(defaultLight.slider.value).toContain('id(light_kitchen_brightness_pct).has_state() ? id(light_kitchen_brightness_pct).state : 0');
        expect(defaultLight.slider.on_value[0]['if'].condition.lambda).toBe('return x <= 0;');
        expect(defaultLight.slider.on_value[0]['if'].then[0]['homeassistant.service'].service).toBe('light.turn_off');
        expect(defaultLight.slider.on_value[0]['if'].else[0]['homeassistant.service'].service).toBe('light.turn_on');
        expect(defaultLight.slider.on_value[0]['if'].else[0]['homeassistant.service'].data.brightness_pct).toBe("!lambda 'return x;'");

        const scaledLight = plugin.exportLVGL({
            id: 'slider_light_scaled',
            type: 'lvgl_slider',
            entity_id: 'light.kitchen',
            props: {
                min: 0,
                max: 255,
                value: 15,
                color: 'green',
                bg_color: 'gray',
                border_width: 4,
                mode: 'symmetrical'
            }
        }, {
            common: { id: 'base' },
            convertColor: (value) => `0x${String(value).toUpperCase()}`,
            profile: { touch: true }
        });

        expect(scaledLight.slider.value).toContain('brightness_pct = id(light_kitchen_brightness_pct).state;');
        expect(scaledLight.slider.value).toContain('return (int)(slider_min + ((brightness_pct / 100.0f) * (slider_max - slider_min)));');
        expect(scaledLight.slider.on_value[0]['if'].else[0]['homeassistant.service'].data.brightness_pct).toContain('return (int)(((clamped - slider_min) * 100.0f) / (slider_max - slider_min));');

        const pendingTriggers = new Map();
        const lines = [];
        const seenEntityIds = new Set();
        const seenSensorIds = new Set();
        plugin.onExportNumericSensors({
            widgets: [
                { id: 'slider_light', type: 'lvgl_slider', entity_id: 'light.kitchen', props: { min: 0, max: 255 } },
                { id: 'slider_light_default', type: 'lvgl_slider', entity_id: 'light.desk', props: { min: 0, max: 100 } },
                { id: 'slider_1', type: 'lvgl_slider', entity_id: ' number.manual ' },
                { id: 'ignore', type: 'lvgl_arc', entity_id: 'sensor.ignored' }
            ],
            isLvgl: true,
            pendingTriggers,
            lines,
            seenEntityIds,
            seenSensorIds
        });

        expect(lines).toEqual([
            '- platform: homeassistant',
            '  id: light_kitchen_brightness_pct',
            '  entity_id: light.kitchen',
            '  attribute: brightness_pct',
            '  internal: true',
            '- platform: homeassistant',
            '  id: light_desk_brightness_pct',
            '  entity_id: light.desk',
            '  attribute: brightness_pct',
            '  internal: true'
        ]);
        expect([...pendingTriggers.get('light_kitchen_brightness_pct')]).toEqual([
            `- lvgl.slider.update:
    id: slider_light
    value: !lambda |-
      if (isnan(x)) return 0;
      const float slider_min = 0;
      const float slider_max = 255;
      if (slider_max <= slider_min) return x;
      return (int)(slider_min + ((x / 100.0f) * (slider_max - slider_min)));`
        ]);
        expect([...pendingTriggers.get('light_desk_brightness_pct')]).toEqual([
            `- lvgl.slider.update:
    id: slider_light_default
    value: !lambda |-
      return isnan(x) ? 0 : x;`
        ]);
        expect(pendingTriggers.has('light.kitchen')).toBe(false);
        expect([...pendingTriggers.get('number.manual')]).toEqual(['- lvgl.widget.refresh: slider_1']);
    });
});
