import { emit, EVENTS } from '../../js/core/events.js';
import { hasHaBackend } from '../../js/utils/env.js';

/** @typedef {{ quote: string, author: string }} QuoteItem */
/** @typedef {{ id: string, props?: Record<string, any> }} QuoteWidget */
/** @typedef {{ getColorStyle: (value: string | undefined) => string }} QuoteRenderHelpers */
/** @type {QuoteItem[]} */
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

/** @type {Record<string, QuoteItem[] | string | boolean | undefined>} */
const quoteCache = {};
/** @type {Record<string, ReturnType<typeof setTimeout> | null | undefined>} */
const quoteFetchTimers = {};

/**
 * @param {string} feedUrl
 * @param {string} widgetId
 * @param {number} itemCount
 * @returns {QuoteItem[]}
 */
const getSampleQuotes = (feedUrl, widgetId, itemCount) => {
    const hashInput = (feedUrl || "") + (widgetId || "default");
    const hash = hashInput.split("").reduce(
        (/** @type {number} */ acc, /** @type {string} */ char) => ((acc << 5) - acc) + char.charCodeAt(0),
        0
    );
    if (itemCount === 1) return [sampleQuotes[Math.abs(hash) % sampleQuotes.length]];

    const startIdx = Math.abs(hash) % sampleQuotes.length;
    const items = [];
    for (let index = 0; index < itemCount; index++) {
        items.push(sampleQuotes[(startIdx + index) % sampleQuotes.length]);
    }
    return items;
};

/**
 * @param {HTMLElement} element
 * @param {QuoteWidget} widget
 * @param {QuoteRenderHelpers} helpers
 */
