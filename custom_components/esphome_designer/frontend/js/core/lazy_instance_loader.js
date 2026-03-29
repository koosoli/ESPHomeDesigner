import { Logger } from '../utils/logger.js';

/**
 * @template TModule
 * @template TInstance
 * @param {{
 *   label: string,
 *   load: () => Promise<TModule>,
 *   create: (module: TModule) => TInstance | Promise<TInstance>
 * }} options
 * @returns {() => Promise<TInstance>}
 */
export function createLazyInstanceLoader({ label, load, create }) {
    /** @type {TInstance | null} */
    let instance = null;
    /** @type {Promise<TInstance> | null} */
    let pending = null;

    return async () => {
        if (instance) {
            return instance;
        }

        if (!pending) {
            pending = Promise.resolve(load())
                .then(async (module) => {
                    const created = await create(module);
                    instance = created;
                    Logger.log(`[App] ${label} lazy-loaded`);
                    return created;
                })
                .catch((error) => {
                    pending = null;
                    throw error;
                });
        }

        const resolved = await pending;
        instance = resolved;
        return resolved;
    };
}
