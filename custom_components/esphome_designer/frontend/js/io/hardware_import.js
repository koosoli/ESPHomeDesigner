/**
 * Hardware Import and Dynamic Profile Management
 * 
 * Handles fetching dynamic hardware templates from the backend
 * and uploading new YAML templates.
 */

import { Logger } from '../utils/logger.js';
import { hasHaBackend, HA_API_BASE } from '../utils/env.js';
import { getHaHeaders } from './ha_api.js';
import { showToast } from '../utils/dom.js';

const FALLBACK_HARDWARE_FILES = [
    "elecrow-esp32-7inch.yaml",
    "guition-esp32-jc4827w543.yaml",
    "guition-esp32-jc8048w535.yaml",
    "guition-esp32-jc8048w550.yaml",
    "guition-esp32-s3-4848s040.yaml",
    "lilygo-tdisplays3.yaml",
    "sunton-esp32-2432s028.yaml",
    "sunton-esp32-2432s028R.yaml",
    "sunton-esp32-4827s032R.yaml",
    "sunton-esp32-8048s050.yaml",
    "sunton-esp32-8048s070.yaml",
    "waveshare-esp32-s3-touch-lcd-4.3.yaml",
    "waveshare-esp32-s3-touch-lcd-7.yaml",
    "waveshare-esp32-universal-epaper-7.5v2.yaml"
];

export async function fetchDynamicHardwareProfiles() {
    // If we have an HA backend, try that first
    if (hasHaBackend()) {
        try {
            const url = `${HA_API_BASE}/hardware/templates`;
            Logger.log("[HardwareDiscovery] Fetching from:", url);
            const response = await fetch(url, {
                headers: getHaHeaders(),
                cache: "no-store"
            });
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const data = await response.json();
            return data.templates || [];
        } catch (e) {
            Logger.error("Failed to fetch dynamic hardware templates from HA:", e);
            // Fall through to local check? Or just return?
        }
    }

    // Fallback: Try to load known local files (for standalone/local mode)
    Logger.log("[HardwareDiscovery] Attempting to load fallback local profiles...");
    const localTemplates = [];

    for (const filename of FALLBACK_HARDWARE_FILES) {
        try {
            const response = await fetch(`hardware/${filename}`);
            if (response.ok) {
                const text = await response.text();
                // We reuse the client-side parser used for offline import
                // But we need to make sure the ID matches what we expect
                const profile = parseHardwareRecipeClientSide(text, filename);
                // Adjust ID to be more stable than "dynamic_offline_..."
                profile.id = filename.replace(/\.yaml$/i, '').replace(/[^a-z0-9]/gi, '_').toLowerCase();
                profile.isPackageBased = true;
                profile.hardwarePackage = `hardware/${filename}`;
                localTemplates.push(profile);
            }
        } catch (err) {
            // Ignore missing files
        }
    }

    Logger.log(`[HardwareDiscovery] Loaded ${localTemplates.length} local fallback profiles.`);
    return localTemplates;
}

export async function uploadHardwareTemplate(file) {
    if (!hasHaBackend()) {
        Logger.log("[HardwareImport] Offline mode detected. Parsing locally...");
        return await handleOfflineHardwareImport(file);
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
        const url = `${HA_API_BASE}/hardware/upload`;

        // FIX: FormData requires the browser to set the Content-Type with the boundary.
        // getHaHeaders() adds "Content-Type": "application/json", which breaks this.
        const headers = getHaHeaders();
        delete headers["Content-Type"];

        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: formData
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || data.error || "Upload failed");
        }

        showToast("Hardware template uploaded successfully!", "success");

        // Refresh profiles
        const { loadExternalProfiles } = await import('./devices.js');
        if (loadExternalProfiles) {
            await loadExternalProfiles();
        }

        return data;
    } catch (e) {
        Logger.error("Hardware upload failed:", e);
        showToast(`Upload failed: ${e.message}`, "error");
        throw e;
    }
}

