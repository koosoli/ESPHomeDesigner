// --- HA Entity States Cache ---
let entityStatesCache = [];
let entityStatesFetchInProgress = false;
let haEntitiesLoaded = false;
let haEntitiesLoadError = false;

/**
 * Gets the headers required for Home Assistant API requests.
 * @returns {Object} Headers object.
 */
function getHaHeaders() {
    const headers = {
        "Content-Type": "application/json"
    };
    const token = getHaToken();
    if (token) {
        headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
}

// --- Entity Datalist for Autocomplete ---
const ENTITY_DATALIST_ID = 'entity-datalist-global';
let entityDatalistEl = null;

function ensureEntityDatalist() {
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
    console.log(`[EntityDatalist] Updated with ${entities.length} entities`);
}

// Expose globally for properties panel
window.ENTITY_DATALIST_ID = ENTITY_DATALIST_ID;
window.ensureEntityDatalist = ensureEntityDatalist;

/**
 * Fetches entity states from Home Assistant.
 * Emits EVENTS.ENTITIES_LOADED on success.
 * @returns {Promise<Array>} The list of entities or empty array.
 */
async function fetchEntityStates() {
    if (!hasHaBackend()) {
        console.log("[EntityStates] No HA backend detected");
        return [];
    }
    if (entityStatesFetchInProgress) return entityStatesCache;

    entityStatesFetchInProgress = true;
    try {
        console.log("[EntityStates] Fetching from:", `${HA_API_BASE}/entities`);
        const resp = await fetch(`${HA_API_BASE}/entities?domains=sensor,binary_sensor,weather,switch,input_boolean,input_number,input_select,input_text,button,input_button`, {
            headers: getHaHeaders()
        });
        if (!resp.ok) {
            console.warn("[EntityStates] Failed to fetch:", resp.status);
            haEntitiesLoadError = true;
            return [];
        }
        const entities = await resp.json();
        if (!Array.isArray(entities)) {
            console.warn("[EntityStates] Invalid response format");
            haEntitiesLoadError = true;
            return [];
        }

        console.log(`[EntityStates] Received ${entities.length} entities`);

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
        console.log(`[EntityStates] Cached ${entityStatesCache.length} entity states`);

        // Also populate AppState.entityStates as lookup object for render functions
        if (window.AppState) {
            window.AppState.entityStates = {};
            entityStatesCache.forEach(e => {
                window.AppState.entityStates[e.entity_id] = e;
            });
            console.log(`[EntityStates] Populated AppState.entityStates with ${Object.keys(window.AppState.entityStates).length} entries`);
        }

        // Update autocomplete datalist for entity inputs
        updateEntityDatalist(entityStatesCache);

        emit(EVENTS.ENTITIES_LOADED, entityStatesCache);

        return entityStatesCache;
    } catch (err) {
        console.warn("[EntityStates] Error fetching:", err);
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
function getEntityState(entityId) {
    const entry = entityStatesCache.find(e => e.entity_id === entityId);
    return entry ? entry.formatted : null;
}

/**
 * Gets the cached attributes for a specific entity.
 * @param {string} entityId 
 * @returns {Object|null} Attributes object or null if not found.
 */
function getEntityAttributes(entityId) {
    const entry = entityStatesCache.find(e => e.entity_id === entityId);
    return entry ? entry.attributes : null;
}

/**
 * Ensures entities are loaded, fetching if necessary.
 * @returns {Promise<Array>} The list of entities.
 */
async function loadHaEntitiesIfNeeded() {
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
async function loadLayoutFromBackend() {
    if (!hasHaBackend()) {
        console.warn("Cannot load layout from backend: No HA backend detected.");
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
                console.log(`[loadLayoutFromBackend] Available layouts:`, listData.layouts?.map(l => l.id));
                console.log(`[loadLayoutFromBackend] Last active layout ID from backend: ${listData.last_active_layout_id}`);

                if (listData.last_active_layout_id) {
                    // Verify the last active layout still exists
                    const exists = listData.layouts?.some(l => l.id === listData.last_active_layout_id);
                    if (exists) {
                        layoutId = listData.last_active_layout_id;
                        console.log(`[loadLayoutFromBackend] Loading last active layout: ${layoutId}`);
                    } else {
                        console.warn(`[loadLayoutFromBackend] Last active layout '${listData.last_active_layout_id}' no longer exists`);
                    }
                }

                if (!layoutId && listData.layouts && listData.layouts.length > 0) {
                    // Fallback to first layout
                    layoutId = listData.layouts[0].id;
                    console.log(`[loadLayoutFromBackend] No valid last active, using first layout: ${layoutId}`);
                }
            }
        } catch (listErr) {
            console.warn("[loadLayoutFromBackend] Could not fetch layouts list:", listErr);
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

        console.log(`[loadLayoutFromBackend] Loaded layout '${layout.device_id || layoutId || 'default'}':`, {
            name: layout.name,
            device_model: layout.device_model,
            pages: layout.pages?.length,
            widgets: layout.pages?.reduce((sum, p) => sum + (p.widgets?.length || 0), 0)
        });

        // Set the current layout ID BEFORE loading into state
        if (window.AppState && (layout.device_id || layoutId)) {
            window.AppState.setCurrentLayoutId(layout.device_id || layoutId);
        }

        loadLayoutIntoState(layout);
        emit(EVENTS.LAYOUT_IMPORTED, layout);

    } catch (err) {
        console.error("Error loading layout from backend:", err);
        // Optionally show a toast or error message here
    }
}

/**
 * Saves the current layout to the Home Assistant backend.
 * Sends the AppState layout data (pages, settings) to the current layout.
 * @returns {Promise<boolean>} True if successful, false otherwise.
 */
async function saveLayoutToBackend() {
    if (!hasHaBackend()) return false;

    // Get layout data from AppState
    if (!window.AppState) {
        throw new Error("AppState not available");
    }

    // Get current layout ID - default to reterminal_e1001 if not set
    const layoutId = window.AppState.currentLayoutId || "reterminal_e1001";

    // Get device model - prefer settings (which user can change) over top-level
    const deviceModel = window.AppState.settings.device_model || window.AppState.deviceModel || "reterminal_e1001";

    const layoutData = {
        pages: window.AppState.pages,
        ...window.AppState.settings,
        device_id: layoutId,
        name: window.AppState.deviceName || "Layout 1",
        device_model: deviceModel,
        deviceName: window.AppState.deviceName || "Layout 1"
    };

    try {
        console.log(`[saveLayoutToBackend] Saving to layout '${layoutId}':`, {
            device_model: deviceModel,
            pages: layoutData.pages?.length,
            widgets: layoutData.pages?.reduce((sum, p) => sum + (p.widgets?.length || 0), 0),
            // Debug: Power strategy settings
            daily_refresh_enabled: layoutData.daily_refresh_enabled,
            daily_refresh_time: layoutData.daily_refresh_time,
            deep_sleep_enabled: layoutData.deep_sleep_enabled,
            sleep_enabled: layoutData.sleep_enabled
        });

        // Use the layouts/{id} endpoint to save to the specific layout
        const resp = await fetch(`${HA_API_BASE}/layouts/${layoutId}`, {
            method: "POST",
            headers: getHaHeaders(),
            body: JSON.stringify(layoutData)
        });

        if (!resp.ok) {
            const data = await resp.json().catch(() => ({}));
            throw new Error(data.message || data.error || `Save failed: ${resp.status}`);
        }
        console.log(`[saveLayoutToBackend] Layout '${layoutId}' saved successfully`);
        return true;
    } catch (err) {
        console.error("Failed to save layout to backend:", err);
        throw err;
    }
}

/**
 * Imports a snippet via the Home Assistant backend.
 * @param {string} yaml - The YAML snippet to import.
 * @returns {Promise<Object>} The parsed layout object.
 */
async function importSnippetBackend(yaml) {
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

/**
 * Opens a modal to pick an entity for a widget.
 * @param {Object} widget - The widget object to update.
 * @param {HTMLInputElement} inputElement - The input element to update (optional).
 */
function openEntityPickerForWidget(widget, inputElement) {
    // This function requires UI interaction (modal). 
    // Ideally, the UI part should be in a UI component (like a ModalManager),
    // but for now we can keep the logic here or dispatch an event to open the modal.
    // To keep this module pure logic, we'll dispatch a custom event that the main UI listens to.

    // However, since we are refactoring, let's create a simple imperative way to show the picker 
    // if we haven't extracted the modal UI yet.
    // For now, we will assume the legacy global function exists or we need to reimplement it.

    // STRATEGY: Dispatch an event to request entity picking.
    // The UI layer (e.g., main.js or a new Modals.js) should listen for this.

    // But wait, the user wants us to extract `openEntityPickerForWidget` from editor.js.
    // In editor.js, this function manipulates the DOM directly.
    // We should probably move the DOM manipulation part to a new `frontend/js/ui/entity_picker.js` 
    // or keep it in `ha_api.js` but acknowledge it has UI side effects.

    // Let's look at the original `openEntityPickerForWidget` in editor.js (lines 6050+).
    // It creates a modal on the fly or reuses one.

    // For strict separation, `ha_api.js` should only handle data. 
    // I will create `frontend/js/ui/entity_picker.js` for the UI component in the next step.
    // For now, I will export the data fetching functions.
}

// Initialize auto-refresh if backend exists
if (hasHaBackend()) {
    fetchEntityStates();
    setInterval(fetchEntityStates, 30000);
}
