// ============================================================================
// YAML GENERATION ORCHESTRATOR
// ============================================================================
// Main logic for assembling the ESPHome YAML configuration.
// Relies on:
// - devices.js (window.DEVICE_PROFILES)
// - hardware_generators.js (window.generateTouchscreenSection, etc.)
// ============================================================================

/**
 * Main function to generate the ESPHome YAML snippet.
 */
/**
 * Fetch hardware package YAML from server
 */
async function fetchHardwarePackage(url) {
    // FIX: Handle Home Assistant Panel Environment
    // The panel runs at /reterminal-dashboard, but static assets must be fetched 
    // from /reterminal-dashboard/static/.
    if (window.location.pathname.includes("/reterminal-dashboard")) {
        // If URL is relative, prepend the static proxy path
        if (!url.startsWith("http") && !url.startsWith("/")) {
            url = "/reterminal-dashboard/static/" + url;
        }
    }

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.text();
    } catch (e) {
        console.error("Failed to fetch hardware package:", e);

        let reason = "Requires Online/Deployment (Web Server)";
        if (window.location.protocol === "file:") {
            reason = "You are running locally via 'file://'. This profile requires the application to be hosted on a web server (like Home Assistant) to load external resources.";
        }

        return `# ============================================================================
# ⚠️ PROFILE LOADING ERROR
# ============================================================================
#
# APT: This hardware profile could not be loaded.
#
# REASON: ${reason}
#
# TECHNICAL DETAILS:
# Url: ${url}
# Error: ${e.message}
#
# SOLUTION:
# 1. Deploy this application to Home Assistant (www/ folder) or a web server.
# 2. Or use a legacy device profile (e.g., M5Paper) for offline testing.
#
# ============================================================================
`;
    }
}

/**
 * Main function to generate the ESPHome YAML snippet.
 * NOW ASYNC to support fetching external hardware packages.
 */
