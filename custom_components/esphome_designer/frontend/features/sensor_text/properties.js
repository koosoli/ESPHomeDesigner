import { AppState } from '@core/state';
import { getWeightsForFont, clampFontWeight } from '../../js/core/font_weights.js';
import { DEVICE_PROFILES } from '../../js/io/devices.js';
import { isColorDisplay } from './shared.js';

/** @typedef {Widget & { props?: Record<string, any>, entity_id?: string, entity_id_2?: string, title?: string }} SensorTextWidget */

/**
 * @param {Record<string, any>} panel
 * @param {SensorTextWidget} widget
 */
export const renderProperties = (panel, widget) => {
    const props = widget.props || {};

    /** @param {string} key @param {unknown} val */
    const updateProp = (key, val) => {
        const newProps = { ...widget.props, [key]: val };
        AppState.updateWidget(widget.id, { props: newProps });
    };

    /** @param {string} key */
    const setTextProp = (key) => /** @param {string | number} value */ (value) => updateProp(key, String(value));
    /** @param {string} key */
    const setTrimmedTextProp = (key) => /** @param {string | number} value */ (value) => updateProp(key, String(value).trim());
    /** @param {string} key */
    const setIntProp = (key) => /** @param {string | number} value */ (value) => updateProp(key, parseInt(String(value), 10));
    /** @param {string} key */
    const setFloatProp = (key) => /** @param {string | number} value */ (value) => updateProp(key, parseFloat(String(value)));
    /** @param {string} key */
    const setBoolProp = (key) => /** @param {boolean} value */ (value) => updateProp(key, value);

    panel.createSection("Data Source", true);
    panel.addLabeledInputWithPicker("Entity ID", "text", widget.entity_id || "", (/** @type {string} */ value) => {
        AppState.updateWidget(widget.id, { entity_id: value });
        if (value && !widget.title) panel.autoPopulateTitleFromEntity(widget.id, value);
    }, widget);

    panel.addLabeledInput("Attribute (optional)", "text", props.attribute || "", setTrimmedTextProp("attribute"));
    panel.addHint("Read a specific attribute, supports nested paths (e.g. 'entries.days.0.day').");

    panel.addCheckbox("Text Sensor (string value)", !!props.is_text_sensor, setBoolProp("is_text_sensor"));
    panel.addHint("Enable if entity returns text instead of numbers.");

    panel.addCheckbox("Local / On-Device Sensor", !!props.is_local_sensor, setBoolProp("is_local_sensor"));
    panel.addHint("Use internal battery_level/signal sensor.");

    panel.addLabeledInputWithPicker("Secondary Entity ID", "text", widget.entity_id_2 || "", (/** @type {string} */ value) => {
        AppState.updateWidget(widget.id, { entity_id_2: value });
    }, widget);
    panel.addLabeledInput("Secondary Attribute", "text", props.attribute2 || "", setTrimmedTextProp("attribute2"));
    panel.addHint("Optional attribute for the secondary entity.");

    panel.addLabeledInput("Title/Label", "text", widget.title || "", (/** @type {string} */ value) => {
        AppState.updateWidget(widget.id, { title: value });
    });
    panel.endSection();

    panel.createSection("Format", false);
    panel.addSelect("Display Format", props.value_format || "label_value", [
        { value: "label_value", label: "Label: Value & Unit" },
        { value: "label_value_no_unit", label: "Label: Value Only" },
        { value: "label_newline_value", label: "Label [newline] Value & Unit" },
        { value: "label_newline_value_no_unit", label: "Label [newline] Value Only" },
        { value: "value_only", label: "Value & Unit" },
        { value: "value_only_no_unit", label: "Value Only" }
    ], setTextProp("value_format"));
    panel.addLabeledInput("Precision", "number", props.precision !== undefined ? props.precision : 2, setIntProp("precision"));
    panel.addLabeledInputWithDataList("Prefix", "text", props.prefix || "", ["â‚¬", "$", "Â£", "Â¥", "CHF", "kr"], setTextProp("prefix"));
    panel.addLabeledInputWithDataList("Postfix", "text", props.postfix || "", [" kWh", " W", " V", " A", " Â°C", " %", " ppm", " lx"], setTextProp("postfix"));
    panel.addLabeledInput("Unit (Manual helper)", "text", props.unit || "", setTextProp("unit"));
    panel.addCheckbox("Hide default unit", !!props.hide_unit, setBoolProp("hide_unit"));
    panel.endSection();

    panel.createSection("Appearance", true);
    panel.addNumberWithSlider("Opacity (%)", props.opacity !== undefined ? props.opacity : 100, 0, 100, setIntProp("opacity"));
    panel.addCompactPropertyRow(() => {
        panel.addLabeledInput("Label Size", "number", props.label_font_size || 14, setIntProp("label_font_size"));
        panel.addLabeledInput("Value Size", "number", props.value_font_size || 20, setIntProp("value_font_size"));
    });
    panel.addColorSelector("Color", props.color || "theme_auto", null, setTextProp("color"));

    const fontOptions = ["Roboto", "Inter", "Open Sans", "Lato", "Montserrat", "Poppins", "Raleway", "Roboto Mono", "Ubuntu", "Nunito", "Playfair Display", "Merriweather", "Work Sans", "Source Sans Pro", "Quicksand", "Custom..."];
    const currentFont = props.font_family || "Roboto";
    const isCustom = !fontOptions.slice(0, -1).includes(currentFont);
    panel.addSelect("Font", isCustom ? "Custom..." : currentFont, fontOptions, (/** @type {string} */ value) => {
        const newProps = { ...widget.props };
        if (value !== "Custom...") {
            newProps.font_family = value;
            newProps.custom_font_family = "";
            newProps.font_weight = clampFontWeight(value, newProps.font_weight || 400);
        } else {
            newProps.font_family = "Custom...";
        }
        AppState.updateWidget(widget.id, { props: newProps });
    });
    if (isCustom || props.font_family === "Custom...") {
        panel.addLabeledInput("Custom Font Name", "text", props.custom_font_family || (isCustom ? currentFont : ""), (/** @type {string} */ value) => {
            const newProps = { ...widget.props };
            newProps.font_family = value || "Roboto";
            newProps.custom_font_family = value;
            newProps.font_weight = clampFontWeight(newProps.font_family, newProps.font_weight || 400);
            AppState.updateWidget(widget.id, { props: newProps });
        });
        panel.addHint('Browse <a href="https://fonts.google.com" target="_blank">fonts.google.com</a>');
    }

    const validWeights = getWeightsForFont(props.font_family || "Roboto");
    panel.addSelect("Weight", props.font_weight || 400, validWeights, setIntProp("font_weight"));
    panel.addCheckbox("Italic", !!props.italic, setBoolProp("italic"));
    panel.addSelect("Align", props.text_align || "TOP_LEFT", ["TOP_LEFT", "TOP_CENTER", "TOP_RIGHT", "CENTER_LEFT", "CENTER", "CENTER_RIGHT", "BOTTOM_LEFT", "BOTTOM_CENTER", "BOTTOM_RIGHT"], (/** @type {string} */ value) => {
        updateProp("text_align", value);
        updateProp("label_align", value);
        updateProp("value_align", value);
    });
    panel.addCheckbox("Parse Color Tags", !!props.parse_colors, setBoolProp("parse_colors"));
    panel.addHint("Enable to use [color]text[/color] markup, also supports HA templates.");
    panel.endSection();

    const deviceProfiles = /** @type {Record<string, any>} */ (DEVICE_PROFILES);
    const uiProfile = deviceProfiles[String(AppState?.deviceModel || "")];
    if (!props.is_text_sensor && isColorDisplay(uiProfile)) {
        panel.createSection("Dynamic Color", false);
        panel.addCheckbox("Enable Dynamic Color", !!props.dynamic_color_enabled, setBoolProp("dynamic_color_enabled"));
        if (props.dynamic_color_enabled) {
            panel.addColorSelector("Color Low", props.dynamic_color_low || "#3498db", null, setTextProp("dynamic_color_low"));
            panel.addLabeledInput("Value Low", "number", props.dynamic_value_low !== undefined ? props.dynamic_value_low : 0, setFloatProp("dynamic_value_low"));
            panel.addColorSelector("Color High", props.dynamic_color_high || "#e74c3c", null, setTextProp("dynamic_color_high"));
            panel.addLabeledInput("Value High", "number", props.dynamic_value_high !== undefined ? props.dynamic_value_high : 100, setFloatProp("dynamic_value_high"));
            panel.addHint("Text color interpolates linearly between Color Low and Color High based on the sensor's numeric value.");
        }
        panel.endSection();
    }

    panel.createSection("Border Style", false);
    panel.addLabeledInput("Border Width", "number", props.border_width || 0, setIntProp("border_width"));
    panel.addColorSelector("Border Color", props.border_color || "theme_auto", null, setTextProp("border_color"));
    panel.addLabeledInput("Corner Radius", "number", props.border_radius || 0, setIntProp("border_radius"));
    panel.addColorSelector("Background", props.bg_color || "transparent", null, setTextProp("bg_color"));
    panel.addDropShadowButton(panel.getContainer(), widget.id);
    panel.endSection();

    panel.createSection("Advanced", false);
    panel.addLabeledInput("BPP / Antialias", "number", props.bpp || 1, setIntProp("bpp"));
    panel.endSection();
};
