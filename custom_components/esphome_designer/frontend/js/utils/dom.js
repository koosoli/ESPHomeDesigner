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
 * @param {number} duration - Duration in ms.
 */
export function showToast(message, type = "info", duration = 3000) {
    let container = document.getElementById("toast-container");
    if (!container) {
        container = document.createElement("div");
        container.id = "toast-container";
        container.style.position = "fixed";
        container.style.bottom = "20px";
        container.style.right = "20px";
        container.style.zIndex = "9999";
        document.body.appendChild(container); // Append to body, not container if container is undefined
    }

    const toast = document.createElement("div");
    toast.className = "toast";
    // Check if type is error and style accordingly if needed, for now keeping simple
    if (type === 'error') {
        toast.style.background = "rgba(255, 0, 0, 0.8)";
    } else if (type === 'success') {
        toast.style.background = "rgba(0, 128, 0, 0.8)";
    } else {
        toast.style.background = "rgba(0,0,0,0.8)";
    }

    toast.textContent = message;
    toast.style.color = "white";
    toast.style.padding = "10px 20px";
    toast.style.borderRadius = "4px";
    toast.style.marginTop = "10px";
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s";

    container.appendChild(toast);

    requestAnimationFrame(() => {
        toast.style.opacity = "1";
    });

    setTimeout(() => {
        toast.style.opacity = "0";
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, duration);
}

// Global exposure for transition - Removed
