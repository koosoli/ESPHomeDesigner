import { describe, it, expect, vi, beforeEach } from 'vitest';
import { PluginRegistry } from '../../js/core/plugin_registry.js';

// Mock Logger
vi.mock('../utils/logger.js', () => ({
    Logger: {
        log: vi.fn(),
        warn: vi.fn(),
        error: vi.fn()
    }
}));

describe('PluginRegistry', () => {
    let registry;

    beforeEach(() => {
        registry = new PluginRegistry();
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
});
