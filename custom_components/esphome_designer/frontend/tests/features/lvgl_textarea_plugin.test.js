import { beforeEach, describe, expect, it } from 'vitest';

import plugin from '../../features/lvgl_textarea/plugin.js';

describe('lvgl_textarea plugin', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    it('renders placeholder and content states with a cursor overlay', () => {
        const placeholderHost = document.createElement('div');
        plugin.render(placeholderHost, {
            id: 'textarea_placeholder',
            width: 120,
            height: 40,
            props: {
                placeholder_text: 'Type here'
            }
        }, {
            _getColorStyle: () => '#000'
        });

        expect(placeholderHost.textContent).toContain('Type here');
        expect(placeholderHost.lastElementChild.style.position).toBe('absolute');

        const textHost = document.createElement('div');
        plugin.render(textHost, {
            id: 'textarea_text',
            width: 120,
            height: 40,
            props: {
                text: 'Hello'
            }
        }, {
            _getColorStyle: () => '#000'
        });

        expect(textHost.textContent).toContain('Hello');
        expect(textHost.textContent).not.toContain('Enter text...');
    });

    it('exports LVGL textarea descriptors with placeholder fallback and flags', () => {
        const exported = plugin.exportLVGL({
            id: 'textarea_export',
            props: {
                placeholder: 'Fallback placeholder',
                text: 'Hello',
                max_length: 32,
                one_line: true,
                password_mode: true
            }
        }, {
            getStyleProps: () => ({}),
            getObjectDescriptor: () => ({
                id: 'base',
                attrs: {
                    existing: true
                }
            })
        });

        expect(exported).toEqual({
            id: 'base',
            type: 'textarea',
            attrs: {
                existing: true,
                placeholder_text: 'Fallback placeholder',
                text: 'Hello',
                max_length: 32,
                one_line: true,
                password_mode: true
            }
        });
    });
});
