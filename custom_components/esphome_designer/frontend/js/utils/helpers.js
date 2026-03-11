/**
 * Generates a unique ID for widgets.
 * @returns {string} The generated ID.
 */
export function generateId() {
    return 'w_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 7);
}

// Polyfill/Fallback for crypto.randomUUID which is only available in secure contexts
if (typeof crypto !== 'undefined' && !crypto.randomUUID) {
    Object.defineProperty(crypto, 'randomUUID', {
        value: function () {
            // @ts-ignore
            return /** @type {any} */ (([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
                (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> (c / 4)).toString(16)
            ));
        }
    });
} else if (typeof crypto === 'undefined') {
    // Very basic fallback if crypto itself is missing (unlikely in modern browsers)
    // @ts-ignore
    window.crypto = {
        randomUUID: () => /** @type {any} */('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        })),
        // @ts-ignore
        getRandomValues: (arr) => arr.map(() => Math.floor(Math.random() * 256))
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
        // @ts-ignore
        current = current[part];
    }
    return current;
};


