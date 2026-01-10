import { describe, it, expect, vi, beforeAll } from 'vitest';
import fs from 'fs';
import path from 'path';
import { GOLDEN_PAYLOAD } from '../golden_master/golden_payload.js';

// Read the legacy files
// Import Plugins (Side-effects register them)
import '../js/core/plugin_registry.js';
import '../features/icon/icon_plugin.js';
import '../features/graph/graph_plugin.js';
import '../features/image/image_plugin.js';
import '../features/shapes/shapes_plugin.js';
import '../features/battery/battery_icon_plugin.js';
import '../features/progress_bar/progress_bar_plugin.js';
import '../features/wifi_signal/wifi_signal_plugin.js';
import '../features/sensor_text/sensor_text_plugin.js';
import '../features/datetime/datetime_plugin.js';
import '../features/quote_rss/quote_rss_plugin.js';
import '../features/weather_forecast/weather_forecast_plugin.js';
import '../features/label/label_plugin.js';
import '../features/qr_code/qr_code_plugin.js';
import '../features/online_image/online_image_plugin.js';
import '../features/touch_area/touch_area_plugin.js';

const yamlExportPath = path.resolve(__dirname, '../js/io/yaml_export.js');
const yamlExportCode = fs.readFileSync(yamlExportPath, 'utf-8');

const devicesPath = path.resolve(__dirname, '../js/io/devices.js');
const devicesCode = fs.readFileSync(devicesPath, 'utf-8');

const hwGenPath = path.resolve(__dirname, '../js/io/hardware_generators.js');
const hwGenCode = fs.readFileSync(hwGenPath, 'utf-8');

const helpersPath = path.resolve(__dirname, '../js/utils/helpers.js');
const helpersCode = fs.readFileSync(helpersPath, 'utf-8');

const lvglExportPath = path.resolve(__dirname, '../js/io/yaml_export_lvgl.js');
const lvglExportCode = fs.readFileSync(lvglExportPath, 'utf-8');

const utilsPath = path.resolve(__dirname, '../js/core/utils.js');
const utilsCode = fs.readFileSync(utilsPath, 'utf-8');

describe('Golden Master YAML Generation', () => {
    beforeAll(() => {
        // Mock Browser Globals
        window.AppState = {
            getPagesPayload: () => GOLDEN_PAYLOAD,
            getCanvasDimensions: () => ({ width: 800, height: 480 }),
            getCanvasShape: () => "rectangle"
        };

        window.getDeviceModel = () => "reterminal_e1001";

        window.fetch = vi.fn().mockResolvedValue({
            ok: true,
            text: async () => "# Mock Hardware Package",
            json: async () => ({})
        });

        const adapterPath = path.resolve(__dirname, '../js/io/adapters/esphome_adapter.js');
        const adapterCode = fs.readFileSync(adapterPath, 'utf-8');
        const baseAdapterPath = path.resolve(__dirname, '../js/io/adapters/base_adapter.js');
        const baseAdapterCode = fs.readFileSync(baseAdapterPath, 'utf-8');

        // Evaluate dependencies
        try {
            eval(helpersCode);
            eval(devicesCode);
            eval(hwGenCode);
            eval(utilsCode);
            eval(lvglExportCode);
            eval(baseAdapterCode);
            eval(adapterCode);
            eval(yamlExportCode);
        } catch (e) {
            console.error("Error evaluating scripts:", e);
        }
    });

    it('generates consistent YAML output', async () => {
        let generatedYaml = "";
        // Run the generation
        try {
            console.log("Plugins registered:", window.PluginRegistry ? window.PluginRegistry.getAll().map(p => p.id) : "None");
            console.log("Starting YAML generation...");
            generatedYaml = await window.generateSnippetLocally();
            console.log("YAML generation successful. Length:", generatedYaml.length);

            // Verify structure
            expect(generatedYaml).toContain('TARGET DEVICE: Seeedstudio reTerminal E1001');
            expect(generatedYaml).toContain('Golden Master Test'); // Label
            expect(generatedYaml).toContain('sensor.test_temp'); // Sensor

            console.log("GENERATED YAML:\n", generatedYaml);
            expect(generatedYaml).toMatchSnapshot();
        } catch (e) {
            fs.writeFileSync('test_error.log', e.toString() + "\n" + e.stack + "\n\nGenerated YAML:\n" + (generatedYaml || ""));
            console.error("Error during YAML generation:", e);
            throw e;
        }
    });
});
