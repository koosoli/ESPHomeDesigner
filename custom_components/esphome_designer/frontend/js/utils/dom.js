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
    let container = document.getElementById("toast-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        // @ts-ignore
        container.style.position = "fixed";
        // @ts-ignore
        container.style.bottom = "20px";
        // @ts-ignore
        container.style.right = "20px";
        // @ts-ignore
        container.style.zIndex = "9999";
        document.body.appendChild(container);
    }

    const toast = document.createElement("div");
    toast.className = "toast";

    // Check if type is error and style accordingly if needed
    if (type === 'error') {
        // @ts-ignore
        toast.style.background = "rgba(255, 0, 0, 0.8)";
    } else if (type === 'success') {
        // @ts-ignore
        toast.style.background = "rgba(0, 128, 0, 0.8)";
    } else {
        // @ts-ignore
        toast.style.background = "rgba(0,0,0,0.8)";
    }

    toast.textContent = message;
    // @ts-ignore
    toast.style.color = "white";
    // @ts-ignore
    toast.style.padding = "10px 20px";
    // @ts-ignore
    toast.style.borderRadius = "4px";
    // @ts-ignore
    toast.style.marginTop = "10px";
    // @ts-ignore
    toast.style.opacity = "0";
    // @ts-ignore
    toast.style.transition = "opacity 0.3s";

    container.appendChild(toast);

    requestAnimationFrame(() => {
        // @ts-ignore
        toast.style.opacity = "1";
    });

    setTimeout(() => {
        // @ts-ignore
        toast.style.opacity = "0";
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, duration);
}
