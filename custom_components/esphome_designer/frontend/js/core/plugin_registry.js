import { Logger } from '../utils/logger.js';
const pluginModules = (typeof import.meta.glob === 'function')
    ? import.meta.glob('../../features/*/plugin.js')
    : {};

export class PluginRegistry {
    constructor() {
        this.plugins = new Map();
        this.loading = new Map(); // Map of ID -> Promise

        // Internal aliases for redirection if names changed
        this.aliases = {
            "label": "text", // Normalize label to text
            "rectangle": "shape_rect",
            "rrect": "rounded_rect",
            "circle": "shape_circle",
            "nav_next_page": "touch_area",
            "nav_previous_page": "touch_area",
            "nav_reload_page": "touch_area",
            "puppet": "online_image",
            // ODP/OEPL-specific type aliases (for import compatibility)
            "multiline": "odp_multiline",
            "rectangle_pattern": "odp_rectangle_pattern",
            "polygon": "odp_polygon",
            "ellipse": "odp_ellipse",
            "icon_sequence": "odp_icon_sequence",
            "weather_forcast": "weather_forecast", // Handle common typo defensively
            "odp_debug_grid": "debug_grid" // Debug grid widget mapping
        };
    }

    /**
     * Registers a plugin.
     * @param {Object} plugin The plugin definition
     */
    register(plugin) {
        if (!plugin || !plugin.id) {
            Logger.warn("[Registry] Invalid plugin registration attempt:", plugin);
            return;
        }

        const id = plugin.id;
        const existing = this.plugins.get(id) || {};
        this.plugins.set(id, { ...existing, ...plugin });
        Logger.log(`[Registry] Registered: ${id}`);
    }

    get(id) {
        const targetId = this.aliases[id] || id;
        return this.plugins.get(targetId);
    }

    getAll() {
        return Array.from(this.plugins.values());
    }

    /**
     * Dynamically load a feature's module.
     * @param {string} id Feature ID
     */
    async load(id) {
        const targetId = this.aliases[id] || id;

        // 0. Skip internal types that don't need a plugin
        if (targetId === 'group') return null;

        // 1. Check if already loaded
        if (this.plugins.has(targetId)) {
            return this.plugins.get(targetId);
        }

        // 2. Check if currently loading to avoid duplicate requests
        if (this.loading.has(targetId)) {
            return this.loading.get(targetId);
        }

        // 3. Perform dynamic import
        const loadPromise = (async () => {
            try {
                // Use import.meta.glob for better Vite compatibility
                const path = `../../features/${targetId}/plugin.js`;

                let module;
                if (pluginModules[path]) {
                    // Vite-native glob loading
                    module = await pluginModules[path]();
                } else {
                    // Fallback for non-Vite environments (e.g. HA serving source)
                    Logger.log(`[Registry] Using dynamic import fallback for: ${targetId}`);
                    module = await import(path);
                }

                if (module.default) {
                    this.register(module.default);
                } else {
                    this.register({ id: targetId, ...module });
                }

                this.loading.delete(targetId);
                return this.plugins.get(targetId);
            } catch (e) {
                Logger.error(`[Registry] Failed to load plugin "${targetId}" from ESM:`, e);
                this.loading.delete(targetId);
                return null;
            }
        })();

        this.loading.set(targetId, loadPromise);
        return loadPromise;
    }

    // Hook listeners (delegates to plugins)
    onExportGlobals(context) { this.getAll().forEach(p => p.onExportGlobals && p.onExportGlobals(context)); }
    onExportEsphome(context) { this.getAll().forEach(p => p.onExportEsphome && p.onExportEsphome(context)); }
    onExportNumericSensors(context) { this.getAll().forEach(p => p.onExportNumericSensors && p.onExportNumericSensors(context)); }
    onExportTextSensors(context) { this.getAll().forEach(p => p.onExportTextSensors && p.onExportTextSensors(context)); }
    onExportBinarySensors(context) { this.getAll().forEach(p => p.onExportBinarySensors && p.onExportBinarySensors(context)); }
    onExportHelpers(context) { this.getAll().forEach(p => p.onExportHelpers && p.onExportHelpers(context)); }
    onExportComponents(context) { this.getAll().forEach(p => p.onExportComponents && p.onExportComponents(context)); }
    onCollectRequirements(context) { this.getAll().forEach(p => p.collectRequirements && p.collectRequirements(context)); }
}

export const registry = new PluginRegistry();
window.PluginRegistry = registry;
window.FeatureRegistry = registry; // Legacy alias
Logger.log("[Registry] Modular system ready.");

