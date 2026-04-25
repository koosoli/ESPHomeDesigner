import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockRegistry, mockLogger } = vi.hoisted(() => ({
    mockRegistry: {
        get: vi.fn()
    },
    mockLogger: {
        log: vi.fn(),
        error: vi.fn(),
        warn: vi.fn(),
        info: vi.fn()
    }
}));

vi.mock('../../js/core/plugin_registry', () => ({
    registry: mockRegistry
}));

vi.mock('../../js/utils/logger.js', () => ({
    Logger: mockLogger
}));

import { OpenDisplayAdapter } from '../../js/io/adapters/opendisplay_adapter.js';

describe('OpenDisplayAdapter details', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('returns an empty string and logs when layout is missing', async () => {
        const adapter = new OpenDisplayAdapter();

        await expect(adapter.generate(null)).resolves.toBe('');
        expect(mockLogger.error).toHaveBeenCalledWith('OpenDisplayAdapter: Missing layout');
    });

    it('serializes multiline and structured payload values safely and injects ids for array results', async () => {
        mockRegistry.get.mockReturnValue({
            exportOpenDisplay: () => ([
                {
                    type: 'multiline',
                    value: 'Line 1\nLine: 2'
                },
                {
                    type: 'plot',
                    data: [{ entity: 'sensor.temperature', color: 'black' }],
                    meta: { smooth: true }
                }
            ])
        });

        const adapter = new OpenDisplayAdapter();
        const yaml = await adapter.generate({
            orientation: 'portrait',
            darkMode: true,
            currentPageIndex: 0,
            settings: {
                opendisplayDeviceId: '95b2d0433f2c26d08088d6296a00a70d'
            },
            pages: [{
                dark_mode: 'inherit',
                widgets: [
                    { id: 'w_payload', type: 'plot', x: 10, y: 20, props: {} }
                ]
            }]
        });

        expect(yaml).toContain('action: opendisplay.drawcustom');
        expect(yaml).toContain('device_id: 95b2d0433f2c26d08088d6296a00a70d');
        expect(yaml).toContain('background: black');
        expect(yaml).toContain('rotate: 90');
        expect(yaml).toContain('refresh_type: "0"');
        expect(yaml).toContain('dry-run: false');
        expect(yaml).not.toContain('payload: |-');
        expect((yaml.match(/# id: w_payload/g) || [])).toHaveLength(2);
        expect(yaml).toContain('value: "Line 1\\nLine: 2"');
        expect(yaml).toContain('data: [{"entity":"sensor.temperature","color":"black"}]');
        expect(yaml).toContain('meta: {"smooth":true}');
    });

    it('warns once per unsupported widget type and skips those widgets', async () => {
        mockRegistry.get.mockReturnValue(null);

        const adapter = new OpenDisplayAdapter();
        const yaml = await adapter.generate({
            orientation: 'landscape',
            currentPageIndex: 0,
            settings: {},
            pages: [{
                dark_mode: 'light',
                widgets: [
                    { id: 'missing_1', type: 'unknown_widget', x: 0, y: 0, props: {} },
                    { id: 'missing_2', type: 'unknown_widget', x: 10, y: 10, props: {} }
                ]
            }]
        });

        expect(mockLogger.warn).toHaveBeenCalledTimes(1);
        expect(yaml).not.toContain('missing_1');
        expect(yaml).not.toContain('missing_2');
    });

    it('only reuses legacy ODP ids when they already look like device ids', async () => {
        mockRegistry.get.mockReturnValue({
            exportOpenDisplay: () => ({
                type: 'text',
                value: 'Compat'
            })
        });

        const adapter = new OpenDisplayAdapter();
        const baseLayout = {
            orientation: 'landscape',
            currentPageIndex: 0,
            settings: {},
            pages: [{
                dark_mode: 'light',
                widgets: [
                    { id: 'legacy_widget', type: 'text', x: 0, y: 0, props: {} }
                ]
            }]
        };

        const legacyDeviceIdYaml = await adapter.generate({
            ...baseLayout,
            settings: {
                opendisplayEntityId: '95b2d0433f2c26d08088d6296a00a70d'
            }
        });
        expect(legacyDeviceIdYaml).toContain('device_id: 95b2d0433f2c26d08088d6296a00a70d');

        const legacyEntityYaml = await adapter.generate({
            ...baseLayout,
            settings: {
                opendisplayEntityId: 'opendisplay.e0:72:a1:f9:00:75'
            }
        });
        expect(legacyEntityYaml).toContain('device_id: ""');
    });
});
