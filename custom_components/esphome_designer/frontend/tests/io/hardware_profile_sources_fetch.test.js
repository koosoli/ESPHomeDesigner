import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockState, mockLogger } = vi.hoisted(() => ({
    mockState: {
        hasBackend: true,
        apiBase: 'http://localhost:8123/api/esphome_designer'
    },
    mockLogger: {
        log: vi.fn(),
        warn: vi.fn(),
        error: vi.fn()
    }
}));

vi.mock('../../js/utils/logger.js', () => ({
    Logger: mockLogger
}));

vi.mock('../../js/utils/env.js', () => ({
    hasHaBackend: () => mockState.hasBackend,
    get HA_API_BASE() {
        return mockState.apiBase;
    }
}));

vi.mock('../../js/io/ha_api.js', () => ({
    getHaHeaders: vi.fn(() => ({ Authorization: 'Bearer token' })),
    haFetch: vi.fn((url, options) => fetch(url, options))
}));

import {
    fetchDynamicHardwareProfiles,
    hardwareProfileRuntime,
    getOfflineProfilesFromStorage,
    parseHardwareRecipeClientSide,
    saveOfflineProfileToStorage
} from '../../js/io/hardware_profile_sources.js';

const defaultGetGlob = hardwareProfileRuntime.getGlob;
const defaultGetStorage = hardwareProfileRuntime.getStorage;

