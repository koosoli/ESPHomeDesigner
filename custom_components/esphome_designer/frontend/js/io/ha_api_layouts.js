import { AppState } from '../core/state';
import { emit, EVENTS } from '../core/events.js';
import { hasHaBackend, HA_API_BASE } from '../utils/env.js';
import { showToast } from '../utils/dom.js';
import { loadLayoutIntoState } from './yaml_import';
import { Logger } from '../utils/logger.js';
import { getHaHeaders, haFetch } from './ha_api.js';

/**
 * Loads the most relevant layout from the Home Assistant backend into AppState.
 * @returns {Promise<void>}
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
            const listResp = await haFetch(`${HA_API_BASE}/layouts`, {
                headers: getHaHeaders()
            });
            if (listResp.ok) {
                const listData = await listResp.json();
                Logger.log(`[loadLayoutFromBackend] Available layouts:`, listData.layouts?.map((/** @type {{ id?: string }} */ l) => l.id));
                Logger.log(`[loadLayoutFromBackend] Last active layout ID from backend: ${listData.last_active_layout_id}`);

                if (listData.last_active_layout_id) {
                    // Verify the last active layout still exists
                    const exists = listData.layouts?.some((/** @type {{ id?: string }} */ l) => l.id === listData.last_active_layout_id);
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
            resp = await haFetch(`${HA_API_BASE}/layouts/${layoutId}`, {
                headers: getHaHeaders()
            });
        } else {
            resp = await haFetch(`${HA_API_BASE}/layout`, {
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
            widgets: layout.pages?.reduce((/** @type {number} */ sum, /** @type {{ widgets?: any[] }} */ p) => sum + (p.widgets?.length || 0), 0),
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
        showToast("Error loading layout from backend", "error", 5000);
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
            widgets: layoutData.pages?.reduce((/** @type {number} */ sum, /** @type {{ widgets?: any[] }} */ p) => sum + (p.widgets?.length || 0), 0),
            renderingMode: layoutData.renderingMode  // DEBUG: Track renderingMode
        });

        // Use AbortController for timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

        // Use the layouts/{id} endpoint to save to the specific layout
        const resp = await haFetch(`${HA_API_BASE}/layouts/${layoutId}`, {
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
        const error = err instanceof Error ? err : new Error(String(err));
        // Gracefully handle network errors (ERR_EMPTY_RESPONSE, timeouts, etc.)
        // These often happen when the backend is unreachable or the save actually succeeds but response is lost
        // We suppress logging for expected network failures to reduce console noise
        if (error.name === 'AbortError') {
            // Timeout - data was likely sent, assume success
            return true;
        }
        if (error.message.includes('Failed to fetch') ||
            error.message.includes('NetworkError') ||
            error.message.includes('net::ERR_') ||
            error.message.includes('ERR_EMPTY_RESPONSE') ||
            error.message.includes('Load failed')) {
            // Network error - backend likely unreachable, fail silently
            // Don't log since browser already shows the network error
            return false;
        }
        // Only log unexpected errors
        Logger.error("Failed to save layout to backend:", error);
        throw error;
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
 * @returns {Promise<any>} The parsed layout object.
 */
export async function importSnippetBackend(yaml) {
    if (!hasHaBackend()) throw new Error("No backend");

    const resp = await haFetch(`${HA_API_BASE}/import_snippet`, {
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

