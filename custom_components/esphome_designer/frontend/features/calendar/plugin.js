/**
 * Calendar Plugin
 */
import { AppState } from '@core/state';
import { SchemaRenderer } from '../../js/core/properties/schema_renderer.js'; // eslint-disable-line no-unused-vars

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
                location_lines = event['location'].split('\\\\\\\\n')
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
output["entries"] = {"days": converted_data[0]}
output["closest_end_time"] = converted_data[1]
`;

const drawCalendarPreview = (el, widget, props, { getColorStyle }) => {
    // Simple mock rendering for preview
    const width = widget.width || 400;
    const height = widget.height || 300;

    const color = props.text_color || "theme_auto";
    const colorStyle = getColorStyle(color);

    el.style.width = width + "px";
    el.style.height = height + "px";
    el.style.backgroundColor = props.background_color || "transparent";
    el.style.borderRadius = `${props.border_radius || 0}px`;
    el.style.color = colorStyle;
    el.style.padding = "4px";
    el.style.boxSizing = "border-box";

    if (props.border_width) {
        const borderColor = props.border_color || color;
        el.style.border = `${props.border_width}px solid ${getColorStyle(borderColor)}`;
    } else {
        el.style.border = "none";
    }

    const now = new Date();
    const date = now.getDate();
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const dayNameText = dayNames[now.getDay()];
    const monthYearText = `${monthNames[now.getMonth()]} ${now.getFullYear()}`;

    const header = document.createElement("div");
    header.style.textAlign = "center";
    header.style.padding = "2px";
    header.style.borderBottom = "1px solid " + colorStyle;
    header.style.flexShrink = "0";

    const bigDate = document.createElement("div");
    bigDate.style.fontSize = Math.min((props.font_size_date || 100) * 0.7, 80) + "px";
    bigDate.style.fontWeight = "100";
    bigDate.style.lineHeight = "0.8";
    bigDate.innerText = date;
    header.appendChild(bigDate);

    const dayName = document.createElement("div");
    dayName.style.fontSize = (props.font_size_day || 24) + "px";
    dayName.style.fontWeight = "bold";
    dayName.style.marginTop = "4px"; // Add space below the date
    dayName.innerText = dayNameText;
    header.appendChild(dayName);

    const dateLine = document.createElement("div");
    dateLine.style.fontSize = (props.font_size_grid || 14) + "px";
    dateLine.innerText = monthYearText;
    header.appendChild(dateLine);

    el.style.display = "flex";
    el.style.flexDirection = "column";
    if (props.show_header !== false) {
        el.appendChild(header);
    }

    const grid = document.createElement("div");
    grid.style.display = "grid";
    grid.style.gridTemplateColumns = "repeat(7, 1fr)";
    grid.style.padding = "2px";
    grid.style.gap = "1px";
    grid.style.flexShrink = "0";

    const gridFontSize = (props.font_size_grid || 14) + "px";

    ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].forEach(day => {
        const d = document.createElement("div");
        d.innerText = day;
        d.style.textAlign = "center";
        d.style.fontWeight = "bold";
        d.style.fontSize = gridFontSize;
        grid.appendChild(d);
    });

    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    const daysInMonth = lastDay.getDate();

    let startDay = firstDay.getDay();
    if (startDay === 0) startDay = 7;
    startDay -= 1;

    for (let i = 0; i < startDay; i++) {
        grid.appendChild(document.createElement("div"));
    }

    for (let i = 1; i <= daysInMonth; i++) {
        const d = document.createElement("div");
        d.innerText = i;
        d.style.textAlign = "center";
        d.style.fontSize = gridFontSize;

        if (i === date) {
            d.style.backgroundColor = colorStyle;
            const bgProp = props.background_color || "transparent";

            // High Contrast Logic for Preview:
            // IF background is transparent, the circle color is `colorStyle` (text color).
            // We need text inside the circle to contrast with `colorStyle`.
            // If `colorStyle` is light/white, text should be black.
            // If `colorStyle` is dark/black, text should be white.
            // This is a simplified check.
            let textCol = "black";
            if (colorStyle === "white" || colorStyle === "#ffffff" || colorStyle === "#fff" || colorStyle.startsWith("rgb(255")) {
                textCol = "black";
            } else if (colorStyle === "black" || colorStyle === "#000000" || colorStyle === "#000") {
                textCol = "white";
            } else {
                // Fallback: if transparent, assume themed. 
                // If theme is dark (white text), use black inside.
                // If theme is light (black text), use white inside.
                // Since `colorStyle` is resolved, we just guess based on likely values.
                // safe default is usually page background if we can't tell, but black is safer for white text.
                textCol = (bgProp === "transparent") ? "var(--bg-base)" : getColorStyle(bgProp); // eslint-disable-line no-unused-vars
            }

            // Override with simple inversion if transparent
            if (bgProp === "transparent") {
                // If the main text color is light, we want dark text inside the bubble
                // We can roughly check if colorStyle is 'white' or similar
                d.style.color = (colorStyle.includes("white") || colorStyle.includes("#f") || colorStyle.includes("255")) ? "black" : "white";
            } else {
                d.style.color = getColorStyle(bgProp);
            }

            d.style.borderRadius = "50%";
            d.style.width = "1.5em";
            d.style.height = "1.5em";
            d.style.lineHeight = "1.5em";
            d.style.margin = "0 auto";
            d.style.fontWeight = "bold";
        }
        grid.appendChild(d);
    }
    if (props.show_grid !== false) {
        el.appendChild(grid);
    }

    const events = document.createElement("div");
    events.style.padding = "5px";
    events.style.fontSize = (props.font_size_event || 18) + "px";
    events.style.flexGrow = "1";
    events.style.overflow = "hidden";

    // Try to get live data from AppState
    let liveEvents = null;
    const entityId = (widget.entity_id || props.entity_id || "sensor.esp_calendar_data").trim();
    console.log("[Calendar Preview] Looking for entity:", entityId);
    if (window.AppState && window.AppState.entityStates) {
        const stateObj = window.AppState.entityStates[entityId];
        console.log("[Calendar Preview] Found stateObj:", stateObj ? "yes" : "no", stateObj ? JSON.stringify(stateObj).substring(0, 300) : "");
        if (stateObj) {
            try {
                // STRATEGY 1: Check Attributes (The new "Sensor" way)
                // Home Assistant attributes are often objects, so we check if entries exists
                if (stateObj.attributes && stateObj.attributes.entries) {
                    // It might be a string (if passed through some APIs) or already an object
                    if (typeof stateObj.attributes.entries === 'string') {
                        const parsed = JSON.parse(stateObj.attributes.entries);
                        liveEvents = parsed.days || parsed;
                    } else {
                        liveEvents = stateObj.attributes.entries.days || stateObj.attributes.entries;
                    }
                }
                // STRATEGY 2: Check State (The old "Input Text" way)
                else if (stateObj.state && stateObj.state.length > 5 && stateObj.state !== "OK" && stateObj.state !== "unknown") {
                    const doc = JSON.parse(stateObj.state);
                    liveEvents = doc.days || doc;
                }
                // STRATEGY 3: Standard HA calendar entity (has message, start_time, etc.)
                else if (!liveEvents && stateObj.attributes) {
                    const msg = stateObj.attributes.message;
                    if (msg !== undefined) {
                        const now = new Date();
                        const start = stateObj.attributes.start_time || "";
                        const end = stateObj.attributes.end_time || "";
                        const isAllDay = stateObj.attributes.all_day === true;

                        liveEvents = [{
                            day: now.getDate(),
                            all_day: isAllDay ? [{
                                summary: msg,
                                start: start,
                                end: end
                            }] : [],
                            other: !isAllDay ? [{
                                summary: msg,
                                start: start,
                                end: end
                            }] : []
                        }];
                    }
                }
            } catch (e) {
                console.warn("[Calendar Widget] Failed to parse live state/attributes:", e);
            }
        }
    }

    if (liveEvents && Array.isArray(liveEvents) && liveEvents.length > 0) {
        events.innerHTML = "";
        const limit = props.max_events || props.event_limit || 8;
        let count = 0;
        for (const dayEntry of liveEvents) {
            if (count >= limit) break;
            const dayNum = dayEntry.day;

            const drawRow = (ev, isAllDay) => {
                if (count >= limit) return;
                const summary = ev.summary || "No Title";
                const start = ev.start || "";
                let timeStr = isAllDay ? "All Day" : "";
                if (!isAllDay && start.includes("T")) {
                    timeStr = start.split("T")[1].substring(0, 5);
                }

                const row = document.createElement("div");
                row.style.marginBottom = "4px";
                row.style.display = "flex";
                row.style.justifyContent = "space-between";
                row.innerHTML = `<span style="flex-shrink:0;width:25px;"><b>${dayNum}</b></span>` +
                    `<span style="flex-grow:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin-right:8px;">${summary}</span>` +
                    `<span style="flex-shrink:0;opacity:0.7;font-size:0.9em;">${timeStr}</span>`;
                events.appendChild(row);
                count++;
            };

            if (dayEntry.all_day) dayEntry.all_day.forEach(ev => drawRow(ev, true));
            if (dayEntry.other) dayEntry.other.forEach(ev => drawRow(ev, false));
        }
    } else {
        // Fallback to mock data
        events.innerHTML = `
            <div style="margin-bottom:4px;"><b>${date}</b> Meeting with Team</div>
            <div><b>${Math.min(date + 2, daysInMonth)}</b> Dentist Appointment</div>
        `;
    }
    if (props.show_events !== false) {
        el.appendChild(events);
    }
};


const calendarSchema = [ // eslint-disable-line no-unused-vars
    {
        section: "Display Options",
        fields: [
            { key: "show_header", label: "Show Header (Today)", type: "checkbox", default: true },
            { key: "show_grid", label: "Show Days Grid", type: "checkbox", default: true },
            { key: "show_events", label: "Show Events List", type: "checkbox", default: true },
            { key: "max_events", label: "Max Events Shown", type: "number", default: 8 }
        ]
    },
    {
        section: "Typography",
        fields: [
            { key: "font_family", label: "Font Family", type: "select", options: ["Roboto", "Inter", "Open Sans", "Monospace"], default: "Roboto" },
            { key: "font_size_date", label: "Date Size (Header)", type: "number", default: 100 },
            { key: "font_size_day", label: "Day Size (Header)", type: "number", default: 24 },
            { key: "font_size_grid", label: "Grid Text Size", type: "number", default: 14 },
            { key: "font_size_event", label: "Event Text Size", type: "number", default: 18 }
        ]
    },
    {
        section: "Appearance",
        fields: [
            { key: "text_color", label: "Text Color", type: "color", default: "theme_auto" },
            { key: "background_color", label: "Background", type: "color", default: "transparent" },
            { key: "border_width", label: "Border Width", type: "number", default: 0 },
            { key: "border_color", label: "Border Color", type: "color", default: "theme_auto" },
            { key: "border_radius", label: "Corners", type: "number", default: 0 },
            { key: "opa", label: "Opacity (0 - 255)", type: "number", default: 255 },
            { key: "opacity", label: "Opacity (0 - 255)", type: "number", default: 255 }
        ]
    }
];

export default {
    id: "calendar",
    name: "Calendar",
    category: "Events",
    // CRITICAL ARCHITECTURAL NOTE: OEPL and OpenDisplay are excluded because their 
    // export implementations are insufficient for this complex widget.
    supportedModes: ['lvgl', 'direct'],
    defaults: {
        entity_id: "sensor.esp_calendar_data",
        border_width: 0,
        show_border: true,
        border_color: "theme_auto",
        border_radius: 0,
        background_color: "transparent",
        text_color: "theme_auto",
        font_size_date: 100,
        font_size_day: 24,
        font_size_grid: 14,
        font_size_event: 18,
        show_header: true,
        show_grid: true,
        show_events: true,
        width: 335,
        height: 340,
        opa: 255
    },
    renderProperties: (panel, widget) => {
        const props = widget.props || {};
        const updateProp = (key, val) => {
            const newProps = { ...widget.props, [key]: val };
            AppState.updateWidget(widget.id, { props: newProps });
        };

        panel.createSection("Data Source", true);
        panel.addLabeledInputWithPicker("Calendar Sensor ID", "text", widget.entity_id || "sensor.esp_calendar_data", (v) => {
            AppState.updateWidget(widget.id, { entity_id: v });
        }, widget);

        panel.addLabeledInput("Source Calendars (CSV)", "text", props.source_calendars || "calendar.example_1, calendar.example_2", (v) => updateProp("source_calendars", v));
        panel.addHint("List the HA calendar entities to include, separated by commas.");

        const btnGroup = document.createElement("div");
        btnGroup.style.display = "flex";
        btnGroup.style.gap = "8px";
        btnGroup.style.marginTop = "12px";

        const dlBtn = document.createElement("button");
        dlBtn.className = "btn btn-secondary btn-full btn-xs";
        dlBtn.textContent = "Script";
        dlBtn.title = "Download Python Helper Script";
        dlBtn.style.flex = "1";
        dlBtn.addEventListener("click", () => {
            const element = document.createElement('a');
            element.setAttribute('href', 'data:text/x-python;charset=utf-8,' + encodeURIComponent(CALENDAR_HELPER_SCRIPT));
            element.setAttribute('download', 'esp_calendar_data_conversion.py');
            element.click();
        });

        const copyBtn = document.createElement("button");
        copyBtn.className = "btn btn-secondary btn-full btn-xs";
        copyBtn.textContent = "YAML";
        copyBtn.title = "Copy HA Template YAML to Clipboard";
        copyBtn.style.flex = "1";
        copyBtn.addEventListener("click", () => {
            // Simple generic YAML block based on common setup
            const yaml = `
