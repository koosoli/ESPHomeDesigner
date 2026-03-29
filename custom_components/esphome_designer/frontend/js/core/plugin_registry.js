import { Logger } from '../utils/logger.js';

let pluginModules = {};
/* v8 ignore start */
try {
    pluginModules = import.meta.glob('../../features/*/plugin.js');
} catch {
    // Non-Vite environment; plugins fall back to dynamic imports.
}
/* v8 ignore stop */

export function __setPluginModulesForTests(modules) {
    pluginModules = modules;
}

export function __resetPluginModulesForTests() {
    pluginModules = {};
}

export class PluginRegistry {
    constructor() {
        this.plugins = new Map();
        this.loading = new Map();
        this.aliases = {
            label: 'text',
            rectangle: 'shape_rect',
            rrect: 'rounded_rect',
            circle: 'shape_circle',
            nav_next_page: 'touch_area',
            nav_previous_page: 'touch_area',
            nav_reload_page: 'touch_area',
            puppet: 'online_image',
            multiline: 'odp_multiline',
            rectangle_pattern: 'odp_rectangle_pattern',
            polygon: 'odp_polygon',
            ellipse: 'odp_ellipse',
            icon_sequence: 'odp_icon_sequence',
            weather_forcast: 'weather_forecast',
            odp_debug_grid: 'debug_grid',
            lv_chart: 'lvgl_chart'
        };
    }

    register(plugin) {
        if (!plugin?.id) {
            Logger.warn('[Registry] Invalid plugin registration attempt:', plugin);
            return;
        }

        const id = plugin.id;
        const existing = this.plugins.get(id);
        this.plugins.set(id, { ...(existing || {}), ...plugin });
        Logger.log(`[Registry] Registered: ${id}`);
    }

    get(id) {
        const targetId = this.aliases[id] || id;
        return this.plugins.get(targetId);
    }

    getAll() {
        return Array.from(this.plugins.values());
    }

    async load(id) {
        const targetId = this.aliases[id] || id;

        if (targetId === 'group') {
            return null;
        }

        const existing = this.plugins.get(targetId);
        if (existing) {
            return existing;
        }

        const pending = this.loading.get(targetId);
        if (pending) {
            return pending;
        }

        const loadPromise = (async () => {
            try {
                const path = `../../features/${targetId}/plugin.js`;
                const module = pluginModules[path]
                    ? await pluginModules[path]()
                    : await import(/* @vite-ignore */ path);

                let plugin;
                if (module.default) {
                    plugin = module.default;
                } else {
                    plugin = { id: targetId, ...module };
                }
                this.register(plugin);
                return this.plugins.get(targetId) ?? null;
            } catch (error) {
                Logger.error(`[Registry] Failed to load plugin "${targetId}" from ESM:`, error);
                return null;
            } finally {
                this.loading.delete(targetId);
            }
        })();

        this.loading.set(targetId, loadPromise);
        return loadPromise;
    }

    runHook(hookName, context) {
        this.getAll().forEach((plugin) => {
            const hook = hookName === 'onCollectRequirements'
                ? plugin.collectRequirements
                : plugin[hookName];
            if (typeof hook === 'function') {
                hook.call(plugin, context);
            }
        });
    }

    onExportGlobals(context) {
        this.runHook('onExportGlobals', context);
    }

    onExportEsphome(context) {
        this.runHook('onExportEsphome', context);
    }

    onExportNumericSensors(context) {
        this.runHook('onExportNumericSensors', context);
    }

    onExportTextSensors(context) {
        this.runHook('onExportTextSensors', context);
    }

    onExportBinarySensors(context) {
        this.runHook('onExportBinarySensors', context);
    }

    onExportHelpers(context) {
        this.runHook('onExportHelpers', context);
    }

    onExportComponents(context) {
        this.runHook('onExportComponents', context);
    }

    onCollectRequirements(context) {
        this.runHook('onCollectRequirements', context);
    }
}

export const registry = new PluginRegistry();
Logger.log('[Registry] Modular system ready.');
