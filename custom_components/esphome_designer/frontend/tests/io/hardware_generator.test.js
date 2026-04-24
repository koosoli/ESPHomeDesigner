import { describe, expect, it } from 'vitest';

import { generateCustomHardwareYaml } from '../../js/io/hardware_generator.js';

describe('hardware_generator', () => {
    it('disables PSRAM on unsupported chips and emits custom st7789 geometry', () => {
        const yaml = generateCustomHardwareYaml({
            name: 'Pocket Panel',
            chip: 'esp32-c3',
            tech: 'lcd',
            resWidth: 320,
            resHeight: 170,
            shape: 'rect',
            psram: true,
            displayDriver: 'st7789v',
            touchTech: 'none',
            orientation: 'portrait',
            pins: {
                clk: 'GPIO1',
                mosi: 'GPIO2',
                cs: 'GPIO3',
                dc: 'GPIO4',
                rst: 'GPIO5'
            }
        });

        expect(yaml).toContain('#   board: esp32-c3-devkitm-1');
        expect(yaml).not.toContain('# psram: # (Auto-commented)');
        expect(yaml).toContain('model: Custom');
        expect(yaml).toContain('width: 320');
        expect(yaml).toContain('height: 170');
        expect(yaml).toContain('id: my_display');
        expect(yaml).toContain('rotation: 90');
    });

    it('uses the epaper display id for non-lcd hardware and preserves busy pins', () => {
        const yaml = generateCustomHardwareYaml({
            name: 'Paper Board',
            chip: 'esp32-s3',
            tech: 'epaper',
            resWidth: 480,
            resHeight: 800,
            shape: 'rect',
            psram: false,
            displayDriver: 'waveshare_epaper',
            displayModel: '7.50inV2',
            touchTech: 'none',
            pins: {
                clk: 'GPIO1',
                mosi: 'GPIO2',
                cs: 'GPIO3',
                dc: 'GPIO4',
                rst: 'GPIO5',
                busy: 'GPIO6'
            }
        });

        expect(yaml).toContain('id: epaper_display');
        expect(yaml).toContain('model: "7.50inV2"');
        expect(yaml).toContain('busy_pin: GPIO6');
        expect(yaml).not.toContain('display_backlight');
    });

    it('adds touch wake hooks and antiburn scripts for LVGL lcd profiles', () => {
        const yaml = generateCustomHardwareYaml({
            name: 'Desk Panel',
            chip: 'esp32-s3',
            tech: 'lcd',
            resWidth: 800,
            resHeight: 480,
            shape: 'rect',
            psram: true,
            displayDriver: 'ili9xxx',
            touchTech: 'gt911',
            isLvgl: true,
            antiburn: true,
            pins: {
                clk: 'GPIO1',
                mosi: 'GPIO2',
                cs: 'GPIO3',
                dc: 'GPIO4',
                rst: 'GPIO5',
                sda: 'GPIO6',
                scl: 'GPIO7',
                touch_int: 'GPIO8',
                touch_rst: 'GPIO9',
                backlight: 'GPIO10'
            }
        });

        expect(yaml).toContain('touchscreen:');
        expect(yaml).toContain('platform: gt911');
        expect(yaml).toContain('on_release:');
        expect(yaml).toContain('lvgl.resume:');
        expect(yaml).toContain('light.turn_on: display_backlight');
        expect(yaml).toContain('script:');
        expect(yaml).toContain('id: start_antiburn');
        expect(yaml).toContain('show_snow: true');
    });

    it('emits ESP32-P4 board guidance, variant config, and PSRAM tuning', () => {
        const yaml = generateCustomHardwareYaml({
            name: 'Waveshare P4',
            chip: 'esp32-p4',
            tech: 'lcd',
            resWidth: 800,
            resHeight: 480,
            shape: 'rect',
            psram: true,
            displayDriver: 'ili9xxx',
            touchTech: 'none',
            pins: {
                clk: 'GPIO1',
                mosi: 'GPIO2',
                cs: 'GPIO3',
                dc: 'GPIO4'
            }
        });

        expect(yaml).toContain('#         - Select: ESP32-P4');
        expect(yaml).toContain('#         - Board: esp32-p4-evboard');
        expect(yaml).toContain('#         - Framework: esp-idf (Required)');
        expect(yaml).toContain('#   board: esp32-p4-evboard');
        expect(yaml).toContain('#   variant: esp32p4');
        expect(yaml).toContain('#       enable_idf_experimental_features: true');
        expect(yaml).toContain('#   mode: hex');
        expect(yaml).toContain('#   speed: 200MHz');
    });
});
