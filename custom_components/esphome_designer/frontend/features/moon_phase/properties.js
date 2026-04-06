import { AppState } from '@core/state';

export function renderMoonPhaseProperties(panel, widget) {
    const props = widget.props || {};

    const updateProp = (key, value) => {
        const newProps = { ...widget.props, [key]: value };
        AppState.updateWidget(widget.id, { props: newProps });
    };

    panel.createSection('Data Source', true);
    panel.addLabeledInputWithPicker('Moon Entity', 'text', widget.entity_id || props.entity_id || 'sensor.moon', (value) => {
        AppState.updateWidget(widget.id, {
            entity_id: value,
            props: {
                ...widget.props,
                entity_id: value
            }
        });
    }, widget);
    panel.endSection();

    panel.createSection('Icon Settings', true);
    panel.addNumberWithSlider('Opacity (%)', props.opacity !== undefined ? props.opacity : 100, 0, 100, (value) => {
        updateProp('opacity', value);
        updateProp('opa', Math.round(value * 2.55));
    });
    panel.addLabeledInput('Icon Size (px)', 'number', props.size || 48, (value) => {
        const parsed = parseInt(value || '48', 10);
        updateProp('size', Number.isNaN(parsed) ? 48 : parsed);
    });
    panel.addCheckbox('Fit icon to frame', !!props.fit_icon_to_frame, (value) => updateProp('fit_icon_to_frame', value));
    panel.addColorSelector('Icon Color', props.color || 'theme_auto', null, (value) => updateProp('color', value));
    panel.endSection();

    panel.createSection('Appearance', false);
    panel.addColorSelector('Background', props.bg_color || props.background_color || 'transparent', null, (value) => updateProp('bg_color', value));
    panel.addLabeledInput('Border Width', 'number', props.border_width || 0, (value) => updateProp('border_width', parseInt(value, 10) || 0));
    panel.addColorSelector('Border Color', props.border_color || 'theme_auto', null, (value) => updateProp('border_color', value));
    panel.addLabeledInput('Corner Radius', 'number', props.border_radius || 0, (value) => updateProp('border_radius', parseInt(value, 10) || 0));
    panel.addDropShadowButton(panel.getContainer(), widget.id);
    panel.endSection();
}
