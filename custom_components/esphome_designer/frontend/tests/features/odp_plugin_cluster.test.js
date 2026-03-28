import { beforeEach, describe, expect, it } from 'vitest';

import odpArc from '../../features/odp_arc/plugin.js';
import odpIconSequence from '../../features/odp_icon_sequence/plugin.js';
import odpMultiline from '../../features/odp_multiline/plugin.js';
import odpPlot from '../../features/odp_plot/plugin.js';
import odpPolygon from '../../features/odp_polygon/plugin.js';
import odpRectanglePattern from '../../features/odp_rectangle_pattern/plugin.js';

describe('ODP plugin cluster', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    it('renders and exports polygon widgets with fallback parsing and theme-aware colors', () => {
        const host = document.createElement('div');
        odpPolygon.render(host, {
            id: 'poly_1',
            width: 80,
            height: 80,
            props: {
                points: 'not-json',
                fill: 'red',
                outline: 'black'
            }
        }, {
            getColorStyle: (value) => value
        });

        expect(host.querySelector('polygon')?.getAttribute('points')).toContain('0,0');

        const exported = odpPolygon.exportOpenDisplay({
            id: 'poly_1',
            x: 10,
            y: 20,
            width: 80,
            height: 80,
            props: {
                points: [[0, 0], [10, 0], [10, 10]],
                fill: 'theme_auto',
                outline: 'transparent',
                border_width: 3
            }
        }, {
            layout: { darkMode: true },
            _page: {}
        });

        expect(exported).toEqual({
            type: 'polygon',
            points: [[10, 20], [20, 20], [20, 30]],
            fill: 'white',
            outline: 'black',
            width: 3
        });
    });

    it('renders and exports plots with normalized series data', () => {
        const host = document.createElement('div');
        odpPlot.render(host, {
            id: 'plot_1',
            width: 120,
            height: 60,
            props: {
                duration: 7200,
                data: { entity: 'sensor.temp', color: 'blue', width: 2 }
            }
        }, {
            getColorStyle: (value) => value
        });

        expect(host.querySelectorAll('path')).toHaveLength(1);
        expect(host.textContent).toContain('Plot: 2h');

        const exported = odpPlot.exportOpenDisplay({
            id: 'plot_1',
            x: 5,
            y: 6,
            width: 120,
            height: 60,
            props: {
                duration: 1800,
                ylegend: 'C',
                data: [{ entity: 'sensor.temp', color: 'blue', point_size: 4 }]
            }
        }, { _layout: {}, _page: {} });

        expect(exported).toMatchObject({
            type: 'plot',
            duration: 1800,
            ylegend: 'C',
            x_start: 5,
            x_end: 125
        });
        expect(exported.data[0]).toMatchObject({
            entity: 'sensor.temp',
            color: 'blue',
            point_size: 4,
            smooth: true
        });
    });

    it('renders and exports icon sequences with string parsing and theme conversion', () => {
        const host = document.createElement('div');
        odpIconSequence.render(host, {
            id: 'icons_1',
            width: 100,
            height: 80,
            props: {
                icons: 'mdi:home, mdi:arrow-right',
                direction: 'down',
                spacing: 8,
                fill: 'black'
            }
        }, {
            getColorStyle: (value) => value
        });

        expect(host.children).toHaveLength(2);
        expect(host.style.flexDirection).toBe('column');

        const exported = odpIconSequence.exportOpenDisplay({
            id: 'icons_1',
            x: 1,
            y: 2,
            props: {
                icons: 'mdi:home, mdi:arrow-right',
                direction: 'left',
                fill: 'theme_auto'
            }
        }, {
            layout: { darkMode: false },
            _page: {}
        });

        expect(exported).toMatchObject({
            type: 'icon_sequence',
            x: 1,
            y: 2,
            icons: ['mdi:home', 'mdi:arrow-right'],
            direction: 'left',
            fill: 'black'
        });
    });

    it('renders and exports arcs, multiline text, and rectangle patterns', () => {
        const arcHost = document.createElement('div');
        odpArc.render(arcHost, {
            id: 'arc_1',
            width: 100,
            height: 100,
            props: {
                start_angle: 0,
                end_angle: 270,
                outline: 'navy',
                border_width: 4
            }
        }, {
            getColorStyle: (value) => value
        });
        expect(arcHost.querySelector('path')?.getAttribute('stroke')).toBe('navy');

        const arcExport = odpArc.exportOpenDisplay({
            id: 'arc_1',
            x: 10,
            y: 20,
            width: 100,
            height: 80,
            props: {
                outline: 'theme_auto',
                start_angle: 45,
                end_angle: 180
            }
        }, {
            layout: { darkMode: true },
            _page: {}
        });
        expect(arcExport).toMatchObject({
            type: 'arc',
            x: 60,
            y: 60,
            outline: 'white'
        });

        const textHost = document.createElement('div');
        odpMultiline.render(textHost, {
            id: 'multi_1',
            width: 100,
            height: 60,
            props: {
                text: 'One|Two|Three',
                delimiter: '|',
                font_size: 12,
                line_spacing: 3,
                color: 'black'
            }
        }, {
            getColorStyle: (value) => value
        });
        expect(textHost.children).toHaveLength(3);

        const textExport = odpMultiline.exportOpenDisplay({
            id: 'multi_1',
            x: 5,
            y: 6,
            props: {
                text: 'One|Two',
                delimiter: '|',
                font_family: 'Mononoki',
                color: 'theme_auto'
            }
        }, {
            layout: { darkMode: true },
            _page: {}
        });
        expect(textExport).toMatchObject({
            type: 'multiline',
            color: 'white',
            font: 'mononoki.ttf'
        });

        const patternHost = document.createElement('div');
        odpRectanglePattern.render(patternHost, {
            id: 'pattern_1',
            width: 100,
            height: 60,
            props: {
                x_repeat: 2,
                y_repeat: 2,
                x_size: 20,
                y_size: 10,
                x_offset: 5,
                y_offset: 4
            }
        }, {
            getColorStyle: (value) => value
        });
        expect(patternHost.children).toHaveLength(4);

        const patternExport = odpRectanglePattern.exportOpenDisplay({
            id: 'pattern_1',
            x: 10,
            y: 15,
            width: 90,
            height: 50,
            props: {
                fill: 'transparent',
                outline: 'theme_auto',
                x_repeat: 4
            }
        }, {
            layout: { darkMode: false },
            _page: {}
        });
        expect(patternExport).toMatchObject({
            type: 'rectangle_pattern',
            fill: null,
            outline: 'black',
            x_repeat: 4,
            x_end: 100,
            y_end: 65
        });
    });
});
