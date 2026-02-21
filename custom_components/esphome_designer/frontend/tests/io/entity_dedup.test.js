import { describe, it, expect, beforeEach } from 'vitest';
import {
    isEntityStateNonNumeric,
    collectNumericSensors,
    collectTextSensors,
    collectBinarySensors,
    HA_TEXT_DOMAINS
} from '../../js/io/adapters/entity_dedup.js';

describe('Entity Deduplication & Registration', () => {

    describe('isEntityStateNonNumeric', () => {
        let mockAppState;

        beforeEach(() => {
            mockAppState = {
                entityStates: {
                    'sensor.temperature': { state: '22.5' },
                    'sensor.status': { state: 'online' },
                    'sensor.empty': { state: '' },
                    'sensor.with_attrs': { state: '20', attributes: { mode: 'auto', level: '5' } }
                }
            };
        });

        it('returns false for numeric states', () => {
            expect(isEntityStateNonNumeric('sensor.temperature', mockAppState)).toBe(false);
        });

        it('returns true for text/string states', () => {
            expect(isEntityStateNonNumeric('sensor.status', mockAppState)).toBe(true);
        });

        it('returns false for empty states', () => {
            expect(isEntityStateNonNumeric('sensor.empty', mockAppState)).toBe(false);
        });

        it('evaluates specific attributes correctly', () => {
            expect(isEntityStateNonNumeric('sensor.with_attrs', mockAppState, 'level')).toBe(false); // '5' is numeric
            expect(isEntityStateNonNumeric('sensor.with_attrs', mockAppState, 'mode')).toBe(true); // 'auto' is text
        });

        it('returns false if entity or appState is missing', () => {
            expect(isEntityStateNonNumeric('sensor.unknown', mockAppState)).toBe(false);
            expect(isEntityStateNonNumeric('sensor.temperature', null)).toBe(false);
            expect(isEntityStateNonNumeric(null, mockAppState)).toBe(false);
        });
    });

    describe('collectNumericSensors', () => {
        let context;

        beforeEach(() => {
            context = {
                seenEntityIds: new Set(),
                seenSensorIds: new Set(),
                appState: {}
            };
        });

        it('generates configs for HA numeric sensors', () => {
            const pages = [{ widgets: [{ type: 'sensor_text', entity_id: 'sensor.cpu_temp' }] }];
            const result = collectNumericSensors(pages, context);

            expect(result).toContain('- platform: homeassistant');
            expect(result).toContain('  id: sensor_cpu_temp');
            expect(result).toContain('  entity_id: sensor.cpu_temp');

            expect(context.seenEntityIds.has('sensor.cpu_temp')).toBe(true);
            expect(context.seenSensorIds.has('sensor_cpu_temp')).toBe(true);
        });

        it('prefixes missing domain for specific numeric widget types', () => {
            const pages = [{ widgets: [{ type: 'progress_bar', entity_id: 'cpu_usage' }] }];
            const result = collectNumericSensors(pages, context);

            expect(result).toContain('  entity_id: sensor.cpu_usage');
            expect(result).toContain('  id: sensor_cpu_usage');
        });

        it('skips entities with is_local_sensor prop', () => {
            const pages = [{ widgets: [{ type: 'sensor_text', entity_id: 'sensor.local', props: { is_local_sensor: true } }] }];
            const result = collectNumericSensors(pages, context);
            expect(result.length).toBe(0);
        });

        it('skips HA text domains and binary domains', () => {
            const pages = [{
                widgets: [
                    { type: 'sensor_text', entity_id: 'weather.home' },
                    { type: 'sensor_text', entity_id: 'switch.relay' }
                ]
            }];
            const result = collectNumericSensors(pages, context);
            expect(result.length).toBe(0); // Handled by text/binary collectors
        });

        it('truncates IDs to 63 characters', () => {
            const longId = 'sensor.' + 'a'.repeat(80);
            const pages = [{ widgets: [{ type: 'sensor_text', entity_id: longId }] }];
            const result = collectNumericSensors(pages, context);

            const expectedId = longId.replace(/[^a-zA-Z0-9_]/g, "_").substring(0, 63);
            expect(result).toContain(`  id: ${expectedId}`);
        });
    });

    describe('collectTextSensors', () => {
        let context;

        beforeEach(() => {
            context = {
                seenEntityIds: new Set(),
                seenSensorIds: new Set(),
                appState: {}
            };
        });

        it('generates configs for defined text domains', () => {
            const pages = [{ widgets: [{ type: 'text', entity_id: 'weather.home' }] }];
            const result = collectTextSensors(pages, context);

            expect(result).toContain('- platform: homeassistant');
            expect(result).toContain('  id: weather_home_txt');
            expect(result).toContain('  entity_id: weather.home');
        });

        it('generates configs for entities used in string conditions', () => {
            const pages = [{
                widgets: [{
                    type: 'icon',
                    condition_entity: 'sensor.state_name',
                    condition_operator: '==',
                    condition_state: 'Playing' // Non-numeric condition triggers text sensor inclusion
                }]
            }];
            const result = collectTextSensors(pages, context);

            expect(result).toContain('  entity_id: sensor.state_name');
            expect(result).toContain('  id: sensor_state_name_txt');
        });

        it('skips boolean condition states', () => {
            const pages = [{
                widgets: [{
                    type: 'icon',
                    condition_entity: 'sensor.door',
                    condition_state: 'true'
                }]
            }];
            const result = collectTextSensors(pages, context);
            expect(result.length).toBe(0);
        });

        it('generates config with attribute parsed cleanly', () => {
            const pages = [{
                widgets: [{
                    type: 'text',
                    entity_id: 'weather.home',
                    props: { attribute: 'forecast[0].condition' }
                }]
            }];
            const result = collectTextSensors(pages, context);

            // Should strip array indices and properties for the ID/Attr
            expect(result).toContain('  attribute: forecast');
            expect(result).toContain('  id: weather_home_forecast_txt');
        });
    });

    describe('collectBinarySensors', () => {
        let context;

        beforeEach(() => {
            context = {
                seenEntityIds: new Set(),
                seenSensorIds: new Set(),
                appState: {}
            };
        });

        it('generates configs for binary domains', () => {
            const pages = [{
                widgets: [
                    { type: 'button', entity_id: 'switch.relay' },
                    { type: 'icon', condition_entity: 'binary_sensor.door' }
                ]
            }];
            const result = collectBinarySensors(pages, context);

            expect(result).toContain('  entity_id: switch.relay');
            expect(result).toContain('  entity_id: binary_sensor.door');
        });

        it('skips numeric sensors', () => {
            const pages = [{ widgets: [{ type: 'button', entity_id: 'sensor.temperature' }] }];
            const result = collectBinarySensors(pages, context);
            expect(result.length).toBe(0);
        });
    });

});
