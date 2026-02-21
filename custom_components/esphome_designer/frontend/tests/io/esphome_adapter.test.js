import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ESPHomeAdapter } from '../../js/io/adapters/esphome_adapter.js';
import { getCondProps } from '../../js/io/generators/native_generator.js';
import { mergeYamlSections } from '../../js/io/generators/yaml_merger.js';

const { mockRegistry } = vi.hoisted(() => ({
    mockRegistry: {
        get: vi.fn(),
        getAll: vi.fn(() => []),
        load: vi.fn(async (type) => mockRegistry.get(type)),
        onExportGlobals: vi.fn(),
        onExportNumericSensors: vi.fn(),
        onExportTextSensors: vi.fn(),
        onExportBinarySensors: vi.fn(),
        onExportComponents: vi.fn(),
        onExportHelpers: vi.fn(),
        onExportEsphome: vi.fn()
    }
}));

// Top-level mocks for dependencies
vi.mock('../../js/utils/logger.js', () => ({
    Logger: {
        log: vi.fn(),
        error: vi.fn(),
        warn: vi.fn(),
        info: vi.fn()
    }
}));

vi.mock('../../js/core/plugin_registry.js', () => ({
    registry: mockRegistry
}));

vi.mock('../../js/core/state.js', () => ({
    AppState: {
        deviceModel: 'reterminal_e1001',
        getCanvasDimensions: vi.fn(() => ({ width: 800, height: 480 })),
        getCanvasShape: vi.fn(() => 'rect')
    }
}));

vi.mock('../../js/core/utils.js', () => ({
    Utils: {
        getIconCode: vi.fn((name) => 'F000'),
        getColorConst: vi.fn((c) => `Color(${c})`),
        getAlignX: vi.fn((a, x) => x),
        getAlignY: vi.fn((a, y) => y),
        addDitherMask: vi.fn()
    }
}));

vi.mock('../../js/io/devices.js', () => ({
    DEVICE_PROFILES: {}
}));

vi.mock('../../js/io/hardware_generators.js', () => ({
    generateI2CSection: vi.fn(() => []),
    generateSPISection: vi.fn(() => []),
    generateSensorSection: vi.fn(() => []),
    generateBinarySensorSection: vi.fn(() => []),
    generateButtonSection: vi.fn(() => []),
    generateDisplaySection: vi.fn(() => ["display:"]),
    generateExtraComponents: vi.fn(() => []),
    generateAXP2101Section: vi.fn(() => []),
    generateOutputSection: vi.fn(() => []),
    generateBacklightSection: vi.fn(() => []),
    generateRTTTLSection: vi.fn(() => []),
    generateAudioSection: vi.fn(() => [])
}));

vi.mock('../../js/io/adapters/base_adapter.js', () => ({
    BaseAdapter: class {
        constructor() { }
        async generate() { return ""; }
        generatePage() { return []; }
        generateWidget() { return []; }
        async preProcessWidgets() { return; }
        sanitize(s) { return s; }
    }
}));

vi.mock('../../js/core/constants.js', () => ({
    COLORS: {},
    ALIGNMENT: {}
}));

const mockAppState = {
    deviceModel: 'reterminal_e1001',
    getCanvasDimensions: vi.fn(() => ({ width: 800, height: 480 })),
    getCanvasShape: vi.fn(() => 'rect')
};

import textPlugin from '../../features/text/plugin.js';
import iconPlugin from '../../features/icon/plugin.js';
import touchAreaPlugin from '../../features/touch_area/plugin.js';
import sensorTextPlugin from '../../features/sensor_text/plugin.js';

