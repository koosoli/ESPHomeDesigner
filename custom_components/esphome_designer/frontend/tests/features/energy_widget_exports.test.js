import { describe, expect, it, vi } from 'vitest';

import {
    collectRequirements,
    exportDoc,
    exportLVGL,
    onExportNumericSensors
} from '../../features/energy_widget/exports.js';
import { getPreviewSnapshot } from '../../features/energy_widget/shared.js';

function createDocContext(overrides = {}) {
    return {
        lines: [],
        addFont: vi.fn((family, weight, size) => `${family.replace(/\s+/g, '_')}_${weight}_${size}`),
        getColorConst: (value) => `Color(${value})`,
        getConditionCheck: () => '',
        ...overrides
    };
}

describe('energy_widget exports', () => {
    it('exports direct-mode energy flow boxes and sign-aware arrows', () => {
        const context = createDocContext();

        exportDoc({
            id: 'energy_doc',
            x: 5,
            y: 6,
            width: 220,
            height: 140,
            props: {
                title: 'Energy',
                solar_entity: 'sensor.solar_power',
                solar_to_home_entity: 'sensor.solar_to_home',
                solar_to_grid_entity: 'sensor.solar_to_grid',
                solar_to_battery_entity: 'sensor.solar_to_battery',
                autoconsumption_percent_entity: 'sensor.solar_self_use_pct',
                home_entity: 'sensor.home_power',
                grid_entity: 'sensor.grid_power',
                battery_power_entity: 'sensor.battery_power',
                battery_soc_entity: 'sensor.battery_soc',
                gas_entity: 'sensor.gas_today',
                show_gas: true,
                grid_positive_mode: 'export',
                battery_positive_mode: 'discharging',
                flow_unit: 'kW',
                gas_unit: 'm3',
                decimals: 1,
                background_color: 'black'
            }
        }, context);

        const output = context.lines.join('\n');
        expect(output).toContain('id(sensor_solar_power)');
        expect(output).toContain('id(sensor_solar_to_home)');
        expect(output).toContain('id(sensor_solar_to_grid)');
        expect(output).toContain('id(sensor_solar_to_battery)');
        expect(output).toContain('id(sensor_solar_self_use_pct)');
        expect(output).toContain('id(sensor_home_power)');
        expect(output).toContain('id(sensor_grid_power)');
        expect(output).toContain('id(sensor_battery_power)');
        expect(output).toContain('id(sensor_battery_soc)');
        expect(output).toContain('grid_arrow = "<"; grid_label = "Export";');
        expect(output).toContain('battery_arrow = "<"; battery_label = "Discharging";');
        expect(output).toContain('Self %.1f%%');
        expect(output).toContain('Home %.1f kW');
        expect(output).toContain('Export %.1f kW');
        expect(output).toContain('Solar %.1f kW');
        expect(output).toContain('%.1f kW');
        expect(output).toContain('%.1f m3');
        expect(output).toContain('Energy');
    });

    it('exports LVGL widgets with lambda-backed values and optional battery state', () => {
        const result = exportLVGL({
            id: 'energy_lvgl',
            width: 220,
            height: 140,
            props: {
                solar_entity: 'sensor.solar_power',
                solar_to_grid_entity: 'sensor.solar_to_grid',
                solar_to_battery_entity: 'sensor.solar_to_battery',
                autoconsumption_percent_entity: 'sensor.solar_self_use_pct',
                home_entity: 'sensor.home_power',
                grid_entity: 'sensor.grid_power',
                battery_power_entity: 'sensor.battery_power',
                battery_soc_entity: 'sensor.battery_soc',
                show_battery: true,
                show_gas: false,
                battery_positive_mode: 'discharging'
            }
        }, {
            common: { id: 'energy_lvgl' },
            convertColor: (value) => `COLOR_${value}`,
            getLVGLFont: (family, size, weight) => `${family}-${size}-${weight}`
        });

        const serialized = JSON.stringify(result);
        expect(serialized).toContain('sensor_grid_power');
        expect(serialized).toContain('sensor_solar_to_grid');
        expect(serialized).toContain('sensor_solar_to_battery');
        expect(serialized).toContain('sensor_solar_self_use_pct');
        expect(serialized).toContain('sensor_battery_power');
        expect(serialized).toContain('sensor_battery_soc');
        expect(serialized).toContain('Discharging %.0f W');
        expect(serialized).toContain('Self %.0f%%');
        expect(serialized).toContain('%.0f W');
        expect(serialized).not.toContain('gas_arrow');
    });

    it('registers HA sensors and LVGL refresh triggers for all configured slots', () => {
        const lines = [];
        const pendingTriggers = new Map();
        const seenSensorIds = new Set();

        onExportNumericSensors({
            lines,
            widgets: [{
                id: 'energy_trigger',
                type: 'energy_widget',
                props: {
                    solar_entity: 'solar_power',
                    solar_to_home_entity: 'sensor.solar_to_home',
                    solar_to_grid_entity: 'sensor.solar_to_grid',
                    solar_to_battery_entity: 'sensor.solar_to_battery',
                    autoconsumption_percent_entity: 'sensor.solar_self_use_pct',
                    home_entity: 'sensor.home_power',
                    grid_entity: 'sensor.grid_power',
                    battery_power_entity: 'sensor.battery_power',
                    battery_soc_entity: 'sensor.battery_soc',
                    show_gas: true,
                    gas_entity: 'gas_today'
                }
            }],
            isLvgl: true,
            pendingTriggers,
            seenSensorIds
        });

        const output = lines.join('\n');
        expect(output).toContain('entity_id: sensor.solar_power');
        expect(output).toContain('entity_id: sensor.solar_to_home');
        expect(output).toContain('entity_id: sensor.solar_to_grid');
        expect(output).toContain('entity_id: sensor.solar_to_battery');
        expect(output).toContain('entity_id: sensor.solar_self_use_pct');
        expect(output).toContain('entity_id: sensor.home_power');
        expect(output).toContain('entity_id: sensor.grid_power');
        expect(output).toContain('entity_id: sensor.battery_power');
        expect(output).toContain('entity_id: sensor.battery_soc');
        expect(output).toContain('entity_id: sensor.gas_today');
        expect(pendingTriggers.get('sensor.grid_power')).toEqual(new Set(['- lvgl.widget.refresh: energy_trigger']));
        expect(pendingTriggers.get('sensor.solar_to_grid')).toEqual(new Set(['- lvgl.widget.refresh: energy_trigger']));
        expect(pendingTriggers.get('sensor.gas_today')).toEqual(new Set(['- lvgl.widget.refresh: energy_trigger']));
    });

    it('derives solar export, self-consumption, and solar-to-home from the base topology when helpers are missing', () => {
        const snapshot = getPreviewSnapshot({
            props: {
                solar_entity: 'sensor.solar_power',
                grid_entity: 'sensor.grid_power',
                battery_power_entity: 'sensor.battery_power',
                solar_to_battery_entity: 'sensor.solar_to_battery',
                flow_unit: 'kW',
                decimals: 1
            }
        }, {
            'sensor.solar_power': { state: '5.0' },
            'sensor.grid_power': { state: '-1.5' },
            'sensor.battery_power': { state: '0.8' },
            'sensor.solar_to_battery': { state: '0.5' }
        });

        expect(snapshot.solarToGrid).toBeCloseTo(1.5);
        expect(snapshot.autoconsumptionPercent).toBeCloseTo(70);
        expect(snapshot.solarToHome).toBeCloseTo(3.0);
        expect(snapshot.solarSubvalueText).toBe('Self 70.0%');
        expect(snapshot.solarFlowLabel).toBe('Home 3.0 kW');
        expect(snapshot.gridFlowLabel).toBe('Export 1.5 kW');
        expect(snapshot.batteryFlowLabel).toBe('Solar 0.5 kW');
    });

    it('collects the required fonts for title, values, and arrows', () => {
        const addFont = vi.fn();

        collectRequirements({
            props: {
                font_family: 'Montserrat',
                font_weight: 700,
                font_size: 16,
                label_font_size: 12
            }
        }, { addFont });

        expect(addFont).toHaveBeenCalledWith('Montserrat', 700, 12);
        expect(addFont).toHaveBeenCalledWith('Montserrat', 700, 16);
        expect(addFont).toHaveBeenCalledWith('Montserrat', 700, 14);
        expect(addFont).toHaveBeenCalledWith('Montserrat', 700, 16);
    });
});
