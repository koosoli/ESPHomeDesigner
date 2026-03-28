import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { AppState } from '../../js/core/state';
import { renderOnDeviceHumidity } from '../../features/ondevice_humidity/render.js';
import { renderOnDeviceTemperature } from '../../features/ondevice_temperature/render.js';
import { renderProgressBarProperties } from '../../features/progress_bar/properties.js';
import { renderProgressBar } from '../../features/progress_bar/render.js';
import { renderWeatherIconProperties } from '../../features/weather_icon/properties.js';
import { renderWeatherIcon } from '../../features/weather_icon/render.js';
import { renderWifiSignalProperties } from '../../features/wifi_signal/properties.js';
import { renderWifiSignal } from '../../features/wifi_signal/render.js';

function createPanel() {
    return {
        autoPopulateTitleFromEntity: vi.fn(),
        createSection: vi.fn(),
        endSection: vi.fn(),
        addHint: vi.fn(),
        addDropShadowButton: vi.fn(),
        addCompactPropertyRow(fn) {
            fn();
        },
        addLabeledInputWithPicker(_label, _type, _value, onChange) {
            onChange('sensor.demo');
        },
        addLabeledInput(_label, type, _value, onChange) {
            onChange(type === 'number' ? '12' : 'demo');
        },
        addCheckbox(_label, value, onChange) {
            onChange(!value);
        },
        addSelect(_label, _value, options, onChange) {
            onChange(options[0]);
        },
        addNumberWithSlider(_label, _value, _min, _max, onChange) {
            onChange(42);
        },
        addColorSelector(_label, _value, _colors, onChange) {
            onChange('black');
        },
        getContainer() {
            return document.body;
        }
    };
}

describe('Extracted Feature Modules', () => {
    let originalEntityStates;
    let originalUpdateWidget;

    beforeEach(() => {
        originalEntityStates = AppState.entityStates;
        originalUpdateWidget = AppState.updateWidget;
        AppState.entityStates = {};
        AppState.updateWidget = vi.fn();
    });

    afterEach(() => {
        AppState.entityStates = originalEntityStates;
        AppState.updateWidget = originalUpdateWidget;
        vi.restoreAllMocks();
        document.body.innerHTML = '';
    });

    it('renders on-device temperature and humidity previews from entity state', () => {
        AppState.entityStates = {
            'sensor.temp': { state: '26.4' },
            'sensor.humidity': { state: '67' }
        };

        const tempEl = document.createElement('div');
        renderOnDeviceTemperature(tempEl, {
            height: 80,
            entity_id: 'sensor.temp',
            props: {
                is_local_sensor: false,
                fit_icon_to_frame: true,
                unit: 'Â°F',
                show_label: true,
                precision: 1
            }
        }, { getColorStyle: (value) => value });

        const humidityEl = document.createElement('div');
        renderOnDeviceHumidity(humidityEl, {
            height: 80,
            entity_id: 'sensor.humidity',
            props: {
                is_local_sensor: false,
                fit_icon_to_frame: true,
                show_label: true,
                precision: 0
            }
        }, { getColorStyle: (value) => value });

        expect(tempEl.textContent).toContain('26.4Â°F');
        expect(tempEl.textContent).toContain('Temperature');
        expect(humidityEl.textContent).toContain('67%');
        expect(humidityEl.textContent).toContain('Humidity');
    });

    it('renders progress, wifi, and weather previews with extracted renderers', () => {
        AppState.entityStates = {
            'sensor.battery': { state: '25' },
            'sensor.wifi': { state: '-72' },
            'weather.home': {
                state: 'sunny',
                attributes: {
                    forecast: {
                        state: 'rainy'
                    }
                }
            }
        };

        const progressEl = document.createElement('div');
        renderProgressBar(progressEl, {
            title: 'Battery',
            entity_id: 'sensor.battery',
            props: {
                show_label: true,
                show_percentage: true,
                orientation: 'vertical',
                min: 0,
                max: 100,
                color: 'theme_auto'
            }
        }, {
            getColorStyle: (value) => value,
            isDark: false
        });

        const wifiEl = document.createElement('div');
        renderWifiSignal(wifiEl, {
            width: 60,
            height: 60,
            entity_id: 'sensor.wifi',
            props: {
                is_local_sensor: false,
                show_dbm: true,
                fit_icon_to_frame: true,
                border_width: 1,
                border_color: 'black',
                bg_color: 'white'
            }
        }, { getColorStyle: (value) => value });

        const weatherEl = document.createElement('div');
        renderWeatherIcon(weatherEl, {
            width: 64,
            height: 64,
            entity_id: 'weather.home',
            props: {
                attribute: 'forecast.state',
                fit_icon_to_frame: true,
                border_width: 1,
                border_color: 'black'
            }
        }, { getColorStyle: (value) => value });

        expect(progressEl.textContent).toContain('Battery');
        expect(progressEl.textContent).toContain('25%');
        expect(wifiEl.textContent).toContain('-72dB');
        expect(weatherEl.style.fontSize).toBe('56px');
        expect(weatherEl.style.border).toContain('solid');
    });

    it('executes extracted property renderers and updates widget state', () => {
        const panel = createPanel();
        const widget = {
            id: 'widget-1',
            title: '',
            entity_id: '',
            props: {
                color: 'theme_auto',
                bg_color: 'white',
                opacity: 100,
                fit_icon_to_frame: true,
                show_dbm: true,
                is_local_sensor: true
            }
        };

        renderProgressBarProperties(panel, { ...widget, props: { ...widget.props, min: 0, max: 100, border_width: 1 } });
        renderWifiSignalProperties(panel, { ...widget, props: { ...widget.props, border_width: 0, border_radius: 0, size: 24, font_size: 12 } });
        renderWeatherIconProperties(panel, { ...widget, props: { ...widget.props, weather_entity: 'weather.home', attribute: '', border_width: 0, border_radius: 0, size: 48 } });

        expect(AppState.updateWidget).toHaveBeenCalled();
        expect(panel.addDropShadowButton).toHaveBeenCalledTimes(3);
    });
});
