/**
 * Layout Manager UI
 * Handles listing, creating, switching, deleting, importing, and exporting layouts
 * Uses Home Assistant backend API for persistent storage across devices
 */

import { Logger } from '../utils/logger.js';
import { DEVICE_PROFILES, SUPPORTED_DEVICE_IDS } from '../io/devices.js';
import { getHaHeaders } from '../io/ha_api.js';
import { hasHaBackend, HA_API_BASE, getHaToken } from '../utils/env.js';
import { AppState } from '../core/state.js';
import { loadLayoutIntoState } from '../io/yaml_import.js';
import { emit, EVENTS } from '../core/events.js';

class LayoutManager {
    constructor() {
        this.modal = null;
        this.currentLayoutId = "reterminal_e1001"; // Default
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
        // Check if modal already exists
        if (document.getElementById("layoutManagerModal")) {
            this.modal = document.getElementById("layoutManagerModal");
            return;
        }

        const modal = document.createElement("div");
        modal.id = "layoutManagerModal";
        modal.className = "modal-backdrop hidden";
        modal.innerHTML = `
            <div class="modal" style="max-width: 600px;">
                <div class="modal-header">
                    <div>📁 Manage Layouts</div>
                    <button id="layoutManagerClose" class="btn btn-secondary">×</button>
                </div>
                <div class="modal-body">
                    <div class="layout-manager-current" style="margin-bottom: 12px; padding: 8px; background: var(--bg-subtle); border-radius: 4px;">
                        <span class="prop-label" style="font-size: 11px; color: var(--muted);">Current Layout:</span>
                        <span id="layoutManagerCurrentName" style="font-weight: 500; margin-left: 8px;">Loading...</span>
                    </div>
                    
                    <div class="layout-manager-list-container" style="max-height: 300px; overflow-y: auto; margin-bottom: 12px;">
                        <table class="layout-manager-table" style="width: 100%; border-collapse: collapse;">
                            <thead>
                                <tr style="border-bottom: 1px solid var(--border);">
                                    <th style="text-align: left; padding: 8px 4px; font-size: 11px;">Name</th>
                                    <th style="text-align: left; padding: 8px 4px; font-size: 11px;">Device</th>
                                    <th style="text-align: left; padding: 8px 4px; font-size: 11px;">Pages</th>
                                    <th style="text-align: right; padding: 8px 4px; font-size: 11px;">Actions</th>
                                </tr>
                            </thead>
                            <tbody id="layoutManagerTableBody">
                                <tr><td colspan="4" style="text-align: center; color: var(--muted); padding: 16px;">Loading...</td></tr>
                            </tbody>
                        </table>
                    </div>
                    
                    <div class="layout-manager-actions" style="display: flex; gap: 8px; flex-wrap: wrap;">
                        <button id="layoutManagerNew" class="btn btn-primary" style="flex: 1;">+ New Layout</button>
                        <button id="layoutManagerImport" class="btn btn-secondary" style="flex: 1;">📥 Import from File</button>
                        <input type="file" id="layoutManagerFileInput" accept=".json" style="display: none;">
                    </div>
                    
                    <div id="layoutManagerStatus" class="layout-manager-status" style="margin-top: 8px; font-size: 11px; min-height: 20px;"></div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.modal = modal;

        // Bind modal events
        document.getElementById("layoutManagerClose").addEventListener("click", () => this.close());
        document.getElementById("layoutManagerNew").addEventListener("click", () => this.showNewLayoutDialog());
        document.getElementById("layoutManagerImport").addEventListener("click", () => {
            document.getElementById("layoutManagerFileInput").click();
        });
        document.getElementById("layoutManagerFileInput").addEventListener("change", (e) => this.handleFileImport(e));

        // Close on backdrop click
        modal.addEventListener("click", (e) => {
            if (e.target === modal) this.close();
        });
    }

    async open() {
        if (!this.modal) this.createModal();
        this.modal.classList.remove("hidden");
        await this.loadLayouts();
    }

    close() {
        if (this.modal) {
            this.modal.classList.add("hidden");
        }
    }

    setStatus(message, type = "info") {
        const status = document.getElementById("layoutManagerStatus");
        if (status) {
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
    }

    async loadLayouts() {
        if (typeof hasHaBackend !== "function" || !hasHaBackend()) {
            this.setStatus("Not connected to Home Assistant", "error");
            return;
        }

        try {
            // Use no custom headers to avoid CORS preflight
            const resp = await fetch(`${HA_API_BASE}/layouts`);
            if (!resp.ok) throw new Error(`Failed to load layouts: ${resp.status}`);

            const data = await resp.json();
            this.layouts = data.layouts || [];

            // If backend has a last_active_layout_id and we don't have a current layout, sync it
            if (data.last_active_layout_id && this.layouts.some(l => l.id === data.last_active_layout_id)) {
                // Only update if we don't already have a current layout set
                if (!window.AppState?.currentLayoutId || window.AppState.currentLayoutId === "reterminal_e1001") {
                    const lastActiveExists = this.layouts.find(l => l.id === data.last_active_layout_id);
                    if (lastActiveExists && data.last_active_layout_id !== window.AppState?.currentLayoutId) {
                        Logger.log(`[LayoutManager] Syncing to last active layout: ${data.last_active_layout_id}`);
                        this.currentLayoutId = data.last_active_layout_id;
                        if (window.AppState && typeof window.AppState.setCurrentLayoutId === "function") {
                            window.AppState.setCurrentLayoutId(data.last_active_layout_id);
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

        // Determine current layout from AppState
        if (window.AppState && window.AppState.currentLayoutId) {
            this.currentLayoutId = window.AppState.currentLayoutId;
        }

        // Update current layout display
        const currentLayout = this.layouts.find(l => l.id === this.currentLayoutId);
        if (currentNameEl) {
            currentNameEl.textContent = currentLayout ? currentLayout.name : this.currentLayoutId;
        }

        if (this.layouts.length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" style="text-align: center; color: var(--muted); padding: 16px;">No layouts found</td></tr>';
            return;
        }

        tbody.innerHTML = this.layouts.map(layout => {
            const isCurrent = layout.id === this.currentLayoutId;
            // Check if there are duplicate names
            const duplicateNames = this.layouts.filter(l => l.name === layout.name).length > 1;
            return `
                <tr style="border-bottom: 1px solid var(--border-subtle); ${isCurrent ? 'background: var(--accent-soft);' : ''}">
                    <td style="padding: 8px 4px;">
                        <span style="font-weight: 500;">${this.escapeHtml(layout.name)}</span>
                        ${isCurrent ? '<span style="background: var(--accent); color: white; font-size: 9px; padding: 2px 4px; border-radius: 2px; margin-left: 4px;">current</span>' : ''}
                        ${duplicateNames ? '<br><span style="font-size: 9px; color: var(--muted);">' + this.escapeHtml(layout.id) + '</span>' : ''}
                    </td>
                    <td style="padding: 8px 4px; font-size: 11px; color: var(--muted);">${this.getDeviceDisplayName(layout.device_model || layout.device_type)}</td>
                    <td style="padding: 8px 4px; font-size: 11px; color: var(--muted);">${layout.page_count} pages</td>
                    <td style="padding: 8px 4px; text-align: right;">
                        <div style="display: flex; gap: 4px; justify-content: flex-end;">
                            ${!isCurrent ? `<button class="btn btn-sm btn-primary" style="font-size: 10px; padding: 4px 8px;" onclick="window.layoutManager.loadLayout('${layout.id}')">Load</button>` : ''}
                            <button class="btn btn-sm btn-secondary" style="font-size: 10px; padding: 4px 8px;" onclick="window.layoutManager.exportLayout('${layout.id}')">📤</button>
                            ${!isCurrent && this.layouts.length > 1 ? `<button class="btn btn-sm btn-secondary" style="font-size: 10px; padding: 4px 8px; color: var(--danger);" onclick="window.layoutManager.deleteLayout('${layout.id}', '${this.escapeHtml(layout.name)}')">🗑</button>` : ''}
                        </div>
                    </td>
                </tr>
            `;
        }).join("");
    }

    escapeHtml(text) {
        const div = document.createElement("div");
        div.textContent = text || "";
        return div.innerHTML;
    }

    getDeviceDisplayName(model) {
        if (DEVICE_PROFILES && DEVICE_PROFILES[model]) {
            let name = DEVICE_PROFILES[model].name;
            const supportedIds = SUPPORTED_DEVICE_IDS || [];
            if (!supportedIds.includes(model)) {
                name += " (untested)";
            }
            return name;
        }
        const names = {
            "reterminal_e1001": "E1001 (Mono)",
            "reterminal_e1002": "E1002 (Color)",
            "trmnl": "TRMNL",
            "esp32_s3_photopainter": "PhotoPainter (7-Color)"
        };
        // Also handle short codes (E1001, E1002, TRMNL)
        let name = names[model] || model || "Unknown";

        // If it's a known non-supported model or shortcode, we don't necessarily know if it's supported here
        // but the main check is the DEVICE_PROFILES one above.

        return name;
    }

    async loadLayout(layoutId) {
        if (typeof hasHaBackend !== "function" || !hasHaBackend()) return;

        try {
            this.setStatus("Loading layout...", "info");

            // Use no custom headers to avoid CORS preflight
            const resp = await fetch(`${HA_API_BASE}/layouts/${layoutId}`);
            if (!resp.ok) throw new Error(`Failed to load layout: ${resp.status}`);

            const layout = await resp.json();

            // IMPORTANT: Ensure device_id is set in the layout before loading into state
            // This is critical for saving to the correct layout ID
            if (!layout.device_id) {
                layout.device_id = layoutId;
            }

            // Update current layout ID FIRST, before loading state
            // This ensures any subsequent saves go to the correct layout
            this.currentLayoutId = layoutId;
            if (window.AppState && typeof window.AppState.setCurrentLayoutId === "function") {
                window.AppState.setCurrentLayoutId(layoutId);
                Logger.log(`[LayoutManager] Set currentLayoutId to: ${layoutId}`);
            }

            // Clear the canvas before loading new layout to prevent remnants from appearing
            const canvas = document.getElementById("canvas");
            if (canvas) {
                // Remove all widget elements but keep the grid
                const grid = canvas.querySelector(".canvas-grid");
                canvas.innerHTML = "";
                if (grid) canvas.appendChild(grid);
                Logger.log("[LayoutManager] Cleared canvas before loading layout");
            }

            // Also clear any graph axis labels that may have been added by setTimeout callbacks
            // These labels are appended to canvas but may arrive after canvas.innerHTML was cleared
            document.querySelectorAll('.graph-axis-label').forEach(el => el.remove());

            // Update AppState with the new layout (this sets currentLayoutId, deviceName, etc.)
            if (typeof loadLayoutIntoState === "function") {
                loadLayoutIntoState(layout);
            }

            // Double-check: Ensure currentLayoutId is still correct after loadLayoutIntoState
            // (loadLayoutIntoState might reset it if layout.device_id was missing)
            if (window.AppState && window.AppState.currentLayoutId !== layoutId) {
                window.AppState.setCurrentLayoutId(layoutId);
                Logger.log(`[LayoutManager] Re-set currentLayoutId to: ${layoutId} (was changed by loadLayoutIntoState)`);
            }

            // Emit event for other components
            if (typeof emit === "function" && typeof EVENTS !== "undefined") {
                emit(EVENTS.LAYOUT_IMPORTED, layout);
            }

            this.setStatus(`Loaded: ${layout.name || layoutId}`, "success");
            this.renderLayoutList();

            // Close the modal after loading
            setTimeout(() => this.close(), 500);

        } catch (err) {
            Logger.error("[LayoutManager] Error loading layout:", err);
            this.setStatus("Failed to load layout", "error");
        }
    }

    async exportLayout(layoutId) {
        if (typeof hasHaBackend !== "function" || !hasHaBackend()) return;

        try {
            // Trigger download via the export endpoint
            const url = `${HA_API_BASE}/export?id=${layoutId}`;
            const a = document.createElement("a");
            a.href = url;
            a.download = `${layoutId}_layout.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);

