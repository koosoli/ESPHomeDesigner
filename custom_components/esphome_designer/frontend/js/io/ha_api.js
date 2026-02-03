import { AppState } from '../core/state.js';
import { emit, EVENTS } from '../core/events.js';
import { getHaToken, hasHaBackend, HA_API_BASE } from '../utils/env.js';
import { loadLayoutIntoState } from './yaml_import.js';
import { Logger } from '../utils/logger.js';

// --- HA Entity States Cache ---
export let entityStatesCache = [];
let entityStatesFetchInProgress = false;
let haEntitiesLoaded = false;
let haEntitiesLoadError = false;

/**
 * Gets the headers required for Home Assistant API requests.
 * @returns {Object} Headers object.
 */
export function getHaHeaders() {
    const headers = {
        "Content-Type": "application/json"
    };
    const token = getHaToken();
    if (token && token.trim() !== "" && token !== "null") {
        headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
}

// --- Entity Datalist for Autocomplete ---
export const ENTITY_DATALIST_ID = 'entity-datalist-global';
let entityDatalistEl = null;

export function ensureEntityDatalist() {
    if (!entityDatalistEl) {
        entityDatalistEl = document.getElementById(ENTITY_DATALIST_ID);
        if (!entityDatalistEl) {
            entityDatalistEl = document.createElement('datalist');
            entityDatalistEl.id = ENTITY_DATALIST_ID;
            document.body.appendChild(entityDatalistEl);
        }
    }
    return entityDatalistEl;
}

function updateEntityDatalist(entities) {
    const datalist = ensureEntityDatalist();
    datalist.innerHTML = '';

    if (!entities || entities.length === 0) return;

    entities.forEach(e => {
        const opt = document.createElement('option');
        opt.value = e.entity_id;
        opt.label = e.name || e.entity_id;
        datalist.appendChild(opt);
    });
    Logger.log(`[EntityDatalist] Updated with ${entities.length} entities`);
}

/**
 * Fetches entity states from Home Assistant.
 * Supports both integrated mode (custom component API) and standalone mode (HA REST API).
 * Emits EVENTS.ENTITIES_LOADED on success.
 * @returns {Promise<Array>} The list of entities or empty array.
 */
export async function fetchEntityStates() {
    if (!hasHaBackend()) {
        return [];
    }
    if (entityStatesFetchInProgress) return entityStatesCache;

    entityStatesFetchInProgress = true;
    try {
        // Use a timeout to avoid hanging forever - 10 seconds for cross-network requests
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000);

        // Determine which API to use
        const isStandaloneMode = HA_API_BASE.includes('api/esphome_designer') &&
            !window.location.pathname.includes('esphome-designer');

        let apiUrl;
        let useNativeHaApi = false;

        // Check if we have an LLAT token - if so, we might be in external/standalone mode
        const token = getHaToken();

        // First try the custom component endpoint
        apiUrl = `${HA_API_BASE}/entities?domains=sensor,binary_sensor,weather,light,switch,fan,cover,climate,media_player,input_number,number,input_boolean,input_text,input_select,button,input_button`;

        Logger.log("[EntityStates] Fetching from:", apiUrl);

        let resp;
        try {
            resp = await fetch(apiUrl, {
                headers: getHaHeaders(),
                signal: controller.signal
            });
        } catch (fetchErr) {
            // If custom component endpoint fails and we have a token, try native HA API
            if (token && HA_API_BASE) {
                const haBaseUrl = HA_API_BASE.replace('/api/esphome_designer', '');
                apiUrl = `${haBaseUrl}/api/states`;
                Logger.log("[EntityStates] Custom endpoint failed, trying native HA API:", apiUrl);
                useNativeHaApi = true;
                resp = await fetch(apiUrl, {
                    headers: getHaHeaders(),
                    signal: controller.signal
                });
            } else {
                throw fetchErr;
            }
        }

        clearTimeout(timeoutId);

        if (!resp.ok) {
            Logger.warn("[EntityStates] Failed to fetch:", resp.status);
            haEntitiesLoadError = true;
            return [];
        }

        let entities = await resp.json();

        // Transform native HA API response to our format
        if (useNativeHaApi && Array.isArray(entities)) {
            // Native HA /api/states returns full state objects
            // Filter to useful domains
            const allowedDomains = ['sensor', 'binary_sensor', 'weather', 'light', 'switch',
                'fan', 'cover', 'climate', 'media_player', 'input_number',
                'number', 'input_boolean', 'input_text', 'input_select',
                'button', 'input_button'];
            entities = entities
                .filter(e => {
                    const domain = e.entity_id?.split('.')[0];
                    return allowedDomains.includes(domain);
                })
                .map(e => ({
                    entity_id: e.entity_id,
                    name: e.attributes?.friendly_name || e.entity_id,
                    state: e.state,
                    unit: e.attributes?.unit_of_measurement,
                    attributes: e.attributes || {}
                }));
        }

        if (!Array.isArray(entities)) {
            Logger.warn("[EntityStates] Invalid response format");
            haEntitiesLoadError = true;
            return [];
        }

        Logger.log(`[EntityStates] Received ${entities.length} entities`);

        // Cache as array of objects for easier searching/filtering
        entityStatesCache = entities.map(entity => {
            const formatted = entity.unit ? `${entity.state} ${entity.unit}` : entity.state;
            return {
                entity_id: entity.entity_id,
                name: entity.name || entity.entity_id,
                state: entity.state,
                unit: entity.unit,
                attributes: entity.attributes || {},
                formatted: formatted
            };
        });

        haEntitiesLoaded = true;
        haEntitiesLoadError = false;
        Logger.log(`[EntityStates] Cached ${entityStatesCache.length} entity states`);

        // Also populate AppState.entityStates as lookup object for render functions
        if (AppState) {
            AppState.entityStates = {};
            entityStatesCache.forEach(e => {
                AppState.entityStates[e.entity_id] = e;
            });
            Logger.log(`[EntityStates] Populated AppState.entityStates with ${Object.keys(AppState.entityStates).length} entries`);
        }

        // Update autocomplete datalist for entity inputs
        updateEntityDatalist(entityStatesCache);

        emit(EVENTS.ENTITIES_LOADED, entityStatesCache);

        return entityStatesCache;
    } catch (err) {
        if (err.name === 'AbortError') {
            Logger.warn("[EntityStates] Request timed out after 10 seconds");
        } else {
            Logger.warn("[EntityStates] Error fetching:", err);
        }
        haEntitiesLoadError = true;
        return [];
    } finally {
        entityStatesFetchInProgress = false;
    }
}

