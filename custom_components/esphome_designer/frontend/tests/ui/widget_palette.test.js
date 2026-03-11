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
});
