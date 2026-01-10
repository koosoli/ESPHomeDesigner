import { Logger } from '../../utils/logger.js';

export class SecretsStore {
    constructor() {
        this.keys = {
            ai_api_key_gemini: "",
            ai_api_key_openai: "",
            ai_api_key_openrouter: ""
        };
        this.loadFromLocalStorage();
    }

    get(key) {
        return this.keys[key];
    }

    set(key, value) {
        if (key in this.keys) {
            this.keys[key] = value;
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
