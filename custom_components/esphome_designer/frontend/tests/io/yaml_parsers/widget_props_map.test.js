import { describe, expect, it, vi } from 'vitest';

vi.mock('../../../js/utils/logger.js', () => ({
    Logger: { log: vi.fn(), warn: vi.fn(), error: vi.fn() }
}));

import { buildWidgetProps } from '../../../js/io/yaml_parsers/widget_props_map.js';
import {
    applyCommonLvglProps,
    normalizeMappedColor
} from '../../../js/io/yaml_parsers/widget_props_map_helpers.js';

describe('widget_props_map helpers', () => {
    it('normalizes fallback, numeric, and hex-prefixed colors', () => {
        expect(normalizeMappedColor(undefined, 'theme_auto')).toBe('theme_auto');
        expect(normalizeMappedColor('', 'fallback')).toBe('fallback');
        expect(normalizeMappedColor(0xff, 'unused')).toBe('#0ff');
        expect(normalizeMappedColor(0x1234ab, 'unused')).toBe('#1234ab');
        expect(normalizeMappedColor(' 0xABCD ', 'unused')).toBe('#abcd');
        expect(normalizeMappedColor('Blue ', 'unused')).toBe('blue');
    });

    it('applies common LVGL props with boolean, numeric, color, and grid coercion', () => {
        const props = {};
        applyCommonLvglProps('lvgl_custom', {
            hidden: 'true',
            clickable: 'false',
            checkable: 'true',
            scrollable: 'false',
            floating: 'true',
            ignore_layout: 'true',
            scrollbar_mode: 'HIDDEN',
            opa: '128',
            bg_color: '0xFFFFFF',
            line_color_main: '0x00FF00',
            grid_row: '2',
            grid_col: '3',
            grid_row_span: '4',
            grid_col_span: '5',
            grid_x_align: 'CENTER',
            grid_y_align: 'END',
            radius: '12',
            width: '999',
            id: 'skip-me'
        }, props);

        expect(props).toMatchObject({
            hidden: true,
            clickable: false,
            checkable: true,
            scrollable: false,
            floating: true,
            ignore_layout: true,
            scrollbar_mode: 'HIDDEN',
            opa: 128,
            bg_color: '#ffffff',
            line_color_main: '#00ff00',
            grid_cell_row_pos: 2,
            grid_cell_column_pos: 3,
            grid_cell_row_span: 4,
            grid_cell_column_span: 5,
            grid_cell_x_align: 'CENTER',
            grid_cell_y_align: 'END',
            radius: 12
        });
        expect(props).not.toHaveProperty('width');
        expect(props).not.toHaveProperty('id');
    });

    it('ignores non-LVGL widgets when applying common props', () => {
        const props = {};
        applyCommonLvglProps('text', { color: 'red' }, props);
        expect(props).toEqual({});
    });
});

