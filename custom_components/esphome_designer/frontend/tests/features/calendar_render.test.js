import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { mockAppState } = vi.hoisted(() => ({
    mockAppState: {
        entityStates: {}
    }
}));

vi.mock('@core/state', () => ({
    AppState: mockAppState
}));

import { render } from '../../features/calendar/render.js';

function createContext() {
    return {
        getColorStyle(value) {
            if (value === 'white') return 'white';
            if (value === 'red') return 'red';
            if (value === 'black') return 'black';
            if (!value || value === 'theme_auto') return '#224466';
            return value;
        }
    };
}

describe('calendar render', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2026-03-17T12:00:00'));
        mockAppState.entityStates = {};
        document.body.innerHTML = '';
        vi.spyOn(console, 'warn').mockImplementation(() => {});
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.useRealTimers();
    });

    it('renders the fallback preview with highlighted current date and placeholder events', () => {
        const el = document.createElement('div');

        render(el, {
            width: 420,
            height: 320,
            props: {
                text_color: 'white',
                background_color: 'transparent',
                border_width: 2,
                border_color: 'red',
                font_size_date: 90
            }
        }, createContext());

        expect(el.style.width).toBe('420px');
        expect(el.style.height).toBe('320px');
        expect(el.style.borderWidth).toBe('2px');
        expect(el.style.borderStyle).toBe('solid');
        expect(el.children).toHaveLength(3);
        expect(el.innerHTML).toContain('Meeting with Team');
        expect(el.innerHTML).toContain('Dentist Appointment');

        const highlightedDate = [...el.querySelectorAll('div')].find((node) => node.style.borderRadius === '50%');
        expect(highlightedDate?.innerText).toBe('17');
        expect(highlightedDate?.style.color).toBe('black');
    });

    it('renders live events from stringified calendar entries and respects the event limit', () => {
        mockAppState.entityStates = {
            'sensor.calendar': {
                attributes: {
                    entries: JSON.stringify([
                        {
                            day: 17,
                            all_day: [{ summary: 'Holiday', start: '', end: '' }],
                            other: [{ summary: 'Lunch', start: '2026-03-17T12:30:00', end: '2026-03-17T13:00:00' }]
                        },
                        {
                            day: 18,
                            other: [{ summary: 'Later', start: '2026-03-18T09:00:00', end: '2026-03-18T10:00:00' }]
                        }
                    ])
                }
            }
        };

        const el = document.createElement('div');
        render(el, {
            entity_id: 'sensor.calendar',
            props: {
                show_header: false,
                show_grid: false,
                max_events: 2
            }
        }, createContext());

        expect(el.children).toHaveLength(1);
        expect(el.textContent).toContain('Holiday');
        expect(el.textContent).toContain('All Day');
        expect(el.textContent).toContain('Lunch');
        expect(el.textContent).toContain('12:30');
        expect(el.textContent).not.toContain('Later');
    });

    it('parses event data from the entity state JSON payload', () => {
        mockAppState.entityStates = {
            'sensor.calendar_state': {
                state: JSON.stringify([
                    {
                        day: 17,
                        other: [{ summary: 'From State', start: '2026-03-17T08:15:00', end: '2026-03-17T09:00:00' }]
                    }
                ])
            }
        };

        const el = document.createElement('div');
        render(el, {
            entity_id: 'sensor.calendar_state',
            props: {
                show_header: false,
                show_grid: false
            }
        }, createContext());

        expect(el.textContent).toContain('From State');
        expect(el.textContent).toContain('08:15');
    });

    it('builds events from legacy message attributes even when the events panel is hidden', () => {
        mockAppState.entityStates = {
            'sensor.calendar_message': {
                attributes: {
                    message: 'Focus Block',
                    start_time: '2026-03-17T09:00:00',
                    end_time: '2026-03-17T10:00:00',
                    all_day: false
                }
            }
        };

        const el = document.createElement('div');
        render(el, {
            entity_id: 'sensor.calendar_message',
            props: {
                show_events: false
            }
        }, createContext());

        expect(el.children).toHaveLength(2);
        expect(el.textContent).not.toContain('Focus Block');
    });

    it('warns and falls back to placeholder events when live event payload parsing fails', () => {
        mockAppState.entityStates = {
            'sensor.bad_calendar': {
                attributes: {
                    entries: '{not-valid-json'
                }
            }
        };

        const el = document.createElement('div');
        render(el, {
            entity_id: 'sensor.bad_calendar',
            props: {}
        }, createContext());

        expect(console.warn).toHaveBeenCalled();
        expect(el.innerHTML).toContain('Meeting with Team');
        expect(el.innerHTML).toContain('Dentist Appointment');
    });
});
