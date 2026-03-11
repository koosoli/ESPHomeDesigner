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
                    .flatMap(s => s.fields.map(f => f.key));

                const uiOnlyFields = ['drop_shadow', 'opa', 'custom_font_family'];
                const coreFields = ['width', 'height', 'w', 'h', 'x', 'y', 'id', 'type', 'parentId', 'locked', 'hidden'];

                // 1. Every schema key must exist in defaults
                schemaKeys.forEach(key => {
                    if (!uiOnlyFields.includes(key)) {
                        expect(plugin.defaults, `${pluginDir}: schema key "${key}" missing from defaults`).toHaveProperty(key);
                    }
                });

                // 2. Every default key (not core) must exist in schema
                Object.keys(plugin.defaults).forEach(key => {
                    if (!coreFields.includes(key) && !uiOnlyFields.includes(key)) {
                        expect(schemaKeys, `${pluginDir}: default key "${key}" missing from schema`).toContain(key);
                    }
                });
            }

            // supportedModes ↔ export function consistency
            if (plugin.supportedModes) {
                if (plugin.supportedModes.includes('direct')) {
                    expect(typeof plugin.export, `${pluginDir} missing export()`).toBe('function');
                }
                if (plugin.supportedModes.includes('lvgl')) {
                    expect(typeof plugin.exportLVGL, `${pluginDir} missing exportLVGL()`).toBe('function');
                }
                if (plugin.supportedModes.includes('oepl')) {
                    expect(typeof plugin.exportOEPL, `${pluginDir} missing exportOEPL()`).toBe('function');
                }
                if (plugin.supportedModes.includes('opendisplay')) {
                    expect(typeof plugin.exportOpenDisplay, `${pluginDir} missing exportOpenDisplay()`).toBe('function');
                }
            }

            // renderProperties / schema mutual exclusivity
            const hasSchema = plugin.schema && plugin.schema.length > 0;
            const hasRenderProps = typeof plugin.renderProperties === 'function';
            expect(hasSchema || hasRenderProps, `${pluginDir} must have either schema or renderProperties`).toBe(true);

            // Hardening: If it has both, it might be confusing, but some use schema for defaults 
            // and renderProperties for custom UI. However, usually they are exclusive.
            // For now, just ensure at least one exists.
        });
    });
});
