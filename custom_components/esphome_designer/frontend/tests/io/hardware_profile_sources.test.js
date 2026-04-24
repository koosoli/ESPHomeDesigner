import { describe, it, expect } from 'vitest';
import { parseHardwareRecipeClientSide } from '../../js/io/hardware_profile_sources.js';

describe('hardware_profile_sources', () => {
    it('parses the ViewDisplay round TFT knob recipe metadata and features', () => {
        const yaml = `
# Name: ViewDisplay ESP32 Round TFT Knob 2.1" UEDX48480021-MD80ET
# Resolution: 480x480
# Shape: round

esp32:
  board: esp32-s3-devkitc-1

psram:
  mode: octal
  speed: 80MHz

display:
  - platform: st7701s
    id: my_display
    dimensions:
      width: 480
      height: 480
    # __LAMBDA_PLACEHOLDER__

touchscreen:
  - platform: cst816
    id: my_touchscreen
`;

        const profile = parseHardwareRecipeClientSide(yaml, 'viewdisplay-esp32-s3-uedx48480021.yaml');

        expect(profile.name).toBe('ViewDisplay ESP32 Round TFT Knob 2.1" UEDX48480021-MD80ET');
        expect(profile.shape).toBe('round');
        expect(profile.resolution).toEqual({ width: 480, height: 480 });
        expect(profile.board).toBe('esp32-s3-devkitc-1');
        expect(profile.displayPlatform).toBe('st7701s');
        expect(profile.features.psram).toBe(true);
        expect(profile.features.lcd).toBe(true);
        expect(profile.features.touch).toBe(true);
        expect(profile.features.epaper).toBe(false);
        expect(profile.hardwarePackage).toBeUndefined();
    });

    it('detects ESP32-P4 boards from esp32 variants and board ids', () => {
        const yaml = `
# Name: Waveshare ESP32-P4 Panel
# Resolution: 800x480
# Shape: rect

esp32:
  board: esp32-p4-evboard
  variant: esp32p4

display:
  - platform: ili9xxx
    id: my_display
`;

        const profile = parseHardwareRecipeClientSide(yaml, 'waveshare-esp32-p4.yaml');

        expect(profile.chip).toBe('esp32-p4');
        expect(profile.board).toBe('esp32-p4-evboard');
        expect(profile.displayPlatform).toBe('ili9xxx');
    });
});
