import { Logger } from '../utils/logger.js';
import { AppState } from '../core/state';
import {
    escapeHtml as escapeLayoutHtml,
    getDeviceDisplayName as resolveDeviceDisplayName,
    renderLayoutRows
} from './layout_manager_dom.js';
import { DEVICE_PROFILES, SUPPORTED_DEVICE_IDS } from '../io/devices.js';
import {
    createLayoutManagerModal,
    ensureNewLayoutModal,
    generateDeviceOptions as buildLayoutManagerDeviceOptions,
    handleCreateLayoutConfirm,
    showNewLayoutDialog
} from './layout_manager_dialogs.js';
import {
    createLayout,
    deleteLayout,
    exportLayout,
    handleFileImport,
    importLayout,
    loadLayout,
    loadLayouts
} from './layout_manager_workflows.js';

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
        createLayoutManagerModal(this);
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
        return loadLayouts(this);
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
        return loadLayout(this, layoutId);
    }

    /**
     * @param {string} layoutId
     */
    async exportLayout(layoutId) {
        return exportLayout(this, layoutId);
    }

    /**
     * @param {string} layoutId
     * @param {string} layoutName
     */
    async deleteLayout(layoutId, layoutName) {
        return deleteLayout(this, layoutId, layoutName);
    }

    /** @returns {HTMLElement} */
    ensureNewLayoutModal() {
        return ensureNewLayoutModal(this);
    }

    showNewLayoutDialog() {
        return showNewLayoutDialog(this);
    }

    handleCreateLayoutConfirm() {
        return handleCreateLayoutConfirm(this);
    }

    generateDeviceOptions() {
        return buildLayoutManagerDeviceOptions();
    }

    /**
     * @param {string} name
     * @param {string} [deviceModel="reterminal_e1001"]
     */
    async createLayout(name, deviceModel = "reterminal_e1001") {
        return createLayout(this, name, deviceModel);
    }

    /**
     * @param {Event} event
     */
    async handleFileImport(event) {
        return handleFileImport(this, event);
    }

    /**
     * @param {any} data
     * @param {boolean} [overwrite=false]
     */
    async importLayout(data, overwrite = false) {
        return importLayout(this, data, overwrite);
    }
}
