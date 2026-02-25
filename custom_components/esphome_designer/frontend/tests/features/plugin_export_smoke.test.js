import { describe, it, expect, vi } from 'vitest';

// Use Vite's glob import to find all plugins
const plugins = import.meta.glob('../../features/*/plugin.js', { eager: true });

const mockExportContext = {
    lines: [],
    addFont: vi.fn(() => 'font_id'),
    getColorConst: vi.fn((c) => `Color(${c})`),
    getAlignX: vi.fn((a, x, w) => x),
    getAlignY: vi.fn((a, y, h) => y),
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
    Object.entries(plugins).forEach(([path, module]) => {
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
                it('should export standard C++ without crashing', () => {
                    expect(() => {
                        plugin.export(widget, { ...mockExportContext, lines: [], profile: { features: {}, pins: {} } });
                    }).not.toThrow();
                });
            }

            if (plugin.exportLVGL) {
                it('should export LVGL without crashing', () => {
                    expect(() => {
                        plugin.exportLVGL(widget, mockLvglContext);
                    }).not.toThrow();
                });
            }

            if (plugin.exportOEPL) {
                it('should export OEPL without crashing', () => {
                    expect(() => {
                        plugin.exportOEPL(widget, mockOdpContext);
                    }).not.toThrow();
                });
            }

            if (plugin.exportOpenDisplay) {
                it('should export OpenDisplay without crashing', () => {
                    expect(() => {
                        plugin.exportOpenDisplay(widget, mockOdpContext);
                    }).not.toThrow();
                });
            }

            // Hook tests
            if (plugin.onExportTextSensors) {
                it('should handle onExportTextSensors without crashing', () => {
                    expect(() => {
                        plugin.onExportTextSensors({ ...globalContext, lines: [] });
                    }).not.toThrow();
                });
            }

            if (plugin.onExportNumericSensors) {
                it('should handle onExportNumericSensors without crashing', () => {
                    expect(() => {
                        plugin.onExportNumericSensors({ ...globalContext, lines: [] });
                    }).not.toThrow();
                });
            }

            if (plugin.onExportBinarySensors) {
                it('should handle onExportBinarySensors without crashing', () => {
                    expect(() => {
                        plugin.onExportBinarySensors({ ...globalContext, lines: [] });
                    }).not.toThrow();
                });
            }

            if (plugin.onExportGlobals) {
                it('should handle onExportGlobals without crashing', () => {
                    expect(() => {
                        plugin.onExportGlobals({ ...globalContext, lines: [] });
                    }).not.toThrow();
                });
            }

            if (plugin.onExportComponents) {
                it('should handle onExportComponents without crashing', () => {
                    expect(() => {
                        plugin.onExportComponents({ ...globalContext, lines: [], displayId: 'disp' });
                    }).not.toThrow();
                });
            }
        });
    });
});
