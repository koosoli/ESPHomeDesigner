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
            props: { fill: false, border_width: 1, color: 'black', opacity: 100 }
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
            props: { fill: true, border_width: 1, color: 'black', opacity: 100 }
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
            props: { fill: false, border_width: 1, color: 'black', opacity: 100 }
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
            props: { fill: true, border_width: 1, color: 'black', opacity: 100 }
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

    it('returns null for unsupported drawing statements', () => {
        expect(parseCppDrawingCommand('it.print(0, 0, id(font), "Hello");', 9)).toBeNull();
    });
});
