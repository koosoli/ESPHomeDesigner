/**
 * Hardware Generator for Custom Profiles
 * Generates an ESPHome YAML Recipe based on user inputs.
 */

export function generateCustomHardwareYaml(config) {
    const {
        name,
        chip,
        tech,
        resWidth,
        resHeight,
        shape,
        psram,
        displayDriver,
        pins,
        touchTech
    } = config;

    const lines = [];

    // Metadata Header
    lines.push("# ============================================================================");
    lines.push(`# TARGET DEVICE: ${name}`);
    lines.push(`# Name: ${name}`);
    lines.push(`# Resolution: ${resWidth}x${resHeight}`);
    lines.push(`# Shape: ${shape}`);
    lines.push("#");
    lines.push(`#         - Display Platform: ${displayDriver || "Unknown"}`);
    lines.push(`#         - Touchscreen: ${touchTech || "None"}`);
    lines.push(`#         - PSRAM: ${psram ? 'Yes' : 'No'}`);
    lines.push("# ============================================================================");
    lines.push("#");
    lines.push("# SETUP INSTRUCTIONS:");
    lines.push("#");
    lines.push("# STEP 1: Copy the Material Design Icons font file");
    lines.push("#         - From this repo: font_ttf/font_ttf/materialdesignicons-webfont.ttf");
    lines.push("#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf");
    lines.push("#         (Create the fonts folder if it doesn't exist)");
    lines.push("#");
    lines.push("# STEP 2: Create a new device in ESPHome");
    lines.push("#         - Click \"New Device\"");
    lines.push("#         - Name: your-device-name");

    if (chip === "ESP32 (Standard)") {
        lines.push("#         - Select: ESP32");
        lines.push("#         - Board: esp32dev (or specific board)");
        lines.push("#         - Framework: esp-idf (Recommended) or arduino");
    } else if (chip === "esp8266") {
        lines.push("#         - Select: ESP8266");
        lines.push("#         - Board: nodemcuv2 (or specific board)");
        lines.push("#         - Framework: arduino (Default)");
    } else {
        lines.push("#         - Select: ESP32-S3");
        lines.push("#         - Board: esp32-s3-devkitc-1");
        lines.push("#         - Framework: esp-idf (Recommended) or arduino");
    }

    lines.push("#");
    lines.push("# ============================================================================");
    lines.push("");

    // infrastructure section (Commented out by default to follow snippet philosophy)
    lines.push("# Infrastructure (Comment out if pasting into existing config)");
    lines.push("# esphome: # (Auto-commented)");
    lines.push(`#   name: ${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`);
    lines.push("#");
    if (chip === "esp8266") {
        lines.push("# esp8266: # (Auto-commented)");
    } else {
        lines.push("# esp32: # (Auto-commented)");
    }
    lines.push(`#   board: ${getBoardForChip(chip)}`);
    lines.push(`#   board: ${getBoardForChip(chip)}`);

    if (chip !== "esp8266") {
        lines.push("#   framework:");
        lines.push("#     type: esp-idf");
    }
    if (psram && chip.includes("s3")) {
        lines.push("#     # For stability on S3 devices with high-res displays/LVGL:");
        lines.push("#     advanced:");
        lines.push("#       execute_from_psram: true");
    }
    lines.push("");

    // PSRAM (Commented out by default)
    if (psram) {
        lines.push("# psram: # (Auto-commented)");
        if (chip.includes("s3")) {
            lines.push("#   # Quad or Octal depending on your board");
            lines.push("#   mode: quad");
            lines.push("#   speed: 80MHz");
        }
        lines.push("");
    }

    // SPI Bus (Common for most displays)
    if (pins.clk && pins.mosi) {
        lines.push("spi:");
        lines.push(`  clk_pin: ${pins.clk}`);
        lines.push(`  mosi_pin: ${pins.mosi}`);
        if (pins.miso) lines.push(`  miso_pin: ${pins.miso}`);
        lines.push("");
    }

    // I2C Bus (For Touch)
    if (pins.sda && pins.scl) {
        lines.push("i2c:");
        lines.push(`  sda: ${pins.sda}`);
        lines.push(`  scl: ${pins.scl}`);
        lines.push("  scan: true");
        lines.push("");
    }

    // Display
    lines.push("display:");
    lines.push(`  - platform: ${displayDriver}`);
    if (pins.cs) lines.push(`    cs_pin: ${pins.cs}`);
    if (pins.dc) lines.push(`    dc_pin: ${pins.dc}`);
    if (pins.rst) lines.push(`    reset_pin: ${pins.rst}`);
    if (pins.busy) lines.push(`    busy_pin: ${pins.busy}`);

    // Model specific configuration
    if (config.displayModel) {
        lines.push(`    model: "${config.displayModel}"`);
    }

    // Resolution specifics (often handled by the designer but useful in template)
    // For many drivers, we need model or specific init
    if (displayDriver === "st7789v" && !config.displayModel) {
        lines.push("    model: Custom");
        lines.push("    id: my_display");
        lines.push(`    width: ${resWidth}`);
        lines.push(`    height: ${resHeight}`);
        lines.push("    offset_height: 0");
        lines.push("    offset_width: 0");
    } else if (displayDriver === "st7789v") {
        // If model IS provided for st7789v (rare but possible custom), still might need dims
        lines.push("    id: my_display");
        lines.push(`    width: ${resWidth}`);
        lines.push(`    height: ${resHeight}`);
    }

    lines.push("    lambda: |-");
    lines.push("      # __LAMBDA_PLACEHOLDER__");
    lines.push("");

    // Backlight (PWM) with brightness control
    if (pins.backlight) {
        const minPower = config.backlightMinPower ?? 0.07;
        const initialBrightness = config.backlightInitial ?? 0.8;
        const antiburn = !!config.antiburn;

        lines.push("output:");
        lines.push("  - platform: ledc");
        lines.push(`    pin: ${pins.backlight}`);
        lines.push("    id: backlight_brightness_output");
        lines.push(`    min_power: "${minPower}"`);
        lines.push("    zero_means_zero: true");
        lines.push("");
        lines.push("light:");
        lines.push("  - platform: monochromatic");
        lines.push("    output: backlight_brightness_output");
        lines.push("    id: lcdbacklight_brightness");
        lines.push("    name: LCD Backlight");
        lines.push("    icon: mdi:wall-sconce-flat-outline");
        lines.push("    restore_mode: ALWAYS_ON");
        lines.push("    initial_state:");
        lines.push(`      brightness: "${initialBrightness}"`);
        if (antiburn) {
            lines.push("    on_turn_off:");
            lines.push("      - script.execute: start_antiburn");
            lines.push("    on_turn_on:");
            lines.push("      - script.execute: stop_antiburn");
        }
        lines.push("");

        // Antiburn scripts and switch (only if enabled)
        if (antiburn) {
            lines.push("script:");
            lines.push("  - id: start_antiburn");
            lines.push("    then:");
            lines.push("      - delay: 5min");
            lines.push("      - logger.log: Starting automatic antiburn.");
            lines.push("      - switch.turn_on: switch_antiburn");
            lines.push("  - id: stop_antiburn");
            lines.push("    then:");
            lines.push("      - script.stop: start_antiburn");
            lines.push("      - switch.turn_off: switch_antiburn");
            lines.push("");
            lines.push("switch:");
            lines.push("  - platform: template");
            lines.push("    name: Antiburn");
            lines.push("    id: switch_antiburn");
            lines.push("    icon: mdi:television-shimmer");
            lines.push("    optimistic: true");
            lines.push("    entity_category: config");
            lines.push("    turn_on_action:");
            lines.push("      - logger.log: \"Starting Antiburn\"");
            lines.push("      - if:");
            lines.push("          condition: lvgl.is_paused");
            lines.push("          then:");
            lines.push("            - lvgl.resume:");
            lines.push("            - lvgl.widget.redraw:");
            lines.push("      - lvgl.pause:");
            lines.push("          show_snow: true");
            lines.push("    turn_off_action:");
            lines.push("      - logger.log: \"Stopping Antiburn\"");
            lines.push("      - if:");
            lines.push("          condition: lvgl.is_paused");
            lines.push("          then:");
            lines.push("            - lvgl.resume:");
            lines.push("            - lvgl.widget.redraw:");
            lines.push("");
        }
    }


    // Touchscreen
    if (touchTech !== "none") {
        lines.push("touchscreen:");
        lines.push(`  - platform: ${touchTech}`);
        if (pins.touch_int) lines.push(`    interrupt_pin: ${pins.touch_int}`);
        if (pins.touch_rst) lines.push(`    reset_pin: ${pins.touch_rst}`);
        lines.push("");
    }

    return lines.join('\n');
}

/**
 * Returns a sensible default ESPHome board string based on the chip type.
 */
function getBoardForChip(chip) {
    switch (chip) {
        case 'esp32-s3': return 'esp32-s3-devkitc-1';
        case 'esp32-c3': return 'esp32-c3-devkitm-1';
        case 'esp32-c6': return 'esp32-c6-devkitc-1';
        case 'esp32': return 'esp32dev';
        case 'esp8266': return 'nodemcuv2';
        default: return 'esp32-s3-devkitc-1';
    }
}

