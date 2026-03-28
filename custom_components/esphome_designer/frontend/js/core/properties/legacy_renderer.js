import { autoPopulateTitleFromEntity as populateTitleFromEntity } from './legacy_renderer_helpers.js';
import { renderProtocolProperties as renderProtocolPropertiesImpl } from './legacy_renderer_protocol.js';
import { renderLegacyProperties as renderLegacyPropertiesImpl } from './legacy_renderer_widget_properties.js';

export class LegacyRenderer {
    /**
     * @param {string} widgetId
     * @param {string} entityId
     */
    static autoPopulateTitleFromEntity(widgetId, entityId) {
        populateTitleFromEntity(widgetId, entityId);
    }

    /**
     * @param {any} panel
     * @param {any} widget
     * @param {string} type
     */
    static renderProtocolProperties(panel, widget, type) {
        renderProtocolPropertiesImpl(panel, widget, type);
    }

    /**
     * @param {any} panel
     * @param {any} widget
     * @param {string} type
     */
    static renderLegacyProperties(panel, widget, type) {
        renderLegacyPropertiesImpl(panel, widget, type);
    }
}
