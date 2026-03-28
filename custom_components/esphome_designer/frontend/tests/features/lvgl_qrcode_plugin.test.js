import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import plugin from '../../features/lvgl_qrcode/plugin.js';

describe('lvgl_qrcode plugin', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
        delete globalThis.window.qrcode;
    });

    afterEach(() => {
        delete globalThis.window.qrcode;
    });

    it('renders SVG previews when a QR factory is available and falls back otherwise', () => {
        globalThis.window.qrcode = vi.fn(() => ({
            addData: vi.fn(),
            make: vi.fn(),
            createSvgTag: vi.fn(() => '<svg xmlns="http://www.w3.org/2000/svg"><rect width="10" height="10" /></svg>')
        }));

        const host = document.createElement('div');
        plugin.render(host, {
            id: 'qr_svg',
            width: 80,
            height: 80,
            props: {
                text: 'hello world',
                color: 'black',
                bg_color: 'white',
                scale: 5
            }
        }, {
            getColorStyle: (value) => value
        });

        const svg = host.querySelector('svg');
        expect(svg).not.toBeNull();
        expect(svg.style.fill).toBe('black');
        expect(host.style.backgroundColor).toBe('white');

        delete globalThis.window.qrcode;
        const fallback = document.createElement('div');
        plugin.render(fallback, {
            id: 'qr_fallback',
            width: 80,
            height: 80,
            props: {
                color: 'navy'
            }
        }, {
            getColorStyle: (value) => value
        });

        expect(fallback.textContent).toBe('QR');
        expect(fallback.style.outline).toBe('2px solid navy');
    });

    it('exports LVGL qr payloads and text-sensor refresh hooks', () => {
        const exported = plugin.exportLVGL({
            id: 'qr_1',
            entity_id: 'text.sensor',
            props: {
                size: 120,
                color: 'navy',
                bg_color: 'ivory'
            }
        }, {
            common: { id: 'base' },
            convertColor: (value) => `Color(${value})`
        });

        expect(exported.qrcode).toMatchObject({
            id: 'base',
            size: 120,
            dark_color: 'Color(navy)',
            light_color: 'Color(ivory)'
        });
        expect(exported.qrcode.text).toContain('id(text_sensor).state.c_str()');

        const pendingTriggers = new Map();
        plugin.onExportTextSensors({
            widgets: [
                { id: 'qr_1', type: 'lvgl_qrcode', props: { entity_id: 'sensor.payload' } },
                { id: 'ignore', type: 'text', props: { entity_id: 'sensor.other' } }
            ],
            isLvgl: true,
            pendingTriggers
        });

        expect([...pendingTriggers.keys()]).toEqual(['sensor.payload']);
        expect([...pendingTriggers.get('sensor.payload')]).toEqual(['- lvgl.widget.refresh: qr_1']);
    });
});
