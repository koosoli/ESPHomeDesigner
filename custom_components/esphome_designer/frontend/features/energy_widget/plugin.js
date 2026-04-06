import { AppState } from '@core/state';
import { clampFontWeight, getWeightsForFont } from '@core/font_weights.js';
import { FONT_OPTIONS } from '../../js/core/properties/legacy_renderer_widget_properties_shared.js';
import { collectRequirements, exportDoc, exportLVGL, onExportNumericSensors } from './exports.js';
import { render } from './render.js';
import { DEFAULTS } from './shared.js';

const BUILT_IN_FONT_OPTIONS = FONT_OPTIONS.filter((option) => option !== 'Custom...');
const DISPLAY_MODE_OPTIONS = [
    { value: 'power_now', label: 'Power Now' },
    { value: 'energy_today', label: 'Energy Today' }
];
const GRID_MODE_OPTIONS = [
    { value: 'import', label: 'Positive = Import' },
    { value: 'export', label: 'Positive = Export' }
];
const BATTERY_MODE_OPTIONS = [
    { value: 'charging', label: 'Positive = Charging' },
    { value: 'discharging', label: 'Positive = Discharging' }
];

function renderProperties(panel, widget) {
    const props = {
        ...DEFAULTS,
        ...(widget.props || {})
    };

    const updateProp = (key, value) => {
        AppState.updateWidget(widget.id, {
            props: {
                ...widget.props,
                [key]: value
            }
        });
    };
    const setTextProp = (key) => (value) => updateProp(key, String(value));
    const setIntProp = (key) => (value) => updateProp(key, parseInt(String(value), 10));
    const setBoolProp = (key) => (value) => updateProp(key, value);

    panel.createSection('Layout', true);
    panel.addLabeledInput('Title', 'text', props.title || '', setTextProp('title'));
    panel.addSelect('Display Mode', props.display_mode, DISPLAY_MODE_OPTIONS, setTextProp('display_mode'));
    panel.addLabeledInput('Decimals', 'number', props.decimals, setIntProp('decimals'));
    panel.addLabeledInput('Flow Unit', 'text', props.flow_unit || '', setTextProp('flow_unit'));
    panel.addLabeledInput('Gas Unit', 'text', props.gas_unit || 'm3', setTextProp('gas_unit'));
    panel.addHint('Leave Flow Unit empty to auto-switch between W and kWh based on the selected display mode.');
    panel.endSection();

    panel.createSection('Entities', true);
    panel.addLabeledInputWithPicker('Solar Entity', 'text', props.solar_entity || '', setTextProp('solar_entity'), widget);
    panel.addLabeledInputWithPicker('Home Entity', 'text', props.home_entity || '', setTextProp('home_entity'), widget);
    panel.addLabeledInputWithPicker('Grid Entity', 'text', props.grid_entity || '', setTextProp('grid_entity'), widget);
    panel.addCheckbox('Show Battery', props.show_battery !== false, setBoolProp('show_battery'));
    if (props.show_battery !== false) {
        panel.addLabeledInputWithPicker('Battery Power', 'text', props.battery_power_entity || '', setTextProp('battery_power_entity'), widget);
        panel.addLabeledInputWithPicker('Battery SOC', 'text', props.battery_soc_entity || '', setTextProp('battery_soc_entity'), widget);
    }
    panel.addCheckbox('Show Gas', !!props.show_gas, setBoolProp('show_gas'));
    if (props.show_gas) {
        panel.addLabeledInputWithPicker('Gas Entity', 'text', props.gas_entity || '', setTextProp('gas_entity'), widget);
    }
    panel.endSection();

    panel.createSection('Flow Logic', false);
    panel.addSelect('Grid Sign Mode', props.grid_positive_mode, GRID_MODE_OPTIONS, setTextProp('grid_positive_mode'));
    if (props.show_battery !== false) {
        panel.addSelect('Battery Sign Mode', props.battery_positive_mode, BATTERY_MODE_OPTIONS, setTextProp('battery_positive_mode'));
    }
    panel.addHint('Grid and battery arrows flip automatically based on the sign convention you choose here.');
    panel.endSection();

    panel.createSection('Solar Breakdown', false);
    panel.addLabeledInputWithPicker('Solar -> Home', 'text', props.solar_to_home_entity || '', setTextProp('solar_to_home_entity'), widget);
    panel.addLabeledInputWithPicker('Solar -> Grid', 'text', props.solar_to_grid_entity || '', setTextProp('solar_to_grid_entity'), widget);
    if (props.show_battery !== false) {
        panel.addLabeledInputWithPicker('Solar -> Battery', 'text', props.solar_to_battery_entity || '', setTextProp('solar_to_battery_entity'), widget);
    }
    panel.addLabeledInputWithPicker('Autoconsumption %', 'text', props.autoconsumption_percent_entity || '', setTextProp('autoconsumption_percent_entity'), widget);
    panel.addHint('These helpers are optional. If Solar -> Grid or Autoconsumption % is not provided, the widget derives a safe fallback from solar production and net grid export.');
    panel.endSection();

    panel.createSection('Labels', false);
    panel.addLabeledInput('Solar Label', 'text', props.solar_label || 'Solar', setTextProp('solar_label'));
    panel.addLabeledInput('Home Label', 'text', props.home_label || 'Home', setTextProp('home_label'));
    panel.addLabeledInput('Grid Label', 'text', props.grid_label || 'Grid', setTextProp('grid_label'));
    if (props.show_battery !== false) {
        panel.addLabeledInput('Battery Label', 'text', props.battery_label || 'Battery', setTextProp('battery_label'));
    }
    if (props.show_gas) {
        panel.addLabeledInput('Gas Label', 'text', props.gas_label || 'Gas', setTextProp('gas_label'));
    }
    panel.endSection();

    panel.createSection('Appearance', true);
    panel.addColorSelector('Text Color', props.color || 'theme_auto', null, setTextProp('color'));
    panel.addColorSelector('Background', props.background_color || 'transparent', null, setTextProp('background_color'));
    panel.addColorSelector('Border Color', props.border_color || 'theme_auto', null, setTextProp('border_color'));
    panel.addColorSelector('Flow Color', props.flow_color || '#3b7c3f', null, setTextProp('flow_color'));
    panel.addColorSelector('Idle Flow Color', props.inactive_flow_color || '#8a8a8a', null, setTextProp('inactive_flow_color'));
    panel.addLabeledInput('Border Width', 'number', props.border_width || 1, setIntProp('border_width'));
    panel.addLabeledInput('Corner Radius', 'number', props.border_radius || 12, setIntProp('border_radius'));
    panel.endSection();

    panel.createSection('Typography', false);
    const fontFamily = props.font_family || 'Roboto';
    const fontWeight = clampFontWeight(fontFamily, parseInt(String(props.font_weight || 400), 10) || 400);
    panel.addSelect('Font Family', fontFamily, BUILT_IN_FONT_OPTIONS, (value) => {
        const nextWeight = clampFontWeight(value, parseInt(String(props.font_weight || 400), 10) || 400);
        AppState.updateWidget(widget.id, {
            props: {
                ...widget.props,
                font_family: value,
                font_weight: nextWeight
            }
        });
    });
    panel.addSelect('Font Weight', fontWeight, getWeightsForFont(fontFamily), (value) => updateProp('font_weight', parseInt(String(value), 10)));
    panel.addLabeledInput('Value Font Size', 'number', props.font_size || 13, setIntProp('font_size'));
    panel.addLabeledInput('Label Font Size', 'number', props.label_font_size || 11, setIntProp('label_font_size'));
    panel.endSection();
}

export default {
    id: 'energy_widget',
    name: 'Energy Flow',
    category: 'Templates',
    supportedModes: ['lvgl', 'direct'],
    defaults: DEFAULTS,
    renderProperties,
    render,
    exportLVGL,
    export: exportDoc,
    onExportNumericSensors,
    collectRequirements
};
