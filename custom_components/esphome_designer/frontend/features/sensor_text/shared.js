/**
 * @param {unknown} val
 * @returns {boolean}
 */
export const isStrictlyNumeric = (val) => {
    if (val === null || val === undefined) return false;
    const text = String(val).trim();
    return text !== "" && !isNaN(Number(text));
};

/**
 * @param {string | undefined | null} hex
 * @returns {{ r: number, g: number, b: number }}
 */
export const hexToRgb = (hex) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex || "");
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
};

/**
 * @param {string} hexLow
 * @param {string} hexHigh
 * @param {number} t
 * @returns {string}
 */
export const lerpColor = (hexLow, hexHigh, t) => {
    const low = hexToRgb(hexLow);
    const high = hexToRgb(hexHigh);
    const clamp = Math.max(0, Math.min(1, t));
    const toLinear = (channel) => channel <= 0.04045
        ? channel / 12.92
        : Math.pow((channel + 0.055) / 1.055, 2.4);
    const toSrgb = (channel) => channel <= 0.0031308
        ? channel * 12.92
        : 1.055 * Math.pow(channel, 1 / 2.4) - 0.055;
    const blend = (start, end) => Math.round(toSrgb(
        toLinear(start / 255) + clamp * (toLinear(end / 255) - toLinear(start / 255))
    ) * 255);
    const r = blend(low.r, high.r);
    const g = blend(low.g, high.g);
    const b = blend(low.b, high.b);
    return `rgb(${r}, ${g}, ${b})`;
};

/** @type {string[]} */
export const HA_TEXT_DOMAINS = ["text_sensor.", "weather.", "calendar.", "person.", "device_tracker.", "sun.", "update.", "scene."];

/**
 * @param {{ features?: { lcd?: boolean }, name?: string } | undefined | null} profile
 * @returns {boolean}
 */
export const isColorDisplay = (profile) => !!(profile?.features?.lcd || (profile?.name && (profile.name.includes("6-Color") || profile.name.includes("Color"))));
