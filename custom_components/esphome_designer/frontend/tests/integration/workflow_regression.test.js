import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../js/utils/logger.js', () => ({
    Logger: { log: vi.fn(), warn: vi.fn(), error: vi.fn(), info: vi.fn() }
}));

import { AppState } from '../../js/core/state';
import { registry } from '../../js/core/plugin_registry';
import { ESPHomeAdapter } from '../../js/io/adapters/esphome_adapter';
import { OEPLAdapter } from '../../js/io/adapters/oepl_adapter.js';
import { OpenDisplayAdapter } from '../../js/io/adapters/opendisplay_adapter.js';
import { loadLayoutIntoState, parseSnippetYamlOffline } from '../../js/io/yaml_import';

function createTextPlugin() {
    return {
        export: (widget) => [
            `        // text:${widget.id}`,
            `        // id:${widget.id}`,
            `        it.print(${widget.x}, ${widget.y}, id(font_roboto_20), "${widget.props?.text || ''}");`
        ],
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
}

describe('workflow regression coverage', () => {
    beforeEach(() => {
        AppState.reset();
        vi.restoreAllMocks();
        vi.spyOn(registry, 'get').mockImplementation((type) => {
            if (type === 'text') {
                return createTextPlugin();
            }
            return null;
        });
    });

    it('restores multi-page ESPHome exports back into application state', async () => {
        const adapter = new ESPHomeAdapter();
        const initialLayout = {
            name: 'Regression Device',
            deviceName: 'Regression Device',
            deviceModel: 'reterminal_e1001',
            currentLayoutId: 'workflow-direct',
            settings: { renderingMode: 'direct', orientation: 'portrait' },
            pages: [
                {
                    id: 'page_0',
                    name: 'Overview',
                    widgets: [{ id: 'w_text', type: 'text', x: 10, y: 20, props: { text: 'Hello Direct' } }]
                },
                {
                    id: 'page_1',
                    name: 'Status',
                    widgets: [{ id: 'w_status', type: 'text', x: 30, y: 40, props: { text: 'Status OK' } }]
                }
            ],
            assets: { fonts: [], images: [] }
        };

        const generated = await adapter.generate(initialLayout);
        const parsed = parseSnippetYamlOffline(generated);
        loadLayoutIntoState(parsed);

        expect(AppState.pages.length).toBe(2);
        expect(AppState.pages.map((page) => page.name)).toEqual(['Overview', 'Status']);
        expect(AppState.getWidgetById('w_text')).toBeDefined();
        expect(AppState.getWidgetById('w_status')).toBeDefined();
        expect(AppState.getPagesPayload().pages[1].widgets[0].id).toBe('w_status');
    });

    it('loads OEPL service payload imports into AppState', async () => {
        const adapter = new OEPLAdapter();
        const layout = {
            orientation: 'portrait',
            currentPageIndex: 0,
            settings: { oeplEntityId: 'open_epaper_link.DEADBEEF0001' },
            pages: [{
                id: 'page_0',
                name: 'Protocol',
                widgets: [{ id: 'w_oepl_text', type: 'text', x: 16, y: 24, props: { text: 'Hello OEPL' } }]
            }]
        };

        const generated = await adapter.generate(layout);
        const parsed = parseSnippetYamlOffline(generated);
        loadLayoutIntoState(parsed);

        expect(AppState.pages.length).toBe(1);
        expect(AppState.pages[0].widgets).toHaveLength(1);
        expect(AppState.pages[0].widgets[0].id).toBe('w_oepl_text');
        expect(AppState.pages[0].widgets[0].props?.text).toBe('Hello OEPL');
    });

    it('loads OpenDisplay service payload imports into AppState', async () => {
        const adapter = new OpenDisplayAdapter();
        const layout = {
            orientation: 'landscape',
            darkMode: false,
            currentPageIndex: 0,
            settings: {
                opendisplayEntityId: 'opendisplay.DEADBEEF0002',
                opendisplayDither: 2,
                opendisplayTtl: 90
            },
            pages: [{
                id: 'page_0',
                name: 'Protocol',
                dark_mode: 'inherit',
                widgets: [{ id: 'w_odp_text', type: 'text', x: 22, y: 18, props: { text: 'Hello ODP' } }]
            }]
        };

        const generated = await adapter.generate(layout);
        const parsed = parseSnippetYamlOffline(generated);
        loadLayoutIntoState(parsed);

        expect(AppState.pages.length).toBe(1);
        expect(AppState.pages[0].widgets).toHaveLength(1);
        expect(AppState.pages[0].widgets[0].type).toBe('text');
        expect(AppState.pages[0].widgets[0].props?.text).toBe('Hello ODP');
    });
});
