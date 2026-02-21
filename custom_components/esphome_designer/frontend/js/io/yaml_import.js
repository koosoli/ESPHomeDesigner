import { AppState } from '../core/state.js';
import { Logger } from '../utils/logger.js';
import { DEVICE_PROFILES } from './devices.js';
import yaml from 'js-yaml';

import { parseSettings } from './yaml_parsers/settings_parser.js';
import { parseDisplayBlocks } from './yaml_parsers/display_parser.js';
import { extractLambdaLines } from './yaml_parsers/lambda_extractor.js';
import { isBareOEPLArray, parseOEPLArrayToLayout } from './yaml_parsers/oepl_parser.js';

/**
 * Creates a custom js-yaml schema that supports ESPHome tags like !lambda.
 */
function getESPHomeSchema() {
    // Safety check for test environments where js-yaml might be mocked without Type support
    if (!yaml || !yaml.Type || !yaml.DEFAULT_SCHEMA) {
        return null;
    }

    try {
        const LambdaType = new yaml.Type('!lambda', {
            kind: 'scalar',
            construct: (data) => data
        });
        const SecretType = new yaml.Type('!secret', {
            kind: 'scalar',
            construct: (data) => data
        });
        const IncludeType = new yaml.Type('!include', {
            kind: 'scalar',
            construct: (data) => data
        });
        return yaml.DEFAULT_SCHEMA.extend([LambdaType, SecretType, IncludeType]);
    } catch (e) {
        Logger.warn("[getESPHomeSchema] Could not extend schema, falling back to default.");
        return yaml.DEFAULT_SCHEMA;
    }
}

/**
 * Parses an ESPHome YAML snippet offline to extract the layout.
 */
export function parseSnippetYamlOffline(yamlText) {
    Logger.log("[parseSnippetYamlOffline] Start parsing...");
    const rawLines = yamlText.split(/\r?\n/);

    let doc = {};
    try {
        const parser = (typeof window !== 'undefined' && window.jsyaml) ? window.jsyaml : yaml;
        const schema = getESPHomeSchema();
        doc = parser.load(yamlText, schema ? { schema } : {}) || {};
    } catch (e) {
        Logger.error("[parseSnippetYamlOffline] YAML parse error:", e);
    }

    // --- Specialized Format Detection (OEPL / ODP) ---
    if (isBareOEPLArray(yamlText) && Array.isArray(doc)) {
        Logger.log("[parseSnippetYamlOffline] Detected bare OEPL/ODP array format");
        return parseOEPLArrayToLayout(doc);
    }

    if (doc && doc.service) {
        if (['opendisplay.drawcustom', 'open_epaper_link.drawcustom'].includes(doc.service) && doc.data && Array.isArray(doc.data.payload)) {
            Logger.log("[parseSnippetYamlOffline] Detected full ODP/OEPL service call");
            return parseOEPLArrayToLayout(doc.data.payload);
        }
    }

    // --- Standard ESPHome Format Parsing ---
    const lambdaLines = [];
    if (doc.display) {
        const displays = Array.isArray(doc.display) ? doc.display : [doc.display];
        displays.forEach(d => { if (d && d.lambda) lambdaLines.push(...d.lambda.split("\n")); });
    }

    // Fallback to specialized scanning if lines are missing or block is manual
    if (lambdaLines.length === 0 || yamlText.includes("lvgl:")) {
        const extracted = extractLambdaLines(rawLines, yamlText);
        lambdaLines.push(...extracted);
    }

    const deviceSettings = parseSettings(rawLines, doc);
    const layout = parseDisplayBlocks(lambdaLines, rawLines, deviceSettings, getESPHomeSchema);

    return layout;
}

/**
 * Loads a parsed layout into the application state.
 * Supports modern layout objects and legacy JSON/HA storage formats.
 */
export function loadLayoutIntoState(layout) {
    if (!layout) return;
    Logger.log("[loadLayoutIntoState] Loading layout...");

    // 1. Handle HA Storage / Wrapped formats
    let data = layout;
    if (layout.data && layout.data.devices) {
        const firstKey = Object.keys(layout.data.devices)[0];
        data = layout.data.devices[firstKey];
    }

    // 2. Map Device Metadata (Backward Compatibility)
    if (data.name) AppState.setDeviceName(data.name);
    else if (data.deviceName) AppState.setDeviceName(data.deviceName);

    if (data.device_model) AppState.setDeviceModel(data.device_model);
    else if (data.deviceModel) AppState.setDeviceModel(data.deviceModel);

    if (data.device_id) AppState.setCurrentLayoutId(data.device_id);
    else if (data.currentLayoutId) AppState.setCurrentLayoutId(data.currentLayoutId);

    // 3. Map Settings / Project State
    if (data.settings && AppState.updateSettings) {
        AppState.updateSettings(data.settings);
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

    Logger.log("[loadLayoutIntoState] Finished loading state.");
}

export { isBareOEPLArray, parseOEPLArrayToLayout }; 
