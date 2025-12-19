// Imports removed - using global scope
// AppState from state.js
// on, EVENTS from events.js
// getAvailableColors, getDeviceModel from device.js

// ============================================================================
// HELPER SCRIPTS
// ============================================================================

const CALENDAR_HELPER_SCRIPT = `# Dictionary to map calendar keys to their corresponding names
# One word calandars don't need to be added calendar.jobs would map to Jobs by default without adding it here
# calendar.hello_world should be added on the other hand
CALENDAR_NAMES = {"calendar.x": "X", "calendar.Y": "Y"}
# Day names (which are displayed in the calendar event list) can be translated here if required
DAY_NAMES = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
# How many entries to send to the ESPHome device
MAX_ENTRIES = 8

def convert_calendar_format(data, today):
    # Initialize a dictionary to store events grouped by date
    events_by_date = {}
    entrie_count = 0
    
    # Variable to store the end time of the closest event that will end
    closest_end_time = None
    
    # Iterate through calendar keys and events
    for calendar_key, events_list in data.items():
        for event in events_list['events']:
            if 'description' in event:
                event.pop('description')
                
            # Attempt to split the 'event[start]' into date and time parts
            parts = event['start'].split("T")
            event_date = parts[0]
            event_time = parts[1] if len(parts) > 1 else None  # event_time might not be present
            
            # Compare the event_date with today's date
            if event_date < today:
                # If the event's date is before today, update it to today's date (in case of multi day event starting before today)
                event['start'] = today if event_time is None else f"{today}T{event_time}"
                event_date = today
            
            # Add calendar name to event
            # If calendar key exists in CALENDAR_NAMES, use its value, otherwise capitalize the second part of the key
            event['calendar_name'] = CALENDAR_NAMES.get(calendar_key, calendar_key.split(".")[1].capitalize())
            
            # Parse location_name and location_address
            if 'location' in event:
                # Split the 'location' string into lines based on the newline character
                location_lines = event['location'].split('\\n')
                if len(location_lines) >= 2:
                    # If there are at least two lines, consider the first line as 'location_name' and the second line as 'location_address'
                    event['location_name'] = location_lines[0]
                    # event['location_address'] = location_lines[1]
                elif len(location_lines) == 1:
                    # If there's only one line, consider it as 'location_name'
                    event['location_name'] = location_lines[0]
                    
                # Remove the 'location' key from the event since it's been parsed into 'location_name' and 'location_address'
                event.pop('location')
                    
            # Add event to events_by_date dictionary
            if event_date in events_by_date:
                events_by_date[event_date].append(event)
            else:
                events_by_date[event_date] = [event]
                
    # Sort events by date
    sorted_dates = sorted(events_by_date.keys())
    
    # Initialize a list to store the final date objects
    result = []
    
    # Iterate through sorted dates
    for date in sorted_dates:
        all_day_events = []
        other_events = []
        for event in events_by_date[date]:
            if entrie_count == MAX_ENTRIES:
                break
            
            # Check if the event lasts for the whole day
            start_date = event['start']
            end_date = event['end']
            if 'T' not in event['start']:
                all_day_events.append(event)
            else:
                other_events.append(event)
                
            entrie_count = entrie_count + 1
        
        if other_events and date == today:
            closest_end_time = sorted(other_events, key=lambda item:dt_util.parse_datetime(item['end']), reverse=False)[0]["end"]
        
        if all_day_events or other_events:
            # Sort other_events by start time
            other_events.sort(key=lambda item:dt_util.parse_datetime(item['start']), reverse=False)
            
            # Construct dictionary for the date
            # is_today cast to int because a bool somehow crashes my esphome config
            day_item = {
                'date': date,
                'day': dt_util.parse_datetime(date).day,
                'is_today': int(date == dt_util.now().isoformat().split("T")[0]),
                'day_name': DAY_NAMES[dt_util.parse_datetime(date).weekday()],
                'all_day': all_day_events,
                'other': other_events
            }
            result.append(day_item)
        
    return (result, closest_end_time)

# Access the data received from the Home Assistant service call
input_data = data["calendar"]
today = data["now"]

# Convert the received data into the format expected by the epaper display
converted_data = convert_calendar_format(input_data, today)

# Pass the output back to Home Assistant
output["entries"] = converted_data[0]
output["closest_end_time"] = converted_data[1]
`;

class PropertiesPanel {
    constructor() {
        this.panel = document.getElementById("propertiesPanel");
        this.lastRenderedWidgetId = null; // Track which widget was last rendered
        this.init();
    }

    init() {
        // Subscribe to events
        on(EVENTS.SELECTION_CHANGED, () => this.render());
        on(EVENTS.STATE_CHANGED, () => this.render());

        // Bind Snap Toggle (Static in sidebar)
        const snapToggle = document.getElementById("snapToggle");
        if (snapToggle) {
            // Initialize state from AppState
            snapToggle.checked = AppState.snapEnabled;

            // Listen for user interaction
            snapToggle.addEventListener("change", (e) => {
                AppState.setSnapEnabled(e.target.checked);
            });

            // Listen for state changes (e.g. from Editor Settings modal)
            on(EVENTS.SETTINGS_CHANGED, (settings) => {
                if (settings.snapEnabled !== undefined) {
                    snapToggle.checked = settings.snapEnabled;
                }
            });
        }

        this.render();
    }

    render() {
        if (!this.panel) return;

        // Get current selected widget ID
        const currentWidgetId = AppState.selectedWidgetId;

        // Check if the selected widget changed - if so, force re-render
        const widgetChanged = this.lastRenderedWidgetId !== currentWidgetId;

        // Prevent re-rendering if user is typing in the panel AND same widget
        // This avoids losing focus/cursor position while editing the same widget
        // But if the widget changed, we MUST re-render to show correct properties
        if (!widgetChanged && this.panel.contains(document.activeElement)) {
            const tag = document.activeElement.tagName.toLowerCase();
            if (tag === "input" || tag === "textarea") {
                return;
            }
        }

        // Update tracking
        this.lastRenderedWidgetId = currentWidgetId;

        this.panel.innerHTML = "";
        const widget = AppState.getSelectedWidget();

        if (!widget) {
            this.panel.innerHTML = "<div style='padding:16px;color:#aaa;text-align:center;'>Select a widget to edit properties</div>";
            return;
        }

        const type = (widget.type || "").toLowerCase();
        const title = document.createElement("div");
        title.className = "sidebar-section-label";
        title.style.marginTop = "0";
        title.textContent = `${type} Properties`;
        this.panel.appendChild(title);

        // === LAYER ORDER SECTION (TOP) ===
        this.addSectionLabel("Layer Order");
        this.addLayerOrderButtons(widget);

        // === COMMON PROPERTIES ===
        this.addSectionLabel("Position & Size");
        this.addLabeledInput("Position X", "number", widget.x, (v) => {
            AppState.updateWidget(widget.id, { x: parseInt(v, 10) || 0 });
        });
        this.addLabeledInput("Position Y", "number", widget.y, (v) => {
            AppState.updateWidget(widget.id, { y: parseInt(v, 10) || 0 });
        });
        this.addLabeledInput("Width", "number", widget.width, (v) => {
            AppState.updateWidget(widget.id, { width: parseInt(v, 10) || 10 });
        });
        this.addLabeledInput("Height", "number", widget.height, (v) => {
            AppState.updateWidget(widget.id, { height: parseInt(v, 10) || 10 });
        });

        // === WIDGET-SPECIFIC PROPERTIES ===
        this.addSectionLabel("Widget Settings");

        // Feature Registry Schema Support (Future)
        if (window.FeatureRegistry) {
            const feature = window.FeatureRegistry.get(type);
            if (feature && feature.schema) {
                // TODO: Implement full schema-driven rendering
            }
        }

        // Legacy Widget Specific Logic
        this.renderLegacyProperties(widget, type);

        // === VISIBILITY CONDITIONS SECTION (BOTTOM) ===
        this.addSectionLabel("Visibility Conditions");
        this.addVisibilityConditions(widget);
    }

