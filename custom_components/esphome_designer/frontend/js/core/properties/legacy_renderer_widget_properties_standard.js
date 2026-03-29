import { AppState } from '../state';

/**
 * @param {any} panel
 * @param {any} widget
 * @param {string} type
 * @param {Record<string, any>} props
 * @param {string[]} colors
 * @param {(key: string, value: any) => void} updateProp
 * @returns {boolean}
 */
export function renderLegacyStandardProperties(panel, widget, type, props, colors, updateProp) {
    if (type === 'weather') {
        panel.createSection('Data Source', true);
        panel.addLabeledInputWithPicker('Weather Entity', 'text', props.weather_entity || 'weather.forecast', (value) => updateProp('weather_entity', value), widget);
        panel.endSection();

        panel.createSection('Appearance', true);
        panel.addLabeledInput('Icon Size', 'number', props.icon_size || 48, (value) => updateProp('icon_size', parseInt(value, 10)));
        panel.addColorSelector('Icon Color', props.icon_color || 'black', colors, (value) => updateProp('icon_color', value));
        panel.addCheckbox('Show Temperature', props.show_temp !== false, (value) => updateProp('show_temp', value));
        panel.addCheckbox('Show Condition', props.show_cond !== false, (value) => updateProp('show_cond', value));
        panel.endSection();
        return true;
    }

    if (type === 'chart' || type === 'state_history') {
        panel.createSection('Data Source', true);
        panel.addLabeledInputWithPicker('Entity ID', 'text', widget.entity_id || '', (value) => AppState.updateWidget(widget.id, { entity_id: value }), widget);
        panel.addLabeledInput('Time Period (hours)', 'number', props.hours || 24, (value) => updateProp('hours', parseInt(value, 10)));
        panel.endSection();

        panel.createSection('Appearance', true);
        panel.addColorSelector('Line Color', props.color || 'blue', colors, (value) => updateProp('color', value));
        panel.addColorSelector('Fill Color', props.fill_color || 'transparent', colors, (value) => updateProp('fill_color', value));
        panel.addLabeledInput('Line Width', 'number', props.line_width || 2, (value) => updateProp('line_width', parseInt(value, 10)));
        panel.addCheckbox('Show Axes', props.show_axes !== false, (value) => updateProp('show_axes', value));
        panel.endSection();
        return true;
    }

    if (type === 'gauge' || type === 'progress') {
        panel.createSection('Data Source', true);
        panel.addLabeledInputWithPicker('Entity ID', 'text', widget.entity_id || '', (value) => AppState.updateWidget(widget.id, { entity_id: value }), widget);
        panel.addLabeledInput('Min Value', 'number', props.min || 0, (value) => updateProp('min', parseFloat(value)));
        panel.addLabeledInput('Max Value', 'number', props.max || 100, (value) => updateProp('max', parseFloat(value)));
        panel.endSection();

        panel.createSection('Appearance', true);
        panel.addColorSelector('Bar Color', props.color || 'blue', colors, (value) => updateProp('color', value));
        panel.addColorSelector('Background Color', props.bg_color || '#eee', colors, (value) => updateProp('bg_color', value));
        if (type === 'gauge') {
            panel.addLabeledInput('Thickness', 'number', props.thickness || 10, (value) => updateProp('thickness', parseInt(value, 10)));
        }
        panel.endSection();
        return true;
    }

    if (type === 'switch' || type === 'button') {
        panel.createSection('Action', true);
        panel.addLabeledInputWithPicker('Entity ID', 'text', widget.entity_id || '', (value) => AppState.updateWidget(widget.id, { entity_id: value }), widget);
        panel.addLabeledInput('Label', 'text', props.text || (type === 'button' ? 'Button' : 'Switch'), (value) => updateProp('text', value));
        panel.endSection();

        panel.createSection('Appearance', true);
        panel.addColorSelector('Color', props.color || 'blue', colors, (value) => updateProp('color', value));
        panel.addColorSelector('Text Color', props.text_color || 'white', colors, (value) => updateProp('text_color', value));
        panel.endSection();
        return true;
    }

    if (type === 'group' || type === 'rectangle' || type === 'circle' || type === 'line') {
        panel.createSection('Appearance', true);
        panel.addColorSelector('Color', props.color || (type === 'group' ? 'transparent' : 'black'), colors, (value) => updateProp('color', value));
        if (type !== 'group') {
            panel.addLabeledInput('Border Width', 'number', props.border_width || 1, (value) => updateProp('border_width', parseInt(value, 10)));
            panel.addColorSelector('Border Color', props.border_color || 'black', colors, (value) => updateProp('border_color', value));
        }
        if (type === 'rectangle') {
            panel.addLabeledInput('Corner Radius', 'number', props.border_radius || 0, (value) => updateProp('border_radius', parseInt(value, 10)));
        }
        panel.endSection();
        return true;
    }

    return false;
}
