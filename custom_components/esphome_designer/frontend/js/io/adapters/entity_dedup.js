/**
 * @file entity_dedup.js
 * @description Extracts Home Assistant entity deduplication and safe ID generation logic.
 */

export const HA_TEXT_DOMAINS = ["text_sensor.", "weather.", "calendar.", "person.", "device_tracker.", "sun.", "update.", "scene."];

/**
 * Helper to check if an entity's current state (or a specific attribute) is non-numeric
 */
export const isEntityStateNonNumeric = (eid, appState, attr = null) => {
    if (!eid || !appState?.entityStates) return false;
    const entityObj = appState.entityStates[eid];
    if (!entityObj) return false;

    const val = attr ? entityObj.attributes?.[attr] : entityObj.state;
    if (val === undefined || val === null) return false;

    const str = String(val).trim();
    if (str === "") return false;

    // Strict number check: Number("5:24pm") -> NaN
    return isNaN(Number(str));
};

export const collectNumericSensors = (pages, context) => {
    const { seenEntityIds, seenSensorIds, appState } = context;
    const allWidgetsForSensors = pages.flatMap(p => (p.widgets || []).filter(w => !w.hidden));
    const numericSensorLinesExtra = [];

    allWidgetsForSensors.forEach(w => {
        let entityId = (w.entity_id || "").trim();
        const p = w.props || {};

        if (!entityId || p.is_local_sensor) return;

        // Numeric sensor types that should be prefixed with sensor. if domain is missing
        const numericSensorTypes = ["progress_bar", "sensor_text", "graph", "battery_icon", "wifi_signal", "ondevice_temperature", "ondevice_humidity"];
        if (numericSensorTypes.includes(w.type) && !entityId.includes(".")) {
            entityId = `sensor.${entityId}`;
        }

        // Fix #198: Skip if this is a sensor_text widget explicitly marked as a text sensor
        // OR if it's using a non-numeric attribute (which makes it a text sensor)
        if (w.type === "sensor_text") {
            if (p.is_text_sensor) return;
            if (p.attribute && isEntityStateNonNumeric(entityId, appState, p.attribute)) return;
        }

        // Fix #240: Skip calendar widgets as they are complex text sensors (json) handled by the plugin
        if (w.type === "calendar") return;

        const isHaSensor = entityId.includes(".") &&
            !entityId.startsWith("binary_sensor.") &&
            !HA_TEXT_DOMAINS.some(d => entityId.startsWith(d));
        const binaryDomains = ["switch.", "light.", "fan.", "input_boolean.", "cover.", "lock."];
        const isBinaryDomain = binaryDomains.some(d => entityId.startsWith(d));

        if (isHaSensor && !isBinaryDomain) {
            const attribute = (p.attribute || "").trim();
            // Build a unique key: entity + attribute combination
            const entityKey = attribute ? `${entityId}__attr__${attribute}` : entityId;

            if (!seenEntityIds.has(entityKey)) {
                // Safe ID truncated to 63 chars for ESPHome compatibility
                let safeId = attribute
                    ? (entityId + "_" + attribute).replace(/[^a-zA-Z0-9_]/g, "_")
                    : entityId.replace(/[^a-zA-Z0-9_]/g, "_");
                if (safeId.length > 63) safeId = safeId.substring(0, 63);

                if (!seenSensorIds.has(safeId)) {
                    seenEntityIds.add(entityKey);
                    seenSensorIds.add(safeId);
                    numericSensorLinesExtra.push("- platform: homeassistant");
                    numericSensorLinesExtra.push(`  id: ${safeId}`);
                    numericSensorLinesExtra.push(`  entity_id: ${entityId}`);
                    if (attribute) {
                        numericSensorLinesExtra.push(`  attribute: ${attribute}`);
                    }
                    numericSensorLinesExtra.push(`  internal: true`);
                }
            }
        }
    });

    return numericSensorLinesExtra;
};

