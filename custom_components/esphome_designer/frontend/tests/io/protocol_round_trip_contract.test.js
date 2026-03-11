import { describe, it, expect, beforeAll, beforeEach, vi } from 'vitest';

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
import { parseSnippetYamlOffline } from '../../js/io/yaml_import';

/**
 * @param {string} yamlText
 * @returns {any[]}
 */
function extractPayloadFromOdpServiceYaml(yamlText) {
    const doc = window.jsyaml.load(yamlText) || {};
    let payload = doc?.data?.payload || [];
    if (typeof payload === 'string') {
        payload = window.jsyaml.load(payload) || [];
    }
    return Array.isArray(payload) ? payload : [];
}

describe('Protocol adapter deep round-trip contracts', () => {
    beforeAll(async () => {
        if (typeof window === 'undefined') {
            globalThis.window = {};
        }
        const jsyaml = await import('js-yaml');
        window.jsyaml = jsyaml.default || jsyaml;
    });

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

    it('OEPL service payload is round-trip stable after import/re-export', async () => {
        const adapter = new OEPLAdapter();
        const initialLayout = {
            orientation: 'portrait',
            darkMode: false,
            currentPageIndex: 0,
            settings: { oeplEntityId: 'open_epaper_link.ABCDEF1234567890' },
            pages: [{
                widgets: [
                    { id: 'w_1', type: 'text', x: 10, y: 20, props: { text: 'Hello OEPL' } },
                    { id: 'w_hidden', type: 'text', hidden: true, x: 1, y: 2, props: { text: 'Skip' } },
                    { id: 'w_group', type: 'group', x: 0, y: 0, props: {} }
                ]
            }]
        };

        const gen1 = await adapter.generate(initialLayout);
        const imported = await parseSnippetYamlOffline(gen1);
        const gen2 = await adapter.generate({
            ...initialLayout,
            pages: imported.pages
        });

        const payload1 = JSON.parse(gen1).data.payload;
        const payload2 = JSON.parse(gen2).data.payload;

        expect(payload2).toEqual(payload1);
        expect(payload2).toHaveLength(1);
        expect(payload2[0].id).toBe('w_1');
        expect(payload2[0].value).toBe('Hello OEPL');
    });

    it('OpenDisplay service payload is round-trip stable after import/re-export', async () => {
        const adapter = new OpenDisplayAdapter();
        const initialLayout = {
            orientation: 'landscape',
            darkMode: false,
            currentPageIndex: 0,
            settings: {
                opendisplayEntityId: 'opendisplay.0011223344556677',
                opendisplayDither: 3,
                opendisplayTtl: 45
            },
            pages: [{
                dark_mode: 'inherit',
                widgets: [
                    { id: 'w_1', type: 'text', x: 5, y: 6, props: { text: 'Hello ODP' } },
                    { id: 'w_hidden', type: 'text', hidden: true, x: 1, y: 2, props: { text: 'Skip' } },
                    { id: 'w_group', type: 'group', x: 0, y: 0, props: {} }
                ]
            }]
        };

        const gen1 = await adapter.generate(initialLayout);
        const imported = await parseSnippetYamlOffline(gen1);
        const gen2 = await adapter.generate({
            ...initialLayout,
            pages: imported.pages
        });

        const payload1 = extractPayloadFromOdpServiceYaml(gen1);
        const payload2 = extractPayloadFromOdpServiceYaml(gen2);

        expect(payload2).toEqual(payload1);
        expect(payload2).toHaveLength(1);
        expect(payload2[0].value).toBe('Hello ODP');
    });
});
