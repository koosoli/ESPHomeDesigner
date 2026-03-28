/**
 * Pure helpers for discovering, parsing, and persisting hardware profiles.
 * Keeping these separate avoids a devices.js <-> hardware_import.js cycle.
 */

import { Logger } from '../utils/logger.js';
import { hasHaBackend, HA_API_BASE } from '../utils/env.js';
import { getHaHeaders, haFetch } from './ha_api.js';

export const hardwareProfileRuntime = {
    /** @returns {any} */
    getGlob() {
        return /** @type {any} */ (import.meta).glob;
    },
    /** @returns {Storage | null} */
    getStorage() {
        try {
            return globalThis.localStorage ?? null;
        } catch {
            return null;
        }
    }
};

/**
 * @typedef {{
 *   id: string;
 *   name: string;
 *   resolution: { width: number; height: number };
 *   shape: string;
 *   chip: string;
 *   board?: string;
 *   displayPlatform?: string;
 *   displayModel?: string;
 *   colorPalette?: string;
 *   colorOrder?: string;
 *   updateInterval?: string;
 *   invertColors?: boolean;
 *   isPackageBased?: boolean;
 *   hardwarePackage?: string;
 *   isOfflineImport?: boolean;
 *   content?: string;
 *   features: Record<string, any>;
 * }} HardwareProfileLike
 */

