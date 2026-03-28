import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockAppState } = vi.hoisted(() => ({
    mockAppState: {
        deviceModel: 'color_device',
        updateWidget: vi.fn()
    }
}));

vi.mock('@core/state', () => ({
    AppState: mockAppState
}));

vi.mock('../../js/io/devices.js', () => ({
    DEVICE_PROFILES: {
        color_device: {
            features: {
                lcd: true
            }
        },
        mono_device: {
            features: {
                epaper: true
            }
        }
    }
}));

import { renderProperties } from '../../features/sensor_text/properties.js';

function createPanel(config = {}) {
    return {
        labels: [],
        hints: [],
        createSection: vi.fn(),
        endSection: vi.fn(),
        addHint: vi.fn((hint) => {
            panel.hints.push(hint);
        }),
        addLabeledInputWithPicker(label, _type, _value, onChange) {
            this.labels.push(label);
            onChange(config.pickerValues?.[label] ?? 'sensor.demo');
        },
        addLabeledInputWithDataList(label, _type, _value, _suggestions, onChange) {
            this.labels.push(label);
            onChange(config.dataListValues?.[label] ?? 'demo');
        },
        addLabeledInput(label, type, _value, onChange) {
            this.labels.push(label);
            onChange(config.inputValues?.[label] ?? (type === 'number' ? '2' : 'demo'));
        },
        addCheckbox(label, value, onChange) {
            this.labels.push(label);
            onChange(config.checkboxValues?.[label] ?? !value);
        },
        addSelect(label, _value, options, onChange) {
            this.labels.push(label);
            const configured = config.selectValues?.[label];
            const fallback = typeof options[options.length - 1] === 'object'
                ? options[options.length - 1].value
                : options[options.length - 1];
            onChange(configured ?? fallback);
        },
        addNumberWithSlider(label, _value, _min, _max, onChange) {
            this.labels.push(label);
            onChange(config.sliderValues?.[label] ?? 55);
        },
        addCompactPropertyRow(callback) {
            callback();
        },
        addColorSelector(label, _value, _colors, onChange) {
            this.labels.push(label);
            onChange(config.colorValues?.[label] ?? '#224466');
        },
        addDropShadowButton: vi.fn(),
        autoPopulateTitleFromEntity: vi.fn(),
        getContainer() {
            return document.body;
        }
    };
}

let panel;

