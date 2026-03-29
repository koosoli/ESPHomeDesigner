import { AppState } from '../state';
import { getDeviceModel } from '../../utils/device.js';
import { appendFillScreenButton } from './legacy_renderer_widget_properties_shared.js';

/**
 * @param {any} panel
 * @param {any} widget
 * @param {string} type
 * @param {Record<string, any>} props
 * @param {(key: string, value: any) => void} updateProp
 * @returns {boolean}
 */
export function renderLegacyMediaProperties(panel, widget, type, props, updateProp) {
    if (type === "image") {
        panel.createSection("Content", true);
        panel.addHint("ðŸ–¼ï¸ Static image from ESPHome.<br/><span style='color:#888;font-size:11px;'>Replace the default path with your actual image file path.</span>");
        panel.addLabeledInput("Image Path", "text", props.path || "", (value) => updateProp("path", value));
        panel.endSection();

        panel.createSection("Appearance", true);
        if (props.invert === undefined) {
            updateProp("invert", getDeviceModel() === "reterminal_e1001");
        }
        panel.addCheckbox("Invert colors", props.invert || false, (value) => updateProp("invert", value));
        panel.addSelect("Render Mode", props.render_mode || "Auto", ["Auto", "Binary", "Grayscale", "Color (RGB565)"], (value) => updateProp("render_mode", value));
        appendFillScreenButton(
            panel,
            widget,
            () => AppState.updateWidget(widget.id, { x: 50, y: 50, width: 200, height: 150 }),
            () => AppState.updateWidget(widget.id, { x: 0, y: 0, width: 800, height: 480 })
        );
        panel.endSection();
        return true;
    }

    if (type === "online_image") {
        panel.createSection("Content", true);
        panel.addHint("ðŸ’¡ Fetch remote images dynamically (Puppet support):<br/><code style='background:#f0f0f0;padding:2px 4px;border-radius:2px;'>https://example.com/camera/snapshot.jpg </code><br/><span style='color:#4a9eff;'>â„¹ï¸ Images are downloaded at specified intervals</span>");
        panel.addLabeledInput("Remote URL", "text", props.url || "", (value) => updateProp("url", value));
        panel.addLabeledInput("Update interval (seconds)", "number", props.interval_s || 300, (value) => updateProp("interval_s", parseInt(value, 10)));
        panel.endSection();

        panel.createSection("Appearance", true);
        if (props.invert === undefined) {
            updateProp("invert", getDeviceModel() === "reterminal_e1001");
        }
        panel.addCheckbox("Invert colors", props.invert || false, (value) => updateProp("invert", value));
        panel.addSelect("Render Mode", props.render_mode || "Auto", ["Auto", "Binary", "Grayscale", "Color (RGB565)"], (value) => updateProp("render_mode", value));
        appendFillScreenButton(
            panel,
            widget,
            () => AppState.updateWidget(widget.id, { x: 50, y: 50, width: 200, height: 150 }),
            () => AppState.updateWidget(widget.id, { x: 0, y: 0, width: 800, height: 480 })
        );
        panel.endSection();
        return true;
    }

    if (type === "qr_code") {
        panel.createSection("Content", true);
        panel.addHint("ðŸ“± Generate QR codes that can be scanned by phones/tablets");
        panel.addLabeledInput("QR Content", "text", props.value || "https://esphome.io", (value) => updateProp("value", value));
        panel.addHint("Enter a URL, text, or any string to encode");
        panel.endSection();

        panel.createSection("Appearance", true);
        panel.addLabeledInput("Scale", "number", props.scale || 2, (value) => {
            let scale = parseInt(value || "2", 10);
            if (Number.isNaN(scale) || scale < 1) scale = 1;
            if (scale > 10) scale = 10;
            updateProp("scale", scale);
        });
        panel.addHint("Size multiplier (1-10). Larger = bigger QR code");
        panel.addSelect("Error Correction", props.ecc || "LOW", ["LOW", "MEDIUM", "QUARTILE", "HIGH"], (value) => updateProp("ecc", value));
        panel.addHint("Higher = more redundancy, can recover from damage");
        panel.addSelect("Color", props.color || "black", ["black", "white"], (value) => updateProp("color", value));
        panel.endSection();
        return true;
    }

    if (type === "puppet") {
        panel.createSection("Content", true);
        panel.addLabeledInput("File path / URL", "text", props.image_url || "", (value) => updateProp("image_url", value));
        panel.addHint('Tip: Use mdi:icon-name for Material Design Icons. <br><b>Important:</b> Ensure `materialdesignicons - webfont.ttf` is in your ESPHome `fonts / ` folder. <a href="https://pictogrammers.com/library/mdi/" target="_blank" style="color: #52c7ea">MDI Library</a>');
        panel.endSection();

        panel.createSection("Appearance", true);
        panel.addSelect("Image type", props.image_type || "RGB565", ["RGB565", "RGB", "GRAYSCALE", "BINARY"], (value) => updateProp("image_type", value));
        panel.addHint("RGB565=2B/px, RGB=3B/px, GRAYSCALE=1B/px, BINARY=1bit/px");
        panel.addSelect("Transparency", props.transparency || "opaque", ["opaque", "chroma_key", "alpha_channel"], (value) => updateProp("transparency", value));
        panel.addHint("opaque=no transparency, chroma_key=color key, alpha_channel=smooth blend");
        panel.endSection();
        return true;
    }

    return false;
}
