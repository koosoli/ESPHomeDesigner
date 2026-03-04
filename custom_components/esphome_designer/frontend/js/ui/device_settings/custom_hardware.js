// @ts-nocheck
import { AppState } from '../../core/state';
import { Logger } from '../../utils/logger.js';
import { showToast } from '../../utils/dom.js';
import { DEVICE_PROFILES, } from '../../io/devices.js';
import { generateCustomHardwareYaml } from '../../io/hardware_generator.js';
import { uploadHardwareTemplate } from '../../io/hardware_import.js';

/**
 * Manages the complex Custom Hardware configuration UI.
 */
export class CustomHardwarePanel {
    constructor(parent) {
        this.parent = parent;
        this._isSavingProfile = false;

        // Custom Hardware DOM elements
        this.customHardwareSection = document.getElementById('customHardwareSection');
        this.customChip = document.getElementById('customChip');
        this.customTech = document.getElementById('customTech');
        this.customResPreset = document.getElementById('customResPreset');
        this.customRes = document.getElementById('customRes');
        this.customShape = document.getElementById('customShape');
        this.customPsram = document.getElementById('customPsram');
        this.customDisplayDriver = document.getElementById('customDisplayDriver');
        this.customDisplayModel = document.getElementById('customDisplayModel');
        this.customDisplayModelField = document.getElementById('customDisplayModelField');
        this.customTouchTech = document.getElementById('customTouchTech');
        this.touchPinsGrid = document.getElementById('touchPinsGrid');
        this.customProfileNameInput = document.getElementById('customProfileName');

        // Pin inputs
        this.pinInputs = {
            cs: 'pin_cs', dc: 'pin_dc', rst: 'pin_rst', busy: 'pin_busy',
            clk: 'pin_clk', mosi: 'pin_mosi', backlight: 'pin_backlight',
            sda: 'pin_sda', scl: 'pin_scl', touch_int: 'pin_touch_int',
            touch_rst: 'pin_touch_rst', battery_adc: 'pin_battery_adc',
            battery_enable: 'pin_battery_enable'
        };
    }

    init() {
        this.setupListeners();
        this.setupAutoSave();
    }

