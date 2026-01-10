/**
 * UI-linked logic for the ESPHome YAML snippet box.
 * This file handles highlighting and UI interactions, while YAML generation
 * has been migrated to ESPHomeAdapter.js and the plugin system.
 */

import { Logger } from '../utils/logger.js';

// Global variables for snippet highlighting
// Keeping them module-scoped since they are internal state for the highlighter
let lastHighlightRange = null;
let isAutoHighlight = false;

// EXPOSE TO WINDOW for keyboard.js compatibility
// This handles the "smart delete/copy" when snippet box is focused
Object.defineProperty(window, 'lastHighlightRange', {
    get: () => lastHighlightRange,
    set: (val) => { lastHighlightRange = val; },
    configurable: true
});
Object.defineProperty(window, 'isAutoHighlight', {
    get: () => isAutoHighlight,
    set: (val) => { isAutoHighlight = val; },
    configurable: true
});

/**
 * Highlights a widget's YAML block in the snippet editor.
 * @param {string} widgetId 
 */
export function highlightWidgetInSnippet(widgetId) {
    const box = document.getElementById("snippetBox");
    if (!box) return;

    const yaml = box.value;
    if (!yaml) return;

    // Search for the widget ID in the metadata comments
    // Support both legacy (# widget:) and new (// widget:) formats
    const targetStr = `id:${widgetId}`;
    const index = yaml.indexOf(targetStr);

    if (index !== -1) {
        // Find the start of the line containing the ID
        const lineStart = yaml.lastIndexOf('\n', index) + 1;

        // Find the next widget or page marker to determine block end
        const nextMarkers = ["# widget:", "// widget:", "// page:"];
        let nextMarkerIndex = -1;

        nextMarkers.forEach(m => {
            const idx = yaml.indexOf(m, index + targetStr.length);
            if (idx !== -1 && (nextMarkerIndex === -1 || idx < nextMarkerIndex)) {
                nextMarkerIndex = idx;
            }
        });

        let blockEnd = nextMarkerIndex !== -1 ? nextMarkerIndex : yaml.length;

        // Check if user is typing in a property field
        const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : "";
        const isTyping = (activeTag === "input" || activeTag === "textarea") && document.activeElement !== box;

        // Only steal focus if NOT typing in properties AND not interacting with canvas
        const isInteracting = window.Canvas && (window.Canvas.dragState || window.Canvas.lassoState);

        // Only modify focus/selection if we rely on auto-highlight (not typing/interacting)
        if (!isTyping && !isInteracting) {
            isAutoHighlight = true;
            box.focus();

            // Apply selection using legacy backward direction for focus management
            try {
                box.setSelectionRange(lineStart, blockEnd, "backward");
            } catch (e) {
                // Fallback
                box.setSelectionRange(lineStart, blockEnd);
            }
        }

        lastHighlightRange = { start: lineStart, end: blockEnd };

        // Scroll to selection
        setTimeout(() => {
            if (box.scrollTo) {
                const lines = yaml.substring(0, lineStart).split('\n');
                const totalLines = yaml.split('\n').length;
                const lineNum = lines.length;

                // Calculate dynamic line height based on actual rendered height
                // This works for ANY font size (online or offline)
                const lineHeight = box.scrollHeight / totalLines;

                // Scroll to center the line
                // box.scrollTop = (lineNum * lineHeight) - (box.clientHeight / 3);

                // Since user requested "focus on selected yaml" (start of block):
                // Align to top third for visibility
                box.scrollTop = (lineNum * lineHeight) - 50;
                box.scrollLeft = 0;
            }
        }, 10);
    }
}

// Add listeners to reset auto-highlight when user interacts with the box
document.addEventListener("DOMContentLoaded", () => {
    const box = document.getElementById("snippetBox");
    if (box) {
        const resetHighlight = () => {
            isAutoHighlight = false;
        };
        box.addEventListener("mousedown", resetHighlight);
        box.addEventListener("input", resetHighlight);
        box.addEventListener("keydown", (e) => {
            if (!e.ctrlKey && !e.metaKey) {
                isAutoHighlight = false;
            }
        });
    }
});

Logger.log("[YAML Export] Minimal snippet UI logic loaded.");