    renderLegacyProperties(widget, type) {
        const colors = getAvailableColors();
        const props = widget.props || {};

        // Helper to update props
        const updateProp = (key, value) => {
            const newProps = { ...widget.props, [key]: value };
            AppState.updateWidget(widget.id, { props: newProps });
        };

        // Common: Opacity
        this.addLabeledInput("Opacity (%)", "number", props.opacity !== undefined ? props.opacity : 100, (v) => {
            updateProp("opacity", parseInt(v, 10));
        });

        if (type === "shape_rect" || type === "shape_circle") {
            this.addCheckbox("Fill", props.fill || false, (v) => updateProp("fill", v));
            this.addLabeledInput("Border Width", "number", props.border_width || 1, (v) => updateProp("border_width", parseInt(v, 10)));
            this.addSelect("Color", props.color || "black", colors, (v) => updateProp("color", v));
        }
        else if (type === "rounded_rect") {
            this.addCheckbox("Fill", props.fill || false, (v) => updateProp("fill", v));
            if (props.fill) {
                this.addCheckbox("Show Border", props.show_border || false, (v) => updateProp("show_border", v));
            }
            this.addLabeledInput("Border Width", "number", props.border_width || 4, (v) => updateProp("border_width", parseInt(v, 10)));
            this.addLabeledInput("Corner Radius", "number", props.radius || 10, (v) => updateProp("radius", parseInt(v, 10)));
            this.addSelect("Color", props.color || "black", colors, (v) => updateProp("color", v));
        }
        else if (type === "line") {
            this.addSelect("Orientation", props.orientation || "horizontal", ["horizontal", "vertical"], (v) => {
                const strokeWidth = parseInt(props.stroke_width || 3, 10);
                const currentW = widget.width;
                const currentH = widget.height;
                const isVert = v === "vertical";

                // When switching orientation, swap the length dimension and set the other to stroke width
                if (isVert) {
                    // Switching to vertical: height becomes the length (use current width as reference), width becomes stroke
                    AppState.updateWidget(widget.id, {
                        width: strokeWidth,
                        height: Math.max(currentW, currentH, 20) // Use the larger dimension as new length
                    });
                } else {
                    // Switching to horizontal: width becomes the length (use current height as reference), height becomes stroke
                    AppState.updateWidget(widget.id, {
                        width: Math.max(currentW, currentH, 20), // Use the larger dimension as new length
                        height: strokeWidth
                    });
                }
                updateProp("orientation", v);
            });

            // Show the "Length" property for the line (the dimension that can be resized)
            const isVertical = (props.orientation || "horizontal") === "vertical";
            this.addLabeledInput("Line Length (px)", "number", isVertical ? widget.height : widget.width, (v) => {
                const newLength = parseInt(v, 10) || 20;
                if (isVertical) {
                    AppState.updateWidget(widget.id, { height: newLength });
                } else {
                    AppState.updateWidget(widget.id, { width: newLength });
                }
            });

            this.addLabeledInput("Stroke Width (px)", "number", props.stroke_width || 3, (v) => {
                const newStroke = parseInt(v, 10) || 1;
                updateProp("stroke_width", newStroke);
                // Also update the widget dimension that represents thickness
                const isVert = (props.orientation || "horizontal") === "vertical";
                if (isVert) {
                    AppState.updateWidget(widget.id, { width: newStroke });
                } else {
                    AppState.updateWidget(widget.id, { height: newStroke });
                }
            });

            // Fill Length Button
            const fillBtn = document.createElement("button");
            fillBtn.textContent = "Fill Canvas Length";
            fillBtn.className = "btn btn-secondary";
            fillBtn.style.marginTop = "8px";
            fillBtn.style.width = "100%";
            fillBtn.onclick = () => {
                const dims = AppState.getCanvasDimensions();
                const isVert = (props.orientation || "horizontal") === "vertical";
                if (isVert) {
                    AppState.updateWidget(widget.id, { y: 0, height: dims.height });
                } else {
                    AppState.updateWidget(widget.id, { x: 0, width: dims.width });
                }
            };
            this.panel.appendChild(fillBtn);

            this.addSelect("Color", props.color || "black", colors, (v) => updateProp("color", v));
        }
        else if (type === "text" || type === "label") {
            this.addLabeledInput("Text", "text", props.text || "", (v) => updateProp("text", v));
            this.addLabeledInput("Font Size", "number", props.font_size || 20, (v) => updateProp("font_size", parseInt(v, 10)));
            this.addSelect("Color", props.color || "black", colors, (v) => updateProp("color", v));

            // Font Family with Custom Support
            const fontOptions = ["Roboto", "Inter", "Open Sans", "Lato", "Montserrat", "Poppins", "Raleway", "Roboto Mono", "Ubuntu", "Nunito", "Playfair Display", "Merriweather", "Work Sans", "Source Sans Pro", "Quicksand", "Custom..."];
            const currentFont = props.font_family || "Roboto";
            const isCustom = !fontOptions.slice(0, -1).includes(currentFont);

            this.addSelect("Font", isCustom ? "Custom..." : currentFont, fontOptions, (v) => {
                if (v !== "Custom...") {
                    updateProp("font_family", v);
                    updateProp("custom_font_family", "");
                } else {
                    updateProp("font_family", "Custom...");
                }
            });

            if (isCustom || props.font_family === "Custom...") {
                this.addLabeledInput("Custom Font Name", "text", props.custom_font_family || (isCustom ? currentFont : ""), (v) => {
                    updateProp("font_family", v || "Roboto");
                    updateProp("custom_font_family", v);
                });
                this.addHint('Browse <a href="https://fonts.google.com" target="_blank">fonts.google.com</a>');
            }

            this.addSelect("Weight", props.font_weight || 400, [100, 200, 300, 400, 500, 600, 700, 800, 900], (v) => updateProp("font_weight", parseInt(v, 10)));
            this.addCheckbox("Italic", props.italic || false, (v) => updateProp("italic", v));

            // Text Alignment
            const alignOptions = [
                "TOP_LEFT", "TOP_CENTER", "TOP_RIGHT",
                "CENTER_LEFT", "CENTER", "CENTER_RIGHT",
                "BOTTOM_LEFT", "BOTTOM_CENTER", "BOTTOM_RIGHT"
            ];
            this.addSelect("Align", props.text_align || "TOP_LEFT", alignOptions, (v) => updateProp("text_align", v));

            this.addSelect("BPP (Anti-aliasing)", String(props.bpp || 1), ["1", "2", "4", "8"], (v) => updateProp("bpp", parseInt(v, 10)));
            this.addHint("1=no AA, 2=4 levels, 4=16 levels, 8=256 levels");
        }
        else if (type === "sensor_text") {
            this.addLabeledInputWithPicker("Entity ID", "text", widget.entity_id || "", (v) => {
                AppState.updateWidget(widget.id, { entity_id: v });
                // Auto-populate title if empty and entity has a friendly name
                if (v && !widget.title && window.AppState && window.AppState.entityStates) {
                    this.autoPopulateTitleFromEntity(widget.id, v);
                }
            }, widget);
            // Text Sensor toggle (auto-detected when entity is selected)
            this.addCheckbox("Text Sensor (string value)", props.is_text_sensor || false, (v) => updateProp("is_text_sensor", v));
            this.addHint("Enable if entity returns text instead of numbers.");
            this.addLabeledInputWithPicker("Secondary Entity ID", "text", widget.entity_id_2 || "", (v) => {
                AppState.updateWidget(widget.id, { entity_id_2: v });
            }, widget);
            this.addLabeledInput("Separator", "text", props.separator || " ~ ", (v) => updateProp("separator", v));
            this.addLabeledInput("Title/Label", "text", widget.title || "", (v) => {
                AppState.updateWidget(widget.id, { title: v });
            });
            this.addSelect("Display Format", props.value_format || "label_value", ["label_value", "label_newline_value", "value_only"], (v) => updateProp("value_format", v));
            this.addLabeledInput("Precision", "number", props.precision !== undefined ? props.precision : 2, (v) => updateProp("precision", parseInt(v, 10)));
            this.addLabeledInputWithDataList("Prefix", "text", props.prefix || "", ["€", "$", "£", "¥", "CHF", "kr"], (v) => updateProp("prefix", v));
            this.addLabeledInputWithDataList("Postfix", "text", props.postfix || "", [" kWh", " W", " V", " A", " °C", " %", " ppm", " lx"], (v) => updateProp("postfix", v));

            this.addLabeledInput("Unit (Manual helper)", "text", props.unit || "", (v) => updateProp("unit", v));
            this.addCheckbox("Hide default unit", props.hide_unit || false, (v) => updateProp("hide_unit", v));
            this.addLabeledInput("Label Size", "number", props.label_font_size || 14, (v) => updateProp("label_font_size", parseInt(v, 10)));
            this.addLabeledInput("Value Size", "number", props.value_font_size || 20, (v) => updateProp("value_font_size", parseInt(v, 10)));
            this.addSelect("Color", props.color || "black", colors, (v) => updateProp("color", v));

            // Font Family with Custom Support
            const fontOptions = ["Roboto", "Inter", "Open Sans", "Lato", "Montserrat", "Poppins", "Raleway", "Roboto Mono", "Ubuntu", "Nunito", "Playfair Display", "Merriweather", "Work Sans", "Source Sans Pro", "Quicksand", "Custom..."];
            const currentFont = props.font_family || "Roboto";
            const isCustom = !fontOptions.slice(0, -1).includes(currentFont);

            this.addSelect("Font", isCustom ? "Custom..." : currentFont, fontOptions, (v) => {
                if (v !== "Custom...") {
                    updateProp("font_family", v);
                    updateProp("custom_font_family", "");
                } else {
                    updateProp("font_family", "Custom...");
                }
            });

            if (isCustom || props.font_family === "Custom...") {
                this.addLabeledInput("Custom Font Name", "text", props.custom_font_family || (isCustom ? currentFont : ""), (v) => {
                    updateProp("font_family", v || "Roboto");
                    updateProp("custom_font_family", v);
                });
                this.addHint('Browse <a href="https://fonts.google.com" target="_blank">fonts.google.com</a>');
            }

            this.addSelect("Weight", props.font_weight || 400, [100, 200, 300, 400, 500, 600, 700, 800, 900], (v) => updateProp("font_weight", parseInt(v, 10)));
            this.addCheckbox("Italic", props.italic || false, (v) => updateProp("italic", v));

            // Text Alignment for Sensor Text
            const alignOptions = [
                "TOP_LEFT", "TOP_CENTER", "TOP_RIGHT",
                "CENTER_LEFT", "CENTER", "CENTER_RIGHT",
                "BOTTOM_LEFT", "BOTTOM_CENTER", "BOTTOM_RIGHT"
            ];
            this.addSelect("Align", props.text_align || "TOP_LEFT", alignOptions, (v) => {
                updateProp("text_align", v);
                updateProp("label_align", v);
                updateProp("value_align", v);
            });
        }
        else if (type === "datetime") {
            this.addSelect("Display Format", props.format || "time_date", ["time_date", "time_only", "date_only", "weekday_day_month"], (v) => updateProp("format", v));
            this.addLabeledInput("Time Font Size", "number", props.time_font_size || 28, (v) => updateProp("time_font_size", parseInt(v, 10)));
            this.addLabeledInput("Date Font Size", "number", props.date_font_size || 16, (v) => updateProp("date_font_size", parseInt(v, 10)));
            this.addSelect("Color", props.color || "black", colors, (v) => updateProp("color", v));

            // Font Family with Custom Support
            const fontOptions = ["Roboto", "Inter", "Open Sans", "Lato", "Montserrat", "Poppins", "Raleway", "Roboto Mono", "Ubuntu", "Nunito", "Playfair Display", "Merriweather", "Work Sans", "Source Sans Pro", "Quicksand", "Custom..."];
            const currentFont = props.font_family || "Roboto";
            const isCustom = !fontOptions.slice(0, -1).includes(currentFont);

            this.addSelect("Font", isCustom ? "Custom..." : currentFont, fontOptions, (v) => {
                if (v !== "Custom...") {
                    updateProp("font_family", v);
                    updateProp("custom_font_family", "");
                } else {
                    updateProp("font_family", "Custom...");
                }
            });

            if (isCustom || props.font_family === "Custom...") {
                this.addLabeledInput("Custom Font Name", "text", props.custom_font_family || (isCustom ? currentFont : ""), (v) => {
                    updateProp("font_family", v || "Roboto");
                    updateProp("custom_font_family", v);
                });
                this.addHint('Browse <a href="https://fonts.google.com" target="_blank">fonts.google.com</a>');
            }

            this.addCheckbox("Italic", props.italic || false, (v) => updateProp("italic", v));

            // Text Alignment
            const alignOptions = [
                "TOP_LEFT", "TOP_CENTER", "TOP_RIGHT",
                "CENTER_LEFT", "CENTER", "CENTER_RIGHT",
                "BOTTOM_LEFT", "BOTTOM_CENTER", "BOTTOM_RIGHT"
            ];
            this.addSelect("Align", props.text_align || "CENTER", alignOptions, (v) => updateProp("text_align", v));
        }
        else if (type === "progress_bar") {
            this.addLabeledInputWithPicker("Entity ID", "text", widget.entity_id || "", (v) => {
                AppState.updateWidget(widget.id, { entity_id: v });
                // Auto-populate title if empty and entity has a friendly name
                if (v && !widget.title && window.AppState && window.AppState.entityStates) {
                    this.autoPopulateTitleFromEntity(widget.id, v);
                }
            }, widget);
            this.addLabeledInput("Title/Label", "text", widget.title || "", (v) => {
                AppState.updateWidget(widget.id, { title: v });
            });
            this.addCheckbox("Show Label", props.show_label !== false, (v) => updateProp("show_label", v));
            this.addCheckbox("Show Percentage", props.show_percentage !== false, (v) => updateProp("show_percentage", v));

            // Fix: Ensure bar_height is parsed correctly and defaults to 15
            this.addLabeledInput("Bar Height", "number", props.bar_height || 15, (v) => {
                const val = parseInt(v, 10);
                updateProp("bar_height", isNaN(val) ? 15 : val);
            });

            this.addLabeledInput("Border Width", "number", props.border_width || 1, (v) => {
                const val = parseInt(v, 10);
                updateProp("border_width", isNaN(val) ? 1 : val);
            });

            this.addSelect("Color", props.color || "black", colors, (v) => updateProp("color", v));
        }
        else if (type === "graph") {
            this.addLabeledInputWithPicker("Entity ID", "text", widget.entity_id || "", (v) => {
                AppState.updateWidget(widget.id, { entity_id: v });
            }, widget);
            this.addLabeledInput("Title", "text", widget.title || "", (v) => {
                AppState.updateWidget(widget.id, { title: v });
            });
            this.addLabeledInput("Duration", "text", props.duration || "1h", (v) => updateProp("duration", v));
            this.addSelect("Line Color", props.color || "black", colors, (v) => updateProp("color", v));
            this.addSelect("Line Type", props.line_type || "SOLID", ["SOLID", "DASHED", "DOTTED"], (v) => updateProp("line_type", v));
            this.addLabeledInput("Line Thickness", "number", props.line_thickness || 3, (v) => updateProp("line_thickness", parseInt(v, 10)));
            this.addCheckbox("Show Border", props.border !== false, (v) => updateProp("border", v));
            this.addCheckbox("Show Grid", props.grid !== false, (v) => updateProp("grid", v));
            this.addLabeledInput("X Grid Interval", "text", props.x_grid || "1h", (v) => updateProp("x_grid", v));
            this.addLabeledInput("Y Grid Step", "text", props.y_grid || "auto", (v) => updateProp("y_grid", v));
            this.addLabeledInput("Min Value", "number", props.min_value || "", (v) => updateProp("min_value", v));
            this.addLabeledInput("Max Value", "number", props.max_value || "", (v) => updateProp("max_value", v));
        }
        else if (type === "icon") {
            this.addCheckbox("Fit icon to frame", props.fit_icon_to_frame || false, (v) => updateProp("fit_icon_to_frame", v));

            // Quick Icon Picker
            const iconPickerData = window.iconPickerData || [];
            const pickerWrap = document.createElement("div");
            pickerWrap.className = "field";
            const pickerLbl = document.createElement("div");
            pickerLbl.className = "prop-label";
            pickerLbl.textContent = "Quick icon picker (visual preview)";

            const pickerSelect = document.createElement("select");
            pickerSelect.className = "select";
            pickerSelect.style.fontFamily = "MDI, monospace, system-ui";
            pickerSelect.style.fontSize = "16px";
            pickerSelect.style.lineHeight = "1.5";
            pickerSelect.style.width = "100%";

            const placeholderOpt = document.createElement("option");
            placeholderOpt.value = "";
            placeholderOpt.textContent = "-- Select icon --";
            placeholderOpt.style.fontFamily = "system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
            pickerSelect.appendChild(placeholderOpt);

            iconPickerData.forEach(icon => {
                const opt = document.createElement("option");
                opt.value = icon.code;
                const cp = 0xf0000 + parseInt(icon.code.slice(1), 16);
                const glyph = String.fromCodePoint(cp);
                opt.textContent = glyph + "  " + icon.code;
                opt.style.fontFamily = "MDI, monospace, system-ui";
                if (icon.code === (props.code || "F0595").toUpperCase()) {
                    opt.selected = true;
                }
                pickerSelect.appendChild(opt);
            });

            pickerSelect.addEventListener("change", () => {
                if (pickerSelect.value) {
                    updateProp("code", pickerSelect.value);
                }
            });

            pickerWrap.appendChild(pickerLbl);
            pickerWrap.appendChild(pickerSelect);
            this.panel.appendChild(pickerWrap);

            // Link to MDI
            this.addHint('Need more icons? Browse <a href="https://pictogrammers.com/library/mdi/icon/" target="_blank" style="color: #03a9f4; text-decoration: none;">Pictogrammers MDI</a> and paste the Unicode below');

            // Manual Code Input
            this.addLabeledInput("MDI Unicode (Fxxxx)", "text", props.code || "F0595", (v) => {
                const clean = (v || "").trim().toUpperCase().replace(/^0X/, "");
                if (/^F[0-9A-F]{4}$/i.test(clean)) {
                    updateProp("code", clean);
                }
            });

            this.addLabeledInput("Icon Size (px)", "number", props.size || 40, (v) => {
                let n = parseInt(v || "40", 10);
                if (Number.isNaN(n) || n < 8) n = 8;
                if (n > 260) n = 260;
                updateProp("size", n);
            });

            this.addSelect("Font Reference", props.font_ref || "font_mdi_medium", ["font_mdi_medium", "font_mdi_large"], (v) => updateProp("font_ref", v));
            this.addSelect("Color", props.color || "black", colors, (v) => updateProp("color", v));
        }
        else if (type === "battery_icon") {
            // Entity ID with built-in picker
            this.addLabeledInputWithPicker("Battery Entity ID", "text", widget.entity_id || "", (v) => {
                AppState.updateWidget(widget.id, { entity_id: v });
            }, widget);

            this.addCheckbox("Local / On-Device Sensor", !!props.is_local_sensor, (v) => updateProp("is_local_sensor", v));
            this.addCheckbox("Fit icon to frame", props.fit_icon_to_frame || false, (v) => updateProp("fit_icon_to_frame", v));

            this.addLabeledInput("Icon Size (px)", "number", props.size || 48, (v) => {
                let n = parseInt(v || "48", 10);
                if (Number.isNaN(n) || n < 16) n = 16;
                if (n > 200) n = 200;
                updateProp("size", n);
            });

            this.addLabeledInput("Percentage Font Size (px)", "number", props.font_size || 12, (v) => {
                let n = parseInt(v || "12", 10);
                if (Number.isNaN(n) || n < 8) n = 8;
                if (n > 100) n = 100;
                updateProp("font_size", n);
            });

            this.addSelect("Color", props.color || "black", colors, (v) => updateProp("color", v));
        }
        else if (type === "weather_icon") {
            // Fix: Add Entity ID picker for weather_icon
            this.addLabeledInputWithPicker("Weather Entity ID", "text", widget.entity_id || "", (v) => {
                AppState.updateWidget(widget.id, { entity_id: v });
            }, widget);

            this.addCheckbox("Fit icon to frame", props.fit_icon_to_frame || false, (v) => updateProp("fit_icon_to_frame", v));

            this.addLabeledInput("Icon Size (px)", "number", props.size || 48, (v) => {
                let n = parseInt(v || "48", 10);
                if (Number.isNaN(n) || n < 8) n = 8;
                if (n > 260) n = 260;
                updateProp("size", n);
            });

            this.addSelect("Color", props.color || "black", colors, (v) => updateProp("color", v));
        }
        else if (type === "weather_forecast") {
            this.addLabeledInputWithPicker("Weather Entity ID", "text", widget.entity_id || "", (v) => {
                AppState.updateWidget(widget.id, { entity_id: v });
            }, widget);

            this.addSelect("Layout", props.layout || "horizontal", ["horizontal", "vertical"], (v) => updateProp("layout", v));

            this.addCheckbox("Show High/Low Temp", props.show_high_low !== false, (v) => updateProp("show_high_low", v));

            this.addSectionLabel("Typography");
            this.addLabeledInput("Day Font Size", "number", props.day_font_size || 14, (v) => updateProp("day_font_size", parseInt(v, 10)));
            this.addLabeledInput("Temp Font Size", "number", props.temp_font_size || 14, (v) => updateProp("temp_font_size", parseInt(v, 10)));
            this.addLabeledInput("Icon Size", "number", props.icon_size || 24, (v) => updateProp("icon_size", parseInt(v, 10)));

            // Font Family with Custom Support
            const fontOptions = ["Roboto", "Inter", "Open Sans", "Lato", "Montserrat", "Poppins", "Raleway", "Roboto Mono", "Ubuntu", "Nunito", "Playfair Display", "Merriweather", "Work Sans", "Source Sans Pro", "Quicksand", "Custom..."];
            const currentFont = props.font_family || "Roboto";
            const isCustom = !fontOptions.slice(0, -1).includes(currentFont);

            this.addSelect("Font", isCustom ? "Custom..." : currentFont, fontOptions, (v) => {
                if (v !== "Custom...") {
                    updateProp("font_family", v);
                    updateProp("custom_font_family", "");
                } else {
                    updateProp("font_family", "Custom...");
                }
            });

            if (isCustom || props.font_family === "Custom...") {
                this.addLabeledInput("Custom Font Name", "text", props.custom_font_family || (isCustom ? currentFont : ""), (v) => {
                    updateProp("font_family", v || "Roboto");
                    updateProp("custom_font_family", v);
                });
                this.addHint('Browse <a href="https://fonts.google.com" target="_blank">fonts.google.com</a>');
            }

            this.addSelect("Color", props.color || "black", colors, (v) => updateProp("color", v));
        }
        else if (type === "image") {
            this.addHint("🖼️ Static image from ESPHome:<br/><code style='background:#f0f0f0;padding:2px 4px;border-radius:2px;'>/config/esphome/images/logo.png</code><br/><span style='color:#4a9eff;'>ℹ️ Place images in /config/esphome/images/ folder</span>");
            this.addLabeledInput("Image Path", "text", props.path || "", (v) => updateProp("path", v));

            if (props.invert === undefined) {
                updateProp("invert", getDeviceModel() === "reterminal_e1001");
            }
            this.addCheckbox("Invert colors", props.invert || false, (v) => updateProp("invert", v));

            this.addSelect("Render Mode", props.render_mode || "Auto", ["Auto", "Binary", "Grayscale", "Color (RGB565)"], (v) => updateProp("render_mode", v));

            // Fill Screen Button
            const fillWrap = document.createElement("div");
            fillWrap.className = "field";
            fillWrap.style.marginTop = "12px";
            const isFullScreen = (widget.x === 0 && widget.y === 0 && widget.width === 800 && widget.height === 480); // Assuming 800x480
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
            this.panel.appendChild(fillWrap);
        }
        else if (type === "online_image") {
            this.addHint("💡 Fetch remote images dynamically (Puppet support):<br/><code style='background:#f0f0f0;padding:2px 4px;border-radius:2px;'>https://example.com/camera/snapshot.jpg </code><br/><span style='color:#4a9eff;'>ℹ️ Images are downloaded at specified intervals</span>");
            this.addLabeledInput("Remote URL", "text", props.url || "", (v) => updateProp("url", v));
            this.addLabeledInput("Update interval (seconds)", "number", props.interval_s || 300, (v) => updateProp("interval_s", parseInt(v, 10)));

            if (props.invert === undefined) {
                updateProp("invert", getDeviceModel() === "reterminal_e1001");
            }
            this.addCheckbox("Invert colors", props.invert || false, (v) => updateProp("invert", v));

            this.addSelect("Render Mode", props.render_mode || "Auto", ["Auto", "Binary", "Grayscale", "Color (RGB565)"], (v) => updateProp("render_mode", v));

            // Fill Screen Button
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
            this.panel.appendChild(fillWrap);
        }
        else if (type === "qr_code") {
            this.addHint("📱 Generate QR codes that can be scanned by phones/tablets");
            this.addLabeledInput("QR Content", "text", props.value || "https://esphome.io", (v) => updateProp("value", v));
            this.addHint("Enter a URL, text, or any string to encode");

            this.addLabeledInput("Scale", "number", props.scale || 2, (v) => {
                let n = parseInt(v || "2", 10);
                if (Number.isNaN(n) || n < 1) n = 1;
                if (n > 10) n = 10;
                updateProp("scale", n);
            });
            this.addHint("Size multiplier (1-10). Larger = bigger QR code");

            this.addSelect("Error Correction", props.ecc || "LOW", ["LOW", "MEDIUM", "QUARTILE", "HIGH"], (v) => updateProp("ecc", v));
            this.addHint("Higher = more redundancy, can recover from damage");

            this.addSelect("Color", props.color || "black", ["black", "white"], (v) => updateProp("color", v));
        }
        else if (type === "quote_rss") {
            // Quote / RSS Feed Widget Properties
            this.addHint("📰 Display quotes from an RSS feed (Quote of the Day)");

            this.addLabeledInput("Feed URL", "text", props.feed_url || "https://www.brainyquote.com/link/quotebr.rss", (v) => updateProp("feed_url", v));
            this.addHint("Enter any RSS feed URL. Default: BrainyQuote daily quotes");

            this.addCheckbox("Show Author", props.show_author !== false, (v) => updateProp("show_author", v));
            this.addCheckbox("Random Quote", props.random !== false, (v) => updateProp("random", v));
            this.addHint("Pick a random quote from the feed, or use the first one");

            // Refresh interval
            const refreshOptions = ["15min", "30min", "1h", "2h", "4h", "8h", "12h", "24h"];
            this.addSelect("Refresh Interval", props.refresh_interval || "24h", refreshOptions, (v) => updateProp("refresh_interval", v));

            this.addSectionLabel("Typography");

            this.addLabeledInput("Quote Text Size (Line 1)", "number", props.quote_font_size || 18, (v) => updateProp("quote_font_size", parseInt(v, 10)));
            this.addLabeledInput("Author Size (Line 2)", "number", props.author_font_size || 14, (v) => updateProp("author_font_size", parseInt(v, 10)));

            // Font Family with Custom Support
            const fontOptions = ["Roboto", "Inter", "Open Sans", "Lato", "Montserrat", "Poppins", "Raleway", "Roboto Mono", "Ubuntu", "Nunito", "Playfair Display", "Merriweather", "Work Sans", "Source Sans Pro", "Quicksand", "Custom..."];
            const currentFont = props.font_family || "Roboto";
            const isCustom = !fontOptions.slice(0, -1).includes(currentFont);

            this.addSelect("Font", isCustom ? "Custom..." : currentFont, fontOptions, (v) => {
                if (v !== "Custom...") {
                    updateProp("font_family", v);
                    updateProp("custom_font_family", "");
                } else {
                    updateProp("font_family", "Custom...");
                }
            });

            if (isCustom || props.font_family === "Custom...") {
                this.addLabeledInput("Custom Font Name", "text", props.custom_font_family || (isCustom ? currentFont : ""), (v) => {
                    updateProp("font_family", v || "Roboto");
                    updateProp("custom_font_family", v);
                });
                this.addHint('Browse <a href="https://fonts.google.com" target="_blank">fonts.google.com</a>');
            }

            this.addSelect("Weight", props.font_weight || 400, [100, 200, 300, 400, 500, 600, 700, 800, 900], (v) => updateProp("font_weight", parseInt(v, 10)));

            // Text Alignment
            const alignOptions = [
                "TOP_LEFT", "TOP_CENTER", "TOP_RIGHT",
                "CENTER_LEFT", "CENTER", "CENTER_RIGHT",
                "BOTTOM_LEFT", "BOTTOM_CENTER", "BOTTOM_RIGHT"
            ];
            this.addSelect("Align", props.text_align || "TOP_LEFT", alignOptions, (v) => updateProp("text_align", v));

            this.addSelect("Color", props.color || "black", colors, (v) => updateProp("color", v));

            this.addSectionLabel("Display Options");

            this.addCheckbox("Word Wrap", props.word_wrap !== false, (v) => updateProp("word_wrap", v));
            this.addCheckbox("Auto Scale Text", props.auto_scale || false, (v) => updateProp("auto_scale", v));
            this.addHint("Automatically reduce font size if text is too long");
            this.addCheckbox("Italic Quote", props.italic_quote !== false, (v) => updateProp("italic_quote", v));
        }
        else if (type === "calendar") {
            this.addSectionLabel("Appearance");
            this.addSelect("Text Color", props.text_color || "black", colors, (v) => updateProp("text_color", v));
            this.addSelect("Border Color", props.border_color || "black", colors, (v) => updateProp("border_color", v));
            this.addSelect("Background", props.background_color || "white", colors, (v) => updateProp("background_color", v));

            this.addLabeledInput("Border Width", "number", props.border_width || 2, (v) => updateProp("border_width", parseInt(v, 10)));
            this.addCheckbox("Show Border", props.show_border !== false, (v) => updateProp("show_border", v));

            this.addSectionLabel("Font Sizes");
            this.addLabeledInput("Big Date Size", "number", props.font_size_date || 100, (v) => updateProp("font_size_date", parseInt(v, 10)));
            this.addLabeledInput("Day Name Size", "number", props.font_size_day || 24, (v) => updateProp("font_size_day", parseInt(v, 10)));
            this.addLabeledInput("Grid Text Size", "number", props.font_size_grid || 14, (v) => updateProp("font_size_grid", parseInt(v, 10)));
            this.addLabeledInput("Event Text Size", "number", props.font_size_event || 18, (v) => updateProp("font_size_event", parseInt(v, 10)));

            this.addSectionLabel("Data");
            this.addLabeledInputWithPicker("Entity ID", "text", widget.entity_id || "sensor.esp_calendar_data", (v) => {
                AppState.updateWidget(widget.id, { entity_id: v });
            }, widget);
            this.addHint("Must be a sensor with attribute 'entries'");

            // Helper Script Download
            const dlBtn = document.createElement("button");
            dlBtn.className = "btn btn-secondary btn-full";
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
            this.panel.appendChild(dlBtn);
            this.addHint("Place in /config/python_scripts/");
        }
        else if (type === "puppet") {
            this.addLabeledInput("File path / URL", "text", props.image_url || "", (v) => updateProp("image_url", v));
            this.addHint('Tip: Use mdi:icon-name for Material Design Icons. <br><b>Important:</b> Ensure `materialdesignicons-webfont.ttf` is in your ESPHome `fonts/` folder. <a href="https://pictogrammers.com/library/mdi/" target="_blank" style="color: #52c7ea">MDI Library</a>');

            this.addSelect("Image type", props.image_type || "RGB565", ["RGB565", "RGB", "GRAYSCALE", "BINARY"], (v) => updateProp("image_type", v));
            this.addHint("RGB565=2B/px, RGB=3B/px, GRAYSCALE=1B/px, BINARY=1bit/px");

            this.addSelect("Transparency", props.transparency || "opaque", ["opaque", "chroma_key", "alpha_channel"], (v) => updateProp("transparency", v));
            this.addHint("opaque=no transparency, chroma_key=color key, alpha_channel=smooth blend");
        }
        else if (type === "touch_area") {
            this.addLabeledInputWithPicker("Entity ID (Binary Sensor)", "text", widget.entity_id || "", (v) => {
                AppState.updateWidget(widget.id, { entity_id: v });
            }, widget);
            this.addHint("ID for the binary_sensor (e.g. my_touch_button)");

            this.addLabeledInput("Label (Preview)", "text", props.title || "Touch Area", (v) => updateProp("title", v));

            // User requested non-LVGL style color picker. 
            // We'll use a simple native picker for color and a slider for opacity.
            // But we need to combine them into RGBA.
            const currentColor = props.color || "rgba(0, 0, 255, 0.2)";
            // Naive parse or default
            let hex = "#0000ff";
            let alpha = 0.2;
            if (currentColor.startsWith("#")) {
                hex = currentColor;
                alpha = 1.0;
            } else if (currentColor.startsWith("rgba")) {
                const parts = currentColor.match(/([\d\.]+)/g);
                if (parts && parts.length >= 4) {
                    const r = parseInt(parts[0]);
                    const g = parseInt(parts[1]);
                    const b = parseInt(parts[2]);
                    alpha = parseFloat(parts[3]);
                    hex = "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
                }
            }

            this.addLabeledInput("Preview Color", "color", hex, (v) => {
                // Convert back to rgba
                // v is hex
                const r = parseInt(v.slice(1, 3), 16);
                const g = parseInt(v.slice(3, 5), 16);
                const b = parseInt(v.slice(5, 7), 16);
                updateProp("color", `rgba(${r}, ${g}, ${b}, ${alpha})`);
            });

            this.addLabeledInput("Opacity (0.0 - 1.0)", "number", alpha, (v) => {
                let a = parseFloat(v);
                if (a < 0) a = 0; if (a > 1) a = 1;
                // Reconstruct RGBA
                const r = parseInt(hex.slice(1, 3), 16);
                const g = parseInt(hex.slice(3, 5), 16);
                const b = parseInt(hex.slice(5, 7), 16);
                updateProp("color", `rgba(${r}, ${g}, ${b}, ${a})`);
            });

            this.addLabeledInput("Border Color", "color", props.border_color || "#0000ff", (v) => updateProp("border_color", v));
        }
        else if (type === "lvgl_label") {
            this.addLabeledInput("Text", "text", props.text || "Label", (v) => updateProp("text", v));
            this.addLabeledInput("Font Size", "number", props.font_size || 20, (v) => updateProp("font_size", parseInt(v, 10)));
            this.addColorMixer("Text Color", props.color || "black", (v) => updateProp("color", v));
            this.addColorMixer("Background Color", props.bg_color || "transparent", (v) => updateProp("bg_color", v));

            // Font Family
            const fontOptions = ["Roboto", "Inter", "Open Sans", "Lato", "Montserrat", "Poppins", "Raleway", "Roboto Mono", "Ubuntu", "Nunito", "Playfair Display", "Merriweather", "Work Sans", "Source Sans Pro", "Quicksand", "Custom..."];
            const currentFont = props.font_family || "Roboto";
            const isCustom = !fontOptions.slice(0, -1).includes(currentFont);

            this.addSelect("Font", isCustom ? "Custom..." : currentFont, fontOptions, (v) => {
                if (v !== "Custom...") {
                    updateProp("font_family", v);
                } else {
                    updateProp("font_family", "Custom...");
                }
            });

            this.addSelect("Weight", props.font_weight || 400, [100, 200, 300, 400, 500, 600, 700, 800, 900], (v) => updateProp("font_weight", parseInt(v, 10)));
            this.addCheckbox("Italic", props.italic || false, (v) => updateProp("italic", v));

            // Alignment
            const alignOptions = ["TOP_LEFT", "TOP_CENTER", "TOP_RIGHT", "CENTER_LEFT", "CENTER", "CENTER_RIGHT", "BOTTOM_LEFT", "BOTTOM_CENTER", "BOTTOM_RIGHT"];
            this.addSelect("Align", props.text_align || "CENTER", alignOptions, (v) => updateProp("text_align", v));
        }
        else if (type === "lvgl_line") {
            // "Like non-LVGL widget": Simple Horizontal/Vertical orientation
            const orientation = props.orientation || "horizontal";
            this.addSelect("Orientation", orientation, ["horizontal", "vertical"], (v) => {
                // When changing orientation, swap width/height to preserve 'length' feel
                const oldW = widget.width;
                const oldH = widget.height;
                AppState.updateWidget(widget.id, {
                    props: { ...props, orientation: v },
                    width: oldH,
                    height: oldW
                });
            });

            this.addLabeledInput("Line Width", "number", props.line_width || 3, (v) => updateProp("line_width", parseInt(v, 10)));
            this.addColorMixer("Line Color", props.line_color || props.color || "black", (v) => updateProp("line_color", v));
            this.addCheckbox("Rounded Ends", props.line_rounded !== false, (v) => updateProp("line_rounded", v));

            // Advanced: Allow manual points? 
            // The user wants it to behave like the simple line widget, so we hide manual points 
            // and generate them from width/height in export/render.
        }
        else if (type === "lvgl_meter") {
            this.addLabeledInputWithPicker("Entity ID", "text", widget.entity_id || "", (v) => {
                AppState.updateWidget(widget.id, { entity_id: v });
            }, widget);

            this.addSectionLabel("Scale");
            this.addLabeledInput("Min Value", "number", props.min || 0, (v) => updateProp("min", parseInt(v, 10)));
            this.addLabeledInput("Max Value", "number", props.max || 100, (v) => updateProp("max", parseInt(v, 10)));

            this.addSectionLabel("Preview");
            this.addLabeledInput("Value (Preview)", "number", props.value !== undefined ? props.value : 60, (v) => updateProp("value", parseInt(v, 10)));

            this.addSectionLabel("Appearance");
            this.addColorMixer("Scale Color", props.color || "black", (v) => updateProp("color", v));
            this.addColorMixer("Needle Color", props.indicator_color || "red", (v) => updateProp("indicator_color", v));
            this.addLabeledInput("Scale Width", "number", props.scale_width || 10, (v) => updateProp("scale_width", parseInt(v, 10)));
            this.addLabeledInput("Needle Width", "number", props.indicator_width || 4, (v) => updateProp("indicator_width", parseInt(v, 10)));
            this.addLabeledInput("Ticks", "number", props.tick_count || 11, (v) => updateProp("tick_count", parseInt(v, 10)));
            this.addLabeledInput("Tick Length", "number", props.tick_length || 10, (v) => updateProp("tick_length", parseInt(v, 10)));
        }

        else if (type === "lvgl_button") {
            this.addLabeledInputWithPicker("Action Entity ID", "text", widget.entity_id || "", (v) => {
                AppState.updateWidget(widget.id, { entity_id: v });
            }, widget);
            this.addHint("Entity to toggle/trigger when clicked");

            this.addLabeledInput("Text", "text", props.text || "BTN", (v) => updateProp("text", v));
            this.addColorMixer("Background Color", props.bg_color || "white", (v) => updateProp("bg_color", v));
            this.addColorMixer("Text Color", props.color || "black", (v) => updateProp("color", v));
            this.addLabeledInput("Border Width", "number", props.border_width || 2, (v) => updateProp("border_width", parseInt(v, 10)));
            this.addLabeledInput("Corner Radius", "number", props.radius || 5, (v) => updateProp("radius", parseInt(v, 10)));
        }
        else if (type === "lvgl_arc") {
            this.addLabeledInputWithPicker("Sensor Entity ID", "text", widget.entity_id || "", (v) => {
                AppState.updateWidget(widget.id, { entity_id: v });
            }, widget);
            this.addHint("Sensor to bind to arc value");

            this.addLabeledInput("Title / Label", "text", props.title || "", (v) => {
                const newProps = { ...widget.props, title: v };
                AppState.updateWidget(widget.id, { props: newProps });
            });

            this.addLabeledInput("Min Value", "number", props.min || 0, (v) => updateProp("min", parseInt(v, 10)));
            this.addLabeledInput("Max Value", "number", props.max || 100, (v) => updateProp("max", parseInt(v, 10)));
            this.addLabeledInput("Default/Preview Value", "number", props.value || 0, (v) => updateProp("value", parseInt(v, 10)));

            this.addLabeledInput("Thickness", "number", props.thickness || 10, (v) => updateProp("thickness", parseInt(v, 10)));
            this.addColorMixer("Color", props.color || "blue", (v) => updateProp("color", v));
        }
        else if (type === "lvgl_chart") {
            this.addLabeledInputWithPicker("Entity ID", "text", widget.entity_id || "", (v) => {
                AppState.updateWidget(widget.id, { entity_id: v });
            }, widget);
            this.addLabeledInput("Title", "text", props.title || "", (v) => updateProp("title", v));
            this.addSelect("Type", props.type || "LINE", ["LINE", "SCATTER", "BAR"], (v) => updateProp("type", v));
            this.addLabeledInput("Min Value", "number", props.min || 0, (v) => updateProp("min", parseInt(v, 10)));
            this.addLabeledInput("Max Value", "number", props.max || 100, (v) => updateProp("max", parseInt(v, 10)));
            this.addColorMixer("Color", props.color || "black", (v) => updateProp("color", v));
        }
        else if (type === "lvgl_img") {
            this.addLabeledInput("Source (Image/Symbol)", "text", props.src || "", (v) => updateProp("src", v));
            this.addHint("e.g. symbol_ok, symbol_home, or /image.png");

            this.addLabeledInput("Rotation (0.1 deg)", "number", props.rotation || 0, (v) => updateProp("rotation", parseInt(v, 10)));
            this.addLabeledInput("Scale (256 = 1x)", "number", props.scale || 256, (v) => updateProp("scale", parseInt(v, 10)));
            this.addColorMixer("Color (Tint)", props.color || "black", (v) => updateProp("color", v));
        }
        else if (type === "lvgl_qrcode") {
            this.addLabeledInput("Content / URL", "text", props.text || "", (v) => updateProp("text", v));
            this.addLabeledInput("Size (px)", "number", props.size || 100, (v) => updateProp("size", parseInt(v, 10)));
            this.addColorMixer("Color", props.color || "black", (v) => updateProp("color", v));
            this.addColorMixer("Background Color", props.bg_color || "white", (v) => updateProp("bg_color", v));
        }
        else if (type === "lvgl_bar") {
            this.addLabeledInputWithPicker("Entity ID", "text", widget.entity_id || "", (v) => {
                AppState.updateWidget(widget.id, { entity_id: v });
            }, widget);

            this.addLabeledInput("Min Value", "number", props.min || 0, (v) => updateProp("min", parseInt(v, 10)));
            this.addLabeledInput("Max Value", "number", props.max || 100, (v) => updateProp("max", parseInt(v, 10)));
            this.addLabeledInput("Preview Value", "number", props.value || 50, (v) => updateProp("value", parseInt(v, 10)));

            this.addColorMixer("Bar Color", props.color || "black", (v) => updateProp("color", v));
            this.addColorMixer("Background Color", props.bg_color || "gray", (v) => updateProp("bg_color", v));
            this.addCheckbox("Range Mode", props.range_mode || false, (v) => updateProp("range_mode", v));
        }
        else if (type === "lvgl_slider") {
            this.addLabeledInputWithPicker("Entity ID", "text", widget.entity_id || "", (v) => {
                AppState.updateWidget(widget.id, { entity_id: v });
            }, widget);
            this.addHint("Controls this entity number/level");

            this.addLabeledInput("Min Value", "number", props.min || 0, (v) => updateProp("min", parseInt(v, 10)));
            this.addLabeledInput("Max Value", "number", props.max || 100, (v) => updateProp("max", parseInt(v, 10)));
            this.addLabeledInput("Preview Value", "number", props.value || 30, (v) => updateProp("value", parseInt(v, 10)));

            this.addColorMixer("Knob/Bar Color", props.color || "black", (v) => updateProp("color", v));
            this.addColorMixer("Track Color", props.bg_color || "gray", (v) => updateProp("bg_color", v));
            this.addLabeledInput("Border Width", "number", props.border_width || 2, (v) => updateProp("border_width", parseInt(v, 10)));
        }
        else if (type === "calendar") {
            this.addHint("📅 Displays a monthly calendar and agenda.");
            this.addHint("⚠️ Requires 'esp_calendar_data_conversion.py' setup in Home Assistant.");

            this.addLabeledInputWithPicker("Data Entity ID", "text", widget.props.entity_id || "sensor.esp_calendar_data", (v) => {
                const newProps = { ...widget.props, entity_id: v };
                AppState.updateWidget(widget.id, { props: newProps });
            }, widget);

            this.addSectionLabel("Appearance");
            this.addCheckbox("Show Border", props.show_border !== false, (v) => updateProp("show_border", v));
            this.addLabeledInput("Border Width", "number", props.border_width || 2, (v) => updateProp("border_width", parseInt(v, 10)));
            this.addSelect("Border Color", props.border_color || "black", colors, (v) => updateProp("border_color", v));
            this.addSelect("Background Color", props.background_color || "white", colors, (v) => updateProp("background_color", v));
            this.addSelect("Text Color", props.text_color || "black", colors, (v) => updateProp("text_color", v));

            this.addSectionLabel("Font Sizes");
            this.addLabeledInput("Big Date Size", "number", props.font_size_date || 100, (v) => updateProp("font_size_date", parseInt(v, 10)));
            this.addLabeledInput("Day Name Size", "number", props.font_size_day || 24, (v) => updateProp("font_size_day", parseInt(v, 10)));
            this.addLabeledInput("Grid Text Size", "number", props.font_size_grid || 14, (v) => updateProp("font_size_grid", parseInt(v, 10)));
            this.addLabeledInput("Event Text Size", "number", props.font_size_event || 18, (v) => updateProp("font_size_event", parseInt(v, 10)));

            // Add "Download Helper Script" button
            const container = this.panel; // Or create a sub-container
            const downloadBtn = document.createElement("button");
            downloadBtn.className = "action-btn"; // Assuming this class exists or button basic style
            downloadBtn.style.marginTop = "15px";
            downloadBtn.style.width = "100%";
            downloadBtn.style.cursor = "pointer";
            downloadBtn.style.padding = "8px";
            downloadBtn.innerHTML = "📥 Download Helper Script";

            downloadBtn.onclick = () => {
                const blob = new Blob([CALENDAR_HELPER_SCRIPT], { type: "text/x-python" });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "esp_calendar_data_conversion.py";
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            };
            container.appendChild(downloadBtn);

            const note = document.createElement("div");
            note.style.marginTop = "5px";
            note.style.fontSize = "10px";
            note.style.color = "#888";
            note.style.textAlign = "center";
            note.innerText = "Check widget instructions for HA setup.";
            container.appendChild(note);
        }
        else if (type === "lvgl_tabview") {
            this.addLabeledInput("Tabs (comma separated)", "text", (props.tabs || []).join(", "), (v) => {
                const tabs = v.split(",").map(t => t.trim()).filter(t => t);
                updateProp("tabs", tabs);
            });
            this.addColorMixer("Background Color", props.bg_color || "white", (v) => updateProp("bg_color", v));
        }
        else if (type === "lvgl_tileview") {
            this.addHint("Tiles are currently configured via YAML or advanced properties.");
            this.addColorMixer("Background Color", props.bg_color || "white", (v) => updateProp("bg_color", v));
        }
        else if (type === "lvgl_led") {
            this.addColorMixer("Color", props.color || "red", (v) => updateProp("color", v));
            this.addLabeledInput("Brightness (0-255)", "number", props.brightness || 255, (v) => updateProp("brightness", parseInt(v, 10)));
        }
        else if (type === "lvgl_spinner") {
            this.addLabeledInput("Spin Time (ms)", "number", props.spin_time || 1000, (v) => updateProp("spin_time", parseInt(v, 10)));
            this.addLabeledInput("Arc Length (deg)", "number", props.arc_length || 60, (v) => updateProp("arc_length", parseInt(v, 10)));
            this.addColorMixer("Arc Color", props.arc_color || "blue", (v) => updateProp("arc_color", v));
            this.addColorMixer("Track Color", props.track_color || "white", (v) => updateProp("track_color", v));
        }
        else if (type === "lvgl_buttonmatrix") {
            this.addHint("Edit rows via YAML or simple comma-separated lists per row.");
            // Simple editor: Row 1, Row 2...
            const rows = props.rows || [];
            // Just a placeholder for now
        }
        else if (type === "lvgl_checkbox") {
            this.addLabeledInputWithPicker("Entity ID", "text", widget.entity_id || "", (v) => {
                AppState.updateWidget(widget.id, { entity_id: v });
            }, widget);
            this.addHint("Toggle input_boolean when tapped");

            this.addLabeledInput("Label", "text", props.text || "Checkbox", (v) => updateProp("text", v));
            this.addCheckbox("Checked", props.checked || false, (v) => updateProp("checked", v));
            this.addColorMixer("Color", props.color || "blue", (v) => updateProp("color", v));
        }
        else if (type === "lvgl_dropdown") {
            this.addLabeledInput("Options (one per line)", "textarea", props.options || "", (v) => updateProp("options", v));
            this.addLabeledInput("Selected Index", "number", props.selected_index || 0, (v) => updateProp("selected_index", parseInt(v, 10)));
            this.addColorMixer("Color", props.color || "white", (v) => updateProp("color", v));
        }
        else if (type === "lvgl_keyboard") {
            this.addSelect("Mode", props.mode || "TEXT_UPPER", ["TEXT_LOWER", "TEXT_UPPER", "SPECIAL", "NUMBER"], (v) => updateProp("mode", v));
            this.addLabeledInput("Textarea ID Link", "text", props.textarea_id || "", (v) => updateProp("textarea_id", v));
        }
        else if (type === "lvgl_roller") {
            this.addLabeledInput("Options (one per line)", "textarea", props.options || "", (v) => updateProp("options", v));
            this.addLabeledInput("Visible Rows", "number", props.visible_row_count || 3, (v) => updateProp("visible_row_count", parseInt(v, 10)));
            this.addColorMixer("Color", props.color || "white", (v) => updateProp("color", v));
            this.addColorMixer("Background Color", props.bg_color || "black", (v) => updateProp("bg_color", v));
            this.addColorMixer("Selected BG Color", props.selected_bg_color || "blue", (v) => updateProp("selected_bg_color", v));
            this.addColorMixer("Selected Text Color", props.selected_text_color || "white", (v) => updateProp("selected_text_color", v));
        }
        else if (type === "lvgl_spinbox") {
            this.addLabeledInput("Min", "number", props.min || 0, (v) => updateProp("min", parseInt(v, 10)));
            this.addLabeledInput("Max", "number", props.max || 100, (v) => updateProp("max", parseInt(v, 10)));
            this.addLabeledInput("Value", "number", props.value || 0, (v) => updateProp("value", parseInt(v, 10)));
            this.addLabeledInput("Digits", "number", props.digit_count || 4, (v) => updateProp("digit_count", parseInt(v, 10)));
            this.addLabeledInput("Step", "number", props.step || 1, (v) => updateProp("step", parseInt(v, 10)));
        }
        else if (type === "lvgl_switch") {
            this.addLabeledInputWithPicker("Entity ID", "text", widget.entity_id || "", (v) => {
                AppState.updateWidget(widget.id, { entity_id: v });
            }, widget);
            this.addHint("Toggle switch/light/input_boolean when tapped");

            this.addCheckbox("Checked", props.checked || false, (v) => updateProp("checked", v));
            this.addColorMixer("Indicator Color", props.color || "blue", (v) => updateProp("color", v));
            this.addColorMixer("Background Color", props.bg_color || "gray", (v) => updateProp("bg_color", v));
            this.addColorMixer("Knob Color", props.knob_color || "white", (v) => updateProp("knob_color", v));
        }
        else if (type === "lvgl_textarea") {
            this.addLabeledInput("Placeholder", "text", props.placeholder || "", (v) => updateProp("placeholder", v));
            this.addLabeledInput("Text", "text", props.text || "", (v) => updateProp("text", v));
            this.addCheckbox("One Line", props.one_line || false, (v) => updateProp("one_line", v));
            this.addLabeledInput("Max Length", "number", props.max_length || 0, (v) => updateProp("max_length", parseInt(v, 10)));
        }
        else if (type === "lvgl_obj") {
            this.addColorMixer("Color", props.color || "white", (v) => updateProp("color", v));
            this.addLabeledInput("Border Width", "number", props.border_width || 1, (v) => updateProp("border_width", parseInt(v, 10)));
            this.addColorMixer("Border Color", props.border_color || "gray", (v) => updateProp("border_color", v));
            this.addLabeledInput("Radius", "number", props.radius || 0, (v) => updateProp("radius", parseInt(v, 10)));
        }
    }

