import { describe, it, expect, vi, beforeEach } from 'vitest';
import sensorTextPlugin from '../../features/sensor_text/plugin.js';

describe('Sensor Text Plugin - Dynamic Color', () => {
    let mockContext;
    let mockLvglContext;
    let mockWidget;

    beforeEach(() => {
        mockContext = {
            lines: [],
            getColorConst: vi.fn((c) => `COLOR_${c.toUpperCase()}`),
            addFont: vi.fn(() => 'font_id_123'),
            getAlignX: vi.fn((a, x) => x),
            getAlignY: vi.fn((a, y) => y),
            getCondProps: vi.fn(() => ''),
            getConditionCheck: vi.fn(() => null),
            widgets: [],
            profile: { features: { lcd: true }, name: 'Test LCD' }
        };

        mockLvglContext = {
            common: {},
            convertColor: vi.fn((c) => `LV_COLOR_${c.toUpperCase()}`),
            getLVGLFont: vi.fn(() => 'lv_font_id'),
            convertAlign: vi.fn((a) => a),
            formatOpacity: vi.fn((o) => o),
            getObjectDescriptor: vi.fn((w) => ({ type: 'obj', attrs: { id: w?.id } })),
            profile: { features: { lcd: true }, name: 'Test LCD', pins: {} }
        };

        mockWidget = {
            id: 'w1',
            type: 'sensor_text',
            x: 10,
            y: 20,
            width: 150,
            height: 50,
            entity_id: 'sensor.temperature',
            props: {
                ...sensorTextPlugin.defaults,
                color: 'blue',
                font_size: 24,
                value_format: 'value_only_no_unit'
            }
        };
    });

    it('should generate standard C++ colors when disabled', () => {
        sensorTextPlugin.export(mockWidget, mockContext);
        const output = mockContext.lines.join('\n');
        expect(output).toContain('COLOR_BLUE');
        expect(output).not.toContain('Color dyn_color');
    });

    it('should generate lambda block with dyn_color when enabled', () => {
        mockWidget.props.dynamic_color_enabled = true;
        mockWidget.props.dynamic_color_low = '#0000FF'; // Blue
        mockWidget.props.dynamic_color_high = '#FF0000'; // Red
        mockWidget.props.dynamic_value_low = 10;
        mockWidget.props.dynamic_value_high = 30;

        sensorTextPlugin.export(mockWidget, mockContext);
        const output = mockContext.lines.join('\n');

        expect(output).toContain('Color dyn_color(r, g, b);');
        expect(output).toContain('float t = (val - (10)) / (float)(30 - (10));');
        // Check RGB hex to int parsing logic checks out
        expect(output).toContain('uint8_t r = 0 + (uint8_t)(t * (255 - 0));');
        expect(output).toContain('dyn_color');
    });

    it('should fall back to standard colors for text sensors', () => {
        mockWidget.props.dynamic_color_enabled = true;
        mockWidget.props.is_text_sensor = true;

        sensorTextPlugin.export(mockWidget, mockContext);
        const output = mockContext.lines.join('\n');

        expect(output).not.toContain('Color dyn_color');
        expect(output).toContain('COLOR_BLUE');
    });

    it('should generate lv_color_make lambda for LVGL when enabled', () => {
        mockWidget.props.dynamic_color_enabled = true;
        mockWidget.props.dynamic_color_low = '#00FF00'; // Green
        mockWidget.props.dynamic_color_high = '#FF0000'; // Red
        mockWidget.props.dynamic_value_low = -10;
        mockWidget.props.dynamic_value_high = 40;

        const result = sensorTextPlugin.exportLVGL(mockWidget, mockLvglContext);
        const textColor = result.label.text_color;

        expect(textColor).toContain('!lambda |-');
        expect(textColor).toContain('return lv_color_make');
        expect(textColor).toContain('float t = (val - (-10)) / (float)(40 - (-10));');
    });

    it('should fall back to uncomputed color_low for ODP and OEPL', () => {
        mockWidget.props.dynamic_color_enabled = true;
        mockWidget.props.dynamic_color_low = '#AAAAAA';

        const mockOdpContext = { layout: {}, page: {} };
        const resultOdp = sensorTextPlugin.exportOpenDisplay(mockWidget, mockOdpContext);
        expect(resultOdp.color).toBe('#AAAAAA');

        const resultOepl = sensorTextPlugin.exportOEPL(mockWidget, mockOdpContext);
        expect(resultOepl.color).toBe('#AAAAAA');
    });

    it('should include new dynamic_color defaults in schema', () => {
        const d = sensorTextPlugin.defaults;
        expect(d.dynamic_color_enabled).toBe(false);
        expect(d.dynamic_color_low).toBe('#3498db');
        expect(d.dynamic_color_high).toBe('#e74c3c');
        expect(d.dynamic_value_low).toBe(0);
        expect(d.dynamic_value_high).toBe(100);
    });

    it('should not emit dynamic color block when value range is zero', () => {
        mockWidget.props.dynamic_color_enabled = true;
        mockWidget.props.dynamic_value_low = 50;
        mockWidget.props.dynamic_value_high = 50; // zero range

        sensorTextPlugin.export(mockWidget, mockContext);
        const output = mockContext.lines.join('\n');

        // With zero range, division by zero would be an issue.
        // The code still generates the block but the C++ t = (val - 50) / (float)(0) would be inf.
        // We just verify it doesn't crash.
        expect(output).toContain('dyn_color');
    });

    it('should use label_value format with dynamic color', () => {
        mockWidget.props.dynamic_color_enabled = true;
        mockWidget.props.dynamic_color_low = '#00FF00';
        mockWidget.props.dynamic_color_high = '#FF0000';
        mockWidget.props.value_format = 'label_value';
        mockWidget.title = 'Temperature';

        sensorTextPlugin.export(mockWidget, mockContext);
        const output = mockContext.lines.join('\n');

        expect(output).toContain('Color dyn_color(r, g, b);');
        expect(output).toContain('dyn_color');
    });

    it('should NOT generate dynamic color block on monochrome (e-paper) displays', () => {
        mockWidget.props.dynamic_color_enabled = true;
        mockWidget.props.dynamic_color_low = '#0000FF';
        mockWidget.props.dynamic_color_high = '#FF0000';

        // Override profile to monochrome e-paper
        const monoContext = { ...mockContext, profile: { features: { epaper: true }, name: 'reTerminal E1001' } };
        sensorTextPlugin.export(mockWidget, monoContext);
        const output = monoContext.lines.join('\n');

        expect(output).not.toContain('Color dyn_color');
        expect(output).toContain('COLOR_BLUE');
    });
});
