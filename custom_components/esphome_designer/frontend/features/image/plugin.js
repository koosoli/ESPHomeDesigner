/**
 * Image Plugin
 */
import { AppState } from '@core/state';

const isOffline = () => window.location.protocol === 'file:' || !window.location.hostname;

const render = (el, widget, context) => {
    const { getColorStyle, selected, profile } = context || {};
    const props = widget.props || {};
    const url = (props.url || "").trim();
    const path = (props.path || "").replace(/^"|"$/g, '').trim();
    const invert = !!props.invert;

    // Determine display type from profile
    const displayType = profile?.displayType || 'binary'; // Default to binary for safety

    // Construct filter string based on display type
    let filter = "";
    if (invert) filter += "invert(1) ";
    if (displayType === 'binary') {
        filter += "grayscale(100%) contrast(1.5) "; // High contrast for 1-bit displays
    } else if (displayType === 'grayscale') {
        filter += "grayscale(100%) "; // Multi-level grayscale (e.g., M5Paper)
    }
    // For 'color', no grayscale filter is added

    // For 'color', no grayscale filter is added

    el.style.boxSizing = "border-box";
    el.style.color = "#666";
    el.style.overflow = "visible"; // Allow resize handles to be seen

    // Create inner wrapper to clip content
    const content = document.createElement("div");
    content.style.width = "100%";
    content.style.height = "100%";
    content.style.overflow = "hidden";
    content.style.display = "flex";
    content.style.alignItems = "center";
    content.style.justifyContent = "center";
    content.style.backgroundColor = "#f5f5f5";
    content.style.backgroundImage = "";

    el.innerText = "";
    el.appendChild(content);

    // Apply Border & Background (Restored)
    if (props.border_width) {
        const borderColor = getColorStyle(props.border_color || "black");
        el.style.border = `${props.border_width}px solid ${borderColor}`;
        el.style.borderRadius = `${props.border_radius || 0}px`;
    } else {
        el.style.border = "none";
    }
    if (props.bg_color) {
        el.style.backgroundColor = getColorStyle(props.bg_color);
    }

    if (path) {
        const filename = path.split(/[/\\]/).pop() || path;
        content.innerHTML = "";

        const img = document.createElement("img");
        img.style.maxWidth = "100%";
        img.style.maxHeight = "100%";
        img.style.objectFit = "contain";
        img.draggable = false;
        if (filter) img.style.filter = filter.trim();

        img.onerror = () => {
            const offlineNote = isOffline() ? "<br/><span style='color:#e67e22;font-size:8px;'>⚠️ Offline mode - preview in HA</span>" : "";
            content.innerHTML = "<div style='text-align:center;color:#666;font-size:11px;padding:8px;line-height:1.4;'>" +
                "🖼️<br/><strong>" + filename + "</strong><br/>" +
                "<span style='color:#999;font-size:9px;'>" +
                (invert ? "(inverted) " : "") +
                widget.width + "×" + widget.height + "px</span>" + offlineNote + "</div>";
        };

        img.onload = () => {
            // Only show overlay if selected
            if (selected) {
                const overlay = document.createElement("div");
                overlay.style.position = "absolute";
                overlay.style.bottom = "2px";
                overlay.style.right = "2px";
                overlay.style.background = "rgba(0,0,0,0.6)";
                overlay.style.color = "white";
                overlay.style.padding = "2px 4px";
                overlay.style.fontSize = "8px";
                overlay.style.borderRadius = "2px";
                overlay.textContent = filename + " • " + widget.width + "×" + widget.height + "px";
                content.appendChild(overlay);
            }
        };

        let imgSrc;
        if (isOffline()) {
            if (path.match(/^[A-Za-z]:\\/)) {
                imgSrc = "file:///" + path.replace(/\\/g, '/');
            } else if (path.startsWith('/config/')) {
                imgSrc = null;
            } else {
                imgSrc = path;
            }
        } else {
            imgSrc = "/api/esphome_designer/image_proxy?path=" + encodeURIComponent(path);
        }

        if (imgSrc) {
            img.src = imgSrc;
            content.appendChild(img);
        } else {
            content.innerHTML = "<div style='text-align:center;color:#666;font-size:11px;padding:8px;line-height:1.4;'>" +
                "🖼️<br/><strong>" + filename + "</strong><br/>" +
                "<span style='color:#999;font-size:9px;'>" +
                (invert ? "(inverted) " : "") +
                widget.width + "×" + widget.height + "px</span><br/>" +
                "<span style='color:#e67e22;font-size:8px;'>⚠️ Preview available in Home Assistant</span></div>";
        }
        return;
    }

    if (url) {
        const img = document.createElement("img");
        img.style.maxWidth = "100%";
        img.style.maxHeight = "100%";
        img.style.objectFit = "contain";
        img.draggable = false;
        if (filter) img.style.filter = filter.trim();

        img.onerror = () => {
            content.innerHTML = "<div style='text-align:center;color:#666;font-size:11px;padding:8px;line-height:1.4;'>" +
                "🖼️<br/><strong>Image</strong><br/>" +
                "<span style='color:#999;font-size:9px;'>" +
                (invert ? "(inverted) " : "") +
                "Load Failed</span></div>";
        };

        img.onload = () => {
            if (selected) {
                const filename = url.split("/").pop();
                const overlay = document.createElement("div");
                overlay.style.position = "absolute";
                overlay.style.bottom = "2px";
                overlay.style.right = "2px";
                overlay.style.background = "rgba(0,0,0,0.6)";
                overlay.style.color = "white";
                overlay.style.padding = "2px 4px";
                overlay.style.fontSize = "8px";
                overlay.style.borderRadius = "2px";
                overlay.textContent = filename;
                content.appendChild(overlay);
            }
        };

        img.src = url;
        content.appendChild(img);
    } else {
        const placeholder = document.createElement("div");
        placeholder.style.textAlign = "center";
        placeholder.style.color = "#aaa";
        placeholder.style.fontSize = "11px";
        placeholder.innerHTML = "🖼️<br/>Image Widget<br/><span style='font-size:9px;color:#ccc;'>Enter valid path to resize →</span>";
        content.appendChild(placeholder);
    }
};

