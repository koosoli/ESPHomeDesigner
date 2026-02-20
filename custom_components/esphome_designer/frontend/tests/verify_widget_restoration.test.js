import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ESPHomeAdapter } from '../js/io/adapters/esphome_adapter.js';

describe('Widget Restoration Verification', () => {
    let adapter;

    beforeEach(() => {
        adapter = new ESPHomeAdapter();

        // Mock global window and Utils
        global.window = global;
        window.Utils = {
            getColorConst: (c) => `COLOR_${(c || "black").toUpperCase()}`,
            getIconCode: (name) => name === 'test' ? 'F0000' : 'F0599',
            getAlignX: (a, x, w) => x,
            getAlignY: (a, y, h) => y,
            sanitize: (s) => s
        };
        window.iconPickerData = [
            { name: 'test', code: 'F0000' }
        ];

        // Register mock profiles
        window.DEVICE_PROFILES = {
            'test_epaper': {
                name: 'Test E-Paper',
                features: { epaper: true },
                width: 800, height: 480
            },
            'test_lcd': {
                name: 'Test LCD',
                features: { lcd: true },
                width: 320, height: 240
            }
        };
    });

    it('should generate valid YAML for weather_icon', async () => {
        const payload = {
            pages: [{
                widgets: [{
                    id: 'w1',
                    type: 'weather_icon',
                    x: 10, y: 10, width: 40, height: 40,
                    entity_id: 'weather.home',
                    props: { size: 40, color: 'black' }
                }]
            }],
            profile: { name: 'Test Device', features: { epaper: true } }
        };

        const yaml = await adapter.generate(payload);

        // Check lambda content
        expect(yaml).toContain('std::string raw_state = id(weather_home_txt).state;');
        expect(yaml).toContain('weather_state += tolower(c);');

        // Check text_sensor section
        expect(yaml).toContain('text_sensor:');
        expect(yaml).toContain('platform: homeassistant');
        expect(yaml).toContain('entity_id: weather.home');
        expect(yaml).toContain('id: weather_home_txt');
    });

    it('should generate valid YAML for quote_rss', async () => {
        const payload = {
            pages: [{
                widgets: [{
                    id: 'q1',
                    type: 'quote_rss',
                    x: 0, y: 0, width: 400, height: 100,
                    props: {
                        feed_url: 'http://example.com/rss',
                        refresh_interval: '2h'
                    }
                }]
            }],
            profile: { name: 'Test Device', features: { lcd: true } }
        };

        const yaml = await adapter.generate(payload);

        // Check globals
        expect(yaml).toContain('globals:');
        expect(yaml).toContain('id: quote_q1_text_global');

        // Check interval
        expect(yaml).toContain('interval:');
        expect(yaml).toContain('interval: 2h');
        expect(yaml).toContain('http_request.get:');
        expect(yaml).toContain('url: "http://homeassistant.local:8123/api/esphome_designer/rss_proxy');
        expect(yaml).toContain('&random=true"');

        // Check lambda
        expect(yaml).toContain('std::string q_text = id(quote_q1_text_global);');
        expect(yaml).toContain('auto print_q =');
    });

    it('should generate valid YAML for touch_area', async () => {
        const payload = {
            pages: [{
                widgets: [{
                    id: 't1',
                    type: 'touch_area',
                    x: 50, y: 50, width: 100, height: 100,
                    entity_id: 'light.test',
                    props: { icon: 'mdi:test' }
                }]
            }],
            profile: { name: 'Test Device', touch: true }
        };

        const yaml = await adapter.generate(payload);

        // Check binary_sensor
        expect(yaml).toContain('binary_sensor:');
        expect(yaml).toContain('platform: touchscreen');
        expect(yaml).toContain('x_min: 50');
        expect(yaml).toContain('x_max: 150');
        expect(yaml).toContain('entity_id: light.test');

        // Check lambda
        expect(yaml).toContain('it.printf(50 + 100/2, 50 + 100/2, id(font_material_design_icons_400_40),');
    });

    it('should generate valid YAML for image with deduplication', async () => {
        const payload = {
            pages: [{
                widgets: [
                    {
                        id: 'img1',
                        type: 'image',
                        x: 0, y: 0, width: 100, height: 100,
                        props: { path: 'test.png' }
                    },
                    {
                        id: 'img2',
                        type: 'image',
                        x: 110, y: 0, width: 100, height: 100,
                        props: { path: 'test.png' }
                    }
                ]
            }],
            profile: { name: 'Test Device', features: { epaper: true } }
        };

        const yaml = await adapter.generate(payload);

        // Count occurrences in lambda
        const drawOccurrences = (yaml.match(/it\.image\(/g) || []).length;
        expect(drawOccurrences).toBe(2);

        // Count occurrences in image: section (should be 1 due to deduplication of same path/size)
        const componentOccurrences = (yaml.match(/- file: "test.png"/g) || []).length;
        expect(componentOccurrences).toBe(1);

        expect(yaml).toContain('id: img_test_png_100x100');
    });

    it('should generate valid YAML for online_image (puppet)', async () => {
        const payload = {
            isSelectionSnippet: true,
            pages: [{
                widgets: [{
                    id: 'p1',
                    type: 'online_image',
                    x: 0, y: 0, width: 200, height: 200,
                    props: { url: 'http://example.com/img.jpg' }
                }]
            }],
            deviceModel: 'test_lcd'
        };

        const yaml = await adapter.generate(payload);

        expect(yaml).toContain('online_image:');
        expect(yaml).toContain('url: "http://example.com/img.jpg"');
        expect(yaml).toContain('type: RGB565');
        expect(yaml).toContain('resize: 200x200');
        expect(yaml).toContain('it.image(0, 0, id(online_img_p1));');
    });
});
