/**
 * Browser runtime helpers that keep DOM/global access explicit and guardable.
 */

/**
 * @returns {(Window & typeof globalThis) | null}
 */
export function getBrowserRuntime() {
    try {
        const runtime = /** @type {Partial<Window & typeof globalThis>} */ (globalThis);
        if (typeof runtime.addEventListener === "function" && typeof runtime.removeEventListener === "function") {
            return /** @type {Window & typeof globalThis} */ (runtime);
        }
        return null;
    } catch {
        return null;
    }
}

/**
 * @param {string} type
 * @param {EventListenerOrEventListenerObject} listener
 * @param {boolean | AddEventListenerOptions} [options]
 * @returns {boolean}
 */
export function addBrowserEventListener(type, listener, options) {
    const runtime = getBrowserRuntime();
    if (!runtime) return false;
    if (options === undefined) {
        runtime.addEventListener(type, listener);
    } else {
        runtime.addEventListener(type, listener, options);
    }
    return true;
}

/**
 * @param {string} type
 * @param {EventListenerOrEventListenerObject} listener
 * @param {boolean | EventListenerOptions} [options]
 * @returns {boolean}
 */
export function removeBrowserEventListener(type, listener, options) {
    const runtime = getBrowserRuntime();
    if (!runtime) return false;
    if (options === undefined) {
        runtime.removeEventListener(type, listener);
    } else {
        runtime.removeEventListener(type, listener, options);
    }
    return true;
}

/**
 * @param {Event} event
 * @returns {boolean}
 */
export function dispatchBrowserEvent(event) {
    const runtime = getBrowserRuntime();
    return runtime ? runtime.dispatchEvent(event) : false;
}

/**
 * @returns {boolean}
 */
export function isSecureBrowserContext() {
    const runtime = getBrowserRuntime();
    return !!runtime?.isSecureContext;
}

/**
 * @returns {{ x: number, y: number }}
 */
export function getViewportScrollPosition() {
    const runtime = getBrowserRuntime();
    return {
        x: runtime?.scrollX || 0,
        y: runtime?.scrollY || 0
    };
}

/**
 * @returns {number}
 */
export function getBrowserDevicePixelRatio() {
    const runtime = getBrowserRuntime();
    return runtime?.devicePixelRatio || 1;
}

/**
 * @param {Element} element
 * @returns {CSSStyleDeclaration | null}
 */
export function getBrowserComputedStyle(element) {
    const runtime = getBrowserRuntime();
    return runtime ? runtime.getComputedStyle(element) : null;
}
