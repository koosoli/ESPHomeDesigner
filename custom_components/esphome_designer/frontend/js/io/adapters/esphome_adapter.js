/**
 * @file esphome_adapter.js
 * @description ESPHome-specific output adapter.
 */

import { Logger } from '../../utils/logger.js';
import { BaseAdapter } from './base_adapter.js';
import { AppState } from '../../core/state.js';
import { registry as PluginRegistry } from '../../core/plugin_registry.js';
import { Utils } from '../../core/utils.js';
import { DEVICE_PROFILES } from '../devices.js';
import * as Generators from '../hardware_generators.js';
import { generateLVGLSnippet, serializeWidget } from '../yaml_export_lvgl.js';
import { COLORS, ALIGNMENT } from '../../core/constants.js';
import { FontRegistry } from './font_registry.js';
import { YamlGenerator } from './yaml_generator.js';

/**
 * ESPHome-specific adapter for generating YAML configuration.
 * Extends BaseAdapter to implement the ESPHome-specific orchestration logic.
 */

export class ESPHomeAdapter extends BaseAdapter {
    constructor() {
        super();
        this.fonts = new FontRegistry();
        this.yaml = new YamlGenerator();
        this.reset();
    }

    reset() {
        if (this.fonts) this.fonts.reset();
        this.usedPlugins = new Set();
    }

