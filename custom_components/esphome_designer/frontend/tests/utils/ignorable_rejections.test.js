/**
 * @vitest-environment jsdom
 */
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { installIgnorableRejectionHandler, isIgnorableWindowRejection } from '../../js/utils/ignorable_rejections.js';

describe('ignorable rejection handling', () => {
    beforeEach(() => {
        document.body.innerHTML = '';
    });

    it('recognizes benign Home Assistant and extension noise', () => {
        expect(isIgnorableWindowRejection(new DOMException('Transition was skipped', 'AbortError'))).toBe(true);
        expect(isIgnorableWindowRejection(new DOMException('Transition was aborted because of invalid state', 'InvalidStateError'))).toBe(true);
        expect(
            isIgnorableWindowRejection({
                error: new DOMException('Transition was skipped', 'AbortError'),
            })
        ).toBe(true);
        expect(
            isIgnorableWindowRejection({
                reason: {
                    message: 'Transition was aborted because of invalid state',
                    name: 'InvalidStateError',
                }
            })
        ).toBe(true);
        expect(
            isIgnorableWindowRejection(
                new Error('A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received')
            )
        ).toBe(true);
        expect(isIgnorableWindowRejection(new Error('actual failure'))).toBe(false);
    });

    it('prevents default for ignorable unhandled rejections', () => {
        installIgnorableRejectionHandler(window);

        const event = new Event('unhandledrejection', { cancelable: true });
        const stopImmediatePropagation = vi.fn();
        Object.defineProperty(event, 'reason', {
            configurable: true,
            value: new Error('A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received'),
        });
        Object.defineProperty(event, 'stopImmediatePropagation', {
            configurable: true,
            value: stopImmediatePropagation,
        });

        window.dispatchEvent(event);

        expect(event.defaultPrevented).toBe(true);
        expect(stopImmediatePropagation).toHaveBeenCalledTimes(1);
    });

    it('prevents default for ignorable window error events too', () => {
        installIgnorableRejectionHandler(window);

        const event = new Event('error', { cancelable: true });
        const stopImmediatePropagation = vi.fn();
        Object.defineProperty(event, 'message', {
            configurable: true,
            value: 'InvalidStateError: Transition was aborted because of invalid state',
        });
        Object.defineProperty(event, 'stopImmediatePropagation', {
            configurable: true,
            value: stopImmediatePropagation,
        });

        window.dispatchEvent(event);

        expect(event.defaultPrevented).toBe(true);
        expect(stopImmediatePropagation).toHaveBeenCalledTimes(1);
    });
});
