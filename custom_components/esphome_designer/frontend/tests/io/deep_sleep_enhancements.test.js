import { describe, it, expect } from 'vitest';
import { YamlGenerator } from '../../js/io/adapters/yaml_generator.js';

const gen = new YamlGenerator();

const epaperProfile = {
    features: { epaper: true },
    chip: 'esp32-s3',
    board: 'esp32-s3-devkitc-1',
};

const pages = [{ name: 'Page 1', widgets: [] }];

describe('Deep Sleep Enhancements (Issue #310)', () => {
    describe('Stay-Awake Switch', () => {
        it('emits stay_awake_switch binary sensor when feature is enabled', () => {
            const payload = {
                deepSleepEnabled: true,
                deepSleepStayAwakeSwitch: true,
                deepSleepStayAwakeEntityId: 'input_boolean.office_panel_awake'
            };
            const lines = gen.generateStayAwakeSection(payload);
            const yaml = lines.join('\n');
            expect(yaml).toContain('id: stay_awake_switch');
            expect(yaml).toContain('platform: homeassistant');
            expect(yaml).toContain('input_boolean.office_panel_awake');
        });

        it('does not emit stay_awake_switch when deepSleepEnabled is false', () => {
            const payload = { deepSleepEnabled: false, deepSleepStayAwakeSwitch: true };
            const lines = gen.generateStayAwakeSection(payload);
            expect(lines.length).toBe(0);
        });

        it('guards deep_sleep.enter with stay_awake_switch in deep_sleep_cycle', () => {
            const payload = { deepSleepEnabled: true, deepSleepStayAwakeSwitch: true };
            const lines = gen.generateScriptSection(payload, pages, epaperProfile);
            const scriptYaml = lines.join('\n');

            // Keep a single stay-awake guard around the deep_sleep.enter action.
            expect(scriptYaml).not.toContain('binary_sensor.is_on: stay_awake_switch');
            expect(scriptYaml).not.toContain('script.stop: deep_sleep_cycle');
            expect(scriptYaml).not.toContain('- return:');
            expect((scriptYaml.match(/deep_sleep\.prevent: deep_sleep_control/g) || []).length).toBeGreaterThanOrEqual(1);
            expect(scriptYaml).toContain('condition:');
            expect(scriptYaml).toContain('binary_sensor.is_off: stay_awake_switch');
            // The else block must delay and re-execute
            expect(scriptYaml).toContain('delay: 60s');
            expect(scriptYaml).toContain('script.execute: deep_sleep_cycle');
        });

        it('keeps deep sleep blocked when firmware guard is still active', () => {
            const payload = {
                deepSleepEnabled: true,
                deepSleepStayAwakeSwitch: true,
                deepSleepFirmwareGuard: true
            };
            const lines = gen.generateStayAwakeSection(payload);
            const yaml = lines.join('\n');

            expect(yaml).toContain("lambda: 'return id(is_new_flash);'");
            expect(yaml).toContain('Deep sleep still prevented by firmware guard');
        });
    });

    describe('Firmware Fingerprint Guard', () => {
        it('emits globals when feature is enabled', () => {
            const payload = { deepSleepEnabled: true, deepSleepFirmwareGuard: true };
            const lines = gen.generateFirmwareGuardGlobals(payload);
            const yaml = lines.join('\n');
            expect(yaml).toContain('id: firmware_fingerprint');
            expect(yaml).toContain('id: is_new_flash');
        });

        it('emits fingerprint check inside manage_run_and_sleep', () => {
            const payload = { deepSleepEnabled: true, deepSleepFirmwareGuard: true };
            const lines = gen.generateScriptSection(payload, pages, epaperProfile);
            const scriptYaml = lines.join('\n');
            expect(scriptYaml).toContain('__DATE__ " " __TIME__');
            expect(scriptYaml).toContain('if (id(firmware_fingerprint) != current_hash)');
        });

        it('emits 90s delay before deep sleep when new flash detected', () => {
            const payload = { deepSleepEnabled: true, deepSleepFirmwareGuard: true };
            const lines = gen.generateScriptSection(payload, pages, epaperProfile);
            const scriptYaml = lines.join('\n');
            expect(scriptYaml).toContain("lambda: 'return id(is_new_flash);'");
            expect(scriptYaml).toContain('delay: 90s');
            expect(scriptYaml).toContain("lambda: 'id(is_new_flash) = false;'");
        });
    });

    describe('Night-time until-sleep', () => {
        it('uses until: <hour>:00:00 when sleep hours are configured', () => {
            const payload = { 
                deepSleepEnabled: true, 
                sleepEnabled: true, 
                sleepEndHour: 7,
                sleepStartHour: 23
            };
            const lines = gen.generateScriptSection(payload, pages, epaperProfile);
            const scriptYaml = lines.join('\n');
            expect(scriptYaml).toContain('until: "07:00:00"');
            expect(scriptYaml).toContain('time_id: ha_time');
        });

        it('uses the sleep window as the trigger for long overnight sleep', () => {
            const payload = {
                deepSleepEnabled: true,
                sleepEnabled: true,
                sleepEndHour: 7,
                sleepStartHour: 23
            };
            const scriptYaml = gen.generateScriptSection(payload, pages, epaperProfile).join('\n');

            expect(scriptYaml).toContain('if (hour >= start || hour < end) return true;');
            expect(scriptYaml).toContain('else:');
            expect(scriptYaml).toContain('component.update: epaper_display');
        });

        it('keeps manage_run_and_sleep sleep tracking active while adjusting refresh interval', () => {
            const payload = {
                deepSleepEnabled: true,
                sleepEnabled: true,
                sleepEndHour: 7,
                sleepStartHour: 23
            };
            const scriptYaml = gen.generateScriptSection(payload, pages, epaperProfile).join('\n');

            expect(scriptYaml).toContain('bool is_sleep_time = false;');
            expect(scriptYaml).toContain('int interval = id(page_refresh_default_s);');
            expect(scriptYaml).toContain('id(page_refresh_current_s) = interval;');
            expect(scriptYaml).toContain('Night-time sleep active, skipping display update.');
        });

        it('does not refresh the display before the overnight until-sleep branch', () => {
            const payload = {
                deepSleepEnabled: true,
                sleepEnabled: true,
                sleepEndHour: 7,
                sleepStartHour: 23
            };
            const scriptYaml = gen.generateScriptSection(payload, pages, epaperProfile).join('\n');

            expect(scriptYaml).toContain('then:');
            expect(scriptYaml).toContain('Entering Night-time Deep Sleep...');
        });

        it('uses regular deep_sleep.enter when sleep hours are NOT configured', () => {
            const payload = { deepSleepEnabled: true, sleepEnabled: false };
            const lines = gen.generateScriptSection(payload, pages, epaperProfile);
            const scriptYaml = lines.join('\n');
            expect(scriptYaml).not.toContain('until: "');
        });
    });
});
