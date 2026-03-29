import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProjectStore } from '../../js/core/stores/project_store.js';
import * as events from '../../js/core/events.js';
import { ORIENTATIONS } from '../../js/core/constants.ts';
import { DEVICE_PROFILES } from '../../js/io/devices.js';

// Mock events
vi.mock('../../js/core/events.js', () => ({
    emit: vi.fn(),
    EVENTS: {
        STATE_CHANGED: 'STATE_CHANGED',
        PAGE_CHANGED: 'PAGE_CHANGED',
        SETTINGS_CHANGED: 'SETTINGS_CHANGED'
    }
}));

// Mock devices to avoid circular dependency via ha_api
vi.mock('../../js/io/devices.js', () => ({
    DEVICE_PROFILES: {
        reterminal_e1001: {
            resolution: { width: 400, height: 300 }
        },
        custom: {
            resolution: { width: 800, height: 480 }
        }
    },
    SUPPORTED_DEVICE_IDS: ['reterminal_e1001', 'custom']
}));

// Mock logger
vi.mock('../../js/utils/logger.js', () => ({
    Logger: {
        log: vi.fn(),
        error: vi.fn(),
        warn: vi.fn()
    }
}));

// Mock env
vi.mock('../../js/utils/env.js', () => ({
    hasHaBackend: vi.fn(() => true)
}));

// Mock helpers
vi.mock('../../js/utils/helpers.js', () => ({
    generateId: vi.fn(() => 'mock-id-' + Math.random()),
    deepClone: vi.fn((obj) => JSON.parse(JSON.stringify(obj)))
}));