const getSafeImageId = (w) => {
    const props = w.props || {};
    const path = (props.path || "").replace(/^"|"$/g, '').trim();
    if (!path) return `img_${w.id.replace(/-/g, "_")}`;

    // Create ID based on path and size for deduplication
    const safePath = path.replace(/[^a-zA-Z0-9]/g, "_").replace(/^_+|_+$/g, "").replace(/_+/g, "_");
    return `img_${safePath}_${w.width}x${w.height}`;
};

const exportDoc = (w, context) => {
    const { lines, getCondProps, getConditionCheck, profile } = context; // eslint-disable-line no-unused-vars
    const props = w.props || {};
    const path = (props.path || "").replace(/^"|"$/g, '').trim();
    const invert = !!props.invert;

    if (!path) return;

    const safeId = getSafeImageId(w);

    const cond = getConditionCheck(w);
    if (cond) lines.push(`        ${cond}`);

    const isColor = profile?.features?.lcd || (profile?.name && (profile.name.includes("6-Color") || profile.name.includes("Color")));

    if (!isColor) {
        if (invert) {
            lines.push(`        it.image(${w.x}, ${w.y}, id(${safeId}), color_off, color_on);`);
        } else {
            lines.push(`        it.image(${w.x}, ${w.y}, id(${safeId}), color_on, color_off);`);
        }
    } else {
        lines.push(`        it.image(${w.x}, ${w.y}, id(${safeId}));`);
    }

    // Border (Restored)
    const borderWidth = parseInt(props.border_width || 0, 10);
    if (borderWidth > 0) {
        const borderColorProp = props.border_color || "theme_auto";
        const borderColorConst = context.getColorConst(borderColorProp);
        for (let i = 0; i < borderWidth; i++) {
            lines.push(`        it.rectangle(${w.x} + ${i}, ${w.y} + ${i}, ${w.width} - 2 * ${i}, ${w.height} - 2 * ${i}, ${borderColorConst});`);
        }
    }

    if (cond) lines.push(`        }`);
};

const exportLVGL = (w, { common, _convertColor }) => {
    const p = w.props || {};
    const path = (p.path || "").replace(/^"|"$/g, '').trim();
    const url = p.url || "";
    let src = path || url || "symbol_image";
    if (path && (path.includes("/") || path.includes("."))) {
        src = getSafeImageId(w);
    }

    return {
        image: {
            ...common,
            src: src,
            angle: (p.rotation || 0),
            image_recolor_opa: "transp" // Don't recolor by default for regular images
        }
    };
};

