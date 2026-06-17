import { AppState } from '../core/state';
import { DEVICE_PROFILES, SUPPORTED_DEVICE_IDS } from '../io/devices.js';
import { Logger } from '../utils/logger.js';

/**
 * @typedef {{ name?: string, isCustomProfile?: boolean, isOfflineImport?: boolean }} DeviceSettingsProfile
 */

/**
 * @param {any} instance
 * @returns {void}
 */
export function populateDeviceSelectView(instance) {
    if (!instance.modelInput || !DEVICE_PROFILES) return;

    const currentVal = instance.modelInput.value;
    Logger.log("[DeviceSettings] Populating dropdown with", Object.keys(DEVICE_PROFILES).length, "profiles");
    instance.modelInput.innerHTML = "";

    const supportedIds = SUPPORTED_DEVICE_IDS || [];
    /** @type {[string, DeviceSettingsProfile][]} */
    const builtInProfiles = [];
    /** @type {[string, DeviceSettingsProfile][]} */
    const userProfiles = [];

    Object.entries(/** @type {Record<string, DeviceSettingsProfile>} */ (DEVICE_PROFILES)).forEach(([key, profile]) => {
        const isUser = profile.isCustomProfile || profile.isOfflineImport;
        if (isUser) userProfiles.push([key, profile]);
        else builtInProfiles.push([key, profile]);
    });

    /**
     * @param {string} key
     * @param {{ name?: string, isCustomProfile?: boolean, isOfflineImport?: boolean }} profile
     * @returns {HTMLOptionElement}
     */
    const createOption = (key, profile) => {
        const opt = document.createElement("option");
        opt.value = key;
        let displayName = profile.name || key;
        displayName = displayName.replace(/\s*\(Local\)\s*/gi, '').replace(/\s*\(untested\)\s*/gi, '').trim();
        const suffixes = [];
        if (profile.isCustomProfile || profile.isOfflineImport) suffixes.push("Imported");
        if (!supportedIds.includes(key)) suffixes.push("untested");
        if (suffixes.length > 0) displayName += ` (${suffixes.join(", ")})`;
        opt.textContent = displayName;
        return opt;
    };

    builtInProfiles.forEach(([key, profile]) => instance.modelInput.appendChild(createOption(key, profile)));

    if (userProfiles.length > 0 && builtInProfiles.length > 0) {
        const separator = document.createElement("option");
        separator.disabled = true;
        separator.textContent = "?????? User-Imported / Custom ??????";
        separator.style.fontWeight = "bold";
        separator.style.color = "var(--text-dim)";
        instance.modelInput.appendChild(separator);
    }

    userProfiles.forEach(([key, profile]) => instance.modelInput.appendChild(createOption(key, profile)));

    const customOpt = document.createElement("option");
    customOpt.value = "custom";
    customOpt.textContent = "Custom Profile...";
    customOpt.style.fontWeight = "bold";
    customOpt.style.color = "var(--accent)";
    instance.modelInput.appendChild(customOpt);

    if (currentVal && (Object.prototype.hasOwnProperty.call(DEVICE_PROFILES, currentVal) || currentVal === 'custom')) instance.modelInput.value = currentVal;
    else if (!instance.modelInput.value) instance.modelInput.value = 'reterminal_e1001';

    try {
        if (instance.customHardwarePanel && typeof instance.customHardwarePanel.updateVisibility === "function") {
            instance.customHardwarePanel.updateVisibility();
        }
    } catch (err) {
        Logger.error("[DeviceSettingsView] Error in customHardwarePanel.updateVisibility:", err);
    }
}

/**
 * @param {any} instance
 * @returns {void}
 */
