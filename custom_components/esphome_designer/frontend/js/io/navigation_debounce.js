/**
 * Page switching and raw touch de-duplication serve different purposes.
 * LCDs need a longer touch guard because panel updates can take roughly 2s,
 * while non-LCD touch targets should remain responsive.
 * @param {any} profile
 * @returns {number}
 */
export function getTouchDebounceMs(profile) {
    const features = profile?.features || {};
    return (features.lcd || features.oled) ? 2000 : 250;
}

/**
 * @param {any} profile
 * @returns {number}
 */
export function getPageSwitchDebounceMs(profile) {
    const features = profile?.features || {};
    const isEpaper = !!(features.epaper || features.epd);
    const isLcd = !!(features.lcd || features.oled) || !isEpaper;
    return isLcd ? 2000 : 3000;
}
