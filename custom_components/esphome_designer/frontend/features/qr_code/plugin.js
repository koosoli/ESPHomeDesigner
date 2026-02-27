/**
 * QR Code Plugin
 */
import { AppState } from '@core/state';



const exportLVGL = (w, { common, convertColor }) => {
    const p = w.props || {};
    return {
        qrcode: {
            ...common,
            text: `"${p.text || p.value || 'https://github.com/koosoli/ESPHomeDesigner/'}"`,
            size: Math.min(w.width, w.height),
            dark_color: convertColor(p.color),
            light_color: convertColor(p.bg_color || "white")
        }
    };
};

const render = (element, widget, helpers) => {
    const props = widget.props || {};
    const value = props.value || "https://github.com/koosoli/ESPHomeDesigner/";
    const color = props.color || "theme_auto";
    const ecc = props.ecc || "LOW";

    element.style.boxSizing = "border-box";
    element.style.display = "flex";
    element.style.alignItems = "flex-start";
    element.style.justifyContent = "flex-start";
    element.style.overflow = "hidden";
    element.style.padding = "0";
    element.innerHTML = "";

    const eccMap = { "LOW": "L", "MEDIUM": "M", "QUARTILE": "Q", "HIGH": "H" };
    const eccLevel = eccMap[ecc] || "L";

    if (typeof qrcode === "undefined") {
        element.innerHTML = '<div style="color:#999;font-size:10px;text-align:center;">QR Library<br>Loading...</div>';
        return;
    }

    try {
        const qr = qrcode(0, eccLevel);
        qr.addData(value);
        qr.make();

        const moduleCount = qr.getModuleCount();
        const availableSize = Math.min(widget.width, widget.height);
        const cellSize = Math.max(1, Math.floor(availableSize / moduleCount));
        const qrSize = cellSize * moduleCount;

        const canvas = document.createElement("canvas");
        canvas.width = qrSize;
        canvas.height = qrSize;
        canvas.style.imageRendering = "pixelated";

        const ctx = canvas.getContext("2d");
        const fillColor = helpers.getColorStyle(color);
        ctx.fillStyle = fillColor;

        for (let row = 0; row < moduleCount; row++) {
            for (let col = 0; col < moduleCount; col++) {
                if (qr.isDark(row, col)) {
                    ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
                }
            }
        }

        element.appendChild(canvas);
        widget.props._calculatedScale = cellSize;

        // Apply Border & Background (Restored)
        if (props.border_width) {
            const borderColor = helpers.getColorStyle(props.border_color || color);
            element.style.border = `${props.border_width}px solid ${borderColor}`;
            element.style.borderRadius = `${props.border_radius || 0}px`;
        } else {
            element.style.border = "none";
        }
        if (props.bg_color) {
            element.style.backgroundColor = helpers.getColorStyle(props.bg_color);
        }

    } catch (e) {
        element.innerHTML = '<div style="color:#c00;font-size:10px;text-align:center;">QR Error:<br>' + e.message + '</div>';
    }
};

const exportDoc = (w, context) => {
    const {
        lines, getColorConst, addDitherMask, sanitize, getCondProps, getConditionCheck, isEpaper // eslint-disable-line no-unused-vars
    } = context;

    const p = w.props || {};
    const value = sanitize(p.value || "https://github.com/koosoli/ESPHomeDesigner/");
    const ecc = p.ecc || "LOW"; // eslint-disable-line no-unused-vars
    const colorProp = p.color || "theme_auto";

    const color = getColorConst(colorProp);
    const safeId = `qr_${w.id}`.replace(/-/g, "_");

    const availableSize = Math.min(w.width, w.height);
    const contentLen = value.length;
    const estimatedModules = Math.min(177, 21 + Math.ceil(contentLen / 10) * 2);
    const scale = Math.max(1, Math.floor(availableSize / estimatedModules));


    const cond = getConditionCheck(w);
    if (cond) lines.push(`        ${cond}`);

    lines.push(`        it.qr_code(${w.x}, ${w.y}, id(${safeId}), ${color}, ${scale});`);

    // Border (Restored)
    const borderWidth = parseInt(p.border_width || 0, 10);
    if (borderWidth > 0) {
        const borderColorProp = p.border_color || colorProp;
        const borderColorConst = getColorConst(borderColorProp);
        const radius = p.border_radius || 0; // eslint-disable-line no-unused-vars
        for (let i = 0; i < borderWidth; i++) {
            lines.push(`        it.rectangle(${w.x} + ${i}, ${w.y} + ${i}, ${w.width} - 2 * ${i}, ${w.height} - 2 * ${i}, ${borderColorConst});`);
        }
    }

    addDitherMask(lines, colorProp, isEpaper, w.x, w.y, w.width, w.height);

    if (cond) lines.push(`        }`);
};

