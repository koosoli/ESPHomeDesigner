/**
 * Layout Manager UI
 * Handles listing, creating, switching, deleting, importing, and exporting layouts
 * Uses Home Assistant backend API for persistent storage across devices
 */

import { Logger } from '../utils/logger.js';
import { DEVICE_PROFILES, SUPPORTED_DEVICE_IDS } from '../io/devices.js';
import { AppState } from '../core/state';
import { getHaHeaders, haFetch } from '../io/ha_api.js';
import { hasHaBackend, HA_API_BASE } from '../utils/env.js';
import { appendToDesignerOverlayRoot } from '../utils/runtime_root.js';
import { loadLayoutIntoState } from '../io/yaml_import';
import { emit, EVENTS } from '../core/events.js';
import {
    createLayoutManagerModalMarkup,
    createNewLayoutModalMarkup,
    escapeHtml as escapeLayoutHtml,
    generateDeviceOptions as buildDeviceOptions,
    getDeviceDisplayName as resolveDeviceDisplayName,
    renderLayoutRows
} from './layout_manager_dom.js';
import {
    createLayoutRequest,
    deleteLayoutRequest,
    fetchLayout,
    fetchLayouts,
    importLayoutRequest,
    sleep
} from './layout_manager_api.js';

/**
 * @param {string} id
 * @returns {HTMLInputElement | null}
 */
function getInput(id) {
    return /** @type {HTMLInputElement | null} */ (document.getElementById(id));
}

/**
 * @param {string} id
 * @returns {HTMLSelectElement | null}
 */
function getSelect(id) {
    return /** @type {HTMLSelectElement | null} */ (document.getElementById(id));
}

/**
 * @param {string} id
 * @returns {HTMLElement}
 */
function getRequiredElement(id) {
    const element = document.getElementById(id);
    if (!element) {
        throw new Error(`Missing element: ${id}`);
    }
    return /** @type {HTMLElement} */ (element);
}

/** @returns {string} */
function getHaApiBase() {
    return HA_API_BASE || "";
}

/**
 * @param {unknown} err
 * @returns {string}
 */
function getErrorMessage(err) {
    return err instanceof Error ? err.message : String(err);
}

/** @type {LayoutManager | null} */
export let layoutManagerInstance = null;

export class LayoutManager {
    constructor() {
        layoutManagerInstance = this;
        /** @type {HTMLElement | null} */
        this.modal = null;
        this.currentLayoutId = "reterminal_e1001";
        /** @type {any[]} */
        this.layouts = [];
    }

    init() {
        this.createModal();
        this.bindButton();
        Logger.log("[LayoutManager] Initialized");
    }

    bindButton() {
        const btn = document.getElementById("manageLayoutsBtn");
        if (btn) {
            btn.addEventListener("click", () => this.open());
        }
    }

    createModal() {
        const existing = /** @type {HTMLElement | null} */ (document.getElementById("layoutManagerModal"));
        if (existing) {
            this.modal = existing;
            return;
        }

        const modal = document.createElement("div");
        modal.id = "layoutManagerModal";
        modal.className = "modal-backdrop hidden";
        modal.innerHTML = createLayoutManagerModalMarkup();

        appendToDesignerOverlayRoot(modal);
        this.modal = modal;

        const closeBtn = /** @type {HTMLButtonElement} */ (getRequiredElement("layoutManagerClose"));
        const newBtn = /** @type {HTMLButtonElement} */ (getRequiredElement("layoutManagerNew"));
        const importBtn = /** @type {HTMLButtonElement} */ (getRequiredElement("layoutManagerImport"));
        const fileInput = /** @type {HTMLInputElement} */ (getRequiredElement("layoutManagerFileInput"));

        closeBtn.addEventListener("click", () => this.close());
        newBtn.addEventListener("click", () => this.showNewLayoutDialog());
        importBtn.addEventListener("click", () => {
            fileInput.click();
        });
        fileInput.addEventListener("change", (/** @type {Event} */ e) => this.handleFileImport(e));

        modal.addEventListener("click", (e) => {
            if (e.target === modal) this.close();
        });

        const tbody = document.getElementById("layoutManagerTableBody");
        if (tbody) {
            tbody.addEventListener('click', (e) => {
                const target = e.target instanceof HTMLElement ? e.target.closest('button') : null;
                if (!target) return;

                const { action, id, name } = target.dataset;
                if (action === 'load' && id) this.loadLayout(id);
                if (action === 'export' && id) this.exportLayout(id);
                if (action === 'delete' && id && name) this.deleteLayout(id, name);
            });
        }
    }

