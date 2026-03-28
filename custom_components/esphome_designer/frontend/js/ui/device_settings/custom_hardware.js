import { AppState } from '../../core/state';
import { Logger } from '../../utils/logger.js';
import { showToast } from '../../utils/dom.js';
import { DEVICE_PROFILES } from '../../io/devices.js';
import { generateCustomHardwareYaml } from '../../io/hardware_generator.js';
import { uploadHardwareTemplate } from '../../io/hardware_import.js';

/**
 * @typedef {{
 *   updateStrategyGroupVisibility?: () => void,
 *   renderingModeInput?: { value?: string } | null,
 *   orientationInput?: { value?: string } | null,
 *   modelInput?: ({ value?: string, dispatchEvent?: (event: Event) => void } & (HTMLInputElement | HTMLSelectElement)) | null,
 *   reloadHardwareProfiles?: () => Promise<void>
 * }} CustomHardwareParent
 */

export const CUSTOM_PROFILE_BUTTON_LABELS = Object.freeze({
    create: 'Save Profile',
    update: 'Update Profile',
    saving: 'Saving...'
});

/**
 * @param {boolean} isSavedCustom
 * @returns {string}
 */
export function getProfileButtonLabel(isSavedCustom) {
    return isSavedCustom ? CUSTOM_PROFILE_BUTTON_LABELS.update : CUSTOM_PROFILE_BUTTON_LABELS.create;
}

/**
 * @param {string} yamlText
 * @param {RegExp} regex
 * @returns {string}
 */
export function extractYamlPin(yamlText, regex) {
    const match = yamlText.match(regex);
    return match ? match[1] : '';
}

/**
 * Extract a top-level YAML block by key.
 *
 * @param {string} yamlText
 * @param {string} key
 * @returns {string}
 */
export function extractYamlTopLevelBlock(yamlText, key) {
    const lines = yamlText.split(/\r?\n/);
    const collected = [];
    let collecting = false;

    for (const line of lines) {
        const isTopLevelKey = /^[a-z0-9_]+:/i.test(line);
        if (!collecting) {
            if (line.trim().toLowerCase() === `${key.toLowerCase()}:`) {
                collecting = true;
            }
            continue;
        }

        if (isTopLevelKey) {
            break;
        }
        collected.push(line);
    }

    return collected.join('\n');
}

/**
 * Manages the complex Custom Hardware configuration UI.
 */