    // --- Helpers ---

    addLabeledInput(label, type, value, onChange) {
        const wrap = document.createElement("div");
        wrap.className = "field";
        const lbl = document.createElement("div");
        lbl.className = "prop-label";
        lbl.textContent = label;
        const input = document.createElement("input");
        input.className = "prop-input";
        input.type = type;
        input.value = value;
        input.addEventListener("input", () => onChange(input.value));
        wrap.appendChild(lbl);
        wrap.appendChild(input);
        this.panel.appendChild(wrap);
    }

    addSelect(label, value, options, onChange) {
        const wrap = document.createElement("div");
        wrap.className = "field";
        const lbl = document.createElement("div");
        lbl.className = "prop-label";
        lbl.textContent = label;
        const select = document.createElement("select");
        select.className = "prop-input";
        options.forEach(opt => {
            const o = document.createElement("option");
            o.value = opt;
            o.textContent = opt;
            if (opt === value) o.selected = true;
            select.appendChild(o);
        });
        select.addEventListener("change", () => onChange(select.value));
        wrap.appendChild(lbl);
        wrap.appendChild(select);
        this.panel.appendChild(wrap);
    }

    addCheckbox(label, value, onChange) {
        const wrap = document.createElement("div");
        wrap.className = "field";
        wrap.style.marginBottom = "8px"; // Added spacing

        const checkboxLabel = document.createElement("label");
        checkboxLabel.style.display = "flex";
        checkboxLabel.style.alignItems = "center";
        checkboxLabel.style.gap = "8px"; // Increased gap
        checkboxLabel.style.fontSize = "13px"; // Increased font size
        checkboxLabel.style.cursor = "pointer"; // Better UX

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = !!value;
        checkbox.style.width = "16px"; // Bigger checkbox
        checkbox.style.height = "16px"; // Bigger checkbox
        checkbox.style.margin = "0";
        checkbox.style.cursor = "pointer";
        checkbox.addEventListener("change", () => onChange(checkbox.checked));

        const span = document.createElement("span");
        span.textContent = label;

        checkboxLabel.appendChild(checkbox);
        checkboxLabel.appendChild(span);
        wrap.appendChild(checkboxLabel);
        this.panel.appendChild(wrap);
    }