    open() {
        if (!this.modal) this.createModal();
        const modal = this.modal;
        if (!modal) return;
        modal.classList.remove("hidden");
        return this.loadLayouts();
    }

    close() {
        if (this.modal) {
            this.modal.classList.add("hidden");
        }
    }

    /**
     * @param {string} message
     * @param {'success' | 'error' | 'info'} [type='info']
     */
    setStatus(message, type = "info") {
        const status = document.getElementById("layoutManagerStatus");
        if (!status) return;

        /** @type {Record<'success' | 'error' | 'info', string>} */
        const colors = {
            success: "var(--success, #22c55e)",
            error: "var(--danger, #ef4444)",
            info: "var(--muted, #888)"
        };
        status.textContent = message;
        status.style.color = colors[type] || colors.info;
        if (message) {
            setTimeout(() => {
                status.textContent = "";
            }, 5000);
        }
    }

    async loadLayouts() {
        if (!hasHaBackend()) {
            this.setStatus("Not connected to Home Assistant", "error");
            return;
        }

        try {
            const data = await fetchLayouts(getHaApiBase());
            this.layouts = data.layouts || [];

            if (data.last_active_layout_id && this.layouts.some((layout) => layout.id === data.last_active_layout_id)) {
                if (!AppState?.currentLayoutId || AppState.currentLayoutId === "reterminal_e1001") {
                    const lastActiveExists = this.layouts.find((layout) => layout.id === data.last_active_layout_id);
                    if (lastActiveExists && data.last_active_layout_id !== AppState?.currentLayoutId) {
                        Logger.log(`[LayoutManager] Syncing to last active layout: ${data.last_active_layout_id}`);
                        this.currentLayoutId = data.last_active_layout_id;
                        if (AppState && typeof AppState.setCurrentLayoutId === "function") {
                            AppState.setCurrentLayoutId(data.last_active_layout_id);
                        }
                    }
                }
            }

            this.renderLayoutList();
        } catch (err) {
            Logger.error("[LayoutManager] Error loading layouts:", err);
            this.setStatus("Failed to load layouts", "error");
        }
    }

    renderLayoutList() {
        const tbody = document.getElementById("layoutManagerTableBody");
        const currentNameEl = document.getElementById("layoutManagerCurrentName");
        if (!tbody) return;

        if (AppState && AppState.currentLayoutId) {
            this.currentLayoutId = AppState.currentLayoutId;
        }

        const currentLayout = this.layouts.find((layout) => layout.id === this.currentLayoutId);
        if (currentNameEl) {
            currentNameEl.textContent = currentLayout ? currentLayout.name : this.currentLayoutId;
        }

        if (this.layouts.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: var(--muted); padding: 16px;">No layouts found</td></tr>';
            return;
        }

        tbody.innerHTML = renderLayoutRows(this.layouts, this.currentLayoutId, DEVICE_PROFILES, SUPPORTED_DEVICE_IDS || []);
    }

    /**
     * @param {string} text
     * @returns {string}
     */
    escapeHtml(text) {
        return escapeLayoutHtml(text);
    }

    /**
     * @param {string} model
     * @returns {string}
     */
    getDeviceDisplayName(model) {
        return resolveDeviceDisplayName(model, DEVICE_PROFILES, SUPPORTED_DEVICE_IDS || []);
    }

