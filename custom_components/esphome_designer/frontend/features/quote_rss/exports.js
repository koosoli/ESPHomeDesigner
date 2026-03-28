const makeSafeId = (entityId, suffix = "") => {
    let safe = entityId.replace(/[^a-zA-Z0-9_]/g, "_");
    const maxBase = 63 - suffix.length;
    if (safe.length > maxBase) safe = safe.substring(0, maxBase);
    return safe + suffix;
};

export function exportLVGL(w, { common, convertColor, getLVGLFont }) {
    const p = w.props || {};
    const safeIdPrefix = makeSafeId(`quote_${w.id}`, "");
    const quoteFontSize = parseInt(p.quote_font_size || 18, 10);
    const fontFamily = p.font_family || "Roboto";
    const fontWeight = parseInt(p.font_weight || 400, 10);
    const color = convertColor(p.color || "black");
    const itemCount = p.item_count || 1;

    let textLambda = `!lambda |-\n`;
    textLambda += `      std::string result = "";\n`;
    for (let index = 0; index < itemCount; index++) {
        const suffix = itemCount === 1 ? "" : `_${index}`;
        textLambda += `      {\n`;
        textLambda += `        std::string q = id(${safeIdPrefix}_text_global${suffix});\n`;
        textLambda += `        std::string a = id(${safeIdPrefix}_author_global${suffix});\n`;
        textLambda += `        if (!q.empty()) {\n`;
        textLambda += `          if (!result.empty()) result += "\\n\\n";\n`;
        textLambda += `          result += "\\"" + q + "\\"";\n`;
        textLambda += `          if (!a.empty()) result += "\\n\u2014 " + a;\n`;
        textLambda += `        } else if (${index} == 0 && result.empty()) {\n`;
        textLambda += `          result = "Loading quote...";\n`;
        textLambda += `        }\n`;
        textLambda += `      }\n`;
    }
    textLambda += `      return result.c_str();\n    `;

    const textAlign = (p.text_align || "CENTER").replace("TOP_", "").replace("BOTTOM_", "").toLowerCase();
    return {
        label: {
            ...common,
            text: textLambda,
            text_font: getLVGLFont(fontFamily, quoteFontSize, fontWeight, p.italic_quote !== false),
            text_color: color,
            text_align: textAlign === "left" || textAlign === "right" || textAlign === "center" ? textAlign : "center"
        }
    };
}

