import { Logger } from '../utils/logger.js';

// ─── Types ───────────────────────────────────────────────────────────────────

/** Minimal plugin shape used internally. Full Plugin interface lives in types.d.ts. */
interface PluginDef {
    id: string;
    [key: string]: any;
}

type PluginModuleLoader = () => Promise<{ default?: PluginDef;[key: string]: any }>;

// ─── Vite glob import ────────────────────────────────────────────────────────

// import.meta.glob is a Vite build-time macro — calling it unconditionally
// ensures all plugin chunks are bundled. The try/catch handles non-Vite
// environments (e.g. Vitest without vite-plugin-glob).
let pluginModules: Record<string, PluginModuleLoader> = {};
try {
    pluginModules = (import.meta as any).glob('../../features/*/plugin.js') as Record<string, PluginModuleLoader>;
} catch {
    // Non-Vite environment; plugins will fall back to dynamic import
}

// ─── Registry ────────────────────────────────────────────────────────────────

export class PluginRegistry {
    private plugins = new Map<string, PluginDef>();
    private loading = new Map<string, Promise<PluginDef | null>>();
    private aliases: Record<string, string>;

    constructor() {
        this.aliases = {
            "label": "text",
            "rectangle": "shape_rect",
            "rrect": "rounded_rect",
            "circle": "shape_circle",
            "nav_next_page": "touch_area",
            "nav_previous_page": "touch_area",
            "nav_reload_page": "touch_area",
            "puppet": "online_image",
            "multiline": "odp_multiline",
            "rectangle_pattern": "odp_rectangle_pattern",
            "polygon": "odp_polygon",
            "ellipse": "odp_ellipse",
            "icon_sequence": "odp_icon_sequence",
            "weather_forcast": "weather_forecast",
            "odp_debug_grid": "debug_grid"
        };
    }

    /** Registers a plugin (merges with existing if already present). */
    register(plugin: PluginDef): void {
        if (!plugin?.id) {
            Logger.warn("[Registry] Invalid plugin registration attempt:", plugin);
            return;
        }
        const id = plugin.id;
        const existing = this.plugins.get(id) || {};
        this.plugins.set(id, { ...existing, ...plugin });
        Logger.log(`[Registry] Registered: ${id}`);
    }

    /** Gets a registered plugin by ID or alias. */
    get(id: string): PluginDef | undefined {
        const targetId = this.aliases[id] || id;
        return this.plugins.get(targetId);
    }

    /** Returns an array of all registered plugins. */
    getAll(): PluginDef[] {
        return Array.from(this.plugins.values());
    }

    /** Dynamically load a feature's module. */
    async load(id: string): Promise<PluginDef | null> {
        const targetId = this.aliases[id] || id;

        if (targetId === 'group') return null;

        if (this.plugins.has(targetId)) {
            return this.plugins.get(targetId)!;
        }

        if (this.loading.has(targetId)) {
            return this.loading.get(targetId)!;
        }

        const loadPromise = (async (): Promise<PluginDef | null> => {
            try {
                const path = `../../features/${targetId}/plugin.js`;

                let module: Record<string, any>;
                if (pluginModules[path]) {
                    module = await pluginModules[path]();
                } else {
                    Logger.log(`[Registry] Using dynamic import fallback for: ${targetId}`);
                    module = await import(/* @vite-ignore */ path);
                }

                if (module.default) {
                    this.register(module.default);
                } else {
                    this.register({ id: targetId, ...module });
                }

                this.loading.delete(targetId);
                return this.plugins.get(targetId) ?? null;
            } catch (e) {
                Logger.error(`[Registry] Failed to load plugin "${targetId}" from ESM:`, e);
                this.loading.delete(targetId);
                return null;
            }
        })();

        this.loading.set(targetId, loadPromise);
        return loadPromise;
    }

    // ─── Hook Delegates ──────────────────────────────────────────────────────

    onExportGlobals(context: any): void { this.getAll().forEach(p => p.onExportGlobals?.call(p, context)); }
    onExportEsphome(context: any): void { this.getAll().forEach(p => p.onExportEsphome?.call(p, context)); }
    onExportNumericSensors(context: any): void { this.getAll().forEach(p => p.onExportNumericSensors?.call(p, context)); }
    onExportTextSensors(context: any): void { this.getAll().forEach(p => p.onExportTextSensors?.call(p, context)); }
    onExportBinarySensors(context: any): void { this.getAll().forEach(p => p.onExportBinarySensors?.call(p, context)); }
    onExportHelpers(context: any): void { this.getAll().forEach(p => p.onExportHelpers?.call(p, context)); }
    onExportComponents(context: any): void { this.getAll().forEach(p => p.onExportComponents?.call(p, context)); }
    onCollectRequirements(context: any): void { this.getAll().forEach(p => p.collectRequirements?.call(p, context)); }
}

export const registry = new PluginRegistry();
Logger.log("[Registry] Modular system ready.");
