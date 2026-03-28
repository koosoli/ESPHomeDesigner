import { Logger } from './logger.js';

const HA_AUTH_MESSAGE_TYPE = 'esphome-designer-ha-auth';
/** @type {string | null} */
let runtimeHaRequestToken = null;

/**
 * @returns {Location | null}
 */
function getBrowserLocation() {
    try {
        const loc = globalThis.location;
        return loc ? loc : null;
    } catch {
        return null;
    }
}

/**
 * @returns {Storage | null}
 */
function getWebStorage() {
    try {
        return globalThis.localStorage ?? null;
    } catch {
        return null;
    }
}

/**
 * @param {string | null | undefined} token
 */
function setRuntimeHaRequestToken(token) {
    if (typeof token !== 'string') return;
    const normalized = token.trim();
    if (!normalized || normalized === 'null') return;
    runtimeHaRequestToken = normalized;
}

function loadEmbeddedHaRequestToken() {
    try {
        const frameName = /** @type {string | undefined} */ (/** @type {any} */ (globalThis).name);
        if (!frameName) return;

        const payload = JSON.parse(frameName);
        if (payload?.type === HA_AUTH_MESSAGE_TYPE) {
            setRuntimeHaRequestToken(payload.accessToken);
        }
    } catch {
        // Ignore unrelated window.name payloads.
    }
}

function initEmbeddedHaAuthBridge() {
    loadEmbeddedHaRequestToken();

    try {
        globalThis.addEventListener?.('message', (event) => {
            const loc = getBrowserLocation();
            if (loc && event.origin !== loc.origin) return;
            const data = /** @type {{ type?: string, accessToken?: string } | undefined} */ (event.data);
            if (data?.type !== HA_AUTH_MESSAGE_TYPE) return;
            setRuntimeHaRequestToken(data.accessToken);
        });
    } catch {
        // Ignore environments without window messaging.
    }
}

/**
 * @param {string | null | undefined} url
 * @returns {string | null}
 */
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
    const manualUrl = getHaManualUrl();
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
        const loc = getBrowserLocation();
        if (!loc) return null;
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
        const storage = getWebStorage();
        if (!storage) return null;
        return storage.getItem('ha_manual_url');
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
        const storage = getWebStorage();
        if (!storage) return;
        if (url) {
            const sanitizedUrl = normalizeHaManualUrl(url);
            if (!sanitizedUrl) {
                Logger.warn('[Env] Refusing to store invalid HA URL');
                return;
            }

            storage.setItem('ha_manual_url', sanitizedUrl);
        } else {
            storage.removeItem('ha_manual_url');
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
        const storage = getWebStorage();
        if (!storage) return null;
        return storage.getItem('ha_llat_token');
    } catch {
        return null;
    }
}

/**
 * Gets the token that should be used for Home Assistant requests.
 * Prefers the runtime token injected by the HA custom panel and
 * falls back to the manually stored LLAT token for external mode.
 * @returns {string|null}
 */
export function getHaRequestToken() {
    return runtimeHaRequestToken || getHaToken();
}

/**
 * Sets the HA Long-Lived Access Token in localStorage.
 * @param {string|null} token 
 */
export function setHaToken(token) {
    try {
        const storage = getWebStorage();
        if (!storage) return;
        if (token) {
            storage.setItem('ha_llat_token', token);
        } else {
            storage.removeItem('ha_llat_token');
        }
    } catch (e) {
        Logger.error("Failed to save HA Token:", e);
    }
}

/** @type {string|null} */
export let HA_API_BASE = detectHaBackendBaseUrl();

initEmbeddedHaAuthBridge();

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
        const loc = getBrowserLocation();
        if (!loc) return false;
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
