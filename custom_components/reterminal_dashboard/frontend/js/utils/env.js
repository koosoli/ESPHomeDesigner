/**
 * Detects the Home Assistant backend URL.
 * @returns {string|null} The API base URL or null.
 */
function detectHaBackendBaseUrl() {
    // Check manual configuration first (from localStorage)
    let manualUrl = getHaManualUrl();
    if (manualUrl) {
        manualUrl = manualUrl.trim();
        if (manualUrl.endsWith('/')) {
            manualUrl = manualUrl.slice(0, -1);
        }
        // Ensure suffix is present even if user entered only the base URL previously
        if (manualUrl && !manualUrl.includes('/api/')) {
            manualUrl += '/api/reterminal_dashboard';
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
            loc.pathname.includes("/reterminal-dashboard")
        ) {
            return `${loc.origin}/api/reterminal_dashboard`;
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
function getHaManualUrl() {
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
function setHaManualUrl(url) {
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
                sanitizedUrl += '/api/reterminal_dashboard';
            }

            localStorage.setItem('ha_manual_url', sanitizedUrl);
        } else {
            localStorage.removeItem('ha_manual_url');
        }
    } catch (e) {
        console.error("Failed to save HA URL:", e);
    }
}

/**
 * Gets the HA Long-Lived Access Token from localStorage.
 * @returns {string|null}
 */
function getHaToken() {
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
function setHaToken(token) {
    try {
        if (token) {
            localStorage.setItem('ha_llat_token', token);
        } else {
            localStorage.removeItem('ha_llat_token');
        }
    } catch (e) {
        console.error("Failed to save HA Token:", e);
    }
}

let HA_API_BASE = detectHaBackendBaseUrl();

/**
 * Re-detects the HA backend URL (e.g. after settings change).
 */
function refreshHaBaseUrl() {
    HA_API_BASE = detectHaBackendBaseUrl();
}

/**
 * Checks if the HA backend is available.
 * @returns {boolean}
 */
function hasHaBackend() {
    return !!HA_API_BASE;
}
