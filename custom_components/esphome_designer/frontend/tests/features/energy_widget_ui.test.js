/**
 * @vitest-environment jsdom
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';

const { mockAppState } = vi.hoisted(() => ({
    mockAppState: {
        updateWidget: vi.fn(),
        entityStates: {}
    }
}));

vi.mock('@core/state', () => ({
    AppState: mockAppState
}));

import energyWidgetPlugin from '../../features/energy_widget/plugin.js';

function createPanelStub() {
    const container = document.createElement('div');
    const callbacks = {};

    return {
        callbacks,
        container,
        createSection: vi.fn(),
        endSection: vi.fn(),
        addHint: vi.fn(),
        addLabeledInput: vi.fn((label, _type, _value, callback) => {
            callbacks[label] = callback;
        }),
        addLabeledInputWithPicker: vi.fn((label, _type, _value, callback) => {
            callbacks[label] = callback;
        }),
        addSelect: vi.fn((label, _value, _options, callback) => {
            callbacks[label] = callback;
        }),
        addCheckbox: vi.fn((label, _value, callback) => {
            callbacks[label] = callback;
        }),
        addColorSelector: vi.fn((label, _value, _options, callback) => {
            callbacks[label] = callback;
        }),
        getContainer: () => container
    };
}

describe('energy_widget UI', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockAppState.entityStates = {};
        document.body.innerHTML = '';
    });

    it('renders the full properties panel and wires property updates', () => {
        const panel = createPanelStub();
        const widget = {
            id: 'energy_props',
            props: {
                show_battery: true,
                show_gas: true,
                font_family: 'Roboto',
                font_weight: 400,
                border_width: 1,
                border_radius: 12
            }
        };

        energyWidgetPlugin.renderProperties(panel, widget);

        expect(panel.callbacks['Battery Power']).toBeTypeOf('function');
        expect(panel.callbacks['Battery SOC']).toBeTypeOf('function');
        expect(panel.callbacks['Gas Entity']).toBeTypeOf('function');
        expect(panel.callbacks['Solar -> Battery']).toBeTypeOf('function');
        expect(panel.callbacks['Autoconsumption %']).toBeTypeOf('function');
        expect(panel.callbacks['Battery Sign Mode']).toBeTypeOf('function');
        expect(panel.callbacks['Font Family']).toBeTypeOf('function');

        panel.callbacks['Title']('My Energy');
        panel.callbacks['Show Gas'](false);
        panel.callbacks['Battery Power']('sensor.battery_power');
        panel.callbacks['Gas Entity']('sensor.gas_today');
        panel.callbacks['Solar -> Battery']('sensor.solar_to_battery');
        panel.callbacks['Autoconsumption %']('sensor.self_use_pct');
        panel.callbacks['Border Width']('3');
        panel.callbacks['Corner Radius']('18');
        panel.callbacks['Font Family']('Open Sans');

        expect(mockAppState.updateWidget.mock.calls.some(([id, payload]) =>
            id === 'energy_props' && payload.props?.title === 'My Energy'
        )).toBe(true);
        expect(mockAppState.updateWidget.mock.calls.some(([id, payload]) =>
            id === 'energy_props' && payload.props?.show_gas === false
        )).toBe(true);
        expect(mockAppState.updateWidget.mock.calls.some(([id, payload]) =>
            id === 'energy_props' && payload.props?.battery_power_entity === 'sensor.battery_power'
        )).toBe(true);
        expect(mockAppState.updateWidget.mock.calls.some(([id, payload]) =>
            id === 'energy_props' && payload.props?.gas_entity === 'sensor.gas_today'
        )).toBe(true);
        expect(mockAppState.updateWidget.mock.calls.some(([id, payload]) =>
            id === 'energy_props' && payload.props?.solar_to_battery_entity === 'sensor.solar_to_battery'
        )).toBe(true);
        expect(mockAppState.updateWidget.mock.calls.some(([id, payload]) =>
            id === 'energy_props' && payload.props?.autoconsumption_percent_entity === 'sensor.self_use_pct'
        )).toBe(true);
        expect(mockAppState.updateWidget.mock.calls.some(([id, payload]) =>
            id === 'energy_props' && payload.props?.border_width === 3
        )).toBe(true);
        expect(mockAppState.updateWidget.mock.calls.some(([id, payload]) =>
            id === 'energy_props' && payload.props?.border_radius === 18
        )).toBe(true);
        expect(mockAppState.updateWidget.mock.calls.some(([id, payload]) =>
            id === 'energy_props'
            && payload.props?.font_family === 'Open Sans'
            && payload.props?.font_weight !== undefined
        )).toBe(true);
    });

    it('omits battery and gas-specific controls when those sections are disabled', () => {
        const panel = createPanelStub();

        energyWidgetPlugin.renderProperties(panel, {
            id: 'energy_compact',
            props: {
                show_battery: false,
                show_gas: false
            }
        });

        expect(panel.callbacks['Battery Power']).toBeUndefined();
        expect(panel.callbacks['Battery SOC']).toBeUndefined();
        expect(panel.callbacks['Battery Sign Mode']).toBeUndefined();
        expect(panel.callbacks['Solar -> Battery']).toBeUndefined();
        expect(panel.callbacks['Gas Entity']).toBeUndefined();
        expect(panel.callbacks['Gas Label']).toBeUndefined();
    });

    it('renders a populated preview with title, flows, and all enabled boxes', () => {
        mockAppState.entityStates = {
            'sensor.solar_power': { state: '5.0' },
            'sensor.solar_to_home': { state: '3.0' },
            'sensor.solar_to_grid': { state: '1.5' },
            'sensor.solar_to_battery': { state: '0.5' },
            'sensor.self_use_pct': { state: '70' },
            'sensor.home_power': { state: '4.2' },
            'sensor.grid_power': { state: '-1.5' },
            'sensor.battery_power': { state: '0.8' },
            'sensor.battery_soc': { state: '62' },
            'sensor.gas_today': { state: '2.1' }
        };

        const host = document.createElement('div');
        energyWidgetPlugin.render(host, {
            id: 'energy_preview',
            width: 240,
            height: 180,
            props: {
                title: 'Energy',
                solar_entity: 'sensor.solar_power',
                solar_to_home_entity: 'sensor.solar_to_home',
                solar_to_grid_entity: 'sensor.solar_to_grid',
                solar_to_battery_entity: 'sensor.solar_to_battery',
                autoconsumption_percent_entity: 'sensor.self_use_pct',
                home_entity: 'sensor.home_power',
                grid_entity: 'sensor.grid_power',
                battery_power_entity: 'sensor.battery_power',
                battery_soc_entity: 'sensor.battery_soc',
                show_battery: true,
                show_gas: true,
                gas_entity: 'sensor.gas_today',
                decimals: 1,
                flow_unit: 'kW',
                border_width: 2,
                border_radius: 14,
                font_size: 14,
                label_font_size: 11
            }
        }, {
            getColorStyle: (value) => {
                if (value === undefined) return '#ffffff';
                if (value === 'theme_auto') return '#ffffff';
                if (value === 'gray') return '#888888';
                return String(value);
            }
        });

        expect(host.style.borderWidth).toBe('2px');
        expect(host.style.borderRadius).toBe('14px');
        expect(host.querySelectorAll('svg line')).toHaveLength(4);
        expect(host.textContent).toContain('Energy');
        expect(host.textContent).toContain('Solar');
        expect(host.textContent).toContain('Home');
        expect(host.textContent).toContain('Grid');
        expect(host.textContent).toContain('Battery');
        expect(host.textContent).toContain('Gas');
        expect(host.textContent).toContain('Self 70.0%');
        expect(host.textContent).toContain('Export 1.5 kW');
        expect(host.textContent).toContain('Solar 0.5 kW');
    });

    it('renders a minimal preview without title, battery, or gas when those options are disabled', () => {
        const host = document.createElement('div');
        energyWidgetPlugin.render(host, {
            id: 'energy_minimal',
            width: 220,
            height: 140,
            props: {
                show_battery: false,
                show_gas: false,
                border_width: 0,
                border_radius: 0,
                title: ''
            }
        }, {
            getColorStyle: (value) => {
                if (value === undefined) return '#000000';
                if (value === 'theme_auto') return '#111111';
                if (value === 'gray') return '#888888';
                return String(value);
            }
        });

        expect(host.style.borderWidth || '0px').toBe('0px');
        expect(host.querySelectorAll('svg line')).toHaveLength(2);
        expect(host.textContent).toContain('Solar');
        expect(host.textContent).toContain('Home');
        expect(host.textContent).toContain('Grid');
        expect(host.textContent).not.toContain('Battery');
        expect(host.textContent).not.toContain('Gas');
    });
});
