import { AppState } from '@core/state';
import {
    formatSunTimeValue,
    getSunSourceValue,
    getSunEventRow,
    getVisibleSunRows
} from './shared.js';

function createRow(getColorStyle, row, value, props) {
    const rowEl = document.createElement('div');
    rowEl.style.display = 'flex';
    rowEl.style.alignItems = 'center';
    rowEl.style.gap = `${props.icon_gap || 8}px`;
    rowEl.style.width = '100%';
    rowEl.style.minHeight = `${Math.max(props.icon_size || 18, props.font_size || 16)}px`;

    const iconEl = document.createElement('div');
    iconEl.innerText = String.fromCodePoint(0xf0000 + parseInt(row.iconCode.slice(1), 16));
    iconEl.style.fontFamily = 'MDI, system-ui, -apple-system, BlinkMacSystemFont, -sans-serif';
    iconEl.style.fontSize = `${props.icon_size || 18}px`;
    iconEl.style.lineHeight = '1';
    iconEl.style.color = getColorStyle(props.color || 'theme_auto');
    iconEl.style.flex = '0 0 auto';
    rowEl.appendChild(iconEl);

    const textEl = document.createElement('div');
    textEl.textContent = value;
    textEl.style.fontSize = `${props.font_size || 16}px`;
    textEl.style.fontFamily = `${props.font_family || 'Roboto'}, sans-serif`;
    textEl.style.fontWeight = `${props.font_weight || 400}`;
    textEl.style.color = getColorStyle(props.color || 'theme_auto');
    textEl.style.whiteSpace = 'nowrap';
    textEl.style.flex = '1 1 auto';
    rowEl.appendChild(textEl);

    return rowEl;
}

export function renderSunTimes(el, widget, { getColorStyle }) {
    const props = widget.props || {};
    const placeholder = props.placeholder || 'n.d.';
    const visibleRows = getVisibleSunRows(props);

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

    el.innerHTML = '';
    el.style.display = 'flex';
    el.style.flexDirection = 'column';
    el.style.justifyContent = 'center';
    el.style.gap = `${props.row_gap || 6}px`;
    el.style.padding = `${props.padding || 6}px`;
    el.style.boxSizing = 'border-box';

    const values = {
        sunrise: formatSunTimeValue(getSunSourceValue(AppState?.entityStates, props, 'sunrise'), placeholder),
        sunset: formatSunTimeValue(getSunSourceValue(AppState?.entityStates, props, 'sunset'), placeholder)
    };

    visibleRows.forEach((key) => {
        const row = getSunEventRow(key);
        if (!row) return;
        el.appendChild(createRow(getColorStyle, row, values[key], props));
    });
}
