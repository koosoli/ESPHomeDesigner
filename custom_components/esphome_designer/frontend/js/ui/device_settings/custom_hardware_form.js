import { AppState } from '../../core/state';
import { extractProfilePins, extractTouchPlatform, resolveProfileDisplayDriver } from './custom_hardware_yaml.js';

/**
 * @param {any} panel
 * @returns {void}
 */
export function updateDisplayModelVisibility(panel) {
    if (panel.customDisplayModelField && panel.customDisplayDriver) {
        const isWaveshare = panel.customDisplayDriver.value === 'waveshare_epaper';
        panel.customDisplayModelField.style.display = isWaveshare ? 'block' : 'none';
    }
}

/**
 * @param {any} panel
 * @returns {void}
 */
export function updatePinDatalist(panel) {
    const chip = panel.customChip?.value || 'esp32-s3';
    let datalistId = 'gpio-pins-esp32s3';
    if (chip === 'esp32') datalistId = 'gpio-pins-esp32';
    else if (chip === 'esp32-p4') datalistId = 'gpio-pins-esp32';
    else if (chip === 'esp8266') datalistId = 'gpio-pins-esp8266';

    Object.values(panel.pinInputs).forEach(id => {
        document.getElementById(id)?.setAttribute('list', datalistId);
    });

    const unsupportedPsram = ["esp32-c3", "esp32-c6", "esp8266"];
    if (panel.customPsram) {
        const isUnsupported = unsupportedPsram.some(c => chip.toLowerCase().includes(c));
        panel.customPsram.checked = isUnsupported ? false : panel.customPsram.checked;
        panel.customPsram.disabled = isUnsupported;
    }
}

/**
 * @param {any} panel
 * @returns {Record<string, any>}
 */
export function readCustomHardwareConfig(panel) {
    const res = (panel.customRes?.value || "800x480").split('x');

    /**
     * @param {string} id
     * @returns {string}
     */
    const getVal = (id) => {
        const element = /** @type {HTMLInputElement | HTMLSelectElement | null} */ (document.getElementById(id));
        return element?.value || "";
    };

    return {
        chip: panel.customChip?.value || 'esp32-s3',
        tech: panel.customTech?.value || 'lcd',
        resWidth: parseInt(res[0]) || 800,
        resHeight: parseInt(res[1]) || 480,
        shape: panel.customShape?.value || 'rect',
        psram: panel.customPsram?.checked ?? true,
        displayDriver: panel.customDisplayDriver?.value || 'st7789v',
        displayModel: panel.customDisplayModel?.value || '',
        touchTech: panel.customTouchTech?.value || 'none',
        backlightMinPower: parseFloat(getVal('customBacklightMinPower')) || 0.07,
        backlightInitial: parseFloat(getVal('customBacklightInitial')) || 0.8,
        antiburn: !!(/** @type {HTMLInputElement | null} */ (document.getElementById('customAntiburn')))?.checked,
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
            touch_rst: getVal('pin_touch_rst'),
            batteryAdc: getVal('pin_battery_adc'),
            batteryEnable: getVal('pin_battery_enable')
        },
        orientation: panel.parent.orientationInput?.value || 'landscape',
        isLvgl: (panel.parent.renderingModeInput?.value || AppState.settings.renderingMode) === 'lvgl'
    };
}

/**
 * @param {string} id
 * @param {string} value
 * @returns {void}
 */
function setInputValue(id, value) {
    const element = /** @type {HTMLInputElement | HTMLSelectElement | null} */ (document.getElementById(id));
    if (element) {
        element.value = value || "";
    }
}

/**
 * @param {any} panel
 * @param {Record<string, any>} customHardware
 * @returns {void}
 */
