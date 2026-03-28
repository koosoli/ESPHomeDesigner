import { isSecureBrowserContext } from '../utils/browser_runtime.js';

/**
 * @param {string} text
 * @returns {Promise<void>}
 */
export async function copyText(text) {
    if (navigator.clipboard && isSecureBrowserContext()) {
        await navigator.clipboard.writeText(text);
        return;
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
    const originalText = btnElement.textContent;
    const originalMinWidth = btnElement.style.minWidth;
    btnElement.style.minWidth = btnElement.offsetWidth + "px";
    btnElement.textContent = label;

    globalThis.setTimeout(() => {
        btnElement.textContent = originalText;
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
