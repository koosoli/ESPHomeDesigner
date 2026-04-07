import { describe, expect, it, vi } from 'vitest';

import datetimePlugin from '../../features/datetime/plugin.js';

describe('datetime LVGL export', () => {
    const ctx = {
        common: { id: 'dt_1', x: 10, y: 20, width: 120, height: 50 },
        convertColor: vi.fn((value) => `Color(${value})`),
        convertAlign: vi.fn((value) => value),
        getLVGLFont: vi.fn(() => 'font_ptr'),
        formatOpacity: vi.fn((value) => value)
    };

    it('wraps the label in an object when background or border styling is set', () => {
        const output = datetimePlugin.exportLVGL({
            id: 'dt_1',
            type: 'datetime',
            props: {
                ...datetimePlugin.defaults,
                bg_color: 'navy',
                border_width: 2,
                border_color: 'white',
                border_radius: 6
            }
        }, ctx);

        expect(output).toHaveProperty('obj');
        expect(output.obj.bg_color).toBe('Color(navy)');
        expect(output.obj.bg_opa).toBe('cover');
        expect(output.obj.border_width).toBe(2);
        expect(output.obj.border_color).toBe('Color(white)');
        expect(output.obj.radius).toBe(6);
        expect(output.obj.widgets).toHaveLength(1);
        expect(output.obj.widgets[0].label.id).toBe('dt_1_text');
        expect(output.obj.widgets[0].label.text_color).toBe('Color(black)');
    });

    it('adds LVGL refresh intervals for plain and styled datetime widgets without duplicating interval sections', () => {
        const lines = [
            'interval:',
            '  - interval: 30m',
            '    then:',
            '      - lambda: |-',
            '          ESP_LOGD("test", "tick");',
            'font:'
        ];

        datetimePlugin.onExportComponents({
            lines,
            isLvgl: true,
            widgets: [
                {
                    id: 'dt_plain',
                    type: 'datetime',
                    props: {
                        ...datetimePlugin.defaults,
                        bg_color: 'transparent',
                        border_width: 0
                    }
                },
                {
                    id: 'dt-styled',
                    type: 'datetime',
                    props: {
                        ...datetimePlugin.defaults,
                        bg_color: 'navy',
                        border_width: 2
                    }
                }
            ]
        });

        const output = lines.join('\n');
        expect(lines.filter((line) => line.trim() === 'interval:')).toHaveLength(1);
        expect(output).toContain('lvgl.widget.refresh: dt_plain');
        expect(output).toContain('lvgl.widget.refresh: dt_styled_text');
        expect(output.indexOf('lvgl.widget.refresh: dt_styled_text')).toBeLessThan(output.indexOf('font:'));
    });
});
