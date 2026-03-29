import { AppState } from '../state';
import { clampFontWeight, getWeightsForFont } from '../font_weights.js';

export const FONT_OPTIONS = Object.freeze([
    'Roboto',
    'Inter',
    'Open Sans',
    'Lato',
    'Montserrat',
    'Poppins',
    'Raleway',
    'Roboto Mono',
    'Ubuntu',
    'Nunito',
    'Playfair Display',
    'Merriweather',
    'Work Sans',
    'Source Sans Pro',
    'Quicksand',
    'Custom...'
]);

/**
 * @param {any} panel
 * @param {Record<string, any>} props
 * @param {(key: string, value: any) => void} updateProp
 * @param {{ defaultFont?: string, alignDefault?: string }} [options]
 * @returns {void}
 */
export function renderFontControls(panel, props, updateProp, options = {}) {
    const defaultFont = options.defaultFont || 'Roboto';
    const alignDefault = options.alignDefault || 'TOP_LEFT';
    const currentFont = props.font_family || defaultFont;
    const isCustom = !FONT_OPTIONS.slice(0, -1).includes(currentFont);

    panel.addSelect('Font', isCustom ? 'Custom...' : currentFont, FONT_OPTIONS, (v) => {
        if (v !== 'Custom...') {
            updateProp('font_family', v);
            updateProp('custom_font_family', '');
        } else {
            updateProp('font_family', 'Custom...');
        }
    });

    if (isCustom || props.font_family === 'Custom...') {
        panel.addLabeledInput('Custom Font Name', 'text', props.custom_font_family || (isCustom ? currentFont : ''), (v) => {
            updateProp('font_family', v || defaultFont);
            updateProp('custom_font_family', v);
        });
    }

    const availableWeights = getWeightsForFont(currentFont);
    let currentWeight = props.font_weight || 400;
    if (!availableWeights.includes(currentWeight)) {
        currentWeight = clampFontWeight(currentFont, currentWeight);
        setTimeout(() => updateProp('font_weight', currentWeight), 0);
    }

    panel.addSelect('Weight', currentWeight, availableWeights, (v) => updateProp('font_weight', parseInt(v, 10)));
    panel.addCheckbox('Italic', props.italic || false, (v) => updateProp('italic', v));

    const alignOptions = [
        'TOP_LEFT',
        'TOP_CENTER',
        'TOP_RIGHT',
        'CENTER_LEFT',
        'CENTER',
        'CENTER_RIGHT',
        'BOTTOM_LEFT',
        'BOTTOM_CENTER',
        'BOTTOM_RIGHT'
    ];
    panel.addSelect('Align', props.text_align || alignDefault, alignOptions, (v) => updateProp('text_align', v));
}

/**
 * @param {any} panel
 * @param {any} widget
 * @param {{ fullScreen?: { x: number, y: number, width: number, height: number }, restore?: { x: number, y: number, width: number, height: number }, fullLabel?: string, fillLabel?: string }} [options]
 * @returns {void}
 */
export function appendFullScreenToggle(panel, widget, options = {}) {
    const fullScreen = options.fullScreen || { x: 0, y: 0, width: 800, height: 480 };
    const restore = options.restore || { x: 50, y: 50, width: 200, height: 150 };
    const fullLabel = options.fullLabel || 'Full Screen (click to restore)';
    const fillLabel = options.fillLabel || 'Fill Screen';

    const fillWrap = document.createElement('div');
    fillWrap.className = 'field';
    fillWrap.style.marginTop = '12px';

    const isFullScreen = (
        widget.x === fullScreen.x &&
        widget.y === fullScreen.y &&
        widget.width === fullScreen.width &&
        widget.height === fullScreen.height
    );

    const fillBtn = document.createElement('button');
    fillBtn.className = 'btn ' + (isFullScreen ? 'btn-primary' : 'btn-secondary') + ' btn-full';
    fillBtn.textContent = isFullScreen ? fullLabel : fillLabel;
    fillBtn.type = 'button';
    fillBtn.addEventListener('click', () => {
        if (isFullScreen) {
            AppState.updateWidget(widget.id, { ...restore });
        } else {
            AppState.updateWidget(widget.id, { ...fullScreen });
        }
    });

    fillWrap.appendChild(fillBtn);
    panel.getContainer().appendChild(fillWrap);
}
