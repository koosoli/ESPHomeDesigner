// @ts-nocheck
/**
 * Quote RSS Plugin
 */
import { getWeightsForFont } from '../../js/core/font_weights.js';
import { emit, EVENTS } from '../../js/core/events.js';
import { hasHaBackend } from '../../js/utils/env.js';

let quoteCache = {};
let quoteFetchTimers = {};

const render = (element, widget, helpers) => {
    const { getColorStyle } = helpers;
    const props = widget.props || {};
    const itemCount = props.item_count || 1;

    // Apply Border & Background
    if (props.border_width) {
        const bColor = getColorStyle(props.border_color || "black");
        element.style.border = `${props.border_width}px solid ${bColor}`;
        element.style.borderRadius = `${props.border_radius || 0}px`;
    }
    if (props.bg_color) {
        element.style.backgroundColor = getColorStyle(props.bg_color);
    }

    const showAuthor = props.show_author !== false;
    const quoteFontSize = parseInt(props.quote_font_size || 18, 10);
    const authorFontSize = parseInt(props.author_font_size || 14, 10);
    const fontFamily = props.font_family || "Roboto";
    const fontWeight = parseInt(props.font_weight || 400, 10);
    const color = props.color || "theme_auto";
    const colorStyle = getColorStyle(color);
    element.style.color = colorStyle;
    const textAlign = props.text_align || "TOP_LEFT";
    const italicQuote = props.italic_quote !== false;

    const sampleQuotes = [
        { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
        { quote: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
        { quote: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
        { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
        { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
        { quote: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
        { quote: "Two things are infinite: the universe and human stupidity.", author: "Albert Einstein" },
        { quote: "Be the change that you wish to see in the world.", author: "Mahatma Gandhi" }
    ];

    const feedUrl = props.feed_url || "https://www.brainyquote.com/link/quotebr.rss";
    const requestUrl = itemCount > 1 ? `${feedUrl}&count=${itemCount}` : feedUrl;
    const hashInput = (feedUrl || "") + (widget.id || "default");
    const hash = hashInput.split("").reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0);

    // Pick the right number of samples
    let sample = [];
    if (itemCount === 1) {
        sample.push(sampleQuotes[Math.abs(hash) % sampleQuotes.length]);
    } else {
        const startIdx = Math.abs(hash) % sampleQuotes.length;
        for (let i = 0; i < itemCount; i++) {
            sample.push(sampleQuotes[(startIdx + i) % sampleQuotes.length]);
        }
    }

    const isOfflineMode = window.location.protocol === "file:" || !hasHaBackend();

    const cacheKey = widget.id + "|" + requestUrl;
    const fetchingKey = cacheKey + "_fetching";
    const lastUrlKey = widget.id + "_lastUrl";

    if (quoteCache[lastUrlKey] !== requestUrl) {
        quoteCache[lastUrlKey] = requestUrl;
        if (quoteFetchTimers[widget.id]) {
            clearTimeout(quoteFetchTimers[widget.id]);
            quoteFetchTimers[widget.id] = null;
        }
    }

    if (!quoteCache[cacheKey] && !quoteCache[fetchingKey]) {
        quoteCache[fetchingKey] = true;
        const fetchFeedUrl = feedUrl;
        const fetchCacheKey = cacheKey;
        const fetchFetchingKey = fetchingKey;

        quoteFetchTimers[widget.id] = setTimeout(async () => {
            try {
                let data;
                if (isOfflineMode) {
                    // Skip fetch in offline mode to prevent browser-level DNS errors
                    // which cannot be silenced by JavaScript try/catch.
                    // Widget will display sample quote instead.
                    data = null;
                } else {
                    const params = new URLSearchParams();
                    params.append("url", fetchFeedUrl);
                    if (itemCount > 1) {
                        params.append("count", itemCount.toString());
                    }
                    if (props.random !== false) {
                        params.append("random", "true");
                    }
                    const response = await fetch(`/api/esphome_designer/rss_proxy?${params.toString()}`);
                    data = await response.json();
                }

                if (data && data.success) {
                    if (itemCount === 1 && data.quote) {
                        quoteCache[fetchCacheKey] = [data.quote];
                    } else if (itemCount > 1 && data.quotes && Array.isArray(data.quotes)) {
                        quoteCache[fetchCacheKey] = data.quotes;
                    }
                    if (emit && EVENTS) {
                        emit(EVENTS.STATE_CHANGED);
                    }
                }
            } catch {
                // console.debug("[Quote Widget] Fetch Error");
            } finally {
                quoteCache[fetchFetchingKey] = false;
                quoteFetchTimers[widget.id] = null;
            }
        }, 500);
    }

    const quoteDataArray = quoteCache[cacheKey] || sample;
    const isLive = !!quoteCache[cacheKey];

    element.style.display = "flex";
    element.style.flexDirection = "column";
    element.style.boxSizing = "border-box";
    element.style.padding = "8px";
    element.style.overflow = "hidden";
    element.style.fontFamily = fontFamily + ", serif";
    element.style.fontWeight = String(fontWeight);
    element.style.color = colorStyle;
    element.style.lineHeight = "1.3";

    if (textAlign.includes("CENTER")) {
        element.style.textAlign = "center";
        element.style.alignItems = "center";
    } else if (textAlign.includes("RIGHT")) {
        element.style.textAlign = "right";
        element.style.alignItems = "flex-end";
    } else {
        element.style.textAlign = "left";
        element.style.alignItems = "flex-start";
    }

    if (textAlign.startsWith("CENTER")) {
        element.style.justifyContent = "center";
    } else if (textAlign.startsWith("BOTTOM")) {
        element.style.justifyContent = "flex-end";
    } else {
        element.style.justifyContent = "flex-start";
    }

    element.innerHTML = "";

    const wordWrap = props.word_wrap !== false;

    // Create a container to hold the items, taking up available space before the feed footer
    const itemsContainer = document.createElement("div");
    itemsContainer.style.display = "flex";
    itemsContainer.style.flexDirection = "column";
    itemsContainer.style.flex = "1";
    itemsContainer.style.gap = "12px"; // Spacing between items
    itemsContainer.style.width = "100%";
    itemsContainer.style.overflow = "hidden";
    // Propagate alignment to the container's children
    itemsContainer.style.justifyContent = element.style.justifyContent;
    itemsContainer.style.alignItems = element.style.alignItems;

    element.appendChild(itemsContainer);

    for (let i = 0; i < quoteDataArray.length && i < itemCount; i++) {
        const quoteData = quoteDataArray[i];

        const itemDiv = document.createElement("div");
        itemDiv.style.display = "flex";
        itemDiv.style.flexDirection = "column";
        itemDiv.style.width = "100%";
        itemDiv.style.alignItems = element.style.alignItems;

        const quoteDiv = document.createElement("div");
        quoteDiv.style.fontSize = quoteFontSize + "px";
        quoteDiv.style.fontStyle = italicQuote ? "italic" : "normal";
        quoteDiv.style.marginBottom = showAuthor ? "4px" : "0px";

        if (wordWrap) {
            quoteDiv.style.wordWrap = "break-word";
            quoteDiv.style.overflowWrap = "break-word";
            quoteDiv.style.whiteSpace = "normal";
        } else {
            quoteDiv.style.whiteSpace = "nowrap";
            quoteDiv.style.overflow = "hidden";
            quoteDiv.style.textOverflow = "ellipsis";
        }
        quoteDiv.textContent = '"' + quoteData.quote + '"';
        itemDiv.appendChild(quoteDiv);

        if (showAuthor) {
            const authorDiv = document.createElement("div");
            authorDiv.style.fontSize = authorFontSize + "px";
            authorDiv.style.fontStyle = "normal";
            authorDiv.style.opacity = "0.8";
            authorDiv.textContent = "— " + quoteData.author;
            itemDiv.appendChild(authorDiv);
        }

        itemsContainer.appendChild(itemDiv);

        // Add a separator line if it's not the last item
        if (i < Math.min(quoteDataArray.length, itemCount) - 1) {
            const sepLine = document.createElement("div");
            sepLine.style.height = "1px";
            sepLine.style.width = "40%";
            sepLine.style.backgroundColor = colorStyle;
            sepLine.style.opacity = "0.2";
            sepLine.style.margin = textAlign.includes("CENTER") ? "0 auto" :
                textAlign.includes("RIGHT") ? "0 0 0 auto" : "0";
            itemsContainer.appendChild(sepLine);
        }
    }

    const feedDiv = document.createElement("div");
    feedDiv.style.fontSize = "9px";
    feedDiv.style.opacity = "0.5";
    feedDiv.style.marginTop = "auto";
    feedDiv.style.paddingTop = "4px";
    try {
        const url = new URL(feedUrl);
        if (isOfflineMode) {
            feedDiv.textContent = "🔌 OFFLINE - " + url.hostname;
        } else if (isLive) {
            feedDiv.textContent = "🟢 " + url.hostname;
        } else {
            feedDiv.textContent = "⚪ " + url.hostname;
        }
    } catch {
        feedDiv.textContent = isOfflineMode ? "🔌 OFFLINE" : "📰 RSS Feed";
    }
    element.appendChild(feedDiv);
};

const exportLVGL = (w, { common, convertColor, getLVGLFont }) => {
    const p = w.props || {};
    const makeSafeId = (eid, suffix = "") => {
        let safe = eid.replace(/[^a-zA-Z0-9_]/g, "_");
        const maxBase = 63 - suffix.length;
        if (safe.length > maxBase) safe = safe.substring(0, maxBase);
        return safe + suffix;
    };
    const safeIdPrefix = makeSafeId(`quote_${w.id}`, "");
    const quoteFontSize = parseInt(p.quote_font_size || 18, 10);
    const fontFamily = p.font_family || "Roboto";
    const fontWeight = parseInt(p.font_weight || 400, 10);
    const color = convertColor(p.color || "black");

    const itemCount = p.item_count || 1;

    let textLambda = `!lambda |-\n`;
    textLambda += `      std::string result = "";\n`;
    for (let i = 0; i < itemCount; i++) {
        const suffix = itemCount === 1 ? "" : `_${i}`;
        textLambda += `      {\n`;
        textLambda += `        std::string q = id(${safeIdPrefix}_text_global${suffix});\n`;
        textLambda += `        std::string a = id(${safeIdPrefix}_author_global${suffix});\n`;
        textLambda += `        if (!q.empty()) {\n`;
        textLambda += `          if (!result.empty()) result += "\\n\\n";\n`;
        textLambda += `          result += "\\"" + q + "\\"";\n`;
        textLambda += `          if (!a.empty()) result += "\\n— " + a;\n`;
        textLambda += `        } else if (${i} == 0 && result.empty()) {\n`;
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
};

const exportDoc = (w, context) => {
    const {
        lines, addFont, getColorConst, getCondProps, getConditionCheck, getAlignX // eslint-disable-line no-unused-vars
    } = context;

    const p = w.props || {};
    const quoteFontSize = parseInt(p.quote_font_size || 18, 10);
    const authorFontSize = parseInt(p.author_font_size || 14, 10);
    const fontFamily = p.font_family || "Roboto";
    const fontWeight = parseInt(p.font_weight || 400, 10);
    const colorProp = p.color || "theme_auto";
    const color = getColorConst(colorProp);
    const textAlign = p.text_align || "TOP_LEFT";
    const italicQuote = p.italic_quote !== false;
    const wordWrap = p.word_wrap !== false;

    // Helper to create safe ESPHome ID (max 59 chars)
    const makeSafeId = (eid, suffix = "") => {
        let safe = eid.replace(/[^a-zA-Z0-9_]/g, "_");
        const maxBase = 63 - suffix.length;
        if (safe.length > maxBase) safe = safe.substring(0, maxBase);
        return safe + suffix;
    };

    const safeIdPrefix = makeSafeId(`quote_${w.id}`, "");
    const itemCount = p.item_count || 1;

    const quoteFontId = addFont(fontFamily, fontWeight, quoteFontSize, italicQuote);
    const authorFontId = addFont(fontFamily, fontWeight, authorFontSize, false);


    // Background fill
    const bgColorProp = p.bg_color || p.background_color || "transparent";
    if (bgColorProp && bgColorProp !== "transparent") {
        const bgColorConst = getColorConst(bgColorProp);
        lines.push(`        it.filled_rectangle(${w.x}, ${w.y}, ${w.width}, ${w.height}, ${bgColorConst});`);
    }

    // Draw Border if defined
    const borderWidth = p.border_width || 0;
    if (borderWidth > 0) {
        const borderColor = getColorConst(p.border_color || "theme_auto");
        for (let i = 0; i < borderWidth; i++) {
            lines.push(`        it.rectangle(${w.x} + ${i}, ${w.y} + ${i}, ${w.width} - 2 * ${i}, ${w.height} - 2 * ${i}, ${borderColor});`);
        }
    }

    const cond = getConditionCheck(w);
    if (cond) lines.push(`        ${cond}`);

    lines.push(`        {`);
    lines.push(`          int y_curr = ${w.y + 8};`);
    for (let i = 0; i < itemCount; i++) {
        const suffix = itemCount === 1 ? "" : `_${i}`;
        const quoteTextGlobal = `${safeIdPrefix}_text_global${suffix}`;
        const quoteAuthorGlobal = `${safeIdPrefix}_author_global${suffix}`;

        lines.push(`          {`);
        lines.push(`            std::string q_text = id(${quoteTextGlobal});`);
        if (p.show_author !== false) {
            lines.push(`            std::string q_author = id(${quoteAuthorGlobal});`);
        }
        lines.push(`            if (!q_text.empty()) {`);

        if (wordWrap) {
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
                lines.push(`                it.printf(${alignX}, y_curr, id(${authorFontId}), ${color}, ${esphomeAlign}, "— %s", q_author.c_str());`);
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
                lines.push(`                it.printf(${alignX}, y_curr, id(${authorFontId}), ${color}, ${esphomeAlign}, "— %s", q_author.c_str());`);
                lines.push(`                y_curr += ${authorFontSize + 8};`);
                lines.push(`              } else { y_curr += 4; }`);
            } else {
                lines.push(`              y_curr += 4;`);
            }
        }

        // Separator between items
        if (i < itemCount - 1) {
            const alignXForLine = textAlign.includes("CENTER") ? `${w.x + w.width / 2} - ${w.width * 0.2}` :
                textAlign.includes("RIGHT") ? `${w.x + w.width} - ${w.width * 0.4}` : `${w.x}`;
            lines.push(`              y_curr += 4;`);
            lines.push(`              it.line(${alignXForLine}, y_curr, ${alignXForLine} + ${w.width * 0.4}, y_curr, ${color});`);
            lines.push(`              y_curr += 8;`);
        }

        lines.push(`            }`);
        lines.push(`          }`);
    }
    lines.push(`        }`);

    if (cond) lines.push(`        }`);
};

const onExportGlobals = (context) => {
    const { lines, widgets } = context;
    widgets.filter(w => w.type === "quote_rss").forEach(w => {
        const makeSafeId = (eid, suffix = "") => {
            let safe = eid.replace(/[^a-zA-Z0-9_]/g, "_");
            const maxBase = 63 - suffix.length;
            if (safe.length > maxBase) safe = safe.substring(0, maxBase);
            return safe + suffix;
        };
        const safeIdPrefix = makeSafeId(`quote_${w.id}`, "");
        const itemCount = (w.props && w.props.item_count) || 1;
        for (let i = 0; i < itemCount; i++) {
            const suffix = itemCount === 1 ? "" : `_${i}`;
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
};

const onExportComponents = (context) => {
    const { lines, widgets, displayId } = context;
    const targets = widgets.filter(w => w.type === "quote_rss");

    if (targets.length > 0) {
        // Ensure http_request is present with sufficient buffer for JSON
        const hasHttpRequest = lines.some(l => l.trim().startsWith("http_request:"));
        if (!hasHttpRequest) {
            lines.push("");
            lines.push("http_request:");
            lines.push("  verify_ssl: false");
            lines.push("  timeout: 20s");
            lines.push("  buffer_size_rx: 4096");
        }

        lines.push("");
        lines.push("# Quote RSS Widget Update Loop");
        lines.push("interval:");
        for (const w of targets) {
            const p = w.props || {};
            const refreshInterval = p.refresh_interval || "1h";
            const makeSafeId = (eid, suffix = "") => {
                let safe = eid.replace(/[^a-zA-Z0-9_]/g, "_");
                const maxBase = 63 - suffix.length;
                if (safe.length > maxBase) safe = safe.substring(0, maxBase);
                return safe + suffix;
            };
            const safeIdPrefix = makeSafeId(`quote_${w.id}`, "");
            const feedUrl = p.feed_url || "https://www.brainyquote.com/link/quotebr.rss";
            const random = p.random !== false;

            const itemCount = p.item_count || 1;
            const haUrl = (p.ha_url || "http://homeassistant.local:8123").replace(/\/$/, "");
            const proxyEndpoint = "/api/esphome_designer/rss_proxy";
            const proxyParams = new URLSearchParams({ url: feedUrl });
            if (random) proxyParams.append("random", "true");
            if (itemCount > 1) proxyParams.append("count", itemCount.toString());

            const proxyUrl = `${haUrl}${proxyEndpoint}?${proxyParams.toString()}`;

            lines.push(`  - interval: ${refreshInterval}`);
            lines.push(`    startup_delay: 20s`);  // Fetch shortly after boot, before the full interval
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
                // Backward-compatible parsing for single quote
                lines.push(`                          JsonVariant q_var = doc["quote"];`);
                lines.push(`                          if (q_var.is<JsonObject>()) {`);
                lines.push(`                            JsonObject q = q_var.as<JsonObject>();`);
                lines.push(`                            std::string q_str = q["quote"] | "";`);
                lines.push(`                            if (!q_str.empty()) {`);
                lines.push(`                              id(${safeIdPrefix}_text_global) = q_str;`);
                if (p.show_author !== false) {
                    lines.push(`                              id(${safeIdPrefix}_author_global) = q["author"] | "Unknown";`);
                }
                lines.push(`                              ESP_LOGI("quote", "Fetched quote: %s", q_str.c_str());`);
                lines.push(`                            }`);
                lines.push(`                          }`);
            } else {
                // Array parsing for multi-quote
                lines.push(`                          JsonArray arr = doc["quotes"].as<JsonArray>();`);
                lines.push(`                          int i = 0;`);
                lines.push(`                          for (JsonVariant v : arr) {`);
                lines.push(`                            if (i >= ${itemCount}) break;`);
                lines.push(`                            if (v.is<JsonObject>()) {`);
                lines.push(`                              JsonObject q = v.as<JsonObject>();`);
                lines.push(`                              std::string q_str = q["quote"] | "";`);
                lines.push(`                              std::string a_str = q["author"] | "Unknown";`);
                lines.push(`                              if (!q_str.empty()) {`);
                for (let i = 0; i < itemCount; i++) {
                    lines.push(`                                if (i == ${i}) {`);
                    lines.push(`                                  id(${safeIdPrefix}_text_global_${i}) = q_str;`);
                    if (p.show_author !== false) {
                        lines.push(`                                  id(${safeIdPrefix}_author_global_${i}) = a_str;`);
                    }
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
            if (context.isLvgl) {
                lines.push(`                        - lvgl.widget.refresh: ${w.id}`);
            } else {
                lines.push(`                        - component.update: ${displayId}`);
            }
            lines.push(`                      else:`);
            lines.push(`                        - lambda: 'ESP_LOGW("quote", "HTTP Request failed with code: %d", response->status_code);'`);
        }
        lines.push('');  // Blank line after interval section
    }
};

const onExportTextSensors = (context) => {
    const { lines, widgets } = context;
    const targets = widgets.filter(w => w.type === "quote_rss");

    if (targets.length > 0) {
        lines.push("# Quote RSS Widget Text Sensors (visible in Home Assistant)");
        for (const w of targets) {
            const p = w.props || {};
            const makeSafeId = (eid, suffix = "") => {
                let safe = eid.replace(/[^a-zA-Z0-9_]/g, "_");
                const maxBase = 63 - suffix.length;
                if (safe.length > maxBase) safe = safe.substring(0, maxBase);
                return safe + suffix;
            };
            const safeIdPrefix = makeSafeId(`quote_${w.id}`, "");

            const itemCount = p.item_count || 1;

            for (let i = 0; i < itemCount; i++) {
                const suffix = itemCount === 1 ? "" : `_${i}`;
                const nameSuffix = itemCount === 1 ? "" : ` ${i + 1}`;

                // Quote text sensor
                lines.push(`- platform: template`);
                lines.push(`  id: ${safeIdPrefix}_txt${suffix}`);
                lines.push(`  name: "Quote Text${nameSuffix}"`);
                lines.push(`  icon: "mdi:format-quote-close"`);
                lines.push(`  lambda: 'return id(${safeIdPrefix}_text_global${suffix});'`);
                lines.push(`  update_interval: 60s`);

                // Author sensor (if enabled)
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
};

export default {
    id: "quote_rss",
    name: "Quote RSS",
    category: "Events",
    // CRITICAL ARCHITECTURAL NOTE: OEPL and OpenDisplay are excluded because this widget 
    // requires complex fetching (http_request/RSS proxy) and dynamic string management 
    // that is not supported in protocol-based rendering.
    supportedModes: ['lvgl', 'direct'],
    defaults: {
        feed_url: "https://www.brainyquote.com/link/quotebr.rss",
        quote_font_size: 18,
        author_font_size: 14,
        font_family: "Roboto",
        font_weight: 400,
        color: "theme_auto",
        text_align: "TOP_LEFT",
        show_author: true,
        italic_quote: true,
        word_wrap: true,
        width: 400,
        height: 120,
        refresh_interval: "1h",
        ha_url: "http://homeassistant.local:8123",
        random: true,
        item_count: 1,
        bg_color: "transparent",
        border_width: 0,
        border_color: "theme_auto",
        border_radius: 0,
        opa: 255,
        opacity: 255
    },
    schema: [
        {
            section: "RSS Source",
            fields: [
                { key: "feed_url", label: "RSS Feed URL", type: "text", default: "https://www.brainyquote.com/link/quotebr.rss" },
                { key: "refresh_interval", label: "Refresh Every", type: "text", default: "1h" },
                { key: "random", label: "Random Quote", type: "checkbox", default: true },
                { key: "item_count", label: "Number of Items", type: "number", default: 1, min: 1, max: 10 }
            ]
        },
        {
            section: "HA Integration",
            fields: [
                { key: "ha_url", label: "HA Base URL", type: "text", default: "http://homeassistant.local:8123" }
            ]
        },
        {
            section: "Content",
            fields: [
                { key: "show_author", label: "Show Author", type: "checkbox", default: true }
            ]
        },
        {
            section: "Typography",
            fields: [
                { key: "font_family", label: "Font Family", type: "select", options: ["Roboto", "Inter", "Open Sans", "Lato", "Montserrat", "Poppins", "Raleway", "Roboto Mono", "Ubuntu", "Nunito", "Playfair Display", "Merriweather", "Work Sans", "Source Sans Pro", "Quicksand"], default: "Roboto" },
                { key: "quote_font_size", label: "Quote Font Size", type: "number", default: 18 },
                { key: "author_font_size", label: "Author Font Size", type: "number", default: 14 },
                {
                    key: "font_weight",
                    label: "Font Weight",
                    type: "select",
                    dynamicOptions: (props) => getWeightsForFont(props.font_family || "Roboto"),
                    default: 400
                },
                { key: "italic_quote", label: "Italic Quote", type: "checkbox", default: true },
                { key: "text_align", label: "Alignment", type: "select", options: ["TOP_LEFT", "TOP_CENTER", "TOP_RIGHT", "CENTER_LEFT", "CENTER", "CENTER_RIGHT", "BOTTOM_LEFT", "BOTTOM_CENTER", "BOTTOM_RIGHT"], default: "TOP_LEFT" },
                { key: "word_wrap", label: "Word Wrap", type: "checkbox", default: true }
            ]
        },
        {
            section: "Appearance",
            fields: [
                { key: "color", label: "Text Color", type: "color", default: "theme_auto" },
                { key: "bg_color", label: "Background", type: "color", default: "transparent" },
                { key: "border_width", label: "Border Width", type: "number", default: 0 },
                { key: "border_color", label: "Border Color", type: "color", default: "theme_auto" },
                { key: "border_radius", label: "Corners", type: "number", default: 0 },
                { key: "opa", label: "Opacity (0 - 255)", type: "number", default: 255 },
                { key: "opacity", label: "Opacity (0 - 255)", type: "number", default: 255 }
            ]
        }
    ],
    render,
    onExportGlobals,
    onExportTextSensors,
    onExportComponents,
    exportLVGL,
    export: exportDoc
};
