/**
 * @file entity_dedup.js
 * @description Extracts Home Assistant entity deduplication and safe ID generation logic.
 */

export const HA_TEXT_DOMAINS = ["text_sensor.", "weather.", "calendar.", "person.", "device_tracker.", "sun.", "update.", "scene."];
export const HA_BINARY_DOMAINS = ["binary_sensor.", "switch.", "light.", "input_boolean.", "fan.", "cover.", "vacuum.", "lock."];
export const DESIGNER_STATE_TRIGGER_MARKER = "# esphome-designer-state-trigger:";
export const MODE_AWARE_PENDING_TRIGGER_SEPARATOR = "::";
const HA_SWITCH_ENTITY_RE = /^(automation|fan|humidifier|input_boolean|light|remote|siren|switch)\./;
const ACTION_ONLY_BUTTON_DOMAINS = ["button.", "input_button.", "script.", "scene."];

import { isEntityStateNonNumeric, makeSafeId } from '../../utils/export_helpers.js';
import { getSensorPlatformLines } from './mqtt_helpers.js';

export { isEntityStateNonNumeric };

const isBinaryStateTriggerEntity = (entityId) => HA_BINARY_DOMAINS.some(d => entityId.startsWith(d));
const isHomeAssistantSwitchEntity = (entityId) => HA_SWITCH_ENTITY_RE.test(entityId);
const isActionOnlyButtonEntity = (widget, entityId) => {
    const type = String(widget?.type || "").toLowerCase();
    if (type !== "button" && type !== "lvgl_button") return false;
    return ACTION_ONLY_BUTTON_DOMAINS.some((domain) => entityId.startsWith(domain));
};
const isPluginManagedControlEntity = (widget, entityId) => {
    const type = String(widget?.type || "").toLowerCase();
    if (type === "lvgl_slider" && entityId.startsWith("media_player.")) return true;
    return false;
};

const normalizeStateTriggerMode = (entityId, requestedMode = "auto") => {
    const normalized = String(requestedMode || "auto").trim().toLowerCase();
    if (normalized === "on_state") {
        return isBinaryStateTriggerEntity(entityId) ? "on_state" : "on_value";
    }
    if (normalized === "on_value") {
        return "on_value";
    }
    return isBinaryStateTriggerEntity(entityId) ? "on_state" : "on_value";
};

export const getCustomStateTriggerSpec = (widget) => {
    const props = widget?.props || {};
    const entityId = String(props.state_trigger_entity || "").trim();
    const actions = String(props.state_trigger_actions || "").replace(/\r\n/g, '\n').trim();

    if (!entityId || !actions) {
        return null;
    }

    return {
        entityId,
        actions,
        mode: normalizeStateTriggerMode(entityId, props.state_trigger_mode),
        widgetId: String(widget?.id || "").trim()
    };
};

const buildMarkedStateTriggerActions = (widgetId, actions) => {
    const lines = actions.split('\n');
    if (widgetId) {
        lines.unshift(`${DESIGNER_STATE_TRIGGER_MARKER} ${widgetId}`);
    }
    return lines.join('\n');
};

export const buildPendingTriggerLookupKey = (entityId, triggerName) => {
    const trimmedEntityId = String(entityId || "").trim();
    const trimmedTriggerName = String(triggerName || "").trim();

    if (!trimmedEntityId || !trimmedTriggerName) {
        return trimmedEntityId;
    }

    return `${trimmedTriggerName}${MODE_AWARE_PENDING_TRIGGER_SEPARATOR}${trimmedEntityId}`;
};

export const collectCustomStateTriggerActions = (widgets, pendingTriggers) => {
    if (!widgets || !pendingTriggers) return;

    widgets.forEach((widget) => {
        const triggerSpec = getCustomStateTriggerSpec(widget);
        if (!triggerSpec) return;

        const lookupKey = buildPendingTriggerLookupKey(triggerSpec.entityId, triggerSpec.mode);

        if (!pendingTriggers.has(lookupKey)) {
            pendingTriggers.set(lookupKey, new Set());
        }

        pendingTriggers.get(lookupKey).add(
            buildMarkedStateTriggerActions(triggerSpec.widgetId, triggerSpec.actions)
        );
    });
};

