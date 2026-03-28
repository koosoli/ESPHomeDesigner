import { AppState } from '../core/state';
import { Logger } from '../utils/logger.js';
import { DEVICE_PROFILES } from './devices.js';
import * as yaml from 'js-yaml';

import { parseSettings } from './yaml_parsers/settings_parser.js';
import { parseDisplayBlocks } from './yaml_parsers/display_parser.js';
import { extractLambdaLines } from './yaml_parsers/lambda_extractor.js';
import { isBareOEPLArray, parseOEPLArrayToLayout } from './yaml_parsers/oepl_parser.js';

export interface ParsedWidget {
    id?: string;
    type?: string;
    x?: number;
    y?: number;
    width?: number;
    height?: number;
    locked?: boolean;
    [key: string]: any;
}

export interface ParsedPage {
    id?: string;
    name?: string;
    widgets?: ParsedWidget[];
    [key: string]: any;
}

export interface ParsedLayout {
    name?: string;
    deviceName?: string;
    device_model?: string;
    deviceModel?: string;
    device_id?: string;
    currentLayoutId?: string;
    settings?: Record<string, any>;
    customHardware?: Record<string, any>;
    pages?: ParsedPage[];
    data?: {
        devices?: Record<string, any>;
    };
    [key: string]: any;
}

/**
 * Creates a custom js-yaml schema that supports ESPHome tags like !lambda.
 * @returns {Object|null} The extended YAML schema, or null if unavailable
 */
function getESPHomeSchema(): yaml.Schema | null {
    if (!yaml || !yaml.Type || !yaml.DEFAULT_SCHEMA) {
        return null;
    }

    try {
        const LambdaType = new yaml.Type('!lambda', {
            kind: 'scalar',
            construct: (data: string) => data
        });
        const SecretType = new yaml.Type('!secret', {
            kind: 'scalar',
            construct: (data: string) => data
        });
        const IncludeType = new yaml.Type('!include', {
            kind: 'scalar',
            construct: (data: string) => data
        });
        return yaml.DEFAULT_SCHEMA.extend([LambdaType, SecretType, IncludeType]);
    } catch (e) {
        Logger.warn("[getESPHomeSchema] Could not extend schema, falling back to default.");
        return yaml.DEFAULT_SCHEMA;
    }
}

/**
 * Extract an ODP/OEPL payload block directly from raw YAML when top-level parsing fails.
 * This handles templated strings that may not survive a full safe_load pass.
 * @param {string} yamlText
 * @returns {any[] | null}
 */
function extractServicePayloadArray(yamlText: string): any[] | null {
    const serviceMatch = yamlText.match(/^\s*service:\s*([^\n]+)\s*$/m);
    if (!serviceMatch) {
        return null;
    }

    const serviceName = serviceMatch[1].trim();
    if (!['opendisplay.drawcustom', 'open_epaper_link.drawcustom'].includes(serviceName)) {
        return null;
    }

    const lines = yamlText.split(/\r?\n/);
    const payloadStart = lines.findIndex((line) => /^\s*payload:\s*\|-/.test(line));
    if (payloadStart === -1) {
        return null;
    }

    const payloadLines: string[] = [];
    for (let index = payloadStart + 1; index < lines.length; index += 1) {
        const line = lines[index];
        if (line.trim() === '') {
            payloadLines.push('');
            continue;
        }

        if (!line.startsWith('    ')) {
            break;
        }

        payloadLines.push(line.slice(4));
    }

    if (payloadLines.length === 0) {
        return null;
    }

    try {
        const schema = getESPHomeSchema();
        const parsed = yaml.load(payloadLines.join('\n'), schema ? { schema } : {});
        return Array.isArray(parsed) ? parsed : null;
    } catch (e) {
        Logger.warn('[extractServicePayloadArray] Failed to parse payload block', e);
        return null;
    }
}

/**
 * Parses an ESPHome YAML snippet offline to extract the layout.
 * 
 * @param {string} yamlText - The raw YAML/C++ payload containing the display configuration
 * @returns {ParsedLayout | null} The fully parsed project configuration and widget tree
 */