    setupListeners() {
        if (this.customTech) {
            this.customTech.addEventListener('change', () => {
                this.parent.updateStrategyGroupVisibility();
            });
        }

        if (this.customChip) {
            this.customChip.addEventListener('change', () => {
                this.updatePinDatalist();
            });
        }

        if (this.customDisplayDriver) {
            this.customDisplayDriver.addEventListener('change', () => {
                this.updateDisplayModelVisibility();
            });
        }

        if (this.customTouchTech) {
            this.customTouchTech.addEventListener('change', () => {
                if (this.touchPinsGrid) {
                    this.touchPinsGrid.style.display = this.customTouchTech.value === 'none' ? 'none' : 'grid';
                }
            });
        }

        if (this.customShape) {
            this.customShape.addEventListener('change', () => {
                if (this.customShape.value === 'round' && this.customRes) {
                    const currentRes = (this.customRes.value || "800x480").split('x');
                    const w = parseInt(currentRes[0]) || 480;
                    const h = parseInt(currentRes[1]) || 480;
                    const squareSize = Math.min(w, h);
                    this.customRes.value = `${squareSize}x${squareSize}`;
                    if (this.customResPreset) this.customResPreset.value = 'custom';
                    this.customRes.dispatchEvent(new Event('change'));
                }
            });
        }

        if (this.customResPreset && this.customRes) {
            this.customResPreset.addEventListener('change', () => {
                const val = this.customResPreset.value;
                if (val !== 'custom') {
                    this.customRes.value = val;
                    this.customRes.dispatchEvent(new Event('change'));
                }
            });

            this.customRes.addEventListener('input', () => {
                const currentVal = this.customRes.value;
                const matchesPreset = Array.from(this.customResPreset.options).some(opt => opt.value === currentVal);
                this.customResPreset.value = matchesPreset ? currentVal : 'custom';
            });
        }

        const saveBtn = document.getElementById('saveCustomProfileBtn');
        if (saveBtn) {
            // Re-clone to clean up old listeners from device_settings.js
            const newBtn = saveBtn.cloneNode(true);
            saveBtn.parentNode.replaceChild(newBtn, saveBtn);
            newBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                await this.handleSaveCustomProfile();
            });
        }
    }

    setupAutoSave() {
        const customInputs = [
            this.customChip, this.customTech, this.customResPreset, this.customRes, this.customShape,
            this.customPsram, this.customDisplayDriver, this.customDisplayModel, this.customTouchTech,
            ...Object.values(this.pinInputs)
        ];

        const triggerSave = () => {
            if (this.parent.modelInput && this.parent.modelInput.value === 'custom') {
                const config = this.getConfig();
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

    getConfig() {
        const res = (this.customRes?.value || "800x480").split('x');
        const getVal = (id) => document.getElementById(id)?.value || "";

        return {
            chip: this.customChip?.value || 'esp32-s3',
            tech: this.customTech?.value || 'lcd',
            resWidth: parseInt(res[0]) || 800,
            resHeight: parseInt(res[1]) || 480,
            shape: this.customShape?.value || 'rect',
            psram: this.customPsram?.checked ?? true,
            displayDriver: this.customDisplayDriver?.value || 'st7789v',
            displayModel: this.customDisplayModel?.value || '',
            touchTech: this.customTouchTech?.value || 'none',
            backlightMinPower: parseFloat(getVal('customBacklightMinPower')) || 0.07,
            backlightInitial: parseFloat(getVal('customBacklightInitial')) || 0.8,
            antiburn: !!document.getElementById('customAntiburn')?.checked,
            pins: {
                cs: getVal('pin_cs'), dc: getVal('pin_dc'), rst: getVal('pin_rst'),
                busy: getVal('pin_busy'), clk: getVal('pin_clk'), mosi: getVal('pin_mosi'),
                backlight: getVal('pin_backlight'), sda: getVal('pin_sda'), scl: getVal('pin_scl'),
                touch_int: getVal('pin_touch_int'), touch_rst: getVal('pin_touch_rst'),
                batteryAdc: getVal('pin_battery_adc'), batteryEnable: getVal('pin_battery_enable')
            },
            orientation: this.parent.orientationInput?.value || 'landscape'
        };
    }

    updateVisibility() {
        if (!this.customHardwareSection) return;

        const mode = this.parent.renderingModeInput?.value || AppState.settings.renderingMode || 'direct';
        const isProtocol = mode === 'oepl' || mode === 'opendisplay';
        const isCustom = this.parent.modelInput && this.parent.modelInput.value === 'custom';

        this.customHardwareSection.style.display = (!isProtocol && isCustom) ? 'block' : 'none';
        this.updateDisplayModelVisibility();
    }

    updateDisplayModelVisibility() {
        if (this.customDisplayModelField && this.customDisplayDriver) {
            const isWaveshare = this.customDisplayDriver.value === 'waveshare_epaper';
            this.customDisplayModelField.style.display = isWaveshare ? 'block' : 'none';
        }
    }

    updatePinDatalist() {
        const chip = this.customChip?.value || 'esp32-s3';
        let datalistId = 'gpio-pins-esp32s3';
        if (chip === 'esp32') datalistId = 'gpio-pins-esp32';
        else if (chip === 'esp8266') datalistId = 'gpio-pins-esp8266';

        Object.values(this.pinInputs).forEach(id => {
            document.getElementById(id)?.setAttribute('list', datalistId);
        });

        const unsupportedPsram = ["esp32-c3", "esp32-c6", "esp8266"];
        if (this.customPsram) {
            const isUnsupported = unsupportedPsram.some(c => chip.toLowerCase().includes(c));
            this.customPsram.checked = isUnsupported ? false : this.customPsram.checked;
            this.customPsram.disabled = isUnsupported;
        }
    }

    async handleSaveCustomProfile() {
        if (this._isSavingProfile) return;
        this._isSavingProfile = true;

        const saveBtn = document.getElementById('saveCustomProfileBtn');
        const originalBtnText = saveBtn?.textContent || "Save Profile";

        try {
            const name = this.customProfileNameInput?.value.trim() || "";
            if (!name) {
                showToast("Please enter a name for your custom profile first.", "warning");
                this.customProfileNameInput?.focus();
                return;
            }

            if (saveBtn) {
                saveBtn.disabled = true;
                saveBtn.textContent = "Saving...";
            }

            const config = { ...this.getConfig(), name };
            const yaml = generateCustomHardwareYaml(config);
            const fileName = `${name.toLowerCase().replace(/\s+/g, '_')}.yaml`;
            const file = new File([new Blob([yaml], { type: 'text/yaml' })], fileName);

            showToast("Generating hardware recipe...", "info");

            try {
                await uploadHardwareTemplate(file);
            } catch (err) {
                if (!err.message.includes("Failed to fetch") && !err.message.includes("NetworkError")) {
                    throw err;
                }
            }

            const expectedId = `custom_${fileName.replace('.yaml', '').replace(/-/g, '_').replace(/\./g, '_')}`;
            showToast("Reloading profile list...", "info");
            await this.parent.reloadHardwareProfiles();

            let attempts = 0;
            const findAndSelect = async () => {
                const profiles = window.DEVICE_PROFILES || DEVICE_PROFILES || {};
                const modelId = Object.keys(profiles).find(k => k === expectedId || profiles[k].name === name);

                if (modelId) {
                    this.parent.modelInput.value = modelId;
                    this.parent.modelInput.dispatchEvent(new Event('change'));
                    showToast(`Profile "${name}" created and loaded!`, "success");
                    return;
                }

                if (attempts < 10) {
                    attempts++;
                    if (attempts === 5) await this.parent.reloadHardwareProfiles();
                    setTimeout(findAndSelect, 800);
                } else {
                    showToast("Profile created, but could not be auto-selected. Please click Reload.", "warning");
                }
            };
            setTimeout(findAndSelect, 500);

        } catch (err) {
            Logger.error("Failed to save custom profile:", err);
            showToast("Failed to create profile: " + (err.message || "Unknown error"), "error");
        } finally {
            this._isSavingProfile = false;
            if (saveBtn) {
                saveBtn.disabled = false;
                saveBtn.textContent = originalBtnText;
            }
        }
    }

    populateFields() {
        const ch = AppState.project?.state?.customHardware || {};
        if (!ch || Object.keys(ch).length === 0) return;

        if (this.customChip) this.customChip.value = ch.chip || "esp32-s3";
        if (this.customTech) this.customTech.value = ch.tech || "lcd";
        if (this.customRes) {
            const resVal = `${ch.resWidth || 800}x${ch.resHeight || 480}`;
            this.customRes.value = resVal;
            if (this.customResPreset) {
                const options = Array.from(this.customResPreset.options).map(o => o.value);
                this.customResPreset.value = options.includes(resVal) ? resVal : 'custom';
            }
        }
        if (this.customShape) this.customShape.value = ch.shape || "rect";
        if (this.customPsram) this.customPsram.checked = !!ch.psram;
        if (this.customDisplayDriver) this.customDisplayDriver.value = ch.displayDriver || "generic_st7789";
        if (this.customDisplayModel) this.customDisplayModel.value = ch.displayModel || "";

        this.updateDisplayModelVisibility();

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
        setPin('pin_battery_adc', pins.batteryAdc);
        setPin('pin_battery_enable', pins.batteryEnable);
    }
}
