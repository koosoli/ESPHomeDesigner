import { ESPHomeAdapter } from './adapters/esphome_adapter';
import { OEPLAdapter } from './adapters/oepl_adapter.js';
import { OpenDisplayAdapter } from './adapters/opendisplay_adapter.js';
import { CAdapter } from './adapters/c_adapter.js';

/** @typedef {'direct' | 'lvgl' | 'c' | 'oepl' | 'opendisplay'} RenderingMode */
/** @typedef {import('./adapters/esphome_adapter').ESPHomeAdapter | import('./adapters/c_adapter.js').CAdapter | import('./adapters/oepl_adapter.js').OEPLAdapter | import('./adapters/opendisplay_adapter.js').OpenDisplayAdapter} OutputAdapter */
/** @typedef {OutputAdapter & { mode: RenderingMode }} TaggedAdapter */

/**
 * @param {string | null | undefined} mode
 * @returns {TaggedAdapter}
 */
export function createAdapterForMode(mode) {
    /** @type {RenderingMode} */
    const resolvedMode = mode === 'oepl' || mode === 'opendisplay' || mode === 'c' || mode === 'lvgl'
        ? mode
        : 'direct';

    /** @type {TaggedAdapter} */
    let adapter;
    if (resolvedMode === 'oepl') {
        adapter = /** @type {TaggedAdapter} */ (new OEPLAdapter());
    } else if (resolvedMode === 'opendisplay') {
        adapter = /** @type {TaggedAdapter} */ (new OpenDisplayAdapter());
    } else if (resolvedMode === 'c') {
        adapter = /** @type {TaggedAdapter} */ (new CAdapter());
    } else {
        adapter = /** @type {TaggedAdapter} */ (new ESPHomeAdapter());
    }

    adapter.mode = resolvedMode;
    return adapter;
}
