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
            width: 100,
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
        // x = 10 + 100/2 = 60
        // y = 20 + 30/2 = 35
        expect(output).toContain('it.printf(60, 35, id(font_id_123), COLOR_BLUE, TextAlign::CENTER, "Hello World");');
    });

    it('should handle bottom right alignment correctly', () => {
        mockWidget.props.text_align = 'BOTTOM_RIGHT';
        textPlugin.export(mockWidget, mockContext);

        const output = mockContext.lines.join('\n');
        // x = 10 + 100 = 110
        // y = 20 + 30 = 50
        expect(output).toContain('it.printf(110, 50, id(font_id_123), COLOR_BLUE, TextAlign::BOTTOM_RIGHT, "Hello World");');
    });

    it('should escape quotes in text', () => {
        mockWidget.props.text = 'He said "Hello"';
        textPlugin.export(mockWidget, mockContext);

        const output = mockContext.lines.join('\n');
        expect(output).toContain('"He said \\"Hello\\"");');
    });
});
