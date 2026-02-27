/**
 * Online Image Plugin
 */
import { AppState } from '@core/state';

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const url = props.url || props.path || "";
    const invert = !!props.invert;

    el.style.boxSizing = "border-box";

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
    } else {
        el.style.backgroundColor = "#f5f5f5";
    }

    el.style.display = "flex";
    el.style.alignItems = "center";
    el.style.justifyContent = "center";
    el.style.overflow = "hidden";
    el.style.color = "#666";

    el.innerText = "";
    el.style.backgroundImage = "";

    if (url) {
        const img = document.createElement("img");
        img.style.maxWidth = "100%";
        img.style.maxHeight = "100%";
        img.style.objectFit = "contain";
        img.draggable = false;

        if (invert) {
            img.style.filter = "invert(1)";
        }

        img.onerror = () => {
            el.innerHTML = "<div style='text-align:center;color:#666;font-size:11px;padding:8px;line-height:1.4;'>" +
                "🖼️<br/><strong>Online Image</strong><br/>" +
                "<span style='color:#999;font-size:9px;'>" +
                (invert ? "(inverted) " : "") +
                "Load Failed</span></div>";
        };

        img.onload = () => {
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
            el.appendChild(overlay);
        };

        img.src = url;
        el.appendChild(img);
    } else {
        const placeholder = document.createElement("div");
        placeholder.style.textAlign = "center";
        placeholder.style.color = "#aaa";
        placeholder.style.fontSize = "11px";
        placeholder.innerHTML = "🖼️<br/>Online Image<br/><span style='font-size:9px;color:#ccc;'>Enter URL in properties →</span>";
        el.appendChild(placeholder);
    }
};

const exportLVGL = (w, { common, convertColor }) => {
    const p = w.props || {};
    const safeId = getSafeId(w);
    return {
        image: {
            ...common,
            src: safeId,
            angle: (p.rotation || 0),
            pivot_x: (p.pivot_x || 0),
            pivot_y: (p.pivot_y || 0),
            image_recolor: convertColor(p.color),
            image_recolor_opa: "cover"
        }
    };
};

const getSafeId = (w) => `online_img_${w.id.replace(/-/g, "_")}`;

const exportDoc = (w, context) => {
    const {
        lines, getCondProps, getConditionCheck, profile // eslint-disable-line no-unused-vars
    } = context;

    const p = w.props || {};
    const url = (p.url || "").trim(); // eslint-disable-line no-unused-vars
    const invert = !!p.invert;
    const renderMode = p.render_mode || "Auto";

    const safeId = getSafeId(w);


    const cond = getConditionCheck(w);
    if (cond) lines.push(`        ${cond}`);

    // Determine if it's binary
    let imgType = "GRAYSCALE";
    if (renderMode === "Binary") {
        imgType = "BINARY";
    } else if (renderMode === "Grayscale") {
        imgType = "GRAYSCALE";
    } else if (renderMode === "Color (RGB565)") {
        imgType = "RGB565";
    } else {
        const isColor = profile?.features?.lcd || (profile?.name && (profile.name.includes("6-Color") || profile.name.includes("Color")));
        imgType = isColor ? "RGB565" : "BINARY";
    }

    if (imgType === "BINARY") {
        if (invert) {
            lines.push(`        it.image(${w.x}, ${w.y}, id(${safeId}), color_off, color_on);`);
        } else {
            lines.push(`        it.image(${w.x}, ${w.y}, id(${safeId}), color_on, color_off);`);
        }
    } else {
        lines.push(`        it.image(${w.x}, ${w.y}, id(${safeId}));`);
    }

    // Border (Restored)
    const borderWidth = parseInt(p.border_width || 0, 10);
    if (borderWidth > 0) {
        const borderColorProp = p.border_color || "theme_auto";
        const borderColorConst = context.getColorConst(borderColorProp);
        for (let i = 0; i < borderWidth; i++) {
            lines.push(`        it.rectangle(${w.x} + ${i}, ${w.y} + ${i}, ${w.width} - 2 * ${i}, ${w.height} - 2 * ${i}, ${borderColorConst});`);
        }
    }

    if (cond) lines.push(`        }`);
};

