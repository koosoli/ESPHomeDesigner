/**
 * LVGL QR Code Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const fgColor = getColorStyle(props.color || "black");
    const bgColor = getColorStyle(props.bg_color || "white");

    el.innerHTML = "";
    el.style.backgroundColor = bgColor;
    el.style.display = "flex";
    el.style.alignItems = "center";
    el.style.justifyContent = "center";

    const text = props.text || "https://github.com/koosoli/ESPHomeDesigner/";

    try {
        if (window.qrcode) {
            const typeNumber = 0;
            const errorCorrectionLevel = 'L';
            const qr = qrcode(typeNumber, errorCorrectionLevel);
            qr.addData(text);
            qr.make();

            const svgString = qr.createSvgTag(widget.props.scale || 4, 0);
            const helper = document.createElement('div');
            helper.innerHTML = svgString;
            const svg = helper.querySelector('svg');
            if (svg) {
                svg.style.width = "100%";
                svg.style.height = "100%";
                svg.style.fill = fgColor;
            }
            el.appendChild(helper.firstChild);
        } else {
            el.textContent = "QR";
            el.style.outline = "2px solid " + fgColor;
        }
    } catch (e) {
        el.textContent = "QR Error";
    }
};

const exportLVGL = (w, { common, convertColor }) => {
    const p = w.props || {};
    let qrText = `"${p.text || 'https://github.com/koosoli/ESPHomeDesigner/'}"`;

    if (w.entity_id) {
        const safeId = w.entity_id.replace(/[^a-zA-Z0-9_]/g, "_");
        qrText = `!lambda "return id(${safeId}).state.c_str();"`;
    }

    return {
        qrcode: {
            ...common,
            text: qrText,
            size: Math.min(common.width, common.height),
            dark_color: convertColor(p.color),
            light_color: convertColor(p.bg_color || "white")
        }
    };
};

const onExportTextSensors = (context) => {
    const { widgets, isLvgl, pendingTriggers } = context;
    if (!widgets) return;

    for (const w of widgets) {
        if (w.type !== "lvgl_qrcode") continue;

        const eid = (w.entity_id || w.props?.entity_id || "").trim();
        if (!eid) continue;

        if (isLvgl && pendingTriggers) {
            if (!pendingTriggers.has(eid)) {
                pendingTriggers.set(eid, new Set());
            }
            pendingTriggers.get(eid).add(`- lvgl.widget.refresh: ${w.id}`);
        }
    }
};

export default {
    id: "lvgl_qrcode",
    name: "QR Code (lv)",
    category: "LVGL",
    defaults: {
        text: "https://github.com/koosoli/ESPHomeDesigner/",
        color: "black",
        bg_color: "white",
        scale: 4,
        width: 130,
        height: 130
    },
    render,
    exportLVGL,
    onExportTextSensors
};
