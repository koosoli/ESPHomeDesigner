import { describe, it, expect, vi, beforeAll } from 'vitest';
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import { GOLDEN_PAYLOAD } from '../golden_master/golden_payload.js';

// Paths
const LEGACY_FRONTEND = path.resolve(__dirname, '../../../../../saftybackup-ofversionbeforethecleanup_/frontend');
const MODERN_FRONTEND = path.resolve(__dirname, '..');

describe('Time Machine: Legacy vs Modern YAML Comparison', () => {
    let legacyYaml = "";
    let modernYaml = "";

    beforeAll(async () => {
        // --- RUN LEGACY (Isolated) ---
        const runLegacy = async () => {
            console.log("[Time Machine] Spawning Legacy JSDOM...");
            const dom = new JSDOM(`<!DOCTYPE html><html><head></head><body></body></html>`, {
                runScripts: "dangerously",
                url: "http://localhost/"
            });
            const { window } = dom;

            // Mock Browser Globals
            window.AppState = {
                getPagesPayload: () => JSON.parse(JSON.stringify(GOLDEN_PAYLOAD)),
                getCanvasDimensions: () => ({ width: 800, height: 480 }),
                getCanvasShape: () => "rectangle"
            };
            window.getDeviceModel = () => "reterminal_e1001";
            window.fetch = vi.fn().mockResolvedValue({
                ok: true,
                text: async () => "# Mock Hardware Package",
                json: async () => ({})
            });
            window.console = console;

            const deps = [
                'js/utils/helpers.js',
                'js/io/devices.js',
                'js/io/hardware_generator.js',
                'js/io/hardware_generators.js',
                'js/io/yaml_export_lvgl.js',
                'js/io/yaml_export.js'
            ];

            for (const dep of deps) {
                const file = path.resolve(LEGACY_FRONTEND, dep);
                if (fs.existsSync(file)) {
                    const code = fs.readFileSync(file, 'utf-8');
                    const script = window.document.createElement('script');
                    script.textContent = code;
                    window.document.head.appendChild(script);
                }
            }

            if (typeof window.generateSnippetLocally !== 'function') {
                throw new Error("Legacy generateSnippetLocally not found on window");
            }

            return await window.generateSnippetLocally();
        };

        try {
            legacyYaml = await runLegacy();
        } catch (e) {
            console.error("Legacy generation failed:", e);
            throw e;
        }

        // --- RUN MODERN (Uses Vitest window) ---
        const runModern = async () => {
            console.log("[Time Machine] Running Modern Generator...");

            // Mock Vitest Globals
            window.AppState = {
                getPagesPayload: () => JSON.parse(JSON.stringify(GOLDEN_PAYLOAD)),
                getCanvasDimensions: () => ({ width: 800, height: 480 }),
                getCanvasShape: () => "rectangle"
            };
            window.getDeviceModel = () => "reterminal_e1001";
            window.fetch = vi.fn().mockResolvedValue({
                ok: true,
                text: async () => "# Mock Hardware Package",
                json: async () => ({})
            });

            // 1. Core
            const coreFiles = [
                'js/core/layout_constants.js',
                'js/utils/helpers.js',
                'js/core/utils.js',
                'js/core/plugin_registry.js',
                'js/io/adapters/base_adapter.js',
                'js/io/adapters/esphome_adapter.js',
                'js/io/yaml_export.js',
                'js/io/yaml_export_lvgl.js',
                'js/io/hardware_generators.js',
                'js/io/devices.js'
            ];
            for (const f of coreFiles) {
                const code = fs.readFileSync(path.resolve(MODERN_FRONTEND, f), 'utf-8');
                try {
                    (0, eval)(code);
                } catch (e) {
                    throw new Error(`Eval failed for modern core file ${f}: ${e.message}`);
                }
            }

            // 2. Load all Plugins
            const featuresPath = path.resolve(MODERN_FRONTEND, 'features');
            const entries = fs.readdirSync(featuresPath);
            for (const entry of entries) {
                const pluginDir = path.resolve(featuresPath, entry);
                if (fs.statSync(pluginDir).isDirectory()) {
                    // Try to find *_plugin.js
                    const files = fs.readdirSync(pluginDir);
                    const pluginFileMatch = files.find(f => f.endsWith('_plugin.js'));
                    if (pluginFileMatch) {
                        const pluginCode = fs.readFileSync(path.resolve(pluginDir, pluginFileMatch), 'utf-8');
                        (0, eval)(pluginCode);
                    }
                }
            }

            return await window.generateSnippetLocally();
        };

        try {
            modernYaml = await runModern();
        } catch (e) {
            console.error("Modern generation failed:", e);
            throw e;
        }
    });

    it('generates identical YAML structure', () => {
        const normalize = (yaml) => {
            if (!yaml) return "";
            return yaml.split('\n')
                .filter(line => !line.trim().startsWith('#')) // Ignore comments
                .map(line => line.trimEnd())
                .filter(line => line.length > 0)
                .join('\n');
        };

        const legacyNorm = normalize(legacyYaml);
        const modernNorm = normalize(modernYaml);

        if (legacyNorm !== modernNorm) {
            fs.writeFileSync(path.resolve(__dirname, 'legacy_output.yaml'), legacyYaml);
            fs.writeFileSync(path.resolve(__dirname, 'modern_output.yaml'), modernYaml);

            // Also write normalized versions to see exactly what differs
            fs.writeFileSync(path.resolve(__dirname, 'legacy_norm.yaml'), legacyNorm);
            fs.writeFileSync(path.resolve(__dirname, 'modern_norm.yaml'), modernNorm);

            console.log("YAML mismatch! Details written to tests/legacy_output.yaml and modern_output.yaml");
        }

        expect(modernNorm).toBe(legacyNorm);
    });
});
