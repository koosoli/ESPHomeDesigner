import { AppState } from '@core/state';

export function renderSunTimesProperties(panel, widget) {
    const props = widget.props || {};

    const updateProp = (key, value) => {
        const newProps = { ...widget.props, [key]: value };
        AppState.updateWidget(widget.id, { props: newProps });
    };

    panel.createSection('Data Source', true);
    panel.addLabeledInputWithPicker('Sunrise Entity', 'text', props.sunrise_entity || 'sensor.sun_next_rising', (value) => updateProp('sunrise_entity', value), widget);
    panel.addLabeledInputWithPicker('Sunset Entity', 'text', props.sunset_entity || 'sensor.sun_next_setting', (value) => updateProp('sunset_entity', value), widget);
    panel.addLabeledInput('Fallback Text', 'text', props.placeholder || 'n.d.', (value) => updateProp('placeholder', value || 'n.d.'));
    panel.endSection();

    panel.createSection('Rows', true);
    panel.addCheckbox('Show Sunrise', props.show_sunrise !== false, (value) => updateProp('show_sunrise', value));
    panel.addCheckbox('Show Sunset', props.show_sunset !== false, (value) => updateProp('show_sunset', value));
    panel.addLabeledInput('Row Gap (px)', 'number', props.row_gap || 6, (value) => updateProp('row_gap', parseInt(value, 10) || 0));
    panel.addLabeledInput('Icon Gap (px)', 'number', props.icon_gap || 8, (value) => updateProp('icon_gap', parseInt(value, 10) || 0));
    panel.addLabeledInput('Padding (px)', 'number', props.padding || 6, (value) => updateProp('padding', parseInt(value, 10) || 0));
    panel.endSection();

    panel.createSection('Typography', false);
    panel.addLabeledInput('Icon Size (px)', 'number', props.icon_size || 18, (value) => updateProp('icon_size', parseInt(value, 10) || 18));
    panel.addLabeledInput('Time Size (px)', 'number', props.font_size || 16, (value) => updateProp('font_size', parseInt(value, 10) || 16));
    panel.addSelect('Font Family', props.font_family || 'Roboto', ['Roboto', 'Inter', 'Open Sans', 'Monospace'], (value) => updateProp('font_family', value));
    panel.addSelect('Font Weight', props.font_weight || 400, [100, 200, 300, 400, 500, 600, 700].map((value) => String(value)), (value) => updateProp('font_weight', parseInt(value, 10) || 400));
    panel.endSection();

    panel.createSection('Appearance', false);
    panel.addNumberWithSlider('Opacity (%)', props.opacity !== undefined ? props.opacity : 100, 0, 100, (value) => {
        updateProp('opacity', value);
        updateProp('opa', Math.round(value * 2.55));
    });
    panel.addColorSelector('Text and Icon Color', props.color || 'theme_auto', null, (value) => updateProp('color', value));
    panel.addColorSelector('Background', props.bg_color || props.background_color || 'transparent', null, (value) => updateProp('bg_color', value));
    panel.addLabeledInput('Border Width', 'number', props.border_width || 0, (value) => updateProp('border_width', parseInt(value, 10) || 0));
    panel.addColorSelector('Border Color', props.border_color || 'theme_auto', null, (value) => updateProp('border_color', value));
    panel.addLabeledInput('Corner Radius', 'number', props.border_radius || 0, (value) => updateProp('border_radius', parseInt(value, 10) || 0));
    panel.addDropShadowButton(panel.getContainer(), widget.id);
    panel.endSection();
}
