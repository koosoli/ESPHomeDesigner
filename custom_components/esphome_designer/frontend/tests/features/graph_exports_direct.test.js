import { describe, expect, it, vi } from 'vitest';

import { exportDoc } from '../../features/graph/exports_direct.js';

function createContext(overrides = {}) {
    return {
        lines: [],
        addFont: vi.fn(() => 'graph_font'),
        getColorConst: (value) => `Color(${value})`,
        addDitherMask: vi.fn((lines) => lines.push('        // dither mask')),
        getConditionCheck: () => '',
        isEpaper: false,
        sanitize: (value) => value,
        ...overrides
    };
}

describe('graph exports_direct', () => {
    it('exports direct-mode graphs with borders, static labels, grids, and time markers', () => {
        const context = createContext();

        exportDoc({
            id: 'graph-1',
            x: 10,
            y: 20,
            width: 120,
            height: 60,
            entity_id: 'sensor.room_temp',
            title: 'Room',
            props: {
                duration: '2h',
                color: 'blue',
                border: true,
                border_width: 2,
                border_color: 'navy',
                min_value: '0',
                max_value: '80',
                auto_scale: false
            }
        }, context);

        const output = context.lines.join('\n');
        expect(output).toContain('it.graph(10, 20, id(graph_graph_1));');
        expect(output).toContain('it.rectangle(10 + 0, 20 + 0, 120 - 2 * 0, 60 - 2 * 0, Color(navy));');
        expect(output).toContain('it.printf(10 - 4, 20 + 30 - 6, id(graph_font), Color(blue), TextAlign::TOP_RIGHT, "%.0f", (float)40);');
        expect(output).toContain('it.draw_pixel_at(10 + i, 35, Color(blue));');
        expect(output).toContain('it.draw_pixel_at(40, 20 + i, Color(blue));');
        expect(output).toContain('it.printf(10 + 0, 20 + 60 + 2, id(graph_font), Color(blue), TextAlign::TOP_LEFT, "-2.0h");');
        expect(output).toContain('it.printf(10 + 60, 20 + 60 + 2, id(graph_font), Color(blue), TextAlign::TOP_CENTER, "-1.0h");');
        expect(output).toContain('it.printf(10 + 120, 20 + 60 + 2, id(graph_font), Color(blue), TextAlign::TOP_RIGHT, "Now");');
        expect(context.addDitherMask).toHaveBeenCalledOnce();
    });

    it('exports HA-history graphs with background fill and dynamic axis labels', () => {
        const context = createContext({
            getConditionCheck: () => 'if (id(graph_enabled)) {'
        });

        exportDoc({
            id: 'graph-2',
            x: 0,
            y: 0,
            width: 100,
            height: 40,
            entity_id: 'sensor.energy',
            props: {
                use_ha_history: true,
                auto_scale: true,
                line_thickness: 2,
                bg_color: 'white',
                color: 'red'
            }
        }, context);

        const output = context.lines.join('\n');
        expect(output).toContain('if (id(graph_enabled)) {');
        expect(output).toContain('it.fill_rectangle(0, 0, 100, 40, Color(white));');
        expect(output).toContain('float g_pad = (g_max - g_min) * 0.05;');
        expect(output).toContain('int hist_count = id(hist_graph_2_count);');
        expect(output).toContain('it.line(x1, y1+1, x2, y2+1, Color(red));');
        expect(output).toContain('const char* fmt = g_range >= 10 ? "%.0f" : "%.1f";');
    });

    it('emits a clear placeholder when the graph has no entity source', () => {
        const context = createContext();

        exportDoc({
            id: 'graph-empty',
            x: 5,
            y: 6,
            width: 80,
            height: 30,
            props: {
                color: 'black'
            }
        }, context);

        expect(context.lines.join('\n')).toContain('Graph (no entity)');
    });
});
