/**
 * @vitest-environment jsdom
 */
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

import moonPhasePlugin from '../../features/moon_phase/plugin.js';
import sunTimesPlugin from '../../features/sun_times/plugin.js';

describe('astronomy widgets', () => {
    beforeEach(() => {
        mockAppState.entityStates = {};
        mockAppState.updateWidget.mockReset();
        document.body.innerHTML = '';
    });

    it('renders and exports the moon phase widget using the mapped moon icons', () => {
        mockAppState.entityStates = {
            'sensor.moon': { state: 'full_moon' }
        };

        const host = document.createElement('div');
        moonPhasePlugin.render(host, {
            id: 'moon_1',
            entity_id: 'sensor.moon',
            width: 36,
            height: 36,
            props: {
                fit_icon_to_frame: true,
                color: 'theme_auto',
                border_width: 1,
                border_color: 'black',
                bg_color: 'white'
            }
        }, {
            getColorStyle: (value) => value === 'theme_auto' ? 'black' : value
        });

        expect(host.style.fontSize).toBe('28px');
        expect(host.style.border).toContain('1px solid');
        expect(host.innerText.codePointAt(0)).toBe(0xf0f62);

        const exportContext = {
            lines: [],
            addFont: vi.fn(() => 'mdi_font'),
            getColorConst: vi.fn((value) => `COLOR_${value}`),
            getConditionCheck: vi.fn(() => null)
        };

        moonPhasePlugin.export({
            id: 'moon_1',
            entity_id: 'sensor.moon',
            x: 10,
            y: 12,
            width: 40,
            height: 40,
            props: {
                size: 30,
                color: 'theme_auto'
            }
        }, exportContext);

        const exported = exportContext.lines.join('\n');
        expect(exported).toContain('id(sensor_moon_txt).state');
        expect(exported).toContain('\\U000F0F62');

        const sensorContext = {
            lines: [],
            widgets: [{
                id: 'moon_1',
                type: 'moon_phase',
                entity_id: 'sensor.moon',
                props: {}
            }],
            isLvgl: true,
            pendingTriggers: new Map(),
            seenSensorIds: new Set()
        };

        moonPhasePlugin.onExportTextSensors(sensorContext);
        expect(sensorContext.lines.join('\n')).toContain('# Moon Phase Sensors');
        expect(sensorContext.lines.join('\n')).toContain('entity_id: sensor.moon');
        expect(Array.from(sensorContext.pendingTriggers.get('sensor.moon') || [])).toEqual([
            '- lvgl.widget.refresh: moon_1'
        ]);
    });

    it('uses an explicit unknown icon when the moon phase entity is missing', () => {
        const host = document.createElement('div');
        moonPhasePlugin.render(host, {
            id: 'moon_missing',
            width: 36,
            height: 36,
            props: {
                fit_icon_to_frame: true,
                color: 'theme_auto'
            }
        }, {
            getColorStyle: (value) => value === 'theme_auto' ? 'black' : value
        });

        expect(host.innerText.codePointAt(0)).toBe(0xf0625);
        expect(host.textContent).toContain('No Entity');
    });

    it('formats sunrise and sunset rows across preview, direct export, and LVGL hooks', () => {
        const sunriseRaw = '2026-04-05T06:42:00+00:00';
        const sunsetRaw = '2026-04-05T19:58:00+00:00';
        const expectedSunrise = new Date(sunriseRaw).toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
        const expectedSunset = new Date(sunsetRaw).toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });

        mockAppState.entityStates = {
            'sun.sun': {
                state: 'above_horizon',
                attributes: {
                    next_rising: sunriseRaw,
                    next_setting: sunsetRaw
                }
            }
        };

        const host = document.createElement('div');
        sunTimesPlugin.render(host, {
            id: 'sun_1',
            width: 150,
            height: 64,
            props: {
                sunrise_entity: 'sun.sun',
                sunset_entity: 'sun.sun',
                show_sunrise: true,
                show_sunset: true,
                icon_size: 18,
                font_size: 16,
                row_gap: 4,
                icon_gap: 6,
                bg_color: 'white'
            }
        }, {
            getColorStyle: (value) => value === 'theme_auto' ? 'black' : value
        });

        expect(host.textContent).toContain(expectedSunrise);
        expect(host.textContent).toContain(expectedSunset);
        expect(host.style.backgroundColor).toBe('white');

        const exportContext = {
            lines: [],
            addFont: vi.fn((family, _weight, size) => `${family}_${size}`),
            getColorConst: vi.fn((value) => `COLOR_${value}`),
            getConditionCheck: vi.fn(() => null)
        };

        sunTimesPlugin.export({
            id: 'sun_1',
            x: 0,
            y: 0,
            width: 150,
            height: 64,
            props: {
                sunrise_entity: 'sun.sun',
                sunset_entity: 'sun.sun',
                show_sunrise: true,
                show_sunset: true,
                icon_size: 18,
                font_size: 16
            }
        }, exportContext);

        const exported = exportContext.lines.join('\n');
        expect(exported).toContain('\\U000F059C');
        expect(exported).toContain('\\U000F059B');
        expect(exported).toContain('id(sun_sun_next_rising_txt).has_state()');
        expect(exported).toContain('id(sun_sun_next_setting_txt).has_state()');
        expect(exported).toContain('localtime(&ts)');

        const lvgl = sunTimesPlugin.exportLVGL({
            id: 'sun-1',
            x: 0,
            y: 0,
            width: 150,
            height: 64,
            props: {
                sunrise_entity: 'sun.sun',
                sunset_entity: 'sun.sun',
                show_sunrise: true,
                show_sunset: true,
                icon_size: 18,
                font_size: 16
            }
        }, {
            common: { id: 'sun_base' },
            convertColor: (value) => `Color(${value})`,
            getLVGLFont: (family, size, weight) => `${family}_${size}_${weight}`
        });

        expect(lvgl.obj.widgets).toHaveLength(4);
        expect(lvgl.obj.widgets[1].label.text).toContain('sun_sun_next_rising_txt');
        expect(lvgl.obj.widgets[3].label.text).toContain('sun_sun_next_setting_txt');
        expect(lvgl.obj.widgets[1].label.text).toContain('localtime(&ts)');

        const sensorContext = {
            lines: [],
            widgets: [{
                id: 'sun-1',
                type: 'sun_times',
                props: {
                    sunrise_entity: 'sun.sun',
                    sunset_entity: 'sun.sun',
                    show_sunrise: true,
                    show_sunset: true
                }
            }],
            isLvgl: true,
            pendingTriggers: new Map(),
            seenSensorIds: new Set()
        };

        sunTimesPlugin.onExportTextSensors(sensorContext);
        expect(sensorContext.lines.join('\n')).toContain('# Sunrise / Sunset Text Sensors');
        expect(sensorContext.lines.join('\n')).toContain('entity_id: sun.sun');
        expect(sensorContext.lines.join('\n')).toContain('attribute: next_rising');
        expect(sensorContext.lines.join('\n')).toContain('attribute: next_setting');
        expect(Array.from(sensorContext.pendingTriggers.get('sun_sun_next_rising_txt') || [])).toEqual([
            '- lvgl.widget.refresh: sun_1_sunrise_text'
        ]);
        expect(Array.from(sensorContext.pendingTriggers.get('sun_sun_next_setting_txt') || [])).toEqual([
            '- lvgl.widget.refresh: sun_1_sunset_text'
        ]);
    });
});
