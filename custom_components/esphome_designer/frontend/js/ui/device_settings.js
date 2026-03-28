import { AppState } from '../core/state';
import { Logger } from '../utils/logger.js';
import { emit, EVENTS, on } from '../core/events.js';
import { uploadHardwareTemplate } from '../io/hardware_import.js';
import { saveLayoutToBackend } from '../io/ha_api.js';
import { CustomHardwarePanel } from './device_settings/custom_hardware.js';
import { ProtocolHardwarePanel } from './device_settings/protocol_hardware.js';
import { populateDeviceSelectView, updateDeviceSettingsVisibility } from './device_settings_view.js';
import {
    maybeLoadCustomHardwareProfile,
    persistDeviceSettings,
    populateDeviceSettingsForm,
    reloadHardwareProfiles
} from './device_settings/device_settings_runtime.js';

/** @typedef {ReturnType<typeof setTimeout>} TimerHandle */
/** @typedef {Record<string, any>} DeviceProfileMap */

export class DeviceSettings {
    constructor() {
        Logger.log("[DeviceSettings] Constructor called");
        /** @param {string} id */
        const getElement = (id) => /** @type {HTMLElement | null} */(document.getElementById(id));
        /** @param {string} id */
        const getInput = (id) => /** @type {HTMLInputElement | null} */(document.getElementById(id));
        /** @param {string} id */
        const getSelect = (id) => /** @type {HTMLSelectElement | null} */(document.getElementById(id));

        this.modal = getElement('deviceSettingsModal');
        this.closeBtn = getElement('deviceSettingsClose');
        this.saveBtn = getElement('deviceSettingsSave');

        // Inputs
        this.nameInput = getInput('deviceName');
        this.modelInput = getSelect('deviceModel');
        this.renderingModeInput = getSelect('renderingMode');
        this.orientationInput = getSelect('deviceOrientation');
        this.darkModeInput = getInput('deviceDarkMode');
        this.invertedColorsInput = getInput('deviceInvertedColors');

        // Power strategies
        this.modeStandard = getInput('mode-standard');
        this.modeSleep = getInput('setting-sleep-enabled');
        this.modeManual = getInput('setting-manual-refresh');
        this.modeDeepSleep = getInput('setting-deep-sleep-enabled');
        this.modeDaily = getInput('setting-daily-refresh-enabled');

        // Intervals/Times
        this.sleepStart = getInput('setting-sleep-start');
        this.sleepEnd = getInput('setting-sleep-end');
        this.dailyRefreshTime = getInput('setting-daily-refresh-time');
        this.deepSleepInterval = getInput('setting-deep-sleep-interval');
        this.refreshIntervalInput = getInput('setting-refresh-interval');
        this.dimTimeoutInput = getInput('setting-dim-timeout');

        // Silent Hours
        this.noRefreshStart = getInput('setting-no-refresh-start');
        this.noRefreshEnd = getInput('setting-no-refresh-end');

        // Auto-Cycle
        this.autoCycleEnabled = getInput('setting-auto-cycle');
        this.autoCycleInterval = getInput('setting-auto-cycle-interval');
        this.deepSleepStayAwakeEntityInput = getInput('setting-deep-sleep-stay-awake-entity');

        // Dynamic rows
        this.sleepRow = getElement('sleep-times-row');
        this.dailyRefreshRow = getElement('daily-refresh-row');
        this.deepSleepRow = getElement('deep-sleep-interval-row');
        this.deepSleepOptionsRow = getElement('deep-sleep-options-row');
        this.refreshIntervalRow = getElement('global-refresh-row');
        this.dimTimeoutRow = getElement('dim-timeout-row');
        this.autoCycleRow = getElement('auto-cycle-row');
        this.deepSleepStayAwakeEntityRow = getElement('deep-sleep-stay-awake-entity-row');

        // Sections
        this.powerStrategySection = getElement('powerStrategySection');
        this.protocolHardwareSection = getElement('protocolHardwareSection');
        this.deviceModelField = getElement('deviceModelField');
        this.deviceInvertedColorsField = getElement('deviceInvertedColorsField');
        this.oeplSettingsSection = getElement('oeplSettingsSection');
        this.odpSettingsSection = getElement('odpSettingsSection');
        this.strategyEpaperGroup = getElement('strategy-epaper-group');
        this.strategyLcdGroup = getElement('strategy-lcd-group');

        // Panels
        this.customHardwarePanel = new CustomHardwarePanel(this);
        this.protocolHardwarePanel = new ProtocolHardwarePanel(this);

        this._isSavingProfile = false;
        /** @type {(() => void) | null} */
        this._profilesUpdatedHandler = null;
        /** @type {TimerHandle | null} */
        this.saveDebounceTimer = null;
    }

