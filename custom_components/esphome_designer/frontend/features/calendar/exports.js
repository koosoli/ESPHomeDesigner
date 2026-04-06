import { clampFontWeight } from '@core/font_weights.js';
import { getCalendarEventSummaryCharLimit } from './layout.js';

export const onExportTextSensors = (context) => {
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
        const maxEntries = (primaryWidget.props && (primaryWidget.props.max_events || primaryWidget.props.event_limit))
            ? (primaryWidget.props.max_events || primaryWidget.props.event_limit)
            : 8;

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
        lines.push(`#           nr_entries: ${maxEntries}`);
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
    };

export const exportLVGL = (w, { common, convertColor, getLVGLFont }) => {
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
    };

export const exportDirect = (w, context) => {
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
        const radius = Math.max(0, Math.min(
            parseInt(p.border_radius || 0, 10) || 0,
            Math.floor(w.width / 2),
            Math.floor(w.height / 2)
        ));

        const dateFontSize = Math.round(Math.min(parseInt(p.font_size_date || 100, 10) * 0.7, 80));
        const dayFontSize = parseInt(p.font_size_day || 24, 10);
        const gridFontSize = parseInt(p.font_size_grid || 14, 10);
        const eventFontSize = parseInt(p.font_size_event || 18, 10);
        const eventSummaryCharLimit = getCalendarEventSummaryCharLimit(w.width, eventFontSize);
        const fontFamily = p.font_family || "Roboto";

        const getW = (key, def) => {
            if (p[key] !== undefined) return clampFontWeight(fontFamily, p[key]);
            if (key === "font_weight_dates" && p.bold_dates !== undefined) return p.bold_dates ? 700 : 400;
            return def;
        };

        const wHeaderDate = getW("font_weight_header_date", 100);
        const wHeaderDay = getW("font_weight_header_day", 700);
        const wMonth = getW("font_weight_month", 400);
        const wGridHeader = getW("font_weight_grid_header", 700);
        const wDates = getW("font_weight_dates", 700);
        const wEvents = getW("font_weight_events", 400);

        const fontHeaderDateId = addFont(fontFamily, wHeaderDate, dateFontSize);
        const fontHeaderDayId = addFont(fontFamily, wHeaderDay, dayFontSize);
        const fontMonthId = addFont(fontFamily, wMonth, gridFontSize);
        const fontGridHeaderId = addFont(fontFamily, wGridHeader, gridFontSize);
        const fontGridDatesId = addFont(fontFamily, wDates, gridFontSize);
        const fontEventId = addFont(fontFamily, wEvents, eventFontSize);


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
            lines.push(`          it.strftime(x + w/2, y + 2, id(${fontHeaderDateId}), ${color}, TextAlign::TOP_CENTER, "%d", now);`);
            lines.push(`          it.strftime(x + w/2, y + ${dateFontSize + 6}, id(${fontHeaderDayId}), ${color}, TextAlign::TOP_CENTER, "%A", now);`);
            lines.push(`          it.strftime(x + w/2, y + ${dateFontSize + dayFontSize + 10}, id(${fontMonthId}), ${color}, TextAlign::TOP_CENTER, "%B %Y", now);`);
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
            lines.push(`            it.print(x + i*cellW + cellW/2, gridY, id(${fontGridHeaderId}), ${color}, TextAlign::TOP_CENTER, days[i]);`);
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
            lines.push(`               it.printf(x + c*cellW + cellW/2, gridY + r*rowH, id(${fontGridDatesId}), ${bgColorProp === "transparent" ? (colorProp.includes('black') || colorProp.includes('000000') ? "Color::WHITE" : "Color::BLACK") : bgColor}, TextAlign::TOP_CENTER, "%d", d);`);
            lines.push(`            } else {`);
            lines.push(`               it.printf(x + c*cellW + cellW/2, gridY + r*rowH, id(${fontGridDatesId}), ${color}, TextAlign::TOP_CENTER, "%d", d);`);
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
            lines.push(`                             it.printf(x + 10, eventY, id(${fontEventId}), ${color}, TextAlign::TOP_LEFT, "%d", currentDayNum);`);
            lines.push(``);
            lines.push(`                             // Draw Summary`);
            lines.push(`                             it.printf(x + 50, eventY, id(${fontEventId}), ${color}, TextAlign::TOP_LEFT, "%.${eventSummaryCharLimit}s", summary);`);
            lines.push(``);
            lines.push(`                             // Draw Time`);
            lines.push(`                             if (is_all_day) {`);
            lines.push(`                                 it.printf(x + w - 10, eventY, id(${fontEventId}), ${color}, TextAlign::TOP_RIGHT, "All Day");`);
            lines.push(`                             } else {`);
            lines.push(`                                 std::string timeStr = extract_time(start);`);
            lines.push(`                                 it.printf(x + w - 10, eventY, id(${fontEventId}), ${color}, TextAlign::TOP_RIGHT, "%s", timeStr.c_str());`);
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
                lines.push("          auto draw_rrect_border = [&](int x, int y, int w, int h, int r, int t, auto c) {");
                lines.push("            int inner_r = r - t;");
                lines.push("            if (inner_r < 0) inner_r = 0;");
                lines.push("            it.filled_rectangle(x + r, y, w - 2 * r, t, c);");
                lines.push("            it.filled_rectangle(x + r, y + h - t, w - 2 * r, t, c);");
                lines.push("            it.filled_rectangle(x, y + r, t, h - 2 * r, c);");
                lines.push("            it.filled_rectangle(x + w - t, y + r, t, h - 2 * r, c);");
                lines.push("            for (int dx = 0; dx <= r; dx++) {");
                lines.push("              for (int dy = 0; dy <= r; dy++) {");
                lines.push("                int ds = dx*dx + dy*dy;");
                lines.push("                if (ds <= r*r && ds > inner_r*inner_r) {");
                lines.push("                  it.draw_pixel_at(x + r - dx, y + r - dy, c);");
                lines.push("                  it.draw_pixel_at(x + w - r + dx - 1, y + r - dy, c);");
                lines.push("                  it.draw_pixel_at(x + r - dx, y + h - r + dy - 1, c);");
                lines.push("                  it.draw_pixel_at(x + w - r + dx - 1, y + h - r + dy - 1, c);");
                lines.push("                }");
                lines.push("              }");
                lines.push("            }");
                lines.push("          };");
                lines.push(`          draw_rrect_border(${w.x}, ${w.y}, ${w.width}, ${w.height}, ${radius}, ${borderWidth}, ${borderColor});`);
            } else {
                for (let i = 0; i < borderWidth; i++) {
                    lines.push(`            it.rectangle(${w.x} + ${i}, ${w.y} + ${i}, ${w.width} - ${2 * i}, ${w.height} - ${2 * i}, ${borderColor});`);
                }
            }
        }

        addDitherMask(lines, colorProp, isEpaper, w.x, w.y, w.width, w.height);
        lines.push(`        }`);
        if (cond) lines.push(`        }`);
    };

