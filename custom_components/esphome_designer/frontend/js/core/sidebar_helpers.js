import { on, EVENTS } from './events.js';
import { AppState } from './state';
import { showToast } from '../utils/dom.js';
import { Logger } from '../utils/logger.js';
import { appendToDesignerOverlayRoot } from '../utils/runtime_root.js';

/** @returns {number} */
function getViewportWidth() {
    return typeof globalThis.innerWidth === 'number' ? globalThis.innerWidth : 0;
}

/**
 * @param {number} index
 * @param {{ name?: string }} page
 * @returns {void}
 */
export function showDeletePageModal(index, page) {
    const modal = document.createElement('div');
    modal.className = 'modal-backdrop';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal" style="width: 320px; height: auto; min-height: 150px; padding: var(--space-4);">
            <div class="modal-header" style="font-size: var(--fs-md); padding-bottom: var(--space-2);">
                <div>Delete Page</div>
            </div>
            <div class="modal-body" style="padding: var(--space-2) 0;">
                <p style="margin-bottom: var(--space-3); font-size: var(--fs-sm);">
                    Are you sure you want to delete the page <b>"${page.name}"</b>?
                    <br><br>
                    This action cannot be undone.
                </p>
            </div>
            <div class="modal-actions" style="padding-top: var(--space-3); border-top: 1px solid var(--border-subtle);">
                <button class="btn btn-secondary close-btn btn-xs">Cancel</button>
                <button class="btn btn-primary confirm-btn btn-xs" style="background: var(--danger); color: white; border: none;">Delete</button>
            </div>
        </div>
    `;

    appendToDesignerOverlayRoot(modal);
    const closeModal = () => modal.remove();
    const confirmAction = () => {
        closeModal();
        try {
            if (typeof AppState.deletePage === 'function') {
                AppState.deletePage(index);
            } else if (typeof showToast === 'function') {
                showToast('Error: AppState.deletePage not found', 'error');
            }
        } catch (e) {
            if (typeof showToast === 'function') {
                const message = e instanceof Error ? e.message : String(e);
                showToast(`Error deleting page: ${message}`, 'error');
            }
        }
    };

    /** @type {NodeListOf<HTMLElement>} */
    const closeBtns = modal.querySelectorAll('.close-btn');
    closeBtns.forEach(btn => btn.onclick = closeModal);
    const confirmBtnEl = /** @type {HTMLElement|null} */ (modal.querySelector('.confirm-btn'));
    if (confirmBtnEl) confirmBtnEl.onclick = confirmAction;
    modal.onclick = (e) => { if (e.target === modal) closeModal(); };
}

export function showClearPageModal() {
    const State = AppState;
    if (!State) {
        if (typeof showToast === 'function') showToast('Error: Application State is not ready.', 'error');
        return;
    }

    const modal = document.createElement('div');
    modal.className = 'modal-backdrop';
    modal.style.display = 'flex';
    modal.innerHTML = `
        <div class="modal" style="width: 320px; height: auto; min-height: 180px; padding: var(--space-4);">
            <div class="modal-header" style="font-size: var(--fs-md); padding-bottom: var(--space-2);">
                <div>Clear Page</div>
            </div>
            <div class="modal-body" style="padding: var(--space-2) 0;">
                <p style="margin-bottom: var(--space-3); font-size: var(--fs-sm);">Are you sure you want to clear all widgets? <b>Locked</b> widgets will stay.</p>
            </div>
            <div class="modal-actions" style="padding-top: var(--space-3); border-top: 1px solid var(--border-subtle);">
                <button class="btn btn-secondary close-btn btn-xs">Cancel</button>
                <button class="btn btn-primary confirm-btn btn-xs" style="background: var(--danger); color: white; border: none;">Clear All</button>
            </div>
        </div>
    `;

    appendToDesignerOverlayRoot(modal);
    const closeModal = () => modal.remove();
    const confirmAction = () => {
        closeModal();
        try {
            const result = AppState.clearCurrentPage(true);
            if (result.preserved > 0 && typeof showToast === 'function') {
                showToast(`Cleared ${result.deleted} widgets. ${result.preserved} locked widget(s) were preserved.`, "info");
            } else if (result.deleted > 0) {
                showToast(`Cleared all ${result.deleted} widgets.`, "success");
            } else if (result.preserved > 0) {
                showToast(`No widgets cleared. ${result.preserved} locked widget(s) preserved.`, "info");
            } else {
                showToast("Page is already empty.", "info");
            }
            Logger.log('Cleared widgets from current page via AppState');
        } catch (e) {
            if (typeof showToast === 'function') {
                const message = e instanceof Error ? e.message : String(e);
                showToast(`Error clearing page: ${message}`, 'error');
            }
        }
    };

    /** @type {NodeListOf<HTMLElement>} */
    const closeBtns = modal.querySelectorAll('.close-btn');
    closeBtns.forEach(btn => btn.onclick = closeModal);
    const confirmBtn = /** @type {HTMLElement|null} */ (modal.querySelector('.confirm-btn'));
    if (confirmBtn) confirmBtn.onclick = confirmAction;
    modal.onclick = (e) => { if (e.target === modal) closeModal(); };
}

/**
 * @param {any} sidebarInstance
 * @returns {void}
 */
export function setupSidebarMobileToggles(sidebarInstance) {
    const mobileWidgetsBtn = document.getElementById('mobileWidgetsBtn');
    const mobilePropsBtn = document.getElementById('mobilePropsBtn');
    const mobileDeviceBtn = document.getElementById('mobileDeviceBtn');
    const backdrop = document.getElementById('mobileBackdrop');

    const sidebar = document.querySelector('.sidebar');
    const rightPanel = document.querySelector('.right-panel');

    const closeAll = () => {
        sidebar?.classList.remove('mobile-active');
        rightPanel?.classList.remove('mobile-active');
        backdrop?.classList.remove('active');
    };

    mobileWidgetsBtn?.addEventListener('click', () => {
        const isActive = sidebar?.classList.contains('mobile-active');
        closeAll();
        if (!isActive) {
            sidebar?.classList.add('mobile-active');
            backdrop?.classList.add('active');
        }
    });

    mobilePropsBtn?.addEventListener('click', () => {
        const isActive = rightPanel?.classList.contains('mobile-active');
        closeAll();
        if (!isActive) {
            rightPanel?.classList.add('mobile-active');
            backdrop?.classList.add('active');
        }
    });

    mobileDeviceBtn?.addEventListener('click', () => {
        closeAll();
        sidebarInstance.app?.deviceSettings?.open();
    });

    const mobileEditorSettingsBtn = document.getElementById('mobileEditorSettingsBtn');
    mobileEditorSettingsBtn?.addEventListener('click', () => {
        closeAll();
        sidebarInstance.app?.editorSettings?.open();
    });

    backdrop?.addEventListener('click', closeAll);

    on(EVENTS.SELECTION_CHANGED, () => {
        if (getViewportWidth() <= 768) {
            sidebar?.classList.remove('mobile-active');
            if (!rightPanel?.classList.contains('mobile-active') && !sidebar?.classList.contains('mobile-active')) {
                backdrop?.classList.remove('active');
            }
        }
    });

    const originalHandlePaletteClick = sidebarInstance.handlePaletteClick.bind(sidebarInstance);
    sidebarInstance.handlePaletteClick = (/** @type {any} */ e) => {
        originalHandlePaletteClick(e);
        if (getViewportWidth() <= 768) {
            closeAll();
        }
    };
}
