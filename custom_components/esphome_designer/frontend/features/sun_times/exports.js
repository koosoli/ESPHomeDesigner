import { getSensorPlatformLines } from '../../js/io/adapters/mqtt_helpers.js';
import {
    getSunEventRow,
    getVisibleSunRows,
    makeSafeSunSensorId,
    resolveSunEntitySource,
    resolveForegroundColor
} from './shared.js';

function buildSourceToken(entityId, attribute, mqttTopic) {
    return [entityId || mqttTopic, attribute].filter(Boolean).join('_');
}

function buildTemplateValue(source, placeholder) {
    if (!source.entityId || source.mqttTopic) {
        return placeholder;
    }

    const valueExpr = source.attribute
        ? `state_attr('${source.entityId}', '${source.attribute}')`
        : `states('${source.entityId}')`;

    return `{{ ${valueExpr} | default('', true) | string | regex_findall_index('(\\d{1,2}:\\d{2})', 0) | default('${placeholder}', true) }}`;
}

function buildRowMetrics(widget, props) {
    const rows = getVisibleSunRows(props);
    const iconSize = parseInt(props.icon_size || 18, 10);
    const fontSize = parseInt(props.font_size || 16, 10);
    const iconGap = parseInt(props.icon_gap || 8, 10);
    const rowGap = parseInt(props.row_gap || 6, 10);
    const padding = parseInt(props.padding || 6, 10);
    const rowHeight = Math.max(iconSize, fontSize);
    const contentHeight = rows.length * rowHeight + Math.max(0, rows.length - 1) * rowGap;
    const top = Math.round(widget.y + Math.max(padding, (widget.height - contentHeight) / 2));
    const left = widget.x + padding;
    return { rows, iconSize, fontSize, iconGap, rowGap, rowHeight, top, left, padding };
}

function buildDisplayValueExpression(sensorId, placeholder) {
    const safePlaceholder = JSON.stringify(placeholder || 'n.d.');
    return `!lambda |-\n` +
        `          std::string raw = id(${sensorId}).state;\n` +
        `          if (raw.empty() || raw == "unknown" || raw == "unavailable") return ${safePlaceholder};\n` +
        '          size_t t_pos = raw.find(\'T\');\n' +
        '          size_t colon = raw.find(\':\');\n' +
        '          if (t_pos != std::string::npos && colon != std::string::npos && colon >= 2) return raw.substr(colon - 2, 5).c_str();\n' +
        '          if (colon != std::string::npos && colon >= 1) {\n' +
        '            size_t start = colon >= 2 ? colon - 2 : 0;\n' +
        '            size_t len = (start + 5 <= raw.size()) ? 5 : raw.size() - start;\n' +
        '            return raw.substr(start, len).c_str();\n' +
        '          }\n' +
        '          return raw.c_str();';
}

function buildProtocolRows(widget, props, useFillColor = false, darkMode = false) {
    const { rows, iconSize, fontSize, iconGap, rowGap, top, left } = buildRowMetrics(widget, props);
    const color = props.color === 'theme_auto'
        ? (darkMode ? 'white' : 'black')
        : (props.color || 'black');
    const placeholder = props.placeholder || 'n.d.';

    return rows.flatMap((key, index) => {
        const row = getSunEventRow(key);
        const source = resolveSunEntitySource(props, key);
        const y = Math.round(top + index * (Math.max(iconSize, fontSize) + rowGap));
        const timeValue = buildTemplateValue(source, placeholder);
        const iconBase = {
            type: 'icon',
            value: row.iconName,
            x: Math.round(left),
            y,
            size: iconSize
        };
        const textBase = {
            type: 'text',
            value: timeValue,
            x: Math.round(left + iconSize + iconGap),
            y: Math.round(y + Math.max(0, Math.round((iconSize - fontSize) / 2))),
            size: fontSize,
            align: 'left'
        };

        if (useFillColor) {
            iconBase.fill = color;
            return [
                { ...iconBase, anchor: 'lt' },
                { ...textBase, color, anchor: 'lt' }
            ];
        }

        return [
            { ...iconBase, color, anchor: 'lt' },
            { ...textBase, color, anchor: 'lt' }
        ];
    });
}

export function collectRequirements(widget, { trackIcon, addFont }) {
    const props = widget.props || {};
    const iconSize = parseInt(props.icon_size || 18, 10);
    const fontSize = parseInt(props.font_size || 16, 10);
    addFont('Material Design Icons', 400, iconSize);
    addFont(props.font_family || 'Roboto', props.font_weight || 400, fontSize);
    ['F059B', 'F059C'].forEach((code) => trackIcon(code, iconSize));
}

