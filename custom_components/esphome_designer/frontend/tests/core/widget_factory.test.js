import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';
import { WidgetFactory } from '../../js/core/widget_factory';
import { registry } from '../../js/core/plugin_registry';
import { AppState } from '../../js/core/state';

// Mock AppState
vi.mock('../../js/core/state', () => ({
    AppState: {
        getCurrentPage: vi.fn(() => ({})),
        settings: { dark_mode: false },
        updateWidget: vi.fn()
    }
}));

describe('WidgetFactory', () => {
    const featuresDir = path.resolve(__dirname, '../../features');
    const pluginDirs = fs.readdirSync(featuresDir).filter(dir =>
        fs.existsSync(path.join(featuresDir, dir, 'plugin.js'))
    );

    beforeEach(async () => {
        vi.clearAllMocks();
        // Register all plugins
        for (const dir of pluginDirs) {
            const mod = await import(`../../features/${dir}/plugin.js`);
            registry.register(mod.default);
        }
    });

    describe('getEffectiveDarkMode', () => {
        it('should return true if page dark_mode is force "dark"', () => {
            AppState.getCurrentPage.mockReturnValue({ dark_mode: 'dark' });
            expect(WidgetFactory.getEffectiveDarkMode()).toBe(true);
        });

        it('should return false if page dark_mode is force "light"', () => {
            AppState.getCurrentPage.mockReturnValue({ dark_mode: 'light' });
            expect(WidgetFactory.getEffectiveDarkMode()).toBe(false);
        });

        it('should inherit from global settings if page dark_mode is "inherit"', () => {
            AppState.getCurrentPage.mockReturnValue({ dark_mode: 'inherit' });
            AppState.settings.dark_mode = true;
            expect(WidgetFactory.getEffectiveDarkMode()).toBe(true);
            AppState.settings.dark_mode = false;
            expect(WidgetFactory.getEffectiveDarkMode()).toBe(false);
        });
    });

    describe('createWidget', () => {
        it('should generate a unique ID', () => {
            const w1 = WidgetFactory.createWidget('text');
            const w2 = WidgetFactory.createWidget('text');
            expect(w1.id).toBeDefined();
            expect(w2.id).toBeDefined();
            expect(w1.id).not.toBe(w2.id);
        });

        it('should handle nav_next_page preset', () => {
            const w = WidgetFactory.createWidget('nav_next_page');
            expect(w.props.nav_action).toBe('next_page');
            expect(w.width).toBe(80);
            expect(w.height).toBe(80);
        });

        it('should handle nav_previous_page preset', () => {
            const w = WidgetFactory.createWidget('nav_previous_page');
            expect(w.props.nav_action).toBe('previous_page');
            expect(w.width).toBe(80);
            expect(w.height).toBe(80);
        });

        it('should handle nav_reload_page preset', () => {
            const w = WidgetFactory.createWidget('nav_reload_page');
            expect(w.props.nav_action).toBe('reload_page');
            expect(w.width).toBe(80);
            expect(w.height).toBe(80);
        });

        // Parametric tests for all plugins
        pluginDirs.forEach(dir => {
            it(`should create valid widget for plugin: ${dir}`, async () => {
                const mod = await import(`../../features/${dir}/plugin.js`);
                const plugin = mod.default;
                const w = WidgetFactory.createWidget(plugin.id);

                expect(w.type).toBe(plugin.id);
                expect(w.id).toBeTruthy();
                expect(typeof w.props).toBe('object');

                if (plugin.defaults) {
                    // Check that all defaults are merged
                    Object.keys(plugin.defaults).forEach(key => {
                        // Some props might be adjusted (like theme_auto) so we just check presence
                        expect(w.props).toHaveProperty(key);
                    });
                }

                expect(w.width).toBeGreaterThan(0);
                expect(w.height).toBeGreaterThan(0);
            });
        });

        it('should apply grid cell defaults to LVGL widgets', () => {
            const w = WidgetFactory.createWidget('lvgl_label');
            expect(w.props).toHaveProperty('grid_cell_row_pos');
            expect(w.props.grid_cell_row_span).toBe(1);
        });
    });
});
