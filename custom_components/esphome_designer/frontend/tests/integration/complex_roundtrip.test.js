import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../js/utils/logger.js', () => ({
    Logger: { log: vi.fn(), warn: vi.fn(), error: vi.fn(), info: vi.fn() }
}));

import { AppState } from '../../js/core/state';
import { registry } from '../../js/core/plugin_registry';
import { ESPHomeAdapter } from '../../js/io/adapters/esphome_adapter';
import { OEPLAdapter } from '../../js/io/adapters/oepl_adapter.js';
import { OpenDisplayAdapter } from '../../js/io/adapters/opendisplay_adapter.js';
import { loadLayoutIntoState, parseSnippetYamlOffline } from '../../js/io/yaml_import';

import textPlugin from '../../features/text/plugin.js';
import graphPlugin from '../../features/graph/plugin.js';
import calendarPlugin from '../../features/calendar/plugin.js';
import weatherForecastPlugin from '../../features/weather_forecast/plugin.js';

function registerPlugins() {
    [textPlugin, graphPlugin, calendarPlugin, weatherForecastPlugin].forEach((plugin) => {
        registry.register(plugin);
    });
}

function getAllWidgetIds(pages) {
    return (pages || []).flatMap((page) => (page.widgets || []).map((widget) => widget.id));
}

function sortIds(pages) {
    return getAllWidgetIds(pages).slice().sort();
}

function createDirectComplexLayout() {
    return {
        name: 'Hardening Device',
        deviceName: 'Hardening Device',
        deviceModel: 'reterminal_e1001',
        currentLayoutId: 'hardening_direct',
        settings: {
            renderingMode: 'direct',
            orientation: 'portrait',
            darkMode: true
        },
        pages: [
            {
                id: 'page_0',
                name: 'Agenda',
                widgets: [
                    {
                        id: 'w_calendar',
                        type: 'calendar',
                        x: 8,
                        y: 12,
                        width: 320,
                        height: 250,
                        entity_id: 'sensor.family_calendar',
                        props: {
                            ...calendarPlugin.defaults,
                            show_events: true,
                            source_calendars: 'calendar.family, calendar.work',
                            font_size_event: 16
                        }
                    }
                ]
            },
            {
                id: 'page_1',
                name: 'Dashboard',
                widgets: [
                    {
                        id: 'w_graph',
                        type: 'graph',
                        x: 20,
                        y: 28,
                        width: 180,
                        height: 100,
                        entity_id: 'sensor.power',
                        title: 'Power',
                        props: {
                            ...graphPlugin.defaults,
                            duration: '6h',
                            line_thickness: 4,
                            min_value: '10',
                            max_value: '90',
                            border_width: 1
                        }
                    },
                    {
                        id: 'w_weather',
                        type: 'weather_forecast',
                        x: 12,
                        y: 150,
                        width: 360,
                        height: 96,
                        entity_id: 'weather.home',
                        props: {
                            ...weatherForecastPlugin.defaults,
                            forecast_mode: 'hourly',
                            hourly_mode: 'relative',
                            relative_count: 3,
                            temp_unit: 'F',
                            precision: 0
                        }
                    },
                    {
                        id: 'w_title',
                        type: 'text',
                        x: 18,
                        y: 4,
                        width: 120,
                        height: 24,
                        props: {
                            ...textPlugin.defaults,
                            text: 'Status'
                        }
                    }
                ]
            }
        ],
        assets: { fonts: [], images: [] }
    };
}

function createProtocolLayout(entityIdKey, entityIdValue) {
    return {
        orientation: 'portrait',
        darkMode: true,
        currentPageIndex: 1,
        settings: {
            [entityIdKey]: entityIdValue,
            opendisplayDither: 3,
            opendisplayTtl: 90
        },
        pages: [
            {
                id: 'page_0',
                name: 'Ignored',
                widgets: [{ id: 'w_ignored', type: 'text', x: 10, y: 10, props: { text: 'Ignore me' } }]
            },
            {
                id: 'page_1',
                name: 'Protocol',
                widgets: [
                    {
                        id: 'w_text_protocol_a',
                        type: 'text',
                        x: 24,
                        y: 18,
                        width: 180,
                        height: 24,
                        props: {
                            ...textPlugin.defaults,
                            text: 'Protocol A'
                        }
                    },
                    {
                        id: 'w_text_protocol_b',
                        type: 'text',
                        x: 14,
                        y: 54,
                        width: 120,
                        height: 24,
                        props: {
                            ...textPlugin.defaults,
                            text: 'Protocol B'
                        }
                    }
                ]
            }
        ]
    };
}

