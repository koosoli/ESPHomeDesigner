import { AppState } from '../state';
import { getAvailableColors } from '../../utils/device.js';
import { MIXED_VALUE } from '../../utils/color_utils.js';

export class MultiSelectRenderer {
    /**
     * Renders properties for multiple selected widgets.
        * @param {any} panel - The main properties panel instance.
     * @param {Array<string>} ids - The IDs of the selected widgets.
     */
    static render(panel, ids) {
        const widgets = ids.map(id => AppState.getWidgetById(id)).filter(w => !!w);
        if (widgets.length === 0) return;

        console.log(`[MultiSelectRenderer] Rendering ${widgets.length} widgets. Display keys detection starting...`);

        panel.panel.innerHTML = "";
        panel.createSection(`${widgets.length} Widgets Selected`, true);

        // --- Transform Section ---
        panel.createSection("Transform", true);

        const getCommonVal = (key) => {
            const first = widgets[0][key];
            return widgets.every(w => w[key] === first) ? first : MIXED_VALUE;
        };

        const updateWidgets = (key, val) => {
            AppState.updateWidgets(ids, { [key]: val });
        };

        panel.addCompactPropertyRow(() => {
            panel.addLabeledInput("X", "number", getCommonVal("x"), (v) => updateWidgets("x", parseInt(v, 10)));
            panel.addLabeledInput("Y", "number", getCommonVal("y"), (v) => updateWidgets("y", parseInt(v, 10)));
        });
        panel.addCompactPropertyRow(() => {
            panel.addLabeledInput("Width", "number", getCommonVal("width"), (v) => updateWidgets("width", parseInt(v, 10)));
            panel.addLabeledInput("Height", "number", getCommonVal("height"), (v) => updateWidgets("height", parseInt(v, 10)));
        });
        panel.endSection();

        // --- Common Appearance ---
        const commonAppearanceKeys = [
            "color", "bg_color", "background_color", "border_width", "border_color", "border_radius", "radius",
            "opacity", "font_size", "font_family", "font_weight", "text_align", "italic", "locked", "hidden"
        ];

        const allKeys = new Set();
        widgets.forEach(w => Object.keys(w.props || {}).forEach(k => allKeys.add(k)));

        const existingKeysUnion = widgets.map(w => Object.keys(w.props || {}));
        const intersectionKeys = existingKeysUnion.reduce((a, b) => a.filter(k => b.includes(k)));

        const displayKeysSet = new Set([...intersectionKeys, ...commonAppearanceKeys]);

        const displayKeys = Array.from(displayKeysSet).filter(key => {
            if (["border_width", "border_color", "border_radius", "radius"].includes(key)) {
                const supportedTypes = ["text", "label", "sensor_text", "lvgl_label", "lvgl_button", "shape_rect", "rounded_rect", "shape_circle", "datetime"];
                return widgets.every(w => supportedTypes.includes(w.type) || (w.type && w.type.startsWith("lvgl_")));
            }

            if (commonAppearanceKeys.includes(key)) {
                const existsInOne = widgets.some(w => w.props && w.props[key] !== undefined);
                if (existsInOne) return true;

                // Show font/text properties if all widgets are text-compatible
                if (key.includes("font") || key === "text_align" || key === "italic") {
                    const textTypes = ["text", "label", "sensor_text", "lvgl_label", "lvgl_button", "datetime"];
                    return widgets.every(w => textTypes.includes(w.type) || (w.type && w.type.startsWith("lvgl_")));
                }

                // Show color/opacity for all shape-compatible types even if not set yet
                if (key === "color" || key === "opacity") {
                    const shapeTypes = ["text", "label", "sensor_text", "lvgl_label", "lvgl_button", "shape_rect", "rounded_rect", "shape_circle", "datetime", "icon"];
                    return widgets.every(w => shapeTypes.includes(w.type) || (w.type && w.type.startsWith("lvgl_")));
                }
            }

            return intersectionKeys.includes(key);
        });

        if (displayKeys.length > 0) {
            panel.createSection("Shared Appearance", true);

            const getCommonProp = (key) => {
                const first = widgets[0].props ? widgets[0].props[key] : undefined;
                return widgets.every(w => (w.props ? w.props[key] : undefined) === first) ? first : MIXED_VALUE;
            };

            const updateWidgetsProps = (key, val) => {
                AppState.updateWidgetsProps(ids, { [key]: val });
            };

            const filteredDisplayKeys = displayKeys.filter(k => {
                const firstVal = widgets.find(w => w.props && w.props[k] !== undefined)?.props[k];
                const val = firstVal !== undefined ? firstVal : "";
                return typeof val === 'number' || typeof val === 'string' || typeof val === 'boolean' || val === "";
            });

            filteredDisplayKeys.sort((a, b) => {
                if (a.includes("color") && !b.includes("color")) return -1;
                if (b.includes("color") && !a.includes("color")) return 1;
                return a.localeCompare(b);
            });

            filteredDisplayKeys.forEach(key => {
                const label = key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
                const val = getCommonProp(key);

                const sampleWidget = widgets.find(w => w.props && w.props[key] !== undefined) || widgets[0];
                const type = sampleWidget.props && sampleWidget.props[key] !== undefined ? typeof sampleWidget.props[key] : 'string';

                if (key.includes("color") || key === "bg" || key === "fg") {
                    panel.addColorSelector(label, val, getAvailableColors(), (v) => updateWidgetsProps(key, v));
                } else if (type === 'boolean' || ["italic", "locked", "hidden"].includes(key)) {
                    panel.addCheckbox(label, val === MIXED_VALUE ? false : val, (v) => updateWidgetsProps(key, v));
                } else {
                    const inputType = (type === 'number' || key.includes("width") || key.includes("size") || key.includes("radius")) ? 'number' : 'text';
                    panel.addLabeledInput(label, inputType, val, (v) => {
                        updateWidgetsProps(key, inputType === 'number' ? parseInt(v, 10) : v);
                    });
                }
            });

            panel.endSection();
        }

        // --- Operations ---
        panel.createSection("Operations", true);

        const shadowBtn = document.createElement("button");
        shadowBtn.className = "btn btn-secondary btn-full btn-xs";
        shadowBtn.style.width = "100%";
        shadowBtn.style.marginTop = "8px";
        shadowBtn.innerHTML = `<span class="mdi mdi-box-shadow"></span> Create Shadows for All Selected`;
        shadowBtn.onclick = () => AppState.createDropShadow(ids);
        panel.getContainer().appendChild(shadowBtn);

        const delBtn = document.createElement("button");
        delBtn.className = "btn btn-secondary btn-xs";
        delBtn.style.background = "var(--danger)";
        delBtn.style.color = "white";
        delBtn.style.border = "none";
        delBtn.style.width = "100%";
        delBtn.style.marginTop = "8px";
        delBtn.innerHTML = "🗑 Delete Selected Widgets";
        delBtn.onclick = () => {
            if (confirm(`Delete ${ids.length} widgets?`)) {
                AppState.deleteWidget();
            }
        };
        panel.getContainer().appendChild(delBtn);
        panel.endSection();

        panel.endSection();
    }
}
