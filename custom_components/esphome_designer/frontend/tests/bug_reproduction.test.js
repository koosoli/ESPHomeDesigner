import { describe, expect, it, vi } from 'vitest';
import { YamlGenerator } from '../js/io/adapters/yaml_generator.js';

vi.mock('../js/utils/logger.js', () => ({
    Logger: { log: vi.fn(), warn: vi.fn(), error: vi.fn() }
}));

describe('Bug Reproduction: is_sleep_time scoping', async () => {
    const devices = await import('../js/io/devices.js');

    it('generates correct scoping for is_sleep_time in PhotoPainter with Backlight strategy', () => {
        const profile = devices.DEVICE_PROFILES.esp32_s3_photopainter;
        const generator = new YamlGenerator();

        const settings = {
            sleepEnabled: true,
            sleepStartHour: 22,
            sleepEndHour: 7,
            lcdEcoStrategy: 'backlight_off',
            refreshInterval: 600
        };

        const pages = [{ name: 'Test Page', widgets: [] }];
        const scriptLines = generator.generateScriptSection(settings, pages, profile);
        const yaml = scriptLines.join('\n');

        // Check for declaration
        expect(yaml).toContain('bool is_sleep_time = false;');

        // Check for usage of !is_sleep_time (as reported in the bug)
        // The user reported: lambda: 'return !is_sleep_time;'
        // We want to see if this appears anywhere in the script section.
        expect(yaml).not.toContain("return !is_sleep_time;");

        // In the current code (0.9), it only uses !is_sleep_time if there are page refresh overrides.
        // It does use is_sleep_time for the backlight strategy though.
        expect(yaml).toContain('if (is_sleep_time) {');

        // Verify it is NOT using !lambda wrapper for this specific check 
        // which might be what 'lambda: return !is_sleep_time' refers to.
        expect(yaml).not.toContain("!lambda 'return !is_sleep_time;'");
    });
});
