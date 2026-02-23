import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ESPHomeAdapter } from '../js/io/adapters/esphome_adapter.js';
import { registry } from '../js/core/plugin_registry.js';

describe('Duplicate Time Key Reproduction', () => {
    let adapter;

    beforeEach(() => {
        adapter = new ESPHomeAdapter();

        // Mock window/global objects
        global.window = global;
        window.DEVICE_PROFILES = {
            'reterminal_e1001': {
                name: "Seeedstudio reTerminal E1001",
                chip: "esp32-s3",
                extra_components_raw: "time:\n  - platform: homeassistant\n    id: ha_time",
                features: {
                    buzzer: true,
                    buttons: true,
                    epaper: true
                },
                pins: {
                    buzzer: "GPIO45",
                    buttons: { left: "GPIO5" }
                },
                battery: { attenuation: "12db", multiplier: 2.0 }
            }
        };
        window.currentDeviceModel = 'reterminal_e1001';

        // Mock registry singletons using vi.spyOn
        vi.spyOn(registry, 'get').mockImplementation((type) => {
            if (type === 'graph') {
                return {
                    id: 'graph',
                    onExportComponents: (ctx) => {
                        ctx.lines.push("graph:");
                        ctx.lines.push("  - id: graph_id");
                    }
                };
            }
            return null;
        });

        vi.spyOn(registry, 'getAll').mockImplementation(() => [{
            id: 'graph',
            onExportComponents: (ctx) => {
                ctx.lines.push("graph:");
                ctx.lines.push("  - id: graph_id");
            }
        }]);

        // Mock other hooks to prevent logic issues during test
        vi.spyOn(registry, 'onExportGlobals').mockImplementation(() => { });
        vi.spyOn(registry, 'onExportNumericSensors').mockImplementation(() => { });
        vi.spyOn(registry, 'onExportTextSensors').mockImplementation(() => { });
        vi.spyOn(registry, 'onExportBinarySensors').mockImplementation(() => { });
        vi.spyOn(registry, 'onExportHelpers').mockImplementation(() => { });

        // Mock onExportComponents on registry to trigger the graph plugin's component export
        vi.spyOn(registry, 'onExportComponents').mockImplementation((ctx) => {
            ctx.lines.push("graph:");
            ctx.lines.push("  - id: graph_id");
        });
    });

    it('should NOT produce duplicate time: keys for reterminal_e1001', async () => {
        const projectState = {
            pages: [
                {
                    name: "Page 1",
                    widgets: [
                        { id: "w1", type: "graph", entity_id: "sensor.temp" }
                    ]
                }
            ],
            deviceName: "Reproduction Device"
        };

        const yaml = await adapter.generate(projectState);

        // Count occurrences of "time:"
        const timeOccurrences = (yaml.match(/^time:$/gm) || []).length;

        expect(timeOccurrences).toBe(1);
    });

    it('should produce exactly one time: key for package-based profiles', async () => {
        const packageProfile = {
            id: 'waveshare_esp32_s3_touch_lcd_7',
            isPackageBased: true,
            features: {
                psram: true,
                lcd: true
            }
        };
        window.DEVICE_PROFILES['waveshare_esp32_s3_touch_lcd_7'] = packageProfile;
        window.currentDeviceModel = 'waveshare_esp32_s3_touch_lcd_7';

        const projectState = {
            pages: [
                {
                    name: "Page 1",
                    widgets: [
                        { id: "w1", type: "graph", entity_id: "sensor.temp" }
                    ]
                }
            ],
            deviceName: "Package Device",
            device_model: 'waveshare_esp32_s3_touch_lcd_7'
        };

        const yaml = await adapter.generate(projectState);

        // Count occurrences of "time:"
        const timeOccurrences = (yaml.match(/^time:$/gm) || []).length;

        expect(timeOccurrences).toBe(1);
        expect(yaml).toContain("id: ha_time");
    });
});
