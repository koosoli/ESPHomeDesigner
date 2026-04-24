import { beforeEach, describe, expect, it, vi, afterEach } from 'vitest';

const mockLogger = {
    log: vi.fn(),
    warn: vi.fn(),
    error: vi.fn()
};

const mockShowToast = vi.fn();
const mockGenerateCustomHardwareYaml = vi.fn(() => 'display:\n  - platform: st7789v\n');
const mockUploadHardwareTemplate = vi.fn();

const mockDeviceProfiles = {
    custom_saved: {
        id: 'custom_saved',
        name: 'Saved Profile',
        isCustomProfile: true,
        chip: 'esp32-s3',
        shape: 'rect',
        resolution: { width: 800, height: 480 },
        features: { psram: true, lcd: true }
    }
};

const mockAppState = {
    settings: {
        renderingMode: 'direct'
    },
    project: {
        state: {
            customHardware: {}
        }
    },
    setCustomHardware: vi.fn((config) => {
        mockAppState.project.state.customHardware = config;
    })
};

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

vi.mock('../../js/utils/logger.js', () => ({
    Logger: mockLogger
}));

vi.mock('../../js/utils/dom.js', () => ({
    showToast: mockShowToast
}));

vi.mock('../../js/io/devices.js', () => ({
    DEVICE_PROFILES: mockDeviceProfiles
}));

vi.mock('../../js/io/hardware_generator.js', () => ({
    generateCustomHardwareYaml: mockGenerateCustomHardwareYaml
}));

vi.mock('../../js/io/hardware_import.js', () => ({
    uploadHardwareTemplate: mockUploadHardwareTemplate
}));

