import { AppState } from '../../core/state';
import { Logger } from '../../utils/logger.js';
import { DEVICE_PROFILES, loadExternalProfiles } from '../../io/devices.js';
import { hasHaBackend } from '../../utils/env.js';
import { showToast } from '../../utils/dom.js';
import { saveLayoutToBackend } from '../../io/ha_api.js';

/**
 * @param {any} deviceSettings
 * @returns {Promise<void>}
 */
export async function reloadHardwareProfiles(deviceSettings) {
    Logger.log("Reloading hardware profiles...");
    try {
        if (typeof loadExternalProfiles === "function") {
            const reloadProfiles = /** @type {(force?: boolean) => Promise<void>} */ (loadExternalProfiles);
            await reloadProfiles(true);
            deviceSettings.populateDeviceSelect();
            showToast("Hardware profiles reloaded", "success");
        }
    } catch (err) {
        Logger.error("Failed to reload hardware profiles:", err);
        showToast("Failed to reload profiles", "error");
    }
}

/**
 * @param {any} deviceSettings
 */
export function populateDeviceSettingsForm(deviceSettings) {
    const settings = AppState.settings;

    if (deviceSettings.nameInput) deviceSettings.nameInput.value = settings.device_name || "My E-Ink Display";
    if (deviceSettings.modelInput) deviceSettings.modelInput.value = settings.device_model || "reterminal_e1001";
    if (deviceSettings.renderingModeInput) deviceSettings.renderingModeInput.value = settings.renderingMode || 'direct';
    if (deviceSettings.orientationInput) deviceSettings.orientationInput.value = settings.orientation || "landscape";
    if (deviceSettings.darkModeInput) deviceSettings.darkModeInput.checked = !!settings.darkMode;
    if (deviceSettings.invertedColorsInput) deviceSettings.invertedColorsInput.checked = !!settings.invertedColors;

    const isSleep = !!settings.sleepEnabled;
    const isManual = !!settings.manualRefreshOnly;
    const isDeepSleep = !!settings.deepSleepEnabled;
    const isDaily = !!settings.dailyRefreshEnabled;
    const isStandard = !isSleep && !isManual && !isDeepSleep && !isDaily;

    if (deviceSettings.modeStandard) deviceSettings.modeStandard.checked = isStandard;
    if (deviceSettings.modeSleep) deviceSettings.modeSleep.checked = isSleep;
    if (deviceSettings.modeManual) deviceSettings.modeManual.checked = isManual;
    if (deviceSettings.modeDeepSleep) deviceSettings.modeDeepSleep.checked = isDeepSleep;
    if (deviceSettings.modeDaily) deviceSettings.modeDaily.checked = isDaily;

    if (deviceSettings.sleepStart) deviceSettings.sleepStart.value = settings.sleepStartHour ?? 0;
    if (deviceSettings.sleepEnd) deviceSettings.sleepEnd.value = settings.sleepEndHour ?? 5;
    if (deviceSettings.dailyRefreshTime) deviceSettings.dailyRefreshTime.value = settings.dailyRefreshTime || "08:00";
    if (deviceSettings.deepSleepInterval) deviceSettings.deepSleepInterval.value = settings.deepSleepInterval ?? 600;
    if (deviceSettings.refreshIntervalInput) deviceSettings.refreshIntervalInput.value = settings.refreshInterval ?? 600;
    if (deviceSettings.dimTimeoutInput) deviceSettings.dimTimeoutInput.value = settings.dimTimeout ?? 10;

    if (deviceSettings.noRefreshStart) deviceSettings.noRefreshStart.value = settings.noRefreshStartHour ?? "";
    if (deviceSettings.noRefreshEnd) deviceSettings.noRefreshEnd.value = settings.noRefreshEndHour ?? "";

    if (deviceSettings.autoCycleEnabled) deviceSettings.autoCycleEnabled.checked = !!settings.autoCycleEnabled;
    if (deviceSettings.autoCycleInterval) deviceSettings.autoCycleInterval.value = settings.autoCycleIntervalS ?? 30;

    const stayAwakeCb = /** @type {HTMLInputElement | null} */ (document.getElementById('setting-deep-sleep-stay-awake'));
    const fwGuardCb = /** @type {HTMLInputElement | null} */ (document.getElementById('setting-deep-sleep-firmware-guard'));
    if (stayAwakeCb) stayAwakeCb.checked = !!settings.deepSleepStayAwakeSwitch;
    if (deviceSettings.deepSleepStayAwakeEntityInput) {
        deviceSettings.deepSleepStayAwakeEntityInput.value = settings.deepSleepStayAwakeEntityId || 'input_boolean.esphome_stay_awake';
    }
    if (fwGuardCb) fwGuardCb.checked = !!settings.deepSleepFirmwareGuard;

    deviceSettings.customHardwarePanel.populateFields();
    deviceSettings.protocolHardwarePanel.populateFields();
    deviceSettings.updateVisibility();
    deviceSettings.customHardwarePanel.updateVisibility();
}

/**
 * @param {any} deviceSettings
 */
export function persistDeviceSettings(deviceSettings) {
    if (deviceSettings._isSavingProfile) {
        if (deviceSettings.saveDebounceTimer) clearTimeout(deviceSettings.saveDebounceTimer);
        return;
    }

    if (deviceSettings.saveDebounceTimer) clearTimeout(deviceSettings.saveDebounceTimer);
    deviceSettings.saveDebounceTimer = setTimeout(async () => {
        if (deviceSettings._isSavingProfile) return;

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

/**
 * @param {any} deviceSettings
 * @param {string} newModel
 */
export function maybeLoadCustomHardwareProfile(deviceSettings, newModel) {
    const deviceProfiles = /** @type {Record<string, any>} */ (DEVICE_PROFILES);
    if (
        deviceProfiles[newModel]
        && (deviceProfiles[newModel].isCustomProfile || deviceProfiles[newModel].isOfflineImport)
    ) {
        deviceSettings.customHardwarePanel.loadFromProfile(newModel);
    }
}