export function populateCustomHardwareFields(panel, customHardware) {
    if (!customHardware || Object.keys(customHardware).length === 0) return;

    if (panel.customProfileNameInput) panel.customProfileNameInput.value = customHardware.name || "";
    if (panel.customChip) panel.customChip.value = customHardware.chip || "esp32-s3";
    if (panel.customTech) panel.customTech.value = customHardware.tech || "lcd";
    if (panel.customRes) {
        const resVal = `${customHardware.resWidth || 800}x${customHardware.resHeight || 480}`;
        panel.customRes.value = resVal;
        if (panel.customResPreset) {
            const options = Array.from(panel.customResPreset.options).map(option => option.value);
            panel.customResPreset.value = options.includes(resVal) ? resVal : 'custom';
        }
    }
    if (panel.customShape) panel.customShape.value = customHardware.shape || "rect";
    if (panel.customPsram) panel.customPsram.checked = !!customHardware.psram;
    if (panel.customDisplayDriver) panel.customDisplayDriver.value = customHardware.displayDriver || "generic_st7789";
    if (panel.customDisplayModel) panel.customDisplayModel.value = customHardware.displayModel || "";

    updateDisplayModelVisibility(panel);

    if (panel.customTouchTech) {
        panel.customTouchTech.value = customHardware.touchTech || "none";
        if (panel.touchPinsGrid) {
            panel.touchPinsGrid.style.display = (customHardware.touchTech && customHardware.touchTech !== 'none') ? 'grid' : 'none';
        }
    }

    const pins = customHardware.pins || {};
    setInputValue('pin_cs', pins.cs);
    setInputValue('pin_dc', pins.dc);
    setInputValue('pin_rst', pins.rst);
    setInputValue('pin_busy', pins.busy);
    setInputValue('pin_clk', pins.clk);
    setInputValue('pin_mosi', pins.mosi);
    setInputValue('pin_backlight', pins.backlight);
    setInputValue('pin_sda', pins.sda);
    setInputValue('pin_scl', pins.scl);
    setInputValue('pin_touch_int', pins.touch_int);
    setInputValue('pin_touch_rst', pins.touch_rst);
    setInputValue('pin_battery_adc', pins.batteryAdc);
    setInputValue('pin_battery_enable', pins.batteryEnable);
}

/**
 * @param {any} panel
 * @param {any} profile
 * @returns {void}
 */
export function loadPanelFromProfile(panel, profile) {
    if (!profile) return;

    if (panel.customProfileNameInput) panel.customProfileNameInput.value = profile.name || "";
    if (panel.customChip) panel.customChip.value = profile.chip || "esp32-s3";

    if (panel.customTech) {
        panel.customTech.value = profile.features?.epaper ? "epaper" : "lcd";
    }

    if (panel.customRes && profile.resolution) {
        const resVal = `${profile.resolution.width}x${profile.resolution.height}`;
        panel.customRes.value = resVal;
        if (panel.customResPreset) {
            const options = Array.from(panel.customResPreset.options).map(option => option.value);
            panel.customResPreset.value = options.includes(resVal) ? resVal : 'custom';
        }
    }

    if (panel.customShape) panel.customShape.value = profile.shape || "rect";
    if (panel.customPsram) panel.customPsram.checked = !!profile.features?.psram;
    if (panel.customDisplayDriver) panel.customDisplayDriver.value = resolveProfileDisplayDriver(profile);
    if (panel.customDisplayModel) panel.customDisplayModel.value = profile.displayModel || "";

    updateDisplayModelVisibility(panel);

    const yaml = profile.content || "";
    if (panel.customTouchTech) {
        panel.customTouchTech.value = extractTouchPlatform(yaml);
        if (panel.touchPinsGrid) {
            panel.touchPinsGrid.style.display = panel.customTouchTech.value === 'none' ? 'none' : 'grid';
        }
    }

    Object.values(panel.pinInputs).forEach(id => setInputValue(id, ""));
    const pins = extractProfilePins(yaml);
    Object.entries(pins).forEach(([id, value]) => setInputValue(id, value));
}