describe('ProjectStore', () => {
    let store;

    beforeEach(() => {
        vi.clearAllMocks();
        store = new ProjectStore();
    });

    describe('Initialization', () => {
        it('should initialize with one default page', () => {
            expect(store.pages.length).toBe(1);
            expect(store.pages[0].name).toBe('Overview');
            expect(store.currentPageIndex).toBe(0);
        });

        it('recreates a default page when the store has no pages', () => {
            store.state.pages = [];
            store.state.currentPageIndex = 2;

            const page = store.getCurrentPage();

            expect(page.name).toBe('Overview');
            expect(store.pages).toHaveLength(1);
            expect(store.currentPageIndex).toBe(0);
        });
    });

    describe('Page CRUD', () => {
        it('should add a new page', () => {
            const newPage = store.addPage();
            expect(store.pages.length).toBe(2);
            expect(newPage.name).toBe('Page 1');
            expect(store.currentPageIndex).toBe(1);
            expect(events.emit).toHaveBeenCalledWith('PAGE_CHANGED', expect.any(Object));
        });

        it('should delete a page and adjust index', () => {
            store.addPage(); // index 1
            store.addPage(); // index 2
            store.setCurrentPageIndex(2);

            store.deletePage(1);
            expect(store.pages.length).toBe(2);
            expect(store.currentPageIndex).toBe(1);
        });

        it('should keep a default page when setPages receives an empty array', () => {
            store.setPages([]);

            expect(store.pages.length).toBe(1);
            expect(store.pages[0].name).toBe('Overview');
            expect(store.currentPageIndex).toBe(0);
        });

        it('should not delete the last remaining page', () => {
            store.deletePage(0);

            expect(store.pages.length).toBe(1);
            expect(store.pages[0].name).toBe('Overview');
        });

        it('should rename a page', () => {
            store.renamePage(0, ' Dashboard ');
            expect(store.pages[0].name).toBe('Dashboard');
        });

        it('should duplicate a page with new widget IDs', () => {
            store.addWidget({ id: 'w1', type: 'text', x: 0, y: 0, props: {} });
            const newPage = store.duplicatePage(0);

            expect(store.pages.length).toBe(2);
            expect(newPage.name).toBe('Overview (Copy)');
            expect(newPage.widgets[0].id).not.toBe('w1');
            expect(newPage.widgets[0].type).toBe('text');
        });

        it('should preserve parent-child relationships when duplicating a page', () => {
            store.addWidget({ id: 'group-1', type: 'group', x: 0, y: 0, props: {} });
            store.addWidget({ id: 'child-1', type: 'text', x: 5, y: 5, parentId: 'group-1', props: {} });

            const newPage = store.duplicatePage(0);
            const duplicatedGroup = newPage.widgets.find((widget) => widget.type === 'group');
            const duplicatedChild = newPage.widgets.find((widget) => widget.type === 'text');

            expect(duplicatedGroup?.id).toBeDefined();
            expect(duplicatedChild?.id).toBeDefined();
            expect(duplicatedChild?.parentId).toBe(duplicatedGroup?.id);
            expect(duplicatedChild?.parentId).not.toBe('group-1');
        });
    });

    describe('Widget CRUD', () => {
        it('should add a widget to the current page', () => {
            const widget = { id: 'w1', type: 'text', x: 10, y: 10, props: {} };
            store.addWidget(widget);
            expect(store.pages[0].widgets.length).toBe(1);
            expect(store.getWidgetById('w1')).toBe(widget);
        });

        it('should update a widget', () => {
            store.addWidget({ id: 'w1', type: 'text', x: 0, y: 0, props: {} });
            store.updateWidget('w1', { x: 50, title: 'Hello' });

            const w = store.getWidgetById('w1');
            expect(w.x).toBe(50);
            expect(w.title).toBe('Hello');
        });

        it('should delete widgets from current page', () => {
            store.addWidget({ id: 'w1', type: 'text' });
            store.addWidget({ id: 'w2', type: 'text' });
            store.deleteWidgets(['w1']);

            expect(store.pages[0].widgets.length).toBe(1);
            expect(store.getWidgetById('w1')).toBeUndefined();
            expect(store.getWidgetById('w2')).toBeDefined();
        });
    });

    describe('Ordering', () => {
        it('should reorder pages', () => {
            store.addPage(); // Page 1
            store.renamePage(1, 'PageB');
            store.reorderPage(0, 1);

            expect(store.pages[0].name).toBe('PageB');
            expect(store.pages[1].name).toBe('Overview');
        });

        it('updates the current page index when the current page itself is moved', () => {
            store.addPage();
            store.addPage();
            store.setCurrentPageIndex(0);

            store.reorderPage(0, 2);

            expect(store.currentPageIndex).toBe(2);
        });

        it('updates the current page index when another page crosses over it', () => {
            store.addPage();
            store.addPage();
            store.setCurrentPageIndex(1);

            store.reorderPage(2, 1);

            expect(store.currentPageIndex).toBe(2);
        });

        it('should reorder widgets within a page', () => {
            store.addWidget({ id: 'w1' });
            store.addWidget({ id: 'w2' });
            store.reorderWidget(0, 0, 1);

            expect(store.pages[0].widgets[0].id).toBe('w2');
            expect(store.pages[0].widgets[1].id).toBe('w1');
        });

        it('ignores invalid widget reorder indexes', () => {
            store.addWidget({ id: 'w1' });
            store.addWidget({ id: 'w2' });

            store.reorderWidget(0, 0, 99);

            expect(store.pages[0].widgets.map((widget) => widget.id)).toEqual(['w1', 'w2']);
        });

        it('ignores widget reorders for missing pages', () => {
            store.addWidget({ id: 'w1' });
            events.emit.mockClear();

            store.reorderWidget(99, 0, 0);

            expect(store.pages[0].widgets.map((widget) => widget.id)).toEqual(['w1']);
            expect(events.emit).not.toHaveBeenCalled();
        });

        it('should ignore invalid current page changes', () => {
            store.setCurrentPageIndex(99);

            expect(store.currentPageIndex).toBe(0);
            expect(events.emit).not.toHaveBeenCalled();
        });
    });

    describe('Page insertion', () => {
        it('increments the current page index when inserting before the current page', () => {
            store.addPage();
            store.setCurrentPageIndex(1);

            store.addPage(1);

            expect(store.currentPageIndex).toBe(2);
        });
    });

    describe('Move Widget to Page', () => {
        it('should move a widget and its children to another page', () => {
            store.addWidget({ id: 'parent', x: 10, y: 10 }); // Page 0
            store.addWidget({ id: 'child', parentId: 'parent', x: 20, y: 20 }); // Page 0
            store.addPage(); // index 1

            store.moveWidgetToPage('parent', 1);

            expect(store.pages[0].widgets.length).toBe(0);
            expect(store.pages[1].widgets.length).toBe(2);
            expect(store.pages[1].widgets.find(w => w.id === 'child')).toBeDefined();
        });

        it('should update coordinates when moving with delta', () => {
            store.addWidget({ id: 'w1', x: 10, y: 10 }); // Page 0
            store.addPage(); // Page 1

            store.moveWidgetToPage('w1', 1, 100, 100);

            const w = store.getWidgetById('w1');
            expect(w.x).toBe(100);
            expect(w.y).toBe(100);
        });

        it('should resolve a child move to its root group and clamp to canvas bounds', () => {
            store.addWidget({ id: 'parent', type: 'group', x: 380, y: 280, width: 40, height: 40, props: {} });
            store.addWidget({ id: 'child', type: 'text', parentId: 'parent', x: 390, y: 290, width: 10, height: 10, props: {} });
            store.addPage();

            const moved = store.moveWidgetToPage('child', 1, 390, 290);
            const parent = store.pages[1].widgets.find((widget) => widget.id === 'parent');
            const child = store.pages[1].widgets.find((widget) => widget.id === 'child');

            expect(moved).toBe(true);
            expect(store.pages[0].widgets).toHaveLength(0);
            expect(parent?.x).toBe(360);
            expect(parent?.y).toBe(260);
            expect(child?.x).toBe(370);
            expect(child?.y).toBe(270);
        });

        it('returns false when moving to an invalid page index', () => {
            store.addWidget({ id: 'w1', x: 10, y: 10 });
            events.emit.mockClear();

            expect(store.moveWidgetToPage('w1', 99)).toBe(false);
            expect(events.emit).not.toHaveBeenCalled();
        });
    });

    describe('Clear Page', () => {
        it('should clear all widgets when preserveLocked is false', () => {
            store.addWidget({ id: 'w1', locked: true });
            store.addWidget({ id: 'w2', locked: false });

            store.clearCurrentPage(false);
            expect(store.pages[0].widgets.length).toBe(0);
        });

        it('should preserve locked widgets when preserveLocked is true', () => {
            store.addWidget({ id: 'w1', locked: true });
            store.addWidget({ id: 'w2', locked: false });

            store.clearCurrentPage(true);
            expect(store.pages[0].widgets.length).toBe(1);
            expect(store.pages[0].widgets[0].id).toBe('w1');
        });

        it('should return deleted and preserved counts when clearing a page', () => {
            store.addWidget({ id: 'w1', locked: true });
            store.addWidget({ id: 'w2', locked: false });

            const result = store.clearCurrentPage(true);

            expect(result).toEqual({ deleted: 1, preserved: 1 });
        });

        it('returns zero counts when no page can be resolved', () => {
            store.getCurrentPage = vi.fn(() => null);

            expect(store.clearCurrentPage()).toEqual({ deleted: 0, preserved: 0 });
            expect(events.emit).not.toHaveBeenCalled();
        });
    });

    describe('Payload Round-trip', () => {
        it('should maintain payload consistency', () => {
            store.setDeviceSettings('My-Device', 'esp32_s3');
            store.addPage();
            store.addWidget({ id: 'w-trip', type: 'text' });

            const payload = store.getPagesPayload();
            expect(payload.deviceName).toBe('My-Device');
            expect(payload.pages.length).toBe(2);
            expect(payload.pages[1].widgets[0].id).toBe('w-trip');

            // New store instance should be able to load this
            const store2 = new ProjectStore();
            store2.setPages(payload.pages);
            expect(store2.pages.length).toBe(2);
            expect(store2.getWidgetById('w-trip')).toBeDefined();
        });

        it('should derive canvas dimensions and shape from custom hardware when profile metadata is unavailable', () => {
            const originalCustomProfile = DEVICE_PROFILES.custom;
            delete DEVICE_PROFILES.custom;

            try {
                store.state.customHardware = { resWidth: 600, resHeight: 448, shape: 'round' };
                store.setDeviceSettings('My-Device', 'custom');

                expect(store.getCanvasDimensions(ORIENTATIONS.PORTRAIT)).toEqual({ width: 448, height: 600 });
                expect(store.getCanvasShape()).toBe('round');
            } finally {
                DEVICE_PROFILES.custom = originalCustomProfile;
            }
        });

        it('uses the default landscape orientation when no orientation is provided', () => {
            expect(store.getCanvasDimensions()).toEqual({ width: 400, height: 300 });
        });

        it('prefers a profile-defined canvas shape when available', () => {
            const originalShape = DEVICE_PROFILES.reterminal_e1001.shape;
            DEVICE_PROFILES.reterminal_e1001.shape = 'round';

            try {
                expect(store.getCanvasShape()).toBe('round');
            } finally {
                if (originalShape === undefined) {
                    delete DEVICE_PROFILES.reterminal_e1001.shape;
                } else {
                    DEVICE_PROFILES.reterminal_e1001.shape = originalShape;
                }
            }
        });

        it('falls back to a rectangular canvas shape when no profile shape is available', () => {
            const originalCustomProfile = DEVICE_PROFILES.custom;
            delete DEVICE_PROFILES.custom;

            try {
                store.state.customHardware = {};
                store.setDeviceSettings('My-Device', 'custom');

                expect(store.getCanvasShape()).toBe('rect');
            } finally {
                DEVICE_PROFILES.custom = originalCustomProfile;
            }
        });
    });
});
