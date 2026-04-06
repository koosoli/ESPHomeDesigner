import { AppState } from '@core/state';
import { getEnergyLayout, getPreviewSnapshot } from './shared.js';

function createBox(el, rect, title, value, options) {
    const box = document.createElement('div');
    box.style.position = 'absolute';
    box.style.left = `${rect.x}px`;
    box.style.top = `${rect.y}px`;
    box.style.width = `${rect.width}px`;
    box.style.height = `${rect.height}px`;
    box.style.boxSizing = 'border-box';
    box.style.display = 'flex';
    box.style.flexDirection = 'column';
    box.style.alignItems = 'center';
    box.style.justifyContent = 'center';
    box.style.gap = '2px';
    box.style.padding = '4px';
    box.style.border = options.borderWidth > 0 ? `${options.borderWidth}px solid ${options.borderColor}` : 'none';
    box.style.borderRadius = `${options.borderRadius}px`;
    box.style.background = options.background;
    box.style.color = options.color;
    box.style.opacity = options.inactive ? '0.72' : '1';
    box.style.textAlign = 'center';
    box.style.overflow = 'hidden';

    const titleEl = document.createElement('div');
    titleEl.style.fontFamily = `${options.fontFamily}, system-ui, sans-serif`;
    titleEl.style.fontSize = `${options.labelFontSize}px`;
    titleEl.style.fontWeight = '600';
    titleEl.style.lineHeight = '1.1';
    titleEl.style.whiteSpace = 'nowrap';
    titleEl.style.textOverflow = 'ellipsis';
    titleEl.style.overflow = 'hidden';
    titleEl.style.maxWidth = '100%';
    titleEl.textContent = title;
    box.appendChild(titleEl);

    const valueEl = document.createElement('div');
    valueEl.style.fontFamily = `${options.fontFamily}, system-ui, sans-serif`;
    valueEl.style.fontSize = `${options.fontSize}px`;
    valueEl.style.fontWeight = String(options.fontWeight);
    valueEl.style.lineHeight = '1.15';
    valueEl.style.whiteSpace = 'nowrap';
    valueEl.style.textOverflow = 'ellipsis';
    valueEl.style.overflow = 'hidden';
    valueEl.style.maxWidth = '100%';
    valueEl.textContent = value;
    box.appendChild(valueEl);

    if (options.subvalue) {
        const subvalueEl = document.createElement('div');
        subvalueEl.style.fontFamily = `${options.fontFamily}, system-ui, sans-serif`;
        subvalueEl.style.fontSize = `${Math.max(9, options.labelFontSize - 1)}px`;
        subvalueEl.style.lineHeight = '1.1';
        subvalueEl.style.opacity = '0.9';
        subvalueEl.style.whiteSpace = 'nowrap';
        subvalueEl.style.textOverflow = 'ellipsis';
        subvalueEl.style.overflow = 'hidden';
        subvalueEl.style.maxWidth = '100%';
        subvalueEl.textContent = options.subvalue;
        box.appendChild(subvalueEl);
    }

    el.appendChild(box);
}

function createFlow(svg, svgNS, flow, options) {
    const line = document.createElementNS(svgNS, 'line');
    line.setAttribute('x1', String(flow.x1));
    line.setAttribute('y1', String(flow.y1));
    line.setAttribute('x2', String(flow.x2));
    line.setAttribute('y2', String(flow.y2));
    line.setAttribute('stroke', options.color);
    line.setAttribute('stroke-width', String(options.active ? 3 : 1.5));
    line.setAttribute('stroke-linecap', 'round');
    line.setAttribute('opacity', options.active ? '1' : '0.5');
    svg.appendChild(line);

    const arrow = document.createElementNS(svgNS, 'text');
    arrow.setAttribute('x', String(Math.round((flow.x1 + flow.x2) / 2)));
    arrow.setAttribute('y', String(Math.round((flow.y1 + flow.y2) / 2) + (options.vertical ? 2 : -1)));
    arrow.setAttribute('fill', options.color);
    arrow.setAttribute('font-size', String(options.arrowSize));
    arrow.setAttribute('font-family', `${options.fontFamily}, system-ui, sans-serif`);
    arrow.setAttribute('font-weight', '700');
    arrow.setAttribute('text-anchor', 'middle');
    arrow.setAttribute('dominant-baseline', 'middle');
    arrow.setAttribute('opacity', options.active ? '1' : '0.5');
    arrow.textContent = options.arrow;
    svg.appendChild(arrow);

    if (options.label) {
        const label = document.createElementNS(svgNS, 'text');
        label.setAttribute('x', String(Math.round((flow.x1 + flow.x2) / 2)));
        label.setAttribute('y', String(Math.round((flow.y1 + flow.y2) / 2) + (options.vertical ? -10 : -10)));
        label.setAttribute('fill', options.color);
        label.setAttribute('font-size', String(Math.max(8, options.arrowSize - 4)));
        label.setAttribute('font-family', `${options.fontFamily}, system-ui, sans-serif`);
        label.setAttribute('text-anchor', 'middle');
        label.setAttribute('dominant-baseline', 'middle');
        label.setAttribute('opacity', options.active ? '0.95' : '0.45');
        label.textContent = options.label;
        svg.appendChild(label);
    }
}

