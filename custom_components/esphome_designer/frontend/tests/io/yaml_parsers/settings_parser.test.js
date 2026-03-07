import { describe, it, expect } from 'vitest';
import { parseSettings } from '../../../js/io/yaml_parsers/settings_parser.js';

describe('Settings Parser (Issue #310 Roundtrip)', () => {
    it('parses deepSleepStayAwakeSwitch config correctly', () => {
        const lines = [
            '# Deep Sleep Stay Awake Switch: enabled'
        ];
        expect(parseSettings(lines, {}).deep_sleep_stay_awake_switch).toBe(true);
        
        const linesDisabled = [
            '# Deep Sleep Stay Awake Switch: disabled'
        ];
        expect(parseSettings(linesDisabled, {}).deep_sleep_stay_awake_switch).toBe(false);
    });

    it('parses deepSleepFirmwareGuard config correctly', () => {
        const lines = [
            '# Deep Sleep Firmware Guard: enabled'
        ];
        expect(parseSettings(lines, {}).deep_sleep_firmware_guard).toBe(true);

        const linesDisabled = [
            '# Deep Sleep Firmware Guard: disabled'
        ];
        expect(parseSettings(linesDisabled, {}).deep_sleep_firmware_guard).toBe(false);
    });

    it('parses stay-awake helper entity id correctly', () => {
        const lines = [
            '# Deep Sleep Stay Awake Entity: input_boolean.kitchen_dashboard_awake'
        ];

        expect(parseSettings(lines, {}).deep_sleep_stay_awake_entity_id).toBe('input_boolean.kitchen_dashboard_awake');
    });
});
