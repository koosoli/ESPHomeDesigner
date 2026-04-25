import { BaseAdapter } from './base_adapter.js';
import { Logger } from '../../utils/logger.js';
import { registry } from '../../core/plugin_registry.js';

const DEFAULT_ODP_REFRESH_TYPE = "0";

/**
 * @param {unknown} value
 * @returns {string}
 */
function coerceString(value) {
    return typeof value === 'string' ? value.trim() : '';
}

/**
 * Legacy ODP settings used entity IDs. Only carry old values forward if they already
 * look like device IDs, otherwise force the user onto the new explicit device field.
 *
 * @param {Record<string, any>} settings
 * @returns {string}
 */
function resolveOpenDisplayDeviceId(settings) {
    const deviceId = coerceString(settings.opendisplayDeviceId);
    if (deviceId) {
        return deviceId;
    }

    const legacyValue = coerceString(settings.opendisplayEntityId);
    if (!legacyValue || legacyValue.includes('.') || /\s/.test(legacyValue)) {
        return '';
    }

    return legacyValue;
}

/**
 * @param {unknown} value
 * @returns {string}
 */
function formatYamlValue(value) {
    if (typeof value === 'string') {
        if (
            value === '' ||
            /\r|\n/.test(value) ||
            /^\s|\s$/.test(value) ||
            /[:#'"[\]{}]|^- /.test(value) ||
            /^(?:true|false|null|yes|no|on|off|[-+]?\d+(?:\.\d+)?)$/i.test(value)
        ) {
            return JSON.stringify(value);
        }
        return value;
    }

    if (Array.isArray(value) || (typeof value === 'object' && value !== null)) {
        return JSON.stringify(value);
    }

    if (value === null) {
        return 'null';
    }

    return String(value);
}

/**
 * OpenDisplay-specific adapter for generating ODP v1 action payloads.
 * Targets Home Assistant drawcustom actions for MQTT/HTTP based e-paper controllers.
 */
export class OpenDisplayAdapter extends BaseAdapter {
    constructor() {
        super();
    }

    /**
     * Main entry point for generating the ODP action YAML.
     * @param {ProjectPayload} layout
     * @returns {Promise<string>} The generated action YAML.
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

        // Get device ID from settings, with backwards-compatible legacy fallback
        const settings = layout.settings || {};
        const deviceId = resolveOpenDisplayDeviceId(settings);

        // Build the YAML structure
        const lines = [
            'action: opendisplay.drawcustom',
            'target:',
            `  device_id: ${formatYamlValue(deviceId)}`,
            'data:',
            `  background: ${formatYamlValue(background)}`,
            `  rotate: ${rotate}`,
            `  dither: ${settings.opendisplayDither ?? 2}`,
            `  ttl: ${settings.opendisplayTtl || 60}`,
            `  refresh_type: ${JSON.stringify(DEFAULT_ODP_REFRESH_TYPE)}`,
            '  dry-run: false'
        ];

        if (payloadItems.length === 0) {
            lines.push('  payload: []');
            return lines.join('\n');
        }

        lines.push('  payload:');

        // Format payload items into YAML list
        payloadItems.forEach(item => {
            if (item.id) {
                lines.push(`    # id: ${item.id}`);
            }
            lines.push(`    - type: ${formatYamlValue(item.type)}`);
            Object.entries(item).forEach(([key, value]) => {
                if (key === 'type' || key === 'id') return; // Skip type (already done) and id (internal)
                lines.push(`      ${key}: ${formatYamlValue(value)}`);
            });
        });

        return lines.join('\n');
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
