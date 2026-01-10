import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AppState } from '../js/core/stores/index.js';

describe('Multi-Delete Reproduction', () => {
    beforeEach(() => {
        AppState.reset();
        vi.restoreAllMocks();
    });

    it('should delete multiple selected widgets', () => {
        // Add 3 widgets
        AppState.addWidget({ id: 'w1', type: 'text', x: 10, y: 10, width: 50, height: 20 });
        AppState.addWidget({ id: 'w2', type: 'text', x: 20, y: 20, width: 50, height: 20 });
        AppState.addWidget({ id: 'w3', type: 'text', x: 30, y: 30, width: 50, height: 20 });

        expect(AppState.project.pages[0].widgets.length).toBe(3);

        // Simulate lasso selection
        AppState.selectWidgets(['w1', 'w2', 'w3']);
        expect(AppState.selectedWidgetIds.length).toBe(3);

        // Delete selection
        AppState.deleteWidget(null);

        expect(AppState.project.pages[0].widgets.length).toBe(0);
        expect(AppState.selectedWidgetIds.length).toBe(0);
    });

    it('should delete only selected widgets among many', () => {
        AppState.addWidget({ id: 'w1', type: 'text' });
        AppState.addWidget({ id: 'w2', type: 'text' });
        AppState.addWidget({ id: 'w3', type: 'text' });
        AppState.addWidget({ id: 'w4', type: 'text' });

        AppState.selectWidgets(['w1', 'w3']);
        AppState.deleteWidget(null);

        expect(AppState.project.pages[0].widgets.length).toBe(2);
        expect(AppState.getWidgetById('w1')).toBeUndefined();
        expect(AppState.getWidgetById('w3')).toBeUndefined();
        expect(AppState.getWidgetById('w2')).toBeDefined();
        expect(AppState.getWidgetById('w4')).toBeDefined();
    });
});