const onExportComponents = (context) => {
    const { lines, widgets, profile } = context;
    const targets = widgets.filter(w => w.type === 'image');

    if (targets.length > 0) {
        const processed = new Set();
        const imageLines = [];

        targets.forEach(w => {
            const props = w.props || {};
            const path = (props.path || "").replace(/^"|"$/g, '').trim();
            if (!path) return;

            const safeId = getSafeImageId(w);
            if (processed.has(safeId)) return;
            processed.add(safeId);

            const isColor = profile.features?.lcd || (profile.name && (profile.name.includes("6-Color") || profile.name.includes("Color")));
            const imgType = isColor ? "RGB565" : "BINARY";

            imageLines.push(`  - file: "${path}"`);
            imageLines.push(`    id: ${safeId}`);
            imageLines.push(`    type: ${imgType}`);
            imageLines.push(`    resize: ${w.width}x${w.height}`);
            if (isColor) {
                imageLines.push(`    use_transparency: false`);
            } else {
                imageLines.push(`    dither: FLOYDSTEINBERG`);
            }
        });

        if (imageLines.length > 0) {
            lines.push("image:");
            lines.push(...imageLines);
            lines.push("");
        }
    }
};

export default {
    id: "image",
    name: "Image",
    category: "Graphics",
    supportedModes: ['lvgl', 'direct', 'oepl', 'opendisplay'],
    defaults: {
        path: "/config/esphome/images/logo.png",
        url: "",
        invert: false,
        dither: "FLOYDSTEINBERG",
        image_type: "BINARY",
        render_mode: "Auto",
        size: "native",
        width: 200,
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
        panel.addHint("🖼️ Static image from ESPHome.<br/><span style='color:#888;font-size:11px;'>Replace the default path with your actual image file path.</span>");
        panel.addLabeledInput("Image Path", "text", props.path || "", (v) => updateProp("path", v));
        panel.addLabeledInput("Online Image URL", "text", props.url || "", (v) => updateProp("url", v));
        panel.endSection();

        panel.createSection("Appearance", true);
        panel.addCheckbox("Invert colors", props.invert || false, (v) => updateProp("invert", v));
        panel.addSelect("Render Mode", props.render_mode || "Auto", ["Auto", "Binary", "Grayscale", "Color (RGB565)"], (v) => updateProp("render_mode", v));
        panel.addNumberWithSlider("Opacity (%)", props.opacity !== undefined ? props.opacity : 100, 0, 100, (v) => updateProp("opacity", v));

        const fillWrap = document.createElement("div");
        fillWrap.className = "field";
        fillWrap.style.marginTop = "12px";
        const isFullScreen = (widget.x === 0 && widget.y === 0 && (widget.width === 800 || widget.width === 480));
        const fillBtn = document.createElement("button");
        fillBtn.className = "btn " + (isFullScreen ? "btn-primary" : "btn-secondary") + " btn-full";
        fillBtn.textContent = isFullScreen ? "✓ Full Screen (click to restore)" : "⛶ Fill Screen";
        fillBtn.type = "button";
        fillBtn.addEventListener("click", () => {
            if (isFullScreen) {
                AppState.updateWidget(widget.id, { x: 50, y: 50, width: 200, height: 150 });
            } else {
                const res = AppState.getCanvasDimensions();
                AppState.updateWidget(widget.id, { x: 0, y: 0, width: res.width, height: res.height });
            }
        });
        fillWrap.appendChild(fillBtn);
        panel.getContainer().appendChild(fillWrap);
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
        const url = (p.url || "").trim();
        const path = (p.path || "").replace(/^"|"$/g, '').trim();

        if (url) {
            return {
                type: "dlimg",
                url: url,
                x: Math.round(w.x),
                y: Math.round(w.y),
                xsize: Math.round(w.width),
                ysize: Math.round(w.height),
                rotate: p.rotation || 0
            };
        }

        // Local path not supported in ODP service calls
        return {
            type: "text",
            value: `[Local Image: ${path}]`,
            x: Math.round(w.x),
            y: Math.round(w.y),
            size: 12,
            color: "red"
        };
    },
    exportOEPL: (w, { _layout, _page }) => {
        const p = w.props || {};
        const url = (p.url || "").trim();
        const path = (p.path || "").replace(/^"|"$/g, '').trim();

        if (url) {
            return {
                type: "online_image",
                url: url,
                x: Math.round(w.x),
                y: Math.round(w.y),
                width: Math.round(w.width),
                height: Math.round(w.height)
            };
        }

        if (path) {
            return {
                type: "image",
                file: path,
                x: Math.round(w.x),
                y: Math.round(w.y),
                width: Math.round(w.width),
                height: Math.round(w.height)
            };
        }

        return null;
    },
    export: exportDoc,
    exportLVGL,
    onExportComponents
};
