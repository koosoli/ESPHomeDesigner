import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { mockFetchEntityHistory, mockGetEntityAttributes, mockEmit } = vi.hoisted(() => ({
    mockFetchEntityHistory: vi.fn(),
    mockGetEntityAttributes: vi.fn(),
    mockEmit: vi.fn()
}));

vi.mock('../../js/io/ha_api.js', () => ({
    fetchEntityHistory: mockFetchEntityHistory,
    getEntityAttributes: mockGetEntityAttributes
}));

vi.mock('../../js/core/events.js', () => ({
    emit: mockEmit,
    EVENTS: {
        WIDGET_UPDATED: 'widget:updated'
    }
}));

import { render } from '../../features/graph/render.js';

describe('graph render', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        mockFetchEntityHistory.mockReset();
        mockGetEntityAttributes.mockReset();
        mockEmit.mockReset();
        document.body.innerHTML = '';
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('renders an inline HA-history graph from stringified history attributes', () => {
        mockGetEntityAttributes.mockReturnValue({
            history: JSON.stringify([{ value: 10 }, { value: 20 }, { value: 30 }])
        });

        const artboard = document.createElement('div');
        artboard.className = 'artboard';
        const el = document.createElement('div');
        artboard.appendChild(el);
        document.body.appendChild(artboard);

        render(el, {
            id: 'graph_1',
            x: 10,
            y: 12,
            width: 200,
            height: 100,
            entity_id: 'sensor.power',
            props: {
                use_ha_history: true,
                history_attribute: 'history',
                duration: '2h',
                line_thickness: 4,
                border_width: 1,
                font_family: 'Inter',
                font_size: 16,
                font_weight: 700
            }
        }, {
            getColorStyle: (value) => value || '#000000'
        });

        vi.runAllTimers();

        expect(el.querySelector('svg')).not.toBeNull();
        expect(el.querySelector('polyline')?.getAttribute('stroke-width')).toBe('4');
        const labels = artboard.querySelectorAll('.graph-axis-label[data-widget-id="graph_1"]');
        expect(labels.length).toBeGreaterThan(0);
        expect(labels[0].style.fontFamily).toContain('Inter');
        expect(labels[0].style.fontWeight).toBe('700');
        expect(labels[0].style.fontSize).toBe('16px');
    });

    it('fetches entity history when no inline history is configured and emits a refresh event', async () => {
        mockGetEntityAttributes.mockReturnValue(null);
        mockFetchEntityHistory.mockResolvedValue([
            { state: '10', last_changed: new Date().toISOString() },
            { state: '15', last_changed: new Date().toISOString() }
        ]);

        const el = document.createElement('div');
        render(el, {
            id: 'graph_2',
            x: 0,
            y: 0,
            width: 180,
            height: 80,
            entity_id: 'sensor.energy',
            props: {
                duration: '1h'
            }
        }, {
            getColorStyle: (value) => value || '#000000'
        });

        await vi.runAllTimersAsync();

        expect(mockFetchEntityHistory).toHaveBeenCalledWith('sensor.energy', '1h');
        expect(mockEmit).toHaveBeenCalledWith('widget:updated', 'graph_2');
    });

    it('renders a placeholder message when no entity is configured', () => {
        mockGetEntityAttributes.mockReturnValue(null);

        const el = document.createElement('div');
        render(el, {
            id: 'graph_3',
            x: 0,
            y: 0,
            width: 120,
            height: 60,
            entity_id: '',
            props: {}
        }, {
            getColorStyle: (value) => value || '#000000'
        });

        expect(el.textContent).toContain('graph (No Entity)');
    });

    it('parses YAML-like inline history strings and applies dashed styling with a title label', () => {
        mockGetEntityAttributes.mockReturnValue({
            history: 'value: 10\nvalue: 18\nvalue: 14'
        });

        const el = document.createElement('div');
        render(el, {
            id: 'graph_4',
            x: 0,
            y: 0,
            width: 160,
            height: 90,
            entity_id: 'sensor.inline_history',
            title: 'Inline Graph',
            props: {
                use_ha_history: true,
                line_type: 'DASHED',
                background_color: 'transparent',
                font_family: 'Montserrat',
                font_size: 15,
                font_weight: 600
            }
        }, {
            getColorStyle: (value) => value || '#000000'
        });

        vi.runAllTimers();

        expect(el.querySelector('polyline')?.getAttribute('stroke-dasharray')).toBe('5,5');
        expect(el.textContent).toContain('Inline Graph');
        const title = Array.from(el.querySelectorAll('div')).find((node) => node.textContent === 'Inline Graph');
        expect(title?.style.fontFamily).toContain('Montserrat');
        expect(title?.style.fontWeight).toBe('600');
        expect(title?.style.fontSize).toBe('15px');
    });

    it('reuses cached fetched history within the cache window', async () => {
        mockGetEntityAttributes.mockReturnValue(null);
        mockFetchEntityHistory.mockResolvedValue([
            { state: '1', last_changed: new Date().toISOString() },
            { state: '2', last_changed: new Date().toISOString() }
        ]);

        const first = document.createElement('div');
        render(first, {
            id: 'graph_cached',
            x: 0,
            y: 0,
            width: 120,
            height: 60,
            entity_id: 'sensor.cached',
            props: {
                duration: '30m'
            }
        }, {
            getColorStyle: (value) => value || '#000000'
        });

        await vi.runAllTimersAsync();
        expect(mockFetchEntityHistory).toHaveBeenCalledTimes(1);

        const second = document.createElement('div');
        render(second, {
            id: 'graph_cached_2',
            x: 0,
            y: 0,
            width: 120,
            height: 60,
            entity_id: 'sensor.cached',
            props: {
                duration: '30m'
            }
        }, {
            getColorStyle: (value) => value || '#000000'
        });

        expect(mockFetchEntityHistory).toHaveBeenCalledTimes(1);
        expect(second.querySelector('polyline')).not.toBeNull();
    });
});
