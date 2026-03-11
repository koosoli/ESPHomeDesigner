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
});