import { describe, it, expect, beforeEach, vi } from 'vitest';

const { mockOn, mockLogger } = vi.hoisted(() => ({
    mockOn: vi.fn(),
    mockLogger: {
        log: vi.fn(),
        error: vi.fn()
    }
}));

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
vi.mock('../../js/utils/logger.js', () => ({ Logger: mockLogger }));
vi.mock('../../js/core/events.js', () => ({
    EVENTS: { SETTINGS_CHANGED: 'SETTINGS_CHANGED' },
    on: mockOn
}));

describe('widget_palette', () => {
    beforeEach(() => {
        vi.resetModules();
        document.body.innerHTML = '<div id="widgetPalette"></div>';
        mockRegistry.load.mockClear();
        mockRegistry.load.mockImplementation(() => Promise.resolve());
        mockOn.mockClear();
        mockLogger.log.mockClear();
        mockLogger.error.mockClear();
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

    it('refreshes the palette when settings mode changes and skips missing containers', async () => {
        const { renderWidgetPalette } = await import('../../js/ui/widget_palette.js');

        await renderWidgetPalette('missing-widget-palette');
        expect(mockRegistry.load).not.toHaveBeenCalled();

        const settingsCallback = mockOn.mock.calls[0]?.[1];
        expect(typeof settingsCallback).toBe('function');

        await settingsCallback?.({ renderingMode: 'lvgl' });
        expect(mockRegistry.load).toHaveBeenCalled();
    });

    it('logs and continues rendering when plugin preloading fails', async () => {
        mockRegistry.load.mockImplementation(() => Promise.reject(new Error('load failed')));
        const { renderWidgetPalette } = await import('../../js/ui/widget_palette.js');

        await renderWidgetPalette('widgetPalette');

        expect(mockLogger.error).toHaveBeenCalled();
        expect(document.querySelectorAll('.widget-category').length).toBeGreaterThan(0);
    });
});
