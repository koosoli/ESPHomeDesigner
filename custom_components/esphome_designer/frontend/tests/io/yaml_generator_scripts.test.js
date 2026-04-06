import { describe, expect, it } from 'vitest';

import { generateScriptSection } from '../../js/io/adapters/yaml_generator_scripts.js';

describe('yaml_generator_scripts', () => {
    it('generates lcd page switching, visibility logic, refresh overrides, and auto-cycling', () => {
        const lines = generateScriptSection({
            autoCycleEnabled: true,
            autoCycleIntervalS: 45,
            lcdEcoStrategy: 'backlight_off',
            refreshInterval: 10
        }, [
            { refresh_s: '15' },
            { visible_from: '08:00', visible_to: '17:00', refresh_type: 'daily', refresh_time: '12:30' }
        ], {
            features: { lcd: true },
            backlight: { pin: 'GPIO1' }
        }).join('\n');

        expect(lines).toContain('id: change_page_to');
        expect(lines).toContain('Page change ignored (debounce)');
        expect(lines).toContain('id(my_display).update();');
        expect(lines).toContain('id(backlight_pwm).set_level(0.8);');
        expect(lines).toContain('id(last_page_switch_time) = now;');
        expect(lines).not.toContain('id(last_page_switch_time) = millis();');
        expect(lines).toContain('Auto-switching to scheduled page %d');
        expect(lines).not.toContain('best_page != p || id(last_page_switch_time) == 0');
        expect(lines).toContain('Waiting 5s for initial sensor updates...');
        expect(lines).toContain("lambda: 'return id(initial_sensor_sync_pending);'");
        expect(lines).toContain("lambda: 'id(initial_sensor_sync_pending) = false;'");
        expect(lines).toContain('interval = diff * 60;');
        expect(lines).toContain('id: auto_cycle_timer');
        expect(lines).toContain('delay: 45s');
    });

    it('generates deep sleep guard logic, stay-awake retries, and firmware fingerprinting for epaper profiles', () => {
        const lines = generateScriptSection({
            deepSleepEnabled: true,
            deepSleepStayAwakeSwitch: true,
            deepSleepFirmwareGuard: true,
            sleepEnabled: true,
            sleepStartHour: 22,
            sleepEndHour: 6
        }, [
            { refresh_s: '300' }
        ], {
            features: { epaper: true }
        }).join('\n');

        expect(lines).toContain('id: deep_sleep_cycle');
        expect(lines).toContain('binary_sensor.is_off: stay_awake_switch');
        expect(lines).toContain('staying awake 90s to prevent rollback');
        expect(lines).toContain('delay: 90s');
        expect(lines).toContain('deep_sleep.enter:');
        expect(lines).toContain('until: "06:00:00"');
        expect(lines).toContain('std::string version_str = __DATE__ " " __TIME__;');
        expect(lines).toContain('id(firmware_fingerprint) != current_hash');
        expect(lines).not.toContain('Stay-awake active, deep sleep cycle aborted.');
        expect((lines.match(/deep_sleep\.prevent: deep_sleep_control/g) || []).length).toBeGreaterThan(1);
        expect((lines.match(/delay: 5s/g) || []).length).toBe(1);
    });

    it('stops the automatic refresh loop in manual refresh mode', () => {
        const lines = generateScriptSection({
            manualRefreshOnly: true,
            sleepEnabled: true,
            sleepStartHour: 1,
            sleepEndHour: 5
        }, [
            { refresh_s: '60' }
        ], {
            features: { oled: true }
        }).join('\n');

        expect(lines).toContain('Manual Refresh Only mode: stopping automatic refresh loop.');
        expect(lines).not.toContain("delay: !lambda 'return id(page_refresh_current_s) * 1000;'");
        expect(lines).not.toContain('script.execute: manage_run_and_sleep');
    });

    it('handles overnight visibility windows that cross midnight', () => {
        const lines = generateScriptSection({
            refreshInterval: 60
        }, [
            { visible_from: '22:00', visible_to: '06:00' },
            { refresh_s: '30' }
        ], {
            features: { lcd: true }
        }).join('\n');

        expect(lines).toContain('(curr_min >= 1320 || curr_min < 360)');
        expect(lines).toContain('if (best_page == -1) best_page = 1;');
    });

    it('logs the LCD-managed update branch for hybrid deep-sleep displays', () => {
        const lines = generateScriptSection({
            deepSleepEnabled: true,
            sleepEnabled: true,
            sleepStartHour: 23,
            sleepEndHour: 7
        }, [
            { refresh_s: '120' }
        ], {
            features: { oled: true, epaper: true }
        }).join('\n');

        expect(lines).toContain('Display update managed by hardware timer.');
        expect(lines).toContain('Night-time sleep active, skipping display update.');
    });

    it('omits single-page change_page_to script and debounce global references', () => {
        const lines = generateScriptSection({
            refreshInterval: 60
        }, [
            { refresh_s: '30' }
        ], {
            features: { lcd: true }
        }).join('\n');

        expect(lines).toContain('script:');
        expect(lines).toContain('id: manage_run_and_sleep');
        expect(lines).not.toContain('id: change_page_to');
        expect(lines).not.toContain('id(last_page_switch_time)');
    });
});
