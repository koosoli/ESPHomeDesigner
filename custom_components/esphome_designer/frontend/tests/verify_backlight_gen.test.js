
import { describe, it, expect } from 'vitest';
import { generateCustomHardwareYaml } from '../js/io/hardware_generator.js';

describe('Hardware Generator - Backlight & Antiburn', () => {
    it('should generate basic backlight config without antiburn', () => {
        const config = {
            name: "Test Device",
            chip: "esp32-s3",
            tech: "lcd",
            resWidth: 800,
            resHeight: 480,
            shape: "rect",
            displayDriver: "st7789v",
            touchTech: "none",
            backlightMinPower: 0.1,
            backlightInitial: 0.5,
            antiburn: false,
            pins: {
                backlight: "GPIO45"
            }
        };

        const yaml = generateCustomHardwareYaml(config);

        // Check Output
        expect(yaml).toContain('output:');
        expect(yaml).toContain('platform: ledc');
        expect(yaml).toContain('pin: GPIO45');
        expect(yaml).toContain('min_power: "0.1"');
        expect(yaml).toContain('zero_means_zero: true');

        // Check Light
        expect(yaml).toContain('light:');
        expect(yaml).toContain('platform: monochromatic');
        expect(yaml).toContain('restore_mode: ALWAYS_ON');
        expect(yaml).toContain('initial_state:');
        expect(yaml).toContain('brightness: "0.5"');

        // Ensure Antiburn is NOT present
        expect(yaml).not.toContain('script.execute: start_antiburn');
        expect(yaml).not.toContain('show_snow: true');
    });

    it('should generate full config with antiburn enabled', () => {
        const config = {
            name: "Test Device",
            chip: "esp32-s3",
            tech: "lcd",
            resWidth: 800,
            resHeight: 480,
            shape: "rect",
            displayDriver: "st7789v",
            touchTech: "none",
            backlightMinPower: 0.07,
            backlightInitial: 0.8,
            antiburn: true,
            pins: {
                backlight: "GPIO45"
            }
        };

        const yaml = generateCustomHardwareYaml(config);

        // Check Light Triggers
        expect(yaml).toContain('on_turn_off:');
        expect(yaml).toContain('- script.execute: start_antiburn');
        expect(yaml).toContain('on_turn_on:');
        expect(yaml).toContain('- script.execute: stop_antiburn');

        // Check Scripts
        expect(yaml).toContain('id: start_antiburn');
        expect(yaml).toContain('id: stop_antiburn');
        expect(yaml).toContain('delay: 5min');

        // Check Switch & LCGL Logic
        expect(yaml).toContain('switch:');
        expect(yaml).toContain('id: switch_antiburn');
        expect(yaml).toContain('lvgl.pause:');
        expect(yaml).toContain('show_snow: true');
    });
});
