/**
 * Parses an ESPHome YAML snippet offline to extract the layout.
 * @param {string} yamlText - The YAML string to parse.
 * @returns {Object} The parsed layout object containing pages and settings.
 */
function parseSnippetYamlOffline(yamlText) {
    console.log("[parseSnippetYamlOffline] Start parsing...");
    const lines = yamlText.split(/\r?\n/);
    const lambdaLines = [];
    let inLambda = false;
    let lambdaIndent = 0;

    for (const rawLine of lines) {
        const line = rawLine.replace(/\t/g, "    ");

        if (!inLambda && line.match(/^\s*lambda:\s*\|\-/)) {
            console.log("[parseSnippetYamlOffline] Found lambda start");
            inLambda = true;
            continue;
        }

        // Implicit LVGL mode detection (allow indentation just in case)
        if (!inLambda && line.match(/^\s*lvgl:/)) {
            console.log("[parseSnippetYamlOffline] Found LVGL block start");
            inLambda = true;
            lambdaIndent = 0;
            continue;
        }

        if (inLambda) {
            if (!line.trim()) {
                lambdaLines.push("");
                continue;
            }

            const indentMatch = line.match(/^(\s+)/);

            if (!indentMatch) {
                // Line has 0 indent.
                // If it's a root key (like "sensor:"), we exit.
                // BUT ensure strictly that it looks like a key (ends with :)
                if (line.match(/^\w+:/)) {
                    console.log("[parseSnippetYamlOffline] Exiting lambda/LVGL block: hit root key", line.trim());
                    inLambda = false;
                    continue;
                }
            }

            // Standard Lambda indentation stripping logic
            if (indentMatch) {
                const indentLen = indentMatch[1].length;
                if (lambdaIndent === 0) {
                    lambdaIndent = indentLen;
                    console.log(`[parseSnippetYamlOffline] Setting lambdaIndent to ${lambdaIndent}`);
                }

                if (indentLen < lambdaIndent) {
                    console.log("[parseSnippetYamlOffline] Exiting lambda/LVGL block: dedent", line.trim());
                    inLambda = false;
                    continue;
                }

                const stripped = line.slice(lambdaIndent);
                lambdaLines.push(stripped);
            } else {
                // No indent, and not a root key? Probably implicit exit or empty line handled above.
                if (line.match(/^\s*$/)) continue; // extra safety

                // If we are here, it's a non-empty line with 0 indent that didn't look like a root key.
                // It might be part of a multi-line string? 
                // For safety in LVGL mode, if we haven't set lambdaIndent yet (still 0), maybe this IS the content?
                if (lambdaIndent === 0) {
                    lambdaLines.push(line);
                } else {
                    console.log("[parseSnippetYamlOffline] Exiting lambda/LVGL block: 0 indent content", line.trim());
                    inLambda = false;
                }
                continue;
            }
        }
    }

    // Existing ignore logic ...
    while (lines.length && lines[0].match(/^\s*#\s*Local preview snippet/)) {
        lines.shift();
    }
    while (lines.length && lines[lines.length - 1].match(/^\s*#\s*Backend unreachable/)) {
        lines.pop();
    }

    console.log(`[parseSnippetYamlOffline] Collected ${lambdaLines.length} info lines`);

    const pageMap = new Map();
    const intervalMap = new Map();
    const nameMap = new Map();
    const darkModeMap = new Map(); // Per-page dark mode setting
    const refreshTypeMap = new Map();
    const refreshTimeMap = new Map();
    let currentPageIndex = null;

    for (const line of lambdaLines) {
        // Native Lambda page check
        let pageMatch = line.match(/if\s*\(\s*(?:id\s*\(\s*display_page\s*\)|page|currentPage)\s*==\s*(\d+)\s*\)/);
        if (pageMatch) {
            currentPageIndex = parseInt(pageMatch[1], 10);
            if (!pageMap.has(currentPageIndex)) {
                pageMap.set(currentPageIndex, []);
            }
        }

        // LVGL Page check
        // Looking for: "    - id: page_0"
        const lvglPageMatch = line.match(/^\s*-\s*id:\s*page_(\d+)/);
        if (lvglPageMatch) {
            currentPageIndex = parseInt(lvglPageMatch[1], 10);
            if (!pageMap.has(currentPageIndex)) {
                pageMap.set(currentPageIndex, []);
            }
            console.log(`[parseSnippetYamlOffline] Detected LVGL Page: ${currentPageIndex}`);
        }

        const intervalMatch = line.match(/case\s+(\d+):\s*interval\s*=\s*(\d+);/);
        if (intervalMatch) {
            const idx = parseInt(intervalMatch[1], 10);
            const val = parseInt(intervalMatch[2], 10);
            intervalMap.set(idx, val);
            // Ensure page exists in map even if no widgets yet
            if (!pageMap.has(idx)) {
                pageMap.set(idx, []);
            }
        }

        const nameMatch = line.match(/\/\/\s*page:name\s+"(.+)"/);
        if (nameMatch && currentPageIndex !== null) {
            nameMap.set(currentPageIndex, nameMatch[1]);
        }

        // Parse per-page dark mode setting
        const darkModeMatch = line.match(/\/\/\s*page:dark_mode\s+"(.+)"/);
        if (darkModeMatch && currentPageIndex !== null) {
            darkModeMap.set(currentPageIndex, darkModeMatch[1]);
        }

        const refreshTypeMatch = line.match(/\/\/\s*page:refresh_type\s+"(.+)"/);
        if (refreshTypeMatch && currentPageIndex !== null) {
            refreshTypeMap.set(currentPageIndex, refreshTypeMatch[1]);
        }

        const refreshTimeMatch = line.match(/\/\/\s*page:refresh_time\s+"(.*)"/);
        if (refreshTimeMatch && currentPageIndex !== null) {
            refreshTimeMap.set(currentPageIndex, refreshTimeMatch[1]);
        }
    }

    if (pageMap.size === 0) {
        pageMap.set(0, []);
    }

    const layout = {
        settings: {
            orientation: "landscape",
            dark_mode: false
        },
        pages: Array.from(pageMap.entries()).sort((a, b) => a[0] - b[0]).map(([idx, _]) => ({
            id: `page_${idx}`,
            name: nameMap.has(idx) ? nameMap.get(idx) : `Page ${idx + 1}`,
            refresh_s: intervalMap.has(idx) ? intervalMap.get(idx) : null,
            refresh_type: refreshTypeMap.has(idx) ? refreshTypeMap.get(idx) : "interval",
            refresh_time: refreshTimeMap.has(idx) ? refreshTimeMap.get(idx) : "",
            dark_mode: darkModeMap.has(idx) ? darkModeMap.get(idx) : "inherit",
            widgets: []
        }))
    };


    currentPageIndex = 0;

    function getCurrentPageWidgets() {
        // Fallback to 0 if page not found (could happen during init)
        const page = layout.pages.find((p, idx) => idx === currentPageIndex);
        return page ? page.widgets : layout.pages[0].widgets;
    }

    function parseWidgetMarker(comment) {
        // Relaxed regex: allow any spacing
        const match = comment.match(/^\/\/\s*widget:(\w+)\s+(.+)$/);
        if (!match) {
            if (comment.startsWith("// widget:")) {
                console.warn("[parseWidgetMarker] Regex failed for:", comment);
            }
            return null;
        }

        const widgetType = match[1];
        const propsStr = match[2];
        const props = {};

        console.log(`[parseWidgetMarker] Found widget: ${widgetType}`);

        // Improved regex to handle:
        // 1. Quoted strings: key:"value with spaces"
        // 2. Unquoted values: key:value
        // 3. Unquoted values at the end of string: key:value with spaces
        const regex = /(\w+):(?:"([^"]*)"|([^:]*?)(?=\s+\w+:|$))/g;
        let m;
        while ((m = regex.exec(propsStr)) !== null) {
            let value = m[2] !== undefined ? m[2] : m[3];
            if (value) {
                value = value.trim();
            }
            props[m[1]] = value;
        }

        return { widgetType, props };
    }

    let skipRendering = false;

    for (const cmd of lambdaLines) {
        const trimmed = cmd.trim();
        if (!trimmed || trimmed.startsWith("#")) continue;

        // Native Lambda Page Check
        let pageMatch = trimmed.match(/if\s*\(\s*(?:id\s*\(\s*display_page\s*\)|page|currentPage)\s*==\s*(\d+)\s*\)/);
        if (pageMatch) {
            currentPageIndex = parseInt(pageMatch[1], 10);
            continue;
        }

        // LVGL Page Check (raw line check from lambdaLines loop context, but trimmed here)
        // We need to match "- id: page_X"
        const lvglPageMatch = trimmed.match(/^-\s*id:\s*page_(\d+)/);
        if (lvglPageMatch) {
            currentPageIndex = parseInt(lvglPageMatch[1], 10);
            console.log(`[parseSnippetYamlOffline] Processing widgets for LVGL Page: ${currentPageIndex}`);
            continue;
        }

        const widgets = getCurrentPageWidgets();

        if (skipRendering) {
            // Only stop skipping if we see a new widget marker
            // We use a regex to match "// widget:" with optional spaces
            if (trimmed.match(/^\/\/\s*widget:/)) {
                skipRendering = false;
            } else {
                continue;
            }
        }

        if (trimmed.startsWith("//")) {
            const marker = parseWidgetMarker(trimmed);
            if (marker && marker.props.id) {
                const p = marker.props;
                // Use widgetType from marker as primary source of truth to avoid property name collisions (e.g. chart 'type')
                // Only fall back to p.type if marker.widgetType is generic or missing (rare)
                const widgetType = marker.widgetType || p.type;

                // Keep p.type as the property value (e.g. "LINE") if it exists, don't overwrite it with widgetType

                if (!widgetType) {
                    console.warn("[parseSnippetYamlOffline] Widget marker found but no type determined:", trimmed);
                    continue;
                }

                const widget = {
                    id: p.id,
                    type: widgetType,
                    x: parseInt(p.x || 0, 10),
                    y: parseInt(p.y || 0, 10),
                    width: parseInt(p.w || 100, 10),
                    height: parseInt(p.h || 30, 10),
                    title: p.title || "",
                    entity_id: p.entity || p.ent || "",
                    condition_entity: p.cond_ent || "",
                    condition_operator: p.cond_op || "",
                    condition_state: p.cond_state || "",
                    condition_min: p.cond_min || "",
                    condition_max: p.cond_max || "",
                    props: {}
                };

                if (widgetType === "icon") {
                    widget.props = {
                        code: p.code || "F0595",
                        size: parseInt(p.size || 48, 10),
                        color: p.color || "black",
                        fit_icon_to_frame: (p.fit === "true" || p.fit === "1")
                    };
                } else if (widgetType === "text" || widgetType === "label") {
                    widget.props = {
                        text: p.text || "",
                        font_size: parseInt(p.font_size || p.size || 20, 10),
                        font_family: p.font_family || p.font || "Roboto",
                        font_weight: parseInt(p.font_weight || p.weight || 400, 10),
                        italic: (p.italic === "true" || p.italic === true),
                        bpp: parseInt(p.bpp || 1, 10),
                        color: p.color || "black",
                        text_align: p.align || p.text_align || "TOP_LEFT"
                    };
                } else if (widgetType === "sensor_text") {
                    widget.props = {
                        label_font_size: parseInt(p.label_font || p.label_font_size || 14, 10),
                        value_font_size: parseInt(p.value_font || p.value_font_size || 20, 10),
                        value_format: p.format || "label_value",
                        color: p.color || "black",
                        italic: (p.italic === "true" || p.italic === true || p.font_style === "italic"),
                        font_family: p.font_family || "Roboto",
                        font_weight: parseInt(p.font_weight || 400, 10),
                        prefix: p.prefix || "",
                        postfix: p.postfix || "",
                        unit: p.unit || "",
                        hide_unit: (p.hide_unit === "true" || p.hide_unit === true),
                        precision: parseInt(p.precision || -1, 10),
                        text_align: p.align || p.text_align || "TOP_LEFT",
                        label_align: p.label_align || p.align || p.text_align || "TOP_LEFT",
                        value_align: p.value_align || p.align || p.text_align || "TOP_LEFT",
                        is_local_sensor: (p.local === "true"),
                        is_text_sensor: (p.text_sensor === "true"),
                        separator: p.separator || " ~ "
                    };
                    widget.entity_id_2 = p.entity_2 || "";
                } else if (widgetType === "datetime") {
                    widget.props = {
                        format: p.format || "time_date",
                        time_font_size: parseInt(p.time_font || 28, 10),
                        date_font_size: parseInt(p.date_font || 16, 10),
                        color: p.color || "black",
                        italic: (p.italic === "true" || p.italic === true || p.font_style === "italic"),
                        font_family: p.font_family || "Roboto",
                        text_align: p.align || p.text_align || "CENTER"
                    };
                } else if (widgetType === "progress_bar") {
                    widget.props = {
                        show_label: (p.show_label !== "false"),
                        show_percentage: (p.show_pct !== "false"),
                        bar_height: parseInt(p.bar_h || p.bar_height || 15, 10),
                        border_width: parseInt(p.border_w || p.border || 1, 10),
                        color: p.color || "black",
                        is_local_sensor: (p.local === "true")
                    };
                } else if (widgetType === "battery_icon") {
                    widget.props = {
                        size: parseInt(p.size || 32, 10),
                        font_size: parseInt(p.font_size || 12, 10),
                        color: p.color || "black",
                        is_local_sensor: (p.local === "true")
                    };
                } else if (widgetType === "weather_icon") {
                    widget.props = {
                        size: parseInt(p.size || 48, 10),
                        color: p.color || "black"
                    };
                } else if (widgetType === "qr_code") {
                    widget.props = {
                        value: p.value || "https://esphome.io",
                        scale: parseInt(p.scale || 2, 10),
                        ecc: p.ecc || "LOW",
                        color: p.color || "black"
                    };
                } else if (widgetType === "image") {
                    widget.props = {
                        path: (p.path || "").replace(/^"|"$/g, ''),
                        invert: (p.invert === "true" || p.invert === "1"),
                        dither: p.dither || "FLOYDSTEINBERG",
                        transparency: p.transparency || "",
                        image_type: p.img_type || "BINARY",
                        render_mode: p.render_mode || "Auto"
                    };
                } else if (widgetType === "online_image") {
                    widget.props = {
                        url: p.url || "",
                        invert: (p.invert === "true" || p.invert === "1"),
                        interval_s: parseInt(p.interval || 300, 10),
                        render_mode: p.render_mode || "Auto"
                    };
                } else if (widgetType === "puppet") {
                    widget.props = {
                        image_url: p.url || "",
                        invert: (p.invert === "true" || p.invert === "1"),
                        image_type: p.img_type || "RGB565",
                        transparency: p.transparency || "opaque",
                        render_mode: p.render_mode || "Auto"
                    };
                } else if (widgetType === "shape_rect") {
                    widget.props = {
                        fill: (p.fill === "true" || p.fill === "1"),
                        border_width: parseInt(p.border || 1, 10),
                        color: p.color || "black",
                        opacity: parseInt(p.opacity || 100, 10)
                    };
                } else if (widgetType === "rounded_rect") {
                    widget.props = {
                        fill: (p.fill === "true" || p.fill === "1"),
                        // Robustly parse show_border, defaulting to true if not explicitly false
                        show_border: (p.show_border !== "false" && p.show_border !== "0"),
                        border_width: parseInt(p.border || 4, 10),
                        radius: parseInt(p.radius || 10, 10),
                        color: p.color || "black",
                        opacity: parseInt(p.opacity || 100, 10)
                    };
                } else if (widgetType === "shape_circle") {
                    widget.props = {
                        fill: (p.fill === "true" || p.fill === "1"),
                        border_width: parseInt(p.border || 1, 10),
                        color: p.color || "black",
                        opacity: parseInt(p.opacity || 100, 10)
                    };
                } else if (widgetType === "line") {
                    widget.props = {
                        stroke_width: parseInt(p.stroke || 3, 10),
                        color: p.color || "black",
                        orientation: p.orientation || "horizontal"
                    };
                } else if (widgetType === "graph") {
                    widget.entity_id = p.entity || "";
                    widget.props = {
                        duration: p.duration || "1h",
                        border: (p.border === "true" || p.border === "1" || p.border == null),
                        grid: (p.grid === "true" || p.grid === "1" || p.grid == null),
                        color: p.color || "black",
                        x_grid: p.x_grid || "",
                        y_grid: p.y_grid || "",
                        line_thickness: parseInt(p.line_thickness || 3, 10),
                        line_type: p.line_type || "SOLID",
                        continuous: (p.continuous !== "false" && p.continuous !== "0"),
                        min_value: p.min_value || "",
                        max_value: p.max_value || "",
                        min_range: p.min_range || "",
                        max_range: p.max_range || "",
                        is_local_sensor: (p.local === "true")
                    };
                } else if (widgetType === "quote_rss") {
                    widget.props = {
                        feed_url: p.feed_url || "https://www.brainyquote.com/link/quotebr.rss",
                        show_author: (p.show_author !== "false"),
                        random: (p.random !== "false"),
                        refresh_interval: p.refresh_interval || p.refresh || "24h",
                        quote_font_size: parseInt(p.quote_font_size || p.quote_font || 18, 10),
                        author_font_size: parseInt(p.author_font_size || p.author_font || 14, 10),
                        font_family: p.font_family || p.font || "Roboto",
                        font_weight: parseInt(p.font_weight || p.weight || 400, 10),
                        color: p.color || "black",
                        text_align: p.align || p.text_align || "TOP_LEFT",
                        word_wrap: (p.word_wrap !== "false" && p.wrap !== "false"),
                        italic_quote: (p.italic_quote !== "false")
                    };
                } else if (widgetType === "weather_forecast") {
                    widget.props = {
                        weather_entity: p.weather_entity || "",
                        layout: p.layout || "horizontal",
                        show_high_low: (p.show_high_low !== "false"),
                        day_font_size: parseInt(p.day_font_size || 12, 10),
                        temp_font_size: parseInt(p.temp_font_size || 14, 10),
                        icon_size: parseInt(p.icon_size || 32, 10),
                        font_family: p.font_family || "Roboto",
                        color: p.color || "black"
                    };
                } else if (widgetType === "lvgl_button") {
                    widget.props = {
                        text: p.text || "BTN",
                        bg_color: p.bg_color || "white",
                        color: p.color || "black",
                        border_width: parseInt(p.border_width || p.border || 2, 10),
                        radius: parseInt(p.radius || 5, 10)
                    };
                    if (p.title) widget.title = p.title;
                } else if (widgetType === "lvgl_arc") {
                    widget.props = {
                        min: parseInt(p.min || 0, 10),
                        max: parseInt(p.max || 100, 10),
                        value: parseInt(p.value || 0, 10),
                        thickness: parseInt(p.thickness || 10, 10),
                        min: parseInt(p.min || 0, 10),
                        max: parseInt(p.max || 100, 10),
                        value: parseInt(p.value || 0, 10),
                        thickness: parseInt(p.thickness || 10, 10),
                        color: p.color || "blue"
                    };
                    // Ensure title is captured for Arc
                    if (p.title) {
                        widget.title = p.title;
                        widget.props.title = p.title;
                    }
                } else if (widgetType === "lvgl_chart") {
                    widget.props = {
                        title: p.title || "Graph",
                        type: p.type || "LINE",
                        color: p.color || "black",
                        bg_color: p.bg_color || "white"
                    };
                    if (p.title) widget.title = p.title;

                } else if (widgetType === "lvgl_img") {
                    widget.props = {
                        src: p.src || "symbol_image",
                        rotation: parseInt(p.rotation || 0, 10),
                        scale: parseInt(p.scale || 256, 10),
                        pivot_x: parseInt(p.pivot_x || 0, 10),
                        pivot_y: parseInt(p.pivot_y || 0, 10),
                        color: p.color || "black"
                    };

                } else if (widgetType === "lvgl_qrcode") {
                    widget.props = {
                        text: p.text || "https://esphome.io",
                        scale: parseInt(p.scale || 2, 10),
                        color: p.color || "black",
                        bg_color: p.bg_color || "white"
                    };

                } else if (widgetType === "lvgl_bar") {
                    widget.props = {
                        min: parseInt(p.min || 0, 10),
                        max: parseInt(p.max || 100, 10),
                        value: parseInt(p.value || 0, 10),
                        color: p.color || "blue",
                        bg_color: p.bg_color || "gray"
                    };

                } else if (widgetType === "lvgl_slider") {
                    widget.props = {
                        min: parseInt(p.min || 0, 10),
                        max: parseInt(p.max || 100, 10),
                        value: parseInt(p.value || 0, 10),
                        border_width: parseInt(p.border_width || 2, 10),
                        color: p.color || "blue",
                        bg_color: p.bg_color || "gray"
                    };
                } else if (widgetType === "lvgl_tabview") {
                    widget.props = {
                        bg_color: p.bg_color || "white",
                        tabs: (p.tabs || "").split(",").map(t => t.trim()).filter(t => t)
                    };
                } else if (widgetType === "lvgl_tileview") {
                    widget.props = {
                        bg_color: p.bg_color || "white",
                        tiles: [] // tile structure not easily parseable from flat props yet, defaulting empty
                    };
                } else if (widgetType === "lvgl_led") {
                    widget.props = {
                        color: p.color || "red",
                        brightness: parseInt(p.brightness || 255, 10)
                    };
                } else if (widgetType === "lvgl_spinner") {
                    widget.props = {
                        spin_time: parseInt(p.spin_time || 1000, 10),
                        arc_length: parseInt(p.arc_length || 60, 10),
                        arc_color: p.arc_color || "blue",
                        track_color: p.track_color || "white"
                    };
                } else if (widgetType === "lvgl_buttonmatrix") {
                    widget.props = {
                        rows: [] // Complex structure, placeholder for now
                    };
                } else if (widgetType === "lvgl_checkbox") {
                    widget.props = {
                        text: (p.text || "Checkbox").replace(/^"|"$/g, ''),
                        checked: (p.checked === "true" || p.checked === true),
                        color: p.color || "blue"
                    };
                } else if (widgetType === "lvgl_dropdown") {
                    widget.props = {
                        options: (p.options || "").replace(/\\n/g, "\n"), // handle escaped newlines
                        selected_index: parseInt(p.selected_index || 0, 10),
                        color: p.color || "white"
                    };
                } else if (widgetType === "lvgl_keyboard") {
                    widget.props = {
                        mode: p.mode || "TEXT_UPPER",
                        textarea_id: p.textarea || ""
                    };
                } else if (widgetType === "lvgl_roller") {
                    widget.props = {
                        options: (p.options || "").replace(/\\n/g, "\n"),
                        visible_row_count: parseInt(p.visible_row_count || 3, 10),
                        color: p.color || "white",
                        bg_color: p.bg_color || "black",
                        selected_bg_color: p.selected_bg_color || "blue",
                        selected_text_color: p.selected_text_color || "white"
                    };
                } else if (widgetType === "lvgl_spinbox") {
                    widget.props = {
                        min: parseInt(p.range_from || p.min || 0, 10),
                        max: parseInt(p.range_to || p.max || 100, 10),
                        digit_count: parseInt(p.digits || p.digit_count || 4, 10),
                        step: parseInt(p.step || 1, 10),
                        value: parseInt(p.value || 0, 10)
                    };
                } else if (widgetType === "lvgl_switch") {
                    widget.props = {
                        checked: (p.state === "true" || p.state === true || p.checked === "true"),
                        bg_color: p.bg_color || "gray",
                        color: p.color || "blue", // indicator
                        knob_color: p.knob_color || "white"
                    };
                } else if (widgetType === "lvgl_textarea") {
                    widget.props = {
                        placeholder: (p.placeholder_text || p.placeholder || "").replace(/^"|"$/g, ''),
                        text: (p.text || "").replace(/^"|"$/g, ''),
                        one_line: (p.one_line === "true" || p.one_line === true),
                        max_length: parseInt(p.max_length || 0, 10)
                    };
                } else if (widgetType === "lvgl_obj") {
                    widget.props = {
                        color: p.color || "white",
                        border_width: parseInt(p.border_width || 1, 10),
                        border_color: p.border_color || "gray",
                        radius: parseInt(p.radius || 0, 10)
                    };
                } else if (widgetType.startsWith("lvgl_")) {
                    // Generic fallback for other LVGL widgets
                    // Copy all props from p to widget.props, converting "true"/"false" strings
                    widget.props = {};
                    Object.entries(p).forEach(([key, val]) => {
                        if (key === "id" || key === "type" || key === "x" || key === "y" || key === "w" || key === "h") return;
                        if (key === "title") {
                            widget.title = val;
                            return;
                        }
                        if (val === "true") widget.props[key] = true;
                        else if (val === "false") widget.props[key] = false;
                        else widget.props[key] = val;
                    });
                } else if (widgetType === "calendar") {
                    widget.props = {
                        entity_id: p.entity || "sensor.esp_calendar_data",
                        border_width: parseInt(p.border_width || 2, 10),
                        show_border: (p.show_border !== "false"),
                        border_color: p.border_color || "black",
                        background_color: p.background_color || "white",
                        text_color: p.text_color || "black",
                        font_size_date: parseInt(p.font_size_date || 100, 10),
                        font_size_day: parseInt(p.font_size_day || 24, 10),
                        font_size_grid: parseInt(p.font_size_grid || 14, 10),
                        font_size_event: parseInt(p.font_size_event || 18, 10)
                    };
                }

                widgets.push(widget);
                skipRendering = true;
                continue;
            }
            continue;
        }

        let m;

        m = trimmed.match(/^it\.rectangle\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*COLOR_OFF)?\s*\)\s*;?/);
        if (m) {
            widgets.push({
                id: "w_rect_" + widgets.length,
                type: "shape_rect",
                x: parseInt(m[1], 10),
                y: parseInt(m[2], 10),
                width: parseInt(m[3], 10),
                height: parseInt(m[4], 10),
                title: "",
                entity_id: "",
                props: {
                    fill: false,
                    border_width: 1,
                    color: "black",
                    opacity: 100
                }
            });
            continue;
        }

        m = trimmed.match(/^it\.filled_rectangle\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*COLOR_OFF)?\s*\)\s*;?/);
        if (m) {
            widgets.push({
                id: "w_frect_" + widgets.length,
                type: "shape_rect",
                x: parseInt(m[1], 10),
                y: parseInt(m[2], 10),
                width: parseInt(m[3], 10),
                height: parseInt(m[4], 10),
                title: "",
                entity_id: "",
                props: {
                    fill: true,
                    border_width: 1,
                    color: "black",
                    opacity: 100
                }
            });
            continue;
        }

        m = trimmed.match(/^it\.circle\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*COLOR_OFF)?\s*\)\s*;?/);
        if (m) {
            const r = parseInt(m[3], 10);
            widgets.push({
                id: "w_circle_" + widgets.length,
                type: "shape_circle",
                x: parseInt(m[1], 10) - r,
                y: parseInt(m[2], 10) - r,
                width: r * 2,
                height: r * 2,
                title: "",
                entity_id: "",
                props: {
                    fill: false,
                    border_width: 1,
                    color: "black",
                    opacity: 100
                }
            });
            continue;
        }

        m = trimmed.match(/^it\.filled_circle\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)(?:\s*,\s*COLOR_OFF)?\s*\)\s*;?/);
        if (m) {
            const r = parseInt(m[3], 10);
            widgets.push({
                id: "w_fcircle_" + widgets.length,
                type: "shape_circle",
                x: parseInt(m[1], 10) - r,
                y: parseInt(m[2], 10) - r,
                width: r * 2,
                height: r * 2,
                title: "",
                entity_id: "",
                props: {
                    fill: true,
                    border_width: 1,
                    color: "black",
                    opacity: 100
                }
            });
            continue;
        }

        m = trimmed.match(/^it\.line\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)\s*;?/);
        if (m) {
            const x1 = parseInt(m[1], 10);
            const y1 = parseInt(m[2], 10);
            const x2 = parseInt(m[3], 10);
            const y2 = parseInt(m[4], 10);
            widgets.push({
                id: "w_line_" + widgets.length,
                type: "line",
                x: x1,
                y: y1,
                width: x2 - x1,
                height: y2 - y1,
                title: "",
                entity_id: "",
                props: {
                    stroke_width: 1,
                    color: "black",
                    orientation: (Math.abs(y2 - y1) > Math.abs(x2 - x1)) ? "vertical" : "horizontal"
                }
            });
            continue;
        }
    }

    return layout;
}

