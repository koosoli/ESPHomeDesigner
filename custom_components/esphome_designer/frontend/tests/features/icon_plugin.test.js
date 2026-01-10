import { describe, it, expect, vi, beforeEach } from 'vitest';
import iconPlugin from '../../features/icon/plugin.js';

describe('Icon Plugin', () => {
    let mockContext;
    let mockWidget;

    beforeEach(() => {
        mockContext = {
            lines: [],
            getColorConst: vi.fn((c) => `COLOR_${c.toUpperCase()}`),
            addFont: vi.fn(() => 'font_mdi_ref'),
            getCondProps: vi.fn(() => ''),
            getConditionCheck: vi.fn(() => null),
            addDitherMask: vi.fn(),
            isEpaper: false
        };

        mockWidget = {
            id: 'w2',
            type: 'icon',
            x: 50,
            y: 50,
            width: 48,
            height: 48,
            props: {
                code: 'F07D0',
                size: 32,
                color: 'red'
            }
        };
    });

    it('should generate correct C++ for icon', () => {
        iconPlugin.export(mockWidget, mockContext);

        expect(mockContext.addFont).toHaveBeenCalledWith('Material Design Icons', 400, 32);
        expect(mockContext.getColorConst).toHaveBeenCalledWith('red');

        const output = mockContext.lines.join('\n');
        expect(output).toContain('it.printf(50, 50, id(font_mdi_ref), COLOR_RED, "%s", "\\U000F07D0");');
    });

    it('should handle icon codes with 0x prefix', () => {
        mockWidget.props.code = '0xF07D0';
        iconPlugin.export(mockWidget, mockContext);

        const output = mockContext.lines.join('\n');
        expect(output).toContain('"\\U000F07D0"');
    });

    it('should call addDitherMask', () => {
        iconPlugin.export(mockWidget, mockContext);
        expect(mockContext.addDitherMask).toHaveBeenCalled();
    });
});
