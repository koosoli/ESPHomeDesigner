import { AppState } from '../state';
import { getWeightsForFont, clampFontWeight } from '../font_weights.js';

/**
 * @param {any} panel
 * @param {any} widget
 * @param {string} type
 * @param {Record<string, any>} props
 * @param {(key: string, value: any) => void} updateProp
 * @returns {boolean}
 */
export function renderLvglLegacyProperties(panel, widget, type, props, updateProp) {
    if (!(type === "lvgl_label" || type.startsWith("lvgl_"))) {
        return false;
    }
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
        
    return true;
}