describe('ESPHomeAdapter', () => {
    let adapter;

    beforeEach(() => {
        adapter = new ESPHomeAdapter();
        global.PluginRegistry = mockRegistry;
        window.PluginRegistry = mockRegistry;

        // Use real plugins for rendering in tests
        mockRegistry.get.mockImplementation((type) => {
            if (type === 'text') return textPlugin;
            if (type === 'icon') return iconPlugin;
            if (type === 'button' || type === 'touch_area') return touchAreaPlugin;
            if (type === 'sensor_text') return sensorTextPlugin;
            return null;
        });

        global.AppState = mockAppState;
        window.AppState = mockAppState;
        window.LVGLExport = {
            generateLVGLSnippet: vi.fn(() => []),
            serializeWidget: vi.fn(() => '')
        };
        window.DEVICE_PROFILES = {
            'reterminal_e1001': {
                name: 'Test Device',
                features: {},
                pins: {},
                battery: {
                    attenuation: '12db',
                    multiplier: 2.0
                }
            }
        };
        window.currentDeviceModel = 'reterminal_e1001';
    });

    it('should be instantiable', () => {
        expect(adapter).toBeDefined();
    });

    // Fix #218: Test that mergeYamlSections correctly merges duplicate sections
    describe('mergeYamlSections', () => {
        it('should merge duplicate sensor sections', () => {
            const baseYaml = `# Hardware Recipe
sensor:
  - platform: adc
    pin: GPIO34
    name: "board_ldr"
    update_interval: 1500ms

display:
  - platform: ili9xxx
    model: ILI9342`;

            const extraYaml = `sensor:
  - platform: homeassistant
    id: sensor_temp
    entity_id: sensor.temperature
    internal: true
  - platform: wifi_signal
    name: "WiFi Signal"
    id: wifi_signal_dbm`;

            const result = mergeYamlSections(baseYaml, extraYaml);

            // Should have only ONE sensor: section
            const sensorMatches = result.match(/^sensor:$/gm);
            expect(sensorMatches).toHaveLength(1);

            // Should contain all sensors
            expect(result).toContain('platform: adc');
            expect(result).toContain('board_ldr');
            expect(result).toContain('platform: homeassistant');
            expect(result).toContain('sensor_temp');
            expect(result).toContain('platform: wifi_signal');
            expect(result).toContain('WiFi Signal');
        });

        it('should handle empty extra yaml', () => {
            const baseYaml = `sensor:
  - platform: adc
    pin: GPIO34`;

            const result = mergeYamlSections(baseYaml, '');
            expect(result).toBe(baseYaml);
        });

        it('should handle empty base yaml', () => {
            const extraYaml = `sensor:
  - platform: homeassistant
    id: test`;

            const result = mergeYamlSections('', extraYaml);
            expect(result).toBe(extraYaml);
        });

        it('should merge multiple different section types', () => {
            const baseYaml = `sensor:
  - platform: adc
    pin: GPIO34
font:
  - file: fonts/test.ttf
    id: font_base`;

            const extraYaml = `sensor:
  - platform: homeassistant
    id: extra_sensor
font:
  - file: fonts/roboto.ttf
    id: font_extra`;

            const result = mergeYamlSections(baseYaml, extraYaml);

            // Should have only ONE of each section
            expect(result.match(/^sensor:$/gm)).toHaveLength(1);
            expect(result.match(/^font:$/gm)).toHaveLength(1);

            // Should contain all entries
            expect(result).toContain('platform: adc');
            expect(result).toContain('platform: homeassistant');
            expect(result).toContain('font_base');
            expect(result).toContain('font_extra');
        });
    });

    it('should generate a basic YAML structure for a page', async () => {
        const projectState = {
            pages: [
                {
                    name: "Main",
                    widgets: [
                        { id: "w1", type: "text", props: { text: "Hello" }, x: 10, y: 10, width: 100, height: 30 }
                    ]
                }
            ],
            deviceName: "Test Device"
        };

        const yaml = await adapter.generate(projectState);
        expect(yaml).toContain('Test Device');
        expect(yaml).toContain('Hello');
        expect(yaml).toContain('id:w1'); // Metadata tag
    });

    it('should handle empty pages correctly', async () => {
        const projectState = {
            pages: [{ name: "Empty", widgets: [] }],
            deviceName: "Empty Device"
        };
        const yaml = await adapter.generate(projectState);
        expect(yaml).toContain('Test Device'); // From profile name
        expect(yaml).toContain('// page:name "Empty"');
    });

    it('should generate correct condition properties for state comparison', () => {
        const widget = {
            condition_entity: 'switch.test',
            condition_operator: '==',
            condition_value: 'on',
            condition_invert: false
        };
        // getCondProps returns a space-separated string, we can split it or check inclusion
        const propsStr = getCondProps(widget);
        expect(propsStr).toContain('cond_ent:"switch.test"');
        expect(propsStr).toContain('cond_op:"=="');
        expect(propsStr).toContain('cond_val:"on"');
        expect(propsStr).toContain('cond_inv:"false"');
        expect(propsStr).not.toContain('cond_ent_2');
    });

    it('should generate correct condition properties for entity comparison', () => {
        const widget = {
            condition_entity: 'sensor.temp',
            condition_operator: '>',
            condition_entity_2: 'sensor.target',
            condition_invert: true
        };
        const propsStr = getCondProps(widget);
        expect(propsStr).toContain('cond_ent:"sensor.temp"');
        expect(propsStr).toContain('cond_op:">"');
        expect(propsStr).toContain('cond_ent_2:"sensor.target"');
        expect(propsStr).toContain('cond_inv:"true"');
        expect(propsStr).not.toContain('cond_val');
    });

    describe('End-to-End Golden Master Snapshots', () => {
        it('generates a full multi-page native layout accurately', async () => {
            const projectState = {
                deviceName: "Native Device",
                deviceModel: "reterminal_e1001",
                pages: [
                    {
                        name: "Home",
                        widgets: [
                            { id: "txt1", type: "text", props: { text: "Dashboard" }, x: 0, y: 0, width: 200, height: 40 },
                            { id: "icon1", type: "icon", props: { icon: "mdi:home" }, x: 10, y: 50, width: 32, height: 32 }
                        ]
                    },
                    {
                        name: "Lights",
                        widgets: [
                            { id: "btn1", type: "button", entity_id: "light.living_room", x: 20, y: 20, width: 100, height: 100 }
                        ]
                    }
                ]
            };

            const yaml = await adapter.generate(projectState);
            expect(yaml).toMatchSnapshot();
        });

        it('handles dense entity deduplication arrays and attributes', async () => {
            const projectState = {
                deviceName: "Dense Dedup Tester",
                deviceModel: "reterminal_e1001",
                pages: [
                    {
                        name: "Sensors",
                        widgets: [
                            { id: "w1", type: "sensor_text", entity_id: "sensor.temperature", x: 0, y: 0, width: 50, height: 20 },
                            { id: "w2", type: "sensor_text", entity_id: "sensor.temperature", props: { attribute: "calibration" }, x: 60, y: 0, width: 50, height: 20 },
                            { id: "w3", type: "text", entity_id: "weather.home", props: { attribute: "temperature" }, x: 0, y: 30, width: 100, height: 30 },
                            { id: "w4", type: "icon", condition_entity: "binary_sensor.door", condition_state: "off", x: 0, y: 70, width: 40, height: 40 },
                            { id: "w5", type: "icon", condition_entity: "sensor.state", condition_state: "Playing", x: 50, y: 70, width: 40, height: 40 },
                            { id: "w6", type: "text", entity_id: "sensor.weather", props: { attribute: "forecast[0].condition" }, x: 0, y: 120, width: 150, height: 30 }
                        ]
                    }
                ]
            };

            // Mock state so entity_dedup recognizes the types
            window.AppState.entityStates = {
                "sensor.temperature": { state: "20", attributes: { calibration: "2" } },
                "weather.home": { state: "sunny", attributes: { temperature: "25" } },
                "sensor.state": { state: "Playing" },
                "sensor.weather": { state: "clear", attributes: { forecast: [{ condition: "cloudy" }] } }
            };

            const yaml = await adapter.generate(projectState);
            expect(yaml).toMatchSnapshot();
        });
    });
});
