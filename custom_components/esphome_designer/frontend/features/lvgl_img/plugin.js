/**
 * LVGL Image Plugin
 */

const render = (el, widget, { getColorStyle }) => {
    const props = widget.props || {};
    const pColor = getColorStyle(props.color || "black");

    el.innerHTML = "";
    el.style.overflow = "visible"; // Allow resize handles to be seen

    // Create wrapper for content clipping and styling
    const content = document.createElement("div");
    content.style.width = "100%";
    content.style.height = "100%";
    content.style.overflow = "hidden";
    content.style.border = "1px dashed #ccc";
    content.style.display = "flex";
    content.style.alignItems = "center";
    content.style.justifyContent = "center";
    content.style.color = pColor;
    content.style.backgroundColor = "#f0f0f0";
    content.style.boxSizing = "border-box"; // Ensure border doesn't overflow

    el.appendChild(content);

    const src = props.src || "symbol_image";

    const label = document.createElement("div");
    label.style.textAlign = "center";

    if (props.rotation) {
        label.style.transform = `rotate(${props.rotation * 0.1}deg)`;
    }

    if (src.includes("/") || src.includes(".")) {
        label.textContent = "IMG: " + src;
    } else {
        label.textContent = "Symbol: " + src;
    }

    label.style.fontSize = "12px";
    content.appendChild(label);
};

const getSafeImageId = (w) => {
    const props = w.props || {};
    const src = props.src || props.path || props.url || "";
    if (!src) return `img_${w.id.replace(/-/g, "_")}`;

    // Create ID based on path and size for deduplication
    const safePath = src.replace(/[^a-zA-Z0-9]/g, "_").replace(/^_+|_+$/g, "").replace(/_+/g, "_");
    return `img_${safePath}_${w.width}x${w.height}`;
};

const onExportComponents = (context) => {
    const { lines, widgets, profile } = context;
    const targets = widgets.filter(w => w.type === 'lvgl_img');

    if (targets.length > 0) {
        const processed = new Set();
        const imageLines = [];

        targets.forEach(w => {
            const props = w.props || {};
            const src = props.src || props.path || props.url || "";
            // Only export if it looks like a file path (contains / or .)
            if (!src || (!src.includes("/") && !src.includes("."))) return;

            const safeId = getSafeImageId(w);
            if (processed.has(safeId)) return;
            processed.add(safeId);

            const isColor = profile.features?.lcd || (profile.name && (profile.name.includes("6-Color") || profile.name.includes("Color")));
            const imgType = isColor ? "RGB565" : "BINARY";

            imageLines.push(`  - file: "${src}"`);
            imageLines.push(`    id: ${safeId}`);
            imageLines.push(`    type: ${imgType}`);
            imageLines.push(`    resize: ${w.width}x${w.height}`);
            if (!isColor) {
                imageLines.push(`    dither: FLOYDSTEINBERG`);
            }
        });

        if (imageLines.length > 0) {
            if (!lines.some(l => l.trim() === "image:")) {
                lines.push("image:");
            }
            lines.push(...imageLines);
            lines.push("");
        }
    }
};

const exportLVGL = (w, { common, convertColor }) => {
    const p = w.props || {};
    let src = (p.src || p.path || p.url || "symbol_image");
    return {
        image: {
            ...common,
            src: src,
            angle: (p.rotation || 0),
            pivot_x: (p.pivot_x || 0),
            pivot_y: (p.pivot_y || 0),
            image_recolor: convertColor(p.color),
            image_recolor_opa: "cover"
        }
    };
};

export default {
    id: "lvgl_img",
    name: "Image (lv)",
    category: "LVGL",
    defaults: {
        src: "symbol_image",
        rotation: 0,
        color: "black",
        pivot_x: 0,
        pivot_y: 0,
        scale: 256,
        opa: 255,
        opacity: 255
    },
    schema: [
        {
            section: "Content",
            fields: [
                { key: "src", label: "Image Source", type: "text", default: "symbol_image" }
            ]
        },
        {
            section: "Appearance",
            fields: [
                { key: "color", label: "Recolor", type: "color", default: "black" },
                { key: "rotation", label: "Rotation (Angle x 10)", type: "number", default: 0 },
                { key: "scale", label: "Scale (256 = 100%)", type: "number", default: 256 },
                { key: "opa", label: "Opacity (0 - 255)", type: "number", default: 255 },
                { key: "opacity", label: "Opacity (0 - 255)", type: "number", default: 255 }
            ]
        },
        {
            section: "Pivot",
            fields: [
                { key: "pivot_x", label: "Pivot X", type: "number", default: 0 },
                { key: "pivot_y", label: "Pivot Y", type: "number", default: 0 }
            ]
        }
    ],
    render,
    exportLVGL,
    onExportComponents
};
