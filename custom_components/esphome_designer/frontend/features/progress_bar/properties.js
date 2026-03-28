import { AppState } from '@core/state';

/**
 * @typedef {{
 *   id: string,
 *   title?: string,
 *   entity_id?: string,
 *   props?: Record<string, any>
 * }} ProgressBarWidget
 */

/**
 * @typedef {{
 *   createSection: (...args: any[]) => void,
 *   addLabeledInputWithPicker: (...args: any[]) => void,
 *   addLabeledInput: (...args: any[]) => void,
 *   addCheckbox: (...args: any[]) => void,
 *   addHint: (...args: any[]) => void,
 *   endSection: () => void,
  *   addCompactPropertyRow: (render: () => void) => void,
 *   addSelect: (...args: any[]) => void,
 *   addNumberWithSlider: (...args: any[]) => void,
 *   addColorSelector: (...args: any[]) => void,
 *   addDropShadowButton: (...args: any[]) => void,
 *   autoPopulateTitleFromEntity: (...args: any[]) => void,
 *   getContainer: () => HTMLElement
 * }} ProgressBarPropertyPanel
 */

/**
 * @param {ProgressBarPropertyPanel} panel
 * @param {ProgressBarWidget} widget
 */
export function renderProgressBarProperties(panel, widget) {
        const props = widget.props || {};
        /**
         * @param {string} key
         * @param {any} val
         */
        const updateProp = (key, val) => {
            const newProps = { ...widget.props, [key]: val };
            AppState.updateWidget(widget.id, { props: newProps });
        };

        panel.createSection("Data Source", true);
        panel.addLabeledInputWithPicker("Entity ID", "text", widget.entity_id || "", (/** @type {string} */ v) => {
            AppState.updateWidget(widget.id, { entity_id: v });
            if (v && !widget.title) panel.autoPopulateTitleFromEntity(widget.id, v);
        }, widget);

        panel.addLabeledInput("Label", "text", widget.title || "", (/** @type {string} */ v) => {
            AppState.updateWidget(widget.id, { title: v });
        });
        panel.addCheckbox("Local / On-Device Sensor", !!props.is_local_sensor, (/** @type {boolean} */ v) => updateProp("is_local_sensor", v));
        panel.addHint("Use internal battery_level/signal sensor.");
        panel.endSection();

        panel.createSection("Range Settings", true);
        panel.addCompactPropertyRow(() => {
            panel.addLabeledInput("Min Value", "number", props.min !== undefined ? props.min : 0, (/** @type {string} */ v) => updateProp("min", parseFloat(v)));
            panel.addLabeledInput("Max Value", "number", props.max !== undefined ? props.max : 100, (/** @type {string} */ v) => updateProp("max", parseFloat(v)));
        });
        panel.addSelect("Bar Mode", props.mode || "normal", ["normal", "symmetrical", "range"], (/** @type {string} */ v) => updateProp("mode", v));
        panel.endSection();

        panel.createSection("Appearance", true);
        panel.addSelect("Orientation", props.orientation || "horizontal", ["horizontal", "vertical"], (/** @type {string} */ v) => updateProp("orientation", v));
        panel.addNumberWithSlider("Bar Thickness", props.bar_height || 15, 4, 100, (/** @type {number} */ v) => updateProp("bar_height", v));
        panel.addColorSelector("Fill Color", props.color || "theme_auto", null, (/** @type {string} */ v) => updateProp("color", v));
        panel.addColorSelector("Background", props.bg_color || "white", null, (/** @type {string} */ v) => updateProp("bg_color", v));
        panel.addNumberWithSlider("Opacity (%)", props.opacity !== undefined ? props.opacity : (props.opa !== undefined ? Math.round(props.opa / 2.55) : 100), 0, 100, (/** @type {number} */ v) => {
            updateProp("opacity", v);
            updateProp("opa", Math.round(v * 2.55));
        });
        panel.endSection();

        panel.createSection("Labels", false);
        panel.addCheckbox("Display Title", props.show_label !== false, (/** @type {boolean} */ v) => updateProp("show_label", v));
        panel.addLabeledInput("Title", "text", widget.title || "", (/** @type {string} */ v) => {
            AppState.updateWidget(widget.id, { title: v });
        });
        panel.addCheckbox("Display Percentage", props.show_percentage !== false, (/** @type {boolean} */ v) => updateProp("show_percentage", v));
        panel.addLabeledInput("Font Size", "number", props.font_size || 12, (/** @type {string} */ v) => updateProp("font_size", parseInt(v, 10)));
        panel.addSelect("Text Align", props.text_align || "CENTER", ["LEFT", "CENTER", "RIGHT"], (/** @type {string} */ v) => updateProp("text_align", v));
        panel.endSection();

        panel.createSection("Border Style", false);
        panel.addLabeledInput("Border Width", "number", props.border_width || 1, (/** @type {string} */ v) => updateProp("border_width", parseInt(v, 10)));
        panel.addColorSelector("Border Color", props.border_color || "theme_auto", null, (/** @type {string} */ v) => updateProp("border_color", v));
        panel.addDropShadowButton(panel.getContainer(), widget.id);
        panel.endSection();
}