export function exportDoc(w, context) {
    const { lines, addFont, getColorConst, getConditionCheck, getAlignX } = context;
    const p = w.props || {};
    const quoteFontSize = parseInt(p.quote_font_size || 18, 10);
    const authorFontSize = parseInt(p.author_font_size || 14, 10);
    const fontFamily = p.font_family || "Roboto";
    const fontWeight = parseInt(p.font_weight || 400, 10);
    const color = getColorConst(p.color || "theme_auto");
    const textAlign = p.text_align || "TOP_LEFT";
    const safeIdPrefix = makeSafeId(`quote_${w.id}`, "");
    const itemCount = p.item_count || 1;
    const quoteFontId = addFont(fontFamily, fontWeight, quoteFontSize, p.italic_quote !== false);
    const authorFontId = addFont(fontFamily, fontWeight, authorFontSize, false);

    const bgColorProp = p.bg_color || p.background_color || "transparent";
    if (bgColorProp && bgColorProp !== "transparent") {
        lines.push(`        it.filled_rectangle(${w.x}, ${w.y}, ${w.width}, ${w.height}, ${getColorConst(bgColorProp)});`);
    }

    const borderWidth = p.border_width || 0;
    if (borderWidth > 0) {
        const borderColor = getColorConst(p.border_color || "theme_auto");
        for (let index = 0; index < borderWidth; index++) {
            lines.push(`        it.rectangle(${w.x} + ${index}, ${w.y} + ${index}, ${w.width} - 2 * ${index}, ${w.height} - 2 * ${index}, ${borderColor});`);
        }
    }

    const cond = getConditionCheck(w);
    if (cond) lines.push(`        ${cond}`);
    lines.push(`        {`);
    lines.push(`          int y_curr = ${w.y + 8};`);

    for (let index = 0; index < itemCount; index++) {
        const suffix = itemCount === 1 ? "" : `_${index}`;
        const quoteTextGlobal = `${safeIdPrefix}_text_global${suffix}`;
        const quoteAuthorGlobal = `${safeIdPrefix}_author_global${suffix}`;
        lines.push(`          {`);
        lines.push(`            std::string q_text = id(${quoteTextGlobal});`);
        if (p.show_author !== false) lines.push(`            std::string q_author = id(${quoteAuthorGlobal});`);
        lines.push(`            if (!q_text.empty()) {`);

        if (p.word_wrap !== false) {
            const alignX = getAlignX(textAlign, w.x, w.width);
            const esphomeAlign = `TextAlign::${textAlign}`;
            lines.push(`              int max_w = ${w.width - 16};`);
            lines.push(`              int q_h = ${quoteFontSize + 4};`);
            lines.push(`              std::string display_text = "\\"" + q_text + "\\"";`);
            lines.push(`              auto print_q = [&](esphome::font::Font *f, int line_h, bool draw) -> int {`);
            lines.push(`                int y_local = y_curr;`);
            lines.push(`                std::string text_to_print = display_text;`);
            lines.push(`                std::string curr_line = "";`);
            lines.push(`                std::string word;`);
            lines.push(`                size_t pos = 0;`);
            lines.push(`                while (pos < text_to_print.length()) {`);
            lines.push(`                    size_t space_pos = text_to_print.find(' ', pos);`);
            lines.push(`                    if (space_pos == std::string::npos) {`);
            lines.push(`                        word = text_to_print.substr(pos);`);
            lines.push(`                        pos = text_to_print.length();`);
            lines.push(`                    } else {`);
            lines.push(`                        word = text_to_print.substr(pos, space_pos - pos);`);
            lines.push(`                        pos = space_pos + 1;`);
            lines.push(`                    }`);
            lines.push(`                    if (word.empty()) continue;`);
            lines.push(`                    std::string test_line = curr_line.empty() ? word : curr_line + " " + word;`);
            lines.push(`                    int w_m, h_m, xoff_m, bl_m;`);
            lines.push(`                    f->measure(test_line.c_str(), &w_m, &xoff_m, &bl_m, &h_m);`);
            lines.push(`                    if (w_m > max_w && !curr_line.empty()) {`);
            lines.push(`                        if (draw) it.printf(${alignX}, y_local, f, ${color}, ${esphomeAlign}, "%s", curr_line.c_str());`);
            lines.push(`                        y_local += line_h;`);
            lines.push(`                        curr_line = word;`);
            lines.push(`                    } else { curr_line = test_line; }`);
            lines.push(`                }`);
            lines.push(`                if (!curr_line.empty()) {`);
            lines.push(`                    if (draw) it.printf(${alignX}, y_local, f, ${color}, ${esphomeAlign}, "%s", curr_line.c_str());`);
            lines.push(`                    y_local += line_h;`);
            lines.push(`                }`);
            lines.push(`                return y_local - y_curr;`);
            lines.push(`              };`);
            lines.push(`              int height_used = print_q(id(${quoteFontId}), q_h, true);`);
            lines.push(`              y_curr += height_used;`);
            if (p.show_author !== false) {
                lines.push(`              if (!q_author.empty()) {`);
                lines.push(`                it.printf(${alignX}, y_curr, id(${authorFontId}), ${color}, ${esphomeAlign}, "\u2014 %s", q_author.c_str());`);
                lines.push(`                y_curr += ${authorFontSize + 8};`);
                lines.push(`              } else { y_curr += 4; }`);
            } else {
                lines.push(`              y_curr += 4;`);
            }
        } else {
            const alignX = getAlignX(textAlign, w.x, w.width);
            const esphomeAlign = `TextAlign::${textAlign}`;
            lines.push(`              it.printf(${alignX}, y_curr, id(${quoteFontId}), ${color}, ${esphomeAlign}, "\\"%s\\"", q_text.c_str());`);
            lines.push(`              y_curr += ${quoteFontSize + 4};`);
            if (p.show_author !== false) {
                lines.push(`              if (!q_author.empty()) {`);
                lines.push(`                it.printf(${alignX}, y_curr, id(${authorFontId}), ${color}, ${esphomeAlign}, "\u2014 %s", q_author.c_str());`);
                lines.push(`                y_curr += ${authorFontSize + 8};`);
                lines.push(`              } else { y_curr += 4; }`);
            } else {
                lines.push(`              y_curr += 4;`);
            }
        }

        if (index < itemCount - 1) {
            const alignXForLine = textAlign.includes("CENTER") ? `${w.x + w.width / 2} - ${w.width * 0.2}` : textAlign.includes("RIGHT") ? `${w.x + w.width} - ${w.width * 0.4}` : `${w.x}`;
            lines.push(`              y_curr += 4;`);
            lines.push(`              it.line(${alignXForLine}, y_curr, ${alignXForLine} + ${w.width * 0.4}, y_curr, ${color});`);
            lines.push(`              y_curr += 8;`);
        }

        lines.push(`            }`);
        lines.push(`          }`);
    }

    lines.push(`        }`);
    if (cond) lines.push(`        }`);
}

