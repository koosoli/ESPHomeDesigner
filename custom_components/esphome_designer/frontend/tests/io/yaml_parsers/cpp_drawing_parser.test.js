import { describe, expect, it } from 'vitest';

import { parseCppDrawingCommand } from '../../../js/io/yaml_parsers/cpp_drawing_parser.js';

describe('cpp_drawing_parser', () => {
    it('parses rectangle commands with and without COLOR_OFF markers', () => {
        expect(parseCppDrawingCommand('it.rectangle(1, 2, 30, 40);', 3)).toEqual({
            id: 'w_rect_3',
            type: 'shape_rect',
            x: 1,
            y: 2,
            width: 30,
            height: 40,
            title: '',
            entity_id: '',
            props: { border_width: 1, bg_color: 'transparent', border_color: 'black', opacity: 100 }
        });

        expect(parseCppDrawingCommand('it.filled_rectangle(5, 6, 7, 8, COLOR_OFF);', 4)).toEqual({
            id: 'w_frect_4',
            type: 'shape_rect',
            x: 5,
            y: 6,
            width: 7,
            height: 8,
            title: '',
            entity_id: '',
            props: { border_width: 1, bg_color: 'black', border_color: 'black', opacity: 100 }
        });
    });

    it('parses circle commands into circle widgets centered on the source coordinates', () => {
        expect(parseCppDrawingCommand('it.circle(20, 25, 10);', 5)).toEqual({
            id: 'w_circle_5',
            type: 'shape_circle',
            x: 10,
            y: 15,
            width: 20,
            height: 20,
            title: '',
            entity_id: '',
            props: { border_width: 1, bg_color: 'transparent', border_color: 'black', opacity: 100 }
        });

        expect(parseCppDrawingCommand('it.filled_circle(40, 50, 5, COLOR_OFF);', 6)).toEqual({
            id: 'w_fcircle_6',
            type: 'shape_circle',
            x: 35,
            y: 45,
            width: 10,
            height: 10,
            title: '',
            entity_id: '',
            props: { border_width: 1, bg_color: 'black', border_color: 'black', opacity: 100 }
        });
    });

    it('parses horizontal and vertical line commands and derives orientation', () => {
        expect(parseCppDrawingCommand('it.line(0, 10, 50, 12);', 7)).toEqual({
            id: 'w_line_7',
            type: 'line',
            x: 0,
            y: 10,
            width: 50,
            height: 2,
            title: '',
            entity_id: '',
            props: {
                stroke_width: 1,
                color: 'black',
                orientation: 'horizontal'
            }
        });

        expect(parseCppDrawingCommand('it.line(10, 0, 14, 40);', 8)).toEqual({
            id: 'w_line_8',
            type: 'line',
            x: 10,
            y: 0,
            width: 4,
            height: 40,
            title: '',
            entity_id: '',
            props: {
                stroke_width: 1,
                color: 'black',
                orientation: 'vertical'
            }
        });
    });

    it('parses print commands into text widgets', () => {
        expect(parseCppDrawingCommand('it.print(100, 140, id(montserrat_28), Color(0,255,0), TextAlign::LEFT, "Hello World1");', 9)).toMatchObject({
            id: 'w_text_9',
            type: 'text',
            x: 100,
            y: 140,
            props: {
                text: 'Hello World1',
                font_family: 'Montserrat',
                font_size: 28,
                color: '#00FF00',
                text_align: 'TOP_LEFT'
            }
        });

        expect(parseCppDrawingCommand('it.print(4, 5, id(font_18), Color::RED, "Plain color");', 10)).toMatchObject({
            props: {
                text: 'Plain color',
                font_family: 'Font',
                font_size: 18,
                color: 'red',
                text_align: 'TOP_LEFT'
            }
        });

        expect(parseCppDrawingCommand('it.print(6, 7, id(label_font), "No color");', 11)).toMatchObject({
            props: {
                text: 'No color',
                font_family: 'Label Font',
                font_size: 20,
                color: 'black'
            }
        });

        expect(parseCppDrawingCommand('it.print(8, 9, id(font_12), Color::BLUE, TextAlign::BOTTOM_RIGHT, "Escaped \\"quote\\"");', 12)).toMatchObject({
            props: {
                text: 'Escaped \\"quote\\"',
                color: 'blue',
                text_align: 'BOTTOM_RIGHT'
            }
        });

        expect(parseCppDrawingCommand('it.print(10, 11, id(font_12), Color::MAGENTA, TextAlign::RIGHT, "Fallback color");', 13)).toMatchObject({
            props: {
                color: 'black',
                text_align: 'TOP_RIGHT'
            }
        });

        expect(parseCppDrawingCommand('it.print(12, 13, id(font_12), Color::GREEN, TextAlign::CENTER, "Center");', 14)).toMatchObject({
            props: {
                color: 'green',
                text_align: 'TOP_CENTER'
            }
        });

        expect(parseCppDrawingCommand('it.print(12, 13, id(font_12), Color::YELLOW, TextAlign::CENTER_RIGHT, "Center right");', 15)).toMatchObject({
            props: {
                color: 'yellow',
                text_align: 'CENTER_RIGHT'
            }
        });

        expect(parseCppDrawingCommand('it.print(12, 13, id(font_12), Color::BLACK, TextAlign::BOTTOM_LEFT, "Bottom left");', 16)).toMatchObject({
            props: {
                color: 'black',
                text_align: 'BOTTOM_LEFT'
            }
        });

        expect(parseCppDrawingCommand('it.print(12, 13, id(font_12), Color::WHITE, TextAlign::TOP_RIGHT, "Top right");', 17)).toMatchObject({
            props: {
                color: 'white',
                text_align: 'TOP_RIGHT'
            }
        });

        expect(parseCppDrawingCommand('it.print(x, y, id(font), Color::WHITE, TextAlign::LEFT, "Bad position");', 18)).toBeNull();
        expect(parseCppDrawingCommand('it.print(1, 2, id(font), Color::WHITE, TextAlign::LEFT, "");', 19)).toBeNull();
        expect(parseCppDrawingCommand('it.print(1, 2, id(font));', 20)).toBeNull();
    });

    it('returns null for unsupported drawing statements', () => {
        expect(parseCppDrawingCommand('it.start_clipping(0, 0, 10, 10);', 9)).toBeNull();
    });
});