export class CustomHardwarePanel {
    /**
     * @param {CustomHardwareParent} parent
     */
    constructor(parent) {
        this.parent = parent;
        this._isSavingProfile = false;

        // Custom Hardware DOM elements
        /** @type {HTMLElement | null} */
        this.customHardwareSection = /** @type {HTMLElement | null} */ (document.getElementById('customHardwareSection'));
        /** @type {HTMLSelectElement | null} */
        this.customChip = /** @type {HTMLSelectElement | null} */ (document.getElementById('customChip'));
        /** @type {HTMLSelectElement | null} */
        this.customTech = /** @type {HTMLSelectElement | null} */ (document.getElementById('customTech'));
        /** @type {HTMLSelectElement | null} */
        this.customResPreset = /** @type {HTMLSelectElement | null} */ (document.getElementById('customResPreset'));
        /** @type {HTMLInputElement | null} */
        this.customRes = /** @type {HTMLInputElement | null} */ (document.getElementById('customRes'));
        /** @type {HTMLSelectElement | null} */
        this.customShape = /** @type {HTMLSelectElement | null} */ (document.getElementById('customShape'));
        /** @type {HTMLInputElement | null} */
        this.customPsram = /** @type {HTMLInputElement | null} */ (document.getElementById('customPsram'));
        /** @type {HTMLSelectElement | null} */
        this.customDisplayDriver = /** @type {HTMLSelectElement | null} */ (document.getElementById('customDisplayDriver'));
        /** @type {HTMLInputElement | HTMLSelectElement | null} */
        this.customDisplayModel = /** @type {HTMLInputElement | HTMLSelectElement | null} */ (document.getElementById('customDisplayModel'));
        /** @type {HTMLElement | null} */
        this.customDisplayModelField = /** @type {HTMLElement | null} */ (document.getElementById('customDisplayModelField'));
        /** @type {HTMLSelectElement | null} */
        this.customTouchTech = /** @type {HTMLSelectElement | null} */ (document.getElementById('customTouchTech'));
        /** @type {HTMLElement | null} */
        this.touchPinsGrid = /** @type {HTMLElement | null} */ (document.getElementById('touchPinsGrid'));
        /** @type {HTMLInputElement | null} */
        this.customProfileNameInput = /** @type {HTMLInputElement | null} */ (document.getElementById('customProfileName'));

        // Pin inputs
        /** @type {Record<string, string>} */
        this.pinInputs = {
            cs: 'pin_cs', dc: 'pin_dc', rst: 'pin_rst', busy: 'pin_busy',
            clk: 'pin_clk', mosi: 'pin_mosi', backlight: 'pin_backlight',
            sda: 'pin_sda', scl: 'pin_scl', touch_int: 'pin_touch_int',
            touch_rst: 'pin_touch_rst', battery_adc: 'pin_battery_adc',
            battery_enable: 'pin_battery_enable'
        };

        /** @type {HTMLElement | null} */
        this.customProfileEditIndicator = /** @type {HTMLElement | null} */ (document.getElementById('customProfileEditIndicator'));
        /** @type {HTMLButtonElement | null} */
        this.saveCustomProfileBtn = /** @type {HTMLButtonElement | null} */ (document.getElementById('saveCustomProfileBtn'));
    }

    init() {
        this.setupListeners();
        this.setupAutoSave();
    }

