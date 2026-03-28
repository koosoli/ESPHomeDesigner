/**
 * @param {any} profile
 * @param {string[]} [widgetSensorLines]
 * @param {string} [_displayId]
 * @param {any[]} [_allWidgets]
 * @returns {string[]}
 */
export function generateSensorSection(profile, widgetSensorLines = [], _displayId = "my_display", _allWidgets = []) {
    /** @type {string[]} */
    const lines = [];
    if (!profile) return lines;

    const pins = profile.pins || {};
    const hasBattery = pins.batteryAdc;
    const hasSht4x = profile.features && profile.features.sht4x;
    const hasShtc3 = profile.features && profile.features.shtc3;
    const hasWidgets = widgetSensorLines.length > 0;

    if (!hasBattery && !hasSht4x && !hasShtc3 && !hasWidgets) return lines;

    lines.push("sensor:");

    if (hasBattery) {
        lines.push("  - platform: adc");
        lines.push(`    pin: ${pins.batteryAdc}`);
        lines.push("    name: \"Battery Voltage\"");
        lines.push("    unit_of_measurement: \"V\"");
        lines.push("    device_class: voltage");
        lines.push("    state_class: measurement");
        lines.push("    id: battery_voltage");
        lines.push("    update_interval: 60s");
        lines.push(`    attenuation: ${profile.battery.attenuation}`);
        lines.push("    filters:");
        lines.push(`      - multiply: ${profile.battery.multiplier}`);
    }

    if (hasSht4x) {
        lines.push("  - platform: sht4x");
        lines.push("    id: sht4x_sensor");
        lines.push("    temperature:");
        lines.push("      name: \"Temperature\"");
        lines.push("      id: sht4x_temperature");
        lines.push("    humidity:");
        lines.push("      name: \"Humidity\"");
        lines.push("      id: sht4x_humidity");
        lines.push("    address: 0x44");
        lines.push("    update_interval: 60s");
    }

    if (profile.features.sht3xd || profile.displayModel === "M5Paper" || (profile.name && profile.name.includes("M5Paper"))) {
        lines.push("  - platform: sht3xd");
        lines.push("    address: 0x44");
        lines.push("    temperature:");
        lines.push("      name: \"Temperature\"");
        lines.push("      id: sht3x_temperature");
        lines.push("    humidity:");
        lines.push("      name: \"Humidity\"");
        lines.push("      id: sht3x_humidity");
        lines.push("    update_interval: 60s");
    }

    if (hasShtc3) {
        lines.push("  - platform: shtcx");
        lines.push("    id: shtc3_sensor");
        lines.push("    i2c_id: bus_a");
        lines.push("    address: 0x70");
        lines.push("    temperature:");
        lines.push("      name: \"Temperature\"");
        lines.push("      id: shtc3_temperature");
        lines.push("    humidity:");
        lines.push("      name: \"Humidity\"");
        lines.push("      id: shtc3_humidity");
        lines.push("    update_interval: 60s");
    }

    if (widgetSensorLines.length > 0) {
        lines.push(...widgetSensorLines);
    }

    if (hasBattery) {
        lines.push("");
        lines.push("  - platform: template");
        lines.push("    name: \"Battery Level\"");
        lines.push("    id: battery_level");
        lines.push("    unit_of_measurement: \"%\"");
        lines.push("    icon: \"mdi:battery\"");
        lines.push("    device_class: battery");
        lines.push("    state_class: measurement");

        if (profile.battery.curve) {
            lines.push("    lambda: 'return id(battery_voltage).state;'");
            lines.push("    update_interval: 60s");
            lines.push("    filters:");
            lines.push("      - calibrate_linear:");
            profile.battery.curve.forEach((/** @type {{ from: number, to: number }} */ pt) => {
                lines.push(`          - ${pt.from} -> ${pt.to}`);
            });
            lines.push("      - clamp:");
            lines.push("          min_value: 0");
            lines.push("          max_value: 100");
        } else {
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
