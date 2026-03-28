import { describe, expect, it, vi } from 'vitest';

import { YamlGenerator } from '../../js/io/adapters/yaml_generator.js';

vi.mock('../../js/io/adapters/yaml_generator_sections.js', () => ({
    getStayAwakeEntityId: vi.fn(() => 'input_boolean.demo'),
    generateInstructionHeader: vi.fn(() => ['header']),
    generateSystemSections: vi.fn(() => ['system']),
    generateStayAwakeSection: vi.fn(() => ['stay-awake']),
    generateFirmwareGuardGlobals: vi.fn(() => ['globals'])
}));

vi.mock('../../js/io/adapters/yaml_generator_scripts.js', () => ({
    generateScriptSection: vi.fn(() => ['script'])
}));

describe('YamlGenerator', () => {
    it('delegates section generation to the leaf helper modules', async () => {
        const sections = await import('../../js/io/adapters/yaml_generator_sections.js');
        const scripts = await import('../../js/io/adapters/yaml_generator_scripts.js');
        const generator = new YamlGenerator();

        expect(generator.getStayAwakeEntityId({})).toBe('input_boolean.demo');
        expect(generator.generateInstructionHeader({}, {}, false)).toEqual(['header']);
        expect(generator.generateSystemSections({}, {})).toEqual(['system']);
        expect(generator.generateStayAwakeSection({})).toEqual(['stay-awake']);
        expect(generator.generateFirmwareGuardGlobals({})).toEqual(['globals']);
        expect(generator.generateScriptSection({}, [], {})).toEqual(['script']);

        expect(sections.getStayAwakeEntityId).toHaveBeenCalled();
        expect(sections.generateInstructionHeader).toHaveBeenCalledWith({}, {}, false);
        expect(sections.generateSystemSections).toHaveBeenCalled();
        expect(sections.generateStayAwakeSection).toHaveBeenCalled();
        expect(sections.generateFirmwareGuardGlobals).toHaveBeenCalled();
        expect(scripts.generateScriptSection).toHaveBeenCalledWith({}, [], {});
    });
});
