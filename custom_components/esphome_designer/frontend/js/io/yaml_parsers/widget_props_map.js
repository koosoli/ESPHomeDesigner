import { Logger } from '../../utils/logger.js';

/**
 * Reconstructs a widget's props dictionary from the flat key-value pairs parsed in the YAML.
 * 
 * @param {string} widgetType - The resolved widget type (e.g. "text", "lvgl_button")
 * @param {Record<string, any>} p - The flat property key-value pairs (from // widget: marker)
 * @param {any} widget - The base widget object (initialized with core fields like x, y, id)
 * @returns {Record<string, any>} Rich typed properties for the widget
 */
export function buildWidgetProps(widgetType, p, widget) {
    const props = {};

    /**
     * @param {any} c
     * @param {string} fallback
     */
    const normalizeColor = (c, fallback) => {
        if (c === undefined || c === null || c === "") return fallback;
        if (typeof c === 'number') {
            const h = String(c.toString(16).toLowerCase());
            return "#" + (h.length <= 3 ? h.padStart(3, '0') : h.padStart(6, '0'));
        }
        let s = String(c).trim().toLowerCase();
        if (s.startsWith("0x")) return "#" + s.substring(2);
        return s;
    };

    // --- Common LVGL properties ---
    if (widgetType.startsWith("lvgl_")) {
        // Pre-fill generic properties from p
        Object.entries(p).forEach(([key, val]) => {
            if (["id", "type", "x", "y", "w", "h", "width", "height"].includes(key)) return;

            // Basic normalization
            if (val === "true") props[key] = true;
            else if (val === "false") props[key] = false;
            else if (key.includes("color") || key.includes("bg_") || key.startsWith("line_color")) {
                props[key] = normalizeColor(val, val);
            }
            else if (typeof val === 'string' && val !== "" && !Number.isNaN(Number(val)) && !val.startsWith("0x")) props[key] = parseFloat(val);
            else props[key] = val;
        });

        props.hidden = (p.hidden === "true");
        props.clickable = (p.clickable !== "false");
        props.checkable = (p.checkable === "true");
        props.scrollable = (p.scrollable !== "false");
        props.floating = (p.floating === "true");
        props.ignore_layout = (p.ignore_layout === "true");
        props.scrollbar_mode = p.scrollbar_mode || "AUTO";
        props.opa = parseInt(p.opa || 255, 10);

        const rowPos = p.grid_cell_row_pos ?? p.grid_row;
        const colPos = p.grid_cell_column_pos ?? p.grid_col;
        props.grid_cell_row_pos = rowPos != null ? parseInt(rowPos, 10) : null;
        props.grid_cell_column_pos = colPos != null ? parseInt(colPos, 10) : null;
        props.grid_cell_row_span = parseInt(p.grid_cell_row_span || p.grid_row_span || 1, 10);
        props.grid_cell_column_span = parseInt(p.grid_cell_column_span || p.grid_col_span || 1, 10);
        props.grid_cell_x_align = p.grid_cell_x_align || p.grid_x_align || "STRETCH";
        props.grid_cell_y_align = p.grid_cell_y_align || p.grid_y_align || "STRETCH";
    }

    // --- Type Specific Mapping ---
    if (widgetType === "icon") {
        return {
            code: p.code || "F07D0",
            size: parseInt(p.size || 48, 10),
            color: p.color || "theme_auto",
            bg_color: p.bg_color || "transparent",
            fit_icon_to_frame: p.fit_icon_to_frame !== "false"
        };
    } else if (widgetType === "text" || widgetType === "label") {
        return {
            text: p.text || "",
            font_size: parseInt(p.font_size || p.size || 20, 10),
            font_family: p.font_family || p.font || "Roboto",
            font_weight: parseInt(p.font_weight || p.weight || 400, 10),
            italic: (p.italic === "true" || p.italic === true),
            bpp: parseInt(p.bpp || 1, 10),
            color: p.color || "theme_auto",
            text_align: p.align || p.text_align || "TOP_LEFT"
        };
    } else if (widgetType === "sensor_text") {
        if (p.entity_2) widget.entity_id_2 = p.entity_2;
        return {
            label_font_size: parseInt(p.label_font || p.label_font_size || 14, 10),
            value_font_size: parseInt(p.value_font || p.value_font_size || 20, 10),
            value_format: p.format || "label_value",
            color: p.color || "theme_auto",
            italic: (p.italic === "true" || p.italic === true || p.font_style === "italic"),
            font_family: p.font_family || "Roboto",
            font_weight: parseInt(p.font_weight || 400, 10),
            prefix: p.prefix || "",
            postfix: p.postfix || "",
            unit: p.unit || "",
            hide_unit: (p.hide_unit === "true" || p.hide_unit === true),
            precision: parseInt(p.precision || 2, 10),
            text_align: p.align || p.text_align || "TOP_LEFT",
            label_align: p.label_align || p.align || p.text_align || "TOP_LEFT",
            value_align: p.value_align || p.align || p.text_align || "TOP_LEFT",
            is_local_sensor: (p.is_local_sensor === "true" || p.local === "true"),
            is_text_sensor: (p.is_text_sensor === "true" || p.text_sensor === "true"),
            separator: p.separator || " ~ "
        };
    } else if (widgetType === "datetime") {
        widget.width = parseInt(p.w || 200, 10);
        widget.height = parseInt(p.h || 60, 10);
        return {
            format: p.format || "time_date",
            time_font_size: parseInt(p.time_font_size || p.time_size || p.time_font || 28, 10),
            date_font_size: parseInt(p.date_font_size || p.date_size || p.date_font || 16, 10),
            color: p.color || "black",
            italic: (p.italic === "true" || p.italic === true || p.font_style === "italic"),
            font_family: p.font_family || "Roboto",
            text_align: p.align || p.text_align || "CENTER",
            bg_color: p.bg_color || "transparent",
            border_width: parseInt(p.border_width || 0, 10),
            border_color: p.border_color || "theme_auto",
            border_radius: parseInt(p.border_radius || 0, 10)
        };
    } else if (widgetType === "progress_bar") {
        return {
            show_label: (p.show_label !== "false"),
            show_percentage: (p.show_percentage !== "false" && p.show_pct !== "false"),
            bar_height: parseInt(p.bar_height || p.bar_h || 15, 10),
            border_width: parseInt(p.border_width || p.border_w || p.border || 1, 10),
            color: p.color || "theme_auto",
            bg_color: p.bg_color || "white",
            is_local_sensor: (p.is_local_sensor === "true" || p.local === "true")
        };
    } else if (widgetType === "battery_icon") {
        return {
            size: parseInt(p.size || 36, 10),
            font_size: parseInt(p.font_size || 14, 10),
            color: p.color || "theme_auto",
            is_local_sensor: p.is_local_sensor !== "false",
            fit_icon_to_frame: p.fit_icon_to_frame !== "false"
        };
    } else if (widgetType === "wifi_signal") {
        return {
            size: parseInt(p.size || 24, 10),
            font_size: parseInt(p.font_size || 12, 10),
            color: p.color || "theme_auto",
            is_local_sensor: p.is_local_sensor !== "false",
            show_dbm: p.show_dbm !== "false",
            fit_icon_to_frame: p.fit_icon_to_frame === "true"
        };
    } else if (widgetType === "ondevice_temperature") {
        return {
            size: parseInt(p.size || 32, 10),
            font_size: parseInt(p.font_size || 16, 10),
            label_font_size: parseInt(p.label_font_size || 10, 10),
            color: p.color || "black",
            unit: p.unit || "°C",
            precision: parseInt(p.precision || 1, 10),
            show_label: (p.show_label !== "false"),
            is_local_sensor: (p.is_local_sensor !== "false" && p.local !== "false"),
            fit_icon_to_frame: (p.fit_icon_to_frame !== "false" && p.fit !== "false")
        };
    } else if (widgetType === "ondevice_humidity") {
        return {
            size: parseInt(p.size || 32, 10),
            font_size: parseInt(p.font_size || 16, 10),
            label_font_size: parseInt(p.label_font_size || 10, 10),
            color: p.color || "black",
            unit: p.unit || "%",
            precision: parseInt(p.precision || 0, 10),
            show_label: (p.show_label !== "false"),
            is_local_sensor: (p.is_local_sensor !== "false" && p.local !== "false"),
            fit_icon_to_frame: (p.fit_icon_to_frame !== "false" && p.fit !== "false")
        };
    } else if (widgetType === "weather_icon") {
        return {
            size: parseInt(p.size || 48, 10),
            color: p.color || "theme_auto"
        };
    } else if (widgetType === "qr_code") {
        return {
            value: p.value || "https://github.com/koosoli/ESPHomeDesigner/",
            scale: parseInt(p.scale || 2, 10),
            ecc: p.ecc || "LOW",
            color: p.color || "theme_auto"
        };
    } else if (widgetType === "image") {
        return {
            path: (p.path || "/config/esphome/images/logo.png").replace(/^"|"$/g, ''),
            invert: (p.invert === "true" || p.invert === "1"),
            dither: p.dither || "FLOYDSTEINBERG",
            transparency: p.transparency || "",
            image_type: p.img_type || "BINARY",
            render_mode: p.render_mode || "Auto"
        };
    } else if (widgetType === "online_image") {
        return {
            url: p.url || "",
            invert: (p.invert === "true" || p.invert === "1"),
            interval_s: parseInt(p.interval || 300, 10),
            render_mode: p.render_mode || "Auto"
        };
    } else if (widgetType === "puppet") {
        return {
            image_url: p.url || "",
            invert: (p.invert === "true" || p.invert === "1"),
            image_type: p.img_type || "RGB565",
            transparency: p.transparency || "opaque",
            render_mode: p.render_mode || "Auto"
        };
    } else if (widgetType === "shape_rect") {
        return {
            fill: (p.fill === "true" || p.fill === "1"),
            border_width: parseInt(p.border_width || p.border || 1, 10),
            color: p.color || "theme_auto",
            border_color: p.border_color || p.color || "theme_auto",
            opacity: parseInt(p.opacity || 100, 10)
        };
    } else if (widgetType === "touch_area") {
        return {
            title: p.title || "",
            color: p.color || "rgba(0, 0, 255, 0.15)",
            border_color: p.border_color || "#0000ff",
            icon: p.icon || "",
            icon_pressed: p.icon_pressed || "",
            icon_size: parseInt(p.icon_size || 40, 10),
            icon_color: p.icon_color || "theme_auto",
            nav_action: p.nav_action || "none"
        };
    } else if (widgetType === "rounded_rect") {
        return {
            fill: (p.fill === "true" || p.fill === "1"),
            show_border: (p.show_border !== "false" && p.show_border !== "0"),
            border_width: parseInt(p.border_width || p.border || 4, 10),
            radius: parseInt(p.radius || 10, 10),
            color: p.color || "theme_auto",
            border_color: p.border_color || "theme_auto",
            opacity: parseInt(p.opacity || 100, 10)
        };
    } else if (widgetType === "shape_circle") {
        return {
            fill: (p.fill === "true" || p.fill === "1"),
            border_width: parseInt(p.border_width || p.border || 1, 10),
            color: p.color || "theme_auto",
            border_color: p.border_color || p.color || "theme_auto",
            opacity: parseInt(p.opacity || 100, 10)
        };
    } else if (widgetType === "line") {
        return {
            stroke_width: parseInt(p.stroke_width || p.stroke || 3, 10),
            color: p.color || "theme_auto",
            orientation: p.orientation || "horizontal"
        };
    } else if (widgetType === "graph") {
        if (p.entity) widget.entity_id = p.entity;
        return {
            duration: p.duration || "1h",
            border: (p.border === "true" || p.border === "1" || p.border == null),
            grid: (p.grid === "true" || p.grid === "1" || p.grid == null),
            color: p.color || "theme_auto",
            background_color: p.background_color || "transparent",
            x_grid: p.x_grid || "",
            y_grid: p.y_grid || "",
            line_thickness: parseInt(p.line_thickness || 3, 10),
            line_type: p.line_type || "SOLID",
            continuous: (p.continuous !== "false" && p.continuous !== "0"),
            min_value: p.min_value || "",
            max_value: p.max_value || "",
            min_range: p.min_range || "",
            max_range: p.max_range || "",
            is_local_sensor: (p.is_local_sensor === "true" || p.local === "true")
        };
    } else if (widgetType === "quote_rss") {
        return {
            feed_url: p.feed_url || "https://www.brainyquote.com/link/quotebr.rss",
            show_author: (p.show_author !== "false"),
            random: (p.random !== "false"),
            refresh_interval: p.refresh_interval || p.refresh || "1h",
            quote_font_size: parseInt(p.quote_font_size || p.quote_font || 18, 10),
            author_font_size: parseInt(p.author_font_size || p.author_font || 14, 10),
            font_family: p.font_family || p.font || "Roboto",
            font_weight: parseInt(p.font_weight || p.weight || 400, 10),
            color: p.color || "theme_auto",
            text_align: p.align || p.text_align || "TOP_LEFT",
            word_wrap: (p.word_wrap !== "false" && p.wrap !== "false"),
            italic_quote: (p.italic_quote !== "false")
        };
    } else if (widgetType === "weather_forecast") {
        return {
            weather_entity: p.weather_entity || "",
            forecast_mode: p.forecast_mode || "daily",
            hourly_slots: p.hourly_slots || "06,09,12,15,18,21",
            start_offset: parseInt(p.start_offset || 0, 10),
            layout: p.layout || "horizontal",
            show_high_low: (p.show_high_low !== "false"),
            day_font_size: parseInt(p.day_font_size || 12, 10),
            temp_font_size: parseInt(p.temp_font_size || 14, 10),
            icon_size: parseInt(p.icon_size || 32, 10),
            font_family: p.font_family || "Roboto",
            color: p.color || "theme_auto"
        };
    } else if (widgetType === "template_sensor_bar") {
        return {
            show_wifi: (p.show_wifi !== "false" && p.wifi !== "false"),
            show_temperature: (p.show_temperature !== "false" && p.temp !== "false"),
            show_humidity: (p.show_humidity !== "false" && p.hum !== "false"),
            show_battery: (p.show_battery !== "false" && p.bat !== "false"),
            show_background: (p.show_background !== "false" && p.bg !== "false"),
            background_color: p.background_color || p.bg_color || "black",
            border_radius: parseInt(p.border_radius || p.radius || 8, 10),
            icon_size: parseInt(p.icon_size || 20, 10),
            font_size: parseInt(p.font_size || 14, 10),
            color: p.color || "white"
        };
    } else if (widgetType === "template_nav_bar") {
        return {
            show_prev: (p.show_prev !== "false" && p.prev !== "false"),
            show_home: (p.show_home !== "false" && p.home !== "false"),
            show_next: (p.show_next !== "false" && p.next !== "false"),
            show_background: (p.show_background !== "false" && p.bg !== "false"),
            background_color: p.background_color || p.bg_color || "black",
            border_radius: parseInt(p.border_radius || p.radius || 8, 10),
            icon_size: parseInt(p.icon_size || 24, 10),
            color: p.color || "white"
        };
    } else if (widgetType === "lvgl_button") {
        if (p.title) widget.title = p.title;
        const color = normalizeColor(p.color || p.text_color, "theme_auto");
        delete props.color;
        delete props.text_color;
        return {
            ...props,
            text: p.text || "Button",
            bg_color: normalizeColor(p.bg_color, "theme_auto_inverse"),
            color,
            font_size: parseInt(p.font_size || 14, 10),
            border_width: parseInt(p.border_width || p.border || 2, 10),
            radius: parseInt(p.radius || 5, 10),
            checkable: (p.checkable === "true")
        };
    } else if (widgetType === "lvgl_arc") {
        if (p.title) {
            widget.title = p.title;
            props.title = p.title;
        }
        return {
            ...props,
            min: parseInt(p.min || 0, 10),
            max: parseInt(p.max || 100, 10),
            value: parseInt(p.value || 50, 10),
            thickness: parseInt(p.thickness || 10, 10),
            color: p.color || "blue",
            start_angle: parseInt(p.start_angle || 135, 10),
            end_angle: parseInt(p.end_angle || 45, 10),
            mode: p.mode || "normal"
        };
    } else if (widgetType === "lvgl_chart") {
        if (p.title) widget.title = p.title;
        return {
            ...props,
            title: p.title || "Chart",
            type: (p.type && p.type !== "lvgl_chart") ? p.type.toLowerCase() : "line",
            color: p.color || "blue",
            bg_color: p.bg_color || "transparent",
            point_count: parseInt(p.point_count || 10, 10),
            x_div_lines: parseInt(p.x_div_lines || 3, 10),
            y_div_lines: parseInt(p.y_div_lines || 3, 10)
        };
    } else if (widgetType === "lvgl_img") {
        return {
            ...props,
            src: p.src || "symbol_image",
            rotation: parseInt(p.rotation || 0, 10),
            scale: parseInt(p.scale || 256, 10),
            pivot_x: parseInt(p.pivot_x || 0, 10),
            pivot_y: parseInt(p.pivot_y || 0, 10),
            color: p.color || "black"
        };
    } else if (widgetType === "lvgl_qrcode") {
        return {
            ...props,
            text: p.text || "https://github.com/koosoli/ESPHomeDesigner/",
            size: parseInt(p.size || 100, 10),
            scale: parseInt(p.scale || 4, 10),
            color: p.color || "black",
            bg_color: p.bg_color || "white"
        };
    } else if (widgetType === "lvgl_bar") {
        return {
            ...props,
            min: parseInt(p.min || 0, 10),
            max: parseInt(p.max || 100, 10),
            value: parseInt(p.value || 50, 10),
            color: p.color || "blue",
            bg_color: p.bg_color || "gray",
            start_value: parseInt(p.start_value || 0, 10),
            mode: p.mode || "normal"
        };
    } else if (widgetType === "lvgl_slider") {
        return {
            ...props,
            min: parseInt(p.min || 0, 10),
            max: parseInt(p.max || 100, 10),
            value: parseInt(p.value || 30, 10),
            border_width: parseInt(p.border_width || 2, 10),
            color: p.color || "blue",
            bg_color: p.bg_color || "gray",
            mode: p.mode || "normal",
            vertical: (p.vertical === "true" || p.vertical === true)
        };
    } else if (widgetType === "lvgl_tabview") {
        return {
            ...props,
            bg_color: p.bg_color || "white",
            tabs: (p.tabs || "Page 1, Page 2, Page 3").split(",").map(t => t.trim()).filter(t => t)
        };
    } else if (widgetType === "lvgl_tileview") {
        return {
            ...props,
            bg_color: p.bg_color || "white",
            tiles: [{ row: 0, column: 0, widgets: [] }]
        };
    } else if (widgetType === "lvgl_led") {
        return {
            ...props,
            color: p.color || "red",
            brightness: parseInt(p.brightness || 255, 10)
        };
    } else if (widgetType === "lvgl_spinner") {
        return {
            ...props,
            spin_time: parseInt(p.spin_time || p.time || 1000, 10),
            arc_length: parseInt(p.arc_length || 60, 10),
            arc_color: p.arc_color || "blue",
            track_color: p.track_color || "white"
        };
    } else if (widgetType === "lvgl_checkbox") {
        return {
            ...props,
            text: (p.text || "Checkbox").replace(/^"|"$/g, ''),
            checked: (p.checked === "true" || p.checked === true),
            color: p.color || "blue"
        };
    } else if (widgetType === "lvgl_dropdown") {
        return {
            ...props,
            options: (p.options || "Option 1\nOption 2\nOption 3").replace(/\\n/g, "\n"),
            selected_index: parseInt(p.selected_index || 0, 10),
            color: p.color || "black",
            direction: p.direction || "DOWN",
            max_height: parseInt(p.max_height || 200, 10)
        };
    } else if (widgetType === "lvgl_keyboard") {
        return {
            ...props,
            mode: p.mode || "TEXT_LOWER",
            textarea_id: p.textarea || ""
        };
    } else if (widgetType === "lvgl_roller") {
        return {
            ...props,
            options: (p.options || "Option A\nOption B\nOption C").replace(/\\n/g, "\n"),
            visible_row_count: parseInt(p.visible_row_count || 3, 10),
            color: p.color || "black",
            bg_color: p.bg_color || "white",
            selected_bg_color: p.selected_bg_color || "blue",
            selected_text_color: p.selected_text_color || "white",
            selected_index: parseInt(p.selected_index || 0, 10),
            mode: p.mode || "normal"
        };
    } else if (widgetType === "lvgl_spinbox") {
        return {
            ...props,
            min: parseInt(p.range_from || p.min || 0, 10),
            max: parseInt(p.range_to || p.max || 100, 10),
            digit_count: parseInt(p.digits || p.digit_count || 4, 10),
            step: parseInt(p.step || 1, 10),
            value: parseInt(p.value || 0, 10)
        };
    } else if (widgetType === "lvgl_buttonmatrix") {
        const bg_color = normalizeColor(p.bg_color, "#444");
        const text_color = normalizeColor(p.text_color || p.color, "white");
        delete props.text_color;
        delete props.bg_color;
        delete props.color;
        return {
            ...props,
            bg_color,
            text_color,
            opa: parseInt(p.opa || 255, 10)
        };
    } else if (widgetType === "lvgl_switch") {
        return {
            ...props,
            checked: (p.state === "true" || p.state === true || p.checked === "true"),
            bg_color: p.bg_color || "gray",
            color: p.color || "blue",
            knob_color: p.knob_color || "white"
        };
    } else if (widgetType === "lvgl_textarea") {
        return {
            ...props,
            placeholder_text: (p.placeholder_text || p.placeholder || "Enter text...").replace(/^"|"$/g, ''),
            text: (p.text || "").replace(/^"|"$/g, ''),
            one_line: (p.one_line === "true" || p.one_line === true),
            max_length: parseInt(p.max_length || 128, 10),
            password_mode: (p.password_mode === "true"),
            accepted_chars: p.accepted_chars || ""
        };
    } else if (widgetType === "lvgl_label") {
        const text_color = normalizeColor(p.text_color || p.color, "theme_auto");
        const bg_color = normalizeColor(p.bg_color, "transparent");
        const border_color = normalizeColor(p.border_color, "theme_auto");
        delete props.text_color;
        delete props.bg_color;
        delete props.border_color;
        delete props.color;
        return {
            ...props,
            text: (p.text || "Label").replace(/^"|"$/g, ''),
            font_size: parseInt(p.font_size || p.size || 20, 10),
            font_family: p.font_family || "Roboto",
            font_weight: parseInt(p.font_weight || 400, 10),
            italic: (p.italic === "true" || p.italic === true),
            text_color,
            border_color,
            bg_color,
            text_align: p.text_align || p.align || "CENTER"
        };
    } else if (widgetType === "lvgl_line") {
        const line_color = normalizeColor(p.line_color || p.color, "theme_auto");
        delete props.color;
        delete props.line_color;
        return {
            ...props,
            orientation: p.orientation || "horizontal",
            points: p.points || "",
            line_width: parseInt(p.line_width || 3, 10),
            line_color,
            opa: parseInt(p.opa || 255, 10),
            line_rounded: (p.line_rounded !== "false")
        };
    } else if (widgetType === "lvgl_meter") {
        return {
            ...props,
            min: parseInt(p.min || 0, 10),
            max: parseInt(p.max || 100, 10),
            value: parseInt(p.value || 0, 10),
            color: p.color || "black",
            indicator_color: p.indicator_color || "red",
            tick_count: parseInt(p.tick_count || 11, 10),
            tick_length: parseInt(p.tick_length || 10, 10),
            label_gap: parseInt(p.label_gap || 10, 10),
            indicator_width: parseInt(p.indicator_width || 4, 10)
        };
    } else if (widgetType === "lvgl_obj") {
        const bg_color = normalizeColor(p.bg_color || p.color, "white");
        const border_color = normalizeColor(p.border_color, "gray");
        delete props.color;
        delete props.bg_color;
        delete props.border_color;
        return {
            ...props,
            bg_color,
            border_width: parseInt(p.border_width || 1, 10),
            border_color,
            radius: parseInt(p.radius || 0, 10),
            fill: p.fill !== "false",
            opacity: parseInt(p.opacity || p.opa || 255, 10)
        };
    } else if (widgetType === "calendar") {
        return {
            entity_id: p.entity || "sensor.esp_calendar_data",
            border_width: parseInt(p.border_width || 0, 10),
            show_border: (p.show_border !== "false"),
            border_color: p.border_color || "theme_auto",
            background_color: p.background_color || "transparent",
            text_color: p.text_color || "theme_auto",
            font_size_date: parseInt(p.font_size_date || 100, 10),
            font_size_day: parseInt(p.font_size_day || 24, 10),
            font_size_grid: parseInt(p.font_size_grid || 14, 10),
            font_size_event: parseInt(p.font_size_event || 18, 10)
        };
    }

    // --- Generic Fallback ---
    if (widgetType.startsWith("lvgl_")) {
        Logger.log("[YAML_IMPORT] Parsing generic LVGL", widgetType, p.id, p);
        const commonKeys = [
            "hidden", "clickable", "checkable", "scrollable", "floating",
            "ignore_layout", "scrollbar_mode", "opa",
            "grid_cell_row_pos", "grid_cell_column_pos",
            "grid_cell_row_span", "grid_cell_column_span",
            "grid_cell_x_align", "grid_cell_y_align"
        ];

        Object.entries(p).forEach(([key, val]) => {
            if (key === "id" || key === "type" || key === "x" || key === "y" || key === "w" || key === "h") return;
            if (commonKeys.includes(key)) return;

            if (key === "title") {
                widget.title = val;
                return;
            }

            let normalizedVal = String(val);
            if (Array.isArray(val)) {
                if (key === "options") normalizedVal = val.join("\n");
                else if (key === "points") normalizedVal = val.map(pt => Array.isArray(pt) ? pt.join(",") : String(pt)).join(" ");
            } else if (typeof val === 'string') {
                // Strip units from numeric values (ms, deg, px, %)
                if (/^-?\d+(\.\d+)?(ms|deg|px|%)$/.test(val)) {
                    normalizedVal = val.replace(/(ms|deg|px|%)$/, "");
                }
                // Handle Unicode escapes
                if (normalizedVal.includes("\\u")) {
                    try { normalizedVal = JSON.parse(`"${normalizedVal}"`); } catch { /* ignore */ }
                }
            }

            if (normalizedVal === "true") props[key] = true;
            else if (normalizedVal === "false") props[key] = false;
            else if (typeof normalizedVal === 'string' && normalizedVal !== "" && !Number.isNaN(Number(normalizedVal)) && !normalizedVal.startsWith("0x") && key !== "text" && key !== "id") {
                props[key] = parseFloat(normalizedVal);
            }
            else props[key] = normalizedVal;
        });
        return props;
    }

    return props;
}
