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
        const model = layout.deviceModel || (AppState ? AppState.deviceModel : null) || window.currentDeviceModel || "reterminal_e1001";

        const importedProfiles = DEVICE_PROFILES || {};
        const globalProfiles = window.DEVICE_PROFILES || {};
        const profiles = { ...importedProfiles, ...globalProfiles };
        let profile = profiles[model] || {};
        // console.log(`[ESPHomeAdapter] Model: ${model}`);
        // console.log(`[ESPHomeAdapter] Profile features:`, JSON.stringify(profile.features));

        // Custom Hardware Synthesis:
        // If the model is 'custom', we synthesize a profile from the custom hardware settings
        if (model === 'custom' && layout.customHardware) {
            const ch = layout.customHardware;
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

        // Check user's explicit rendering mode preference
        const userRenderingMode = layout.renderingMode || (AppState ? AppState.settings?.renderingMode : null);

        // If user explicitly chose 'direct', override LVGL detection
        if (userRenderingMode === 'direct') {
            isLvgl = false;
            Logger.log("[ESPHomeAdapter] Rendering mode set to 'direct', skipping LVGL generation");
        } else if (userRenderingMode === 'lvgl') {
            isLvgl = true;
            Logger.log("[ESPHomeAdapter] Rendering mode set to 'lvgl', forcing LVGL generation");
        }

        if (!isLvgl) {
            // Scan all pages and widgets for LVGL widgets (only if not already in LVGL mode)
            for (const page of pages) {
                if (page.widgets) {
                    for (const w of page.widgets.filter(widget => !widget.hidden)) {
                        if (w.type.startsWith("lvgl_")) {
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
            lines.push(...this.yaml.generateInstructionHeader(profile, layout));

            lines.push("");
        }

        // 2. Preparation
        const displayId = profile.features?.lcd ? "my_display" : "epaper_display";
        // const isLvgl = !!(profile.features && (profile.features.lvgl || profile.features.lv_display)); // Moved up for auto-detection

        // Font registry is reset in this.reset(), robot fallback is handled in font_registry.js getLines() if empty.

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
        const allWidgets = [];
        pages.forEach((p, idx) => {
            if (p.widgets) {
                p.widgets.forEach(w => {
                    if (!w.hidden) {
                        w._pageIndex = idx; // Inject page index for page-dependent exports (e.g. touch sensors)
                        allWidgets.push(w);
                    }
                });
            }
        });

        const context = {
            widgets: allWidgets,
            profile,
            displayId,
            adapter: this,
            isLvgl
        };

        if (PluginRegistry) {
            // 1. Globals First
            const globalLines = [];

            // Core Globals
            globalLines.push("- id: display_page", "  type: int", "  restore_value: true", "  initial_value: '0'");

            // Match legacy epaper detection for regression testing
            const isEpaper = !!(profile.features && profile.features.epaper);
            const isLcd = !!(profile.features && profile.features.lcd) || !isEpaper;
            const defaultRefresh = layout.refreshInterval || (isLcd ? 60 : (layout.deepSleepInterval || 600));
            globalLines.push("- id: page_refresh_default_s", "  type: int", "  restore_value: true", `  initial_value: '${defaultRefresh}'`);
            globalLines.push("- id: page_refresh_current_s", "  type: int", "  restore_value: false", "  initial_value: '60'");
            globalLines.push("- id: last_page_switch_time", "  type: uint32_t", "  restore_value: false", "  initial_value: '0'");
            PluginRegistry.onExportGlobals({ ...context, lines: globalLines });
            if (globalLines.length > 0) {
                lines.push("globals:");
                lines.push(...globalLines.map(l => "  " + l));
            }

            // 2. PSRAM
            const packageHasPsram = packageContent && packageContent.includes("psram:");
            if (!packageHasPsram && profile.features?.psram && Generators.generatePSRAMSection) {
                lines.push(...Generators.generatePSRAMSection(profile));
            }

            // Hardware Sections (I2C, SPI, etc.)
            if (!profile.isPackageBased) {
                // HTTP Request first
                lines.push("http_request:", "  verify_ssl: false", "  timeout: 20s");

                if (Generators.generateI2CSection) {
                    lines.push(...Generators.generateI2CSection(profile));
                }

                if (Generators.generateSPISection) lines.push(...Generators.generateSPISection(profile));
                if (Generators.generateExtraComponents) lines.push(...Generators.generateExtraComponents(profile));
                if (Generators.generateAXP2101Section) lines.push(...Generators.generateAXP2101Section(profile));
                if (Generators.generateOutputSection) lines.push(...Generators.generateOutputSection(profile));
                if (Generators.generateBacklightSection) lines.push(...Generators.generateBacklightSection(profile));
                if (Generators.generateRTTTLSection) lines.push(...Generators.generateRTTTLSection(profile));
                if (Generators.generateAudioSection) lines.push(...Generators.generateAudioSection(profile));


                // Time (Home Assistant variant, required for datetime plugin and many scripts)
                const hasTime = lines.some(l => String(l).split('\n').some(subL => subL.trim() === "time:"));
                if (!hasTime) {
                    lines.push("time:", "  - platform: homeassistant", "    id: ha_time");
                }
            } else {
                // For package-based, we STILL want the time block if not present
                const hasTime = lines.some(l => String(l).split('\n').some(subL => subL.trim() === "time:"));
                if (!hasTime) {
                    lines.push("time:", "  - platform: homeassistant", "    id: ha_time");
                }
            }

            // Insert Sensor Section here
            if (Generators.generateSensorSection) lines.push(...Generators.generateSensorSection(profile, [], displayId, allWidgets));

            // Numeric Sensors
            const numericSensorLines = [];
            PluginRegistry.onExportNumericSensors({ ...context, lines: numericSensorLines, mainLines: lines });
            if (numericSensorLines.length > 0) {
                if (!lines.some(l => l === "sensor:")) lines.push("sensor:");
                lines.push(...numericSensorLines.flatMap(l => l.split('\n').map(sub => "  " + sub)));
            }

            // Safety Fix: Auto-register any HA numeric sensors that weren't caught by plugins
            // This now runs for ALL profiles (including legacy) to ensure consistency.
            const allWidgetsForSensors = pages.flatMap(p => p.widgets || []);
            const seenEntities = new Set();
            const numericSensorLinesExtra = [];

            // Track entities already registered
            numericSensorLines.forEach(l => {
                if (l.includes("entity_id:")) {
                    const m = l.match(/entity_id:\s*(.+)/);
                    if (m) seenEntities.add(m[1].trim());
                }
            });

            allWidgetsForSensors.forEach(w => {
                let entityId = (w.entity_id || "").trim();
                const p = w.props || {};

                if (!entityId || p.is_local_sensor) return;

                // Numeric sensor types that should be prefixed with sensor. if domain is missing
                const numericSensorTypes = ["progress_bar", "sensor_text", "graph", "battery_icon", "wifi_signal", "ondevice_temperature", "ondevice_humidity"];
                if (numericSensorTypes.includes(w.type) && !entityId.includes(".")) {
                    entityId = `sensor.${entityId}`;
                }

                // Check if it's a Home Assistant sensor domain
                const isHaSensor = entityId.includes(".") && !entityId.startsWith("weather.") && !entityId.startsWith("text_sensor.") && !entityId.startsWith("binary_sensor.");

                // Exclude common binary domains (they go in binary_sensor section)
                const binaryDomains = ["switch.", "light.", "fan.", "input_boolean.", "cover.", "lock."];
                const isBinaryDomain = binaryDomains.some(d => entityId.startsWith(d));

                if (isHaSensor && !isBinaryDomain && !seenEntities.has(entityId)) {
                    seenEntities.add(entityId);
                    const safeId = entityId.replace(/[^a-zA-Z0-9_]/g, "_");
                    numericSensorLinesExtra.push("- platform: homeassistant");
                    numericSensorLinesExtra.push(`  id: ${safeId}`);
                    numericSensorLinesExtra.push(`  entity_id: ${entityId}`);
                    numericSensorLinesExtra.push(`  internal: true`);
                }
            });

            if (numericSensorLinesExtra.length > 0) {
                if (!lines.some(l => l === "sensor:")) lines.push("sensor:");
                lines.push(...numericSensorLinesExtra.flatMap(l => l.split('\n').map(sub => "  " + sub)));
            }

            // Text Sensors
            const textSensorLines = [];
            PluginRegistry.onExportTextSensors({ ...context, lines: textSensorLines });
            if (textSensorLines.length > 0) {
                lines.push("text_sensor:");
                lines.push(...textSensorLines.flatMap(l => l.split('\n').map(sub => "  " + sub)));
            }

            // Binary Sensors
            const binarySensorLines = [];
            if (!profile.isPackageBased && Generators.generateBinarySensorSection) {
                // Note: touch_area widgets are now handled by the plugin's onExportBinarySensors hook
                const legacyBinary = Generators.generateBinarySensorSection(profile, pages.length, displayId, []);
                if (legacyBinary.length > 0 && legacyBinary[0].trim() === "binary_sensor:") {
                    binarySensorLines.push(...legacyBinary.slice(1).map(l => l.startsWith("  ") ? l.slice(2) : l));
                } else {
                    binarySensorLines.push(...legacyBinary);
                }
            }

            // New: Allow plugins to register binary sensors
            PluginRegistry.onExportBinarySensors({ ...context, lines: binarySensorLines });
            if (binarySensorLines.length > 0) {
                lines.push("binary_sensor:");
                lines.push(...binarySensorLines.flatMap(l => l.split('\n').map(sub => "  " + sub)));
            }

            // Safety Fix: Auto-register any HA binary sensors used in conditions or linked to widgets
            const allWidgetsForBinary = pages.flatMap(p => p.widgets || []);
            const seenBinaryEntities = new Set();
            const binaryDomains = ["binary_sensor.", "switch.", "light.", "input_boolean.", "fan.", "cover.", "vacuum.", "lock."];
            const binarySensorLinesExtra = [];

            // Track entities already registered
            binarySensorLines.forEach(l => {
                if (l.includes("entity_id:")) {
                    const m = l.match(/entity_id:\s*(.+)/);
                    if (m) seenBinaryEntities.add(m[1].trim());
                }
            });

            allWidgetsForBinary.forEach(w => {
                // Check condition entity
                const condEnt = (w.condition_entity || "").trim();
                // Check primary entity (for buttons, switches, etc.)
                const primaryEnt = (w.entity_id || "").trim();

                [condEnt, primaryEnt].forEach(ent => {
                    if (!ent) return;
                    const isBinaryHa = binaryDomains.some(d => ent.startsWith(d));

                    if (isBinaryHa && !seenBinaryEntities.has(ent)) {
                        seenBinaryEntities.add(ent);
                        const safeId = ent.replace(/[^a-zA-Z0-9_]/g, "_");
                        binarySensorLinesExtra.push("- platform: homeassistant");
                        binarySensorLinesExtra.push(`  id: ${safeId}`);
                        binarySensorLinesExtra.push(`  entity_id: ${ent}`);
                        binarySensorLinesExtra.push(`  internal: true`);
                    }
                });
            });

            if (binarySensorLinesExtra.length > 0) {
                if (!lines.some(l => l === "binary_sensor:")) lines.push("binary_sensor:");
                lines.push(...binarySensorLinesExtra.flatMap(l => l.split('\n').map(sub => "  " + sub)));
            }

            // Button Section
            if (!profile.isPackageBased && Generators.generateButtonSection) {
                const buttonLines = Generators.generateButtonSection(profile, pages.length, displayId);
                if (buttonLines.length > 0) {
                    lines.push(...buttonLines);
                }
            }



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
            // Fix #129: Keep display hardware but skip lambda if LVGL is handling rendering
            const hardwareLines = Generators.generateDisplaySection
                ? Generators.generateDisplaySection(profile, layout.orientation)
                : [];
            lines.push(...hardwareLines);

            for (let i = 0; i < lines.length; i++) {
                if (lines[i].trim() === "display:") {
                    let j = i + 1;
                    while (j < lines.length && (lines[j].startsWith("  ") || lines[j].trim() === "")) j++;
                    if (!hasLvgl) {
                        // Fix #122: Use consistent indentation for lambda header
                        lines.splice(j, 0, "    lambda: |-", ...lambdaContent.map(l => "      " + l));
                    }
                    break;
                }
            }
        } else if (packageContent) {
            // Fix #122: Robust placeholder replacement with indentation preservation
            // Ensure first line doesn't get double indent by matching entire line
            // Capture indentation and replace the entire line
            const placeholderRegex = /^(\s*)# __LAMBDA_PLACEHOLDER__/m;
            const match = packageContent.match(placeholderRegex);

            if (match) {
                const indent = match[1];
                const placeholder = "# __LAMBDA_PLACEHOLDER__";
                // Check if recipe already contains the lambda header immediately before placeholder
                const hasHeader = new RegExp(`lambda:\\s*\\|-\\s*[\\r\\n]+\\s*${placeholder.replace("#", "\\#")}`).test(packageContent);

                // Fix #129: Skip lambda injection if LVGL is handling the display
                if (hasLvgl) {
                    packageContent = packageContent.replace(placeholderRegex, "");
                } else {
                    const replacement = (hasHeader ? "" : indent + "lambda: |-\n") + lambdaContent.map(l => indent + "  " + l).join("\n");
                    packageContent = packageContent.replace(placeholderRegex, replacement);
                }
            }

            packageContent = this.applyPackageOverrides(packageContent, profile, layout.orientation);
            return this.sanitizePackageContent(packageContent) + "\n\n" + lines.join('\n');
        }

        return lines.join('\n');
    }

    async preProcessWidgets(pages) {
        for (const p of pages) {
            if (p.widgets) {
                for (const w of p.widgets.filter(widget => !widget.hidden && widget.type !== 'group')) {
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
        const useInvertedColors = profile.features?.inverted_colors || layout.invertedColors;
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
        lines.push("");
        lines.push("// Helper to apply a simple grey dither mask for e-paper (checkerboard)");
        lines.push("auto apply_grey_dither_mask = [&](int x_start, int y_start, int w, int h) {");
        lines.push("  for (int y = y_start; y < y_start + h; y++) {");
        lines.push("    for (int x = x_start; x < x_start + w; x++) {");
        lines.push("      if ((x + y) % 2 == 0) it.draw_pixel_at(x, y, COLOR_WHITE);");
        lines.push("      else it.draw_pixel_at(x, y, COLOR_BLACK);");
        lines.push("    }");
        lines.push("  }");
        lines.push("};");

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
                page.widgets.filter(w => !w.hidden && w.type !== 'group').forEach(w => {
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
        if (widget.type === 'group') return [];
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
            // Fix #182: Native resolution is 800x480 (Landscape), so rotation should be 0 for landscape.
            let rotation = 0;
            if (orientation === "portrait") rotation = 90;
            else if (orientation === "landscape") rotation = 0;
            else if (orientation === "portrait_inverted") rotation = 270;
            else if (orientation === "landscape_inverted") rotation = 180;

            yaml = yaml.replace(/rotation:\s*\d+/g, `rotation: ${rotation}`);

            // Fix #129: Indentation-aware GT911 transform logic
            const idMatch = yaml.match(/^(\s*)id:\s*my_touchscreen/m);
            if (idMatch) {
                const indent = idMatch[1];
                let transform = "";
                // Note: GT911 on this panel often needs specific calibration/swaps matching the display rotation
                if (rotation === 0) transform = `transform:\n${indent}  swap_xy: false\n${indent}  mirror_x: false\n${indent}  mirror_y: false`;
                else if (rotation === 90) transform = `transform:\n${indent}  swap_xy: true\n${indent}  mirror_x: false\n${indent}  mirror_y: true`;
                else if (rotation === 180) transform = `transform:\n${indent}  swap_xy: false\n${indent}  mirror_x: true\n${indent}  mirror_y: true`;
                else if (rotation === 270) transform = `transform:\n${indent}  swap_xy: true\n${indent}  mirror_x: true\n${indent}  mirror_y: false`;

                if (transform) {
                    // FIX: transform string already includes the newline and internal indentation.
                    // But the 'transform:' key itself must be indented to match 'id: my_touchscreen'.
                    yaml = yaml.replace(/(id:\s*my_touchscreen[^\n\r]*[\r\n]+)/, `$1${indent}${transform}\n`);
                }
            }
        }
        return yaml;
    }

    getCondProps(w) {
        const ent = (w.condition_entity || "").trim();
        if (!ent) return "";
        const op = w.condition_operator || "==";
        let s = ` cond_ent:"${ent}" cond_op:"${op}"`;

        if (op === "range") {
            if (w.condition_min !== undefined && w.condition_min !== null) s += ` cond_min:"${w.condition_min}"`;
            if (w.condition_max !== undefined && w.condition_max !== null) s += ` cond_max:"${w.condition_max}"`;
        } else {
            if (w.condition_state !== undefined && w.condition_state !== null) s += ` cond_state:"${w.condition_state}"`;
        }
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

        const binaryDomains = ["binary_sensor.", "switch.", "light.", "input_boolean.", "fan.", "cover.", "vacuum.", "lock."];
        const isBinary = binaryDomains.some(d => ent.startsWith(d));
        const isTextExplicit = ent.startsWith("text_sensor.");
        let isText = isTextExplicit;

        if (!isText && !isBinary && op !== "range") {
            const numeric = parseFloat(state);
            const booleanKeywords = ["on", "off", "true", "false", "open", "closed", "locked", "unlocked", "home", "not_home", "occupied", "clear", "active", "inactive", "detected", "idle"];
            if (state && isNaN(numeric) && !booleanKeywords.includes(stateLower)) {
                isText = true;
            }
        }

        // Standardized naming convention - plugins should follow this too
        let valExpr = `id(${safeId}).state`;
        if (isText && !ent.startsWith("text_sensor.")) {
            // Only use _txt if it was auto-detected as text and isn't already prefixed
            // But for consistency with sensor_text plugin, we might need it.
            // Actually, let's keep it simple: id(safeId).state is usually enough if registered correctly.
        }

        let cond = "";
        if (op === "==" || op === "!=" || op === ">" || op === "<" || op === ">=" || op === "<=") {
            if (isText) {
                cond = `${valExpr} ${op} "${state}"`;
            } else if (isBinary) {
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
