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
import { applyPackageOverrides } from '../generators/yaml_merger.js';
import { generateDisplayLambda } from '../generators/native_generator.js';
import { collectNumericSensors, collectTextSensors, collectBinarySensors, isEntityStateNonNumeric } from './entity_dedup.js';
import { processPackageContent } from './package_processor.js';

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
     * @param {ProjectPayload} layout
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
                displayModel: ch.displayModel, // Passed through from custom hardware settings
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
        if (!layout.isSelectionSnippet) {
            lines.push(...this.yaml.generateInstructionHeader(profile, layout));
            lines.push(...this.yaml.generateSystemSections(profile, layout));
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

        // Track registered IDs and entities to avoid duplicates
        const seenEntityIds = new Set();
        const seenSensorIds = new Set();
        const seenTextEntityIds = new Set();
        const pendingTriggers = new Map(); // entity_id -> Set of action strings

        const context = {
            widgets: allWidgets,
            profile,
            layout,
            displayId,
            adapter: this,
            isLvgl,
            seenEntityIds,
            seenSensorIds,
            seenTextEntityIds,
            pendingTriggers,
            appState: window.AppState
        };

        if (PluginRegistry) {
            // 1. ESPHome Section & Globals
            const globalLines = [];
            const includeLines = [];

            // Collect includes from plugins
            PluginRegistry.onExportEsphome({ ...context, lines: includeLines });

            // Core Globals
            globalLines.push("- id: display_page", "  type: int", "  restore_value: false", "  initial_value: '0'");

            // Match legacy epaper detection for regression testing
            const isEpaper = !!(profile.features && (profile.features.epaper || profile.features.epd));
            const isLcd = !!(profile.features && profile.features.lcd) || !isEpaper;
            const defaultRefresh = layout.refreshInterval || (isLcd ? 60 : (layout.deepSleepInterval || 600));
            globalLines.push("- id: page_refresh_default_s", "  type: int", "  restore_value: true", `  initial_value: '${defaultRefresh}'`);
            globalLines.push("- id: page_refresh_current_s", "  type: int", "  restore_value: false", "  initial_value: '60'");
            globalLines.push("- id: last_page_switch_time", "  type: uint32_t", "  restore_value: false", "  initial_value: '0'");

            PluginRegistry.onExportGlobals({ ...context, lines: globalLines });

            if (includeLines.length > 0) {
                layout.plugin_includes = includeLines;
            }

            if (!profile.isPackageBased) {
                lines.length = 0; // Reset lines to handle the header/system sections after hook collection
                if (!layout.isSelectionSnippet) {
                    lines.push(...this.yaml.generateInstructionHeader(profile, layout));
                    lines.push(...this.yaml.generateSystemSections(profile, layout));
                    lines.push("");
                }
            }

            if (globalLines.length > 0 && !layout.isSelectionSnippet) {
                lines.push("globals:");
                lines.push(...globalLines.map(l => "  " + l));
            }

            // 2. PSRAM
            const packageHasPsram = packageContent && packageContent.includes("psram:");
            if (!packageHasPsram && profile.features?.psram && Generators.generatePSRAMSection) {
                lines.push(...Generators.generatePSRAMSection(profile));
            }

            // Hardware Sections (I2C, SPI, etc.)
            if (!profile.isPackageBased && !layout.isSelectionSnippet) {
                // HTTP Request first
                lines.push("http_request:", "  verify_ssl: false", "  timeout: 20s", "  buffer_size_rx: 4096");

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
                    seenSensorIds.add("ha_time");
                }
            } else if (!layout.isSelectionSnippet) {
                // For package-based, we STILL want the time block if not present
                const hasTime = lines.some(l => String(l).split('\n').some(subL => subL.trim() === "time:"));
                if (!hasTime) {
                    lines.push("time:", "  - platform: homeassistant", "    id: ha_time");
                    seenSensorIds.add("ha_time");
                }
            }

            // Pre-populate hardware sensors based on profile features
            if (profile.features) {
                if (profile.pins?.batteryAdc) {
                    seenSensorIds.add("battery_voltage");
                    seenSensorIds.add("battery_level");
                }
                if (profile.features.sht4x) {
                    seenSensorIds.add("sht4x_sensor");
                    seenSensorIds.add("sht4x_temperature");
                    seenSensorIds.add("sht4x_humidity");
                }
                if (profile.features.sht3x || profile.features.sht3xd) {
                    seenSensorIds.add("sht3x_sensor");
                    seenSensorIds.add("sht3x_temperature");
                    seenSensorIds.add("sht3x_humidity");
                }
                if (profile.features.shtc3) {
                    seenSensorIds.add("shtc3_sensor");
                    seenSensorIds.add("shtc3_temperature");
                    seenSensorIds.add("shtc3_humidity");
                }
            }

            // Insert Sensor Section here
            if (Generators.generateSensorSection) lines.push(...Generators.generateSensorSection(profile, [], displayId, allWidgets));

            // Numeric Sensors
            const numericSensorLinesOrig = [];
            PluginRegistry.onExportNumericSensors({ ...context, lines: numericSensorLinesOrig, mainLines: lines });
            const numericSensorLines = this.processPendingTriggers(numericSensorLinesOrig, pendingTriggers, isLvgl, "on_value");

            if (numericSensorLines.length > 0) {
                if (!lines.some(l => l === "sensor:")) lines.push("sensor:");
                lines.push(...numericSensorLines.flatMap(l => l.split('\n').map(sub => "  " + sub)));
            }

            // Safety Fix: Auto-register any HA numeric sensors that weren't caught by plugins
            // This now runs for ALL profiles (including legacy) to ensure consistency.
            const numericSensorLinesExtra = collectNumericSensors(pages, context);

            if (numericSensorLinesExtra.length > 0) {
                if (!lines.some(l => l === "sensor:")) lines.push("sensor:");

                const mergedSafetyLines = this.processPendingTriggers(numericSensorLinesExtra, pendingTriggers, isLvgl, "on_value");
                lines.push(...mergedSafetyLines.flatMap(l => l.split('\n').map(sub => "  " + sub)));
            }

            // Safety Fix: Auto-register any HA text sensors used in conditions or linked to widgets
            const textSensorLinesExtra = collectTextSensors(pages, context);

            // Text Sensors
            const textSensorLinesOrig = [];
            PluginRegistry.onExportTextSensors({ ...context, lines: textSensorLinesOrig });

            // Merge extra text sensors
            if (textSensorLinesExtra.length > 0) {
                textSensorLinesOrig.push(...textSensorLinesExtra);
            }

            const textSensorLines = this.processPendingTriggers(textSensorLinesOrig, pendingTriggers, isLvgl, "on_value");
            if (textSensorLines.length > 0) {
                lines.push("text_sensor:");
                lines.push(...textSensorLines.flatMap(l => l.split('\n').map(sub => "  " + sub)));
            }

            // Binary Sensors
            const binarySensorLinesOrig = [];

            // Generate hardware binary sensors (buttons, etc.) only for non-package profiles
            if (!profile.isPackageBased && Generators.generateBinarySensorSection) {
                const legacyBinary = Generators.generateBinarySensorSection(profile, pages.length, displayId, []);
                if (legacyBinary.length > 0 && legacyBinary[0].trim() === "binary_sensor:") {
                    binarySensorLinesOrig.push(...legacyBinary.slice(1).map(l => l.startsWith("  ") ? l.slice(2) : l));
                } else {
                    binarySensorLinesOrig.push(...legacyBinary);
                }
            }

            // ALWAYS generate touch sensors for nav bars and touch areas, even for package-based profiles
            const touchWidgets = allWidgets.filter(w => w.type === 'touch_area' || w.type === 'template_nav_bar');
            let touchSensorContent = []; // Store for package injection
            if (touchWidgets.length > 0 && Generators.generateBinarySensorSection) {
                // Pass minimal profile (no features.buttons) so only touch sensors are generated
                const touchBinary = Generators.generateBinarySensorSection({ features: {} }, pages.length, displayId, touchWidgets);
                if (touchBinary.length > 0) {
                    // Skip the "binary_sensor:" header if present, keep all content lines
                    const startIdx = touchBinary[0]?.trim() === "binary_sensor:" ? 1 : 0;
                    if (touchBinary.length > startIdx) {
                        // For package-based profiles, store for placeholder injection
                        // For non-package profiles, add to binarySensorLinesOrig as before
                        if (profile.isPackageBased) {
                            touchSensorContent = touchBinary.slice(startIdx);
                        } else {
                            binarySensorLinesOrig.push(`# Touch Area Binary Sensors`);
                            binarySensorLinesOrig.push(...touchBinary.slice(startIdx).map(l => l.startsWith("  ") ? l.slice(2) : l));
                        }
                    }
                }
            }

            // Store touch content for later package injection
            this._pendingTouchSensors = touchSensorContent;

            // New: Allow plugins to register binary sensors
            PluginRegistry.onExportBinarySensors({ ...context, lines: binarySensorLinesOrig });
            const binarySensorLines = this.processPendingTriggers(binarySensorLinesOrig, pendingTriggers, isLvgl, "on_state");
            // Only add binary_sensor section for non-package profiles (or if there are non-touch sensors)
            if (binarySensorLines.length > 0 && !profile.isPackageBased) {
                lines.push("binary_sensor:");
                lines.push(...binarySensorLines.flatMap(l => l.split('\n').map(sub => "  " + sub)));
            }

            // Safety Fix: Auto-register any HA binary sensors used in conditions or linked to widgets
            const binarySensorLinesExtra = collectBinarySensors(pages, context);

            if (binarySensorLinesExtra.length > 0) {
                if (!lines.some(l => l === "binary_sensor:")) lines.push("binary_sensor:");

                const mergedBinaryExtraLines = this.processPendingTriggers(binarySensorLinesExtra, pendingTriggers, isLvgl, "on_state");
                lines.push(...mergedBinaryExtraLines.flatMap(l => l.split('\n').map(sub => "  " + sub)));
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
        const lambdaContent = generateDisplayLambda(pages, layout, profile, context, this);

        // 5. Fonts
        lines.push(...this.fonts.getLines(layout.glyphsets, layout.extendedLatinGlyphs));

        // 6. Scripts
        const scriptLines = this.yaml.generateScriptSection(layout, pages, profile);
        if (scriptLines.length > 0) {
            lines.push(...scriptLines);
        }

        // 6.5 LVGL (If supported)
        if (isLvgl && generateLVGLSnippet) {
            const lvglSnippet = generateLVGLSnippet(pages, model, profile, layout);
            if (lvglSnippet && lvglSnippet.length > 0) {
                lines.push(...lvglSnippet);
            }
        }

        // 7. Display Hardware & Lambda
        const hasLvgl = isLvgl && generateLVGLSnippet;
        if (!profile.isPackageBased) {
            // Fix #129: Keep display hardware but skip lambda if LVGL is handling rendering
            const hardwareLines = Generators.generateDisplaySection
                ? Generators.generateDisplaySection(profile, layout, isLvgl)
                : [];
            lines.push(...hardwareLines);

            for (let i = 0; i < lines.length; i++) {
                if (lines[i].trim() === "display:") {
                    let j = i + 1;
                    while (j < lines.length && (lines[j].startsWith("  ") || lines[j].trim() === "")) j++;
                    if (!hasLvgl) {
                        // Fix #122: Use consistent indentation for lambda header
                        lines.splice(j, 0, "    lambda: |-", ...lambdaContent.map(l => l.trim() ? "      " + l : ""));
                    }
                    break;
                }
            }
        } else if (packageContent) {
            return processPackageContent(packageContent, lambdaContent, this._pendingTouchSensors, profile, layout, isLvgl, lines);
        }

        // Fix: Sanitize all lines to remove trailing whitespace (YAML block scalars are sensitive to this)
        return lines.map(l => l.trimEnd()).join('\n');
    }

    async preProcessWidgets(pages) {
        for (const p of pages) {
            if (p.widgets) {
                for (const w of p.widgets.filter(widget => !widget.hidden && widget.type !== 'group')) {
                    const type = w.type;
                    const plugin = PluginRegistry ? await PluginRegistry.load(type) : null;
                    if (plugin) {
                        this.usedPlugins.add(plugin);

                        // Registration Hook: Plugins collect their own requirements (fonts, icons, etc.)
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
     * Processes defined sensor lines and injects on_value triggers 
     * from pendingTriggers if a matching id or entity_id is found.
     */
    /**
     * Processes defined sensor lines and injects on_value triggers 
     * from pendingTriggers if a matching id or entity_id is found.
     */
    processPendingTriggers(sensorLines, pendingTriggers, isLvgl, triggerName = "on_value") {
        if (!isLvgl || !pendingTriggers || pendingTriggers.size === 0) return sensorLines;

        const mergedLines = [];
        let pendingInjection = null;

        for (let i = 0; i < sensorLines.length; i++) {
            const line = sensorLines[i];
            const trimmed = line.trim();
            mergedLines.push(line);

            // 1. Detect Entity/ID match
            const match = line.match(/^\s*(entity_id|id):\s*"?([^"]+)"?/);
            if (match) {
                const ent = match[2].trim();
                // Check exact match (often entity_id) OR simplified match (id)
                const hasTrigger = pendingTriggers.has(ent);

                if (hasTrigger) {
                    // Check if on_value exists ahead
                    let hasExistingTrigger = false;
                    const currentIndent = (line.match(/^\s*/) || [""])[0].length;

                    for (let j = i + 1; j < sensorLines.length; j++) {
                        const nextLine = sensorLines[j];
                        const nextTrim = nextLine.trim();
                        if (!nextTrim) continue;
                        const nextIndent = (nextLine.match(/^\s*/) || [""])[0].length;

                        // Stop if we exit the current item block
                        if (nextIndent <= currentIndent && nextTrim.startsWith("-")) break;

                        if (nextTrim === `${triggerName}:`) {
                            hasExistingTrigger = true;
                            break;
                        }
                    }

                    if (hasExistingTrigger) {
                        pendingInjection = {
                            triggers: pendingTriggers.get(ent),
                            active: true
                        };
                    } else {
                        // Inject immediately
                        const indent = " ".repeat(currentIndent);
                        mergedLines.push(`${indent}${triggerName}:`);
                        mergedLines.push(`${indent}  then:`);
                        for (const action of pendingTriggers.get(ent)) {
                            const actionLines = action.split('\n');
                            actionLines.forEach(aLine => {
                                mergedLines.push(`${indent}    ${aLine}`);
                            });
                        }
                    }
                }
            }

            // 2. Handle Injection into Existing Trigger
            if (pendingInjection && pendingInjection.active) {
                if (trimmed === `${triggerName}:`) {
                    pendingInjection.foundKey = true;
                } else if (pendingInjection.foundKey) {
                    // Inject after 'then:' or after first list item
                    if (trimmed === "then:") {
                        const indentStr = " ".repeat((line.match(/^\s*/) || [""])[0].length + 2);
                        for (const action of pendingInjection.triggers) {
                            const actionLines = action.split('\n');
                            actionLines.forEach(aLine => {
                                mergedLines.push(`${indentStr}${aLine}`);
                            });
                        }
                        pendingInjection = null;
                    } else if (trimmed.startsWith("-")) {
                        const indentStr = " ".repeat((line.match(/^\s*/) || [""])[0].length);
                        for (const action of pendingInjection.triggers) {
                            const actionLines = action.split('\n');
                            actionLines.forEach(aLine => {
                                mergedLines.push(`${indentStr}${aLine}`);
                            });
                        }
                        pendingInjection = null;
                    }
                }
            }
        }
        return mergedLines;
    }


    async fetchHardwarePackage(url) {
        // Handle proxy if needed
        let fetchUrl = url;
        if (window.location.pathname.includes("/esphome-designer/editor")) {
            if (!url.startsWith("http") && !url.startsWith("/")) {
                fetchUrl = "/esphome-designer/editor/static/" + url;
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
}

window.ESPHomeAdapter = ESPHomeAdapter;
