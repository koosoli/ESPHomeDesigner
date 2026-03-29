const IGNORABLE_REJECTION_MESSAGES = Object.freeze([
    'Transition was skipped',
    'Transition was aborted because of invalid state',
    'A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received',
]);

let handlerInstalled = false;

/**
 * @param {unknown} reason
 * @returns {string}
 */
function getRejectionMessage(reason) {
    if (reason && typeof reason === 'object' && 'message' in reason && typeof reason.message === 'string') {
        return reason.message;
    }

    return String(reason);
}

/**
 * @param {unknown} reason
 * @returns {boolean}
 */
export function isIgnorableWindowRejection(reason) {
    if (!reason) {
        return false;
    }

    const message = getRejectionMessage(reason);
    return IGNORABLE_REJECTION_MESSAGES.some((candidate) => message.includes(candidate));
}

/**
 * @param {Window | typeof globalThis | null | undefined} [target]
 * @returns {boolean}
 */
export function installIgnorableRejectionHandler(target = globalThis) {
    if (handlerInstalled || !target || typeof target.addEventListener !== 'function') {
        return false;
    }

    target.addEventListener('unhandledrejection', (event) => {
        if (isIgnorableWindowRejection(event.reason)) {
            event.preventDefault();
            event.stopImmediatePropagation?.();
        }
    }, { capture: true });

    handlerInstalled = true;
    return true;
}
