import { describe, it, expect } from 'vitest';
import { generateDisplaySection } from '../../js/io/hardware_generators.js';

describe('generateDisplaySection – display ID invariant (#330)', () => {
    it('injects id: my_display when display_config lacks id (LCD)', () => {
        const profile = {
            features: { lcd: true },
            display_config: [
                '  - platform: ili9xxx',
                '    model: ST7789V',
                '    cs_pin: GPIO10'
            ],
            resolution: { width: 320, height: 240 }
        };
        const lines = generateDisplaySection(profile, {});
        const joined = lines.join('\n');
        expect(joined).toContain('id: my_display');
    });

    it('injects id: epaper_display when display_config lacks id (e-paper)', () => {
        const profile = {
            features: { epaper: true },
            display_config: [
                '  - platform: waveshare_epaper',
                '    model: "7.50inv2p"',
                '    cs_pin: GPIO10'
            ],
            resolution: { width: 800, height: 480 }
        };
        const lines = generateDisplaySection(profile, {});
        const joined = lines.join('\n');
        expect(joined).toContain('id: epaper_display');
        expect(joined).not.toContain('id: my_display');
    });

    it('does NOT duplicate id when display_config already has one', () => {
        const profile = {
            features: { lcd: true },
            display_config: [
                '  - platform: ili9xxx',
                '    id: my_custom_display',
                '    model: ST7789V'
            ],
            resolution: { width: 320, height: 240 }
        };
        const lines = generateDisplaySection(profile, {});
        const idLines = lines.filter(l => l.trim().startsWith('id:'));
        expect(idLines).toHaveLength(1);
        expect(idLines[0]).toContain('my_custom_display');
    });

    it('standard profile (no display_config) always has id', () => {
        const profile = {
            displayPlatform: 'waveshare_epaper',
            displayModel: '7.50inv2p',
            features: { epaper: true },
            pins: {
                display: { cs: 'GPIO10', dc: 'GPIO11', reset: 'GPIO12', busy: 'GPIO13' }
            },
            resolution: { width: 800, height: 480 }
        };
        const lines = generateDisplaySection(profile, {});
        const joined = lines.join('\n');
        expect(joined).toContain('id: epaper_display');
    });
});
