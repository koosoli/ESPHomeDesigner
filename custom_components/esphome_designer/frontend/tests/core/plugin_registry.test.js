import { beforeEach, describe, expect, it, vi } from 'vitest';

// Mock Logger
vi.mock('../../js/utils/logger.js', () => ({
    Logger: {
        log: vi.fn(),
        warn: vi.fn(),
        error: vi.fn()
    }
}));

import {
    __resetPluginModulesForTests,
    __setPluginModulesForTests,
    PluginRegistry
} from '../../js/core/plugin_registry';
import { Logger } from '../../js/utils/logger.js';

describe('PluginRegistry', () => {
    let registry;

    beforeEach(() => {
        registry = new PluginRegistry();
        __resetPluginModulesForTests();
        vi.clearAllMocks();
    });

    it('should register and retrieve a plugin', () => {
        const mockPlugin = { id: 'test_plugin', name: 'Test' };
        registry.register(mockPlugin);
        expect(registry.get('test_plugin')).toEqual(mockPlugin);
    });

    it('should handle aliases correctly', () => {
        const mockPlugin = { id: 'text', name: 'Text Widget' };
        registry.register(mockPlugin);

        // 'label' is an alias for 'text'
        expect(registry.get('label')).toEqual(mockPlugin);
    });

    it('should map legacy lv_chart alias to lvgl_chart', () => {
        const mockPlugin = { id: 'lvgl_chart', name: 'LVGL Chart Widget' };
        registry.register(mockPlugin);

        expect(registry.get('lv_chart')).toEqual(mockPlugin);
    });

    it('should delegate hook calls to all plugins', () => {
        const hookSpy = vi.fn();
        const mockPlugin1 = { id: 'p1', onExportGlobals: hookSpy };
        const mockPlugin2 = { id: 'p2', onExportGlobals: hookSpy };
        const mockPlugin3 = { id: 'p3' }; // No hook

        registry.register(mockPlugin1);
        registry.register(mockPlugin2);
        registry.register(mockPlugin3);

        const context = { lines: [] };
        registry.onExportGlobals(context);

        expect(hookSpy).toHaveBeenCalledTimes(2);
        expect(hookSpy).toHaveBeenCalledWith(context);
    });

    it('should return all plugins via getAll', () => {
        registry.register({ id: 'a' });
        registry.register({ id: 'b' });
        expect(registry.getAll().length).toBe(2);
    });

    it('warns and ignores invalid registrations', () => {
        registry.register(null);
        registry.register({});

        expect(Logger.warn).toHaveBeenCalledTimes(2);
        expect(registry.getAll()).toHaveLength(0);
    });

    it('returns null for group pseudo-widgets and short-circuits already loaded plugins', async () => {
        expect(await registry.load('group')).toBeNull();

        const mockPlugin = { id: 'weather_forecast', name: 'Weather' };
        registry.register(mockPlugin);
        expect(await registry.load('weather_forcast')).toEqual(mockPlugin);
    });

    it('reuses an in-flight load promise for duplicate requests', async () => {
        const pending = Promise.resolve({ id: 'shared' });
        registry.loading.set('shared', pending);

        expect(await registry.load('shared')).toEqual({ id: 'shared' });
    });

    it('loads plugins from injected module loaders and clears pending state', async () => {
        __setPluginModulesForTests({
            '../../features/quote_rss/plugin.js': vi.fn(async () => ({
                default: { id: 'quote_rss', name: 'Quote RSS' }
            })),
            '../../features/debug_grid/plugin.js': vi.fn(async () => ({
                name: 'Debug Grid',
                onExportGlobals: vi.fn()
            }))
        });

        const defaultPlugin = await registry.load('quote_rss');
        const namedPlugin = await registry.load('odp_debug_grid');

        expect(defaultPlugin).toEqual({ id: 'quote_rss', name: 'Quote RSS' });
        expect(namedPlugin).toMatchObject({ id: 'debug_grid', name: 'Debug Grid' });
        expect(registry.loading.size).toBe(0);
        expect(Logger.error).not.toHaveBeenCalled();
    });

    it('falls back to direct dynamic imports when no prebuilt loader map is available', async () => {
        __resetPluginModulesForTests();

        const plugin = await registry.load('shape_rect');

        expect(plugin).toMatchObject({ id: 'shape_rect' });
        expect(Logger.error).not.toHaveBeenCalled();
    });

    it('logs loader failures and clears the pending entry', async () => {
        __setPluginModulesForTests({
            '../../features/broken/plugin.js': vi.fn(async () => {
                throw new Error('broken loader');
            })
        });

        await expect(registry.load('broken')).resolves.toBeNull();
        expect(Logger.error).toHaveBeenCalledTimes(1);
        expect(registry.loading.size).toBe(0);
    });

    it('routes collectRequirements through the shared hook helper', () => {
        const collectRequirements = vi.fn();
        registry.register({ id: 'collector', collectRequirements });

        const context = { widget: { id: 'w1' } };
        registry.onCollectRequirements(context);

        expect(collectRequirements).toHaveBeenCalledWith(context);
    });

    it('routes export component hooks through the shared hook helper', () => {
        const onExportComponents = vi.fn();
        registry.register({ id: 'components', onExportComponents });

        const context = { components: [] };
        registry.onExportComponents(context);

        expect(onExportComponents).toHaveBeenCalledWith(context);
    });
});
