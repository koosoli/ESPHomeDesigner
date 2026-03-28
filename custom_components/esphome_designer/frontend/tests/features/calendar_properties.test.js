import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { mockAppState } = vi.hoisted(() => ({
    mockAppState: {
        updateWidget: vi.fn()
    }
}));

vi.mock('@core/state', () => ({
    AppState: mockAppState
}));

import { renderProperties } from '../../features/calendar/properties.js';

function createPanel() {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const panel = {
        labels: [],
        selects: [],
        hints: [],
        createSection: vi.fn(),
        endSection: vi.fn(),
        addHint: vi.fn((html) => {
            panel.hints.push(html);
        }),
        addDropShadowButton: vi.fn(),
        addLabeledInputWithPicker(label, _type, _value, onChange) {
            panel.labels.push(label);
            onChange('sensor.family_calendar');
        },
        addLabeledInput(label, type, _value, onChange) {
            panel.labels.push(label);
            onChange(type === 'number' ? '12' : 'calendar.family, calendar.work');
        },
        addCheckbox(label, value, onChange) {
            panel.labels.push(label);
            onChange(!value);
        },
        addSelect(label, value, options, onChange) {
            panel.labels.push(label);
            panel.selects.push({ label, value, options });
            const next = options[options.length - 1];
            onChange(typeof next === 'object' ? next.value : next);
        },
        addColorSelector(label, _value, _colors, onChange) {
            panel.labels.push(label);
            onChange('black');
        },
        addNumberWithSlider(label, _value, _min, _max, onChange) {
            panel.labels.push(label);
            onChange(42);
        },
        getContainer() {
            return container;
        }
    };

    return panel;
}

