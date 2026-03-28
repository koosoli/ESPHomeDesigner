import { describe, expect, it } from 'vitest';

import {
    generateFirmwareGuardGlobals,
    generateInstructionHeader,
    generateStayAwakeSection,
    generateSystemSections,
    getStayAwakeEntityId
} from '../../js/io/adapters/yaml_generator_sections.js';

describe('yaml_generator_sections', () => {
    it('normalizes stay-awake ids and builds esp8266 guidance without icon copy steps', () => {
        const lines = generateInstructionHeader({
            id: 'demo8266',
            name: 'Demo 8266',
            chip: 'esp8266',
            features: { lcd: true, psram: true }
        }, {
            orientation: 'portrait',
            darkMode: true,
            refreshInterval: 30,
            manualRefreshOnly: true,
            deepSleepEnabled: false,
            deepSleepStayAwakeSwitch: true,
            deepSleepStayAwakeEntityId: '  input_boolean.panel_awake  ',
            deepSleepFirmwareGuard: false
        }, false).join('\n');

        expect(getStayAwakeEntityId({
            deepSleepStayAwakeEntityId: '  input_boolean.panel_awake  '
        })).toBe('input_boolean.panel_awake');
        expect(lines).not.toContain('Material Design Icons');
        expect(lines).toContain('Select: ESP8266');
        expect(lines).toContain('Framework: Arduino (Default)');
        expect(lines).toContain('Power Strategy: Manual Refresh Only');
        expect(lines).toContain('Deep Sleep Stay Awake Entity: input_boolean.panel_awake');
    });

    it('generates commented coreink system sections and un-commented deep sleep for epaper layouts', () => {
        const lines = generateSystemSections({
            name: 'CoreInk',
            chip: 'esp32-s3',
            board: 'm5stack-coreink',
            features: { epaper: true }
        }, {
            plugin_includes: ['custom/include.h'],
            autoCycleEnabled: true,
            deepSleepEnabled: true,
            deepSleepInterval: 300
        }).join('\n');

        expect(lines).toContain('#   includes:');
        expect(lines).toContain('#     - custom/include.h');
        expect(lines).toContain('gpio_set_direction(GPIO_NUM_12, GPIO_MODE_OUTPUT);');
        expect(lines).toContain('#       - script.execute: auto_cycle_timer');
        expect(lines).toContain('deep_sleep:');
        expect(lines).toContain('sleep_duration: 300s');
    });

    it('builds stay-awake and firmware-guard globals only when the deep sleep features are enabled', () => {
        const stayAwake = generateStayAwakeSection({
            deepSleepEnabled: true,
            deepSleepStayAwakeSwitch: true,
            deepSleepStayAwakeEntityId: 'input_boolean.keep_awake',
            deepSleepFirmwareGuard: true
        }).join('\n');
        const globals = generateFirmwareGuardGlobals({
            deepSleepEnabled: true,
            deepSleepFirmwareGuard: true
        }).join('\n');

        expect(stayAwake).toContain('entity_id: input_boolean.keep_awake');
        expect(stayAwake).toContain('deep_sleep.prevent: deep_sleep_control');
        expect(stayAwake).toContain('return id(is_new_flash);');
        expect(globals).toContain('id: firmware_fingerprint');
        expect(globals).toContain("initial_value: 'false'");
        expect(generateStayAwakeSection({
            deepSleepEnabled: false,
            deepSleepStayAwakeSwitch: true
        })).toEqual([]);
        expect(generateFirmwareGuardGlobals({
            deepSleepEnabled: true,
            deepSleepFirmwareGuard: false
        })).toEqual([]);
    });
});
