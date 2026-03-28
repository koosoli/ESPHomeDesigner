/** @type {Record<string, string>} */
const COLOR_NAME_MAP = {
    white: '#FFFFFF',
    black: '#000000',
    red: '#FF0000',
    green: '#00FF00',
    blue: '#0000FF',
    gray: '#808080',
    yellow: '#FFFF00',
    cyan: '#00FFFF',
    magenta: '#FF00FF'
};

/**
 * @param {string | undefined | null} hex
 * @param {boolean} [darkMode=false]
 * @returns {string}
 */
export function convertColor(hex, darkMode = false) {
    if (!hex) return '"0x000000"';
    const mapped = typeof hex === 'string' ? (COLOR_NAME_MAP[hex.toLowerCase()] || hex) : hex;

    if (mapped === "transparent") return '"0x000000"';
    if (mapped === "theme_auto") return darkMode ? '"0xFFFFFF"' : '"0x000000"';
    if (mapped === "theme_auto_inverse") return darkMode ? '"0x000000"' : '"0xFFFFFF"';
    if (mapped.startsWith("#")) {
        return '"0x' + mapped.substring(1).toUpperCase() + '"';
    }
    return `"${mapped}"`;
}

/**
 * @param {string | undefined | null} align
 * @returns {string}
 */
export function convertAlign(align) {
    if (!align) return "top_left";
    /** @type {Record<string, string>} */
    const mapping = {
        left: "top_left",
        center: "center",
        right: "top_right"
    };
    return mapping[align.toLowerCase()] || align.toLowerCase();
}

/**
 * @param {string | undefined | null} family
 * @param {number | undefined | null} size
 * @param {number | undefined | null} weight
 * @param {boolean | undefined | null} italic
 * @returns {string}
 */
export function getLVGLFont(family, size, weight, italic) {
    const f = (family || "Roboto").toLowerCase().replace(/\s+/g, "_");
    const w = weight || 400;
    const s = size || 20;
    const i = italic ? "_italic" : "";
    return `font_${f}_${w}_${s}${i}`;
}

/**
 * @param {number | string | undefined | null} opa
 * @returns {string}
 */
export function formatOpacity(opa) {
    if (opa === undefined || opa === null) return "cover";
    if (typeof opa === "number") {
        if (opa >= 255) return "cover";
        if (opa <= 0) return "transp";
        return Math.round((opa / 255) * 100) + "%";
    }
    return opa;
}
