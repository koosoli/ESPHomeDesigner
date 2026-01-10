export function generateSnippet(widget, pages, deviceModel) {
    const id = widget.id;
    const x = widget.x;
    const y = widget.y;
    const w = widget.w;
    const h = widget.h;

    // We need to fetch data from HA, so we assume the user has set up the python script.
    // The reference project uses a text_sensor to pull the JSON string.

    // Check if we need to add the common components (only once per device ideally, but simple "if not exists" checks in ESPHome help, 
    // or we rely on the main generator to handle common "time" etc. 
    // However, for this specific widget, we need specific sensors.)

    // We will namespace the sensors with the widget ID or a common name if we assume one calendar. 
    // Let's use the widget ID to allow multiple (though heavy).

    // Note: The reference implementation relies on `id(calendar_json).state`.

    const calendarDataEntity = widget.properties.entity_id || "sensor.esp_calendar_data";

    // Instructions for the user
    const userInstructions = `
# --------------------------------------------------------------------------------------
# [Calendar Widget Setup Instructions]
# 1. Copy 'esp_calendar_data_conversion.py' to your HA 'python_scripts/' folder.
# 2. Add the following to your HA configuration.yaml:
#
# template:
#   - trigger:
#       - platform: time_pattern
#         minutes: "*"
#     action:
#       - service: calendar.get_events
#         data:
#           duration:
#             days: 28
#         target:
#           entity_id:
#             - calendar.YOUR_CALENDAR_HERE
#         response_variable: calendar_response
#       - service: python_script.esp_calendar_data_conversion
#         data:
#           calendar: "{{ calendar_response }}"
#           now: "{{ now().date() }}"
#         response_variable: calendar_converted
#     sensor:
#       - name: ESP Calendar Data
#         state: "OK"
#         attributes:
#           todays_day_name: >
#             {{ ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'][now().weekday()] }}
#           todays_date_month_year: >
#             {% set months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"] %}
#             {{ months[now().month-1] }} {{  now().strftime('%Y') }}
#           entries: "{{ calendar_converted.entries }}"
# --------------------------------------------------------------------------------------
`;

    // Sensors needed by the lambda
    const sensors = `
text_sensor:
  - platform: homeassistant
    entity_id: ${calendarDataEntity}
    attribute: entries
    id: calendar_json_${id}
    internal: true
  - platform: homeassistant
    entity_id: ${calendarDataEntity}
    attribute: todays_day_name
    id: todays_day_name_${id}
    internal: true
  - platform: homeassistant
    entity_id: ${calendarDataEntity}
    attribute: todays_date_month_year
    id: todays_date_month_year_${id}
    internal: true
`;

    // Common includes for the lambda
    // We need to inline the C++ helper functions since we can't easily distribute .h files.
    // Logic adapted from reference 'calendar_utilities.h' and 'text_utilities.h'

    const lambdaHelpers = `
    // --- Calendar Helpers (Inlined) ---
    auto is_leap_year = [](int year) -> int {
        return (year % 4 == 0 && year % 100 != 0) || (year % 400 == 0);
    };

    auto get_calendar_matrix = [&](int year, int month, char cal[7][7][3]) {
        int days_in_month[] = {31, 28 + is_leap_year(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
        int num_days = days_in_month[month - 1];
        
        if (month < 3) {
            month = month + 12;
            year = year - 1;
        }
        int day_of_week = (1 + (13 * (month + 1)) / 5 + year + year / 4 - year / 100 + year / 400) % 7;
        day_of_week = (day_of_week + 5) % 7;
        
        const char *weekdays[] = {"Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"};
        for (int i = 0; i < 7; i++) {
            strcpy(cal[0][i], weekdays[i]);
        }
        
        int current_day = 1 - day_of_week;
        for (int week_num = 1; week_num < 7; week_num++) {
            for (int day_num = 0; day_num < 7; day_num++) {
                if (current_day > 0 && current_day <= num_days) {
                    sprintf(cal[week_num][day_num], "%d", current_day);
                } else {
                    strcpy(cal[week_num][day_num], "");
                }
                current_day++;
            }
        }
    };
    
    auto extract_time = [](const char* datetime) -> std::string {
        std::string datetimeStr(datetime);
        size_t pos = datetimeStr.find('T');
        if (pos != std::string::npos && pos + 3 < datetimeStr.size()) {
            return datetimeStr.substr(pos + 1, 5);
        }
        return "";
    };
    
    // --- End Helpers ---
    `;

    // Main drawing lambda
    const lambda = `
      // --- Calendar Widget (${id}) ---
      // Bounds: x=${x}, y=${y}, w=${w}, h=${h}
      {
          ${lambdaHelpers}
          
          auto time = id(current_time_id).now(); // Assumes current_time_id is available globally in the main generator or we need to find it.
          // Fallback if global id not known:
          // auto time = id(homeassistant_time).now(); 
          
          // Background
          it.filled_rectangle(${x}, ${y}, ${w}, ${h}, id(color_white)); // Assuming color_white/black exists
          
          // Header
          // We need font IDs. Assuming standard ones extracted from properties or globals.
          // For now using specific ones from the reference or approximating.
          
          /* 
             NOTE: This lambda is quite complex and relies on specific fonts being available.
             The generator should ideally ensure these fonts are added to 'font:' section.
             We will assume standard Roboto fonts are available.
          */
          
          auto color_content = id(color_black);
          auto color_background = id(color_white);
          
          // Calculate layout relative to ${x}, ${y}
          
          int cx = ${x} + (${w} / 2);
          
          // Date
          it.printf(cx, ${y} + 0, id(font_roboto_100), color_content, TextAlign::TOP_CENTER, "%d", time.day_of_month);
          it.printf(cx, ${y} + 70, id(font_roboto_24), color_content, TextAlign::TOP_CENTER, "%s", id(todays_day_name_${id}).state.c_str());
          it.printf(cx, ${y} + 92, id(font_roboto_14), color_content, TextAlign::TOP_CENTER, "%s", id(todays_date_month_year_${id}).state.c_str());
          
          // Calendar Grid
          int calendar_y_pos = ${y} + 115;
          
          // 2. Mock-ish Calendar Rendering for ESPHome (simplified from reference)
          char cal[7][7][3];
          get_calendar_matrix(time.year, time.month, cal);
          
          int cell_width = (${w} - 40) / 7;
          int cell_height = 17;
          int start_x = ${x} + 20;
          
          for (int i = 0; i < 7; i++) {
              for (int j = 0; j < 7; j++) {
                  int px = start_x + (j * cell_width) + (cell_width / 2);
                  int py = calendar_y_pos + (i * cell_height);
                  
                  if (i == 0) {
                      it.printf(px, py, id(font_roboto_14), color_content, TextAlign::TOP_CENTER, "%s", cal[i][j]);
                  } else {
                      // Day Num
                      if (atoi(cal[i][j]) == time.day_of_month) {
                           it.filled_circle(px, py + 12, 10, color_content);
                           it.printf(px, py + 5, id(font_roboto_14), color_background, TextAlign::TOP_CENTER, "%s", cal[i][j]);
                      } else {
                           it.printf(px, py + 5, id(font_roboto_14), color_content, TextAlign::TOP_CENTER, "%s", cal[i][j]);
                      }
                  }
              }
          }
          it.line(start_x, calendar_y_pos + cell_height, ${x} + ${w} - 20, calendar_y_pos + cell_height, color_content);
          
          // 3. Events List from JSON
          // Requires built-in JSON support in ESPHome (json component)
          // Data source: id(calendar_json_${id}).state
          
           // Robust Manual Parsing for Mixed Types (Array/Object)
           ESP_LOGD("calendar", "Raw JSON: %s", id(calendar_json_${id}).state.c_str());
           if (id(calendar_json_${id}).state.length() > 5 && id(calendar_json_${id}).state != "unknown") {
              StaticJsonDocument<2048> doc;
              DeserializationError error = deserializeJson(doc, id(calendar_json_${id}).state);

              if (!error) {
                  JsonVariant root = doc.as<JsonVariant>();
                  JsonArray days;

                  if (root.is<JsonObject>() && root["days"].is<JsonArray>()) {
                      days = root["days"];
                  } else if (root.is<JsonArray>()) {
                      days = root;
                  } else {
                      ESP_LOGW("calendar", "Invalid JSON structure: neither object with 'days' nor array");
                      return;
                  }

                  if (days.isNull() || days.size() == 0) {
                       ESP_LOGD("calendar", "No days found in JSON");
                       return; 
                  }
                  ESP_LOGD("calendar", "Processing %d days", days.size());

                  int y_cursor = calendar_y_pos + (7 * cell_height) + 10;
                  int max_y = ${y} + ${h} - 5;

                  // Safety: Ensure we have enough space for at least one event
                  if (y_cursor >= max_y) { ESP_LOGW("calendar", "Widget too small for events"); return; }

                  it.filled_rectangle(${x} + 20, y_cursor - 5, ${w} - 40, 2, color_content);

                  for (JsonVariant dayEntry : days) {
                      if (y_cursor > max_y) break;
                      int currentDayNum = dayEntry["day"].as<int>();

                      auto draw_row = [&](JsonVariant event, bool is_all_day) {
                          if (y_cursor > max_y) return;
                          const char* summary = event["summary"] | "No Title";
                          const char* start = event["start"] | "";

                          it.printf(${x} + 20, y_cursor, id(font_event_day), color_content, TextAlign::TOP_LEFT, "%d", currentDayNum);
                          it.printf(${x} + 60, y_cursor + 4, id(font_event), color_content, TextAlign::TOP_LEFT, "%.25s", summary);

                          if (is_all_day) {
                              it.printf(${x} + ${w} - 20, y_cursor + 4, id(font_event), color_content, TextAlign::TOP_RIGHT, "All Day");
                          } else {
                              std::string timeStr = extract_time(start);
                              it.printf(${x} + ${w} - 20, y_cursor + 4, id(font_event), color_content, TextAlign::TOP_RIGHT, "%s", timeStr.c_str());
                          }
                          y_cursor += 25;
                      };

                      if (dayEntry["all_day"].is<JsonArray>()) {
                          for (JsonVariant event : dayEntry["all_day"].as<JsonArray>()) {
                              draw_row(event, true);
                              if (y_cursor > max_y) break;
                          }
                      }
                      if (dayEntry["other"].is<JsonArray>()) {
                          for (JsonVariant event : dayEntry["other"].as<JsonArray>()) {
                              draw_row(event, false);
                              if (y_cursor > max_y) break;
                          }
                      }
                  }
              } else {
                   ESP_LOGW("calendar", "JSON Parse Error: %s", error.c_str());
              }
           }
      }
    `;

    return {
        sensors: sensors,
        lambda: lambda,
        instructions: userInstructions
    };
}
