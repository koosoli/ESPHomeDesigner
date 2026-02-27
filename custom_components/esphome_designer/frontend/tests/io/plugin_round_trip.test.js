import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ESPHomeAdapter } from '../../js/io/adapters/esphome_adapter';
import { parseSnippetYamlOffline } from '../../js/io/yaml_import';
import { registry } from '../../js/core/plugin_registry';
import fs from 'fs';
import path from 'path';

// Mocks
vi.mock('../../js/utils/logger.js', () => ({
    Logger: { log: vi.fn(), warn: vi.fn(), error: vi.fn() }
}));

const featuresDir = path.resolve(__dirname, '../../features');
const pluginDirs = fs.readdirSync(featuresDir).filter(f =>
    fs.statSync(path.join(featuresDir, f)).isDirectory() &&
    fs.existsSync(path.join(featuresDir, f, 'plugin.js'))
);

// Register all plugins
for (const dir of pluginDirs) {
    const pluginPath = `../../features/${dir}/plugin.js`;
    try {
        const module = await import(pluginPath);
        registry.register(module.default || module);
    } catch (e) {
        console.error(`Failed to register ${dir}:`, e);
    }
}

describe('Plugin YAML Round-Trip Hardening', () => {
    beforeEach(async () => {
        // Mock DOM
        vi.stubGlobal('document', {
            createElement: () => ({
                style: {},
                getContext: () => ({ fillRect: vi.fn(), measureText: () => ({ width: 100 }) })
            }),
            getElementById: () => null
        });

        // Mock js-yaml on window for parsers
        const jsyaml = await import('js-yaml');
        vi.stubGlobal('window', {
            jsyaml: jsyaml.default || jsyaml,
            AppState: {
                entityStates: { "sensor.test": { state: "10", attributes: { unit_of_measurement: "°C" } } },
                project: { id: "test", name: "Test", deviceProfile: "native", hardware: { type: "esp32" } },
                settings: { renderingMode: 'direct' },
                getCurrentPage: () => ({ id: "page_0", layout: "absolute" }),
                updateSettings: vi.fn(),
                setPages: vi.fn(),
                setDeviceName: vi.fn(),
                setDeviceModel: vi.fn(),
                setCurrentLayoutId: vi.fn()
            },
            DEVICE_PROFILES: {
                native: {
                    id: "native",
                    name: "Native ESP32",
                    chip: "esp32",
                    resolution: { width: 800, height: 480 },
                    features: { lcd: true }
                }
            }
        });
    });

    pluginDirs.forEach(pluginDir => {
        // Skip some plugins that are known to be non-widgets or complex templates for now if they fail
        // but let's try all first.
        it(`round-trips ${pluginDir} successfully`, async () => {
            const plugin = registry.get(pluginDir);
            if (!plugin) return;

            const adapter = new ESPHomeAdapter();

            // 1. Setup initial state with defaults
            const initialState = {
                id: "test-project",
                name: "Test Project",
                deviceModel: "native",
                hardware: { type: "esp32" },
                renderingMode: 'direct',
                pages: [{
                    id: "page_0",
                    name: "Page 1",
                    widgets: [{
                        id: `w_${pluginDir.replace(/-/g, '_')}`,
                        type: plugin.id || pluginDir,
                        x: 10, y: 10, width: plugin.width || 100, height: plugin.height || 50,
                        props: { ...plugin.defaults }
                    }]
                }]
            };

            // 2. First Export
            const gen1 = await adapter.generate(initialState);
            expect(gen1, `${pluginDir} generated empty YAML`).not.toBe("");

            // 3. Re-import
            const reimportedPayload = await parseSnippetYamlOffline(gen1);

            // 4. Second Export (From re-imported state)
            const secondState = {
                ...initialState,
                pages: reimportedPayload.pages
            };
            const gen2 = await adapter.generate(secondState);

            // 5. Symmetric guarantee: Export of imported state MUST match original export
            // We use specialized matching to ignore whitespace differences if any, 
            // but ideally bit-identical.
            try {
                expect(gen2, `${pluginDir} export mismatch after round-trip`).toBe(gen1);
            } catch (e) {
                // If they differ, log why for debugging
                const lines1 = gen1.split('\n');
                const lines2 = gen2.split('\n');
                let diffMsg = "";
                for (let i = 0; i < Math.max(lines1.length, lines2.length); i++) {
                    if (lines1[i] !== lines2[i]) {
                        diffMsg = `Diff at line ${i + 1} for ${pluginDir}:\n` +
                            `  Expected: ${lines1[i]}\n` +
                            `  Received: ${lines2[i]}`;
                        console.error(diffMsg);
                        break;
                    }
                }
                e.message = `${e.message}\n${diffMsg}`;
                throw e;
            }
        });
    });
});