export function parseSnippetYamlOffline(yamlText: string): ParsedLayout | null {
    Logger.log("[parseSnippetYamlOffline] Start parsing...");
    const rawLines = yamlText.split(/\r?\n/);

    let doc: any = {};
    let payloadFallback: any[] | null = null;
    try {
        const schema = getESPHomeSchema();
        doc = yaml.load(yamlText, schema ? { schema } : {}) || {};
    } catch (e) {
        Logger.error("[parseSnippetYamlOffline] YAML parse error:", e);
        payloadFallback = extractServicePayloadArray(yamlText);
    }

    // --- Specialized Format Detection (OEPL / ODP) ---
    if (payloadFallback && Array.isArray(payloadFallback)) {
        Logger.log("[parseSnippetYamlOffline] Recovered service payload from raw YAML block");
        return parseOEPLArrayToLayout(payloadFallback);
    }

    if (isBareOEPLArray(yamlText) && Array.isArray(doc)) {
        Logger.log("[parseSnippetYamlOffline] Detected bare OEPL/ODP array format");
        return parseOEPLArrayToLayout(doc);
    }

    if (doc && doc.service) {
        if (['opendisplay.drawcustom', 'open_epaper_link.drawcustom'].includes(doc.service) && doc.data && doc.data.payload) {
            let payload = doc.data.payload;

            // The adapter outputs `payload: |-` (block scalar), so js-yaml parses it as a string.
            // Re-parse the string into an array of objects.
            if (typeof payload === 'string') {
                try {
                    payload = yaml.load(payload);
                } catch (e) {
                    Logger.error("[parseSnippetYamlOffline] Failed to re-parse payload string:", e);
                }
            }

            if (Array.isArray(payload)) {
                Logger.log("[parseSnippetYamlOffline] Detected full ODP/OEPL service call");
                return parseOEPLArrayToLayout(payload);
            }
        }
    }

    // --- Standard ESPHome Format Parsing ---
    const lambdaLines: string[] = [];
    if (doc.display) {
        const displays = Array.isArray(doc.display) ? doc.display : [doc.display];
        displays.forEach((d: any) => { if (d && d.lambda) lambdaLines.push(...d.lambda.split("\n")); });
    }

    // Fallback to specialized scanning if lines are missing or block is manual
    if (lambdaLines.length === 0 || yamlText.includes("lvgl:")) {
        const extracted = extractLambdaLines(rawLines, yamlText);
        lambdaLines.push(...extracted);
    }

    const deviceSettings = parseSettings(rawLines, doc);
    const layout = parseDisplayBlocks(lambdaLines, rawLines, deviceSettings, getESPHomeSchema, yaml);

    return layout;
}

/**
 * Loads a parsed layout into the application state.
 * Supports modern layout objects and legacy JSON/HA storage formats.
 * 
 * @param {ParsedLayout} layout - The project payload object to load into state
 */
export function loadLayoutIntoState(layout: ParsedLayout | null | undefined): void {
    if (!layout) return;
    Logger.log("[loadLayoutIntoState] Loading layout...");

    // 1. Handle HA Storage / Wrapped formats
    let data = layout;
    if (layout.data && layout.data.devices) {
        const firstKey = Object.keys(layout.data.devices)[0];
        data = layout.data.devices[firstKey];
    }

    if (!data) return;

    // 2. Map Device Metadata (Backward Compatibility)
    if (data.name) AppState.setDeviceName(data.name);
    else if (data.deviceName) AppState.setDeviceName(data.deviceName);

    if (data.device_model) AppState.setDeviceModel(data.device_model);
    else if (data.deviceModel) AppState.setDeviceModel(data.deviceModel);

    if (data.device_id) AppState.setCurrentLayoutId(data.device_id);
    else if (data.currentLayoutId) AppState.setCurrentLayoutId(data.currentLayoutId);

    // 3. Map Settings / Project State
    const topLevelSettings: Record<string, any> = {};
    const directSettingKeys = [
        'orientation', 'renderingMode', 'darkMode', 'invertedColors',
        'refreshInterval', 'manualRefreshOnly', 'autoCycleEnabled', 'autoCycleIntervalS',
        'lcdEcoStrategy', 'dimTimeout', 'sleepEnabled', 'sleepStartHour', 'sleepEndHour',
        'deepSleepEnabled', 'deepSleepInterval', 'deepSleepStayAwakeSwitch', 'deepSleepStayAwakeEntityId', 'deepSleepFirmwareGuard',
        'dailyRefreshEnabled', 'dailyRefreshTime',
        'noRefreshStartHour', 'noRefreshEndHour', 'oeplEntityId', 'oeplDither',
        'opendisplayEntityId', 'opendisplayDither', 'opendisplayTtl', 'glyphsets',
        'extendedLatinGlyphs', 'editor_light_mode', 'snapEnabled', 'showGrid',
        'showDebugGrid', 'showRulers', 'gridOpacity'
    ];

    directSettingKeys.forEach((key) => {
        if (data[key] !== undefined) topLevelSettings[key] = data[key];
    });

    if (data.rendering_mode !== undefined && topLevelSettings.renderingMode === undefined) {
        topLevelSettings.renderingMode = data.rendering_mode;
    }

    if (data.dark_mode !== undefined && topLevelSettings.darkMode === undefined) {
        topLevelSettings.darkMode = data.dark_mode;
    }

    const mergedSettings = {
        ...topLevelSettings,
        ...(data.settings || {})
    };

    if (Object.keys(mergedSettings).length > 0 && AppState.updateSettings) {
        AppState.updateSettings(mergedSettings);
    }

    if (data.customHardware && AppState.setCustomHardware) {
        AppState.setCustomHardware(data.customHardware);
    }

    // 4. Load Pages
    if (data.pages && AppState.setPages) {
        const processedPages = data.pages.map(p => ({
            ...p,
            widgets: (p.widgets || []).map(w => ({ ...w, locked: !!w.locked }))
        }));
        AppState.setPages(processedPages);
    }

    // 5. Restore the active page after pages exist so the canvas/sidebar
    // switch to the loaded layout deterministically.
    const rawCurrentPageIndex = data.currentPageIndex ?? data.current_page ?? 0;
    const parsedCurrentPageIndex = Number.isFinite(Number(rawCurrentPageIndex))
        ? Number(rawCurrentPageIndex)
        : 0;
    if (AppState.setCurrentPageIndex) {
        AppState.setCurrentPageIndex(parsedCurrentPageIndex, { forceFocus: true });
    }

    Logger.log("[loadLayoutIntoState] Finished loading state.");
}

export { isBareOEPLArray, parseOEPLArrayToLayout };
