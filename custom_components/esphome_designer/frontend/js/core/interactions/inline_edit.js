import { AppState } from '../state';
import { getViewportScrollPosition } from '../../utils/browser_runtime.js';

/**
 * @param {any} canvasInstance
 * @param {string} widgetId
 */
export function startInlineEdit(canvasInstance, widgetId) {
    const widget = AppState.getWidgetById(widgetId);
    if (!widget) return;

    // Only allow inline editing for text-based widgets
    const type = (widget.type || "").toLowerCase();
    if (type !== "text" && type !== "label") return;

    // Find widget element again for fresh rect
    const widgetEl = /** @type {HTMLElement} */ (canvasInstance.canvas.querySelector(`.widget[data-id="${widgetId}"]`));
    if (!widgetEl) return;

    const zoom = AppState.zoomLevel;
    const rect = widgetEl.getBoundingClientRect();
    const scroll = getViewportScrollPosition();

    // Create overlay textarea
    const textarea = document.createElement("textarea");
    textarea.value = widget.props.text || widget.title || "";

    // Style it to match the widget
    textarea.style.position = "absolute";
    // Append to body to ensure it's on top of everything
    textarea.style.left = (rect.left + scroll.x) + "px";
    textarea.style.top = (rect.top + scroll.y) + "px";
    textarea.style.width = Math.max(50, rect.width) + "px";
    textarea.style.height = Math.max(30, rect.height) + "px";
    textarea.style.zIndex = "99999";

    // Font styles
    const props = widget.props || {};
    const fontSize = (props.font_size || 20) * zoom;
    textarea.style.fontSize = fontSize + "px";
    textarea.style.fontFamily = (props.font_family || "Roboto") + ", sans-serif";
    textarea.style.fontWeight = props.font_weight || 400;
    textarea.style.fontStyle = props.italic ? "italic" : "normal";
    textarea.style.textAlign = (props.text_align || "LEFT").split("_").pop().toLowerCase();
    textarea.style.color = props.color || "black";

    // Reset styles
    textarea.style.background = "rgba(255, 255, 255, 0.9)";
    textarea.style.border = "1px solid #1a73e8";
    textarea.style.padding = "0px";
    textarea.style.resize = "both";
    textarea.style.outline = "none";
    textarea.style.overflow = "hidden";
    textarea.style.lineHeight = "1.2"; // Approximate default

    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();

    const finishEdit = () => {
        if (!textarea.isConnected && !textarea.parentElement) return;

        // Cleanup listeners to prevent re-entry (e.g. remove() triggering blur)
        textarea.removeEventListener("blur", onBlur);
        textarea.removeEventListener("keydown", onKeyDown);

        const newText = textarea.value;
        if (newText !== (widget.props.text || widget.title)) {
            AppState.updateWidget(widgetId, {
                props: { ...widget.props, text: newText }
            });
        }

        textarea.remove();
    };

    function onBlur() { finishEdit(); }
    /** @param {KeyboardEvent} e */
    function onKeyDown(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            finishEdit();
        }
        if (e.key === "Escape") {
            textarea.remove(); // Cancel
        }
        // Auto-resize height
        textarea.style.height = textarea.scrollHeight + "px";
    }

    textarea.addEventListener("blur", onBlur);
    textarea.addEventListener("keydown", onKeyDown);
}
