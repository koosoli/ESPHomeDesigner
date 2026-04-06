import { clampFontWeight } from '../../js/core/font_weights.js';
import {
    getEnergyLayout,
    getFlowUnit,
    getGasUnit,
    getRefreshTargetIds,
    makeSafeSensorId,
    normalizeEntityId,
    resolveEnergyWidgetProps
} from './shared.js';

function escapeCppString(value) {
    return String(value ?? '').replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function escapeLvglString(value) {
    return String(value ?? '').replace(/\\/g, '\\\\').replace(/"/g, '\\"');
}

function getPrecision(value) {
    return Math.max(0, parseInt(String(value || 0), 10) || 0);
}

function buildNumberFormat(decimals, unit) {
    const precision = getPrecision(decimals);
    return `%.${precision}f${unit ? ` ${unit}` : ''}`;
}

function buildPrefixedNumberFormat(prefix, decimals, unit) {
    return `${prefix} ${buildNumberFormat(decimals, unit)}`.trim();
}

function buildPercentFormat(decimals) {
    const precision = Math.min(1, getPrecision(decimals));
    return `%.${precision}f%%`;
}

function offsetRect(rect, widget) {
    return {
        x: widget.x + rect.x,
        y: widget.y + rect.y,
        width: rect.width,
        height: rect.height
    };
}

function offsetFlow(flow, widget) {
    return {
        x1: widget.x + flow.x1,
        y1: widget.y + flow.y1,
        x2: widget.x + flow.x2,
        y2: widget.y + flow.y2
    };
}

function pushRectBorder(lines, rect, borderWidth, color) {
    for (let index = 0; index < borderWidth; index += 1) {
        lines.push(`        it.rectangle(${rect.x} + ${index}, ${rect.y} + ${index}, ${rect.width} - ${index * 2}, ${rect.height} - ${index * 2}, ${color});`);
    }
}

function pushDocBox(lines, rect, title, valueExpr, options) {
    const titleY = rect.y + 4;
    const valueY = options.subvalueExpr ? rect.y + Math.max(16, Math.round(rect.height * 0.46)) : rect.y + Math.round(rect.height / 2);
    const subvalueY = rect.y + rect.height - 5;
    const centerX = rect.x + Math.round(rect.width / 2);

    pushRectBorder(lines, rect, options.borderWidth, options.borderColor);
    lines.push(`        it.printf(${centerX}, ${titleY}, id(${options.labelFontId}), ${options.color}, TextAlign::TOP_CENTER, "${escapeCppString(title)}");`);
    lines.push(`        it.printf(${centerX}, ${valueY}, id(${options.valueFontId}), ${options.color}, TextAlign::CENTER, "%s", ${valueExpr});`);
    if (options.subvalueExpr) {
        lines.push(`        it.printf(${centerX}, ${subvalueY}, id(${options.subvalueFontId}), ${options.color}, TextAlign::BOTTOM_CENTER, "%s", ${options.subvalueExpr});`);
    }
}

function pushDocFlow(lines, flow, arrowExpr, labelExpr, colorExpr, arrowFontId, labelFontId) {
    const midX = Math.round((flow.x1 + flow.x2) / 2);
    const midY = Math.round((flow.y1 + flow.y2) / 2);
    lines.push(`        it.line(${flow.x1}, ${flow.y1}, ${flow.x2}, ${flow.y2}, ${colorExpr});`);
    lines.push(`        it.printf(${midX}, ${midY}, id(${arrowFontId}), ${colorExpr}, TextAlign::CENTER, "%s", ${arrowExpr});`);
    if (labelExpr) {
        lines.push(`        it.printf(${midX}, ${midY - 10}, id(${labelFontId}), ${colorExpr}, TextAlign::CENTER, "%s", ${labelExpr});`);
    }
}

function pushDocMetric(lines, name, sensorId, format, fallback = '--') {
    lines.push(`          char ${name}_buf[32] = "${escapeCppString(fallback)}";`);
    lines.push(`          float ${name}_value = 0.0f;`);
    lines.push(`          bool ${name}_valid = false;`);
    if (!sensorId) return;
    lines.push(`          if (id(${sensorId}).has_state()) {`);
    lines.push(`            ${name}_value = id(${sensorId}).state;`);
    lines.push(`            ${name}_valid = !isnan(${name}_value);`);
    lines.push(`            if (${name}_valid) sprintf(${name}_buf, "${escapeCppString(format)}", ${name}_value);`);
    lines.push('          }');
}

function buildLvglValueLambda(sensorId, decimals, unit, fallback = '--') {
    if (!sensorId) return JSON.stringify(fallback);
    return `!lambda "if (id(${sensorId}).has_state() && !isnan(id(${sensorId}).state)) { return str_sprintf(\\"${escapeLvglString(buildNumberFormat(decimals, unit))}\\", id(${sensorId}).state); } return \\"${escapeLvglString(fallback)}\\";"`;
}

function buildLvglSocLambda(sensorId) {
    if (!sensorId) return JSON.stringify('--');
    return `!lambda "if (id(${sensorId}).has_state() && !isnan(id(${sensorId}).state)) { return str_sprintf(\\"%.0f%% SOC\\", id(${sensorId}).state); } return \\"--\\";"`;
}

function buildLvglGridArrowLambda(sensorId, positiveMode) {
    if (!sensorId) return JSON.stringify(' ');
    const positiveArrow = positiveMode === 'export' ? '<' : '>';
    const negativeArrow = positiveMode === 'export' ? '>' : '<';
    return `!lambda |-\n` +
        `  if (id(${sensorId}).has_state() && !isnan(id(${sensorId}).state)) {\n` +
        `    float value = id(${sensorId}).state;\n` +
        `    if (value > 0.05f) return "${positiveArrow}";\n` +
        `    if (value < -0.05f) return "${negativeArrow}";\n` +
        '  }\n' +
        '  return " ";';
}

function buildLvglGridDirectionLambda(sensorId, positiveMode) {
    if (!sensorId) return JSON.stringify('');
    const positiveLabel = positiveMode === 'export' ? 'Export' : 'Import';
    const negativeLabel = positiveMode === 'export' ? 'Import' : 'Export';
    return `!lambda |-\n` +
        `  if (id(${sensorId}).has_state() && !isnan(id(${sensorId}).state)) {\n` +
        `    float value = id(${sensorId}).state;\n` +
        `    if (value > 0.05f) return "${positiveLabel}";\n` +
        `    if (value < -0.05f) return "${negativeLabel}";\n` +
        '  }\n' +
        '  return "";';
}

function buildLvglBatteryArrowLambda(sensorId, positiveMode) {
    if (!sensorId) return JSON.stringify(' ');
    const positiveArrow = positiveMode === 'discharging' ? '<' : '>';
    const negativeArrow = positiveMode === 'discharging' ? '>' : '<';
    return `!lambda |-\n` +
        `  if (id(${sensorId}).has_state() && !isnan(id(${sensorId}).state)) {\n` +
        `    float value = id(${sensorId}).state;\n` +
        `    if (value > 0.05f) return "${positiveArrow}";\n` +
        `    if (value < -0.05f) return "${negativeArrow}";\n` +
        '  }\n' +
        '  return " ";';
}

function buildLvglPresenceArrowLambda(sensorId, arrow) {
    if (!sensorId) return JSON.stringify(' ');
    return `!lambda |-\n` +
        `  if (id(${sensorId}).has_state() && !isnan(id(${sensorId}).state) && id(${sensorId}).state > 0.05f) return "${arrow}";\n` +
        '  return " ";';
}

function buildLvglSolarSubvalueLambda(autoconsumptionId, solarId, solarToGridId, gridId, gridPositiveMode, decimals) {
    const exportCondition = gridPositiveMode === 'export' ? 'grid_value > 0.05f' : 'grid_value < -0.05f';
    const autoconsumptionFormat = escapeLvglString(buildPercentFormat(decimals));
    if (!autoconsumptionId && !solarId) return JSON.stringify('');
    return `!lambda |-\n` +
        `  float autoconsumption_value = NAN;\n` +
        (autoconsumptionId
            ? `  if (id(${autoconsumptionId}).has_state() && !isnan(id(${autoconsumptionId}).state)) autoconsumption_value = id(${autoconsumptionId}).state;\n`
            : '') +
        '  if (isnan(autoconsumption_value)) {\n' +
        (solarId
            ? `    if (id(${solarId}).has_state() && !isnan(id(${solarId}).state) && id(${solarId}).state > 0.05f) {\n` +
              `      float solar_value = id(${solarId}).state;\n` +
              '      float solar_to_grid_value = NAN;\n' +
              (solarToGridId
                  ? `      if (id(${solarToGridId}).has_state() && !isnan(id(${solarToGridId}).state)) solar_to_grid_value = id(${solarToGridId}).state;\n`
                  : '') +
              (gridId
                  ? `      if (isnan(solar_to_grid_value) && id(${gridId}).has_state() && !isnan(id(${gridId}).state)) {\n` +
                    `        float grid_value = id(${gridId}).state;\n` +
                    `        if (${exportCondition}) solar_to_grid_value = fabsf(grid_value);\n` +
                    '      }\n'
                  : '') +
              '      if (isnan(solar_to_grid_value)) solar_to_grid_value = 0.0f;\n' +
              '      if (solar_to_grid_value < 0.0f) solar_to_grid_value = 0.0f;\n' +
              '      float solar_self_consumed = solar_value - solar_to_grid_value;\n' +
              '      if (solar_self_consumed < 0.0f) solar_self_consumed = 0.0f;\n' +
              '      if (solar_self_consumed > solar_value) solar_self_consumed = solar_value;\n' +
              '      autoconsumption_value = (solar_self_consumed / solar_value) * 100.0f;\n' +
              '    }\n'
            : '') +
        '  }\n' +
        '  if (!isnan(autoconsumption_value)) {\n' +
        '    if (autoconsumption_value < 0.0f) autoconsumption_value = 0.0f;\n' +
        '    if (autoconsumption_value > 100.0f) autoconsumption_value = 100.0f;\n' +
        `    return str_sprintf("Self ${autoconsumptionFormat}", autoconsumption_value);\n` +
        '  }\n' +
        '  return "";';
}

function buildLvglSolarFlowLabelLambda(solarToHomeId, solarId, solarToGridId, solarToBatteryId, gridId, gridPositiveMode, decimals, unit) {
    const exportCondition = gridPositiveMode === 'export' ? 'grid_value > 0.05f' : 'grid_value < -0.05f';
    const format = escapeLvglString(buildPrefixedNumberFormat('Home', decimals, unit));
    if (!solarToHomeId && !solarId) return JSON.stringify('');
    return `!lambda |-\n` +
        '  float solar_to_home_value = NAN;\n' +
        (solarToHomeId
            ? `  if (id(${solarToHomeId}).has_state() && !isnan(id(${solarToHomeId}).state)) solar_to_home_value = id(${solarToHomeId}).state;\n`
            : '') +
        '  if (isnan(solar_to_home_value)) {\n' +
        (solarId
            ? `    if (id(${solarId}).has_state() && !isnan(id(${solarId}).state) && id(${solarId}).state > 0.05f) {\n` +
              `      float solar_value = id(${solarId}).state;\n` +
              '      float solar_to_grid_value = NAN;\n' +
              (solarToGridId
                  ? `      if (id(${solarToGridId}).has_state() && !isnan(id(${solarToGridId}).state)) solar_to_grid_value = id(${solarToGridId}).state;\n`
                  : '') +
              (gridId
                  ? `      if (isnan(solar_to_grid_value) && id(${gridId}).has_state() && !isnan(id(${gridId}).state)) {\n` +
                    `        float grid_value = id(${gridId}).state;\n` +
                    `        if (${exportCondition}) solar_to_grid_value = fabsf(grid_value);\n` +
                    '      }\n'
                  : '') +
              '      if (isnan(solar_to_grid_value)) solar_to_grid_value = 0.0f;\n' +
              '      if (solar_to_grid_value < 0.0f) solar_to_grid_value = 0.0f;\n' +
              '      float solar_self_consumed = solar_value - solar_to_grid_value;\n' +
              '      if (solar_self_consumed < 0.0f) solar_self_consumed = 0.0f;\n' +
              '      if (solar_self_consumed > solar_value) solar_self_consumed = solar_value;\n' +
              (solarToBatteryId
                  ? `      if (id(${solarToBatteryId}).has_state() && !isnan(id(${solarToBatteryId}).state)) {\n` +
                    `        if (id(${solarToBatteryId}).state > 0.0f) solar_self_consumed -= id(${solarToBatteryId}).state;\n` +
                    '      }\n'
                  : '') +
              '      if (solar_self_consumed < 0.0f) solar_self_consumed = 0.0f;\n' +
              '      solar_to_home_value = solar_self_consumed;\n' +
              '    }\n'
            : '') +
        '  }\n' +
        '  if (!isnan(solar_to_home_value) && solar_to_home_value > 0.05f) {\n' +
        '    if (solar_to_home_value < 0.0f) solar_to_home_value = 0.0f;\n' +
        `    return str_sprintf("${format}", solar_to_home_value);\n` +
        '  }\n' +
        '  return "";';
}

function buildLvglGridFlowLabelLambda(gridId, solarToGridId, positiveMode, decimals, unit) {
    const exportCondition = positiveMode === 'export' ? 'value > 0.05f' : 'value < -0.05f';
    const importCondition = positiveMode === 'export' ? 'value < -0.05f' : 'value > 0.05f';
    const exportFormat = escapeLvglString(buildPrefixedNumberFormat('Export', decimals, unit));
    const importFormat = escapeLvglString(buildPrefixedNumberFormat('Import', decimals, unit));
    if (!gridId && !solarToGridId) return JSON.stringify('');
    return `!lambda |-\n` +
        (gridId
            ? `  if (id(${gridId}).has_state() && !isnan(id(${gridId}).state)) {\n` +
              `    float value = id(${gridId}).state;\n` +
              `    if (${exportCondition}) {\n` +
              '      float export_value = NAN;\n' +
              (solarToGridId
                  ? `      if (id(${solarToGridId}).has_state() && !isnan(id(${solarToGridId}).state)) export_value = id(${solarToGridId}).state;\n`
                  : '') +
              '      if (isnan(export_value)) export_value = fabsf(value);\n' +
              '      if (export_value < 0.0f) export_value = 0.0f;\n' +
              `      return str_sprintf("${exportFormat}", export_value);\n` +
              '    }\n' +
              `    if (${importCondition}) return str_sprintf("${importFormat}", fabsf(value));\n` +
              '  }\n'
            : '') +
        (solarToGridId
            ? `  if (id(${solarToGridId}).has_state() && !isnan(id(${solarToGridId}).state) && id(${solarToGridId}).state > 0.05f) {\n` +
              `    return str_sprintf("${exportFormat}", id(${solarToGridId}).state);\n` +
              '  }\n'
            : '') +
        '  return "";';
}

function buildLvglBatteryFlowLabelLambda(batteryPowerId, solarToBatteryId, positiveMode, decimals, unit) {
    const positiveCharging = positiveMode !== 'discharging';
    const chargingCondition = positiveCharging ? 'value > 0.05f' : 'value < -0.05f';
    const dischargingCondition = positiveCharging ? 'value < -0.05f' : 'value > 0.05f';
    const chargingFormat = escapeLvglString(buildPrefixedNumberFormat('Charging', decimals, unit));
    const dischargingFormat = escapeLvglString(buildPrefixedNumberFormat('Discharging', decimals, unit));
    const solarFormat = escapeLvglString(buildPrefixedNumberFormat('Solar', decimals, unit));
    if (!batteryPowerId && !solarToBatteryId) return JSON.stringify('');
    return `!lambda |-\n` +
        (batteryPowerId
            ? `  if (id(${batteryPowerId}).has_state() && !isnan(id(${batteryPowerId}).state)) {\n` +
              `    float value = id(${batteryPowerId}).state;\n` +
              `    if (${chargingCondition}) {\n` +
              (solarToBatteryId
                  ? `      if (id(${solarToBatteryId}).has_state() && !isnan(id(${solarToBatteryId}).state) && id(${solarToBatteryId}).state > 0.05f) {\n` +
                    `        return str_sprintf("${solarFormat}", id(${solarToBatteryId}).state);\n` +
                    '      }\n'
                  : '') +
              `      return str_sprintf("${chargingFormat}", fabsf(value));\n` +
              '    }\n' +
              `    if (${dischargingCondition}) return str_sprintf("${dischargingFormat}", fabsf(value));\n` +
              '  }\n'
            : '') +
        (solarToBatteryId
            ? `  if (id(${solarToBatteryId}).has_state() && !isnan(id(${solarToBatteryId}).state) && id(${solarToBatteryId}).state > 0.05f) {\n` +
              `    return str_sprintf("${solarFormat}", id(${solarToBatteryId}).state);\n` +
              '  }\n'
            : '') +
        '  return "";';
}

function buildLvglBox(rect, title, valueText, options) {
    const widgets = [
        {
            label: {
                x: 0,
                y: 3,
                width: rect.width,
                height: Math.max(12, options.labelFontSize + 4),
                text: JSON.stringify(title),
                text_font: options.labelFont,
                text_color: options.color,
                text_align: 'center'
            }
        },
        {
            label: {
                x: 0,
                y: options.subvalueText ? Math.max(16, Math.round(rect.height * 0.34)) : Math.max(12, Math.round(rect.height * 0.28)),
                width: rect.width,
                height: Math.max(14, options.valueFontSize + 4),
                text: valueText,
                text_font: options.valueFont,
                text_color: options.color,
                text_align: 'center'
            }
        }
    ];

    if (options.subvalueText) {
        widgets.push({
            label: {
                x: 0,
                y: rect.height - Math.max(14, options.subvalueFontSize + 4),
                width: rect.width,
                height: Math.max(12, options.subvalueFontSize + 4),
                text: options.subvalueText,
                text_font: options.subvalueFont,
                text_color: options.color,
                text_align: 'center'
            }
        });
    }

    return {
        obj: {
            x: rect.x,
            y: rect.y,
            width: rect.width,
            height: rect.height,
            bg_opa: 'transp',
            border_width: options.borderWidth,
            border_color: options.borderColor,
            radius: options.radius,
            pad_all: 0,
            widgets
        }
    };
}

function buildLvglArrowLabel(id, x, y, text, font, color) {
    return {
        label: {
            id,
            x: x - 10,
            y: y - 10,
            width: 20,
            height: 20,
            text,
            text_font: font,
            text_color: color,
            text_align: 'center'
        }
    };
}

function buildLvglTextLabel(id, x, y, width, text, font, color) {
    return {
        label: {
            id,
            x: x - Math.round(width / 2),
            y,
            width,
            height: 12,
            text,
            text_font: font,
            text_color: color,
            text_align: 'center'
        }
    };
}

export function exportDoc(widget, context) {
    const { lines, addFont, getColorConst, getConditionCheck } = context;
    const props = resolveEnergyWidgetProps(widget.props);
    const layout = getEnergyLayout(widget);
    const flowUnit = getFlowUnit(props);
    const gasUnit = getGasUnit(props);
    const decimals = getPrecision(props.decimals);
    const fontFamily = props.font_family || 'Roboto';
    const fontWeight = clampFontWeight(fontFamily, parseInt(String(props.font_weight || 400), 10) || 400);
    const labelFontSize = Math.max(9, parseInt(String(props.label_font_size || 11), 10) || 11);
    const valueFontSize = Math.max(10, parseInt(String(props.font_size || 13), 10) || 13);
    const subvalueFontSize = Math.max(9, valueFontSize - 2);
    const arrowFontSize = Math.max(12, valueFontSize);
    const outerBorderWidth = Math.max(0, parseInt(String(props.border_width ?? 1), 10) || 0);
    const boxBorderWidth = Math.max(1, outerBorderWidth || 0);

    const labelFontId = addFont(fontFamily, fontWeight, labelFontSize);
    const valueFontId = addFont(fontFamily, fontWeight, valueFontSize);
    const subvalueFontId = addFont(fontFamily, fontWeight, subvalueFontSize);
    const arrowFontId = addFont(fontFamily, fontWeight, arrowFontSize);

    const color = getColorConst(props.color || 'theme_auto');
    const borderColor = getColorConst(props.border_color || props.color || 'theme_auto');
    const flowColor = getColorConst(props.flow_color || props.color || 'theme_auto');
    const inactiveFlowColor = getColorConst(props.inactive_flow_color || 'gray');

    const bgColorProp = props.background_color || 'transparent';
    const radius = Math.max(0, parseInt(String(props.border_radius || 0), 10) || 0);
    const solarRect = offsetRect(layout.solar, widget);
    const homeRect = offsetRect(layout.home, widget);
    const gridRect = offsetRect(layout.grid, widget);
    const batteryRect = offsetRect(layout.battery, widget);
    const gasRect = offsetRect(layout.gas, widget);
    const solarFlow = offsetFlow(layout.flows.solarToHome, widget);
    const gridFlow = offsetFlow(layout.flows.gridToHome, widget);
    const batteryFlow = offsetFlow(layout.flows.homeToBattery, widget);
    const gasFlow = offsetFlow(layout.flows.gasToHome, widget);

    const solarId = makeSafeSensorId(props.solar_entity);
    const solarToHomeId = makeSafeSensorId(props.solar_to_home_entity);
    const solarToGridId = makeSafeSensorId(props.solar_to_grid_entity);
    const solarToBatteryId = makeSafeSensorId(props.solar_to_battery_entity);
    const autoconsumptionId = makeSafeSensorId(props.autoconsumption_percent_entity);
    const homeId = makeSafeSensorId(props.home_entity);
    const gridId = makeSafeSensorId(props.grid_entity);
    const batteryPowerId = makeSafeSensorId(props.battery_power_entity);
    const batterySocId = makeSafeSensorId(props.battery_soc_entity);
    const gasId = makeSafeSensorId(props.gas_entity);

    const cond = getConditionCheck(widget);
    if (cond) lines.push(`        ${cond}`);
    lines.push('        {');

    if (bgColorProp !== 'transparent') {
        if (radius > 0) {
            lines.push(`          it.filled_rounded_rectangle(${widget.x}, ${widget.y}, ${widget.width}, ${widget.height}, ${radius}, ${getColorConst(bgColorProp)});`);
        } else {
            lines.push(`          it.filled_rectangle(${widget.x}, ${widget.y}, ${widget.width}, ${widget.height}, ${getColorConst(bgColorProp)});`);
        }
    }

    if (outerBorderWidth > 0) {
        pushRectBorder(lines, { x: widget.x, y: widget.y, width: widget.width, height: widget.height }, outerBorderWidth, borderColor);
    }

    pushDocMetric(lines, 'solar', solarId, buildNumberFormat(decimals, flowUnit));
    pushDocMetric(lines, 'solar_to_home', solarToHomeId, buildNumberFormat(decimals, flowUnit), '');
    pushDocMetric(lines, 'solar_to_grid', solarToGridId, buildNumberFormat(decimals, flowUnit), '');
    pushDocMetric(lines, 'solar_to_battery', solarToBatteryId, buildNumberFormat(decimals, flowUnit), '');
    pushDocMetric(lines, 'autoconsumption_pct', autoconsumptionId, buildPercentFormat(decimals), '');
    pushDocMetric(lines, 'home', homeId, buildNumberFormat(decimals, flowUnit));
    pushDocMetric(lines, 'grid', gridId, buildNumberFormat(decimals, flowUnit));
    pushDocMetric(lines, 'battery_power', batteryPowerId, buildNumberFormat(decimals, flowUnit));
    pushDocMetric(lines, 'battery_soc', batterySocId, '%.0f%% SOC');
    pushDocMetric(lines, 'gas', gasId, buildNumberFormat(decimals, gasUnit));

    lines.push('          bool solar_active = solar_valid && (solar_value > 0.05f || solar_value < -0.05f);');
    lines.push('          bool gas_active = gas_valid && (gas_value > 0.05f || gas_value < -0.05f);');
    lines.push('          const char* solar_arrow = solar_active ? "v" : " ";');
    lines.push('          const char* gas_arrow = gas_active ? "^" : " ";');
    lines.push(`          auto flow_color = ${flowColor};`);
    lines.push(`          auto inactive_flow_color = ${inactiveFlowColor};`);

    lines.push('          const char* grid_arrow = " ";');
    lines.push('          const char* grid_label = "";');
    lines.push('          bool grid_active = false;');
    lines.push('          if (grid_valid && (grid_value > 0.05f || grid_value < -0.05f)) {');
    lines.push('            grid_active = true;');
    if (props.grid_positive_mode === 'export') {
        lines.push('            if (grid_value > 0.0f) { grid_arrow = "<"; grid_label = "Export"; }');
        lines.push('            else { grid_arrow = ">"; grid_label = "Import"; }');
    } else {
        lines.push('            if (grid_value > 0.0f) { grid_arrow = ">"; grid_label = "Import"; }');
        lines.push('            else { grid_arrow = "<"; grid_label = "Export"; }');
    }
    lines.push('          }');

    lines.push('          const char* battery_arrow = " ";');
    lines.push('          const char* battery_label = "";');
    lines.push('          bool battery_active = false;');
    lines.push('          if (battery_power_valid && (battery_power_value > 0.05f || battery_power_value < -0.05f)) {');
    lines.push('            battery_active = true;');
    if (props.battery_positive_mode === 'discharging') {
        lines.push('            if (battery_power_value > 0.0f) { battery_arrow = "<"; battery_label = "Discharging"; }');
        lines.push('            else { battery_arrow = ">"; battery_label = "Charging"; }');
    } else {
        lines.push('            if (battery_power_value > 0.0f) { battery_arrow = ">"; battery_label = "Charging"; }');
        lines.push('            else { battery_arrow = "<"; battery_label = "Discharging"; }');
    }
    lines.push('          }');

    lines.push('          if (solar_to_grid_valid && solar_to_grid_value < 0.0f) solar_to_grid_value = 0.0f;');
    lines.push('          if (solar_to_home_valid && solar_to_home_value < 0.0f) solar_to_home_value = 0.0f;');
    lines.push('          if (solar_to_battery_valid && solar_to_battery_value < 0.0f) solar_to_battery_value = 0.0f;');
    lines.push('          if (autoconsumption_pct_valid) {');
    lines.push('            if (autoconsumption_pct_value < 0.0f) autoconsumption_pct_value = 0.0f;');
    lines.push('            if (autoconsumption_pct_value > 100.0f) autoconsumption_pct_value = 100.0f;');
    lines.push(`            sprintf(autoconsumption_pct_buf, "${escapeCppString(buildPercentFormat(decimals))}", autoconsumption_pct_value);`);
    lines.push('          }');
    lines.push('          if (!solar_to_grid_valid && grid_active && strcmp(grid_label, "Export") == 0) {');
    lines.push('            solar_to_grid_value = fabsf(grid_value);');
    lines.push('            solar_to_grid_valid = true;');
    lines.push(`            sprintf(solar_to_grid_buf, "${escapeCppString(buildNumberFormat(decimals, flowUnit))}", solar_to_grid_value);`);
    lines.push('          }');
    lines.push('          if (!autoconsumption_pct_valid && solar_valid && solar_value > 0.05f) {');
    lines.push('            float solar_self_consumed = solar_value - (solar_to_grid_valid ? solar_to_grid_value : 0.0f);');
    lines.push('            if (solar_self_consumed < 0.0f) solar_self_consumed = 0.0f;');
    lines.push('            if (solar_self_consumed > solar_value) solar_self_consumed = solar_value;');
    lines.push('            autoconsumption_pct_value = (solar_self_consumed / solar_value) * 100.0f;');
    lines.push('            if (autoconsumption_pct_value < 0.0f) autoconsumption_pct_value = 0.0f;');
    lines.push('            if (autoconsumption_pct_value > 100.0f) autoconsumption_pct_value = 100.0f;');
    lines.push('            autoconsumption_pct_valid = true;');
    lines.push(`            sprintf(autoconsumption_pct_buf, "${escapeCppString(buildPercentFormat(decimals))}", autoconsumption_pct_value);`);
    lines.push('          }');
    lines.push('          if (!solar_to_home_valid && solar_valid && solar_value > 0.05f && solar_to_battery_valid) {');
    lines.push('            float solar_self_consumed = solar_value - (solar_to_grid_valid ? solar_to_grid_value : 0.0f);');
    lines.push('            if (solar_self_consumed < 0.0f) solar_self_consumed = 0.0f;');
    lines.push('            if (solar_self_consumed > solar_value) solar_self_consumed = solar_value;');
    lines.push('            solar_to_home_value = solar_self_consumed - solar_to_battery_value;');
    lines.push('            if (solar_to_home_value < 0.0f) solar_to_home_value = 0.0f;');
    lines.push('            solar_to_home_valid = true;');
    lines.push(`            sprintf(solar_to_home_buf, "${escapeCppString(buildNumberFormat(decimals, flowUnit))}", solar_to_home_value);`);
    lines.push('          }');
    lines.push('          char solar_subvalue_buf[32] = "";');
    lines.push('          if (autoconsumption_pct_valid) {');
    lines.push(`            snprintf(solar_subvalue_buf, sizeof(solar_subvalue_buf), "${escapeCppString(`Self ${buildPercentFormat(decimals)}`)}", autoconsumption_pct_value);`);
    lines.push('          }');
    lines.push('          char solar_flow_label_buf[32] = "";');
    lines.push('          if (solar_to_home_valid && solar_to_home_value > 0.05f) {');
    lines.push(`            snprintf(solar_flow_label_buf, sizeof(solar_flow_label_buf), "${escapeCppString(buildPrefixedNumberFormat('Home', decimals, flowUnit))}", solar_to_home_value);`);
    lines.push('          }');
    lines.push('          char grid_flow_label_buf[32] = "";');
    lines.push('          if (grid_active) {');
    lines.push('            float grid_flow_value = strcmp(grid_label, "Export") == 0 && solar_to_grid_valid ? solar_to_grid_value : fabsf(grid_value);');
    lines.push('            if (grid_flow_value < 0.0f) grid_flow_value = 0.0f;');
    lines.push('            if (strcmp(grid_label, "Export") == 0) {');
    lines.push(`              snprintf(grid_flow_label_buf, sizeof(grid_flow_label_buf), "${escapeCppString(buildPrefixedNumberFormat('Export', decimals, flowUnit))}", grid_flow_value);`);
    lines.push('            } else {');
    lines.push(`              snprintf(grid_flow_label_buf, sizeof(grid_flow_label_buf), "${escapeCppString(buildPrefixedNumberFormat('Import', decimals, flowUnit))}", grid_flow_value);`);
    lines.push('            }');
    lines.push('          }');
    lines.push('          char battery_flow_label_buf[32] = "";');
    lines.push('          if (battery_active) {');
    lines.push('            if (strcmp(battery_label, "Charging") == 0 && solar_to_battery_valid && solar_to_battery_value > 0.05f) {');
    lines.push(`              snprintf(battery_flow_label_buf, sizeof(battery_flow_label_buf), "${escapeCppString(buildPrefixedNumberFormat('Solar', decimals, flowUnit))}", solar_to_battery_value);`);
    lines.push('            } else {');
    lines.push('              float battery_flow_value = fabsf(battery_power_value);');
    lines.push('              if (strcmp(battery_label, "Charging") == 0) {');
    lines.push(`                snprintf(battery_flow_label_buf, sizeof(battery_flow_label_buf), "${escapeCppString(buildPrefixedNumberFormat('Charging', decimals, flowUnit))}", battery_flow_value);`);
    lines.push('              } else {');
    lines.push(`                snprintf(battery_flow_label_buf, sizeof(battery_flow_label_buf), "${escapeCppString(buildPrefixedNumberFormat('Discharging', decimals, flowUnit))}", battery_flow_value);`);
    lines.push('              }');
    lines.push('            }');
    lines.push('          }');

    pushDocFlow(lines, solarFlow, 'solar_arrow', 'solar_flow_label_buf', 'solar_active ? flow_color : inactive_flow_color', arrowFontId, labelFontId);
    pushDocFlow(lines, gridFlow, 'grid_arrow', 'grid_flow_label_buf', 'grid_active ? flow_color : inactive_flow_color', arrowFontId, labelFontId);
    if (props.show_battery) {
        pushDocFlow(lines, batteryFlow, 'battery_arrow', 'battery_flow_label_buf', 'battery_active ? flow_color : inactive_flow_color', arrowFontId, labelFontId);
    }
    if (props.show_gas) {
        pushDocFlow(lines, gasFlow, 'gas_arrow', null, 'gas_active ? flow_color : inactive_flow_color', arrowFontId, labelFontId);
    }

    pushDocBox(lines, solarRect, props.solar_label, 'solar_buf', {
        borderWidth: boxBorderWidth,
        borderColor,
        color,
        labelFontId,
        valueFontId,
        subvalueFontId,
        subvalueExpr: 'solar_subvalue_buf'
    });
    pushDocBox(lines, homeRect, props.home_label, 'home_buf', {
        borderWidth: boxBorderWidth,
        borderColor,
        color,
        labelFontId,
        valueFontId,
        subvalueFontId
    });
    pushDocBox(lines, gridRect, props.grid_label, 'grid_buf', {
        borderWidth: boxBorderWidth,
        borderColor,
        color,
        labelFontId,
        valueFontId,
        subvalueFontId,
        subvalueExpr: 'grid_label'
    });

    if (props.show_battery) {
        pushDocBox(lines, batteryRect, props.battery_label, 'battery_power_buf', {
            borderWidth: boxBorderWidth,
            borderColor,
            color,
            labelFontId,
            valueFontId,
            subvalueFontId,
            subvalueExpr: 'battery_soc_buf'
        });
    }

    if (props.show_gas) {
        pushDocBox(lines, gasRect, props.gas_label, 'gas_buf', {
            borderWidth: boxBorderWidth,
            borderColor,
            color,
            labelFontId,
            valueFontId,
            subvalueFontId
        });
    }

    if (props.title) {
        lines.push(`        it.printf(${widget.x + Math.round(widget.width / 2)}, ${widget.y + 4}, id(${labelFontId}), ${color}, TextAlign::TOP_CENTER, "${escapeCppString(props.title)}");`);
    }

    lines.push('        }');
    if (cond) lines.push('        }');
}

export function exportLVGL(widget, { common, convertColor, getLVGLFont }) {
    const props = resolveEnergyWidgetProps(widget.props);
    const layout = getEnergyLayout(widget);
    const flowUnit = getFlowUnit(props);
    const gasUnit = getGasUnit(props);
    const decimals = getPrecision(props.decimals);
    const fontFamily = props.font_family || 'Roboto';
    const fontWeight = clampFontWeight(fontFamily, parseInt(String(props.font_weight || 400), 10) || 400);
    const labelFontSize = Math.max(9, parseInt(String(props.label_font_size || 11), 10) || 11);
    const valueFontSize = Math.max(10, parseInt(String(props.font_size || 13), 10) || 13);
    const subvalueFontSize = Math.max(9, valueFontSize - 2);
    const arrowFontSize = Math.max(12, valueFontSize);
    const outerBorderWidth = Math.max(0, parseInt(String(props.border_width ?? 1), 10) || 0);
    const boxBorderWidth = Math.max(1, outerBorderWidth || 0);

    const color = convertColor(props.color || 'theme_auto');
    const borderColor = convertColor(props.border_color || props.color || 'theme_auto');
    const flowColor = convertColor(props.flow_color || props.color || 'theme_auto');
    const inactiveFlowColor = convertColor(props.inactive_flow_color || 'gray');
    const labelFont = getLVGLFont(fontFamily, labelFontSize, fontWeight);
    const valueFont = getLVGLFont(fontFamily, valueFontSize, fontWeight);
    const subvalueFont = getLVGLFont(fontFamily, subvalueFontSize, fontWeight);
    const arrowFont = getLVGLFont(fontFamily, arrowFontSize, fontWeight);
    const rootBg = props.background_color && props.background_color !== 'transparent'
        ? { bg_color: convertColor(props.background_color), bg_opa: 'cover' }
        : { bg_opa: 'transp' };

    const solarId = makeSafeSensorId(props.solar_entity);
    const solarToHomeId = makeSafeSensorId(props.solar_to_home_entity);
    const solarToGridId = makeSafeSensorId(props.solar_to_grid_entity);
    const solarToBatteryId = makeSafeSensorId(props.solar_to_battery_entity);
    const autoconsumptionId = makeSafeSensorId(props.autoconsumption_percent_entity);
    const homeId = makeSafeSensorId(props.home_entity);
    const gridId = makeSafeSensorId(props.grid_entity);
    const batteryPowerId = makeSafeSensorId(props.battery_power_entity);
    const batterySocId = makeSafeSensorId(props.battery_soc_entity);
    const gasId = makeSafeSensorId(props.gas_entity);

    const widgets = /** @type {Array<any>} */ ([
        {
            line: {
                id: `${widget.id}_solar_flow`,
                line_color: inactiveFlowColor,
                line_width: 1,
                points: [
                    { x: layout.flows.solarToHome.x1, y: layout.flows.solarToHome.y1 },
                    { x: layout.flows.solarToHome.x2, y: layout.flows.solarToHome.y2 }
                ]
            }
        },
        {
            line: {
                id: `${widget.id}_grid_flow`,
                line_color: inactiveFlowColor,
                line_width: 1,
                points: [
                    { x: layout.flows.gridToHome.x1, y: layout.flows.gridToHome.y1 },
                    { x: layout.flows.gridToHome.x2, y: layout.flows.gridToHome.y2 }
                ]
            }
        }
    ]);

    if (props.show_battery) {
        widgets.push({
            line: {
                id: `${widget.id}_battery_flow`,
                line_color: inactiveFlowColor,
                line_width: 1,
                points: [
                    { x: layout.flows.homeToBattery.x1, y: layout.flows.homeToBattery.y1 },
                    { x: layout.flows.homeToBattery.x2, y: layout.flows.homeToBattery.y2 }
                ]
            }
        });
    }

    if (props.show_gas) {
        widgets.push({
            line: {
                id: `${widget.id}_gas_flow`,
                line_color: inactiveFlowColor,
                line_width: 1,
                points: [
                    { x: layout.flows.gasToHome.x1, y: layout.flows.gasToHome.y1 },
                    { x: layout.flows.gasToHome.x2, y: layout.flows.gasToHome.y2 }
                ]
            }
        });
    }

    widgets.push(
        buildLvglArrowLabel(`${widget.id}_solar_arrow`, Math.round((layout.flows.solarToHome.x1 + layout.flows.solarToHome.x2) / 2), Math.round((layout.flows.solarToHome.y1 + layout.flows.solarToHome.y2) / 2), buildLvglPresenceArrowLambda(solarId, 'v'), arrowFont, flowColor),
        buildLvglTextLabel(`${widget.id}_solar_label`, Math.round((layout.flows.solarToHome.x1 + layout.flows.solarToHome.x2) / 2), Math.round((layout.flows.solarToHome.y1 + layout.flows.solarToHome.y2) / 2) - 12, 84, buildLvglSolarFlowLabelLambda(solarToHomeId, solarId, solarToGridId, solarToBatteryId, gridId, props.grid_positive_mode, decimals, flowUnit), labelFont, flowColor),
        buildLvglArrowLabel(`${widget.id}_grid_arrow`, Math.round((layout.flows.gridToHome.x1 + layout.flows.gridToHome.x2) / 2), Math.round((layout.flows.gridToHome.y1 + layout.flows.gridToHome.y2) / 2), buildLvglGridArrowLambda(gridId, props.grid_positive_mode), arrowFont, flowColor),
        buildLvglTextLabel(`${widget.id}_grid_label`, Math.round((layout.flows.gridToHome.x1 + layout.flows.gridToHome.x2) / 2), Math.round((layout.flows.gridToHome.y1 + layout.flows.gridToHome.y2) / 2) - 12, 96, buildLvglGridFlowLabelLambda(gridId, solarToGridId, props.grid_positive_mode, decimals, flowUnit), labelFont, flowColor)
    );

    if (props.show_battery) {
        widgets.push(
            buildLvglArrowLabel(`${widget.id}_battery_arrow`, Math.round((layout.flows.homeToBattery.x1 + layout.flows.homeToBattery.x2) / 2), Math.round((layout.flows.homeToBattery.y1 + layout.flows.homeToBattery.y2) / 2), buildLvglBatteryArrowLambda(batteryPowerId, props.battery_positive_mode), arrowFont, flowColor),
            buildLvglTextLabel(`${widget.id}_battery_label`, Math.round((layout.flows.homeToBattery.x1 + layout.flows.homeToBattery.x2) / 2), Math.round((layout.flows.homeToBattery.y1 + layout.flows.homeToBattery.y2) / 2) - 12, 96, buildLvglBatteryFlowLabelLambda(batteryPowerId, solarToBatteryId, props.battery_positive_mode, decimals, flowUnit), labelFont, flowColor)
        );
    }

    if (props.show_gas) {
        widgets.push(
            buildLvglArrowLabel(`${widget.id}_gas_arrow`, Math.round((layout.flows.gasToHome.x1 + layout.flows.gasToHome.x2) / 2), Math.round((layout.flows.gasToHome.y1 + layout.flows.gasToHome.y2) / 2), buildLvglPresenceArrowLambda(gasId, '^'), arrowFont, flowColor)
        );
    }

    widgets.push(
        buildLvglBox(layout.solar, props.solar_label, buildLvglValueLambda(solarId, decimals, flowUnit), {
            borderWidth: boxBorderWidth,
            borderColor,
            radius: props.border_radius,
            color,
            labelFont,
            labelFontSize,
            valueFont,
            valueFontSize,
            subvalueFont,
            subvalueFontSize,
            subvalueText: buildLvglSolarSubvalueLambda(autoconsumptionId, solarId, solarToGridId, gridId, props.grid_positive_mode, decimals)
        }),
        buildLvglBox(layout.home, props.home_label, buildLvglValueLambda(homeId, decimals, flowUnit), {
            borderWidth: boxBorderWidth,
            borderColor,
            radius: props.border_radius,
            color,
            labelFont,
            labelFontSize,
            valueFont,
            valueFontSize,
            subvalueFont,
            subvalueFontSize
        }),
        buildLvglBox(layout.grid, props.grid_label, buildLvglValueLambda(gridId, decimals, flowUnit), {
            borderWidth: boxBorderWidth,
            borderColor,
            radius: props.border_radius,
            color,
            labelFont,
            labelFontSize,
            valueFont,
            valueFontSize,
            subvalueFont,
            subvalueFontSize,
            subvalueText: buildLvglGridDirectionLambda(gridId, props.grid_positive_mode)
        })
    );

    if (props.show_battery) {
        widgets.push(buildLvglBox(layout.battery, props.battery_label, buildLvglValueLambda(batteryPowerId, decimals, flowUnit), {
            borderWidth: boxBorderWidth,
            borderColor,
            radius: props.border_radius,
            color,
            labelFont,
            labelFontSize,
            valueFont,
            valueFontSize,
            subvalueFont,
            subvalueFontSize,
            subvalueText: buildLvglSocLambda(batterySocId)
        }));
    }

    if (props.show_gas) {
        widgets.push(buildLvglBox(layout.gas, props.gas_label, buildLvglValueLambda(gasId, decimals, gasUnit), {
            borderWidth: boxBorderWidth,
            borderColor,
            radius: props.border_radius,
            color,
            labelFont,
            labelFontSize,
            valueFont,
            valueFontSize,
            subvalueFont,
            subvalueFontSize
        }));
    }

    if (props.title) {
        widgets.push({
            label: {
                x: 0,
                y: 2,
                width: layout.width,
                height: Math.max(12, labelFontSize + 4),
                text: JSON.stringify(props.title),
                text_font: labelFont,
                text_color: color,
                text_align: 'center'
            }
        });
    }

    return {
        obj: {
            ...common,
            ...rootBg,
            border_width: outerBorderWidth,
            border_color: borderColor,
            radius: props.border_radius || 0,
            widgets
        }
    };
}

export function onExportNumericSensors(context) {
    const { lines, widgets, isLvgl, pendingTriggers, seenSensorIds } = context;
    const energyWidgets = (widgets || []).filter((widget) => widget.type === 'energy_widget');
    if (energyWidgets.length === 0) return;

    const registerSensor = (entityId) => {
        const normalized = normalizeEntityId(entityId);
        if (!normalized || normalized.startsWith('text_sensor.') || normalized.startsWith('binary_sensor.')) return;
        const safeId = makeSafeSensorId(normalized);
        if (seenSensorIds && seenSensorIds.has(safeId)) return;
        if (seenSensorIds) seenSensorIds.add(safeId);
        lines.push('- platform: homeassistant');
        lines.push(`  id: ${safeId}`);
        lines.push(`  entity_id: ${normalized}`);
        lines.push('  internal: true');
    };

    energyWidgets.forEach((widget) => {
        const props = resolveEnergyWidgetProps(widget.props);
        [
            props.solar_entity,
            props.solar_to_home_entity,
            props.solar_to_grid_entity,
            props.solar_to_battery_entity,
            props.autoconsumption_percent_entity,
            props.home_entity,
            props.grid_entity,
            props.battery_power_entity,
            props.battery_soc_entity,
            props.show_gas ? props.gas_entity : ''
        ].filter(Boolean).forEach((entityId) => {
            registerSensor(entityId);
            if (isLvgl && pendingTriggers) {
                const normalized = normalizeEntityId(entityId);
                if (!normalized) return;
                if (!pendingTriggers.has(normalized)) pendingTriggers.set(normalized, new Set());
                getRefreshTargetIds(widget.id).forEach((action) => pendingTriggers.get(normalized).add(action));
            }
        });
    });
}

export function collectRequirements(widget, { addFont }) {
    const props = resolveEnergyWidgetProps(widget.props);
    const fontFamily = props.font_family || 'Roboto';
    const fontWeight = clampFontWeight(fontFamily, parseInt(String(props.font_weight || 400), 10) || 400);
    const labelFontSize = Math.max(9, parseInt(String(props.label_font_size || 11), 10) || 11);
    const valueFontSize = Math.max(10, parseInt(String(props.font_size || 13), 10) || 13);
    addFont(fontFamily, fontWeight, labelFontSize);
    addFont(fontFamily, fontWeight, valueFontSize);
    addFont(fontFamily, fontWeight, Math.max(9, valueFontSize - 2));
    addFont(fontFamily, fontWeight, Math.max(12, valueFontSize));
}
