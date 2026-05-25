const ODP_ANCHOR_ALIASES = Object.freeze({
    lt: 'lt',
    lm: 'lm',
    lb: 'lb',
    mt: 'mt',
    mm: 'mm',
    mb: 'mb',
    rt: 'rt',
    rm: 'rm',
    rb: 'rb',
    tl: 'lt',
    tc: 'mt',
    tr: 'rt',
    cl: 'lm',
    cc: 'mm',
    cr: 'rm',
    bl: 'lb',
    bc: 'mb',
    br: 'rb',
    ct: 'mt',
    cm: 'mm',
    cb: 'mb'
});

export const OPEN_DISPLAY_ALIGN_ANCHORS = Object.freeze({
    TOP_LEFT: 'lt',
    TOP_CENTER: 'mt',
    TOP_RIGHT: 'rt',
    CENTER_LEFT: 'lm',
    CENTER: 'mm',
    CENTER_RIGHT: 'rm',
    BOTTOM_LEFT: 'lb',
    BOTTOM_CENTER: 'mb',
    BOTTOM_RIGHT: 'rb'
});

/**
 * Normalize legacy center/top anchors (for example `ct`) to Pillow-style
 * OpenDisplay anchors (for example `mt`).
 *
 * @param {unknown} value
 * @param {string} [fallback='lt']
 * @returns {string}
 */
export function normalizeOpenDisplayAnchor(value, fallback = 'lt') {
    const normalized = String(value || '').trim().toLowerCase();
    if (!normalized) return fallback;
    return ODP_ANCHOR_ALIASES[normalized] || normalized;
}

/**
 * @param {unknown} align
 * @param {string} [fallback='lt']
 * @returns {string}
 */
export function openDisplayAnchorFromAlign(align, fallback = 'lt') {
    const key = String(align || '').trim().toUpperCase();
    return OPEN_DISPLAY_ALIGN_ANCHORS[key] || fallback;
}
