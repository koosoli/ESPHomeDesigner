/**
 * LVGL Configuration Generator
 * Handles generating ESPHome YAML for LVGL component, including hybrid mapping of native widgets.
 */

function generateLVGLSnippet(pages, deviceModel) {
    const lines = [];
    const profile = window.DEVICE_PROFILES ? (window.DEVICE_PROFILES[deviceModel] || {}) : {};

    // 1. Generate Global Config (Display settings for LVGL)
    lines.push("# ============================================================================");
    lines.push("# LVGL Configuration");
    lines.push("# ============================================================================");
    lines.push("");

    lines.push("lvgl:");
    lines.push("  id: my_lvgl");
    lines.push("  log_level: WARN");
    lines.push("  bg_color: 0xFFFFFF");
    lines.push("  displays:");

    // Dynamic display ID based on device type
    const displayId = profile.features?.lcd ? "my_display" : "epaper_display";
    lines.push(`    - ${displayId}`);

    // Configure touchscreen if device supports it
    if (profile.touch) {
        lines.push("  touchscreens:");
        lines.push("    - my_touchscreen");
    } else {
        lines.push("  touchscreens: []");
    }
    lines.push("");

    // 2. Widget Processing & Transpilation
    lines.push("  pages:");

    pages.forEach((page, pageIndex) => {
        lines.push(`    - id: page_${pageIndex}`);

        // Add grid layout if page has one
        if (page.layout && /^\d+x\d+$/.test(page.layout)) {
            lines.push(`      layout: ${page.layout}`);
        }

        lines.push(`      widgets:`);

        const widgets = page.widgets || [];
        if (widgets.length === 0) {
            lines.push("        []");
            return;
        }

        widgets.forEach(w => {
            // Generate widget marker comment for import/parsing
            lines.push(`        ${serializeWidget(w)}`);

            const lvglWidget = transpileToLVGL(w, profile);
            if (lvglWidget) {
                // Determine widget type key (e.g., 'label:', 'obj:', 'button:')
                const typeKey = Object.keys(lvglWidget)[0];
                const props = lvglWidget[typeKey];

                lines.push(`        - ${typeKey}:`);
                // Recursive YAML serialization
                serializeYamlObject(props, lines, 12);
            }
        });
    });

    return lines;
}

/**
 * Recursively serializes a JS object/array to YAML lines
 */
function serializeYamlObject(obj, lines, indentLevel) {
    const spaces = " ".repeat(indentLevel);

    Object.entries(obj).forEach(([key, val]) => {
        if (val === undefined || val === null || val === "") return;

        if (Array.isArray(val)) {
            if (val.length === 0) {
                lines.push(`${spaces}${key}: []`);
            } else {
                lines.push(`${spaces}${key}:`);
                val.forEach(item => {
                    if (typeof item === 'object') {
                        lines.push(`${spaces}  -`);
                        // Increase indent for array item properties
                        serializeYamlObject(item, lines, indentLevel + 4);
                    } else {
                        lines.push(`${spaces}  - ${item}`);
                    }
                });
            }
        } else if (typeof val === 'object') {
            lines.push(`${spaces}${key}:`);
            serializeYamlObject(val, lines, indentLevel + 2);
        } else {
            lines.push(`${spaces}${key}: ${val}`);
        }
    });
}


/**
 * Serializes a widget to the // widget:type ... format used by yaml_import.js
 */
function serializeWidget(w) {
    const parts = [`// widget:${w.type}`];

    // Core properties
    parts.push(`id:${w.id}`);
    parts.push(`type:${w.type}`); // Ensure type is explicitly listed for parsers that expect it
    parts.push(`x:${Math.round(w.x)}`);
    parts.push(`y:${Math.round(w.y)}`);
    parts.push(`w:${Math.round(w.width)}`);
    parts.push(`h:${Math.round(w.height)}`);

    // Widget specific properties
    if (w.title) parts.push(`title:"${w.title}"`);
    if (w.entity_id) parts.push(`entity:${w.entity_id}`);

    // Props
    if (w.props) {
        Object.entries(w.props).forEach(([k, v]) => {
            if (v === undefined || v === null) return;

            // Handle arrays and objects in marker comments
            if (typeof v === 'object') {
                try {
                    const jsonStr = JSON.stringify(v);
                    parts.push(`${k}:'${jsonStr}'`);
                } catch (e) {
                    // Skip if cyclic or too complex
                }
                return;
            }

            const valStr = String(v);
            if (typeof v === 'number') {
                parts.push(`${k}:${v}`);
            } else if (valStr.includes(' ') || valStr === "" || valStr.includes('\n')) {
                parts.push(`${k}:"${valStr.replace(/\n/g, '\\n')}"`);
            } else {
                parts.push(`${k}:${valStr}`);
            }
        });
    }

    return parts.join(' ');
}

