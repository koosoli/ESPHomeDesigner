import { describe, it, expect, vi } from 'vitest';
import WifiSignalPlugin from '../../features/wifi_signal/plugin.js';

describe('Wifi Signal Plugin', () => {
    it('should center the widget content in generated YAML', () => {
        const widget = {
            id: 'w1',
            type: 'wifi_signal',
            x: 10,
            y: 20,
            width: 120,
            height: 40,
            entity_id: 'sensor.wifi_signal',
            props: {
                size: 24,
                font_size: 12,
                color: 'black',
                show_dbm: true,
                is_local_sensor: false
            }
        };

        const lines = [];
        const context = {
            lines,
            addFont: vi.fn(() => 'font_mdi'),
            getColorConst: vi.fn(() => 'Color::BLACK'),
            addDitherMask: vi.fn(),
            getCondProps: vi.fn(() => ''),
            getConditionCheck: vi.fn(() => null),
            isEpaper: false
        };

        WifiSignalPlugin.export(widget, context);

        const generatedCode = lines.join('\n');

        // We expect the X coordinate to be centered: x + width / 2
        // w.x = 10, w.width = 120. Center is 10 + 60 = 70, or generally "10 + 120/2"
        // The current implementation probably just uses "10"

        // Check for the icon print statement
        // It currently likely looks like: it.printf(10, 20, ...)
        // We want it to be centered.

        // Let's see what it generates currently versus what we want.
        // Ideally we want TextAlign::CENTER (or TOP_CENTER/CENTER_HORIZONTAL)

        // This assertion simulates the bug fix we WANT. 
        // If the code is buggy, this should fail because it will just use '10' (the x value).
        expect(generatedCode).toContain(`it.printf(${widget.x} + ${widget.width} / 2`);
        expect(generatedCode).toContain('TextAlign::TOP_CENTER');
    });

    it('exports OpenDisplay, OEPL, and LVGL payloads with external sensor ids', () => {
        const widget = {
            id: 'wifi-1',
            x: 4,
            y: 6,
            width: 80,
            height: 36,
            entity_id: 'sensor.router_wifi',
            props: {
                size: 18,
                font_size: 11,
                color: 'theme_auto',
                show_dbm: true,
                is_local_sensor: false
            }
        };

        const openDisplay = WifiSignalPlugin.exportOpenDisplay(widget, {
            layout: { darkMode: true },
            _page: {}
        });
        expect(openDisplay).toHaveLength(2);
        expect(openDisplay[0]).toMatchObject({
            type: 'icon',
            fill: 'white',
            anchor: 'mt'
        });
        expect(openDisplay[0].value).toContain("states('sensor.router_wifi')");

        const oepl = WifiSignalPlugin.exportOEPL({
            ...widget,
            props: { ...widget.props, show_dbm: true, color: 'black' }
        }, {
            _layout: {},
            _page: {}
        });
        expect(oepl).toHaveLength(2);
        expect(oepl[1].value).toContain("states('sensor.router_wifi')");

        const lvgl = WifiSignalPlugin.exportLVGL(widget, {
            common: { id: 'wifi_lvgl' },
            convertColor: (value) => `Color(${value})`,
            getLVGLFont: (family, size, weight) => `${family}_${size}_${weight}`
        });
        const serialized = JSON.stringify(lvgl);
        expect(serialized).toContain('id(sensor_router_wifi).state');
        expect(serialized).toContain('---dB');
    });

    it('exports local and external numeric sensors without duplicates and tracks requirements', () => {
        const lines = [];
        const seenSensorIds = new Set();
        const pendingTriggers = new Map();

        WifiSignalPlugin.onExportNumericSensors({
            lines,
            seenSensorIds,
            isLvgl: true,
            pendingTriggers,
            widgets: [
                { id: 'wifi-local', type: 'wifi_signal', props: { is_local_sensor: true } },
                { id: 'wifi-external-a', type: 'wifi_signal', entity_id: 'office_wifi', props: { is_local_sensor: false } },
                { id: 'wifi-external-b', type: 'wifi_signal', entity_id: 'office_wifi', props: { is_local_sensor: false } }
            ]
        });

        const output = lines.join('\n');
        expect(output).toContain('- platform: homeassistant');
        expect(output).toContain('id: sensor_office_wifi');
        expect(output).toContain('- platform: wifi_signal');
        expect(output.match(/id: sensor_office_wifi/g)).toHaveLength(1);
        expect([...pendingTriggers.get('wifi_signal_dbm')]).toContain('- lvgl.widget.refresh: wifi-local');
        expect([...pendingTriggers.get('sensor.office_wifi')]).toEqual([
            '- lvgl.widget.refresh: wifi-external-a',
            '- lvgl.widget.refresh: wifi-external-b'
        ]);

        const trackIcon = vi.fn();
        const addFont = vi.fn();
        WifiSignalPlugin.collectRequirements({
            props: {
                size: 22,
                font_size: 13
            }
        }, { trackIcon, addFont });

        expect(addFont).toHaveBeenCalledWith('Material Design Icons', 400, 22);
        expect(addFont).toHaveBeenCalledWith('Roboto', 400, 13);
        expect(trackIcon).toHaveBeenCalledTimes(5);
    });
});
