/**
 * Valid Google Font weights for built-in font presets.
 * Source of truth — imported by both the UI (properties.js) and YAML export (font_registry.js).
 * @see https://github.com/koosoli/ESPHomeDesigner/issues/317
 */
export const FONT_WEIGHTS = {
    "Roboto": [100, 300, 400, 500, 700, 900],
    "Inter": [100, 200, 300, 400, 500, 600, 700, 800, 900],
    "Open Sans": [300, 400, 500, 600, 700, 800],
    "Lato": [100, 300, 400, 700, 900],
    "Montserrat": [100, 200, 300, 400, 500, 600, 700, 800, 900],
    "Poppins": [100, 200, 300, 400, 500, 600, 700, 800, 900],
    "Raleway": [100, 200, 300, 400, 500, 600, 700, 800, 900],
    "Roboto Mono": [100, 200, 300, 400, 500, 600, 700],
    "Ubuntu": [300, 400, 500, 700],
    "Nunito": [200, 300, 400, 500, 600, 700, 800, 900],
    "Playfair Display": [400, 500, 600, 700, 800, 900],
    "Merriweather": [300, 400, 700, 900],
    "Work Sans": [100, 200, 300, 400, 500, 600, 700, 800, 900],
    "Source Sans Pro": [200, 300, 400, 600, 700, 900],
    "Quicksand": [300, 400, 500, 600, 700]
};

/**
 * Returns valid weights for a font family, falling back to the full 100–900 range for unknown fonts.
 * @param {string} family
 * @returns {number[]}
 */
export function getWeightsForFont(family) {
    return FONT_WEIGHTS[family] || [100, 200, 300, 400, 500, 600, 700, 800, 900];
}

/**
 * Clamps a weight to the nearest valid value for a given font family.
 * @param {string} family
 * @param {number} weight
 * @returns {number}
 */
export function clampFontWeight(family, weight) {
    const w = parseInt(weight, 10);
    const available = getWeightsForFont(family);
    if (available.includes(w)) return w;
    return available.reduce((prev, curr) => Math.abs(curr - w) < Math.abs(prev - w) ? curr : prev);
}
