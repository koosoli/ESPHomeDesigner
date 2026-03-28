import { beforeEach, describe, expect, it, vi } from 'vitest';

function createAppState() {
    return {
        entityStates: {},
        currentLayoutId: 'layout-embedded',
        settings: { device_model: 'reterminal_e1001' },
        deviceModel: 'reterminal_e1001',
        deviceName: 'Embedded Panel',
        setCurrentLayoutId: vi.fn(),
        getPagesPayload: vi.fn(() => ({
            pages: [{ id: 'page-1', widgets: [] }],
            renderingMode: 'direct'
        }))
    };
}

async function importEmbeddedBridgeModules() {
    vi.resetModules();

    const appState = createAppState();
    const mockEmit = vi.fn();
    const mockLoadLayoutIntoState = vi.fn();
    const mockLogger = {
        log: vi.fn(),
        warn: vi.fn(),
        error: vi.fn()
    };

    vi.doMock('../../js/core/state', () => ({
        AppState: appState
    }));
    vi.doMock('../../js/core/events.js', () => ({
        emit: mockEmit,
        EVENTS: {
            ENTITIES_LOADED: 'ENTITIES_LOADED',
            LAYOUT_IMPORTED: 'LAYOUT_IMPORTED'
        }
    }));
    vi.doMock('../../js/utils/env.js', () => ({
        getHaToken: () => 'embedded-token',
        getHaRequestToken: () => 'embedded-token',
        hasHaBackend: () => true,
        HA_API_BASE: 'http://localhost:8123/api/esphome_designer'
    }));
    vi.doMock('../../js/utils/dom.js', () => ({
        showToast: vi.fn()
    }));
    vi.doMock('../../js/io/yaml_import', () => ({
        loadLayoutIntoState: mockLoadLayoutIntoState
    }));
    vi.doMock('../../js/utils/logger.js', () => ({
        Logger: mockLogger
    }));
    vi.doMock('../../js/utils/runtime_root.js', () => ({
        appendToDesignerOverlayRoot: (el) => document.body.appendChild(el)
    }));

    const haApi = await import('../../js/io/ha_api.js');
    const haLayouts = await import('../../js/io/ha_api_layouts.js');

    return {
        ...haApi,
        ...haLayouts,
        appState,
        mockEmit,
        mockLoadLayoutIntoState,
        mockLogger
    };
}

describe('embedded HA bridge workflow', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.unstubAllGlobals();
        vi.useRealTimers();
        document.body.innerHTML = '';
        Object.defineProperty(globalThis, 'parent', {
            configurable: true,
            value: globalThis
        });
    });

    it('routes layout, import, entity, and history workflows through the embedded panel hass bridge', async () => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2026-03-28T12:00:00.000Z'));

        const callApi = vi.fn()
            .mockResolvedValueOnce({
                last_active_layout_id: 'layout-embedded',
                layouts: [{ id: 'layout-embedded' }]
            })
            .mockResolvedValueOnce({
                device_id: 'layout-embedded',
                name: 'Kitchen Display',
                device_model: 'reterminal_e1001',
                pages: [{ id: 'page-1', widgets: [] }]
            })
            .mockResolvedValueOnce({ ok: true })
            .mockResolvedValueOnce({ pages: [{ id: 'page-1', widgets: [] }], settings: {} })
            .mockResolvedValueOnce([
                {
                    entity_id: 'sensor.temp',
                    name: 'Temp',
                    state: '23',
                    unit: 'C',
                    attributes: { source: 'embedded' }
                }
            ])
            .mockResolvedValueOnce([[
                { state: '21', last_changed: '2026-03-28T10:00:00Z' },
                { state: '22', last_updated: '2026-03-28T10:30:00Z' }
            ]]);

        Object.defineProperty(globalThis, 'parent', {
            configurable: true,
            value: {
                document: {
                    querySelector: vi.fn((selector) => {
                        if (selector === 'esphome-designer-panel') {
                            return { _hass: { callApi } };
                        }
                        return null;
                    })
                }
            }
        });

        vi.stubGlobal('fetch', vi.fn());

        const mod = await importEmbeddedBridgeModules();

        await mod.loadLayoutFromBackend();
        const saved = await mod.saveLayoutToBackend();
        const imported = await mod.importSnippetBackend('display:\n  - platform: ili9xxx');
        const entities = await mod.fetchEntityStates();
        const history = await mod.fetchEntityHistory('sensor.temp', '1h');

        expect(saved).toBe(true);
        expect(imported).toEqual({ pages: [{ id: 'page-1', widgets: [] }], settings: {} });
        expect(mod.mockLoadLayoutIntoState).toHaveBeenCalledWith(expect.objectContaining({
            device_id: 'layout-embedded',
            name: 'Kitchen Display'
        }));
        expect(mod.appState.setCurrentLayoutId).toHaveBeenCalledWith('layout-embedded');
        expect(mod.mockEmit).toHaveBeenCalledWith('LAYOUT_IMPORTED', expect.objectContaining({
            device_id: 'layout-embedded'
        }));
        expect(mod.mockEmit).toHaveBeenCalledWith('ENTITIES_LOADED', expect.any(Array));
        expect(entities).toEqual([
            expect.objectContaining({
                entity_id: 'sensor.temp',
                formatted: '23 C'
            })
        ]);
        expect(mod.appState.entityStates['sensor.temp']).toEqual(expect.objectContaining({
            state: '23',
            attributes: { source: 'embedded' }
        }));
        expect(document.getElementById(mod.ENTITY_DATALIST_ID)?.children.length).toBe(1);
        expect(history).toEqual([
            { state: '21', last_changed: '2026-03-28T10:00:00Z', last_updated: '2026-03-28T10:00:00Z' },
            { state: '22', last_changed: '2026-03-28T10:30:00Z', last_updated: '2026-03-28T10:30:00Z' }
        ]);
        expect(fetch).not.toHaveBeenCalled();

        expect(callApi).toHaveBeenNthCalledWith(1, 'get', 'esphome_designer/layouts', undefined);
        expect(callApi).toHaveBeenNthCalledWith(2, 'get', 'esphome_designer/layouts/layout-embedded', undefined);
        expect(callApi).toHaveBeenNthCalledWith(3, 'post', 'esphome_designer/layouts/layout-embedded', expect.objectContaining({
            device_id: 'layout-embedded',
            name: 'Embedded Panel',
            device_model: 'reterminal_e1001'
        }));
        expect(callApi).toHaveBeenNthCalledWith(4, 'post', 'esphome_designer/import_snippet', {
            yaml: 'display:\n  - platform: ili9xxx'
        });
        expect(callApi).toHaveBeenNthCalledWith(5, 'get', expect.stringContaining('esphome_designer/entities?domains='), undefined);
        expect(callApi).toHaveBeenNthCalledWith(
            6,
            'get',
            expect.stringContaining(`history/period/${encodeURIComponent('2026-03-28T11:00:00.000Z')}`),
            undefined
        );
        expect(callApi.mock.calls[5][1]).toContain(`end_time=${encodeURIComponent('2026-03-28T12:00:00.000Z')}`);
        expect(callApi.mock.calls[5][1]).toContain('filter_entity_id=sensor.temp');
    });
});
