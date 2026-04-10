const IGNORABLE_REJECTION_MESSAGES = Object.freeze([
    'Transition was skipped',
    'Transition was aborted because of invalid state',
    'A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received',
]);

const NESTED_REASON_KEYS = Object.freeze(['reason', 'error', 'detail', 'cause']);
const installedTargets = new WeakSet();

/**
 * @param {unknown} reason
 * @param {Set<string>} messages
 * @param {number} depth
 * @returns {Set<string>}
 */
function collectRejectionMessages(reason, messages = new Set(), depth = 0) {
    if (reason == null || depth > 2) {
        return messages;
    }

    if (typeof reason === 'string') {
        const value = reason.trim();
        if (value) {
            messages.add(value);
        }
        return messages;
    }

    if (typeof reason !== 'object') {
        const value = String(reason).trim();
        if (value) {
            messages.add(value);
        }
        return messages;
    }

    if ('message' in reason && typeof reason.message === 'string' && reason.message.trim()) {
        messages.add(reason.message.trim());
    }

    if ('name' in reason && typeof reason.name === 'string' && reason.name.trim()) {
        messages.add(reason.name.trim());
        if ('message' in reason && typeof reason.message === 'string' && reason.message.trim()) {
            messages.add(`${reason.name.trim()}: ${reason.message.trim()}`);
        }
    }

    if ('stack' in reason && typeof reason.stack === 'string' && reason.stack.trim()) {
        messages.add(reason.stack.trim());
    }

    try {
        const rendered = String(reason).trim();
        if (rendered && rendered !== '[object Object]') {
            messages.add(rendered);
        }
    } catch {
        // Ignore String(...) failures from exotic host objects.
    }

    const reasonRecord = /** @type {Record<string, unknown>} */ (reason);
    NESTED_REASON_KEYS.forEach((key) => {
        if (key in reason) {
            collectRejectionMessages(reasonRecord[key], messages, depth + 1);
        }
    });

    return messages;
}

/**
 * @param {unknown} reason
 * @returns {boolean}
 */
function hasIgnorableMessage(reason) {
    const messages = collectRejectionMessages(reason);
    for (const message of messages) {
        if (IGNORABLE_REJECTION_MESSAGES.some((candidate) => message.includes(candidate))) {
            return true;
        }
    }
    return false;
}

/**
 * @param {Window | typeof globalThis | null | undefined} target
 * @returns {Array<Window | typeof globalThis>}
 */
function getInstallTargets(target) {
    if (!target || typeof target.addEventListener !== 'function') {
        return [];
    }

    const targets = [target];
    try {
        const parentTarget = target.parent;
        if (parentTarget && parentTarget !== target && typeof parentTarget.addEventListener === 'function') {
            targets.push(parentTarget);
        }
    } catch {
        // Cross-origin parent access is not available in some runtimes.
    }

    try {
        const topTarget = target.top;
        if (topTarget && !targets.includes(topTarget) && typeof topTarget.addEventListener === 'function') {
            targets.push(topTarget);
        }
    } catch {
        // Cross-origin top access is not available in some runtimes.
    }

    return targets;
}

/**
 * @param {unknown} reason
 * @returns {boolean}
 */
export function isIgnorableWindowRejection(reason) {
    if (!reason) {
        return false;
    }

    return hasIgnorableMessage(reason);
}

/**
 * @param {Window | typeof globalThis | null | undefined} [target]
 * @returns {boolean}
 */
export function installIgnorableRejectionHandler(target = globalThis) {
    let installedAny = false;
    getInstallTargets(target).forEach((installTarget) => {
        if (installedTargets.has(installTarget)) {
            return;
        }

        installTarget.addEventListener('unhandledrejection', (event) => {
            if (isIgnorableWindowRejection(event.reason)) {
                event.preventDefault();
                event.stopImmediatePropagation?.();
            }
        }, { capture: true });

        installTarget.addEventListener('error', (event) => {
            if (hasIgnorableMessage(event.error) || hasIgnorableMessage(event.message)) {
                event.preventDefault();
                event.stopImmediatePropagation?.();
            }
        }, { capture: true });

        installedTargets.add(installTarget);
        installedAny = true;
    });

    return installedAny;
}
