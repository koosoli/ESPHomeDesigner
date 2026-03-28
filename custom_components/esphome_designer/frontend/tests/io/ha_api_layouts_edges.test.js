import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

function createAppState() {
    return {
        currentLayoutId: 'layout-1',
        settings: { device_model: 'reterminal_e1001' },
        deviceModel: 'reterminal_e1001',
        deviceName: 'Office Panel',
        setCurrentLayoutId: vi.fn(),
        getPagesPayload: vi.fn(() => ({
            pages: [{ id: 'page-1', widgets: [] }],
            renderingMode: 'direct'
        }))
    };
}

async function importLayoutsModule({
    hasBackend = true,
    appState = createAppState(),
    loadLayoutIntoState
} = {}) {
    vi.resetModules();

    const mockEmit = vi.fn();
    const mockShowToast = vi.fn();
    const mockLogger = {
        log: vi.fn(),
        warn: vi.fn(),
        error: vi.fn()
    };
    const mockGetHaHeaders = vi.fn(() => ({ Authorization: 'Bearer token' }));
    const mockLoadLayoutIntoState = loadLayoutIntoState ?? vi.fn();

    vi.doMock('../../js/core/state', () => ({
        AppState: appState
    }));
    vi.doMock('../../js/core/events.js', () => ({
        emit: mockEmit,
        EVENTS: {
            LAYOUT_IMPORTED: 'LAYOUT_IMPORTED'
        }
    }));
    vi.doMock('../../js/utils/env.js', () => ({
        hasHaBackend: () => hasBackend,
        HA_API_BASE: 'http://localhost:8123/api/esphome_designer'
    }));
    vi.doMock('../../js/utils/dom.js', () => ({
        showToast: mockShowToast
    }));
    vi.doMock('../../js/utils/logger.js', () => ({
        Logger: mockLogger
    }));
    vi.doMock('../../js/io/ha_api.js', () => ({
        getHaHeaders: mockGetHaHeaders,
        haFetch: vi.fn((url, options) => fetch(url, options))
    }));
    if (loadLayoutIntoState === null) {
        vi.doMock('../../js/io/yaml_import', () => ({
            loadLayoutIntoState: undefined
        }));
    } else {
        vi.doMock('../../js/io/yaml_import', () => ({
            loadLayoutIntoState: mockLoadLayoutIntoState
        }));
    }

    const module = await import('../../js/io/ha_api_layouts.js');
    return {
        ...module,
        mockAppState: appState,
        mockEmit,
        mockShowToast,
        mockLogger,
        mockLoadLayoutIntoState,
        mockGetHaHeaders
    };
}

