import { AppState } from '../core/state.js';
import { Logger } from '../utils/logger.js';
import { emit, EVENTS } from '../core/events.js';
import { DEVICE_PROFILES, loadExternalProfiles, SUPPORTED_DEVICE_IDS } from '../io/devices.js';
import { hasHaBackend } from '../utils/env.js';
import { showToast } from '../utils/dom.js';
import { generateCustomHardwareYaml } from '../io/hardware_generator.js';
import { uploadHardwareTemplate } from '../io/hardware_import.js';

export class DeviceSettings {
    constructor() {
        Logger.log("[DeviceSettings] Constructor called - Instance ID check");
        this.modal = document.getElementById('deviceSettingsModal');
        // ... (rest of constructor is fine, no changes needed for debug)
        this.closeBtn = document.getElementById('deviceSettingsClose');
        this.saveBtn = document.getElementById('deviceSettingsSave');

        // Inputs
        this.nameInput = document.getElementById('deviceName');
        this.modelInput = document.getElementById('deviceModel');
        this.orientationInput = document.getElementById('deviceOrientation');
        this.darkModeInput = document.getElementById('deviceDarkMode');
        this.extendedLatinGlyphsInput = document.getElementById('deviceExtendedLatinGlyphs');
        this.invertedColorsInput = document.getElementById('deviceInvertedColors');

        // Power Strategy
        this.modeStandard = document.getElementById('mode-standard');
        this.modeSleep = document.getElementById('setting-sleep-enabled');
        this.modeManual = document.getElementById('setting-manual-refresh');
        this.modeDeepSleep = document.getElementById('setting-deep-sleep-enabled');
        this.modeDaily = document.getElementById('setting-daily-refresh-enabled');

        // Sub-settings
        this.sleepStart = document.getElementById('setting-sleep-start');
        this.sleepEnd = document.getElementById('setting-sleep-end');
        this.sleepRow = document.getElementById('sleep-times-row');

        this.dailyRefreshTime = document.getElementById('setting-daily-refresh-time');
        this.dailyRefreshRow = document.getElementById('daily-refresh-row');

        this.deepSleepInterval = document.getElementById('setting-deep-sleep-interval');
        this.deepSleepRow = document.getElementById('deep-sleep-interval-row');

        this.refreshIntervalInput = document.getElementById('setting-refresh-interval');
        this.refreshIntervalRow = document.getElementById('global-refresh-row');

        this.noRefreshStart = document.getElementById('setting-no-refresh-start');
        this.noRefreshEnd = document.getElementById('setting-no-refresh-end');

        // Dim Timeout (Used by LCD Dim after timeout)
        this.dimTimeoutInput = document.getElementById('setting-dim-timeout');
        this.dimTimeoutRow = document.getElementById('dim-timeout-row');

        // Auto-Cycle
        this.autoCycleEnabled = document.getElementById('setting-auto-cycle');
        this.autoCycleInterval = document.getElementById('setting-auto-cycle-interval');
        this.autoCycleRow = document.getElementById('field-auto-cycle-interval');

        // Custom Hardware
        this.customHardwareSection = document.getElementById('customHardwareSection');
        // Legacy support: the code refers to customFieldsContainer but it's actually customHardwareSection
        // We'll alias it for compatibility if referenced that way
        this.customFieldsContainer = this.customHardwareSection;

        this.customChip = document.getElementById('customChip');
        this.customTech = document.getElementById('customTech');
        this.customRes = document.getElementById('customRes');
        this.customShape = document.getElementById('customShape');
        this.customPsram = document.getElementById('customPsram');
        this.customDisplayDriver = document.getElementById('customDisplayDriver');
        this.customTouchTech = document.getElementById('customTouchTech');
        this.touchPinsGrid = document.getElementById('touchPinsGrid');

        // Inline Profile Name
        this.customProfileNameInput = document.getElementById('customProfileName');

        // Strategy Groups (E-Paper vs LCD)
        this.strategyEpaperGroup = document.getElementById('strategy-epaper-group');
        this.strategyLcdGroup = document.getElementById('strategy-lcd-group');

        // Rendering Mode (LVGL vs Direct)
        this.renderingModeInput = document.getElementById('renderingMode');
        this.renderingModeField = document.getElementById('renderingModeField');

        // OEPL Settings
        this.oeplSettingsSection = document.getElementById('oeplSettingsSection');
        this.oeplEntityIdInput = document.getElementById('oeplEntityId');
        this.oeplDitherInput = document.getElementById('oeplDither');

        // Protocol Hardware
        this.protocolHardwareSection = document.getElementById('protocolHardwareSection');
        this.protocolResPreset = document.getElementById('protocolResPreset');
        this.protocolWidth = document.getElementById('protocolWidth');
        this.protocolHeight = document.getElementById('protocolHeight');
        this.protocolColorMode = document.getElementById('protocolColorMode');
        this.deviceModelField = document.getElementById('deviceModelField');

        // ESPHome Only Fields
        this.powerStrategySection = document.getElementById('powerStrategySection');
        this.deviceExtendedLatinGlyphsField = document.getElementById('deviceExtendedLatinGlyphsField');
        this.deviceInvertedColorsField = document.getElementById('deviceInvertedColorsField');
    }
    init() {
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }

        // Reload Hardware Profiles Button
        const reloadBtn = document.getElementById('reloadHardwareBtn');
        if (reloadBtn) {
            reloadBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                await this.reloadHardwareProfiles();
            });
        }

        // Clear pin buttons (× buttons for optional pins)
        document.querySelectorAll('.clear-pin-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = btn.getAttribute('data-target');
                const input = document.getElementById(targetId);
                if (input) {
                    input.value = '';
                    input.dispatchEvent(new Event('input', { bubbles: true }));
                }
            });
        });

        // Import Hardware Recipe
        const importBtn = document.getElementById('importHardwareBtn');
        const fileInput = document.getElementById('hardwareFileInput');
        if (importBtn && fileInput) {
            importBtn.addEventListener('click', (e) => {
                e.preventDefault();
                fileInput.click();
            });
            fileInput.addEventListener('change', async (e) => {
                if (e.target.files.length > 0) {
                    const file = e.target.files[0];
                    try {
                        await uploadHardwareTemplate(file);
                    } catch (err) {
                        // Toast handled in upload function
                    }
                    fileInput.value = ""; // Clear for next selection
                }
            });
        }

        this.populateDeviceSelect();

        // Save button (hides modal, as auto-save handles the rest)
        if (this.saveBtn) {
            this.saveBtn.addEventListener('click', () => this.close());
        }

        this.setupAutoSaveListeners();
        this.setupCustomHardwareListeners();
        this.setupProtocolHardwareListeners();
    }

    setupCustomHardwareListeners() {
        if (!this.modelInput) return;

        this.modelInput.addEventListener('change', () => {
            this.updateCustomSectionVisibility();
        });

        if (this.customTech) {
            this.customTech.addEventListener('change', () => {
                this.updateStrategyGroupVisibility();
            });
        }

        // Switch GPIO datalist based on chip type
        if (this.customChip) {
            this.customChip.addEventListener('change', () => {
                this.updatePinDatalist();
            });
        }

        if (this.customTouchTech) {
            this.customTouchTech.addEventListener('change', () => {
                if (this.touchPinsGrid) {
                    this.touchPinsGrid.style.display = this.customTouchTech.value === 'none' ? 'none' : 'grid';
                }
            });
        }

        // Auto-set square resolution when 'round' shape is selected
        if (this.customShape) {
            this.customShape.addEventListener('change', () => {
                if (this.customShape.value === 'round' && this.customRes) {
                    // Parse current resolution and make it square using the smaller dimension
                    const currentRes = (this.customRes.value || "800x480").split('x');
                    const w = parseInt(currentRes[0]) || 480;
                    const h = parseInt(currentRes[1]) || 480;
                    const squareSize = Math.min(w, h);
                    this.customRes.value = `${squareSize}x${squareSize}`;
                    Logger.log(`[DeviceSettings] Auto-set square resolution for round display: ${squareSize}x${squareSize}`);
                    // Trigger save
                    this.customRes.dispatchEvent(new Event('change'));
                }
            });
        }

        // Robust Event Delegation with Debounce
        document.body.addEventListener('click', async (e) => {
            if (e.target && e.target.id === 'saveCustomProfileBtn') {
                e.preventDefault();
                e.stopImmediatePropagation(); // Stop other listeners

                if (this._isSavingProfile) return; // Debounce
                this._isSavingProfile = true;

                Logger.log("[DeviceSettings] saveCustomProfileBtn clicked (Delegate+Debounce)");

                try {
                    if (typeof this.handleSaveCustomProfile === 'function') {
                        await this.handleSaveCustomProfile();
                    } else {
                        Logger.error("[DeviceSettings] handleSaveCustomProfile missing");
                        alert("Error: Save function missing on DeviceSettings instance");
                    }
                } catch (err) {
                    console.error(err);
                    alert("Error saving profile: " + err.message);
                } finally {
                    setTimeout(() => { this._isSavingProfile = false; }, 1000);
                }
            }
        });
        this.setupCustomHardwareAutoSave();
    }

    setupProtocolHardwareListeners() {
        const syncProtocol = () => {
            const width = parseInt(this.protocolWidth.value) || 400;
            const height = parseInt(this.protocolHeight.value) || 300;
            const colorMode = this.protocolColorMode.value || 'bw';

            AppState.updateProtocolHardware({ width, height, colorMode });
        };

        if (this.protocolResPreset) {
            this.protocolResPreset.addEventListener('change', () => {
                const val = this.protocolResPreset.value;
                if (val !== 'custom') {
                    const [w, h] = val.split('x').map(Number);
                    this.protocolWidth.value = w;
                    this.protocolHeight.value = h;
                    syncProtocol();
                }
            });
        }

        if (this.protocolWidth) this.protocolWidth.addEventListener('input', syncProtocol);
        if (this.protocolHeight) this.protocolHeight.addEventListener('input', syncProtocol);
        if (this.protocolColorMode) this.protocolColorMode.addEventListener('change', syncProtocol);
    }

    setupCustomHardwareAutoSave() {
        const customInputs = [
            this.customChip, this.customTech, this.customRes, this.customShape,
            this.customPsram, this.customDisplayDriver, this.customTouchTech,
            'pin_cs', 'pin_dc', 'pin_rst', 'pin_busy', 'pin_clk', 'pin_mosi',
            'pin_backlight', 'pin_sda', 'pin_scl', 'pin_touch_int', 'pin_touch_rst'
        ];

        const triggerSave = () => {
            if (this.modelInput.value === 'custom') {
                const config = this.getCustomHardwareConfig();
                AppState.setCustomHardware(config);
            }
        };

        customInputs.forEach(input => {
            const el = typeof input === 'string' ? document.getElementById(input) : input;
            if (!el) return;

            const eventType = (el.type === 'checkbox' || el.tagName === 'SELECT') ? 'change' : 'input';
            el.addEventListener(eventType, triggerSave);
        });
    }

    getCustomHardwareConfig() {
        const res = (this.customRes?.value || "800x480").split('x');
        const getVal = (id) => {
            const el = document.getElementById(id);
            return el ? el.value : "";
        };

        return {
            chip: this.customChip?.value || 'esp32-s3',
            tech: this.customTech?.value || 'lcd',
            resWidth: parseInt(res[0]) || 800,
            resHeight: parseInt(res[1]) || 480,
            shape: this.customShape?.value || 'rect',
            psram: this.customPsram?.checked ?? true,
            displayDriver: this.customDisplayDriver?.value || 'st7789v',
            touchTech: this.customTouchTech?.value || 'none',
            backlightMinPower: parseFloat(getVal('customBacklightMinPower')) || 0.07,
            backlightInitial: parseFloat(getVal('customBacklightInitial')) || 0.8,
            antiburn: !!document.getElementById('customAntiburn')?.checked,
            pins: {
                cs: getVal('pin_cs'),
                dc: getVal('pin_dc'),
                rst: getVal('pin_rst'),
                busy: getVal('pin_busy'),
                clk: getVal('pin_clk'),
                mosi: getVal('pin_mosi'),
                backlight: getVal('pin_backlight'),
                sda: getVal('pin_sda'),
                scl: getVal('pin_scl'),
                touch_int: getVal('pin_touch_int'),
                touch_rst: getVal('pin_touch_rst')
            }
        };
    }

    updateCustomSectionVisibility() {
        if (!this.customHardwareSection) return;

        const mode = this.renderingModeInput ? this.renderingModeInput.value : (AppState.settings.renderingMode || 'direct');
        const isProtocol = mode === 'oepl' || mode === 'opendisplay';
        const isCustom = this.modelInput && this.modelInput.value === 'custom';

        this.customHardwareSection.style.display = (!isProtocol && isCustom) ? 'block' : 'none';
    }

    /**
     * Updates the GPIO pin datalist based on the selected chip type.
     * ESP32 has different available pins than ESP32-S3/C3/C6.
     */
    updatePinDatalist() {
        const chip = this.customChip?.value || 'esp32-s3';
        // ESP32-S3, C3, C6 use S3-style GPIO numbering; classic ESP32 uses different pins
        const datalistId = chip === 'esp32' ? 'gpio-pins-esp32' : 'gpio-pins-esp32s3';

        const pinInputIds = [
            'pin_cs', 'pin_dc', 'pin_rst', 'pin_busy', 'pin_clk', 'pin_mosi',
            'pin_backlight', 'pin_sda', 'pin_scl',
            'pin_touch_int', 'pin_touch_rst'
        ];

        pinInputIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.setAttribute('list', datalistId);
        });

        Logger.log(`[DeviceSettings] Updated pin datalists to: ${datalistId}`);
    }

    async handleSaveCustomProfile() {
        Logger.log("[DeviceSettings] handleSaveCustomProfile called");

        try {
            const name = this.customProfileNameInput ? this.customProfileNameInput.value.trim() : "";
            if (!name) {
                showToast("Please enter a name for your custom profile first.", "warning");
                if (this.customProfileNameInput) this.customProfileNameInput.focus();
                return;
            }


            const res = (this.customRes?.value || "800x480").split('x');
            const getVal = (id) => {
                const el = document.getElementById(id);
                return el ? el.value : "";
            };

            const config = {
                name: name,
                chip: this.customChip?.value || 'esp32-s3',
                tech: this.customTech?.value || 'lcd',
                resWidth: parseInt(res[0]) || 800,
                resHeight: parseInt(res[1]) || 480,
                shape: this.customShape?.value || 'rect',
                psram: this.customPsram?.checked ?? true,
                displayDriver: this.customDisplayDriver?.value || 'st7789v',
                touchTech: this.customTouchTech?.value || 'none',
                pins: {
                    cs: getVal('pin_cs'),
                    dc: getVal('pin_dc'),
                    rst: getVal('pin_rst'),
                    busy: getVal('pin_busy'),
                    clk: getVal('pin_clk'),
                    mosi: getVal('pin_mosi'),
                    backlight: getVal('pin_backlight'),
                    sda: getVal('pin_sda'),
                    scl: getVal('pin_scl'),
                    touch_int: getVal('pin_touch_int'),
                    touch_rst: getVal('pin_touch_rst')
                }
            };


            // Generate and upload

            const yaml = generateCustomHardwareYaml(config);
            const blob = new Blob([yaml], { type: 'text/yaml' });
            const fileName = `${name.toLowerCase().replace(/\s+/g, '_')}.yaml`;
            const file = new File([blob], fileName);

            showToast("Generating hardware recipe...", "info");

            // uploadHardwareTemplate will trigger loadExternalProfiles()
            await uploadHardwareTemplate(file);

            // Polling logic to find and select the new profile
            let attempts = 0;
            const findAndSelect = () => {
                // loadExternalProfiles merges into DEVICE_PROFILES and calls populateDeviceSelect
                const profiles = Object.values(window.DEVICE_PROFILES || DEVICE_PROFILES || {});
                const newProfile = profiles.find(p =>
                    p.name === name ||
                    p.name === name + " (Local)" ||
                    (p.name && p.name.includes(name))
                );

                if (newProfile) {
                    const modelId = Object.keys(window.DEVICE_PROFILES || DEVICE_PROFILES || {}).find(k => (window.DEVICE_PROFILES || DEVICE_PROFILES)[k] === newProfile);
                    if (modelId) {
                        this.modelInput.value = modelId;
                        this.modelInput.dispatchEvent(new Event('change'));
                        showToast(`Profile "${name}" created and loaded!`, "success");
                    }
                } else if (attempts < 10) {
                    attempts++;
                    Logger.log(`[DeviceSettings] New profile not found yet (attempt ${attempts}), retrying...`);
                    setTimeout(findAndSelect, 500);
                } else {
                    Logger.error("[DeviceSettings] Failed to find the newly created profile in the list.");
                    showToast("Profile created, but could not be auto-selected. Please find it in the list.", "warning");
                }
            };

            setTimeout(findAndSelect, 1000);

        } catch (err) {
            Logger.error("Failed to save custom profile:", err);
            showToast("Failed to create profile: " + err.message, "error");
        }
    }

    /**
     * Force reload hardware profiles from the server, bypassing any caches.
     * Useful when editing hardware recipe files directly on the server.
     */
    async reloadHardwareProfiles() {
        const reloadBtn = document.getElementById('reloadHardwareBtn');
        const originalText = reloadBtn ? reloadBtn.textContent : '';

        try {
            if (reloadBtn) {
                reloadBtn.disabled = true;
                reloadBtn.textContent = '⟳ Loading...';
            }

            showToast('Reloading hardware profiles...', 'info');
            Logger.log('[DeviceSettings] Force reloading hardware profiles...');

            // Clear any cached profile data
            // The loadExternalProfiles function already uses cache: "no-store",
            // but we need to ensure the profiles are re-fetched
            await loadExternalProfiles();

            // Repopulate the dropdown with fresh data
            this.populateDeviceSelect();

            showToast('Hardware profiles reloaded successfully!', 'success');
            Logger.log('[DeviceSettings] Hardware profiles reloaded, dropdown refreshed');
        } catch (err) {
            Logger.error('[DeviceSettings] Failed to reload hardware profiles:', err);
            showToast('Failed to reload profiles: ' + err.message, 'error');
        } finally {
            if (reloadBtn) {
                reloadBtn.disabled = false;
                reloadBtn.textContent = originalText;
            }
        }
    }

    open() {
        Logger.log("DeviceSettings.open() called");
        if (!this.modal) {
            Logger.error("DeviceSettings modal element not found!");
            return;
        }

        Logger.log("Opening Device Settings modal...");

        // Populate fields
        if (this.nameInput) this.nameInput.value = AppState.settings.device_name || "My E-Ink Display";
        if (this.modelInput) this.modelInput.value = AppState.settings.device_model || "reterminal_e1001";

        if (this.renderingModeInput) this.renderingModeInput.value = AppState.settings.renderingMode || 'direct';
        if (this.orientationInput) this.orientationInput.value = AppState.settings.orientation || "landscape";
        if (this.darkModeInput) this.darkModeInput.checked = !!AppState.settings.darkMode;
        if (this.extendedLatinGlyphsInput) this.extendedLatinGlyphsInput.checked = !!AppState.settings.extendedLatinGlyphs;
        if (this.invertedColorsInput) this.invertedColorsInput.checked = !!AppState.settings.invertedColors;

        // Determine power mode
        const s = AppState.settings;
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

        // Set time inputs
        if (this.sleepStart) this.sleepStart.value = s.sleepStartHour ?? 0;
        if (this.sleepEnd) this.sleepEnd.value = s.sleepEndHour ?? 5;
        if (this.dailyRefreshTime) this.dailyRefreshTime.value = s.dailyRefreshTime || "08:00";
        if (this.deepSleepInterval) this.deepSleepInterval.value = s.deepSleepInterval ?? 600;
        if (this.refreshIntervalInput) this.refreshIntervalInput.value = s.refreshInterval ?? 600;
        if (this.dimTimeoutInput) this.dimTimeoutInput.value = s.dimTimeout ?? 10;

        // Silent Hours
        if (this.noRefreshStart) this.noRefreshStart.value = s.noRefreshStartHour ?? "";
        if (this.noRefreshEnd) this.noRefreshEnd.value = s.noRefreshEndHour ?? "";

        // Auto-Cycle
        if (this.autoCycleEnabled) this.autoCycleEnabled.checked = !!s.autoCycleEnabled;
        if (this.autoCycleInterval) this.autoCycleInterval.value = s.autoCycleIntervalS ?? 30;

        // OEPL
        if (this.oeplEntityIdInput) this.oeplEntityIdInput.value = s.oeplEntityId || "";
        if (this.oeplDitherInput) this.oeplDitherInput.value = s.oeplDither ?? 2;

        // Show/hide sub-settings
        this.updateVisibility();
        this.updateStrategyGroupVisibility();
        this.populateCustomFields();
        this.populateProtocolFields();
        this.updateCustomSectionVisibility();

        this.modal.classList.remove('hidden');
        this.modal.style.display = 'flex';
        Logger.log("Device Settings modal should be visible now.");
    }

    close() {
        if (this.modal) {
            this.modal.classList.add('hidden');
            this.modal.style.display = 'none';
        }
    }

    populateCustomFields() {
        const ch = (AppState.project && AppState.project.state && AppState.project.state.customHardware) || {};
        if (!ch || Object.keys(ch).length === 0) return;

        if (this.customChip) this.customChip.value = ch.chip || "esp32-s3";
        if (this.customTech) this.customTech.value = ch.tech || "lcd";
        if (this.customRes) this.customRes.value = `${ch.resWidth || 800}x${ch.resHeight || 480}`;
        if (this.customShape) this.customShape.value = ch.shape || "rect";
        if (this.customPsram) this.customPsram.checked = !!ch.psram;

        if (this.customDisplayDriver) this.customDisplayDriver.value = ch.displayDriver || "generic_st7789";
        if (this.customTouchTech) {
            this.customTouchTech.value = ch.touchTech || "none";
            if (this.touchPinsGrid) {
                this.touchPinsGrid.style.display = (ch.touchTech && ch.touchTech !== 'none') ? 'grid' : 'none';
            }
        }

        const pins = ch.pins || {};
        const setPin = (id, val) => {
            const el = document.getElementById(id);
            if (el) el.value = val || "";
        };

        setPin('pin_cs', pins.cs);
        setPin('pin_dc', pins.dc);
        setPin('pin_rst', pins.rst);
        setPin('pin_busy', pins.busy);
        setPin('pin_clk', pins.clk);
        setPin('pin_mosi', pins.mosi);
        setPin('pin_backlight', pins.backlight);
        setPin('pin_sda', pins.sda);
        setPin('pin_scl', pins.scl);
        setPin('pin_touch_int', pins.touch_int);
        setPin('pin_touch_rst', pins.touch_rst);
    }

    populateProtocolFields() {
        const ph = (AppState.project && AppState.project.protocolHardware) || { width: 400, height: 300, colorMode: 'bw' };

        if (this.protocolWidth) this.protocolWidth.value = ph.width;
        if (this.protocolHeight) this.protocolHeight.value = ph.height;
        if (this.protocolColorMode) this.protocolColorMode.value = ph.colorMode;

        // Try to match preset
        if (this.protocolResPreset) {
            const res = `${ph.width}x${ph.height}`;
            const options = Array.from(this.protocolResPreset.options).map(o => o.value);
            if (options.includes(res)) {
                this.protocolResPreset.value = res;
            } else {
                this.protocolResPreset.value = 'custom';
            }
        }
    }

    populateDeviceSelect() {
        if (this.modelInput && DEVICE_PROFILES) {
            // Wait for backend to load? DEVICE_PROFILES is now static + dynamic
            // But we should verify it has content.
            // Logger.log("[DeviceSettings] Populating dropdown");

            const currentVal = this.modelInput.value;
            Logger.log("[DeviceSettings] Populating dropdown with", Object.keys(DEVICE_PROFILES).length, "profiles");

            this.modelInput.innerHTML = ""; // Clear existing

            // Add standard profiles
            const supportedIds = SUPPORTED_DEVICE_IDS || [];
            Object.entries(DEVICE_PROFILES).forEach(([key, profile]) => {
                Logger.log(`  - Adding: ${key} (${profile.name})`);
                const opt = document.createElement("option");
                opt.value = key;

                let displayName = profile.name;
                if (!supportedIds.includes(key)) {
                    displayName += " (untested)";
                }
                opt.textContent = displayName;

                this.modelInput.appendChild(opt);
            });

            // Add Custom Profile option at the end
            const customOpt = document.createElement("option");
            customOpt.value = "custom";
            customOpt.textContent = "Custom Profile...";
            customOpt.style.fontWeight = "bold";
            customOpt.style.color = "var(--accent)";
            this.modelInput.appendChild(customOpt);

            // Restore selection or default
            if (currentVal && (DEVICE_PROFILES[currentVal] || currentVal === 'custom')) {
                this.modelInput.value = currentVal;
            } else if (!this.modelInput.value) {
                this.modelInput.value = "reterminal_e1001";
            }

            // Update visibility of custom fields based on current selection
            this.updateCustomSectionVisibility();
        }
    }

    updateVisibility() {
        const isSleep = this.modeSleep && this.modeSleep.checked;
        const isDaily = this.modeDaily && this.modeDaily.checked;
        const isDeepSleep = this.modeDeepSleep && this.modeDeepSleep.checked;
        const isManual = this.modeManual && this.modeManual.checked;

        if (this.sleepRow) this.sleepRow.style.display = isSleep ? 'flex' : 'none';
        if (this.dailyRefreshRow) this.dailyRefreshRow.style.display = isDaily ? 'flex' : 'none';
        if (this.deepSleepRow) this.deepSleepRow.style.display = isDeepSleep ? 'block' : 'none';

        // LCD Eco Strategy: Determine current selection to show/hide sub-rows
        const lcdStrategy = AppState.settings.lcdEcoStrategy || 'backlight_off';
        const isDimTimeout = lcdStrategy === 'dim_after_timeout';
        const isBacklightOff = lcdStrategy === 'backlight_off';

        if (this.dimTimeoutRow) this.dimTimeoutRow.style.display = isDimTimeout ? 'flex' : 'none';

        // Ensure sleep times row is also shown for backlight_off in LCD mode
        const modelId = this.modelInput ? this.modelInput.value : null;
        const profiles = window.DEVICE_PROFILES || DEVICE_PROFILES || {};
        const profile = modelId ? profiles[modelId] : null;
        const isLcd = !!(profile && profile.features && (profile.features.lcd || profile.features.oled));

        if (this.sleepRow && isLcd) {
            this.sleepRow.style.display = isBacklightOff ? 'flex' : 'none';
        }

        const needsRefreshInterval = !isDaily && !isManual;
        if (this.refreshIntervalRow) this.refreshIntervalRow.style.display = needsRefreshInterval ? 'block' : 'none';

        if (this.autoCycleRow) {
            this.autoCycleRow.style.display = (this.autoCycleEnabled && this.autoCycleEnabled.checked) ? 'flex' : 'none';
        }

        // Protocol vs ESPHome Hardware Visibility
        const mode = this.renderingModeInput ? this.renderingModeInput.value : (AppState.settings.renderingMode || 'direct');
        const isProtocol = mode === 'oepl' || mode === 'opendisplay';
        const isESPHome = mode === 'lvgl' || mode === 'direct';

        if (this.protocolHardwareSection) {
            this.protocolHardwareSection.style.display = isProtocol ? 'block' : 'none';
        }
        if (this.deviceModelField) {
            this.deviceModelField.style.display = isProtocol ? 'none' : 'block';
        }

        this.updateCustomSectionVisibility();

        // ESPHome-Only Features Visibility
        if (this.powerStrategySection) {
            this.powerStrategySection.style.display = isESPHome ? 'block' : 'none';
        }
        if (this.deviceExtendedLatinGlyphsField) {
            this.deviceExtendedLatinGlyphsField.style.display = isESPHome ? 'block' : 'none';
        }
        if (this.deviceInvertedColorsField) {
            // Only show for ESPHome AND when it's an E-Paper display
            const currentModel = this.modelInput ? this.modelInput.value : null;
            const profiles = window.DEVICE_PROFILES || DEVICE_PROFILES || {};
            const profile = currentModel ? profiles[currentModel] : null;
            const isEpaper = !!(profile && profile.features && profile.features.epaper);

            this.deviceInvertedColorsField.style.display = (isESPHome && isEpaper) ? 'block' : 'none';
        }
    }

    persistToBackend() {
        if (this.saveDebounceTimer) clearTimeout(this.saveDebounceTimer);
        this.saveDebounceTimer = setTimeout(async () => {
            if (hasHaBackend() && typeof saveLayoutToBackend === "function") {
                try {
                    await saveLayoutToBackend();
                    Logger.log("[DeviceSettings] All settings persisted to backend");
                } catch (err) {
                    Logger.warn("[DeviceSettings] Failed to auto-save settings:", err);
                }
            } else {
                // Offline fallback: Save to localStorage
                try {
                    const payload = AppState.getPagesPayload();
                    payload.deviceName = AppState.deviceName;
                    payload.deviceModel = AppState.deviceModel;
                    localStorage.setItem("esphome-designer-layout", JSON.stringify(payload));
                    Logger.log("[DeviceSettings] Settings persisted to localStorage (offline mode)");
                } catch (err) {
                    Logger.warn("[DeviceSettings] Failed to save to localStorage:", err);
                }
            }
        }, 1000); // 1s debounce to allow multiple quick changes
    }

    setupAutoSaveListeners() {
        const updateSetting = (key, value) => {
            AppState.updateSettings({ [key]: value });
            Logger.log(`Auto-saved ${key}:`, value);
            this.persistToBackend();
        };

        // Device Name - debounced save to backend
        let nameDebounceTimer = null;
        if (this.nameInput) {
            this.nameInput.addEventListener('input', () => {
                const newName = this.nameInput.value.trim();
                AppState.setDeviceName(newName);
                emit(EVENTS.STATE_CHANGED);

                // Debounced save to backend (500ms after last keystroke)
                if (nameDebounceTimer) clearTimeout(nameDebounceTimer);
                nameDebounceTimer = setTimeout(async () => {
                    if (typeof saveLayoutToBackend === "function") {
                        try {
                            await saveLayoutToBackend();
                            Logger.log("[DeviceSettings] Device name saved to backend");
                        } catch (err) {
                            Logger.warn("[DeviceSettings] Failed to save device name:", err);
                        }
                    }
                }, 500);
            });
        }

        // Device Model
        if (this.modelInput) {
            this.modelInput.addEventListener('change', async () => {
                const newModel = this.modelInput.value;
                window.currentDeviceModel = newModel;
                AppState.setDeviceModel(newModel); // Update top-level deviceModel
                updateSetting('device_model', newModel); // Also persist to settings

                this.updateStrategyGroupVisibility(); // Update strategy UI
                Logger.log("Device model changed to:", newModel);
            });
        }

        // Orientation
        if (this.orientationInput) {
            this.orientationInput.addEventListener('change', () => {
                updateSetting('orientation', this.orientationInput.value);
            });
        }

        // Dark Mode
        if (this.darkModeInput) {
            this.darkModeInput.addEventListener('change', () => {
                updateSetting('darkMode', this.darkModeInput.checked);
            });
        }

        // Extended Latin Glyphs (diacritics)
        if (this.extendedLatinGlyphsInput) {
            this.extendedLatinGlyphsInput.addEventListener('change', () => {
                updateSetting('extendedLatinGlyphs', this.extendedLatinGlyphsInput.checked);
            });
        }

        // Inverted Colors (for e-paper displays with swapped black/white)
        if (this.invertedColorsInput) {
            this.invertedColorsInput.addEventListener('change', () => {
                updateSetting('invertedColors', this.invertedColorsInput.checked);
            });
        }

        if (this.renderingModeInput) {
            this.renderingModeInput.addEventListener('change', () => {
                updateSetting('renderingMode', this.renderingModeInput.value);
                this.updateVisibility(); // Update Hardware Panel Visibility
                this.updateStrategyGroupVisibility(); // Update OEPL section visibility
                Logger.log("Rendering mode changed to:", this.renderingModeInput.value);
            });
        }

        // OEPL Settings
        if (this.oeplEntityIdInput) {
            this.oeplEntityIdInput.addEventListener('input', () => {
                updateSetting('oeplEntityId', this.oeplEntityIdInput.value.trim());
            });
        }
        if (this.oeplDitherInput) {
            this.oeplDitherInput.addEventListener('change', () => {
                updateSetting('oeplDither', parseInt(this.oeplDitherInput.value));
            });
        }

        // Power Strategy
        const radios = [this.modeStandard, this.modeSleep, this.modeManual, this.modeDeepSleep, this.modeDaily];
        radios.forEach(radio => {
            if (radio) {
                radio.addEventListener('change', () => {
                    if (!radio.checked) return;

                    updateSetting('sleepEnabled', !!(this.modeSleep && this.modeSleep.checked));
                    updateSetting('manualRefreshOnly', !!(this.modeManual && this.modeManual.checked));
                    updateSetting('deepSleepEnabled', !!(this.modeDeepSleep && this.modeDeepSleep.checked));
                    updateSetting('dailyRefreshEnabled', !!(this.modeDaily && this.modeDaily.checked));

                    this.updateVisibility();
                });
            }
        });

        // Sleep Times
        if (this.sleepStart) {
            this.sleepStart.addEventListener('change', () => {
                updateSetting('sleepStartHour', parseInt(this.sleepStart.value) || 0);
            });
        }
        if (this.sleepEnd) {
            this.sleepEnd.addEventListener('change', () => {
                updateSetting('sleepEndHour', parseInt(this.sleepEnd.value) || 0);
            });
        }

        // Daily Refresh Time
        if (this.dailyRefreshTime) {
            this.dailyRefreshTime.addEventListener('change', () => {
                updateSetting('dailyRefreshTime', this.dailyRefreshTime.value);
            });
        }

        // Deep Sleep Interval
        if (this.deepSleepInterval) {
            this.deepSleepInterval.addEventListener('input', () => {
                const val = parseInt(this.deepSleepInterval.value) || 600;
                updateSetting('deepSleepInterval', val);
                // Sync with global refresh interval if that exists
                if (this.refreshIntervalInput) {
                    this.refreshIntervalInput.value = val;
                    AppState.updateSettings({ refreshInterval: val });
                }
            });
        }

        // Global Refresh Interval
        if (this.refreshIntervalInput) {
            this.refreshIntervalInput.addEventListener('input', () => {
                const val = parseInt(this.refreshIntervalInput.value) || 600;
                updateSetting('refreshInterval', val);
                // Sync with deep sleep interval for consistency
                if (this.deepSleepInterval && (this.modeDeepSleep && this.modeDeepSleep.checked)) {
                    this.deepSleepInterval.value = val;
                    AppState.updateSettings({ deepSleepInterval: val });
                }
            });
        }

        // Silent Hours
        if (this.noRefreshStart) {
            this.noRefreshStart.addEventListener('change', () => {
                const val = this.noRefreshStart.value === "" ? null : parseInt(this.noRefreshStart.value);
                updateSetting('noRefreshStartHour', val);
            });
        }
        if (this.noRefreshEnd) {
            this.noRefreshEnd.addEventListener('change', () => {
                const val = this.noRefreshEnd.value === "" ? null : parseInt(this.noRefreshEnd.value);
                updateSetting('noRefreshEndHour', val);
            });
        }

        // Auto-Cycle
        if (this.autoCycleEnabled) {
            this.autoCycleEnabled.addEventListener('change', () => {
                updateSetting('autoCycleEnabled', this.autoCycleEnabled.checked);
                this.updateVisibility();
            });
        }
        if (this.autoCycleInterval) {
            this.autoCycleInterval.addEventListener('input', () => {
                const val = Math.max(5, parseInt(this.autoCycleInterval.value) || 30);
                updateSetting('autoCycleIntervalS', val);
            });
        }

        // LCD Eco Strategy listeners
        const lcdStrategyRadios = document.querySelectorAll('input[name="lcdEcoStrategy"]');
        lcdStrategyRadios.forEach(radio => {
            radio.addEventListener('change', () => {
                if (radio.checked) {
                    updateSetting('lcdEcoStrategy', radio.value);
                    // Show/hide sub-settings based on strategy
                    if (this.sleepRow) {
                        this.sleepRow.style.display = (radio.value === 'backlight_off') ? 'flex' : 'none';
                    }
                    if (this.dimTimeoutRow) {
                        this.dimTimeoutRow.style.display = (radio.value === 'dim_after_timeout') ? 'flex' : 'none';
                    }
                }
            });
        });

        // Dim Timeout
        if (this.dimTimeoutInput) {
            this.dimTimeoutInput.addEventListener('input', () => {
                const val = parseInt(this.dimTimeoutInput.value) || 10;
                updateSetting('dimTimeout', val);
            });
        }
    }

    updateStrategyGroupVisibility() {
        const modelId = this.modelInput ? this.modelInput.value : "reterminal_e1001";
        let isLcd = false;
        let hasLvgl = false;

        if (modelId === 'custom') {
            const ch = (AppState.project && AppState.project.state && AppState.project.state.customHardware) || {};
            isLcd = ch.tech === 'lcd';
            // Custom hardware doesn't have LVGL support yet
            hasLvgl = false;
        } else {
            const profiles = window.DEVICE_PROFILES || DEVICE_PROFILES || {};
            const profile = profiles[modelId];
            isLcd = !!(profile && profile.features && (profile.features.lcd || profile.features.oled));
            hasLvgl = !!(profile && profile.features && (profile.features.lvgl || profile.features.lv_display));
        }

        if (this.strategyEpaperGroup) {
            this.strategyEpaperGroup.style.display = isLcd ? 'none' : 'flex';
        }
        if (this.strategyLcdGroup) {
            this.strategyLcdGroup.style.display = isLcd ? 'flex' : 'none';
            // Pre-select the current LCD strategy
            if (isLcd) {
                const currentStrategy = AppState.settings.lcdEcoStrategy || 'backlight_off';
                const radioToSelect = document.querySelector(`input[name="lcdEcoStrategy"][value="${currentStrategy}"]`);
                if (radioToSelect) radioToSelect.checked = true;
            }

            // Hide "Dim after timeout" if not in LVGL mode
            const currentMode = this.renderingModeInput ? this.renderingModeInput.value : (AppState.settings.renderingMode || 'direct');
            const dimRow = document.getElementById('lcd-strategy-dim-row');
            if (dimRow) {
                dimRow.style.display = (currentMode === 'lvgl') ? 'block' : 'none';

                // If it was selected but now hidden, fallback to backlight_off
                if (currentMode !== 'lvgl' && AppState.settings.lcdEcoStrategy === 'dim_after_timeout') {
                    updateSetting('lcdEcoStrategy', 'backlight_off');
                    const fallbackRadio = document.querySelector('input[name="lcdEcoStrategy"][value="backlight_off"]');
                    if (fallbackRadio) fallbackRadio.checked = true;
                    this.updateVisibility();
                }
            }
        }

        // Show rendering mode field (now always visible to allow switching to OEPL)
        if (this.renderingModeField) {
            this.renderingModeField.style.display = 'block';
            if (this.renderingModeInput) {
                this.renderingModeInput.value = AppState.settings.renderingMode || 'direct';
            }
        }

        // Show OEPL section if mode is OEPL
        if (this.oeplSettingsSection) {
            const isOEPL = (this.renderingModeInput && this.renderingModeInput.value === 'oepl') ||
                AppState.settings.renderingMode === 'oepl';
            this.oeplSettingsSection.style.display = isOEPL ? 'block' : 'none';
        }

        this.updateCustomSectionVisibility();
    }

    // Modal Logic
    openSaveProfileModal() {
        return new Promise((resolve) => {
            if (!this.saveProfileModal) {
                Logger.error("Save Profile Modal not found in DOM");
                resolve(null);
                return;
            }

            this.saveProfileResolve = resolve;
            this.saveProfileNameInput.value = "My Custom Device"; // Default
            this.saveProfileModal.classList.remove('hidden');
            this.saveProfileModal.style.display = 'flex';
            this.saveProfileNameInput.focus();
            this.saveProfileNameInput.select();

            // One-time listeners for this specific open instance
            const close = () => {
                this.saveProfileModal.classList.add('hidden');
                this.saveProfileModal.style.display = 'none';
                if (this.saveProfileResolve) {
                    this.saveProfileResolve(null);
                    this.saveProfileResolve = null;
                }
                cleanup();
            };

            const confirm = () => {
                const name = this.saveProfileNameInput.value.trim();
                if (!name) {
                    showToast("Please enter a profile name", "warning");
                    this.saveProfileNameInput.focus();
                    return;
                }

                this.saveProfileModal.classList.add('hidden');
                this.saveProfileModal.style.display = 'none';
                if (this.saveProfileResolve) {
                    this.saveProfileResolve(name);
                    this.saveProfileResolve = null;
                }
                cleanup();
            };

            const onKeyup = (e) => {
                if (e.key === 'Enter') confirm();
                if (e.key === 'Escape') close();
            };

            const cleanup = () => {
                this.saveProfileCloseBtn.removeEventListener('click', close);
                this.saveProfileConfirmBtn.removeEventListener('click', confirm);
                this.saveProfileNameInput.removeEventListener('keyup', onKeyup);
            };

            this.saveProfileCloseBtn.addEventListener('click', close);
            this.saveProfileConfirmBtn.addEventListener('click', confirm);
            this.saveProfileNameInput.addEventListener('keyup', onKeyup);
        });
    }
}
