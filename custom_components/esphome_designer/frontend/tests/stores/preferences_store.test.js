import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PreferencesStore } from '../../js/core/stores/preferences_store.js';

describe('PreferencesStore', () => {
    let store;

    beforeEach(() => {
        store = new PreferencesStore();
    });

    it('should initialize with default states', () => {
        expect(store.snapEnabled).toBe(true);
        expect(store.showGrid).toBe(true);
    });

    it('should update multiple settings at once', () => {
        store.update({ snapEnabled: false, gridOpacity: 5 });
        expect(store.snapEnabled).toBe(false);
        expect(store.gridOpacity).toBe(5);
    });

    it('should set snap and grid individually', () => {
        store.setSnapEnabled(false);
        expect(store.snapEnabled).toBe(false);
        store.setShowGrid(false);
        expect(store.showGrid).toBe(false);
    });
});