const onExportComponents = (context) => {
    const { lines, widgets, profile } = context;
    const targets = widgets.filter(w => w.type === 'online_image' || w.type === 'puppet');

    if (targets.length > 0) {
        lines.push("online_image:");
        targets.forEach(w => {
            const p = w.props || {};
            const url = (p.url || "").trim();
            const safeId = getSafeId(w);
            if (!url) return;

            let format = (p.format || "PNG").toUpperCase();
            if (format === "JPG") format = "JPEG";

            const renderMode = p.render_mode || "Auto";
            let imgType = "GRAYSCALE";

            if (renderMode === "Binary") {
                imgType = "BINARY";
            } else if (renderMode === "Grayscale") {
                imgType = "GRAYSCALE";
            } else if (renderMode === "Color (RGB565)") {
                imgType = "RGB565";
            } else {
                const isColor = profile.features?.lcd || (profile.name && (profile.name.includes("6-Color") || profile.name.includes("Color")));
                imgType = isColor ? "RGB565" : "BINARY";
            }

            let updateInterval = p.update_interval || "never";
            if (p.interval_s && p.interval_s > 0) {
                updateInterval = `${p.interval_s}s`;
            }

            lines.push(`  - id: ${safeId}`);
            lines.push(`    url: "${url}"`);
            lines.push(`    format: ${format}`);
            lines.push(`    type: ${imgType}`);

            if (imgType !== "BINARY") {
                const rW = parseInt(w.width, 10);
                const rH = parseInt(w.height, 10);
                lines.push(`    resize: ${rW}x${rH}`);
            }

            lines.push(`    update_interval: ${updateInterval}`);



            const displayId = profile.features?.lcd ? "my_display" : "epaper_display";
            if (context.isLvgl) {
                lines.push(`    on_download_finished:`);
                lines.push(`      then:`);
                lines.push(`        - lvgl.widget.refresh: ${w.id}`);
                lines.push(`    on_error:`);
                lines.push(`      then:`);
                lines.push(`        - lvgl.widget.refresh: ${w.id}`);
            } else {
                lines.push(`    on_download_finished:`);
                lines.push(`      then:`);
                lines.push(`        - component.update: ${displayId}`);
                lines.push(`    on_error:`);
                lines.push(`      then:`);
                lines.push(`        - component.update: ${displayId}`);
            }
        });
        lines.push("");
    }
};

export default {
    id: "online_image",
    name: "Online Image",
    category: "Graphics",
    supportedModes: ['lvgl', 'direct', 'oepl', 'opendisplay'],
    defaults: {
        url: "",
        invert: false,
        interval_s: 300,
        render_mode: "Auto",
        update_interval: "1h",
        rotation: 0,
        color: "black",
        opa: 255
    },
    renderProperties: (panel, widget) => {
        const props = widget.props || {};
        const updateProp = (key, val) => {
            const newProps = { ...widget.props, [key]: val };
            AppState.updateWidget(widget.id, { props: newProps });
        };

        panel.createSection("Content", true);
        panel.addHint("💡 Fetch remote images dynamically (Puppet support):<br/><code style='background:#f0f0f0;padding:2px 4px;border-radius:2px;'>https://example.com/camera/snapshot.jpg </code><br/><span style='color:#4a9eff;'>ℹ️ Images are downloaded at specified intervals</span>");
        panel.addLabeledInput("Remote URL", "text", props.url || "", (v) => updateProp("url", v));
        panel.addLabeledInputWithPicker("Dynamic URL Entity", "text", widget.entity_id || "", (v) => {
            AppState.updateWidget(widget.id, { entity_id: v });
        }, widget);
        panel.addLabeledInput("Update interval (seconds)", "number", props.interval_s || 300, (v) => updateProp("interval_s", parseInt(v, 10)));
        panel.endSection();

        panel.createSection("Appearance", true);
        panel.addCheckbox("Invert colors", props.invert || false, (v) => updateProp("invert", v));
        panel.addSelect("Render Mode", props.render_mode || "Auto", ["Auto", "Binary", "Grayscale", "Color (RGB565)"], (v) => updateProp("render_mode", v));
        panel.addNumberWithSlider("Opacity (%)", props.opacity !== undefined ? props.opacity : 100, 0, 100, (v) => updateProp("opacity", v));
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

        if (!url) return null;

        return {
            type: "dlimg",
            url: url,
            x: Math.round(w.x),
            y: Math.round(w.y),
            xsize: Math.round(w.width),
            ysize: Math.round(w.height),
            rotate: p.rotation || 0
        };
    },
    exportOEPL: (w, { _layout, _page }) => {
        const p = w.props || {};
        const url = (p.url || "").trim();

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

        return null;
    },
    exportLVGL,
    export: exportDoc,
    onExportComponents
};

