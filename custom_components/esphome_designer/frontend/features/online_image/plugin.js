/**
 * Online Image Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const url = props.url || props.path || "";
    const invert = !!props.invert;

    el.style.boxSizing = "border-box";
    el.style.backgroundColor = "#f5f5f5";
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
        lines, getCondProps, getConditionCheck, profile
    } = context;

    const p = w.props || {};
    const url = (p.url || "").trim();
    const invert = !!p.invert;
    const renderMode = p.render_mode || "Auto";

    const safeId = getSafeId(w);

    lines.push(`        // widget:${w.type} id:${w.id} x:${w.x} y:${w.y} w:${w.width} h:${w.height} url:"${url}" invert:${invert} render_mode:"${renderMode}" ${getCondProps(w)}`);

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
        update_interval: "1h",
        rotation: 0,
        color: "black"
    },
    render,
    exportOpenDisplay: (w, { layout, page }) => {
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
    exportOEPL: (w, { layout, page }) => {
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

