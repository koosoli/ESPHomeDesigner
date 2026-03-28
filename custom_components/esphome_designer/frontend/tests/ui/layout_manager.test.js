import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockLogger = { log: vi.fn(), warn: vi.fn(), error: vi.fn() };
const mockEmit = vi.fn();
let backendEnabled = true;

const mockAppState = {
    currentLayoutId: 'layout_1',
    deviceModel: 'reterminal_e1001',
    settings: { device_model: 'reterminal_e1001' },
    pages: [{ id: 'page_0', name: 'Page 1', widgets: [] }],
    setCurrentLayoutId: vi.fn(),
    setPages: vi.fn(),
    setCurrentPageIndex: vi.fn(),
    updateSettings: vi.fn(),
    setDeviceModel: vi.fn(),
    getCurrentPage: vi.fn(() => ({ widgets: [] }))
};

const mockLoadLayoutIntoState = vi.fn();

vi.mock('../../js/utils/logger.js', () => ({ Logger: mockLogger }));

vi.mock('../../js/io/devices.js', () => ({
    DEVICE_PROFILES: {
        reterminal_e1001: { name: 'E1001', features: { epaper: true, lvgl: false } },
        trmnl: { name: 'TRMNL', features: { epaper: true, lvgl: false } }
    },
    SUPPORTED_DEVICE_IDS: ['reterminal_e1001']
}));

vi.mock('../../js/core/state', () => ({ AppState: mockAppState }));

vi.mock('../../js/io/ha_api.js', () => ({
    getHaHeaders: vi.fn(() => ({ Authorization: 'Bearer token', 'Content-Type': 'application/json' })),
    haFetch: vi.fn((url, options) => fetch(url, options))
}));

vi.mock('../../js/utils/env.js', () => ({
    hasHaBackend: () => backendEnabled,
    HA_API_BASE: 'http://localhost:8123/api/esphome_designer'
}));

vi.mock('../../js/io/yaml_import', () => ({
    loadLayoutIntoState: mockLoadLayoutIntoState
}));

vi.mock('../../js/core/events.js', () => ({
    emit: mockEmit,
    EVENTS: { LAYOUT_IMPORTED: 'LAYOUT_IMPORTED', STATE_CHANGED: 'STATE_CHANGED' }
}));

