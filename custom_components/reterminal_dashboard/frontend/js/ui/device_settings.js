class DeviceSettings {
    constructor() {
        this.modal = document.getElementById('deviceSettingsModal');
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

        // Auto-Cycle
        this.autoCycleEnabled = document.getElementById('setting-auto-cycle');
        this.autoCycleInterval = document.getElementById('setting-auto-cycle-interval');
        this.autoCycleRow = document.getElementById('field-auto-cycle-interval');

        // Custom Hardware
        this.customHardwareSection = document.getElementById('customHardwareSection');
        this.customChip = document.getElementById('customChip');
        this.customTech = document.getElementById('customTech');
        this.customRes = document.getElementById('customRes');
        this.customShape = document.getElementById('customShape');
        this.customPsram = document.getElementById('customPsram');
        this.customDisplayDriver = document.getElementById('customDisplayDriver');
        this.customTouchTech = document.getElementById('customTouchTech');
        this.touchPinsGrid = document.getElementById('touchPinsGrid');
        this.saveCustomBtn = document.getElementById('saveCustomProfileBtn');
    }

    init() {
        if (!this.modal) return;

        // Close button
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }

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
    }

    setupCustomHardwareListeners() {
        if (!this.modelInput) return;

        this.modelInput.addEventListener('change', () => {
            this.updateCustomSectionVisibility();
        });

        if (this.customTouchTech) {
            this.customTouchTech.addEventListener('change', () => {
                if (this.touchPinsGrid) {
                    this.touchPinsGrid.style.display = this.customTouchTech.value === 'none' ? 'none' : 'grid';
                }
            });
        }

        if (this.saveCustomBtn) {
            this.saveCustomBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                await this.handleSaveCustomProfile();
            });
        }
    }

    updateCustomSectionVisibility() {
        if (this.customHardwareSection) {
            this.customHardwareSection.style.display = this.modelInput.value === 'custom' ? 'block' : 'none';
        }
    }

    async handleSaveCustomProfile() {
        const name = prompt("Enter a name for this hardware profile:", "My Custom Device");
        if (!name) return;

        const res = (this.customRes.value || "800x480").split('x');
        const getVal = (id) => {
            const el = document.getElementById(id);
            return el ? el.value : "";
        };

        const config = {
            name: name,
            chip: this.customChip.value,
            tech: this.customTech.value,
            resWidth: parseInt(res[0]) || 800,
            resHeight: parseInt(res[1]) || 480,
            shape: this.customShape.value,
            psram: this.customPsram.checked,
            displayDriver: this.customDisplayDriver.value,
            touchTech: this.customTouchTech.value,
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

        try {
            const yaml = generateCustomHardwareYaml(config);
            const blob = new Blob([yaml], { type: 'text/yaml' });
            const fileName = `${name.toLowerCase().replace(/\s+/g, '_')}.yaml`;
            const file = new File([blob], fileName);

            showToast("Generating hardware recipe...", "info");

            // uploadHardwareTemplate will trigger loadExternalProfiles() and then populateDeviceSelect()
            const result = await uploadHardwareTemplate(file);
            console.log("[DeviceSettings] Custom profile uploaded:", result);

            // Give the backend/refresh a moment to settle if needed
            let attempts = 0;
            const findAndSelect = () => {
                const profiles = Object.values(window.DEVICE_PROFILES);
                const newProfile = profiles.find(p =>
                    p.name === name ||
                    p.name === name + " (Local)" ||
                    (p.name && p.name.includes(name))
                );

                if (newProfile) {
                    const newId = newProfile.id || Object.keys(window.DEVICE_PROFILES).find(k => window.DEVICE_PROFILES[k] === newProfile);
                    console.log("[DeviceSettings] Auto-selecting new profile:", newId);

                    this.modelInput.value = newId;
                    this.modelInput.dispatchEvent(new Event('change'));

                    // Force update AppState
                    AppState.setDeviceModel(newId);
                    if (typeof saveLayoutToBackend === "function") saveLayoutToBackend();

                    // Hide the custom section now that we've switched to the new profile
                    this.updateCustomSectionVisibility();

                    showToast(`Profile "${name}" created and loaded!`, "success");
                } else if (attempts < 8) {
                    attempts++;
                    console.log(`[DeviceSettings] New profile not found yet (attempt ${attempts}), retrying...`);
                    setTimeout(findAndSelect, 400);
                } else {
                    console.error("[DeviceSettings] Failed to find the newly created profile in the list.");
                    showToast("Profile created, but could not be auto-selected. Please find it in the list.", "warning");
                }
            };

            setTimeout(findAndSelect, 600);

        } catch (err) {
            console.error("Failed to save custom profile:", err);
            showToast("Failed to create profile: " + err.message, "error");
        }
    }

    open() {
        console.log("DeviceSettings.open() called");
        if (!this.modal) {
            console.error("DeviceSettings modal element not found!");
            return;
        }

        console.log("Opening Device Settings modal...");

        // Populate fields
        if (this.nameInput) this.nameInput.value = AppState.settings.device_name || "My E-Ink Display";
        if (this.modelInput) this.modelInput.value = AppState.settings.device_model || "reterminal_e1001";
        if (this.orientationInput) this.orientationInput.value = AppState.settings.orientation || "landscape";
        if (this.darkModeInput) this.darkModeInput.checked = !!AppState.settings.dark_mode;
        if (this.extendedLatinGlyphsInput) this.extendedLatinGlyphsInput.checked = !!AppState.settings.extended_latin_glyphs;
        if (this.invertedColorsInput) this.invertedColorsInput.checked = !!AppState.settings.inverted_colors;

        // Determine power mode
        const s = AppState.settings;
        const isSleep = !!s.sleep_enabled;
        const isManual = !!s.manual_refresh_only;
        const isDeepSleep = !!s.deep_sleep_enabled;
        const isDaily = !!s.daily_refresh_enabled;
        const isStandard = !isSleep && !isManual && !isDeepSleep && !isDaily;

        if (this.modeStandard) this.modeStandard.checked = isStandard;
        if (this.modeSleep) this.modeSleep.checked = isSleep;
        if (this.modeManual) this.modeManual.checked = isManual;
        if (this.modeDeepSleep) this.modeDeepSleep.checked = isDeepSleep;
        if (this.modeDaily) this.modeDaily.checked = isDaily;

        // Set time inputs
        if (this.sleepStart) this.sleepStart.value = s.sleep_start_hour ?? 0;
        if (this.sleepEnd) this.sleepEnd.value = s.sleep_end_hour ?? 5;
        if (this.dailyRefreshTime) this.dailyRefreshTime.value = s.daily_refresh_time || "08:00";
        if (this.deepSleepInterval) this.deepSleepInterval.value = s.deep_sleep_interval ?? 600;
        if (this.refreshIntervalInput) this.refreshIntervalInput.value = s.refresh_interval ?? 600;

        // Silent Hours
        if (this.noRefreshStart) this.noRefreshStart.value = s.no_refresh_start_hour ?? "";
        if (this.noRefreshEnd) this.noRefreshEnd.value = s.no_refresh_end_hour ?? "";

        // Auto-Cycle
        if (this.autoCycleEnabled) this.autoCycleEnabled.checked = !!s.auto_cycle_enabled;
        if (this.autoCycleInterval) this.autoCycleInterval.value = s.auto_cycle_interval_s ?? 30;

        // Show/hide sub-settings
        this.updateVisibility();
        this.updateCustomSectionVisibility();

        this.modal.classList.remove('hidden');
        this.modal.style.display = 'flex';
        console.log("Device Settings modal should be visible now.");
    }

    close() {
        if (this.modal) {
            this.modal.classList.add('hidden');
            this.modal.style.display = 'none';
        }
    }

    populateDeviceSelect() {
        if (this.modelInput && window.DEVICE_PROFILES) {
            const currentVal = this.modelInput.value;
            this.modelInput.innerHTML = "";

            console.log("[DeviceSettings] Populating dropdown with", Object.keys(window.DEVICE_PROFILES).length, "profiles");

            const supportedIds = window.SUPPORTED_DEVICE_IDS || [];

            // Convert profiles to array and sort if possible, or just iterate
            Object.entries(window.DEVICE_PROFILES).forEach(([key, profile]) => {
                console.log(`  - Adding: ${key} (${profile.name})`);
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
            if (currentVal && (window.DEVICE_PROFILES[currentVal] || currentVal === 'custom')) {
                this.modelInput.value = currentVal;
            } else if (!this.modelInput.value) {
                this.modelInput.value = "reterminal_e1001";
            }
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

        const needsRefreshInterval = !isDaily && !isManual;
        if (this.refreshIntervalRow) this.refreshIntervalRow.style.display = needsRefreshInterval ? 'block' : 'none';

        if (this.autoCycleRow) {
            this.autoCycleRow.style.display = (this.autoCycleEnabled && this.autoCycleEnabled.checked) ? 'flex' : 'none';
        }
    }

    persistToBackend() {
        if (this.saveDebounceTimer) clearTimeout(this.saveDebounceTimer);
        this.saveDebounceTimer = setTimeout(async () => {
            if (hasHaBackend() && typeof saveLayoutToBackend === "function") {
                try {
                    await saveLayoutToBackend();
                    console.log("[DeviceSettings] All settings persisted to backend");
                } catch (err) {
                    console.warn("[DeviceSettings] Failed to auto-save settings:", err);
                }
            } else {
                // Offline fallback: Save to localStorage
                try {
                    const payload = AppState.getPagesPayload();
                    payload.deviceName = AppState.deviceName;
                    payload.deviceModel = AppState.deviceModel;
                    localStorage.setItem("esphome-designer-layout", JSON.stringify(payload));
                    console.log("[DeviceSettings] Settings persisted to localStorage (offline mode)");
                } catch (err) {
                    console.warn("[DeviceSettings] Failed to save to localStorage:", err);
                }
            }
        }, 1000); // 1s debounce to allow multiple quick changes
    }

    setupAutoSaveListeners() {
        const updateSetting = (key, value) => {
            AppState.settings[key] = value;
            console.log(`Auto-saved ${key}:`, value);
            emit(EVENTS.STATE_CHANGED); // Trigger snippet update
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
                            console.log("[DeviceSettings] Device name saved to backend");
                        } catch (err) {
                            console.warn("[DeviceSettings] Failed to save device name:", err);
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
                console.log("Device model changed to:", newModel);
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
                updateSetting('dark_mode', this.darkModeInput.checked);
            });
        }

        // Extended Latin Glyphs (diacritics)
        if (this.extendedLatinGlyphsInput) {
            this.extendedLatinGlyphsInput.addEventListener('change', () => {
                updateSetting('extended_latin_glyphs', this.extendedLatinGlyphsInput.checked);
            });
        }

        // Inverted Colors (for e-paper displays with swapped black/white)
        if (this.invertedColorsInput) {
            this.invertedColorsInput.addEventListener('change', () => {
                updateSetting('inverted_colors', this.invertedColorsInput.checked);
            });
        }

        // Power Strategy
        const radios = [this.modeStandard, this.modeSleep, this.modeManual, this.modeDeepSleep, this.modeDaily];
        radios.forEach(radio => {
            if (radio) {
                radio.addEventListener('change', () => {
                    if (!radio.checked) return;

                    updateSetting('sleep_enabled', !!(this.modeSleep && this.modeSleep.checked));
                    updateSetting('manual_refresh_only', !!(this.modeManual && this.modeManual.checked));
                    updateSetting('deep_sleep_enabled', !!(this.modeDeepSleep && this.modeDeepSleep.checked));
                    updateSetting('daily_refresh_enabled', !!(this.modeDaily && this.modeDaily.checked));

                    this.updateVisibility();
                });
            }
        });

        // Sleep Times
        if (this.sleepStart) {
            this.sleepStart.addEventListener('change', () => {
                updateSetting('sleep_start_hour', parseInt(this.sleepStart.value) || 0);
            });
        }
        if (this.sleepEnd) {
            this.sleepEnd.addEventListener('change', () => {
                updateSetting('sleep_end_hour', parseInt(this.sleepEnd.value) || 0);
            });
        }

        // Daily Refresh Time
        if (this.dailyRefreshTime) {
            this.dailyRefreshTime.addEventListener('change', () => {
                updateSetting('daily_refresh_time', this.dailyRefreshTime.value);
            });
        }

        // Deep Sleep Interval
        if (this.deepSleepInterval) {
            this.deepSleepInterval.addEventListener('input', () => {
                const val = parseInt(this.deepSleepInterval.value) || 600;
                updateSetting('deep_sleep_interval', val);
                // Sync with global refresh interval if that exists
                if (this.refreshIntervalInput) {
                    this.refreshIntervalInput.value = val;
                    AppState.settings.refresh_interval = val;
                }
            });
        }

        // Global Refresh Interval
        if (this.refreshIntervalInput) {
            this.refreshIntervalInput.addEventListener('input', () => {
                const val = parseInt(this.refreshIntervalInput.value) || 600;
                updateSetting('refresh_interval', val);
                // Sync with deep sleep interval for consistency
                if (this.deepSleepInterval && (this.modeDeepSleep && this.modeDeepSleep.checked)) {
                    this.deepSleepInterval.value = val;
                    AppState.settings.deep_sleep_interval = val;
                }
            });
        }

        // Silent Hours
        if (this.noRefreshStart) {
            this.noRefreshStart.addEventListener('change', () => {
                const val = this.noRefreshStart.value === "" ? null : parseInt(this.noRefreshStart.value);
                updateSetting('no_refresh_start_hour', val);
            });
        }
        if (this.noRefreshEnd) {
            this.noRefreshEnd.addEventListener('change', () => {
                const val = this.noRefreshEnd.value === "" ? null : parseInt(this.noRefreshEnd.value);
                updateSetting('no_refresh_end_hour', val);
            });
        }

        // Auto-Cycle
        if (this.autoCycleEnabled) {
            this.autoCycleEnabled.addEventListener('change', () => {
                updateSetting('auto_cycle_enabled', this.autoCycleEnabled.checked);
                this.updateVisibility();
            });
        }
        if (this.autoCycleInterval) {
            this.autoCycleInterval.addEventListener('input', () => {
                const val = Math.max(5, parseInt(this.autoCycleInterval.value) || 30);
                updateSetting('auto_cycle_interval_s', val);
            });
        }
    }
}
