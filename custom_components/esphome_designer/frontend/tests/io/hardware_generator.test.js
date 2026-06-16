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

    it('emits MIPI DSI display dimensions without SPI-only control pins', () => {
        const yaml = generateCustomHardwareYaml({
            name: 'Tab Panel',
            chip: 'esp32-p4',
            tech: 'lcd',
            resWidth: 1280,
            resHeight: 720,
            shape: 'rect',
            psram: true,
            displayDriver: 'mipi_dsi',
            displayModel: 'M5STACK-TAB5-V2',
            touchTech: 'st7123',
            pins: {
                clk: 'GPIO1',
                mosi: 'GPIO2',
                cs: 'GPIO3',
                dc: 'GPIO4',
                rst: 'GPIO5'
            }
        });

        expect(yaml).toContain('platform: mipi_dsi');
        expect(yaml).toContain('model: "M5STACK-TAB5-V2"');
        expect(yaml).toContain('dimensions:');
        expect(yaml).toContain('width: 1280');
        expect(yaml).toContain('height: 720');
        expect(yaml).toContain('reset_pin: GPIO5');
        expect(yaml).not.toContain('spi:');
        expect(yaml).not.toContain('cs_pin: GPIO3');
        expect(yaml).not.toContain('dc_pin: GPIO4');
    });

    it('keeps MIPI SPI on the SPI bus and adds offset-aware dimensions', () => {
        const yaml = generateCustomHardwareYaml({
            name: 'Mini Clock',
            chip: 'esp8266',
            tech: 'lcd',
            resWidth: 240,
            resHeight: 240,
            shape: 'rect',
            psram: false,
            displayDriver: 'mipi_spi',
            displayModel: 'ST7789V',
            touchTech: 'none',
            pins: {
                clk: 'GPIO14',
                mosi: 'GPIO13',
                dc: 'GPIO0',
                rst: 'GPIO2',
                backlight: 'GPIO5'
            }
        });

        expect(yaml).toContain('spi:');
        expect(yaml).toContain('clk_pin: GPIO14');
        expect(yaml).toContain('platform: mipi_spi');
        expect(yaml).toContain('model: "ST7789V"');
        expect(yaml).toContain('dimensions:');
        expect(yaml).toContain('offset_height: 0');
        expect(yaml).toContain('offset_width: 0');
        expect(yaml).toContain('dc_pin: GPIO0');
        expect(yaml).toContain('reset_pin: GPIO2');
    });

    it('marks RGB-style panels as requiring panel-specific timing pins', () => {
        const yaml = generateCustomHardwareYaml({
            name: 'RGB Panel',
            chip: 'esp32-s3',
            tech: 'lcd',
            resWidth: 800,
            resHeight: 480,
            shape: 'rect',
            psram: true,
            displayDriver: 'mipi_rgb',
            displayModel: 'ESP32-S3-TOUCH-LCD-7-800X480',
            touchTech: 'gt911',
            pins: {
                rst: 'GPIO3',
                sda: 'GPIO8',
                scl: 'GPIO9'
            }
        });

        expect(yaml).toContain('platform: mipi_rgb');
        expect(yaml).toContain('dimensions:');
        expect(yaml).toContain('width: 800');
        expect(yaml).toContain('height: 480');
        expect(yaml).toContain('panel-specific de_pin');
        expect(yaml).toContain('i2c:');
        expect(yaml).toContain('platform: gt911');
    });

    it('handles parallel RGB platform rpi_dpi_rgb without generating SPI blocks', () => {
        const yaml = generateCustomHardwareYaml({
            name: 'Parallel RGB Panel',
            chip: 'esp32-s3',
            tech: 'lcd',
            resWidth: 800,
            resHeight: 480,
            shape: 'rect',
            psram: true,
            displayDriver: 'rpi_dpi_rgb',
            touchTech: 'none',
            pins: {
                clk: 'GPIO1',
                mosi: 'GPIO2',
                cs: 'GPIO3',
                dc: 'GPIO4',
                rst: 'GPIO5'
            }
        });

        expect(yaml).toContain('platform: rpi_dpi_rgb');
        expect(yaml).toContain('dimensions:');
        expect(yaml).toContain('width: 800');
        expect(yaml).toContain('height: 480');
        expect(yaml).toContain('reset_pin: GPIO5');
        expect(yaml).toContain('panel-specific de_pin');
        expect(yaml).not.toContain('spi:');
        expect(yaml).not.toContain('cs_pin: GPIO3');
        expect(yaml).not.toContain('dc_pin: GPIO4');
    });
});
