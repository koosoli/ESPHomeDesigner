import { BaseAdapter } from './base_adapter.js';
import { Logger } from '../../utils/logger.js';
import { registry as PluginRegistry } from '../../core/plugin_registry.js';
import { serializeWidget } from '../yaml_export_lvgl.js';

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

        const actionLines = [];

        const ph = layout.protocolHardware || {};
        const width = (layout.orientation === 'portrait') ? Math.min(ph.width || 800, ph.height || 480) : Math.max(ph.width || 800, ph.height || 480);
        const height = (layout.orientation === 'portrait') ? Math.max(ph.width || 800, ph.height || 480) : Math.min(ph.width || 800, ph.height || 480);

        const background = (layout.darkMode ? "black" : "white");

        // Initial Background Clear action
        actionLines.push('    {');
        actionLines.push('      "type": "draw_rect",');
        actionLines.push('      "x": 0,');
        actionLines.push('      "y": 0,');
        actionLines.push(`      "w": ${width},`);
        actionLines.push(`      "h": ${height},`);
        actionLines.push(`      "fill": "${background}"`);
        actionLines.push('    }');

        page.widgets.forEach(widget => {
            if (widget.hidden || widget.type === 'group') return;

            const element = this.generateWidget(widget, { layout, page });
            if (element) {
                const marker = serializeWidget(widget).replace(/^#/, '//');
                actionLines.push(`    ${marker}`);
                const elements = Array.isArray(element) ? element : [element];
                elements.forEach(el => {
                    const elJson = JSON.stringify(el, null, 2);
                    const indented = elJson.split('\n').map(l => '    ' + l).join('\n');
                    actionLines.push(indented);
                });
            }
        });

        const lines = [
            '{',
            '  "version": 1,',
            '  "actions": ['
        ];

        // Process segments with commas
        for (let i = 0; i < actionLines.length; i++) {
            let line = actionLines[i];
            const isLast = i === actionLines.length - 1;
            const nextIsComment = i + 1 < actionLines.length && actionLines[i + 1].trim().startsWith('//');
            const nextIsJson = i + 1 < actionLines.length && !actionLines[i + 1].trim().startsWith('//');

            if (!line.trim().startsWith('//')) {
                if (nextIsJson || nextIsComment) {
                    line += ",";
                }
            }
            lines.push(line);
        }

        lines.push('  ]');
        lines.push('}');

        return lines.join('\n');
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
