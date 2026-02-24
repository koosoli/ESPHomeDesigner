import { describe, it, expect, vi } from 'vitest';
import { registry } from '../../js/core/plugin_registry.js';

describe('Invariant Verification - Plugin Contracts', () => {

    it('Registry should contain loaded plugins with correct structure', async () => {
        // Some plugins might be loaded dynamically, but core ones should be there
        const plugins = registry.getAll();

        // At least one plugin should be registered if any were loaded
        // If 0, we might need to trigger a load
        if (plugins.length === 0) {
            // Try to load a known one
            await registry.load('label');
        }

        const currentPlugins = registry.getAll();
        expect(currentPlugins.length).toBeGreaterThan(0);

        currentPlugins.forEach(plugin => {
            expect(plugin.id).toBeDefined();
            expect(typeof plugin.id).toBe('string');
            expect(plugin.name).toBeDefined();

            // Core contract checks
            expect(plugin.defaults).toBeDefined();
            expect(typeof plugin.defaults).toBe('object');
        });
    });

    it('Registry methods should exist and be delegating', () => {
        const hooks = [
            'onExportGlobals',
            'onExportEsphome',
            'onExportNumericSensors',
            'onExportTextSensors',
            'onExportBinarySensors',
            'onExportHelpers',
            'onExportComponents',
            'onCollectRequirements'
        ];

        hooks.forEach(hook => {
            expect(typeof registry[hook]).toBe('function');
        });
    });
});