export const collectVisibilityTriggers = (widgets, pendingTriggers, displayId, isLvgl) => {
    if (!widgets || !pendingTriggers) return;

    widgets.forEach((widget) => {
        const entityId = (widget.condition_entity || widget.props?.condition_entity || "").trim();
        if (!entityId) return;

        // If it looks like a binary_sensor, use on_state, otherwise on_value
        const isBinary = entityId.startsWith("binary_sensor.") || entityId.includes("_on_off");
        const triggerMode = isBinary ? "on_state" : "on_value";
        const lookupKey = buildPendingTriggerLookupKey(entityId, triggerMode);

        if (!pendingTriggers.has(lookupKey)) {
            pendingTriggers.set(lookupKey, new Set());
        }

        const action = isLvgl
            ? `- lvgl.widget.refresh: ${widget.id}`
            : `- component.update: ${displayId}`;

        pendingTriggers.get(lookupKey).add(action);
    });
};

/**
 * @typedef {{
 *   type?: string,
 *   hidden?: boolean,
 *   entity_id?: string,
 *   entity_id_2?: string,
 *   condition_entity?: string,
 *   condition_operator?: string,
 *   condition_state?: string,
 *   condition_value?: string,
 *   props?: Record<string, any>
 * }} DedupWidget
 */

/**
 * @typedef {{ widgets?: DedupWidget[] }} DedupPage
 */

/**
 * @typedef {{
 *   seenEntityIds: Set<string>,
 *   seenSensorIds: Set<string>,
 *   appState?: any
 * }} DedupContext
 */

/**
 * @param {DedupPage[]} pages
 * @param {DedupContext} context
 * @returns {string[]}
 */