export function updateDeviceSettingsVisibility(instance) {
    if (!instance) return;

    // 1. Sleep/Daily/DeepSleep/Manual row visibility
    try {
        const isSleep = instance.modeSleep?.checked;
        const isDaily = instance.modeDaily?.checked;
        const isDeepSleep = instance.modeDeepSleep?.checked;

        if (instance.sleepRow) instance.sleepRow.style.display = (isSleep || isDeepSleep) ? 'flex' : 'none';
        if (instance.dailyRefreshRow) instance.dailyRefreshRow.style.display = isDaily ? 'flex' : 'none';
        if (instance.deepSleepRow) instance.deepSleepRow.style.display = isDeepSleep ? 'block' : 'none';
        if (instance.deepSleepOptionsRow) instance.deepSleepOptionsRow.style.display = isDeepSleep ? 'flex' : 'none';
    } catch (err) {
        Logger.error("[DeviceSettingsView] Error in power mode visibility:", err);
    }

    // 2. Dim timeout row visibility
    try {
        const lcdStrategy = AppState?.settings?.lcdEcoStrategy || 'backlight_off';
        if (instance.dimTimeoutRow) instance.dimTimeoutRow.style.display = (lcdStrategy === 'dim_after_timeout') ? 'flex' : 'none';
    } catch (err) {
        Logger.error("[DeviceSettingsView] Error in dim timeout visibility:", err);
    }

    // 3. Power strategy section, protocol hardware section, device model field visibility
    try {
        const mode = instance.renderingModeInput?.value || AppState?.settings?.renderingMode || 'direct';
        const isESPHome = mode === 'lvgl' || mode === 'direct' || mode === 'c';
        const isProtocol = mode === 'oepl' || mode === 'opendisplay';

        if (instance.powerStrategySection) instance.powerStrategySection.style.display = isESPHome ? 'block' : 'none';
        if (instance.protocolHardwareSection) instance.protocolHardwareSection.style.display = isProtocol ? 'block' : 'none';
        if (instance.deviceModelField) instance.deviceModelField.style.display = isProtocol ? 'none' : 'block';
    } catch (err) {
        Logger.error("[DeviceSettingsView] Error in section visibility:", err);
    }

    // 4. Refresh interval row and auto-cycle row visibility
    try {
        const isDaily = instance.modeDaily?.checked;
        const isManual = instance.modeManual?.checked;
        const needsRefreshInterval = !isDaily && !isManual;
        if (instance.refreshIntervalRow) instance.refreshIntervalRow.style.display = needsRefreshInterval ? 'block' : 'none';
        if (instance.autoCycleRow) {
            instance.autoCycleRow.style.display = instance.autoCycleEnabled?.checked ? 'flex' : 'none';
        }
    } catch (err) {
        Logger.error("[DeviceSettingsView] Error in refresh/cycle visibility:", err);
    }

    // 5. Deep sleep stay awake entity row visibility
    try {
        if (instance.deepSleepStayAwakeEntityRow) {
            const stayAwakeEnabled = /** @type {HTMLInputElement | null} */ (document.getElementById('setting-deep-sleep-stay-awake'));
            instance.deepSleepStayAwakeEntityRow.style.display = stayAwakeEnabled?.checked ? 'flex' : 'none';
        }
    } catch (err) {
        Logger.error("[DeviceSettingsView] Error in deep sleep stay awake visibility:", err);
    }

    // 6. Custom hardware panel and protocol hardware panel updates
    try {
        if (instance.customHardwarePanel && typeof instance.customHardwarePanel.updateVisibility === "function") {
            instance.customHardwarePanel.updateVisibility();
        }
    } catch (err) {
        Logger.error("[DeviceSettingsView] Error in customHardwarePanel.updateVisibility:", err);
    }

    try {
        if (instance.protocolHardwarePanel && typeof instance.protocolHardwarePanel.updateStrategyDisplay === "function") {
            instance.protocolHardwarePanel.updateStrategyDisplay();
        }
    } catch (err) {
        Logger.error("[DeviceSettingsView] Error in protocolHardwarePanel.updateStrategyDisplay:", err);
    }
}
