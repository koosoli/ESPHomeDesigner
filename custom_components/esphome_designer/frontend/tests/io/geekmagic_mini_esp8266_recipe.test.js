import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { parseHardwareRecipeClientSide } from '../../js/io/hardware_profile_sources.js';

const here = dirname(fileURLToPath(import.meta.url));
const recipePath = resolve(here, '../../hardware/geekmagic-mini-esp8266.yaml');

describe('geekmagic-mini-esp8266 recipe', () => {
    const yaml = readFileSync(recipePath, 'utf8');
    const profile = parseHardwareRecipeClientSide(yaml, 'geekmagic-mini-esp8266.yaml');

    it('exposes the expected metadata', () => {
        expect(profile.name).toBe('GeekMagic Mini (ESP8266)');
        expect(profile.resolution).toEqual({ width: 240, height: 240 });
        expect(profile.shape).toBe('rect');
    });

    it('detects the ESP8266 chip and ST7789V mipi_spi display', () => {
        expect(profile.chip).toBe('esp8266');
        expect(profile.displayPlatform).toBe('mipi_spi');
        expect(profile.displayModel).toBe('ST7789V');
    });

    it('flags the recipe as a colour LCD, not e-paper, with no touch and no PSRAM', () => {
        expect(profile.features.lcd).toBe(true);
        expect(profile.features.epaper).toBe(false);
        expect(profile.features.touch).toBe(false);
        expect(profile.features.psram).toBe(false);
    });

    it('contains the lambda placeholder so the Designer can inject UI code', () => {
        expect(yaml).toContain('# __LAMBDA_PLACEHOLDER__');
    });
});
