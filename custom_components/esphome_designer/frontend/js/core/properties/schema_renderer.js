import { AppState } from '../state';
import { getAvailableColors } from '../../utils/device.js';

export class SchemaRenderer {
    /**
     * Renders properties for a widget based on a provided schema.
     * @param {PropertiesPanel} panel - The main properties panel instance.
     * @param {Object} widget - The widget being edited.
     * @param {Array} schema - The registry schema definition.
     */
    static render(panel, widget, schema) {
        const colors = getAvailableColors();
        const props = widget.props || {};

        const updateProp = (key, value) => {
            const newProps = { ...widget.props, [key]: value };
            AppState.updateWidget(widget.id, { props: newProps });

            // Sync border radius to shadow if it exists (mirror legacy)
            if (key === "border_radius" || key === "radius" || key === "corner_radius") {
                const page = AppState.getCurrentPage();
                if (page && page.widgets) {
                    const r = parseInt(value, 10) || 0;
                    const shadowName = (widget.props?.name || widget.type) + " Shadow";
                    const shadow = page.widgets.find(w =>
                        (w.props && w.props.name === shadowName) ||
                        (w.x === (widget.x || 0) + 5 && w.y === (widget.y || 0) + 5 && w.width === widget.width && w.height === widget.height)
                    );

                    if (shadow) {
                        if (shadow.type === "shape_rect" && r > 0) {
                            AppState.updateWidget(shadow.id, { type: "rounded_rect", props: { ...shadow.props, radius: r } });
                        } else if (shadow.type === "rounded_rect") {
                            AppState.updateWidget(shadow.id, { props: { ...shadow.props, radius: r } });
                        }
                    }
                }
            }
        };

        schema.forEach(sectionDef => {
            panel.createSection(sectionDef.section, sectionDef.defaultExpanded !== false);

            sectionDef.fields.forEach(field => {
                const isRoot = field.target === "root";
                const val = isRoot ?
                    (widget[field.key] !== undefined ? widget[field.key] : field.default)
                    : (props[field.key] !== undefined ? props[field.key] : field.default);

                const handleChange = (v) => {
                    let finalV = v;
                    if (field.type === "number") {
                        finalV = v === "" ? null : parseFloat(v);
                        if (isNaN(finalV)) finalV = field.default !== undefined ? field.default : 0;
                    }
                    if (isRoot) {
                        AppState.updateWidget(widget.id, { [field.key]: finalV });
                    } else {
                        updateProp(field.key, finalV);
                    }
                };

                switch (field.type) {
                    case "text":
                    case "textarea":
                    case "number":
                        panel.addLabeledInput(field.label, field.type, val, handleChange);
                        break;
                    case "color":
                        panel.addColorSelector(field.label, val, colors, handleChange);
                        break;
                    case "select": {
                        const opts = typeof field.dynamicOptions === 'function'
                            ? field.dynamicOptions(props)
                            : field.options;
                        panel.addSelect(field.label, val, opts, handleChange);
                        break;
                    }
                    case "checkbox":
                        panel.addCheckbox(field.label, val, handleChange);
                        break;
                    case "icon_picker":
                        panel.addLabeledInputWithIconPicker(field.label, "text", val, handleChange, widget);
                        break;
                    case "entity_picker":
                        panel.addLabeledInputWithPicker(field.label, "text", val, handleChange, widget);
                        break;
                    case "hint":
                        panel.addHint(field.label);
                        break;
                    case "drop_shadow_button":
                        panel.addDropShadowButton(panel.getContainer(), widget.id);
                        break;
                }
            });

            panel.endSection();
        });
    }
}