/**
 * Transpiles a designer widget JSON to an LVGL YAML object
 * @param {Object} w - The widget object
 * @param {Object} profile - The device profile (for touch detection)
 */
function transpileToLVGL(w, profile) {
    const p = w.props || {};
    const x = Math.round(w.x);
    const y = Math.round(w.y);
    const w_w = Math.round(w.width);
    const w_h = Math.round(w.height);
    const hasTouch = profile && profile.touch;

    // Grid cell properties (only include when explicitly set)
    const gridCellProps = {};
    if (p.grid_cell_row_pos != null) {
        gridCellProps.grid_cell_row_pos = p.grid_cell_row_pos;
    }
    if (p.grid_cell_column_pos != null) {
        gridCellProps.grid_cell_column_pos = p.grid_cell_column_pos;
    }
    if (p.grid_cell_row_span && p.grid_cell_row_span > 1) {
        gridCellProps.grid_cell_row_span = p.grid_cell_row_span;
    }
    if (p.grid_cell_column_span && p.grid_cell_column_span > 1) {
        gridCellProps.grid_cell_column_span = p.grid_cell_column_span;
    }
    if (p.grid_cell_x_align && p.grid_cell_x_align !== "STRETCH") {
        gridCellProps.grid_cell_x_align = p.grid_cell_x_align;
    }
    if (p.grid_cell_y_align && p.grid_cell_y_align !== "STRETCH") {
        gridCellProps.grid_cell_y_align = p.grid_cell_y_align;
    }

    // Only include x/y if grid position is NOT explicitly set
    const hasGridPosition = p.grid_cell_row_pos != null && p.grid_cell_column_pos != null;

    const common = {
        x: hasGridPosition ? undefined : x,
        y: hasGridPosition ? undefined : y,
        width: w_w,
        height: w_h,
        ...gridCellProps,  // Spread grid cell properties
        hidden: p.hidden || undefined,
        clickable: p.clickable === false ? false : undefined,
        checkable: p.checkable || undefined,
        scrollable: p.scrollable === false ? false : undefined,
        floating: p.floating || undefined,
        ignore_layout: p.ignore_layout || undefined,
        scrollbar_mode: p.scrollbar_mode !== "AUTO" ? p.scrollbar_mode : undefined
    };

    switch (w.type) {
        case "text":
        case "label":
            return {
                label: {
                    ...common,
                    text: `"${p.text || 'Text'}"`,
                    text_font: getLVGLFont(p.font_family, p.font_size, p.font_weight, p.italic),
                    text_color: convertColor(p.color),
                    text_align: convertAlign(p.text_align)
                }
            };

        case "lvgl_button":
            const btnObj = {
                button: {
                    ...common,
                    bg_color: convertColor(p.bg_color),
                    bg_opa: "COVER",
                    border_width: p.border_width,
                    border_color: convertColor(p.color),
                    radius: p.radius,
                    opa: p.opa,
                    widgets: [
                        {
                            label: {
                                align: "CENTER",
                                text: `"${p.text || 'BTN'}"`,
                                text_color: convertColor(p.color)
                            }
                        }
                    ]
                }
            };

            if (w.entity_id) {
                const safeEntity = w.entity_id.trim();
                let action = [];

                if (safeEntity.startsWith("switch.") || safeEntity.startsWith("light.") || safeEntity.startsWith("fan.") || safeEntity.startsWith("input_boolean.")) {
                    action = [
                        {
                            "homeassistant.service": {
                                service: "homeassistant.toggle",
                                entity_id: safeEntity
                            }
                        }
                    ];
                } else if (safeEntity.startsWith("script.")) {
                    action = [
                        { "script.execute": safeEntity }
                    ];
                } else if (safeEntity.startsWith("button.") || safeEntity.startsWith("input_button.")) {
                    action = [
                        { "button.press": safeEntity }
                    ];
                } else if (safeEntity.startsWith("scene.")) {
                    action = [
                        { "scene.turn_on": safeEntity }
                    ];
                } else {
                    // Default fallback
                    action = [
                        {
                            "homeassistant.service": {
                                service: "homeassistant.toggle",
                                entity_id: safeEntity
                            }
                        }
                    ];
                }

                btnObj.button.on_click = action;
            }

            return btnObj;

        case "lvgl_arc":
            let arcValue = p.value || 0;
            if (w.entity_id) {
                const safeId = w.entity_id.replace(/^sensor\./, "").replace(/[^a-zA-Z0-9_]/g, "_");
                arcValue = `!lambda "return id(${safeId}).state;"`;
            }

            return {
                arc: {
                    ...common,
                    value: arcValue,
                    min_value: p.min || 0,
                    max_value: p.max || 100,
                    arc_width: p.thickness,
                    arc_color: convertColor(p.color),
                    indicator: {
                        arc_color: convertColor(p.color) // Active part color
                    },
                    start_angle: p.start_angle,
                    end_angle: p.end_angle,
                    mode: p.mode,
                    widgets: [
                        {
                            label: {
                                align: "CENTER",
                                text: `"${p.title || ''}"`,
                                text_color: convertColor(p.color)
                            }
                        }
                    ]
                }
            };

        case "lvgl_chart":
        case "graph":
            return {
                chart: {
                    ...common,
                    type: p.type || "LINE",
                    style: {
                        bg_color: convertColor(p.bg_color || "white"),
                        border_color: convertColor(p.color),
                        border_width: 1,
                        opa: p.opa
                    },
                    point_count: p.point_count,
                    div_line_count: p.x_div_lines !== undefined || p.y_div_lines !== undefined ? {
                        x: p.x_div_lines,
                        y: p.y_div_lines
                    } : undefined,
                    items: [
                        { // Dataset
                            line_color: convertColor(p.color),
                            points: [0, 20, 50, 30, 80, 60, 40, 90, 50, 70] // Mock data
                        }
                    ],
                    widgets: [
                        {
                            label: {
                                align: "TOP_MID",
                                text: `"${p.title || 'Graph'}"`,
                                text_color: convertColor(p.color)
                            }
                        }
                    ]
                }
            };

        case "lvgl_img":
        case "image":
        case "online_image":
            // ... (keep logic, but verify src) ...
            let src = (p.src || p.path || p.url || "symbol_image");
            // Standard ESPHome LVGL expects an ID of an image: component or a symbol
            // We can't easily auto-generate the image: component from here without global context,
            // so we'll warn or default if it looks like a URL/path that isn't registered.
            // For now, allow it to pass through, assuming user might have defined it.
            return {
                img: {
                    ...common,
                    src: src,
                    angle: (p.rotation || 0),
                    pivot_x: (p.pivot_x || 0),
                    pivot_y: (p.pivot_y || 0),
                    image_recolor: convertColor(p.color),
                    image_recolor_opa: "COVER"
                }
            };

        case "lvgl_qrcode":
        case "qr_code":
            return {
                qrcode: {
                    ...common,
                    text: `"${p.text || p.value || 'https://esphome.io'}"`,
                    size: Math.min(w_w, w_h),
                    dark_color: convertColor(p.color),
                    light_color: convertColor(p.bg_color || "white")
                }
            };

        case "lvgl_bar":
        case "progress_bar":
            let barValue = p.value || 0;
            if (w.entity_id) {
                const safeId = w.entity_id.replace(/^sensor\./, "").replace(/[^a-zA-Z0-9_]/g, "_");
                barValue = `!lambda "return id(${safeId}).state;"`;
            }
            return {
                bar: {
                    ...common,
                    min_value: p.min || 0,
                    max_value: p.max || 100,
                    value: barValue,
                    bg_color: convertColor(p.bg_color || "gray"),
                    indicator: {
                        bg_color: convertColor(p.color), // Bar color
                    },
                    start_value: p.start_value,
                    mode: p.mode
                }
            };

        case "lvgl_slider":
            let sliderValue = p.value || 30;
            const sliderObj = {
                slider: {
                    ...common,
                    min_value: p.min || 0,
                    max_value: p.max || 100,
                    value: sliderValue,
                    border_width: p.border_width,
                    bg_color: convertColor(p.bg_color || "gray"),
                    indicator: {
                        bg_color: convertColor(p.color)
                    },
                    knob: {
                        bg_color: convertColor(p.color),
                        border_width: 2,
                        border_color: "0xFFFFFF"
                    },
                    mode: p.mode
                }
            };

            // Add HA interaction if entity is set and device has touch
            if (w.entity_id && hasTouch) {
                sliderObj.slider.on_value = [
                    {
                        "homeassistant.service": {
                            service: "number.set_value",
                            data: {
                                entity_id: w.entity_id,
                                value: "!lambda 'return x;'"
                            }
                        }
                    }
                ];
            }

            return sliderObj;

        // ... (Line, Rect, etc. can stay as is, they are simple) ... 
        case "line":
            return {
                line: {
                    x: x,
                    y: y,
                    width: w_w,
                    height: w_h,
                    style: {
                        line_width: p.stroke_width,
                        line_color: convertColor(p.color),
                        line_opa: p.opa
                    },
                    points: [
                        [0, w_h / 2],
                        [w_w, w_h / 2]
                    ]
                }
            };

        case "shape_rect":
            return {
                obj: { // 'obj' is the base object, good for rectangles
                    ...common,
                    bg_color: convertColor(p.color),
                    bg_opa: p.fill ? "COVER" : "TRANSP",
                    border_width: p.border_width,
                    border_color: convertColor(p.color),
                    radius: 0,
                    opa: p.opa
                }
            };

        case "rounded_rect":
            return {
                obj: {
                    ...common,
                    bg_color: convertColor(p.color),
                    bg_opa: p.fill ? "COVER" : "TRANSP",
                    border_width: p.border_width,
                    border_color: convertColor(p.color),
                    radius: p.radius,
                    opa: p.opa
                }
            };

        case "lvgl_obj":
            return {
                obj: {
                    ...common,
                    bg_color: convertColor(p.color),
                    bg_opa: "COVER",
                    border_width: p.border_width,
                    border_color: convertColor(p.border_color),
                    radius: p.radius,
                    opa: p.opa
                }
            };

        case "lvgl_label":
            return {
                label: {
                    ...common,
                    text: `"${p.text || 'Label'}"`,
                    text_font: getLVGLFont(p.font_family, p.font_size, p.font_weight, p.italic),
                    text_color: convertColor(p.color),
                    bg_color: p.bg_color === "transparent" ? undefined : convertColor(p.bg_color),
                    text_align: convertAlign(p.text_align),
                    opa: p.opa
                }
            };

        case "lvgl_line":
            let pointsArr;
            const orientation = p.orientation || "horizontal";

            // If points are manually specified (and old style), use them. 
            // BUT, if we are in new "Like non-LVGL" mode, we generate based on w/h.
            // Presence of 'orientation' property is a good indicator of new mode.
            if (p.points && !p.orientation) {
                if (Array.isArray(p.points)) {
                    pointsArr = p.points.map(pt => {
                        if (Array.isArray(pt)) return pt;
                        const [px, py] = String(pt).split(",").map(Number);
                        return [px, py];
                    });
                } else if (typeof p.points === 'string') {
                    pointsArr = p.points.split(" ").map(pt => {
                        const [px, py] = pt.split(",").map(Number);
                        return [px, py];
                    });
                }
            } else {
                // Generate points from dimensions
                const lw = p.line_width || 3;
                if (orientation === "vertical") {
                    // Vertical: Center X, from 0 to H
                    // Make sure X is 0 relative to widget
                    pointsArr = [[0, 0], [0, w_h]];
                } else {
                    // Horizontal: Center Y, from 0 to W
                    pointsArr = [[0, 0], [w_w, 0]];
                }
            }

            return {
                line: {
                    ...common,
                    points: pointsArr,
                    line_width: p.line_width || 3,
                    line_color: convertColor(p.line_color || p.color),
                    line_rounded: p.line_rounded !== false,
                    line_opa: p.opa
                }
            };

        case "lvgl_meter":
            let meterValue = p.value || 0;
            if (w.entity_id) {
                const safeId = w.entity_id.replace(/^sensor\./, "").replace(/[^a-zA-Z0-9_]/g, "_");
                meterValue = `!lambda "return id(${safeId}).state;"`;
            }
            return {
                meter: {
                    ...common,
                    scales: {
                        range_from: p.min || 0,
                        range_to: p.max || 100,
                        angle_range: 240,
                        ticks: {
                            count: p.tick_count || 11,
                            length: p.tick_length || 10,
                            color: convertColor(p.color),
                            width: 2
                        },
                        scale_width: p.scale_width || 10,
                        indicators: [
                            {
                                line: {
                                    color: convertColor(p.indicator_color || "red"),
                                    r_mod: -4,
                                    width: p.indicator_width || 4,
                                    value: meterValue,
                                    color: convertColor(p.indicator_color)
                                }
                            }
                        ]
                    },
                    opa: p.opa
                }
            };

        case "lvgl_tabview":
            return {
                tabview: {
                    ...common,
                    bg_color: convertColor(p.bg_color),
                    tabs: (Array.isArray(p.tabs) ? p.tabs : ["Tab 1"]).map(t => {
                        if (typeof t === 'object' && t !== null) return t;
                        return { name: String(t) };
                    })
                }
            };

        case "lvgl_tileview":
            return {
                tileview: {
                    ...common,
                    bg_color: convertColor(p.bg_color),
                    tiles: (p.tiles || []).map(t => ({
                        id: t.id,
                        row: t.row,
                        column: t.col || t.column
                    }))
                }
            };

        case "lvgl_led":
            return {
                led: {
                    ...common,
                    color: convertColor(p.color),
                    brightness: p.brightness,
                    opa: p.opa
                }
            };

        case "lvgl_spinner":
            return {
                spinner: {
                    ...common,
                    spin_time: (p.spin_time || 1000) + "ms",
                    arc_length: (p.arc_length || 60) + "deg",
                    arc_color: convertColor(p.arc_color),
                    track_color: convertColor(p.track_color),
                    opa: p.opa
                }
            };

        case "lvgl_buttonmatrix":
            const btnMatrixRows = (Array.isArray(p.rows) ? p.rows : []).map(r => ({
                buttons: (Array.isArray(r.buttons) ? r.buttons : []).map((b, i) => {
                    if (typeof b === 'object' && b !== null) return b;
                    return {
                        id: `btn_${i}`,
                        text: String(b)
                    };
                })
            }));
            return {
                buttonmatrix: {
                    ...common,
                    rows: btnMatrixRows,
                    opa: p.opa
                }
            };

        case "lvgl_checkbox":
            const checkboxObj = {
                checkbox: {
                    ...common,
                    text: `"${p.text || 'Checkbox'}"`,
                    checked: p.checked,
                    opa: p.opa
                }
            };

            // Add HA interaction if entity is set and device has touch
            if (w.entity_id && hasTouch) {
                checkboxObj.checkbox.on_value = [
                    {
                        "homeassistant.service": {
                            service: "input_boolean.toggle",
                            data: { entity_id: w.entity_id }
                        }
                    }
                ];
            }

            return checkboxObj;

        case "lvgl_dropdown":
            let dropdownOptions = p.options || "";
            if (Array.isArray(dropdownOptions)) {
                dropdownOptions = dropdownOptions.map(String);
            } else {
                dropdownOptions = String(dropdownOptions).split("\n").filter(o => o.trim() !== "");
            }
            return {
                dropdown: {
                    ...common,
                    options: dropdownOptions,
                    selected_index: p.selected_index,
                    style: {
                        text_color: convertColor(p.color)
                    },
                    direction: p.direction,
                    max_height: p.max_height,
                    opa: p.opa
                }
            };

        case "lvgl_keyboard":
            return {
                keyboard: {
                    ...common,
                    mode: p.mode,
                    textarea: p.textarea_id, // Link to textarea
                    opa: p.opa
                }
            };

        case "lvgl_roller":
            let rollerOptions = p.options || "";
            if (Array.isArray(rollerOptions)) {
                rollerOptions = rollerOptions.map(String);
            } else {
                rollerOptions = String(rollerOptions).split("\n").filter(o => o.trim() !== "");
            }
            return {
                roller: {
                    ...common,
                    options: rollerOptions,
                    visible_row_count: p.visible_row_count,
                    bg_color: convertColor(p.bg_color),
                    text_color: convertColor(p.color),
                    selected: {
                        bg_color: convertColor(p.selected_bg_color),
                        text_color: convertColor(p.selected_text_color)
                    },
                    mode: p.mode,
                    opa: p.opa
                }
            };

        case "lvgl_spinbox":
            return {
                spinbox: {
                    ...common,
                    range_from: p.min,
                    range_to: p.max,
                    digits: p.digit_count,
                    step: p.step,
                    value: p.value,
                    opa: p.opa
                }
            };

        case "lvgl_switch":
            const switchObj = {
                switch: {
                    ...common,
                    state: p.checked,
                    bg_color: convertColor(p.bg_color),
                    indicator: {
                        bg_color: convertColor(p.color)
                    },
                    knob: {
                        bg_color: convertColor(p.knob_color)
                    },
                    opa: p.opa
                }
            };

            // Add HA interaction if entity is set and device has touch
            if (w.entity_id && hasTouch) {
                switchObj.switch.on_value = [
                    {
                        "homeassistant.service": {
                            service: "homeassistant.toggle",
                            data: { entity_id: w.entity_id }
                        }
                    }
                ];
            }

            return switchObj;

        case "lvgl_textarea":
            return {
                textarea: {
                    ...common,
                    placeholder_text: `"${p.placeholder || ''}"`,
                    text: `"${p.text || ''}"`,
                    one_line: p.one_line,
                    max_length: p.max_length || undefined,
                    password_mode: p.password_mode || undefined,
                    accepted_chars: p.accepted_chars ? `"${p.accepted_chars}"` : undefined,
                    opa: p.opa
                }
            };

        default:
            // Fallback for unsupported widgets in hybrid mode
            // Still generate a basic obj so widget appears in YAML
            if (w.type && w.type.startsWith("lvgl_")) {
                return {
                    obj: {
                        ...common,
                        bg_color: convertColor(p.bg_color || p.color || "white")
                    }
                };
            }
            return null; // Skip non-LVGL widgets
    }
}

