/**
 * Hardware Generator for Custom Profiles
 * Generates an ESPHome YAML Recipe based on user inputs.
 */

function generateCustomHardwareYaml(config) {
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
    lines.push("# ============================================================================");
    lines.push("");

    // infrastructure section (Commented out by default to follow snippet philosophy)
    lines.push("#Infrastructure (Comment out if pasting into existing config)");
    lines.push("# esphome:");
    lines.push(`#   name: ${name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`);
    lines.push("#");
    lines.push("# esp32:");
    lines.push(`#   board: ${getBoardForChip(chip)}`);
    lines.push("#   framework:");
    lines.push("#     type: esp-idf");
    lines.push("");

    // PSRAM (Commented out by default)
    if (psram) {
        lines.push("# psram:");
        lines.push("#");
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

    // Resolution specifics (often handled by the designer but useful in template)
    // For many drivers, we need model or specific init
    if (displayDriver === "st7789v") {
        lines.push("    model: Custom");
        lines.push(`    width: ${resWidth}`);
        lines.push(`    height: ${resHeight}`);
    }

    lines.push("    lambda: |-");
    lines.push("      # __LAMBDA_PLACEHOLDER__");
    lines.push("");

    // Backlight (PWM)
    if (pins.backlight) {
        lines.push("output:");
        lines.push("  - platform: ledc");
        lines.push(`    pin: ${pins.backlight}`);
        lines.push("    id: backlight_pwm");
        lines.push("");
        lines.push("light:");
        lines.push("  - platform: monochromatic");
        lines.push("    output: backlight_pwm");
        lines.push("    name: Backlight");
        lines.push("    id: backlight_light");
        lines.push("    restore_mode: ALWAYS_ON");
        lines.push("");
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
        default: return 'esp32-s3-devkitc-1';
    }
}

window.generateCustomHardwareYaml = generateCustomHardwareYaml;