describe('LayoutManager', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        backendEnabled = true;
        mockAppState.currentLayoutId = 'layout_1';
        document.body.innerHTML = `<button id="manageLayoutsBtn"></button><div id="canvas"></div>`;
        vi.stubGlobal('confirm', vi.fn(() => true));
        vi.stubGlobal('alert', vi.fn());
    });

    it('initializes modal and binds open button', async () => {
        const { LayoutManager } = await import('../../js/ui/layout_manager.js');
        const manager = new LayoutManager();
        manager.init();

        expect(document.getElementById('layoutManagerModal')).toBeTruthy();

        const openSpy = vi.spyOn(manager, 'open').mockResolvedValue(undefined);
        document.getElementById('manageLayoutsBtn')?.click();
        expect(openSpy).toHaveBeenCalled();
    });

    it('reuses an existing modal and hides it when closing', async () => {
        document.body.innerHTML = `
            <button id="manageLayoutsBtn"></button>
            <div id="layoutManagerModal" class="modal-backdrop"></div>
        `;

        const { LayoutManager } = await import('../../js/ui/layout_manager.js');
        const manager = new LayoutManager();
        const existingModal = document.getElementById('layoutManagerModal');

        manager.createModal();
        manager.close();

        expect(manager.modal).toBe(existingModal);
        expect(existingModal?.classList.contains('hidden')).toBe(true);
    });

    it('opens the file picker when the import button is clicked', async () => {
        const { LayoutManager } = await import('../../js/ui/layout_manager.js');
        const manager = new LayoutManager();
        manager.createModal();

        const input = /** @type {HTMLInputElement} */ (document.getElementById('layoutManagerFileInput'));
        const clickSpy = vi.spyOn(input, 'click').mockImplementation(() => {});

        document.getElementById('layoutManagerImport')?.click();

        expect(clickSpy).toHaveBeenCalled();
    });

    it('renders layout list and current layout label', async () => {
        const { LayoutManager } = await import('../../js/ui/layout_manager.js');
        const manager = new LayoutManager();
        manager.createModal();

        manager.layouts = [
            { id: 'layout_1', name: 'Main', device_model: 'reterminal_e1001', page_count: 2 },
            { id: 'layout_2', name: 'Main', device_model: 'trmnl', page_count: 1 }
        ];

        manager.renderLayoutList();

        const html = document.getElementById('layoutManagerTableBody')?.innerHTML || '';
        expect(html).toContain('Main');
        expect(html).toContain('current');
        expect(document.getElementById('layoutManagerCurrentName')?.textContent).toContain('Main');
    });

    it('escapes html and maps device names', async () => {
        const { LayoutManager } = await import('../../js/ui/layout_manager.js');
        const manager = new LayoutManager();

        expect(manager.escapeHtml('<script>')).toContain('&lt;script&gt;');
        expect(manager.getDeviceDisplayName('reterminal_e1001')).toContain('E1001');
        expect(manager.getDeviceDisplayName('trmnl')).toContain('(untested)');
    });

    it('loads layouts from backend and handles current layout sync', async () => {
        const { LayoutManager } = await import('../../js/ui/layout_manager.js');
        const manager = new LayoutManager();
        manager.createModal();
        mockAppState.currentLayoutId = 'reterminal_e1001';

        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue({
                last_active_layout_id: 'layout_2',
                layouts: [
                    { id: 'layout_1', name: 'Main', device_model: 'reterminal_e1001', page_count: 2 },
                    { id: 'layout_2', name: 'Second', device_model: 'trmnl', page_count: 1 }
                ]
            })
        }));

        await manager.loadLayouts();

        expect(manager.layouts.length).toBe(2);
        expect(mockAppState.setCurrentLayoutId).toHaveBeenCalledWith('layout_2');
        expect(fetch).toHaveBeenCalledWith(
            'http://localhost:8123/api/esphome_designer/layouts',
            expect.objectContaining({
                headers: expect.objectContaining({
                    Authorization: 'Bearer token'
                })
            })
        );
    });

    it('shows an error when loading layouts fails', async () => {
        const { LayoutManager } = await import('../../js/ui/layout_manager.js');
        const manager = new LayoutManager();
        manager.createModal();

        vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));

        await manager.loadLayouts();

        expect(document.getElementById('layoutManagerStatus')?.textContent).toContain('Failed to load layouts');
        expect(mockLogger.error).toHaveBeenCalled();
    });

    it('shows an error when opening without a Home Assistant backend', async () => {
        backendEnabled = false;
        const { LayoutManager } = await import('../../js/ui/layout_manager.js');
        const manager = new LayoutManager();
        manager.createModal();

        await manager.open();

        expect(document.getElementById('layoutManagerStatus')?.textContent).toContain('Not connected to Home Assistant');
    });

    it('loads a layout and updates app state', async () => {
        const { LayoutManager } = await import('../../js/ui/layout_manager.js');
        const manager = new LayoutManager();
        manager.createModal();

        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue({
                name: 'Loaded Layout',
                device_model: 'reterminal_e1001',
                pages: [{ id: 'page_1', widgets: [] }]
            })
        }));

        await manager.loadLayout('layout_99');

        expect(mockAppState.setCurrentLayoutId).toHaveBeenCalledWith('layout_99');
        expect(mockLoadLayoutIntoState).toHaveBeenCalled();
        expect(mockEmit).toHaveBeenCalledWith('LAYOUT_IMPORTED', expect.any(Object));
        expect(fetch).toHaveBeenCalledWith(
            'http://localhost:8123/api/esphome_designer/layouts/layout_99',
            expect.objectContaining({
                headers: expect.objectContaining({
                    Authorization: 'Bearer token'
                })
            })
        );
    });

    it('shows an error when loading a layout fails', async () => {
        const { LayoutManager } = await import('../../js/ui/layout_manager.js');
        const manager = new LayoutManager();
        manager.createModal();

        vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));

        await manager.loadLayout('layout_99');

        expect(document.getElementById('layoutManagerStatus')?.textContent).toContain('Failed to load layout');
        expect(mockLogger.error).toHaveBeenCalled();
    });

    it('dispatches delegated load, export, and delete actions from the table body', async () => {
        const { LayoutManager } = await import('../../js/ui/layout_manager.js');
        const manager = new LayoutManager();
        manager.createModal();

        const loadSpy = vi.spyOn(manager, 'loadLayout').mockResolvedValue(undefined);
        const exportSpy = vi.spyOn(manager, 'exportLayout').mockResolvedValue(undefined);
        const deleteSpy = vi.spyOn(manager, 'deleteLayout').mockResolvedValue(undefined);

        const tbody = /** @type {HTMLElement} */ (document.getElementById('layoutManagerTableBody'));
        tbody.innerHTML = `
            <tr>
                <td>
                    <button data-action="load" data-id="layout_1"></button>
                    <button data-action="export" data-id="layout_1"></button>
                    <button data-action="delete" data-id="layout_1" data-name="Main"></button>
                </td>
            </tr>
        `;

        tbody.querySelector('button[data-action="load"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        tbody.querySelector('button[data-action="export"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        tbody.querySelector('button[data-action="delete"]')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));

        expect(loadSpy).toHaveBeenCalledWith('layout_1');
        expect(exportSpy).toHaveBeenCalledWith('layout_1');
        expect(deleteSpy).toHaveBeenCalledWith('layout_1', 'Main');
    });

    it('starts export download and updates status', async () => {
        const { LayoutManager } = await import('../../js/ui/layout_manager.js');
        const manager = new LayoutManager();
        manager.createModal();

        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue({ id: 'layout_1', pages: [] })
        }));
        Object.defineProperty(URL, 'createObjectURL', {
            configurable: true,
            value: vi.fn(() => 'blob:layout_1')
        });
        Object.defineProperty(URL, 'revokeObjectURL', {
            configurable: true,
            value: vi.fn()
        });
        const createObjectURLSpy = vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:layout_1');
        const revokeObjectURLSpy = vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => { });
        const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => { });

        await manager.exportLayout('layout_1');

        expect(clickSpy).toHaveBeenCalled();
        expect(createObjectURLSpy).toHaveBeenCalled();
        expect(revokeObjectURLSpy).toHaveBeenCalledWith('blob:layout_1');
        expect(document.getElementById('layoutManagerStatus')?.textContent).toContain('Export started');
    });

    it('shows an error when export throws', async () => {
        const { LayoutManager } = await import('../../js/ui/layout_manager.js');
        const manager = new LayoutManager();
        manager.createModal();

        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue({ id: 'layout_1', pages: [] })
        }));
        Object.defineProperty(URL, 'createObjectURL', {
            configurable: true,
            value: vi.fn(() => 'blob:layout_1')
        });
        Object.defineProperty(URL, 'revokeObjectURL', {
            configurable: true,
            value: vi.fn()
        });
        vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:layout_1');
        vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => { });
        const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {
            throw new Error('blocked');
        });

        await manager.exportLayout('layout_1');

        expect(clickSpy).toHaveBeenCalled();
        expect(document.getElementById('layoutManagerStatus')?.textContent).toContain('Failed to export layout');
        clickSpy.mockRestore();
    });

    it('shows an error when the export endpoint returns a failed response', async () => {
        const { LayoutManager } = await import('../../js/ui/layout_manager.js');
        const manager = new LayoutManager();
        manager.createModal();

        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: false,
            status: 500,
            json: vi.fn().mockResolvedValue({ error: 'export_failed' })
        }));

        await manager.exportLayout('layout_1');

        expect(document.getElementById('layoutManagerStatus')?.textContent).toContain('Failed to export layout');
    });

    it('clears status text after the timeout elapses', async () => {
        vi.useFakeTimers();
        const { LayoutManager } = await import('../../js/ui/layout_manager.js');
        const manager = new LayoutManager();
        manager.createModal();

        manager.setStatus('Created layout', 'success');
        expect(document.getElementById('layoutManagerStatus')?.textContent).toBe('Created layout');

        await vi.advanceTimersByTimeAsync(5000);
        expect(document.getElementById('layoutManagerStatus')?.textContent).toBe('');
        vi.useRealTimers();
    });

    it('creates new layout via backend and triggers load flow', async () => {
        const { LayoutManager } = await import('../../js/ui/layout_manager.js');
        const manager = new LayoutManager();
        manager.createModal();

        const loadLayoutsSpy = vi.spyOn(manager, 'loadLayouts').mockResolvedValue(undefined);
        const loadLayoutSpy = vi.spyOn(manager, 'loadLayout').mockResolvedValue(undefined);

        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue({ success: true })
        }));

        await manager.createLayout('Kitchen Display', 'reterminal_e1001');

        expect(loadLayoutsSpy).toHaveBeenCalled();
        expect(loadLayoutSpy).toHaveBeenCalled();
        expect(mockAppState.setPages).toHaveBeenCalled();
        expect(mockAppState.updateSettings).toHaveBeenCalled();
    });

    it('alerts when confirming a new layout without a name', async () => {
        const { LayoutManager } = await import('../../js/ui/layout_manager.js');
        const manager = new LayoutManager();
        manager.createModal();

        manager.showNewLayoutDialog();
        const nameInput = /** @type {HTMLInputElement} */ (document.getElementById('newLayoutName'));
        nameInput.value = '   ';

        manager.handleCreateLayoutConfirm();

        expect(alert).toHaveBeenCalledWith('Please enter a layout name.');
    });

    it('opens the new layout dialog and confirms creation', async () => {
        const { LayoutManager } = await import('../../js/ui/layout_manager.js');
        const manager = new LayoutManager();
        manager.createModal();
        manager.layouts = [{ id: 'layout_1' }, { id: 'layout_2' }];

        const createLayoutSpy = vi.spyOn(manager, 'createLayout').mockResolvedValue(undefined);

        manager.showNewLayoutDialog();

        const nameInput = document.getElementById('newLayoutName');
        const deviceTypeSelect = document.getElementById('newLayoutDeviceType');
        const modal = document.getElementById('newLayoutModal');

        expect(nameInput?.value).toBe('Layout 3');
        expect(deviceTypeSelect?.value).toBe('reterminal_e1001');
        expect(modal?.classList.contains('hidden')).toBe(false);

        nameInput.value = 'Kitchen';
        manager.handleCreateLayoutConfirm();

        expect(createLayoutSpy).toHaveBeenCalledWith('Kitchen', 'reterminal_e1001');
        expect(modal?.classList.contains('hidden')).toBe(true);
    });

    it('handles new layout modal close, cancel, confirm, keyboard, and backdrop interactions', async () => {
        const { LayoutManager } = await import('../../js/ui/layout_manager.js');
        const manager = new LayoutManager();
        manager.createModal();

        const createLayoutSpy = vi.spyOn(manager, 'createLayout').mockResolvedValue(undefined);

        manager.showNewLayoutDialog();
        const modal = /** @type {HTMLElement} */ (document.getElementById('newLayoutModal'));
        const nameInput = /** @type {HTMLInputElement} */ (document.getElementById('newLayoutName'));
        const closeBtn = /** @type {HTMLButtonElement} */ (document.getElementById('newLayoutClose'));
        const cancelBtn = /** @type {HTMLButtonElement} */ (document.getElementById('newLayoutCancel'));
        const confirmBtn = /** @type {HTMLButtonElement} */ (document.getElementById('newLayoutConfirm'));

        closeBtn.click();
        expect(modal.classList.contains('hidden')).toBe(true);

        manager.showNewLayoutDialog();
        cancelBtn.click();
        expect(modal.classList.contains('hidden')).toBe(true);

        manager.showNewLayoutDialog();
        nameInput.value = 'Kitchen';
        confirmBtn.click();
        expect(createLayoutSpy).toHaveBeenCalledWith('Kitchen', 'reterminal_e1001');
        expect(modal.classList.contains('hidden')).toBe(true);

        manager.showNewLayoutDialog();
        nameInput.focus();
        modal.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        expect(modal.classList.contains('hidden')).toBe(false);

        cancelBtn.focus();
        modal.dispatchEvent(new MouseEvent('click', { bubbles: true }));
        expect(modal.classList.contains('hidden')).toBe(true);

        manager.showNewLayoutDialog();
        nameInput.value = 'Keyboard Layout';
        nameInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }));
        expect(createLayoutSpy).toHaveBeenCalledWith('Keyboard Layout', 'reterminal_e1001');

        manager.showNewLayoutDialog();
        nameInput.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        expect(modal.classList.contains('hidden')).toBe(true);
    });

    it('handles delete failures for the last remaining layout', async () => {
        const { LayoutManager } = await import('../../js/ui/layout_manager.js');
        const manager = new LayoutManager();
        manager.createModal();

        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: false,
            status: 400,
            json: vi.fn().mockResolvedValue({ error: 'cannot_delete_last_layout' })
        }));

        await manager.deleteLayout('layout_1', 'Main');

        expect(document.getElementById('layoutManagerStatus')?.textContent).toContain('Cannot delete the last layout');
    });

    it('verifies deletion succeeded after a transient network error', async () => {
        vi.useFakeTimers();
        const { LayoutManager } = await import('../../js/ui/layout_manager.js');
        const manager = new LayoutManager();
        manager.createModal();
        manager.layouts = [{ id: 'layout_1', name: 'Main' }];

        const loadLayoutsSpy = vi.spyOn(manager, 'loadLayouts').mockImplementation(async () => {
            manager.layouts = [];
        });

        vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));

        const promise = manager.deleteLayout('layout_1', 'Main');
        await vi.advanceTimersByTimeAsync(1500);
        await promise;

        expect(loadLayoutsSpy).toHaveBeenCalled();
        expect(document.getElementById('layoutManagerStatus')?.textContent).toContain('Deleted: Main');
        vi.useRealTimers();
    });

    it('shows a success state when deleting a layout succeeds immediately', async () => {
        const { LayoutManager } = await import('../../js/ui/layout_manager.js');
        const manager = new LayoutManager();
        manager.createModal();

        const loadLayoutsSpy = vi.spyOn(manager, 'loadLayouts').mockResolvedValue(undefined);
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            status: 200,
            json: vi.fn().mockResolvedValue({})
        }));

        await manager.deleteLayout('layout_1', 'Main');

        expect(loadLayoutsSpy).toHaveBeenCalled();
        expect(document.getElementById('layoutManagerStatus')?.textContent).toContain('Deleted: Main');
    });

    it('shows a delete failure when the layout still exists after refresh', async () => {
        vi.useFakeTimers();
        const { LayoutManager } = await import('../../js/ui/layout_manager.js');
        const manager = new LayoutManager();
        manager.createModal();
        manager.layouts = [{ id: 'layout_1', name: 'Main' }];

        const loadLayoutsSpy = vi.spyOn(manager, 'loadLayouts').mockImplementation(async () => {
            manager.layouts = [{ id: 'layout_1', name: 'Main' }];
        });

        vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));

        const promise = manager.deleteLayout('layout_1', 'Main');
        await vi.advanceTimersByTimeAsync(1500);
        await promise;

        expect(loadLayoutsSpy).toHaveBeenCalled();
        expect(document.getElementById('layoutManagerStatus')?.textContent).toContain('Failed to delete layout');
        vi.useRealTimers();
    });

    it('imports layout payload through backend', async () => {
        const { LayoutManager } = await import('../../js/ui/layout_manager.js');
        const manager = new LayoutManager();
        manager.createModal();

        const loadLayoutsSpy = vi.spyOn(manager, 'loadLayouts').mockResolvedValue(undefined);

        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue({ id: 'imported_1', name: 'Imported Layout' })
        }));

        await manager.importLayout({ pages: [{ id: 'p1', widgets: [] }] });

        expect(loadLayoutsSpy).toHaveBeenCalled();
        expect(document.getElementById('layoutManagerStatus')?.textContent).toContain('Imported');
    });

    it('retries import with overwrite when the backend reports a duplicate layout', async () => {
        const { LayoutManager } = await import('../../js/ui/layout_manager.js');
        const manager = new LayoutManager();
        manager.createModal();

        const loadLayoutsSpy = vi.spyOn(manager, 'loadLayouts').mockResolvedValue(undefined);
        const fetchMock = vi.fn()
            .mockResolvedValueOnce({
                ok: false,
                json: vi.fn().mockResolvedValue({ error: 'layout_exists', existing_id: 'layout_1' })
            })
            .mockResolvedValueOnce({
                ok: true,
                json: vi.fn().mockResolvedValue({ id: 'layout_1', name: 'Imported Layout' })
            });
        vi.stubGlobal('fetch', fetchMock);

        await manager.importLayout({ pages: [{ id: 'page_0', widgets: [] }] });

        expect(fetchMock).toHaveBeenCalledTimes(2);
        expect(loadLayoutsSpy).toHaveBeenCalled();
    });

    it('rejects invalid imported layout files', async () => {
        const { LayoutManager } = await import('../../js/ui/layout_manager.js');
        const manager = new LayoutManager();
        manager.createModal();

        const file = { text: vi.fn().mockResolvedValue(JSON.stringify({ foo: 'bar' })) };
        const input = document.createElement('input');
        Object.defineProperty(input, 'files', { configurable: true, value: [file] });

        await manager.handleFileImport({ target: input });

        expect(document.getElementById('layoutManagerStatus')?.textContent).toContain('Invalid layout file');
        expect(input.value).toBe('');
    });

    it('passes valid imported layout files through to importLayout', async () => {
        const { LayoutManager } = await import('../../js/ui/layout_manager.js');
        const manager = new LayoutManager();
        manager.createModal();

        const importSpy = vi.spyOn(manager, 'importLayout').mockResolvedValue(undefined);
        const file = { text: vi.fn().mockResolvedValue(JSON.stringify({ device_id: 'dev1', pages: [{ id: 'page_0', widgets: [] }] })) };
        const input = document.createElement('input');
        Object.defineProperty(input, 'files', { configurable: true, value: [file] });

        await manager.handleFileImport({ target: input });

        expect(importSpy).toHaveBeenCalledWith({ device_id: 'dev1', pages: [{ id: 'page_0', widgets: [] }] });
        expect(input.value).toBe('');
    });

    it('surfaces parse errors when importing a malformed file', async () => {
        const { LayoutManager } = await import('../../js/ui/layout_manager.js');
        const manager = new LayoutManager();
        manager.createModal();

        const badFile = { text: vi.fn().mockResolvedValue('{not-json') };
        const input = document.createElement('input');
        Object.defineProperty(input, 'files', { configurable: true, value: [badFile] });

        await manager.handleFileImport({ target: input });

        expect(document.getElementById('layoutManagerStatus')?.textContent).toContain('Failed to import file');
        expect(input.value).toBe('');
    });

    it('shows an error when importing a layout fails', async () => {
        const { LayoutManager } = await import('../../js/ui/layout_manager.js');
        const manager = new LayoutManager();
        manager.createModal();

        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: false,
            status: 500,
            json: vi.fn().mockResolvedValue({ error: 'backend_failed' })
        }));

        await manager.importLayout({ pages: [{ id: 'page_0', widgets: [] }] });

        expect(document.getElementById('layoutManagerStatus')?.textContent).toContain('Failed to import layout');
        expect(mockLogger.error).toHaveBeenCalled();
    });

    it('shows an error when create verification fails after a backend error', async () => {
        vi.useFakeTimers();
        const { LayoutManager } = await import('../../js/ui/layout_manager.js');
        const manager = new LayoutManager();
        manager.createModal();

        const loadLayoutsSpy = vi.spyOn(manager, 'loadLayouts').mockImplementation(async () => {
            manager.layouts = [];
        });
        const loadLayoutSpy = vi.spyOn(manager, 'loadLayout').mockResolvedValue(undefined);

        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: false,
            status: 500,
            json: vi.fn().mockResolvedValue({ error: 'backend_failed' })
        }));

        const promise = manager.createLayout('Broken Layout', 'reterminal_e1001');
        await vi.advanceTimersByTimeAsync(1500);
        await promise;

        expect(loadLayoutsSpy).toHaveBeenCalled();
        expect(loadLayoutSpy).not.toHaveBeenCalled();
        expect(document.getElementById('layoutManagerStatus')?.textContent).toContain('Failed to create layout');
        vi.useRealTimers();
    });

    it('verifies creation succeeded after a transient backend failure', async () => {
        vi.useFakeTimers();
        const { LayoutManager } = await import('../../js/ui/layout_manager.js');
        const manager = new LayoutManager();
        manager.createModal();

        const loadLayoutsSpy = vi.spyOn(manager, 'loadLayouts').mockImplementation(async () => {
            manager.layouts = [{ id: 'resilient_layout_1700000000000', name: 'Resilient Layout' }];
        });
        const loadLayoutSpy = vi.spyOn(manager, 'loadLayout').mockResolvedValue(undefined);
        vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('offline')));
        vi.spyOn(Date, 'now').mockReturnValue(1700000000000);

        const promise = manager.createLayout('Resilient Layout', 'reterminal_e1001');
        await vi.advanceTimersByTimeAsync(1500);
        await promise;

        expect(loadLayoutsSpy).toHaveBeenCalled();
        expect(loadLayoutSpy).toHaveBeenCalledWith('resilient_layout_1700000000000');
        expect(document.getElementById('layoutManagerStatus')?.textContent).toContain('Created: Resilient Layout');
        vi.useRealTimers();
    });
});
