/**
 * @typedef {Record<string, any>} WidgetPropSource
 */

/**
 * @param {string} widgetType
 * @param {WidgetPropSource} p
 * @param {WidgetPropSource} widget
 * @returns {WidgetPropSource | null}
 */
export function buildBasicWidgetProps(widgetType, p, widget) {
    if (widgetType === "icon") {
        return {
            code: p.code || "F07D0",
            size: parseInt(p.size || 48, 10),
            color: p.color || "theme_auto",
            bg_color: p.bg_color || "transparent",
            fit_icon_to_frame: p.fit_icon_to_frame !== "false"
        };
    }

    if (widgetType === "text" || widgetType === "label") {
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
    }

    if (widgetType === "sensor_text") {
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
    }

    if (widgetType === "datetime") {
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
    }

    if (widgetType === "progress_bar") {
        return {
            show_label: (p.show_label !== "false"),
            show_percentage: (p.show_percentage !== "false" && p.show_pct !== "false"),
            bar_height: parseInt(p.bar_height || p.bar_h || 15, 10),
            border_width: parseInt(p.border_width || p.border_w || p.border || 1, 10),
            color: p.color || "theme_auto",
            bg_color: p.bg_color || "white",
            is_local_sensor: (p.is_local_sensor === "true" || p.local === "true")
        };
    }

    if (widgetType === "battery_icon") {
        return {
            size: parseInt(p.size || 36, 10),
            font_size: parseInt(p.font_size || 14, 10),
            color: p.color || "theme_auto",
            is_local_sensor: p.is_local_sensor !== "false",
            fit_icon_to_frame: p.fit_icon_to_frame !== "false"
        };
    }

    if (widgetType === "wifi_signal") {
        return {
            size: parseInt(p.size || 24, 10),
            font_size: parseInt(p.font_size || 12, 10),
            color: p.color || "theme_auto",
            is_local_sensor: p.is_local_sensor !== "false",
            show_dbm: p.show_dbm !== "false",
            fit_icon_to_frame: p.fit_icon_to_frame === "true"
        };
    }

    if (widgetType === "ondevice_temperature") {
        return {
            size: parseInt(p.size || 32, 10),
            font_size: parseInt(p.font_size || 16, 10),
            label_font_size: parseInt(p.label_font_size || 10, 10),
            color: p.color || "black",
            precision: parseInt(p.precision || 1, 10),
            show_label: (p.show_label !== "false"),
            is_local_sensor: (p.is_local_sensor !== "false" && p.local !== "false"),
            fit_icon_to_frame: (p.fit_icon_to_frame !== "false" && p.fit !== "false"),
            ...(p.unit ? { unit: p.unit } : {})
        };
    }

    if (widgetType === "ondevice_humidity") {
        return {
            size: parseInt(p.size || 32, 10),
            font_size: parseInt(p.font_size || 16, 10),
            label_font_size: parseInt(p.label_font_size || 10, 10),
            color: p.color || "black",
            precision: parseInt(p.precision || 0, 10),
            show_label: (p.show_label !== "false"),
            is_local_sensor: (p.is_local_sensor !== "false" && p.local !== "false"),
            fit_icon_to_frame: (p.fit_icon_to_frame !== "false" && p.fit !== "false"),
            ...(p.unit ? { unit: p.unit } : {})
        };
    }

    if (widgetType === "weather_icon") {
        return {
            size: parseInt(p.size || 48, 10),
            color: p.color || "theme_auto"
        };
    }

    if (widgetType === "qr_code") {
        return {
            value: p.value || "https://github.com/koosoli/ESPHomeDesigner/",
            scale: parseInt(p.scale || 2, 10),
            ecc: p.ecc || "LOW",
            color: p.color || "theme_auto"
        };
    }

    if (widgetType === "image") {
        return {
            path: (p.path || "/config/esphome/images/logo.png").replace(/^"|"$/g, ''),
            invert: (p.invert === "true" || p.invert === "1"),
            dither: p.dither || "FLOYDSTEINBERG",
            transparency: p.transparency || "",
            image_type: p.img_type || "BINARY",
            render_mode: p.render_mode || "Auto"
        };
    }

    if (widgetType === "online_image") {
        return {
            url: p.url || "",
            invert: (p.invert === "true" || p.invert === "1"),
            interval_s: parseInt(p.interval || 300, 10),
            render_mode: p.render_mode || "Auto"
        };
    }

    if (widgetType === "puppet") {
        return {
            image_url: p.url || "",
            invert: (p.invert === "true" || p.invert === "1"),
            image_type: p.img_type || "RGB565",
            transparency: p.transparency || "opaque",
            render_mode: p.render_mode || "Auto"
        };
    }

    if (widgetType === "shape_rect") {
        return {
            fill: (p.fill === "true" || p.fill === "1"),
            border_width: parseInt(p.border_width || p.border || 1, 10),
            color: p.color || "theme_auto",
            border_color: p.border_color || p.color || "theme_auto",
            opacity: parseInt(p.opacity || 100, 10)
        };
    }

    if (widgetType === "touch_area") {
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
    }

    if (widgetType === "rounded_rect") {
        return {
            fill: (p.fill === "true" || p.fill === "1"),
            show_border: (p.show_border !== "false" && p.show_border !== "0"),
            border_width: parseInt(p.border_width || p.border || 4, 10),
            radius: parseInt(p.radius || 10, 10),
            color: p.color || "theme_auto",
            border_color: p.border_color || "theme_auto",
            opacity: parseInt(p.opacity || 100, 10)
        };
    }

    if (widgetType === "shape_circle") {
        return {
            fill: (p.fill === "true" || p.fill === "1"),
            border_width: parseInt(p.border_width || p.border || 1, 10),
            color: p.color || "theme_auto",
            border_color: p.border_color || p.color || "theme_auto",
            opacity: parseInt(p.opacity || 100, 10)
        };
    }

    if (widgetType === "line") {
        return {
            stroke_width: parseInt(p.stroke_width || p.stroke || 3, 10),
            color: p.color || "theme_auto",
            orientation: p.orientation || "horizontal"
        };
    }

    if (widgetType === "graph") {
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
    }

    if (widgetType === "quote_rss") {
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
    }

    if (widgetType === "weather_forecast") {
        return {
            weather_entity: p.weather_entity || "",
            forecast_mode: p.forecast_mode || "daily",
            hourly_mode: p.hourly_mode || "fixed",
            relative_count: parseInt(p.relative_count || 5, 10),
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
    }

    if (widgetType === "template_sensor_bar") {
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
    }

    if (widgetType === "template_nav_bar") {
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
    }

    if (widgetType === "calendar") {
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

    return null;
}
