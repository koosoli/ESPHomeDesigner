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
    const ids = Array.isArray(widgetIds) ? widgetIds : (widgetIds ? [widgetIds] : []);

    if (ids.length === 0) {
        // Clear selection if nothing is selected
        try {
            box.setSelectionRange(0, 0);
            box.scrollTop = 0;
            lastHighlightRange = null;
        } catch (e) { }
        return;
    }

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

            // Also check for common top-level standard ESPHome keys to prevent bleeding into global sections
            // Note: We check for newline + key to ensure it's a top-level start
            const stopKeys = [
                "esphome:", "logger:", "api:", "ota:", "wifi:", "ethernet:", "psram:",
                "substitutions:", "external_components:", "packages:",
                "globals:", "sensor:", "binary_sensor:", "text_sensor:",
                "time:", "script:", "font:", "image:", "animation:",
                "display:", "lvgl:", "i2c:", "spi:", "uart:",
                "output:", "light:", "switch:", "button:", "number:", "select:", "climate:", "fan:", "cover:"
            ];

            let nextMarkerIndex = -1;

            // Check standard markers
            nextMarkers.forEach(m => {
                const idx = yaml.indexOf(m, index + targetStr.length);
                if (idx !== -1 && (nextMarkerIndex === -1 || idx < nextMarkerIndex)) {
                    nextMarkerIndex = idx;
                }
            });

            // Check stop keys (must be at start of line)
            stopKeys.forEach(key => {
                const searchStr = "\n" + key;
                const idx = yaml.indexOf(searchStr, index + targetStr.length);
                if (idx !== -1 && (nextMarkerIndex === -1 || idx < nextMarkerIndex)) {
                    // Include the newline in the count, so we stop BEFORE the key
                    // But wait, the selection range end is exclusive? 
                    // Usually we want to stop exactly at the newline before.
                    nextMarkerIndex = idx + 1; // +1 to capture the newline character itself but stop before key
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

        // Only modify selection if we rely on auto-highlight (not typing/interacting)
        const isInteracting = window.Canvas && (window.Canvas.dragState || window.Canvas.lassoState);

        if (!isTyping && !isInteracting) {
            window.isAutoHighlight = true;

            // Apply selection - Visually highlight the range
            try {
                box.setSelectionRange(minStart, maxEnd);

                // CRITICAL: If only one widget is selected, we DO want focus to move
                // to the box so Ctrl+C works immediately and the highlight is visible.
                // For multiple/Select All, we skip this to stay on the canvas.
                // Also skip if undo/redo is in progress to prevent focus stealing.
                if (ids.length === 1 && !window._undoRedoInProgress) {
                    box.focus();
                }
            } catch (e) {
                // Ignore
            }
        }

        window.lastHighlightRange = { start: minStart, end: maxEnd };

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

/**
 * Global initialization for one-time snippet UI events.
 * Consolidates multiple lazy-loaded listeners into a single startup check.
 */
function initSnippetUILogic() {
    const box = document.getElementById("snippetBox");
    if (!box) return;

    // If user clicks or moves cursor manually, it's no longer an "auto" highlight
    const clearAuto = () => {
        if (window.isAutoHighlight) {
            window.isAutoHighlight = false;
        }
    };

    box.addEventListener('mousedown', clearAuto);
    box.addEventListener('input', clearAuto);
    box.addEventListener('keydown', (ev) => {
        // Nav keys or actual typing should clear the auto-selection state
        const navKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'];
        if (navKeys.includes(ev.key) || (!ev.ctrlKey && !ev.metaKey)) {
            clearAuto();
        }
    });

    Logger.log("[YAML Export] Interaction listeners attached to Snippet Box.");
}

// Kick off initialization
if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initSnippetUILogic);
} else {
    initSnippetUILogic();
}

