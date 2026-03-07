import { AppState } from '../core/state';
import { Logger } from '../utils/logger.js';
import { emit, EVENTS, on } from '../core/events.js';
import { DEVICE_PROFILES, loadExternalProfiles, SUPPORTED_DEVICE_IDS } from '../io/devices.js';
import { hasHaBackend } from '../utils/env.js';
import { showToast } from '../utils/dom.js';
import { uploadHardwareTemplate } from '../io/hardware_import.js';
import { saveLayoutToBackend } from '../io/ha_api.js';
import { CustomHardwarePanel } from './device_settings/custom_hardware.js';
import { ProtocolHardwarePanel } from './device_settings/protocol_hardware.js';

export class DeviceSettings {
    constructor() {
        Logger.log("[DeviceSettings] Constructor called");
        const getElement = (id) => /** @type {HTMLElement | null} */ (document.getElementById(id));
        const getInput = (id) => /** @type {HTMLInputElement | null} */ (document.getElementById(id));
        const getSelect = (id) => /** @type {HTMLSelectElement | null} */ (document.getElementById(id));

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
        Logger.log("Reloading hardware profiles...");
        try {
            if (typeof loadExternalProfiles === "function") {
                const reloadProfiles = /** @type {(force?: boolean) => Promise<void>} */ (loadExternalProfiles);
                await reloadProfiles(true);
                this.populateDeviceSelect();
                showToast("Hardware profiles reloaded", "success");
            }
        } catch (err) {
            Logger.error("Failed to reload hardware profiles:", err);
            showToast("Failed to reload profiles", "error");
        }
    }

