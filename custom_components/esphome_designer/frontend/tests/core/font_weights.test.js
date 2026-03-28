import { describe, it, expect } from 'vitest';
import { getWeightsForFont, clampFontWeight } from '../../js/core/font_weights.js';

describe('font_weights', () => {
    it('includes Roboto 600 and preserves it during clamping', () => {
        expect(getWeightsForFont('Roboto')).toContain(600);
        expect(clampFontWeight('Roboto', 600)).toBe(600);
        expect(clampFontWeight('Roboto', 650)).toBe(600);
    });

    it('returns only valid weights for Roboto Mono', () => {
        expect(getWeightsForFont('Roboto Mono')).toEqual([100, 200, 300, 400, 500, 600, 700]);
        expect(getWeightsForFont('Roboto Mono')).not.toContain(800);
    });

    it('clamps invalid Roboto Mono weights to the nearest valid value', () => {
        expect(clampFontWeight('Roboto Mono', 800)).toBe(700);
        expect(clampFontWeight('Roboto Mono', 750)).toBe(700);
        expect(clampFontWeight('Roboto Mono', 50)).toBe(100);
    });

    it('falls back to the full weight range for unknown fonts', () => {
        expect(getWeightsForFont('Some Custom Font')).toEqual([100, 200, 300, 400, 500, 600, 700, 800, 900]);
        expect(clampFontWeight('Some Custom Font', 800)).toBe(800);
    });
});
