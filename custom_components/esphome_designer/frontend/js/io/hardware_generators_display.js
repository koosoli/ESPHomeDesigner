/**
 * @typedef {Record<string, any>} HardwareProfileLike
 */

/**
 * @param {HardwareProfileLike | null | undefined} profile
 * @param {string} [displayId="my_display"]
 * @param {number} [_displayRotation=0]
 * @param {Record<string, any>} [layout={}]
 * @param {boolean} [isLvgl=false]
 * @returns {string[]}
 */
export function generateTouchscreenSection(profile, displayId = "my_display", _displayRotation = 0, layout = {}, isLvgl = false) {
    if (!profile || !profile.touch) return [];

    const t = profile.touch;
    /** @type {string[]} */
    const lines = ["touchscreen:"];
    lines.push(`  - platform: ${t.platform}`);
    lines.push("    id: my_touchscreen");
    lines.push(`    display: ${displayId}`);

    if (t.i2c_id) lines.push(`    i2c_id: ${t.i2c_id}`);
    if (t.spi_id) lines.push(`    spi_id: ${t.spi_id}`);
    if (t.address) lines.push(`    address: ${t.address}`);
    if (t.update_interval) lines.push(`    update_interval: ${t.update_interval}`);

    /**
     * @param {string} key
     * @param {any} val
     */
    const addPin = (key, val) => {
        if (!val) return;
        if (typeof val === "string" || typeof val === "number") {
            lines.push(`    ${key}: ${val}`);
            return;
        }
        lines.push(`    ${key}:`);
        Object.entries(val).forEach(([k, v]) => lines.push(`      ${k}: ${v}`));
    };

    addPin("interrupt_pin", t.interrupt_pin);
    addPin("reset_pin", t.reset_pin);
    addPin("cs_pin", t.cs_pin);

    const tx = t.transform || {};
    const hasTransform = t.transform || t.mirror_x || t.mirror_y || t.swap_xy;
    if (hasTransform) {
        lines.push("    transform:");
        if (t.transform) {
            if (t.transform.swap_xy) lines.push("      swap_xy: true");
            if (t.transform.mirror_x) lines.push("      mirror_x: true");
            if (t.transform.mirror_y) lines.push("      mirror_y: true");
        } else {
            if (t.mirror_x || tx.mirror_x) lines.push("      mirror_x: true");
            if (t.mirror_y || tx.mirror_y) lines.push("      mirror_y: true");
            if (t.swap_xy || tx.swap_xy) lines.push("      swap_xy: true");
        }
    }

    if (isLvgl && layout.lcdEcoStrategy === "dim_after_timeout") {
        lines.push("    on_release:");
        lines.push("      - if:");
        lines.push("          condition: lvgl.is_paused");
        lines.push("          then:");
        lines.push("            - lvgl.resume:");
        lines.push("            - lvgl.widget.redraw:");
        lines.push("            - light.turn_on: display_backlight");
    }

    if (t.calibration) {
        lines.push("    calibration:");
        Object.entries(t.calibration).forEach(([k, v]) => lines.push(`      ${k}: ${v}`));
    }

    lines.push("");
    return lines;
}

/**
 * @param {HardwareProfileLike | null | undefined} profile
 * @returns {string[]}
 */
export function generateBacklightSection(profile) {
    /** @type {string[]} */
    const lines = [];
    if (!profile || !profile.backlight) return lines;

    const bl = profile.backlight;
    if (bl.platform === "ledc" || bl.platform === "gpio" || bl.platform === "switch") {
        if (bl.platform === "switch") {
            lines.push("switch:");
            lines.push("  - platform: gpio");
            lines.push("    id: lcdbacklight");
            lines.push("    name: lcdbacklight");
            if (typeof bl.pin === "object") {
                lines.push("    pin:");
                Object.entries(bl.pin).forEach(([k, v]) => {
                    if (typeof v === "object") {
                        lines.push(`      ${k}:`);
                        Object.entries(v).forEach(([sk, sv]) => lines.push(`        ${sk}: ${sv}`));
                    } else {
                        lines.push(`      ${k}: ${v}`);
                    }
                });
            } else {
                lines.push(`    pin: ${bl.pin}`);
            }
            lines.push("    restore_mode: ALWAYS_ON");
            lines.push("");
        } else {
            lines.push("output:");
            lines.push(`  - platform: ${bl.platform}`);
            lines.push("    id: gpio_backlight_pwm");
            lines.push(`    pin: ${bl.pin}`);
            if (bl.frequency) lines.push(`    frequency: ${bl.frequency}`);
            lines.push("");
        }
    }

    lines.push("light:");
    lines.push("  - platform: monochromatic");
    lines.push("    name: Display Backlight");
    lines.push("    id: display_backlight");
    lines.push("    restore_mode: ALWAYS_ON");

    if (bl.platform === "switch") {
        lines.push("    output: fake_backlight_output");
        lines.push("    default_transition_length: 0s");
        lines.push("");
        lines.push("output:");
        lines.push("  - platform: template");
        lines.push("    id: fake_backlight_output");
        lines.push("    type: float");
        lines.push("    write_action:");
        lines.push("      - if:");
        lines.push("          condition:");
        lines.push("            lambda: 'return state > 0.0;'");
        lines.push("          then:");
        lines.push("            - switch.turn_on: lcdbacklight");
        lines.push("          else:");
        lines.push("            - switch.turn_off: lcdbacklight");
    } else {
        lines.push("    output: gpio_backlight_pwm");
    }
    lines.push("");
    return lines;
}

