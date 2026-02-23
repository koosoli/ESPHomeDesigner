/**
 * Utility functions for color parsing and conversion.
 * Extracted from properties.js for modularity.
 */

export const MIXED_VALUE = "__mixed__";

/**
 * Parses a color input (named color, hex string, or ESPHome 0x hex) into a standard #RRGGBB hex string.
 * @param {string} c The color value to parse.
 * @returns {string} Standard hex color string.
 */
export function parseColor(c) {
    const names = {
        "black": "#000000", "white": "#FFFFFF", "red": "#FF0000", "green": "#00FF00",
        "blue": "#0000FF", "yellow": "#FFFF00", "gray": "#808080", "grey": "#808080"
    };
    if (!c) return "#000000";
    if (names[c.toLowerCase()]) return names[c.toLowerCase()];
    if (c.startsWith("0x")) return "#" + c.substring(2);
    if (c.startsWith("#")) return c;
    return "#000000";
}

/**
 * Converts a hex color string to an RGB object.
 * @param {string} h Hex color string.
 * @returns {Object} {r, g, b}
 */
export function hexToRgb(h) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : { r: 0, g: 0, b: 0 };
}

/**
 * Converts RGB values to a hex color string.
 * @param {number} r Red (0-255)
 * @param {number} g Green (0-255)
 * @param {number} b Blue (0-255)
 * @returns {string} Hex color string.
 */
export function rgbToHex(r, g, b) {
    const toHex = (c) => {
        const hx = Math.max(0, Math.min(255, c)).toString(16);
        return hx.length === 1 ? "0" + hx : hx;
    };
    return "#" + toHex(r) + toHex(g) + toHex(b);
}

/**
 * Generic HSL to RGB conversion helper if needed for advanced mixers.
 */
export function hslToRgb(h, s, l) {
    let r, g, b;
    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}

function hue2rgb(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
}
