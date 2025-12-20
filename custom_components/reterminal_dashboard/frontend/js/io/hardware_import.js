/**
 * Hardware Import and Dynamic Profile Management
 * 
 * Handles fetching dynamic hardware templates from the backend
 * and uploading new YAML templates.
 */

async function fetchDynamicHardwareProfiles() {
    if (!hasHaBackend()) return [];

    try {
        const url = `${HA_API_BASE}/hardware/templates`;
        console.log("[HardwareDiscovery] Fetching from:", url);
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        return data.templates || [];
    } catch (e) {
        console.error("Failed to fetch dynamic hardware templates:", e);
        return [];
    }
}

async function uploadHardwareTemplate(file) {
    if (!hasHaBackend()) {
        console.log("[HardwareImport] Offline mode detected. Parsing locally...");
        return await handleOfflineHardwareImport(file);
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
        const url = `${HA_API_BASE}/hardware/upload`;
        const response = await fetch(url, {
            method: "POST",
            body: formData
        });

        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || data.error || "Upload failed");
        }

        showToast("Hardware template uploaded successfully!", "success");

        // Refresh profiles
        if (window.loadExternalProfiles) {
            await window.loadExternalProfiles();
        }

        return data;
    } catch (e) {
        console.error("Hardware upload failed:", e);
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
                console.log("[HardwareImport] Parsed offline profile:", profile);

                // Add to global profiles
                if (!window.DEVICE_PROFILES) window.DEVICE_PROFILES = {};
                window.DEVICE_PROFILES[profile.id] = profile;

                showToast(`Imported ${profile.name} (Offline Mode)`, "success");

                // Refresh UI
                if (window.app && window.app.deviceSettings) {
                    window.app.deviceSettings.populateDeviceSelect();
                }

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
            epaper: yaml.includes("waveshare_epaper") || yaml.includes("epaper_spi")
        }
    };
}

window.fetchDynamicHardwareProfiles = fetchDynamicHardwareProfiles;
window.uploadHardwareTemplate = uploadHardwareTemplate;
