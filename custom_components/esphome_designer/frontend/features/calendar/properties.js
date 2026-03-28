import { getWeightsForFont, clampFontWeight } from '@core/font_weights.js';
import { CALENDAR_HELPER_SCRIPT } from '@core/properties/calendar_python_template.js';
import { AppState } from '@core/state';

export const renderProperties = (panel, widget) => {
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
            const maxEntries = props.max_events || 8;
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
          nr_entries: ${maxEntries}
        response_variable: output
    sensor:
      - name: ESP Calendar Data
        unique_id: esp_calendar_data
        state: "OK"
        attributes:
          entries: "{{ output.entries }}"
          closest_end_time: "{{ output.closest_end_time }}"
`;
            const textToCopy = yaml.trim();
            const originalText = "YAML";

            const setSuccessState = () => {
                copyBtn.textContent = "Copied";
                setTimeout(() => { copyBtn.textContent = originalText; }, 2000);
            };

            const setErrorState = () => {
                copyBtn.textContent = "Error";
                setTimeout(() => { copyBtn.textContent = originalText; }, 2000);
            };

            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(textToCopy).then(setSuccessState).catch(setErrorState);
            } else {
                const textarea = document.createElement("textarea");
                textarea.value = textToCopy;
                textarea.style.position = "fixed";
                textarea.style.left = "-999999px";
                textarea.style.top = "-999999px";
                document.body.appendChild(textarea);
                textarea.focus();
                textarea.select();
                try {
                    if (document.execCommand("copy")) {
                        setSuccessState();
                    } else {
                        setErrorState();
                    }
                } catch {
                    setErrorState();
                }
                document.body.removeChild(textarea);
            }
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

        const fontFam = props.font_family || "Roboto";
        const availableWeights = getWeightsForFont(fontFam);

        const addWeightSelect = (label, propKey, defaultVal) => {
            let val = props[propKey] !== undefined ? props[propKey] : defaultVal;
            val = clampFontWeight(fontFam, val);
            panel.addSelect(label, val, availableWeights, (v) => updateProp(propKey, parseInt(v, 10)));
        };

        addWeightSelect("Header Date Weight", "font_weight_header_date", 100);
        addWeightSelect("Header Day Weight", "font_weight_header_day", 700);
        addWeightSelect("Month Weight", "font_weight_month", 400);
        addWeightSelect("Grid Header Weight", "font_weight_grid_header", 700);
        addWeightSelect("Dates Weight", "font_weight_dates", 700);
        addWeightSelect("Events Weight", "font_weight_events", 400);

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
    };
