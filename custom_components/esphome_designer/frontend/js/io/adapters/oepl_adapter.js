import { BaseAdapter } from './base_adapter.js';
import { Logger } from '../../utils/logger.js';
import { registry as PluginRegistry } from '../../core/plugin_registry.js';
import { serializeWidget } from '../yaml_export_lvgl.js';

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

        const payloadLines = [];

        page.widgets.forEach(widget => {
            if (widget.hidden || widget.type === 'group') return;

            const element = this.generateWidget(widget, { layout, page });
            if (element) {
                const marker = serializeWidget(widget).replace(/^#/, '//');
                payloadLines.push(`      ${marker}`);
                const elements = Array.isArray(element) ? element : [element];
                elements.forEach((el, elIdx) => {
                    const elJson = JSON.stringify(el, null, 2);
                    const indented = elJson.split('\n').map(l => '      ' + l).join('\n');
                    const isLastInArray = false; // We'll handle commas at the end
                    payloadLines.push(indented);
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

        // Manually assemble full JSON with markers
        // This is still valid JSON because we use // comments which can be stripped or ignored by some tools,
        // but it's primarily for the designer's internal highlighter.
        const lines = [
            '{',
            '  "service": "open_epaper_link.drawcustom",',
            '  "target": {',
            '    "entity_id": "open_epaper_link.0000000000000000"',
            '  },',
            '  "data": {',
            `    "background": "${background}",`,
            `    "rotate": ${rotate},`,
            '    "dither": 2,',
            '    "ttl": 60,',
            '    "payload": ['
        ];

        // Process segments into lines with commas
        for (let i = 0; i < payloadLines.length; i++) {
            let line = payloadLines[i];
            const nextIsComment = i + 1 < payloadLines.length && payloadLines[i + 1].trim().startsWith('//');
            const isLast = i === payloadLines.length - 1;

            // Add comma if this line is a JSON block and the next meaningful thing is another block or comment
            if (!line.trim().startsWith('//')) {
                if (!isLast && !nextIsComment) {
                    // This segment is part of multiple elements for one widget? No, plugin usually returns single object or array of objects.
                }
                // If the NEXT line is not a comment AND we aren't at the very end
                if (i + 1 < payloadLines.length && !payloadLines[i + 1].trim().startsWith('//')) {
                    // Inside a widget's multi-element array
                    line += ",";
                } else if (i + 1 < payloadLines.length) {
                    // Next is a new widget comment
                    line += ",";
                }
            }
            lines.push(line);
        }

        lines.push('    ]');
        lines.push('  }');
        lines.push('}');

        return lines.join('\n');
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
