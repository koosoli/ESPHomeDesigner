import { describe, it, expect, vi, beforeEach } from 'vitest';
import textPlugin from '../../features/text/plugin.js';

describe('Text Plugin', () => {
    let mockContext;
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
        };

        mockWidget = {
            id: 'w1',
            type: 'text',
            x: 10,
            y: 20,
            width: 500,
            height: 30,
            props: {
                text: 'Hello World',
                color: 'blue',
                font_size: 24,
                text_align: 'TOP_LEFT'
            }
        };
    });

    it('should generate correct C++ for basic text', () => {
        textPlugin.export(mockWidget, mockContext);

        expect(mockContext.addFont).toHaveBeenCalledWith('Roboto', 400, 24, undefined);
        expect(mockContext.getColorConst).toHaveBeenCalledWith('blue');

        const output = mockContext.lines.join('\n');
        expect(output).toContain('it.printf(10, 20, id(font_id_123), COLOR_BLUE, TextAlign::TOP_LEFT, "Hello World");');
    });

    it('should handle center alignment correctly', () => {
        mockWidget.props.text_align = 'CENTER';
        textPlugin.export(mockWidget, mockContext);

        const output = mockContext.lines.join('\n');
        // x = 10 + 500/2 = 260
        // y = 20 + 30/2 = 35
        expect(output).toContain('it.printf(260, 35, id(font_id_123), COLOR_BLUE, TextAlign::CENTER, "Hello World");');
    });

    it('should handle bottom right alignment correctly', () => {
        mockWidget.props.text_align = 'BOTTOM_RIGHT';
        textPlugin.export(mockWidget, mockContext);

        const output = mockContext.lines.join('\n');
        // x = 10 + 500 = 510
        // y = 20 + 30 = 50
        expect(output).toContain('it.printf(510, 50, id(font_id_123), COLOR_BLUE, TextAlign::BOTTOM_RIGHT, "Hello World");');
    });

    it('should escape quotes in text', () => {
        mockWidget.props.text = 'He said "Hello"';
        textPlugin.export(mockWidget, mockContext);

        const output = mockContext.lines.join('\n');
        expect(output).toContain('"He said \\"Hello\\"");');
    });

    it('should center multi-line text vertically as a coherent block', () => {
        mockWidget.props.text = 'Wetter\nWarnung';
        mockWidget.props.text_align = 'CENTER';
        mockWidget.props.font_size = 20; // lineHeight = 24
        // widget: y = 20, height = 30 -> center y = 35
        // 2 lines: startY = 35 - (1 * 24) / 2 = 23
        // line 1: y = 23, line 2: y = 47
        textPlugin.export(mockWidget, mockContext);

        const output = mockContext.lines.join('\n');
        expect(output).toContain('it.printf(260, 23, id(font_id_123), COLOR_BLUE, TextAlign::CENTER, "Wetter");');
        expect(output).toContain('it.printf(260, 47, id(font_id_123), COLOR_BLUE, TextAlign::CENTER, "Warnung");');
    });

    it('should offset multi-line text vertically for bottom alignment', () => {
        mockWidget.props.text = 'Line 1\nLine 2';
        mockWidget.props.text_align = 'BOTTOM_CENTER';
        mockWidget.props.font_size = 20; // lineHeight = 24
        // widget: y = 20, height = 30 -> bottom y = 50
        // 2 lines: startY = 50 - 24 = 26
        // line 1: y = 26, line 2: y = 50
        textPlugin.export(mockWidget, mockContext);

        const output = mockContext.lines.join('\n');
        expect(output).toContain('it.printf(260, 26, id(font_id_123), COLOR_BLUE, TextAlign::BOTTOM_CENTER, "Line 1");');
        expect(output).toContain('it.printf(260, 50, id(font_id_123), COLOR_BLUE, TextAlign::BOTTOM_CENTER, "Line 2");');
    });

    it('should export filled_rounded_rectangle and draw_rrect_border when border_radius is set', () => {
        mockWidget.props.bg_color = 'yellow';
        mockWidget.props.border_width = 2;
        mockWidget.props.border_color = 'black';
        mockWidget.props.border_radius = 8;

        textPlugin.export(mockWidget, mockContext);

        const output = mockContext.lines.join('\n');
        expect(output).toContain('it.filled_rounded_rectangle(10, 20, 500, 30, 8, COLOR_YELLOW);');
        expect(output).toContain('auto draw_rrect_border = [&](int x, int y, int w, int h, int r, int t, auto c)');
        expect(output).toContain('draw_rrect_border(10, 20, 500, 30, 8, 2, COLOR_BLACK);');
    });

    it('uses print_wrapped_text for single-line text that triggers auto-wrapping without hardcoded line splits', () => {
        mockWidget.props.text = 'Derniere mise a jour : ';
        mockWidget.width = 150;
        mockWidget.props.font_size = 14;
        mockWidget.props.text_align = 'CENTER_LEFT';
        mockWidget.y = 445;
        mockWidget.height = 30;

        textPlugin.export(mockWidget, mockContext);

        const output = mockContext.lines.join('\n');
        expect(output).toContain('print_wrapped_text(10, 460, 150, 18, id(font_id_123), COLOR_BLUE, TextAlign::CENTER_LEFT, "Derniere mise a jour : ");');
        expect(output).not.toContain('it.printf');
    });
});
