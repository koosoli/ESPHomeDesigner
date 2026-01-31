import { BaseAdapter } from './base_adapter.js';
import { Logger } from '../../utils/logger.js';
import { registry as PluginRegistry } from '../../core/plugin_registry.js';

/**
 * OpenEpaperLink-specific adapter for generating JSON configuration.
 */
export class OEPLAdapter extends BaseAdapter {
    constructor() {
        super();
    }

    /**
     * Main entry point for generating the JSON configuration.
     * @param {import("../../types.js").ProjectPayload} layout
     * @returns {Promise<string>} The generated JSON configuration.
     */
    async generate(layout) {
        if (!layout) {
            console.error("OEPLAdapter: Missing layout");
            return "[]";
        }

        const pages = layout.pages || [];
        const currentPageIndex = layout.currentPageIndex || 0;
        const page = pages[currentPageIndex];

        if (!page || !page.widgets) {
            return "[]";
        }

        const payloadItems = [];

        page.widgets.forEach(widget => {
            if (widget.hidden || widget.type === 'group') return;

            const element = this.generateWidget(widget, { layout, page });
            if (element) {
                // JSON does not support comments, so we skip adding widget markers
                // BUT we inject the ID into the object so the highlighter can find it
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

        // Color Mode considerations
        const ph = layout.protocolHardware || {};
        const background = (ph.colorMode === 'bw' || ph.colorMode === 'grayscale')
            ? (layout.darkMode ? "black" : "white")
            : (layout.darkMode ? "black" : "white"); // Fallback

        // Get entity ID from settings, with fallback placeholder
        const settings = layout.settings || {};
        const entityId = settings.oeplEntityId || "open_epaper_link.0000000000000000";

        // Build proper JSON object - no comments allowed in JSON
        const output = {
            service: "open_epaper_link.drawcustom",
            target: {
                entity_id: entityId
            },
            data: {
                background: background,
                rotate: rotate,
                dither: 2,
                ttl: 60,
                payload: payloadItems
            }
        };

        return JSON.stringify(output, null, 2);
    }

    /**
     * Generates an OEPL element for a single widget.
     * @param {Object} widget 
     * @param {Object} context 
     * @returns {Object|Object[]|null}
     */
    generateWidget(widget, context) {
        const plugin = PluginRegistry ? PluginRegistry.get(widget.type) : null;
        if (plugin && typeof plugin.exportOEPL === 'function') {
            try {
                return plugin.exportOEPL(widget, context);
            } catch (e) {
                Logger.error(`Error in exportOEPL for ${widget.type}:`, e);
                return null;
            }
        } else {
            // Log once per widget type to avoid spamming
            if (!this._warnedTypes) this._warnedTypes = new Set();
            if (!this._warnedTypes.has(widget.type)) {
                Logger.warn(`Widget type "${widget.type}" does not support OEPL export yet.`);
                this._warnedTypes.add(widget.type);
            }
            return null;
        }
    }
}

// Expose globally
window.OEPLAdapter = OEPLAdapter;