/**
 * Gets the cached state for a specific entity.
 * @param {string} entityId 
 * @returns {string|null} Formatted state or null if not found.
 */
export function getEntityState(entityId) {
    const entry = entityStatesCache.find(e => e.entity_id === entityId);
    return entry ? entry.formatted : null;
}

/**
 * Gets the cached attributes for a specific entity.
 * @param {string} entityId 
 * @returns {Object|null} Attributes object or null if not found.
 */
export function getEntityAttributes(entityId) {
    const entry = entityStatesCache.find(e => e.entity_id === entityId);
    return entry ? entry.attributes : null;
}

/**
 * Fetches historical data for an entity from Home Assistant.
 * Uses the backend proxy endpoint to avoid auth issues.
 * NOTE: This is only used for graph preview in the editor. Not critical.
 * @param {string} entityId 
 * @param {string} duration - Duration string like "24h", "1h", etc.
 * @returns {Promise<Array>} List of state objects from HA history.
 */
let historyFetchWarned = false;
export async function fetchEntityHistory(entityId, duration = "24h") {
    if (!hasHaBackend() || !entityId) return [];

    try {
        // Use the backend proxy endpoint which handles auth internally
        const apiUrl = `${HA_API_BASE}/history/${encodeURIComponent(entityId)}?duration=${encodeURIComponent(duration)}`;

        const resp = await fetch(apiUrl, {
            headers: getHaHeaders()
        });

        if (!resp.ok) {
            const errorText = await resp.text().catch(() => "Unknown error");
            // Only log once to avoid console spam - history is non-critical (preview only)
            if (!historyFetchWarned) {
                Logger.log(`[EntityHistory] History fetch failed for ${entityId}: ${errorText}`);
                historyFetchWarned = true;
            }
            return [];
        }

        const data = await resp.json();

        // The proxy returns an array of state objects directly
        if (Array.isArray(data)) {
            return data;
        }

        return [];
    } catch (err) {
        // Silently fail - history is only for editor preview
        return [];
    }
}