export function onExportGlobals(context) {
    const { lines, widgets } = context;
    widgets.filter((w) => w.type === "quote_rss").forEach((w) => {
        const safeIdPrefix = makeSafeId(`quote_${w.id}`, "");
        const itemCount = (w.props && w.props.item_count) || 1;
        for (let index = 0; index < itemCount; index++) {
            const suffix = itemCount === 1 ? "" : `_${index}`;
            lines.push(`- id: ${safeIdPrefix}_text_global${suffix}`);
            lines.push(`  type: std::string`);
            lines.push(`  restore_value: true`);
            lines.push(`  initial_value: '""'`);
            if (w.props && w.props.show_author !== false) {
                lines.push(`- id: ${safeIdPrefix}_author_global${suffix}`);
                lines.push(`  type: std::string`);
                lines.push(`  restore_value: true`);
                lines.push(`  initial_value: '""'`);
            }
        }
    });
}

export function onExportComponents(context) {
    const { lines, widgets, displayId } = context;
    const targets = widgets.filter((w) => w.type === "quote_rss");
    if (targets.length === 0) return;

    const hasHttpRequest = lines.some((line) => line.trim().startsWith("http_request:"));
    if (!hasHttpRequest) {
        lines.push("", "http_request:", "  verify_ssl: false", "  timeout: 20s", "  buffer_size_rx: 4096");
    }

    lines.push("", "# Quote RSS Widget Update Loop", "interval:");
    for (const w of targets) {
        const p = w.props || {};
        const refreshInterval = p.refresh_interval || "1h";
        const safeIdPrefix = makeSafeId(`quote_${w.id}`, "");
        const feedUrl = p.feed_url || "https://www.brainyquote.com/link/quotebr.rss";
        const itemCount = p.item_count || 1;
        const random = p.random !== false;
        const haUrl = (p.ha_url || "http://homeassistant.local:8123").replace(/\/$/, "");
        const proxyParams = new URLSearchParams({ url: feedUrl });
        if (random) proxyParams.append("random", "true");
        if (itemCount > 1) proxyParams.append("count", itemCount.toString());
        const proxyUrl = `${haUrl}/api/esphome_designer/rss_proxy?${proxyParams.toString()}`;

        lines.push(`  - interval: ${refreshInterval}`);
        lines.push(`    startup_delay: 20s`);
        lines.push(`    then:`);
        lines.push(`      - if:`);
        lines.push(`          condition:`);
        lines.push(`            wifi.connected:`);
        lines.push(`          then:`);
        lines.push(`            - http_request.get:`);
        lines.push(`                url: "${proxyUrl}"`);
        lines.push(`                capture_response: true`);
        lines.push(`                on_response:`);
        lines.push(`                  - lambda: |-`);
        lines.push(`                      if (response->status_code == 200) {`);
        lines.push(`                        ESP_LOGD("quote", "Raw body: %s", body.c_str());`);
        lines.push(`                        JsonDocument doc;`);
        lines.push(`                        DeserializationError error = deserializeJson(doc, body);`);
        lines.push(`                        if (error) {`);
        lines.push(`                          ESP_LOGW("quote", "Failed to parse JSON: %s", error.c_str());`);
        lines.push(`                          return;`);
        lines.push(`                        }`);
        lines.push(`                        if (doc["success"].as<bool>()) {`);
        if (itemCount === 1) {
            lines.push(`                          JsonVariant q_var = doc["quote"];`);
            lines.push(`                          if (q_var.is<JsonObject>()) {`);
            lines.push(`                            JsonObject q = q_var.as<JsonObject>();`);
            lines.push(`                            std::string q_str = q["quote"] | "";`);
            lines.push(`                            if (!q_str.empty()) {`);
            lines.push(`                              id(${safeIdPrefix}_text_global) = q_str;`);
            if (p.show_author !== false) lines.push(`                              id(${safeIdPrefix}_author_global) = q["author"] | "Unknown";`);
            lines.push(`                              ESP_LOGI("quote", "Fetched quote: %s", q_str.c_str());`);
            lines.push(`                            }`);
            lines.push(`                          }`);
        } else {
            lines.push(`                          JsonArray arr = doc["quotes"].as<JsonArray>();`);
            lines.push(`                          int i = 0;`);
            lines.push(`                          for (JsonVariant v : arr) {`);
            lines.push(`                            if (i >= ${itemCount}) break;`);
            lines.push(`                            if (v.is<JsonObject>()) {`);
            lines.push(`                              JsonObject q = v.as<JsonObject>();`);
            lines.push(`                              std::string q_str = q["quote"] | "";`);
            lines.push(`                              std::string a_str = q["author"] | "Unknown";`);
            lines.push(`                              if (!q_str.empty()) {`);
            for (let index = 0; index < itemCount; index++) {
                lines.push(`                                if (i == ${index}) {`);
                lines.push(`                                  id(${safeIdPrefix}_text_global_${index}) = q_str;`);
                if (p.show_author !== false) lines.push(`                                  id(${safeIdPrefix}_author_global_${index}) = a_str;`);
                lines.push(`                                }`);
            }
            lines.push(`                                ESP_LOGI("quote", "Fetched quote %d: %s", i, q_str.c_str());`);
            lines.push(`                              }`);
            lines.push(`                            }`);
            lines.push(`                            i++;`);
            lines.push(`                          }`);
        }
        lines.push(`                        }`);
        lines.push(`                      }`);
        lines.push(`                  - if:`);
        lines.push(`                      condition:`);
        lines.push(`                        lambda: 'return response->status_code == 200;'`);
        lines.push(`                      then:`);
        lines.push(context.isLvgl ? `                        - lvgl.widget.refresh: ${w.id}` : `                        - component.update: ${displayId}`);
        lines.push(`                      else:`);
        lines.push(`                        - lambda: 'ESP_LOGW("quote", "HTTP Request failed with code: %d", response->status_code);'`);
    }
    lines.push('');
}

