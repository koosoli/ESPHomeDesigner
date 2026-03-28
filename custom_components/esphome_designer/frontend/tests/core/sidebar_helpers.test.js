import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockOn = vi.fn();
const mockShowToast = vi.fn();
const mockLogger = {
    log: vi.fn(),
    warn: vi.fn(),
    error: vi.fn()
};

const mockAppState = {
    deletePage: vi.fn(),
    clearCurrentPage: vi.fn(() => ({ deleted: 2, preserved: 1 }))
};

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

vi.mock('../../js/core/events.js', () => ({
    on: mockOn,
    EVENTS: {
        SELECTION_CHANGED: 'SELECTION_CHANGED'
    }
}));

vi.mock('../../js/utils/dom.js', () => ({
    showToast: mockShowToast
}));

vi.mock('../../js/utils/logger.js', () => ({
    Logger: mockLogger
}));

describe('sidebar_helpers', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        document.body.innerHTML = '';
    });

    it('confirms page deletion from the helper modal', async () => {
        const { showDeletePageModal } = await import('../../js/core/sidebar_helpers.js');

        showDeletePageModal(1, { name: 'Status' });

        const modal = document.querySelector('.modal-backdrop');
        expect(modal).toBeTruthy();

        modal?.querySelector('.confirm-btn')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(mockAppState.deletePage).toHaveBeenCalledWith(1);
        expect(document.querySelector('.modal-backdrop')).toBeNull();
    });

    it('surfaces delete errors through a toast instead of throwing', async () => {
        mockAppState.deletePage.mockImplementationOnce(() => {
            throw new Error('cannot delete');
        });

        const { showDeletePageModal } = await import('../../js/core/sidebar_helpers.js');
        showDeletePageModal(0, { name: 'Broken' });

        document.querySelector('.confirm-btn')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(mockShowToast).toHaveBeenCalledWith('Error deleting page: cannot delete', 'error');
    });

    it('confirms page clearing and surfaces preserved widgets', async () => {
        const { showClearPageModal } = await import('../../js/core/sidebar_helpers.js');

        showClearPageModal();

        document.querySelector('.confirm-btn')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(mockAppState.clearCurrentPage).toHaveBeenCalledWith(true);
        expect(mockShowToast).toHaveBeenCalledWith('Cleared 2 widgets. 1 locked widget(s) were preserved.', 'info');
    });

    it('reports fully cleared, already-empty, and error clear-page outcomes', async () => {
        const { showClearPageModal } = await import('../../js/core/sidebar_helpers.js');

        mockAppState.clearCurrentPage.mockReturnValueOnce({ deleted: 3, preserved: 0 });
        showClearPageModal();
        document.querySelector('.confirm-btn')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        expect(mockShowToast).toHaveBeenCalledWith('Cleared all 3 widgets.', 'success');

        document.body.innerHTML = '';
        mockAppState.clearCurrentPage.mockReturnValueOnce({ deleted: 0, preserved: 0 });
        showClearPageModal();
        document.querySelector('.confirm-btn')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        expect(mockShowToast).toHaveBeenCalledWith('Page is already empty.', 'info');

        document.body.innerHTML = '';
        mockAppState.clearCurrentPage.mockImplementationOnce(() => {
            throw new Error('cannot clear');
        });
        showClearPageModal();
        document.querySelector('.confirm-btn')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        expect(mockShowToast).toHaveBeenCalledWith('Error clearing page: cannot clear', 'error');
    });

    it('wires mobile toggles, closes on selection, and delegates device/editor actions', async () => {
        let selectionChangedHandler = null;
        mockOn.mockImplementation((_event, handler) => {
            selectionChangedHandler = handler;
        });

        Object.defineProperty(window, 'innerWidth', {
            configurable: true,
            value: 600
        });

        document.body.innerHTML = `
            <button id="mobileWidgetsBtn"></button>
            <button id="mobilePropsBtn"></button>
            <button id="mobileDeviceBtn"></button>
            <button id="mobileEditorSettingsBtn"></button>
            <div id="mobileBackdrop"></div>
            <div class="sidebar"></div>
            <div class="right-panel"></div>
        `;

        const originalHandlePaletteClick = vi.fn();
        const sidebarInstance = {
            handlePaletteClick: originalHandlePaletteClick,
            app: {
                deviceSettings: { open: vi.fn() },
                editorSettings: { open: vi.fn() }
            }
        };

        const { setupSidebarMobileToggles } = await import('../../js/core/sidebar_helpers.js');
        setupSidebarMobileToggles(sidebarInstance);

        document.getElementById('mobileWidgetsBtn')?.click();
        expect(document.querySelector('.sidebar')?.classList.contains('mobile-active')).toBe(true);

        document.getElementById('mobileBackdrop')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        expect(document.querySelector('.sidebar')?.classList.contains('mobile-active')).toBe(false);

        selectionChangedHandler?.();
        expect(document.querySelector('.sidebar')?.classList.contains('mobile-active')).toBe(false);
        expect(document.getElementById('mobileBackdrop')?.classList.contains('active')).toBe(false);

        document.getElementById('mobilePropsBtn')?.click();
        expect(document.querySelector('.right-panel')?.classList.contains('mobile-active')).toBe(true);

        document.getElementById('mobileDeviceBtn')?.click();
        expect(sidebarInstance.app.deviceSettings.open).toHaveBeenCalled();

        document.getElementById('mobileEditorSettingsBtn')?.click();
        expect(sidebarInstance.app.editorSettings.open).toHaveBeenCalled();

        sidebarInstance.handlePaletteClick(new MouseEvent('click'));
        expect(originalHandlePaletteClick).toHaveBeenCalled();
    });
});
