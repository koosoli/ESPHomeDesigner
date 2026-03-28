import { getHaHeaders, haFetch } from '../io/ha_api.js';

/**
 * @param {number} ms
 * @returns {Promise<void>}
 */
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * @param {string} baseUrl
 * @returns {Promise<any>}
 */
export async function fetchLayouts(baseUrl) {
    const resp = await haFetch(`${baseUrl}/layouts`, {
        headers: getHaHeaders()
    });
    if (!resp.ok) throw new Error(`Failed to load layouts: ${resp.status}`);
    return resp.json();
}

/**
 * @param {string} baseUrl
 * @param {string} layoutId
 * @returns {Promise<any>}
 */
export async function fetchLayout(baseUrl, layoutId) {
    const resp = await haFetch(`${baseUrl}/layouts/${layoutId}`, {
        headers: getHaHeaders()
    });
    if (!resp.ok) throw new Error(`Failed to load layout: ${resp.status}`);
    return resp.json();
}

/**
 * @param {string} baseUrl
 * @param {string} layoutId
 * @returns {Promise<Response>}
 */
export async function deleteLayoutRequest(baseUrl, layoutId) {
    return haFetch(`${baseUrl}/layouts/${layoutId}`, {
        method: "POST",
        headers: {
            ...getHaHeaders(),
            "Content-Type": "text/plain"
        },
        body: JSON.stringify({ action: "delete" })
    });
}

/**
 * @param {string} baseUrl
 * @param {Record<string, any>} payload
 * @returns {Promise<Response>}
 */
export async function createLayoutRequest(baseUrl, payload) {
    return haFetch(`${baseUrl}/layouts`, {
        method: "POST",
        headers: {
            ...getHaHeaders(),
            "Content-Type": "text/plain"
        },
        body: JSON.stringify(payload)
    });
}

/**
 * @param {string} baseUrl
 * @param {Record<string, any>} data
 * @param {boolean} overwrite
 * @param {() => Record<string, string>} getHaHeaders
 * @returns {Promise<Response>}
 */
export async function importLayoutRequest(baseUrl, data, overwrite, getHaHeaders) {
    const url = `${baseUrl}/import${overwrite ? "?overwrite=true" : ""}`;
    return haFetch(url, {
        method: "POST",
        headers: getHaHeaders(),
        body: JSON.stringify(data)
    });
}
