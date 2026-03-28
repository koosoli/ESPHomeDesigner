import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockAppState } = vi.hoisted(() => ({
    mockAppState: {
        updateWidget: vi.fn()
    }
}));

vi.mock('@core/state', () => ({
    AppState: mockAppState
}));

import plugin from '../../features/online_image/plugin.js';

function createPanel(callbacks) {
    return {
        createSection: vi.fn(),
        endSection: vi.fn(),
        addHint: vi.fn(),
        addLabeledInput: vi.fn((label, _type, _value, callback) => {
            callbacks[label] = callback;
        }),
        addLabeledInputWithPicker: vi.fn((label, _type, _value, callback) => {
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
        addColorSelector: vi.fn((label, _value, _colors, callback) => {
            callbacks[label] = callback;
        }),
        addDropShadowButton: vi.fn(),
        getContainer() {
            return document.body;
        }
    };
}

describe('online_image plugin', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
        mockAppState.updateWidget.mockReset();
    });

    it('renders remote images, overlays filenames, and falls back when loading fails', () => {
        const host = document.createElement('div');
        plugin.render(host, {
            id: 'remote_img',
            width: 120,
            height: 90,
            props: {
                url: 'https://example.com/cam/frame.png',
                invert: true,
                border_width: 2,
                border_color: 'red',
                border_radius: 4,
                bg_color: 'white'
            }
        }, {
            getColorStyle: (value) => value
        });

        const image = /** @type {HTMLImageElement} */ (host.querySelector('img'));
        expect(image.style.filter).toContain('invert(1)');
        expect(host.style.border).toBe('2px solid red');
        expect(host.style.backgroundColor).toBe('white');

        image.onload?.(new Event('load'));
        expect(host.textContent).toContain('frame.png');

        image.onerror?.(new Event('error'));
        expect(host.textContent).toContain('Load Failed');

        const emptyHost = document.createElement('div');
        plugin.render(emptyHost, {
            id: 'empty_img',
            width: 50,
            height: 40,
            props: {}
        }, {
            getColorStyle: (value) => value
        });
        expect(emptyHost.textContent).toContain('Online Image');
    });

    it('wires property editors to AppState updates', () => {
        const callbacks = {};
        plugin.renderProperties(createPanel(callbacks), {
            id: 'image_props',
            entity_id: '',
            props: {
                url: 'https://example.com/old.png',
                interval_s: 300,
                invert: false,
                render_mode: 'Auto',
                opacity: 100
            }
        });

        callbacks['Remote URL']('https://example.com/new.png');
        callbacks['Dynamic URL Entity']('sensor.camera_url');
        callbacks['Update interval (seconds)']('15');
        callbacks['Invert colors'](true);

        expect(mockAppState.updateWidget).toHaveBeenNthCalledWith(1, 'image_props', {
            props: expect.objectContaining({
                url: 'https://example.com/new.png'
            })
        });
        expect(mockAppState.updateWidget).toHaveBeenNthCalledWith(2, 'image_props', {
            entity_id: 'sensor.camera_url'
        });
        expect(mockAppState.updateWidget).toHaveBeenNthCalledWith(3, 'image_props', {
            props: expect.objectContaining({
                interval_s: 15
            })
        });
        expect(mockAppState.updateWidget).toHaveBeenNthCalledWith(4, 'image_props', {
            props: expect.objectContaining({
                invert: true
            })
        });
    });

    it('exports document and component payloads for mono, color, and LVGL targets', () => {
        const widget = {
            id: 'image-1',
            type: 'online_image',
            x: 10,
            y: 15,
            width: 50,
            height: 60,
            props: {
                url: 'https://example.com/asset.jpg',
                format: 'JPG',
                render_mode: 'Binary',
                invert: true,
                rotation: 90,
                border_width: 1,
                border_color: 'blue',
                interval_s: 15
            }
        };

        const monoLines = [];
        plugin.export(widget, {
            lines: monoLines,
            getConditionCheck: () => '',
            getColorConst: (value) => `Color(${value})`,
            profile: { features: {}, name: 'Mono Panel' }
        });
        expect(monoLines.join('\n')).toContain('it.image(10, 15, id(online_img_image_1), color_off, color_on);');
        expect(monoLines.join('\n')).toContain('it.rectangle(10 + 0, 15 + 0, 50 - 2 * 0, 60 - 2 * 0, Color(blue));');

        expect(plugin.exportLVGL(widget, {
            common: { id: 'base' },
            convertColor: (value) => `0x${value}`
        })).toEqual({
            image: {
                id: 'base',
                src: 'online_img_image_1',
                angle: 90,
                pivot_x: 0,
                pivot_y: 0,
                image_recolor: '0xundefined',
                image_recolor_opa: 'cover'
            }
        });

        expect(plugin.exportOpenDisplay({ ...widget, props: { url: '' } }, { _layout: {}, _page: {} })).toBeNull();
        expect(plugin.exportOEPL(widget, { _layout: {}, _page: {} })).toEqual({
            type: 'dlimg',
            url: 'https://example.com/asset.jpg',
            x: 10,
            y: 15,
            xsize: 50,
            ysize: 60,
            rotate: 90
        });

        const lcdLines = [];
        plugin.onExportComponents({
            lines: lcdLines,
            widgets: [{
                ...widget,
                props: {
                    ...widget.props,
                    render_mode: 'Auto'
                }
            }],
            profile: { features: { lcd: true }, name: 'LCD Panel' },
            isLvgl: false
        });
        expect(lcdLines.join('\n')).toContain('format: JPEG');
        expect(lcdLines.join('\n')).toContain('resize: 50x60');
        expect(lcdLines.join('\n')).toContain('component.update: my_display');

        const lvglLines = [];
        plugin.onExportComponents({
            lines: lvglLines,
            widgets: [widget],
            profile: { features: {}, name: 'Mono Panel' },
            isLvgl: true
        });
        expect(lvglLines.join('\n')).toContain('lvgl.widget.refresh: image-1');
    });
});