    open() {
        Logger.log("Opening Device Settings modal...");
        if (!this.modal) return;

        const s = AppState.settings;
        if (this.nameInput) this.nameInput.value = s.device_name || "My E-Ink Display";
        if (this.modelInput) this.modelInput.value = s.device_model || "reterminal_e1001";
        if (this.renderingModeInput) this.renderingModeInput.value = s.renderingMode || 'direct';
        if (this.orientationInput) this.orientationInput.value = s.orientation || "landscape";
        if (this.darkModeInput) this.darkModeInput.checked = !!s.darkMode;
        if (this.invertedColorsInput) this.invertedColorsInput.checked = !!s.invertedColors;

        const isSleep = !!s.sleepEnabled;
        const isManual = !!s.manualRefreshOnly;
        const isDeepSleep = !!s.deepSleepEnabled;
        const isDaily = !!s.dailyRefreshEnabled;
        const isStandard = !isSleep && !isManual && !isDeepSleep && !isDaily;

        if (this.modeStandard) this.modeStandard.checked = isStandard;
        if (this.modeSleep) this.modeSleep.checked = isSleep;
        if (this.modeManual) this.modeManual.checked = isManual;
        if (this.modeDeepSleep) this.modeDeepSleep.checked = isDeepSleep;
        if (this.modeDaily) this.modeDaily.checked = isDaily;

        if (this.sleepStart) this.sleepStart.value = s.sleepStartHour ?? 0;
        if (this.sleepEnd) this.sleepEnd.value = s.sleepEndHour ?? 5;
        if (this.dailyRefreshTime) this.dailyRefreshTime.value = s.dailyRefreshTime || "08:00";
        if (this.deepSleepInterval) this.deepSleepInterval.value = s.deepSleepInterval ?? 600;
        if (this.refreshIntervalInput) this.refreshIntervalInput.value = s.refreshInterval ?? 600;
        if (this.dimTimeoutInput) this.dimTimeoutInput.value = s.dimTimeout ?? 10;

        if (this.noRefreshStart) this.noRefreshStart.value = s.noRefreshStartHour ?? "";
        if (this.noRefreshEnd) this.noRefreshEnd.value = s.noRefreshEndHour ?? "";

        if (this.autoCycleEnabled) this.autoCycleEnabled.checked = !!s.autoCycleEnabled;
        if (this.autoCycleInterval) this.autoCycleInterval.value = s.autoCycleIntervalS ?? 30;

        // Deep sleep options
        const stayAwakeCb = /** @type {HTMLInputElement | null} */ (document.getElementById('setting-deep-sleep-stay-awake'));
        const fwGuardCb = /** @type {HTMLInputElement | null} */ (document.getElementById('setting-deep-sleep-firmware-guard'));
        if (stayAwakeCb) stayAwakeCb.checked = !!s.deepSleepStayAwakeSwitch;
        if (this.deepSleepStayAwakeEntityInput) {
            this.deepSleepStayAwakeEntityInput.value = s.deepSleepStayAwakeEntityId || 'input_boolean.esphome_stay_awake';
        }
        if (fwGuardCb) fwGuardCb.checked = !!s.deepSleepFirmwareGuard;

        // Populate sub-panels
        this.customHardwarePanel.populateFields();
        this.protocolHardwarePanel.populateFields();

        // Update visibility
        this.updateVisibility();
        this.customHardwarePanel.updateVisibility();

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
        if (this.modelInput && DEVICE_PROFILES) {
            const currentVal = this.modelInput.value;
            Logger.log("[DeviceSettings] Populating dropdown with", Object.keys(DEVICE_PROFILES).length, "profiles");

            this.modelInput.innerHTML = "";

            const supportedIds = SUPPORTED_DEVICE_IDS || [];

            // Separate profiles into groups
            const builtInProfiles = [];
            const userProfiles = [];

            Object.entries(DEVICE_PROFILES).forEach(([key, profile]) => {
                const isUser = profile.isCustomProfile || profile.isOfflineImport;
                if (isUser) {
                    userProfiles.push([key, profile]);
                } else {
                    builtInProfiles.push([key, profile]);
                }
            });

            // Helper to create option element with proper labeling
            const createOption = (key, profile) => {
                const opt = document.createElement("option");
                opt.value = key;

                let displayName = profile.name || key;
                displayName = displayName.replace(/\s*\(Local\)\s*/gi, '').replace(/\s*\(untested\)\s*/gi, '').trim();

                const suffixes = [];
                if (profile.isCustomProfile || profile.isOfflineImport) {
                    suffixes.push("Imported");
                }
                if (!supportedIds.includes(key)) {
                    suffixes.push("untested");
                }
                if (suffixes.length > 0) {
                    displayName += ` (${suffixes.join(", ")})`;
                }

                opt.textContent = displayName;
                return opt;
            };

            builtInProfiles.forEach(([key, profile]) => {
                this.modelInput.appendChild(createOption(key, profile));
            });

            if (userProfiles.length > 0 && builtInProfiles.length > 0) {
                const separator = document.createElement("option");
                separator.disabled = true;
                separator.textContent = "── User-Imported / Custom ──";
                separator.style.fontWeight = "bold";
                separator.style.color = "var(--text-dim)";
                this.modelInput.appendChild(separator);
            }

            userProfiles.forEach(([key, profile]) => {
                this.modelInput.appendChild(createOption(key, profile));
            });

            const customOpt = document.createElement("option");
            customOpt.value = "custom";
            customOpt.textContent = "Custom Profile...";
            customOpt.style.fontWeight = "bold";
            customOpt.style.color = "var(--accent)";
            this.modelInput.appendChild(customOpt);

            if (currentVal && (DEVICE_PROFILES[currentVal] || currentVal === 'custom')) {
                this.modelInput.value = currentVal;
            } else if (!this.modelInput.value) {
                this.modelInput.value = "reterminal_e1001";
            }

            this.customHardwarePanel.updateVisibility();
        }
    }

