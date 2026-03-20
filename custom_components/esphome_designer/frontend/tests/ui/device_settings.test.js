import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';

const mockEmit = vi.fn();
const mockOn = vi.fn();
const mockShowToast = vi.fn();
const mockUploadHardwareTemplate = vi.fn();
const mockSaveLayoutToBackend = vi.fn();
const mockHasHaBackend = vi.fn(() => true);
const mockLoadExternalProfiles = vi.fn();

const mockCustomPanel = {
    init: vi.fn(),
    populateFields: vi.fn(),
    updateVisibility: vi.fn(),
    handleSaveCustomProfile: vi.fn().mockResolvedValue(undefined)
};

const mockProtocolPanel = {
    init: vi.fn(),
    populateFields: vi.fn(),
    updateStrategyDisplay: vi.fn()
};

const mockAppState = {
    settings: {
        device_name: 'My E-Ink Display',
        device_model: 'reterminal_e1001',
        renderingMode: 'direct',
        orientation: 'landscape',
        darkMode: false,
        invertedColors: false,
        lcdEcoStrategy: 'backlight_off'
    },
    deviceName: 'My E-Ink Display',
    deviceModel: 'reterminal_e1001',
    updateSettings: vi.fn(),
    setDeviceName: vi.fn(),
    setDeviceModel: vi.fn(),
    getPagesPayload: vi.fn(() => ({ pages: [] }))
};

vi.mock('../../js/core/state', () => ({ AppState: mockAppState }));
vi.mock('../../js/utils/logger.js', () => ({ Logger: { log: vi.fn(), warn: vi.fn(), error: vi.fn() } }));
vi.mock('../../js/core/events.js', () => ({
    emit: mockEmit,
    on: mockOn,
    EVENTS: {
        STATE_CHANGED: 'STATE_CHANGED',
        DEVICE_PROFILES_UPDATED: 'device-profiles-updated'
    }
}));
vi.mock('../../js/io/devices.js', () => ({
    DEVICE_PROFILES: {
        reterminal_e1001: { name: 'reTerminal e1001' },
        lilygo_t5_47: { name: 'Lilygo T5 4.7" E-Paper', isUntestedProfile: true },
        custom_user: { name: 'My Imported', isCustomProfile: true }
    },
    loadExternalProfiles: mockLoadExternalProfiles,
    SUPPORTED_DEVICE_IDS: ['reterminal_e1001']
}));
vi.mock('../../js/utils/env.js', () => ({ hasHaBackend: mockHasHaBackend }));
vi.mock('../../js/utils/dom.js', () => ({ showToast: mockShowToast }));
vi.mock('../../js/io/hardware_import.js', () => ({ uploadHardwareTemplate: mockUploadHardwareTemplate }));
vi.mock('../../js/io/ha_api.js', () => ({ saveLayoutToBackend: mockSaveLayoutToBackend }));
vi.mock('../../js/ui/device_settings/custom_hardware.js', () => ({
    CustomHardwarePanel: vi.fn(() => mockCustomPanel)
}));
vi.mock('../../js/ui/device_settings/protocol_hardware.js', () => ({
    ProtocolHardwarePanel: vi.fn(() => mockProtocolPanel)
}));

