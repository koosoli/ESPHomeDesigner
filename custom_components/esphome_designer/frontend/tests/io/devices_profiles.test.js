import { describe, expect, it, vi } from 'vitest';

import { YamlGenerator } from '../../js/io/adapters/yaml_generator.js';
import { generateBinarySensorSection, generatePSRAMSection } from '../../js/io/hardware_generators.js';

const fetchDynamicHardwareProfilesMock = vi.fn(async () => []);
const getOfflineProfilesFromStorageMock = vi.fn(() => ({}));
const emitMock = vi.fn();

vi.mock('../../js/utils/logger.js', () => ({
    Logger: { log: vi.fn(), warn: vi.fn(), error: vi.fn() }
}));

vi.mock('../../js/io/hardware_profile_sources.js', () => ({
    fetchDynamicHardwareProfiles: fetchDynamicHardwareProfilesMock,
    getOfflineProfilesFromStorage: getOfflineProfilesFromStorageMock
}));

vi.mock('../../js/core/events.js', () => ({
    emit: emitMock,
    EVENTS: { DEVICE_PROFILES_UPDATED: 'device-profiles-updated' }
}));

describe('built-in device profiles', async () => {
    const devices = await import('../../js/io/devices.js');

    it('includes the Lilygo T5 4.7 profile as built-in but untested', () => {
        const profile = devices.DEVICE_PROFILES.lilygo_t5_47;

        expect(profile).toBeTruthy();
        expect(profile.name).toContain('Lilygo T5 4.7');
        expect(profile.displayPlatform).toBe('t547');
        expect(profile.resolution).toEqual({ width: 960, height: 540 });
        expect(profile.isUntestedProfile).toBe(true);
        expect(profile.external_components?.join('\n')).toContain('cjb0001/esphome-components');
        expect(profile.system_section_overrides?.esp32?.join('\n')).toContain('type: arduino');
    });

    it('excludes untested built-ins from the tested profile id list', () => {
        expect(devices.SUPPORTED_DEVICE_IDS).not.toContain('lilygo_t5_47');
        expect(devices.SUPPORTED_DEVICE_IDS).toContain('reterminal_e1001');
    });

    it('surfaces the corrected JC4832W535 board id while hiding the legacy alias', () => {
        const profile = devices.DEVICE_PROFILES.guition_esp32_jc4832w535;
        const legacy = devices.DEVICE_PROFILES.guition_esp32_jc8048w535;

        expect(profile).toBeTruthy();
        expect(profile.name).toContain('JC4832W535');
        expect(profile.hardwarePackage).toBe('hardware/guition-esp32-jc8048w535.yaml');
        expect(profile.displayModel).toBe('JC4832W535');
        expect(devices.SUPPORTED_DEVICE_IDS).toContain('guition_esp32_jc4832w535');

        expect(legacy).toBeTruthy();
        expect(legacy.isUntestedProfile).toBe(true);
        expect(devices.SUPPORTED_DEVICE_IDS).not.toContain('guition_esp32_jc8048w535');
    });

    it('recomputes supported ids after loading external profiles', async () => {
        fetchDynamicHardwareProfilesMock.mockResolvedValueOnce([
            {
                id: 'custom_dynamic_board',
                name: 'Custom Dynamic Board',
                resolution: { width: 320, height: 240 },
                features: { lcd: true }
            },
            {
                id: 'custom_untested_board',
                name: 'Custom Untested Board',
                resolution: { width: 320, height: 240 },
                isUntestedProfile: true
            }
        ]);
        getOfflineProfilesFromStorageMock.mockReturnValueOnce({
            custom_offline_board: {
                id: 'custom_offline_board',
                name: 'Custom Offline Board',
                resolution: { width: 400, height: 300 }
            }
        });

        await devices.loadExternalProfiles();

        expect(devices.SUPPORTED_DEVICE_IDS).toContain('custom_dynamic_board');
        expect(devices.SUPPORTED_DEVICE_IDS).toContain('custom_offline_board');
        expect(devices.SUPPORTED_DEVICE_IDS).not.toContain('custom_untested_board');
        expect(emitMock).toHaveBeenCalledWith('device-profiles-updated');
    });

    it('merges dynamic features without dropping built-in feature flags', () => {
        const merged = devices.mergeDeviceProfile(
            { features: { psram: true, epaper: true }, chip: 'esp32-s3' },
            { features: { touch: true }, chip: 'esp32' }
        );

        expect(merged.features).toEqual({ psram: true, epaper: true, touch: true });
        expect(merged.chip).toBe('esp32');
    });

    it('applies Lilygo-specific commented system overrides and psram speed', () => {
        const profile = devices.DEVICE_PROFILES.lilygo_t5_47;
        const generator = new YamlGenerator();

        const headerLines = generator.generateInstructionHeader(profile, {}, true);
        const systemLines = generator.generateSystemSections(profile, {});
        const psramLines = generatePSRAMSection(profile);
        const binaryLines = generateBinarySensorSection(profile, 1, 'epaper_display', []);
        const scriptLines = generator.generateScriptSection({ refreshInterval: 600 }, [{ name: 'Overview' }], profile);

        expect(headerLines.join('\n')).toContain('#         - Framework: Arduino 3.x (required by the t547 component)');
        expect(headerLines.join('\n')).toContain('#         - Select: ESP32');
        expect(headerLines.join('\n')).toContain('#         - Framework: Arduino 3.x (required by the t547 component)');
        expect(headerLines.join('\n')).toContain('#         - System sections (esphome, esp32) are auto-commented');
        expect(headerLines.join('\n')).toContain('# Deep Sleep Interval: Disabled');
        expect(systemLines.join('\n')).toContain('#   framework:');
        expect(systemLines.join('\n')).toContain('#     type: arduino');
        expect(systemLines.join('\n')).toContain('#   flash_size: 16MB');
        expect(systemLines.join('\n')).toContain('#   platformio_options:');
        expect(psramLines).toContain('  speed: 80MHz');
        expect(binaryLines.join('\n')).not.toContain('name: "Left Button"');
        expect(binaryLines.join('\n')).not.toContain('name: "Right Button"');
        expect(binaryLines.join('\n')).toContain('name: "Refresh Button"');
        expect(scriptLines.join('\n')).not.toContain('bool is_sleep_time = false;');
        expect(scriptLines.join('\n')).not.toContain('int start = 0;');
        expect(scriptLines.join('\n')).not.toContain('int end = 0;');
    });
});