export function exportDirect(widget, context) {
    const { lines, addFont, getColorConst, getConditionCheck } = context;
    const props = widget.props || {};
    const { rows, iconSize, fontSize, iconGap, rowGap, rowHeight, top, left } = buildRowMetrics(widget, props);
    const placeholder = props.placeholder || 'n.d.';
    const iconFont = addFont('Material Design Icons', 400, iconSize);
    const textFont = addFont(props.font_family || 'Roboto', props.font_weight || 400, fontSize);
    const color = resolveForegroundColor(props.color || 'theme_auto', getColorConst);

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

    rows.forEach((key, index) => {
        const row = getSunEventRow(key);
        const source = resolveSunEntitySource(props, key);
        const sensorId = source.entityId || source.mqttTopic
            ? makeSafeSunSensorId(buildSourceToken(source.entityId, source.attribute, source.mqttTopic))
            : '';
        const rowY = Math.round(top + index * (rowHeight + rowGap));
        const textY = rowY + Math.max(0, Math.round((iconSize - fontSize) / 2));

        lines.push('        {');
        lines.push(`          std::string display_value = ${JSON.stringify(placeholder)};`);
        if (sensorId) {
            lines.push(`          if (id(${sensorId}).has_state()) {`);
            lines.push('            std::string raw = id(' + sensorId + ').state;');
            lines.push('            if (!raw.empty() && raw != "unknown" && raw != "unavailable") {');
            lines.push('              size_t t_pos = raw.find(\'T\');');
            lines.push('              size_t colon = raw.find(\':\');');
            lines.push('              if (t_pos != std::string::npos && colon != std::string::npos && colon >= 2) display_value = raw.substr(colon - 2, 5);');
            lines.push('              else if (colon != std::string::npos && colon >= 1) {');
            lines.push('                size_t start = colon >= 2 ? colon - 2 : 0;');
            lines.push('                size_t len = (start + 5 <= raw.size()) ? 5 : raw.size() - start;');
            lines.push('                display_value = raw.substr(start, len);');
            lines.push('              } else {');
            lines.push('                display_value = raw;');
            lines.push('              }');
            lines.push('            }');
            lines.push('          }');
        }
        lines.push(`          it.printf(${left}, ${rowY}, id(${iconFont}), ${color}, TextAlign::TOP_LEFT, "%s", "\\U000${row.iconCode}");`);
        lines.push(`          it.printf(${left + iconSize + iconGap}, ${textY}, id(${textFont}), ${color}, TextAlign::TOP_LEFT, "%s", display_value.c_str());`);
        lines.push('        }');
    });

    if (cond) lines.push('        }');
}

export function exportLVGL(widget, { common, convertColor, getLVGLFont }) {
    const props = widget.props || {};
    const { rows, iconSize, fontSize, iconGap, rowGap, rowHeight, top, left, padding } = buildRowMetrics(widget, props);
    const color = convertColor(props.color || 'theme_auto');
    const fontWeight = props.font_weight || 400;
    const placeholder = props.placeholder || 'n.d.';
    const safeWidgetId = widget.id.replace(/-/g, '_');

    const widgets = [];
    rows.forEach((key, index) => {
        const row = getSunEventRow(key);
        const source = resolveSunEntitySource(props, key);
        const sensorId = source.entityId || source.mqttTopic
            ? makeSafeSunSensorId(buildSourceToken(source.entityId, source.attribute, source.mqttTopic))
            : '';
        const rowY = Math.round(top - widget.y + index * (rowHeight + rowGap));
        const textY = rowY + Math.max(0, Math.round((iconSize - fontSize) / 2));
        const iconLabelId = `${safeWidgetId}_${key}_icon`;
        const textLabelId = `${safeWidgetId}_${key}_text`;

        widgets.push({
            label: {
                id: iconLabelId,
                x: Math.round(left - widget.x),
                y: rowY,
                width: iconSize + 4,
                height: iconSize + 2,
                text: `"\\U000${row.iconCode}"`,
                text_font: getLVGLFont('Material Design Icons', iconSize, 400),
                text_color: color,
                text_align: 'left'
            }
        });

        widgets.push({
            label: {
                id: textLabelId,
                x: Math.round(left - widget.x + iconSize + iconGap),
                y: textY,
                width: Math.max(20, widget.width - (padding * 2) - iconSize - iconGap),
                height: fontSize + 4,
                text: sensorId ? buildDisplayValueExpression(sensorId, placeholder) : JSON.stringify(placeholder),
                text_font: getLVGLFont(props.font_family || 'Roboto', fontSize, fontWeight),
                text_color: color,
                text_align: 'left'
            }
        });
    });

    return {
        obj: {
            ...common,
            bg_opa: 'transp',
            border_width: 0,
            pad_all: 0,
            widgets
        }
    };
}

export function exportOpenDisplay(widget, { layout }) {
    return buildProtocolRows(widget, widget.props || {}, true, !!layout?.darkMode);
}

export function exportOEPL(widget, { _layout, _page }) {
    return buildProtocolRows(widget, widget.props || {}, false, false);
}

export function onExportTextSensors(context) {
    const { lines, widgets, isLvgl, pendingTriggers } = context;
    if (!widgets?.length) return;

    const astronomyWidgets = widgets.filter((widget) => widget.type === 'sun_times');
    astronomyWidgets.forEach((widget) => {
        const props = widget.props || {};
        getVisibleSunRows(props).forEach((key) => {
            const { entityId, attribute, mqttTopic } = resolveSunEntitySource(props, key);
            if (!entityId && !mqttTopic) return;

            const safeId = makeSafeSunSensorId(buildSourceToken(entityId, attribute, mqttTopic));
            if (context.seenSensorIds && context.seenSensorIds.has(safeId)) {
                return;
            }
            if (context.seenSensorIds) context.seenSensorIds.add(safeId);

            if (isLvgl && pendingTriggers && entityId) {
                if (!pendingTriggers.has(safeId)) pendingTriggers.set(safeId, new Set());
                const safeWidgetId = widget.id.replace(/-/g, '_');
                pendingTriggers.get(safeId).add(`- lvgl.widget.refresh: ${safeWidgetId}_${key}_text`);
            }

            if (lines.length === 0) {
                lines.push('');
                lines.push('# Sunrise / Sunset Text Sensors');
            }

            const fakeWidget = { props: { mqtt_topic: mqttTopic } };
            lines.push(...getSensorPlatformLines(fakeWidget, entityId, safeId, attribute));
        });
    });
}
