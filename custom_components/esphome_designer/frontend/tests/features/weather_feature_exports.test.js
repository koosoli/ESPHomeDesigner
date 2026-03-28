import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockAppState } = vi.hoisted(() => ({
    mockAppState: {
        entityStates: {}
    }
}));

vi.mock('@core/state', () => ({
    AppState: mockAppState
}));

import { exportDoc as exportWeatherDoc } from '../../features/weather_forecast/export_direct.js';
import { renderWeatherIcon } from '../../features/weather_icon/render.js';

describe('weather feature exports', () => {
    beforeEach(() => {
        mockAppState.entityStates = {};
        document.body.innerHTML = '';
    });

    it('exports direct daily forecasts with rounded backgrounds and high/low formatting', () => {
        const lines = [];

        exportWeatherDoc({
            id: 'weather_daily',
            x: 0,
            y: 0,
            width: 210,
            height: 70,
            props: {
                layout: 'horizontal',
                days: 3,
                background_color: 'white',
                border_width: 1,
                border_color: 'black',
                border_radius: 8,
                color: 'blue',
                precision: 0
            }
        }, {
            lines,
            addFont: vi.fn(() => 'weather_font'),
            getColorConst: (value) => `Color(${value})`,
            addDitherMask: vi.fn(),
            getConditionCheck: () => '',
            isEpaper: false
        });

        const output = lines.join('\n');
        expect(output).toContain('it.filled_rounded_rectangle(0, 0, 210, 70, 8, Color(white));');
        expect(output).toContain('auto get_day_name = [](int offset) -> std::string {');
        expect(output).toContain('sprintf(temp_buf, "%.*f/%.*f');
        expect(output).toContain('weather_cond_day0');
    });

    it('exports direct hourly forecasts with fixed slots and single temperature values', () => {
        const lines = [];

        exportWeatherDoc({
            id: 'weather_hourly',
            x: 5,
            y: 6,
            width: 120,
            height: 100,
            props: {
                forecast_mode: 'hourly',
                hourly_mode: 'fixed',
                hourly_slots: '06,09,12',
                start_offset: 1,
                precision: 1,
                temp_unit: 'F',
                show_high_low: false
            }
        }, {
            lines,
            addFont: vi.fn(() => 'weather_font'),
            getColorConst: (value) => `Color(${value})`,
            addDitherMask: vi.fn(),
            getConditionCheck: () => '',
            isEpaper: false
        });

        const output = lines.join('\n');
        expect(output).toContain('const char* slots[] = {"09:00", "12:00"};');
        expect(output).toContain('weather_cond_h0900');
        expect(output).toContain('it.printf(dx + 30, dy + 52, id(weather_font), Color(theme_auto), TextAlign::TOP_CENTER, "--");');
    });

    it('renders weather icons from nested attributes and shows a no-entity preview label when appropriate', () => {
        mockAppState.entityStates = {
            'weather.home': {
                state: 'sunny',
                attributes: {
                    forecast: {
                        condition: 'lightning-rainy'
                    }
                }
            }
        };

        const withEntity = document.createElement('div');
        renderWeatherIcon(withEntity, {
            id: 'weather_icon_attr',
            width: 40,
            height: 36,
            entity_id: 'weather.home',
            props: {
                attribute: 'forecast.condition',
                fit_icon_to_frame: true,
                border_width: 1,
                border_color: 'black',
                bg_color: 'white'
            }
        }, {
            getColorStyle: (value) => value || '#000'
        });

        expect(withEntity.style.fontSize).toBe('28px');
        expect(withEntity.style.border).toContain('1px solid');
        expect(withEntity.innerText.codePointAt(0)).toBe(0xf067e);

        const noEntity = document.createElement('div');
        renderWeatherIcon(noEntity, {
            id: 'weather_icon_empty',
            width: 32,
            height: 32,
            props: {}
        }, {
            getColorStyle: (value) => value || '#000'
        });

        expect(noEntity.textContent).toContain('No Entity');
    });
});
