import { AppState } from '../state';
import { getAvailableColors } from '../../utils/device.js';
import { autoPopulateTitleFromEntity as populateTitleFromEntity } from './legacy_renderer_helpers.js';
import { FONT_OPTIONS, renderFontControls } from './legacy_renderer_ui_helpers.js';
import { renderLegacyMediaProperties } from './legacy_renderer_widget_properties_media.js';
import { renderLegacySpecialProperties } from './legacy_renderer_widget_properties_special.js';
import { renderLegacyStandardProperties } from './legacy_renderer_widget_properties_standard.js';
import { renderLvglLegacyProperties } from './legacy_renderer_widget_properties_lvgl.js';

const STANDARD_FONT_HINT = 'Browse fonts.google.com';

function needsCustomFontHint(fontFamily) {
    const current = fontFamily || 'Roboto';
    return current === 'Custom...' || !FONT_OPTIONS.slice(0, -1).includes(current);
}

function renderTextContentSection(panel, widget, type, props, updateProp) {
    panel.createSection('Content', true);

    if (type === 'sensor_text') {
        panel.addLabeledInputWithPicker('Entity ID', 'text', widget.entity_id || '', (value) => {
            AppState.updateWidget(widget.id, { entity_id: value });
            populateTitleFromEntity(widget.id, value);
        }, widget);
        panel.addLabeledInput('Attribute (optional)', 'text', props.attribute || '', (value) => updateProp('attribute', value));
        panel.addLabeledInput('Prefix', 'text', props.prefix || '', (value) => updateProp('prefix', value));
        panel.addLabeledInput('Suffix', 'text', props.suffix || '', (value) => updateProp('suffix', value));
        panel.addLabeledInput('Decimals', 'number', props.decimals ?? 1, (value) => updateProp('decimals', parseInt(value, 10)));
    } else if (type === 'entity_text') {
        panel.addLabeledInputWithPicker('Entity ID', 'text', widget.entity_id || '', (value) => AppState.updateWidget(widget.id, { entity_id: value }), widget);
        panel.addLabeledInput('Attribute', 'text', props.attribute || '', (value) => updateProp('attribute', value));
    } else if (type === 'datetime') {
        panel.addLabeledInput('Format', 'text', props.format || '%H:%M', (value) => updateProp('format', value));
        panel.addHint('e.g. %H:%M or %A, %B %d');
    } else {
        panel.addLabeledInput('Text', 'text', props.text || 'Text', (value) => updateProp('text', value));
    }

    panel.endSection();
}

function renderTextTypographySection(panel, props, updateProp, type, colors) {
    panel.createSection('Typography', true);
    panel.addLabeledInput('Font Size', 'number', props.font_size || 20, (value) => updateProp('font_size', parseInt(value, 10)));
    renderFontControls(panel, props, updateProp, {
        alignDefault: type === 'datetime' ? 'CENTER' : 'TOP_LEFT'
    });
    if (needsCustomFontHint(props.font_family)) {
        panel.addHint(STANDARD_FONT_HINT);
    }
    panel.addColorSelector('Color', props.color || 'black', colors, (value) => updateProp('color', value));
    panel.endSection();

    panel.createSection('Appearance', false);
    panel.addColorSelector('Background', props.bg_color || 'transparent', colors, (value) => updateProp('bg_color', value));
    panel.addLabeledInput('Opacity (0.0 - 1.0)', 'number', props.opacity ?? 1.0, (value) => updateProp('opacity', parseFloat(value)));
    panel.addCheckbox('Word Wrap', props.word_wrap !== false, (value) => updateProp('word_wrap', value));
    if (type === 'sensor_text') {
        panel.addCheckbox('Show Unit', props.show_unit !== false, (value) => updateProp('show_unit', value));
    }
    panel.endSection();
}

/**
 * @param {any} panel
 * @param {any} widget
 * @param {string} type
 * @returns {void}
 */
export function renderLegacyProperties(panel, widget, type) {
    const colors = getAvailableColors();
    const props = widget.props || {};

    const updateProp = (key, value) => {
        const newProps = { ...widget.props, [key]: value };
        AppState.updateWidget(widget.id, { props: newProps });
    };

    if (type === 'text' || type === 'label' || type === 'datetime' || type === 'sensor_text' || type === 'entity_text') {
        renderTextContentSection(panel, widget, type, props, updateProp);
        renderTextTypographySection(panel, props, updateProp, type, colors);
    } else if (renderLegacyStandardProperties(panel, widget, type, props, colors, updateProp)) {
        return;
    } else if (renderLegacyMediaProperties(panel, widget, type, props, updateProp)) {
        return;
    } else if (renderLegacySpecialProperties(panel, widget, type, props, colors, updateProp)) {
        return;
    } else if (renderLvglLegacyProperties(panel, widget, type, props, updateProp)) {
        return;
    }
}