export function render(element, widget, helpers) {
    const { getColorStyle } = helpers;
    const props = widget.props || {};
    const itemCount = props.item_count || 1;
    const feedUrl = props.feed_url || "https://www.brainyquote.com/link/quotebr.rss";
    const requestUrl = itemCount > 1 ? `${feedUrl}&count=${itemCount}` : feedUrl;
    const isOfflineMode = window.location.protocol === "file:" || !hasHaBackend();
    const cacheKey = `${widget.id}|${requestUrl}`;
    const fetchingKey = `${cacheKey}_fetching`;
    const lastUrlKey = `${widget.id}_lastUrl`;

    if (props.border_width) {
        element.style.border = `${props.border_width}px solid ${getColorStyle(props.border_color || "black")}`;
        element.style.borderRadius = `${props.border_radius || 0}px`;
    }
    if (props.bg_color) {
        element.style.backgroundColor = getColorStyle(props.bg_color);
    }

    if (quoteCache[lastUrlKey] !== requestUrl) {
        quoteCache[lastUrlKey] = requestUrl;
        const existingTimer = quoteFetchTimers[widget.id];
        if (existingTimer) {
            clearTimeout(existingTimer);
            quoteFetchTimers[widget.id] = null;
        }
    }

    if (!quoteCache[cacheKey] && !quoteCache[fetchingKey]) {
        quoteCache[fetchingKey] = true;
        quoteFetchTimers[widget.id] = setTimeout(async () => {
            try {
                /** @type {{ success?: boolean, quote?: QuoteItem, quotes?: QuoteItem[] } | null} */
                let data = null;
                if (!isOfflineMode) {
                    const params = new URLSearchParams();
                    params.append("url", feedUrl);
                    if (itemCount > 1) params.append("count", itemCount.toString());
                    if (props.random !== false) params.append("random", "true");
                    const response = await fetch(`/api/esphome_designer/rss_proxy?${params.toString()}`);
                    data = await response.json();
                }

                if (data && data.success) {
                    if (itemCount === 1 && data.quote) {
                        quoteCache[cacheKey] = [data.quote];
                    } else if (itemCount > 1 && Array.isArray(data.quotes)) {
                        quoteCache[cacheKey] = data.quotes;
                    }
                    if (emit && EVENTS) emit(EVENTS.STATE_CHANGED);
                }
            } catch {
                // Keep sample quotes when remote fetch fails.
            } finally {
                quoteCache[fetchingKey] = false;
                quoteFetchTimers[widget.id] = null;
            }
        }, 500);
    }

    const cachedQuotes = Array.isArray(quoteCache[cacheKey]) ? quoteCache[cacheKey] : undefined;
    const quoteDataArray = cachedQuotes || getSampleQuotes(feedUrl, widget.id, itemCount);
    const isLive = !!cachedQuotes;
    const showAuthor = props.show_author !== false;
    const quoteFontSize = parseInt(props.quote_font_size || 18, 10);
    const authorFontSize = parseInt(props.author_font_size || 14, 10);
    const fontFamily = props.font_family || "Roboto";
    const fontWeight = parseInt(props.font_weight || 400, 10);
    const colorStyle = getColorStyle(props.color || "theme_auto");
    const textAlign = props.text_align || "TOP_LEFT";
    const italicQuote = props.italic_quote !== false;
    const wordWrap = props.word_wrap !== false;

    element.style.display = "flex";
    element.style.flexDirection = "column";
    element.style.boxSizing = "border-box";
    element.style.padding = "8px";
    element.style.overflow = "hidden";
    element.style.fontFamily = fontFamily + ", serif";
    element.style.fontWeight = String(fontWeight);
    element.style.color = colorStyle;
    element.style.lineHeight = "1.3";
    element.style.textAlign = textAlign.includes("CENTER") ? "center" : textAlign.includes("RIGHT") ? "right" : "left";
    element.style.alignItems = textAlign.includes("CENTER") ? "center" : textAlign.includes("RIGHT") ? "flex-end" : "flex-start";
    element.style.justifyContent = textAlign.startsWith("CENTER") ? "center" : textAlign.startsWith("BOTTOM") ? "flex-end" : "flex-start";
    element.innerHTML = "";

    const itemsContainer = document.createElement("div");
    itemsContainer.style.display = "flex";
    itemsContainer.style.flexDirection = "column";
    itemsContainer.style.flex = "1";
    itemsContainer.style.gap = "12px";
    itemsContainer.style.width = "100%";
    itemsContainer.style.overflow = "hidden";
    itemsContainer.style.justifyContent = element.style.justifyContent;
    itemsContainer.style.alignItems = element.style.alignItems;
    element.appendChild(itemsContainer);

    for (let index = 0; index < quoteDataArray.length && index < itemCount; index++) {
        const quoteData = quoteDataArray[index];
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
            authorDiv.textContent = "â€” " + quoteData.author;
            itemDiv.appendChild(authorDiv);
        }

        itemsContainer.appendChild(itemDiv);

        if (index < Math.min(quoteDataArray.length, itemCount) - 1) {
            const separator = document.createElement("div");
            separator.style.height = "1px";
            separator.style.width = "40%";
            separator.style.backgroundColor = colorStyle;
            separator.style.opacity = "0.2";
            separator.style.margin = textAlign.includes("CENTER") ? "0 auto" : textAlign.includes("RIGHT") ? "0 0 0 auto" : "0";
            itemsContainer.appendChild(separator);
        }
    }

    const feedDiv = document.createElement("div");
    feedDiv.style.fontSize = "9px";
    feedDiv.style.opacity = "0.5";
    feedDiv.style.marginTop = "auto";
    feedDiv.style.paddingTop = "4px";
    try {
        const url = new URL(feedUrl);
        if (isOfflineMode) feedDiv.textContent = "ðŸ”Œ OFFLINE - " + url.hostname;
        else if (isLive) feedDiv.textContent = "ðŸŸ¢ " + url.hostname;
        else feedDiv.textContent = "âšª " + url.hostname;
    } catch {
        feedDiv.textContent = isOfflineMode ? "ðŸ”Œ OFFLINE" : "ðŸ“° RSS Feed";
    }
    element.appendChild(feedDiv);
}