describe('hardware_profile_sources fetch and storage helpers', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockState.hasBackend = true;
        localStorage.clear();
        hardwareProfileRuntime.getGlob = () => undefined;
        hardwareProfileRuntime.getStorage = () => localStorage;
    });

    it('fetches hardware templates from the backend API when available', async () => {
        const fetchMock = vi.fn().mockResolvedValue({
            ok: true,
            json: vi.fn().mockResolvedValue({
                templates: [{ id: 'lcd_1' }, { id: 'lcd_2' }]
            })
        });
        vi.stubGlobal('fetch', fetchMock);

        const profiles = await fetchDynamicHardwareProfiles();

        expect(profiles).toEqual([{ id: 'lcd_1' }, { id: 'lcd_2' }]);
        expect(fetchMock).toHaveBeenCalledWith(
            'http://localhost:8123/api/esphome_designer/hardware/templates',
            expect.objectContaining({
                cache: 'no-store',
                headers: { Authorization: 'Bearer token' }
            })
        );
    });

    it('returns an empty list when no backend is available and bundled glob loading is unavailable', async () => {
        mockState.hasBackend = false;
        vi.unstubAllGlobals();

        const profiles = await fetchDynamicHardwareProfiles();

        expect(profiles).toEqual([]);
    });

    it('exposes bundled hardware files through the default runtime glob helper', () => {
        hardwareProfileRuntime.getGlob = defaultGetGlob;

        const globFn = hardwareProfileRuntime.getGlob();
        expect(typeof globFn).toBe('function');

        const files = globFn();
        expect(Object.keys(files).length).toBeGreaterThan(0);
    });

    it('falls back to bundled profiles when the backend request fails and skips invalid recipes', async () => {
        const fetchMock = vi.fn().mockRejectedValue(new Error('backend unavailable'));
        vi.stubGlobal('fetch', fetchMock);
        hardwareProfileRuntime.getGlob = () => () => ({
            '../../hardware/valid.yaml': `
# Name: Round Demo
# Resolution: 240x240
# Shape: round
esp8266:
display:
  - platform: ili9xxx
touchscreen:
`,
            '../../hardware/broken.yaml': /** @type {any} */ (null)
        });

        const profiles = await fetchDynamicHardwareProfiles();

        expect(profiles).toHaveLength(1);
        expect(profiles[0]).toMatchObject({
            id: 'valid',
            hardwarePackage: 'hardware/valid.yaml',
            shape: 'round',
            chip: 'esp8266'
        });
        expect(mockLogger.error).toHaveBeenCalledWith('Failed to fetch dynamic hardware templates from HA:', expect.any(Error));
        expect(mockLogger.warn).toHaveBeenCalledWith('[HardwareDiscovery] Failed to parse bundled file ../../hardware/broken.yaml:', expect.any(TypeError));
    });

    it('parses comment overrides and epaper-specific feature flags', () => {
        const profile = parseHardwareRecipeClientSide(`
# Name: Waveshare Test Panel
# Resolution: 296x128
# Shape: rect
# Chip: esp32-c6
# Board: waveshare-c6
# Inverted: true

esp32:
  board: fallback-board

display:
  - platform: waveshare_epaper
    model: "2.9in"
    color_palette: 6BIT
    color_order: RGB
    update_interval: 30s
    invert_colors: true
    # __LAMBDA_PLACEHOLDER__
`, 'waveshare-panel.yaml');

        expect(profile).toMatchObject({
            name: 'Waveshare Test Panel',
            chip: 'esp32-c6',
            board: 'waveshare-c6',
            displayPlatform: 'waveshare_epaper',
            displayModel: '2.9in',
            colorPalette: '6BIT',
            colorOrder: 'RGB',
            updateInterval: '30s',
            invertColors: true
        });
        expect(profile.features).toMatchObject({
            lcd: false,
            lvgl: false,
            epaper: true,
            inverted_colors: true
        });
    });

    it('detects plain esp32 and esp8266 boards from recipe content when no chip comment is provided', () => {
        const esp32Profile = parseHardwareRecipeClientSide(`
esp32:
  board: generic-devkit
display:
  - platform: ili9xxx
`, 'generic-panel.yaml');

        const esp8266Profile = parseHardwareRecipeClientSide(`
esp8266:
  board: d1_mini
display:
  - platform: ssd1306_i2c
`, 'mini-panel.yaml');

        expect(esp32Profile.chip).toBe('esp32');
        expect(esp8266Profile.chip).toBe('esp8266');
    });

    it('round-trips offline profiles through localStorage and tolerates corrupt data', () => {
        saveOfflineProfileToStorage({ id: 'profile_1', name: 'Profile 1' });
        saveOfflineProfileToStorage({ id: 'profile_2', name: 'Profile 2' });

        expect(getOfflineProfilesFromStorage()).toMatchObject({
            profile_1: { name: 'Profile 1' },
            profile_2: { name: 'Profile 2' }
        });

        localStorage.setItem('esphome-offline-profiles', '{ broken json');
        expect(getOfflineProfilesFromStorage()).toEqual({});
    });

    it('gracefully handles missing or failing storage access', () => {
        hardwareProfileRuntime.getStorage = () => null;
        saveOfflineProfileToStorage({ id: 'profile_3', name: 'Profile 3' });
        expect(getOfflineProfilesFromStorage()).toEqual({});

        const brokenStorage = {
            getItem: vi.fn(() => {
                throw new Error('read failed');
            }),
            setItem: vi.fn(),
            removeItem: vi.fn(),
            clear: vi.fn(),
            key: vi.fn(),
            length: 0
        };
        hardwareProfileRuntime.getStorage = () => /** @type {Storage} */ (brokenStorage);

        saveOfflineProfileToStorage({ id: 'profile_4', name: 'Profile 4' });
        expect(getOfflineProfilesFromStorage()).toEqual({});
        expect(mockLogger.warn).toHaveBeenCalledWith('No localStorage available for offline profiles.');
        expect(mockLogger.error).toHaveBeenCalledWith('Failed to save profile to localStorage:', expect.any(Error));
        expect(mockLogger.warn).toHaveBeenCalledWith('Could not load offline profiles from storage:', expect.any(Error));
    });

    it('returns null from the default storage helper when localStorage access throws', () => {
        hardwareProfileRuntime.getStorage = defaultGetStorage;

        const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
        Object.defineProperty(globalThis, 'localStorage', {
            configurable: true,
            get() {
                throw new Error('storage blocked');
            }
        });

        try {
            expect(hardwareProfileRuntime.getStorage()).toBeNull();
        } finally {
            if (descriptor) {
                Object.defineProperty(globalThis, 'localStorage', descriptor);
            } else {
                delete globalThis.localStorage;
            }
        }
    });
});
