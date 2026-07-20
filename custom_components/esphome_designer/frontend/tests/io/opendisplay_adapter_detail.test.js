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
import {
    normalizeOpenDisplayAnchor,
    openDisplayTextPosition
} from '../../js/io/adapters/opendisplay_helpers.js';

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
                    value: 'Line 1\nLine: 2',
                    anchor: 'ct'
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
        expect(yaml).toContain('anchor: ma');
        expect(yaml).not.toContain('anchor: ct');
        expect(yaml).toContain('data: [{"entity":"sensor.temperature","color":"black"}]');
        expect(yaml).toContain('meta: {"smooth":true}');
    });

    it('serializes centered text with a matching Pillow anchor and reference coordinate', async () => {
        const { default: textPlugin } = await import('../../features/text/plugin.js');
        mockRegistry.get.mockReturnValue(textPlugin);

        const adapter = new OpenDisplayAdapter();
        const yaml = await adapter.generate({
            orientation: 'landscape',
            darkMode: false,
            currentPageIndex: 0,
            settings: {
                opendisplayDeviceId: '95b2d0433f2c26d08088d6296a00a70d'
            },
            pages: [{
                dark_mode: 'light',
                widgets: [
                    {
                        id: 'w_text_center',
                        type: 'text',
                        x: 10,
                        y: 20,
                        width: 100,
                        height: 30,
                        props: {
                            text: 'Title',
                            font_size: 14,
                            text_align: 'TOP_CENTER',
                            color: 'black'
                        }
                    }
                ]
            }]
        });

        expect(yaml).toContain('# id: w_text_center');
        expect(yaml).toContain('x: 60');
        expect(yaml).toContain('y: 20');
        expect(yaml).toContain('anchor: ma');
        expect(yaml).not.toMatch(/anchor:\s*(?:ct|cm|cb|tc|cc|bc)\b/);
    });

    it('uses page dark mode for theme_auto exports', async () => {
        const { default: textPlugin } = await import('../../features/text/plugin.js');
        mockRegistry.get.mockReturnValue(textPlugin);

        const yaml = await new OpenDisplayAdapter().generate({
            darkMode: false,
            settings: {},
            pages: [{
                dark_mode: 'dark',
                widgets: [{
                    id: 'dark_text',
                    type: 'text',
                    x: 0,
                    y: 0,
                    width: 100,
                    height: 20,
                    props: { text: 'Visible', color: 'theme_auto' }
                }]
            }]
        });

        expect(yaml).toContain('background: black');
        expect(yaml).toContain('color: white');
    });

    it('inherits global dark mode when a legacy page has no dark mode setting', async () => {
        const yaml = await new OpenDisplayAdapter().generate({
            darkMode: true,
            settings: {},
            pages: [{ widgets: [] }]
        });

        expect(yaml).toContain('background: black');
    });

    it('preserves zero TTL and falls back from invalid numeric settings', async () => {
        const yaml = await new OpenDisplayAdapter().generate({
            settings: { opendisplayDither: Number.NaN, opendisplayTtl: 0 },
            pages: [{ widgets: [] }]
        });

        expect(yaml).toContain('dither: 2');
        expect(yaml).toContain('ttl: 0');
    });

    it('uses flattened project settings over legacy nested settings', async () => {
        const yaml = await new OpenDisplayAdapter().generate({
            opendisplayDeviceId: 'current_device_id',
            opendisplayDither: 4,
            opendisplayTtl: 120,
            settings: {
                opendisplayDeviceId: 'stale_device_id',
                opendisplayDither: 2,
                opendisplayTtl: 60
            },
            pages: [{ widgets: [] }]
        });

        expect(yaml).toContain('device_id: current_device_id');
        expect(yaml).toContain('dither: 4');
        expect(yaml).toContain('ttl: 120');
    });

    it('maps designer text alignments to Pillow-compatible anchors and coordinates', () => {
        const widget = { x: 10, y: 20, width: 100, height: 30 };

        expect(openDisplayTextPosition(widget, 'TOP_LEFT')).toEqual({ anchor: 'la', x: 10, y: 20 });
        expect(openDisplayTextPosition(widget, 'TOP_CENTER')).toEqual({ anchor: 'ma', x: 60, y: 20 });
        expect(openDisplayTextPosition(widget, 'TOP_RIGHT')).toEqual({ anchor: 'ra', x: 110, y: 20 });
        expect(openDisplayTextPosition(widget, 'CENTER_LEFT')).toEqual({ anchor: 'lm', x: 10, y: 35 });
        expect(openDisplayTextPosition(widget, 'CENTER')).toEqual({ anchor: 'mm', x: 60, y: 35 });
        expect(openDisplayTextPosition(widget, 'CENTER_RIGHT')).toEqual({ anchor: 'rm', x: 110, y: 35 });
        expect(openDisplayTextPosition(widget, 'BOTTOM_LEFT')).toEqual({ anchor: 'lb', x: 10, y: 50 });
        expect(openDisplayTextPosition(widget, 'BOTTOM_CENTER')).toEqual({ anchor: 'mb', x: 60, y: 50 });
        expect(openDisplayTextPosition(widget, 'BOTTOM_RIGHT')).toEqual({ anchor: 'rb', x: 110, y: 50 });

        expect(normalizeOpenDisplayAnchor('ct')).toBe('ma');
        expect(normalizeOpenDisplayAnchor('lt')).toBe('la');
        expect(normalizeOpenDisplayAnchor('bc')).toBe('mb');
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
