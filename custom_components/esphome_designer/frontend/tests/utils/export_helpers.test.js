import { describe, it, expect, beforeEach } from 'vitest';
import { makeSafeId, escapeFmt, isEntityStateNonNumeric } from '../../js/utils/export_helpers.js';

describe('Export Helpers', () => {
    describe('makeSafeId', () => {
        it('handles basic entity IDs', () => {
            expect(makeSafeId('sensor.temperature')).toBe('sensor_temperature');
            expect(makeSafeId('binary_sensor.motion')).toBe('binary_sensor_motion');
        });

        it('handles attributes', () => {
            expect(makeSafeId('sensor.my_sensor', 'battery')).toBe('sensor_my_sensor_battery');
        });

        it('appends suffixes', () => {
            expect(makeSafeId('sensor.temp', null, '_txt')).toBe('sensor_temp_txt');
            expect(makeSafeId('sensor.temp', 'val', '_txt')).toBe('sensor_temp_val_txt');
        });

        it('sanitizes unsafe characters', () => {
            expect(makeSafeId('sensor.test-id! @#')).toBe('sensor_test_id____');
        });

        it('converts to lowercase', () => {
            expect(makeSafeId('Sensor.Temp')).toBe('sensor_temp');
        });

        it('truncates very long IDs to ESPHome 63-char limit', () => {
            const longId = 'sensor.' + 'a'.repeat(100);
            const safe = makeSafeId(longId);
            expect(safe.length).toBe(63);
            expect(safe).toMatch(/^sensor_aaaaa/);
        });

        it('truncates based on suffix length', () => {
            const longId = 'sensor.' + 'a'.repeat(100);
            const safe = makeSafeId(longId, null, '_txt');
            expect(safe.length).toBe(63);
            expect(safe.endsWith('_txt')).toBe(true);
        });

        it('returns empty string for null/empty input', () => {
            expect(makeSafeId(null)).toBe('');
            expect(makeSafeId('')).toBe('');
        });
    });

    describe('escapeFmt', () => {
        it('escapes percent signs for printf', () => {
            expect(escapeFmt('100%')).toBe('100%%');
            expect(escapeFmt('% value %')).toBe('%% value %%');
        });

        it('returns empty string for null/empty input', () => {
            expect(escapeFmt(null)).toBe('');
            expect(escapeFmt('')).toBe('');
        });
    });

    describe('isEntityStateNonNumeric', () => {
        beforeEach(() => {
            window.AppState = { entityStates: {} };
        });

        it('returns false if entity or appState is missing (safe fallback for registration)', () => {
            expect(isEntityStateNonNumeric('sensor.missing')).toBe(false);
            expect(isEntityStateNonNumeric('sensor.temp', null)).toBe(false);
        });

        it('returns true for explicitly non-numeric states', () => {
            const mockAppState = {
                entityStates: {
                    'sensor.status': { state: 'online' },
                    'sensor.string': { state: 'some_text' }
                }
            };
            expect(isEntityStateNonNumeric('sensor.status', mockAppState)).toBe(true);
            expect(isEntityStateNonNumeric('sensor.string', mockAppState)).toBe(true);
        });

        it('returns false for numeric states', () => {
            const mockAppState = {
                entityStates: {
                    'sensor.int': { state: '25' },
                    'sensor.float': { state: '25.5' },
                    'sensor.neg': { state: '-10' }
                }
            };
            expect(isEntityStateNonNumeric('sensor.int', mockAppState)).toBe(false);
            expect(isEntityStateNonNumeric('sensor.float', mockAppState)).toBe(false);
            expect(isEntityStateNonNumeric('sensor.neg', mockAppState)).toBe(false);
        });

        it('supports attribute checking', () => {
            const mockAppState = {
                entityStates: {
                    'weather.home': {
                        state: 'sunny',
                        attributes: {
                            temperature: 22.5,
                            forecast: 'Cloudy'
                        }
                    }
                }
            };

            expect(isEntityStateNonNumeric('weather.home', mockAppState, 'temperature')).toBe(false);
            expect(isEntityStateNonNumeric('weather.home', mockAppState, 'forecast')).toBe(true);
        });

        it('handles strict parsing (e.g. 5:24pm is non-numeric)', () => {
            const mockAppState = {
                entityStates: {
                    'sensor.time': { state: '5:24pm' }
                }
            };
            expect(isEntityStateNonNumeric('sensor.time', mockAppState)).toBe(true);
        });

        it('returns false for empty states', () => {
            const mockAppState = {
                entityStates: {
                    'sensor.empty': { state: '' }
                }
            };
            expect(isEntityStateNonNumeric('sensor.empty', mockAppState)).toBe(false);
        });
    });
});
