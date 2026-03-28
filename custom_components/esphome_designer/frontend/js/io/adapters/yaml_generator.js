/**
 * Modular YAML generator for ESPHome.
 * Handles the structural components of the generated configuration.
 */
import {
    generateFirmwareGuardGlobals as generateFirmwareGuardGlobalsSection,
    generateInstructionHeader as generateInstructionHeaderSection,
    generateStayAwakeSection as generateStayAwakeSectionSection,
    generateSystemSections as generateSystemSectionsSection,
    getStayAwakeEntityId as getStayAwakeEntityIdSection
} from './yaml_generator_sections.js';
import { generateScriptSection as generateScriptSectionSection } from './yaml_generator_scripts.js';

export class YamlGenerator {
    /**
     * @param {Object} payload
     * @returns {string}
     */
    getStayAwakeEntityId(payload) {
        return getStayAwakeEntityIdSection(payload);
    }

    /**
     * Generates the instruction header with setup guidance.
     * @param {Object} profile
     * @param {Object} layout
     * @param {boolean} [requiresMaterialIcons]
     * @returns {string[]}
     */
    generateInstructionHeader(profile, layout, requiresMaterialIcons = true) {
        return generateInstructionHeaderSection(profile, layout, requiresMaterialIcons);
    }

    /**
     * Generates a template of system sections, commented out.
     * @param {Object} profile
     * @param {Object} layout
     * @returns {string[]}
     */
    generateSystemSections(profile, layout) {
        return generateSystemSectionsSection(profile, layout);
    }

    /**
     * Generates the stay-awake binary sensor if the feature is enabled.
     * @param {Object} payload
     * @returns {string[]}
     */
    generateStayAwakeSection(payload) {
        return generateStayAwakeSectionSection(payload);
    }

    /**
     * Generates the firmware fingerprint globals if the guard feature is enabled.
     * @param {Object} payload
     * @returns {string[]}
     */
    generateFirmwareGuardGlobals(payload) {
        return generateFirmwareGuardGlobalsSection(payload);
    }

    /**
     * Generates the script section for page switching and sleep management.
     * @param {Object} payload
     * @param {Object[]} pages
     * @param {Object} profile
     * @returns {string[]}
     */
    generateScriptSection(payload, pages, profile) {
        return generateScriptSectionSection(payload, pages, profile);
    }
}
