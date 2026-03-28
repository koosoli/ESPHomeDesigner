import { getWeightsForFont } from '../../js/core/font_weights.js';

/** @typedef {{ font_family?: string }} QuoteWidgetProps */

export const defaults = {
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
};

export const schema = [
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
                dynamicOptions: (/** @type {QuoteWidgetProps} */ props) => getWeightsForFont(props.font_family || "Roboto"),
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
];
