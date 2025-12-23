// ============================================================================
// HARDWARE SECTION GENERATORS
// ============================================================================

function generateTouchscreenSection(profile, displayId = "my_display") {
    if (!profile.touch) return []; // E-paper usually has no touch or handled differently

    const t = profile.touch;
    const lines = ["touchscreen:"];
    lines.push(`  - platform: ${t.platform}`);
    lines.push(`    id: my_touchscreen`);
    lines.push(`    display: ${displayId}`);

    if (t.i2c_id) lines.push(`    i2c_id: ${t.i2c_id}`);
    if (t.spi_id) lines.push(`    spi_id: ${t.spi_id}`);

    // Explicit addresses or update intervals
    if (t.address) lines.push(`    address: ${t.address}`);
    if (t.update_interval) lines.push(`    update_interval: ${t.update_interval}`);

    // Pin mappings (some might be objects for IO extenders)
    const addPin = (key, val) => {
        if (!val) return;
        if (typeof val === 'string' || typeof val === 'number') {
            lines.push(`    ${key}: ${val}`);
        } else {
            lines.push(`    ${key}:`);
            Object.entries(val).forEach(([k, v]) => lines.push(`      ${k}: ${v}`));
        }
    };

    addPin("interrupt_pin", t.interrupt_pin);
    addPin("reset_pin", t.reset_pin);
    addPin("cs_pin", t.cs_pin);

    // Calc/Transform
    const transform = [];
    if (t.mirror_x) transform.push("mirror_x: true");
    if (t.mirror_y) transform.push("mirror_y: true");
    if (t.swap_xy) transform.push("swap_xy: true");

    if (transform.length > 0) {
        lines.push("    transform:");
        transform.forEach(l => lines.push(`      ${l}`));
    }

    if (t.calibration) {
        lines.push("    calibration:");
        Object.entries(t.calibration).forEach(([k, v]) => lines.push(`      ${k}: ${v}`));
    }

    lines.push("");
    return lines;
}