/**
 * Handles hardware recipe import in offline mode by parsing in the browser.
 * These profiles are lost on refresh in offline mode.
 */
async function handleOfflineHardwareImport(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = async (e) => {
            const content = e.target.result;
            try {
                if (!content.includes("__LAMBDA_PLACEHOLDER__")) {
                    throw new Error("Invalid template: Missing __LAMBDA_PLACEHOLDER__");
                }

                const profile = parseHardwareRecipeClientSide(content, file.name);
                Logger.log("[HardwareImport] Parsed offline profile:", profile);

                // Add to runtime structure
                const { DEVICE_PROFILES } = await import('./devices.js');
                if (DEVICE_PROFILES) {
                    DEVICE_PROFILES[profile.id] = profile;
                } showToast(`Imported ${profile.name} (Offline Mode)`, "success");

                // Refresh UI
                if (window.app && window.app.deviceSettings) {
                    window.app.deviceSettings.populateDeviceSelect();
                }

                // Persist to localStorage for offline resilience
                saveOfflineProfileToStorage(profile);

                resolve(profile);
            } catch (err) {
                showToast(err.message, "error");
                reject(err);
            }
        };
        reader.onerror = () => reject(new Error("File read failed"));
        reader.readAsText(file);
    });
}

/**
 * Extracts basic metadata from a YAML recipe string.
 */
function parseHardwareRecipeClientSide(yaml, filename) {
    const id = "dynamic_offline_" + filename.replace(/[^a-z0-9]/gi, '_').toLowerCase();

    // Default values
    let name = filename.replace(/\.yaml$/i, '');
    let width = 800;
    let height = 480;
    let shape = "rect";

    // Simple regex extraction
    const nameMatch = yaml.match(/#\s*Name:\s*(.*)/i);
    if (nameMatch) name = nameMatch[1].trim();

    const resMatch = yaml.match(/#\s*Resolution:\s*(\d+)x(\d+)/i);
    if (resMatch) {
        width = parseInt(resMatch[1]);
        height = parseInt(resMatch[2]);
    }

    const shapeMatch = yaml.match(/#\s*Shape:\s*(rect|round)/i);
    if (shapeMatch) shape = shapeMatch[1].toLowerCase();

    // Detect inverted colors from comment (# Inverted: true)
    const invertedMatch = yaml.match(/#\s*Inverted:\s*(true|yes|1)/i);
    const isInverted = !!invertedMatch;

    return {
        id: id,
        name: name + " (Local)",
        resolution: { width, height },
        shape: shape,
        isPackageBased: true,
        isOfflineImport: true,
        content: yaml, // Store content for later use if needed
        features: {
            psram: yaml.includes("psram:"),
            lcd: !yaml.includes("waveshare_epaper") && !yaml.includes("epaper_spi"),
            lvgl: yaml.includes("lvgl:") || (!yaml.includes("waveshare_epaper") && !yaml.includes("epaper_spi")), // Most LCDs support LVGL

            epaper: yaml.includes("waveshare_epaper") || yaml.includes("epaper_spi"),
            touch: yaml.includes("touchscreen:"),
            inverted_colors: isInverted
        }
    };
}

/**
 * Saves a hardware profile to localStorage.
 */
function saveOfflineProfileToStorage(profile) {
    try {
        const saved = JSON.parse(localStorage.getItem('esphome-offline-profiles') || '{}');
        saved[profile.id] = profile;
        localStorage.setItem('esphome-offline-profiles', JSON.stringify(saved));
        Logger.log("[HardwarePersistence] Saved offline profile to localStorage:", profile.id);
    } catch (e) {
        Logger.error("Failed to save profile to localStorage:", e);
    }
}

/**
 * Returns all saved offline profiles from localStorage.
 */
export function getOfflineProfilesFromStorage() {
    try {
        return JSON.parse(localStorage.getItem('esphome-offline-profiles') || '{}');
    } catch (e) {
        Logger.warn("Could not load offline profiles from storage:", e);
        return {};
    }
}