    /**
     * Main entry point for generating the YAML configuration.
     * @param {import("../../types.js").ProjectPayload} layout
     * @returns {Promise<string>} The generated YAML configuration.
     */
    async generate(layout) {
        if (!layout) {
            console.error("ESPHomeAdapter: Missing layout");
            return "";
        }
        this.reset();

        const pages = layout.pages || [];
        const model = layout.device_model || (AppState ? AppState.deviceModel : null) || window.currentDeviceModel || "reterminal_e1001";

        const profiles = window.DEVICE_PROFILES || DEVICE_PROFILES || {};
        let profile = profiles[model] || {};

        // Custom Hardware Synthesis:
        // If the model is 'custom', we synthesize a profile from the custom hardware settings
        if (model === 'custom' && layout.deviceSettings && layout.deviceSettings.custom_hardware) {
            const ch = layout.deviceSettings.custom_hardware;
            profile = {
                id: "custom",
                name: "Custom Device",
                chip: ch.chip || "esp32-s3",
                displayPlatform: ch.displayDriver || "generic_st7789",
                resolution: { width: ch.resWidth || 800, height: ch.resHeight || 480 },
                shape: ch.shape || "rect",
                pins: {
                    i2c: ch.pins?.sda ? { sda: ch.pins.sda, scl: ch.pins.scl } : null,
                    spi: ch.pins?.clk ? { clk: ch.pins.clk, mosi: ch.pins.mosi } : null,
                    display: {
                        cs: ch.pins?.cs,
                        dc: ch.pins?.dc,
                        reset: ch.pins?.rst,
                        busy: ch.pins?.busy
                    }
                },
                features: {
                    psram: !!ch.psram,
                    lcd: ch.tech === 'lcd',
                    epaper: ch.tech === 'epaper',
                    touch: ch.touchTech && ch.touchTech !== 'none'
                },
                backlight: ch.pins?.backlight ? {
                    platform: "gpio",
                    pin: ch.pins.backlight
                } : null,
                touch: ch.touchTech && ch.touchTech !== 'none' ? {
                    platform: ch.touchTech,
                    sda: ch.pins?.sda,
                    scl: ch.pins?.scl,
                    interrupt_pin: ch.pins?.touch_int,
                    reset_pin: ch.pins?.touch_rst
                } : null
            };
        }

        // Auto-detect LVGL usage:
        // 1. Explicit profile feature
        // 2. Presence of any widgets starting with "lvgl_"
        // 3. Any widget with an 'exportLVGL' function (via registry check)
        let isLvgl = !!(profile.features && (profile.features.lvgl || profile.features.lv_display));

        if (!isLvgl) {
            // Scan all pages and widgets
            for (const page of pages) {
                if (page.widgets) {
                    for (const w of page.widgets.filter(widget => !widget.hidden)) {
                        if (w.type.startsWith("lvgl_")) {
                            isLvgl = true;
                            break;
                        }
                        // Check if plugin has LVGL export capabilities
                        const plugin = PluginRegistry ? PluginRegistry.get(w.type) : null;
                        if (plugin && typeof plugin.exportLVGL === 'function') {
                            isLvgl = true;
                            break;
                        }
                    }
                }
                if (isLvgl) break;
            }
        }

        const lines = [];



        // 1. Instructions & Setup Comments
        if (!profile.isPackageBased) {
            lines.push(...this.yaml.generateInstructionHeader(profile, { pages, device_model: model }));
        }

        // 2. Preparation
        const displayId = profile.features?.lcd ? "my_display" : "epaper_display";
        // const isLvgl = !!(profile.features && (profile.features.lvgl || profile.features.lv_display)); // Moved up for auto-detection

        // Ensure Roboto 20 is the first font registered (matches legacy)
        this.fonts.addFont("Roboto", 400, 20);

        this.preProcessWidgetsPromise = this.preProcessWidgets(pages);
        await this.preProcessWidgetsPromise;

        // 2. Hardware Package (Pre-fetch for later)
        let packageContent = null;
        if (profile.isPackageBased) {
            if (profile.isOfflineImport && profile.content) {
                packageContent = profile.content;
            } else if (profile.hardwarePackage) {
                packageContent = await this.fetchHardwarePackage(profile.hardwarePackage);
            }
        }

        // 3. Registry Hooks - Collect segments
        const context = {
            widgets: pages.flatMap(p => (p.widgets || []).filter(w => !w.hidden)),
            profile,
            displayId,
            adapter: this
        };

        if (PluginRegistry) {
            // 1. Globals First
            const globalLines = [];

            // Core Globals
            globalLines.push("- id: display_page", "  type: int", "  restore_value: true", "  initial_value: '0'");

            // Match legacy epaper detection for regression testing
            const isEpaper = !!(profile.features && profile.features.epaper);
            const isLcd = !!(profile.features && profile.features.lcd) || !isEpaper;
            const defaultRefresh = layout.refresh_interval || (isLcd ? 60 : (layout.deep_sleep_interval || 600));
            globalLines.push("- id: page_refresh_default_s", "  type: int", "  restore_value: true", `  initial_value: '${defaultRefresh}'`);
            globalLines.push("- id: page_refresh_current_s", "  type: int", "  restore_value: false", "  initial_value: '60'");
            globalLines.push("- id: last_page_switch_time", "  type: uint32_t", "  restore_value: false", "  initial_value: '0'");

            PluginRegistry.onExportGlobals({ ...context, lines: globalLines });
            if (globalLines.length > 0) {
                lines.push("globals:");
                lines.push(...globalLines.map(l => "  " + l));
            }

            // 2. PSRAM
            if (profile.features && (profile.features.psram || profile.features.features?.psram)) {
                lines.push("psram:", "  mode: octal", "  speed: 80MHz");
            }

            // Hardware Sections (I2C, SPI, etc.)
            if (!profile.isPackageBased) {
                // HTTP Request first
                lines.push("http_request:", "  verify_ssl: false", "  timeout: 20s");

                if (Generators.generateI2CSection) lines.push(...Generators.generateI2CSection(profile));
                if (Generators.generateSPISection) lines.push(...Generators.generateSPISection(profile));
                if (Generators.generateExtraComponents) lines.push(...Generators.generateExtraComponents(profile));
                if (Generators.generateAXP2101Section) lines.push(...Generators.generateAXP2101Section(profile));
                if (Generators.generateOutputSection) lines.push(...Generators.generateOutputSection(profile));
                if (Generators.generateBacklightSection) lines.push(...Generators.generateBacklightSection(profile));
                if (Generators.generateRTTTLSection) lines.push(...Generators.generateRTTTLSection(profile));
                if (Generators.generateAudioSection) lines.push(...Generators.generateAudioSection(profile));

                // Time
                lines.push("time:", "  - platform: homeassistant", "    id: ha_time");
            }

            // Numeric Sensors
            const numericSensorLines = [];
            if (!profile.isPackageBased && Generators.generateSensorSection) {
                const legacySensors = Generators.generateSensorSection(profile, [], displayId, context.widgets);
                const rawLines = (legacySensors.length > 0 && legacySensors[0].trim() === "sensor:") ?
                    legacySensors.slice(1).map(l => l.startsWith("  ") ? l.slice(2) : l) :
                    legacySensors;

                const templateIdx = rawLines.findIndex(l => l.includes("platform: template"));
                if (templateIdx !== -1) {
                    numericSensorLines.push(...rawLines.slice(0, templateIdx));
                    PluginRegistry.onExportNumericSensors({ ...context, lines: numericSensorLines });
                    numericSensorLines.push(...rawLines.slice(templateIdx));
                } else {
                    numericSensorLines.push(...rawLines);
                    PluginRegistry.onExportNumericSensors({ ...context, lines: numericSensorLines });
                }
            } else {
                PluginRegistry.onExportNumericSensors({ ...context, lines: numericSensorLines });

                // Safety Fix: Auto-register any HA numeric sensors that weren't caught by plugins
                const allWidgets = pages.flatMap(p => p.widgets || []);
                const seenEntities = new Set();

                // Track entities already registered by plugins (very basic check)
                numericSensorLines.forEach(l => {
                    if (l.includes("entity_id:")) {
                        const m = l.match(/entity_id:\s*(.+)/);
                        if (m) seenEntities.add(m[1].trim());
                    }
                });

                allWidgets.forEach(w => {
                    const entityId = (w.entity_id || "").trim();
                    const p = w.props || {};
                    const isHaSensor = entityId.includes(".") && !entityId.startsWith("weather.") && !entityId.startsWith("text_sensor.") && !entityId.startsWith("binary_sensor.");

                    if (isHaSensor && !p.is_local_sensor && !seenEntities.has(entityId)) {
                        seenEntities.add(entityId);
                        const safeId = entityId.replace(/[^a-zA-Z0-9_]/g, "_");
                        numericSensorLines.push("- platform: homeassistant");
                        numericSensorLines.push(`  id: ${safeId}`);
                        numericSensorLines.push(`  entity_id: ${entityId}`);
                        numericSensorLines.push(`  internal: true`);
                    }
                });
            }

            if (numericSensorLines.length > 0) {
                lines.push("sensor:");
                lines.push(...numericSensorLines.map(l => "  " + l));
            }

            // Text Sensors
            const textSensorLines = [];
            PluginRegistry.onExportTextSensors({ ...context, lines: textSensorLines });
            if (textSensorLines.length > 0) {
                lines.push("text_sensor:");
                lines.push(...textSensorLines.map(l => "  " + l));
            }

            // Binary Sensors
            const binarySensorLines = [];
            if (!profile.isPackageBased && Generators.generateBinarySensorSection) {
                const legacyBinary = Generators.generateBinarySensorSection(profile, pages.length, displayId, context.widgets.filter(w => w.type === 'touch_area'));
                if (legacyBinary.length > 0 && legacyBinary[0].trim() === "binary_sensor:") {
                    binarySensorLines.push(...legacyBinary.slice(1).map(l => l.startsWith("  ") ? l.slice(2) : l));
                } else {
                    binarySensorLines.push(...legacyBinary);
                }
            }
            PluginRegistry.onExportBinarySensors({ ...context, lines: binarySensorLines });

            if (binarySensorLines.length > 0) {
                lines.push("binary_sensor:");
                lines.push(...binarySensorLines.map(l => "  " + l));
            }

            // Button Section
            if (!profile.isPackageBased && Generators.generateButtonSection) {
                const buttonLines = Generators.generateButtonSection(profile, pages.length, displayId);
                if (buttonLines.length > 0) {
                    lines.push(...buttonLines);
                }
            }

            // 5. Time (Home Assistant)
            lines.push("time:");
            lines.push("  - platform: homeassistant");
            lines.push("    id: ha_time");
            lines.push("");

            // Top-level Components (image, graph, etc.)
            const plugins = PluginRegistry.getAll();
            const order = ["image", "online_image", "graph", "qr_code"];
            plugins.sort((a, b) => {
                const idxA = order.indexOf(a.id);
                const idxB = order.indexOf(b.id);
                if (idxA !== -1 && idxB !== -1) return idxA - idxB;
                if (idxA !== -1) return -1;
                if (idxB !== -1) return 1;
                return a.id.localeCompare(b.id);
            });
            plugins.forEach(p => p.onExportComponents && p.onExportComponents({ ...context, lines }));
        }

        // Before generating fonts/scripts, generate the lambda content to track dependencies
        const lambdaContent = this.generateDisplayLambda(pages, layout, profile);

        // 5. Fonts
        lines.push(...this.fonts.getLines());

        // 6. Scripts
        const scriptLines = this.yaml.generateScriptSection(layout, pages, profile);
        if (scriptLines.length > 0) {
            lines.push(...scriptLines);
        }

        // 6.5 LVGL (If supported)
        if (isLvgl && generateLVGLSnippet) {
            const lvglSnippet = generateLVGLSnippet(pages, model);
            if (lvglSnippet && lvglSnippet.length > 0) {
                lines.push(...lvglSnippet);
            }
        }

        // 7. Display Hardware & Lambda
        const hasLvgl = isLvgl && generateLVGLSnippet;
        if (!profile.isPackageBased) {
            // Fix #129: Skip generic display if LVGL is handling it
            const hardwareLines = (Generators.generateDisplaySection && !hasLvgl)
                ? Generators.generateDisplaySection(profile, layout.orientation)
                : [];
            lines.push(...hardwareLines);

            for (let i = 0; i < lines.length; i++) {
                if (lines[i].trim() === "display:") {
                    let j = i + 1;
                    while (j < lines.length && (lines[j].startsWith("  ") || lines[j].trim() === "")) j++;
                    // Fix #122: Use consistent indentation for lambda header
                    lines.splice(j, 0, "    lambda: |-", ...lambdaContent.map(l => "      " + l));
                    break;
                }
            }
        } else if (packageContent) {
            // Fix #122: Robust placeholder replacement with indentation preservation
            // Ensure first line doesn't get double indent by matching entire line
            const lambdaString = lambdaContent.map(l => "      " + l).join("\n");
            const placeholder = "# __LAMBDA_PLACEHOLDER__";

            // Check if recipe already contains the lambda header immediately before placeholder
            const hasHeader = new RegExp(`lambda:\\s*\\|-\\s*[\\r\\n]+\\s*${placeholder.replace("#", "\\#")}`).test(packageContent);

            // Replace the entire line containing the placeholder (including its indentation)
            // This prevents the first line from inheriting the placeholder's indentation
            const placeholderRegex = new RegExp(`^\\s*${placeholder.replace("#", "\\#")}`, 'm');

            if (packageContent.match(placeholderRegex)) {
                const replacement = (hasHeader ? "" : "lambda: |-\n") + lambdaString;
                packageContent = packageContent.replace(placeholderRegex, replacement);
            }

            packageContent = this.applyPackageOverrides(packageContent, profile, layout.orientation);
            return this.sanitizePackageContent(packageContent) + "\n\n" + lines.join('\n');
        }

        return lines.join('\n');
    }