function generateBacklightSection(profile) {
    const lines = [];
    if (!profile.backlight) return lines;

    const bl = profile.backlight;

    // Output component for the backlight pin
    if (bl.platform === "ledc" || bl.platform === "gpio" || bl.platform === "switch") {
        if (bl.platform === "switch") {
            lines.push("switch:");
            lines.push("  - platform: gpio"); // Usually gpio switch for on/off backlights
            lines.push("    id: lcdbacklight");
            lines.push("    name: lcdbacklight");
            // Handle complex pin objects (e.g. attached to IO expander)
            if (typeof bl.pin === 'object') {
                lines.push("    pin:");
                Object.entries(bl.pin).forEach(([k, v]) => {
                    if (typeof v === 'object') {
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
            lines.push(`    id: gpio_backlight_pwm`);
            lines.push(`    pin: ${bl.pin}`);
            if (bl.frequency) lines.push(`    frequency: ${bl.frequency}`);
            lines.push("");
        }
    }

    // Light component to control it
    lines.push("light:");
    lines.push("  - platform: monochromatic");
    lines.push("    name: Display Backlight");
    lines.push("    id: display_backlight");
    lines.push("    restore_mode: ALWAYS_ON");

    if (bl.platform === "switch") {
        // Fake output for switch-based backlights (Waveshare 7" style)
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

function generateExtraComponents(profile) {
    const lines = [];
    if (profile.extra_components && Array.isArray(profile.extra_components)) {
        lines.push(...profile.extra_components);
        lines.push("");
    }
    if (profile.extra_components_raw) {
        lines.push(profile.extra_components_raw);
        lines.push("");
    }
    // Handle extra_components that might be objects/strings mixed? No, assuming array of strings.
    // Also handle extra_spi/i2c/etc if they are separate components?
    // The profile definition uses `extra_components` for top-level component imports like "i2c:", "spi:", etc.
    // But `extra_spi` and `extra_components` (generic) are often used.

    // Also handle `extra_components` that are just strings to be dumped.
    return lines;
}

function generateI2CSection(profile) {
    const lines = [];
    if (profile.pins.i2c) {
        lines.push("i2c:");
        lines.push("  - sda: " + profile.pins.i2c.sda);
        lines.push("    scl: " + profile.pins.i2c.scl);
        lines.push("    scan: " + (profile.i2c_config?.scan !== false));
        lines.push("    id: bus_a");
        if (profile.i2c_config?.frequency) {
            lines.push("    frequency: " + profile.i2c_config.frequency);
        }
        lines.push("");
    }
    return lines;
}

function generateSPISection(profile) {
    const lines = [];
    if (profile.pins.spi) {
        lines.push("spi:");
        const spi = profile.pins.spi;
        if (spi.id) lines.push(`  - id: ${spi.id}`);
        else lines.push("  - id: spi_bus");

        lines.push(`    clk_pin: ${spi.clk}`);
        if (spi.mosi) lines.push(`    mosi_pin: ${spi.mosi}`);
        if (spi.miso) lines.push(`    miso_pin: ${spi.miso}`);

        if (spi.type === "quad") {
            lines.push("    interface: triple"); // ESPHome 'quad' is often interface: triple (?) No, interface: hardware usually.
            // Special handling for quad spi (e.g. Guition)
            if (spi.data_pins) {
                lines.push(`    data_pins: [${spi.data_pins.join(', ')}]`);
            }
        }
        lines.push("");

        // Extra SPI buses?
        if (profile.extra_spi) {
            lines.push(...profile.extra_spi);
            lines.push("");
        }
    }
    return lines;
}

function generateDisplaySection(profile) {
    const lines = [];


    // Display Platform Configuration
    if (profile.display_config) {
        lines.push("display:");
        lines.push(...profile.display_config);
        lines.push("");
    } else {
        // Fallback/Default generation for simple E-paper
        lines.push("display:");
        lines.push(`  - platform: ${profile.displayPlatform}`);
        lines.push("    id: epaper_display");

        const p = profile.pins.display;
        const addPin = (key, val) => {
            if (!val) return;
            if (typeof val === 'object') {
                lines.push(`    ${key}:`);
                lines.push(`      number: ${val.number}`);
                if (val.inverted !== undefined) lines.push(`      inverted: ${val.inverted}`);
            } else {
                lines.push(`    ${key}: ${val}`);
            }
        };

        addPin("cs_pin", p.cs);
        addPin("dc_pin", p.dc);
        addPin("reset_pin", p.reset);
        addPin("busy_pin", p.busy);

        if (profile.displayModel === "M5Paper" || profile.displayPlatform === "it8951e") {
            lines.push("    rotation: 0");
            lines.push("    reversed: false");
            lines.push("    reset_duration: 100ms");
        }
        else if (profile.displayModel) {
            let modelLine = `    model: "${profile.displayModel}"`;
            // Add warning for E1002 consumers using older ESPHome versions
            if (profile.displayModel === "Seeed-reTerminal-E1002") {
                modelLine += " #Please update your ESPHome version to 2025.11.1 above";
            }
            lines.push(modelLine);
        }

        lines.push("    update_interval: never");

        // ============================================================================
        // IMPORTANT: full_update_every is ONLY supported for monochrome e-paper displays!
        // DO NOT add full_update_every for color e-paper displays like:
        //   - 7.30in-f (PhotoPainter 7-color)
        //   - Seeed-reTerminal-E1002 (6-color)
        //   - Any other multi-color e-paper
        // Adding it to unsupported models causes ESPHome compilation errors.
        // See: https://esphome.io/components/display/waveshare_epaper.html
        // ============================================================================
        const modelsWithFullUpdate = [
            "1.54in", "1.54inv2", "2.13in", "2.13in-ttgo", "2.13in-ttgo-b1",
            "2.13in-ttgo-b73", "2.13in-ttgo-b74", "2.13in-ttgo-dke", "2.13inv2", "2.13inv3",
            "2.90in", "2.90in-dke", "2.90inv2", "2.90inv2-r2", "7.50inv2", "7.50inv2p",
            "gdew029t5", "gdey029t94", "gdey042t81", "gdey0583t81"
        ];
        if (profile.displayModel && modelsWithFullUpdate.includes(profile.displayModel)) {
            lines.push("    full_update_every: 30");
        }
        lines.push("");
    }

    // Add Touchscreen if present
    // Fallback generation (e-paper) uses epaper_display, custom/LCD likely uses my_display
    const linkedDisplayId = profile.display_config ? "my_display" : "epaper_display";
    lines.push(...generateTouchscreenSection(profile, linkedDisplayId));

    // Note: Backlight section is generated in yaml_export.js, not here (to avoid duplicates)

    return lines;
}

function generateSensorSection(profile, widgetSensorLines = [], displayId = "my_display") {
    const lines = [];

    // Check if we need a sensor: block
    const pins = profile.pins || {};
    const hasBattery = pins.batteryAdc;
    const hasSht4x = profile.features.sht4x;
    const hasShtc3 = profile.features.shtc3;
    const hasWidgets = widgetSensorLines.length > 0;

    if (!hasBattery && !hasSht4x && !hasShtc3 && !hasWidgets) return lines;

    lines.push("sensor:");

    // 1. Battery Voltage
    // 1. Battery Voltage
    if (hasBattery) {
        lines.push("  - platform: adc");
        lines.push(`    pin: ${pins.batteryAdc}`);
        lines.push("    name: \"Battery Voltage\"");
        lines.push("    unit_of_measurement: \"V\"");
        lines.push("    device_class: voltage");
        lines.push("    state_class: measurement");
        lines.push("    id: battery_voltage");
        lines.push("    update_interval: 60s");
        lines.push("    attenuation: " + profile.battery.attenuation);
        lines.push("    filters:");
        lines.push("      - multiply: " + profile.battery.multiplier);
        // NOTE: removed calibrate_linear here so that "Battery Voltage" remains in Volts
        // If specific devices relied on this outputting %, they will need to use "Battery Level" instead.
    }

    // 2. SHT4x (Temperature/Humidity)
    if (hasSht4x) {
        lines.push("  - platform: sht4x");
        lines.push("    temperature:");
        lines.push("      name: \"Temperature\"");
        lines.push("    humidity:");
        lines.push("      name: \"Humidity\"");
        lines.push("    address: 0x44");
        lines.push("    update_interval: 60s");
    }

    // 3. SHTC3 (Temperature/Humidity) - Uses shtcx platform in ESPHome
    if (hasShtc3) {
        lines.push("  - platform: shtcx");
        lines.push("    id: shtc3_sensor");
        lines.push("    i2c_id: bus_a");
        lines.push("    address: 0x70");
        lines.push("    temperature:");
        lines.push("      name: \"Temperature\"");
        lines.push("    humidity:");
        lines.push("      name: \"Humidity\"");
        lines.push("    update_interval: 60s");
    }

    // 4. Widget Sensors
    if (widgetSensorLines.length > 0) {
        lines.push(...widgetSensorLines);
    }

    // 5. Battery Percentage Template
    if (hasBattery) {
        lines.push("");
        lines.push("  - platform: template");
        lines.push("    name: \"Battery Level\"");
        lines.push("    id: battery_level");
        lines.push("    unit_of_measurement: \"%\"");
        // Optional icon/class if desired:
        lines.push("    icon: \"mdi:battery\"");
        lines.push("    device_class: battery");
        lines.push("    state_class: measurement");

        if (profile.battery.curve) {
            // Use curve calibration
            lines.push("    lambda: 'return id(battery_voltage).state;'");
            lines.push("    update_interval: 60s");
            lines.push("    filters:");
            lines.push("      - calibrate_linear:");
            profile.battery.curve.forEach(pt => {
                lines.push(`          - ${pt.from} -> ${pt.to}`);
            });
            lines.push("      - clamp:");
            lines.push("          min_value: 0");
            lines.push("          max_value: 100");
        } else {
            // Fallback: simple linear calculation lambda
            const minV = profile.battery.calibration ? profile.battery.calibration.min : 3.27;
            const maxV = profile.battery.calibration ? profile.battery.calibration.max : 4.15;
            lines.push("    lambda: |-");
            lines.push(`      if (id(battery_voltage).state > ${maxV}) return 100;`);
            lines.push(`      if (id(battery_voltage).state < ${minV}) return 0;`);
            lines.push(`      return (id(battery_voltage).state - ${minV}) / (${maxV} - ${minV}) * 100.0;`);
        }
    }

    lines.push("");
    return lines;
}

function generateBinarySensorSection(profile, numPages, displayId = "my_display", touchAreaWidgets = []) {
    const lines = [];
    const hasButtons = profile.features.buttons;
    const hasTouchAreas = touchAreaWidgets.length > 0;

    if (!hasButtons && !hasTouchAreas) return lines;

    lines.push("binary_sensor:");

    // 1. Physical Buttons
    if (hasButtons) {
        // CoreInk uses activity_timer script for sleep management
        const isCoreInk = profile.name && profile.name.includes("CoreInk");
        const b = profile.pins.buttons;

        if (b.left) {
            lines.push("  - platform: gpio"); // Left Button
            lines.push(`    pin:`);
            if (typeof b.left === 'object') {
                lines.push(`      number: ${b.left.number}`);
                lines.push(`      mode: ${b.left.mode || 'INPUT_PULLUP'}`);
                lines.push(`      inverted: ${b.left.inverted !== undefined ? b.left.inverted : true}`);
            } else {
                lines.push(`      number: ${b.left}`);
                lines.push(`      mode: INPUT_PULLUP`);
                lines.push(`      inverted: true`);
            }
            lines.push("    name: \"Left Button\"");
            lines.push("    id: button_left");
            lines.push("    on_press:");
            lines.push("      then:");
            if (isCoreInk) {
                // CoreInk: Simple page change with activity timer reset
                lines.push(`        - lambda: 'if (id(display_page) > 0) id(display_page) -= 1; else id(display_page) = ${numPages - 1};'`);
                lines.push(`        - component.update: ${displayId}`);
                lines.push("        - script.stop: activity_timer");
                lines.push("        - script.execute: activity_timer");
            } else {
                lines.push("        - if:");
                lines.push("            condition:");
                lines.push("              lambda: 'return id(display_page) > 0;'");
                lines.push("            then:");
                lines.push("              - lambda: 'id(display_page) -= 1;'");
                lines.push(`              - component.update: ${displayId}`);
                lines.push("            else:");
                lines.push(`              - lambda: 'id(display_page) = ${numPages - 1};'`);
                lines.push(`              - component.update: ${displayId}`);
            }
        }

        if (b.right) {
            lines.push("  - platform: gpio"); // Right Button
            lines.push(`    pin:`);
            if (typeof b.right === 'object') {
                lines.push(`      number: ${b.right.number}`);
                lines.push(`      mode: ${b.right.mode || 'INPUT_PULLUP'}`);
                lines.push(`      inverted: ${b.right.inverted !== undefined ? b.right.inverted : true}`);
            } else {
                lines.push(`      number: ${b.right}`);
                lines.push(`      mode: INPUT_PULLUP`);
                lines.push(`      inverted: true`);
            }
            lines.push("    name: \"Right Button\"");
            lines.push("    id: button_right");
            lines.push("    on_press:");
            lines.push("      then:");
            if (isCoreInk) {
                // CoreInk: Simple page change with activity timer reset
                lines.push(`        - lambda: 'if (id(display_page) < ${numPages - 1}) id(display_page) += 1; else id(display_page) = 0;'`);
                lines.push(`        - component.update: ${displayId}`);
                lines.push("        - script.stop: activity_timer");
                lines.push("        - script.execute: activity_timer");
            } else {
                lines.push("        - if:");
                lines.push(`            condition:`);
                lines.push(`              lambda: 'return id(display_page) < ${numPages - 1};'`);
                lines.push("            then:");
                lines.push("              - lambda: 'id(display_page) += 1;'");
                lines.push(`              - component.update: ${displayId}`);
                lines.push("            else:");
                lines.push("              - lambda: 'id(display_page) = 0;'");
                lines.push(`              - component.update: ${displayId}`);
            }
        }

        if (b.refresh) {
            lines.push("  - platform: gpio"); // Refresh Button
            lines.push(`    pin:`);
            if (typeof b.refresh === 'object') {
                lines.push(`      number: ${b.refresh.number}`);
                lines.push(`      mode: ${b.refresh.mode || 'INPUT_PULLUP'}`);
                lines.push(`      inverted: ${b.refresh.inverted !== undefined ? b.refresh.inverted : true}`);
            } else {
                lines.push(`      number: ${b.refresh}`);
                lines.push(`      mode: INPUT_PULLUP`);
                lines.push(`      inverted: true`);
            }
            // CoreInk: Middle button is "Enter", others: "Refresh"
            const buttonName = isCoreInk ? "Enter Button" : "Refresh Button";
            const buttonId = isCoreInk ? "button_enter" : "button_refresh";
            lines.push(`    name: "${buttonName}"`);
            lines.push(`    id: ${buttonId}`);
            lines.push("    on_press:");
            lines.push("      then:");
            lines.push(`        - component.update: ${displayId}`);
            if (isCoreInk) {
                lines.push("        - script.stop: activity_timer");
                lines.push("        - script.execute: activity_timer");
            }
        }
    }

    // 2. Touch Area Buttons
    if (hasTouchAreas) {
        lines.push(`  # Touch Area Binary Sensors`);
        touchAreaWidgets.forEach(w => {
            const safeId = (w.entity_id || `touch_area_${w.id}`).replace(/[^a-zA-Z0-9_]/g, "_");
            const xMin = w.x;
            const xMax = w.x + w.width;
            const yMin = w.y;
            const yMax = w.y + w.height;

            lines.push(`  - platform: touchscreen`);
            lines.push(`    id: ${safeId}`);
            lines.push(`    touchscreen_id: my_touchscreen`);
            lines.push(`    x_min: ${xMin}`);
            lines.push(`    x_max: ${xMax}`);
            lines.push(`    y_min: ${yMin}`);
            lines.push(`    y_max: ${yMax}`);
        });
    }

    lines.push("");
    return lines;
}

function generateButtonSection(profile, numPages, displayId = "my_display") {
    const lines = [];
    // Page cycling buttons (template buttons for HA)
    lines.push("button:");
    lines.push("  - platform: template");
    lines.push("    name: \"Next Page\"");
    lines.push("    on_press:");
    lines.push("      then:");
    lines.push("        - lambda: |-");
    lines.push(`            if (id(display_page) < ${numPages - 1}) {`);
    lines.push("              id(display_page) += 1;");
    lines.push("            } else {");
    lines.push("              id(display_page) = 0;");
    lines.push("            }");
    lines.push(`        - component.update: ${displayId}`);

    lines.push("  - platform: template");
    lines.push("    name: \"Previous Page\"");
    lines.push("    on_press:");
    lines.push("      then:");
    lines.push("        - lambda: |-");
    lines.push("            if (id(display_page) > 0) {");
    lines.push("              id(display_page) -= 1;");
    lines.push("            } else {");
    lines.push(`              id(display_page) = ${numPages - 1};`);
    lines.push("            }");
    lines.push(`        - component.update: ${displayId}`);

    // Refresh Display button
    lines.push("  - platform: template");
    lines.push("    name: \"Refresh Display\"");
    lines.push("    on_press:");
    lines.push("      then:");
    lines.push(`        - component.update: ${displayId}`);

    // Individual page buttons (Go to Page 1, Go to Page 2, etc.)
    for (let i = 0; i < numPages; i++) {
        lines.push("  - platform: template");
        lines.push(`    name: "Go to Page ${i + 1}"`);
        lines.push("    on_press:");
        lines.push("      then:");
        lines.push(`        - lambda: 'id(display_page) = ${i};'`);
        lines.push(`        - component.update: ${displayId}`);
    }

    if (profile.features.buzzer) {
        lines.push("  # Buzzer Sounds");
        lines.push("  - platform: template");
        lines.push("    name: \"Play Beep Short\"");
        lines.push("    icon: \"mdi:bell-ring\"");
        lines.push("    on_press:");
        lines.push("      - rtttl.play: \"beep:d=32,o=5,b=200:16e6\"");
        lines.push("");
        lines.push("  - platform: template");
        lines.push("    name: \"Play Beep OK\"");
        lines.push("    icon: \"mdi:check-circle-outline\"");
        lines.push("    on_press:");
        lines.push("      - rtttl.play: \"ok:d=16,o=5,b=200:e6\"");
        lines.push("");
        lines.push("  - platform: template");
        lines.push("    name: \"Play Beep Error\"");
        lines.push("    icon: \"mdi:alert-circle-outline\"");
        lines.push("    on_press:");
        lines.push("      - rtttl.play: \"error:d=16,o=5,b=200:c6\"");
        lines.push("");
        lines.push("  - platform: template");
        lines.push("    name: \"Play Star Wars\"");
        lines.push("    icon: \"mdi:music-note\"");
        lines.push("    on_press:");
        lines.push("      - rtttl.play: \"StarWars:d=4,o=5,b=45:32p,32f,32f,32f,8a#.,8f.6,32d#,32d,32c,8a#.6,4f.6,32d#,32d,32c,8a#.6,4f.6,32d#,32d,32d#,8c6\"");
    }

    lines.push("");
    return lines;
}


/**
 * Generates PSRAM section for ESP32-S3 devices
 */
function generatePSRAMSection(profile) {
    // Check deep nested features or top level
    const hasPsram = (profile.features && profile.features.psram) || (profile.features && profile.features.features && profile.features.features.psram);
    if (!hasPsram) return [];

    // ============================================================================
    // IMPORTANT: PSRAM mode varies by device!
    // - Most ESP32-S3 boards use QUAD SPI PSRAM (mode: quad)
    // - Some newer boards use OCTAL SPI PSRAM (mode: octal)
    // - Using the wrong mode causes boot loops!
    // 
    // If no psram_mode is specified in profile, we omit the psram section entirely
    // and let ESPHome auto-detect (safest approach).
    // ============================================================================

    // Check if profile specifies a PSRAM mode, otherwise let ESPHome auto-detect
    if (profile.psram_mode) {
        return [
            "psram:",
            `  mode: ${profile.psram_mode}`,
            "  speed: 80MHz",
            ""
        ];
    }

    // Default: let ESPHome auto-detect PSRAM (safest for unknown boards)
    // But we MUST provide the psram: key to enable it.
    return [
        "psram:",
        ""
    ];
}


/**
 * Generates AXP2101 PMIC section (Critical for PhotoPainter)
 */
function generateAXP2101Section(profile) {
    if (!profile.features.axp2101 || profile.features.manual_pmic) return [];

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
 * Generates output section for battery enable and buzzer
 */
function generateOutputSection(profile) {
    const lines = [];
    if (!profile.pins.batteryEnable && !profile.pins.buzzer) return lines;

    lines.push("output:");
    if (profile.pins.batteryEnable) {
        lines.push("  - platform: gpio"); // Use standard gpio output
        if (typeof profile.pins.batteryEnable === 'object') {
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
        // Often good to set restore_mode or inverted if needed
        // For now matching legacy exactly
    }
    if (profile.pins.buzzer) {
        // Only if not using rtttl or if rtttl uses this output?
        // RTTTL usually defines its own output or references one.
        // Legacy code:
        /*
          if (profile.pins.batteryEnable) lines.push("");
          lines.push(`  - platform: ledc`);
          lines.push(`    pin: ${profile.pins.buzzer}`);
          lines.push(`    id: buzzer_output`);
        */
        if (profile.pins.batteryEnable) lines.push("");
        lines.push("  - platform: ledc");
        lines.push(`    pin: ${profile.pins.buzzer}`);
        lines.push("    id: buzzer_output");
    }
    lines.push("");
    return lines;
}

/**
 * Generates RTTTL buzzer section
 */
function generateRTTTLSection(profile) {
    if (!profile.features.buzzer) return [];
    return [
        "rtttl:",
        "  id: reterminal_buzzer",
        "  output: buzzer_output",
        ""
    ];
}

function generateAudioSection(profile) {
    if (!profile.audio) return [];
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
        lines.push(`    id: my_speaker`);
        if (profile.audio.speaker.dac_type) lines.push(`    dac_type: ${profile.audio.speaker.dac_type}`);
        if (profile.audio.speaker.i2s_dout_pin) lines.push(`    i2s_dout_pin: ${profile.audio.speaker.i2s_dout_pin}`);
        if (profile.audio.speaker.mode) lines.push(`    mode: ${profile.audio.speaker.mode}`);
        lines.push("");
    }
    return lines;
}
