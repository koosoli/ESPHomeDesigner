import { AppState } from '../state';
import { getAvailableColors } from '../../utils/device.js';

/**
 * @param {any} panel
 * @param {any} widget
 * @param {string} type
 * @returns {void}
 */
export function renderProtocolProperties(panel, widget, type) {
    const colors = getAvailableColors();
    const props = widget.props || {};

    const updateProp = (key, value) => {
        const newProps = { ...widget.props, [key]: value };
        AppState.updateWidget(widget.id, { props: newProps });
    };

    if (type === "image" || type === "online_image") {
        panel.createSection("Image Source", true);
        if (type === "image") {
            panel.addLabeledInput("Asset Path", "text", props.path || "", (v) => updateProp("path", v));
        } else {
            panel.addLabeledInput("Image URL", "text", props.url || "", (v) => updateProp("url", v));
            panel.addLabeledInput("Refresh (s)", "number", props.interval_s || 300, (v) => updateProp("interval_s", parseInt(v, 10)));
        }
        panel.addCheckbox("Invert Colors", !!props.invert, (v) => updateProp("invert", v));
        panel.endSection();

        panel.createSection("Appearance", true);
        panel.addColorSelector("Background", props.bg_color || "transparent", colors, (v) => updateProp("bg_color", v));
        panel.addDropShadowButton(panel.getContainer(), widget.id);
        panel.endSection();
    }
    else if (type.startsWith("shape_") || type === "line" || type === "rounded_rect") {
        panel.createSection("Shape Style", true);
        panel.addColorSelector("Fill/Line Color", props.color || "black", colors, (v) => updateProp("color", v));

        if (type !== "line") {
            panel.addCheckbox("Fill", props.fill !== false, (v) => updateProp("fill", v));
            panel.addColorSelector("Background", props.bg_color || "transparent", colors, (v) => updateProp("bg_color", v));
            panel.addLabeledInput("Border Width", "number", props.border_width || 0, (v) => updateProp("border_width", parseInt(v, 10)));
        } else {
            panel.addLabeledInput("Thickness", "number", props.thickness || 2, (v) => updateProp("thickness", parseInt(v, 10)));
        }

        if (type === "rounded_rect" || type === "shape_rect" || props.radius !== undefined) {
            panel.addLabeledInput("Corner Radius", "number", props.radius || 0, (v) => updateProp("radius", parseInt(v, 10)));
        }
        panel.addDropShadowButton(panel.getContainer(), widget.id);
        panel.endSection();
    }
    else if (type === "odp_ellipse" || type === "odp_polygon" || type === "odp_rectangle_pattern" || type === "odp_arc" || type === "odp_icon_sequence") {
        panel.createSection("ODP Style", true);
        if (type !== "odp_icon_sequence") {
            panel.addColorSelector("Outline", props.outline || "black", colors, (v) => updateProp("outline", v));
            panel.addColorSelector("Fill", props.fill || "transparent", colors, (v) => updateProp("fill", v));
            panel.addLabeledInput("Border Width", "number", props.border_width || 1, (v) => updateProp("border_width", parseInt(v, 10)));
        } else {
            panel.addColorSelector("Color", props.fill || "black", colors, (v) => updateProp("fill", v));
            panel.addLabeledInput("Icon Size", "number", props.size || 24, (v) => updateProp("size", parseInt(v, 10)));
            panel.addSelect("Direction", props.direction || "right", ["right", "down"], (v) => updateProp("direction", v));
            panel.addLabeledInput("Spacing", "number", props.spacing || 6, (v) => updateProp("spacing", parseInt(v, 10)));
            panel.addLabeledInput("Icons (comma sep)", "text", Array.isArray(props.icons) ? props.icons.join(", ") : (props.icons || ""), (v) => updateProp("icons", v));
        }

        if (type === "odp_rectangle_pattern") {
            panel.addLabeledInput("Repeat X", "number", props.x_repeat || 3, (v) => updateProp("x_repeat", parseInt(v, 10)));
            panel.addLabeledInput("Repeat Y", "number", props.y_repeat || 2, (v) => updateProp("y_repeat", parseInt(v, 10)));
            panel.addLabeledInput("Size X", "number", props.x_size || 30, (v) => updateProp("x_size", parseInt(v, 10)));
            panel.addLabeledInput("Size Y", "number", props.y_size || 15, (v) => updateProp("y_size", parseInt(v, 10)));
        }
        if (type === "odp_arc") {
            panel.addLabeledInput("Start Angle", "number", props.start_angle || 0, (v) => updateProp("start_angle", parseInt(v, 10)));
            panel.addLabeledInput("End Angle", "number", props.end_angle || 90, (v) => updateProp("end_angle", parseInt(v, 10)));
        }
        panel.endSection();
    }
    else if (type === "odp_plot") {
        panel.createSection("Plot Config", true);
        panel.addLabeledInput("Duration (sec)", "number", props.duration || 36400, (v) => updateProp("duration", parseInt(v, 10)));
        panel.addColorSelector("Background", props.background || "white", colors, (v) => updateProp("background", v));
        panel.addColorSelector("Outline", props.outline || "#ccc", colors, (v) => updateProp("outline", v));
        panel.endSection();
    }
    else if (type === "odp_multiline") {
        panel.createSection("Multiline Content", true);
        panel.addLabeledInput("Text", "textarea", props.text || "Line 1|Line 2", (v) => updateProp("text", v));
        panel.addLabeledInput("Delimiter", "text", props.delimiter || "|", (v) => updateProp("delimiter", v));
        panel.endSection();

        panel.createSection("Appearance", true);
        panel.addLabeledInput("Font Size", "number", props.font_size || 16, (v) => updateProp("font_size", parseInt(v, 10)));
        panel.addLabeledInput("Line Spacing", "number", props.line_spacing || 4, (v) => updateProp("line_spacing", parseInt(v, 10)));
        panel.addColorSelector("Color", props.color || "black", colors, (v) => updateProp("color", v));
        panel.addSelect("Font", props.font_family || "Roboto", ["Roboto", "Inter", "Roboto Mono"], (v) => updateProp("font_family", v));
        panel.endSection();
    }
    else {
        // Smart Generic Fallback
        const hasEntity = widget.entity_id !== undefined || props.weather_entity !== undefined || type.includes("sensor") || type.includes("icon");

        if (hasEntity) {
            panel.createSection("Data Source", true);
            panel.addLabeledInputWithPicker("Entity ID", "text", widget.entity_id || props.weather_entity || "", (v) => {
                if (props.weather_entity !== undefined) updateProp("weather_entity", v);
                else AppState.updateWidget(widget.id, { entity_id: v });
            }, widget);

            if (widget.title !== undefined) {
                panel.addLabeledInput("Title/Label", "text", widget.title || "", (v) => {
                    AppState.updateWidget(widget.id, { title: v });
                });
            }
            panel.endSection();
        }

        panel.createSection("Appearance", true);
        panel.addColorSelector("Color", props.color || "black", colors, (v) => updateProp("color", v));
        if (props.bg_color !== undefined) {
            panel.addColorSelector("Background", props.bg_color || "transparent", colors, (v) => updateProp("bg_color", v));
        }
        if (props.size !== undefined) {
            panel.addLabeledInput("Size", "number", props.size || 24, (v) => updateProp("size", parseInt(v, 10)));
        }
        panel.endSection();
    }
}
