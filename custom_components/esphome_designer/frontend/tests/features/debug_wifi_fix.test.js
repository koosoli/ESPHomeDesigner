
import { describe, it, expect, vi } from 'vitest';
import WifiSignalPlugin from '../../features/wifi_signal/plugin.js';

describe('Wifi Signal Fix Verification', () => {
    it('should generate centered coordinates explicitly', () => {
        const widget = {
            id: 'test_wifi',
            type: 'wifi_signal',
            x: 60,
            y: 160,
            width: 120,
            height: 40,
            entity_id: 'sensor.wifi_signal',
            props: {
                size: 24,
                font_size: 12,
                color: 'black',
                show_dbm: true
            }
        };

        const lines = [];
        const context = {
            lines,
            addFont: (name, w, s) => `font_${name.replace(/\s+/g, '_')}_${s}`,
            getColorConst: (c) => `Color::${c.toUpperCase()}`,
            addDitherMask: () => { },
            getCondProps: () => '',
            getConditionCheck: () => null,
            isEpaper: false
        };

        console.log("--- GENERATING WIFI SIGNAL CODE ---");
        WifiSignalPlugin.export(widget, context);
        console.log(lines.join('\n'));
        console.log("-----------------------------------");

        const output = lines.join('\n');

        // assertions to be sure
        expect(output).toContain('60 + 120 / 2'); // Center X calculation
        expect(output).toContain('TextAlign::TOP_CENTER');
    });
});
