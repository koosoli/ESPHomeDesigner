/**
 * @file esphome_adapter.ts
 * @description ESPHome-specific output adapter.
 */

import { Logger } from '../../utils/logger.js';
import { BaseAdapter } from './base_adapter.js';
import { AppState } from '../../core/state.js';
import { registry } from '../../core/plugin_registry.js';
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

export class ESPHomeAdapter extends BaseAdapter {
    fonts: FontRegistry;
    yaml: YamlGenerator;
    usedPlugins: Set<any> = new Set();
    preProcessWidgetsPromise?: Promise<void>;
    _pendingTouchSensors: string[] = [];

    constructor() {
        super();
        this.fonts = new FontRegistry();
        this.yaml = new YamlGenerator();
        this.reset();
    }

    reset(): void {
        if (this.fonts) this.fonts.reset();
        this.usedPlugins = new Set();
    }

    async generate(layout: any): Promise<string> {
        if (!layout) {
            console.error("ESPHomeAdapter: Missing layout");
            return "";
        }
        this.reset();

        const pages = layout.pages || [];
        const model = layout.deviceModel || (AppState ? (AppState as any).deviceModel : null) || (window as any).currentDeviceModel || "reterminal_e1001";
        const profile = this._resolveProfile(model, layout);

        const isLvgl = this._detectRenderingMode(layout, profile, pages);

        const lines: string[] = [];

        // 1. Instructions & Setup Comments
        if (!layout.isSelectionSnippet) {
            lines.push(...this.yaml.generateInstructionHeader(profile, layout));
            lines.push(...this.yaml.generateSystemSections(profile, layout));
            lines.push("");
        }

        // 2. Preparation
        const displayId = profile.features?.lcd ? "my_display" : "epaper_display";

        this.preProcessWidgetsPromise = this.preProcessWidgets(pages);
        await this.preProcessWidgetsPromise;

        // 2. Hardware Package (Pre-fetch for later)
        let packageContent: string | null = null;
        if (profile.isPackageBased) {
            if (profile.isOfflineImport && profile.content) {
                packageContent = profile.content;
            } else if (profile.hardwarePackage) {
                packageContent = await this.fetchHardwarePackage(profile.hardwarePackage);
            }
        }

        // 3. Registry Hooks - Collect segments
        const allWidgets: any[] = [];
        pages.forEach((p: any, idx: number) => {
            if (p.widgets) {
                p.widgets.forEach((w: any) => {
                    if (!w.hidden) {
                        w._pageIndex = idx; // Inject page index for page-dependent exports (e.g. touch sensors)
                        allWidgets.push(w);
                    }
                });
            }
        });

        // Track registered IDs and entities to avoid duplicates
        const seenEntityIds = new Set<string>();
        const seenSensorIds = new Set<string>();
        const seenTextEntityIds = new Set<string>();
        const pendingTriggers = new Map<string, Set<string>>();

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
            appState: AppState
        };

        // 1. ESPHome Section & Globals
        const globalLines: string[] = [];
        const includeLines: string[] = [];

        // Collect includes from plugins
        registry.onExportEsphome({ ...context, lines: includeLines });

        // Core Globals
        globalLines.push("- id: display_page", "  type: int", "  restore_value: false", "  initial_value: '0'");

        // Match legacy epaper detection for regression testing
        const isEpaper = !!(profile.features && (profile.features.epaper || profile.features.epd));
        const isLcd = !!(profile.features && profile.features.lcd) || !isEpaper;
        const defaultRefresh = layout.refreshInterval || (isLcd ? 60 : (layout.deepSleepInterval || 600));
        globalLines.push("- id: page_refresh_default_s", "  type: int", "  restore_value: true", `  initial_value: '${defaultRefresh}'`);
        globalLines.push("- id: page_refresh_current_s", "  type: int", "  restore_value: false", "  initial_value: '60'");
        globalLines.push("- id: last_page_switch_time", "  type: uint32_t", "  restore_value: false", "  initial_value: '0'");

        registry.onExportGlobals({ ...context, lines: globalLines });

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

