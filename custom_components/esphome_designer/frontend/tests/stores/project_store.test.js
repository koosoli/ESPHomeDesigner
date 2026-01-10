import { describe, it, expect, beforeEach, vi } from 'vitest';
import { ProjectStore } from '../../js/core/stores/project_store.js';

describe('ProjectStore', () => {
    let store;

    beforeEach(() => {
        store = new ProjectStore();
    });

    describe('Initialization', () => {
        it('should initialize with a default overview page', () => {
            expect(store.pages.length).toBe(1);
            expect(store.pages[0].name).toBe('Overview');
        });
    });

    describe('Page Management', () => {
        it('should change current page index correctly', () => {
            store.setPages([
                { id: 'p0', name: 'Page 0', widgets: [] },
                { id: 'p1', name: 'Page 1', widgets: [] }
            ]);
            store.setCurrentPageIndex(1);
            expect(store.currentPageIndex).toBe(1);
            expect(store.getCurrentPage().id).toBe('p1');
        });

        it('should not change to out-of-bounds index', () => {
            store.setCurrentPageIndex(5);
            expect(store.currentPageIndex).toBe(0);
        });
    });

    describe('Widget Operations', () => {
        it('should add a widget and index it', () => {
            const widget = { id: 'w1', type: 'text' };
            store.addWidget(widget);
            expect(store.pages[0].widgets).toContain(widget);
            expect(store.getWidgetById('w1')).toBe(widget);
        });

        it('should update a widget', () => {
            const widget = { id: 'w1', type: 'text', x: 0 };
            store.addWidget(widget);
            store.updateWidget('w1', { x: 10 });
            expect(store.getWidgetById('w1').x).toBe(10);
        });

        it('should delete specified widgets', () => {
            store.addWidget({ id: 'w1', type: 'text' });
            store.addWidget({ id: 'w2', type: 'icon' });
            store.deleteWidgets(['w1']);
            expect(store.pages[0].widgets.length).toBe(1);
            expect(store.getWidgetById('w1')).toBeUndefined();
            expect(store.getWidgetById('w2')).toBeDefined();
        });

        it('should clear the current page', () => {
            store.addWidget({ id: 'w1', type: 'text' });
            store.addWidget({ id: 'w2', type: 'icon', locked: true });

            const result = store.clearCurrentPage(true); // Preserve locked
            expect(result.deleted).toBe(1);
            expect(result.preserved).toBe(1);
            expect(store.pages[0].widgets.length).toBe(1);
            expect(store.getWidgetById('w1')).toBeUndefined();
            expect(store.getWidgetById('w2')).toBeDefined();

            store.clearCurrentPage(false); // don't preserve
            expect(store.pages[0].widgets.length).toBe(0);
            expect(store.getWidgetById('w2')).toBeUndefined();
        });
    });

    describe('Device Settings', () => {
        it('should update device settings and window global', () => {
            store.setDeviceSettings('My Home', 'reterminal_e1002');
            expect(store.deviceName).toBe('My Home');
            expect(store.deviceModel).toBe('reterminal_e1002');
            expect(window.currentDeviceModel).toBe('reterminal_e1002');
        });
    });
});
