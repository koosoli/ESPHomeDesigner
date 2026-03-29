import { AppState } from '../../core/state';
import { Logger } from '../../utils/logger.js';
import { showToast } from '../../utils/dom.js';
import { DEVICE_PROFILES } from '../../io/devices.js';
import { generateCustomHardwareYaml } from '../../io/hardware_generator.js';
import { uploadHardwareTemplate } from '../../io/hardware_import.js';
import {
    readCustomHardwareConfig,
    populateCustomHardwareFields,
    loadPanelFromProfile,
    updateDisplayModelVisibility,
    updatePinDatalist
} from './custom_hardware_form.js';
export { extractYamlPin, extractYamlTopLevelBlock } from './custom_hardware_yaml.js';

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
                updatePinDatalist(this);
            });
        }

        const customDisplayDriver = this.customDisplayDriver;
        if (customDisplayDriver) {
            customDisplayDriver.addEventListener('change', () => {
                updateDisplayModelVisibility(this);
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
        return readCustomHardwareConfig(this);
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
        updateDisplayModelVisibility(this);
    }

    updatePinDatalist() {
        updatePinDatalist(this);
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
        populateCustomHardwareFields(this, ch);
    }

    /**
     * @param {string} profileId
     */
    loadFromProfile(profileId) {
        const deviceProfiles = /** @type {Record<string, any>} */ (DEVICE_PROFILES);
        loadPanelFromProfile(this, deviceProfiles[profileId]);
    }
}
