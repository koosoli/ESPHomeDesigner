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

/**
 * Convert a widget's alignment setting into the OpenDisplay anchor point and
 * matching reference coordinate. OpenDisplay positions text relative to the
 * anchor, so centered/right/bottom anchors must move away from the widget's
 * top-left corner.
 *
 * @param {{ x?: number, y?: number, width?: number, height?: number }} widget
 * @param {unknown} align
 * @param {string} [fallback='lt']
 * @returns {{ anchor: string, x: number, y: number }}
 */
export function openDisplayTextPosition(widget = {}, align, fallback = 'lt') {
    const anchor = openDisplayAnchorFromAlign(align, fallback);
    const baseX = Math.round(Number(widget.x) || 0);
    const baseY = Math.round(Number(widget.y) || 0);
    const width = Number(widget.width);
    const height = Number(widget.height);
    const hasWidth = Number.isFinite(width) && width > 0;
    const hasHeight = Number.isFinite(height) && height > 0;

    let x = baseX;
    let y = baseY;

    if (anchor[0] === 'm' && hasWidth) {
        x = Math.round(baseX + width / 2);
    } else if (anchor[0] === 'r' && hasWidth) {
        x = Math.round(baseX + width);
    }

    if (anchor[1] === 'm' && hasHeight) {
        y = Math.round(baseY + height / 2);
    } else if (anchor[1] === 'b' && hasHeight) {
        y = Math.round(baseY + height);
    }

    return { anchor, x, y };
}
