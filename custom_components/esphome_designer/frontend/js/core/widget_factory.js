import { generateId } from '../utils/helpers.js';
import { AppState } from './state.js';
import { getDeviceModel } from '../utils/device.js';
import { registry as PluginRegistry } from './plugin_registry.js';

export class WidgetFactory {
    /**
     * Determines the effective dark mode for the current page.
     * Per-page setting overrides global setting.
     * @returns {boolean} true if dark mode should be active
     */
    static getEffectiveDarkMode() {
        const page = AppState?.getCurrentPage?.();
        const pageDarkMode = page?.dark_mode;

        // "inherit" or undefined = use global setting
        // "dark" = force dark mode
        // "light" = force light mode
        if (pageDarkMode === "dark") return true;
        if (pageDarkMode === "light") return false;
        return !!(AppState && AppState.settings && AppState.settings.dark_mode);
    }

    /**
     * Gets the default foreground color based on dark mode setting.
     * Returns "white" if dark mode (black background) is enabled, otherwise "black".
     * Uses per-page dark mode when available.
     */
    static getDefaultColor() {
        return WidgetFactory.getEffectiveDarkMode() ? "white" : "black";
    }

    /**
     * Gets the default background color based on dark mode setting.
     * Returns "black" if dark mode is enabled, otherwise "white".
     * Uses per-page dark mode when available.
     */
    static getDefaultBgColor() {
        return WidgetFactory.getEffectiveDarkMode() ? "black" : "white";
    }

    /**
     * Returns default grid cell properties for LVGL widgets.
     * These are applied when a page uses grid layout.
     */
    static getGridCellDefaults() {
        return {
            grid_cell_row_pos: null,      // null = auto-place
            grid_cell_column_pos: null,
            grid_cell_row_span: 1,
            grid_cell_column_span: 1,
            grid_cell_x_align: "STRETCH",
            grid_cell_y_align: "STRETCH"
        };
    }

    /**
     * Checks if a widget type is an LVGL widget.
     */
    static isLvglWidget(type) {
        return type && type.startsWith("lvgl_");
    }

    static createWidget(type) {
        const id = generateId();
        const defaultColor = WidgetFactory.getDefaultColor();
        const defaultBgColor = WidgetFactory.getDefaultBgColor();

        let widget = {
            id,
            type,
            x: 40,
            y: 40,
            width: 120,
            height: 40,
            title: "",
            entity_id: "",
            locked: false,
            props: {}
        };

        // Check for special presets first (these override generic plugin defaults)
        switch (type) {
            case "nav_next_page":
                widget.props = {
                    title: "Next",
                    color: "rgba(0, 128, 255, 0.2)",
                    border_color: "#0080ff",
                    nav_action: "next_page",
                    icon: "F0142",
                    icon_size: 48
                };
                widget.width = 80;
                widget.height = 80;
                return widget;

            case "nav_previous_page":
                widget.props = {
                    title: "Previous",
                    color: "rgba(0, 128, 255, 0.2)",
                    border_color: "#0080ff",
                    nav_action: "previous_page",
                    icon: "F0141",
                    icon_size: 48
                };
                widget.width = 80;
                widget.height = 80;
                return widget;

            case "nav_reload_page":
                widget.props = {
                    title: "Reload",
                    color: "rgba(0, 128, 255, 0.2)",
                    border_color: "#0080ff",
                    nav_action: "reload_page",
                    icon: "F0450",
                    icon_size: 48
                };
                widget.width = 80;
                widget.height = 80;
                return widget;
        }

        // Try to get defaults from PluginRegistry
        const plugin = PluginRegistry.get(type);
        if (plugin && plugin.defaults) {
            widget.props = { ...plugin.defaults };

            // Adjust colors based on dark mode if they were defaults
            if (widget.props.color === "black" || widget.props.color === "white") {
                widget.props.color = "theme_auto";
            }
            if (widget.props.text_color === "black" || widget.props.text_color === "white") {
                widget.props.text_color = "theme_auto";
            }
            if (widget.props.bg_color === "black" || widget.props.bg_color === "white") {
                widget.props.bg_color = defaultBgColor;
            }
            // Also adjust background_color (used by weather/calendar)
            if (widget.props.background_color === "black" || widget.props.background_color === "white") {
                widget.props.background_color = defaultBgColor;
            }
            // Also adjust border_color (used by shapes)
            if (widget.props.border_color === "black" || widget.props.border_color === "white") {
                widget.props.border_color = defaultColor;
            }

            // Some plugins have specific size defaults in the plugin object
            if (plugin.width) widget.width = plugin.width;
            if (plugin.height) widget.height = plugin.height;

            // NEW: Also check plugin.defaults for width/height as some plugins define them there
            if (plugin.defaults.width) widget.width = plugin.defaults.width;
            if (plugin.defaults.height) widget.height = plugin.defaults.height;
            if (plugin.defaults.w) widget.width = plugin.defaults.w;
            if (plugin.defaults.h) widget.height = plugin.defaults.h;

            return widget;
        }

        // Fallback or remaining special cases
        switch (type) {
        }

        // Apply grid cell defaults to all LVGL widgets
        if (WidgetFactory.isLvglWidget(type)) {
            widget.props = {
                ...WidgetFactory.getGridCellDefaults(),
                ...widget.props
            };
        }

        return widget;
    }
}

// Global exposure for transition
window.WidgetFactory = WidgetFactory;
