import { registry } from '../core/plugin_registry.js';
import { AppState } from '../core/state';
import { Logger } from '../utils/logger.js';
import { showToast } from '../utils/dom.js';
import { EVENTS, on } from '../core/events.js';
import { WIDGET_CATEGORIES } from './widget_palette_catalog.js';
import { collectWidgetTypes } from './widget_palette_rules.js';
import { renderWidgetPaletteContents } from './widget_palette_dom.js';

export { WIDGET_CATEGORIES } from './widget_palette_catalog.js';
export {
    collectWidgetTypes,
    getCategoryExpansion,
    getWidgetCompatibility
} from './widget_palette_rules.js';

export const PALETTE_WIDGET_TYPES = collectWidgetTypes();

/**
 * @param {string} containerId
 */
export async function renderWidgetPalette(containerId) {
    const container = /** @type {HTMLElement | null} */ (document.getElementById(containerId));
    if (!container) return;

    const currentMode = AppState?.settings?.renderingMode || 'direct';
    Logger.log(`[Palette] Rendering palette for mode: ${currentMode}`);

    container.innerHTML = '<div class="palette-loading" style="padding: 20px; color: #999; text-align: center; font-size: 13px;">Loading widgets...</div>';

    Logger.log(`[Palette] Pre-loading ${PALETTE_WIDGET_TYPES.length} widget plugins...`);
    await Promise.all(PALETTE_WIDGET_TYPES.map((type) => registry.load(type)))
        .catch((error) => Logger.error('[Palette] Failed to load some plugins:', error));

    renderWidgetPaletteContents({
        container,
        categories: WIDGET_CATEGORIES,
        currentMode,
        registry,
        showToast
    });
}

on(EVENTS.SETTINGS_CHANGED, (settings) => {
    if (settings && settings.renderingMode !== undefined) {
        Logger.log(`[Palette] Settings changed, refreshing palette for mode: ${settings.renderingMode}`);
        renderWidgetPalette('widgetPalette');
    }
});