    addHint(htmlContent) {
        const hint = document.createElement("div");
        hint.style.fontSize = "11px"; // Increased font size
        hint.style.color = "#666";
        hint.style.marginTop = "4px"; // Small top margin
        hint.style.marginBottom = "12px"; // Increased bottom spacing
        hint.style.lineHeight = "1.4"; // Better readability
        hint.innerHTML = htmlContent;
        this.panel.appendChild(hint);
    }

    addLabeledInputWithDataList(label, type, value, suggestions, onChange) {
        const wrap = document.createElement("div");
        wrap.className = "field";
        const lbl = document.createElement("div");
        lbl.className = "prop-label";
        lbl.textContent = label;

        const listId = "datalist_" + Math.random().toString(36).substr(2, 9);
        const dataList = document.createElement("datalist");
        dataList.id = listId;
        suggestions.forEach(s => {
            const opt = document.createElement("option");
            opt.value = s;
            dataList.appendChild(opt);
        });

        const input = document.createElement("input");
        input.className = "prop-input";
        input.type = type;
        input.value = value;
        input.setAttribute("list", listId);
        // Handle both input (typing) and change (selection)
        input.addEventListener("input", () => onChange(input.value));
        input.addEventListener("change", () => onChange(input.value));

        wrap.appendChild(lbl);
        wrap.appendChild(input);
        wrap.appendChild(dataList);
        this.panel.appendChild(wrap);
    }

