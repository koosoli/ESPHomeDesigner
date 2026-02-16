import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ESPHomeAdapter } from '../js/io/adapters/esphome_adapter.js';

const mockRegistry = {
    get: vi.fn((type) => {
        if (type === 'icon') {
            return {
                id: 'icon',
                export: (w, ctx) => {
                    const cond = ctx.getConditionCheck(w);
                    if (cond) ctx.lines.push(`        ${cond}`);
                    ctx.lines.push(`        // icon drawing logic for ${w.id}`);
                    if (cond) ctx.lines.push(`        }`);
                }
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
};

vi.mock('../js/utils/logger.js', () => ({
    Logger: { log: vi.fn(), error: vi.fn(), warn: vi.fn(), info: vi.fn() }
}));

vi.mock('../js/core/plugin_registry.js', () => ({
    registry: mockRegistry
}));

vi.mock('../js/core/state.js', () => ({
    AppState: {
        deviceModel: 'reterminal_e1001',
        getCanvasDimensions: vi.fn(() => ({ width: 800, height: 480 })),
        getCanvasShape: vi.fn(() => 'rect')
    }
}));

vi.mock('../js/core/utils.js', () => ({
    Utils: {
        getIconCode: vi.fn((name) => 'F000'),
        getColorConst: vi.fn((c) => `Color(${c})`),
        getAlignX: vi.fn((a, x) => x),
        getAlignY: vi.fn((a, y) => y),
        addDitherMask: vi.fn(),
        generateInstructionHeader: vi.fn(() => []),
        generateSystemSections: vi.fn(() => [])
    }
}));

vi.mock('../js/io/devices.js', () => ({
    DEVICE_PROFILES: {
        'reterminal_e1001': {
            name: 'Test Device',
            features: { lcd: true },
            pins: {}
        }
    }
}));

vi.mock('../js/io/hardware_generators.js', () => ({
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

// Mock BaseAdapter to avoid it trying to load things we haven't mocked
vi.mock('../js/io/adapters/base_adapter.js', () => ({
    BaseAdapter: class {
        constructor() { }
        async generate() { return ""; }
        sanitize(s) { return s; }
        // We need to keep some methods if they are used by ESPHomeAdapter but not overridden
        // But ESPHomeAdapter overrides generate.
    }
}));

describe('Issue #298 Reproduction', () => {
    let adapter;

    beforeEach(() => {
        // Reset window/global state
        global.PluginRegistry = mockRegistry;
        window.PluginRegistry = mockRegistry;
        window.DEVICE_PROFILES = {
            'reterminal_e1001': {
                name: 'Test Device',
                features: { lcd: true },
                pins: {}
            }
        };
        window.currentDeviceModel = 'reterminal_e1001';
        window.LVGLExport = {
            generateLVGLSnippet: vi.fn(() => []),
            serializeWidget: vi.fn(() => '')
        };

        adapter = new ESPHomeAdapter();
    });

    it('should generate text_sensor for conditional icon using HA sensor', async () => {
        const projectState = {
            pages: [
                {
                    name: "Main",
                    widgets: [
                        {
                            id: "icon1",
                            type: "icon",
                            condition_entity: "sensor.sensor_warning_icon_weather_epaper",
                            condition_operator: "==",
                            condition_state: "warning"
                        }
                    ]
                }
            ],
            deviceName: "Test Device"
        };

        const yaml = await adapter.generate(projectState);

        // Check if text_sensor section exists
        const hasTextSensorSection = yaml.includes('text_sensor:');
        const hasExpectedEntity = yaml.includes('entity_id: sensor.sensor_warning_icon_weather_epaper');

        // Log the YAML for debugging
        console.log("Generated YAML:\n" + yaml);

        expect(hasTextSensorSection).toBe(true);
        expect(hasExpectedEntity).toBe(true);
    });
});
