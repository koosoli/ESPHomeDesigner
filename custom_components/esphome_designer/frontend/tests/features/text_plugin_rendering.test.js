import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockAppState } = vi.hoisted(() => ({
    mockAppState: {
        entityStates: {},
        settings: { darkMode: false },
        updateWidget: vi.fn()
    }
}));

vi.mock('@core/state', () => ({
    AppState: mockAppState
}));

import plugin from '../../features/text/plugin.js';

function createPanel() {
    const panel = {
        callbacks: {},
        labels: [],
        hints: [],
        createSection: vi.fn(),
        endSection: vi.fn(),
        addHint: vi.fn((text) => {
            panel.hints.push(text);
        }),
        addLabeledInput(label, _type, _value, callback) {
            panel.labels.push(label);
            panel.callbacks[label] = callback;
        },
        addSelect(label, _value, _options, callback) {
            panel.labels.push(label);
            panel.callbacks[label] = callback;
        },
        addCheckbox(label, _value, callback) {
            panel.labels.push(label);
            panel.callbacks[label] = callback;
        },
        addColorSelector(label, _value, _colors, callback) {
            panel.labels.push(label);
            panel.callbacks[label] = callback;
        },
        addNumberWithSlider(label, _value, _min, _max, callback) {
            panel.labels.push(label);
            panel.callbacks[label] = callback;
        },
        addDropShadowButton: vi.fn(),
        getContainer() {
            return document.body;
        }
    };

    return panel;
}

