/**
 * Quote RSS Plugin
 */

const render = (element, widget, helpers) => {
    const props = widget.props || {};
    const { getColorStyle } = helpers;

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
    const hashInput = (feedUrl || "") + (widget.id || "default");
    const hash = hashInput.split("").reduce((a, b) => ((a << 5) - a) + b.charCodeAt(0), 0);
    const sample = sampleQuotes[Math.abs(hash) % sampleQuotes.length];

    const isOfflineMode = window.location.protocol === "file:" ||
        (typeof window.hasHaBackend !== "function") || !window.hasHaBackend();

    window.quoteCache = window.quoteCache || {};
    window.quoteFetchTimers = window.quoteFetchTimers || {};

    const cacheKey = widget.id + "|" + feedUrl;
    const fetchingKey = cacheKey + "_fetching";
    const lastUrlKey = widget.id + "_lastUrl";

    if (window.quoteCache[lastUrlKey] !== feedUrl) {
        window.quoteCache[lastUrlKey] = feedUrl;
        if (window.quoteFetchTimers[widget.id]) {
            clearTimeout(window.quoteFetchTimers[widget.id]);
            window.quoteFetchTimers[widget.id] = null;
        }
    }

    if (!window.quoteCache[cacheKey] && !window.quoteCache[fetchingKey]) {
        window.quoteCache[fetchingKey] = true;
        const fetchFeedUrl = feedUrl;
        const fetchCacheKey = cacheKey;
        const fetchFetchingKey = fetchingKey;

        window.quoteFetchTimers[widget.id] = setTimeout(async () => {
            try {
                let data;
                if (isOfflineMode) {
                    // Skip fetch in offline mode to prevent browser-level DNS errors
                    // which cannot be silenced by JavaScript try/catch.
                    // Widget will display sample quote instead.
                    data = null;
                } else {
                    const response = await fetch(`/api/esphome_designer/rss_proxy?url=${encodeURIComponent(fetchFeedUrl)}`);
                    data = await response.json();
                }

                if (data && data.success && data.quote) {
                    window.quoteCache[fetchCacheKey] = data.quote;
                    if (window.emit && window.EVENTS) {
                        window.emit(window.EVENTS.STATE_CHANGED);
                    }
                }
            } catch (e) {
                // console.debug("[Quote Widget] Fetch Error:", e);
            } finally {
                window.quoteCache[fetchFetchingKey] = false;
                window.quoteFetchTimers[widget.id] = null;
            }
        }, 500);
    }

    const quoteData = window.quoteCache[cacheKey] || sample;
    const isLive = !!window.quoteCache[cacheKey];

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
    const quoteDiv = document.createElement("div");
    quoteDiv.style.fontSize = quoteFontSize + "px";
    quoteDiv.style.fontStyle = italicQuote ? "italic" : "normal";
    quoteDiv.style.marginBottom = "8px";
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
    element.appendChild(quoteDiv);

    if (showAuthor) {
        const authorDiv = document.createElement("div");
        authorDiv.style.fontSize = authorFontSize + "px";
        authorDiv.style.fontStyle = "normal";
        authorDiv.style.opacity = "0.8";
        authorDiv.textContent = "— " + quoteData.author;
        element.appendChild(authorDiv);
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

    const textLambda = `!lambda |-
      std::string q = id(${safeIdPrefix}_text_global);
      std::string a = id(${safeIdPrefix}_author_global);
      if (q.empty()) return "Loading quote...";
      if (a.empty()) return ("\\"" + q + "\\"").c_str();
      return ("\\"" + q + "\\"\\n— " + a).c_str();
    `;

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
        lines, addFont, getColorConst, getCondProps, getConditionCheck, getAlignX
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
    const quoteTextGlobal = `${safeIdPrefix}_text_global`;
    const quoteAuthorGlobal = `${safeIdPrefix}_author_global`;

    const quoteFontId = addFont(fontFamily, fontWeight, quoteFontSize, italicQuote);
    const authorFontId = addFont(fontFamily, fontWeight, authorFontSize, false);

    lines.push(`        // widget:quote_rss id:${w.id} type:quote_rss x:${w.x} y:${w.y} w:${w.width} h:${w.height} color:${colorProp} align:${textAlign} ${getCondProps(w)}`);

    const cond = getConditionCheck(w);
    if (cond) lines.push(`        ${cond}`);

    lines.push(`        {`);
    lines.push(`          std::string q_text = id(${quoteTextGlobal});`);
    if (p.show_author !== false) {
        lines.push(`          std::string q_author = id(${quoteAuthorGlobal});`);
    }

    if (wordWrap) {
        const alignX = getAlignX(textAlign, w.x, w.width);
        const esphomeAlign = `TextAlign::${textAlign}`;
        lines.push(`          int max_w = ${w.width - 16};`);
        lines.push(`          int q_h = ${quoteFontSize + 4};`);
        lines.push(`          std::string display_text = "\\\"" + q_text + "\\\"";`);

        lines.push(`          auto print_q = [&](esphome::font::Font *f, int line_h, bool draw) -> int {`);
        lines.push(`            int y_curr = ${w.y + 8};`);
        lines.push(`            std::string text_to_print = display_text;`);
        lines.push(`            std::string curr_line = "";`);
        lines.push(`            std::string word;`);
        lines.push(`            size_t pos = 0;`);
        lines.push(`            while (pos < text_to_print.length()) {`);
        lines.push(`                size_t space_pos = text_to_print.find(' ', pos);`);
        lines.push(`                if (space_pos == std::string::npos) {`);
        lines.push(`                    word = text_to_print.substr(pos);`);
        lines.push(`                    pos = text_to_print.length();`);
        lines.push(`                } else {`);
        lines.push(`                    word = text_to_print.substr(pos, space_pos - pos);`);
        lines.push(`                    pos = space_pos + 1;`);
        lines.push(`                }`);
        lines.push(`                if (word.empty()) continue;`);
        lines.push(`                std::string test_line = curr_line.empty() ? word : curr_line + " " + word;`);
        lines.push(`                int w_m, h_m, xoff_m, bl_m;`);
        lines.push(`                f->measure(test_line.c_str(), &w_m, &xoff_m, &bl_m, &h_m);`);
        lines.push(`                if (w_m > max_w && !curr_line.empty()) {`);
        lines.push(`                    if (draw) it.printf(${alignX}, y_curr, f, ${color}, ${esphomeAlign}, "%s", curr_line.c_str());`);
        lines.push(`                    y_curr += line_h;`);
        lines.push(`                    curr_line = word;`);
        lines.push(`                } else { curr_line = test_line; }`);
        lines.push(`            }`);
        lines.push(`            if (!curr_line.empty()) {`);
        lines.push(`                if (draw) it.printf(${alignX}, y_curr, f, ${color}, ${esphomeAlign}, "%s", curr_line.c_str());`);
        lines.push(`                y_curr += line_h;`);
        lines.push(`            }`);
        lines.push(`            return y_curr - ${w.y + 8};`);
        lines.push(`          };`);
        lines.push(`          print_q(id(${quoteFontId}), q_h, true);`);

        if (p.show_author !== false) {
            lines.push(`          if (!q_author.empty()) it.printf(${alignX}, ${w.y} + ${w.height} - ${authorFontSize + 4}, id(${authorFontId}), ${color}, ${esphomeAlign}, "— %s", q_author.c_str());`);
        }
    } else {
        const alignX = getAlignX(textAlign, w.x, w.width);
        const esphomeAlign = `TextAlign::${textAlign}`;
        lines.push(`          it.printf(${alignX}, ${w.y}, id(${quoteFontId}), ${color}, ${esphomeAlign}, "\\"%s\\"", q_text.c_str());`);
        if (p.show_author !== false) {
            lines.push(`          if (!q_author.empty()) it.printf(${alignX}, ${w.y + quoteFontSize + 4}, id(${authorFontId}), ${color}, ${esphomeAlign}, "— %s", q_author.c_str());`);
        }
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
        lines.push(`- id: ${safeIdPrefix}_text_global`);
        lines.push(`  type: std::string`);
        lines.push(`  restore_value: true`);
        lines.push(`  initial_value: '""'`);
        if (w.props && w.props.show_author !== false) {
            lines.push(`- id: ${safeIdPrefix}_author_global`);
            lines.push(`  type: std::string`);
            lines.push(`  restore_value: true`);
            lines.push(`  initial_value: '""'`);
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

            const haUrl = (p.ha_url || "http://homeassistant.local:8123").replace(/\/$/, "");
            const proxyEndpoint = "/api/esphome_designer/rss_proxy";
            const proxyUrl = `${haUrl}${proxyEndpoint}?url=${encodeURIComponent(feedUrl)}${random ? '&random=true' : ''}`;

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

            // Quote text sensor
            lines.push(`- platform: template`);
            lines.push(`  id: ${safeIdPrefix}_txt`);
            lines.push(`  name: "Quote Text"`);
            lines.push(`  icon: "mdi:format-quote-close"`);
            lines.push(`  lambda: 'return id(${safeIdPrefix}_text_global);'`);
            lines.push(`  update_interval: 60s`);

            // Author sensor (if enabled)
            if (p.show_author !== false) {
                lines.push(`- platform: template`);
                lines.push(`  id: ${safeIdPrefix}_author_sensor`);
                lines.push(`  name: "Quote Author"`);
                lines.push(`  icon: "mdi:account"`);
                lines.push(`  lambda: 'return id(${safeIdPrefix}_author_global);'`);
                lines.push(`  update_interval: 60s`);
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
        random: true
    },
    render,
    onExportGlobals,
    onExportTextSensors,
    onExportComponents,
    exportLVGL,
    export: exportDoc
};