        // 2. Hardware Infrastructure (PSRAM, I2C, SPI, output, time, sensor seeding)
        this._buildInfrastructureLines(profile, layout, lines, packageContent, seenSensorIds);

        // 3. Sensor Sections (Numeric, Text, Binary, Touch)
        this._buildSensorSections(context, lines);

        // Top-level Components (image, graph, etc.)
        const plugins = registry.getAll();
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
        let hasLvgl = false;
        if (isLvgl && generateLVGLSnippet) {
            const lvglSnippet = generateLVGLSnippet(pages, model, profile, layout);
            if (lvglSnippet && lvglSnippet.length > 0) {
                lines.push(...lvglSnippet);
                hasLvgl = true;
            }
        }

        // 7. Display Hardware & Lambda
        if (!profile.isPackageBased) {
            const hardwareLines = Generators.generateDisplaySection
                ? Generators.generateDisplaySection(profile, layout, isLvgl)
                : [];
            lines.push(...hardwareLines);

            for (let i = 0; i < lines.length; i++) {
                if (lines[i].trim() === "display:") {
                    let j = i + 1;
                    while (j < lines.length && (lines[j].startsWith("  ") || lines[j].trim() === "")) j++;
                    if (!hasLvgl) {
                        lines.splice(j, 0, "    lambda: |-", ...lambdaContent.map(l => l.trim() ? "      " + l : ""));
                    }
                    break;
                }
            }
        } else if (packageContent) {
            return processPackageContent(packageContent, lambdaContent, this._pendingTouchSensors, profile, layout, isLvgl, lines);
        }

