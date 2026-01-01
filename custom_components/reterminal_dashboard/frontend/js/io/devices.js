
// ============================================================================
// DEVICE HARDWARE PROFILES
// ============================================================================
// Complete hardware configuration for each supported device.
// Used to generate all hardware-related YAML sections (sensors, buttons, etc.)
// ============================================================================

// List of devices explicitly confirmed to work.
// All other devices will be marked as (untested) in the UI.
window.SUPPORTED_DEVICE_IDS = [
  'reterminal_e1001',
  'reterminal_e1002',
  'trmnl_diy_esp32s3',
  'esp32_s3_photopainter',
  'm5stack_paper',
  'm5stack_coreink',
  'trmnl'
];

window.DEVICE_PROFILES = {
  // ========================================================================
  // SEEED STUDIO DEVICES
  // ========================================================================
  reterminal_e1001: {
    name: "Seeedstudio reTerminal E1001 (Monochrome)",
    displayModel: "7.50inv2p",
    displayPlatform: "waveshare_epaper",
    resolution: { width: 800, height: 480 },
    shape: "rect",
    psram_mode: "octal",
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
      sht4x: true,
      inverted_colors: true
    }
  },
  reterminal_e1002: {
    name: "Seeedstudio reTerminal E1002 (6-Color)",
    displayModel: "Seeed-reTerminal-E1002",
    displayPlatform: "epaper_spi",
    resolution: { width: 800, height: 480 },
    shape: "rect",
    psram_mode: "octal",
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
  trmnl_diy_esp32s3: {
    name: "Seeed Studio Trmnl DIY Kit (ESP32-S3)",
    displayModel: "7.50inv2p",
    displayPlatform: "waveshare_epaper",
    resolution: { width: 800, height: 480 },
    shape: "rect",
    psram_mode: "octal",
    pins: {
      display: { cs: "GPIO44", dc: "GPIO10", reset: "GPIO38", busy: { number: "GPIO4", inverted: true } },
      i2c: { sda: "GPIO17", scl: "GPIO18" }, // Generic S3 defaults, user didn't specify I2C but it's good to have placeholder
      spi: { clk: "GPIO7", mosi: "GPIO9" },
      batteryEnable: "GPIO6",
      batteryAdc: "GPIO1",
      buzzer: null,
      buttons: { left: "GPIO2", refresh: "GPIO5" } // Key1=Wake/Left, Key3=Refresh
    },
    battery: {
      attenuation: "12db", // As per user yaml
      multiplier: 2.0,
      calibration: { min: 3.27, max: 4.15 },
      curve: [
        { from: 4.15, to: 100.0 },
        { from: 3.96, to: 90.0 },
        { from: 3.91, to: 80.0 },
        { from: 3.85, to: 70.0 },
        { from: 3.80, to: 60.0 },
        { from: 3.75, to: 50.0 },
        { from: 3.68, to: 40.0 },
        { from: 3.58, to: 30.0 },
        { from: 3.49, to: 20.0 },
        { from: 3.41, to: 10.0 },
        { from: 3.30, to: 5.0 },
        { from: 3.27, to: 0.0 }
      ]
    },
    features: {
      psram: true,
      buzzer: false,
      buttons: true,
      sht4x: false,
      epaper: true,
      inverted_colors: true
    }
  },
  trmnl: {
    name: "TRMNL (ESP32-C3)",
    displayModel: "7.50inv2",
    displayPlatform: "waveshare_epaper",
    resolution: { width: 800, height: 480 },
    shape: "rect",
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
      attenuation: "12db",
      multiplier: 2.0,
      calibration: { min: 3.30, max: 4.15 }
    },
    features: {
      psram: false,
      buzzer: false,
      buttons: false,
      sht4x: false,
      epaper: true,
      inverted_colors: true
    }
  },

  // ========================================================================
  // WAVESHARE DEVICES
  // ========================================================================
  esp32_s3_photopainter: {
    name: "Waveshare PhotoPainter (6-Color)",
    displayModel: "7.30in-f",
    displayPlatform: "waveshare_epaper",
    resolution: { width: 800, height: 480 },
    shape: "rect",
    psram_mode: "octal",
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
      shtc3: true,
      epaper: true
    },
    i2c_config: {
      scan: false,
      frequency: "10kHz"
    }
  },
  waveshare_esp32_s3_touch_lcd_7: {
    name: "Waveshare Touch LCD 7 7.0\" 800x480",
    isPackageBased: true,
    hardwarePackage: "hardware/waveshare-esp32-s3-touch-lcd-7.yaml",
    resolution: { width: 800, height: 480 },
    features: { psram: true, buzzer: false, buttons: false, lcd: true }
  },
  waveshare_esp32_s3_touch_lcd_4_3: {
    name: "Waveshare Touch LCD 4.3 4.3\" 800x480",
    isPackageBased: true,
    hardwarePackage: "hardware/waveshare-esp32-s3-touch-lcd-4.3.yaml",
    resolution: { width: 800, height: 480 },
    features: { psram: true, buzzer: false, buttons: false, lcd: true }
  },

  // ========================================================================
  // OTHER DEVICES
  // ========================================================================
  m5stack_coreink: {
    name: "M5Stack M5Core Ink (200x200)",
    displayModel: "1.54inv2",
    displayPlatform: "waveshare_epaper",
    resolution: { width: 200, height: 200 },
    shape: "rect",
    features: {
      psram: false,
      buzzer: true,
      buttons: true,
      lcd: false,
      epaper: true,
      inverted_colors: true
    },
    pins: {
      // BUSY PIN REMOVED: Causes timeout on some devices (Blind Mode)
      display: { cs: "GPIO9", dc: "GPIO15", reset: "GPIO0", busy: null },
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
      calibration: { min: 3.27, max: 4.15 }
    },
    i2c_config: { scan: true }, // Internal I2C for RTC
  },
  m5stack_paper: {
    name: "M5Paper (540x960)",
    displayModel: "M5Paper",
    displayPlatform: "it8951e",
    // NOTE: The IT8951E external component (Passific/m5paper_esphome) 
    // internally uses 960x540 as its panel dimensions, treating the device
    // as landscape-native. We match this here so rotation calculations work correctly.
    resolution: { width: 960, height: 540 },
    shape: "rect",
    features: {
      psram: true,
      buzzer: false,
      buttons: true, // Has multifunction button
      lcd: false,
      epaper: true,
      touch: true, // Has GT911
      inverted_colors: true,
      sht3x: true
    },
    pins: {
      display: { cs: "GPIO15", dc: null, reset: "GPIO23", busy: "GPIO27" }, // DC not used for IT8951E
      i2c: { sda: "GPIO21", scl: "GPIO22" }, // For GT911 and others
      spi: { clk: "GPIO14", mosi: "GPIO12", miso: "GPIO13" }, // M5Paper SPI
      batteryEnable: null,
      batteryAdc: "GPIO35",
      buzzer: null,
      buttons: {
        left: { number: "GPIO39", mode: "INPUT" },
        right: { number: "GPIO37", mode: "INPUT" },
        refresh: { number: "GPIO38", mode: "INPUT" }
      }
    },
    m5paper: {
      battery_power_pin: "GPIO5",
      main_power_pin: "GPIO2"
    },
    battery: {
      attenuation: "12db",
      multiplier: 2.0,
      calibration: { min: 3.27, max: 4.15 } // Standard LiPo
    },
    // rotation_offset: 180 flips the display upside down to correct mounting.
    rotation_offset: 180,
    touch: {
      platform: "gt911",
      i2c_id: "bus_a",
      address: 0x14,
      interrupt_pin: "GPIO36",
      update_interval: "never", // Interrupt used
      // NOTE: Rotating 180 degrees is equivalent to mirroring both X and Y.
      // Since M5Paper with IT8951E is already swapped (swap_xy: true),
      // rotating 180 involves flipping the mirroring state.
      // If touch is still inverted after rotation, swap mirror_x/mirror_y below.
      transform: { mirror_x: true, mirror_y: true, swap_xy: true },
      // Calibration matches the IT8951E component's 960x540 coordinate space
      calibration: { x_min: 0, x_max: 960, y_min: 0, y_max: 540 }
    },
    external_components: [
      "  - source: github://Passific/m5paper_esphome"
    ]
  }
};