    updateVisibility() {
        const isSleep = this.modeSleep?.checked;
        const isDaily = this.modeDaily?.checked;
        const isDeepSleep = this.modeDeepSleep?.checked;
        const isManual = this.modeManual?.checked;

        if (this.sleepRow) this.sleepRow.style.display = (isSleep || isDeepSleep) ? 'flex' : 'none';
        if (this.dailyRefreshRow) this.dailyRefreshRow.style.display = isDaily ? 'flex' : 'none';
        if (this.deepSleepRow) this.deepSleepRow.style.display = isDeepSleep ? 'block' : 'none';
        if (this.deepSleepOptionsRow) this.deepSleepOptionsRow.style.display = isDeepSleep ? 'flex' : 'none';

        const lcdStrategy = AppState.settings.lcdEcoStrategy || 'backlight_off';
        if (this.dimTimeoutRow) this.dimTimeoutRow.style.display = (lcdStrategy === 'dim_after_timeout') ? 'flex' : 'none';

        const mode = this.renderingModeInput?.value || AppState.settings.renderingMode || 'direct';
        const isESPHome = mode === 'lvgl' || mode === 'direct';
        const isProtocol = mode === 'oepl' || mode === 'opendisplay';

        if (this.powerStrategySection) this.powerStrategySection.style.display = isESPHome ? 'block' : 'none';
        if (this.protocolHardwareSection) this.protocolHardwareSection.style.display = isProtocol ? 'block' : 'none';
        if (this.deviceModelField) this.deviceModelField.style.display = isProtocol ? 'none' : 'block';

        const needsRefreshInterval = !isDaily && !isManual;
        if (this.refreshIntervalRow) this.refreshIntervalRow.style.display = needsRefreshInterval ? 'block' : 'none';

        if (this.autoCycleRow) {
            this.autoCycleRow.style.display = this.autoCycleEnabled?.checked ? 'flex' : 'none';
        }

        if (this.deepSleepStayAwakeEntityRow) {
            const stayAwakeEnabled = /** @type {HTMLInputElement | null} */ (document.getElementById('setting-deep-sleep-stay-awake'));
            this.deepSleepStayAwakeEntityRow.style.display = stayAwakeEnabled?.checked ? 'flex' : 'none';
        }

        this.customHardwarePanel.updateVisibility();
        this.protocolHardwarePanel.updateStrategyDisplay();
    }

    persistToBackend() {
        if (this._isSavingProfile) {
            if (this.saveDebounceTimer) clearTimeout(this.saveDebounceTimer);
            return;
        }

        if (this.saveDebounceTimer) clearTimeout(this.saveDebounceTimer);
        this.saveDebounceTimer = setTimeout(async () => {
            if (this._isSavingProfile) return;

            if (hasHaBackend() && typeof saveLayoutToBackend === "function") {
                try {
                    await saveLayoutToBackend();
                } catch (err) {
                    Logger.warn("[DeviceSettings] Failed to auto-save settings:", err);
                }
            } else {
                try {
                    const payload = AppState.getPagesPayload();
                    payload.deviceName = AppState.deviceName;
                    payload.deviceModel = AppState.deviceModel;
                    localStorage.setItem("esphome-designer-layout", JSON.stringify(payload));
                } catch (err) {
                    Logger.warn("[DeviceSettings] Failed to save to localStorage:", err);
                }
            }
        }, 1000);
    }

    setupAutoSaveListeners() {
        this._setupBasicSettingsListeners();
        this._setupPowerSettingsListeners();
        this._setupCycleAndEcoListeners();
    }

