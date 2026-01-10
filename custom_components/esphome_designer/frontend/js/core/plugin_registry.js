import { Logger } from '../utils/logger.js';

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
            "nav_reload_page": "touch_area"
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
                // Determine the path. 
                // In production/HACS, it's relative to the frontend root.
                const modulePath = `../../features/${targetId}/plugin.js`;
                const module = await import(modulePath);

                if (module.default) {
                    this.register(module.default);
                } else {
                    // Fallback for non-default exports if we use named
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