/**
 * Dynamically loads external hardware profiles from the backend
 * and merges them into window.DEVICE_PROFILES.
 */
async function loadExternalProfiles() {
  if (typeof fetchDynamicHardwareProfiles !== 'function') {
    console.warn("fetchDynamicHardwareProfiles not available. Hardware Recipes might not be loaded yet.");
    return;
  }

  try {
    const dynamicTemplates = await fetchDynamicHardwareProfiles();
    console.log(`[Devices] Loaded ${dynamicTemplates.length} dynamic hardware templates.`);

    dynamicTemplates.forEach(template => {
      // Backend templates are the source of truth for YAML-based devices
      window.DEVICE_PROFILES[template.id] = template;
    });

    // Handle offline persistence
    if (typeof getOfflineProfilesFromStorage === 'function') {
      const offlineProfiles = getOfflineProfilesFromStorage();
      const offlineIds = Object.keys(offlineProfiles);
      if (offlineIds.length > 0) {
        console.log(`[Devices] Restoring ${offlineIds.length} offline profiles from localStorage.`);
        Object.entries(offlineProfiles).forEach(([id, profile]) => {
          window.DEVICE_PROFILES[id] = profile;
        });
      }
    }

    // Trigger UI update if necessary (e.g., refresh device settings modal)
    if (window.app && window.app.deviceSettings && typeof window.app.deviceSettings.populateDeviceSelect === 'function') {
      window.app.deviceSettings.populateDeviceSelect();
    }
  } catch (e) {
    console.error("Failed to load external hardware profiles:", e);
  }
}

window.loadExternalProfiles = loadExternalProfiles;
