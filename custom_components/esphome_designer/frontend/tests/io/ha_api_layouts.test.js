import { beforeEach, describe, expect, it, vi } from 'vitest';

let hasBackend = true;

const mockEmit = vi.fn();
const mockShowToast = vi.fn();
const mockLoadLayoutIntoState = vi.fn();
const mockGetHaHeaders = vi.fn(() => ({ Authorization: 'Bearer token' }));

const mockAppState = {
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

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

vi.mock('../../js/core/events.js', () => ({
    emit: mockEmit,
    EVENTS: {
        LAYOUT_IMPORTED: 'LAYOUT_IMPORTED'
    }
}));

vi.mock('../../js/utils/env.js', () => ({
    hasHaBackend: () => hasBackend,
    HA_API_BASE: 'http://localhost:8123/api/esphome_designer'
}));

vi.mock('../../js/utils/dom.js', () => ({
    showToast: mockShowToast
}));

vi.mock('../../js/io/yaml_import', () => ({
    loadLayoutIntoState: mockLoadLayoutIntoState
}));

vi.mock('../../js/utils/logger.js', () => ({
    Logger: {
        log: vi.fn(),
        warn: vi.fn(),
        error: vi.fn()
    }
}));

vi.mock('../../js/io/ha_api.js', () => ({
    getHaHeaders: mockGetHaHeaders,
    haFetch: vi.fn((url, options) => fetch(url, options))
}));

describe('ha_api_layouts', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.resetModules();
        hasBackend = true;
        vi.unstubAllGlobals();
    });

    it('returns early when the HA backend is unavailable', async () => {
        hasBackend = false;
        const fetchMock = vi.fn();
        vi.stubGlobal('fetch', fetchMock);
        const { loadLayoutFromBackend, saveLayoutToBackend } = await import('../../js/io/ha_api_layouts.js');

        await expect(loadLayoutFromBackend()).resolves.toBeUndefined();
        await expect(saveLayoutToBackend()).resolves.toBe(false);
        expect(fetchMock).not.toHaveBeenCalled();
    });

    it('loads the last active layout from the backend and emits import state', async () => {
        const { loadLayoutFromBackend } = await import('../../js/io/ha_api_layouts.js');

        const fetchMock = vi.fn()
            .mockResolvedValueOnce({
                ok: true,
                json: vi.fn().mockResolvedValue({
                    last_active_layout_id: 'layout-2',
                    layouts: [{ id: 'layout-1' }, { id: 'layout-2' }]
                })
            })
            .mockResolvedValueOnce({
                ok: true,
                json: vi.fn().mockResolvedValue({
                    device_id: 'layout-2',
                    name: 'Status Board',
                    device_model: 'reterminal_e1001',
                    pages: [{ id: 'page-1', widgets: [] }]
                })
            });
        vi.stubGlobal('fetch', fetchMock);

        await loadLayoutFromBackend();

        expect(fetchMock).toHaveBeenCalledTimes(2);
        expect(mockAppState.setCurrentLayoutId).toHaveBeenCalledWith('layout-2');
        expect(mockLoadLayoutIntoState).toHaveBeenCalled();
        expect(mockEmit).toHaveBeenCalledWith('LAYOUT_IMPORTED', expect.objectContaining({ device_id: 'layout-2' }));
    });

    it('saves the current layout through the layouts endpoint', async () => {
        const { saveLayoutToBackend } = await import('../../js/io/ha_api_layouts.js');

        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue({ ok: true })
        }));

        const saved = await saveLayoutToBackend();

        expect(saved).toBe(true);
        expect(fetch).toHaveBeenCalledWith(
            'http://localhost:8123/api/esphome_designer/layouts/layout-1',
            expect.objectContaining({
                method: 'POST',
                headers: { Authorization: 'Bearer token' },
                body: expect.stringContaining('"device_id":"layout-1"')
            })
        );
    });

    it('imports YAML snippets through the backend helper', async () => {
        const { importSnippetBackend } = await import('../../js/io/ha_api_layouts.js');

        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue({ pages: [], settings: {} })
        }));

        const result = await importSnippetBackend('display:\n  - platform: ili9xxx');

        expect(result).toEqual({ pages: [], settings: {} });
        expect(fetch).toHaveBeenCalledWith(
            'http://localhost:8123/api/esphome_designer/import_snippet',
            expect.objectContaining({
                method: 'POST',
                headers: { Authorization: 'Bearer token' },
                body: JSON.stringify({ yaml: 'display:\n  - platform: ili9xxx' })
            })
        );
    });

    it('falls back to the legacy layout endpoint when the layouts list cannot be fetched', async () => {
        const { loadLayoutFromBackend } = await import('../../js/io/ha_api_layouts.js');

        const fetchMock = vi.fn()
            .mockRejectedValueOnce(new Error('list unavailable'))
            .mockResolvedValueOnce({
                ok: true,
                json: vi.fn().mockResolvedValue({
                    name: 'Fallback Layout',
                    device_model: 'reterminal_e1001',
                    pages: [{ id: 'page-1', widgets: [] }]
                })
            });
        vi.stubGlobal('fetch', fetchMock);

        await loadLayoutFromBackend();

        expect(fetchMock).toHaveBeenCalledTimes(2);
        expect(fetchMock).toHaveBeenNthCalledWith(
            2,
            'http://localhost:8123/api/esphome_designer/layout',
            expect.objectContaining({
                headers: { Authorization: 'Bearer token' }
            })
        );
        expect(mockLoadLayoutIntoState).toHaveBeenCalledWith(expect.objectContaining({
            name: 'Fallback Layout'
        }));
    });

    it('treats aborted saves as successful to avoid false-negative save errors', async () => {
        const { saveLayoutToBackend } = await import('../../js/io/ha_api_layouts.js');
        const abortError = new Error('timed out');
        abortError.name = 'AbortError';
        vi.stubGlobal('fetch', vi.fn().mockRejectedValue(abortError));

        await expect(saveLayoutToBackend()).resolves.toBe(true);
    });

    it('returns false for expected network failures and throws unexpected import errors', async () => {
        const { saveLayoutToBackend, importSnippetBackend } = await import('../../js/io/ha_api_layouts.js');

        vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Failed to fetch')));
        await expect(saveLayoutToBackend()).resolves.toBe(false);

        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: false,
            json: vi.fn().mockResolvedValue({ message: 'invalid snippet' })
        }));
        await expect(importSnippetBackend('bad: [yaml')).rejects.toThrow('invalid snippet');
    });
});
