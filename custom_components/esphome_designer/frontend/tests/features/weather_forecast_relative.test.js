import { describe, it, expect } from 'vitest';
import plugin from '../../features/weather_forecast/plugin.js';

describe('weather_forecast widget relative hourly mode', () => {
    let mockContext;

    beforeEach(() => {
        mockContext = {
            seenSensorIds: new Set(),
            usedLVGLFonts: new Set(),
            getColorConst: (c) => c,
            getColorStyle: (c) => c,
            convertColor: (c) => c
        };
    });

    const mockHelpers = {
        common: {
            addProperty: (_w, _lines) => { },
            addPositionAndSize: (_w, _lines) => { },
            addStyles: (_w, _lines) => { }
        },
        convertColor: (c) => c,
        getLVGLFont: () => 'lv_font_montserrat_14',
        globalData: {
            time_source: 'ha_time'
        }
    };

    const runLVGL = (w) => {
        return plugin.exportLVGL(w, mockHelpers);
    };

    it('should generate correct get_hour_label lambda for relative mode', () => {
        const widget = {
            id: 'testWeather',
            type: 'weather_forecast',
            props: {
                forecast_mode: 'hourly',
                hourly_mode: 'relative',
                relative_count: 3
            }
        };

        const lines = [];
        // `exportDoc` expects a single context object as the second argument
        plugin.export(widget, {
            lines,
            addFont: () => { },
            addDitherMask: () => { },
            sanitize: (s) => s,
            getCondProps: () => ({}),
            getConditionCheck: () => 'true',
            isEpaper: false,
            ...mockContext,
            ...mockHelpers.common
        });

        const exported = lines.join('\n');
        expect(exported).toContain('auto t = id(ha_time).now();');
        expect(exported).toContain('sprintf(buf, "%02d:00", (t.hour + offset + 1) % 24);');

        // Ensure 3 hplus sensors are exported
        expect(exported).toContain('weather_cond_hplus1');
        expect(exported).toContain('weather_high_hplus3');
    });

    it('should generate template sensors with +Nh pattern', () => {
        const widget = {
            id: 'testWeather2',
            type: 'weather_forecast',
            props: {
                forecast_mode: 'hourly',
                hourly_mode: 'relative',
                relative_count: 2
            }
        };

        const numericLines = [];
        plugin.onExportNumericSensors({ widgets: [widget], lines: numericLines, seenSensorIds: mockContext.seenSensorIds });
        const textLines = [];
        plugin.onExportTextSensors({ widgets: [widget], lines: textLines, seenSensorIds: mockContext.seenSensorIds });

        const numericOut = numericLines.join('\n');
        expect(numericOut).toContain('weather_high_hplus1');
        expect(numericOut).toContain('sensor.weather_forecast_plus_1h_high');

        const textOut = textLines.join('\n');
        expect(textOut).toContain('weather_cond_hplus2');
        expect(textOut).toContain('sensor.weather_forecast_plus_2h_condition');

        // Check the HA YAML template auto-generation
        expect(textOut).toContain("name: 'Weather Forecast Plus 1h'");
        expect(textOut).toContain("timedelta(hours=1)");
    });

    it('should generate lvgl lamdas dynamically computed', () => {
        const widget = {
            id: 'testWeather3',
            type: 'weather_forecast',
            props: {
                forecast_mode: 'hourly',
                hourly_mode: 'relative',
                relative_count: 2
            }
        };

        const lvglContainer = runLVGL(widget);
        const allYaml = JSON.stringify(lvglContainer);

        expect(allYaml).toContain('auto t = id(ha_time).now();');
        expect(allYaml).toContain('sprintf(buf, \\"%02d:00\\", (t.hour + 1) % 24)');
    });
});
