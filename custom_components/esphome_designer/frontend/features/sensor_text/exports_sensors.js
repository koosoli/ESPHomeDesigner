import { AppState } from '@core/state';
import { getSensorPlatformLines } from '../../js/io/adapters/mqtt_helpers.js';
import { HA_TEXT_DOMAINS } from './shared.js';

/** @typedef {Widget & { props?: Record<string, any>, entity_id?: string, entity_id_2?: string }} SensorTextWidget */

/**
 * @param {Record<string, any>} context
 */
export const onExportTextSensors = (context) => {
        const { lines, widgets, isLvgl, pendingTriggers } = context;
        if (!widgets) return;

        // Helper to check if an entity's current state is non-numeric
        /** @param {string} eid */
        const isEntityStateNonNumeric = (eid) => {
            if (!eid || !AppState?.entityStates) return false;
            const entityObj = AppState.entityStates[eid];
            if (!entityObj || entityObj.state === undefined) return false;
            const stateStr = String(entityObj.state);
            return isNaN(parseFloat(stateStr)) || !isFinite(parseFloat(stateStr));
        };

        // Helper to create safe ESPHome ID (max 59 chars before suffix)
        // Helper to create safe ESPHome ID (max 59 chars before suffix)
        /** @param {string} eid @param {string} attr @param {string} [suffix=""] */
        const makeSafeId = (eid, attr, suffix = "") => {
            const base = attr ? (eid + "_" + attr) : eid;
            let safe = base.replace(/[^a-zA-Z0-9_]/g, "_");
            const maxBase = 63 - suffix.length;
            if (safe.length > maxBase) safe = safe.substring(0, maxBase);
            return safe + suffix;
        };

        /**
         * @param {string} rawEntityId
         * @param {string} rawAttribute
         * @param {string} mqttTopic
         * @param {string | undefined} widgetId
         */
        const queueLvglRefreshTrigger = (rawEntityId, rawAttribute, mqttTopic, widgetId) => {
            if (!isLvgl || !pendingTriggers || !widgetId) return;

            const entityId = (rawEntityId || "").trim();
            const attributePath = (rawAttribute || "").trim();
            const isNested = attributePath.includes(".") || attributePath.includes("[");
            const rootAttr = isNested ? attributePath.split(/[.[]/)[0] : attributePath;
            const safeId = makeSafeId(entityId, rootAttr, "_txt");

            if (!pendingTriggers.has(safeId)) {
                pendingTriggers.set(safeId, new Set());
            }
            pendingTriggers.get(safeId).add(`- lvgl.widget.refresh: ${widgetId}`);
        };

        const weatherEntities = new Set();
        const textEntities = new Set();

        for (const w of /** @type {SensorTextWidget[]} */ (widgets)) {
            if (w.type !== "sensor_text") continue;

            const p = w.props || {};
            const entityId = (w.entity_id || "").trim();
            const mqttTopic = (p.mqtt_topic || "").trim();

            // Auto-detect: check if entity has non-numeric state (like "pm25")
            const isAutoText = !p.is_local_sensor && isEntityStateNonNumeric(entityId);
            const attribute = (p.attribute || "").trim();

            // For MQTT overrides, we register them as text sensors directly if there's no entityId,
            // or we piggypack on the normal HA text sensor flow if there is an entityId.
            // If they provided an mqtt_topic, treat it as a text sensor to be safe (if not numeric in dedup).
            // Actually, sensor_text is the default sink for all string-based states.

            if (entityId.startsWith("weather.")) {
                weatherEntities.add(JSON.stringify({ entity_id: entityId, attribute, mqtt_topic: mqttTopic }));
                queueLvglRefreshTrigger(entityId, attribute, mqttTopic, w.id);
            } else if (mqttTopic || p.is_text_sensor || isAutoText || HA_TEXT_DOMAINS.some(d => entityId.startsWith(d))) {
                textEntities.add(JSON.stringify({ entity_id: entityId, attribute, mqtt_topic: mqttTopic }));
                queueLvglRefreshTrigger(entityId, attribute, mqttTopic, w.id);
            }

            const entityId2 = (w.entity_id_2 || p.entity_id_2 || "").trim();
            if (entityId2) {
                const isAutoText2 = !p.is_local_sensor && isEntityStateNonNumeric(entityId2);
                const attribute2 = (p.attribute2 || "").trim();
                // We don't have a secondary MQTT topic field for now, just entity ID. So mqtt_topic is empty.
                if (entityId2.startsWith("weather.")) {
                    weatherEntities.add(JSON.stringify({ entity_id: entityId2, attribute: attribute2 }));
                    queueLvglRefreshTrigger(entityId2, attribute2, "", w.id);
                } else if (p.is_text_sensor || isAutoText2 || HA_TEXT_DOMAINS.some(d => entityId2.startsWith(d))) {
                    textEntities.add(JSON.stringify({ entity_id: entityId2, attribute: attribute2 }));
                    queueLvglRefreshTrigger(entityId2, attribute2, "", w.id);
                }
            }
        }

        if (weatherEntities.size > 0) {
            let headerAdded = false;
            for (const json of weatherEntities) {
                const { entity_id: rawId, attribute, mqtt_topic } = JSON.parse(json);
                let entityId = rawId || "mqtt_weather_stub";

                if (entityId && !entityId.includes(".") && !mqtt_topic) entityId = `weather.${entityId}`;

                // For nested paths (e.g. entries.days.0), we only want to register the root attribute (entries) in HA.
                const attributePath = (attribute || "").trim();
                const isNested = attributePath.includes(".") || attributePath.includes("[");
                const rootAttr = isNested ? attributePath.split(/[.[]/)[0] : attributePath;

                const safeId = makeSafeId(entityId, rootAttr, "_txt");

                if (context.seenSensorIds && context.seenSensorIds.has(safeId)) continue;
                // Unique key includes attribute now (always root attribute for nested paths)
                const entityKey = rootAttr ? `${entityId}__attr__${rootAttr}` : entityId;
                if (context.seenTextEntityIds && context.seenTextEntityIds.has(entityKey)) continue;

                if (!headerAdded) {
                    lines.push("# Weather Entity Sensors (Detected from Sensor Text)");
                    headerAdded = true;
                }

                if (context.seenSensorIds) context.seenSensorIds.add(safeId);
                if (context.seenTextEntityIds) context.seenTextEntityIds.add(entityKey);

                const fakeWidget = { props: { mqtt_topic } };
                lines.push(...getSensorPlatformLines(fakeWidget, entityId, safeId, rootAttr));
            }
        }

        if (textEntities.size > 0) {
            let headerAdded = false;
            for (const json of textEntities) {
                const { entity_id: entityId, attribute, mqtt_topic } = JSON.parse(json);

                // For nested paths (e.g. entries.days.0), we only want to register the root attribute (entries) in HA.
                const attributePath = (attribute || "").trim();
                const isNested = attributePath.includes(".") || attributePath.includes("[");
                const rootAttr = isNested ? attributePath.split(/[.[]/)[0] : attributePath;

                const safeId = makeSafeId(entityId, rootAttr, "_txt");

                if (context.seenSensorIds && context.seenSensorIds.has(safeId)) continue;

                const entityKey = rootAttr ? `${entityId}__attr__${rootAttr}` : entityId;
                if (context.seenTextEntityIds && context.seenTextEntityIds.has(entityKey)) continue;

                if (!headerAdded) {
                    lines.push("# Text Sensors (Detected from Sensor Text)");
                    headerAdded = true;
                }

                if (context.seenSensorIds) context.seenSensorIds.add(safeId);
                if (context.seenTextEntityIds) context.seenTextEntityIds.add(entityKey);

                const fakeWidget = { props: { mqtt_topic } };
                lines.push(...getSensorPlatformLines(fakeWidget, entityId, safeId, rootAttr));
            }
        }
    };

/**
 * @param {Record<string, any>} context
 */
export const onExportNumericSensors = (context) => {
        const { widgets, isLvgl, pendingTriggers } = context;
        if (!widgets) return;

        // Helper to check if an entity's current state is non-numeric
        /** @param {string} eid */
        const isEntityStateNonNumeric = (eid) => {
            if (!eid || !AppState?.entityStates) return false;
            const entityObj = AppState.entityStates[eid];
            if (!entityObj || entityObj.state === undefined) return false;
            const stateStr = String(entityObj.state);
            return isNaN(parseFloat(stateStr)) || !isFinite(parseFloat(stateStr));
        };

        for (const w of /** @type {SensorTextWidget[]} */ (widgets)) {
            if (w.type !== "sensor_text") continue;

            const p = w.props || {};
            if (p.is_local_sensor) continue;

            const entities = /** @type {string[]} */ ([w.entity_id, w.entity_id_2].filter((/** @type {string | undefined} */ id) => !!id && !!id.trim()));

            for (let eid of entities) {
                eid = eid.trim();

                // Skip if explicitly a text sensor, weather entity, or auto-detected as text
                if (p.is_text_sensor || eid.startsWith("weather.") || eid.startsWith("text_sensor.")) continue;
                if (isEntityStateNonNumeric(eid)) continue; // Skip auto-detected text sensors

                // Ensure sensor. prefix if missing
                if (!eid.includes(".")) {
                    eid = `sensor.${eid}`;
                }

                if (isLvgl && pendingTriggers) {
                    if (!pendingTriggers.has(eid)) {
                        pendingTriggers.set(eid, new Set());
                    }
                    pendingTriggers.get(eid).add(`- lvgl.widget.refresh: ${w.id}`);
                }
            }
        }
    };
