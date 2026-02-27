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
    let ids = Array.isArray(widgetIds) ? widgetIds : (widgetIds ? [widgetIds] : []);

    if (ids.length === 0) {
        // Clear selection if nothing is selected
        try {
            box.setSelectionRange(0, 0);
            box.scrollTop = 0;
            lastHighlightRange = null;
        } catch (e) {
            Logger.error("[highlightWidgetInSnippet] Selection error:", e);
        }
        return;
    }

    // SPECIAL: If in Selection Snippet mode, select EVERYTHING
    // Selection snippet mode is active when the Title contains 'Selection Snippet'
    const titleEl = document.querySelector('.code-panel-title');
    const isSnippetMode = titleEl && titleEl.textContent.includes('Selection Snippet');

    if (isSnippetMode) {
        try {
            box.setSelectionRange(0, yaml.length);
            box.focus();
            lastHighlightRange = { start: 0, end: yaml.length };
        } catch (e) {
            Logger.error("[highlightWidgetInSnippet] Selection error (SnippetMode):", e);
        }
        return;
    }


    let minStart = -1;
    let maxEnd = -1;

    ids.forEach(id => {
        // Search for the widget ID in the metadata comments (Standard ESPHome)
        let targetStr = `id:${id}`;
        let index = yaml.indexOf(targetStr);

        // Fallback 1: Check for spaced ID (common in YAML body)
        if (index === -1) {
            targetStr = `id: ${id}`;
            index = yaml.indexOf(targetStr);
        }

        // Fallback 2: Check for JSON format (common in OEPL/ODP)
        if (index === -1) {
            targetStr = `"id":"${id}"`;
            index = yaml.indexOf(targetStr);
        }
        if (index === -1) {
            targetStr = `"id": "${id}"`;
            index = yaml.indexOf(targetStr);
        }

        // Fallback 3: Check for ODP YAML list format.
        // The adapter now outputs ids as comments: "    # id: widget_id"
        // Followed by "    - type: ..."
        if (index === -1) {
            targetStr = `# id: ${id}`;
            index = yaml.indexOf(targetStr);
        }

        if (index !== -1) {
            // Find the start of the line containing the ID
            let lineStart = yaml.lastIndexOf('\n', index) + 1;

            // SPECIAL HANDLING FOR JSON:
            // If the match was a JSON string (contains "id"), we likely found the ID *inside* the object.
            // We need to walk backwards to find the opening brace '{'
            if (targetStr.includes('":"') || targetStr.includes('": "')) {
                const openBraceIndex = yaml.lastIndexOf('{', index);
                if (openBraceIndex !== -1) {
                    // Use the indentation of the brace line
                    const braceLineStart = yaml.lastIndexOf('\n', openBraceIndex) + 1;
                    lineStart = braceLineStart;
                }
            }

            // SPECIAL HANDLING FOR ODP YAML BLOCKS:
            // If the ID was found in a comment ("# id: ..."), the ACTUAL block usually starts
            // on the next line or shortly after (e.g., "- type: ...").
            // We want to highlight starting from the ID comment down to the end of the block.
            // No need to scan backwards for type, as comment is the header.
            if (targetStr.startsWith("# id:")) {
                // lineStart is already correct (start of the comment line)
            } else {
                // For other cases (embedded JSON ID), check for backward scan needs
                // ODP blocks start with "- type: ...". We need to walk backwards from the ID
                // to find the nearest preceding "- type:" line that belongs to this block.
                let currentScan = lineStart;
                while (currentScan > 0) {
                    const prevLineEnd = currentScan - 1;
                    const prevLineStart = yaml.lastIndexOf('\n', prevLineEnd - 1) + 1;
                    const lineContent = yaml.substring(prevLineStart, prevLineEnd).trim();

                    // Stop at the block starter
                    if (lineContent.startsWith("- type:")) {
                        lineStart = prevLineStart;
                        break;
                    }

                    // Safety: If we hit a root key or significantly different indent, stop
                    // (Simple heuristic: if we go back too far, give up)
                    if (lineStart - currentScan > 500) break;

                    currentScan = prevLineStart;
                }
            }

            // Find the next widget or page marker to determine block end
            const nextMarkers = [
                "# widget:", "// widget:", "// page:", "# id:",
                "// ────────────────", // Widget separator
                "// ═══════════════", // Page header
                "// ▸ PAGE:"          // Page name marker
            ];

            // Also check for common top-level standard ESPHome keys to prevent bleeding into global sections
            // Note: We check for newline + key to ensure it's a top-level start
            const stopKeys = [
                "esphome:", "logger:", "api:", "ota:", "wifi:", "ethernet:", "psram:",
                "substitutions:", "external_components:", "packages:",
                "globals:", "sensor:", "binary_sensor:", "text_sensor:",
                "time:", "script:", "font:", "image:", "animation:",
                "display:", "lvgl:", "i2c:", "spi:", "uart:",
                "output:", "light:", "switch:", "button:", "number:", "select:", "climate:", "fan:", "cover:",
                "  ]", "    ]", "  }", "    }"
            ];

            let blockEnd = -1;
            const isJson = targetStr.includes('":"') || targetStr.includes('": "');

            if (isJson) {
                // Brace balancing for JSON objects
                let braceCount = 0;
                let foundStart = false;

                // Start scanning from the calculated lineStart (which should be the open brace line)
                // We re-scan to ensure we catch the opening brace if it wasn't exactly at lineStart
                for (let i = lineStart; i < yaml.length; i++) {
                    const char = yaml[i];
                    if (char === '{') {
                        braceCount++;
                        foundStart = true;
                    } else if (char === '}') {
                        braceCount--;
                    }

                    if (foundStart && braceCount === 0) {
                        blockEnd = i + 1; // Include the closing brace
                        // Optional: Include trailing comma if present
                        if (yaml[i + 1] === ',') blockEnd++;
                        break;
                    }
                }
            } else {
                // For YAML (standard or ODP), look for the next "- type:" at the same indentation level
                // OR any of the stop markers.
                const nextTypeMarker = "\n    - type:"; // Assuming standard 4-space align in ODP payload
                const nextTypeIndex = yaml.indexOf(nextTypeMarker, index + targetStr.length);

                let nextMarkerIndex = -1;

                if (nextTypeIndex !== -1) {
                    nextMarkerIndex = nextTypeIndex; // Stop *before* the next item starts
                }

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
                        nextMarkerIndex = idx + 1;
                    }
                });

                blockEnd = nextMarkerIndex !== -1 ? nextMarkerIndex : yaml.length;
            }

            // Fallback safety
            if (blockEnd === -1) blockEnd = yaml.length;

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
            } catch (e) { // eslint-disable-line no-unused-vars
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

