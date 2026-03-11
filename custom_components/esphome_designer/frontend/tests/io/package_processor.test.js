import { describe, it, expect } from 'vitest';
import { processPackageContent, sanitizePackageContent } from '../../js/io/adapters/package_processor.js';

describe('Package Processor', () => {

  describe('sanitizePackageContent', () => {
    it('comments out system-level block keys', () => {
      const yaml = `
esphome:
  name: test
  
wifi:
  ssid: "network"

font:
  - file: "font.ttf"
            `.trim();

      const sanitized = sanitizePackageContent(yaml);

      expect(sanitized).toContain('# esphome: # (Auto-commented)');
      expect(sanitized).toContain('# wifi: # (Auto-commented)');

      expect(sanitized).toContain('#   name: test');
      expect(sanitized).toContain('#   ssid: "network"');

      // Should NOT comment non-system keys that are at root
      expect(sanitized).toContain('font:');
      expect(sanitized).toContain('  - file: "font.ttf"');
    });

    it('handles deep_sleep correctly', () => {
      const yaml = "deep_sleep:\n  run_duration: 10s";
      const sanitized = sanitizePackageContent(yaml);
      expect(sanitized).toContain('# deep_sleep: # (Auto-commented)');
      expect(sanitized).toContain('#   run_duration: 10s');
    });
  });

  describe('processPackageContent', () => {
    const mockProfile = { isPackageBased: true };
    const mockLayout = { orientation: 'landscape', width: 800, height: 480 };
    const mockLines = ["display:", "  - platform: whatever", "font:", "  - file: x"];

    it('injects lambda content at the placeholder preserving indentation', () => {
      const packageYaml = `
display:
  - platform: x
    # __LAMBDA_PLACEHOLDER__
    id: disp
            `.trim();

      const lambdaLines = ["it.print(0, 0, id(font1), \"Hello\");"];

      const result = processPackageContent(packageYaml, lambdaLines, [], mockProfile, mockLayout, false, mockLines);

      // Should inject the lambda header
      expect(result).toContain('    lambda: |-');
      // Should preserve the 4-space indent of the placeholder plus 2 spaces for the lambda content
      expect(result).toContain('      it.print(0, 0, id(font1), "Hello");');
    });

    it('skips lambda injection if isLvgl is true', () => {
      const packageYaml = `
display:
  - platform: x
    # __LAMBDA_PLACEHOLDER__
    id: disp
            `.trim();
      const lambdaLines = ["it.print(0, 0, id(font1), \"Hello\");"];

      // isLvgl = true
      const result = processPackageContent(packageYaml, lambdaLines, [], mockProfile, mockLayout, true, mockLines);

      // Should NOT inject lambda
      expect(result).not.toContain('lambda: |-');
      expect(result).not.toContain('it.print');
    });

    it('injects touch sensors at the placeholder', () => {
      const packageYaml = `
binary_sensor:
  # __TOUCH_SENSORS_PLACEHOLDER__
  - platform: gpio
            `.trim();

      const touchSensors = [
        "  - platform: touchscreen",
        "    id: btn1",
        "    x_min: 0"
      ];

      const result = processPackageContent(packageYaml, [], touchSensors, mockProfile, mockLayout, false, mockLines);

      expect(result).toContain('  - platform: touchscreen');
      expect(result).toContain('    id: btn1');
    });

    it('removes touch placeholder if no touch sensors provided', () => {
      const packageYaml = `
binary_sensor:
  # __TOUCH_SENSORS_PLACEHOLDER__
  - platform: gpio
            `.trim();

      const result = processPackageContent(packageYaml, [], [], mockProfile, mockLayout, false, mockLines);
      expect(result).not.toContain('__TOUCH_SENSORS_PLACEHOLDER__');
    });
  });

});
