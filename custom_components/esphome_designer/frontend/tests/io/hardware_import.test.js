import { beforeEach, describe, expect, it, vi } from 'vitest';

let hasBackend = true;
let haApiBase = 'http://localhost:8123/api/esphome_designer';

const loadExternalProfiles = vi.fn(async () => { });
const showToast = vi.fn();

vi.mock('../../js/utils/logger.js', () => ({
    Logger: {
        log: vi.fn(),
        warn: vi.fn(),
        error: vi.fn()
    }
}));

vi.mock('../../js/utils/env.js', () => ({
    hasHaBackend: () => hasBackend,
    get HA_API_BASE() {
        return haApiBase;
    }
}));

vi.mock('../../js/io/ha_api.js', () => ({
    getHaHeaders: vi.fn(() => ({ Authorization: 'Bearer token', 'Content-Type': 'application/json' }))
}));

vi.mock('../../js/utils/dom.js', () => ({
    showToast
}));

vi.mock('../../js/io/devices.js', () => ({
    DEVICE_PROFILES: {},
    loadExternalProfiles
}));

describe('hardware_import', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        hasBackend = true;
        haApiBase = 'http://localhost:8123/api/esphome_designer';
    });

    it('fetches dynamic profiles from backend endpoint', async () => {
        const mod = await import('../../js/io/hardware_import.js');

        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue({
                templates: [{ id: 't1' }, { id: 't2' }]
            })
        }));

        const profiles = await mod.fetchDynamicHardwareProfiles();
        expect(profiles).toHaveLength(2);
        expect(profiles[0].id).toBe('t1');
    });

    it('uploads hardware template via backend and refreshes profiles', async () => {
        const mod = await import('../../js/io/hardware_import.js');

        const file = {
            name: 'my_display.yaml',
            text: vi.fn().mockResolvedValue('display:\n  - platform: ili9xxx')
        };

        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue({ success: true, filename: file.name })
        }));

        const result = await mod.uploadHardwareTemplate(file);

        expect(result.success).toBe(true);
        expect(loadExternalProfiles).toHaveBeenCalledTimes(1);
        expect(showToast).toHaveBeenCalledWith('Hardware template uploaded successfully!', 'success');
    });

    it('suppresses benign network upload errors and still refreshes profiles', async () => {
        const mod = await import('../../js/io/hardware_import.js');

        const file = {
            name: 'network_flaky.yaml',
            text: vi.fn().mockResolvedValue('display:\n  - platform: ili9xxx')
        };

        vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Failed to fetch')));

        const result = await mod.uploadHardwareTemplate(file);

        expect(result.success).toBe(true);
        expect(result.note).toBe('network_error_suppressed');
        expect(loadExternalProfiles).toHaveBeenCalledTimes(1);
        expect(showToast).toHaveBeenCalledWith('Generating profile, refreshing list...', 'info');
    });

    it('throws on non-network upload errors and shows error toast', async () => {
        const mod = await import('../../js/io/hardware_import.js');

        const file = {
            name: 'bad.yaml',
            text: vi.fn().mockResolvedValue('display:\n  - platform: bad')
        };

        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: false,
            status: 500,
            json: vi.fn().mockResolvedValue({ message: 'bad upload' })
        }));

        await expect(mod.uploadHardwareTemplate(file)).rejects.toThrow('bad upload');
        expect(showToast).toHaveBeenCalledWith('Upload failed: bad upload', 'error');
    });

    it('reads offline profiles from localStorage safely', async () => {
        const mod = await import('../../js/io/hardware_import.js');

        localStorage.setItem('esphome-offline-profiles', JSON.stringify({
            p1: { id: 'p1', name: 'Profile 1' }
        }));

        const valid = mod.getOfflineProfilesFromStorage();
        expect(valid.p1.name).toBe('Profile 1');

        localStorage.setItem('esphome-offline-profiles', '{ invalid json');
        const fallback = mod.getOfflineProfilesFromStorage();
        expect(fallback).toEqual({});
    });
});