    /**
     * @param {string} layoutId
     */
    async loadLayout(layoutId) {
        if (!hasHaBackend()) return;

        try {
            this.setStatus("Loading layout...", "info");
            const layout = await fetchLayout(getHaApiBase(), layoutId);

            if (!layout.device_id) {
                layout.device_id = layoutId;
            }

            this.currentLayoutId = layoutId;
            if (AppState && typeof AppState.setCurrentLayoutId === "function") {
                AppState.setCurrentLayoutId(layoutId);
                Logger.log(`[LayoutManager] Set currentLayoutId to: ${layoutId}`);
            }

            const canvas = document.getElementById("canvas");
            if (canvas) {
                const grid = canvas.querySelector(".canvas-grid");
                canvas.innerHTML = "";
                if (grid) canvas.appendChild(grid);
                Logger.log("[LayoutManager] Cleared canvas before loading layout");
            }

            document.querySelectorAll('.graph-axis-label').forEach((el) => el.remove());

            if (typeof loadLayoutIntoState === "function") {
                loadLayoutIntoState(layout);
            }

            if (AppState && AppState.currentLayoutId !== layoutId) {
                AppState.setCurrentLayoutId(layoutId);
                Logger.log(`[LayoutManager] Re-set currentLayoutId to: ${layoutId} (was changed by loadLayoutIntoState)`);
            }

            if (typeof emit === "function" && typeof EVENTS !== "undefined") {
                emit(EVENTS.LAYOUT_IMPORTED, layout);
            }

            this.setStatus(`Loaded: ${layout.name || layoutId}`, "success");
            this.renderLayoutList();
            setTimeout(() => this.close(), 500);
        } catch (err) {
            Logger.error("[LayoutManager] Error loading layout:", err);
            this.setStatus("Failed to load layout", "error");
        }
    }

    /**
     * @param {string} layoutId
     */
    async exportLayout(layoutId) {
        if (!hasHaBackend()) return;

        /** @type {string | null} */
        let objectUrl = null;
        try {
            const url = `${HA_API_BASE}/export?id=${layoutId}`;
            const response = await haFetch(url, {
                headers: getHaHeaders()
            });
            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.error || `Export failed: ${response.status}`);
            }

            const layout = await response.json();
            const blob = new Blob([JSON.stringify(layout, null, 2)], {
                type: 'application/json'
            });
            objectUrl = URL.createObjectURL(blob);

