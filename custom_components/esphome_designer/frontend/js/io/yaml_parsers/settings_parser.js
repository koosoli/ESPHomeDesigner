export function parseSettings(lines, doc) {
    const deviceSettings = {
        orientation: "landscape",
        dark_mode: false,
        sleep_enabled: false,
        sleep_start_hour: 0,
        sleep_end_hour: 5,
        manual_refresh_only: false,
        deep_sleep_enabled: false,
        deep_sleep_interval: 600,
        daily_refresh_enabled: false,
        daily_refresh_time: "08:00",
        refresh_interval: 600
    };

    for (const rawLine of lines) {
        const line = rawLine.trim();
        if (!line.startsWith("#")) continue;

        let m;
        if (m = line.match(/TARGET DEVICE:\s*(.*)/i)) deviceSettings.target_device = m[1].trim();
        if (m = line.match(/Name:\s*(.*)/i)) deviceSettings.name = m[1].trim();
        if (m = line.match(/Resolution:\s*(\d+)x(\d+)/i)) {
            deviceSettings.width = parseInt(m[1], 10);
            deviceSettings.height = parseInt(m[2], 10);
        }
        if (m = line.match(/Shape:\s*(rect|round|circle)/i)) {
            deviceSettings.shape = m[1].toLowerCase() === "rect" ? "rect" : "round";
        }
        if (m = line.match(/Inverted:\s*(true|false)/i)) deviceSettings.inverted_colors = (m[1].toLowerCase() === "true");
        if (m = line.match(/Orientation:\s*(landscape|portrait)/i)) deviceSettings.orientation = m[1].toLowerCase();
        if (m = line.match(/Dark Mode:\s*(enabled|disabled)/i)) deviceSettings.dark_mode = (m[1].toLowerCase() === "enabled");
        if (m = line.match(/Refresh Interval:\s*(\d+)/i)) deviceSettings.refresh_interval = parseInt(m[1], 10);

        // Handle New Power Strategy format
        if (m = line.match(/Power Strategy:\s*(.*)/i)) {
            const strategy = m[1].trim().toLowerCase();
            deviceSettings.sleep_enabled = strategy.includes("night");
            deviceSettings.manual_refresh_only = strategy.includes("manual");
            deviceSettings.deep_sleep_enabled = strategy.includes("ultra") || strategy.includes("deep");
            deviceSettings.daily_refresh_enabled = strategy.includes("daily");
        }

        // Individual settings (fallback or specific values)
        if (m = line.match(/Sleep Mode:\s*(enabled|disabled)/i)) deviceSettings.sleep_enabled = (m[1].toLowerCase() === "enabled");
        if (m = line.match(/Sleep Start Hour:\s*(\d+)/i)) deviceSettings.sleep_start_hour = parseInt(m[1], 10);
        if (m = line.match(/Sleep End Hour:\s*(\d+)/i)) deviceSettings.sleep_end_hour = parseInt(m[1], 10);
        if (m = line.match(/Manual Refresh:\s*(enabled|disabled)/i)) deviceSettings.manual_refresh_only = (m[1].toLowerCase() === "enabled");
        if (m = line.match(/Deep Sleep:\s*(enabled|disabled)/i)) deviceSettings.deep_sleep_enabled = (m[1].toLowerCase() === "enabled");
        if (m = line.match(/Deep Sleep Interval:\s*(\d+)/i)) deviceSettings.deep_sleep_interval = parseInt(m[1], 10);

        // Daily refresh specific
        if (m = line.match(/Refresh Time:\s*(\d{2}:\d{2})/i)) deviceSettings.daily_refresh_time = m[1];

        // Silent Hours
        if (m = line.match(/Disable updates from\s*(\d+)\s*to\s*(\d+)/i)) {
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

    return deviceSettings;
}