/** @returns {Promise<HardwareProfileLike[]>} */
export async function fetchDynamicHardwareProfiles() {
    // If we have an HA backend, try that first
    if (hasHaBackend()) {
        try {
            const url = `${HA_API_BASE}/hardware/templates`;
            Logger.log("[HardwareDiscovery] Fetching from:", url);
            const response = await haFetch(url, {
                headers: getHaHeaders(),
                cache: 'no-store'
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            return data.templates || [];
        } catch (e) {
            Logger.error('Failed to fetch dynamic hardware templates from HA:', e);
            // Fall through to bundled fallback.
        }
    }

    Logger.log('[HardwareDiscovery] Attempting to load bundled profiles via glob...');
    const bundledTemplates = /** @type {HardwareProfileLike[]} */ ([]);

    // In Home Assistant runtime this API may not exist, so feature-detect first.
    const globFn = hardwareProfileRuntime.getGlob();
    if (typeof globFn !== 'function') {
        Logger.log('[HardwareDiscovery] Bundled profile glob is unavailable in this runtime; relying on backend/localStorage profiles only.');
        return [];
    }

    const hardwareFiles = /** @type {Record<string, string>} */ (
        globFn('../../hardware/*.yaml', { query: '?raw', import: 'default', eager: true })
    );

    for (const path in hardwareFiles) {
        try {
            const content = hardwareFiles[path];
            const filename = path.split('/').pop() || 'hardware.yaml';
            const profile = parseHardwareRecipeClientSide(content, filename);

            profile.id = filename.replace(/\.yaml$/i, '').replace(/[^a-z0-9]/gi, '_').toLowerCase();
            profile.isPackageBased = true;
            profile.hardwarePackage = `hardware/${filename}`;

            bundledTemplates.push(profile);
        } catch (err) {
            Logger.warn(`[HardwareDiscovery] Failed to parse bundled file ${path}:`, err);
        }
    }

    Logger.log(`[HardwareDiscovery] Loaded ${bundledTemplates.length} bundled fallback profiles.`);
    return bundledTemplates;
}

/**
 * @param {string} yaml
 * @param {string} filename
 * @returns {HardwareProfileLike}
 */
export function parseHardwareRecipeClientSide(yaml, filename) {
    const id = 'dynamic_offline_' + filename.replace(/[^a-z0-9]/gi, '_').toLowerCase();

    let name = filename.replace(/\.yaml$/i, '');
    let width = 800;
    let height = 480;
    let shape = 'rect';

    const nameMatch = yaml.match(/#\s*Name:\s*(.*)/i);
    if (nameMatch) name = nameMatch[1].trim();

    const resMatch = yaml.match(/#\s*Resolution:\s*(\d+)x(\d+)/i);
    if (resMatch) {
        width = parseInt(resMatch[1]);
        height = parseInt(resMatch[2]);
    }

    const shapeMatch = yaml.match(/#\s*Shape:\s*(rect|round)/i);
    if (shapeMatch) shape = shapeMatch[1].toLowerCase();

    const invertedMatch = yaml.match(/#\s*Inverted:\s*(true|yes|1)/i);
    const isInverted = !!invertedMatch;

    const platformMatch = yaml.match(/^\s*-\s*platform:\s*([a-z0-9_]+)/m) || yaml.match(/^\s*platform:\s*([a-z0-9_]+)/m);
    const displayPlatform = platformMatch ? platformMatch[1].trim() : undefined;

    const modelMatch = yaml.match(/^\s*model:\s*"?([^"\n]+)"?/m);
    const displayModel = modelMatch ? modelMatch[1].trim() : undefined;

    let chip = 'esp32-s3';
    let board = undefined;

    const esp8266Match = yaml.match(/^\s*esp8266:/m);
    if (esp8266Match) {
        chip = 'esp8266';
    } else {
        const esp32Match = yaml.match(/^\s*esp32:/m);
        if (esp32Match) {
            if (yaml.toLowerCase().includes('esp32-s3')) chip = 'esp32-s3';
            else if (yaml.toLowerCase().includes('esp32-c3')) chip = 'esp32-c3';
            else if (yaml.toLowerCase().includes('esp32-c6')) chip = 'esp32-c6';
            else chip = 'esp32';
        }
    }

    const boardMatch = yaml.match(/^\s*board:\s*([^\n]+)/m);
    if (boardMatch) {
        board = boardMatch[1].trim();
        if (!esp8266Match) {
            if (board.toLowerCase().includes('s3')) chip = 'esp32-s3';
            else if (board.toLowerCase().includes('c3')) chip = 'esp32-c3';
            else if (board.toLowerCase().includes('c6')) chip = 'esp32-c6';
        }
    }

    const chipCommentMatch = yaml.match(/#\s*Chip:\s*(.*)/i);
    if (chipCommentMatch) chip = chipCommentMatch[1].trim();

    const boardCommentMatch = yaml.match(/#\s*Board:\s*(.*)/i);
    if (boardCommentMatch) board = boardCommentMatch[1].trim();

    const colorPaletteMatch = yaml.match(/^\s*color_palette:\s*(\S+)/m);
    const colorPalette = colorPaletteMatch ? colorPaletteMatch[1].trim() : undefined;

    const colorOrderMatch = yaml.match(/^\s*color_order:\s*(\S+)/m);
    const colorOrder = colorOrderMatch ? colorOrderMatch[1].trim() : undefined;

    const updateIntervalMatch = yaml.match(/^\s*update_interval:\s*(\S+)/m);
    const updateInterval = updateIntervalMatch ? updateIntervalMatch[1].trim() : undefined;

    const invertColorsMatch = yaml.match(/^\s*invert_colors:\s*(true|false)/mi);
    const invertColors = invertColorsMatch ? invertColorsMatch[1].toLowerCase() === 'true' : undefined;

    return {
        id,
        name,
        resolution: { width, height },
        shape,
        chip,
        board,
        displayPlatform,
        displayModel,
        colorPalette,
        colorOrder,
        updateInterval,
        invertColors,
        isPackageBased: true,
        isOfflineImport: true,
        content: yaml,
        features: {
            psram: yaml.includes('psram:'),
            lcd: !yaml.includes('waveshare_epaper') && !yaml.includes('epaper_spi'),
            lvgl: yaml.includes('lvgl:') || (!yaml.includes('waveshare_epaper') && !yaml.includes('epaper_spi')),
            epaper: yaml.includes('waveshare_epaper') || yaml.includes('epaper_spi'),
            touch: yaml.includes('touchscreen:'),
            inverted_colors: isInverted
        }
    };
}

/**
 * @param {HardwareProfileLike} profile
 * @returns {void}
 */
export function saveOfflineProfileToStorage(profile) {
    const storage = hardwareProfileRuntime.getStorage();
    if (!storage) {
        Logger.warn('No localStorage available for offline profiles.');
        return;
    }

    try {
        const saved = JSON.parse(storage.getItem('esphome-offline-profiles') || '{}');
        saved[profile.id] = profile;
        storage.setItem('esphome-offline-profiles', JSON.stringify(saved));
        Logger.log('[HardwarePersistence] Saved offline profile to localStorage:', profile.id);
    } catch (e) {
        Logger.error('Failed to save profile to localStorage:', e);
    }
}

/** @returns {Record<string, HardwareProfileLike>} */
export function getOfflineProfilesFromStorage() {
    const storage = hardwareProfileRuntime.getStorage();
    if (!storage) return {};

    try {
        return JSON.parse(storage.getItem('esphome-offline-profiles') || '{}');
    } catch (e) {
        Logger.warn('Could not load offline profiles from storage:', e);
        return {};
    }
}