    addSectionLabel(text) {
        const section = document.createElement("div");
        section.className = "sidebar-section-label";
        section.textContent = text;
        this.panel.appendChild(section);
    }

    /**
     * Auto-populate title from entity's friendly_name when entity_id changes
     * @param {string} widgetId - The widget ID to update
     * @param {string} entityId - The entity_id to look up
     */
    autoPopulateTitleFromEntity(widgetId, entityId) {
        if (!entityId || !window.AppState) return;

        // Try to get entity info from the cached entity states
        // entityStatesCache contains objects with entity_id, name (friendly_name), formatted, attributes
        if (typeof fetchEntityStates === 'function') {
            fetchEntityStates().then(entities => {
                if (!entities || entities.length === 0) return;
                const entity = entities.find(e => e.entity_id === entityId);
                if (entity && entity.name) {
                    // Only update if widget still has no title
                    const currentWidget = AppState.getSelectedWidget();
                    if (currentWidget && currentWidget.id === widgetId && !currentWidget.title) {
                        AppState.updateWidget(widgetId, { title: entity.name });
                    }
                }
            }).catch(() => {
                // Silently fail - title auto-populate is optional
            });
        }
    }

    addLayerOrderButtons(widget) {
        const wrap = document.createElement("div");
        wrap.className = "field";
        wrap.style.display = "flex";
        wrap.style.gap = "4px";

        const buttons = [
            { label: "↑ Front", action: () => this.moveToFront(widget) },
            { label: "↓ Back", action: () => this.moveToBack(widget) },
            { label: "▲ Up", action: () => this.moveUp(widget) },
            { label: "▼ Down", action: () => this.moveDown(widget) }
        ];

        buttons.forEach(btn => {
            const button = document.createElement("button");
            button.className = "btn btn-secondary";
            button.textContent = btn.label;
            button.style.flex = "1";
            button.style.fontSize = "10px";
            button.style.padding = "4px";
            button.addEventListener("click", () => {
                btn.action();
            });
            wrap.appendChild(button);
        });

        this.panel.appendChild(wrap);
    }

