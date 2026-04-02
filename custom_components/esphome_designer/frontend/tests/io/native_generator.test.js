import { describe, it, expect, vi } from 'vitest';
import { generateDisplayLambda, getCondProps } from '../../js/io/generators/native_generator.js';
import { registry } from '../../js/core/plugin_registry';
import { serializeWidget } from '../../js/io/yaml_export_lvgl.js';

// Deep-Mocking infrastructure for ULTRATHINK compliance
vi.mock('../../js/core/plugin_registry', () => ({
    registry: {
        get: vi.fn(),
        onExportHelpers: vi.fn()
    }
}));

vi.mock('../../js/core/utils', () => ({
    Utils: {
        getColorConst: vi.fn((c) => `COLOR_${c.toUpperCase()}`),
        getAlignX: vi.fn((_a, x) => x),
        getAlignY: vi.fn((_a, y) => y),
        addDitherMask: vi.fn()
    }
}));

vi.mock('../../js/core/constants', () => ({
    COLORS: {
        WHITE: "#FFFFFF",
        BLACK: "#000000",
        RED: "#FF0000",
        GREEN: "#00FF00",
        BLUE: "#0000FF",
        YELLOW: "#FFFF00",
        ORANGE: "#FFA500"
    },
    ALIGNMENT: {
        TOP_LEFT: "TOP_LEFT",
        CENTER: "CENTER"
    },
    DEFAULT_PREFERENCES: {
        renderingMode: 'direct'
    },
    ESPHOME_COLOR_MAPPING: {
        "white": "COLOR_WHITE",
        "black": "COLOR_BLACK"
    },
    HISTORY_LIMIT: 50,
    WIDGET_DEFAULTS: { X: 40, Y: 40, WIDTH: 200, HEIGHT: 60 },
    UI_DEFAULTS: { GRID_SIZE: 10 },
    ORIENTATIONS: { LANDSCAPE: "landscape", PORTRAIT: "portrait" },
    CACHE_TTL: { RSS: 300, ENTITIES: 60 },
    ENTITY_LIMIT: 5000,
    SNAP_DISTANCE: 10,
    GRID_SIZE: 10,
    DEFAULT_CANVAS_WIDTH: 800,
    DEFAULT_CANVAS_HEIGHT: 480
}));

vi.mock('../../js/utils/export_helpers.js', () => ({
    isEntityStateNonNumeric: vi.fn((ent) => ent.includes('weather') || ent.includes('text')),
    makeSafeId: vi.fn((eid, attr, suffix = '') => {
        const base = attr ? `${eid}_${attr}` : eid;
        const safe = base.replace(/[^a-z0-9_]/gi, '_').toLowerCase();
        const maxBaseLen = 63 - suffix.length;
        return `${safe.substring(0, maxBaseLen)}${suffix}`;
    })
}));

vi.mock('../../js/io/yaml_export_lvgl.js', () => ({
    serializeWidget: vi.fn((w) => `// [widget:${w.id}]`)
}));

