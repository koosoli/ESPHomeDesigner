/**
 * Generates a unique ID for widgets.
 * @returns {string} The generated ID.
 */
export function generateId() {
    return 'w_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
}

/**
 * @typedef {{
 *   randomUUID?: () => string,
 *   getRandomValues: (values: Uint8Array) => Uint8Array
 * }} CryptoLike
 */

/** @type {{ crypto?: CryptoLike }} */
const globalScope = /** @type {any} */ (globalThis);

// Polyfill/Fallback for crypto.randomUUID which is only available in secure contexts
if (typeof globalScope.crypto !== 'undefined' && !globalScope.crypto.randomUUID) {
    Object.defineProperty(globalScope.crypto, 'randomUUID', {
        value: function () {
            const template = '10000000-1000-4000-8000-100000000000';
            return template.replace(/[018]/g, (char) => {
                const nibble = Number(char);
                const randomByte = globalScope.crypto?.getRandomValues(new Uint8Array(1))[0] ?? 0;
                return (nibble ^ ((randomByte & 15) >> (nibble / 4))).toString(16);
            });
        }
    });
} else if (typeof globalScope.crypto === 'undefined') {
    // Very basic fallback if crypto itself is missing (unlikely in modern browsers)
    globalScope.crypto = {
        randomUUID: () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }),
        /** @param {Uint8Array} values */
        getRandomValues: (values) => {
            for (let index = 0; index < values.length; index += 1) {
                values[index] = Math.floor(Math.random() * 256);
            }
            return values;
        }
    };
}

/**
 * Debounces a function.
 * @template {Function} T
 * @param {T} func - The function to debounce.
 * @param {number} wait - The wait time in milliseconds.
 * @returns {(...args: any[]) => void} The debounced function.
 */
export function debounce(func, wait) {
    /** @type {any} */
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Deep clones an object.
 * @template T
 * @param {T} obj - The object to clone.
 * @returns {T} The cloned object.
 */
export function deepClone(obj) {
    if (obj === undefined) return /** @type {T} */ (undefined);
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Access nested properties in an object using a string path (e.g. "entries.days.0.day")
 * @param {any} obj - The object to traverse.
 * @param {string} path - The path to the desired property.
 * @returns {any} The value at the specified path, or undefined if not found.
 */
export const getNestedValue = (obj, path) => {
    if (!obj || !path) return undefined;
    const parts = path.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '').split('.');
    let current = obj;
    for (const part of parts) {
        if (current === null || current === undefined) return undefined;
        const candidate = /** @type {any} */ (current);
        current = candidate[part];
    }
    return current;
};


