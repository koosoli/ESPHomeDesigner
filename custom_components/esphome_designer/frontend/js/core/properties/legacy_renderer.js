
import { AppState } from '../state';
import { getAvailableColors, getDeviceModel } from '../../utils/device.js';
import { getWeightsForFont, clampFontWeight } from '../font_weights.js';
import { fetchEntityStates } from '../../io/ha_api.js';
import { CALENDAR_HELPER_SCRIPT } from './calendar_python_template.js';


export class LegacyRenderer {
    /**
     * Auto-populate title from entity's friendly_name
     */
    static autoPopulateTitleFromEntity(widgetId, entityId) {
        if (!entityId || !AppState) return;

        if (typeof fetchEntityStates === 'function') {
            fetchEntityStates().then(entities => {
                if (!entities || entities.length === 0) return;
                const entity = entities.find(e => e.entity_id === entityId);
                if (entity && entity.name) {
                    const currentWidget = AppState.getSelectedWidget();
                    if (currentWidget && currentWidget.id === widgetId && !currentWidget.title) {
                        AppState.updateWidget(widgetId, { title: entity.name });
                    }
                }
            }).catch(() => { });
        }
    }

    static renderProtocolProperties(panel, widget, type) {
        const colors = getAvailableColors();
        const props = widget.props || {};

        const updateProp = (key, value) => {
            const newProps = { ...widget.props, [key]: value };
            AppState.updateWidget(widget.id, { props: newProps });
        };

        if (type === "image" || type === "online_image") {
            panel.createSection("Image Source", true);
            if (type === "image") {
                panel.addLabeledInput("Asset Path", "text", props.path || "", (v) => updateProp("path", v));
            } else {
                panel.addLabeledInput("Image URL", "text", props.url || "", (v) => updateProp("url", v));
                panel.addLabeledInput("Refresh (s)", "number", props.interval_s || 300, (v) => updateProp("interval_s", parseInt(v, 10)));
            }
            panel.addCheckbox("Invert Colors", !!props.invert, (v) => updateProp("invert", v));
            panel.endSection();

            panel.createSection("Appearance", true);
            panel.addColorSelector("Background", props.bg_color || "transparent", colors, (v) => updateProp("bg_color", v));
            panel.addDropShadowButton(panel.getContainer(), widget.id);
            panel.endSection();
        }
        else if (type.startsWith("shape_") || type === "line" || type === "rounded_rect") {
            panel.createSection("Shape Style", true);
            panel.addColorSelector("Fill/Line Color", props.color || "black", colors, (v) => updateProp("color", v));

            if (type !== "line") {
                panel.addCheckbox("Fill", props.fill !== false, (v) => updateProp("fill", v));
                panel.addColorSelector("Background", props.bg_color || "transparent", colors, (v) => updateProp("bg_color", v));
                panel.addLabeledInput("Border Width", "number", props.border_width || 0, (v) => updateProp("border_width", parseInt(v, 10)));
            } else {
                panel.addLabeledInput("Thickness", "number", props.thickness || 2, (v) => updateProp("thickness", parseInt(v, 10)));
            }

            if (type === "rounded_rect" || type === "shape_rect" || props.radius !== undefined) {
                panel.addLabeledInput("Corner Radius", "number", props.radius || 0, (v) => updateProp("radius", parseInt(v, 10)));
            }
            panel.addDropShadowButton(panel.getContainer(), widget.id);
            panel.endSection();
        }
        else if (type === "odp_ellipse" || type === "odp_polygon" || type === "odp_rectangle_pattern" || type === "odp_arc" || type === "odp_icon_sequence") {
            panel.createSection("ODP Style", true);
            if (type !== "odp_icon_sequence") {
                panel.addColorSelector("Outline", props.outline || "black", colors, (v) => updateProp("outline", v));
                panel.addColorSelector("Fill", props.fill || "transparent", colors, (v) => updateProp("fill", v));
                panel.addLabeledInput("Border Width", "number", props.border_width || 1, (v) => updateProp("border_width", parseInt(v, 10)));
            } else {
                panel.addColorSelector("Color", props.fill || "black", colors, (v) => updateProp("fill", v));
                panel.addLabeledInput("Icon Size", "number", props.size || 24, (v) => updateProp("size", parseInt(v, 10)));
                panel.addSelect("Direction", props.direction || "right", ["right", "down"], (v) => updateProp("direction", v));
                panel.addLabeledInput("Spacing", "number", props.spacing || 6, (v) => updateProp("spacing", parseInt(v, 10)));
                panel.addLabeledInput("Icons (comma sep)", "text", Array.isArray(props.icons) ? props.icons.join(", ") : (props.icons || ""), (v) => updateProp("icons", v));
            }

            if (type === "odp_rectangle_pattern") {
                panel.addLabeledInput("Repeat X", "number", props.x_repeat || 3, (v) => updateProp("x_repeat", parseInt(v, 10)));
                panel.addLabeledInput("Repeat Y", "number", props.y_repeat || 2, (v) => updateProp("y_repeat", parseInt(v, 10)));
                panel.addLabeledInput("Size X", "number", props.x_size || 30, (v) => updateProp("x_size", parseInt(v, 10)));
                panel.addLabeledInput("Size Y", "number", props.y_size || 15, (v) => updateProp("y_size", parseInt(v, 10)));
            }
            if (type === "odp_arc") {
                panel.addLabeledInput("Start Angle", "number", props.start_angle || 0, (v) => updateProp("start_angle", parseInt(v, 10)));
                panel.addLabeledInput("End Angle", "number", props.end_angle || 90, (v) => updateProp("end_angle", parseInt(v, 10)));
            }
            panel.endSection();
        }
        else if (type === "odp_plot") {
            panel.createSection("Plot Config", true);
            panel.addLabeledInput("Duration (sec)", "number", props.duration || 36400, (v) => updateProp("duration", parseInt(v, 10)));
            panel.addColorSelector("Background", props.background || "white", colors, (v) => updateProp("background", v));
            panel.addColorSelector("Outline", props.outline || "#ccc", colors, (v) => updateProp("outline", v));
            panel.endSection();
        }
        else if (type === "odp_multiline") {
            panel.createSection("Multiline Content", true);
            panel.addLabeledInput("Text", "textarea", props.text || "Line 1|Line 2", (v) => updateProp("text", v));
            panel.addLabeledInput("Delimiter", "text", props.delimiter || "|", (v) => updateProp("delimiter", v));
            panel.endSection();

            panel.createSection("Appearance", true);
            panel.addLabeledInput("Font Size", "number", props.font_size || 16, (v) => updateProp("font_size", parseInt(v, 10)));
            panel.addLabeledInput("Line Spacing", "number", props.line_spacing || 4, (v) => updateProp("line_spacing", parseInt(v, 10)));
            panel.addColorSelector("Color", props.color || "black", colors, (v) => updateProp("color", v));
            panel.addSelect("Font", props.font_family || "Roboto", ["Roboto", "Inter", "Roboto Mono"], (v) => updateProp("font_family", v));
            panel.endSection();
        }
        else {
            // Smart Generic Fallback
            const hasEntity = widget.entity_id !== undefined || props.weather_entity !== undefined || type.includes("sensor") || type.includes("icon");

            if (hasEntity) {
                panel.createSection("Data Source", true);
                panel.addLabeledInputWithPicker("Entity ID", "text", widget.entity_id || props.weather_entity || "", (v) => {
                    if (props.weather_entity !== undefined) updateProp("weather_entity", v);
                    else AppState.updateWidget(widget.id, { entity_id: v });
                }, widget);

                if (widget.title !== undefined) {
                    panel.addLabeledInput("Title/Label", "text", widget.title || "", (v) => {
                        AppState.updateWidget(widget.id, { title: v });
                    });
                }
                panel.endSection();
            }

            panel.createSection("Appearance", true);
            panel.addColorSelector("Color", props.color || "black", colors, (v) => updateProp("color", v));
            if (props.bg_color !== undefined) {
                panel.addColorSelector("Background", props.bg_color || "transparent", colors, (v) => updateProp("bg_color", v));
            }
            if (props.size !== undefined) {
                panel.addLabeledInput("Size", "number", props.size || 24, (v) => updateProp("size", parseInt(v, 10)));
            }
            panel.endSection();
        }
    }

