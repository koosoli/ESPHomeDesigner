import { describe, expect, it } from 'vitest';

import { defaults, schema } from '../../features/template_sensor_bar/properties.js';

describe('template_sensor_bar properties', () => {
    it('exposes font family and weight controls with shared defaults', () => {
        expect(defaults.font_family).toBe('Roboto');
        expect(defaults.font_weight).toBe(400);

        const textSection = schema.find((section) => section.section === 'Text & Icons');
        expect(textSection).toBeDefined();

        const fontFamilyField = textSection.fields.find((field) => field.key === 'font_family');
        const fontWeightField = textSection.fields.find((field) => field.key === 'font_weight');

        expect(fontFamilyField?.options).toContain('Roboto');
        expect(fontFamilyField?.options).toContain('Inter');
        expect(fontWeightField?.dynamicOptions({ font_family: 'Roboto Mono' })).toEqual([100, 200, 300, 400, 500, 600, 700]);
    });
});
