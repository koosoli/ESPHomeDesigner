/**
 * @vitest-environment jsdom
 */
import { vi, describe, it, expect, beforeEach } from 'vitest';

// Mock dependencies to avoid circular imports (ProjectStore -> devices -> ... -> AppState -> ProjectStore)
vi.mock('../js/io/devices.js', () => ({
    DEVICE_PROFILES: {
        'reterminal_e1001': {
            resolution: { width: 800, height: 480 },
            shape: 'rect'
        }
    }
}));

import { ProjectStore } from '../js/core/stores/project_store.js';

describe('ProjectStore Group Dragging', () => {
    let store;

    beforeEach(() => {
        store = new ProjectStore();
        store.reset();
        // Create a second page
        store.addPage();
    });

    it('should move group children with the same delta as the group when moving to another page', () => {
        const page1 = store.pages[0];
        const page2 = store.pages[1];

        // 1. Create a group on Page 1 at (100, 100)
        const group = {
            id: 'group_1',
            type: 'group',
            x: 100,
            y: 100,
            width: 200,
            height: 200,
            props: {}
        };
        store.addWidget(group, 0);

        // 2. Create a child inside the group at (150, 150) -> relative to canvas, so absolute is 150
        const child = {
            id: 'child_1',
            type: 'box', // arbitrary type
            parentId: 'group_1',
            x: 150,
            y: 150,
            width: 50,
            height: 50,
            props: {}
        };
        store.addWidget(child, 0);

        // Verify initial state
        expect(page1.widgets).toHaveLength(2);
        expect(page2.widgets).toHaveLength(0);

        // 3. Move the group to Page 2 at a NEW position (e.g., 300, 300)
        // This simulates dragging the group to a specific spot on the new page
        // The delta is (300 - 100) = +200 for X, and +200 for Y
        const success = store.moveWidgetToPage('group_1', 1, 300, 300);

        expect(success).toBe(true);

        // 4. Verify Page 1 is empty and Page 2 has both widgets
        expect(page1.widgets).toHaveLength(0);
        expect(page2.widgets).toHaveLength(2);

        // 5. Verify Group Position on Page 2
        const movedGroup = page2.widgets.find(w => w.id === 'group_1');
        expect(movedGroup).toBeDefined();
        expect(movedGroup.x).toBe(300);
        expect(movedGroup.y).toBe(300);

        // 6. Verify Child Position on Page 2
        // It SHOULD be shifted by the same delta (+200, +200)
        // Old Pos: 150, 150
        // Expected New Pos: 350, 350
        const movedChild = page2.widgets.find(w => w.id === 'child_1');
        expect(movedChild).toBeDefined();

        expect(movedChild.x).toBe(350);
        expect(movedChild.y).toBe(350);
    });
});
