/**
 * Tests for ODP-specific widgets parsing
 */
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock js-yaml
vi.mock('js-yaml', () => ({
    default: {
        load: (str) => {
            try {
                return JSON.parse(str);
            } catch {
                // Simple YAML-like parsing for tests
                const items = [];
                let currentItem = null;
                str.split('\n').forEach(line => {
                    const trimmed = line.trim();
                    if (trimmed.startsWith('- type:')) {
                        if (currentItem) items.push(currentItem);
                        currentItem = { type: trimmed.replace('- type:', '').trim().replace(/"/g, '') };
                    } else if (trimmed && currentItem && trimmed.includes(':')) {
                        const [key, ...valueParts] = trimmed.split(':');
                        let value = valueParts.join(':').trim().replace(/"/g, '');
                        // Parse numbers
                        if (/^\d+$/.test(value)) value = parseInt(value, 10);
                        // Parse arrays for points
                        if (value.startsWith('[[')) {
                            try {
                                value = JSON.parse(value);
                            } catch {}
                        }
                        currentItem[key.trim()] = value;
                    }
                });
                if (currentItem) items.push(currentItem);
                return items;
            }
        }
    }
}));

// Import the parsing functions
import { parseOEPLArrayToLayout, isBareOEPLArray } from '../../js/io/yaml_import.js';

describe('ODP-specific widget parsing', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should detect bare ODP array with multiline type', () => {
        const yaml = `- type: multiline
  value: "Line 1|Line 2"
  delimiter: "|"
  x: 606
  y: 204
  size: 20`;
        expect(isBareOEPLArray(yaml)).toBe(true);
    });

    it('should detect bare ODP array with rectangle_pattern type', () => {
        const yaml = `- type: rectangle_pattern
  x_start: 225
  x_size: 35`;
        expect(isBareOEPLArray(yaml)).toBe(true);
    });

    it('should detect bare ODP array with polygon type', () => {
        const yaml = `- type: polygon
  points: [[91, 290], [131, 290]]`;
        expect(isBareOEPLArray(yaml)).toBe(true);
    });

    it('should detect bare ODP array with ellipse type', () => {
        const yaml = `- type: ellipse
  x_start: 267
  x_end: 427`;
        expect(isBareOEPLArray(yaml)).toBe(true);
    });

    it('should detect bare ODP array with arc type', () => {
        const yaml = `- type: arc
  x: 597
  y: 369
  radius: 50`;
        expect(isBareOEPLArray(yaml)).toBe(true);
    });

    it('should detect bare ODP array with icon_sequence type', () => {
        const yaml = `- type: icon_sequence
  x: 447
  y: 255`;
        expect(isBareOEPLArray(yaml)).toBe(true);
    });

    it('should parse multiline widget correctly', () => {
        const items = [
            { type: 'multiline', value: 'Line 1|Line 2', delimiter: '|', x: 606, y: 204, size: 20, color: 'black' }
        ];
        const result = parseOEPLArrayToLayout(items);
        
        expect(result.pages[0].widgets.length).toBe(1);
        const widget = result.pages[0].widgets[0];
        expect(widget.type).toBe('odp_multiline');
        expect(widget.props.text).toBe('Line 1|Line 2');
        expect(widget.props.delimiter).toBe('|');
    });

    it('should parse rectangle_pattern widget correctly', () => {
        const items = [
            { type: 'rectangle_pattern', x_start: 225, x_end: 328, y_start: 250, y_end: 405, x_size: 35, y_size: 18, x_offset: 10, y_offset: 2, x_repeat: 1, y_repeat: 4, fill: 'white', outline: 'red', width: 1 }
        ];
        const result = parseOEPLArrayToLayout(items);
        
        expect(result.pages[0].widgets.length).toBe(1);
        const widget = result.pages[0].widgets[0];
        expect(widget.type).toBe('odp_rectangle_pattern');
        expect(widget.props.x_size).toBe(35);
        expect(widget.props.y_repeat).toBe(4);
    });

    it('should parse polygon widget correctly', () => {
        const items = [
            { type: 'polygon', points: [[91, 290], [131, 290], [131, 330], [91, 330]], fill: 'red', outline: 'black', width: 1 }
        ];
        const result = parseOEPLArrayToLayout(items);
        
        expect(result.pages[0].widgets.length).toBe(1);
        const widget = result.pages[0].widgets[0];
        expect(widget.type).toBe('odp_polygon');
        expect(widget.x).toBe(91);
        expect(widget.y).toBe(290);
        expect(widget.width).toBe(40);
        expect(widget.height).toBe(40);
    });

    it('should parse ellipse widget correctly', () => {
        const items = [
            { type: 'ellipse', x_start: 267, x_end: 427, y_start: 122, y_end: 172, outline: 'black', width: 1 }
        ];
        const result = parseOEPLArrayToLayout(items);
        
        expect(result.pages[0].widgets.length).toBe(1);
        const widget = result.pages[0].widgets[0];
        expect(widget.type).toBe('odp_ellipse');
        expect(widget.width).toBe(160);
        expect(widget.height).toBe(50);
    });

    it('should parse arc widget correctly', () => {
        const items = [
            { type: 'arc', x: 597, y: 369, radius: 50, start_angle: 0, end_angle: 90, outline: 'black', width: 1 }
        ];
        const result = parseOEPLArrayToLayout(items);
        
        expect(result.pages[0].widgets.length).toBe(1);
        const widget = result.pages[0].widgets[0];
        expect(widget.type).toBe('odp_arc');
        expect(widget.props.radius).toBe(50);
        expect(widget.props.start_angle).toBe(0);
        expect(widget.props.end_angle).toBe(90);
    });

    it('should parse icon_sequence widget correctly', () => {
        const items = [
            { type: 'icon_sequence', x: 447, y: 255, icons: ['mdi:home', 'mdi:arrow-right', 'mdi:office-building'], size: 24, direction: 'right', spacing: 6, fill: 'black' }
        ];
        const result = parseOEPLArrayToLayout(items);
        
        expect(result.pages[0].widgets.length).toBe(1);
        const widget = result.pages[0].widgets[0];
        expect(widget.type).toBe('odp_icon_sequence');
        expect(widget.props.icons).toEqual(['mdi:home', 'mdi:arrow-right', 'mdi:office-building']);
        expect(widget.props.direction).toBe('right');
    });

    it('should parse multiple ODP widgets together', () => {
        const items = [
            { type: 'text', value: 'Hello', x: 0, y: 0, size: 20 },
            { type: 'multiline', value: 'A|B', delimiter: '|', x: 100, y: 0, size: 16 },
            { type: 'ellipse', x_start: 0, x_end: 100, y_start: 50, y_end: 100 },
            { type: 'arc', x: 200, y: 100, radius: 30 }
        ];
        const result = parseOEPLArrayToLayout(items);
        
        expect(result.pages[0].widgets.length).toBe(4);
        expect(result.pages[0].widgets[0].type).toBe('text');
        expect(result.pages[0].widgets[1].type).toBe('odp_multiline');
        expect(result.pages[0].widgets[2].type).toBe('odp_ellipse');
        expect(result.pages[0].widgets[3].type).toBe('odp_arc');
    });
});