        return lines.map(l => l.trimEnd()).join('\n');
    }

    async preProcessWidgets(pages: any[]): Promise<void> {
        for (const p of pages) {
            if (p.widgets) {
                for (const w of p.widgets.filter((widget: any) => !widget.hidden && widget.type !== 'group')) {
                    const type = w.type;
                    const plugin = registry ? await registry.load(type) : null;
                    if (plugin) {
                        this.usedPlugins.add(plugin);

                        if (typeof plugin.collectRequirements === 'function') {
                            plugin.collectRequirements(w, {
                                trackIcon: (name: string, size: number) => this.fonts.trackIcon(name, size),
                                addFont: (f: string, w: number, s: number, i: boolean) => this.fonts.addFont(f, w, s, i)
                            });
                        }
                    }

                }
            }
        }
    }

    processPendingTriggers(sensorLines: string[], pendingTriggers: Map<string, Set<string>>, isLvgl: boolean, triggerName: string = "on_value"): string[] {
        if (!isLvgl || !pendingTriggers || pendingTriggers.size === 0) return sensorLines;

        const mergedLines: string[] = [];
        let pendingInjection: { triggers: Set<string>; active: boolean; foundKey?: boolean } | null = null;

        for (let i = 0; i < sensorLines.length; i++) {
            const line = sensorLines[i];
            const trimmed = line.trim();
            mergedLines.push(line);

            // 1. Detect Entity/ID match
            const match = line.match(/^\s*(entity_id|id):\s*"?([^"]+)"?/);
            if (match) {
                const ent = match[2].trim();
                const hasTrigger = pendingTriggers.has(ent);

                if (hasTrigger) {
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
                            triggers: pendingTriggers.get(ent)!,
                            active: true
                        };
                    } else {
                        // Inject immediately
                        const indent = " ".repeat(currentIndent);
                        mergedLines.push(`${indent}${triggerName}:`);
                        mergedLines.push(`${indent}  then:`);
                        for (const action of pendingTriggers.get(ent)!) {
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


    async fetchHardwarePackage(url: string): Promise<string> {
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
        } catch (e: any) {
            Logger.error("Failed to fetch hardware package:", e);
            return `# ERROR LOADING PROFILE: ${e.message}`;
        }
    }

    _resolveProfile(model: string, layout: any): any {
        const importedProfiles = DEVICE_PROFILES || {};
        const globalProfiles = (window as any).DEVICE_PROFILES || {};
        const profiles = { ...importedProfiles, ...globalProfiles };
        let profile = profiles[model] || {};

        if (model === 'custom' && layout.customHardware) {
            const ch = layout.customHardware;
            profile = {
                id: "custom",
                name: "Custom Device",
                chip: ch.chip || "esp32-s3",
                displayPlatform: ch.displayDriver || "generic_st7789",
                displayModel: ch.displayModel,
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
        return profile;
    }

    _detectRenderingMode(layout: any, profile: any, pages: any[]): boolean {
        let isLvgl = !!(profile.features && (profile.features.lvgl || profile.features.lv_display));

        const userRenderingMode = layout.renderingMode || (AppState ? (AppState as any).settings?.renderingMode : null);

        if (userRenderingMode === 'direct') {
            isLvgl = false;
            Logger.log("[ESPHomeAdapter] Rendering mode set to 'direct', skipping LVGL generation");
        } else if (userRenderingMode === 'lvgl') {
            isLvgl = true;
            Logger.log("[ESPHomeAdapter] Rendering mode set to 'lvgl', forcing LVGL generation");
        }

        if (!isLvgl) {
            for (const page of pages) {
                if (page.widgets) {
                    for (const w of page.widgets.filter((widget: any) => !widget.hidden)) {
                        if (w.type.startsWith("lvgl_")) {
                            isLvgl = true;
                            break;
                        }
                    }
                }
                if (isLvgl) break;
            }
        }
        return isLvgl;
    }

    _buildInfrastructureLines(profile: any, layout: any, lines: string[], packageContent: string | null, seenSensorIds: Set<string>): void {
        const packageHasPsram = packageContent && packageContent.includes("psram:");
        if (!packageHasPsram && profile.features?.psram && Generators.generatePSRAMSection) {
            lines.push(...Generators.generatePSRAMSection(profile));
        }

        if (!profile.isPackageBased && !layout.isSelectionSnippet) {
            lines.push("http_request:", "  verify_ssl: false", "  timeout: 20s", "  buffer_size_rx: 4096");

            if (Generators.generateI2CSection) lines.push(...Generators.generateI2CSection(profile));
            if (Generators.generateSPISection) lines.push(...Generators.generateSPISection(profile));
            if (Generators.generateExtraComponents) lines.push(...Generators.generateExtraComponents(profile));
            if (Generators.generateAXP2101Section) lines.push(...Generators.generateAXP2101Section(profile));
            if (Generators.generateOutputSection) lines.push(...Generators.generateOutputSection(profile));
            if (Generators.generateBacklightSection) lines.push(...Generators.generateBacklightSection(profile));
            if (Generators.generateRTTTLSection) lines.push(...Generators.generateRTTTLSection(profile));
            if (Generators.generateAudioSection) lines.push(...Generators.generateAudioSection(profile));

            const hasTime = lines.some(l => String(l).split('\n').some(subL => subL.trim() === "time:"));
            if (!hasTime) {
                lines.push("time:", "  - platform: homeassistant", "    id: ha_time");
                seenSensorIds.add("ha_time");
            }
        } else if (!layout.isSelectionSnippet) {
            const hasTime = lines.some(l => String(l).split('\n').some(subL => subL.trim() === "time:"));
            if (!hasTime) {
                lines.push("time:", "  - platform: homeassistant", "    id: ha_time");
                seenSensorIds.add("ha_time");
            }
        }

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
    }

    _buildSensorSections(context: any, lines: string[]): void {
        const { widgets: allWidgets, displayId, profile, isLvgl, pendingTriggers } = context;
        const pages = context.layout.pages || [];

        if (Generators.generateSensorSection) lines.push(...Generators.generateSensorSection(profile, [], displayId, allWidgets));

        const numericSensorLinesOrig: string[] = [];
        registry.onExportNumericSensors({ ...context, lines: numericSensorLinesOrig, mainLines: lines });
        const numericSensorLines = this.processPendingTriggers(numericSensorLinesOrig, pendingTriggers, isLvgl, "on_value");

        if (numericSensorLines.length > 0) {
            if (!lines.some(l => l === "sensor:")) lines.push("sensor:");
            lines.push(...numericSensorLines.flatMap(l => l.split('\n').map(sub => "  " + sub)));
        }

        const numericSensorLinesExtra = collectNumericSensors(pages, context);

        if (numericSensorLinesExtra.length > 0) {
            if (!lines.some(l => l === "sensor:")) lines.push("sensor:");

            const mergedSafetyLines = this.processPendingTriggers(numericSensorLinesExtra, pendingTriggers, isLvgl, "on_value");
            lines.push(...mergedSafetyLines.flatMap(l => l.split('\n').map(sub => "  " + sub)));
        }

        const textSensorLinesExtra = collectTextSensors(pages, context);

        const textSensorLinesOrig: string[] = [];
        registry.onExportTextSensors({ ...context, lines: textSensorLinesOrig });

        if (textSensorLinesExtra.length > 0) {
            textSensorLinesOrig.push(...textSensorLinesExtra);
        }

        const textSensorLines = this.processPendingTriggers(textSensorLinesOrig, pendingTriggers, isLvgl, "on_value");
        if (textSensorLines.length > 0) {
            lines.push("text_sensor:");
            lines.push(...textSensorLines.flatMap(l => l.split('\n').map(sub => "  " + sub)));
        }

        const binarySensorLinesOrig: string[] = [];

        if (!profile.isPackageBased && Generators.generateBinarySensorSection) {
            const legacyBinary = Generators.generateBinarySensorSection(profile, pages.length, displayId, []);
            if (legacyBinary.length > 0 && legacyBinary[0].trim() === "binary_sensor:") {
                binarySensorLinesOrig.push(...legacyBinary.slice(1).map((l: string) => l.startsWith("  ") ? l.slice(2) : l));
            } else {
                binarySensorLinesOrig.push(...legacyBinary);
            }
        }

        const touchWidgets = allWidgets.filter((w: any) => w.type === 'touch_area' || w.type === 'template_nav_bar');
        let touchSensorContent: string[] = [];
        if (touchWidgets.length > 0 && Generators.generateBinarySensorSection) {
            const touchBinary = Generators.generateBinarySensorSection({ features: {} }, pages.length, displayId, touchWidgets);
            if (touchBinary.length > 0) {
                const startIdx = touchBinary[0]?.trim() === "binary_sensor:" ? 1 : 0;
                if (touchBinary.length > startIdx) {
                    if (profile.isPackageBased) {
                        touchSensorContent = touchBinary.slice(startIdx);
                    } else {
                        binarySensorLinesOrig.push(`# Touch Area Binary Sensors`);
                        binarySensorLinesOrig.push(...touchBinary.slice(startIdx).map((l: string) => l.startsWith("  ") ? l.slice(2) : l));
                    }
                }
            }
        }

        this._pendingTouchSensors = touchSensorContent;

        registry.onExportBinarySensors({ ...context, lines: binarySensorLinesOrig });
        const binarySensorLines = this.processPendingTriggers(binarySensorLinesOrig, pendingTriggers, isLvgl, "on_state");
        if (binarySensorLines.length > 0 && !profile.isPackageBased) {
            lines.push("binary_sensor:");
            lines.push(...binarySensorLines.flatMap(l => l.split('\n').map(sub => "  " + sub)));
        }

        const binarySensorLinesExtra = collectBinarySensors(pages, context);

        if (binarySensorLinesExtra.length > 0) {
            if (!lines.some(l => l === "binary_sensor:")) lines.push("binary_sensor:");

            const mergedBinaryExtraLines = this.processPendingTriggers(binarySensorLinesExtra, pendingTriggers, isLvgl, "on_state");
            lines.push(...mergedBinaryExtraLines.flatMap(l => l.split('\n').map(sub => "  " + sub)));
        }

        if (!profile.isPackageBased && Generators.generateButtonSection) {
            const buttonLines = Generators.generateButtonSection(profile, pages.length, displayId);
            if (buttonLines.length > 0) {
                lines.push(...buttonLines);
            }
        }
    }
}
