import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockAppState } = vi.hoisted(() => ({
    mockAppState: {
        entityStates: {}
    }
}));

vi.mock('../../js/core/state', () => ({
    AppState: mockAppState
}));

import { render } from '../../features/template_sensor_bar/render.js';

describe('template_sensor_bar render', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        document.body.innerHTML = '';
        mockAppState.entityStates = {};
    });

    it('renders live wifi, temperature, humidity, and local battery sensors with a styled background', () => {
        mockAppState.entityStates = {
            'sensor.wifi_signal': { state: '-71.4' },
            'sensor.temperature': { state: '20' },
            'sensor.humidity': { state: '44' },
            battery_level: { state: '22' }
        };

        const el = document.createElement('div');
        render(el, {
            id: 'sensor_bar_1',
            props: {
                show_background: true,
                background_color: 'white',
                border_color: 'black',
                border_thickness: 2,
                border_radius: 12,
                show_wifi: true,
                show_temperature: true,
                show_humidity: true,
                show_battery: true,
                bat_is_local: true,
                temp_unit: '\u00b0F',
                font_family: 'Inter',
                icon_size: 18,
                font_size: 12,
                font_weight: 700
            }
        }, {
            getColorStyle: (value) => value || '#000000',
            isDark: false
        });

        expect(el.style.backgroundColor).toBe('rgb(255, 255, 255)');
        expect(el.style.border).toContain('2px solid');
        expect(el.children).toHaveLength(4);
        const values = Array.from(el.querySelectorAll('span'))
            .map((node) => node.innerText)
            .filter(Boolean);
        expect(values).toContain('-71dB');
        expect(values).toContain('68.0\u00b0F');
        expect(values).toContain('44%');
        expect(values).toContain('22%');
        const firstValue = el.querySelectorAll('span')[1];
        expect(firstValue.style.fontFamily).toContain('Inter');
        expect(firstValue.style.fontWeight).toBe('700');
    });

    it('falls back to defaults and dashed borders for transparent backgrounds', () => {
        const el = document.createElement('div');
        render(el, {
            id: 'sensor_bar_2',
            props: {
                show_background: true,
                background_color: 'transparent',
                show_wifi: true,
                show_temperature: true,
                show_humidity: false,
                show_battery: true
            }
        }, {
            getColorStyle: (value) => value === 'theme_auto' ? '#000000' : value,
            isDark: true
        });

        expect(el.style.border).toContain('1px dashed');
        const values = Array.from(el.querySelectorAll('span'))
            .map((node) => node.innerText)
            .filter(Boolean);
        expect(values).toContain('-65dB');
        expect(values).toContain('23.5\u00b0C');
        expect(values).toContain('85%');
    });
});
