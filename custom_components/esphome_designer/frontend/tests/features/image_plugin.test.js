import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const mockAppState = {
    updateWidget: vi.fn(),
    getCanvasDimensions: vi.fn(() => ({ width: 800, height: 480 }))
};
const mockGetHaHeaders = vi.fn(() => ({
    Authorization: 'Bearer panel-token',
    'Content-Type': 'application/json'
}));

vi.mock('@core/state', () => ({
    AppState: mockAppState
}));

vi.mock('../../js/io/ha_api.js', () => ({
    getHaHeaders: mockGetHaHeaders
}));

describe('image plugin', () => {
    beforeEach(() => {
        vi.resetModules();
        vi.clearAllMocks();
        document.body.innerHTML = '';
        Object.defineProperty(URL, 'createObjectURL', {
            configurable: true,
            value: vi.fn(() => 'blob:image-preview')
        });
        Object.defineProperty(URL, 'revokeObjectURL', {
            configurable: true,
            value: vi.fn()
        });
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            blob: vi.fn().mockResolvedValue(new Blob(['png'], { type: 'image/png' }))
        }));
    });

    afterEach(() => {
        vi.restoreAllMocks();
        vi.unstubAllGlobals();
    });

    it('renders local-path images through the authenticated preview fetch and selection overlays', async () => {
        const plugin = (await import('../../features/image/plugin.js')).default;
        const host = document.createElement('div');
        document.body.appendChild(host);
        const widget = {
            id: 'img-1',
            x: 10,
            y: 12,
            width: 100,
            height: 50,
            props: {
                path: '/local/backgrounds/logo.png',
                invert: true,
                border_width: 2,
                border_color: 'red',
                border_radius: 4,
                bg_color: 'white'
            }
        };

        plugin.render(host, widget, {
            getColorStyle: (value) => ({ red: 'red', white: 'white' }[value] || value),
            selected: true,
            profile: { displayType: 'binary' }
        });

        const img = /** @type {HTMLImageElement} */ (host.querySelector('img'));
        expect(host.style.borderWidth).toBe('2px');
        expect(host.style.borderStyle).toBe('solid');
        expect(host.style.borderRadius).toBe('4px');
        expect(host.style.backgroundColor).not.toBe('');
        expect(img.style.filter).toContain('invert(1)');
        expect(img.style.filter).toContain('grayscale(100%)');
        await Promise.resolve();
        await Promise.resolve();
        expect(fetch).toHaveBeenCalledWith('/api/esphome_designer/image_proxy?path=%2Fconfig%2Fwww%2Fbackgrounds%2Flogo.png', expect.objectContaining({
            headers: { Authorization: 'Bearer panel-token' }
        }));
        expect(mockGetHaHeaders).toHaveBeenCalledTimes(1);
        await new Promise((resolve) => setTimeout(resolve, 0));
        expect(URL.createObjectURL).toHaveBeenCalledTimes(1);

        img.onload?.(new Event('load'));
        expect(host.textContent).toContain('logo.png');
        expect(URL.revokeObjectURL).not.toHaveBeenCalled();
    });

    it('reuses the same local preview image node and cached blob URL across rerenders', async () => {
        const plugin = (await import('../../features/image/plugin.js')).default;
        const host = document.createElement('div');
        document.body.appendChild(host);
        const widget = {
            id: 'img-rerender',
            x: 0,
            y: 0,
            width: 80,
            height: 40,
            props: {
                path: '/config/esphome/image/oli.jpg'
            }
        };
        const context = {
            getColorStyle: (value) => value,
            selected: true,
            profile: { displayType: 'color' }
        };

        plugin.render(host, widget, context);
        await Promise.resolve();
        await Promise.resolve();
        await new Promise((resolve) => setTimeout(resolve, 0));

        const firstImg = /** @type {HTMLImageElement} */ (host.querySelector('img'));
        firstImg.onload?.(new Event('load'));

        plugin.render(host, widget, {
            ...context,
            selected: false
        });
        await Promise.resolve();
        await Promise.resolve();
        await new Promise((resolve) => setTimeout(resolve, 0));

        const secondImg = /** @type {HTMLImageElement} */ (host.querySelector('img'));
        expect(secondImg).toBe(firstImg);
        expect(secondImg.src).toBe('blob:image-preview');
        expect(fetch).toHaveBeenCalledTimes(1);
        expect(URL.createObjectURL).toHaveBeenCalledTimes(1);
    });

    it('renders URL images, load failures, and placeholder content', async () => {
        const plugin = (await import('../../features/image/plugin.js')).default;

        const urlHost = document.createElement('div');
        const urlWidget = {
            id: 'img-url',
            x: 0,
            y: 0,
            width: 90,
            height: 90,
            props: {
                url: 'https://example.com/test.png'
            }
        };

        plugin.render(urlHost, urlWidget, {
            getColorStyle: (value) => value,
            selected: true,
            profile: { displayType: 'grayscale' }
        });

        const remoteImg = /** @type {HTMLImageElement} */ (urlHost.querySelector('img'));
        expect(remoteImg.src).toBe('https://example.com/test.png');
        expect(remoteImg.style.filter).toContain('grayscale(100%)');
        remoteImg.onload?.(new Event('load'));
        expect(urlHost.textContent).toContain('test.png');
        remoteImg.onerror?.(new Event('error'));
        expect(urlHost.textContent).toContain('Load Failed');

        const localHost = document.createElement('div');
        plugin.render(localHost, {
            id: 'img-path-error',
            x: 0,
            y: 0,
            width: 40,
            height: 40,
            props: { path: '/config/images/fallback.png' }
        }, {
            getColorStyle: (value) => value,
            selected: false,
            profile: { displayType: 'color' }
        });
        const localImg = /** @type {HTMLImageElement} */ (localHost.querySelector('img'));
        localImg.onerror?.(new Event('error'));
        expect(localHost.textContent).toContain('fallback.png');

        const placeholderHost = document.createElement('div');
        plugin.render(placeholderHost, {
            id: 'img-empty',
            x: 0,
            y: 0,
            width: 40,
            height: 40,
            props: {}
        }, {
            getColorStyle: (value) => value,
            selected: false,
            profile: { displayType: 'color' }
        });
        expect(placeholderHost.textContent).toContain('Image Widget');
    });

    it('falls back cleanly when authenticated local preview fetch fails and returns null OEPL export without a source', async () => {
        const plugin = (await import('../../features/image/plugin.js')).default;
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: false,
            status: 503
        }));

        const host = document.createElement('div');
        document.body.appendChild(host);
        plugin.render(host, {
            id: 'img-fetch-fail',
            x: 0,
            y: 0,
            width: 40,
            height: 40,
            props: { path: '/local/backgrounds/fetch-fail.png' }
        }, {
            getColorStyle: (value) => value,
            selected: false,
            profile: { displayType: 'color' }
        });

        await Promise.resolve();
        await Promise.resolve();
        await new Promise((resolve) => setTimeout(resolve, 0));
        expect(host.textContent).toContain('fetch-fail.png');

        expect(plugin.exportOEPL({
            id: 'img-empty-export',
            x: 1,
            y: 2,
            width: 3,
            height: 4,
            props: {}
        }, { _layout: {}, _page: {} })).toBeNull();
    });

    it('wires property editors and the fullscreen toggle to AppState updates', async () => {
        const plugin = (await import('../../features/image/plugin.js')).default;
        const container = document.createElement('div');
        const widget = {
            id: 'img-props',
            x: 50,
            y: 50,
            width: 200,
            height: 150,
            props: {
                path: '/config/logo.png',
                url: '',
                invert: false,
                render_mode: 'Auto',
                transparency: 'opaque',
                opacity: 60,
                border_width: 1,
                border_color: 'theme_auto',
                border_radius: 3
            }
        };

        const callbacks = {};
        const panel = {
            createSection: vi.fn(),
            endSection: vi.fn(),
            addHint: vi.fn(),
            addLabeledInput: vi.fn((label, _type, _value, callback) => {
                callbacks[label] = callback;
            }),
            addCheckbox: vi.fn((label, _value, callback) => {
                callbacks[label] = callback;
            }),
            addSelect: vi.fn((label, _value, _options, callback) => {
                callbacks[label] = callback;
            }),
            addNumberWithSlider: vi.fn((label, _value, _min, _max, callback) => {
                callbacks[label] = callback;
            }),
            addColorSelector: vi.fn((label, _value, _unused, callback) => {
                callbacks[label] = callback;
            }),
            addDropShadowButton: vi.fn(),
            getContainer: () => container
        };

        plugin.renderProperties(panel, widget);

        callbacks['Image Path']('/local/backgrounds/new-logo.png');
        callbacks['Invert colors'](true);
        callbacks['Transparency']('alpha_channel');
        callbacks['Border Width']('4');

        expect(mockAppState.updateWidget).toHaveBeenNthCalledWith(1, 'img-props', expect.objectContaining({
            props: expect.objectContaining({
                path: '/config/www/backgrounds/new-logo.png',
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenNthCalledWith(2, 'img-props', expect.objectContaining({
            props: expect.objectContaining({
                invert: true,
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenNthCalledWith(3, 'img-props', expect.objectContaining({
            props: expect.objectContaining({
                transparency: 'alpha_channel'
            })
        }));
        expect(mockAppState.updateWidget).toHaveBeenNthCalledWith(4, 'img-props', expect.objectContaining({
            props: expect.objectContaining({
                border_width: 4
            })
        }));

        const fillButton = /** @type {HTMLButtonElement} */ (container.querySelector('button'));
        fillButton.click();
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('img-props', { x: 0, y: 0, width: 800, height: 480 });

        mockAppState.updateWidget.mockClear();
        container.innerHTML = '';
        plugin.renderProperties(panel, {
            ...widget,
            x: 0,
            y: 0,
            width: 800,
            height: 480
        });
        const restoreButton = /** @type {HTMLButtonElement} */ (container.querySelector('button'));
        restoreButton.click();
        expect(mockAppState.updateWidget).toHaveBeenCalledWith('img-props', { x: 50, y: 50, width: 200, height: 150 });
    });

    it('exports images for document, LVGL, OEPL, and OpenDisplay targets', async () => {
        const plugin = (await import('../../features/image/plugin.js')).default;
        const widget = {
            id: 'img-export',
            type: 'image',
            x: 4,
            y: 5,
            width: 120,
            height: 64,
            props: {
                path: '/config/esphome/images/logo.png',
                url: '',
                invert: true,
                border_width: 2,
                border_color: 'theme_auto',
                rotation: 15
            }
        };

        const monoLines = [];
        plugin.export(widget, {
            lines: monoLines,
            getConditionCheck: () => 'if (true) {',
            getColorConst: (value) => `Color(${value})`,
            profile: { features: { epaper: true }, name: 'Mono Panel' }
        });
        expect(monoLines.join('\n')).toContain('it.image(4, 5, id(img_config_esphome_images_logo_png_120x64), color_off, color_on);');
        expect(monoLines.join('\n')).toContain('it.rectangle(4 + 0');

        const colorLines = [];
        plugin.export(widget, {
            lines: colorLines,
            getConditionCheck: () => '',
            getColorConst: (value) => `Color(${value})`,
            profile: { features: { lcd: true }, name: 'Color Panel' }
        });
        expect(colorLines.join('\n')).toContain('it.image(4, 5, id(img_config_esphome_images_logo_png_120x64));');

        expect(plugin.exportLVGL(widget, {
            common: { id: 'base' },
            _convertColor: () => 'unused'
        })).toEqual({
            image: {
                id: 'base',
                src: 'img_config_esphome_images_logo_png_120x64',
                angle: 15,
                image_recolor_opa: 'transp'
            }
        });

        expect(plugin.exportOpenDisplay(widget, { _layout: {}, _page: {} })).toEqual({
            type: 'text',
            value: '[Local Image: /config/esphome/images/logo.png]',
            x: 4,
            y: 5,
            size: 12,
            color: 'red'
        });

        expect(plugin.exportOEPL(widget, { _layout: {}, _page: {} })).toEqual({
            type: 'image',
            file: '/config/esphome/images/logo.png',
            x: 4,
            y: 5,
            width: 120,
            height: 64
        });

        expect(plugin.exportOEPL({
            ...widget,
            props: { ...widget.props, path: '/local/backgrounds/logo.png' }
        }, { _layout: {}, _page: {} })).toEqual({
            type: 'image',
            file: '/config/www/backgrounds/logo.png',
            x: 4,
            y: 5,
            width: 120,
            height: 64
        });

        expect(plugin.exportOpenDisplay({
            ...widget,
            props: { url: 'https://example.com/test.png', rotation: 5 }
        }, { _layout: {}, _page: {} })).toEqual({
            type: 'dlimg',
            url: 'https://example.com/test.png',
            x: 4,
            y: 5,
            xsize: 120,
            ysize: 64,
            rotate: 5
        });

        expect(plugin.exportOEPL({
            ...widget,
            props: { url: 'https://example.com/test.png' }
        }, { _layout: {}, _page: {} })).toEqual({
            type: 'online_image',
            url: 'https://example.com/test.png',
            x: 4,
            y: 5,
            width: 120,
            height: 64
        });
    });

    it('deduplicates component exports and switches output type for color displays', async () => {
        const plugin = (await import('../../features/image/plugin.js')).default;
        const widgets = [
            {
                id: 'a',
                type: 'image',
                width: 120,
                height: 64,
                props: { path: '/config/esphome/images/logo.png' }
            },
            {
                id: 'b',
                type: 'image',
                width: 120,
                height: 64,
                props: { path: '/config/esphome/images/logo.png' }
            }
        ];

        const monoLines = [];
        plugin.onExportComponents({
            lines: monoLines,
            widgets,
            profile: { features: {}, name: 'Mono Panel' }
        });
        expect(monoLines.join('\n')).toContain('type: BINARY');
        expect(monoLines.join('\n')).toContain('dither: FLOYDSTEINBERG');
        expect(monoLines.filter((line) => line.includes('file:'))).toHaveLength(1);

        const colorLines = [];
        plugin.onExportComponents({
            lines: colorLines,
            widgets,
            profile: { features: { lcd: true }, name: 'Color Panel' }
        });
        expect(colorLines.join('\n')).toContain('type: RGB565');
        expect(colorLines.join('\n')).toContain('transparency: opaque');
        expect(colorLines.join('\n')).not.toContain('use_transparency');

        const alphaLines = [];
        plugin.onExportComponents({
            lines: alphaLines,
            widgets: [{
                id: 'c',
                type: 'image',
                width: 80,
                height: 40,
                props: {
                    path: '/config/esphome/images/overlay.png',
                    transparency: 'alpha_channel'
                }
            }],
            profile: { features: { lcd: true }, name: 'Color Panel' }
        });
        expect(alphaLines.join('\n')).toContain('type: RGB565');
        expect(alphaLines.join('\n')).toContain('transparency: alpha_channel');
    });
});