export function render(el, widget, { getColorStyle }) {
    el.innerHTML = '';

    const snapshot = getPreviewSnapshot(widget, AppState.entityStates || {});
    const layout = getEnergyLayout(widget);
    const props = snapshot.props;
    const rootAutoColor = getColorStyle();
    const isDarkTheme = rootAutoColor === '#ffffff';

    const textColor = getColorStyle(props.color || 'theme_auto');
    const borderColor = getColorStyle(props.border_color || props.color || 'theme_auto');
    const flowColor = getColorStyle(props.flow_color || props.color || 'theme_auto');
    const inactiveFlowColor = getColorStyle(props.inactive_flow_color || 'gray');
    const panelBg = props.background_color && props.background_color !== 'transparent'
        ? getColorStyle(props.background_color)
        : 'transparent';
    const boxBg = panelBg === 'transparent'
        ? (isDarkTheme ? 'rgba(255,255,255,0.06)' : 'rgba(255,255,255,0.82)')
        : (isDarkTheme ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.12)');
    const outerBorderWidth = Math.max(0, parseInt(String(props.border_width ?? 1), 10) || 0);
    const boxBorderWidth = Math.max(1, outerBorderWidth || 0);

    el.style.position = 'relative';
    el.style.overflow = 'hidden';
    el.style.boxSizing = 'border-box';
    el.style.background = panelBg;
    el.style.border = outerBorderWidth > 0 ? `${outerBorderWidth}px solid ${borderColor}` : 'none';
    el.style.borderRadius = `${props.border_radius}px`;
    el.style.opacity = String(Math.max(0, Math.min(100, parseInt(String(props.opacity || 100), 10) || 100)) / 100);

    const svgNS = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', `0 0 ${layout.width} ${layout.height}`);
    svg.style.position = 'absolute';
    svg.style.inset = '0';
    svg.style.display = 'block';
    el.appendChild(svg);

    createFlow(svg, svgNS, layout.flows.solarToHome, {
        color: snapshot.solarActive ? flowColor : inactiveFlowColor,
        active: snapshot.solarActive,
        arrow: 'v',
        label: snapshot.solarFlowLabel,
        vertical: true,
        arrowSize: Math.max(12, props.font_size),
        fontFamily: props.font_family
    });

    createFlow(svg, svgNS, layout.flows.gridToHome, {
        color: snapshot.gridDirection === 'idle' ? inactiveFlowColor : flowColor,
        active: snapshot.gridDirection !== 'idle',
        arrow: snapshot.gridDirection === 'export' ? '<' : '>',
        label: snapshot.gridFlowLabel,
        vertical: false,
        arrowSize: Math.max(12, props.font_size),
        fontFamily: props.font_family
    });

    if (props.show_battery) {
        createFlow(svg, svgNS, layout.flows.homeToBattery, {
            color: snapshot.batteryDirection === 'idle' ? inactiveFlowColor : flowColor,
            active: snapshot.batteryDirection !== 'idle',
            arrow: snapshot.batteryDirection === 'discharging' ? '<' : '>',
            label: snapshot.batteryFlowLabel,
            vertical: false,
            arrowSize: Math.max(12, props.font_size),
            fontFamily: props.font_family
        });
    }

    if (props.show_gas) {
        createFlow(svg, svgNS, layout.flows.gasToHome, {
            color: snapshot.gasActive ? flowColor : inactiveFlowColor,
            active: snapshot.gasActive,
            arrow: '^',
            label: '',
            vertical: true,
            arrowSize: Math.max(12, props.font_size),
            fontFamily: props.font_family
        });
    }

    const sharedBoxOptions = {
        borderWidth: boxBorderWidth,
        borderRadius: Math.max(0, parseInt(String(props.border_radius || 0), 10) || 0),
        background: boxBg,
        color: textColor,
        fontFamily: props.font_family,
        fontWeight: props.font_weight,
        fontSize: Math.max(10, parseInt(String(props.font_size || 13), 10) || 13),
        labelFontSize: Math.max(9, parseInt(String(props.label_font_size || 11), 10) || 11),
        borderColor
    };

    createBox(el, layout.solar, props.solar_label, snapshot.solarText, {
        ...sharedBoxOptions,
        subvalue: snapshot.solarSubvalueText,
        inactive: !snapshot.solarActive && !props.solar_entity
    });
    createBox(el, layout.home, props.home_label, snapshot.homeText, {
        ...sharedBoxOptions,
        inactive: !props.home_entity
    });
    createBox(el, layout.grid, props.grid_label, snapshot.gridText, {
        ...sharedBoxOptions,
        subvalue: snapshot.gridDirection !== 'idle' ? snapshot.gridDirectionLabel : null,
        inactive: !props.grid_entity
    });

    if (props.show_battery) {
        createBox(el, layout.battery, props.battery_label, snapshot.batteryPowerText, {
            ...sharedBoxOptions,
            subvalue: snapshot.batterySocText,
            inactive: !props.battery_power_entity && !props.battery_soc_entity
        });
    }

    if (props.show_gas) {
        createBox(el, layout.gas, props.gas_label, snapshot.gasText, {
            ...sharedBoxOptions,
            inactive: !props.gas_entity
        });
    }

    if (props.title) {
        const heading = document.createElement('div');
        heading.style.position = 'absolute';
        heading.style.left = '50%';
        heading.style.top = '4px';
        heading.style.transform = 'translateX(-50%)';
        heading.style.fontFamily = `${props.font_family}, system-ui, sans-serif`;
        heading.style.fontSize = `${Math.max(10, sharedBoxOptions.labelFontSize)}px`;
        heading.style.fontWeight = '700';
        heading.style.color = textColor;
        heading.style.whiteSpace = 'nowrap';
        heading.style.pointerEvents = 'none';
        heading.textContent = props.title;
        el.appendChild(heading);
    }
}