    moveToFront(widget) {
        const page = AppState.getCurrentPage();
        const idx = page.widgets.findIndex(w => w.id === widget.id);
        if (idx > -1 && idx < page.widgets.length - 1) {
            page.widgets.splice(idx, 1);
            page.widgets.push(widget);
            AppState.setPages(AppState.pages); // Trigger update
        }
    }

    moveToBack(widget) {
        const page = AppState.getCurrentPage();
        const idx = page.widgets.findIndex(w => w.id === widget.id);
        if (idx > 0) {
            page.widgets.splice(idx, 1);
            page.widgets.unshift(widget);
            AppState.setPages(AppState.pages);
        }
    }

    moveUp(widget) {
        const page = AppState.getCurrentPage();
        const idx = page.widgets.findIndex(w => w.id === widget.id);
        if (idx > -1 && idx < page.widgets.length - 1) {
            [page.widgets[idx], page.widgets[idx + 1]] = [page.widgets[idx + 1], page.widgets[idx]];
            AppState.setPages(AppState.pages);
        }
    }

    moveDown(widget) {
        const page = AppState.getCurrentPage();
        const idx = page.widgets.findIndex(w => w.id === widget.id);
        if (idx > 0) {
            [page.widgets[idx], page.widgets[idx - 1]] = [page.widgets[idx - 1], page.widgets[idx]];
            AppState.setPages(AppState.pages);
        }
    }

