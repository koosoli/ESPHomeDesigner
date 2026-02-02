/**
 * QR Code Plugin
 */



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

    } catch (e) {
        element.innerHTML = '<div style="color:#c00;font-size:10px;text-align:center;">QR Error:<br>' + e.message + '</div>';
    }
};

const exportDoc = (w, context) => {
    const {
        lines, getColorConst, addDitherMask, sanitize, getCondProps, getConditionCheck, isEpaper
    } = context;

    const p = w.props || {};
    const value = sanitize(p.value || "https://github.com/koosoli/ESPHomeDesigner/");
    const ecc = p.ecc || "LOW";
    const colorProp = p.color || "theme_auto";

    const color = getColorConst(colorProp);
    const safeId = `qr_${w.id}`.replace(/-/g, "_");

    const availableSize = Math.min(w.width, w.height);
    const contentLen = value.length;
    const estimatedModules = Math.min(177, 21 + Math.ceil(contentLen / 10) * 2);
    const scale = Math.max(1, Math.floor(availableSize / estimatedModules));

    lines.push(`        // widget:qr_code id:${w.id} type:qr_code x:${w.x} y:${w.y} w:${w.width} h:${w.height} value:"${value}" scale:${scale} ecc:${ecc} color:${colorProp} ${getCondProps(w)}`);

    const cond = getConditionCheck(w);
    if (cond) lines.push(`        ${cond}`);

    lines.push(`        it.qr_code(${w.x}, ${w.y}, id(${safeId}), ${color}, ${scale});`);
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
        width: 130,
        height: 130
    },
    render,
    exportOpenDisplay: (w, { layout, page }) => {
        const p = w.props || {};
        const value = p.value || "https://github.com/koosoli/ESPHomeDesigner/";

        return {
            type: "qrcode",
            data: value,
            x: Math.round(w.x),
            y: Math.round(w.y),
            color: p.color || "black",
            bgcolor: p.bg_color || "white"
        };
    },
    exportOEPL: (w, { layout, page }) => {
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

