/**
 * Graph Plugin
 */
import { AppState } from '@core/state';
import { render } from './render.js';
import {
    exportLVGL,
    exportDoc,
    onExportComponents,
    onExportEsphome,
    onExportGlobals,
    onExportNumericSensors,
    onExportTextSensors
} from './exports.js';

/** @typedef {Widget & { props?: Record<string, any>, entity_id?: string, title?: string }} GraphWidget */

/**
 * @param {Record<string, any>} panel
 * @param {GraphWidget} widget
 */
const renderProperties = (panel, widget) => {
    const props = widget.props || {};

    /** @param {string} key @param {unknown} val */
    const updateProp = (key, val) => {
        const newProps = { ...widget.props, [key]: val };
        AppState.updateWidget(widget.id, { props: newProps });
    };

    /** @param {string} key */
    const setTextProp = (key) => /** @param {string | number} value */ (value) => updateProp(key, String(value));
    /** @param {string} key */
    const setIntProp = (key) => /** @param {string | number} value */ (value) => updateProp(key, parseInt(String(value), 10));
    /** @param {string} key */
    const setBoolProp = (key) => /** @param {boolean} value */ (value) => updateProp(key, value);

    panel.createSection("Data Source", true);
    panel.addLabeledInputWithPicker("Entity ID", "text", widget.entity_id || "", (/** @type {string} */ value) => {
        AppState.updateWidget(widget.id, { entity_id: value });
    }, widget);

    panel.addCheckbox("Is Local Sensor", !!props.is_local_sensor, setBoolProp("is_local_sensor"));
    panel.addLabeledInput("Title", "text", widget.title || "", (/** @type {string} */ value) => {
        AppState.updateWidget(widget.id, { title: value });
    });
    panel.addLabeledInput("Duration", "text", props.duration || "1h", setTextProp("duration"));
    panel.addHint("The device collects data from boot. The graph fills up over the configured duration.");
    panel.endSection();

    panel.createSection("Advanced: HA History Attribute", false);
    panel.addCheckbox("Read History from HA Attribute", !!props.use_ha_history, setBoolProp("use_ha_history"));
    if (props.use_ha_history) {
        panel.addLabeledInput("HA Attribute", "text", props.history_attribute || "history", setTextProp("history_attribute"));
        panel.addLabeledInput("Points to keep", "number", props.history_points || 100, setIntProp("history_points"));
        panel.addCheckbox("Smooth Data (Moving Avg)", !!props.history_smoothing, setBoolProp("history_smoothing"));
        panel.addHint('Warning: <span style="color:orange">Requires a custom HA template sensor that exposes history as a JSON array attribute.</span> Standard HA entities do not have this attribute by default.');
    }
    panel.endSection();

    panel.createSection("Appearance", true);
    panel.addCheckbox("Auto-scale Y Axis", props.auto_scale !== false, setBoolProp("auto_scale"));

    panel.addCompactPropertyRow(() => {
        const isAuto = props.auto_scale !== false;
        panel.addLabeledInput(isAuto ? "Min (Override)" : "Min Value", "number", props.min_value !== undefined ? props.min_value : "", setTextProp("min_value"));
        panel.addLabeledInput(isAuto ? "Max (Override)" : "Max Value", "number", props.max_value !== undefined ? props.max_value : "", setTextProp("max_value"));
    });

    if (props.auto_scale !== false) {
        panel.addLabeledInput("Min Range", "number", props.min_range || "10", setTextProp("min_range"));
        panel.addHint("Min/Max inputs override auto-scaling for that bound. Min Range ensures minimum spread.");
    } else {
        panel.addHint("Fixed Y-axis bounds.");
    }
    panel.addCompactPropertyRow(() => {
        panel.addLabeledInput("Max Range", "number", props.max_range || "", setTextProp("max_range"));
        panel.addNumberWithSlider("Opacity (%)", props.opacity !== undefined ? props.opacity : 100, 0, 100, setIntProp("opacity"));
    });

    panel.addColorSelector("Line Color", props.color || "theme_auto", null, setTextProp("color"));
    panel.addSelect("Line Type", props.line_type || "SOLID", ["SOLID", "DASHED", "DOTTED"], setTextProp("line_type"));
    panel.addLabeledInput("Line Thickness", "number", props.line_thickness || 3, setIntProp("line_thickness"));
    panel.addCheckbox("Continuous Line", props.continuous !== false, setBoolProp("continuous"));
    panel.addColorSelector("Background", props.background_color || "transparent", null, setTextProp("background_color"));
    panel.endSection();

    panel.createSection("Grid Style", false);
    panel.addCheckbox("Show Grid", props.grid !== false, setBoolProp("grid"));
    panel.addLabeledInput("X Grid Interval", "text", props.x_grid || "", setTextProp("x_grid"));
    panel.addLabeledInput("Y Grid Step", "number", props.y_grid || "", setTextProp("y_grid"));
    panel.addHint("e.g. 1h for X, or 10.0 for Y. Leave empty for auto-grid.");
    panel.endSection();

    panel.createSection("Border Style", false);
    panel.addLabeledInput("Border Width", "number", props.border_width !== undefined ? props.border_width : (props.border !== false ? 2 : 0), setIntProp("border_width"));
    panel.addColorSelector("Border Color", props.border_color || "theme_auto", null, setTextProp("border_color"));
    panel.addLabeledInput("Corner Radius", "number", props.border_radius || 0, setIntProp("border_radius"));
    panel.addDropShadowButton(panel.getContainer(), widget.id);
    panel.endSection();
};

export default {
    id: "graph",
    name: "Graph / Chart",
    category: "Advanced",
    // CRITICAL ARCHITECTURAL NOTE: OEPL and OpenDisplay are excluded because this widget
    // requires significant C++ logic/global arrays which are not yet supported
    // in those modes.
    supportedModes: ['lvgl', 'direct'],
    defaults: {
        width: 205,
        height: 100,
        duration: "1h",
        entity_id: "",
        border: true,
        grid: true,
        color: "theme_auto",
        background_color: "transparent",
        title: "",
        x_grid: "",
        y_grid: "",
        line_thickness: 3,
        line_type: "SOLID",
        continuous: true,
        min_value: "",
        max_value: "",
        is_local_sensor: false,
        opa: 255
    },
    renderProperties,
    render,
    exportLVGL,
    export: exportDoc,
    onExportComponents,
    onExportNumericSensors,
    onExportGlobals,
    onExportEsphome,
    onExportTextSensors
};
