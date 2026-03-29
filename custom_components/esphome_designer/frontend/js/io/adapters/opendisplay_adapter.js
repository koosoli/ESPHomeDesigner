import { BaseAdapter } from './base_adapter.js';
import { Logger } from '../../utils/logger.js';
import { registry } from '../../core/plugin_registry.js';

/**
 * OpenDisplay-specific adapter for generating ODP v1 JSON payloads.
 * Targets MQTT/HTTP based e-paper controllers.
 */
export class OpenDisplayAdapter extends BaseAdapter {
    constructor() {
        super();
    }

    /**
     * Main entry point for generating the ODP YAML configuration.
     * @param {ProjectPayload} layout
     * @returns {Promise<string>} The generated YAML configuration.
     */
    async generate(layout) {
        if (!layout) {
            Logger.error("OpenDisplayAdapter: Missing layout");
            return "";
        }

        const pages = layout.pages || [];
        const currentPageIndex = layout.currentPageIndex || 0;
        const page = pages[currentPageIndex];

        if (!page || !page.widgets) {
            return "";
        }

        /** @type {Array<Record<string, any>>} */
        const payloadItems = [];

        // Color Mode & Theme considerations
        const _ph = layout.protocolHardware || {};
        const isDark = page.dark_mode === 'dark' || (page.dark_mode === 'inherit' && layout.darkMode);
        const background = isDark ? "black" : "white";

        /** @type {Widget[]} */ (page.widgets).forEach((widget) => {
            if (widget.hidden || widget.type === 'group') return;

            const element = this.generateWidget(widget, { layout, page });
            if (element) {
                const elements = Array.isArray(element) ? element : [element];
                elements.forEach((el) => {
                    if (el && typeof el === 'object' && !el.id) {
                        el.id = widget.id;
                    }
                    payloadItems.push(el);
                });
            }
        });

        // Determine rotation based on orientation
        const orientation = layout.orientation || "landscape";
        const rotate = (orientation === "portrait") ? 90 : 0;

        // Get entity ID from settings, with fallback placeholder
        const settings = layout.settings || {};
        const entityId = settings.opendisplayEntityId || "opendisplay.0000000000000000";

        // Build the YAML structure
        let yaml = `service: opendisplay.drawcustom\n`;
        yaml += `target:\n  entity_id: ${entityId}\n`;
        yaml += `data:\n`;
        yaml += `  background: "${background}"\n`;
        yaml += `  rotate: ${rotate}\n`;
        yaml += `  dither: ${settings.opendisplayDither ?? 2}\n`;
        yaml += `  ttl: ${settings.opendisplayTtl || 60}\n`;
        yaml += `  payload: |-\n`;

        // Format payload items into YAML list
        payloadItems.forEach(item => {
            const idComment = item.id ? `\n    # id: ${item.id}` : "";
            yaml += `${idComment}\n    - type: ${item.type}\n`;
            Object.entries(item).forEach(([key, value]) => {
                if (key === 'type' || key === 'id') return; // Skip type (already done) and id (internal)

                let valStr = value;
                if (typeof value === 'string') {
                    if (value.includes('\n') || value.includes(':') || value.includes('"')) {
                        valStr = JSON.stringify(value);
                    }
                } else if (Array.isArray(value)) {
                    valStr = JSON.stringify(value);
                } else if (typeof value === 'object' && value !== null) {
                    valStr = JSON.stringify(value);
                }

                yaml += `      ${key}: ${valStr}\n`;
            });
        });

        return yaml;
    }

    /**
     * Generates an ODP action for a single widget.
     * @param {Widget} widget 
     * @param {Record<string, any>} context 
     * @returns {Object|Object[]|null}
     */
    generateWidget(widget, context) {
        const plugin = registry.get(widget.type);
        if (plugin && typeof plugin.exportOpenDisplay === 'function') {
            try {
                return plugin.exportOpenDisplay(widget, context);
            } catch (e) {
                Logger.error(`Error in exportOpenDisplay for ${widget.type}:`, e);
                return null;
            }
        } else {
            // Log once per widget type
            if (!this._warnedTypes) this._warnedTypes = new Set();
            if (!this._warnedTypes.has(widget.type)) {
                Logger.warn(`Widget type "${widget.type}" does not support OpenDisplay export yet.`);
                this._warnedTypes.add(widget.type);
            }
            return null;
        }
    }
}

// Expose globally