describe('text plugin rendering and export variants', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockAppState.entityStates = {};
        mockAppState.settings = { darkMode: false };
    });

    it('renders template previews, color markup, and themed borders/backgrounds', () => {
        mockAppState.entityStates = {
            'sensor.temp': { formatted: '22.1 C', state: 22.1 }
        };
        mockAppState.settings = { darkMode: true };

        const host = document.createElement('div');
        plugin.render(host, {
            id: 'text_1',
            type: 'text',
            width: 140,
            height: 60,
            props: {
                text: 'Value {{ states("sensor.temp") }} [red]Alert[/red]',
                color: '{{ dynamic_color }}',
                parse_colors: true,
                font_size: 16,
                font_family: 'Roboto',
                text_align: 'BOTTOM_RIGHT',
                border_width: 2,
                border_color: 'theme_auto',
                bg_color: 'blue'
            }
        }, {
            getColorStyle: (value) => value
        });

        const body = host.firstElementChild;
        const spans = body.querySelectorAll('span');

        expect(body.style.justifyContent).toBe('flex-end');
        expect(body.style.alignItems).toBe('flex-end');
        expect(body.style.border).toBe('2px solid white');
        expect(body.style.backgroundColor).toBe('blue');
        expect(spans[0].style.color).toBe('black');
        expect(spans[spans.length - 1].style.color).toBe('red');
        expect(body.textContent.replace(/\s+/g, ' ').trim()).toContain('Value 22.1 C Alert');
    });

    it('renders property controls and exports LVGL, OpenDisplay, and OEPL targets', () => {
        const panel = createPanel();
        const widget = {
            id: 'text_1',
            type: 'text',
            props: {
                text: 'Line1\nLine2',
                font_family: 'Fira Code',
                custom_font_family: 'Fira Code',
                font_weight: 450,
                parse_colors: true,
                opacity: 100,
                opa: 255,
                color: 'theme_auto',
                text_align: 'BOTTOM_CENTER'
            }
        };

        plugin.renderProperties(panel, widget);

        expect(panel.labels).toContain('Custom Font Name');
        expect(panel.hints).toContain('Usage: [red]Text[/red] or [#FF00AA]Colors[/#]');
        expect(panel.addDropShadowButton).toHaveBeenCalledWith(panel.getContainer(), 'text_1');

        panel.callbacks['Text content']('Updated');
        panel.callbacks['Font Family']('Inter');
        panel.callbacks['Custom Font Name']('Fira Sans');
        panel.callbacks['Parse Color Tags'](false);
        panel.callbacks['Opacity (%)'](60);

        expect(mockAppState.updateWidget).toHaveBeenCalledWith('text_1', expect.objectContaining({
            props: expect.objectContaining({
                text: 'Updated'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('text_1', expect.objectContaining({
            props: expect.objectContaining({
                font_family: 'Inter',
                custom_font_family: '',
                font_weight: 400
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('text_1', expect.objectContaining({
            props: expect.objectContaining({
                font_family: 'Fira Sans',
                custom_font_family: 'Fira Sans'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('text_1', expect.objectContaining({
            props: expect.objectContaining({
                parse_colors: false
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('text_1', expect.objectContaining({
            props: expect.objectContaining({
                opacity: 60
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('text_1', expect.objectContaining({
            props: expect.objectContaining({
                opa: 153
            })
        }));

        const lvgl = plugin.exportLVGL({
            id: 'text_lvgl',
            type: 'text',
            props: {
                text: 'Hello',
                font_family: 'Roboto',
                font_size: 18,
                font_weight: 500,
                italic: true,
                color: 'red',
                bg_color: 'white',
                text_align: 'BOTTOM_CENTER',
                opa: 128,
                border_width: 1,
                border_color: 'blue',
                border_radius: 4
            }
        }, {
            common: { id: 'text_lvgl' },
            convertColor: (value) => `COLOR_${String(value).toUpperCase()}`,
            getLVGLFont: () => 'font_text',
            formatOpacity: (value) => `opa(${value})`
        });

        expect(lvgl.label.text_align).toBe('center');
        expect(lvgl.label.bg_color).toBe('COLOR_WHITE');
        expect(lvgl.label.text_font).toBe('font_text');

        const openDisplay = plugin.exportOpenDisplay({
            id: 'text_od',
            type: 'text',
            x: 1,
            y: 2,
            width: 70,
            height: 20,
            props: {
                text: 'Line1\nLine2',
                font_size: 14,
                font_family: 'Roboto Mono',
                color: 'theme_auto',
                text_align: 'BOTTOM_RIGHT',
                parse_colors: true
            }
        }, {
            layout: { darkMode: true },
            _page: {}
        });

        expect(openDisplay).toEqual({
            type: 'multiline',
            value: 'Line1\nLine2',
            delimiter: '\n',
            x: 1,
            y: 2,
            offset_y: 19,
            size: 14,
            color: 'white',
            font: 'mononoki.ttf'
        });

        const oepl = plugin.exportOEPL({
            id: 'text_oepl',
            type: 'text',
            x: 5,
            y: 6,
            width: 90,
            height: 20,
            props: {
                text: 'Hello',
                font_size: 12,
                font_family: 'Roboto',
                color: 'theme_auto',
                text_align: 'CENTER_RIGHT',
                parse_colors: true
            }
        }, {
            layout: { darkMode: false },
            _page: {}
        });

        expect(oepl).toEqual({
            type: 'text',
            value: 'Hello',
            x: 5,
            y: 6,
            size: 12,
            font: 'ppb.ttf',
            color: 'black',
            align: 'centerright',
            anchor: 'lt',
            parse_colors: true,
            max_width: 90,
            spacing: 5
        });
    });

    it('exports direct text with conditions, wrapping, backgrounds, borders, and e-paper dithering', () => {
        const lines = [];

        plugin.export({
            id: 'text_direct',
            type: 'text',
            x: 10,
            y: 20,
            width: 240,
            height: 30,
            props: {
                text: 'Gray % "quote"',
                color: 'gray',
                font_size: 18,
                font_family: 'Roboto',
                text_align: 'CENTER_RIGHT',
                bg_color: 'yellow',
                border_width: 2,
                border_color: 'black'
            }
        }, {
            lines,
            getColorConst: (value) => `COLOR_${String(value).toUpperCase()}`,
            addFont: () => 'font_gray',
            getAlignX: () => 0,
            getAlignY: () => 0,
            getCondProps: () => null,
            getConditionCheck: () => 'if (show) {',
            Utils: {
                isGrayColor: (value) => value === 'gray'
            },
            isEpaper: true
        });

        const output = lines.join('\n');
        expect(output).toContain('it.filled_rectangle(10, 20, 240, 30, COLOR_YELLOW);');
        expect(output).toContain('it.printf(250, 35, id(font_gray), COLOR_BLACK, TextAlign::CENTER_RIGHT, "Gray %% \\"quote\\"");');
        expect(output).toContain('apply_grey_dither_to_text(10, 20, 240, 30);');
        expect(output).toContain('it.rectangle(10 + 0, 20 + 0, 240 - 2 * 0, 30 - 2 * 0, COLOR_BLACK);');
        expect(output.trim().endsWith('}')).toBe(true);
    });
});