/**
 * Loads a parsed layout into the application state.
 * @param {Object} layout - The parsed layout object.
 */
function loadLayoutIntoState(layout) {
    if (!layout || !Array.isArray(layout.pages)) {
        console.error("Invalid layout - missing pages array");
        throw new Error("invalid_layout");
    }

    const pages = layout.pages.map((p, idx) => ({
        ...p,  // Preserve all properties from imported page
        id: p.id || `page_${idx}`,
        name: p.name || `Page ${idx + 1}`,
        widgets: Array.isArray(p.widgets) ? p.widgets : []
    }));

    if (!pages.length) {
        console.warn("No pages, creating default empty page");
        pages.push({
            id: "page_0",
            name: "Imported",
            widgets: []
        });
    }

    // Set current layout ID from the layout data
    // Only update if the layout has a device_id - don't reset an existing valid ID
    if (layout.device_id) {
        const currentId = AppState.currentLayoutId;
        if (currentId !== layout.device_id) {
            console.log(`[loadLayoutIntoState] Updating currentLayoutId: ${currentId} -> ${layout.device_id}`);
            AppState.setCurrentLayoutId(layout.device_id);
        }
    } else {
        console.log(`[loadLayoutIntoState] No device_id in layout, keeping currentLayoutId: ${AppState.currentLayoutId}`);
    }

    // Set device name from layout
    if (layout.name) {
        AppState.setDeviceName(layout.name);
    }

    // Set device model from layout (check multiple possible locations)
    const deviceModel = layout.device_model || layout.settings?.device_model;
    if (deviceModel) {
        AppState.setDeviceModel(deviceModel);
        window.currentDeviceModel = deviceModel; // Keep global in sync
    }

    // Merge imported settings with existing settings
    const currentSettings = AppState.getSettings();
    const newSettings = { ...currentSettings, ...(layout.settings || {}) };

    // Ensure device_name is in settings too (for Device Settings modal)
    if (layout.name) {
        newSettings.device_name = layout.name;
    }

    // Ensure device_model is in settings too
    if (deviceModel) {
        newSettings.device_model = deviceModel;
    }

    // Ensure defaults for new settings
    if (newSettings.sleep_enabled === undefined) newSettings.sleep_enabled = false;
    if (newSettings.sleep_start_hour === undefined) newSettings.sleep_start_hour = 0;
    if (newSettings.sleep_end_hour === undefined) newSettings.sleep_end_hour = 5;
    if (newSettings.manual_refresh_only === undefined) newSettings.manual_refresh_only = false;
    if (newSettings.deep_sleep_enabled === undefined) newSettings.deep_sleep_enabled = false;
    if (newSettings.deep_sleep_interval === undefined) newSettings.deep_sleep_interval = 600;

    // Update State
    AppState.setPages(pages);
    AppState.setSettings(newSettings);
    // Preserve current page index if valid, otherwise reset to 0
    const currentIndex = AppState.currentPageIndex;
    if (currentIndex >= 0 && currentIndex < pages.length) {
        AppState.setCurrentPageIndex(currentIndex);
    } else {
        AppState.setCurrentPageIndex(0);
    }

    // Note: AppState emits EVENTS.STATE_CHANGED and EVENTS.PAGE_CHANGED,
    // which should trigger UI updates in Sidebar, Canvas, and PropertiesPanel.
    // The legacy editor.js has a sync mechanism that listens for these events
    // to update its own 'pages' array for renderCanvas() compatibility.
    console.log(`[loadLayoutIntoState] Layout loaded with ${pages.length} pages. Current Layout ID: ${AppState.currentLayoutId}`);
}
