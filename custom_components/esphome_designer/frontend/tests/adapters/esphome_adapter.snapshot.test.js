import { describe, it, expect, vi } from 'vitest';
import { mergeYamlSections, applyPackageOverrides } from '../../js/io/generators/yaml_merger.js';

vi.mock('../../js/utils/logger.js', () => ({
  Logger: { log: vi.fn(), error: vi.fn(), warn: vi.fn(), info: vi.fn() }
}));

describe('ESPHomeAdapter Legacy Functions Snapshot', () => {

  describe('mergeYamlSections', () => {
    it('should merge baseYaml and extraYaml exactly as before', () => {
      const baseYaml = `
# This is a base file
esphome:
  name: test_device

sensor:
  - platform: template
    name: "Base Sensor"
    id: base_sensor

font:
  - file: "g0v4.ttf"
    id: font1
`;
      const extraYaml = `
sensor:
  - platform: wifi_signal
    name: "WiFi"
    
font:
  - file: "arial.ttf"
    id: font2
    
binary_sensor:
  - platform: status
    name: "Status"

esphome:
  build_path: build/test
`;

      const merged = mergeYamlSections(baseYaml, extraYaml);
      expect(merged).toMatchSnapshot();
    });
  });

  describe('applyPackageOverrides', () => {
    it('should apply rotation and transform overrides correctly', () => {
      const yaml = `
display:
  - platform: st7789v
    rotation: 0

touchscreen:
  - platform: gt911
    id: my_touchscreen
    interrupt_pin: 4
`;
      const profile = {
        name: "Waveshare Touch LCD 7",
        resolution: { width: 800, height: 480 } // native landscape
      };

      // portrait orientation means width < height, so we request swapping
      const result1 = applyPackageOverrides(yaml, profile, 'portrait', false, {});
      expect(result1).toMatchSnapshot('portrait_rotation_90_with_transform');

      const result2 = applyPackageOverrides(yaml, profile, 'landscape_inverted', false, {});
      expect(result2).toMatchSnapshot('landscape_inverted_rotation_180');
    });

    it('should modify lvgl auto_clear_enabled', () => {
      const yaml = `
lvgl:
  auto_clear_enabled: true
`;
      const result = applyPackageOverrides(yaml, {}, 'landscape', true, {});
      expect(result).toMatchSnapshot('lvgl_auto_clear_false');
    });
  });
});
