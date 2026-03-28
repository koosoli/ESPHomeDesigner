import { appendToDesignerOverlayRoot } from './runtime_root.js';

/**
 * Sets the error message in the import snippet modal.
 * @param {string} message - The error message.
 */
export function setImportError(message) {
    const importSnippetError = document.getElementById("importSnippetError");
    if (importSnippetError) {
        importSnippetError.textContent = message || "";
    }
}

/**
 * Shows a toast notification.
 * @param {string} message - The message to display.
 * @param {string} type - Optional type like "error", "success".
 * @param {number} [duration=3000] - Duration in ms.
 */
export function showToast(message, type = "info", duration = 3000) {
    /** @type {HTMLDivElement | null} */
    let container = /** @type {HTMLDivElement | null} */ (document.getElementById("toast-container"));
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        container.style.position = "fixed";
        container.style.bottom = "20px";
        container.style.right = "20px";
        container.style.zIndex = "9999";
        appendToDesignerOverlayRoot(container);
    }

    /** @type {HTMLDivElement} */
    const toast = document.createElement("div");
    toast.className = "toast";
    const style = toast.style;

    // Check if type is error and style accordingly if needed
    if (type === 'error') {
        style.background = "rgba(255, 0, 0, 0.8)";
    } else if (type === 'success') {
        style.background = "rgba(0, 128, 0, 0.8)";
    } else {
        style.background = "rgba(0,0,0,0.8)";
    }

    toast.textContent = message;
    style.color = "white";
    style.padding = "10px 20px";
    style.borderRadius = "4px";
    style.marginTop = "10px";
    style.opacity = "0";
    style.transition = "opacity 0.3s";

    container.appendChild(toast);

    requestAnimationFrame(() => {
        style.opacity = "1";
    });

    setTimeout(() => {
        style.opacity = "0";
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, duration);
}
