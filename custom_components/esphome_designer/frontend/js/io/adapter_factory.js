import { ESPHomeAdapter } from './adapters/esphome_adapter';
import { OEPLAdapter } from './adapters/oepl_adapter.js';
import { OpenDisplayAdapter } from './adapters/opendisplay_adapter.js';

/** @typedef {'direct' | 'oepl' | 'opendisplay'} RenderingMode */
/** @typedef {import('./adapters/esphome_adapter').ESPHomeAdapter | import('./adapters/oepl_adapter.js').OEPLAdapter | import('./adapters/opendisplay_adapter.js').OpenDisplayAdapter} OutputAdapter */
/** @typedef {OutputAdapter & { mode: RenderingMode }} TaggedAdapter */

/**
 * @param {string | null | undefined} mode
 * @returns {TaggedAdapter}
 */
export function createAdapterForMode(mode) {
    /** @type {RenderingMode} */
    const resolvedMode = mode === 'oepl' || mode === 'opendisplay' ? mode : 'direct';

    /** @type {TaggedAdapter} */
    let adapter;
    if (resolvedMode === 'oepl') {
        adapter = /** @type {TaggedAdapter} */ (new OEPLAdapter());
    } else if (resolvedMode === 'opendisplay') {
        adapter = /** @type {TaggedAdapter} */ (new OpenDisplayAdapter());
    } else {
        adapter = /** @type {TaggedAdapter} */ (new ESPHomeAdapter());
    }

    adapter.mode = resolvedMode;
    return adapter;
}