# Add to configuration.yaml
template:
  - trigger:
      - trigger: time_pattern
        minutes: "/15"
    action:
      - action: calendar.get_events
        target:
          entity_id: ${props.source_calendars || 'calendar.your_calendar'}
        data:
          duration:
            days: 14
        response_variable: calendar_events
      - action: python_script.esp_calendar_data_conversion
        data:
          calendar: "{{ calendar_events }}"
          now: "{{ now().isoformat().split('T')[0] }}"
        response_variable: output
    sensor:
      - name: ESP Calendar Data
        unique_id: esp_calendar_data
        state: "OK"
        attributes:
          entries: "{{ output.entries }}"
          closest_end_time: "{{ output.closest_end_time }}"
`;
            navigator.clipboard.writeText(yaml.trim());
            copyBtn.textContent = "✓ Copied";
            setTimeout(() => { copyBtn.textContent = "YAML"; }, 2000);
        });

        btnGroup.appendChild(dlBtn);
        btnGroup.appendChild(copyBtn);
        panel.getContainer().appendChild(btnGroup);
        panel.addHint("1. Download script to /python_scripts/<br/>2. Copy & paste YAML to HA config.");
        panel.endSection();

        panel.createSection("Design", true);
        panel.addCheckbox("Show Header", props.show_header !== false, (v) => updateProp("show_header", v));
        panel.addCheckbox("Show Grid", props.show_grid !== false, (v) => updateProp("show_grid", v));
        panel.addCheckbox("Show Events", props.show_events !== false, (v) => updateProp("show_events", v));
        panel.addLabeledInput("Max Events", "number", props.max_events || 8, (v) => updateProp("max_events", parseInt(v, 10)));
        panel.endSection();

        panel.createSection("Typography", false);
        panel.addSelect("Font Family", props.font_family || "Roboto", ["Roboto", "Inter", "Open Sans", "Monospace"], (v) => updateProp("font_family", v));
        panel.addLabeledInput("Date Size (Header)", "number", props.font_size_date || 100, (v) => updateProp("font_size_date", parseInt(v, 10)));
        panel.addLabeledInput("Day Size (Header)", "number", props.font_size_day || 24, (v) => updateProp("font_size_day", parseInt(v, 10)));
        panel.addLabeledInput("Grid Text Size", "number", props.font_size_grid || 14, (v) => updateProp("font_size_grid", parseInt(v, 10)));
        panel.addLabeledInput("Event Text Size", "number", props.font_size_event || 18, (v) => updateProp("font_size_event", parseInt(v, 10)));
        panel.endSection();

        panel.createSection("Appearance", false);
        panel.addColorSelector("Text Color", props.text_color || "theme_auto", null, (v) => updateProp("text_color", v));
        panel.addColorSelector("Background", props.background_color || "transparent", null, (v) => updateProp("background_color", v));
        panel.addLabeledInput("Border Width", "number", props.border_width || 0, (v) => updateProp("border_width", parseInt(v, 10)));
        panel.addColorSelector("Border Color", props.border_color || "theme_auto", null, (v) => updateProp("border_color", v));
        panel.addLabeledInput("Corner Radius", "number", props.border_radius || 0, (v) => updateProp("border_radius", parseInt(v, 10)));
        panel.addNumberWithSlider("Opacity (%)", props.opacity !== undefined ? props.opacity : 100, 0, 100, (v) => updateProp("opacity", v));
        panel.addDropShadowButton(panel.getContainer(), widget.id);
        panel.endSection();
    },
    render: (el, widget, context) => {
        const props = widget.props || {};
        el.innerHTML = "";
        drawCalendarPreview(el, widget, props, context);
    },

    onExportTextSensors: (context) => {
        const { lines, widgets } = context;
        if (!widgets) return;

        const calendarWidgets = widgets.filter(w => w.type === "calendar");
        if (calendarWidgets.length === 0) return;

        let _needsInstruction = false;

        for (const w of calendarWidgets) {
            const p = w.props || {};
            const entityId = (w.entity_id || p.entity_id || "sensor.esp_calendar_data").trim();
            const isSensor = entityId.startsWith("sensor.");
            // Use entity-based ID so all widgets sharing the same entity share one sensor
            const safeId = `calendar_data_${entityId.replace(/[^a-zA-Z0-9_]/g, "_")}`;

            const alreadyDefined = (context.seenEntityIds && context.seenEntityIds.has(entityId)) ||
                (context.seenSensorIds && context.seenSensorIds.has(safeId));

            if (!alreadyDefined) {
                _needsInstruction = true; // Use this to toggle instruction block // eslint-disable-line no-unused-vars
                if (context.seenEntityIds) context.seenEntityIds.add(entityId);
                if (context.seenSensorIds) context.seenSensorIds.add(safeId);

                lines.push("- platform: homeassistant");
                lines.push(`  id: ${safeId}`);
                lines.push(`  entity_id: ${entityId}`);
                if (isSensor) {
                    lines.push(`  attribute: entries`);
                }
                lines.push(`  internal: true`);
            }
        }

        // Generate Dynamic Instructions based on the first widget's properties (simplification)
        const primaryWidget = calendarWidgets[0];
        const sourceCalendars = (primaryWidget.props && primaryWidget.props.source_calendars)
            ? primaryWidget.props.source_calendars
            : "calendar.example_1, calendar.example_2";

        // Generate calendar entity list for calendar.get_events
        const calendarEntities = sourceCalendars.split(',')
            .map(c => c.trim())
            .filter(c => c);
        const calendarEntityListYaml = calendarEntities
            .map(c => `#           - ${c}`)
            .join('\n');

        lines.push("");
        lines.push("# ============================================================================");
        lines.push("# CALENDAR EVENTS SETUP (HOME ASSISTANT)");
        lines.push("# 1. Download the 'Helper Script' from the Calendar widget's properties panel.");
        lines.push("# 2. Place it in your /config/python_scripts/ folder.");
        lines.push("# 3. Enable the python_script integration by adding this line to configuration.yaml:");
        lines.push("#");
        lines.push("#    python_script:");
        lines.push("#");
        lines.push("# 4. Add this template sensor configuration (configuration.yaml or packages):");
        lines.push("#");
        lines.push("# template:");
        lines.push("#   - trigger:");
        lines.push("#       - trigger: time_pattern");
        lines.push("#         minutes: '/15'");
        lines.push("#     action:");
        lines.push("#       - action: calendar.get_events");
        lines.push("#         target:");
        lines.push("#           entity_id:");
        lines.push(`${calendarEntityListYaml}`);
        lines.push("#         data:");
        lines.push("#           duration:");
        lines.push("#             days: 14");
        lines.push("#         response_variable: calendar_events");
        lines.push("#       - action: python_script.esp_calendar_data_conversion");
        lines.push("#         data:");
        lines.push("#           calendar: \"{{ calendar_events }}\"");
        lines.push("#           now: \"{{ now().isoformat().split('T')[0] }}\"");
        lines.push("#         response_variable: output");
        lines.push("#     sensor:");
        lines.push("#       - name: ESP Calendar Data");
        lines.push("#         unique_id: esp_calendar_data");
        lines.push("#         state: \"OK\"");
        lines.push("#         attributes:");
        lines.push("#           entries: \"{{ output.entries }}\"");
        lines.push("#           closest_end_time: \"{{ output.closest_end_time }}\"");
        lines.push("#");
        lines.push("# 5. Restart HA (required for python_script), then Reload Template Entities.");
        lines.push("# ============================================================================");
    },

    exportLVGL: (w, { common, convertColor, getLVGLFont }) => {
        const p = w.props || {};
        const color = convertColor(p.text_color || "theme_auto");
        const bgColor = convertColor(p.background_color || "white");
        const dateFS = Math.round(Math.min((p.font_size_date || 100) * 0.7, 80));
        const dayFS = parseInt(p.font_size_day || 24, 10);
        const gridFS = parseInt(p.font_size_grid || 14, 10);
        const family = p.font_family || "Roboto";

        const headH = dateFS + dayFS + gridFS + 15;

        // Note: This is an LVGL approximation. A full dynamic calendar grid requires 
        // complex C++ logic or a custom LVGL widget type not yet standard in ESPHome.
        // We provide a functional header (Date/Day/Month) and a static day-name row.

        const widgets = [];

        if (p.show_header !== false) {
            widgets.push(
                {
                    label: {
                        align: "TOP_MID", y: 2, height: dateFS + 4,
                        text: '!lambda "char buf[4]; id(ha_time).now().strftime(buf, sizeof(buf), \'%d\'); return buf;"',
                        text_font: getLVGLFont(family, dateFS, 100), text_color: color
                    }
                },
                {
                    label: {
                        align: "TOP_MID", y: dateFS + 6, height: dayFS + 4,
                        text: '!lambda "char buf[16]; id(ha_time).now().strftime(buf, sizeof(buf), \'%A\'); return buf;"',
                        text_font: getLVGLFont(family, dayFS, 700), text_color: color
                    }
                },
                {
                    label: {
                        align: "TOP_MID", y: dateFS + dayFS + 10, height: gridFS + 4,
                        text: '!lambda "char buf[32]; id(ha_time).now().strftime(buf, sizeof(buf), \'%B %Y\'); return buf;"',
                        text_font: getLVGLFont(family, gridFS, 400), text_color: color
                    }
                },
                {
                    obj: {
                        width: "100%", height: 1, y: headH, bg_color: color, border_width: 0
                    }
                }
            );
        }

        // Day grid row (Mo Tu We...)
        // Day grid row (Mo Tu We...)
        if (p.show_grid !== false) {
            widgets.push({
                obj: {
                    width: "100%", height: "SIZE_CONTENT", y: headH + 5,
                    bg_opa: "transp", border_width: 0,
                    layout: { type: "flex", flex_flow: "row_wrap", flex_align_main: "space_around" },
                    widgets: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map(d => ({
                        label: { text: `"${d}"`, text_font: getLVGLFont(family, gridFS, 700), text_color: color, width: "14%", align: "center" }
                    }))
                }
            });

            // Placeholder for the grid body to avoid emptiness
            widgets.push({
                label: {
                    y: headH + 40, align: "TOP_MID",
                    text: "\"Calendar Grid Not Supported in LVGL Mode\"",
                    text_font: getLVGLFont("Roboto", 12, 400),
                    text_color: "0x888888"
                }
            });
        }



        return {
            obj: {
                ...common,
                bg_color: bgColor,
                bg_opa: "COVER",
                radius: p.border_radius || 0,
                border_width: p.border_width || 0,
                border_color: convertColor(p.border_color || "theme_auto"),
                widgets: widgets
            }
        };
    },

    export: (w, context) => {
        const {
            lines, addFont, getColorConst, addDitherMask, getCondProps, getConditionCheck, isEpaper // eslint-disable-line no-unused-vars
        } = context;

        const p = w.props || {};
        const entityId = (w.entity_id || p.entity_id || "sensor.esp_calendar_data").trim();
        const borderColorProp = p.border_color || "theme_auto";
        const colorProp = p.text_color || "theme_auto";
        const bgColorProp = p.background_color || "transparent";
        const color = getColorConst(colorProp);
        const borderColor = getColorConst(borderColorProp);
        const bgColor = getColorConst(bgColorProp);

        const borderWidth = parseInt(p.border_width || 0, 10);
        const radius = p.border_radius || 0;

        const dateFontSize = Math.round(Math.min(parseInt(p.font_size_date || 100, 10) * 0.7, 80));
        const dayFontSize = parseInt(p.font_size_day || 24, 10);
        const gridFontSize = parseInt(p.font_size_grid || 14, 10);
        const eventFontSize = parseInt(p.font_size_event || 18, 10);
        const fontFamily = p.font_family || "Roboto";

        const dateFontId = addFont(fontFamily, 100, dateFontSize); // Full size
        const dayFontId = addFont(fontFamily, 700, dayFontSize);
        const gridFontId = addFont(fontFamily, 400, gridFontSize);
        const eventFontId = addFont(fontFamily, 400, eventFontSize);


        const cond = getConditionCheck(w);
        if (cond) lines.push(`        ${cond}`);

        lines.push(`        {`);
        lines.push(`          auto now = id(ha_time).now();`);
        lines.push(`          int x = ${w.x}; int y = ${w.y}; int w = ${w.width}; int h = ${w.height};`);

        // Background
        if (bgColorProp !== "transparent") {
            if (radius > 0) {
                lines.push(`          it.filled_rounded_rectangle(x, y, w, h, ${radius}, ${bgColor});`);
            } else {
                lines.push(`          it.filled_rectangle(x, y, w, h, ${bgColor});`);
            }
        }

        // Header
        const showHeader = p.show_header !== false;
        lines.push(`          // Header`);
        lines.push(`          int headH = ${dateFontSize + dayFontSize + gridFontSize + 15};`);

        if (showHeader) {
            lines.push(`          it.strftime(x + w/2, y + 2, id(${dateFontId}), ${color}, TextAlign::TOP_CENTER, "%d", now);`);
            lines.push(`          it.strftime(x + w/2, y + ${dateFontSize + 6}, id(${dayFontId}), ${color}, TextAlign::TOP_CENTER, "%A", now);`);
            lines.push(`          it.strftime(x + w/2, y + ${dateFontSize + dayFontSize + 10}, id(${gridFontId}), ${color}, TextAlign::TOP_CENTER, "%B %Y", now);`);
            lines.push(`          it.line(x, y + headH, x + w, y + headH, ${color});`);
        } else {
            lines.push(`          headH = 0;`); // Reset headH if hidden so subsequent elements flow up
        }

        // Grid
        const showGrid = p.show_grid !== false;
        lines.push(`          // Days Grid`);
        lines.push(`          int gridY = y + headH + 5;`);
        lines.push(`          int cellW = w / 7;`);
        lines.push(`          int rowH = ${gridFontSize + 4};`);
        lines.push(`          int r = 1;`); // Init r for layout calculation later even if grid hidden

        if (showGrid) {
            lines.push(`          const char* days[] = {"Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"};`);
            lines.push(`          for(int i=0; i<7; i++) {`);
            lines.push(`            it.print(x + i*cellW + cellW/2, gridY, id(${gridFontId}), ${color}, TextAlign::TOP_CENTER, days[i]);`);
            lines.push(`          }`);

            // Calendar Logic (Simplified for static display or needs helper)
            // Since we don't have a full calendar helper in C++ easily available without including heavy libs,
            // we will render a placeholder or basic static grid for the current month if possible.
            // For now, let's mimic the preview's logic best we can with available time info.

            lines.push(`          // Simple logic to find start of month`);
            lines.push(`          time_t t = now.timestamp;`);
            lines.push(`          struct tm *tm = localtime(&t);`);
            lines.push(`          tm->tm_mday = 1;`);
            lines.push(`          mktime(tm);`);
            lines.push(`          int startDay = (tm->tm_wday + 6) % 7; // 0=Mon`);
            lines.push(`          int daysInMonth = 31; // Simplified`);
            lines.push(`          if(now.month == 2) daysInMonth = (now.year % 4 == 0) ? 29 : 28;`);
            lines.push(`          else if(now.month == 4 || now.month == 6 || now.month == 9 || now.month == 11) daysInMonth = 30;`);

            lines.push(`          int c = startDay;`);
            lines.push(`          for(int d=1; d<=daysInMonth; d++) {`);
            lines.push(`            if(d == now.day_of_month) {`);
            lines.push(`               it.filled_circle(x + c*cellW + cellW/2, gridY + r*rowH + 6, ${Math.floor(gridFontSize / 1.5)}, ${color});`);
            lines.push(`               it.printf(x + c*cellW + cellW/2, gridY + r*rowH, id(${gridFontId}), ${bgColorProp === "transparent" ? (colorProp.includes('black') || colorProp.includes('000000') ? "Color::WHITE" : "Color::BLACK") : bgColor}, TextAlign::TOP_CENTER, "%d", d);`);
            lines.push(`            } else {`);
            lines.push(`               it.printf(x + c*cellW + cellW/2, gridY + r*rowH, id(${gridFontId}), ${color}, TextAlign::TOP_CENTER, "%d", d);`);
            lines.push(`            }`);
            lines.push(`            c++; if(c>6) { c=0; r++; }`);
            lines.push(`          }`);
        } else {
            lines.push(`          r = 0;`); // Reset rows if hidden
            lines.push(`          gridY = y + headH;`); // Reset gridY so events move up
        }

        // Events
        const showEvents = p.show_events !== false;

        if (showEvents) {
            lines.push(`          // Events (Real Data from Sensor)`);
            lines.push(`          auto extract_time = [](const char* datetime) -> std::string {`);
            lines.push(`              std::string datetimeStr(datetime);`);
            lines.push(`              size_t pos = datetimeStr.find('T');`);
            lines.push(`              if (pos != std::string::npos && pos + 3 < datetimeStr.size()) {`);
            lines.push(`                  return datetimeStr.substr(pos + 1, 5);`);
            lines.push(`              }`);
            lines.push(`              return "";`);
            lines.push(`          };`);
            lines.push(``);
            lines.push(`          int eventY = gridY + (r+1)*rowH + 10;`);
            lines.push(`          int max_y = y + h - 5;`);
            lines.push(`          const int event_limit = ${p.max_events || p.event_limit || 8};`);
            lines.push(``);
            // Use entity-based sensor ID to match onExportTextSensors
            const sensorSafeId = `calendar_data_${entityId.replace(/[^a-zA-Z0-9_]/g, "_")}`;
            lines.push(`          if (id(${sensorSafeId}).state.length() > 5 && id(${sensorSafeId}).state != "unknown") {`);
            lines.push(`             JsonDocument doc;`);
            lines.push(`             DeserializationError error = deserializeJson(doc, id(${sensorSafeId}).state);`);
            lines.push(``);
            lines.push(`             if (!error) {`);
            lines.push(`                 JsonVariant root = doc.as<JsonVariant>();`);
            lines.push(`                 JsonArray days;`);
            lines.push(``);
            lines.push(`                 if (root.is<JsonObject>() && root["days"].is<JsonArray>()) {`);
            lines.push(`                     days = root["days"];`);
            lines.push(`                 } else if (root.is<JsonArray>()) {`);
            lines.push(`                     days = root;`);
            lines.push(`                 }`);
            lines.push(``);
            lines.push(`                 if (!days.isNull() && days.size() > 0) {`);
            lines.push(`                     int event_count = 0;`);
            lines.push(`                     // Separator line`);
            lines.push(`                     it.filled_rectangle(x + 10, eventY - 5, w - 20, 2, ${color});`);
            lines.push(``);
            lines.push(`                     for (JsonVariant dayEntry : days) {`);
            lines.push(`                         if (eventY > max_y || event_count >= event_limit) break;`);
            lines.push(`                         int currentDayNum = dayEntry["day"].as<int>();`);
            lines.push(``);
            lines.push(`                         auto draw_row = [&](JsonVariant event, bool is_all_day) {`);
            lines.push(`                             if (eventY > max_y || event_count >= event_limit) return;`);
            lines.push(`                             const char* summary = event["summary"] | "No Title";`);
            lines.push(`                             const char* start = event["start"] | "";`);
            lines.push(``);
            lines.push(`                             // Draw Day Number`);
            lines.push(`                             it.printf(x + 10, eventY, id(${eventFontId}), ${color}, TextAlign::TOP_LEFT, "%d", currentDayNum);`);
            lines.push(``);
            lines.push(`                             // Draw Summary`);
            lines.push(`                             it.printf(x + 50, eventY, id(${eventFontId}), ${color}, TextAlign::TOP_LEFT, "%.25s", summary);`);
            lines.push(``);
            lines.push(`                             // Draw Time`);
            lines.push(`                             if (is_all_day) {`);
            lines.push(`                                 it.printf(x + w - 10, eventY, id(${eventFontId}), ${color}, TextAlign::TOP_RIGHT, "All Day");`);
            lines.push(`                             } else {`);
            lines.push(`                                 std::string timeStr = extract_time(start);`);
            lines.push(`                                 it.printf(x + w - 10, eventY, id(${eventFontId}), ${color}, TextAlign::TOP_RIGHT, "%s", timeStr.c_str());`);
            lines.push(`                             }`);
            lines.push(`                             eventY += ${eventFontSize + 6};`);
            lines.push(`                             event_count++;`);
            lines.push(`                         };`);
            lines.push(``);
            lines.push(`                         if (dayEntry["all_day"].is<JsonArray>()) {`);
            lines.push(`                             for (JsonVariant event : dayEntry["all_day"].as<JsonArray>()) {`);
            lines.push(`                                 draw_row(event, true);`);
            lines.push(`                             }`);
            lines.push(`                         }`);
            lines.push(`                         if (dayEntry["other"].is<JsonArray>()) {`);
            lines.push(`                             for (JsonVariant event : dayEntry["other"].as<JsonArray>()) {`);
            lines.push(`                                 draw_row(event, false);`);
            lines.push(`                             }`);
            lines.push(`                         }`);
            lines.push(`                     }`);
            lines.push(`                 }`);
            lines.push(`             } else {`);
            lines.push(`                 ESP_LOGW("calendar", "JSON Parse Error: %s", error.c_str());`);
            lines.push(`             }`);
            lines.push(`          }`);
        }


        if (borderWidth > 0) {
            if (radius > 0) {
                // Fallback to sharp borders for now as per established pattern or use primitive if available
                for (let i = 0; i < borderWidth; i++) {
                    lines.push(`            it.rectangle(x + i, y + i, w - 2 * i, h - 2 * i, ${borderColor}); `);
                }
            } else {
                for (let i = 0; i < borderWidth; i++) {
                    lines.push(`            it.rectangle(x + i, y + i, w - 2 * i, h - 2 * i, ${borderColor}); `);
                }
            }
        }

        addDitherMask(lines, colorProp, isEpaper, w.x, w.y, w.width, w.height);
        lines.push(`        }`);
        if (cond) lines.push(`        }`);
    },
    collectRequirements: (w, { addFont }) => {
        const p = w.props || {};
        const dateFontSize = Math.round(Math.min(parseInt(p.font_size_date || 100, 10) * 0.7, 80));
        const dayFontSize = parseInt(p.font_size_day || 24, 10);
        const gridFontSize = parseInt(p.font_size_grid || 14, 10);
        const eventFontSize = parseInt(p.font_size_event || 18, 10);
        const fontFamily = p.font_family || "Roboto";

        addFont(fontFamily, 100, dateFontSize);
        addFont(fontFamily, 700, dayFontSize);
        addFont(fontFamily, 400, gridFontSize);
        addFont(fontFamily, 400, eventFontSize);
        addFont("Material Design Icons", 400, 24);
    }
};
