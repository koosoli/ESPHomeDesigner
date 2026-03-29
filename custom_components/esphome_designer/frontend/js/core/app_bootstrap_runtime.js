export const APP_BOOT_KEY = '__ESPHOME_DESIGNER_BOOT_PROMISE__';

/**
 * @param {any} [runtimeGlobal]
 * @returns {any}
 */
export function getDesignerNamespace(
    runtimeGlobal = /** @type {any} */ (globalThis)
) {
    runtimeGlobal.ESPHomeDesigner = runtimeGlobal.ESPHomeDesigner || {};
    return runtimeGlobal.ESPHomeDesigner;
}

/**
 * @param {Document} [root]
 * @returns {boolean}
 */
export function hasBootstrapSurface(root = document) {
    return Boolean(
        root.getElementById('header-placeholder')
        || root.querySelector('.app-content')
        || root.getElementById('widgetPalette')
        || root.getElementById('canvas')
        || root.querySelector('[data-esphome-designer-panel-root]')
    );
}

/**
 * @param {Document} [root]
 * @returns {boolean}
 */
export function hasUiPlaceholders(root = document) {
    return Boolean(
        root.getElementById('header-placeholder')
        || root.getElementById('sidebar-placeholder')
        || root.getElementById('code-panel-placeholder')
        || root.getElementById('properties-panel-placeholder')
        || root.getElementById('modals-placeholder')
    );
}

/**
 * @param {any} app
 * @param {any} [runtimeGlobal]
 */
export function attachAppNamespace(
    app,
    runtimeGlobal = /** @type {any} */ (globalThis)
) {
    const namespace = getDesignerNamespace(runtimeGlobal);
    namespace.app = app;
    namespace.ui = {
        sidebar: app.sidebar,
        canvas: app.canvas,
        properties: app.propertiesPanel
    };
}

/**
 * @param {any} appState
 * @param {any} [runtimeGlobal]
 */
export function attachStateNamespace(
    appState,
    runtimeGlobal = /** @type {any} */ (globalThis)
) {
    const namespace = getDesignerNamespace(runtimeGlobal);
    namespace.state = appState;
}

/**
 * @param {any} [runtimeGlobal]
 * @returns {Promise<any> | null}
 */
export function getBootPromise(runtimeGlobal = /** @type {any} */ (globalThis)) {
    return runtimeGlobal[APP_BOOT_KEY] || null;
}

/**
 * @param {Promise<any>} bootPromise
 * @param {any} [runtimeGlobal]
 * @returns {Promise<any>}
 */
export function setBootPromise(bootPromise, runtimeGlobal = /** @type {any} */ (globalThis)) {
    runtimeGlobal[APP_BOOT_KEY] = bootPromise;
    return bootPromise;
}

/**
 * @param {any} [runtimeGlobal]
 */
export function clearBootPromise(runtimeGlobal = /** @type {any} */ (globalThis)) {
    delete runtimeGlobal[APP_BOOT_KEY];
}
