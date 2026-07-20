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
    const toOklab = (rgb) => {
        const r = toLinear(rgb.r / 255), g = toLinear(rgb.g / 255), b = toLinear(rgb.b / 255);
        const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
        const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
        const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
        return [0.2104542553 * l + 0.7936177850 * m - 0.0040720468 * s, 1.9779984951 * l - 2.4285922050 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.8086757660 * s];
    };
    const start = toOklab(low), end = toOklab(high);
    const l = start[0] + clamp * (end[0] - start[0]);
    const a = start[1] + clamp * (end[1] - start[1]);
    const b = start[2] + clamp * (end[2] - start[2]);
    const l3 = Math.pow(l + 0.3963377774 * a + 0.2158037573 * b, 3);
    const m3 = Math.pow(l - 0.1055613458 * a - 0.0638541728 * b, 3);
    const s3 = Math.pow(l - 0.0894841775 * a - 1.2914855480 * b, 3);
    const fromLinear = (channel) => Math.round(Math.max(0, Math.min(1, toSrgb(channel))) * 255);
    const r = fromLinear(4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3);
    const g = fromLinear(-1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3);
    const bOut = fromLinear(-0.0041960863 * l3 - 0.7034186147 * m3 + 1.7076147010 * s3);
    return `rgb(${r}, ${g}, ${bOut})`;
};

/** @type {string[]} */
export const HA_TEXT_DOMAINS = ["text_sensor.", "weather.", "calendar.", "person.", "device_tracker.", "sun.", "update.", "scene."];

/**
 * @param {{ features?: { lcd?: boolean }, name?: string } | undefined | null} profile
 * @returns {boolean}
 */
export const isColorDisplay = (profile) => !!(profile?.features?.lcd || (profile?.name && (profile.name.includes("6-Color") || profile.name.includes("Color"))));
