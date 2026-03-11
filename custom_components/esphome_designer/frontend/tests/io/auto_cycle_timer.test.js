/**
 * Tests for issue #299 – auto_cycle_timer must be started from
 * manage_run_and_sleep so page cycling works without uncommenting on_boot.
 */
import { describe, it, expect } from 'vitest';
import { YamlGenerator } from '../../js/io/adapters/yaml_generator.js';

const gen = new YamlGenerator();

const epaperProfile = {
    features: { epaper: true },
    chip: 'esp32-s3',
    board: 'esp32-s3-devkitc-1',
};

const lcdProfile = {
    features: { lcd: true },
    chip: 'esp32-s3',
    board: 'esp32-s3-devkitc-1',
};

const twoPages = [
    { name: 'Page 1', widgets: [] },
    { name: 'Page 2', widgets: [] },
];

const onePage = [{ name: 'Page 1', widgets: [] }];

// ────────────────────────────────────────────────────────
// Core fix: auto_cycle_timer started inside manage_run_and_sleep
// ────────────────────────────────────────────────────────
describe('auto_cycle_timer inside manage_run_and_sleep (issue #299)', () => {
    it('emits script.execute: auto_cycle_timer inside manage_run_and_sleep when autoCycleEnabled + multi-page', () => {
        const lines = gen.generateScriptSection(
            { autoCycleEnabled: true, autoCycleIntervalS: 15 },
            twoPages,
            epaperProfile,
        );
        const yaml = lines.join('\n');

        // The auto_cycle_timer definition must exist
        expect(yaml).toContain('- id: auto_cycle_timer');

        // It must be kicked off INSIDE manage_run_and_sleep (before the lambda)
        const mrsIdx = lines.findIndex(l => l.includes('- id: manage_run_and_sleep'));
        const kickIdx = lines.findIndex((l, i) => i > mrsIdx && l.trim() === '- script.execute: auto_cycle_timer');
        const lambdaIdx = lines.findIndex((l, i) => i > mrsIdx && l.includes('- lambda: |-'));
        expect(kickIdx).toBeGreaterThan(mrsIdx);
        expect(kickIdx).toBeLessThan(lambdaIdx);
    });

    it('does NOT emit auto_cycle_timer start when autoCycleEnabled is false', () => {
        const lines = gen.generateScriptSection(
            { autoCycleEnabled: false },
            twoPages,
            epaperProfile,
        );
        const yaml = lines.join('\n');
        expect(yaml).not.toContain('auto_cycle_timer');
    });

    it('does NOT emit auto_cycle_timer when only one page exists', () => {
        const lines = gen.generateScriptSection(
            { autoCycleEnabled: true },
            onePage,
            epaperProfile,
        );
        const yaml = lines.join('\n');
        // Single page → cycling is pointless; the flag should be ignored
        expect(yaml).not.toContain('auto_cycle_timer');
    });

    it('uses the custom interval from autoCycleIntervalS', () => {
        const lines = gen.generateScriptSection(
            { autoCycleEnabled: true, autoCycleIntervalS: 60 },
            twoPages,
            lcdProfile,
        );
        const yaml = lines.join('\n');
        expect(yaml).toContain('- delay: 60s');
    });

    it('defaults cycle interval to 30s when autoCycleIntervalS is not set', () => {
        const lines = gen.generateScriptSection(
            { autoCycleEnabled: true },
            twoPages,
            epaperProfile,
        );
        const yaml = lines.join('\n');
        expect(yaml).toContain('- delay: 30s');
    });

    it('auto_cycle_timer re-calls itself for continuous cycling', () => {
        const lines = gen.generateScriptSection(
            { autoCycleEnabled: true },
            twoPages,
            epaperProfile,
        );
        // auto_cycle_timer definition
        const timerDefIdx = lines.findIndex(l => l.includes('- id: auto_cycle_timer'));
        expect(timerDefIdx).toBeGreaterThan(-1);

        // There should be exactly two "- script.execute: auto_cycle_timer" lines:
        // 1) Inside manage_run_and_sleep (kicks it off)
        // 2) At the end of auto_cycle_timer body (self-recursive)
        const execLines = lines
            .map((l, i) => ({ line: l.trim(), idx: i }))
            .filter(({ line }) => line === '- script.execute: auto_cycle_timer');

        expect(execLines.length).toBe(2);

        // First call must be BEFORE the timer definition (inside manage_run_and_sleep)
        expect(execLines[0].idx).toBeLessThan(timerDefIdx);

        // Second call must be AFTER the timer definition (self-recursive)
        expect(execLines[1].idx).toBeGreaterThan(timerDefIdx);
    });
});
