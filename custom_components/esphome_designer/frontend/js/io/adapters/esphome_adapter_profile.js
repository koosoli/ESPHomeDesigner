import { Logger } from '../../utils/logger.js';

/**
 * @param {string} model
 * @param {any} layout
 * @param {Record<string, any>} deviceProfiles
 * @returns {any}
 */
export function resolveAdapterProfile(model, layout, deviceProfiles) {
    let profile = deviceProfiles[model] || {};

    if (model === 'custom' && layout.customHardware) {
        const ch = layout.customHardware;
        profile = {
            id: "custom",
            name: "Custom Device",
            chip: ch.chip || "esp32-s3",
            displayPlatform: ch.displayDriver || "generic_st7789",
            displayModel: ch.displayModel,
            resolution: { width: ch.resWidth || 800, height: ch.resHeight || 480 },
            shape: ch.shape || "rect",
            pins: {
                i2c: ch.pins?.sda ? { sda: ch.pins.sda, scl: ch.pins.scl } : null,
                spi: ch.pins?.clk ? { clk: ch.pins.clk, mosi: ch.pins.mosi } : null,
                display: {
                    cs: ch.pins?.cs,
                    dc: ch.pins?.dc,
                    reset: ch.pins?.rst,
                    busy: ch.pins?.busy
                }
            },
            features: {
                psram: !!ch.psram,
                lcd: ch.tech === 'lcd',
                epaper: ch.tech === 'epaper',
                touch: ch.touchTech && ch.touchTech !== 'none'
            },
            backlight: ch.pins?.backlight ? {
                platform: "gpio",
                pin: ch.pins.backlight
            } : null,
            touch: ch.touchTech && ch.touchTech !== 'none' ? {
                platform: ch.touchTech,
                sda: ch.pins?.sda,
                scl: ch.pins?.scl,
                interrupt_pin: ch.pins?.touch_int,
                reset_pin: ch.pins?.touch_rst
            } : null
        };
    }

    return profile;
}

/**
 * @param {any} layout
 * @param {any} profile
 * @param {any[]} pages
 * @param {any} appState
 * @returns {boolean}
 */
export function detectRenderingMode(layout, profile, pages, appState) {
    let isLvgl = !!(profile.features && (profile.features.lvgl || profile.features.lv_display));

    const userRenderingMode = layout.renderingMode || appState?.settings?.renderingMode || null;

    if (userRenderingMode === 'direct') {
        isLvgl = false;
        Logger.log("[ESPHomeAdapter] Rendering mode set to 'direct', skipping LVGL generation");
    } else if (userRenderingMode === 'lvgl') {
        isLvgl = true;
        Logger.log("[ESPHomeAdapter] Rendering mode set to 'lvgl', forcing LVGL generation");
    }

    if (!isLvgl) {
        for (const page of pages) {
            if (!page.widgets) continue;

            for (const widget of page.widgets.filter((candidate) => !candidate.hidden)) {
                if (widget.type.startsWith("lvgl_")) {
                    isLvgl = true;
                    break;
                }
            }

            if (isLvgl) break;
        }
    }

    return isLvgl;
}
