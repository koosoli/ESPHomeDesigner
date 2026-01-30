/**
 * Gets the current device model.
 * @returns {string}
 */
import { DEVICE_PROFILES } from '../io/devices.js';

export function getDeviceModel() {
    // Check AppState first (Source of Truth)
    if (window.AppState && window.AppState.deviceModel) {
        return window.AppState.deviceModel;
    }
    // Fallback to global or default
    return (window.currentDeviceModel || "reterminal_e1001");
}

/**
 * Gets the display name for a device model.
 * @param {string} model 
 * @returns {string}
 */
export function getDeviceDisplayName(model) {
    if (DEVICE_PROFILES && DEVICE_PROFILES[model]) {
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
    if (DEVICE_PROFILES && DEVICE_PROFILES[model]) {
        // Legacy: check both top-level and features object
        if (DEVICE_PROFILES[model].features?.lcd) return true;
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
    const AppState = window.AppState; // Use window ref to avoid circular import issues in utils
    const mode = AppState?.settings?.renderingMode || 'direct';

    if (mode === 'oepl' || mode === 'opendisplay') {
        const ph = AppState?.project?.protocolHardware || {};
        const colorMode = ph.colorMode || 'bw';

        if (colorMode === 'full_color') {
            return ["black", "white", "red", "green", "blue", "yellow", "orange", "gray", "purple", "cyan", "magenta"];
        }
        if (colorMode === 'color_3') {
            // BWR/BWY displays
            return ["black", "white", "red", "yellow", "gray"];
        }
        return ["theme_auto", "black", "white", "gray"];
    }

    // 2. ESPHome Mode Logic (Existing)
    if (isRGBDevice()) {
        return ["black", "white", "red", "green", "blue", "yellow", "orange", "gray", "purple", "cyan", "magenta"];
    }

    const model = getDeviceModel();
    if (model === "reterminal_e1002") {
        return ["theme_auto", "black", "white", "gray", "red", "green", "blue", "yellow"];
    }
    if (model === "esp32_s3_photopainter") {
        return ["theme_auto", "black", "white", "gray", "red", "green", "blue", "yellow"];
    }
    // Default E1001 and TRMNL (True Monochrome)
    return ["theme_auto", "black", "white", "gray"];
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
            const isDark = window.WidgetFactory?.getEffectiveDarkMode?.() || false;
            return isDark ? "#ffffff" : "#000000";
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

// Global exposure for transition
window.getDeviceModel = getDeviceModel;
window.getDeviceDisplayName = getDeviceDisplayName;
window.isRGBDevice = isRGBDevice;
window.getAvailableColors = getAvailableColors;
window.getColorStyle = getColorStyle;
