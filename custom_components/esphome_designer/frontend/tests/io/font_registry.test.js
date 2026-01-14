import { describe, it, expect } from 'vitest';
import { FontRegistry } from '../../js/io/adapters/font_registry.js';

describe('FontRegistry', () => {
    it('should generate YAML with quoted family and explicit italic flag', () => {
        const registry = new FontRegistry();
        registry.addFont("Roboto", 400, 20, false);

        const lines = registry.getLines();
        const yaml = lines.join('\n');

        // Check for quoted family
        expect(yaml).toContain('family: "Roboto"');

        // Check for explicit italic: false
        expect(yaml).toContain('italic: false');

        // Check for size
        expect(yaml).toContain('size: 20');

        // Check for id
        expect(yaml).toContain('id: font_roboto_400_20');
    });

    it('should handle italic fonts correctly', () => {
        const registry = new FontRegistry();
        registry.addFont("Open Sans", 700, 24, true);

        const lines = registry.getLines();
        const yaml = lines.join('\n');

        expect(yaml).toContain('family: "Open Sans"');
        expect(yaml).toContain('italic: true');
        expect(yaml).toContain('weight: 700');
        expect(yaml).toContain('size: 24');
    });
});
