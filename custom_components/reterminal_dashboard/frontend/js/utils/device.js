/**
 * Gets the current device model.
 * @returns {string}
 */
function getDeviceModel() {
    // Default to E1001 if not set
    // TODO: Move currentDeviceModel to a proper state store
    return (window.currentDeviceModel || "reterminal_e1001");
}

/**
 * Gets the display name for a device model.
 * @param {string} model 
 * @returns {string}
 */
function getDeviceDisplayName(model) {
    if (window.DEVICE_PROFILES && window.DEVICE_PROFILES[model]) {
        return window.DEVICE_PROFILES[model].name;
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
function isRGBDevice() {
    const model = getDeviceModel();
    if (window.DEVICE_PROFILES && window.DEVICE_PROFILES[model]) {
        // Explicit LCD flag or OLED flag (future proofing)
        if (window.DEVICE_PROFILES[model].features?.lcd) return true;
        if (window.DEVICE_PROFILES[model].features?.oled) return true;

        // If it's not explicitly e-paper and not the default monochrome
        // (though default falls through to false usually)
    }
    return false;
}

/**
 * Gets available colors for the current device model.
 * @returns {string[]}
 */
function getAvailableColors() {
    // If it's an RGB device, we still return a base palette for dropdowns that force it,
    // but the UI should prefer RGB pickers.
    if (isRGBDevice()) {
        return ["black", "white", "red", "green", "blue", "yellow", "orange", "gray", "purple", "cyan", "magenta"];
    }

    const model = getDeviceModel();
    if (model === "reterminal_e1002") {
        return ["black", "white", "gray", "red", "green", "blue", "yellow"];
    }
    if (model === "esp32_s3_photopainter") {
        return ["black", "white", "gray", "red", "green", "blue", "yellow", "orange"];
    }
    // Default E1001 and TRMNL (True Monochrome)
    return ["black", "white", "gray"];
}

/**
 * Gets the CSS color style for a given color name.
 * @param {string} colorName 
 * @returns {string} Hex color code
 */
function getColorStyle(colorName) {
    if (!colorName) return "#000000";

    // Passthrough hex colors (from LVGL color mixer)
    if (colorName.startsWith("#")) return colorName;
    if (colorName.startsWith("0x")) return "#" + colorName.substring(2);

    switch (colorName.toLowerCase()) {
        case "white": return "#ffffff";
        case "red": return "#ff0000";
        case "green": return "#00ff00";
        case "blue": return "#0000ff";
        case "yellow": return "#ffff00";
        case "orange": return "#ffa500";
        case "gray": return "#aaaaaa"; // Keep for backward compatibility/preview
        case "black":
        default: return "#000000";
    }
}
