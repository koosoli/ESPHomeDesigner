import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockAppState } = vi.hoisted(() => ({
    mockAppState: {
        entityStates: {},
        updateWidget: vi.fn()
    }
}));

vi.mock('@core/state', () => ({
    AppState: mockAppState
}));

import plugin from '../../features/lvgl_label/plugin.js';

function createPanel() {
    const panel = {
        callbacks: {},
        labels: [],
        hints: [],
        createSection: vi.fn(),
        endSection: vi.fn(),
        addHint: vi.fn((html) => {
            panel.hints.push(html);
        }),
        addLabeledInput(label, _type, _value, callback) {
            panel.labels.push(label);
            panel.callbacks[label] = callback;
        },
        addLabeledInputWithPicker(label, _type, _value, callback) {
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

describe('lvgl label plugin', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockAppState.entityStates = {};
    });

    it('renders live entity values or placeholders with alignment, opacity, and border styling', () => {
        mockAppState.entityStates = {
            'sensor.temp': { state: 72.5 }
        };

        const host = document.createElement('div');
        plugin.render(host, {
            id: 'label_1',
            type: 'lvgl_label',
            entity_id: 'sensor.temp',
            props: {
                text: 'Ignored',
                font_size: 24,
                text_color: 'red',
                bg_color: 'blue',
                text_align: 'BOTTOM_RIGHT',
                font_family: 'Roboto',
                font_weight: 700,
                italic: true,
                border_width: 2,
                border_color: 'green',
                border_radius: 4,
                opa: 128
            }
        }, {
            getColorStyle: (value) => value
        });

        expect(host.innerText).toBe('72.5');
        expect(host.style.justifyContent).toBe('flex-end');
        expect(host.style.alignItems).toBe('flex-end');
        expect(host.style.fontStyle).toBe('italic');
        expect(host.style.border).toBe('2px solid green');
        expect(host.style.borderRadius).toBe('4px');
        expect(host.style.opacity).toBe(String(128 / 255));

        const placeholder = document.createElement('div');
        plugin.render(placeholder, {
            id: 'label_2',
            type: 'lvgl_label',
            props: {
                entity_id: 'weather.home'
            }
        }, {
            getColorStyle: (value) => value
        });

        expect(placeholder.innerText).toBe('{home}');
    });

    it('renders property controls for custom fonts and emits widget updates', () => {
        const panel = createPanel();
        const widget = {
            id: 'label_1',
            type: 'lvgl_label',
            props: {
                text: 'Status',
                font_family: 'Fira Display',
                custom_font_family: 'Fira Display',
                font_weight: 450,
                opacity: 80,
                opa: 204
            }
        };

        plugin.renderProperties(panel, widget);

        expect(panel.labels).toContain('Custom Font Name');
        expect(panel.hints.some((hint) => hint.includes('fonts.google.com'))).toBe(true);
        expect(panel.addDropShadowButton).toHaveBeenCalledWith(panel.getContainer(), 'label_1');

        panel.callbacks['Text Content']('Updated');
        panel.callbacks['Bind to Entity']('sensor.room');
        panel.callbacks['Font Family']('Inter');
        panel.callbacks['Custom Font Name']('Fira Sans');
        panel.callbacks['Opacity (%)'](50);

        expect(mockAppState.updateWidget).toHaveBeenCalledWith('label_1', expect.objectContaining({
            props: expect.objectContaining({
                text: 'Updated'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('label_1', { entity_id: 'sensor.room' });
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('label_1', expect.objectContaining({
            props: expect.objectContaining({
                font_family: 'Inter',
                custom_font_family: '',
                font_weight: 400
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('label_1', expect.objectContaining({
            props: expect.objectContaining({
                font_family: 'Fira Sans',
                custom_font_family: 'Fira Sans'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('label_1', expect.objectContaining({
            props: expect.objectContaining({
                opacity: 50
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('label_1', expect.objectContaining({
            props: expect.objectContaining({
                opa: 127
            })
        }));
    });

    it('exports LVGL, direct output, and sensor refresh hooks for numeric and text entities', () => {
        const exportContext = {
            common: { id: 'label_1', width: 120, height: 40 },
            convertColor: (value) => `COLOR_${String(value).toUpperCase()}`,
            getLVGLFont: () => 'font_id',
            formatOpacity: (value) => `opa(${value})`
        };

        const numericExport = plugin.exportLVGL({
            id: 'label_1',
            type: 'lvgl_label',
            entity_id: 'sensor.temp',
            props: {
                text: 'Temperature',
                font_family: 'Roboto',
                font_size: 18,
                font_weight: 500,
                italic: true,
                text_color: 'red',
                text_align: 'BOTTOM_RIGHT',
                bg_color: 'transparent',
                opa: 128,
                border_width: 1,
                border_color: 'blue',
                border_radius: 6
            }
        }, exportContext);

        expect(numericExport.label.text).toContain('str_sprintf');
        expect(numericExport.label.text_align).toBe('RIGHT');
        expect(numericExport.label.text_font).toBe('font_id');
        expect(numericExport.label.opa).toBe('opa(128)');

        const textExport = plugin.exportLVGL({
            id: 'label_2',
            type: 'lvgl_label',
            entity_id: 'text_sensor.status',
            props: {
                text: 'Status',
                font_family: 'Roboto',
                font_size: 18,
                font_weight: 400,
                italic: false,
                text_color: 'green',
                text_align: 'TOP_LEFT',
                bg_color: 'white',
                opa: 255,
                border_width: 0,
                border_radius: 0
            }
        }, exportContext);

        expect(textExport.label.text).toContain('.state.c_str()');
        expect(textExport.label.text_align).toBe('LEFT');
        expect(textExport.label.bg_color).toBe('COLOR_WHITE');

        const lines = [];
        plugin.export({
            id: 'label_3',
            type: 'lvgl_label',
            x: 10,
            y: 20,
            width: 100,
            height: 40,
            props: {
                text: 'Hello "World"',
                color: 'red',
                font_size: 18,
                font_family: 'Roboto',
                font_weight: 400,
                text_align: 'BOTTOM_RIGHT',
                bg_color: 'blue',
                border_width: 2,
                border_color: 'green'
            }
        }, {
            lines,
            getColorConst: (value) => `COLOR_${String(value).toUpperCase()}`,
            addFont: () => 'font_label',
            getCondProps: () => null,
            getConditionCheck: () => 'if (show) {',
            Utils: {}
        });

        const output = lines.join('\n');
        expect(output).toContain('it.filled_rectangle(10, 20, 100, 40, COLOR_BLUE);');
        expect(output).toContain('it.printf(110, 60, id(font_label), COLOR_RED, TextAlign::BOTTOM_RIGHT, "Hello \\"World\\"");');
        expect(output).toContain('it.rectangle(10 + 0, 20 + 0, 100 - 2 * 0, 40 - 2 * 0, COLOR_GREEN);');
        expect(output.trim().endsWith('}')).toBe(true);

        const pendingTriggers = new Map();
        plugin.onExportNumericSensors({
            widgets: [
                { id: 'label_1', type: 'lvgl_label', entity_id: 'temperature' },
                { id: 'label_2', type: 'lvgl_label', entity_id: 'text_sensor.status' }
            ],
            isLvgl: true,
            pendingTriggers
        });
        plugin.onExportTextSensors({
            widgets: [
                { id: 'label_3', type: 'lvgl_label', entity_id: 'weather.home' }
            ],
            isLvgl: true,
            pendingTriggers
        });

        expect([...pendingTriggers.get('sensor.temperature')]).toEqual(['- lvgl.widget.refresh: label_1']);
        expect([...pendingTriggers.get('weather.home')]).toEqual(['- lvgl.widget.refresh: label_3']);

        const addFont = vi.fn();
        plugin.collectRequirements({
            props: {
                font_family: 'Inter',
                font_weight: 600,
                font_size: 22,
                italic: true
            }
        }, { addFont });
        expect(addFont).toHaveBeenCalledWith('Inter', 600, 22, true);
    });
});