describe('calendar properties', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        vi.useFakeTimers();
        document.body.innerHTML = '';
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
    });

    it('renders the property panel, clamps font weights, and downloads the helper script', () => {
        const panel = createPanel();
        const widget = {
            id: 'calendar_1',
            entity_id: '',
            props: {
                source_calendars: '',
                font_family: 'Roboto',
                font_weight_header_date: 850,
                font_weight_header_day: 650,
                font_weight_month: 450,
                font_weight_grid_header: 650,
                font_weight_dates: 650,
                font_weight_events: 450
            }
        };

        let createdAnchor = null;
        const originalCreateElement = document.createElement.bind(document);
        vi.spyOn(document, 'createElement').mockImplementation((tagName) => {
            const element = originalCreateElement(tagName);
            if (String(tagName).toLowerCase() === 'a') {
                createdAnchor = element;
            }
            return element;
        });
        const clickSpy = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(() => {});

        renderProperties(panel, widget);

        const weightValues = Object.fromEntries(
            panel.selects
                .filter((entry) => entry.label.includes('Weight'))
                .map((entry) => [entry.label, entry.value])
        );

        expect(weightValues['Header Date Weight']).toBe(900);
        expect(weightValues['Header Day Weight']).toBe(600);
        expect(weightValues['Month Weight']).toBe(400);
        expect(weightValues['Grid Header Weight']).toBe(600);
        expect(weightValues['Dates Weight']).toBe(600);
        expect(weightValues['Events Weight']).toBe(400);

        expect(panel.createSection).toHaveBeenCalledTimes(4);
        expect(panel.endSection).toHaveBeenCalledTimes(4);
        expect(panel.addDropShadowButton).toHaveBeenCalledWith(panel.getContainer(), 'calendar_1');

        expect(mockAppState.updateWidget).toHaveBeenCalledWith('calendar_1', { entity_id: 'sensor.family_calendar' });
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('calendar_1', expect.objectContaining({
            props: expect.objectContaining({
                source_calendars: 'calendar.family, calendar.work'
            })
        }));

        const scriptButton = Array.from(panel.getContainer().querySelectorAll('button')).find((button) => button.textContent === 'Script');
        scriptButton?.click();

        expect(createdAnchor).not.toBeNull();
        expect(createdAnchor?.getAttribute('download')).toBe('esp_calendar_data_conversion.py');
        expect(createdAnchor?.getAttribute('href')).toContain('data:text/x-python;charset=utf-8,');
        const downloadedScript = decodeURIComponent(createdAnchor?.getAttribute('href')?.split(',')[1] || '');
        expect(downloadedScript).toContain("for original_event in events_list['events']:");
        expect(downloadedScript).toContain("event = original_event.copy()");
        expect(downloadedScript).toContain("event['start'] = today");
        expect(downloadedScript).toContain("event['summary'] = prefix + event.get('summary', '')");
        expect(downloadedScript).toContain('MAX_ENTRIES = int(data.get("nr_entries", MAX_ENTRIES))');
        expect(downloadedScript).not.toContain('location_name');
        expect(clickSpy).toHaveBeenCalledTimes(1);
    });

    it('copies YAML via the secure clipboard API and restores the button label', async () => {
        const panel = createPanel();
        const writeText = vi.fn(() => ({
            then(onFulfilled) {
                onFulfilled();
                return {
                    catch() {
                        return undefined;
                    }
                };
            }
        }));
        vi.stubGlobal('navigator', {
            clipboard: { writeText }
        });
        Object.defineProperty(window, 'isSecureContext', {
            configurable: true,
            value: true
        });

        renderProperties(panel, {
            id: 'calendar_2',
            entity_id: 'sensor.family_calendar',
            props: {
                source_calendars: 'calendar.family, calendar.work',
                max_events: 12
            }
        });

        const yamlButton = Array.from(panel.getContainer().querySelectorAll('button')).find((button) => button.textContent === 'YAML');
        yamlButton?.click();

        expect(writeText).toHaveBeenCalledTimes(1);
        const copied = writeText.mock.calls[0][0];
        expect(copied).toContain('calendar.family, calendar.work');
        expect(copied).toContain('python_script.esp_calendar_data_conversion');
        expect(copied).toContain('nr_entries: 12');
        expect(yamlButton?.textContent).toBe('Copied');

        vi.advanceTimersByTime(2000);
        expect(yamlButton?.textContent).toBe('YAML');
    });

    it('falls back to execCommand copy and shows an error state when copying fails', () => {
        const panel = createPanel();
        vi.stubGlobal('navigator', {});
        Object.defineProperty(window, 'isSecureContext', {
            configurable: true,
            value: false
        });
        Object.defineProperty(document, 'execCommand', {
            configurable: true,
            value: vi.fn(() => false)
        });

        renderProperties(panel, {
            id: 'calendar_3',
            entity_id: '',
            props: {}
        });

        const yamlButton = Array.from(panel.getContainer().querySelectorAll('button')).find((button) => button.textContent === 'YAML');
        yamlButton?.click();

        expect(document.execCommand).toHaveBeenCalledWith('copy');
        expect(yamlButton?.textContent).toBe('Error');
        expect(panel.getContainer().querySelector('textarea')).toBeNull();

        vi.advanceTimersByTime(2000);
        expect(yamlButton?.textContent).toBe('YAML');
    });

    it('uses the execCommand fallback success path and handles copy exceptions', () => {
        const panel = createPanel();
        vi.stubGlobal('navigator', {});
        Object.defineProperty(window, 'isSecureContext', {
            configurable: true,
            value: false
        });
        Object.defineProperty(document, 'execCommand', {
            configurable: true,
            value: vi.fn(() => true)
        });

        renderProperties(panel, {
            id: 'calendar_4',
            entity_id: '',
            props: {}
        });

        const yamlButton = Array.from(panel.getContainer().querySelectorAll('button')).find((button) => button.textContent === 'YAML');
        yamlButton?.click();

        expect(document.execCommand).toHaveBeenCalledWith('copy');
        expect(yamlButton?.textContent).toBe('Copied');

        vi.advanceTimersByTime(2000);
        expect(yamlButton?.textContent).toBe('YAML');

        Object.defineProperty(document, 'execCommand', {
            configurable: true,
            value: vi.fn(() => {
                throw new Error('copy blocked');
            })
        });

        yamlButton?.click();

        expect(yamlButton?.textContent).toBe('Error');
    });
});