    async preProcessWidgets(pages) {
        for (const p of pages) {
            if (p.widgets) {
                for (const w of p.widgets.filter(widget => !widget.hidden)) {
                    const type = w.type;
                    const plugin = PluginRegistry ? await PluginRegistry.load(type) : null;
                    if (plugin) {
                        this.usedPlugins.add(plugin);

                        // New: Decentralized requirement collection
                        if (typeof plugin.collectRequirements === 'function') {
                            plugin.collectRequirements(w, {
                                trackIcon: (name, size) => this.fonts.trackIcon(name, size),
                                addFont: (f, w, s, i) => this.fonts.addFont(f, w, s, i)
                            });
                        }
                    }

                    // Keeping legacy checks for widgets that haven't been refactored yet,
                    // but they will override or coexist with plugins. 
                    // Once refactoring is complete, these else-ifs can be removed.
                    const t = (w.type || "").toLowerCase();
                    const p = w.props || {};
                    const addIcon = (name, size) => this.fonts.trackIcon(name, size);

                    if (t === "weather_icon") ["F0594", "F0590", "F0026", "F0591", "F0592", "F0593", "F067E", "F0595", "F0596", "F0597", "F0598", "F067F", "F0599", "F059D", "F059E"].forEach(c => addIcon(c, p.size || 48));
                    else if (t === "weather_forecast") ["F0594", "F0590", "F0026", "F0591", "F0592", "F0593", "F067E", "F0595", "F0596", "F0597", "F0598", "F067F", "F0599", "F059D", "F059E"].forEach(c => addIcon(c, p.icon_size || 32));
                    else if (t === "battery_icon") ["F0079", "F007A", "F007B", "F007C", "F007D", "F007E", "F007F", "F0080", "F0081", "F0082", "F0083"].forEach(c => addIcon(c, p.size || 24));
                    else if (t === "wifi_signal") ["F092B", "F091F", "F0922", "F0925", "F0928"].forEach(c => addIcon(c, p.size || 24));
                    else if (t === "touch_area") { if (p.icon) addIcon(p.icon, p.icon_size || 40); if (p.icon_pressed) addIcon(p.icon_pressed, p.icon_size || 40); }
                    else if (t === "ondevice_temperature") ["F0E4C", "F050F", "F10C2"].forEach(c => addIcon(c, p.size || 32));
                    else if (t === "ondevice_humidity") ["F0E7A", "F058E", "F058C"].forEach(c => addIcon(c, p.size || 32));
                    else if (t === "template_sensor_bar") ["F092B", "F091F", "F0922", "F0925", "F0928", "F0E4C", "F050F", "F10C2", "F0E7A", "F058E", "F058C", "F0079", "F007E", "F007B", "F0082", "F0083"].forEach(c => addIcon(c, p.icon_size || 20));
                    else if (t === "template_nav_bar") ["F0141", "F02DC", "F0142"].forEach(c => addIcon(c, p.icon_size || 24));

                    // Removed 'icon' type check as it will be handled by the plugin now.
                }
            }
        }
    }



