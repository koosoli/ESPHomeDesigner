import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ESPHomeAdapter } from '../../js/io/adapters/esphome_adapter';
import { parseSnippetYamlOffline } from '../../js/io/yaml_import';
import { registry } from '../../js/core/plugin_registry';

// Mock Logger
vi.mock('../../js/utils/logger.js', () => ({
    Logger: { log: vi.fn(), warn: vi.fn(), error: vi.fn() }
}));

// Real plugins need minimal DOM/AppState globals
beforeEach(() => {
    vi.stubGlobal('document', {
        createElement: () => ({ style: {}, getContext: () => ({ fillRect: vi.fn(), measureText: () => ({ width: 100 }) }) })
    });
    vi.stubGlobal('window', {
        AppState: {
            entityStates: { "sensor.test": { state: "10" } },
            project: { id: "test", name: "Test", deviceProfile: "native", hardware: { type: "esp32" } }
        }
    });
});

// Setup window mock with js-yaml before tests
beforeEach(async () => {
    if (typeof window === 'undefined') {
        globalThis.window = {};
    }
    const jsyaml = await import('js-yaml');
    window.jsyaml = jsyaml.default || jsyaml;
});

const mockButtonPlugin = {
    id: 'button',
    export: (widget) => [`        btn_draw();`] // eslint-disable-line no-unused-vars
};

describe('ESPHomeAdapter & YamlImport Round-Trip', () => {

    it('round-trips a layout with mock plugins (Symmetry Check)', async () => {
        const adapter = new ESPHomeAdapter();
        // Force registry to return our mock for this test
        vi.spyOn(registry, 'get').mockImplementation((type) => {
            if (type === 'button') return mockButtonPlugin;
            return null;
        });

        const initialState = {
            pages: [{
                id: "page_1", widgets: [{ id: "w_btn", type: "button", x: 10, y: 10, width: 100, height: 50, props: {} }]
            }],
            deviceProfile: "native", hardware: { type: "esp32" }, assets: { fonts: [], images: [] }
        };

        const gen1 = await adapter.generate(initialState);
        const reimported = await parseSnippetYamlOffline(gen1);
        const gen2 = await adapter.generate({ ...initialState, pages: reimported.pages });

        expect(gen2).toBe(gen1);
        expect(gen1).toMatchSnapshot();
    });

    it('round-trips real plugins (Integration Check)', async () => {
        const adapter = new ESPHomeAdapter();

        // We use the real Text plugin if it's available in the registry, 
        // otherwise we skip. This ensures we test real logic if possible.
        const textPlugin = registry.get('text');
        if (!textPlugin) {
            console.warn("Real Text plugin not found in registry, skipping integration check.");
            return;
        }

        const initialState = {
            pages: [{
                id: "page_1",
                widgets: [{
                    id: "w_txt", type: "text", x: 50, y: 50, width: 200, height: 40,
                    props: { text: "Hello World", font_size: 24, align: "TOP_LEFT", color: "black" }
                }]
            }],
            deviceProfile: "native", hardware: { type: "esp32" }, assets: { fonts: [], images: [] }
        };

        const gen1 = await adapter.generate(initialState);
        expect(gen1).toContain('Hello World');

        const reimported = await parseSnippetYamlOffline(gen1);
        const gen2 = await adapter.generate({ ...initialState, pages: reimported.pages });

        // If the real plugin export is identical to what the map reconstructs, this will pass.
        expect(gen2).toBe(gen1);
    });

    it('round-trips multi-page native layout with deterministic widget exports', async () => {
        const adapter = new ESPHomeAdapter();

        vi.spyOn(registry, 'get').mockImplementation((type) => {
            if (type === 'button') {
                return {
                    export: (widget) => [
                        `        // button:${widget.id}`,
                        `        it.print(${widget.x}, ${widget.y}, id(font_roboto_20), "${widget.props?.text || ''}");`
                    ]
                };
            }
            if (type === 'text') {
                return {
                    export: (widget) => [
                        `        // text:${widget.id}`,
                        `        it.print(${widget.x}, ${widget.y}, id(font_roboto_20), "${widget.props?.text || ''}");`
                    ]
                };
            }
            return null;
        });

        const initialState = {
            pages: [
                {
                    id: 'page_1',
                    name: 'Main',
                    widgets: [
                        { id: 'w_btn', type: 'button', x: 10, y: 10, width: 100, height: 50, props: { text: 'Tap' } }
                    ]
                },
                {
                    id: 'page_2',
                    name: 'Status',
                    widgets: [
                        { id: 'w_txt', type: 'text', x: 20, y: 40, width: 200, height: 40, props: { text: 'OK' } }
                    ]
                }
            ],
            deviceProfile: 'native',
            hardware: { type: 'esp32' },
            assets: { fonts: [], images: [] }
        };

        const gen1 = await adapter.generate(initialState);
        const reimported = await parseSnippetYamlOffline(gen1);
        const gen2 = await adapter.generate({ ...initialState, pages: reimported.pages });

        expect(gen1).toContain('page:name "Main"');
        expect(gen1).toContain('page:name "Status"');
        expect(gen2).toContain('page:name "Main"');
        expect(gen2).toContain('page:name "Status"');
        expect(gen2).toContain('button:w_btn');
        expect(gen2).toContain('text:w_txt');
        expect(gen2).toContain('id:w_btn');
        expect(gen2).toContain('id:w_txt');
    });
});
