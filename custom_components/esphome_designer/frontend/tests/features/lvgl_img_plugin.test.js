import { beforeEach, describe, expect, it } from 'vitest';

import plugin from '../../features/lvgl_img/plugin.js';

describe('lvgl_img plugin', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    it('renders file and symbol previews with rotation labels', () => {
        const fileHost = document.createElement('div');
        plugin.render(fileHost, {
            id: 'img_file',
            width: 64,
            height: 32,
            props: {
                src: 'assets/icons/power.png',
                rotation: 90,
                color: 'blue'
            }
        }, {
            getColorStyle: (value) => value
        });

        expect(fileHost.textContent).toContain('IMG: assets/icons/power.png');
        const fileLabel = /** @type {HTMLDivElement} */ (fileHost.firstElementChild?.firstElementChild);
        expect(fileLabel.style.transform).toBe('rotate(9deg)');

        const symbolHost = document.createElement('div');
        plugin.render(symbolHost, {
            id: 'img_symbol',
            width: 40,
            height: 40,
            props: {
                src: 'symbol_home'
            }
        }, {
            getColorStyle: (value) => value
        });

        expect(symbolHost.textContent).toContain('Symbol: symbol_home');
    });

    it('deduplicates exported image assets and chooses mono vs color encodings', () => {
        const monoLines = [];
        plugin.onExportComponents({
            lines: monoLines,
            widgets: [
                {
                    id: 'img_a',
                    type: 'lvgl_img',
                    width: 64,
                    height: 32,
                    props: { src: 'assets/icons/power.png' }
                },
                {
                    id: 'img_b',
                    type: 'lvgl_img',
                    width: 64,
                    height: 32,
                    props: { src: 'assets/icons/power.png' }
                }
            ],
            profile: { features: {}, name: 'Mono Panel' }
        });

        const monoOutput = monoLines.join('\n');
        expect(monoOutput).toContain('type: BINARY');
        expect(monoOutput).toContain('dither: FLOYDSTEINBERG');
        expect((monoOutput.match(/id: img_assets_icons_power_png_64x32/g) || [])).toHaveLength(1);

        const colorLines = [];
        plugin.onExportComponents({
            lines: colorLines,
            widgets: [
                {
                    id: 'img_c',
                    type: 'lvgl_img',
                    width: 64,
                    height: 32,
                    props: { src: 'assets/icons/power.png' }
                }
            ],
            profile: { features: { lcd: true }, name: 'LCD Panel' }
        });

        expect(colorLines.join('\n')).toContain('type: RGB565');
    });

    it('exports LVGL image ids for file assets while preserving symbol sources', () => {
        expect(plugin.exportLVGL({
            id: 'img_file',
            width: 64,
            height: 32,
            props: {
                src: 'assets/icons/power.png',
                rotation: 30,
                pivot_x: 8,
                pivot_y: 4,
                color: 'red'
            }
        }, {
            common: { id: 'base' },
            convertColor: (value) => `Color(${value})`
        }).image).toEqual({
            id: 'base',
            src: 'img_assets_icons_power_png_64x32',
            angle: 30,
            pivot_x: 8,
            pivot_y: 4,
            image_recolor: 'Color(red)',
            image_recolor_opa: 'cover'
        });

        expect(plugin.exportLVGL({
            id: 'img_symbol',
            width: 16,
            height: 16,
            props: {
                src: 'symbol_ok'
            }
        }, {
            common: { id: 'base' },
            convertColor: (value) => value
        }).image.src).toBe('symbol_ok');
    });
});
