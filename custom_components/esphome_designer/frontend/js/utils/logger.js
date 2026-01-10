const DEBUG = localStorage.getItem('esphome-designer-debug') === 'true';

export const Logger = {
    log: (...args) => DEBUG && console.log('[ESPHomeDesigner]', ...args),
    warn: (...args) => console.warn('[ESPHomeDesigner]', ...args),
    error: (...args) => console.error('[ESPHomeDesigner]', ...args),
};
