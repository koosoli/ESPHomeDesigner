import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AIValidator } from '../../js/io/ai_validator';
import { registry } from '../../js/core/plugin_registry';

// Mock registry
const mockPlugins = new Map();
vi.mock('../../js/core/plugin_registry', () => {
    return {
        registry: {
            get: vi.fn((type) => mockPlugins.get(type)),
            register: vi.fn((p) => mockPlugins.set(p.id, p))
        }
    };
});

describe('AIValidator', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        // Register a standard "text" plugin for testing
        registry.register({
            id: 'text',
            defaults: {
                text: 'Hello',
                font_size: 20,
                color: 'black'
            }
        });
    });

    describe('validateWidget', () => {
        it('should pass a perfectly valid widget', () => {
            const widget = {
                id: 'w1',
                type: 'text',
                x: 10, y: 10, width: 100, height: 30,
                text: 'Valid'
            };
            const result = AIValidator.validateWidget(widget);
            expect(result.valid).toBe(true);
            expect(result.errors).toHaveLength(0);
            expect(result.sanitized).toEqual(widget);
        });

        it('should fail on unknown widget type', () => {
            const widget = {
                id: 'w1',
                type: 'halucinated_type',
                x: 10, y: 10, width: 100, height: 30
            };
            const result = AIValidator.validateWidget(widget);
            expect(result.valid).toBe(false);
            expect(result.errors[0]).toContain('Unknown widget type');
        });

        it('should sanitize hallucinated properties', () => {
            const widget = {
                id: 'w1',
                type: 'text',
                x: 10, y: 10, width: 100, height: 30,
                hallucinated_prop: 'oops',
                text: 'Keep me'
            };
            const result = AIValidator.validateWidget(widget);
            expect(result.valid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.sanitized.hallucinated_prop).toBeUndefined();
            expect(result.sanitized.text).toBe('Keep me');
        });

        it('should fail on missing structural properties', () => {
            const widget = {
                id: 'w1',
                type: 'text',
                x: 10,
                // missing y, width, height
            };
            const result = AIValidator.validateWidget(widget);
            expect(result.valid).toBe(false);
            expect(result.errors).toEqual(expect.arrayContaining([
                expect.stringContaining('Missing required property "y"'),
                expect.stringContaining('Missing required property "width"'),
                expect.stringContaining('Missing required property "height"')
            ]));
        });
    });

    describe('validateResponse', () => {
        it('should validate an array with mixed valid/invalid widgets', () => {
            const payload = [
                { id: 'w1', type: 'text', x: 0, y: 0, width: 10, height: 10 },
                { id: 'w2', type: 'non_existent_type', x: 0, y: 0, width: 10, height: 10 }
            ];
            const result = AIValidator.validateResponse(payload);
            expect(result.valid).toBe(false);
            expect(result.errors).toHaveLength(1);
            expect(result.errors[0]).toContain('Unknown widget type');
        });

        it('should accept object wrapper { widgets: [...] }', () => {
            const payload = {
                widgets: [{ id: 'w1', type: 'text', x: 0, y: 0, width: 10, height: 10 }]
            };
            const result = AIValidator.validateResponse(payload);
            expect(result.valid).toBe(true);
            expect(result.sanitized).toHaveLength(1);
        });

        it('should fail gracefully on garbage input', () => {
            const result = AIValidator.validateResponse("not json");
            expect(result.valid).toBe(false);
            expect(result.errors[0]).toContain('must be an array');
        });
    });

    describe('sandbox', () => {
        it('should detect added, modified, and removed widgets', () => {
            const current = [
                { id: 'w1', type: 'text', x: 0, y: 0, width: 10, height: 10, text: 'Hello' },
                { id: 'w2', type: 'text', x: 20, y: 20, width: 50, height: 50, text: 'World' }
            ];
            const aiPayload = [
                { id: 'w1', type: 'text', x: 0, y: 0, width: 10, height: 10, text: 'Changed' }, // modified
                { id: 'w3', type: 'text', x: 30, y: 30, width: 60, height: 60, text: 'New' }      // added (w2 removed)
            ];
            const diff = AIValidator.sandbox(current, aiPayload);

            expect(diff.added).toHaveLength(1);
            expect(diff.added[0].id).toBe('w3');
            expect(diff.modified).toHaveLength(1);
            expect(diff.modified[0].text).toBe('Changed');
            expect(diff.removed).toEqual(['w2']);
        });

        it('should not mutate the original state', () => {
            const current = [{ id: 'w1', type: 'text', x: 0, y: 0, width: 10, height: 10, text: 'Original' }];
            const originalJson = JSON.stringify(current);
            const aiPayload = [{ id: 'w1', type: 'text', x: 99, y: 99, width: 10, height: 10, text: 'Mutated' }];

            AIValidator.sandbox(current, aiPayload);

            expect(JSON.stringify(current)).toBe(originalJson);
        });
    });
});