    /** @private */
    _setupBasicSettingsListeners() {
        const updateSetting = (key, value) => {
            AppState.updateSettings({ [key]: value });
            Logger.log(`Auto-saved ${key}:`, value);
            this.persistToBackend();
        };

        let nameDebounceTimer = null;
        if (this.nameInput) {
            this.nameInput.addEventListener('input', () => {
                const newName = this.nameInput.value.trim();
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

        if (this.modelInput) {
            this.modelInput.addEventListener('change', async () => {
                const newModel = this.modelInput.value;
                AppState.setDeviceModel(newModel);
                updateSetting('device_model', newModel);
                this.updateVisibility();
                Logger.log("Device model changed to:", newModel);
            });
        }

        if (this.orientationInput) {
            this.orientationInput.addEventListener('change', () => updateSetting('orientation', this.orientationInput.value));
        }
        if (this.darkModeInput) {
            this.darkModeInput.addEventListener('change', () => updateSetting('darkMode', this.darkModeInput.checked));
        }
        if (this.invertedColorsInput) {
            this.invertedColorsInput.addEventListener('change', () => updateSetting('invertedColors', this.invertedColorsInput.checked));
        }
        if (this.renderingModeInput) {
            this.renderingModeInput.addEventListener('change', () => {
                updateSetting('renderingMode', this.renderingModeInput.value);
                this.updateVisibility();
                Logger.log("Rendering mode changed to:", this.renderingModeInput.value);
            });
        }
    }

    /** @private */
    _setupPowerSettingsListeners() {
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

        if (this.sleepStart) this.sleepStart.addEventListener('change', () => updateSetting('sleepStartHour', parseInt(this.sleepStart.value) || 0));
        if (this.sleepEnd) this.sleepEnd.addEventListener('change', () => updateSetting('sleepEndHour', parseInt(this.sleepEnd.value) || 0));
        if (this.dailyRefreshTime) this.dailyRefreshTime.addEventListener('change', () => updateSetting('dailyRefreshTime', this.dailyRefreshTime.value));

        if (this.deepSleepInterval) {
            this.deepSleepInterval.addEventListener('input', () => {
                const val = parseInt(this.deepSleepInterval.value) || 600;
                updateSetting('deepSleepInterval', val);
                if (this.refreshIntervalInput) {
                    this.refreshIntervalInput.value = String(val);
                    AppState.updateSettings({ refreshInterval: val });
                }
            });
        }

        if (this.refreshIntervalInput) {
            this.refreshIntervalInput.addEventListener('input', () => {
                const val = parseInt(this.refreshIntervalInput.value) || 600;
                updateSetting('refreshInterval', val);
                if (this.deepSleepInterval && this.modeDeepSleep?.checked) {
                    this.deepSleepInterval.value = String(val);
                    AppState.updateSettings({ deepSleepInterval: val });
                }
            });
        }

        if (this.noRefreshStart) this.noRefreshStart.addEventListener('change', () => updateSetting('noRefreshStartHour', this.noRefreshStart.value === "" ? null : parseInt(this.noRefreshStart.value)));
        if (this.noRefreshEnd) this.noRefreshEnd.addEventListener('change', () => updateSetting('noRefreshEndHour', this.noRefreshEnd.value === "" ? null : parseInt(this.noRefreshEnd.value)));

        // Deep sleep option checkboxes
        const stayAwakeCb = /** @type {HTMLInputElement | null} */ (document.getElementById('setting-deep-sleep-stay-awake'));
        const fwGuardCb = /** @type {HTMLInputElement | null} */ (document.getElementById('setting-deep-sleep-firmware-guard'));
        if (stayAwakeCb) {
            stayAwakeCb.addEventListener('change', () => {
                updateSetting('deepSleepStayAwakeSwitch', stayAwakeCb.checked);
                this.updateVisibility();
            });
        }
        if (this.deepSleepStayAwakeEntityInput) {
            this.deepSleepStayAwakeEntityInput.addEventListener('change', () => {
                const value = this.deepSleepStayAwakeEntityInput.value.trim() || 'input_boolean.esphome_stay_awake';
                updateSetting('deepSleepStayAwakeEntityId', value);
                this.deepSleepStayAwakeEntityInput.value = value;
            });
        }
        if (fwGuardCb) fwGuardCb.addEventListener('change', () => updateSetting('deepSleepFirmwareGuard', fwGuardCb.checked));
    }

    /** @private */
    _setupCycleAndEcoListeners() {
        const updateSetting = (key, value) => {
            AppState.updateSettings({ [key]: value });
            this.persistToBackend();
        };

        if (this.autoCycleEnabled) {
            this.autoCycleEnabled.addEventListener('change', () => {
                updateSetting('autoCycleEnabled', this.autoCycleEnabled.checked);
                this.updateVisibility();
            });
        }
        if (this.autoCycleInterval) {
            this.autoCycleInterval.addEventListener('input', () => updateSetting('autoCycleIntervalS', Math.max(5, parseInt(this.autoCycleInterval.value) || 30)));
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

        if (this.dimTimeoutInput) this.dimTimeoutInput.addEventListener('input', () => updateSetting('dimTimeout', parseInt(this.dimTimeoutInput.value) || 10));
    }

    async handleSaveCustomProfile() {
        return this.customHardwarePanel.handleSaveCustomProfile();
    }
}