export function onExportTextSensors(context) {
    const { lines, widgets } = context;
    const targets = widgets.filter((w) => w.type === "quote_rss");
    if (targets.length === 0) return;

    lines.push("# Quote RSS Widget Text Sensors (visible in Home Assistant)");
    for (const w of targets) {
        const p = w.props || {};
        const safeIdPrefix = makeSafeId(`quote_${w.id}`, "");
        const itemCount = p.item_count || 1;
        for (let index = 0; index < itemCount; index++) {
            const suffix = itemCount === 1 ? "" : `_${index}`;
            const nameSuffix = itemCount === 1 ? "" : ` ${index + 1}`;
            lines.push(`- platform: template`);
            lines.push(`  id: ${safeIdPrefix}_txt${suffix}`);
            lines.push(`  name: "Quote Text${nameSuffix}"`);
            lines.push(`  icon: "mdi:format-quote-close"`);
            lines.push(`  lambda: 'return id(${safeIdPrefix}_text_global${suffix});'`);
            lines.push(`  update_interval: 60s`);
            if (p.show_author !== false) {
                lines.push(`- platform: template`);
                lines.push(`  id: ${safeIdPrefix}_author_sensor${suffix}`);
                lines.push(`  name: "Quote Author${nameSuffix}"`);
                lines.push(`  icon: "mdi:account"`);
                lines.push(`  lambda: 'return id(${safeIdPrefix}_author_global${suffix});'`);
                lines.push(`  update_interval: 60s`);
            }
        }
    }
}
