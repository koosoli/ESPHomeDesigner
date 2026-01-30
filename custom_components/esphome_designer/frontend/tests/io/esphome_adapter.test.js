import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ESPHomeAdapter } from '../../js/io/adapters/esphome_adapter.js';

const { mockRegistry } = vi.hoisted(() => ({
    mockRegistry: {
        get: vi.fn((type) => {
            if (type === 'text') {
                return {
                    id: 'text',
                    export: (w, ctx) => ctx.lines.push(`  - type: text\n    content: "${w.content}"\n    # id:${w.id}`)
                };
            }
            return null;
        }),
        getAll: vi.fn(() => []),
        load: vi.fn(async (type) => mockRegistry.get(type)),
        onExportGlobals: vi.fn(),
        onExportNumericSensors: vi.fn(),
        onExportTextSensors: vi.fn(),
        onExportBinarySensors: vi.fn(),
        onExportComponents: vi.fn(),
        onExportHelpers: vi.fn()
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

describe('ESPHomeAdapter', () => {
    let adapter;

    beforeEach(() => {
        adapter = new ESPHomeAdapter();
        global.PluginRegistry = mockRegistry;
        window.PluginRegistry = mockRegistry;
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
            
            const result = adapter.mergeYamlSections(baseYaml, extraYaml);
            
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
            
            const result = adapter.mergeYamlSections(baseYaml, '');
            expect(result).toBe(baseYaml);
        });

        it('should handle empty base yaml', () => {
            const extraYaml = `sensor:
  - platform: homeassistant
    id: test`;
            
            const result = adapter.mergeYamlSections('', extraYaml);
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

            const result = adapter.mergeYamlSections(baseYaml, extraYaml);
            
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
                        { id: "w1", type: "text", content: "Hello" }
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
            condition_state: 'on',
            condition_min: '0',
            condition_max: '100'
        };
        const props = adapter.getCondProps(widget);
        expect(props).toContain('cond_ent:"switch.test"');
        expect(props).toContain('cond_op:"=="');
        expect(props).toContain('cond_state:"on"');
        expect(props).not.toContain('cond_min');
        expect(props).not.toContain('cond_max');
    });

    it('should generate correct condition properties for range comparison', () => {
        const widget = {
            condition_entity: 'sensor.temp',
            condition_operator: 'range',
            condition_state: 'on',
            condition_min: '20',
            condition_max: '30'
        };
        const props = adapter.getCondProps(widget);
        expect(props).toContain('cond_ent:"sensor.temp"');
        expect(props).toContain('cond_op:"range"');
        expect(props).toContain('cond_min:"20"');
        expect(props).toContain('cond_max:"30"');
        expect(props).not.toContain('cond_state');
    });
});
