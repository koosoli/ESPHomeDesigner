import { beforeEach, describe, expect, it, vi } from 'vitest';

const {
    mockState,
    mockEmit,
    mockShowToast,
    mockDeviceProfiles
} = vi.hoisted(() => ({
    mockState: {
        hasBackend: false
    },
    mockEmit: vi.fn(),
    mockShowToast: vi.fn(),
    mockDeviceProfiles: {}
}));

vi.mock('../../js/utils/logger.js', () => ({
    Logger: {
        log: vi.fn(),
        warn: vi.fn(),
        error: vi.fn()
    }
}));

vi.mock('../../js/utils/env.js', () => ({
    hasHaBackend: () => mockState.hasBackend,
    HA_API_BASE: 'http://localhost:8123/api/esphome_designer'
}));

vi.mock('../../js/io/ha_api.js', () => ({
    getHaHeaders: vi.fn(() => ({ Authorization: 'Bearer token' })),
    haFetch: vi.fn((url, options) => fetch(url, options))
}));

vi.mock('../../js/utils/dom.js', () => ({
    showToast: mockShowToast
}));

vi.mock('../../js/core/events.js', () => ({
    emit: mockEmit,
    EVENTS: {
        DEVICE_PROFILES_UPDATED: 'device_profiles_updated'
    }
}));

vi.mock('../../js/io/devices.js', () => ({
    DEVICE_PROFILES: mockDeviceProfiles,
    loadExternalProfiles: vi.fn()
}));

describe('hardware_import offline mode', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockState.hasBackend = false;
        localStorage.clear();
        for (const key of Object.keys(mockDeviceProfiles)) {
            delete mockDeviceProfiles[key];
        }
    });

    it('parses offline templates, persists them, and emits a profile update', async () => {
        class SuccessfulFileReader {
            readAsText(file) {
                this.onload?.({
                    target: {
                        result: file.__content
                    }
                });
            }
        }

        vi.stubGlobal('FileReader', SuccessfulFileReader);

        const mod = await import('../../js/io/hardware_import.js');
        const file = {
            name: 'offline-display.yaml',
            __content: `
# Name: Offline LCD
# Resolution: 320x240

display:
  - platform: ili9xxx
    # __LAMBDA_PLACEHOLDER__
`
        };

        const profile = await mod.uploadHardwareTemplate(file);

        expect(profile.name).toBe('Offline LCD');
        expect(mockDeviceProfiles[profile.id]).toMatchObject({
            id: profile.id,
            name: 'Offline LCD'
        });
        expect(JSON.parse(localStorage.getItem('esphome-offline-profiles'))).toHaveProperty(profile.id);
        expect(mockShowToast).toHaveBeenCalledWith('Imported Offline LCD (Offline Mode)', 'success');
        expect(mockEmit).toHaveBeenCalledWith('device_profiles_updated');
    });

    it('rejects invalid offline templates before mutating runtime state', async () => {
        class InvalidFileReader {
            readAsText(file) {
                this.onload?.({
                    target: {
                        result: file.__content
                    }
                });
            }
        }

        vi.stubGlobal('FileReader', InvalidFileReader);

        const mod = await import('../../js/io/hardware_import.js');
        const file = {
            name: 'broken.yaml',
            __content: 'display:\n  - platform: ili9xxx\n'
        };

        await expect(mod.uploadHardwareTemplate(file)).rejects.toThrow('Missing __LAMBDA_PLACEHOLDER__');
        expect(Object.keys(mockDeviceProfiles)).toHaveLength(0);
        expect(mockEmit).not.toHaveBeenCalled();
        expect(mockShowToast).toHaveBeenCalledWith('Invalid template: Missing __LAMBDA_PLACEHOLDER__', 'error');
    });
});