describe('sensor_text properties', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        document.body.innerHTML = '';
        panel = createPanel();
    });

    it('renders full color-display controls, trims attributes, and keeps align fields in sync', () => {
        panel = createPanel({
            pickerValues: {
                'Entity ID': 'sensor.energy',
                'Secondary Entity ID': 'sensor.energy_total'
            },
            inputValues: {
                'Attribute (optional)': ' state_of_charge ',
                'Secondary Attribute': ' total ',
                'Title/Label': 'Battery',
                Precision: '3',
                'Label Size': '16',
                'Value Size': '24',
                'Custom Font Name': 'Display Font',
                'Value Low': '10',
                'Value High': '90',
                'Border Width': '2',
                'Corner Radius': '6',
                'BPP / Antialias': '4'
            },
            dataListValues: {
                Prefix: '$',
                Postfix: ' %'
            },
            checkboxValues: {
                'Text Sensor (string value)': true,
                'Local / On-Device Sensor': true,
                'Hide default unit': true,
                Italic: true,
                'Parse Color Tags': true,
                'Enable Dynamic Color': true
            },
            selectValues: {
                'Display Format': 'value_only',
                Font: 'Custom...',
                Weight: 700,
                Align: 'CENTER'
            },
            sliderValues: {
                'Opacity (%)': 80
            },
            colorValues: {
                Color: '#ff0000',
                'Color Low': '#0000ff',
                'Color High': '#00ff00',
                'Border Color': '#111111',
                Background: '#ffffff'
            }
        });

        renderProperties(panel, {
            id: 'sensor_text_1',
            title: '',
            entity_id: '',
            entity_id_2: '',
            props: {
                font_family: 'Display Font',
                font_weight: 650,
                dynamic_color_enabled: true
            }
        });

        expect(panel.autoPopulateTitleFromEntity).toHaveBeenCalledWith('sensor_text_1', 'sensor.energy');
        expect(panel.addDropShadowButton).toHaveBeenCalledWith(panel.getContainer(), 'sensor_text_1');
        expect(panel.labels).toContain('Enable Dynamic Color');
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('sensor_text_1', { entity_id: 'sensor.energy' });
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('sensor_text_1', { entity_id_2: 'sensor.energy_total' });
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('sensor_text_1', { title: 'Battery' });
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('sensor_text_1', expect.objectContaining({
            props: expect.objectContaining({
                attribute: 'state_of_charge'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('sensor_text_1', expect.objectContaining({
            props: expect.objectContaining({
                attribute2: 'total'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('sensor_text_1', expect.objectContaining({
            props: expect.objectContaining({
                value_format: 'value_only'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('sensor_text_1', expect.objectContaining({
            props: expect.objectContaining({
                precision: 3
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('sensor_text_1', expect.objectContaining({
            props: expect.objectContaining({
                prefix: '$'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('sensor_text_1', expect.objectContaining({
            props: expect.objectContaining({
                postfix: ' %'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('sensor_text_1', expect.objectContaining({
            props: expect.objectContaining({
                hide_unit: true
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('sensor_text_1', expect.objectContaining({
            props: expect.objectContaining({
                opacity: 80
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('sensor_text_1', expect.objectContaining({
            props: expect.objectContaining({
                label_font_size: 16
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('sensor_text_1', expect.objectContaining({
            props: expect.objectContaining({
                value_font_size: 24
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('sensor_text_1', expect.objectContaining({
            props: expect.objectContaining({
                color: '#ff0000'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('sensor_text_1', expect.objectContaining({
            props: expect.objectContaining({
                font_family: 'Display Font',
                custom_font_family: 'Display Font',
                font_weight: 600
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('sensor_text_1', expect.objectContaining({
            props: expect.objectContaining({
                font_weight: 700
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('sensor_text_1', expect.objectContaining({
            props: expect.objectContaining({
                italic: true
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('sensor_text_1', expect.objectContaining({
            props: expect.objectContaining({
                text_align: 'CENTER'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('sensor_text_1', expect.objectContaining({
            props: expect.objectContaining({
                label_align: 'CENTER'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('sensor_text_1', expect.objectContaining({
            props: expect.objectContaining({
                value_align: 'CENTER'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('sensor_text_1', expect.objectContaining({
            props: expect.objectContaining({
                parse_colors: true
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('sensor_text_1', expect.objectContaining({
            props: expect.objectContaining({
                dynamic_color_enabled: true
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('sensor_text_1', expect.objectContaining({
            props: expect.objectContaining({
                dynamic_color_low: '#0000ff'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('sensor_text_1', expect.objectContaining({
            props: expect.objectContaining({
                dynamic_color_high: '#00ff00'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('sensor_text_1', expect.objectContaining({
            props: expect.objectContaining({
                dynamic_value_low: 10
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('sensor_text_1', expect.objectContaining({
            props: expect.objectContaining({
                dynamic_value_high: 90
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('sensor_text_1', expect.objectContaining({
            props: expect.objectContaining({
                border_width: 2
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('sensor_text_1', expect.objectContaining({
            props: expect.objectContaining({
                border_color: '#111111'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('sensor_text_1', expect.objectContaining({
            props: expect.objectContaining({
                border_radius: 6
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('sensor_text_1', expect.objectContaining({
            props: expect.objectContaining({
                bg_color: '#ffffff'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('sensor_text_1', expect.objectContaining({
            props: expect.objectContaining({
                bpp: 4
            })
        }));
    });

    it('skips dynamic color controls for monochrome or explicit text-sensor setups', () => {
        mockAppState.deviceModel = 'mono_device';
        panel = createPanel();

        renderProperties(panel, {
            id: 'sensor_text_2',
            title: 'Status',
            entity_id: 'sensor.status',
            entity_id_2: '',
            props: {
                is_text_sensor: true
            }
        });

        expect(panel.labels).not.toContain('Enable Dynamic Color');
    });
});
