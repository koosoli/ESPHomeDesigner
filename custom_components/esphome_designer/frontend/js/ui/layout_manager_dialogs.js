import { DEVICE_PROFILES, SUPPORTED_DEVICE_IDS } from '../io/devices.js';
import { appendToDesignerOverlayRoot } from '../utils/runtime_root.js';
import {
    createLayoutManagerModalMarkup,
    createNewLayoutModalMarkup,
    generateDeviceOptions as buildDeviceOptions
} from './layout_manager_dom.js';

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

export function generateDeviceOptions() {
    return buildDeviceOptions(DEVICE_PROFILES, SUPPORTED_DEVICE_IDS || []);
}

/**
 * @param {{ modal: HTMLElement | null, close: () => void, showNewLayoutDialog: () => void, handleFileImport: (event: Event) => Promise<void> | void, loadLayout: (layoutId: string) => Promise<void> | void, exportLayout: (layoutId: string) => Promise<void> | void, deleteLayout: (layoutId: string, layoutName: string) => Promise<void> | void }} manager
 * @returns {HTMLElement}
 */
export function createLayoutManagerModal(manager) {
    const existing = /** @type {HTMLElement | null} */ (document.getElementById('layoutManagerModal'));
    if (existing) {
        manager.modal = existing;
        return existing;
    }

    const modal = document.createElement('div');
    modal.id = 'layoutManagerModal';
    modal.className = 'modal-backdrop hidden';
    modal.innerHTML = createLayoutManagerModalMarkup();

    appendToDesignerOverlayRoot(modal);
    manager.modal = modal;

    const closeBtn = /** @type {HTMLButtonElement} */ (getRequiredElement('layoutManagerClose'));
    const newBtn = /** @type {HTMLButtonElement} */ (getRequiredElement('layoutManagerNew'));
    const importBtn = /** @type {HTMLButtonElement} */ (getRequiredElement('layoutManagerImport'));
    const fileInput = /** @type {HTMLInputElement} */ (getRequiredElement('layoutManagerFileInput'));

    closeBtn.addEventListener('click', () => manager.close());
    newBtn.addEventListener('click', () => manager.showNewLayoutDialog());
    importBtn.addEventListener('click', () => {
        fileInput.click();
    });
    fileInput.addEventListener('change', (/** @type {Event} */ e) => manager.handleFileImport(e));

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            manager.close();
        }
    });

    const tbody = document.getElementById('layoutManagerTableBody');
    if (tbody) {
        tbody.addEventListener('click', (e) => {
            const target = e.target instanceof HTMLElement ? e.target.closest('button') : null;
            if (!target) return;

            const { action, id, name } = target.dataset;
            if (action === 'load' && id) manager.loadLayout(id);
            if (action === 'export' && id) manager.exportLayout(id);
            if (action === 'delete' && id && name) manager.deleteLayout(id, name);
        });
    }

    return modal;
}

/**
 * @param {{ generateDeviceOptions: () => string, handleCreateLayoutConfirm: () => void, layouts: any[] }} manager
 * @returns {HTMLElement}
 */
export function ensureNewLayoutModal(manager) {
    const existing = /** @type {HTMLElement | null} */ (document.getElementById('newLayoutModal'));
    if (existing) return existing;

    const modal = document.createElement('div');
    modal.id = 'newLayoutModal';
    modal.className = 'modal-backdrop hidden';
    modal.innerHTML = createNewLayoutModalMarkup(manager.generateDeviceOptions());
    appendToDesignerOverlayRoot(modal);

    /** @type {HTMLButtonElement} */ (getRequiredElement('newLayoutClose')).addEventListener('click', () => {
        modal.classList.add('hidden');
    });
    /** @type {HTMLButtonElement} */ (getRequiredElement('newLayoutCancel')).addEventListener('click', () => {
        modal.classList.add('hidden');
    });
    /** @type {HTMLButtonElement} */ (getRequiredElement('newLayoutConfirm')).addEventListener('click', () => {
        manager.handleCreateLayoutConfirm();
    });

    /** @type {HTMLInputElement} */ (getRequiredElement('newLayoutName')).addEventListener('keydown', (/** @type {KeyboardEvent} */ e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            manager.handleCreateLayoutConfirm();
        } else if (e.key === 'Escape') {
            modal.classList.add('hidden');
        }
        e.stopPropagation();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            const nameInput = getInput('newLayoutName');
            if (document.activeElement !== nameInput) {
                modal.classList.add('hidden');
            }
        }
    });

    return modal;
}

/**
 * @param {{ generateDeviceOptions: () => string, handleCreateLayoutConfirm: () => void, layouts: any[] }} manager
 * @returns {void}
 */
export function showNewLayoutDialog(manager) {
    const modal = ensureNewLayoutModal(manager);
    const nameInput = getInput('newLayoutName');
    if (!nameInput) return;

    const existingCount = manager.layouts.length;
    nameInput.value = `Layout ${existingCount + 1}`;

    const defaultDevice = DEVICE_PROFILES ? Object.keys(DEVICE_PROFILES)[0] : 'reterminal_e1001';
    const deviceTypeSelect = getSelect('newLayoutDeviceType');
    if (deviceTypeSelect) {
        deviceTypeSelect.value = defaultDevice;
    }

    modal.classList.remove('hidden');
    setTimeout(() => nameInput.focus(), 100);
}

/**
 * @param {{ createLayout: (name: string, deviceModel?: string) => Promise<void> | void }} manager
 * @returns {void}
 */
export function handleCreateLayoutConfirm(manager) {
    const nameInput = getInput('newLayoutName');
    const deviceTypeSelect = getSelect('newLayoutDeviceType');
    const name = nameInput?.value.trim() || '';
    const deviceType = deviceTypeSelect?.value || 'reterminal_e1001';
    if (!name) {
        alert('Please enter a layout name.');
        return;
    }

    const modal = /** @type {HTMLElement | null} */ (document.getElementById('newLayoutModal'));
    if (modal) modal.classList.add('hidden');
    manager.createLayout(name, deviceType);
}
