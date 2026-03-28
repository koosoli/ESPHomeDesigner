/**
 * LVGL Configuration Generator
 * Handles generating ESPHome YAML for LVGL component, including hybrid mapping of native widgets.
 */

import { DEVICE_PROFILES } from './devices.js';
import { serializeWidget, serializeYamlObject } from './yaml_export_lvgl_serialization.js';
import { transpilePageWidget } from './yaml_export_lvgl_transpile.js';

export { convertAlign, convertColor, formatOpacity, getLVGLFont } from './yaml_export_lvgl_core.js';
export { serializeWidget } from './yaml_export_lvgl_serialization.js';
export { hasLVGLWidgets, stripDefaults } from './yaml_export_lvgl_transpile.js';

/**
 * @param {Page[]} pages
 * @param {string} deviceModel
 * @param {Record<string, any> | null} [profileOverride]
 * @param {Record<string, any>} [layout]
 * @returns {string[]}
 */
export function generateLVGLSnippet(pages, deviceModel, profileOverride = null, layout = {}) {
    /** @type {string[]} */
    const lines = [];
    const profiles = /** @type {Record<string, any>} */ (DEVICE_PROFILES || {});
    const profile = profileOverride || profiles[deviceModel] || {};

    lines.push("# ============================================================================");
    lines.push("# LVGL Configuration");
    lines.push("# ============================================================================");
    lines.push("");

    lines.push("lvgl:");
    lines.push("  id: my_lvgl");
    lines.push("  log_level: WARN");

    const isDarkMode = !!layout.darkMode;
    const bgColor = isDarkMode ? '"0x000000"' : '"0xFFFFFF"';
    lines.push(`  bg_color: ${bgColor}`);
    lines.push("  displays:");

    const displayId = profile.features?.lcd ? "my_display" : "epaper_display";
    lines.push(`    - ${displayId}`);

    if (profile.touch) {
        lines.push("  touchscreens:");
        lines.push("    - my_touchscreen");
    }

    if (layout.lcdEcoStrategy === 'dim_after_timeout') {
        const timeout = (layout.dimTimeout || 10) + "s";
        lines.push("  on_idle:");
        lines.push(`    timeout: ${timeout}`);
        lines.push("    then:");
        lines.push("      - light.turn_off: display_backlight");
        lines.push("      - lvgl.pause:");
    }
    lines.push("");

    lines.push("  pages:");

    pages.forEach((page, pageIndex) => {
        lines.push(`    - id: page_${pageIndex}`);

        if (page.layout && /^\d+x\d+$/.test(page.layout)) {
            lines.push(`      layout: ${page.layout}`);
        }

        lines.push("      widgets:");

        const widgets = /** @type {Widget[]} */ (page.widgets || []).filter((widget) => !widget.hidden && widget.type !== 'group');
        if (widgets.length === 0) {
            lines.push("        []");
            return;
        }

        widgets.forEach((widget) => {
            lines.push(`        ${serializeWidget(widget).replace(/^\/\//, '#')}`);

            const lvglWidget = transpilePageWidget(widget, profile, isDarkMode, page.layout);
            if (!lvglWidget) return;

            const typeKey = Object.keys(lvglWidget)[0];
            const props = lvglWidget[typeKey];

            lines.push(`        - ${typeKey}:`);
            serializeYamlObject(props, lines, 12);
        });
    });

    return lines;
}
