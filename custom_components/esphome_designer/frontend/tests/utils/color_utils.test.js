import { describe, it, expect } from 'vitest';
import { MIXED_VALUE, parseColor, hexToRgb, rgbToHex, hslToRgb } from '../../js/utils/color_utils.js';

describe('color_utils', () => {
    it('parses named/hex/esphome colors', () => {
        expect(MIXED_VALUE).toBe('__mixed__');
        expect(parseColor('red')).toBe('#FF0000');
        expect(parseColor('#112233')).toBe('#112233');
        expect(parseColor('0xAABBCC')).toBe('#AABBCC');
        expect(parseColor('unknown')).toBe('#000000');
    });

    it('converts hex to rgb and handles invalid input', () => {
        expect(hexToRgb('#FF00AA')).toEqual({ r: 255, g: 0, b: 170 });
        expect(hexToRgb('not-a-color')).toEqual({ r: 0, g: 0, b: 0 });
    });

    it('converts rgb to clamped hex', () => {
        expect(rgbToHex(255, 0, 170)).toBe('#ff00aa');
        expect(rgbToHex(-5, 260, 16)).toBe('#00ff10');
    });

    it('converts hsl to rgb for chromatic and achromatic inputs', () => {
        expect(hslToRgb(0, 0, 0.5)).toEqual({ r: 128, g: 128, b: 128 });
        const rgb = hslToRgb(0, 1, 0.5);
        expect(rgb.r).toBe(255);
        expect(rgb.g).toBe(0);
        expect(rgb.b).toBe(0);
    });
});
