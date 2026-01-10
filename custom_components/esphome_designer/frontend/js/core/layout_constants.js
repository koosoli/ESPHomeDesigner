/**
 * @file layout_constants.js
 * @description Shared constants for widget layout, dimensions, and typography.
 * Centralizes duplicate "magic numbers" found across multiple plugins.
 */

window.LAYOUT = {
    // Standard Widget Dimensions (Defaults)
    WIDGET: {
        SMALL: { W: 100, H: 20 },
        MEDIUM: { W: 200, H: 60 },
        LARGE: { W: 200, H: 100 }
    },

    // Typography
    FONT: {
        SIZE: {
            XS: 12,
            S: 14,
            M: 16,
            L: 20,
            XL: 28,
            XXL: 40
        },
        // Legacy "standard" defaults per widget type
        DEFAULT: {
            LABEL: 14,
            VALUE: 20,
            TITLE: 28,
            DATE: 16
        }
    },

    // Grid & Spacing
    GRID: {
        GAP: 10,
        MARGIN: 10
    }
};

// Freeze to prevent accidental modification
Object.freeze(window.LAYOUT);
