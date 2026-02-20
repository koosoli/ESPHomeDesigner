/**
 * @file types.d.ts
 * @description Global TypeScript definitions for ESPHome Designer.
 * This file provides JSDoc and IDE intellisense support without requiring
 * a compilation step or altering runtime code.
 */

declare global {

    /**
     * Represents a single UI Widget element on the canvas.
     */
    interface Widget {
        /** Unique global identifier for the widget (e.g. "lvgl_button_1") */
        id: string;
        /** The base plugin type (e.g. "lvgl_button", "text", "shape_rect") */
        type: string;
        /** X-coordinate relative to the page/group */
        x: number;
        /** Y-coordinate relative to the page/group */
        y: number;
        /** Width of the bounding box */
        width: number;
        /** Height of the bounding box */
        height: number;
        /** Indicates if the widget is temporarily hidden in the editor */
        hidden?: boolean;
        /** Indicates if the widget is locked from selection/movement */
        locked?: boolean;

        // Common Optional Properties
        text?: string;
        content?: string;
        font_size?: number;
        color?: string;
        bg_color?: string;
        align?: 'left' | 'center' | 'right';

        // Data Binding & Interactivity
        entity_id?: string;
        entity_id_2?: string;

        // Conditional Visibility System
        condition_entity?: string;
        condition_operator?: '==' | '!=' | '>' | '<' | '>=' | '<=' | 'range';
        condition_state?: string;
        condition_value?: string;
        condition_min?: string | number;
        condition_max?: string | number;
        condition_invert?: boolean;

        // Parent Reference (for groups/layouts)
        parentId?: string;

        /** Custom widget properties unique to specific plugins (e.g. icon_size) */
        props?: Record<string, any>;
    }

    /**
     * Represents a single Screen/Page in the UI design.
     */
    interface Page {
        /** Unique page identifier */
        id: string;
        /** Display name of the page */
        name: string;
        /** Color depth (Bits Per Pixel), usually 16 for RGB565 */
        bpp: number;
        /** The children widgets placed directly on this page */
        widgets: Widget[];
    }

    /**
     * Represents the precise configuration of the physical target display.
     */
    interface HardwareSettings {
        chip: 'esp32' | 'esp32s2' | 'esp32s3' | 'esp32c3';
        tech: 'lcd' | 'epaper';
        resWidth: number;
        resHeight: number;
        displayDriver?: string;
        displayModel?: string;
        memory?: 'psram' | 'none';
        touchTech?: 'none' | 'cst816' | 'gt911' | 'ft6336' | 'xpt2046' | 'tt21100' | 'ns2009' | 'stmpe610';
        shape?: 'rect' | 'circle' | 'round_rect';
        pins?: Record<string, number | string>;
    }

    /**
     * The master blueprint representing an entire ESPHome project.
     */
    interface ProjectPayload {
        /** The human-readable name of the project */
        name: string;
        /** The sanitized internal ESPHome node name */
        device_name?: string;
        /** Array of defined pages */
        pages: Page[];
        /** The specific device profile being targeted (e.g., "reterminal_e1001" or "custom") */
        deviceModel?: string;
        /** Array of user-uploaded or Google font definitions */
        glyphsets?: Array<{ file: string, weight: number, name: string }>;
        /** Custom hardware configurations (if deviceModel is 'custom') */
        customHardware?: HardwareSettings;
        /** Flag indicating if this is just a clipboard/snippet export rather than full firmware */
        isSelectionSnippet?: boolean;
    }

}

export { }; // Ensure it's treated as a module
