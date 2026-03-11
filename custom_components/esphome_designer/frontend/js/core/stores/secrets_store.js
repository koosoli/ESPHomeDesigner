import { Logger } from '../../utils/logger.js';

/** @typedef {'ai_api_key_gemini'|'ai_api_key_openai'|'ai_api_key_openrouter'} SecretKey */

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
     * @param {string} key 
     * @returns {string}
     */
    get(key) {
        const keys = /** @type {Record<string, string>} */ (this.keys);
        return keys[key] || "";
    }

    /**
     * @param {string} key 
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
            const keysToSave = {};
            Object.keys(this.keys).forEach(key => {
                if (key.startsWith('ai_api_key_')) {
                    keysToSave[key] = this.keys[key];
                }
            });
            localStorage.setItem('esphome-designer-ai-keys', JSON.stringify(keysToSave));
        } catch (e) {
            Logger.warn("[SecretsStore] Failed to save AI keys to localStorage:", e);
        }
    }

    loadFromLocalStorage() {
        try {
            const data = localStorage.getItem('esphome-designer-ai-keys');
            if (data) {
                const keys = JSON.parse(data);
                this.keys = { ...this.keys, ...keys };
                Logger.log("[SecretsStore] AI keys loaded from local storage");
            }
        } catch (e) {
            Logger.warn("[SecretsStore] Failed to load AI keys from localStorage:", e);
        }
    }
}
