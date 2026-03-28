/**
 * @returns {(Window & typeof globalThis) | null}
 */
function getParentWindow() {
    try {
        const parentWindow = /** @type {(Window & typeof globalThis) | undefined} */ (globalThis.parent);
        if (!parentWindow || parentWindow === globalThis) {
            return null;
        }
        return parentWindow;
    } catch {
        return null;
    }
}

/**
 * @returns {any | null}
 */
export function getEmbeddedHaHass() {
    const parentWindow = getParentWindow();
    if (!parentWindow) {
        return null;
    }

    try {
        const globalHass = /** @type {any} */ (parentWindow).__ESPHOME_DESIGNER_HASS__;
        if (globalHass && typeof globalHass.callApi === 'function') {
            return globalHass;
        }
    } catch {
        // Ignore parent access errors and continue with DOM lookup paths.
    }

    try {
        const panelHass = /** @type {any} */ (parentWindow.document
            ?.querySelector?.('esphome-designer-panel')
            )?._hass;
        if (panelHass && typeof panelHass.callApi === 'function') {
            return panelHass;
        }
    } catch {
        // Ignore parent access errors and continue with other lookup paths.
    }

    try {
        const homeAssistantHass = /** @type {any} */ (parentWindow.document
            ?.querySelector?.('home-assistant')
            )?.hass;
        if (homeAssistantHass && typeof homeAssistantHass.callApi === 'function') {
            return homeAssistantHass;
        }
    } catch {
        // Ignore parent access errors and continue with other lookup paths.
    }

    return null;
}

/**
 * @param {string} urlOrPath
 * @returns {string | null}
 */
export function toHaCallApiPath(urlOrPath) {
    if (!urlOrPath) {
        return null;
    }

    try {
        // Reject malformed percent-encoding before URL normalization.
        decodeURI(urlOrPath);
        const parsed = new URL(urlOrPath, globalThis.location?.origin || 'http://localhost');
        let path = parsed.pathname;

        if (path.startsWith('/api/')) {
            path = path.slice('/api/'.length);
        } else {
            path = path.replace(/^\/+/, '');
        }

        return `${path}${parsed.search}`;
    } catch {
        return null;
    }
}

/**
 * @param {HeadersInit | undefined} headers
 * @returns {Record<string, string>}
 */
function normalizeHeaders(headers) {
    if (!headers) {
        return {};
    }

    if (headers instanceof Headers) {
        /** @type {Record<string, string>} */
        const normalized = {};
        headers.forEach((value, key) => {
            normalized[key] = value;
        });
        return normalized;
    }

    if (Array.isArray(headers)) {
        return Object.fromEntries(headers);
    }

    return { ...headers };
}

/**
 * @param {BodyInit | null | undefined} body
 * @param {HeadersInit | undefined} headers
 * @returns {any}
 */
function normalizeRequestBody(body, headers) {
    if (body === null || body === undefined) {
        return undefined;
    }

    if (typeof body !== 'string') {
        return body;
    }

    const normalizedHeaders = normalizeHeaders(headers);
    const contentType = normalizedHeaders['Content-Type'] || normalizedHeaders['content-type'] || '';
    const trimmedBody = body.trim();

    if (!trimmedBody) {
        return undefined;
    }

    if (
        contentType.includes('application/json')
        || contentType.includes('text/plain')
        || trimmedBody.startsWith('{')
        || trimmedBody.startsWith('[')
    ) {
        try {
            return JSON.parse(trimmedBody);
        } catch {
            return body;
        }
    }

    return body;
}

/**
 * @param {any} payload
 * @param {number} status
 * @returns {Response}
 */
function createEmbeddedResponse(payload, status = 200) {
    const bodyText = typeof payload === 'string' ? payload : JSON.stringify(payload);
    return /** @type {Response} */ ({
        ok: status >= 200 && status < 300,
        status,
        json: async () => payload,
        text: async () => bodyText,
        blob: async () => new Blob([bodyText], { type: 'application/json' })
    });
}

/**
 * @param {unknown} error
 * @returns {number}
 */
function getEmbeddedErrorStatus(error) {
    const candidate = Number(
        /** @type {any} */ (error)?.statusCode
        ?? /** @type {any} */ (error)?.status_code
        ?? /** @type {any} */ (error)?.status
    );
    return Number.isFinite(candidate) && candidate > 0 ? candidate : 500;
}

/**
 * @param {unknown} error
 * @returns {Record<string, any>}
 */
function getEmbeddedErrorPayload(error) {
    const embeddedError = /** @type {any} */ (error);
    const message = embeddedError?.message || 'Request failed';
    const body = embeddedError?.body;

    if (body && typeof body === 'object') {
        return {
            message,
            ...body
        };
    }

    if (typeof body === 'string') {
        try {
            const parsed = JSON.parse(body);
            return {
                message,
                ...parsed
            };
        } catch {
            return {
                error: body,
                message
            };
        }
    }

    return {
        error: message,
        message
    };
}

/**
 * @param {string} url
 * @param {RequestInit} [options]
 * @returns {Promise<Response | null>}
 */
export async function fetchViaEmbeddedHaBridge(url, options = {}) {
    const embeddedHass = getEmbeddedHaHass();
    const callApiPath = toHaCallApiPath(url);

    if (!embeddedHass || !callApiPath || typeof embeddedHass.callApi !== 'function') {
        return null;
    }

    if (options.signal?.aborted) {
        throw new DOMException('The operation was aborted.', 'AbortError');
    }

    try {
        const payload = await embeddedHass.callApi(
            (options.method || 'GET').toLowerCase(),
            callApiPath,
            normalizeRequestBody(options.body, options.headers)
        );
        return createEmbeddedResponse(payload, 200);
    } catch (error) {
        return createEmbeddedResponse(
            getEmbeddedErrorPayload(error),
            getEmbeddedErrorStatus(error)
        );
    }
}
