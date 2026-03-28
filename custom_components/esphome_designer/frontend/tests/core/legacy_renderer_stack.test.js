import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const {
    mockAppState,
    mockFetchEntityStates,
    mockGetAvailableColors,
    mockGetDeviceModel
} = vi.hoisted(() => ({
    mockAppState: {
        updateWidget: vi.fn(),
        getSelectedWidget: vi.fn(),
        getCanvasDimensions: vi.fn(() => ({ width: 800, height: 480 }))
    },
    mockFetchEntityStates: vi.fn(),
    mockGetAvailableColors: vi.fn(() => ['black', 'white', 'theme_auto', 'blue']),
    mockGetDeviceModel: vi.fn(() => 'generic')
}));

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

vi.mock('../../js/io/ha_api.js', () => ({
    fetchEntityStates: mockFetchEntityStates
}));

vi.mock('../../js/utils/device.js', () => ({
    getAvailableColors: mockGetAvailableColors,
    getDeviceModel: mockGetDeviceModel
}));

import { LegacyRenderer } from '../../js/core/properties/legacy_renderer.js';
import { renderLvglLegacyProperties } from '../../js/core/properties/legacy_renderer_widget_properties_lvgl.js';

function createPanel(config = {}) {
    const container = document.createElement('div');
    document.body.appendChild(container);
    const panel = {
        createSection: vi.fn(),
        endSection: vi.fn(),
        hints: [],
        addHint: vi.fn((hint) => {
            panel.hints.push(hint);
        }),
        addCommonLVGLProperties: vi.fn(),
        addLabeledInputWithPicker: vi.fn((label, _type, _value, onChange) => {
            const next = config.pickerValues?.[label] ?? 'sensor.demo';
            onChange(next);
        }),
        addLabeledInput: vi.fn((label, type, _value, onChange) => {
            const next = config.inputValues?.[label] ?? (type === 'number' ? '12' : 'demo');
            onChange(next);
        }),
        addCheckbox: vi.fn((label, value, onChange) => {
            const next = config.checkboxValues?.[label] ?? !value;
            onChange(next);
        }),
        addSelect: vi.fn((label, _value, options, onChange) => {
            const configured = config.selectValues?.[label];
            const fallback = typeof options[options.length - 1] === 'object'
                ? options[options.length - 1].value
                : options[options.length - 1];
            onChange(configured ?? fallback);
        }),
        addColorSelector: vi.fn((label, _value, _colors, onChange) => {
            const next = config.colorValues?.[label] ?? 'black';
            onChange(next);
        }),
        addColorMixer: vi.fn((label, _value, onChange) => {
            const next = config.colorValues?.[label] ?? '#112233';
            onChange(next);
        }),
        addSegmentedControl: vi.fn((label, _options, _value, onChange) => {
            const next = config.segmentValues?.[label] ?? 'Vertical';
            onChange(next);
        }),
        addCompactPropertyRow: vi.fn((callback) => callback()),
        addNumberWithSlider: vi.fn((label, _value, _min, _max, onChange) => {
            const next = config.sliderValues?.[label] ?? 33;
            onChange(next);
        }),
        addDropShadowButton: vi.fn(),
        getContainer() {
            return container;
        },
        autoPopulateTitleFromEntity: vi.fn()
    };
    return panel;
}

