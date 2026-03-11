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
    getHaHeaders: vi.fn(() => ({ Authorization: 'Bearer token', 'Content-Type': 'application/json' }))
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
    });

    it('starts export download and updates status', async () => {
        const { LayoutManager } = await import('../../js/ui/layout_manager.js');
        const manager = new LayoutManager();
        manager.createModal();

        const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => { });

        await manager.exportLayout('layout_1');

        expect(clickSpy).toHaveBeenCalled();
        expect(document.getElementById('layoutManagerStatus')?.textContent).toContain('Export started');
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
});