/**
 * @param {HardwareProfileLike} profile
 * @returns {string[]}
 */
export function generateExtraComponents(profile) {
    /** @type {string[]} */
    const lines = [];
    if (profile.external_components && Array.isArray(profile.external_components) && profile.external_components.length > 0) {
        lines.push("external_components:");
        lines.push(...profile.external_components);
        lines.push("");
    }
    if (profile.extra_components && Array.isArray(profile.extra_components)) {
        lines.push(...profile.extra_components);
        lines.push("");
    }
    if (profile.extra_components_raw) {
        lines.push(profile.extra_components_raw);
        lines.push("");
    }
    return lines;
}

/**
 * @param {HardwareProfileLike} profile
 * @returns {string[]}
 */
export function generateI2CSection(profile) {
    /** @type {string[]} */
    const lines = [];
    if (profile && profile.pins && profile.pins.i2c) {
        lines.push("i2c:");
        lines.push(`  - sda: ${profile.pins.i2c.sda}`);
        lines.push(`    scl: ${profile.pins.i2c.scl}`);
        lines.push(`    scan: ${profile.i2c_config?.scan !== false}`);
        lines.push("    id: bus_a");
        if (profile.i2c_config?.frequency) {
            lines.push(`    frequency: ${profile.i2c_config.frequency}`);
        }
        lines.push("");
    }
    return lines;
}

/**
 * @param {HardwareProfileLike} profile
 * @returns {string[]}
 */
export function generateSPISection(profile) {
    /** @type {string[]} */
    const lines = [];
    if (profile && profile.pins && profile.pins.spi) {
        lines.push("spi:");
        const spi = profile.pins.spi;
        lines.push(spi.id ? `  - id: ${spi.id}` : "  - id: spi_bus");
        lines.push(`    clk_pin: ${spi.clk}`);
        if (spi.mosi) lines.push(`    mosi_pin: ${spi.mosi}`);
        if (spi.miso) lines.push(`    miso_pin: ${spi.miso}`);
        if (spi.type === "quad") {
            lines.push("    interface: triple");
            if (spi.data_pins) {
                lines.push(`    data_pins: [${spi.data_pins.join(", ")}]`);
            }
        }
        lines.push("");
        if (profile.extra_spi) {
            lines.push(...profile.extra_spi);
            lines.push("");
        }
    }
    return lines;
}

/**
 * @param {HardwareProfileLike} profile
 * @returns {string[]}
 */
export function generatePSRAMSection(profile) {
    const hasPsram = (profile.features && profile.features.psram) || (profile.features && profile.features.features && profile.features.features.psram);
    if (!hasPsram) return [];

    const chip = (profile.chip || "").toLowerCase();
    const unsupportedChips = ["esp32-c3", "esp32-c6", "esp8266"];
    if (unsupportedChips.some(c => chip.includes(c))) return [];

    const lines = ["psram:"];
    if (profile.psram_mode) {
        lines.push(`  mode: ${profile.psram_mode}`);
    }
    if (profile.psram_speed) {
        lines.push(`  speed: ${profile.psram_speed}`);
    } else if (profile.psram_mode) {
        lines.push("  speed: 80MHz");
    }
    lines.push("");
    return lines;
}

/**
 * @param {HardwareProfileLike} profile
 * @returns {string[]}
 */
