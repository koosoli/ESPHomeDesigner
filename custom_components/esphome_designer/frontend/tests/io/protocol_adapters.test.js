import { describe, it, expect, beforeEach, vi } from 'vitest';

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

import { OEPLAdapter } from '../../js/io/adapters/oepl_adapter.js';
import { OpenDisplayAdapter } from '../../js/io/adapters/opendisplay_adapter.js';

describe('Protocol Adapters round-trip invariants', () => {
    beforeEach(() => {
        vi.clearAllMocks();

        mockRegistry.get.mockImplementation((type) => {
            if (type !== 'text') return null;

            return {
                exportOEPL: (widget) => ({
                    type: 'text',
                    x: widget.x,
                    y: widget.y,
                    value: widget.props?.text || ''
                }),
                exportOpenDisplay: (widget) => ({
                    type: 'text',
                    x: widget.x,
                    y: widget.y,
                    value: widget.props?.text || ''
                })
            };
        });
    });

    it('OEPLAdapter preserves visible widgets and injects ids', async () => {
        const adapter = new OEPLAdapter();
        const layout = {
            orientation: 'portrait',
            currentPageIndex: 0,
            settings: { oeplEntityId: 'open_epaper_link.ABCDEF1234567890' },
            pages: [{
                widgets: [
                    { id: 'w_text', type: 'text', x: 10, y: 20, props: { text: 'Hello' } },
                    { id: 'w_hidden', type: 'text', hidden: true, x: 0, y: 0, props: { text: 'Skip' } },
                    { id: 'w_group', type: 'group', x: 0, y: 0, props: {} }
                ]
            }]
        };

        const output = await adapter.generate(layout);
        const json = JSON.parse(output);

        expect(json.service).toBe('open_epaper_link.drawcustom');
        expect(json.target.entity_id).toBe('open_epaper_link.ABCDEF1234567890');
        expect(json.data.rotate).toBe(90);
        expect(json.data.payload).toHaveLength(1);
        expect(json.data.payload[0]).toMatchObject({
            id: 'w_text',
            type: 'text',
            x: 10,
            y: 20,
            value: 'Hello'
        });
    });

    it('OpenDisplayAdapter preserves visible widgets and includes id markers', async () => {
        const adapter = new OpenDisplayAdapter();
        const layout = {
            orientation: 'landscape',
            currentPageIndex: 0,
            darkMode: false,
            settings: {
                opendisplayEntityId: 'opendisplay.0011223344556677',
                opendisplayDither: 3,
                opendisplayTtl: 45
            },
            pages: [{
                dark_mode: 'inherit',
                widgets: [
                    { id: 'w_text', type: 'text', x: 5, y: 6, props: { text: 'Hi ODP' } },
                    { id: 'w_hidden', type: 'text', hidden: true, x: 0, y: 0, props: { text: 'Skip' } },
                    { id: 'w_group', type: 'group', x: 0, y: 0, props: {} }
                ]
            }]
        };

        const yaml = await adapter.generate(layout);

        expect(yaml).toContain('service: opendisplay.drawcustom');
        expect(yaml).toContain('entity_id: opendisplay.0011223344556677');
        expect(yaml).toContain('rotate: 0');
        expect(yaml).toContain('dither: 3');
        expect(yaml).toContain('ttl: 45');
        expect(yaml).toContain('# id: w_text');
        expect(yaml).toContain('- type: text');
        expect(yaml).toContain('value: Hi ODP');
        expect(yaml).not.toContain('w_hidden');
        expect(yaml).not.toContain('w_group');
    });
});
