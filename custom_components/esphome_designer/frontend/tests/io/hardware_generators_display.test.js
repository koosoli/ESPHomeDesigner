import { describe, expect, it } from 'vitest';

import {
    generateTouchscreenSection,
    generateBacklightSection,
    generateExtraComponents,
    generateI2CSection,
    generateSPISection,
    generatePSRAMSection,
    generateAXP2101Section,
    generateOutputSection,
    generateRTTTLSection,
    generateAudioSection
} from '../../js/io/hardware_generators_display.js';

describe('hardware_generators_display', () => {
    it('generates a touchscreen section with transform, calibration, and LVGL resume hooks', () => {
        const lines = generateTouchscreenSection({
            touch: {
                platform: 'gt911',
                i2c_id: 'bus_a',
                address: '0x5D',
                update_interval: '50ms',
                interrupt_pin: 'GPIO4',
                reset_pin: { number: 'GPIO5', inverted: true },
                cs_pin: 'GPIO6',
                transform: {
                    swap_xy: true,
                    mirror_x: true
                },
                calibration: {
                    x_min: 0,
                    x_max: 480
                }
            }
        }, 'screen_main', 0, { lcdEcoStrategy: 'dim_after_timeout' }, true);

        expect(lines).toContain('touchscreen:');
        expect(lines).toContain('    display: screen_main');
        expect(lines).toContain('      swap_xy: true');
        expect(lines).toContain('      mirror_x: true');
        expect(lines).toContain('    on_release:');
        expect(lines).toContain('      x_max: 480');
    });

    it('generates switch-backed and PWM-backed backlight sections', () => {
        const switchLines = generateBacklightSection({
            backlight: {
                platform: 'switch',
                pin: {
                    number: 'GPIO7',
                    mode: {
                        output: true
                    }
                }
            }
        });

        expect(switchLines).toContain('switch:');
        expect(switchLines).toContain('    output: fake_backlight_output');
        expect(switchLines).toContain('            - switch.turn_on: lcdbacklight');

        const pwmLines = generateBacklightSection({
            backlight: {
                platform: 'ledc',
                pin: 'GPIO8',
                frequency: '1200Hz'
            }
        });

        expect(pwmLines).toContain('output:');
        expect(pwmLines).toContain('    frequency: 1200Hz');
        expect(pwmLines).toContain('    output: gpio_backlight_pwm');
    });

    it('generates extra component, I2C, and SPI sections from profile metadata', () => {
        const extra = generateExtraComponents({
            external_components: ['  - source: github://custom/components'],
            extra_components: ['display_buffer:'],
            extra_components_raw: 'esphome:\n  on_boot: []'
        });
        expect(extra).toContain('external_components:');
        expect(extra).toContain('display_buffer:');
        expect(extra).toContain('esphome:\n  on_boot: []');

        const i2c = generateI2CSection({
            pins: {
                i2c: {
                    sda: 'GPIO1',
                    scl: 'GPIO2'
                }
            },
            i2c_config: {
                frequency: '400kHz'
            }
        });
        expect(i2c).toContain('  - sda: GPIO1');
        expect(i2c).toContain('    frequency: 400kHz');

        const spi = generateSPISection({
            pins: {
                spi: {
                    id: 'spi_bus_a',
                    clk: 'GPIO10',
                    mosi: 'GPIO11',
                    miso: 'GPIO12',
                    type: 'quad',
                    data_pins: ['GPIO13', 'GPIO14', 'GPIO15']
                }
            },
            extra_spi: ['spi_device:']
        });

        expect(spi).toContain('  - id: spi_bus_a');
        expect(spi).toContain('    interface: triple');
        expect(spi).toContain('    data_pins: [GPIO13, GPIO14, GPIO15]');
        expect(spi).toContain('spi_device:');
    });

    it('generates PSRAM, AXP2101, output, RTTTL, and audio sections when supported', () => {
        expect(generatePSRAMSection({
            chip: 'esp32-s3',
            features: { psram: true },
            psram_mode: 'octal',
            psram_speed: '120MHz'
        })).toEqual(['psram:', '  mode: octal', '  speed: 120MHz', '']);

        expect(generatePSRAMSection({
            chip: 'esp32-c3',
            features: { psram: true }
        })).toEqual([]);

        const axp = generateAXP2101Section({
            features: {
                axp2101: true
            }
        });
        expect(axp).toContain('axp2101:');
        expect(axp).toContain('    - switch.turn_on: aldo3  # Backlight/Logic');

        const output = generateOutputSection({
            pins: {
                batteryEnable: { number: 'GPIO3', ignore_strapping_warning: true, inverted: false },
                battery_power_pin: 'GPIO5',
                buzzer: 'GPIO9'
            },
            m5paper: {
                main_power_pin: 'GPIO4'
            }
        });
        expect(output).toContain('    id: bsp_battery_enable');
        expect(output).toContain('    id: main_power');
        expect(output).toContain('    id: battery_power');
        expect(output).toContain('    id: buzzer_output');

        expect(generateRTTTLSection({ features: { buzzer: true } })).toContain('rtttl:');

        const audio = generateAudioSection({
            audio: {
                i2s_audio: {
                    i2s_lrclk_pin: 'GPIO41',
                    i2s_bclk_pin: 'GPIO42',
                    i2s_mclk_pin: 'GPIO40'
                },
                speaker: {
                    platform: 'i2s_audio',
                    dac_type: 'external',
                    i2s_dout_pin: 'GPIO39',
                    mode: 'mono'
                }
            }
        });
        expect(audio).toContain('i2s_audio:');
        expect(audio).toContain('speaker:');
        expect(audio).toContain('    mode: mono');
    });
});