export const collectNumericSensors = (pages, context) => {
    const { seenEntityIds, seenSensorIds, appState } = context;
    /** @type {DedupWidget[]} */
    const allWidgetsForSensors = pages.flatMap((p) => (p.widgets || []).filter((w) => !w.hidden));
    /** @type {string[]} */
    const numericSensorLinesExtra = [];

    allWidgetsForSensors.forEach((w) => {
        let entityId = (w.entity_id || "").trim();
        const p = w.props || {};
        const stateTriggerSpec = getCustomStateTriggerSpec(w);

        if (entityId && !p.is_local_sensor) {
            if (isActionOnlyButtonEntity(w, entityId)) return;
            if (isPluginManagedControlEntity(w, entityId)) return;

            // Numeric sensor types that should be prefixed with sensor. if domain is missing
            const numericSensorTypes = ["progress_bar", "sensor_text", "graph", "battery_icon", "wifi_signal", "ondevice_temperature", "ondevice_humidity"];
            if (w.type && numericSensorTypes.includes(w.type) && !entityId.includes(".") && !entityId.toLowerCase().startsWith("mqtt:")) {
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

            const isHaSensor = (entityId.includes(".") || entityId.toLowerCase().startsWith("mqtt:")) &&
                !HA_TEXT_DOMAINS.some(d => entityId.startsWith(d));
            const isBinaryDomain = HA_BINARY_DOMAINS.some(d => entityId.startsWith(d));

            if (isHaSensor && !isBinaryDomain) {
                const attribute = (p.attribute || "").trim();
                // Build a unique key: entity + attribute combination
                const entityKey = attribute ? `${entityId}__attr__${attribute}` : entityId;

                if (!seenEntityIds.has(entityKey)) {
                    // Safe ID truncated for ESPHome compatibility
                    const safeId = makeSafeId(entityId, attribute);

                    if (!seenSensorIds.has(safeId)) {
                        seenEntityIds.add(entityKey);
                        seenSensorIds.add(safeId);
                        numericSensorLinesExtra.push(...getSensorPlatformLines(w, entityId, safeId, attribute));
                    }
                }
            }
        }

        // Register entity_id_2 (secondary entity) for numeric sensor platform declaration
        let entityId2 = (w.entity_id_2 || "").trim();
        if (entityId2 && !p.is_local_sensor && w.type === "sensor_text" && !p.is_text_sensor) {
            if (!entityId2.includes(".") && !entityId2.toLowerCase().startsWith("mqtt:")) {
                entityId2 = `sensor.${entityId2}`;
            }
            if (p.attribute2 && isEntityStateNonNumeric(entityId2, appState, p.attribute2)) {
                // secondary attribute is non-numeric – handled by collectTextSensors
            } else {
                const isHaSensor2 = (entityId2.includes(".") || entityId2.toLowerCase().startsWith("mqtt:")) &&
                    !HA_TEXT_DOMAINS.some(d => entityId2.startsWith(d));
                const isBinaryDomain2 = HA_BINARY_DOMAINS.some(d => entityId2.startsWith(d));
                if (isHaSensor2 && !isBinaryDomain2) {
                    const attribute2 = (p.attribute2 || "").trim();
                    const entityKey2 = attribute2 ? `${entityId2}__attr__${attribute2}` : entityId2;
                    if (!seenEntityIds.has(entityKey2)) {
                        const safeId2 = makeSafeId(entityId2, attribute2);
                        if (!seenSensorIds.has(safeId2)) {
                            seenEntityIds.add(entityKey2);
                            seenSensorIds.add(safeId2);
                            numericSensorLinesExtra.push(...getSensorPlatformLines(w, entityId2, safeId2, attribute2));
                        }
                    }
                }
            }
        }

        if (
            stateTriggerSpec &&
            stateTriggerSpec.mode === "on_value" &&
            !HA_TEXT_DOMAINS.some(d => stateTriggerSpec.entityId.startsWith(d)) &&
            !stateTriggerSpec.entityId.toLowerCase().startsWith("mqtt:") &&
            !isBinaryStateTriggerEntity(stateTriggerSpec.entityId)
        ) {
            const entityKey = stateTriggerSpec.entityId;
            if (!seenEntityIds.has(entityKey)) {
                const safeId = makeSafeId(stateTriggerSpec.entityId);

                if (!seenSensorIds.has(safeId)) {
                    seenEntityIds.add(entityKey);
                    seenSensorIds.add(safeId);
                    numericSensorLinesExtra.push(
                        ...getSensorPlatformLines({ ...w, props: {} }, stateTriggerSpec.entityId, safeId, "")
                    );
                }
            }
        }
    });

    return numericSensorLinesExtra;
};

/**
 * @param {DedupPage[]} pages
 * @param {DedupContext} context
 * @returns {string[]}
 */
export const collectTextSensors = (pages, context) => {
    const { seenEntityIds, seenSensorIds, appState } = context;
    /** @type {DedupWidget[]} */
    const allWidgetsForText = pages.flatMap((p) => (p.widgets || []).filter((w) => !w.hidden));
    /** @type {string[]} */
    const textSensorLinesExtra = [];

    allWidgetsForText.forEach((w) => {
        const condEnt = (w.condition_entity || "").trim();
        const primaryEnt = (w.entity_id || "").trim();
        const secondaryEnt = (w.entity_id_2 || "").trim();
        const p = w.props || {};
        const stateTriggerSpec = getCustomStateTriggerSpec(w);

        [
            { ent: condEnt, attr: p.attribute },
            { ent: primaryEnt, attr: p.attribute },
            { ent: secondaryEnt, attr: p.attribute2 }
        ].forEach(({ ent, attr }) => {
            if (!ent || p.is_local_sensor) return;
            if (isActionOnlyButtonEntity(w, ent)) return;
            if (isPluginManagedControlEntity(w, ent)) return;

            const isTextHa = HA_TEXT_DOMAINS.some(d => ent.startsWith(d)) || ent.toLowerCase().startsWith("mqtt:");
            let isStringCond = false;

            // Non-binary entities using string comparisons need a text_sensor ID.
            if (ent === condEnt && w.condition_operator !== "range") {
                const state = w.condition_state !== undefined && w.condition_state !== "" ? w.condition_state : w.condition_value;
                const isBinaryConditionEntity = HA_BINARY_DOMAINS.some(d => ent.startsWith(d));
                if (!isBinaryConditionEntity && state && isNaN(Number(state))) {
                    isStringCond = true;
                }
            }

            const attribute = (attr || "").trim();
            const isNonNumericAttr = (ent === primaryEnt || ent === secondaryEnt) && attribute && isEntityStateNonNumeric(ent, appState, attribute);

            if ((isTextHa || isStringCond || isNonNumericAttr)) {
                const isNested = attribute.includes(".") || attribute.includes("[");
                const rootAttr = isNested ? attribute.split(/[.[]/)[0] : attribute;

                const entityKey = rootAttr ? `${ent}__attr__${rootAttr}` : ent;

                if (!seenEntityIds.has(entityKey)) {
                    const safeId = makeSafeId(ent, rootAttr, "_txt");

                    if (!seenSensorIds.has(safeId)) {
                        seenEntityIds.add(entityKey);
                        seenSensorIds.add(safeId);
                        textSensorLinesExtra.push(...getSensorPlatformLines(w, ent, safeId, rootAttr));
                    }
                }
            }
        });

        if (
            stateTriggerSpec &&
            stateTriggerSpec.mode === "on_value" &&
            (HA_TEXT_DOMAINS.some(d => stateTriggerSpec.entityId.startsWith(d)) || stateTriggerSpec.entityId.toLowerCase().startsWith("mqtt:"))
        ) {
            const entityKey = stateTriggerSpec.entityId;

            if (!seenEntityIds.has(entityKey)) {
                const safeId = makeSafeId(stateTriggerSpec.entityId, "", "_txt");

                if (!seenSensorIds.has(safeId)) {
                    seenEntityIds.add(entityKey);
                    seenSensorIds.add(safeId);
                    textSensorLinesExtra.push(
                        ...getSensorPlatformLines({ ...w, props: {} }, stateTriggerSpec.entityId, safeId, "")
                    );
                }
            }
        }
    });

    return textSensorLinesExtra;
};

/**
 * @param {DedupPage[]} pages
 * @param {DedupContext} context
 * @returns {string[]}
 */
export const collectBinarySensors = (pages, context) => {
    const { seenEntityIds, seenSensorIds } = context;
    /** @type {DedupWidget[]} */
    const allWidgetsForBinary = pages.flatMap((p) => (p.widgets || []).filter((w) => !w.hidden));
    /** @type {string[]} */
    const binarySensorLinesExtra = [];

    allWidgetsForBinary.forEach((w) => {
        // Check condition entity
        const condEnt = (w.condition_entity || w.props?.condition_entity || "").trim();
        // Check primary entity (for buttons, switches, etc.)
        const primaryEnt = (w.entity_id || "").trim();
        const stateTriggerSpec = getCustomStateTriggerSpec(w);

        [condEnt, primaryEnt].forEach((ent) => {
            if (!ent) return;
            const isBinaryHa = HA_BINARY_DOMAINS.some(d => ent.startsWith(d)) || ent.toLowerCase().startsWith("mqtt:");
            const hasMqttSource = ent.toLowerCase().startsWith("mqtt:") || !!(w.props?.mqtt_topic || "").trim();
            const isSwitchHa = isHomeAssistantSwitchEntity(ent) && !hasMqttSource;

            if (isBinaryHa && !isSwitchHa && !seenEntityIds.has(ent)) {
                const safeId = makeSafeId(ent);
                if (!seenSensorIds.has(safeId)) {
                    seenEntityIds.add(ent);
                    seenSensorIds.add(safeId);
                    binarySensorLinesExtra.push(...getSensorPlatformLines(w, ent, safeId, ""));
                }
            }
        });

        if (stateTriggerSpec && stateTriggerSpec.mode === "on_state") {
            const ent = stateTriggerSpec.entityId;
            if (!isHomeAssistantSwitchEntity(ent) && !seenEntityIds.has(ent)) {
                const safeId = makeSafeId(ent);
                if (!seenSensorIds.has(safeId)) {
                    seenEntityIds.add(ent);
                    seenSensorIds.add(safeId);
                    binarySensorLinesExtra.push(
                        ...getSensorPlatformLines({ ...w, props: {} }, ent, safeId, "")
                    );
                }
            }
        }
    });

    return binarySensorLinesExtra;
};

/**
 * @param {DedupPage[]} pages
 * @param {DedupContext} context
 * @returns {string[]}
 */
export const collectHomeAssistantSwitches = (pages, context) => {
    const { seenEntityIds, seenSensorIds } = context;
    /** @type {DedupWidget[]} */
    const allWidgets = pages.flatMap((p) => (p.widgets || []).filter((w) => !w.hidden));
    /** @type {string[]} */
    const switchLines = [];

    allWidgets.forEach((w) => {
        const condEnt = (w.condition_entity || w.props?.condition_entity || "").trim();
        const primaryEnt = (w.entity_id || "").trim();
        const stateTriggerSpec = getCustomStateTriggerSpec(w);
        const entities = [primaryEnt];

        if (condEnt) {
            entities.push(condEnt);
        }

        if (stateTriggerSpec && stateTriggerSpec.mode === "on_state") {
            entities.push(stateTriggerSpec.entityId);
        }

        entities.forEach((ent) => {
            const hasMqttSource = ent.toLowerCase().startsWith("mqtt:") || !!(w.props?.mqtt_topic || "").trim();
            if (!ent || hasMqttSource || !isHomeAssistantSwitchEntity(ent) || seenEntityIds.has(ent)) return;

            const safeId = makeSafeId(ent);
            if (seenSensorIds.has(safeId)) return;

            seenEntityIds.add(ent);
            seenSensorIds.add(safeId);
            switchLines.push(...getSensorPlatformLines(w, ent, safeId, ""));
        });
    });

    return switchLines;
};