    setupListeners() {
        const customTech = this.customTech;
        if (customTech) {
            customTech.addEventListener('change', () => {
                this.parent.updateStrategyGroupVisibility?.();
            });
        }

        const customChip = this.customChip;
        if (customChip) {
            customChip.addEventListener('change', () => {
                this.updatePinDatalist();
            });
        }

        const customDisplayDriver = this.customDisplayDriver;
        if (customDisplayDriver) {
            customDisplayDriver.addEventListener('change', () => {
                this.updateDisplayModelVisibility();
            });
        }

        const customTouchTech = this.customTouchTech;
        const touchPinsGrid = this.touchPinsGrid;
        if (customTouchTech) {
            customTouchTech.addEventListener('change', () => {
                if (touchPinsGrid) {
                    touchPinsGrid.style.display = customTouchTech.value === 'none' ? 'none' : 'grid';
                }
            });
        }

        const customShape = this.customShape;
        const customRes = this.customRes;
        const customResPreset = this.customResPreset;
        if (customShape) {
            customShape.addEventListener('change', () => {
                if (customShape.value === 'round' && customRes) {
                    const currentRes = (customRes.value || "800x480").split('x');
                    const w = parseInt(currentRes[0]) || 480;
                    const h = parseInt(currentRes[1]) || 480;
                    const squareSize = Math.min(w, h);
                    customRes.value = `${squareSize}x${squareSize}`;
                    if (customResPreset) customResPreset.value = 'custom';
                    customRes.dispatchEvent(new Event('change'));
                }
            });
        }

        if (customResPreset && customRes) {
            customResPreset.addEventListener('change', () => {
                const val = customResPreset.value;
                if (val !== 'custom') {
                    customRes.value = val;
                    customRes.dispatchEvent(new Event('change'));
                }
            });

            customRes.addEventListener('input', () => {
                const currentVal = customRes.value;
                const matchesPreset = Array.from(customResPreset.options).some(opt => opt.value === currentVal);
                customResPreset.value = matchesPreset ? currentVal : 'custom';
            });
        }

        const saveBtn = /** @type {HTMLButtonElement | null} */ (document.getElementById('saveCustomProfileBtn'));
        if (saveBtn) {
            // Re-clone to clean up old listeners from device_settings.js
            const newBtn = /** @type {HTMLButtonElement} */ (saveBtn.cloneNode(true));
            if (saveBtn.parentNode) {
                saveBtn.parentNode.replaceChild(newBtn, saveBtn);
            }
            newBtn.addEventListener('click', async (e) => {
                e.preventDefault();
                await this.handleSaveCustomProfile();
            });
            this.saveCustomProfileBtn = newBtn; // Update reference
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
            const el = typeof input === 'string'
                ? /** @type {HTMLInputElement | HTMLSelectElement | null} */ (document.getElementById(input))
                : input;
            if (!el) return;
            const eventType = (el instanceof HTMLInputElement && el.type === 'checkbox') || el.tagName === 'SELECT' ? 'change' : 'input';
            el.addEventListener(eventType, triggerSave);
        });
    }

    getConfig() {
        const res = (this.customRes?.value || "800x480").split('x');
        /**
         * @param {string} id
         * @returns {string}
         */
        const getVal = (id) => {
            const element = /** @type {HTMLInputElement | HTMLSelectElement | null} */ (document.getElementById(id));
            return element?.value || "";
        };

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
            antiburn: !!(/** @type {HTMLInputElement | null} */ (document.getElementById('customAntiburn')))?.checked,
            pins: {
                cs: getVal('pin_cs'), dc: getVal('pin_dc'), rst: getVal('pin_rst'),
                busy: getVal('pin_busy'), clk: getVal('pin_clk'), mosi: getVal('pin_mosi'),
                backlight: getVal('pin_backlight'), sda: getVal('pin_sda'), scl: getVal('pin_scl'),
                touch_int: getVal('pin_touch_int'), touch_rst: getVal('pin_touch_rst'),
                batteryAdc: getVal('pin_battery_adc'), batteryEnable: getVal('pin_battery_enable')
            },
            orientation: this.parent.orientationInput?.value || 'landscape',
            isLvgl: (this.parent.renderingModeInput?.value || AppState.settings.renderingMode) === 'lvgl'
        };
    }

    updateVisibility() {
        if (!this.customHardwareSection) return;

        const mode = this.parent.renderingModeInput?.value || AppState.settings.renderingMode || 'direct';
        const isProtocol = mode === 'oepl' || mode === 'opendisplay';
        const currentModel = this.parent.modelInput?.value;
        const isCustom = currentModel === 'custom';
        const deviceProfiles = /** @type {Record<string, any>} */ (DEVICE_PROFILES);
        const isSavedCustom = !!(currentModel && deviceProfiles[currentModel] && (deviceProfiles[currentModel].isCustomProfile || deviceProfiles[currentModel].isOfflineImport));

        this.customHardwareSection.style.display = (!isProtocol && (isCustom || isSavedCustom)) ? 'block' : 'none';
        this.updateDisplayModelVisibility();

        if (isSavedCustom) {
            if (this.customProfileEditIndicator) this.customProfileEditIndicator.style.display = 'block';
            if (this.saveCustomProfileBtn) this.saveCustomProfileBtn.textContent = getProfileButtonLabel(true);
            // Disable name editing since ID is tied to it
            if (this.customProfileNameInput) this.customProfileNameInput.disabled = true;
        } else {
            if (this.customProfileEditIndicator) this.customProfileEditIndicator.style.display = 'none';
            if (this.saveCustomProfileBtn) this.saveCustomProfileBtn.textContent = getProfileButtonLabel(false);
            if (this.customProfileNameInput) this.customProfileNameInput.disabled = false;
        }
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

        const saveBtn = this.saveCustomProfileBtn;
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
                saveBtn.textContent = CUSTOM_PROFILE_BUTTON_LABELS.saving;
            }

            const config = { ...this.getConfig(), name };
            const yaml = generateCustomHardwareYaml(config);
            const fileName = `${name.toLowerCase().replace(/\s+/g, '_')}.yaml`;
            const file = new File([new Blob([yaml], { type: 'text/yaml' })], fileName);

            const deviceProfiles = /** @type {Record<string, any>} */ (DEVICE_PROFILES);
            const currentModelValue = this.parent.modelInput?.value || '';
            const isUpdate = !!(currentModelValue !== 'custom' && deviceProfiles[currentModelValue]);
            showToast(isUpdate ? "Updating hardware recipe..." : "Generating hardware recipe...", "info");

            try {
                await uploadHardwareTemplate(file);
            } catch (err) {
                const message = err instanceof Error ? err.message : String(err);
                if (!message.includes("Failed to fetch") && !message.includes("NetworkError")) {
                    throw err;
                }
            }

            const expectedId = `custom_${fileName.replace('.yaml', '').replace(/-/g, '_').replace(/\./g, '_')}`;
            showToast("Reloading profile list...", "info");
            await this.parent.reloadHardwareProfiles?.();

            let attempts = 0;
            const findAndSelect = async () => {
                const modelId = Object.keys(deviceProfiles).find(k => k === expectedId || deviceProfiles[k].name === name);

                if (modelId) {
                    if (this.parent.modelInput) {
                        this.parent.modelInput.value = modelId;
                        this.parent.modelInput.dispatchEvent?.(new Event('change'));
                    }
                    showToast(isUpdate ? `Profile "${name}" updated!` : `Profile "${name}" created and loaded!`, "success");
                    return;
                }

                if (attempts < 10) {
                    attempts++;
                    if (attempts === 5) await this.parent.reloadHardwareProfiles?.();
                    setTimeout(findAndSelect, 800);
                } else {
                    showToast("Profile created, but could not be auto-selected. Please click Reload.", "warning");
                }
            };
            setTimeout(findAndSelect, 500);

        } catch (err) {
            const message = err instanceof Error ? err.message : "Unknown error";
            Logger.error("Failed to save custom profile:", err);
            showToast(`Failed to create profile: ${message}`, "error");
        } finally {
            this._isSavingProfile = false;
            if (saveBtn) {
                saveBtn.disabled = false;
                saveBtn.textContent = originalBtnText; // Will be immediately overridden by updateVisibility, but safe to do
            }
        }
    }

    populateFields() {
        const ch = AppState.project?.state?.customHardware || {};
        if (!ch || Object.keys(ch).length === 0) return;

        if (this.customProfileNameInput) this.customProfileNameInput.value = ch.name || "";
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
        /**
         * @param {string} id
         * @param {string} val
         */
        const setPin = (id, val) => {
            const el = /** @type {HTMLInputElement | null} */ (document.getElementById(id));
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

    /**
     * @param {string} profileId
     */
    loadFromProfile(profileId) {
        const deviceProfiles = /** @type {Record<string, any>} */ (DEVICE_PROFILES);
        const profile = deviceProfiles[profileId];
        if (!profile) return;

        // Reset fields
        if (this.customProfileNameInput) this.customProfileNameInput.value = profile.name || "";
        if (this.customChip) this.customChip.value = profile.chip || "esp32-s3";

        // Tech: Infer from epaper feature
        if (this.customTech) {
            this.customTech.value = profile.features?.epaper ? "epaper" : "lcd";
        }

        // Resolution
        if (this.customRes && profile.resolution) {
            const resVal = `${profile.resolution.width}x${profile.resolution.height}`;
            this.customRes.value = resVal;
            if (this.customResPreset) {
                const options = Array.from(this.customResPreset.options).map(o => o.value);
                this.customResPreset.value = options.includes(resVal) ? resVal : 'custom';
            }
        }

        if (this.customShape) this.customShape.value = profile.shape || "rect";
        if (this.customPsram) this.customPsram.checked = !!profile.features?.psram;

        // Display driver
        if (this.customDisplayDriver) {
            // Fallback robust matching since the YAML generator might have written specific platforms
            let driver = profile.displayPlatform || "st7789v";
            if (profile.content && profile.content.includes("platform: st7789v")) driver = "st7789v";
            this.customDisplayDriver.value = driver;
        }

        if (this.customDisplayModel) this.customDisplayModel.value = profile.displayModel || "";
        this.updateDisplayModelVisibility();

        // Touch Tech parsing
        if (this.customTouchTech && profile.content) {
            const touchMatch = profile.content.match(/touchscreen:[\s\S]*?platform:\s*([a-z0-9_]+)/i);
            this.customTouchTech.value = touchMatch ? touchMatch[1] : "none";
            if (this.touchPinsGrid) {
                this.touchPinsGrid.style.display = this.customTouchTech.value === 'none' ? 'none' : 'grid';
            }
        }

        // Pins Extraction via Regex from YAML content
        const yaml = profile.content || "";

        /**
         * @param {string} id
         * @param {string} val
         */
        const setPin = (id, val) => {
            const el = /** @type {HTMLInputElement | null} */ (document.getElementById(id));
            if (el) el.value = val;
        };

        // Clear all pin inputs first
        Object.values(this.pinInputs).forEach(id => setPin(id, ""));

        // Display SPI / Control pins
        setPin('pin_cs', extractYamlPin(yaml, /cs_pin:\s*(GPIO\d+)/i));
        setPin('pin_dc', extractYamlPin(yaml, /dc_pin:\s*(GPIO\d+)/i));
        setPin('pin_clk', extractYamlPin(yaml, /clk_pin:\s*(GPIO\d+)/i));
        setPin('pin_mosi', extractYamlPin(yaml, /mosi_pin:\s*(GPIO\d+)/i));
        setPin('pin_rst', extractYamlPin(yaml, /reset_pin:\s*(GPIO\d+)/i)); // First match is usually display
        setPin('pin_busy', extractYamlPin(yaml, /busy_pin:\s*(GPIO\d+)/i));

        // I2C pins
        setPin('pin_sda', extractYamlPin(yaml, /sda:\s*(GPIO\d+)/i));
        setPin('pin_scl', extractYamlPin(yaml, /scl:\s*(GPIO\d+)/i));

        // Touch pins (often second reset_pin, interrupt_pin)
        setPin('pin_touch_int', extractYamlPin(yaml, /interrupt_pin:\s*(GPIO\d+)/i));
        const touchBlock = extractYamlTopLevelBlock(yaml, 'touchscreen');
        setPin('pin_touch_rst', touchBlock.match(/reset_pin:\s*(GPIO\d+)/i)?.[1] || "");

        // Backlight / Output
        const outBlock = extractYamlTopLevelBlock(yaml, 'output');
        setPin('pin_backlight',
            outBlock.match(/id:\s*(?:bl_pin|[a-z_]*backlight)[\s\S]*?pin:\s*(GPIO\d+)/i)?.[1] ||
            outBlock.match(/pin:\s*(GPIO\d+)[\s\S]*?id:\s*(?:bl_pin|[a-z_]*backlight)/i)?.[1] ||
            extractYamlPin(yaml, /backlight_pin:\s*(GPIO\d+)/i)
        );

        // Battery ADC
        const sensorBlock = extractYamlTopLevelBlock(yaml, 'sensor');
        setPin('pin_battery_adc',
            sensorBlock.match(/id:\s*battery_v[\s\S]*?pin:\s*(GPIO\d+)/i)?.[1] ||
            sensorBlock.match(/pin:\s*(GPIO\d+)[\s\S]*?id:\s*battery_v/i)?.[1] ||
            ""
        );

        // Battery Enable
        const switchBlock = extractYamlTopLevelBlock(yaml, 'switch');
        setPin('pin_battery_enable',
            switchBlock.match(/id:\s*battery_enable[\s\S]*?pin:\s*(GPIO\d+)/i)?.[1] ||
            switchBlock.match(/pin:\s*(GPIO\d+)[\s\S]*?id:\s*battery_enable/i)?.[1] ||
            ""
        );
    }
}
