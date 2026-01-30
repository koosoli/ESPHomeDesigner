const DEBUG = (typeof localStorage !== 'undefined' ? localStorage.getItem('esphome-designer-debug') : process.env.DEBUG) === 'true';

export const Logger = {
    log: (...args) => DEBUG && console.log('[ESPHomeDesigner]', ...args),
    warn: (...args) => console.warn('[ESPHomeDesigner]', ...args),
    error: (...args) => console.error('[ESPHomeDesigner]', ...args),
};
