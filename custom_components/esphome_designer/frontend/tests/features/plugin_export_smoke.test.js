import { describe, it, expect, vi } from 'vitest';

// Use Vite's glob import to find all plugins
const plugins = import.meta.glob('../../features/*/plugin.js', { eager: true });

const mockExportContext = {
    lines: [],
    addFont: vi.fn(() => 'font_id'),
    getColorConst: vi.fn((c) => `Color(${c})`),
    getAlignX: vi.fn((a, x, w) => x), // eslint-disable-line no-unused-vars
    getAlignY: vi.fn((a, y, h) => y), // eslint-disable-line no-unused-vars
    sanitize: vi.fn((s) => s),
    addDitherMask: vi.fn(),
    getCondProps: vi.fn(() => ''),
    getConditionCheck: vi.fn(() => ''),
    isEpaper: false,
    widgets: []
};

const mockLvglContext = {
    common: {},
    convertColor: vi.fn((c) => `Color(${c})`),
    getLVGLFont: vi.fn(() => 'font_ptr'),
    convertAlign: vi.fn((a) => a),
    formatOpacity: vi.fn((o) => o),
    getObjectDescriptor: vi.fn((w) => ({ type: 'obj', attrs: { id: w?.id } })),
    profile: { features: {}, pins: {} }
};

const mockOdpContext = {
    layout: {},
    page: {},
    profile: { features: {}, pins: {} }
};

describe('Plugin Export Smoke Tests', () => {
    Object.entries(plugins).forEach(([path, module]) => { // eslint-disable-line no-unused-vars
        const plugin = module.default;
        if (!plugin || !plugin.id) return;

        const widget = {
            id: 'w_test',
            type: plugin.id,
            x: 10, y: 10, width: 100, height: 100,
            props: { ...plugin.defaults }
        };

        const globalContext = {
            ...mockExportContext,
            widgets: [widget],
            isLvgl: true,
            pendingTriggers: new Map(),
            profile: { features: {}, pins: {} }
        };

        describe(`Export for ${plugin.id}`, () => {
            if (plugin.export) {
                it('should export standard C++ with stable output', () => {
                    const ctx = { ...mockExportContext, lines: [], profile: { features: {}, pins: {} } };
                    plugin.export(widget, ctx);
                    expect(ctx.lines).toMatchSnapshot();
                });
            }

            if (plugin.exportLVGL) {
                it('should export LVGL with stable output', () => {
                    const output = plugin.exportLVGL(widget, mockLvglContext);
                    expect(output).toMatchSnapshot();
                });
            }

            if (plugin.exportOEPL) {
                it('should export OEPL with stable output', () => {
                    const output = plugin.exportOEPL(widget, mockOdpContext);
                    expect(output).toMatchSnapshot();
                });
            }

            if (plugin.exportOpenDisplay) {
                it('should export OpenDisplay with stable output', () => {
                    const output = plugin.exportOpenDisplay(widget, mockOdpContext);
                    expect(output).toMatchSnapshot();
                });
            }

            // Hook tests
            if (plugin.onExportTextSensors) {
                it('should handle onExportTextSensors with stable output', () => {
                    const ctx = { ...globalContext, lines: [] };
                    plugin.onExportTextSensors(ctx);
                    expect(ctx.lines).toMatchSnapshot();
                });
            }

            if (plugin.onExportNumericSensors) {
                it('should handle onExportNumericSensors with stable output', () => {
                    const ctx = { ...globalContext, lines: [] };
                    plugin.onExportNumericSensors(ctx);
                    expect(ctx.lines).toMatchSnapshot();
                });
            }

            if (plugin.onExportBinarySensors) {
                it('should handle onExportBinarySensors with stable output', () => {
                    const ctx = { ...globalContext, lines: [] };
                    plugin.onExportBinarySensors(ctx);
                    expect(ctx.lines).toMatchSnapshot();
                });
            }

            if (plugin.onExportGlobals) {
                it('should handle onExportGlobals with stable output', () => {
                    const ctx = { ...globalContext, lines: [] };
                    plugin.onExportGlobals(ctx);
                    expect(ctx.lines).toMatchSnapshot();
                });
            }

            if (plugin.onExportComponents) {
                it('should handle onExportComponents with stable output', () => {
                    const ctx = { ...globalContext, lines: [], displayId: 'disp' };
                    plugin.onExportComponents(ctx);
                    expect(ctx.lines).toMatchSnapshot();
                });
            }
        });
    });
});
