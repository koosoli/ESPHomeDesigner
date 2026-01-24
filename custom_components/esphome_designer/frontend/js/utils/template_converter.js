/**
 * Template Converter Utility
 * Handles conversion between ESPHome sensor logic and Home Assistant Jinja2 templates.
 */
export class TemplateConverter {
    /**
     * Converts a value (ESPHome-style or direct) to a Home Assistant template
     * @param {string} value - e.g. "id(sensor_temp).state" or just "sensor.temperature"
     * @param {Object} options - formatting options
     * @returns {string} - e.g. "{{ states('sensor.temperature') }}"
     */
    static toHATemplate(value, options = {}) {
        if (!value) return "";

        const { precision = 1, unit = "", prefix = "", postfix = "" } = options;

        let template = "";

        // Pattern 1: ESPHome sensor ID syntax id(xxx).state
        const esphomeMatch = String(value).match(/id\(([^)]+)\)\.state/);
        if (esphomeMatch) {
            const rawId = esphomeMatch[1];
            // If it doesn't have a dot, we assume it's a sensor (standard ESPHome->HA map)
            const entityId = rawId.includes('.') ? rawId : `sensor.${rawId}`;
            template = `states('${entityId}')`;
        }
        // Pattern 2: Looks like a HA entity ID (contains a dot)
        else if (String(value).includes('.') && !String(value).includes(' ')) {
            template = `states('${value}')`;
        }
        // Pattern 3: Already an expression or template - wrap if needed or return
        else if (String(value).includes('{{') || String(value).includes('{%')) {
            return value;
        }
        // Fallback: literal string
        else {
            return `${prefix}${value}${unit ? " " + unit : ""}${postfix}`;
        }

        // Apply formatting if we matched a template
        if (template) {
            if (options.isNumeric !== false) {
                template = `${template} | float(0) | round(${precision})`;
            }
            return `{{ ${prefix}${template}${unit ? " ~ ' " + unit + "'" : ""}${postfix} }}`;
        }

        return value;
    }

    /**
     * Tries to convert a HA template back to an ESPHome sensor ID (best effort)
     */
    static toESPHomeID(template) {
        if (!template) return "";
        const match = template.match(/states\(['"]([^'"]+)['"]\)/);
        if (match) {
            const entityId = match[1];
            const parts = entityId.split('.');
            // Map text_sensor specifically if possible, otherwise use standard id()
            if (parts[0] === 'text_sensor') return `id(${parts[1]}).state`;
            return `id(${parts[1]}).state`;
        }
        return template;
    }
}