    /**
     * Generates a C++ lambda display logic for a page.
     * @param {import("../../types.js").PageConfig[]} pages
     * @param {import("../../types.js").ProjectPayload} layout
     * @param {import("../../types.js").DeviceProfile} profile
     */
    generateDisplayLambda(pages, layout, profile) {
        const lines = [];
        const useInvertedColors = profile.features?.inverted_colors || layout.inverted_colors;
        const isEpaper = !!(profile.features && profile.features.epaper);

        if (useInvertedColors) {
            lines.push("const auto COLOR_WHITE = Color(0, 0, 0); // Inverted for e-ink");
            lines.push("const auto COLOR_BLACK = Color(255, 255, 255); // Inverted for e-ink");
        } else {
            lines.push("const auto COLOR_WHITE = Color(255, 255, 255);");
            lines.push("const auto COLOR_BLACK = Color(0, 0, 0);");
        }
        lines.push("const auto COLOR_RED = Color(255, 0, 0);");
        lines.push("const auto COLOR_GREEN = Color(0, 255, 0);");
        lines.push("const auto COLOR_BLUE = Color(0, 0, 255);");
        lines.push("const auto COLOR_YELLOW = Color(255, 255, 0);");
        lines.push("const auto COLOR_ORANGE = Color(255, 165, 0);");
        lines.push("auto color_off = COLOR_WHITE;");
        lines.push("auto color_on = COLOR_BLACK;");

        // Helper hooks
        if (window.PluginRegistry) {
            window.PluginRegistry.onExportHelpers({ lines, widgets: pages.flatMap(p => p.widgets || []) });
        }

        lines.push(`int currentPage = id(display_page);`);

        pages.forEach((page, index) => {
            lines.push(`if (currentPage == ${index}) {`);

            // Page Round-trip comments
            lines.push(`  // page:name "${page.name || "Page " + (index + 1)}"`);
            lines.push(`  // page:dark_mode "${page.dark_mode || "inherit"}"`);
            lines.push(`  // page:refresh_type "${page.refresh_type || "interval"}"`);
            lines.push(`  // page:refresh_time "${page.refresh_time || ""}"`);

            // Clear screen for this page
            lines.push(`  // Clear screen for this page`);
            lines.push(`  it.fill(COLOR_WHITE);`);
            lines.push(`  color_off = COLOR_WHITE;`);
            lines.push(`  color_on = COLOR_BLACK;`);

            if (page.widgets) {
                page.widgets.filter(w => !w.hidden).forEach(w => {
                    const widgetLines = this.generateWidget(w, {
                        profile,
                        layout,
                        adapter: this,
                        isEpaper
                    });

                    if (widgetLines.length > 0) {
                        // Smart de-indent: Find min indentation and subtract it to preserve relative offsets
                        const minIndent = widgetLines.reduce((min, line) => {
                            if (!line.trim()) return min; // Ignore empty lines
                            const match = line.match(/^ */);
                            return Math.min(min, match ? match[0].length : 0);
                        }, Infinity);

                        const safeMin = minIndent === Infinity ? 0 : minIndent;

                        lines.push(...widgetLines.map(l => {
                            // If line is empty, just push empty
                            if (!l.trim()) return "";
                            // Remove min indent, then add 2 spaces base indent
                            return "  " + l.substring(safeMin);
                        }));
                    }
                });
            }
            lines.push("}");
        });

        return lines;
    }

