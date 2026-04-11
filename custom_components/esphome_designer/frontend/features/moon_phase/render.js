import { AppState } from '@core/state';
import {
    getMoonPhaseMeta,
    UNKNOWN_MOON_PHASE,
    toMdiCharacter
} from './shared.js';

export function renderMoonPhase(el, widget, { getColorStyle }) {
    const props = widget.props || {};
    const entityId = (widget.entity_id || props.entity_id || '').trim();
    const hasEntitySource = Boolean(entityId);

    let size = parseInt(props.size || 48, 10);
    if (props.fit_icon_to_frame) {
        const padding = 4;
        const maxDim = Math.max(8, Math.min((widget.width || 0) - padding * 2, (widget.height || 0) - padding * 2));
        size = Math.round(maxDim);
    }

    if (props.border_width) {
        const borderColor = getColorStyle(props.border_color || 'black');
        el.style.border = `${props.border_width}px solid ${borderColor}`;
        el.style.borderRadius = `${props.border_radius || 0}px`;
        el.style.boxSizing = 'border-box';
    } else {
        el.style.border = 'none';
    }

    if (props.bg_color) {
        el.style.backgroundColor = getColorStyle(props.bg_color);
    } else {
        el.style.backgroundColor = '';
    }

    let state = '';
    if (entityId && AppState?.entityStates?.[entityId]?.state !== undefined) {
        state = AppState.entityStates[entityId].state;
    }
    const phase = getMoonPhaseMeta(state);

    el.innerText = toMdiCharacter(phase.code);
    el.style.fontSize = `${size}px`;
    el.style.color = getColorStyle(props.color || 'theme_auto');
    el.style.fontFamily = 'MDI, system-ui, -apple-system, BlinkMacSystemFont, -sans-serif';
    el.style.lineHeight = '1';
    el.style.display = 'flex';
    el.style.alignItems = 'center';
    el.style.justifyContent = 'center';

    if (!hasEntitySource) {
        el.style.flexDirection = 'column';
        el.style.alignItems = 'flex-start';
        el.style.justifyContent = 'flex-start';

        const label = document.createElement('div');
        label.style.fontSize = '10px';
        label.style.marginTop = '2px';
        label.textContent = 'No Entity';
        el.appendChild(label);
    } else if (!state) {
        el.title = UNKNOWN_MOON_PHASE.state;
    } else {
        el.title = phase.state;
    }
}
