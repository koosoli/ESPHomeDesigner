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
    set: function (val) { lastHighlightRange = val; },
    configurable: true
});
Object.defineProperty(window, 'isAutoHighlight', {
    get: () => isAutoHighlight,
    set: function (val) { isAutoHighlight = val; },
    configurable: true
});

/**
 * Highlights a widget's YAML block in the snippet editor.
 * @param {string} widgetId 
 */
export function highlightWidgetInSnippet(widgetIds) {
    const box = document.getElementById("snippetBox");
    if (!box) return;

    const yaml = box.value;
    if (!yaml) return;

    // Normalize input to array
    const ids = Array.isArray(widgetIds) ? widgetIds : [widgetIds];
    if (ids.length === 0) return;

    let minStart = -1;
    let maxEnd = -1;

    ids.forEach(id => {
        // Search for the widget ID in the metadata comments
        const targetStr = `id:${id}`;
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

            const blockEnd = nextMarkerIndex !== -1 ? nextMarkerIndex : yaml.length;

            if (minStart === -1 || lineStart < minStart) minStart = lineStart;
            if (blockEnd > maxEnd) maxEnd = blockEnd;
        }
    });

    if (minStart !== -1 && maxEnd !== -1) {
        // Check if user is typing in a property field
        const activeTag = document.activeElement ? document.activeElement.tagName.toLowerCase() : "";
        const isTyping = (activeTag === "input" || activeTag === "textarea") && document.activeElement !== box;

        // Only steal focus if NOT typing in properties AND not interacting with canvas
        const isInteracting = window.Canvas && (window.Canvas.dragState || window.Canvas.lassoState);

        // Only modify focus/selection if we rely on auto-highlight (not typing/interacting)
        if (!isTyping && !isInteracting) {
            isAutoHighlight = true;
            box.focus();

            // Apply selection - handle forward/backward logic if needed, but standard range is fine
            try {
                box.setSelectionRange(minStart, maxEnd);
            } catch (e) {
                // Ignore
            }
        }

        lastHighlightRange = { start: minStart, end: maxEnd };

        // Scroll to selection
        setTimeout(() => {
            if (box.scrollTo) {
                const lines = yaml.substring(0, minStart).split('\n');
                const totalLines = yaml.split('\n').length;
                const lineNum = lines.length;
                const lineHeight = box.scrollHeight / totalLines;

                // Align to top third
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
