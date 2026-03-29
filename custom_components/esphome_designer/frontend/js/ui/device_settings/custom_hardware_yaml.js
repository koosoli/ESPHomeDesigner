/**
 * @param {string} yamlText
 * @param {RegExp} regex
 * @returns {string}
 */
export function extractYamlPin(yamlText, regex) {
    const match = yamlText.match(regex);
    return match ? match[1] : '';
}

/**
 * Extract a top-level YAML block by key.
 *
 * @param {string} yamlText
 * @param {string} key
 * @returns {string}
 */
export function extractYamlTopLevelBlock(yamlText, key) {
    const lines = yamlText.split(/\r?\n/);
    const collected = [];
    let collecting = false;

    for (const line of lines) {
        const isTopLevelKey = /^[a-z0-9_]+:/i.test(line);
        if (!collecting) {
            if (line.trim().toLowerCase() === `${key.toLowerCase()}:`) {
                collecting = true;
            }
            continue;
        }

        if (isTopLevelKey) {
            break;
        }
        collected.push(line);
    }

    return collected.join('\n');
}

/**
 * @param {string} yaml
 * @returns {Record<string, string>}
 */
export function extractProfilePins(yaml) {
    const touchBlock = extractYamlTopLevelBlock(yaml, 'touchscreen');
    const outBlock = extractYamlTopLevelBlock(yaml, 'output');
    const sensorBlock = extractYamlTopLevelBlock(yaml, 'sensor');
    const switchBlock = extractYamlTopLevelBlock(yaml, 'switch');

    return {
        pin_cs: extractYamlPin(yaml, /cs_pin:\s*(GPIO\d+)/i),
        pin_dc: extractYamlPin(yaml, /dc_pin:\s*(GPIO\d+)/i),
        pin_clk: extractYamlPin(yaml, /clk_pin:\s*(GPIO\d+)/i),
        pin_mosi: extractYamlPin(yaml, /mosi_pin:\s*(GPIO\d+)/i),
        pin_rst: extractYamlPin(yaml, /reset_pin:\s*(GPIO\d+)/i),
        pin_busy: extractYamlPin(yaml, /busy_pin:\s*(GPIO\d+)/i),
        pin_sda: extractYamlPin(yaml, /sda:\s*(GPIO\d+)/i),
        pin_scl: extractYamlPin(yaml, /scl:\s*(GPIO\d+)/i),
        pin_touch_int: extractYamlPin(yaml, /interrupt_pin:\s*(GPIO\d+)/i),
        pin_touch_rst: touchBlock.match(/reset_pin:\s*(GPIO\d+)/i)?.[1] || "",
        pin_backlight:
            outBlock.match(/id:\s*(?:bl_pin|[a-z_]*backlight)[\s\S]*?pin:\s*(GPIO\d+)/i)?.[1]
            || outBlock.match(/pin:\s*(GPIO\d+)[\s\S]*?id:\s*(?:bl_pin|[a-z_]*backlight)/i)?.[1]
            || extractYamlPin(yaml, /backlight_pin:\s*(GPIO\d+)/i),
        pin_battery_adc:
            sensorBlock.match(/id:\s*battery_v[\s\S]*?pin:\s*(GPIO\d+)/i)?.[1]
            || sensorBlock.match(/pin:\s*(GPIO\d+)[\s\S]*?id:\s*battery_v/i)?.[1]
            || "",
        pin_battery_enable:
            switchBlock.match(/id:\s*battery_enable[\s\S]*?pin:\s*(GPIO\d+)/i)?.[1]
            || switchBlock.match(/pin:\s*(GPIO\d+)[\s\S]*?id:\s*battery_enable/i)?.[1]
            || ""
    };
}

/**
 * @param {string} yaml
 * @returns {string}
 */
export function extractTouchPlatform(yaml) {
    const touchMatch = yaml.match(/touchscreen:[\s\S]*?platform:\s*([a-z0-9_]+)/i);
    return touchMatch ? touchMatch[1] : "none";
}

/**
 * @param {any} profile
 * @returns {string}
 */
export function resolveProfileDisplayDriver(profile) {
    let driver = profile.displayPlatform || "st7789v";
    if (profile.content && profile.content.includes("platform: st7789v")) {
        driver = "st7789v";
    }
    return driver;
}
