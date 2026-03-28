import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const { mockAppState } = vi.hoisted(() => ({
    mockAppState: {
        updateWidget: vi.fn()
    }
}));

vi.mock('@core/state', () => ({
    AppState: mockAppState
}));

import plugin from '../../features/qr_code/plugin.js';

function createPanel(callbacks) {
    return {
        createSection: vi.fn(),
        endSection: vi.fn(),
        addHint: vi.fn(),
        addSelect: vi.fn((label, _value, _options, callback) => {
            callbacks[label] = callback;
        }),
        addLabeledInput: vi.fn((label, _type, _value, callback) => {
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

describe('qr_code plugin', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
        mockAppState.updateWidget.mockReset();
        delete globalThis.qrcode;
    });

    afterEach(() => {
        delete globalThis.qrcode;
        vi.restoreAllMocks();
    });

    it('shows a loading fallback when the QR library is unavailable', () => {
        const host = document.createElement('div');

        plugin.render(host, {
            id: 'qr_missing',
            width: 100,
            height: 100,
            props: {}
        }, {
            getColorStyle: (value) => value
        });

        expect(host.innerHTML).toContain('QR Library');
    });

    it('renders QR canvases with borders, background colors, and calculated scale', () => {
        const fillRect = vi.fn();
        vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue({
            fillStyle: '',
            fillRect
        });

        globalThis.qrcode = vi.fn(() => ({
            addData: vi.fn(),
            make: vi.fn(),
            getModuleCount: () => 2,
            isDark: (row, col) => row === col
        }));

        const widget = {
            id: 'qr_render',
            width: 80,
            height: 80,
            props: {
                value: 'hello',
                ecc: 'QUARTILE',
                color: 'blue',
                bg_color: 'white',
                border_width: 2,
                border_color: 'red',
                border_radius: 3
            }
        };
        const host = document.createElement('div');

        plugin.render(host, widget, {
            getColorStyle: (value) => value
        });

        expect(globalThis.qrcode).toHaveBeenCalledWith(0, 'Q');
        expect(host.querySelector('canvas')).not.toBeNull();
        expect(fillRect).toHaveBeenCalledTimes(2);
        expect(host.style.border).toBe('2px solid red');
        expect(host.style.backgroundColor).toBe('white');
        expect(widget.props._calculatedScale).toBe(40);
    });

    it('updates WiFi-mode properties and exports OpenDisplay and LVGL payloads', () => {
        const callbacks = {};
        const widget = {
            id: 'qr_props',
            x: 4,
            y: 5,
            width: 60,
            height: 70,
            props: {
                mode: 'wifi',
                ssid: 'Office',
                password: 'secret',
                security: 'WPA',
                value: ''
            }
        };

        plugin.renderProperties(createPanel(callbacks), widget);
        callbacks.SSID('Guest');

        expect(mockAppState.updateWidget).toHaveBeenLastCalledWith('qr_props', {
            props: expect.objectContaining({
                ssid: 'Guest',
                value: 'WIFI:S:Guest;T:WPA;P:secret;;'
            })
        });

        expect(plugin.exportOpenDisplay(widget, { _layout: {}, _page: {} })).toEqual({
            type: 'qrcode',
            data: 'https://github.com/koosoli/ESPHomeDesigner/',
            x: 4,
            y: 5,
            boxsize: 2,
            border: 1,
            color: 'black',
            bgcolor: 'white'
        });

        expect(plugin.exportLVGL(widget, {
            common: { id: 'base' },
            convertColor: (value) => `0x${value}`
        }).qrcode).toMatchObject({
            id: 'base',
            size: 60
        });

        expect(plugin.exportOEPL({
            ...widget,
            props: {
                value: 'hello world'
            }
        }, { _layout: {}, _page: {} }).scale).toBeGreaterThan(0);
    });
});
