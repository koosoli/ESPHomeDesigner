import { Logger } from '../../utils/logger.js';

/** @typedef {'ai_api_key_gemini'|'ai_api_key_openai'|'ai_api_key_openrouter'} SecretKey */

/** @returns {Storage | null} */
function getWebStorage() {
    try {
        return globalThis.localStorage ?? null;
    } catch {
        return null;
    }
}

export class SecretsStore {
    constructor() {
        /** @type {Record<SecretKey, string>} */
        this.keys = {
            ai_api_key_gemini: "",
            ai_api_key_openai: "",
            ai_api_key_openrouter: ""
        };
        this.loadFromLocalStorage();
    }

    /**
     * @param {SecretKey | string} key
     * @returns {string}
     */
    get(key) {
        const keys = /** @type {Record<string, string>} */ (this.keys);
        return keys[key] || "";
    }

    /**
     * @param {SecretKey | string} key
     * @param {string} value
     */
    set(key, value) {
        if (key in this.keys) {
            const keys = /** @type {Record<string, string>} */ (this.keys);
            keys[key] = value;
            this.saveToLocalStorage();
        }
    }

    saveToLocalStorage() {
        try {
            const storage = getWebStorage();
            if (!storage) return;

            /** @type {Partial<Record<SecretKey, string>>} */
            const keysToSave = {};
            Object.keys(this.keys).forEach((/** @type {string} */ key) => {
                if (key.startsWith('ai_api_key_')) {
                    keysToSave[/** @type {SecretKey} */ (key)] = this.keys[/** @type {SecretKey} */ (key)];
                }
            });
            storage.setItem('esphome-designer-ai-keys', JSON.stringify(keysToSave));
        } catch (e) {
            Logger.warn("[SecretsStore] Failed to save AI keys to localStorage:", e);
        }
    }

    loadFromLocalStorage() {
        try {
            const storage = getWebStorage();
            if (!storage) return;

            const data = storage.getItem('esphome-designer-ai-keys');
            if (data) {
                const keys = JSON.parse(data);
                if (keys && typeof keys === 'object') {
                    this.keys = {
                        ...this.keys,
                        .../** @type {Partial<Record<SecretKey, string>>} */ (keys)
                    };
                    Logger.log("[SecretsStore] AI keys loaded from local storage");
                }
            }
        } catch (e) {
            Logger.warn("[SecretsStore] Failed to load AI keys from localStorage:", e);
        }
    }
}