    /**
     * Orchestrates the export of a single widget by delegating to its plugin.
     * @param {import("../../types.js").WidgetConfig} widget 
     * @param {import("../../types.js").GenerationContext} context 
     * @returns {string[]}
     */
    generateWidget(widget, context) {
        const widgetLines = [];
        const plugin = PluginRegistry ? PluginRegistry.get(widget.type) : null;
        const isLvglWidget = widget.type && widget.type.startsWith("lvgl_");

        if (plugin && typeof plugin.export === 'function') {
            const exportContext = {
                ...context,
                lines: widgetLines,
                addFont: (f, w, s, i) => this.fonts.addFont(f, w, s, i),
                getColorConst: (c) => Utils ? Utils.getColorConst(c) : `"${c}"`,
                getAlignX: (a, x, w) => Utils ? Utils.getAlignX(a, x, w) : x,
                getAlignY: (a, y, h) => Utils ? Utils.getAlignY(a, y, h) : y,
                addDitherMask: (l, c, e, x, y, w, h) => Utils ? Utils.addDitherMask(l, c, e, x, y, w, h) : null,
                sanitize: (s) => this.sanitize(s),
                getCondProps: (w) => this.getCondProps(w),
                getConditionCheck: (w) => this.getConditionCheck(w),
                Utils: Utils,
                COLORS: COLORS,
                ALIGNMENT: ALIGNMENT,
                TEXT_Y_OFFSET: 0,
                RECT_Y_OFFSET: 0
            };

            const result = plugin.export(widget, exportContext);
            if (result && Array.isArray(result)) {
                widgetLines.push(...result);
            } else if (result && typeof result === 'string') {
                widgetLines.push(result);
            }
        } else if (isLvglWidget) {
            // If it's an LVGL widget but we aren't using the direct LVGL generator 
            // (e.g. on an e-paper device or if isLvgl=false), we MUST still export 
            // the marker comment so it doesn't get lost on Update.
            if (serializeWidget) {
                widgetLines.push(serializeWidget(widget));
            } else {
                widgetLines.push(`// widget:${widget.type} id:${widget.id} x:${widget.x} y:${widget.y} w:${widget.width} h:${widget.height}`);
            }
        } else {
            widgetLines.push(`// widget:${widget.type} id:${widget.id} status:unsupported`);
            widgetLines.push(`        // Unsupported widget type: ${widget.type}`);
        }

        return widgetLines;
    }


