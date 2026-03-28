import { describe, expect, it, vi } from 'vitest';

vi.mock('../../../js/utils/logger.js', () => ({
    Logger: { log: vi.fn(), warn: vi.fn(), error: vi.fn() }
}));

import { parseDisplayBlocks } from '../../../js/io/yaml_parsers/display_parser.js';
import { extractLambdaLines } from '../../../js/io/yaml_parsers/lambda_extractor.js';

describe('display_parser integration', () => {
    it('extracts lambda, lvgl, and service payload blocks with indentation preserved where needed', () => {
        expect(extractLambdaLines([
            'display:',
            '  - platform: st7789v',
            '    lambda: |-',
            '      it.line(0, 0, 10, 10);',
            'next_key: true'
        ], '')).toEqual(['it.line(0, 0, 10, 10);']);

        expect(extractLambdaLines([
            'lvgl:',
            '  widgets:',
            '    - label:',
            '        text: "Hello"',
            'esphome:',
            '  name: demo'
        ], '')).toEqual([
            '  widgets:',
            '    - label:',
            '        text: "Hello"'
        ]);

        expect(extractLambdaLines([
            'payload: |-',
            '  - type: text',
            '    value: "Hi"',
            'done: true'
        ], '')).toEqual([
            '  - type: text',
            '    value: "Hi"'
        ]);
    });

    it('parses page metadata, widget markers, native LVGL blocks, nested widgets, and draw fallbacks', () => {
        const lambdaLines = [
            'if (page == 0) {',
            '// page:name "Overview"',
            '// page:dark_mode "dark"',
            '// page:refresh_type "time"',
            '// page:refresh_time "08:00"',
            '// page:visible_from "06:00"',
            '// page:visible_to "22:00"',
            'bg_color: 0xFFFFFF',
            'bg_opa: 50%',
            '// widget:text id:text_1 x:10 y:12 w:100 h:24 text:"Hello" font:"Inter" color:"#112233"',
            '  it.print(10, 12, id(font), "skip rendered block");',
            'case 0: interval = 45;',
            '  - id: page_1',
            '    layout: 2x2',
            '    - label:',
            '        id: child_label',
            '        x: 12',
            '        y: 14',
            '        width: 90',
            '        height: 24',
            '        text: "Native"',
            '        color: 0xFF0000',
            '        widgets:',
            '          - button:',
            '              id: nested_btn',
            '              x: 5',
            '              y: 7',
            '              width: 30',
            '              height: 16',
            '              text: "Tap"',
            'it.filled_circle(60, 70, 8);'
        ];

        const yaml = {
            load: vi.fn((yamlStr) => {
                if (yamlStr.includes('id: child_label')) {
                    return {
                        id: 'child_label',
                        x: '12',
                        y: '14',
                        width: '90',
                        height: '24',
                        text: '"Native"',
                        color: '0xFF0000',
                        widgets: [
                            {
                                button: {
                                    id: 'nested_btn',
                                    x: '5',
                                    y: '7',
                                    width: '30',
                                    height: '16',
                                    text: 'Tap'
                                }
                            }
                        ]
                    };
                }
                return {};
            })
        };

        const layout = parseDisplayBlocks(
            lambdaLines,
            [],
            { device_name: 'Demo Device', renderingMode: 'lvgl' },
            () => ({}),
            yaml
        );

        expect(layout.name).toBe('Demo Device');
        expect(layout.pages).toHaveLength(2);

        expect(layout.pages[0]).toMatchObject({
            id: 'page_0',
            name: 'Overview',
            refresh_s: 45,
            refresh_type: 'time',
            refresh_time: '08:00',
            visible_from: '06:00',
            visible_to: '22:00',
            dark_mode: 'dark',
            bg_color: '#FFFFFF',
            bg_opa: 127
        });
        expect(layout.pages[0].widgets[0]).toMatchObject({
            id: 'text_1',
            type: 'text',
            x: 10,
            y: 12,
            width: 100,
            height: 24,
            props: {
                text: 'Hello',
                font_family: 'Inter',
                color: '#112233'
            }
        });

        expect(layout.pages[1]).toMatchObject({
            id: 'page_1',
            name: 'page_1',
            layout: '2x2'
        });
        expect(layout.pages[1].widgets[0]).toMatchObject({
            id: 'child_label',
            type: 'lvgl_label',
            x: 12,
            y: 14,
            width: 90,
            height: 24,
            props: {
                text: 'Native',
                text_color: '#ff0000'
            }
        });
        expect(layout.pages[1].widgets[1]).toMatchObject({
            id: 'nested_btn',
            type: 'lvgl_button',
            x: 17,
            y: 21,
            width: 30,
            height: 16,
            props: {
                text: 'Tap'
            }
        });
        expect(layout.pages[1].widgets[2]).toMatchObject({
            type: 'shape_circle',
            x: 52,
            y: 62,
            width: 16,
            height: 16,
            props: {
                fill: true
            }
        });
    });

    it('falls back cleanly when native YAML sub-block parsing fails', () => {
        const yaml = {
            load: vi.fn(() => {
                throw new Error('bad yaml');
            })
        };

        const layout = parseDisplayBlocks([
            '  - label:',
            '      text: "Broken"',
            'if (page == 1) {',
            'it.rectangle(1, 2, 3, 4);'
        ], [], { device_name: 'Fallback' }, () => ({}), yaml);

        expect(layout.pages[0].widgets[0]).toMatchObject({
            id: 'lv_label_0',
            type: 'lvgl_label',
            x: 0,
            y: 0,
            width: 100,
            height: 30
        });
        expect(layout.pages[0].widgets[1]).toMatchObject({
            type: 'shape_rect',
            x: 1,
            y: 2,
            width: 3,
            height: 4
        });
    });
});
