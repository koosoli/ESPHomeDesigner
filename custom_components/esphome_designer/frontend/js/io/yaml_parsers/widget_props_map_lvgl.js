import { normalizeMappedColor } from './widget_props_map_helpers.js';

/**
 * @typedef {Record<string, any>} WidgetPropSource
 */

/**
 * @param {string} widgetType
 * @param {WidgetPropSource} p
 * @param {WidgetPropSource} widget
 * @param {WidgetPropSource} props
 * @returns {WidgetPropSource | null}
 */
export function buildLvglWidgetProps(widgetType, p, widget, props) {
    if (widgetType === "lvgl_button") {
        if (p.title) widget.title = p.title;
        const color = normalizeMappedColor(p.color || p.text_color, "theme_auto");
        delete props.color;
        delete props.text_color;
        return {
            ...props,
            text: p.text || "Button",
            bg_color: normalizeMappedColor(p.bg_color, "theme_auto_inverse"),
            color,
            font_size: parseInt(p.font_size || 14, 10),
            border_width: parseInt(p.border_width || p.border || 2, 10),
            radius: parseInt(p.radius || 5, 10),
            checkable: (p.checkable === "true")
        };
    }

    if (widgetType === "lvgl_arc") {
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
    }

    if (widgetType === "lvgl_chart") {
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
    }

    if (widgetType === "lvgl_img") {
        return {
            ...props,
            src: p.src || "symbol_image",
            rotation: parseInt(p.rotation || 0, 10),
            scale: parseInt(p.scale || 256, 10),
            pivot_x: parseInt(p.pivot_x || 0, 10),
            pivot_y: parseInt(p.pivot_y || 0, 10),
            color: p.color || "black"
        };
    }

    if (widgetType === "lvgl_qrcode") {
        return {
            ...props,
            text: p.text || "https://github.com/koosoli/ESPHomeDesigner/",
            size: parseInt(p.size || 100, 10),
            scale: parseInt(p.scale || 4, 10),
            color: p.color || "black",
            bg_color: p.bg_color || "white"
        };
    }

    if (widgetType === "lvgl_bar") {
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
    }

    if (widgetType === "lvgl_slider") {
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
    }

    if (widgetType === "lvgl_tabview") {
        return {
            ...props,
            bg_color: p.bg_color || "white",
            tabs: (p.tabs || "Page 1, Page 2, Page 3")
                .split(",")
                .map((/** @type {string} */ tab) => tab.trim())
                .filter((/** @type {string} */ tab) => tab)
        };
    }

    if (widgetType === "lvgl_tileview") {
        return {
            ...props,
            bg_color: p.bg_color || "white",
            tiles: [{ row: 0, column: 0, widgets: [] }]
        };
    }

    if (widgetType === "lvgl_led") {
        return {
            ...props,
            color: p.color || "red",
            brightness: parseInt(p.brightness || 255, 10)
        };
    }

    if (widgetType === "lvgl_spinner") {
        return {
            ...props,
            spin_time: parseInt(p.spin_time || p.time || 1000, 10),
            arc_length: parseInt(p.arc_length || 60, 10),
            arc_color: p.arc_color || "blue",
            track_color: p.track_color || "white"
        };
    }

    if (widgetType === "lvgl_checkbox") {
        return {
            ...props,
            text: (p.text || "Checkbox").replace(/^"|"$/g, ''),
            checked: (p.checked === "true" || p.checked === true),
            color: p.color || "blue"
        };
    }

    if (widgetType === "lvgl_dropdown") {
        return {
            ...props,
            options: (p.options || "Option 1\nOption 2\nOption 3").replace(/\\n/g, "\n"),
            selected_index: parseInt(p.selected_index || 0, 10),
            color: p.color || "black",
            direction: p.direction || "DOWN",
            max_height: parseInt(p.max_height || 200, 10)
        };
    }

    if (widgetType === "lvgl_keyboard") {
        return {
            ...props,
            mode: p.mode || "TEXT_LOWER",
            textarea_id: p.textarea || ""
        };
    }

    if (widgetType === "lvgl_roller") {
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
    }

    if (widgetType === "lvgl_spinbox") {
        return {
            ...props,
            min: parseInt(p.range_from || p.min || 0, 10),
            max: parseInt(p.range_to || p.max || 100, 10),
            digit_count: parseInt(p.digits || p.digit_count || 4, 10),
            step: parseInt(p.step || 1, 10),
            value: parseInt(p.value || 0, 10)
        };
    }

    if (widgetType === "lvgl_buttonmatrix") {
        const bg_color = normalizeMappedColor(p.bg_color, "#444");
        const text_color = normalizeMappedColor(p.text_color || p.color, "white");
        delete props.text_color;
        delete props.bg_color;
        delete props.color;
        return {
            ...props,
            bg_color,
            text_color,
            opa: parseInt(p.opa || 255, 10)
        };
    }

    if (widgetType === "lvgl_switch") {
        return {
            ...props,
            checked: (p.state === "true" || p.state === true || p.checked === "true"),
            bg_color: p.bg_color || "gray",
            color: p.color || "blue",
            knob_color: p.knob_color || "white"
        };
    }

    if (widgetType === "lvgl_textarea") {
        return {
            ...props,
            placeholder_text: (p.placeholder_text || p.placeholder || "Enter text...").replace(/^"|"$/g, ''),
            text: (p.text || "").replace(/^"|"$/g, ''),
            one_line: (p.one_line === "true" || p.one_line === true),
            max_length: parseInt(p.max_length || 128, 10),
            password_mode: (p.password_mode === "true"),
            accepted_chars: p.accepted_chars || ""
        };
    }

    if (widgetType === "lvgl_label") {
        const text_color = normalizeMappedColor(p.text_color || p.color, "theme_auto");
        const bg_color = normalizeMappedColor(p.bg_color, "transparent");
        const border_color = normalizeMappedColor(p.border_color, "theme_auto");
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
    }

    if (widgetType === "lvgl_line") {
        const line_color = normalizeMappedColor(p.line_color || p.color, "theme_auto");
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
    }

    if (widgetType === "lvgl_meter") {
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
    }

    if (widgetType === "lvgl_obj") {
        const bg_color = normalizeMappedColor(p.bg_color || p.color, "white");
        const border_color = normalizeMappedColor(p.border_color, "gray");
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
    }

    return null;
}