/**
 * Ensures entities are loaded, fetching if necessary.
 * @returns {Promise<Array>} The list of entities.
 */
export async function loadHaEntitiesIfNeeded() {
    if (hasHaBackend()) {
        if (entityStatesCache.length > 0) {
            return entityStatesCache;
        }
        return fetchEntityStates();
    }
    return [];
}

/**
 * Loads the layout from the Home Assistant backend.
 * Will load the last saved/active layout if available.
 */
export async function loadLayoutFromBackend() {
    if (!hasHaBackend()) {
        Logger.warn("Cannot load layout from backend: No HA backend detected.");
        return;
    }

    try {
        // First, check if there's a last active layout to load
        let layoutId = null;
        try {
            const listResp = await fetch(`${HA_API_BASE}/layouts`, {
                headers: getHaHeaders()
            });
            if (listResp.ok) {
                const listData = await listResp.json();
                Logger.log(`[loadLayoutFromBackend] Available layouts:`, listData.layouts?.map(l => l.id));
                Logger.log(`[loadLayoutFromBackend] Last active layout ID from backend: ${listData.last_active_layout_id}`);

                if (listData.last_active_layout_id) {
                    // Verify the last active layout still exists
                    const exists = listData.layouts?.some(l => l.id === listData.last_active_layout_id);
                    if (exists) {
                        layoutId = listData.last_active_layout_id;
                        Logger.log(`[loadLayoutFromBackend] Loading last active layout: ${layoutId}`);
                    } else {
                        Logger.warn(`[loadLayoutFromBackend] Last active layout '${listData.last_active_layout_id}' no longer exists`);
                    }
                }

                if (!layoutId && listData.layouts && listData.layouts.length > 0) {
                    // Fallback to first layout
                    layoutId = listData.layouts[0].id;
                    Logger.log(`[loadLayoutFromBackend] No valid last active, using first layout: ${layoutId}`);
                }
            }
        } catch (listErr) {
            Logger.warn("[loadLayoutFromBackend] Could not fetch layouts list:", listErr);
        }

        // Load the specific layout if we have an ID, otherwise use default /layout endpoint
        let resp;
        if (layoutId) {
            resp = await fetch(`${HA_API_BASE}/layouts/${layoutId}`, {
                headers: getHaHeaders()
            });
        } else {
            resp = await fetch(`${HA_API_BASE}/layout`, {
                headers: getHaHeaders()
            });
        }

        if (!resp.ok) {
            throw new Error(`Failed to load layout: ${resp.status}`);
        }
        const layout = await resp.json();

        // CRITICAL: Ensure device_id is set in the layout before loading
        if (!layout.device_id && layoutId) {
            layout.device_id = layoutId;
        }

        Logger.log(`[loadLayoutFromBackend] Loaded layout '${layout.device_id || layoutId || 'default'}':`, {
            name: layout.name,
            device_model: layout.device_model,
            pages: layout.pages?.length,
            widgets: layout.pages?.reduce((sum, p) => sum + (p.widgets?.length || 0), 0),
            renderingMode: layout.renderingMode || layout.rendering_mode  // DEBUG: Track loaded renderingMode
        });

        // Set the current layout ID BEFORE loading into state
        if (AppState && (layout.device_id || layoutId)) {
            AppState.setCurrentLayoutId(layout.device_id || layoutId);
        }

        // Use imported loadLayoutIntoState if possible
        if (typeof loadLayoutIntoState === 'function') {
            loadLayoutIntoState(layout);
        } else {
            Logger.error("[loadLayoutFromBackend] loadLayoutIntoState function missing!");
        }

        emit(EVENTS.LAYOUT_IMPORTED, layout);

    } catch (err) {
        Logger.error("Error loading layout from backend:", err);
        import('../utils/dom.js').then(dom => dom.showToast("Error loading layout from backend", 5000, "error"));
    }
}

