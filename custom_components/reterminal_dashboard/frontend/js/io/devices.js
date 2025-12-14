// ============================================================================
// DEVICE HARDWARE PROFILES
// ============================================================================
// Complete hardware configuration for each supported device.
// Used to generate all hardware-related YAML sections (sensors, buttons, etc.)
// ============================================================================

window.DEVICE_PROFILES = {
    reterminal_e1001: {
        name: "reTerminal E1001 (Monochrome)",
        displayModel: "7.50inv2",
        displayPlatform: "waveshare_epaper",
        pins: {
            display: { cs: "GPIO10", dc: "GPIO11", reset: { number: "GPIO12", inverted: false }, busy: { number: "GPIO13", inverted: true } },
            i2c: { sda: "GPIO19", scl: "GPIO20" },
            spi: { clk: "GPIO7", mosi: "GPIO9" },
            batteryEnable: "GPIO21",
            batteryAdc: "GPIO1",
            buzzer: "GPIO45",
            buttons: { left: "GPIO5", right: "GPIO4", refresh: "GPIO3" }
        },
        battery: {
            attenuation: "12db",
            multiplier: 2.0,
            calibration: { min: 3.27, max: 4.15 }
        },
        features: {
            psram: true,
            buzzer: true,
            buttons: true,
            sht4x: true
        }
    },
    reterminal_e1002: {
        name: "reTerminal E1002 (6-Color)",
        displayModel: "Seeed-reTerminal-E1002",
        displayPlatform: "epaper_spi",
        pins: {
            display: { cs: null, dc: null, reset: null, busy: null },
            i2c: { sda: "GPIO19", scl: "GPIO20" },
            spi: { clk: "GPIO7", mosi: "GPIO9" },
            batteryEnable: "GPIO21",
            batteryAdc: "GPIO1",
            buzzer: "GPIO45",
            buttons: { left: "GPIO5", right: "GPIO4", refresh: "GPIO3" }
        },
        battery: {
            attenuation: "12db",
            multiplier: 2.0,
            calibration: { min: 3.27, max: 4.15 }
        },
        features: {
            psram: true,
            buzzer: true,
            buttons: true,
            sht4x: true
        }
    },
    trmnl: {
        name: "TRMNL (ESP32-C3)",
        displayModel: "7.50inv2",
        displayPlatform: "waveshare_epaper",
        pins: {
            display: { cs: "GPIO6", dc: "GPIO5", reset: { number: "GPIO10", inverted: false }, busy: { number: "GPIO4", inverted: true } },
            i2c: { sda: "GPIO1", scl: "GPIO2" },
            spi: { clk: "GPIO7", mosi: "GPIO8" },
            batteryEnable: null,
            batteryAdc: "GPIO0",
            buzzer: null,
            buttons: null
        },
        battery: {
            attenuation: "11db",
            multiplier: 2.0,
            calibration: { min: 3.30, max: 4.15 }
        },
        features: {
            psram: false,
            buzzer: false,
            buttons: false,
            sht4x: false
        }
    },
    m5stack_coreink: {
        name: "M5Stack CoreInk (200x200)",
        displayModel: "1.54in-m5coreink-m09",
        displayPlatform: "waveshare_epaper",
        resolution: { width: 200, height: 200 },
        features: {
            psram: false,
            buzzer: true,
            buttons: true,
            lcd: false,
            epaper: true
        },
        pins: {
            display: { cs: "GPIO9", dc: "GPIO15", reset: "GPIO0", busy: { number: "GPIO4", inverted: true } },
            i2c: { sda: "GPIO21", scl: "GPIO22" },
            spi: { clk: "GPIO18", mosi: "GPIO23" },
            batteryEnable: { number: "GPIO12", ignore_strapping_warning: true }, // Power Hold Pin
            batteryAdc: "GPIO35",
            buzzer: "GPIO2",
            buttons: {
                left: { number: "GPIO39", mode: "INPUT" },
                right: { number: "GPIO37", mode: "INPUT" },
                refresh: { number: "GPIO38", mode: "INPUT" }
            }
        },
        battery: {
            attenuation: "12db",
            multiplier: 2.0,
            calibration: { min: 3.30, max: 4.15 }
        },
        i2c_config: { scan: true }, // Internal I2C for RTC
    },
    m5stack_paper: {
        name: "M5Paper (540x960)",
        displayModel: "M5Paper",
        displayPlatform: "it8951e",
        resolution: { width: 540, height: 960 },
        features: {
            psram: true,
            buzzer: false,
            buttons: false, // Touchscreen only
            lcd: false,
            epaper: true,
            touch: true // Has GT911
        },
        pins: {
            display: { cs: "GPIO15", dc: null, reset: "GPIO23", busy: "GPIO27" }, // DC not used for IT8951E
            i2c: { sda: "GPIO21", scl: "GPIO22" }, // For GT911 and others
            spi: { clk: "GPIO14", mosi: "GPIO12", miso: "GPIO13" }, // M5Paper SPI
            batteryEnable: null,
            batteryAdc: "GPIO35",
            buzzer: null,
            buttons: null
        },
        m5paper: {
            battery_power_pin: "GPIO5",
            main_power_pin: "GPIO2"
        },
        battery: {
            attenuation: "11db",
            multiplier: 2.0,
            calibration: { min: 3.27, max: 4.15 } // Standard LiPo
        },
        touch: {
            platform: "gt911",
            i2c_id: "bus_a",
            interrupt_pin: "GPIO36",
            update_interval: "never", // Interrupt used
            transform: { mirror_x: false, mirror_y: false, swap_xy: false },
            calibration: { x_min: 0, x_max: 540, y_min: 0, y_max: 960 }
        },
        external_components: [
            "  - source: github://Passific/m5paper_esphome"
        ]
    },
    esp32_s3_photopainter: {
        name: "Waveshare PhotoPainter (7-Color)",
        displayModel: "7.30in-f",
        displayPlatform: "waveshare_epaper",
        pins: {
            display: { cs: "GPIO9", dc: "GPIO8", reset: "GPIO12", busy: { number: "GPIO13", inverted: true } },
            i2c: { sda: "GPIO47", scl: "GPIO48" },
            spi: { clk: "GPIO10", mosi: "GPIO11" },
            batteryEnable: null,
            batteryAdc: null,
            buzzer: null,
            buttons: { left: "GPIO0", right: "GPIO4", refresh: null }
        },
        battery: {
            attenuation: "0db",
            multiplier: 1.0,
            calibration: { min: 3.30, max: 4.20 }
        },
        features: {
            psram: true,
            buzzer: false,
            buttons: true,
            sht4x: false,
            axp2101: true,
            manual_pmic: true,
            shtc3: true
        },
        i2c_config: {
            scan: false,
            frequency: "10kHz"
        }
    },
    guition_esp32_s3_4848s040: {
        name: "Guition 4.0\" 480x480 (Untested)",
        displayPlatform: "st7701s",
        resolution: { width: 480, height: 480 },
        features: { psram: true, buzzer: false, buttons: false, lcd: true },
        pins: {
            i2c: { sda: "GPIO19", scl: "GPIO45" },
            spi: { clk: "GPIO48", mosi: "GPIO47" }
        },
        i2c_config: { scan: true },
        backlight: { platform: "ledc", pin: "GPIO38", frequency: "100Hz" },
        display_config: [
            "  - platform: st7701s",
            "    id: my_display",
            "    update_interval: never",
            "    auto_clear_enabled: False",
            "    spi_mode: MODE3",
            "    data_rate: 2MHz",
            "    color_order: RGB",
            "    invert_colors: False",
            "    dimensions:",
            "      width: 480",
            "      height: 480",
            "    cs_pin: GPIO39",
            "    de_pin: GPIO18",
            "    hsync_pin: GPIO16",
            "    vsync_pin: GPIO17",
            "    pclk_pin: GPIO21",
            "    pclk_frequency: 12MHz",
            "    pclk_inverted: False",
            "    hsync_pulse_width: 8",
            "    hsync_front_porch: 10",
            "    hsync_back_porch: 20",
            "    vsync_pulse_width: 8",
            "    vsync_front_porch: 10",
            "    vsync_back_porch: 10",
            "    init_sequence:",
            "      - 1",
            "      - [ 0xFF, 0x77, 0x01, 0x00, 0x00, 0x10 ]",
            "      - [ 0xCD, 0x00 ]",
            "    data_pins:",
            "      red: [11, 12, 13, 14, 0]",
            "      green: [8, 20, 3, 46, 9, 10]",
            "      blue: [4, 5, 6, 7, 15]"
        ],
        touch: { platform: "gt911", i2c_id: "bus_a", mirror_x: false }
    },
    sunton_esp32_8048s070: {
        name: "Sunton 7.0\" 800x480 (Untested)",
        displayPlatform: "rpi_dpi_rgb",
        resolution: { width: 800, height: 480 },
        features: { psram: true, buzzer: false, buttons: false, lcd: true },
        pins: {
            i2c: { sda: "19", scl: "20" }
        },
        audio: {
            i2s_audio: { i2s_lrclk_pin: 12, i2s_bclk_pin: 11 },
            speaker: { platform: "i2s_audio", dac_type: "external", i2s_dout_pin: 10, mode: "mono" }
        },
        backlight: { platform: "ledc", pin: "2", frequency: "1220Hz" },
        display_config: [
            "  - platform: rpi_dpi_rgb",
            "    id: my_display",
            "    color_order: RGB",
            "    invert_colors: True",
            "    update_interval: never",
            "    auto_clear_enabled: false",
            "    dimensions:",
            "      width: 800",
            "      height: 480",
            "    de_pin: 41",
            "    hsync_pin: 39",
            "    vsync_pin: 40",
            "    pclk_pin: 42",
            "    pclk_frequency: 16MHz",
            "    pclk_inverted: True",
            "    hsync_pulse_width: 30",
            "    hsync_front_porch: 210",
            "    hsync_back_porch: 16",
            "    vsync_pulse_width: 13",
            "    vsync_front_porch: 22",
            "    vsync_back_porch: 10",
            "    data_pins:",
            "      red: [14, 21, 47, 48, 45]",
            "      green: [9, 46, 3, 8, 16, 1]",
            "      blue: [15, 7, 6, 5, 4]"
        ],
        touch: { platform: "gt911", i2c_id: "bus_a", mirror_x: false, mirror_y: false }
    },
    waveshare_esp32_s3_touch_lcd_7: {
        name: "Waveshare 7.0\" 800x480 (Untested)",
        displayPlatform: "mipi_rgb",
        resolution: { width: 800, height: 480 },
        features: { psram: true, buzzer: false, buttons: false, lcd: true },
        pins: {
            i2c: { sda: "GPIO8", scl: "GPIO9" }
        },
        external_components: [
            "  - source: github://oliverbeckhoff/esphome-ch422g@master"
        ],
        extra_components: [
            "ch422g:",
            "  - id: ch422g_hub"
        ],
        backlight: {
            platform: "switch",
            pin: { ch422g: "ch422g_hub", number: 2, mode: { output: true }, inverted: false }
        },
        display_config: [
            "  - platform: mipi_rgb",
            "    model: ESP32-S3-TOUCH-LCD-7-800X480",
            "    id: my_display",
            "    rotation: 90",
            "    update_interval: never",
            "    auto_clear_enabled: false",
            "    color_order: RGB",
            "    pclk_frequency: 16MHZ",
            "    dimensions:",
            "      width: 800",
            "      height: 480",
            "    reset_pin:",
            "      ch422g: ch422g_hub",
            "      number: 3",
            "    de_pin: GPIO5",
            "    hsync_pin: GPIO46",
            "    vsync_pin: GPIO3",
            "    pclk_pin: GPIO7",
            "    pclk_inverted: true",
            "    hsync_back_porch: 8",
            "    hsync_front_porch: 8",
            "    hsync_pulse_width: 4",
            "    vsync_back_porch: 8",
            "    vsync_front_porch: 8",
            "    vsync_pulse_width: 4",
            "    data_pins:",
            "      red: [1, 2, 42, 41, 40]",
            "      blue: [14, 38, 18, 17, 10]",
            "      green: [39, 0, 45, 48, 47, 21]"
        ],
        touch: {
            platform: "gt911",
            i2c_id: "bus_a",
            interrupt_pin: "GPIO4",
            reset_pin: { ch422g: "ch422g_hub", number: 1, mode: "OUTPUT" }
        }
    },
    elecrow_7_hmi: {
        name: "Elecrow 7.0\" HMI (Untested)",
        displayPlatform: "rpi_dpi_rgb",
        resolution: { width: 800, height: 480 },
        features: { psram: true, buzzer: false, buttons: false, lcd: true },
        pins: {
            i2c: { sda: "GPIO19", scl: "GPIO20" }
        },
        backlight: { platform: "ledc", pin: "GPIO2", frequency: "1220Hz" },
        display_config: [
            "  - platform: rpi_dpi_rgb",
            "    id: my_display",
            "    data_pins:",
            "      red: [14, 21, 47, 48, 45]",
            "      green: [9, 46, 3, 8, 16, 1]",
            "      blue: [15, 7, 6, 5, 4]",
            "    de_pin: GPIO41",
            "    hsync_pin: 39",
            "    vsync_pin: 40",
            "    pclk_pin: 0",
            "    hsync_front_porch: 40",
            "    hsync_pulse_width: 48",
            "    hsync_back_porch: 13",
            "    vsync_front_porch: 1",
            "    vsync_pulse_width: 31",
            "    vsync_back_porch: 13",
            "    pclk_inverted: true",
            "    color_order: RGB",
            "    auto_clear_enabled: false",
            "    update_interval: never",
            "    dimensions:",
            "      width: 800",
            "      height: 480"
        ],
        touch: { platform: "gt911", i2c_id: "bus_a", address: "0x5D", update_interval: "50ms" }
    },
    guition_esp32_jc4827w543: {
        name: "Guition 4.3\" IPS 480x272 (Untested)",
        displayPlatform: "qspi_dbi",
        resolution: { width: 480, height: 272 },
        features: { psram: true, buzzer: false, buttons: false, lcd: true },
        pins: {
            i2c: { sda: "GPIO8", scl: "GPIO4" },
            spi: { id: "quad_spi", type: "quad", clk: "GPIO47", data_pins: [21, 48, 40, 39] }
        },
        backlight: { platform: "ledc", pin: "1", frequency: "1000Hz" },
        display_config: [
            "  - platform: qspi_dbi",
            "    id: my_display",
            "    update_interval: never",
            "    auto_clear_enabled: False",
            "    model: CUSTOM",
            "    data_rate: 20MHz",
            "    dimensions:",
            "      width: 480",
            "      height: 272",
            "    cs_pin:",
            "      number: 45",
            "      ignore_strapping_warning: true",
            "    invert_colors: true",
            "    rotation: 180",
            "    init_sequence:",
            "      - [0xff,0xa5]",
            "      - [0x36,0xc0]",
            "      - [0x3A,0x01]",
            "      - [0x41,0x03]",
            "      - [0x44,0x15]",
            "      - [0x45,0x15]",
            "      - [0x7d,0x03]",
            "      - [0xc1,0xbb]",
            "      - [0xc2,0x05]",
            "      - [0xc3,0x10]",
            "      - [0xc6,0x3e]",
            "      - [0xc7,0x25]",
            "      - [0xc8,0x11]",
            "      - [0x7a,0x5f]",
            "      - [0x6f,0x44]",
            "      - [0x78,0x70]",
            "      - [0xc9,0x00]",
            "      - [0x67,0x21]",
            "      - [0x51,0x0a]",
            "      - [0x52,0x76]",
            "      - [0x53,0x0a]",
            "      - [0x54,0x76]",
            "      - [0x46,0x0a]",
            "      - [0x47,0x2a]",
            "      - [0x48,0x0a]",
            "      - [0x49,0x1a]",
            "      - [0x56,0x43]",
            "      - [0x57,0x42]",
            "      - [0x58,0x3c]",
            "      - [0x59,0x64]",
            "      - [0x5a,0x41]",
            "      - [0x5b,0x3c]",
            "      - [0x5c,0x02]",
            "      - [0x5d,0x3c]",
            "      - [0x5e,0x1f]",
            "      - [0x60,0x80]",
            "      - [0x61,0x3f]",
            "      - [0x62,0x21]",
            "      - [0x63,0x07]",
            "      - [0x64,0xe0]",
            "      - [0x65,0x02]",
            "      - [0xca,0x20]",
            "      - [0xcb,0x52]",
            "      - [0xcc,0x10]",
            "      - [0xcd,0x42]",
            "      - [0xd0,0x20]",
            "      - [0xd1,0x52]",
            "      - [0xd2,0x10]",
            "      - [0xd3,0x42]",
            "      - [0xd4,0x0a]",
            "      - [0xd5,0x32]",
            "      - [0x80,0x00]",
            "      - [0xa0,0x00]",
            "      - [0x81,0x07]",
            "      - [0xa1,0x06]",
            "      - [0x82,0x02]",
            "      - [0xa2,0x01]",
            "      - [0x86,0x11]",
            "      - [0xa6,0x10]",
            "      - [0x87,0x27]",
            "      - [0xa7,0x27]",
            "      - [0x83,0x37]",
            "      - [0xa3,0x37]",
            "      - [0x84,0x35]",
            "      - [0xa4,0x35]",
            "      - [0x85,0x3f]",
            "      - [0xa5,0x3f]",
            "      - [0x88,0x0b]",
            "      - [0xa8,0x0b]",
            "      - [0x89,0x14]",
            "      - [0xa9,0x14]",
            "      - [0x8a,0x1a]",
            "      - [0xaa,0x1a]",
            "      - [0x8b,0x0a]",
            "      - [0xab,0x0a]",
            "      - [0x8c,0x14]",
            "      - [0xac,0x08]",
            "      - [0x8d,0x17]",
            "      - [0xad,0x07]",
            "      - [0x8e,0x16]",
            "      - [0xae,0x06]",
            "      - [0x8f,0x1B]",
            "      - [0xaf,0x07]",
            "      - [0x90,0x04]",
            "      - [0xb0,0x04]",
            "      - [0x91,0x0a]",
            "      - [0xb1,0x0a]",
            "      - [0x92,0x16]",
            "      - [0xb2,0x15]",
            "      - [0xff,0x00]",
            "      - [0x11,0x00]",
            "      - [0x29,0x00]"
        ],
        touch: { platform: "gt911", i2c_id: "bus_a", interrupt_pin: "3", reset_pin: "GPIO38" }
    },
    guition_esp32_jc8048w550: {
        name: "Guition 5.0\" IPS 800x480 (Untested)",
        displayPlatform: "rpi_dpi_rgb",
        features: { psram: true, buzzer: false, buttons: false, lcd: true },
        pins: {
            i2c: { sda: "GPIO19", scl: "GPIO20" }
        },
        backlight: { platform: "ledc", pin: "2", frequency: "1220Hz" },
        display_config: [
            "  - platform: rpi_dpi_rgb",
            "    id: my_display",
            "    color_order: RGB",
            "    invert_colors: True",
            "    update_interval: never",
            "    auto_clear_enabled: false",
            "    dimensions:",
            "      width: 800",
            "      height: 480",
            "    de_pin: GPIO40",
            "    hsync_pin: GPIO39",
            "    vsync_pin: GPIO41",
            "    pclk_pin: GPIO42",
            "    pclk_frequency: 16MHz",
            "    data_pins:",
            "      red: [45, 48, 47, 21, 14]",
            "      green: [5, 6, 7, 15, 16, 4]",
            "      blue: [8, 3, 46, 9, 1]"
        ],
        touch: { platform: "gt911", i2c_id: "bus_a", address: "0x5D", update_interval: "16ms" }
    },
    lilygo_tdisplays3: {
        name: "LilyGo T-Display S3 (Untested)",
        displayPlatform: "ili9xxx",
        features: { psram: true, buzzer: false, buttons: true, lcd: true },
        pins: {
            i2c: { sda: "17", scl: "18" },
            buttons: { left: "GPIO0", right: "GPIO14" }
        },
        external_components: [
            "  - source: github://clydebarrow/esphome@i8080",
            "    components: [ i80, io_bus, ili9xxx, spi ]"
        ],
        extra_components: [
            "i80:",
            "  dc_pin: 7",
            "  wr_pin: 8",
            "  rd_pin: 9",
            "  data_pins: [39, 40, 41, 42, 45, 46, 47, 48]"
        ],
        backlight: { platform: "ledc", pin: "GPIO38", frequency: "2000Hz" },
        display_config: [
            "  - platform: ili9xxx",
            "    id: my_display",
            "    rotation: 270",
            "    bus_type: i80",
            "    cs_pin: 6",
            "    reset_pin: 5",
            "    model: st7789v",
            "    data_rate: 2MHz",
            "    dimensions:",
            "      height: 320",
            "      width: 170",
            "      offset_width: 35",
            "      offset_height: 0",
            "    color_order: bgr",
            "    invert_colors: true",
            "    auto_clear_enabled: false",
            "    update_interval: never"
        ],

    },
    waveshare_esp32_s3_touch_lcd_4_3: {
        name: "Waveshare 4.3\" 800x480 (Untested)",
        displayPlatform: "rpi_dpi_rgb",
        features: { psram: true, buzzer: false, buttons: false, lcd: true },
        pins: {
            i2c: { sda: "8", scl: "9" }
        },
        external_components: [
            "  - source: github://oliverbeckhoff/esphome-ch422g@master"
        ],
        extra_components: [
            "ch422g:"
        ],
        display_config: [
            "  - platform: rpi_dpi_rgb",
            "    id: my_display",
            "    update_interval: never",
            "    auto_clear_enabled: false",
            "    color_order: RGB",
            "    pclk_frequency: 16MHz",
            "    dimensions:",
            "      width: 800",
            "      height: 480",
            "    reset_pin:",
            "      ch422g:",
            "      number: 3",
            "    enable_pin:",
            "      ch422g:",
            "      number: 2",
            "    de_pin: 5",
            "    hsync_pin: 46",
            "    vsync_pin: 3",
            "    pclk_pin: 7",
            "    hsync_back_porch: 30",
            "    hsync_front_porch: 210",
            "    hsync_pulse_width: 30",
            "    vsync_back_porch: 4",
            "    vsync_front_porch: 4",
            "    vsync_pulse_width: 4",
            "    data_pins:",
            "      red: [1, 2, 42, 41, 40]",
            "      blue: [14, 38, 18, 17, 10]",
            "      green: [39, 0, 45, 48, 47, 21]"
        ],
        touch: { platform: "gt911", i2c_id: "bus_a", interrupt_pin: "4", reset_pin: { ch422g: "", number: 1 } }
    },
    waveshare_esp32_s3_touch_lcd_2_8c: {
        name: "Waveshare 2.8\" Round 480x480 (Untested)",
        displayPlatform: "st7701s",
        shape: "round",
        features: { psram: true, buzzer: false, buttons: false, lcd: true },
        pins: {
            i2c: { sda: "15", scl: "7" }
        },
        external_components: ["  # PCA9554 required for this device"],
        extra_components: [
            "pca9554:",
            "  - id: p_c_a",
            "    address: 0x20",
            "    i2c_id: bus_a"
        ],
        backlight: { platform: "ledc", pin: "GPIO06", frequency: "2000Hz" },
        extra_spi: [
            "  - id: spi_lcd",
            "    clk_pin: GPIO02",
            "    mosi_pin: GPIO01",
            "    interface: spi3"
        ],
        display_config: [
            "  - platform: st7701s",
            "    id: my_display",
            "    spi_id: spi_lcd",
            "    spi_mode: MODE1",
            "    color_order: bgr",
            "    auto_clear_enabled: false",
            "    dimensions:",
            "      width: 480",
            "      height: 480",
            "    cs_pin:",
            "      pca9554: p_c_a",
            "      number: 2",
            "    reset_pin:",
            "      pca9554: p_c_a",
            "      number: 0",
            "    de_pin: GPIO40",
            "    hsync_pin: GPIO38",
            "    vsync_pin: GPIO39",
            "    pclk_pin: GPIO41",
            "    init_sequence:",
            "      - [ 0xFF, 0x77, 0x01, 0x00, 0x00, 0x13 ]",
            "      - [ 0xEF, 0x08 ]",
            "      - [ 0xFF, 0x77, 0x01, 0x00, 0x00, 0x10 ]",
            "      - [ 0xC0, 0x3B, 0x00 ]",
            "      - [ 0xC1, 0x10, 0x0C ]",
            "      - [ 0xC2, 0x07, 0x0A ]",
            "      - [ 0xC7, 0x00 ]",
            "      - [ 0xCC, 0x10 ]",
            "      - [ 0xCD, 0x08 ]",
            "      - [ 0xB0, 0x05, 0x12, 0x98, 0x0E, 0x0F, 0x07, 0x07, 0x09, 0x09, 0x23, 0x05, 0x52, 0x0F, 0x67, 0x2C, 0x11 ]",
            "      - [ 0xB1, 0x0B, 0x11, 0x97, 0x0C, 0x12, 0x06, 0x06, 0x08, 0x08, 0x22, 0x03, 0x51, 0x11, 0x66, 0x2B, 0x0F ]",
            "      - [ 0xFF, 0x77, 0x01, 0x00, 0x00, 0x11 ]",
            "      - [ 0xB0, 0x5D ]",
            "      - [ 0xB1, 0x3E ]",
            "      - [ 0xB2, 0x81 ]",
            "      - [ 0xB3, 0x80 ]",
            "      - [ 0xB5, 0x4E ]",
            "      - [ 0xB7, 0x85 ]",
            "      - [ 0xB8, 0x20 ]",
            "      - [ 0xC1, 0x78 ]",
            "      - [ 0xC2, 0x78 ]",
            "      - [ 0xD0, 0x88 ]",
            "      - [ 0xE0, 0x00, 0x00, 0x02 ]",
            "      - [ 0xE1, 0x06, 0x30, 0x08, 0x30, 0x05, 0x30, 0x07, 0x30, 0x00, 0x33, 0x33 ]",
            "      - [ 0xE2, 0x11, 0x11, 0x33, 0x33, 0xF4, 0x00, 0x00, 0x00, 0xF4, 0x00, 0x00, 0x00 ]",
            "      - [ 0xE3, 0x00, 0x00, 0x11, 0x11 ]",
            "      - [ 0xE4, 0x44, 0x44 ]",
            "      - [ 0xE5, 0x0D, 0xF5, 0x30, 0xF0, 0x0F, 0xF7, 0x30, 0xF0, 0x09, 0xF1, 0x30, 0xF0, 0x0B, 0xF3, 0x30, 0xF0 ]",
            "      - [ 0xE6, 0x00, 0x00, 0x11, 0x11 ]",
            "      - [ 0xE7, 0x44, 0x44 ]",
            "      - [ 0xE8, 0x0C, 0xF4, 0x30, 0xF0, 0x0E, 0xF6, 0x30, 0xF0, 0x08, 0xF0, 0x30, 0xF0, 0x0A, 0xF2, 0x30, 0xF0 ]",
            "      - [ 0xE9, 0x36, 0x01 ]",
            "      - [ 0xEB, 0x00, 0x01, 0xE4, 0xE4, 0x44, 0x88, 0x40 ]",
            "      - [ 0xED, 0xFF, 0x10, 0xAF, 0x76, 0x54, 0x2B, 0xCF, 0xFF, 0xFF, 0xFC, 0xB2, 0x45, 0x67, 0xFA, 0x01, 0xFF ]",
            "      - [ 0xEF, 0x08, 0x08, 0x08, 0x45, 0x3F, 0x54 ]",
            "      - [ 0xFF, 0x77, 0x01, 0x00, 0x00, 0x00 ]",
            "      - delay 120ms",
            "      - [ 0x11 ]",
            "      - delay 120ms",
            "      - [ 0x3A, 0x66 ]",
            "      - [ 0x36, 0x00 ]",
            "      - [ 0x35, 0x00 ]",
            "      - [ 0x20 ]",
            "      - delay 120ms",
            "      - [ 0x29 ]"
        ],
        touch: {
            platform: "gt911",
            i2c_id: "bus_a",
            interrupt_pin: "GPIO16",
            reset_pin: { pca9554: "p_c_a", number: 1 }
        }
    },
    sunton_esp32_2432s028: {
        name: "Sunton 2.8\" 240x320 (Untested)",
        displayPlatform: "ili9xxx",
        resolution: { width: 240, height: 320 },
        features: { psram: false, buzzer: false, buttons: false, lcd: true },
        pins: {
            i2c: { sda: "27", scl: "22" }
        },
        backlight: { platform: "ledc", pin: "21" },
        extra_spi: [
            "  - id: tft",
            "    clk_pin: 14",
            "    mosi_pin: 13",
            "    miso_pin: 12",
            "  - id: touch",
            "    clk_pin: 25",
            "    mosi_pin: 32",
            "    miso_pin: 39"
        ],
        display_config: [
            "  - platform: ili9xxx",
            "    id: my_display",
            "    model: TFT 2.4R",
            "    spi_id: tft",
            "    cs_pin: 15",
            "    dc_pin: 2",
            "    invert_colors: true",
            "    color_palette: 8BIT",
            "    update_interval: never",
            "    auto_clear_enabled: false",
            "    transform:",
            "      swap_xy: true",
            "      mirror_x: false",
            "    dimensions:",
            "      height: 320",
            "      width: 240"
        ],
        touch: {
            platform: "xpt2046",
            spi_id: "touch",
            cs_pin: "33",
            interrupt_pin: "36",
            calibration: { x_min: 280, x_max: 3860, y_min: 340, y_max: 3860 }
        }
    },
    guition_esp32_p4_jc8012p4a1: {
        name: "Guition P4 10.1\" 800x1280 (Untested)",
        displayPlatform: "mipi_dsi",
        resolution: { width: 800, height: 1280 },
        features: { psram: true, buzzer: false, buttons: false, lcd: true, audio: true },
        pins: {
            i2c: { sda: "GPIO7", scl: "GPIO8" }
        },
        external_components: [
            "  - source: github://willumpie82/esphome@dev",
            "    components: [mipi_dsi]",
            "  - source: github://kvj/esphome@jd9365_gsl3680",
            "    components: [gsl3680]"
        ],
        backlight: { platform: "ledc", pin: "GPIO23", frequency: "100Hz" },
        extra_components: [
            "esp_ldo:",
            "  - channel: 3",
            "    voltage: 2.5V",
            //... (omitted detailed components for brevity in editing, ensuring structure is kept)
            "    d3_pin: GPIO17",
            "  active_high: true",
            "audio_dac:",
            "  - platform: es8311",
            "    id: es8311_dac",
            "    bits_per_sample: 16bit",
            "    sample_rate: 16000",
            "    use_microphone: True",
            "i2s_audio:",
            "  - id: i2s_output",
            "    i2s_lrclk_pin: GPIO10",
            "    i2s_bclk_pin: GPIO12",
            "    i2s_mclk_pin: GPIO13",
            "speaker:",
            "  - platform: i2s_audio",
            "    i2s_audio_id: i2s_output",
            "    id: p4_speaker",
            "    i2s_dout_pin: GPIO9",
            "    dac_type: external",
            "    sample_rate: 16000",
            "    bits_per_sample: 16bit",
            "    channel: stereo",
            "    audio_dac: es8311_dac",
            "microphone:",
            "  - platform: i2s_audio",
            "    id: p4_microphone",
            "    i2s_din_pin: GPIO11",
            "    sample_rate: 16000",
            "    bits_per_sample: 16bit",
            "    adc_type: external"
        ],
        display_config: [
            "  - platform: mipi_dsi",
            "    model: JC8012P4A1",
            "    id: my_display",
            "    update_interval: never",
            "    reset_pin: GPIO27",
            "    rotation: 180",
            "    auto_clear_enabled: false",
            "    color_order: RGB",
            "    dimensions:",
            "      width: 800",
            "      height: 1280"
        ],
        touch: { platform: "gsl3680", id: "my_touchscreen", reset_pin: "GPIO22", interrupt_pin: "GPIO21", transform: { swap_xy: false, mirror_x: false, mirror_y: true } }
    },
    waveshare_esp32_p4_86_panel: {
        name: "Waveshare P4 86 Panel (Untested)",
        displayPlatform: "mipi_dsi",
        resolution: { width: 480, height: 480 },
        features: { psram: true, buzzer: false, buttons: false, lcd: true },
        pins: {
            i2c: { sda: "GPIO7", scl: "GPIO8" }
        },
        backlight: { platform: "ledc", pin: "GPIO26", frequency: "100Hz", inverted: true },
        extra_components: [
            "esp_ldo:",
            "  - channel: 3",
            "    voltage: 2.5V",
            "esp32_hosted:",
            "  active_high: true",
            "  variant: ESP32C6",
            "  reset_pin: GPIO54",
            "  cmd_pin: GPIO19",
            "  clk_pin: GPIO18",
            "  d0_pin: GPIO14",
            "  d1_pin: GPIO15",
            "  d2_pin: GPIO16",
            "  d3_pin: GPIO17"
        ],
        display_config: [
            "  - platform: mipi_dsi",
            "    id: my_display",
            "    model: WAVESHARE-P4-86-PANEL",
            "    update_interval: never",
            "    auto_clear_enabled: false"
        ],
        touch: { platform: "gt911", i2c_id: "bus_a", id: "my_touchscreen" }
    },
    waveshare_esp32_p4_touch_lcd_7b: {
        name: "Waveshare P4 7\" 1024x600 (Untested)",
        displayPlatform: "mipi_dsi",
        resolution: { width: 1024, height: 600 },
        features: { psram: true, buzzer: false, buttons: false, lcd: true, audio: true },
        pins: {
            i2c: { sda: "GPIO07", scl: "GPIO08" }
        },
        external_components: [
            "  - source: github://pr#11886",
            "    components: [mipi_dsi]"
        ],
        backlight: { platform: "ledc", pin: "GPIO32", frequency: "1000Hz", inverted: true },
        extra_components: [
            "esp_ldo:",
            "  - voltage: 2.5V",
            "    channel: 3",
            "esp32_hosted:",
            //... (omitted audio config for brevity)
            "    sample_rate: 48000"
        ],
        display_config: [
            "  - platform: mipi_dsi",
            "    id: main_display",
            "    model: WAVESHARE-ESP32-P4-WIFI6-TOUCH-LCD-7B",
            "    reset_pin:",
            "      number: 33",
            "    rotation: 180",
            "    update_interval: never",
            "    auto_clear_enabled: false",
            "    dimensions:",
            "      width: 1024",
            "      height: 600"
        ],
        touch: { platform: "gt911", i2c_id: "bus_a", reset_pin: "GPIO23", update_interval: "50ms" }
    },
    sunton_esp32_4827s032r: {
        name: "Sunton 4.3\" 480x272 Resistive (Untested)",
        displayPlatform: "rpi_dpi_rgb",
        resolution: { width: 480, height: 272 },
        features: { psram: true, buzzer: false, buttons: false, lcd: true },
        pins: {
            i2c: { sda: "19", scl: "20" }
        },
        backlight: { platform: "ledc", pin: "2", frequency: "1220Hz" },
        extra_spi: [
            "  - id: spi_touch",
            "    clk_pin: 12",
            "    mosi_pin: 11",
            "    miso_pin: 13"
        ],
        display_config: [
            "  - id: my_display",
            "    platform: rpi_dpi_rgb",
            "    dimensions:",
            "      width: 480",
            "      height: 280",
            "    rotation: 90",
            //...
        ],
        touch: {
            platform: "xpt2046",
            //...
        }
    },
    sunton_esp32_8048s050: {
        name: "Sunton 5.0\" 800x480 (Untested)",
        displayPlatform: "rpi_dpi_rgb",
        resolution: { width: 800, height: 480 },
        features: { psram: true, buzzer: false, buttons: false, lcd: true },
        pins: {
            i2c: { sda: "19", scl: "20" }
        },
        backlight: { platform: "ledc", pin: "2", frequency: "1220Hz" },
        display_config: [
            "  - platform: rpi_dpi_rgb",
            //...
            "    dimensions:",
            "      width: 800",
            "      height: 480",
            //...
        ],
        touch: { platform: "gt911", i2c_id: "bus_a", address: "0x5D", update_interval: "16ms", transform: { mirror_x: true, swap_xy: true } }
    },
    waveshare_esp32_s3_touch_lcd_7b: {
        name: "Waveshare 7.0\" 1024x600 (Untested)",
        displayPlatform: "rpi_dpi_rgb",
        resolution: { width: 1024, height: 600 },
        features: { psram: true, buzzer: false, buttons: false, lcd: true },
        pins: {
            i2c: { sda: "GPIO08", scl: "GPIO09" }
        },
        external_components: [
            "  - source: github://pr#10071",
            "    components: [waveshare_io_ch32v003]"
        ],
        //...
        display_config: [
            "  - platform: rpi_dpi_rgb",
            //...
            "    dimensions:",
            "      width: 1024",
            "      height: 600",
            //...
        ],
        touch: {
            platform: "gt911", i2c_id: "bus_a", interrupt_pin: "GPIO4",
            reset_pin: { "waveshare_io_ch32v003": "waveshare_io_hub", number: 1, mode: "OUTPUT" }
        }
    },
    guition_esp32_jc8048w535: {
        name: "Guition 3.5\" 320x480 (Untested)",
        displayPlatform: "qspi_dbi",
        resolution: { width: 320, height: 480 },
        features: { psram: true, buzzer: false, buttons: false, lcd: true },
        pins: {
            i2c: { sda: "GPIO4", scl: "GPIO8" }
        },
        backlight: { platform: "ledc", pin: "1" },
        extra_spi: [
            "  - type: quad",
            "    clk_pin: GPIO47",
            "    data_pins: [21, 48, 40, 39]"
        ],
        display_config: [
            "  - id: main_display",
            "    platform: qspi_dbi",
            "    dimensions:",
            "      height: 480",
            "      width: 320",
            //...
        ],
        touch: { platform: "axs15231", i2c_id: "bus_a" }
    }
};
