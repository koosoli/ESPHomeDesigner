import { WIDGET_CATEGORIES } from './widget_palette_catalog.js';

/**
 * Collect the unique widget types used by the palette.
 *
 * @param {Array<{ widgets: Array<{ type: string }> }>} [categories]
 * @returns {string[]}
 */
export function collectWidgetTypes(categories = WIDGET_CATEGORIES) {
    /** @type {string[]} */
    const allTypes = [];
    categories.forEach((category) => {
        category.widgets.forEach((widget) => {
            if (!allTypes.includes(widget.type)) {
                allTypes.push(widget.type);
            }
        });
    });
    return allTypes;
}

/**
 * Determine whether a category should be expanded for the current mode.
 *
 * @param {{ id: string, expanded?: boolean }} category
 * @param {string} currentMode
 * @returns {boolean}
 */
export function getCategoryExpansion(category, currentMode) {
    if (currentMode === 'lvgl') {
        return category.id === 'lvgl';
    }

    if (currentMode === 'oepl' || currentMode === 'opendisplay') {
        return category.id === 'opendisplay' || category.id === 'core' || category.id === 'shapes';
    }

    return !!category.expanded;
}

/**
 * Determine palette compatibility for a widget in a render mode.
 *
 * @param {{ type: string }} widget
 * @param {{ id: string }} category
 * @param {any} plugin
 * @param {string} currentMode
 * @returns {{ isCompatible: boolean, explanation: string }}
 */
export function getWidgetCompatibility(widget, category, plugin, currentMode) {
    let isCompatible = true;
    let explanation = '';

    if (plugin?.supportedModes) {
        return {
            isCompatible: plugin.supportedModes.includes(currentMode),
            explanation: `Not supported in ${currentMode} mode`
        };
    }

    if (currentMode === 'oepl' || currentMode === 'opendisplay') {
        const hasExport = currentMode === 'oepl' ? !!plugin?.exportOEPL : !!plugin?.exportOpenDisplay;
        const isExcludedCategory = category.id === 'ondevice' || category.id === 'lvgl';
        const isExcludedWidget = widget.type === 'calendar' || widget.type === 'weather_forecast'
            || widget.type === 'graph' || widget.type === 'quote_rss';

        isCompatible = hasExport && !isExcludedCategory && !isExcludedWidget;
        explanation = `Not supported in ${currentMode === 'oepl' ? 'OpenEpaperLink' : 'OpenDisplay'} mode`;
    } else if (currentMode === 'lvgl') {
        const isLvglNative = widget.type.startsWith('lvgl_');
        const isInputCategory = category.id === 'inputs';
        const hasLVGLExport = typeof plugin?.exportLVGL === 'function';

        isCompatible = isLvglNative || isInputCategory || hasLVGLExport;
        explanation = 'Widget not compatible with LVGL mode';
    } else if (currentMode === 'direct') {
        const isProtocolSpecific = widget.type.startsWith('lvgl_') || widget.type.startsWith('oepl_');
        if (!plugin) {
            isCompatible = !isProtocolSpecific;
        } else {
            isCompatible = !!plugin.export && !isProtocolSpecific;
        }
        explanation = 'Not supported in Direct rendering mode';
    }

    return { isCompatible, explanation };
}
