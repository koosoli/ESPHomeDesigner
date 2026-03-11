/**
 * Shared utility functions for ESPHome YAML export.
 * Centralizes logic previously duplicated across multiple plugins.
 */
import { AppState } from '../core/state';

/**
 * Creates a safe ESPHome ID from an entity ID and optional attribute/suffix.
 * @param {string} eid - Entity ID (e.g., 'sensor.temperature')
 * @param {string} [attr] - Optional attribute name
 * @param {string} [suffix] - Optional suffix (e.g., '_txt')
 * @returns {string} Safe ESPHome ID
 */
export function makeSafeId(eid, attr, suffix = "") {
    if (!eid) return "";
    let base = attr ? (eid + "_" + attr) : eid;
    // Replace non-alphanumeric with underscore and limit length
    let safe = base.replace(/[^a-z0-9_]/gi, "_").toLowerCase();

    // ESPHome IDs have a total length limit of 63 characters.
    const maxBaseLen = 63 - suffix.length;
    if (safe.length > maxBaseLen) safe = safe.substring(0, maxBaseLen);

    return safe + suffix;
}

/**
 * Escapes common characters for printf-style format strings in ESPHome.
 * @param {string} str - String to escape
 * @returns {string} Escaped string
 */
export function escapeFmt(str) {
    if (!str) return "";
    return str.replace(/%/g, "%%");
}

/**
 * Helper to check if an entity's current state (or a specific attribute) is non-numeric
 * Returns true if the value is explicitly non-numeric.
 * Returns false if numeric OR if missing/empty (safe fallback for registering as numeric sensor).
 * @param {string} eid Entity ID
 * @param {any} [appState] Optional appState to read from (defaults to AppState)
 * @param {string|null} [attr] Optional attribute name
 * @returns {boolean}
 */
export function isEntityStateNonNumeric(eid, appState = null, attr = null) {
    // @ts-ignore
    const state = appState || AppState;
    if (!eid || !state?.entityStates) return false;
    const entityObj = state.entityStates[eid];
    if (!entityObj) return false;

    const val = attr ? entityObj.attributes?.[attr] : entityObj.state;
    if (val === undefined || val === null) return false;

    const str = String(val).trim();
    if (str === "") return false;

    // Strict number check: Number("25") -> 25, Number("hello") -> NaN
    return isNaN(Number(str));
}

/**
 * Derives the ESPHome variable name for an entity.
 * @param {string} eid - Entity ID
 * @param {string} [attr] - Optional attribute
 * @param {boolean} [isText] - Whether it's a text sensor
 * @returns {string} Variable name
 */
export function getVarName(eid, attr, isText) {
    return makeSafeId(eid, attr, isText ? "_txt" : "_val");
}