            const anchor = document.createElement("a");
            anchor.href = objectUrl;
            anchor.download = `${layoutId}_layout.json`;
            document.body.appendChild(anchor);
            anchor.click();
            document.body.removeChild(anchor);
            this.setStatus("Export started...", "success");
        } catch (err) {
            Logger.error("[LayoutManager] Error exporting layout:", err);
            this.setStatus("Failed to export layout", "error");
        } finally {
            if (objectUrl) {
                URL.revokeObjectURL(objectUrl);
            }
        }
    }

    /**
     * @param {string} layoutId
     * @param {string} layoutName
     */
    async deleteLayout(layoutId, layoutName) {
        if (!hasHaBackend()) return;
        if (!confirm(`Are you sure you want to delete "${layoutName}"?\n\nThis cannot be undone.`)) return;

        this.setStatus("Deleting layout...", "info");

        try {
            const resp = await deleteLayoutRequest(getHaApiBase(), layoutId);
            if (!resp.ok) {
                const data = await resp.json().catch(() => ({}));
                if (data.error === "cannot_delete_last_layout") {
                    this.setStatus("Cannot delete the last layout", "error");
                    return;
                }
                throw new Error(data.error || `Delete failed: ${resp.status}`);
            }

            this.setStatus(`Deleted: ${layoutName}`, "success");
            await this.loadLayouts();
        } catch (err) {
            Logger.warn("[LayoutManager] Network error during delete, verifying if operation completed...");
            await sleep(1500);
            await this.loadLayouts();

            const stillExists = this.layouts.some((layout) => layout.id === layoutId);
            if (!stillExists) {
                Logger.log("[LayoutManager] Layout was successfully deleted (verified after refresh)");
                this.setStatus(`Deleted: ${layoutName}`, "success");
            } else {
                Logger.error("[LayoutManager] Error deleting layout:", err);
                this.setStatus("Failed to delete layout", "error");
            }
        }
    }

    /** @returns {HTMLElement} */
    ensureNewLayoutModal() {
        const existing = /** @type {HTMLElement | null} */ (document.getElementById("newLayoutModal"));
        if (existing) return existing;

        const modal = document.createElement("div");
        modal.id = "newLayoutModal";
        modal.className = "modal-backdrop hidden";
        modal.innerHTML = createNewLayoutModalMarkup(this.generateDeviceOptions());
        appendToDesignerOverlayRoot(modal);

        /** @type {HTMLButtonElement} */ (getRequiredElement("newLayoutClose")).addEventListener("click", () => {
            modal.classList.add("hidden");
        });
        /** @type {HTMLButtonElement} */ (getRequiredElement("newLayoutCancel")).addEventListener("click", () => {
            modal.classList.add("hidden");
        });
        /** @type {HTMLButtonElement} */ (getRequiredElement("newLayoutConfirm")).addEventListener("click", () => {
            this.handleCreateLayoutConfirm();
        });

        /** @type {HTMLInputElement} */ (getRequiredElement("newLayoutName")).addEventListener("keydown", (/** @type {KeyboardEvent} */ e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                this.handleCreateLayoutConfirm();
            } else if (e.key === "Escape") {
                modal.classList.add("hidden");
            }
            e.stopPropagation();
        });

        modal.addEventListener("click", (e) => {
            if (e.target === modal) {
                const nameInput = getInput("newLayoutName");
                if (document.activeElement !== nameInput) {
                    modal.classList.add("hidden");
                }
            }
        });

        return modal;
    }

    showNewLayoutDialog() {
        const modal = this.ensureNewLayoutModal();
        const nameInput = getInput("newLayoutName");
        if (!nameInput) return;
        const existingCount = this.layouts.length;
        nameInput.value = `Layout ${existingCount + 1}`;

        const defaultDevice = DEVICE_PROFILES ? Object.keys(DEVICE_PROFILES)[0] : "reterminal_e1001";
        const deviceTypeSelect = getSelect("newLayoutDeviceType");
        if (deviceTypeSelect) {
            deviceTypeSelect.value = defaultDevice;
        }

        modal.classList.remove("hidden");
        setTimeout(() => nameInput.focus(), 100);
    }

    handleCreateLayoutConfirm() {
        const nameInput = getInput("newLayoutName");
        const deviceTypeSelect = getSelect("newLayoutDeviceType");
        const name = nameInput?.value.trim() || "";
        const deviceType = deviceTypeSelect?.value || "reterminal_e1001";
        if (!name) {
            alert("Please enter a layout name.");
            return;
        }
        const modal = /** @type {HTMLElement | null} */ (document.getElementById("newLayoutModal"));
        if (modal) modal.classList.add("hidden");
        this.createLayout(name, deviceType);
    }

    generateDeviceOptions() {
        return buildDeviceOptions(DEVICE_PROFILES, SUPPORTED_DEVICE_IDS || []);
    }

    /**
     * @param {string} name
     * @param {string} [deviceModel="reterminal_e1001"]
     */
    async createLayout(name, deviceModel = "reterminal_e1001") {
        if (!hasHaBackend()) return;

        let baseId = name.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");
        if (!baseId) baseId = "layout";
        const id = baseId + "_" + Date.now();

        this.setStatus("Creating layout...", "info");
        let createSucceeded = false;

        try {
            const resp = await createLayoutRequest(getHaApiBase(), { id, name, device_type: deviceModel, device_model: deviceModel });
            if (!resp.ok) {
                const data = await resp.json().catch(() => ({}));
                throw new Error(data.error || `Create failed: ${resp.status}`);
            }
            createSucceeded = true;
        } catch (err) {
            Logger.warn("[LayoutManager] Network error during create, verifying if operation completed...");
            await sleep(1500);
            await this.loadLayouts();

            const nowExists = this.layouts.some((layout) => layout.id === id);
            if (nowExists) {
                Logger.log("[LayoutManager] Layout was successfully created (verified after refresh)");
                createSucceeded = true;
            } else {
                Logger.error("[LayoutManager] Error creating layout:", err);
                this.setStatus("Failed to create layout", "error");
                return;
            }
        }

        if (!createSucceeded) return;

        this.setStatus(`Created: ${name}`, "success");
        await this.loadLayouts();

        const profiles = /** @type {Record<string, any>} */ (DEVICE_PROFILES);
        const profile = profiles[deviceModel];
        const isEpaper = profile && profile.features && profile.features.epaper;
        const hasLvgl = profile && profile.features && profile.features.lvgl;
        const initialRenderingMode = (isEpaper && !hasLvgl) ? "direct" : "lvgl";

        Logger.log(`[LayoutManager] New layout ${id} detected device type. isEpaper=${isEpaper}, hasLvgl=${hasLvgl}. Setting initial renderingMode to: ${initialRenderingMode}`);

        if (AppState) {
            AppState.setPages([{ id: "page_0", name: "Page 1", widgets: [] }]);
            AppState.setCurrentPageIndex(0);
            AppState.updateSettings({
                renderingMode: initialRenderingMode,
                device_model: deviceModel
            });
            Logger.log("[LayoutManager] Cleared state and set initial settings before loading new layout");
        }

        await this.loadLayout(id);

        if (AppState) {
            AppState.setDeviceModel(deviceModel);
            if (typeof emit === "function" && typeof EVENTS !== "undefined") {
                emit(EVENTS.STATE_CHANGED);
            }
            Logger.log(`[LayoutManager] Created layout '${id}' with device_model: ${deviceModel}, pages: ${AppState.pages?.length}, widgets: ${AppState.getCurrentPage()?.widgets?.length || 0}`);
        }
    }

    /**
     * @param {Event} event
     */
    async handleFileImport(event) {
        const input = event.target instanceof HTMLInputElement ? event.target : null;
        const file = input?.files?.[0];
        if (!file) return;

        try {
            const text = await file.text();
            const data = JSON.parse(text);

            if (!data.pages && !data.device_id) {
                this.setStatus("Invalid layout file", "error");
                return;
            }

            await this.importLayout(data);
        } catch (err) {
            Logger.error("[LayoutManager] Error importing file:", err);
            this.setStatus("Failed to import file: " + getErrorMessage(err), "error");
        }

        if (input) {
            input.value = "";
        }
    }

    /**
     * @param {any} data
     * @param {boolean} [overwrite=false]
     */
    async importLayout(data, overwrite = false) {
        if (!hasHaBackend()) return;

        try {
            const resp = await importLayoutRequest(getHaApiBase(), data, overwrite, getHaHeaders);
            const result = await resp.json();

            if (!resp.ok) {
                if (result.error === "layout_exists") {
                    const doOverwrite = confirm(
                        `A layout with ID "${result.existing_id}" already exists.\n\nDo you want to overwrite it?`
                    );
                    if (doOverwrite) {
                        await this.importLayout(data, true);
                    }
                    return;
                }
                throw new Error(result.error || `Import failed: ${resp.status}`);
            }

            this.setStatus(`Imported: ${result.name || result.id}`, "success");
            await this.loadLayouts();
        } catch (err) {
            Logger.error("[LayoutManager] Error importing layout:", err);
            this.setStatus("Failed to import layout", "error");
        }
    }
}
