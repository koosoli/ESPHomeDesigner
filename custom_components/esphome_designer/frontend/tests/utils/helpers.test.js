import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const originalCrypto = globalThis.crypto;

describe('helpers', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.resetModules();
    });

    afterEach(() => {
        vi.useRealTimers();
        if (originalCrypto === undefined) {
            delete globalThis.crypto;
            delete window.crypto;
        } else {
            Object.defineProperty(globalThis, 'crypto', { configurable: true, value: originalCrypto });
            Object.defineProperty(window, 'crypto', { configurable: true, value: originalCrypto });
        }
    });

    it('generates ids, debounces calls, clones data, and resolves nested values', async () => {
        const helpers = await import('../../js/utils/helpers.js');

        const idA = helpers.generateId();
        const idB = helpers.generateId();
        expect(idA).toMatch(/^w_/);
        expect(idB).toMatch(/^w_/);
        expect(idA).not.toBe(idB);

        const fn = vi.fn();
        const debounced = helpers.debounce(fn, 50);
        debounced('first');
        debounced('second');
        vi.advanceTimersByTime(49);
        expect(fn).not.toHaveBeenCalled();
        vi.advanceTimersByTime(1);
        expect(fn).toHaveBeenCalledWith('second');

        const source = { nested: { value: 1 } };
        const cloned = helpers.deepClone(source);
        expect(cloned).toEqual(source);
        expect(cloned).not.toBe(source);
        expect(helpers.deepClone(undefined)).toBeUndefined();

        expect(helpers.getNestedValue({ entries: { days: [{ day: 'Mon' }] } }, 'entries.days[0].day')).toBe('Mon');
        expect(helpers.getNestedValue({ a: null }, 'a.b')).toBeUndefined();
        expect(helpers.getNestedValue(null, 'a.b')).toBeUndefined();
    });

    it('polyfills crypto.randomUUID when crypto exists without that method', async () => {
        const fakeCrypto = {
            getRandomValues: (arr) => {
                arr[0] = 123;
                return arr;
            }
        };
        Object.defineProperty(globalThis, 'crypto', { configurable: true, value: fakeCrypto });
        Object.defineProperty(window, 'crypto', { configurable: true, value: fakeCrypto });

        await import('../../js/utils/helpers.js');

        expect(typeof crypto.randomUUID).toBe('function');
        expect(crypto.randomUUID()).toMatch(/^[0-9a-f-]{36}$/);
    });

    it('creates a fallback window.crypto when crypto is unavailable', async () => {
        delete globalThis.crypto;
        delete window.crypto;

        await import('../../js/utils/helpers.js');

        expect(typeof window.crypto.randomUUID).toBe('function');
        expect(window.crypto.randomUUID()).toMatch(/^[0-9a-f-]{36}$/);
        expect(Array.from(window.crypto.getRandomValues([0, 0, 0]))).toHaveLength(3);
    });
});
