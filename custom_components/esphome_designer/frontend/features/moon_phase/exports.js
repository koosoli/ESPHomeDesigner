import { getSensorPlatformLines } from '../../js/io/adapters/mqtt_helpers.js';
import {
    MOON_PHASE_OPTIONS,
    UNKNOWN_MOON_PHASE,
    makeSafeMoonSensorId,
    resolveForegroundColor
} from './shared.js';

function buildMoonPhaseDirectMappingLines(lines, stateVar, iconVar) {
    MOON_PHASE_OPTIONS.forEach((phase, index) => {
        const keyword = index === 0 ? 'if' : 'else if';
        lines.push(`          ${keyword} (${stateVar} == "${phase.state}") ${iconVar} = "\\U000${phase.code}";`);
    });
}

function buildMoonPhaseLvglLambda(sensorId) {
    let lambda = '!lambda |-\n';
    lambda += `          std::string moon_state = id(${sensorId}).state;\n`;
    lambda += '          std::string normalized = "";\n';
    lambda += '          for (auto c : moon_state) {\n';
    lambda += '            if (c == \'-\' || c == \' \') normalized += \'_\';\n';
    lambda += '            else normalized += static_cast<char>(tolower(static_cast<unsigned char>(c)));\n';
    lambda += '          }\n';
    MOON_PHASE_OPTIONS.forEach((phase) => {
        lambda += `          if (normalized == "${phase.state}") return "\\U000${phase.code}";\n`;
    });
    lambda += `          return "\\U000${UNKNOWN_MOON_PHASE.code}";`;
    return lambda;
}

export function collectRequirements(widget, { trackIcon, addFont }) {
    const props = widget.props || {};
    const size = parseInt(props.size || 48, 10);
    addFont('Material Design Icons', 400, size);
    MOON_PHASE_OPTIONS.forEach((phase) => trackIcon(phase.code, size));
    trackIcon(UNKNOWN_MOON_PHASE.code, size);
}

export function exportDirect(widget, context) {
    const { lines, addFont, getColorConst, getConditionCheck } = context;
    const props = widget.props || {};
    const entityId = String(widget.entity_id ?? props.entity_id ?? 'sensor.moon').trim();
    const size = parseInt(props.size || 48, 10);
    const color = resolveForegroundColor(props.color || 'theme_auto', getColorConst);
    const fontRef = addFont('Material Design Icons', 400, size);

    const bgColorProp = props.bg_color || props.background_color || 'transparent';
    if (bgColorProp && bgColorProp !== 'transparent') {
        lines.push(`        it.filled_rectangle(${widget.x}, ${widget.y}, ${widget.width}, ${widget.height}, ${getColorConst(bgColorProp)});`);
    }

    const borderWidth = parseInt(props.border_width || 0, 10);
    if (borderWidth > 0) {
        const borderColor = getColorConst(props.border_color || 'theme_auto');
        for (let i = 0; i < borderWidth; i++) {
            lines.push(`        it.rectangle(${widget.x} + ${i}, ${widget.y} + ${i}, ${widget.width} - 2 * ${i}, ${widget.height} - 2 * ${i}, ${borderColor});`);
        }
    }

    const cond = getConditionCheck(widget);
    if (cond) lines.push(`        ${cond}`);

    const centerX = Math.round(widget.x + widget.width / 2);
    const centerY = Math.round(widget.y + widget.height / 2);

    if (entityId) {
        const sensorId = makeSafeMoonSensorId(entityId);
        lines.push('        {');
        lines.push(`          std::string raw_state = id(${sensorId}).state;`);
        lines.push('          std::string moon_state = "";');
        lines.push('          for (auto c : raw_state) {');
        lines.push('            if (c == \'-\' || c == \' \') moon_state += \'_\';');
        lines.push('            else moon_state += static_cast<char>(tolower(static_cast<unsigned char>(c)));');
        lines.push('          }');
        lines.push(`          const char* icon = "\\U000${UNKNOWN_MOON_PHASE.code}";`);
        buildMoonPhaseDirectMappingLines(lines, 'moon_state', 'icon');
        lines.push('          else if (moon_state != "" && moon_state != "unknown" && moon_state != "unavailable") ESP_LOGW("moon_phase", "Unhandled moon phase: %s", raw_state.c_str());');
        lines.push(`          it.printf(${centerX}, ${centerY}, id(${fontRef}), ${color}, TextAlign::CENTER, "%s", icon);`);
        lines.push('        }');
    } else {
        lines.push(`        it.printf(${centerX}, ${centerY}, id(${fontRef}), ${color}, TextAlign::CENTER, "\\U000${UNKNOWN_MOON_PHASE.code}");`);
    }

    if (cond) lines.push('        }');
}