describe('Native Generator', () => {
    const mockAdapter = {
        fonts: { addFont: vi.fn() }
    };

    describe('getCondProps', () => {
        it('should generate conditional properties string', () => {
            const widget = {
                condition_entity: 'binary_sensor.test',
                condition_operator: '==',
                condition_value: 'on',
                condition_invert: true
            };
            const result = getCondProps(widget);
            expect(result).toContain('cond_ent:"binary_sensor.test"');
            expect(result).toContain('cond_op:"=="');
            expect(result).toContain('cond_val:"on"');
            expect(result).toContain('cond_inv:"true"');
        });
    });

    describe('generateDisplayLambda', () => {
        const mockPages = [
            {
                name: 'Main',
                widgets: [
                    { id: 'w1', type: 'text', x: 10, y: 10, props: { text: 'Hello' } }
                ]
            }
        ];
        const mockLayout = { darkMode: false };
        const mockProfile = { id: 'test_lcd', features: {} };
        const mockContext = {
            adapter: mockAdapter
        };

        it('should generate basic LCD lambda structure', () => {
            const lines = generateDisplayLambda(mockPages, mockLayout, mockProfile, mockContext, mockAdapter);
            const output = lines.join('\n');

            expect(output).toContain('const auto COLOR_WHITE = Color(255, 255, 255);');
            expect(output).toContain('const auto COLOR_BLACK = Color(0, 0, 0);');
            expect(output).toContain('int currentPage = id(display_page);');
            expect(output).toContain('static int last_rendered_page = -1;');
            expect(output).toContain('// ▸ PAGE: Main');
        });

        it('should handle inverted colors for e-paper', () => {
            const epaperProfile = { id: 'epaper', features: { epaper: true } };
            const lines = generateDisplayLambda(mockPages, mockLayout, epaperProfile, mockContext, mockAdapter);
            const output = lines.join('\n');

            expect(output).toContain('const auto COLOR_WHITE = Color(0, 0, 0); // Inverted for e-ink');
            expect(output).toContain('apply_grey_dither_mask');
            expect(output).not.toContain('static int last_rendered_page = -1;');
        });

        it('should generate color palette for PhotoPainter', () => {
            const painterProfile = { id: 'esp32_s3_photopainter' };
            const lines = generateDisplayLambda(mockPages, mockLayout, painterProfile, mockContext, mockAdapter);
            const output = lines.join('\n');

            expect(output).toContain('const auto COLOR_GREEN = Color(255, 128, 0);');
        });

        it('should handle widget visibility conditions', () => {
            const conditionalWidget = {
                ...mockPages[0].widgets[0],
                condition_entity: 'switch.light',
                condition_operator: '==',
                condition_value: 'on'
            };
            const pagesWithCond = [{ ...mockPages[0], widgets: [conditionalWidget] }];

            // Use mocked registry correctly
            vi.mocked(registry.get).mockReturnValue({
                export: (w, _ctx) => [`it.print(${w.x}, ${w.y}, "Text");`]
            });

            const lines = generateDisplayLambda(pagesWithCond, mockLayout, mockProfile, mockContext, mockAdapter);
            const output = lines.join('\n');

            expect(output).toContain('// [widget:w1]');
            expect(output).toContain('it.print(10, 10, "Text");');
        });

        it('uses binary comparisons for input_boolean visibility conditions', () => {
            const conditionalWidget = {
                ...mockPages[0].widgets[0],
                condition_entity: 'input_boolean.night_mode',
                condition_operator: '==',
                condition_state: 'on'
            };
            const pagesWithCond = [{ ...mockPages[0], widgets: [conditionalWidget] }];

            vi.mocked(registry.get).mockReturnValue({
                export: (w, ctx) => [ctx.getConditionCheck(w), `it.print(${w.x}, ${w.y}, "Text");`]
            });

            const lines = generateDisplayLambda(pagesWithCond, mockLayout, mockProfile, mockContext, mockAdapter);
            const output = lines.join('\n');

            expect(output).toContain('if (id(input_boolean_night_mode).state == true) {');
            expect(output).not.toContain('std::string(id(input_boolean_night_mode).state)');
        });

        it('uses text sensor ids for non-binary string visibility conditions', () => {
            const conditionalWidget = {
                ...mockPages[0].widgets[0],
                condition_entity: 'input_select.heating_mode',
                condition_operator: '==',
                condition_state: 'Boost'
            };
            const pagesWithCond = [{ ...mockPages[0], widgets: [conditionalWidget] }];

            vi.mocked(registry.get).mockReturnValue({
                export: (w, ctx) => [ctx.getConditionCheck(w), `it.print(${w.x}, ${w.y}, "Text");`]
            });

            const lines = generateDisplayLambda(pagesWithCond, mockLayout, mockProfile, mockContext, mockAdapter);
            const output = lines.join('\n');

            expect(output).toContain('if (std::string(id(input_select_heating_mode_txt).state) == "Boost") {');
        });

        it('should preserve round-trip marker for lvgl widgets without export plugin', () => {
            vi.mocked(registry.get).mockReturnValue(null);

            const pages = [{
                name: 'LVGL',
                widgets: [
                    { id: 'lv1', type: 'lvgl_label', x: 30, y: 40, props: { text: 'Label' } }
                ]
            }];

            const lines = generateDisplayLambda(pages, mockLayout, mockProfile, mockContext, mockAdapter);
            const output = lines.join('\n');

            expect(output).toContain('// [widget:lv1]');
            expect(output).not.toContain('status:unsupported');
        });

        it('should emit page metadata comments with defaults', () => {
            vi.mocked(registry.get).mockReturnValue({
                export: () => ['it.print(1, 2, "x");']
            });

            const lines = generateDisplayLambda(
                [{ name: 'MetaPage', widgets: [{ id: 'w_meta', type: 'text', x: 1, y: 2, props: {} }] }],
                mockLayout,
                mockProfile,
                mockContext,
                mockAdapter
            );

            const output = lines.join('\n');
            expect(output).toContain('// page:name "MetaPage"');
            expect(output).toContain('// page:refresh_type "interval"');
            expect(output).toContain('// page:refresh_time ""');
            expect(output).toContain('// page:visible_from ""');
            expect(output).toContain('// page:visible_to ""');
        });

        it('should rewrite YAML widget markers to C++ comments inside the native lambda', () => {
            vi.mocked(registry.get).mockReturnValue({
                export: () => ['it.print(10, 10, "safe");']
            });
            vi.mocked(serializeWidget).mockReturnValue('# widget:text id:w1 type:text x:10 y:10 w:100 h:20');

            const lines = generateDisplayLambda(mockPages, mockLayout, mockProfile, mockContext, mockAdapter);
            const output = lines.join('\n');

            expect(output).toContain('// widget:text id:w1 type:text x:10 y:10 w:100 h:20');
            expect(output).not.toContain('# widget:text id:w1 type:text x:10 y:10 w:100 h:20');
        });
    });
});