export const collectRequirements = (w, { addFont }) => {
        const p = w.props || {};
        const dateFontSize = Math.round(Math.min(parseInt(p.font_size_date || 100, 10) * 0.7, 80));
        const dayFontSize = parseInt(p.font_size_day || 24, 10);
        const gridFontSize = parseInt(p.font_size_grid || 14, 10);
        const eventFontSize = parseInt(p.font_size_event || 18, 10);
        const fontFamily = p.font_family || "Roboto";

        const getW = (key, def) => {
            if (p[key] !== undefined) return clampFontWeight(fontFamily, p[key]);
            if (key === "font_weight_dates" && p.bold_dates !== undefined) return p.bold_dates ? 700 : 400;
            return def;
        };

        addFont(fontFamily, getW("font_weight_header_date", 100), dateFontSize);
        addFont(fontFamily, getW("font_weight_header_day", 700), dayFontSize);
        addFont(fontFamily, getW("font_weight_month", 400), gridFontSize);
        addFont(fontFamily, getW("font_weight_grid_header", 700), gridFontSize);
        addFont(fontFamily, getW("font_weight_dates", 700), gridFontSize);
        addFont(fontFamily, getW("font_weight_events", 400), eventFontSize);
        addFont("Material Design Icons", 400, 24);
    };
