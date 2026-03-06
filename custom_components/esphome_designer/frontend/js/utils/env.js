import { Logger } from './logger.js';

function normalizeHaManualUrl(url) {
    if (!url) return null;

    let sanitizedUrl = url.trim();
    if (!sanitizedUrl) return null;

    try {
        const parsed = new URL(sanitizedUrl);
        if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
            return null;
        }

        sanitizedUrl = `${parsed.origin}${parsed.pathname}`;
        if (parsed.search) sanitizedUrl += parsed.search;
        if (sanitizedUrl.endsWith('/')) {
            sanitizedUrl = sanitizedUrl.slice(0, -1);
        }

        if (sanitizedUrl.includes('reterminal_dashboard')) {
            sanitizedUrl = sanitizedUrl.replace('reterminal_dashboard', 'esphome_designer');
        }

        if (!sanitizedUrl.includes('/api/')) {
            sanitizedUrl += '/api/esphome_designer';
        }

        return sanitizedUrl;
    } catch {
        return null;
    }
}

/**
 * Detects the Home Assistant backend URL.
 * @returns {string|null} The API base URL or null.
 */
export function detectHaBackendBaseUrl() {
    // Check manual configuration first (from localStorage)
    let manualUrl = getHaManualUrl();
    if (manualUrl) {
        const normalizedManualUrl = normalizeHaManualUrl(manualUrl);
        if (!normalizedManualUrl) {
            Logger.warn('[Env] Ignoring invalid manually configured HA URL');
            return null;
        }
        if (normalizedManualUrl !== manualUrl.trim()) {
            Logger.log('[Env] Normalizing stored manual HA URL');
            setHaManualUrl(normalizedManualUrl);
        }
        return normalizedManualUrl;
    }

    try {
        if (typeof window === 'undefined') return null;
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
    } catch {
        return null;
    }
}

/**
 * Gets the manual HA URL from localStorage.
 * @returns {string|null}
 */
export function getHaManualUrl() {
    try {
        if (typeof localStorage === 'undefined') return null;
        return localStorage.getItem('ha_manual_url');
    } catch {
        return null;
    }
}

/**
 * Sets the manual HA URL in localStorage.
 * @param {string|null} url 
 */
export function setHaManualUrl(url) {
    try {
        if (typeof localStorage === 'undefined') return;
        if (url) {
            const sanitizedUrl = normalizeHaManualUrl(url);
            if (!sanitizedUrl) {
                Logger.warn('[Env] Refusing to store invalid HA URL');
                return;
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
        if (typeof localStorage === 'undefined') return null;
        return localStorage.getItem('ha_llat_token');
    } catch {
        return null;
    }
}

/**
 * Sets the HA Long-Lived Access Token in localStorage.
 * @param {string|null} token 
 */
export function setHaToken(token) {
    try {
        if (typeof localStorage === 'undefined') return;
        if (token) {
            localStorage.setItem('ha_llat_token', token);
        } else {
            localStorage.removeItem('ha_llat_token');
        }
    } catch (e) {
        Logger.error("Failed to save HA Token:", e);
    }
}

/** @type {string|null} */
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

/**
 * Checks if the application is running within the Home Assistant environment.
 * @returns {boolean}
 */
export function isDeployedInHa() {
    try {
        if (typeof window === 'undefined') return false;
        const loc = window.location;
        // If we're not running on file:// and the hostname or path suggests HA,
        // we are "deployed" in HA (either via Addon or Custom Component).
        if (loc.protocol === "file:") return false;

        return (
            loc.hostname === "homeassistant" ||
            loc.hostname === "hassio" ||
            loc.pathname.includes("/api/esphome_designer") ||
            loc.pathname.includes("/esphome-designer")
        );
    } catch {
        return false;
    }
}

export { normalizeHaManualUrl };