describe('DeviceSettings', () => {
    let DeviceSettings;
    let ds;

    function seedDom() {
        document.body.innerHTML = `
            <div id="deviceSettingsModal" class="hidden"></div>
            <button id="deviceSettingsClose"></button>
            <button id="deviceSettingsSave"></button>

            <input id="deviceName" />
            <select id="deviceModel"></select>
            <select id="renderingMode"><option value="direct">direct</option><option value="oepl">oepl</option></select>
            <select id="deviceOrientation"><option value="landscape">landscape</option></select>
            <input id="deviceDarkMode" type="checkbox" />
            <input id="deviceInvertedColors" type="checkbox" />

            <input id="mode-standard" type="radio" name="powerStrategy" value="standard" />
            <input id="setting-sleep-enabled" type="radio" name="powerStrategy" value="night" />
            <input id="setting-manual-refresh" type="radio" name="powerStrategy" value="manual" />
            <input id="setting-deep-sleep-enabled" type="radio" name="powerStrategy" value="deepsleep" />
            <input id="setting-daily-refresh-enabled" type="radio" name="powerStrategy" value="daily" />

            <select id="setting-sleep-start"><option value="0">00:00</option></select>
            <select id="setting-sleep-end"><option value="5">05:00</option></select>
            <input id="setting-daily-refresh-time" type="time" value="08:00" />
            <input id="setting-deep-sleep-interval" type="number" value="600" />
            <input id="setting-refresh-interval" type="number" value="600" />
            <input id="setting-dim-timeout" type="number" value="10" />
            <select id="setting-no-refresh-start"><option value="">None</option></select>
            <select id="setting-no-refresh-end"><option value="">None</option></select>
            <input id="setting-auto-cycle" type="checkbox" />
            <input id="setting-auto-cycle-interval" type="number" value="30" />

            <input id="setting-deep-sleep-stay-awake" type="checkbox" />
            <input id="setting-deep-sleep-stay-awake-entity" type="text" value="input_boolean.esphome_stay_awake" />
            <input id="setting-deep-sleep-firmware-guard" type="checkbox" />

            <div id="sleep-times-row"></div>
            <div id="daily-refresh-row"></div>
            <div id="deep-sleep-interval-row"></div>
            <div id="deep-sleep-options-row"></div>
            <div id="global-refresh-row"></div>
            <div id="dim-timeout-row"></div>
            <div id="auto-cycle-row"></div>
            <div id="deep-sleep-stay-awake-entity-row"></div>

            <div id="powerStrategySection"></div>
            <div id="protocolHardwareSection"></div>
            <div id="deviceModelField"></div>
            <div id="deviceInvertedColorsField"></div>
            <div id="oeplSettingsSection"></div>
            <div id="odpSettingsSection"></div>
            <div id="strategy-epaper-group"></div>
            <div id="strategy-lcd-group"></div>

            <button id="reloadHardwareBtn"></button>
            <button id="importHardwareBtn"></button>
            <input id="hardwareFileInput" type="file" />
            <button class="clear-pin-btn" data-target="setting-sleep-start"></button>

            <input type="radio" name="lcdEcoStrategy" value="backlight_off" checked />
            <input type="radio" name="lcdEcoStrategy" value="dim_after_timeout" />
        `;
    }

    beforeEach(async () => {
        vi.clearAllMocks();
        vi.useFakeTimers();
        seedDom();

        ({ DeviceSettings } = await import('../../js/ui/device_settings.js'));
        ds = new DeviceSettings();
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('initializes controls and opens/closes modal', () => {
        ds.init();
        ds.open();

        expect(ds.modal.classList.contains('hidden')).toBe(false);
        expect(document.getElementById('deviceName').value).toBe('My E-Ink Display');
        expect(mockCustomPanel.populateFields).toHaveBeenCalled();
        expect(mockProtocolPanel.populateFields).toHaveBeenCalled();

        ds.close();
        expect(ds.modal.classList.contains('hidden')).toBe(true);
    });

    it('populates device model select with built-in, imported, and custom option', () => {
        ds.populateDeviceSelect();
        const options = Array.from(document.getElementById('deviceModel').options).map(o => o.textContent);

        expect(options.some(o => o.includes('reTerminal e1001'))).toBe(true);
        expect(options.some(o => o.includes('Lilygo T5 4.7" E-Paper (untested)'))).toBe(true);
        expect(options.some(o => o.includes('Imported'))).toBe(true);
        expect(options.some(o => o.includes('Custom Profile'))).toBe(true);
    });

    it('updates visibility for protocol vs esphome modes', () => {
        ds.renderingModeInput.value = 'oepl';
        ds.updateVisibility();

        expect(ds.powerStrategySection.style.display).toBe('none');
        expect(ds.protocolHardwareSection.style.display).toBe('block');
        expect(ds.deviceModelField.style.display).toBe('none');

        ds.renderingModeInput.value = 'direct';
        ds.updateVisibility();
        expect(ds.powerStrategySection.style.display).toBe('block');
    });

    it('reloads hardware profiles and shows toast', async () => {
        mockLoadExternalProfiles.mockResolvedValueOnce(undefined);
        await ds.reloadHardwareProfiles();

        expect(mockLoadExternalProfiles).toHaveBeenCalledWith(true);
        expect(mockShowToast).toHaveBeenCalledWith('Hardware profiles reloaded', 'success');
    });

    it('persists to backend when HA is available', async () => {
        mockHasHaBackend.mockReturnValue(true);
        mockSaveLayoutToBackend.mockResolvedValueOnce(true);

        ds.persistToBackend();
        await vi.runAllTimersAsync();

        expect(mockSaveLayoutToBackend).toHaveBeenCalled();
    });

    it('falls back to localStorage persistence when backend unavailable', async () => {
        mockHasHaBackend.mockReturnValue(false);
        const setItemSpy = vi.spyOn(window.localStorage, 'setItem').mockImplementation(() => { });

        ds.persistToBackend();
        await vi.runAllTimersAsync();

        expect(setItemSpy).toHaveBeenCalled();
        setItemSpy.mockRestore();
    });

    it('wires autosave listeners for core settings changes', async () => {
        ds.setupAutoSaveListeners();

        ds.nameInput.value = 'New Name';
        ds.nameInput.dispatchEvent(new Event('input'));
        expect(mockAppState.setDeviceName).toHaveBeenCalledWith('New Name');
        expect(mockEmit).toHaveBeenCalled();

        ds.modelInput.value = 'reterminal_e1001';
        ds.modelInput.dispatchEvent(new Event('change'));
        expect(mockAppState.setDeviceModel).toHaveBeenCalled();

        ds.renderingModeInput.value = 'oepl';
        ds.renderingModeInput.dispatchEvent(new Event('change'));
        expect(mockAppState.updateSettings).toHaveBeenCalledWith({ renderingMode: 'oepl' });

        ds.autoCycleEnabled.checked = true;
        ds.autoCycleEnabled.dispatchEvent(new Event('change'));
        expect(mockAppState.updateSettings).toHaveBeenCalledWith({ autoCycleEnabled: true });
    });

    it('delegates custom profile save handler', async () => {
        await ds.handleSaveCustomProfile();
        expect(mockCustomPanel.handleSaveCustomProfile).toHaveBeenCalled();
    });

    it('persists deep-sleep stay-awake and firmware-guard checkboxes on change', () => {
        ds.init();

        const stayAwake = document.getElementById('setting-deep-sleep-stay-awake');
        const stayAwakeEntity = document.getElementById('setting-deep-sleep-stay-awake-entity');
        const fwGuard = document.getElementById('setting-deep-sleep-firmware-guard');

        stayAwake.checked = true;
        stayAwake.dispatchEvent(new Event('change'));
        expect(mockAppState.updateSettings).toHaveBeenCalledWith({ deepSleepStayAwakeSwitch: true });

        stayAwakeEntity.value = 'input_boolean.office_panel_awake';
        stayAwakeEntity.dispatchEvent(new Event('change'));
        expect(mockAppState.updateSettings).toHaveBeenCalledWith({ deepSleepStayAwakeEntityId: 'input_boolean.office_panel_awake' });

        fwGuard.checked = true;
        fwGuard.dispatchEvent(new Event('change'));
        expect(mockAppState.updateSettings).toHaveBeenCalledWith({ deepSleepFirmwareGuard: true });
    });
});
