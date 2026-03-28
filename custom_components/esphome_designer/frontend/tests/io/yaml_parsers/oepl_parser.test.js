import { describe, expect, it, vi } from 'vitest';

vi.mock('../../../js/utils/logger.js', () => ({
    Logger: {
        log: vi.fn(),
        warn: vi.fn(),
        error: vi.fn()
    }
}));

import {
    extractInfoFromTemplate,
    isBareOEPLArray,
    parseOEPLArrayToLayout
} from '../../../js/io/yaml_parsers/oepl_parser.js';

describe('oepl_parser', () => {
    it('detects bare arrays and extracts template metadata', () => {
        expect(isBareOEPLArray(`- type: text\n  value: "Hello"`)).toBe(true);
        expect(isBareOEPLArray(`service: opendisplay.drawcustom`)).toBe(false);
        expect(extractInfoFromTemplate(`Temp: {{ states('sensor.temp') }} F`)).toEqual({
            prefix: 'Temp: ',
            entity_id: 'sensor.temp',
            postfix: ' F'
        });
    });

    it('normalizes diverse OEPL widgets into standard widget payloads', () => {
        const layout = parseOEPLArrayToLayout([
            {
                type: 'multiline',
                value: 'one|two|three',
                delimiter: '|',
                size: 14,
                offset_y: 18,
                font: 'Roboto.ttf',
                fill: 'black'
            },
            {
                type: 'polygon',
                points: [[10, 10], [30, 10], [20, 25]],
                fill: 'white',
                outline: 'black',
                width: 2
            },
            {
                type: 'image',
                url: 'https://example.com/demo.png',
                xsize: 44,
                ysize: 33,
                rotate: 90
            },
            {
                type: 'icon_sequence',
                icons: ['mdi:home', 'mdi:bell'],
                size: 16,
                spacing: 4,
                direction: 'down'
            },
            {
                type: 'ellipse',
                x_start: 5,
                y_start: 7,
                x_end: 25,
                y_end: 20,
                outline: 'red'
            },
            {
                type: 'unknown'
            }
        ]);

        expect(layout.pages[0].widgets).toHaveLength(5);
        expect(layout.pages[0].widgets[0]).toMatchObject({
            type: 'odp_multiline',
            props: {
                delimiter: '|',
                line_spacing: 4
            }
        });
        expect(layout.pages[0].widgets[1]).toMatchObject({
            type: 'odp_polygon',
            x: 10,
            y: 10,
            width: 20,
            height: 15,
            props: {
                points: [[0, 0], [20, 0], [10, 15]]
            }
        });
        expect(layout.pages[0].widgets[2]).toMatchObject({
            type: 'online_image',
            width: 44,
            height: 33,
            props: {
                url: 'https://example.com/demo.png',
                rotation: 90
            }
        });
        expect(layout.pages[0].widgets[3]).toMatchObject({
            type: 'odp_icon_sequence',
            width: 16,
            height: 36,
            props: {
                direction: 'down'
            }
        });
        expect(layout.pages[0].widgets[4]).toMatchObject({
            type: 'odp_ellipse',
            x: 5,
            y: 7,
            width: 20,
            height: 13
        });
    });
});
