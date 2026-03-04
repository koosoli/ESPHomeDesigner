// @ts-check
import { ESPHOME_COLOR_MAPPING } from './constants';
import { iconPickerData } from './constants_icons.js';

/**
 * Shared utility functions for ESPHome Designer.
 */

declare global {
    interface Window {
        Utils: typeof Utils;
        ESPHomeDesigner: any;
    }
}

export const Utils = {
    /**
     * Converts a hex color (#RRGGBB) or named color to an ESPHome Color() object or constant.
     * @param c - Color string
     * @returns - ESPHome YAML color expression
     */
    getColorConst: (c: string): string => {
        if (!c) return "COLOR_BLACK";
        const cl = c.toLowerCase();
        if (cl === 'theme_auto') return "color_on";
        if (cl === 'transparent') return "color_off";

        // Handle Hex Colors (#RRGGBB)
        if (cl.startsWith("#") && cl.length === 7) {
            const r = parseInt(cl.substring(1, 3), 16);
            const g = parseInt(cl.substring(3, 5), 16);
            const b = parseInt(cl.substring(5, 7), 16);
            return `Color(${r}, ${g}, ${b})`;
        }

        // Map named colors to standardized constants
        return ESPHOME_COLOR_MAPPING[cl] || "COLOR_BLACK";
    },

    /**
     * Helper to get alignment X coordinate.
     * @param align - TextAlign constant
     * @param x - Left coordinate
     * @param w - Width
     * @returns - YAML expression
     */
    getAlignX: (align: string, x: number, w: number): string => {
        if (align.includes("LEFT")) return `${x}`;
        if (align.includes("RIGHT")) return `${x} + ${w}`;
        return `${x} + ${w}/2`;
    },

    /**
     * Helper to get alignment Y coordinate.
     * @param align - TextAlign constant
     * @param y - Top coordinate
     * @param h - Height
     * @returns - YAML expression
     */
    getAlignY: (align: string, y: number, h: number): string => {
        if (align.includes("TOP")) return `${y}`;
        if (align.includes("BOTTOM")) return `${y} + ${h}`;
        return `${y} + ${h}/2`;
    },

    /**
     * Sanitizes a string for use in YAML/C++.
     * @param s 
     * @returns
     */
    sanitize: (s: string): string => {
        if (!s) return "";
        return s.replace(/"/g, '\\"');
    },

    /**
     * Adds a grey dither mask logic if needed for e-paper.
     * @param lines - YAML lines array
     * @param colorProp - Color name
     * @param isEpaper - Whether target is e-paper
     * @param x, y, w, h - Coordinates
     */
    addDitherMask: (lines: string[], colorProp: string, isEpaper: boolean, x: number, y: number, w: number, h: number, _radius = 0): void => {
        if (!isEpaper) return;
        if (!colorProp) return;

        const cp = colorProp.toLowerCase();
        let isGray = cp === "gray" || cp === "grey";

        // Also detect gray hex codes (where R, G, and B are roughly equal and in mid-range)
        if (!isGray && cp.startsWith("#") && cp.length === 7) {
            const r = parseInt(cp.substring(1, 3), 16);
            const g = parseInt(cp.substring(3, 5), 16);
            const b = parseInt(cp.substring(5, 7), 16);
            // If they are within 10% of each other and not too dark/light
            if (Math.abs(r - g) < 15 && Math.abs(g - b) < 15 && r > 40 && r < 210) {
                isGray = true;
            }
        }

        if (isGray) {
            lines.push(`          apply_grey_dither_mask(${Math.round(x)}, ${Math.round(y)}, ${Math.round(w)}, ${Math.round(h)});`);
        }
    },

    /**
     * Checks if a color value represents gray.
     * @param colorProp - Color name or hex code
     * @returns
     */
    isGrayColor: (colorProp: string): boolean => {
        if (!colorProp) return false;
        const cp = colorProp.toLowerCase();

        // Named gray
        if (cp === "gray" || cp === "grey") return true;

        // Gray hex codes (R, G, B roughly equal and in mid-range)
        if (cp.startsWith("#") && cp.length === 7) {
            const r = parseInt(cp.substring(1, 3), 16);
            const g = parseInt(cp.substring(3, 5), 16);
            const b = parseInt(cp.substring(5, 7), 16);
            if (Math.abs(r - g) < 15 && Math.abs(g - b) < 15 && r > 40 && r < 210) {
                return true;
            }
        }

        return false;
    },

    /**
     * Adds a subtractive grey dither mask for text on e-paper.
     * @param lines - YAML lines array
     * @param colorProp - Color name
     * @param isEpaper - Whether target is e-paper
     * @param x, y, w, h - Bounding box coordinates
     * @returns - True if dithering was applied
     */
    addDitherMaskForText: (lines: string[], colorProp: string, isEpaper: boolean, x: number, y: number, w: number, h: number): boolean => {
        if (!isEpaper) return false;
        if (!Utils.isGrayColor(colorProp)) return false;

        lines.push(`        apply_grey_dither_to_text(${Math.round(x)}, ${Math.round(y)}, ${Math.round(w)}, ${Math.round(h)});`);
        return true;
    },

    /**
     * Helper to get Material Design Icon code from name.
     * @param name - Icon name (e.g. "account")
     * @returns - Hex code string (e.g. "F0004") or null
     */
    getIconCode: (name: string): string | null => {
        if (!name || !iconPickerData) return null;
        const icon = iconPickerData.find(i => i.name === name);
        return icon ? icon.code : null;
    }
};

// Expose to window for global access
window.Utils = Utils;

// Attach to unified namespace
window.ESPHomeDesigner = (window as any).ESPHomeDesigner || {};
(window as any).ESPHomeDesigner.utils = Utils;