describe('buildWidgetProps', () => {
    it('maps representative direct widgets through the basic mapper', () => {
        const textWidget = { title: '', width: 100, height: 20 };
        expect(buildWidgetProps('text', {
            text: 'Hello',
            size: '18',
            font: 'Inter',
            weight: '700',
            italic: 'true',
            color: 'red',
            align: 'BOTTOM_RIGHT',
            truncate: 'true'
        }, textWidget)).toEqual({
            text: 'Hello',
            font_size: 18,
            font_family: 'Inter',
            font_weight: 700,
            italic: true,
            bpp: 1,
            color: 'red',
            text_align: 'BOTTOM_RIGHT',
            truncate: true
        });

        const sensorWidget = { title: '', width: 100, height: 20 };
        expect(buildWidgetProps('sensor_text', {
            entity_2: 'sensor.outdoor',
            label_font: '12',
            value_font: '24',
            format: 'value_only',
            italic: true,
            font_family: 'Roboto',
            font_weight: '500',
            prefix: 'Temp ',
            postfix: ' C',
            hide_unit: 'true',
            precision: '1',
            local: 'true',
            text_sensor: 'true',
            separator: ' / ',
            truncate: 'true'
        }, sensorWidget)).toMatchObject({
            label_font_size: 12,
            value_font_size: 24,
            value_format: 'value_only',
            italic: true,
            font_family: 'Roboto',
            font_weight: 500,
            prefix: 'Temp ',
            postfix: ' C',
            hide_unit: true,
            precision: 1,
            is_local_sensor: true,
            is_text_sensor: true,
            separator: ' / ',
            truncate: true
        });
        expect(sensorWidget.entity_id_2).toBe('sensor.outdoor');

        const datetimeWidget = { title: '', width: 0, height: 0 };
        expect(buildWidgetProps('datetime', {
            w: '240',
            h: '70',
            time_font: '30',
            date_font: '15',
            font_style: 'italic',
            border_width: '2'
        }, datetimeWidget)).toMatchObject({
            format: 'time_date',
            time_font_size: 30,
            date_font_size: 15,
            italic: true,
            border_width: 2
        });
        expect(datetimeWidget.width).toBe(240);
        expect(datetimeWidget.height).toBe(70);
    });

    it('maps representative LVGL widgets through the specific mapper', () => {
        const labelWidget = { title: '', width: 100, height: 20 };
        expect(buildWidgetProps('lvgl_label', {
            text: '"Label"',
            size: '22',
            font_family: 'Inter',
            font_weight: '600',
            italic: 'true',
            color: '0x123456',
            bg_color: '0xFFFFFF',
            border_color: '0x000000',
            align: 'BOTTOM_CENTER'
        }, labelWidget)).toMatchObject({
            text: 'Label',
            font_size: 22,
            font_family: 'Inter',
            font_weight: 600,
            italic: true,
            text_color: '#123456',
            bg_color: '#ffffff',
            border_color: '#000000',
            text_align: 'BOTTOM_CENTER'
        });

        const lineWidget = { title: '', width: 100, height: 20 };
        expect(buildWidgetProps('lvgl_line', {
            color: '0x00FF00',
            points: '0,0 10,10',
            line_width: '4',
            line_rounded: 'false'
        }, lineWidget)).toMatchObject({
            points: '0,0 10,10',
            line_width: 4,
            line_color: '#00ff00',
            line_rounded: false
        });

        const buttonWidget = { title: '', width: 100, height: 20 };
        const buttonProps = buildWidgetProps('lvgl_button', {
            title: 'CTA',
            text: 'Tap',
            color: '0xFFAA00',
            bg_color: '0x001122',
            border: '3',
            radius: '8',
            checkable: 'true'
        }, buttonWidget);
        expect(buttonWidget.title).toBe('CTA');
        expect(buttonProps).toMatchObject({
            text: 'Tap',
            color: '#ffaa00',
            bg_color: '#001122',
            border_width: 3,
            radius: 8,
            checkable: true
        });
        expect(buttonProps).not.toHaveProperty('text_color');
    });

    it('normalizes generic LVGL props, array payloads, units, unicode, and scalar coercion', () => {
        const widget = { title: '', width: 100, height: 20 };
        const props = buildWidgetProps('lvgl_custom', {
            id: 'custom_1',
            type: 'lvgl_custom',
            x: '1',
            y: '2',
            w: '3',
            h: '4',
            title: 'Fancy',
            hidden: 'true',
            clickable: 'false',
            opa: '90',
            grid_cell_row_pos: '4',
            options: ['One', 'Two'],
            points: [[0, 0], [10, 10], '20,20'],
            timeout: '250ms',
            rotation: '45deg',
            padding: '12px',
            percent: '66%',
            encoded: '\\u0041',
            enabled: 'true',
            disabled: 'false',
            color: '0x00AAFF',
            value: '42',
            decimal: '-3.5',
            text: '007',
            raw_hex: '0x10'
        }, widget);

        expect(widget.title).toBe('Fancy');
        expect(props).toMatchObject({
            hidden: true,
            clickable: false,
            opa: 90,
            grid_cell_row_pos: 4,
            options: 'One\nTwo',
            points: '0,0 10,10 20,20',
            timeout: 250,
            rotation: 45,
            padding: 12,
            percent: 66,
            encoded: 'A',
            enabled: true,
            disabled: false,
            color: '#00aaff',
            value: 42,
            decimal: -3.5,
            text: '007',
            raw_hex: '0x10'
        });
        expect(props).not.toHaveProperty('id');
        expect(props).not.toHaveProperty('type');
        expect(props).not.toHaveProperty('x');
        expect(props).not.toHaveProperty('w');
    });

    it('maps dropdown and roller widgets with array or string options correctly', () => {
        const dropdownWidget = { title: '', width: 100, height: 20 };
        const dropdownPropsArray = buildWidgetProps('lvgl_dropdown', {
            options: ['Option A', 'Option B', 'Option C'],
            selected_index: '1'
        }, dropdownWidget);
        expect(dropdownPropsArray).toMatchObject({
            options: 'Option A\nOption B\nOption C',
            selected_index: 1
        });

        const dropdownPropsString = buildWidgetProps('lvgl_dropdown', {
            options: 'First\\nSecond\\nThird',
            selected_index: '2'
        }, dropdownWidget);
        expect(dropdownPropsString).toMatchObject({
            options: 'First\nSecond\nThird',
            selected_index: 2
        });

        const rollerWidget = { title: '', width: 100, height: 20 };
        const rollerPropsArray = buildWidgetProps('lvgl_roller', {
            options: ['X', 'Y', 'Z'],
            visible_row_count: '5'
        }, rollerWidget);
        expect(rollerPropsArray).toMatchObject({
            options: 'X\nY\nZ',
            visible_row_count: 5
        });

        const rollerPropsString = buildWidgetProps('lvgl_roller', {
            options: 'A\\nB\\nC',
            visible_row_count: '4'
        }, rollerWidget);
        expect(rollerPropsString).toMatchObject({
            options: 'A\nB\nC',
            visible_row_count: 4
        });
    });

    it('returns empty props for unknown non-LVGL widgets', () => {
        expect(buildWidgetProps('mystery_widget', { foo: 'bar' }, { title: '' })).toEqual({});
    });
});
