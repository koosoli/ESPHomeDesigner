import { BaseAdapter } from './base_adapter.js';
import { Logger } from '../../utils/logger.js';
import { registry as PluginRegistry } from '../../core/plugin_registry.js';

/**
 * OpenDisplay-specific adapter for generating ODP v1 JSON payloads.
 * Targets MQTT/HTTP based e-paper controllers.
 */
export class OpenDisplayAdapter extends BaseAdapter {
    constructor() {
        super();
    }

    /**
     * Main entry point for generating the ODP JSON configuration.
     * @param {Object} layout
     * @returns {Promise<string>} The generated JSON configuration.
     */
    async generate(layout) {
        if (!layout) {
            Logger.error("OpenDisplayAdapter: Missing layout");
            return "{}";
        }

        const pages = layout.pages || [];
        const currentPageIndex = layout.currentPageIndex || 0;
        const page = pages[currentPageIndex];

        if (!page || !page.widgets) {
            return "{}";
        }

        const actions = [];

        const ph = layout.protocolHardware || {};
        const width = (layout.orientation === 'portrait') ? Math.min(ph.width || 800, ph.height || 480) : Math.max(ph.width || 800, ph.height || 480);
        const height = (layout.orientation === 'portrait') ? Math.max(ph.width || 800, ph.height || 480) : Math.min(ph.width || 800, ph.height || 480);

        const background = (layout.darkMode ? "black" : "white");

        // Initial Background Clear action
        actions.push({
            type: "draw_rect",
            x: 0,
            y: 0,
            w: width,
            h: height,
            fill: background
        });

        page.widgets.forEach(widget => {
            if (widget.hidden || widget.type === 'group') return;

            const element = this.generateWidget(widget, { layout, page });
            if (element) {
                // JSON does not support comments, so we skip adding widget markers
                // BUT we inject the ID into the object so the highlighter can find it
                const elements = Array.isArray(element) ? element : [element];
                elements.forEach(el => {
                    if (el && typeof el === 'object' && !el.id) {
                        el.id = widget.id;
                    }
                    actions.push(el);
                });
            }
        });

        // Build proper JSON object - no comments allowed in JSON
        const output = {
            version: 1,
            actions: actions
        };

        return JSON.stringify(output, null, 2);
    }

    /**
     * Generates an ODP action for a single widget.
     * @param {Object} widget 
     * @param {Object} context 
     * @returns {Object|Object[]|null}
     */
    generateWidget(widget, context) {
        const plugin = PluginRegistry ? PluginRegistry.get(widget.type) : null;
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
window.OpenDisplayAdapter = OpenDisplayAdapter;
