import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProjectStore } from '../../js/core/stores/project_store.js';
import * as events from '../../js/core/events.js';

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

        it('should reorder widgets within a page', () => {
            store.addWidget({ id: 'w1' });
            store.addWidget({ id: 'w2' });
            store.reorderWidget(0, 0, 1);

            expect(store.pages[0].widgets[0].id).toBe('w2');
            expect(store.pages[0].widgets[1].id).toBe('w1');
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
    });
});