describe('CustomHardwarePanel behavior', () => {
    let parent;

    function seedDom() {
        document.body.innerHTML = `
            <div id="customHardwareSection"></div>
            <select id="customChip">
                <option value="esp32-s3">esp32-s3</option>
                <option value="esp32-p4">esp32-p4</option>
                <option value="esp32-c3">esp32-c3</option>
                <option value="esp8266">esp8266</option>
            </select>
            <select id="customTech">
                <option value="lcd">lcd</option>
                <option value="epaper">epaper</option>
            </select>
            <select id="customResPreset">
                <option value="320x240">320x240</option>
                <option value="800x480">800x480</option>
                <option value="custom">custom</option>
            </select>
            <input id="customRes" value="800x480" />
            <select id="customShape">
                <option value="rect">rect</option>
                <option value="round">round</option>
            </select>
            <input id="customPsram" type="checkbox" checked />
            <select id="customDisplayDriver">
                <option value="st7789v">st7789v</option>
                <option value="waveshare_epaper">waveshare_epaper</option>
            </select>
            <input id="customDisplayModel" value="" />
            <div id="customDisplayModelField"></div>
            <select id="customTouchTech">
                <option value="none">none</option>
                <option value="cst816">cst816</option>
            </select>
            <div id="touchPinsGrid" style="display:none"></div>
            <input id="customProfileName" value="" />
            <div id="customProfileEditIndicator"></div>
            <button id="saveCustomProfileBtn">Save Profile</button>

            <input id="customBacklightMinPower" value="0.07" />
            <input id="customBacklightInitial" value="0.80" />
            <input id="customAntiburn" type="checkbox" />

            <datalist id="gpio-pins-esp32s3"></datalist>
            <datalist id="gpio-pins-esp32"></datalist>
            <datalist id="gpio-pins-esp8266"></datalist>

            <input id="pin_cs" />
            <input id="pin_dc" />
            <input id="pin_rst" />
            <input id="pin_busy" />
            <input id="pin_clk" />
            <input id="pin_mosi" />
            <input id="pin_backlight" />
            <input id="pin_sda" />
            <input id="pin_scl" />
            <input id="pin_touch_int" />
            <input id="pin_touch_rst" />
            <input id="pin_battery_adc" />
            <input id="pin_battery_enable" />
        `;
    }

    beforeEach(() => {
        vi.clearAllMocks();
        vi.useFakeTimers();
        seedDom();
        mockAppState.settings.renderingMode = 'direct';
        mockAppState.project.state.customHardware = {};
        delete mockDeviceProfiles.custom_kitchen_display;

        parent = {
            updateStrategyGroupVisibility: vi.fn(),
            renderingModeInput: /** @type {HTMLSelectElement} */ ({ value: 'direct' }),
            orientationInput: /** @type {HTMLSelectElement} */ ({ value: 'portrait' }),
            modelInput: /** @type {HTMLInputElement} */ (document.createElement('input')),
            reloadHardwareProfiles: vi.fn(async () => {})
        };
        parent.modelInput.value = 'custom';
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('derives config, updates dependent UI, and auto-saves when the custom profile is active', async () => {
        const { CustomHardwarePanel, getProfileButtonLabel } = await import('../../js/ui/device_settings/custom_hardware.js');
        const panel = new CustomHardwarePanel(parent);
        panel.init();

        const touchTech = /** @type {HTMLSelectElement} */ (document.getElementById('customTouchTech'));
        touchTech.value = 'cst816';
        touchTech.dispatchEvent(new Event('change'));
        expect(document.getElementById('touchPinsGrid')?.style.display).toBe('grid');

        const displayDriver = /** @type {HTMLSelectElement} */ (document.getElementById('customDisplayDriver'));
        displayDriver.value = 'waveshare_epaper';
        displayDriver.dispatchEvent(new Event('change'));
        expect(document.getElementById('customDisplayModelField')?.style.display).toBe('block');

        const customChip = /** @type {HTMLSelectElement} */ (document.getElementById('customChip'));
        customChip.value = 'esp32-c3';
        customChip.dispatchEvent(new Event('change'));
        expect(document.getElementById('pin_cs')?.getAttribute('list')).toBe('gpio-pins-esp32s3');
        expect(/** @type {HTMLInputElement} */ (document.getElementById('customPsram')).disabled).toBe(true);
        expect(/** @type {HTMLInputElement} */ (document.getElementById('customPsram')).checked).toBe(false);

        const customShape = /** @type {HTMLSelectElement} */ (document.getElementById('customShape'));
        const customRes = /** @type {HTMLInputElement} */ (document.getElementById('customRes'));
        const customResPreset = /** @type {HTMLSelectElement} */ (document.getElementById('customResPreset'));
        customRes.value = '800x480';
        customShape.value = 'round';
        customShape.dispatchEvent(new Event('change'));
        expect(customRes.value).toBe('480x480');
        expect(customResPreset.value).toBe('custom');

        customResPreset.value = '320x240';
        customResPreset.dispatchEvent(new Event('change'));
        expect(customRes.value).toBe('320x240');

        /** @type {HTMLInputElement} */ (document.getElementById('customDisplayModel')).value = 'PanelX';
        /** @type {HTMLInputElement} */ (document.getElementById('pin_cs')).value = 'GPIO10';
        /** @type {HTMLInputElement} */ (document.getElementById('pin_backlight')).value = 'GPIO21';
        /** @type {HTMLInputElement} */ (document.getElementById('customBacklightMinPower')).value = '0.15';
        /** @type {HTMLInputElement} */ (document.getElementById('customBacklightInitial')).value = '0.9';
        /** @type {HTMLInputElement} */ (document.getElementById('customAntiburn')).checked = true;
        customRes.dispatchEvent(new Event('input'));

        const config = panel.getConfig();
        expect(config).toMatchObject({
            chip: 'esp32-c3',
            tech: 'lcd',
            resWidth: 320,
            resHeight: 240,
            shape: 'round',
            displayDriver: 'waveshare_epaper',
            displayModel: 'PanelX',
            touchTech: 'cst816',
            orientation: 'portrait',
            isLvgl: false,
            backlightMinPower: 0.15,
            backlightInitial: 0.9,
            antiburn: true,
            pins: {
                cs: 'GPIO10',
                backlight: 'GPIO21'
            }
        });
        expect(mockAppState.setCustomHardware).toHaveBeenCalledWith(expect.objectContaining({
            resWidth: 320,
            resHeight: 240,
            displayDriver: 'waveshare_epaper'
        }));

        expect(getProfileButtonLabel(false)).toBe('Save Profile');
        expect(getProfileButtonLabel(true)).toBe('Update Profile');
    });

    it('maps ESP32-P4 custom profiles onto the ESP32 pin datalist without disabling PSRAM', async () => {
        const { CustomHardwarePanel } = await import('../../js/ui/device_settings/custom_hardware.js');
        const panel = new CustomHardwarePanel(parent);
        panel.init();

        const customChip = /** @type {HTMLSelectElement} */ (document.getElementById('customChip'));
        const customPsram = /** @type {HTMLInputElement} */ (document.getElementById('customPsram'));
        customChip.value = 'esp32-p4';
        customChip.dispatchEvent(new Event('change'));

        expect(document.getElementById('pin_cs')?.getAttribute('list')).toBe('gpio-pins-esp32');
        expect(customPsram.disabled).toBe(false);
        expect(customPsram.checked).toBe(true);
    });

    it('updates visibility for saved profiles, unsaved custom profiles, and protocol modes', async () => {
        const { CustomHardwarePanel } = await import('../../js/ui/device_settings/custom_hardware.js');
        const panel = new CustomHardwarePanel(parent);

        parent.renderingModeInput.value = 'oepl';
        parent.modelInput.value = 'custom';
        panel.updateVisibility();
        expect(document.getElementById('customHardwareSection')?.style.display).toBe('none');

        parent.renderingModeInput.value = 'direct';
        parent.modelInput.value = 'custom_saved';
        panel.updateVisibility();
        expect(document.getElementById('customHardwareSection')?.style.display).toBe('block');
        expect(document.getElementById('customProfileEditIndicator')?.style.display).toBe('block');
        expect(document.getElementById('saveCustomProfileBtn')?.textContent).toBe('Update Profile');
        expect(/** @type {HTMLInputElement} */ (document.getElementById('customProfileName')).disabled).toBe(true);

        parent.modelInput.value = 'custom';
        panel.updateVisibility();
        expect(document.getElementById('customProfileEditIndicator')?.style.display).toBe('none');
        expect(document.getElementById('saveCustomProfileBtn')?.textContent).toBe('Save Profile');
        expect(/** @type {HTMLInputElement} */ (document.getElementById('customProfileName')).disabled).toBe(false);
    });

    it('saves a generated profile, reloads the catalog, and auto-selects the imported profile', async () => {
        const { CustomHardwarePanel } = await import('../../js/ui/device_settings/custom_hardware.js');
        const panel = new CustomHardwarePanel(parent);
        panel.init();

        const nameInput = /** @type {HTMLInputElement} */ (document.getElementById('customProfileName'));
        nameInput.value = 'Kitchen Display';
        const dispatchSpy = vi.spyOn(parent.modelInput, 'dispatchEvent');

        parent.reloadHardwareProfiles.mockImplementation(async () => {
            mockDeviceProfiles.custom_kitchen_display = {
                id: 'custom_kitchen_display',
                name: 'Kitchen Display',
                isCustomProfile: true
            };
        });
        mockUploadHardwareTemplate.mockResolvedValueOnce(undefined);

        await panel.handleSaveCustomProfile();
        await vi.advanceTimersByTimeAsync(500);

        expect(mockGenerateCustomHardwareYaml).toHaveBeenCalledWith(expect.objectContaining({
            name: 'Kitchen Display'
        }));
        expect(mockUploadHardwareTemplate).toHaveBeenCalledTimes(1);
        expect(parent.reloadHardwareProfiles).toHaveBeenCalled();
        expect(parent.modelInput.value).toBe('custom_kitchen_display');
        expect(dispatchSpy).toHaveBeenCalled();
        expect(mockShowToast).toHaveBeenCalledWith('Profile "Kitchen Display" created and loaded!', 'success');
    });

    it('treats existing saved profiles as updates and tolerates transient network upload failures', async () => {
        const { CustomHardwarePanel } = await import('../../js/ui/device_settings/custom_hardware.js');
        const panel = new CustomHardwarePanel(parent);
        panel.init();

        parent.modelInput.value = 'custom_saved';
        /** @type {HTMLInputElement} */ (document.getElementById('customProfileName')).value = 'Saved Profile';
        mockUploadHardwareTemplate.mockRejectedValueOnce(new Error('Failed to fetch'));

        await panel.handleSaveCustomProfile();
        await vi.advanceTimersByTimeAsync(500);

        expect(parent.reloadHardwareProfiles).toHaveBeenCalled();
        expect(mockShowToast).toHaveBeenCalledWith('Updating hardware recipe...', 'info');
        expect(parent.modelInput.value).toBe('custom_saved');
        expect(mockShowToast).toHaveBeenCalledWith('Profile "Saved Profile" updated!', 'success');
    });

    it('warns when a newly generated profile cannot be auto-selected after retries', async () => {
        const { CustomHardwarePanel } = await import('../../js/ui/device_settings/custom_hardware.js');
        const panel = new CustomHardwarePanel(parent);
        panel.init();

        /** @type {HTMLInputElement} */ (document.getElementById('customProfileName')).value = 'Unmatched Profile';
        mockUploadHardwareTemplate.mockResolvedValueOnce(undefined);

        await panel.handleSaveCustomProfile();
        await vi.advanceTimersByTimeAsync(8500);

        expect(parent.reloadHardwareProfiles).toHaveBeenCalled();
        expect(mockShowToast).toHaveBeenCalledWith('Profile created, but could not be auto-selected. Please click Reload.', 'warning');
    });

    it('warns on missing names and surfaces upload errors', async () => {
        const { CustomHardwarePanel } = await import('../../js/ui/device_settings/custom_hardware.js');
        const panel = new CustomHardwarePanel(parent);
        panel.init();

        const nameInput = /** @type {HTMLInputElement} */ (document.getElementById('customProfileName'));
        const focusSpy = vi.fn();
        Object.defineProperty(nameInput, 'focus', { value: focusSpy });

        await panel.handleSaveCustomProfile();
        expect(mockShowToast).toHaveBeenCalledWith('Please enter a name for your custom profile first.', 'warning');
        expect(focusSpy).toHaveBeenCalled();

        mockShowToast.mockClear();
        nameInput.value = 'Broken Upload';
        mockUploadHardwareTemplate.mockRejectedValueOnce(new Error('boom'));

        await panel.handleSaveCustomProfile();

        expect(mockLogger.error).toHaveBeenCalled();
        expect(mockShowToast).toHaveBeenCalledWith('Failed to create profile: boom', 'error');
    });

    it('hydrates fields from project state and handles missing parents safely', async () => {
        const { CustomHardwarePanel } = await import('../../js/ui/device_settings/custom_hardware.js');
        mockAppState.project.state.customHardware = {
            name: 'Desk Panel',
            chip: 'esp32-s3',
            tech: 'epaper',
            resWidth: 480,
            resHeight: 480,
            shape: 'round',
            psram: true,
            displayDriver: 'waveshare_epaper',
            displayModel: 'WS42',
            touchTech: 'cst816',
            pins: {
                cs: 'GPIO10',
                batteryAdc: 'GPIO4'
            }
        };

        const sparseParent = {
            renderingModeInput: { value: 'direct' },
            orientationInput: null,
            modelInput: { value: 'custom' }
        };
        const panel = new CustomHardwarePanel(sparseParent);

        panel.populateFields();
        panel.updatePinDatalist();

        expect(/** @type {HTMLInputElement} */ (document.getElementById('customProfileName')).value).toBe('Desk Panel');
        expect(/** @type {HTMLInputElement} */ (document.getElementById('customRes')).value).toBe('480x480');
        expect(/** @type {HTMLInputElement} */ (document.getElementById('pin_cs')).value).toBe('GPIO10');
        expect(/** @type {HTMLInputElement} */ (document.getElementById('pin_battery_adc')).value).toBe('GPIO4');
        expect(document.getElementById('pin_cs')?.getAttribute('list')).toBe('gpio-pins-esp32s3');
    });
});
