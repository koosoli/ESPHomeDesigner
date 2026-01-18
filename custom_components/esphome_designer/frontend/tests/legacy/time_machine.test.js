import { describe, it, expect, vi, beforeAll } from 'vitest';
import fs from 'fs';
import path from 'path';
import { JSDOM } from 'jsdom';
import { GOLDEN_PAYLOAD } from '../golden_master/golden_payload.js';
import { ESPHomeAdapter } from '../../js/io/adapters/esphome_adapter.js';

/**
 * ============================================================================
 *  ⚠️  GOLDEN MASTER WARNING - READ BEFORE DEBUGGING ⚠️
 * ============================================================================
 * This test compares the CURRENT output against a LEGACY baseline.
 * 
 * CRITICAL FOR AI AGENTS:
 * The legacy baseline was NEVER verified by a human. It was auto-generated
 * from an older, potentially BUGGY version of the codebase (v0.8.6.1).
 * 
 * DO NOT:
 * - Assume that a golden master failure means your code is wrong.
 * - Revert logically correct improvements to pass this test.
 * 
 * DO:
 * - Prioritize CORRECT BEHAVIOR over matching this snapshot.
 * - If your changes are genuinely better (e.g., fixing alignment, centering),
 *   UPDATE THE GOLDEN MASTER, not your code.
 * - Consult the user if unsure.
 * ============================================================================
 */

// Paths
// Using the verified legacy path found in oldversions/0.8.6.1 saftybackup-ofversionbeforethecleanup
// Need 6 levels of '..' to reach Codebasecleanup root from custom_components/esphome_designer/frontend/tests/legacy
const LEGACY_FRONTEND = path.resolve(__dirname, '../../../../../../oldversions/0.8.6.1 saftybackup-ofversionbeforethecleanup/frontend');
const MODERN_FRONTEND = path.resolve(__dirname, '../..');

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
                    console.log(`[Time Machine] Loading Legacy Dep: ${dep}`);
                    const code = fs.readFileSync(file, 'utf-8');
                    try {
                        window.eval(code);
                    } catch (err) {
                        console.error(`[Time Machine] Failed to eval legacy script ${dep}:`, err);
                    }
                } else {
                    console.warn(`[Time Machine] Legacy dependency missing: ${file}`);
                }
            }

            if (typeof window.generateSnippetLocally !== 'function') {
                console.log("[Time Machine] Window keys:", Object.keys(window).filter(k => k.includes("generate")));
                throw new Error("Legacy generateSnippetLocally not found on window after eval");
            }

            return await window.generateSnippetLocally();
        };

        try {
            legacyYaml = await runLegacy();
        } catch (e) {
            console.error("Legacy generation failed:", e);
            throw e;
        }

        // --- RUN MODERN (Uses standard ES imports) ---
        const runModern = async () => {
            console.log("[Time Machine] Running Modern Generator...");

            // Setup Vitest window globals expected by the adapter/plugins
            // These allow the modern adapter to run in the Vitest environment
            window.AppState = {
                getPagesPayload: () => JSON.parse(JSON.stringify(GOLDEN_PAYLOAD)),
                getCanvasDimensions: () => ({ width: 800, height: 480 }),
                getCanvasShape: () => "rectangle",
                deviceModel: "reterminal_e1001"
            };
            window.getDeviceModel = () => "reterminal_e1001";
            window.DEVICE_PROFILES = {};
            window.fetch = vi.fn().mockResolvedValue({
                ok: true,
                text: async () => "# Mock Hardware Package",
                json: async () => ({})
            });

            // The adapter will dynamically load plugins via import()
            // Vitest handles this automatically for files within the project.
            const adapter = new ESPHomeAdapter();
            return await adapter.generate(GOLDEN_PAYLOAD);
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
            // Write debug files for comparison
            const debugDir = path.resolve(__dirname, '../debug');
            if (!fs.existsSync(debugDir)) fs.mkdirSync(debugDir);

            fs.writeFileSync(path.resolve(debugDir, 'legacy_output.yaml'), legacyYaml);
            fs.writeFileSync(path.resolve(debugDir, 'modern_output.yaml'), modernYaml);
            fs.writeFileSync(path.resolve(debugDir, 'legacy_norm.yaml'), legacyNorm);
            fs.writeFileSync(path.resolve(debugDir, 'modern_norm.yaml'), modernNorm);

            console.log(`YAML mismatch! Details written to ${debugDir}`);
        }

        expect(modernNorm).toBe(legacyNorm);
    });
});