/**
 * Saves the current layout to the Home Assistant backend.
 * Sends the AppState layout data (pages, settings) to the current layout.
 * @returns {Promise<boolean>} True if successful, false otherwise.
 */
let saveInProgress = false;
let saveQueued = false;

export async function saveLayoutToBackend() {
    if (!hasHaBackend()) return false;

    // Prevent concurrent saves - if a save is in progress, queue another one
    if (saveInProgress) {
        saveQueued = true;
        Logger.log("[saveLayoutToBackend] Save already in progress, queuing...");
        return false;
    }

    // Get layout data from AppState
    if (!AppState) {
        throw new Error("AppState not available");
    }

    // Get current layout ID - default to reterminal_e1001 if not set
    const layoutId = AppState.currentLayoutId || "reterminal_e1001";

    // Get device model - prefer settings (which user can change) over top-level
    const deviceModel = AppState.settings.device_model || AppState.deviceModel || "reterminal_e1001";

    const payload = AppState.getPagesPayload();

    const layoutData = {
        ...payload,
        device_id: layoutId,
        name: AppState.deviceName || "Layout 1",
        device_model: deviceModel,
        deviceName: AppState.deviceName || "Layout 1"
    };

    saveInProgress = true;
    saveQueued = false;

    try {
        Logger.log(`[saveLayoutToBackend] Saving to layout '${layoutId}':`, {
            device_model: deviceModel,
            pages: layoutData.pages?.length,
            widgets: layoutData.pages?.reduce((sum, p) => sum + (p.widgets?.length || 0), 0),
            renderingMode: layoutData.renderingMode  // DEBUG: Track renderingMode
        });

        // Use AbortController for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

        // Use the layouts/{id} endpoint to save to the specific layout
        const resp = await fetch(`${HA_API_BASE}/layouts/${layoutId}`, {
            method: "POST",
            headers: getHaHeaders(),
            body: JSON.stringify(layoutData),
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!resp.ok) {
            const data = await resp.json().catch(() => ({}));
            throw new Error(data.message || data.error || `Save failed: ${resp.status}`);
        }
        Logger.log(`[saveLayoutToBackend] Layout '${layoutId}' saved successfully`);
        return true;
    } catch (err) {
        // Gracefully handle network errors (ERR_EMPTY_RESPONSE, timeouts, etc.)
        // These often happen when the backend is unreachable or the save actually succeeds but response is lost
        // We suppress logging for expected network failures to reduce console noise
        if (err.name === 'AbortError') {
            // Timeout - data was likely sent, assume success
            return true;
        }
        if (err.message?.includes('Failed to fetch') ||
            err.message?.includes('NetworkError') ||
            err.message?.includes('net::ERR_') ||
            err.message?.includes('ERR_EMPTY_RESPONSE') ||
            err.message?.includes('Load failed')) {
            // Network error - backend likely unreachable, fail silently
            // Don't log since browser already shows the network error
            return false;
        }
        // Only log unexpected errors
        Logger.error("Failed to save layout to backend:", err);
        throw err;
    } finally {
        saveInProgress = false;

        // If another save was queued while we were saving, trigger it after a short delay
        if (saveQueued) {
            setTimeout(() => {
                saveLayoutToBackend().catch(() => { }); // Fire and forget
            }, 500);
        }
    }
}

/**
 * Imports a snippet via the Home Assistant backend.
 * @param {string} yaml - The YAML snippet to import.
 * @returns {Promise<Object>} The parsed layout object.
 */
export async function importSnippetBackend(yaml) {
    if (!hasHaBackend()) throw new Error("No backend");

    const resp = await fetch(`${HA_API_BASE}/import_snippet`, {
        method: "POST",
        headers: getHaHeaders(),
        body: JSON.stringify({ yaml })
    });

    if (!resp.ok) {
        const data = await resp.json().catch(() => ({}));
        throw new Error(data.message || data.error || `Import failed with status ${resp.status}`);
    }

    return await resp.json();
}

// Init function to be called by main
export function initHaApi() {
    if (hasHaBackend()) {
        fetchEntityStates();
        setInterval(fetchEntityStates, 30000);
    }
}
