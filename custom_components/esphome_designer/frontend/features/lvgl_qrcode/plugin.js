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

    const text = props.text || "https://esphome.io";

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
    return {
        qrcode: {
            ...common,
            text: `"${p.text || 'https://esphome.io'}"`,
            size: Math.min(w.w, w.h),
            dark_color: convertColor(p.color),
            light_color: convertColor(p.bg_color || "white")
        }
    };
};

export default {
    id: "lvgl_qrcode",
    name: "QR Code (lv)",
    category: "LVGL",
    defaults: {
        text: "https://esphome.io",
        color: "black",
        bg_color: "white",
        scale: 4
    },
    render,
    exportLVGL
};
