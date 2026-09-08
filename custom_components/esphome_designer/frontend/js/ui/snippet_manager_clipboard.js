import { isSecureBrowserContext } from '../utils/browser_runtime.js';

const SYSTEM_SECTION_KEYS = new Set([
    "esphome", "esp32", "esp8266", "psram", "wifi", "api", "ota",
    "logger", "web_server", "captive_portal", "preferences",
    "platformio_options", "deep_sleep", "substitutions"
]);

/**
 * @param {string} text
 * @returns {Promise<void>}
 */
export async function copyText(text) {
    if (navigator.clipboard && isSecureBrowserContext()) {
        try {
            await navigator.clipboard.writeText(text);
            return;
        } catch {
            // Fall through to the legacy path when browser permissions deny async clipboard writes.
        }
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.left = "-999999px";
    textarea.style.top = "-999999px";
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    try {
        if (!document.execCommand("copy")) {
            throw new Error("Copy command was rejected");
        }
    } finally {
        document.body.removeChild(textarea);
    }
}

/**
 * @param {HTMLElement} btnElement
 * @param {string} label
 * @param {number} [duration=2000]
 * @returns {void}
 */
export function setTemporaryButtonLabel(btnElement, label, duration = 2000) {
    const originalHtml = btnElement.innerHTML;
    const originalMinWidth = btnElement.style.minWidth;
    btnElement.style.minWidth = btnElement.offsetWidth + "px";
    btnElement.textContent = label;

    globalThis.setTimeout(() => {
        btnElement.innerHTML = originalHtml;
        btnElement.style.minWidth = originalMinWidth;
    }, duration);
}

/**
 * @param {string} yaml
 * @returns {string}
 */
export function extractDisplayLambda(yaml) {
    const displayIdx = yaml.search(/^display:\s*$/m);
    if (displayIdx === -1) {
        throw new Error("No display section found in output");
    }

    const afterDisplay = yaml.substring(displayIdx);
    const nextSectionMatch = afterDisplay.match(/\n[a-z_]+:\s*(?:\n|$)/);
    const displaySection = nextSectionMatch
        ? afterDisplay.substring(0, nextSectionMatch.index)
        : afterDisplay;
    const lambdaMatch = displaySection.match(/lambda:\s*\|-\n([\s\S]*?)$/);

    if (!lambdaMatch) {
        throw new Error("No display lambda found in output");
    }

    const lambdaContent = lambdaMatch[1];
    const lines = lambdaContent.split('\n');
    const nonEmptyLines = lines.filter((line) => line.trim().length > 0);
    if (nonEmptyLines.length === 0) {
        throw new Error("Lambda appears to be empty");
    }

    const minIndent = Math.min(...nonEmptyLines.map((line) => {
        const match = line.match(/^(\s*)/);
        return match ? match[1].length : 0;
    }));
    return lines
        .map((line) => line.length >= minIndent ? line.substring(minIndent) : line)
        .join('\n')
        .trim();
}

/**
 * @param {string} line
 * @returns {string | null}
 */
function getRootSectionKey(line) {
    const match = line.match(/^(?:# ?)?([A-Za-z0-9_]+):(?:\s+#.*)?\s*$/);
    return match ? match[1] : null;
}

/**
 * @param {string} yaml
 * @returns {string}
 */
export function extractUiOnlyYaml(yaml) {
    const lines = String(yaml || "").replace(/\r\n/g, "\n").split("\n");
    const kept = [];
    let skipSection = false;

    for (const line of lines) {
        const key = getRootSectionKey(line);
        if (key) {
            skipSection = SYSTEM_SECTION_KEYS.has(key);
            if (skipSection) continue;
        }

        if (!skipSection) kept.push(line);
    }

    const cleaned = kept
        .join("\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim();

    if (!cleaned) {
        throw new Error("No UI YAML remains after removing hardware/system sections");
    }

    return cleaned;
}

/**
 * @param {{
 *   service: string,
 *   target: { entity_id?: string },
 *   data: {
 *     background: string,
 *     rotate: string|number,
 *     dither?: number,
 *     ttl: string|number,
 *     payload: any
 *   }
 * }} serviceData
 * @param {{ oeplEntityId?: string, oeplDither?: number }} [settings={}]
 * @returns {string}
 */
export function formatOEPLServiceYaml(serviceData, settings = {}) {
    const entityId = settings.oeplEntityId || "open_epaper_link.0000000000000000";
    const dither = settings.oeplDither ?? 2;

    serviceData.target.entity_id = entityId;
    serviceData.data.dither = dither;

    let finalYaml = `service: ${serviceData.service}\n`;
    finalYaml += `target:\n  entity_id: ${serviceData.target.entity_id}\n`;
    finalYaml += `data:\n`;
    finalYaml += `  background: ${serviceData.data.background}\n`;
    finalYaml += `  rotate: ${serviceData.data.rotate}\n`;
    finalYaml += `  dither: ${serviceData.data.dither}\n`;
    finalYaml += `  ttl: ${serviceData.data.ttl}\n`;
    finalYaml += `  payload: >\n`;
    finalYaml += `    ${JSON.stringify(serviceData.data.payload)}`;

    return finalYaml;
}

/**
 * Extracts only the payload block (e.g. payload: list) from an OpenDisplay or OEPL action snippet.
 * Strips wrapping action: / target: / data: boilerplate so the elements list can be pasted
 * directly into an existing Home Assistant automation action or service call.
 *
 * @param {string} snippetText
 * @returns {string}
 */
export function extractOpenDisplayPayload(snippetText) {
    const text = String(snippetText || '').trim();
    if (!text) return 'payload: []';

    // Handle JSON payloads (e.g. OEPL or raw JSON export)
    if (text.startsWith('{')) {
        try {
            const parsed = JSON.parse(text);
            const payload = parsed.data?.payload ?? parsed.payload;
            if (payload !== undefined) {
                return JSON.stringify(payload, null, 2);
            }
        } catch {
            // Not valid JSON, fall through to YAML parsing
        }
    }

    const lines = snippetText.split(/\r?\n/);
    const payloadIndex = lines.findIndex((line) => /^\s*payload:\s*(?:\[\])?\s*$/.test(line));
    if (payloadIndex === -1) {
        return 'payload: []';
    }

    if (lines[payloadIndex].includes('[]')) {
        return 'payload: []';
    }

    const match = lines[payloadIndex].match(/^(\s*)payload:/);
    const indent = match ? match[1].length : 0;

    const extracted = ['payload:'];

    for (let i = payloadIndex + 1; i < lines.length; i++) {
        const line = lines[i];
        if (line.trim() === '') {
            extracted.push('');
            continue;
        }
        const lineIndent = (line.match(/^(\s*)/) || ['', ''])[1].length;
        if (lineIndent <= indent) {
            break;
        }
        extracted.push(line.slice(indent));
    }

    return extracted.join('\n');
}
