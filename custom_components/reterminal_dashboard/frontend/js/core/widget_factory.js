// Imports removed - using global scope
// generateId from helpers.js
// AppState from state.js
// getDeviceModel from device.js

class WidgetFactory {
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


    static createWidget(type) {
        const id = generateId();
        const defaultColor = WidgetFactory.getDefaultColor();
        const defaultBgColor = WidgetFactory.getDefaultBgColor();
        const widget = {
            id,
            type,
            x: 40,
            y: 40,
            width: 120,
            height: 40,
            title: "",
            entity_id: "",
            props: {}
        };

        // Default properties based on type
        switch (type) {
            case "label":
            case "text":
                widget.type = "text";
                widget.props = {
                    text: "Text",
                    font_size: 20,
                    font_family: "Roboto",
                    color: defaultColor,
                    font_weight: 400,
                    italic: false,
                    bpp: 1,
                    text_align: "TOP_LEFT"
                };
                break;

            case "sensor_text":
                widget.type = "sensor_text";
                widget.props = {
                    label_font_size: 14,
                    value_font_size: 20,
                    value_format: "label_value",
                    color: defaultColor,
                    font_family: "Roboto",
                    font_weight: 400,
                    italic: false,
                    unit: "",
                    precision: 2,
                    text_align: "TOP_LEFT",
                    label_align: "TOP_LEFT",
                    value_align: "TOP_LEFT",
                    separator: " ~ "
                };
                widget.entity_id_2 = "";
                break;

            case "datetime":
                widget.width = 200;
                widget.height = 60;
                widget.props = {
                    format: "time_date",
                    time_font_size: 28,
                    date_font_size: 16,
                    color: defaultColor,
                    italic: false,
                    font_family: "Roboto",
                    text_align: "CENTER"
                };
                break;

            case "progress_bar":
                widget.width = 200;
                widget.height = 40;
                widget.props = {
                    show_label: true,
                    show_percentage: true,
                    bar_height: 15,
                    border_width: 1,
                    color: defaultColor
                };
                break;

            case "battery_icon":
                widget.width = 60;
                widget.height = 60;
                widget.props = {
                    size: 24,
                    font_size: 12,  // Font size for the percentage label
                    color: defaultColor
                };
                break;

            case "weather_icon":
                widget.width = 48;
                widget.height = 48;
                widget.entity_id = "weather.forecast_home";  // Default HAOS weather entity
                widget.props = {
                    size: 48,
                    color: defaultColor,
                    icon_map: "default"
                };
                break;

            case "weather_forecast":
                widget.width = 400;
                widget.height = 80;
                widget.entity_id = "weather.forecast_home";  // Default HAOS weather entity
                widget.props = {
                    layout: "horizontal",  // or "vertical"
                    days: 5,
                    icon_size: 32,
                    temp_font_size: 14,
                    day_font_size: 12,
                    color: defaultColor,
                    show_high_low: true,
                    font_family: "Roboto"
                };
                break;

            case "puppet":
                widget.props = {
                    image_url: "",
                    invert: false,
                    image_type: "RGB565",
                    transparency: "opaque"
                };
                break;

            case "shape_rect":
                widget.props = {
                    fill: false,
                    border_width: 1,
                    color: defaultColor,
                    opacity: 100
                };
                break;

            case "rounded_rect":
                widget.width = 100;
                widget.height = 80;
                widget.props = {
                    radius: 10,
                    border_width: 4,
                    fill: false,
                    color: defaultColor,
                    opacity: 100
                };
                break;

            case "shape_circle":
                widget.width = 40;
                widget.height = 40;
                widget.props = {
                    fill: false,
                    border_width: 1,
                    color: defaultColor,
                    opacity: 100
                };
                break;

            case "icon":
                widget.width = 60;
                widget.height = 60;
                widget.props = {
                    code: "F0595",
                    size: 40,
                    color: defaultColor,
                    font_ref: "font_mdi_medium",
                    fit_icon_to_frame: true
                };
                break;

            case "line":
                widget.width = 100;
                widget.height = 3;
                widget.props = {
                    stroke_width: 3,
                    color: defaultColor,
                    orientation: "horizontal"
                };
                break;

            case "image":
                widget.width = 200;
                widget.height = 150;
                widget.props = {
                    path: "",
                    invert: (getDeviceModel() === "reterminal_e1001"),
                    render_mode: "Auto"
                };
                break;

            case "online_image":
                widget.width = 800;
                widget.height = 480;
                widget.props = {
                    url: "",
                    invert: (getDeviceModel() === "reterminal_e1001"),
                    render_mode: "Auto",
                    interval_s: 300
                };
                break;

            case "quote_rss":
                widget.width = 400;
                widget.height = 120;
                widget.props = {
                    feed_url: "https://www.brainyquote.com/link/quotebr.rss",
                    show_author: true,
                    quote_font_size: 18,
                    author_font_size: 14,
                    font_family: "Roboto",
                    font_weight: 400,
                    color: defaultColor,
                    text_align: "TOP_LEFT",
                    word_wrap: true,
                    italic_quote: true,
                    refresh_interval: "1h",
                    random: true,
                    auto_scale: false
                };
                break;

            case "graph":
                widget.width = 200;
                widget.height = 100;
                widget.props = {
                    duration: "1h",
                    border: true,
                    grid: true,
                    color: defaultColor,
                    title: "",
                    x_grid: "",
                    y_grid: "",
                    line_thickness: 3,
                    line_type: "SOLID",
                    continuous: true,
                    min_value: "",
                    max_value: "",
                    min_range: "",
                    max_range: ""
                };
                break;

            case "qr_code":
                widget.width = 100;
                widget.height = 100;
                widget.props = {
                    value: "https://esphome.io",
                    scale: 2,
                    ecc: "LOW",
                    color: defaultColor
                };
                break;

            case "touch_area":
                widget.props = {
                    title: "Touch Area",
                    color: "rgba(0, 0, 255, 0.2)",
                    border_color: "#0000ff"
                };
                // Default size
                widget.width = 100;
                widget.height = 100;
                break;

            case "lvgl_button":
                widget.width = 100;
                widget.height = 40;
                widget.props = {
                    text: "Button",
                    color: defaultColor,
                    bg_color: defaultBgColor,
                    border_width: 2,
                    radius: 5
                };
                break;

            case "lvgl_arc":
                widget.width = 100;
                widget.height = 100;
                widget.props = {
                    min: 0,
                    max: 100,
                    value: 50,
                    color: defaultColor,
                    title: "Arc",
                    thickness: 10
                };
                break;

            case "lvgl_chart":
                widget.width = 200;
                widget.height = 150;
                widget.props = {
                    min: 0,
                    max: 100,
                    color: defaultColor,
                    title: "Chart",
                    type: "LINE" // LINE or SCATTER
                };
                break;

            case "lvgl_img":
                widget.width = 100;
                widget.height = 100;
                widget.props = {
                    src: "symbol_ok", // Default to a symbol temporarily
                    pivot_x: 0,
                    pivot_y: 0,
                    rotation: 0,
                    scale: 256,
                    color: defaultColor
                };
                break;

            case "lvgl_qrcode":
                widget.width = 100;
                widget.height = 100;
                widget.props = {
                    text: "https://esphome.io",
                    size: 100,
                    color: defaultColor,
                    bg_color: defaultBgColor
                };
                break;

            case "lvgl_bar":
                widget.width = 200;
                widget.height = 20;
                widget.props = {
                    min: 0,
                    max: 100,
                    value: 50,
                    color: defaultColor, // Main color
                    bg_color: "gray", // Background color
                    range_mode: false
                };
                break;

            case "lvgl_slider":
                widget.width = 200;
                widget.height = 20;
                widget.props = {
                    min: 0,
                    max: 100,
                    value: 30,
                    color: defaultColor,
                    bg_color: "gray",
                    border_width: 2
                };
                break;
            case "calendar":
                // Standard size for a calendar widget
                widget.width = 400;
                widget.height = 350;
                widget.props = {
                    entity_id: "sensor.esp_calendar_data",
                    border_width: 2,
                    show_border: true,
                    border_color: defaultColor,
                    background_color: defaultBgColor,
                    text_color: defaultColor,
                    font_size_date: 100,
                    font_size_day: 24,
                    font_size_grid: 14,
                    font_size_event: 18
                };
                break;

            case "lvgl_tabview":
                widget.width = 300;
                widget.height = 200;
                widget.props = {
                    bg_color: defaultBgColor,
                    tabs: ["Tab 1", "Tab 2", "Tab 3"]
                };
                break;

            case "lvgl_tileview":
                widget.width = 300;
                widget.height = 250;
                widget.props = {
                    bg_color: defaultBgColor,
                    tiles: [
                        { id: "tile_0_0", row: 0, col: 0, label: "Tile 0,0" },
                        { id: "tile_0_1", row: 0, col: 1, label: "Tile 0,1" }
                    ]
                };
                break;

            case "lvgl_led":
                widget.width = 40;
                widget.height = 40;
                widget.props = {
                    color: "red",
                    brightness: 255
                };
                break;

            case "lvgl_spinner":
                widget.width = 60;
                widget.height = 60;
                widget.props = {
                    spin_time: 1000,
                    arc_length: 60,
                    arc_color: "blue",
                    track_color: defaultBgColor
                };
                break;

            case "lvgl_buttonmatrix":
                widget.width = 220;
                widget.height = 120;
                widget.props = {
                    rows: [
                        { buttons: ["Btn 1", "Btn 2", "Btn 3"] },
                        { buttons: ["Btn 4", "Btn 5", "Btn 6"] }
                    ],
                    ctrl_map: [] // Future advanced control
                };
                break;

            case "lvgl_checkbox":
                widget.width = 150;
                widget.height = 30;
                widget.props = {
                    text: "Checkbox",
                    checked: false,
                    color: defaultColor
                };
                break;

            case "lvgl_dropdown":
                widget.width = 150;
                widget.height = 40;
                widget.props = {
                    options: "Option 1\nOption 2\nOption 3",
                    selected_index: 0,
                    color: defaultColor
                };
                break;

            case "lvgl_keyboard":
                widget.width = 300;
                widget.height = 120;
                widget.props = {
                    mode: "TEXT_UPPER", // TEXT_LOWER, TEXT_UPPER, SPECIAL, NUMBER
                    textarea_id: "" // Link to a textarea
                };
                break;

            case "lvgl_roller":
                widget.width = 120;
                widget.height = 150;
                widget.props = {
                    options: "Option 1\nOption 2\nOption 3\nOption 4\nOption 5",
                    visible_row_count: 3,
                    color: defaultColor,
                    bg_color: defaultBgColor,
                    selected_bg_color: "blue",
                    selected_text_color: "white"
                };
                break;

            case "lvgl_spinbox":
                widget.width = 120;
                widget.height = 40;
                widget.props = {
                    min: 0,
                    max: 100,
                    value: 0,
                    digit_count: 4,
                    separator_position: 0, // 0 = no separator
                    step: 1
                };
                break;

            case "lvgl_switch":
                widget.width = 60;
                widget.height = 30;
                widget.props = {
                    checked: false,
                    color: "blue", // Indicator color when on
                    bg_color: "gray",
                    knob_color: "white"
                };
                break;

            case "lvgl_textarea":
                widget.width = 200;
                widget.height = 100;
                widget.props = {
                    text: "",
                    placeholder: "Enter text here...",
                    one_line: false,
                    max_length: 0
                };
                break;

            case "lvgl_label":
                widget.width = 120;
                widget.height = 40;
                widget.props = {
                    text: "Label",
                    font_size: 20,
                    font_family: "Roboto",
                    color: defaultColor,
                    bg_color: "transparent",
                    text_align: "CENTER"
                };
                break;

            case "lvgl_line":
                widget.width = 100;
                widget.height = 50;
                widget.props = {
                    points: "0,25 50,10 100,25", // Format: x1,y1 x2,y2 x3,y3 ...
                    line_width: 3,
                    line_color: defaultColor,
                    line_rounded: true
                };
                break;

            case "lvgl_meter":
                widget.width = 150;
                widget.height = 150;
                widget.props = {
                    min: 0,
                    max: 100,
                    value: 60,
                    color: defaultColor,
                    indicator_color: "red",
                    tick_count: 11,
                    tick_length: 10,
                    label_gap: 10
                };
                break;

            case "lvgl_obj":
                widget.width = 100;
                widget.height = 100;
                widget.props = {
                    color: defaultBgColor,
                    border_width: 1,
                    border_color: "gray",
                    radius: 0
                };
                break;
        }

        return widget;
    }
}
