import { beforeEach, describe, expect, it, vi } from 'vitest';

let hasBackend = true;
let token = 'test-token';
let haApiBase = 'http://localhost:8123/api/esphome_designer';

const mockEmit = vi.fn();
const mockLoadLayoutIntoState = vi.fn();

const mockAppState = {
    entityStates: {},
    currentLayoutId: 'layout-1',
    settings: { device_model: 'reterminal_e1001' },
    deviceModel: 'reterminal_e1001',
    deviceName: 'Test Layout',
    pages: [],
    setCurrentLayoutId: vi.fn(),
    getPagesPayload: vi.fn(() => ({
        pages: [{ id: 'page_0', widgets: [] }],
        renderingMode: 'direct'
    }))
};

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

vi.mock('../../js/core/events.js', () => ({
    emit: mockEmit,
    EVENTS: {
        ENTITIES_LOADED: 'ENTITIES_LOADED',
        LAYOUT_IMPORTED: 'LAYOUT_IMPORTED'
    }
}));

vi.mock('../../js/utils/env.js', () => ({
    getHaToken: () => token,
    hasHaBackend: () => hasBackend,
    get HA_API_BASE() {
        return haApiBase;
    }
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

describe('ha_api', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        hasBackend = true;
        token = 'test-token';
        haApiBase = 'http://localhost:8123/api/esphome_designer';
        mockAppState.entityStates = {};
        mockAppState.currentLayoutId = 'layout-1';
        document.body.innerHTML = '';
        vi.unstubAllGlobals();
    });

    it('builds HA headers with and without token', async () => {
        const mod = await import('../../js/io/ha_api.js');

        let headers = mod.getHaHeaders();
        expect(headers['Content-Type']).toBe('application/json');
        expect(headers.Authorization).toBe('Bearer test-token');

        token = '';
        headers = mod.getHaHeaders();
        expect(headers.Authorization).toBeUndefined();
    });

    it('creates and reuses global entity datalist', async () => {
        const mod = await import('../../js/io/ha_api.js');
        const first = mod.ensureEntityDatalist();
        const second = mod.ensureEntityDatalist();

        expect(first).toBe(second);
        expect(first.id).toBe(mod.ENTITY_DATALIST_ID);
        expect(document.getElementById(mod.ENTITY_DATALIST_ID)).toBeTruthy();
    });

    it('returns empty entities when backend is unavailable', async () => {
        hasBackend = false;
        const mod = await import('../../js/io/ha_api.js');

        const entities = await mod.fetchEntityStates();
        expect(entities).toEqual([]);
    });

    it('fetches and caches entities via custom endpoint', async () => {
        const mod = await import('../../js/io/ha_api.js');

        const payload = [
            {
                entity_id: 'sensor.temp',
                name: 'Temperature',
                state: '22',
                unit: '°C',
                attributes: { unit_of_measurement: '°C' }
            },
            {
                entity_id: 'weather.home',
                name: 'Home Weather',
                state: 'sunny',
                attributes: {}
            }
        ];

        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue(payload)
        }));

        const entities = await mod.fetchEntityStates();

        expect(entities).toHaveLength(2);
        expect(mod.entityStatesCache).toHaveLength(2);
        expect(mod.entityStatesCache[0].formatted).toBe('22 °C');
        expect(mockAppState.entityStates['sensor.temp'].state).toBe('22');
        expect(mockEmit).toHaveBeenCalledWith('ENTITIES_LOADED', expect.any(Array));
        const datalist = mod.ensureEntityDatalist();
        expect(datalist.children.length).toBe(2);
    });

    it('falls back to native HA /api/states when custom endpoint fetch throws', async () => {
        const mod = await import('../../js/io/ha_api.js');

        const nativeStates = [
            {
                entity_id: 'sensor.temp',
                state: '21',
                attributes: { friendly_name: 'Temp', unit_of_measurement: '°C' }
            },
            {
                entity_id: 'light.kitchen',
                state: 'on',
                attributes: { friendly_name: 'Kitchen Light' }
            },
            {
                entity_id: 'camera.front_door',
                state: 'idle',
                attributes: { friendly_name: 'Front Door' }
            }
        ];

        const fetchMock = vi.fn()
            .mockRejectedValueOnce(new Error('custom endpoint unavailable'))
            .mockResolvedValueOnce({
                ok: true,
                json: vi.fn().mockResolvedValue(nativeStates)
            });
        vi.stubGlobal('fetch', fetchMock);

        const entities = await mod.fetchEntityStates();

        expect(fetchMock).toHaveBeenCalledTimes(2);
        expect(entities.map(e => e.entity_id)).toContain('sensor.temp');
        expect(entities.map(e => e.entity_id)).toContain('light.kitchen');
        expect(entities.map(e => e.entity_id)).not.toContain('camera.front_door');
    });

    it('fetches history data and handles non-ok responses', async () => {
        const mod = await import('../../js/io/ha_api.js');

        vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce({
            ok: true,
            json: vi.fn().mockResolvedValue([{ state: '20' }, { state: '21' }])
        }));

        const okData = await mod.fetchEntityHistory('sensor.temp', '24h');
        expect(okData).toHaveLength(2);

        vi.stubGlobal('fetch', vi.fn().mockResolvedValueOnce({
            ok: false,
            text: vi.fn().mockResolvedValue('error')
        }));

        const failData = await mod.fetchEntityHistory('sensor.temp', '24h');
        expect(failData).toEqual([]);
    });

    it('loads last active layout from backend and emits import event', async () => {
        const mod = await import('../../js/io/ha_api.js');

        const listResponse = {
            ok: true,
            json: vi.fn().mockResolvedValue({
                last_active_layout_id: 'layout-2',
                layouts: [{ id: 'layout-1' }, { id: 'layout-2' }]
            })
        };

        const layoutResponse = {
            ok: true,
            json: vi.fn().mockResolvedValue({
                device_id: 'layout-2',
                name: 'Layout 2',
                device_model: 'reterminal_e1001',
                pages: [{ id: 'p1', widgets: [] }]
            })
        };

        const fetchMock = vi.fn()
            .mockResolvedValueOnce(listResponse)
            .mockResolvedValueOnce(layoutResponse);
        vi.stubGlobal('fetch', fetchMock);

        await mod.loadLayoutFromBackend();

        expect(fetchMock).toHaveBeenCalledTimes(2);
        expect(mockAppState.setCurrentLayoutId).toHaveBeenCalledWith('layout-2');
        expect(mockLoadLayoutIntoState).toHaveBeenCalled();
        expect(mockEmit).toHaveBeenCalledWith('LAYOUT_IMPORTED', expect.any(Object));
    });

    it('saves layout and imports snippet through backend', async () => {
        const mod = await import('../../js/io/ha_api.js');

        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue({ success: true })
        }));

        const saved = await mod.saveLayoutToBackend();
        expect(saved).toBe(true);

        const importResult = await mod.importSnippetBackend('sensor:\n  - platform: homeassistant');
        expect(importResult).toEqual({ success: true });
    });
});