export function exportLVGL(widget, { common, convertColor, getLVGLFont }) {
    const props = widget.props || {};
    const entityId = String(widget.entity_id ?? props.entity_id ?? 'sensor.moon').trim();
    const size = parseInt(props.size || 48, 10);
    const color = convertColor(props.color || 'theme_auto');
    const sensorId = entityId ? makeSafeMoonSensorId(entityId) : '';

    return {
        label: {
            ...common,
            text: sensorId ? buildMoonPhaseLvglLambda(sensorId) : `"\\U000${UNKNOWN_MOON_PHASE.code}"`,
            text_font: getLVGLFont('Material Design Icons', size, 400),
            text_color: color,
            text_align: 'center'
        }
    };
}

export function exportOpenDisplay(widget, { layout }) {
    const props = widget.props || {};
    const entityId = String(widget.entity_id ?? props.entity_id ?? 'sensor.moon').trim();
    const color = props.color === 'theme_auto' ? (layout?.darkMode ? 'white' : 'black') : (props.color || 'black');
    const fallback = UNKNOWN_MOON_PHASE.icon;
    const mapping = MOON_PHASE_OPTIONS
        .map((phase) => `'${phase.state}': '${phase.icon}'`)
        .join(', ');
    const value = entityId
        ? `{{ { ${mapping} }[states('${entityId}') | lower | replace('-', '_') | replace(' ', '_')] | default('${fallback}') }}`
        : fallback;

    return {
        type: 'icon',
        value,
        x: Math.round(widget.x + widget.width / 2),
        y: Math.round(widget.y + widget.height / 2),
        size: parseInt(props.size || 48, 10),
        fill: color,
        anchor: 'mm'
    };
}

export function exportOEPL(widget, { _layout, _page }) {
    const props = widget.props || {};
    const entityId = String(widget.entity_id ?? props.entity_id ?? 'sensor.moon').trim();
    const fallback = UNKNOWN_MOON_PHASE.icon;
    const mapping = MOON_PHASE_OPTIONS
        .map((phase) => `'${phase.state}': '${phase.icon}'`)
        .join(', ');
    const value = entityId
        ? `{{ { ${mapping} }[states('${entityId}') | lower | replace('-', '_') | replace(' ', '_')] | default('${fallback}') }}`
        : fallback;

    return {
        type: 'icon',
        value,
        x: Math.round(widget.x),
        y: Math.round(widget.y),
        size: parseInt(props.size || 48, 10),
        color: props.color || 'theme_auto',
        anchor: 'lt'
    };
}

export function onExportTextSensors(context) {
    const { lines, widgets, isLvgl, pendingTriggers } = context;
    if (!widgets?.length) return;

    const moonWidgets = widgets.filter((widget) => widget.type === 'moon_phase');
    moonWidgets.forEach((widget) => {
        let entityId = String(widget.entity_id ?? widget.props?.entity_id ?? 'sensor.moon').trim();
        const mqttTopic = (widget.props?.mqtt_topic || '').trim();
        if (!entityId && !mqttTopic) return;
        if (entityId && !entityId.includes('.') && !entityId.toLowerCase().startsWith('mqtt:')) {
            entityId = `sensor.${entityId}`;
        }

        const safeId = makeSafeMoonSensorId(entityId || mqttTopic);
        if (isLvgl && pendingTriggers && entityId) {
            if (!pendingTriggers.has(entityId)) pendingTriggers.set(entityId, new Set());
            pendingTriggers.get(entityId).add(`- lvgl.widget.refresh: ${widget.id}`);
        }

        if (context.seenSensorIds && context.seenSensorIds.has(safeId)) return;
        if (context.seenSensorIds) context.seenSensorIds.add(safeId);

        if (lines.length === 0) {
            lines.push('');
            lines.push('# Moon Phase Sensors');
        }

        const fakeWidget = { props: { mqtt_topic: mqttTopic } };
        lines.push(...getSensorPlatformLines(fakeWidget, entityId, safeId));
    });
}
