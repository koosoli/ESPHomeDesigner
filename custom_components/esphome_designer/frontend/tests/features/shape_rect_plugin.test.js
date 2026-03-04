/**
 * @vitest-environment jsdom
 */
import { describe, it, expect } from 'vitest';
import shapeRectPlugin from '../../features/shape_rect/plugin.js';

describe('shape_rect plugin render', () => {
    it('applies border radius to canvas element style', () => {
        const el = document.createElement('div');
        const widget = {
            id: 'rect_1',
            type: 'shape_rect',
            x: 0,
            y: 0,
            width: 100,
            height: 60,
            props: {
                radius: 14,
                fill: true,
                color: 'black',
                border_width: 2,
                border_color: 'black'
            }
        };

        shapeRectPlugin.render(el, widget, {
            getColorStyle: (color) => color
        });

        expect(el.style.borderRadius).toBe('14px');
    });

    it('falls back to legacy border_radius when radius is not set', () => {
        const el = document.createElement('div');
        const widget = {
            id: 'rect_legacy',
            type: 'shape_rect',
            x: 0,
            y: 0,
            width: 100,
            height: 60,
            props: {
                border_radius: 9,
                fill: false,
                color: 'black',
                border_width: 1,
                border_color: 'black'
            }
        };

        shapeRectPlugin.render(el, widget, {
            getColorStyle: (color) => color
        });

        expect(el.style.borderRadius).toBe('9px');
    });
});
