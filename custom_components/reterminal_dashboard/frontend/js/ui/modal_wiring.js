// Modal Button Wiring - Matches reference implementation
// This file must be loaded AFTER all modal elements exist in the DOM

document.addEventListener('DOMContentLoaded', () => {
    console.log("[ModalWiring] Initializing modal buttons...");

    // === Fullscreen Snippet Modal ===
    // Note: Wiring for fullscreenSnippetBtn and snippetFullscreenClose is handled in main.js
    // to avoid redundancy and conflicting styles.

    // === Device Settings Modal ===
    const deviceSettingsBtn = document.getElementById('deviceSettingsBtn');
    const deviceSettingsModal = document.getElementById('deviceSettingsModal');
    const deviceSettingsClose = document.getElementById('deviceSettingsClose');
    const deviceSettingsSave = document.getElementById('deviceSettingsSave');

    // Device setting inputs
    const deviceNameInput = document.getElementById('deviceName');
    const deviceModelInput = document.getElementById('deviceModel');
    const deviceOrientationInput = document.getElementById('deviceOrientation');
    const deviceDarkModeInput = document.getElementById('deviceDarkMode');

    const modeStandard = document.getElementById('mode-standard');
    const settingSleepEnabled = document.getElementById('setting-sleep-enabled');
    const settingManualRefresh = document.getElementById('setting-manual-refresh');
    const settingDeepSleepEnabled = document.getElementById('setting-deep-sleep-enabled');
    const sleepTimesRow = document.getElementById('sleep-times-row');
    const deepSleepIntervalRow = document.getElementById('deep-sleep-interval-row');
    const settingSleepStart = document.getElementById('setting-sleep-start');
    const settingSleepEnd = document.getElementById('setting-sleep-end');
    const settingDeepSleepInterval = document.getElementById('setting-deep-sleep-interval');

    function openDeviceSettings() {
        console.log("[ModalWiring] Opening device settings");

        const settings = window.AppState ? AppState.settings : {};
        const deviceName = window.AppState ? AppState.settings.device_name : "reTerminal E1001";

        if (deviceNameInput) deviceNameInput.value = deviceName || "reTerminal E1001";
        if (deviceModelInput) deviceModelInput.value = window.currentDeviceModel || "reterminal_e1001";
        if (deviceOrientationInput) deviceOrientationInput.value = settings.orientation || "landscape";
        if (deviceDarkModeInput) deviceDarkModeInput.checked = !!settings.dark_mode;

        // Determine power mode
        const isSleep = !!settings.sleep_enabled;
        const isManual = !!settings.manual_refresh_only;
        const isDeepSleep = !!settings.deep_sleep_enabled;
        const isStandard = !isSleep && !isManual && !isDeepSleep;

        if (modeStandard) modeStandard.checked = isStandard;
        if (settingSleepEnabled) settingSleepEnabled.checked = isSleep;
        if (settingManualRefresh) settingManualRefresh.checked = isManual;
        if (settingDeepSleepEnabled) settingDeepSleepEnabled.checked = isDeepSleep;

        // Set time inputs
        if (settingSleepStart) settingSleepStart.value = settings.sleep_start_hour ?? 0;
        if (settingSleepEnd) settingSleepEnd.value = settings.sleep_end_hour ?? 5;
        if (settingDeepSleepInterval) settingDeepSleepInterval.value = settings.deep_sleep_interval ?? 600;

        // Show/hide sub-settings
        if (sleepTimesRow) sleepTimesRow.style.display = isSleep ? 'flex' : 'none';
        if (deepSleepIntervalRow) deepSleepIntervalRow.style.display = isDeepSleep ? 'flex' : 'none';

        deviceSettingsModal.classList.remove("hidden");
        deviceSettingsModal.style.display = "flex";
    }

    function closeDeviceSettings() {
        deviceSettingsModal.style.display = "none";
        deviceSettingsModal.classList.add("hidden");
    }

    if (deviceSettingsBtn) {
        deviceSettingsBtn.addEventListener('click', openDeviceSettings);
    }

    if (deviceSettingsClose) {
        deviceSettingsClose.addEventListener('click', closeDeviceSettings);
    }

    if (deviceSettingsSave) {
        deviceSettingsSave.addEventListener('click', closeDeviceSettings);
    }

    // Sub-setting visibility toggles
    if (settingSleepEnabled) {
        settingSleepEnabled.addEventListener('change', () => {
            if (sleepTimesRow) sleepTimesRow.style.display = settingSleepEnabled.checked ? 'flex' : 'none';
        });
    }

    if (settingDeepSleepEnabled) {
        settingDeepSleepEnabled.addEventListener('change', () => {
            if (deepSleepIntervalRow) deepSleepIntervalRow.style.display = settingDeepSleepEnabled.checked ? 'flex' : 'none';
        });
    }

    // === Editor Settings Modal ===
    const editorSettingsBtn = document.getElementById('editorSettingsBtn');
    const editorSettingsModal = document.getElementById('editorSettingsModal');
    const editorSettingsClose = document.getElementById('editorSettingsClose');
    const editorSettingsDone = document.getElementById('editorSettingsDone');

    function openEditorSettings() {
        console.log("[ModalWiring] Opening editor settings");
        editorSettingsModal.classList.remove('hidden');
    }

    function closeEditorSettings() {
        editorSettingsModal.classList.add('hidden');
    }

    if (editorSettingsBtn) {
        editorSettingsBtn.addEventListener('click', openEditorSettings);
    }

    if (editorSettingsClose) {
        editorSettingsClose.addEventListener('click', closeEditorSettings);
    }

    if (editorSettingsDone) {
        editorSettingsDone.addEventListener('click', closeEditorSettings);
    }

    // === Page Settings Modal ===
    const pageSettingsClose = document.getElementById('pageSettingsClose');
    const pageSettingsSave = document.getElementById('pageSettingsSave');
    const pageSettingsModal = document.getElementById('pageSettingsModal');

    function closePageSettings() {
        if (pageSettingsModal) {
            pageSettingsModal.classList.add('hidden');
            pageSettingsModal.style.display = 'none';
        }
        window.currentPageSettingsTarget = null;
    }

    if (pageSettingsClose) {
        pageSettingsClose.addEventListener('click', closePageSettings);
    }

    if (pageSettingsSave) {
        pageSettingsSave.addEventListener('click', closePageSettings);
    }

    console.log("[ModalWiring] Modal buttons initialized");
});
