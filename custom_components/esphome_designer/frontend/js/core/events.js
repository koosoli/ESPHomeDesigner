/**
 * Global Event Bus using native EventTarget.
 */
export const EventBus = new EventTarget();

/**
 * Event names constants.
 */
export const EVENTS = {
    STATE_CHANGED: 'state-changed',       // General state update
    SELECTION_CHANGED: 'selection-changed', // Widget selection changed
    PAGE_CHANGED: 'page-changed',         // Current page changed
    HISTORY_CHANGED: 'history-changed',   // Undo/Redo stack changed
    SETTINGS_CHANGED: 'settings-changed', // Device/Editor settings changed
    LAYOUT_IMPORTED: 'layout-imported',   // New layout loaded
    ENTITIES_LOADED: 'entities-loaded',   // HA entities fetched
    ZOOM_CHANGED: 'zoom-changed'          // Canvas zoom level changed
};

/**
 * Helper to dispatch events with data.
 * @param {string} eventName 
 * @param {any} detail 
 */
export function emit(eventName, detail = {}) {
    EventBus.dispatchEvent(new CustomEvent(eventName, { detail }));
}

/**
 * Helper to listen to events.
 * @param {string} eventName 
 * @param {Function} callback 
 */
export function on(eventName, callback) {
    EventBus.addEventListener(eventName, (e) => callback(e.detail));
}

/**
 * Helper to remove listener.
 * @param {string} eventName 
 * @param {Function} callback 
 */
export function off(eventName, callback) {
    EventBus.removeEventListener(eventName, callback);
}

// Expose to window for global access
window.EventBus = EventBus;
window.EVENTS = EVENTS;
window.emit = emit;
window.on = on;
window.off = off;
