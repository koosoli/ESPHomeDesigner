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
});
