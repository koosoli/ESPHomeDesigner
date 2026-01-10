import { Logger } from './logger.js';

/**
 * Detects the Home Assistant backend URL.
 * @returns {string|null} The API base URL or null.
 */
export function detectHaBackendBaseUrl() {
    // Check manual configuration first (from localStorage)
    let manualUrl = getHaManualUrl();
    if (manualUrl) {
        manualUrl = manualUrl.trim();
        if (manualUrl.endsWith('/')) {
            manualUrl = manualUrl.slice(0, -1);
        }
        // Ensure suffix is present even if user entered only the base URL previously
        if (manualUrl && !manualUrl.includes('/api/')) {
            manualUrl += '/api/esphome_designer';
        }
        return manualUrl;
    }

    try {
        const loc = window.location;
        if (loc.protocol === "file:") {
            return null;
        }
        if (
            loc.hostname === "homeassistant" ||
            loc.hostname === "hassio" ||
            loc.pathname.includes("/api/") ||
            loc.pathname.includes("/local/") ||
            loc.pathname.includes("/hacsfiles/") ||
            loc.pathname.includes("/esphome-designer")
        ) {
            return `${loc.origin}/api/esphome_designer`;
        }
        return null;
    } catch (e) {
        return null;
    }
}

/**
 * Gets the manual HA URL from localStorage.
 * @returns {string|null}
 */
export function getHaManualUrl() {
    try {
        return localStorage.getItem('ha_manual_url');
    } catch (e) {
        return null;
    }
}

/**
 * Sets the manual HA URL in localStorage.
 * @param {string|null} url 
 */
export function setHaManualUrl(url) {
    try {
        if (url) {
            let sanitizedUrl = url.trim();
            // Remove trailing slash if present
            if (sanitizedUrl.endsWith('/')) {
                sanitizedUrl = sanitizedUrl.slice(0, -1);
            }

            // If the URL is just the base (e.g. http://ha.local:8123), 
            // append the custom component API path automatically.
            if (!sanitizedUrl.includes('/api/')) {
                sanitizedUrl += '/api/esphome_designer';
            }

            localStorage.setItem('ha_manual_url', sanitizedUrl);
        } else {
            localStorage.removeItem('ha_manual_url');
        }
    } catch (e) {
        Logger.error("Failed to save HA URL:", e);
    }
}

/**
 * Gets the HA Long-Lived Access Token from localStorage.
 * @returns {string|null}
 */
export function getHaToken() {
    try {
        return localStorage.getItem('ha_llat_token');
    } catch (e) {
        return null;
    }
}

/**
 * Sets the HA Long-Lived Access Token in localStorage.
 * @param {string|null} token 
 */
export function setHaToken(token) {
    try {
        if (token) {
            localStorage.setItem('ha_llat_token', token);
        } else {
            localStorage.removeItem('ha_llat_token');
        }
    } catch (e) {
        Logger.error("Failed to save HA Token:", e);
    }
}

export let HA_API_BASE = detectHaBackendBaseUrl();

/**
 * Re-detects the HA backend URL (e.g. after settings change).
 */
export function refreshHaBaseUrl() {
    HA_API_BASE = detectHaBackendBaseUrl();
}

/**
 * Checks if the HA backend is available.
 * @returns {boolean}
 */
export function hasHaBackend() {
    return !!HA_API_BASE;
}

// Global exposure for transition
window.detectHaBackendBaseUrl = detectHaBackendBaseUrl;
window.getHaManualUrl = getHaManualUrl;
window.setHaManualUrl = setHaManualUrl;
window.getHaToken = getHaToken;
window.setHaToken = setHaToken;
window.HA_API_BASE = HA_API_BASE;
window.refreshHaBaseUrl = refreshHaBaseUrl;
window.hasHaBackend = hasHaBackend;