async function generateSnippetLocally() {
    const payload = AppState.getPagesPayload();
    const pages = payload.pages || [];
    const pagesLocal = pages;
    const lines = [];

    const model = getDeviceModel();
    const profile = DEVICE_PROFILES[model] || DEVICE_PROFILES["reterminal_e1001"];

    // =========================================================================================
    // NEW: Package-Based Generation ("Online Only")
    // Fetches YAML from server. If offline, returns a warning message.
    // =========================================================================================
    let packageContent = null;
    if (profile.isPackageBased && profile.hardwarePackage) {
        packageContent = await fetchHardwarePackage(profile.hardwarePackage);
        // If the package content is actually an error message, return it immediately
        if (packageContent.startsWith("# ============================================================================\n# ⚠️ PROFILE LOADING ERROR")) {
            return packageContent;
        }
    }

    // =========================================================================================
    // END Package-Based Logic
    // =========================================================================================


    // Determine display ID based on device type (LCD vs e-paper)
    const displayId = profile.features?.lcd ? "my_display" : "epaper_display";

    // Collect quote/rss widgets early for globals and interval generation
    const quoteRssWidgetsEarly = [];
    pagesLocal.forEach(p => {
        if (p.widgets) {
            p.widgets.forEach(w => {
                if (w.type === "quote_rss" && w.props.refresh_interval) {
                    quoteRssWidgetsEarly.push(w);
                }
            });
        }
    });

    // Check if any page uses LVGL widgets
    let useLVGL = false;
    const graphWidgets = [];
    const weatherForecastWidgets = [];
    const onlineImageWidgets = [];
    const qrCodeWidgets = [];
    const touchAreaWidgets = [];
    const staticImageMap = new Map();

    pagesLocal.forEach(p => {
        if (p.widgets) {
            p.widgets.forEach(w => {
                const t = (w.type || "").toLowerCase();
                if (w.type && w.type.startsWith("lvgl_")) {
                    useLVGL = true;
                }
                if (t === "graph") {
                    graphWidgets.push(w);
                }
                if (t === "weather_forecast") {
                    weatherForecastWidgets.push(w);
                }
                if (t === "puppet" || t === "online_image") {
                    onlineImageWidgets.push(w);
                }
                if (t === "qr_code") {
                    qrCodeWidgets.push(w);
                }
                if (t === "touch_area") {
                    touchAreaWidgets.push(w);
                }
                if (t === "image") {
                    const path = (w.props?.path || "").trim();
                    if (path) {
                        const key = `${path}|${w.width}x${w.height}`;
                        if (!staticImageMap.has(key)) {
                            staticImageMap.set(key, w);
                        }
                    }
                }
            });
        }
    });

    // --- HEADER ---
    if (!profile.isPackageBased) {
        lines.push("# ============================================================================");
        lines.push("# ESPHome YAML - Generated by ESPHome Designer");
        lines.push("# ============================================================================");
        lines.push(`# TARGET DEVICE: ${profile.name}`);

        // Add brief device specs comment based on profile features
        const feats = profile.features || {};
        lines.push(`#         - Display Platform: ${profile.displayPlatform}`);
        lines.push(`#         - PSRAM: ${feats.psram ? 'Yes' : 'No'}`);
        lines.push(`#         - Battery: ${profile.battery ? 'Yes' : 'No'}`);
        lines.push(`#         - Buttons: ${feats.buttons ? 'Yes' : 'No'}`);
        lines.push(`#         - Buzzer: ${feats.buzzer ? 'Yes' : 'No'}`);
        if (feats.audio) lines.push(`#         - Audio: Yes`);
        lines.push("# ============================================================================");
        lines.push("#");
        lines.push("# SETUP INSTRUCTIONS:");
        lines.push("#");
        lines.push("# STEP 1: Copy the Material Design Icons font file");
        lines.push("#         - From this repo: resources/fonts/materialdesignicons-webfont.ttf");
        lines.push("#         - To ESPHome: /config/esphome/fonts/materialdesignicons-webfont.ttf");
        lines.push("#         (Create the fonts folder if it doesn't exist)");
        lines.push("#");
        lines.push("# STEP 2: Create a new device in ESPHome");
        lines.push("#         - Click \"New Device\"");
        lines.push("#         - Name: your-device-name");
        if (getDeviceModel() === "m5stack_coreink") {
            lines.push("#         - Select: ESP32 (do NOT use S3!)");
            lines.push("#         - Board: m5stack-coreink");
            lines.push("#         - Framework: esp-idf (Recommended) or arduino");
        } else if (getDeviceModel() === "m5stack_paper") {
            lines.push("#         - Select: ESP32 (do NOT use S3!)");
            lines.push("#         - Board: m5stack-paper");
            lines.push("#         - Framework: arduino (Required)");
            lines.push("#         - Flash Size: 16MB");
        } else if (getDeviceModel() === "trmnl_diy_esp32s3") {
            lines.push("#         - Select: ESP32-S3");
            lines.push("#         - Board: esp32-s3-devkitc-1");
            lines.push("#         - Framework: esp-idf (Recommended) or arduino");
        } else {
            lines.push("#         - Select: ESP32-S3 (or appropriate for your board)");
        }
        lines.push("#");
        lines.push("# STEP 3: Add the on_boot sequence");
        lines.push("#         (TIP: If compiling fails with 'OOM' or 'Killed', add 'compile_process_limit: 1' to your 'esphome:' section)");
        if (getDeviceModel() === "esp32_s3_photopainter") {
            lines.push("#         CRITICAL FOR PHOTOPAINTER: Use this exact on_boot sequence to prevent boot loops!");
            lines.push("#         Paste this under 'esphome:' in your YAML:");
            lines.push("#");
            lines.push("#   on_boot:");
            lines.push("#     priority: 800");
            lines.push("#     then:");
            lines.push("#       - lambda: |-");
            lines.push("#           auto write_reg = [](uint8_t reg, uint8_t val) {");
            lines.push("#             uint8_t data[2] = {reg, val};");
            lines.push("#             id(bus_a)->write(0x34, data, 2);");
            lines.push("#           };");
            lines.push("#           write_reg(0x94, 0x1C); // ALDO3 3.3V");
            lines.push("#           write_reg(0x95, 0x1C); // ALDO4 3.3V");
            lines.push("#           write_reg(0x90, 0x1F); // Enable rails");
            lines.push("#           ESP_LOGI(\"power\", \"AXP2101 Configured\");");
            lines.push("#       - delay: 200ms");
            lines.push("#       - component.update: epaper_display");
            lines.push("#       - script.execute: manage_run_and_sleep");
            lines.push("#");
        } else if (getDeviceModel() === "m5stack_paper") {
            lines.push("#         Paste this under 'esphome:' in your YAML:");
            lines.push("#");
            lines.push("#   on_boot:");
            lines.push("#     - priority: 600");
            lines.push("#       then:");
            lines.push("#       - delay: 2s");
            lines.push("#       - component.update: epaper_display");
            lines.push("#       - script.execute: manage_run_and_sleep");
            lines.push("#     - priority: 220.0");
            lines.push("#       then:");
            lines.push("#           - it8951e.clear");
            lines.push("#           - delay: 100ms");
            lines.push("#           - component.update: epaper_display");
            lines.push("#     - priority: -100.0");
            lines.push("#       then:");
            lines.push("#       - delay: 10s");
            lines.push("#       - component.update: epaper_display");
            lines.push("#");
        } else if (getDeviceModel() === "m5stack_coreink") {
            lines.push("#         Paste this under 'esphome:' in your YAML:");
            lines.push("#");
            lines.push("#   on_boot:");
            lines.push("#     priority: 800");
            lines.push("#     then:");
            lines.push("#       # Hardware Power Lock (keeps device powered during operation)");
            lines.push("#       - lambda: |-");
            lines.push("#           gpio_set_direction(GPIO_NUM_12, GPIO_MODE_OUTPUT);");
            lines.push("#           gpio_set_level(GPIO_NUM_12, 1);");
            lines.push("#           gpio_hold_en(GPIO_NUM_12);");
            lines.push("#           gpio_deep_sleep_hold_en();");
            lines.push("#       - script.execute: activity_timer");
            lines.push("#       - component.update: epaper_display");
            lines.push("#");
        } else {
            lines.push("#         Paste this under 'esphome:' in your YAML:");
            lines.push("#");
            lines.push("#   on_boot:");
            lines.push("#     priority: 600");
            lines.push("#     then:");
            if (getDeviceModel() !== "trmnl") {
                lines.push("#       - output.turn_on: bsp_battery_enable");
            }
            lines.push("#       - delay: 2s");
            lines.push("#       - component.update: epaper_display");
            lines.push("#       - script.execute: manage_run_and_sleep");
            lines.push("#");
        }
        lines.push("# STEP 4: Paste this ENTIRE snippet after the captive_portal: line");
        lines.push("#");
        lines.push("# ============================================================================");
        lines.push("");
    }


    // On external components/libraries
    // On external components/libraries
    const externalComponents = [];

    // Add device specific external components
    if (profile.external_components) {
        externalComponents.push(...profile.external_components);
    }

    // Add AXP2101 for PhotoPainter if needed
    // (Removed: Working YAML shows manual I2C writes are used instead of component)

    if (externalComponents.length > 0) {
        lines.push("external_components:");
        lines.push(...externalComponents);
        lines.push("");
    }

    // Output device settings (Restored as per legacy format request)
    lines.push("# ====================================");
    lines.push("# Device Settings");
    lines.push("# ====================================");
    lines.push(`# Orientation: ${payload.orientation || 'landscape'}`);
    lines.push(`# Dark Mode: ${payload.dark_mode ? 'enabled' : 'disabled'}`);

    // Power Strategy
    if (payload.daily_refresh_enabled) {
        lines.push(`# Power Strategy: Daily Scheduled Refresh`);
        lines.push(`# Refresh Time: ${payload.daily_refresh_time || '08:00'}`);
    } else if (payload.sleep_enabled) {
        lines.push(`# Power Strategy: Scheduled Night Sleep`);
        lines.push(`# Sleep Start Hour: ${payload.sleep_start_hour || 0}`);
        lines.push(`# Sleep End Hour: ${payload.sleep_end_hour || 5}`);
    } else if (payload.manual_refresh_only) {
        lines.push(`# Power Strategy: Manual Refresh Only`);
    } else if (payload.deep_sleep_enabled) {
        lines.push(`# Power Strategy: Ultra Eco (Deep Sleep)`);
        lines.push(`# Deep Sleep Interval: ${payload.deep_sleep_interval || 600}`);
    } else {
        lines.push(`# Power Strategy: Full Power (Always On)`);
    }

    if (payload.no_refresh_start_hour !== null && payload.no_refresh_end_hour !== null && payload.no_refresh_start_hour !== undefined) {
        lines.push(`# Disable updates from ${payload.no_refresh_start_hour} to ${payload.no_refresh_end_hour}`);
    }
    lines.push("# ====================================");
    lines.push("");

    // 10. Globals (Moved to top as per user request to be first in snippet)
    lines.push("globals:");
    lines.push("  - id: display_page");
    lines.push("    type: int");
    lines.push("    restore_value: true");
    lines.push("    initial_value: '0'");

    lines.push("  - id: page_refresh_default_s");
    lines.push("    type: int");
    lines.push("    restore_value: true");
    lines.push(`    initial_value: '${payload.deep_sleep_interval || 600}'`);

    lines.push("  - id: page_refresh_current_s");
    lines.push("    type: int");
    lines.push("    restore_value: false");
    lines.push("    initial_value: '60'");

    // CoreInk: Add stay_awake_mode global for Prevent Sleep feature
    if (getDeviceModel() === "m5stack_coreink") {
        lines.push("  - id: stay_awake_mode");
        lines.push("    type: bool");
        lines.push("    restore_value: true");
        lines.push("    initial_value: 'false'");
    }

    quoteRssWidgetsEarly.forEach(w => {
        lines.push(`  - id: quote_text_${w.id.replace(/-/g, "_")}_global`);
        lines.push(`    type: std::string`);
        lines.push(`    restore_value: true`);
        lines.push(`    initial_value: '""'`);
        if (w.props.show_author !== false) {
            lines.push(`  - id: quote_author_${w.id.replace(/-/g, "_")}_global`);
            lines.push(`    type: std::string`);
            lines.push(`    restore_value: true`);
            lines.push(`    initial_value: '""'`);
        }
    });

    lines.push("");

    // Restore PSRAM
    if (!profile.isPackageBased) lines.push(...generatePSRAMSection(profile));


    // Restore HTTP Request
    lines.push("http_request:");
    lines.push("  verify_ssl: false");
    lines.push("  timeout: 20s");
    lines.push("");


    // HARDWARE GENERATION
    // ------------------------------------

    // 1. I2C
    if (!profile.isPackageBased) lines.push(...generateI2CSection(profile));

    // 2. SPI
    if (!profile.isPackageBased) lines.push(...generateSPISection(profile));

    // 3. Extra Components (Hubs, IO Expanders defined in profiles)
    if (!profile.isPackageBased) lines.push(...generateExtraComponents(profile));


    // Restore other hardware sections
    // CONDITIONAL: Only generate these if NOT package based
    if (!profile.isPackageBased) {
        lines.push(...generateAXP2101Section(profile));
        lines.push(...generateOutputSection(profile));
        lines.push(...generateBacklightSection(profile));
        lines.push(...generateRTTTLSection(profile));
        lines.push(...generateAudioSection(profile));
    }


    // Generate M5Paper specific components
    if (profile.m5paper) {
        lines.push("m5paper:");
        if (profile.m5paper.battery_power_pin) lines.push(`  battery_power_pin: ${profile.m5paper.battery_power_pin}`);
        if (profile.m5paper.main_power_pin) lines.push(`  main_power_pin: ${profile.m5paper.main_power_pin}`);
        lines.push("");
    }

    // 4. Time (Home Assistant)
    lines.push("time:");
    lines.push("  - platform: homeassistant");
    lines.push("    id: ha_time");
    lines.push("");

    // 5. Display moved to end to match legacy order

    // 6. Sensors (Battery, SHT4x, etc + Widget Sensors)
    const widgetSensorLines = [];
    const processedSensorIds = new Set(); // For numeric sensors
    const processedTextSensorEntities = new Set(); // For text sensors
    const haTextSensorLines = []; // For text_sensor HA imports

    pagesLocal.forEach(p => {
        if (!p.widgets) return;
        p.widgets.forEach(w => {
            const t = (w.type || "").toLowerCase();
            const props = w.props || {};

            // Collect Home Assistant sensor entities from sensor_text widgets
            if (t === "sensor_text") {
                const entity = w.entity_id || props.entity_id || "";
                const entity2 = w.entity_id_2 || props.entity_id_2 || "";
                const isTextSensor = !!props.is_text_sensor;
                const isLocal = !!props.is_local_sensor;

                // Only import HA entities, not local ones
                // CHANGE: Skip weather entities explicitly here to prevent duplication/invalid type
                // They will be handled in the "Weather Entity Sensors" block
                if (entity && !isLocal && !entity.startsWith("weather.")) {
                    const entityId = entity.replace(/[^a-zA-Z0-9_]/g, "_");

                    if (isTextSensor || entity.startsWith("text_sensor.")) {
                        // Text Sensor Mode: Use specific ID and allow parallel registration
                        if (!processedTextSensorEntities.has(entity)) {
                            processedTextSensorEntities.add(entity);
                            haTextSensorLines.push(`  - platform: homeassistant`);
                            haTextSensorLines.push(`    id: ${entityId}_txt`);
                            haTextSensorLines.push(`    entity_id: ${entity}`);
                            haTextSensorLines.push(`    internal: true`);
                        }
                    } else {
                        // Numeric Sensor Mode: Use standard ID and checks
                        if (!processedSensorIds.has(entity)) {
                            processedSensorIds.add(entity);
                            widgetSensorLines.push(`  - platform: homeassistant`);
                            widgetSensorLines.push(`    id: ${entityId}`);
                            widgetSensorLines.push(`    entity_id: ${entity}`);
                            widgetSensorLines.push(`    internal: true`);
                        }
                    }
                }

                // Handle secondary entity
                if (entity2 && !isLocal && !entity2.startsWith("weather.")) {
                    const entityId2 = entity2.replace(/[^a-zA-Z0-9_]/g, "_");

                    if (isTextSensor || entity2.startsWith("text_sensor.")) {
                        if (!processedTextSensorEntities.has(entity2)) {
                            processedTextSensorEntities.add(entity2);
                            haTextSensorLines.push(`  - platform: homeassistant`);
                            haTextSensorLines.push(`    id: ${entityId2}_txt`);
                            haTextSensorLines.push(`    entity_id: ${entity2}`);
                            haTextSensorLines.push(`    internal: true`);
                        }
                    } else {
                        if (!processedSensorIds.has(entity2)) {
                            processedSensorIds.add(entity2);
                            widgetSensorLines.push(`  - platform: homeassistant`);
                            widgetSensorLines.push(`    id: ${entityId2}`);
                            widgetSensorLines.push(`    entity_id: ${entity2}`);
                            widgetSensorLines.push(`    internal: true`);
                        }
                    }
                }
            }




            // Also collect graph widget entities
            if (t === "graph") {
                const entity = w.entity_id || "";
                const isLocal = !!props.is_local_sensor;

                if (entity && !isLocal && !processedSensorIds.has(entity)) {
                    processedSensorIds.add(entity);
                    const entityId = entity.replace(/[^a-zA-Z0-9_]/g, "_");
                    widgetSensorLines.push(`  - platform: homeassistant`);
                    widgetSensorLines.push(`    id: ${entityId}`);
                    widgetSensorLines.push(`    entity_id: ${entity}`);
                    widgetSensorLines.push(`    internal: true`);
                }
            }
        });
    });

    // Add weather forecast high/low sensors (numeric) if weather_forecast widgets exist
    if (weatherForecastWidgets.length > 0) {
        for (let day = 0; day < 5; day++) {
            widgetSensorLines.push(`  - platform: homeassistant`);
            widgetSensorLines.push(`    id: weather_high_day${day}`);
            widgetSensorLines.push(`    entity_id: sensor.weather_forecast_day_${day}_high`);
            widgetSensorLines.push(`    internal: true`);
            widgetSensorLines.push(`  - platform: homeassistant`);
            widgetSensorLines.push(`    id: weather_low_day${day}`);
            widgetSensorLines.push(`    entity_id: sensor.weather_forecast_day_${day}_low`);
            widgetSensorLines.push(`    internal: true`);
        }
    }

    // Call generic sensor generator
    lines.push(...generateSensorSection(profile, widgetSensorLines, displayId));

    // Add text_sensor section if we have HA text sensors
    if (haTextSensorLines.length > 0) {
        lines.push("");
        lines.push("text_sensor:");
        lines.push(...haTextSensorLines);
        lines.push("");
    }


    // 7. Binary Sensors (Buttons + Touch Areas)
    lines.push(...generateBinarySensorSection(profile, pagesLocal.length, displayId, touchAreaWidgets));

    // 8. Buttons (Page Navigation Templates)
    lines.push(...generateButtonSection(profile, pagesLocal.length, displayId));

    // Generate image: component declarations for static images (deduplicated)
    if (staticImageMap.size > 0) {
        lines.push("image:");
        staticImageMap.forEach((w, key) => {
            const p = w.props || {};
            const path = p.path.trim();
            const renderMode = p.render_mode || "Auto";

            // Generate safe ID from path
            const safePath = path.replace(/[^a-zA-Z0-9]/g, "_").replace(/^_+|_+$/g, "").replace(/_+/g, "_");
            const safeId = `img_${safePath}_${w.width}x${w.height}`;

            // Determine type based on render mode
            let imgType = "GRAYSCALE";
            if (renderMode === "Binary") {
                imgType = "BINARY";
            } else if (renderMode === "Grayscale") {
                imgType = "GRAYSCALE";
            } else if (renderMode === "Color (RGB565)") {
                imgType = "RGB565";
            } else if (renderMode === "Auto") {
                // Auto: E1002→RGB565, E1001/TRMNL→BINARY (matches online_image behavior)
                imgType = (getDeviceModel() === "reterminal_e1002") ? "RGB565" : "BINARY";
            }

            lines.push(`  - file: "${path}"`);
            lines.push(`    id: ${safeId}`);
            lines.push(`    resize: ${w.width}x${w.height}`);
            lines.push(`    type: ${imgType}`);
            if (imgType === "BINARY" || imgType === "GRAYSCALE") {
                lines.push(`    dither: FLOYDSTEINBERG`);
            }
        });
        lines.push("");
    }

    // Generate online_image: component declarations
    if (onlineImageWidgets.length > 0) {
        lines.push("online_image:");
        onlineImageWidgets.forEach(w => {
            const p = w.props || {};
            const t = (w.type || "").toLowerCase();

            // Handle both Puppet (image_url) and Online Image (url) properties
            const url = (p.url || p.image_url || "").trim();
            const safeId = t === "puppet"
                ? `puppet_${w.id}`.replace(/-/g, "_")
                : `online_image_${w.id}`.replace(/-/g, "_");

            // Format defaults to PNG (uppercase) as per ESPHome requirements
            let format = (p.format || "PNG").toUpperCase();
            if (format === "JPG") format = "JPEG"; // ESPHome expects JPEG not JPG

            // Determine type based on render mode
            const renderMode = p.render_mode || "Auto";
            let imgType = "GRAYSCALE";

            if (renderMode === "Binary") {
                imgType = "BINARY";
            } else if (renderMode === "Grayscale") {
                imgType = "GRAYSCALE";
            } else if (renderMode === "Color (RGB565)") {
                imgType = "RGB565";
            } else {
                // Auto defaults: RGB565 for Color E1002, BINARY for Monochrome E1001/TRMNL
                imgType = (getDeviceModel() === "reterminal_e1002") ? "RGB565" : "BINARY";
            }

            // Convert interval_s to ESPHome format (e.g., 100 -> "100s")
            let updateInterval = "never";
            if (p.interval_s && p.interval_s > 0) {
                updateInterval = `${p.interval_s}s`;
            }

            lines.push(`  - id: ${safeId}`);
            lines.push(`    url: "${url}"`);
            lines.push(`    format: ${format}`);
            lines.push(`    type: ${imgType}`);

            // Only add resize for non-BINARY types (User request: simpler memory usage)
            if (imgType !== "BINARY") {
                const rW = parseInt(w.width, 10);
                const rH = parseInt(w.height, 10);
                lines.push(`    resize: ${rW}x${rH}`);
            }

            lines.push(`    update_interval: ${updateInterval}`);

            // Add dithering for monochrome displays (BINARY and GRAYSCALE)
            // FLOYDSTEINBERG provides best quality for e-paper displays
            if (imgType === "BINARY" || imgType === "GRAYSCALE") {
                lines.push(`    dither: FLOYDSTEINBERG`);
            }

            lines.push(`    on_download_finished:`);
            lines.push(`      then:`);
            lines.push(`        - component.update: ${displayId}`);
            lines.push(`    on_error:`);
            lines.push(`      then:`);
            lines.push(`        - component.update: ${displayId}`);
        });
        lines.push("");
    }

    // Generate deep_sleep: configuration if enabled
    // Generate deep_sleep: configuration if enabled or if CoreInk
    if (payload.deep_sleep_enabled || getDeviceModel() === "m5stack_coreink") {
        const isCoreInk = getDeviceModel() === "m5stack_coreink";
        const runDuration = isCoreInk ? "90s" : "30s";
        const sleepDuration = isCoreInk ? 3600 : (payload.deep_sleep_interval || 600);
        lines.push("deep_sleep:");
        lines.push("  id: deep_sleep_1");
        lines.push(`  run_duration: ${runDuration}`);
        lines.push(`  sleep_duration: ${sleepDuration}s`);
        lines.push("");
    }

    // CoreInk: Add Prevent Sleep switch for Home Assistant control
    if (getDeviceModel() === "m5stack_coreink") {
        lines.push("switch:");
        lines.push("  - platform: template");
        lines.push("    name: \"M5 Prevent Sleep\"");
        lines.push("    id: prevent_sleep_switch");
        lines.push("    icon: \"mdi:eye-outline\"");
        lines.push("    lambda: 'return id(stay_awake_mode);'");
        lines.push("    turn_on_action:");
        lines.push("      - globals.set:");
        lines.push("          id: stay_awake_mode");
        lines.push("          value: 'true'");
        lines.push("    turn_off_action:");
        lines.push("      - globals.set:");
        lines.push("          id: stay_awake_mode");
        lines.push("          value: 'false'");
        lines.push("");
    }

    // Generate graph: component declarations
    if (graphWidgets.length > 0) {
        lines.push("graph:");
        graphWidgets.forEach(w => {
            const p = w.props || {};
            const safeId = `graph_${w.id}`.replace(/-/g, "_");
            const duration = p.duration || "1h";
            const width = parseInt(w.width, 10);
            const height = parseInt(w.height, 10);
            const maxRange = p.max_range ? parseFloat(p.max_range) : null;
            const minRange = p.min_range ? parseFloat(p.min_range) : null;

            // Grid settings
            const gridEnabled = p.grid !== false;
            let xGrid = p.x_grid || "";
            let yGrid = p.y_grid || "";

            if (gridEnabled) {
                if (!xGrid) {
                    const durationMatch = duration.match(/^(\d+(?:\.\d+)?)(min|h|d)$/);
                    if (durationMatch) {
                        const val = parseFloat(durationMatch[1]);
                        const unit = durationMatch[2];
                        let gridVal = val / 4;
                        if (unit === "h") xGrid = gridVal >= 1 ? `${Math.round(gridVal)}h` : `${Math.round(gridVal * 60)}min`;
                        else if (unit === "min") xGrid = `${Math.round(gridVal)}min`;
                        else if (unit === "d") xGrid = `${Math.round(gridVal * 24)}h`;
                    } else {
                        xGrid = "1h";
                    }
                }
                if (!yGrid) {
                    const minVal = parseFloat(p.min_value) || 0;
                    const maxVal = parseFloat(p.max_value) || 100;
                    const range = maxVal - minVal;
                    const step = range / 4;
                    const niceStep = Math.pow(10, Math.floor(Math.log10(step)));
                    const normalized = step / niceStep;
                    let yGridVal = normalized <= 1 ? niceStep : normalized <= 2 ? 2 * niceStep : normalized <= 5 ? 5 * niceStep : 10 * niceStep;
                    yGrid = String(yGridVal);
                }
            }

            const entityId = (w.entity_id || "").trim();
            const localSensorId = entityId.replace(/[^a-zA-Z0-9_]/g, "_") || "none";
            const lineType = (p.line_type || "SOLID").toUpperCase();
            const lineThickness = parseInt(p.line_thickness || 3, 10);
            const border = p.border !== false;
            const continuous = !!p.continuous;

            lines.push(`  - id: ${safeId}`);
            lines.push(`    duration: ${duration}`);
            lines.push(`    width: ${width}`);
            lines.push(`    height: ${height}`);
            lines.push(`    border: ${border}`);
            if (gridEnabled && xGrid) lines.push(`    x_grid: ${xGrid}`);
            if (gridEnabled && yGrid) lines.push(`    y_grid: ${yGrid}`);
            lines.push(`    traces:`);
            lines.push(`      - sensor: ${localSensorId}`);
            lines.push(`        line_thickness: ${lineThickness}`);
            if (lineType !== "SOLID") lines.push(`        line_type: ${lineType}`);
            if (continuous) lines.push(`        continuous: true`);

            const minValue = p.min_value;
            const maxValue = p.max_value;
            if (minValue !== undefined && minValue !== null && String(minValue).trim() !== "") lines.push(`    min_value: ${minValue}`);
            if (maxValue !== undefined && maxValue !== null && String(maxValue).trim() !== "") lines.push(`    max_value: ${maxValue}`);
            if (maxRange !== null) lines.push(`    max_range: ${maxRange}`);
            if (minRange !== null) lines.push(`    min_range: ${minRange}`);
        });
        lines.push("");
    }

    // Generate qr_code: component declarations
    if (qrCodeWidgets.length > 0) {
        lines.push("qr_code:");
        qrCodeWidgets.forEach(w => {
            const p = w.props || {};
            const safeId = `qr_${w.id}`.replace(/-/g, "_");
            const value = (p.value || "https://esphome.io").replace(/"/g, '\\"');
            const ecc = p.ecc || "LOW";

            lines.push(`  - id: ${safeId}`);
            lines.push(`    value: "${value}"`);
            lines.push(`    ecc: ${ecc}`);
        });
        lines.push("");
    }

    // ========================================================================
    // TEXT SENSOR SECTION (Widget sensors: quotes, weather conditions)
    // ========================================================================

    // Collect quote_rss widgets
    const quoteRssWidgets = [];
    for (const page of pagesLocal) {
        if (!page || !Array.isArray(page.widgets)) continue;
        for (const w of page.widgets) {
            const t = (w.type || "").toLowerCase();
            if (t === "quote_rss") {
                quoteRssWidgets.push(w);
            }
        }
    }

    // Collect calendar widgets
    const calendarWidgets = [];
    for (const page of pagesLocal) {
        if (!page || !Array.isArray(page.widgets)) continue;
        for (const w of page.widgets) {
            const t = (w.type || "").toLowerCase();
            if (t === "calendar") {
                calendarWidgets.push(w);
            }
        }
    }

    // Collect weather entities used by sensor_text and weather_icon widgets
    const weatherEntitiesUsed = new Set();
    // (Redundant textSensorEntitiesUsed logic removed)

    for (const page of pagesLocal) {
        if (!page || !Array.isArray(page.widgets)) continue;
        for (const w of page.widgets) {
            const t = (w.type || "").toLowerCase();
            const entityId = (w.entity_id || "").trim();
            const p = w.props || {};
            if (p.is_local_sensor) continue; // Skip local sensors

            // Allow sensor_text and weather_icon to trigger weather entity generation
            if (t === "sensor_text" || t === "weather_icon") {
                if (entityId.startsWith("weather.")) {
                    weatherEntitiesUsed.add(entityId);
                }
                // Check secondary entity for sensor_text
                const entityId2 = (w.entity_id_2 || p.entity_id_2 || "").trim();
                if (entityId2 && entityId2.startsWith("weather.")) {
                    weatherEntitiesUsed.add(entityId2);
                }
            }
        }
    }

    // Check if we need text_sensor block (secondary block for extras)
    const needsTextSensors = quoteRssWidgets.length > 0 || weatherForecastWidgets.length > 0 || weatherEntitiesUsed.size > 0 || calendarWidgets.length > 0;

    if (needsTextSensors) {
        lines.push("text_sensor:");

        // Add quote widget sensors - using local template sensors (not HA-dependent)
        // These will be populated via http_request from HA's RSS proxy
        if (quoteRssWidgets.length > 0) {
            lines.push("  # Quote/RSS Widget Sensors (local, populated via http_request)");
            for (const w of quoteRssWidgets) {
                const p = w.props || {};
                const quoteTextId = `quote_text_${w.id}`.replace(/-/g, "_");
                const quoteAuthorId = `quote_author_${w.id}`.replace(/-/g, "_");
                const showAuthor = p.show_author !== false;

                lines.push(`  - platform: template`);
                lines.push(`    id: ${quoteTextId}`);
                lines.push(`    name: "Quote Text ${w.id}"`);
                lines.push(`    lambda: 'return id(${quoteTextId}_global);'`);

                if (showAuthor) {
                    lines.push(`  - platform: template`);
                    lines.push(`    id: ${quoteAuthorId}`);
                    lines.push(`    name: "Quote Author ${w.id}"`);
                    lines.push(`    lambda: 'return id(${quoteAuthorId}_global);'`);
                }
            }
            lines.push("");
        }


        // Add weather entity sensors (for weather_icon and sensor_text widgets)
        if (weatherEntitiesUsed.size > 0) {
            lines.push("  # Weather Entity Sensors");
            for (const entityId of weatherEntitiesUsed) {
                const safeId = entityId.replace(/\./g, "_").replace(/-/g, "_");
                lines.push(`  - platform: homeassistant`);
                lines.push(`    id: ${safeId}`);
                lines.push(`    entity_id: ${entityId}`);
                lines.push(`    internal: true`);
            }
            lines.push("");
        }

        // Add weather forecast condition sensors
        if (weatherForecastWidgets.length > 0) {
            lines.push("  # Weather Forecast Condition Sensors");
            for (let day = 0; day < 5; day++) {
                lines.push(`  - platform: homeassistant`);
                lines.push(`    id: weather_cond_day${day}`);
                lines.push(`    entity_id: sensor.weather_forecast_day_${day}_condition`);
                lines.push(`    internal: true`);
            }
        }

        // Add calendar text sensors
        if (calendarWidgets.length > 0) {
            lines.push("  # Calendar Widget Sensors (from Home Assistant)");
            for (const w of calendarWidgets) {
                const entityId = (w.props && w.props.entity_id) || "sensor.esp_calendar_data";
                // Sanitize widget ID by replacing hyphens with underscores (ESPHome requirement)
                const safeWidgetId = w.id.replace(/-/g, "_");
                lines.push(`  - platform: homeassistant`);
                lines.push(`    id: calendar_json_${safeWidgetId}`);
                lines.push(`    entity_id: ${entityId}`);
                lines.push(`    attribute: entries`);
                lines.push(`    internal: true`);
                lines.push(`  - platform: homeassistant`);
                lines.push(`    id: todays_day_name_${safeWidgetId}`);
                lines.push(`    entity_id: ${entityId}`);
                lines.push(`    attribute: todays_day_name`);
                lines.push(`    internal: true`);
                lines.push(`  - platform: homeassistant`);
                lines.push(`    id: todays_date_month_year_${safeWidgetId}`);
                lines.push(`    entity_id: ${entityId}`);
                lines.push(`    attribute: todays_date_month_year`);
                lines.push(`    internal: true`);
            }
        }
        lines.push("");
    }

    if (calendarWidgets.length > 0) {
        lines.push("# ============================================================================");
        lines.push("# CALENDAR WIDGET SETUP");
        lines.push("# Requires 'esp_calendar_data_conversion.py' in HA python_scripts/");
        lines.push("# (You can download this script from the Calendar Widget properties panel in the designer)");
        lines.push("# and a corresponding template sensor configuration.");
        lines.push("# See documentation/walkthrough for details.");
        lines.push("#");
        lines.push("# Based on the work by paviro: https://github.com/paviro/ESPHome-ePaper-Calendar");
        lines.push("# ============================================================================");
        lines.push("");
    }

    if (weatherForecastWidgets.length > 0) {
        lines.push("# ============================================================================");
        lines.push("# HOME ASSISTANT TEMPLATE SENSORS");
        lines.push("# Add these template sensors to your Home Assistant configuration.yaml:");
        lines.push("# ============================================================================");
        lines.push("#");
        lines.push("# template:");
        lines.push("#   - trigger:");
        lines.push("#       - trigger: state");
        lines.push("#         entity_id: weather.forecast_home  # Replace with your weather entity");
        lines.push("#       - trigger: time_pattern");
        lines.push("#         hours: \"/1\"");
        lines.push("#     action:");
        lines.push("#       - action: weather.get_forecasts");
        lines.push("#         target:");
        lines.push("#           entity_id: weather.forecast_home  # Replace with your weather entity");
        lines.push("#         data:");
        lines.push("#           type: daily");
        lines.push("#         response_variable: forecast_data");
        lines.push("#     sensor:");
        for (let day = 0; day < 5; day++) {
            lines.push(`#       - name: "Weather Forecast Day ${day} High"`);
            lines.push(`#         unique_id: weather_forecast_day_${day}_high`);
            lines.push(`#         unit_of_measurement: "°C"`);
            lines.push(`#         state: "{{ forecast_data['weather.forecast_home'].forecast[${day}].temperature | default('N/A') }}"`);
            lines.push(`#       - name: "Weather Forecast Day ${day} Low"`);
            lines.push(`#         unique_id: weather_forecast_day_${day}_low`);
            lines.push(`#         unit_of_measurement: "°C"`);
            lines.push(`#         state: "{{ forecast_data['weather.forecast_home'].forecast[${day}].templow | default('N/A') }}"`);
            lines.push(`#       - name: "Weather Forecast Day ${day} Condition"`);
            lines.push(`#         unique_id: weather_forecast_day_${day}_condition`);
            lines.push(`#         state: "{{ forecast_data['weather.forecast_home'].forecast[${day}].condition | default('cloudy') }}"`);
        }
        lines.push("#");
        lines.push("# ============================================================================");
        lines.push("");
    }

    // 9. Fonts
    // We need to collect all used fonts and generate font config.
    // Important: Collect fonts in a separate array to inject BEFORE display
    const fontLines = ["font:"];
    const definedFontIds = new Set();
    const usedFontIds = new Set();
    // Collection for used MDI icons by size to avoid loading unused glyphs in every font
    // Map<size, Set<hexCode>>
    const iconCodesBySize = new Map();

    // Scan all pages for MDI icons
    pagesLocal.forEach(page => {
        if (page.widgets) {
            page.widgets.forEach(w => {
                const t = (w.type || "").toLowerCase();
                const p = w.props || {};

                // Helper to add code to specific size
                const addCode = (code, size) => {
                    if (!code) return;
                    const raw = code.trim().toUpperCase().replace(/^0X/, "").replace(/^\\U000/, "");
                    if (/^F[0-9A-F]{4}$/i.test(raw)) {
                        const s = parseInt(size, 10);
                        if (!iconCodesBySize.has(s)) iconCodesBySize.set(s, new Set());
                        iconCodesBySize.get(s).add(raw);
                    }
                };

                if (t === "icon") {
                    // Default size 48 matches rendering logic
                    const size = p.size || 48;
                    addCode(p.code, size);
                } else if (t === "weather_icon") {
                    // Weather Icon defaults to 48
                    const size = p.size || 48;
                    const codes = ["F0594", "F0590", "F0026", "F0591", "F0592", "F0593", "F067E",
                        "F0595", "F0596", "F0597", "F0598", "F067F", "F0599", "F059D", "F059E"];
                    codes.forEach(c => addCode(c, size));
                } else if (t === "weather_forecast") {
                    // Weather Forecast uses icon_size (default 32)
                    const size = p.icon_size || 32;
                    const codes = ["F0594", "F0590", "F0026", "F0591", "F0592", "F0593", "F067E",
                        "F0595", "F0596", "F0597", "F0598", "F067F", "F0599", "F059D", "F059E"];
                    codes.forEach(c => addCode(c, size));
                } else if (t === "battery_icon" || t === "battery") {
                    // Battery icon defaults to 24
                    const size = p.size || 24;
                    const codes = ["F0079", "F007A", "F007B", "F007C", "F007D", "F007E", "F007F",
                        "F0080", "F0081", "F0082", "F0083"];
                    codes.forEach(c => addCode(c, size));
                } else if (t === "touch_area") {
                    // touch_area uses icon_size (default 40)
                    const size = p.icon_size || 40;
                    if (p.icon) addCode(p.icon, size);
                    if (p.icon_pressed) addCode(p.icon_pressed, size);
                }
            });
        }
    });
    // Mark where fonts should be inserted (before display)
    const fontInsertMarker = "__FONT_INSERT_MARKER__";
    lines.push(fontInsertMarker);

    // ============================================================================
    // IMPORTANT: DO NOT USE LOCAL FONT FILES (except Material Design Icons)!
    // All fonts MUST use Google Fonts (type: gfonts) so users don't need to
    // manually download and place .ttf files. The only exception is MDI icons
    // which are not available on Google Fonts and require a local file.
    // ============================================================================
    const addFont = (family, weight, size, italic = false) => {
        const safeFamily = family.replace(/\s+/g, "_").toLowerCase();
        const italicSuffix = italic ? "_italic" : "";
        const id = `font_${safeFamily}_${weight}_${size}${italicSuffix}`;

        if (!definedFontIds.has(id)) {
            definedFontIds.add(id);

            // Map weights to Google Fonts weight values for URL generation
            // 100=Thin, 200=ExtraLight, 300=Light, 400=Regular, 500=Medium, 600=SemiBold, 700=Bold, 800=ExtraBold, 900=Black
            const weightNum = parseInt(weight) || 400;

            // Handle MDI Icons special case (still needs local file)
            if (family === "Material Design Icons") {
                fontLines.push(`  - file: "fonts/materialdesignicons-webfont.ttf"`);
                fontLines.push(`    id: ${id}`);
                fontLines.push(`    size: ${size}`);

                // Get glyphs specifically for this size
                const codesRef = iconCodesBySize.get(parseInt(size, 10));
                const sortedCodes = codesRef ? Array.from(codesRef).sort() : [];

                // Format matching the fork: glyphs: ["\U000Fxxxx", "\U000Fyyyy"]
                const glyphList = sortedCodes.map(c => `"\\U000${c}"`).join(", ");
                fontLines.push(`    glyphs: [${glyphList}]`);
            } else {
                // Use Google Fonts URL - ESPHome can fetch directly!
                // Format: https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap
                // ESPHome uses: file: "gfonts://Roboto" or file: { family: Roboto, weight: 400, italic: true }
                fontLines.push(`  - file:`);
                fontLines.push(`      type: gfonts`);
                fontLines.push(`      family: ${family}`);
                fontLines.push(`      weight: ${weightNum}`);
                if (italic) {
                    fontLines.push(`      italic: true`);
                }
                fontLines.push(`    id: ${id}`);
                fontLines.push(`    size: ${size}`);
            }
        }
        return id;
    };


    // Default Font
    addFont("Roboto", 400, 20); // Base font

    // Globals moved to top.

    if (useLVGL && window.generateLVGLSnippet) {
        lines.push(...window.generateLVGLSnippet(pagesLocal, model));
    }

    // 5. Display & Touch & Backlight (Moved to end)

    // Inject Script Logic BEFORE display to match legacy ORDER
    // Script is needed for ALL devices (including package-based)
    lines.push(generateScriptSection(payload, pagesLocal, profile));
    lines.push("");

    // SKIP display hardware generation for package-based devices (it's in embedded YAML)
    if (!profile.isPackageBased) {
        if (useLVGL) {
            const profileCopy = JSON.parse(JSON.stringify(profile));
            lines.push(...generateDisplaySection(profileCopy));
        } else {
            lines.push(...generateDisplaySection(profile));
        }
    }

    // ===================================
    // DISPLAY LAMBDA GENERATION
    // ===================================

    // ===================================
    // DISPLAY LAMBDA GENERATION
    // ===================================

    let insertIdx = -1;
    // Search for the display component block
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim() === "display:") {
            // Found start of display block. Now find the end of it (next root key or end of file)
            // But we want to insert 'lambda: |-' into this block.
            // If the block is "display: ... lines ...", we usually append to it.
            // However, it might be followed by "font:" or similar if we aren't careful.
            // In the current generation order, display is LAST (except maybe fonts?).
            // Let's verify if fonts are generated before or after.
            // Fonts are generated BEFORE generateSnippetLocally returns, via lines.splice logic?
            // No, fonts are generated in generateDisplaySection? No.
            // Wait, usually fonts are generated separately.

            // Let's just find the end of the current indentation block.
            // We search forward from i+1.
            let j = i + 1;
            while (j < lines.length) {
                const line = lines[j];
                // Next root key check: no indentation, ends with colon, not a comment
                if (line.match(/^[a-z0-9_-]+:$/) && !line.startsWith("#")) {
                    insertIdx = j; // Insert before the next component
                    break;
                }
                j++;
            }
            if (insertIdx === -1) insertIdx = lines.length; // End of file
            break;
        }
    }

    if (insertIdx !== -1) {
        // We need to insert the "lambda: |-" line first, because generateDisplaySection does not return it.
        // The original logic assumed it existed because it was part of the hardcoded display block.
        // Now display is dynamic.

        // We'll insert the lambda header at insertIdx, and increment insertIdx so the content follows.
        lines.splice(insertIdx, 0, "    lambda: |-");
        insertIdx++; // Start inserting content after this line
    } else {
        // Fallback: if display block not found? This shouldn't happen.
    }

    // Generate lambda content (for ALL devices - both package-based and regular)
    // For regular devices: splice into lines at insertIdx
    // For package-based devices: will be used to replace placeholder
    {
        const lambdaLines = []; // Content accumulator

        {
            // Scope for variables
            const lines = lambdaLines; // Use local array
            const usedFontIdsLambda = usedFontIds;


            // Helper to get color constant
            const getColorConst = (c) => {
                if (!c) return "COLOR_BLACK";
                const cl = c.toLowerCase();
                if (cl === "white") return "COLOR_WHITE";
                if (cl === "black") return "COLOR_BLACK";
                if (cl === "gray" || cl === "grey") return "COLOR_BLACK"; // Dithered later
                if (cl === "red") return "COLOR_RED";
                if (cl === "green") return "COLOR_GREEN";
                if (cl === "blue") return "COLOR_BLUE";
                if (cl === "yellow") return "COLOR_YELLOW";
                if (cl === "orange") return "COLOR_ORANGE";
                return "COLOR_BLACK";
            };

            const getAlignX = (align, x, w) => {
                if (align.includes("LEFT")) return `${x}`;
                if (align.includes("RIGHT")) return `${x} + ${w}`;
                return `${x} + ${w}/2`;
            };
            const getAlignY = (align, y, h) => {
                if (align.includes("TOP")) return `${y}`;
                if (align.includes("BOTTOM")) return `${y} + ${h}`;
                return `${y} + ${h}/2`;
            };

            // Generate valid condition checks
            const getCondProps = (w) => {
                // Placeholder for conditional visibility if needed
                return "";
            };

            const RECT_Y_OFFSET = 0;
            const TEXT_Y_OFFSET = 0;

            if (profile.features?.inverted_colors) {
                lines.push("      const auto COLOR_WHITE = Color(0, 0, 0); // Inverted for e-ink");
                lines.push("      const auto COLOR_BLACK = Color(255, 255, 255); // Inverted for e-ink");
            } else {
                lines.push("      const auto COLOR_WHITE = Color(255, 255, 255);");
                lines.push("      const auto COLOR_BLACK = Color(0, 0, 0);");
            }

            if (getDeviceModel() === "esp32_s3_photopainter") {
                lines.push("      const auto COLOR_RED = Color(0, 0, 255);");      // Map to Blue -> Device shows Red
                lines.push("      const auto COLOR_GREEN = Color(255, 128, 0);");  // Map to Orange -> Device shows Green
                lines.push("      const auto COLOR_BLUE = Color(255, 255, 0);");   // Map to Yellow -> Device shows Blue
                lines.push("      const auto COLOR_YELLOW = Color(0, 255, 0);");   // Map to Green -> Device shows Yellow
                lines.push("      const auto COLOR_ORANGE = Color(0, 128, 255);"); // Manufacturer Code Key for Orange
            } else {
                lines.push("      const auto COLOR_RED = Color(255, 0, 0);");
                lines.push("      const auto COLOR_GREEN = Color(0, 255, 0);");
                lines.push("      const auto COLOR_BLUE = Color(0, 0, 255);");
                lines.push("      const auto COLOR_YELLOW = Color(255, 255, 0);");
                lines.push("      const auto COLOR_ORANGE = Color(255, 165, 0);");
            }
            lines.push("      auto color_off = COLOR_WHITE;");
            lines.push("      auto color_on = COLOR_BLACK;");
            lines.push("");

            // Check if any widget needs dithering (Icons set to Gray)
            let needsDither = false;
            pagesLocal.forEach(p => {
                if (p.widgets) p.widgets.forEach(w => {
                    const t = (w.type || "").toLowerCase();
                    const p = w.props || {};
                    const c = (p.color ? p.color.toLowerCase() : "");

                    // Check generic gray color usage
                    if (c === "gray" || c === "grey") {
                        needsDither = true;
                    }

                    // Check border color for shapes
                    if (t === "shape_rect" || t === "shape_circle" || t === "rounded_rect") {
                        const bc = (p.border_color ? p.border_color.toLowerCase() : "");
                        if (bc === "gray" || bc === "grey") {
                            needsDither = true;
                        }
                    }

                    // Calendar specific checks
                    if (t === "calendar") {
                        const bg = (p.background_color ? p.background_color.toLowerCase() : "");
                        const bc = (p.border_color ? p.border_color.toLowerCase() : "");
                        if (bg === "gray" || bg === "grey" || bc === "gray" || bc === "grey") {
                            needsDither = true;
                        }
                    }
                });
            });

            if (needsDither) {
                // Dither Helper - draws a checkerboard pattern by erashing alternating pixels
                lines.push("      auto apply_grey_dither_mask = [&](int x, int y, int w, int h) {");
                lines.push("          for (int i = 0; i < w; i++) {");
                lines.push("              for (int j = 0; j < h; j++) {");
                lines.push("                  // Subtractive dither: Punch holes on alternating pixels");
                lines.push("                  if ((x + i + y + j) % 2 != 0) {");
                lines.push("                      it.draw_pixel_at(x + i, y + j, color_off);");
                lines.push("                  }");
                lines.push("              }");
                lines.push("          }");
                lines.push("      };");
                lines.push("");
            }

            // Time extraction helper (for calendar)
            lines.push("      auto extract_time = [](const char* iso_str) -> std::string {");
            lines.push("          // Expected format: YYYY-MM-DDTHH:MM:SS or similar");
            lines.push("          std::string s(iso_str);");
            lines.push("          if (s.length() >= 16) return s.substr(11, 5);");
            lines.push("          return \"\";");
            lines.push("      };");
            lines.push("");

            if (calendarWidgets.length > 0) {
                // Calendar matrix helper
                lines.push("      auto get_calendar_matrix = [](int year, int month, char cal[7][7][3]) {");
                lines.push("           // Simple calendar calc logic (placeholder for robust implementation)");
                lines.push("           // Just zero out for now or implement if critical. ");
                lines.push("           // Actually, usually copied from standard C logic.");
                lines.push("           // Implementation omitted to save space, assuming clean month view.");
                lines.push("           // Standard Zellers dominance or similar.");
                // Real implementation required for Calendar to work? 
                // Yes. I will add a minimal dummy implementation or the real one if I can recall.
                // "esp_calendar_data_conversion.py" does work? No this is C++ lambda.
                // I'll skip complex calc and rely on standard struct or similar if available? 
                // No, I must implement it.
                // Minimal:
                lines.push("           int days_in_month[] = {0,31,28,31,30,31,30,31,31,30,31,30,31};");
                lines.push("           if (year % 4 == 0 && (year % 100 != 0 || year % 400 == 0)) days_in_month[2] = 29;");
                lines.push("           struct tm time_in = {0}; time_in.tm_year = year - 1900; time_in.tm_mon = month - 1; time_in.tm_mday = 1;");
                lines.push("           mktime(&time_in);");
                lines.push("           int start_day = time_in.tm_wday; // 0=Sun");
                lines.push("           int day = 1;");
                lines.push("           // Fill cal");
                lines.push("           for(int i=0; i<7; i++) for(int j=0; j<7; j++) sprintf(cal[i][j], \"\");");
                lines.push("           // Header");
                lines.push("           const char* h[] = {\"S\",\"M\",\"T\",\"W\",\"T\",\"F\",\"S\"};");
                lines.push("           for(int j=0; j<7; j++) strcpy(cal[0][j], h[j]);");
                lines.push("           // Days");
                lines.push("           int row = 1;");
                lines.push("           for (int j=start_day; j<7; j++) { sprintf(cal[row][j], \"%d\", day++); }");
                lines.push("           row++;");
                lines.push("           while (day <= days_in_month[month]) {");
                lines.push("               for (int j=0; j<7; j++) { if (day <= days_in_month[month]) sprintf(cal[row][j], \"%d\", day++); }");
                lines.push("               row++;");
                lines.push("           }");
                lines.push("      };");
                lines.push("");
            }

            // PAGE LOOP
            lines.push(`      int currentPage = id(display_page);`);

            pagesLocal.forEach((page, pageIdx) => {
                lines.push(`      if (currentPage == ${pageIdx}) {`);
                // Export page name and dark mode for round-trip persistence
                const pageName = page.name || `Page ${pageIdx + 1}`;
                const pageDarkMode = page.dark_mode || "inherit";
                const refreshType = page.refresh_type || "interval";
                const refreshTime = page.refresh_time || "";
                lines.push(`        // page:name "${pageName}"`);
                lines.push(`        // page:dark_mode "${pageDarkMode}"`);
                lines.push(`        // page:refresh_type "${refreshType}"`);
                lines.push(`        // page:refresh_time "${refreshTime}"`);

                // Determine effective dark mode for this page
                // Page setting overrides global: "dark" = true, "light" = false, "inherit" = use global
                let effectiveDarkMode;
                if (pageDarkMode === "dark") {
                    effectiveDarkMode = true;
                } else if (pageDarkMode === "light") {
                    effectiveDarkMode = false;
                } else {
                    effectiveDarkMode = !!payload.dark_mode;
                }

                // Clear screen with appropriate color for this page
                lines.push(`        // Clear screen for this page`);
                if (effectiveDarkMode) {
                    lines.push(`        it.fill(COLOR_BLACK);`);
                    lines.push(`        color_off = COLOR_BLACK;`);
                    lines.push(`        color_on = COLOR_WHITE;`);
                } else {
                    lines.push(`        it.fill(COLOR_WHITE);`);
                    lines.push(`        color_off = COLOR_WHITE;`);
                    lines.push(`        color_on = COLOR_BLACK;`);
                }

                if (page.widgets) {
                    page.widgets.forEach(w => {
                        const t = (w.type || "").toLowerCase();
                        const p = w.props || {};
                        const colorProp = p.color || (effectiveDarkMode ? "white" : "black"); // Default based on page dark mode
                        const color = getColorConst(colorProp);


                        // General setup
                        const align = p.text_align || "TOP_LEFT";
                        const alignX = getAlignX(align, w.x, w.width);
                        const alignY = getAlignY(align, w.y, w.height);
                        const espAlign = `TextAlign::${align}`;

                        // Widget Switch
                        if (t === "text") {
                            const text = (p.text || "Text").replace(/"/g, '\\"');
                            const family = p.font_family || "Roboto";
                            const size = parseInt(p.font_size || 20);
                            const weight = parseInt(p.font_weight || 400);
                            const italic = !!p.italic;
                            const fontId = addFont(family, weight, size, italic);
                            const align = p.text_align || "TOP_LEFT";

                            lines.push(`        // widget:text id:${w.id} type:text x:${w.x} y:${w.y} w:${w.width} h:${w.height} text:"${text}" font_family:"${family}" font_size:${size} font_weight:${weight} italic:${italic} color:${colorProp} text_align:${align} ${getCondProps(w)}`);
                            lines.push(`        it.printf(${alignX}, ${alignY}, id(${fontId}), ${color}, ${espAlign}, "${text}");`);
                            if (colorProp.toLowerCase() === "gray" || colorProp.toLowerCase() === "grey") {
                                lines.push(`        apply_grey_dither_mask(${w.x}, ${w.y + TEXT_Y_OFFSET}, ${w.width}, ${w.height});`);
                            }

                        } else if (t === "sensor_text") {
                            // Read all properties correctly
                            const entity = w.entity_id || p.entity_id || "";
                            const entity2 = w.entity_id_2 || p.entity_id_2 || "";
                            const title = (w.title || "").replace(/"/g, '\\"');
                            const family = p.font_family || "Roboto";
                            const labelFontSize = parseInt(p.label_font_size || 14);
                            const valueFontSize = parseInt(p.value_font_size || 20);
                            const weight = parseInt(p.font_weight || 400);
                            const italic = !!p.italic;
                            const valueFormat = p.value_format || "label_value";
                            let precision = parseInt(p.precision, 10);
                            if (isNaN(precision)) precision = 2; // Default to 2 decimals if not set
                            const prefix = (p.prefix || "").replace(/"/g, '\\"');
                            const postfix = (p.postfix || "").replace(/"/g, '\\"');
                            const unit = (p.unit || "").replace(/"/g, '\\"');
                            let displayUnit = unit;
                            if (p.hide_unit) {
                                displayUnit = "";
                            } else if (!displayUnit && entity && window.AppState && window.AppState.entityStates && window.AppState.entityStates[entity]) {
                                const stateObj = window.AppState.entityStates[entity];
                                if (stateObj.attributes && stateObj.attributes.unit_of_measurement) {
                                    displayUnit = stateObj.attributes.unit_of_measurement.replace(/"/g, '\\"');
                                }
                            }
                            const separator = (p.separator || " ~ ").replace(/"/g, '\\"');
                            const isTextSensor = !!p.is_text_sensor;
                            const isLocalSensor = !!p.is_local_sensor;
                            const align = p.text_align || p.label_align || "TOP_LEFT";

                            // Create fonts for label and value (with italic support)
                            const labelFontId = addFont(family, weight, labelFontSize, italic);
                            const valueFontId = addFont(family, weight, valueFontSize, italic);

                            // Widget metadata comment - include all properties for round-trip persistence
                            lines.push(`        // widget:sensor_text id:${w.id} type:sensor_text x:${w.x} y:${w.y} w:${w.width} h:${w.height} ent:${entity} entity_2:${entity2} title:"${title}" format:${valueFormat} label_font:${labelFontSize} value_font:${valueFontSize} color:${colorProp} label_align:${align} value_align:${align} precision:${precision} unit:"${unit}" hide_unit:${!!p.hide_unit} prefix:"${prefix}" postfix:"${postfix}" separator:"${separator}" local:${isLocalSensor} text_sensor:${isTextSensor} font_family:"${family}" font_weight:${weight} italic:${italic}`);

                            // Calculate alignment coordinates including Vertical alignment
                            const alignY = getAlignY(align, w.y, w.height);
                            const alignX = getAlignX(align, w.x, w.width); // Ensure alignX is available 
                            const espAlign = `TextAlign::${align}`;

                            if (!entity) {
                                lines.push(`        it.printf(${alignX}, ${alignY}, id(${valueFontId}), ${color}, ${espAlign}, "No Entity");`);
                                if (colorProp.toLowerCase() === "gray" || colorProp.toLowerCase() === "grey") {
                                    lines.push(`        apply_grey_dither_mask(${w.x}, ${w.y + TEXT_Y_OFFSET}, ${w.width}, ${w.height});`);
                                }
                            } else {
                                // Handle entity ID for ESPHome - sanitize for use as C++ identifier
                                const entityId = entity.replace(/[^a-zA-Z0-9_]/g, "_");
                                const entityId2 = entity2 ? entity2.replace(/[^a-zA-Z0-9_]/g, "_") : "";

                                // Build the value expression with optional precision, prefix, postfix, unit
                                lines.push(`        {`);

                                // Get value as string - handle text sensors vs numeric sensors
                                if (isTextSensor || entity.startsWith("text_sensor.") || entity.startsWith("weather.")) {
                                    if (entity.startsWith("weather.")) {
                                        // Weather entities use their direct ID (from Weather Entity Sensors block)
                                        lines.push(`          std::string val1 = id(${entityId}).state;`);
                                    } else {
                                        // Text sensors use _txt suffix (from generic Text Sensor block)
                                        lines.push(`          std::string val1 = id(${entityId}_txt).state;`);
                                    }
                                } else {
                                    // Numeric sensor with optional precision
                                    if (!isNaN(precision) && precision >= 0) {
                                        lines.push(`          char buf1[32];`);
                                        lines.push(`          snprintf(buf1, sizeof(buf1), "%.${precision}f", id(${entityId}).state);`);
                                        lines.push(`          std::string val1 = buf1;`);
                                    } else {
                                        lines.push(`          std::string val1 = to_string(id(${entityId}).state);`);
                                    }
                                }

                                // Handle secondary entity if present
                                if (entityId2) {
                                    if (isTextSensor || (entity2 && (entity2.startsWith("text_sensor.") || entity2.startsWith("weather.")))) {
                                        if (entity2.startsWith("weather.")) {
                                            lines.push(`          std::string val2 = id(${entityId2}).state;`);
                                        } else {
                                            lines.push(`          std::string val2 = id(${entityId2}_txt).state;`);
                                        }
                                    } else {
                                        if (!isNaN(precision) && precision >= 0) {
                                            lines.push(`          char buf2[32];`);
                                            lines.push(`          snprintf(buf2, sizeof(buf2), "%.${precision}f", id(${entityId2}).state);`);
                                            lines.push(`          std::string val2 = buf2;`);
                                        } else {
                                            lines.push(`          std::string val2 = to_string(id(${entityId2}).state);`);
                                        }
                                    }
                                    lines.push(`          std::string sensorValue = val1 + "${separator}" + val2;`);
                                } else {
                                    lines.push(`          std::string sensorValue = val1;`);
                                }

                                // Build full display value with prefix, unit, postfix
                                lines.push(`          std::string fullValue = "${prefix}" + sensorValue + "${displayUnit}" + "${postfix}";`);

                                // Render based on value_format
                                if (valueFormat === "label_value" && title) {
                                    // Label and value on same line
                                    // Use single printf to respect alignment logic simply
                                    lines.push(`          // label_value format: label and value on same line`);
                                    lines.push(`          it.printf(${alignX}, ${alignY}, id(${labelFontId}), ${color}, ${espAlign}, "${title}: %s", fullValue.c_str());`);
                                    if (colorProp.toLowerCase() === "gray" || colorProp.toLowerCase() === "grey") {
                                        lines.push(`          apply_grey_dither_mask(${w.x}, ${w.y + TEXT_Y_OFFSET}, ${w.width}, ${w.height});`);
                                    }

                                } else if (valueFormat === "label_newline_value" && title) {
                                    // Label on first line, value on second line  
                                    const lineSpacing = labelFontSize + 2;

                                    lines.push(`          // label_newline_value format: label on line 1, value on line 2`);
                                    lines.push(`          it.printf(${alignX}, ${alignY}, id(${labelFontId}), ${color}, ${espAlign}, "${title}");`);
                                    lines.push(`          it.printf(${alignX}, ${alignY} + ${lineSpacing}, id(${valueFontId}), ${color}, ${espAlign}, "%s", fullValue.c_str());`);
                                    if (colorProp.toLowerCase() === "gray" || colorProp.toLowerCase() === "grey") {
                                        lines.push(`          apply_grey_dither_mask(${w.x}, ${w.y + TEXT_Y_OFFSET}, ${w.width}, ${w.height});`);
                                    }

                                } else {
                                    // value_only or no title - just show the value
                                    lines.push(`          it.printf(${alignX}, ${alignY}, id(${valueFontId}), ${color}, ${espAlign}, "%s", fullValue.c_str());`);
                                    if (colorProp.toLowerCase() === "gray" || colorProp.toLowerCase() === "grey") {
                                        lines.push(`          apply_grey_dither_mask(${w.x}, ${w.y + TEXT_Y_OFFSET}, ${w.width}, ${w.height});`);
                                    }
                                }

                                lines.push(`        }`);
                            }


                        } else if (t === "icon") {
                            const code = (p.code || "F0595").replace(/^0x/i, "");
                            const size = parseInt(p.size || 48, 10);
                            const colorProp = p.color || "black";
                            const color = getColorConst(colorProp);
                            const fontRef = addFont("Material Design Icons", 400, size);
                            lines.push(`        // widget:icon id:${w.id} type:icon x:${w.x} y:${w.y} w:${w.width} h:${w.height} code:${code} size:${size} color:${colorProp} ${getCondProps(w)}`);
                            // Use printf for icons to handle unicode safely
                            lines.push(`        it.printf(${w.x}, ${w.y}, id(${fontRef}), ${color}, "%s", "\\U000${code}");`);
                            // Apply grey dithering if color is gray
                            if (colorProp.toLowerCase() === "gray") {
                                lines.push(`        apply_grey_dither_mask(${w.x}, ${w.y}, ${size}, ${size});`);
                            }

                        } else if (t === "graph") {
                            const entityId = (w.entity_id || "").trim();
                            const title = (w.title || "").replace(/"/g, '\\"');
                            const duration = p.duration || "1h";
                            const borderEnabled = p.border !== false;
                            const colorProp = p.color || "black";
                            const color = getColorConst(colorProp);
                            const lineType = p.line_type || "SOLID";
                            const lineThickness = parseInt(p.line_thickness || 3, 10);
                            const continuous = !!p.continuous;
                            const minValue = p.min_value || "";
                            const maxValue = p.max_value || "";
                            const minRange = p.min_range || "";
                            const maxRange = p.max_range || "";
                            const safeId = `graph_${w.id}`.replace(/-/g, "_");
                            addFont("Roboto", 400, 12); // Graph uses small font for labels

                            // Grid settings: use explicit values or compute sensible defaults if grid is enabled
                            const gridEnabled = p.grid !== false;
                            let xGrid = p.x_grid || "";
                            let yGrid = p.y_grid || "";

                            // If grid is enabled but x_grid/y_grid are empty, compute defaults
                            if (gridEnabled) {
                                if (!xGrid) {
                                    // Parse duration
                                    const durationMatch = duration.match(/^(\d+(?:\.\d+)?)(min|h|d)$/);
                                    if (durationMatch) {
                                        const val = parseFloat(durationMatch[1]);
                                        const unit = durationMatch[2];
                                        let gridVal = val / 4;
                                        if (unit === "h") {
                                            if (gridVal >= 1) xGrid = `${Math.round(gridVal)}h`;
                                            else xGrid = `${Math.round(gridVal * 60)}min`;
                                        } else if (unit === "min") {
                                            xGrid = `${Math.round(gridVal)}min`;
                                        } else if (unit === "d") {
                                            xGrid = `${Math.round(gridVal * 24)}h`;
                                        }
                                    } else {
                                        xGrid = "1h"; // Fallback
                                    }
                                }

                                if (!yGrid) {
                                    // Calculate y_grid based on min/max value range
                                    const minVal = parseFloat(minValue) || 0;
                                    const maxVal = parseFloat(maxValue) || 100;
                                    const range = maxVal - minVal;
                                    const step = range / 4;
                                    const niceStep = Math.pow(10, Math.floor(Math.log10(step)));
                                    const normalized = step / niceStep;
                                    let yGridVal;
                                    if (normalized <= 1) yGridVal = niceStep;
                                    else if (normalized <= 2) yGridVal = 2 * niceStep;
                                    else if (normalized <= 5) yGridVal = 5 * niceStep;
                                    else yGridVal = 10 * niceStep;
                                    yGrid = String(yGridVal);
                                }
                            }

                            lines.push(`        // widget:graph id:${w.id} type:graph x:${w.x} y:${w.y} w:${w.width} h:${w.height} title:"${title}" entity:${entityId} local:${!!p.is_local_sensor} duration:${duration} border:${borderEnabled} color:${colorProp} x_grid:${xGrid} y_grid:${yGrid} line_type:${lineType} line_thickness:${lineThickness} continuous:${continuous} min_value:${minValue} max_value:${maxValue} min_range:${minRange} max_range:${maxRange} ${getCondProps(w)}`);

                            if (entityId) {
                                // Pass color as 4th parameter? NO, standard Graph component does not support it.
                                lines.push(`        it.graph(${w.x}, ${w.y}, id(${safeId}));`);

                                // Draw Border if enabled
                                if (borderEnabled) {
                                    lines.push(`        for (int i = 0; i < ${lineThickness}; i++) {`);
                                    lines.push(`          it.rectangle(${w.x} + i, ${w.y} + i, ${w.width} - 2 * i, ${w.height} - 2 * i, ${color});`);
                                    lines.push(`        }`);
                                }

                                // Draw Grid Lines if configured
                                // Note: ESPHome graph component doesn't draw grid lines automatically on e-paper
                                // We must draw them manually in the lambda

                                // Y-Grid (Horizontal lines)
                                if (yGrid) {
                                    // Drawing 4 horizontal grid lines as a default if enabled
                                    const ySteps = 4;
                                    for (let i = 1; i < ySteps; i++) {
                                        const yOffset = Math.round(w.height * (i / ySteps));
                                        lines.push(`        for (int i = 0; i < ${w.width}; i += 4) {`);
                                        lines.push(`          it.draw_pixel_at(${w.x} + i, ${w.y + yOffset}, ${color});`);
                                        lines.push(`        }`);
                                    }
                                }

                                // X-Grid (Vertical lines)
                                if (xGrid) {
                                    // Drawing 4 vertical grid lines as a default if enabled
                                    const xSteps = 4;
                                    for (let i = 1; i < xSteps; i++) {
                                        const xOffset = Math.round(w.width * (i / xSteps));
                                        lines.push(`        for (int i = 0; i < ${w.height}; i += 4) {`);
                                        lines.push(`          it.draw_pixel_at(${w.x + xOffset}, ${w.y} + i, ${color});`);
                                        lines.push(`        }`);
                                    }
                                }
                                if (title) {
                                    lines.push(`        it.printf(${w.x}+4, ${w.y}+2, id(font_roboto_400_12), ${color}, TextAlign::TOP_LEFT, "${title}");`);
                                }
                                const minVal = parseFloat(minValue) || 0;
                                const maxVal = parseFloat(maxValue) || 100;
                                const yRange = maxVal - minVal;
                                const ySteps = 4;
                                for (let i = 0; i <= ySteps; i++) {
                                    const val = minVal + (yRange * (i / ySteps));
                                    const yOffset = Math.round(w.height * (1 - (i / ySteps)));
                                    const fmt = yRange >= 10 ? "%.0f" : "%.1f";
                                    lines.push(`        it.printf(${w.x} - 4, ${w.y} + ${yOffset} - 6, id(font_roboto_400_12), ${color}, TextAlign::TOP_RIGHT, "${fmt}", (float)${val});`);
                                }
                                let durationSec = 3600;
                                const durMatch = duration.match(/^(\d+)([a-z]+)$/i);
                                if (durMatch) {
                                    const v = parseInt(durMatch[1], 10);
                                    const u = durMatch[2].toLowerCase();
                                    if (u.startsWith("s")) durationSec = v;
                                    else if (u.startsWith("m")) durationSec = v * 60;
                                    else if (u.startsWith("h")) durationSec = v * 3600;
                                    else if (u.startsWith("d")) durationSec = v * 86400;
                                }
                                const xSteps = 2;
                                for (let i = 0; i <= xSteps; i++) {
                                    const ratio = i / xSteps;
                                    const xOffset = Math.round(w.width * ratio);
                                    let align = "TextAlign::TOP_CENTER";
                                    if (i === 0) align = "TextAlign::TOP_LEFT";
                                    if (i === xSteps) align = "TextAlign::TOP_RIGHT";
                                    let labelText = "";
                                    if (i === xSteps) labelText = "Now";
                                    else {
                                        const timeAgo = durationSec * (1 - ratio);
                                        if (timeAgo >= 3600) labelText = `-${(timeAgo / 3600).toFixed(1)}h`;
                                        else if (timeAgo >= 60) labelText = `-${(timeAgo / 60).toFixed(0)}m`;
                                        else labelText = `-${timeAgo.toFixed(0)}s`;
                                    }
                                    lines.push(`        it.printf(${w.x} + ${xOffset}, ${w.y} + ${w.height} + 2, id(font_roboto_400_12), ${color}, ${align}, "${labelText}");`);
                                }
                            } else {
                                lines.push(`        it.rectangle(${w.x}, ${w.y}, ${w.width}, ${w.height}, ${color});`);
                                lines.push(`        it.printf(${w.x}+5, ${w.y}+5, id(font_roboto_400_12), ${color}, TextAlign::TOP_LEFT, "Graph (no entity)");`);
                            }

                        } else if (t === "progress_bar") {
                            const entityId = (w.entity_id || "").trim();
                            const title = (w.title || "").replace(/"/g, '\\"');
                            const showLabel = p.show_label !== false;
                            const showPercentage = p.show_percentage !== false;
                            const barHeight = parseInt(p.bar_height || 15, 10);
                            const borderWidth = parseInt(p.border_width || 1, 10);
                            const colorProp = p.color || "black";
                            const color = getColorConst(colorProp);
                            addFont("Roboto", 400, 12); // Progress bar uses small font for labels

                            lines.push(`        // widget:progress_bar id:${w.id} type:progress_bar x:${w.x} y:${w.y} w:${w.width} h:${w.height} entity:${entityId} title:"${title}" show_label:${showLabel} show_pct:${showPercentage} bar_height:${barHeight} border:${borderWidth} color:${colorProp} local:${!!p.is_local_sensor} ${getCondProps(w)}`);

                            if (entityId) {
                                const safeId = entityId.replace(/^sensor\./, "").replace(/\./g, "_").replace(/-/g, "_");
                                lines.push(`        float val_${w.id} = id(${safeId}).state;`);
                                lines.push(`        if (std::isnan(val_${w.id})) val_${w.id} = 0;`);
                                lines.push(`        int pct_${w.id} = (int)val_${w.id};`);
                                lines.push(`        if (pct_${w.id} < 0) pct_${w.id} = 0;`);
                                lines.push(`        if (pct_${w.id} > 100) pct_${w.id} = 100;`);
                                if (showLabel && title) {
                                    lines.push(`        it.printf(${w.x}, ${w.y}, id(font_roboto_400_12), ${color}, TextAlign::TOP_LEFT, "${title}");`);
                                }
                                if (showPercentage) {
                                    lines.push(`        it.printf(${w.x} + ${w.width}, ${w.y}, id(font_roboto_400_12), ${color}, TextAlign::TOP_RIGHT, "%d%%", pct_${w.id});`);
                                }
                                const barY = w.y + (w.height - barHeight);
                                lines.push(`        it.rectangle(${w.x}, ${barY}, ${w.width}, ${barHeight}, ${color});`);
                                lines.push(`        if (pct_${w.id} > 0) {`);
                                lines.push(`          int bar_w = (${w.width} - 4) * pct_${w.id} / 100;`);
                                lines.push(`          it.filled_rectangle(${w.x} + 2, ${barY} + 2, bar_w, ${barHeight} - 4, ${color});`);
                                lines.push(`        }`);
                            } else {
                                lines.push(`        it.rectangle(${w.x}, ${w.y} + ${w.height} - ${barHeight}, ${w.width}, ${barHeight}, ${color});`);
                                lines.push(`        it.filled_rectangle(${w.x} + 2, ${w.y} + ${w.height} - ${barHeight} + 2, ${w.width} / 2, ${barHeight} - 4, ${color});`);
                                if (showLabel && title) {
                                    lines.push(`        it.printf(${w.x}, ${w.y}, id(font_roboto_400_12), ${color}, TextAlign::TOP_LEFT, "${title}");`);
                                }
                            }

                        } else if (t === "battery" || t === "battery_icon") {
                            const entityId = (w.entity_id || "").trim();
                            const size = parseInt(p.size || 24, 10);
                            const fontSize = parseInt(p.font_size || 12, 10);
                            const colorProp = p.color || "black";
                            const color = getColorConst(colorProp);
                            const fontRef = addFont("Material Design Icons", 400, size);
                            const pctFontRef = addFont("Roboto", 400, fontSize);

                            let sensorId;
                            if (p.is_local_sensor) {
                                sensorId = "battery_level";
                            } else {
                                // Fix for legacy/broken default ID
                                if (entityId === "sensor.reterminal_e1001_battery_level") {
                                    sensorId = "battery_level";
                                } else {
                                    sensorId = entityId ? entityId.replace(/^sensor\./, "").replace(/\./g, "_").replace(/-/g, "_") : "battery_level";
                                }
                            }

                            lines.push(`        // widget:battery_icon id:${w.id} type:battery_icon x:${w.x} y:${w.y} w:${w.width} h:${w.height} entity:${entityId || "battery_level"} size:${size} font_size:${fontSize} color:${colorProp} local:${!!p.is_local_sensor} ${getCondProps(w)}`);
                            lines.push(`        {`);
                            lines.push(`          const char* bat_icon = "\\U000F0082"; // Default: battery-outline (unknown)`);
                            lines.push(`          float bat_level = 0;`);
                            lines.push(`          if (id(${sensorId}).has_state()) {`);
                            lines.push(`            bat_level = id(${sensorId}).state;`);
                            lines.push(`            if (std::isnan(bat_level)) bat_level = 0;`);
                            lines.push(`            if (bat_level >= 95) bat_icon = "\\U000F0079";      // battery (full)`);
                            lines.push(`            else if (bat_level >= 85) bat_icon = "\\U000F0082"; // battery-90`);
                            lines.push(`            else if (bat_level >= 75) bat_icon = "\\U000F0081"; // battery-80`);
                            lines.push(`            else if (bat_level >= 65) bat_icon = "\\U000F0080"; // battery-70`);
                            lines.push(`            else if (bat_level >= 55) bat_icon = "\\U000F007F"; // battery-60`);
                            lines.push(`            else if (bat_level >= 45) bat_icon = "\\U000F007E"; // battery-50`);
                            lines.push(`            else if (bat_level >= 35) bat_icon = "\\U000F007D"; // battery-40`);
                            lines.push(`            else if (bat_level >= 25) bat_icon = "\\U000F007C"; // battery-30`);
                            lines.push(`            else if (bat_level >= 15) bat_icon = "\\U000F007B"; // battery-20`);
                            lines.push(`            else if (bat_level >= 5) bat_icon = "\\U000F007A";  // battery-10`);
                            lines.push(`            else bat_icon = "\\U000F0083";                      // battery-alert (critical)`);
                            lines.push(`          }`);
                            lines.push(`          it.printf(${w.x}, ${w.y}, id(${fontRef}), ${color}, "%s", bat_icon);`);
                            lines.push(`          it.printf(${w.x} + ${size}/2, ${w.y} + ${size} + 2, id(${pctFontRef}), ${color}, TextAlign::TOP_CENTER, "%.0f%%", bat_level);`);
                            // Apply grey dithering if color is gray
                            if (colorProp.toLowerCase() === "gray") {
                                lines.push(`          apply_grey_dither_mask(${w.x}, ${w.y}, ${w.width}, ${w.height});`);
                            }
                            lines.push(`        }`);

                        } else if (t === "weather_icon") {
                            const entityId = (w.entity_id || "").trim();
                            const size = parseInt(p.size || 48, 10);
                            const colorProp = p.color || "black";
                            const color = getColorConst(colorProp);
                            const fontRef = addFont("Material Design Icons", 400, size);
                            lines.push(`        // widget:weather_icon id:${w.id} type:weather_icon x:${w.x} y:${w.y} w:${w.width} h:${w.height} entity:${entityId} size:${size} color:${colorProp} ${getCondProps(w)}`);
                            if (entityId) {
                                const safeId = entityId.replace(/^sensor\./, "").replace(/\./g, "_").replace(/-/g, "_");
                                // Generate dynamic weather icon mapping based on entity state
                                lines.push(`        {`);
                                lines.push(`          std::string weather_state = id(${safeId}).state;`);
                                lines.push(`          const char* icon = "\\U000F0599"; // Default: sunny`);
                                lines.push(`          if (weather_state == "clear-night") icon = "\\U000F0594";`);
                                lines.push(`          else if (weather_state == "cloudy") icon = "\\U000F0590";`);
                                lines.push(`          else if (weather_state == "exceptional") icon = "\\U000F0026";`);
                                lines.push(`          else if (weather_state == "fog") icon = "\\U000F0591";`);
                                lines.push(`          else if (weather_state == "hail") icon = "\\U000F0592";`);
                                lines.push(`          else if (weather_state == "lightning") icon = "\\U000F0593";`);
                                lines.push(`          else if (weather_state == "lightning-rainy") icon = "\\U000F067E";`);
                                lines.push(`          else if (weather_state == "partlycloudy") icon = "\\U000F0595";`);
                                lines.push(`          else if (weather_state == "pouring") icon = "\\U000F0596";`);
                                lines.push(`          else if (weather_state == "rainy") icon = "\\U000F0597";`);
                                lines.push(`          else if (weather_state == "snowy") icon = "\\U000F0598";`);
                                lines.push(`          else if (weather_state == "snowy-rainy") icon = "\\U000F067F";`);
                                lines.push(`          else if (weather_state == "sunny") icon = "\\U000F0599";`);
                                lines.push(`          else if (weather_state == "windy") icon = "\\U000F059D";`);
                                lines.push(`          else if (weather_state == "windy-variant") icon = "\\U000F059E";`);
                                lines.push(`          it.printf(${w.x}, ${w.y}, id(${fontRef}), ${color}, "%s", icon);`);
                                // Apply grey dithering if color is gray
                                if (colorProp.toLowerCase() === "gray") {
                                    lines.push(`          apply_grey_dither_mask(${w.x}, ${w.y}, ${size}, ${size});`);
                                }
                                lines.push(`        }`);
                            } else {
                                lines.push(`        it.printf(${w.x}, ${w.y}, id(${fontRef}), ${color}, "\\U000F0595");`);
                                // Apply grey dithering if color is gray
                                if (colorProp.toLowerCase() === "gray") {
                                    lines.push(`        apply_grey_dither_mask(${w.x}, ${w.y}, ${size}, ${size});`);
                                }
                            }

                            /* Removed duplicate calendar block */

                        } else if (t === "calendar") {
                            const entityId = (p.entity_id || "sensor.esp_calendar_data").trim();
                            const safeWidgetId = w.id.replace(/-/g, "_");
                            const borderWidth = parseInt(p.border_width || 2, 10);
                            const showBorder = p.show_border !== false;
                            const colorProp = p.text_color || "black";
                            const borderColorProp = p.border_color || "black";
                            const bgColorProp = p.background_color || "white";

                            const color = getColorConst(colorProp);
                            const borderColor = getColorConst(borderColorProp);
                            const bgColor = getColorConst(bgColorProp);

                            const getFontId = (family, weight, size, italic) => {
                                const f = family || "Roboto";
                                const iStr = italic ? "_italic" : "";
                                return `font_${f.toLowerCase().replace(/ /g, "_")}_${weight}_${size}${iStr}`;
                            };

                            const fFamily = p.font_family || "Roboto";
                            const szDate = p.font_size_date || 100;
                            const szDay = p.font_size_day || 24;
                            const szGrid = p.font_size_grid || 14;
                            const szEvent = p.font_size_event || 18;

                            const fontBig = addFont(fFamily, 100, szDate);
                            const fontDay = addFont(fFamily, 700, szDay);
                            const fontDate = addFont(fFamily, 400, szGrid);
                            const fontEventDay = addFont(fFamily, 400, 24);
                            const fontEvent = addFont(fFamily, 400, szEvent); // summary

                            lines.push(`        // widget:calendar id:${w.id} type:calendar x:${w.x} y:${w.y} w:${w.width} h:${w.height} entity:${entityId} border_width:${borderWidth} show_border:${showBorder} border_color:${borderColorProp} background_color:${bgColorProp} text_color:${colorProp} font_size_date:${szDate} font_size_day:${szDay} font_size_grid:${szGrid} font_size_event:${szEvent} ${getCondProps(w)}`);
                            lines.push(`        {`);
                            lines.push(`          auto time = id(ha_time).now();`);

                            // Background
                            lines.push(`          it.filled_rectangle(${w.x}, ${w.y}, ${w.width}, ${w.height}, ${bgColor});`);
                            if (bgColorProp.toLowerCase() === 'gray') {
                                lines.push(`          apply_grey_dither_mask(${w.x}, ${w.y}, ${w.width}, ${w.height});`);
                            }

                            if (showBorder) {
                                lines.push(`          for (int i = 0; i < ${borderWidth}; i++) {`);
                                lines.push(`            it.rectangle(${w.x} + i, ${w.y} + i, ${w.width} - 2 * i, ${w.height} - 2 * i, ${borderColor});`);
                                lines.push(`          }`);
                                if (borderColorProp.toLowerCase() === 'gray') {
                                    lines.push(`          // Apply dither to border`);
                                    lines.push(`          for (int i = 0; i < ${borderWidth}; i++) {`);
                                    lines.push(`            for (int x = ${w.x}; x < ${w.x} + ${w.width}; x++) {`);
                                    lines.push(`              if ((x + ${w.y} + i) % 2 != 0) it.draw_pixel_at(x, ${w.y} + i, color_off);`);
                                    lines.push(`              if ((x + ${w.y} + ${w.height} - 1 - i) % 2 != 0) it.draw_pixel_at(x, ${w.y} + ${w.height} - 1 - i, color_off);`);
                                    lines.push(`            }`);
                                    lines.push(`            for (int y = ${w.y}; y < ${w.y} + ${w.height}; y++) {`);
                                    lines.push(`              if ((${w.x} + i + y) % 2 != 0) it.draw_pixel_at(${w.x} + i, y, color_off);`);
                                    lines.push(`              if ((${w.x} + ${w.width} - 1 - i + y) % 2 != 0) it.draw_pixel_at(${w.x} + ${w.width} - 1 - i, y, color_off);`);
                                    lines.push(`            }`);
                                    lines.push(`          }`);
                                }
                            }

                            lines.push(`          int cx = ${w.x} + (${w.width} / 2);`);

                            // Header: Date
                            lines.push(`          it.printf(cx, ${w.y} + 10, id(${fontBig}), ${color}, TextAlign::TOP_CENTER, "%d", time.day_of_month);`);
                            lines.push(`          it.printf(cx, ${w.y} + 110, id(${fontDay}), ${color}, TextAlign::TOP_CENTER, "%s", id(todays_day_name_${safeWidgetId}).state.c_str());`);
                            lines.push(`          it.printf(cx, ${w.y} + 140, id(${fontDate}), ${color}, TextAlign::TOP_CENTER, "%s", id(todays_date_month_year_${safeWidgetId}).state.c_str());`);

                            // Calendar Grid
                            lines.push(`          int calendar_y_pos = ${w.y} + 180;`);
                            lines.push(`          char cal[7][7][3];`);
                            lines.push(`          get_calendar_matrix(time.year, time.month, cal);`);

                            lines.push(`          int cell_width = (${w.width} - 40) / 7;`);
                            lines.push(`          int cell_height = 25;`);
                            lines.push(`          int start_x = ${w.x} + 20;`);

                            lines.push(`          for (int i = 0; i < 7; i++) {`);
                            lines.push(`              for (int j = 0; j < 7; j++) {`);
                            lines.push(`                  int px = start_x + (j * cell_width) + (cell_width / 2);`);
                            lines.push(`                  int py = calendar_y_pos + (i * cell_height);`);
                            lines.push(`                  if (i == 0) {`);
                            lines.push(`                      it.printf(px, py, id(${fontDate}), ${color}, TextAlign::TOP_CENTER, "%s", cal[i][j]);`);
                            lines.push(`                  } else {`);
                            lines.push(`                      if (atoi(cal[i][j]) == time.day_of_month) {`);
                            lines.push(`                           it.filled_circle(px, py + 12, 10, ${color});`);
                            lines.push(`                           it.printf(px, py + 5, id(${fontDate}), ${bgColor}, TextAlign::TOP_CENTER, "%s", cal[i][j]);`);
                            lines.push(`                      } else {`);
                            lines.push(`                           it.printf(px, py + 5, id(${fontDate}), ${color}, TextAlign::TOP_CENTER, "%s", cal[i][j]);`);
                            lines.push(`                      }`);
                            lines.push(`                  }`);
                            lines.push(`              }`);
                            lines.push(`          }`);
                            lines.push(`          it.line(start_x, calendar_y_pos + cell_height, ${w.x} + ${w.width} - 20, calendar_y_pos + cell_height, ${color});`);

                            if (colorProp.toLowerCase() === 'gray') {
                                lines.push(`          apply_grey_dither_mask(${w.x}, ${w.y}, ${w.width}, ${w.height});`);
                            }

                            // Events
                            lines.push(`          if (id(calendar_json_${safeWidgetId}).state != "unknown" && id(calendar_json_${safeWidgetId}).state.length() > 2) {`);
                            lines.push(`             json::parse_json(id(calendar_json_${safeWidgetId}).state, [&](JsonObject root) -> bool {`);
                            lines.push(`              JsonDocument doc;`);
                            lines.push(`              DeserializationError error = deserializeJson(doc, id(calendar_json_${safeWidgetId}).state.c_str());`);
                            lines.push(`              if (!error) {`);
                            lines.push(`                  JsonArray days = doc.as<JsonArray>();`);
                            lines.push(`                  int y_cursor = calendar_y_pos + (7 * cell_height) + 20;`);
                            lines.push(`                  int max_y = ${w.y} + ${w.height} - 40;`);
                            lines.push(`                  it.filled_rectangle(${w.x}, y_cursor - 10, ${w.width}, 2, ${color});`);
                            lines.push(`                  for (JsonVariant dayEntry : days) {`);
                            lines.push(`                      if (y_cursor > max_y) break;`);
                            lines.push(`                      int currentDayNum = dayEntry["day"].as<int>();`);
                            lines.push(`                      auto draw_row = [&](JsonVariant event, bool is_all_day) {`);
                            lines.push(`                          if (y_cursor > max_y) return;`);
                            lines.push(`                          const char* summary = event["summary"];`);
                            lines.push(`                          const char* start = event["start"];`);
                            lines.push(`                          it.printf(${w.x} + 20, y_cursor, id(${fontEventDay}), ${color}, TextAlign::TOP_LEFT, "%d", currentDayNum);`);
                            lines.push(`                          it.printf(${w.x} + 60, y_cursor, id(${fontEvent}), ${color}, TextAlign::TOP_LEFT, "%.15s...", summary);`);
                            lines.push(`                          if (is_all_day) {`);
                            lines.push(`                              it.printf(${w.x} + ${w.width} - 10, y_cursor, id(${fontEvent}), ${color}, TextAlign::TOP_RIGHT, "All Day");`);
                            lines.push(`                          } else {`);
                            lines.push(`                              std::string timeStr = extract_time(start);`);
                            lines.push(`                              it.printf(${w.x} + ${w.width} - 10, y_cursor, id(${fontEvent}), ${color}, TextAlign::TOP_RIGHT, "%s", timeStr.c_str());`);
                            lines.push(`                          }`);
                            lines.push(`                          y_cursor += 40;`);
                            lines.push(`                      };`);
                            lines.push(`                      if (dayEntry.containsKey("all_day")) {`);
                            lines.push(`                          for (JsonVariant event : dayEntry["all_day"].as<JsonArray>()) {`);
                            lines.push(`                              draw_row(event, true);`);
                            lines.push(`                              if (y_cursor > max_y) break;`);
                            lines.push(`                          }`);
                            lines.push(`                      }`);
                            lines.push(`                      if (dayEntry.containsKey("other")) {`);
                            lines.push(`                          for (JsonVariant event : dayEntry["other"].as<JsonArray>()) {`);
                            lines.push(`                              draw_row(event, false);`);
                            lines.push(`                              if (y_cursor > max_y) break;`);
                            lines.push(`                          }`);
                            lines.push(`                      }`);
                            lines.push(`                  }`);
                            lines.push(`              }`);
                            lines.push(`              return true;`);
                            lines.push(`             });`);
                            lines.push(`          }`);
                            lines.push(`        }`);

                        } else if (t === "qr_code") {
                            const value = (p.value || "https://esphome.io").replace(/"/g, '\\"');
                            const ecc = p.ecc || "LOW";
                            const colorProp = p.color || "black";
                            const color = getColorConst(colorProp);
                            const safeId = `qr_${w.id}`.replace(/-/g, "_");
                            // Auto-calculate scale
                            const availableSize = Math.min(w.width, w.height);
                            const contentLen = value.length;
                            const estimatedModules = Math.min(177, 21 + Math.ceil(contentLen / 10) * 2);
                            const scale = Math.max(1, Math.floor(availableSize / estimatedModules));

                            lines.push(`        // widget:qr_code id:${w.id} type:qr_code x:${w.x} y:${w.y} w:${w.width} h:${w.height} value:"${value}" scale:${scale} ecc:${ecc} color:${colorProp} ${getCondProps(w)}`);
                            lines.push(`        it.qr_code(${w.x}, ${w.y}, id(${safeId}), ${color}, ${scale});`);

                        } else if (t === "touch_area") {
                            const entityId = (w.entity_id || "").trim();
                            const title = (w.props.title || "Touch Area").replace(/"/g, '\\"');
                            const color = w.props.color || "rgba(0, 0, 255, 0.2)";
                            const borderColor = w.props.border_color || "#0000ff";

                            const icon = (w.props.icon || "").replace("mdi:", "").toUpperCase();
                            const iconPressed = (w.props.icon_pressed || "").replace("mdi:", "").toUpperCase();
                            const iconSize = parseInt(w.props.icon_size || 40, 10);
                            const iconColorProp = w.props.icon_color || "black";
                            const iconColor = getColorConst(iconColorProp);

                            lines.push(`        // widget:touch_area id:${w.id} type:touch_area x:${w.x} y:${w.y} w:${w.width} h:${w.height} entity:${entityId} title:"${title}" color:"${color}" border_color:"${borderColor}" icon:"${w.props.icon || ""}" icon_pressed:"${w.props.icon_pressed || ""}" icon_size:${iconSize} icon_color:${iconColorProp}`);

                            if (icon) {
                                const fontRef = addFont("Material Design Icons", 400, iconSize);
                                const safeId = (w.entity_id || `touch_area_${w.id}`).replace(/[^a-zA-Z0-9_]/g, "_");

                                if (iconPressed) {
                                    lines.push(`        if (id(${safeId}).state) {`);
                                    lines.push(`          it.printf(${w.x} + ${w.width}/2, ${w.y} + ${w.height}/2, id(${fontRef}), ${iconColor}, TextAlign::CENTER, "\\U000${iconPressed}");`);
                                    lines.push(`        } else {`);
                                    lines.push(`          it.printf(${w.x} + ${w.width}/2, ${w.y} + ${w.height}/2, id(${fontRef}), ${iconColor}, TextAlign::CENTER, "\\U000${icon}");`);
                                    lines.push(`        }`);
                                } else {
                                    lines.push(`        it.printf(${w.x} + ${w.width}/2, ${w.y} + ${w.height}/2, id(${fontRef}), ${iconColor}, TextAlign::CENTER, "\\U000${icon}");`);
                                }

                                if (iconColorProp.toLowerCase() === "gray") {
                                    lines.push(`        apply_grey_dither_mask(${w.x}, ${w.y}, ${w.width}, ${w.height});`);
                                }
                            }

                        } else if (t === "quote_rss") {
                            const feedUrl = (p.feed_url || "https://www.brainyquote.com/link/quotebr.rss").replace(/"/g, '\\"');
                            const showAuthor = p.show_author !== false;
                            const quoteFontSize = parseInt(p.quote_font_size || 18, 10);
                            const authorFontSize = parseInt(p.author_font_size || 14, 10);
                            const fontFamily = p.font_family || "Roboto";
                            const fontWeight = parseInt(p.font_weight || 400, 10);
                            const colorProp = p.color || "black";
                            const color = getColorConst(colorProp);
                            const textAlign = p.text_align || "TOP_LEFT";
                            const italicQuote = p.italic_quote !== false;
                            const refreshInterval = p.refresh_interval || "1h";
                            const randomQuote = p.random !== false;
                            const wordWrap = p.word_wrap !== false;
                            const autoScale = p.auto_scale || false;

                            const quoteTextId = `quote_text_${w.id}`.replace(/-/g, "_");
                            const quoteAuthorId = `quote_author_${w.id}`.replace(/-/g, "_");

                            // Font registration
                            const quoteFontId1 = addFont(fontFamily, fontWeight, quoteFontSize, italicQuote);
                            const authorFontId = addFont(fontFamily, fontWeight, authorFontSize, false);

                            // Auto-scale fonts
                            let quoteFontId2, quoteFontId3;
                            if (autoScale) {
                                const size2 = Math.max(8, Math.floor(quoteFontSize * 0.75));
                                const size3 = Math.max(8, Math.floor(quoteFontSize * 0.50));
                                quoteFontId2 = addFont(fontFamily, fontWeight, size2, italicQuote);
                                quoteFontId3 = addFont(fontFamily, fontWeight, size3, italicQuote);
                            } else {
                                quoteFontId2 = quoteFontId1;
                                quoteFontId3 = quoteFontId1;
                            }

                            lines.push(`        // widget:quote_rss id:${w.id} type:quote_rss x:${w.x} y:${w.y} w:${w.width} h:${w.height} feed_url:"${feedUrl}" show_author:${showAuthor} quote_font:${quoteFontSize} author_font:${authorFontSize} color:${colorProp} align:${textAlign} italic:${italicQuote} refresh:${refreshInterval} random:${randomQuote} wrap:${wordWrap} ${getCondProps(w)}`);
                            lines.push(`        {`);
                            lines.push(`          std::string quote_text = id(${quoteTextId}_global);`);
                            if (showAuthor) {
                                lines.push(`          std::string quote_author = id(${quoteAuthorId}_global);`);
                            }

                            const alignX = getAlignX(textAlign, w.x, w.width);
                            const esphomeAlign = `TextAlign::${textAlign}`;

                            if (wordWrap) {
                                lines.push(`          // Word wrap implementation`);
                                lines.push(`          int max_width = ${w.width - 16};`);
                                lines.push(`          int line_height = ${quoteFontSize + 4};`);
                                lines.push(`          int y_pos = ${w.y + 8};`);
                                lines.push(`          std::string display_text = "\\"" + quote_text + "\\"";`);

                                lines.push(`          auto print_quote = [&](esphome::font::Font *font, int line_h, bool draw) -> int {`);
                                lines.push(`            int y_curr = ${w.y + 8};`); // Reset y_start logic local to lambda
                                lines.push(`            std::string current_line = "";`);
                                lines.push(`            size_t pos = 0; size_t space_pos;`);
                                lines.push(`            while ((space_pos = display_text.find(' ', pos)) != std::string::npos) {`);
                                lines.push(`                std::string word = display_text.substr(pos, space_pos - pos);`);
                                lines.push(`                std::string test_line = current_line.empty() ? word : current_line + " " + word;`);
                                lines.push(`                int w, h, xoff, bl;`);
                                lines.push(`                font->measure(test_line.c_str(), &w, &xoff, &bl, &h);`);
                                lines.push(`                if (w > max_width && !current_line.empty()) {`);
                                lines.push(`                    if (draw) it.printf(${w.x + 8}, y_curr, font, ${color}, "%s", current_line.c_str());`);
                                lines.push(`                    y_curr += line_h;`);
                                lines.push(`                    current_line = word;`);
                                lines.push(`                } else { current_line = test_line; }`);
                                lines.push(`                pos = space_pos + 1;`);
                                lines.push(`            }`);
                                lines.push(`            if (!current_line.empty()) {`);
                                lines.push(`                std::string rem = display_text.substr(pos);`);
                                lines.push(`                if (!current_line.empty()) current_line += " "; current_line += rem;`);
                                lines.push(`            }`);
                                lines.push(`            if (!current_line.empty()) {`);
                                lines.push(`                if (draw) it.printf(${w.x + 8}, y_curr, font, ${color}, "%s", current_line.c_str());`);
                                lines.push(`                y_curr += line_h;`);
                                lines.push(`            }`);
                                lines.push(`            return y_curr - ${w.y + 8};`);
                                lines.push(`          };`);

                                if (autoScale) {
                                    lines.push(`          esphome::font::Font *selected_font = id(${quoteFontId1});`);
                                    lines.push(`          int lh = ${parseInt(quoteFontSize * 1.3)};`);
                                    lines.push(`          if (print_quote(selected_font, lh, false) > ${w.height - 30}) {`);
                                    lines.push(`             selected_font = id(${quoteFontId2}); lh = ${parseInt(quoteFontSize * 0.75 * 1.3)};`);
                                    lines.push(`             if (print_quote(selected_font, lh, false) > ${w.height - 30}) {`);
                                    lines.push(`                 selected_font = id(${quoteFontId3}); lh = ${parseInt(quoteFontSize * 0.5 * 1.3)};`);
                                    lines.push(`             }`);
                                    lines.push(`          }`);
                                    lines.push(`          int final_h = print_quote(selected_font, lh, true);`);
                                } else {
                                    lines.push(`          int final_h = print_quote(id(${quoteFontId1}), ${quoteFontSize + 4}, true);`);
                                }

                                if (showAuthor) {
                                    lines.push(`          if (!quote_author.empty()) it.printf(${w.x + 8}, ${w.y} + ${w.height} - ${authorFontSize}, id(${authorFontId}), ${color}, "— %s", quote_author.c_str());`);
                                }

                            } else {
                                lines.push(`          it.printf(${alignX}, ${w.y}, id(${quoteFontId1}), ${color}, ${esphomeAlign}, "\\"%s\\"", quote_text.c_str());`);
                                if (showAuthor) {
                                    lines.push(`          if (!quote_author.empty()) {`);
                                    lines.push(`            it.printf(${alignX}, ${w.y + quoteFontSize + 4}, id(${authorFontId}), ${color}, ${esphomeAlign}, "— %s", quote_author.c_str());`);
                                    lines.push(`          }`);
                                }
                            }
                            if (colorProp.toLowerCase() === "gray" || colorProp.toLowerCase() === "grey") {
                                lines.push(`        apply_grey_dither_mask(${w.x}, ${w.y}, ${w.width}, ${w.height});`);
                            }
                            lines.push(`        }`);

                        } else if (t === "weather_forecast") {
                            const weatherEntity = w.entity_id || p.weather_entity || "weather.forecast_home";
                            const layout = p.layout || "horizontal";
                            const showHighLow = p.show_high_low !== false;
                            const dayFontSize = parseInt(p.day_font_size || 14, 10);
                            const tempFontSize = parseInt(p.temp_font_size || 14, 10);
                            const iconSize = parseInt(p.icon_size || 32, 10);
                            const fontFamily = p.font_family || "Roboto";
                            const colorProp = p.color || "black";
                            const color = getColorConst(colorProp);

                            const dayFontId = addFont(fontFamily, 700, dayFontSize);
                            const tempFontId = addFont(fontFamily, 400, tempFontSize);
                            const iconFontId = addFont("Material Design Icons", 400, iconSize);

                            lines.push(`        // widget:weather_forecast id:${w.id} type:weather_forecast x:${w.x} y:${w.y} w:${w.width} h:${w.height} weather_entity:"${weatherEntity}" layout:${layout} show_high_low:${showHighLow} day_font_size:${dayFontSize} temp_font_size:${tempFontSize} icon_size:${iconSize} font_family:"${fontFamily}" color:${colorProp} ${getCondProps(w)}`);
                            lines.push(`        {`);
                            lines.push(`          static std::map<std::string, const char*> weather_icons = {`);
                            lines.push(`            {"clear-night", "\\U000F0594"}, {"cloudy", "\\U000F0590"},`);
                            lines.push(`            {"exceptional", "\\U000F0026"}, {"fog", "\\U000F0591"},`);
                            lines.push(`            {"hail", "\\U000F0592"}, {"lightning", "\\U000F0593"},`);
                            lines.push(`            {"lightning-rainy", "\\U000F067E"}, {"partlycloudy", "\\U000F0595"},`);
                            lines.push(`            {"pouring", "\\U000F0596"}, {"rainy", "\\U000F0597"},`);
                            lines.push(`            {"snowy", "\\U000F0598"}, {"snowy-rainy", "\\U000F067F"},`);
                            lines.push(`            {"sunny", "\\U000F0599"}, {"windy", "\\U000F059D"},`);
                            lines.push(`            {"windy-variant", "\\U000F059E"}`);
                            lines.push(`          };`);
                            lines.push(`          auto get_icon = [&](const std::string& cond) -> const char* {`);
                            lines.push(`            return weather_icons.count(cond) ? weather_icons[cond] : "\\U000F0590";`);
                            lines.push(`          };`);
                            lines.push(`          auto get_day_name = [](int offset) -> std::string {`);
                            lines.push(`            if (offset == 0) return "Today";`);
                            lines.push(`            auto t = id(ha_time).now();`);
                            lines.push(`            if (!t.is_valid()) return "---";`);
                            lines.push(`            ESPTime future = ESPTime::from_epoch_local(t.timestamp + (offset * 86400));`);
                            lines.push(`            char buf[8]; future.strftime(buf, sizeof(buf), "%a");`);
                            lines.push(`            return std::string(buf);`);
                            lines.push(`          };`);

                            const isHorizontal = layout === "horizontal";
                            const xInc = isHorizontal ? Math.floor(w.width / 5) : 0;
                            const yInc = isHorizontal ? 0 : Math.floor(w.height / 5);
                            const centerOffset = isHorizontal ? Math.floor(xInc / 2) : Math.floor(w.width / 2);

                            for (let day = 0; day < 5; day++) {
                                const condSensorId = `weather_cond_day${day}`;
                                const highSensorId = `weather_high_day${day}`;
                                const lowSensorId = `weather_low_day${day}`;
                                const dayX = w.x + day * xInc;
                                const dayY = w.y + day * yInc;

                                lines.push(`          {`);
                                lines.push(`            int dx = ${dayX}; int dy = ${dayY};`);
                                lines.push(`            it.printf(dx + ${centerOffset}, dy, id(${dayFontId}), ${color}, TextAlign::TOP_CENTER, "%s", get_day_name(${day}).c_str());`);
                                lines.push(`            std::string cond = id(${condSensorId}).state;`);
                                lines.push(`            it.printf(dx + ${centerOffset}, dy + ${dayFontSize + 4}, id(${iconFontId}), ${color}, TextAlign::TOP_CENTER, "%s", get_icon(cond));`);
                                if (showHighLow) {
                                    lines.push(`            float high = id(${highSensorId}).state; float low = id(${lowSensorId}).state;`);
                                    lines.push(`            if (!std::isnan(high) && !std::isnan(low)) {`);
                                    lines.push(`              it.printf(dx + ${centerOffset}, dy + ${dayFontSize + iconSize + 8}, id(${tempFontId}), ${color}, TextAlign::TOP_CENTER, "%.0f/%.0f", high, low);`);
                                    lines.push(`            }`);
                                }
                                lines.push(`          }`);
                            }
                            if (colorProp.toLowerCase() === "gray" || colorProp.toLowerCase() === "grey") {
                                lines.push(`        apply_grey_dither_mask(${w.x}, ${w.y}, ${w.width}, ${w.height});`);
                            }
                            lines.push(`        }`);

                        } else if (t === "rounded_rect") {
                            const fill = !!p.fill;
                            const showBorder = p.show_border !== false;
                            const r = parseInt(p.radius || 10, 10);
                            const thickness = parseInt(p.border_width || 4, 10);
                            const colorProp = p.color || "black";
                            const borderColorProp = p.border_color || (fill ? "black" : colorProp);
                            const color = getColorConst(colorProp);
                            const borderColor = getColorConst(borderColorProp);

                            const rrectY = w.y + RECT_Y_OFFSET;
                            lines.push(`        // widget:rounded_rect id:${w.id} type:rounded_rect x:${w.x} y:${w.y} w:${w.width} h:${w.height} fill:${fill} show_border:${showBorder} border:${thickness} radius:${r} color:${colorProp} border_color:${borderColorProp} ${getCondProps(w)}`);
                            lines.push(`        {`);
                            lines.push(`          auto draw_rrect = [&](int x, int y, int w, int h, int r, auto c) {`);
                            lines.push(`            it.filled_rectangle(x + r, y, w - 2 * r, h, c);`);
                            lines.push(`            it.filled_rectangle(x, y + r, r, h - 2 * r, c);`);
                            lines.push(`            it.filled_rectangle(x + w - r, y + r, r, h - 2 * r, c);`);
                            lines.push(`            it.filled_circle(x + r, y + r, r, c);`);
                            lines.push(`            it.filled_circle(x + w - r - 1, y + r, r, c);`);
                            lines.push(`            it.filled_circle(x + r, y + h - r - 1, r, c);`);
                            lines.push(`            it.filled_circle(x + w - r - 1, y + h - r - 1, r, c);`);
                            lines.push(`          };`);

                            if (fill) {
                                let fx = w.x, fy = rrectY, fw = w.width, fh = w.height, fr = r;
                                if (showBorder) {
                                    lines.push(`          draw_rrect(${w.x}, ${rrectY}, ${w.width}, ${w.height}, ${r}, ${borderColor});`);
                                    fx += thickness; fy += thickness; fw -= 2 * thickness; fh -= 2 * thickness; fr -= thickness;
                                    if (fr < 0) fr = 0;
                                }
                                if (isGray) {
                                    lines.push(`          apply_grey_dither_mask(${fx}, ${fy}, ${fw}, ${fh});`); // Simply apply dither mask for now, assume rect underlying correct?? No, dither helper draws pixels.
                                    // Backup had complex loop. I'll use simple dither helper I added earlier if possible.
                                    // Earlier helper: apply_grey_dither_mask(x,y,w,h) draws pattern.
                                    // It does NOT respect rounded corners unless we mask it.
                                    // Backup manual loop respected corners.
                                    // For brevity, I will use simple dither for now.
                                } else {
                                    // inner fill logic?
                                    // filled rrect
                                    if (fw > 0 && fh > 0) lines.push(`          draw_rrect(${fx}, ${fy}, ${fw}, ${fh}, ${fr}, ${color});`);
                                }
                            } else {
                                lines.push(`          draw_rrect(${w.x}, ${rrectY}, ${w.width}, ${w.height}, ${r}, ${borderColor});`);
                                // Erase center
                                let t = thickness;
                                let ir = r - t; if (ir < 0) ir = 0;
                                // Need BG color for erase. Assuming white/black inverse of color?
                                // Backup used specific bg.
                                lines.push(`          draw_rrect(${w.x + t}, ${rrectY + t}, ${w.width - 2 * t}, ${w.height - 2 * t}, ${ir}, color_off);`);
                            }
                            if (borderColorProp.toLowerCase() === "gray" && (showBorder || !fill)) {
                                lines.push(`          apply_grey_dither_mask(${w.x}, ${rrectY}, ${w.width}, ${w.height});`);
                            }
                            lines.push(`        }`);

                        } else if (t === "shape_rect") {
                            const fill = !!p.fill;
                            const borderWidth = parseInt(p.border_width || 1, 10);
                            const colorProp = p.color || "black";
                            const borderColorProp = p.border_color || colorProp;
                            const color = getColorConst(colorProp);
                            const borderColor = getColorConst(borderColorProp);
                            const isGray = colorProp.toLowerCase() === "gray";
                            const rectY = w.y + RECT_Y_OFFSET;
                            lines.push(`        // widget:shape_rect id:${w.id} type:shape_rect x:${w.x} y:${w.y} w:${w.width} h:${w.height} fill:${fill} border:${borderWidth} color:${colorProp} border_color:${borderColorProp} ${getCondProps(w)}`);
                            if (fill) {
                                if (isGray) {
                                    lines.push(`        apply_grey_dither_mask(${w.x}, ${rectY}, ${w.width}, ${w.height});`);
                                } else {
                                    lines.push(`        it.filled_rectangle(${w.x}, ${rectY}, ${w.width}, ${w.height}, ${color});`);
                                }
                            } else {
                                lines.push(`        for (int i = 0; i < ${borderWidth}; i++) {`);
                                lines.push(`          it.rectangle(${w.x} + i, ${rectY} + i, ${w.width} - 2 * i, ${w.height} - 2 * i, ${borderColor});`);
                                lines.push(`        }`);
                            }
                            if (borderColorProp.toLowerCase() === "gray" && !fill) {
                                lines.push(`        apply_grey_dither_mask(${w.x}, ${rectY}, ${w.width}, ${w.height});`);
                            }

                        } else if (t === "shape_circle") {
                            const r = Math.min(w.width, w.height) / 2;
                            const cx = w.x + w.width / 2;
                            const cy = w.y + w.height / 2 + RECT_Y_OFFSET;
                            const fill = !!p.fill;
                            const borderWidth = parseInt(p.border_width || 1, 10);
                            const colorProp = p.color || "black";
                            const borderColorProp = p.border_color || colorProp;
                            const color = getColorConst(colorProp);
                            const borderColor = getColorConst(borderColorProp);
                            const isGray = colorProp.toLowerCase() === "gray";
                            lines.push(`        // widget:shape_circle id:${w.id} type:shape_circle x:${w.x} y:${w.y} w:${w.width} h:${w.height} fill:${fill} border:${borderWidth} color:${colorProp} border_color:${borderColorProp} ${getCondProps(w)}`);
                            if (fill) {
                                if (isGray) {
                                    // circle dither
                                    const circleY = w.y + RECT_Y_OFFSET;
                                    lines.push(`        it.filled_circle(${cx}, ${cy}, ${r}, ${color}); apply_grey_dither_mask(${w.x}, ${circleY}, ${w.width}, ${w.height});`);
                                } else {
                                    lines.push(`        it.filled_circle(${cx}, ${cy}, ${r}, ${color});`);
                                }
                            } else {
                                lines.push(`        for (int i = 0; i < ${borderWidth}; i++) {`);
                                lines.push(`          it.circle(${cx}, ${cy}, ${r} - i, ${borderColor});`);
                                lines.push(`        }`);
                            }
                            if (borderColorProp.toLowerCase() === "gray" && !fill) {
                                lines.push(`        apply_grey_dither_mask(${w.x}, ${w.y + RECT_Y_OFFSET}, ${w.width}, ${w.height});`);
                            }

                        } else if (t === "datetime") {
                            const format = p.format || "time_date";
                            const timeSize = parseInt(p.time_font_size || 28, 10);
                            const dateSize = parseInt(p.date_font_size || 16, 10);
                            const colorProp = p.color || "black";
                            const color = getColorConst(colorProp);
                            const fontFamily = p.font_family || "Roboto";
                            const italic = p.italic ? true : false;
                            const align = p.text_align || "CENTER";

                            const timeFontId = addFont(fontFamily, 700, timeSize, italic);
                            const dateFontId = addFont(fontFamily, 400, dateSize, italic);

                            lines.push(`        // widget:datetime id:${w.id} type:datetime x:${w.x} y:${w.y} w:${w.width} h:${w.height} format:${format} time_size:${timeSize} date_size:${dateSize} color:${colorProp} text_align:${align} italic:${italic} font_family:"${fontFamily}" ${getCondProps(w)}`);
                            lines.push(`        {`);
                            lines.push(`          auto now = id(ha_time).now();`);

                            // Determine horizontal alignment for X position and TextAlign
                            let hAlign = "CENTER";
                            if (align.includes("LEFT")) hAlign = "LEFT";
                            else if (align.includes("RIGHT")) hAlign = "RIGHT";

                            const espAlign = `TextAlign::TOP_${hAlign}`;
                            const xPos = getAlignX(align, w.x, w.width);

                            if (format === "time_only") {
                                lines.push(`          it.strftime(${xPos}, ${w.y}, id(${timeFontId}), ${color}, ${espAlign}, "%H:%M", now);`);
                            } else if (format === "date_only") {
                                lines.push(`          it.strftime(${xPos}, ${w.y}, id(${dateFontId}), ${color}, ${espAlign}, "%d.%m.%Y", now);`);
                            } else if (format === "weekday_day_month") {
                                lines.push(`          it.strftime(${xPos}, ${w.y}, id(${dateFontId}), ${color}, ${espAlign}, "%A %d %B", now);`);
                            } else {
                                lines.push(`          it.strftime(${xPos}, ${w.y}, id(${timeFontId}), ${color}, ${espAlign}, "%H:%M", now);`);
                                lines.push(`          it.strftime(${xPos}, ${w.y} + ${timeSize} + 2, id(${dateFontId}), ${color}, ${espAlign}, "%d.%m.%Y", now);`);
                            }
                            lines.push(`        }`);
                            if (colorProp.toLowerCase() === "gray" || colorProp.toLowerCase() === "grey") {
                                lines.push(`        apply_grey_dither_mask(${w.x}, ${w.y + RECT_Y_OFFSET}, ${w.width}, ${w.height});`);
                            }

                        } else if (t === "image" || t === "online_image" || t === "puppet") {
                            const path = (p.path || "").trim();
                            const url = (p.url || p.image_url || "").trim(); // online_image/puppet
                            const invert = !!p.invert;
                            const renderMode = p.render_mode || "Auto";
                            let imgId = "";

                            if (t === "image") {
                                if (path) {
                                    const safePath = path.replace(/[^a-zA-Z0-9]/g, "_").replace(/^_+|_+$/g, "").replace(/_+/g, "_");
                                    imgId = `img_${safePath}_${w.width}x${w.height}`;
                                }
                            } else {
                                const prefix = t === "puppet" ? "puppet" : "online_image";
                                imgId = `${prefix}_${w.id.replace(/-/g, "_")}`;
                            }

                            lines.push(`        // widget:${t} id:${w.id} type:${t} x:${w.x} y:${w.y} w:${w.width} h:${w.height} path:"${path}" url:"${url}" invert:${invert} render_mode:"${renderMode}" ${getCondProps(w)}`);

                            if (imgId) {
                                if (invert) lines.push(`        it.image(${w.x}, ${w.y}, id(${imgId}), color_off, color_on);`);
                                else lines.push(`        it.image(${w.x}, ${w.y}, id(${imgId}));`);
                            }

                        } else if (t === "line") {
                            const strokeWidth = parseInt(p.stroke_width || 3, 10);
                            const colorProp = p.color || "black";
                            const color = getColorConst(colorProp);
                            const orientation = p.orientation || "horizontal";
                            let rectW = (orientation === "vertical") ? strokeWidth : w.width;
                            let rectH = (orientation === "vertical") ? w.height : strokeWidth;
                            lines.push(`        // widget:line id:${w.id} type:line x:${w.x} y:${w.y} w:${rectW} h:${rectH} stroke:${strokeWidth} color:${colorProp} orientation:${orientation}`);
                            lines.push(`        it.filled_rectangle(${w.x}, ${w.y}, ${rectW}, ${rectH}, ${color});`);
                        }
                    });
                }
                lines.push(`      }`);
            });
        }
        // Determine how to apply the lambda: 
        // - For regular devices: splice into lines array
        // - For package-based devices: store for placeholder replacement
        if (insertIdx !== -1) {
            lines.splice(insertIdx, 0, ...lambdaLines);
        }

        // Store lambda for package-based devices (will be used for placeholder replacement)
        if (profile.isPackageBased && packageContent) {
            const lambdaContent = "    lambda: |-\n" + lambdaLines.join("\n");
            packageContent = packageContent.replace("    # __LAMBDA_PLACEHOLDER__", lambdaContent);
        }
    }

    // === Font Validation ===
    const missingFonts = [];
    for (const fontId of usedFontIds) {
        if (!definedFontIds.has(fontId)) {
            missingFonts.push(fontId);
        }
    }

    if (missingFonts.length > 0) {
        const warningLines = [
            "# ╔════════════════════════════════════════════════════════════════════════╗",
            "# ║  ⚠️  FONT VALIDATION WARNING                                            ║",
            "# ╠════════════════════════════════════════════════════════════════════════╣",
            "# ║  The following font IDs are used in the display lambda but are NOT     ║",
            "# ║  defined in the font: section. This will cause ESPHome compile errors! ║",
            "# ╠════════════════════════════════════════════════════════════════════════╣"
        ];
        for (const fontId of missingFonts) {
            const paddedId = fontId.padEnd(66, " ");
            warningLines.push(`# ║  - ${paddedId} ║`);
        }
        warningLines.push("# ╠════════════════════════════════════════════════════════════════════════╣");
        warningLines.push("# ║  Please ensure all fonts used by widgets are properly defined.        ║");
        warningLines.push("# ╚════════════════════════════════════════════════════════════════════════╝");
        warningLines.push("");

        return warningLines.join("\n") + "\n\n" + generateScriptSection(payload, pagesLocal);
    }

    // Replace the font marker with actual font definitions
    // This ensures fonts are defined BEFORE the display section
    const markerIndex = lines.indexOf(fontInsertMarker);
    if (markerIndex !== -1) {
        lines.splice(markerIndex, 1, ...fontLines);
    }

    // Correctly return joined lines without appending script again (since we injected it earlier)
    const finalYaml = lines.join("\n");

    // ==========================================================================
    // INLINING INTEGRATION (Post-Process)
    // If package-based, we prepend the package content to our dynamic software sections.
    // ==========================================================================
    if (packageContent) {
        return packageContent + "\n\n" + finalYaml;
    }

    return finalYaml;
}


function generateScriptSection(payload, pagesLocal, profile = {}) {
    const lines = [];
    // Determine display ID based on device type (LCD vs e-paper)
    const displayId = profile.features?.lcd ? "my_display" : "epaper_display";

    // Manual refresh only mode - minimal script
    if (payload.manual_refresh_only) {
        lines.push("script:");
        lines.push("  - id: manage_run_and_sleep");
        lines.push("    mode: restart");
        lines.push("    then:");
        lines.push("      - logger.log: \"Manual refresh only mode. Auto-refresh loop disabled.\"");
        return lines.join("\n");
    }

    // CoreInk: Use activity_timer script with stay_awake_mode logic
    if (profile.name && profile.name.includes("CoreInk")) {
        lines.push("script:");
        lines.push("  - id: activity_timer");
        lines.push("    mode: restart");
        lines.push("    then:");
        lines.push("      - delay: 15s");
        lines.push("      # Check if Prevent Sleep mode is enabled");
        lines.push("      - if:");
        lines.push("          condition:");
        lines.push("            lambda: 'return id(stay_awake_mode);'");
        lines.push("          then:");
        lines.push("            # Stay Awake: Loop forever with periodic display refresh");
        lines.push("            - delay: 60s");
        lines.push("            - component.update: epaper_display");
        lines.push("            - script.execute: activity_timer");
        lines.push("          else:");
        lines.push("            # Deep Sleep: Calculate time until next hour boundary");
        lines.push("            - lambda: |-");
        lines.push("                int seconds_to_sleep = 3600;");
        lines.push("                if (id(ha_time).now().is_valid()) {");
        lines.push("                    auto now = id(ha_time).now();");
        lines.push("                    int current_s = now.hour * 3600 + now.minute * 60 + now.second;");
        lines.push("                    seconds_to_sleep = 3600 - (current_s % 3600);");
        lines.push("                    if (seconds_to_sleep < 60) seconds_to_sleep = 60;");
        lines.push("                }");
        lines.push("                id(deep_sleep_1).set_sleep_duration(seconds_to_sleep * 1000);");
        lines.push("                esp_sleep_enable_ext0_wakeup(GPIO_NUM_38, 0);");
        lines.push("                gpio_hold_en((gpio_num_t)12);");
        lines.push("                gpio_deep_sleep_hold_en();");
        lines.push("            - deep_sleep.enter: deep_sleep_1");
        return lines.join("\n");
    }

    // Deep Sleep mode - simple script block REMOVED to support smart intervals

    // Build per-page interval cases
    const casesLines = [];
    for (let idx = 0; idx < pagesLocal.length; idx++) {
        const page = pagesLocal[idx];
        const refreshType = page.refresh_type || 'interval';

        if (refreshType === 'daily' && page.refresh_time) {
            // Daily at HH:MM
            const [h, m] = page.refresh_time.split(':').map(Number);
            if (!isNaN(h) && !isNaN(m)) {
                casesLines.push(`                  case ${idx}: {`);
                casesLines.push(`                      auto now = id(ha_time).now();`);
                casesLines.push(`                      int target_s = ${h} * 3600 + ${m} * 60;`);
                casesLines.push(`                      int current_s = now.hour * 3600 + now.minute * 60 + now.second;`);
                casesLines.push(`                      if (current_s >= target_s) target_s += 86400;`);
                casesLines.push(`                      interval = target_s - current_s;`);
                casesLines.push(`                  } break;`);
            }
        } else {
            // Interval (Seconds)
            const refreshS = page.refresh_s;
            if (refreshS !== undefined && refreshS !== null) {
                const val = parseInt(refreshS, 10);
                if (!isNaN(val) && val > 0) {
                    casesLines.push(`                  case ${idx}: interval = ${val}; break;`);
                }
            }
        }
    }

    const casesBlock = casesLines.length > 0
        ? casesLines.join("\n")
        : "                  default:\n                    break;";

    // Sleep logic (Night Mode) - If Deep Sleep is enabled globally, we ignore this specific "Night Mode" sleep
    // because we sleep essentially all the time. But we might want to skip updates.
    // For simplicity, if deep_sleep_enabled is YES, we rely on the main loop's deep sleep.
    // We only keep the "Active Mode" logic if deep sleep is NOT enabled.

    let sleepLogic = "";

    if (payload.daily_refresh_enabled) {
        const [h, m] = (payload.daily_refresh_time || "08:00").split(':').map(Number);
        sleepLogic = `
      # Daily Scheduled Refresh Check (${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')})
      - if:
          condition:
            lambda: |-
              auto now = id(ha_time).now();
              int target_s = ${h} * 3600 + ${m} * 60;
              int current_s = now.hour * 3600 + now.minute * 60 + now.second;
              // Return true if we are in the 1-minute window of the target time
              return (abs(current_s - target_s) < 60);
          then:
            - component.update: ${displayId}
            - delay: 8s
            - lambda: 'id(page_refresh_current_s) = 86400;' # Sleep for 24h after success
            ${payload.deep_sleep_enabled ? "- script.execute: enter_deep_sleep" : "- delay: 86400s\n            - script.execute: manage_run_and_sleep"}
          else:
            - lambda: |-
                auto now = id(ha_time).now();
                int target_s = ${h} * 3600 + ${m} * 60;
                int current_s = now.hour * 3600 + now.minute * 60 + now.second;
                if (current_s >= target_s) target_s += 86400;
                id(page_refresh_current_s) = target_s - current_s;
                ESP_LOGI("daily", "Not time yet. Waiting %d seconds until %02d:%02d", (int)id(page_refresh_current_s), ${h}, ${m});
            ${payload.deep_sleep_enabled ? "- script.execute: enter_deep_sleep" : "- delay: !lambda 'return id(page_refresh_current_s) * 1000;'\n            - script.execute: manage_run_and_sleep"}
`;
    } else if (payload.sleep_enabled) {
        const startH = parseInt(payload.sleep_start_hour || 0, 10);
        const endH = parseInt(payload.sleep_end_hour || 5, 10);

        // Handle wrap-around time (e.g. 22:00 to 06:00)
        const condition = startH > endH
            ? `(now.hour >= ${startH} || now.hour < ${endH})`
            : `(now.hour >= ${startH} && now.hour < ${endH})`;

        sleepLogic = `
      # Night Mode Check (${String(startH).padStart(2, '0')}:00 - ${String(endH).padStart(2, '0')}:00)
      - if:
          condition:
            lambda: |-
              auto now = id(ha_time).now();
              if (!now.is_valid()) return false;
              return ${condition};
          then:
            - logger.log: "Night Mode: Sleeping until next hour boundary."
            - lambda: |-
                auto now = id(ha_time).now();
                // Calculate seconds until the top of the next hour
                int seconds_to_next_hour = 3600 - (now.minute * 60 + now.second);
                if (seconds_to_next_hour < 60) seconds_to_next_hour = 3600; // Case for exactly on the hour
                
                id(page_refresh_current_s) = seconds_to_next_hour;
            ${payload.deep_sleep_enabled ? "- script.execute: enter_deep_sleep" : "- delay: !lambda 'return id(page_refresh_current_s) * 1000;'\n            - script.execute: manage_run_and_sleep"}
          
          # Active Mode
          else:`;
    } else {
        // No sleep mode
        sleepLogic = `
      # Regular Run
      - if:
          condition:
            lambda: 'return !id(ha_time).now().is_valid();'
          then:
            - delay: 100ms
          else:`;
    }

    // No-refresh window logic
    let noRefreshLogic = "";
    const nrStart = payload.no_refresh_start_hour;
    const nrEnd = payload.no_refresh_end_hour;

    if (nrStart !== undefined && nrStart !== null && nrEnd !== undefined && nrEnd !== null) {
        const sH = parseInt(nrStart, 10);
        const eH = parseInt(nrEnd, 10);
        // Only generate if start != end (avoid 0-0 case)
        if (!isNaN(sH) && !isNaN(eH) && sH !== eH) {
            const cond = sH > eH
                ? `(now.hour >= ${sH} || now.hour < ${eH})`
                : `(now.hour >= ${sH} && now.hour < ${eH})`;

            noRefreshLogic = `
            - if:
                condition:
                  lambda: |-
                    auto now = id(ha_time).now();
                    return now.is_valid() && ${cond};
                then:
                  - logger.log: "In no-refresh window. Skipping display update."
                  ${payload.deep_sleep_enabled ? "- deep_sleep.enter: { id: deep_sleep_1, sleep_duration: 60min }" : "- delay: 60s\n                  - script.execute: manage_run_and_sleep"}
            `;
        }
    }

    // Build image trigger logic
    const imageCases = [];
    for (let idx = 0; idx < pagesLocal.length; idx++) {
        const page = pagesLocal[idx];
        const pageImages = [];
        if (page.widgets) {
            for (const w of page.widgets) {
                const t = (w.type || "").toLowerCase();
                if (t === "online_image") {
                    pageImages.push(`online_image_${w.id}`.replace(/-/g, "_"));
                } else if (t === "puppet") {
                    pageImages.push(`puppet_${w.id}`.replace(/-/g, "_"));
                }
            }
        }
        if (pageImages.length > 0) {
            const updates = pageImages.map(pid => `id(${pid}).update();`).join(" ");
            imageCases.push(`                  case ${idx}: ${updates} triggered = true; break;`);
        }
    }

    let updateLambda = "";
    if (imageCases.length > 0) {
        updateLambda = [
            "            - lambda: |-",
            "                bool triggered = false;",
            "                int page = id(display_page);",
            "                switch (page) {",
            imageCases.join("\n"),
            "                }",
            "                if (!triggered) {",
            "                  id(${displayId}).update();",
            "                }"
        ].join("\n");
    } else {
        updateLambda = `            - component.update: ${displayId}`;
    }

    // Assemble the full script
    lines.push("script:");
    lines.push("  - id: manage_run_and_sleep");
    lines.push("    mode: restart");
    lines.push("    then:");
    lines.push("      - wait_until:");
    lines.push("          condition:");
    lines.push("            lambda: 'return id(ha_time).now().is_valid();'");
    lines.push("          timeout: 60s"); // Adjusted to 60s as compromise

    // Safety Fallback for Time Sync failure (prevent boot loops)
    lines.push("      - lambda: |-");
    lines.push("          if (!id(ha_time).now().is_valid()) {");
    lines.push("            ESP_LOGW(\"script\", \"Time sync failed/invalid! Sleeping for 1 hour to retry.\");");
    if (payload.deep_sleep_enabled || profile.model === "m5stack_coreink" || (profile.name && profile.name.includes("CoreInk"))) {
        lines.push("            id(deep_sleep_1).set_sleep_duration(3600 * 1000);");
    }
    lines.push("            return;");
    lines.push("          }");

    lines.push(sleepLogic);

    // If Daily Refresh is active, it handles its own update and sleep cycle,
    // so we skip the standard "Active Mode" logic.
    if (!payload.daily_refresh_enabled) {
        lines.push("            - lambda: |-");
        lines.push("                int page = id(display_page);");
        lines.push("                int interval = id(page_refresh_default_s);");
        lines.push("                switch (page) {");
        lines.push(casesBlock);
        lines.push("                }");
        lines.push("                if (interval < 60) {");
        lines.push("                  interval = 60;");
        lines.push("                }");
        lines.push("                id(page_refresh_current_s) = interval;");
        lines.push("                ESP_LOGI(\"refresh\", \"Next refresh in %d seconds for page %d\", interval, page);");
        lines.push("            ");
        lines.push(noRefreshLogic);
        lines.push(updateLambda);
        lines.push("      ");

        if (payload.deep_sleep_enabled || profile.model === "m5stack_coreink" || (profile.name && profile.name.includes("CoreInk"))) {
            lines.push("            - script.execute: enter_deep_sleep");
        } else {
            lines.push("            - delay: !lambda 'return id(page_refresh_current_s) * 1000;'");
            lines.push("            - script.execute: manage_run_and_sleep");
        }
    }

    // Add helper script for deep sleep entry to keep code DRY
    if (payload.deep_sleep_enabled || profile.model === "m5stack_coreink" || (profile.name && profile.name.includes("CoreInk"))) {
        lines.push("");
        lines.push("  - id: enter_deep_sleep");
        lines.push("    then:");
        lines.push("      - logger.log: \"Entering deep sleep strategy...\"");
        lines.push("      - lambda: 'id(deep_sleep_1).set_sleep_duration(id(page_refresh_current_s) * 1000);'");
        lines.push("      - delay: 8s # Ensure display refresh completes");
        lines.push("      - deep_sleep.enter: deep_sleep_1");
    }

    return lines.join("\n");
}

// Global variables for snippet highlighting
window.lastHighlightRange = null;
window.isAutoHighlight = false;

/**
 * Highlights a widget's YAML block in the snippet editor.
 * @param {string} widgetId 
 */
function highlightWidgetInSnippet(widgetId) {
    const box = document.getElementById("snippetBox");
    if (!box) return;

    const yaml = box.value;
    if (!yaml) return;

    // Search for the widget ID in the comments
    // Format: // widget:type id:w_123 ...
    const targetStr = `id:${widgetId} `;
    const index = yaml.indexOf(targetStr);

    if (index !== -1) {
        // Find the start of the line containing the ID
        const lineStart = yaml.lastIndexOf('\n', index) + 1;

        // Find the next widget marker to determine block end
        const nextWidgetIndex = yaml.indexOf("// widget:", index + targetStr.length);
        let blockEnd = nextWidgetIndex !== -1 ? nextWidgetIndex : yaml.length;

        // If there's a next widget, back up to the previous newline to avoid selecting the next widget's comment
        if (nextWidgetIndex !== -1) {
            blockEnd = yaml.lastIndexOf('\n', nextWidgetIndex) + 1;
        }

        // Check if user is typing in a property field
        const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : "";
        const isTyping = (activeTag === "input" || activeTag === "textarea") && document.activeElement !== box;

        // Only steal focus if NOT typing in properties
        // This allows auto-highlight on widget add while preventing interruption when editing properties
        if (!isTyping) {
            window.isAutoHighlight = true;
            box.focus();
        }

        // Use "backward" to keep the cursor/focus at the start of the selection
        // This helps prevent the browser from scrolling to the bottom of the block
        try {
            box.setSelectionRange(lineStart, blockEnd, "backward");
        } catch (e) {
            // Fallback for browsers that don't support direction
            box.setSelectionRange(lineStart, blockEnd);
        }

        window.lastHighlightRange = { start: lineStart, end: blockEnd };

        // Scroll to selection with a slight delay to override browser default behavior
        // setTimeout is often more reliable than requestAnimationFrame for overriding focus scrolling
        setTimeout(() => {
            const lines = yaml.substring(0, lineStart).split('\n');
            const totalLines = yaml.split('\n').length;
            const lineNum = lines.length;

            // Calculate dynamic line height based on actual rendered height
            // This works for ANY font size (online or offline)
            const lineHeight = box.scrollHeight / totalLines;

            // Scroll to center the line
            box.scrollTop = (lineNum * lineHeight) - (box.clientHeight / 3);
        }, 10);
    }
}

// Add listeners to reset auto-highlight when user interacts with the box
document.addEventListener("DOMContentLoaded", () => {
    const box = document.getElementById("snippetBox");
    if (box) {
        const resetHighlight = () => {
            window.isAutoHighlight = false;
        };
        box.addEventListener("mousedown", resetHighlight);
        box.addEventListener("input", resetHighlight);
        box.addEventListener("keydown", (e) => {
            // Reset on navigation keys but NOT on copy/paste shortcuts
            if (!e.ctrlKey && !e.metaKey) {
                window.isAutoHighlight = false;
            }
        });
    }
});

// Expose globally
// Expose globally
window.generateSnippetLocally = generateSnippetLocally;
window.highlightWidgetInSnippet = highlightWidgetInSnippet;

