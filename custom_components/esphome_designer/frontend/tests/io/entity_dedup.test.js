import { describe, it, expect, beforeEach } from 'vitest';
import {
    isEntityStateNonNumeric,
    collectNumericSensors,
    collectTextSensors,
    collectBinarySensors,
    HA_TEXT_DOMAINS, // eslint-disable-line no-unused-vars
    collectCustomStateTriggerActions
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

        it('generates mqtt_subscribe config when widget has mqtt_topic', () => {
            const pages = [{ widgets: [{ type: 'sensor_text', entity_id: 'sensor.cpu_temp', props: { mqtt_topic: 'home/cpu/temp' } }] }];
            const result = collectNumericSensors(pages, context);

            expect(result).toContain('- platform: mqtt_subscribe');
            expect(result).toContain('  id: sensor_cpu_temp');
            expect(result).toContain('  topic: "home/cpu/temp"');
            expect(result).not.toContain('  entity_id: sensor.cpu_temp');
        });

        it('generates mqtt_subscribe config when entity_id has mqtt: prefix', () => {
            const pages = [{ widgets: [{ type: 'sensor_text', entity_id: 'mqtt:home/cpu/temp' }] }];
            const result = collectNumericSensors(pages, context);

            expect(result).toContain('- platform: mqtt_subscribe');
            expect(result).toContain('  id: mqtt_home_cpu_temp');
            expect(result).toContain('  topic: "home/cpu/temp"');
        });

        it('registers standalone custom on_value trigger entities as numeric sensors', () => {
            const pages = [{
                widgets: [{
                    id: 'text_1',
                    type: 'text',
                    props: {
                        state_trigger_entity: 'sensor.room_temperature',
                        state_trigger_actions: '- script.execute: refresh_layout'
                    }
                }]
            }];

            const result = collectNumericSensors(pages, context);

            expect(result).toContain('  entity_id: sensor.room_temperature');
            expect(result).toContain('  id: sensor_room_temperature');
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

        it('keeps binary condition entities out of text sensor registration', () => {
            const pages = [{
                widgets: [{
                    type: 'icon',
                    condition_entity: 'input_boolean.night_mode',
                    condition_state: 'on'
                }]
            }];
            const result = collectTextSensors(pages, context);
            expect(result.length).toBe(0);
        });

        it('registers input_select conditions as text sensors even for keyword-like values', () => {
            const pages = [{
                widgets: [{
                    type: 'icon',
                    condition_entity: 'input_select.house_mode',
                    condition_operator: '==',
                    condition_state: 'home'
                }]
            }];
            const result = collectTextSensors(pages, context);

            expect(result).toContain('  entity_id: input_select.house_mode');
            expect(result).toContain('  id: input_select_house_mode_txt');
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

        it('generates mqtt_subscribe config when widget has mqtt_topic', () => {
            const pages = [{ widgets: [{ type: 'text', entity_id: 'weather.home', props: { mqtt_topic: 'home/weather/state' } }] }];
            const result = collectTextSensors(pages, context);

            expect(result).toContain('- platform: mqtt_subscribe');
            expect(result).toContain('  id: weather_home_txt');
            expect(result).toContain('  topic: "home/weather/state"');
            expect(result).not.toContain('  entity_id: weather.home');
        });

        it('generates mqtt_subscribe config when entity_id has mqtt: prefix', () => {
            const pages = [{ widgets: [{ type: 'text', entity_id: 'mqtt:home/weather/state' }] }];
            const result = collectTextSensors(pages, context);

            expect(result).toContain('- platform: mqtt_subscribe');
            expect(result).toContain('  id: mqtt_home_weather_state_txt');
            expect(result).toContain('  topic: "home/weather/state"');
        });

        it('registers standalone custom on_value trigger entities as text sensors', () => {
            const pages = [{
                widgets: [{
                    id: 'label_1',
                    type: 'text',
                    props: {
                        state_trigger_entity: 'text_sensor.panel_status',
                        state_trigger_actions: '- lvgl.widget.refresh: label_1'
                    }
                }]
            }];

            const result = collectTextSensors(pages, context);

            expect(result).toContain('  entity_id: text_sensor.panel_status');
            expect(result).toContain('  id: text_sensor_panel_status_txt');
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

        it('generates mqtt_subscribe config when widget has mqtt_topic', () => {
            const pages = [{ widgets: [{ type: 'button', entity_id: 'switch.relay', props: { mqtt_topic: 'home/relay/state' } }] }];
            const result = collectBinarySensors(pages, context);

            expect(result).toContain('- platform: mqtt_subscribe');
            expect(result).toContain('  id: switch_relay');
            expect(result).toContain('  topic: "home/relay/state"');
            expect(result).not.toContain('  entity_id: switch.relay');
        });

        it('generates mqtt_subscribe config when entity_id has mqtt: prefix', () => {
            const pages = [{ widgets: [{ type: 'button', entity_id: 'mqtt:home/relay/state' }] }];
            const result = collectBinarySensors(pages, context);

            expect(result).toContain('- platform: mqtt_subscribe');
            expect(result).toContain('  id: mqtt_home_relay_state');
            expect(result).toContain('  topic: "home/relay/state"');
        });

        it('registers standalone custom on_state trigger entities as binary sensors', () => {
            const pages = [{
                widgets: [{
                    id: 'label_1',
                    type: 'text',
                    props: {
                        state_trigger_entity: 'binary_sensor.front_door',
                        state_trigger_mode: 'on_state',
                        state_trigger_actions: '- script.execute: refresh_layout'
                    }
                }]
            }];

            const result = collectBinarySensors(pages, context);

            expect(result).toContain('  entity_id: binary_sensor.front_door');
            expect(result).toContain('  id: binary_sensor_front_door');
        });
    });

    describe('collectCustomStateTriggerActions', () => {
        it('adds marked pending trigger actions for supported widget-level triggers', () => {
            const pendingTriggers = new Map();

            collectCustomStateTriggerActions([{
                id: 'label_1',
                props: {
                    state_trigger_entity: 'binary_sensor.front_door',
                    state_trigger_actions: '- lvgl.label.update:\n    id: label_1\n    text: "Open"'
                }
            }], pendingTriggers);

            const [action] = Array.from(pendingTriggers.get('binary_sensor.front_door') || []);
            expect(action).toContain('# esphome-designer-state-trigger: label_1');
            expect(action).toContain('- lvgl.label.update:');
        });

        it('preserves an explicit on_value trigger mode when the widget asks for it', () => {
            const pendingTriggers = new Map();

            collectCustomStateTriggerActions([{
                id: 'label_2',
                props: {
                    state_trigger_entity: 'sensor.energy_usage',
                    state_trigger_mode: 'on_value',
                    state_trigger_actions: '- script.execute: refresh_energy'
                }
            }], pendingTriggers);

            expect(Array.from(pendingTriggers.keys())).toEqual(['sensor.energy_usage']);
        });
    });

});
