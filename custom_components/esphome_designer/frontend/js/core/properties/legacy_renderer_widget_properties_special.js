import { AppState } from '../state';
import { CALENDAR_HELPER_SCRIPT } from './calendar_python_template.js';
import {
    renderFontFamilyControls,
    renderFontWeightControl,
    renderTextAlignControl
} from './legacy_renderer_widget_properties_shared.js';

/**
 * @param {any} panel
 * @param {any} widget
 * @param {string} type
 * @param {Record<string, any>} props
 * @param {string[]} colors
 * @param {(key: string, value: any) => void} updateProp
 * @returns {boolean}
 */
export function renderLegacySpecialProperties(panel, widget, type, props, colors, updateProp) {
    if (type === "quote_rss") {
        panel.createSection("Feed Settings", true);
        panel.addHint("ðŸ“° Display quotes from an RSS feed (Quote of the Day)");
        panel.addLabeledInput("Feed URL", "text", props.feed_url || "https://www.brainyquote.com/link/quotebr.rss", (value) => updateProp("feed_url", value));
        panel.addHint("Enter any RSS feed URL. Default: BrainyQuote daily quotes");
        panel.addCheckbox("Show Author", props.show_author !== false, (value) => updateProp("show_author", value));
        panel.addCheckbox("Random Quote", props.random !== false, (value) => updateProp("random", value));
        panel.addHint("Pick a random quote from the feed, or use the first one");
        const refreshOptions = ["15min", "30min", "1h", "2h", "4h", "8h", "12h", "24h"];
        panel.addSelect("Refresh Interval", props.refresh_interval || "24h", refreshOptions, (value) => updateProp("refresh_interval", value));
        panel.addLabeledInput("Home Assistant URL", "text", props.ha_url || "http://homeassistant.local:8123", (value) => updateProp("ha_url", value));
        panel.addHint("Address of your Home Assistant instance (for Proxy)");
        panel.endSection();

        panel.createSection("Typography", false);
        panel.addLabeledInput("Quote Text Size (Line 1)", "number", props.quote_font_size || 18, (value) => updateProp("quote_font_size", parseInt(value, 10)));
        panel.addLabeledInput("Author Size (Line 2)", "number", props.author_font_size || 14, (value) => updateProp("author_font_size", parseInt(value, 10)));
        const currentFont = renderFontFamilyControls(panel, props, updateProp, {
            customFontHint: 'Browse <a href="https://fonts.google.com" target="_blank">fonts.google.com</a>'
        });
        renderFontWeightControl(panel, currentFont, props, updateProp);
        renderTextAlignControl(panel, props, updateProp, "TOP_LEFT");
        panel.addColorSelector("Color", props.color || "black", colors, (value) => updateProp("color", value));
        panel.endSection();

        panel.createSection("Display Options", false);
        panel.addCheckbox("Word Wrap", props.word_wrap !== false, (value) => updateProp("word_wrap", value));
        panel.addCheckbox("Auto Scale Text", props.auto_scale || false, (value) => updateProp("auto_scale", value));
        panel.addHint("Automatically reduce font size if text is too long");
        panel.addCheckbox("Italic Quote", props.italic_quote !== false, (value) => updateProp("italic_quote", value));
        panel.endSection();
        return true;
    }

    if (type === "calendar") {
        panel.createSection("Appearance", true);
        panel.addColorSelector("Text Color", props.text_color || "black", colors, (value) => updateProp("text_color", value));
        panel.addColorSelector("Background", props.background_color || "white", colors, (value) => updateProp("background_color", value));
        panel.endSection();

        panel.createSection("Border Style", false);
        panel.addLabeledInput("Border Width", "number", props.border_width || 0, (value) => updateProp("border_width", parseInt(value, 10)));
        panel.addColorSelector("Border Color", props.border_color || "theme_auto", colors, (value) => updateProp("border_color", value));
        panel.addLabeledInput("Corner Radius", "number", props.border_radius || 0, (value) => updateProp("border_radius", parseInt(value, 10)));
        panel.addDropShadowButton(panel.getContainer(), widget.id);
        panel.endSection();

        panel.createSection("Font Sizes", false);
        panel.addLabeledInput("Big Date Size", "number", props.font_size_date || 100, (value) => updateProp("font_size_date", parseInt(value, 10)));
        panel.addLabeledInput("Day Name Size", "number", props.font_size_day || 24, (value) => updateProp("font_size_day", parseInt(value, 10)));
        panel.addLabeledInput("Grid Text Size", "number", props.font_size_grid || 14, (value) => updateProp("font_size_grid", parseInt(value, 10)));
        panel.addLabeledInput("Event Text Size", "number", props.font_size_event || 18, (value) => updateProp("font_size_event", parseInt(value, 10)));
        panel.endSection();

        panel.createSection("Visibility", true);
        panel.addCheckbox("Show Header", props.show_header !== false, (value) => updateProp("show_header", value));
        panel.addCheckbox("Show Grid", props.show_grid !== false, (value) => updateProp("show_grid", value));
        panel.addCheckbox("Show Events", props.show_events !== false, (value) => updateProp("show_events", value));
        panel.endSection();

        panel.createSection("Data Source", true);
        panel.addLabeledInputWithPicker("Entity ID", "text", widget.entity_id || "sensor.esp_calendar_data", (value) => {
            AppState.updateWidget(widget.id, { entity_id: value });
        }, widget);
        panel.addLabeledInput("Max Events", "number", props.max_events || 8, (value) => updateProp("max_events", parseInt(value, 10)));
        panel.addHint("Must be a sensor with attribute 'entries'");

        const dlBtn = document.createElement("button");
        dlBtn.className = "btn btn-secondary btn-full btn-xs";
        dlBtn.textContent = "Download Helper Script";
        dlBtn.style.marginTop = "10px";
        dlBtn.addEventListener("click", () => {
            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/x-python;charset=utf-8,' + encodeURIComponent(CALENDAR_HELPER_SCRIPT));
            element.setAttribute('download', 'esp_calendar_data_conversion.py');
            element.style.display = 'none';
            document.body.appendChild(element);
            element.click();
            document.body.removeChild(element);
        });
        panel.getContainer().appendChild(dlBtn);
        panel.addHint("Place in /config/python_scripts/");
        const note = document.createElement("div");
        note.style.marginTop = "5px";
        note.style.fontSize = "10px";
        note.style.color = "#888";
        note.style.textAlign = "center";
        note.innerText = "Check widget instructions for HA setup.";
        panel.getContainer().appendChild(note);
        panel.endSection();
        return true;
    }

    return false;
}
