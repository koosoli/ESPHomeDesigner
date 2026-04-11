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

    return `{% set raw = ${valueExpr} %}{% set parsed = as_datetime(raw, none) %}{{ (parsed | as_local).strftime('%H:%M') if raw not in [none, '', 'unknown', 'unavailable', 'none'] and parsed is not none else '${placeholder}' }}`;
}

function buildSunTimeConversionLines(baseIndent, includeReturn = false) {
    const lines = [
        `${baseIndent}if (!raw.empty() && raw != "unknown" && raw != "unavailable" && raw != "none") {`,
        `${baseIndent}  int year = 0;`,
        `${baseIndent}  int month = 0;`,
        `${baseIndent}  int day = 0;`,
        `${baseIndent}  int hour = 0;`,
        `${baseIndent}  int minute = 0;`,
        `${baseIndent}  int second = 0;`,
        `${baseIndent}  int offset_hour = 0;`,
        `${baseIndent}  int offset_minute = 0;`,
        `${baseIndent}  char tz_sign = '+';`,
        `${baseIndent}  auto format_hhmm = [](int hour_value, int minute_value) -> std::string {`,
        `${baseIndent}    char buf[6];`,
        `${baseIndent}    snprintf(buf, sizeof(buf), "%02d:%02d", hour_value, minute_value);`,
        `${baseIndent}    return std::string(buf);`,
        `${baseIndent}  };`,
        `${baseIndent}  auto days_from_civil = [](int y, unsigned m, unsigned d) -> int {`,
        `${baseIndent}    y -= m <= 2;`,
        `${baseIndent}    const int era = (y >= 0 ? y : y - 399) / 400;`,
        `${baseIndent}    const unsigned yoe = static_cast<unsigned>(y - era * 400);`,
        `${baseIndent}    const unsigned doy = (153 * (m + (m > 2 ? -3 : 9)) + 2) / 5 + d - 1;`,
        `${baseIndent}    const unsigned doe = yoe * 365 + yoe / 4 - yoe / 100 + doy;`,
        `${baseIndent}    return era * 146097 + static_cast<int>(doe) - 719468;`,
        `${baseIndent}  };`,
        `${baseIndent}  auto parse_epoch = [&](char sign, int tzHour, int tzMinute) -> long long {`,
        `${baseIndent}    const int offset_minutes = (tzHour * 60 + tzMinute) * (sign == '-' ? -1 : 1);`,
        `${baseIndent}    return static_cast<long long>(days_from_civil(year, static_cast<unsigned>(month), static_cast<unsigned>(day))) * 86400LL +`,
        `${baseIndent}        static_cast<long long>(hour) * 3600LL + static_cast<long long>(minute) * 60LL + second -`,
        `${baseIndent}        static_cast<long long>(offset_minutes) * 60LL;`,
        `${baseIndent}  };`,
        `${baseIndent}  auto try_local_datetime = [&](char sign, int tzHour, int tzMinute) -> bool {`,
        `${baseIndent}    time_t ts = static_cast<time_t>(parse_epoch(sign, tzHour, tzMinute));`,
        `${baseIndent}    struct tm* local_tm = localtime(&ts);`,
        `${baseIndent}    if (local_tm == nullptr) return false;`,
        `${baseIndent}    display_value = format_hhmm(local_tm->tm_hour, local_tm->tm_min);`,
        `${baseIndent}    return true;`,
        `${baseIndent}  };`,
        `${baseIndent}  if (sscanf(raw.c_str(), "%d-%d-%dT%d:%d:%d%c%d:%d", &year, &month, &day, &hour, &minute, &second, &tz_sign, &offset_hour, &offset_minute) == 9 && try_local_datetime(tz_sign, offset_hour, offset_minute)) {`,
        `${baseIndent}  } else if (sscanf(raw.c_str(), "%d-%d-%dT%d:%d:%dZ", &year, &month, &day, &hour, &minute, &second) == 6 && try_local_datetime('+', 0, 0)) {`,
        `${baseIndent}  } else if (sscanf(raw.c_str(), "%d-%d-%dT%d:%d", &year, &month, &day, &hour, &minute) == 5) {`,
        `${baseIndent}    display_value = format_hhmm(hour, minute);`,
        `${baseIndent}  } else {`,
        `${baseIndent}    size_t t_pos = raw.find('T');`,
        `${baseIndent}    size_t colon = raw.find(':');`,
        `${baseIndent}    if (t_pos != std::string::npos && colon != std::string::npos && colon >= 2) display_value = raw.substr(colon - 2, 5);`,
        `${baseIndent}    else if (colon != std::string::npos && colon >= 1) {`,
        `${baseIndent}      size_t start = colon >= 2 ? colon - 2 : 0;`,
        `${baseIndent}      size_t len = (start + 5 <= raw.size()) ? 5 : raw.size() - start;`,
        `${baseIndent}      display_value = raw.substr(start, len);`,
        `${baseIndent}    } else {`,
        `${baseIndent}      display_value = raw;`,
        `${baseIndent}    }`,
        `${baseIndent}  }`,
        `${baseIndent}}`
    ];

    if (includeReturn) {
        lines.push(`${baseIndent}return display_value.c_str();`);
    }

    return lines;
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
        `          static std::string display_value;\n` +
        `          display_value = ${safePlaceholder};\n` +
        `          std::string raw = id(${sensorId}).state;\n` +
        buildSunTimeConversionLines('          ', true).join('\n');
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
            buildSunTimeConversionLines('            ').forEach((line) => lines.push(line));
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
