import { describe, it, expect, vi } from 'vitest';
import textPlugin from '../../features/text/plugin.js';
import sensorTextPlugin from '../../features/sensor_text/plugin.js';
import datetimePlugin from '../../features/datetime/plugin.js';
import iconPlugin from '../../features/icon/plugin.js';
import batteryIconPlugin from '../../features/battery_icon/plugin.js';
import shapeRectPlugin from '../../features/shape_rect/plugin.js';
import shapeCirclePlugin from '../../features/shape_circle/plugin.js';
import graphPlugin from '../../features/graph/plugin.js';
import progressBarPlugin from '../../features/progress_bar/plugin.js';
import qrCodePlugin from '../../features/qr_code/plugin.js';
import lvglButtonPlugin from '../../features/lvgl_button/plugin.js';
import lvglArcPlugin from '../../features/lvgl_arc/plugin.js';
import odpPlotPlugin from '../../features/odp_plot/plugin.js';

function createMockExportContext(overrides = {}) {
    const lines = [];
    return {
        lines,
        addFont: vi.fn((f, w, s, i) => `font_${f.toLowerCase().replace(/\s+/g, '_')}_${s}`),
        getColorConst: vi.fn(c => {
            if (c === "theme_auto") return "color_on";
            if (c === "black") return "color_on";
            if (c === "white") return "color_off";
            return c;
        }),
        addDitherMask: vi.fn(),
        getCondProps: vi.fn().mockReturnValue(""),
        getConditionCheck: vi.fn().mockReturnValue(null),
        sanitize: vi.fn(s => s ? s.toString().replace(/"/g, '\\"') : ""),
        getAlignX: vi.fn(a => 0),
        getAlignY: vi.fn(a => 0),
        Utils: {
            isGrayColor: vi.fn(() => false)
        },
        isEpaper: false,
        trackIcon: vi.fn(),
        ...overrides,
        getLines: () => lines
    };
}

describe('Export Path Round-Trip Enforcement', () => {

    describe('Core Text Plugins', () => {
        it('exports "text" plugin correctly', () => {
            const widget = {
                id: 'test_text',
                type: 'text',
                x: 10, y: 20, width: 100, height: 30,
                props: {
                    text: 'Hello World',
                    font_size: 24,
                    color: 'black',
                    align: 'CENTER'
                }
            };
            const ctx = createMockExportContext();
            textPlugin.export(widget, ctx);

            const yaml = ctx.getLines().join('\n');

            expect(yaml).toMatch(/widget:text/);
            expect(yaml).toMatch(/id:test_text/);
            expect(yaml).toMatch(/Hello World/);
            // Can be it.printf or wrapped text line depending on width
            expect(yaml).toMatch(/(printf|print_wrapped_text)/);
            expect(ctx.addFont).toHaveBeenCalledWith('Roboto', 400, 24, undefined);
        });

        it('exports "sensor_text" plugin with entity attributes', () => {
            const widget = {
                id: 'test_sensor',
                type: 'sensor_text',
                x: 5, y: 5, width: 80, height: 25,
                entity_id: 'sensor.temperature',
                props: {
                    value_font_size: 18,
                    prefix: 'Temp: ',
                    unit: '°C'
                }
            };
            const ctx = createMockExportContext();
            sensorTextPlugin.export(widget, ctx);

            const yaml = ctx.getLines().join('\n');
            expect(yaml).toMatch(/widget:sensor_text/);
            expect(yaml).toMatch(/entity:.*sensor\.temperature/);
            expect(yaml).toMatch(/Temp: /);
            // For wrapped text, id(sensor_temperature) might be in sprintf args
            expect(yaml).toMatch(/id\s*\(\s*sensor_temperature\s*\)/);
        });

        it('exports "datetime" plugin correctly', () => {
            const widget = {
                id: 'test_clock',
                type: 'datetime',
                x: 0, y: 0, width: 200, height: 60,
                props: {
                    format: 'time_only',
                    time_font_size: 32,
                    color: 'white'
                }
            };
            const ctx = createMockExportContext();
            datetimePlugin.export(widget, ctx);

            const yaml = ctx.getLines().join('\n');
            expect(yaml).toMatch(/widget:datetime/);
            expect(yaml).toMatch(/fmt:time_only/);
            expect(yaml).toContain('%H:%M');
            expect(ctx.getColorConst).toHaveBeenCalledWith('white');
        });
    });

    describe('Icon Plugins', () => {
        it('exports "icon" plugin correctly', () => {
            const widget = {
                id: 'test_icon', type: 'icon', x: 50, y: 50, width: 60, height: 60,
                props: { code: 'F07D0', size: 48, color: 'black', fit_icon_to_frame: true }
            };
            const ctx = createMockExportContext();
            iconPlugin.export(widget, ctx);

            const yaml = ctx.getLines().join('\n');
            expect(yaml).toMatch(/widget:icon/);
            expect(yaml).toMatch(/code:F07D0/);
            expect(yaml).toContain('\\U000F07D0');
            // trackIcon is in collectRequirements, not export
            // expect(ctx.trackIcon).toHaveBeenCalledWith('F07D0', 48);
        });

        it('exports "battery_icon" plugin correctly', () => {
            const widget = {
                id: 'test_battery', type: 'battery_icon', x: 10, y: 10, width: 40, height: 40,
                props: { size: 32, color: 'green', local: true }
            };
            const ctx = createMockExportContext();
            batteryIconPlugin.export(widget, ctx);

            const yaml = ctx.getLines().join('\n');
            expect(yaml).toMatch(/widget:battery_icon/);
            expect(yaml).toMatch(/size:32/);
            expect(yaml).toMatch(/color:green/);
        });
    });

    describe('Shape Plugins', () => {
        it('exports "shape_rect" plugin correctly', () => {
            const widget = {
                id: 'test_rect', type: 'shape_rect', x: 0, y: 0, width: 100, height: 50,
                props: { fill: true, color: 'blue', border_width: 2 }
            };
            const ctx = createMockExportContext();
            shapeRectPlugin.export(widget, ctx);

            const yaml = ctx.getLines().join('\n');
            expect(yaml).toMatch(/widget:shape_rect/);
            expect(yaml).toMatch(/filled_rectangle\(0, 0, 100, 50/);
        });

        it('exports "shape_circle" plugin correctly', () => {
            const widget = {
                id: 'test_circle', type: 'shape_circle', x: 20, y: 20, width: 40, height: 40,
                props: { fill: false, color: 'red' }
            };
            const ctx = createMockExportContext();
            shapeCirclePlugin.export(widget, ctx);

            const yaml = ctx.getLines().join('\n');
            expect(yaml).toMatch(/widget:shape_circle/);
            expect(yaml).toContain('it.circle(40, 40, 20');
        });
    });

    describe('Data Plugins', () => {
        it('exports "graph" plugin correctly', () => {
            const widget = {
                id: 'test_graph', type: 'graph', x: 0, y: 0, width: 200, height: 100,
                entity_id: 'sensor.power',
                props: { duration: '24h', color: 'red', border: true }
            };
            const ctx = createMockExportContext();
            graphPlugin.export(widget, ctx);

            const yaml = ctx.getLines().join('\n');
            expect(yaml).toMatch(/widget:graph/);
            expect(yaml).toMatch(/entity:.*sensor\.power/);
        });

        it('exports "progress_bar" plugin correctly', () => {
            const widget = {
                id: 'test_bar', type: 'progress_bar', x: 0, y: 0, width: 100, height: 20,
                props: { progress_value: 50, color: 'blue', show_label: true }
            };
            const ctx = createMockExportContext();
            progressBarPlugin.export(widget, ctx);

            const yaml = ctx.getLines().join('\n');
            expect(yaml).toMatch(/widget:progress_bar/);
            expect(yaml).toMatch(/color:blue/);
        });

        it('exports "qr_code" plugin correctly', () => {
            const widget = {
                id: 'test_qr', type: 'qr_code', x: 0, y: 0, width: 100, height: 100,
                props: { value: 'https://example.com', scale: 3, color: 'black' }
            };
            const ctx = createMockExportContext();
            qrCodePlugin.export(widget, ctx);

            const yaml = ctx.getLines().join('\n');
            expect(yaml).toMatch(/widget:qr_code/);
            expect(yaml).toMatch(/value:.*https:\/\/example\.com/);
        });
    });

    describe('LVGL Plugins', () => {
        const lvglCtx = {
            common: { x: 0, y: 0, width: 100, height: 30 },
            convertColor: c => c,
            convertAlign: a => a,
            getLVGLFont: (f, s, w) => `font_${f}_${s}`,
            formatOpacity: o => o
        };

        it('exports "lvgl_button" plugin correctly', () => {
            const widget = {
                id: 'test_btn', type: 'lvgl_button', x: 10, y: 10, width: 80, height: 40,
                props: { text: 'Click Me', bg_color: 'blue' }
            };
            const res = lvglButtonPlugin.exportLVGL(widget, lvglCtx);
            expect(res.button).toBeDefined();
            expect(res.button.widgets[0].label.text).toMatch(/Click Me/);
        });

        it('exports "lvgl_arc" plugin correctly', () => {
            const widget = {
                id: 'test_arc', type: 'lvgl_arc', x: 0, y: 0, width: 100, height: 100,
                props: { min: 0, max: 200, value: 50, color: 'red' }
            };
            const res = lvglArcPlugin.exportLVGL(widget, lvglCtx);
            expect(res.arc).toBeDefined();
            expect(res.arc.min_value).toBe(0);
            expect(res.arc.max_value).toBe(200);
            expect(res.arc.value).toBe(50);
        });
    });

    describe('ODP Plugins', () => {
        const odpCtx = { layout: { orientation: 'landscape' }, page: { id: 'page_0' } };

        it('exports "odp_plot" plugin correctly', () => {
            const widget = {
                id: 'test_plot', type: 'odp_plot', x: 0, y: 0, width: 200, height: 100,
                props: { duration: 3600, data: [{ entity: 'sensor.temp' }] }
            };
            const res = odpPlotPlugin.exportOEPL(widget, odpCtx);
            expect(res.type).toBe('plot');
            expect(res.duration).toBe(3600);
            expect(res.data[0].entity).toBe('sensor.temp');
        });
    });
});