    init() {
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }

        this._profilesUpdatedHandler = () => this.populateDeviceSelect();
        on(EVENTS.DEVICE_PROFILES_UPDATED, this._profilesUpdatedHandler);

        const reloadBtn = /** @type {HTMLElement | null} */ (document.getElementById('reloadHardwareBtn'));
        if (reloadBtn) {
            reloadBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                await this.reloadHardwareProfiles();
            });
        }

        document.querySelectorAll('.clear-pin-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = btn.getAttribute('data-target');
                const input = targetId ? /** @type {HTMLInputElement | null} */ (document.getElementById(targetId)) : null;
                if (input) {
                    input.value = '';
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                }
            });
        });

        const importBtn = /** @type {HTMLElement | null} */ (document.getElementById('importHardwareBtn'));
        const fileInput = /** @type {HTMLInputElement | null} */ (document.getElementById('hardwareFileInput'));
        if (importBtn && fileInput) {
            importBtn.addEventListener('click', (e) => {
                e.preventDefault();
                fileInput.click();
            });
            fileInput.addEventListener('change', async () => {
                const files = fileInput.files;
                if (files && files.length > 0) {
                    const file = files[0];
                    try {
                        await uploadHardwareTemplate(file);
                    } catch {
                        // Silently ignore hardware import errors (user likely canceled or invalid file)
                    }
                    fileInput.value = "";
                }
            });
        }

        this.populateDeviceSelect();

        if (this.saveBtn) {
            this.saveBtn.addEventListener('click', () => this.close());
        }

        this.setupAutoSaveListeners();
        this.customHardwarePanel.init();
        this.protocolHardwarePanel.init();
    }

    async reloadHardwareProfiles() {
        return reloadHardwareProfiles(this);
    }

    open() {
        Logger.log("Opening Device Settings modal...");
        if (!this.modal) return;

        populateDeviceSettingsForm(this);

        this.modal.classList.remove('hidden');
        this.modal.style.display = 'flex';
    }

    close() {
        if (this.modal) {
            this.modal.classList.add('hidden');
            this.modal.style.display = 'none';
        }
    }

    populateDeviceSelect() {
        populateDeviceSelectView(this);
        return;
    }

    updateVisibility() {
        updateDeviceSettingsVisibility(this);
        return;
    }

    persistToBackend() {
        persistDeviceSettings(this);
    }

    setupAutoSaveListeners() {
        this._setupBasicSettingsListeners();
        this._setupPowerSettingsListeners();
        this._setupCycleAndEcoListeners();
    }

    /** @private */
    _setupBasicSettingsListeners() {
        /**
         * @param {string} key
         * @param {any} value
         */
        const updateSetting = (key, value) => {
            AppState.updateSettings({ [key]: value });
            Logger.log(`Auto-saved ${key}:`, value);
            this.persistToBackend();
        };

        /** @type {TimerHandle | null} */
        let nameDebounceTimer = null;
        const nameInput = this.nameInput;
        if (nameInput) {
            nameInput.addEventListener('input', () => {
                const newName = nameInput.value.trim();
                AppState.setDeviceName(newName);
                emit(EVENTS.STATE_CHANGED);

                if (nameDebounceTimer) clearTimeout(nameDebounceTimer);
                nameDebounceTimer = setTimeout(async () => {
                    if (typeof saveLayoutToBackend === "function") {
                        try {
                            await saveLayoutToBackend();
                        } catch (err) {
                            Logger.warn("[DeviceSettings] Failed to save device name:", err);
                        }
                    }
                }, 500);
            });
        }

        const modelInput = this.modelInput;
        if (modelInput) {
            modelInput.addEventListener('change', async () => {
                const newModel = modelInput.value;
                AppState.setDeviceModel(newModel);
                updateSetting('device_model', newModel);
                this.updateVisibility();
                maybeLoadCustomHardwareProfile(this, newModel);

                Logger.log("Device model changed to:", newModel);
            });
        }

        const orientationInput = this.orientationInput;
        if (orientationInput) {
            orientationInput.addEventListener('change', () => updateSetting('orientation', orientationInput.value));
        }
        const darkModeInput = this.darkModeInput;
        if (darkModeInput) {
            darkModeInput.addEventListener('change', () => updateSetting('darkMode', darkModeInput.checked));
        }
        const invertedColorsInput = this.invertedColorsInput;
        if (invertedColorsInput) {
            invertedColorsInput.addEventListener('change', () => updateSetting('invertedColors', invertedColorsInput.checked));
        }
        const renderingModeInput = this.renderingModeInput;
        if (renderingModeInput) {
            renderingModeInput.addEventListener('change', () => {
                updateSetting('renderingMode', renderingModeInput.value);
                this.updateVisibility();
                Logger.log("Rendering mode changed to:", renderingModeInput.value);
            });
        }
    }

    /** @private */
    _setupPowerSettingsListeners() {
        /**
         * @param {string} key
         * @param {any} value
         */
        const updateSetting = (key, value) => {
            AppState.updateSettings({ [key]: value });
            this.persistToBackend();
        };

        const radios = [this.modeStandard, this.modeSleep, this.modeManual, this.modeDeepSleep, this.modeDaily];
        radios.forEach(radio => {
            if (radio) {
                radio.addEventListener('change', () => {
                    if (!radio.checked) return;
                    updateSetting('sleepEnabled', !!this.modeSleep?.checked);
                    updateSetting('manualRefreshOnly', !!this.modeManual?.checked);
                    updateSetting('deepSleepEnabled', !!this.modeDeepSleep?.checked);
                    updateSetting('dailyRefreshEnabled', !!this.modeDaily?.checked);
                    this.updateVisibility();
                });
            }
        });

        const sleepStart = this.sleepStart;
        const sleepEnd = this.sleepEnd;
        const dailyRefreshTime = this.dailyRefreshTime;
        if (sleepStart) sleepStart.addEventListener('change', () => updateSetting('sleepStartHour', parseInt(sleepStart.value) || 0));
        if (sleepEnd) sleepEnd.addEventListener('change', () => updateSetting('sleepEndHour', parseInt(sleepEnd.value) || 0));
        if (dailyRefreshTime) dailyRefreshTime.addEventListener('change', () => updateSetting('dailyRefreshTime', dailyRefreshTime.value));

        const deepSleepInterval = this.deepSleepInterval;
        if (deepSleepInterval) {
            deepSleepInterval.addEventListener('input', () => {
                const val = parseInt(deepSleepInterval.value) || 600;
                updateSetting('deepSleepInterval', val);
                const refreshIntervalInput = this.refreshIntervalInput;
                if (refreshIntervalInput) {
                    refreshIntervalInput.value = String(val);
                    AppState.updateSettings({ refreshInterval: val });
                }
            });
        }

        const refreshIntervalInput = this.refreshIntervalInput;
        if (refreshIntervalInput) {
            refreshIntervalInput.addEventListener('input', () => {
                const val = parseInt(refreshIntervalInput.value) || 600;
                updateSetting('refreshInterval', val);
                if (deepSleepInterval && this.modeDeepSleep?.checked) {
                    deepSleepInterval.value = String(val);
                    AppState.updateSettings({ deepSleepInterval: val });
                }
            });
        }

        const noRefreshStart = this.noRefreshStart;
        const noRefreshEnd = this.noRefreshEnd;
        if (noRefreshStart) noRefreshStart.addEventListener('change', () => updateSetting('noRefreshStartHour', noRefreshStart.value === "" ? null : parseInt(noRefreshStart.value)));
        if (noRefreshEnd) noRefreshEnd.addEventListener('change', () => updateSetting('noRefreshEndHour', noRefreshEnd.value === "" ? null : parseInt(noRefreshEnd.value)));

        // Deep sleep option checkboxes
        const stayAwakeCb = /** @type {HTMLInputElement | null} */ (document.getElementById('setting-deep-sleep-stay-awake'));
        const fwGuardCb = /** @type {HTMLInputElement | null} */ (document.getElementById('setting-deep-sleep-firmware-guard'));
        if (stayAwakeCb) {
            stayAwakeCb.addEventListener('change', () => {
                updateSetting('deepSleepStayAwakeSwitch', stayAwakeCb.checked);
                this.updateVisibility();
            });
        }
        const deepSleepStayAwakeEntityInput = this.deepSleepStayAwakeEntityInput;
        if (deepSleepStayAwakeEntityInput) {
            deepSleepStayAwakeEntityInput.addEventListener('change', () => {
                const value = deepSleepStayAwakeEntityInput.value.trim() || 'input_boolean.esphome_stay_awake';
                updateSetting('deepSleepStayAwakeEntityId', value);
                deepSleepStayAwakeEntityInput.value = value;
            });
        }
        if (fwGuardCb) fwGuardCb.addEventListener('change', () => updateSetting('deepSleepFirmwareGuard', fwGuardCb.checked));
    }

    /** @private */
    _setupCycleAndEcoListeners() {
        /**
         * @param {string} key
         * @param {any} value
         */
        const updateSetting = (key, value) => {
            AppState.updateSettings({ [key]: value });
            this.persistToBackend();
        };

        const autoCycleEnabled = this.autoCycleEnabled;
        if (autoCycleEnabled) {
            autoCycleEnabled.addEventListener('change', () => {
                updateSetting('autoCycleEnabled', autoCycleEnabled.checked);
                this.updateVisibility();
            });
        }
        const autoCycleInterval = this.autoCycleInterval;
        if (autoCycleInterval) {
            autoCycleInterval.addEventListener('input', () => updateSetting('autoCycleIntervalS', Math.max(5, parseInt(autoCycleInterval.value) || 30)));
        }

        const lcdStrategyRadios = /** @type {NodeListOf<HTMLInputElement>} */ (document.querySelectorAll('input[name="lcdEcoStrategy"]'));
        lcdStrategyRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                if (radio.checked) {
                    updateSetting('lcdEcoStrategy', radio.value);
                    if (this.sleepRow) this.sleepRow.style.display = (radio.value === 'backlight_off') ? 'flex' : 'none';
                    if (this.dimTimeoutRow) this.dimTimeoutRow.style.display = (radio.value === 'dim_after_timeout') ? 'flex' : 'none';
                }
            });
        });

        const dimTimeoutInput = this.dimTimeoutInput;
        if (dimTimeoutInput) dimTimeoutInput.addEventListener('input', () => updateSetting('dimTimeout', parseInt(dimTimeoutInput.value) || 10));
    }

    async handleSaveCustomProfile() {
        return this.customHardwarePanel.handleSaveCustomProfile();
    }
}
