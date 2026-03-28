/**
 * @vitest-environment jsdom
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('../../js/utils/logger.js', () => ({
    Logger: { log: vi.fn(), warn: vi.fn(), error: vi.fn() }
}));

describe('env manual HA URL handling', () => {
    beforeEach(() => {
        localStorage.clear();
        vi.resetModules();
    });

    it('stores valid HA base URLs with the API suffix appended', async () => {
        const mod = await import('../../js/utils/env.js');

        mod.setHaManualUrl('https://ha.example:8123');

        expect(localStorage.getItem('ha_manual_url')).toBe('https://ha.example:8123/api/esphome_designer');
    });

    it('rejects invalid autofill-like values instead of overwriting storage', async () => {
        const mod = await import('../../js/utils/env.js');

        localStorage.setItem('ha_manual_url', 'https://ha.example:8123/api/esphome_designer');
        mod.setHaManualUrl('tyeth');

        expect(localStorage.getItem('ha_manual_url')).toBe('https://ha.example:8123/api/esphome_designer');
    });

    it('ignores invalid stored manual URLs during backend detection', async () => {
        localStorage.setItem('ha_manual_url', 'tyeth/api/esphome_designer');
        const mod = await import('../../js/utils/env.js');

        expect(mod.detectHaBackendBaseUrl()).toBeNull();
    });

    it('detects deployed HA paths, refreshes the cached base URL, and reports deployment state', async () => {
        Object.defineProperty(globalThis, 'location', {
            configurable: true,
            value: {
                protocol: 'https:',
                hostname: 'homeassistant',
                pathname: '/esphome-designer/editor',
                origin: 'https://ha.local'
            }
        });

        const mod = await import('../../js/utils/env.js');

        expect(mod.detectHaBackendBaseUrl()).toBe('https://ha.local/api/esphome_designer');
        mod.refreshHaBaseUrl();
        expect(mod.HA_API_BASE).toBe('https://ha.local/api/esphome_designer');
        expect(mod.hasHaBackend()).toBe(true);
        expect(mod.isDeployedInHa()).toBe(true);
    });

    it('stores and clears HA tokens via the storage helpers', async () => {
        const mod = await import('../../js/utils/env.js');

        mod.setHaToken('secret-token');
        expect(mod.getHaToken()).toBe('secret-token');

        mod.setHaToken(null);
        expect(mod.getHaToken()).toBeNull();
    });

    it('uses an embedded HA runtime token for requests without exposing it as a stored token', async () => {
        Object.defineProperty(globalThis, 'name', {
            configurable: true,
            value: JSON.stringify({
                type: 'esphome-designer-ha-auth',
                accessToken: 'runtime-token'
            })
        });

        const mod = await import('../../js/utils/env.js');

        expect(mod.getHaRequestToken()).toBe('runtime-token');
        expect(mod.getHaToken()).toBeNull();
    });

    it('updates the runtime token from same-origin postMessage events and ignores foreign origins', async () => {
        Object.defineProperty(globalThis, 'location', {
            configurable: true,
            value: {
                protocol: 'https:',
                hostname: 'ha.local',
                pathname: '/esphome-designer/editor',
                origin: 'https://ha.local'
            }
        });
        Object.defineProperty(globalThis, 'name', {
            configurable: true,
            value: 'not-json'
        });

        const mod = await import('../../js/utils/env.js');

        expect(mod.getHaRequestToken()).toBeNull();

        globalThis.dispatchEvent(new MessageEvent('message', {
            origin: 'https://example.com',
            data: {
                type: 'esphome-designer-ha-auth',
                accessToken: 'foreign-token'
            }
        }));
        expect(mod.getHaRequestToken()).toBeNull();

        globalThis.dispatchEvent(new MessageEvent('message', {
            origin: 'https://ha.local',
            data: {
                type: 'esphome-designer-ha-auth',
                accessToken: 'runtime-message-token'
            }
        }));
        expect(mod.getHaRequestToken()).toBe('runtime-message-token');
    });

    it('normalizes legacy dashboard URLs and rejects unsupported protocols', async () => {
        const mod = await import('../../js/utils/env.js');

        expect(mod.normalizeHaManualUrl('https://ha.local/api/reterminal_dashboard')).toBe(
            'https://ha.local/api/esphome_designer'
        );
        expect(mod.normalizeHaManualUrl('ftp://ha.local')).toBeNull();
    });

    it('treats file:// origins as non-deployed and safely handles broken storage access', async () => {
        Object.defineProperty(globalThis, 'location', {
            configurable: true,
            value: {
                protocol: 'file:',
                hostname: '',
                pathname: '/index.html',
                origin: 'file://'
            }
        });

        const localStorageDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
        Object.defineProperty(globalThis, 'localStorage', {
            configurable: true,
            get() {
                throw new Error('blocked storage');
            }
        });

        const mod = await import('../../js/utils/env.js');

        expect(mod.getHaManualUrl()).toBeNull();
        expect(mod.getHaToken()).toBeNull();
        expect(mod.detectHaBackendBaseUrl()).toBeNull();
        expect(mod.isDeployedInHa()).toBe(false);
        expect(() => mod.setHaManualUrl('https://ha.local')).not.toThrow();
        expect(() => mod.setHaToken('token')).not.toThrow();

        if (localStorageDescriptor) {
            Object.defineProperty(globalThis, 'localStorage', localStorageDescriptor);
        }
    });
});