    addVisibilityConditions(widget) {
        widget.condition_entity = widget.condition_entity || "";
        widget.condition_operator = widget.condition_operator || "==";
        widget.condition_state = widget.condition_state || "";
        widget.condition_min = widget.condition_min || "";
        widget.condition_max = widget.condition_max || "";

        // Help Text
        const helpWrap = document.createElement("div");
        helpWrap.className = "field";
        helpWrap.style.fontSize = "9px";
        helpWrap.style.color = "#9499a6"; // var(--muted)
        helpWrap.style.marginBottom = "6px";
        helpWrap.innerHTML = "Show/hide this widget based on an entity's state.";
        this.panel.appendChild(helpWrap);

        // Condition Entity with Picker
        this.addLabeledInputWithPicker("Condition Entity", "text", widget.condition_entity, (v) => {
            AppState.updateWidget(widget.id, { condition_entity: v });
        }, widget);

        const operators = ["==", "!=", "<", ">", "<=", ">="];
        this.addSelect("Operator", widget.condition_operator, operators, (v) => {
            AppState.updateWidget(widget.id, { condition_operator: v });
        });

        this.addLabeledInput("Condition State", "text", widget.condition_state, (v) => {
            AppState.updateWidget(widget.id, { condition_state: v });
        });

        this.addLabeledInput("Min Value (Range)", "text", widget.condition_min, (v) => {
            AppState.updateWidget(widget.id, { condition_min: v });
        });

        this.addLabeledInput("Max Value (Range)", "text", widget.condition_max, (v) => {
            AppState.updateWidget(widget.id, { condition_max: v });
        });

        // Clear Condition Button
        const clearWrap = document.createElement("div");
        clearWrap.className = "field";
        clearWrap.style.marginTop = "8px";
        const clearBtn = document.createElement("button");
        clearBtn.className = "btn btn-secondary btn-full";
        clearBtn.textContent = "Clear Condition";
        clearBtn.type = "button";
        clearBtn.addEventListener("click", () => {
            AppState.updateWidget(widget.id, {
                condition_entity: "",
                condition_operator: "==",
                condition_state: "",
                condition_min: "",
                condition_max: ""
            });
        });
        clearWrap.appendChild(clearBtn);
        this.panel.appendChild(clearWrap);
    }

