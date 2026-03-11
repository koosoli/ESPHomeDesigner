/**
 * @file package_processor.js
 * @description Extracts package processing, placeholder injection, and section merging logic.
 */

import { mergeYamlSections, applyPackageOverrides } from '../generators/yaml_merger.js';

export const sanitizePackageContent = (yaml) => {
    if (!yaml) return "";
    // IMPORTANT: These keys are system-level and MUST be commented out in the final snippet.
    // This allows users to merge the generated YAML into their existing config without conflicts.
    const systemKeys = ["esphome:", "esp32:", "psram:", "wifi:", "api:", "ota:", "logger:", "web_server:", "captive_portal:", "platformio_options:", "preferences:", "substitutions:", "deep_sleep:"];
    const lines = yaml.split('\n');
    const sanitized = [];
    let inSystemBlock = false;

    for (let line of lines) {
        const trimmed = line.trim();
        if (trimmed.length === 0) { sanitized.push(line); continue; }
        const indent = (line.match(/^\s*/) || [""])[0].length;
        if (indent === 0 && trimmed.endsWith(':')) {
            inSystemBlock = systemKeys.some(k => trimmed.startsWith(k));
            if (inSystemBlock) sanitized.push("# " + line + " # (Auto-commented)");
            else sanitized.push(line);
        } else {
            if (inSystemBlock) sanitized.push("# " + line);
            else sanitized.push(line);
        }
    }
    return sanitized.join('\n');
};

export const processPackageContent = (packageContent, lambdaContent, touchSensors, profile, layout, isLvgl, lines) => {
    // Fix #122: Robust placeholder replacement with indentation preservation
    // Ensure first line doesn't get double indent by matching entire line
    // Capture indentation and replace the entire line
    const placeholderRegex = /^(\s*)# __LAMBDA_PLACEHOLDER__/m;
    const match = packageContent.match(placeholderRegex);
    const hasLvgl = isLvgl; // Match adapter logic

    if (match) {
        const indent = match[1];
        const placeholder = "# __LAMBDA_PLACEHOLDER__";
        // Check if recipe already contains the lambda header immediately before placeholder
        const hasHeader = new RegExp(`lambda:\\s*\\|-\\s*[\\r\\n]+\\s*${placeholder.replace("#", "\\#")}`).test(packageContent);

        // Fix #129: Skip lambda injection if LVGL is handling the display
        if (hasLvgl) {
            packageContent = packageContent.replace(placeholderRegex, "");
        } else {
            const replacement = (hasHeader ? "" : indent + "lambda: |-\n") + lambdaContent.map(l => l.trim() ? indent + "  " + l : "").join("\n");
            packageContent = packageContent.replace(placeholderRegex, replacement);
        }
    }

    // Touch sensor placeholder replacement
    const touchPlaceholderRegex = /^(\s*)# __TOUCH_SENSORS_PLACEHOLDER__/m;
    const touchMatch = packageContent.match(touchPlaceholderRegex);
    if (touchMatch && touchSensors && touchSensors.length > 0) {
        // The placeholder is at indent level of list items (e.g., "  # __TOUCH...")
        // Generator outputs lines with "  " prefix already
        // We just need to pass through the lines as-is since they're already indented for binary_sensor
        const touchReplacement = touchSensors
            .filter(l => l.trim() !== '') // Skip empty lines
            .join('\n');
        packageContent = packageContent.replace(touchPlaceholderRegex, touchReplacement);
    } else if (touchMatch) {
        // Remove placeholder if no touch sensors to inject
        packageContent = packageContent.replace(touchPlaceholderRegex, "");
    }

    packageContent = applyPackageOverrides(packageContent, profile, layout.orientation, hasLvgl, layout);

    // Fix: Standardize section merging. We want to avoid double headers like "sensor:"
    // but we MUST NOT filter out content lines like "- platform:" which are shared.
    const sanitizedPackage = sanitizePackageContent(packageContent);
    const extraLines = [];

    let inDisplaySection = false;
    for (const line of lines) {
        const trimmed = line.trim();
        const isHeader = (trimmed.endsWith(':') && !line.startsWith(' '));

        if (isHeader) {
            inDisplaySection = (trimmed === "display:");
        }

        if (!inDisplaySection) {
            extraLines.push(line);
        }
    }

    // Fix #218: Merge sections like sensor:, binary_sensor:, text_sensor: instead of duplicating them
    return mergeYamlSections(sanitizedPackage, extraLines.join('\n'));
};