const onExportComponents = (context) => {
    const { lines, widgets } = context;
    const qrCodeWidgets = widgets.filter(w => w.type === 'qr_code');

    if (qrCodeWidgets.length > 0) {
        lines.push("qr_code:");
        qrCodeWidgets.forEach(w => {
            const p = w.props || {};
            const safeId = `qr_${w.id}`.replace(/-/g, "_");
            const value = (p.value || "https://github.com/koosoli/ESPHomeDesigner/").replace(/"/g, '\\"');
            const ecc = p.ecc || "LOW";

            lines.push(`  - id: ${safeId}`);
            lines.push(`    value: "${value}"`);
            lines.push(`    ecc: ${ecc}`);
        });
        lines.push("");
    }
};

export default {
    id: "qr_code",
    name: "QR Code",
    category: "Graphics",
    supportedModes: ['lvgl', 'direct', 'oepl', 'opendisplay'],
    defaults: {
        value: "https://github.com/koosoli/ESPHomeDesigner/",
        ecc: "LOW",
        color: "theme_auto",
        bg_color: "white",
        scale: 2,
        width: 130,
        height: 130,
        opa: 255
    },
    renderProperties: (panel, widget) => {
        const props = widget.props || {};
        const updateProp = (key, val) => {
            const newProps = { ...widget.props, [key]: val };
            AppState.updateWidget(widget.id, { props: newProps });
        };

        panel.createSection("Content", true);
        panel.addLabeledInput("QR Content / URL", "text", props.value || "https://github.com/koosoli/ESPHomeDesigner/", (v) => updateProp("value", v));
        panel.addSelect("Error Correction", props.ecc || "LOW", [
            { value: "LOW", label: "Low (7% recovery)" },
            { value: "MEDIUM", label: "Medium (15% recovery)" },
            { value: "QUARTILE", label: "Quartile (25% recovery)" },
            { value: "HIGH", label: "High (30% recovery)" }
        ], (v) => updateProp("ecc", v));
        panel.addHint("Higher ECC allows for smaller scale on some displays but is more robust.");
        panel.endSection();

        panel.createSection("Appearance", true);
        panel.addNumberWithSlider("Opacity (%)", props.opacity !== undefined ? props.opacity : 100, 0, 100, (v) => updateProp("opacity", v));
        panel.addColorSelector("Dark Color", props.color || "theme_auto", null, (v) => updateProp("color", v));
        panel.addColorSelector("Light Color", props.bg_color || "white", null, (v) => updateProp("bg_color", v));
        panel.endSection();

        panel.createSection("Border Style", false);
        panel.addLabeledInput("Border Width", "number", props.border_width || 0, (v) => updateProp("border_width", parseInt(v, 10)));
        panel.addColorSelector("Border Color", props.border_color || "theme_auto", null, (v) => updateProp("border_color", v));
        panel.addLabeledInput("Corner Radius", "number", props.border_radius || 0, (v) => updateProp("border_radius", parseInt(v, 10)));
        panel.addDropShadowButton(panel.getContainer(), widget.id);
        panel.endSection();
    },
    render,
    exportOpenDisplay: (w, { _layout, _page }) => {
        const p = w.props || {};
        const value = p.value || "https://github.com/koosoli/ESPHomeDesigner/";

        return {
            type: "qrcode",
            data: value,
            x: Math.round(w.x),
            y: Math.round(w.y),
            boxsize: p.boxsize || 2,
            border: p.border !== undefined ? p.border : 1,
            color: p.color || "black",
            bgcolor: p.bg_color || "white"
        };
    },
    exportOEPL: (w, { _layout, _page }) => {
        const p = w.props || {};
        const value = p.value || "https://github.com/koosoli/ESPHomeDesigner/";

        const availableSize = Math.min(w.width, w.height);
        const contentLen = value.length;
        const estimatedModules = Math.min(177, 21 + Math.ceil(contentLen / 10) * 2);
        const scale = Math.max(1, Math.floor(availableSize / estimatedModules));

        return {
            type: "qrcode",
            data: value,
            x: Math.round(w.x),
            y: Math.round(w.y),
            scale: scale
        };
    },
    exportLVGL,
    export: exportDoc,
    onExportComponents
};

