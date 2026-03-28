import { describe, it, expect, beforeEach, vi } from 'vitest';

const mockRegistry = {
    load: vi.fn(() => Promise.resolve()),
    get: vi.fn((type) => {
        if (type.startsWith('lvgl_')) return {};
        return { export: vi.fn(), exportOEPL: vi.fn(), exportOpenDisplay: vi.fn(), exportLVGL: vi.fn() };
    })
};

vi.mock('../../js/core/plugin_registry', () => ({ registry: mockRegistry }));
vi.mock('../../js/core/state', () => ({
    AppState: {
        settings: { renderingMode: 'direct' }
    }
}));
vi.mock('../../js/utils/logger.js', () => ({ Logger: { log: vi.fn(), error: vi.fn() } }));
vi.mock('../../js/core/events.js', () => ({
    EVENTS: { SETTINGS_CHANGED: 'SETTINGS_CHANGED' },
    on: vi.fn()
}));

describe('widget_palette', () => {
    beforeEach(() => {
        document.body.innerHTML = '<div id="widgetPalette"></div>';
        mockRegistry.load.mockClear();
    });

    it('renders categories and widgets for direct mode', async () => {
        const { renderWidgetPalette, WIDGET_CATEGORIES } = await import('../../js/ui/widget_palette.js');

        await renderWidgetPalette('widgetPalette');

        const container = document.getElementById('widgetPalette');
        expect(WIDGET_CATEGORIES.length).toBeGreaterThan(0);
        expect(container.querySelectorAll('.widget-category').length).toBeGreaterThan(0);
        expect(container.querySelectorAll('.item').length).toBeGreaterThan(20);
        expect(mockRegistry.load).toHaveBeenCalled();
    });

    it('marks protocol-specific or unsupported widgets as incompatible in direct mode', async () => {
        const { renderWidgetPalette } = await import('../../js/ui/widget_palette.js');

        await renderWidgetPalette('widgetPalette');

        const incompatible = document.querySelectorAll('.item.incompatible');
        expect(incompatible.length).toBeGreaterThan(0);
    });

    it('collects widget types and derives mode-specific expansion rules', async () => {
        const {
            WIDGET_CATEGORIES,
            collectWidgetTypes,
            getCategoryExpansion
        } = await import('../../js/ui/widget_palette.js');

        const types = collectWidgetTypes();

        expect(types).toContain('label');
        expect(types).toContain('lvgl_button');
        expect(types.length).toBe(new Set(types).size);
        expect(getCategoryExpansion(WIDGET_CATEGORIES.find((category) => category.id === 'lvgl'), 'lvgl')).toBe(true);
        expect(getCategoryExpansion(WIDGET_CATEGORIES.find((category) => category.id === 'advanced'), 'lvgl')).toBe(false);
        expect(getCategoryExpansion(WIDGET_CATEGORIES.find((category) => category.id === 'opendisplay'), 'oepl')).toBe(true);
    });

    it('calculates compatibility by rendering mode', async () => {
        const { getWidgetCompatibility } = await import('../../js/ui/widget_palette.js');

        expect(
            getWidgetCompatibility({ type: 'lvgl_button' }, { id: 'lvgl' }, {}, 'direct')
        ).toEqual({
            isCompatible: false,
            explanation: 'Not supported in Direct rendering mode'
        });

        expect(
            getWidgetCompatibility(
                { type: 'calendar' },
                { id: 'advanced' },
                { exportOpenDisplay: vi.fn() },
                'opendisplay'
            ).isCompatible
        ).toBe(false);

        expect(
            getWidgetCompatibility(
                { type: 'sensor_text' },
                { id: 'core' },
                { exportLVGL: vi.fn() },
                'lvgl'
            ).isCompatible
        ).toBe(true);
    });
});
