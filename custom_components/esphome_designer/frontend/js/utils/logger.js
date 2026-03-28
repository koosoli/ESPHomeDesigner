/**
 * @typedef {{ env?: Record<string, string | undefined> }} ProcessLike
 */
import { getBrowserRuntime } from './browser_runtime.js';

/** @type {{ process?: ProcessLike }} */
const globalScope = /** @type {any} */ (globalThis);
const processRef = globalScope.process;
const browserRuntime = getBrowserRuntime();

const DEBUG = (typeof localStorage !== 'undefined' ? localStorage.getItem('esphome-designer-debug') : (processRef?.env?.DEBUG || '')) === 'true' ||
    (!!browserRuntime && new URLSearchParams(browserRuntime.location.search).get('debug') === 'true');

export const Logger = {
    /** @param {any[]} args */
    log: (...args) => DEBUG && console.log('[ESPHomeDesigner]', ...args),
    /** @param {any[]} args */
    warn: (...args) => console.warn('[ESPHomeDesigner]', ...args),
    /** @param {any[]} args */
    error: (...args) => console.error('[ESPHomeDesigner]', ...args),
};