            this.setStatus("Export started...", "success");
        } catch (err) {
            Logger.error("[LayoutManager] Error exporting layout:", err);
            this.setStatus("Failed to export layout", "error");
        }
    }

    async deleteLayout(layoutId, layoutName) {
        if (typeof hasHaBackend !== "function" || !hasHaBackend()) return;

        const confirmed = confirm(`Are you sure you want to delete "${layoutName}"?\n\nThis cannot be undone.`);
        if (!confirmed) return;

        this.setStatus("Deleting layout...", "info");

        try {
            // Use text/plain to avoid CORS preflight
            const resp = await fetch(`${HA_API_BASE}/layouts/${layoutId}`, {
                method: "POST",
                headers: { "Content-Type": "text/plain" },
                body: JSON.stringify({ action: "delete" })
            });

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

            // Wait a moment for the backend to complete the operation
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Reload the layout list to check if deletion actually succeeded
            await this.loadLayouts();

            // Check if the layout is still in the list
            const stillExists = this.layouts.some(l => l.id === layoutId);

            if (!stillExists) {
                // The deletion actually succeeded despite the network error
                Logger.log("[LayoutManager] Layout was successfully deleted (verified after refresh)");
                this.setStatus(`Deleted: ${layoutName}`, "success");
            } else {
                // The deletion truly failed
                Logger.error("[LayoutManager] Error deleting layout:", err);
                this.setStatus("Failed to delete layout", "error");
            }
        }
    }

    showNewLayoutDialog() {
        // Create modal if not exists
        if (!document.getElementById("newLayoutModal")) {
            const modal = document.createElement("div");
            modal.id = "newLayoutModal";
            modal.className = "modal-backdrop hidden";
            modal.innerHTML = `
                <div class="modal" style="max-width: 400px;">
                    <div class="modal-header">
                        <div>Create New Layout</div>
                        <button id="newLayoutClose" class="btn btn-secondary">×</button>
                    </div>
                    <div class="modal-body">
                        <div class="field" style="margin-bottom: 12px;">
                            <div class="prop-label">Layout Name</div>
                            <input id="newLayoutName" class="prop-input" type="text" placeholder="e.g. Living Room Display" />
                        </div>
                        <div class="field">
                            <div class="prop-label">Device Type</div>
                            <select id="newLayoutDeviceType" class="prop-input">
                                ${this.generateDeviceOptions()}
                            </select>
                            <p class="hint" style="color: var(--muted); font-size: 11px; margin-top: 4px;">Select the device that will display this layout.</p>
                        </div>
                    </div>
                    <div class="modal-actions">
                        <button id="newLayoutCancel" class="btn btn-secondary">Cancel</button>
                        <button id="newLayoutConfirm" class="btn btn-primary">Create Layout</button>
                    </div>
                </div>
            `;
            document.body.appendChild(modal);

            // Bind events
            document.getElementById("newLayoutClose").addEventListener("click", () => {
                modal.classList.add("hidden");
            });
            document.getElementById("newLayoutCancel").addEventListener("click", () => {
                modal.classList.add("hidden");
            });
            document.getElementById("newLayoutConfirm").addEventListener("click", () => {
                this.handleCreateLayoutConfirm();
            });

            // Keyboard support
            document.getElementById("newLayoutName").addEventListener("keydown", (e) => {
                if (e.key === "Enter") {
                    e.preventDefault();
                    this.handleCreateLayoutConfirm();
                } else if (e.key === "Escape") {
                    modal.classList.add("hidden");
                }
                // Prevent bubbling to avoid triggering global keyboard shortcuts
                e.stopPropagation();
            });

            modal.addEventListener("click", (e) => {
                // Only close on backdrop click if not clicking the modal itself
                // and not while actively typing
                if (e.target === modal) {
                    const nameInput = document.getElementById("newLayoutName");
                    if (document.activeElement !== nameInput) {
                        modal.classList.add("hidden");
                    }
                }
            });
        }

        // Reset and show
        const nameInput = document.getElementById("newLayoutName");
        const existingCount = this.layouts.length;
        const defaultName = `Layout ${existingCount + 1}`;
        nameInput.value = defaultName;

        // Default to first available device or fallback
        const model = AppState.deviceModel || (AppState.settings ? AppState.settings.device_model : null) || "reterminal_e1001";
        const defaultDevice = DEVICE_PROFILES ? Object.keys(DEVICE_PROFILES)[0] : "reterminal_e1001";
        document.getElementById("newLayoutDeviceType").value = defaultDevice;

        document.getElementById("newLayoutModal").classList.remove("hidden");

        // Focus name input with a slight delay
        setTimeout(() => nameInput.focus(), 100);
    }

    handleCreateLayoutConfirm() {
        const name = document.getElementById("newLayoutName").value.trim();
        const deviceType = document.getElementById("newLayoutDeviceType").value;
        if (!name) {
            alert("Please enter a layout name.");
            return;
        }
        document.getElementById("newLayoutModal").classList.add("hidden");
        this.createLayout(name, deviceType);
    }

    generateDeviceOptions() {
        if (DEVICE_PROFILES) {
            const supportedIds = SUPPORTED_DEVICE_IDS || [];
            return Object.entries(DEVICE_PROFILES).map(([key, profile]) => {
                let displayName = profile.name;
                if (!supportedIds.includes(key)) {
                    displayName += " (untested)";
                }
                return `<option value="${key}">${displayName}</option>`;
            }).join("");
        }
        return `<option value="reterminal_e1001">reTerminal E1001</option>`;
    }

    async createLayout(name, deviceModel = "reterminal_e1001") {
        if (typeof hasHaBackend !== "function" || !hasHaBackend()) return;

        // Generate ID from name - ALWAYS add timestamp to ensure uniqueness
        let baseId = name.toLowerCase().replace(/\s+/g, "_").replace(/[^a-z0-9_]/g, "");

        // If baseId would be empty, use a default
        if (!baseId) {
            baseId = "layout";
        }

        // Always append timestamp for uniqueness
        const id = baseId + "_" + Date.now();

        this.setStatus("Creating layout...", "info");

        let createSucceeded = false;

        try {
            // Use text/plain to avoid CORS preflight
            const resp = await fetch(`${HA_API_BASE}/layouts`, {
                method: "POST",
                headers: { "Content-Type": "text/plain" },
                body: JSON.stringify({ id, name, device_type: deviceModel, device_model: deviceModel })
            });

            if (!resp.ok) {
                const data = await resp.json().catch(() => ({}));
                throw new Error(data.error || `Create failed: ${resp.status}`);
            }

            createSucceeded = true;

        } catch (err) {
            Logger.warn("[LayoutManager] Network error during create, verifying if operation completed...");

            // Wait a moment for the backend to complete the operation
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Reload the layout list to check if creation actually succeeded
            await this.loadLayouts();

            // Check if the new layout appears in the list
            const nowExists = this.layouts.some(l => l.id === id);

            if (nowExists) {
                // The creation actually succeeded despite the network error
                Logger.log("[LayoutManager] Layout was successfully created (verified after refresh)");
                createSucceeded = true;
            } else {
                // The creation truly failed
                Logger.error("[LayoutManager] Error creating layout:", err);
                this.setStatus("Failed to create layout", "error");
                return;
            }
        }

        if (createSucceeded) {
            this.setStatus(`Created: ${name}`, "success");
            await this.loadLayouts();

            // Detect if this is an e-ink device to set appropriate rendering mode default
            const profile = DEVICE_PROFILES[deviceModel];
            const isEpaper = profile && profile.features && profile.features.epaper;
            const hasLvgl = profile && profile.features && profile.features.lvgl;

            // Default to direct mode for e-ink unless it explicitly supports LVGL
            const initialRenderingMode = (isEpaper && !hasLvgl) ? "direct" : "lvgl";

            Logger.log(`[LayoutManager] New layout ${id} detected device type. isEpaper=${isEpaper}, hasLvgl=${hasLvgl}. Setting initial renderingMode to: ${initialRenderingMode}`);

            // CRITICAL: Clear the current state BEFORE loading the new layout
            // This prevents any widgets from the previous layout from appearing
            if (window.AppState) {
                // Reset to empty state
                window.AppState.setPages([{
                    id: "page_0",
                    name: "Page 1",
                    widgets: []
                }]);
                window.AppState.setCurrentPageIndex(0);

                // Update settings with the detected rendering mode
                window.AppState.updateSettings({
                    renderingMode: initialRenderingMode,
                    device_model: deviceModel
                });

                Logger.log("[LayoutManager] Cleared state and set initial settings before loading new layout");
            }

            // Auto-load the new layout so user can start working on it
            await this.loadLayout(id);

            // After loading, update the device model in AppState
            if (window.AppState) {
                window.AppState.setDeviceModel(deviceModel);
                if (window.AppState.settings) {
                    window.AppState.settings.device_model = deviceModel;
                }
                window.currentDeviceModel = deviceModel;

                // Force a state change event to trigger re-render
                // This ensures the canvas is cleared and redrawn with the new (empty) layout
                if (typeof emit === "function" && typeof EVENTS !== "undefined") {
                    emit(EVENTS.STATE_CHANGED);
                }

                Logger.log(`[LayoutManager] Created layout '${id}' with device_model: ${deviceModel}, pages: ${window.AppState.pages?.length}, widgets: ${window.AppState.getCurrentPage()?.widgets?.length || 0}`);
            }
        }
    }

    async handleFileImport(event) {
        const file = event.target.files[0];
        if (!file) return;

        try {
            const text = await file.text();
            const data = JSON.parse(text);

            // Validate it looks like a layout
            if (!data.pages && !data.device_id) {
                this.setStatus("Invalid layout file", "error");
                return;
            }

            await this.importLayout(data);

        } catch (err) {
            Logger.error("[LayoutManager] Error importing file:", err);
            this.setStatus("Failed to import file: " + err.message, "error");
        }

        // Reset file input
        event.target.value = "";
    }

    async importLayout(data, overwrite = false) {
        if (typeof hasHaBackend !== "function" || !hasHaBackend()) return;

        try {
            const url = `${HA_API_BASE}/import${overwrite ? "?overwrite=true" : ""}`;
            const resp = await fetch(url, {
                method: "POST",
                headers: getHaHeaders(),
                body: JSON.stringify(data)
            });

            const result = await resp.json();

            if (!resp.ok) {
                if (result.error === "layout_exists") {
                    const doOverwrite = confirm(
                        `A layout with ID "${result.existing_id}" already exists.\n\nDo you want to overwrite it?`
                    );
                    if (doOverwrite) {
                        await this.importLayout(data, true);
                        return;
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

// Create global instance
window.layoutManager = new LayoutManager();
