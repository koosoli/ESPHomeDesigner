/**
 * @file yaml_merger.js
 * @description Pure utility functions for merging ESPHome YAML sections and applying hardware overrides.
 */

import { Logger } from '../../utils/logger.js';

export function applyPackageOverrides(yaml, profile, orientation, isLvgl = false, layout = {}) {
    if (isLvgl) {
        // Fix: ESPHome 2025.12.7 compatibility - LVGL cannot have auto_clear_enabled: true
        yaml = yaml.replace(/auto_clear_enabled:\s*true/g, "auto_clear_enabled: false");
    }

    // Generic Rotation Logic for all package-based hardware
    if (profile.resolution) {
        const res = profile.resolution;
        const isNativePortrait = res.height > res.width;
        const isRequestedPortrait = orientation === 'portrait' || orientation === 'portrait_inverted';
        const isRequestedInverted = orientation === 'landscape_inverted' || orientation === 'portrait_inverted';
        const needsOrientationSwap = isNativePortrait !== isRequestedPortrait;

        // Detect the base rotation already present in the hardware YAML
        const baseRotationMatch = yaml.match(/display:[\s\S]*?rotation:\s*(\d+)/);
        const baseRotation = baseRotationMatch ? parseInt(baseRotationMatch[1], 10) : 0;

        // Calculate the additional rotation needed on top of the base
        // Base rotation is the hardware's default (e.g. 180 for Guition jc4827w543)
        // We only need to add an offset when switching orientation or requesting inverted
        let rotationOffset = 0;
        if (needsOrientationSwap) rotationOffset += 90;
        if (isRequestedInverted) rotationOffset += 180;

        const rotation = (baseRotation + rotationOffset) % 360;

        Logger.log(`[Adapter] Orientation: ${orientation}, base rotation: ${baseRotation}, offset: ${rotationOffset}, final: ${rotation}`);

        // Apply rotation to YAML
        yaml = yaml.replace(/(display:[\s\S]*?rotation:\s*)\d+/g, `$1${rotation}`);

        // Note: Do NOT swap width/height in the dimensions block.
        // The dimensions: block describes the physical panel hardware specs.
        // ESPHome's rotation: property handles logical canvas orientation.
        // Swapping dimensions conflicts with rotation (see GitHub issue #297).

        // Specific Fix for Waveshare 7" Hotspot Name
        if (profile.name && profile.name.toLowerCase().includes("waveshare touch lcd 7")) {
            const deviceName = (profile.name || "ESPHome-Device").replace(/["\\]/g, "").split(" ")[0];
            yaml = yaml.replace(/"Waveshare-7-Inch"/g, `"${deviceName}-Hotspot"`);
        }

        // Fix #129: Indentation-aware GT911 transform logic
        // Match any whitespace before id: my_touchscreen
        const idMatch = yaml.match(/^(\s*)id:\s*my_touchscreen/m);
        if (idMatch) {
            const indent = idMatch[1];
            let transform = "";
            // Note: GT911 on this panel often needs specific calibration/swaps matching the display rotation
            if (rotation === 0) transform = `transform:\n${indent}  swap_xy: false\n${indent}  mirror_x: false\n${indent}  mirror_y: false`;
            else if (rotation === 90) transform = `transform:\n${indent}  swap_xy: true\n${indent}  mirror_x: false\n${indent}  mirror_y: true`;
            else if (rotation === 180) transform = `transform:\n${indent}  swap_xy: false\n${indent}  mirror_x: true\n${indent}  mirror_y: true`;
            else if (rotation === 270) transform = `transform:\n${indent}  swap_xy: true\n${indent}  mirror_x: true\n${indent}  mirror_y: false`;

            if (transform) {
                // Remove existing transform if present to avoid duplication
                const hasTransform = new RegExp(`^${indent}transform:`, 'm').test(yaml);
                if (hasTransform) {
                    // Fix #319: Regex was too greedy and swallowed siblings like on_release if they shared the same indentation.
                    // We now strictly match only known transform sub-keys to prevent it from eating other blocks.
                    const oldTransformRegex = new RegExp(
                        `^${indent}transform:\\n(${indent}  (swap_xy|mirror_x|mirror_y):.*\\n?)+`, 'm'
                    );
                    if (oldTransformRegex.test(yaml)) {
                        yaml = yaml.replace(oldTransformRegex, `${indent}${transform}\n`);
                    }
                } else {
                    // Inject after ID
                    yaml = yaml.replace(idMatch[0], `${idMatch[0]}\n${indent}${transform}`);
                }
            }

            // Inject LVGL Dimming Wakeup Trigger
            if (isLvgl && layout.lcdEcoStrategy === 'dim_after_timeout') {
                // Check if on_release already exists to avoid duplication
                if (!yaml.includes("on_release:")) {
                    const wakeupTrigger = `\n${indent}on_release:\n${indent}  - if:\n${indent}      condition: lvgl.is_paused\n${indent}      then:\n${indent}        - lvgl.resume:\n${indent}        - lvgl.widget.redraw:\n${indent}        - light.turn_on: display_backlight`;

                    const tsBlockStart = yaml.search(/^touchscreen:/m);
                    if (tsBlockStart !== -1) {
                        const afterTsBlock = yaml.slice(tsBlockStart);
                        const nextKeyMatch = afterTsBlock.slice(12).match(/^\w/m);

                        if (nextKeyMatch) {
                            const insertIdx = tsBlockStart + 12 + nextKeyMatch.index;
                            yaml = yaml.slice(0, insertIdx) + wakeupTrigger + "\n\n" + yaml.slice(insertIdx);
                        } else {
                            yaml = yaml.trimEnd() + wakeupTrigger + "\n";
                        }
                    }
                }
            }
        }
    }
    return yaml;
}

/**
 * Fix #218: Merges YAML sections to avoid duplicates like double sensor: blocks.
 * Sections like sensor:, binary_sensor:, text_sensor:, font:, etc. will be merged
 * if they appear in both the base YAML and the extra YAML.
 * @param {string} baseYaml - The base YAML content (e.g., hardware package)
 * @param {string} extraYaml - Additional YAML content to merge
 * @returns {string} Merged YAML content
 */
export function mergeYamlSections(baseYaml, extraYaml) {
    if (!extraYaml || extraYaml.trim() === '') return baseYaml;
    if (!baseYaml || baseYaml.trim() === '') return extraYaml;

    // Sections that should be merged (list entries under these keys)
    const mergeableSections = [
        'sensor:', 'binary_sensor:', 'text_sensor:', 'font:', 'image:',
        'output:', 'light:', 'switch:', 'button:', 'script:', 'globals:',
        'i2c:', 'spi:', 'external_components:', 'time:', 'interval:',
        // New sections added to prevent duplicates
        'fan:', 'cover:', 'climate:', 'number:', 'select:', 'datetime:',
        'lock:', 'alarm_control_panel:', 'siren:', 'media_player:'
    ];

    // Parse YAML into sections
    const parseYamlSections = (yaml) => {
        const sections = new Map();
        const lines = yaml.split('\n');
        let currentSection = null;
        let currentContent = [];
        let nonSectionLines = [];

        for (const line of lines) {
            const trimmed = line.trim();
            // Check if this is a top-level section header (no leading whitespace, ends with :)
            // Fix: Ignore comments when checking for header match (e.g. "sensor: # My Sensor" -> "sensor:")
            const headerMatch = line.match(/^([a-z0-9_]+:)(\s*#.*)?$/);
            const isTopLevelHeader = headerMatch && !line.startsWith(' ') && !line.startsWith('\t');

            const cleanHeader = isTopLevelHeader ? headerMatch[1] : trimmed;

            if (isTopLevelHeader && mergeableSections.includes(cleanHeader)) {
                // Save previous section
                if (currentSection) {
                    sections.set(currentSection, currentContent);
                }
                currentSection = cleanHeader;
                currentContent = [];
            } else if (isTopLevelHeader && !mergeableSections.includes(cleanHeader)) {
                // Non-mergeable top-level section - save to non-section lines
                if (currentSection) {
                    sections.set(currentSection, currentContent);
                    currentSection = null;
                    currentContent = [];
                }
                nonSectionLines.push(line);
            } else if (currentSection) {
                // Content belonging to current mergeable section
                currentContent.push(line);
            } else {
                // Content not belonging to any mergeable section
                nonSectionLines.push(line);
            }
        }

        // Save last section
        if (currentSection) {
            sections.set(currentSection, currentContent);
        }

        return { sections, nonSectionLines };
    };

    const baseParsed = parseYamlSections(baseYaml);
    const extraParsed = parseYamlSections(extraYaml);

    // Merge sections
    const mergedSections = new Map(baseParsed.sections);

    for (const [sectionKey, extraContent] of extraParsed.sections) {
        if (mergedSections.has(sectionKey)) {
            // Merge: append extra content to existing section
            const existingContent = mergedSections.get(sectionKey);
            mergedSections.set(sectionKey, [...existingContent, ...extraContent]);
        } else {
            // New section from extra
            mergedSections.set(sectionKey, extraContent);
        }
    }

    // Reconstruct YAML
    const result = [];

    // First, add base non-section lines (comments, headers, non-mergeable sections)
    result.push(...baseParsed.nonSectionLines);

    // Add merged sections
    for (const [sectionKey, content] of mergedSections) {
        // Add blank line before section if result isn't empty
        if (result.length > 0 && result[result.length - 1].trim() !== '') {
            result.push('');
        }
        result.push(sectionKey);
        result.push(...content);
    }

    // Add extra non-section lines that aren't in base
    for (const line of extraParsed.nonSectionLines) {
        const trimmed = line.trim();
        // Skip if empty or already present
        if (trimmed === '' || trimmed.startsWith('#')) continue;

        // Fix: Check for header duplication using clean headers
        let isDuplicateHeader = false;
        const headerMatch = line.match(/^([a-z0-9_]+:)(\s*#.*)?$/);
        if (headerMatch && !line.startsWith(' ')) {
            const cleanHeader = headerMatch[1];
            // Check if this header exists in base non-section lines (ignoring comments)
            isDuplicateHeader = baseParsed.nonSectionLines.some(bl => {
                const blMatch = bl.match(/^([a-z0-9_]+:)(\s*#.*)?$/);
                return blMatch && blMatch[1] === cleanHeader;
            });
        }

        if (isDuplicateHeader) continue;
        result.push(line);
    }

    // Fix: Sanitize all lines to remove trailing whitespace
    return result.map(l => l.trimEnd()).join('\n');
}
