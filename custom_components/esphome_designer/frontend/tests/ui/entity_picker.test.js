import { describe, it, expect, beforeEach, vi } from 'vitest';

const mockHasHaBackend = vi.fn(() => true);
const mockFetchEntityStates = vi.fn();
const mockUpdateWidget = vi.fn();
const mockLogger = { warn: vi.fn() };

vi.mock('../../js/utils/env.js', () => ({ hasHaBackend: mockHasHaBackend }));
vi.mock('../../js/utils/logger.js', () => ({ Logger: mockLogger }));
vi.mock('../../js/io/ha_api.js', () => ({ fetchEntityStates: mockFetchEntityStates }));
vi.mock('../../js/core/state', () => ({ AppState: { updateWidget: mockUpdateWidget } }));

describe('entity_picker', () => {
    let openEntityPickerForWidget;

    const flushAsync = () => new Promise((resolve) => setTimeout(resolve, 0));

    beforeEach(async () => {
        vi.clearAllMocks();
        vi.resetModules();
        document.body.innerHTML = '<div id="propertiesPanel"></div>';
        ({ openEntityPickerForWidget } = await import('../../js/ui/entity_picker.js'));
    });

    it('returns early when HA backend is unavailable', () => {
        mockHasHaBackend.mockReturnValueOnce(false);
        openEntityPickerForWidget(null, null, vi.fn());
        expect(mockLogger.warn).toHaveBeenCalled();
        expect(document.querySelector('.entity-picker-overlay')).toBeNull();
    });

    it('renders picker, filters entities, and selects one', async () => {
        const entities = [
            { entity_id: 'sensor.temp', name: 'Temperature', state: '21', attributes: { unit_of_measurement: '°C' } },
            { entity_id: 'binary_sensor.door', name: 'Door', state: 'off', attributes: {} }
        ];
        mockFetchEntityStates.mockResolvedValueOnce(entities);

        const input = document.createElement('input');
        const callback = vi.fn();
        const widget = { id: 'w1', type: 'sensor_text', props: {} };

        openEntityPickerForWidget(widget, input, callback);
        await flushAsync();
        await flushAsync();

        const overlay = document.querySelector('.entity-picker-overlay');
        expect(overlay).toBeTruthy();

        const search = overlay.querySelector('input.prop-input');
        search.value = 'temp';
        search.dispatchEvent(new Event('input'));

        const rows = overlay.querySelectorAll('.entity-picker-row');
        expect(rows.length).toBe(1);
        rows[0].click();

        expect(callback).toHaveBeenCalledWith('sensor.temp');
        expect(input.value).toBe('sensor.temp');
        expect(mockUpdateWidget).toHaveBeenCalled();
    });

    it('applies graph automation defaults from selected entity attributes', async () => {
        const entities = [{ entity_id: 'sensor.battery', name: 'Battery', state: '75', attributes: { unit_of_measurement: '%', min: 0, max: 100 } }];
        mockFetchEntityStates.mockResolvedValueOnce(entities);

        const widget = { id: 'graph1', type: 'graph', props: {} };
        openEntityPickerForWidget(widget, null, null);

        await flushAsync();
        await flushAsync();

        const row = document.querySelector('.entity-picker-row');
        row.click();

        expect(mockUpdateWidget).toHaveBeenCalledWith('graph1', expect.objectContaining({ entity_id: 'sensor.battery' }));
        expect(mockUpdateWidget).toHaveBeenCalledWith('graph1', expect.objectContaining({
            props: expect.objectContaining({ min_value: '0', max_value: '100' })
        }));
    });
});
