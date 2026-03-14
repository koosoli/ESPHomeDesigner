/**
 * Gets the current device model.
 * @returns {string}
 */
import { DEVICE_PROFILES } from '../io/devices.js';
import { AppState } from '../core/state';
import { WidgetFactory } from '../core/widget_factory';

export function getDeviceModel() {
    // Check AppState first (Source of Truth)
    // @ts-ignore
    if (AppState && AppState.deviceModel) {
        // @ts-ignore
        return AppState.deviceModel;
    }
    // Fallback to default
    return "reterminal_e1001";
}

/**
 * Gets the display name for a device model.
 * @param {string} model 
 * @returns {string}
 */
export function getDeviceDisplayName(model) {
    // @ts-ignore
    if (DEVICE_PROFILES && DEVICE_PROFILES[model]) {
        // @ts-ignore
        return DEVICE_PROFILES[model].name;
    }
    switch (model) {
        case "reterminal_e1002": return "reTerminal E1002 (6-Color)";
        case "esp32_s3_photopainter": return "Waveshare PhotoPainter (7-Color)";
        case "trmnl": return "Official TRMNL (ESP32-C3)";
        case "reterminal_e1001":
        default: return "reTerminal E1001 (Monochrome)";
    }
}

/**
 * Checks if the current device supports full RGB color.
 * @returns {boolean}
 */
export function isRGBDevice() {
    const model = getDeviceModel();
    // @ts-ignore
    if (DEVICE_PROFILES && DEVICE_PROFILES[model]) {
        // Legacy: check both top-level and features object
        // @ts-ignore
        if (DEVICE_PROFILES[model].features?.lcd) return true;
        // @ts-ignore
        if (DEVICE_PROFILES[model].features?.oled) return true;

        // If it's not explicitly e-paper and not the default monochrome
        // (though default falls through to false usually)
    }
    return false;
}

/**
 * Gets available colors for the current device model.
 * @returns {string[]}
 */
export function getAvailableColors() {
    // 1. Protocol Mode Logic
    // @ts-ignore
    const mode = AppState?.settings?.renderingMode || 'direct';

    const colormode_bwr = ["black", "white", "red", "yellow", "gray"];
    const colormode_monochrome = ["theme_auto", "black", "white", "gray"];
    const colormode_fullcolor = ["black", "white", "red", "green", "blue", "yellow", "orange", "gray", "purple", "cyan", "magenta"];
    const colormode_primary = ["theme_auto", "black", "white", "gray", "red", "green", "blue", "yellow"]

    if (mode === 'oepl' || mode === 'opendisplay') {
        // @ts-ignore
        const ph = AppState?.project?.protocolHardware || {};
        const colorMode = ph.colorMode || 'bw';

        if (colorMode === 'full_color') {
            return colormode_fullcolor;
        }
        if (colorMode === 'color_3') {
            // BWR/BWY displays
            return colormode_bwr;
        }
        return colormode_monochrome;
    }

    // 2. ESPHome Mode Logic (Existing)
    if (isRGBDevice()) {
        return colormode_fullcolor;
    }

    const model = getDeviceModel();
    if (model === "reterminal_e1002") {
        return colormode_primary;
    }
    if (model === "esp32_s3_photopainter") {
        return colormode_primary;
    }

    // Implement a filename-based fallback for determining colormode from a yaml.
    // This is useful for custom imported hardware
    if(model.endsWith("bwr_yaml")) {
        return colormode_bwr;
    }
    if(model.endsWith("fullcolor_yaml")) {
        return colormode_fullcolor;
    }
    if(model.endsWith("primarycolor_yaml")) {
        return colormode_primary;
    }

    // Default E1001 and TRMNL (True Monochrome)
    return colormode_monochrome
}

/**
 * Gets the CSS color style for a given color name.
 * @param {string} colorName 
 * @returns {string} Hex color code
 */
export function getColorStyle(colorName) {
    if (!colorName) return "#000000";

    // Passthrough hex colors (from LVGL color mixer)
    if (colorName.startsWith("#")) return colorName;
    if (colorName.startsWith("0x")) return "#" + colorName.substring(2);

    switch (colorName.toLowerCase()) {
        case "theme_auto": {
            const isDark = WidgetFactory.getEffectiveDarkMode();
            return isDark ? "#ffffff" : "#000000";
        }
        case "theme_auto_inverse": {
            const isDark = WidgetFactory.getEffectiveDarkMode();
            return isDark ? "#000000" : "#ffffff";
        }
        case "white": return "#ffffff";
        case "red": return "#ff0000";
        case "green": return "#00ff00";
        case "blue": return "#0000ff";
        case "yellow": return "#ffff00";
        case "orange": return "#ffa500";
        case "gray": return "#a0a0a0"; // Matched to Color(160,160,160)
        case "transparent": return "transparent";
        case "black":
        default: return "#000000";
    }
}

