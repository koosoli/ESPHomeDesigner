import { describe, it, expect, beforeEach } from 'vitest';
import { ESPHomeAdapter } from '../js/io/adapters/esphome_adapter.js';

// Mock the global AppState that the adapter relies on
beforeEach(() => {
    global.AppState = {
        project: {
            name: 'Test Project',
            device_name: 'test_device',
            pages: [
                {
                    id: 'page_1',
                    name: 'Main Page',
                    bpp: 16,
                    widgets: [
                        {
                            id: 'widget_1',
                            type: 'label',
                            x: 10,
                            y: 20,
                            width: 100,
                            height: 30,
                            text: 'Hello World',
                            font_size: 16,
                            color: '#FF0000',
                            bg_color: '#00FF00',
                            align: 'center'
                        }
                    ]
                }
            ]
        },
        settings: {
            device_model: 'custom',
            resolution: '800x480',
            hardware: {
                chip: 'esp32s3',
                tech: 'lcd',
                resWidth: 800,
                resHeight: 480,
                memory: 'psram'
            }
        },
        secrets: {
            wifi_ssid: 'MyWiFi',
            wifi_password: 'MyPassword'
        }
    };
});

describe('ESPHomeAdapter Configuration Generation', () => {

    it('matches the known good snapshot for a native custom LCD display', async () => {
        const adapter = new ESPHomeAdapter();

        // Ensure LVGL mode is off for this test
        global.AppState.settings.use_lvgl = false;

        const yamlOutput = await adapter.generate(global.AppState.project);

        // Vitest will automatically create and verify against tests/__snapshots__/esphome_adapter.test.js.snap
        expect(yamlOutput).toMatchSnapshot();
    });

    it('matches the known good snapshot for an LVGL configured display', async () => {
        const adapter = new ESPHomeAdapter();

        // Enable LVGL
        global.AppState.settings.use_lvgl = true;

        const yamlOutput = await adapter.generate(global.AppState.project);

        expect(yamlOutput).toMatchSnapshot();
    });

});
