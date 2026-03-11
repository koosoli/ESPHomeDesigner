import { describe, it, expect, vi } from 'vitest';
import { emit, on, off, EVENTS, EventBus } from '../../js/core/events.js';

describe('EventBus', () => {

    it('should emit and receive events via on()', () => {
        const callback = vi.fn();
        on(EVENTS.STATE_CHANGED, callback);

        emit(EVENTS.STATE_CHANGED, { test: true });

        expect(callback).toHaveBeenCalledTimes(1);
        expect(callback).toHaveBeenCalledWith({ test: true });
    });

    it('should dispatch a CustomEvent with detail on emit()', () => {
        const spy = vi.spyOn(EventBus, 'dispatchEvent');
        emit('direct_test', { foo: 'bar' });

        expect(spy).toHaveBeenCalled();
        const event = /** @type {CustomEvent} */ (spy.mock.calls[0][0]);
        expect(event).toBeInstanceOf(CustomEvent);
        expect(event.type).toBe('direct_test');
        expect(event.detail).toEqual({ foo: 'bar' });
        spy.mockRestore();
    });

    it('should propagate complex objects in detail', () => {
        const complexData = { id: 123, list: [1, 2, 3], nested: { a: 'b' } };
        const callback = vi.fn();
        on('complex_event', callback);

        emit('complex_event', complexData);

        expect(callback).toHaveBeenCalledWith(complexData);
    });

    it('should emit with default empty detail when none provided', () => {
        const spy = vi.spyOn(EventBus, 'dispatchEvent');
        emit('empty_detail');

        const event = /** @type {CustomEvent} */ (spy.mock.calls[0][0]);
        expect(event.detail).toEqual({});
        spy.mockRestore();
    });

    it('should remove direct addEventListener listeners with off()', () => {
        // on() wraps the callback, so off() only works with raw addEventListener refs
        const callback = vi.fn();
        EventBus.addEventListener('raw_test', callback);

        EventBus.dispatchEvent(new CustomEvent('raw_test'));
        expect(callback).toHaveBeenCalledTimes(1);

        off('raw_test', callback);
        EventBus.dispatchEvent(new CustomEvent('raw_test'));
        expect(callback).toHaveBeenCalledTimes(1); // Unchanged
    });

    it('EVENTS object should contain all expected event names', () => {
        expect(EVENTS.STATE_CHANGED).toBe('state-changed');
        expect(EVENTS.SELECTION_CHANGED).toBe('selection-changed');
        expect(EVENTS.PAGE_CHANGED).toBe('page-changed');
        expect(EVENTS.HISTORY_CHANGED).toBe('history-changed');
        expect(EVENTS.SETTINGS_CHANGED).toBe('settings-changed');
        expect(EVENTS.LAYOUT_IMPORTED).toBe('layout-imported');
        expect(EVENTS.ENTITIES_LOADED).toBe('entities-loaded');
        expect(EVENTS.ZOOM_CHANGED).toBe('zoom-changed');
    });

    it('EventBus should be an EventTarget instance', () => {
        expect(EventBus).toBeInstanceOf(EventTarget);
    });
});
