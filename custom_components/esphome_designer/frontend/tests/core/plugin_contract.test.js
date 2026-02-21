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

            // Optionals
            if (plugin.schema) {
                expect(Array.isArray(plugin.schema)).toBe(true);
            }
        });
    });
});
