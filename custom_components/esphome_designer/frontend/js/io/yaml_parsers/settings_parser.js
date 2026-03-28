/**
 * @param {string[]} lines
 * @param {Record<string, any> | null | undefined} doc
 * @returns {Record<string, any>}
 */
export function parseSettings(lines, doc) {
    const deviceSettings = /** @type {Record<string, any>} */ ({
        orientation: "landscape",
        dark_mode: false,
        sleep_enabled: false,
        sleep_start_hour: 0,
        sleep_end_hour: 5,
        manual_refresh_only: false,
        deep_sleep_enabled: false,
        deep_sleep_interval: 600,
        deep_sleep_stay_awake_switch: false,
        deep_sleep_stay_awake_entity_id: "input_boolean.esphome_stay_awake",
        deep_sleep_firmware_guard: false,
        daily_refresh_enabled: false,
        daily_refresh_time: "08:00",
        refresh_interval: 600
    });

    for (const rawLine of lines) {
        const line = rawLine.trim();
        if (!line.startsWith("#")) continue;

        let m;
        m = line.match(/TARGET DEVICE:\s*(.*)/i);
        if (m) deviceSettings.target_device = m[1].trim();

        m = line.match(/Name:\s*(.*)/i);
        if (m) deviceSettings.name = m[1].trim();

        m = line.match(/Resolution:\s*(\d+)x(\d+)/i);
        if (m) {
            deviceSettings.width = parseInt(m[1], 10);
            deviceSettings.height = parseInt(m[2], 10);
        }

        m = line.match(/Shape:\s*(rect|round|circle)/i);
        if (m) {
            deviceSettings.shape = m[1].toLowerCase() === "rect" ? "rect" : "round";
        }

        m = line.match(/Inverted:\s*(true|false)/i);
        if (m) deviceSettings.inverted_colors = (m[1].toLowerCase() === "true");

        m = line.match(/Orientation:\s*(landscape|portrait)/i);
        if (m) deviceSettings.orientation = m[1].toLowerCase();

        m = line.match(/Dark Mode:\s*(enabled|disabled)/i);
        if (m) deviceSettings.dark_mode = (m[1].toLowerCase() === "enabled");

        m = line.match(/Refresh Interval:\s*(\d+)/i);
        if (m) deviceSettings.refresh_interval = parseInt(m[1], 10);

        // Handle New Power Strategy format
        m = line.match(/Power Strategy:\s*(.*)/i);
        if (m) {
            const strategy = m[1].trim().toLowerCase();
            deviceSettings.sleep_enabled = strategy.includes("night");
            deviceSettings.manual_refresh_only = strategy.includes("manual");
            deviceSettings.deep_sleep_enabled = strategy.includes("ultra") || strategy.includes("deep");
            deviceSettings.daily_refresh_enabled = strategy.includes("daily");
        }

        // Individual settings (fallback or specific values)
        m = line.match(/Sleep Mode:\s*(enabled|disabled)/i);
        if (m) deviceSettings.sleep_enabled = (m[1].toLowerCase() === "enabled");

        m = line.match(/Sleep Start Hour:\s*(\d+)/i);
        if (m) deviceSettings.sleep_start_hour = parseInt(m[1], 10);

        m = line.match(/Sleep End Hour:\s*(\d+)/i);
        if (m) deviceSettings.sleep_end_hour = parseInt(m[1], 10);

        m = line.match(/Manual Refresh:\s*(enabled|disabled)/i);
        if (m) deviceSettings.manual_refresh_only = (m[1].toLowerCase() === "enabled");

        m = line.match(/Deep Sleep:\s*(enabled|disabled)/i);
        if (m) deviceSettings.deep_sleep_enabled = (m[1].toLowerCase() === "enabled");

        m = line.match(/Deep Sleep Stay Awake Switch:\s*(enabled|disabled)/i);
        if (m) deviceSettings.deep_sleep_stay_awake_switch = (m[1].toLowerCase() === "enabled");

        m = line.match(/Deep Sleep Stay Awake Entity:\s*(.+)/i);
        if (m) deviceSettings.deep_sleep_stay_awake_entity_id = m[1].trim();

        m = line.match(/Deep Sleep Firmware Guard:\s*(enabled|disabled)/i);
        if (m) deviceSettings.deep_sleep_firmware_guard = (m[1].toLowerCase() === "enabled");

        m = line.match(/Deep Sleep Interval:\s*(\d+)/i);
        if (m) deviceSettings.deep_sleep_interval = parseInt(m[1], 10);

        // Daily refresh specific
        m = line.match(/Refresh Time:\s*(\d{2}:\d{2})/i);
        if (m) deviceSettings.daily_refresh_time = m[1];

        // Silent Hours
        m = line.match(/Disable updates from\s*(\d+)\s*to\s*(\d+)/i);
        if (m) {
            deviceSettings.no_refresh_start_hour = parseInt(m[1], 10);
            deviceSettings.no_refresh_end_hour = parseInt(m[2], 10);
        }
    }

    // Try to extract from the AST (doc) if missing from comments
    if (doc) {
        if (doc.esphome && doc.esphome.name && !deviceSettings.name) {
            deviceSettings.name = doc.esphome.name;
        }
    }

    // Normalize snake_case → camelCase for downstream consumers
    const keyMap = {
        sleep_enabled: 'sleepEnabled',
        sleep_start_hour: 'sleepStartHour',
        sleep_end_hour: 'sleepEndHour',
        manual_refresh_only: 'manualRefreshOnly',
        deep_sleep_enabled: 'deepSleepEnabled',
        deep_sleep_interval: 'deepSleepInterval',
        deep_sleep_stay_awake_switch: 'deepSleepStayAwakeSwitch',
        deep_sleep_stay_awake_entity_id: 'deepSleepStayAwakeEntityId',
        deep_sleep_firmware_guard: 'deepSleepFirmwareGuard',
        daily_refresh_enabled: 'dailyRefreshEnabled',
        daily_refresh_time: 'dailyRefreshTime',
        refresh_interval: 'refreshInterval',
        no_refresh_start_hour: 'noRefreshStartHour',
        no_refresh_end_hour: 'noRefreshEndHour',
        dark_mode: 'darkMode',
    };
    for (const [snake, camel] of Object.entries(keyMap)) {
        if (deviceSettings[snake] !== undefined) {
            deviceSettings[camel] = deviceSettings[snake];
        }
    }

    return deviceSettings;
}
