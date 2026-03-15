/**
 * @file mqtt_helpers.js
 * @description Central utility for generating sensor platform lines, allowing per-widget MQTT overrides.
 */

/**
 * Returns ESPHome YAML lines for a sensor/text_sensor/binary_sensor definition.
 * If the widget has an mqtt_topic set, it generates an mqtt_subscribe platform.
 * Otherwise, it falls back to the standard homeassistant platform.
 * 
 * @param {Object} widget - The widget object (contains props)
 * @param {string} entityId - The HA entity ID or base name for the sensor
 * @param {string} safeId - The sanitized ESPHome ID for the sensor
 * @param {string} [attribute=''] - The HA attribute (if applicable)
 * @returns {string[]} An array of YAML lines for the platform configuration.
 */
export function getSensorPlatformLines(widget, entityId, safeId, attribute = '') {
    const p = widget?.props || {};
    const mqttTopic = (p.mqtt_topic || '').trim();

    if (mqttTopic) {
        // Generate MQTT Subscribe sensor lines
        const lines = [
            '- platform: mqtt_subscribe',
            `  id: ${safeId}`,
            `  topic: "${mqttTopic}"`
        ];
        lines.push('  internal: true');
        return lines;
    }

    // Default: Home Assistant sensor lines
    const lines = [
        '- platform: homeassistant',
        `  id: ${safeId}`,
        `  entity_id: ${entityId}`
    ];
    if (attribute) {
        lines.push(`  attribute: ${attribute}`);
    }
    lines.push('  internal: true');
    return lines;
}
