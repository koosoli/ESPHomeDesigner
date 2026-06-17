import { beforeEach, describe, expect, it, vi } from 'vitest';

const mockLogger = {
    log: vi.fn(),
    warn: vi.fn(),
    error: vi.fn()
};

const mockAppState = {
    settings: {
        lcdEcoStrategy: 'backlight_off',
        renderingMode: 'direct'
    }
};

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

vi.mock('../../js/io/devices.js', () => ({
    DEVICE_PROFILES: {
        reterminal_e1001: { name: 'reTerminal e1001' },
        user_profile: { name: 'Imported Profile', isCustomProfile: true }
    },
    SUPPORTED_DEVICE_IDS: ['reterminal_e1001']
}));

vi.mock('../../js/utils/logger.js', () => ({
    Logger: mockLogger
}));

describe('device_settings_view', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        document.body.innerHTML = `
            <select id="deviceModel"></select>
            <input id="setting-deep-sleep-stay-awake" type="checkbox" />
        `;
    });

    it('populates the device select with built-in, imported, and custom options', async () => {
        const { populateDeviceSelectView } = await import('../../js/ui/device_settings_view.js');

        const instance = {
            modelInput: /** @type {HTMLSelectElement} */ (document.getElementById('deviceModel')),
            customHardwarePanel: {
                updateVisibility: vi.fn()
            }
        };

        populateDeviceSelectView(instance);

        const options = Array.from(instance.modelInput.options).map((option) => option.textContent);
        expect(options.some((label) => label?.includes('reTerminal e1001'))).toBe(true);
        expect(options.some((label) => label?.includes('Imported'))).toBe(true);
        expect(options.includes('Custom Profile...')).toBe(true);
        expect(instance.customHardwarePanel.updateVisibility).toHaveBeenCalled();
    });

    it('updates visibility for sleep modes, protocol mode, and LCD dim strategy', async () => {
        const { updateDeviceSettingsVisibility } = await import('../../js/ui/device_settings_view.js');

        const instance = {
            modeSleep: { checked: false },
            modeDaily: { checked: true },
            modeDeepSleep: { checked: true },
            modeManual: { checked: false },
            sleepRow: document.createElement('div'),
            dailyRefreshRow: document.createElement('div'),
            deepSleepRow: document.createElement('div'),
            deepSleepOptionsRow: document.createElement('div'),
            dimTimeoutRow: document.createElement('div'),
            powerStrategySection: document.createElement('div'),
            protocolHardwareSection: document.createElement('div'),
            deviceModelField: document.createElement('div'),
            refreshIntervalRow: document.createElement('div'),
            autoCycleRow: document.createElement('div'),
            autoCycleEnabled: { checked: true },
            deepSleepStayAwakeEntityRow: document.createElement('div'),
            renderingModeInput: { value: 'oepl' },
            customHardwarePanel: { updateVisibility: vi.fn() },
            protocolHardwarePanel: { updateStrategyDisplay: vi.fn() }
        };

        mockAppState.settings.lcdEcoStrategy = 'dim_after_timeout';
        /** @type {HTMLInputElement} */ (document.getElementById('setting-deep-sleep-stay-awake')).checked = true;

        updateDeviceSettingsVisibility(instance);

        expect(instance.sleepRow.style.display).toBe('flex');
        expect(instance.dailyRefreshRow.style.display).toBe('flex');
        expect(instance.deepSleepRow.style.display).toBe('block');
        expect(instance.dimTimeoutRow.style.display).toBe('flex');
        expect(instance.powerStrategySection.style.display).toBe('none');
        expect(instance.protocolHardwareSection.style.display).toBe('block');
        expect(instance.deviceModelField.style.display).toBe('none');
        expect(instance.refreshIntervalRow.style.display).toBe('none');
        expect(instance.autoCycleRow.style.display).toBe('flex');
        expect(instance.deepSleepStayAwakeEntityRow.style.display).toBe('flex');
        expect(instance.customHardwarePanel.updateVisibility).toHaveBeenCalled();
        expect(instance.protocolHardwarePanel.updateStrategyDisplay).toHaveBeenCalled();
    });

    it('returns immediately if instance is null', async () => {
        const { updateDeviceSettingsVisibility } = await import('../../js/ui/device_settings_view.js');
        expect(() => updateDeviceSettingsVisibility(null)).not.toThrow();
    });

    it('handles errors in power mode visibility section', async () => {
        const { updateDeviceSettingsVisibility } = await import('../../js/ui/device_settings_view.js');
        const instance = {
            get modeSleep() { throw new Error('modeSleep error'); }
        };
        updateDeviceSettingsVisibility(instance);
        expect(mockLogger.error).toHaveBeenCalled();
        expect(mockLogger.error.mock.calls.some(call => call[0].includes("Error in power mode visibility"))).toBe(true);
    });

    it('handles errors in dim timeout visibility section', async () => {
        const { updateDeviceSettingsVisibility } = await import('../../js/ui/device_settings_view.js');
        const instance = {
            get dimTimeoutRow() { throw new Error('dimTimeoutRow error'); }
        };
        updateDeviceSettingsVisibility(instance);
        expect(mockLogger.error).toHaveBeenCalled();
        expect(mockLogger.error.mock.calls.some(call => call[0].includes("Error in dim timeout visibility"))).toBe(true);
    });

    it('handles errors in section visibility section', async () => {
        const { updateDeviceSettingsVisibility } = await import('../../js/ui/device_settings_view.js');
        const instance = {
            get renderingModeInput() { throw new Error('renderingModeInput error'); }
        };
        updateDeviceSettingsVisibility(instance);
        expect(mockLogger.error).toHaveBeenCalled();
        expect(mockLogger.error.mock.calls.some(call => call[0].includes("Error in section visibility"))).toBe(true);
    });

    it('handles errors in refresh/cycle visibility section', async () => {
        const { updateDeviceSettingsVisibility } = await import('../../js/ui/device_settings_view.js');
        const instance = {
            get refreshIntervalRow() { throw new Error('refreshIntervalRow error'); }
        };
        updateDeviceSettingsVisibility(instance);
        expect(mockLogger.error).toHaveBeenCalled();
        expect(mockLogger.error.mock.calls.some(call => call[0].includes("Error in refresh/cycle visibility"))).toBe(true);
    });

    it('handles errors in deep sleep stay awake visibility section', async () => {
        const { updateDeviceSettingsVisibility } = await import('../../js/ui/device_settings_view.js');
        const instance = {
            get deepSleepStayAwakeEntityRow() { throw new Error('deepSleepStayAwakeEntityRow error'); }
        };
        updateDeviceSettingsVisibility(instance);
        expect(mockLogger.error).toHaveBeenCalled();
        expect(mockLogger.error.mock.calls.some(call => call[0].includes("Error in deep sleep stay awake visibility"))).toBe(true);
    });

    it('handles errors in panel updates sections', async () => {
        const { updateDeviceSettingsVisibility } = await import('../../js/ui/device_settings_view.js');
        const instance = {
            customHardwarePanel: {
                updateVisibility: () => { throw new Error('customHardwarePanel error'); }
            },
            protocolHardwarePanel: {
                updateStrategyDisplay: () => { throw new Error('protocolHardwarePanel error'); }
            }
        };
        updateDeviceSettingsVisibility(instance);
        expect(mockLogger.error).toHaveBeenCalled();
        expect(mockLogger.error.mock.calls.some(call => call[0].includes("Error in customHardwarePanel.updateVisibility"))).toBe(true);
        expect(mockLogger.error.mock.calls.some(call => call[0].includes("Error in protocolHardwarePanel.updateStrategyDisplay"))).toBe(true);
    });

    it('handles missing/malformed panels gracefully', async () => {
        const { updateDeviceSettingsVisibility } = await import('../../js/ui/device_settings_view.js');
        const instance = {
            customHardwarePanel: {},
            protocolHardwarePanel: null
        };
        expect(() => updateDeviceSettingsVisibility(instance)).not.toThrow();
    });

    it('handles errors in populateDeviceSelectView when customHardwarePanel throws', async () => {
        const { populateDeviceSelectView } = await import('../../js/ui/device_settings_view.js');
        const instance = {
            modelInput: /** @type {HTMLSelectElement} */ (document.getElementById('deviceModel')),
            customHardwarePanel: {
                updateVisibility: () => { throw new Error('populateDeviceSelectView error'); }
            }
        };
        populateDeviceSelectView(instance);
        expect(mockLogger.error).toHaveBeenCalled();
        expect(mockLogger.error.mock.calls.some(call => call[0].includes("Error in customHardwarePanel.updateVisibility"))).toBe(true);
    });
});