// Helpers

function convertColor(colorName) {
    // Map basic CSS colors to Hex, defaults to black
    const map = {
        "black": "0x000000",
        "white": "0xFFFFFF",
        "red": "0xFF0000",
        "green": "0x00FF00",
        "blue": "0x0000FF",
        "yellow": "0xFFFF00",
        "gray": "0x808080"
    };
    if (map[colorName]) return map[colorName];
    if (colorName && colorName.startsWith("#")) return "0x" + colorName.substring(1);
    return "0x000000";
}

function convertAlign(align) {
    if (!align) return "TOP_LEFT";
    if (align.includes("CENTER")) return "CENTER";
    if (align.includes("RIGHT")) return "top_right";
    return align;
}

function getLVGLFont(family, size, weight, italic) {
    // Return a font ID that matches our generated fonts
    // e.g., font_roboto_400_20
    const f = (family || "Roboto").toLowerCase().replace(/\s+/g, "_");
    const w = weight || 400;
    const s = size || 20;
    const i = italic ? "_italic" : "";
    return `font_${f}_${w}_${s}${i}`;
}

// Global export
window.generateLVGLSnippet = generateLVGLSnippet;
window.hasLVGLWidgets = (pages) => {
    for (const p of pages) {
        if (p.widgets) {
            for (const w of p.widgets) {
                if (w.type.startsWith("lvgl_")) return true;
            }
        }
    }
    return false;
};