describe('complex workflow round-trip coverage', () => {
    beforeAll(() => {
        registerPlugins();
    });

    beforeEach(() => {
        AppState.reset();
    });

    it('round-trips complex multi-page direct layouts through parse and state reload', async () => {
        const adapter = new ESPHomeAdapter();
        const layout = createDirectComplexLayout();

        const generated = await adapter.generate(layout);
        expect(generated).toContain('// widget:calendar');
        expect(generated).toContain('// widget:graph');
        expect(generated).toContain('// widget:weather_forecast');

        const parsed = parseSnippetYamlOffline(generated);
        expect(parsed?.pages?.length).toBe(2);
        expect(parsed?.pages?.map((page) => page.name)).toEqual(['Agenda', 'Dashboard']);
        expect(sortIds(parsed?.pages)).toEqual(['w_calendar', 'w_graph', 'w_title', 'w_weather']);

        const graphWidget = parsed?.pages?.[1]?.widgets?.find((widget) => widget.id === 'w_graph');
        const weatherWidget = parsed?.pages?.[1]?.widgets?.find((widget) => widget.id === 'w_weather');
        expect(graphWidget?.props?.duration).toBe('6h');
        expect(graphWidget?.props?.line_thickness).toBe(4);
        expect(weatherWidget?.props?.forecast_mode).toBe('hourly');
        expect(weatherWidget?.props?.hourly_mode).toBe('relative');

        loadLayoutIntoState(parsed);
        expect(AppState.pages).toHaveLength(2);
        expect(sortIds(AppState.pages)).toEqual(['w_calendar', 'w_graph', 'w_title', 'w_weather']);
        expect(AppState.getPagesPayload().deviceModel).toBe('reterminal_e1001');

        const regenerated = await new ESPHomeAdapter().generate(AppState.getPagesPayload());
        const reparsed = parseSnippetYamlOffline(regenerated);
        expect(reparsed?.pages?.length).toBe(2);
        expect(sortIds(reparsed?.pages)).toEqual(['w_calendar', 'w_graph', 'w_title', 'w_weather']);
    });

    it('imports active-page protocol payloads without losing widget identity markers', async () => {
        const openDisplay = new OpenDisplayAdapter();
        const openDisplayLayout = createProtocolLayout('opendisplayEntityId', 'opendisplay.DEADBEEF0002');

        const openDisplayYaml = await openDisplay.generate(openDisplayLayout);
        expect(openDisplayYaml).toContain('entity_id: opendisplay.DEADBEEF0002');
        expect(openDisplayYaml).toContain('# id: w_text_protocol_a');
        expect(openDisplayYaml).toContain('# id: w_text_protocol_b');

        const openDisplayParsed = parseSnippetYamlOffline(openDisplayYaml);
        loadLayoutIntoState(openDisplayParsed);

        expect(AppState.pages).toHaveLength(1);
        expect(AppState.pages[0].widgets.length).toBe(2);
        expect(AppState.pages[0].widgets.map((widget) => widget.props?.text || widget.title)).toEqual(['Protocol A', 'Protocol B']);

        const oepl = new OEPLAdapter();
        const oeplLayout = createProtocolLayout('oeplEntityId', 'open_epaper_link.DEADBEEF0001');
        const oeplJson = await oepl.generate(oeplLayout);

        expect(oeplJson).toContain('"entity_id": "open_epaper_link.DEADBEEF0001"');
        expect(oeplJson).toContain('"id": "w_text_protocol_a"');
        expect(oeplJson).toContain('"id": "w_text_protocol_b"');

        const oeplParsed = parseSnippetYamlOffline(oeplJson);
        expect(oeplParsed?.pages?.[0]?.widgets?.map((widget) => widget.props?.text || widget.title)).toEqual(['Protocol A', 'Protocol B']);
    });
});
