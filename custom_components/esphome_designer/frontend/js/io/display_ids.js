/**
 * Resolve ESPHome component ids from hardware profiles.
 *
 * Package-based profiles can define ids that do not use the legacy
 * my_display/my_touchscreen defaults. Generators should use these helpers
 * whenever they reference display or touchscreen components by id.
 */

/**
 * @param {Record<string, any> | null | undefined} profile
 * @returns {string}
 */
export function resolveDisplayId(profile) {
    const isLcd = !!(profile?.features && (profile.features.lcd || profile.features.oled));
    return profile?.displayId
        || profile?.display_id
        || profile?.display?.id
        || (isLcd ? "my_display" : "epaper_display");
}

/**
 * @param {Record<string, any> | null | undefined} profile
 * @returns {string}
 */
export function resolveTouchscreenId(profile) {
    return profile?.touchscreenId
        || profile?.touchscreen_id
        || profile?.touch?.id
        || profile?.touch?.touchscreenId
        || "my_touchscreen";
}
