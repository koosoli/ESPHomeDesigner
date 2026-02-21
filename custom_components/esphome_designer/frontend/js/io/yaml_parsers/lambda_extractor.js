import { Logger } from '../../utils/logger.js';

/**
 * Scans raw ESPHome YAML lines for display lambdas, LVGL blocks, or OEPL/ODP payloads.
 * Handles indentation-sensitive block extraction (state machine).
 * 
 * @param {string[]} rawLines - The full list of lines from the original YAML
 * @param {string} yamlText - The full YAML text (for specific keyword checks)
 * @returns {string[]} - The extracted lines belonging to the interactive display blocks
 */
export function extractLambdaLines(rawLines, yamlText) {
    const lambdaLines = [];
    let inBlock = false;
    let blockIndent = 0;
    let blockType = null; // 'lambda', 'lvgl', 'oepl', 'odp_service', or 'odp'

    for (const rawLine of rawLines) {
        const line = rawLine.replace(/\t/g, "    ");
        const trimmed = line.trim();

        if (!inBlock) {
            if (line.match(/^\s*lambda:\s*\|\-/)) {
                inBlock = true;
                blockType = 'lambda';
                blockIndent = 0;
                continue;
            } else if (line.match(/^\s*lvgl:\s*$/)) {
                inBlock = true;
                blockType = 'lvgl';
                blockIndent = 0;
                continue;
            } else if (line.match(/^\s*"?(?:open_epaper_link\.drawcustom|payload)"?:\s*(?:\[|\|-)?/)) {
                inBlock = true;
                blockType = 'oepl';
                blockIndent = 0;
                continue;
            } else if (line.match(/^\s*service:\s*opendisplay\.drawcustom/)) {
                inBlock = true;
                blockType = 'odp_service';
                blockIndent = 0;
                continue;
            } else if (line.match(/^\s*"actions":\s*\[/)) {
                inBlock = true;
                blockType = 'odp';
                blockIndent = 0;
                continue;
            }
        }

        if (inBlock) {
            const indentMatch = line.match(/^(\s*)/);
            const indentLen = indentMatch ? indentMatch[1].length : 0;

            if (trimmed === "") {
                lambdaLines.push("");
                continue;
            }

            if (blockIndent === 0 && trimmed !== "" && !trimmed.startsWith("#") && !trimmed.startsWith("//")) {
                blockIndent = indentLen;
            }

            // OEPL/ODP can be JSON, so we handle both # and // markers
            if (trimmed.startsWith("#") || trimmed.startsWith("//")) {
                lambdaLines.push(line);
                continue;
            }

            if (blockIndent !== 0 && indentLen < blockIndent && trimmed !== "") {
                // Check if it's a new root key or a lower indent level
                if (line.match(/^\w+:/) || line.match(/^\s*}/) || indentLen < blockIndent) {
                    inBlock = false;
                    continue;
                }
            }

            // For LVGL/OEPL/ODP blocks, we keep the indentation to help the sub-block parser
            // For Lambdas, we strip the base indent
            if (blockType === 'lambda') {
                lambdaLines.push(line.slice(blockIndent));
            } else {
                lambdaLines.push(line);
            }
        }
    }

    Logger.log(`[extractLambdaLines] Collected ${lambdaLines.length} lines from ${blockType} block`);
    return lambdaLines;
}