    static renderLegacyProperties(panel, widget, type) {
        const colors = getAvailableColors();
        const props = widget.props || {};

        const updateProp = (key, value) => {
            const newProps = { ...widget.props, [key]: value };
            AppState.updateWidget(widget.id, { props: newProps });
        };

        if (type === "text" || type === "label" || type === "datetime" || type === "sensor_text" || type === "entity_text") {
            panel.createSection("Content", true);

            if (type === "sensor_text") {
                panel.addLabeledInputWithPicker("Entity ID", "text", widget.entity_id || "", (v) => {
                    AppState.updateWidget(widget.id, { entity_id: v });
                    this.autoPopulateTitleFromEntity(widget.id, v);
                }, widget);
                panel.addLabeledInput("Attribute (optional)", "text", props.attribute || "", (v) => updateProp("attribute", v));
            } else if (type === "entity_text") {
                panel.addLabeledInputWithPicker("Entity ID", "text", widget.entity_id || "", (v) => AppState.updateWidget(widget.id, { entity_id: v }), widget);
                panel.addLabeledInput("Attribute", "text", props.attribute || "", (v) => updateProp("attribute", v));
            } else if (type === "datetime") {
                panel.addLabeledInput("Format", "text", props.format || "%H:%M", (v) => updateProp("format", v));
                panel.addHint("e.g. %H:%M or %A, %B %d");
            } else {
                panel.addLabeledInput("Text", "text", props.text || "Text", (v) => updateProp("text", v));
            }

            if (type === "sensor_text") {
                panel.addLabeledInput("Prefix", "text", props.prefix || "", (v) => updateProp("prefix", v));
                panel.addLabeledInput("Suffix", "text", props.suffix || "", (v) => updateProp("suffix", v));
                panel.addLabeledInput("Decimals", "number", props.decimals ?? 1, (v) => updateProp("decimals", parseInt(v, 10)));
            }
            panel.endSection();

            panel.createSection("Typography", true);
            panel.addLabeledInput("Font Size", "number", props.font_size || 20, (v) => updateProp("font_size", parseInt(v, 10)));

            const fontOptions = ["Roboto", "Inter", "Open Sans", "Lato", "Montserrat", "Poppins", "Raleway", "Roboto Mono", "Ubuntu", "Nunito", "Playfair Display", "Merriweather", "Work Sans", "Source Sans Pro", "Quicksand", "Custom..."];
            const currentFont = props.font_family || "Roboto";
            const isCustom = !fontOptions.slice(0, -1).includes(currentFont);

            panel.addSelect("Font", isCustom ? "Custom..." : currentFont, fontOptions, (v) => {
                if (v !== "Custom...") {
                    updateProp("font_family", v);
                    updateProp("custom_font_family", "");
                } else {
                    updateProp("font_family", "Custom...");
                }
            });

            if (isCustom || props.font_family === "Custom...") {
                panel.addLabeledInput("Custom Font Name", "text", props.custom_font_family || (isCustom ? currentFont : ""), (v) => {
                    updateProp("font_family", v || "Roboto");
                    updateProp("custom_font_family", v);
                });
                panel.addHint('Browse <a href="https://fonts.google.com" target="_blank">fonts.google.com</a>');
            }

            const availableWeights = getWeightsForFont(currentFont);
            let currentWeight = props.font_weight || 400;
            if (!availableWeights.includes(currentWeight)) {
                currentWeight = clampFontWeight(currentFont, currentWeight);
                setTimeout(() => updateProp("font_weight", currentWeight), 0);
            }

            panel.addSelect("Weight", currentWeight, availableWeights, (v) => updateProp("font_weight", parseInt(v, 10)));
            panel.addCheckbox("Italic", props.italic || false, (v) => updateProp("italic", v));

            const alignOptions = ["TOP_LEFT", "TOP_CENTER", "TOP_RIGHT", "CENTER_LEFT", "CENTER", "CENTER_RIGHT", "BOTTOM_LEFT", "BOTTOM_CENTER", "BOTTOM_RIGHT"];
            panel.addSelect("Align", props.text_align || (type === "datetime" ? "CENTER" : "TOP_LEFT"), alignOptions, (v) => updateProp("text_align", v));

            panel.addColorSelector("Color", props.color || "black", colors, (v) => updateProp("color", v));
            panel.endSection();

            panel.createSection("Appearance", false);
            panel.addColorSelector("Background", props.bg_color || "transparent", colors, (v) => updateProp("bg_color", v));
            panel.addLabeledInput("Opacity (0.0 - 1.0)", "number", props.opacity ?? 1.0, (v) => updateProp("opacity", parseFloat(v)));
            panel.addCheckbox("Word Wrap", props.word_wrap !== false, (v) => updateProp("word_wrap", v));
            if (type === "sensor_text") {
                panel.addCheckbox("Show Unit", props.show_unit !== false, (v) => updateProp("show_unit", v));
            }
            panel.endSection();
        }
        else if (type === "weather") {
            panel.createSection("Data Source", true);
            panel.addLabeledInputWithPicker("Weather Entity", "text", props.weather_entity || "weather.forecast", (v) => updateProp("weather_entity", v), widget);
            panel.endSection();

            panel.createSection("Appearance", true);
            panel.addLabeledInput("Icon Size", "number", props.icon_size || 48, (v) => updateProp("icon_size", parseInt(v, 10)));
            panel.addColorSelector("Icon Color", props.icon_color || "black", colors, (v) => updateProp("icon_color", v));
            panel.addCheckbox("Show Temperature", props.show_temp !== false, (v) => updateProp("show_temp", v));
            panel.addCheckbox("Show Condition", props.show_cond !== false, (v) => updateProp("show_cond", v));
            panel.endSection();
        }
        else if (type === "chart" || type === "state_history") {
            panel.createSection("Data Source", true);
            panel.addLabeledInputWithPicker("Entity ID", "text", widget.entity_id || "", (v) => AppState.updateWidget(widget.id, { entity_id: v }), widget);
            panel.addLabeledInput("Time Period (hours)", "number", props.hours || 24, (v) => updateProp("hours", parseInt(v, 10)));
            panel.endSection();

            panel.createSection("Appearance", true);
            panel.addColorSelector("Line Color", props.color || "blue", colors, (v) => updateProp("color", v));
            panel.addColorSelector("Fill Color", props.fill_color || "transparent", colors, (v) => updateProp("fill_color", v));
            panel.addLabeledInput("Line Width", "number", props.line_width || 2, (v) => updateProp("line_width", parseInt(v, 10)));
            panel.addCheckbox("Show Axes", props.show_axes !== false, (v) => updateProp("show_axes", v));
            panel.endSection();
        }
        else if (type === "gauge" || type === "progress") {
            panel.createSection("Data Source", true);
            panel.addLabeledInputWithPicker("Entity ID", "text", widget.entity_id || "", (v) => AppState.updateWidget(widget.id, { entity_id: v }), widget);
            panel.addLabeledInput("Min Value", "number", props.min || 0, (v) => updateProp("min", parseFloat(v)));
            panel.addLabeledInput("Max Value", "number", props.max || 100, (v) => updateProp("max", parseFloat(v)));
            panel.endSection();

            panel.createSection("Appearance", true);
            panel.addColorSelector("Bar Color", props.color || (type === "gauge" ? "blue" : "blue"), colors, (v) => updateProp("color", v));
            panel.addColorSelector("Background Color", props.bg_color || "#eee", colors, (v) => updateProp("bg_color", v));
            if (type === "gauge") {
                panel.addLabeledInput("Thickness", "number", props.thickness || 10, (v) => updateProp("thickness", parseInt(v, 10)));
            }
            panel.endSection();
        }
        else if (type === "switch" || type === "button") {
            panel.createSection("Action", true);
            panel.addLabeledInputWithPicker("Entity ID", "text", widget.entity_id || "", (v) => AppState.updateWidget(widget.id, { entity_id: v }), widget);
            panel.addLabeledInput("Label", "text", props.text || (type === "button" ? "Button" : "Switch"), (v) => updateProp("text", v));
            panel.endSection();

            panel.createSection("Appearance", true);
            panel.addColorSelector("Color", props.color || "blue", colors, (v) => updateProp("color", v));
            panel.addColorSelector("Text Color", props.text_color || "white", colors, (v) => updateProp("text_color", v));
            panel.endSection();
        }
        else if (type === "group" || type === "rectangle" || type === "circle" || type === "line") {
            panel.createSection("Appearance", true);
            panel.addColorSelector("Color", props.color || (type === "group" ? "transparent" : "black"), colors, (v) => updateProp("color", v));
            if (type !== "group") {
                panel.addLabeledInput("Border Width", "number", props.border_width || 1, (v) => updateProp("border_width", parseInt(v, 10)));
                panel.addColorSelector("Border Color", props.border_color || "black", colors, (v) => updateProp("border_color", v));
            }
            if (type === "rectangle") {
                panel.addLabeledInput("Corner Radius", "number", props.border_radius || 0, (v) => updateProp("border_radius", parseInt(v, 10)));
            }
            panel.endSection();
        }
        else if (type === "image") {
            panel.createSection("Content", true);
            panel.addHint("🖼️ Static image from ESPHome.<br/><span style='color:#888;font-size:11px;'>Replace the default path with your actual image file path.</span>");
            panel.addLabeledInput("Image Path", "text", props.path || "", (v) => updateProp("path", v));
            panel.endSection();

            panel.createSection("Appearance", true);
            if (props.invert === undefined) {
                updateProp("invert", getDeviceModel() === "reterminal_e1001");
            }
            panel.addCheckbox("Invert colors", props.invert || false, (v) => updateProp("invert", v));
            panel.addSelect("Render Mode", props.render_mode || "Auto", ["Auto", "Binary", "Grayscale", "Color (RGB565)"], (v) => updateProp("render_mode", v));

            const fillWrap = document.createElement("div");
            fillWrap.className = "field";
            fillWrap.style.marginTop = "12px";
            const isFullScreen = (widget.x === 0 && widget.y === 0 && widget.width === 800 && widget.height === 480);
            const fillBtn = document.createElement("button");
            fillBtn.className = "btn " + (isFullScreen ? "btn-primary" : "btn-secondary") + " btn-full";
            fillBtn.textContent = isFullScreen ? "✓ Full Screen (click to restore)" : "⛶ Fill Screen";
            fillBtn.type = "button";
            fillBtn.addEventListener("click", () => {
                if (isFullScreen) {
                    AppState.updateWidget(widget.id, { x: 50, y: 50, width: 200, height: 150 });
                } else {
                    AppState.updateWidget(widget.id, { x: 0, y: 0, width: 800, height: 480 });
                }
            });
            fillWrap.appendChild(fillBtn);
            panel.getContainer().appendChild(fillWrap);
            panel.endSection();
        }
        else if (type === "online_image") {
            panel.createSection("Content", true);
            panel.addHint("💡 Fetch remote images dynamically (Puppet support):<br/><code style='background:#f0f0f0;padding:2px 4px;border-radius:2px;'>https://example.com/camera/snapshot.jpg </code><br/><span style='color:#4a9eff;'>ℹ️ Images are downloaded at specified intervals</span>");
            panel.addLabeledInput("Remote URL", "text", props.url || "", (v) => updateProp("url", v));
            panel.addLabeledInput("Update interval (seconds)", "number", props.interval_s || 300, (v) => updateProp("interval_s", parseInt(v, 10)));
            panel.endSection();

            panel.createSection("Appearance", true);
            if (props.invert === undefined) {
                updateProp("invert", getDeviceModel() === "reterminal_e1001");
            }
            panel.addCheckbox("Invert colors", props.invert || false, (v) => updateProp("invert", v));
            panel.addSelect("Render Mode", props.render_mode || "Auto", ["Auto", "Binary", "Grayscale", "Color (RGB565)"], (v) => updateProp("render_mode", v));

            const fillWrap = document.createElement("div");
            fillWrap.className = "field";
            fillWrap.style.marginTop = "12px";
            const isFullScreen = (widget.x === 0 && widget.y === 0 && widget.width === 800 && widget.height === 480);
            const fillBtn = document.createElement("button");
            fillBtn.className = "btn " + (isFullScreen ? "btn-primary" : "btn-secondary") + " btn-full";
            fillBtn.textContent = isFullScreen ? "✓ Full Screen (click to restore)" : "⛶ Fill Screen";
            fillBtn.type = "button";
            fillBtn.addEventListener("click", () => {
                if (isFullScreen) {
                    AppState.updateWidget(widget.id, { x: 50, y: 50, width: 200, height: 150 });
                } else {
                    AppState.updateWidget(widget.id, { x: 0, y: 0, width: 800, height: 480 });
                }
            });
            fillWrap.appendChild(fillBtn);
            panel.getContainer().appendChild(fillWrap);
            panel.endSection();
        }
        else if (type === "qr_code") {
            panel.createSection("Content", true);
            panel.addHint("📱 Generate QR codes that can be scanned by phones/tablets");
            panel.addLabeledInput("QR Content", "text", props.value || "https://esphome.io", (v) => updateProp("value", v));
            panel.addHint("Enter a URL, text, or any string to encode");
            panel.endSection();

            panel.createSection("Appearance", true);
            panel.addLabeledInput("Scale", "number", props.scale || 2, (v) => {
                let n = parseInt(v || "2", 10);
                if (Number.isNaN(n) || n < 1) n = 1;
                if (n > 10) n = 10;
                updateProp("scale", n);
            });
            panel.addHint("Size multiplier (1-10). Larger = bigger QR code");
            panel.addSelect("Error Correction", props.ecc || "LOW", ["LOW", "MEDIUM", "QUARTILE", "HIGH"], (v) => updateProp("ecc", v));
            panel.addHint("Higher = more redundancy, can recover from damage");
            panel.addSelect("Color", props.color || "black", ["black", "white"], (v) => updateProp("color", v));
            panel.endSection();
        }
        else if (type === "quote_rss") {
            panel.createSection("Feed Settings", true);
            panel.addHint("📰 Display quotes from an RSS feed (Quote of the Day)");
            panel.addLabeledInput("Feed URL", "text", props.feed_url || "https://www.brainyquote.com/link/quotebr.rss", (v) => updateProp("feed_url", v));
            panel.addHint("Enter any RSS feed URL. Default: BrainyQuote daily quotes");
            panel.addCheckbox("Show Author", props.show_author !== false, (v) => updateProp("show_author", v));
            panel.addCheckbox("Random Quote", props.random !== false, (v) => updateProp("random", v));
            panel.addHint("Pick a random quote from the feed, or use the first one");
            const refreshOptions = ["15min", "30min", "1h", "2h", "4h", "8h", "12h", "24h"];
            panel.addSelect("Refresh Interval", props.refresh_interval || "24h", refreshOptions, (v) => updateProp("refresh_interval", v));
            panel.addLabeledInput("Home Assistant URL", "text", props.ha_url || "http://homeassistant.local:8123", (v) => updateProp("ha_url", v));
            panel.addHint("Address of your Home Assistant instance (for Proxy)");
            panel.endSection();

            panel.createSection("Typography", false);
            panel.addLabeledInput("Quote Text Size (Line 1)", "number", props.quote_font_size || 18, (v) => updateProp("quote_font_size", parseInt(v, 10)));
            panel.addLabeledInput("Author Size (Line 2)", "number", props.author_font_size || 14, (v) => updateProp("author_font_size", parseInt(v, 10)));
            const fontOptions = ["Roboto", "Inter", "Open Sans", "Lato", "Montserrat", "Poppins", "Raleway", "Roboto Mono", "Ubuntu", "Nunito", "Playfair Display", "Merriweather", "Work Sans", "Source Sans Pro", "Quicksand", "Custom..."];
            const currentFont = props.font_family || "Roboto";
            const isCustom = !fontOptions.slice(0, -1).includes(currentFont);
            panel.addSelect("Font", isCustom ? "Custom..." : currentFont, fontOptions, (v) => {
                if (v !== "Custom...") {
                    updateProp("font_family", v);
                    updateProp("custom_font_family", "");
                } else {
                    updateProp("font_family", "Custom...");
                }
            });
            if (isCustom || props.font_family === "Custom...") {
                panel.addLabeledInput("Custom Font Name", "text", props.custom_font_family || (isCustom ? currentFont : ""), (v) => {
                    updateProp("font_family", v || "Roboto");
                    updateProp("custom_font_family", v);
                });
                panel.addHint('Browse <a href="https://fonts.google.com" target="_blank">fonts.google.com</a>');
            }
            const availableWeights = getWeightsForFont(currentFont);
            let currentWeight = props.font_weight || 400;
            if (!availableWeights.includes(currentWeight)) {
                currentWeight = clampFontWeight(currentFont, currentWeight);
                setTimeout(() => updateProp("font_weight", currentWeight), 0);
            }
            panel.addSelect("Weight", currentWeight, availableWeights, (v) => updateProp("font_weight", parseInt(v, 10)));
            const alignOptions = ["TOP_LEFT", "TOP_CENTER", "TOP_RIGHT", "CENTER_LEFT", "CENTER", "CENTER_RIGHT", "BOTTOM_LEFT", "BOTTOM_CENTER", "BOTTOM_RIGHT"];
            panel.addSelect("Align", props.text_align || "TOP_LEFT", alignOptions, (v) => updateProp("text_align", v));
            panel.addColorSelector("Color", props.color || "black", colors, (v) => updateProp("color", v));
            panel.endSection();

            panel.createSection("Display Options", false);
            panel.addCheckbox("Word Wrap", props.word_wrap !== false, (v) => updateProp("word_wrap", v));
            panel.addCheckbox("Auto Scale Text", props.auto_scale || false, (v) => updateProp("auto_scale", v));
            panel.addHint("Automatically reduce font size if text is too long");
            panel.addCheckbox("Italic Quote", props.italic_quote !== false, (v) => updateProp("italic_quote", v));
            panel.endSection();
        }
        else if (type === "calendar") {
            panel.createSection("Appearance", true);
            panel.addColorSelector("Text Color", props.text_color || "black", colors, (v) => updateProp("text_color", v));
            panel.addColorSelector("Background", props.background_color || "white", colors, (v) => updateProp("background_color", v));
            panel.endSection();

            panel.createSection("Border Style", false);
            panel.addLabeledInput("Border Width", "number", props.border_width || 0, (v) => updateProp("border_width", parseInt(v, 10)));
            panel.addColorSelector("Border Color", props.border_color || "theme_auto", colors, (v) => updateProp("border_color", v));
            panel.addLabeledInput("Corner Radius", "number", props.border_radius || 0, (v) => updateProp("border_radius", parseInt(v, 10)));
            panel.addDropShadowButton(panel.getContainer(), widget.id);
            panel.endSection();

            panel.createSection("Font Sizes", false);
            panel.addLabeledInput("Big Date Size", "number", props.font_size_date || 100, (v) => updateProp("font_size_date", parseInt(v, 10)));
            panel.addLabeledInput("Day Name Size", "number", props.font_size_day || 24, (v) => updateProp("font_size_day", parseInt(v, 10)));
            panel.addLabeledInput("Grid Text Size", "number", props.font_size_grid || 14, (v) => updateProp("font_size_grid", parseInt(v, 10)));
            panel.addLabeledInput("Event Text Size", "number", props.font_size_event || 18, (v) => updateProp("font_size_event", parseInt(v, 10)));
            panel.endSection();

            panel.createSection("Visibility", true);
            panel.addCheckbox("Show Header", props.show_header !== false, (v) => updateProp("show_header", v));
            panel.addCheckbox("Show Grid", props.show_grid !== false, (v) => updateProp("show_grid", v));
            panel.addCheckbox("Show Events", props.show_events !== false, (v) => updateProp("show_events", v));
            panel.endSection();

            panel.createSection("Data Source", true);
            panel.addLabeledInputWithPicker("Entity ID", "text", widget.entity_id || "sensor.esp_calendar_data", (v) => {
                AppState.updateWidget(widget.id, { entity_id: v });
            }, widget);
            panel.addLabeledInput("Max Events", "number", props.max_events || 8, (v) => updateProp("max_events", parseInt(v, 10)));
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
        }
        else if (type === "puppet") {
            panel.createSection("Content", true);
            panel.addLabeledInput("File path / URL", "text", props.image_url || "", (v) => updateProp("image_url", v));
            panel.addHint('Tip: Use mdi:icon-name for Material Design Icons. <br><b>Important:</b> Ensure `materialdesignicons - webfont.ttf` is in your ESPHome `fonts / ` folder. <a href="https://pictogrammers.com/library/mdi/" target="_blank" style="color: #52c7ea">MDI Library</a>');
            panel.endSection();

            panel.createSection("Appearance", true);
            panel.addSelect("Image type", props.image_type || "RGB565", ["RGB565", "RGB", "GRAYSCALE", "BINARY"], (v) => updateProp("image_type", v));
            panel.addHint("RGB565=2B/px, RGB=3B/px, GRAYSCALE=1B/px, BINARY=1bit/px");
            panel.addSelect("Transparency", props.transparency || "opaque", ["opaque", "chroma_key", "alpha_channel"], (v) => updateProp("transparency", v));
            panel.addHint("opaque=no transparency, chroma_key=color key, alpha_channel=smooth blend");
            panel.endSection();
        }
        else if (type === "lvgl_label" || type.startsWith("lvgl_")) {
            panel.addCommonLVGLProperties(widget, props);
            panel.createSection("Widget Settings", true);

            if (type === "lvgl_label") {
                panel.addLabeledInput("Text", "text", props.text || "Label", (v) => updateProp("text", v));
                panel.addLabeledInput("Font Size", "number", props.font_size || 20, (v) => updateProp("font_size", parseInt(v, 10)));
                panel.addColorMixer("Text Color", props.color || "black", (v) => updateProp("color", v));
                panel.addColorMixer("Background Color", props.bg_color || "transparent", (v) => updateProp("bg_color", v));
                const fontOptions = ["Roboto", "Inter", "Open Sans", "Lato", "Montserrat", "Poppins", "Raleway", "Roboto Mono", "Ubuntu", "Nunito", "Playfair Display", "Merriweather", "Work Sans", "Source Sans Pro", "Quicksand", "Custom..."];
                const currentFont = props.font_family || "Roboto";
                const isCustom = !fontOptions.slice(0, -1).includes(currentFont);
                panel.addSelect("Font", isCustom ? "Custom..." : currentFont, fontOptions, (v) => {
                    if (v !== "Custom...") updateProp("font_family", v);
                    else updateProp("font_family", "Custom...");
                });
                const availableWeights = getWeightsForFont(currentFont);
                let currentWeight = props.font_weight || 400;
                if (!availableWeights.includes(currentWeight)) {
                    currentWeight = clampFontWeight(currentFont, currentWeight);
                    setTimeout(() => updateProp("font_weight", currentWeight), 0);
                }
                panel.addSelect("Weight", currentWeight, availableWeights, (v) => updateProp("font_weight", parseInt(v, 10)));
                panel.addCheckbox("Italic", props.italic || false, (v) => updateProp("italic", v));
                const alignOptions = ["TOP_LEFT", "TOP_CENTER", "TOP_RIGHT", "CENTER_LEFT", "CENTER", "CENTER_RIGHT", "BOTTOM_LEFT", "BOTTOM_CENTER", "BOTTOM_RIGHT"];
                panel.addSelect("Align", props.text_align || "CENTER", alignOptions, (v) => updateProp("text_align", v));
            }
            else if (type === "lvgl_line") {
                const orientation = props.orientation || "horizontal";
                panel.addSelect("Orientation", orientation, ["horizontal", "vertical"], (v) => {
                    const oldW = widget.width;
                    const oldH = widget.height;
                    AppState.updateWidget(widget.id, { props: { ...props, orientation: v }, width: oldH, height: oldW });
                });
                panel.addLabeledInput("Line Width", "number", props.line_width || 3, (v) => updateProp("line_width", parseInt(v, 10)));
                panel.addColorMixer("Line Color", props.line_color || props.color || "black", (v) => updateProp("line_color", v));
                panel.addCheckbox("Rounded Ends", props.line_rounded !== false, (v) => updateProp("line_rounded", v));
                panel.addLabeledInput("Opacity (0-255)", "number", props.opa || 255, (v) => updateProp("opa", parseInt(v, 10)));
                panel.createSection("Quick Size", false);
                const fillBtnContainer = document.createElement("div");
                fillBtnContainer.style.display = "flex";
                fillBtnContainer.style.gap = "8px";
                fillBtnContainer.style.marginBottom = "8px";
                const resolution = AppState.getCanvasDimensions();
                const canvasW = resolution.width;
                const canvasH = resolution.height;
                const fillHBtn = document.createElement("button");
                fillHBtn.className = "btn btn-secondary";
                fillHBtn.style.flex = "1";
                fillHBtn.textContent = "↔ Fill Horizontal";
                fillHBtn.addEventListener("click", () => {
                    AppState.updateWidget(widget.id, { x: 0, y: widget.y, width: canvasW, height: props.line_width || 3, props: { ...props, orientation: "horizontal" } });
                });
                const fillVBtn = document.createElement("button");
                fillVBtn.className = "btn btn-secondary";
                fillVBtn.style.flex = "1";
                fillVBtn.textContent = "↕ Fill Vertical";
                fillVBtn.addEventListener("click", () => {
                    AppState.updateWidget(widget.id, { x: widget.x, y: 0, width: props.line_width || 3, height: canvasH, props: { ...props, orientation: "vertical" } });
                });
                fillBtnContainer.appendChild(fillHBtn);
                fillBtnContainer.appendChild(fillVBtn);
                panel.getContainer().appendChild(fillBtnContainer);
                panel.endSection();
            }
            else if (type === "lvgl_meter") {
                panel.addLabeledInputWithPicker("Entity ID", "text", widget.entity_id || "", (v) => AppState.updateWidget(widget.id, { entity_id: v }), widget);
                panel.createSection("Size", false);
                const currentSize = Math.max(widget.width, widget.height);
                panel.addLabeledInput("Size (px)", "number", currentSize, (v) => {
                    const size = parseInt(v, 10) || 100;
                    AppState.updateWidget(widget.id, { width: size, height: size });
                });
                panel.addHint("⚠️ Meter widgets must be square. Width and height are locked together.");
                panel.endSection();
                panel.createSection("Scale", false);
                panel.addLabeledInput("Min Value", "number", props.min || 0, (v) => updateProp("min", parseInt(v, 10)));
                panel.addLabeledInput("Max Value", "number", props.max || 100, (v) => updateProp("max", parseInt(v, 10)));
                panel.endSection();
                panel.createSection("Preview", false);
                panel.addLabeledInput("Value (Preview)", "number", props.value !== undefined ? props.value : 60, (v) => updateProp("value", parseInt(v, 10)));
                panel.endSection();
                panel.createSection("Appearance", false);
                panel.addColorMixer("Scale Color", props.color || "black", (v) => updateProp("color", v));
                panel.addColorMixer("Needle Color", props.indicator_color || "red", (v) => updateProp("indicator_color", v));
                panel.addLabeledInput("Scale Width", "number", props.scale_width || 10, (v) => updateProp("scale_width", parseInt(v, 10)));
                panel.addLabeledInput("Needle Width", "number", props.indicator_width || 4, (v) => updateProp("indicator_width", parseInt(v, 10)));
                panel.addLabeledInput("Ticks", "number", props.tick_count || 11, (v) => updateProp("tick_count", parseInt(v, 10)));
                panel.addLabeledInput("Tick Length", "number", props.tick_length || 10, (v) => updateProp("tick_length", parseInt(v, 10)));
                panel.addLabeledInput("Label Gap", "number", props.label_gap || 10, (v) => updateProp("label_gap", parseInt(v, 10)));
                panel.endSection();
            }
            else if (type === "lvgl_button") {
                panel.addLabeledInputWithPicker("Action Entity ID", "text", widget.entity_id || "", (v) => AppState.updateWidget(widget.id, { entity_id: v }), widget);
                panel.addHint("Entity to toggle/trigger when clicked");
                panel.addLabeledInput("Text", "text", props.text || "BTN", (v) => updateProp("text", v));
                panel.addColorMixer("Background Color", props.bg_color || "white", (v) => updateProp("bg_color", v));
                panel.addColorMixer("Text Color", props.color || "black", (v) => updateProp("color", v));
                panel.addLabeledInput("Border Width", "number", props.border_width || 2, (v) => updateProp("border_width", parseInt(v, 10)));
                panel.addLabeledInput("Corner Radius", "number", props.radius || 5, (v) => updateProp("radius", parseInt(v, 10)));
                panel.addCheckbox("Checkable (Toggle)", props.checkable || false, (v) => updateProp("checkable", v));
            }
            else if (type === "lvgl_arc") {
                panel.addLabeledInputWithPicker("Sensor Entity ID", "text", widget.entity_id || "", (v) => AppState.updateWidget(widget.id, { entity_id: v }), widget);
                panel.addHint("Sensor to bind to arc value");
                panel.addLabeledInput("Title / Label", "text", props.title || "", (v) => updateProp("title", v));
                panel.addLabeledInput("Min Value", "number", props.min || 0, (v) => updateProp("min", parseInt(v, 10)));
                panel.addLabeledInput("Max Value", "number", props.max || 100, (v) => updateProp("max", parseInt(v, 10)));
                panel.addLabeledInput("Default/Preview Value", "number", props.value || 0, (v) => updateProp("value", parseInt(v, 10)));
                panel.addLabeledInput("Thickness", "number", props.thickness || 10, (v) => updateProp("thickness", parseInt(v, 10)));
                panel.addLabeledInput("Start Angle", "number", props.start_angle || 135, (v) => updateProp("start_angle", parseInt(v, 10)));
                panel.addLabeledInput("End Angle", "number", props.end_angle || 45, (v) => updateProp("end_angle", parseInt(v, 10)));
                panel.addSelect("Mode", props.mode || "NORMAL", ["NORMAL", "SYMMETRICAL", "REVERSE"], (v) => updateProp("mode", v));
                panel.addColorMixer("Color", props.color || "blue", (v) => updateProp("color", v));
            }
            else if (type === "lvgl_chart") {
                panel.addLabeledInputWithPicker("Entity ID", "text", widget.entity_id || "", (v) => AppState.updateWidget(widget.id, { entity_id: v }), widget);
                panel.addLabeledInput("Title", "text", props.title || "", (v) => updateProp("title", v));
                panel.addSelect("Type", props.type || "LINE", ["LINE", "SCATTER", "BAR"], (v) => updateProp("type", v));
                panel.addLabeledInput("Min Value", "number", props.min || 0, (v) => updateProp("min", parseInt(v, 10)));
                panel.addLabeledInput("Max Value", "number", props.max || 100, (v) => updateProp("max", parseInt(v, 10)));
                panel.addLabeledInput("Point Count", "number", props.point_count || 10, (v) => updateProp("point_count", parseInt(v, 10)));
                panel.addLabeledInput("X Div Lines", "number", props.x_div_lines || 3, (v) => updateProp("x_div_lines", parseInt(v, 10)));
                panel.addLabeledInput("Y Div Lines", "number", props.y_div_lines || 3, (v) => updateProp("y_div_lines", parseInt(v, 10)));
                panel.addColorMixer("Color", props.color || "black", (v) => updateProp("color", v));
            }
            else if (type === "lvgl_img") {
                panel.addLabeledInput("Source (Image/Symbol)", "text", props.src || "", (v) => updateProp("src", v));
                panel.addHint("e.g. symbol_ok, symbol_home, or /image.png");
                panel.addLabeledInput("Rotation (0.1 deg)", "number", props.rotation || 0, (v) => updateProp("rotation", parseInt(v, 10)));
                panel.addLabeledInput("Scale (256 = 1x)", "number", props.scale || 256, (v) => updateProp("scale", parseInt(v, 10)));
                panel.addColorMixer("Color (Tint)", props.color || "black", (v) => updateProp("color", v));
            }
            else if (type === "lvgl_qrcode") {
                panel.addLabeledInput("Content / URL", "text", props.text || "", (v) => updateProp("text", v));
                panel.addLabeledInput("Size (px)", "number", props.size || 100, (v) => updateProp("size", parseInt(v, 10)));
                panel.addColorMixer("Color", props.color || "black", (v) => updateProp("color", v));
                panel.addColorMixer("Background Color", props.bg_color || "white", (v) => updateProp("bg_color", v));
            }
            else if (type === "lvgl_bar") {
                panel.addLabeledInputWithPicker("Entity ID", "text", widget.entity_id || "", (v) => AppState.updateWidget(widget.id, { entity_id: v }), widget);
                panel.addLabeledInput("Min", "number", props.min || 0, (v) => updateProp("min", parseInt(v, 10)));
                panel.addLabeledInput("Max", "number", props.max || 100, (v) => updateProp("max", parseInt(v, 10)));
                panel.addLabeledInput("Value", "number", props.value || 50, (v) => updateProp("value", parseInt(v, 10)));
                panel.addColorMixer("Bar Color", props.color || "black", (v) => updateProp("color", v));
                panel.addColorMixer("Background Color", props.bg_color || "gray", (v) => updateProp("bg_color", v));
                panel.addLabeledInput("Start Value", "number", props.start_value || 0, (v) => updateProp("start_value", parseInt(v, 10)));
                panel.addSelect("Mode", props.mode || "NORMAL", ["NORMAL", "SYMMETRICAL", "REVERSE"], (v) => updateProp("mode", v));
                panel.addCheckbox("Range Mode", props.range_mode || false, (v) => updateProp("range_mode", v));
            }
            else if (type === "lvgl_slider") {
                panel.addLabeledInputWithPicker("Entity ID", "text", widget.entity_id || "", (v) => AppState.updateWidget(widget.id, { entity_id: v }), widget);
                panel.addSegmentedControl("Orientation", [{ value: "Horizontal", label: "Horiz", icon: "mdi-arrow-left-right" }, { value: "Vertical", label: "Vert", icon: "mdi-arrow-up-down" }], props.vertical ? "Vertical" : "Horizontal", (v) => {
                    const newVertical = v === "Vertical";
                    const oldW = widget.width; const oldH = widget.height;
                    AppState.updateWidget(widget.id, { props: { ...props, vertical: newVertical }, width: oldH, height: oldW });
                });
                panel.addCompactPropertyRow(() => {
                    panel.addLabeledInput("Min", "number", props.min || 0, (v) => updateProp("min", parseInt(v, 10)));
                    panel.addLabeledInput("Max", "number", props.max || 100, (v) => updateProp("max", parseInt(v, 10)));
                });
                panel.addNumberWithSlider("Value", props.value || 30, props.min || 0, props.max || 100, (v) => updateProp("value", v));
                panel.addColorMixer("Knob/Bar Color", props.color || "black", (v) => updateProp("color", v));
                panel.addColorMixer("Track Color", props.bg_color || "gray", (v) => updateProp("bg_color", v));
                panel.addLabeledInput("Border Width", "number", props.border_width || 2, (v) => updateProp("border_width", parseInt(v, 10)));
                panel.addSelect("Mode", props.mode || "NORMAL", ["NORMAL", "SYMMETRICAL", "REVERSE"], (v) => updateProp("mode", v));
            }
            else if (type === "lvgl_tabview") {
                panel.addLabeledInput("Tabs (comma separated)", "text", (props.tabs || []).join(", "), (v) => {
                    const tabs = v.split(",").map(t => t.trim()).filter(t => t);
                    updateProp("tabs", tabs);
                });
                panel.addColorMixer("Background Color", props.bg_color || "white", (v) => updateProp("bg_color", v));
            }
            else if (type === "lvgl_checkbox") {
                panel.addLabeledInputWithPicker("Entity ID", "text", widget.entity_id || "", (v) => AppState.updateWidget(widget.id, { entity_id: v }), widget);
                panel.addLabeledInput("Label", "text", props.text || "Checkbox", (v) => updateProp("text", v));
                panel.addCheckbox("Checked", props.checked || false, (v) => updateProp("checked", v));
                panel.addColorMixer("Color", props.color || "blue", (v) => updateProp("color", v));
            }
            else if (type === "lvgl_dropdown") {
                panel.addLabeledInput("Options (one per line)", "textarea", props.options || "", (v) => updateProp("options", v));
                panel.addCompactPropertyRow(() => {
                    panel.addLabeledInput("Index", "number", props.selected_index || 0, (v) => updateProp("selected_index", parseInt(v, 10)));
                    panel.addLabeledInput("Max H", "number", props.max_height || 200, (v) => updateProp("max_height", parseInt(v, 10)));
                });
                panel.addSegmentedControl("Direction", [{ value: "DOWN", icon: "mdi-arrow-down" }, { value: "UP", icon: "mdi-arrow-up" }, { value: "LEFT", icon: "mdi-arrow-left" }, { value: "RIGHT", icon: "mdi-arrow-right" }], props.direction || "DOWN", (v) => updateProp("direction", v));
                panel.addColorMixer("Color", props.color || "white", (v) => updateProp("color", v));
            }
            else if (type === "lvgl_switch") {
                panel.addLabeledInputWithPicker("Entity ID", "text", widget.entity_id || "", (v) => AppState.updateWidget(widget.id, { entity_id: v }), widget);
                panel.addCheckbox("Checked", props.checked || false, (v) => updateProp("checked", v));
                panel.addColorMixer("Indicator Color", props.color || "blue", (v) => updateProp("color", v));
                panel.addColorMixer("Background Color", props.bg_color || "gray", (v) => updateProp("bg_color", v));
                panel.addColorMixer("Knob Color", props.knob_color || "white", (v) => updateProp("knob_color", v));
            }
            else if (type === "lvgl_textarea") {
                panel.addLabeledInput("Placeholder", "text", props.placeholder || "", (v) => updateProp("placeholder", v));
                panel.addLabeledInput("Text", "text", props.text || "", (v) => updateProp("text", v));
                panel.addCheckbox("One Line", props.one_line || false, (v) => updateProp("one_line", v));
                panel.addCheckbox("Password Mode", props.password_mode || false, (v) => updateProp("password_mode", v));
                panel.addLabeledInput("Accepted Chars", "text", props.accepted_chars || "", (v) => updateProp("accepted_chars", v));
                panel.addLabeledInput("Max Length", "number", props.max_length || 0, (v) => updateProp("max_length", parseInt(v, 10)));
            }
            panel.endSection();
        }
    }
}