export function generateAXP2101Section(profile) {
    if (!profile.features || !profile.features.axp2101 || profile.features.manual_pmic) return [];
    return [
        "axp2101:",
        "  i2c_id: bus_a",
        "  address: 0x34",
        "  irq_pin: GPIO21",
        "  battery_voltage:",
        "    name: \"Battery Voltage\"",
        "    id: battery_voltage",
        "  battery_level:",
        "    name: \"Battery Level\"",
        "    id: battery_level",
        "  on_setup:",
        "    - axp2101.set_ldo_voltage:",
        "        id: bldo1",
        "        voltage: 3300mv",
        "    - switch.turn_on: bldo1  # EPD_VCC (Screen Power)",
        "    - axp2101.set_ldo_voltage:",
        "        id: aldo1",
        "        voltage: 3300mv",
        "    - switch.turn_on: aldo1  # Peripherals",
        "    - axp2101.set_ldo_voltage:",
        "        id: aldo3",
        "        voltage: 3300mv",
        "    - switch.turn_on: aldo3  # Backlight/Logic",
        ""
    ];
}

/**
 * @param {HardwareProfileLike} profile
 * @returns {string[]}
 */
export function generateOutputSection(profile) {
    /** @type {string[]} */
    const lines = [];
    const hasM5Power = profile.m5paper?.main_power_pin || profile.pins?.main_power_pin || profile.m5paper?.battery_power_pin || profile.pins?.battery_power_pin;
    if (!profile || !profile.pins || (!profile.pins.batteryEnable && !profile.pins.buzzer && !hasM5Power)) return lines;

    lines.push("output:");
    if (profile.pins.batteryEnable) {
        lines.push("  - platform: gpio");
        if (typeof profile.pins.batteryEnable === "object") {
            lines.push("    pin:");
            lines.push(`      number: ${profile.pins.batteryEnable.number}`);
            if (profile.pins.batteryEnable.ignore_strapping_warning) {
                lines.push("      ignore_strapping_warning: true");
            }
            if (profile.pins.batteryEnable.inverted !== undefined) {
                lines.push(`      inverted: ${profile.pins.batteryEnable.inverted}`);
            }
        } else {
            lines.push(`    pin: ${profile.pins.batteryEnable}`);
        }
        lines.push("    id: bsp_battery_enable");
    }

    if (profile.m5paper?.main_power_pin || profile.pins?.main_power_pin) {
        if (profile.pins.batteryEnable) lines.push("");
        lines.push("  - platform: gpio");
        lines.push(`    pin: ${profile.m5paper?.main_power_pin || profile.pins.main_power_pin}`);
        lines.push("    id: main_power");
    }

    if (profile.m5paper?.battery_power_pin || profile.pins?.battery_power_pin) {
        if (profile.pins.batteryEnable || profile.m5paper?.main_power_pin) lines.push("");
        lines.push("  - platform: gpio");
        lines.push(`    pin: ${profile.m5paper?.battery_power_pin || profile.pins.battery_power_pin}`);
        lines.push("    id: battery_power");
    }

    if (profile.pins.buzzer) {
        if (profile.pins.batteryEnable) lines.push("");
        lines.push("  - platform: ledc");
        lines.push(`    pin: ${profile.pins.buzzer}`);
        lines.push("    id: buzzer_output");
    }
    lines.push("");
    return lines;
}

/**
 * @param {HardwareProfileLike} profile
 * @returns {string[]}
 */
export function generateRTTTLSection(profile) {
    if (!profile.features || !profile.features.buzzer) return [];
    return [
        "rtttl:",
        "  id: reterminal_buzzer",
        "  output: buzzer_output",
        ""
    ];
}

/**
 * @param {HardwareProfileLike | null | undefined} profile
 * @returns {string[]}
 */
export function generateAudioSection(profile) {
    if (!profile || !profile.audio) return [];
    /** @type {string[]} */
    const lines = [];
    if (profile.audio.i2s_audio) {
        lines.push("i2s_audio:");
        lines.push(`  i2s_lrclk_pin: ${profile.audio.i2s_audio.i2s_lrclk_pin}`);
        lines.push(`  i2s_bclk_pin: ${profile.audio.i2s_audio.i2s_bclk_pin}`);
        if (profile.audio.i2s_audio.i2s_mclk_pin) lines.push(`  i2s_mclk_pin: ${profile.audio.i2s_audio.i2s_mclk_pin}`);
        lines.push("");
    }
    if (profile.audio.speaker) {
        lines.push("speaker:");
        lines.push(`  - platform: ${profile.audio.speaker.platform}`);
        lines.push("    id: my_speaker");
        if (profile.audio.speaker.dac_type) lines.push(`    dac_type: ${profile.audio.speaker.dac_type}`);
        if (profile.audio.speaker.i2s_dout_pin) lines.push(`    i2s_dout_pin: ${profile.audio.speaker.i2s_dout_pin}`);
        if (profile.audio.speaker.mode) lines.push(`    mode: ${profile.audio.speaker.mode}`);
        lines.push("");
    }
    return lines;
}
