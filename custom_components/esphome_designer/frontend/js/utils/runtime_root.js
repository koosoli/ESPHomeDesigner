export const DESIGNER_PANEL_ROOT_ATTR = 'data-esphome-designer-panel-root';
export const DESIGNER_PANEL_OVERLAY_ATTR = 'data-esphome-designer-overlay-root';

/**
 * @returns {HTMLElement}
 */
export function getDesignerRuntimeRoot() {
    return /** @type {HTMLElement} */ (
        document.querySelector(`[${DESIGNER_PANEL_ROOT_ATTR}]`) || document.body
    );
}

/**
 * @returns {HTMLElement}
 */
export function getDesignerOverlayRoot() {
    return /** @type {HTMLElement} */ (
        document.querySelector(`[${DESIGNER_PANEL_OVERLAY_ATTR}]`) || getDesignerRuntimeRoot()
    );
}

/**
 * @template {Node} T
 * @param {T} node
 * @returns {T}
 */
export function appendToDesignerRoot(node) {
    getDesignerRuntimeRoot().appendChild(node);
    return node;
}

/**
 * @template {Node} T
 * @param {T} node
 * @returns {T}
 */
export function appendToDesignerOverlayRoot(node) {
    getDesignerOverlayRoot().appendChild(node);
    return node;
}
