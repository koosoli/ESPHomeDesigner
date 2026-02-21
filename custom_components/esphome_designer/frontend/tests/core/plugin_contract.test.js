import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('Plugin Contract Enforcement', () => {
    const featuresDir = path.resolve(__dirname, '../../features');
    const plugins = fs.readdirSync(featuresDir).filter(dir => {
        return fs.existsSync(path.join(featuresDir, dir, 'plugin.js'));
    });

    plugins.forEach(pluginDir => {
        it(`${pluginDir} exports required fields`, async () => {
            const module = await import(`../../features/${pluginDir}/plugin.js`);
            const plugin = module.default;

            expect(plugin).toBeDefined();
            expect(plugin.id).toBeDefined();

            // Must have some form of export function
            const hasExport = plugin.export || plugin.exportLVGL || plugin.exportOEPL || plugin.exportOpenDisplay;
            expect(hasExport).toBeDefined();

            // Must have rendering logic
            expect(typeof plugin.render).toBe('function');

            // Schema structure validation
            if (plugin.schema) {
                plugin.schema.forEach(section => {
                    expect(section.section).toBeDefined();      // section label
                    expect(Array.isArray(section.fields)).toBe(true);
                    section.fields.forEach(field => {
                        expect(field.key).toBeDefined();         // property key
                        expect(field.type).toBeDefined();        // input type
                    });
                });
            }

            // Defaults ↔ Schema consistency
            if (plugin.defaults && plugin.schema) {
                const schemaKeys = plugin.schema
                    .flatMap(s => s.fields.map(f => f.key))
                    .filter(k => !['drop_shadow'].includes(k));  // UI-only fields
                schemaKeys.forEach(key => {
                    expect(plugin.defaults).toHaveProperty(key);
                });
            }

            // supportedModes ↔ export function consistency
            if (plugin.supportedModes) {
                if (plugin.supportedModes.includes('direct')) {
                    expect(typeof plugin.export).toBe('function');
                }
                if (plugin.supportedModes.includes('lvgl')) {
                    expect(typeof plugin.exportLVGL).toBe('function');
                }
                if (plugin.supportedModes.includes('oepl')) {
                    expect(typeof plugin.exportOEPL).toBe('function');
                }
            }
        });
    });
});