    async fetchHardwarePackage(url) {
        // Handle proxy if needed
        let fetchUrl = url;
        if (window.location.pathname.includes("/esphome-designer")) {
            if (!url.startsWith("http") && !url.startsWith("/")) {
                fetchUrl = "/esphome-designer/static/" + url;
            }
        }

        try {
            const response = await fetch(fetchUrl, { cache: "no-store" });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            return await response.text();
        } catch (e) {
            Logger.error("Failed to fetch hardware package:", e);
            return `# ERROR LOADING PROFILE: ${e.message}`;
        }
    }

    sanitizePackageContent(yaml) {
        if (!yaml) return "";
        const systemKeys = ["esphome:", "esp32:", "wifi:", "api:", "ota:", "logger:", "web_server:", "captive_portal:", "platformio_options:", "preferences:", "substitutions:"];
        const lines = yaml.split('\n');
        const sanitized = [];
        let inSystemBlock = false;

        for (let line of lines) {
            const trimmed = line.trim();
            if (trimmed.length === 0) { sanitized.push(line); continue; }
            const indent = (line.match(/^\s*/) || [""])[0].length;
            if (indent === 0 && trimmed.endsWith(':')) {
                inSystemBlock = systemKeys.some(k => trimmed.startsWith(k));
                if (inSystemBlock) sanitized.push("# " + line + " # (Auto-commented)");
                else sanitized.push(line);
            } else {
                if (inSystemBlock) sanitized.push("# " + line);
                else sanitized.push(line);
            }
        }
        return sanitized.join('\n');
    }

