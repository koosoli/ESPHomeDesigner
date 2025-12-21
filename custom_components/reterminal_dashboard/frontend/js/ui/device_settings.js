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

        this.noRefreshStart = document.getElementById('setting-no-refresh-start');
        this.noRefreshEnd = document.getElementById('setting-no-refresh-end');
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

        // Silent Hours
        if (this.noRefreshStart) this.noRefreshStart.value = s.no_refresh_start_hour ?? "";
        if (this.noRefreshEnd) this.noRefreshEnd.value = s.no_refresh_end_hour ?? "";

        // Show/hide sub-settings
        this.updateVisibility();

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

            // Convert profiles to array and sort if possible, or just iterate
            Object.entries(window.DEVICE_PROFILES).forEach(([key, profile]) => {
                const opt = document.createElement("option");
                opt.value = key;
                opt.textContent = profile.name;
                this.modelInput.appendChild(opt);
            });

            // Restore selection or default
            if (currentVal && window.DEVICE_PROFILES[currentVal]) {
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

        if (this.sleepRow) this.sleepRow.style.display = isSleep ? 'flex' : 'none';
        if (this.dailyRefreshRow) this.dailyRefreshRow.style.display = isDaily ? 'flex' : 'none';
        if (this.deepSleepRow) this.deepSleepRow.style.display = isDeepSleep ? 'block' : 'none';
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
                    localStorage.setItem("esphome_designer_layout", JSON.stringify(payload));
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
                updateSetting('deep_sleep_interval', parseInt(this.deepSleepInterval.value) || 600);
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
    }
}