describe('ha_api_layouts edge cases', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.unstubAllGlobals();
        vi.useRealTimers();
    });

    afterEach(() => {
        vi.resetModules();
        vi.unstubAllGlobals();
    });

    it('falls back to the first available layout when the stored last-active id no longer exists', async () => {
        const fetchMock = vi.fn()
            .mockResolvedValueOnce({
                ok: true,
                json: vi.fn().mockResolvedValue({
                    last_active_layout_id: 'missing-layout',
                    layouts: [{ id: 'layout-1' }, { id: 'layout-2' }]
                })
            })
            .mockResolvedValueOnce({
                ok: true,
                json: vi.fn().mockResolvedValue({
                    name: 'Primary Layout',
                    pages: [{ id: 'page-1', widgets: [] }]
                })
            });
        vi.stubGlobal('fetch', fetchMock);

        const {
            loadLayoutFromBackend,
            mockAppState,
            mockLoadLayoutIntoState,
            mockEmit,
            mockLogger
        } = await importLayoutsModule();

        await loadLayoutFromBackend();

        expect(mockLogger.warn).toHaveBeenCalledWith("[loadLayoutFromBackend] Last active layout 'missing-layout' no longer exists");
        expect(mockAppState.setCurrentLayoutId).toHaveBeenCalledWith('layout-1');
        expect(mockLoadLayoutIntoState).toHaveBeenCalledWith(expect.objectContaining({
            device_id: 'layout-1',
            name: 'Primary Layout'
        }));
        expect(mockEmit).toHaveBeenCalledWith('LAYOUT_IMPORTED', expect.objectContaining({
            device_id: 'layout-1'
        }));
    });

    it('shows an error toast when loading the selected layout fails', async () => {
        const fetchMock = vi.fn()
            .mockResolvedValueOnce({
                ok: true,
                json: vi.fn().mockResolvedValue({
                    last_active_layout_id: 'layout-2',
                    layouts: [{ id: 'layout-2' }]
                })
            })
            .mockResolvedValueOnce({
                ok: false,
                status: 503
            });
        vi.stubGlobal('fetch', fetchMock);

        const { loadLayoutFromBackend, mockShowToast, mockLogger } = await importLayoutsModule();

        await loadLayoutFromBackend();

        expect(mockLogger.error).toHaveBeenCalledWith('Error loading layout from backend:', expect.any(Error));
        expect(mockShowToast).toHaveBeenCalledWith('Error loading layout from backend', 'error', 5000);
    });

    it('logs when loadLayoutIntoState is unavailable but still emits the imported layout', async () => {
        const fetchMock = vi.fn()
            .mockResolvedValueOnce({
                ok: true,
                json: vi.fn().mockResolvedValue({
                    layouts: [{ id: 'layout-3' }],
                    last_active_layout_id: 'layout-3'
                })
            })
            .mockResolvedValueOnce({
                ok: true,
                json: vi.fn().mockResolvedValue({
                    device_id: 'layout-3',
                    pages: []
                })
            });
        vi.stubGlobal('fetch', fetchMock);

        const { loadLayoutFromBackend, mockEmit, mockLogger } = await importLayoutsModule({
            loadLayoutIntoState: null
        });

        await loadLayoutFromBackend();

        expect(mockLogger.error).toHaveBeenCalledWith('[loadLayoutFromBackend] loadLayoutIntoState function missing!');
        expect(mockEmit).toHaveBeenCalledWith('LAYOUT_IMPORTED', expect.objectContaining({
            device_id: 'layout-3'
        }));
    });

    it('queues a follow-up save when another save request arrives while the first is still in flight', async () => {
        vi.useFakeTimers();
        let resolveFirstSave;
        const fetchMock = vi.fn()
            .mockImplementationOnce(() => new Promise((resolve) => {
                resolveFirstSave = resolve;
            }))
            .mockResolvedValueOnce({
                ok: true,
                json: vi.fn().mockResolvedValue({ ok: true })
            });
        vi.stubGlobal('fetch', fetchMock);

        const { saveLayoutToBackend, mockLogger } = await importLayoutsModule();

        const firstSave = saveLayoutToBackend();
        await Promise.resolve();

        await expect(saveLayoutToBackend()).resolves.toBe(false);
        expect(mockLogger.log).toHaveBeenCalledWith('[saveLayoutToBackend] Save already in progress, queuing...');

        resolveFirstSave({
            ok: true,
            json: vi.fn().mockResolvedValue({ ok: true })
        });

        await expect(firstSave).resolves.toBe(true);
        await vi.advanceTimersByTimeAsync(500);

        expect(fetchMock).toHaveBeenCalledTimes(2);
    });

    it('throws when AppState is unavailable and logs unexpected save failures', async () => {
        const appState = /** @type {any} */ (null);
        const fetchMock = vi.fn().mockResolvedValue({
            ok: false,
            status: 500,
            json: vi.fn().mockResolvedValue({ message: 'save exploded' })
        });
        vi.stubGlobal('fetch', fetchMock);

        const missingStateModule = await importLayoutsModule({ appState });
        await expect(missingStateModule.saveLayoutToBackend()).rejects.toThrow('AppState not available');

        const failingSaveModule = await importLayoutsModule();
        await expect(failingSaveModule.saveLayoutToBackend()).rejects.toThrow('save exploded');
        expect(failingSaveModule.mockLogger.error).toHaveBeenCalledWith('Failed to save layout to backend:', expect.any(Error));
    });

    it('rejects snippet imports immediately when no backend is available', async () => {
        const { importSnippetBackend } = await importLayoutsModule({ hasBackend: false });

        await expect(importSnippetBackend('display:\n  - platform: ili9xxx')).rejects.toThrow('No backend');
    });
});
