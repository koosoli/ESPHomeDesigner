import { describe, it, expect, vi } from 'vitest';
import { parseDisplayBlocks } from '../../js/io/yaml_parsers/display_parser.js';
import { extractLambdaLines } from '../../js/io/yaml_parsers/lambda_extractor.js';
import { parseOEPLArrayToLayout } from '../../js/io/yaml_parsers/oepl_parser.js';
import { buildWidgetProps } from '../../js/io/yaml_parsers/widget_props_map.js';

vi.mock('../../../utils/logger.js', () => ({
    Logger: { log: vi.fn(), warn: vi.fn(), error: vi.fn() }
}));

describe('YAML Parsers', () => {
    describe('lambda_extractor', () => {
        it('should extract lambda lines from simple display block', () => {
            const lines = [
                'display:',
                '  - platform: st7789v',
                '    lambda: |-',
                '      it.print(0, 0, id(font1), "Hello World");',
                '      it.line(0, 10, 100, 10);',
                'some_other_key: true'
            ];
            const result = extractLambdaLines(lines, lines.join('\n'));
            expect(result).toContain('it.print(0, 0, id(font1), "Hello World");');
            expect(result).toContain('it.line(0, 10, 100, 10);');
        });

        it('should handle empty lines gracefully', () => {
            expect(extractLambdaLines([], '')).toEqual([]);
        });

        it('should extract non-lambda lvgl blocks', () => {
            const lines = [
                'lvgl:',
                '  widgets:',
                '    - label:',
                '        text: "Hello"',
                'esphome:',
                '  name: test'
            ];

            const result = extractLambdaLines(lines, lines.join('\n'));
            expect(result).toContain('  widgets:');
            expect(result).toContain('    - label:');
            expect(result).toContain('        text: "Hello"');
            expect(result).not.toContain('esphome:');
        });
    });

    describe('display_parser', () => {
        it('should parse C++ drawing commands into widgets', () => {
            const lambdaLines = [
                'it.filled_rectangle(5, 5, 50, 50);',
                'it.circle(20, 20, 10);'
            ];
            const deviceSettings = { renderingMode: 'direct' };
            const getESPHomeSchema = () => ({});
            const mockYaml = { load: vi.fn() };

            const result = parseDisplayBlocks(lambdaLines, [], deviceSettings, getESPHomeSchema, mockYaml);

            expect(result.pages).toHaveLength(1);
            const widgets = result.pages[0].widgets;
            expect(widgets).toHaveLength(2);

            // it.filled_rectangle(5, 5, 50, 50) -> shape_rect, x:5, y:5, w:50, h:50
            expect(widgets[0]).toMatchObject({
                type: 'shape_rect',
                x: 5,
                y: 5,
                width: 50,
                height: 50,
                props: {
                    bg_color: 'black',
                    border_color: 'black',
                    border_width: 1
                }
            });

            // it.circle(20, 20, 10) -> shape_circle, x:20-10=10, y:20-10=10, w:20, h:20
            expect(widgets[1]).toMatchObject({
                type: 'shape_circle',
                x: 10,
                y: 10,
                width: 20,
                height: 20,
                props: {
                    bg_color: 'transparent',
                    border_color: 'black',
                    border_width: 1
                }
            });
        });
    });

    describe('oepl_parser', () => {
        it('should parse OEPL array into project state', () => {
            const items = [
                { id: 'w1', type: 'text', x: 10, y: 10, value: 'OEPL Text', size: 20 }
            ];
            const result = parseOEPLArrayToLayout(items);

            expect(result.pages).toHaveLength(1);
            expect(result.pages[0].widgets[0]).toMatchObject({
                id: 'w1',
                type: 'text',
                x: 10,
                y: 10
            });
            expect(result.pages[0].widgets[0].props.text).toBe('OEPL Text');
        });

        it('should map templated OEPL text into sensor_text widget', () => {
            const items = [
                {
                    id: 'temp_widget',
                    type: 'text',
                    x: 12,
                    y: 24,
                    size: 18,
                    value: "Temp: {{ states('sensor.room_temperature') }} °C"
                }
            ];

            const result = parseOEPLArrayToLayout(items);
            const widget = result.pages[0].widgets[0];

            expect(widget.type).toBe('sensor_text');
            expect(widget.entity_id).toBe('sensor.room_temperature');
            expect(widget.props.prefix).toBe('Temp: ');
            expect(widget.props.postfix).toBe(' °C');
            expect(widget.props.value_font_size).toBe(18);
        });

        it('should skip unknown oepl widget types', () => {
            const items = [
                { id: 'unknown_1', type: 'made_up_type', x: 1, y: 2 },
                { id: 'known_1', type: 'text', x: 3, y: 4, value: 'ok' }
            ];

            const result = parseOEPLArrayToLayout(items);
            expect(result.pages[0].widgets).toHaveLength(1);
            expect(result.pages[0].widgets[0].id).toBe('known_1');
        });
    });

    describe('widget_props_map', () => {
        it('should map flat ESPHome props to structured widget props', () => {
            const rawProps = {
                text: 'Hello',
                font: 'font1',
                color: '#FF0000',
                x: 10,
                y: 20
            };
            const mapped = buildWidgetProps('text', rawProps);

            expect(mapped).toMatchObject({
                text: 'Hello',
                font_family: 'font1',
                color: '#FF0000'
            });
        });
    });
});
