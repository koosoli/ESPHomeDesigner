import { AppState } from '@core/state';

/**
 * @typedef {{
 *   id: string,
 *   entity_id?: string,
 *   props?: Record<string, any>
 * }} WifiSignalWidget
 */

/**
 * @typedef {{
 *   createSection: (...args: any[]) => void,
 *   addLabeledInputWithPicker: (...args: any[]) => void,
 *   addCheckbox: (...args: any[]) => void,
 *   addHint: (...args: any[]) => void,
 *   addLabeledInput: (...args: any[]) => void,
 *   addColorSelector: (...args: any[]) => void,
 *   addDropShadowButton: (...args: any[]) => void,
 *   endSection: () => void,
 *   getContainer: () => HTMLElement
 * }} WifiSignalPropertyPanel
 */

/**
 * @param {WifiSignalPropertyPanel} panel
 * @param {WifiSignalWidget} widget
 */
export function renderWifiSignalProperties(panel, widget) {
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
        panel.addLabeledInputWithPicker("WiFi Signal Entity ID", "text", widget.entity_id || "", (/** @type {string} */ v) => {
            AppState.updateWidget(widget.id, { entity_id: v });
        }, widget);
        panel.addCheckbox("Local / On-Device Sensor", props.is_local_sensor !== false, (/** @type {boolean} */ v) => updateProp("is_local_sensor", v));
        panel.addHint("Use internal battery_level/signal sensor.");
        panel.endSection();

        panel.createSection("Appearance", true);
        panel.addCheckbox("Show dBm value", props.show_dbm !== false, (/** @type {boolean} */ v) => updateProp("show_dbm", v));
        panel.addCheckbox("Fit icon to frame", !!props.fit_icon_to_frame, (/** @type {boolean} */ v) => updateProp("fit_icon_to_frame", v));
        panel.addLabeledInput("Icon Size (px)", "number", props.size || 24, (/** @type {string} */ v) => {
            let n = parseInt(v || "24", 10);
            updateProp("size", isNaN(n) ? 24 : n);
        });
        panel.addLabeledInput("dBm Font Size (px)", "number", props.font_size || 12, (/** @type {string} */ v) => {
            let n = parseInt(v || "12", 10);
            updateProp("font_size", isNaN(n) ? 12 : n);
        });
        panel.addColorSelector("Color", props.color || "theme_auto", null, (/** @type {string} */ v) => updateProp("color", v));
        panel.endSection();

        panel.createSection("Border Style", false);
        panel.addLabeledInput("Border Width", "number", props.border_width || 0, (/** @type {string} */ v) => updateProp("border_width", parseInt(v, 10)));
        panel.addColorSelector("Border Color", props.border_color || "theme_auto", null, (/** @type {string} */ v) => updateProp("border_color", v));
        panel.addLabeledInput("Corner Radius", "number", props.border_radius || 0, (/** @type {string} */ v) => updateProp("border_radius", parseInt(v, 10)));
        panel.addDropShadowButton(panel.getContainer(), widget.id);
        panel.endSection();
}