    applyPackageOverrides(yaml, profile, orientation) {
        if (profile.name?.includes("Waveshare Touch LCD 7")) {
            let rotation = 90;
            if (orientation === "portrait") rotation = 0;
            else if (orientation === "landscape") rotation = 90;
            else if (orientation === "portrait_inverted") rotation = 180;
            else if (orientation === "landscape_inverted") rotation = 270;

            yaml = yaml.replace(/rotation:\s*\d+/g, `rotation: ${rotation}`);

            // Simple GT911 transform logic
            let transform = "";
            if (rotation === 0) transform = "swap_xy: true\n      mirror_x: false\n      mirror_y: true";
            else if (rotation === 90) transform = "swap_xy: false\n      mirror_x: false\n      mirror_y: false";
            else if (rotation === 180) transform = "swap_xy: true\n      mirror_x: true\n      mirror_y: false";
            else if (rotation === 270) transform = "swap_xy: false\n      mirror_x: true\n      mirror_y: true";

            if (transform) {
                yaml = yaml.replace(/(id:\s*my_touchscreen\s*\n)/, `$1    transform:\n      ${transform}\n`);
            }
        }
        return yaml;
    }

    getCondProps(w) {
        if (!w.condition_entity) return "";
        let s = ` cond_ent:"${w.condition_entity}" cond_op:"${w.condition_operator || "=="}"`;
        if (w.condition_state) s += ` cond_state:"${w.condition_state}"`;
        if (w.condition_min) s += ` cond_min:"${w.condition_min}"`;
        if (w.condition_max) s += ` cond_max:"${w.condition_max}"`;
        return s;
    }

    getConditionCheck(w) {
        const ent = (w.condition_entity || "").trim();
        if (!ent) return "";

        const op = w.condition_operator || "==";
        const state = (w.condition_state || "").trim();
        const stateLower = state.toLowerCase();
        const minVal = w.condition_min;
        const maxVal = w.condition_max;

        const safeId = ent.replace(/[^a-zA-Z0-9_]/g, "_");

        const isTextExplicit = ent.startsWith("text_sensor.");
        const isBinary = ent.startsWith("binary_sensor.");
        let isText = isTextExplicit;

        if (!isText && !isBinary && op !== "range") {
            const numeric = parseFloat(state);
            const booleanKeywords = ["on", "off", "true", "false", "open", "closed", "locked", "unlocked", "home", "not_home", "occupied", "clear", "active", "inactive", "detected", "idle"];
            if (state && isNaN(numeric) && !booleanKeywords.includes(stateLower)) {
                isText = true;
            }
        }

        let valExpr = `id(${safeId}).state`;
        if (isText) valExpr = `id(${safeId}_txt).state`;
        else if (isBinary) valExpr = `id(${safeId}_bin).state`;

        let cond = "";
        if (op === "==" || op === "!=" || op === ">" || op === "<" || op === ">=" || op === "<=") {
            if (isText) {
                cond = `${valExpr} ${op} "${state}"`;
            } else if (ent.startsWith("binary_sensor.")) {
                const positiveStates = ["on", "true", "1", "open", "locked", "home", "occupied", "active", "detected"];
                const isPositive = positiveStates.includes(stateLower);
                if (op === "==") cond = isPositive ? valExpr : `!${valExpr}`;
                else if (op === "!=") cond = isPositive ? `!${valExpr}` : valExpr;
                else cond = `(int)${valExpr} ${op} ${isPositive ? 1 : 0}`;
            } else {
                let numVal = parseFloat(state);
                if (isNaN(numVal)) {
                    if (["on", "true", "open", "locked", "home", "occupied", "active", "detected"].includes(stateLower)) numVal = 1;
                    else if (["off", "false", "closed", "unlocked", "not_home", "clear", "inactive", "idle"].includes(stateLower)) numVal = 0;
                }
                cond = `${valExpr} ${op} ${isNaN(numVal) ? 0 : numVal}`;
            }
        } else if (op === "range") {
            const minNum = parseFloat(minVal);
            const maxNum = parseFloat(maxVal);
            cond = `${valExpr} >= ${isNaN(minNum) ? 0 : minNum} && ${valExpr} <= ${isNaN(maxNum) ? 100 : maxNum}`;
        }

        if (!cond) return "";
        return `if (${cond}) {`;
    }


    sanitize(str) {
        if (!str) return "";
        return str.replace(/"/g, '\\"');
    }
}

window.ESPHomeAdapter = ESPHomeAdapter;