    addLabeledInputWithPicker(label, type, value, onChange, widget) {
        const wrap = document.createElement("div");
        wrap.className = "field";
        const lbl = document.createElement("div");
        lbl.className = "prop-label";
        lbl.textContent = label;

        const inputRow = document.createElement("div");
        inputRow.style.display = "flex";
        inputRow.style.gap = "4px";

        const input = document.createElement("input");
        input.className = "prop-input";
        input.type = type;
        input.value = value;
        input.style.flex = "1";
        input.placeholder = "Start typing or click ▼ to pick...";
        input.autocomplete = "off";

        // Enable autocomplete with datalist
        if (window.ENTITY_DATALIST_ID) {
            input.setAttribute('list', window.ENTITY_DATALIST_ID);
            // Ensure datalist exists
            if (typeof window.ensureEntityDatalist === 'function') {
                window.ensureEntityDatalist();
            }
        }

        input.addEventListener("input", () => onChange(input.value));

        // Add picker button if helper function exists
        if (typeof window.openEntityPickerForWidget === "function") {
            const pickerBtn = document.createElement("button");
            pickerBtn.className = "btn btn-secondary";
            pickerBtn.innerHTML = "▼";
            pickerBtn.style.padding = "4px 8px";
            pickerBtn.style.fontSize = "10px";
            pickerBtn.style.minWidth = "32px";
            pickerBtn.type = "button";
            pickerBtn.title = "Browse all entities";
            pickerBtn.addEventListener("click", () => {
                window.openEntityPickerForWidget(widget, input, (selectedEntityId) => {
                    input.value = selectedEntityId;
                    onChange(selectedEntityId);
                });
            });
            inputRow.appendChild(input);
            inputRow.appendChild(pickerBtn);
        } else {
            inputRow.appendChild(input);
        }

        wrap.appendChild(lbl);
        wrap.appendChild(inputRow);
        this.panel.appendChild(wrap);
    }

    addIconInput(label, value, onChange, widget) {
        const wrap = document.createElement("div");
        wrap.className = "field";
        const lbl = document.createElement("div");
        lbl.className = "prop-label";
        lbl.textContent = label;

        const inputRow = document.createElement("div");
        inputRow.style.display = "flex";
        inputRow.style.gap = "4px";

        const input = document.createElement("input");
        input.className = "prop-input";
        input.type = "text";
        input.value = value;
        input.style.flex = "1";
        input.addEventListener("input", () => onChange(input.value));

        // Add picker button
        if (typeof window.openIconPickerForWidget === "function") {
            const pickerBtn = document.createElement("button");
            pickerBtn.className = "btn btn-secondary";
            pickerBtn.textContent = "★"; // Star icon for picker
            pickerBtn.style.padding = "4px 8px";
            pickerBtn.style.fontSize = "14px";
            pickerBtn.type = "button";
            pickerBtn.addEventListener("click", () => {
                window.openIconPickerForWidget(widget, input, (selectedIcon) => {
                    input.value = selectedIcon;
                    onChange(selectedIcon);
                });
            });
            inputRow.appendChild(input);
            inputRow.appendChild(pickerBtn);
        } else {
            inputRow.appendChild(input);
        }

        wrap.appendChild(lbl);
        wrap.appendChild(inputRow);
        this.panel.appendChild(wrap);
    }

    addColorMixer(label, value, onChange) {
        const wrap = document.createElement("div");
        wrap.className = "field";
        wrap.style.marginBottom = "10px";

        const lbl = document.createElement("div");
        lbl.className = "prop-label";
        lbl.textContent = label;
        wrap.appendChild(lbl);

        // Parse initial color
        let r = 0, g = 0, b = 0;
        let hex = "#000000";

        // Helper to parse existing color (named, hex, or int)
        const parseColor = (c) => {
            const names = {
                "black": "#000000", "white": "#FFFFFF", "red": "#FF0000", "green": "#00FF00",
                "blue": "#0000FF", "yellow": "#FFFF00", "gray": "#808080", "grey": "#808080"
            };
            if (!c) return "#000000";
            if (names[c.toLowerCase()]) return names[c.toLowerCase()];
            if (c.startsWith("0x")) return "#" + c.substring(2);
            if (c.startsWith("#")) return c;
            return "#000000";
        };

        const hexToRgb = (h) => {
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(h);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : { r: 0, g: 0, b: 0 };
        };

        const rgbToHex = (rv, gv, bv) => {
            const toHex = (c) => {
                const hx = Math.max(0, Math.min(255, c)).toString(16);
                return hx.length === 1 ? "0" + hx : hx;
            };
            return "#" + toHex(rv) + toHex(gv) + toHex(bv);
        };

        // Initialize state
        hex = parseColor(value);
        const rgb = hexToRgb(hex);
        r = rgb.r; g = rgb.g; b = rgb.b;

        // Container for Preview + Inputs
        const mixerContainer = document.createElement("div");
        mixerContainer.style.background = "var(--bg)";
        mixerContainer.style.padding = "8px";
        mixerContainer.style.borderRadius = "6px";
        mixerContainer.style.border = "1px solid var(--border-subtle)";

        // Top Row: Preview Box + Hex Input
        const topRow = document.createElement("div");
        topRow.style.display = "flex";
        topRow.style.alignItems = "center";
        topRow.style.marginBottom = "8px";
        topRow.style.gap = "8px";

        const previewBox = document.createElement("div");
        previewBox.style.width = "24px";
        previewBox.style.height = "24px";
        previewBox.style.borderRadius = "3px";
        previewBox.style.backgroundColor = hex;
        previewBox.style.border = "1px solid var(--border-subtle)";

        const hexInput = document.createElement("input");
        hexInput.type = "text";
        hexInput.value = hex.toUpperCase();
        hexInput.className = "prop-input";
        hexInput.style.flex = "1";
        hexInput.style.fontFamily = "monospace";

        topRow.appendChild(previewBox);
        topRow.appendChild(hexInput);
        mixerContainer.appendChild(topRow);

        // Sliders
        const createSlider = (sliderLabel, val, color) => {
            const row = document.createElement("div");
            row.style.display = "flex";
            row.style.alignItems = "center";
            row.style.marginBottom = "4px";
            row.style.fontSize = "11px";

            const rowLbl = document.createElement("span");
            rowLbl.textContent = sliderLabel;
            rowLbl.style.width = "15px";
            rowLbl.style.fontWeight = "bold";
            rowLbl.style.color = "var(--text)";

            const slider = document.createElement("input");
            slider.type = "range";
            slider.min = "0";
            slider.max = "255";
            slider.value = val;
            slider.style.flex = "1";
            slider.style.marginLeft = "4px";
            slider.style.accentColor = color;

            const valLbl = document.createElement("span");
            valLbl.textContent = val;
            valLbl.style.width = "25px";
            valLbl.style.textAlign = "right";
            valLbl.style.marginLeft = "4px";
            valLbl.style.color = "var(--muted)";

            row.appendChild(rowLbl);
            row.appendChild(slider);
            row.appendChild(valLbl);
            return { row, slider, valLbl };
        };

        const rSlider = createSlider("R", r, "red");
        const gSlider = createSlider("G", g, "green");
        const bSlider = createSlider("B", b, "blue");

        mixerContainer.appendChild(rSlider.row);
        mixerContainer.appendChild(gSlider.row);
        mixerContainer.appendChild(bSlider.row);

        wrap.appendChild(mixerContainer);
        this.panel.appendChild(wrap);

        // Event Handling logic
        const updateFromSliders = () => {
            r = parseInt(rSlider.slider.value);
            g = parseInt(gSlider.slider.value);
            b = parseInt(bSlider.slider.value);

            rSlider.valLbl.textContent = r;
            gSlider.valLbl.textContent = g;
            bSlider.valLbl.textContent = b;

            const newHex = rgbToHex(r, g, b).toUpperCase();
            hexInput.value = newHex;
            previewBox.style.backgroundColor = newHex;

            onChange(newHex);
        };

        const updateFromHex = () => {
            let val = hexInput.value.trim();
            if (!val.startsWith("#")) val = "#" + val;

            if (/^#[0-9A-F]{6}$/i.test(val)) {
                const rgbVal = hexToRgb(val);
                r = rgbVal.r; g = rgbVal.g; b = rgbVal.b;

                rSlider.slider.value = r; rSlider.valLbl.textContent = r;
                gSlider.slider.value = g; gSlider.valLbl.textContent = g;
                bSlider.slider.value = b; bSlider.valLbl.textContent = b;

                previewBox.style.backgroundColor = val;
                onChange(val);
            }
        };

        rSlider.slider.addEventListener("input", updateFromSliders);
        gSlider.slider.addEventListener("input", updateFromSliders);
        bSlider.slider.addEventListener("input", updateFromSliders);

        hexInput.addEventListener("input", updateFromHex);
        hexInput.addEventListener("change", updateFromHex);
    }
}

