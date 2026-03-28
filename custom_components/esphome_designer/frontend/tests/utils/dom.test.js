import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { setImportError, showToast } from '../../js/utils/dom.js';

describe('dom helpers', () => {
    beforeEach(() => {
        document.body.innerHTML = '<div id="importSnippetError"></div>';
        vi.useFakeTimers();
        vi.stubGlobal('requestAnimationFrame', (callback) => {
            callback();
            return 1;
        });
    });

    afterEach(() => {
        vi.useRealTimers();
        vi.unstubAllGlobals();
    });

    it('updates and clears the import error message when the target exists', () => {
        const errorBox = /** @type {HTMLDivElement} */ (document.getElementById('importSnippetError'));

        setImportError('Parse failed');
        expect(errorBox.textContent).toBe('Parse failed');

        setImportError('');
        expect(errorBox.textContent).toBe('');

        document.body.innerHTML = '';
        expect(() => setImportError('ignored')).not.toThrow();
    });

    it('creates toast containers, applies type-specific styling, and removes expired toasts', () => {
        showToast('Saved', 'success', 100);

        const container = /** @type {HTMLDivElement} */ (document.getElementById('toast-container'));
        const toast = /** @type {HTMLDivElement} */ (container.firstElementChild);

        expect(container).not.toBeNull();
        expect(toast.textContent).toBe('Saved');
        expect(toast.style.background).toBe('rgba(0, 128, 0, 0.8)');
        expect(toast.style.opacity).toBe('1');

        showToast('Problem', 'error', 100);
        expect(container.children).toHaveLength(2);
        expect((/** @type {HTMLDivElement} */ (container.lastElementChild)).style.background).toBe('rgba(255, 0, 0, 0.8)');

        vi.advanceTimersByTime(100);
        expect(toast.style.opacity).toBe('0');

        vi.advanceTimersByTime(300);
        expect(container.children).toHaveLength(0);
    });
});
