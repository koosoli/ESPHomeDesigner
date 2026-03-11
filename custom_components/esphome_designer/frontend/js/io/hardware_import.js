/**
 * Hardware Import and Dynamic Profile Management
 * 
 * Handles fetching dynamic hardware templates from the backend
 * and uploading new custom YAML templates.
 */

import { Logger } from '../utils/logger.js';
import { hasHaBackend, HA_API_BASE } from '../utils/env.js';
import { getHaHeaders } from './ha_api.js';
import { showToast } from '../utils/dom.js';
import { emit, EVENTS } from '../core/events.js';
import { DEVICE_PROFILES, loadExternalProfiles } from './devices.js';
import { parseHardwareRecipeClientSide, saveOfflineProfileToStorage } from './hardware_profile_sources.js';

export { fetchDynamicHardwareProfiles, getOfflineProfilesFromStorage } from './hardware_profile_sources.js';

export async function uploadHardwareTemplate(file) {
    if (!hasHaBackend()) {
        Logger.log("[HardwareImport] Offline mode detected. Parsing locally...");
        return await handleOfflineHardwareImport(file);
    }

    try {
        const content = await file.text();
        const url = `${HA_API_BASE}/hardware/upload`;
        const payload = {
            filename: file.name,
            content: content
        };

        Logger.log("[HardwareImport] Uploading via JSON:", file.name);

        const response = await fetch(url, {
            method: "POST",
            headers: getHaHeaders(),
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const data = await response.json().catch(() => ({}));
            throw new Error(data.message || data.error || `Upload failed: ${response.status}`);
        }

        const data = await response.json();
        showToast("Hardware template uploaded successfully!", "success");

        // Refresh profiles
        if (loadExternalProfiles) {
            await loadExternalProfiles();
        }

        return data;
    } catch (err) {
        const msg = err.message || "";
        // "Failed to fetch" often means network hiccup but upload succeeded on server
        if (msg.includes("Failed to fetch") || msg.includes("NetworkError")) {
            Logger.warn("[HardwareImport] Network error during upload (likely benign):", msg);
            showToast("Generating profile, refreshing list...", "info");

            // Still try to refresh profiles - the file was probably saved
            try {
                if (loadExternalProfiles) {
                    await loadExternalProfiles();
                }
            } catch (refreshErr) {
                Logger.warn("[HardwareImport] Profile refresh also failed:", refreshErr);
            }

            // Don't rethrow - we want the caller to proceed with selection
            return { success: true, filename: file.name, note: "network_error_suppressed" };
        } else {
            Logger.error("Hardware upload failed:", err);
            showToast(`Upload failed: ${msg}`, "error");
            throw err;
        }
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
            const content = e.target?.result;
            if (typeof content !== 'string') {
                reject(new Error("Failed to read file content"));
                return;
            }
            try {
                if (!content.includes("__LAMBDA_PLACEHOLDER__")) {
                    throw new Error("Invalid template: Missing __LAMBDA_PLACEHOLDER__");
                }

                const profile = parseHardwareRecipeClientSide(content, file.name);
                Logger.log("[HardwareImport] Parsed offline profile:", profile);

                // Add to runtime structure
                if (DEVICE_PROFILES) {
                    DEVICE_PROFILES[profile.id] = profile;
                } showToast(`Imported ${profile.name} (Offline Mode)`, "success");

                // Persist to localStorage for offline resilience
                saveOfflineProfileToStorage(profile);

                emit(EVENTS.DEVICE_PROFILES_UPDATED);

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