describe('LegacyRenderer stack', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.useFakeTimers();
        document.body.innerHTML = '';
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
    });

    it('auto-populates a selected widget title from fetched entity states', async () => {
        mockFetchEntityStates.mockImplementation(() => ({
            then(callback) {
                callback([
                    { entity_id: 'sensor.temperature', name: 'Living Room Temperature' }
                ]);
                return { catch() {} };
            }
        }));
        mockAppState.getSelectedWidget.mockReturnValue({ id: 'widget_title', title: '' });

        LegacyRenderer.autoPopulateTitleFromEntity('widget_title', 'sensor.temperature');

        expect(mockFetchEntityStates).toHaveBeenCalled();
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('widget_title', {
            title: 'Living Room Temperature'
        });
    });

    it('renders protocol image and generic weather property panels', () => {
        const imagePanel = createPanel({
            inputValues: {
                'Asset Path': '/images/logo.png'
            },
            checkboxValues: {
                'Invert Colors': true
            },
            colorValues: {
                'Background': 'white'
            }
        });

        LegacyRenderer.renderProtocolProperties(imagePanel, {
            id: 'protocol_image',
            props: {}
        }, 'image');

        expect(imagePanel.createSection).toHaveBeenCalledWith('Image Source', true);
        expect(imagePanel.addDropShadowButton).toHaveBeenCalledWith(imagePanel.getContainer(), 'protocol_image');
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('protocol_image', expect.objectContaining({
            props: expect.objectContaining({
                path: '/images/logo.png'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('protocol_image', expect.objectContaining({
            props: expect.objectContaining({
                invert: true
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('protocol_image', expect.objectContaining({
            props: expect.objectContaining({
                bg_color: 'white'
            })
        }));

        const weatherPanel = createPanel({
            pickerValues: {
                'Entity ID': 'weather.home'
            },
            inputValues: {
                'Title/Label': 'Forecast',
                'Size': '64'
            },
            colorValues: {
                'Color': 'blue',
                'Background': 'black'
            }
        });

        LegacyRenderer.renderProtocolProperties(weatherPanel, {
            id: 'protocol_weather',
            title: '',
            props: {
                weather_entity: '',
                bg_color: 'transparent',
                size: 24
            }
        }, 'weather_icon');

        expect(mockAppState.updateWidget).toHaveBeenCalledWith('protocol_weather', expect.objectContaining({
            props: expect.objectContaining({
                weather_entity: 'weather.home'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('protocol_weather', expect.objectContaining({
            props: expect.objectContaining({
                color: 'blue'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('protocol_weather', expect.objectContaining({
            props: expect.objectContaining({
                bg_color: 'black'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('protocol_weather', expect.objectContaining({
            props: expect.objectContaining({
                size: 64
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('protocol_weather', { title: 'Forecast' });
    });

    it('renders sensor text legacy properties with custom fonts and title auto-population', async () => {
        mockFetchEntityStates.mockImplementation(() => ({
            then(callback) {
                callback([
                    { entity_id: 'sensor.outdoor_temp', name: 'Outdoor Temperature' }
                ]);
                return { catch() {} };
            }
        }));
        const widget = {
            id: 'legacy_sensor',
            type: 'sensor_text',
            title: '',
            entity_id: '',
            props: {
                font_family: 'Fancy Font',
                font_weight: 650
            }
        };
        mockAppState.getSelectedWidget.mockReturnValue(widget);

        const panel = createPanel({
            pickerValues: {
                'Entity ID': 'sensor.outdoor_temp'
            },
            inputValues: {
                'Attribute (optional)': ' state ',
                'Prefix': ' pre ',
                'Suffix': ' post ',
                'Decimals': '3',
                'Font Size': '18',
                'Custom Font Name': 'Fancy Font',
                'Opacity (0.0 - 1.0)': '0.5'
            },
            checkboxValues: {
                Italic: true,
                'Word Wrap': false,
                'Show Unit': true
            },
            selectValues: {
                Font: 'Custom...',
                Weight: 500,
                Align: 'CENTER'
            },
            colorValues: {
                Color: 'blue',
                Background: 'white'
            }
        });

        LegacyRenderer.renderLegacyProperties(panel, widget, 'sensor_text');
        vi.runAllTimers();

        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_sensor', { entity_id: 'sensor.outdoor_temp' });
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_sensor', {
            title: 'Outdoor Temperature'
        });
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_sensor', expect.objectContaining({
            props: expect.objectContaining({
                attribute: ' state '
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_sensor', expect.objectContaining({
            props: expect.objectContaining({
                prefix: ' pre '
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_sensor', expect.objectContaining({
            props: expect.objectContaining({
                suffix: ' post '
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_sensor', expect.objectContaining({
            props: expect.objectContaining({
                decimals: 3
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_sensor', expect.objectContaining({
            props: expect.objectContaining({
                font_size: 18
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_sensor', expect.objectContaining({
            props: expect.objectContaining({
                font_family: 'Fancy Font',
                custom_font_family: 'Fancy Font'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_sensor', expect.objectContaining({
            props: expect.objectContaining({
                font_weight: 500
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_sensor', expect.objectContaining({
            props: expect.objectContaining({
                italic: true
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_sensor', expect.objectContaining({
            props: expect.objectContaining({
                text_align: 'CENTER'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_sensor', expect.objectContaining({
            props: expect.objectContaining({
                color: 'blue'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_sensor', expect.objectContaining({
            props: expect.objectContaining({
                bg_color: 'white'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_sensor', expect.objectContaining({
            props: expect.objectContaining({
                opacity: 0.5
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_sensor', expect.objectContaining({
            props: expect.objectContaining({
                word_wrap: false
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_sensor', expect.objectContaining({
            props: expect.objectContaining({
                show_unit: true
            })
        }));
    });

    it('renders legacy image, online image, quote RSS, calendar, puppet, and LVGL fallback branches', () => {
        mockGetDeviceModel.mockReturnValue('reterminal_e1001');

        const originalCreateElement = document.createElement.bind(document);
        let createdAnchor = null;
        vi.spyOn(document, 'createElement').mockImplementation((tagName) => {
            const element = originalCreateElement(tagName);
            if (String(tagName).toLowerCase() === 'a') {
                createdAnchor = element;
            }
            return element;
        });
        const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});

        const imagePanel = createPanel();
        const imageWidget = { id: 'legacy_image', x: 50, y: 50, width: 200, height: 150, props: {} };
        LegacyRenderer.renderLegacyProperties(imagePanel, imageWidget, 'image');
        const imageFillButton = Array.from(imagePanel.getContainer().querySelectorAll('button')).find((button) => button.textContent.includes('Fill Screen'));
        imageFillButton?.click();

        const onlinePanel = createPanel();
        const onlineWidget = { id: 'legacy_online', x: 0, y: 0, width: 800, height: 480, props: {} };
        LegacyRenderer.renderLegacyProperties(onlinePanel, onlineWidget, 'online_image');
        const onlineFillButton = Array.from(onlinePanel.getContainer().querySelectorAll('button')).find((button) => button.textContent.includes('restore'));
        onlineFillButton?.click();

        const quotePanel = createPanel({
            inputValues: {
                'Custom Font Name': 'QuoteFont'
            },
            selectValues: {
                Font: 'Custom...',
                Weight: 700,
                Align: 'BOTTOM_RIGHT',
                'Refresh Interval': '1h'
            },
            checkboxValues: {
                'Show Author': false,
                'Random Quote': true,
                'Word Wrap': false,
                'Auto Scale Text': true,
                'Italic Quote': false
            },
            colorValues: {
                Color: 'blue'
            }
        });
        LegacyRenderer.renderLegacyProperties(quotePanel, {
            id: 'legacy_quote',
            props: {
                font_family: 'QuoteFont',
                font_weight: 650
            }
        }, 'quote_rss');

        const calendarPanel = createPanel();
        LegacyRenderer.renderLegacyProperties(calendarPanel, {
            id: 'legacy_calendar',
            entity_id: '',
            props: {}
        }, 'calendar');
        const calendarButton = Array.from(calendarPanel.getContainer().querySelectorAll('button')).find((button) => button.textContent.includes('Download Helper Script'));
        calendarButton?.click();

        const puppetPanel = createPanel({
            inputValues: {
                'File path / URL': 'mdi:home'
            },
            selectValues: {
                'Image type': 'RGB565',
                Transparency: 'alpha_channel'
            }
        });
        LegacyRenderer.renderLegacyProperties(puppetPanel, {
            id: 'legacy_puppet',
            props: {}
        }, 'puppet');

        const lvglPanel = createPanel({
            selectValues: {
                Font: 'Roboto',
                Weight: 400,
                Align: 'CENTER'
            }
        });
        const lvglResult = LegacyRenderer.renderLegacyProperties(lvglPanel, {
            id: 'legacy_lvgl',
            width: 120,
            height: 30,
            props: {
                text: 'Label'
            }
        }, 'lvgl_label');

        vi.runAllTimers();

        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_image', expect.objectContaining({
            props: expect.objectContaining({
                invert: true
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_image', {
            x: 0,
            y: 0,
            width: 800,
            height: 480
        });
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_online', {
            x: 50,
            y: 50,
            width: 200,
            height: 150
        });
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_quote', expect.objectContaining({
            props: expect.objectContaining({
                feed_url: 'demo'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_quote', expect.objectContaining({
            props: expect.objectContaining({
                font_family: 'QuoteFont',
                custom_font_family: 'QuoteFont'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_quote', expect.objectContaining({
            props: expect.objectContaining({
                font_weight: 700
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_quote', expect.objectContaining({
            props: expect.objectContaining({
                text_align: 'BOTTOM_RIGHT'
            })
        }));
        expect(calendarPanel.addDropShadowButton).toHaveBeenCalledWith(calendarPanel.getContainer(), 'legacy_calendar');
        expect(createdAnchor?.getAttribute('download')).toBe('esp_calendar_data_conversion.py');
        expect(clickSpy).toHaveBeenCalled();
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_puppet', expect.objectContaining({
            props: expect.objectContaining({
                image_url: 'mdi:home'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_puppet', expect.objectContaining({
            props: expect.objectContaining({
                image_type: 'RGB565'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_puppet', expect.objectContaining({
            props: expect.objectContaining({
                transparency: 'alpha_channel'
            })
        }));
        expect(lvglPanel.addCommonLVGLProperties).toHaveBeenCalled();
        expect(lvglResult).toBeUndefined();
    });

    it('renders protocol property branches for online images, shapes, ODP widgets, multiline text, and generic icon widgets', () => {
        const onlinePanel = createPanel({
            inputValues: {
                'Image URL': 'https://example.com/cam.jpg',
                'Refresh (s)': '120'
            },
            checkboxValues: {
                'Invert Colors': true
            },
            colorValues: {
                Background: 'white'
            }
        });
        LegacyRenderer.renderProtocolProperties(onlinePanel, { id: 'protocol_online', props: {} }, 'online_image');

        const shapePanel = createPanel({
            colorValues: {
                'Fill/Line Color': '#123456',
                Background: 'white'
            },
            checkboxValues: {
                Fill: false
            },
            inputValues: {
                'Border Width': '4',
                'Corner Radius': '7'
            }
        });
        LegacyRenderer.renderProtocolProperties(shapePanel, { id: 'protocol_shape', props: { radius: 1 } }, 'rounded_rect');

        const sequencePanel = createPanel({
            colorValues: {
                Color: '#654321'
            },
            inputValues: {
                'Icon Size': '28',
                Spacing: '9',
                'Icons (comma sep)': 'mdi:home, mdi:weather-sunny'
            },
            selectValues: {
                Direction: 'down'
            }
        });
        LegacyRenderer.renderProtocolProperties(sequencePanel, { id: 'protocol_icons', props: {} }, 'odp_icon_sequence');

        const patternPanel = createPanel({
            colorValues: {
                Outline: 'blue',
                Fill: 'transparent'
            },
            inputValues: {
                'Border Width': '2',
                'Repeat X': '4',
                'Repeat Y': '3',
                'Size X': '18',
                'Size Y': '11'
            }
        });
        LegacyRenderer.renderProtocolProperties(patternPanel, { id: 'protocol_pattern', props: {} }, 'odp_rectangle_pattern');

        const arcPanel = createPanel({
            colorValues: {
                Outline: 'black',
                Fill: 'white'
            },
            inputValues: {
                'Border Width': '3',
                'Start Angle': '45',
                'End Angle': '270'
            }
        });
        LegacyRenderer.renderProtocolProperties(arcPanel, { id: 'protocol_arc', props: {} }, 'odp_arc');

        const plotPanel = createPanel({
            inputValues: {
                'Duration (sec)': '7200'
            },
            colorValues: {
                Background: 'white',
                Outline: '#cccccc'
            }
        });
        LegacyRenderer.renderProtocolProperties(plotPanel, { id: 'protocol_plot', props: {} }, 'odp_plot');

        const multilinePanel = createPanel({
            inputValues: {
                Text: 'Top|Bottom',
                Delimiter: '|',
                'Font Size': '18',
                'Line Spacing': '6'
            },
            colorValues: {
                Color: 'blue'
            },
            selectValues: {
                Font: 'Roboto Mono'
            }
        });
        LegacyRenderer.renderProtocolProperties(multilinePanel, { id: 'protocol_multiline', props: {} }, 'odp_multiline');

        const genericPanel = createPanel({
            pickerValues: {
                'Entity ID': 'weather.home'
            },
            inputValues: {
                'Title/Label': 'Forecast',
                Size: '64'
            },
            colorValues: {
                Color: 'blue',
                Background: 'black'
            }
        });
        LegacyRenderer.renderProtocolProperties(genericPanel, {
            id: 'protocol_generic',
            title: '',
            props: {
                weather_entity: '',
                bg_color: 'transparent',
                size: 24
            }
        }, 'weather_icon');

        expect(mockAppState.updateWidget).toHaveBeenCalledWith('protocol_online', expect.objectContaining({ props: expect.objectContaining({ url: 'https://example.com/cam.jpg' }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('protocol_online', expect.objectContaining({ props: expect.objectContaining({ interval_s: 120 }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('protocol_online', expect.objectContaining({ props: expect.objectContaining({ invert: true }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('protocol_online', expect.objectContaining({ props: expect.objectContaining({ bg_color: 'white' }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('protocol_shape', expect.objectContaining({ props: expect.objectContaining({ color: '#123456' }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('protocol_shape', expect.objectContaining({ props: expect.objectContaining({ fill: false }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('protocol_shape', expect.objectContaining({ props: expect.objectContaining({ bg_color: 'white' }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('protocol_shape', expect.objectContaining({ props: expect.objectContaining({ border_width: 4 }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('protocol_shape', expect.objectContaining({ props: expect.objectContaining({ radius: 7 }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('protocol_icons', expect.objectContaining({ props: expect.objectContaining({ fill: '#654321' }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('protocol_icons', expect.objectContaining({ props: expect.objectContaining({ size: 28 }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('protocol_icons', expect.objectContaining({ props: expect.objectContaining({ direction: 'down' }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('protocol_icons', expect.objectContaining({ props: expect.objectContaining({ spacing: 9 }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('protocol_icons', expect.objectContaining({ props: expect.objectContaining({ icons: 'mdi:home, mdi:weather-sunny' }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('protocol_pattern', expect.objectContaining({ props: expect.objectContaining({ x_repeat: 4 }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('protocol_pattern', expect.objectContaining({ props: expect.objectContaining({ y_repeat: 3 }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('protocol_pattern', expect.objectContaining({ props: expect.objectContaining({ x_size: 18 }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('protocol_pattern', expect.objectContaining({ props: expect.objectContaining({ y_size: 11 }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('protocol_arc', expect.objectContaining({ props: expect.objectContaining({ start_angle: 45 }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('protocol_arc', expect.objectContaining({ props: expect.objectContaining({ end_angle: 270 }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('protocol_plot', expect.objectContaining({ props: expect.objectContaining({ duration: 7200 }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('protocol_plot', expect.objectContaining({ props: expect.objectContaining({ background: 'white' }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('protocol_plot', expect.objectContaining({ props: expect.objectContaining({ outline: '#cccccc' }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('protocol_multiline', expect.objectContaining({ props: expect.objectContaining({ text: 'Top|Bottom' }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('protocol_multiline', expect.objectContaining({ props: expect.objectContaining({ delimiter: '|' }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('protocol_multiline', expect.objectContaining({ props: expect.objectContaining({ font_size: 18 }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('protocol_multiline', expect.objectContaining({ props: expect.objectContaining({ line_spacing: 6 }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('protocol_multiline', expect.objectContaining({ props: expect.objectContaining({ color: 'blue' }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('protocol_multiline', expect.objectContaining({ props: expect.objectContaining({ font_family: 'Roboto Mono' }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('protocol_generic', expect.objectContaining({ props: expect.objectContaining({ weather_entity: 'weather.home' }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('protocol_generic', expect.objectContaining({ props: expect.objectContaining({ color: 'blue' }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('protocol_generic', expect.objectContaining({ props: expect.objectContaining({ bg_color: 'black' }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('protocol_generic', expect.objectContaining({ props: expect.objectContaining({ size: 64 }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('protocol_generic', { title: 'Forecast' });
        expect(shapePanel.addDropShadowButton).toHaveBeenCalledWith(shapePanel.getContainer(), 'protocol_shape');
        expect(onlinePanel.addDropShadowButton).toHaveBeenCalledWith(onlinePanel.getContainer(), 'protocol_online');
    });

    it('renders legacy property branches for text, weather, chart, gauge, action, geometry, and QR widgets', () => {
        const labelPanel = createPanel({
            inputValues: {
                Text: 'Status',
                'Font Size': '19',
                'Opacity (0.0 - 1.0)': '0.75'
            },
            checkboxValues: {
                Italic: true,
                'Word Wrap': false
            },
            selectValues: {
                Font: 'Roboto',
                Weight: 400,
                Align: 'BOTTOM_RIGHT'
            },
            colorValues: {
                Color: 'blue',
                Background: 'white'
            }
        });
        LegacyRenderer.renderLegacyProperties(labelPanel, { id: 'legacy_label', props: {} }, 'label');

        const entityPanel = createPanel({
            pickerValues: {
                'Entity ID': 'text_sensor.weather_summary'
            },
            inputValues: {
                Attribute: 'friendly_name'
            },
            selectValues: {
                Font: 'Roboto',
                Weight: 400,
                Align: 'CENTER'
            }
        });
        LegacyRenderer.renderLegacyProperties(entityPanel, { id: 'legacy_entity', entity_id: '', props: {} }, 'entity_text');

        const datetimePanel = createPanel({
            inputValues: {
                Format: '%A %H:%M'
            },
            selectValues: {
                Font: 'Roboto',
                Weight: 400,
                Align: 'CENTER'
            }
        });
        LegacyRenderer.renderLegacyProperties(datetimePanel, { id: 'legacy_datetime', props: {} }, 'datetime');

        const weatherPanel = createPanel({
            pickerValues: {
                'Weather Entity': 'weather.home'
            },
            inputValues: {
                'Icon Size': '40'
            },
            checkboxValues: {
                'Show Temperature': false,
                'Show Condition': true
            },
            colorValues: {
                'Icon Color': 'blue'
            }
        });
        LegacyRenderer.renderLegacyProperties(weatherPanel, { id: 'legacy_weather', props: {} }, 'weather');

        const chartPanel = createPanel({
            pickerValues: {
                'Entity ID': 'sensor.power'
            },
            inputValues: {
                'Time Period (hours)': '48',
                'Line Width': '4'
            },
            checkboxValues: {
                'Show Axes': false
            },
            colorValues: {
                'Line Color': 'blue',
                'Fill Color': 'white'
            }
        });
        LegacyRenderer.renderLegacyProperties(chartPanel, { id: 'legacy_chart', entity_id: '', props: {} }, 'state_history');

        const gaugePanel = createPanel({
            pickerValues: {
                'Entity ID': 'sensor.fuel'
            },
            inputValues: {
                'Min Value': '10',
                'Max Value': '90',
                Thickness: '12'
            },
            colorValues: {
                'Bar Color': 'blue',
                'Background Color': 'white'
            }
        });
        LegacyRenderer.renderLegacyProperties(gaugePanel, { id: 'legacy_gauge', entity_id: '', props: {} }, 'gauge');

        const buttonPanel = createPanel({
            pickerValues: {
                'Entity ID': 'light.desk'
            },
            inputValues: {
                Label: 'Toggle Desk'
            },
            colorValues: {
                Color: 'blue',
                'Text Color': 'white'
            }
        });
        LegacyRenderer.renderLegacyProperties(buttonPanel, { id: 'legacy_button', entity_id: '', props: {} }, 'button');

        const rectanglePanel = createPanel({
            inputValues: {
                'Border Width': '5',
                'Corner Radius': '6'
            },
            colorValues: {
                Color: 'black',
                'Border Color': 'blue'
            }
        });
        LegacyRenderer.renderLegacyProperties(rectanglePanel, { id: 'legacy_rect', props: {} }, 'rectangle');

        const qrPanel = createPanel({
            inputValues: {
                'QR Content': 'https://example.com',
                Scale: '12'
            },
            selectValues: {
                'Error Correction': 'HIGH',
                Color: 'white'
            }
        });
        LegacyRenderer.renderLegacyProperties(qrPanel, { id: 'legacy_qr', props: {} }, 'qr_code');

        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_label', expect.objectContaining({ props: expect.objectContaining({ text: 'Status' }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_label', expect.objectContaining({ props: expect.objectContaining({ font_size: 19 }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_label', expect.objectContaining({ props: expect.objectContaining({ italic: true }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_label', expect.objectContaining({ props: expect.objectContaining({ text_align: 'BOTTOM_RIGHT' }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_label', expect.objectContaining({ props: expect.objectContaining({ color: 'blue' }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_label', expect.objectContaining({ props: expect.objectContaining({ bg_color: 'white' }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_label', expect.objectContaining({ props: expect.objectContaining({ opacity: 0.75 }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_label', expect.objectContaining({ props: expect.objectContaining({ word_wrap: false }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_entity', { entity_id: 'text_sensor.weather_summary' });
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_entity', expect.objectContaining({
            props: expect.objectContaining({
                attribute: 'friendly_name'
            })
        }));
        expect(datetimePanel.addHint).toHaveBeenCalledWith('e.g. %H:%M or %A, %B %d');
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_weather', expect.objectContaining({ props: expect.objectContaining({ weather_entity: 'weather.home' }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_weather', expect.objectContaining({ props: expect.objectContaining({ icon_size: 40 }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_weather', expect.objectContaining({ props: expect.objectContaining({ icon_color: 'blue' }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_weather', expect.objectContaining({ props: expect.objectContaining({ show_temp: false }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_weather', expect.objectContaining({ props: expect.objectContaining({ show_cond: true }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_chart', expect.objectContaining({ props: expect.objectContaining({ hours: 48 }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_chart', expect.objectContaining({ props: expect.objectContaining({ color: 'blue' }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_chart', expect.objectContaining({ props: expect.objectContaining({ fill_color: 'white' }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_chart', expect.objectContaining({ props: expect.objectContaining({ line_width: 4 }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_chart', expect.objectContaining({ props: expect.objectContaining({ show_axes: false }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_gauge', expect.objectContaining({ props: expect.objectContaining({ min: 10 }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_gauge', expect.objectContaining({ props: expect.objectContaining({ max: 90 }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_gauge', expect.objectContaining({ props: expect.objectContaining({ color: 'blue' }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_gauge', expect.objectContaining({ props: expect.objectContaining({ bg_color: 'white' }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_gauge', expect.objectContaining({ props: expect.objectContaining({ thickness: 12 }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_button', expect.objectContaining({ props: expect.objectContaining({ text: 'Toggle Desk' }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_button', expect.objectContaining({ props: expect.objectContaining({ color: 'blue' }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_button', expect.objectContaining({ props: expect.objectContaining({ text_color: 'white' }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_rect', expect.objectContaining({ props: expect.objectContaining({ color: 'black' }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_rect', expect.objectContaining({ props: expect.objectContaining({ border_width: 5 }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_rect', expect.objectContaining({ props: expect.objectContaining({ border_color: 'blue' }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_rect', expect.objectContaining({ props: expect.objectContaining({ border_radius: 6 }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_qr', expect.objectContaining({ props: expect.objectContaining({ value: 'https://example.com' }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_qr', expect.objectContaining({ props: expect.objectContaining({ scale: 10 }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_qr', expect.objectContaining({ props: expect.objectContaining({ ecc: 'HIGH' }) }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('legacy_qr', expect.objectContaining({ props: expect.objectContaining({ color: 'white' }) }));
    });

    it('renders LVGL legacy branches for core widget families beyond line and slider', () => {
        const runLvgl = (type, widget, config = {}) => {
            const panel = createPanel(config);
            const handled = renderLvglLegacyProperties(panel, widget, type, widget.props, (key, value) => {
                widget.props[key] = value;
                mockAppState.updateWidget(widget.id, { props: { ...widget.props } });
            });
            expect(handled).toBe(true);
            return panel;
        };

        runLvgl('lvgl_label', {
            id: 'lvgl_label_widget',
            props: {}
        }, {
            inputValues: {
                Text: 'Styled Label',
                'Font Size': '24'
            },
            selectValues: {
                Font: 'Roboto',
                Weight: 400,
                Align: 'BOTTOM_CENTER'
            },
            checkboxValues: {
                Italic: true
            },
            colorValues: {
                'Text Color': '#111111',
                'Background Color': '#eeeeee'
            }
        });

        runLvgl('lvgl_meter', {
            id: 'lvgl_meter_widget',
            width: 100,
            height: 100,
            entity_id: '',
            props: {}
        }, {
            pickerValues: {
                'Entity ID': 'sensor.power'
            },
            inputValues: {
                'Size (px)': '144',
                'Min Value': '10',
                'Max Value': '90',
                'Value (Preview)': '45',
                'Scale Width': '14',
                'Needle Width': '5',
                Ticks: '9',
                'Tick Length': '11',
                'Label Gap': '13'
            },
            colorValues: {
                'Scale Color': '#333333',
                'Needle Color': '#ff0000'
            }
        });

        runLvgl('lvgl_button', {
            id: 'lvgl_button_widget',
            entity_id: '',
            props: {}
        }, {
            pickerValues: {
                'Action Entity ID': 'light.desk'
            },
            inputValues: {
                Text: 'Go',
                'Border Width': '3',
                'Corner Radius': '9'
            },
            checkboxValues: {
                'Checkable (Toggle)': true
            },
            colorValues: {
                'Background Color': '#ffffff',
                'Text Color': '#000000'
            }
        });

        runLvgl('lvgl_arc', {
            id: 'lvgl_arc_widget',
            entity_id: '',
            props: {}
        }, {
            pickerValues: {
                'Sensor Entity ID': 'sensor.arc'
            },
            inputValues: {
                'Title / Label': 'Arc',
                'Min Value': '5',
                'Max Value': '95',
                'Default/Preview Value': '42',
                Thickness: '12',
                'Start Angle': '120',
                'End Angle': '30'
            },
            selectValues: {
                Mode: 'REVERSE'
            },
            colorValues: {
                Color: '#00aaff'
            }
        });

        runLvgl('lvgl_chart', {
            id: 'lvgl_chart_widget',
            entity_id: '',
            props: {}
        }, {
            pickerValues: {
                'Entity ID': 'sensor.chart'
            },
            inputValues: {
                Title: 'Trend',
                'Min Value': '0',
                'Max Value': '100',
                'Point Count': '12',
                'X Div Lines': '4',
                'Y Div Lines': '5'
            },
            selectValues: {
                Type: 'SCATTER'
            },
            colorValues: {
                Color: '#112233'
            }
        });

        runLvgl('lvgl_img', {
            id: 'lvgl_img_widget',
            props: {}
        }, {
            inputValues: {
                'Source (Image/Symbol)': 'mdi:home',
                'Rotation (0.1 deg)': '900',
                'Scale (256 = 1x)': '512'
            },
            colorValues: {
                'Color (Tint)': '#224466'
            }
        });

        runLvgl('lvgl_qrcode', {
            id: 'lvgl_qrcode_widget',
            props: {}
        }, {
            inputValues: {
                'Content / URL': 'https://example.com',
                'Size (px)': '96'
            },
            colorValues: {
                Color: '#000000',
                'Background Color': '#ffffff'
            }
        });

        runLvgl('lvgl_bar', {
            id: 'lvgl_bar_widget',
            entity_id: '',
            props: {}
        }, {
            pickerValues: {
                'Entity ID': 'sensor.bar'
            },
            inputValues: {
                Min: '10',
                Max: '90',
                Value: '40',
                'Start Value': '15'
            },
            selectValues: {
                Mode: 'REVERSE'
            },
            checkboxValues: {
                'Range Mode': true
            },
            colorValues: {
                'Bar Color': '#abcdef',
                'Background Color': '#fedcba'
            }
        });

        runLvgl('lvgl_tabview', {
            id: 'lvgl_tabview_widget',
            props: {}
        }, {
            inputValues: {
                'Tabs (comma separated)': 'One, Two, Three'
            },
            colorValues: {
                'Background Color': '#fafafa'
            }
        });

        runLvgl('lvgl_checkbox', {
            id: 'lvgl_checkbox_widget',
            entity_id: '',
            props: {}
        }, {
            pickerValues: {
                'Entity ID': 'binary_sensor.window'
            },
            inputValues: {
                Label: 'Open'
            },
            checkboxValues: {
                Checked: true
            },
            colorValues: {
                Color: '#008800'
            }
        });

        runLvgl('lvgl_dropdown', {
            id: 'lvgl_dropdown_widget',
            props: {}
        }, {
            inputValues: {
                'Options (one per line)': 'A\nB\nC',
                Index: '2',
                'Max H': '180'
            },
            segmentValues: {
                Direction: 'UP'
            },
            colorValues: {
                Color: '#abcdef'
            }
        });

        runLvgl('lvgl_switch', {
            id: 'lvgl_switch_widget',
            entity_id: '',
            props: {}
        }, {
            pickerValues: {
                'Entity ID': 'switch.relay'
            },
            checkboxValues: {
                Checked: true
            },
            colorValues: {
                'Indicator Color': '#00ff00',
                'Background Color': '#333333',
                'Knob Color': '#ffffff'
            }
        });

        runLvgl('lvgl_textarea', {
            id: 'lvgl_textarea_widget',
            props: {}
        }, {
            inputValues: {
                Placeholder: 'Type here',
                Text: 'ABC',
                'Accepted Chars': 'ABC123',
                'Max Length': '12'
            },
            checkboxValues: {
                'One Line': true,
                'Password Mode': true
            }
        });

        expect(mockAppState.updateWidget).toHaveBeenCalledWith('lvgl_label_widget', expect.objectContaining({
            props: expect.objectContaining({
                text: 'Styled Label',
                font_size: 24,
                color: '#111111',
                bg_color: '#eeeeee',
                italic: true,
                text_align: 'BOTTOM_CENTER'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('lvgl_meter_widget', { entity_id: 'sensor.power' });
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('lvgl_meter_widget', expect.objectContaining({
            width: 144,
            height: 144
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('lvgl_button_widget', expect.objectContaining({
            props: expect.objectContaining({
                text: 'Go',
                border_width: 3,
                radius: 9,
                checkable: true
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('lvgl_arc_widget', expect.objectContaining({
            props: expect.objectContaining({
                title: 'Arc',
                min: 5,
                max: 95,
                value: 42,
                thickness: 12,
                start_angle: 120,
                end_angle: 30,
                mode: 'REVERSE'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('lvgl_chart_widget', expect.objectContaining({
            props: expect.objectContaining({
                type: 'SCATTER',
                point_count: 12,
                x_div_lines: 4,
                y_div_lines: 5
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('lvgl_img_widget', expect.objectContaining({
            props: expect.objectContaining({
                src: 'mdi:home',
                rotation: 900,
                scale: 512
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('lvgl_qrcode_widget', expect.objectContaining({
            props: expect.objectContaining({
                text: 'https://example.com',
                size: 96,
                bg_color: '#ffffff'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('lvgl_bar_widget', expect.objectContaining({
            props: expect.objectContaining({
                start_value: 15,
                range_mode: true,
                mode: 'REVERSE'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('lvgl_tabview_widget', expect.objectContaining({
            props: expect.objectContaining({
                tabs: ['One', 'Two', 'Three']
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('lvgl_checkbox_widget', expect.objectContaining({
            props: expect.objectContaining({
                text: 'Open',
                checked: true
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('lvgl_dropdown_widget', expect.objectContaining({
            props: expect.objectContaining({
                options: 'A\nB\nC',
                selected_index: 2,
                max_height: 180,
                direction: 'UP'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('lvgl_switch_widget', expect.objectContaining({
            props: expect.objectContaining({
                checked: true,
                knob_color: '#ffffff'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('lvgl_textarea_widget', expect.objectContaining({
            props: expect.objectContaining({
                placeholder: 'Type here',
                text: 'ABC',
                one_line: true,
                password_mode: true,
                accepted_chars: 'ABC123',
                max_length: 12
            })
        }));
    });

    it('renders LVGL legacy widgets directly for line and slider branches', () => {
        const linePanel = createPanel({
            selectValues: {
                Orientation: 'vertical'
            },
            inputValues: {
                'Line Width': '5',
                'Opacity (0-255)': '200'
            },
            checkboxValues: {
                'Rounded Ends': false
            },
            colorValues: {
                'Line Color': '#445566'
            }
        });
        const lineWidget = { id: 'lvgl_line_widget', x: 10, y: 20, width: 100, height: 5, props: {} };
        const lineHandled = renderLvglLegacyProperties(linePanel, lineWidget, 'lvgl_line', lineWidget.props, (key, value) => {
            lineWidget.props[key] = value;
            mockAppState.updateWidget(lineWidget.id, { props: { ...lineWidget.props } });
        });
        const lineButtons = linePanel.getContainer().querySelectorAll('button');
        lineButtons[0]?.click();
        lineButtons[1]?.click();

        const sliderPanel = createPanel({
            segmentValues: {
                Orientation: 'Vertical'
            },
            inputValues: {
                Min: '10',
                Max: '90',
                'Border Width': '4'
            },
            sliderValues: {
                Value: 42
            },
            colorValues: {
                'Knob/Bar Color': '#222222',
                'Track Color': '#dddddd'
            },
            selectValues: {
                Mode: 'REVERSE'
            }
        });
        const sliderWidget = { id: 'lvgl_slider_widget', x: 0, y: 0, width: 120, height: 30, props: {} };
        const sliderHandled = renderLvglLegacyProperties(sliderPanel, sliderWidget, 'lvgl_slider', sliderWidget.props, (key, value) => {
            sliderWidget.props[key] = value;
            mockAppState.updateWidget(sliderWidget.id, { props: { ...sliderWidget.props } });
        });

        expect(renderLvglLegacyProperties(createPanel(), { id: 'x', props: {} }, 'text', {}, vi.fn())).toBe(false);
        expect(lineHandled).toBe(true);
        expect(sliderHandled).toBe(true);
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('lvgl_line_widget', expect.objectContaining({
            props: expect.objectContaining({
                orientation: 'vertical'
            }),
            width: 5,
            height: 100
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('lvgl_line_widget', expect.objectContaining({
            x: 0,
            y: 20,
            width: 800,
            height: 5,
            props: expect.objectContaining({
                orientation: 'horizontal'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('lvgl_line_widget', expect.objectContaining({
            x: 10,
            y: 0,
            width: 5,
            height: 480,
            props: expect.objectContaining({
                orientation: 'vertical'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('lvgl_slider_widget', expect.objectContaining({
            props: expect.objectContaining({
                vertical: true
            }),
            width: 30,
            height: 120
        }));
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('lvgl_slider_widget', expect.objectContaining({
            props: expect.objectContaining({
                min: 10,
                max: 90,
                value: 42,
                color: '#222222',
                bg_color: '#dddddd',
                border_width: 4,
                mode: 'REVERSE'
            })
        }));
    });
});
