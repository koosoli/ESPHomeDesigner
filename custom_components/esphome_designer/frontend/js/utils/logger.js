// @ts-ignore
const DEBUG = (typeof localStorage !== 'undefined' ? localStorage.getItem('esphome-designer-debug') : (typeof process !== 'undefined' && process.env ?
    // @ts-ignore
    process.env.DEBUG : '')) === 'true' ||
    (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('debug') === 'true');

export const Logger = {
    /** @param {any[]} args */
    log: (...args) => DEBUG && console.log('[ESPHomeDesigner]', ...args),
    /** @param {any[]} args */
    warn: (...args) => console.warn('[ESPHomeDesigner]', ...args),
    /** @param {any[]} args */
    error: (...args) => console.error('[ESPHomeDesigner]', ...args),
};
