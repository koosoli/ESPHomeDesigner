import { describe, expect, it } from 'vitest';
import { TemplateConverter } from '../../js/utils/template_converter.js';

describe('TemplateConverter', () => {
    it('converts ESPHome ids and HA entity ids into HA templates', () => {
        expect(TemplateConverter.toHATemplate('id(sensor_temp).state')).toBe(
            "{{ states('sensor.sensor_temp') | float(0) | round(1) }}"
        );
        expect(TemplateConverter.toHATemplate('sensor.temperature', { precision: 2, unit: 'C' })).toBe(
            "{{ states('sensor.temperature') | float(0) | round(2) ~ ' C' }}"
        );
        expect(TemplateConverter.toHATemplate('light.kitchen', { isNumeric: false, prefix: "'", postfix: "'" })).toBe(
            "{{ 'states('light.kitchen')' }}"
        );
    });

    it('passes through existing templates and formats literal fallbacks', () => {
        expect(TemplateConverter.toHATemplate("{{ states('sensor.temp') }}")).toBe("{{ states('sensor.temp') }}");
        expect(TemplateConverter.toHATemplate('{% if true %}ok{% endif %}')).toBe('{% if true %}ok{% endif %}');
        expect(TemplateConverter.toHATemplate('hello', { prefix: '[', postfix: ']', unit: 'px' })).toBe('[hello px]');
        expect(TemplateConverter.toHATemplate(0)).toBe('0');
    });

    it('best-effort converts HA templates back into ESPHome ids', () => {
        expect(TemplateConverter.toESPHomeID("{{ states('sensor.temperature') }}")).toBe('id(temperature).state');
        expect(TemplateConverter.toESPHomeID("{{ states('text_sensor.status') }}")).toBe('id(status).state');
        expect(TemplateConverter.toESPHomeID('literal')).toBe('literal');
        expect(TemplateConverter.toESPHomeID('')).toBe('');
    });
});