export const collectTextSensors = (pages, context) => {
    const { seenEntityIds, seenSensorIds, appState } = context;
    const allWidgetsForText = pages.flatMap(p => (p.widgets || []).filter(w => !w.hidden));
    const textSensorLinesExtra = [];

    allWidgetsForText.forEach(w => {
        const condEnt = (w.condition_entity || "").trim();
        const primaryEnt = (w.entity_id || "").trim();
        const secondaryEnt = (w.entity_id_2 || "").trim();
        const p = w.props || {};

        [
            { ent: condEnt, attr: p.attribute },
            { ent: primaryEnt, attr: p.attribute },
            { ent: secondaryEnt, attr: p.attribute2 }
        ].forEach(({ ent, attr }) => {
            if (!ent || p.is_local_sensor) return;

            const isTextHa = HA_TEXT_DOMAINS.some(d => ent.startsWith(d));
            let isStringCond = false;

            // Check if this entity is used in a string condition
            if (ent === condEnt && w.condition_operator !== "range") {
                const state = w.condition_state;
                const stateLower = (state || "").toLowerCase();
                const booleanKeywords = ["on", "off", "true", "false", "online", "offline"];
                if (state && isNaN(Number(state)) && !booleanKeywords.includes(stateLower)) {
                    isStringCond = true;
                }
            }

            const attribute = (attr || "").trim();
            const isNonNumericAttr = (ent === primaryEnt || ent === secondaryEnt) && attribute && isEntityStateNonNumeric(ent, appState, attribute);

            if ((isTextHa || isStringCond || isNonNumericAttr)) {
                const isNested = attribute.includes(".") || attribute.includes("[");
                const rootAttr = isNested ? attribute.split(/[.\[]/)[0] : attribute;

                const entityKey = rootAttr ? `${ent}__attr__${rootAttr}` : ent;

                if (!seenEntityIds.has(entityKey)) {
                    const base = rootAttr ? (ent + "_" + rootAttr) : ent;
                    const safeId = base.replace(/[^a-zA-Z0-9_]/g, "_") + "_txt";

                    if (!seenSensorIds.has(safeId)) {
                        seenEntityIds.add(entityKey);
                        seenSensorIds.add(safeId);
                        textSensorLinesExtra.push("- platform: homeassistant");
                        textSensorLinesExtra.push(`  id: ${safeId}`);
                        textSensorLinesExtra.push(`  entity_id: ${ent}`);
                        if (rootAttr) {
                            textSensorLinesExtra.push(`  attribute: ${rootAttr}`);
                        }
                        textSensorLinesExtra.push(`  internal: true`);
                    }
                }
            }
        });
    });

    return textSensorLinesExtra;
};

export const collectBinarySensors = (pages, context) => {
    const { seenEntityIds, seenSensorIds } = context;
    const allWidgetsForBinary = pages.flatMap(p => (p.widgets || []).filter(w => !w.hidden));
    const binaryDomains = ["binary_sensor.", "switch.", "light.", "input_boolean.", "fan.", "cover.", "vacuum.", "lock."];
    const binarySensorLinesExtra = [];

    allWidgetsForBinary.forEach(w => {
        // Check condition entity
        const condEnt = (w.condition_entity || "").trim();
        // Check primary entity (for buttons, switches, etc.)
        const primaryEnt = (w.entity_id || "").trim();

        [condEnt, primaryEnt].forEach(ent => {
            if (!ent) return;
            const isBinaryHa = binaryDomains.some(d => ent.startsWith(d));

            if (isBinaryHa && !seenEntityIds.has(ent)) {
                const safeId = ent.replace(/[^a-zA-Z0-9_]/g, "_");
                if (!seenSensorIds.has(safeId)) {
                    seenEntityIds.add(ent);
                    seenSensorIds.add(safeId);
                    binarySensorLinesExtra.push("- platform: homeassistant");
                    binarySensorLinesExtra.push(`  id: ${safeId}`);
                    binarySensorLinesExtra.push(`  entity_id: ${ent}`);
                    binarySensorLinesExtra.push(`  internal: true`);
                }
            }
        });
    });

    return binarySensorLinesExtra;
};
