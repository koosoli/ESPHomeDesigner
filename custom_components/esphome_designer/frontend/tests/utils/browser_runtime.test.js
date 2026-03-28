import { describe, expect, it } from 'vitest';

import {
    addBrowserEventListener,
    dispatchBrowserEvent,
    getBrowserComputedStyle,
    getBrowserDevicePixelRatio,
    getBrowserRuntime,
    getViewportScrollPosition,
    isSecureBrowserContext,
    removeBrowserEventListener
} from '../../js/utils/browser_runtime.js';

describe('browser_runtime', () => {
    it('returns the current browser runtime and exposes viewport helpers', () => {
        Object.defineProperty(globalThis, 'scrollX', { configurable: true, value: 14 });
        Object.defineProperty(globalThis, 'scrollY', { configurable: true, value: 28 });
        Object.defineProperty(globalThis, 'devicePixelRatio', { configurable: true, value: 2 });
        Object.defineProperty(globalThis, 'isSecureContext', { configurable: true, value: true });

        const runtime = getBrowserRuntime();
        expect(runtime).toBe(globalThis);
        expect(getViewportScrollPosition()).toEqual({ x: 14, y: 28 });
        expect(getBrowserDevicePixelRatio()).toBe(2);
        expect(isSecureBrowserContext()).toBe(true);
    });

    it('adds, dispatches, and removes browser events safely', () => {
        let count = 0;
        const onEvent = () => {
            count += 1;
        };

        expect(addBrowserEventListener('codex-browser-runtime', onEvent)).toBe(true);
        expect(dispatchBrowserEvent(new Event('codex-browser-runtime'))).toBe(true);
        expect(count).toBe(1);

        expect(removeBrowserEventListener('codex-browser-runtime', onEvent)).toBe(true);
        expect(dispatchBrowserEvent(new Event('codex-browser-runtime'))).toBe(true);
        expect(count).toBe(1);
    });

    it('returns computed styles when a browser runtime is available', () => {
        const element = document.createElement('div');
        element.style.color = 'rgb(255, 0, 0)';
        document.body.appendChild(element);

        const style = getBrowserComputedStyle(element);

        expect(style?.color).toBe('rgb(255, 0, 0)');
    });
});
