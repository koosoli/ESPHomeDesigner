import { describe, expect, it, vi } from 'vitest';

import {
    exportDoc,
    exportLVGL,
    onExportComponents,
    onExportGlobals,
    onExportTextSensors
} from '../../features/quote_rss/exports.js';

function createContext(overrides = {}) {
    return {
        lines: [],
        addFont: vi.fn((family, weight, size) => `${family}_${weight}_${size}`),
        getColorConst: (value) => `Color(${value})`,
        getConditionCheck: () => '',
        getAlignX: (_align, x, width) => `${x + width / 2}`,
        ...overrides
    };
}

describe('quote_rss exports', () => {
    it('exports direct and LVGL quote content for wrapped multi-item widgets', () => {
        const context = createContext();

        exportDoc({
            id: 'quote-widget',
            x: 10,
            y: 20,
            width: 180,
            height: 120,
            props: {
                item_count: 2,
                quote_font_size: 18,
                author_font_size: 12,
                text_align: 'CENTER',
                bg_color: 'white',
                border_width: 1,
                border_color: 'black',
                word_wrap: true,
                show_author: true
            }
        }, context);

        const output = context.lines.join('\n');
        expect(output).toContain('quote_quote_widget_text_global_0');
        expect(output).toContain('quote_quote_widget_author_global_1');
        expect(output).toContain('auto print_q = [&](esphome::font::Font *f, int line_h, bool draw) -> int {');
        expect(output).toContain('it.line(');

        const lvgl = exportLVGL({
            id: 'quote-widget',
            props: {
                item_count: 2,
                quote_font_size: 18,
                font_family: 'Roboto',
                show_author: true,
                text_align: 'CENTER'
            }
        }, {
            common: { id: 'quote-widget' },
            convertColor: (value) => `COLOR_${value}`,
            getLVGLFont: () => 'font_quote'
        });

        expect(lvgl.label.text).toContain('Loading quote...');
        expect(lvgl.label.text).toContain('\\n— ');
        expect(lvgl.label.text_font).toBe('font_quote');
    });

    it('exports globals, update loops, and template text sensors for quote feeds', () => {
        const globalsLines = [];
        const widgets = [
            {
                id: 'quote-feed',
                type: 'quote_rss',
                props: {
                    item_count: 2,
                    show_author: true,
                    random: true,
                    feed_url: 'https://quotes.example/rss',
                    ha_url: 'http://ha.local:8123/',
                    refresh_interval: '30m'
                }
            }
        ];

        onExportGlobals({ lines: globalsLines, widgets });
        const globalsOutput = globalsLines.join('\n');
        expect(globalsOutput).toContain('- id: quote_quote_feed_text_global_0');
        expect(globalsOutput).toContain('- id: quote_quote_feed_author_global_1');

        const componentLines = [];
        onExportComponents({
            lines: componentLines,
            widgets,
            displayId: 'display_main',
            isLvgl: true
        });
        const componentOutput = componentLines.join('\n');
        expect(componentOutput).toContain('http_request:');
        expect(componentOutput).toContain('rss_proxy?url=https%3A%2F%2Fquotes.example%2Frss&random=true&count=2');
        expect(componentOutput).toContain('lvgl.widget.refresh: quote-feed');
        expect(componentOutput).toContain('JsonArray arr = doc["quotes"].as<JsonArray>();');

        const textSensorLines = [];
        onExportTextSensors({ lines: textSensorLines, widgets });
        const textSensorOutput = textSensorLines.join('\n');
        expect(textSensorOutput).toContain('id: quote_quote_feed_txt_0');
        expect(textSensorOutput).toContain('name: "Quote Text 2"');
        expect(textSensorOutput).toContain('id: quote_quote_feed_author_sensor_1');
    });
});
