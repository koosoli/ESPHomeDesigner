import { describe, expect, it } from 'vitest';

import {
    convertAlign,
    convertColor,
    formatOpacity,
    getLVGLFont
} from '../../js/io/yaml_export_lvgl_core.js';

describe('yaml_export_lvgl_core', () => {
    it('converts LVGL colors from named, theme, transparent, and hex inputs', () => {
        expect(convertColor('red')).toBe('"0xFF0000"');
        expect(convertColor('#12abef')).toBe('"0x12ABEF"');
        expect(convertColor('theme_auto', true)).toBe('"0xFFFFFF"');
        expect(convertColor('theme_auto_inverse', false)).toBe('"0xFFFFFF"');
        expect(convertColor('transparent')).toBe('"0x000000"');
        expect(convertColor('custom_id')).toBe('"custom_id"');
        expect(convertColor()).toBe('"0x000000"');
    });

    it('normalizes alignment aliases and font ids', () => {
        expect(convertAlign('LEFT')).toBe('top_left');
        expect(convertAlign('center')).toBe('center');
        expect(convertAlign('BOTTOM_RIGHT')).toBe('bottom_right');
        expect(convertAlign()).toBe('top_left');

        expect(getLVGLFont('Open Sans', 24, 600, true)).toBe('font_open_sans_600_24_italic');
        expect(getLVGLFont(undefined, undefined, undefined, false)).toBe('font_roboto_400_20');
    });

    it('formats opacity numbers into LVGL-friendly values', () => {
        expect(formatOpacity()).toBe('cover');
        expect(formatOpacity(255)).toBe('cover');
        expect(formatOpacity(0)).toBe('transp');
        expect(formatOpacity(128)).toBe('50%');
        expect(formatOpacity('80%')).toBe('80%');
    });
});
