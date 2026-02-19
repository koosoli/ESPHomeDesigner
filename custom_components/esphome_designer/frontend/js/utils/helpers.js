/**
 * Generates a unique ID for widgets.
 * @returns {string} The generated ID.
 */
export function generateId() {
    return 'w_' + Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

// Polyfill/Fallback for crypto.randomUUID which is only available in secure contexts
if (typeof crypto !== 'undefined' && !crypto.randomUUID) {
    crypto.randomUUID = function () {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    };
} else if (typeof crypto === 'undefined') {
    // Very basic fallback if crypto itself is missing (unlikely in modern browsers)
    window.crypto = {
        randomUUID: () => 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }),
        getRandomValues: (arr) => arr.map(() => Math.floor(Math.random() * 256))
    };
}

/**
 * Debounces a function.
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The wait time in milliseconds.
 * @returns {Function} The debounced function.
 */
export function debounce(func, wait) {
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
 * @param {Object} obj - The object to clone.
 * @returns {Object} The cloned object.
 */
export function deepClone(obj) {
    return JSON.parse(JSON.stringify(obj));
}

/**
 * Access nested properties in an object using a string path (e.g. "entries.days.0.day")
 * @param {Object} obj - The object to traverse.
 * @param {string} path - The path to the desired property.
 * @returns {*} The value at the specified path, or undefined if not found.
 */
export const getNestedValue = (obj, path) => {
    if (!obj || !path) return undefined;
    const parts = path.replace(/\[(\w+)\]/g, '.$1').replace(/^\./, '').split('.');
    let current = obj;
    for (const part of parts) {
        if (current === null || current === undefined) return undefined;
        current = current[part];
    }
    return current;
};

// Global exposure for transition
window.generateId = generateId;
window.debounce = debounce;
window.deepClone = deepClone;
window.getNestedValue = getNestedValue;
